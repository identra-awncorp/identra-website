/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Locale } from '../../types/routes';
import { isConditionOperatorCompatible } from './conditionEngine';
import { getBuiltInModuleContract } from './dashboardModuleRegistry';
import type {
  AccessibilityIssue,
  AccessibilityIssueCode,
  AccessibilityReport,
  ConditionGroup,
  ConditionOperator,
  DynamicFlowNodeV2,
  FlowField,
  FlowFieldType,
  FlowProjectV2,
  IntegrationSettings,
  InterfaceBlock,
  InterfaceManifestV2,
  InterfaceScreenV2,
  InterfaceScreenVariant,
  InterfaceVariantState,
  LocalizedContent,
  ModuleContract,
  ModulePackage,
  OutcomeId,
  ScenarioExecutionResult,
  SemanticColorTokens,
  SubflowPackage,
} from './dashboardV2Types';

const MODULE_SCREEN_PREFIX = 'module-screen:';
const PRE_OUTCOME_STATES = [
  'intro',
  'permission',
  'input',
  'capture',
  'processing',
] as const satisfies readonly InterfaceVariantState[];

const INTERFACE_VARIANT_STATES = new Set<InterfaceVariantState>([
  'default',
  'intro',
  'permission',
  'input',
  'capture',
  'processing',
  'success',
  'error',
  'retry',
  'matched',
  'notMatched',
  'inconclusive',
  'sourceUnavailable',
]);

const CONDITION_OPERATORS = new Set<ConditionOperator>([
  'equals',
  'notEquals',
  'contains',
  'startsWith',
  'endsWith',
  'greaterThan',
  'greaterThanOrEqual',
  'lessThan',
  'lessThanOrEqual',
  'exists',
  'notExists',
]);

const normalizeSupportedStates = (
  states: readonly InterfaceVariantState[],
): readonly InterfaceVariantState[] => [...new Set(states)]
  .filter((state) => INTERFACE_VARIANT_STATES.has(state));

const screenIdentity = (screen: InterfaceScreenV2): string =>
  `${screen.kind}\u0000${screen.sourceNodeId ?? ''}\u0000${screen.id}`;

const uniqueScreens = (
  screens: readonly InterfaceScreenV2[],
): readonly InterfaceScreenV2[] => screens.filter(
  (screen, index) => screens.findIndex(
    (candidate) => screenIdentity(candidate) === screenIdentity(screen),
  ) === index,
);

const resolveModuleContract = (
  node: Extract<DynamicFlowNodeV2, { readonly kind: 'verification' }>,
  moduleCatalog: readonly ModulePackage[],
): ModuleContract | null => {
  const builtIn = getBuiltInModuleContract(node.moduleRef.packageId);
  if (builtIn?.ref.version === node.moduleRef.version) return builtIn;
  return moduleCatalog
    .find((item) => item.id === node.moduleRef.packageId)
    ?.versions.find((version) => version.version === node.moduleRef.version)
    ?.contract ?? null;
};

const resolveSubflow = (
  node: Extract<DynamicFlowNodeV2, { readonly kind: 'subflow' }>,
  subflowCatalog: readonly SubflowPackage[],
) => subflowCatalog
  .find((item) => item.id === node.subflowRef.packageId)
  ?.versions.find((version) => version.version === node.subflowRef.version) ?? null;

const stateForOutcome = (outcome: OutcomeId | undefined): InterfaceVariantState | null => {
  if (!outcome) return null;
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

type NodeInterfaceContract = {
  readonly states: readonly InterfaceVariantState[];
  readonly outcomes: readonly OutcomeId[];
  readonly dependencyMissing: boolean;
};

const interfaceContractForNode = (
  node: Extract<
    DynamicFlowNodeV2,
    { readonly kind: 'verification' | 'subflow' }
  >,
  moduleCatalog: readonly ModulePackage[],
  subflowCatalog: readonly SubflowPackage[],
): NodeInterfaceContract => {
  if (node.kind === 'subflow') {
    return {
      states: ['intro', 'processing', 'success', 'error'],
      outcomes: ['success', 'failure'],
      dependencyMissing: !resolveSubflow(node, subflowCatalog),
    };
  }
  const contract = resolveModuleContract(node, moduleCatalog);
  return {
    states: contract
      ? normalizeSupportedStates(contract.uiCapabilities.supportedStates)
      : ['default'],
    outcomes: contract?.outcomes.map((outcome) => outcome.id) ?? ['success', 'failure'],
    dependencyMissing: !contract,
  };
};

const localizedNodeName = (
  node: DynamicFlowNodeV2,
  locale: Locale,
): LocalizedContent => node.name ? { [locale]: node.name } : {};

const createDefaultVariantBlocks = (
  node: DynamicFlowNodeV2,
  state: InterfaceVariantState,
  locale: Locale,
): readonly InterfaceBlock[] => {
  const heading = {
    id: `block:${node.id}:${state}:heading`,
    kind: 'heading' as const,
    level: 1 as const,
    content: localizedNodeName(node, locale),
    hidden: false,
    required: true,
  };
  if (state === 'processing') {
    return [
      heading,
      {
        id: `block:${node.id}:${state}:progress`,
        kind: 'progress',
        mode: 'indeterminate',
        hidden: false,
        required: true,
      },
    ];
  }
  return [
    heading,
    {
      id: `block:${node.id}:${state}:actions`,
      kind: 'actionGroup',
      hidden: false,
      required: true,
      actions: [{
        id: `action:${node.id}:${state}:continue`,
        intent: state === 'retry' ? 'retry' : 'continue',
        label: {},
      }],
    },
  ];
};

const createVariant = (
  node: DynamicFlowNodeV2,
  state: InterfaceVariantState,
  outcomes: readonly OutcomeId[],
  locale: Locale,
): InterfaceScreenVariant => ({
  id: `variant:${node.id}:${state}`,
  state,
  outcomes: state === 'default'
    ? outcomes
    : outcomes.filter((outcome) => stateForOutcome(outcome) === state),
  blocks: createDefaultVariantBlocks(node, state, locale),
});

const reconcileVariants = (
  screen: InterfaceScreenV2,
  node: Extract<
    DynamicFlowNodeV2,
    { readonly kind: 'verification' | 'subflow' }
  >,
  contract: NodeInterfaceContract,
  locale: Locale,
): InterfaceScreenV2 => {
  const existingStates = new Set(screen.variants.map((variant) => variant.state));
  const missing = contract.states
    .filter((state) => !existingStates.has(state))
    .map((state) => createVariant(node, state, contract.outcomes, locale));
  return missing.length === 0
    ? screen
    : {
        ...screen,
        variants: [...screen.variants, ...missing],
      };
};

const createModuleScreen = (
  node: Extract<
    DynamicFlowNodeV2,
    { readonly kind: 'verification' | 'subflow' }
  >,
  contract: NodeInterfaceContract,
  locale: Locale,
): InterfaceScreenV2 => ({
  id: `${MODULE_SCREEN_PREFIX}${node.id}`,
  kind: 'module',
  sourceNodeId: node.id,
  variants: contract.states.map(
    (state) => createVariant(node, state, contract.outcomes, locale),
  ),
});

/**
 * Reconciles source-node screens without mutating the supplied manifest.
 *
 * Existing screens and variants win over generated defaults, so customized block
 * identities remain stable. Removed-node screens are retained as orphans and an
 * orphan is restored before a new screen is generated when its node ID reappears.
 */
export const reconcileInterfaceStudioManifest = (
  manifest: InterfaceManifestV2,
  project: Pick<FlowProjectV2, 'flow'>,
  moduleCatalog: readonly ModulePackage[] = [],
  subflowCatalog: readonly SubflowPackage[] = [],
): InterfaceManifestV2 => {
  const interactiveNodes = project.flow.nodes.filter(
    (
      node,
    ): node is Extract<
      DynamicFlowNodeV2,
      { readonly kind: 'verification' | 'subflow' }
    > => node.kind === 'verification' || node.kind === 'subflow',
  );
  const interactiveNodeIds = new Set(interactiveNodes.map((node) => node.id));
  const moduleScreens = manifest.screens.filter((screen) => screen.kind === 'module');
  const staticScreens = manifest.screens.filter((screen) => screen.kind !== 'module');
  const selectedActiveIdentities = new Set<string>();
  const restoredOrphanIdentities = new Set<string>();
  const reconciledModuleScreens: InterfaceScreenV2[] = [];

  for (const node of interactiveNodes) {
    const contract = interfaceContractForNode(
      node,
      moduleCatalog,
      subflowCatalog,
    );
    const active = moduleScreens.find(
      (screen) => (
        screen.sourceNodeId === node.id
        && !selectedActiveIdentities.has(screenIdentity(screen))
      ),
    );
    const orphan = active
      ? undefined
      : manifest.orphanedScreens.find(
          (screen) => (
            screen.sourceNodeId === node.id
            && !restoredOrphanIdentities.has(screenIdentity(screen))
          ),
        );
    const screen = active
      ?? orphan
      ?? createModuleScreen(node, contract, manifest.defaultLocale);
    if (active) selectedActiveIdentities.add(screenIdentity(active));
    if (orphan) restoredOrphanIdentities.add(screenIdentity(orphan));
    reconciledModuleScreens.push(
      reconcileVariants(screen, node, contract, manifest.defaultLocale),
    );
  }

  const activeScreenIdentities = new Set(
    reconciledModuleScreens.map((screen) => screenIdentity(screen)),
  );
  const orphanedScreens = uniqueScreens([
    ...moduleScreens.filter(
      (screen) => (
        !selectedActiveIdentities.has(screenIdentity(screen))
        || !screen.sourceNodeId
        || !interactiveNodeIds.has(screen.sourceNodeId)
      ),
    ),
    ...manifest.orphanedScreens.filter(
      (screen) => (
        !restoredOrphanIdentities.has(screenIdentity(screen))
        && !activeScreenIdentities.has(screenIdentity(screen))
      ),
    ),
  ]).filter((screen) => !activeScreenIdentities.has(screenIdentity(screen)));

  const staticByKind = (kind: InterfaceScreenV2['kind']) =>
    staticScreens.filter((screen) => screen.kind === kind);

  return {
    ...manifest,
    screens: [
      ...staticByKind('welcome'),
      ...staticByKind('consent'),
      ...reconciledModuleScreens,
      ...staticByKind('processing'),
      ...staticByKind('success'),
      ...staticByKind('error'),
    ],
    orphanedScreens,
  };
};

export type PreviewJourneyIssueCode =
  | 'missingScreen'
  | 'missingVariant'
  | 'missingModule'
  | 'missingSubflow'
  | 'staleTraceNode'
  | 'missingExecutionOutcome'
  | 'unsupportedExecutionOutcome'
  | 'missingOutcomeVariant'
  | 'missingTerminalStep'
  | 'terminalResultMismatch';

export type PreviewJourneyIssue = {
  readonly code: PreviewJourneyIssueCode;
  readonly nodeId?: string;
  readonly screenId?: string;
  readonly state?: InterfaceVariantState;
  readonly outcome?: OutcomeId;
};

export type PreviewJourneyStep = {
  readonly id: string;
  readonly kind: 'static' | 'module' | 'terminal';
  readonly screenId: string;
  readonly variantId: string;
  readonly state: InterfaceVariantState;
  readonly nodeId?: string;
  readonly outcome?: OutcomeId;
  readonly executionStepIndex?: number;
};

export type PreviewJourney = {
  readonly scenarioId: string;
  readonly completed: boolean;
  readonly terminalOutcome?: ScenarioExecutionResult['terminalOutcome'];
  readonly steps: readonly PreviewJourneyStep[];
  readonly issues: readonly PreviewJourneyIssue[];
};

const selectVariant = (
  screen: InterfaceScreenV2,
  state: InterfaceVariantState,
  outcome?: OutcomeId,
): InterfaceScreenVariant | undefined => (
  outcome
    ? screen.variants.find(
        (variant) => variant.state === state && variant.outcomes.includes(outcome),
      )
      ?? screen.variants.find((variant) => variant.state === state)
    : screen.variants.find((variant) => variant.state === state)
);

const staticJourneyStep = (
  screen: InterfaceScreenV2,
  kind: PreviewJourneyStep['kind'],
  state: InterfaceVariantState,
  index: number,
  nodeId?: string,
  outcome?: OutcomeId,
  executionStepIndex?: number,
): PreviewJourneyStep | null => {
  const variant = selectVariant(screen, state, outcome);
  if (!variant) return null;
  return {
    id: `journey:${index}:${screen.id}:${variant.id}`,
    kind,
    screenId: screen.id,
    variantId: variant.id,
    state: variant.state,
    ...(nodeId ? { nodeId } : {}),
    ...(outcome ? { outcome } : {}),
    ...(executionStepIndex === undefined ? {} : { executionStepIndex }),
  };
};

/**
 * Builds a UI-only journey from an execution trace. Start and condition nodes
 * never produce a step, and the result is calculated without persisting runtime
 * data back into the project.
 */
export const buildPreviewJourney = (
  project: FlowProjectV2,
  simulationResult: ScenarioExecutionResult,
  moduleCatalog: readonly ModulePackage[] = [],
  subflowCatalog: readonly SubflowPackage[] = [],
): PreviewJourney => {
  const manifest = reconcileInterfaceStudioManifest(
    project.interface,
    project,
    moduleCatalog,
    subflowCatalog,
  );
  const nodeMap = new Map(project.flow.nodes.map((node) => [node.id, node]));
  const issues: PreviewJourneyIssue[] = [];
  const steps: PreviewJourneyStep[] = [];
  const terminalTrace: {
    readonly nodeId: string;
    readonly outcome: ScenarioExecutionResult['terminalOutcome'];
  }[] = [];
  const pushStatic = (
    kind: InterfaceScreenV2['kind'],
    state: InterfaceVariantState,
  ) => {
    const screen = manifest.screens.find((candidate) => candidate.kind === kind);
    if (!screen) {
      issues.push({ code: 'missingScreen', screenId: kind });
      return;
    }
    const step = staticJourneyStep(screen, 'static', state, steps.length);
    if (!step) {
      issues.push({ code: 'missingVariant', screenId: screen.id, state });
      return;
    }
    steps.push(step);
  };

  pushStatic('welcome', 'intro');
  pushStatic('consent', 'permission');

  simulationResult.steps.forEach((executionStep, executionStepIndex) => {
    const node = nodeMap.get(executionStep.nodeId);
    if (!node) {
      issues.push({ code: 'staleTraceNode', nodeId: executionStep.nodeId });
      return;
    }
    if (node.kind === 'start' || node.kind === 'condition') return;

    if (node.kind === 'terminal') {
      terminalTrace.push({
        nodeId: node.id,
        outcome: node.terminalOutcome,
      });
      const state = node.terminalOutcome === 'success' ? 'success' : 'error';
      const screen = manifest.screens.find(
        (candidate) => candidate.kind === node.terminalOutcome,
      );
      if (!screen) {
        issues.push({
          code: 'missingScreen',
          nodeId: node.id,
          screenId: node.terminalOutcome,
        });
        return;
      }
      const outcome: OutcomeId = node.terminalOutcome;
      const step = staticJourneyStep(
        screen,
        'terminal',
        state,
        steps.length,
        node.id,
        outcome,
        executionStepIndex,
      );
      if (!step) {
        issues.push({
          code: 'missingVariant',
          nodeId: node.id,
          screenId: screen.id,
          state,
        });
        return;
      }
      steps.push(step);
      return;
    }

    const contract = interfaceContractForNode(
      node,
      moduleCatalog,
      subflowCatalog,
    );
    if (contract.dependencyMissing) {
      issues.push({
        code: node.kind === 'subflow' ? 'missingSubflow' : 'missingModule',
        nodeId: node.id,
      });
    }
    const screen = manifest.screens.find(
      (candidate) => (
        candidate.kind === 'module'
        && candidate.sourceNodeId === node.id
      ),
    );
    if (!screen) {
      issues.push({ code: 'missingScreen', nodeId: node.id });
      return;
    }

    const desiredVariants: {
      readonly state: InterfaceVariantState;
      readonly outcome?: OutcomeId;
    }[] = PRE_OUTCOME_STATES
      .filter((state) => contract.states.includes(state))
      .map((state) => ({ state }));
    const executionOutcome = executionStep.outcome;
    if (!executionOutcome) {
      issues.push({
        code: 'missingExecutionOutcome',
        nodeId: node.id,
        screenId: screen.id,
      });
    } else if (!contract.outcomes.includes(executionOutcome)) {
      issues.push({
        code: 'unsupportedExecutionOutcome',
        nodeId: node.id,
        screenId: screen.id,
        outcome: executionOutcome,
      });
    } else {
      const outcomeState = stateForOutcome(executionOutcome);
      const outcomeVariant = outcomeState && contract.states.includes(outcomeState)
        ? selectVariant(screen, outcomeState, executionOutcome)
        : screen.variants.find(
            (variant) => (
              contract.states.includes(variant.state)
              && variant.outcomes.includes(executionOutcome)
            ),
          );
      if (outcomeVariant) {
        desiredVariants.push({
          state: outcomeVariant.state,
          outcome: executionOutcome,
        });
      } else {
        issues.push({
          code: 'missingOutcomeVariant',
          nodeId: node.id,
          screenId: screen.id,
          ...(outcomeState ? { state: outcomeState } : {}),
          outcome: executionOutcome,
        });
      }
    }
    if (desiredVariants.length === 0 && contract.states.includes('default')) {
      desiredVariants.push({
        state: 'default',
        ...(executionOutcome ? { outcome: executionOutcome } : {}),
      });
    }

    const selectedVariantIds = new Set<string>();
    desiredVariants.forEach(({ state, outcome }) => {
      const variant = selectVariant(
        screen,
        state,
        outcome,
      );
      if (!variant || selectedVariantIds.has(variant.id)) {
        if (!variant) {
          issues.push({
            code: 'missingVariant',
            nodeId: node.id,
            screenId: screen.id,
            state,
          });
        }
        return;
      }
      selectedVariantIds.add(variant.id);
      steps.push({
        id: `journey:${steps.length}:${screen.id}:${variant.id}`,
        kind: 'module',
        screenId: screen.id,
        variantId: variant.id,
        state: variant.state,
        nodeId: node.id,
        ...(outcome ? { outcome } : {}),
        executionStepIndex,
      });
    });
  });

  const finalTerminal = terminalTrace.at(-1);
  if (simulationResult.completed) {
    if (!finalTerminal) {
      issues.push({ code: 'missingTerminalStep' });
    } else if (
      (
        simulationResult.terminalNodeId
        && simulationResult.terminalNodeId !== finalTerminal.nodeId
      )
      || (
        simulationResult.terminalOutcome
        && simulationResult.terminalOutcome !== finalTerminal.outcome
      )
    ) {
      issues.push({
        code: 'terminalResultMismatch',
        nodeId: finalTerminal.nodeId,
        outcome: finalTerminal.outcome,
      });
    }
  } else if (finalTerminal) {
    issues.push({
      code: 'terminalResultMismatch',
      nodeId: finalTerminal.nodeId,
      outcome: finalTerminal.outcome,
    });
  }

  return {
    scenarioId: simulationResult.scenarioId,
    completed: simulationResult.completed,
    ...(simulationResult.terminalOutcome
      ? { terminalOutcome: simulationResult.terminalOutcome }
      : {}),
    steps,
    issues,
  };
};

export type InterfaceBlockAction =
  | {
      readonly type: 'add';
      readonly block: InterfaceBlock;
      readonly atIndex?: number;
    }
  | {
      readonly type: 'duplicate';
      readonly blockId: string;
      readonly newBlockId?: string;
    }
  | {
      readonly type: 'hide';
      readonly blockId: string;
      readonly hidden: boolean;
    }
  | {
      readonly type: 'move';
      readonly blockId: string;
      readonly toIndex: number;
    }
  | {
      readonly type: 'delete';
      readonly blockId: string;
    };

export type InterfaceBlockReducerRejection =
  | 'blockNotFound'
  | 'duplicateBlockId'
  | 'requiredBlock';

export type InterfaceBlockReducerState = {
  readonly blocks: readonly InterfaceBlock[];
  readonly lastRejection?: InterfaceBlockReducerRejection;
};

const uniqueBlockId = (
  blocks: readonly InterfaceBlock[],
  preferred: string,
): string => {
  const ids = new Set(blocks.map((block) => block.id));
  if (!ids.has(preferred)) return preferred;
  let sequence = 2;
  while (ids.has(`${preferred}-${sequence}`)) sequence += 1;
  return `${preferred}-${sequence}`;
};

const duplicateBlock = (
  block: InterfaceBlock,
  newBlockId: string,
): InterfaceBlock => {
  const duplicated = structuredClone(block);
  const base = {
    ...duplicated,
    id: newBlockId,
    required: false,
  };
  if (duplicated.kind !== 'actionGroup') return base;
  return {
    ...base,
    kind: 'actionGroup',
    actions: duplicated.actions.map((action, index) => ({
      ...action,
      id: `${newBlockId}:action:${index + 1}`,
    })),
  };
};

export const interfaceBlockReducer = (
  state: InterfaceBlockReducerState,
  action: InterfaceBlockAction,
): InterfaceBlockReducerState => {
  if (action.type === 'add') {
    if (state.blocks.some((block) => block.id === action.block.id)) {
      return { ...state, lastRejection: 'duplicateBlockId' };
    }
    const atIndex = Math.max(
      0,
      Math.min(action.atIndex ?? state.blocks.length, state.blocks.length),
    );
    return {
      blocks: [
        ...state.blocks.slice(0, atIndex),
        structuredClone(action.block),
        ...state.blocks.slice(atIndex),
      ],
    };
  }

  const sourceIndex = state.blocks.findIndex((block) => block.id === action.blockId);
  if (sourceIndex < 0) return { ...state, lastRejection: 'blockNotFound' };
  const source = state.blocks[sourceIndex]!;

  if (action.type === 'delete') {
    if (source.required) return { ...state, lastRejection: 'requiredBlock' };
    return {
      blocks: state.blocks.filter((block) => block.id !== source.id),
    };
  }
  if (action.type === 'hide') {
    if (source.required && action.hidden) {
      return { ...state, lastRejection: 'requiredBlock' };
    }
    return {
      blocks: state.blocks.map((block) => block.id === source.id
        ? { ...block, hidden: action.hidden }
        : block),
    };
  }
  if (action.type === 'duplicate') {
    const newBlockId = uniqueBlockId(
      state.blocks,
      action.newBlockId ?? `${source.id}-copy`,
    );
    return {
      blocks: [
        ...state.blocks.slice(0, sourceIndex + 1),
        duplicateBlock(source, newBlockId),
        ...state.blocks.slice(sourceIndex + 1),
      ],
    };
  }

  const toIndex = Math.max(
    0,
    Math.min(action.toIndex, state.blocks.length - 1),
  );
  if (toIndex === sourceIndex) return { blocks: state.blocks };
  const remaining = state.blocks.filter((block) => block.id !== source.id);
  return {
    blocks: [
      ...remaining.slice(0, toIndex),
      source,
      ...remaining.slice(toIndex),
    ],
  };
};

export type LocalizedContentFallbackBadge = {
  readonly kind: 'fallback';
  readonly sourceLocale: Locale;
};

export type LocalizedContentResolution = {
  readonly value: string;
  readonly requestedLocale: Locale;
  readonly resolvedLocale?: Locale;
  readonly missing: boolean;
  readonly fallbackUsed: boolean;
  readonly badge: LocalizedContentFallbackBadge | null;
};

const hasContent = (value: string | undefined): value is string =>
  Boolean(value?.trim());

/**
 * Resolves only the requested locale and then the manifest default locale.
 * It deliberately does not introduce an implicit English fallback.
 */
export const resolveLocalizedContent = (
  content: LocalizedContent,
  requestedLocale: Locale,
  defaultLocale: Locale,
): LocalizedContentResolution => {
  const requested = content[requestedLocale];
  if (hasContent(requested)) {
    return {
      value: requested,
      requestedLocale,
      resolvedLocale: requestedLocale,
      missing: false,
      fallbackUsed: false,
      badge: null,
    };
  }
  const fallback = content[defaultLocale];
  if (hasContent(fallback)) {
    return {
      value: fallback,
      requestedLocale,
      resolvedLocale: defaultLocale,
      missing: false,
      fallbackUsed: true,
      badge: {
        kind: 'fallback',
        sourceLocale: defaultLocale,
      },
    };
  }
  return {
    value: '',
    requestedLocale,
    missing: true,
    fallbackUsed: false,
    badge: null,
  };
};

export type InterfaceStudioValidationIssueCode =
  | AccessibilityIssueCode
  | 'duplicateScreenId'
  | 'duplicateVariantId'
  | 'duplicateBlockId'
  | 'duplicateActionId'
  | 'duplicateEnabledLocale'
  | 'duplicateConditionId'
  | 'emptyScreenVariants'
  | 'emptyVisibilityCondition'
  | 'invalidVisibilityCondition'
  | 'invalidSafeArea'
  | 'missingRequiredTranslation'
  | 'requiredBlockHidden'
  | 'requiredBlockConditional'
  | 'defaultLocaleNotEnabled';

export type InterfaceStudioValidationIssue = {
  readonly code: InterfaceStudioValidationIssueCode;
  readonly severity: 'error' | 'warning';
  readonly screenId?: string;
  readonly variantId?: string;
  readonly blockId?: string;
  readonly actionId?: string;
  readonly locale?: Locale;
  readonly themeMode?: 'light' | 'dark';
  readonly breakpoint?: 'mobile' | 'tablet' | 'desktop';
};

export type InterfaceStudioValidationReport = {
  readonly issues: readonly InterfaceStudioValidationIssue[];
  readonly accessibility: AccessibilityReport;
  readonly blocksExport: boolean;
};

const localizedContentForBlock = (
  block: InterfaceBlock,
): LocalizedContent | null => {
  if (
    block.kind === 'heading'
    || block.kind === 'text'
    || block.kind === 'consent'
    || block.kind === 'credentialRequest'
    || block.kind === 'instruction'
    || block.kind === 'status'
  ) {
    return block.content;
  }
  return null;
};

const duplicateStrings = (values: readonly string[]): ReadonlySet<string> => {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  return duplicates;
};

const isRecord = (value: unknown): value is Readonly<Record<string, unknown>> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const primitiveReferenceType = (
  reference: unknown,
): FlowFieldType | null => {
  if (!isRecord(reference)) return null;
  if (reference.kind === 'flowInput') {
    return typeof reference.fieldId === 'string' && reference.fieldId.trim()
      ? 'object'
      : null;
  }
  if (reference.kind === 'nodeOutput') {
    return (
      typeof reference.nodeId === 'string'
      && reference.nodeId.trim()
      && typeof reference.fieldId === 'string'
      && reference.fieldId.trim()
    )
      ? 'object'
      : null;
  }
  if (reference.kind !== 'literal') return null;
  if (
    reference.valueType === 'string'
    && typeof reference.value === 'string'
  ) {
    return 'string';
  }
  if (
    reference.valueType === 'number'
    && typeof reference.value === 'number'
    && Number.isFinite(reference.value)
  ) {
    return 'number';
  }
  if (
    reference.valueType === 'boolean'
    && typeof reference.value === 'boolean'
  ) {
    return 'boolean';
  }
  return null;
};

const visibilityConditionIssues = (
  condition: ConditionGroup,
  screenId: string,
  variantId: string,
  blockId: string,
): readonly InterfaceStudioValidationIssue[] => {
  const issues: InterfaceStudioValidationIssue[] = [];
  const conditionIds = new Set<string>();
  const ancestors = new WeakSet<object>();
  const addIssue = (
    code: Extract<
      InterfaceStudioValidationIssueCode,
      'duplicateConditionId' | 'emptyVisibilityCondition' | 'invalidVisibilityCondition'
    >,
  ) => {
    issues.push({
      code,
      severity: 'error',
      screenId,
      variantId,
      blockId,
    });
  };
  const visit = (candidate: unknown, depth: number): void => {
    if (!isRecord(candidate) || depth > 20 || ancestors.has(candidate)) {
      addIssue('invalidVisibilityCondition');
      return;
    }
    const id = candidate.id;
    if (typeof id !== 'string' || !id.trim()) {
      addIssue('invalidVisibilityCondition');
    } else if (conditionIds.has(id)) {
      addIssue('duplicateConditionId');
    } else {
      conditionIds.add(id);
    }

    ancestors.add(candidate);
    if (candidate.kind === 'group') {
      if (
        (candidate.combinator !== 'and' && candidate.combinator !== 'or')
        || !Array.isArray(candidate.conditions)
      ) {
        addIssue('invalidVisibilityCondition');
      } else if (candidate.conditions.length === 0) {
        addIssue('emptyVisibilityCondition');
      } else {
        candidate.conditions.forEach((child) => visit(child, depth + 1));
      }
      ancestors.delete(candidate);
      return;
    }

    if (candidate.kind !== 'rule') {
      addIssue('invalidVisibilityCondition');
      ancestors.delete(candidate);
      return;
    }
    const operator = candidate.operator;
    const leftType = primitiveReferenceType(candidate.left);
    if (
      typeof operator !== 'string'
      || !CONDITION_OPERATORS.has(operator as ConditionOperator)
      || leftType === null
    ) {
      addIssue('invalidVisibilityCondition');
      ancestors.delete(candidate);
      return;
    }
    const typedOperator = operator as ConditionOperator;
    const unary = typedOperator === 'exists' || typedOperator === 'notExists';
    const rightType = candidate.right === undefined
      ? null
      : primitiveReferenceType(candidate.right);
    if (
      (unary && candidate.right !== undefined)
      || (!unary && rightType === null)
      || (
        leftType !== 'object'
        && !isConditionOperatorCompatible(leftType, typedOperator)
      )
      || (
        leftType !== 'object'
        && rightType !== null
        && rightType !== 'object'
        && leftType !== rightType
      )
    ) {
      addIssue('invalidVisibilityCondition');
    }
    ancestors.delete(candidate);
  };

  visit(condition, 0);
  return issues;
};

const parseHexColor = (value: string): readonly [number, number, number] | null => {
  const normalized = value.trim();
  const short = /^#([0-9a-f]{3})$/i.exec(normalized)?.[1];
  const long = /^#([0-9a-f]{6})$/i.exec(normalized)?.[1];
  const digits = short
    ? short.split('').map((digit) => `${digit}${digit}`).join('')
    : long;
  if (!digits) return null;
  return [
    Number.parseInt(digits.slice(0, 2), 16),
    Number.parseInt(digits.slice(2, 4), 16),
    Number.parseInt(digits.slice(4, 6), 16),
  ];
};

const relativeLuminance = (
  color: readonly [number, number, number],
): number => {
  const channels = color.map((channel) => {
    const normalized = channel / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0]! + 0.7152 * channels[1]! + 0.0722 * channels[2]!;
};

export const getContrastRatio = (
  foreground: string,
  background: string,
): number | null => {
  const foregroundColor = parseHexColor(foreground);
  const backgroundColor = parseHexColor(background);
  if (!foregroundColor || !backgroundColor) return null;
  const foregroundLuminance = relativeLuminance(foregroundColor);
  const backgroundLuminance = relativeLuminance(backgroundColor);
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);
  return (lighter + 0.05) / (darker + 0.05);
};

const hasAaContrast = (
  foreground: string,
  background: string,
  minimum = 4.5,
): boolean => {
  const ratio = getContrastRatio(foreground, background);
  return ratio !== null && ratio >= minimum;
};

const contrastIssuesForMode = (
  colors: SemanticColorTokens,
): readonly AccessibilityIssue[] => {
  const pairs = [
    [colors.text, colors.background],
    [colors.text, colors.surface],
    [colors.textMuted, colors.background],
    [colors.onPrimary, colors.primary],
    [colors.onAccent, colors.accent],
  ] as const;
  const issues: AccessibilityIssue[] = pairs
    .filter(([foreground, background]) => !hasAaContrast(foreground, background))
    .map(() => ({ code: 'contrast', severity: 'error' }));
  if (
    !hasAaContrast(colors.focus, colors.background, 3)
    || !hasAaContrast(colors.focus, colors.surface, 3)
  ) {
    issues.push({ code: 'missingFocusMetadata', severity: 'error' });
  }
  return issues;
};

const accessibilityIssuesForVariant = (
  manifest: InterfaceManifestV2,
  screen: InterfaceScreenV2,
  variant: InterfaceScreenVariant,
): readonly AccessibilityIssue[] => {
  const issues: AccessibilityIssue[] = [];
  const visibleBlocks = variant.blocks.filter((block) => !block.hidden);
  let previousHeadingLevel = 0;
  for (const block of visibleBlocks) {
    if (block.kind === 'heading') {
      if (
        (previousHeadingLevel === 0 && block.level !== 1)
        || (
          previousHeadingLevel > 0
          && block.level > previousHeadingLevel + 1
        )
      ) {
        issues.push({
          code: 'headingOrder',
          severity: 'error',
          screenId: screen.id,
          variantId: variant.id,
          blockId: block.id,
        });
      }
      previousHeadingLevel = block.level;
    }
    if (
      block.kind === 'illustration'
      && manifest.enabledLocales.some((locale) => !hasContent(block.alt[locale]))
    ) {
      issues.push({
        code: 'missingAlt',
        severity: 'error',
        screenId: screen.id,
        variantId: variant.id,
        blockId: block.id,
      });
    }
    if (
      block.kind === 'actionGroup'
      && (
        block.actions.length === 0
        || block.actions.some(
          (action) => manifest.enabledLocales.some(
            (locale) => !hasContent(action.label[locale]),
          ),
        )
      )
    ) {
      issues.push({
        code: 'missingLabel',
        severity: 'error',
        screenId: screen.id,
        variantId: variant.id,
        blockId: block.id,
      });
    }
    if (
      block.kind === 'status'
      && manifest.enabledLocales.some(
        (locale) => !hasContent(block.content[locale]),
      )
    ) {
      issues.push({
        code: 'colorOnlyState',
        severity: 'error',
        screenId: screen.id,
        variantId: variant.id,
        blockId: block.id,
      });
    }
  }
  return issues;
};

export const validateInterfaceAccessibility = (
  manifest: InterfaceManifestV2,
): AccessibilityReport => {
  const issues: AccessibilityIssue[] = [
    ...contrastIssuesForMode(manifest.theme.light),
    ...contrastIssuesForMode(manifest.theme.dark),
  ];
  if (manifest.theme.controls.height < 44) {
    issues.push({ code: 'touchTarget', severity: 'error' });
  }
  if (manifest.theme.motion !== 'reduced') {
    issues.push({ code: 'reducedMotion', severity: 'warning' });
  }
  for (const screen of manifest.screens) {
    for (const variant of screen.variants) {
      issues.push(...accessibilityIssuesForVariant(manifest, screen, variant));
    }
  }
  return {
    issues,
    blocksExport: issues.some((issue) => issue.severity === 'error'),
  };
};

const structuralInterfaceIssues = (
  manifest: InterfaceManifestV2,
): readonly InterfaceStudioValidationIssue[] => {
  const issues: InterfaceStudioValidationIssue[] = [];
  if (!manifest.enabledLocales.includes(manifest.defaultLocale)) {
    issues.push({
      code: 'defaultLocaleNotEnabled',
      severity: 'error',
      locale: manifest.defaultLocale,
    });
  }
  for (const locale of duplicateStrings(manifest.enabledLocales)) {
    issues.push({
      code: 'duplicateEnabledLocale',
      severity: 'error',
      locale: locale as Locale,
    });
  }
  for (const breakpoint of ['mobile', 'tablet', 'desktop'] as const) {
    const safeArea = manifest.theme.safeAreas[breakpoint];
    if (
      Object.values(safeArea).some(
        (value) => !Number.isFinite(value) || value < 0,
      )
    ) {
      issues.push({
        code: 'invalidSafeArea',
        severity: 'error',
        breakpoint,
      });
    }
  }
  for (const screenId of duplicateStrings(manifest.screens.map((screen) => screen.id))) {
    issues.push({ code: 'duplicateScreenId', severity: 'error', screenId });
  }

  for (const screen of manifest.screens) {
    if (screen.variants.length === 0) {
      issues.push({
        code: 'emptyScreenVariants',
        severity: 'error',
        screenId: screen.id,
      });
    }
    for (const variantId of duplicateStrings(
      screen.variants.map((variant) => variant.id),
    )) {
      issues.push({
        code: 'duplicateVariantId',
        severity: 'error',
        screenId: screen.id,
        variantId,
      });
    }
    for (const variant of screen.variants) {
      for (const blockId of duplicateStrings(
        variant.blocks.map((block) => block.id),
      )) {
        issues.push({
          code: 'duplicateBlockId',
          severity: 'error',
          screenId: screen.id,
          variantId: variant.id,
          blockId,
        });
      }
      for (const block of variant.blocks) {
        if (block.required && block.hidden) {
          issues.push({
            code: 'requiredBlockHidden',
            severity: 'error',
            screenId: screen.id,
            variantId: variant.id,
            blockId: block.id,
          });
        }
        if (block.required && block.visibility) {
          issues.push({
            code: 'requiredBlockConditional',
            severity: 'error',
            screenId: screen.id,
            variantId: variant.id,
            blockId: block.id,
          });
        }
        if (block.visibility) {
          issues.push(...visibilityConditionIssues(
            block.visibility.condition,
            screen.id,
            variant.id,
            block.id,
          ));
        }
        const content = localizedContentForBlock(block);
        if (block.required && content) {
          for (const locale of manifest.enabledLocales) {
            if (!hasContent(content[locale])) {
              issues.push({
                code: 'missingRequiredTranslation',
                severity: 'error',
                screenId: screen.id,
                variantId: variant.id,
                blockId: block.id,
                locale,
              });
            }
          }
        }
        if (block.kind === 'actionGroup') {
          for (const actionId of duplicateStrings(
            block.actions.map((item) => item.id),
          )) {
            issues.push({
              code: 'duplicateActionId',
              severity: 'error',
              screenId: screen.id,
              variantId: variant.id,
              blockId: block.id,
              actionId,
            });
          }
          for (const action of block.actions) {
            for (const locale of manifest.enabledLocales) {
              if (!hasContent(action.label[locale])) {
                issues.push({
                  code: 'missingRequiredTranslation',
                  severity: 'error',
                  screenId: screen.id,
                  variantId: variant.id,
                  blockId: block.id,
                  actionId: action.id,
                  locale,
                });
              }
            }
          }
        }
      }
    }
  }
  return issues;
};

export const validateInterfaceStudioManifest = (
  manifest: InterfaceManifestV2,
): InterfaceStudioValidationReport => {
  const accessibility = validateInterfaceAccessibility(manifest);
  const issues: InterfaceStudioValidationIssue[] = [
    ...structuralInterfaceIssues(manifest),
    ...accessibility.issues,
  ];
  return {
    issues,
    accessibility,
    blocksExport: issues.some((issue) => issue.severity === 'error'),
  };
};

export type IntegrationValidationIssueCode =
  | 'wildcardUrl'
  | 'invalidAllowedOrigin'
  | 'invalidRedirectUrl'
  | 'insecureUrl'
  | 'duplicateAllowedOrigin'
  | 'duplicateRedirectUrl'
  | 'missingAllowedOrigin'
  | 'missingRedirectUrl'
  | 'invalidSessionTimeout'
  | 'duplicateEvent'
  | 'duplicateResultField'
  | 'unknownResultField'
  | 'unsafeResultField'
  | 'includePiiNotAllowed';

export type IntegrationValidationIssue = {
  readonly code: IntegrationValidationIssueCode;
  readonly value?: string;
  readonly fieldId?: string;
};

const isLocalHostname = (hostname: string): boolean => (
  hostname === 'localhost'
  || hostname === '127.0.0.1'
  || hostname === '[::1]'
);

const validateUrl = (
  value: string,
  kind: 'origin' | 'redirect',
): IntegrationValidationIssueCode | null => {
  if (value.includes('*')) return 'wildcardUrl';
  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    return kind === 'origin' ? 'invalidAllowedOrigin' : 'invalidRedirectUrl';
  }
  if (
    parsed.username
    || parsed.password
    || (
      parsed.protocol !== 'https:'
      && !(parsed.protocol === 'http:' && isLocalHostname(parsed.hostname))
    )
  ) {
    return 'insecureUrl';
  }
  if (kind === 'origin') {
    if (
      parsed.pathname !== '/'
      || parsed.search
      || parsed.hash
    ) {
      return 'invalidAllowedOrigin';
    }
  }
  return null;
};

const outputFieldsForProject = (
  project: Pick<FlowProjectV2, 'flow'>,
  moduleCatalog: readonly ModulePackage[],
  subflowCatalog: readonly SubflowPackage[],
): ReadonlyMap<string, readonly FlowField[]> => {
  const fields = new Map<string, FlowField[]>();
  const add = (field: FlowField, nodeId: string) => {
    fields.set(field.id, [...(fields.get(field.id) ?? []), field]);
    fields.set(`${nodeId}.${field.id}`, [field]);
  };
  for (const node of project.flow.nodes) {
    if (node.kind === 'verification') {
      resolveModuleContract(node, moduleCatalog)?.outputFields.forEach(
        (field) => add(field, node.id),
      );
    } else if (node.kind === 'subflow') {
      resolveSubflow(node, subflowCatalog)?.contract.outputFields.forEach(
        (field) => add(field, node.id),
      );
    }
  }
  return fields;
};

const isMetadataField = (field: FlowField): boolean => (
  field.safeForResult
  && (
    field.classification === 'publicMetadata'
    || field.classification === 'internalMetadata'
  )
);

export const validateIntegrationSettings = (
  settings: IntegrationSettings,
  project: Pick<FlowProjectV2, 'flow'>,
  moduleCatalog: readonly ModulePackage[] = [],
  subflowCatalog: readonly SubflowPackage[] = [],
): readonly IntegrationValidationIssue[] => {
  const issues: IntegrationValidationIssue[] = [];
  for (const value of settings.allowedOrigins) {
    const code = validateUrl(value, 'origin');
    if (code) issues.push({ code, value });
  }
  for (const value of settings.redirectUrls) {
    const code = validateUrl(value, 'redirect');
    if (code) issues.push({ code, value });
  }
  for (const value of duplicateStrings(settings.allowedOrigins)) {
    issues.push({ code: 'duplicateAllowedOrigin', value });
  }
  for (const value of duplicateStrings(settings.redirectUrls)) {
    issues.push({ code: 'duplicateRedirectUrl', value });
  }
  if (settings.mode === 'embed' && settings.allowedOrigins.length === 0) {
    issues.push({ code: 'missingAllowedOrigin' });
  }
  if (settings.mode === 'redirect' && settings.redirectUrls.length === 0) {
    issues.push({ code: 'missingRedirectUrl' });
  }
  if (
    !Number.isInteger(settings.sessionTimeoutMinutes)
    || settings.sessionTimeoutMinutes < 1
    || settings.sessionTimeoutMinutes > 1_440
  ) {
    issues.push({ code: 'invalidSessionTimeout' });
  }
  for (const value of duplicateStrings(settings.enabledEvents)) {
    issues.push({ code: 'duplicateEvent', value });
  }
  for (const fieldId of duplicateStrings(settings.resultFieldIds)) {
    issues.push({ code: 'duplicateResultField', fieldId });
  }

  const availableFields = outputFieldsForProject(
    project,
    moduleCatalog,
    subflowCatalog,
  );
  for (const fieldId of settings.resultFieldIds) {
    const fields = availableFields.get(fieldId);
    if (!fields) {
      issues.push({ code: 'unknownResultField', fieldId });
    } else if (!fields.every(isMetadataField)) {
      issues.push({ code: 'unsafeResultField', fieldId });
    }
  }
  if ((settings as { readonly includePii?: unknown }).includePii !== false) {
    issues.push({ code: 'includePiiNotAllowed' });
  }
  return issues;
};
