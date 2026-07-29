/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import {
  clampContextMenuPosition,
  duplicateFlowSelection,
  resolveDynamicFlowShortcut,
  type ShortcutKeyEvent,
} from '../src/components/dashboard/dynamicFlowShortcuts.ts';
import {
  createConditionNodeV2,
  createDefaultFlowV2,
  createFlowProjectV2,
  createVerificationNodeV2,
} from '../src/components/dashboard/dashboardV2Model.ts';
import {
  autoLayoutDynamicFlow,
  insertNodeOnEdge,
} from '../src/components/dashboard/flowEditorOperations.ts';
import {
  continueFlowDebugger,
  explainSimulationStep,
  startFlowDebugger,
  stepFlowDebugger,
} from '../src/components/dashboard/flowDebugger.ts';
import type { ScenarioExecutionResult } from '../src/components/dashboard/dashboardV2Types.ts';
import {
  buildDataLineage,
  diffFlowProjectContent,
} from '../src/components/dashboard/flowInsightsEngine.ts';

const keyEvent = (
  key: string,
  overrides: Partial<ShortcutKeyEvent> = {},
): ShortcutKeyEvent => ({
  key,
  ctrlKey: false,
  metaKey: false,
  shiftKey: false,
  altKey: false,
  ...overrides,
});

test('maps Windows, Linux, and macOS keyboard shortcuts without intercepting editors', () => {
  assert.equal(resolveDynamicFlowShortcut(keyEvent('z', { ctrlKey: true })), 'undo');
  assert.equal(resolveDynamicFlowShortcut(keyEvent('Z', {
    metaKey: true,
    shiftKey: true,
  })), 'redo');
  assert.equal(resolveDynamicFlowShortcut(keyEvent('y', { ctrlKey: true })), 'redo');
  assert.equal(resolveDynamicFlowShortcut(keyEvent('d', { metaKey: true })), 'duplicateSelection');
  assert.equal(resolveDynamicFlowShortcut(keyEvent('a', { ctrlKey: true })), 'selectAll');
  assert.equal(resolveDynamicFlowShortcut(keyEvent('Delete')), 'deleteSelection');
  assert.equal(resolveDynamicFlowShortcut(keyEvent('Escape')), 'clearSelection');
  assert.equal(resolveDynamicFlowShortcut(keyEvent('f')), 'fitView');
  assert.equal(resolveDynamicFlowShortcut(keyEvent('z', { ctrlKey: true }), true), null);
  assert.equal(resolveDynamicFlowShortcut(keyEvent('f', { altKey: true })), null);
});

test('keeps node and connection context menus inside the viewport', () => {
  assert.deepEqual(clampContextMenuPosition({
    x: 1190,
    y: 790,
    viewportWidth: 1200,
    viewportHeight: 800,
    menuWidth: 220,
    menuHeight: 190,
  }), { x: 972, y: 602 });
  assert.deepEqual(clampContextMenuPosition({
    x: -20,
    y: -10,
    viewportWidth: 1200,
    viewportHeight: 800,
    menuWidth: 220,
    menuHeight: 190,
  }), { x: 8, y: 8 });
});

test('duplicates editable selections, internal edges, and upstream references safely', () => {
  const base = createDefaultFlowV2();
  const verification = {
    ...createVerificationNodeV2(
      { packageId: 'phone-verification', version: '1' },
      { x: 240, y: 120 },
    ),
    id: 'verify-phone',
  };
  const conditionBase = createConditionNodeV2({ x: 500, y: 120 });
  assert.equal(conditionBase.kind, 'condition');
  if (conditionBase.kind !== 'condition') throw new Error('Expected condition node');
  const condition = {
    ...conditionBase,
    id: 'condition-phone',
    condition: {
      ...conditionBase.condition,
      root: {
        ...conditionBase.condition.root,
        conditions: [{
          id: 'rule-phone',
          kind: 'rule' as const,
          left: {
            kind: 'nodeOutput' as const,
            nodeId: verification.id,
            fieldId: 'verified',
          },
          operator: 'equals' as const,
          right: {
            kind: 'literal' as const,
            valueType: 'boolean' as const,
            value: true,
          },
        }],
      },
    },
  };
  const flow = {
    ...base,
    nodes: [...base.nodes, verification, condition],
    edges: [
      ...base.edges,
      {
        id: 'edge-selected',
        source: verification.id,
        target: condition.id,
        outcome: 'success' as const,
      },
    ],
  };
  let counter = 0;
  const result = duplicateFlowSelection(
    flow,
    [verification.id, condition.id, 'start'],
    (prefix) => `${prefix}-duplicate-${counter += 1}`,
  );

  assert.equal(result.duplicatedNodeIds.length, 2);
  assert.equal(result.flow.nodes.length, flow.nodes.length + 2);
  assert.equal(result.flow.edges.length, flow.edges.length + 1);
  const duplicatedCondition = result.flow.nodes.find(
    (node) => node.id === result.duplicatedNodeIds[1],
  );
  assert.equal(duplicatedCondition?.kind, 'condition');
  const duplicatedRule = duplicatedCondition?.kind === 'condition'
    ? duplicatedCondition.condition.root.conditions[0]
    : undefined;
  assert.equal(
    duplicatedRule?.kind === 'rule' && duplicatedRule.left.kind === 'nodeOutput'
      ? duplicatedRule.left.nodeId
      : null,
    result.duplicatedNodeIds[0],
  );
  assert.equal(
    result.flow.nodes.filter((node) => node.kind === 'start').length,
    1,
  );
});

test('quick insert splits an edge while preserving its stable ID and outcome', () => {
  const flow = createDefaultFlowV2();
  const node = {
    ...createVerificationNodeV2(
      { packageId: 'phone-verification', version: '1' },
      { x: 0, y: 0 },
    ),
    id: 'verify-phone',
  };
  const result = insertNodeOnEdge(
    flow,
    'edge-start-success',
    node,
    'success',
    () => 'edge-phone-success',
  );

  assert.equal(result.inserted, true);
  assert.equal(result.flow.nodes.length, flow.nodes.length + 1);
  assert.deepEqual(
    result.flow.nodes.find((candidate) => candidate.id === node.id)?.position,
    { x: 300, y: 140 },
  );
  assert.deepEqual(
    result.flow.edges.find((edge) => edge.id === 'edge-start-success'),
    {
      id: 'edge-start-success',
      source: 'start',
      target: node.id,
      outcome: 'next',
    },
  );
  assert.deepEqual(
    result.flow.edges.find((edge) => edge.id === 'edge-phone-success'),
    {
      id: 'edge-phone-success',
      source: node.id,
      target: 'terminal-success',
      outcome: 'success',
    },
  );
});

test('auto layout creates deterministic DAG layers without changing graph data', () => {
  const base = createDefaultFlowV2();
  const verification = {
    ...createVerificationNodeV2(
      { packageId: 'phone-verification', version: '1' },
      { x: 999, y: 999 },
    ),
    id: 'verify-phone',
  };
  const flow = {
    ...base,
    nodes: [...base.nodes, verification],
    edges: [
      {
        id: 'edge-start-phone',
        source: 'start',
        target: verification.id,
        outcome: 'next' as const,
      },
      {
        id: 'edge-phone-success',
        source: verification.id,
        target: 'terminal-success',
        outcome: 'success' as const,
      },
      {
        id: 'edge-phone-failure',
        source: verification.id,
        target: 'terminal-failure',
        outcome: 'failure' as const,
      },
    ],
  };

  const laidOut = autoLayoutDynamicFlow(flow);
  assert.deepEqual(
    laidOut.nodes.find((node) => node.id === 'start')?.position,
    { x: 80, y: 90 },
  );
  assert.deepEqual(
    laidOut.nodes.find((node) => node.id === verification.id)?.position,
    { x: 400, y: 90 },
  );
  assert.equal(
    laidOut.nodes.find((node) => node.id === 'terminal-success')?.position.x,
    720,
  );
  assert.equal(
    laidOut.nodes.find((node) => node.id === 'terminal-failure')?.position.x,
    720,
  );
  assert.deepEqual(laidOut.edges, flow.edges);
  assert.deepEqual(
    autoLayoutDynamicFlow(laidOut).nodes,
    laidOut.nodes,
  );
});

test('debugger pauses on breakpoints, steps once, and continues to completion', () => {
  const result: ScenarioExecutionResult = {
    scenarioId: 'debug',
    completed: true,
    terminalNodeId: 'terminal-success',
    terminalOutcome: 'success',
    steps: [
      { nodeId: 'start', outcome: 'next', edgeId: 'edge-start-phone' },
      { nodeId: 'verify-phone', outcome: 'success', edgeId: 'edge-phone-success' },
      { nodeId: 'terminal-success' },
    ],
    traversedEdgeIds: ['edge-start-phone', 'edge-phone-success'],
    assertionResults: [],
  };
  const breakpoints = new Set(['verify-phone']);
  const started = startFlowDebugger(result);
  assert.deepEqual(started, {
    activeStepIndex: 0,
    status: 'paused',
    pauseReason: 'entry',
  });

  const paused = continueFlowDebugger(result, started, breakpoints);
  assert.deepEqual(paused, {
    activeStepIndex: 1,
    status: 'paused',
    pauseReason: 'breakpoint',
  });
  assert.deepEqual(stepFlowDebugger(result, paused, breakpoints), {
    activeStepIndex: 2,
    status: 'completed',
    pauseReason: 'completed',
  });
});

test('execution explanation resolves decision reason and selected connection', () => {
  const base = createDefaultFlowV2();
  const conditionBase = createConditionNodeV2({ x: 300, y: 120 });
  assert.equal(conditionBase.kind, 'condition');
  if (conditionBase.kind !== 'condition') throw new Error('Expected condition node');
  const condition = {
    ...conditionBase,
    id: 'condition',
    condition: {
      ...conditionBase.condition,
      root: {
        ...conditionBase.condition.root,
        conditions: [{
          id: 'rule',
          kind: 'rule' as const,
          left: {
            kind: 'flowInput' as const,
            fieldId: 'riskScore',
          },
          operator: 'greaterThanOrEqual' as const,
          right: {
            kind: 'literal' as const,
            valueType: 'number' as const,
            value: 80,
          },
        }],
      },
    },
  };
  const flow = {
    ...base,
    nodes: [...base.nodes, condition],
    edges: [{
      id: 'edge-condition-success',
      source: condition.id,
      target: 'terminal-success',
      outcome: 'true' as const,
    }],
  };
  const result: ScenarioExecutionResult = {
    scenarioId: 'debug',
    completed: true,
    terminalNodeId: 'terminal-success',
    terminalOutcome: 'success',
    steps: [
      {
        nodeId: condition.id,
        outcome: 'true',
        edgeId: 'edge-condition-success',
      },
      { nodeId: 'terminal-success' },
    ],
    traversedEdgeIds: ['edge-condition-success'],
    assertionResults: [],
  };

  assert.deepEqual(explainSimulationStep(flow, result, 0), {
    step: result.steps[0],
    reason: 'condition',
    targetNodeId: 'terminal-success',
    hasMatchingConnection: true,
  });
  assert.equal(
    explainSimulationStep(flow, result, 1)?.reason,
    'terminal',
  );
});

test('visual diff classifies graph, interface, and position changes', () => {
  const before = createFlowProjectV2('Before');
  const verification = {
    ...createVerificationNodeV2(
      { packageId: 'phone-verification', version: '1' },
      { x: 300, y: 120 },
    ),
    id: 'verify-phone',
  };
  const movedStart = {
    ...before.flow.nodes.find((node) => node.id === 'start')!,
    position: { x: 120, y: 220 },
  };
  const after = {
    ...before,
    flow: {
      ...before.flow,
      nodes: [
        ...before.flow.nodes.filter((node) => node.id !== 'start'),
        movedStart,
        verification,
      ],
      edges: [
        ...before.flow.edges,
        {
          id: 'edge-phone-success',
          source: verification.id,
          target: 'terminal-success',
          outcome: 'success' as const,
        },
      ],
    },
    interface: {
      ...before.interface,
      layout: 'split' as const,
    },
  };

  const diff = diffFlowProjectContent(before, after);
  assert.equal(
    diff.nodes.find((node) => node.id === verification.id)?.status,
    'added',
  );
  assert.deepEqual(
    diff.nodes.find((node) => node.id === 'start')?.changes,
    ['position'],
  );
  assert.equal(diff.summary.added, 2);
  assert.equal(diff.summary.modified, 1);
  assert.equal(diff.layoutChanged, true);
  assert.equal(diff.themeChanged, false);
});

test('data lineage links classified flow input through node input and outputs', () => {
  const flow = createDefaultFlowV2();
  const nodeBase = createVerificationNodeV2(
    { packageId: 'phone-verification', version: '1' },
    { x: 300, y: 120 },
  );
  assert.equal(nodeBase.kind, 'verification');
  if (nodeBase.kind !== 'verification') throw new Error('Expected verification node');
  const node = {
    ...nodeBase,
    id: 'verify-phone',
    bindings: [{
      id: 'binding-phone',
      targetFieldId: 'phoneNumber',
      source: {
        kind: 'flowInput' as const,
        fieldId: 'phoneNumber',
      },
    }],
  };
  const lineage = buildDataLineage({
    ...flow,
    nodes: [...flow.nodes, node],
  });

  assert.equal(
    lineage.entities.find((entity) => entity.id === 'flow:phoneNumber')
      ?.classification,
    'sensitivePii',
  );
  assert.ok(lineage.links.some((link) =>
    link.sourceId === 'flow:phoneNumber'
      && link.targetId === 'node:verify-phone:input:phoneNumber'
      && link.kind === 'binding'));
  assert.ok(lineage.links.some((link) =>
    link.sourceId === 'node:verify-phone:input:phoneNumber'
      && link.targetId === 'node:verify-phone:output:verified'
      && link.kind === 'produces'));
  assert.ok(lineage.summary.sensitiveCount > 0);
  assert.equal(lineage.summary.staleCount, 0);
});
