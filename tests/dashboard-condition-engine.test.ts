/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import {
  CONDITION_OPERATORS_BY_TYPE,
  INPUT_BINDING_ISSUE_CODES,
  collectUpstreamNodeIds,
  evaluateCondition,
  isConditionOperatorCompatible,
  isUpstreamNode,
  validateInputBindings,
  type ConditionEvaluationContext,
  type ConditionExpression,
  type InputBindingValidationContext,
  type SyntheticPrimitive,
} from '../src/components/dashboard/conditionEngine.ts';
import type {
  ConditionOperator,
  ConditionRule,
  DataReference,
  FlowField,
  FlowFieldType,
  InputBinding,
  PrimitiveFieldType,
} from '../src/components/dashboard/dashboardV2Types.ts';

const evaluationContext = {
  flowInputs: {
    country: 'VN',
    emptyText: '',
    minimumAge: 18,
    consent: true,
    rejected: false,
  },
  nodeOutputs: {
    identity: {
      fullName: 'Synthetic Applicant',
      age: 22,
      verified: true,
    },
  },
} as const satisfies ConditionEvaluationContext;

const valueTypeOf = (value: SyntheticPrimitive): PrimitiveFieldType =>
  typeof value === 'string'
    ? 'string'
    : typeof value === 'number'
      ? 'number'
      : 'boolean';

const literal = (
  value: SyntheticPrimitive,
): Extract<DataReference, { readonly kind: 'literal' }> => ({
  kind: 'literal',
  value,
  valueType: valueTypeOf(value),
});

const flowInput = (
  fieldId: string,
): Extract<DataReference, { readonly kind: 'flowInput' }> => ({
  kind: 'flowInput',
  fieldId,
});

const nodeOutput = (
  nodeId: string,
  fieldId: string,
): Extract<DataReference, { readonly kind: 'nodeOutput' }> => ({
  kind: 'nodeOutput',
  nodeId,
  fieldId,
});

const rule = (
  left: ConditionRule['left'],
  operator: ConditionOperator,
  right?: ConditionRule['right'],
): ConditionRule => ({
  id: `rule-${operator}`,
  kind: 'rule',
  left,
  operator,
  right,
});

test('exposes only operators compatible with each contract field type', () => {
  assert.deepEqual(CONDITION_OPERATORS_BY_TYPE.string, [
    'equals',
    'notEquals',
    'exists',
    'notExists',
    'contains',
    'startsWith',
    'endsWith',
  ]);
  assert.deepEqual(CONDITION_OPERATORS_BY_TYPE.number, [
    'equals',
    'notEquals',
    'exists',
    'notExists',
    'greaterThan',
    'greaterThanOrEqual',
    'lessThan',
    'lessThanOrEqual',
  ]);
  assert.deepEqual(CONDITION_OPERATORS_BY_TYPE.boolean, [
    'equals',
    'notEquals',
    'exists',
    'notExists',
  ]);
  assert.deepEqual(CONDITION_OPERATORS_BY_TYPE.object, [
    'exists',
    'notExists',
  ]);
  assert.deepEqual(CONDITION_OPERATORS_BY_TYPE.array, [
    'exists',
    'notExists',
  ]);
  assert.equal(isConditionOperatorCompatible('string', 'contains'), true);
  assert.equal(isConditionOperatorCompatible('string', 'greaterThan'), false);
  assert.equal(
    isConditionOperatorCompatible('number', 'lessThanOrEqual'),
    true,
  );
  assert.equal(isConditionOperatorCompatible('number', 'startsWith'), false);
  assert.equal(isConditionOperatorCompatible('boolean', 'equals'), true);
  assert.equal(isConditionOperatorCompatible('boolean', 'contains'), false);
  assert.equal(isConditionOperatorCompatible('object', 'exists'), true);
  assert.equal(isConditionOperatorCompatible('object', 'equals'), false);
});

test('evaluates equality, existence, string, number, and boolean operators', () => {
  const expressions: readonly [ConditionExpression, boolean][] = [
    [rule(flowInput('country'), 'equals', literal('VN')), true],
    [rule(flowInput('country'), 'notEquals', literal('US')), true],
    [rule(flowInput('country'), 'exists'), true],
    [rule(flowInput('missing'), 'notExists'), true],
    [
      rule(
        nodeOutput('identity', 'fullName'),
        'contains',
        literal('Applicant'),
      ),
      true,
    ],
    [rule(flowInput('country'), 'startsWith', literal('V')), true],
    [rule(flowInput('country'), 'endsWith', literal('N')), true],
    [
      rule(nodeOutput('identity', 'age'), 'greaterThan', literal(18)),
      true,
    ],
    [
      rule(nodeOutput('identity', 'age'), 'greaterThanOrEqual', literal(22)),
      true,
    ],
    [rule(flowInput('minimumAge'), 'lessThan', literal(22)), true],
    [rule(flowInput('minimumAge'), 'lessThanOrEqual', literal(18)), true],
    [rule(flowInput('consent'), 'equals', literal(true)), true],
    [rule(flowInput('rejected'), 'notEquals', literal(true)), true],
  ];

  expressions.forEach(([expression, expected]) => {
    assert.equal(evaluateCondition(expression, evaluationContext), expected);
  });
});

test('evaluates nested AND and OR groups without executing expression strings', () => {
  const expression: ConditionExpression = {
    id: 'root',
    kind: 'group',
    combinator: 'and',
    conditions: [
      rule(flowInput('consent'), 'equals', literal(true)),
      {
        id: 'country-or-age',
        kind: 'group',
        combinator: 'or',
        conditions: [
          rule(flowInput('country'), 'equals', literal('US')),
          rule(
            nodeOutput('identity', 'age'),
            'greaterThanOrEqual',
            literal(18),
          ),
        ],
      },
    ],
  };

  assert.equal(evaluateCondition(expression, evaluationContext), true);
  assert.equal(evaluateCondition({
    id: 'empty-or',
    kind: 'group',
    combinator: 'or',
    conditions: [],
  }, evaluationContext), false);
  assert.equal(evaluateCondition({
    id: 'empty-and',
    kind: 'group',
    combinator: 'and',
    conditions: [],
  }, evaluationContext), false);
});

test('fails closed for absent operands, incompatible operators, and mixed types', () => {
  assert.equal(
    evaluateCondition(
      rule(flowInput('missing'), 'equals', literal('value')),
      evaluationContext,
    ),
    false,
  );
  assert.equal(
    evaluateCondition(
      rule(flowInput('country'), 'greaterThan', literal('A')),
      evaluationContext,
    ),
    false,
  );
  assert.equal(
    evaluateCondition(
      rule(nodeOutput('identity', 'age'), 'equals', literal('22')),
      evaluationContext,
    ),
    false,
  );
  assert.equal(
    evaluateCondition(
      rule(flowInput('consent'), 'equals'),
      evaluationContext,
    ),
    false,
  );
  assert.equal(
    evaluateCondition(
      rule(flowInput('minimumAge'), 'equals', {
        kind: 'literal',
        value: '18',
        valueType: 'number',
      }),
      evaluationContext,
    ),
    false,
  );
});

test('finds every transitive upstream node and terminates on malformed cycles', () => {
  const edges = [
    { source: 'start', target: 'identity' },
    { source: 'identity', target: 'screening' },
    { source: 'screening', target: 'decision' },
    { source: 'decision', target: 'identity' },
  ] as const;

  assert.deepEqual(
    [...collectUpstreamNodeIds(edges, 'decision')].sort(),
    ['identity', 'screening', 'start'],
  );
  assert.equal(isUpstreamNode(edges, 'start', 'decision'), true);
  assert.equal(isUpstreamNode(edges, 'decision', 'decision'), false);
  assert.equal(isUpstreamNode(edges, 'unknown', 'decision'), false);
});

const field = (
  id: string,
  type: FlowFieldType,
  required: boolean,
): FlowField => ({
  id,
  key: id,
  type,
  format: 'none',
  required,
  classification: 'internalMetadata',
  safeForResult: true,
});

const targetFields = [
  field('fullName', 'string', true),
  field('age', 'number', true),
  field('consent', 'boolean', false),
] as const satisfies readonly FlowField[];

let bindingSequence = 0;
const binding = (
  targetFieldId: string,
  source: InputBinding['source'],
): InputBinding => ({
  id: `binding-${bindingSequence += 1}`,
  targetFieldId,
  source,
});

const createValidationContext = (
  overrides: Partial<InputBindingValidationContext> = {},
): InputBindingValidationContext => ({
  targetNodeId: 'screening',
  targetFields,
  bindings: [
    binding('fullName', nodeOutput('identity', 'fullName')),
    binding('age', literal(22)),
  ],
  flowInputFields: [
    field('consent', 'boolean', false),
  ],
  nodeOutputs: [
    {
      nodeId: 'identity',
      fields: [
        field('fullName', 'string', true),
        field('age', 'number', true),
      ],
    },
    {
      nodeId: 'later-node',
      fields: [
        field('fullName', 'string', true),
      ],
    },
  ],
  edges: [
    { source: 'start', target: 'identity' },
    { source: 'identity', target: 'screening' },
    { source: 'screening', target: 'later-node' },
  ],
  ...overrides,
});

test('accepts exact typed mappings from literals, flow input, and upstream output', () => {
  const context = createValidationContext({
    bindings: [
      binding('fullName', nodeOutput('identity', 'fullName')),
      binding('age', nodeOutput('identity', 'age')),
      binding('consent', flowInput('consent')),
    ],
  });

  assert.deepEqual(validateInputBindings(context), []);
});

test('reports missing required inputs and duplicate target mappings', () => {
  const issues = validateInputBindings(createValidationContext({
    bindings: [
      binding('fullName', literal('First value')),
      binding('fullName', literal('Second value')),
    ],
  }));

  assert.deepEqual(
    issues.map((issue) => issue.code),
    [
      INPUT_BINDING_ISSUE_CODES.missingRequired,
      INPUT_BINDING_ISSUE_CODES.duplicateTarget,
    ],
  );
});

test('reports missing source nodes, missing fields, and non-upstream mappings', () => {
  const issues = validateInputBindings(createValidationContext({
    bindings: [
      binding('fullName', nodeOutput('removed-node', 'fullName')),
      binding('age', flowInput('removed-flow-field')),
      binding('removed-target', literal(true)),
      binding('consent', nodeOutput('later-node', 'fullName')),
    ],
  }));

  assert.deepEqual(
    issues.map((issue) => issue.code),
    [
      INPUT_BINDING_ISSUE_CODES.missingSource,
      INPUT_BINDING_ISSUE_CODES.missingField,
      INPUT_BINDING_ISSUE_CODES.missingField,
      INPUT_BINDING_ISSUE_CODES.nonUpstream,
      INPUT_BINDING_ISSUE_CODES.typeMismatch,
    ],
  );
});

test('rejects implicit type coercion and flags preserved legacy conditions', () => {
  const issues = validateInputBindings(createValidationContext({
    bindings: [
      binding('fullName', literal(42)),
      binding('age', literal('42')),
    ],
    condition: {
      root: {
        id: 'legacy-root',
        kind: 'group',
        combinator: 'and',
        conditions: [],
      },
      legacyExpression: 'output.verified === true',
      migrationState: 'requiresConversion',
    },
  }));

  assert.deepEqual(
    issues.map((issue) => issue.code),
    [
      INPUT_BINDING_ISSUE_CODES.typeMismatch,
      INPUT_BINDING_ISSUE_CODES.typeMismatch,
      INPUT_BINDING_ISSUE_CODES.legacyCondition,
    ],
  );
});

test('rejects a literal whose declared type disagrees with its value', () => {
  const issues = validateInputBindings(createValidationContext({
    bindings: [
      binding('fullName', literal('Synthetic Applicant')),
      binding('age', {
        kind: 'literal',
        value: '22',
        valueType: 'number',
      }),
    ],
  }));

  assert.deepEqual(
    issues.map((issue) => issue.code),
    [
      INPUT_BINDING_ISSUE_CODES.typeMismatch,
    ],
  );
});
