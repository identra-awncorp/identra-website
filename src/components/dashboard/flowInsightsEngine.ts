/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { resolveModuleContract } from './dashboardV2Model';
import type {
  ConditionGroup,
  DataClassification,
  DataReference,
  DynamicFlowEdgeV2,
  DynamicFlowNodeV2,
  FlowField,
  FlowProjectContentV2,
  InputBinding,
  ModulePackage,
  SubflowPackage,
} from './dashboardV2Types';

export type DiffStatus = 'added' | 'removed' | 'modified' | 'unchanged';
export type FlowDiffChange =
  | 'position'
  | 'configuration'
  | 'moduleVersion'
  | 'route'
  | 'outcome'
  | 'content';

export type FlowNodeDiff = {
  readonly id: string;
  readonly status: DiffStatus;
  readonly before?: DynamicFlowNodeV2;
  readonly after?: DynamicFlowNodeV2;
  readonly changes: readonly FlowDiffChange[];
};

export type FlowEdgeDiff = {
  readonly id: string;
  readonly status: DiffStatus;
  readonly before?: DynamicFlowEdgeV2;
  readonly after?: DynamicFlowEdgeV2;
  readonly changes: readonly FlowDiffChange[];
};

export type FlowVisualDiff = {
  readonly nodes: readonly FlowNodeDiff[];
  readonly edges: readonly FlowEdgeDiff[];
  readonly screens: Readonly<Record<DiffStatus, number>>;
  readonly themeChanged: boolean;
  readonly layoutChanged: boolean;
  readonly localeChanged: boolean;
  readonly summary: Readonly<Record<DiffStatus, number>>;
};

const same = (left: unknown, right: unknown): boolean =>
  JSON.stringify(left) === JSON.stringify(right);

const refForNode = (node: DynamicFlowNodeV2 | undefined) => {
  if (node?.kind === 'verification') return node.moduleRef;
  if (node?.kind === 'subflow') return node.subflowRef;
  return null;
};

const changesForNode = (
  before: DynamicFlowNodeV2,
  after: DynamicFlowNodeV2,
): readonly FlowDiffChange[] => {
  const changes: FlowDiffChange[] = [];
  if (!same(before.position, after.position)) changes.push('position');
  if (!same(refForNode(before), refForNode(after))) changes.push('moduleVersion');
  const withoutPositionAndRef = (node: DynamicFlowNodeV2) => {
    if (node.kind === 'verification') {
      const { position, moduleRef, ...configuration } = node;
      void position;
      void moduleRef;
      return configuration;
    }
    if (node.kind === 'subflow') {
      const { position, subflowRef, ...configuration } = node;
      void position;
      void subflowRef;
      return configuration;
    }
    const { position, ...configuration } = node;
    void position;
    return configuration;
  };
  if (!same(withoutPositionAndRef(before), withoutPositionAndRef(after))) {
    changes.push('configuration');
  }
  return changes;
};

const diffCollection = <T extends { readonly id: string }, Result>(
  beforeItems: readonly T[],
  afterItems: readonly T[],
  compare: (before: T, after: T) => Result,
  create: (
    id: string,
    status: DiffStatus,
    before: T | undefined,
    after: T | undefined,
    comparison: Result | null,
  ) => Result extends readonly FlowDiffChange[] ? FlowNodeDiff | FlowEdgeDiff : never,
) => {
  const beforeById = new Map(beforeItems.map((item) => [item.id, item]));
  const afterById = new Map(afterItems.map((item) => [item.id, item]));
  const ids = [...new Set([...beforeById.keys(), ...afterById.keys()])];
  return ids.map((id) => {
    const before = beforeById.get(id);
    const after = afterById.get(id);
    if (!before) return create(id, 'added', undefined, after, null);
    if (!after) return create(id, 'removed', before, undefined, null);
    const comparison = compare(before, after);
    const status = Array.isArray(comparison) && comparison.length > 0
      ? 'modified'
      : 'unchanged';
    return create(id, status, before, after, comparison);
  });
};

const emptyStatusCounts = (): Record<DiffStatus, number> => ({
  added: 0,
  removed: 0,
  modified: 0,
  unchanged: 0,
});

export const diffFlowProjectContent = (
  before: FlowProjectContentV2,
  after: FlowProjectContentV2,
): FlowVisualDiff => {
  const nodes = diffCollection(
    before.flow.nodes,
    after.flow.nodes,
    changesForNode,
    (id, status, beforeNode, afterNode, changes): FlowNodeDiff => ({
      id,
      status,
      ...(beforeNode ? { before: beforeNode } : {}),
      ...(afterNode ? { after: afterNode } : {}),
      changes: changes ?? [],
    }),
  ) as readonly FlowNodeDiff[];
  const edges = diffCollection(
    before.flow.edges,
    after.flow.edges,
    (beforeEdge, afterEdge): readonly FlowDiffChange[] => [
      ...(
        beforeEdge.source !== afterEdge.source
        || beforeEdge.target !== afterEdge.target
          ? ['route' as const]
          : []
      ),
      ...(beforeEdge.outcome !== afterEdge.outcome ? ['outcome' as const] : []),
    ],
    (id, status, beforeEdge, afterEdge, changes): FlowEdgeDiff => ({
      id,
      status,
      ...(beforeEdge ? { before: beforeEdge } : {}),
      ...(afterEdge ? { after: afterEdge } : {}),
      changes: changes ?? [],
    }),
  ) as readonly FlowEdgeDiff[];

  const beforeScreens = [
    ...before.interface.screens,
    ...before.interface.orphanedScreens,
  ];
  const afterScreens = [
    ...after.interface.screens,
    ...after.interface.orphanedScreens,
  ];
  const screenCounts = emptyStatusCounts();
  const beforeScreenById = new Map(beforeScreens.map((screen) => [screen.id, screen]));
  const afterScreenById = new Map(afterScreens.map((screen) => [screen.id, screen]));
  for (const id of new Set([...beforeScreenById.keys(), ...afterScreenById.keys()])) {
    const beforeScreen = beforeScreenById.get(id);
    const afterScreen = afterScreenById.get(id);
    const status: DiffStatus = !beforeScreen
      ? 'added'
      : !afterScreen
        ? 'removed'
        : same(beforeScreen, afterScreen)
          ? 'unchanged'
          : 'modified';
    screenCounts[status] += 1;
  }

  const summary = emptyStatusCounts();
  for (const item of [...nodes, ...edges]) summary[item.status] += 1;

  return {
    nodes,
    edges,
    screens: screenCounts,
    themeChanged: !same(before.interface.theme, after.interface.theme),
    layoutChanged: before.interface.layout !== after.interface.layout,
    localeChanged: before.interface.defaultLocale !== after.interface.defaultLocale
      || !same(before.interface.enabledLocales, after.interface.enabledLocales),
    summary,
  };
};

export type LineageEntityKind =
  | 'flowInput'
  | 'literal'
  | 'nodeInput'
  | 'nodeOutput'
  | 'condition'
  | 'stale';

export type LineageEntity = {
  readonly id: string;
  readonly kind: LineageEntityKind;
  readonly label: string;
  readonly nodeId?: string;
  readonly fieldId?: string;
  readonly type?: FlowField['type'];
  readonly classification: DataClassification;
  readonly stale: boolean;
};

export type LineageLinkKind = 'binding' | 'condition' | 'produces';

export type LineageLink = {
  readonly id: string;
  readonly sourceId: string;
  readonly targetId: string;
  readonly kind: LineageLinkKind;
  readonly nodeId: string;
  readonly stale: boolean;
};

export type DataLineageGraph = {
  readonly entities: readonly LineageEntity[];
  readonly links: readonly LineageLink[];
  readonly summary: {
    readonly fieldCount: number;
    readonly linkCount: number;
    readonly sensitiveCount: number;
    readonly staleCount: number;
  };
};

const SENSITIVE_CLASSIFICATIONS = new Set<DataClassification>([
  'pii',
  'sensitivePii',
  'biometric',
  'credential',
  'secret',
]);

const fieldsForNode = (
  node: DynamicFlowNodeV2,
  direction: 'input' | 'output',
  moduleCatalog: readonly ModulePackage[],
  subflowCatalog: readonly SubflowPackage[],
): readonly FlowField[] => {
  if (node.kind === 'verification') {
    const contract = resolveModuleContract(node.moduleRef, moduleCatalog);
    return direction === 'input'
      ? contract?.inputFields ?? []
      : contract?.outputFields ?? [];
  }
  if (node.kind === 'subflow') {
    const contract = subflowCatalog
      .find((item) => item.id === node.subflowRef.packageId)
      ?.versions.find((version) => version.version === node.subflowRef.version)
      ?.contract;
    return direction === 'input'
      ? contract?.inputFields ?? []
      : contract?.outputFields ?? [];
  }
  return [];
};

const fieldEntity = (
  node: DynamicFlowNodeV2,
  field: FlowField,
  direction: 'input' | 'output',
): LineageEntity => ({
  id: `node:${node.id}:${direction}:${field.id}`,
  kind: direction === 'input' ? 'nodeInput' : 'nodeOutput',
  label: field.key,
  nodeId: node.id,
  fieldId: field.id,
  type: field.type,
  classification: field.classification,
  stale: false,
});

const staleEntity = (
  id: string,
  label: string,
  nodeId?: string,
): LineageEntity => ({
  id,
  kind: 'stale',
  label,
  ...(nodeId ? { nodeId } : {}),
  classification: 'internalMetadata',
  stale: true,
});

const referencesInCondition = (group: ConditionGroup): readonly DataReference[] =>
  group.conditions.flatMap((item) => item.kind === 'group'
    ? referencesInCondition(item)
    : [item.left, ...(item.right ? [item.right] : [])]);

export const buildDataLineage = (
  flow: FlowProjectContentV2['flow'],
  moduleCatalog: readonly ModulePackage[] = [],
  subflowCatalog: readonly SubflowPackage[] = [],
): DataLineageGraph => {
  const entities = new Map<string, LineageEntity>();
  const links: LineageLink[] = [];

  for (const field of flow.inputSchema.fields) {
    entities.set(`flow:${field.id}`, {
      id: `flow:${field.id}`,
      kind: 'flowInput',
      label: field.key,
      fieldId: field.id,
      type: field.type,
      classification: field.classification,
      stale: false,
    });
  }

  for (const node of flow.nodes) {
    for (const field of fieldsForNode(
      node,
      'output',
      moduleCatalog,
      subflowCatalog,
    )) {
      const entity = fieldEntity(node, field, 'output');
      entities.set(entity.id, entity);
    }
  }

  const resolveReference = (
    reference: DataReference,
    binding: InputBinding | null,
    target: FlowField | null,
  ): LineageEntity => {
    if (reference.kind === 'flowInput') {
      const id = `flow:${reference.fieldId}`;
      return entities.get(id)
        ?? staleEntity(id, `flow.${reference.fieldId}`);
    }
    if (reference.kind === 'nodeOutput') {
      const id = `node:${reference.nodeId}:output:${reference.fieldId}`;
      return entities.get(id)
        ?? staleEntity(id, `${reference.nodeId}.${reference.fieldId}`, reference.nodeId);
    }
    const id = `literal:${binding?.id ?? `${reference.valueType}:${String(reference.value)}`}`;
    return {
      id,
      kind: 'literal',
      label: `literal:${reference.valueType}`,
      ...(target ? { fieldId: target.id, type: target.type } : {}),
      classification: target?.classification ?? 'internalMetadata',
      stale: false,
    };
  };

  for (const node of flow.nodes) {
    if (node.kind === 'verification' || node.kind === 'subflow') {
      const inputFields = fieldsForNode(
        node,
        'input',
        moduleCatalog,
        subflowCatalog,
      );
      const outputFields = fieldsForNode(
        node,
        'output',
        moduleCatalog,
        subflowCatalog,
      );
      for (const field of inputFields) {
        const target = fieldEntity(node, field, 'input');
        entities.set(target.id, target);
      }
      for (const binding of node.bindings) {
        const targetField = inputFields.find(
          (field) => field.id === binding.targetFieldId,
        ) ?? null;
        const targetId = `node:${node.id}:input:${binding.targetFieldId}`;
        if (!targetField && !entities.has(targetId)) {
          entities.set(
            targetId,
            staleEntity(targetId, binding.targetFieldId, node.id),
          );
        }
        const source = resolveReference(binding.source, binding, targetField);
        if (!entities.has(source.id)) entities.set(source.id, source);
        const stale = source.stale || !targetField;
        links.push({
          id: `binding:${binding.id}`,
          sourceId: source.id,
          targetId,
          kind: 'binding',
          nodeId: node.id,
          stale,
        });
        for (const output of outputFields) {
          links.push({
            id: `produces:${binding.id}:${output.id}`,
            sourceId: targetId,
            targetId: `node:${node.id}:output:${output.id}`,
            kind: 'produces',
            nodeId: node.id,
            stale,
          });
        }
      }
    }

    if (node.kind === 'condition') {
      const targetId = `node:${node.id}:condition`;
      entities.set(targetId, {
        id: targetId,
        kind: 'condition',
        label: 'decision',
        nodeId: node.id,
        classification: 'internalMetadata',
        stale: node.condition.migrationState !== 'native',
      });
      referencesInCondition(node.condition.root).forEach((reference, index) => {
        const source = resolveReference(reference, null, null);
        if (!entities.has(source.id)) entities.set(source.id, source);
        const stale = source.stale || node.condition.migrationState !== 'native';
        links.push({
          id: `condition:${node.id}:${index}`,
          sourceId: source.id,
          targetId,
          kind: 'condition',
          nodeId: node.id,
          stale,
        });
      });
    }
  }

  const values = [...entities.values()];
  return {
    entities: values,
    links,
    summary: {
      fieldCount: values.length,
      linkCount: links.length,
      sensitiveCount: values.filter((entity) =>
        SENSITIVE_CLASSIFICATIONS.has(entity.classification)).length,
      staleCount: values.filter((entity) => entity.stale).length
        + links.filter((link) => link.stale).length,
    },
  };
};
