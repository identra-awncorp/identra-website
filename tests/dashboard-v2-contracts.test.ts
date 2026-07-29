/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import {
  INPUT_BINDING_ISSUE_CODES,
  evaluateCondition,
  validateInputBindings,
  type ConditionEvaluationContext,
  type ConditionExpression,
  type InputBindingValidationContext,
  type SyntheticPrimitive,
} from '../src/components/dashboard/conditionEngine.ts';
import {
  BUILT_IN_MODULE_IDS,
  BUILT_IN_MODULES,
  DATABASE_SOURCE_IDS,
  DATABASE_SOURCES,
} from '../src/components/dashboard/dashboardModuleRegistry.ts';
import {
  isModuleRefAvailable,
  resolveModuleContract,
} from '../src/components/dashboard/dashboardV2Model.ts';
import type {
  ConditionOperator,
  ConditionRule,
  CustomModuleDefinitionMetadata,
  DataReference,
  DynamicFlowManifestV2,
  FlowField,
  FlowFieldType,
  InputBinding,
  ModuleContract,
  ModulePackage,
  PrimitiveFieldType,
} from '../src/components/dashboard/dashboardV2Types.ts';
import { validateDynamicFlowV2 } from '../src/components/dashboard/dashboardValidation.ts';
import { simulateDynamicFlowV2 } from '../src/components/dashboard/flowSimulationEngine.ts';

const fieldFingerprint = (field: FlowField): string =>
  [
    field.id,
    field.type,
    field.classification,
    field.required ? 'required' : 'optional',
    field.safeForResult ? 'safe' : 'restricted',
  ].join(':');

test('built-in module contracts publish stable field, classification, and result-safety metadata', () => {
  const fingerprints = Object.fromEntries(
    BUILT_IN_MODULE_IDS.map((moduleId) => {
      const contract = BUILT_IN_MODULES[moduleId];
      return [
        moduleId,
        {
          input: contract.inputFields.map(fieldFingerprint),
          output: contract.outputFields.map(fieldFingerprint),
        },
      ];
    }),
  );

  assert.deepEqual(fingerprints, {
    'citizen-id': {
      input: ['credential:object:credential:required:restricted'],
      output: [
        'verified:boolean:publicMetadata:required:safe',
        'fullName:string:pii:required:restricted',
        'identityNumber:string:sensitivePii:required:restricted',
        'dateOfBirth:string:pii:optional:restricted',
      ],
    },
    'driver-license': {
      input: ['credential:object:credential:required:restricted'],
      output: [
        'verified:boolean:publicMetadata:required:safe',
        'licenseNumber:string:sensitivePii:required:restricted',
        'fullName:string:pii:required:restricted',
        'expiryDate:string:pii:optional:restricted',
      ],
    },
    'health-insurance': {
      input: ['credential:object:credential:required:restricted'],
      output: [
        'verified:boolean:publicMetadata:required:safe',
        'memberNumber:string:sensitivePii:required:restricted',
        'coverageActive:boolean:internalMetadata:required:safe',
      ],
    },
    'phone-verification': {
      input: ['phoneNumber:string:sensitivePii:required:restricted'],
      output: [
        'verified:boolean:publicMetadata:required:safe',
        'normalizedPhoneNumber:string:sensitivePii:required:restricted',
      ],
    },
    'nfc-scan': {
      input: [],
      output: [
        'verified:boolean:publicMetadata:required:safe',
        'documentData:object:sensitivePii:required:restricted',
      ],
    },
    'education-issuer': {
      input: ['credential:object:credential:required:restricted'],
      output: [
        'verified:boolean:publicMetadata:required:safe',
        'issuerDid:string:publicMetadata:required:safe',
        'qualification:string:pii:required:restricted',
      ],
    },
    'education-trust-framework': {
      input: ['credential:object:credential:required:restricted'],
      output: [
        'verified:boolean:publicMetadata:required:safe',
        'frameworkId:string:publicMetadata:required:safe',
        'issuerDid:string:publicMetadata:required:safe',
      ],
    },
    'face-liveness': {
      input: [],
      output: [
        'isLive:boolean:publicMetadata:required:safe',
        'faceReference:string:biometric:required:restricted',
      ],
    },
    'face-data-match': {
      input: [
        'faceReference:string:biometric:required:restricted',
        'identityData:object:sensitivePii:required:restricted',
      ],
      output: [
        'verified:boolean:publicMetadata:required:safe',
        'matchScore:number:internalMetadata:required:safe',
      ],
    },
    'database-cross-check': {
      input: [
        'fullName:string:pii:required:restricted',
        'identityNumber:string:sensitivePii:optional:restricted',
        'dateOfBirth:string:pii:optional:restricted',
        'nationality:string:pii:optional:restricted',
        'faceReference:string:biometric:optional:restricted',
      ],
      output: [
        'outcome:string:publicMetadata:required:safe',
        'matchedSourceCount:number:internalMetadata:required:safe',
        'checkedSourceCount:number:internalMetadata:required:safe',
      ],
    },
  });

  for (const moduleId of BUILT_IN_MODULE_IDS) {
    const contract = BUILT_IN_MODULES[moduleId];
    assert.deepEqual(contract.ref, { packageId: moduleId, version: '1' });
    assert.equal(contract.origin, 'builtIn');
    assert.equal(contract.estimatedDurationMs > 0, true);
    assert.equal(contract.outcomes.length > 0, true);
    assert.equal(new Set(contract.inputFields.map((field) => field.id)).size, contract.inputFields.length);
    assert.equal(new Set(contract.outputFields.map((field) => field.id)).size, contract.outputFields.length);
  }
});

test('built-in module contracts expose stable interface capabilities', () => {
  const capabilities = Object.fromEntries(
    BUILT_IN_MODULE_IDS.map((moduleId) => [
      moduleId,
      BUILT_IN_MODULES[moduleId].uiCapabilities,
    ]),
  );

  assert.deepEqual(capabilities, {
    'citizen-id': {
      supportedStates: ['intro', 'input', 'processing', 'success', 'error', 'retry'],
      supportsConsent: false,
      supportsCredentialRequest: true,
      supportsFieldSummary: true,
      supportsDevicePermission: false,
      supportsCapture: false,
    },
    'driver-license': {
      supportedStates: ['intro', 'input', 'processing', 'success', 'error', 'retry'],
      supportsConsent: false,
      supportsCredentialRequest: true,
      supportsFieldSummary: true,
      supportsDevicePermission: false,
      supportsCapture: false,
    },
    'health-insurance': {
      supportedStates: ['intro', 'permission', 'input', 'processing', 'success', 'error', 'retry'],
      supportsConsent: true,
      supportsCredentialRequest: true,
      supportsFieldSummary: true,
      supportsDevicePermission: true,
      supportsCapture: false,
    },
    'phone-verification': {
      supportedStates: ['intro', 'input', 'processing', 'success', 'error', 'retry'],
      supportsConsent: false,
      supportsCredentialRequest: true,
      supportsFieldSummary: true,
      supportsDevicePermission: false,
      supportsCapture: false,
    },
    'nfc-scan': {
      supportedStates: ['intro', 'permission', 'capture', 'processing', 'success', 'error', 'retry'],
      supportsConsent: true,
      supportsCredentialRequest: false,
      supportsFieldSummary: true,
      supportsDevicePermission: true,
      supportsCapture: true,
    },
    'education-issuer': {
      supportedStates: ['intro', 'input', 'processing', 'success', 'error', 'retry'],
      supportsConsent: false,
      supportsCredentialRequest: true,
      supportsFieldSummary: true,
      supportsDevicePermission: false,
      supportsCapture: false,
    },
    'education-trust-framework': {
      supportedStates: ['intro', 'input', 'processing', 'success', 'error', 'retry'],
      supportsConsent: false,
      supportsCredentialRequest: true,
      supportsFieldSummary: true,
      supportsDevicePermission: false,
      supportsCapture: false,
    },
    'face-liveness': {
      supportedStates: ['intro', 'permission', 'capture', 'processing', 'success', 'error', 'retry'],
      supportsConsent: true,
      supportsCredentialRequest: false,
      supportsFieldSummary: true,
      supportsDevicePermission: true,
      supportsCapture: true,
    },
    'face-data-match': {
      supportedStates: ['intro', 'processing', 'success', 'error', 'retry'],
      supportsConsent: false,
      supportsCredentialRequest: false,
      supportsFieldSummary: true,
      supportsDevicePermission: false,
      supportsCapture: false,
    },
    'database-cross-check': {
      supportedStates: [
        'intro',
        'processing',
        'matched',
        'notMatched',
        'inconclusive',
        'sourceUnavailable',
        'retry',
      ],
      supportsConsent: false,
      supportsCredentialRequest: false,
      supportsFieldSummary: true,
      supportsDevicePermission: false,
      supportsCapture: false,
    },
  });
});

test('module references resolve only their pinned immutable version and report a missing pin', () => {
  const base = BUILT_IN_MODULES['citizen-id'];
  const customContract = (
    version: string,
    outputFieldId: string,
  ): ModuleContract => ({
    ...base,
    ref: { packageId: 'synthetic-custom-module', version },
    origin: 'custom',
    category: 'custom',
    outputFields: [{
      id: outputFieldId,
      key: outputFieldId,
      type: 'boolean',
      format: 'none',
      required: true,
      classification: 'publicMetadata',
      safeForResult: true,
    }],
  });
  const modulePackage: ModulePackage = {
    id: 'synthetic-custom-module',
    name: 'Synthetic custom module',
    origin: 'custom',
    activeVersion: '2.0.0',
    versions: [
      {
        version: '1.0.0',
        status: 'deprecated',
        contract: customContract('1.0.0', 'legacyVerified'),
        createdAt: '2026-01-01T00:00:00.000Z',
      },
      {
        version: '2.0.0',
        status: 'active',
        contract: customContract('2.0.0', 'verified'),
        createdAt: '2026-02-01T00:00:00.000Z',
      },
    ],
  };

  assert.equal(
    resolveModuleContract(
      { packageId: modulePackage.id, version: '1.0.0' },
      [modulePackage],
    )?.outputFields[0]?.id,
    'legacyVerified',
  );
  assert.equal(
    resolveModuleContract(
      { packageId: modulePackage.id, version: '2.0.0' },
      [modulePackage],
    )?.outputFields[0]?.id,
    'verified',
  );
  assert.equal(
    resolveModuleContract(
      { packageId: modulePackage.id, version: '3.0.0' },
      [modulePackage],
    ),
    null,
  );
  assert.equal(
    isModuleRefAvailable({ packageId: 'citizen-id', version: '1' }, []),
    true,
  );
  assert.equal(
    isModuleRefAvailable({ packageId: 'citizen-id', version: '2' }, []),
    false,
  );

  const manifest: DynamicFlowManifestV2 = {
    schemaVersion: 2,
    inputSchema: { fields: [] },
    nodes: [
      { id: 'start', kind: 'start', position: { x: 0, y: 0 } },
      {
        id: 'missing-version-node',
        kind: 'verification',
        moduleRef: { packageId: 'citizen-id', version: '2' },
        position: { x: 100, y: 0 },
        bindings: [],
        retryPolicy: { maxAttempts: 0 },
        selectedDatabaseSourceIds: [],
      },
      {
        id: 'success',
        kind: 'terminal',
        terminalOutcome: 'success',
        position: { x: 200, y: 0 },
      },
      {
        id: 'failure',
        kind: 'terminal',
        terminalOutcome: 'failure',
        position: { x: 200, y: 100 },
      },
    ],
    edges: [
      { id: 'to-module', source: 'start', target: 'missing-version-node', outcome: 'next' },
      { id: 'to-success', source: 'missing-version-node', target: 'success', outcome: 'success' },
      { id: 'to-failure', source: 'missing-version-node', target: 'failure', outcome: 'failure' },
    ],
  };
  assert.equal(
    validateDynamicFlowV2(manifest).some(
      (issue) => issue.code === 'missingModule'
        && issue.nodeId === 'missing-version-node',
    ),
    true,
  );
  const missingVersionNode = manifest.nodes.find(
    (node) => node.id === 'missing-version-node',
  );
  assert.equal(missingVersionNode?.kind, 'verification');
  assert.deepEqual(
    missingVersionNode?.kind === 'verification'
      ? missingVersionNode.moduleRef
      : null,
    { packageId: 'citizen-id', version: '2' },
  );
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

const flowInput = (
  fieldId: string,
): Extract<DataReference, { kind: 'flowInput' }> => ({
  kind: 'flowInput',
  fieldId,
});

const nodeOutput = (
  nodeId: string,
  fieldId: string,
): Extract<DataReference, { kind: 'nodeOutput' }> => ({
  kind: 'nodeOutput',
  nodeId,
  fieldId,
});

const literal = (
  value: string | number | boolean,
): Extract<DataReference, { kind: 'literal' }> => ({
  kind: 'literal',
  value,
  valueType: typeof value as PrimitiveFieldType,
});

let bindingId = 0;
const binding = (
  targetFieldId: string,
  source: InputBinding['source'],
): InputBinding => ({
  id: `binding-${bindingId += 1}`,
  targetFieldId,
  source,
});

const targetFields = [
  field('subjectName', 'string', true),
  field('riskScore', 'number', true),
  field('approved', 'boolean', false),
  field('sourceCheck', 'string', false),
] as const;

const bindingContext = (
  bindings: readonly InputBinding[],
): InputBindingValidationContext => ({
  targetNodeId: 'target',
  targetFields,
  bindings,
  flowInputFields: [
    field('nameInput', 'string', true),
    field('scoreInput', 'number', true),
    field('approvalInput', 'boolean', false),
  ],
  nodeOutputs: [
    {
      nodeId: 'upstream',
      fields: [
        field('nameOutput', 'string', true),
        field('scoreOutput', 'number', true),
      ],
    },
    {
      nodeId: 'downstream',
      fields: [field('nameOutput', 'string', true)],
    },
  ],
  edges: [
    { source: 'start', target: 'upstream' },
    { source: 'upstream', target: 'target' },
    { source: 'target', target: 'downstream' },
  ],
});

test('typed bindings accept only exact flow-input, literal, and upstream-output types', () => {
  const bindings = [
    binding('subjectName', flowInput('nameInput')),
    binding('riskScore', nodeOutput('upstream', 'scoreOutput')),
    binding('approved', literal(true)),
  ];

  assert.deepEqual(validateInputBindings(bindingContext(bindings)), []);
});

test('typed bindings reject persisted literal identity values', () => {
  const sensitiveTarget: FlowField = {
    ...field('identityNumber', 'string', true),
    classification: 'sensitivePii',
    safeForResult: false,
  };
  const issues = validateInputBindings({
    ...bindingContext([]),
    targetFields: [sensitiveTarget],
    bindings: [binding('identityNumber', literal('synthetic-only'))],
  });

  assert.equal(
    issues.some(
      (issue) => issue.code === INPUT_BINDING_ISSUE_CODES.sensitiveLiteral,
    ),
    true,
  );
});

test('typed binding validation reports missing required, stale, non-upstream, mismatched, and duplicate mappings without mutating references', () => {
  const staleBinding = binding(
    'removedTargetField',
    nodeOutput('removedNode', 'removedOutputField'),
  );
  const bindings = [
    binding('subjectName', nodeOutput('downstream', 'nameOutput')),
    binding('subjectName', literal(42)),
    binding('approved', flowInput('removedFlowInput')),
    binding('sourceCheck', nodeOutput('removedNode', 'removedOutputField')),
    staleBinding,
  ];
  const before = JSON.stringify(bindings);
  const issues = validateInputBindings(bindingContext(bindings));

  assert.deepEqual(
    new Set(issues.map((issue) => issue.code)),
    new Set([
      INPUT_BINDING_ISSUE_CODES.missingRequired,
      INPUT_BINDING_ISSUE_CODES.duplicateTarget,
      INPUT_BINDING_ISSUE_CODES.nonUpstream,
      INPUT_BINDING_ISSUE_CODES.typeMismatch,
      INPUT_BINDING_ISSUE_CODES.missingField,
      INPUT_BINDING_ISSUE_CODES.missingSource,
    ]),
  );
  assert.equal(
    issues.some(
      (issue) => issue.code === INPUT_BINDING_ISSUE_CODES.missingSource
        && issue.sourceNodeId === 'removedNode',
    ),
    true,
  );
  assert.equal(JSON.stringify(bindings), before);
  assert.equal(bindings.includes(staleBinding), true);
  assert.deepEqual(staleBinding.source, {
    kind: 'nodeOutput',
    nodeId: 'removedNode',
    fieldId: 'removedOutputField',
  });
});

const evaluationContext = {
  flowInputs: {
    text: 'synthetic-value',
    count: 7,
    enabled: true,
  },
  nodeOutputs: {},
} as const satisfies ConditionEvaluationContext;

const conditionRule = (
  id: string,
  left: DataReference,
  operator: ConditionOperator,
  right?: DataReference,
): ConditionRule => ({
  id,
  kind: 'rule',
  left,
  operator,
  right,
});

test('condition AST evaluates every supported operator and nested AND/OR groups', () => {
  const expressions = [
    conditionRule('equals', flowInput('text'), 'equals', literal('synthetic-value')),
    conditionRule('not-equals', flowInput('text'), 'notEquals', literal('other')),
    conditionRule('contains', flowInput('text'), 'contains', literal('value')),
    conditionRule('starts-with', flowInput('text'), 'startsWith', literal('synthetic')),
    conditionRule('ends-with', flowInput('text'), 'endsWith', literal('value')),
    conditionRule('greater-than', flowInput('count'), 'greaterThan', literal(6)),
    conditionRule('greater-equal', flowInput('count'), 'greaterThanOrEqual', literal(7)),
    conditionRule('less-than', flowInput('count'), 'lessThan', literal(8)),
    conditionRule('less-equal', flowInput('count'), 'lessThanOrEqual', literal(7)),
    conditionRule('exists', flowInput('enabled'), 'exists'),
    conditionRule('not-exists', flowInput('missing'), 'notExists'),
  ] as const satisfies readonly ConditionExpression[];

  assert.equal(expressions.every(
    (expression) => evaluateCondition(expression, evaluationContext),
  ), true);

  const nested: ConditionExpression = {
    id: 'root-and',
    kind: 'group',
    combinator: 'and',
    conditions: [
      conditionRule('enabled', flowInput('enabled'), 'equals', literal(true)),
      {
        id: 'nested-or',
        kind: 'group',
        combinator: 'or',
        conditions: [
          conditionRule('wrong-count', flowInput('count'), 'lessThan', literal(0)),
          conditionRule('right-text', flowInput('text'), 'contains', literal('value')),
        ],
      },
    ],
  };
  assert.equal(evaluateCondition(nested, evaluationContext), true);
});

test('simulator evaluates native AST deterministically and never executes a legacy expression string', () => {
  const marker = '__identraLegacyExpressionWasExecuted';
  const globalRecord = globalThis as typeof globalThis & Record<string, unknown>;
  delete globalRecord[marker];

  const manifest = (
    condition: Extract<
      DynamicFlowManifestV2['nodes'][number],
      { kind: 'condition' }
    >['condition'],
  ): DynamicFlowManifestV2 => ({
    schemaVersion: 2,
    inputSchema: { fields: [field('credential', 'object', true)] },
    nodes: [
      { id: 'start', kind: 'start', position: { x: 0, y: 0 } },
      {
        id: 'condition',
        kind: 'condition',
        position: { x: 100, y: 0 },
        condition,
      },
      {
        id: 'success',
        kind: 'terminal',
        terminalOutcome: 'success',
        position: { x: 200, y: 0 },
      },
      {
        id: 'failure',
        kind: 'terminal',
        terminalOutcome: 'failure',
        position: { x: 200, y: 100 },
      },
    ],
    edges: [
      { id: 'to-condition', source: 'start', target: 'condition', outcome: 'next' },
      { id: 'true-path', source: 'condition', target: 'success', outcome: 'true' },
      { id: 'false-path', source: 'condition', target: 'failure', outcome: 'false' },
    ],
  });

  const nativeResult = simulateDynamicFlowV2(manifest({
    migrationState: 'native',
    root: {
      id: 'native-root',
      kind: 'group',
      combinator: 'and',
      conditions: [
        conditionRule(
          'synthetic-input-present',
          flowInput('credential'),
          'exists',
        ),
      ],
    },
  }), {
    quickOutcomes: { condition: 'false' },
  });
  assert.equal(nativeResult.terminalNodeId, 'success');

  const legacyResult = simulateDynamicFlowV2(manifest({
    migrationState: 'requiresConversion',
    legacyExpression: `globalThis.${marker} = true`,
    root: {
      id: 'legacy-root',
      kind: 'group',
      combinator: 'and',
      conditions: [],
    },
  }), {
    quickOutcomes: { condition: 'false' },
  });
  assert.equal(legacyResult.terminalNodeId, 'failure');
  assert.equal(globalRecord[marker], undefined);
});

test('simulator evaluates an upstream composite module output on a valid multi-branch graph', () => {
  const manifest: DynamicFlowManifestV2 = {
    schemaVersion: 2,
    inputSchema: { fields: [] },
    nodes: [
      { id: 'start', kind: 'start', position: { x: 0, y: 0 } },
      {
        id: 'nfc',
        kind: 'verification',
        position: { x: 100, y: 0 },
        moduleRef: { packageId: 'nfc-scan', version: '1' },
        bindings: [],
        retryPolicy: { maxAttempts: 1 },
        selectedDatabaseSourceIds: [],
      },
      {
        id: 'condition',
        kind: 'condition',
        position: { x: 200, y: 0 },
        condition: {
          migrationState: 'native',
          root: {
            id: 'root',
            kind: 'group',
            combinator: 'and',
            conditions: [{
              id: 'document-present',
              kind: 'rule',
              left: nodeOutput('nfc', 'documentData'),
              operator: 'exists',
            }],
          },
        },
      },
      {
        id: 'success',
        kind: 'terminal',
        terminalOutcome: 'success',
        position: { x: 300, y: 0 },
      },
      {
        id: 'failure',
        kind: 'terminal',
        terminalOutcome: 'failure',
        position: { x: 300, y: 100 },
      },
    ],
    edges: [
      { id: 'start-nfc', source: 'start', target: 'nfc', outcome: 'next' },
      { id: 'nfc-condition', source: 'nfc', target: 'condition', outcome: 'success' },
      { id: 'nfc-failure', source: 'nfc', target: 'failure', outcome: 'failure' },
      { id: 'condition-success', source: 'condition', target: 'success', outcome: 'true' },
      { id: 'condition-failure', source: 'condition', target: 'failure', outcome: 'false' },
    ],
  };

  assert.deepEqual(validateDynamicFlowV2(manifest), []);
  const result = simulateDynamicFlowV2(manifest, {
    quickOutcomes: {
      nfc: 'success',
      condition: 'false',
    },
  });
  assert.equal(result.completed, true);
  assert.equal(result.terminalNodeId, 'success');
  assert.equal(
    result.steps.find((step) => step.nodeId === 'condition')?.outcome,
    'true',
  );
});

test('condition validation fails closed for incompatible operators and empty nested groups', () => {
  const manifest: DynamicFlowManifestV2 = {
    schemaVersion: 2,
    inputSchema: {
      fields: [field('subject', 'string', true)],
    },
    nodes: [
      { id: 'start', kind: 'start', position: { x: 0, y: 0 } },
      {
        id: 'condition',
        kind: 'condition',
        position: { x: 100, y: 0 },
        condition: {
          migrationState: 'native',
          root: {
            id: 'root',
            kind: 'group',
            combinator: 'and',
            conditions: [
              {
                id: 'invalid-comparison',
                kind: 'rule',
                left: flowInput('subject'),
                operator: 'greaterThan',
                right: literal('synthetic-subject'),
              },
              {
                id: 'empty-nested',
                kind: 'group',
                combinator: 'or',
                conditions: [],
              },
            ],
          },
        },
      },
      {
        id: 'success',
        kind: 'terminal',
        terminalOutcome: 'success',
        position: { x: 200, y: 0 },
      },
      {
        id: 'failure',
        kind: 'terminal',
        terminalOutcome: 'failure',
        position: { x: 200, y: 100 },
      },
    ],
    edges: [
      { id: 'start-condition', source: 'start', target: 'condition', outcome: 'next' },
      { id: 'condition-success', source: 'condition', target: 'success', outcome: 'true' },
      { id: 'condition-failure', source: 'condition', target: 'failure', outcome: 'false' },
    ],
  };

  const codes = new Set(
    validateDynamicFlowV2(manifest).map((issue) => issue.code),
  );
  assert.ok(codes.has('conditionOperatorTypeMismatch'));
  assert.ok(codes.has('emptyCondition'));
});

test('custom module definitions remain JSON manifest metadata with structured conditions only', () => {
  const nativeCondition = (
    id: string,
    expected: boolean,
  ): CustomModuleDefinitionMetadata['successCondition'] => ({
    migrationState: 'native',
    root: {
      id: `${id}-root`,
      kind: 'group',
      combinator: 'and',
      conditions: [
        conditionRule(
          `${id}-rule`,
          nodeOutput('synthetic-module', 'verified'),
          'equals',
          literal(expected),
        ),
      ],
    },
  });
  const definition: CustomModuleDefinitionMetadata = {
    description: 'Synthetic signed credential verification',
    credentialType: 'SyntheticCredential',
    didResolverUrl: 'https://resolver.example.test/did',
    verificationMethod: 'assertionMethod',
    issuerPolicy: {
      mode: 'exactDid',
      issuerDid: 'did:web:issuer.example.test',
    },
    successCondition: nativeCondition('success', true),
    failureCondition: nativeCondition('failure', false),
    defaultUi: {
      title: 'Synthetic verification',
      description: 'Use a generated test credential.',
      actionLabel: 'Continue',
    },
  };
  const modulePackage: ModulePackage = {
    id: 'synthetic-module',
    name: 'Synthetic module',
    origin: 'custom',
    activeVersion: '1.0.0',
    versions: [{
      version: '1.0.0',
      status: 'active',
      contract: {
        ref: { packageId: 'synthetic-module', version: '1.0.0' },
        origin: 'custom',
        category: 'custom',
        inputFields: [field('credential', 'object', true)],
        outputFields: [field('verified', 'boolean', true)],
        outcomes: [
          { id: 'success', terminal: false },
          { id: 'failure', terminal: false },
        ],
        uiCapabilities: {
          supportedStates: ['intro', 'input', 'processing', 'success', 'error'],
          supportsConsent: false,
          supportsCredentialRequest: true,
          supportsFieldSummary: true,
          supportsDevicePermission: false,
          supportsCapture: false,
        },
        evidenceGroup: 'credential',
        estimatedDurationMs: 1_000,
      },
      createdAt: '2026-03-01T00:00:00.000Z',
      definition,
    }],
  };

  const serialized = JSON.stringify(modulePackage);
  const restored = JSON.parse(serialized) as ModulePackage;
  assert.deepEqual(restored, modulePackage);
  assert.equal(serialized.includes('successExpression'), false);
  assert.equal(serialized.includes('failureExpression'), false);
  assert.equal(serialized.includes('secret'), false);
  assert.equal(restored.versions[0]?.definition?.successCondition.root.kind, 'group');
  assert.equal(
    restored.versions[0]?.definition?.successCondition.migrationState,
    'native',
  );
});

test('database source registry keeps domestic and international source contracts distinct', () => {
  assert.deepEqual(
    DATABASE_SOURCES.map((source) => source.id),
    DATABASE_SOURCE_IDS,
  );
  const domestic = DATABASE_SOURCES.filter((source) => source.scope === 'domestic');
  const international = DATABASE_SOURCES.filter(
    (source) => source.scope === 'international',
  );

  assert.deepEqual(
    domestic.map((source) => source.id),
    ['domestic-blacklist', 'domestic-wanted-list', 'domestic-bad-debt'],
  );
  assert.deepEqual(
    international.map((source) => source.id),
    ['international-blacklist', 'international-enforcement'],
  );
  assert.equal(domestic.every((source) => source.jurisdiction === 'VN'), true);
  assert.equal(
    international.every((source) => source.jurisdiction === 'GLOBAL'),
    true,
  );
  assert.equal(
    DATABASE_SOURCES.every(
      (source) =>
        source.supportedFields.length > 0
        && source.providerKey.length > 0
        && source.estimatedDurationMs > 0,
    ),
    true,
  );
  assert.deepEqual(
    new Set(DATABASE_SOURCES.map((source) => source.category)),
    new Set(['blacklist', 'wanted', 'badDebt', 'enforcement']),
  );
});
