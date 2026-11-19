/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle2, Clock, Loader2, RefreshCw, ShieldCheck, XCircle } from 'lucide-react';
import identraLogo from '../assets/images/identra-logo.svg';
import {
  PRODUCT_STAGES,
  pickProductLocale,
  toProductPageModel,
  type ProductPageModel,
  type ProductStage,
  type StageRow,
} from '../identra/productPage';
import { PRODUCT_PAGE_TRANSLATIONS, type ProductPageCopy } from '../translations/ProductPageTranslations';
import { DEFAULT_SITE_URL } from '../utils/seo';
import { LANGUAGE_PREFERENCE_KEY, savePreferredLanguage } from '../utils/languagePreference';
import IdentraQrCode from './IdentraQrCode';
import ProductStageItem from './ProductStageItem';

type ProductLoader = typeof import('../identra/productLoader');
type Locale = 'vi' | 'en';

// The verifier (~170 KB gzip) is fetched only here, once, after the page shell is already on screen.
let loaderPromise: Promise<ProductLoader> | null = null;
const loadVerifier = () => {
  // Zod (inside the SDK's dependencies) probes `new Function('')` to decide whether to compile its
  // parsers; under `script-src 'self'` that probe is a reported CSP violation. Its documented `jitless`
  // switch (z.config, kept on globalThis.__zod_globalConfig) turns the probe off; set it before the chunk loads.
  const zodScope = globalThis as { __zod_globalConfig?: Record<string, unknown> };
  zodScope.__zod_globalConfig = { ...zodScope.__zod_globalConfig, jitless: true };
  loaderPromise ??= import('../identra/productLoader').catch((error: unknown) => {
    loaderPromise = null;
    throw error;
  });
  return loaderPromise;
};

type Phase =
  | { kind: 'loading' }
  | { kind: 'checking' }
  | { kind: 'done'; model: ProductPageModel; elementString: string | null; labelUrl: string | null };

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1] focus-visible:ring-offset-2';
const primaryButton = `type-control inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#354CE1] px-5 text-white transition-colors hover:bg-[#2539BE] disabled:cursor-not-allowed disabled:bg-[#354CE1]/60 ${focusRing}`;
const secondaryButton = `type-control inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 ${focusRing}`;
const apiText = 'break-words [overflow-wrap:anywhere]';

const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ''));

const readSavedLocale = (): string | null => {
  try {
    return typeof window === 'undefined' ? null : window.localStorage.getItem(LANGUAGE_PREFERENCE_KEY);
  } catch {
    return null;
  }
};

const initialLocale = (): Locale => pickProductLocale(
  readSavedLocale(),
  typeof navigator === 'undefined' ? [] : navigator.languages?.length ? navigator.languages : [navigator.language],
);

function Notice({ tone, icon, title, children }: { tone: 'rose' | 'amber' | 'slate'; icon: ReactNode; title: string; children: ReactNode }) {
  const tones = { rose: 'bg-rose-50 text-rose-950', amber: 'bg-amber-50 text-amber-950', slate: 'bg-slate-100 text-slate-900' };
  return (
    <div className={`flex items-start gap-3 rounded-3xl p-5 ${tones[tone]}`}>
      <span aria-hidden="true" className="mt-0.5 shrink-0">{icon}</span>
      <div className="min-w-0 space-y-1">
        <p className="type-card-title">{title}</p>
        <div className="type-body">{children}</div>
      </div>
    </div>
  );
}

const joinStages = (stages: ProductStage[], copy: ProductPageCopy) => stages.map((stage) => copy.stages[stage].toLowerCase()).join(copy.listJoiner);

export default function ProductPage() {
  const { pathname } = useLocation();
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [phase, setPhase] = useState<Phase>({ kind: 'loading' });
  const [run, setRun] = useState(0);
  const copy = PRODUCT_PAGE_TRANSLATIONS[locale];

  useEffect(() => {
    document.title = copy.documentTitle;
    document.documentElement.lang = locale;
  }, [copy.documentTitle, locale]);

  // Parse the path with the SDK's parser, then verify the whole chain in this browser.
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      let loader: ProductLoader;
      try {
        loader = await loadVerifier();
      } catch {
        if (!cancelled) setPhase({ kind: 'done', model: { kind: 'network_error', gtin: '', serial: '', verifiedAt: new Date().toISOString() }, elementString: null, labelUrl: null });
        return;
      }
      const parsed = loader.parseProductPath(pathname);
      if (!parsed) {
        if (!cancelled) setPhase({ kind: 'done', model: { kind: 'invalid_code' }, elementString: null, labelUrl: null });
        return;
      }
      if (!cancelled) setPhase({ kind: 'checking' });
      const view = await loader.verifyProduct(parsed.gtin, parsed.serial);
      if (cancelled) return;
      setPhase({
        kind: 'done',
        model: toProductPageModel(view),
        elementString: loader.formatProductCode(parsed.gtin, parsed.serial),
        labelUrl: `${DEFAULT_SITE_URL}${loader.formatDigitalLinkPath(parsed.gtin, parsed.serial)}`,
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [pathname, run]);

  const recheck = () => {
    setPhase({ kind: 'checking' });
    setRun((value) => value + 1);
  };

  const switchLocale = (next: Locale) => {
    setLocale(next);
    savePreferredLanguage(next);
  };

  const model = phase.kind === 'done' ? phase.model : null;
  const checked = model?.kind === 'checked' ? model : null;
  const gtin = model && model.kind !== 'invalid_code' ? model.gtin : '';
  const serial = model && model.kind !== 'invalid_code' ? model.serial : '';
  const isSample = gtin.slice(1, 4) === '952';
  const verifiedAtText = model && model.kind !== 'invalid_code' && model.verifiedAt
    ? new Intl.DateTimeFormat(locale === 'vi' ? 'vi-VN' : 'en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date(model.verifiedAt))
    : null;

  const failedReason = checked?.firstProblem
    ? checked.firstProblem.outcome === 'failed' || !checked.firstProblem.stage
      ? copy.reasons[checked.firstProblem.reasonKey]
      : copy.outcomeMessages[checked.firstProblem.outcome as Exclude<StageRow['outcome'], 'ok' | 'failed'>]
    : '';

  const verdict = (() => {
    if (phase.kind !== 'done' || !model) {
      return (
        <div className="flex items-start gap-3 rounded-3xl bg-white p-5 sm:p-6">
          <Loader2 aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-[#354CE1] motion-safe:animate-spin" />
          <div className="space-y-1">
            <h1 className="type-featured-title text-[#0F1E36]">{copy.loadingTitle}</h1>
            <p className="type-body text-slate-700">{phase.kind === 'checking' ? copy.checkingBody : copy.loadingBody}</p>
          </div>
        </div>
      );
    }
    if (model.kind === 'checked') {
      const tone = model.verdict === 'verified' ? 'bg-emerald-700 text-white' : model.verdict === 'in_progress' ? 'bg-[#E2E6FF] text-[#0F1E36]' : 'bg-rose-700 text-white';
      const icon = model.verdict === 'verified'
        ? <ShieldCheck className="h-7 w-7" />
        : model.verdict === 'in_progress' ? <Clock className="h-7 w-7 text-[#354CE1]" /> : <XCircle className="h-7 w-7" />;
      const body = model.verdict === 'verified'
        ? copy.verifiedBody
        : model.verdict === 'in_progress'
          ? model.currentStage
            ? fill(copy.inProgressBody, { current: copy.stages[model.currentStage].toLowerCase(), missing: joinStages(model.missingStages, copy) })
            : copy.inProgressNoneYet
          : model.firstProblem?.stage
            ? fill(copy.failedAtStage, { stage: copy.stages[model.firstProblem.stage].toLowerCase(), reason: failedReason })
            : failedReason;
      return (
        <div className={`space-y-4 rounded-3xl p-5 sm:p-7 ${tone}`}>
          <div className="flex items-start gap-3">
            <span aria-hidden="true" className="shrink-0">{icon}</span>
            <div className="min-w-0 space-y-2">
              <h1 className="type-section-title-compact">
                {model.verdict === 'verified' ? copy.verifiedTitle : model.verdict === 'in_progress' ? copy.inProgressTitle : copy.failedTitle}
              </h1>
              <p className="type-lead">{body}</p>
            </div>
          </div>
        </div>
      );
    }
    const titles = {
      invalid_code: [copy.invalidTitle, copy.invalidBody],
      not_found: [copy.notFoundTitle, copy.notFoundBody],
      network_error: [copy.networkTitle, copy.networkBody],
      invalid_response: [copy.unreadableTitle, copy.unreadableBody],
    } as const;
    const [title, body] = titles[model.kind];
    return (
      <div className="flex items-start gap-3 rounded-3xl bg-white p-5 sm:p-6">
        <XCircle aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 text-rose-700" />
        <div className="min-w-0 space-y-2">
          <h1 className="type-featured-title text-[#0F1E36]">{title}</h1>
          <p className="type-body text-slate-700">{body}</p>
          {(model.kind === 'network_error' || model.kind === 'invalid_response') && (
            <button type="button" onClick={recheck} className={primaryButton}>
              <RefreshCw aria-hidden="true" className="h-4 w-4" />
              {copy.retry}
            </button>
          )}
        </div>
      </div>
    );
  })();

  return (
    <div className="min-h-screen bg-[#FAFBFD] font-sans text-slate-800 antialiased">
      <header className="border-b border-slate-200 bg-white print:hidden">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href={`/${locale}`} aria-label={copy.homeLabel} className={`inline-flex min-h-11 items-center gap-2 rounded-lg ${focusRing}`}>
            <img src={identraLogo} alt="" className="h-7 w-auto" />
            <span aria-hidden="true" className="type-card-title text-[#0F1E36]">{copy.brandName}</span>
          </a>
          <div role="group" aria-label={copy.languageLabel} className="flex rounded-full bg-slate-100 p-1">
            {(['vi', 'en'] as const).map((option) => (
              <button
                key={option}
                type="button"
                lang={option}
                aria-pressed={locale === option}
                onClick={() => switchLocale(option)}
                className={`type-control min-h-9 min-w-11 cursor-pointer rounded-full px-3 ${focusRing} ${locale === option ? 'bg-white text-[#0F1E36] shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              >
                {copy.languageNames[option]}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-6 sm:py-10">
        <section aria-live="polite" className="space-y-4 print:hidden">
          {verdict}
          {checked && (
            <div className="flex flex-wrap items-center justify-between gap-3">
              {verifiedAtText && <p className="type-body text-slate-600">{fill(copy.checkedAt, { time: verifiedAtText })}</p>}
              <button type="button" onClick={recheck} className={secondaryButton}>
                <RefreshCw aria-hidden="true" className="h-4 w-4" />
                {copy.recheck}
              </button>
            </div>
          )}
          {checked?.clockHintMinutes !== null && checked?.clockHintMinutes !== undefined && (
            <Notice tone="amber" icon={<Clock className="h-5 w-5" />} title={copy.clockTitle}>
              {fill(copy.clockBody, { minutes: checked.clockHintMinutes })}
            </Notice>
          )}
        </section>

        {gtin && (
          <section aria-labelledby="product-identity" className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 print:hidden">
            <h2 id="product-identity" className="type-card-title text-[#0F1E36]">{copy.productTitle}</h2>
            <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              <div className="min-w-0">
                <dt className="type-body-sm text-slate-600">{copy.gtinLabel}</dt>
                <dd className="font-mono text-base text-slate-900" translate="no">{gtin}</dd>
              </div>
              <div className="min-w-0">
                <dt className="type-body-sm text-slate-600">{copy.serialLabel}</dt>
                <dd className={`font-mono text-base text-slate-900 ${apiText}`} translate="no">{serial}</dd>
              </div>
              {phase.kind === 'done' && phase.elementString && (
                <div className="min-w-0 sm:col-span-2">
                  <dt className="type-body-sm text-slate-600">{copy.elementStringLabel}</dt>
                  <dd className={`font-mono text-sm text-slate-700 ${apiText}`} translate="no">{phase.elementString}</dd>
                </div>
              )}
            </dl>
            {isSample && <p className="type-body mt-3 text-slate-600">{copy.sampleNote}</p>}
          </section>
        )}

        {(checked || phase.kind !== 'done') && (
          <section aria-labelledby="product-timeline" aria-busy={phase.kind !== 'done'} className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 print:hidden">
            <h2 id="product-timeline" className="type-card-title text-[#0F1E36]">{copy.timelineTitle}</h2>
            {checked ? (
              <ol className="mt-5">
                {[...checked.rows, ...checked.extraRows].map((row, index, all) => (
                  <ProductStageItem key={`${row.stage ?? 'extra'}-${row.index ?? index}`} row={row} copy={copy} locale={locale} isLast={index === all.length - 1} />
                ))}
              </ol>
            ) : (
              <ol className="mt-5 space-y-6" aria-hidden="true">
                {PRODUCT_STAGES.map((stage) => (
                  <li key={stage} className="flex gap-4">
                    <span className="h-8 w-8 shrink-0 rounded-full bg-slate-100" />
                    <div className="flex-1 space-y-2">
                      <p className="type-card-title text-slate-400">{copy.stages[stage]}</p>
                      <div className="h-4 w-3/4 rounded bg-slate-100" />
                      <div className="h-4 w-1/2 rounded bg-slate-100" />
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </section>
        )}

        <section aria-labelledby="product-device" className="space-y-4 rounded-3xl bg-[#0F1E36] p-5 text-white sm:p-7 print:hidden">
          <h2 id="product-device" className="type-card-title flex items-center gap-2">
            <CheckCircle2 aria-hidden="true" className="h-5 w-5 text-emerald-300" />
            {copy.deviceTitle}
          </h2>
          <p className="type-body text-blue-50">{copy.deviceBody}</p>
          <p className="type-body text-blue-50">
            {copy.rootLinkLead}{' '}
            <a href={`/${locale}/security#root-certificate`} className={`font-semibold text-white underline underline-offset-2 ${focusRing}`}>{copy.rootLink}</a>
          </p>
          <div>
            <h3 className="type-card-title-sm text-white">{copy.limitsTitle}</h3>
            <ul className="type-body mt-2 list-disc space-y-2 pl-5 text-blue-50">
              {copy.limits.map((limit) => <li key={limit}>{limit}</li>)}
            </ul>
          </div>
        </section>

        {isSample && phase.kind === 'done' && phase.labelUrl && (
          <section aria-labelledby="product-label" className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 print:border-0 print:p-0">
            <div className="print:hidden">
              <h2 id="product-label" className="type-card-title text-[#0F1E36]">{copy.labelTitle}</h2>
              <p className="type-body mt-1 text-slate-600">{copy.labelBody}</p>
            </div>
            <div className="mt-4 inline-flex items-center gap-4 rounded-2xl border border-slate-300 p-4 print:mt-0">
              <IdentraQrCode value={phase.labelUrl} label={copy.labelQrAlt} className="h-32 w-32" fallback={null} />
              <div className="space-y-1 font-mono text-xs text-slate-900" translate="no">
                <p>(01) {gtin}</p>
                <p className={apiText}>(21) {serial}</p>
                <p className="font-sans text-slate-600">identra.awncorp.vn</p>
              </div>
            </div>
            <button type="button" onClick={() => window.print()} className={`${secondaryButton} mt-4 print:hidden`}>
              {copy.print}
            </button>
          </section>
        )}
      </main>
    </div>
  );
}
