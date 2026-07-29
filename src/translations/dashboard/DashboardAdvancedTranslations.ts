/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

type MappingIssueKey =
  | 'missingRequiredInput'
  | 'missingTargetField'
  | 'missingSourceField'
  | 'sourceNotUpstream'
  | 'incompatibleType'
  | 'duplicateBinding'
  | 'staleBinding'
  | 'sensitiveLiteralRejected'
  | 'missingModuleVersion'
  | 'legacyCondition';

type ConditionOperatorKey =
  | 'equals'
  | 'notEquals'
  | 'contains'
  | 'startsWith'
  | 'endsWith'
  | 'greaterThan'
  | 'greaterThanOrEqual'
  | 'lessThan'
  | 'lessThanOrEqual'
  | 'exists'
  | 'notExists';

type InterfaceVariantStateKey =
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

type InterfaceBlockTypeKey =
  | 'heading'
  | 'text'
  | 'illustration'
  | 'consent'
  | 'credentialRequest'
  | 'fieldSummary'
  | 'instruction'
  | 'progress'
  | 'status'
  | 'actionGroup';

type AccessibilityCheckKey =
  | 'contrast'
  | 'headingOrder'
  | 'missingLabel'
  | 'missingAlt'
  | 'touchTarget'
  | 'missingFocusMetadata'
  | 'colorOnlyState'
  | 'reducedMotion';

type IntegrationEventKey =
  | 'started'
  | 'stepCompleted'
  | 'cancelled'
  | 'finished';

type FlowAnalysisIssueKey =
  | 'untestedBranch'
  | 'unusedOutput'
  | 'duplicateDatabaseSource'
  | 'bottleneck'
  | 'excessiveEvidence';

export type DashboardAdvancedCopy = {
  readonly common: {
    readonly add: string;
    readonly create: string;
    readonly save: string;
    readonly cancel: string;
    readonly close: string;
    readonly delete: string;
    readonly duplicate: string;
    readonly edit: string;
    readonly remove: string;
    readonly enabled: string;
    readonly disabled: string;
    readonly required: string;
    readonly optional: string;
    readonly loading: string;
    readonly noResults: string;
    readonly estimated: string;
  };
  readonly inspector: {
    readonly configurationTab: string;
    readonly dataTab: string;
    readonly configurationHint: string;
    readonly dataHint: string;
    readonly inputBindings: string;
    readonly addBinding: string;
    readonly targetInput: string;
    readonly valueSource: string;
    readonly flowInput: string;
    readonly nodeOutput: string;
    readonly literalValue: string;
    readonly noBindings: string;
  };
  readonly mappingIssues: Record<MappingIssueKey, string>;
  readonly conditions: {
    readonly title: string;
    readonly description: string;
    readonly matchAll: string;
    readonly matchAny: string;
    readonly addRule: string;
    readonly addGroup: string;
    readonly removeRule: string;
    readonly removeGroup: string;
    readonly leftValue: string;
    readonly operator: string;
    readonly rightValue: string;
    readonly legacyTitle: string;
    readonly legacyDescription: string;
    readonly convertLegacy: string;
  };
  readonly conditionOperators: Record<ConditionOperatorKey, string>;
  readonly databaseStrategy: {
    readonly title: string;
    readonly description: string;
    readonly executionMode: string;
    readonly parallel: string;
    readonly sequential: string;
    readonly aggregation: string;
    readonly anyMatch: string;
    readonly allClear: string;
    readonly quorum: string;
    readonly weighted: string;
    readonly quorumCount: string;
    readonly weightedThreshold: string;
    readonly sourceWeight: string;
    readonly stopOnMatch: string;
    readonly requiredSources: string;
    readonly unavailablePolicy: string;
    readonly continueOnUnavailable: string;
    readonly markInconclusive: string;
    readonly returnSourceUnavailable: string;
    readonly sourceOrder: string;
    readonly sourceOrderHint: string;
    readonly explanation: string;
  };
  readonly scenarios: {
    readonly title: string;
    readonly description: string;
    readonly createScenario: string;
    readonly scenarioName: string;
    readonly scenarioNamePlaceholder: string;
    readonly syntheticPreset: string;
    readonly syntheticNotice: string;
    readonly expectedTerminal: string;
    readonly expectedPath: string;
    readonly assertions: string;
    readonly addAssertion: string;
    readonly run: string;
    readonly runAll: string;
    readonly running: string;
    readonly duplicateScenario: string;
    readonly deleteScenario: string;
    readonly emptyTitle: string;
    readonly emptyDescription: string;
    readonly passed: string;
    readonly failed: string;
    readonly stale: string;
    readonly notRun: string;
    readonly batchSummary: string;
    readonly coverage: string;
    readonly coveredBranches: string;
    readonly uncoveredBranches: string;
    readonly focusBranch: string;
  };
  readonly journey: {
    readonly title: string;
    readonly description: string;
    readonly selectScenario: string;
    readonly noScenario: string;
    readonly runPreview: string;
    readonly previousStep: string;
    readonly nextStep: string;
    readonly restart: string;
    readonly autoplay: string;
    readonly pause: string;
    readonly executionLog: string;
    readonly currentStep: string;
    readonly noResultTitle: string;
    readonly noResultDescription: string;
  };
  readonly variantStates: Record<InterfaceVariantStateKey, string>;
  readonly studio: {
    readonly variants: string;
    readonly addVariant: string;
    readonly duplicateVariant: string;
    readonly deleteVariant: string;
    readonly variantState: string;
    readonly linkedOutcomes: string;
    readonly defaultVariant: string;
    readonly orphanedVariant: string;
    readonly previewDevice: string;
    readonly previewTheme: string;
  };
  readonly blocks: {
    readonly title: string;
    readonly addBlock: string;
    readonly duplicateBlock: string;
    readonly hideBlock: string;
    readonly showBlock: string;
    readonly moveUp: string;
    readonly moveDown: string;
    readonly deleteBlock: string;
    readonly requiredBlock: string;
    readonly requiredBlockHint: string;
    readonly emptyTitle: string;
    readonly emptyDescription: string;
    readonly content: string;
    readonly visibility: string;
    readonly alwaysVisible: string;
    readonly conditionalVisibility: string;
    readonly blockSettings: string;
  };
  readonly blockTypes: Record<InterfaceBlockTypeKey, string>;
  readonly localization: {
    readonly title: string;
    readonly defaultLocale: string;
    readonly enabledLocales: string;
    readonly previewLocale: string;
    readonly translationStatus: string;
    readonly complete: string;
    readonly missing: string;
    readonly missingTranslation: string;
    readonly copyFromDefault: string;
    readonly useDefaultPreview: string;
    readonly fallbackBadge: string;
    readonly overflowWarning: string;
    readonly reviewRequired: string;
  };
  readonly theme: {
    readonly title: string;
    readonly lightMode: string;
    readonly darkMode: string;
    readonly semanticColors: string;
    readonly typography: string;
    readonly controls: string;
    readonly borders: string;
    readonly elevation: string;
    readonly iconStyle: string;
    readonly motion: string;
    readonly branding: string;
    readonly logoLight: string;
    readonly logoDark: string;
    readonly favicon: string;
    readonly standardMotion: string;
    readonly reducedMotion: string;
    readonly mobile: string;
    readonly tablet: string;
    readonly desktop: string;
    readonly safeArea: string;
  };
  readonly accessibility: {
    readonly title: string;
    readonly description: string;
    readonly runAudit: string;
    readonly checking: string;
    readonly passed: string;
    readonly errors: string;
    readonly warnings: string;
    readonly noIssues: string;
    readonly fixIssue: string;
    readonly exportBlocked: string;
    readonly exportWarning: string;
  };
  readonly accessibilityChecks: Record<AccessibilityCheckKey, string>;
  readonly modules: {
    readonly title: string;
    readonly description: string;
    readonly activeVersion: string;
    readonly active: string;
    readonly deprecated: string;
    readonly createVersion: string;
    readonly versionHistory: string;
    readonly usage: string;
    readonly noUsage: string;
    readonly checkCompatibility: string;
    readonly compatible: string;
    readonly breakingChanges: string;
    readonly upgrade: string;
    readonly importManifest: string;
    readonly exportManifest: string;
    readonly deleteBlocked: string;
  };
  readonly subflows: {
    readonly title: string;
    readonly description: string;
    readonly createFromSelection: string;
    readonly selectionRequirement: string;
    readonly entryNode: string;
    readonly successExit: string;
    readonly failureExit: string;
    readonly inputContract: string;
    readonly outputContract: string;
    readonly versionHistory: string;
    readonly usage: string;
    readonly recursionBlocked: string;
    readonly depthLimit: string;
    readonly emptyTitle: string;
    readonly emptyDescription: string;
  };
  readonly revisions: {
    readonly title: string;
    readonly description: string;
    readonly createCheckpoint: string;
    readonly checkpointName: string;
    readonly automatic: string;
    readonly manual: string;
    readonly beforeDestructiveChange: string;
    readonly compare: string;
    readonly rollback: string;
    readonly currentDraft: string;
    readonly emptyTitle: string;
    readonly emptyDescription: string;
    readonly retentionNotice: string;
  };
  readonly releases: {
    readonly title: string;
    readonly description: string;
    readonly createRelease: string;
    readonly releaseName: string;
    readonly releaseNotes: string;
    readonly immutableSnapshot: string;
    readonly dependencyLock: string;
    readonly test: string;
    readonly staging: string;
    readonly production: string;
    readonly promote: string;
    readonly validationRequired: string;
    readonly scenariosRequired: string;
    readonly stagingRequired: string;
    readonly dependenciesRequired: string;
    readonly emptyTitle: string;
    readonly emptyDescription: string;
  };
  readonly environments: {
    readonly title: string;
    readonly description: string;
    readonly publicConfiguration: string;
    readonly secretReferences: string;
    readonly addVariable: string;
    readonly variableName: string;
    readonly publicValue: string;
    readonly secretReference: string;
    readonly secretNotice: string;
    readonly emptyTitle: string;
    readonly invalidReference: string;
    readonly deleteVariable: string;
  };
  readonly integration: {
    readonly title: string;
    readonly description: string;
    readonly mode: string;
    readonly hosted: string;
    readonly embed: string;
    readonly redirect: string;
    readonly allowedOrigins: string;
    readonly addOrigin: string;
    readonly redirectUrls: string;
    readonly addRedirectUrl: string;
    readonly sessionTimeout: string;
    readonly resumePolicy: string;
    readonly resumeDisabled: string;
    readonly sameDevice: string;
    readonly crossDevice: string;
    readonly events: string;
    readonly resultFields: string;
    readonly piiDisabled: string;
    readonly wildcardRejected: string;
    readonly httpsRequired: string;
    readonly validateManifest: string;
  };
  readonly integrationEvents: Record<IntegrationEventKey, string>;
  readonly analysis: {
    readonly title: string;
    readonly description: string;
    readonly runAnalysis: string;
    readonly analyzing: string;
    readonly noIssues: string;
    readonly severity: string;
    readonly critical: string;
    readonly warning: string;
    readonly information: string;
    readonly focusItem: string;
    readonly estimatedLatency: string;
    readonly estimatedCost: string;
    readonly thresholds: string;
  };
  readonly analysisIssues: Record<FlowAnalysisIssueKey, string>;
  readonly storage: {
    readonly localOnly: string;
    readonly migrating: string;
    readonly migrationComplete: string;
    readonly migrationFailed: string;
    readonly backupCreated: string;
    readonly recovered: string;
    readonly unsupportedVersionTitle: string;
    readonly unsupportedVersionDescription: string;
    readonly quotaTitle: string;
    readonly quotaDescription: string;
    readonly readError: string;
    readonly readErrorDescription: string;
    readonly privacyErrorDescription: string;
    readonly writeError: string;
    readonly retry: string;
  };
  readonly aria: {
    readonly advancedWorkspace: string;
    readonly inspectorTabs: string;
    readonly mappingRow: string;
    readonly conditionGroup: string;
    readonly conditionRule: string;
    readonly databaseSourceOrder: string;
    readonly scenarioActions: string;
    readonly scenarioResults: string;
    readonly journeyTimeline: string;
    readonly blockList: string;
    readonly blockActions: string;
    readonly previewFrame: string;
    readonly localeSelector: string;
    readonly themeSelector: string;
    readonly analysisResults: string;
    readonly closeDialog: string;
  };
  readonly operationErrors: {
    readonly moduleVersionMissing: string;
    readonly moduleVersionConflict: string;
    readonly moduleStillInUse: string;
    readonly moduleLifecycleBlocked: string;
    readonly requiredInputsMissing: string;
    readonly moduleManifestInvalid: string;
    readonly subflowSelectionInvalid: string;
    readonly subflowDependencyInvalid: string;
    readonly subflowVersionConflict: string;
    readonly revisionUnavailable: string;
    readonly releaseVersionInvalid: string;
    readonly releaseValidationRequired: string;
    readonly releaseScenariosRequired: string;
    readonly releaseStagingRequired: string;
    readonly releaseDependenciesInvalid: string;
    readonly releaseAlreadyPromoted: string;
    readonly environmentInvalid: string;
    readonly originInvalid: string;
    readonly redirectInvalid: string;
    readonly integrationInvalid: string;
    readonly operationFailed: string;
  };
  readonly toasts: {
    readonly bindingSaved: string;
    readonly bindingRemoved: string;
    readonly conditionSaved: string;
    readonly strategySaved: string;
    readonly scenarioCreated: string;
    readonly scenarioDuplicated: string;
    readonly scenarioDeleted: string;
    readonly scenarioRunComplete: string;
    readonly batchComplete: string;
    readonly journeyReady: string;
    readonly variantCreated: string;
    readonly variantDeleted: string;
    readonly blockAdded: string;
    readonly blockDuplicated: string;
    readonly blockDeleted: string;
    readonly translationCopied: string;
    readonly themeSaved: string;
    readonly accessibilityAuditComplete: string;
    readonly moduleVersionCreated: string;
    readonly moduleImported: string;
    readonly moduleDeleted: string;
    readonly moduleUpgradeComplete: string;
    readonly moduleDeprecated: string;
    readonly subflowCreated: string;
    readonly subflowVersionCreated: string;
    readonly subflowDeleted: string;
    readonly checkpointCreated: string;
    readonly rollbackComplete: string;
    readonly releaseCreated: string;
    readonly promotionComplete: string;
    readonly environmentVariableSaved: string;
    readonly environmentVariableDeleted: string;
    readonly integrationValid: string;
    readonly integrationInvalid: string;
    readonly analysisComplete: string;
    readonly storageRetrySucceeded: string;
  };
  readonly modals: {
    readonly deleteScenarioTitle: string;
    readonly deleteScenarioDescription: string;
    readonly deleteBlockTitle: string;
    readonly deleteBlockDescription: string;
    readonly deleteVariantTitle: string;
    readonly deleteVariantDescription: string;
    readonly deprecateModuleTitle: string;
    readonly deprecateModuleDescription: string;
    readonly deleteModuleTitle: string;
    readonly deleteModuleDescription: string;
    readonly importModuleTitle: string;
    readonly importModuleDescription: string;
    readonly createSubflowTitle: string;
    readonly createSubflowDescription: string;
    readonly deleteSubflowTitle: string;
    readonly deleteSubflowDescription: string;
    readonly createCheckpointTitle: string;
    readonly createCheckpointDescription: string;
    readonly rollbackTitle: string;
    readonly rollbackDescription: string;
    readonly createReleaseTitle: string;
    readonly createReleaseDescription: string;
    readonly promoteReleaseTitle: string;
    readonly promoteReleaseDescription: string;
    readonly deleteVariableTitle: string;
    readonly deleteVariableDescription: string;
    readonly convertLegacyTitle: string;
    readonly convertLegacyDescription: string;
    readonly copyDefaultTranslationTitle: string;
    readonly copyDefaultTranslationDescription: string;
  };
};

const en: DashboardAdvancedCopy = {
  common: {
    add: 'Add',
    create: 'Create',
    save: 'Save',
    cancel: 'Cancel',
    close: 'Close',
    delete: 'Delete',
    duplicate: 'Duplicate',
    edit: 'Edit',
    remove: 'Remove',
    enabled: 'Enabled',
    disabled: 'Disabled',
    required: 'Required',
    optional: 'Optional',
    loading: 'Loading',
    noResults: 'No results',
    estimated: 'Estimated',
  },
  inspector: {
    configurationTab: 'Configuration',
    dataTab: 'Data',
    configurationHint: 'Configure module behavior and result branches.',
    dataHint: 'Map typed values into this node.',
    inputBindings: 'Input mappings',
    addBinding: 'Add mapping',
    targetInput: 'Target input',
    valueSource: 'Value source',
    flowInput: 'Flow input',
    nodeOutput: 'Upstream node output',
    literalValue: 'Literal value',
    noBindings: 'No input mappings configured.',
  },
  mappingIssues: {
    missingRequiredInput: 'A required input has not been mapped.',
    missingTargetField: 'The target field no longer exists.',
    missingSourceField: 'The source field no longer exists.',
    sourceNotUpstream: 'The selected source is not an upstream node.',
    incompatibleType: 'The source and target types do not match.',
    duplicateBinding: 'This input has more than one mapping.',
    staleBinding: 'This mapping contains an outdated reference.',
    sensitiveLiteralRejected: 'Sensitive values cannot be stored as literals.',
    missingModuleVersion: 'The pinned module version is unavailable.',
    legacyCondition: 'This legacy expression must be converted before it can run.',
  },
  conditions: {
    title: 'Condition builder',
    description: 'Build safe decision rules without executable expressions.',
    matchAll: 'Match all rules',
    matchAny: 'Match any rule',
    addRule: 'Add rule',
    addGroup: 'Add group',
    removeRule: 'Remove rule',
    removeGroup: 'Remove group',
    leftValue: 'Left value',
    operator: 'Operator',
    rightValue: 'Right value',
    legacyTitle: 'Legacy condition',
    legacyDescription: 'The original expression is preserved but will not be executed.',
    convertLegacy: 'Convert to rules',
  },
  conditionOperators: {
    equals: 'Equals',
    notEquals: 'Does not equal',
    contains: 'Contains',
    startsWith: 'Starts with',
    endsWith: 'Ends with',
    greaterThan: 'Greater than',
    greaterThanOrEqual: 'Greater than or equal to',
    lessThan: 'Less than',
    lessThanOrEqual: 'Less than or equal to',
    exists: 'Exists',
    notExists: 'Does not exist',
  },
  databaseStrategy: {
    title: 'Database strategy',
    description: 'Control how selected sources run and how their results are combined.',
    executionMode: 'Execution mode',
    parallel: 'Run in parallel',
    sequential: 'Run sequentially',
    aggregation: 'Result aggregation',
    anyMatch: 'Any source matches',
    allClear: 'All sources are clear',
    quorum: 'Quorum',
    weighted: 'Weighted score',
    quorumCount: 'Required source count',
    weightedThreshold: 'Match threshold',
    sourceWeight: 'Source weight',
    stopOnMatch: 'Stop after a match',
    requiredSources: 'Required sources',
    unavailablePolicy: 'Unavailable-source policy',
    continueOnUnavailable: 'Continue with available sources',
    markInconclusive: 'Return inconclusive',
    returnSourceUnavailable: 'Return source unavailable',
    sourceOrder: 'Source order',
    sourceOrderHint: 'This order is used for sequential execution.',
    explanation: 'Result explanation',
  },
  scenarios: {
    title: 'Test scenarios',
    description: 'Save synthetic cases and verify every decision path.',
    createScenario: 'Create scenario',
    scenarioName: 'Scenario name',
    scenarioNamePlaceholder: 'International source unavailable',
    syntheticPreset: 'Synthetic input preset',
    syntheticNotice: 'Use fictional presets only. Never enter real identity data.',
    expectedTerminal: 'Expected terminal',
    expectedPath: 'Expected path',
    assertions: 'Assertions',
    addAssertion: 'Add assertion',
    run: 'Run scenario',
    runAll: 'Run all enabled',
    running: 'Running scenarios',
    duplicateScenario: 'Duplicate scenario',
    deleteScenario: 'Delete scenario',
    emptyTitle: 'No scenarios yet',
    emptyDescription: 'Create a synthetic scenario to test a complete path.',
    passed: 'Passed',
    failed: 'Failed',
    stale: 'Outdated reference',
    notRun: 'Not run',
    batchSummary: '{passed} passed, {failed} failed',
    coverage: 'Branch coverage',
    coveredBranches: 'Covered branches',
    uncoveredBranches: 'Uncovered branches',
    focusBranch: 'Focus branch',
  },
  journey: {
    title: 'Journey preview',
    description: 'Replay the interface along the selected simulation path.',
    selectScenario: 'Select scenario',
    noScenario: 'No scenario selected',
    runPreview: 'Run preview',
    previousStep: 'Previous step',
    nextStep: 'Next step',
    restart: 'Restart',
    autoplay: 'Play automatically',
    pause: 'Pause',
    executionLog: 'Execution log',
    currentStep: 'Step {current} of {total}',
    noResultTitle: 'No simulation result',
    noResultDescription: 'Run a scenario to build the preview journey.',
  },
  variantStates: {
    default: 'Default',
    intro: 'Introduction',
    permission: 'Permission',
    input: 'Input',
    capture: 'Capture',
    processing: 'Processing',
    success: 'Success',
    error: 'Error',
    retry: 'Retry',
    matched: 'Matched',
    notMatched: 'Not matched',
    inconclusive: 'Inconclusive',
    sourceUnavailable: 'Source unavailable',
  },
  studio: {
    variants: 'Screen variants',
    addVariant: 'Add variant',
    duplicateVariant: 'Duplicate variant',
    deleteVariant: 'Delete variant',
    variantState: 'Variant state',
    linkedOutcomes: 'Linked outcomes',
    defaultVariant: 'Default variant',
    orphanedVariant: 'Unlinked variant',
    previewDevice: 'Preview device',
    previewTheme: 'Preview theme',
  },
  blocks: {
    title: 'Structured blocks',
    addBlock: 'Add block',
    duplicateBlock: 'Duplicate block',
    hideBlock: 'Hide block',
    showBlock: 'Show block',
    moveUp: 'Move up',
    moveDown: 'Move down',
    deleteBlock: 'Delete block',
    requiredBlock: 'Required block',
    requiredBlockHint: 'This block is required by the screen contract and cannot be deleted.',
    emptyTitle: 'This variant has no blocks',
    emptyDescription: 'Add a structured block to compose the screen.',
    content: 'Block content',
    visibility: 'Visibility',
    alwaysVisible: 'Always visible',
    conditionalVisibility: 'Show when rules match',
    blockSettings: 'Block settings',
  },
  blockTypes: {
    heading: 'Heading',
    text: 'Text',
    illustration: 'Illustration',
    consent: 'Consent',
    credentialRequest: 'Credential request',
    fieldSummary: 'Field summary',
    instruction: 'Instruction',
    progress: 'Progress',
    status: 'Status',
    actionGroup: 'Action group',
  },
  localization: {
    title: 'Interface languages',
    defaultLocale: 'Default language',
    enabledLocales: 'Enabled languages',
    previewLocale: 'Preview language',
    translationStatus: 'Translation status',
    complete: 'Complete',
    missing: 'Missing',
    missingTranslation: 'This content is missing in the selected language.',
    copyFromDefault: 'Copy from default language',
    useDefaultPreview: 'Preview default-language content',
    fallbackBadge: 'Default-language preview',
    overflowWarning: 'This translation may overflow its container.',
    reviewRequired: 'Language review required',
  },
  theme: {
    title: 'Design system',
    lightMode: 'Light mode',
    darkMode: 'Dark mode',
    semanticColors: 'Semantic colors',
    typography: 'Typography',
    controls: 'Controls',
    borders: 'Borders',
    elevation: 'Elevation',
    iconStyle: 'Icon style',
    motion: 'Motion',
    branding: 'Brand assets',
    logoLight: 'Logo for light backgrounds',
    logoDark: 'Logo for dark backgrounds',
    favicon: 'Favicon URL',
    standardMotion: 'Standard motion',
    reducedMotion: 'Reduced motion',
    mobile: 'Mobile',
    tablet: 'Tablet',
    desktop: 'Desktop',
    safeArea: 'Safe area',
  },
  accessibility: {
    title: 'Accessibility inspector',
    description: 'Check the interface against essential accessibility requirements.',
    runAudit: 'Run accessibility audit',
    checking: 'Checking accessibility',
    passed: 'Audit passed',
    errors: 'Errors',
    warnings: 'Warnings',
    noIssues: 'No accessibility issues found.',
    fixIssue: 'Open affected item',
    exportBlocked: 'Resolve accessibility errors before export.',
    exportWarning: 'Warnings do not block export but should be reviewed.',
  },
  accessibilityChecks: {
    contrast: 'Text and control contrast does not meet WCAG AA.',
    headingOrder: 'Heading levels are not in a logical order.',
    missingLabel: 'An interactive control has no accessible label.',
    missingAlt: 'An informative illustration has no alternative text.',
    touchTarget: 'A touch target is smaller than 44 pixels.',
    missingFocusMetadata: 'A control has no visible focus behavior.',
    colorOnlyState: 'A state is communicated by color alone.',
    reducedMotion: 'Motion does not respect the reduced-motion preference.',
  },
  modules: {
    title: 'Module catalog',
    description: 'Manage immutable verification module versions and their usage.',
    activeVersion: 'Active version',
    active: 'Active',
    deprecated: 'Deprecated',
    createVersion: 'Create new version',
    versionHistory: 'Version history',
    usage: 'Used by flows',
    noUsage: 'This version is not used by any flow.',
    checkCompatibility: 'Check compatibility',
    compatible: 'Compatible upgrade',
    breakingChanges: 'Breaking changes',
    upgrade: 'Upgrade flows',
    importManifest: 'Import manifest',
    exportManifest: 'Export manifest',
    deleteBlocked: 'A referenced module version cannot be deleted.',
  },
  subflows: {
    title: 'Reusable subflows',
    description: 'Package a connected graph selection for reuse across flows.',
    createFromSelection: 'Create subflow from selection',
    selectionRequirement: 'Select one connected acyclic graph with one entry and two exits.',
    entryNode: 'Entry node',
    successExit: 'Success exit',
    failureExit: 'Failure exit',
    inputContract: 'Input contract',
    outputContract: 'Output contract',
    versionHistory: 'Version history',
    usage: 'Used by flows',
    recursionBlocked: 'A subflow cannot reference itself directly or indirectly.',
    depthLimit: 'Simulation supports a maximum nesting depth of 10.',
    emptyTitle: 'No reusable subflows',
    emptyDescription: 'Select compatible nodes on the canvas to create one.',
  },
  revisions: {
    title: 'Draft history',
    description: 'Create checkpoints, compare changes, and restore an earlier draft.',
    createCheckpoint: 'Create checkpoint',
    checkpointName: 'Checkpoint name',
    automatic: 'Automatic checkpoint',
    manual: 'Manual checkpoint',
    beforeDestructiveChange: 'Before destructive change',
    compare: 'Compare',
    rollback: 'Restore as new draft',
    currentDraft: 'Current draft',
    emptyTitle: 'No checkpoints yet',
    emptyDescription: 'A checkpoint will appear after a manual save or protected change.',
    retentionNotice: 'Up to 20 revisions are retained for each project.',
  },
  releases: {
    title: 'Releases',
    description: 'Create immutable snapshots and promote them through environments.',
    createRelease: 'Create release',
    releaseName: 'Release name',
    releaseNotes: 'Release notes',
    immutableSnapshot: 'Immutable snapshot',
    dependencyLock: 'Dependency lock',
    test: 'Test',
    staging: 'Staging',
    production: 'Production',
    promote: 'Promote',
    validationRequired: 'The flow must pass validation before Test.',
    scenariosRequired: 'All enabled scenarios must pass before Staging.',
    stagingRequired: 'The release must pass Staging before Production.',
    dependenciesRequired: 'All pinned dependencies must be available.',
    emptyTitle: 'No releases yet',
    emptyDescription: 'Create a release from a valid draft.',
  },
  environments: {
    title: 'Environment configuration',
    description: 'Store public values and secret reference names for each environment.',
    publicConfiguration: 'Public configuration',
    secretReferences: 'Secret references',
    addVariable: 'Add variable',
    variableName: 'Variable name',
    publicValue: 'Public value',
    secretReference: 'Secret reference name',
    secretNotice: 'Secret values are never stored in this workspace.',
    emptyTitle: 'No environment variables',
    invalidReference: 'Enter a valid secret reference name, not a secret value.',
    deleteVariable: 'Delete variable',
  },
  integration: {
    title: 'Integration settings',
    description: 'Define how an application launches the flow and receives safe results.',
    mode: 'Integration mode',
    hosted: 'Hosted',
    embed: 'Embedded',
    redirect: 'Redirect',
    allowedOrigins: 'Allowed origins',
    addOrigin: 'Add origin',
    redirectUrls: 'Redirect URLs',
    addRedirectUrl: 'Add redirect URL',
    sessionTimeout: 'Session timeout in minutes',
    resumePolicy: 'Resume policy',
    resumeDisabled: 'Do not resume',
    sameDevice: 'Resume on the same device',
    crossDevice: 'Resume across devices',
    events: 'Enabled events',
    resultFields: 'Safe result fields',
    piiDisabled: 'Personal data export is always disabled.',
    wildcardRejected: 'Wildcard origins are not allowed.',
    httpsRequired: 'Use HTTPS, except for localhost development.',
    validateManifest: 'Validate integration',
  },
  integrationEvents: {
    started: 'Flow started',
    stepCompleted: 'Step completed',
    cancelled: 'Flow cancelled',
    finished: 'Flow finished',
  },
  analysis: {
    title: 'Flow analysis',
    description: 'Find coverage gaps, unused data, bottlenecks, and excessive evidence.',
    runAnalysis: 'Run analysis',
    analyzing: 'Analyzing flow',
    noIssues: 'No analysis findings.',
    severity: 'Severity',
    critical: 'Critical',
    warning: 'Warning',
    information: 'Information',
    focusItem: 'Focus on canvas',
    estimatedLatency: 'Estimated duration',
    estimatedCost: 'Estimated cost',
    thresholds: 'Analysis thresholds',
  },
  analysisIssues: {
    untestedBranch: 'This branch is not covered by an enabled scenario.',
    unusedOutput: 'A produced output is not used downstream.',
    duplicateDatabaseSource: 'The same database source is queried more than once.',
    bottleneck: 'This step may be a bottleneck on the critical path.',
    excessiveEvidence: 'This journey may request more evidence than necessary.',
  },
  storage: {
    localOnly: 'Workspace data stays in this browser and must not contain real identity data.',
    migrating: 'Upgrading workspace data',
    migrationComplete: 'Workspace data was upgraded successfully.',
    migrationFailed: 'Workspace data could not be upgraded.',
    backupCreated: 'A backup of the previous workspace was preserved.',
    recovered: 'A clean workspace was opened after a storage error.',
    unsupportedVersionTitle: 'Newer workspace version detected',
    unsupportedVersionDescription: 'Update the application before opening this workspace. Your data was left unchanged.',
    quotaTitle: 'Browser storage is full',
    quotaDescription: 'Remove unused drafts or export a manifest before trying again.',
    readError: 'Workspace data could not be read.',
    readErrorDescription: 'Check this site’s browser storage permission, then reload the page.',
    privacyErrorDescription: 'The workspace is open in recovery mode. Remove saved literal identity values, unsafe fixture metadata, or secret values before saving again.',
    writeError: 'Changes could not be saved to browser storage.',
    retry: 'Retry storage operation',
  },
  aria: {
    advancedWorkspace: 'Advanced verification workspace',
    inspectorTabs: 'Node inspector sections',
    mappingRow: 'Input mapping',
    conditionGroup: 'Condition group',
    conditionRule: 'Condition rule',
    databaseSourceOrder: 'Database source execution order',
    scenarioActions: 'Scenario actions',
    scenarioResults: 'Scenario results',
    journeyTimeline: 'Preview journey timeline',
    blockList: 'Structured interface blocks',
    blockActions: 'Block actions',
    previewFrame: 'Verification interface preview',
    localeSelector: 'Preview language selector',
    themeSelector: 'Preview theme selector',
    analysisResults: 'Flow analysis results',
    closeDialog: 'Close dialog',
  },
  operationErrors: {
    moduleVersionMissing: 'The selected module version is no longer available.',
    moduleVersionConflict: 'That module version already exists.',
    moduleStillInUse: 'This module cannot be deleted while a flow, subflow, or release still uses it.',
    moduleLifecycleBlocked: 'This module lifecycle change is not allowed in its current state.',
    requiredInputsMissing: 'Map the newly required inputs before upgrading this node.',
    moduleManifestInvalid: 'The module manifest is not valid JSON or does not match the supported contract.',
    subflowSelectionInvalid: 'Select one connected, acyclic region with one entry and distinct success and failure exits.',
    subflowDependencyInvalid: 'This subflow would create a missing, recursive, or overly deep dependency.',
    subflowVersionConflict: 'That subflow version already exists.',
    revisionUnavailable: 'This checkpoint is unavailable or belongs to another flow.',
    releaseVersionInvalid: 'Enter a unique, non-empty release version.',
    releaseValidationRequired: 'Resolve all flow validation errors before promoting to Test.',
    releaseScenariosRequired: 'Every enabled scenario must run and pass before promoting to Staging.',
    releaseStagingRequired: 'Promote this release through the previous environment first.',
    releaseDependenciesInvalid: 'One or more locked module or subflow dependencies are unavailable.',
    releaseAlreadyPromoted: 'This release has already been promoted to that environment.',
    environmentInvalid: 'The environment contains an invalid stage, public value, or secret reference name.',
    originInvalid: 'Enter a unique HTTPS origin. Localhost may use HTTP; wildcards are not allowed.',
    redirectInvalid: 'Enter a unique HTTPS redirect URL. Localhost may use HTTP.',
    integrationInvalid: 'Resolve the integration settings highlighted above before continuing.',
    operationFailed: 'The operation could not be completed. Review the current configuration and try again.',
  },
  toasts: {
    bindingSaved: 'Input mapping saved.',
    bindingRemoved: 'Input mapping removed.',
    conditionSaved: 'Condition rules saved.',
    strategySaved: 'Database strategy saved.',
    scenarioCreated: 'Scenario created.',
    scenarioDuplicated: 'Scenario duplicated.',
    scenarioDeleted: 'Scenario deleted.',
    scenarioRunComplete: 'Scenario run completed.',
    batchComplete: 'Scenario batch completed.',
    journeyReady: 'Preview journey is ready.',
    variantCreated: 'Screen variant created.',
    variantDeleted: 'Screen variant deleted.',
    blockAdded: 'Block added.',
    blockDuplicated: 'Block duplicated.',
    blockDeleted: 'Block deleted.',
    translationCopied: 'Default-language content copied.',
    themeSaved: 'Design system saved.',
    accessibilityAuditComplete: 'Accessibility audit completed.',
    moduleVersionCreated: 'Module version created.',
    moduleImported: 'Module manifest imported.',
    moduleDeleted: 'Module deleted.',
    moduleUpgradeComplete: 'Module upgrade completed.',
    moduleDeprecated: 'Module version deprecated.',
    subflowCreated: 'Reusable subflow created.',
    subflowVersionCreated: 'Subflow version created.',
    subflowDeleted: 'Reusable subflow deleted.',
    checkpointCreated: 'Draft checkpoint created.',
    rollbackComplete: 'Earlier content restored as a new draft.',
    releaseCreated: 'Release created.',
    promotionComplete: 'Release promoted successfully.',
    environmentVariableSaved: 'Environment variable saved.',
    environmentVariableDeleted: 'Environment variable deleted.',
    integrationValid: 'Integration settings are valid.',
    integrationInvalid: 'Integration settings contain errors.',
    analysisComplete: 'Flow analysis completed.',
    storageRetrySucceeded: 'Workspace storage is available again.',
  },
  modals: {
    deleteScenarioTitle: 'Delete this scenario?',
    deleteScenarioDescription: 'The synthetic fixtures and assertions in this scenario will be removed.',
    deleteBlockTitle: 'Delete this block?',
    deleteBlockDescription: 'The block and its localized content will be removed from this variant.',
    deleteVariantTitle: 'Delete this screen variant?',
    deleteVariantDescription: 'All structured blocks and localized content in this variant will be removed.',
    deprecateModuleTitle: 'Deprecate this module version?',
    deprecateModuleDescription: 'Existing flows remain pinned, but new flows will not use this version.',
    deleteModuleTitle: 'Delete this module?',
    deleteModuleDescription: 'Only unused module packages and versions can be deleted.',
    importModuleTitle: 'Import module manifest',
    importModuleDescription: 'Only validated JSON manifests are accepted. Imported content is never executed.',
    createSubflowTitle: 'Create reusable subflow',
    createSubflowDescription: 'Review the entry, exits, and data contract before creating the first version.',
    deleteSubflowTitle: 'Delete this reusable subflow?',
    deleteSubflowDescription: 'Only subflows that are not referenced by a flow or release can be deleted.',
    createCheckpointTitle: 'Create draft checkpoint',
    createCheckpointDescription: 'Capture the current draft so you can compare or restore it later.',
    rollbackTitle: 'Restore this revision?',
    rollbackDescription: 'A new draft revision will be created. Existing history will not be changed.',
    createReleaseTitle: 'Create immutable release',
    createReleaseDescription: 'The current flow, interface, and dependency versions will be locked.',
    promoteReleaseTitle: 'Promote this release?',
    promoteReleaseDescription: 'The destination environment requirements will be checked first.',
    deleteVariableTitle: 'Delete this environment variable?',
    deleteVariableDescription: 'The public value or secret reference name will be removed.',
    convertLegacyTitle: 'Convert legacy condition?',
    convertLegacyDescription: 'Review the generated rules carefully. The original expression will not be executed.',
    copyDefaultTranslationTitle: 'Replace this translation?',
    copyDefaultTranslationDescription: 'The current content will be replaced with a copy of the default-language content.',
  },
};

const es: DashboardAdvancedCopy = {
  common: {
    add: 'Añadir',
    create: 'Crear',
    save: 'Guardar',
    cancel: 'Cancelar',
    close: 'Cerrar',
    delete: 'Eliminar',
    duplicate: 'Duplicar',
    edit: 'Editar',
    remove: 'Quitar',
    enabled: 'Activado',
    disabled: 'Desactivado',
    required: 'Obligatorio',
    optional: 'Opcional',
    loading: 'Cargando',
    noResults: 'Sin resultados',
    estimated: 'Estimado',
  },
  inspector: {
    configurationTab: 'Configuración',
    dataTab: 'Datos',
    configurationHint: 'Configura el comportamiento del módulo y las ramas de resultado.',
    dataHint: 'Asigna valores tipados a este nodo.',
    inputBindings: 'Mapeos de entrada',
    addBinding: 'Añadir mapeo',
    targetInput: 'Entrada de destino',
    valueSource: 'Origen del valor',
    flowInput: 'Entrada del flujo',
    nodeOutput: 'Salida de un nodo anterior',
    literalValue: 'Valor literal',
    noBindings: 'No hay mapeos de entrada configurados.',
  },
  mappingIssues: {
    missingRequiredInput: 'Una entrada obligatoria no está mapeada.',
    missingTargetField: 'El campo de destino ya no existe.',
    missingSourceField: 'El campo de origen ya no existe.',
    sourceNotUpstream: 'El origen seleccionado no es un nodo anterior.',
    incompatibleType: 'Los tipos del origen y del destino no coinciden.',
    duplicateBinding: 'Esta entrada tiene más de un mapeo.',
    staleBinding: 'Este mapeo contiene una referencia desactualizada.',
    sensitiveLiteralRejected: 'Los valores sensibles no se pueden guardar como literales.',
    missingModuleVersion: 'La versión fijada del módulo no está disponible.',
    legacyCondition: 'Esta expresión heredada debe convertirse antes de ejecutarse.',
  },
  conditions: {
    title: 'Constructor de condiciones',
    description: 'Crea reglas de decisión seguras sin expresiones ejecutables.',
    matchAll: 'Cumplir todas las reglas',
    matchAny: 'Cumplir cualquier regla',
    addRule: 'Añadir regla',
    addGroup: 'Añadir grupo',
    removeRule: 'Quitar regla',
    removeGroup: 'Quitar grupo',
    leftValue: 'Valor izquierdo',
    operator: 'Operador',
    rightValue: 'Valor derecho',
    legacyTitle: 'Condición heredada',
    legacyDescription: 'La expresión original se conserva, pero no se ejecutará.',
    convertLegacy: 'Convertir en reglas',
  },
  conditionOperators: {
    equals: 'Es igual a',
    notEquals: 'No es igual a',
    contains: 'Contiene',
    startsWith: 'Empieza por',
    endsWith: 'Termina en',
    greaterThan: 'Es mayor que',
    greaterThanOrEqual: 'Es mayor o igual que',
    lessThan: 'Es menor que',
    lessThanOrEqual: 'Es menor o igual que',
    exists: 'Existe',
    notExists: 'No existe',
  },
  databaseStrategy: {
    title: 'Estrategia de bases de datos',
    description: 'Controla cómo se consultan las fuentes y cómo se combinan sus resultados.',
    executionMode: 'Modo de ejecución',
    parallel: 'Ejecutar en paralelo',
    sequential: 'Ejecutar de forma secuencial',
    aggregation: 'Agregación de resultados',
    anyMatch: 'Coincide al menos una fuente',
    allClear: 'Todas las fuentes están libres de coincidencias',
    quorum: 'Cuórum',
    weighted: 'Puntuación ponderada',
    quorumCount: 'Número de fuentes requerido',
    weightedThreshold: 'Umbral de coincidencia',
    sourceWeight: 'Peso de la fuente',
    stopOnMatch: 'Detener al encontrar una coincidencia',
    requiredSources: 'Fuentes obligatorias',
    unavailablePolicy: 'Política para fuentes no disponibles',
    continueOnUnavailable: 'Continuar con las fuentes disponibles',
    markInconclusive: 'Devolver resultado no concluyente',
    returnSourceUnavailable: 'Devolver fuente no disponible',
    sourceOrder: 'Orden de las fuentes',
    sourceOrderHint: 'Este orden se utiliza en la ejecución secuencial.',
    explanation: 'Explicación del resultado',
  },
  scenarios: {
    title: 'Escenarios de prueba',
    description: 'Guarda casos sintéticos y verifica cada ruta de decisión.',
    createScenario: 'Crear escenario',
    scenarioName: 'Nombre del escenario',
    scenarioNamePlaceholder: 'Fuente internacional no disponible',
    syntheticPreset: 'Conjunto de entrada sintético',
    syntheticNotice: 'Usa solo datos ficticios. Nunca introduzcas datos de identidad reales.',
    expectedTerminal: 'Final esperado',
    expectedPath: 'Ruta esperada',
    assertions: 'Comprobaciones',
    addAssertion: 'Añadir comprobación',
    run: 'Ejecutar escenario',
    runAll: 'Ejecutar todos los activados',
    running: 'Ejecutando escenarios',
    duplicateScenario: 'Duplicar escenario',
    deleteScenario: 'Eliminar escenario',
    emptyTitle: 'Todavía no hay escenarios',
    emptyDescription: 'Crea un escenario sintético para probar una ruta completa.',
    passed: 'Correcto',
    failed: 'Fallido',
    stale: 'Referencia desactualizada',
    notRun: 'Sin ejecutar',
    batchSummary: '{passed} correctos, {failed} fallidos',
    coverage: 'Cobertura de ramas',
    coveredBranches: 'Ramas cubiertas',
    uncoveredBranches: 'Ramas no cubiertas',
    focusBranch: 'Enfocar rama',
  },
  journey: {
    title: 'Vista previa del recorrido',
    description: 'Reproduce la interfaz a lo largo de la ruta simulada seleccionada.',
    selectScenario: 'Seleccionar escenario',
    noScenario: 'Ningún escenario seleccionado',
    runPreview: 'Ejecutar vista previa',
    previousStep: 'Paso anterior',
    nextStep: 'Paso siguiente',
    restart: 'Reiniciar',
    autoplay: 'Reproducir automáticamente',
    pause: 'Pausar',
    executionLog: 'Registro de ejecución',
    currentStep: 'Paso {current} de {total}',
    noResultTitle: 'No hay resultado de simulación',
    noResultDescription: 'Ejecuta un escenario para crear el recorrido de vista previa.',
  },
  variantStates: {
    default: 'Predeterminado',
    intro: 'Introducción',
    permission: 'Permiso',
    input: 'Entrada',
    capture: 'Captura',
    processing: 'Procesando',
    success: 'Éxito',
    error: 'Error',
    retry: 'Reintento',
    matched: 'Coincidencia',
    notMatched: 'Sin coincidencia',
    inconclusive: 'No concluyente',
    sourceUnavailable: 'Fuente no disponible',
  },
  studio: {
    variants: 'Variantes de pantalla',
    addVariant: 'Añadir variante',
    duplicateVariant: 'Duplicar variante',
    deleteVariant: 'Eliminar variante',
    variantState: 'Estado de la variante',
    linkedOutcomes: 'Resultados vinculados',
    defaultVariant: 'Variante predeterminada',
    orphanedVariant: 'Variante desvinculada',
    previewDevice: 'Dispositivo de vista previa',
    previewTheme: 'Tema de vista previa',
  },
  blocks: {
    title: 'Bloques estructurados',
    addBlock: 'Añadir bloque',
    duplicateBlock: 'Duplicar bloque',
    hideBlock: 'Ocultar bloque',
    showBlock: 'Mostrar bloque',
    moveUp: 'Subir',
    moveDown: 'Bajar',
    deleteBlock: 'Eliminar bloque',
    requiredBlock: 'Bloque obligatorio',
    requiredBlockHint: 'El contrato de pantalla exige este bloque y no permite eliminarlo.',
    emptyTitle: 'Esta variante no tiene bloques',
    emptyDescription: 'Añade un bloque estructurado para componer la pantalla.',
    content: 'Contenido del bloque',
    visibility: 'Visibilidad',
    alwaysVisible: 'Siempre visible',
    conditionalVisibility: 'Mostrar cuando se cumplan las reglas',
    blockSettings: 'Configuración del bloque',
  },
  blockTypes: {
    heading: 'Encabezado',
    text: 'Texto',
    illustration: 'Ilustración',
    consent: 'Consentimiento',
    credentialRequest: 'Solicitud de credencial',
    fieldSummary: 'Resumen de campos',
    instruction: 'Instrucción',
    progress: 'Progreso',
    status: 'Estado',
    actionGroup: 'Grupo de acciones',
  },
  localization: {
    title: 'Idiomas de la interfaz',
    defaultLocale: 'Idioma predeterminado',
    enabledLocales: 'Idiomas activados',
    previewLocale: 'Idioma de vista previa',
    translationStatus: 'Estado de la traducción',
    complete: 'Completa',
    missing: 'Incompleta',
    missingTranslation: 'Falta este contenido en el idioma seleccionado.',
    copyFromDefault: 'Copiar del idioma predeterminado',
    useDefaultPreview: 'Previsualizar el contenido del idioma predeterminado',
    fallbackBadge: 'Vista previa en el idioma predeterminado',
    overflowWarning: 'Esta traducción podría desbordar su contenedor.',
    reviewRequired: 'Es necesario revisar el idioma',
  },
  theme: {
    title: 'Sistema de diseño',
    lightMode: 'Modo claro',
    darkMode: 'Modo oscuro',
    semanticColors: 'Colores semánticos',
    typography: 'Tipografía',
    controls: 'Controles',
    borders: 'Bordes',
    elevation: 'Elevación',
    iconStyle: 'Estilo de iconos',
    motion: 'Movimiento',
    branding: 'Recursos de marca',
    logoLight: 'Logotipo para fondos claros',
    logoDark: 'Logotipo para fondos oscuros',
    favicon: 'URL del favicon',
    standardMotion: 'Movimiento estándar',
    reducedMotion: 'Movimiento reducido',
    mobile: 'Móvil',
    tablet: 'Tableta',
    desktop: 'Escritorio',
    safeArea: 'Área segura',
  },
  accessibility: {
    title: 'Inspector de accesibilidad',
    description: 'Comprueba la interfaz según los requisitos esenciales de accesibilidad.',
    runAudit: 'Ejecutar auditoría de accesibilidad',
    checking: 'Comprobando la accesibilidad',
    passed: 'Auditoría superada',
    errors: 'Errores',
    warnings: 'Advertencias',
    noIssues: 'No se encontraron problemas de accesibilidad.',
    fixIssue: 'Abrir elemento afectado',
    exportBlocked: 'Resuelve los errores de accesibilidad antes de exportar.',
    exportWarning: 'Las advertencias no bloquean la exportación, pero conviene revisarlas.',
  },
  accessibilityChecks: {
    contrast: 'El contraste del texto o los controles no cumple WCAG AA.',
    headingOrder: 'Los niveles de encabezado no siguen un orden lógico.',
    missingLabel: 'Un control interactivo no tiene una etiqueta accesible.',
    missingAlt: 'Una ilustración informativa no tiene texto alternativo.',
    touchTarget: 'Un objetivo táctil mide menos de 44 píxeles.',
    missingFocusMetadata: 'Un control no muestra claramente el foco.',
    colorOnlyState: 'Un estado se comunica únicamente mediante el color.',
    reducedMotion: 'El movimiento no respeta la preferencia de movimiento reducido.',
  },
  modules: {
    title: 'Catálogo de módulos',
    description: 'Gestiona versiones inmutables de módulos de verificación y su uso.',
    activeVersion: 'Versión activa',
    active: 'Activo',
    deprecated: 'Obsoleto',
    createVersion: 'Crear nueva versión',
    versionHistory: 'Historial de versiones',
    usage: 'Usado por flujos',
    noUsage: 'Ningún flujo utiliza esta versión.',
    checkCompatibility: 'Comprobar compatibilidad',
    compatible: 'Actualización compatible',
    breakingChanges: 'Cambios incompatibles',
    upgrade: 'Actualizar flujos',
    importManifest: 'Importar manifiesto',
    exportManifest: 'Exportar manifiesto',
    deleteBlocked: 'No se puede eliminar una versión de módulo que tenga referencias.',
  },
  subflows: {
    title: 'Subflujos reutilizables',
    description: 'Empaqueta una selección conectada del grafo para reutilizarla en otros flujos.',
    createFromSelection: 'Crear subflujo desde la selección',
    selectionRequirement: 'Selecciona un grafo acíclico conectado con una entrada y dos salidas.',
    entryNode: 'Nodo de entrada',
    successExit: 'Salida de éxito',
    failureExit: 'Salida de fallo',
    inputContract: 'Contrato de entrada',
    outputContract: 'Contrato de salida',
    versionHistory: 'Historial de versiones',
    usage: 'Usado por flujos',
    recursionBlocked: 'Un subflujo no puede referenciarse directa ni indirectamente.',
    depthLimit: 'La simulación admite un máximo de 10 niveles anidados.',
    emptyTitle: 'No hay subflujos reutilizables',
    emptyDescription: 'Selecciona nodos compatibles en el lienzo para crear uno.',
  },
  revisions: {
    title: 'Historial del borrador',
    description: 'Crea puntos de control, compara cambios y restaura un borrador anterior.',
    createCheckpoint: 'Crear punto de control',
    checkpointName: 'Nombre del punto de control',
    automatic: 'Punto de control automático',
    manual: 'Punto de control manual',
    beforeDestructiveChange: 'Antes de un cambio destructivo',
    compare: 'Comparar',
    rollback: 'Restaurar como borrador nuevo',
    currentDraft: 'Borrador actual',
    emptyTitle: 'Todavía no hay puntos de control',
    emptyDescription: 'Aparecerá uno tras un guardado manual o un cambio protegido.',
    retentionNotice: 'Se conservan hasta 20 revisiones por proyecto.',
  },
  releases: {
    title: 'Versiones publicables',
    description: 'Crea instantáneas inmutables y promuévelas entre entornos.',
    createRelease: 'Crear versión',
    releaseName: 'Nombre de la versión',
    releaseNotes: 'Notas de la versión',
    immutableSnapshot: 'Instantánea inmutable',
    dependencyLock: 'Bloqueo de dependencias',
    test: 'Pruebas',
    staging: 'Preproducción',
    production: 'Producción',
    promote: 'Promover',
    validationRequired: 'El flujo debe superar la validación antes del entorno de pruebas.',
    scenariosRequired: 'Todos los escenarios activados deben aprobarse antes de preproducción.',
    stagingRequired: 'La versión debe superar preproducción antes de pasar a producción.',
    dependenciesRequired: 'Todas las dependencias fijadas deben estar disponibles.',
    emptyTitle: 'Todavía no hay versiones',
    emptyDescription: 'Crea una versión a partir de un borrador válido.',
  },
  environments: {
    title: 'Configuración del entorno',
    description: 'Guarda valores públicos y nombres de referencias secretas para cada entorno.',
    publicConfiguration: 'Configuración pública',
    secretReferences: 'Referencias secretas',
    addVariable: 'Añadir variable',
    variableName: 'Nombre de la variable',
    publicValue: 'Valor público',
    secretReference: 'Nombre de la referencia secreta',
    secretNotice: 'Los valores secretos nunca se guardan en este espacio de trabajo.',
    emptyTitle: 'No hay variables de entorno',
    invalidReference: 'Introduce un nombre de referencia válido, no el valor secreto.',
    deleteVariable: 'Eliminar variable',
  },
  integration: {
    title: 'Configuración de integración',
    description: 'Define cómo inicia el flujo una aplicación y cómo recibe resultados seguros.',
    mode: 'Modo de integración',
    hosted: 'Alojado',
    embed: 'Integrado',
    redirect: 'Redirección',
    allowedOrigins: 'Orígenes permitidos',
    addOrigin: 'Añadir origen',
    redirectUrls: 'URL de redirección',
    addRedirectUrl: 'Añadir URL de redirección',
    sessionTimeout: 'Tiempo de espera de la sesión en minutos',
    resumePolicy: 'Política de reanudación',
    resumeDisabled: 'No reanudar',
    sameDevice: 'Reanudar en el mismo dispositivo',
    crossDevice: 'Reanudar entre dispositivos',
    events: 'Eventos activados',
    resultFields: 'Campos de resultado seguros',
    piiDisabled: 'La exportación de datos personales está siempre desactivada.',
    wildcardRejected: 'No se permiten orígenes con comodines.',
    httpsRequired: 'Usa HTTPS, excepto al desarrollar en localhost.',
    validateManifest: 'Validar integración',
  },
  integrationEvents: {
    started: 'Flujo iniciado',
    stepCompleted: 'Paso completado',
    cancelled: 'Flujo cancelado',
    finished: 'Flujo finalizado',
  },
  analysis: {
    title: 'Análisis del flujo',
    description: 'Detecta carencias de cobertura, datos sin usar, cuellos de botella y exceso de pruebas.',
    runAnalysis: 'Ejecutar análisis',
    analyzing: 'Analizando el flujo',
    noIssues: 'El análisis no encontró problemas.',
    severity: 'Gravedad',
    critical: 'Crítico',
    warning: 'Advertencia',
    information: 'Información',
    focusItem: 'Enfocar en el lienzo',
    estimatedLatency: 'Duración estimada',
    estimatedCost: 'Coste estimado',
    thresholds: 'Umbrales de análisis',
  },
  analysisIssues: {
    untestedBranch: 'Ningún escenario activado cubre esta rama.',
    unusedOutput: 'Una salida generada no se utiliza más adelante.',
    duplicateDatabaseSource: 'La misma fuente de datos se consulta más de una vez.',
    bottleneck: 'Este paso podría ser un cuello de botella en la ruta crítica.',
    excessiveEvidence: 'Este recorrido podría solicitar más pruebas de las necesarias.',
  },
  storage: {
    localOnly: 'Los datos permanecen en este navegador y no deben contener identidades reales.',
    migrating: 'Actualizando los datos del espacio de trabajo',
    migrationComplete: 'Los datos del espacio de trabajo se actualizaron correctamente.',
    migrationFailed: 'No se pudieron actualizar los datos del espacio de trabajo.',
    backupCreated: 'Se conservó una copia de seguridad del espacio de trabajo anterior.',
    recovered: 'Se abrió un espacio de trabajo limpio tras un error de almacenamiento.',
    unsupportedVersionTitle: 'Se detectó una versión más reciente del espacio de trabajo',
    unsupportedVersionDescription: 'Actualiza la aplicación antes de abrirlo. Tus datos no se han modificado.',
    quotaTitle: 'El almacenamiento del navegador está lleno',
    quotaDescription: 'Elimina borradores sin uso o exporta un manifiesto antes de reintentarlo.',
    readError: 'No se pudieron leer los datos del espacio de trabajo.',
    readErrorDescription: 'Comprueba el permiso de almacenamiento del navegador para este sitio y vuelve a cargar la página.',
    privacyErrorDescription: 'El espacio de trabajo está abierto en modo de recuperación. Elimina los valores de identidad literales, los metadatos inseguros de las pruebas o los secretos guardados antes de volver a guardar.',
    writeError: 'No se pudieron guardar los cambios en el navegador.',
    retry: 'Reintentar la operación de almacenamiento',
  },
  aria: {
    advancedWorkspace: 'Espacio de trabajo de verificación avanzada',
    inspectorTabs: 'Secciones del inspector del nodo',
    mappingRow: 'Mapeo de entrada',
    conditionGroup: 'Grupo de condiciones',
    conditionRule: 'Regla de condición',
    databaseSourceOrder: 'Orden de ejecución de las fuentes de datos',
    scenarioActions: 'Acciones del escenario',
    scenarioResults: 'Resultados del escenario',
    journeyTimeline: 'Cronología del recorrido de vista previa',
    blockList: 'Bloques estructurados de la interfaz',
    blockActions: 'Acciones del bloque',
    previewFrame: 'Vista previa de la interfaz de verificación',
    localeSelector: 'Selector de idioma de vista previa',
    themeSelector: 'Selector de tema de vista previa',
    analysisResults: 'Resultados del análisis del flujo',
    closeDialog: 'Cerrar cuadro de diálogo',
  },
  operationErrors: {
    moduleVersionMissing: 'La versión del módulo seleccionada ya no está disponible.',
    moduleVersionConflict: 'Esa versión del módulo ya existe.',
    moduleStillInUse: 'No se puede eliminar el módulo mientras lo use un flujo, subflujo o lanzamiento.',
    moduleLifecycleBlocked: 'Este cambio del ciclo de vida del módulo no está permitido en su estado actual.',
    requiredInputsMissing: 'Mapea las nuevas entradas obligatorias antes de actualizar este nodo.',
    moduleManifestInvalid: 'El manifiesto no es JSON válido o no cumple el contrato admitido.',
    subflowSelectionInvalid: 'Selecciona una región conectada y acíclica con una entrada y salidas distintas de éxito y error.',
    subflowDependencyInvalid: 'Este subflujo crearía una dependencia ausente, recursiva o demasiado profunda.',
    subflowVersionConflict: 'Esa versión del subflujo ya existe.',
    revisionUnavailable: 'Este punto de control no está disponible o pertenece a otro flujo.',
    releaseVersionInvalid: 'Introduce una versión de lanzamiento única y no vacía.',
    releaseValidationRequired: 'Resuelve todos los errores del flujo antes de promoverlo a Test.',
    releaseScenariosRequired: 'Todos los escenarios activados deben ejecutarse y aprobarse antes de promover a Staging.',
    releaseStagingRequired: 'Promueve primero este lanzamiento por el entorno anterior.',
    releaseDependenciesInvalid: 'Una o más dependencias bloqueadas de módulos o subflujos no están disponibles.',
    releaseAlreadyPromoted: 'Este lanzamiento ya se promovió a ese entorno.',
    environmentInvalid: 'El entorno contiene una etapa, un valor público o una referencia secreta no válidos.',
    originInvalid: 'Introduce un origen HTTPS único. Localhost puede usar HTTP; no se permiten comodines.',
    redirectInvalid: 'Introduce una URL de redirección HTTPS única. Localhost puede usar HTTP.',
    integrationInvalid: 'Resuelve la configuración de integración indicada antes de continuar.',
    operationFailed: 'No se pudo completar la operación. Revisa la configuración actual e inténtalo de nuevo.',
  },
  toasts: {
    bindingSaved: 'Mapeo de entrada guardado.',
    bindingRemoved: 'Mapeo de entrada eliminado.',
    conditionSaved: 'Reglas de condición guardadas.',
    strategySaved: 'Estrategia de bases de datos guardada.',
    scenarioCreated: 'Escenario creado.',
    scenarioDuplicated: 'Escenario duplicado.',
    scenarioDeleted: 'Escenario eliminado.',
    scenarioRunComplete: 'Ejecución del escenario completada.',
    batchComplete: 'Ejecución conjunta de escenarios completada.',
    journeyReady: 'El recorrido de vista previa está preparado.',
    variantCreated: 'Variante de pantalla creada.',
    variantDeleted: 'Variante de pantalla eliminada.',
    blockAdded: 'Bloque añadido.',
    blockDuplicated: 'Bloque duplicado.',
    blockDeleted: 'Bloque eliminado.',
    translationCopied: 'Contenido del idioma predeterminado copiado.',
    themeSaved: 'Sistema de diseño guardado.',
    accessibilityAuditComplete: 'Auditoría de accesibilidad completada.',
    moduleVersionCreated: 'Versión del módulo creada.',
    moduleImported: 'Manifiesto del módulo importado.',
    moduleDeleted: 'Módulo eliminado.',
    moduleUpgradeComplete: 'Actualización del módulo completada.',
    moduleDeprecated: 'Versión del módulo marcada como obsoleta.',
    subflowCreated: 'Subflujo reutilizable creado.',
    subflowVersionCreated: 'Versión del subflujo creada.',
    subflowDeleted: 'Subflujo reutilizable eliminado.',
    checkpointCreated: 'Punto de control del borrador creado.',
    rollbackComplete: 'Contenido anterior restaurado como borrador nuevo.',
    releaseCreated: 'Versión creada.',
    promotionComplete: 'Versión promovida correctamente.',
    environmentVariableSaved: 'Variable de entorno guardada.',
    environmentVariableDeleted: 'Variable de entorno eliminada.',
    integrationValid: 'La configuración de integración es válida.',
    integrationInvalid: 'La configuración de integración contiene errores.',
    analysisComplete: 'Análisis del flujo completado.',
    storageRetrySucceeded: 'El almacenamiento del espacio de trabajo vuelve a estar disponible.',
  },
  modals: {
    deleteScenarioTitle: '¿Eliminar este escenario?',
    deleteScenarioDescription: 'Se eliminarán los datos sintéticos y las comprobaciones de este escenario.',
    deleteBlockTitle: '¿Eliminar este bloque?',
    deleteBlockDescription: 'El bloque y su contenido localizado se eliminarán de esta variante.',
    deleteVariantTitle: '¿Eliminar esta variante de pantalla?',
    deleteVariantDescription: 'Se eliminarán todos los bloques estructurados y el contenido localizado de esta variante.',
    deprecateModuleTitle: '¿Marcar como obsoleta esta versión del módulo?',
    deprecateModuleDescription: 'Los flujos existentes seguirán fijados, pero los nuevos no usarán esta versión.',
    deleteModuleTitle: '¿Eliminar este módulo?',
    deleteModuleDescription: 'Solo se pueden eliminar paquetes y versiones de módulos que no estén en uso.',
    importModuleTitle: 'Importar manifiesto del módulo',
    importModuleDescription: 'Solo se aceptan manifiestos JSON válidos. El contenido importado nunca se ejecuta.',
    createSubflowTitle: 'Crear subflujo reutilizable',
    createSubflowDescription: 'Revisa la entrada, las salidas y el contrato de datos antes de crear la primera versión.',
    deleteSubflowTitle: '¿Eliminar este subflujo reutilizable?',
    deleteSubflowDescription: 'Solo se pueden eliminar subflujos sin referencias desde un flujo o una versión.',
    createCheckpointTitle: 'Crear punto de control del borrador',
    createCheckpointDescription: 'Guarda el borrador actual para poder compararlo o restaurarlo más adelante.',
    rollbackTitle: '¿Restaurar esta revisión?',
    rollbackDescription: 'Se creará una nueva revisión del borrador sin alterar el historial existente.',
    createReleaseTitle: 'Crear versión inmutable',
    createReleaseDescription: 'Se fijarán el flujo actual, la interfaz y las versiones de las dependencias.',
    promoteReleaseTitle: '¿Promover esta versión?',
    promoteReleaseDescription: 'Primero se comprobarán los requisitos del entorno de destino.',
    deleteVariableTitle: '¿Eliminar esta variable de entorno?',
    deleteVariableDescription: 'Se eliminará el valor público o el nombre de la referencia secreta.',
    convertLegacyTitle: '¿Convertir la condición heredada?',
    convertLegacyDescription: 'Revisa con cuidado las reglas generadas. La expresión original no se ejecutará.',
    copyDefaultTranslationTitle: '¿Sustituir esta traducción?',
    copyDefaultTranslationDescription: 'El contenido actual se sustituirá por una copia del idioma predeterminado.',
  },
};

const ja: DashboardAdvancedCopy = {
  common: {
    add: '追加',
    create: '作成',
    save: '保存',
    cancel: 'キャンセル',
    close: '閉じる',
    delete: '削除',
    duplicate: '複製',
    edit: '編集',
    remove: '取り除く',
    enabled: '有効',
    disabled: '無効',
    required: '必須',
    optional: '任意',
    loading: '読み込み中',
    noResults: '結果がありません',
    estimated: '推定',
  },
  inspector: {
    configurationTab: '設定',
    dataTab: 'データ',
    configurationHint: 'モジュールの動作と結果分岐を設定します。',
    dataHint: '型付きの値をこのノードの入力に割り当てます。',
    inputBindings: '入力マッピング',
    addBinding: 'マッピングを追加',
    targetInput: '割り当て先の入力',
    valueSource: '値の参照元',
    flowInput: 'フロー入力',
    nodeOutput: '上流ノードの出力',
    literalValue: '固定値',
    noBindings: '入力マッピングは設定されていません。',
  },
  mappingIssues: {
    missingRequiredInput: '必須入力が割り当てられていません。',
    missingTargetField: '割り当て先のフィールドは存在しません。',
    missingSourceField: '参照元のフィールドは存在しません。',
    sourceNotUpstream: '選択した参照元は上流ノードではありません。',
    incompatibleType: '参照元と割り当て先の型が一致しません。',
    duplicateBinding: 'この入力に複数のマッピングがあります。',
    staleBinding: 'このマッピングに古い参照が含まれています。',
    sensitiveLiteralRejected: '機密性の高い値は固定値として保存できません。',
    missingModuleVersion: '固定されたモジュールバージョンを利用できません。',
    legacyCondition: 'この旧形式の式は実行前に変換する必要があります。',
  },
  conditions: {
    title: '条件ビルダー',
    description: '実行可能な式を使わず、安全な判定ルールを作成します。',
    matchAll: 'すべてのルールに一致',
    matchAny: 'いずれかのルールに一致',
    addRule: 'ルールを追加',
    addGroup: 'グループを追加',
    removeRule: 'ルールを削除',
    removeGroup: 'グループを削除',
    leftValue: '左辺の値',
    operator: '演算子',
    rightValue: '右辺の値',
    legacyTitle: '旧形式の条件',
    legacyDescription: '元の式は保持されますが、実行されません。',
    convertLegacy: 'ルールに変換',
  },
  conditionOperators: {
    equals: '等しい',
    notEquals: '等しくない',
    contains: '含む',
    startsWith: '指定値で始まる',
    endsWith: '指定値で終わる',
    greaterThan: 'より大きい',
    greaterThanOrEqual: '以上',
    lessThan: 'より小さい',
    lessThanOrEqual: '以下',
    exists: '存在する',
    notExists: '存在しない',
  },
  databaseStrategy: {
    title: 'データベース照合戦略',
    description: '選択した参照元の実行方法と結果の統合方法を設定します。',
    executionMode: '実行モード',
    parallel: '並列実行',
    sequential: '順次実行',
    aggregation: '結果の統合',
    anyMatch: 'いずれかの参照元で一致',
    allClear: 'すべての参照元で一致なし',
    quorum: '必要一致数',
    weighted: '重み付きスコア',
    quorumCount: '必要な参照元数',
    weightedThreshold: '一致しきい値',
    sourceWeight: '参照元の重み',
    stopOnMatch: '一致した時点で停止',
    requiredSources: '必須の参照元',
    unavailablePolicy: '参照元を利用できない場合',
    continueOnUnavailable: '利用可能な参照元で続行',
    markInconclusive: '判定不能として返す',
    returnSourceUnavailable: '参照元利用不可として返す',
    sourceOrder: '参照元の順序',
    sourceOrderHint: '順次実行ではこの順序が使用されます。',
    explanation: '結果の説明',
  },
  scenarios: {
    title: 'テストシナリオ',
    description: '合成データのケースを保存し、すべての判定経路を検証します。',
    createScenario: 'シナリオを作成',
    scenarioName: 'シナリオ名',
    scenarioNamePlaceholder: '海外の参照元を利用できない場合',
    syntheticPreset: '合成入力プリセット',
    syntheticNotice: '架空のプリセットのみを使用し、実在する個人情報は入力しないでください。',
    expectedTerminal: '想定する終端',
    expectedPath: '想定する経路',
    assertions: '検証項目',
    addAssertion: '検証項目を追加',
    run: 'シナリオを実行',
    runAll: '有効なシナリオをすべて実行',
    running: 'シナリオを実行中',
    duplicateScenario: 'シナリオを複製',
    deleteScenario: 'シナリオを削除',
    emptyTitle: 'シナリオはまだありません',
    emptyDescription: '合成データのシナリオを作成して、経路全体をテストします。',
    passed: '成功',
    failed: '失敗',
    stale: '古い参照',
    notRun: '未実行',
    batchSummary: '{passed} 件成功、{failed} 件失敗',
    coverage: '分岐カバレッジ',
    coveredBranches: '検証済みの分岐',
    uncoveredBranches: '未検証の分岐',
    focusBranch: '分岐を表示',
  },
  journey: {
    title: 'ジャーニープレビュー',
    description: '選択したシミュレーション経路に沿ってインターフェースを再生します。',
    selectScenario: 'シナリオを選択',
    noScenario: 'シナリオが選択されていません',
    runPreview: 'プレビューを実行',
    previousStep: '前のステップ',
    nextStep: '次のステップ',
    restart: '最初から再生',
    autoplay: '自動再生',
    pause: '一時停止',
    executionLog: '実行ログ',
    currentStep: '{total} ステップ中 {current} ステップ目',
    noResultTitle: 'シミュレーション結果がありません',
    noResultDescription: 'シナリオを実行してプレビューのジャーニーを作成してください。',
  },
  variantStates: {
    default: '標準',
    intro: '案内',
    permission: '許可',
    input: '入力',
    capture: '取得',
    processing: '処理中',
    success: '成功',
    error: 'エラー',
    retry: '再試行',
    matched: '一致あり',
    notMatched: '一致なし',
    inconclusive: '判定不能',
    sourceUnavailable: '参照元利用不可',
  },
  studio: {
    variants: '画面バリエーション',
    addVariant: 'バリエーションを追加',
    duplicateVariant: 'バリエーションを複製',
    deleteVariant: 'バリエーションを削除',
    variantState: 'バリエーションの状態',
    linkedOutcomes: '関連付けた結果',
    defaultVariant: '標準バリエーション',
    orphanedVariant: '未関連のバリエーション',
    previewDevice: 'プレビュー端末',
    previewTheme: 'プレビューテーマ',
  },
  blocks: {
    title: '構造化ブロック',
    addBlock: 'ブロックを追加',
    duplicateBlock: 'ブロックを複製',
    hideBlock: 'ブロックを非表示',
    showBlock: 'ブロックを表示',
    moveUp: '上へ移動',
    moveDown: '下へ移動',
    deleteBlock: 'ブロックを削除',
    requiredBlock: '必須ブロック',
    requiredBlockHint: '画面の仕様で必須のため、このブロックは削除できません。',
    emptyTitle: 'このバリエーションにはブロックがありません',
    emptyDescription: '構造化ブロックを追加して画面を構成します。',
    content: 'ブロックの内容',
    visibility: '表示条件',
    alwaysVisible: '常に表示',
    conditionalVisibility: 'ルールに一致した場合に表示',
    blockSettings: 'ブロック設定',
  },
  blockTypes: {
    heading: '見出し',
    text: 'テキスト',
    illustration: 'イラスト',
    consent: '同意',
    credentialRequest: 'クレデンシャル要求',
    fieldSummary: 'フィールド概要',
    instruction: '案内',
    progress: '進捗',
    status: '状態',
    actionGroup: '操作グループ',
  },
  localization: {
    title: 'インターフェースの言語',
    defaultLocale: '標準言語',
    enabledLocales: '有効な言語',
    previewLocale: 'プレビュー言語',
    translationStatus: '翻訳状況',
    complete: '完了',
    missing: '未翻訳',
    missingTranslation: '選択した言語の内容がありません。',
    copyFromDefault: '標準言語からコピー',
    useDefaultPreview: '標準言語の内容をプレビュー',
    fallbackBadge: '標準言語でプレビュー中',
    overflowWarning: 'この翻訳は表示領域からはみ出す可能性があります。',
    reviewRequired: '言語の確認が必要です',
  },
  theme: {
    title: 'デザインシステム',
    lightMode: 'ライトモード',
    darkMode: 'ダークモード',
    semanticColors: '意味に基づく色',
    typography: '文字設定',
    controls: 'コントロール',
    borders: '枠線',
    elevation: '立体表現',
    iconStyle: 'アイコンのスタイル',
    motion: 'モーション',
    branding: 'ブランド素材',
    logoLight: '明るい背景用ロゴ',
    logoDark: '暗い背景用ロゴ',
    favicon: 'ファビコンの URL',
    standardMotion: '標準モーション',
    reducedMotion: 'モーションを抑える',
    mobile: 'モバイル',
    tablet: 'タブレット',
    desktop: 'デスクトップ',
    safeArea: 'セーフエリア',
  },
  accessibility: {
    title: 'アクセシビリティ検査',
    description: '基本的なアクセシビリティ要件に照らしてインターフェースを確認します。',
    runAudit: 'アクセシビリティ検査を実行',
    checking: 'アクセシビリティを確認中',
    passed: '検査に合格しました',
    errors: 'エラー',
    warnings: '警告',
    noIssues: 'アクセシビリティの問題は見つかりませんでした。',
    fixIssue: '該当項目を開く',
    exportBlocked: 'エクスポートする前にアクセシビリティエラーを解決してください。',
    exportWarning: '警告はエクスポートを妨げませんが、確認を推奨します。',
  },
  accessibilityChecks: {
    contrast: 'テキストまたはコントロールのコントラストが WCAG AA を満たしていません。',
    headingOrder: '見出しレベルの順序が論理的ではありません。',
    missingLabel: '操作コントロールにアクセシブルなラベルがありません。',
    missingAlt: '情報を伝えるイラストに代替テキストがありません。',
    touchTarget: 'タッチ領域が 44 ピクセル未満です。',
    missingFocusMetadata: 'コントロールに視認できるフォーカス表示がありません。',
    colorOnlyState: '状態が色だけで伝えられています。',
    reducedMotion: 'モーション軽減の設定が反映されていません。',
  },
  modules: {
    title: 'モジュールカタログ',
    description: '変更不可能な検証モジュールのバージョンと利用状況を管理します。',
    activeVersion: '有効なバージョン',
    active: '有効',
    deprecated: '非推奨',
    createVersion: '新しいバージョンを作成',
    versionHistory: 'バージョン履歴',
    usage: '利用中のフロー',
    noUsage: 'このバージョンを利用しているフローはありません。',
    checkCompatibility: '互換性を確認',
    compatible: '互換性のある更新',
    breakingChanges: '互換性のない変更',
    upgrade: 'フローを更新',
    importManifest: 'マニフェストを読み込む',
    exportManifest: 'マニフェストを書き出す',
    deleteBlocked: '参照されているモジュールバージョンは削除できません。',
  },
  subflows: {
    title: '再利用可能なサブフロー',
    description: '接続されたグラフの選択範囲を、複数のフローで再利用できる形にまとめます。',
    createFromSelection: '選択範囲からサブフローを作成',
    selectionRequirement: '入口が 1 つ、出口が 2 つの接続済み非巡回グラフを選択してください。',
    entryNode: '入口ノード',
    successExit: '成功時の出口',
    failureExit: '失敗時の出口',
    inputContract: '入力仕様',
    outputContract: '出力仕様',
    versionHistory: 'バージョン履歴',
    usage: '利用中のフロー',
    recursionBlocked: 'サブフローから自分自身を直接または間接的に参照することはできません。',
    depthLimit: 'シミュレーションで扱える入れ子は最大 10 階層です。',
    emptyTitle: '再利用可能なサブフローはありません',
    emptyDescription: 'キャンバス上で互換性のあるノードを選択して作成します。',
  },
  revisions: {
    title: '下書き履歴',
    description: 'チェックポイントを作成し、変更を比較して以前の下書きを復元します。',
    createCheckpoint: 'チェックポイントを作成',
    checkpointName: 'チェックポイント名',
    automatic: '自動チェックポイント',
    manual: '手動チェックポイント',
    beforeDestructiveChange: '大きな変更の前',
    compare: '比較',
    rollback: '新しい下書きとして復元',
    currentDraft: '現在の下書き',
    emptyTitle: 'チェックポイントはまだありません',
    emptyDescription: '手動保存または保護対象の変更後にチェックポイントが表示されます。',
    retentionNotice: 'プロジェクトごとに最大 20 件のリビジョンを保持します。',
  },
  releases: {
    title: 'リリース',
    description: '変更不可能なスナップショットを作成し、各環境へ昇格します。',
    createRelease: 'リリースを作成',
    releaseName: 'リリース名',
    releaseNotes: 'リリースノート',
    immutableSnapshot: '変更不可能なスナップショット',
    dependencyLock: '依存関係の固定',
    test: 'テスト',
    staging: 'ステージング',
    production: '本番',
    promote: '昇格',
    validationRequired: 'テストへ進む前にフローの検証を完了してください。',
    scenariosRequired: 'ステージングへ進む前に、有効なシナリオをすべて成功させてください。',
    stagingRequired: '本番へ進む前にステージングを通過してください。',
    dependenciesRequired: '固定された依存関係をすべて利用できる必要があります。',
    emptyTitle: 'リリースはまだありません',
    emptyDescription: '有効な下書きからリリースを作成します。',
  },
  environments: {
    title: '環境設定',
    description: '環境ごとに公開値とシークレット参照名を保存します。',
    publicConfiguration: '公開設定',
    secretReferences: 'シークレット参照',
    addVariable: '変数を追加',
    variableName: '変数名',
    publicValue: '公開値',
    secretReference: 'シークレット参照名',
    secretNotice: 'シークレットの値がこのワークスペースに保存されることはありません。',
    emptyTitle: '環境変数はありません',
    invalidReference: 'シークレット値ではなく、有効な参照名を入力してください。',
    deleteVariable: '変数を削除',
  },
  integration: {
    title: '連携設定',
    description: 'アプリからフローを開始し、安全な結果を受け取る方法を定義します。',
    mode: '連携モード',
    hosted: 'ホスト型',
    embed: '埋め込み',
    redirect: 'リダイレクト',
    allowedOrigins: '許可するオリジン',
    addOrigin: 'オリジンを追加',
    redirectUrls: 'リダイレクト URL',
    addRedirectUrl: 'リダイレクト URL を追加',
    sessionTimeout: 'セッションのタイムアウト時間（分）',
    resumePolicy: '再開ポリシー',
    resumeDisabled: '再開しない',
    sameDevice: '同じ端末で再開',
    crossDevice: '別の端末でも再開',
    events: '有効なイベント',
    resultFields: '安全な結果フィールド',
    piiDisabled: '個人情報のエクスポートは常に無効です。',
    wildcardRejected: 'ワイルドカードのオリジンは使用できません。',
    httpsRequired: 'localhost での開発を除き、HTTPS を使用してください。',
    validateManifest: '連携設定を検証',
  },
  integrationEvents: {
    started: 'フロー開始',
    stepCompleted: 'ステップ完了',
    cancelled: 'フローキャンセル',
    finished: 'フロー完了',
  },
  analysis: {
    title: 'フロー分析',
    description: '未検証の分岐、未使用データ、ボトルネック、過剰な証明要求を検出します。',
    runAnalysis: '分析を実行',
    analyzing: 'フローを分析中',
    noIssues: '分析で問題は見つかりませんでした。',
    severity: '重要度',
    critical: '重大',
    warning: '警告',
    information: '情報',
    focusItem: 'キャンバスで表示',
    estimatedLatency: '推定所要時間',
    estimatedCost: '推定コスト',
    thresholds: '分析しきい値',
  },
  analysisIssues: {
    untestedBranch: 'この分岐は有効なシナリオで検証されていません。',
    unusedOutput: '生成された出力が後続処理で使用されていません。',
    duplicateDatabaseSource: '同じデータベース参照元が複数回照会されています。',
    bottleneck: 'このステップはクリティカルパスのボトルネックになる可能性があります。',
    excessiveEvidence: 'このジャーニーでは必要以上の証明を求めている可能性があります。',
  },
  storage: {
    localOnly: 'ワークスペースのデータはこのブラウザにのみ保存されます。実在する個人情報を含めないでください。',
    migrating: 'ワークスペースデータを更新中',
    migrationComplete: 'ワークスペースデータを更新しました。',
    migrationFailed: 'ワークスペースデータを更新できませんでした。',
    backupCreated: '以前のワークスペースのバックアップを保持しました。',
    recovered: 'ストレージエラーのため、新しいワークスペースを開きました。',
    unsupportedVersionTitle: '新しい形式のワークスペースを検出しました',
    unsupportedVersionDescription: 'このワークスペースを開く前にアプリを更新してください。データは変更されていません。',
    quotaTitle: 'ブラウザの保存領域がいっぱいです',
    quotaDescription: '不要な下書きを削除するか、マニフェストを書き出してから再試行してください。',
    readError: 'ワークスペースデータを読み込めませんでした。',
    readErrorDescription: 'このサイトに対するブラウザのストレージ権限を確認してから、ページを再読み込みしてください。',
    privacyErrorDescription: 'ワークスペースは復旧モードで開かれています。再度保存する前に、保存済みの識別情報の直接値、安全でないテスト用メタデータ、またはシークレット値を削除してください。',
    writeError: '変更をブラウザの保存領域に保存できませんでした。',
    retry: '保存処理を再試行',
  },
  aria: {
    advancedWorkspace: '高度な本人確認ワークスペース',
    inspectorTabs: 'ノード検査のセクション',
    mappingRow: '入力マッピング',
    conditionGroup: '条件グループ',
    conditionRule: '条件ルール',
    databaseSourceOrder: 'データベース参照元の実行順序',
    scenarioActions: 'シナリオの操作',
    scenarioResults: 'シナリオの結果',
    journeyTimeline: 'プレビュージャーニーのタイムライン',
    blockList: '構造化されたインターフェースブロック',
    blockActions: 'ブロックの操作',
    previewFrame: '本人確認インターフェースのプレビュー',
    localeSelector: 'プレビュー言語の選択',
    themeSelector: 'プレビューテーマの選択',
    analysisResults: 'フロー分析の結果',
    closeDialog: 'ダイアログを閉じる',
  },
  operationErrors: {
    moduleVersionMissing: '選択したモジュールバージョンは利用できません。',
    moduleVersionConflict: 'そのモジュールバージョンは既に存在します。',
    moduleStillInUse: 'フロー、サブフロー、またはリリースで使用中のモジュールは削除できません。',
    moduleLifecycleBlocked: '現在の状態では、このモジュールのライフサイクル変更は許可されていません。',
    requiredInputsMissing: 'このノードを更新する前に、新しい必須入力をマッピングしてください。',
    moduleManifestInvalid: 'モジュールマニフェストが有効な JSON でないか、対応する契約と一致しません。',
    subflowSelectionInvalid: '1 つの入口と個別の成功・失敗出口を持つ、連結した非循環領域を選択してください。',
    subflowDependencyInvalid: 'このサブフローは、欠落、再帰、または深すぎる依存関係を作成します。',
    subflowVersionConflict: 'そのサブフローバージョンは既に存在します。',
    revisionUnavailable: 'このチェックポイントは利用できないか、別のフローに属しています。',
    releaseVersionInvalid: '空でない一意のリリースバージョンを入力してください。',
    releaseValidationRequired: 'Test へ昇格する前に、すべてのフロー検証エラーを解消してください。',
    releaseScenariosRequired: 'Staging へ昇格する前に、有効なすべてのシナリオを実行して成功させてください。',
    releaseStagingRequired: '先に直前の環境へこのリリースを昇格してください。',
    releaseDependenciesInvalid: '固定されたモジュールまたはサブフローの依存関係が利用できません。',
    releaseAlreadyPromoted: 'このリリースは既にその環境へ昇格済みです。',
    environmentInvalid: '環境に無効なステージ、公開値、またはシークレット参照名があります。',
    originInvalid: '一意の HTTPS オリジンを入力してください。localhost は HTTP を使用できます。ワイルドカードは使用できません。',
    redirectInvalid: '一意の HTTPS リダイレクト URL を入力してください。localhost は HTTP を使用できます。',
    integrationInvalid: '続行する前に、示された連携設定を修正してください。',
    operationFailed: '操作を完了できませんでした。現在の設定を確認して再試行してください。',
  },
  toasts: {
    bindingSaved: '入力マッピングを保存しました。',
    bindingRemoved: '入力マッピングを削除しました。',
    conditionSaved: '条件ルールを保存しました。',
    strategySaved: 'データベース戦略を保存しました。',
    scenarioCreated: 'シナリオを作成しました。',
    scenarioDuplicated: 'シナリオを複製しました。',
    scenarioDeleted: 'シナリオを削除しました。',
    scenarioRunComplete: 'シナリオの実行が完了しました。',
    batchComplete: 'シナリオの一括実行が完了しました。',
    journeyReady: 'プレビュージャーニーを準備しました。',
    variantCreated: '画面バリエーションを作成しました。',
    variantDeleted: '画面バリエーションを削除しました。',
    blockAdded: 'ブロックを追加しました。',
    blockDuplicated: 'ブロックを複製しました。',
    blockDeleted: 'ブロックを削除しました。',
    translationCopied: '標準言語の内容をコピーしました。',
    themeSaved: 'デザインシステムを保存しました。',
    accessibilityAuditComplete: 'アクセシビリティ検査が完了しました。',
    moduleVersionCreated: 'モジュールバージョンを作成しました。',
    moduleImported: 'モジュールのマニフェストを読み込みました。',
    moduleDeleted: 'モジュールを削除しました。',
    moduleUpgradeComplete: 'モジュールの更新が完了しました。',
    moduleDeprecated: 'モジュールバージョンを非推奨にしました。',
    subflowCreated: '再利用可能なサブフローを作成しました。',
    subflowVersionCreated: 'サブフローのバージョンを作成しました。',
    subflowDeleted: '再利用可能なサブフローを削除しました。',
    checkpointCreated: '下書きのチェックポイントを作成しました。',
    rollbackComplete: '以前の内容を新しい下書きとして復元しました。',
    releaseCreated: 'リリースを作成しました。',
    promotionComplete: 'リリースを昇格しました。',
    environmentVariableSaved: '環境変数を保存しました。',
    environmentVariableDeleted: '環境変数を削除しました。',
    integrationValid: '連携設定は有効です。',
    integrationInvalid: '連携設定にエラーがあります。',
    analysisComplete: 'フロー分析が完了しました。',
    storageRetrySucceeded: 'ワークスペースの保存領域が再び利用可能になりました。',
  },
  modals: {
    deleteScenarioTitle: 'このシナリオを削除しますか？',
    deleteScenarioDescription: 'このシナリオの合成データと検証項目が削除されます。',
    deleteBlockTitle: 'このブロックを削除しますか？',
    deleteBlockDescription: 'このバリエーションからブロックと各言語の内容が削除されます。',
    deleteVariantTitle: 'この画面バリエーションを削除しますか？',
    deleteVariantDescription: 'このバリエーションの構造化ブロックと各言語の内容がすべて削除されます。',
    deprecateModuleTitle: 'このモジュールバージョンを非推奨にしますか？',
    deprecateModuleDescription: '既存のフローは固定されたままですが、新しいフローではこのバージョンを使用しません。',
    deleteModuleTitle: 'このモジュールを削除しますか？',
    deleteModuleDescription: '使用されていないモジュールパッケージとバージョンのみ削除できます。',
    importModuleTitle: 'モジュールのマニフェストを読み込む',
    importModuleDescription: '検証済みの JSON マニフェストのみ読み込めます。読み込んだ内容が実行されることはありません。',
    createSubflowTitle: '再利用可能なサブフローを作成',
    createSubflowDescription: '最初のバージョンを作成する前に、入口、出口、データ仕様を確認してください。',
    deleteSubflowTitle: 'この再利用可能なサブフローを削除しますか？',
    deleteSubflowDescription: 'フローやリリースから参照されていないサブフローのみ削除できます。',
    createCheckpointTitle: '下書きのチェックポイントを作成',
    createCheckpointDescription: '現在の下書きを保存し、後から比較または復元できるようにします。',
    rollbackTitle: 'このリビジョンを復元しますか？',
    rollbackDescription: '新しい下書きリビジョンを作成します。既存の履歴は変更されません。',
    createReleaseTitle: '変更不可能なリリースを作成',
    createReleaseDescription: '現在のフロー、インターフェース、依存関係のバージョンを固定します。',
    promoteReleaseTitle: 'このリリースを昇格しますか？',
    promoteReleaseDescription: '先に昇格先の環境要件を確認します。',
    deleteVariableTitle: 'この環境変数を削除しますか？',
    deleteVariableDescription: '公開値またはシークレット参照名が削除されます。',
    convertLegacyTitle: '旧形式の条件を変換しますか？',
    convertLegacyDescription: '生成されたルールを慎重に確認してください。元の式は実行されません。',
    copyDefaultTranslationTitle: 'この翻訳を置き換えますか？',
    copyDefaultTranslationDescription: '現在の内容を標準言語の内容で置き換えます。',
  },
};

const de: DashboardAdvancedCopy = {
  common: {
    add: 'Hinzufügen',
    create: 'Erstellen',
    save: 'Speichern',
    cancel: 'Abbrechen',
    close: 'Schließen',
    delete: 'Löschen',
    duplicate: 'Duplizieren',
    edit: 'Bearbeiten',
    remove: 'Entfernen',
    enabled: 'Aktiviert',
    disabled: 'Deaktiviert',
    required: 'Erforderlich',
    optional: 'Optional',
    loading: 'Wird geladen',
    noResults: 'Keine Ergebnisse',
    estimated: 'Geschätzt',
  },
  inspector: {
    configurationTab: 'Konfiguration',
    dataTab: 'Daten',
    configurationHint: 'Konfigurieren Sie das Modulverhalten und die Ergebniszweige.',
    dataHint: 'Ordnen Sie diesem Knoten typisierte Werte zu.',
    inputBindings: 'Eingabezuordnungen',
    addBinding: 'Zuordnung hinzufügen',
    targetInput: 'Zieleingabe',
    valueSource: 'Wertquelle',
    flowInput: 'Flow-Eingabe',
    nodeOutput: 'Ausgabe eines vorgelagerten Knotens',
    literalValue: 'Fester Wert',
    noBindings: 'Es sind keine Eingabezuordnungen konfiguriert.',
  },
  mappingIssues: {
    missingRequiredInput: 'Eine erforderliche Eingabe wurde nicht zugeordnet.',
    missingTargetField: 'Das Zielfeld ist nicht mehr vorhanden.',
    missingSourceField: 'Das Quellfeld ist nicht mehr vorhanden.',
    sourceNotUpstream: 'Die ausgewählte Quelle ist kein vorgelagerter Knoten.',
    incompatibleType: 'Die Typen von Quelle und Ziel stimmen nicht überein.',
    duplicateBinding: 'Diese Eingabe besitzt mehr als eine Zuordnung.',
    staleBinding: 'Diese Zuordnung enthält eine veraltete Referenz.',
    sensitiveLiteralRejected: 'Sensible Werte können nicht als feste Werte gespeichert werden.',
    missingModuleVersion: 'Die festgelegte Modulversion ist nicht verfügbar.',
    legacyCondition: 'Dieser veraltete Ausdruck muss vor der Ausführung umgewandelt werden.',
  },
  conditions: {
    title: 'Bedingungseditor',
    description: 'Erstellen Sie sichere Entscheidungsregeln ohne ausführbare Ausdrücke.',
    matchAll: 'Alle Regeln erfüllen',
    matchAny: 'Mindestens eine Regel erfüllen',
    addRule: 'Regel hinzufügen',
    addGroup: 'Gruppe hinzufügen',
    removeRule: 'Regel entfernen',
    removeGroup: 'Gruppe entfernen',
    leftValue: 'Linker Wert',
    operator: 'Operator',
    rightValue: 'Rechter Wert',
    legacyTitle: 'Veraltete Bedingung',
    legacyDescription: 'Der ursprüngliche Ausdruck bleibt erhalten, wird aber nicht ausgeführt.',
    convertLegacy: 'In Regeln umwandeln',
  },
  conditionOperators: {
    equals: 'Ist gleich',
    notEquals: 'Ist nicht gleich',
    contains: 'Enthält',
    startsWith: 'Beginnt mit',
    endsWith: 'Endet mit',
    greaterThan: 'Ist größer als',
    greaterThanOrEqual: 'Ist größer oder gleich',
    lessThan: 'Ist kleiner als',
    lessThanOrEqual: 'Ist kleiner oder gleich',
    exists: 'Ist vorhanden',
    notExists: 'Ist nicht vorhanden',
  },
  databaseStrategy: {
    title: 'Datenbankstrategie',
    description: 'Steuern Sie die Ausführung der Quellen und die Zusammenführung ihrer Ergebnisse.',
    executionMode: 'Ausführungsmodus',
    parallel: 'Parallel ausführen',
    sequential: 'Nacheinander ausführen',
    aggregation: 'Ergebniszusammenführung',
    anyMatch: 'Mindestens eine Quelle meldet einen Treffer',
    allClear: 'Alle Quellen melden keinen Treffer',
    quorum: 'Quorum',
    weighted: 'Gewichtete Bewertung',
    quorumCount: 'Erforderliche Quellenanzahl',
    weightedThreshold: 'Trefferschwelle',
    sourceWeight: 'Quellengewicht',
    stopOnMatch: 'Nach einem Treffer anhalten',
    requiredSources: 'Erforderliche Quellen',
    unavailablePolicy: 'Verhalten bei nicht verfügbaren Quellen',
    continueOnUnavailable: 'Mit verfügbaren Quellen fortfahren',
    markInconclusive: 'Als nicht eindeutig zurückgeben',
    returnSourceUnavailable: 'Als Quelle nicht verfügbar zurückgeben',
    sourceOrder: 'Quellenreihenfolge',
    sourceOrderHint: 'Diese Reihenfolge wird bei der Ausführung nacheinander verwendet.',
    explanation: 'Ergebnisbegründung',
  },
  scenarios: {
    title: 'Testszenarien',
    description: 'Speichern Sie synthetische Fälle und prüfen Sie jeden Entscheidungspfad.',
    createScenario: 'Szenario erstellen',
    scenarioName: 'Szenarioname',
    scenarioNamePlaceholder: 'Internationale Quelle nicht verfügbar',
    syntheticPreset: 'Synthetischer Eingabedatensatz',
    syntheticNotice: 'Verwenden Sie nur fiktive Datensätze und niemals echte Identitätsdaten.',
    expectedTerminal: 'Erwarteter Endpunkt',
    expectedPath: 'Erwarteter Pfad',
    assertions: 'Prüfbedingungen',
    addAssertion: 'Prüfbedingung hinzufügen',
    run: 'Szenario ausführen',
    runAll: 'Alle aktivierten ausführen',
    running: 'Szenarien werden ausgeführt',
    duplicateScenario: 'Szenario duplizieren',
    deleteScenario: 'Szenario löschen',
    emptyTitle: 'Noch keine Szenarien',
    emptyDescription: 'Erstellen Sie ein synthetisches Szenario, um einen vollständigen Pfad zu testen.',
    passed: 'Bestanden',
    failed: 'Fehlgeschlagen',
    stale: 'Veraltete Referenz',
    notRun: 'Nicht ausgeführt',
    batchSummary: '{passed} bestanden, {failed} fehlgeschlagen',
    coverage: 'Zweigabdeckung',
    coveredBranches: 'Abgedeckte Zweige',
    uncoveredBranches: 'Nicht abgedeckte Zweige',
    focusBranch: 'Zweig anzeigen',
  },
  journey: {
    title: 'Ablaufvorschau',
    description: 'Spielen Sie die Oberfläche entlang des ausgewählten Simulationspfads ab.',
    selectScenario: 'Szenario auswählen',
    noScenario: 'Kein Szenario ausgewählt',
    runPreview: 'Vorschau starten',
    previousStep: 'Vorheriger Schritt',
    nextStep: 'Nächster Schritt',
    restart: 'Neu starten',
    autoplay: 'Automatisch abspielen',
    pause: 'Pausieren',
    executionLog: 'Ausführungsprotokoll',
    currentStep: 'Schritt {current} von {total}',
    noResultTitle: 'Kein Simulationsergebnis',
    noResultDescription: 'Führen Sie ein Szenario aus, um den Vorschauablauf zu erstellen.',
  },
  variantStates: {
    default: 'Standard',
    intro: 'Einführung',
    permission: 'Berechtigung',
    input: 'Eingabe',
    capture: 'Erfassung',
    processing: 'Verarbeitung',
    success: 'Erfolg',
    error: 'Fehler',
    retry: 'Erneuter Versuch',
    matched: 'Treffer',
    notMatched: 'Kein Treffer',
    inconclusive: 'Nicht eindeutig',
    sourceUnavailable: 'Quelle nicht verfügbar',
  },
  studio: {
    variants: 'Bildschirmvarianten',
    addVariant: 'Variante hinzufügen',
    duplicateVariant: 'Variante duplizieren',
    deleteVariant: 'Variante löschen',
    variantState: 'Variantenstatus',
    linkedOutcomes: 'Verknüpfte Ergebnisse',
    defaultVariant: 'Standardvariante',
    orphanedVariant: 'Nicht verknüpfte Variante',
    previewDevice: 'Vorschaugerät',
    previewTheme: 'Vorschaudesign',
  },
  blocks: {
    title: 'Strukturierte Blöcke',
    addBlock: 'Block hinzufügen',
    duplicateBlock: 'Block duplizieren',
    hideBlock: 'Block ausblenden',
    showBlock: 'Block einblenden',
    moveUp: 'Nach oben',
    moveDown: 'Nach unten',
    deleteBlock: 'Block löschen',
    requiredBlock: 'Erforderlicher Block',
    requiredBlockHint: 'Dieser Block ist laut Bildschirmvertrag erforderlich und kann nicht gelöscht werden.',
    emptyTitle: 'Diese Variante enthält keine Blöcke',
    emptyDescription: 'Fügen Sie einen strukturierten Block hinzu, um den Bildschirm aufzubauen.',
    content: 'Blockinhalt',
    visibility: 'Sichtbarkeit',
    alwaysVisible: 'Immer sichtbar',
    conditionalVisibility: 'Anzeigen, wenn Regeln erfüllt sind',
    blockSettings: 'Blockeinstellungen',
  },
  blockTypes: {
    heading: 'Überschrift',
    text: 'Text',
    illustration: 'Illustration',
    consent: 'Einwilligung',
    credentialRequest: 'Nachweisanforderung',
    fieldSummary: 'Feldübersicht',
    instruction: 'Anweisung',
    progress: 'Fortschritt',
    status: 'Status',
    actionGroup: 'Aktionsgruppe',
  },
  localization: {
    title: 'Sprachen der Oberfläche',
    defaultLocale: 'Standardsprache',
    enabledLocales: 'Aktivierte Sprachen',
    previewLocale: 'Vorschausprache',
    translationStatus: 'Übersetzungsstatus',
    complete: 'Vollständig',
    missing: 'Fehlt',
    missingTranslation: 'Dieser Inhalt fehlt in der ausgewählten Sprache.',
    copyFromDefault: 'Aus Standardsprache kopieren',
    useDefaultPreview: 'Inhalt der Standardsprache anzeigen',
    fallbackBadge: 'Vorschau in Standardsprache',
    overflowWarning: 'Diese Übersetzung könnte über ihren Bereich hinausragen.',
    reviewRequired: 'Sprachprüfung erforderlich',
  },
  theme: {
    title: 'Designsystem',
    lightMode: 'Heller Modus',
    darkMode: 'Dunkler Modus',
    semanticColors: 'Semantische Farben',
    typography: 'Typografie',
    controls: 'Bedienelemente',
    borders: 'Rahmen',
    elevation: 'Hervorhebung',
    iconStyle: 'Symbolstil',
    motion: 'Bewegung',
    branding: 'Markenmedien',
    logoLight: 'Logo für helle Hintergründe',
    logoDark: 'Logo für dunkle Hintergründe',
    favicon: 'Favicon-URL',
    standardMotion: 'Standardbewegung',
    reducedMotion: 'Reduzierte Bewegung',
    mobile: 'Mobilgerät',
    tablet: 'Tablet',
    desktop: 'Desktop',
    safeArea: 'Sicherheitsabstand',
  },
  accessibility: {
    title: 'Barrierefreiheitsprüfung',
    description: 'Prüfen Sie die Oberfläche anhand grundlegender Anforderungen an die Barrierefreiheit.',
    runAudit: 'Barrierefreiheitsprüfung starten',
    checking: 'Barrierefreiheit wird geprüft',
    passed: 'Prüfung bestanden',
    errors: 'Fehler',
    warnings: 'Warnungen',
    noIssues: 'Keine Probleme mit der Barrierefreiheit gefunden.',
    fixIssue: 'Betroffenes Element öffnen',
    exportBlocked: 'Beheben Sie Barrierefreiheitsfehler vor dem Export.',
    exportWarning: 'Warnungen verhindern den Export nicht, sollten aber geprüft werden.',
  },
  accessibilityChecks: {
    contrast: 'Der Kontrast von Text oder Bedienelementen erfüllt WCAG AA nicht.',
    headingOrder: 'Die Überschriftenebenen folgen keiner logischen Reihenfolge.',
    missingLabel: 'Ein interaktives Bedienelement hat keine zugängliche Beschriftung.',
    missingAlt: 'Eine informative Illustration hat keinen Alternativtext.',
    touchTarget: 'Eine Berührungsfläche ist kleiner als 44 Pixel.',
    missingFocusMetadata: 'Ein Bedienelement zeigt den Fokus nicht sichtbar an.',
    colorOnlyState: 'Ein Status wird ausschließlich durch Farbe vermittelt.',
    reducedMotion: 'Bewegungen berücksichtigen die Einstellung für reduzierte Bewegung nicht.',
  },
  modules: {
    title: 'Modulkatalog',
    description: 'Verwalten Sie unveränderliche Versionen von Prüfmodulen und deren Verwendung.',
    activeVersion: 'Aktive Version',
    active: 'Aktiv',
    deprecated: 'Veraltet',
    createVersion: 'Neue Version erstellen',
    versionHistory: 'Versionsverlauf',
    usage: 'Von Flows verwendet',
    noUsage: 'Diese Version wird von keinem Flow verwendet.',
    checkCompatibility: 'Kompatibilität prüfen',
    compatible: 'Kompatible Aktualisierung',
    breakingChanges: 'Inkompatible Änderungen',
    upgrade: 'Flows aktualisieren',
    importManifest: 'Manifest importieren',
    exportManifest: 'Manifest exportieren',
    deleteBlocked: 'Eine referenzierte Modulversion kann nicht gelöscht werden.',
  },
  subflows: {
    title: 'Wiederverwendbare Teilflows',
    description: 'Bündeln Sie eine verbundene Graphauswahl zur Verwendung in mehreren Flows.',
    createFromSelection: 'Teilflow aus Auswahl erstellen',
    selectionRequirement: 'Wählen Sie einen verbundenen, kreisfreien Graphen mit einem Eingang und zwei Ausgängen.',
    entryNode: 'Eingangsknoten',
    successExit: 'Erfolgsausgang',
    failureExit: 'Fehlerausgang',
    inputContract: 'Eingabevertrag',
    outputContract: 'Ausgabevertrag',
    versionHistory: 'Versionsverlauf',
    usage: 'Von Flows verwendet',
    recursionBlocked: 'Ein Teilflow darf sich weder direkt noch indirekt selbst referenzieren.',
    depthLimit: 'Die Simulation unterstützt höchstens 10 Verschachtelungsebenen.',
    emptyTitle: 'Keine wiederverwendbaren Teilflows',
    emptyDescription: 'Wählen Sie kompatible Knoten auf der Arbeitsfläche aus, um einen zu erstellen.',
  },
  revisions: {
    title: 'Entwurfsverlauf',
    description: 'Erstellen Sie Sicherungspunkte, vergleichen Sie Änderungen und stellen Sie frühere Entwürfe wieder her.',
    createCheckpoint: 'Sicherungspunkt erstellen',
    checkpointName: 'Name des Sicherungspunkts',
    automatic: 'Automatischer Sicherungspunkt',
    manual: 'Manueller Sicherungspunkt',
    beforeDestructiveChange: 'Vor einer weitreichenden Änderung',
    compare: 'Vergleichen',
    rollback: 'Als neuen Entwurf wiederherstellen',
    currentDraft: 'Aktueller Entwurf',
    emptyTitle: 'Noch keine Sicherungspunkte',
    emptyDescription: 'Nach einer manuellen Speicherung oder geschützten Änderung erscheint ein Sicherungspunkt.',
    retentionNotice: 'Pro Projekt werden bis zu 20 Revisionen aufbewahrt.',
  },
  releases: {
    title: 'Releases',
    description: 'Erstellen Sie unveränderliche Momentaufnahmen und übertragen Sie diese in die Umgebungen.',
    createRelease: 'Release erstellen',
    releaseName: 'Release-Name',
    releaseNotes: 'Release-Hinweise',
    immutableSnapshot: 'Unveränderliche Momentaufnahme',
    dependencyLock: 'Festgelegte Abhängigkeiten',
    test: 'Test',
    staging: 'Staging',
    production: 'Produktion',
    promote: 'Übertragen',
    validationRequired: 'Der Flow muss vor der Testumgebung die Validierung bestehen.',
    scenariosRequired: 'Alle aktivierten Szenarien müssen vor Staging erfolgreich sein.',
    stagingRequired: 'Das Release muss Staging vor der Produktion bestehen.',
    dependenciesRequired: 'Alle festgelegten Abhängigkeiten müssen verfügbar sein.',
    emptyTitle: 'Noch keine Releases',
    emptyDescription: 'Erstellen Sie ein Release aus einem gültigen Entwurf.',
  },
  environments: {
    title: 'Umgebungskonfiguration',
    description: 'Speichern Sie öffentliche Werte und Namen von Geheimnisreferenzen pro Umgebung.',
    publicConfiguration: 'Öffentliche Konfiguration',
    secretReferences: 'Geheimnisreferenzen',
    addVariable: 'Variable hinzufügen',
    variableName: 'Variablenname',
    publicValue: 'Öffentlicher Wert',
    secretReference: 'Name der Geheimnisreferenz',
    secretNotice: 'Geheimniswerte werden niemals in diesem Arbeitsbereich gespeichert.',
    emptyTitle: 'Keine Umgebungsvariablen',
    invalidReference: 'Geben Sie einen gültigen Referenznamen und keinen Geheimniswert ein.',
    deleteVariable: 'Variable löschen',
  },
  integration: {
    title: 'Integrationseinstellungen',
    description: 'Legen Sie fest, wie eine Anwendung den Flow startet und sichere Ergebnisse erhält.',
    mode: 'Integrationsmodus',
    hosted: 'Gehostet',
    embed: 'Eingebettet',
    redirect: 'Weiterleitung',
    allowedOrigins: 'Zulässige Ursprünge',
    addOrigin: 'Ursprung hinzufügen',
    redirectUrls: 'Weiterleitungs-URLs',
    addRedirectUrl: 'Weiterleitungs-URL hinzufügen',
    sessionTimeout: 'Sitzungszeitlimit in Minuten',
    resumePolicy: 'Fortsetzungsrichtlinie',
    resumeDisabled: 'Nicht fortsetzen',
    sameDevice: 'Auf demselben Gerät fortsetzen',
    crossDevice: 'Geräteübergreifend fortsetzen',
    events: 'Aktivierte Ereignisse',
    resultFields: 'Sichere Ergebnisfelder',
    piiDisabled: 'Der Export personenbezogener Daten ist immer deaktiviert.',
    wildcardRejected: 'Platzhalter in Ursprüngen sind nicht zulässig.',
    httpsRequired: 'Verwenden Sie HTTPS, außer bei der Entwicklung auf localhost.',
    validateManifest: 'Integration prüfen',
  },
  integrationEvents: {
    started: 'Flow gestartet',
    stepCompleted: 'Schritt abgeschlossen',
    cancelled: 'Flow abgebrochen',
    finished: 'Flow abgeschlossen',
  },
  analysis: {
    title: 'Flow-Analyse',
    description: 'Finden Sie Abdeckungslücken, ungenutzte Daten, Engpässe und übermäßige Nachweise.',
    runAnalysis: 'Analyse starten',
    analyzing: 'Flow wird analysiert',
    noIssues: 'Keine Analysebefunde.',
    severity: 'Schweregrad',
    critical: 'Kritisch',
    warning: 'Warnung',
    information: 'Information',
    focusItem: 'Auf Arbeitsfläche anzeigen',
    estimatedLatency: 'Geschätzte Dauer',
    estimatedCost: 'Geschätzte Kosten',
    thresholds: 'Analyseschwellen',
  },
  analysisIssues: {
    untestedBranch: 'Dieser Zweig wird von keinem aktivierten Szenario abgedeckt.',
    unusedOutput: 'Eine erzeugte Ausgabe wird nachgelagert nicht verwendet.',
    duplicateDatabaseSource: 'Dieselbe Datenbankquelle wird mehrmals abgefragt.',
    bottleneck: 'Dieser Schritt könnte ein Engpass im kritischen Pfad sein.',
    excessiveEvidence: 'Dieser Ablauf könnte mehr Nachweise als nötig verlangen.',
  },
  storage: {
    localOnly: 'Arbeitsbereichsdaten bleiben in diesem Browser und dürfen keine echten Identitätsdaten enthalten.',
    migrating: 'Arbeitsbereichsdaten werden aktualisiert',
    migrationComplete: 'Die Arbeitsbereichsdaten wurden erfolgreich aktualisiert.',
    migrationFailed: 'Die Arbeitsbereichsdaten konnten nicht aktualisiert werden.',
    backupCreated: 'Eine Sicherung des vorherigen Arbeitsbereichs wurde beibehalten.',
    recovered: 'Nach einem Speicherfehler wurde ein leerer Arbeitsbereich geöffnet.',
    unsupportedVersionTitle: 'Neuere Arbeitsbereichsversion erkannt',
    unsupportedVersionDescription: 'Aktualisieren Sie die Anwendung vor dem Öffnen. Ihre Daten wurden nicht verändert.',
    quotaTitle: 'Der Browserspeicher ist voll',
    quotaDescription: 'Entfernen Sie ungenutzte Entwürfe oder exportieren Sie ein Manifest und versuchen Sie es erneut.',
    readError: 'Die Arbeitsbereichsdaten konnten nicht gelesen werden.',
    readErrorDescription: 'Prüfen Sie die Browserspeicher-Berechtigung für diese Website und laden Sie die Seite anschließend neu.',
    privacyErrorDescription: 'Der Arbeitsbereich ist im Wiederherstellungsmodus geöffnet. Entfernen Sie gespeicherte direkte Identitätswerte, unsichere Testmetadaten oder Geheimwerte, bevor Sie erneut speichern.',
    writeError: 'Änderungen konnten nicht im Browserspeicher gespeichert werden.',
    retry: 'Speichervorgang wiederholen',
  },
  aria: {
    advancedWorkspace: 'Erweiterter Arbeitsbereich für Identitätsprüfungen',
    inspectorTabs: 'Bereiche der Knoteneinstellungen',
    mappingRow: 'Eingabezuordnung',
    conditionGroup: 'Bedingungsgruppe',
    conditionRule: 'Bedingungsregel',
    databaseSourceOrder: 'Ausführungsreihenfolge der Datenbankquellen',
    scenarioActions: 'Szenarioaktionen',
    scenarioResults: 'Szenarioergebnisse',
    journeyTimeline: 'Zeitleiste der Ablaufvorschau',
    blockList: 'Strukturierte Blöcke der Oberfläche',
    blockActions: 'Blockaktionen',
    previewFrame: 'Vorschau der Prüfoberfläche',
    localeSelector: 'Auswahl der Vorschausprache',
    themeSelector: 'Auswahl des Vorschaudesigns',
    analysisResults: 'Ergebnisse der Flow-Analyse',
    closeDialog: 'Dialog schließen',
  },
  operationErrors: {
    moduleVersionMissing: 'Die ausgewählte Modulversion ist nicht mehr verfügbar.',
    moduleVersionConflict: 'Diese Modulversion ist bereits vorhanden.',
    moduleStillInUse: 'Das Modul kann nicht gelöscht werden, solange es von einem Flow, Teilflow oder Release verwendet wird.',
    moduleLifecycleBlocked: 'Diese Änderung am Modullebenszyklus ist im aktuellen Zustand nicht zulässig.',
    requiredInputsMissing: 'Ordnen Sie die neuen Pflichtfelder zu, bevor Sie diesen Knoten aktualisieren.',
    moduleManifestInvalid: 'Das Modulmanifest ist kein gültiges JSON oder entspricht nicht dem unterstützten Vertrag.',
    subflowSelectionInvalid: 'Wählen Sie einen verbundenen, azyklischen Bereich mit einem Einstieg und getrennten Erfolgs- und Fehlerausstiegen.',
    subflowDependencyInvalid: 'Dieser Teilflow würde eine fehlende, rekursive oder zu tiefe Abhängigkeit erzeugen.',
    subflowVersionConflict: 'Diese Teilflow-Version ist bereits vorhanden.',
    revisionUnavailable: 'Dieser Sicherungspunkt ist nicht verfügbar oder gehört zu einem anderen Flow.',
    releaseVersionInvalid: 'Geben Sie eine eindeutige, nicht leere Release-Version ein.',
    releaseValidationRequired: 'Beheben Sie vor der Freigabe für Test alle Validierungsfehler des Flows.',
    releaseScenariosRequired: 'Vor der Freigabe für Staging müssen alle aktivierten Szenarien ausgeführt und bestanden sein.',
    releaseStagingRequired: 'Geben Sie dieses Release zuerst für die vorherige Umgebung frei.',
    releaseDependenciesInvalid: 'Mindestens eine gesperrte Modul- oder Teilflow-Abhängigkeit ist nicht verfügbar.',
    releaseAlreadyPromoted: 'Dieses Release wurde bereits für diese Umgebung freigegeben.',
    environmentInvalid: 'Die Umgebung enthält eine ungültige Stufe, einen öffentlichen Wert oder einen ungültigen Namen für eine Geheimnisreferenz.',
    originInvalid: 'Geben Sie einen eindeutigen HTTPS-Ursprung ein. Localhost darf HTTP verwenden; Platzhalter sind nicht erlaubt.',
    redirectInvalid: 'Geben Sie eine eindeutige HTTPS-Weiterleitungs-URL ein. Localhost darf HTTP verwenden.',
    integrationInvalid: 'Beheben Sie die markierten Integrationseinstellungen, bevor Sie fortfahren.',
    operationFailed: 'Der Vorgang konnte nicht abgeschlossen werden. Prüfen Sie die aktuelle Konfiguration und versuchen Sie es erneut.',
  },
  toasts: {
    bindingSaved: 'Eingabezuordnung gespeichert.',
    bindingRemoved: 'Eingabezuordnung entfernt.',
    conditionSaved: 'Bedingungsregeln gespeichert.',
    strategySaved: 'Datenbankstrategie gespeichert.',
    scenarioCreated: 'Szenario erstellt.',
    scenarioDuplicated: 'Szenario dupliziert.',
    scenarioDeleted: 'Szenario gelöscht.',
    scenarioRunComplete: 'Szenariolauf abgeschlossen.',
    batchComplete: 'Szenariolauf abgeschlossen.',
    journeyReady: 'Der Vorschauablauf ist bereit.',
    variantCreated: 'Bildschirmvariante erstellt.',
    variantDeleted: 'Bildschirmvariante gelöscht.',
    blockAdded: 'Block hinzugefügt.',
    blockDuplicated: 'Block dupliziert.',
    blockDeleted: 'Block gelöscht.',
    translationCopied: 'Inhalt aus der Standardsprache kopiert.',
    themeSaved: 'Designsystem gespeichert.',
    accessibilityAuditComplete: 'Barrierefreiheitsprüfung abgeschlossen.',
    moduleVersionCreated: 'Modulversion erstellt.',
    moduleImported: 'Modulmanifest importiert.',
    moduleDeleted: 'Modul gelöscht.',
    moduleUpgradeComplete: 'Modulaktualisierung abgeschlossen.',
    moduleDeprecated: 'Modulversion als veraltet markiert.',
    subflowCreated: 'Wiederverwendbarer Teilflow erstellt.',
    subflowVersionCreated: 'Teilflow-Version erstellt.',
    subflowDeleted: 'Wiederverwendbarer Teilflow gelöscht.',
    checkpointCreated: 'Sicherungspunkt des Entwurfs erstellt.',
    rollbackComplete: 'Früherer Inhalt als neuer Entwurf wiederhergestellt.',
    releaseCreated: 'Release erstellt.',
    promotionComplete: 'Release erfolgreich übertragen.',
    environmentVariableSaved: 'Umgebungsvariable gespeichert.',
    environmentVariableDeleted: 'Umgebungsvariable gelöscht.',
    integrationValid: 'Die Integrationseinstellungen sind gültig.',
    integrationInvalid: 'Die Integrationseinstellungen enthalten Fehler.',
    analysisComplete: 'Flow-Analyse abgeschlossen.',
    storageRetrySucceeded: 'Der Speicher des Arbeitsbereichs ist wieder verfügbar.',
  },
  modals: {
    deleteScenarioTitle: 'Dieses Szenario löschen?',
    deleteScenarioDescription: 'Die synthetischen Datensätze und Prüfbedingungen dieses Szenarios werden entfernt.',
    deleteBlockTitle: 'Diesen Block löschen?',
    deleteBlockDescription: 'Der Block und seine lokalisierten Inhalte werden aus dieser Variante entfernt.',
    deleteVariantTitle: 'Diese Bildschirmvariante löschen?',
    deleteVariantDescription: 'Alle strukturierten Blöcke und lokalisierten Inhalte dieser Variante werden entfernt.',
    deprecateModuleTitle: 'Diese Modulversion als veraltet markieren?',
    deprecateModuleDescription: 'Bestehende Flows bleiben festgelegt, neue Flows verwenden diese Version jedoch nicht.',
    deleteModuleTitle: 'Dieses Modul löschen?',
    deleteModuleDescription: 'Nur ungenutzte Modulpakete und -versionen können gelöscht werden.',
    importModuleTitle: 'Modulmanifest importieren',
    importModuleDescription: 'Nur geprüfte JSON-Manifeste werden akzeptiert. Importierte Inhalte werden niemals ausgeführt.',
    createSubflowTitle: 'Wiederverwendbaren Teilflow erstellen',
    createSubflowDescription: 'Prüfen Sie Eingang, Ausgänge und Datenvertrag, bevor Sie die erste Version erstellen.',
    deleteSubflowTitle: 'Diesen wiederverwendbaren Teilflow löschen?',
    deleteSubflowDescription: 'Nur Teilflows ohne Referenz aus einem Flow oder Release können gelöscht werden.',
    createCheckpointTitle: 'Sicherungspunkt für Entwurf erstellen',
    createCheckpointDescription: 'Halten Sie den aktuellen Entwurf fest, um ihn später vergleichen oder wiederherstellen zu können.',
    rollbackTitle: 'Diese Revision wiederherstellen?',
    rollbackDescription: 'Eine neue Entwurfsrevision wird erstellt. Der vorhandene Verlauf bleibt unverändert.',
    createReleaseTitle: 'Unveränderliches Release erstellen',
    createReleaseDescription: 'Der aktuelle Flow, die Oberfläche und die Abhängigkeitsversionen werden festgelegt.',
    promoteReleaseTitle: 'Dieses Release übertragen?',
    promoteReleaseDescription: 'Zuerst werden die Anforderungen der Zielumgebung geprüft.',
    deleteVariableTitle: 'Diese Umgebungsvariable löschen?',
    deleteVariableDescription: 'Der öffentliche Wert oder der Name der Geheimnisreferenz wird entfernt.',
    convertLegacyTitle: 'Veraltete Bedingung umwandeln?',
    convertLegacyDescription: 'Prüfen Sie die erzeugten Regeln sorgfältig. Der ursprüngliche Ausdruck wird nicht ausgeführt.',
    copyDefaultTranslationTitle: 'Diese Übersetzung ersetzen?',
    copyDefaultTranslationDescription: 'Der aktuelle Inhalt wird durch eine Kopie aus der Standardsprache ersetzt.',
  },
};

const vi: DashboardAdvancedCopy = {
  common: {
    add: 'Thêm',
    create: 'Tạo',
    save: 'Lưu',
    cancel: 'Hủy',
    close: 'Đóng',
    delete: 'Xóa',
    duplicate: 'Nhân bản',
    edit: 'Chỉnh sửa',
    remove: 'Gỡ bỏ',
    enabled: 'Đã bật',
    disabled: 'Đã tắt',
    required: 'Bắt buộc',
    optional: 'Không bắt buộc',
    loading: 'Đang tải',
    noResults: 'Không có kết quả',
    estimated: 'Ước tính',
  },
  inspector: {
    configurationTab: 'Cấu hình',
    dataTab: 'Dữ liệu',
    configurationHint: 'Cấu hình cách mô-đun hoạt động và các nhánh kết quả.',
    dataHint: 'Ánh xạ các giá trị đúng kiểu dữ liệu vào node này.',
    inputBindings: 'Ánh xạ đầu vào',
    addBinding: 'Thêm ánh xạ',
    targetInput: 'Đầu vào đích',
    valueSource: 'Nguồn giá trị',
    flowInput: 'Đầu vào của luồng',
    nodeOutput: 'Đầu ra của node phía trước',
    literalValue: 'Giá trị cố định',
    noBindings: 'Chưa cấu hình ánh xạ đầu vào.',
  },
  mappingIssues: {
    missingRequiredInput: 'Một đầu vào bắt buộc chưa được ánh xạ.',
    missingTargetField: 'Trường đích không còn tồn tại.',
    missingSourceField: 'Trường nguồn không còn tồn tại.',
    sourceNotUpstream: 'Nguồn đã chọn không phải là node phía trước.',
    incompatibleType: 'Kiểu dữ liệu của nguồn và đích không khớp.',
    duplicateBinding: 'Đầu vào này đang có nhiều hơn một ánh xạ.',
    staleBinding: 'Ánh xạ này chứa tham chiếu đã lỗi thời.',
    sensitiveLiteralRejected: 'Không được lưu dữ liệu nhạy cảm dưới dạng giá trị cố định.',
    missingModuleVersion: 'Không tìm thấy phiên bản mô-đun đã được ghim.',
    legacyCondition: 'Biểu thức cũ này phải được chuyển đổi trước khi có thể chạy.',
  },
  conditions: {
    title: 'Bộ dựng điều kiện',
    description: 'Tạo quy tắc ra quyết định an toàn mà không dùng biểu thức thực thi.',
    matchAll: 'Thỏa mãn tất cả quy tắc',
    matchAny: 'Thỏa mãn ít nhất một quy tắc',
    addRule: 'Thêm quy tắc',
    addGroup: 'Thêm nhóm',
    removeRule: 'Gỡ quy tắc',
    removeGroup: 'Gỡ nhóm',
    leftValue: 'Giá trị bên trái',
    operator: 'Toán tử',
    rightValue: 'Giá trị bên phải',
    legacyTitle: 'Điều kiện định dạng cũ',
    legacyDescription: 'Biểu thức gốc được giữ lại nhưng sẽ không được thực thi.',
    convertLegacy: 'Chuyển thành quy tắc',
  },
  conditionOperators: {
    equals: 'Bằng',
    notEquals: 'Không bằng',
    contains: 'Có chứa',
    startsWith: 'Bắt đầu bằng',
    endsWith: 'Kết thúc bằng',
    greaterThan: 'Lớn hơn',
    greaterThanOrEqual: 'Lớn hơn hoặc bằng',
    lessThan: 'Nhỏ hơn',
    lessThanOrEqual: 'Nhỏ hơn hoặc bằng',
    exists: 'Tồn tại',
    notExists: 'Không tồn tại',
  },
  databaseStrategy: {
    title: 'Chiến lược đối chiếu cơ sở dữ liệu',
    description: 'Kiểm soát cách chạy các nguồn đã chọn và cách tổng hợp kết quả.',
    executionMode: 'Chế độ thực thi',
    parallel: 'Chạy song song',
    sequential: 'Chạy lần lượt',
    aggregation: 'Cách tổng hợp kết quả',
    anyMatch: 'Chỉ cần một nguồn khớp',
    allClear: 'Tất cả nguồn đều không khớp',
    quorum: 'Số nguồn đồng thuận',
    weighted: 'Điểm có trọng số',
    quorumCount: 'Số nguồn bắt buộc',
    weightedThreshold: 'Ngưỡng xác định khớp',
    sourceWeight: 'Trọng số của nguồn',
    stopOnMatch: 'Dừng ngay khi tìm thấy kết quả khớp',
    requiredSources: 'Nguồn bắt buộc',
    unavailablePolicy: 'Cách xử lý khi nguồn không khả dụng',
    continueOnUnavailable: 'Tiếp tục với các nguồn đang khả dụng',
    markInconclusive: 'Trả về chưa thể kết luận',
    returnSourceUnavailable: 'Trả về nguồn không khả dụng',
    sourceOrder: 'Thứ tự nguồn',
    sourceOrderHint: 'Thứ tự này được dùng khi chạy lần lượt.',
    explanation: 'Giải thích kết quả',
  },
  scenarios: {
    title: 'Kịch bản kiểm thử',
    description: 'Lưu các trường hợp dùng dữ liệu giả và kiểm tra mọi đường đi quyết định.',
    createScenario: 'Tạo kịch bản',
    scenarioName: 'Tên kịch bản',
    scenarioNamePlaceholder: 'Nguồn quốc tế không khả dụng',
    syntheticPreset: 'Bộ dữ liệu đầu vào giả',
    syntheticNotice: 'Chỉ dùng dữ liệu hoàn toàn hư cấu. Không nhập dữ liệu định danh thật.',
    expectedTerminal: 'Điểm kết thúc mong đợi',
    expectedPath: 'Đường đi mong đợi',
    assertions: 'Điều kiện kiểm tra',
    addAssertion: 'Thêm điều kiện kiểm tra',
    run: 'Chạy kịch bản',
    runAll: 'Chạy tất cả kịch bản đã bật',
    running: 'Đang chạy các kịch bản',
    duplicateScenario: 'Nhân bản kịch bản',
    deleteScenario: 'Xóa kịch bản',
    emptyTitle: 'Chưa có kịch bản',
    emptyDescription: 'Tạo một kịch bản với dữ liệu giả để kiểm tra toàn bộ đường đi.',
    passed: 'Đạt',
    failed: 'Không đạt',
    stale: 'Tham chiếu đã lỗi thời',
    notRun: 'Chưa chạy',
    batchSummary: '{passed} đạt, {failed} không đạt',
    coverage: 'Độ bao phủ nhánh',
    coveredBranches: 'Nhánh đã được kiểm tra',
    uncoveredBranches: 'Nhánh chưa được kiểm tra',
    focusBranch: 'Đưa nhánh vào vùng nhìn',
  },
  journey: {
    title: 'Xem trước hành trình',
    description: 'Phát lại giao diện theo đường đi mô phỏng đã chọn.',
    selectScenario: 'Chọn kịch bản',
    noScenario: 'Chưa chọn kịch bản',
    runPreview: 'Chạy bản xem trước',
    previousStep: 'Bước trước',
    nextStep: 'Bước tiếp theo',
    restart: 'Chạy lại từ đầu',
    autoplay: 'Tự động phát',
    pause: 'Tạm dừng',
    executionLog: 'Nhật ký thực thi',
    currentStep: 'Bước {current} trên {total}',
    noResultTitle: 'Chưa có kết quả mô phỏng',
    noResultDescription: 'Chạy một kịch bản để tạo hành trình xem trước.',
  },
  variantStates: {
    default: 'Mặc định',
    intro: 'Giới thiệu',
    permission: 'Cấp quyền',
    input: 'Nhập dữ liệu',
    capture: 'Thu nhận dữ liệu',
    processing: 'Đang xử lý',
    success: 'Thành công',
    error: 'Lỗi',
    retry: 'Thử lại',
    matched: 'Có kết quả khớp',
    notMatched: 'Không có kết quả khớp',
    inconclusive: 'Chưa thể kết luận',
    sourceUnavailable: 'Nguồn không khả dụng',
  },
  studio: {
    variants: 'Biến thể màn hình',
    addVariant: 'Thêm biến thể',
    duplicateVariant: 'Nhân bản biến thể',
    deleteVariant: 'Xóa biến thể',
    variantState: 'Trạng thái của biến thể',
    linkedOutcomes: 'Kết quả được liên kết',
    defaultVariant: 'Biến thể mặc định',
    orphanedVariant: 'Biến thể không còn liên kết',
    previewDevice: 'Thiết bị xem trước',
    previewTheme: 'Giao diện xem trước',
  },
  blocks: {
    title: 'Khối giao diện có cấu trúc',
    addBlock: 'Thêm khối',
    duplicateBlock: 'Nhân bản khối',
    hideBlock: 'Ẩn khối',
    showBlock: 'Hiện khối',
    moveUp: 'Di chuyển lên',
    moveDown: 'Di chuyển xuống',
    deleteBlock: 'Xóa khối',
    requiredBlock: 'Khối bắt buộc',
    requiredBlockHint: 'Khối này là thành phần bắt buộc của màn hình nên không thể xóa.',
    emptyTitle: 'Biến thể này chưa có khối nào',
    emptyDescription: 'Thêm khối có cấu trúc để xây dựng màn hình.',
    content: 'Nội dung khối',
    visibility: 'Điều kiện hiển thị',
    alwaysVisible: 'Luôn hiển thị',
    conditionalVisibility: 'Hiển thị khi thỏa mãn quy tắc',
    blockSettings: 'Cài đặt khối',
  },
  blockTypes: {
    heading: 'Tiêu đề',
    text: 'Văn bản',
    illustration: 'Hình minh họa',
    consent: 'Chấp thuận',
    credentialRequest: 'Yêu cầu chứng thư số',
    fieldSummary: 'Tóm tắt trường dữ liệu',
    instruction: 'Hướng dẫn',
    progress: 'Tiến trình',
    status: 'Trạng thái',
    actionGroup: 'Nhóm thao tác',
  },
  localization: {
    title: 'Ngôn ngữ giao diện',
    defaultLocale: 'Ngôn ngữ mặc định',
    enabledLocales: 'Ngôn ngữ đã bật',
    previewLocale: 'Ngôn ngữ xem trước',
    translationStatus: 'Trạng thái bản dịch',
    complete: 'Đã hoàn tất',
    missing: 'Còn thiếu',
    missingTranslation: 'Nội dung này chưa có trong ngôn ngữ đang chọn.',
    copyFromDefault: 'Sao chép từ ngôn ngữ mặc định',
    useDefaultPreview: 'Xem trước nội dung bằng ngôn ngữ mặc định',
    fallbackBadge: 'Đang xem bằng ngôn ngữ mặc định',
    overflowWarning: 'Bản dịch này có thể vượt ra ngoài vùng hiển thị.',
    reviewRequired: 'Cần rà soát bản dịch',
  },
  theme: {
    title: 'Hệ thống thiết kế',
    lightMode: 'Chế độ sáng',
    darkMode: 'Chế độ tối',
    semanticColors: 'Màu sắc theo ngữ nghĩa',
    typography: 'Kiểu chữ',
    controls: 'Thành phần điều khiển',
    borders: 'Đường viền',
    elevation: 'Độ nổi',
    iconStyle: 'Kiểu biểu tượng',
    motion: 'Hiệu ứng chuyển động',
    branding: 'Tài nguyên thương hiệu',
    logoLight: 'Logo trên nền sáng',
    logoDark: 'Logo trên nền tối',
    favicon: 'URL biểu tượng trang',
    standardMotion: 'Chuyển động tiêu chuẩn',
    reducedMotion: 'Giảm chuyển động',
    mobile: 'Điện thoại',
    tablet: 'Máy tính bảng',
    desktop: 'Máy tính',
    safeArea: 'Vùng hiển thị an toàn',
  },
  accessibility: {
    title: 'Trình kiểm tra khả năng tiếp cận',
    description: 'Kiểm tra giao diện theo các yêu cầu thiết yếu về khả năng tiếp cận.',
    runAudit: 'Chạy kiểm tra khả năng tiếp cận',
    checking: 'Đang kiểm tra khả năng tiếp cận',
    passed: 'Đã vượt qua kiểm tra',
    errors: 'Lỗi',
    warnings: 'Cảnh báo',
    noIssues: 'Không phát hiện vấn đề về khả năng tiếp cận.',
    fixIssue: 'Mở thành phần có vấn đề',
    exportBlocked: 'Khắc phục các lỗi khả năng tiếp cận trước khi xuất.',
    exportWarning: 'Cảnh báo không chặn việc xuất nhưng nên được rà soát.',
  },
  accessibilityChecks: {
    contrast: 'Độ tương phản của chữ hoặc thành phần điều khiển chưa đạt WCAG AA.',
    headingOrder: 'Các cấp tiêu đề chưa tuân theo thứ tự hợp lý.',
    missingLabel: 'Một thành phần tương tác chưa có nhãn hỗ trợ khả năng tiếp cận.',
    missingAlt: 'Hình minh họa có thông tin chưa có văn bản thay thế.',
    touchTarget: 'Vùng chạm nhỏ hơn 44 pixel.',
    missingFocusMetadata: 'Một thành phần điều khiển chưa thể hiện rõ trạng thái focus.',
    colorOnlyState: 'Một trạng thái chỉ được truyền đạt bằng màu sắc.',
    reducedMotion: 'Hiệu ứng chưa tôn trọng tùy chọn giảm chuyển động.',
  },
  modules: {
    title: 'Danh mục mô-đun',
    description: 'Quản lý các phiên bản mô-đun xác minh bất biến và nơi chúng được sử dụng.',
    activeVersion: 'Phiên bản đang hoạt động',
    active: 'Đang hoạt động',
    deprecated: 'Không còn khuyến nghị',
    createVersion: 'Tạo phiên bản mới',
    versionHistory: 'Lịch sử phiên bản',
    usage: 'Luồng đang sử dụng',
    noUsage: 'Không có luồng nào đang sử dụng phiên bản này.',
    checkCompatibility: 'Kiểm tra tính tương thích',
    compatible: 'Bản nâng cấp tương thích',
    breakingChanges: 'Thay đổi không tương thích',
    upgrade: 'Nâng cấp các luồng',
    importManifest: 'Nhập manifest',
    exportManifest: 'Xuất manifest',
    deleteBlocked: 'Không thể xóa phiên bản mô-đun đang được tham chiếu.',
  },
  subflows: {
    title: 'Luồng con dùng lại',
    description: 'Đóng gói một nhóm node được kết nối để sử dụng trong nhiều luồng.',
    createFromSelection: 'Tạo luồng con từ vùng chọn',
    selectionRequirement: 'Chọn một đồ thị có kết nối, không có chu trình, gồm một đầu vào và hai đầu ra.',
    entryNode: 'Node đầu vào',
    successExit: 'Đầu ra thành công',
    failureExit: 'Đầu ra thất bại',
    inputContract: 'Hợp đồng đầu vào',
    outputContract: 'Hợp đồng đầu ra',
    versionHistory: 'Lịch sử phiên bản',
    usage: 'Luồng đang sử dụng',
    recursionBlocked: 'Luồng con không thể tham chiếu trực tiếp hoặc gián tiếp đến chính nó.',
    depthLimit: 'Trình mô phỏng hỗ trợ tối đa 10 cấp lồng nhau.',
    emptyTitle: 'Chưa có luồng con dùng lại',
    emptyDescription: 'Chọn các node tương thích trên canvas để tạo luồng con.',
  },
  revisions: {
    title: 'Lịch sử bản nháp',
    description: 'Tạo điểm lưu, so sánh thay đổi và khôi phục một bản nháp trước đó.',
    createCheckpoint: 'Tạo điểm lưu',
    checkpointName: 'Tên điểm lưu',
    automatic: 'Điểm lưu tự động',
    manual: 'Điểm lưu thủ công',
    beforeDestructiveChange: 'Trước thay đổi có ảnh hưởng lớn',
    compare: 'So sánh',
    rollback: 'Khôi phục thành bản nháp mới',
    currentDraft: 'Bản nháp hiện tại',
    emptyTitle: 'Chưa có điểm lưu',
    emptyDescription: 'Điểm lưu sẽ xuất hiện sau khi lưu thủ công hoặc trước một thay đổi được bảo vệ.',
    retentionNotice: 'Mỗi dự án được giữ lại tối đa 20 bản sửa đổi.',
  },
  releases: {
    title: 'Bản phát hành',
    description: 'Tạo bản chụp bất biến và chuyển chúng qua các môi trường.',
    createRelease: 'Tạo bản phát hành',
    releaseName: 'Tên bản phát hành',
    releaseNotes: 'Ghi chú phát hành',
    immutableSnapshot: 'Bản chụp bất biến',
    dependencyLock: 'Khóa phiên bản phụ thuộc',
    test: 'Kiểm thử',
    staging: 'Tiền sản xuất',
    production: 'Sản xuất',
    promote: 'Chuyển môi trường',
    validationRequired: 'Luồng phải vượt qua kiểm tra hợp lệ trước khi vào môi trường Kiểm thử.',
    scenariosRequired: 'Tất cả kịch bản đã bật phải đạt trước khi vào môi trường Tiền sản xuất.',
    stagingRequired: 'Bản phát hành phải vượt qua môi trường Tiền sản xuất trước khi vào Sản xuất.',
    dependenciesRequired: 'Mọi phiên bản phụ thuộc đã ghim phải còn khả dụng.',
    emptyTitle: 'Chưa có bản phát hành',
    emptyDescription: 'Tạo bản phát hành từ một bản nháp hợp lệ.',
  },
  environments: {
    title: 'Cấu hình môi trường',
    description: 'Lưu giá trị công khai và tên tham chiếu bí mật cho từng môi trường.',
    publicConfiguration: 'Cấu hình công khai',
    secretReferences: 'Tham chiếu bí mật',
    addVariable: 'Thêm biến',
    variableName: 'Tên biến',
    publicValue: 'Giá trị công khai',
    secretReference: 'Tên tham chiếu bí mật',
    secretNotice: 'Giá trị bí mật không bao giờ được lưu trong workspace này.',
    emptyTitle: 'Chưa có biến môi trường',
    invalidReference: 'Hãy nhập tên tham chiếu hợp lệ, không nhập giá trị bí mật.',
    deleteVariable: 'Xóa biến',
  },
  integration: {
    title: 'Cài đặt tích hợp',
    description: 'Xác định cách ứng dụng khởi chạy luồng và nhận kết quả an toàn.',
    mode: 'Chế độ tích hợp',
    hosted: 'Trang được lưu trữ sẵn',
    embed: 'Nhúng vào ứng dụng',
    redirect: 'Chuyển hướng',
    allowedOrigins: 'Nguồn được phép',
    addOrigin: 'Thêm nguồn',
    redirectUrls: 'URL chuyển hướng',
    addRedirectUrl: 'Thêm URL chuyển hướng',
    sessionTimeout: 'Thời gian hết hạn phiên tính bằng phút',
    resumePolicy: 'Cách tiếp tục phiên',
    resumeDisabled: 'Không tiếp tục phiên',
    sameDevice: 'Tiếp tục trên cùng thiết bị',
    crossDevice: 'Tiếp tục trên thiết bị khác',
    events: 'Sự kiện đã bật',
    resultFields: 'Trường kết quả an toàn',
    piiDisabled: 'Luôn tắt xuất dữ liệu cá nhân.',
    wildcardRejected: 'Không cho phép nguồn dùng ký tự đại diện.',
    httpsRequired: 'Phải dùng HTTPS, ngoại trừ khi phát triển trên localhost.',
    validateManifest: 'Kiểm tra cấu hình tích hợp',
  },
  integrationEvents: {
    started: 'Luồng đã bắt đầu',
    stepCompleted: 'Bước đã hoàn tất',
    cancelled: 'Luồng đã bị hủy',
    finished: 'Luồng đã hoàn tất',
  },
  analysis: {
    title: 'Phân tích luồng',
    description: 'Tìm nhánh chưa được kiểm tra, dữ liệu không được dùng, điểm nghẽn và yêu cầu bằng chứng quá mức.',
    runAnalysis: 'Chạy phân tích',
    analyzing: 'Đang phân tích luồng',
    noIssues: 'Không phát hiện vấn đề qua phân tích.',
    severity: 'Mức độ',
    critical: 'Nghiêm trọng',
    warning: 'Cảnh báo',
    information: 'Thông tin',
    focusItem: 'Đưa lên canvas',
    estimatedLatency: 'Thời lượng ước tính',
    estimatedCost: 'Chi phí ước tính',
    thresholds: 'Ngưỡng phân tích',
  },
  analysisIssues: {
    untestedBranch: 'Nhánh này chưa được kịch bản đã bật nào kiểm tra.',
    unusedOutput: 'Một đầu ra được tạo nhưng không được dùng ở các bước sau.',
    duplicateDatabaseSource: 'Cùng một nguồn dữ liệu đang bị truy vấn nhiều lần.',
    bottleneck: 'Bước này có thể là điểm nghẽn trên đường đi quan trọng.',
    excessiveEvidence: 'Hành trình này có thể đang yêu cầu nhiều bằng chứng hơn cần thiết.',
  },
  storage: {
    localOnly: 'Dữ liệu workspace chỉ nằm trong trình duyệt này và không được chứa dữ liệu định danh thật.',
    migrating: 'Đang nâng cấp dữ liệu workspace',
    migrationComplete: 'Đã nâng cấp dữ liệu workspace thành công.',
    migrationFailed: 'Không thể nâng cấp dữ liệu workspace.',
    backupCreated: 'Đã giữ lại bản sao lưu của workspace trước đó.',
    recovered: 'Đã mở workspace sạch sau khi gặp lỗi lưu trữ.',
    unsupportedVersionTitle: 'Phát hiện phiên bản workspace mới hơn',
    unsupportedVersionDescription: 'Hãy cập nhật ứng dụng trước khi mở workspace này. Dữ liệu của bạn không bị thay đổi.',
    quotaTitle: 'Bộ nhớ trình duyệt đã đầy',
    quotaDescription: 'Xóa bản nháp không dùng hoặc xuất manifest trước khi thử lại.',
    readError: 'Không thể đọc dữ liệu workspace.',
    readErrorDescription: 'Hãy kiểm tra quyền lưu trữ của trình duyệt cho trang này rồi tải lại trang.',
    privacyErrorDescription: 'Workspace đang được mở ở chế độ khôi phục. Hãy xóa giá trị định danh nhập trực tiếp, metadata kiểm thử không an toàn hoặc giá trị bí mật đã lưu trước khi lưu lại.',
    writeError: 'Không thể lưu thay đổi vào bộ nhớ trình duyệt.',
    retry: 'Thử lại thao tác lưu trữ',
  },
  aria: {
    advancedWorkspace: 'Workspace xác minh nâng cao',
    inspectorTabs: 'Các phần của bảng cấu hình node',
    mappingRow: 'Ánh xạ đầu vào',
    conditionGroup: 'Nhóm điều kiện',
    conditionRule: 'Quy tắc điều kiện',
    databaseSourceOrder: 'Thứ tự chạy nguồn cơ sở dữ liệu',
    scenarioActions: 'Thao tác với kịch bản',
    scenarioResults: 'Kết quả kịch bản',
    journeyTimeline: 'Dòng thời gian xem trước hành trình',
    blockList: 'Các khối giao diện có cấu trúc',
    blockActions: 'Thao tác với khối',
    previewFrame: 'Bản xem trước giao diện xác minh',
    localeSelector: 'Bộ chọn ngôn ngữ xem trước',
    themeSelector: 'Bộ chọn giao diện xem trước',
    analysisResults: 'Kết quả phân tích luồng',
    closeDialog: 'Đóng hộp thoại',
  },
  operationErrors: {
    moduleVersionMissing: 'Phiên bản mô-đun đã chọn không còn khả dụng.',
    moduleVersionConflict: 'Phiên bản mô-đun này đã tồn tại.',
    moduleStillInUse: 'Không thể xóa mô-đun khi vẫn còn flow, luồng con hoặc bản phát hành sử dụng nó.',
    moduleLifecycleBlocked: 'Không thể thay đổi vòng đời mô-đun ở trạng thái hiện tại.',
    requiredInputsMissing: 'Hãy ánh xạ các đầu vào bắt buộc mới trước khi nâng cấp node này.',
    moduleManifestInvalid: 'Manifest mô-đun không phải JSON hợp lệ hoặc không khớp contract được hỗ trợ.',
    subflowSelectionInvalid: 'Hãy chọn một vùng liên thông, không có chu trình, có một điểm vào và hai điểm ra thành công/thất bại riêng.',
    subflowDependencyInvalid: 'Luồng con này sẽ tạo dependency bị thiếu, đệ quy hoặc vượt quá độ sâu cho phép.',
    subflowVersionConflict: 'Phiên bản luồng con này đã tồn tại.',
    revisionUnavailable: 'Điểm lưu này không còn khả dụng hoặc thuộc về một flow khác.',
    releaseVersionInvalid: 'Hãy nhập phiên bản phát hành duy nhất và không để trống.',
    releaseValidationRequired: 'Hãy xử lý hết lỗi validation của flow trước khi đưa lên Test.',
    releaseScenariosRequired: 'Mọi kịch bản đang bật phải được chạy và đạt trước khi đưa lên Staging.',
    releaseStagingRequired: 'Hãy đưa bản phát hành qua môi trường trước đó trước.',
    releaseDependenciesInvalid: 'Một hoặc nhiều phiên bản mô-đun hay luồng con đã khóa không còn khả dụng.',
    releaseAlreadyPromoted: 'Bản phát hành này đã được đưa lên môi trường đó.',
    environmentInvalid: 'Môi trường có stage, giá trị public hoặc tên secret reference không hợp lệ.',
    originInvalid: 'Hãy nhập origin HTTPS duy nhất. Localhost có thể dùng HTTP; không chấp nhận wildcard.',
    redirectInvalid: 'Hãy nhập redirect URL HTTPS duy nhất. Localhost có thể dùng HTTP.',
    integrationInvalid: 'Hãy xử lý các thiết lập tích hợp đang được chỉ ra trước khi tiếp tục.',
    operationFailed: 'Không thể hoàn tất thao tác. Hãy kiểm tra cấu hình hiện tại rồi thử lại.',
  },
  toasts: {
    bindingSaved: 'Đã lưu ánh xạ đầu vào.',
    bindingRemoved: 'Đã gỡ ánh xạ đầu vào.',
    conditionSaved: 'Đã lưu các quy tắc điều kiện.',
    strategySaved: 'Đã lưu chiến lược đối chiếu cơ sở dữ liệu.',
    scenarioCreated: 'Đã tạo kịch bản.',
    scenarioDuplicated: 'Đã nhân bản kịch bản.',
    scenarioDeleted: 'Đã xóa kịch bản.',
    scenarioRunComplete: 'Đã chạy xong kịch bản.',
    batchComplete: 'Đã chạy xong nhóm kịch bản.',
    journeyReady: 'Hành trình xem trước đã sẵn sàng.',
    variantCreated: 'Đã tạo biến thể màn hình.',
    variantDeleted: 'Đã xóa biến thể màn hình.',
    blockAdded: 'Đã thêm khối.',
    blockDuplicated: 'Đã nhân bản khối.',
    blockDeleted: 'Đã xóa khối.',
    translationCopied: 'Đã sao chép nội dung từ ngôn ngữ mặc định.',
    themeSaved: 'Đã lưu hệ thống thiết kế.',
    accessibilityAuditComplete: 'Đã hoàn tất kiểm tra khả năng tiếp cận.',
    moduleVersionCreated: 'Đã tạo phiên bản mô-đun.',
    moduleImported: 'Đã nhập manifest mô-đun.',
    moduleDeleted: 'Đã xóa mô-đun.',
    moduleUpgradeComplete: 'Đã hoàn tất nâng cấp mô-đun.',
    moduleDeprecated: 'Đã đánh dấu phiên bản mô-đun là không còn khuyến nghị.',
    subflowCreated: 'Đã tạo luồng con dùng lại.',
    subflowVersionCreated: 'Đã tạo phiên bản luồng con.',
    subflowDeleted: 'Đã xóa luồng con dùng lại.',
    checkpointCreated: 'Đã tạo điểm lưu cho bản nháp.',
    rollbackComplete: 'Đã khôi phục nội dung trước đó thành bản nháp mới.',
    releaseCreated: 'Đã tạo bản phát hành.',
    promotionComplete: 'Đã chuyển bản phát hành sang môi trường mới.',
    environmentVariableSaved: 'Đã lưu biến môi trường.',
    environmentVariableDeleted: 'Đã xóa biến môi trường.',
    integrationValid: 'Cấu hình tích hợp hợp lệ.',
    integrationInvalid: 'Cấu hình tích hợp còn lỗi.',
    analysisComplete: 'Đã phân tích xong luồng.',
    storageRetrySucceeded: 'Bộ nhớ workspace đã hoạt động trở lại.',
  },
  modals: {
    deleteScenarioTitle: 'Xóa kịch bản này?',
    deleteScenarioDescription: 'Dữ liệu giả và các điều kiện kiểm tra trong kịch bản này sẽ bị xóa.',
    deleteBlockTitle: 'Xóa khối này?',
    deleteBlockDescription: 'Khối cùng nội dung theo từng ngôn ngữ sẽ bị xóa khỏi biến thể này.',
    deleteVariantTitle: 'Xóa biến thể màn hình này?',
    deleteVariantDescription: 'Tất cả khối có cấu trúc và nội dung theo từng ngôn ngữ trong biến thể sẽ bị xóa.',
    deprecateModuleTitle: 'Đánh dấu phiên bản mô-đun này là không còn khuyến nghị?',
    deprecateModuleDescription: 'Các luồng hiện tại vẫn ghim phiên bản này, nhưng luồng mới sẽ không sử dụng nó.',
    deleteModuleTitle: 'Xóa mô-đun này?',
    deleteModuleDescription: 'Chỉ có thể xóa gói và phiên bản mô-đun không còn được sử dụng.',
    importModuleTitle: 'Nhập manifest mô-đun',
    importModuleDescription: 'Chỉ chấp nhận manifest JSON đã được kiểm tra. Nội dung nhập vào sẽ không bao giờ được thực thi.',
    createSubflowTitle: 'Tạo luồng con dùng lại',
    createSubflowDescription: 'Kiểm tra node đầu vào, hai đầu ra và hợp đồng dữ liệu trước khi tạo phiên bản đầu tiên.',
    deleteSubflowTitle: 'Xóa luồng con dùng lại này?',
    deleteSubflowDescription: 'Chỉ có thể xóa luồng con không được luồng hoặc bản phát hành nào tham chiếu.',
    createCheckpointTitle: 'Tạo điểm lưu cho bản nháp',
    createCheckpointDescription: 'Lưu lại bản nháp hiện tại để có thể so sánh hoặc khôi phục sau này.',
    rollbackTitle: 'Khôi phục bản sửa đổi này?',
    rollbackDescription: 'Một bản sửa đổi mới sẽ được tạo. Lịch sử hiện có không bị thay đổi.',
    createReleaseTitle: 'Tạo bản phát hành bất biến',
    createReleaseDescription: 'Luồng, giao diện và phiên bản phụ thuộc hiện tại sẽ được khóa.',
    promoteReleaseTitle: 'Chuyển môi trường cho bản phát hành này?',
    promoteReleaseDescription: 'Hệ thống sẽ kiểm tra các yêu cầu của môi trường đích trước.',
    deleteVariableTitle: 'Xóa biến môi trường này?',
    deleteVariableDescription: 'Giá trị công khai hoặc tên tham chiếu bí mật sẽ bị xóa.',
    convertLegacyTitle: 'Chuyển đổi điều kiện định dạng cũ?',
    convertLegacyDescription: 'Hãy kiểm tra kỹ các quy tắc được tạo. Biểu thức gốc sẽ không được thực thi.',
    copyDefaultTranslationTitle: 'Thay thế bản dịch này?',
    copyDefaultTranslationDescription: 'Nội dung hiện tại sẽ được thay bằng bản sao từ ngôn ngữ mặc định.',
  },
};

export const DASHBOARD_ADVANCED_TRANSLATIONS = {
  en,
  es,
  ja,
  de,
  vi,
} as const satisfies Record<'en' | 'es' | 'ja' | 'de' | 'vi', DashboardAdvancedCopy>;
