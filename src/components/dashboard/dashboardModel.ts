/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const DASHBOARD_SCHEMA_VERSION = 1 as const;

export const BUILT_IN_MODULE_IDS = [
  'citizen-id',
  'driver-license',
  'health-insurance',
  'phone-verification',
  'nfc-scan',
  'education-issuer',
  'education-trust-framework',
  'face-liveness',
  'face-data-match',
  'database-cross-check',
] as const;

export type BuiltInModuleId = typeof BUILT_IN_MODULE_IDS[number];

export const DATABASE_SOURCE_IDS = [
  'domestic-blacklist',
  'domestic-wanted-list',
  'domestic-bad-debt',
  'international-blacklist',
  'international-enforcement',
] as const;

export type DatabaseSourceId = typeof DATABASE_SOURCE_IDS[number];
export type DatabaseScope = 'domestic' | 'international';
export type DatabaseCategory =
  | 'blacklist'
  | 'wanted'
  | 'badDebt'
  | 'enforcement';

export type DatabaseSourceDefinition = {
  readonly id: DatabaseSourceId;
  readonly scope: DatabaseScope;
  readonly category: DatabaseCategory;
  readonly jurisdiction: string;
  readonly providerKey: string;
  readonly supportedFields: readonly string[];
  readonly matchingRule: 'exact' | 'weighted' | 'hybrid';
};

export const DATABASE_SOURCES: readonly DatabaseSourceDefinition[] = [
  {
    id: 'domestic-blacklist',
    scope: 'domestic',
    category: 'blacklist',
    jurisdiction: 'VN',
    providerKey: 'domesticRiskNetwork',
    supportedFields: ['fullName', 'identityNumber', 'dateOfBirth'],
    matchingRule: 'hybrid',
  },
  {
    id: 'domestic-wanted-list',
    scope: 'domestic',
    category: 'wanted',
    jurisdiction: 'VN',
    providerKey: 'domesticPublicSafety',
    supportedFields: ['fullName', 'identityNumber', 'dateOfBirth', 'faceReference'],
    matchingRule: 'weighted',
  },
  {
    id: 'domestic-bad-debt',
    scope: 'domestic',
    category: 'badDebt',
    jurisdiction: 'VN',
    providerKey: 'domesticCreditNetwork',
    supportedFields: ['fullName', 'identityNumber', 'dateOfBirth'],
    matchingRule: 'exact',
  },
  {
    id: 'international-blacklist',
    scope: 'international',
    category: 'blacklist',
    jurisdiction: 'GLOBAL',
    providerKey: 'globalRiskNetwork',
    supportedFields: ['fullName', 'dateOfBirth', 'nationality', 'documentNumber'],
    matchingRule: 'weighted',
  },
  {
    id: 'international-enforcement',
    scope: 'international',
    category: 'enforcement',
    jurisdiction: 'GLOBAL',
    providerKey: 'globalEnforcementNetwork',
    supportedFields: ['fullName', 'dateOfBirth', 'nationality', 'faceReference'],
    matchingRule: 'hybrid',
  },
] as const;

export type VerificationOutcome =
  | 'next'
  | 'success'
  | 'failure'
  | 'true'
  | 'false'
  | 'matched'
  | 'notMatched'
  | 'inconclusive'
  | 'sourceUnavailable';

export type SimulatorOutcome = Exclude<VerificationOutcome, 'next' | 'true' | 'false'>;

export type FlowNodeKind = 'start' | 'verification' | 'condition' | 'terminal';
export type TerminalOutcome = 'success' | 'failure';
export type ModuleOrigin = 'builtIn' | 'custom';
export type ModuleCategory =
  | 'identity'
  | 'credential'
  | 'device'
  | 'education'
  | 'biometric'
  | 'database'
  | 'custom';

export type IssuerPolicy =
  | {
      readonly mode: 'exactDid';
      readonly issuerDid: string;
    }
  | {
      readonly mode: 'trustFramework';
      readonly frameworkId: string;
    }
  | {
      readonly mode: 'allowedDids';
      readonly allowedDids: readonly string[];
    };

export type VerificationNodeConfig = {
  readonly retryLimit: number;
  readonly selectedDatabaseSourceIds: readonly DatabaseSourceId[];
  readonly credentialType?: string;
  readonly issuerPolicy?: IssuerPolicy;
};

export type DynamicFlowNode = {
  readonly id: string;
  readonly kind: FlowNodeKind;
  readonly position: {
    readonly x: number;
    readonly y: number;
  };
  readonly moduleId?: string;
  readonly terminalOutcome?: TerminalOutcome;
  readonly name?: string;
  readonly conditionExpression?: string;
  readonly config: VerificationNodeConfig;
};

export type DynamicFlowEdge = {
  readonly id: string;
  readonly source: string;
  readonly target: string;
  readonly outcome: VerificationOutcome;
};

export type DynamicFlowManifest = {
  readonly schemaVersion: typeof DASHBOARD_SCHEMA_VERSION;
  readonly nodes: readonly DynamicFlowNode[];
  readonly edges: readonly DynamicFlowEdge[];
};

export type JsonSchemaField = {
  readonly id: string;
  readonly name: string;
  readonly type: 'string' | 'number' | 'boolean' | 'object';
  readonly required: boolean;
};

export type CustomModuleDefinition = {
  readonly id: string;
  readonly origin: 'custom';
  readonly category: 'custom';
  readonly name: string;
  readonly version: string;
  readonly description: string;
  readonly credentialType: string;
  readonly didResolverUrl: string;
  readonly verificationMethod: string;
  readonly issuerPolicy: IssuerPolicy;
  readonly inputSchema: readonly JsonSchemaField[];
  readonly outputSchema: readonly JsonSchemaField[];
  readonly successExpression: string;
  readonly failureExpression: string;
  readonly defaultUi: {
    readonly title: string;
    readonly description: string;
    readonly actionLabel: string;
  };
};

export type InterfaceScreenKind =
  | 'welcome'
  | 'consent'
  | 'module'
  | 'processing'
  | 'success'
  | 'error';

export type InterfaceScreen = {
  readonly id: string;
  readonly kind: InterfaceScreenKind;
  readonly sourceNodeId?: string;
  readonly titleOverride?: string;
  readonly bodyOverride?: string;
  readonly actionOverride?: string;
};

export type InterfaceTheme = {
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

export type InterfaceManifest = {
  readonly schemaVersion: typeof DASHBOARD_SCHEMA_VERSION;
  readonly layout: 'card' | 'split' | 'fullscreen';
  readonly theme: InterfaceTheme;
  readonly screens: readonly InterfaceScreen[];
  readonly orphanedScreens: readonly InterfaceScreen[];
};

export type FlowProject = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly flow: DynamicFlowManifest;
  readonly interface: InterfaceManifest;
  readonly customModules: readonly CustomModuleDefinition[];
};

export type FlowValidationCode =
  | 'missingStart'
  | 'multipleStarts'
  | 'brokenEdge'
  | 'unreachableNode'
  | 'missingOutcome'
  | 'terminalHasOutput'
  | 'cycleDetected'
  | 'missingModule'
  | 'missingDatabaseSource';

export type FlowValidationIssue = {
  readonly code: FlowValidationCode;
  readonly nodeId?: string;
  readonly edgeId?: string;
};

export type SimulationStep = {
  readonly nodeId: string;
  readonly outcome?: VerificationOutcome;
};

export type SimulationResult = {
  readonly steps: readonly SimulationStep[];
  readonly completed: boolean;
  readonly terminalOutcome?: TerminalOutcome;
};

const createId = (prefix: string): string => {
  const suffix = typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  return `${prefix}-${suffix}`;
};

export const createDefaultFlow = (): DynamicFlowManifest => ({
  schemaVersion: DASHBOARD_SCHEMA_VERSION,
  nodes: [
    {
      id: 'start',
      kind: 'start',
      position: { x: 80, y: 180 },
      config: {
        retryLimit: 0,
        selectedDatabaseSourceIds: [],
      },
    },
    {
      id: 'terminal-success',
      kind: 'terminal',
      terminalOutcome: 'success',
      position: { x: 520, y: 100 },
      config: {
        retryLimit: 0,
        selectedDatabaseSourceIds: [],
      },
    },
    {
      id: 'terminal-failure',
      kind: 'terminal',
      terminalOutcome: 'failure',
      position: { x: 520, y: 300 },
      config: {
        retryLimit: 0,
        selectedDatabaseSourceIds: [],
      },
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

export const createDefaultInterface = (): InterfaceManifest => ({
  schemaVersion: DASHBOARD_SCHEMA_VERSION,
  layout: 'card',
  theme: {
    primaryColor: '#354CE1',
    accentColor: '#00BFA6',
    backgroundColor: '#F5F7FB',
    surfaceColor: '#FFFFFF',
    textColor: '#172033',
    fontFamily: 'jakarta',
    radius: 20,
    spacing: 'comfortable',
    logoUrl: '',
  },
  screens: [
    { id: 'welcome', kind: 'welcome' },
    { id: 'consent', kind: 'consent' },
    { id: 'processing', kind: 'processing' },
    { id: 'success', kind: 'success' },
    { id: 'error', kind: 'error' },
  ],
  orphanedScreens: [],
});

export const createFlowProject = (
  name: string,
  description = '',
  now = new Date(),
): FlowProject => {
  const timestamp = now.toISOString();

  return {
    id: createId('flow'),
    name,
    description,
    createdAt: timestamp,
    updatedAt: timestamp,
    flow: createDefaultFlow(),
    interface: createDefaultInterface(),
    customModules: [],
  };
};

export const duplicateFlowProject = (
  project: FlowProject,
  name: string,
  now = new Date(),
): FlowProject => {
  const timestamp = now.toISOString();

  return {
    ...structuredClone(project),
    id: createId('flow'),
    name,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
};

export const createVerificationNode = (
  moduleId: string,
  position: DynamicFlowNode['position'],
  name?: string,
): DynamicFlowNode => ({
  id: createId('node'),
  kind: 'verification',
  moduleId,
  name,
  position,
  config: {
    retryLimit: 0,
    selectedDatabaseSourceIds: moduleId === 'database-cross-check'
      ? ['domestic-blacklist']
      : [],
  },
});

export const createConditionNode = (
  position: DynamicFlowNode['position'],
): DynamicFlowNode => ({
  id: createId('node'),
  kind: 'condition',
  position,
  conditionExpression: '',
  config: {
    retryLimit: 0,
    selectedDatabaseSourceIds: [],
  },
});

export const createCustomModule = (
  input: Omit<CustomModuleDefinition, 'id' | 'origin' | 'category'>,
): CustomModuleDefinition => ({
  ...input,
  id: createId('custom-module'),
  origin: 'custom',
  category: 'custom',
});

export const outcomesForNode = (
  node: DynamicFlowNode,
  customModules: readonly CustomModuleDefinition[],
): readonly VerificationOutcome[] => {
  if (node.kind === 'start') return ['next'];
  if (node.kind === 'condition') return ['true', 'false'];
  if (node.kind === 'terminal') return [];
  if (node.moduleId === 'database-cross-check') {
    return ['matched', 'notMatched', 'inconclusive', 'sourceUnavailable'];
  }
  if (node.moduleId && customModules.some((module) => module.id === node.moduleId)) {
    return ['success', 'failure'];
  }
  return ['success', 'failure'];
};

export const wouldCreateCycle = (
  manifest: DynamicFlowManifest,
  source: string,
  target: string,
): boolean => {
  if (source === target) return true;

  const adjacency = new Map<string, string[]>();
  for (const edge of manifest.edges) {
    const targets = adjacency.get(edge.source) ?? [];
    targets.push(edge.target);
    adjacency.set(edge.source, targets);
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

export const validateDynamicFlow = (
  manifest: DynamicFlowManifest,
  customModules: readonly CustomModuleDefinition[] = [],
): readonly FlowValidationIssue[] => {
  const issues: FlowValidationIssue[] = [];
  const starts = manifest.nodes.filter((node) => node.kind === 'start');

  if (starts.length === 0) issues.push({ code: 'missingStart' });
  if (starts.length > 1) issues.push({ code: 'multipleStarts' });

  const nodeIds = new Set(manifest.nodes.map((node) => node.id));
  for (const edge of manifest.edges) {
    if (!nodeIds.has(edge.source) || !nodeIds.has(edge.target)) {
      issues.push({ code: 'brokenEdge', edgeId: edge.id });
    }
  }

  for (const node of manifest.nodes) {
    const outgoing = manifest.edges.filter((edge) => edge.source === node.id);

    if (node.kind === 'terminal' && outgoing.length > 0) {
      issues.push({ code: 'terminalHasOutput', nodeId: node.id });
    }

    if (node.kind !== 'terminal') {
      for (const outcome of outcomesForNode(node, customModules)) {
        if (!outgoing.some((edge) => edge.outcome === outcome)) {
          issues.push({ code: 'missingOutcome', nodeId: node.id });
          break;
        }
      }
    }

    if (node.kind === 'verification') {
      const isBuiltIn = BUILT_IN_MODULE_IDS.includes(node.moduleId as BuiltInModuleId);
      const isCustom = customModules.some((module) => module.id === node.moduleId);
      if (!node.moduleId || (!isBuiltIn && !isCustom)) {
        issues.push({ code: 'missingModule', nodeId: node.id });
      }
      if (
        node.moduleId === 'database-cross-check'
        && node.config.selectedDatabaseSourceIds.length === 0
      ) {
        issues.push({ code: 'missingDatabaseSource', nodeId: node.id });
      }
    }
  }

  const start = starts[0];
  if (start) {
    const reachable = new Set<string>();
    const stack = [start.id];
    while (stack.length > 0) {
      const nodeId = stack.pop()!;
      if (reachable.has(nodeId)) continue;
      reachable.add(nodeId);
      for (const edge of manifest.edges) {
        if (edge.source === nodeId && nodeIds.has(edge.target)) {
          stack.push(edge.target);
        }
      }
    }

    for (const node of manifest.nodes) {
      const isUnusedTerminal = node.kind === 'terminal'
        && !manifest.edges.some((edge) => edge.target === node.id);
      if (!reachable.has(node.id) && !isUnusedTerminal) {
        issues.push({ code: 'unreachableNode', nodeId: node.id });
      }
    }
  }

  const visited = new Set<string>();
  const active = new Set<string>();
  const adjacency = new Map<string, string[]>();
  for (const edge of manifest.edges) {
    adjacency.set(edge.source, [...(adjacency.get(edge.source) ?? []), edge.target]);
  }
  const hasCycle = (nodeId: string): boolean => {
    if (active.has(nodeId)) return true;
    if (visited.has(nodeId)) return false;
    visited.add(nodeId);
    active.add(nodeId);
    for (const target of adjacency.get(nodeId) ?? []) {
      if (hasCycle(target)) return true;
    }
    active.delete(nodeId);
    return false;
  };
  if (manifest.nodes.some((node) => hasCycle(node.id))) {
    issues.push({ code: 'cycleDetected' });
  }

  return issues;
};

export const simulateDynamicFlow = (
  manifest: DynamicFlowManifest,
  outcomes: Readonly<Record<string, SimulatorOutcome | 'true' | 'false'>>,
): SimulationResult => {
  const start = manifest.nodes.find((node) => node.kind === 'start');
  if (!start) return { steps: [], completed: false };

  const steps: SimulationStep[] = [];
  let current: DynamicFlowNode | undefined = start;
  const visited = new Set<string>();

  while (current && !visited.has(current.id)) {
    visited.add(current.id);
    if (current.kind === 'terminal') {
      steps.push({ nodeId: current.id });
      return {
        steps,
        completed: true,
        terminalOutcome: current.terminalOutcome,
      };
    }

    const outcome: VerificationOutcome = current.kind === 'start'
      ? 'next'
      : current.kind === 'condition'
        ? outcomes[current.id] === 'false' ? 'false' : 'true'
        : outcomes[current.id] ?? (
            current.moduleId === 'database-cross-check' ? 'notMatched' : 'success'
          );
    steps.push({ nodeId: current.id, outcome });
    const edge: DynamicFlowEdge | undefined = manifest.edges.find(
      (candidate) => candidate.source === current?.id && candidate.outcome === outcome,
    );
    current = edge
      ? manifest.nodes.find((node) => node.id === edge.target)
      : undefined;
  }

  return { steps, completed: false };
};

const moduleScreenId = (nodeId: string) => `module-screen:${nodeId}`;

export const reconcileInterfaceManifest = (
  manifest: InterfaceManifest,
  flow: DynamicFlowManifest,
): InterfaceManifest => {
  const moduleNodeIds = new Set(
    flow.nodes
      .filter((node) => node.kind === 'verification')
      .map((node) => node.id),
  );
  const staticScreens = manifest.screens.filter((screen) => screen.kind !== 'module');
  const existingModuleScreens = manifest.screens.filter((screen) => screen.kind === 'module');
  const activeModuleScreens = existingModuleScreens.filter(
    (screen) => screen.sourceNodeId && moduleNodeIds.has(screen.sourceNodeId),
  );
  const activeNodeIds = new Set(activeModuleScreens.map((screen) => screen.sourceNodeId));
  const restoredScreens = manifest.orphanedScreens.filter(
    (screen) => screen.sourceNodeId && moduleNodeIds.has(screen.sourceNodeId),
  );
  for (const screen of restoredScreens) {
    activeNodeIds.add(screen.sourceNodeId);
  }
  const createdScreens = [...moduleNodeIds]
    .filter((nodeId) => !activeNodeIds.has(nodeId))
    .map<InterfaceScreen>((nodeId) => ({
      id: moduleScreenId(nodeId),
      kind: 'module',
      sourceNodeId: nodeId,
    }));
  const orphanedScreens = [
    ...manifest.orphanedScreens.filter(
      (screen) => !screen.sourceNodeId || !moduleNodeIds.has(screen.sourceNodeId),
    ),
    ...existingModuleScreens.filter(
      (screen) => !screen.sourceNodeId || !moduleNodeIds.has(screen.sourceNodeId),
    ),
  ].filter(
    (screen, index, screens) => screens.findIndex((candidate) => candidate.id === screen.id) === index,
  );
  const welcome = staticScreens.filter((screen) => screen.kind === 'welcome');
  const consent = staticScreens.filter((screen) => screen.kind === 'consent');
  const processing = staticScreens.filter((screen) => screen.kind === 'processing');
  const terminal = staticScreens.filter(
    (screen) => screen.kind === 'success' || screen.kind === 'error',
  );

  return {
    ...manifest,
    screens: [
      ...welcome,
      ...consent,
      ...activeModuleScreens,
      ...restoredScreens,
      ...createdScreens,
      ...processing,
      ...terminal,
    ],
    orphanedScreens,
  };
};

export const isFlowProject = (value: unknown): value is FlowProject => {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<FlowProject>;

  return typeof candidate.id === 'string'
    && typeof candidate.name === 'string'
    && typeof candidate.createdAt === 'string'
    && typeof candidate.updatedAt === 'string'
    && candidate.flow?.schemaVersion === DASHBOARD_SCHEMA_VERSION
    && candidate.interface?.schemaVersion === DASHBOARD_SCHEMA_VERSION
    && Array.isArray(candidate.flow.nodes)
    && Array.isArray(candidate.flow.edges)
    && Array.isArray(candidate.interface.screens)
    && Array.isArray(candidate.customModules);
};
