/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  Blocks,
  BookOpen,
  Check,
  ChevronDown,
  Code2,
  Database,
  FileBadge2,
  GitBranch,
  GraduationCap,
  KeyRound,
  Landmark,
  Layers3,
  LockKeyhole,
  Network,
  QrCode,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  type LucideIcon,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  CREDENTIAL_ISSUANCE_BENEFIT_IDS,
  CREDENTIAL_ISSUANCE_FAQ_IDS,
  CREDENTIAL_ISSUANCE_JOURNEY_IDS,
  CREDENTIAL_ISSUANCE_TRANSLATIONS,
  type CredentialIssuanceBenefitId,
  type CredentialIssuanceJourneyId,
  type CredentialIssuancePageCopy,
} from '../translations/CredentialIssuancePageTranslations';
import {
  credentialIssuanceDocsPath,
  viewToPath,
} from '../types/routes';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import TechGridBg from './TechGridBg';
import credentialIssuanceHeroImage from '../assets/images/verifiable-credentials-explained.jpg';

const BENEFIT_ICONS: Record<CredentialIssuanceBenefitId, LucideIcon> = {
  modules: Blocks,
  constraints: ShieldCheck,
  delivery: QrCode,
  lifecycle: RefreshCw,
};

const JOURNEY_ICONS: Record<CredentialIssuanceJourneyId, LucideIcon> = {
  compose: Layers3,
  connect: GitBranch,
  issue: FileBadge2,
  operate: RefreshCw,
};

const JOURNEY_COLORS: Record<
  CredentialIssuanceJourneyId,
  { readonly icon: string; readonly soft: string; readonly marker: string }
> = {
  compose: {
    icon: 'text-[#354CE1]',
    soft: 'bg-[#EEF1FF]',
    marker: 'bg-[#354CE1]',
  },
  connect: {
    icon: 'text-violet-700',
    soft: 'bg-violet-50',
    marker: 'bg-violet-600',
  },
  issue: {
    icon: 'text-emerald-700',
    soft: 'bg-emerald-50',
    marker: 'bg-emerald-600',
  },
  operate: {
    icon: 'text-cyan-700',
    soft: 'bg-cyan-50',
    marker: 'bg-cyan-600',
  },
};

function TrustModeCard({
  label,
  content,
  icon: Icon,
  accent,
}: {
  readonly label: string;
  readonly content: CredentialIssuancePageCopy['trust']['managed'];
  readonly icon: LucideIcon;
  readonly accent: 'primary' | 'emerald';
}) {
  const primary = accent === 'primary';
  return (
    <article className="rounded-[1.75rem] bg-white p-7 shadow-lg shadow-[#0F1E36]/6 sm:p-9">
      <div className="flex items-center justify-between gap-4">
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
            primary ? 'bg-[#EEF1FF] text-[#354CE1]' : 'bg-emerald-50 text-emerald-700'
          }`}
        >
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <span
          className={`type-label rounded-full px-3 py-1.5 ${
            primary ? 'bg-[#EEF1FF] text-[#354CE1]' : 'bg-emerald-50 text-emerald-700'
          }`}
        >
          {label}
        </span>
      </div>
      <h3 className="type-card-title mt-6 text-[#0F1E36]">{content.title}</h3>
      <p className="type-body-sm mt-3 text-slate-600">{content.description}</p>
      <ul className="mt-6 space-y-3">
        {content.points.map((point) => (
          <li key={point} className="type-body-sm flex items-start gap-3 text-slate-700">
            <Check
              className={`mt-0.5 h-4 w-4 shrink-0 ${
                primary ? 'text-[#354CE1]' : 'text-emerald-600'
              }`}
              aria-hidden="true"
            />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function CredentialIssuancePage() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const copy = getLocalizedRecord(
    CREDENTIAL_ISSUANCE_TRANSLATIONS,
    language,
    'CREDENTIAL_ISSUANCE_TRANSLATIONS',
  );
  const [expandedFaq, setExpandedFaq] = useState<
    (typeof CREDENTIAL_ISSUANCE_FAQ_IDS)[number] | null
  >(CREDENTIAL_ISSUANCE_FAQ_IDS[0]);

  const openDocs = () => navigate(credentialIssuanceDocsPath(language));
  const openContact = () => navigate(viewToPath('contact', language));

  return (
    <main
      id="credential-issuance-page-root"
      className="min-h-screen overflow-hidden bg-[#FAFBFD] text-slate-800 antialiased selection:bg-[#354CE1]/10 selection:text-[#354CE1]"
    >
      <section className="relative overflow-hidden bg-white pb-24 pt-16 md:pb-32 md:pt-20">
        <TechGridBg />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-96 w-[56rem] -translate-x-1/2 rounded-full bg-[#354CE1]/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-32 h-72 w-72 rounded-full bg-[#5B6DFF]/15 blur-3xl"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <div className="stack-hero">
            <h1 className="type-page-title mx-auto max-w-6xl text-balance text-[#0F1E36]">
              <span className="block">{copy.hero.titleLines[0]}</span>
              <span className="block bg-gradient-to-r from-[#354CE1] via-[#5F3CF3] to-[#00D4B2] bg-clip-text text-transparent">
                {copy.hero.titleLines[1]}
              </span>
            </h1>
            <p className="type-lead measure-lead mx-auto text-slate-600">
              {copy.hero.description}
            </p>
            <div className="flex flex-col items-center justify-center gap-3.5 pt-2 sm:flex-row sm:gap-6">
              <button
                id="credential-issuance-open-docs"
                type="button"
                onClick={openDocs}
                className="type-control inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#354CE1] px-7 py-3.5 text-white shadow-lg shadow-[#354CE1]/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#283DBF] hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#354CE1] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                {copy.hero.primaryCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                id="credential-issuance-contact"
                type="button"
                onClick={openContact}
                className="type-control inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white/80 px-7 py-3.5 text-slate-800 shadow-sm backdrop-blur-md transition-all duration-200 hover:bg-slate-50 hover:text-[#354CE1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#354CE1] motion-reduce:transition-none"
              >
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                {copy.hero.secondaryCta}
              </button>
            </div>
          </div>

          <div className="mt-16 md:mt-24">
            <figure className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-white p-2 shadow-2xl shadow-[#0F1E36]/12 sm:p-3">
              <img
                src={credentialIssuanceHeroImage}
                alt={copy.hero.visualAriaLabel}
                width="1536"
                height="864"
                fetchPriority="high"
                className="aspect-video w-full rounded-[1.5rem] object-cover"
              />
              <figcaption className="sr-only">{copy.hero.visualTitle}</figcaption>
            </figure>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4">
            {copy.hero.chips.map((chip, index) => {
              const icons = [Blocks, KeyRound, Smartphone, RefreshCw] as const;
              const Icon = icons[index];
              return (
                <div
                  key={chip}
                  className="flex min-w-0 items-center justify-center gap-2 rounded-full bg-white/75 px-3 py-3 text-slate-600 shadow-sm backdrop-blur-sm"
                >
                  <Icon className="h-4 w-4 shrink-0 text-[#354CE1]" aria-hidden="true" />
                  <span className="type-caption font-semibold">{chip}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#F6F8FB] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="type-label uppercase tracking-wider text-[#354CE1]">
              {copy.benefits.eyebrow}
            </p>
            <h2 className="type-section-title mt-4 text-balance text-[#0F1E36]">
              {copy.benefits.title}
            </h2>
            <p className="type-body mt-5 text-slate-600">
              {copy.benefits.description}
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {CREDENTIAL_ISSUANCE_BENEFIT_IDS.map((benefitId) => {
              const Icon = BENEFIT_ICONS[benefitId];
              const item = copy.benefits.items[benefitId];
              return (
                <article
                  key={benefitId}
                  className="group rounded-3xl bg-white p-7 shadow-sm shadow-[#0F1E36]/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF1FF] text-[#354CE1] transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="type-card-title mt-6 text-[#0F1E36]">{item.title}</h3>
                  <p className="type-body-sm mt-3 text-slate-600">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-4xl text-center">
            <p className="type-label uppercase tracking-wider text-[#354CE1]">
              {copy.journey.eyebrow}
            </p>
            <h2 className="type-section-title mt-4 text-balance text-[#0F1E36]">
              {copy.journey.title}
            </h2>
            <p className="type-body mx-auto mt-5 max-w-3xl text-slate-600">
              {copy.journey.description}
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {CREDENTIAL_ISSUANCE_JOURNEY_IDS.map((journeyId) => {
              const Icon = JOURNEY_ICONS[journeyId];
              const stage = copy.journey.stages[journeyId];
              const colors = JOURNEY_COLORS[journeyId];
              return (
                <article
                  key={journeyId}
                  className="relative overflow-hidden rounded-[1.75rem] bg-[#FAFBFD] p-7 shadow-sm shadow-[#0F1E36]/5 sm:p-9"
                >
                  <div className="flex items-center gap-4">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${colors.soft} ${colors.icon}`}>
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <p className={`type-label uppercase tracking-wider ${colors.icon}`}>
                      {stage.eyebrow}
                    </p>
                  </div>
                  <h3 className="type-section-title-compact mt-6 text-[#0F1E36]">
                    {stage.title}
                  </h3>
                  <p className="type-body-sm mt-3 text-slate-600">
                    {stage.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {stage.points.map((point) => (
                      <li key={point} className="type-body-sm flex items-start gap-3 text-slate-700">
                        <span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${colors.marker}`} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#F6F8FB] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-4xl text-center">
            <p className="type-label uppercase tracking-wider text-[#354CE1]">
              {copy.trust.eyebrow}
            </p>
            <h2 className="type-section-title mt-4 text-balance text-[#0F1E36]">
              {copy.trust.title}
            </h2>
            <p className="type-body mx-auto mt-5 max-w-3xl text-slate-600">
              {copy.trust.description}
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-2">
            <TrustModeCard
              label={copy.trust.managedLabel}
              content={copy.trust.managed}
              icon={BadgeCheck}
              accent="primary"
            />
            <TrustModeCard
              label={copy.trust.selfManagedLabel}
              content={copy.trust.selfManaged}
              icon={LockKeyhole}
              accent="emerald"
            />
          </div>
          <div className="mx-auto mt-6 flex max-w-5xl flex-col gap-5 rounded-[1.75rem] bg-[#0F1E36] p-7 text-white shadow-xl shadow-[#0F1E36]/12 sm:flex-row sm:items-center sm:p-9">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[#7E8CFF]">
              <Database className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h3 className="type-card-title">{copy.trust.registryTitle}</h3>
              <p className="type-body-sm mt-2 text-white/70">
                {copy.trust.registryDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#5B6DFF] py-20 text-white lg:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-[#354CE1]/45 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-5xl text-center">
            <span className="type-label inline-flex rounded-full bg-white/12 px-3.5 py-2 uppercase text-white ring-1 ring-white/20">
              {copy.ecosystem.label}
            </span>
            <p className="type-label mt-6 uppercase text-white/70">
              {copy.ecosystem.eyebrow}
            </p>
            <h2 className="type-section-title mt-4 text-balance text-white">
              {copy.ecosystem.title}
            </h2>
            <p className="type-body mx-auto mt-5 max-w-3xl text-white/80">
              {copy.ecosystem.description}
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl items-stretch gap-5 lg:grid-cols-[1fr_auto_1fr]">
            <article className="rounded-[1.75rem] bg-white p-7 text-[#0F1E36] shadow-xl shadow-[#354CE1]/15">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EEF1FF] text-[#354CE1]">
                <GitBranch className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="type-card-title mt-5">{copy.ecosystem.flow.title}</h3>
              <p className="type-body-sm mt-3 text-slate-600">
                {copy.ecosystem.flow.description}
              </p>
            </article>
            <div className="flex items-center justify-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25">
                <ArrowRight className="h-5 w-5 rotate-90 lg:rotate-0" aria-hidden="true" />
              </span>
            </div>
            <article className="rounded-[1.75rem] bg-white p-7 text-[#0F1E36] shadow-xl shadow-[#354CE1]/15">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <Code2 className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="type-card-title mt-5">{copy.ecosystem.api.title}</h3>
              <p className="type-body-sm mt-3 text-slate-600">
                {copy.ecosystem.api.description}
              </p>
            </article>
          </div>
          <div className="mx-auto mt-5 max-w-5xl rounded-2xl bg-[#354CE1]/45 px-6 py-5 text-center ring-1 ring-white/15">
            <p className="type-label uppercase text-white/65">
              {copy.ecosystem.outputLabel}
            </p>
            <p className="type-card-title-sm mt-2 text-white">{copy.ecosystem.output}</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="type-label uppercase tracking-wider text-[#354CE1]">
              {copy.useCases.eyebrow}
            </p>
            <h2 className="type-section-title mt-4 text-balance text-[#0F1E36]">
              {copy.useCases.title}
            </h2>
            <p className="type-body mt-5 text-slate-600">{copy.useCases.description}</p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {[
              { content: copy.useCases.education, icon: GraduationCap },
              { content: copy.useCases.banking, icon: Landmark },
            ].map(({ content, icon: Icon }) => (
              <article
                key={content.title}
                className="rounded-[1.75rem] bg-[#FAFBFD] p-8 shadow-sm shadow-[#0F1E36]/5 sm:p-10"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF1FF] text-[#354CE1]">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="type-section-title-compact mt-6 text-[#0F1E36]">
                  {content.title}
                </h3>
                <p className="type-body mt-3 text-slate-600">{content.description}</p>
                <p className="type-caption mt-6 font-semibold text-[#354CE1]">
                  {content.detail}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-8 rounded-[1.75rem] bg-[#EEF1FF] p-8 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-3xl">
              <span className="type-label inline-flex rounded-full bg-white px-3 py-1.5 uppercase text-[#354CE1] shadow-sm">
                {copy.standards.label}
              </span>
              <h3 className="type-section-title-compact mt-5 text-[#0F1E36]">
                {copy.standards.title}
              </h3>
              <p className="type-body mt-3 text-slate-700">{copy.standards.description}</p>
              <p className="type-caption mt-4 text-slate-500">{copy.standards.note}</p>
            </div>
            <Network className="mt-8 h-16 w-16 shrink-0 text-[#354CE1]/70 lg:mt-0" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="bg-[#F6F8FB] py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="type-label uppercase tracking-wider text-[#354CE1]">
              {copy.faq.eyebrow}
            </p>
            <h2 className="type-section-title mt-4 text-balance text-[#0F1E36]">
              {copy.faq.title}
            </h2>
            <p className="type-body mt-4 text-slate-600">{copy.faq.description}</p>
          </div>
          <div className="rounded-[1.75rem] bg-white px-6 py-3 shadow-lg shadow-[#0F1E36]/5 sm:px-8">
            {CREDENTIAL_ISSUANCE_FAQ_IDS.map((faqId) => {
              const item = copy.faq.items[faqId];
              const isOpen = expandedFaq === faqId;
              const buttonId = `credential-issuance-faq-button-${faqId}`;
              const panelId = `credential-issuance-faq-panel-${faqId}`;
              return (
                <div key={faqId} className="border-b border-slate-100 py-2 last:border-b-0">
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setExpandedFaq(isOpen ? null : faqId)}
                      className="type-control flex w-full items-center justify-between gap-5 py-5 text-left text-[#0F1E36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#354CE1]"
                    >
                      <span>{item.title}</span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-[#354CE1] transition-transform motion-reduce:transition-none ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!isOpen}
                    className="pb-5"
                  >
                    <p className="type-body-sm max-w-2xl text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#FAFBFD] pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#5B6DFF] px-6 py-14 text-center text-white shadow-xl shadow-[#354CE1]/15 sm:px-10 lg:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/12 blur-3xl"
            />
            <div className="relative mx-auto max-w-3xl">
              <p className="type-label uppercase text-white/70">{copy.cta.eyebrow}</p>
              <h2 className="type-section-title mt-4 break-words text-balance text-white">
                {copy.cta.title}
              </h2>
              <p className="type-body mx-auto mt-4 max-w-2xl text-white/80">
                {copy.cta.description}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={openDocs}
                  className="type-control inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[#354CE1] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#F7F8FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  {copy.cta.primary}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={openContact}
                  className="type-control inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#354CE1]/30 px-7 py-3.5 text-white ring-1 ring-white/25 transition hover:bg-[#354CE1]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none"
                >
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  {copy.cta.secondary}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
