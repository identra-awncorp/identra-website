/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildPreviewJourney,
  interfaceBlockReducer,
  reconcileInterfaceStudioManifest,
  resolveLocalizedContent,
  validateIntegrationSettings,
  validateInterfaceAccessibility,
  validateInterfaceStudioManifest,
  type InterfaceBlockReducerState,
} from '../src/components/dashboard/interfaceStudioEngine.ts';
import {
  createModuleScreenV2,
  reconcileInterfaceManifestV2,
} from '../src/components/dashboard/dashboardV2Model.ts';
import {
  DEFAULT_INTEGRATION_SETTINGS,
  DEFAULT_SEMANTIC_THEME,
  DYNAMIC_FLOW_SCHEMA_VERSION,
  INTERFACE_MANIFEST_SCHEMA_VERSION,
  type ConditionDefinition,
  type DynamicFlowNodeV2,
  type FlowProjectV2,
  type IntegrationSettings,
  type InterfaceBlock,
  type InterfaceManifestV2,
  type InterfaceScreenV2,
  type InterfaceScreenVariant,
  type InterfaceVariantState,
  type ModulePackage,
  type ScenarioExecutionResult,
  type SubflowPackage,
} from '../src/components/dashboard/dashboardV2Types.ts';

const nativeCondition: ConditionDefinition = {
  root: {
    id: 'condition-root',
    kind: 'group',
    combinator: 'and',
    conditions: [],
  },
  migrationState: 'native',
};

const startNode: DynamicFlowNodeV2 = {
  id: 'start',
  kind: 'start',
  position: { x: 0, y: 0 },
};

const verificationNode = (
  id = 'identity',
): Extract<DynamicFlowNodeV2, { readonly kind: 'verification' }> => ({
  id,
  kind: 'verification',
  name: 'Identity',
  position: { x: 200, y: 0 },
  moduleRef: { packageId: 'citizen-id', version: '1' },
  bindings: [],
  retryPolicy: { maxAttempts: 1 },
  selectedDatabaseSourceIds: [],
});

const customModulePackage = (
  id: string,
  states: readonly InterfaceVariantState[],
  outcomes: readonly (`custom:${string}` | 'success' | 'failure')[] = [
    'success',
    'failure',
  ],
): ModulePackage => ({
  id,
  name: 'Synthetic module',
  origin: 'custom',
  activeVersion: '1.0.0',
  versions: [{
    version: '1.0.0',
    status: 'active',
    createdAt: '2026-01-01T00:00:00.000Z',
    contract: {
      ref: { packageId: id, version: '1.0.0' },
      origin: 'custom',
      category: 'custom',
      inputFields: [],
      outputFields: [],
      outcomes: outcomes.map((outcome) => ({ id: outcome, terminal: false })),
      uiCapabilities: {
        supportedStates: states,
        supportsConsent: states.includes('permission'),
        supportsCredentialRequest: states.includes('input'),
        supportsFieldSummary: true,
        supportsDevicePermission: states.includes('permission'),
        supportsCapture: states.includes('capture'),
      },
      evidenceGroup: 'other',
      estimatedDurationMs: 1_000,
    },
  }],
});

const terminalNode = (
  outcome: 'success' | 'failure',
): Extract<DynamicFlowNodeV2, { readonly kind: 'terminal' }> => ({
  id: `terminal-${outcome}`,
  kind: 'terminal',
  terminalOutcome: outcome,
  position: { x: 600, y: outcome === 'success' ? -100 : 100 },
});

const localizedHeading = (
  id: string,
  level: 1 | 2 | 3 = 1,
): Extract<InterfaceBlock, { readonly kind: 'heading' }> => ({
  id,
  kind: 'heading',
  level,
  content: { en: 'Synthetic title', vi: 'Tiêu đề mô phỏng' },
  hidden: false,
  required: true,
});

const localizedActions = (
  id: string,
): Extract<InterfaceBlock, { readonly kind: 'actionGroup' }> => ({
  id,
  kind: 'actionGroup',
  hidden: false,
  required: true,
  actions: [{
    id: `${id}:continue`,
    intent: 'continue',
    label: { en: 'Continue', vi: 'Tiếp tục' },
  }],
});

const variant = (
  id: string,
  state: InterfaceVariantState,
  blocks: readonly InterfaceBlock[] = [
    localizedHeading(`${id}:heading`),
    localizedActions(`${id}:actions`),
  ],
): InterfaceScreenVariant => ({
  id,
  state,
  outcomes: state === 'success'
    ? ['success']
    : state === 'error'
      ? ['failure']
      : [],
  blocks,
});

const staticScreen = (
  id: string,
  kind: InterfaceScreenV2['kind'],
  state: InterfaceVariantState,
): InterfaceScreenV2 => ({
  id,
  kind,
  variants: [variant(`${id}:variant`, state)],
});

const createManifest = (
  moduleScreens: readonly InterfaceScreenV2[] = [],
): InterfaceManifestV2 => ({
  schemaVersion: INTERFACE_MANIFEST_SCHEMA_VERSION,
  defaultLocale: 'en',
  enabledLocales: ['en', 'vi'],
  contentLocaleReviewRequired: false,
  layout: 'card',
  theme: {
    ...structuredClone(DEFAULT_SEMANTIC_THEME),
    motion: 'reduced',
  },
  screens: [
    staticScreen('welcome', 'welcome', 'intro'),
    staticScreen('consent', 'consent', 'permission'),
    ...moduleScreens,
    staticScreen('processing', 'processing', 'processing'),
    staticScreen('success', 'success', 'success'),
    staticScreen('error', 'error', 'error'),
  ],
  orphanedScreens: [],
});

const createProject = (
  nodes: readonly DynamicFlowNodeV2[],
  interfaceManifest = createManifest(),
): FlowProjectV2 => ({
  id: 'project',
  name: 'Synthetic flow',
  description: '',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
  flow: {
    schemaVersion: DYNAMIC_FLOW_SCHEMA_VERSION,
    inputSchema: { fields: [] },
    nodes,
    edges: [],
  },
  interface: interfaceManifest,
  scenarios: [],
  integration: structuredClone(DEFAULT_INTEGRATION_SETTINGS),
});

test('reconciles variants without replacing customized block identities', () => {
  const customizedIntro = variant(
    'identity:intro',
    'intro',
    [
      {
        ...localizedHeading('custom-heading'),
        content: { en: 'Customer-owned content' },
      },
      localizedActions('custom-actions'),
    ],
  );
  const moduleScreen: InterfaceScreenV2 = {
    id: 'custom-module-screen',
    kind: 'module',
    sourceNodeId: 'identity',
    variants: [customizedIntro],
  };
  const project = createProject(
    [startNode, verificationNode(), terminalNode('success')],
    createManifest([moduleScreen]),
  );

  const reconciled = reconcileInterfaceStudioManifest(
    project.interface,
    project,
  );
  const screen = reconciled.screens.find(
    (candidate) => candidate.sourceNodeId === 'identity',
  );

  assert.equal(screen?.id, 'custom-module-screen');
  assert.equal(screen?.variants.find((item) => item.state === 'intro')?.id, 'identity:intro');
  assert.equal(
    screen?.variants.find((item) => item.state === 'intro')?.blocks[0]?.id,
    'custom-heading',
  );
  assert.deepEqual(
    screen?.variants.map((item) => item.state),
    ['intro', 'input', 'processing', 'success', 'error', 'retry'],
  );
});

test('moves removed-node screens to orphans and restores the same screen and block IDs', () => {
  const moduleScreen: InterfaceScreenV2 = {
    id: 'screen-to-restore',
    kind: 'module',
    sourceNodeId: 'identity',
    variants: [variant('intro-to-restore', 'intro', [
      localizedHeading('heading-to-restore'),
      localizedActions('actions-to-restore'),
    ])],
  };
  const initial = createProject(
    [startNode, verificationNode(), terminalNode('success')],
    createManifest([moduleScreen]),
  );
  const withoutNode = createProject(
    [startNode, terminalNode('success')],
    initial.interface,
  );
  const removed = reconcileInterfaceStudioManifest(
    initial.interface,
    withoutNode,
  );

  assert.equal(
    removed.screens.some((screen) => screen.id === 'screen-to-restore'),
    false,
  );
  assert.equal(removed.orphanedScreens[0]?.id, 'screen-to-restore');

  const restored = reconcileInterfaceStudioManifest(
    removed,
    initial,
  );
  const restoredScreen = restored.screens.find(
    (screen) => screen.sourceNodeId === 'identity',
  );
  assert.equal(restoredScreen?.id, 'screen-to-restore');
  assert.equal(restoredScreen?.variants[0]?.id, 'intro-to-restore');
  assert.equal(restoredScreen?.variants[0]?.blocks[0]?.id, 'heading-to-restore');
  assert.equal(restored.orphanedScreens.length, 0);
});

test('creates stable screen, variant, and block IDs for a new node', () => {
  const project = createProject([startNode, verificationNode(), terminalNode('success')]);
  const first = reconcileInterfaceStudioManifest(project.interface, project);
  const second = reconcileInterfaceStudioManifest(first, project);
  const firstScreen = first.screens.find((screen) => screen.sourceNodeId === 'identity');
  const secondScreen = second.screens.find((screen) => screen.sourceNodeId === 'identity');

  assert.equal(firstScreen?.id, 'module-screen:identity');
  assert.deepEqual(secondScreen, firstScreen);
});

test('generates only capability states and binds canonical failure outcomes', () => {
  const customNode: Extract<
    DynamicFlowNodeV2,
    { readonly kind: 'verification' }
  > = {
    ...verificationNode('capture-only'),
    moduleRef: { packageId: 'capture-module', version: '1.0.0' },
  };
  const catalog = [
    customModulePackage(
      'capture-module',
      ['capture', 'processing', 'success', 'error', 'capture'],
    ),
  ];
  const project = createProject([startNode, customNode, terminalNode('success')]);
  const reconciled = reconcileInterfaceStudioManifest(
    project.interface,
    project,
    catalog,
  );
  const screen = reconciled.screens.find(
    (candidate) => candidate.sourceNodeId === customNode.id,
  );

  assert.deepEqual(
    screen?.variants.map((item) => item.state),
    ['capture', 'processing', 'success', 'error'],
  );
  assert.deepEqual(
    screen?.variants.find((item) => item.state === 'error')?.outcomes,
    ['failure'],
  );

  const modelScreen = createModuleScreenV2(verificationNode(), 'en');
  assert.deepEqual(
    modelScreen.variants.find((item) => item.state === 'success')?.outcomes,
    ['success'],
  );
  assert.deepEqual(
    modelScreen.variants.find((item) => item.state === 'error')?.outcomes,
    ['failure'],
  );
});

test('model reconciliation never activates an orphan beside an active screen for the same node', () => {
  const active: InterfaceScreenV2 = {
    id: 'active-screen',
    kind: 'module',
    sourceNodeId: 'identity',
    variants: [variant('active-intro', 'intro')],
  };
  const orphan: InterfaceScreenV2 = {
    id: 'orphan-screen',
    kind: 'module',
    sourceNodeId: 'identity',
    variants: [variant('orphan-intro', 'intro')],
  };
  const manifest = {
    ...createManifest([active]),
    orphanedScreens: [orphan],
  };
  const project = createProject(
    [startNode, verificationNode(), terminalNode('success')],
    manifest,
  );

  const reconciled = reconcileInterfaceManifestV2(
    manifest,
    project.flow,
  );
  assert.deepEqual(
    reconciled.screens
      .filter((screen) => screen.sourceNodeId === 'identity')
      .map((screen) => screen.id),
    ['active-screen'],
  );
  assert.equal(
    reconciled.orphanedScreens.some((screen) => screen.id === 'orphan-screen'),
    true,
  );
});

test('screen identity keeps same-ID screens for different source nodes distinct', () => {
  const first: InterfaceScreenV2 = {
    id: 'shared-id',
    kind: 'module',
    sourceNodeId: 'identity-a',
    variants: [variant('identity-a-intro', 'intro')],
  };
  const second: InterfaceScreenV2 = {
    id: 'shared-id',
    kind: 'module',
    sourceNodeId: 'identity-b',
    variants: [variant('identity-b-intro', 'intro')],
  };
  const project = createProject(
    [
      startNode,
      verificationNode('identity-a'),
      verificationNode('identity-b'),
      terminalNode('success'),
    ],
    createManifest([first, second]),
  );
  const reconciled = reconcileInterfaceStudioManifest(
    project.interface,
    project,
  );

  assert.deepEqual(
    reconciled.screens
      .filter((screen) => screen.kind === 'module')
      .map((screen) => screen.sourceNodeId),
    ['identity-a', 'identity-b'],
  );
});

test('builds a simulator-driven journey while omitting start and condition nodes', () => {
  const conditionNode: DynamicFlowNodeV2 = {
    id: 'decision',
    kind: 'condition',
    position: { x: 100, y: 0 },
    condition: nativeCondition,
  };
  const project = createProject([
    startNode,
    conditionNode,
    verificationNode(),
    terminalNode('success'),
  ]);
  const simulation: ScenarioExecutionResult = {
    scenarioId: 'scenario-success',
    completed: true,
    terminalNodeId: 'terminal-success',
    terminalOutcome: 'success',
    steps: [
      { nodeId: 'start', outcome: 'next' },
      { nodeId: 'decision', outcome: 'true' },
      { nodeId: 'identity', outcome: 'success' },
      { nodeId: 'terminal-success' },
    ],
    traversedEdgeIds: [],
    assertionResults: [],
  };

  const journey = buildPreviewJourney(project, simulation, [], []);

  assert.deepEqual(
    journey.steps.map((step) => [step.kind, step.nodeId, step.state]),
    [
      ['static', undefined, 'intro'],
      ['static', undefined, 'permission'],
      ['module', 'identity', 'intro'],
      ['module', 'identity', 'input'],
      ['module', 'identity', 'processing'],
      ['module', 'identity', 'success'],
      ['terminal', 'terminal-success', 'success'],
    ],
  );
  assert.equal(
    journey.steps.some((step) => step.nodeId === 'decision'),
    false,
  );
  assert.deepEqual(journey.issues, []);
});

test('reports stale trace nodes and missing subflow packages without executing them', () => {
  const subflowNode: DynamicFlowNodeV2 = {
    id: 'subflow-node',
    kind: 'subflow',
    position: { x: 200, y: 0 },
    subflowRef: { packageId: 'missing-subflow', version: '1.0.0' },
    bindings: [],
  };
  const project = createProject([
    startNode,
    subflowNode,
    terminalNode('failure'),
  ]);
  const simulation: ScenarioExecutionResult = {
    scenarioId: 'scenario-subflow',
    completed: false,
    steps: [
      { nodeId: 'removed-node', outcome: 'success' },
      { nodeId: 'subflow-node', outcome: 'failure' },
    ],
    traversedEdgeIds: [],
    assertionResults: [],
  };

  const journey = buildPreviewJourney(project, simulation, [], []);
  assert.deepEqual(
    journey.issues.map((issue) => issue.code),
    ['staleTraceNode', 'missingSubflow'],
  );
  assert.deepEqual(
    journey.steps
      .filter((step) => step.nodeId === 'subflow-node')
      .map((step) => step.state),
    ['intro', 'processing', 'error'],
  );
});

test('journey selects an explicit variant for a declared custom outcome', () => {
  const customNode: Extract<
    DynamicFlowNodeV2,
    { readonly kind: 'verification' }
  > = {
    ...verificationNode('custom-check'),
    moduleRef: { packageId: 'custom-check-package', version: '1.0.0' },
  };
  const moduleScreen: InterfaceScreenV2 = {
    id: 'custom-check-screen',
    kind: 'module',
    sourceNodeId: customNode.id,
    variants: [
      variant('custom-check-intro', 'intro'),
      variant('custom-check-processing', 'processing'),
      {
        ...variant('custom-check-approved', 'success'),
        outcomes: ['custom:approved'],
      },
    ],
  };
  const project = createProject(
    [startNode, customNode, terminalNode('success')],
    createManifest([moduleScreen]),
  );
  const simulation: ScenarioExecutionResult = {
    scenarioId: 'custom-outcome',
    completed: false,
    steps: [{ nodeId: customNode.id, outcome: 'custom:approved' }],
    traversedEdgeIds: [],
    assertionResults: [],
  };
  const journey = buildPreviewJourney(
    project,
    simulation,
    [customModulePackage(
      'custom-check-package',
      ['intro', 'processing', 'success'],
      ['custom:approved'],
    )],
  );

  assert.deepEqual(
    journey.steps
      .filter((step) => step.nodeId === customNode.id)
      .map((step) => [step.state, step.outcome]),
    [
      ['intro', undefined],
      ['processing', undefined],
      ['success', 'custom:approved'],
    ],
  );
  assert.deepEqual(journey.issues, []);
});

test('journey reports unsupported outcomes and inconsistent terminal traces', () => {
  const project = createProject([
    startNode,
    verificationNode(),
    terminalNode('success'),
    terminalNode('failure'),
  ]);
  const unsupported: ScenarioExecutionResult = {
    scenarioId: 'unsupported-outcome',
    completed: false,
    steps: [{ nodeId: 'identity', outcome: 'matched' }],
    traversedEdgeIds: [],
    assertionResults: [],
  };
  const missingTerminal: ScenarioExecutionResult = {
    scenarioId: 'missing-terminal',
    completed: true,
    terminalNodeId: 'terminal-success',
    terminalOutcome: 'success',
    steps: [{ nodeId: 'start', outcome: 'next' }],
    traversedEdgeIds: [],
    assertionResults: [],
  };
  const mismatchedTerminal: ScenarioExecutionResult = {
    scenarioId: 'mismatched-terminal',
    completed: true,
    terminalNodeId: 'terminal-failure',
    terminalOutcome: 'failure',
    steps: [{ nodeId: 'terminal-success' }],
    traversedEdgeIds: [],
    assertionResults: [],
  };

  assert.equal(
    buildPreviewJourney(project, unsupported).issues.some(
      (issue) => issue.code === 'unsupportedExecutionOutcome',
    ),
    true,
  );
  assert.equal(
    buildPreviewJourney(project, missingTerminal).issues.some(
      (issue) => issue.code === 'missingTerminalStep',
    ),
    true,
  );
  assert.equal(
    buildPreviewJourney(project, mismatchedTerminal).issues.some(
      (issue) => issue.code === 'terminalResultMismatch',
    ),
    true,
  );
});

test('journey does not silently substitute an unrelated terminal variant', () => {
  const manifest = {
    ...createManifest(),
    screens: createManifest().screens.map((screen) => screen.kind === 'success'
      ? {
          ...screen,
          variants: [variant('wrong-terminal-state', 'error')],
        }
      : screen),
  };
  const project = createProject(
    [startNode, terminalNode('success')],
    manifest,
  );
  const simulation: ScenarioExecutionResult = {
    scenarioId: 'strict-terminal-variant',
    completed: true,
    terminalNodeId: 'terminal-success',
    terminalOutcome: 'success',
    steps: [{ nodeId: 'terminal-success' }],
    traversedEdgeIds: [],
    assertionResults: [],
  };
  const journey = buildPreviewJourney(project, simulation);

  assert.equal(
    journey.issues.some((issue) => issue.code === 'missingVariant'),
    true,
  );
  assert.equal(
    journey.steps.some((step) => step.nodeId === 'terminal-success'),
    false,
  );
});

test('block reducer adds, duplicates, hides, moves, and deletes safely', () => {
  const requiredHeading = localizedHeading('heading');
  const optionalText: InterfaceBlock = {
    id: 'text',
    kind: 'text',
    content: { en: 'Optional' },
    hidden: false,
    required: false,
  };
  const requiredActions = localizedActions('actions');
  let state: InterfaceBlockReducerState = {
    blocks: [requiredHeading, optionalText, requiredActions],
  };

  state = interfaceBlockReducer(state, {
    type: 'delete',
    blockId: 'heading',
  });
  assert.equal(state.lastRejection, 'requiredBlock');
  assert.equal(state.blocks.length, 3);

  state = interfaceBlockReducer(state, {
    type: 'hide',
    blockId: 'heading',
    hidden: true,
  });
  assert.equal(state.lastRejection, 'requiredBlock');

  state = interfaceBlockReducer(state, {
    type: 'add',
    atIndex: 1,
    block: {
      id: 'status',
      kind: 'status',
      tone: 'info',
      content: { en: 'Ready' },
      hidden: false,
      required: false,
    },
  });
  assert.deepEqual(state.blocks.map((block) => block.id), [
    'heading',
    'status',
    'text',
    'actions',
  ]);

  state = interfaceBlockReducer(state, {
    type: 'duplicate',
    blockId: 'actions',
    newBlockId: 'actions-copy',
  });
  const copy = state.blocks.find((block) => block.id === 'actions-copy');
  assert.equal(copy?.required, false);
  assert.equal(copy?.kind === 'actionGroup' && copy.actions[0]?.id, 'actions-copy:action:1');

  state = interfaceBlockReducer(state, {
    type: 'move',
    blockId: 'actions-copy',
    toIndex: 0,
  });
  assert.equal(state.blocks[0]?.id, 'actions-copy');

  state = interfaceBlockReducer(state, {
    type: 'hide',
    blockId: 'text',
    hidden: true,
  });
  assert.equal(state.blocks.find((block) => block.id === 'text')?.hidden, true);

  state = interfaceBlockReducer(state, {
    type: 'delete',
    blockId: 'actions-copy',
  });
  assert.equal(state.blocks.some((block) => block.id === 'actions-copy'), false);
  assert.equal(state.lastRejection, undefined);
});

test('block reducer rejects duplicate additions and preserves the source object', () => {
  const source = localizedHeading('heading');
  const state = interfaceBlockReducer(
    { blocks: [source] },
    { type: 'add', block: source },
  );

  assert.equal(state.lastRejection, 'duplicateBlockId');
  assert.equal(state.blocks[0], source);
});

test('localized content resolution exposes explicit default-locale fallback metadata', () => {
  assert.deepEqual(
    resolveLocalizedContent({ en: 'Default', vi: 'Yêu cầu' }, 'vi', 'en'),
    {
      value: 'Yêu cầu',
      requestedLocale: 'vi',
      resolvedLocale: 'vi',
      missing: false,
      fallbackUsed: false,
      badge: null,
    },
  );
  assert.deepEqual(
    resolveLocalizedContent({ en: 'Default' }, 'ja', 'en'),
    {
      value: 'Default',
      requestedLocale: 'ja',
      resolvedLocale: 'en',
      missing: false,
      fallbackUsed: true,
      badge: { kind: 'fallback', sourceLocale: 'en' },
    },
  );
  assert.deepEqual(
    resolveLocalizedContent({ vi: 'Chỉ tiếng Việt' }, 'ja', 'en'),
    {
      value: '',
      requestedLocale: 'ja',
      missing: true,
      fallbackUsed: false,
      badge: null,
    },
  );
  assert.deepEqual(
    resolveLocalizedContent({ ja: '   ', vi: 'Không fallback ngầm' }, 'ja', 'en'),
    {
      value: '',
      requestedLocale: 'ja',
      missing: true,
      fallbackUsed: false,
      badge: null,
    },
  );
});

test('validates a complete structured interface without blocking export', () => {
  const report = validateInterfaceStudioManifest(createManifest());

  assert.equal(report.blocksExport, false);
  assert.deepEqual(
    report.issues.filter((issue) => issue.severity === 'error'),
    [],
  );
});

test('validates structured visibility rules and rejects empty or unsafe AST shapes', () => {
  const validVisibilityBlock: InterfaceBlock = {
    id: 'conditional-copy',
    kind: 'text',
    content: { en: 'Visible for the synthetic scenario' },
    hidden: false,
    required: false,
    visibility: {
      condition: {
        id: 'visibility-root',
        kind: 'group',
        combinator: 'and',
        conditions: [{
          id: 'visibility-rule',
          kind: 'rule',
          left: { kind: 'flowInput', fieldId: 'syntheticStatus' },
          operator: 'equals',
          right: {
            kind: 'literal',
            valueType: 'string',
            value: 'ready',
          },
        }],
      },
    },
  };
  const validManifest = createManifest();
  const validWithVisibility: InterfaceManifestV2 = {
    ...validManifest,
    screens: validManifest.screens.map((screen, screenIndex) => screenIndex === 0
      ? {
          ...screen,
          variants: screen.variants.map((item, variantIndex) => variantIndex === 0
            ? { ...item, blocks: [...item.blocks, validVisibilityBlock] }
            : item),
        }
      : screen),
  };
  assert.equal(
    validateInterfaceStudioManifest(validWithVisibility).issues.some(
      (issue) => (
        issue.code === 'invalidVisibilityCondition'
        || issue.code === 'emptyVisibilityCondition'
      ),
    ),
    false,
  );

  const requiredConditional: InterfaceBlock = {
    ...localizedHeading('conditional-heading'),
    visibility: {
      condition: {
        id: 'empty-visibility',
        kind: 'group',
        combinator: 'and',
        conditions: [],
      },
    },
  };
  const unsafeRule = {
    ...validVisibilityBlock,
    id: 'unsafe-condition',
    visibility: {
      condition: {
        id: 'unsafe-root',
        kind: 'group',
        combinator: 'and',
        conditions: [{
          id: 'unsafe-rule',
          kind: 'rule',
          left: { kind: 'literal', valueType: 'number', value: 1 },
          operator: 'evaluateJavaScript',
          right: { kind: 'literal', valueType: 'number', value: 1 },
        }],
      },
    },
  } as unknown as InterfaceBlock;
  const invalidManifest: InterfaceManifestV2 = {
    ...validManifest,
    enabledLocales: ['en', 'en'],
    theme: {
      ...validManifest.theme,
      safeAreas: {
        ...validManifest.theme.safeAreas,
        mobile: {
          ...validManifest.theme.safeAreas.mobile,
          bottom: -1,
        },
      },
    },
    screens: [{
      id: 'visibility-screen',
      kind: 'welcome',
      variants: [{
        id: 'visibility-variant',
        state: 'intro',
        outcomes: [],
        blocks: [requiredConditional, unsafeRule],
      }],
    }],
  };
  const report = validateInterfaceStudioManifest(invalidManifest);
  const codes = new Set(report.issues.map((issue) => issue.code));

  assert.equal(report.blocksExport, true);
  assert.equal(codes.has('duplicateEnabledLocale'), true);
  assert.equal(codes.has('invalidSafeArea'), true);
  assert.equal(codes.has('requiredBlockConditional'), true);
  assert.equal(codes.has('emptyVisibilityCondition'), true);
  assert.equal(codes.has('invalidVisibilityCondition'), true);
});

test('color-only accessibility checks cover every enabled preview locale', () => {
  const base = createManifest();
  const statusOnlyInDefaultLocale: InterfaceBlock = {
    id: 'localized-status',
    kind: 'status',
    tone: 'error',
    content: { en: 'Verification failed' },
    hidden: false,
    required: false,
  };
  const manifest: InterfaceManifestV2 = {
    ...base,
    screens: [{
      id: 'localized-status-screen',
      kind: 'error',
      variants: [{
        id: 'localized-status-variant',
        state: 'error',
        outcomes: ['failure'],
        blocks: [
          localizedHeading('localized-status-heading'),
          statusOnlyInDefaultLocale,
          localizedActions('localized-status-actions'),
        ],
      }],
    }],
  };
  const report = validateInterfaceAccessibility(manifest);

  assert.equal(
    report.issues.some((issue) => issue.code === 'colorOnlyState'),
    true,
  );
  assert.equal(report.blocksExport, true);
});

test('detects required translations, contrast, heading, alt, labels, touch size, and motion', () => {
  const invalidBlocks: readonly InterfaceBlock[] = [
    {
      ...localizedHeading('heading-level-two', 2),
      content: { en: 'English only' },
      hidden: true,
    },
    localizedHeading('heading-level-three', 3),
    {
      id: 'illustration',
      kind: 'illustration',
      source: 'asset',
      value: 'synthetic-asset',
      alt: { en: 'Synthetic image' },
      hidden: false,
      required: false,
    },
    {
      id: 'status',
      kind: 'status',
      tone: 'error',
      content: {},
      hidden: false,
      required: false,
    },
    {
      id: 'actions',
      kind: 'actionGroup',
      hidden: false,
      required: true,
      actions: [{
        id: 'continue',
        intent: 'continue',
        label: {},
      }],
    },
  ];
  const invalidManifest: InterfaceManifestV2 = {
    ...createManifest(),
    theme: {
      ...structuredClone(DEFAULT_SEMANTIC_THEME),
      light: {
        ...DEFAULT_SEMANTIC_THEME.light,
        primary: '#FFFFFF',
        onPrimary: '#FFFFFF',
        focus: '#FFFFFF',
      },
      controls: {
        ...DEFAULT_SEMANTIC_THEME.controls,
        height: 40,
      },
      motion: 'standard',
    },
    screens: [{
      id: 'invalid-screen',
      kind: 'module',
      sourceNodeId: 'identity',
      variants: [variant('invalid-variant', 'error', invalidBlocks)],
    }],
  };

  const report = validateInterfaceStudioManifest(invalidManifest);
  const codes = new Set(report.issues.map((issue) => issue.code));

  assert.equal(report.blocksExport, true);
  assert.equal(codes.has('missingRequiredTranslation'), true);
  assert.equal(codes.has('requiredBlockHidden'), true);
  assert.equal(codes.has('contrast'), true);
  assert.equal(codes.has('missingFocusMetadata'), true);
  assert.equal(codes.has('headingOrder'), true);
  assert.equal(codes.has('missingAlt'), true);
  assert.equal(codes.has('missingLabel'), true);
  assert.equal(codes.has('touchTarget'), true);
  assert.equal(codes.has('colorOnlyState'), true);
  assert.equal(codes.has('reducedMotion'), true);
  assert.equal(
    report.accessibility.issues.find(
      (issue) => issue.code === 'reducedMotion',
    )?.severity,
    'warning',
  );
});

test('accessibility warnings alone do not block export', () => {
  const manifest = {
    ...createManifest(),
    theme: {
      ...createManifest().theme,
      motion: 'standard' as const,
    },
  };
  const report = validateInterfaceAccessibility(manifest);

  assert.equal(report.issues.some((issue) => issue.code === 'reducedMotion'), true);
  assert.equal(report.blocksExport, false);
});

test('accepts secure integration URLs, localhost development, and metadata-only output', () => {
  const project = createProject([
    startNode,
    verificationNode(),
    terminalNode('success'),
  ]);
  const settings: IntegrationSettings = {
    mode: 'embed',
    allowedOrigins: [
      'https://app.example.com',
      'http://localhost:3000',
    ],
    redirectUrls: [
      'https://app.example.com/complete?synthetic=true',
      'http://127.0.0.1:3000/done',
    ],
    sessionTimeoutMinutes: 45,
    resumePolicy: 'sameDevice',
    enabledEvents: ['started', 'stepCompleted', 'finished'],
    resultFieldIds: ['verified'],
    includePii: false,
  };

  assert.deepEqual(
    validateIntegrationSettings(settings, project),
    [],
  );
});

test('rejects wildcard, insecure, malformed, PII, unknown, and duplicate integration values', () => {
  const project = createProject([
    startNode,
    verificationNode(),
    terminalNode('success'),
  ]);
  const invalid = {
    mode: 'redirect',
    allowedOrigins: [
      'https://*.example.com',
      'http://external.example.com',
      'https://app.example.com/path',
      'https://app.example.com/path',
    ],
    redirectUrls: [],
    sessionTimeoutMinutes: 0,
    resumePolicy: 'crossDevice',
    enabledEvents: ['started', 'started'],
    resultFieldIds: ['fullName', 'missing', 'fullName'],
    includePii: true,
  } as unknown as IntegrationSettings;

  const issues = validateIntegrationSettings(invalid, project);
  const codes = new Set(issues.map((issue) => issue.code));

  assert.equal(codes.has('wildcardUrl'), true);
  assert.equal(codes.has('insecureUrl'), true);
  assert.equal(codes.has('invalidAllowedOrigin'), true);
  assert.equal(codes.has('duplicateAllowedOrigin'), true);
  assert.equal(codes.has('missingRedirectUrl'), true);
  assert.equal(codes.has('invalidSessionTimeout'), true);
  assert.equal(codes.has('duplicateEvent'), true);
  assert.equal(codes.has('duplicateResultField'), true);
  assert.equal(codes.has('unsafeResultField'), true);
  assert.equal(codes.has('unknownResultField'), true);
  assert.equal(codes.has('includePiiNotAllowed'), true);
});

test('resolves safe result metadata from a pinned subflow contract', () => {
  const subflowNode: DynamicFlowNodeV2 = {
    id: 'subflow-node',
    kind: 'subflow',
    position: { x: 200, y: 0 },
    subflowRef: { packageId: 'subflow-package', version: '1.0.0' },
    bindings: [],
  };
  const project = createProject([startNode, subflowNode, terminalNode('success')]);
  const catalog: readonly SubflowPackage[] = [{
    id: 'subflow-package',
    name: 'Synthetic subflow',
    activeVersion: '1.0.0',
    versions: [{
      version: '1.0.0',
      status: 'active',
      createdAt: '2026-01-01T00:00:00.000Z',
      contract: {
        inputFields: [],
        outputFields: [{
          id: 'riskBand',
          key: 'riskBand',
          type: 'string',
          format: 'none',
          required: true,
          classification: 'internalMetadata',
          safeForResult: true,
        }],
        successExitNodeId: 'success',
        failureExitNodeId: 'failure',
      },
      flow: {
        schemaVersion: DYNAMIC_FLOW_SCHEMA_VERSION,
        inputSchema: { fields: [] },
        nodes: [],
        edges: [],
      },
    }],
  }];
  const settings: IntegrationSettings = {
    ...DEFAULT_INTEGRATION_SETTINGS,
    resultFieldIds: ['riskBand'],
  };

  assert.deepEqual(
    validateIntegrationSettings(settings, project, [], catalog),
    [],
  );
});
