/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, lazy, useEffect, useMemo, useRef, useState, type ReactNode, type Ref } from 'react';
import { formatDigitalLinkPath, formatProductCode, parseDigitalLinkPath } from '@identra/sdk-core';
import { AlertTriangle, CalendarClock, CheckCircle2, Clock, CloudOff, Loader2, RefreshCw, ShieldCheck, WifiOff, XCircle } from 'lucide-react';
import {
  PRODUCT_STAGES,
  clockDifference,
  pickProductLocale,
  toProductPageModel,
  type CheckedProductModel,
  type ProductPageModel,
  type ProductStage,
} from '../identra/productPage';
import { PRODUCT_PAGE_TRANSLATIONS, type ProductPageCopy } from '../translations/ProductPageTranslations';
import ProductStageItem from './ProductStageItem';

// Drawn only for sample products, after the verdict: its QR encoder stays off the critical path.
const IdentraQrCode = lazy(() => import('./IdentraQrCode'));

type ProductLoader = typeof import('../identra/productLoader');
export type ProductLocale = 'vi' | 'en';

const SITE_URL = 'https://identra.awncorp.vn';
// The published copy of the canonical logo (public/, also the favicon): one cached file for shell and page.
const LOGO = '/identra-logo.svg';
// Same key as the main site's language choice (utils/languagePreference), without its route tables.
const LANGUAGE_PREFERENCE_KEY = 'identra_lang';

// The verifier (~120 KB) is its own chunk; the shell modulepreloads it, so it is usually here already.
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

/** loading: before the verifier is ready; checking: verifying; done: `model` holds the result. */
export type ProductPhase = 'loading' | 'checking' | 'done';

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1] focus-visible:ring-offset-2';
const primaryButton = `type-control inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#354CE1] px-5 text-white transition-colors hover:bg-[#2539BE] aria-disabled:cursor-progress aria-disabled:bg-[#354CE1]/70 ${focusRing}`;
const secondaryButton = `type-control inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full border border-slate-300 bg-white px-5 text-slate-700 transition-colors hover:bg-slate-50 aria-disabled:cursor-progress aria-disabled:opacity-70 ${focusRing}`;
const darkPanelButton = 'type-control inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full bg-white px-5 text-[#0F1E36] transition-colors hover:bg-white/90 aria-disabled:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';
const apiText = 'break-words [overflow-wrap:anywhere]';

const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ''));

const joinStages = (stages: readonly ProductStage[], copy: ProductPageCopy) => stages.map((stage) => copy.stages[stage].toLowerCase()).join(copy.listJoiner);

const formatClockDifference = (seconds: number, locale: ProductLocale): string => {
  const { value, unit } = clockDifference(seconds);
  return new Intl.NumberFormat(locale === 'vi' ? 'vi-VN' : 'en-GB', { style: 'unit', unit, unitDisplay: 'long' }).format(value);
};

/** Results the shopper can usefully try again: the service, the network or the device clock, not the record. */
const isRetryable = (model: ProductPageModel | null): boolean =>
  model !== null && (model.kind === 'network_error' || model.kind === 'server_error' || model.kind === 'invalid_response'
    || (model.kind === 'checked' && model.verdict === 'unchecked'));

type VerdictTone = 'positive' | 'progress' | 'neutral' | 'negative' | 'plain';
interface VerdictContent {
  verdict: string;
  tone: VerdictTone;
  icon: ReactNode;
  title: string;
  body: string;
}

const PANEL: Record<VerdictTone, string> = {
  positive: 'bg-emerald-700 text-white',
  progress: 'bg-[#E2E6FF] text-[#0F1E36]',
  neutral: 'bg-amber-50 text-amber-950 ring-1 ring-inset ring-amber-200',
  negative: 'bg-rose-700 text-white',
  plain: 'bg-white text-[#0F1E36] ring-1 ring-inset ring-slate-200',
};

const checkedVerdict = (model: CheckedProductModel, copy: ProductPageCopy, locale: ProductLocale): VerdictContent => {
  const icon = 'h-7 w-7';
  switch (model.verdict) {
    case 'verified':
      return { verdict: 'verified', tone: 'positive', icon: <ShieldCheck className={icon} />, title: copy.verifiedTitle, body: copy.verifiedBody };
    case 'in_progress':
      return {
        verdict: 'in_progress',
        tone: 'progress',
        icon: <Clock className={`${icon} text-[#354CE1]`} />,
        title: copy.inProgressTitle,
        body: model.currentStage
          ? fill(model.missingStages.length > 1 ? copy.inProgressBodyMany : copy.inProgressBody, {
              current: copy.stages[model.currentStage].toLowerCase(),
              missing: joinStages(model.missingStages, copy),
            })
          : copy.inProgressNoneYet,
      };
    case 'unchecked':
      return model.uncheckedCause === 'clock' && model.clockSkewSeconds !== null
        ? {
            verdict: 'unchecked',
            tone: 'neutral',
            icon: <CalendarClock className={`${icon} text-amber-700`} />,
            title: fill(copy.clockTitle, { duration: formatClockDifference(model.clockSkewSeconds, locale) }),
            body: copy.clockBody,
          }
        : {
            verdict: 'unchecked',
            tone: 'neutral',
            icon: <CloudOff className={`${icon} text-amber-700`} />,
            title: copy.uncheckedTitle,
            body: model.uncheckedCause === 'trust_list' ? copy.uncheckedTrustList : copy.uncheckedStatus,
          };
    case 'failed': {
      const problem = model.firstProblem;
      const listSentence = model.listProblem === 'MALFORMED' ? copy.listUnreadable : model.listProblem === 'TOO_LARGE' ? copy.listTooLarge : null;
      const reason = listSentence ?? copy.reasons[problem?.reasonKey ?? 'UNKNOWN'];
      return {
        verdict: 'failed',
        tone: 'negative',
        icon: <XCircle className={icon} />,
        title: copy.failedTitle,
        body: problem?.stage && !listSentence ? fill(copy.failedAtStage, { stage: copy.stages[problem.stage].toLowerCase(), reason }) : reason,
      };
    }
  }
};

const verdictContent = (phase: ProductPhase, model: ProductPageModel | null, copy: ProductPageCopy, locale: ProductLocale): VerdictContent => {
  const small = 'h-6 w-6';
  if (phase !== 'done' || !model) {
    return {
      verdict: 'loading',
      tone: 'plain',
      icon: <Loader2 className={`${small} text-[#354CE1] motion-safe:animate-spin`} />,
      title: copy.loadingTitle,
      body: phase === 'checking' ? copy.checkingBody : copy.loadingBody,
    };
  }
  switch (model.kind) {
    case 'checked':
      return checkedVerdict(model, copy, locale);
    case 'invalid_code':
      return { verdict: model.kind, tone: 'plain', icon: <XCircle className={`${small} text-rose-700`} />, title: copy.invalidTitle, body: copy.invalidBody };
    case 'not_found':
      return { verdict: model.kind, tone: 'plain', icon: <XCircle className={`${small} text-rose-700`} />, title: copy.notFoundTitle, body: copy.notFoundBody };
    case 'network_error':
      return { verdict: model.kind, tone: 'plain', icon: <WifiOff className={`${small} text-amber-700`} />, title: copy.networkTitle, body: copy.networkBody };
    case 'server_error':
      return { verdict: model.kind, tone: 'plain', icon: <AlertTriangle className={`${small} text-amber-700`} />, title: copy.serverTitle, body: copy.serverBody };
    case 'invalid_response':
      return { verdict: model.kind, tone: 'plain', icon: <AlertTriangle className={`${small} text-amber-700`} />, title: copy.unreadableTitle, body: copy.unreadableBody };
  }
};

export interface ProductPageViewProps {
  locale: ProductLocale;
  onLocaleChange: (locale: ProductLocale) => void;
  /** The parsed path, or null for an invalid code. */
  product: { gtin: string; serial: string } | null;
  phase: ProductPhase;
  /** The latest result; kept while a recheck runs, so the action button stays where it is. */
  model: ProductPageModel | null;
  onRecheck: () => void;
  headingRef?: Ref<HTMLHeadingElement>;
}

/** Everything the shopper sees, from props only (render-tested without a browser). */
export function ProductPageView({ locale, onLocaleChange, product, phase, model, onRecheck, headingRef }: ProductPageViewProps) {
  const copy = PRODUCT_PAGE_TRANSLATIONS[locale];
  const done = phase === 'done' ? model : null;
  const checked = done?.kind === 'checked' ? done : null;
  const busy = phase !== 'done';
  const isSample = product !== null && product.gtin.slice(1, 4) === '952';
  const verdict = verdictContent(phase, model, copy, locale);
  const showActions = model !== null && (model.kind === 'checked' || isRetryable(model));
  const retryFirst = isRetryable(model);
  const onDark = verdict.tone === 'positive' || verdict.tone === 'negative';
  const verifiedAtText = model && model.kind === 'checked'
    ? new Intl.DateTimeFormat(locale === 'vi' ? 'vi-VN' : 'en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' }).format(new Date(model.verifiedAt))
    : null;
  const showTimeline = busy ? product !== null : checked !== null && checked.listProblem === null;
  const showDevicePanel = checked !== null && checked.anyEventVerified;
  // The verdict already says why every step could not be checked (trust list, clock): the pills suffice.
  const quietUnchecked = checked !== null && checked.verdict === 'unchecked' && checked.uncheckedCause !== 'status';
  const showLimits = checked !== null && (checked.verdict === 'verified' || checked.verdict === 'in_progress');

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFBFD] font-sans text-slate-800 antialiased">
      <header className="border-b border-slate-200 bg-white print:hidden">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
          <a href={`/${locale}`} aria-label={copy.homeLabel} className={`inline-flex min-h-11 items-center gap-2 rounded-lg ${focusRing}`}>
            <img src={LOGO} alt="" width={28} height={28} className="h-7 w-auto" />
            <span aria-hidden="true" className="type-card-title text-[#0F1E36]">{copy.brandName}</span>
          </a>
          <div role="group" aria-label={copy.languageLabel} className="flex rounded-full bg-slate-100 p-1">
            {(['vi', 'en'] as const).map((option) => (
              <button
                key={option}
                type="button"
                lang={option}
                aria-pressed={locale === option}
                onClick={() => onLocaleChange(option)}
                className={`type-control min-h-11 min-w-11 cursor-pointer whitespace-nowrap rounded-full px-3 ${focusRing} ${locale === option ? 'bg-white text-[#0F1E36] shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              >
                {copy.languageNames[option]}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-6 sm:px-6 sm:py-10">
        <section aria-live="polite" className="print:hidden">
          <div data-verdict={verdict.verdict} data-tone={verdict.tone} className={`flex items-start gap-3 rounded-3xl p-5 sm:gap-4 sm:p-7 ${PANEL[verdict.tone]}`}>
            <span aria-hidden="true" className="mt-0.5 shrink-0">{verdict.icon}</span>
            <div className="min-w-0 flex-1 space-y-2">
              <h1 ref={headingRef} tabIndex={-1} className={`${verdict.tone === 'positive' || verdict.tone === 'negative' || verdict.tone === 'progress' ? 'type-section-title-compact' : 'type-featured-title'} outline-none`}>{verdict.title}</h1>
              <p className={verdict.tone === 'plain' || verdict.tone === 'neutral' ? 'type-body' : 'type-lead'}>{verdict.body}</p>
              {/* One button, always in this place while a result exists: a recheck keeps it (busy) and its focus. */}
              {showActions && (
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2">
                  <button
                    type="button"
                    aria-disabled={busy || undefined}
                    onClick={() => { if (!busy) onRecheck(); }}
                    className={onDark ? darkPanelButton : retryFirst ? primaryButton : secondaryButton}
                  >
                    <RefreshCw aria-hidden="true" className={`h-4 w-4 ${busy ? 'motion-safe:animate-spin' : ''}`} />
                    {busy ? copy.busy : model?.kind === 'checked' ? copy.recheck : copy.retry}
                  </button>
                  {verifiedAtText && !busy && <p className={`type-body-sm ${onDark ? 'text-white/85' : 'text-slate-600'}`}>{fill(copy.checkedAt, { time: verifiedAtText })}</p>}
                </div>
              )}
            </div>
          </div>
        </section>

        {product && (
          <section aria-labelledby="product-identity" className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 print:hidden">
            <h2 id="product-identity" className="type-card-title text-[#0F1E36]">{copy.productTitle}</h2>
            <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              <div className="min-w-0">
                <dt className="type-body-sm text-slate-600">{copy.gtinLabel}</dt>
                <dd className="font-mono text-base text-slate-900" translate="no">{product.gtin}</dd>
              </div>
              <div className="min-w-0">
                <dt className="type-body-sm text-slate-600">{copy.serialLabel}</dt>
                <dd className={`font-mono text-base text-slate-900 ${apiText}`} translate="no">{product.serial}</dd>
              </div>
              <div className="min-w-0 sm:col-span-2">
                <dt className="type-body-sm text-slate-600">{copy.elementStringLabel}</dt>
                <dd className={`font-mono text-sm text-slate-700 ${apiText}`} translate="no">{formatProductCode(product.gtin, product.serial)}</dd>
              </div>
            </dl>
            {isSample && <p className="type-body mt-3 text-slate-600">{copy.sampleNote}</p>}
          </section>
        )}

        {showTimeline && (
          <section aria-labelledby="product-timeline" aria-busy={busy} className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 print:hidden">
            <h2 id="product-timeline" className="type-card-title text-[#0F1E36]">{copy.timelineTitle}</h2>
            {checked ? (
              <ol className="mt-5">
                {[...checked.rows, ...checked.extraRows].map((row, index, all) => (
                  <ProductStageItem key={`${row.stage ?? 'extra'}-${row.index ?? index}`} row={row} copy={copy} locale={locale} isLast={index === all.length - 1} quietUnchecked={quietUnchecked} />
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

        {showDevicePanel ? (
          <section aria-labelledby="product-device" data-device="checked" className="space-y-4 rounded-3xl bg-[#0F1E36] p-5 text-white sm:p-7 print:hidden">
            <h2 id="product-device" className="type-card-title flex items-center gap-2">
              <CheckCircle2 aria-hidden="true" className="h-5 w-5 shrink-0 text-emerald-300" />
              {copy.deviceTitle}
            </h2>
            <p className="type-body text-blue-50">{copy.deviceBody}</p>
            <p className="type-body text-blue-50">
              {copy.rootLinkLead}{' '}
              <a href={`/${locale}/security#root-certificate`} className={`font-semibold text-white underline underline-offset-2 ${focusRing}`}>{copy.rootLink}</a>
              {copy.rootLinkEnd}
            </p>
            {showLimits && (
              <div>
                <h3 className="type-card-title-sm text-white">{copy.limitsTitle}</h3>
                <ul className="type-body mt-2 list-disc space-y-2 pl-5 text-blue-50">
                  {copy.limits.map((limit) => <li key={limit}>{limit}</li>)}
                </ul>
              </div>
            )}
          </section>
        ) : (
          <p data-device="note" className="type-body px-1 text-slate-600 print:hidden">{copy.deviceNote}</p>
        )}

        {isSample && phase === 'done' && product && (
          <section aria-labelledby="product-label" className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 print:border-0 print:p-0">
            <div className="print:hidden">
              <h2 id="product-label" className="type-card-title text-[#0F1E36]">{copy.labelTitle}</h2>
              <p className="type-body mt-1 text-slate-600">{copy.labelBody}</p>
            </div>
            <div className="mt-4 flex w-fit max-w-full items-center gap-3 rounded-2xl border border-slate-300 p-3 sm:gap-4 sm:p-4 print:mt-0">
              <Suspense fallback={<span className="block h-24 w-24 shrink-0 rounded bg-slate-100 sm:h-32 sm:w-32" />}>
                <IdentraQrCode value={`${SITE_URL}${formatDigitalLinkPath(product.gtin, product.serial)}`} label={copy.labelQrAlt} className="h-24 w-24 shrink-0 sm:h-32 sm:w-32 print:h-32 print:w-32" fallback={null} />
              </Suspense>
              <div className="min-w-0 space-y-1 font-mono text-xs text-slate-900" translate="no">
                <p className="whitespace-nowrap">(01) {product.gtin}</p>
                <p className={apiText}>(21) {product.serial}</p>
                <p className="whitespace-nowrap font-sans text-slate-600">identra.awncorp.vn</p>
              </div>
            </div>
            <div className="mt-4 print:hidden">
              <button type="button" onClick={() => window.print()} className={secondaryButton}>
                {copy.print}
              </button>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white print:hidden">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-2 sm:px-6">
          <span className="type-body-sm text-slate-600">{copy.brandName}</span>
          <nav aria-label={copy.brandName} className="flex gap-4">
            <a href={`/${locale}`} className={`type-body-sm inline-flex min-h-11 items-center rounded text-slate-700 underline-offset-2 hover:underline ${focusRing}`}>{copy.footerHome}</a>
            <a href={`/${locale}/security`} className={`type-body-sm inline-flex min-h-11 items-center rounded text-slate-700 underline-offset-2 hover:underline ${focusRing}`}>{copy.footerSecurity}</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

const readSavedLocale = (): string | null => {
  try {
    return window.localStorage.getItem(LANGUAGE_PREFERENCE_KEY);
  } catch {
    return null;
  }
};

const initialLocale = (): ProductLocale => pickProductLocale(
  readSavedLocale(),
  navigator.languages?.length ? navigator.languages : [navigator.language],
);

/** The product page: parses the path at once, then verifies the whole chain in this browser. */
export default function ProductPage({ pathname }: { pathname: string }) {
  const product = useMemo(() => parseDigitalLinkPath(pathname), [pathname]);
  const [locale, setLocale] = useState<ProductLocale>(initialLocale);
  const [phase, setPhase] = useState<ProductPhase>(product ? 'loading' : 'done');
  const [model, setModel] = useState<ProductPageModel | null>(product ? null : { kind: 'invalid_code' });
  const [run, setRun] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const focusResult = useRef(false);
  const copy = PRODUCT_PAGE_TRANSLATIONS[locale];

  useEffect(() => {
    document.title = copy.documentTitle;
    document.documentElement.lang = locale;
  }, [copy.documentTitle, locale]);

  useEffect(() => {
    if (!product) return undefined;
    let cancelled = false;
    void (async () => {
      let loader: ProductLoader;
      try {
        loader = await loadVerifier();
      } catch {
        if (cancelled) return;
        setModel({ kind: 'network_error', ...product, verifiedAt: new Date().toISOString() });
        setPhase('done');
        return;
      }
      if (cancelled) return;
      setPhase('checking');
      const { view, eventsHttpStatus } = await loader.verifyProduct(product.gtin, product.serial);
      if (cancelled) return;
      setModel(toProductPageModel(view, eventsHttpStatus));
      setPhase('done');
    })();
    return () => {
      cancelled = true;
    };
  }, [product, run]);

  // After "check again" / "try again", keyboard and screen-reader focus lands on the new verdict.
  useEffect(() => {
    if (phase === 'done' && focusResult.current) {
      focusResult.current = false;
      headingRef.current?.focus();
    }
  }, [phase]);

  const recheck = () => {
    focusResult.current = true;
    setPhase('checking');
    setRun((value) => value + 1);
  };

  const changeLocale = (next: ProductLocale) => {
    setLocale(next);
    try {
      window.localStorage.setItem(LANGUAGE_PREFERENCE_KEY, next);
    } catch {
      // The choice still applies to this page when storage is unavailable.
    }
  };

  return (
    <ProductPageView
      locale={locale}
      onLocaleChange={changeLocale}
      product={product}
      phase={phase}
      model={model}
      onRecheck={recheck}
      headingRef={headingRef}
    />
  );
}
