/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Locale } from '../../types/routes';
import { isBuiltInModuleId } from './dashboardModuleRegistry';
import {
  DASHBOARD_WORKSPACE_SCHEMA_VERSION,
  DEFAULT_DATABASE_STRATEGY,
  DEFAULT_INTEGRATION_SETTINGS,
  DEFAULT_SEMANTIC_THEME,
  DYNAMIC_FLOW_SCHEMA_VERSION,
  INTERFACE_MANIFEST_SCHEMA_VERSION,
  type ConditionDefinition,
  type DashboardWorkspaceV2,
  type DynamicFlowManifestV2,
  type DynamicFlowNodeV2,
  type FlowField,
  type FlowProjectV2,
  type InterfaceBlock,
  type InterfaceManifestV2,
  type InterfaceScreenKind,
  type InterfaceScreenV2,
  type ModulePackage,
  type ModuleVersion,
  type OutcomeId,
} from './dashboardV2Types';
import {
  createDefaultFlowV2,
  createEmptyWorkspaceV2,
} from './dashboardV2Model';

type LegacySchemaField = {
  readonly id: string;
  readonly name: string;
  readonly type: 'string' | 'number' | 'boolean' | 'object';
  readonly required: boolean;
};

type LegacyIssuerPolicy =
  | { readonly mode: 'exactDid'; readonly issuerDid: string }
  | { readonly mode: 'trustFramework'; readonly frameworkId: string }
  | { readonly mode: 'allowedDids'; readonly allowedDids: readonly string[] };

type LegacyCustomModule = {
  readonly id: string;
  readonly name: string;
  readonly version: string;
  readonly description: string;
  readonly credentialType: string;
  readonly didResolverUrl: string;
  readonly verificationMethod: string;
  readonly issuerPolicy: LegacyIssuerPolicy;
  readonly inputSchema: readonly LegacySchemaField[];
  readonly outputSchema: readonly LegacySchemaField[];
  readonly successExpression: string;
  readonly failureExpression: string;
  readonly defaultUi: {
    readonly title: string;
    readonly description: string;
    readonly actionLabel: string;
  };
};

type LegacyFlowNode = {
  readonly id: string;
  readonly kind: 'start' | 'verification' | 'condition' | 'terminal';
  readonly position: { readonly x: number; readonly y: number };
  readonly moduleId?: string;
  readonly terminalOutcome?: 'success' | 'failure';
  readonly name?: string;
  readonly conditionExpression?: string;
  readonly config: {
    readonly retryLimit: number;
    readonly selectedDatabaseSourceIds: readonly string[];
    readonly credentialType?: string;
    readonly issuerPolicy?: LegacyIssuerPolicy;
  };
};

type LegacyFlow = {
  readonly schemaVersion: 1;
  readonly nodes: readonly LegacyFlowNode[];
  readonly edges: readonly {
    readonly id: string;
    readonly source: string;
    readonly target: string;
    readonly outcome: OutcomeId;
  }[];
};

type LegacyInterfaceScreen = {
  readonly id: string;
  readonly kind: InterfaceScreenKind;
  readonly sourceNodeId?: string;
  readonly titleOverride?: string;
  readonly bodyOverride?: string;
  readonly actionOverride?: string;
};

type LegacyInterface = {
  readonly schemaVersion: 1;
  readonly layout: 'card' | 'split' | 'fullscreen';
  readonly theme: {
    readonly primaryColor: string;
    readonly accentColor: string;
    readonly backgroundColor: string;
    readonly surfaceColor: string;
    readonly textColor: string;
    readonly fontFamily: 'jakarta' | 'system' | 'serif';
    readonly radius: number;
    readonly spacing: 'compact' | 'comfortable' | 'spacious';
    readonly logoUrl: string;
  };
  readonly screens: readonly LegacyInterfaceScreen[];
  readonly orphanedScreens: readonly LegacyInterfaceScreen[];
};

type LegacyProject = {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly flow: LegacyFlow;
  readonly interface: LegacyInterface;
  readonly customModules: readonly LegacyCustomModule[];
};

type LegacyWorkspace = {
  readonly schemaVersion: 1;
  readonly projects: readonly LegacyProject[];
};

const isObject = (value: unknown): value is Readonly<Record<string, unknown>> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);

const hasOnlyKeys = (
  value: Readonly<Record<string, unknown>>,
  keys: readonly string[],
): boolean => Object.keys(value).every((key) => keys.includes(key));

const isStringArray = (value: unknown): value is readonly string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string');

const isLegacyIssuerPolicy = (value: unknown): value is LegacyIssuerPolicy => {
  if (!isObject(value)) return false;
  if (value.mode === 'exactDid') {
    return hasOnlyKeys(value, ['mode', 'issuerDid'])
      && typeof value.issuerDid === 'string';
  }
  if (value.mode === 'trustFramework') {
    return hasOnlyKeys(value, ['mode', 'frameworkId'])
      && typeof value.frameworkId === 'string';
  }
  return value.mode === 'allowedDids'
    && hasOnlyKeys(value, ['mode', 'allowedDids'])
    && isStringArray(value.allowedDids);
};

const isLegacySchemaField = (value: unknown): value is LegacySchemaField =>
  isObject(value)
  && hasOnlyKeys(value, ['id', 'name', 'type', 'required'])
  && typeof value.id === 'string'
  && typeof value.name === 'string'
  && ['string', 'number', 'boolean', 'object'].includes(String(value.type))
  && typeof value.required === 'boolean';

const isLegacyCustomModule = (value: unknown): value is LegacyCustomModule =>
  isObject(value)
  && hasOnlyKeys(value, [
    'id',
    'origin',
    'category',
    'name',
    'version',
    'description',
    'credentialType',
    'didResolverUrl',
    'verificationMethod',
    'issuerPolicy',
    'inputSchema',
    'outputSchema',
    'successExpression',
    'failureExpression',
    'defaultUi',
  ])
  && typeof value.id === 'string'
  && (value.origin === undefined || value.origin === 'custom')
  && (value.category === undefined || value.category === 'custom')
  && typeof value.name === 'string'
  && typeof value.version === 'string'
  && typeof value.description === 'string'
  && typeof value.credentialType === 'string'
  && typeof value.didResolverUrl === 'string'
  && typeof value.verificationMethod === 'string'
  && isLegacyIssuerPolicy(value.issuerPolicy)
  && Array.isArray(value.inputSchema)
  && value.inputSchema.every(isLegacySchemaField)
  && Array.isArray(value.outputSchema)
  && value.outputSchema.every(isLegacySchemaField)
  && typeof value.successExpression === 'string'
  && typeof value.failureExpression === 'string'
  && isObject(value.defaultUi)
  && hasOnlyKeys(value.defaultUi, ['title', 'description', 'actionLabel'])
  && typeof value.defaultUi.title === 'string'
  && typeof value.defaultUi.description === 'string'
  && typeof value.defaultUi.actionLabel === 'string';

const isLegacyFlowNode = (value: unknown): value is LegacyFlowNode =>
  isObject(value)
  && hasOnlyKeys(value, [
    'id',
    'kind',
    'position',
    'moduleId',
    'terminalOutcome',
    'name',
    'conditionExpression',
    'config',
  ])
  && typeof value.id === 'string'
  && ['start', 'verification', 'condition', 'terminal'].includes(String(value.kind))
  && isObject(value.position)
  && hasOnlyKeys(value.position, ['x', 'y'])
  && typeof value.position.x === 'number'
  && Number.isFinite(value.position.x)
  && typeof value.position.y === 'number'
  && Number.isFinite(value.position.y)
  && (value.moduleId === undefined || typeof value.moduleId === 'string')
  && (
    value.terminalOutcome === undefined
    || value.terminalOutcome === 'success'
    || value.terminalOutcome === 'failure'
  )
  && (value.name === undefined || typeof value.name === 'string')
  && (
    value.conditionExpression === undefined
    || typeof value.conditionExpression === 'string'
  )
  && isObject(value.config)
  && hasOnlyKeys(value.config, [
    'retryLimit',
    'selectedDatabaseSourceIds',
    'credentialType',
    'issuerPolicy',
  ])
  && typeof value.config.retryLimit === 'number'
  && Number.isFinite(value.config.retryLimit)
  && isStringArray(value.config.selectedDatabaseSourceIds)
  && (
    value.config.credentialType === undefined
    || typeof value.config.credentialType === 'string'
  )
  && (
    value.config.issuerPolicy === undefined
    || isLegacyIssuerPolicy(value.config.issuerPolicy)
  );

const isLegacyInterfaceScreen = (
  value: unknown,
): value is LegacyInterfaceScreen =>
  isObject(value)
  && hasOnlyKeys(value, [
    'id',
    'kind',
    'sourceNodeId',
    'titleOverride',
    'bodyOverride',
    'actionOverride',
  ])
  && typeof value.id === 'string'
  && ['welcome', 'consent', 'module', 'processing', 'success', 'error']
    .includes(String(value.kind))
  && (value.sourceNodeId === undefined || typeof value.sourceNodeId === 'string')
  && (
    value.titleOverride === undefined
    || typeof value.titleOverride === 'string'
  )
  && (
    value.bodyOverride === undefined
    || typeof value.bodyOverride === 'string'
  )
  && (
    value.actionOverride === undefined
    || typeof value.actionOverride === 'string'
  );

const isLegacyInterface = (value: unknown): value is LegacyInterface =>
  isObject(value)
  && hasOnlyKeys(value, [
    'schemaVersion',
    'layout',
    'theme',
    'screens',
    'orphanedScreens',
  ])
  && value.schemaVersion === 1
  && ['card', 'split', 'fullscreen'].includes(String(value.layout))
  && isObject(value.theme)
  && hasOnlyKeys(value.theme, [
    'primaryColor',
    'accentColor',
    'backgroundColor',
    'surfaceColor',
    'textColor',
    'fontFamily',
    'radius',
    'spacing',
    'logoUrl',
  ])
  && typeof value.theme.primaryColor === 'string'
  && typeof value.theme.accentColor === 'string'
  && typeof value.theme.backgroundColor === 'string'
  && typeof value.theme.surfaceColor === 'string'
  && typeof value.theme.textColor === 'string'
  && ['jakarta', 'system', 'serif'].includes(String(value.theme.fontFamily))
  && typeof value.theme.radius === 'number'
  && Number.isFinite(value.theme.radius)
  && ['compact', 'comfortable', 'spacious'].includes(String(value.theme.spacing))
  && typeof value.theme.logoUrl === 'string'
  && Array.isArray(value.screens)
  && value.screens.every(isLegacyInterfaceScreen)
  && Array.isArray(value.orphanedScreens)
  && value.orphanedScreens.every(isLegacyInterfaceScreen);

export const isLegacyWorkspace = (value: unknown): value is LegacyWorkspace => {
  if (
    !isObject(value)
    || !hasOnlyKeys(value, ['schemaVersion', 'projects'])
    || value.schemaVersion !== 1
    || !Array.isArray(value.projects)
  ) {
    return false;
  }
  return value.projects.every((project) =>
    isObject(project)
    && hasOnlyKeys(project, [
      'id',
      'name',
      'description',
      'createdAt',
      'updatedAt',
      'flow',
      'interface',
      'customModules',
    ])
    && typeof project.id === 'string'
    && typeof project.name === 'string'
    && (project.description === undefined || typeof project.description === 'string')
    && typeof project.createdAt === 'string'
    && typeof project.updatedAt === 'string'
    && isObject(project.flow)
    && hasOnlyKeys(project.flow, ['schemaVersion', 'nodes', 'edges'])
    && project.flow.schemaVersion === 1
    && Array.isArray(project.flow.nodes)
    && project.flow.nodes.every(isLegacyFlowNode)
    && Array.isArray(project.flow.edges)
    && project.flow.edges.every((edge) =>
      isObject(edge)
      && hasOnlyKeys(edge, ['id', 'source', 'target', 'outcome'])
      && typeof edge.id === 'string'
      && typeof edge.source === 'string'
      && typeof edge.target === 'string'
      && typeof edge.outcome === 'string')
    && isLegacyInterface(project.interface)
    && Array.isArray(project.customModules)
    && project.customModules.every(isLegacyCustomModule));
};

const classificationForField = (name: string): FlowField['classification'] => {
  const normalized = name.toLowerCase();
  if (normalized.includes('credential')) return 'credential';
  if (normalized.includes('face') || normalized.includes('biometric')) return 'biometric';
  if (
    normalized.includes('identity')
    || normalized.includes('document')
    || normalized.includes('phone')
    || normalized.includes('member')
    || normalized.includes('license')
  ) {
    return 'sensitivePii';
  }
  if (
    normalized.includes('name')
    || normalized.includes('birth')
    || normalized.includes('nationality')
    || normalized.includes('qualification')
  ) {
    return 'pii';
  }
  return 'internalMetadata';
};

const migrateField = (field: LegacySchemaField): FlowField => {
  const classification = classificationForField(field.name);
  return {
    id: field.id || field.name,
    key: field.name,
    type: field.type,
    format: 'none',
    required: field.required,
    classification,
    safeForResult: classification === 'publicMetadata' || classification === 'internalMetadata',
  };
};

const legacyCondition = (
  expression: string,
  stableId: string,
): ConditionDefinition => ({
  root: {
    id: `condition-group:legacy:${stableId}`,
    kind: 'group',
    combinator: 'and',
    conditions: [],
  },
  ...(expression ? { legacyExpression: expression } : {}),
  migrationState: expression ? 'requiresConversion' : 'native',
});

const migrateModuleVersion = (
  module: LegacyCustomModule,
  createdAt: string,
): ModuleVersion => ({
  version: module.version,
  status: 'active',
  createdAt,
  contract: {
    ref: { packageId: module.id, version: module.version },
    origin: 'custom',
    category: 'custom',
    inputFields: module.inputSchema.map(migrateField),
    outputFields: module.outputSchema.map(migrateField),
    outcomes: [
      { id: 'success', terminal: false },
      { id: 'failure', terminal: false },
    ],
    uiCapabilities: {
      supportedStates: ['intro', 'processing', 'success', 'error', 'retry'],
      supportsConsent: false,
      supportsCredentialRequest: true,
      supportsFieldSummary: true,
      supportsDevicePermission: false,
      supportsCapture: false,
    },
    evidenceGroup: 'other',
    estimatedDurationMs: 8_000,
  },
  definition: {
    description: module.description,
    credentialType: module.credentialType,
    didResolverUrl: module.didResolverUrl,
    verificationMethod: module.verificationMethod,
    issuerPolicy: module.issuerPolicy,
    successCondition: legacyCondition(
      module.successExpression,
      `${module.id}:${module.version}:success`,
    ),
    failureCondition: legacyCondition(
      module.failureExpression,
      `${module.id}:${module.version}:failure`,
    ),
    defaultUi: module.defaultUi,
  },
});

const migrateModulePackages = (projects: readonly LegacyProject[]): readonly ModulePackage[] => {
  const packages = new Map<string, ModulePackage>();
  for (const project of projects) {
    for (const module of project.customModules) {
      const existing = packages.get(module.id);
      const version = migrateModuleVersion(module, project.updatedAt);
      if (!existing) {
        packages.set(module.id, {
          id: module.id,
          name: module.name,
          origin: 'custom',
          activeVersion: module.version,
          versions: [version],
        });
        continue;
      }
      if (!existing.versions.some((item) => item.version === module.version)) {
        packages.set(module.id, {
          ...existing,
          versions: [...existing.versions, version],
        });
      }
    }
  }
  return [...packages.values()];
};

const migrateNode = (
  node: LegacyFlowNode,
  modulePackages: readonly ModulePackage[],
): DynamicFlowNodeV2 => {
  if (node.kind === 'start') {
    return {
      id: node.id,
      kind: 'start',
      position: node.position,
      ...(node.name ? { name: node.name } : {}),
    };
  }
  if (node.kind === 'terminal') {
    return {
      id: node.id,
      kind: 'terminal',
      position: node.position,
      ...(node.name ? { name: node.name } : {}),
      terminalOutcome: node.terminalOutcome ?? 'failure',
    };
  }
  if (node.kind === 'condition') {
    return {
      id: node.id,
      kind: 'condition',
      position: node.position,
      ...(node.name ? { name: node.name } : {}),
      condition: legacyCondition(
        node.conditionExpression ?? '',
        `node:${node.id}`,
      ),
    };
  }

  const packageId = node.moduleId ?? '';
  const version = isBuiltInModuleId(packageId)
    ? '1'
    : modulePackages.find((item) => item.id === packageId)?.activeVersion ?? '1.0.0';
  const isDatabase = packageId === 'database-cross-check';
  return {
    id: node.id,
    kind: 'verification',
    position: node.position,
    ...(node.name ? { name: node.name } : {}),
    moduleRef: { packageId, version },
    bindings: [],
    retryPolicy: { maxAttempts: node.config.retryLimit },
    selectedDatabaseSourceIds: node.config.selectedDatabaseSourceIds,
    ...(isDatabase ? { databaseStrategy: structuredClone(DEFAULT_DATABASE_STRATEGY) } : {}),
  };
};

const migrateFlow = (
  flow: LegacyFlow,
  modulePackages: readonly ModulePackage[],
): DynamicFlowManifestV2 => ({
  ...createDefaultFlowV2(),
  schemaVersion: DYNAMIC_FLOW_SCHEMA_VERSION,
  nodes: flow.nodes.map((node) => migrateNode(node, modulePackages)),
  edges: flow.edges,
});

const screenOutcomes = (kind: InterfaceScreenKind): readonly OutcomeId[] => {
  if (kind === 'success') return ['success'];
  if (kind === 'error') return ['failure'];
  return [];
};

const migrateBlocks = (
  screen: LegacyInterfaceScreen,
  locale: Locale,
): readonly InterfaceBlock[] => [
  {
    id: `block-heading:${screen.id}`,
    kind: 'heading',
    level: 1,
    content: screen.titleOverride ? { [locale]: screen.titleOverride } : {},
    hidden: false,
    required: true,
  },
  {
    id: `block-text:${screen.id}`,
    kind: 'text',
    content: screen.bodyOverride ? { [locale]: screen.bodyOverride } : {},
    hidden: false,
    required: false,
  },
  {
    id: `block-actions:${screen.id}`,
    kind: 'actionGroup',
    hidden: false,
    required: true,
    actions: [{
      id: `action-continue:${screen.id}`,
      intent: 'continue',
      label: screen.actionOverride ? { [locale]: screen.actionOverride } : {},
    }],
  },
];

const stateForScreen = (kind: InterfaceScreenKind) => {
  if (kind === 'welcome') return 'intro' as const;
  if (kind === 'consent') return 'permission' as const;
  if (kind === 'processing') return 'processing' as const;
  if (kind === 'success') return 'success' as const;
  if (kind === 'error') return 'error' as const;
  return 'default' as const;
};

const migrateScreen = (
  screen: LegacyInterfaceScreen,
  locale: Locale,
): InterfaceScreenV2 => ({
  id: screen.id,
  kind: screen.kind,
  ...(screen.sourceNodeId ? { sourceNodeId: screen.sourceNodeId } : {}),
  variants: [{
    id: `variant-default:${screen.id}`,
    state: stateForScreen(screen.kind),
    outcomes: screenOutcomes(screen.kind),
    blocks: migrateBlocks(screen, locale),
  }],
});

const migrateInterface = (
  manifest: LegacyInterface,
  locale: Locale,
): InterfaceManifestV2 => {
  const spacingScale = manifest.theme.spacing === 'compact'
    ? 0.85
    : manifest.theme.spacing === 'spacious'
      ? 1.2
      : 1;
  const hasOverrides = [...manifest.screens, ...manifest.orphanedScreens].some(
    (screen) => screen.titleOverride || screen.bodyOverride || screen.actionOverride,
  );
  return {
    schemaVersion: INTERFACE_MANIFEST_SCHEMA_VERSION,
    defaultLocale: locale,
    enabledLocales: [locale],
    contentLocaleReviewRequired: hasOverrides,
    layout: manifest.layout,
    theme: {
      ...structuredClone(DEFAULT_SEMANTIC_THEME),
      light: {
        ...DEFAULT_SEMANTIC_THEME.light,
        primary: manifest.theme.primaryColor,
        accent: manifest.theme.accentColor,
        background: manifest.theme.backgroundColor,
        surface: manifest.theme.surfaceColor,
        text: manifest.theme.textColor,
      },
      typography: {
        ...DEFAULT_SEMANTIC_THEME.typography,
        fontFamily: manifest.theme.fontFamily,
      },
      controls: {
        ...DEFAULT_SEMANTIC_THEME.controls,
        radius: Math.max(0, Math.min(36, manifest.theme.radius * 0.6)),
      },
      borderRadius: manifest.theme.radius,
      spacingScale,
      branding: {
        ...DEFAULT_SEMANTIC_THEME.branding,
        logoLightUrl: manifest.theme.logoUrl,
        logoDarkUrl: manifest.theme.logoUrl,
      },
    },
    screens: manifest.screens.map((screen) => migrateScreen(screen, locale)),
    orphanedScreens: manifest.orphanedScreens.map((screen) => migrateScreen(screen, locale)),
  };
};

const migrateProject = (
  project: LegacyProject,
  modulePackages: readonly ModulePackage[],
  locale: Locale,
): FlowProjectV2 => ({
  id: project.id,
  name: project.name,
  description: project.description ?? '',
  createdAt: project.createdAt,
  updatedAt: project.updatedAt,
  flow: migrateFlow(project.flow, modulePackages),
  interface: migrateInterface(project.interface, locale),
  scenarios: [],
  integration: structuredClone(DEFAULT_INTEGRATION_SETTINGS),
});

export const migrateLegacyWorkspace = (
  legacy: LegacyWorkspace,
  locale: Locale,
  now = new Date(),
): DashboardWorkspaceV2 => {
  const moduleCatalog = migrateModulePackages(legacy.projects);
  const empty = createEmptyWorkspaceV2(now);
  return {
    ...empty,
    schemaVersion: DASHBOARD_WORKSPACE_SCHEMA_VERSION,
    projects: legacy.projects.map((project) => migrateProject(project, moduleCatalog, locale)),
    moduleCatalog,
  };
};
