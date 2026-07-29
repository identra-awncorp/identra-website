/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import {
  createDefaultDatabaseStrategy,
  executeDatabaseStrategy,
  validateDatabaseStrategy,
} from '../src/components/dashboard/databaseStrategyEngine.ts';
import {
  computeEdgeCoverage,
  createEmptyScenarioRunSummary,
  evaluateScenarioAssertions,
  runScenarioBatch,
  validateScenario,
  type ScenarioValidationContext,
} from '../src/components/dashboard/scenarioEngine.ts';
import {
  DYNAMIC_FLOW_SCHEMA_VERSION,
  type DatabaseSourceFixture,
  type DatabaseStrategy,
  type DynamicFlowManifestV2,
  type FlowField,
  type FlowScenario,
  type ScenarioExecutionResult,
} from '../src/components/dashboard/dashboardV2Types.ts';

const SOURCE_A = 'domestic-blacklist';
const SOURCE_B = 'domestic-wanted-list';
const SOURCE_C = 'international-blacklist';

const fixtures = (
  values: Readonly<Record<string, DatabaseSourceFixture['outcome']>>,
): readonly DatabaseSourceFixture[] => Object.entries(values).map(
  ([sourceId, outcome]) => ({ sourceId, outcome }),
);

test('uses a deterministic, migration-safe default database strategy', () => {
  assert.deepEqual(createDefaultDatabaseStrategy(), {
    executionMode: 'parallel',
    aggregation: 'anyMatch',
    stopOnMatch: true,
    requiredSourceIds: [],
    unavailablePolicy: 'continue',
  });
});

test('parallel anyMatch evaluates every source in configured order', () => {
  const strategy: DatabaseStrategy = {
    ...createDefaultDatabaseStrategy(),
    unavailablePolicy: 'sourceUnavailable',
  };
  const result = executeDatabaseStrategy(
    strategy,
    [SOURCE_A, SOURCE_B, SOURCE_C],
    fixtures({
      [SOURCE_A]: 'notMatched',
      [SOURCE_B]: 'matched',
      [SOURCE_C]: 'notMatched',
    }),
  );

  assert.equal(result.outcome, 'matched');
  assert.deepEqual(
    result.sourceResults.map((source) => source.sourceId),
    [SOURCE_A, SOURCE_B, SOURCE_C],
  );
  assert.equal(result.metadata.stoppedEarly, false);
  assert.equal(result.metadata.stopOnMatchApplied, false);
});

test('sequential execution stops after a decisive match and records skipped sources', () => {
  const strategy: DatabaseStrategy = {
    ...createDefaultDatabaseStrategy(),
    executionMode: 'sequential',
  };
  const result = executeDatabaseStrategy(
    strategy,
    [SOURCE_A, SOURCE_B, SOURCE_C],
    fixtures({
      [SOURCE_A]: 'notMatched',
      [SOURCE_B]: 'matched',
      [SOURCE_C]: 'matched',
    }),
  );

  assert.equal(result.outcome, 'matched');
  assert.deepEqual(result.metadata.evaluatedSourceIds, [SOURCE_A, SOURCE_B]);
  assert.deepEqual(result.metadata.skippedSourceIds, [SOURCE_C]);
  assert.equal(result.metadata.stopReason, 'matchResolved');
});

test('required unavailable sources take precedence over earlier matches', () => {
  const strategy: DatabaseStrategy = {
    ...createDefaultDatabaseStrategy(),
    executionMode: 'sequential',
    requiredSourceIds: [SOURCE_C],
  };
  const result = executeDatabaseStrategy(
    strategy,
    [SOURCE_A, SOURCE_B, SOURCE_C],
    fixtures({
      [SOURCE_A]: 'matched',
      [SOURCE_B]: 'notMatched',
      [SOURCE_C]: 'sourceUnavailable',
    }),
  );

  assert.equal(result.outcome, 'sourceUnavailable');
  assert.equal(result.metadata.stopReason, 'requiredSourceUnavailable');
  assert.deepEqual(result.metadata.requiredSourceUnavailableIds, [SOURCE_C]);
  assert.deepEqual(result.metadata.evaluatedSourceIds, [
    SOURCE_A,
    SOURCE_B,
    SOURCE_C,
  ]);
});

test('sequential short-circuit never skips required sources and stops at the first required outage', () => {
  const requiredAvailable = executeDatabaseStrategy(
    {
      ...createDefaultDatabaseStrategy(),
      executionMode: 'sequential',
      requiredSourceIds: [SOURCE_C],
    },
    [SOURCE_A, SOURCE_B, SOURCE_C],
    fixtures({
      [SOURCE_A]: 'matched',
      [SOURCE_B]: 'notMatched',
      [SOURCE_C]: 'notMatched',
    }),
  );
  assert.equal(requiredAvailable.outcome, 'matched');
  assert.deepEqual(
    requiredAvailable.metadata.evaluatedSourceIds,
    [SOURCE_A, SOURCE_B, SOURCE_C],
  );

  const firstRequiredOutage = executeDatabaseStrategy(
    {
      ...createDefaultDatabaseStrategy(),
      executionMode: 'sequential',
      requiredSourceIds: [SOURCE_B, SOURCE_C],
    },
    [SOURCE_A, SOURCE_B, SOURCE_C],
    fixtures({
      [SOURCE_A]: 'notMatched',
      [SOURCE_B]: 'sourceUnavailable',
      [SOURCE_C]: 'sourceUnavailable',
    }),
  );
  assert.equal(firstRequiredOutage.outcome, 'sourceUnavailable');
  assert.deepEqual(
    firstRequiredOutage.metadata.evaluatedSourceIds,
    [SOURCE_A, SOURCE_B],
  );
  assert.deepEqual(
    firstRequiredOutage.metadata.requiredSourceUnavailableIds,
    [SOURCE_B],
  );
  assert.deepEqual(firstRequiredOutage.metadata.skippedSourceIds, [SOURCE_C]);
});

test('strict unavailable policy prevents an optional-source match from hiding an outage', () => {
  const result = executeDatabaseStrategy(
    {
      ...createDefaultDatabaseStrategy(),
      executionMode: 'sequential',
      unavailablePolicy: 'sourceUnavailable',
    },
    [SOURCE_A, SOURCE_B],
    fixtures({
      [SOURCE_A]: 'matched',
      [SOURCE_B]: 'sourceUnavailable',
    }),
  );

  assert.equal(result.outcome, 'sourceUnavailable');
  assert.deepEqual(result.metadata.evaluatedSourceIds, [SOURCE_A, SOURCE_B]);
  assert.equal(result.metadata.stoppedEarly, false);
});

test('quorum and weighted aggregations resolve deterministically', () => {
  const quorum = executeDatabaseStrategy(
    {
      ...createDefaultDatabaseStrategy(),
      aggregation: 'quorum',
      quorum: 2,
    },
    [SOURCE_A, SOURCE_B, SOURCE_C],
    fixtures({
      [SOURCE_A]: 'matched',
      [SOURCE_B]: 'inconclusive',
      [SOURCE_C]: 'notMatched',
    }),
  );
  assert.equal(quorum.outcome, 'inconclusive');

  const weighted = executeDatabaseStrategy(
    {
      ...createDefaultDatabaseStrategy(),
      executionMode: 'sequential',
      aggregation: 'weighted',
      weightedThreshold: 0.6,
      sourceWeights: {
        [SOURCE_A]: 0.7,
        [SOURCE_B]: 0.3,
      },
    },
    [SOURCE_A, SOURCE_B],
    [
      { sourceId: SOURCE_A, outcome: 'matched', matchScore: 0.9 },
      { sourceId: SOURCE_B, outcome: 'notMatched' },
    ],
  );
  assert.equal(weighted.outcome, 'matched');
  assert.ok(Math.abs((weighted.aggregateScore ?? 0) - 0.63) < 0.000_001);
  assert.deepEqual(weighted.metadata.skippedSourceIds, [SOURCE_B]);
});

test('validates invalid strategies, fixtures, and missing simulated sources', () => {
  const strategy: DatabaseStrategy = {
    ...createDefaultDatabaseStrategy(),
    aggregation: 'weighted',
    weightedThreshold: 2,
    sourceWeights: { [SOURCE_A]: 0 },
    requiredSourceIds: ['missing-source'],
  };
  const issues = validateDatabaseStrategy(
    strategy,
    [SOURCE_A, SOURCE_A, SOURCE_B],
    [
      { sourceId: SOURCE_A, outcome: 'matched', matchScore: 2 },
      { sourceId: SOURCE_A, outcome: 'notMatched' },
      { sourceId: 'not-selected', outcome: 'notMatched' },
    ],
  );
  const codes = new Set(issues.map((issue) => issue.code));

  assert.ok(codes.has('duplicateSource'));
  assert.ok(codes.has('requiredSourceNotSelected'));
  assert.ok(codes.has('invalidWeightedThreshold'));
  assert.ok(codes.has('invalidSourceWeight'));
  assert.ok(codes.has('missingSourceWeight'));
  assert.ok(codes.has('duplicateFixture'));
  assert.ok(codes.has('fixtureForUnselectedSource'));
  assert.ok(codes.has('missingFixture'));
  assert.ok(codes.has('invalidMatchScore'));
});

const safeRiskField: FlowField = {
  id: 'risk-code',
  key: 'riskCode',
  type: 'string',
  format: 'none',
  required: true,
  classification: 'publicMetadata',
  safeForResult: true,
};

const unsafeIdentityField: FlowField = {
  id: 'identity-number',
  key: 'identityNumber',
  type: 'string',
  format: 'none',
  required: true,
  classification: 'pii',
  safeForResult: false,
};

const manifest: DynamicFlowManifestV2 = {
  schemaVersion: DYNAMIC_FLOW_SCHEMA_VERSION,
  inputSchema: { fields: [] },
  nodes: [
    { id: 'start', kind: 'start', position: { x: 0, y: 0 } },
    {
      id: 'database',
      kind: 'verification',
      position: { x: 200, y: 0 },
      moduleRef: { packageId: 'database-cross-check', version: '1.0.0' },
      bindings: [],
      retryPolicy: { maxAttempts: 1 },
      selectedDatabaseSourceIds: [SOURCE_A, SOURCE_C],
      databaseStrategy: createDefaultDatabaseStrategy(),
    },
    {
      id: 'success',
      kind: 'terminal',
      terminalOutcome: 'success',
      position: { x: 400, y: -100 },
    },
    {
      id: 'failure',
      kind: 'terminal',
      terminalOutcome: 'failure',
      position: { x: 400, y: 100 },
    },
  ],
  edges: [
    { id: 'edge-start', source: 'start', target: 'database', outcome: 'next' },
    {
      id: 'edge-clear',
      source: 'database',
      target: 'success',
      outcome: 'notMatched',
    },
    {
      id: 'edge-match',
      source: 'database',
      target: 'failure',
      outcome: 'matched',
    },
  ],
};

const context: ScenarioValidationContext = {
  manifest,
  outputFieldsByNode: {
    database: [safeRiskField, unsafeIdentityField],
  },
};

const createScenario = (
  overrides: Partial<FlowScenario> = {},
): FlowScenario => ({
  id: 'scenario-clear',
  name: 'Synthetic clear result',
  enabled: true,
  inputPresetId: 'synthetic-citizen-clear',
  nodeFixtures: [
    { nodeId: 'database', outcome: 'notMatched', outputPresetId: 'safe-risk-clear' },
  ],
  databaseFixtures: [
    { sourceId: SOURCE_A, outcome: 'notMatched', metadata: { latencyBand: 'fast' } },
  ],
  expectedTerminalId: 'success',
  expectedEdgeIds: ['edge-start', 'edge-clear'],
  assertions: [
    { id: 'terminal', kind: 'terminal', terminalNodeId: 'success' },
    { id: 'path', kind: 'pathIncludes', edgeId: 'edge-clear' },
    {
      id: 'outcome',
      kind: 'nodeOutcome',
      nodeId: 'database',
      outcome: 'notMatched',
    },
    {
      id: 'output',
      kind: 'safeOutputEquals',
      nodeId: 'database',
      fieldId: 'risk-code',
      expected: { band: 'clear', score: 0 },
    },
  ],
  ...overrides,
});

const successfulExecution = (
  scenarioId: string,
): ScenarioExecutionResult => ({
  scenarioId,
  completed: true,
  terminalNodeId: 'success',
  terminalOutcome: 'success',
  steps: [
    { nodeId: 'start', outcome: 'next', edgeId: 'edge-start' },
    {
      nodeId: 'database',
      outcome: 'notMatched',
      edgeId: 'edge-clear',
      metadata: { 'risk-code': { band: 'clear', score: 0 } },
    },
    { nodeId: 'success' },
  ],
  traversedEdgeIds: ['edge-start', 'edge-clear'],
  assertionResults: [],
});

test('validates stale scenario node, source, edge, and safe field references', () => {
  const invalid = createScenario({
    nodeFixtures: [{ nodeId: 'removed-node', outcome: 'success' }],
    databaseFixtures: [
      { sourceId: 'removed-source', outcome: 'notMatched' },
      {
        sourceId: SOURCE_A,
        outcome: 'notMatched',
        metadata: { identityNumber: 'synthetic-value-not-accepted' },
      },
    ],
    expectedTerminalId: 'removed-terminal',
    expectedEdgeIds: ['removed-edge'],
    assertions: [
      { id: 'edge', kind: 'pathIncludes', edgeId: 'removed-edge' },
      {
        id: 'unsafe-output',
        kind: 'safeOutputEquals',
        nodeId: 'database',
        fieldId: 'identity-number',
        expected: 'synthetic-value-not-accepted',
      },
      {
        id: 'missing-output',
        kind: 'safeOutputEquals',
        nodeId: 'database',
        fieldId: 'removed-field',
        expected: false,
      },
    ],
  });
  const codes = new Set(validateScenario(invalid, context).map((issue) => issue.code));

  assert.ok(codes.has('staleNode'));
  assert.ok(codes.has('staleDatabaseSource'));
  assert.ok(codes.has('unsafeFixtureMetadata'));
  assert.ok(codes.has('staleExpectedTerminal'));
  assert.ok(codes.has('staleExpectedEdge'));
  assert.ok(codes.has('staleAssertionEdge'));
  assert.ok(codes.has('unsafeOutputAssertion'));
  assert.ok(codes.has('staleAssertionField'));
});

test('evaluates structured assertions including safe structured output', () => {
  const scenario = createScenario();
  const results = evaluateScenarioAssertions(
    scenario,
    successfulExecution(scenario.id),
  );

  assert.equal(results.length, scenario.assertions.length + 2);
  assert.ok(results.every((result) => result.passed));
});

test('batch execution skips disabled and stale scenarios and computes edge coverage', async () => {
  const valid = createScenario();
  const disabled = createScenario({ id: 'disabled', enabled: false });
  const stale = createScenario({
    id: 'stale',
    nodeFixtures: [{ nodeId: 'removed-node', outcome: 'success' }],
  });
  const originals = JSON.stringify([valid, disabled, stale]);
  let executorCalls = 0;

  const summary = await runScenarioBatch(
    [valid, disabled, stale],
    context,
    (scenario) => {
      executorCalls += 1;
      return successfulExecution(scenario.id);
    },
  );

  assert.equal(executorCalls, 1);
  assert.equal(summary.passed, 1);
  assert.equal(summary.skipped, 1);
  assert.equal(summary.invalid, 1);
  assert.deepEqual(summary.edgeCoverage.coveredEdgeIds, ['edge-start', 'edge-clear']);
  assert.deepEqual(summary.edgeCoverage.uncoveredEdgeIds, ['edge-match']);
  assert.equal(summary.edgeCoverage.coverage, 2 / 3);
  assert.equal(JSON.stringify([valid, disabled, stale]), originals);
});

test('failed assertions and executor errors remain isolated per scenario', async () => {
  const failing = createScenario({ id: 'failing', expectedTerminalId: 'failure' });
  const throwing = createScenario({ id: 'throwing' });
  const summary = await runScenarioBatch(
    [failing, throwing],
    context,
    (scenario) => {
      if (scenario.id === 'throwing') throw new Error('synthetic executor failure');
      return successfulExecution(scenario.id);
    },
  );

  assert.equal(summary.failed, 1);
  assert.equal(summary.executionErrors, 1);
  assert.equal(summary.runs[0]?.status, 'failed');
  assert.equal(summary.runs[1]?.status, 'executionError');
});

test('an incomplete execution cannot pass an otherwise empty expectation set', async () => {
  const scenario = createScenario({
    id: 'incomplete',
    expectedTerminalId: undefined,
    expectedEdgeIds: [],
    assertions: [],
  });
  const summary = await runScenarioBatch(
    [scenario],
    context,
    () => ({
      scenarioId: scenario.id,
      completed: false,
      steps: [],
      traversedEdgeIds: [],
      assertionResults: [],
    }),
  );

  assert.equal(summary.failed, 1);
  assert.equal(summary.runs[0]?.status, 'failed');
});

test('database fixture metadata rejects sensitive keys at every nesting depth', () => {
  const scenario = createScenario({
    databaseFixtures: [{
      sourceId: SOURCE_A,
      outcome: 'notMatched',
      metadata: {
        explanation: {
          identityNumber: 'synthetic-value-not-accepted',
        },
      },
    }],
  });

  assert.ok(validateScenario(scenario, context).some(
    (issue) => issue.code === 'unsafeFixtureMetadata',
  ));
});

test('edge coverage ignores unknown edge ids and handles an empty graph', () => {
  const coverage = computeEdgeCoverage(manifest, [
    { traversedEdgeIds: ['edge-match', 'unknown-edge'] },
  ]);
  assert.deepEqual(coverage.coveredEdgeIds, ['edge-match']);

  const emptyManifest: DynamicFlowManifestV2 = {
    ...manifest,
    nodes: [],
    edges: [],
  };
  assert.deepEqual(createEmptyScenarioRunSummary(emptyManifest).edgeCoverage, {
    coveredEdgeIds: [],
    uncoveredEdgeIds: [],
    coverage: 1,
  });
});
