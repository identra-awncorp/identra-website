/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import { analyzeFlowProject } from '../src/components/dashboard/flowAnalysisEngine.ts';
import { simulateDynamicFlowV2 } from '../src/components/dashboard/flowSimulationEngine.ts';
import {
  addImmutableModuleVersion,
  canDeleteModuleVersion,
  deleteModuleVersion,
  deprecateModuleVersion,
  diffModuleCompatibility,
  findModuleUsages,
} from '../src/components/dashboard/moduleLifecycleEngine.ts';
import {
  appendBoundedDraftRevision,
  createDraftRevisionSnapshot,
  createImmutableRelease,
  promoteRelease,
  rollbackProjectToRevision,
  validateDashboardEnvironment,
  validateIntegrationSettings,
  validateReleaseDependencies,
} from '../src/components/dashboard/releaseEngine.ts';
import {
  extractSubflowPackage,
  validateSubflowDependencies,
  validateSubflowSelection,
  validateSubflowVersionDependencies,
} from '../src/components/dashboard/subflowEngine.ts';
import {
  createDefaultInterfaceV2,
  createFlowProjectV2,
} from '../src/components/dashboard/dashboardV2Model.ts';
import {
  DEFAULT_ANALYSIS_THRESHOLDS,
  DEFAULT_DATABASE_STRATEGY,
  DEFAULT_INTEGRATION_SETTINGS,
  DYNAMIC_FLOW_SCHEMA_VERSION,
  type DashboardEnvironment,
  type DraftRevision,
  type DynamicFlowManifestV2,
  type FlowField,
  type FlowProjectV2,
  type FlowRelease,
  type ModuleContract,
  type ModulePackage,
  type ModuleVersion,
  type SubflowPackage,
  type SubflowVersion,
} from '../src/components/dashboard/dashboardV2Types.ts';

const NOW = '2026-07-29T00:00:00.000Z';
const LATER = '2026-07-30T00:00:00.000Z';

const field = (
  id: string,
  required = false,
  type: FlowField['type'] = 'string',
): FlowField => ({
  id,
  key: id,
  type,
  format: 'none',
  required,
  classification: 'internalMetadata',
  safeForResult: true,
});

const contract = (
  packageId: string,
  version: string,
  overrides: Partial<ModuleContract> = {},
): ModuleContract => ({
  ref: { packageId, version },
  origin: 'custom',
  category: 'custom',
  inputFields: [field('subject', true)],
  outputFields: [field('decision', true)],
  outcomes: [
    { id: 'success', terminal: false },
    { id: 'failure', terminal: false },
  ],
  uiCapabilities: {
    supportedStates: ['intro', 'processing', 'success', 'error'],
    supportsConsent: false,
    supportsCredentialRequest: false,
    supportsFieldSummary: true,
    supportsDevicePermission: false,
    supportsCapture: false,
  },
  evidenceGroup: 'other',
  estimatedDurationMs: 2_000,
  ...overrides,
});

const moduleVersion = (
  packageId: string,
  version: string,
  status: ModuleVersion['status'] = 'active',
  overrides: Partial<ModuleContract> = {},
): ModuleVersion => ({
  version,
  status,
  contract: contract(packageId, version, overrides),
  createdAt: NOW,
});

const modulePackage = (): ModulePackage => ({
  id: 'custom-screening',
  name: 'Custom screening',
  origin: 'custom',
  activeVersion: '1',
  versions: [moduleVersion('custom-screening', '1')],
});

const projectWithModule = (
  version = '1',
): FlowProjectV2 => {
  const base = createFlowProjectV2('Synthetic project', '', 'en', new Date(NOW));
  return {
    ...base,
    id: 'project',
    flow: {
      ...base.flow,
      nodes: [
        ...base.flow.nodes,
        {
          id: 'custom-node',
          kind: 'verification',
          position: { x: 200, y: 200 },
          moduleRef: { packageId: 'custom-screening', version },
          bindings: [],
          retryPolicy: { maxAttempts: 1 },
          selectedDatabaseSourceIds: [],
        },
      ],
    },
  };
};

test('module versions are immutable and compatibility uses stable field ids', () => {
  const original = modulePackage();
  const versionTwo = moduleVersion('custom-screening', '2', 'active', {
    inputFields: [
      { ...field('subject', true), key: 'renamedSubject' },
      field('optionalContext'),
    ],
    outputFields: [field('decision', true), field('explanation')],
  });
  const added = addImmutableModuleVersion(original, versionTwo);

  assert.equal(added.ok, true);
  if (!added.ok) return;
  assert.equal(original.versions.length, 1);
  assert.equal(added.value.activeVersion, '2');
  assert.equal(added.value.versions.length, 2);

  const compatible = diffModuleCompatibility(
    original.versions[0]!.contract,
    versionTwo.contract,
  );
  assert.equal(compatible.compatible, true);
  assert.deepEqual(
    compatible.changes.map((change) => change.kind),
    ['inputAddedOptional', 'outputAdded'],
  );

  const breaking = diffModuleCompatibility(versionTwo.contract, contract(
    'custom-screening',
    '3',
    {
      inputFields: [field('newRequired', true)],
      outputFields: [],
      outcomes: [{ id: 'success', terminal: false }],
      uiCapabilities: {
        ...versionTwo.contract.uiCapabilities,
        supportedStates: ['intro'],
      },
    },
  ));
  assert.equal(breaking.compatible, false);
  assert.ok(breaking.breakingChanges.some(
    (change) => change.kind === 'inputRemoved',
  ));
  assert.ok(breaking.breakingChanges.some(
    (change) => change.kind === 'inputAddedRequired',
  ));
  assert.ok(breaking.breakingChanges.some(
    (change) => change.kind === 'outcomeRemoved',
  ));
});

test('module lifecycle guards usage, active versions, and deprecation', () => {
  const original = modulePackage();
  const withSecond = addImmutableModuleVersion(
    original,
    moduleVersion('custom-screening', '2'),
  );
  assert.equal(withSecond.ok, true);
  if (!withSecond.ok) return;

  const deprecated = deprecateModuleVersion(withSecond.value, '1');
  assert.equal(deprecated.ok, true);
  if (!deprecated.ok) return;
  const project = projectWithModule('1');
  const usages = findModuleUsages(
    { packageId: 'custom-screening', version: '1' },
    { projects: [project] },
  );
  assert.deepEqual(
    usages.map((usage) => [usage.kind, usage.ownerId, usage.nodeId]),
    [['project', 'project', 'custom-node']],
  );

  const blocked = canDeleteModuleVersion(
    deprecated.value,
    '1',
    { projects: [project] },
  );
  assert.equal(blocked.ok, false);
  if (!blocked.ok) assert.equal(blocked.reason, 'inUse');

  const deleted = deleteModuleVersion(deprecated.value, '1', {});
  assert.equal(deleted.ok, true);
  if (deleted.ok) {
    assert.deepEqual(
      deleted.value.versions.map((version) => version.version),
      ['2'],
    );
  }

  const onlyActive = deprecateModuleVersion(original, '1');
  assert.deepEqual(onlyActive, { ok: false, reason: 'lastActiveVersion' });
});

test('module usage lookup covers draft projects, immutable releases, and subflows', () => {
  const project = projectWithModule();
  const createdRelease = createImmutableRelease(project, [], {
    id: 'usage-release',
    version: '1',
    createdAt: NOW,
  });
  assert.equal(createdRelease.ok, true);
  if (!createdRelease.ok) return;
  const subflow: SubflowPackage = {
    id: 'usage-subflow',
    name: 'Usage subflow',
    activeVersion: '1',
    versions: [{
      ...emptySubflowVersion('1'),
      flow: project.flow,
    }],
  };
  const usages = findModuleUsages(
    { packageId: 'custom-screening', version: '1' },
    {
      projects: [project],
      releases: [createdRelease.release],
      subflows: [subflow],
    },
  );
  assert.deepEqual(
    usages.map((usage) => usage.kind),
    ['project', 'release', 'subflow'],
  );
});

const subflowSource: DynamicFlowManifestV2 = {
  schemaVersion: DYNAMIC_FLOW_SCHEMA_VERSION,
  inputSchema: { fields: [] },
  nodes: [
    { id: 'entry', kind: 'start', position: { x: 0, y: 0 } },
    {
      id: 'decision',
      kind: 'condition',
      position: { x: 100, y: 0 },
      condition: {
        migrationState: 'native',
        root: {
          id: 'root',
          kind: 'group',
          combinator: 'and',
          conditions: [],
        },
      },
    },
    {
      id: 'success',
      kind: 'terminal',
      terminalOutcome: 'success',
      position: { x: 200, y: -50 },
    },
    {
      id: 'failure',
      kind: 'terminal',
      terminalOutcome: 'failure',
      position: { x: 200, y: 50 },
    },
  ],
  edges: [
    { id: 'entry-decision', source: 'entry', target: 'decision', outcome: 'next' },
    { id: 'decision-success', source: 'decision', target: 'success', outcome: 'true' },
    { id: 'decision-failure', source: 'decision', target: 'failure', outcome: 'false' },
  ],
};

const extractionInput = {
  packageId: 'subflow-screening',
  name: 'Screening',
  version: '1',
  source: subflowSource,
  selectedNodeIds: ['entry', 'decision', 'success', 'failure'],
  entryNodeId: 'entry',
  successExitNodeId: 'success',
  failureExitNodeId: 'failure',
  inputFields: [field('subject', true)],
  outputFields: [field('decision')],
  createdAt: NOW,
} as const;

test('extracts only a connected DAG with one entry and assigned exits', () => {
  assert.deepEqual(validateSubflowSelection(extractionInput), []);
  const result = extractSubflowPackage(extractionInput);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.value.activeVersion, '1');
  assert.deepEqual(
    result.value.versions[0]!.flow.nodes.map((node) => node.id),
    ['entry', 'decision', 'success', 'failure'],
  );
  assert.equal(
    result.value.versions[0]!.contract.failureExitNodeId,
    'failure',
  );

  const invalid = validateSubflowSelection({
    ...extractionInput,
    selectedNodeIds: ['entry', 'success', 'failure'],
  });
  const codes = new Set(invalid.map((issue) => issue.code));
  assert.ok(codes.has('disconnectedSelection'));
  assert.ok(codes.has('multipleEntries'));

  const leakingSelection = validateSubflowSelection({
    ...extractionInput,
    source: {
      ...subflowSource,
      nodes: [
        ...subflowSource.nodes,
        {
          id: 'outside',
          kind: 'terminal',
          terminalOutcome: 'failure',
          position: { x: 300, y: 100 },
        },
      ],
      edges: [
        ...subflowSource.edges,
        {
          id: 'decision-outside',
          source: 'decision',
          target: 'outside',
          outcome: 'false',
        },
      ],
    },
  });
  assert.ok(leakingSelection.some(
    (issue) => issue.code === 'exitMismatch'
      && issue.nodeIds.includes('decision'),
  ));
});

const emptySubflowVersion = (
  version: string,
  dependency?: { readonly packageId: string; readonly version: string },
): SubflowVersion => ({
  version,
  status: 'active',
  contract: {
    inputFields: [],
    outputFields: [],
    successExitNodeId: 'success',
    failureExitNodeId: 'failure',
  },
  flow: {
    schemaVersion: DYNAMIC_FLOW_SCHEMA_VERSION,
    inputSchema: { fields: [] },
    nodes: dependency
      ? [{
          id: `nested-${dependency.packageId}`,
          kind: 'subflow',
          position: { x: 0, y: 0 },
          subflowRef: dependency,
          bindings: [],
        }]
      : [],
    edges: [],
  },
  createdAt: NOW,
});

const dependencyPackage = (
  id: string,
  dependency?: { readonly packageId: string; readonly version: string },
): SubflowPackage => ({
  id,
  name: id,
  activeVersion: '1',
  versions: [emptySubflowVersion('1', dependency)],
});

test('detects subflow dependency cycles and enforces depth ten', () => {
  const cycleCatalog = [
    dependencyPackage('a', { packageId: 'b', version: '1' }),
    dependencyPackage('b', { packageId: 'a', version: '1' }),
  ];
  const cycle = validateSubflowDependencies(
    { packageId: 'a', version: '1' },
    cycleCatalog,
  );
  assert.equal(cycle.valid, false);
  assert.ok(cycle.issues.some((issue) => issue.code === 'dependencyCycle'));

  const deepCatalog = Array.from({ length: 11 }, (_, index) =>
    dependencyPackage(
      `level-${index + 1}`,
      index < 10
        ? { packageId: `level-${index + 2}`, version: '1' }
        : undefined,
    ));
  const deep = validateSubflowDependencies(
    { packageId: 'level-1', version: '1' },
    deepCatalog,
  );
  assert.equal(deep.maximumDepth, 11);
  assert.ok(deep.issues.some((issue) => issue.code === 'depthExceeded'));

  const candidate = emptySubflowVersion(
    '1',
    { packageId: 'candidate', version: '1' },
  );
  const candidateReport = validateSubflowVersionDependencies(
    'candidate',
    candidate,
    [],
  );
  assert.ok(candidateReport.issues.some(
    (issue) => issue.code === 'dependencyCycle',
  ));
});

const executableSubflowVersion = (
  version: string,
  dependency?: { readonly packageId: string; readonly version: string },
): SubflowVersion => ({
  ...emptySubflowVersion(version),
  flow: {
    schemaVersion: DYNAMIC_FLOW_SCHEMA_VERSION,
    inputSchema: { fields: [] },
    nodes: [
      { id: 'start', kind: 'start', position: { x: 0, y: 0 } },
      ...(dependency
        ? [{
            id: 'nested',
            kind: 'subflow' as const,
            position: { x: 100, y: 0 },
            subflowRef: dependency,
            bindings: [],
          }]
        : []),
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
    edges: dependency
      ? [
          { id: 'start-nested', source: 'start', target: 'nested', outcome: 'next' },
          { id: 'nested-success', source: 'nested', target: 'success', outcome: 'success' },
          { id: 'nested-failure', source: 'nested', target: 'failure', outcome: 'failure' },
        ]
      : [
          { id: 'start-success', source: 'start', target: 'success', outcome: 'next' },
        ],
  },
});

const executableSubflowPackage = (
  id: string,
  dependency?: { readonly packageId: string; readonly version: string },
): SubflowPackage => ({
  id,
  name: id,
  activeVersion: '1',
  versions: [executableSubflowVersion('1', dependency)],
});

const rootSubflowManifest = (
  packageId: string,
): DynamicFlowManifestV2 => ({
  schemaVersion: DYNAMIC_FLOW_SCHEMA_VERSION,
  inputSchema: { fields: [] },
  nodes: [
    { id: 'start', kind: 'start', position: { x: 0, y: 0 } },
    {
      id: 'root-subflow',
      kind: 'subflow',
      position: { x: 100, y: 0 },
      subflowRef: { packageId, version: '1' },
      bindings: [],
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
    { id: 'start-subflow', source: 'start', target: 'root-subflow', outcome: 'next' },
    { id: 'subflow-success', source: 'root-subflow', target: 'success', outcome: 'success' },
    { id: 'subflow-failure', source: 'root-subflow', target: 'failure', outcome: 'failure' },
  ],
});

test('simulator executes pinned subflows and fails closed on recursion or depth eleven', () => {
  const valid = simulateDynamicFlowV2(rootSubflowManifest('leaf'), {
    subflowCatalog: [executableSubflowPackage('leaf')],
  });
  assert.equal(valid.completed, true);
  assert.equal(valid.terminalOutcome, 'success');
  assert.equal(
    valid.steps.find((step) => step.nodeId === 'root-subflow')
      ?.metadata?.subflowStatus,
    'completed',
  );

  const recursiveCatalog = [
    executableSubflowPackage('recursive-a', {
      packageId: 'recursive-b',
      version: '1',
    }),
    executableSubflowPackage('recursive-b', {
      packageId: 'recursive-a',
      version: '1',
    }),
  ];
  const recursive = simulateDynamicFlowV2(
    rootSubflowManifest('recursive-a'),
    { subflowCatalog: recursiveCatalog },
  );
  assert.equal(recursive.completed, false);

  const deepCatalog = Array.from({ length: 11 }, (_, index) =>
    executableSubflowPackage(
      `depth-${index + 1}`,
      index < 10
        ? { packageId: `depth-${index + 2}`, version: '1' }
        : undefined,
    ));
  const tooDeep = simulateDynamicFlowV2(rootSubflowManifest('depth-1'), {
    subflowCatalog: deepCatalog,
  });
  assert.equal(tooDeep.completed, false);
});

test('draft history stays bounded and rollback appends a new immutable revision', () => {
  let revisions: readonly DraftRevision[] = [];
  const base = {
    ...createFlowProjectV2('Revision zero', '', 'en', new Date(NOW)),
    id: 'revision-project',
  };
  for (let index = 1; index <= 21; index += 1) {
    const project = { ...base, name: `Revision ${index}` };
    const revision = createDraftRevisionSnapshot(project, revisions, {
      id: `revision-${index}`,
      createdAt: NOW,
      reason: 'manual',
    });
    revisions = appendBoundedDraftRevision(revisions, revision);
  }
  assert.equal(revisions.length, 20);
  assert.equal(revisions[0]!.id, 'revision-2');
  assert.equal(revisions[19]!.id, 'revision-21');

  const current = { ...base, name: 'Current draft' };
  const rollback = rollbackProjectToRevision(
    current,
    'revision-2',
    revisions,
    { id: 'revision-rollback', createdAt: LATER },
  );
  assert.equal(rollback.ok, true);
  if (!rollback.ok) return;
  assert.equal(rollback.project.name, 'Revision 2');
  assert.equal(rollback.project.updatedAt, LATER);
  assert.equal(rollback.revision.reason, 'rollback');
  assert.equal(rollback.revisions.length, 20);
  assert.equal(current.name, 'Current draft');
});

const environment = (
  stage: DashboardEnvironment['stage'],
): DashboardEnvironment => ({
  id: `environment-${stage}`,
  stage,
  publicConfig: {},
  secretReferenceNames: [],
});

test('release promotion is ordered and guarded by validation, scenarios, and dependencies', () => {
  const project = projectWithModule();
  const created = createImmutableRelease(project, [], {
    id: 'release-1',
    version: '1.0.0',
    createdAt: NOW,
  });
  assert.equal(created.ok, true);
  if (!created.ok) return;
  assert.equal(created.release.promotions.length, 0);

  const premature = promoteRelease(
    created.release,
    'staging',
    environment('staging'),
    {
      validationErrorCount: 0,
      scenarioRuns: [],
      dependenciesValid: true,
    },
    LATER,
  );
  assert.deepEqual(premature, { ok: false, reason: 'previousStageRequired' });

  const blockedTest = promoteRelease(
    created.release,
    'test',
    environment('test'),
    {
      validationErrorCount: 1,
      dependenciesValid: true,
    },
    LATER,
  );
  assert.deepEqual(blockedTest, { ok: false, reason: 'flowValidationFailed' });

  const testPromotion = promoteRelease(
    created.release,
    'test',
    environment('test'),
    {
      validationErrorCount: 0,
      dependenciesValid: true,
    },
    LATER,
  );
  assert.equal(testPromotion.ok, true);
  if (!testPromotion.ok) return;

  const failedStaging = promoteRelease(
    testPromotion.release,
    'staging',
    environment('staging'),
    {
      validationErrorCount: 0,
      scenarioRuns: [{ status: 'failed' }],
      dependenciesValid: true,
    },
    LATER,
  );
  assert.deepEqual(failedStaging, { ok: false, reason: 'enabledScenarioFailed' });

  const staging = promoteRelease(
    testPromotion.release,
    'staging',
    environment('staging'),
    {
      validationErrorCount: 0,
      scenarioRuns: [{ status: 'passed' }, { status: 'skipped' }],
      dependenciesValid: true,
    },
    LATER,
  );
  assert.equal(staging.ok, true);
  if (!staging.ok) return;

  const blockedProduction = promoteRelease(
    staging.release,
    'production',
    environment('production'),
    {
      validationErrorCount: 0,
      scenarioRuns: [],
      dependenciesValid: false,
    },
    LATER,
  );
  assert.deepEqual(blockedProduction, {
    ok: false,
    reason: 'dependenciesInvalid',
  });
  assert.equal(created.release.promotions.length, 0);
});

test('release dependency, environment, and integration validation fail closed', () => {
  const project = projectWithModule();
  const created = createImmutableRelease(project, [], {
    id: 'release',
    version: '1',
    createdAt: NOW,
  });
  assert.equal(created.ok, true);
  if (!created.ok) return;
  assert.deepEqual(
    validateReleaseDependencies(created.release, [], []),
    [{
      kind: 'module',
      packageId: 'custom-screening',
      version: '1',
    }],
  );
  assert.deepEqual(
    validateReleaseDependencies(created.release, [modulePackage()], []),
    [],
  );

  const environmentIssues = validateDashboardEnvironment({
    id: '',
    stage: 'test',
    publicConfig: {
      resolverUrl: 'https://resolver.example.test',
      apiKey: 'not-stored-here',
    },
    secretReferenceNames: ['RISK_API_KEY', 'bad-reference', 'RISK_API_KEY'],
  });
  assert.deepEqual(
    environmentIssues.map((issue) => issue.code),
    [
      'missingId',
      'sensitivePublicConfigKey',
      'invalidSecretReference',
      'duplicateSecretReference',
    ],
  );

  const integrationIssues = validateIntegrationSettings(
    {
      ...DEFAULT_INTEGRATION_SETTINGS,
      mode: 'redirect',
      allowedOrigins: ['*', 'http://example.test'],
      redirectUrls: [],
      sessionTimeoutMinutes: 0,
      resultFieldIds: ['safe-field', 'unsafe-field', 'safe-field'],
    },
    new Set(['safe-field']),
  );
  assert.deepEqual(
    integrationIssues.map((issue) => issue.code),
    [
      'invalidOrigin',
      'invalidOrigin',
      'redirectUrlRequired',
      'invalidSessionTimeout',
      'unsafeResultField',
      'duplicateResultField',
    ],
  );
});

test('release locks are isolated from draft mutation and cannot omit a direct dependency', () => {
  const project = projectWithModule();
  const created = createImmutableRelease(project, [], {
    id: 'immutable-release',
    version: ' 1.0.0 ',
    createdAt: NOW,
  });
  assert.equal(created.ok, true);
  if (!created.ok) return;
  assert.equal(created.release.version, '1.0.0');
  assert.deepEqual(created.release.dependencyLock.modules, [{
    packageId: 'custom-screening',
    version: '1',
  }]);

  const mutableNode = project.flow.nodes.find(
    (node) => node.kind === 'verification',
  ) as {
    moduleRef: {
      packageId: string;
      version: string;
    };
  };
  mutableNode.moduleRef.version = 'mutated-draft-version';
  assert.deepEqual(created.release.dependencyLock.modules, [{
    packageId: 'custom-screening',
    version: '1',
  }]);
  assert.equal(
    created.release.snapshot.content.flow.nodes
      .find((node) => node.kind === 'verification')
      ?.moduleRef.version,
    '1',
  );

  const missingLock: FlowRelease = {
    ...created.release,
    dependencyLock: { modules: [], subflows: [] },
  };
  assert.deepEqual(
    validateReleaseDependencies(missingLock, [modulePackage()], []),
    [{
      kind: 'module',
      packageId: 'custom-screening',
      version: '1',
    }],
  );
});

test('release dependency validation follows pinned subflows transitively', () => {
  const base = createFlowProjectV2('Subflow release', '', 'en', new Date(NOW));
  const project: FlowProjectV2 = {
    ...base,
    id: 'subflow-release-project',
    flow: {
      ...base.flow,
      nodes: [
        ...base.flow.nodes,
        {
          id: 'subflow-node',
          kind: 'subflow',
          position: { x: 200, y: 0 },
          subflowRef: {
            packageId: 'nested-module-subflow',
            version: '1',
          },
          bindings: [],
        },
      ],
    },
  };
  const nestedSubflow: SubflowPackage = {
    id: 'nested-module-subflow',
    name: 'Nested module subflow',
    activeVersion: '1',
    versions: [{
      ...emptySubflowVersion('1'),
      flow: projectWithModule().flow,
    }],
  };
  const created = createImmutableRelease(project, [], {
    id: 'subflow-release',
    version: '1',
    createdAt: NOW,
  });
  assert.equal(created.ok, true);
  if (!created.ok) return;

  assert.deepEqual(
    validateReleaseDependencies(created.release, [], [nestedSubflow]),
    [{
      kind: 'module',
      packageId: 'custom-screening',
      version: '1',
    }],
  );
  assert.deepEqual(
    validateReleaseDependencies(
      created.release,
      [modulePackage()],
      [nestedSubflow],
    ),
    [],
  );
});

test('integration validation detects normalized URL duplicates', () => {
  const issues = validateIntegrationSettings(
    {
      ...DEFAULT_INTEGRATION_SETTINGS,
      allowedOrigins: [
        'https://app.example.test',
        'https://app.example.test/',
      ],
      redirectUrls: [
        'https://app.example.test/callback',
        'https://app.example.test:443/callback',
      ],
    },
    new Set(),
  );

  assert.deepEqual(
    issues.map((issue) => issue.code),
    ['duplicateOrigin', 'duplicateRedirectUrl'],
  );
});

const analysisProject = (): FlowProjectV2 => {
  const base = createFlowProjectV2('Analysis', '', 'en', new Date(NOW));
  return {
    ...base,
    id: 'analysis-project',
    flow: {
      schemaVersion: DYNAMIC_FLOW_SCHEMA_VERSION,
      inputSchema: { fields: [] },
      nodes: [
        { id: 'start', kind: 'start', position: { x: 0, y: 0 } },
        {
          id: 'database-a',
          kind: 'verification',
          position: { x: 100, y: 0 },
          moduleRef: { packageId: 'database-cross-check', version: '1' },
          bindings: [],
          retryPolicy: { maxAttempts: 1 },
          selectedDatabaseSourceIds: ['domestic-blacklist'],
          databaseStrategy: DEFAULT_DATABASE_STRATEGY,
        },
        {
          id: 'phone',
          kind: 'verification',
          position: { x: 200, y: 0 },
          moduleRef: { packageId: 'phone-verification', version: '1' },
          bindings: [{
            id: 'binding-database-count',
            targetFieldId: 'phoneNumber',
            source: {
              kind: 'nodeOutput',
              nodeId: 'database-a',
              fieldId: 'checkedSourceCount',
            },
          }],
          retryPolicy: { maxAttempts: 1 },
          selectedDatabaseSourceIds: [],
        },
        {
          id: 'database-b',
          kind: 'verification',
          position: { x: 300, y: 0 },
          moduleRef: { packageId: 'database-cross-check', version: '1' },
          bindings: [],
          retryPolicy: { maxAttempts: 1 },
          selectedDatabaseSourceIds: ['domestic-blacklist'],
          databaseStrategy: DEFAULT_DATABASE_STRATEGY,
        },
        {
          id: 'success',
          kind: 'terminal',
          terminalOutcome: 'success',
          position: { x: 400, y: 0 },
        },
      ],
      edges: [
        { id: 'edge-start', source: 'start', target: 'database-a', outcome: 'next' },
        { id: 'edge-first', source: 'database-a', target: 'phone', outcome: 'notMatched' },
        { id: 'edge-phone', source: 'phone', target: 'database-b', outcome: 'success' },
        { id: 'edge-finish', source: 'database-b', target: 'success', outcome: 'notMatched' },
      ],
    },
    interface: createDefaultInterfaceV2('en'),
    integration: DEFAULT_INTEGRATION_SETTINGS,
  };
};

test('flow analysis is deterministic and reports coverage, waste, duplicate sources, and estimates', () => {
  const input = {
    project: analysisProject(),
    moduleCatalog: [],
    subflowCatalog: [],
    scenarioCoverage: {
      coveredEdgeIds: ['edge-start', 'edge-first', 'edge-phone'],
      uncoveredEdgeIds: ['edge-finish'],
      coverage: 0.75,
    },
    generatedAt: NOW,
    thresholds: {
      bottleneckCriticalPathRatio: 0.4,
      bottleneckDurationMs: 10_000,
      excessiveInteractionSteps: 2,
      excessiveEvidenceGroups: 1,
      excessiveDurationMs: 120_000,
    },
  } as const;
  const first = analyzeFlowProject(input);
  const second = analyzeFlowProject(input);

  assert.deepEqual(first, second);
  assert.equal(first.estimatedCriticalPathDurationMs, 24_000);
  assert.equal(first.estimatedInteractionSteps, 3);
  assert.equal(first.estimatedEvidenceGroups, 2);
  assert.deepEqual(first.edgeCoverage, {
    'edge-start': true,
    'edge-first': true,
    'edge-phone': true,
    'edge-finish': false,
  });
  const issueIds = new Set(first.issues.map((issue) => issue.id));
  assert.ok(issueIds.has('untestedBranch:edge-finish'));
  assert.ok(issueIds.has(
    'duplicateDatabaseSource:domestic-blacklist:database-a:database-b',
  ));
  assert.ok(issueIds.has('bottleneck:phone'));
  assert.ok(issueIds.has('excessiveEvidence:analysis-project'));
  assert.ok(issueIds.has('unusedOutput:database-a:outcome'));
  assert.equal(issueIds.has('unusedOutput:database-a:checkedSourceCount'), false);
  assert.ok(first.issues
    .filter((issue) =>
      issue.code === 'bottleneck' || issue.code === 'excessiveEvidence')
    .every((issue) => issue.estimated));

  const defaults = analyzeFlowProject({
    project: input.project,
    moduleCatalog: [],
    subflowCatalog: [],
    scenarioCoverage: input.scenarioCoverage,
    generatedAt: NOW,
  });
  assert.deepEqual(defaults.thresholds, DEFAULT_ANALYSIS_THRESHOLDS);
});

test('flow analysis honors the pinned built-in module version', () => {
  const project = analysisProject();
  const wrongPin: FlowProjectV2 = {
    ...project,
    flow: {
      ...project.flow,
      nodes: project.flow.nodes.map((node) =>
        node.kind === 'verification' && node.id === 'phone'
          ? {
              ...node,
              moduleRef: {
                ...node.moduleRef,
                version: 'unsupported-version',
              },
            }
          : node),
    },
  };
  const report = analyzeFlowProject({
    project: wrongPin,
    moduleCatalog: [],
    subflowCatalog: [],
    scenarioCoverage: {
      coveredEdgeIds: [],
      uncoveredEdgeIds: wrongPin.flow.edges.map((edge) => edge.id),
      coverage: 0,
    },
    generatedAt: NOW,
  });

  assert.equal(report.estimatedCriticalPathDurationMs, 6_000);
  assert.ok(report.issues.every(
    (issue) => issue.id !== 'unusedOutput:phone:verified',
  ));
});

test('flow analysis counts interactive steps inside a pinned subflow critical path', () => {
  const base = createFlowProjectV2('Nested analysis', '', 'en', new Date(NOW));
  const project: FlowProjectV2 = {
    ...base,
    id: 'nested-analysis-project',
    flow: rootSubflowManifest('analysis-subflow'),
  };
  const analysisSubflow: SubflowPackage = {
    id: 'analysis-subflow',
    name: 'Analysis subflow',
    activeVersion: '1',
    versions: [{
      ...emptySubflowVersion('1'),
      flow: {
        schemaVersion: DYNAMIC_FLOW_SCHEMA_VERSION,
        inputSchema: { fields: [] },
        nodes: [
          { id: 'start', kind: 'start', position: { x: 0, y: 0 } },
          {
            id: 'phone',
            kind: 'verification',
            position: { x: 100, y: 0 },
            moduleRef: { packageId: 'phone-verification', version: '1' },
            bindings: [],
            retryPolicy: { maxAttempts: 1 },
            selectedDatabaseSourceIds: [],
          },
          {
            id: 'nfc',
            kind: 'verification',
            position: { x: 200, y: 0 },
            moduleRef: { packageId: 'nfc-scan', version: '1' },
            bindings: [],
            retryPolicy: { maxAttempts: 1 },
            selectedDatabaseSourceIds: [],
          },
          {
            id: 'success',
            kind: 'terminal',
            terminalOutcome: 'success',
            position: { x: 300, y: 0 },
          },
        ],
        edges: [
          { id: 'start-phone', source: 'start', target: 'phone', outcome: 'next' },
          { id: 'phone-nfc', source: 'phone', target: 'nfc', outcome: 'success' },
          { id: 'nfc-success', source: 'nfc', target: 'success', outcome: 'success' },
        ],
      },
    }],
  };
  const report = analyzeFlowProject({
    project,
    moduleCatalog: [],
    subflowCatalog: [analysisSubflow],
    scenarioCoverage: {
      coveredEdgeIds: [],
      uncoveredEdgeIds: project.flow.edges.map((edge) => edge.id),
      coverage: 0,
    },
    generatedAt: NOW,
    thresholds: {
      ...DEFAULT_ANALYSIS_THRESHOLDS,
      excessiveInteractionSteps: 1,
    },
  });

  assert.equal(report.estimatedInteractionSteps, 2);
  assert.equal(report.estimatedEvidenceGroups, 2);
  assert.equal(report.estimatedCriticalPathDurationMs, 38_000);
  assert.ok(report.issues.some(
    (issue) => issue.code === 'excessiveEvidence',
  ));
});

test('release dependency lock includes and validates pinned built-in modules', () => {
  const project = analysisProject();
  const created = createImmutableRelease(project, [], {
    id: 'built-in-lock-release',
    version: '1',
    createdAt: NOW,
  });
  assert.equal(created.ok, true);
  if (!created.ok) return;
  assert.deepEqual(created.release.dependencyLock.modules, [
    { packageId: 'database-cross-check', version: '1' },
    { packageId: 'phone-verification', version: '1' },
  ]);
  assert.deepEqual(
    validateReleaseDependencies(created.release, [], []),
    [],
  );
});

test('release creation rejects duplicate versions without mutating existing releases', () => {
  const project = analysisProject();
  const existing: FlowRelease = {
    id: 'existing',
    projectId: project.id,
    version: '1.0.0',
    createdAt: NOW,
    snapshot: {
      projectId: project.id,
      name: project.name,
      description: project.description,
      content: {
        flow: project.flow,
        interface: project.interface,
        scenarios: project.scenarios,
        integration: project.integration,
      },
    },
    dependencyLock: { modules: [], subflows: [] },
    promotions: [],
  };
  const result = createImmutableRelease(project, [existing], {
    id: 'duplicate',
    version: ' 1.0.0 ',
    createdAt: LATER,
  });
  assert.deepEqual(result, { ok: false, reason: 'duplicateVersion' });
  assert.equal(existing.promotions.length, 0);
});
