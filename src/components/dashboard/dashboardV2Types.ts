/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Locale } from '../../types/routes';

export const DASHBOARD_WORKSPACE_SCHEMA_VERSION = 2 as const;
export const DYNAMIC_FLOW_SCHEMA_VERSION = 2 as const;
export const INTERFACE_MANIFEST_SCHEMA_VERSION = 2 as const;

export const DASHBOARD_WORKSPACE_STORAGE_KEY = 'identra_dashboard_workspace' as const;
export const LEGACY_DASHBOARD_WORKSPACE_STORAGE_KEY =
  'identra_dashboard_workspace_v1' as const;
export const LEGACY_DASHBOARD_WORKSPACE_BACKUP_KEY =
  'identra_dashboard_workspace_v1_backup' as const;

export const MAX_DRAFT_REVISIONS_PER_PROJECT = 20 as const;
export const MAX_SUBFLOW_SIMULATION_DEPTH = 10 as const;

export type JsonPrimitive = string | number | boolean | null;
export type JsonValue =
  | JsonPrimitive
  | { readonly [key: string]: JsonValue }
  | readonly JsonValue[];

export type PrimitiveFieldType = 'string' | 'number' | 'boolean';
export type CompositeFieldType = 'object' | 'array';
export type FlowFieldType = PrimitiveFieldType | CompositeFieldType;
export type FlowFieldFormat =
  | 'none'
  | 'date'
  | 'dateTime'
  | 'countryCode'
  | 'did'
  | 'email'
  | 'phone'
  | 'uri';

export type DataClassification =
  | 'publicMetadata'
  | 'internalMetadata'
  | 'pii'
  | 'sensitivePii'
  | 'biometric'
  | 'credential'
  | 'secret';

export type FlowField = {
  readonly id: string;
  readonly key: string;
  readonly type: FlowFieldType;
  readonly format: FlowFieldFormat;
  readonly required: boolean;
  readonly classification: DataClassification;
  readonly safeForResult: boolean;
  readonly itemType?: FlowFieldType;
  readonly children?: readonly FlowField[];
};

export type FlowSchema = {
  readonly fields: readonly FlowField[];
};

export type ModuleOrigin = 'builtIn' | 'custom';
export type ModuleLifecycleStatus = 'active' | 'deprecated';
export type ModuleCategory =
  | 'identity'
  | 'credential'
  | 'device'
  | 'education'
  | 'biometric'
  | 'database'
  | 'custom';

export type BuiltInOutcomeId =
  | 'next'
  | 'success'
  | 'failure'
  | 'true'
  | 'false'
  | 'matched'
  | 'notMatched'
  | 'inconclusive'
  | 'sourceUnavailable';
export type OutcomeId = BuiltInOutcomeId | `custom:${string}`;
export type TerminalOutcome = 'success' | 'failure';

export type ModuleRef = {
  readonly packageId: string;
  readonly version: string;
};

export type InterfaceVariantState =
  | 'default'
  | 'intro'
  | 'permission'
  | 'input'
  | 'capture'
  | 'processing'
  | 'success'
  | 'error'
  | 'retry'
  | 'matched'
  | 'notMatched'
  | 'inconclusive'
  | 'sourceUnavailable';

export type ModuleUiCapabilities = {
  readonly supportedStates: readonly InterfaceVariantState[];
  readonly supportsConsent: boolean;
  readonly supportsCredentialRequest: boolean;
  readonly supportsFieldSummary: boolean;
  readonly supportsDevicePermission: boolean;
  readonly supportsCapture: boolean;
};

export type ModuleOutcomeContract = {
  readonly id: OutcomeId;
  readonly terminal: boolean;
};

export type ModuleContract = {
  readonly ref: ModuleRef;
  readonly origin: ModuleOrigin;
  readonly category: ModuleCategory;
  readonly inputFields: readonly FlowField[];
  readonly outputFields: readonly FlowField[];
  readonly outcomes: readonly ModuleOutcomeContract[];
  readonly uiCapabilities: ModuleUiCapabilities;
  readonly evidenceGroup:
    | 'identity'
    | 'contact'
    | 'credential'
    | 'education'
    | 'biometric'
    | 'risk'
    | 'other';
  readonly estimatedDurationMs: number;
};

export type FlowInputReference = {
  readonly kind: 'flowInput';
  readonly fieldId: string;
};

export type NodeOutputReference = {
  readonly kind: 'nodeOutput';
  readonly nodeId: string;
  readonly fieldId: string;
};

export type LiteralReference = {
  readonly kind: 'literal';
  readonly valueType: PrimitiveFieldType;
  readonly value: string | number | boolean;
};

export type DataReference =
  | FlowInputReference
  | NodeOutputReference
  | LiteralReference;

export type InputBinding = {
  readonly id: string;
  readonly targetFieldId: string;
  readonly source: DataReference;
};

export type StringConditionOperator =
  | 'equals'
  | 'notEquals'
  | 'contains'
  | 'startsWith'
  | 'endsWith';
export type NumberConditionOperator =
  | 'equals'
  | 'notEquals'
  | 'greaterThan'
  | 'greaterThanOrEqual'
  | 'lessThan'
  | 'lessThanOrEqual';
export type BooleanConditionOperator = 'equals' | 'notEquals';
export type UnaryConditionOperator = 'exists' | 'notExists';
export type ConditionOperator =
  | StringConditionOperator
  | NumberConditionOperator
  | BooleanConditionOperator
  | UnaryConditionOperator;

export type ConditionValueReference = DataReference;

export type ConditionRule = {
  readonly id: string;
  readonly kind: 'rule';
  readonly left: ConditionValueReference;
  readonly operator: ConditionOperator;
  readonly right?: ConditionValueReference;
};

export type ConditionCombinator = 'and' | 'or';

export type ConditionGroup = {
  readonly id: string;
  readonly kind: 'group';
  readonly combinator: ConditionCombinator;
  readonly conditions: readonly (ConditionRule | ConditionGroup)[];
};

export type ConditionDefinition = {
  readonly root: ConditionGroup;
  readonly legacyExpression?: string;
  readonly migrationState: 'native' | 'requiresConversion';
};

export type DatabaseExecutionMode = 'parallel' | 'sequential';
export type DatabaseAggregation =
  | 'anyMatch'
  | 'allClear'
  | 'quorum'
  | 'weighted';
export type DatabaseUnavailablePolicy =
  | 'continue'
  | 'inconclusive'
  | 'sourceUnavailable';
export type DatabaseNormalizedOutcome =
  | 'matched'
  | 'notMatched'
  | 'inconclusive'
  | 'sourceUnavailable';

export type DatabaseStrategy = {
  readonly executionMode: DatabaseExecutionMode;
  readonly aggregation: DatabaseAggregation;
  readonly stopOnMatch: boolean;
  readonly requiredSourceIds: readonly string[];
  readonly unavailablePolicy: DatabaseUnavailablePolicy;
  readonly quorum?: number;
  readonly weightedThreshold?: number;
  readonly sourceWeights?: Readonly<Record<string, number>>;
};

export type DatabaseSourceStrategy = DatabaseStrategy;

export const DEFAULT_DATABASE_STRATEGY: DatabaseStrategy = {
  executionMode: 'parallel',
  aggregation: 'anyMatch',
  stopOnMatch: true,
  requiredSourceIds: [],
  unavailablePolicy: 'continue',
};

export type RetryPolicy = {
  readonly maxAttempts: number;
};

export type FlowNodePosition = {
  readonly x: number;
  readonly y: number;
};

export type FlowNodeBaseV2 = {
  readonly id: string;
  readonly position: FlowNodePosition;
  readonly name?: string;
};

export type StartFlowNodeV2 = FlowNodeBaseV2 & {
  readonly kind: 'start';
};

export type VerificationFlowNodeV2 = FlowNodeBaseV2 & {
  readonly kind: 'verification';
  readonly moduleRef: ModuleRef;
  readonly bindings: readonly InputBinding[];
  readonly retryPolicy: RetryPolicy;
  readonly selectedDatabaseSourceIds: readonly string[];
  readonly databaseStrategy?: DatabaseStrategy;
};

export type ConditionFlowNodeV2 = FlowNodeBaseV2 & {
  readonly kind: 'condition';
  readonly condition: ConditionDefinition;
};

export type TerminalFlowNodeV2 = FlowNodeBaseV2 & {
  readonly kind: 'terminal';
  readonly terminalOutcome: TerminalOutcome;
};

export type SubflowRef = {
  readonly packageId: string;
  readonly version: string;
};

export type SubflowFlowNodeV2 = FlowNodeBaseV2 & {
  readonly kind: 'subflow';
  readonly subflowRef: SubflowRef;
  readonly bindings: readonly InputBinding[];
};

export type DynamicFlowNodeV2 =
  | StartFlowNodeV2
  | VerificationFlowNodeV2
  | ConditionFlowNodeV2
  | TerminalFlowNodeV2
  | SubflowFlowNodeV2;

export type DynamicFlowEdgeV2 = {
  readonly id: string;
  readonly source: string;
  readonly target: string;
  readonly outcome: OutcomeId;
};

export type DynamicFlowManifestV2 = {
  readonly schemaVersion: typeof DYNAMIC_FLOW_SCHEMA_VERSION;
  readonly inputSchema: FlowSchema;
  readonly nodes: readonly DynamicFlowNodeV2[];
  readonly edges: readonly DynamicFlowEdgeV2[];
};

export type DatabaseSourceFixture = {
  readonly sourceId: string;
  readonly outcome: DatabaseNormalizedOutcome;
  readonly matchScore?: number;
  readonly metadata?: Readonly<Record<string, JsonValue>>;
};

export type NodeScenarioFixture = {
  readonly nodeId: string;
  readonly outcome: OutcomeId;
  readonly outputPresetId?: string;
};

export type ScenarioAssertion =
  | {
      readonly id: string;
      readonly kind: 'terminal';
      readonly terminalNodeId: string;
    }
  | {
      readonly id: string;
      readonly kind: 'pathIncludes';
      readonly edgeId: string;
    }
  | {
      readonly id: string;
      readonly kind: 'nodeOutcome';
      readonly nodeId: string;
      readonly outcome: OutcomeId;
    }
  | {
      readonly id: string;
      readonly kind: 'safeOutputEquals';
      readonly nodeId: string;
      readonly fieldId: string;
      readonly expected: JsonValue;
    };

export type FlowScenario = {
  readonly id: string;
  readonly name: string;
  readonly enabled: boolean;
  readonly inputPresetId: string;
  readonly nodeFixtures: readonly NodeScenarioFixture[];
  readonly databaseFixtures: readonly DatabaseSourceFixture[];
  readonly expectedTerminalId?: string;
  readonly expectedEdgeIds: readonly string[];
  readonly assertions: readonly ScenarioAssertion[];
};

export type SimulationStepV2 = {
  readonly nodeId: string;
  readonly outcome?: OutcomeId;
  readonly edgeId?: string;
  readonly metadata?: Readonly<Record<string, JsonValue>>;
};

export type ScenarioAssertionResult = {
  readonly assertionId: string;
  readonly passed: boolean;
  readonly staleReference: boolean;
};

export type ScenarioExecutionResult = {
  readonly scenarioId: string;
  readonly completed: boolean;
  readonly terminalNodeId?: string;
  readonly terminalOutcome?: TerminalOutcome;
  readonly steps: readonly SimulationStepV2[];
  readonly traversedEdgeIds: readonly string[];
  readonly assertionResults: readonly ScenarioAssertionResult[];
};

export type LocalizedContent = Readonly<Partial<Record<Locale, string>>>;

export type BlockVisibilityRule = {
  readonly condition: ConditionGroup;
};

export type InterfaceBlockBase = {
  readonly id: string;
  readonly hidden: boolean;
  readonly required: boolean;
  readonly visibility?: BlockVisibilityRule;
};

export type HeadingBlock = InterfaceBlockBase & {
  readonly kind: 'heading';
  readonly level: 1 | 2 | 3;
  readonly content: LocalizedContent;
};

export type TextBlock = InterfaceBlockBase & {
  readonly kind: 'text';
  readonly content: LocalizedContent;
};

export type IllustrationBlock = InterfaceBlockBase & {
  readonly kind: 'illustration';
  readonly source: 'asset' | 'url';
  readonly value: string;
  readonly alt: LocalizedContent;
};

export type ConsentBlock = InterfaceBlockBase & {
  readonly kind: 'consent';
  readonly scopeIds: readonly string[];
  readonly content: LocalizedContent;
  readonly consentRequired: boolean;
};

export type CredentialRequestBlock = InterfaceBlockBase & {
  readonly kind: 'credentialRequest';
  readonly credentialType: string;
  readonly content: LocalizedContent;
};

export type InterfaceFieldReference = {
  readonly nodeId?: string;
  readonly fieldId: string;
};

export type FieldSummaryBlock = InterfaceBlockBase & {
  readonly kind: 'fieldSummary';
  readonly fields: readonly InterfaceFieldReference[];
};

export type InstructionBlock = InterfaceBlockBase & {
  readonly kind: 'instruction';
  readonly content: LocalizedContent;
  readonly mediaAssetId?: string;
};

export type ProgressBlock = InterfaceBlockBase & {
  readonly kind: 'progress';
  readonly mode: 'determinate' | 'indeterminate' | 'steps';
  readonly value?: number;
};

export type StatusBlock = InterfaceBlockBase & {
  readonly kind: 'status';
  readonly tone: 'neutral' | 'info' | 'success' | 'warning' | 'error';
  readonly content: LocalizedContent;
};

export type InterfaceAction = {
  readonly id: string;
  readonly intent: 'primary' | 'secondary' | 'cancel' | 'retry' | 'continue';
  readonly label: LocalizedContent;
};

export type ActionGroupBlock = InterfaceBlockBase & {
  readonly kind: 'actionGroup';
  readonly actions: readonly InterfaceAction[];
};

export type InterfaceBlock =
  | HeadingBlock
  | TextBlock
  | IllustrationBlock
  | ConsentBlock
  | CredentialRequestBlock
  | FieldSummaryBlock
  | InstructionBlock
  | ProgressBlock
  | StatusBlock
  | ActionGroupBlock;

export type InterfaceScreenKind =
  | 'welcome'
  | 'consent'
  | 'module'
  | 'processing'
  | 'success'
  | 'error';

export type InterfaceScreenVariant = {
  readonly id: string;
  readonly state: InterfaceVariantState;
  readonly outcomes: readonly OutcomeId[];
  readonly blocks: readonly InterfaceBlock[];
};

export type InterfaceScreenV2 = {
  readonly id: string;
  readonly kind: InterfaceScreenKind;
  readonly sourceNodeId?: string;
  readonly variants: readonly InterfaceScreenVariant[];
};

export type SemanticColorTokens = {
  readonly primary: string;
  readonly onPrimary: string;
  readonly accent: string;
  readonly onAccent: string;
  readonly background: string;
  readonly surface: string;
  readonly text: string;
  readonly textMuted: string;
  readonly border: string;
  readonly success: string;
  readonly warning: string;
  readonly error: string;
  readonly focus: string;
};

export type TypographyTokens = {
  readonly fontFamily: string;
  readonly headingScale: number;
  readonly bodyScale: number;
  readonly lineHeight: number;
};

export type ControlTokens = {
  readonly height: number;
  readonly radius: number;
  readonly borderWidth: number;
};

export type BreakpointSafeArea = {
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
  readonly left: number;
};

export type SemanticTheme = {
  readonly light: SemanticColorTokens;
  readonly dark: SemanticColorTokens;
  readonly typography: TypographyTokens;
  readonly controls: ControlTokens;
  readonly borderRadius: number;
  readonly spacingScale: number;
  readonly elevation: 'none' | 'soft' | 'raised';
  readonly iconStyle: 'outline' | 'filled' | 'rounded';
  readonly motion: 'reduced' | 'standard';
  readonly branding: {
    readonly logoLightUrl: string;
    readonly logoDarkUrl: string;
    readonly faviconUrl: string;
    readonly illustrationAssetId?: string;
  };
  readonly safeAreas: {
    readonly mobile: BreakpointSafeArea;
    readonly tablet: BreakpointSafeArea;
    readonly desktop: BreakpointSafeArea;
  };
};

const DEFAULT_LIGHT_COLORS: SemanticColorTokens = {
  primary: '#354CE1',
  onPrimary: '#FFFFFF',
  accent: '#00BFA6',
  onAccent: '#071A16',
  background: '#F5F7FB',
  surface: '#FFFFFF',
  text: '#172033',
  textMuted: '#667085',
  border: '#D9DFEA',
  success: '#16855B',
  warning: '#B54708',
  error: '#B42318',
  focus: '#354CE1',
};

const DEFAULT_DARK_COLORS: SemanticColorTokens = {
  primary: '#8C9BFF',
  onPrimary: '#10173F',
  accent: '#53DDC8',
  onAccent: '#072923',
  background: '#10131C',
  surface: '#191E2B',
  text: '#F4F6FA',
  textMuted: '#A9B1C1',
  border: '#343B4B',
  success: '#54D39A',
  warning: '#FEC84B',
  error: '#FDA29B',
  focus: '#A4AEFF',
};

const EMPTY_SAFE_AREA: BreakpointSafeArea = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

export const DEFAULT_SEMANTIC_THEME: SemanticTheme = {
  light: DEFAULT_LIGHT_COLORS,
  dark: DEFAULT_DARK_COLORS,
  typography: {
    fontFamily: 'system',
    headingScale: 1,
    bodyScale: 1,
    lineHeight: 1.5,
  },
  controls: {
    height: 44,
    radius: 12,
    borderWidth: 1,
  },
  borderRadius: 20,
  spacingScale: 1,
  elevation: 'soft',
  iconStyle: 'outline',
  motion: 'standard',
  branding: {
    logoLightUrl: '',
    logoDarkUrl: '',
    faviconUrl: '',
  },
  safeAreas: {
    mobile: EMPTY_SAFE_AREA,
    tablet: EMPTY_SAFE_AREA,
    desktop: EMPTY_SAFE_AREA,
  },
};

export type InterfaceManifestV2 = {
  readonly schemaVersion: typeof INTERFACE_MANIFEST_SCHEMA_VERSION;
  readonly defaultLocale: Locale;
  readonly enabledLocales: readonly Locale[];
  readonly contentLocaleReviewRequired: boolean;
  readonly layout: 'card' | 'split' | 'fullscreen';
  readonly theme: SemanticTheme;
  readonly screens: readonly InterfaceScreenV2[];
  readonly orphanedScreens: readonly InterfaceScreenV2[];
};

export type AccessibilitySeverity = 'error' | 'warning';
export type AccessibilityIssueCode =
  | 'contrast'
  | 'headingOrder'
  | 'missingLabel'
  | 'missingAlt'
  | 'touchTarget'
  | 'missingFocusMetadata'
  | 'colorOnlyState'
  | 'reducedMotion';

export type AccessibilityIssue = {
  readonly code: AccessibilityIssueCode;
  readonly severity: AccessibilitySeverity;
  readonly screenId?: string;
  readonly variantId?: string;
  readonly blockId?: string;
};

export type AccessibilityReport = {
  readonly issues: readonly AccessibilityIssue[];
  readonly blocksExport: boolean;
};

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

export type CustomModuleDefinitionMetadata = {
  readonly description: string;
  readonly credentialType: string;
  readonly didResolverUrl: string;
  readonly verificationMethod: string;
  readonly issuerPolicy: IssuerPolicy;
  readonly successCondition: ConditionDefinition;
  readonly failureCondition: ConditionDefinition;
  readonly defaultUi: {
    readonly title: string;
    readonly description: string;
    readonly actionLabel: string;
  };
};

export type ModuleVersion = {
  readonly version: string;
  readonly status: ModuleLifecycleStatus;
  readonly contract: ModuleContract;
  readonly createdAt: string;
  readonly definition?: CustomModuleDefinitionMetadata;
};

export type ModulePackage = {
  readonly id: string;
  readonly name: string;
  readonly origin: ModuleOrigin;
  readonly activeVersion: string;
  readonly versions: readonly ModuleVersion[];
};

export type SubflowContract = {
  readonly inputFields: readonly FlowField[];
  readonly outputFields: readonly FlowField[];
  readonly successExitNodeId: string;
  readonly failureExitNodeId: string;
};

export type SubflowVersion = {
  readonly version: string;
  readonly status: ModuleLifecycleStatus;
  readonly contract: SubflowContract;
  readonly flow: DynamicFlowManifestV2;
  readonly createdAt: string;
};

export type SubflowPackage = {
  readonly id: string;
  readonly name: string;
  readonly activeVersion: string;
  readonly versions: readonly SubflowVersion[];
};

export type IntegrationMode = 'hosted' | 'embed' | 'redirect';
export type ResumePolicy = 'disabled' | 'sameDevice' | 'crossDevice';
export type IntegrationEvent =
  | 'started'
  | 'stepCompleted'
  | 'cancelled'
  | 'finished';

export type IntegrationSettings = {
  readonly mode: IntegrationMode;
  readonly allowedOrigins: readonly string[];
  readonly redirectUrls: readonly string[];
  readonly sessionTimeoutMinutes: number;
  readonly resumePolicy: ResumePolicy;
  readonly enabledEvents: readonly IntegrationEvent[];
  readonly resultFieldIds: readonly string[];
  readonly includePii: false;
};

export const DEFAULT_INTEGRATION_SETTINGS: IntegrationSettings = {
  mode: 'hosted',
  allowedOrigins: [],
  redirectUrls: [],
  sessionTimeoutMinutes: 30,
  resumePolicy: 'disabled',
  enabledEvents: ['started', 'finished'],
  resultFieldIds: [],
  includePii: false,
};

export type FlowProjectContentV2 = {
  readonly flow: DynamicFlowManifestV2;
  readonly interface: InterfaceManifestV2;
  readonly scenarios: readonly FlowScenario[];
  readonly integration: IntegrationSettings;
};

export type FlowProjectV2 = FlowProjectContentV2 & {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly createdAt: string;
  readonly updatedAt: string;
};

export type ProjectSnapshotV2 = {
  readonly projectId: string;
  readonly name: string;
  readonly description: string;
  readonly content: FlowProjectContentV2;
};

export type DraftRevisionReason =
  | 'manual'
  | 'beforeDestructiveChange'
  | 'rollback';

export type DraftRevision = {
  readonly id: string;
  readonly projectId: string;
  readonly revision: number;
  readonly reason: DraftRevisionReason;
  readonly createdAt: string;
  readonly snapshot: ProjectSnapshotV2;
};

export type DependencyLock = {
  readonly modules: readonly ModuleRef[];
  readonly subflows: readonly SubflowRef[];
};

export type ReleasePromotionStage = 'test' | 'staging' | 'production';

export type ReleasePromotion = {
  readonly stage: ReleasePromotionStage;
  readonly environmentId: string;
  readonly promotedAt: string;
};

export type FlowRelease = {
  readonly id: string;
  readonly projectId: string;
  readonly version: string;
  readonly createdAt: string;
  readonly snapshot: ProjectSnapshotV2;
  readonly dependencyLock: DependencyLock;
  readonly promotions: readonly ReleasePromotion[];
};

export type EnvironmentPublicConfig = Readonly<Record<string, JsonValue>>;

export type DashboardEnvironment = {
  readonly id: string;
  readonly stage: ReleasePromotionStage;
  readonly publicConfig: EnvironmentPublicConfig;
  readonly secretReferenceNames: readonly string[];
};

export type AnalysisThresholds = {
  readonly bottleneckCriticalPathRatio: number;
  readonly bottleneckDurationMs: number;
  readonly excessiveInteractionSteps: number;
  readonly excessiveEvidenceGroups: number;
  readonly excessiveDurationMs: number;
};

export const DEFAULT_ANALYSIS_THRESHOLDS: AnalysisThresholds = {
  bottleneckCriticalPathRatio: 0.4,
  bottleneckDurationMs: 10_000,
  excessiveInteractionSteps: 6,
  excessiveEvidenceGroups: 4,
  excessiveDurationMs: 120_000,
};

export type FlowAnalysisIssueCode =
  | 'untestedBranch'
  | 'unusedOutput'
  | 'duplicateDatabaseSource'
  | 'bottleneck'
  | 'excessiveEvidence';

export type FlowAnalysisIssue = {
  readonly id: string;
  readonly code: FlowAnalysisIssueCode;
  readonly severity: 'info' | 'warning' | 'error';
  readonly nodeIds: readonly string[];
  readonly edgeIds: readonly string[];
  readonly estimated: boolean;
  readonly metric?: number;
};

export type FlowAnalysisReport = {
  readonly projectId: string;
  readonly generatedAt: string;
  readonly thresholds: AnalysisThresholds;
  readonly issues: readonly FlowAnalysisIssue[];
  readonly edgeCoverage: Readonly<Record<string, boolean>>;
  readonly estimatedCriticalPathDurationMs: number;
  readonly estimatedInteractionSteps: number;
  readonly estimatedEvidenceGroups: number;
};

export type DashboardWorkspaceV2 = {
  readonly schemaVersion: typeof DASHBOARD_WORKSPACE_SCHEMA_VERSION;
  readonly savedAt: string;
  readonly projects: readonly FlowProjectV2[];
  readonly moduleCatalog: readonly ModulePackage[];
  readonly subflowCatalog: readonly SubflowPackage[];
  readonly draftRevisions: readonly DraftRevision[];
  readonly releases: readonly FlowRelease[];
  readonly environments: readonly DashboardEnvironment[];
};

export type DashboardWorkspaceLoadResult =
  | {
      readonly status: 'empty';
    }
  | {
      readonly status: 'ready' | 'migrated' | 'recovered';
      readonly workspace: DashboardWorkspaceV2;
    }
  | {
      readonly status: 'unsupportedNewerVersion';
      readonly rawValue: string;
      readonly schemaVersion: number;
    }
  | {
      readonly status: 'storageError' | 'corrupt';
      readonly rawValue?: string;
      readonly reason?:
        | 'readUnavailable'
        | 'cleanupWriteFailed'
        | 'migrationWriteFailed'
        | 'recoveryWriteFailed'
        | 'privacyViolation';
    };
