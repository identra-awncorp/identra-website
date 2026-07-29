/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import {
  DASHBOARD_WORKSPACE_STORAGE_KEY,
  LEGACY_DASHBOARD_WORKSPACE_BACKUP_KEY,
  LEGACY_DASHBOARD_WORKSPACE_STORAGE_KEY,
} from '../src/components/dashboard/dashboardV2Types.ts';
import {
  createFlowProjectV2,
} from '../src/components/dashboard/dashboardV2Model.ts';
import {
  isLegacyWorkspace,
  migrateLegacyWorkspace,
} from '../src/components/dashboard/dashboardMigration.ts';
import {
  createDashboardWorkspaceRepository,
} from '../src/components/dashboard/dashboardWorkspaceRepository.ts';

const legacyWorkspace = {
  schemaVersion: 1,
  projects: [{
    id: 'flow-legacy',
    name: 'Legacy verification',
    description: 'Synthetic only',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-02T00:00:00.000Z',
    flow: {
      schemaVersion: 1,
      nodes: [
        {
          id: 'start',
          kind: 'start',
          position: { x: 10, y: 20 },
          config: { retryLimit: 0, selectedDatabaseSourceIds: [] },
        },
        {
          id: 'condition',
          kind: 'condition',
          position: { x: 200, y: 20 },
          conditionExpression: 'result.score >= 80',
          config: { retryLimit: 0, selectedDatabaseSourceIds: [] },
        },
        {
          id: 'custom-node',
          kind: 'verification',
          moduleId: 'custom-electricity',
          position: { x: 400, y: 20 },
          config: { retryLimit: 2, selectedDatabaseSourceIds: [] },
        },
        {
          id: 'terminal-success',
          kind: 'terminal',
          terminalOutcome: 'success',
          position: { x: 600, y: 20 },
          config: { retryLimit: 0, selectedDatabaseSourceIds: [] },
        },
      ],
      edges: [
        { id: 'edge-1', source: 'start', target: 'condition', outcome: 'next' },
        { id: 'edge-2', source: 'condition', target: 'custom-node', outcome: 'true' },
        { id: 'edge-3', source: 'custom-node', target: 'terminal-success', outcome: 'success' },
      ],
    },
    interface: {
      schemaVersion: 1,
      layout: 'split',
      theme: {
        primaryColor: '#112233',
        accentColor: '#445566',
        backgroundColor: '#F1F2F3',
        surfaceColor: '#FFFFFF',
        textColor: '#101828',
        fontFamily: 'jakarta',
        radius: 18,
        spacing: 'comfortable',
        logoUrl: 'https://assets.example/logo.png',
      },
      screens: [{
        id: 'welcome',
        kind: 'welcome',
        titleOverride: 'Welcome override',
        bodyOverride: 'Synthetic verification',
        actionOverride: 'Continue',
      }],
      orphanedScreens: [],
    },
    customModules: [{
      id: 'custom-electricity',
      origin: 'custom',
      category: 'custom',
      name: 'Electricity bill',
      version: '1.0.0',
      description: 'Verify a signed bill credential',
      credentialType: 'ElectricityBillCredential',
      didResolverUrl: 'https://resolver.example/did',
      verificationMethod: 'assertionMethod',
      issuerPolicy: { mode: 'exactDid', issuerDid: 'did:web:utility.example' },
      inputSchema: [{ id: 'credential', name: 'credential', type: 'object', required: true }],
      outputSchema: [{ id: 'verified', name: 'verified', type: 'boolean', required: true }],
      successExpression: 'output.verified === true',
      failureExpression: 'output.verified !== true',
      defaultUi: {
        title: 'Verify bill',
        description: 'Present a signed credential',
        actionLabel: 'Continue',
      },
    }],
  }],
} as const;

const createStorage = (initial: Readonly<Record<string, string>> = {}) => {
  const values = new Map(Object.entries(initial));
  return {
    values,
    storage: {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => {
        values.set(key, value);
      },
    },
  };
};

test('migrates v1 exactly once and preserves graph, UI, and module identity', () => {
  const rawLegacy = JSON.stringify(legacyWorkspace);
  const { storage, values } = createStorage({
    [LEGACY_DASHBOARD_WORKSPACE_STORAGE_KEY]: rawLegacy,
  });

  const first = createDashboardWorkspaceRepository(
    storage,
    'vi',
    new Date('2026-02-01T00:00:00.000Z'),
  );
  assert.equal(first.loadResult.status, 'migrated');
  const workspace = first.getWorkspace();
  const project = workspace.projects[0];
  assert.equal(project?.flow.nodes[0]?.position.x, 10);
  assert.equal(project?.flow.nodes.find((node) => node.id === 'custom-node')?.kind, 'verification');
  assert.equal(workspace.moduleCatalog[0]?.id, 'custom-electricity');
  assert.equal(workspace.moduleCatalog[0]?.versions[0]?.version, '1.0.0');
  const condition = project?.flow.nodes.find((node) => node.id === 'condition');
  assert.equal(condition?.kind === 'condition' && condition.condition.migrationState, 'requiresConversion');
  assert.equal(project?.interface.layout, 'split');
  assert.equal(project?.interface.theme.light.primary, '#112233');
  assert.equal(project?.interface.contentLocaleReviewRequired, true);
  assert.equal(
    project?.interface.screens[0]?.variants[0]?.blocks[0]?.kind === 'heading'
      && project.interface.screens[0].variants[0].blocks[0].content.vi,
    'Welcome override',
  );
  assert.equal(values.get(LEGACY_DASHBOARD_WORKSPACE_BACKUP_KEY), rawLegacy);

  const serializedV2 = values.get(DASHBOARD_WORKSPACE_STORAGE_KEY);
  assert.ok(serializedV2);
  const second = createDashboardWorkspaceRepository(storage, 'en');
  assert.equal(second.loadResult.status, 'ready');
  assert.deepEqual(second.getWorkspace(), workspace);
});

test('does not overwrite a workspace created by a newer application', () => {
  const rawNewer = JSON.stringify({ schemaVersion: 99, projects: [] });
  const { storage, values } = createStorage({
    [DASHBOARD_WORKSPACE_STORAGE_KEY]: rawNewer,
  });
  const repository = createDashboardWorkspaceRepository(storage, 'en');

  assert.equal(repository.loadResult.status, 'unsupportedNewerVersion');
  assert.equal(repository.canPersist, false);
  assert.throws(
    () => repository.createProject(createFlowProjectV2('Blocked')),
    /PERSISTENCE_UNAVAILABLE/,
  );
  assert.equal(values.get(DASHBOARD_WORKSPACE_STORAGE_KEY), rawNewer);
});

test('v2 repository supports project CRUD without storing execution results', () => {
  const { storage, values } = createStorage();
  const repository = createDashboardWorkspaceRepository(storage, 'en');
  const project = createFlowProjectV2(
    'Customer onboarding',
    'Synthetic configuration',
    'en',
    new Date('2026-03-01T00:00:00.000Z'),
  );

  repository.createProject(project);
  repository.updateProject({ ...project, name: 'Updated' });
  const duplicate = repository.duplicateProject(
    project.id,
    'Copy',
    new Date('2026-03-02T00:00:00.000Z'),
  );
  assert.equal(repository.getProject(project.id)?.name, 'Updated');
  assert.equal(duplicate?.name, 'Copy');
  assert.equal(repository.listProjects().length, 2);
  assert.equal(repository.deleteProject(project.id), true);
  assert.equal(repository.listProjects().length, 1);

  const serialized = values.get(DASHBOARD_WORKSPACE_STORAGE_KEY) ?? '';
  assert.equal(serialized.includes('executionResult'), false);
  assert.equal(serialized.includes('identityNumberValue'), false);
});

test('the v1 to v2 migration function is deterministic for the same input and time', () => {
  assert.equal(isLegacyWorkspace(legacyWorkspace), true);
  const now = new Date('2026-08-01T00:00:00.000Z');
  const first = migrateLegacyWorkspace(legacyWorkspace, 'vi', now);
  const second = migrateLegacyWorkspace(legacyWorkspace, 'vi', now);

  assert.deepEqual(second, first);
  const condition = first.projects[0]?.flow.nodes.find(
    (node) => node.id === 'condition',
  );
  assert.equal(
    condition?.kind === 'condition' ? condition.condition.root.id : '',
    'condition-group:legacy:node:condition',
  );
});

test('rejects malformed nested v1 data before migration instead of throwing', () => {
  const malformed = {
    ...legacyWorkspace,
    projects: [{
      ...legacyWorkspace.projects[0],
      interface: {
        schemaVersion: 1,
        layout: 'split',
        screens: [],
        orphanedScreens: [],
      },
    }],
  };
  assert.equal(isLegacyWorkspace(malformed), false);

  const raw = JSON.stringify(malformed);
  const { storage, values } = createStorage({
    [LEGACY_DASHBOARD_WORKSPACE_STORAGE_KEY]: raw,
  });
  const repository = createDashboardWorkspaceRepository(storage, 'en');

  assert.equal(repository.loadResult.status, 'recovered');
  assert.equal(repository.getWorkspace().projects.length, 0);
  assert.equal(
    values.get(LEGACY_DASHBOARD_WORKSPACE_BACKUP_KEY),
    undefined,
  );
});
