/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useReducer, useRef, useState, type ReactNode } from 'react';
import { AlertTriangle, ArrowLeft, Building2, Check, ChevronRight, GraduationCap, Info, Loader2, RefreshCw, ShieldAlert, ShieldCheck } from 'lucide-react';
import type { CredentialDetails, CredentialSummary, Wallet, WalletCredentialStatus } from '@identra/sdk-app';
import { useNow } from '../../hooks/useNow';
import {
  chooseMatch,
  DIPLOMA_VCT,
  displayName,
  isBusyScreen,
  isDiplomaField,
  normalizePin,
  orderFields,
  purposeText,
  requiredFields,
  safeText,
  sharingOptions,
  WALLET_HOME,
  walletReducer,
  type WalletInboxItem,
  type WalletLocale,
  type WalletScreen,
} from '../../identra/demoWalletModel';
import { formatCountdown, secondsUntil } from '../../identra/verifierSession';
import { DEMO_WALLET_PANEL_TRANSLATIONS, type DemoWalletPanelCopy } from '../../translations/demo/DemoWalletPanelTranslations';

// The web trial wallet as a phone-shaped panel, laid out after the Identra app's wallet screens
// (identra-app .review/wallet). The wallet code itself (@identra/sdk-app) is a lazy chunk loaded on mount.

export type WalletPanelEvent =
  | { type: 'credentialReceived'; credentialId: string }
  | { type: 'presentationSent' }
  | { type: 'presentationDeclined' }
  /** The wallet already knows the credential is no longer good and will not share it (as the app does). */
  | { type: 'presentationBlocked'; status: 'revoked' | 'suspended' | 'invalid' };

interface DemoWalletPanelProps {
  locale: WalletLocale;
  /** The latest offer or request the page handed over; a new `id` opens it. */
  inbox: WalletInboxItem | null;
  /** Changing it empties the wallet ("a new phone"). */
  generation: number;
  onEvent: (event: WalletPanelEvent) => void;
}

interface HeldCredential {
  summary: CredentialSummary;
  details: CredentialDetails | null;
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

function Problem({ text, testId, problem }: { text: string; testId: string; problem?: string }) {
  return (
    <p role="alert" className="type-body flex items-start gap-2 rounded-2xl bg-rose-50 px-4 py-3 text-rose-900" data-testid={testId} data-problem={problem}>
      <AlertTriangle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{text}</span>
    </p>
  );
}

const focusPin = () => window.requestAnimationFrame(() => {
  const input = document.getElementById('demo-wallet-pin');
  if (!input) return focusTitle();
  input.scrollIntoView({ block: 'nearest' });
  input.focus({ preventScroll: true });
});
const focusTitle = () => window.requestAnimationFrame(() => document.getElementById('demo-wallet-screen-title')?.focus({ preventScroll: true }));

const claimText = (value: unknown): string | null => safeText(typeof value === 'number' ? String(value) : value, 200);

export default function DemoWalletPanel({ locale, inbox, generation, onEvent }: DemoWalletPanelProps) {
  const copy = DEMO_WALLET_PANEL_TRANSLATIONS[locale];
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [screen, dispatch] = useReducer(walletReducer, WALLET_HOME);
  const [held, setHeld] = useState<HeldCredential[]>([]);
  const [pin, setPin] = useState('');
  const [pinTouched, setPinTouched] = useState(false);
  const [checking, setChecking] = useState<{ id: string; failed: boolean } | null>(null);
  const [announcement, setAnnouncement] = useState('');
  const handledInbox = useRef<number | null>(null);
  const handledGeneration = useRef(generation);
  const operation = useRef(0);
  const mounted = useRef(true);
  const onEventRef = useRef(onEvent);
  const screenRef = useRef<WalletScreen>(screen);
  const blockedReported = useRef<object | null>(null);
  const time = timeFormat(locale);

  useEffect(() => {
    onEventRef.current = onEvent;
    screenRef.current = screen;
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
  }, [generation]);

  useEffect(() => {
    load();
  }, [load]);

  // A new generation is a new phone: nothing held, back to the list.
  useEffect(() => {
    if (!wallet) return;
    operation.current += 1;
    dispatch({ type: 'home' });
    setPin('');
    setPinTouched(false);
  }, [wallet]);

  const refreshHeld = useCallback(async (target: Wallet) => {
    const summaries = await target.credentials.list();
    const details = await Promise.all(summaries.map(async (summary) => {
      const result = await target.credentials.get(summary.id);
      return { summary, details: result.ok ? result.credential : null };
    }));
    if (mounted.current) setHeld(details.sort((a, b) => Date.parse(b.summary.createdAt) - Date.parse(a.summary.createdAt)));
    return details;
  }, []);

  useEffect(() => {
    if (wallet) void refreshHeld(wallet);
  }, [refreshHeld, wallet]);


  // Open what the page handed over: an offer or a presentation request (the QR text, no camera needed).
  useEffect(() => {
    if (!wallet || !inbox || handledInbox.current === inbox.id) return;
    handledInbox.current = inbox.id;
    const current = screenRef.current;
    if (current.name === 'offerConsent') void wallet.offers.discard(current.offer);
    const op = ++operation.current;
    setAnnouncement(copy.inboxAnnouncement);
    if (inbox.kind === 'offer') {
      setPin('');
      setPinTouched(false);
      dispatch({ type: 'checkOffer' });
      void wallet.offers.resolve(inbox.text).then((result) => {
        if (!mounted.current || op !== operation.current) return;
        dispatch(result.ok ? { type: 'offerResolved', offer: result.offer } : { type: 'offerRefused', code: result.code });
        // The PIN is what the visitor has to do next: bring it into view inside the phone and focus it.
        if (result.ok) focusPin();
        else focusTitle();
      });
    } else {
      dispatch({ type: 'checkRequest' });
      void Promise.all([wallet.presentations.resolve(inbox.text), refreshHeld(wallet)]).then(([result]) => {
        if (!mounted.current || op !== operation.current) return;
        dispatch(result.ok ? { type: 'requestResolved', request: result.request } : { type: 'requestRefused', code: result.code });
        focusTitle();
      });
    }
  }, [copy.inboxAnnouncement, inbox, refreshHeld, wallet]);

  const goHome = () => {
    if (screen.name === 'offerConsent' && wallet) void wallet.offers.discard(screen.offer);
    operation.current += 1;
    dispatch({ type: 'home' });
    focusTitle();
  };

  const accept = async () => {
    if (!wallet || screen.name !== 'offerConsent' || screen.busy) return;
    const needsPin = !screen.offer.codeRedeemed && screen.offer.txCode !== null;
    if (needsPin && pin.length < (screen.offer.txCode?.length ?? 6)) {
      setPinTouched(true);
      document.getElementById('demo-wallet-pin')?.focus();
      return;
    }
    const op = operation.current;
    dispatch({ type: 'accept' });
    const result = await wallet.offers.accept(screen.offer, needsPin ? { txCode: pin } : {});
    if (!mounted.current || op !== operation.current) return;
    dispatch({ type: 'accepted', result });
    if (result.ok) {
      await refreshHeld(wallet);
      onEventRef.current({ type: 'credentialReceived', credentialId: result.credentialId });
      focusTitle();
    } else if (result.code === 'TX_CODE_WRONG') {
      setPin('');
      document.getElementById('demo-wallet-pin')?.focus();
    }
  };

  const share = async () => {
    if (!wallet || screen.name !== 'requestConsent' || screen.busy) return;
    const chosen = chooseMatch(screen.request.matches, held.map((item) => item.summary));
    if (!chosen) return;
    const options = sharingOptions(chosen.match);
    const option = options[screen.optionIndex] ?? options[0];
    if (!option) return;
    const verifierName = screen.request.verifier.trusted ? safeText(screen.request.verifier.ten) : null;
    const op = operation.current;
    dispatch({ type: 'submit' });
    const result = await wallet.presentations.submit(screen.request, { credentialId: chosen.match.credentialId, claimSetIndex: option.index });
    if (!mounted.current || op !== operation.current) return;
    if (result.ok) {
      dispatch({ type: 'submitted', verifierName, fields: option.fields });
      onEventRef.current({ type: 'presentationSent' });
      focusTitle();
      // The wallet learns the credential's current status afterwards, as the app refreshes it.
      void wallet.credentials.refreshStatus(chosen.match.credentialId).then(() => refreshHeld(wallet));
    } else {
      dispatch({ type: 'submitFailed', code: result.code });
    }
  };

  const decline = () => {
    if (!wallet || screen.name !== 'requestConsent' || screen.busy) return;
    wallet.presentations.decline(screen.request);
    dispatch({ type: 'declined' });
    onEventRef.current({ type: 'presentationDeclined' });
    focusTitle();
  };

  const checkAgain = async (id: string) => {
    if (!wallet) return;
    setChecking({ id, failed: false });
    const result = await wallet.credentials.refreshStatus(id);
    await refreshHeld(wallet);
    if (mounted.current) setChecking(result.ok && result.status !== 'unknown' ? null : { id, failed: true });
  };

  // ---- Screens ----------------------------------------------------------------------------------

  const fieldList = (fields: readonly string[]) => fields.map((name) => (isDiplomaField(name) ? copy.claims[name] : name)).join(copy.listJoiner);
  const documentName = (vct: string) => (vct === DIPLOMA_VCT ? copy.documentTypes.diploma : copy.documentTypes.unknown);

  let body: ReactNode;
  let actions: ReactNode = null;

  if (!wallet) {
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
                    onClick={() => {
                      dispatch({ type: 'openDetail', credentialId: summary.id });
                      focusTitle();
                    }}
                    aria-label={fill(copy.openDocument, { document: documentName(summary.vct) })}
                    data-testid="wallet-credential-open"
                    className={`flex w-full cursor-pointer items-center gap-3 rounded-2xl py-3 text-left ${focusRing}`}
                  >
                    <DocumentIcon />
                    <span className="min-w-0 flex-1 space-y-0.5">
                      <span className="type-card-title-sm block text-[#0F1E36]">{documentName(summary.vct)}</span>
                      <span className={`type-body-sm block text-slate-600 ${apiText}`}>{safeText(details?.issuerName) ?? copy.issuerUnknown}</span>
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
    const busy = checking?.id === screen.credentialId && !checking.failed;
    body = (
      <div className="space-y-4" data-testid="wallet-detail">
        <ScreenHeader title={copy.detailTitle} onBack={goHome} backLabel={copy.backToList} />
        {item && (
          <>
            <div className={`${card} flex items-center gap-3`}>
              <DocumentIcon />
              <div className="min-w-0">
                <p className="type-card-title-sm text-[#0F1E36]">{documentName(item.summary.vct)}</p>
                <p className={`type-body-sm text-slate-600 ${apiText}`}>{safeText(item.details?.issuerName) ?? copy.issuerUnknown}</p>
              </div>
            </div>
            <section className={card} aria-labelledby="demo-wallet-validity">
              <h4 id="demo-wallet-validity" className="type-body-sm text-slate-600">{copy.statusSection}</h4>
              <div className="mt-1"><StatusLine status={item.summary.status} copy={copy} /></div>
              {item.summary.statusCheckedAt && (
                <p className="type-body-sm mt-1 text-slate-600">{fill(copy.checkedAt, { time: time.format(new Date(item.summary.statusCheckedAt)) })}</p>
              )}
              {checking?.id === screen.credentialId && checking.failed && <p className="type-body-sm mt-2 text-amber-800">{copy.checkFailed}</p>}
              <button type="button" onClick={() => void checkAgain(screen.credentialId)} disabled={busy} className={`${quietButton} mt-2`} data-testid="wallet-check-again">
                {busy ? <Loader2 aria-hidden="true" className="h-4 w-4 motion-safe:animate-spin" /> : <RefreshCw aria-hidden="true" className="h-4 w-4" />}
                {busy ? copy.checking : copy.checkAgain}
              </button>
            </section>
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
        <ScreenHeader title={copy.receiveTitle} onBack={goHome} backLabel={copy.backHome} />
        <Working text={copy.checkingOffer} testId="wallet-offer-checking" />
      </div>
    );
  } else if (screen.name === 'offerConsent') {
    const { offer } = screen;
    const issuer = displayName(offer.issuerDisplay, locale);
    const documentTitle = displayName(offer.configuration.display, locale) ?? documentName(offer.configuration.vct);
    const pinLength = offer.txCode?.length ?? 6;
    const needsPin = !offer.codeRedeemed && offer.txCode !== null;
    const showIncomplete = pinTouched && needsPin && pin.length < pinLength;
    body = (
      <div className="space-y-4" data-testid="wallet-offer-consent">
        <ScreenHeader title={copy.receiveTitle} onBack={screen.busy ? undefined : goHome} backLabel={copy.cancel} />
        <div className="space-y-1">
          <p className={`type-featured-title text-[#0F1E36] ${apiText}`}>
            {fill(copy.offerTitle, { issuer: issuer ?? new URL(offer.issuerOrigin).host, document: documentTitle })}
          </p>
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
          <div className="flex items-start gap-3 py-3">
            <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EEF1FF] text-[#0F1E36]"><Building2 className="h-6 w-6" /></span>
            <div className="min-w-0 space-y-0.5">
              <p className="type-body-sm text-slate-600">{copy.issuerLabel}</p>
              <p className={`type-card-title-sm text-[#0F1E36] ${apiText}`} data-testid="wallet-offer-issuer">{issuer ? fill(copy.issuerClaimed, { name: issuer }) : new URL(offer.issuerOrigin).host}</p>
              <p className="type-body-sm text-slate-600">{new URL(offer.issuerOrigin).host}</p>
              <p className="type-body-sm text-slate-600">{copy.issuerChecked}</p>
            </div>
          </div>
        </div>
        {needsPin && (
          <div className="space-y-2">
            <label htmlFor="demo-wallet-pin" className="type-body block font-semibold text-[#0F1E36]">{fill(copy.pinLabel, { length: pinLength })}</label>
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
        <button type="button" onClick={goHome} disabled={screen.busy} className={quietButton} data-testid="wallet-cancel">{copy.cancel}</button>
      </>
    );
  } else if (screen.name === 'offerSaved') {
    body = (
      <div className="space-y-4 pt-4" data-testid="wallet-offer-saved">
        <span aria-hidden="true" className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><Check className="h-8 w-8" strokeWidth={3} /></span>
        <h3 id="demo-wallet-screen-title" tabIndex={-1} className="type-featured-title text-center text-[#0F1E36] focus:outline-none">{copy.savedTitle}</h3>
        <p className="type-body text-center text-slate-700">{screen.checked ? copy.savedLead : copy.savedLeadUnchecked}</p>
      </div>
    );
    actions = (
      <>
        <button type="button" onClick={() => { dispatch({ type: 'openDetail', credentialId: screen.credentialId }); focusTitle(); }} className={primaryButton} data-testid="wallet-view-document">{copy.viewDocument}</button>
        <button type="button" onClick={goHome} className={quietButton} data-testid="wallet-back-home">{copy.backHome}</button>
      </>
    );
  } else if (screen.name === 'offerFailed' || screen.name === 'requestFailed') {
    const isOffer = screen.name === 'offerFailed';
    body = (
      <div className="space-y-4 pt-4" data-testid={isOffer ? 'wallet-offer-failed' : 'wallet-request-failed'} data-problem={screen.problem}>
        <span aria-hidden="true" className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-700"><AlertTriangle className="h-8 w-8" /></span>
        <h3 id="demo-wallet-screen-title" tabIndex={-1} className="type-featured-title text-center text-[#0F1E36] focus:outline-none">{isOffer ? copy.offerFailedTitle : copy.requestFailedTitle}</h3>
        <p className="type-body text-center text-slate-700">{copy.problems[screen.problem]}</p>
        {isOffer && <p className="type-body-sm text-center text-slate-600">{copy.nothingSaved}</p>}
      </div>
    );
    actions = <button type="button" onClick={goHome} className={primaryButton} data-testid="wallet-back-home">{copy.backHome}</button>;
  } else if (screen.name === 'requestChecking') {
    body = (
      <div className="space-y-4">
        <ScreenHeader title={copy.presentTitle} onBack={goHome} backLabel={copy.backHome} />
        <Working text={copy.checkingRequest} testId="wallet-request-checking" />
      </div>
    );
  } else if (screen.name === 'requestConsent') {
    body = (
      <RequestConsent
        screen={screen}
        held={held}
        copy={copy}
        locale={locale}
        fieldList={fieldList}
        documentName={documentName}
        time={time}
        onChoose={(optionIndex) => dispatch({ type: 'chooseOption', optionIndex })}
        onBlocked={(status) => {
          if (blockedReported.current === screen.request) return;
          blockedReported.current = screen.request;
          onEventRef.current({ type: 'presentationBlocked', status });
        }}
      />
    );
    const chosen = chooseMatch(screen.request.matches, held.map((item) => item.summary));
    const status = chosen?.summary?.status;
    const canShare = screen.request.verifier.trusted && chosen !== null && status !== 'revoked' && status !== 'suspended' && status !== 'invalid';
    actions = (
      <>
        {canShare && (
          <button type="button" onClick={() => void share()} disabled={screen.busy} className={primaryButton} data-testid="wallet-share">
            {screen.busy && <Loader2 aria-hidden="true" className="h-4 w-4 motion-safe:animate-spin" />}
            {screen.busy ? copy.sending : copy.share}
          </button>
        )}
        <button type="button" onClick={decline} disabled={screen.busy} className={canShare ? quietButton : primaryButton} data-testid="wallet-decline">{copy.decline}</button>
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
    actions = <button type="button" onClick={goHome} className={primaryButton} data-testid="wallet-back-home">{copy.backHome}</button>;
  } else {
    body = (
      <div className="space-y-4 pt-4" data-testid="wallet-request-declined">
        <h3 id="demo-wallet-screen-title" tabIndex={-1} className="type-featured-title text-center text-[#0F1E36] focus:outline-none">{copy.declinedTitle}</h3>
        <p className="type-body text-center text-slate-700">{copy.declinedBody}</p>
      </div>
    );
    actions = <button type="button" onClick={goHome} className={primaryButton} data-testid="wallet-back-home">{copy.backHome}</button>;
  }

  return (
    <div className="space-y-4" data-testid="wallet-panel" data-screen={wallet ? screen.name : 'loading'} data-busy={isBusyScreen(screen) || undefined}>
      <div
        role="group"
        aria-label={copy.phoneLabel}
        className="mx-auto flex h-[640px] w-full max-w-[400px] lg:mr-0 flex-col overflow-hidden rounded-[44px] bg-[#0F1E36] p-2.5 sm:h-[700px] lg:h-[min(780px,calc(100vh-7.5rem))] lg:min-h-[600px]"
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
  held,
  copy,
  locale,
  fieldList,
  documentName,
  time,
  onChoose,
  onBlocked,
}: {
  screen: Extract<WalletScreen, { name: 'requestConsent' }>;
  held: HeldCredential[];
  copy: DemoWalletPanelCopy;
  locale: WalletLocale;
  fieldList: (fields: readonly string[]) => string;
  documentName: (vct: string) => string;
  time: Intl.DateTimeFormat;
  onChoose: (optionIndex: number) => void;
  onBlocked: (status: 'revoked' | 'suspended' | 'invalid') => void;
}) {
  const now = useNow();
  const { request } = screen;
  const trusted = request.verifier.trusted;
  const name = request.verifier.trusted ? safeText(request.verifier.ten) : null;
  const purpose = trusted ? purposeText(request.purpose, locale) : null;
  const chosen = chooseMatch(request.matches, held.map((item) => item.summary));
  const options = chosen ? sharingOptions(chosen.match) : [];
  const option = options[screen.optionIndex] ?? options[0];
  const required = requiredFields(options);
  const status = chosen?.summary?.status;
  const blocked = status === 'revoked' || status === 'suspended' || status === 'invalid' ? status : null;
  const chosenDetails = chosen ? held.find((item) => item.summary.id === chosen.match.credentialId) : undefined;

  useEffect(() => {
    if (blocked && trusted) onBlocked(blocked);
  }, [blocked, onBlocked, trusted]);

  return (
    <div className="space-y-4" data-testid="wallet-request-consent">
      <ScreenHeader title={copy.presentTitle} />
      <div className="flex flex-wrap items-center justify-between gap-2">
        {trusted ? (
          <span className="type-body-sm inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-slate-800" data-testid="wallet-verifier-trusted">
            <ShieldCheck aria-hidden="true" className="h-4 w-4 text-emerald-600" />
            {copy.verifiedMark}
          </span>
        ) : <span />}
        <span className="type-body-sm rounded-full bg-white px-3 py-1 tabular-nums text-slate-700">
          {fill(copy.expiresIn, { time: formatCountdown(secondsUntil(request.expiresAt, now)) })}
        </span>
      </div>
      {trusted ? (
        <div className="space-y-1">
          <p className={`type-featured-title text-[#0F1E36] ${apiText}`} data-testid="wallet-verifier-name">
            {name ? fill(copy.wantsToSee, { name }) : copy.wantsToSeeUnnamed}
          </p>
          {purpose && <p className={`type-body text-slate-600 ${apiText}`}>{fill(copy.purpose, { purpose })}</p>}
        </div>
      ) : (
        <div className="space-y-2 rounded-3xl border-2 border-rose-500 bg-white p-4" data-testid="wallet-verifier-untrusted">
          <p className="type-card-title-sm text-rose-800">{copy.untrustedTitle}</p>
          <p className="type-body text-slate-700">{copy.untrustedBody}</p>
        </div>
      )}

      {trusted && !chosen && (
        <div className={card} data-testid="wallet-no-match">
          <p className="type-card-title-sm text-[#0F1E36]">{copy.noMatchTitle}</p>
          <p className="type-body mt-1 text-slate-700">{copy.noMatchBody}</p>
        </div>
      )}

      {trusted && chosen && blocked && (
        <p role="alert" className="type-body rounded-3xl border-2 border-rose-500 bg-white px-4 py-3 text-slate-800" data-testid="wallet-blocked" data-status={blocked}>
          {copy.blocked[blocked]}
        </p>
      )}

      {trusted && chosen && option && (
        <>
          {!blocked && <p className="type-body rounded-2xl bg-[#EEF1FF] px-4 py-3 font-semibold text-[#0F1E36]">{fieldList(option.fields)}</p>}
          <section aria-labelledby="demo-wallet-document" className="space-y-2">
            <h4 id="demo-wallet-document" className="type-card-title-sm text-[#0F1E36]">{copy.documentInUse}</h4>
            <div className={`${card} flex items-center gap-3`}>
              <DocumentIcon />
              <div className="min-w-0 space-y-0.5">
                <p className="type-card-title-sm text-[#0F1E36]">{documentName(chosen.match.vct)}</p>
                <p className={`type-body-sm text-slate-600 ${apiText}`}>{safeText(chosen.match.issuerName) ?? copy.issuerUnknown}</p>
                {chosen.summary && <p className="type-body-sm text-slate-600">{fill(copy.receivedOn, { time: time.format(new Date(chosen.summary.createdAt)) })}</p>}
                <StatusLine status={status ?? null} copy={copy} />
              </div>
            </div>
          </section>
          {!blocked && (
            <>
              <section aria-labelledby="demo-wallet-leaving" className="space-y-2">
                <h4 id="demo-wallet-leaving" className="type-card-title-sm text-[#0F1E36]">{copy.fieldsTitle}</h4>
                <dl className={`${card} divide-y divide-slate-100 py-1`} data-testid="wallet-fields">
                  {option.fields.map((field) => {
                    const value = claimText(chosenDetails?.details?.claims[field]);
                    return (
                      <div key={field} className="py-2.5" data-testid="wallet-field" data-field={field}>
                        <dt className="type-body-sm flex items-center gap-2 text-slate-600">
                          {isDiplomaField(field) ? copy.claims[field] : <bdi>{safeText(field, 64)}</bdi>}
                          {required.includes(field) && <span className="type-caption rounded-full border border-slate-200 px-2 text-slate-600">{copy.required}</span>}
                        </dt>
                        {value && <dd className={`type-body font-semibold text-slate-900 ${apiText}`}><bdi>{value}</bdi></dd>}
                      </div>
                    );
                  })}
                </dl>
                <p className="type-body-sm text-slate-600">{copy.requiredHint}</p>
              </section>
              {options.length > 1 && (
                <fieldset className="space-y-2">
                  <legend className="type-card-title-sm text-[#0F1E36]">{copy.optionsTitle}</legend>
                  {options.map((candidate, index) => (
                    <label
                      key={candidate.index}
                      className={`flex cursor-pointer items-start gap-3 rounded-2xl bg-white px-4 py-3 ${index === screen.optionIndex ? 'ring-2 ring-[#354CE1]' : ''}`}
                    >
                      <input
                        type="radio"
                        name="demo-wallet-option"
                        checked={index === screen.optionIndex}
                        onChange={() => onChoose(index)}
                        disabled={screen.busy}
                        data-testid={`wallet-option-${index}`}
                        className="mt-1 h-4 w-4 accent-[#354CE1]"
                      />
                      <span className="min-w-0">
                        <span className="type-body block font-semibold text-[#0F1E36]">
                          {candidate.withheld.length === 0 ? copy.optionFull : fill(copy.optionLess, { fields: fieldList(candidate.withheld) })}
                        </span>
                        {candidate.withheld.length > 0 && (
                          <span className="type-body-sm block text-slate-600">{fill(copy.withheld, { fields: fieldList(candidate.withheld) })}</span>
                        )}
                      </span>
                    </label>
                  ))}
                </fieldset>
              )}
            </>
          )}
        </>
      )}
      {screen.problem && <Problem text={copy.problems[screen.problem]} testId="wallet-request-problem" problem={screen.problem} />}
    </div>
  );
}
