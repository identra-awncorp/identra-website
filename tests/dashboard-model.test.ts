/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import {
  DATABASE_SOURCES,
  createCustomModule,
  createDefaultFlow,
  createDefaultInterface,
  createFlowProject,
  createVerificationNode,
  reconcileInterfaceManifest,
  simulateDynamicFlow,
  validateDynamicFlow,
  wouldCreateCycle,
  type DynamicFlowManifest,
} from '../src/components/dashboard/dashboardModel.ts';
import {
  DASHBOARD_STORAGE_KEY,
  createDashboardRepository,
} from '../src/components/dashboard/dashboardRepository.ts';
import { DASHBOARD_PRODUCTS } from '../src/components/dashboard/dashboardRegistry.ts';

const createDatabaseFlow = (): DynamicFlowManifest => {
  const initial = createDefaultFlow();
  const databaseNode = {
    ...createVerificationNode('database-cross-check', { x: 300, y: 200 }),
    id: 'database',
  };
  return {
    ...initial,
    nodes: [...initial.nodes, databaseNode],
    edges: [
      { id: 'start-database', source: 'start', target: 'database', outcome: 'next' },
      { id: 'database-match', source: 'database', target: 'terminal-failure', outcome: 'matched' },
      { id: 'database-clear', source: 'database', target: 'terminal-success', outcome: 'notMatched' },
      { id: 'database-unknown', source: 'database', target: 'terminal-failure', outcome: 'inconclusive' },
      { id: 'database-offline', source: 'database', target: 'terminal-failure', outcome: 'sourceUnavailable' },
    ],
  };
};

test('creates a valid local-first project without identity data', () => {
  const project = createFlowProject('Customer onboarding', 'Synthetic configuration');

  assert.equal(project.flow.schemaVersion, 1);
  assert.equal(project.interface.schemaVersion, 1);
  assert.deepEqual(validateDynamicFlow(project.flow), []);
  assert.equal(JSON.stringify(project).includes('identityNumber'), false);
});

test('models domestic and international database sources explicitly', () => {
  assert.ok(DATABASE_SOURCES.some((source) => source.id === 'domestic-blacklist'));
  assert.ok(DATABASE_SOURCES.some((source) => source.id === 'domestic-wanted-list'));
  assert.ok(DATABASE_SOURCES.some((source) => source.id === 'domestic-bad-debt'));
  assert.ok(DATABASE_SOURCES.some((source) => source.scope === 'international'));
  assert.ok(DATABASE_SOURCES.every((source) => source.supportedFields.length > 0));
});

test('validates database branches and simulates normalized outcomes', () => {
  const flow = createDatabaseFlow();
  assert.deepEqual(validateDynamicFlow(flow), []);

  const matched = simulateDynamicFlow(flow, { database: 'matched' });
  const clear = simulateDynamicFlow(flow, { database: 'notMatched' });
  const unavailable = simulateDynamicFlow(flow, { database: 'sourceUnavailable' });

  assert.equal(matched.terminalOutcome, 'failure');
  assert.equal(clear.terminalOutcome, 'success');
  assert.equal(unavailable.terminalOutcome, 'failure');
});

test('requires a selected database source and rejects graph cycles', () => {
  const flow = createDatabaseFlow();
  const withoutSources: DynamicFlowManifest = {
    ...flow,
    nodes: flow.nodes.map((node) => node.id === 'database'
      ? {
          ...node,
          config: {
            ...node.config,
            selectedDatabaseSourceIds: [],
          },
        }
      : node),
  };

  assert.ok(
    validateDynamicFlow(withoutSources).some(
      (issue) => issue.code === 'missingDatabaseSource',
    ),
  );
  assert.equal(wouldCreateCycle(flow, 'database', 'start'), true);
  assert.equal(wouldCreateCycle(flow, 'terminal-success', 'database'), true);
});

test('preserves module screen customizations and archives removed screens', () => {
  const initial = createDefaultFlow();
  const node = {
    ...createVerificationNode('citizen-id', { x: 300, y: 200 }),
    id: 'citizen',
  };
  const withModule = {
    ...initial,
    nodes: [...initial.nodes, node],
  };
  const first = reconcileInterfaceManifest(createDefaultInterface(), withModule);
  const moduleScreen = first.screens.find((screen) => screen.sourceNodeId === 'citizen');
  assert.ok(moduleScreen);

  const customized = {
    ...first,
    screens: first.screens.map((screen) => screen.id === moduleScreen.id
      ? { ...screen, titleOverride: 'Customer title' }
      : screen),
  };
  const removed = reconcileInterfaceManifest(customized, initial);

  assert.equal(
    removed.orphanedScreens.find((screen) => screen.id === moduleScreen.id)?.titleOverride,
    'Customer title',
  );
});

test('creates a complete custom SSI module contract', () => {
  const module = createCustomModule({
    name: 'Electricity bill',
    version: '1.0.0',
    description: 'Verify a signed bill',
    credentialType: 'ElectricityBillCredential',
    didResolverUrl: 'https://resolver.example/did',
    verificationMethod: 'assertionMethod',
    issuerPolicy: { mode: 'exactDid', issuerDid: 'did:web:utility.example' },
    inputSchema: [{ id: 'credential', name: 'credential', type: 'string', required: true }],
    outputSchema: [{ id: 'verified', name: 'verified', type: 'boolean', required: true }],
    successExpression: 'output.verified === true',
    failureExpression: 'output.verified !== true',
    defaultUi: {
      title: 'Verify your bill',
      description: 'Present a signed credential',
      actionLabel: 'Continue',
    },
  });

  assert.match(module.id, /^custom-module-/);
  assert.equal(module.issuerPolicy.mode, 'exactDid');
  assert.equal(module.inputSchema[0]?.required, true);
});

test('repository supports create, update, duplicate, delete, and corrupt-data recovery', () => {
  const values = new Map<string, string>();
  const storage = {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => {
      values.set(key, value);
    },
  };
  const repository = createDashboardRepository(storage);
  const project = createFlowProject('Original', '', new Date('2026-01-01T00:00:00.000Z'));
  repository.create(project);
  assert.equal(repository.get(project.id)?.name, 'Original');

  repository.update({ ...project, name: 'Updated' });
  assert.equal(repository.get(project.id)?.name, 'Updated');
  const duplicate = repository.duplicate(
    project.id,
    'Copy',
    new Date('2026-01-02T00:00:00.000Z'),
  );
  assert.equal(duplicate?.name, 'Copy');
  assert.equal(repository.list().length, 2);
  assert.equal(repository.delete(project.id), true);
  assert.equal(repository.list().length, 1);

  values.set(DASHBOARD_STORAGE_KEY, '{broken');
  const recovered = createDashboardRepository(storage);
  assert.equal(recovered.recoveredCorruptData, true);
  assert.deepEqual(recovered.list(), []);
});

test('dashboard registry exposes two active extensible tools', () => {
  assert.deepEqual(
    DASHBOARD_PRODUCTS.filter((product) => product.status === 'active').map((product) => product.id),
    ['dynamicFlow', 'interfaceStudio'],
  );
  assert.ok(
    DASHBOARD_PRODUCTS
      .filter((product) => product.status === 'comingSoon')
      .every((product) => product.capabilities.length === 0),
  );
});

