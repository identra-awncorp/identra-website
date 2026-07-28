/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import type { ReactElement } from 'react';
import {
  ArrowRight,
  Blocks,
  BookOpen,
  Bot,
  Braces,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  CircleDot,
  ClipboardCheck,
  Code2,
  FileSearch,
  Fingerprint,
  GitBranch,
  LayoutTemplate,
  Link2,
  LockKeyhole,
  Network,
  Plug,
  Radio,
  Route,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Workflow,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  PLATFORM_FAQ_IDS,
  PLATFORM_FOUNDATION_IDS,
  platformTranslations,
} from '../translations/PlatformPageTranslations';
import {
  PLATFORM_JOURNEY_STAGES,
  PLATFORM_PRODUCT_VIEWS,
} from '../types/platformProducts';
import type {
  PlatformJourneyStageId,
  PlatformProductId,
} from '../types/platformProducts';
import type { AppView } from '../types/routes';
import { getLocalizedRecord } from '../utils/i18nRuntime';

interface PlatformPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

const PRODUCT_ICONS: Record<PlatformProductId, LucideIcon> = {
  interfaceStudio: LayoutTemplate,
  dynamicFlow: GitBranch,
  relay: Link2,
  workflows: Workflow,
  caseManagement: BriefcaseBusiness,
  copilot: Bot,
  passiveSignals: Radio,
  graph: Network,
  marketplace: Blocks,
};

const STAGE_ICONS: Record<PlatformJourneyStageId, LucideIcon> = {
  collect: Fingerprint,
  orchestrate: Route,
  analyze: ShieldCheck,
  extend: Plug,
};

const STAGE_STYLES: Record<
  PlatformJourneyStageId,
  { icon: string; soft: string; line: string }
> = {
  collect: {
    icon: 'text-[#354CE1]',
    soft: 'bg-[#EEF1FF]',
    line: 'bg-[#354CE1]',
  },
  orchestrate: {
    icon: 'text-emerald-700',
    soft: 'bg-emerald-50',
    line: 'bg-emerald-600',
  },
  analyze: {
    icon: 'text-amber-700',
    soft: 'bg-amber-50',
    line: 'bg-amber-500',
  },
  extend: {
    icon: 'text-cyan-700',
    soft: 'bg-cyan-50',
    line: 'bg-cyan-600',
  },
};

const FOUNDATION_ICONS: Record<
  (typeof PLATFORM_FOUNDATION_IDS)[number],
  LucideIcon
> = {
  noCode: SlidersHorizontal,
  integration: Braces,
  privacy: LockKeyhole,
  audit: FileSearch,
};

type PreviewProps = {
  copy: (typeof platformTranslations)['en'];
};

function PreviewHeader({
  title,
  description,
  status,
  statusLabel,
}: {
  title: string;
  description: string;
  status: 'ready' | 'live';
  statusLabel: string;
}) {
  return (
    <div className="flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="type-card-title text-slate-950">{title}</p>
        <p className="type-body-sm mt-1 max-w-xl text-slate-500">{description}</p>
      </div>
      <span
        className={`type-label inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 ${
          status === 'live'
            ? 'bg-emerald-50 text-emerald-700'
            : 'bg-[#EEF1FF] text-[#354CE1]'
        }`}
      >
        <CircleDot className="h-3.5 w-3.5" aria-hidden="true" />
        {statusLabel}
      </span>
    </div>
  );
}

function CollectPreview({ copy }: PreviewProps) {
  const visual = copy.visuals.collect;
  const nodes = [
    { label: visual.start, icon: LayoutTemplate },
    { label: visual.credential, icon: Fingerprint },
    { label: visual.risk, icon: GitBranch },
  ];

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,30,54,0.08)]">
      <PreviewHeader
        title={visual.workspace}
        description={copy.stages.collect.previewDescription}
        status="ready"
        statusLabel={visual.draft}
      />
      <div className="px-5 py-6">
        <div className="relative space-y-3">
          <div className="absolute bottom-5 left-5 top-5 w-px bg-slate-200" aria-hidden="true" />
          {nodes.map((node, index) => {
            const Icon = node.icon;
            return (
              <div
                key={node.label}
                className="relative flex min-h-12 items-center gap-4 rounded-xl border border-slate-200 bg-[#FAFBFD] px-4 py-3"
              >
                <span className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#354CE1] shadow-sm">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="type-body-sm font-semibold text-slate-800">{node.label}</span>
                <span className="type-technical ml-auto text-slate-400">
                  0{index + 1}
                </span>
              </div>
            );
          })}
        </div>
        <div className="mt-5 grid grid-cols-1 gap-2 pl-0 sm:grid-cols-2 sm:pl-12">
          <div className="flex items-center gap-2 border-l-2 border-emerald-500 px-3 py-2">
            <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" />
            <span className="type-caption text-slate-600">{visual.approve}</span>
          </div>
          <div className="flex items-center gap-2 border-l-2 border-amber-500 px-3 py-2">
            <ShieldCheck className="h-4 w-4 text-amber-600" aria-hidden="true" />
            <span className="type-caption text-slate-600">{visual.stepUp}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrchestratePreview({ copy }: PreviewProps) {
  const visual = copy.visuals.orchestrate;

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,30,54,0.08)]">
      <PreviewHeader
        title={visual.workspace}
        description={copy.stages.orchestrate.previewDescription}
        status="live"
        statusLabel={visual.running}
      />
      <div className="px-5 py-6">
        <div className="flex items-start gap-3 pb-5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            <Workflow className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="type-label text-slate-500">{visual.rule}</p>
            <code className="type-technical mt-1 block overflow-x-auto text-slate-900">
              {visual.ruleValue}
            </code>
          </div>
          <span className="type-caption ml-auto rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700">
            {visual.approved}
          </span>
        </div>
        <div className="divide-y divide-slate-200">
          <div className="flex items-center gap-3 py-4">
            <ClipboardCheck className="h-4 w-4 text-slate-500" aria-hidden="true" />
            <span className="type-body-sm text-slate-700">{visual.caseQueue}</span>
            <span className="type-caption ml-auto text-amber-700">{visual.review}</span>
          </div>
          <div className="flex items-center gap-3 py-4">
            <Sparkles className="h-4 w-4 text-[#354CE1]" aria-hidden="true" />
            <span className="type-body-sm text-slate-700">{visual.copilot}</span>
            <ArrowRight className="ml-auto h-4 w-4 text-slate-400" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyzePreview({ copy }: PreviewProps) {
  const visual = copy.visuals.analyze;
  const signals = [
    { label: visual.device, value: '08', color: 'bg-emerald-500' },
    { label: visual.network, value: '24', color: 'bg-amber-500' },
    { label: visual.behavior, value: '71', color: 'bg-rose-500' },
  ];

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,30,54,0.08)]">
      <PreviewHeader
        title={visual.workspace}
        description={copy.stages.analyze.previewDescription}
        status="live"
        statusLabel={visual.monitoring}
      />
      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="px-5 py-3 lg:border-b-0">
          {signals.map((signal) => (
            <div key={signal.label} className="flex items-center gap-3 py-4">
              <span className={`h-2.5 w-2.5 rounded-full ${signal.color}`} aria-hidden="true" />
              <span className="type-body-sm text-slate-700">{signal.label}</span>
              <span className="type-technical ml-auto text-slate-500">{signal.value}</span>
            </div>
          ))}
        </div>
        <div className="relative min-h-56 overflow-hidden bg-[#FAFBFD] px-5 py-5">
          <div className="flex items-center justify-between">
            <p className="type-label text-slate-500">{visual.graph}</p>
            <p className="type-caption text-rose-700">{visual.blocked}</p>
          </div>
          <div className="relative mx-auto mt-5 h-36 max-w-64" aria-hidden="true">
            <span className="absolute left-[20%] top-[28%] h-px w-[42%] origin-left rotate-[20deg] bg-slate-300" />
            <span className="absolute left-[28%] top-[62%] h-px w-[45%] origin-left -rotate-[18deg] bg-slate-300" />
            <span className="absolute left-[48%] top-[48%] h-px w-[30%] origin-left rotate-[48deg] bg-rose-300" />
            <span className="absolute left-[12%] top-[18%] flex h-10 w-10 items-center justify-center rounded-full bg-[#354CE1] text-white shadow-md">
              <Fingerprint className="h-4 w-4" />
            </span>
            <span className="absolute left-[45%] top-[38%] flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-700 shadow-md">
              <Network className="h-5 w-5" />
            </span>
            <span className="absolute right-[6%] top-[14%] flex h-9 w-9 items-center justify-center rounded-full bg-amber-500 text-white shadow-md">
              <Radio className="h-4 w-4" />
            </span>
            <span className="absolute bottom-[4%] right-[16%] flex h-11 w-11 items-center justify-center rounded-full bg-rose-600 text-white shadow-md">
              <ShieldCheck className="h-5 w-5" />
            </span>
          </div>
          <p className="type-caption text-center text-slate-500">{visual.linked}</p>
        </div>
      </div>
    </div>
  );
}

function ExtendPreview({ copy }: PreviewProps) {
  const visual = copy.visuals.extend;
  const integrations = [
    { label: 'API', icon: Braces },
    { label: 'SDK', icon: Code2 },
    { label: visual.webhook, icon: Radio },
    { label: visual.marketplace, icon: Blocks },
  ];

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,30,54,0.08)]">
      <PreviewHeader
        title={visual.workspace}
        description={copy.stages.extend.previewDescription}
        status="ready"
        statusLabel={visual.connected}
      />
      <div className="px-5 py-6">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
            <Plug className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="type-label text-slate-500">{visual.apiEvent}</p>
            <code className="type-technical mt-1 block overflow-x-auto text-slate-900">
              decision.completed
            </code>
          </div>
          <Check className="ml-auto h-4 w-4 text-emerald-600" aria-hidden="true" />
        </div>
        <div className="grid grid-cols-2">
          {integrations.map((integration) => {
            const Icon = integration.icon;
            return (
              <div key={integration.label} className="flex min-h-24 items-center gap-3 px-4 py-4">
                <Icon className="h-4 w-4 shrink-0 text-cyan-700" aria-hidden="true" />
                <span className="type-caption text-slate-700">{integration.label}</span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-2 pt-4 text-slate-500">
          <BookOpen className="h-4 w-4" aria-hidden="true" />
          <span className="type-caption">{visual.documentation}</span>
        </div>
      </div>
    </div>
  );
}

const STAGE_PREVIEWS: Record<
  PlatformJourneyStageId,
  (props: PreviewProps) => ReactElement
> = {
  collect: CollectPreview,
  orchestrate: OrchestratePreview,
  analyze: AnalyzePreview,
  extend: ExtendPreview,
};

export default function PlatformPage({
  onOpenSandbox,
  onViewChange,
}: PlatformPageProps) {
  const { language } = useLanguage();
  const copy = getLocalizedRecord(
    platformTranslations,
    language as keyof typeof platformTranslations,
    'platformTranslations',
  );
  const [expandedFaq, setExpandedFaq] = useState<
    (typeof PLATFORM_FAQ_IDS)[number] | null
  >(PLATFORM_FAQ_IDS[0]);

  const openView = (view: AppView) => {
    onViewChange?.(view);
  };

  return (
    <main
      id="platform-page-root"
      className="min-h-screen bg-[#FAFBFD] text-slate-800 antialiased selection:bg-[#354CE1]/10 selection:text-[#354CE1]"
    >
      <section
        id="platform-hero-section"
        className="border-b border-slate-200 bg-white py-20 lg:py-28"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="type-label text-[#354CE1]">{copy.hero.eyebrow}</p>
            <h1 className="type-page-title measure-display mt-4 text-balance text-[#0F1E36]">
              {copy.hero.title}
            </h1>
            <p className="type-lead measure-lead mt-6 text-slate-600">
              {copy.hero.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                id="platform-explore-btn"
                href="#platform-products"
                className="type-control inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#354CE1] px-6 py-3 text-white shadow-sm transition-colors hover:bg-[#283DBF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#354CE1]"
              >
                {copy.hero.primaryCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <button
                id="platform-demo-btn"
                type="button"
                onClick={onOpenSandbox}
                className="type-control inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#354CE1]"
              >
                {copy.hero.secondaryCta}
              </button>
            </div>
            <div className="mt-10 pt-6">
              <p className="type-label text-slate-500">{copy.hero.capabilitiesLabel}</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {copy.hero.capabilities.map((capability) => (
                  <li key={capability} className="type-body-sm flex items-start gap-2 text-slate-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <figure
            className="overflow-hidden rounded-3xl border border-slate-200 bg-[#FAFBFD] shadow-[0_24px_70px_rgba(15,30,54,0.10)] lg:col-span-6"
            aria-label={copy.hero.architectureAriaLabel}
          >
            <figcaption className="border-b border-slate-200 bg-white px-6 py-5">
              <p className="type-card-title text-slate-950">{copy.hero.architectureTitle}</p>
              <p className="type-body-sm mt-1 text-slate-500">
                {copy.hero.architectureDescription}
              </p>
            </figcaption>
            <div>
              {PLATFORM_JOURNEY_STAGES.map((stage, index) => {
                const StageIcon = STAGE_ICONS[stage.id];
                const stageCopy = copy.stages[stage.id];
                const style = STAGE_STYLES[stage.id];

                return (
                  <a
                    key={stage.id}
                    href={`#platform-stage-${stage.id}`}
                    className="group relative grid min-h-28 grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-slate-200 px-5 py-4 last:border-b-0 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#354CE1]"
                  >
                    {index < PLATFORM_JOURNEY_STAGES.length - 1 && (
                      <span
                        className="absolute bottom-[-18px] left-[38px] z-10 h-9 w-px bg-slate-300"
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${style.soft} ${style.icon}`}
                    >
                      <StageIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="type-caption block text-slate-500">{stageCopy.eyebrow}</span>
                      <span className="type-card-title mt-1 block text-slate-950">
                        {stageCopy.title}
                      </span>
                      <span className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
                        {stage.products.map((productId) => (
                          <span key={productId} className="type-caption text-slate-500">
                            {copy.products[productId].title}
                          </span>
                        ))}
                      </span>
                    </span>
                    <ArrowRight
                      className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-[#354CE1] motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                  </a>
                );
              })}
            </div>
          </figure>
        </div>
      </section>

      <section id="platform-products" className="bg-[#FAFBFD] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="type-label text-[#354CE1]">{copy.journey.eyebrow}</p>
          <h2 className="type-section-title mt-4 max-w-4xl text-balance text-[#0F1E36]">
            {copy.journey.title}
          </h2>
          <p className="type-lead measure-lead mt-5 text-slate-600">
            {copy.journey.description}
          </p>
        </div>
      </section>

      {PLATFORM_JOURNEY_STAGES.map((stage, stageIndex) => {
        const stageCopy = copy.stages[stage.id];
        const style = STAGE_STYLES[stage.id];
        const StageIcon = STAGE_ICONS[stage.id];
        const StagePreview = STAGE_PREVIEWS[stage.id];
        const isPreviewFirst = stageIndex % 2 === 1;
        const hasStickyPreview = stage.id !== 'extend';

        return (
          <section
            key={stage.id}
            id={`platform-stage-${stage.id}`}
            className={`border-t border-slate-200 py-16 lg:py-24 ${
              stageIndex % 2 === 0 ? 'bg-white' : 'bg-[#F6F8FB]'
            }`}
          >
            <div className="mx-auto max-w-7xl px-6">
              <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
                <div className={isPreviewFirst ? 'lg:order-2 lg:col-span-5' : 'lg:col-span-5'}>
                  <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl ${style.soft} ${style.icon}`}>
                    <StageIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p className={`type-label ${style.icon}`}>{stageCopy.eyebrow}</p>
                  <h2 className="type-section-title-compact mt-3 text-[#0F1E36]">
                    {stageCopy.title}
                  </h2>
                  <p className="type-body mt-4 max-w-xl text-slate-600">{stageCopy.description}</p>

                  <div className="mt-8 space-y-3">
                    {stage.products.map((productId) => {
                      const ProductIcon = PRODUCT_ICONS[productId];
                      const product = copy.products[productId];

                      return (
                        <button
                          type="button"
                          key={productId}
                          onClick={() => openView(PLATFORM_PRODUCT_VIEWS[productId])}
                          className="group w-full cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-[0_8px_24px_rgba(15,30,54,0.05)] transition duration-200 hover:-translate-y-0.5 hover:border-[#354CE1]/40 hover:shadow-[0_14px_34px_rgba(15,30,54,0.10)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#354CE1] motion-reduce:transform-none motion-reduce:transition-none"
                        >
                          <div className="flex items-start gap-4">
                            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${style.soft} ${style.icon}`}>
                              <ProductIcon className="h-4 w-4" aria-hidden="true" />
                            </span>
                            <div className="min-w-0">
                              <h3 className="type-card-title text-slate-950">{product.title}</h3>
                              <p className="type-body-sm mt-2 text-slate-600">{product.description}</p>
                              <span className="type-control mt-4 inline-flex items-center gap-2 text-[#354CE1] transition-colors group-hover:text-[#283DBF] motion-reduce:transition-none">
                                {copy.common.productCta}
                                <ArrowRight
                                  className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
                                  aria-hidden="true"
                                />
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {stage.id === 'extend' && (
                    <button
                      type="button"
                      onClick={() => openView('docs')}
                      className="type-control mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-slate-800 transition-colors hover:border-[#354CE1] hover:text-[#354CE1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#354CE1]"
                    >
                      <BookOpen className="h-4 w-4" aria-hidden="true" />
                      {copy.common.docsCta}
                    </button>
                  )}
                </div>

                <div
                  className={`${isPreviewFirst ? 'lg:order-1 lg:col-span-7' : 'lg:col-span-7'} ${
                    hasStickyPreview ? 'lg:sticky lg:top-24 lg:self-start' : ''
                  }`}
                >
                  <p className="type-label mb-3 text-slate-500">{stageCopy.previewTitle}</p>
                  <StagePreview copy={copy} />
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="border-y border-slate-200 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="type-label text-[#354CE1]">{copy.foundations.eyebrow}</p>
            <h2 className="type-section-title-compact mt-4 text-[#0F1E36]">{copy.foundations.title}</h2>
            <p className="type-body mt-4 text-slate-600">{copy.foundations.description}</p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {PLATFORM_FOUNDATION_IDS.map((foundationId, index) => {
              const FoundationIcon = FOUNDATION_ICONS[foundationId];
              const foundation = copy.foundations.items[foundationId];

              return (
                <div
                  key={foundationId}
                  className={`py-6 sm:px-6 lg:py-8`}
                >
                  <FoundationIcon className="h-5 w-5 text-[#354CE1]" aria-hidden="true" />
                  <h3 className="type-card-title mt-4 text-slate-950">{foundation.title}</h3>
                  <p className="type-body-sm mt-2 text-slate-600">{foundation.description}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => openView('security')}
              className="type-control inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#354CE1] px-5 py-2.5 text-white transition-colors hover:bg-[#283DBF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#354CE1]"
            >
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              {copy.foundations.securityCta}
            </button>
            <button
              type="button"
              onClick={() => openView('docs')}
              className="type-control inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-slate-800 transition-colors hover:border-[#354CE1] hover:text-[#354CE1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#354CE1]"
            >
              <Code2 className="h-4 w-4" aria-hidden="true" />
              {copy.foundations.documentationCta}
            </button>
          </div>
        </div>
      </section>

      <section id="platform-faqs-section" className="bg-[#F6F8FB] py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="type-label text-[#354CE1]">{copy.faq.eyebrow}</p>
            <h2 className="type-section-title-compact mt-4 text-[#0F1E36]">{copy.faq.title}</h2>
            <p className="type-body mt-4 text-slate-600">{copy.faq.description}</p>
            <button
              type="button"
              onClick={() => openView('contact')}
              className="type-control mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#354CE1] px-5 py-2.5 text-white transition-colors hover:bg-[#283DBF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#354CE1]"
            >
              {copy.faq.contactCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <div className="lg:col-span-8">
            {PLATFORM_FAQ_IDS.map((faqId) => {
              const item = copy.faq.items[faqId];
              const isOpen = expandedFaq === faqId;
              const panelId = `platform-faq-panel-${faqId}`;
              const buttonId = `platform-faq-button-${faqId}`;

              return (
                <div key={faqId}>
                  <h3 className="type-card-title">
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setExpandedFaq(isOpen ? null : faqId)}
                      className="type-card-title flex w-full items-center justify-between gap-4 py-5 text-left text-slate-950 hover:text-[#354CE1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#354CE1]"
                    >
                      <span>{item.question}</span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 transition-transform motion-reduce:transition-none ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>
                  {isOpen && (
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="pb-6"
                    >
                      <p className="type-body max-w-3xl text-slate-600">{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
