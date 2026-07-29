/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import {
  Accessibility,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Copy,
  Download,
  Eye,
  EyeOff,
  FileInput,
  Info,
  Layers3,
  LoaderCircle,
  Monitor,
  Moon,
  Palette,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  PanelTopClose,
  PanelTopOpen,
  Pause,
  Play,
  Plus,
  RefreshCw,
  ScanLine,
  ShieldCheck,
  Smartphone,
  Sun,
  Tablet,
  Trash2,
  Type,
} from 'lucide-react';
import identraLogo from '../../assets/images/identra-logo.svg';
import {
  DASHBOARD_ADVANCED_TRANSLATIONS,
  type DashboardAdvancedCopy,
} from '../../translations/dashboard/DashboardAdvancedTranslations';
import {
  DASHBOARD_PAGE_TRANSLATIONS,
  type DashboardCopy,
} from '../../translations/dashboard/DashboardPageTranslations';
import { SUPPORTED_LOCALES, type Locale } from '../../types/routes';
import { getLocalizedRecord } from '../../utils/i18nRuntime';
import {
  isBuiltInModuleId,
} from './dashboardModuleRegistry';
import {
  createDashboardId,
  createDefaultBlocks,
  resolveModuleContract,
} from './dashboardV2Model';
import {
  evaluateCondition,
  getCompatibleConditionOperators,
  type ConditionEvaluationContext,
  type SyntheticPrimitive,
} from './conditionEngine';
import { validateDynamicFlowV2 } from './dashboardValidation';
import { simulateDynamicFlowV2 } from './flowSimulationEngine';
import {
  appendBoundedDraftRevision,
  createDraftRevisionSnapshot,
} from './releaseEngine';
import {
  buildPreviewJourney,
  interfaceBlockReducer,
  reconcileInterfaceStudioManifest,
  resolveDynamicContent,
  resolveLocalizedContent,
  resolveResponsiveInterface,
  validateInterfaceStudioManifest,
  type DynamicContentContext,
  type PreviewJourney,
} from './interfaceStudioEngine';
import {
  applyDesignSystemManifest,
  compareVisualRegressionSnapshot,
  createVisualRegressionBaseline,
  createVisualRegressionSnapshot,
  parseDesignSystemManifest,
  upsertVisualRegressionBaseline,
  type VisualRegressionChannel,
  type VisualRegressionComparison,
  type VisualRegressionContext,
} from './interfaceQualityEngine';
import type {
  DashboardWorkspaceV2,
  ConditionOperator,
  DataReference,
  DynamicContentReference,
  FlowField,
  FlowProjectV2,
  FlowScenario,
  InterfaceBlock,
  InterfaceManifestV2,
  InterfaceResponsiveOverride,
  InterfaceScreenV2,
  InterfaceScreenVariant,
  InterfaceVariantState,
  LocalizedContent,
  ScenarioExecutionResult,
  SemanticColorTokens,
  SemanticTheme,
} from './dashboardV2Types';

type InterfaceStudioWorkspaceProps = {
  readonly copy: DashboardCopy;
  readonly advancedCopy: DashboardAdvancedCopy;
  readonly project: FlowProjectV2;
  readonly workspace: DashboardWorkspaceV2;
  readonly onProjectChange: (project: FlowProjectV2) => void;
  readonly onWorkspaceChange: (workspace: DashboardWorkspaceV2) => void;
  readonly onOpenFlow: () => void;
};

type PreviewDevice = 'mobile' | 'tablet' | 'desktop';
type StudioTab =
  | 'blocks'
  | 'localization'
  | 'theme'
  | 'regression'
  | 'accessibility';
type PreviewTheme = 'light' | 'dark';
type ExportState = 'idle' | 'exporting' | 'success' | 'blocked';

type VisibilityOption = {
  readonly key: string;
  readonly label: string;
  readonly reference: Exclude<DataReference, { readonly kind: 'literal' }>;
  readonly field: FlowField;
};

type DynamicContentOption = {
  readonly key: string;
  readonly label: string;
  readonly source: DynamicContentReference;
};

const BLOCK_KINDS = [
  'heading',
  'text',
  'illustration',
  'consent',
  'credentialRequest',
  'fieldSummary',
  'instruction',
  'progress',
  'status',
  'actionGroup',
] as const satisfies readonly InterfaceBlock['kind'][];
const CONSENT_SCOPE_PLACEHOLDER = 'scope.read, scope.verify';
const DESIGN_SYSTEM_EXAMPLE = JSON.stringify({
  schemaVersion: 1,
  name: 'Identra Trust Experience',
  version: '1.0.0',
  layout: 'card',
  theme: {
    light: {
      primary: '#354CE1',
      accent: '#00BFA6',
      background: '#F5F7FB',
      surface: '#FFFFFF',
      text: '#172033',
    },
    dark: {
      primary: '#8C9BFF',
      accent: '#53DDC8',
      background: '#10131C',
      surface: '#191E2B',
      text: '#F4F6FA',
    },
    typography: {
      fontFamily: 'Inter, ui-sans-serif',
      headingScale: 1.05,
      bodyScale: 1,
      lineHeight: 1.5,
    },
    controls: {
      height: 48,
      radius: 12,
      borderWidth: 1,
    },
    borderRadius: 20,
    spacingScale: 1,
    elevation: 'soft',
    motion: 'reduced',
  },
  responsiveOverrides: {
    mobile: {
      layout: 'fullscreen',
      spacingScale: 0.9,
      borderRadius: 16,
      headingScale: 0.95,
      bodyScale: 1,
    },
  },
}, null, 2);

const SCREEN_KIND_TO_DEFAULT = {
  welcome: 'welcome',
  consent: 'consent',
  module: 'module',
  processing: 'processing',
  success: 'success',
  error: 'error',
} as const;

const localizedScreenName = (
  screen: InterfaceScreenV2,
  project: FlowProjectV2,
  workspace: DashboardWorkspaceV2,
  copy: DashboardCopy,
): string => {
  if (screen.kind !== 'module') {
    return copy.screenDefaults[SCREEN_KIND_TO_DEFAULT[screen.kind]].name;
  }
  const node = project.flow.nodes.find((candidate) => candidate.id === screen.sourceNodeId);
  if (!node) return copy.screenDefaults.module.name;
  if (node.kind === 'verification') {
    if (isBuiltInModuleId(node.moduleRef.packageId)) {
      return copy.modules[node.moduleRef.packageId].name;
    }
    return workspace.moduleCatalog.find(
      (item) => item.id === node.moduleRef.packageId,
    )?.name ?? node.name ?? copy.screenDefaults.module.name;
  }
  if (node.kind === 'subflow') {
    return workspace.subflowCatalog.find(
      (item) => item.id === node.subflowRef.packageId,
    )?.name ?? node.name ?? copy.screenDefaults.module.name;
  }
  return copy.screenDefaults.module.name;
};

const defaultModuleContent = (
  screen: InterfaceScreenV2,
  project: FlowProjectV2,
  workspace: DashboardWorkspaceV2,
  copy: DashboardCopy,
) => {
  const base = copy.screenDefaults.module;
  const node = project.flow.nodes.find((candidate) => candidate.id === screen.sourceNodeId);
  if (node?.kind !== 'verification') {
    return {
      title: node?.name || base.title,
      body: base.body,
      action: base.action,
    };
  }
  if (isBuiltInModuleId(node.moduleRef.packageId)) {
    const moduleCopy = copy.modules[node.moduleRef.packageId];
    return {
      title: moduleCopy.name,
      body: moduleCopy.description,
      action: base.action,
    };
  }
  const version = workspace.moduleCatalog
    .find((item) => item.id === node.moduleRef.packageId)
    ?.versions.find((item) => item.version === node.moduleRef.version);
  return {
    title: version?.definition?.defaultUi.title || node.name || base.title,
    body: version?.definition?.defaultUi.description
      || version?.definition?.description
      || base.body,
    action: version?.definition?.defaultUi.actionLabel || base.action,
  };
};

const seedManifestCopy = (
  manifest: InterfaceManifestV2,
  project: FlowProjectV2,
  workspace: DashboardWorkspaceV2,
): InterfaceManifestV2 => {
  const locale = manifest.defaultLocale;
  const localeCopy = getLocalizedRecord(
    DASHBOARD_PAGE_TRANSLATIONS,
    locale,
    'DASHBOARD_PAGE_TRANSLATIONS',
  );
  const advancedLocaleCopy = getLocalizedRecord(
    DASHBOARD_ADVANCED_TRANSLATIONS,
    locale,
    'DASHBOARD_ADVANCED_TRANSLATIONS',
  );
  let changed = false;
  const screens = manifest.screens.map((screen) => {
    const defaults = screen.kind === 'module'
      ? defaultModuleContent(screen, project, workspace, localeCopy)
      : localeCopy.screenDefaults[SCREEN_KIND_TO_DEFAULT[screen.kind]];
    const variants = screen.variants.map((variant) => {
      const blocks = variant.blocks.map((block) => {
        if (
          block.kind === 'heading'
          && !block.content[locale]?.trim()
        ) {
          changed = true;
          return {
            ...block,
            content: {
              ...block.content,
              [locale]: defaults.title,
            },
          };
        }
        if (
          (
            block.kind === 'text'
            || block.kind === 'consent'
            || block.kind === 'credentialRequest'
            || block.kind === 'instruction'
            || block.kind === 'status'
          )
          && !block.content[locale]?.trim()
        ) {
          const content = block.kind === 'status'
            ? advancedLocaleCopy.variantStates[variant.state]
            : block.kind === 'consent'
              ? localeCopy.screenDefaults.consent.body
              : defaults.body;
          changed = true;
          return {
            ...block,
            content: {
              ...block.content,
              [locale]: content,
            },
          };
        }
        if (block.kind === 'actionGroup') {
          const actions = block.actions.map((action) => {
            if (action.label[locale]?.trim()) return action;
            const label = action.intent === 'retry'
              ? advancedLocaleCopy.variantStates.retry
              : action.intent === 'cancel'
                ? advancedLocaleCopy.common.cancel
                : variant.state === 'permission'
                  ? localeCopy.screenDefaults.consent.action
                  : defaults.action;
            changed = true;
            return {
              ...action,
              label: {
                ...action.label,
                [locale]: label,
              },
            };
          });
          return actions === block.actions ? block : { ...block, actions };
        }
        return block;
      });
      return { ...variant, blocks };
    });
    return { ...screen, variants };
  });
  return changed ? { ...manifest, screens } : manifest;
};

const contentForBlock = (block: InterfaceBlock): LocalizedContent | null => {
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

const visibilityReferenceKey = (reference: DataReference): string => (
  reference.kind === 'flowInput'
    ? `flow:${reference.fieldId}`
    : reference.kind === 'nodeOutput'
      ? `node:${reference.nodeId}:${reference.fieldId}`
      : 'literal'
);

const dynamicContentReferenceKey = (
  reference: DynamicContentReference,
): string => {
  if (reference.kind === 'flowInput') return `flow:${reference.fieldId}`;
  if (reference.kind === 'nodeOutput') {
    return `node:${reference.nodeId}:${reference.fieldId}`;
  }
  return `system:${reference.fieldId}`;
};

const visibilityLiteral = (
  field: FlowField,
): Extract<DataReference, { readonly kind: 'literal' }> | null => {
  if (field.type === 'string') {
    return { kind: 'literal', valueType: 'string', value: '' };
  }
  if (field.type === 'number') {
    return { kind: 'literal', valueType: 'number', value: 0 };
  }
  if (field.type === 'boolean') {
    return { kind: 'literal', valueType: 'boolean', value: false };
  }
  return null;
};

const visibilityOptionsForProject = (
  project: FlowProjectV2,
  workspace: DashboardWorkspaceV2,
): readonly VisibilityOption[] => {
  const safePrimitive = (field: FlowField) => (
    field.safeForResult
    && (
      field.classification === 'publicMetadata'
      || field.classification === 'internalMetadata'
    )
    && (
      field.type === 'string'
      || field.type === 'number'
      || field.type === 'boolean'
    )
  );
  const flowOptions = project.flow.inputSchema.fields
    .filter(safePrimitive)
    .map((field): VisibilityOption => ({
      key: `flow:${field.id}`,
      label: `flow.${field.key}`,
      reference: { kind: 'flowInput', fieldId: field.id },
      field,
    }));
  const nodeOptions = project.flow.nodes.flatMap((node) => {
    let fields: readonly FlowField[] = [];
    if (node.kind === 'verification') {
      fields = resolveModuleContract(node.moduleRef, workspace.moduleCatalog)
        ?.outputFields ?? [];
    } else if (node.kind === 'subflow') {
      fields = workspace.subflowCatalog
        .find((item) => item.id === node.subflowRef.packageId)
        ?.versions.find((version) => version.version === node.subflowRef.version)
        ?.contract.outputFields ?? [];
    }
    return fields.filter(safePrimitive).map((field): VisibilityOption => ({
      key: `node:${node.id}:${field.id}`,
      label: `${node.name ?? node.id}.${field.key}`,
      reference: {
        kind: 'nodeOutput',
        nodeId: node.id,
        fieldId: field.id,
      },
      field,
    }));
  });
  return [...flowOptions, ...nodeOptions];
};

const dynamicContentOptionsForProject = (
  project: FlowProjectV2,
  workspace: DashboardWorkspaceV2,
): readonly DynamicContentOption[] => {
  const canBind = (field: FlowField) => (
    (field.type === 'string'
      || field.type === 'number'
      || field.type === 'boolean')
    && field.classification !== 'sensitivePii'
    && field.classification !== 'biometric'
    && field.classification !== 'secret'
  );
  const options: DynamicContentOption[] = [
    {
      key: 'system:flowName',
      label: 'system.flowName',
      source: { kind: 'system', fieldId: 'flowName' },
    },
    {
      key: 'system:currentStep',
      label: 'system.currentStep',
      source: { kind: 'system', fieldId: 'currentStep' },
    },
    {
      key: 'system:totalSteps',
      label: 'system.totalSteps',
      source: { kind: 'system', fieldId: 'totalSteps' },
    },
    {
      key: 'system:outcome',
      label: 'system.outcome',
      source: { kind: 'system', fieldId: 'outcome' },
    },
  ];
  for (const field of project.flow.inputSchema.fields.filter(canBind)) {
    options.push({
      key: `flow:${field.id}`,
      label: `flow.${field.key}`,
      source: { kind: 'flowInput', fieldId: field.id },
    });
  }
  for (const node of project.flow.nodes) {
    let fields: readonly FlowField[] = [];
    if (node.kind === 'verification') {
      fields = resolveModuleContract(node.moduleRef, workspace.moduleCatalog)
        ?.outputFields ?? [];
    } else if (node.kind === 'subflow') {
      fields = workspace.subflowCatalog
        .find((item) => item.id === node.subflowRef.packageId)
        ?.versions.find(
          (version) => version.version === node.subflowRef.version,
        )
        ?.contract.outputFields ?? [];
    }
    for (const field of fields.filter(canBind)) {
      options.push({
        key: `node:${node.id}:${field.id}`,
        label: `${node.name ?? node.id}.${field.key}`,
        source: {
          kind: 'nodeOutput',
          nodeId: node.id,
          fieldId: field.id,
        },
      });
    }
  }
  return options;
};

const conditionContextForSimulation = (
  simulation: ScenarioExecutionResult | null,
): ConditionEvaluationContext => ({
  flowInputs: {},
  nodeOutputs: Object.fromEntries((simulation?.steps ?? []).map((step) => [
    step.nodeId,
    Object.fromEntries(Object.entries(step.metadata ?? {}).filter(
      (entry): entry is [string, SyntheticPrimitive] =>
        typeof entry[1] === 'string'
        || typeof entry[1] === 'boolean'
        || (typeof entry[1] === 'number' && Number.isFinite(entry[1])),
    )),
  ])),
});

const dynamicContentContextForPreview = (
  project: FlowProjectV2,
  simulation: ScenarioExecutionResult | null,
  currentStep: number,
  totalSteps: number,
  outcome: string,
): DynamicContentContext => ({
  flowInputs: Object.fromEntries(project.flow.inputSchema.fields.map((field) => [
    field.id,
    field.type === 'boolean'
      ? true
      : field.type === 'number'
        ? 1
        : `__synthetic_${field.id}__`,
  ])),
  nodeOutputs: Object.fromEntries((simulation?.steps ?? []).map((step) => [
    step.nodeId,
    step.metadata ?? {},
  ])),
  system: {
    flowName: project.name,
    currentStep,
    totalSteps,
    outcome,
  },
});

const setBlockContent = (
  block: InterfaceBlock,
  locale: Locale,
  value: string,
): InterfaceBlock => {
  if (
    block.kind === 'heading'
    || block.kind === 'text'
    || block.kind === 'consent'
    || block.kind === 'credentialRequest'
    || block.kind === 'instruction'
    || block.kind === 'status'
  ) {
    return {
      ...block,
      content: {
        ...block.content,
        [locale]: value,
      },
    };
  }
  return block;
};

const createBlock = (
  kind: InterfaceBlock['kind'],
  locale: Locale,
): InterfaceBlock => {
  const base = {
    id: createDashboardId(`block-${kind}`),
    hidden: false,
    required: false,
  };
  const content = { [locale]: '' };
  switch (kind) {
    case 'heading':
      return { ...base, kind, level: 2, content };
    case 'text':
      return { ...base, kind, content };
    case 'illustration':
      return { ...base, kind, source: 'url', value: '', alt: content };
    case 'consent':
      return { ...base, kind, scopeIds: [], content, consentRequired: true };
    case 'credentialRequest':
      return { ...base, kind, credentialType: '', content };
    case 'fieldSummary':
      return { ...base, kind, fields: [] };
    case 'instruction':
      return { ...base, kind, content };
    case 'progress':
      return { ...base, kind, mode: 'indeterminate' };
    case 'status':
      return { ...base, kind, tone: 'neutral', content };
    case 'actionGroup':
      return {
        ...base,
        kind,
        actions: [{
          id: createDashboardId('action'),
          intent: 'secondary',
          label: content,
        }],
      };
  }
};

const seedVariant = (
  state: InterfaceVariantState,
  locale: Locale,
): InterfaceScreenVariant => ({
  id: createDashboardId(`variant-${state}`),
  state,
  outcomes: [],
  blocks: createDefaultBlocks(locale),
});

const updateScreenInManifest = (
  manifest: InterfaceManifestV2,
  screenId: string,
  update: (screen: InterfaceScreenV2) => InterfaceScreenV2,
): InterfaceManifestV2 => ({
  ...manifest,
  screens: manifest.screens.map((screen) =>
    screen.id === screenId ? update(screen) : screen),
});

const updateVariantInManifest = (
  manifest: InterfaceManifestV2,
  screenId: string,
  variantId: string,
  update: (variant: InterfaceScreenVariant) => InterfaceScreenVariant,
): InterfaceManifestV2 => updateScreenInManifest(
  manifest,
  screenId,
  (screen) => ({
    ...screen,
    variants: screen.variants.map((variant) =>
      variant.id === variantId ? update(variant) : variant),
  }),
);

const scenarioLabel = (
  scenario: FlowScenario | undefined,
  copy: DashboardAdvancedCopy,
): string => scenario?.name ?? copy.journey.noScenario;

const designSystemVersionLabel = (
  name: string,
  version: string,
): string => `${name} · v${version}`;

const designSystemTokenSummary = (
  name: string,
  version: string,
  label: string,
  count: number,
): string => `${designSystemVersionLabel(name, version)} · ${label}: ${count}`;

const visualRegressionChannelLabel = (
  channel: VisualRegressionChannel,
  copy: DashboardAdvancedCopy,
): string => ({
  layout: copy.visualRegression.layoutChannel,
  theme: copy.visualRegression.themeChannel,
  structure: copy.visualRegression.structureChannel,
  content: copy.visualRegression.contentChannel,
})[channel];

function PreviewBlock({
  block,
  locale,
  defaultLocale,
  colors,
  theme,
  copy,
  simulation,
  dynamicContentContext,
}: {
  readonly block: InterfaceBlock;
  readonly locale: Locale;
  readonly defaultLocale: Locale;
  readonly colors: SemanticColorTokens;
  readonly theme: SemanticTheme;
  readonly copy: DashboardAdvancedCopy;
  readonly simulation: ScenarioExecutionResult | null;
  readonly dynamicContentContext: DynamicContentContext;
}) {
  if (block.hidden) return null;
  if (
    block.visibility
    && !evaluateCondition(
      block.visibility.condition,
      conditionContextForSimulation(simulation),
    )
  ) {
    return null;
  }
  const resolve = (content: LocalizedContent) =>
    resolveLocalizedContent(content, locale, defaultLocale);
  const content = contentForBlock(block);
  const resolved = content
    ? resolveDynamicContent(
        content,
        block.contentBinding,
        dynamicContentContext,
        locale,
        defaultLocale,
      )
    : null;
  const fallbackBadge = resolved?.fallbackUsed ? (
    <span className="type-label-compact ml-2 rounded bg-amber-100 px-1.5 py-0.5 font-bold text-amber-700">
      {copy.localization.fallbackBadge}
    </span>
  ) : null;
  const missing = resolved?.missing ? (
    <span className="type-label-compact rounded bg-rose-50 px-2 py-1 font-bold text-rose-600">
      {copy.localization.missingTranslation}
    </span>
  ) : null;
  const bindingBadge = resolved?.bindingApplied ? (
    <span className="type-label-compact ml-2 rounded bg-indigo-50 px-1.5 py-0.5 font-bold text-indigo-700">
      {copy.blocks.dynamicValue}
    </span>
  ) : resolved?.bindingFallbackUsed ? (
    <span className="type-label-compact ml-2 rounded bg-amber-100 px-1.5 py-0.5 font-bold text-amber-700">
      {copy.blocks.dynamicFallback}
    </span>
  ) : null;

  switch (block.kind) {
    case 'heading': {
      const Tag = block.level === 1 ? 'h1' : block.level === 2 ? 'h2' : 'h3';
      return (
        <Tag
          className={block.level === 1
 ? 'max-w-xl text-3xl font-bold leading-[1.15]'
 : block.level === 2
 ? 'max-w-xl text-xl font-bold'
 : 'max-w-xl text-base font-bold'}
          style={{
            fontSize: `${(
              block.level === 1 ? 30 : block.level === 2 ? 20 : 16
            ) * theme.typography.headingScale}px`,
            lineHeight: theme.typography.lineHeight,
          }}
        >
          {resolved?.value || missing}
          {bindingBadge}
          {fallbackBadge}
        </Tag>
      );
    }
    case 'text':
      return (
        <p
          className="max-w-xl text-sm opacity-70"
          style={{
            fontSize: `${14 * theme.typography.bodyScale}px`,
            lineHeight: Math.max(1.6, theme.typography.lineHeight),
          }}
        >
          {resolved?.value || missing}
          {bindingBadge}
          {fallbackBadge}
        </p>
      );
    case 'instruction':
      return (
        <div
          className="flex items-start gap-3 rounded-2xl border px-4 py-3.5"
          style={{
            borderColor: colors.border,
            backgroundColor: `${colors.primary}08`,
          }}
        >
          <span
            className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
            style={{
              color: colors.primary,
              backgroundColor: `${colors.primary}12`,
            }}
          >
            <Info className="h-4 w-4" />
          </span>
          <p
            className="text-sm opacity-80"
            style={{
              fontSize: `${14 * theme.typography.bodyScale}px`,
              lineHeight: Math.max(1.55, theme.typography.lineHeight),
            }}
          >
            {resolved?.value || missing}
            {bindingBadge}
            {fallbackBadge}
          </p>
        </div>
      );
    case 'illustration': {
      const alt = resolve(block.alt);
      return block.value ? (
        <img
          src={block.value}
          alt={alt.value}
          className="mx-auto max-h-40 max-w-full rounded-2xl object-contain"
        />
      ) : (
        <div className="flex h-28 items-center justify-center rounded-2xl border border-dashed text-xs opacity-50">
          {copy.blockTypes.illustration}
        </div>
      );
    }
    case 'consent':
      return (
        <label
          className="flex cursor-pointer items-start gap-3 rounded-2xl border p-4 text-sm transition-colors"
          style={{
            borderColor: colors.border,
            backgroundColor: `${colors.primary}06`,
          }}
        >
          <input
            type="checkbox"
            className="mt-0.5 h-5 w-5 shrink-0 rounded"
            style={{ accentColor: colors.primary }}
          />
          <span className="leading-6 opacity-85">
            {resolved?.value || missing}{bindingBadge}{fallbackBadge}
          </span>
        </label>
      );
    case 'credentialRequest':
      return (
        <div
          className="rounded-2xl border p-4"
          style={{
            borderColor: colors.border,
            backgroundColor: `${colors.primary}06`,
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{
                color: colors.primary,
                backgroundColor: `${colors.primary}12`,
              }}
            >
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="type-label-compact font-bold uppercase opacity-45">
                {copy.blockTypes.credentialRequest}
              </p>
              <p className="mt-0.5 truncate text-sm font-bold">{block.credentialType}</p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-6 opacity-70">
            {resolved?.value || missing}{bindingBadge}{fallbackBadge}
          </p>
        </div>
      );
    case 'fieldSummary':
      return (
        <div
          className="space-y-2 rounded-2xl border p-4"
          style={{ borderColor: colors.border }}
        >
          {block.fields.length === 0 ? (
            <span className="text-xs opacity-50">{copy.blockTypes.fieldSummary}</span>
          ) : block.fields.map((field) => (
            <div
              key={`${field.nodeId ?? 'flow'}:${field.fieldId}`}
              className="flex items-center justify-between rounded-xl px-3 py-2 text-xs"
              style={{ backgroundColor: `${colors.primary}06` }}
            >
              <span>{field.fieldId}</span><span className="opacity-50">••••</span>
            </div>
          ))}
        </div>
      );
    case 'progress':
      return (
        <div
          className="rounded-2xl border p-4"
          style={{ borderColor: colors.border }}
        >
          <div className="mb-3 flex items-center gap-2">
            {[0, 1, 2].map((index) => (
              <span
                key={index}
                className="h-2 w-2 rounded-full motion-safe:animate-pulse"
                style={{
                  backgroundColor: colors.primary,
                  opacity: 1 - index * 0.24,
                  animationDelay: `${index * 160}ms`,
                }}
              />
            ))}
          </div>
          <div className="h-2 overflow-hidden rounded-full" style={{ backgroundColor: colors.border }}>
            <div
              className="h-full w-2/3 rounded-full motion-safe:animate-pulse"
              style={{ backgroundColor: colors.primary }}
            />
          </div>
        </div>
      );
    case 'status': {
      const accent = block.tone === 'error'
        ? colors.error
        : block.tone === 'success'
          ? colors.success
          : colors.primary;
      const StatusIcon = block.tone === 'error'
        ? CircleAlert
        : block.tone === 'success'
          ? CheckCircle2
          : block.tone === 'neutral'
            ? LoaderCircle
            : Info;
      return (
        <div
          className="inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold"
          style={{
            borderColor: `${accent}35`,
            backgroundColor: `${accent}0D`,
            color: accent,
          }}
        >
          <StatusIcon
            className={`h-3.5 w-3.5 ${
              block.tone === 'neutral' ? 'motion-safe:animate-spin' : ''
            }`}
          />
          {resolved?.value || missing}{bindingBadge}{fallbackBadge}
        </div>
      );
    }
    case 'actionGroup':
      return (
        <div className="flex flex-wrap gap-2 pt-1">
          {block.actions.map((action, index) => {
            const label = resolve(action.label);
            const primary = index === 0;
            return (
              <button
                key={action.id}
                type="button"
                className="group inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-transform motion-safe:hover:-translate-y-0.5"
                style={{
                  minHeight: theme.controls.height,
                  borderRadius: theme.controls.radius,
                  backgroundColor: primary ? colors.primary : colors.surface,
                  color: primary ? colors.onPrimary : colors.text,
                  border: `${theme.controls.borderWidth}px solid ${
                    primary ? colors.primary : colors.border
                  }`,
                  boxShadow: primary
                    ? `0 10px 24px ${colors.primary}24`
                    : 'none',
                }}
              >
                {label.value || copy.localization.missingTranslation}
                {action.intent === 'retry'
                  ? <RefreshCw className="h-4 w-4" />
                  : primary
                    ? <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    : null}
              </button>
            );
          })}
        </div>
      );
  }
}

function BlockEditor({
  block,
  index,
  total,
  locale,
  defaultLocale,
  copy,
  visibilityOptions,
  dynamicContentOptions,
  onUpdate,
  onAction,
}: {
  readonly block: InterfaceBlock;
  readonly index: number;
  readonly total: number;
  readonly locale: Locale;
  readonly defaultLocale: Locale;
  readonly copy: DashboardAdvancedCopy;
  readonly visibilityOptions: readonly VisibilityOption[];
  readonly dynamicContentOptions: readonly DynamicContentOption[];
  readonly onUpdate: (block: InterfaceBlock) => void;
  readonly onAction: (
    action:
      | { readonly type: 'duplicate'; readonly blockId: string }
      | { readonly type: 'hide'; readonly blockId: string; readonly hidden: boolean }
      | { readonly type: 'move'; readonly blockId: string; readonly toIndex: number }
      | { readonly type: 'delete'; readonly blockId: string },
  ) => void;
}) {
  const content = contentForBlock(block);
  const missing = content !== null && !content[locale]?.trim();
  const bindingKey = block.contentBinding
    ? dynamicContentReferenceKey(block.contentBinding.source)
    : '';
  const bindingIsStale = Boolean(
    bindingKey
    && !dynamicContentOptions.some((option) => option.key === bindingKey),
  );
  const copyDefault = () => {
    if (!content) return;
    onUpdate(setBlockContent(block, locale, content[defaultLocale] ?? ''));
  };
  const addVisibilityRule = () => {
    const option = visibilityOptions[0];
    if (!option || !block.visibility) return;
    const right = visibilityLiteral(option.field);
    if (!right) return;
    onUpdate({
      ...block,
      visibility: {
        condition: {
          ...block.visibility.condition,
          conditions: [
            ...block.visibility.condition.conditions,
            {
              id: createDashboardId('visibility-rule'),
              kind: 'rule',
              left: option.reference,
              operator: 'equals',
              right,
            },
          ],
        },
      },
    });
  };

  return (
    <div className={`rounded-xl border p-3 ${missing ? 'border-amber-300' : 'border-slate-200'}`}>
      <div className="flex items-center gap-2">
        <span className="type-label-compact rounded bg-slate-100 px-2 py-1 font-bold text-slate-600">
          {copy.blockTypes[block.kind]}
        </span>
        {block.required && (
          <span className="type-label-compact font-bold text-rose-600">{copy.blocks.requiredBlock}</span>
        )}
        <div className="ml-auto flex">
          <button type="button" aria-label={copy.blocks.moveUp} title={copy.blocks.moveUp} disabled={index === 0} onClick={() => onAction({ type: 'move', blockId: block.id, toIndex: index - 1 })} className="rounded p-1 text-slate-400 hover:bg-slate-100 disabled:opacity-25"><ArrowUp className="h-3 w-3" /></button>
          <button type="button" aria-label={copy.blocks.moveDown} title={copy.blocks.moveDown} disabled={index === total - 1} onClick={() => onAction({ type: 'move', blockId: block.id, toIndex: index + 1 })} className="rounded p-1 text-slate-400 hover:bg-slate-100 disabled:opacity-25"><ArrowDown className="h-3 w-3" /></button>
          <button type="button" aria-label={copy.blocks.duplicateBlock} title={copy.blocks.duplicateBlock} onClick={() => onAction({ type: 'duplicate', blockId: block.id })} className="rounded p-1 text-slate-400 hover:bg-slate-100"><Copy className="h-3 w-3" /></button>
          <button type="button" aria-label={block.hidden ? copy.blocks.showBlock : copy.blocks.hideBlock} title={block.hidden ? copy.blocks.showBlock : copy.blocks.hideBlock} disabled={block.required} onClick={() => onAction({ type: 'hide', blockId: block.id, hidden: !block.hidden })} className="rounded p-1 text-slate-400 hover:bg-slate-100 disabled:opacity-25">{block.hidden ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}</button>
          <button type="button" aria-label={copy.blocks.deleteBlock} title={copy.blocks.deleteBlock} disabled={block.required} onClick={() => onAction({ type: 'delete', blockId: block.id })} className="rounded p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-25"><Trash2 className="h-3 w-3" /></button>
        </div>
      </div>
      {content && (
        <>
          <textarea
            rows={3}
            value={content[locale] ?? ''}
            onChange={(event) => onUpdate(setBlockContent(block, locale, event.target.value))}
            placeholder={copy.localization.missingTranslation}
            aria-label={copy.blocks.staticFallback}
            className="type-control-compact mt-3 w-full resize-none rounded-lg border border-slate-200 px-2.5 py-2 leading-4 outline-none focus:border-[#354CE1]"
          />
          <div className="mt-2 rounded-lg border border-indigo-100 bg-indigo-50/60 p-2.5">
            <label className="type-label-compact block font-bold text-indigo-800">
              {copy.blocks.dynamicContent}
              <select
                value={bindingKey}
                onChange={(event) => {
                  const option = dynamicContentOptions.find(
                    (candidate) => candidate.key === event.target.value,
                  );
                  onUpdate({
                    ...block,
                    contentBinding: option
                      ? { source: option.source }
                      : undefined,
                  });
                }}
                className={`type-control-compact mt-1 w-full rounded-lg border bg-white px-2 py-2 font-mono ${
                  bindingIsStale ? 'border-amber-400 text-amber-800' : 'border-indigo-100 text-slate-700'
                }`}
              >
                <option value="">{copy.blocks.noBinding}</option>
                {bindingIsStale && (
                  <option value={bindingKey}>
                    {copy.blocks.staleBinding} · {bindingKey}
                  </option>
                )}
                {dynamicContentOptions.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <p className="type-caption mt-1 leading-4 text-indigo-700/70">
              {bindingIsStale
                ? copy.blocks.staleBindingHint
                : copy.blocks.dynamicContentHint}
            </p>
          </div>
        </>
      )}
      {block.kind === 'illustration' && (
        <div className="mt-3 space-y-2">
          <input value={block.value} onChange={(event) => onUpdate({ ...block, value: event.target.value })} placeholder="https://" className="type-control-compact w-full rounded-lg border border-slate-200 px-2.5 py-2 " />
          <input value={block.alt[locale] ?? ''} onChange={(event) => onUpdate({ ...block, alt: { ...block.alt, [locale]: event.target.value } })} placeholder={copy.accessibilityChecks.missingAlt} className="type-control-compact w-full rounded-lg border border-slate-200 px-2.5 py-2 " />
        </div>
      )}
      {block.kind === 'consent' && (
        <input
          value={block.scopeIds.join(', ')}
          onChange={(event) => onUpdate({
            ...block,
            scopeIds: event.target.value
              .split(',')
              .map((value) => value.trim())
              .filter(Boolean),
          })}
          placeholder={CONSENT_SCOPE_PLACEHOLDER}
          className="type-technical mt-2 w-full rounded-lg border border-slate-200 px-2.5 py-2 font-mono "
        />
      )}
      {block.kind === 'credentialRequest' && (
        <input
          value={block.credentialType}
          onChange={(event) => onUpdate({
            ...block,
            credentialType: event.target.value,
          })}
          placeholder="VerifiableCredential"
          className="type-technical mt-2 w-full rounded-lg border border-slate-200 px-2.5 py-2 font-mono "
        />
      )}
      {block.kind === 'fieldSummary' && (
        <div className="mt-2 max-h-32 space-y-1 overflow-y-auto rounded-lg border border-slate-200 p-2">
          {visibilityOptions
            .filter((option) => option.reference.kind === 'nodeOutput')
            .map((option) => {
              if (option.reference.kind !== 'nodeOutput') return null;
              const reference = option.reference;
              const selected = block.fields.some((field) =>
                field.nodeId === reference.nodeId
                && field.fieldId === reference.fieldId);
              return (
                <label key={option.key} className="type-caption flex items-center gap-2 text-slate-600">
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => onUpdate({
                      ...block,
                      fields: selected
                        ? block.fields.filter((field) =>
                            field.nodeId !== reference.nodeId
                            || field.fieldId !== reference.fieldId)
                        : [
                            ...block.fields,
                            {
                              nodeId: reference.nodeId,
                              fieldId: reference.fieldId,
                            },
                          ],
                    })}
                    className="accent-[#354CE1]"
                  />
                  <span className="truncate font-mono">{option.label}</span>
                </label>
              );
            })}
        </div>
      )}
      {block.kind === 'heading' && (
        <select value={block.level} onChange={(event) => onUpdate({ ...block, level: Number(event.target.value) as 1 | 2 | 3 })} className="type-control-compact mt-2 rounded-lg border border-slate-200 px-2 py-1.5 ">
          <option value={1}>H1</option><option value={2}>H2</option><option value={3}>H3</option>
        </select>
      )}
      {block.kind === 'status' && (
        <select value={block.tone} onChange={(event) => onUpdate({ ...block, tone: event.target.value as typeof block.tone })} className="type-control-compact mt-2 rounded-lg border border-slate-200 px-2 py-1.5 ">
          {['neutral', 'info', 'success', 'warning', 'error'].map((tone) => <option key={tone} value={tone}>{tone}</option>)}
        </select>
      )}
      {block.kind === 'progress' && (
        <select value={block.mode} onChange={(event) => onUpdate({ ...block, mode: event.target.value as typeof block.mode })} className="type-control-compact mt-2 rounded-lg border border-slate-200 px-2 py-1.5 ">
          {['indeterminate', 'determinate', 'steps'].map((mode) => <option key={mode} value={mode}>{mode}</option>)}
        </select>
      )}
      {block.kind === 'actionGroup' && block.actions.map((action) => (
        <div key={action.id} className="mt-2 grid grid-cols-[1fr_104px] gap-2">
          <input
            value={action.label[locale] ?? ''}
            onChange={(event) => onUpdate({
              ...block,
              actions: block.actions.map((candidate) => candidate.id === action.id
                ? { ...candidate, label: { ...candidate.label, [locale]: event.target.value } }
                : candidate),
            })}
            placeholder={copy.localization.missingTranslation}
            className="type-control-compact w-full rounded-lg border border-slate-200 px-2.5 py-2 "
          />
          <select
            value={action.intent}
            onChange={(event) => onUpdate({
              ...block,
              actions: block.actions.map((candidate) => candidate.id === action.id
                ? {
                    ...candidate,
                    intent: event.target.value as typeof action.intent,
                  }
                : candidate),
            })}
            className="type-control-compact rounded-lg border border-slate-200 px-1.5 py-2 "
          >
            {['primary', 'secondary', 'cancel', 'retry', 'continue'].map((intent) => (
              <option key={intent} value={intent}>{intent}</option>
            ))}
          </select>
        </div>
      ))}
      <label className="type-label-compact mt-2 flex items-center gap-2 font-semibold text-slate-500">
        <input
          type="checkbox"
          checked={Boolean(block.visibility)}
          onChange={(event) => onUpdate(event.target.checked
            ? {
                ...block,
                visibility: {
                  condition: {
                    id: createDashboardId('visibility-group'),
                    kind: 'group',
                    combinator: 'and',
                    conditions: visibilityOptions[0]
                      && visibilityLiteral(visibilityOptions[0].field)
                      ? [{
                          id: createDashboardId('visibility-rule'),
                          kind: 'rule',
                          left: visibilityOptions[0].reference,
                          operator: 'equals',
                          right: visibilityLiteral(visibilityOptions[0].field)!,
                        }]
                      : [],
                  },
                },
              }
            : { ...block, visibility: undefined })}
          className="accent-[#354CE1]"
        />
        {copy.blocks.conditionalVisibility}
      </label>
      {block.visibility && (
        <div className="mt-2 space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-2">
          <select
            value={block.visibility.condition.combinator}
            onChange={(event) => onUpdate({
              ...block,
              visibility: {
                condition: {
                  ...block.visibility!.condition,
                  combinator: event.target.value as 'and' | 'or',
                },
              },
            })}
            className="type-control-compact w-full rounded border border-slate-200 bg-white px-2 py-1.5 font-bold"
          >
            <option value="and">{copy.conditions.matchAll}</option>
            <option value="or">{copy.conditions.matchAny}</option>
          </select>
          {block.visibility.condition.conditions.map((condition) => {
            if (condition.kind === 'group') return null;
            const option = visibilityOptions.find(
              (candidate) => candidate.key === visibilityReferenceKey(condition.left),
            );
            const operators = option
              ? getCompatibleConditionOperators(option.field.type)
              : ['exists', 'notExists'] as const;
            const rightLiteral = condition.right?.kind === 'literal'
              ? condition.right
              : null;
            const setRule = (patch: Partial<typeof condition>) => onUpdate({
              ...block,
              visibility: {
                condition: {
                  ...block.visibility!.condition,
                  conditions: block.visibility!.condition.conditions.map((candidate) =>
                    candidate.id === condition.id
                      ? { ...condition, ...patch }
                      : candidate),
                },
              },
            });
            return (
              <div key={condition.id} className="space-y-1.5 rounded border border-slate-200 bg-white p-2">
                <div className="flex gap-1">
                  <select
                    value={visibilityReferenceKey(condition.left)}
                    onChange={(event) => {
                      const selected = visibilityOptions.find(
                        (candidate) => candidate.key === event.target.value,
                      );
                      if (!selected) return;
                      setRule({
                        left: selected.reference,
                        operator: 'equals',
                        right: visibilityLiteral(selected.field) ?? undefined,
                      });
                    }}
                    className="type-control-compact min-w-0 flex-1 rounded border border-slate-200 px-1.5 py-1 "
                  >
                    {!option && (
                      <option value={visibilityReferenceKey(condition.left)}>
                        {copy.mappingIssues.staleBinding}
                      </option>
                    )}
                    {visibilityOptions.map((candidate) => (
                      <option key={candidate.key} value={candidate.key}>
                        {candidate.label}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    aria-label={copy.conditions.removeRule}
                    title={copy.conditions.removeRule}
                    onClick={() => onUpdate({
                      ...block,
                      visibility: {
                        condition: {
                          ...block.visibility!.condition,
                          conditions: block.visibility!.condition.conditions.filter(
                            (candidate) => candidate.id !== condition.id,
                          ),
                        },
                      },
                    })}
                    className="rounded p-1 text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
                <select
                  value={condition.operator}
                  onChange={(event) => setRule({
                    operator: event.target.value as ConditionOperator,
                  })}
                  className="type-control-compact w-full rounded border border-slate-200 px-1.5 py-1 "
                >
                  {operators.map((operator) => (
                    <option key={operator} value={operator}>
                      {copy.conditionOperators[operator]}
                    </option>
                  ))}
                </select>
                {rightLiteral
                  && condition.operator !== 'exists'
                  && condition.operator !== 'notExists'
                  && (
                    rightLiteral.valueType === 'boolean' ? (
                      <select
                        value={String(rightLiteral.value)}
                        onChange={(event) => setRule({
                          right: {
                            ...rightLiteral,
                            value: event.target.value === 'true',
                          },
                        })}
                        className="type-control-compact w-full rounded border border-slate-200 px-1.5 py-1 "
                      >
                        <option value="true">true</option>
                        <option value="false">false</option>
                      </select>
                    ) : (
                      <input
                        type={rightLiteral.valueType === 'number' ? 'number' : 'text'}
                        value={String(rightLiteral.value)}
                        onChange={(event) => setRule({
                          right: {
                            ...rightLiteral,
                            value: rightLiteral.valueType === 'number'
                              ? Number(event.target.value)
                              : event.target.value,
                          },
                        })}
                        className="type-control-compact w-full rounded border border-slate-200 px-1.5 py-1 "
                      />
                    )
                  )}
              </div>
            );
          })}
          <button
            type="button"
            onClick={addVisibilityRule}
            disabled={visibilityOptions.length === 0}
            className="type-control-compact inline-flex items-center gap-1 font-bold text-[#354CE1] disabled:opacity-40"
          >
            <Plus className="h-3 w-3" />
            {copy.conditions.addRule}
          </button>
        </div>
      )}
      {locale !== defaultLocale && missing && (
        <button type="button" onClick={copyDefault} className="type-control-compact mt-2 font-bold text-[#354CE1]">
          {copy.localization.copyFromDefault}
        </button>
      )}
    </div>
  );
}

export default function InterfaceStudioWorkspace({
  copy,
  advancedCopy,
  project,
  workspace,
  onProjectChange,
  onWorkspaceChange,
  onOpenFlow,
}: InterfaceStudioWorkspaceProps) {
  const reconciled = useMemo(() => reconcileInterfaceStudioManifest(
    project.interface,
    project,
    workspace.moduleCatalog,
    workspace.subflowCatalog,
  ), [project, workspace.moduleCatalog, workspace.subflowCatalog]);
  const seeded = useMemo(
    () => seedManifestCopy(reconciled, project, workspace),
    [project, reconciled, workspace],
  );
  const [selectedScreenId, setSelectedScreenId] = useState(seeded.screens[0]?.id ?? '');
  const [selectedVariantId, setSelectedVariantId] = useState(
    seeded.screens[0]?.variants[0]?.id ?? '',
  );
  const [previewDevice, setPreviewDevice] = useState<PreviewDevice>('desktop');
  const [previewTheme, setPreviewTheme] = useState<PreviewTheme>('light');
  const [studioTab, setStudioTab] = useState<StudioTab>('blocks');
  const [toolbarVisible, setToolbarVisible] = useState(true);
  const [screensPanelVisible, setScreensPanelVisible] = useState(true);
  const [editorPanelVisible, setEditorPanelVisible] = useState(true);
  const [editingLocale, setEditingLocale] = useState<Locale>(seeded.defaultLocale);
  const [previewLocale, setPreviewLocale] = useState<Locale>(seeded.defaultLocale);
  const [selectedScenarioId, setSelectedScenarioId] = useState(
    project.scenarios[0]?.id ?? '',
  );
  const [simulation, setSimulation] = useState<ScenarioExecutionResult | null>(null);
  const [journeyIndex, setJourneyIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const [exportState, setExportState] = useState<ExportState>('idle');
  const [designSystemImportOpen, setDesignSystemImportOpen] = useState(false);
  const [designSystemSource, setDesignSystemSource] = useState('');
  const [designSystemApplied, setDesignSystemApplied] = useState(false);
  const [regressionHasRun, setRegressionHasRun] = useState(false);
  const exportTimerRef = useRef<number | null>(null);
  const designSystemImportResult = useMemo(
    () => designSystemSource.trim()
      ? parseDesignSystemManifest(designSystemSource)
      : null,
    [designSystemSource],
  );

  const selectedScreen = seeded.screens.find(
    (screen) => screen.id === selectedScreenId,
  ) ?? seeded.screens[0];
  const selectedVariant = selectedScreen?.variants.find(
    (variant) => variant.id === selectedVariantId,
  ) ?? selectedScreen?.variants[0];
  const variantContract = useMemo(() => {
    if (!selectedScreen || selectedScreen.kind !== 'module') {
      const stateByKind: Partial<Record<
        InterfaceScreenV2['kind'],
        InterfaceVariantState
      >> = {
        welcome: 'intro',
        consent: 'permission',
        processing: 'processing',
        success: 'success',
        error: 'error',
      };
      return {
        states: [stateByKind[selectedScreen?.kind ?? 'welcome'] ?? 'default'],
        outcomes: selectedScreen?.kind === 'success'
          ? ['success'] as const
          : selectedScreen?.kind === 'error'
            ? ['failure'] as const
            : [],
      };
    }
    const node = project.flow.nodes.find(
      (candidate) => candidate.id === selectedScreen.sourceNodeId,
    );
    if (node?.kind === 'verification') {
      const contract = resolveModuleContract(node.moduleRef, workspace.moduleCatalog);
      return {
        states: contract?.uiCapabilities.supportedStates ?? ['default'],
        outcomes: contract?.outcomes.map((outcome) => outcome.id) ?? [],
      };
    }
    if (node?.kind === 'subflow') {
      return {
        states: ['intro', 'processing', 'success', 'error'] as const,
        outcomes: ['success', 'failure'] as const,
      };
    }
    return {
      states: ['default'] as const,
      outcomes: [],
    };
  }, [project.flow.nodes, selectedScreen, workspace.moduleCatalog]);
  const selectedScenario = project.scenarios.find(
    (scenario) => scenario.id === selectedScenarioId,
  );
  const journey: PreviewJourney | null = useMemo(() => simulation
    ? buildPreviewJourney(
        { ...project, interface: seeded },
        simulation,
        workspace.moduleCatalog,
        workspace.subflowCatalog,
      )
    : null, [
    project,
    seeded,
    simulation,
    workspace.moduleCatalog,
    workspace.subflowCatalog,
  ]);
  const currentJourneyStep = journey?.steps[journeyIndex];
  const report = useMemo(
    () => validateInterfaceStudioManifest(seeded, {
      flow: project.flow,
      moduleCatalog: workspace.moduleCatalog,
      subflowCatalog: workspace.subflowCatalog,
    }),
    [
      project.flow,
      seeded,
      workspace.moduleCatalog,
      workspace.subflowCatalog,
    ],
  );
  const visibilityOptions = useMemo(
    () => visibilityOptionsForProject(project, workspace),
    [project, workspace],
  );
  const dynamicContentOptions = useMemo(
    () => dynamicContentOptionsForProject(project, workspace),
    [project, workspace],
  );
  const currentVisualContext: VisualRegressionContext = {
    screenId: selectedScreen?.id ?? '',
    variantId: selectedVariant?.id ?? '',
    breakpoint: previewDevice,
    themeMode: previewTheme,
    locale: previewLocale,
  };
  const visualBaselines = useMemo(
    () => project.visualRegressionBaselines ?? [],
    [project.visualRegressionBaselines],
  );
  const visualRegressionResults = useMemo(() => visualBaselines.map(
    (baseline) => ({
      baseline,
      comparison: compareVisualRegressionSnapshot(
        baseline.snapshot,
        createVisualRegressionSnapshot(seeded, {
          screenId: baseline.screenId,
          variantId: baseline.variantId,
          breakpoint: baseline.breakpoint,
          themeMode: baseline.themeMode,
          locale: baseline.locale,
        }),
      ),
    }),
  ), [seeded, visualBaselines]);
  const currentVisualBaseline = visualBaselines.find((baseline) => (
    baseline.screenId === currentVisualContext.screenId
    && baseline.variantId === currentVisualContext.variantId
    && baseline.breakpoint === currentVisualContext.breakpoint
    && baseline.themeMode === currentVisualContext.themeMode
    && baseline.locale === currentVisualContext.locale
  ));
  const currentVisualComparison: VisualRegressionComparison | null =
    currentVisualBaseline
      ? compareVisualRegressionSnapshot(
          currentVisualBaseline.snapshot,
          createVisualRegressionSnapshot(seeded, currentVisualContext),
        )
      : null;
  const visualRegressionBlocksExport = visualBaselines.length > 0
    && visualRegressionResults.some(
      (result) => result.comparison.status !== 'passed',
    );
  const flowIssues = useMemo(
    () => validateDynamicFlowV2(
      project.flow,
      workspace.moduleCatalog,
      workspace.subflowCatalog,
    ),
    [project.flow, workspace.moduleCatalog, workspace.subflowCatalog],
  );

  useEffect(() => {
    if (JSON.stringify(seeded) !== JSON.stringify(project.interface)) {
      onProjectChange({ ...project, interface: seeded });
    }
  }, [onProjectChange, project, seeded]);

  useEffect(() => {
    if (!selectedScreen) return;
    if (!selectedScreen.variants.some((variant) => variant.id === selectedVariantId)) {
      setSelectedVariantId(selectedScreen.variants[0]?.id ?? '');
    }
  }, [selectedScreen, selectedVariantId]);

  useEffect(() => {
    if (!currentJourneyStep) return;
    setSelectedScreenId(currentJourneyStep.screenId);
    setSelectedVariantId(currentJourneyStep.variantId);
  }, [currentJourneyStep]);

  useEffect(() => {
    if (!autoplay || !journey || journey.steps.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setJourneyIndex((current) => {
        if (current >= journey.steps.length - 1) {
          setAutoplay(false);
          return current;
        }
        return current + 1;
      });
    }, seeded.theme.motion === 'reduced' ? 3000 : 1600);
    return () => window.clearInterval(timer);
  }, [autoplay, journey, seeded.theme.motion]);

  useEffect(() => () => {
    if (exportTimerRef.current !== null) window.clearTimeout(exportTimerRef.current);
  }, []);

  const updateManifest = (
    manifest: InterfaceManifestV2,
    checkpointBeforeChange = false,
  ) => {
    const nextProject = { ...project, interface: manifest };
    if (!checkpointBeforeChange) {
      onProjectChange(nextProject);
      return;
    }
    const createdAt = new Date().toISOString();
    const revision = createDraftRevisionSnapshot(
      { ...project, interface: seeded },
      workspace.draftRevisions,
      {
        id: createDashboardId('revision'),
        createdAt,
        reason: 'beforeDestructiveChange',
      },
    );
    onWorkspaceChange({
      ...workspace,
      projects: workspace.projects.map((candidate) =>
        candidate.id === project.id
          ? { ...nextProject, updatedAt: createdAt }
          : candidate),
      draftRevisions: appendBoundedDraftRevision(
        workspace.draftRevisions,
        revision,
      ),
    });
  };
  const updateResponsiveOverride = (
    override: InterfaceResponsiveOverride | undefined,
  ) => {
    const responsiveOverrides: Partial<Record<
      PreviewDevice,
      InterfaceResponsiveOverride
    >> = { ...(seeded.responsiveOverrides ?? {}) };
    if (override) responsiveOverrides[previewDevice] = override;
    else delete responsiveOverrides[previewDevice];
    updateManifest({
      ...seeded,
      responsiveOverrides,
    });
  };
  const applyImportedDesignSystem = () => {
    if (!designSystemImportResult?.ok) return;
    updateManifest(
      applyDesignSystemManifest(
        seeded,
        designSystemImportResult.manifest,
      ),
      true,
    );
    setDesignSystemApplied(true);
    setRegressionHasRun(true);
  };
  const captureVisualBaseline = () => {
    if (!selectedScreen || !selectedVariant) return;
    const capturedAt = new Date().toISOString();
    const baseline = createVisualRegressionBaseline(
      seeded,
      currentVisualContext,
      {
        id: currentVisualBaseline?.id
          ?? createDashboardId('visual-baseline'),
        capturedAt,
      },
    );
    if (!baseline) return;
    onProjectChange({
      ...project,
      interface: seeded,
      updatedAt: capturedAt,
      visualRegressionBaselines: upsertVisualRegressionBaseline(
        visualBaselines,
        baseline,
      ),
    });
    setRegressionHasRun(true);
  };
  const deleteVisualBaseline = (baselineId: string) => {
    onProjectChange({
      ...project,
      interface: seeded,
      updatedAt: new Date().toISOString(),
      visualRegressionBaselines: visualBaselines.filter(
        (baseline) => baseline.id !== baselineId,
      ),
    });
  };
  const updateSelectedVariant = (
    update: (variant: InterfaceScreenVariant) => InterfaceScreenVariant,
  ) => {
    if (!selectedScreen || !selectedVariant) return;
    updateManifest(updateVariantInManifest(
      seeded,
      selectedScreen.id,
      selectedVariant.id,
      update,
    ));
  };
  const runPreview = () => {
    const result = simulateDynamicFlowV2(project.flow, {
      ...(selectedScenario ? { scenario: selectedScenario } : {}),
      moduleCatalog: workspace.moduleCatalog,
      subflowCatalog: workspace.subflowCatalog,
    });
    setSimulation(result);
    setJourneyIndex(0);
    setAutoplay(false);
  };
  const handleExport = () => {
    if (exportTimerRef.current !== null) window.clearTimeout(exportTimerRef.current);
    if (
      report.blocksExport
      || flowIssues.length > 0
      || visualRegressionBlocksExport
    ) {
      setExportState('blocked');
      exportTimerRef.current = window.setTimeout(() => setExportState('idle'), 3200);
    } else {
      setExportState('exporting');
      exportTimerRef.current = window.setTimeout(() => {
        setExportState('success');
        exportTimerRef.current = window.setTimeout(() => setExportState('idle'), 3200);
      }, 700);
    }
  };
  const blockAction = (
    action:
      | { readonly type: 'duplicate'; readonly blockId: string }
      | { readonly type: 'hide'; readonly blockId: string; readonly hidden: boolean }
      | { readonly type: 'move'; readonly blockId: string; readonly toIndex: number }
      | { readonly type: 'delete'; readonly blockId: string },
  ) => {
    if (!selectedScreen || !selectedVariant) return;
    const nextManifest = updateVariantInManifest(
      seeded,
      selectedScreen.id,
      selectedVariant.id,
      (variant) => ({
        ...variant,
        blocks: interfaceBlockReducer({ blocks: variant.blocks }, action).blocks,
      }),
    );
    updateManifest(nextManifest, action.type === 'delete');
  };
  const updateBlock = (block: InterfaceBlock) => updateSelectedVariant((variant) => ({
    ...variant,
    blocks: variant.blocks.map((candidate) => candidate.id === block.id ? block : candidate),
  }));
  const addVariant = () => {
    if (!selectedScreen) return;
    const existing = new Set(selectedScreen.variants.map((variant) => variant.state));
    const state = variantContract.states
      .find((candidate) => !existing.has(candidate));
    if (!state) return;
    const variant = seedVariant(state, seeded.defaultLocale);
    updateManifest(updateScreenInManifest(seeded, selectedScreen.id, (screen) => ({
      ...screen,
      variants: [...screen.variants, variant],
    })));
    setSelectedVariantId(variant.id);
  };
  const removeVariant = () => {
    if (!selectedScreen || !selectedVariant || selectedScreen.variants.length <= 1) return;
    updateManifest(
      updateScreenInManifest(seeded, selectedScreen.id, (screen) => ({
        ...screen,
        variants: screen.variants.filter(
          (variant) => variant.id !== selectedVariant.id,
        ),
      })),
      true,
    );
    setSelectedVariantId(selectedScreen.variants.find(
      (variant) => variant.id !== selectedVariant.id,
    )?.id ?? '');
  };
  const colors = seeded.theme[previewTheme];
  const responsiveInterface = resolveResponsiveInterface(
    seeded,
    previewDevice,
  );
  const activeResponsiveOverride =
    seeded.responsiveOverrides?.[previewDevice];
  const previewSemanticTheme: SemanticTheme = {
    ...seeded.theme,
    borderRadius: responsiveInterface.borderRadius,
    spacingScale: responsiveInterface.spacingScale,
    typography: {
      ...seeded.theme.typography,
      headingScale: responsiveInterface.headingScale,
      bodyScale: responsiveInterface.bodyScale,
    },
  };
  const dynamicContentContext = dynamicContentContextForPreview(
    project,
    simulation,
    journey ? journeyIndex + 1 : 1,
    journey?.steps.length ?? 1,
    currentJourneyStep?.outcome
      ?? simulation?.terminalOutcome
      ?? '',
  );
  const deviceWidth = previewDevice === 'mobile'
    ? 'max-w-[390px]'
    : previewDevice === 'tablet'
      ? 'max-w-[760px]'
      : 'max-w-[1080px]';
  const previewStyle: CSSProperties = {
    backgroundColor: colors.background,
    color: colors.text,
    fontFamily: previewSemanticTheme.typography.fontFamily === 'system'
      ? 'ui-sans-serif, system-ui, sans-serif'
      : previewSemanticTheme.typography.fontFamily,
  };

  return (
    <div className="flex min-h-[inherit] flex-col bg-slate-50 xl:h-[100dvh] xl:max-h-[100dvh] xl:overflow-hidden">
      {toolbarVisible && (
        <>
          <header className="flex flex-wrap items-center gap-2 border-b border-slate-200 bg-white px-4 py-3 sm:px-5">
        <button type="button" onClick={onOpenFlow} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50">
          <ArrowLeft className="h-3.5 w-3.5" />{copy.studio.backToFlow}
        </button>
        <div className="mr-auto min-w-0 pl-1">
          <p className="type-label-compact font-bold uppercase text-[#354CE1]">{copy.studio.breadcrumb}</p>
          <h1 className="type-featured-title truncate text-slate-950">{project.name}</h1>
        </div>
        <div className="flex rounded-lg bg-slate-100 p-1">
          {([
            ['mobile', Smartphone, copy.studio.mobilePreview],
            ['tablet', Tablet, advancedCopy.theme.tablet],
            ['desktop', Monitor, copy.studio.desktopPreview],
          ] as const).map(([device, Icon, label]) => (
            <button key={device} type="button" aria-label={label} title={label} onClick={() => setPreviewDevice(device)} className={`rounded-md p-1.5 ${previewDevice === device ? 'bg-white text-[#354CE1] shadow-sm' : 'text-slate-400'}`}><Icon className="h-4 w-4" /></button>
          ))}
        </div>
        <button type="button" onClick={handleExport} disabled={exportState === 'exporting'} className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-3.5 py-2 text-xs font-bold text-white hover:bg-[#354CE1] disabled:opacity-60">
          {exportState === 'exporting' ? <LoaderCircle className="h-3.5 w-3.5 animate-spin motion-reduce:animate-none" /> : exportState === 'success' ? <Check className="h-3.5 w-3.5" /> : <Download className="h-3.5 w-3.5" />}
          {exportState === 'exporting' ? copy.studio.exporting : exportState === 'success' ? copy.studio.exportSuccess : copy.studio.exportAction}
        </button>
        <button
          type="button"
          aria-label={copy.hideToolbar}
          title={copy.hideToolbar}
          onClick={() => setToolbarVisible(false)}
          className="rounded-lg border border-slate-200 p-2 text-slate-400 transition hover:bg-slate-50 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1]"
        >
          <PanelTopClose className="h-4 w-4" />
        </button>
      </header>

      <section className="border-b border-slate-200 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center gap-2">
          <label className="type-label-compact font-bold text-slate-500">
            {advancedCopy.journey.selectScenario}
            <select value={selectedScenarioId} onChange={(event) => setSelectedScenarioId(event.target.value)} className="type-control-compact ml-2 rounded-lg border border-slate-200 px-2 py-1.5 ">
              <option value="">{advancedCopy.journey.noScenario}</option>
              {project.scenarios.map((scenario) => <option key={scenario.id} value={scenario.id}>{scenario.name}</option>)}
            </select>
          </label>
          <button type="button" onClick={runPreview} className="type-control-compact inline-flex items-center gap-1.5 rounded-lg bg-[#EEF0FF] px-2.5 py-1.5 font-bold text-[#354CE1]"><Play className="h-3 w-3" />{advancedCopy.journey.runPreview}</button>
          {journey && (
            <>
              <button type="button" aria-label={advancedCopy.journey.previousStep} title={advancedCopy.journey.previousStep} disabled={journeyIndex === 0} onClick={() => setJourneyIndex((value) => Math.max(0, value - 1))} className="rounded-lg border border-slate-200 p-1.5 text-slate-500 disabled:opacity-30"><ChevronLeft className="h-3.5 w-3.5" /></button>
              <span className="type-label-compact font-bold text-slate-500">{journeyIndex + 1}/{journey.steps.length}</span>
              <button type="button" aria-label={advancedCopy.journey.nextStep} title={advancedCopy.journey.nextStep} disabled={journeyIndex >= journey.steps.length - 1} onClick={() => setJourneyIndex((value) => Math.min(journey.steps.length - 1, value + 1))} className="rounded-lg border border-slate-200 p-1.5 text-slate-500 disabled:opacity-30"><ChevronRight className="h-3.5 w-3.5" /></button>
              <button type="button" onClick={() => setAutoplay((value) => !value)} className="type-control-compact inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 font-bold text-slate-600">{autoplay ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}{autoplay ? advancedCopy.journey.pause : advancedCopy.journey.autoplay}</button>
              <span className="type-label-compact ml-auto rounded-lg bg-slate-100 px-2 py-1 font-bold text-slate-500">{scenarioLabel(selectedScenario, advancedCopy)}</span>
            </>
          )}
        </div>
      </section>
        </>
      )}

      <main className={`grid min-h-0 flex-1 xl:h-full xl:overflow-hidden ${
 screensPanelVisible && editorPanelVisible
 ? 'xl:grid-cols-[260px_minmax(440px,1fr)_360px]'
 : screensPanelVisible
 ? 'xl:grid-cols-[260px_minmax(440px,1fr)]'
 : editorPanelVisible
 ? 'xl:grid-cols-[minmax(440px,1fr)_360px]'
 : 'xl:grid-cols-1'
 }`}>
        {screensPanelVisible && (
          <aside className="sidebar-scrollbar min-h-0 max-h-[42dvh] overflow-y-auto overscroll-contain border-b border-slate-200 bg-white p-4 xl:h-full xl:max-h-none xl:border-b-0 xl:border-r">
          <div className="flex items-center gap-2">
            <p className="type-label-compact min-w-0 flex-1 font-bold uppercase text-slate-400">{copy.studio.screens}</p>
            <button
              type="button"
              aria-label={copy.hideLeftPanel}
              title={copy.hideLeftPanel}
              onClick={() => setScreensPanelVisible(false)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1]"
            >
              <PanelLeftClose className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-3 space-y-2">
            {seeded.screens.map((screen) => (
              <button key={screen.id} type="button" onClick={() => { setSelectedScreenId(screen.id); setSelectedVariantId(screen.variants[0]?.id ?? ''); }} className={`w-full rounded-xl border px-3 py-2.5 text-left ${selectedScreen?.id === screen.id ? 'border-[#354CE1] bg-[#F6F7FF]' : 'border-slate-200 hover:bg-slate-50'}`}>
                <span className="type-label-compact block font-bold text-slate-800">{localizedScreenName(screen, project, workspace, copy)}</span>
                <span className="type-label-compact mt-1 block font-semibold uppercase text-slate-400">{screen.kind}</span>
              </button>
            ))}
          </div>
          {selectedScreen && (
            <div className="mt-5 border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between">
                <p className="type-label-compact font-bold uppercase text-slate-400">{advancedCopy.studio.variants}</p>
                <button type="button" aria-label={advancedCopy.studio.addVariant} title={advancedCopy.studio.addVariant} disabled={Boolean(selectedScreen) && variantContract.states.every((state) => selectedScreen.variants.some((variant) => variant.state === state))} onClick={addVariant} className="rounded-lg p-1 text-[#354CE1] hover:bg-[#EEF0FF] disabled:opacity-30"><Plus className="h-3.5 w-3.5" /></button>
              </div>
              <div className="mt-2 space-y-1.5">
                {selectedScreen.variants.map((variant) => (
                  <button key={variant.id} type="button" onClick={() => setSelectedVariantId(variant.id)} className={`type-control-compact flex w-full items-center justify-between rounded-lg px-2.5 py-2 font-bold ${selectedVariant?.id === variant.id ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <span>{advancedCopy.variantStates[variant.state]}</span>
                    <span className="opacity-50">{variant.outcomes.length}</span>
                  </button>
                ))}
              </div>
              <button type="button" onClick={removeVariant} disabled={selectedScreen.variants.length <= 1} className="type-control-compact mt-2 inline-flex items-center gap-1 font-bold text-rose-600 disabled:opacity-30"><Trash2 className="h-3 w-3" />{advancedCopy.studio.deleteVariant}</button>
            </div>
          )}
          {seeded.orphanedScreens.length > 0 && (
            <div className="mt-5 border-t border-slate-100 pt-4">
              <p className="type-label-compact font-bold text-amber-700">{copy.studio.orphanedScreens}</p>
              <p className="type-caption mt-1 leading-4 text-slate-400">{copy.studio.orphanedHint}</p>
              {seeded.orphanedScreens.map((screen) => (
                <div key={screen.id} className="mt-2 flex items-center gap-2 rounded-lg bg-amber-50 p-2">
                  <span className="type-technical min-w-0 flex-1 truncate font-mono text-amber-800">{screen.sourceNodeId}</span>
                  <button type="button" aria-label={copy.studio.removeOrphan} title={copy.studio.removeOrphan} onClick={() => updateManifest({ ...seeded, orphanedScreens: seeded.orphanedScreens.filter((candidate) => candidate.id !== screen.id) }, true)} className="rounded p-1 text-amber-700 hover:bg-white"><Trash2 className="h-3 w-3" /></button>
                </div>
              ))}
            </div>
          )}
        </aside>
        )}

        <section className="relative flex min-h-[520px] items-center justify-center overflow-auto bg-[radial-gradient(circle_at_center,#ffffff_0,#f1f5f9_72%)] p-5 sm:p-8 xl:h-full xl:min-h-0">
          {(!toolbarVisible || !screensPanelVisible || !editorPanelVisible) && (
            <div className="absolute right-4 top-4 z-20 flex items-center gap-1 rounded-xl border border-slate-200 bg-white/95 p-1.5 shadow-lg shadow-slate-900/10 backdrop-blur">
              {!screensPanelVisible && (
                <button
                  type="button"
                  aria-label={copy.showLeftPanel}
                  title={copy.showLeftPanel}
                  onClick={() => setScreensPanelVisible(true)}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1]"
                >
                  <PanelLeftOpen className="h-4 w-4" />
                </button>
              )}
              {!toolbarVisible && (
                <button
                  type="button"
                  aria-label={copy.showToolbar}
                  title={copy.showToolbar}
                  onClick={() => setToolbarVisible(true)}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1]"
                >
                  <PanelTopOpen className="h-4 w-4" />
                </button>
              )}
              {!editorPanelVisible && (
                <button
                  type="button"
                  aria-label={copy.showRightPanel}
                  title={copy.showRightPanel}
                  onClick={() => setEditorPanelVisible(true)}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1]"
                >
                  <PanelRightOpen className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
          <div className={`w-full ${deviceWidth} transition-[max-width] duration-300 motion-reduce:transition-none`}>
            <div className="mb-3 flex items-center justify-center gap-2">
              <button type="button" aria-label={advancedCopy.theme.lightMode} title={advancedCopy.theme.lightMode} onClick={() => setPreviewTheme('light')} className={`rounded-lg p-1.5 ${previewTheme === 'light' ? 'bg-white text-[#354CE1] shadow' : 'text-slate-400'}`}><Sun className="h-3.5 w-3.5" /></button>
              <button type="button" aria-label={advancedCopy.theme.darkMode} title={advancedCopy.theme.darkMode} onClick={() => setPreviewTheme('dark')} className={`rounded-lg p-1.5 ${previewTheme === 'dark' ? 'bg-slate-900 text-white shadow' : 'text-slate-400'}`}><Moon className="h-3.5 w-3.5" /></button>
              <select aria-label={advancedCopy.localization.previewLocale} value={previewLocale} onChange={(event) => setPreviewLocale(event.target.value as Locale)} className="type-control-compact rounded-lg border border-slate-200 bg-white px-2 py-1.5 font-bold">
                {seeded.enabledLocales.map((locale) => <option key={locale} value={locale}>{locale.toUpperCase()}</option>)}
              </select>
            </div>
            <div aria-label={advancedCopy.aria.previewFrame} className="min-h-[500px] overflow-hidden border shadow-2xl shadow-slate-300/40" style={{ ...previewStyle, borderColor: colors.border, borderRadius: responsiveInterface.borderRadius }}>
              <div className="h-1.5" style={{ backgroundColor: colors.border }}><div className="h-full" style={{ width: `${journey ? ((journeyIndex + 1) / Math.max(1, journey.steps.length)) * 100 : 18}%`, backgroundColor: colors.primary }} /></div>
              <div className="flex items-center justify-between border-b px-6 py-4" style={{ borderColor: colors.border, backgroundColor: colors.surface }}>
                <img src={previewTheme === 'dark' && seeded.theme.branding.logoDarkUrl ? seeded.theme.branding.logoDarkUrl : seeded.theme.branding.logoLightUrl || identraLogo} alt={copy.brandAlt} className="h-5 max-w-[132px] object-contain object-left" />
                <span className="type-label-compact font-bold uppercase " style={{ color: colors.textMuted }}>{copy.studio.secureSession}</span>
              </div>
              <div
                className="mx-auto flex min-h-[420px] max-w-2xl items-center px-5 py-8 sm:px-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 90% 8%, ${colors.primary}12, transparent 42%)`,
                  paddingTop: Math.max(32, seeded.theme.safeAreas[previewDevice].top),
                  paddingRight: Math.max(20, seeded.theme.safeAreas[previewDevice].right),
                  paddingBottom: Math.max(32, seeded.theme.safeAreas[previewDevice].bottom),
                  paddingLeft: Math.max(20, seeded.theme.safeAreas[previewDevice].left),
                }}
              >
                <div
                  className="flex w-full flex-col rounded-3xl border p-6 sm:p-8"
                  style={{
                    gap: `${20 * responsiveInterface.spacingScale}px`,
                    backgroundColor: responsiveInterface.layout === 'fullscreen'
                      ? 'transparent'
                      : colors.surface,
                    borderColor: responsiveInterface.layout === 'fullscreen'
                      ? 'transparent'
                      : colors.border,
                    boxShadow: seeded.theme.elevation === 'none'
                      ? 'none'
                      : seeded.theme.elevation === 'raised'
                        ? '0 28px 70px rgba(15,23,42,.18)'
                        : '0 20px 50px rgba(15,23,42,.10)',
                    borderRadius: responsiveInterface.borderRadius,
                    maxWidth:
                      responsiveInterface.layout === 'split'
                      && previewDevice !== 'mobile'
                        ? '58%'
                        : responsiveInterface.layout === 'card'
                          ? '580px'
                          : '100%',
                    marginLeft:
                      responsiveInterface.layout === 'split'
                      && previewDevice !== 'mobile'
                        ? 'auto'
                        : undefined,
                  }}
                >
                  {selectedVariant ? selectedVariant.blocks.map((block) => (
                    <PreviewBlock
                      key={block.id}
                      block={block}
                      locale={previewLocale}
                      defaultLocale={seeded.defaultLocale}
                      colors={colors}
                      theme={previewSemanticTheme}
                      copy={advancedCopy}
                      simulation={simulation}
                      dynamicContentContext={dynamicContentContext}
                    />
                  )) : <p className="text-center text-sm opacity-50">{advancedCopy.journey.noResultDescription}</p>}
                </div>
              </div>
              <div className="type-caption border-t px-6 py-3 text-center " style={{ borderColor: colors.border, color: colors.textMuted }}>{copy.studio.poweredBy}</div>
            </div>
          </div>
        </section>

        {editorPanelVisible && (
          <aside className="sidebar-scrollbar min-h-0 max-h-[42dvh] overflow-y-auto overscroll-contain border-t border-slate-200 bg-white xl:h-full xl:max-h-none xl:border-l xl:border-t-0">
          <div className="flex items-center border-b border-slate-200 pr-2">
            <div role="tablist" className="grid min-w-0 flex-1 grid-cols-5 p-2">
            {([
              ['blocks', Layers3, advancedCopy.blocks.title],
              ['localization', Type, advancedCopy.localization.title],
              ['theme', Palette, advancedCopy.theme.title],
              ['regression', ScanLine, advancedCopy.visualRegression.title],
              ['accessibility', Accessibility, advancedCopy.accessibility.title],
            ] as const).map(([tab, Icon, label]) => (
              <button key={tab} type="button" role="tab" aria-selected={studioTab === tab} aria-label={label} title={label} onClick={() => setStudioTab(tab)} className={`flex items-center justify-center rounded-lg p-2 ${studioTab === tab ? 'bg-[#EEF0FF] text-[#354CE1]' : 'text-slate-400 hover:bg-slate-50'}`}><Icon className="h-4 w-4" /></button>
            ))}
            </div>
            <button
              type="button"
              aria-label={copy.hideRightPanel}
              title={copy.hideRightPanel}
              onClick={() => setEditorPanelVisible(false)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1]"
            >
              <PanelRightClose className="h-4 w-4" />
            </button>
          </div>
          <div className="p-4">
            {studioTab === 'blocks' && selectedVariant && (
              <div>
                <div className="flex items-center gap-2">
                  <div className="mr-auto">
                    <h2 className="type-card-title-sm text-slate-900">{advancedCopy.blocks.title}</h2>
                    <p className="type-caption mt-1 text-slate-400">{advancedCopy.variantStates[selectedVariant.state]}</p>
                  </div>
                  <select aria-label={advancedCopy.blocks.addBlock} defaultValue="" onChange={(event) => { if (!event.target.value) return; const block = createBlock(event.target.value as InterfaceBlock['kind'], editingLocale); updateSelectedVariant((variant) => ({ ...variant, blocks: interfaceBlockReducer({ blocks: variant.blocks }, { type: 'add', block }).blocks })); event.target.value = ''; }} className="type-control-compact max-w-36 rounded-lg border border-slate-200 px-2 py-1.5 font-bold">
                    <option value="">{advancedCopy.blocks.addBlock}</option>
                    {BLOCK_KINDS.map((kind) => <option key={kind} value={kind}>{advancedCopy.blockTypes[kind]}</option>)}
                  </select>
                </div>
                <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <label className="type-label-compact block font-bold text-slate-500">
                    {advancedCopy.studio.variantState}
                    <select
                      value={selectedVariant.state}
                      onChange={(event) => updateSelectedVariant((variant) => ({
                        ...variant,
                        state: event.target.value as InterfaceVariantState,
                      }))}
                      className="type-control-compact mt-1 w-full rounded-lg border border-slate-200 bg-white px-2 py-2 "
                    >
                      {variantContract.states.map((state) => (
                        <option key={state} value={state}>
                          {advancedCopy.variantStates[state]}
                        </option>
                      ))}
                    </select>
                  </label>
                  {variantContract.outcomes.length > 0 && (
                    <div className="mt-3">
                      <p className="type-label-compact font-bold text-slate-500">
                        {advancedCopy.studio.linkedOutcomes}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {variantContract.outcomes.map((outcome) => {
                          const selected = selectedVariant.outcomes.includes(outcome);
                          return (
                            <label
                              key={outcome}
                              className={`type-label-compact rounded-lg border px-2 py-1 font-bold ${
 selected
 ? 'border-[#354CE1] bg-[#EEF0FF] text-[#354CE1]'
 : 'border-slate-200 bg-white text-slate-400'
 }`}
                            >
                              <input
                                type="checkbox"
                                checked={selected}
                                onChange={() => updateSelectedVariant((variant) => ({
                                  ...variant,
                                  outcomes: selected
                                    ? variant.outcomes.filter((item) => item !== outcome)
                                    : [...variant.outcomes, outcome],
                                }))}
                                className="sr-only"
                              />
                              {copy.outcomes[
                                outcome as keyof typeof copy.outcomes
                              ] ?? outcome}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-3 space-y-3">
                  {selectedVariant.blocks.map((block, index) => <BlockEditor key={block.id} block={block} index={index} total={selectedVariant.blocks.length} locale={editingLocale} defaultLocale={seeded.defaultLocale} copy={advancedCopy} visibilityOptions={visibilityOptions} dynamicContentOptions={dynamicContentOptions} onUpdate={updateBlock} onAction={blockAction} />)}
                </div>
              </div>
            )}
            {studioTab === 'localization' && (
              <div className="space-y-5">
                <div>
                  <h2 className="type-card-title-sm text-slate-900">{advancedCopy.localization.title}</h2>
                  <label className="type-label-compact mt-3 block font-bold text-slate-500">{advancedCopy.localization.defaultLocale}<select value={seeded.defaultLocale} onChange={(event) => { const locale = event.target.value as Locale; updateManifest({ ...seeded, defaultLocale: locale, enabledLocales: seeded.enabledLocales.includes(locale) ? seeded.enabledLocales : [...seeded.enabledLocales, locale] }); }} className="type-control-compact mt-1 w-full rounded-lg border border-slate-200 px-2 py-2 ">{SUPPORTED_LOCALES.map((locale) => <option key={locale} value={locale}>{locale.toUpperCase()}</option>)}</select></label>
                </div>
                <div>
                  <p className="type-label-compact font-bold text-slate-500">{advancedCopy.localization.enabledLocales}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {SUPPORTED_LOCALES.map((locale) => {
                      const enabled = seeded.enabledLocales.includes(locale);
                      return <label key={locale} className={`type-label-compact rounded-lg border px-2 py-1.5 font-bold ${enabled ? 'border-[#354CE1] bg-[#F6F7FF] text-[#354CE1]' : 'border-slate-200 text-slate-400'}`}><input type="checkbox" checked={enabled} disabled={locale === seeded.defaultLocale} onChange={() => updateManifest({ ...seeded, enabledLocales: enabled ? seeded.enabledLocales.filter((item) => item !== locale) : [...seeded.enabledLocales, locale], contentLocaleReviewRequired: true })} className="sr-only" />{locale.toUpperCase()}</label>;
                    })}
                  </div>
                </div>
                <label className="type-label-compact block font-bold text-slate-500">{advancedCopy.blocks.content}<select value={editingLocale} onChange={(event) => setEditingLocale(event.target.value as Locale)} className="type-control-compact mt-1 w-full rounded-lg border border-slate-200 px-2 py-2 ">{seeded.enabledLocales.map((locale) => <option key={locale} value={locale}>{locale.toUpperCase()}</option>)}</select></label>
                {seeded.contentLocaleReviewRequired && <p className="type-label-compact rounded-xl border border-amber-200 bg-amber-50 p-3 font-semibold leading-4 text-amber-800">{advancedCopy.localization.reviewRequired}</p>}
              </div>
            )}
            {studioTab === 'theme' && (
              <div className="space-y-5">
                <div>
                  <h2 className="type-card-title-sm text-slate-900">{advancedCopy.theme.title}</h2>
                  <label className="type-label-compact mt-3 block font-bold text-slate-500">{copy.studio.layout}<select value={seeded.layout} onChange={(event) => updateManifest({ ...seeded, layout: event.target.value as typeof seeded.layout })} className="type-control-compact mt-1 w-full rounded-lg border border-slate-200 px-2 py-2 "><option value="card">{copy.studio.cardLayout}</option><option value="split">{copy.studio.splitLayout}</option><option value="fullscreen">{copy.studio.fullscreenLayout}</option></select></label>
                </div>
                <div className="rounded-xl border border-slate-200 p-3">
                  <div className="flex items-start gap-2">
                    <FileInput className="mt-0.5 h-4 w-4 shrink-0 text-[#354CE1]" />
                    <div className="min-w-0 flex-1">
                      <p className="type-label-compact font-bold text-slate-900">
                        {advancedCopy.designSystem.title}
                      </p>
                      <p className="type-caption mt-1 leading-4 text-slate-500">
                        {advancedCopy.designSystem.description}
                      </p>
                    </div>
                  </div>
                  {seeded.designSystem && (
                    <div className="mt-3 rounded-lg bg-emerald-50 px-2.5 py-2">
                      <p className="type-label-compact font-bold text-emerald-800">
                        {advancedCopy.designSystem.current}
                      </p>
                      <p className="type-technical mt-0.5 truncate font-mono text-emerald-700">
                        {designSystemVersionLabel(
                          seeded.designSystem.name,
                          seeded.designSystem.version,
                        )}
                      </p>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setDesignSystemImportOpen((value) => !value);
                      setDesignSystemApplied(false);
                    }}
                    className="type-control-compact mt-3 inline-flex items-center gap-1.5 rounded-lg bg-slate-950 px-2.5 py-2 font-bold text-white"
                  >
                    <FileInput className="h-3.5 w-3.5" />
                    {advancedCopy.designSystem.importAction}
                  </button>
                  {designSystemImportOpen && (
                    <div className="mt-3 space-y-2 border-t border-slate-100 pt-3">
                      <div className="flex items-center justify-between gap-2">
                        <label htmlFor="design-system-manifest" className="type-label-compact font-bold text-slate-600">
                          {advancedCopy.designSystem.manifestJson}
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setDesignSystemSource(DESIGN_SYSTEM_EXAMPLE);
                            setDesignSystemApplied(false);
                          }}
                          className="type-label-compact font-bold text-[#354CE1]"
                        >
                          {advancedCopy.designSystem.loadExample}
                        </button>
                      </div>
                      <input
                        type="file"
                        accept=".json,application/json"
                        aria-label={advancedCopy.designSystem.importAction}
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (!file) return;
                          void file.text().then((content) => {
                            setDesignSystemSource(content);
                            setDesignSystemApplied(false);
                          }).catch(() => {
                            setDesignSystemSource('INVALID_JSON_FILE');
                            setDesignSystemApplied(false);
                          });
                        }}
                        className="type-caption w-full rounded-lg border border-dashed border-slate-200 px-2 py-2 text-slate-500 file:mr-2 file:rounded-md file:border-0 file:bg-slate-100 file:px-2 file:py-1 file:font-bold file:text-slate-700"
                      />
                      <textarea
                        id="design-system-manifest"
                        rows={10}
                        value={designSystemSource}
                        onChange={(event) => {
                          setDesignSystemSource(event.target.value);
                          setDesignSystemApplied(false);
                        }}
                        spellCheck={false}
                        className="type-technical w-full resize-y rounded-lg border border-slate-200 bg-slate-950 px-2.5 py-2 font-mono leading-4 text-slate-100 outline-none focus:border-[#354CE1]"
                      />
                      <p className="type-caption leading-4 text-slate-500">
                        {advancedCopy.designSystem.safeNotice}
                      </p>
                      {designSystemImportResult && (
                        <div className={`rounded-lg border p-2.5 ${
                          designSystemImportResult.ok
                            ? 'border-emerald-200 bg-emerald-50'
                            : 'border-rose-200 bg-rose-50'
                        }`}>
                          <p className={`type-label-compact flex items-center gap-1.5 font-bold ${
                            designSystemImportResult.ok
                              ? 'text-emerald-800'
                              : 'text-rose-700'
                          }`}>
                            {designSystemImportResult.ok && <ShieldCheck className="h-3.5 w-3.5" />}
                            {designSystemImportResult.ok
                              ? advancedCopy.designSystem.valid
                              : advancedCopy.designSystem.invalid}
                          </p>
                          {designSystemImportResult.ok ? (
                            <p className="type-caption mt-1 text-emerald-700">
                              {designSystemTokenSummary(
                                designSystemImportResult.manifest.name,
                                designSystemImportResult.manifest.version,
                                advancedCopy.designSystem.tokenSummary,
                                Object.keys(
                                  designSystemImportResult.manifest.theme,
                                ).length,
                              )}
                            </p>
                          ) : (
                            <div className="mt-1 max-h-24 overflow-y-auto">
                              {designSystemImportResult.issues.map((issue, index) => (
                                <p key={`${issue.code}-${issue.path}-${index}`} className="type-technical font-mono text-rose-700">
                                  {issue.path}: {issue.code}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                      {designSystemApplied && (
                        <p className="type-label-compact rounded-lg bg-emerald-50 px-2.5 py-2 font-bold text-emerald-700">
                          {advancedCopy.designSystem.imported}
                        </p>
                      )}
                      <button
                        type="button"
                        disabled={!designSystemImportResult?.ok}
                        onClick={applyImportedDesignSystem}
                        className="type-control-compact w-full rounded-lg bg-[#354CE1] px-3 py-2 font-bold text-white disabled:opacity-40"
                      >
                        {advancedCopy.designSystem.apply}
                      </button>
                    </div>
                  )}
                </div>
                <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-3">
                  <label className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      checked={Boolean(activeResponsiveOverride)}
                      onChange={(event) => updateResponsiveOverride(
                        event.target.checked
                          ? { ...responsiveInterface }
                          : undefined,
                      )}
                      className="mt-0.5 accent-[#354CE1]"
                    />
                    <span>
                      <span className="type-label-compact block font-bold text-indigo-900">
                        {advancedCopy.theme.responsiveOverrides} · {advancedCopy.theme[previewDevice]}
                      </span>
                      <span className="type-caption mt-0.5 block leading-4 text-indigo-700/70">
                        {advancedCopy.theme.responsiveHint}
                      </span>
                    </span>
                  </label>
                  {activeResponsiveOverride && (
                    <div className="mt-3 space-y-3 border-t border-indigo-100 pt-3">
                      <label className="type-label-compact block font-bold text-indigo-800">
                        {copy.studio.layout}
                        <select
                          value={responsiveInterface.layout}
                          onChange={(event) => updateResponsiveOverride({
                            ...activeResponsiveOverride,
                            layout: event.target.value as typeof responsiveInterface.layout,
                          })}
                          className="type-control-compact mt-1 w-full rounded-lg border border-indigo-100 bg-white px-2 py-2 text-slate-700"
                        >
                          <option value="card">{copy.studio.cardLayout}</option>
                          <option value="split">{copy.studio.splitLayout}</option>
                          <option value="fullscreen">{copy.studio.fullscreenLayout}</option>
                        </select>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {([
                          ['spacingScale', responsiveInterface.spacingScale, 0.5, 2, 0.05],
                          ['borderRadius', responsiveInterface.borderRadius, 0, 64, 1],
                          ['headingScale', responsiveInterface.headingScale, 0.75, 2, 0.05],
                          ['bodyScale', responsiveInterface.bodyScale, 0.75, 2, 0.05],
                        ] as const).map(([key, value, min, max, step]) => (
                          <label key={key}>
                            <span className="type-technical block truncate font-mono text-indigo-600">
                              {key}
                            </span>
                            <input
                              type="number"
                              min={min}
                              max={max}
                              step={step}
                              value={value}
                              onChange={(event) => updateResponsiveOverride({
                                ...activeResponsiveOverride,
                                [key]: Number(event.target.value),
                              })}
                              className="type-control-compact mt-1 w-full rounded-lg border border-indigo-100 bg-white px-2 py-1.5 text-slate-700"
                            />
                          </label>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => updateResponsiveOverride(undefined)}
                        className="type-control-compact font-bold text-indigo-700 hover:text-indigo-950"
                      >
                        {advancedCopy.theme.resetOverride}
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <p className="type-label-compact font-bold text-slate-500">{advancedCopy.theme.semanticColors} · {previewTheme === 'light' ? advancedCopy.theme.lightMode : advancedCopy.theme.darkMode}</p>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {(Object.keys(colors) as (keyof SemanticColorTokens)[]).map((key) => <label key={key} className="rounded-lg border border-slate-200 p-2"><span className="type-technical block truncate font-mono text-slate-500">{key}</span><input type="color" value={colors[key]} onChange={(event) => updateManifest({ ...seeded, theme: { ...seeded.theme, [previewTheme]: { ...colors, [key]: event.target.value } } })} className="mt-1 h-7 w-full cursor-pointer rounded border-0 bg-transparent" /></label>)}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <label className="type-label-compact font-bold text-slate-500">{copy.studio.radius}<input type="number" min={0} max={40} value={seeded.theme.borderRadius} onChange={(event) => updateManifest({ ...seeded, theme: { ...seeded.theme, borderRadius: Number(event.target.value) } })} className="type-control-compact mt-1 w-full rounded-lg border border-slate-200 px-2 py-2 " /></label>
                  <label className="type-label-compact font-bold text-slate-500">{advancedCopy.theme.controls}<input type="number" min={36} max={64} value={seeded.theme.controls.height} onChange={(event) => updateManifest({ ...seeded, theme: { ...seeded.theme, controls: { ...seeded.theme.controls, height: Number(event.target.value) } } })} className="type-control-compact mt-1 w-full rounded-lg border border-slate-200 px-2 py-2 " /></label>
                </div>
                <div>
                  <p className="type-label-compact font-bold text-slate-500">
                    {advancedCopy.theme.typography}
                  </p>
                  <label className="mt-2 block">
                    <span className="sr-only">{copy.studio.fontFamily}</span>
                    <input
                      value={seeded.theme.typography.fontFamily}
                      onChange={(event) => updateManifest({
                        ...seeded,
                        theme: {
                          ...seeded.theme,
                          typography: {
                            ...seeded.theme.typography,
                            fontFamily: event.target.value,
                          },
                        },
                      })}
                      className="type-control-compact w-full rounded-lg border border-slate-200 px-2 py-2 "
                    />
                  </label>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {([
                      ['headingScale', seeded.theme.typography.headingScale],
                      ['bodyScale', seeded.theme.typography.bodyScale],
                      ['lineHeight', seeded.theme.typography.lineHeight],
                    ] as const).map(([key, value]) => (
                      <label key={key}>
                        <span className="type-technical block truncate font-mono text-slate-400">
                          {key}
                        </span>
                        <input
                          type="number"
                          min={0.75}
                          max={2}
                          step={0.05}
                          value={value}
                          onChange={(event) => updateManifest({
                            ...seeded,
                            theme: {
                              ...seeded.theme,
                              typography: {
                                ...seeded.theme.typography,
                                [key]: Number(event.target.value),
                              },
                            },
                          })}
                          className="type-control-compact mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 "
                        />
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="type-label-compact font-bold text-slate-500">
                    {advancedCopy.theme.controls}
                  </p>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {([
                      ['height', seeded.theme.controls.height],
                      ['radius', seeded.theme.controls.radius],
                      ['borderWidth', seeded.theme.controls.borderWidth],
                    ] as const).map(([key, value]) => (
                      <label key={key}>
                        <span className="type-technical block truncate font-mono text-slate-400">
                          {key}
                        </span>
                        <input
                          type="number"
                          min={key === 'height' ? 36 : 0}
                          max={key === 'height' ? 64 : 24}
                          value={value}
                          onChange={(event) => updateManifest({
                            ...seeded,
                            theme: {
                              ...seeded.theme,
                              controls: {
                                ...seeded.theme.controls,
                                [key]: Number(event.target.value),
                              },
                            },
                          })}
                          className="type-control-compact mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 "
                        />
                      </label>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <label className="type-label-compact font-bold text-slate-500">
                    {copy.studio.spacing}
                    <input
                      type="number"
                      min={0.5}
                      max={2}
                      step={0.05}
                      value={seeded.theme.spacingScale}
                      onChange={(event) => updateManifest({
                        ...seeded,
                        theme: {
                          ...seeded.theme,
                          spacingScale: Number(event.target.value),
                        },
                      })}
                      className="type-control-compact mt-1 w-full rounded-lg border border-slate-200 px-2 py-2 "
                    />
                  </label>
                  <label className="type-label-compact font-bold text-slate-500">
                    {advancedCopy.theme.elevation}
                    <select
                      value={seeded.theme.elevation}
                      onChange={(event) => updateManifest({
                        ...seeded,
                        theme: {
                          ...seeded.theme,
                          elevation: event.target.value as SemanticTheme['elevation'],
                        },
                      })}
                      className="type-control-compact mt-1 w-full rounded-lg border border-slate-200 px-2 py-2 "
                    >
                      <option value="none">none</option>
                      <option value="soft">soft</option>
                      <option value="raised">raised</option>
                    </select>
                  </label>
                </div>
                <label className="type-label-compact block font-bold text-slate-500">
                  {advancedCopy.theme.iconStyle}
                  <select
                    value={seeded.theme.iconStyle}
                    onChange={(event) => updateManifest({
                      ...seeded,
                      theme: {
                        ...seeded.theme,
                        iconStyle: event.target.value as SemanticTheme['iconStyle'],
                      },
                    })}
                    className="type-control-compact mt-1 w-full rounded-lg border border-slate-200 px-2 py-2 "
                  >
                    <option value="outline">outline</option>
                    <option value="filled">filled</option>
                    <option value="rounded">rounded</option>
                  </select>
                </label>
                <label className="type-label-compact block font-bold text-slate-500">{advancedCopy.theme.motion}<select value={seeded.theme.motion} onChange={(event) => updateManifest({ ...seeded, theme: { ...seeded.theme, motion: event.target.value as SemanticTheme['motion'] } })} className="type-control-compact mt-1 w-full rounded-lg border border-slate-200 px-2 py-2 "><option value="standard">{advancedCopy.theme.standardMotion}</option><option value="reduced">{advancedCopy.theme.reducedMotion}</option></select></label>
                <div>
                  <p className="type-label-compact font-bold text-slate-500">
                    {advancedCopy.theme.safeArea} · {advancedCopy.theme[previewDevice]}
                  </p>
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {(['top', 'right', 'bottom', 'left'] as const).map((key) => (
                      <label key={key}>
                        <span className="type-technical block font-mono text-slate-400">
                          {key}
                        </span>
                        <input
                          type="number"
                          min={0}
                          max={120}
                          value={seeded.theme.safeAreas[previewDevice][key]}
                          onChange={(event) => updateManifest({
                            ...seeded,
                            theme: {
                              ...seeded.theme,
                              safeAreas: {
                                ...seeded.theme.safeAreas,
                                [previewDevice]: {
                                  ...seeded.theme.safeAreas[previewDevice],
                                  [key]: Number(event.target.value),
                                },
                              },
                            },
                          })}
                          className="type-control-compact mt-1 w-full rounded-lg border border-slate-200 px-1 py-1.5 "
                        />
                      </label>
                    ))}
                  </div>
                </div>
                {(['logoLightUrl', 'logoDarkUrl', 'faviconUrl'] as const).map((key) => <label key={key} className="type-label-compact block font-bold text-slate-500">{key === 'logoLightUrl' ? advancedCopy.theme.logoLight : key === 'logoDarkUrl' ? advancedCopy.theme.logoDark : advancedCopy.theme.favicon}<input value={seeded.theme.branding[key]} onChange={(event) => updateManifest({ ...seeded, theme: { ...seeded.theme, branding: { ...seeded.theme.branding, [key]: event.target.value } } })} placeholder="https://" className="type-control-compact mt-1 w-full rounded-lg border border-slate-200 px-2 py-2 " /></label>)}
              </div>
            )}
            {studioTab === 'regression' && (
              <div className="space-y-4">
                <div>
                  <h2 className="type-card-title-sm text-slate-900">
                    {advancedCopy.visualRegression.title}
                  </h2>
                  <p className="type-caption mt-1 leading-4 text-slate-500">
                    {advancedCopy.visualRegression.description}
                  </p>
                </div>
                <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-3">
                  <p className="type-label-compact font-bold text-indigo-900">
                    {advancedCopy.visualRegression.currentContext}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {[
                      selectedScreen?.kind ?? 'screen',
                      selectedVariant?.state ?? 'variant',
                      previewDevice,
                      previewTheme,
                      previewLocale.toUpperCase(),
                    ].map((item) => (
                      <span key={item} className="type-technical rounded bg-white px-1.5 py-1 font-mono text-indigo-700">
                        {item}
                      </span>
                    ))}
                  </div>
                  {currentVisualComparison && (
                    <div className={`mt-3 rounded-lg border px-2.5 py-2 ${
                      currentVisualComparison.status === 'passed'
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                        : currentVisualComparison.status === 'changed'
                          ? 'border-amber-200 bg-amber-50 text-amber-800'
                          : 'border-rose-200 bg-rose-50 text-rose-700'
                    }`}>
                      <p className="type-label-compact font-bold">
                        {currentVisualComparison.status === 'passed'
                          ? advancedCopy.visualRegression.passed
                          : currentVisualComparison.status === 'changed'
                            ? advancedCopy.visualRegression.changed
                            : advancedCopy.visualRegression.missing}
                      </p>
                      {currentVisualComparison.status === 'changed' && (
                        <p className="type-caption mt-1">
                          {currentVisualComparison.changedChannels.map(
                            (channel) => visualRegressionChannelLabel(
                              channel,
                              advancedCopy,
                            ),
                          ).join(' · ')}
                        </p>
                      )}
                    </div>
                  )}
                  <button
                    type="button"
                    disabled={!selectedScreen || !selectedVariant}
                    onClick={captureVisualBaseline}
                    className="type-control-compact mt-3 w-full rounded-lg bg-[#354CE1] px-3 py-2 font-bold text-white disabled:opacity-40"
                  >
                    {currentVisualBaseline
                      ? advancedCopy.visualRegression.updateBaseline
                      : advancedCopy.visualRegression.createBaseline}
                  </button>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="type-label-compact font-bold text-slate-700">
                    {advancedCopy.visualRegression.baseline} · {visualBaselines.length}
                  </p>
                  <button
                    type="button"
                    disabled={visualBaselines.length === 0}
                    onClick={() => setRegressionHasRun(true)}
                    className="type-label-compact rounded-lg border border-slate-200 px-2 py-1.5 font-bold text-slate-600 disabled:opacity-40"
                  >
                    {advancedCopy.visualRegression.runAll}
                  </button>
                </div>
                {visualRegressionBlocksExport && (
                  <p className="type-label-compact rounded-xl border border-amber-200 bg-amber-50 p-3 font-semibold leading-4 text-amber-800">
                    {advancedCopy.visualRegression.exportBlocked}
                  </p>
                )}
                {visualBaselines.length === 0 ? (
                  <p className="type-caption rounded-xl border border-dashed border-slate-200 p-4 text-center text-slate-400">
                    {advancedCopy.visualRegression.noBaselines}
                  </p>
                ) : (
                  <div className="space-y-2">
                    {visualRegressionResults.map(({ baseline, comparison }) => {
                      const screen = seeded.screens.find(
                        (candidate) => candidate.id === baseline.screenId,
                      );
                      const status = regressionHasRun
                        ? comparison.status
                        : null;
                      return (
                        <div key={baseline.id} className="rounded-xl border border-slate-200 p-3">
                          <div className="flex items-start gap-2">
                            <div className="min-w-0 flex-1">
                              <p className="type-label-compact truncate font-bold text-slate-800">
                                {screen
                                  ? localizedScreenName(
                                      screen,
                                      project,
                                      workspace,
                                      copy,
                                    )
                                  : baseline.screenId}
                              </p>
                              <p className="type-technical mt-1 font-mono text-slate-400">
                                {baseline.breakpoint} · {baseline.themeMode} · {baseline.locale.toUpperCase()}
                              </p>
                            </div>
                            {status && (
                              <span className={`type-label-compact rounded px-1.5 py-1 font-bold ${
                                status === 'passed'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : status === 'changed'
                                    ? 'bg-amber-50 text-amber-800'
                                    : 'bg-rose-50 text-rose-700'
                              }`}>
                                {status === 'passed'
                                  ? advancedCopy.visualRegression.passed
                                  : status === 'changed'
                                    ? advancedCopy.visualRegression.changed
                                    : advancedCopy.visualRegression.missing}
                              </span>
                            )}
                            <button
                              type="button"
                              aria-label={advancedCopy.visualRegression.deleteBaseline}
                              title={advancedCopy.visualRegression.deleteBaseline}
                              onClick={() => deleteVisualBaseline(baseline.id)}
                              className="rounded p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          {status === 'changed' && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {comparison.changedChannels.map((channel) => (
                                <span key={channel} className="type-label-compact rounded bg-amber-50 px-1.5 py-1 font-semibold text-amber-800">
                                  {visualRegressionChannelLabel(channel, advancedCopy)}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
            {studioTab === 'accessibility' && (
              <div>
                <h2 className="type-card-title-sm text-slate-900">{advancedCopy.accessibility.title}</h2>
                <p className="type-caption mt-1 leading-4 text-slate-400">{advancedCopy.accessibility.description}</p>
                <div className={`mt-3 rounded-xl border p-3 ${report.blocksExport ? 'border-rose-200 bg-rose-50' : 'border-emerald-200 bg-emerald-50'}`}>
                  <p className={`type-label-compact font-bold ${report.blocksExport ? 'text-rose-700' : 'text-emerald-700'}`}>{report.blocksExport ? `${report.issues.filter((issue) => issue.severity === 'error').length} ${advancedCopy.accessibility.errors}` : advancedCopy.accessibility.passed}</p>
                </div>
                <div className="mt-3 space-y-2">
                  {report.accessibility.issues.length === 0 ? <p className="type-caption text-slate-400">{advancedCopy.accessibility.noIssues}</p> : report.accessibility.issues.map((issue, index) => <button key={`${issue.code}-${index}`} type="button" onClick={() => { if (issue.screenId) setSelectedScreenId(issue.screenId); if (issue.variantId) setSelectedVariantId(issue.variantId); setStudioTab('blocks'); }} className={`flex w-full items-start gap-2 rounded-xl border p-3 text-left ${issue.severity === 'error' ? 'border-rose-200 bg-rose-50 text-rose-700' : 'border-amber-200 bg-amber-50 text-amber-700'}`}><CircleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" /><span className="type-label-compact font-semibold leading-4">{advancedCopy.accessibilityChecks[issue.code]}</span></button>)}
                </div>
              </div>
            )}
          </div>
        </aside>
        )}
      </main>

      {journey && (
        <details className="border-t border-slate-200 bg-slate-950 px-4 py-3 text-white">
          <summary className="type-control-compact cursor-pointer font-bold uppercase text-slate-300">{advancedCopy.journey.executionLog} · {journey.steps.length}</summary>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label={advancedCopy.aria.journeyTimeline}>
            {journey.steps.map((step, index) => <button key={step.id} type="button" onClick={() => setJourneyIndex(index)} className={`type-control-compact shrink-0 rounded-lg px-3 py-2 font-bold ${journeyIndex === index ? 'bg-[#354CE1] text-white' : 'bg-white/10 text-slate-300'}`}>{index + 1}. {advancedCopy.variantStates[step.state]}</button>)}
          </div>
        </details>
      )}
      {exportState === 'blocked' && <div role="status" className="fixed bottom-5 left-1/2 z-[80] -translate-x-1/2 rounded-xl bg-rose-600 px-4 py-3 text-xs font-bold text-white shadow-2xl">{report.blocksExport ? advancedCopy.accessibility.exportBlocked : copy.studio.exportBlocked}</div>}
      {exportState === 'success' && <div role="status" className="fixed bottom-5 left-1/2 z-[80] flex -translate-x-1/2 items-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-xs font-bold text-white shadow-2xl"><Check className="h-4 w-4" />{copy.studio.exportSuccess}</div>}
    </div>
  );
}
