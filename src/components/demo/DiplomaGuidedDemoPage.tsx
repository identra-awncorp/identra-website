/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useReducer, useRef, useState, type ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, ArrowRight, Briefcase, CheckCircle2, Clock, Download, GraduationCap, Info, Loader2, RefreshCw, RotateCcw, Wallet } from 'lucide-react';
import { createVerifierClient, serverClockOffset, type SessionResult } from '@identra/sdk-client';
import rootCa from 'virtual:identra-root-ca';
import { useLanguage } from '../../context/LanguageContext';
import { useNow } from '../../hooks/useNow';
import {
  focusById,
  isDialogOpen,
  portalClientFor,
  useSecondsUntilLocal,
  useStatusChange,
  useStudentOffer,
} from '../../hooks/useSchoolPortal';
import { CERTNET_CONFIG, IDENTRA_API_ORIGIN, IDENTRA_API_URL, SAMPLE_VERIFIER, SAMPLE_VERIFIER_SCENARIO } from '../../identra/config';
import { DIPLOMA_FIELDS, isDiplomaField, type WalletInboxItem } from '../../identra/demoWalletModel';
import {
  canView,
  currentPosition,
  GUIDED_RUNS,
  GUIDED_START,
  GUIDED_STEPS,
  guidedCopyFor,
  guidedReducer,
  guidedRunFor,
  guidedRunSearch,
  happenedReceiveLines,
  instructionsFor,
  stepStatus,
  type GuidedRun,
  type GuidedState,
  type GuidedStepId,
} from '../../identra/guidedDiplomaDemo';
import { PortalApiError, type IssuedCredential, type PortalSession } from '../../identra/schoolPortalClient';
import { schoolCopyFor, signInProblemFor, type SignInProblem } from '../../identra/schoolPortalState';
import {
  firstFailure,
  formatCountdown,
  INITIAL_VERIFIER_STEP_STATE,
  runVerifierSession,
  secondsUntil,
  toCheckRows,
  verifierStepReducer,
  type FailureReasonKey,
  type VerifierProblem,
} from '../../identra/verifierSession';
import { APPLY_JOB_VERIFIER_DIALOG_TRANSLATIONS, type ApplyJobVerifierDialogCopy } from '../../translations/demo/ApplyJobVerifierDialogTranslations';
import { DEMO_WALLET_PANEL_TRANSLATIONS } from '../../translations/demo/DemoWalletPanelTranslations';
import { DIPLOMA_GUIDED_DEMO_PAGE_TRANSLATIONS, type DiplomaGuidedDemoPageCopy } from '../../translations/demo/DiplomaGuidedDemoPageTranslations';
import {
  SCHOOL_PORTAL_PAGE_TRANSLATIONS,
  SCHOOL_PORTAL_SAMPLE_PASSWORD,
  type SchoolPortalPageCopy,
} from '../../translations/SchoolPortalPageTranslations';
import { demoScenarioPath, resolveDemoScenarioLocale, viewToPath } from '../../types/routes';
import IdentraErrorBoundary from '../IdentraErrorBoundary';
import IdentraHowItWorks from '../IdentraHowItWorks';
import IdentraQrCode from '../IdentraQrCode';
import CertNetTestBuildMarker, { CERTNET_TEST_BUILD } from '../CertNetTestBuildMarker';
import ConfirmDialog from '../SchoolPortalConfirmDialog';
import UniversityCrest from '../UniversityCrest';
import { ApplyJobVerifierResult } from './ApplyJobVerifierDialog';
import DemoWalletPanel, { type WalletPanelEvent } from './DemoWalletPanel';

// The guided diploma demo: the organisation's side of the current step on the left, the web trial wallet
// on the right. On a phone the three actors (school, employer, wallet) are tabs that switch by themselves
// when it is that actor's turn. Everything runs against the real API with the existing portal and verifier
// clients; progress follows what really happened. Each step says what to press, then what really happened.

type StudentSession = Extract<PortalSession, { role: 'student' }>;
type Locale2 = 'vi' | 'en';
type Actor = 'school' | 'employer' | 'wallet';

const verifierClient = createVerifierClient({ baseUrl: IDENTRA_API_URL, apiOrigin: IDENTRA_API_ORIGIN });
/** Beyond this the device clock is called wrong (the wallet allows 60 s of skew on a request's issue time). */
const CLOCK_SKEW_NOTICE_MS = 60_000;

// Memory only: survives a language switch or a visit to another page of the site, not a reload. Tokens never
// go to storage; the session flag below is a bare "a run was in progress", so a reload can be explained.
let remembered: { run: GuidedRun; guided: GuidedState; session: { session: StudentSession; clockOffsetMs: number } | null; generation: number } | null = null;
const PROGRESS_FLAG = 'identra-guided-diploma-run';

const readProgressFlag = () => {
  try {
    return window.sessionStorage.getItem(PROGRESS_FLAG) === '1';
  } catch {
    return false;
  }
};
const writeProgressFlag = (inProgress: boolean) => {
  try {
    if (inProgress) window.sessionStorage.setItem(PROGRESS_FLAG, '1');
    else window.sessionStorage.removeItem(PROGRESS_FLAG);
  } catch {
    // Storage refused (private mode): a reload then simply starts again without the explanation.
  }
};

const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ''));

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1] focus-visible:ring-offset-2';
const primaryButton = `type-control inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#354CE1] px-5 text-white transition-colors hover:bg-[#2539BE] disabled:cursor-not-allowed disabled:bg-[#354CE1]/60 ${focusRing}`;
const secondaryButton = `type-control inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 ${focusRing}`;
const panel = 'rounded-3xl border border-slate-200 bg-white p-5 sm:p-6';
const apiText = 'break-words [overflow-wrap:anywhere]';

const isNarrow = () => typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches;
const scrollBehavior = (): ScrollBehavior => (window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth');
/** Stable test ids of the employer check, per step (`guided-apply-…`, `guided-again-…`). */
const testId = (variant: 'apply' | 'again', part: string) => ['guided', variant, part].join('-');

function Countdown({ expiresAt, offsetMs, template }: { expiresAt: string; offsetMs: number; template: string }) {
  const now = useNow();
  return <span className="tabular-nums">{fill(template, { time: formatCountdown(secondsUntil(expiresAt, now + offsetMs)) })}</span>;
}

function Notice({ tone, children, testId: id }: { tone: 'info' | 'warning' | 'success' | 'error'; children: ReactNode; testId?: string }) {
  const styles = {
    info: 'bg-slate-100 text-slate-800',
    warning: 'bg-amber-50 text-amber-950',
    success: 'bg-emerald-50 text-emerald-950',
    error: 'bg-rose-50 text-rose-950',
  }[tone];
  const Icon = tone === 'success' ? CheckCircle2 : tone === 'info' ? Clock : AlertTriangle;
  return (
    <div className={`type-body flex items-start gap-3 rounded-2xl px-4 py-3 ${styles}`} data-testid={id}>
      <Icon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
      <div className="min-w-0 flex-1 space-y-2">{children}</div>
    </div>
  );
}

function OrganisationHeader({ kind, name, detail, crestLabel }: { kind: 'school' | 'employer'; name: string; detail: string; crestLabel: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
      {kind === 'school'
        ? <UniversityCrest label={crestLabel} />
        : <span aria-hidden="true" className="flex h-11 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0F1E36] text-white"><Briefcase className="h-5 w-5" /></span>}
      <div className="min-w-0">
        <p className="type-card-title text-[#0F1E36]">{name}</p>
        <p className="type-body text-slate-600">{detail}</p>
      </div>
    </div>
  );
}

/** "What just happened": where the data is now and who did what, after a step. */
function WhatHappened({ title, lines, testId: id }: { title: string; lines: readonly ReactNode[]; testId: string }) {
  return (
    <section aria-label={title} className="rounded-3xl bg-[#0F1E36] p-5 text-white sm:p-6" data-testid={id}>
      <h3 className="type-card-title-sm flex items-center gap-2 text-white">
        <Info aria-hidden="true" className="h-4 w-4 shrink-0 text-emerald-300" />
        {title}
      </h3>
      <ul className="type-body mt-3 space-y-2 text-white/90">
        {lines.map((line, index) => (
          <li key={index} className="flex gap-2">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />
            <span className="min-w-0">{line}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** The real QR next to the button that stands in for scanning it. */
function QrHandoff({ value, qrLabel, caption, testId: id, children }: { value: string; qrLabel: string; caption: string; testId: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-[auto_minmax(0,1fr)]">
      <div className="mx-auto w-40 sm:mx-0" data-testid={id}>
        <IdentraQrCode value={value} label={qrLabel} className="h-auto w-full rounded-2xl border border-slate-200 bg-white" fallback={null} />
      </div>
      <div className="min-w-0 space-y-3">
        <p className="type-body-sm text-slate-700">{caption}</p>
        {children}
      </div>
    </div>
  );
}

// ---- Step 1: the school issues the diploma ---------------------------------------------------------

function ReceiveSignedIn({
  session,
  copy,
  portalCopy,
  walletBusy,
  onSessionExpired,
  onHandoff,
}: {
  session: StudentSession;
  copy: DiplomaGuidedDemoPageCopy;
  portalCopy: SchoolPortalPageCopy;
  walletBusy: boolean;
  onSessionExpired: () => void;
  onHandoff: (offerUri: string) => void;
}) {
  const { offer, createOffer } = useStudentOffer(session, onSessionExpired);
  const [handedOver, setHandedOver] = useState<string | null>(null);
  const retrySeconds = useSecondsUntilLocal(offer.phase === 'error' ? offer.retryAt : null);
  const activeOfferId = offer.phase === 'active' ? offer.offer.offerId : null;

  return (
    <div className="space-y-5">
      <p className={`type-body text-slate-800 ${apiText}`} data-testid="guided-signed-in">
        {fill(copy.signedInAs, { name: session.profile.hoTen, major: session.profile.nganh })}
      </p>
      <p role="status" aria-live="polite" className="sr-only">
        {offer.phase === 'creating' ? portalCopy.creatingOffer : offer.phase === 'active' ? copy.codeTitle : ''}
      </p>

      {offer.phase === 'idle' && (
        <button type="button" onClick={() => void createOffer()} className={primaryButton} data-testid="guided-receive">
          {copy.receive}
        </button>
      )}

      {offer.phase === 'creating' && (
        <p className="type-body flex min-h-11 items-center gap-2 text-slate-700" data-testid="guided-offer-creating">
          <Loader2 aria-hidden="true" className="h-4 w-4 text-[#354CE1] motion-safe:animate-spin" />
          {portalCopy.creatingOffer}
        </p>
      )}

      {offer.phase === 'active' && (
        <div className="space-y-4 rounded-2xl bg-slate-50 p-4 sm:p-5" data-testid="guided-offer">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="type-body text-slate-600">{portalCopy.pinLabel}</p>
              <p className="type-metric tabular-nums text-[#0F1E36]" aria-label={offer.offer.txCode.split('').join(' ')} data-testid="guided-offer-pin">
                {`${offer.offer.txCode.slice(0, 3)} ${offer.offer.txCode.slice(3)}`}
              </p>
            </div>
            <p className="type-body flex items-center gap-2 text-slate-700" data-testid="guided-offer-countdown">
              <Clock aria-hidden="true" className="h-4 w-4 text-slate-500" />
              <Countdown expiresAt={offer.offer.expiresAt} offsetMs={offer.clockOffsetMs} template={portalCopy.expiresIn} />
            </p>
          </div>
          <p className="type-body-sm text-slate-600">{copy.pinHint}</p>
          <QrHandoff value={offer.offer.offerUri} qrLabel={copy.qrOfferLabel} caption={copy.qrOfferCaption} testId="guided-qr-offer">
            <button
              type="button"
              onClick={() => {
                onHandoff(offer.offer.offerUri);
                setHandedOver(offer.offer.offerId);
              }}
              disabled={walletBusy}
              className={handedOver === activeOfferId ? secondaryButton : primaryButton}
              data-testid="guided-send-offer"
            >
              <Wallet aria-hidden="true" className="h-4 w-4" />
              {handedOver === activeOfferId ? copy.sendAgain : copy.sendToWallet}
            </button>
            {walletBusy && <p className="type-body-sm text-slate-600" data-testid="guided-wallet-busy">{copy.walletBusy}</p>}
          </QrHandoff>
          {handedOver === activeOfferId && (
            <p className="type-body font-medium text-[#0F1E36]" data-testid="guided-offer-sent">{fill(copy.sentToWallet, { pin: offer.offer.txCode })}</p>
          )}
          {offer.reconnecting && <p className="type-body-sm text-amber-800">{portalCopy.reconnecting}</p>}
        </div>
      )}

      {offer.phase === 'issued' && (
        // The school only knows it sent the diploma; whether the wallet saved it is the wallet's to say.
        <Notice tone="info" testId="guided-offer-issued"><p>{portalCopy.issuedTitle}</p></Notice>
      )}

      {(offer.phase === 'expired' || offer.phase === 'error') && (
        <div className="space-y-3" data-testid={offer.phase === 'error' ? 'guided-offer-problem' : 'guided-offer-expired'} data-problem={offer.phase === 'error' ? offer.problem : undefined}>
          <Notice tone={offer.phase === 'expired' ? 'info' : 'warning'}>
            <p className="font-semibold">{offer.phase === 'expired' ? portalCopy.expiredTitle : offer.problem === 'too_many_offers' ? portalCopy.offerLimitTitle : portalCopy.offerProblems[offer.problem]}</p>
            {offer.phase === 'expired' && <p>{portalCopy.expiredBody}</p>}
            {offer.phase === 'error' && offer.problem === 'too_many_offers' && <p>{portalCopy.offerProblems.too_many_offers}</p>}
            {retrySeconds > 0 && <p className="tabular-nums">{fill(portalCopy.retryIn, { time: formatCountdown(retrySeconds) })}</p>}
          </Notice>
          <button type="button" onClick={() => void createOffer()} disabled={retrySeconds > 0} className={primaryButton} data-testid="guided-offer-retry">
            <RefreshCw aria-hidden="true" className="h-4 w-4" />
            {offer.phase === 'expired' ? portalCopy.newOffer : portalCopy.retry}
          </button>
        </div>
      )}
    </div>
  );
}

// ---- Steps 2 and 3: the employer checks the diploma ------------------------------------------------

function EmployerCheck({
  variant,
  copy,
  dialogCopy,
  language,
  startLabel,
  walletBusy,
  declinedQr,
  deliveredQr,
  onHandoff,
  onClockOffset,
  onWaitingQr,
  onResult,
  renderResult,
}: {
  variant: 'apply' | 'again';
  copy: DiplomaGuidedDemoPageCopy;
  dialogCopy: ApplyJobVerifierDialogCopy;
  language: string;
  startLabel: string;
  walletBusy: boolean;
  /** The request the visitor declined in the wallet: the employer side says so at once. */
  declinedQr: string | null;
  /** The request a share of which the employer received but could not check yet: the wallet only sends it again. */
  deliveredQr: string | null;
  onHandoff: (qr: string) => void;
  onClockOffset: (offsetMs: number) => void;
  /** The request on screen while it waits for the wallet (null otherwise), so the page's instructions can follow it. */
  onWaitingQr: (qr: string | null) => void;
  onResult: (ok: boolean, reason: FailureReasonKey | null) => void;
  /** What the result means for this step, under the employer's result. */
  renderResult?: (result: SessionResult) => ReactNode;
}) {
  const [state, dispatch] = useReducer(verifierStepReducer, INITIAL_VERIFIER_STEP_STATE);
  const controllerRef = useRef<AbortController | null>(null);
  const [handedOver, setHandedOver] = useState<string | null>(null);
  const [declined, setDeclined] = useState(false);
  const onResultRef = useRef(onResult);
  const onClockOffsetRef = useRef(onClockOffset);
  const onWaitingQrRef = useRef(onWaitingQr);
  useEffect(() => {
    onResultRef.current = onResult;
    onClockOffsetRef.current = onClockOffset;
    onWaitingQrRef.current = onWaitingQr;
  });
  const now = useNow();
  const retryWait = state.phase === 'error' && state.retryAt !== null ? Math.max(0, Math.floor((state.retryAt - now) / 1000)) : 0;

  const start = useCallback(() => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setHandedOver(null);
    setDeclined(false);
    void runVerifierSession(verifierClient, { verifier: SAMPLE_VERIFIER, scenario: SAMPLE_VERIFIER_SCENARIO }, { signal: controller.signal, dispatch });
  }, []);
  useEffect(() => () => controllerRef.current?.abort(), []);

  const waitingOffset = state.phase === 'waiting' ? state.clockOffsetMs : null;
  useEffect(() => {
    if (waitingOffset !== null) onClockOffsetRef.current(waitingOffset);
  }, [waitingOffset]);

  // Declined in the wallet: nothing will come, so stop waiting and say so.
  const waitingQr = state.phase === 'waiting' ? state.qr : null;
  const delivered = waitingQr !== null && deliveredQr === waitingQr;
  useEffect(() => {
    onWaitingQrRef.current(waitingQr);
    return () => onWaitingQrRef.current(null);
  }, [waitingQr]);
  useEffect(() => {
    if (waitingQr && declinedQr === waitingQr) {
      controllerRef.current?.abort();
      setDeclined(true);
    }
  }, [declinedQr, waitingQr]);

  const settledId = state.phase === 'verified' || state.phase === 'failed' ? state.sessionId : null;
  useEffect(() => {
    if (!settledId || (state.phase !== 'verified' && state.phase !== 'failed')) return;
    const failure = firstFailure(toCheckRows(state.result));
    onResultRef.current(state.result.ok, failure?.reasonKey ?? null);
    focusById(`guided-${variant}-outcome`);
    // Only once per finished session.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settledId]);

  const problemCopy: Record<VerifierProblem, { title: string; body: string }> = {
    network: { title: dialogCopy.networkTitle, body: dialogCopy.networkBody },
    rate_limited: { title: dialogCopy.rateLimitedTitle, body: dialogCopy.rateLimitedBody },
    unavailable: { title: dialogCopy.unavailableTitle, body: `${dialogCopy.unavailableBody} ${copy.verifierUnavailableHint}` },
    rejected: { title: dialogCopy.rejectedTitle, body: dialogCopy.rejectedBody },
    unreadable: { title: dialogCopy.unreadableTitle, body: dialogCopy.unreadableBody },
  };

  return (
    <div className="space-y-4" data-testid={`guided-${variant}`} data-phase={declined ? 'declined' : state.phase}>
      <p role="status" aria-live="polite" className="sr-only">
        {declined ? copy.requestDeclinedTitle : state.phase === 'creating' ? dialogCopy.creating : state.phase === 'waiting' ? (state.status === 'request_retrieved' ? copy.requestSentToWallet : copy.requestReady) : ''}
      </p>

      {state.phase === 'idle' && (
        <button type="button" onClick={start} className={primaryButton} data-testid={testId(variant, 'start')}>{startLabel}</button>
      )}

      {state.phase === 'creating' && (
        <p className="type-body flex min-h-11 items-center gap-2 text-slate-700">
          <Loader2 aria-hidden="true" className="h-4 w-4 text-[#354CE1] motion-safe:animate-spin" />
          {dialogCopy.creating}
        </p>
      )}

      {declined && (
        <div className="space-y-3" data-testid={testId(variant, 'declined')}>
          <Notice tone="info">
            <p className="font-semibold">{copy.requestDeclinedTitle}</p>
            <p>{copy.requestDeclinedBody}</p>
          </Notice>
          <button type="button" onClick={start} className={primaryButton} data-testid={testId(variant, 'retry')}>
            <RefreshCw aria-hidden="true" className="h-4 w-4" />
            {copy.newRequest}
          </button>
        </div>
      )}

      {state.phase === 'waiting' && !declined && (
        <div className="space-y-4 rounded-2xl bg-slate-50 p-4 sm:p-5" data-testid={testId(variant, 'waiting')} data-status={state.status} data-delivered={delivered || undefined}>
          <p className="type-body flex items-center gap-2 text-slate-700">
            <Clock aria-hidden="true" className="h-4 w-4 text-slate-500" />
            <Countdown expiresAt={state.expiresAt} offsetMs={state.clockOffsetMs} template={copy.requestExpiresIn} />
          </p>
          <QrHandoff value={state.qr} qrLabel={copy.qrRequestLabel} caption={copy.qrRequestCaption} testId={testId(variant, 'qr')}>
            <button
              type="button"
              onClick={() => {
                onHandoff(state.qr);
                setHandedOver(state.sessionId);
              }}
              disabled={walletBusy}
              className={handedOver === state.sessionId ? secondaryButton : primaryButton}
              data-testid={testId(variant, 'open-request')}
            >
              <Wallet aria-hidden="true" className="h-4 w-4" />
              {copy.openRequestInWallet}
            </button>
            {walletBusy && <p className="type-body-sm text-slate-600" data-testid="guided-wallet-busy">{copy.walletBusy}</p>}
          </QrHandoff>
          <p className={`type-body font-medium ${state.reconnecting ? 'text-amber-800' : 'text-[#0F1E36]'}`}>
            {state.reconnecting ? dialogCopy.reconnecting : delivered ? copy.requestDeliveredInWallet : state.status === 'request_retrieved' || handedOver === state.sessionId ? copy.requestSentToWallet : copy.requestReady}
          </p>
          {variant === 'apply' && (
            <details className="group rounded-2xl bg-white p-4 ring-1 ring-slate-200" open data-testid="guided-qr-explained">
              <summary className={`type-card-title-sm cursor-pointer list-none text-[#0F1E36] ${focusRing}`}>{copy.qrBeatsTitle}</summary>
              <ol className="type-body-sm mt-3 list-decimal space-y-2 pl-5 text-slate-800">
                {copy.qrBeats.map((beat) => <li key={beat}>{beat}</li>)}
              </ol>
              <p className="type-body-sm mt-3 text-slate-700">{copy.qrDirection}</p>
            </details>
          )}
        </div>
      )}

      {(state.phase === 'expired' || state.phase === 'error') && (
        <div className="space-y-3" data-testid={testId(variant, 'problem')} data-problem={state.phase === 'error' ? state.problem : 'expired'}>
          <Notice tone={state.phase === 'expired' ? 'info' : 'warning'}>
            <p className="font-semibold">{state.phase === 'expired' ? copy.requestExpiredTitle : problemCopy[state.problem].title}</p>
            <p>{state.phase === 'expired' ? copy.requestExpiredBody : problemCopy[state.problem].body}</p>
            {retryWait > 0 && <p className="tabular-nums">{fill(dialogCopy.rateLimitedWait, { seconds: retryWait })}</p>}
          </Notice>
          <button type="button" onClick={start} disabled={retryWait > 0} className={primaryButton} data-testid={testId(variant, 'retry')}>
            <RefreshCw aria-hidden="true" className="h-4 w-4" />
            {state.phase === 'expired' ? copy.newRequest : dialogCopy.retry}
          </button>
        </div>
      )}

      {(state.phase === 'verified' || state.phase === 'failed') && (
        <div className="space-y-4" data-testid={testId(variant, 'result')} data-ok={state.result.ok}>
          <div id={`guided-${variant}-outcome`} tabIndex={-1} className="focus:outline-none">
            <ApplyJobVerifierResult result={state.result} copy={dialogCopy} language={language} verifierName={state.verifierName} showFailureHint={false} />
          </div>
          {renderResult?.(state.result)}
        </div>
      )}
    </div>
  );
}

// ---- Step 3: the school revokes it ----------------------------------------------------------------

function RevokeOnSchoolSide({
  session,
  copy,
  portalCopy,
  locale,
  onSessionExpired,
  onRevoked,
}: {
  session: StudentSession;
  copy: DiplomaGuidedDemoPageCopy;
  portalCopy: SchoolPortalPageCopy;
  locale: Locale2;
  onSessionExpired: () => void;
  onRevoked: () => void;
}) {
  const [items, setItems] = useState<IssuedCredential[] | null>(null);
  const [loadProblem, setLoadProblem] = useState(false);
  const tag = locale === 'vi' ? 'vi-VN' : 'en-GB';
  const formatTime = (iso: string) => new Intl.DateTimeFormat(tag, { hour: '2-digit', minute: '2-digit' }).format(new Date(iso));
  const formatDate = (iso: string) => new Intl.DateTimeFormat(tag, { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(iso));

  const load = useCallback(async (signal?: AbortSignal) => {
    setLoadProblem(false);
    try {
      const page = await portalClientFor(session.issuer).listCredentials(session.token, { signal });
      if (!signal?.aborted) setItems(page.items);
    } catch (error) {
      if (signal?.aborted) return;
      if (error instanceof PortalApiError && error.kind === 'session_expired') onSessionExpired();
      else setLoadProblem(true);
    }
  }, [onSessionExpired, session.issuer, session.token]);

  useEffect(() => {
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
  }, [load]);

  const latest = items?.[0] ?? null;
  const revoke = useStatusChange<IssuedCredential>({
    idOf: (item) => item.id,
    perform: (item, signal) => portalClientFor(session.issuer).revokeCredential(session.token, item.id, signal),
    onApplied: (id, status) => setItems((current) => current?.map((item) => (item.id === id ? { ...item, status, canRevoke: false } : item)) ?? current),
    onSessionExpired,
    doneFocusId: 'guided-revoked-note',
  });

  const latestRevoked = latest?.status === 'revoked';
  useEffect(() => {
    if (latestRevoked) onRevoked();
  }, [latestRevoked, onRevoked]);

  return (
    <div className="space-y-4" data-testid="guided-revoke-side">
      {loadProblem && (
        <Notice tone="warning" testId="guided-revoke-load-problem">
          <p>{portalCopy.loadProblems.network}</p>
          <button type="button" onClick={() => void load()} className={secondaryButton} data-testid="guided-revoke-load-retry">{portalCopy.retry}</button>
        </Notice>
      )}
      {items === null && !loadProblem && (
        <p className="type-body flex items-center gap-2 text-slate-600"><Loader2 aria-hidden="true" className="h-4 w-4 motion-safe:animate-spin" />{portalCopy.loading}</p>
      )}
      {items !== null && latest === null && <p className="type-body text-slate-700">{copy.noDiplomaListed}</p>}
      {latest && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3" data-testid="guided-diploma-row" data-status={latest.status}>
          <div className="min-w-0">
            <p className="type-body font-medium text-slate-900">{fill(copy.diplomaRow, { time: formatTime(latest.issuedAt), date: formatDate(latest.issuedAt) })}</p>
            <p className="type-body-sm text-slate-600">{portalCopy.statusLabels[latest.status]}</p>
          </div>
          {latest.canRevoke && (
            <button
              type="button"
              onClick={(event) => revoke.open(latest, event.currentTarget)}
              className={`type-control inline-flex min-h-11 cursor-pointer items-center rounded-full border border-rose-200 bg-white px-4 text-rose-700 transition-colors hover:bg-rose-50 ${focusRing}`}
              data-testid="guided-revoke"
            >
              {portalCopy.revokeAction}
            </button>
          )}
        </div>
      )}
      <p id="guided-revoked-note" tabIndex={-1} role="status" aria-live="polite" className={latestRevoked ? 'type-body font-medium text-[#0F1E36] focus:outline-none' : 'sr-only'} data-testid={latestRevoked ? 'guided-revoked-note' : undefined}>
        {latestRevoked ? copy.revokedNote : ''}
      </p>
      <p className="type-body-sm text-slate-600">{portalCopy.timingNote}</p>
      {isDialogOpen(revoke.state) && (
        <ConfirmDialog
          title={portalCopy.revokeTitle}
          subtitle={fill(copy.diplomaRow, { time: formatTime(revoke.state.target.issuedAt), date: formatDate(revoke.state.target.issuedAt) })}
          body={(
            <ul className="type-body list-disc space-y-1.5 rounded-2xl bg-rose-50 py-3 pl-9 pr-4 text-rose-900">
              {portalCopy.revokePoints.map((point) => <li key={point}>{point}</li>)}
            </ul>
          )}
          confirmLabel={portalCopy.revokeConfirm}
          destructive
          state={revoke.state}
          problemText={revoke.state.phase === 'failed' ? portalCopy.revokeProblems[revoke.state.problem] : null}
          onConfirm={() => void revoke.save()}
          onCancel={revoke.cancel}
          copy={portalCopy}
        />
      )}
    </div>
  );
}

// ---- Which school runs the demo (only in a build with CertNet) ------------------------------------

function RunSwitch({ run, copy }: { run: GuidedRun; copy: DiplomaGuidedDemoPageCopy['runSwitch'] }) {
  const option = (value: GuidedRun, label: string) => (
    <Link
      to={{ search: guidedRunSearch(value) }}
      replace
      aria-current={run === value ? 'true' : undefined}
      className={`type-body-sm inline-flex min-h-11 items-center rounded-full px-4 font-semibold transition-colors ${
        run === value ? 'bg-[#0F1E36] text-white' : 'text-slate-700 hover:bg-slate-100'
      } ${focusRing}`}
      data-testid={`guided-run-${value}`}
    >
      {label}
    </Link>
  );
  return (
    <nav aria-label={copy.label} className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3" data-testid="guided-run-switch">
      <span className="type-body-sm text-slate-600">{copy.label}</span>
      <span className="inline-flex flex-wrap gap-1 self-start rounded-full bg-white p-1 ring-1 ring-slate-200">
        {option('x509', copy.x509)}
        {option('certnet', copy.certnet)}
      </span>
      <span className="type-body-sm text-slate-500">{copy.hint}</span>
    </nav>
  );
}

// ---- Page -----------------------------------------------------------------------------------------

/** The actor whose turn it is when a step opens (before anything happened in it). */
const actorForStep = (step: GuidedStepId, state: GuidedState): Actor =>
  step === 'receive' ? 'school' : step === 'apply' ? 'employer' : state.revoked ? 'employer' : 'school';

export default function DiplomaGuidedDemoPage() {
  const { language } = useLanguage();
  const locale = resolveDemoScenarioLocale('diploma', language) as Locale2;
  const [searchParams] = useSearchParams();
  const certnet = CERTNET_CONFIG !== null;
  const run = guidedRunFor(searchParams, certnet);
  const school = GUIDED_RUNS[run];
  const copy = guidedCopyFor(DIPLOMA_GUIDED_DEMO_PAGE_TRANSLATIONS[locale], run);
  const portalCopy = schoolCopyFor(SCHOOL_PORTAL_PAGE_TRANSLATIONS[locale], school.issuer);
  const dialogCopy = APPLY_JOB_VERIFIER_DIALOG_TRANSLATIONS[locale];
  const claimLabels = DEMO_WALLET_PANEL_TRANSLATIONS[locale].claims;

  const [guided, dispatch] = useReducer(guidedReducer, remembered?.guided ?? GUIDED_START);
  const [portal, setPortal] = useState(remembered?.session ?? null);
  const [generation, setGeneration] = useState(remembered?.generation ?? 0);
  const [signIn, setSignIn] = useState<{ submitting: boolean; problem: SignInProblem | null; retryAt: number | null }>({ submitting: false, problem: null, retryAt: null });
  const [inbox, setInbox] = useState<WalletInboxItem | null>(null);
  const [walletBusy, setWalletBusy] = useState(false);
  const [clockOffsetMs, setClockOffsetMs] = useState(remembered?.session?.clockOffsetMs ?? 0);
  const [declinedQr, setDeclinedQr] = useState<string | null>(null);
  const [deliveredQr, setDeliveredQr] = useState<string | null>(null);
  const [waitingQr, setWaitingQr] = useState<string | null>(null);
  const [mobileTab, setMobileTab] = useState<Actor>(() => actorForStep(guided.viewing === 'done' ? 'revoke' : guided.viewing, guided));
  const [turn, setTurn] = useState<Actor>(mobileTab);
  const inboxSeq = useRef(0);
  const inboxQrs = useRef(new Map<number, string>());
  const signInController = useRef<AbortController | null>(null);
  const workAreaRef = useRef<HTMLDivElement>(null);
  const signInWait = useSecondsUntilLocal(signIn.retryAt);
  const position = currentPosition(guided);
  const viewing = guided.viewing === 'done' ? 'revoke' : guided.viewing;
  const root = rootCa.roots[0] ?? null;

  // The run the state on screen belongs to: another school is another run, started from the beginning.
  const [stateRun, setStateRun] = useState<GuidedRun>(remembered?.run ?? run);

  useEffect(() => {
    remembered = { run: stateRun, guided, session: portal, generation };
  }, [generation, guided, portal, stateRun]);

  // A reload wipes the wallet and the sign-in (memory only): say so instead of silently starting over.
  useEffect(() => {
    if (!remembered?.session && !remembered?.guided.received && readProgressFlag()) {
      writeProgressFlag(false);
      dispatch({ type: 'notice', notice: 'reloaded' });
    }
  }, []);
  useEffect(() => {
    writeProgressFlag(portal !== null && position !== 'done');
  }, [portal, position]);

  useEffect(() => () => signInController.current?.abort(), []);

  /** It is `actor`'s turn: on a phone, show that actor's tab and bring the work area into view. */
  const turnTo = useCallback((actor: Actor) => {
    setTurn(actor);
    setMobileTab(actor);
    if (isNarrow()) window.requestAnimationFrame(() => workAreaRef.current?.scrollIntoView({ behavior: scrollBehavior(), block: 'start' }));
  }, []);

  const onSessionExpired = useCallback(() => {
    setPortal(null);
    // Only the session that issued the diploma can revoke it: a lost session ends the run before step 3 is done.
    if (guided.received && !guided.revoked) dispatch({ type: 'notice', notice: 'sessionLost' });
  }, [guided.received, guided.revoked]);

  const sessionExpiresAt = portal?.session.expiresAt ?? null;
  const sessionOffset = portal?.clockOffsetMs ?? 0;
  useEffect(() => {
    if (!sessionExpiresAt) return undefined;
    const timer = window.setTimeout(onSessionExpired, Math.max(0, Date.parse(sessionExpiresAt) - (Date.now() + sessionOffset)));
    return () => window.clearTimeout(timer);
  }, [onSessionExpired, sessionExpiresAt, sessionOffset]);

  const signInSample = async () => {
    if (signIn.submitting || signInWait > 0) return;
    signInController.current?.abort();
    const controller = new AbortController();
    signInController.current = controller;
    setSignIn({ submitting: true, problem: null, retryAt: null });
    try {
      const session = await portalClientFor(school.issuer).login(school.account, SCHOOL_PORTAL_SAMPLE_PASSWORD, controller.signal);
      if (controller.signal.aborted) return;
      if (session.role !== 'student') throw new PortalApiError('malformed', 'not a student');
      const offset = serverClockOffset(session.serverTime, Date.now());
      setPortal({ session, clockOffsetMs: offset });
      setClockOffsetMs(offset);
      setSignIn({ submitting: false, problem: null, retryAt: null });
    } catch (error) {
      if (controller.signal.aborted) return;
      const retryAfter = error instanceof PortalApiError ? error.retryAfterSeconds : undefined;
      setSignIn({
        submitting: false,
        problem: error instanceof PortalApiError ? signInProblemFor(error) : 'unavailable',
        retryAt: retryAfter === undefined ? null : Date.now() + retryAfter * 1000,
      });
    }
  };

  // Nothing is handed over while the wallet is busy (an accept or a share in flight): the buttons are disabled
  // too, and the wallet refuses it as well.
  const handoff = (kind: WalletInboxItem['kind'], text: string) => {
    if (walletBusy) return;
    window.clearTimeout(handBackTimer.current);
    inboxSeq.current += 1;
    inboxQrs.current.set(inboxSeq.current, text);
    setInbox({ id: inboxSeq.current, kind, text });
    turnTo('wallet');
  };

  // After the wallet's part, the employer's turn: on a phone the tab switches a moment later, so the wallet's
  // own confirmation ("saved", "sent") is seen first.
  const handBackTimer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(handBackTimer.current), []);
  const turnToEmployerSoon = useCallback(() => {
    window.clearTimeout(handBackTimer.current);
    setTurn('employer');
    handBackTimer.current = window.setTimeout(() => turnTo('employer'), 1500);
  }, [turnTo]);

  const onRevoked = useCallback(() => {
    dispatch({ type: 'revoked' });
    turnToEmployerSoon();
  }, [turnToEmployerSoon]);

  const onWalletEvent = useCallback((event: WalletPanelEvent) => {
    if (event.type === 'credentialReceived') {
      dispatch({ type: 'received', checked: event.checked });
      turnToEmployerSoon();
    }
    if (event.type === 'presentationSent') turnToEmployerSoon();
    // Received but not checked: the wallet is locked to that share, and the page says "Send again" too.
    if (event.type === 'presentationDelivered') setDeliveredQr(inboxQrs.current.get(event.itemId) ?? null);
    if (event.type === 'presentationDeclined') {
      setDeclinedQr(inboxQrs.current.get(event.itemId) ?? null);
      turnToEmployerSoon();
    }
    if (event.type === 'presentationBlocked') {
      dispatch({ type: 'walletRefused', status: event.status });
      turnToEmployerSoon();
    }
  }, [turnToEmployerSoon]);

  const restart = () => {
    signInController.current?.abort();
    setPortal(null);
    setSignIn({ submitting: false, problem: null, retryAt: null });
    setInbox(null);
    setWalletBusy(false);
    setDeclinedQr(null);
    setDeliveredQr(null);
    setGeneration((value) => value + 1);
    dispatch({ type: 'restart' });
    writeProgressFlag(false);
    setTurn('school');
    setMobileTab('school');
    window.scrollTo({ top: 0, behavior: 'auto' });
    focusById('guided-title');
  };

  // Switching school (the switch, the address, coming back from another page) empties the wallet and starts again.
  useEffect(() => {
    if (stateRun === run) return;
    setStateRun(run);
    restart();
  }, [run, stateRun]);


  const view = (step: GuidedStepId) => {
    dispatch({ type: 'view', position: step });
    turnTo(actorForStep(step, guided));
  };

  const stepCopy = copy.steps[viewing];
  const instructions = instructionsFor(copy, viewing, waitingQr, deliveredQr);
  const deliveredWaiting = instructions === copy.deliveredInstructions;
  const viewingIndex = GUIDED_STEPS.indexOf(viewing) + 1;
  const fieldLabel = (name: string) => (isDiplomaField(name) ? claimLabels[name] : name);
  const fieldsText = (names: readonly string[]) => names.map(fieldLabel).join(', ');

  /** Under a result: what stayed in the wallet, and who contacted whom. */
  const resultExtras = (result: SessionResult, extra?: ReactNode) => {
    const received = Object.keys(result.claims ?? {});
    const stayed = DIPLOMA_FIELDS.filter((name) => !received.includes(name));
    return (
      <div className="space-y-4">
        {result.ok && (
          <section aria-label={copy.stayedTitle} className="rounded-2xl bg-emerald-50 p-4 text-emerald-950" data-testid="guided-fields-stayed">
            <h4 className="type-card-title-sm">{copy.stayedTitle}</h4>
            <p className="type-body mt-1">{fieldsText(stayed)}</p>
            <p className="type-body-sm mt-1 text-emerald-900">{copy.stayedNote}</p>
          </section>
        )}
        {result.ok && (
          <WhatHappened
            title={copy.contactsTitle}
            testId="guided-contacts"
            lines={[
              fill(copy.contactWallet, { fields: fieldsText(received) }),
              copy.contactSchool,
              copy.contactChecks,
              <span className="text-white/75">{copy.contactDemoNote}</span>,
            ]}
          />
        )}
        {extra}
      </div>
    );
  };

  const signInBlock = guided.received ? null : (
    <div className="space-y-3">
      <button type="button" onClick={() => void signInSample()} disabled={signIn.submitting || signInWait > 0} className={primaryButton} data-testid="guided-signin">
        {signIn.submitting && <Loader2 aria-hidden="true" className="h-4 w-4 motion-safe:animate-spin" />}
        {signIn.submitting ? copy.signingIn : copy.signInSample}
      </button>
      {signIn.problem && (
        <p role="alert" className="type-body flex items-start gap-2 rounded-2xl bg-rose-50 px-4 py-3 text-rose-800" data-testid="guided-signin-problem" data-problem={signIn.problem}>
          <AlertTriangle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            {copy.signInProblems[signIn.problem]}
            {signInWait > 0 && ` ${fill(portalCopy.retryAfter, { seconds: signInWait })}`}
          </span>
        </p>
      )}
    </div>
  );

  // What the wallet really established at receipt: "valid", or saved but not checked yet.
  const happenedReceive = (
    <WhatHappened
      title={copy.happenedTitle}
      lines={happenedReceiveLines(copy, guided)}
      testId="guided-happened-receive"
    />
  );

  // The organisation's side of the step on screen, per actor (null: that actor has no part in this step).
  let common: ReactNode = null;
  let schoolSide: ReactNode = null;
  let employerSide: ReactNode = null;
  if (viewing === 'receive') {
    schoolSide = (
      <section className={panel} aria-label={portalCopy.universityName}>
        <OrganisationHeader kind="school" name={portalCopy.universityName} detail={portalCopy.portalName} crestLabel={portalCopy.crestLabel} />
        <div className="mt-5">
          {guided.received ? (
            // As guided-offer-issued: the school only knows it sent the diploma.
            <Notice tone="info" testId="guided-receive-done"><p>{portalCopy.issuedTitle}</p></Notice>
          ) : portal ? (
            <ReceiveSignedIn
              key={portal.session.token}
              session={portal.session}
              copy={copy}
              portalCopy={portalCopy}
              walletBusy={walletBusy}
              onSessionExpired={onSessionExpired}
              onHandoff={(text) => handoff('offer', text)}
            />
          ) : signInBlock}
        </div>
      </section>
    );
    if (guided.received) common = happenedReceive;
  } else if (viewing === 'apply') {
    if (guided.received && !guided.applied) common = <div data-testid="guided-received-banner">{happenedReceive}</div>;
    employerSide = (
      <section className={panel} aria-label={copy.employerName}>
        <OrganisationHeader kind="employer" name={copy.employerName} detail={copy.employerJob} crestLabel="" />
        <div className="mt-5 space-y-4">
          <div>
            <p className="type-card-title-sm text-slate-900">{copy.requestedTitle}</p>
            <p className="type-body text-slate-700">{copy.requestedBody}</p>
          </div>
          <EmployerCheck
            variant="apply"
            copy={copy}
            dialogCopy={dialogCopy}
            language={locale}
            startLabel={copy.apply}
            walletBusy={walletBusy}
            declinedQr={declinedQr}
            deliveredQr={deliveredQr}
            onHandoff={(qr) => handoff('request', qr)}
            onClockOffset={setClockOffsetMs}
            onWaitingQr={setWaitingQr}
            onResult={(ok, reason) => dispatch({ type: 'verified', ok, reason })}
            renderResult={(result) => resultExtras(result, guided.applied ? (
              <button type="button" onClick={() => { view('revoke'); focusById('guided-step-title'); }} className={primaryButton} data-testid="guided-next-step">
                {copy.appliedNext}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </button>
            ) : null)}
          />
        </div>
      </section>
    );
  } else {
    const refusedNote = guided.refusedBy === 'employer' ? (
      <div className="space-y-4">
        <Notice tone="error" testId="guided-refused"><p data-by="employer">{copy.refusedByEmployer}</p></Notice>
        <WhatHappened title={copy.happenedTitle} lines={copy.happenedRevoke} testId="guided-happened-revoke" />
      </div>
    ) : null;
    schoolSide = (
      <section className={panel} aria-label={copy.schoolRevokeTitle}>
        <OrganisationHeader kind="school" name={portalCopy.universityName} detail={copy.schoolRevokeTitle} crestLabel={portalCopy.crestLabel} />
        <div className="mt-5 space-y-4">
          <p className="type-body text-slate-700" data-testid="guided-revoke-reasons">{copy.schoolRevokeBody}</p>
          {portal ? (
            <RevokeOnSchoolSide
              key={portal.session.token}
              session={portal.session}
              copy={copy}
              portalCopy={portalCopy}
              locale={locale}
              onSessionExpired={onSessionExpired}
              onRevoked={onRevoked}
            />
          ) : guided.revoked ? (
            <p className="type-body font-medium text-[#0F1E36]" data-testid="guided-revoked-note">{copy.revokedNote}</p>
          ) : null}
        </div>
      </section>
    );
    employerSide = guided.revoked ? (
      <section className={panel} aria-label={copy.employerAgainTitle}>
        <OrganisationHeader kind="employer" name={copy.employerName} detail={copy.employerAgainTitle} crestLabel="" />
        <div className="mt-5 space-y-4">
          <p className="type-body text-slate-700">{copy.employerAgainBody}</p>
          {guided.refusedBy === 'wallet' ? (
            <div className="space-y-4">
              <Notice tone="error" testId="guided-refused">
                <p data-by="wallet" data-status={guided.walletStatus ?? undefined}>{copy.refusedByWallet[guided.walletStatus ?? 'revoked']}</p>
              </Notice>
              <WhatHappened title={copy.happenedTitle} lines={copy.happenedRevoke} testId="guided-happened-revoke" />
            </div>
          ) : (
            <EmployerCheck
              variant="again"
              copy={copy}
              dialogCopy={dialogCopy}
              language={locale}
              startLabel={copy.verifyAgain}
              walletBusy={walletBusy}
              declinedQr={declinedQr}
              deliveredQr={deliveredQr}
              onHandoff={(qr) => handoff('request', qr)}
              onClockOffset={setClockOffsetMs}
              onWaitingQr={setWaitingQr}
              onResult={(ok, reason) => dispatch({ type: 'verified', ok, reason })}
              renderResult={(result) => resultExtras(result, refusedNote ?? (
                guided.lastFailure
                  ? <Notice tone="warning"><p>{copy.otherFailure}</p></Notice>
                  : <Notice tone="warning"><p>{copy.passedAfterRevoke}</p></Notice>
              ))}
            />
          )}
        </div>
      </section>
    ) : null;
  }

  const actorClass = (actor: Actor) => `${mobileTab === actor ? '' : 'hidden'} lg:block`;
  const skewMinutes = Math.round(Math.abs(clockOffsetMs) / 60_000);

  return (
    <div className="bg-[#FAFBFD] pb-28 lg:pb-20" data-testid="guided-page" data-position={position} data-run={run === 'certnet' ? run : undefined}>
      <div className="mx-auto max-w-7xl space-y-8 px-6 pt-8 sm:pt-10">
        <Link to={viewToPath('demo', language)} className={`type-control inline-flex min-h-11 items-center gap-2 text-slate-700 hover:text-[#354CE1] ${focusRing}`} data-testid="guided-back">
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          {copy.backToDemos}
        </Link>

        <header className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <div className="space-y-3 lg:col-span-8">
            <p className="type-body-sm inline-flex items-center gap-2 font-semibold text-emerald-800">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-500" />
              {copy.realLabel}
            </p>
            <h1 id="guided-title" tabIndex={-1} className="type-page-title text-balance text-[#0F1E36] focus:outline-none">{copy.title}</h1>
            <p className="type-lead max-w-3xl text-slate-700">{copy.intro}</p>
          </div>
          <div className="rounded-3xl bg-[#E2E6FF] p-5 lg:col-span-4">
            <p className="type-card-title-sm text-[#0F1E36]">{copy.noAppTitle}</p>
            <p className="type-body mt-1 text-slate-800">{copy.noAppBody}</p>
          </div>
        </header>

        {certnet && <RunSwitch run={run} copy={copy.runSwitch} />}

        <IdentraHowItWorks locale={locale} variant="summary" registryNote={run === 'certnet' ? copy.certnetRun.registry : undefined} />

        <nav aria-label={copy.stepperLabel}>
          <ol className="grid grid-cols-1 gap-3 md:grid-cols-3" data-testid="guided-stepper">
            {GUIDED_STEPS.map((step: GuidedStepId, index) => {
              const status = stepStatus(guided, step);
              const selected = viewing === step;
              const content = (
                <>
                  <span
                    aria-hidden="true"
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-semibold ${
                      status === 'done' ? 'bg-emerald-600 text-white' : status === 'current' ? 'bg-[#354CE1] text-white' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {status === 'done' ? <CheckCircle2 className="h-5 w-5" /> : index + 1}
                  </span>
                  <span className="min-w-0 text-left">
                    <span className="type-body-sm block text-slate-600">
                      {fill(copy.stepNumber, { number: index + 1 })}
                      {' · '}
                      {copy.stepStatus[status]}
                    </span>
                    <span className="type-card-title-sm block text-[#0F1E36]">{copy.steps[step].title}</span>
                    <span className="type-body-sm block text-slate-600">{copy.steps[step].summary}</span>
                  </span>
                </>
              );
              const frame = `flex h-full w-full items-start gap-3 rounded-2xl px-4 py-3 ${selected ? 'bg-white ring-2 ring-[#354CE1]' : 'bg-white ring-1 ring-slate-200'}`;
              return (
                <li key={step} data-testid={`guided-step-${step}`} data-status={status} aria-current={status === 'current' ? 'step' : undefined}>
                  {canView(guided, step) && !selected ? (
                    <button type="button" onClick={() => view(step)} className={`${frame} cursor-pointer hover:ring-[#354CE1]/60 ${focusRing}`} data-testid={`guided-step-view-${step}`}>
                      {content}
                    </button>
                  ) : (
                    <div className={`${frame} ${status === 'upcoming' ? 'opacity-70' : ''}`}>{content}</div>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        {guided.notice && (
          <Notice tone="warning" testId="guided-notice">
            <p className="font-semibold" data-notice={guided.notice}>{copy.notices[guided.notice].title}</p>
            <p>{copy.notices[guided.notice].body}</p>
            <button type="button" onClick={restart} className={primaryButton} data-testid="guided-notice-restart">
              <RotateCcw aria-hidden="true" className="h-4 w-4" />
              {copy.restart}
            </button>
          </Notice>
        )}

        {skewMinutes >= 1 && Math.abs(clockOffsetMs) > CLOCK_SKEW_NOTICE_MS && (
          <Notice tone="warning" testId="guided-clock-skew"><p>{fill(copy.clockSkew, { minutes: skewMinutes })}</p></Notice>
        )}

        <div ref={workAreaRef} className="grid scroll-mt-24 grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-7">
            <div className="space-y-1">
              <h2 id="guided-step-title" tabIndex={-1} className="type-section-title-compact text-[#0F1E36] focus:outline-none">
                {fill(copy.stepNumber, { number: viewingIndex })}
                {': '}
                {stepCopy.title}
              </h2>
              <p className="type-body text-slate-700">{stepCopy.summary}</p>
            </div>
            <section className="rounded-3xl bg-[#E2E6FF] p-5 sm:p-6" aria-labelledby="guided-instructions-title" data-testid="guided-instructions" data-delivered={deliveredWaiting || undefined}>
              <h3 id="guided-instructions-title" className="type-card-title-sm text-[#0F1E36]">{copy.instructionsTitle}</h3>
              <ol className="type-body mt-3 list-decimal space-y-2 pl-5 text-slate-800">
                {instructions.map((line) => <li key={line}>{line}</li>)}
              </ol>
            </section>
            {/* On a phone the wallet (and its own marker) is one tab of three: the other two tabs carry the marker here. */}
            {CERTNET_TEST_BUILD && mobileTab !== 'wallet' && (
              <div className="lg:hidden" data-testid="guided-test-build">
                <CertNetTestBuildMarker text={DEMO_WALLET_PANEL_TRANSLATIONS[locale].testBuildMarker} />
              </div>
            )}
            <IdentraErrorBoundary>
              {common}
              {(['school', 'employer'] as const).map((actor) => {
                const side = actor === 'school' ? schoolSide : employerSide;
                return (
                  <div key={actor} className={`${actorClass(actor)} ${side ? 'mt-5 first:mt-0' : ''}`} data-testid={`guided-actor-${actor}`}>
                    {side ?? <p className="type-body rounded-2xl bg-slate-100 px-4 py-6 text-center text-slate-600 lg:hidden">{copy.notThisStep[actor]}</p>}
                  </div>
                );
              })}
            </IdentraErrorBoundary>
          </div>

          <aside id="demo-wallet" aria-label={copy.walletSide} className={`scroll-mt-24 lg:sticky lg:top-24 lg:col-span-5 ${actorClass('wallet')}`}>
            <IdentraErrorBoundary>
              <DemoWalletPanel locale={locale} inbox={inbox} generation={generation} clockOffsetMs={clockOffsetMs} onEvent={onWalletEvent} onBusyChange={setWalletBusy} />
            </IdentraErrorBoundary>
          </aside>
        </div>

        {position === 'done' && (
          <section className="rounded-3xl bg-[#0F1E36] p-6 text-white sm:p-10" aria-labelledby="guided-end-title" data-testid="guided-end">
            <h2 id="guided-end-title" className="type-section-title-compact text-white">{copy.endTitle}</h2>
            <ol className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              {copy.endPoints.map((point, index) => (
                <li key={point} className="space-y-2">
                  <span aria-hidden="true" className="type-card-title flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white">{index + 1}</span>
                  <p className="type-body text-white/90">{point}</p>
                </li>
              ))}
            </ol>
            {root && (
              <div className="mt-8 rounded-2xl bg-white/5 p-4" data-testid="guided-end-root">
                <p className="type-card-title-sm text-white">{copy.endRootTitle}</p>
                <p className="type-body-sm mt-1 text-white/85">{copy.endRootBody}</p>
                <p className="type-body-sm mt-1 break-all font-mono text-white" translate="no">{root.fingerprint}</p>
                <a href={root.downloadPath} download className="type-control mt-2 inline-flex min-h-11 items-center gap-2 text-white underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" data-testid="guided-end-root-download">
                  <Download aria-hidden="true" className="h-4 w-4" />
                  {copy.endRootDownload}
                </a>
              </div>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={demoScenarioPath('product-journey', language)} className="type-control inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-[#0F1E36] transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" data-testid="guided-end-product">
                {copy.endProductDemo}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link to={viewToPath('security', language)} className="type-control inline-flex min-h-11 items-center gap-2 rounded-full border border-white/40 px-5 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" data-testid="guided-end-security">
                {copy.endSecurity}
              </Link>
              <button type="button" onClick={restart} className="type-control inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-white/40 px-5 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" data-testid="guided-end-restart">
                <RotateCcw aria-hidden="true" className="h-4 w-4" />
                {copy.restart}
              </button>
            </div>
          </section>
        )}

        {position !== 'receive' && position !== 'done' && (
          <div className="flex flex-wrap items-center gap-3 border-t border-slate-200 pt-6">
            <button type="button" onClick={restart} className={secondaryButton} data-testid="guided-restart">
              <RotateCcw aria-hidden="true" className="h-4 w-4" />
              {copy.restart}
            </button>
            <p className="type-body-sm text-slate-600">{copy.restartConfirmHint}</p>
          </div>
        )}
      </div>

      <nav aria-label={copy.tabsLabel} className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 lg:hidden" data-testid="guided-tabs">
        <div className="mx-auto grid max-w-md grid-cols-3 gap-1" role="tablist">
          {(['school', 'employer', 'wallet'] as const).map((actor) => {
            const Icon = actor === 'school' ? GraduationCap : actor === 'employer' ? Briefcase : Wallet;
            const active = mobileTab === actor;
            return (
              <button
                key={actor}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setMobileTab(actor);
                  workAreaRef.current?.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
                }}
                className={`relative flex min-h-12 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-xl px-2 ${active ? 'bg-[#354CE1] text-white' : 'text-slate-700 hover:bg-slate-100'} ${focusRing}`}
                data-testid={`guided-tab-${actor}`}
                data-active={active || undefined}
              >
                <Icon aria-hidden="true" className="h-4 w-4" />
                <span className="type-body-sm font-semibold">{copy.tabs[actor]}</span>
                {turn === actor && !active && (
                  <span className="absolute right-2 top-1.5 h-2.5 w-2.5 rounded-full bg-emerald-500">
                    <span className="sr-only">{copy.tabTurn}</span>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
