/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type {
  ConditionGroup,
  DataReference,
  DynamicFlowManifestV2,
  DynamicFlowNodeV2,
  InputBinding,
} from './dashboardV2Types';

export type DynamicFlowShortcut =
  | 'undo'
  | 'redo'
  | 'deleteSelection'
  | 'duplicateSelection'
  | 'selectAll'
  | 'clearSelection'
  | 'fitView';

export type ShortcutKeyEvent = {
  readonly key: string;
  readonly ctrlKey: boolean;
  readonly metaKey: boolean;
  readonly shiftKey: boolean;
  readonly altKey: boolean;
};

export const resolveDynamicFlowShortcut = (
  event: ShortcutKeyEvent,
  editableTarget = false,
): DynamicFlowShortcut | null => {
  if (editableTarget || event.altKey) return null;
  const key = event.key.toLocaleLowerCase();
  const modifier = event.ctrlKey || event.metaKey;

  if (modifier && key === 'z') return event.shiftKey ? 'redo' : 'undo';
  if (modifier && key === 'y') return 'redo';
  if (modifier && key === 'd') return 'duplicateSelection';
  if (modifier && key === 'a') return 'selectAll';
  if (!modifier && !event.shiftKey && (key === 'delete' || key === 'backspace')) {
    return 'deleteSelection';
  }
  if (!modifier && !event.shiftKey && key === 'escape') return 'clearSelection';
  if (!modifier && !event.shiftKey && key === 'f') return 'fitView';
  return null;
};

export const isEditableShortcutTarget = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable
    || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
    || Boolean(target.closest('[contenteditable="true"], [role="textbox"]'));
};

export type ContextMenuPositionInput = {
  readonly x: number;
  readonly y: number;
  readonly viewportWidth: number;
  readonly viewportHeight: number;
  readonly menuWidth: number;
  readonly menuHeight: number;
  readonly margin?: number;
};

export const clampContextMenuPosition = ({
  x,
  y,
  viewportWidth,
  viewportHeight,
  menuWidth,
  menuHeight,
  margin = 8,
}: ContextMenuPositionInput): { readonly x: number; readonly y: number } => ({
  x: Math.max(margin, Math.min(x, viewportWidth - menuWidth - margin)),
  y: Math.max(margin, Math.min(y, viewportHeight - menuHeight - margin)),
});

type IdFactory = (prefix: string) => string;
type DuplicableFlowNode = Extract<
  DynamicFlowNodeV2,
  { readonly kind: 'verification' | 'condition' | 'subflow' }
>;

const isDuplicableFlowNode = (
  node: DynamicFlowNodeV2,
): node is DuplicableFlowNode =>
  node.kind === 'verification'
  || node.kind === 'condition'
  || node.kind === 'subflow';

const remapReference = (
  reference: DataReference,
  nodeIds: ReadonlyMap<string, string>,
): DataReference => reference.kind === 'nodeOutput' && nodeIds.has(reference.nodeId)
  ? { ...reference, nodeId: nodeIds.get(reference.nodeId)! }
  : structuredClone(reference);

const duplicateBindings = (
  bindings: readonly InputBinding[],
  nodeIds: ReadonlyMap<string, string>,
  createId: IdFactory,
): readonly InputBinding[] => bindings.map((binding) => ({
  ...structuredClone(binding),
  id: createId('binding'),
  source: remapReference(binding.source, nodeIds),
}));

const duplicateConditionGroup = (
  group: ConditionGroup,
  nodeIds: ReadonlyMap<string, string>,
  createId: IdFactory,
): ConditionGroup => ({
  ...structuredClone(group),
  id: createId('condition-group'),
  conditions: group.conditions.map((condition) => condition.kind === 'group'
    ? duplicateConditionGroup(condition, nodeIds, createId)
    : {
        ...structuredClone(condition),
        id: createId('condition-rule'),
        left: remapReference(condition.left, nodeIds),
        ...(condition.right
          ? { right: remapReference(condition.right, nodeIds) }
          : {}),
      }),
});

const duplicateNode = (
  node: DuplicableFlowNode,
  nodeIds: ReadonlyMap<string, string>,
  createId: IdFactory,
): DynamicFlowNodeV2 => {
  const id = nodeIds.get(node.id)!;
  const position = {
    x: node.position.x + 36,
    y: node.position.y + 36,
  };
  if (node.kind === 'verification') {
    return {
      ...structuredClone(node),
      id,
      position,
      bindings: duplicateBindings(node.bindings, nodeIds, createId),
    };
  }
  if (node.kind === 'subflow') {
    return {
      ...structuredClone(node),
      id,
      position,
      bindings: duplicateBindings(node.bindings, nodeIds, createId),
    };
  }
  return {
    ...structuredClone(node),
    id,
    position,
    condition: {
      ...structuredClone(node.condition),
      root: duplicateConditionGroup(node.condition.root, nodeIds, createId),
    },
  };
};

export type DuplicateFlowSelectionResult = {
  readonly flow: DynamicFlowManifestV2;
  readonly duplicatedNodeIds: readonly string[];
};

export const duplicateFlowSelection = (
  flow: DynamicFlowManifestV2,
  selectedNodeIds: readonly string[],
  createId: IdFactory,
): DuplicateFlowSelectionResult => {
  const selected = new Set(selectedNodeIds);
  const candidates = flow.nodes.filter(
    (node): node is DuplicableFlowNode =>
      selected.has(node.id) && isDuplicableFlowNode(node),
  );
  if (candidates.length === 0) {
    return { flow, duplicatedNodeIds: [] };
  }

  const nodeIds = new Map(
    candidates.map((node) => [node.id, createId('node')] as const),
  );
  const duplicatedNodes = candidates.map(
    (node) => duplicateNode(node, nodeIds, createId),
  );
  const duplicatedEdges = flow.edges
    .filter((edge) => nodeIds.has(edge.source) && nodeIds.has(edge.target))
    .map((edge) => ({
      ...edge,
      id: createId('edge'),
      source: nodeIds.get(edge.source)!,
      target: nodeIds.get(edge.target)!,
    }));

  return {
    flow: {
      ...flow,
      nodes: [...flow.nodes, ...duplicatedNodes],
      edges: [...flow.edges, ...duplicatedEdges],
    },
    duplicatedNodeIds: duplicatedNodes.map((node) => node.id),
  };
};
