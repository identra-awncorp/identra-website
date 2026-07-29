/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  evaluateCondition,
  type ConditionEvaluationContext,
} from './conditionEngine';
import { executeDatabaseStrategy } from './databaseStrategyEngine';
import { resolveModuleContract } from './dashboardV2Model';
import {
  MAX_SUBFLOW_SIMULATION_DEPTH,
  type DatabaseSourceFixture,
  type DynamicFlowManifestV2,
  type DynamicFlowNodeV2,
  type FlowField,
  type FlowScenario,
  type JsonValue,
  type ModuleContract,
  type ModulePackage,
  type OutcomeId,
  type ScenarioExecutionResult,
  type SimulationStepV2,
  type SubflowPackage,
} from './dashboardV2Types';

export type QuickSimulationOutcomes = Readonly<Record<string, OutcomeId>>;

const SYNTHETIC_INPUT_OVERRIDES: Readonly<Record<string, JsonValue>> = {
  credential: { synthetic: true },
  phoneNumber: '__synthetic_phone__',
  fullName: '__synthetic_name__',
  identityNumber: '__synthetic_identity_number__',
  dateOfBirth: '__synthetic_date__',
  nationality: '__synthetic_country__',
  faceReference: '__synthetic_face_reference__',
  identityData: { synthetic: true },
};

const failedOutcome = (
  presetId: string | undefined,
  outcome: OutcomeId,
): boolean => {
  const normalized = presetId?.toLowerCase() ?? '';
  return outcome === 'failure'
    || normalized.includes('invalid')
    || normalized.includes('failure');
};

const syntheticFieldValue = (
  field: FlowField,
  presetId: string | undefined,
  outcome: OutcomeId,
): JsonValue => {
  const normalized = presetId?.toLowerCase() ?? '';
  const failed = failedOutcome(presetId, outcome);
  const matched = outcome === 'matched' || normalized.includes('risk');
  if (field.id === 'outcome') return outcome;
  if (field.id === 'matchedSourceCount') return matched ? 1 : 0;
  if (field.id === 'checkedSourceCount') return 1;

  if (field.type === 'boolean') return !failed;
  if (field.type === 'number') {
    return failed ? 0.18 : matched ? 0.92 : 0.98;
  }
  if (field.type === 'array') return [];
  if (field.type === 'object') {
    return Object.fromEntries(
      (field.children ?? []).map((child) => [
        child.id,
        syntheticFieldValue(child, presetId, outcome),
      ]),
    );
  }
  return `__synthetic_${field.id}__`;
};

const syntheticFlowInputs = (
  manifest: DynamicFlowManifestV2,
  presetId: string | undefined,
): Readonly<Record<string, JsonValue>> => Object.fromEntries(
  manifest.inputSchema.fields.map((field) => [
    field.id,
    SYNTHETIC_INPUT_OVERRIDES[field.id]
      ?? syntheticFieldValue(field, presetId, 'success'),
  ]),
);

const syntheticOutputForPreset = (
  presetId: string | undefined,
  outcome: OutcomeId,
  contract?: ModuleContract | null,
): Readonly<Record<string, JsonValue>> => {
  if (contract) {
    return Object.fromEntries(
      contract.outputFields.map((field) => [
        field.id,
        syntheticFieldValue(field, presetId, outcome),
      ]),
    );
  }
  const failed = failedOutcome(presetId, outcome);
  const matched = outcome === 'matched'
    || (presetId?.toLowerCase() ?? '').includes('risk');
  return {
    verified: !failed,
    isLive: !failed,
    matchScore: failed ? 0.18 : matched ? 0.92 : 0.98,
    outcome,
    matchedSourceCount: matched ? 1 : 0,
    checkedSourceCount: 1,
  };
};

const outcomeForVerification = (
  nodeId: string,
  moduleId: string,
  scenario: FlowScenario | undefined,
  quickOutcomes: QuickSimulationOutcomes,
): OutcomeId => scenario?.nodeFixtures.find((fixture) => fixture.nodeId === nodeId)?.outcome
  ?? quickOutcomes[nodeId]
  ?? (moduleId === 'database-cross-check' ? 'notMatched' : 'success');

const databaseFixturesForNode = (
  selectedSourceIds: readonly string[],
  scenario?: FlowScenario,
): readonly DatabaseSourceFixture[] => {
  if (scenario?.databaseFixtures.length) return scenario.databaseFixtures;
  return selectedSourceIds.map((sourceId) => ({
    sourceId,
    outcome: 'notMatched',
    matchScore: 0,
    metadata: {
      synthetic: true,
    },
  }));
};

export type DynamicFlowSimulationOptions = {
  readonly scenario?: FlowScenario;
  readonly quickOutcomes?: QuickSimulationOutcomes;
  readonly moduleCatalog?: readonly ModulePackage[];
  readonly subflowCatalog?: readonly SubflowPackage[];
};

const subflowVersionForNode = (
  node: Extract<DynamicFlowNodeV2, { readonly kind: 'subflow' }>,
  subflowCatalog: readonly SubflowPackage[],
) => subflowCatalog
  .find((item) => item.id === node.subflowRef.packageId)
  ?.versions.find((version) => version.version === node.subflowRef.version);

const simulateManifest = (
  manifest: DynamicFlowManifestV2,
  options: DynamicFlowSimulationOptions,
  subflowDepth: number,
  activeSubflows: ReadonlySet<string>,
): ScenarioExecutionResult => {
  const scenario = options.scenario;
  const quickOutcomes = options.quickOutcomes ?? {};
  const start = manifest.nodes.find((node) => node.kind === 'start');
  if (!start) {
    return {
      scenarioId: scenario?.id ?? 'quick-simulation',
      completed: false,
      steps: [],
      traversedEdgeIds: [],
      assertionResults: [],
    };
  }

  const steps: SimulationStepV2[] = [];
  const traversedEdgeIds: string[] = [];
  const visited = new Set<string>();
  const nodeOutputs: Record<string, Readonly<Record<string, JsonValue>>> = {};
  const conditionContext: ConditionEvaluationContext = {
    flowInputs: syntheticFlowInputs(manifest, scenario?.inputPresetId),
    nodeOutputs,
  };
  let current: DynamicFlowNodeV2 | undefined = start;

  while (current !== undefined && !visited.has(current.id)) {
    const currentNode: DynamicFlowNodeV2 = current;
    visited.add(currentNode.id);
    if (currentNode.kind === 'terminal') {
      steps.push({ nodeId: currentNode.id });
      return {
        scenarioId: scenario?.id ?? 'quick-simulation',
        completed: true,
        terminalNodeId: currentNode.id,
        terminalOutcome: currentNode.terminalOutcome,
        steps,
        traversedEdgeIds,
        assertionResults: [],
      };
    }

    let outcome: OutcomeId = 'next';
    let metadata: Readonly<Record<string, JsonValue>> | undefined;
    let executionBlocked = false;
    if (currentNode.kind === 'condition') {
      if (
        currentNode.condition.migrationState === 'native'
        && currentNode.condition.root.conditions.length > 0
      ) {
        outcome = evaluateCondition(currentNode.condition.root, conditionContext)
          ? 'true'
          : 'false';
      } else {
        outcome = quickOutcomes[currentNode.id] === 'false' ? 'false' : 'true';
      }
    } else if (currentNode.kind === 'verification') {
      outcome = outcomeForVerification(
        currentNode.id,
        currentNode.moduleRef.packageId,
        scenario,
        quickOutcomes,
      );
      if (currentNode.moduleRef.packageId === 'database-cross-check') {
        const databaseResult = executeDatabaseStrategy(
          currentNode.databaseStrategy ?? {
            executionMode: 'parallel',
            aggregation: 'anyMatch',
            stopOnMatch: true,
            requiredSourceIds: [],
            unavailablePolicy: 'continue',
          },
          currentNode.selectedDatabaseSourceIds,
          databaseFixturesForNode(currentNode.selectedDatabaseSourceIds, scenario),
        );
        outcome = databaseResult.outcome;
        metadata = {
          outcome,
          matchedSourceCount: databaseResult.matchedSourceIds.length,
          checkedSourceCount: databaseResult.metadata.evaluatedSourceIds.length,
          stoppedEarly: databaseResult.metadata.stoppedEarly,
          evaluatedSourceIds: databaseResult.metadata.evaluatedSourceIds,
          skippedSourceIds: databaseResult.metadata.skippedSourceIds,
          requiredSourceUnavailableIds:
            databaseResult.metadata.requiredSourceUnavailableIds,
          sourceOutcomes: Object.fromEntries(
            databaseResult.sourceResults.map((source) => [
              source.sourceId,
              source.outcome,
            ]),
          ),
          ...(databaseResult.aggregateScore === undefined
            ? {}
            : { aggregateScore: databaseResult.aggregateScore }),
        };
      } else {
        const fixture = scenario?.nodeFixtures.find(
          (item) => item.nodeId === currentNode.id,
        );
        metadata = syntheticOutputForPreset(
          fixture?.outputPresetId,
          outcome,
          resolveModuleContract(
            currentNode.moduleRef,
            options.moduleCatalog ?? [],
          ),
        );
      }
      nodeOutputs[currentNode.id] = metadata;
    } else if (currentNode.kind === 'subflow') {
      const refKey =
        `${currentNode.subflowRef.packageId}@${currentNode.subflowRef.version}`;
      const version = subflowVersionForNode(
        currentNode,
        options.subflowCatalog ?? [],
      );
      if (!version) {
        metadata = { subflowStatus: 'missingDependency' };
        executionBlocked = true;
      } else if (activeSubflows.has(refKey)) {
        metadata = { subflowStatus: 'dependencyCycle' };
        executionBlocked = true;
      } else if (subflowDepth >= MAX_SUBFLOW_SIMULATION_DEPTH) {
        metadata = { subflowStatus: 'depthExceeded' };
        executionBlocked = true;
      } else {
        const nested = simulateManifest(
          version.flow,
          options,
          subflowDepth + 1,
          new Set([...activeSubflows, refKey]),
        );
        if (!nested.completed || !nested.terminalOutcome) {
          metadata = {
            subflowStatus: 'incomplete',
            nestedStepCount: nested.steps.length,
          };
          executionBlocked = true;
        } else {
          outcome = nested.terminalOutcome;
          metadata = {
            ...Object.fromEntries(
              version.contract.outputFields.map((field) => [
                field.id,
                syntheticFieldValue(field, undefined, outcome),
              ]),
            ),
            subflowStatus: 'completed',
            nestedStepCount: nested.steps.length,
            nestedTerminalNodeId: nested.terminalNodeId ?? '',
          };
          nodeOutputs[currentNode.id] = metadata;
        }
      }
    }

    if (executionBlocked) {
      steps.push({
        nodeId: currentNode.id,
        ...(metadata ? { metadata } : {}),
      });
      break;
    }

    const edge: DynamicFlowManifestV2['edges'][number] | undefined =
      manifest.edges.find(
        (candidate) =>
          candidate.source === currentNode.id && candidate.outcome === outcome,
      );
    steps.push({
      nodeId: currentNode.id,
      outcome,
      ...(edge ? { edgeId: edge.id } : {}),
      ...(metadata ? { metadata } : {}),
    });
    if (edge === undefined) {
      break;
    }
    traversedEdgeIds.push(edge.id);
    current = manifest.nodes.find(
      (node): boolean => node.id === edge.target,
    );
  }

  return {
    scenarioId: scenario?.id ?? 'quick-simulation',
    completed: false,
    steps,
    traversedEdgeIds,
    assertionResults: [],
  };
};

export const simulateDynamicFlowV2 = (
  manifest: DynamicFlowManifestV2,
  options: DynamicFlowSimulationOptions = {},
): ScenarioExecutionResult => simulateManifest(
  manifest,
  options,
  0,
  new Set(),
);
