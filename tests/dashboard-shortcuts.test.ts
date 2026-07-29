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
  createVerificationNodeV2,
} from '../src/components/dashboard/dashboardV2Model.ts';

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
