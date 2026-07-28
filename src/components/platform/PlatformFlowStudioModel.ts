/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const PLATFORM_FLOW_PRESET_IDS = [
  'ssi-minimal',
  'kyc-high-assurance',
  'kyb-business',
  'blank',
] as const;

export type PlatformFlowPresetId = typeof PLATFORM_FLOW_PRESET_IDS[number];

export const PLATFORM_FLOW_STEP_IDS = [
  'identity-credential',
  'business-registration-credential',
  'ownership-match',
  'government-id',
  'selfie-liveness',
  'database-kyc',
  'watchlist',
] as const;

export type PlatformFlowStepId = typeof PLATFORM_FLOW_STEP_IDS[number];
export type PlatformFlowStepMode = 'always' | 'step-up';

export interface PlatformFlowStepConfig {
  id: PlatformFlowStepId;
  mode: PlatformFlowStepMode;
}

export const PLATFORM_FLOW_RULE_FIELDS = [
  'risk-score',
  'credential-status',
  'watchlist-status',
  'device-trust',
] as const;

export type PlatformFlowRuleField = typeof PLATFORM_FLOW_RULE_FIELDS[number];

export const PLATFORM_FLOW_RULE_OPERATORS = [
  'less-than',
  'less-than-or-equal',
  'greater-than',
  'greater-than-or-equal',
  'equals',
  'not-equals',
] as const;

export type PlatformFlowRuleOperator = typeof PLATFORM_FLOW_RULE_OPERATORS[number];

export const PLATFORM_FLOW_ACTION_TYPES = [
  'approve',
  'request-step-up',
  'manual-review',
  'reject',
  'send-webhook',
] as const;

export type PlatformFlowActionType = typeof PLATFORM_FLOW_ACTION_TYPES[number];

export interface PlatformFlowAction {
  type: PlatformFlowActionType;
  stepId?: PlatformFlowStepId;
}

export interface PlatformFlowRuleConfig {
  id: string;
  field: PlatformFlowRuleField;
  operator: PlatformFlowRuleOperator;
  value: number | string;
  action: PlatformFlowAction;
}

export const PLATFORM_FLOW_SIGNAL_IDS = [
  'device-fingerprint',
  'ip-reputation',
  'behavior-velocity',
  'graph-links',
] as const;

export type PlatformFlowSignalId = typeof PLATFORM_FLOW_SIGNAL_IDS[number];

export interface PlatformFlowConfig {
  schemaVersion: 1;
  flowId: string;
  name: string;
  verificationSteps: PlatformFlowStepConfig[];
  workflowRules: PlatformFlowRuleConfig[];
  fallbackAction: PlatformFlowAction;
  preventionSignals: PlatformFlowSignalId[];
}

export type PlatformFlowValidationIssue =
  | 'missing-name'
  | 'missing-verification-step'
  | 'duplicate-verification-step'
  | 'duplicate-rule-id'
  | 'invalid-risk-value'
  | 'invalid-rule-operator'
  | 'missing-step-up-target'
  | 'invalid-step-up-target';

export interface PlatformFlowMetrics {
  completionRate: number;
  assuranceScore: number;
  fraudDetectionRate: number;
  estimatedSeconds: number;
}

export const PLATFORM_FLOW_SCENARIO_IDS = [
  'trusted',
  'step-up',
  'fraud-ring',
] as const;

export type PlatformFlowScenarioId = typeof PLATFORM_FLOW_SCENARIO_IDS[number];
export type PlatformCredentialStatus = 'valid' | 'invalid';
export type PlatformWatchlistStatus = 'clear' | 'hit';
export type PlatformDeviceTrust = 'trusted' | 'suspicious';
export type PlatformFlowExecutionStatus = 'passed' | 'warning' | 'failed' | 'skipped';

export interface PlatformFlowStepResult {
  stepId: PlatformFlowStepId;
  mode: PlatformFlowStepMode;
  status: PlatformFlowExecutionStatus;
}

export interface PlatformFlowSignalResult {
  signalId: PlatformFlowSignalId;
  riskDelta: number;
  status: PlatformFlowExecutionStatus;
}

export interface PlatformFlowGraphNode {
  id: 'subject' | 'account-2' | 'account-3' | 'device' | 'ip';
  type: 'account' | 'device' | 'ip';
  x: number;
  y: number;
  status: 'clean' | 'suspicious' | 'blocked';
}

export interface PlatformFlowGraphLink {
  source: PlatformFlowGraphNode['id'];
  target: PlatformFlowGraphNode['id'];
  status: 'clean' | 'suspicious';
}

export interface PlatformFlowSimulationResult {
  scenarioId: PlatformFlowScenarioId;
  riskScore: number;
  credentialStatus: PlatformCredentialStatus;
  watchlistStatus: PlatformWatchlistStatus;
  deviceTrust: PlatformDeviceTrust;
  stepResults: PlatformFlowStepResult[];
  signalResults: PlatformFlowSignalResult[];
  matchedRuleId: string | null;
  action: PlatformFlowAction;
  graph: {
    nodes: PlatformFlowGraphNode[];
    links: PlatformFlowGraphLink[];
  } | null;
}

export type PlatformFlowConfigAction =
  | { type: 'load-preset'; presetId: PlatformFlowPresetId }
  | { type: 'set-name'; name: string }
  | { type: 'add-step'; stepId: PlatformFlowStepId; mode?: PlatformFlowStepMode }
  | { type: 'remove-step'; stepId: PlatformFlowStepId }
  | { type: 'set-step-mode'; stepId: PlatformFlowStepId; mode: PlatformFlowStepMode }
  | { type: 'move-step'; stepId: PlatformFlowStepId; direction: 'up' | 'down' }
  | { type: 'reorder-step'; stepId: PlatformFlowStepId; targetStepId: PlatformFlowStepId }
  | { type: 'add-rule' }
  | { type: 'remove-rule'; ruleId: string }
  | { type: 'move-rule'; ruleId: string; direction: 'up' | 'down' }
  | { type: 'update-rule'; ruleId: string; patch: Partial<Omit<PlatformFlowRuleConfig, 'id'>> }
  | { type: 'set-fallback-action'; action: PlatformFlowAction }
  | { type: 'toggle-signal'; signalId: PlatformFlowSignalId };

interface PlatformFlowScenarioDefinition {
  credentialStatus: PlatformCredentialStatus;
  watchlistStatus: PlatformWatchlistStatus;
  deviceTrust: PlatformDeviceTrust;
  baseRiskScore: number;
  signalDeltas: Record<PlatformFlowSignalId, number>;
}

const STEP_METRICS: Record<
  PlatformFlowStepId,
  { friction: number; assurance: number; detection: number; seconds: number }
> = {
  'identity-credential': { friction: 1, assurance: 18, detection: 9, seconds: 5 },
  'business-registration-credential': { friction: 1, assurance: 18, detection: 9, seconds: 6 },
  'ownership-match': { friction: 2, assurance: 14, detection: 12, seconds: 4 },
  'government-id': { friction: 9, assurance: 17, detection: 12, seconds: 35 },
  'selfie-liveness': { friction: 8, assurance: 17, detection: 15, seconds: 25 },
  'database-kyc': { friction: 2, assurance: 10, detection: 10, seconds: 4 },
  watchlist: { friction: 1, assurance: 8, detection: 13, seconds: 3 },
};

const SIGNAL_DETECTION_SCORES: Record<PlatformFlowSignalId, number> = {
  'device-fingerprint': 8,
  'ip-reputation': 7,
  'behavior-velocity': 8,
  'graph-links': 12,
};

const SCENARIOS: Record<PlatformFlowScenarioId, PlatformFlowScenarioDefinition> = {
  trusted: {
    credentialStatus: 'valid',
    watchlistStatus: 'clear',
    deviceTrust: 'trusted',
    baseRiskScore: 18,
    signalDeltas: {
      'device-fingerprint': -4,
      'ip-reputation': -3,
      'behavior-velocity': -3,
      'graph-links': -2,
    },
  },
  'step-up': {
    credentialStatus: 'valid',
    watchlistStatus: 'clear',
    deviceTrust: 'suspicious',
    baseRiskScore: 30,
    signalDeltas: {
      'device-fingerprint': 8,
      'ip-reputation': 7,
      'behavior-velocity': 6,
      'graph-links': 4,
    },
  },
  'fraud-ring': {
    credentialStatus: 'valid',
    watchlistStatus: 'hit',
    deviceTrust: 'suspicious',
    baseRiskScore: 55,
    signalDeltas: {
      'device-fingerprint': 12,
      'ip-reputation': 10,
      'behavior-velocity': 9,
      'graph-links': 14,
    },
  },
};

const createRule = (
  id: string,
  field: PlatformFlowRuleField,
  operator: PlatformFlowRuleOperator,
  value: number | string,
  action: PlatformFlowAction,
): PlatformFlowRuleConfig => ({ id, field, operator, value, action });

const PRESET_CONFIGS: Record<PlatformFlowPresetId, PlatformFlowConfig> = {
  'ssi-minimal': {
    schemaVersion: 1,
    flowId: 'ssi-minimal-disclosure',
    name: 'ssi-minimal-disclosure',
    verificationSteps: [
      { id: 'identity-credential', mode: 'always' },
      { id: 'database-kyc', mode: 'always' },
      { id: 'watchlist', mode: 'always' },
      { id: 'selfie-liveness', mode: 'step-up' },
    ],
    workflowRules: [
      createRule('rule-1', 'risk-score', 'greater-than-or-equal', 75, { type: 'reject' }),
      createRule('rule-2', 'watchlist-status', 'equals', 'hit', { type: 'manual-review' }),
      createRule('rule-3', 'device-trust', 'equals', 'suspicious', {
        type: 'request-step-up',
        stepId: 'selfie-liveness',
      }),
      createRule('rule-4', 'risk-score', 'less-than', 35, { type: 'approve' }),
    ],
    fallbackAction: { type: 'manual-review' },
    preventionSignals: ['device-fingerprint', 'ip-reputation', 'behavior-velocity'],
  },
  'kyc-high-assurance': {
    schemaVersion: 1,
    flowId: 'kyc-high-assurance',
    name: 'kyc-high-assurance',
    verificationSteps: [
      { id: 'government-id', mode: 'always' },
      { id: 'selfie-liveness', mode: 'always' },
      { id: 'database-kyc', mode: 'always' },
      { id: 'watchlist', mode: 'always' },
    ],
    workflowRules: [
      createRule('rule-1', 'credential-status', 'equals', 'invalid', { type: 'reject' }),
      createRule('rule-2', 'watchlist-status', 'equals', 'hit', { type: 'manual-review' }),
      createRule('rule-3', 'risk-score', 'greater-than-or-equal', 80, { type: 'reject' }),
      createRule('rule-4', 'risk-score', 'less-than', 55, { type: 'approve' }),
    ],
    fallbackAction: { type: 'manual-review' },
    preventionSignals: [
      'device-fingerprint',
      'ip-reputation',
      'behavior-velocity',
      'graph-links',
    ],
  },
  'kyb-business': {
    schemaVersion: 1,
    flowId: 'kyb-business-ownership',
    name: 'kyb-business-ownership',
    verificationSteps: [
      { id: 'identity-credential', mode: 'always' },
      { id: 'business-registration-credential', mode: 'always' },
      { id: 'ownership-match', mode: 'always' },
      { id: 'database-kyc', mode: 'always' },
      { id: 'watchlist', mode: 'always' },
      { id: 'selfie-liveness', mode: 'step-up' },
    ],
    workflowRules: [
      createRule('rule-1', 'credential-status', 'equals', 'invalid', { type: 'reject' }),
      createRule('rule-2', 'watchlist-status', 'equals', 'hit', { type: 'manual-review' }),
      createRule('rule-3', 'risk-score', 'greater-than-or-equal', 70, { type: 'manual-review' }),
      createRule('rule-4', 'device-trust', 'equals', 'suspicious', {
        type: 'request-step-up',
        stepId: 'selfie-liveness',
      }),
      createRule('rule-5', 'risk-score', 'less-than', 35, { type: 'approve' }),
    ],
    fallbackAction: { type: 'manual-review' },
    preventionSignals: [
      'device-fingerprint',
      'ip-reputation',
      'behavior-velocity',
      'graph-links',
    ],
  },
  blank: {
    schemaVersion: 1,
    flowId: 'custom-verification-flow',
    name: 'custom-verification-flow',
    verificationSteps: [],
    workflowRules: [],
    fallbackAction: { type: 'manual-review' },
    preventionSignals: [],
  },
};

const cloneAction = (action: PlatformFlowAction): PlatformFlowAction => ({ ...action });

const cloneConfig = (config: PlatformFlowConfig): PlatformFlowConfig => ({
  ...config,
  verificationSteps: config.verificationSteps.map((step) => ({ ...step })),
  workflowRules: config.workflowRules.map((rule) => ({
    ...rule,
    action: cloneAction(rule.action),
  })),
  fallbackAction: cloneAction(config.fallbackAction),
  preventionSignals: [...config.preventionSignals],
});

export function createPlatformFlowConfig(
  presetId: PlatformFlowPresetId = 'ssi-minimal',
): PlatformFlowConfig {
  return cloneConfig(PRESET_CONFIGS[presetId]);
}

const moveItem = <T,>(items: T[], currentIndex: number, targetIndex: number) => {
  if (
    currentIndex < 0
    || targetIndex < 0
    || currentIndex >= items.length
    || targetIndex >= items.length
    || currentIndex === targetIndex
  ) {
    return items;
  }

  const next = [...items];
  const [item] = next.splice(currentIndex, 1);
  next.splice(targetIndex, 0, item);
  return next;
};

const nextRuleId = (rules: PlatformFlowRuleConfig[]) => {
  const used = new Set(rules.map((rule) => rule.id));
  let index = rules.length + 1;
  while (used.has(`rule-${index}`)) index += 1;
  return `rule-${index}`;
};

export function platformFlowReducer(
  config: PlatformFlowConfig,
  action: PlatformFlowConfigAction,
): PlatformFlowConfig {
  switch (action.type) {
    case 'load-preset':
      return createPlatformFlowConfig(action.presetId);
    case 'set-name':
      return action.name === config.name ? config : { ...config, name: action.name };
    case 'add-step': {
      if (config.verificationSteps.some((step) => step.id === action.stepId)) return config;
      return {
        ...config,
        verificationSteps: [
          ...config.verificationSteps,
          { id: action.stepId, mode: action.mode ?? 'always' },
        ],
      };
    }
    case 'remove-step':
      return {
        ...config,
        verificationSteps: config.verificationSteps.filter((step) => step.id !== action.stepId),
      };
    case 'set-step-mode':
      return {
        ...config,
        verificationSteps: config.verificationSteps.map((step) => (
          step.id === action.stepId ? { ...step, mode: action.mode } : step
        )),
      };
    case 'move-step': {
      const index = config.verificationSteps.findIndex((step) => step.id === action.stepId);
      const targetIndex = action.direction === 'up' ? index - 1 : index + 1;
      const verificationSteps = moveItem(config.verificationSteps, index, targetIndex);
      return verificationSteps === config.verificationSteps ? config : { ...config, verificationSteps };
    }
    case 'reorder-step': {
      const index = config.verificationSteps.findIndex((step) => step.id === action.stepId);
      const targetIndex = config.verificationSteps.findIndex((step) => step.id === action.targetStepId);
      const verificationSteps = moveItem(config.verificationSteps, index, targetIndex);
      return verificationSteps === config.verificationSteps ? config : { ...config, verificationSteps };
    }
    case 'add-rule':
      return {
        ...config,
        workflowRules: [
          ...config.workflowRules,
          createRule(
            nextRuleId(config.workflowRules),
            'risk-score',
            'greater-than-or-equal',
            70,
            { type: 'manual-review' },
          ),
        ],
      };
    case 'remove-rule':
      return {
        ...config,
        workflowRules: config.workflowRules.filter((rule) => rule.id !== action.ruleId),
      };
    case 'move-rule': {
      const index = config.workflowRules.findIndex((rule) => rule.id === action.ruleId);
      const targetIndex = action.direction === 'up' ? index - 1 : index + 1;
      const workflowRules = moveItem(config.workflowRules, index, targetIndex);
      return workflowRules === config.workflowRules ? config : { ...config, workflowRules };
    }
    case 'update-rule':
      return {
        ...config,
        workflowRules: config.workflowRules.map((rule) => (
          rule.id === action.ruleId
            ? {
                ...rule,
                ...action.patch,
                action: action.patch.action ? cloneAction(action.patch.action) : rule.action,
              }
            : rule
        )),
      };
    case 'set-fallback-action':
      return { ...config, fallbackAction: cloneAction(action.action) };
    case 'toggle-signal':
      return {
        ...config,
        preventionSignals: config.preventionSignals.includes(action.signalId)
          ? config.preventionSignals.filter((signalId) => signalId !== action.signalId)
          : [...config.preventionSignals, action.signalId],
      };
    default:
      return config;
  }
}

export function getPlatformFlowOperators(
  field: PlatformFlowRuleField,
): PlatformFlowRuleOperator[] {
  if (field === 'risk-score') {
    return [
      'less-than',
      'less-than-or-equal',
      'greater-than',
      'greater-than-or-equal',
      'equals',
    ];
  }

  return ['equals', 'not-equals'];
}

const validateAction = (
  action: PlatformFlowAction,
  steps: PlatformFlowStepConfig[],
): PlatformFlowValidationIssue[] => {
  if (action.type !== 'request-step-up') return [];
  if (!action.stepId) return ['missing-step-up-target'];

  const target = steps.find((step) => step.id === action.stepId);
  return target?.mode === 'step-up' ? [] : ['invalid-step-up-target'];
};

export function validatePlatformFlowConfig(
  config: PlatformFlowConfig,
): PlatformFlowValidationIssue[] {
  const issues = new Set<PlatformFlowValidationIssue>();
  if (!config.name.trim()) issues.add('missing-name');
  if (config.verificationSteps.length === 0) issues.add('missing-verification-step');

  if (new Set(config.verificationSteps.map((step) => step.id)).size !== config.verificationSteps.length) {
    issues.add('duplicate-verification-step');
  }

  if (new Set(config.workflowRules.map((rule) => rule.id)).size !== config.workflowRules.length) {
    issues.add('duplicate-rule-id');
  }

  for (const rule of config.workflowRules) {
    if (!getPlatformFlowOperators(rule.field).includes(rule.operator)) {
      issues.add('invalid-rule-operator');
    }

    if (
      rule.field === 'risk-score'
      && (
        typeof rule.value !== 'number'
        || !Number.isFinite(rule.value)
        || rule.value < 0
        || rule.value > 100
      )
    ) {
      issues.add('invalid-risk-value');
    }

    validateAction(rule.action, config.verificationSteps).forEach((issue) => issues.add(issue));
  }

  validateAction(config.fallbackAction, config.verificationSteps)
    .forEach((issue) => issues.add(issue));

  return [...issues];
}

const round = (value: number, fractionDigits = 0) => {
  const multiplier = 10 ** fractionDigits;
  return Math.round(value * multiplier) / multiplier;
};

export function calculatePlatformFlowMetrics(config: PlatformFlowConfig): PlatformFlowMetrics {
  const stepTotals = config.verificationSteps.reduce(
    (totals, step) => {
      const profile = STEP_METRICS[step.id];
      const multiplier = step.mode === 'always' ? 1 : 0.25;
      return {
        friction: totals.friction + profile.friction * multiplier,
        assurance: totals.assurance + profile.assurance * multiplier,
        detection: totals.detection + profile.detection * multiplier,
        seconds: totals.seconds + profile.seconds * multiplier,
      };
    },
    { friction: 0, assurance: 0, detection: 0, seconds: 0 },
  );

  const signalDetection = config.preventionSignals.reduce(
    (total, signalId) => total + SIGNAL_DETECTION_SCORES[signalId],
    0,
  );

  return {
    completionRate: round(Math.max(62, Math.min(98, 98 - stepTotals.friction)), 1),
    assuranceScore: round(Math.max(20, Math.min(100, 35 + stepTotals.assurance))),
    fraudDetectionRate: round(
      Math.max(40, Math.min(99.9, 42 + stepTotals.detection + signalDetection)),
      1,
    ),
    estimatedSeconds: round(Math.max(4, stepTotals.seconds), 0),
  };
}

const compareRule = (
  actualValue: number | string,
  operator: PlatformFlowRuleOperator,
  expectedValue: number | string,
) => {
  if (typeof actualValue === 'number' && typeof expectedValue === 'number') {
    if (operator === 'less-than') return actualValue < expectedValue;
    if (operator === 'less-than-or-equal') return actualValue <= expectedValue;
    if (operator === 'greater-than') return actualValue > expectedValue;
    if (operator === 'greater-than-or-equal') return actualValue >= expectedValue;
    if (operator === 'equals') return actualValue === expectedValue;
    if (operator === 'not-equals') return actualValue !== expectedValue;
  }

  if (operator === 'equals') return actualValue === expectedValue;
  if (operator === 'not-equals') return actualValue !== expectedValue;
  return false;
};

const getRuleActualValue = (
  rule: PlatformFlowRuleConfig,
  scenario: PlatformFlowScenarioDefinition,
  riskScore: number,
) => {
  if (rule.field === 'risk-score') return riskScore;
  if (rule.field === 'credential-status') return scenario.credentialStatus;
  if (rule.field === 'watchlist-status') return scenario.watchlistStatus;
  return scenario.deviceTrust;
};

const getStepStatus = (
  stepId: PlatformFlowStepId,
  scenarioId: PlatformFlowScenarioId,
): PlatformFlowExecutionStatus => {
  if (scenarioId === 'trusted') return 'passed';
  if (scenarioId === 'step-up') {
    return stepId === 'selfie-liveness' ? 'warning' : 'passed';
  }

  if (
    stepId === 'ownership-match'
    || stepId === 'selfie-liveness'
    || stepId === 'watchlist'
  ) {
    return 'failed';
  }

  return stepId === 'database-kyc' ? 'warning' : 'passed';
};

const FRAUD_GRAPH: NonNullable<PlatformFlowSimulationResult['graph']> = {
  nodes: [
    { id: 'subject', type: 'account', x: 50, y: 18, status: 'suspicious' },
    { id: 'account-2', type: 'account', x: 18, y: 72, status: 'suspicious' },
    { id: 'account-3', type: 'account', x: 82, y: 72, status: 'suspicious' },
    { id: 'device', type: 'device', x: 36, y: 45, status: 'blocked' },
    { id: 'ip', type: 'ip', x: 64, y: 45, status: 'blocked' },
  ],
  links: [
    { source: 'subject', target: 'device', status: 'suspicious' },
    { source: 'subject', target: 'ip', status: 'suspicious' },
    { source: 'account-2', target: 'device', status: 'suspicious' },
    { source: 'account-3', target: 'ip', status: 'suspicious' },
    { source: 'device', target: 'ip', status: 'suspicious' },
  ],
};

export function runPlatformFlowSimulation(
  config: PlatformFlowConfig,
  scenarioId: PlatformFlowScenarioId,
): PlatformFlowSimulationResult {
  const scenario = SCENARIOS[scenarioId];
  const signalResults = config.preventionSignals.map((signalId) => {
    const riskDelta = scenario.signalDeltas[signalId];
    return {
      signalId,
      riskDelta,
      status: riskDelta >= 10
        ? 'failed'
        : riskDelta > 0
          ? 'warning'
          : 'passed',
    } satisfies PlatformFlowSignalResult;
  });

  const riskScore = Math.max(
    0,
    Math.min(
      100,
      scenario.baseRiskScore
        + signalResults.reduce((total, signal) => total + signal.riskDelta, 0),
    ),
  );

  const matchedRule = config.workflowRules.find((rule) => (
    compareRule(
      getRuleActualValue(rule, scenario, riskScore),
      rule.operator,
      rule.value,
    )
  ));
  const action = cloneAction(matchedRule?.action ?? config.fallbackAction);

  const stepResults = config.verificationSteps.map((step) => {
    if (step.mode === 'step-up' && action.stepId !== step.id) {
      return {
        stepId: step.id,
        mode: step.mode,
        status: 'skipped',
      } satisfies PlatformFlowStepResult;
    }

    return {
      stepId: step.id,
      mode: step.mode,
      status: getStepStatus(step.id, scenarioId),
    } satisfies PlatformFlowStepResult;
  });

  return {
    scenarioId,
    riskScore,
    credentialStatus: scenario.credentialStatus,
    watchlistStatus: scenario.watchlistStatus,
    deviceTrust: scenario.deviceTrust,
    stepResults,
    signalResults,
    matchedRuleId: matchedRule?.id ?? null,
    action,
    graph: scenarioId === 'fraud-ring' && config.preventionSignals.includes('graph-links')
      ? cloneConfigGraph(FRAUD_GRAPH)
      : null,
  };
}

const cloneConfigGraph = (
  graph: NonNullable<PlatformFlowSimulationResult['graph']>,
): NonNullable<PlatformFlowSimulationResult['graph']> => ({
  nodes: graph.nodes.map((node) => ({ ...node })),
  links: graph.links.map((link) => ({ ...link })),
});

export function serializePlatformFlowConfig(config: PlatformFlowConfig) {
  return JSON.stringify(config, null, 2);
}

export function generatePlatformFlowTypescript(config: PlatformFlowConfig) {
  const serializedConfig = serializePlatformFlowConfig(config);
  return `import { Identra } from '@identra/node';

// Illustrative SDK contract for sandbox demonstrations only.
// Replace it with the production Identra SDK contract before deployment.
const identra = new Identra({
  environment: 'sandbox',
});

const flowConfig = ${serializedConfig} as const;

const flow = await identra.flows.create(flowConfig);
const session = await flow.start({
  externalReference: 'your-customer-reference',
});

const decision = await identra.workflows.waitForDecision(session.id);
console.log(decision);`;
}

export function sanitizePlatformFlowFileName(name: string) {
  const normalized = name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64);

  return normalized || 'identra-verification-flow';
}
