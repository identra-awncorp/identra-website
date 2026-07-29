/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Locale } from '../../types/routes';
import {
  BUILT_IN_MODULES,
  getBuiltInModuleContract,
  isBuiltInModuleId,
  moduleRequiresUserInteraction,
} from './dashboardModuleRegistry';
import { reconcileInterfaceStudioManifest } from './interfaceStudioEngine';
import {
  DASHBOARD_WORKSPACE_SCHEMA_VERSION,
  DEFAULT_ANALYSIS_THRESHOLDS,
  DEFAULT_DATABASE_STRATEGY,
  DEFAULT_INTEGRATION_SETTINGS,
  DEFAULT_SEMANTIC_THEME,
  DYNAMIC_FLOW_SCHEMA_VERSION,
  INTERFACE_MANIFEST_SCHEMA_VERSION,
  MAX_DRAFT_REVISIONS_PER_PROJECT,
  type ConditionDefinition,
  type ConditionGroup,
  type DashboardEnvironment,
  type DashboardWorkspaceV2,
  type DependencyLock,
  type DraftRevision,
  type DraftRevisionReason,
  type DynamicFlowManifestV2,
  type DynamicFlowNodeV2,
  type FlowField,
  type FlowProjectContentV2,
  type FlowProjectV2,
  type FlowRelease,
  type InputBinding,
  type InterfaceBlock,
  type InterfaceManifestV2,
  type InterfaceScreenKind,
  type InterfaceScreenV2,
  type InterfaceScreenVariant,
  type InterfaceVariantState,
  type ModuleContract,
  type ModulePackage,
  type ModuleRef,
  type OutcomeId,
  type ProjectSnapshotV2,
  type SubflowPackage,
} from './dashboardV2Types';

export const createDashboardId = (prefix: string): string => {
  const suffix = typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${prefix}-${suffix}`;
};

export const createEmptyConditionGroup = (): ConditionGroup => ({
  id: createDashboardId('condition-group'),
  kind: 'group',
  combinator: 'and',
  conditions: [],
});

export const createNativeCondition = (): ConditionDefinition => ({
  root: createEmptyConditionGroup(),
  migrationState: 'native',
});

export const createDefaultBlocks = (
  locale: Locale,
  title?: string,
  body?: string,
  action?: string,
): readonly InterfaceBlock[] => [
  {
    id: createDashboardId('block-heading'),
    kind: 'heading',
    level: 1,
    content: title ? { [locale]: title } : {},
    hidden: false,
    required: true,
  },
  {
    id: createDashboardId('block-text'),
    kind: 'text',
    content: body ? { [locale]: body } : {},
    hidden: false,
    required: false,
  },
  {
    id: createDashboardId('block-actions'),
    kind: 'actionGroup',
    hidden: false,
    required: true,
    actions: [
      {
        id: createDashboardId('action-continue'),
        intent: 'continue',
        label: action ? { [locale]: action } : {},
      },
    ],
  },
];

export const createInterfaceVariant = (
  state: InterfaceVariantState,
  locale: Locale,
  outcomes: readonly OutcomeId[] = [],
  content?: {
    readonly title?: string;
    readonly body?: string;
    readonly action?: string;
  },
): InterfaceScreenVariant => ({
  id: createDashboardId(`variant-${state}`),
  state,
  outcomes,
  blocks: createDefaultBlocks(locale, content?.title, content?.body, content?.action),
});

const createStaticScreen = (
  id: string,
  kind: InterfaceScreenKind,
  state: InterfaceVariantState,
  locale: Locale,
  outcomes: readonly OutcomeId[] = [],
  content?: {
    readonly title?: string;
    readonly body?: string;
    readonly action?: string;
  },
): InterfaceScreenV2 => ({
  id,
  kind,
  variants: [createInterfaceVariant(state, locale, outcomes, content)],
});

export type DefaultInterfaceCopy = Readonly<Partial<Record<
  InterfaceScreenKind,
  {
    readonly title: string;
    readonly body: string;
    readonly action: string;
  }
>>>;

export const createDefaultInterfaceV2 = (
  locale: Locale,
  defaults: DefaultInterfaceCopy = {},
): InterfaceManifestV2 => ({
  schemaVersion: INTERFACE_MANIFEST_SCHEMA_VERSION,
  defaultLocale: locale,
  enabledLocales: [locale],
  contentLocaleReviewRequired: false,
  layout: 'card',
  responsiveOverrides: {},
  theme: structuredClone(DEFAULT_SEMANTIC_THEME),
  screens: [
    createStaticScreen('welcome', 'welcome', 'intro', locale, [], defaults.welcome),
    createStaticScreen('consent', 'consent', 'permission', locale, [], defaults.consent),
    createStaticScreen(
      'processing',
      'processing',
      'processing',
      locale,
      [],
      defaults.processing,
    ),
    createStaticScreen(
      'success',
      'success',
      'success',
      locale,
      ['success'],
      defaults.success,
    ),
    createStaticScreen(
      'error',
      'error',
      'error',
      locale,
      ['failure'],
      defaults.error,
    ),
  ],
  orphanedScreens: [],
});

const defaultFlowFields = (): readonly FlowField[] => [
  {
    id: 'credential',
    key: 'credential',
    type: 'object',
    format: 'none',
    required: false,
    classification: 'credential',
    safeForResult: false,
  },
  {
    id: 'phoneNumber',
    key: 'phoneNumber',
    type: 'string',
    format: 'phone',
    required: false,
    classification: 'sensitivePii',
    safeForResult: false,
  },
  {
    id: 'fullName',
    key: 'fullName',
    type: 'string',
    format: 'none',
    required: false,
    classification: 'pii',
    safeForResult: false,
  },
  {
    id: 'identityNumber',
    key: 'identityNumber',
    type: 'string',
    format: 'none',
    required: false,
    classification: 'sensitivePii',
    safeForResult: false,
  },
  {
    id: 'dateOfBirth',
    key: 'dateOfBirth',
    type: 'string',
    format: 'date',
    required: false,
    classification: 'pii',
    safeForResult: false,
  },
  {
    id: 'nationality',
    key: 'nationality',
    type: 'string',
    format: 'countryCode',
    required: false,
    classification: 'pii',
    safeForResult: false,
  },
  {
    id: 'faceReference',
    key: 'faceReference',
    type: 'string',
    format: 'none',
    required: false,
    classification: 'biometric',
    safeForResult: false,
  },
  {
    id: 'identityData',
    key: 'identityData',
    type: 'object',
    format: 'none',
    required: false,
    classification: 'sensitivePii',
    safeForResult: false,
  },
];

export const createDefaultFlowV2 = (): DynamicFlowManifestV2 => ({
  schemaVersion: DYNAMIC_FLOW_SCHEMA_VERSION,
  inputSchema: { fields: defaultFlowFields() },
  nodes: [
    {
      id: 'start',
      kind: 'start',
      position: { x: 80, y: 180 },
    },
    {
      id: 'terminal-success',
      kind: 'terminal',
      terminalOutcome: 'success',
      position: { x: 520, y: 100 },
    },
    {
      id: 'terminal-failure',
      kind: 'terminal',
      terminalOutcome: 'failure',
      position: { x: 520, y: 300 },
    },
  ],
  edges: [
    {
      id: 'edge-start-success',
      source: 'start',
      target: 'terminal-success',
      outcome: 'next',
    },
  ],
});

export const createFlowProjectV2 = (
  name: string,
  description = '',
  locale: Locale = 'en',
  now = new Date(),
  interfaceDefaults: DefaultInterfaceCopy = {},
): FlowProjectV2 => {
  const timestamp = now.toISOString();
  return {
    id: createDashboardId('flow'),
    name,
    description,
    createdAt: timestamp,
    updatedAt: timestamp,
    visualRegressionBaselines: [],
    flow: createDefaultFlowV2(),
    interface: createDefaultInterfaceV2(locale, interfaceDefaults),
    scenarios: [],
    integration: structuredClone(DEFAULT_INTEGRATION_SETTINGS),
  };
};

const createEnvironment = (
  id: string,
  stage: DashboardEnvironment['stage'],
): DashboardEnvironment => ({
  id,
  stage,
  publicConfig: {},
  secretReferenceNames: [],
});

export const createEmptyWorkspaceV2 = (now = new Date()): DashboardWorkspaceV2 => ({
  schemaVersion: DASHBOARD_WORKSPACE_SCHEMA_VERSION,
  savedAt: now.toISOString(),
  projects: [],
  moduleCatalog: [],
  subflowCatalog: [],
  draftRevisions: [],
  releases: [],
  environments: [
    createEnvironment('environment-test', 'test'),
    createEnvironment('environment-staging', 'staging'),
    createEnvironment('environment-production', 'production'),
  ],
});

export const duplicateFlowProjectV2 = (
  project: FlowProjectV2,
  name: string,
  now = new Date(),
): FlowProjectV2 => {
  const timestamp = now.toISOString();
  return {
    ...structuredClone(project),
    id: createDashboardId('flow'),
    name,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
};

export const createVerificationNodeV2 = (
  moduleRef: ModuleRef,
  position: DynamicFlowNodeV2['position'],
  name?: string,
): DynamicFlowNodeV2 => {
  const isDatabase = moduleRef.packageId === 'database-cross-check';
  return {
    id: createDashboardId('node'),
    kind: 'verification',
    moduleRef,
    ...(name ? { name } : {}),
    position,
    bindings: [],
    retryPolicy: { maxAttempts: 0 },
    selectedDatabaseSourceIds: isDatabase ? ['domestic-blacklist'] : [],
    ...(isDatabase ? { databaseStrategy: structuredClone(DEFAULT_DATABASE_STRATEGY) } : {}),
  };
};

export const createConditionNodeV2 = (
  position: DynamicFlowNodeV2['position'],
): DynamicFlowNodeV2 => ({
  id: createDashboardId('node'),
  kind: 'condition',
  position,
  condition: createNativeCondition(),
});

export const getModuleId = (node: DynamicFlowNodeV2): string | null => {
  if (node.kind === 'verification') return node.moduleRef.packageId;
  if (node.kind === 'subflow') return node.subflowRef.packageId;
  return null;
};

export const resolveModuleContract = (
  ref: ModuleRef | undefined,
  moduleCatalog: readonly ModulePackage[],
): ModuleContract | null => {
  if (!ref) return null;
  const builtIn = getBuiltInModuleContract(ref.packageId);
  if (builtIn && builtIn.ref.version === ref.version) return builtIn;
  return moduleCatalog
    .find((item) => item.id === ref.packageId)
    ?.versions.find((version) => version.version === ref.version)
    ?.contract ?? null;
};

export const outcomesForNodeV2 = (
  node: DynamicFlowNodeV2,
  moduleCatalog: readonly ModulePackage[] = [],
): readonly OutcomeId[] => {
  if (node.kind === 'start') return ['next'];
  if (node.kind === 'condition') return ['true', 'false'];
  if (node.kind === 'terminal') return [];
  if (node.kind === 'subflow') return ['success', 'failure'];
  return resolveModuleContract(node.moduleRef, moduleCatalog)?.outcomes.map((outcome) => outcome.id)
    ?? ['success', 'failure'];
};

export const wouldCreateCycleV2 = (
  manifest: DynamicFlowManifestV2,
  source: string,
  target: string,
): boolean => {
  if (source === target) return true;
  const adjacency = new Map<string, string[]>();
  for (const edge of manifest.edges) {
    adjacency.set(edge.source, [...(adjacency.get(edge.source) ?? []), edge.target]);
  }
  adjacency.set(source, [...(adjacency.get(source) ?? []), target]);
  const stack = [target];
  const visited = new Set<string>();
  while (stack.length > 0) {
    const current = stack.pop()!;
    if (current === source) return true;
    if (visited.has(current)) continue;
    visited.add(current);
    stack.push(...(adjacency.get(current) ?? []));
  }
  return false;
};

export const createModuleScreenV2 = (
  node: DynamicFlowNodeV2,
  locale: Locale,
  moduleCatalog: readonly ModulePackage[] = [],
  subflowCatalog: readonly SubflowPackage[] = [],
): InterfaceScreenV2 | null => {
  const contract = node.kind === 'verification'
    ? resolveModuleContract(node.moduleRef, moduleCatalog)
    : null;
  if (
    node.kind === 'verification'
    && contract
    && !moduleRequiresUserInteraction(contract)
  ) {
    return null;
  }
  const fallbackStates: readonly InterfaceVariantState[] = node.kind === 'subflow'
    ? ['intro', 'processing', 'success', 'error']
    : ['default'];
  const states = [...new Set<InterfaceVariantState>(
    contract?.uiCapabilities.supportedStates
    ?? fallbackStates,
  )];
  const outcomes = outcomesForNodeV2(node, moduleCatalog);
  const stateForOutcome = (outcome: OutcomeId): InterfaceVariantState | null => {
    if (outcome === 'failure' || outcome === 'false') return 'error';
    if (outcome === 'true') return 'success';
    if (
      outcome === 'success'
      || outcome === 'matched'
      || outcome === 'notMatched'
      || outcome === 'inconclusive'
      || outcome === 'sourceUnavailable'
    ) {
      return outcome;
    }
    return null;
  };
  return {
    id: `module-screen:${node.id}`,
    kind: 'module',
    sourceNodeId: node.id,
    variants: states.map((state) => createInterfaceVariant(
      state,
      locale,
      state === 'default'
        ? outcomes
        : outcomes.filter((outcome) => stateForOutcome(outcome) === state),
    )),
  };
};

export const reconcileInterfaceManifestV2 = (
  manifest: InterfaceManifestV2,
  flow: DynamicFlowManifestV2,
  moduleCatalog: readonly ModulePackage[] = [],
  subflowCatalog: readonly SubflowPackage[] = [],
): InterfaceManifestV2 => reconcileInterfaceStudioManifest(
  manifest,
  { flow },
  moduleCatalog,
  subflowCatalog,
);

export const createProjectSnapshot = (project: FlowProjectV2): ProjectSnapshotV2 => ({
  projectId: project.id,
  name: project.name,
  description: project.description,
  content: {
    flow: structuredClone(project.flow),
    interface: structuredClone(project.interface),
    scenarios: structuredClone(project.scenarios),
    integration: structuredClone(project.integration),
  },
});

export const restoreProjectSnapshot = (
  project: FlowProjectV2,
  snapshot: ProjectSnapshotV2,
  now = new Date(),
): FlowProjectV2 => ({
  ...project,
  name: snapshot.name,
  description: snapshot.description,
  ...structuredClone(snapshot.content),
  updatedAt: now.toISOString(),
});

export const createDependencyLock = (project: FlowProjectV2): DependencyLock => {
  const modules = project.flow.nodes
    .filter((node): node is Extract<DynamicFlowNodeV2, { readonly kind: 'verification' }> =>
      node.kind === 'verification' && !isBuiltInModuleId(node.moduleRef.packageId))
    .map((node) => node.moduleRef);
  const subflows = project.flow.nodes
    .filter((node): node is Extract<DynamicFlowNodeV2, { readonly kind: 'subflow' }> =>
      node.kind === 'subflow')
    .map((node) => node.subflowRef);
  return {
    modules: modules.filter(
      (item, index) => modules.findIndex(
        (candidate) => candidate.packageId === item.packageId && candidate.version === item.version,
      ) === index,
    ),
    subflows: subflows.filter(
      (item, index) => subflows.findIndex(
        (candidate) => candidate.packageId === item.packageId && candidate.version === item.version,
      ) === index,
    ),
  };
};

export const createDraftRevision = (
  project: FlowProjectV2,
  existing: readonly DraftRevision[],
  reason: DraftRevisionReason,
  now = new Date(),
): DraftRevision => ({
  id: createDashboardId('revision'),
  projectId: project.id,
  revision: Math.max(
    0,
    ...existing.filter((item) => item.projectId === project.id).map((item) => item.revision),
  ) + 1,
  reason,
  createdAt: now.toISOString(),
  snapshot: createProjectSnapshot(project),
});

export const appendDraftRevision = (
  revisions: readonly DraftRevision[],
  revision: DraftRevision,
): readonly DraftRevision[] => {
  const projectRevisions = [...revisions.filter((item) => item.projectId === revision.projectId), revision]
    .sort((left, right) => left.revision - right.revision)
    .slice(-MAX_DRAFT_REVISIONS_PER_PROJECT);
  return [
    ...revisions.filter((item) => item.projectId !== revision.projectId),
    ...projectRevisions,
  ];
};

export const createFlowRelease = (
  project: FlowProjectV2,
  version: string,
  environmentId: string,
  now = new Date(),
): FlowRelease => ({
  id: createDashboardId('release'),
  projectId: project.id,
  version,
  createdAt: now.toISOString(),
  snapshot: createProjectSnapshot(project),
  dependencyLock: createDependencyLock(project),
  promotions: [{
    stage: 'test',
    environmentId,
    promotedAt: now.toISOString(),
  }],
});

export const isWorkspaceV2 = (value: unknown): value is DashboardWorkspaceV2 => {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<DashboardWorkspaceV2>;
  return candidate.schemaVersion === DASHBOARD_WORKSPACE_SCHEMA_VERSION
    && typeof candidate.savedAt === 'string'
    && Array.isArray(candidate.projects)
    && Array.isArray(candidate.moduleCatalog)
    && Array.isArray(candidate.subflowCatalog)
    && Array.isArray(candidate.draftRevisions)
    && Array.isArray(candidate.releases)
    && Array.isArray(candidate.environments);
};

export const isModuleRefAvailable = (
  ref: ModuleRef,
  moduleCatalog: readonly ModulePackage[],
): boolean => {
  const builtIn = getBuiltInModuleContract(ref.packageId);
  if (builtIn) return builtIn.ref.version === ref.version;
  return Boolean(moduleCatalog.find((item) => item.id === ref.packageId)
    ?.versions.some((version) => version.version === ref.version));
};

export const replaceNodeBindings = (
  node: DynamicFlowNodeV2,
  bindings: readonly InputBinding[],
): DynamicFlowNodeV2 => {
  if (node.kind === 'verification' || node.kind === 'subflow') {
    return { ...node, bindings };
  }
  return node;
};

export const updateProjectContent = (
  project: FlowProjectV2,
  content: Partial<FlowProjectContentV2>,
  now = new Date(),
): FlowProjectV2 => ({
  ...project,
  ...content,
  updatedAt: now.toISOString(),
});

export { DEFAULT_ANALYSIS_THRESHOLDS, DEFAULT_DATABASE_STRATEGY };
