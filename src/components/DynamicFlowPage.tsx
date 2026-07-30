/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  Cpu,
  GitBranch,
  LayoutDashboard,
  ListChecks,
  Lock,
  Network,
  PencilRuler,
  Play,
  RefreshCw,
  Rocket,
  Route,
  Shield,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap,
  Sliders,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import TechGridBg from './TechGridBg';
import { useLanguage } from '../context/LanguageContext';
import {
  DYNAMIC_FLOW_BENEFIT_IDS,
  DYNAMIC_FLOW_FAQ_IDS,
  DYNAMIC_FLOW_PRESET_IDS,
  DYNAMIC_FLOW_STAGE_IDS,
  DYNAMIC_FLOW_TRANSLATIONS,
} from '../translations/DynamicFlowPageTranslations';
import type {
  DynamicFlowBenefitId,
  DynamicFlowPageCopy,
  DynamicFlowPresetId,
  DynamicFlowStageId,
} from '../translations/DynamicFlowPageTranslations';
import type { AppView } from '../types/routes';
import { getLocalizedRecord } from '../utils/i18nRuntime';

interface DynamicFlowPageProps {
  onViewChange: (view: AppView) => void;
}

const BENEFIT_ICONS: Record<DynamicFlowBenefitId, LucideIcon> = {
  visual: PencilRuler,
  adaptive: GitBranch,
  confidence: ShieldCheck,
  scale: Blocks,
};

const STAGE_ICONS: Record<DynamicFlowStageId, LucideIcon> = {
  compose: Workflow,
  adapt: Route,
  prove: ListChecks,
  operate: Rocket,
};

const STAGE_STYLES: Record<
  DynamicFlowStageId,
  {
    readonly icon: string;
    readonly soft: string;
    readonly marker: string;
    readonly surface: string;
    readonly border: string;
    readonly badge: string;
  }
> = {
  compose: {
    icon: 'text-[#354CE1]',
    soft: 'bg-[#EEF1FF]',
    marker: 'bg-[#354CE1]',
    surface: 'bg-white/90 backdrop-blur-md',
    border: 'border-[#354CE1]/20',
    badge: 'bg-[#EEF1FF] text-[#354CE1]',
  },
  adapt: {
    icon: 'text-violet-700',
    soft: 'bg-violet-50',
    marker: 'bg-violet-600',
    surface: 'bg-white/90 backdrop-blur-md',
    border: 'border-violet-200',
    badge: 'bg-violet-50 text-violet-700',
  },
  prove: {
    icon: 'text-emerald-700',
    soft: 'bg-emerald-50',
    marker: 'bg-emerald-600',
    surface: 'bg-white/90 backdrop-blur-md',
    border: 'border-emerald-200',
    badge: 'bg-emerald-50 text-emerald-700',
  },
  operate: {
    icon: 'text-cyan-700',
    soft: 'bg-cyan-50',
    marker: 'bg-cyan-600',
    surface: 'bg-white/90 backdrop-blur-md',
    border: 'border-cyan-200',
    badge: 'bg-cyan-50 text-cyan-700',
  },
};

function HeroFlowVisual({ copy }: { copy: DynamicFlowPageCopy }) {
  const [activePreset, setActivePreset] = useState<DynamicFlowPresetId>('fintech');
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const simCopy = copy.simulator;

  const handleRunSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStep(1);

    setTimeout(() => setActiveStep(2), 700);
    setTimeout(() => setActiveStep(3), 1500);
    setTimeout(() => setActiveStep(4), 2200);
    setTimeout(() => {
      setIsSimulating(false);
    }, 2800);
  };

  useEffect(() => {
    setActiveStep(0);
    setIsSimulating(false);
  }, [activePreset]);

  return (
    <figure
      aria-label={copy.hero.visualAriaLabel}
      className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-5 text-left shadow-2xl shadow-[#0F1E36]/10 backdrop-blur-xl sm:p-7"
    >
      {/* Ambient background glows */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#354CE1]/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#5B6DFF]/10 blur-3xl"
        aria-hidden="true"
      />

      <>
        {/* Header & Preset Switcher */}
        <figcaption className="relative flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="type-label text-[#354CE1] uppercase tracking-wider">{copy.hero.visualEyebrow}</p>
            </div>
            <h4 className="type-card-title mt-1 text-[#0F1E36] font-bold">
              {activePreset === 'fintech'
                ? simCopy.presetFintech
                : activePreset === 'crypto'
                  ? simCopy.presetCrypto
                  : simCopy.presetAge}
            </h4>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-slate-100/90 p-1 backdrop-blur-sm">
            {DYNAMIC_FLOW_PRESET_IDS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setActivePreset(preset)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200 ${
                  activePreset === preset
                    ? 'bg-white text-[#354CE1] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {simCopy.presetTabs[preset]}
              </button>
            ))}
          </div>
        </figcaption>

        {/* Interactive Flow Canvas */}
        <div className="relative mx-auto mt-6 max-w-3xl space-y-3.5">
        {/* Step 1: Customer Input */}
        <div
          className={`flex items-center justify-between rounded-2xl border p-3.5 transition-all duration-300 ${
            activeStep >= 1
              ? 'border-[#354CE1]/40 bg-[#EEF1FF]/60 shadow-sm'
              : 'border-slate-200/80 bg-slate-50/60'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
              activeStep >= 1 ? 'bg-[#354CE1] text-white shadow-sm' : 'bg-slate-200 text-slate-600'
            }`}>
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="type-body-sm font-semibold text-[#0F1E36]">
                {simCopy.stepStart}
              </p>
              <p className="type-caption text-slate-500">{simCopy.inputMeta}</p>
            </div>
          </div>
          <span className="type-technical rounded-lg bg-white px-2.5 py-1 text-slate-600 shadow-2xs border border-slate-200/60">
            {simCopy.responseStatus}
          </span>
        </div>

        {/* Connector Line */}
        <div className="mx-auto h-4 w-0.5 bg-slate-200" />

        {/* Step 2: Verification Node */}
        <div
          className={`flex items-center justify-between rounded-2xl border p-3.5 transition-all duration-300 ${
            activeStep >= 2
              ? 'border-[#354CE1]/40 bg-[#EEF1FF]/60 shadow-sm'
              : 'border-slate-200/80 bg-slate-50/60'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
              activeStep >= 2 ? 'bg-[#354CE1] text-white shadow-sm' : 'bg-slate-200 text-slate-600'
            }`}>
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="type-body-sm font-semibold text-[#0F1E36]">
                {simCopy.stepDocVerify}
              </p>
              <p className="type-caption text-slate-500">{simCopy.verificationDetail}</p>
            </div>
          </div>
          {activeStep >= 2 ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-600" aria-hidden="true" />
          ) : (
            <CircleDot className="h-4 w-4 text-slate-400" aria-hidden="true" />
          )}
        </div>

        {/* Connector Line */}
        <div className="mx-auto h-4 w-0.5 bg-slate-200" />

        {/* Step 3: Dynamic Adaptive Logic */}
        <div
          className={`flex items-center justify-between rounded-2xl border p-3.5 transition-all duration-300 ${
            activeStep >= 3
              ? 'border-violet-300 bg-violet-50/70 shadow-sm'
              : 'border-slate-200/80 bg-slate-50/60'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
              activeStep >= 3 ? 'bg-violet-600 text-white shadow-sm' : 'bg-slate-200 text-slate-600'
            }`}>
              <GitBranch className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="type-body-sm font-semibold text-[#0F1E36]">
                {simCopy.stepRiskCheck}
              </p>
              <p className="type-caption text-slate-500">
                {simCopy.scoreLabel}: {simCopy.riskResults[activePreset]}
              </p>
            </div>
          </div>
          <span className="type-caption font-semibold text-violet-700">
            {simCopy.latencyLabel}: {simCopy.latencyValue}
          </span>
        </div>

        {/* Branching Routes */}
        <div className="mt-4 grid grid-cols-3 gap-2.5 pt-2 border-t border-slate-100">
          <div
            className={`flex flex-col items-center rounded-xl p-3 text-center transition-all duration-300 border ${
              activeStep >= 4 && activePreset === 'fintech'
                ? 'border-emerald-300 bg-emerald-50 text-emerald-900 shadow-md ring-2 ring-emerald-400/30'
                : 'border-slate-200/60 bg-slate-50/60 text-slate-600'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 mb-1.5" />
            <span className="type-caption font-semibold">{copy.hero.continue}</span>
            <span className="text-[10px] text-slate-500 mt-0.5">{simCopy.routeMeta.approved}</span>
          </div>

          <div
            className={`flex flex-col items-center rounded-xl p-3 text-center transition-all duration-300 border ${
              activeStep >= 4 && activePreset === 'age'
                ? 'border-amber-300 bg-amber-50 text-amber-900 shadow-md ring-2 ring-amber-400/30'
                : 'border-slate-200/60 bg-slate-50/60 text-slate-600'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-amber-500 mb-1.5" />
            <span className="type-caption font-semibold">{copy.hero.requestMore}</span>
            <span className="text-[10px] text-slate-500 mt-0.5">{simCopy.routeMeta.stepUp}</span>
          </div>

          <div
            className={`flex flex-col items-center rounded-xl p-3 text-center transition-all duration-300 border ${
              activeStep >= 4 && activePreset === 'crypto'
                ? 'border-red-300 bg-red-50 text-red-900 shadow-md ring-2 ring-red-400/30'
                : 'border-slate-200/60 bg-slate-50/60 text-slate-600'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-red-500 mb-1.5" />
            <span className="type-caption font-semibold">{copy.hero.review}</span>
            <span className="text-[10px] text-slate-500 mt-0.5">{simCopy.routeMeta.flagged}</span>
          </div>
        </div>
        </div>

        {/* Simulation Trigger Bar */}
        <div className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
          <span className="type-caption text-slate-500 flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-[#354CE1]" />
            {simCopy.engineLabel}
          </span>
          <button
            type="button"
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="type-control inline-flex items-center gap-2 rounded-xl bg-[#354CE1] px-4 py-2 text-xs font-semibold text-white shadow-md transition-all hover:bg-[#283DBF] active:scale-98 disabled:opacity-75"
          >
            {isSimulating ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                {simCopy.running}
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" />
                {simCopy.runSim}
              </>
            )}
          </button>
        </div>
      </>
    </figure>
  );
}

function StageVisual({
  stageId,
  copy,
}: {
  stageId: DynamicFlowStageId;
  copy: DynamicFlowPageCopy;
}) {
  const stage = copy.workflow.stages[stageId];
  const visualLabels = copy.workflow.visualLabels;
  const style = STAGE_STYLES[stageId];

  if (stageId === 'adapt') {
    return (
      <div className={`rounded-3xl border ${style.border} ${style.surface} p-6 shadow-xl shadow-[#0F1E36]/5 sm:p-8`}>
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-violet-600 animate-pulse" />
            <p className={`type-label ${style.icon}`}>{stage.visualTitle}</p>
          </div>
          <span className="type-caption rounded-full bg-violet-100 px-3 py-1 font-semibold text-violet-800">
            {stage.visualStatus}
          </span>
        </div>

        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-3 rounded-2xl bg-violet-50 border border-violet-200/80 px-5 py-3 shadow-xs">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white shadow-sm">
              <GitBranch className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="type-body-sm font-bold text-slate-900">{visualLabels.classifierTitle}</p>
              <p className="type-caption text-slate-500">{visualLabels.classifierCondition}</p>
            </div>
          </div>
        </div>

        <div className="mx-auto h-6 w-0.5 bg-violet-200" aria-hidden="true" />

        <div className="grid gap-3 sm:grid-cols-3">
          {stage.visualItems.map((item, index) => (
            <div
              key={item}
              className="flex flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-white p-4 text-center shadow-xs transition hover:border-violet-300 hover:shadow-sm"
            >
              <span
                className={`h-2.5 w-2.5 rounded-full mb-2 ${
                  index === 0
                    ? 'bg-emerald-500'
                    : index === 1
                      ? 'bg-amber-500'
                      : 'bg-violet-500'
                }`}
                aria-hidden="true"
              />
              <span className="type-body-sm font-semibold text-slate-800">{item}</span>
              <span className="type-caption text-slate-400 mt-1">
                {visualLabels.scoreBands[index]}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (stageId === 'prove') {
    return (
      <div className={`rounded-3xl border ${style.border} ${style.surface} p-6 shadow-xl shadow-[#0F1E36]/5 sm:p-8`}>
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            <p className={`type-label ${style.icon}`}>{stage.visualTitle}</p>
          </div>
          <span className="type-caption rounded-full bg-emerald-100 px-3 py-1 font-semibold text-emerald-800">
            {stage.visualStatus}
          </span>
        </div>

        <div className="mt-6 space-y-3">
          {stage.visualItems.map((item, index) => (
            <div
              key={item}
              className="flex items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-white px-4 py-3.5 shadow-xs"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Check className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="type-body-sm font-semibold text-slate-800">{item}</span>
              <span className="type-technical ml-auto rounded-md bg-slate-100 px-2 py-0.5 text-slate-500">
                {visualLabels.passStatus} (0{index + 1})
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (stageId === 'operate') {
    return (
      <div className={`rounded-3xl border ${style.border} ${style.surface} p-6 shadow-xl shadow-[#0F1E36]/5 sm:p-8`}>
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-600 animate-pulse" />
            <p className={`type-label ${style.icon}`}>{stage.visualTitle}</p>
          </div>
          <span className="type-caption rounded-full bg-cyan-100 px-3 py-1 font-semibold text-cyan-800">
            {stage.visualStatus}
          </span>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          {stage.visualItems.map((item, index) => (
            <div key={item} className="contents">
              <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-white p-4 text-center shadow-xs">
                <span className="type-caption font-bold text-cyan-700 mb-1">
                  {visualLabels.stepLabel} 0{index + 1}
                </span>
                <span className="type-body-sm font-semibold text-slate-800">{item}</span>
              </div>
              {index < stage.visualItems.length - 1 && (
                <ArrowRight
                  className="mx-auto h-4 w-4 shrink-0 rotate-90 text-cyan-600 sm:rotate-0"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-3xl border ${style.border} ${style.surface} p-6 shadow-xl shadow-[#0F1E36]/5 sm:p-8`}>
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#354CE1] animate-pulse" />
          <p className={`type-label ${style.icon}`}>{stage.visualTitle}</p>
        </div>
        <span className="type-caption rounded-full bg-[#EEF1FF] px-3 py-1 font-semibold text-[#354CE1]">
          {stage.visualStatus}
        </span>
      </div>

      <div className="relative mt-6 space-y-3">
        <span className="absolute bottom-6 left-[22px] top-6 w-0.5 bg-[#C9D0FF]" aria-hidden="true" />
        {stage.visualItems.map((item, index) => (
          <div key={item} className="relative flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
            <span className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF1FF] text-[#354CE1]">
              {index === 0 ? (
                <Blocks className="h-5 w-5" aria-hidden="true" />
              ) : index === 1 ? (
                <GitBranch className="h-5 w-5" aria-hidden="true" />
              ) : (
                <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
              )}
            </span>
            <div>
              <span className="type-body-sm font-semibold text-slate-800">{item}</span>
              <p className="type-caption text-slate-500">
                {visualLabels.componentBlockLabel} #{index + 1}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DynamicFlowPage({ onViewChange }: DynamicFlowPageProps) {
  const { language } = useLanguage();
  const copy = getLocalizedRecord(
    DYNAMIC_FLOW_TRANSLATIONS,
    language,
    'DYNAMIC_FLOW_TRANSLATIONS',
  );
  const [expandedFaq, setExpandedFaq] = useState<
    (typeof DYNAMIC_FLOW_FAQ_IDS)[number] | null
  >(DYNAMIC_FLOW_FAQ_IDS[0]);

  const metricsCopy = copy.metrics;

  return (
    <main
      id="dynamic-flow-page-root"
      className="min-h-screen overflow-hidden bg-[#FAFBFD] text-slate-800 antialiased selection:bg-[#354CE1]/10 selection:text-[#354CE1]"
    >
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-white pb-24 pt-16 md:pb-32 md:pt-20">
        <TechGridBg />
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-96 w-[56rem] -translate-x-1/2 rounded-full bg-[#354CE1]/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-32 top-32 h-72 w-72 rounded-full bg-[#5B6DFF]/15 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <div className="stack-hero">
            <h1 className="type-page-title mx-auto max-w-5xl text-balance text-[#0F1E36]">
              <span className="block md:whitespace-nowrap">
                {copy.hero.titleLines[0]}
              </span>
              <span className="block bg-gradient-to-r from-[#354CE1] via-[#5F3CF3] to-[#00D4B2] bg-clip-text text-transparent md:whitespace-nowrap">
                {copy.hero.titleLines[1]}
              </span>
            </h1>

            <p className="type-lead measure-lead mx-auto text-slate-600">
              {copy.hero.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col items-center justify-center gap-3.5 pt-2 sm:flex-row sm:gap-6">
              <button
                id="dynamic-flow-open-dashboard"
                type="button"
                onClick={() => onViewChange('dashboard')}
                className="type-control inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#354CE1] px-7 py-3.5 text-white shadow-lg shadow-[#354CE1]/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#283DBF] hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#354CE1]"
              >
                {copy.hero.primaryCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                id="dynamic-flow-contact"
                type="button"
                onClick={() => onViewChange('contact')}
                className="type-control inline-flex min-h-12 items-center justify-center rounded-full border border-slate-200 bg-white/80 px-7 py-3.5 text-slate-800 shadow-xs backdrop-blur-md transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#354CE1]"
              >
                {copy.hero.secondaryCta}
              </button>
            </div>
          </div>

          <div className="mt-16 md:mt-24">
            <HeroFlowVisual copy={copy} />
          </div>

          {/* Metrics Bar */}
          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-4 gap-3 border-t border-slate-100 pt-8 text-center sm:gap-6 lg:gap-10">
            <div className="min-w-0">
              <p className="type-metric whitespace-nowrap text-lg text-[#354CE1] sm:text-2xl lg:text-3xl">
                {metricsCopy.passRateVal}
              </p>
              <p className="type-caption mt-1 break-words text-slate-500">
                {metricsCopy.passRateLabel}
              </p>
            </div>
            <div className="min-w-0">
              <p className="type-metric whitespace-nowrap text-lg text-[#0F1E36] sm:text-2xl lg:text-3xl">
                {metricsCopy.speedVal}
              </p>
              <p className="type-caption mt-1 break-words text-slate-500">
                {metricsCopy.speedLabel}
              </p>
            </div>
            <div className="min-w-0">
              <p className="type-metric whitespace-nowrap text-lg text-[#0F1E36] sm:text-2xl lg:text-3xl">
                {metricsCopy.activeFlowsVal}
              </p>
              <p className="type-caption mt-1 break-words text-slate-500">
                {metricsCopy.activeFlowsLabel}
              </p>
            </div>
            <div className="min-w-0">
              <p className="type-metric whitespace-nowrap text-lg text-emerald-600 sm:text-2xl lg:text-3xl">
                {metricsCopy.zeroCodeVal}
              </p>
              <p className="type-caption mt-1 break-words text-slate-500">
                {metricsCopy.zeroCodeLabel}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION (WHY DYNAMIC FLOW) */}
      <section className="relative bg-[#F6F8FB] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="type-label text-[#354CE1] uppercase tracking-wider">{copy.benefits.eyebrow}</p>
            <h2 className="type-section-title mt-4 text-balance text-[#0F1E36] font-extrabold">
              {copy.benefits.title}
            </h2>
            <p className="type-body mt-5 text-slate-600">{copy.benefits.description}</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {DYNAMIC_FLOW_BENEFIT_IDS.map((benefitId) => {
              const Icon = BENEFIT_ICONS[benefitId];
              const benefit = copy.benefits.items[benefitId];

              return (
                <article
                  key={benefitId}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-7 shadow-xs backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#354CE1]/30 hover:shadow-xl"
                >
                  <div
                    className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#354CE1]/5 blur-2xl transition-all group-hover:bg-[#354CE1]/15"
                    aria-hidden="true"
                  />
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF1FF] text-[#354CE1] transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="type-card-title mt-6 text-[#0F1E36] font-bold">{benefit.title}</h3>
                  <p className="type-body-sm mt-3 text-slate-600 leading-relaxed">{benefit.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4-STAGE WORKFLOW DEEP DIVE */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-4xl text-center">
            <p className="type-label text-[#354CE1] uppercase tracking-wider">{copy.workflow.eyebrow}</p>
            <h2 className="type-section-title mt-4 text-balance text-[#0F1E36] font-extrabold">
              {copy.workflow.title}
            </h2>
            <p className="type-body mx-auto mt-5 max-w-3xl text-slate-600">
              {copy.workflow.description}
            </p>
          </div>

          <div className="mt-16 space-y-20 lg:mt-24 lg:space-y-28">
            {DYNAMIC_FLOW_STAGE_IDS.map((stageId, index) => {
              const stage = copy.workflow.stages[stageId];
              const Icon = STAGE_ICONS[stageId];
              const style = STAGE_STYLES[stageId];
              const visualFirst = index % 2 === 1;

              return (
                <article
                  key={stageId}
                  className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16"
                >
                  <div
                    className={
                      visualFirst
                        ? 'lg:order-2 lg:col-span-5'
                        : 'lg:col-span-5'
                    }
                  >
                    <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${style.soft} ${style.icon}`}>
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <p className={`type-label mt-6 font-bold tracking-wider ${style.icon}`}>{stage.eyebrow}</p>
                    <h3 className="type-section-title-compact mt-3 text-balance text-[#0F1E36] font-extrabold">
                      {stage.title}
                    </h3>
                    <p className="type-body mt-4 text-slate-600 leading-relaxed">{stage.description}</p>
                    <ul className="mt-8 space-y-3.5">
                      {stage.points.map((point) => (
                        <li key={point} className="type-body-sm flex items-start gap-3 text-slate-700">
                          <span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${style.marker}`} aria-hidden="true" />
                          <span className="font-medium">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className={
                      visualFirst
                        ? 'lg:order-1 lg:col-span-7'
                        : 'lg:col-span-7'
                    }
                  >
                    <StageVisual stageId={stageId} copy={copy} />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SYNERGY WITH INTERFACE STUDIO SECTION */}
      <section className="relative overflow-hidden bg-[#5B6DFF] py-20 text-white lg:py-28">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-[#354CE1]/45 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-5xl text-center">
            <span className="type-label inline-flex rounded-full bg-white/12 px-3.5 py-2 uppercase text-white ring-1 ring-white/20">
              {copy.studio.ecosystemLabel}
            </span>
            <p className="type-label mt-6 uppercase text-white/70">
              {copy.studio.eyebrow}
            </p>
            <h2 className="type-section-title mt-4 text-balance text-white">
              {copy.studio.title}
            </h2>
            <p className="type-body mx-auto mt-5 max-w-3xl text-white/80">
              {copy.studio.description}
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl items-stretch gap-5 lg:grid-cols-[1fr_auto_1fr]">
            <article className="rounded-[1.75rem] bg-white p-7 text-[#0F1E36] shadow-xl shadow-[#354CE1]/15">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EEF1FF] text-[#354CE1]">
                <Network className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="type-label mt-6 uppercase text-[#354CE1]">
                {copy.studio.flowLabel}
              </p>
              <h3 className="type-card-title mt-2">
                {copy.studio.flowTitle}
              </h3>
              <p className="type-body-sm mt-3 leading-relaxed text-slate-600">
                {copy.studio.flowDescription}
              </p>
              <button
                type="button"
                onClick={() => onViewChange('dynamic-flow')}
                className="type-control mt-6 inline-flex items-center gap-2 font-semibold text-[#354CE1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#354CE1]"
              >
                {copy.studio.flowCta}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </article>

            <div className="flex items-center justify-center py-1 lg:py-0">
              <span className="type-caption inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 font-semibold text-[#354CE1] shadow-lg">
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                {copy.studio.connectionLabel}
              </span>
            </div>

            <article className="rounded-[1.75rem] bg-[#0F1E36] p-7 text-white shadow-xl shadow-[#354CE1]/15 ring-1 ring-white/10">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-[#AAB3FF]">
                <LayoutDashboard className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="type-label mt-6 uppercase text-[#AAB3FF]">
                {copy.studio.studioLabel}
              </p>
              <h3 className="type-card-title mt-2">
                {copy.studio.studioTitle}
              </h3>
              <p className="type-body-sm mt-3 leading-relaxed text-white/70">
                {copy.studio.studioDescription}
              </p>
              <button
                type="button"
                onClick={() => onViewChange('interface-studio')}
                className="type-control mt-6 inline-flex items-center gap-2 font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {copy.studio.studioCta}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </article>
          </div>
        </div>
      </section>

      {/* SECURITY & ENTERPRISE COMPLIANCE RIBBON */}
      <section className="border-b border-slate-100 bg-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-slate-50 p-6 border border-slate-200/80">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                <Lock className="h-5 w-5" />
              </span>
              <div>
                <p className="type-body-sm font-bold text-slate-900">{copy.security.title}</p>
                <p className="type-caption text-slate-500">{copy.security.description}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onViewChange('security')}
              className="type-control inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100"
            >
              {copy.security.cta} <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="type-label text-[#354CE1] uppercase tracking-wider">{copy.faq.eyebrow}</p>
            <h2 className="type-section-title-compact mt-4 text-balance text-[#0F1E36] font-extrabold">
              {copy.faq.title}
            </h2>
            <p className="type-body mt-4 text-slate-600 leading-relaxed">{copy.faq.description}</p>
          </div>

          <div className="lg:col-span-8">
            {DYNAMIC_FLOW_FAQ_IDS.map((faqId) => {
              const item = copy.faq.items[faqId];
              const isOpen = expandedFaq === faqId;
              const buttonId = `dynamic-flow-faq-button-${faqId}`;
              const panelId = `dynamic-flow-faq-panel-${faqId}`;

              return (
                <div key={faqId} className="border-b border-slate-200/80 py-2 last:border-b-0">
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setExpandedFaq(isOpen ? null : faqId)}
                      className="type-card-title flex w-full items-center justify-between gap-5 py-4 text-left font-bold text-[#0F1E36] transition-colors hover:text-[#354CE1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#354CE1]"
                    >
                      <span>{item.question}</span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#354CE1]' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>
                  {isOpen && (
                    <div id={panelId} role="region" aria-labelledby={buttonId} className="pb-6">
                      <p className="type-body max-w-3xl text-slate-600 leading-relaxed">{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#FAFBFD] pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#5B6DFF] px-7 py-10 text-white shadow-xl shadow-[#354CE1]/15 sm:px-10 lg:px-14 lg:py-14">
            <div
              className="pointer-events-none absolute -right-16 -top-24 h-80 w-80 rounded-full bg-white/10 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative max-w-3xl">
              <p className="type-label text-white/75">{copy.cta.eyebrow}</p>
              <h2 className="type-section-title-compact mt-4 text-balance text-white">
                {copy.cta.title}
              </h2>
              <p className="type-body mt-5 max-w-2xl text-white/80">{copy.cta.description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  id="dynamic-flow-cta-dashboard"
                  type="button"
                  onClick={() => onViewChange('dashboard')}
                  className="type-control inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-[#354CE1] shadow-md transition-colors hover:bg-[#F6F8FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {copy.cta.primaryCta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  id="dynamic-flow-cta-contact"
                  type="button"
                  onClick={() => onViewChange('contact')}
                  className="type-control inline-flex min-h-12 items-center justify-center rounded-full bg-white/10 px-6 py-3 text-white ring-1 ring-white/30 transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {copy.cta.secondaryCta}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
