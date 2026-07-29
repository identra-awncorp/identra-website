/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  createDraftRevision,
  createEmptyWorkspaceV2,
  createFlowProjectV2,
  createFlowRelease,
} from '../src/components/dashboard/dashboardV2Model.ts';
import {
  DASHBOARD_WORKSPACE_STORAGE_KEY,
  LEGACY_DASHBOARD_WORKSPACE_BACKUP_KEY,
  LEGACY_DASHBOARD_WORKSPACE_STORAGE_KEY,
  type DashboardWorkspaceV2,
  type FlowProjectV2,
} from '../src/components/dashboard/dashboardV2Types.ts';
import {
  DASHBOARD_WORKSPACE_PRIVACY_ERROR,
  CORRUPT_DASHBOARD_WORKSPACE_BACKUP_KEY,
  createDashboardWorkspaceRepository,
} from '../src/components/dashboard/dashboardWorkspaceRepository.ts';
import { simulateDynamicFlowV2 } from '../src/components/dashboard/flowSimulationEngine.ts';

const legacyWorkspace = {
  schemaVersion: 1,
  projects: [{
    id: 'legacy-flow',
    name: 'Synthetic legacy flow',
    description: 'Configuration only',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-02T00:00:00.000Z',
    flow: {
      schemaVersion: 1,
      nodes: [
        {
          id: 'start',
          kind: 'start',
          position: { x: 20, y: 40 },
          config: { retryLimit: 0, selectedDatabaseSourceIds: [] },
        },
        {
          id: 'database',
          kind: 'verification',
          moduleId: 'database-cross-check',
          position: { x: 240, y: 40 },
          config: {
            retryLimit: 1,
            selectedDatabaseSourceIds: ['domestic-blacklist'],
          },
        },
        {
          id: 'success',
          kind: 'terminal',
          terminalOutcome: 'success',
          position: { x: 480, y: 20 },
          config: { retryLimit: 0, selectedDatabaseSourceIds: [] },
        },
        {
          id: 'failure',
          kind: 'terminal',
          terminalOutcome: 'failure',
          position: { x: 480, y: 180 },
          config: { retryLimit: 0, selectedDatabaseSourceIds: [] },
        },
      ],
      edges: [
        { id: 'start-database', source: 'start', target: 'database', outcome: 'next' },
        { id: 'database-clear', source: 'database', target: 'success', outcome: 'notMatched' },
        { id: 'database-match', source: 'database', target: 'failure', outcome: 'matched' },
      ],
    },
    interface: {
      schemaVersion: 1,
      layout: 'card',
      theme: {
        primaryColor: '#0047FF',
        accentColor: '#7C3AED',
        backgroundColor: '#F8FAFC',
        surfaceColor: '#FFFFFF',
        textColor: '#0F172A',
        fontFamily: 'system',
        radius: 16,
        spacing: 'comfortable',
        logoUrl: '',
      },
      screens: [{
        id: 'welcome',
        kind: 'welcome',
        titleOverride: 'Synthetic welcome',
      }],
      orphanedScreens: [],
    },
    customModules: [],
  }],
} as const;

type MemoryStorageOptions = {
  readonly throwOnGet?: boolean;
  readonly throwOnSet?: boolean;
};

const createStorage = (
  initial: Readonly<Record<string, string>> = {},
  options: MemoryStorageOptions = {},
) => {
  const values = new Map(Object.entries(initial));
  const writes: { readonly key: string; readonly value: string }[] = [];
  return {
    values,
    writes,
    storage: {
      getItem: (key: string) => {
        if (options.throwOnGet) throw new Error('STORAGE_READ_BLOCKED');
        return values.get(key) ?? null;
      },
      setItem: (key: string, value: string) => {
        if (options.throwOnSet) throw new Error('QUOTA_EXCEEDED');
        values.set(key, value);
        writes.push({ key, value });
      },
    },
  };
};

const collectObjectKeys = (value: unknown, keys = new Set<string>()): Set<string> => {
  if (Array.isArray(value)) {
    for (const item of value) collectObjectKeys(item, keys);
    return keys;
  }
  if (!value || typeof value !== 'object') return keys;
  for (const [key, item] of Object.entries(value)) {
    keys.add(key);
    collectObjectKeys(item, keys);
  }
  return keys;
};

test('uses the stable v2 storage key and keeps the legacy key separate', () => {
  assert.equal(DASHBOARD_WORKSPACE_STORAGE_KEY, 'identra_dashboard_workspace');
  assert.equal(LEGACY_DASHBOARD_WORKSPACE_STORAGE_KEY, 'identra_dashboard_workspace_v1');
  assert.notEqual(DASHBOARD_WORKSPACE_STORAGE_KEY, LEGACY_DASHBOARD_WORKSPACE_STORAGE_KEY);
});

test('backs up v1 verbatim and migration is idempotent across repository reloads', () => {
  const rawLegacy = JSON.stringify(legacyWorkspace);
  const { storage, values, writes } = createStorage({
    [LEGACY_DASHBOARD_WORKSPACE_STORAGE_KEY]: rawLegacy,
  });

  const first = createDashboardWorkspaceRepository(
    storage,
    'vi',
    new Date('2026-02-01T00:00:00.000Z'),
  );
  assert.equal(first.loadResult.status, 'migrated');
  assert.equal(values.get(LEGACY_DASHBOARD_WORKSPACE_STORAGE_KEY), rawLegacy);
  assert.equal(values.get(LEGACY_DASHBOARD_WORKSPACE_BACKUP_KEY), rawLegacy);
  assert.equal(writes.length, 2);

  const firstSerialized = values.get(DASHBOARD_WORKSPACE_STORAGE_KEY);
  assert.ok(firstSerialized);
  const firstWorkspace = first.getWorkspace();
  const databaseNode = firstWorkspace.projects[0]?.flow.nodes.find(
    (node) => node.id === 'database',
  );
  assert.equal(databaseNode?.kind, 'verification');
  assert.deepEqual(
    databaseNode?.kind === 'verification' ? databaseNode.databaseStrategy : undefined,
    {
      executionMode: 'parallel',
      aggregation: 'anyMatch',
      stopOnMatch: true,
      requiredSourceIds: [],
      unavailablePolicy: 'continue',
    },
  );

  const second = createDashboardWorkspaceRepository(
    storage,
    'en',
    new Date('2030-01-01T00:00:00.000Z'),
  );
  assert.equal(second.loadResult.status, 'ready');
  assert.deepEqual(second.getWorkspace(), firstWorkspace);
  assert.equal(values.get(DASHBOARD_WORKSPACE_STORAGE_KEY), firstSerialized);
  assert.equal(values.get(LEGACY_DASHBOARD_WORKSPACE_BACKUP_KEY), rawLegacy);
  assert.equal(writes.length, 2);
});

test('recovers corrupt stable data once and preserves the original raw value', () => {
  const corruptRaw = '{"schemaVersion":2,"projects":';
  const { storage, values, writes } = createStorage({
    [DASHBOARD_WORKSPACE_STORAGE_KEY]: corruptRaw,
  });

  const recovered = createDashboardWorkspaceRepository(
    storage,
    'en',
    new Date('2026-02-02T00:00:00.000Z'),
  );
  assert.equal(recovered.loadResult.status, 'recovered');
  assert.equal(values.get(CORRUPT_DASHBOARD_WORKSPACE_BACKUP_KEY), corruptRaw);
  assert.equal(recovered.getWorkspace().projects.length, 0);
  assert.equal(writes.length, 2);

  const recoveredSerialized = values.get(DASHBOARD_WORKSPACE_STORAGE_KEY);
  assert.ok(recoveredSerialized);
  const reloaded = createDashboardWorkspaceRepository(storage, 'vi');
  assert.equal(reloaded.loadResult.status, 'ready');
  assert.equal(values.get(DASHBOARD_WORKSPACE_STORAGE_KEY), recoveredSerialized);
  assert.equal(writes.length, 2);
});

test('preserves unsupported newer data byte-for-byte and never writes over it', () => {
  const rawNewer = '{"schemaVersion":17,"projects":[],"future":{"opaque":true}}';
  const { storage, values, writes } = createStorage({
    [DASHBOARD_WORKSPACE_STORAGE_KEY]: rawNewer,
  });
  const repository = createDashboardWorkspaceRepository(storage, 'en');

  assert.equal(repository.loadResult.status, 'unsupportedNewerVersion');
  assert.equal(repository.canPersist, false);
  assert.equal(writes.length, 0);
  assert.throws(
    () => repository.replaceWorkspace(createEmptyWorkspaceV2()),
    /PERSISTENCE_UNAVAILABLE/,
  );
  assert.equal(values.get(DASHBOARD_WORKSPACE_STORAGE_KEY), rawNewer);
  assert.equal(writes.length, 0);
});

test('supports CRUD, duplicate, cascading delete, and reload from stable storage', () => {
  const { storage } = createStorage();
  const repository = createDashboardWorkspaceRepository(storage, 'en');
  const original = createFlowProjectV2(
    'Original',
    'Synthetic configuration',
    'en',
    new Date('2026-03-01T00:00:00.000Z'),
  );
  repository.createProject(original);

  const updated = {
    ...original,
    name: 'Updated',
    updatedAt: '2026-03-02T00:00:00.000Z',
  };
  repository.updateProject(updated);
  const duplicate = repository.duplicateProject(
    original.id,
    'Duplicate',
    new Date('2026-03-03T00:00:00.000Z'),
  );
  assert.ok(duplicate);
  assert.notEqual(duplicate.id, original.id);
  assert.equal(repository.getProject(original.id)?.name, 'Updated');
  assert.deepEqual(
    repository.listProjects().map((project) => project.name),
    ['Duplicate', 'Updated'],
  );

  const revision = createDraftRevision(
    updated,
    [],
    'manual',
    new Date('2026-03-04T00:00:00.000Z'),
  );
  const release = createFlowRelease(
    updated,
    '1.0.0',
    'environment-test',
    new Date('2026-03-04T00:00:00.000Z'),
  );
  repository.replaceWorkspace({
    ...repository.getWorkspace(),
    draftRevisions: [revision],
    releases: [release],
  });

  assert.equal(repository.deleteProject(original.id), true);
  assert.equal(repository.deleteProject(original.id), false);
  assert.equal(repository.getWorkspace().draftRevisions.length, 0);
  assert.equal(repository.getWorkspace().releases.length, 0);

  const reloaded = createDashboardWorkspaceRepository(storage, 'vi');
  assert.equal(reloaded.loadResult.status, 'ready');
  assert.equal(reloaded.listProjects().length, 1);
  assert.equal(reloaded.getProject(duplicate.id)?.name, 'Duplicate');
  assert.equal(reloaded.getProject(original.id), null);
});

test('persists responsive overrides and binding references without runtime values', () => {
  const { storage, values } = createStorage();
  const repository = createDashboardWorkspaceRepository(storage, 'vi');
  const project = createFlowProjectV2('Responsive synthetic flow');
  const firstScreen = project.interface.screens[0];
  assert.ok(firstScreen);
  const firstVariant = firstScreen.variants[0];
  assert.ok(firstVariant);
  const firstBlock = firstVariant.blocks[0];
  assert.ok(firstBlock);

  repository.createProject({
    ...project,
    interface: {
      ...project.interface,
      responsiveOverrides: {
        mobile: {
          layout: 'fullscreen',
          spacingScale: 0.8,
          borderRadius: 12,
          headingScale: 0.9,
          bodyScale: 0.95,
        },
      },
      screens: project.interface.screens.map((screen, screenIndex) =>
        screenIndex === 0
          ? {
              ...screen,
              variants: screen.variants.map((variant, variantIndex) =>
                variantIndex === 0
                  ? {
                      ...variant,
                      blocks: variant.blocks.map((block, blockIndex) =>
                        blockIndex === 0
                          ? {
                              ...block,
                              contentBinding: {
                                source: {
                                  kind: 'system',
                                  fieldId: 'flowName',
                                },
                              },
                            }
                          : block),
                    }
                  : variant),
            }
          : screen),
    },
  });

  const reloaded = createDashboardWorkspaceRepository(storage, 'en');
  const persisted = reloaded.getProject(project.id);
  assert.equal(persisted?.interface.responsiveOverrides?.mobile?.spacingScale, 0.8);
  assert.deepEqual(
    persisted?.interface.screens[0]?.variants[0]?.blocks[0]?.contentBinding,
    { source: { kind: 'system', fieldId: 'flowName' } },
  );
  assert.equal(
    values.get(DASHBOARD_WORKSPACE_STORAGE_KEY)?.includes('bindingApplied'),
    false,
  );
  assert.equal(
    values.get(DASHBOARD_WORKSPACE_STORAGE_KEY)?.includes('runtimeValue'),
    false,
  );
});

test('surfaces storage errors and a failed quota write does not mutate memory', () => {
  const readFailure = createStorage({}, { throwOnGet: true });
  const unavailable = createDashboardWorkspaceRepository(readFailure.storage, 'en');
  assert.equal(unavailable.loadResult.status, 'storageError');
  assert.equal(unavailable.canPersist, false);
  assert.throws(
    () => unavailable.createProject(createFlowProjectV2('Blocked')),
    /PERSISTENCE_UNAVAILABLE/,
  );

  const empty = createEmptyWorkspaceV2(new Date('2026-04-01T00:00:00.000Z'));
  const quotaFailure = createStorage(
    { [DASHBOARD_WORKSPACE_STORAGE_KEY]: JSON.stringify(empty) },
    { throwOnSet: true },
  );
  const repository = createDashboardWorkspaceRepository(quotaFailure.storage, 'en');
  const project = createFlowProjectV2('Not persisted');
  assert.throws(() => repository.createProject(project), /QUOTA_EXCEEDED/);
  assert.equal(repository.getProject(project.id), null);
  assert.deepEqual(repository.getWorkspace(), empty);
  assert.equal(
    quotaFailure.values.get(DASHBOARD_WORKSPACE_STORAGE_KEY),
    JSON.stringify(empty),
  );
});

test('opens a readable workspace even when automatic storage cleanup cannot be written', () => {
  const project = {
    ...createFlowProjectV2('Readable recovery workspace'),
    executionResult: {
      completed: true,
      steps: [{ nodeId: 'start' }],
    },
  };
  const workspace = {
    ...createEmptyWorkspaceV2(new Date('2026-04-02T00:00:00.000Z')),
    projects: [project],
  };
  const { storage } = createStorage(
    { [DASHBOARD_WORKSPACE_STORAGE_KEY]: JSON.stringify(workspace) },
    { throwOnSet: true },
  );

  const repository = createDashboardWorkspaceRepository(storage, 'vi');

  assert.equal(repository.loadResult.status, 'ready');
  assert.equal(repository.canPersist, true);
  assert.equal(repository.listProjects()[0]?.name, 'Readable recovery workspace');
  assert.equal('executionResult' in (repository.listProjects()[0] ?? {}), false);
});

test('keeps a privacy-blocked workspace accessible so unsafe values can be repaired', () => {
  const base = createFlowProjectV2('Repair unsafe saved values');
  const unsafeProject = {
    ...base,
    flow: {
      ...base.flow,
      nodes: [
        ...base.flow.nodes,
        {
          id: 'phone',
          kind: 'verification' as const,
          position: { x: 240, y: 160 },
          moduleRef: { packageId: 'phone-verification', version: '1' },
          bindings: [{
            id: 'phone-binding',
            targetFieldId: 'phoneNumber',
            source: {
              kind: 'literal' as const,
              valueType: 'string' as const,
              value: '0901234567',
            },
          }],
          retryPolicy: { maxAttempts: 1 },
          selectedDatabaseSourceIds: [],
        },
      ],
    },
  };
  const unsafeWorkspace = {
    ...createEmptyWorkspaceV2(new Date('2026-04-03T00:00:00.000Z')),
    projects: [unsafeProject],
  };
  const { storage } = createStorage({
    [DASHBOARD_WORKSPACE_STORAGE_KEY]: JSON.stringify(unsafeWorkspace),
  });

  const repository = createDashboardWorkspaceRepository(storage, 'vi');

  assert.equal(repository.loadResult.status, 'storageError');
  assert.equal(
    repository.loadResult.status === 'storageError'
      ? repository.loadResult.reason
      : undefined,
    'privacyViolation',
  );
  assert.equal(repository.canPersist, true);
  assert.equal(repository.getProject(base.id)?.name, 'Repair unsafe saved values');
});

test('persists configuration only and simulator has no network or download side effects', () => {
  const { storage, values } = createStorage();
  const repository = createDashboardWorkspaceRepository(storage, 'en');
  const baseProject = createFlowProjectV2(
    'Synthetic onboarding',
    'No identity values',
    'en',
    new Date('2026-05-01T00:00:00.000Z'),
  );
  const project = {
    ...baseProject,
    scenarios: [{
      id: 'scenario-synthetic-clear',
      name: 'Synthetic clear result',
      enabled: true,
      inputPresetId: 'synthetic-adult-clear',
      nodeFixtures: [],
      databaseFixtures: [],
      expectedEdgeIds: ['edge-start-success'],
      assertions: [],
    }],
  };
  repository.createProject(project);

  let fetchCalls = 0;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    throw new Error('UNEXPECTED_NETWORK_REQUEST');
  };
  try {
    const result = simulateDynamicFlowV2(project.flow, {
      scenario: project.scenarios[0],
    });
    assert.equal(result.completed, true);
    assert.equal(result.terminalOutcome, 'success');
  } finally {
    globalThis.fetch = originalFetch;
  }
  assert.equal(fetchCalls, 0);

  const serialized = values.get(DASHBOARD_WORKSPACE_STORAGE_KEY);
  assert.ok(serialized);
  const parsed = JSON.parse(serialized) as DashboardWorkspaceV2;
  const persistedKeys = collectObjectKeys(parsed);
  const forbiddenKeys = [
    'executionResult',
    'simulationResult',
    'executionLog',
    'secretValue',
    'apiKey',
    'clientSecret',
    'accessToken',
    'privateKey',
    'identityNumberValue',
    'phoneNumberValue',
    'faceEmbedding',
    'rawCredential',
  ];
  for (const key of forbiddenKeys) {
    assert.equal(persistedKeys.has(key), false, `forbidden persisted key: ${key}`);
  }
  assert.equal(serialized.includes('__synthetic_identity_number__'), false);
  assert.equal(serialized.includes('__synthetic_phone__'), false);
  assert.equal(serialized.includes('__synthetic_face_reference__'), false);

  const simulatorSource = readFileSync(
    new URL('../src/components/dashboard/flowSimulationEngine.ts', import.meta.url),
    'utf8',
  );
  assert.doesNotMatch(simulatorSource, /\bfetch\s*\(/u);
  assert.doesNotMatch(simulatorSource, /createObjectURL|\.download\b|\.click\s*\(/u);
});

test('deep storage validation recovers a nested malformed v2 payload', () => {
  const malformed = {
    ...createEmptyWorkspaceV2(new Date('2026-06-01T00:00:00.000Z')),
    projects: [{ id: 'shape-only-at-the-top' }],
  };
  const raw = JSON.stringify(malformed);
  const { storage, values } = createStorage({
    [DASHBOARD_WORKSPACE_STORAGE_KEY]: raw,
  });

  const repository = createDashboardWorkspaceRepository(storage, 'en');

  assert.equal(repository.loadResult.status, 'recovered');
  assert.equal(repository.getWorkspace().projects.length, 0);
  assert.equal(values.get(CORRUPT_DASHBOARD_WORKSPACE_BACKUP_KEY), raw);
});

test('strips runtime-only keys and freezes the committed repository snapshot', () => {
  const { storage, values } = createStorage();
  const repository = createDashboardWorkspaceRepository(storage, 'en');
  const project = {
    ...createFlowProjectV2('Runtime state must stay ephemeral'),
    executionResult: {
      completed: true,
      steps: [{ nodeId: 'start' }],
    },
  };

  const stored = repository.createProject(project);
  const serialized = values.get(DASHBOARD_WORKSPACE_STORAGE_KEY) ?? '';

  assert.equal(serialized.includes('executionResult'), false);
  assert.equal('executionResult' in stored, false);
  assert.equal(Object.isFrozen(repository.getWorkspace()), true);
  assert.equal(Object.isFrozen(repository.getWorkspace().projects), true);
  assert.equal(Object.isFrozen(repository.getWorkspace().projects[0]?.flow), true);
  const mutableInput = project as unknown as {
    name: string;
    flow: { nodes: unknown[] };
  };
  mutableInput.name = 'Mutated after commit';
  mutableInput.flow.nodes.push({ id: 'out-of-band-node' });
  assert.equal(repository.getProject(stored.id)?.name, 'Runtime state must stay ephemeral');
  assert.equal(
    repository.getProject(stored.id)?.flow.nodes.some(
      (node) => node.id === 'out-of-band-node',
    ),
    false,
  );
  assert.throws(() => {
    (repository.getWorkspace().projects as FlowProjectV2[]).push(
      createFlowProjectV2('Out-of-band mutation'),
    );
  });
  assert.equal(repository.listProjects().length, 1);
});

test('privacy rejection is atomic for literal PII, nested fixture PII, and secrets', () => {
  const empty = createEmptyWorkspaceV2(new Date('2026-07-01T00:00:00.000Z'));
  const { storage, values } = createStorage({
    [DASHBOARD_WORKSPACE_STORAGE_KEY]: JSON.stringify(empty),
  });
  const repository = createDashboardWorkspaceRepository(storage, 'en');
  const before = values.get(DASHBOARD_WORKSPACE_STORAGE_KEY);
  const base = createFlowProjectV2('Privacy boundary');
  const unsafeLiteral = {
    ...base,
    flow: {
      ...base.flow,
      nodes: [
        ...base.flow.nodes,
        {
          id: 'phone',
          kind: 'verification' as const,
          position: { x: 240, y: 160 },
          moduleRef: { packageId: 'phone-verification', version: '1' },
          bindings: [{
            id: 'phone-binding',
            targetFieldId: 'phoneNumber',
            source: {
              kind: 'literal' as const,
              valueType: 'string' as const,
              value: '0901234567',
            },
          }],
          retryPolicy: { maxAttempts: 1 },
          selectedDatabaseSourceIds: [],
        },
      ],
    },
  };

  assert.throws(
    () => repository.createProject(unsafeLiteral),
    new RegExp(DASHBOARD_WORKSPACE_PRIVACY_ERROR),
  );
  assert.equal(values.get(DASHBOARD_WORKSPACE_STORAGE_KEY), before);
  assert.equal(repository.listProjects().length, 0);

  const unsafeFixture = {
    ...base,
    scenarios: [{
      id: 'nested-private-metadata',
      name: 'Nested metadata',
      enabled: true,
      inputPresetId: 'synthetic-only',
      nodeFixtures: [],
      databaseFixtures: [{
        sourceId: 'domestic-blacklist',
        outcome: 'notMatched' as const,
        metadata: {
          explanation: {
            profile: {
              phone: 'synthetic-but-not-persistable',
            },
          },
        },
      }],
      expectedEdgeIds: [],
      assertions: [],
    }],
  };
  assert.throws(
    () => repository.createProject(unsafeFixture),
    new RegExp(DASHBOARD_WORKSPACE_PRIVACY_ERROR),
  );
  assert.equal(values.get(DASHBOARD_WORKSPACE_STORAGE_KEY), before);

  assert.throws(
    () => repository.replaceWorkspace({
      ...repository.getWorkspace(),
      environments: [{
        id: 'environment-test',
        stage: 'test',
        publicConfig: {
          nested: {
            credentials: 'reference-only',
          },
        },
        secretReferenceNames: ['sk-live-raw-secret-value'],
      }],
    }),
    new RegExp(DASHBOARD_WORKSPACE_PRIVACY_ERROR),
  );
  assert.equal(values.get(DASHBOARD_WORKSPACE_STORAGE_KEY), before);
});
