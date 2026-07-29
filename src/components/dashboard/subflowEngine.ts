/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  DYNAMIC_FLOW_SCHEMA_VERSION,
  MAX_SUBFLOW_SIMULATION_DEPTH,
  type DynamicFlowManifestV2,
  type FlowField,
  type SubflowPackage,
  type SubflowRef,
  type SubflowVersion,
} from './dashboardV2Types';

export type SubflowExtractionIssueCode =
  | 'emptySelection'
  | 'duplicateSelection'
  | 'missingSelectedNode'
  | 'entryNotSelected'
  | 'successExitNotSelected'
  | 'failureExitNotSelected'
  | 'duplicateExit'
  | 'disconnectedSelection'
  | 'cycleDetected'
  | 'multipleEntries'
  | 'entryMismatch'
  | 'invalidExitCount'
  | 'exitMismatch';

export type SubflowExtractionIssue = {
  readonly code: SubflowExtractionIssueCode;
  readonly nodeIds: readonly string[];
};

export type ExtractSubflowInput = {
  readonly packageId: string;
  readonly name: string;
  readonly version: string;
  readonly source: DynamicFlowManifestV2;
  readonly selectedNodeIds: readonly string[];
  readonly entryNodeId: string;
  readonly successExitNodeId: string;
  readonly failureExitNodeId: string;
  readonly inputFields: readonly FlowField[];
  readonly outputFields: readonly FlowField[];
  readonly createdAt: string;
};

export type ExtractSubflowResult =
  | {
      readonly ok: true;
      readonly value: SubflowPackage;
    }
  | {
      readonly ok: false;
      readonly issues: readonly SubflowExtractionIssue[];
    };

const duplicateValues = (values: readonly string[]): readonly string[] =>
  values.filter((value, index) => values.indexOf(value) !== index)
    .filter((value, index, all) => all.indexOf(value) === index);

const hasCycle = (
  nodeIds: ReadonlySet<string>,
  edges: DynamicFlowManifestV2['edges'],
): boolean => {
  const visited = new Set<string>();
  const active = new Set<string>();
  const adjacency = new Map<string, string[]>();
  for (const edge of edges) {
    if (!nodeIds.has(edge.source) || !nodeIds.has(edge.target)) continue;
    adjacency.set(edge.source, [...(adjacency.get(edge.source) ?? []), edge.target]);
  }

  const visit = (nodeId: string): boolean => {
    if (active.has(nodeId)) return true;
    if (visited.has(nodeId)) return false;
    visited.add(nodeId);
    active.add(nodeId);
    for (const target of adjacency.get(nodeId) ?? []) {
      if (visit(target)) return true;
    }
    active.delete(nodeId);
    return false;
  };

  return [...nodeIds].some((nodeId) => visit(nodeId));
};

const isWeaklyConnected = (
  nodeIds: ReadonlySet<string>,
  edges: DynamicFlowManifestV2['edges'],
): boolean => {
  const first = nodeIds.values().next().value as string | undefined;
  if (!first) return false;
  const adjacency = new Map<string, string[]>();
  for (const edge of edges) {
    if (!nodeIds.has(edge.source) || !nodeIds.has(edge.target)) continue;
    adjacency.set(edge.source, [
      ...(adjacency.get(edge.source) ?? []),
      edge.target,
    ]);
    adjacency.set(edge.target, [
      ...(adjacency.get(edge.target) ?? []),
      edge.source,
    ]);
  }

  const reached = new Set<string>();
  const pending = [first];
  while (pending.length > 0) {
    const nodeId = pending.pop()!;
    if (reached.has(nodeId)) continue;
    reached.add(nodeId);
    pending.push(...(adjacency.get(nodeId) ?? []));
  }
  return reached.size === nodeIds.size;
};

export const validateSubflowSelection = (
  input: ExtractSubflowInput,
): readonly SubflowExtractionIssue[] => {
  const issues: SubflowExtractionIssue[] = [];
  const duplicates = duplicateValues(input.selectedNodeIds);
  if (input.selectedNodeIds.length === 0) {
    issues.push({ code: 'emptySelection', nodeIds: [] });
    return issues;
  }
  if (duplicates.length > 0) {
    issues.push({ code: 'duplicateSelection', nodeIds: duplicates });
  }

  const sourceNodeIds = new Set(input.source.nodes.map((node) => node.id));
  const selected = new Set(input.selectedNodeIds);
  const missing = [...selected].filter((nodeId) => !sourceNodeIds.has(nodeId));
  if (missing.length > 0) {
    issues.push({ code: 'missingSelectedNode', nodeIds: missing });
  }
  if (!selected.has(input.entryNodeId)) {
    issues.push({ code: 'entryNotSelected', nodeIds: [input.entryNodeId] });
  }
  if (!selected.has(input.successExitNodeId)) {
    issues.push({
      code: 'successExitNotSelected',
      nodeIds: [input.successExitNodeId],
    });
  }
  if (!selected.has(input.failureExitNodeId)) {
    issues.push({
      code: 'failureExitNotSelected',
      nodeIds: [input.failureExitNodeId],
    });
  }
  if (input.successExitNodeId === input.failureExitNodeId) {
    issues.push({
      code: 'duplicateExit',
      nodeIds: [input.successExitNodeId],
    });
  }
  if (missing.length > 0) return issues;

  const internalEdges = input.source.edges.filter(
    (edge) => selected.has(edge.source) && selected.has(edge.target),
  );
  if (!isWeaklyConnected(selected, internalEdges)) {
    issues.push({
      code: 'disconnectedSelection',
      nodeIds: [...selected].sort(),
    });
  }
  if (hasCycle(selected, internalEdges)) {
    issues.push({ code: 'cycleDetected', nodeIds: [...selected].sort() });
  }

  const entries = [...selected].filter((nodeId) =>
    !internalEdges.some((edge) => edge.target === nodeId)
    || input.source.edges.some(
      (edge) => edge.target === nodeId && !selected.has(edge.source),
    ));
  if (entries.length !== 1) {
    issues.push({ code: 'multipleEntries', nodeIds: entries.sort() });
  } else if (entries[0] !== input.entryNodeId) {
    issues.push({
      code: 'entryMismatch',
      nodeIds: [input.entryNodeId, entries[0]!],
    });
  }

  const exits = [...selected].filter((nodeId) =>
    !internalEdges.some((edge) => edge.source === nodeId));
  const leakingNodes = [...selected].filter((nodeId) =>
    internalEdges.some((edge) => edge.source === nodeId)
    && input.source.edges.some(
      (edge) => edge.source === nodeId && !selected.has(edge.target),
    ));
  if (leakingNodes.length > 0) {
    issues.push({
      code: 'exitMismatch',
      nodeIds: leakingNodes.sort(),
    });
  }
  if (exits.length !== 2) {
    issues.push({ code: 'invalidExitCount', nodeIds: exits.sort() });
  } else if (
    !exits.includes(input.successExitNodeId)
    || !exits.includes(input.failureExitNodeId)
  ) {
    issues.push({
      code: 'exitMismatch',
      nodeIds: [
        input.successExitNodeId,
        input.failureExitNodeId,
        ...exits,
      ].filter((nodeId, index, all) => all.indexOf(nodeId) === index),
    });
  }

  return issues;
};

export const extractSubflowPackage = (
  input: ExtractSubflowInput,
): ExtractSubflowResult => {
  const issues = validateSubflowSelection(input);
  if (issues.length > 0) return { ok: false, issues };

  const selected = new Set(input.selectedNodeIds);
  const flow: DynamicFlowManifestV2 = {
    schemaVersion: DYNAMIC_FLOW_SCHEMA_VERSION,
    inputSchema: { fields: structuredClone(input.inputFields) },
    nodes: input.source.nodes
      .filter((node) => selected.has(node.id))
      .map((node) => structuredClone(node)),
    edges: input.source.edges
      .filter((edge) => selected.has(edge.source) && selected.has(edge.target))
      .map((edge) => structuredClone(edge)),
  };
  const subflowVersion: SubflowVersion = {
    version: input.version,
    status: 'active',
    contract: {
      inputFields: structuredClone(input.inputFields),
      outputFields: structuredClone(input.outputFields),
      successExitNodeId: input.successExitNodeId,
      failureExitNodeId: input.failureExitNodeId,
    },
    flow,
    createdAt: input.createdAt,
  };

  return {
    ok: true,
    value: {
      id: input.packageId,
      name: input.name,
      activeVersion: input.version,
      versions: [subflowVersion],
    },
  };
};

export type SubflowDependencyIssueCode =
  | 'missingSubflow'
  | 'dependencyCycle'
  | 'depthExceeded';

export type SubflowDependencyIssue = {
  readonly code: SubflowDependencyIssueCode;
  readonly ref: SubflowRef;
  readonly path: readonly string[];
  readonly depth: number;
};

export type SubflowDependencyReport = {
  readonly valid: boolean;
  readonly maximumDepth: number;
  readonly issues: readonly SubflowDependencyIssue[];
};

const refKey = (ref: SubflowRef): string => `${ref.packageId}@${ref.version}`;

const versionForRef = (
  catalog: readonly SubflowPackage[],
  ref: SubflowRef,
): SubflowVersion | undefined => catalog
  .find((item) => item.id === ref.packageId)
  ?.versions.find((version) => version.version === ref.version);

const nestedRefs = (version: SubflowVersion): readonly SubflowRef[] =>
  version.flow.nodes
    .filter((node) => node.kind === 'subflow')
    .map((node) => node.subflowRef)
    .filter((ref, index, all) => all.findIndex(
      (candidate) => refKey(candidate) === refKey(ref),
    ) === index)
    .sort((left, right) => refKey(left).localeCompare(refKey(right)));

export const validateSubflowDependencies = (
  root: SubflowRef,
  catalog: readonly SubflowPackage[],
  maximumAllowedDepth = MAX_SUBFLOW_SIMULATION_DEPTH,
): SubflowDependencyReport => {
  const issues: SubflowDependencyIssue[] = [];
  let maximumDepth = 0;

  const visit = (
    ref: SubflowRef,
    path: readonly string[],
  ): void => {
    const key = refKey(ref);
    const depth = path.length + 1;
    maximumDepth = Math.max(maximumDepth, depth);
    const cycleStart = path.indexOf(key);
    if (cycleStart >= 0) {
      issues.push({
        code: 'dependencyCycle',
        ref,
        path: [...path.slice(cycleStart), key],
        depth,
      });
      return;
    }
    if (depth > maximumAllowedDepth) {
      issues.push({
        code: 'depthExceeded',
        ref,
        path: [...path, key],
        depth,
      });
      return;
    }
    const version = versionForRef(catalog, ref);
    if (!version) {
      issues.push({
        code: 'missingSubflow',
        ref,
        path: [...path, key],
        depth,
      });
      return;
    }
    const nextPath = [...path, key];
    for (const dependency of nestedRefs(version)) {
      visit(dependency, nextPath);
    }
  };

  visit(root, []);
  const uniqueIssues = issues.filter((issue, index, all) => all.findIndex(
    (candidate) => candidate.code === issue.code
      && refKey(candidate.ref) === refKey(issue.ref)
      && candidate.path.join('>') === issue.path.join('>'),
  ) === index);
  return {
    valid: uniqueIssues.length === 0,
    maximumDepth,
    issues: uniqueIssues,
  };
};

export const validateSubflowVersionDependencies = (
  packageId: string,
  version: SubflowVersion,
  catalog: readonly SubflowPackage[],
  maximumAllowedDepth = MAX_SUBFLOW_SIMULATION_DEPTH,
): SubflowDependencyReport => {
  const existingPackage = catalog.find((item) => item.id === packageId);
  const candidatePackage: SubflowPackage = existingPackage
    ? {
        ...existingPackage,
        activeVersion: version.version,
        versions: [
          ...existingPackage.versions.filter(
            (candidate) => candidate.version !== version.version,
          ),
          version,
        ],
      }
    : {
        id: packageId,
        name: packageId,
        activeVersion: version.version,
        versions: [version],
      };
  const candidateCatalog = [
    ...catalog.filter((item) => item.id !== packageId),
    candidatePackage,
  ];
  return validateSubflowDependencies(
    { packageId, version: version.version },
    candidateCatalog,
    maximumAllowedDepth,
  );
};
