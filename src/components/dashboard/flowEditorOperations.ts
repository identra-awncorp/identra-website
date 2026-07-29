/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type {
  DynamicFlowManifestV2,
  DynamicFlowNodeV2,
  OutcomeId,
} from './dashboardV2Types';

export type FlowLayoutDirection = 'horizontal' | 'vertical';

type InsertNodeOnEdgeResult = {
  readonly flow: DynamicFlowManifestV2;
  readonly inserted: boolean;
  readonly newEdgeId: string | null;
};

const compareNodesByAxis = (
  direction: FlowLayoutDirection,
  left: DynamicFlowNodeV2,
  right: DynamicFlowNodeV2,
): number => {
  const primary = direction === 'horizontal'
    ? left.position.y - right.position.y
    : left.position.x - right.position.x;
  return primary || left.id.localeCompare(right.id);
};

/**
 * Inserts a node between the source and target of an existing edge.
 *
 * The original edge ID and source outcome are retained on the first segment so
 * persisted scenario references stay stable. The caller supplies the inserted
 * node's outgoing outcome because it depends on the module contract.
 */
export const insertNodeOnEdge = (
  manifest: DynamicFlowManifestV2,
  edgeId: string,
  node: DynamicFlowNodeV2,
  outgoingOutcome: OutcomeId,
  createId: (prefix: string) => string,
): InsertNodeOnEdgeResult => {
  const edge = manifest.edges.find((candidate) => candidate.id === edgeId);
  if (!edge || manifest.nodes.some((candidate) => candidate.id === node.id)) {
    return { flow: manifest, inserted: false, newEdgeId: null };
  }

  const source = manifest.nodes.find((candidate) => candidate.id === edge.source);
  const target = manifest.nodes.find((candidate) => candidate.id === edge.target);
  if (!source || !target || node.kind === 'terminal') {
    return { flow: manifest, inserted: false, newEdgeId: null };
  }

  const positionedNode: DynamicFlowNodeV2 = {
    ...node,
    position: {
      x: Math.round((source.position.x + target.position.x) / 2),
      y: Math.round((source.position.y + target.position.y) / 2),
    },
  };
  const newEdgeId = createId('edge');

  return {
    inserted: true,
    newEdgeId,
    flow: {
      ...manifest,
      nodes: [...manifest.nodes, positionedNode],
      edges: manifest.edges.flatMap((candidate) => candidate.id === edgeId
        ? [
            {
              ...candidate,
              target: positionedNode.id,
            },
            {
              id: newEdgeId,
              source: positionedNode.id,
              target: edge.target,
              outcome: outgoingOutcome,
            },
          ]
        : [candidate]),
    },
  };
};

/**
 * Produces a deterministic layered layout without coupling the domain model to
 * the graph renderer. Invalid cyclic leftovers are retained in a final layer.
 */
export const autoLayoutDynamicFlow = (
  manifest: DynamicFlowManifestV2,
  direction: FlowLayoutDirection = 'horizontal',
): DynamicFlowManifestV2 => {
  if (manifest.nodes.length === 0) return manifest;

  const nodeById = new Map(manifest.nodes.map((node) => [node.id, node]));
  const outgoing = new Map<string, string[]>();
  const indegree = new Map(manifest.nodes.map((node) => [node.id, 0]));
  const predecessors = new Map<string, string[]>();

  for (const edge of manifest.edges) {
    if (!nodeById.has(edge.source) || !nodeById.has(edge.target)) continue;
    outgoing.set(edge.source, [...(outgoing.get(edge.source) ?? []), edge.target]);
    predecessors.set(edge.target, [
      ...(predecessors.get(edge.target) ?? []),
      edge.source,
    ]);
    indegree.set(edge.target, (indegree.get(edge.target) ?? 0) + 1);
  }

  const secondarySort = (leftId: string, rightId: string) => {
    const left = nodeById.get(leftId);
    const right = nodeById.get(rightId);
    if (!left || !right) return leftId.localeCompare(rightId);
    return compareNodesByAxis(direction, left, right);
  };
  const queue = [...indegree.entries()]
    .filter(([, count]) => count === 0)
    .map(([id]) => id)
    .sort(secondarySort);
  const orderedIds: string[] = [];

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) break;
    orderedIds.push(current);
    for (const targetId of outgoing.get(current) ?? []) {
      const nextIndegree = (indegree.get(targetId) ?? 0) - 1;
      indegree.set(targetId, nextIndegree);
      if (nextIndegree === 0) {
        queue.push(targetId);
        queue.sort(secondarySort);
      }
    }
  }

  const residualIds = manifest.nodes
    .map((node) => node.id)
    .filter((id) => !orderedIds.includes(id))
    .sort(secondarySort);
  const layerById = new Map<string, number>();

  for (const nodeId of orderedIds) {
    const predecessorLayers = (predecessors.get(nodeId) ?? [])
      .map((predecessorId) => layerById.get(predecessorId))
      .filter((layer): layer is number => layer !== undefined);
    layerById.set(
      nodeId,
      predecessorLayers.length > 0 ? Math.max(...predecessorLayers) + 1 : 0,
    );
  }

  const lastLayer = Math.max(0, ...layerById.values());
  residualIds.forEach((nodeId, index) => {
    layerById.set(nodeId, lastLayer + 1 + index);
  });

  const layers = new Map<number, DynamicFlowNodeV2[]>();
  for (const node of manifest.nodes) {
    const layer = layerById.get(node.id) ?? 0;
    layers.set(layer, [...(layers.get(layer) ?? []), node]);
  }

  const positionById = new Map<string, DynamicFlowNodeV2['position']>();
  for (const [layer, layerNodes] of layers) {
    const sortedNodes = [...layerNodes].sort((left, right) =>
      compareNodesByAxis(direction, left, right));
    sortedNodes.forEach((node, index) => {
      positionById.set(node.id, direction === 'horizontal'
        ? { x: 80 + layer * 320, y: 90 + index * 190 }
        : { x: 90 + index * 280, y: 80 + layer * 210 });
    });
  }

  return {
    ...manifest,
    nodes: manifest.nodes.map((node) => ({
      ...node,
      position: positionById.get(node.id) ?? node.position,
    })),
  };
};
