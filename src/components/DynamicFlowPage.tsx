/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  ArrowRight,
  Blocks,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  GitBranch,
  LayoutDashboard,
  ListChecks,
  Network,
  PencilRuler,
  RefreshCw,
  Rocket,
  Route,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  DYNAMIC_FLOW_BENEFIT_IDS,
  DYNAMIC_FLOW_FAQ_IDS,
  DYNAMIC_FLOW_STAGE_IDS,
  DYNAMIC_FLOW_TRANSLATIONS,
} from '../translations/DynamicFlowPageTranslations';
import type {
  DynamicFlowBenefitId,
  DynamicFlowPageCopy,
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
  }
> = {
  compose: {
    icon: 'text-[#354CE1]',
    soft: 'bg-[#EEF1FF]',
    marker: 'bg-[#354CE1]',
    surface: 'bg-[#F7F8FF]',
  },
  adapt: {
    icon: 'text-violet-700',
    soft: 'bg-violet-50',
    marker: 'bg-violet-600',
    surface: 'bg-violet-50/60',
  },
  prove: {
    icon: 'text-emerald-700',
    soft: 'bg-emerald-50',
    marker: 'bg-emerald-600',
    surface: 'bg-emerald-50/60',
  },
  operate: {
    icon: 'text-cyan-700',
    soft: 'bg-cyan-50',
    marker: 'bg-cyan-600',
    surface: 'bg-cyan-50/60',
  },
};

function HeroFlowVisual({ copy }: { copy: DynamicFlowPageCopy }) {
  return (
    <figure
      aria-label={copy.hero.visualAriaLabel}
      className="relative overflow-hidden rounded-[2rem] bg-white p-5 shadow-lg shadow-[#0F1E36]/10 sm:p-7"
    >
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#5B6DFF]/12 blur-3xl"
        aria-hidden="true"
      />
      <figcaption className="relative flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="type-label text-[#354CE1]">{copy.hero.visualEyebrow}</p>
          <p className="type-card-title mt-2 text-[#0F1E36]">{copy.hero.visualTitle}</p>
        </div>
        <span className="type-caption inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 font-semibold text-emerald-700">
          <CircleDot className="h-3.5 w-3.5" aria-hidden="true" />
          {copy.hero.visualStatus}
        </span>
      </figcaption>

      <div className="relative mt-7">
        <div className="mx-auto flex w-fit items-center gap-3 rounded-2xl bg-[#0F1E36] px-4 py-3 text-white shadow-md">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="type-control">{copy.hero.start}</span>
        </div>
        <div className="mx-auto h-7 w-px bg-slate-300" aria-hidden="true" />

        <div className="mx-auto flex max-w-sm items-center gap-3 rounded-2xl bg-[#F6F8FB] px-4 py-4 shadow-sm">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#354CE1] shadow-sm">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="type-body-sm font-semibold text-slate-800">{copy.hero.verify}</span>
          <CheckCircle2 className="ml-auto h-4 w-4 text-emerald-600" aria-hidden="true" />
        </div>
        <div className="mx-auto h-7 w-px bg-slate-300" aria-hidden="true" />

        <div className="mx-auto flex max-w-sm items-center gap-3 rounded-2xl bg-[#EEF1FF] px-4 py-4 shadow-sm">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#354CE1] shadow-sm">
            <GitBranch className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="type-body-sm font-semibold text-[#0F1E36]">{copy.hero.decide}</span>
        </div>

        <div className="mx-auto hidden h-6 w-px bg-slate-300 sm:block" aria-hidden="true" />
        <div className="mx-auto hidden h-px w-[68%] bg-slate-300 sm:block" aria-hidden="true" />
        <div className="mt-3 grid gap-3 sm:mt-0 sm:grid-cols-3">
          {[
            {
              label: copy.hero.continue,
              className: 'bg-emerald-50 text-emerald-800',
              marker: 'bg-emerald-500',
            },
            {
              label: copy.hero.requestMore,
              className: 'bg-amber-50 text-amber-800',
              marker: 'bg-amber-500',
            },
            {
              label: copy.hero.review,
              className: 'bg-[#F6F8FB] text-slate-700',
              marker: 'bg-slate-500',
            },
          ].map((branch) => (
            <div key={branch.label} className="relative sm:pt-6">
              <span
                className="absolute left-1/2 top-0 hidden h-6 w-px -translate-x-1/2 bg-slate-300 sm:block"
                aria-hidden="true"
              />
              <div
                className={`type-caption flex min-h-16 items-center justify-center gap-2 rounded-2xl px-3 py-3 text-center font-semibold shadow-sm ${branch.className}`}
              >
                <span className={`h-2 w-2 shrink-0 rounded-full ${branch.marker}`} aria-hidden="true" />
                {branch.label}
              </div>
            </div>
          ))}
        </div>
      </div>
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
  const style = STAGE_STYLES[stageId];

  if (stageId === 'adapt') {
    return (
      <div className={`rounded-[2rem] p-5 shadow-lg shadow-[#0F1E36]/8 sm:p-7 ${style.surface}`}>
        <div className="flex items-center justify-between gap-4">
          <p className={`type-label ${style.icon}`}>{stage.visualTitle}</p>
          <span className="type-caption rounded-full bg-white px-3 py-1.5 text-slate-600 shadow-sm">
            {stage.visualStatus}
          </span>
        </div>
        <div className="mt-8 flex justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-violet-700 shadow-md">
            <GitBranch className="h-6 w-6" aria-hidden="true" />
          </span>
        </div>
        <div className="mx-auto h-7 w-px bg-violet-200" aria-hidden="true" />
        <div className="grid gap-3 sm:grid-cols-3">
          {stage.visualItems.map((item, index) => (
            <div
              key={item}
              className="flex min-h-20 items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-center shadow-sm"
            >
              <span
                className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                  index === 0
                    ? 'bg-emerald-500'
                    : index === 1
                      ? 'bg-amber-500'
                      : 'bg-violet-500'
                }`}
                aria-hidden="true"
              />
              <span className="type-body-sm font-semibold text-slate-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (stageId === 'prove') {
    return (
      <div className={`rounded-[2rem] p-5 shadow-lg shadow-[#0F1E36]/8 sm:p-7 ${style.surface}`}>
        <div className="flex items-center justify-between gap-4">
          <p className={`type-label ${style.icon}`}>{stage.visualTitle}</p>
          <span className="type-caption rounded-full bg-white px-3 py-1.5 text-emerald-700 shadow-sm">
            {stage.visualStatus}
          </span>
        </div>
        <div className="mt-7 space-y-3">
          {stage.visualItems.map((item, index) => (
            <div key={item} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4 shadow-sm">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Check className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="type-body-sm font-semibold text-slate-700">{item}</span>
              <span className="type-technical ml-auto text-slate-400">0{index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (stageId === 'operate') {
    return (
      <div className={`rounded-[2rem] p-5 shadow-lg shadow-[#0F1E36]/8 sm:p-7 ${style.surface}`}>
        <div className="flex items-center justify-between gap-4">
          <p className={`type-label ${style.icon}`}>{stage.visualTitle}</p>
          <span className="type-caption rounded-full bg-white px-3 py-1.5 text-cyan-700 shadow-sm">
            {stage.visualStatus}
          </span>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          {stage.visualItems.map((item, index) => (
            <div key={item} className="contents">
              <div className="flex min-h-20 flex-1 items-center justify-center rounded-2xl bg-white px-4 py-3 text-center shadow-sm">
                <span className="type-body-sm font-semibold text-slate-700">{item}</span>
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
    <div className={`rounded-[2rem] p-5 shadow-lg shadow-[#0F1E36]/8 sm:p-7 ${style.surface}`}>
      <div className="flex items-center justify-between gap-4">
        <p className={`type-label ${style.icon}`}>{stage.visualTitle}</p>
        <span className="type-caption rounded-full bg-white px-3 py-1.5 text-[#354CE1] shadow-sm">
          {stage.visualStatus}
        </span>
      </div>
      <div className="relative mt-7 space-y-3">
        <span className="absolute bottom-6 left-[22px] top-6 w-px bg-[#C9D0FF]" aria-hidden="true" />
        {stage.visualItems.map((item, index) => (
          <div key={item} className="relative flex items-center gap-4 rounded-2xl bg-white px-4 py-4 shadow-sm">
            <span className="z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF1FF] text-[#354CE1]">
              {index === 0 ? (
                <Blocks className="h-5 w-5" aria-hidden="true" />
              ) : index === 1 ? (
                <GitBranch className="h-5 w-5" aria-hidden="true" />
              ) : (
                <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
              )}
            </span>
            <span className="type-body-sm font-semibold text-slate-700">{item}</span>
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

  return (
    <main
      id="dynamic-flow-page-root"
      className="min-h-screen overflow-hidden bg-[#FAFBFD] text-slate-800 antialiased selection:bg-[#354CE1]/10 selection:text-[#354CE1]"
    >
      <section className="relative bg-white py-20 lg:py-28">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-[48rem] -translate-x-1/2 rounded-full bg-[#5B6DFF]/8 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="type-label text-[#354CE1]">{copy.hero.eyebrow}</p>
            <h1 className="type-page-title measure-display mt-4 text-balance text-[#0F1E36]">
              {copy.hero.title}
            </h1>
            <p className="type-lead measure-lead mt-6 text-slate-600">
              {copy.hero.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                id="dynamic-flow-open-dashboard"
                type="button"
                onClick={() => onViewChange('dashboard')}
                className="type-control inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#354CE1] px-6 py-3 text-white shadow-md transition-colors hover:bg-[#283DBF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#354CE1]"
              >
                {copy.hero.primaryCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                id="dynamic-flow-contact"
                type="button"
                onClick={() => onViewChange('contact')}
                className="type-control inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 text-slate-800 shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-slate-50 hover:ring-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#354CE1]"
              >
                {copy.hero.secondaryCta}
              </button>
            </div>
          </div>
          <div className="lg:col-span-6">
            <HeroFlowVisual copy={copy} />
          </div>
        </div>
      </section>

      <section className="bg-[#F6F8FB] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="type-label text-[#354CE1]">{copy.benefits.eyebrow}</p>
            <h2 className="type-section-title mt-4 text-balance text-[#0F1E36]">
              {copy.benefits.title}
            </h2>
            <p className="type-body mt-5 text-slate-600">{copy.benefits.description}</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {DYNAMIC_FLOW_BENEFIT_IDS.map((benefitId) => {
              const Icon = BENEFIT_ICONS[benefitId];
              const benefit = copy.benefits.items[benefitId];

              return (
                <article
                  key={benefitId}
                  className="rounded-3xl bg-white p-6 shadow-sm shadow-[#0F1E36]/6 transition duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EEF1FF] text-[#354CE1]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="type-card-title mt-5 text-[#0F1E36]">{benefit.title}</h3>
                  <p className="type-body-sm mt-3 text-slate-600">{benefit.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-4xl text-center">
            <p className="type-label text-[#354CE1]">{copy.workflow.eyebrow}</p>
            <h2 className="type-section-title mt-4 text-balance text-[#0F1E36]">
              {copy.workflow.title}
            </h2>
            <p className="type-body mx-auto mt-5 max-w-3xl text-slate-600">
              {copy.workflow.description}
            </p>
          </div>

          <div className="mt-14 space-y-16 lg:mt-20 lg:space-y-24">
            {DYNAMIC_FLOW_STAGE_IDS.map((stageId, index) => {
              const stage = copy.workflow.stages[stageId];
              const Icon = STAGE_ICONS[stageId];
              const style = STAGE_STYLES[stageId];
              const visualFirst = index % 2 === 1;

              return (
                <article
                  key={stageId}
                  className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16"
                >
                  <div
                    className={
                      visualFirst
                        ? 'lg:order-2 lg:col-span-5'
                        : 'lg:col-span-5'
                    }
                  >
                    <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${style.soft} ${style.icon}`}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <p className={`type-label mt-6 ${style.icon}`}>{stage.eyebrow}</p>
                    <h3 className="type-section-title-compact mt-3 text-balance text-[#0F1E36]">
                      {stage.title}
                    </h3>
                    <p className="type-body mt-4 text-slate-600">{stage.description}</p>
                    <ul className="mt-7 space-y-3">
                      {stage.points.map((point) => (
                        <li key={point} className="type-body-sm flex items-start gap-3 text-slate-700">
                          <span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${style.marker}`} aria-hidden="true" />
                          <span>{point}</span>
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

      <section className="bg-[#EEF1FF] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-4xl text-center">
            <p className="type-label text-[#354CE1]">{copy.studio.eyebrow}</p>
            <h2 className="type-section-title mt-4 text-balance text-[#0F1E36]">
              {copy.studio.title}
            </h2>
            <p className="type-body mx-auto mt-5 max-w-3xl text-slate-600">
              {copy.studio.description}
            </p>
          </div>

          <div className="relative mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
            <article className="rounded-3xl bg-white p-7 shadow-lg shadow-[#354CE1]/8">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EEF1FF] text-[#354CE1]">
                <Network className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="type-label mt-6 text-[#354CE1]">{copy.studio.flowLabel}</p>
              <h3 className="type-card-title mt-2 text-[#0F1E36]">{copy.studio.flowTitle}</h3>
              <p className="type-body-sm mt-3 text-slate-600">{copy.studio.flowDescription}</p>
            </article>

            <div className="flex items-center justify-center py-1 lg:py-0">
              <div className="flex items-center gap-2 rounded-full bg-[#354CE1] px-4 py-2 text-white shadow-md">
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                <span className="type-caption font-semibold">{copy.studio.connectionLabel}</span>
              </div>
            </div>

            <article className="rounded-3xl bg-white p-7 shadow-lg shadow-[#354CE1]/8">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-700">
                <LayoutDashboard className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="type-label mt-6 text-violet-700">{copy.studio.studioLabel}</p>
              <h3 className="type-card-title mt-2 text-[#0F1E36]">{copy.studio.studioTitle}</h3>
              <p className="type-body-sm mt-3 text-slate-600">{copy.studio.studioDescription}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="type-label text-[#354CE1]">{copy.faq.eyebrow}</p>
            <h2 className="type-section-title-compact mt-4 text-balance text-[#0F1E36]">
              {copy.faq.title}
            </h2>
            <p className="type-body mt-4 text-slate-600">{copy.faq.description}</p>
          </div>
          <div className="lg:col-span-8">
            {DYNAMIC_FLOW_FAQ_IDS.map((faqId) => {
              const item = copy.faq.items[faqId];
              const isOpen = expandedFaq === faqId;
              const buttonId = `dynamic-flow-faq-button-${faqId}`;
              const panelId = `dynamic-flow-faq-panel-${faqId}`;

              return (
                <div key={faqId} className="border-b border-slate-200 last:border-b-0">
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setExpandedFaq(isOpen ? null : faqId)}
                      className="type-card-title flex w-full items-center justify-between gap-5 py-5 text-left text-[#0F1E36] transition-colors hover:text-[#354CE1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#354CE1]"
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
                    <div id={panelId} role="region" aria-labelledby={buttonId} className="pb-6">
                      <p className="type-body max-w-3xl text-slate-600">{item.answer}</p>
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
