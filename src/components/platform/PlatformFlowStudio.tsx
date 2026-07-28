/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type DragEvent,
} from 'react';
import {
  Activity,
  AlertCircle,
  ArrowDown,
  ArrowUp,
  BarChart3,
  Building2,
  Check,
  CheckCircle2,
  Clock,
  Code2,
  Database,
  Download,
  FileBadge,
  FileText,
  Fingerprint,
  GitBranch,
  Globe,
  GripVertical,
  Network,
  Play,
  Plus,
  Radio,
  RefreshCw,
  ScanEye,
  ShieldAlert,
  ShieldCheck,
  Shuffle,
  Sliders,
  Trash2,
  Users,
  Webhook,
  X,
  type LucideIcon,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import CodeBlock from '../CodeBlock';
import { useLanguage } from '../../context/LanguageContext';
import { getLocalizedRecord } from '../../utils/i18nRuntime';
import {
  PLATFORM_FLOW_STUDIO_TRANSLATIONS,
  type PlatformFlowStudioStage,
} from '../../translations/platform/PlatformFlowStudioTranslations';
import {
  PLATFORM_FLOW_ACTION_TYPES,
  PLATFORM_FLOW_PRESET_IDS,
  PLATFORM_FLOW_RULE_FIELDS,
  PLATFORM_FLOW_SCENARIO_IDS,
  PLATFORM_FLOW_SIGNAL_IDS,
  PLATFORM_FLOW_STEP_IDS,
  calculatePlatformFlowMetrics,
  createPlatformFlowConfig,
  generatePlatformFlowTypescript,
  getPlatformFlowOperators,
  platformFlowReducer,
  runPlatformFlowSimulation,
  sanitizePlatformFlowFileName,
  serializePlatformFlowConfig,
  validatePlatformFlowConfig,
  type PlatformFlowAction,
  type PlatformFlowActionType,
  type PlatformFlowConfigAction,
  type PlatformFlowExecutionStatus,
  type PlatformFlowGraphNode,
  type PlatformFlowRuleConfig,
  type PlatformFlowRuleField,
  type PlatformFlowRuleOperator,
  type PlatformFlowScenarioId,
  type PlatformFlowSignalId,
  type PlatformFlowSimulationResult,
  type PlatformFlowStepConfig,
  type PlatformFlowStepId,
} from './PlatformFlowStudioModel';

export type { PlatformFlowStudioStage };

interface PlatformFlowStudioProps {
  activeStage: PlatformFlowStudioStage;
  onActiveStageChange: (stage: PlatformFlowStudioStage) => void;
}

type ExportTab = 'typescript' | 'json';
type StudioCopy = typeof PLATFORM_FLOW_STUDIO_TRANSLATIONS.en;

const STAGES: PlatformFlowStudioStage[] = ['collect', 'orchestrate', 'analyze'];

const STAGE_ICONS: Record<PlatformFlowStudioStage, LucideIcon> = {
  collect: GitBranch,
  orchestrate: Shuffle,
  analyze: Network,
};

const STEP_ICONS: Record<PlatformFlowStepId, LucideIcon> = {
  'identity-credential': FileBadge,
  'business-registration-credential': Building2,
  'ownership-match': Users,
  'government-id': FileText,
  'selfie-liveness': ScanEye,
  'database-kyc': Database,
  watchlist: ShieldAlert,
};

const SIGNAL_ICONS: Record<PlatformFlowSignalId, LucideIcon> = {
  'device-fingerprint': Fingerprint,
  'ip-reputation': Globe,
  'behavior-velocity': Activity,
  'graph-links': Network,
};

const ACTION_ICONS: Record<PlatformFlowActionType, LucideIcon> = {
  approve: CheckCircle2,
  'request-step-up': ArrowUp,
  'manual-review': Users,
  reject: ShieldAlert,
  'send-webhook': Webhook,
};

const STATUS_TONES: Record<PlatformFlowExecutionStatus | 'pending' | 'running', string> = {
  passed: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  warning: 'border-amber-200 bg-amber-50 text-amber-700',
  failed: 'border-rose-200 bg-rose-50 text-rose-700',
  skipped: 'border-slate-200 bg-slate-50 text-slate-400',
  pending: 'border-slate-200 bg-white text-slate-400',
  running: 'border-[#354CE1] bg-indigo-50 text-[#354CE1] shadow-sm',
};

const ACTION_TONES: Record<PlatformFlowActionType, string> = {
  approve: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  'request-step-up': 'border-amber-500/30 bg-amber-500/10 text-amber-300',
  'manual-review': 'border-sky-500/30 bg-sky-500/10 text-sky-300',
  reject: 'border-rose-500/30 bg-rose-500/10 text-rose-300',
  'send-webhook': 'border-violet-500/30 bg-violet-500/10 text-violet-300',
};

const CODE_BLOCK_MAX_HEIGHT_CLASS = 'max-h-[55vh]';

const getStageTabId = (stage: PlatformFlowStudioStage) => (
  ['platform-flow-tab', stage].join('-')
);

const getStagePanelId = (stage: PlatformFlowStudioStage) => (
  ['platform-flow-panel', stage].join('-')
);

const getDefaultRuleValue = (field: PlatformFlowRuleField) => {
  if (field === 'risk-score') return 70;
  if (field === 'credential-status') return 'valid';
  if (field === 'watchlist-status') return 'clear';
  return 'trusted';
};

const getDefaultRuleOperator = (
  field: PlatformFlowRuleField,
): PlatformFlowRuleOperator => (
  field === 'risk-score' ? 'greater-than-or-equal' : 'equals'
);

const getRuleValueOptions = (
  copy: StudioCopy,
  field: PlatformFlowRuleField,
) => {
  if (field === 'credential-status') {
    return [
      { value: 'valid', label: copy.values.valid },
      { value: 'invalid', label: copy.values.invalid },
    ];
  }
  if (field === 'watchlist-status') {
    return [
      { value: 'clear', label: copy.values.clear },
      { value: 'hit', label: copy.values.hit },
    ];
  }
  if (field === 'device-trust') {
    return [
      { value: 'trusted', label: copy.values.trusted },
      { value: 'suspicious', label: copy.values.suspicious },
    ];
  }
  return [];
};

const getDisplayValue = (
  copy: StudioCopy,
  field: PlatformFlowRuleField,
  value: number | string,
) => {
  if (typeof value === 'number') return String(value);
  if (value in copy.values) {
    return copy.values[value as keyof typeof copy.values];
  }
  return value;
};

const formatAction = (copy: StudioCopy, action: PlatformFlowAction) => ({
  label: copy.actions[action.type],
  target: action.stepId ? copy.steps[action.stepId].title : null,
});

export default function PlatformFlowStudio({
  activeStage,
  onActiveStageChange,
}: PlatformFlowStudioProps) {
  const { language } = useLanguage();
  const copy = getLocalizedRecord(
    PLATFORM_FLOW_STUDIO_TRANSLATIONS,
    language as keyof typeof PLATFORM_FLOW_STUDIO_TRANSLATIONS,
    'PLATFORM_FLOW_STUDIO_TRANSLATIONS',
  );
  const prefersReducedMotion = useReducedMotion();
  const [config, dispatch] = useReducer(
    platformFlowReducer,
    undefined,
    () => createPlatformFlowConfig('ssi-minimal'),
  );
  const [selectedPreset, setSelectedPreset] = useState<(typeof PLATFORM_FLOW_PRESET_IDS)[number]>('ssi-minimal');
  const [selectedScenario, setSelectedScenario] = useState<PlatformFlowScenarioId>('trusted');
  const [simulationResult, setSimulationResult] = useState<PlatformFlowSimulationResult | null>(null);
  const [simulationStale, setSimulationStale] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeEventIndex, setActiveEventIndex] = useState(-1);
  const [showValidation, setShowValidation] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [exportTab, setExportTab] = useState<ExportTab>('typescript');
  const [draggedStepId, setDraggedStepId] = useState<PlatformFlowStepId | null>(null);
  const [selectedGraphNodeId, setSelectedGraphNodeId] = useState<PlatformFlowGraphNode['id']>('subject');
  const timersRef = useRef<number[]>([]);
  const exportDialogRef = useRef<HTMLDivElement>(null);
  const exportCloseRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const metrics = useMemo(() => calculatePlatformFlowMetrics(config), [config]);
  const validationIssues = useMemo(() => validatePlatformFlowConfig(config), [config]);
  const isConfigValid = validationIssues.length === 0;
  const stepUpSteps = useMemo(
    () => config.verificationSteps.filter((step) => step.mode === 'step-up'),
    [config.verificationSteps],
  );
  const typescriptExport = useMemo(() => generatePlatformFlowTypescript(config), [config]);
  const jsonExport = useMemo(() => serializePlatformFlowConfig(config), [config]);
  const exportExtension = exportTab === 'typescript' ? 'ts' : 'json';
  const exportFileName = [
    sanitizePlatformFlowFileName(config.name),
    exportExtension,
  ].join('.');
  const activeStageTabId = getStageTabId(activeStage);
  const activeStagePanelId = getStagePanelId(activeStage);
  const percentageFormatter = useMemo(
    () => new Intl.NumberFormat(language, { style: 'percent', maximumFractionDigits: 1 }),
    [language],
  );
  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(language, { maximumFractionDigits: 1 }),
    [language],
  );

  const clearSimulationTimers = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  }, []);

  useEffect(() => () => clearSimulationTimers(), [clearSimulationTimers]);

  const invalidateSimulation = useCallback(() => {
    clearSimulationTimers();
    setIsSimulating(false);
    setActiveEventIndex(-1);
    if (simulationResult) setSimulationStale(true);
  }, [clearSimulationTimers, simulationResult]);

  const updateConfig = useCallback((action: PlatformFlowConfigAction) => {
    invalidateSimulation();
    dispatch(action);
  }, [invalidateSimulation]);

  const loadPreset = (presetId: (typeof PLATFORM_FLOW_PRESET_IDS)[number]) => {
    setSelectedPreset(presetId);
    setShowValidation(false);
    invalidateSimulation();
    dispatch({ type: 'load-preset', presetId });
  };

  const handleScenarioChange = (scenarioId: PlatformFlowScenarioId) => {
    clearSimulationTimers();
    setSelectedScenario(scenarioId);
    setSimulationResult(null);
    setSimulationStale(false);
    setIsSimulating(false);
    setActiveEventIndex(-1);
    setSelectedGraphNodeId('subject');
  };

  const handleRunSimulation = () => {
    if (!isConfigValid) {
      setShowValidation(true);
      return;
    }

    clearSimulationTimers();
    const result = runPlatformFlowSimulation(config, selectedScenario);
    const eventCount = result.stepResults.length + result.signalResults.length + 2;
    setSimulationResult(result);
    setSimulationStale(false);
    setSelectedGraphNodeId('subject');

    if (prefersReducedMotion) {
      setActiveEventIndex(eventCount - 1);
      setIsSimulating(false);
      return;
    }

    setIsSimulating(true);
    setActiveEventIndex(0);

    for (let index = 1; index < eventCount; index += 1) {
      timersRef.current.push(window.setTimeout(() => {
        setActiveEventIndex(index);
      }, index * 420));
    }

    timersRef.current.push(window.setTimeout(() => {
      setIsSimulating(false);
    }, eventCount * 420));
  };

  const openExportDialog = () => {
    if (!isConfigValid) {
      setShowValidation(true);
      return;
    }
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    setExportOpen(true);
  };

  const closeExportDialog = useCallback(() => {
    setExportOpen(false);
  }, []);

  useEffect(() => {
    if (!exportOpen) return undefined;

    const focusTimer = window.setTimeout(() => exportCloseRef.current?.focus(), 0);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeExportDialog();
        return;
      }

      if (event.key !== 'Tab' || !exportDialogRef.current) return;
      const focusable = Array.from(
        exportDialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocusedRef.current?.focus();
    };
  }, [closeExportDialog, exportOpen]);

  const handleDownload = () => {
    const isTypescript = exportTab === 'typescript';
    const content = isTypescript ? typescriptExport : jsonExport;
    const extension = isTypescript ? 'ts' : 'json';
    const mimeType = isTypescript ? 'text/typescript;charset=utf-8' : 'application/json;charset=utf-8';
    const fileName = `${sanitizePlatformFlowFileName(config.name)}.${extension}`;
    const url = URL.createObjectURL(new Blob([content], { type: mimeType }));
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const getTimelineStatus = (
    eventIndex: number,
    finalStatus: PlatformFlowExecutionStatus,
  ): PlatformFlowExecutionStatus | 'pending' | 'running' => {
    if (!simulationResult) return 'pending';
    if (!isSimulating) return finalStatus;
    if (eventIndex < activeEventIndex) return finalStatus;
    if (eventIndex === activeEventIndex) return 'running';
    return 'pending';
  };

  const renderStepCard = (
    step: PlatformFlowStepConfig,
    index: number,
  ) => {
    const Icon = STEP_ICONS[step.id];
    const isFirst = index === 0;
    const isLast = index === config.verificationSteps.length - 1;
    const isStepUp = step.mode === 'step-up';

    return (
      <div
        key={step.id}
        draggable
        onDragStart={(event: DragEvent<HTMLDivElement>) => {
          event.dataTransfer.effectAllowed = 'move';
          event.dataTransfer.setData('text/plain', step.id);
          setDraggedStepId(step.id);
        }}
        onDragEnd={() => setDraggedStepId(null)}
        onDragOver={(event) => {
          event.preventDefault();
          event.dataTransfer.dropEffect = 'move';
        }}
        onDrop={(event) => {
          event.preventDefault();
          if (draggedStepId && draggedStepId !== step.id) {
            updateConfig({
              type: 'reorder-step',
              stepId: draggedStepId,
              targetStepId: step.id,
            });
          }
          setDraggedStepId(null);
        }}
        className={`relative rounded-lg border p-4 transition ${
          isStepUp
            ? 'ml-7 border-amber-200 bg-amber-50/70'
            : 'mr-7 border-indigo-200 bg-white'
        } ${draggedStepId === step.id ? 'opacity-50' : ''}`}
      >
        {!isLast && (
          <span
            aria-hidden="true"
            className={`absolute top-full h-4 border-l-2 ${
              isStepUp ? 'left-8 border-dashed border-amber-300' : 'left-8 border-indigo-200'
            }`}
          />
        )}
        {isStepUp && (
          <span
            aria-hidden="true"
            className="absolute right-full top-1/2 w-7 border-t-2 border-dashed border-amber-300"
          />
        )}
        <div className="flex items-start gap-3">
          <button
            type="button"
            className="mt-0.5 inline-flex size-8 shrink-0 cursor-grab items-center justify-center rounded-lg text-slate-400 hover:bg-white hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1]"
            title={copy.dragStep}
            aria-label={copy.dragStep}
          >
            <GripVertical className="size-4" />
          </button>
          <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
            isStepUp ? 'bg-amber-100 text-amber-700' : 'bg-indigo-50 text-[#354CE1]'
          }`}>
            <Icon className="size-4.5" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="type-card-title text-slate-950">{copy.steps[step.id].title}</h3>
            <p className="type-body-sm mt-1 text-slate-500">{copy.steps[step.id].description}</p>
            <label className="type-label mt-3 block text-slate-500">
              <span className="sr-only">{copy.modeLabel}</span>
              <select
                value={step.mode}
                onChange={(event) => updateConfig({
                  type: 'set-step-mode',
                  stepId: step.id,
                  mode: event.target.value as PlatformFlowStepConfig['mode'],
                })}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 outline-none transition focus:border-[#354CE1] focus:ring-2 focus:ring-[#354CE1]/15"
              >
                <option value="always">{copy.modeAlways}</option>
                <option value="step-up">{copy.modeStepUp}</option>
              </select>
            </label>
          </div>
          <div className="flex shrink-0 flex-col gap-1">
            <button
              type="button"
              disabled={isFirst}
              onClick={() => updateConfig({ type: 'move-step', stepId: step.id, direction: 'up' })}
              className="inline-flex size-7 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
              title={copy.moveUp}
              aria-label={copy.moveUp}
            >
              <ArrowUp className="size-3.5" />
            </button>
            <button
              type="button"
              disabled={isLast}
              onClick={() => updateConfig({ type: 'move-step', stepId: step.id, direction: 'down' })}
              className="inline-flex size-7 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
              title={copy.moveDown}
              aria-label={copy.moveDown}
            >
              <ArrowDown className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => updateConfig({ type: 'remove-step', stepId: step.id })}
              className="inline-flex size-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
              title={copy.removeStep}
              aria-label={copy.removeStep}
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderRuleValueControl = (rule: PlatformFlowRuleConfig) => {
    if (rule.field === 'risk-score') {
      return (
        <input
          type="number"
          min={0}
          max={100}
          value={rule.value}
          onChange={(event) => updateConfig({
            type: 'update-rule',
            ruleId: rule.id,
            patch: { value: Number(event.target.value) },
          })}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-[#354CE1] focus:ring-2 focus:ring-[#354CE1]/15"
        />
      );
    }

    return (
      <select
        value={String(rule.value)}
        onChange={(event) => updateConfig({
          type: 'update-rule',
          ruleId: rule.id,
          patch: { value: event.target.value },
        })}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-[#354CE1] focus:ring-2 focus:ring-[#354CE1]/15"
      >
        {getRuleValueOptions(copy, rule.field).map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    );
  };

  const renderStepUpTarget = (
    action: PlatformFlowAction,
    onChange: (nextAction: PlatformFlowAction) => void,
  ) => {
    if (action.type !== 'request-step-up') return null;
    return (
      <label className="type-label block text-slate-500">
        <span className="mb-1.5 block">{copy.stepUpTargetLabel}</span>
        <select
          value={action.stepId ?? ''}
          onChange={(event) => onChange({
            type: 'request-step-up',
            stepId: event.target.value
              ? event.target.value as PlatformFlowStepId
              : undefined,
          })}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-[#354CE1] focus:ring-2 focus:ring-[#354CE1]/15"
        >
          <option value="">{copy.stepUpTargetLabel}</option>
          {stepUpSteps.map((step) => (
            <option key={step.id} value={step.id}>{copy.steps[step.id].title}</option>
          ))}
        </select>
      </label>
    );
  };

  const renderDynamicFlowStage = () => (
    <div className="grid min-h-[34rem] grid-cols-1 lg:grid-cols-[17rem_minmax(0,1fr)_16rem]">
      <aside className="border-b border-slate-100 bg-slate-50/70 p-5 lg:border-b-0 lg:border-r">
        <div className="mb-5">
          <h3 className="type-card-title text-slate-950">{copy.moduleLibraryTitle}</h3>
          <p className="type-body-sm mt-1.5 text-slate-500">{copy.moduleLibraryDescription}</p>
        </div>
        <div className="space-y-2">
          {PLATFORM_FLOW_STEP_IDS.map((stepId) => {
            const Icon = STEP_ICONS[stepId];
            const isAdded = config.verificationSteps.some((step) => step.id === stepId);
            return (
              <button
                key={stepId}
                type="button"
                disabled={isAdded}
                onClick={() => updateConfig({ type: 'add-step', stepId })}
                className="group flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 text-left transition hover:border-[#354CE1]/40 hover:shadow-sm disabled:cursor-default disabled:bg-slate-50 disabled:opacity-60"
                title={isAdded ? copy.moduleAdded : copy.addModule}
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-[#354CE1]">
                  <Icon className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="type-body-sm block font-semibold text-slate-800">
                    {copy.steps[stepId].title}
                  </span>
                </span>
                {isAdded ? (
                  <Check className="size-4 shrink-0 text-emerald-500" />
                ) : (
                  <Plus className="size-4 shrink-0 text-slate-400 group-hover:text-[#354CE1]" />
                )}
              </button>
            );
          })}
        </div>
      </aside>

      <div className="min-w-0 border-b border-slate-100 p-5 sm:p-6 lg:border-b-0 lg:border-r">
        <div className="mb-5">
          <h3 className="type-card-title text-slate-950">{copy.flowCanvasTitle}</h3>
          <p className="type-body-sm mt-1.5 text-slate-500">{copy.flowCanvasDescription}</p>
        </div>
        {config.verificationSteps.length === 0 ? (
          <div className="flex min-h-80 flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-6 text-center">
            <GitBranch className="size-8 text-slate-300" />
            <p className="type-card-title mt-4 text-slate-700">{copy.emptyFlowTitle}</p>
            <p className="type-body-sm mt-2 max-w-sm text-slate-500">{copy.emptyFlowDescription}</p>
          </div>
        ) : (
          <div className="mx-auto max-w-2xl space-y-4">
            {config.verificationSteps.map(renderStepCard)}
          </div>
        )}
      </div>

      <aside className="bg-white p-5">
        <p className="type-label text-slate-400 uppercase">{copy.estimatedMetrics}</p>
        <div className="mt-5 space-y-5">
          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="type-body-sm font-semibold text-slate-700">{copy.metricCompletion}</span>
              <span className="type-technical font-bold text-[#354CE1]">
                {percentageFormatter.format(metrics.completionRate / 100)}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full bg-[#354CE1]" style={{ width: `${metrics.completionRate}%` }} />
            </div>
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="type-body-sm font-semibold text-slate-700">{copy.metricDetection}</span>
              <span className="type-technical font-bold text-teal-600">
                {percentageFormatter.format(metrics.fraudDetectionRate / 100)}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full bg-teal-500" style={{ width: `${metrics.fraudDetectionRate}%` }} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
            <div>
              <ShieldCheck className="size-4 text-emerald-500" />
              <p className="type-label mt-2 text-slate-400">{copy.metricAssurance}</p>
              <p className="type-technical mt-1 font-bold text-slate-900">
                {numberFormatter.format(metrics.assuranceScore)}/100
              </p>
            </div>
            <div>
              <Clock className="size-4 text-amber-500" />
              <p className="type-label mt-2 text-slate-400">{copy.metricDuration}</p>
              <p className="type-technical mt-1 font-bold text-slate-900">
                {numberFormatter.format(metrics.estimatedSeconds)} {copy.secondsShort}
              </p>
            </div>
          </div>
        </div>
        {showValidation && validationIssues.length > 0 && (
          <div className="mt-6 border-t border-slate-100 pt-5" role="alert">
            <div className="flex items-start gap-2 text-rose-600">
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              <p className="type-body-sm font-semibold">{copy.invalidConfigTitle}</p>
            </div>
            <ul className="mt-3 space-y-2">
              {validationIssues.map((issue) => (
                <li key={issue} className="type-body-sm flex gap-2 text-slate-600">
                  <span aria-hidden="true">•</span>
                  <span>{copy.validation[issue]}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>
    </div>
  );

  const renderOrchestrationStage = () => (
    <div className="grid min-h-[34rem] grid-cols-1 lg:grid-cols-[minmax(0,1.45fr)_minmax(19rem,0.65fr)]">
      <div className="min-w-0 border-b border-slate-100 p-5 sm:p-6 lg:border-b-0 lg:border-r">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="type-card-title text-slate-950">{copy.rulesTitle}</h3>
            <p className="type-body-sm mt-1.5 max-w-2xl text-slate-500">{copy.rulesDescription}</p>
          </div>
          <button
            type="button"
            onClick={() => updateConfig({ type: 'add-rule' })}
            className="type-control inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#354CE1] px-4 text-white transition hover:bg-[#2539BE]"
          >
            <Plus className="size-4" />
            <span>{copy.addRule}</span>
          </button>
        </div>

        {config.workflowRules.length === 0 ? (
          <div className="flex min-h-56 flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-6 text-center">
            <Shuffle className="size-8 text-slate-300" />
            <p className="type-card-title mt-4 text-slate-700">{copy.emptyRulesTitle}</p>
            <p className="type-body-sm mt-2 max-w-sm text-slate-500">{copy.emptyRulesDescription}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {config.workflowRules.map((rule, index) => (
              <div key={rule.id} className="rounded-lg border border-slate-200 bg-slate-50/50 p-4">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="type-technical inline-flex size-7 items-center justify-center rounded-lg bg-slate-900 font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="type-label text-slate-500">
                      {copy.priorityLabel} {index + 1}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => updateConfig({ type: 'move-rule', ruleId: rule.id, direction: 'up' })}
                      className="inline-flex size-8 items-center justify-center rounded-lg text-slate-500 hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
                      title={copy.moveUp}
                      aria-label={copy.moveUp}
                    >
                      <ArrowUp className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={index === config.workflowRules.length - 1}
                      onClick={() => updateConfig({ type: 'move-rule', ruleId: rule.id, direction: 'down' })}
                      className="inline-flex size-8 items-center justify-center rounded-lg text-slate-500 hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
                      title={copy.moveDown}
                      aria-label={copy.moveDown}
                    >
                      <ArrowDown className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => updateConfig({ type: 'remove-rule', ruleId: rule.id })}
                      className="inline-flex size-8 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                      title={copy.removeRule}
                      aria-label={copy.removeRule}
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  <label className="type-label block text-slate-500">
                    <span className="mb-1.5 block">{copy.fieldLabel}</span>
                    <select
                      value={rule.field}
                      onChange={(event) => {
                        const field = event.target.value as PlatformFlowRuleField;
                        updateConfig({
                          type: 'update-rule',
                          ruleId: rule.id,
                          patch: {
                            field,
                            operator: getDefaultRuleOperator(field),
                            value: getDefaultRuleValue(field),
                          },
                        });
                      }}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-[#354CE1] focus:ring-2 focus:ring-[#354CE1]/15"
                    >
                      {PLATFORM_FLOW_RULE_FIELDS.map((field) => (
                        <option key={field} value={field}>{copy.fields[field]}</option>
                      ))}
                    </select>
                  </label>

                  <label className="type-label block text-slate-500">
                    <span className="mb-1.5 block">{copy.operatorLabel}</span>
                    <select
                      value={rule.operator}
                      onChange={(event) => updateConfig({
                        type: 'update-rule',
                        ruleId: rule.id,
                        patch: { operator: event.target.value as PlatformFlowRuleOperator },
                      })}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-[#354CE1] focus:ring-2 focus:ring-[#354CE1]/15"
                    >
                      {getPlatformFlowOperators(rule.field).map((operator) => (
                        <option key={operator} value={operator}>{copy.operators[operator]}</option>
                      ))}
                    </select>
                  </label>

                  <label className="type-label block text-slate-500">
                    <span className="mb-1.5 block">{copy.valueLabel}</span>
                    {renderRuleValueControl(rule)}
                  </label>

                  <label className="type-label block text-slate-500">
                    <span className="mb-1.5 block">{copy.actionLabel}</span>
                    <select
                      value={rule.action.type}
                      onChange={(event) => {
                        const type = event.target.value as PlatformFlowActionType;
                        updateConfig({
                          type: 'update-rule',
                          ruleId: rule.id,
                          patch: {
                            action: type === 'request-step-up'
                              ? { type, stepId: stepUpSteps[0]?.id }
                              : { type },
                          },
                        });
                      }}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-[#354CE1] focus:ring-2 focus:ring-[#354CE1]/15"
                    >
                      {PLATFORM_FLOW_ACTION_TYPES.map((actionType) => (
                        <option key={actionType} value={actionType}>{copy.actions[actionType]}</option>
                      ))}
                    </select>
                  </label>
                </div>

                {rule.action.type === 'request-step-up' && (
                  <div className="mt-3 max-w-sm">
                    {renderStepUpTarget(rule.action, (nextAction) => updateConfig({
                      type: 'update-rule',
                      ruleId: rule.id,
                      patch: { action: nextAction },
                    }))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-5 rounded-lg border border-indigo-100 bg-indigo-50/60 p-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(14rem,0.65fr)] sm:items-end">
            <div>
              <h3 className="type-card-title text-slate-900">{copy.fallbackTitle}</h3>
              <p className="type-body-sm mt-1 text-slate-600">{copy.fallbackDescription}</p>
            </div>
            <label className="type-label block text-slate-500">
              <span className="mb-1.5 block">{copy.actionLabel}</span>
              <select
                value={config.fallbackAction.type}
                onChange={(event) => {
                  const type = event.target.value as PlatformFlowActionType;
                  updateConfig({
                    type: 'set-fallback-action',
                    action: type === 'request-step-up'
                      ? { type, stepId: stepUpSteps[0]?.id }
                      : { type },
                  });
                }}
                className="w-full rounded-lg border border-indigo-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-[#354CE1] focus:ring-2 focus:ring-[#354CE1]/15"
              >
                {PLATFORM_FLOW_ACTION_TYPES.map((actionType) => (
                  <option key={actionType} value={actionType}>{copy.actions[actionType]}</option>
                ))}
              </select>
            </label>
          </div>
          {config.fallbackAction.type === 'request-step-up' && (
            <div className="mt-3 max-w-sm sm:ml-auto">
              {renderStepUpTarget(config.fallbackAction, (action) => updateConfig({
                type: 'set-fallback-action',
                action,
              }))}
            </div>
          )}
        </div>
      </div>

      <aside className="bg-slate-950 p-5 text-white sm:p-6">
        <div>
          <p className="type-label text-indigo-300 uppercase">{copy.topologyTitle}</p>
          <h3 className="type-card-title mt-2 text-white">{copy.firstMatchNote}</h3>
          <p className="type-body-sm mt-2 text-slate-400">{copy.topologyDescription}</p>
        </div>
        <div className="relative mt-6 space-y-3">
          <span aria-hidden="true" className="absolute bottom-5 left-4 top-5 border-l border-dashed border-slate-700" />
          {config.workflowRules.map((rule, index) => {
            const actionCopy = formatAction(copy, rule.action);
            const ActionIcon = ACTION_ICONS[rule.action.type];
            return (
              <div key={rule.id} className="relative z-10 rounded-lg border border-slate-800 bg-slate-900 p-3">
                <div className="flex items-start gap-3">
                  <span className="type-technical inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#354CE1] font-bold text-white">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="type-body-sm font-semibold text-slate-200">{copy.fields[rule.field]}</p>
                    <p className="type-technical mt-1 text-slate-500">
                      {copy.operators[rule.operator]} · {getDisplayValue(copy, rule.field, rule.value)}
                    </p>
                    <div className={`mt-2 inline-flex items-center gap-1.5 rounded-lg border px-2 py-1 ${ACTION_TONES[rule.action.type]}`}>
                      <ActionIcon className="size-3.5" />
                      <span className="type-caption font-semibold">{actionCopy.label}</span>
                    </div>
                    {actionCopy.target && (
                      <p className="type-caption mt-1 text-amber-300">{actionCopy.target}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div className="relative z-10 rounded-lg border border-dashed border-slate-700 bg-slate-900/60 p-3">
            <div className="flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400">
                <GitBranch className="size-4" />
              </span>
              <div>
                <p className="type-body-sm font-semibold text-slate-300">{copy.fallbackRoute}</p>
                <p className="type-caption mt-1 text-slate-500">{copy.actions[config.fallbackAction.type]}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );

  const renderGraph = () => {
    const graph = simulationResult?.graph;
    const selectedNode = graph?.nodes.find((node) => node.id === selectedGraphNodeId) ?? null;

    if (!graph) {
      return (
        <div className="flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed border-slate-700 bg-slate-950 px-6 text-center">
          <Network className="size-8 text-slate-700" />
          <p className="type-card-title mt-4 text-slate-300">{copy.graphEmptyTitle}</p>
          <p className="type-body-sm mt-2 max-w-sm text-slate-500">{copy.graphEmptyDescription}</p>
        </div>
      );
    }

    const getNodeLabel = (node: PlatformFlowGraphNode) => {
      if (node.type === 'device') return `${copy.graphDevice} DF-8A2C`;
      if (node.type === 'ip') return `${copy.graphIp} 185.220.x.x`;
      const accountNumber = node.id === 'subject' ? '01' : node.id === 'account-2' ? '02' : '03';
      return `${copy.graphAccount} ${accountNumber}`;
    };

    return (
      <div>
        <div className="relative h-72 overflow-hidden rounded-lg border border-slate-800 bg-slate-950">
          <svg className="absolute inset-0 size-full" aria-hidden="true">
            {graph.links.map((link) => {
              const source = graph.nodes.find((node) => node.id === link.source);
              const target = graph.nodes.find((node) => node.id === link.target);
              if (!source || !target) return null;
              return (
                <line
                  key={`${link.source}-${link.target}`}
                  x1={`${source.x}%`}
                  y1={`${source.y}%`}
                  x2={`${target.x}%`}
                  y2={`${target.y}%`}
                  stroke="#ef4444"
                  strokeWidth="1.5"
                  strokeDasharray="5 5"
                  opacity="0.7"
                />
              );
            })}
          </svg>
          {graph.nodes.map((node) => {
            const isSelected = selectedGraphNodeId === node.id;
            const Icon = node.type === 'device' ? Fingerprint : node.type === 'ip' ? Globe : Users;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setSelectedGraphNodeId(node.id)}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-lg border p-2.5 text-center transition ${
                  node.status === 'blocked'
                    ? 'border-rose-500 bg-rose-950 text-rose-300'
                    : 'border-amber-500/60 bg-amber-950/70 text-amber-200'
                } ${isSelected ? 'ring-4 ring-[#354CE1]/40' : ''}`}
                aria-label={getNodeLabel(node)}
              >
                <Icon className="mx-auto size-4" />
                <span className="type-caption mt-1 block whitespace-nowrap font-semibold">
                  {getNodeLabel(node)}
                </span>
              </button>
            );
          })}
        </div>
        {selectedNode && (
          <div className="mt-3 flex items-center justify-between gap-4 rounded-lg border border-slate-800 bg-slate-900 px-4 py-3">
            <div>
              <p className="type-label text-slate-500">{copy.graphSelected}</p>
              <p className="type-body-sm mt-1 font-semibold text-slate-200">{getNodeLabel(selectedNode)}</p>
            </div>
            <span className="type-caption rounded-lg bg-rose-500/10 px-2 py-1 font-semibold text-rose-300">
              {copy.graphSharedConnections}
            </span>
          </div>
        )}
      </div>
    );
  };

  const renderAnalysisStage = () => {
    const stepEventCount = simulationResult?.stepResults.length ?? 0;
    const signalEventCount = simulationResult?.signalResults.length ?? 0;
    const ruleEventIndex = stepEventCount + signalEventCount;
    const actionEventIndex = ruleEventIndex + 1;
    const ruleStatus = getTimelineStatus(ruleEventIndex, 'passed');
    const actionStatus = getTimelineStatus(actionEventIndex, 'passed');
    const resultAction = simulationResult ? formatAction(copy, simulationResult.action) : null;

    return (
      <div className="grid min-h-[38rem] grid-cols-1 xl:grid-cols-[18rem_minmax(0,1fr)_minmax(19rem,0.85fr)]">
        <aside className="border-b border-slate-100 bg-slate-50/70 p-5 xl:border-b-0 xl:border-r">
          <div>
            <h3 className="type-card-title text-slate-950">{copy.scenariosTitle}</h3>
            <p className="type-body-sm mt-1.5 text-slate-500">{copy.scenariosDescription}</p>
          </div>
          <div className="mt-4 space-y-2">
            {PLATFORM_FLOW_SCENARIO_IDS.map((scenarioId) => (
              <button
                key={scenarioId}
                type="button"
                onClick={() => handleScenarioChange(scenarioId)}
                className={`w-full rounded-lg border p-3 text-left transition ${
                  selectedScenario === scenarioId
                    ? 'border-[#354CE1] bg-indigo-50 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <span className="type-body-sm block font-semibold text-slate-900">
                  {copy.scenarios[scenarioId].title}
                </span>
                <span className="type-caption mt-1 block leading-relaxed text-slate-500">
                  {copy.scenarios[scenarioId].description}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-6 border-t border-slate-200 pt-5">
            <h3 className="type-card-title text-slate-950">{copy.signalsTitle}</h3>
            <p className="type-body-sm mt-1.5 text-slate-500">{copy.signalsDescription}</p>
            <div className="mt-4 space-y-2">
              {PLATFORM_FLOW_SIGNAL_IDS.map((signalId) => {
                const Icon = SIGNAL_ICONS[signalId];
                const isEnabled = config.preventionSignals.includes(signalId);
                return (
                  <label
                    key={signalId}
                    className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-white p-3"
                  >
                    <input
                      type="checkbox"
                      checked={isEnabled}
                      onChange={() => updateConfig({ type: 'toggle-signal', signalId })}
                      className="mt-1 size-4 rounded border-slate-300 text-[#354CE1] focus:ring-[#354CE1]"
                    />
                    <Icon className={`mt-0.5 size-4 shrink-0 ${isEnabled ? 'text-[#354CE1]' : 'text-slate-400'}`} />
                    <span className="min-w-0">
                      <span className="type-body-sm block font-semibold text-slate-800">
                        {copy.signals[signalId].title}
                      </span>
                      <span className="type-caption mt-1 block leading-relaxed text-slate-500">
                        {copy.signals[signalId].description}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            disabled={isSimulating}
            onClick={handleRunSimulation}
            className="type-control mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#354CE1] px-4 text-white transition hover:bg-[#2539BE] disabled:cursor-wait disabled:opacity-70"
          >
            {isSimulating ? (
              <RefreshCw className="size-4 animate-spin" />
            ) : simulationResult ? (
              <RefreshCw className="size-4" />
            ) : (
              <Play className="size-4 fill-current" />
            )}
            <span>
              {isSimulating
                ? copy.runningSimulation
                : simulationResult
                  ? copy.runAgain
                  : copy.runSimulation}
            </span>
          </button>
        </aside>

        <div className="min-w-0 border-b border-slate-100 p-5 sm:p-6 xl:border-b-0 xl:border-r">
          <div>
            <h3 className="type-card-title text-slate-950">{copy.executionTitle}</h3>
            <p className="type-body-sm mt-1.5 text-slate-500">{copy.executionDescription}</p>
          </div>

          {simulationStale && (
            <div className="type-body-sm mt-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-800" role="status">
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              <span>{copy.staleResult}</span>
            </div>
          )}

          {!simulationResult ? (
            <div className="mt-5 flex min-h-80 flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-6 text-center">
              <Play className="size-8 text-slate-300" />
              <p className="type-card-title mt-4 text-slate-700">{copy.noResultTitle}</p>
              <p className="type-body-sm mt-2 max-w-md text-slate-500">{copy.noResultDescription}</p>
            </div>
          ) : (
            <div className="mt-5 space-y-3" aria-live="polite">
              {simulationResult.stepResults.map((result, index) => {
                const Icon = STEP_ICONS[result.stepId];
                const status = getTimelineStatus(index, result.status);
                return (
                  <div key={result.stepId} className={`rounded-lg border p-3 transition ${STATUS_TONES[status]}`}>
                    <div className="flex items-center gap-3">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/70">
                        {status === 'running' ? <RefreshCw className="size-4 animate-spin" /> : <Icon className="size-4" />}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="type-body-sm font-semibold">{copy.steps[result.stepId].title}</p>
                        <p className="type-caption mt-0.5 opacity-75">
                          {result.mode === 'always' ? copy.modeAlways : copy.modeStepUp}
                        </p>
                      </div>
                      <span className="type-caption shrink-0 font-semibold">
                        {copy.statuses[status]}
                      </span>
                    </div>
                  </div>
                );
              })}

              {simulationResult.signalResults.map((result, signalIndex) => {
                const eventIndex = stepEventCount + signalIndex;
                const status = getTimelineStatus(eventIndex, result.status);
                const Icon = SIGNAL_ICONS[result.signalId];
                return (
                  <div key={result.signalId} className={`rounded-lg border p-3 transition ${STATUS_TONES[status]}`}>
                    <div className="flex items-center gap-3">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/70">
                        {status === 'running' ? <RefreshCw className="size-4 animate-spin" /> : <Icon className="size-4" />}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="type-body-sm font-semibold">{copy.signals[result.signalId].title}</p>
                        <p className="type-caption mt-0.5 opacity-75">{copy.signalImpact}</p>
                      </div>
                      <span className="type-technical shrink-0 font-bold">
                        {result.riskDelta > 0 ? '+' : ''}{numberFormatter.format(result.riskDelta)}
                      </span>
                    </div>
                  </div>
                );
              })}

              <div className={`rounded-lg border p-3 transition ${STATUS_TONES[ruleStatus]}`}>
                <div className="flex items-center gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/70">
                    {ruleStatus === 'running' ? <RefreshCw className="size-4 animate-spin" /> : <Shuffle className="size-4" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="type-body-sm font-semibold">
                      {simulationResult.matchedRuleId ? copy.matchedRule : copy.defaultRoute}
                    </p>
                    <p className="type-technical mt-0.5 opacity-75">
                      {simulationResult.matchedRuleId ?? copy.fallbackRoute}
                    </p>
                  </div>
                  <span className="type-caption shrink-0 font-semibold">{copy.statuses[ruleStatus]}</span>
                </div>
              </div>

              <div className={`rounded-lg border p-3 transition ${STATUS_TONES[actionStatus]}`}>
                <div className="flex items-center gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/70">
                    {actionStatus === 'running'
                      ? <RefreshCw className="size-4 animate-spin" />
                      : resultAction
                        ? (() => {
                            const ResultIcon = ACTION_ICONS[simulationResult.action.type];
                            return <ResultIcon className="size-4" />;
                          })()
                        : null}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="type-body-sm font-semibold">{copy.finalDecision}</p>
                    <p className="type-caption mt-0.5 opacity-75">{resultAction?.label}</p>
                  </div>
                  <span className="type-caption shrink-0 font-semibold">{copy.statuses[actionStatus]}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <aside className="bg-slate-900 p-5 text-white sm:p-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
              <p className="type-label text-slate-500">{copy.riskScore}</p>
              <p className={`type-metric mt-2 ${
                simulationResult && !isSimulating
                  ? simulationResult.riskScore >= 75
                    ? 'text-rose-400'
                    : simulationResult.riskScore >= 40
                      ? 'text-amber-300'
                      : 'text-emerald-400'
                  : 'text-slate-600'
              }`}>
                {simulationResult && !isSimulating
                  ? numberFormatter.format(simulationResult.riskScore)
                  : '---'}
              </p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
              <p className="type-label text-slate-500">{copy.finalDecision}</p>
              <p className="type-body-sm mt-2 font-semibold text-slate-200">
                {simulationResult && !isSimulating && resultAction
                  ? resultAction.label
                  : '---'}
              </p>
            </div>
          </div>

          <div className="mt-5">
            <p className="type-label text-indigo-300 uppercase">{copy.graphTitle}</p>
            <p className="type-body-sm mt-1.5 text-slate-400">{copy.graphDescription}</p>
          </div>
          <div className="mt-4">{renderGraph()}</div>
        </aside>
      </div>
    );
  };

  return (
    <section
      id="platform-flow-studio"
      aria-label={copy.studioAriaLabel}
      className="scroll-mt-24 border-b border-slate-100 bg-[#F8F9FC] py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="type-label text-[#354CE1] uppercase">{copy.badge}</p>
          <h2 className="type-section-title-compact mt-4 text-slate-950">{copy.title}</h2>
          <p className="type-body mt-4 text-slate-600">{copy.description}</p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
          <div className="border-b border-slate-100 bg-white p-4 sm:p-5">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(15rem,1fr)_minmax(15rem,0.75fr)_auto] lg:items-end">
              <label className="block">
                <span className="type-label mb-1.5 block text-slate-500">{copy.flowNameLabel}</span>
                <input
                  value={config.name}
                  onChange={(event) => updateConfig({ type: 'set-name', name: event.target.value })}
                  className="type-technical min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-slate-800 outline-none transition focus:border-[#354CE1] focus:ring-2 focus:ring-[#354CE1]/15"
                  aria-describedby="platform-flow-name-hint"
                />
                <span id="platform-flow-name-hint" className="type-caption mt-1.5 block text-slate-400">
                  {copy.flowNameHint}
                </span>
              </label>

              <label className="block">
                <span className="type-label mb-1.5 block text-slate-500">{copy.presetLabel}</span>
                <select
                  value={selectedPreset}
                  onChange={(event) => loadPreset(event.target.value as (typeof PLATFORM_FLOW_PRESET_IDS)[number])}
                  className="type-control min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-slate-800 outline-none transition focus:border-[#354CE1] focus:ring-2 focus:ring-[#354CE1]/15"
                >
                  {PLATFORM_FLOW_PRESET_IDS.map((presetId) => (
                    <option key={presetId} value={presetId}>{copy.presets[presetId].title}</option>
                  ))}
                </select>
                <span className="type-caption mt-1.5 block text-slate-400">
                  {copy.presets[selectedPreset].description}
                </span>
              </label>

              <div className="flex items-center gap-2 lg:pb-5">
                <button
                  type="button"
                  onClick={() => loadPreset(selectedPreset)}
                  className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
                  title={copy.resetFlow}
                  aria-label={copy.resetFlow}
                >
                  <RefreshCw className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={openExportDialog}
                  className="type-control inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-white transition hover:bg-slate-800 lg:flex-none"
                >
                  <Code2 className="size-4" />
                  <span>{copy.exportCode}</span>
                </button>
              </div>
            </div>
          </div>

          <div
            role="tablist"
            aria-label={copy.studioAriaLabel}
            className="grid grid-cols-1 border-b border-slate-100 bg-slate-50 sm:grid-cols-3"
          >
            {STAGES.map((stage) => {
              const Icon = STAGE_ICONS[stage];
              const isActive = activeStage === stage;
              const stageTabId = getStageTabId(stage);
              const stagePanelId = getStagePanelId(stage);
              return (
                <button
                  key={stage}
                  id={stageTabId}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={stagePanelId}
                  onClick={() => onActiveStageChange(stage)}
                  className={`relative flex min-h-20 items-center gap-3 border-b-2 px-5 py-4 text-left transition sm:border-b-0 sm:border-t-2 ${
                    isActive
                      ? 'border-[#354CE1] bg-white text-slate-950'
                      : 'border-transparent text-slate-500 hover:bg-white/70 hover:text-slate-800'
                  }`}
                >
                  <span className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
                    isActive ? 'bg-indigo-50 text-[#354CE1]' : 'bg-slate-100 text-slate-400'
                  }`}>
                    <Icon className="size-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="type-body-sm block font-semibold">{copy.stages[stage].title}</span>
                    <span className="type-caption mt-0.5 block text-slate-400">
                      {copy.stages[stage].description}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              id={activeStagePanelId}
              role="tabpanel"
              aria-labelledby={activeStageTabId}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            >
              {activeStage === 'collect'
                ? renderDynamicFlowStage()
                : activeStage === 'orchestrate'
                  ? renderOrchestrationStage()
                  : renderAnalysisStage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {exportOpen && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-end justify-center bg-slate-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            onMouseDown={(event) => {
              if (event.currentTarget === event.target) closeExportDialog();
            }}
          >
            <motion.div
              ref={exportDialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="platform-flow-export-title"
              className="flex max-h-screen w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-2xl"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            >
              <div className="flex items-start justify-between gap-5 border-b border-slate-100 px-5 py-4 sm:px-6">
                <div>
                  <h2 id="platform-flow-export-title" className="type-section-title-compact text-slate-950">
                    {copy.exportTitle}
                  </h2>
                  <p className="type-body-sm mt-1.5 text-slate-500">{copy.exportDescription}</p>
                </div>
                <button
                  ref={exportCloseRef}
                  type="button"
                  onClick={closeExportDialog}
                  className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
                  title={copy.closeDialog}
                  aria-label={copy.closeDialog}
                >
                  <X className="size-4.5" />
                </button>
              </div>

              <div className="border-b border-slate-100 px-5 pt-4 sm:px-6">
                <div role="tablist" aria-label={copy.exportTitle} className="flex gap-1">
                  {(['typescript', 'json'] as ExportTab[]).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      role="tab"
                      aria-selected={exportTab === tab}
                      onClick={() => setExportTab(tab)}
                      className={`type-control border-b-2 px-4 py-2.5 transition ${
                        exportTab === tab
                          ? 'border-[#354CE1] text-[#354CE1]'
                          : 'border-transparent text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      {tab === 'typescript' ? copy.typescriptTab : copy.jsonTab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto bg-[#0D1220]">
                <CodeBlock
                  flush
                  code={exportTab === 'typescript' ? typescriptExport : jsonExport}
                  language={exportTab === 'typescript' ? 'typescript' : 'json'}
                  fileName={exportFileName}
                  maxHeightClassName={CODE_BLOCK_MAX_HEIGHT_CLASS}
                />
              </div>

              <div className="flex flex-col gap-3 border-t border-slate-100 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div className="type-body-sm flex max-w-2xl items-start gap-2 text-amber-800">
                  <AlertCircle className="mt-0.5 size-4 shrink-0" />
                  <span>{copy.exportDisclaimer}</span>
                </div>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="type-control inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#354CE1] px-4 text-white transition hover:bg-[#2539BE]"
                >
                  <Download className="size-4" />
                  <span>{copy.downloadFile}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
