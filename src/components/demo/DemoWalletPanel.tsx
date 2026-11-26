/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { AlertTriangle, ArrowLeft, Building2, Check, ChevronRight, GraduationCap, Info, Loader2, RefreshCw, ShieldAlert, ShieldCheck } from 'lucide-react';
import type { ResolvedOffer, Wallet, WalletCredentialStatus } from '@identra/sdk-app';
import { useNow } from '../../hooks/useNow';
import {
  consentView,
  createWalletController,
  DIPLOMA_VCT,
  displayName,
  isDiplomaField,
  issuerView,
  normalizePin,
  orderFields,
  safeText,
  WALLET_HOME,
  type HeldCredential,
  type IssuerView,
  type WalletControllerEvent,
  type WalletControllerState,
  type WalletInboxItem,
  type WalletLocale,
  type WalletScreen,
} from '../../identra/demoWalletModel';
import { certNetIssuerId, formatCountdown, secondsUntil } from '../../identra/verifierSession';
import { DEMO_WALLET_PANEL_TRANSLATIONS, type DemoWalletPanelCopy } from '../../translations/demo/DemoWalletPanelTranslations';
import CertNetTestBuildMarker, { CERTNET_TEST_BUILD } from '../CertNetTestBuildMarker';
import IdentraIssuerId from '../IdentraIssuerId';

// The web trial wallet as a phone-shaped panel, laid out after the Identra app's wallet screens
// (identra-app .review/wallet). Its behaviour lives in createWalletController (demoWalletModel.ts, tested);
// the wallet code itself (@identra/sdk-app) is a lazy chunk loaded on mount.

export type WalletPanelEvent = WalletControllerEvent;

interface DemoWalletPanelProps {
  locale: WalletLocale;
  /** The latest offer or request the page handed over; a new `id` opens it (refused while the wallet is busy). */
  inbox: WalletInboxItem | null;
  /** Changing it empties the wallet ("a new phone"). */
  generation: number;
  /** Server time minus local time, from the page's last server answer: the wallet's clock follows the server. */
  clockOffsetMs: number;
  onEvent: (event: WalletPanelEvent) => void;
  /** True while an accept or a share runs (or a code is being read): the page must not hand over anything then. */
  onBusyChange?: (busy: boolean) => void;
  /** A build made with the test-only CertNet switch: the wallet carries the test-build marker. */
  testBuild?: boolean;
}

let walletModule: Promise<typeof import('../../identra/demoWalletLoader')> | null = null;
const loadWalletModule = () => {
  // Zod (inside the SDK's protocol libraries) would probe `new Function('')` unless `jitless` is set first:
  // under the site's `script-src 'self'` that probe is a reported CSP violation (see ProductPage).
  const zodScope = globalThis as { __zod_globalConfig?: Record<string, unknown> };
  zodScope.__zod_globalConfig = { ...zodScope.__zod_globalConfig, jitless: true };
  walletModule ??= import('../../identra/demoWalletLoader').catch((error: unknown) => {
    walletModule = null;
    throw error;
  });
  return walletModule;
};

const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ''));

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1] focus-visible:ring-offset-2';
const primaryButton = `type-control inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#354CE1] px-5 text-white transition-colors hover:bg-[#2539BE] disabled:cursor-not-allowed disabled:bg-[#354CE1]/45 ${focusRing}`;
const quietButton = `type-control inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl px-5 text-[#2539BE] transition-colors hover:bg-[#E2E6FF]/60 disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`;
const card = 'rounded-3xl bg-white p-4';
const apiText = 'break-words [overflow-wrap:anywhere]';

const STATUS_STYLE: Record<WalletCredentialStatus, { text: string; icon: typeof Check }> = {
  valid: { text: 'text-emerald-700', icon: ShieldCheck },
  unknown: { text: 'text-amber-700', icon: AlertTriangle },
  revoked: { text: 'text-rose-700', icon: ShieldAlert },
  suspended: { text: 'text-rose-700', icon: ShieldAlert },
  invalid: { text: 'text-rose-700', icon: ShieldAlert },
};

const timeFormat = (locale: WalletLocale) => new Intl.DateTimeFormat(locale === 'vi' ? 'vi-VN' : 'en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

const hostOf = (origin: string) => {
  try {
    return new URL(origin).host;
  } catch {
    return origin;
  }
};

/**
 * Who an offer comes from, before the wallet has checked the issuer: the address it came from, which is the only
 * verified fact. The issuer's own display name is never shown as if it were verified. A CertNet issuer's offer
 * says the issuer will be checked through CertNet on receipt (no name is promised) and shows the identifier the
 * issuer declared, complete.
 */
export function OfferSender({ offer, copy }: { offer: Pick<ResolvedOffer, 'issuerOrigin' | 'issuerDid'>; copy: DemoWalletPanelCopy }) {
  const issuerId = certNetIssuerId(offer.issuerDid);
  return (
    <div className="flex items-start gap-3 py-3">
      <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EEF1FF] text-[#0F1E36]"><Building2 className="h-6 w-6" /></span>
      <div className="min-w-0 space-y-0.5">
        <p className="type-body-sm text-slate-600">{copy.senderLabel}</p>
        <p className={`type-card-title-sm text-[#0F1E36] ${apiText}`} data-testid="wallet-offer-issuer">{hostOf(offer.issuerOrigin)}</p>
        {offer.issuerDid ? (
          <>
            <p className="type-body-sm text-slate-600">{copy.senderHintCertNet}</p>
            {issuerId && (
              <div className="type-body-sm pt-1 text-slate-600" data-testid="wallet-offer-issuer-certnet">
                <p>{copy.senderIdLabel}</p>
                <IdentraIssuerId id={issuerId} className="block text-slate-700" />
              </div>
            )}
          </>
        ) : (
          <p className="type-body-sm text-slate-600">{copy.senderHint}</p>
        )}
      </div>
    </div>
  );
}

function StatusLine({ status, copy }: { status: WalletCredentialStatus | null; copy: DemoWalletPanelCopy }) {
  const value = status ?? 'unknown';
  const { text, icon: Icon } = STATUS_STYLE[value];
  return (
    <span className={`type-body-sm inline-flex items-center gap-1.5 font-semibold ${text}`} data-testid="wallet-credential-status" data-status={value}>
      <Icon aria-hidden="true" className="h-4 w-4" />
      {copy.statuses[value]}
    </span>
  );
}

function DocumentIcon({ className = 'h-12 w-12' }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`flex shrink-0 items-center justify-center rounded-2xl bg-[#EEF1FF] text-[#0F1E36] ${className}`}>
      <GraduationCap className="h-6 w-6" />
    </span>
  );
}

function ScreenHeader({ title, onBack, backLabel }: { title: string; onBack?: () => void; backLabel?: string }) {
  return (
    <div className="flex min-h-12 items-center gap-2">
      {onBack && (
        <button type="button" onClick={onBack} aria-label={backLabel} title={backLabel} data-testid="wallet-back" className={`-ml-2 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-[#0F1E36] hover:bg-slate-200/60 ${focusRing}`}>
          <ArrowLeft aria-hidden="true" className="h-5 w-5" />
        </button>
      )}
      <h3 id="demo-wallet-screen-title" tabIndex={-1} className="type-card-title text-[#0F1E36] focus:outline-none">{title}</h3>
    </div>
  );
}

function Working({ text, testId }: { text: string; testId: string }) {
  return (
    <p className="type-body flex min-h-40 items-center justify-center gap-2 text-slate-700" data-testid={testId}>
      <Loader2 aria-hidden="true" className="h-5 w-5 text-[#354CE1] motion-safe:animate-spin" />
      {text}
    </p>
  );
}

/** "Could not be checked right now" is amber, as in the employer result; every other problem is a refusal. */
const UNCHECKED_PROBLEMS: readonly string[] = ['verifierCouldNotCheck', 'certnetUnavailable', 'trustListUnavailable'];

function Problem({ text, testId, problem }: { text: string; testId: string; problem?: string }) {
  const unchecked = problem !== undefined && UNCHECKED_PROBLEMS.includes(problem);
  return (
    <p role="alert" className={`type-body flex items-start gap-2 rounded-2xl px-4 py-3 ${unchecked ? 'bg-amber-50 text-amber-950' : 'bg-rose-50 text-rose-900'}`} data-testid={testId} data-problem={problem}>
      <AlertTriangle aria-hidden="true" className={`mt-0.5 h-4 w-4 shrink-0 ${unchecked ? 'text-amber-700' : ''}`} />
      <span>{text}</span>
    </p>
  );
}

const focusTitle = () => window.requestAnimationFrame(() => document.getElementById('demo-wallet-screen-title')?.focus({ preventScroll: true }));
const focusPin = () => window.requestAnimationFrame(() => {
  const input = document.getElementById('demo-wallet-pin');
  if (!input) return focusTitle();
  input.scrollIntoView({ block: 'nearest' });
  input.focus({ preventScroll: true });
});

const claimText = (value: unknown): string | null => safeText(typeof value === 'number' ? String(value) : value, 200);

const IDLE_STATE: WalletControllerState = { screen: WALLET_HOME, held: [], busy: false, checking: null, notes: {} };

/** A CertNet document's issuer: how it is looked up, then its complete identifier (that path has no name, ADR-0020). */
function CertNetIssuer({ id, copy }: { id: string | null; copy: DemoWalletPanelCopy }) {
  return (
    <span className="type-body-sm block text-slate-600" data-testid="wallet-issuer-certnet">
      <span className="block">{copy.issuerCertNet}</span>
      {id && <IdentraIssuerId id={id} className="block text-slate-700" />}
    </span>
  );
}

/** The issuer line of a document card: the trust-list name (X.509, as before) or the CertNet identifier. */
export function IssuerLine({ issuer, copy, compact = false }: { issuer: IssuerView; copy: DemoWalletPanelCopy; compact?: boolean }) {
  if (issuer.trustPath === 'did') return <CertNetIssuer id={issuer.did} copy={copy} />;
  return compact
    ? <span className={`type-body-sm block text-slate-600 ${apiText}`}>{issuer.name ?? copy.issuerUnknown}</span>
    : <p className={`type-body-sm text-slate-600 ${apiText}`}>{issuer.name ?? copy.issuerUnknown}</p>;
}
const noop = () => () => undefined;

/** What an earlier send of the request left with the verifier: it stays there, the wallet cannot take it back. */
function DeliveredBefore({ fields, copy }: { fields: string; copy: DemoWalletPanelCopy }) {
  return <p className="type-body-sm rounded-2xl bg-white px-4 py-3 text-slate-700" data-testid="wallet-delivered-before">{fill(copy.deliveredBefore, { fields })}</p>;
}

export default function DemoWalletPanel({ locale, inbox, generation, clockOffsetMs, onEvent, onBusyChange, testBuild = CERTNET_TEST_BUILD }: DemoWalletPanelProps) {
  const copy = DEMO_WALLET_PANEL_TRANSLATIONS[locale];
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [pin, setPin] = useState('');
  const [pinTouched, setPinTouched] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const handledInbox = useRef<number | null>(null);
  const handledGeneration = useRef(generation);
  const mounted = useRef(true);
  const onEventRef = useRef(onEvent);
  const localeRef = useRef(locale);
  const moduleRef = useRef<typeof import('../../identra/demoWalletLoader') | null>(null);
  const time = timeFormat(locale);

  useEffect(() => {
    onEventRef.current = onEvent;
    localeRef.current = locale;
  });
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const load = useCallback(() => {
    setLoadFailed(false);
    loadWalletModule()
      .then((module) => {
        if (!mounted.current) return;
        moduleRef.current = module;
        module.setDemoWalletClockOffset(clockOffsetMs);
        if (handledGeneration.current !== generation) {
          handledGeneration.current = generation;
          setWallet(module.resetDemoWallet());
        } else {
          setWallet(module.getDemoWallet());
        }
      })
      .catch(() => {
        if (mounted.current) setLoadFailed(true);
      });
    // The clock offset is applied by its own effect below; reloading the wallet for it would empty nothing but is not needed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generation]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    moduleRef.current?.setDemoWalletClockOffset(clockOffsetMs);
  }, [clockOffsetMs]);

  // One controller per wallet ("phone"): a new generation is a new phone with nothing in it.
  const controller = useMemo(
    () => (wallet ? createWalletController(wallet, (event) => onEventRef.current(event), () => localeRef.current) : null),
    [wallet],
  );
  const state = useSyncExternalStore(controller?.subscribe ?? noop, controller?.getState ?? (() => IDLE_STATE), () => IDLE_STATE);
  const { screen, held, busy, checking, notes } = state;

  useEffect(() => {
    if (!controller) return;
    setPin('');
    setPinTouched(false);
    void controller.refresh();
  }, [controller]);

  useEffect(() => {
    onBusyChange?.(busy);
  }, [busy, onBusyChange]);

  // Focus what the visitor has to do next when a screen opens.
  const screenName = screen.name;
  useEffect(() => {
    if (screenName === 'offerConsent') focusPin();
    else if (screenName !== 'home' && screenName !== 'offerChecking' && screenName !== 'requestChecking') focusTitle();
  }, [screenName]);

  // Open what the page handed over: an offer or a presentation request (the QR text, no camera needed).
  useEffect(() => {
    if (!controller || !inbox || handledInbox.current === inbox.id) return;
    handledInbox.current = inbox.id;
    if (controller.open(inbox)) {
      setAnnouncement(copy.inboxAnnouncement);
      if (inbox.kind === 'offer') {
        setPin('');
        setPinTouched(false);
      }
    }
  }, [controller, copy.inboxAnnouncement, inbox]);

  const accept = async () => {
    if (!controller) return;
    const outcome = await controller.accept(pin);
    if (!mounted.current) return;
    if (outcome === 'pinIncomplete') {
      setPinTouched(true);
      document.getElementById('demo-wallet-pin')?.focus();
      return;
    }
    const after = controller.getState().screen;
    if (after.name === 'offerConsent' && after.problem === 'pinWrong') {
      setPin('');
      document.getElementById('demo-wallet-pin')?.focus();
    }
    // CertNet did not answer: the PIN field is gone, so bring the explanation (and the retry it offers) into view.
    if (after.name === 'offerConsent' && after.problem === 'certnetUnavailable') {
      window.requestAnimationFrame(() => document.querySelector('[data-testid="wallet-offer-problem"]')?.scrollIntoView({ block: 'nearest' }));
    }
  };

  // ---- Screens ----------------------------------------------------------------------------------

  const fieldList = (fields: readonly string[]) => fields.map((name) => (isDiplomaField(name) ? copy.claims[name] : name)).join(copy.listJoiner);
  const documentName = (vct: string) => (vct === DIPLOMA_VCT ? copy.documentTypes.diploma : copy.documentTypes.unknown);

  let body: ReactNode;
  let actions: ReactNode = null;

  if (!controller) {
    body = loadFailed ? (
      <div className="space-y-4 pt-6">
        <Problem text={copy.loadFailed} testId="wallet-load-failed" />
        <button type="button" onClick={load} className={primaryButton} data-testid="wallet-load-retry">
          <RefreshCw aria-hidden="true" className="h-4 w-4" />
          {copy.retry}
        </button>
      </div>
    ) : <Working text={copy.loadingWallet} testId="wallet-loading" />;
  } else if (screen.name === 'home') {
    body = (
      <div className="space-y-4" data-testid="wallet-home">
        <ScreenHeader title={copy.homeTitle} />
        {held.length === 0 ? (
          <div className={`${card} space-y-2 py-6 text-center`} data-testid="wallet-empty">
            <DocumentIcon className="mx-auto h-14 w-14" />
            <p className="type-card-title-sm text-[#0F1E36]">{copy.emptyTitle}</p>
            <p className="type-body text-slate-600">{copy.emptyLead}</p>
          </div>
        ) : (
          <>
            <p className="type-body-sm text-slate-600">{fill(copy.count, { count: held.length })}</p>
            <ul className={`${card} divide-y divide-slate-100 py-1`}>
              {held.map(({ summary, details }) => (
                <li key={summary.id} data-testid="wallet-credential" data-status={summary.status ?? 'unknown'}>
                  <button
                    type="button"
                    onClick={() => controller.openDetail(summary.id)}
                    aria-label={fill(copy.openDocument, { document: documentName(summary.vct) })}
                    data-testid="wallet-credential-open"
                    className={`flex w-full cursor-pointer items-center gap-3 rounded-2xl py-3 text-left ${focusRing}`}
                  >
                    <DocumentIcon />
                    <span className="min-w-0 flex-1 space-y-0.5">
                      <span className="type-card-title-sm block text-[#0F1E36]">{documentName(summary.vct)}</span>
                      <IssuerLine issuer={issuerView({ ...summary, issuerName: details?.issuerName })} copy={copy} compact />
                      <span className="type-body-sm block text-slate-600">{fill(copy.receivedOn, { time: time.format(new Date(summary.createdAt)) })}</span>
                      <StatusLine status={summary.status} copy={copy} />
                    </span>
                    <ChevronRight aria-hidden="true" className="h-5 w-5 shrink-0 text-slate-400" />
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  } else if (screen.name === 'detail') {
    const item = held.find((candidate) => candidate.summary.id === screen.credentialId);
    const claims = item?.details?.claims ?? {};
    const checkingThis = checking?.id === screen.credentialId;
    // What CertNet said at this document's last check, unless a new check is running.
    const note = checkingThis && !checking.failed ? undefined : notes[screen.credentialId];
    body = (
      <div className="space-y-4" data-testid="wallet-detail">
        <ScreenHeader title={copy.detailTitle} onBack={() => controller.home()} backLabel={copy.backToList} />
        {item && (
          <>
            <div className={`${card} flex items-center gap-3`}>
              <DocumentIcon />
              <div className="min-w-0">
                <p className="type-card-title-sm text-[#0F1E36]">{documentName(item.summary.vct)}</p>
                <IssuerLine issuer={issuerView({ ...item.summary, issuerName: item.details?.issuerName })} copy={copy} />
              </div>
            </div>
            <section className={card} aria-labelledby="demo-wallet-validity">
              <h4 id="demo-wallet-validity" className="type-body-sm text-slate-600">{copy.statusSection}</h4>
              <div className="mt-1"><StatusLine status={item.summary.status} copy={copy} /></div>
              {item.summary.statusCheckedAt && (
                <p className="type-body-sm mt-1 text-slate-600">{fill(copy.checkedAt, { time: time.format(new Date(item.summary.statusCheckedAt)) })}</p>
              )}
              {note ? (
                <p className={`type-body-sm mt-2 ${note === 'issuerNotRecognised' ? 'text-rose-800' : 'text-amber-800'}`} data-testid="wallet-check-note" data-note={note}>{copy.checkNotes[note]}</p>
              ) : checkingThis && checking.failed && <p className="type-body-sm mt-2 text-amber-800">{copy.checkFailed}</p>}
              <button type="button" onClick={() => void controller.checkAgain(screen.credentialId)} disabled={checkingThis && !checking.failed} className={`${quietButton} mt-2`} data-testid="wallet-check-again">
                {checkingThis && !checking.failed ? <Loader2 aria-hidden="true" className="h-4 w-4 motion-safe:animate-spin" /> : <RefreshCw aria-hidden="true" className="h-4 w-4" />}
                {checkingThis && !checking.failed ? copy.checking : copy.checkAgain}
              </button>
            </section>
            {item.summary.trustPath === 'did' && (
              <p className="type-body-sm flex items-start gap-2 rounded-2xl bg-[#EEF1FF] px-4 py-3 text-slate-700" data-testid="wallet-certnet-about">
                <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#354CE1]" />
                <span>{copy.certnetAbout}</span>
              </p>
            )}
            <section className={card} aria-labelledby="demo-wallet-fields">
              <h4 id="demo-wallet-fields" className="type-card-title-sm text-[#0F1E36]">{copy.fieldsSection}</h4>
              <dl className="mt-1 divide-y divide-slate-100">
                {orderFields(Object.keys(claims)).map((name) => {
                  const value = claimText(claims[name]);
                  if (value === null) return null;
                  return (
                    <div key={name} className="py-2.5">
                      <dt className="type-body-sm text-slate-600">{isDiplomaField(name) ? copy.claims[name] : <bdi>{safeText(name, 64)}</bdi>}</dt>
                      <dd className={`type-body font-semibold text-slate-900 ${apiText}`}><bdi>{value}</bdi></dd>
                    </div>
                  );
                })}
              </dl>
            </section>
          </>
        )}
      </div>
    );
  } else if (screen.name === 'offerChecking') {
    body = (
      <div className="space-y-4">
        <ScreenHeader title={copy.receiveTitle} onBack={() => controller.home()} backLabel={copy.backHome} />
        <Working text={copy.checkingOffer} testId="wallet-offer-checking" />
      </div>
    );
  } else if (screen.name === 'offerConsent') {
    const { offer } = screen;
    const documentTitle = displayName(offer.configuration.display, locale) ?? documentName(offer.configuration.vct);
    const pinLength = offer.txCode?.length ?? 6;
    const needsPin = !offer.codeRedeemed && offer.txCode !== null;
    const showIncomplete = pinTouched && needsPin && pin.length < pinLength;
    body = (
      <div className="space-y-4" data-testid="wallet-offer-consent">
        <ScreenHeader title={copy.receiveTitle} onBack={screen.busy ? undefined : () => controller.home()} backLabel={copy.cancel} />
        <div className="space-y-1">
          <p className={`type-featured-title text-[#0F1E36] ${apiText}`}>{fill(copy.offerTitle, { document: documentTitle })}</p>
          <p className="type-body text-slate-600">{copy.lead}</p>
        </div>
        <div className={`${card} divide-y divide-slate-100 py-1`}>
          <div className="flex items-center gap-3 py-3">
            <DocumentIcon />
            <div className="min-w-0">
              <p className="type-body-sm text-slate-600">{copy.documentLabel}</p>
              <p className={`type-card-title-sm text-[#0F1E36] ${apiText}`}>{documentTitle}</p>
            </div>
          </div>
          <OfferSender offer={offer} copy={copy} />
        </div>
        {needsPin && (
          <div className="space-y-2">
            <label htmlFor="demo-wallet-pin" className="type-body block font-semibold text-[#0F1E36]">{copy.pinLabel}</label>
            <input
              id="demo-wallet-pin"
              value={pin}
              onChange={(event) => setPin(normalizePin(event.target.value, pinLength))}
              onKeyDown={(event) => { if (event.key === 'Enter') void accept(); }}
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={pinLength}
              disabled={screen.busy}
              aria-describedby="demo-wallet-pin-hint"
              aria-invalid={screen.problem === 'pinWrong' || showIncomplete}
              data-testid="wallet-pin-input"
              className="type-featured-title h-14 w-full rounded-2xl border border-slate-300 bg-white px-4 text-center tabular-nums text-[#0F1E36] [letter-spacing:0.5em] focus:border-[#354CE1] focus:outline-none focus:ring-2 focus:ring-[#354CE1]/25"
            />
            <p id="demo-wallet-pin-hint" className="type-body-sm text-slate-600">{copy.pinHint}</p>
          </div>
        )}
        {screen.problem && <Problem text={copy.problems[screen.problem]} testId="wallet-offer-problem" problem={screen.problem} />}
        <p className="type-body-sm flex items-start gap-2 rounded-2xl bg-[#EEF1FF] px-4 py-3 text-slate-700">
          <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#354CE1]" />
          <span>{copy.keyNote}</span>
        </p>
      </div>
    );
    actions = (
      <>
        <button type="button" onClick={() => void accept()} disabled={screen.busy} className={primaryButton} data-testid="wallet-accept">
          {screen.busy && <Loader2 aria-hidden="true" className="h-4 w-4 motion-safe:animate-spin" />}
          {screen.busy ? copy.accepting : copy.accept}
        </button>
        {showIncomplete && <p className="type-body-sm text-center text-slate-600">{copy.pinIncomplete}</p>}
        <button type="button" onClick={() => controller.home()} disabled={screen.busy} className={quietButton} data-testid="wallet-cancel">{copy.cancel}</button>
      </>
    );
  } else if (screen.name === 'offerSaved') {
    body = (
      <div className="space-y-4 pt-4" data-testid="wallet-offer-saved">
        <span aria-hidden="true" className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><Check className="h-8 w-8" strokeWidth={3} /></span>
        <h3 id="demo-wallet-screen-title" tabIndex={-1} className="type-featured-title text-center text-[#0F1E36] focus:outline-none">{copy.savedTitle}</h3>
        {screen.issuerName && (
          <p className={`type-body text-center font-semibold text-[#0F1E36] ${apiText}`} data-testid="wallet-saved-issuer">{fill(copy.savedIssuer, { name: screen.issuerName })}</p>
        )}
        {screen.issuerDid ? (
          <>
            <div className="type-body text-center font-semibold text-[#0F1E36]" data-testid="wallet-saved-issuer-certnet">
              <p>{screen.checked ? copy.savedIssuerCertNet : copy.savedIssuerCertNetUnchecked}</p>
              <IdentraIssuerId id={screen.issuerDid} />
            </div>
            <p className="type-body text-center text-slate-700">{screen.checked ? copy.savedLeadCertNet : copy.savedLeadCertNetUnchecked}</p>
          </>
        ) : (
          <p className="type-body text-center text-slate-700">{screen.checked ? copy.savedLead : copy.savedLeadUnchecked}</p>
        )}
      </div>
    );
    actions = (
      <>
        <button type="button" onClick={() => controller.openDetail(screen.credentialId)} className={primaryButton} data-testid="wallet-view-document">{copy.viewDocument}</button>
        <button type="button" onClick={() => controller.home()} className={quietButton} data-testid="wallet-back-home">{copy.backHome}</button>
      </>
    );
  } else if (screen.name === 'offerFailed' || screen.name === 'requestFailed') {
    const isOffer = screen.name === 'offerFailed';
    body = (
      <div className="space-y-4 pt-4" data-testid={isOffer ? 'wallet-offer-failed' : 'wallet-request-failed'} data-problem={screen.problem}>
        <span aria-hidden="true" className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-700"><AlertTriangle className="h-8 w-8" /></span>
        <h3 id="demo-wallet-screen-title" tabIndex={-1} className="type-featured-title text-center text-[#0F1E36] focus:outline-none">{isOffer ? copy.offerFailedTitle : screen.delivered ? copy.usedUpTitle : copy.requestFailedTitle}</h3>
        <p className="type-body text-center text-slate-700">{copy.problems[screen.problem]}</p>
        {isOffer && <p className="type-body-sm text-center text-slate-600">{copy.nothingSaved}</p>}
        {!isOffer && screen.delivered && <DeliveredBefore fields={fieldList(screen.delivered)} copy={copy} />}
      </div>
    );
    actions = <button type="button" onClick={() => controller.home()} className={primaryButton} data-testid="wallet-back-home">{copy.backHome}</button>;
  } else if (screen.name === 'requestChecking') {
    body = (
      <div className="space-y-4">
        <ScreenHeader title={copy.presentTitle} onBack={() => controller.home()} backLabel={copy.backHome} />
        <Working text={copy.checkingRequest} testId="wallet-request-checking" />
      </div>
    );
  } else if (screen.name === 'requestConsent') {
    const view = consentView(screen.request, held, screen.optionIndex, locale);
    body = <RequestConsent screen={screen} view={view} held={held} copy={copy} fieldList={fieldList} documentName={documentName} time={time} clockOffsetMs={clockOffsetMs} />;
    const choosable = view.trusted && view.match !== null && view.blocked === null;
    // Received but not checked yet: only that same share can go again, or the visitor stops.
    const locked = screen.delivered !== null;
    actions = locked ? (
      <>
        <p className="type-body-sm rounded-xl bg-white px-3 py-2 text-slate-700" data-testid="wallet-delivered-note">{copy.deliveredNote}</p>
        <button type="button" onClick={() => void controller.share()} disabled={screen.busy || !view.canShare} className={`${primaryButton} mt-1`} data-testid="wallet-share">
          {screen.busy ? <Loader2 aria-hidden="true" className="h-4 w-4 motion-safe:animate-spin" /> : <RefreshCw aria-hidden="true" className="h-4 w-4" />}
          {screen.busy ? copy.sending : copy.shareAgain}
        </button>
        <button type="button" onClick={() => controller.decline()} disabled={screen.busy} className={quietButton} data-testid="wallet-decline">{copy.stop}</button>
      </>
    ) : (
      <>
        {choosable && (
          <>
            {view.staying.length > 0 && (
              <p className="type-body-sm rounded-xl bg-emerald-50 px-3 py-2 text-emerald-950" data-testid="wallet-staying">
                {fill(copy.stayingLine, { fields: fieldList(view.staying) })}
              </p>
            )}
            {view.options.length > 0 && (
              <fieldset className="space-y-1.5 pt-1" data-testid="wallet-options">
                <legend className="type-body-sm font-semibold text-[#0F1E36]">{copy.optionsTitle}</legend>
                {view.options.map((option, index) => (
                  <label
                    key={option.index}
                    className={`flex cursor-pointer items-start gap-2.5 rounded-xl bg-white px-3 py-2 ${index === screen.optionIndex ? 'ring-2 ring-[#354CE1]' : 'ring-1 ring-slate-200'}`}
                  >
                    <input
                      type="radio"
                      name="demo-wallet-option"
                      checked={index === screen.optionIndex}
                      onChange={() => controller.choose(index)}
                      disabled={screen.busy}
                      data-testid={`wallet-option-${index}`}
                      className="mt-1 h-4 w-4 shrink-0 accent-[#354CE1]"
                    />
                    <span className="type-body-sm text-[#0F1E36]">
                      {option.withheld.length === 0
                        ? fill(copy.optionFull, { count: option.fields.length })
                        : fill(copy.optionOnly, { fields: fieldList(option.fields) })}
                    </span>
                  </label>
                ))}
              </fieldset>
            )}
          </>
        )}
        {choosable && (
          <button type="button" onClick={() => void controller.share()} disabled={screen.busy || !view.canShare} className={`${primaryButton} mt-1`} data-testid="wallet-share">
            {screen.busy && <Loader2 aria-hidden="true" className="h-4 w-4 motion-safe:animate-spin" />}
            {screen.busy ? copy.sending : copy.share}
          </button>
        )}
        {choosable && !view.canShare && !screen.busy && <p className="type-body-sm text-center text-slate-600" data-testid="wallet-choose-first">{copy.chooseFirst}</p>}
        <button type="button" onClick={() => controller.decline()} disabled={screen.busy} className={choosable ? quietButton : primaryButton} data-testid="wallet-decline">{copy.decline}</button>
      </>
    );
  } else if (screen.name === 'requestSent') {
    body = (
      <div className="space-y-4 pt-4" data-testid="wallet-request-sent">
        <span aria-hidden="true" className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><Check className="h-8 w-8" strokeWidth={3} /></span>
        <h3 id="demo-wallet-screen-title" tabIndex={-1} className={`type-featured-title text-center text-[#0F1E36] focus:outline-none ${apiText}`}>
          {screen.verifierName ? fill(copy.sentTitle, { name: screen.verifierName }) : copy.sentTitleUnnamed}
        </h3>
        <p className="type-body text-center text-slate-700">{copy.sentBody}</p>
        <p className="type-body-sm rounded-2xl bg-white px-4 py-3 text-slate-700">{fill(copy.sentFields, { fields: fieldList(screen.fields) })}</p>
      </div>
    );
    actions = <button type="button" onClick={() => controller.home()} className={primaryButton} data-testid="wallet-back-home">{copy.backHome}</button>;
  } else {
    body = (
      <div className="space-y-4 pt-4" data-testid="wallet-request-declined" data-stopped={screen.delivered ? true : undefined}>
        <h3 id="demo-wallet-screen-title" tabIndex={-1} className="type-featured-title text-center text-[#0F1E36] focus:outline-none">{screen.delivered ? copy.stoppedTitle : copy.declinedTitle}</h3>
        <p className="type-body text-center text-slate-700">{screen.delivered ? copy.stoppedBody : copy.declinedBody}</p>
        {screen.delivered && <DeliveredBefore fields={fieldList(screen.delivered)} copy={copy} />}
      </div>
    );
    actions = <button type="button" onClick={() => controller.home()} className={primaryButton} data-testid="wallet-back-home">{copy.backHome}</button>;
  }

  return (
    <div className="space-y-4" data-testid="wallet-panel" data-screen={controller ? screen.name : 'loading'} data-busy={busy || undefined}>
      {testBuild && <div className="mx-auto max-w-[400px] lg:mr-0"><CertNetTestBuildMarker text={copy.testBuildMarker} /></div>}
      <div
        role="group"
        aria-label={copy.phoneLabel}
        className="mx-auto flex h-[640px] w-full max-w-[400px] flex-col overflow-hidden rounded-[44px] bg-[#0F1E36] p-2.5 sm:h-[700px] lg:mr-0 lg:h-[min(780px,calc(100vh-7.5rem))] lg:min-h-[600px]"
      >
        <div className="px-4 pb-2 pt-1 text-center text-white" data-testid="wallet-trial-label">
          <p className="type-body-sm font-semibold">{copy.trialBadge}</p>
          <p className="type-caption text-white/75">{copy.trialStrip}</p>
        </div>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[34px] bg-[#F5F7FB]">
          <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4 pt-3 [overscroll-behavior:contain]">{body}</div>
          {actions && <div className="space-y-1 bg-[#F5F7FB] px-4 pb-4 pt-3 shadow-[0_-1px_0_rgba(15,30,54,0.08)]">{actions}</div>}
        </div>
      </div>
      <p role="status" aria-live="polite" className="sr-only">{announcement}</p>
      <div className="mx-auto max-w-[400px] rounded-2xl bg-slate-100 px-4 py-3 lg:mr-0" data-testid="wallet-honesty">
        <p className="type-body-sm font-semibold text-slate-900">{copy.honestyTitle}</p>
        <p className="type-body-sm mt-1 text-slate-700">{copy.honestyBody}</p>
      </div>
    </div>
  );
}

function RequestConsent({
  screen,
  view,
  held,
  copy,
  fieldList,
  documentName,
  time,
  clockOffsetMs,
}: {
  screen: Extract<WalletScreen, { name: 'requestConsent' }>;
  view: ReturnType<typeof consentView>;
  held: HeldCredential[];
  copy: DemoWalletPanelCopy;
  fieldList: (fields: readonly string[]) => string;
  documentName: (vct: string) => string;
  time: Intl.DateTimeFormat;
  clockOffsetMs: number;
}) {
  const now = useNow();
  const { request } = screen;
  const details = view.match ? held.find((item) => item.summary.id === view.match?.credentialId)?.details : undefined;
  const shownFields = view.selected?.fields ?? view.requested;

  return (
    <div className="space-y-4" data-testid="wallet-request-consent" data-locked={screen.delivered ? true : undefined}>
      <ScreenHeader title={copy.presentTitle} />
      <div className="flex flex-wrap items-center justify-between gap-2">
        {view.trusted ? (
          <span className="type-body-sm inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-slate-800" data-testid="wallet-verifier-trusted">
            <ShieldCheck aria-hidden="true" className="h-4 w-4 text-emerald-600" />
            {copy.verifiedMark}
          </span>
        ) : <span />}
        <span className="type-body-sm rounded-full bg-white px-3 py-1 tabular-nums text-slate-700">
          {fill(copy.expiresIn, { time: formatCountdown(secondsUntil(request.expiresAt, now + clockOffsetMs)) })}
        </span>
      </div>
      {view.trusted ? (
        <div className="space-y-1">
          <p className={`type-featured-title text-[#0F1E36] ${apiText}`} data-testid="wallet-verifier-name">
            {view.verifierName ? fill(copy.wantsToSee, { name: view.verifierName }) : copy.wantsToSeeUnnamed}
          </p>
          {view.purpose && <p className={`type-body text-slate-600 ${apiText}`} data-testid="wallet-purpose">{fill(copy.purpose, { purpose: view.purpose })}</p>}
        </div>
      ) : (
        <div className="space-y-2 rounded-3xl border-2 border-rose-500 bg-white p-4" data-testid="wallet-verifier-untrusted">
          <p className="type-card-title-sm text-rose-800">{copy.untrustedTitle}</p>
          <p className="type-body text-slate-700">{copy.untrustedBody}</p>
        </div>
      )}

      {view.trusted && !view.match && (
        <div className={card} data-testid="wallet-no-match">
          <p className="type-card-title-sm text-[#0F1E36]">{copy.noMatchTitle}</p>
          <p className="type-body mt-1 text-slate-700">{copy.noMatchBody}</p>
        </div>
      )}

      {view.trusted && view.match && view.blocked && (
        <p role="alert" className="type-body rounded-3xl border-2 border-rose-500 bg-white px-4 py-3 text-slate-800" data-testid="wallet-blocked" data-status={view.blocked}>
          {copy.blocked[view.blocked]}
        </p>
      )}

      {view.trusted && view.match && (
        <>
          <section aria-labelledby="demo-wallet-document" className="space-y-2">
            <h4 id="demo-wallet-document" className="type-card-title-sm text-[#0F1E36]">{copy.documentInUse}</h4>
            <div className={`${card} flex items-center gap-3`}>
              <DocumentIcon />
              <div className="min-w-0 space-y-0.5">
                <p className="type-card-title-sm text-[#0F1E36]">{documentName(view.match.vct)}</p>
                <IssuerLine issuer={issuerView(view.match)} copy={copy} />
                {view.summary && <p className="type-body-sm text-slate-600">{fill(copy.receivedOn, { time: time.format(new Date(view.summary.createdAt)) })}</p>}
                <StatusLine status={view.summary?.status ?? null} copy={copy} />
              </div>
            </div>
          </section>
          {!view.blocked && (
            <section aria-labelledby="demo-wallet-leaving" className="space-y-2">
              <h4 id="demo-wallet-leaving" className="type-card-title-sm text-[#0F1E36]">{screen.delivered ? copy.deliveredTitle : view.selected ? copy.fieldsTitle : copy.requestedTitle}</h4>
              <dl className={`${card} divide-y divide-slate-100 py-1`} data-testid="wallet-fields">
                {shownFields.map((field: string) => {
                  const value = claimText(details?.claims[field]);
                  return (
                    <div key={field} className="py-2.5" data-testid="wallet-field" data-field={field}>
                      <dt className="type-body-sm flex items-center gap-2 text-slate-600">
                        {isDiplomaField(field) ? copy.claims[field] : <bdi>{safeText(field, 64)}</bdi>}
                        {view.required.includes(field) && <span className="type-caption rounded-full border border-slate-200 px-2 text-slate-600">{copy.required}</span>}
                      </dt>
                      {value && <dd className={`type-body font-semibold text-slate-900 ${apiText}`}><bdi>{value}</bdi></dd>}
                    </div>
                  );
                })}
              </dl>
              {!screen.delivered && <p className="type-body-sm text-slate-600">{fill(copy.requiredHint, { fields: fieldList(view.required) })}</p>}
            </section>
          )}
        </>
      )}
      {screen.problem && <Problem text={copy.problems[screen.problem]} testId="wallet-request-problem" problem={screen.problem} />}
    </div>
  );
}
