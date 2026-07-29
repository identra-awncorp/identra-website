/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type {
  DynamicFlowManifestV2,
  FlowField,
  FlowScenario,
  JsonValue,
  ScenarioAssertion,
  ScenarioExecutionResult,
} from './dashboardV2Types';

export type ScenarioValidationCode =
  | 'duplicateNodeFixture'
  | 'staleNode'
  | 'unsupportedNodeOutcome'
  | 'duplicateDatabaseSourceFixture'
  | 'staleDatabaseSource'
  | 'duplicateAssertion'
  | 'staleAssertionNode'
  | 'staleAssertionEdge'
  | 'staleAssertionField'
  | 'unsafeOutputAssertion'
  | 'staleExpectedTerminal'
  | 'staleExpectedEdge'
  | 'unsafeFixtureMetadata';

export type ScenarioValidationIssue = {
  readonly code: ScenarioValidationCode;
  readonly scenarioId: string;
  readonly nodeId?: string;
  readonly edgeId?: string;
  readonly fieldId?: string;
  readonly sourceId?: string;
  readonly assertionId?: string;
};

export type ScenarioValidationContext = {
  readonly manifest: DynamicFlowManifestV2;
  readonly outputFieldsByNode: Readonly<Record<string, readonly FlowField[]>>;
};

export type EvaluatedScenarioAssertion = {
  readonly assertionId: string;
  readonly kind: ScenarioAssertion['kind'] | 'expectedTerminal' | 'expectedPath';
  readonly passed: boolean;
};

export type ScenarioRunStatus =
  | 'passed'
  | 'failed'
  | 'invalid'
  | 'skipped'
  | 'executionError';

export type ScenarioRunResult = {
  readonly scenarioId: string;
  readonly status: ScenarioRunStatus;
  readonly terminalNodeId?: string;
  readonly path: readonly string[];
  readonly traversedEdgeIds: readonly string[];
  readonly assertions: readonly EvaluatedScenarioAssertion[];
  readonly validationIssues: readonly ScenarioValidationIssue[];
};

export type ScenarioEdgeCoverage = {
  readonly coveredEdgeIds: readonly string[];
  readonly uncoveredEdgeIds: readonly string[];
  readonly coverage: number;
};

export type ScenarioRunSummary = {
  readonly runs: readonly ScenarioRunResult[];
  readonly passed: number;
  readonly failed: number;
  readonly invalid: number;
  readonly skipped: number;
  readonly executionErrors: number;
  readonly edgeCoverage: ScenarioEdgeCoverage;
};

export type ScenarioExecutor = (
  scenario: FlowScenario,
) => ScenarioExecutionResult | Promise<ScenarioExecutionResult>;

const sensitiveKeyPattern =
  /(address|birth|credential|document|email|face|identity|name|phone|secret|token)/i;

const containsSensitiveMetadataKey = (value: JsonValue): boolean => {
  if (value === null || typeof value !== 'object') return false;
  if (Array.isArray(value)) {
    return value.some(containsSensitiveMetadataKey);
  }
  return Object.entries(value).some(
    ([key, child]) => (
      sensitiveKeyPattern.test(key)
      || containsSensitiveMetadataKey(child)
    ),
  );
};

const duplicateValues = (values: readonly string[]): ReadonlySet<string> => {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  return duplicates;
};

const validateNodeFixtures = (
  scenario: FlowScenario,
  context: ScenarioValidationContext,
  issues: ScenarioValidationIssue[],
): void => {
  const nodeMap = new Map(context.manifest.nodes.map((node) => [node.id, node]));
  for (const nodeId of duplicateValues(
    scenario.nodeFixtures.map((fixture) => fixture.nodeId),
  )) {
    issues.push({ code: 'duplicateNodeFixture', scenarioId: scenario.id, nodeId });
  }

  for (const fixture of scenario.nodeFixtures) {
    if (!nodeMap.has(fixture.nodeId)) {
      issues.push({
        code: 'staleNode',
        scenarioId: scenario.id,
        nodeId: fixture.nodeId,
      });
      continue;
    }
    if (
      !context.manifest.edges.some(
        (edge) => (
          edge.source === fixture.nodeId
          && edge.outcome === fixture.outcome
        ),
      )
    ) {
      issues.push({
        code: 'unsupportedNodeOutcome',
        scenarioId: scenario.id,
        nodeId: fixture.nodeId,
      });
    }
  }
};

const validateDatabaseFixtures = (
  scenario: FlowScenario,
  context: ScenarioValidationContext,
  issues: ScenarioValidationIssue[],
): void => {
  for (const sourceId of duplicateValues(
    scenario.databaseFixtures.map((fixture) => fixture.sourceId),
  )) {
    issues.push({
      code: 'duplicateDatabaseSourceFixture',
      scenarioId: scenario.id,
      sourceId,
    });
  }

  const selectedSources = new Set(
    context.manifest.nodes.flatMap((node) => (
      node.kind === 'verification' ? node.selectedDatabaseSourceIds : []
    )),
  );
  for (const fixture of scenario.databaseFixtures) {
    if (!selectedSources.has(fixture.sourceId)) {
      issues.push({
        code: 'staleDatabaseSource',
        scenarioId: scenario.id,
        sourceId: fixture.sourceId,
      });
    }
    if (
      fixture.metadata
      && containsSensitiveMetadataKey(fixture.metadata)
    ) {
      issues.push({
        code: 'unsafeFixtureMetadata',
        scenarioId: scenario.id,
        sourceId: fixture.sourceId,
      });
    }
  }
};

const validateAssertions = (
  scenario: FlowScenario,
  context: ScenarioValidationContext,
  issues: ScenarioValidationIssue[],
): void => {
  const nodeMap = new Map(context.manifest.nodes.map((node) => [node.id, node]));
  const edgeIds = new Set(context.manifest.edges.map((edge) => edge.id));
  for (const assertionId of duplicateValues(
    scenario.assertions.map((assertion) => assertion.id),
  )) {
    issues.push({
      code: 'duplicateAssertion',
      scenarioId: scenario.id,
      assertionId,
    });
  }

  for (const assertion of scenario.assertions) {
    if (assertion.kind === 'terminal') {
      if (nodeMap.get(assertion.terminalNodeId)?.kind !== 'terminal') {
        issues.push({
          code: 'staleAssertionNode',
          scenarioId: scenario.id,
          nodeId: assertion.terminalNodeId,
          assertionId: assertion.id,
        });
      }
      continue;
    }
    if (assertion.kind === 'pathIncludes') {
      if (!edgeIds.has(assertion.edgeId)) {
        issues.push({
          code: 'staleAssertionEdge',
          scenarioId: scenario.id,
          edgeId: assertion.edgeId,
          assertionId: assertion.id,
        });
      }
      continue;
    }

    if (!nodeMap.has(assertion.nodeId)) {
      issues.push({
        code: 'staleAssertionNode',
        scenarioId: scenario.id,
        nodeId: assertion.nodeId,
        assertionId: assertion.id,
      });
      continue;
    }
    if (assertion.kind === 'safeOutputEquals') {
      const field = (context.outputFieldsByNode[assertion.nodeId] ?? [])
        .find((candidate) => candidate.id === assertion.fieldId);
      if (!field) {
        issues.push({
          code: 'staleAssertionField',
          scenarioId: scenario.id,
          nodeId: assertion.nodeId,
          fieldId: assertion.fieldId,
          assertionId: assertion.id,
        });
      } else if (
        !field.safeForResult
        || field.classification === 'pii'
        || field.classification === 'sensitivePii'
        || field.classification === 'biometric'
        || field.classification === 'credential'
        || field.classification === 'secret'
      ) {
        issues.push({
          code: 'unsafeOutputAssertion',
          scenarioId: scenario.id,
          nodeId: assertion.nodeId,
          fieldId: assertion.fieldId,
          assertionId: assertion.id,
        });
      }
    }
  }
};

const validateExpectations = (
  scenario: FlowScenario,
  context: ScenarioValidationContext,
  issues: ScenarioValidationIssue[],
): void => {
  if (
    scenario.expectedTerminalId
    && !context.manifest.nodes.some(
      (node) => (
        node.id === scenario.expectedTerminalId
        && node.kind === 'terminal'
      ),
    )
  ) {
    issues.push({
      code: 'staleExpectedTerminal',
      scenarioId: scenario.id,
      nodeId: scenario.expectedTerminalId,
    });
  }

  const edgeIds = new Set(context.manifest.edges.map((edge) => edge.id));
  for (const edgeId of scenario.expectedEdgeIds) {
    if (!edgeIds.has(edgeId)) {
      issues.push({
        code: 'staleExpectedEdge',
        scenarioId: scenario.id,
        edgeId,
      });
    }
  }
};

export const validateScenario = (
  scenario: FlowScenario,
  context: ScenarioValidationContext,
): readonly ScenarioValidationIssue[] => {
  const issues: ScenarioValidationIssue[] = [];
  validateNodeFixtures(scenario, context, issues);
  validateDatabaseFixtures(scenario, context, issues);
  validateAssertions(scenario, context, issues);
  validateExpectations(scenario, context, issues);
  return issues;
};

const jsonEquals = (left: JsonValue | undefined, right: JsonValue): boolean => {
  if (left === right) return true;
  if (left === null || right === null || left === undefined) return false;
  if (typeof left !== 'object' || typeof right !== 'object') return false;
  if (Array.isArray(left) || Array.isArray(right)) {
    return Array.isArray(left)
      && Array.isArray(right)
      && left.length === right.length
      && left.every((value, index) => jsonEquals(value, right[index]));
  }

  const leftRecord = left as Readonly<Record<string, JsonValue>>;
  const rightRecord = right as Readonly<Record<string, JsonValue>>;
  const leftKeys = Object.keys(leftRecord);
  const rightKeys = Object.keys(rightRecord);
  return leftKeys.length === rightKeys.length
    && leftKeys.every(
      (key) => (
        Object.prototype.hasOwnProperty.call(rightRecord, key)
        && jsonEquals(leftRecord[key], rightRecord[key] as JsonValue)
      ),
    );
};

export const evaluateScenarioAssertions = (
  scenario: FlowScenario,
  result: ScenarioExecutionResult,
): readonly EvaluatedScenarioAssertion[] => {
  const assertionResults = scenario.assertions.map<EvaluatedScenarioAssertion>(
    (assertion) => {
      if (assertion.kind === 'terminal') {
        return {
          assertionId: assertion.id,
          kind: assertion.kind,
          passed: (
            result.completed
            && result.terminalNodeId === assertion.terminalNodeId
          ),
        };
      }
      if (assertion.kind === 'pathIncludes') {
        return {
          assertionId: assertion.id,
          kind: assertion.kind,
          passed: result.traversedEdgeIds.includes(assertion.edgeId),
        };
      }
      if (assertion.kind === 'nodeOutcome') {
        return {
          assertionId: assertion.id,
          kind: assertion.kind,
          passed: result.steps.some(
            (step) => (
              step.nodeId === assertion.nodeId
              && step.outcome === assertion.outcome
            ),
          ),
        };
      }
      const output = result.steps
        .find((step) => step.nodeId === assertion.nodeId)
        ?.metadata?.[assertion.fieldId];
      return {
        assertionId: assertion.id,
        kind: assertion.kind,
        passed: jsonEquals(output, assertion.expected),
      };
    },
  );

  if (scenario.expectedTerminalId) {
    assertionResults.push({
      assertionId: 'expected-terminal',
      kind: 'expectedTerminal',
      passed: (
        result.completed
        && result.terminalNodeId === scenario.expectedTerminalId
      ),
    });
  }
  assertionResults.push({
    assertionId: 'expected-path',
    kind: 'expectedPath',
    passed: (
      scenario.expectedEdgeIds.length === result.traversedEdgeIds.length
      && scenario.expectedEdgeIds.every(
        (edgeId, index) => edgeId === result.traversedEdgeIds[index],
      )
    ),
  });

  return assertionResults;
};

export const computeEdgeCoverage = (
  manifest: DynamicFlowManifestV2,
  results: readonly Pick<ScenarioExecutionResult, 'traversedEdgeIds'>[],
): ScenarioEdgeCoverage => {
  const knownEdgeIds = new Set(manifest.edges.map((edge) => edge.id));
  const covered = new Set<string>();
  for (const result of results) {
    for (const edgeId of result.traversedEdgeIds) {
      if (knownEdgeIds.has(edgeId)) covered.add(edgeId);
    }
  }
  const coveredEdgeIds = manifest.edges
    .map((edge) => edge.id)
    .filter((edgeId) => covered.has(edgeId));
  const uncoveredEdgeIds = manifest.edges
    .map((edge) => edge.id)
    .filter((edgeId) => !covered.has(edgeId));

  return {
    coveredEdgeIds,
    uncoveredEdgeIds,
    coverage: manifest.edges.length === 0
      ? 1
      : coveredEdgeIds.length / manifest.edges.length,
  };
};

export const createEmptyScenarioRunSummary = (
  manifest?: DynamicFlowManifestV2,
): ScenarioRunSummary => ({
  runs: [],
  passed: 0,
  failed: 0,
  invalid: 0,
  skipped: 0,
  executionErrors: 0,
  edgeCoverage: {
    coveredEdgeIds: [],
    uncoveredEdgeIds: manifest?.edges.map((edge) => edge.id) ?? [],
    coverage: manifest && manifest.edges.length === 0 ? 1 : 0,
  },
});

const summarizeRuns = (
  manifest: DynamicFlowManifestV2,
  runs: readonly ScenarioRunResult[],
  executionResults: readonly ScenarioExecutionResult[],
): ScenarioRunSummary => ({
  runs,
  passed: runs.filter((run) => run.status === 'passed').length,
  failed: runs.filter((run) => run.status === 'failed').length,
  invalid: runs.filter((run) => run.status === 'invalid').length,
  skipped: runs.filter((run) => run.status === 'skipped').length,
  executionErrors: runs.filter((run) => run.status === 'executionError').length,
  edgeCoverage: computeEdgeCoverage(manifest, executionResults),
});

export const runScenarioBatch = async (
  scenarios: readonly FlowScenario[],
  context: ScenarioValidationContext,
  executor: ScenarioExecutor,
): Promise<ScenarioRunSummary> => {
  const runs: ScenarioRunResult[] = [];
  const executionResults: ScenarioExecutionResult[] = [];

  for (const scenario of scenarios) {
    if (!scenario.enabled) {
      runs.push({
        scenarioId: scenario.id,
        status: 'skipped',
        path: [],
        traversedEdgeIds: [],
        assertions: [],
        validationIssues: [],
      });
      continue;
    }

    const validationIssues = validateScenario(scenario, context);
    if (validationIssues.length > 0) {
      runs.push({
        scenarioId: scenario.id,
        status: 'invalid',
        path: [],
        traversedEdgeIds: [],
        assertions: [],
        validationIssues,
      });
      continue;
    }

    try {
      const result = await executor(scenario);
      const assertions = evaluateScenarioAssertions(scenario, result);
      const passed = result.completed
        && assertions.every((assertion) => assertion.passed);
      executionResults.push(result);
      runs.push({
        scenarioId: scenario.id,
        status: passed ? 'passed' : 'failed',
        terminalNodeId: result.terminalNodeId,
        path: result.steps.map((step) => step.nodeId),
        traversedEdgeIds: [...result.traversedEdgeIds],
        assertions,
        validationIssues: [],
      });
    } catch {
      runs.push({
        scenarioId: scenario.id,
        status: 'executionError',
        path: [],
        traversedEdgeIds: [],
        assertions: [],
        validationIssues: [],
      });
    }
  }

  return summarizeRuns(context.manifest, runs, executionResults);
};
