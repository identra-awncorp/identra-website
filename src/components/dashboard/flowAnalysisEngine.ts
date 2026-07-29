/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  DATABASE_SOURCES,
  getBuiltInModuleContract,
} from './dashboardModuleRegistry';
import {
  DEFAULT_ANALYSIS_THRESHOLDS,
  MAX_SUBFLOW_SIMULATION_DEPTH,
  type AnalysisThresholds,
  type ConditionGroup,
  type DynamicFlowManifestV2,
  type DynamicFlowNodeV2,
  type FlowAnalysisIssue,
  type FlowAnalysisReport,
  type FlowField,
  type FlowProjectV2,
  type ModuleContract,
  type ModulePackage,
  type SubflowPackage,
  type SubflowVersion,
} from './dashboardV2Types';
import type { ScenarioEdgeCoverage } from './scenarioEngine';

export type FlowAnalysisInput = {
  readonly project: FlowProjectV2;
  readonly moduleCatalog: readonly ModulePackage[];
  readonly subflowCatalog: readonly SubflowPackage[];
  readonly scenarioCoverage: ScenarioEdgeCoverage;
  readonly generatedAt: string;
  readonly thresholds?: AnalysisThresholds;
};

type AnalysisContext = {
  readonly moduleCatalog: readonly ModulePackage[];
  readonly subflowCatalog: readonly SubflowPackage[];
};

type CriticalPath = {
  readonly durationMs: number;
  readonly nodeIds: readonly string[];
  readonly interactionSteps: number;
  readonly evidenceGroups: ReadonlySet<string>;
};

const contractForVerification = (
  node: Extract<DynamicFlowNodeV2, { readonly kind: 'verification' }>,
  moduleCatalog: readonly ModulePackage[],
): ModuleContract | undefined => {
  const builtIn = getBuiltInModuleContract(node.moduleRef.packageId);
  if (builtIn?.ref.version === node.moduleRef.version) return builtIn;
  return moduleCatalog
    .find((item) => item.id === node.moduleRef.packageId)
    ?.versions.find((version) => version.version === node.moduleRef.version)
    ?.contract;
};

const subflowVersionFor = (
  node: Extract<DynamicFlowNodeV2, { readonly kind: 'subflow' }>,
  subflowCatalog: readonly SubflowPackage[],
): SubflowVersion | undefined => subflowCatalog
  .find((item) => item.id === node.subflowRef.packageId)
  ?.versions.find((version) => version.version === node.subflowRef.version);

const subflowKey = (
  node: Extract<DynamicFlowNodeV2, { readonly kind: 'subflow' }>,
): string => `${node.subflowRef.packageId}@${node.subflowRef.version}`;

const databaseDuration = (
  node: Extract<DynamicFlowNodeV2, { readonly kind: 'verification' }>,
  fallbackMs: number,
): number => {
  const durations = node.selectedDatabaseSourceIds
    .map((sourceId) => DATABASE_SOURCES.find((source) => source.id === sourceId))
    .filter((source) => Boolean(source))
    .map((source) => source!.estimatedDurationMs);
  if (durations.length === 0) return fallbackMs;
  return node.databaseStrategy?.executionMode === 'sequential'
    ? durations.reduce((sum, duration) => sum + duration, 0)
    : Math.max(...durations);
};

const chooseLongerPath = (
  left: CriticalPath,
  right: CriticalPath,
): CriticalPath => {
  if (right.durationMs > left.durationMs) return right;
  if (right.durationMs < left.durationMs) return left;
  return right.nodeIds.join('>').localeCompare(left.nodeIds.join('>')) < 0
    ? right
    : left;
};

const metricsForNode = (
  node: DynamicFlowNodeV2,
  context: AnalysisContext,
  subflowDepth: number,
  activeSubflows: ReadonlySet<string>,
): Omit<CriticalPath, 'nodeIds'> => {
  if (node.kind === 'verification') {
    const contract = contractForVerification(node, context.moduleCatalog);
    if (!contract) {
      return {
        durationMs: 0,
        interactionSteps: 0,
        evidenceGroups: new Set(),
      };
    }
    return {
      durationMs: node.moduleRef.packageId === 'database-cross-check'
        ? databaseDuration(node, contract.estimatedDurationMs)
        : contract.estimatedDurationMs,
      interactionSteps: 1,
      evidenceGroups: new Set([contract.evidenceGroup]),
    };
  }
  if (node.kind !== 'subflow' || subflowDepth >= MAX_SUBFLOW_SIMULATION_DEPTH) {
    return {
      durationMs: 0,
      interactionSteps: 0,
      evidenceGroups: new Set(),
    };
  }
  const key = subflowKey(node);
  if (activeSubflows.has(key)) {
    return {
      durationMs: 0,
      interactionSteps: 0,
      evidenceGroups: new Set(),
    };
  }
  const version = subflowVersionFor(node, context.subflowCatalog);
  if (!version) {
    return {
      durationMs: 0,
      interactionSteps: 0,
      evidenceGroups: new Set(),
    };
  }
  const nested = criticalPathForManifest(
    version.flow,
    context,
    subflowDepth + 1,
    new Set([...activeSubflows, key]),
  );
  return {
    durationMs: nested.durationMs,
    interactionSteps: nested.interactionSteps,
    evidenceGroups: nested.evidenceGroups,
  };
};

const durationForNode = (
  node: DynamicFlowNodeV2,
  context: AnalysisContext,
  subflowDepth: number,
  activeSubflows: ReadonlySet<string>,
): number => metricsForNode(
  node,
  context,
  subflowDepth,
  activeSubflows,
).durationMs;

const criticalPathForManifest = (
  manifest: DynamicFlowManifestV2,
  context: AnalysisContext,
  subflowDepth = 0,
  activeSubflows: ReadonlySet<string> = new Set(),
): CriticalPath => {
  const nodeMap = new Map(manifest.nodes.map((node) => [node.id, node]));
  const adjacency = new Map<string, string[]>();
  for (const edge of [...manifest.edges].sort(
    (left, right) => left.id.localeCompare(right.id),
  )) {
    if (!nodeMap.has(edge.source) || !nodeMap.has(edge.target)) continue;
    adjacency.set(edge.source, [
      ...(adjacency.get(edge.source) ?? []),
      edge.target,
    ]);
  }
  const memo = new Map<string, CriticalPath>();
  const activeNodes = new Set<string>();

  const visit = (nodeId: string): CriticalPath => {
    const cached = memo.get(nodeId);
    if (cached) return cached;
    if (activeNodes.has(nodeId)) {
      return {
        durationMs: 0,
        nodeIds: [],
        interactionSteps: 0,
        evidenceGroups: new Set(),
      };
    }
    const node = nodeMap.get(nodeId);
    if (!node) {
      return {
        durationMs: 0,
        nodeIds: [],
        interactionSteps: 0,
        evidenceGroups: new Set(),
      };
    }
    activeNodes.add(nodeId);
    let downstream: CriticalPath = {
      durationMs: 0,
      nodeIds: [],
      interactionSteps: 0,
      evidenceGroups: new Set(),
    };
    for (const target of adjacency.get(nodeId) ?? []) {
      downstream = chooseLongerPath(downstream, visit(target));
    }
    activeNodes.delete(nodeId);
    const nodeMetrics = metricsForNode(
      node,
      context,
      subflowDepth,
      activeSubflows,
    );
    const result: CriticalPath = {
      durationMs: nodeMetrics.durationMs + downstream.durationMs,
      nodeIds: [nodeId, ...downstream.nodeIds],
      interactionSteps:
        nodeMetrics.interactionSteps + downstream.interactionSteps,
      evidenceGroups: new Set([
        ...nodeMetrics.evidenceGroups,
        ...downstream.evidenceGroups,
      ]),
    };
    memo.set(nodeId, result);
    return result;
  };

  const starts = manifest.nodes
    .filter((node) => node.kind === 'start')
    .map((node) => node.id)
    .sort();
  const roots = starts.length > 0
    ? starts
    : manifest.nodes.map((node) => node.id).sort();
  return roots.reduce<CriticalPath>(
    (longest, nodeId) => chooseLongerPath(longest, visit(nodeId)),
    {
      durationMs: 0,
      nodeIds: [],
      interactionSteps: 0,
      evidenceGroups: new Set(),
    },
  );
};

const outputFieldsForNode = (
  node: DynamicFlowNodeV2,
  context: AnalysisContext,
): readonly FlowField[] => {
  if (node.kind === 'verification') {
    return contractForVerification(node, context.moduleCatalog)?.outputFields ?? [];
  }
  if (node.kind === 'subflow') {
    return subflowVersionFor(node, context.subflowCatalog)
      ?.contract.outputFields ?? [];
  }
  return [];
};

const collectConditionReferences = (
  group: ConditionGroup,
  referencedOutputs: Set<string>,
): void => {
  for (const condition of group.conditions) {
    if (condition.kind === 'group') {
      collectConditionReferences(condition, referencedOutputs);
      continue;
    }
    for (const reference of [condition.left, condition.right]) {
      if (reference?.kind === 'nodeOutput') {
        referencedOutputs.add(`${reference.nodeId}:${reference.fieldId}`);
      }
    }
  }
};

const referencedOutputFields = (project: FlowProjectV2): ReadonlySet<string> => {
  const referenced = new Set<string>();
  for (const node of project.flow.nodes) {
    if (node.kind === 'verification' || node.kind === 'subflow') {
      for (const binding of node.bindings) {
        if (binding.source.kind === 'nodeOutput') {
          referenced.add(
            `${binding.source.nodeId}:${binding.source.fieldId}`,
          );
        }
      }
    } else if (node.kind === 'condition') {
      collectConditionReferences(node.condition.root, referenced);
    }
  }
  for (const screen of [
    ...project.interface.screens,
    ...project.interface.orphanedScreens,
  ]) {
    for (const variant of screen.variants) {
      for (const block of variant.blocks) {
        if (block.kind !== 'fieldSummary') continue;
        for (const field of block.fields) {
          if (field.nodeId) {
            referenced.add(`${field.nodeId}:${field.fieldId}`);
          }
        }
      }
    }
  }

  if (project.integration.resultFieldIds.length > 0) {
    for (const fieldReference of project.integration.resultFieldIds) {
      const separatorIndex = fieldReference.indexOf('.');
      if (separatorIndex > 0) {
        referenced.add(
          `${fieldReference.slice(0, separatorIndex)}:${fieldReference.slice(
            separatorIndex + 1,
          )}`,
        );
        continue;
      }
      for (const node of project.flow.nodes) {
        referenced.add(`${node.id}:${fieldReference}`);
      }
    }
  }
  return referenced;
};

const canReach = (
  manifest: DynamicFlowManifestV2,
  source: string,
  target: string,
): boolean => {
  const reached = new Set<string>();
  const pending = [source];
  while (pending.length > 0) {
    const nodeId = pending.pop()!;
    if (nodeId === target && nodeId !== source) return true;
    if (reached.has(nodeId)) continue;
    reached.add(nodeId);
    for (const edge of manifest.edges) {
      if (edge.source === nodeId) pending.push(edge.target);
    }
  }
  return false;
};

const createUntestedBranchIssues = (
  project: FlowProjectV2,
  uncovered: ReadonlySet<string>,
): readonly FlowAnalysisIssue[] => project.flow.edges
  .filter((edge) => uncovered.has(edge.id))
  .map((edge) => ({
    id: `untestedBranch:${edge.id}`,
    code: 'untestedBranch',
    severity: 'warning',
    nodeIds: [edge.source, edge.target],
    edgeIds: [edge.id],
    estimated: false,
  }));

const createUnusedOutputIssues = (
  project: FlowProjectV2,
  context: AnalysisContext,
): readonly FlowAnalysisIssue[] => {
  const referenced = referencedOutputFields(project);
  return project.flow.nodes.flatMap((node) =>
    outputFieldsForNode(node, context)
      .filter((field) => !referenced.has(`${node.id}:${field.id}`))
      .map((field): FlowAnalysisIssue => ({
        id: `unusedOutput:${node.id}:${field.id}`,
        code: 'unusedOutput',
        severity: 'info',
        nodeIds: [node.id],
        edgeIds: [],
        estimated: false,
      })));
};

const createDuplicateDatabaseIssues = (
  project: FlowProjectV2,
): readonly FlowAnalysisIssue[] => {
  const databaseNodes = project.flow.nodes
    .filter((node): node is Extract<
      DynamicFlowNodeV2,
      { readonly kind: 'verification' }
    > => node.kind === 'verification'
      && node.moduleRef.packageId === 'database-cross-check')
    .sort((left, right) => left.id.localeCompare(right.id));
  const issues: FlowAnalysisIssue[] = [];
  databaseNodes.forEach((left, leftIndex) => {
    for (const right of databaseNodes.slice(leftIndex + 1)) {
      if (
        !canReach(project.flow, left.id, right.id)
        && !canReach(project.flow, right.id, left.id)
      ) {
        continue;
      }
      const duplicateSources = left.selectedDatabaseSourceIds
        .filter((sourceId) => right.selectedDatabaseSourceIds.includes(sourceId))
        .filter((sourceId, index, all) => all.indexOf(sourceId) === index)
        .sort();
      for (const sourceId of duplicateSources) {
        issues.push({
          id: `duplicateDatabaseSource:${sourceId}:${left.id}:${right.id}`,
          code: 'duplicateDatabaseSource',
          severity: 'warning',
          nodeIds: [left.id, right.id],
          edgeIds: [],
          estimated: false,
        });
      }
    }
  });
  return issues;
};

export const analyzeFlowProject = (
  input: FlowAnalysisInput,
): FlowAnalysisReport => {
  const thresholds = input.thresholds ?? DEFAULT_ANALYSIS_THRESHOLDS;
  const context: AnalysisContext = {
    moduleCatalog: input.moduleCatalog,
    subflowCatalog: input.subflowCatalog,
  };
  const criticalPath = criticalPathForManifest(input.project.flow, context);
  const nodeMap = new Map(input.project.flow.nodes.map((node) => [node.id, node]));
  const interactionNodes = criticalPath.nodeIds
    .map((nodeId) => nodeMap.get(nodeId))
    .filter((node): node is DynamicFlowNodeV2 => Boolean(node))
    .filter((node) => node.kind === 'verification' || node.kind === 'subflow');
  const evidenceGroups = criticalPath.evidenceGroups;

  const bottlenecks: FlowAnalysisIssue[] = interactionNodes.flatMap((node) => {
    const durationMs = durationForNode(node, context, 0, new Set());
    const ratio = criticalPath.durationMs > 0
      ? durationMs / criticalPath.durationMs
      : 0;
    return (
      ratio > thresholds.bottleneckCriticalPathRatio
      || durationMs > thresholds.bottleneckDurationMs
    )
      ? [{
          id: `bottleneck:${node.id}`,
          code: 'bottleneck' as const,
          severity: 'warning' as const,
          nodeIds: [node.id],
          edgeIds: [],
          estimated: true,
          metric: durationMs,
        }]
      : [];
  });

  const excessive = (
    criticalPath.interactionSteps > thresholds.excessiveInteractionSteps
    || evidenceGroups.size > thresholds.excessiveEvidenceGroups
    || criticalPath.durationMs > thresholds.excessiveDurationMs
  )
    ? [{
        id: `excessiveEvidence:${input.project.id}`,
        code: 'excessiveEvidence' as const,
        severity: 'warning' as const,
        nodeIds: interactionNodes.map((node) => node.id),
        edgeIds: [],
        estimated: true,
        metric: criticalPath.durationMs,
      }]
    : [];

  const uncovered = new Set(input.scenarioCoverage.uncoveredEdgeIds);
  const issues = [
    ...createUntestedBranchIssues(input.project, uncovered),
    ...createUnusedOutputIssues(input.project, context),
    ...createDuplicateDatabaseIssues(input.project),
    ...bottlenecks,
    ...excessive,
  ];
  const covered = new Set(input.scenarioCoverage.coveredEdgeIds);
  return {
    projectId: input.project.id,
    generatedAt: input.generatedAt,
    thresholds,
    issues,
    edgeCoverage: Object.fromEntries(
      input.project.flow.edges.map((edge) => [edge.id, covered.has(edge.id)]),
    ),
    estimatedCriticalPathDurationMs: criticalPath.durationMs,
    estimatedInteractionSteps: criticalPath.interactionSteps,
    estimatedEvidenceGroups: evidenceGroups.size,
  };
};
