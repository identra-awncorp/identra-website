/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useReducer, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, ArrowRight, Briefcase, CheckCircle2, Clock, Loader2, RefreshCw, RotateCcw, Wallet } from 'lucide-react';
import { createVerifierClient, serverClockOffset } from '@identra/sdk-client';
import { useLanguage } from '../../context/LanguageContext';
import { useNow } from '../../hooks/useNow';
import {
  focusById,
  isDialogOpen,
  schoolPortalClient,
  useSecondsUntilLocal,
  useStatusChange,
  useStudentOffer,
} from '../../hooks/useSchoolPortal';
import { IDENTRA_API_ORIGIN, IDENTRA_API_URL, SAMPLE_VERIFIER, SAMPLE_VERIFIER_SCENARIO } from '../../identra/config';
import type { WalletInboxItem } from '../../identra/demoWalletModel';
import {
  canView,
  currentPosition,
  GUIDED_START,
  GUIDED_STEPS,
  guidedReducer,
  stepStatus,
  type GuidedState,
  type GuidedStepId,
} from '../../identra/guidedDiplomaDemo';
import { PortalApiError, type IssuedCredential, type PortalSession } from '../../identra/schoolPortalClient';
import { signInProblemFor, type SignInProblem } from '../../identra/schoolPortalState';
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
import { DIPLOMA_GUIDED_DEMO_PAGE_TRANSLATIONS, type DiplomaGuidedDemoPageCopy } from '../../translations/demo/DiplomaGuidedDemoPageTranslations';
import {
  SCHOOL_PORTAL_PAGE_TRANSLATIONS,
  SCHOOL_PORTAL_SAMPLE_ACCOUNTS,
  SCHOOL_PORTAL_SAMPLE_PASSWORD,
  type SchoolPortalPageCopy,
} from '../../translations/SchoolPortalPageTranslations';
import { demoScenarioPath, resolveDemoScenarioLocale, viewToPath } from '../../types/routes';
import IdentraErrorBoundary from '../IdentraErrorBoundary';
import ConfirmDialog from '../SchoolPortalConfirmDialog';
import UniversityCrest from '../UniversityCrest';
import { ApplyJobVerifierResult } from './ApplyJobVerifierDialog';
import DemoWalletPanel, { type WalletPanelEvent } from './DemoWalletPanel';

// The guided diploma demo: the organisation's side of the current step on the left, the web trial wallet
// on the right (stacked on a phone, with a button that always brings the wallet into view). Everything runs
// against the real API with the existing portal and verifier clients; progress follows what really happened.

type StudentSession = Extract<PortalSession, { role: 'student' }>;
type Locale2 = 'vi' | 'en';

const verifierClient = createVerifierClient({ baseUrl: IDENTRA_API_URL, apiOrigin: IDENTRA_API_ORIGIN });
const SAMPLE_ACCOUNT = SCHOOL_PORTAL_SAMPLE_ACCOUNTS[0];

// Memory only: survives a language switch or a visit to another page of the site, not a reload. Tokens never
// go to storage; the session flag below is a bare "a run was in progress", so a reload can be explained.
let remembered: { guided: GuidedState; session: { session: StudentSession; clockOffsetMs: number } | null; generation: number } | null = null;
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

/** Stable test ids of the employer check, per step (`guided-apply-…`, `guided-again-…`). */
const testId = (variant: 'apply' | 'again', part: string) => ['guided', variant, part].join('-');

const isNarrow = () => typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches;
const scrollBehavior = (): ScrollBehavior => (window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth');

function Countdown({ expiresAt, offsetMs, template }: { expiresAt: string; offsetMs: number; template: string }) {
  const now = useNow();
  return <span className="tabular-nums">{fill(template, { time: formatCountdown(secondsUntil(expiresAt, now + offsetMs)) })}</span>;
}

function Notice({ tone, children, testId }: { tone: 'info' | 'warning' | 'success' | 'error'; children: ReactNode; testId?: string }) {
  const styles = {
    info: 'bg-slate-100 text-slate-800',
    warning: 'bg-amber-50 text-amber-950',
    success: 'bg-emerald-50 text-emerald-950',
    error: 'bg-rose-50 text-rose-950',
  }[tone];
  const Icon = tone === 'success' ? CheckCircle2 : tone === 'info' ? Clock : AlertTriangle;
  return (
    <div className={`type-body flex items-start gap-3 rounded-2xl px-4 py-3 ${styles}`} data-testid={testId}>
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

// ---- Step 1: the school issues the diploma ---------------------------------------------------------

function ReceiveSignedIn({
  session,
  copy,
  portalCopy,
  onSessionExpired,
  onHandoff,
}: {
  session: StudentSession;
  copy: DiplomaGuidedDemoPageCopy;
  portalCopy: SchoolPortalPageCopy;
  onSessionExpired: () => void;
  onHandoff: (offerUri: string) => void;
}) {
  const { offer, createOffer } = useStudentOffer(session.token, onSessionExpired);
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
          <button
            type="button"
            onClick={() => {
              onHandoff(offer.offer.offerUri);
              setHandedOver(offer.offer.offerId);
            }}
            className={handedOver === activeOfferId ? secondaryButton : primaryButton}
            data-testid="guided-send-offer"
          >
            <Wallet aria-hidden="true" className="h-4 w-4" />
            {handedOver === activeOfferId ? copy.sendAgain : copy.sendToWallet}
          </button>
          {handedOver === activeOfferId && (
            <p className="type-body font-medium text-[#0F1E36]" data-testid="guided-offer-sent">{fill(copy.sentToWallet, { pin: offer.offer.txCode })}</p>
          )}
          {offer.reconnecting && <p className="type-body-sm text-amber-800">{portalCopy.reconnecting}</p>}
        </div>
      )}

      {offer.phase === 'issued' && (
        <Notice tone="success" testId="guided-offer-issued"><p>{portalCopy.issuedTitle}</p></Notice>
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
  onHandoff,
  onResult,
  resultNote,
}: {
  variant: 'apply' | 'again';
  copy: DiplomaGuidedDemoPageCopy;
  dialogCopy: ApplyJobVerifierDialogCopy;
  language: string;
  startLabel: string;
  onHandoff: (qr: string) => void;
  onResult: (ok: boolean, reason: FailureReasonKey | null) => void;
  /** A sentence under the result that says what it means for this step. */
  resultNote?: ReactNode;
}) {
  const [state, dispatch] = useReducer(verifierStepReducer, INITIAL_VERIFIER_STEP_STATE);
  const controllerRef = useRef<AbortController | null>(null);
  const [handedOver, setHandedOver] = useState<string | null>(null);
  const onResultRef = useRef(onResult);
  useEffect(() => {
    onResultRef.current = onResult;
  });
  const now = useNow();
  const retryWait = state.phase === 'error' && state.retryAt !== null ? Math.max(0, Math.floor((state.retryAt - now) / 1000)) : 0;

  const start = useCallback(() => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setHandedOver(null);
    void runVerifierSession(verifierClient, { verifier: SAMPLE_VERIFIER, scenario: SAMPLE_VERIFIER_SCENARIO }, { signal: controller.signal, dispatch });
  }, []);
  useEffect(() => () => controllerRef.current?.abort(), []);

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
    <div className="space-y-4" data-testid={`guided-${variant}`} data-phase={state.phase}>
      <p role="status" aria-live="polite" className="sr-only">
        {state.phase === 'creating' ? dialogCopy.creating : state.phase === 'waiting' ? (state.status === 'request_retrieved' ? copy.requestSentToWallet : copy.requestReady) : ''}
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

      {state.phase === 'waiting' && (
        <div className="space-y-4 rounded-2xl bg-slate-50 p-4 sm:p-5" data-testid={testId(variant, 'waiting')} data-status={state.status}>
          <p className="type-body flex items-center gap-2 text-slate-700">
            <Clock aria-hidden="true" className="h-4 w-4 text-slate-500" />
            <Countdown expiresAt={state.expiresAt} offsetMs={state.clockOffsetMs} template={copy.requestExpiresIn} />
          </p>
          <button
            type="button"
            onClick={() => {
              onHandoff(state.qr);
              setHandedOver(state.sessionId);
            }}
            className={handedOver === state.sessionId ? secondaryButton : primaryButton}
            data-testid={testId(variant, 'open-request')}
          >
            <Wallet aria-hidden="true" className="h-4 w-4" />
            {copy.openRequestInWallet}
          </button>
          <p className={`type-body font-medium ${state.reconnecting ? 'text-amber-800' : 'text-[#0F1E36]'}`}>
            {state.reconnecting ? dialogCopy.reconnecting : state.status === 'request_retrieved' || handedOver === state.sessionId ? copy.requestSentToWallet : copy.requestReady}
          </p>
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
          {resultNote}
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
      const page = await schoolPortalClient.listCredentials(session.token, { signal });
      if (!signal?.aborted) setItems(page.items);
    } catch (error) {
      if (signal?.aborted) return;
      if (error instanceof PortalApiError && error.kind === 'session_expired') onSessionExpired();
      else setLoadProblem(true);
    }
  }, [onSessionExpired, session.token]);

  useEffect(() => {
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
  }, [load]);

  const latest = items?.[0] ?? null;
  const revoke = useStatusChange<IssuedCredential>({
    idOf: (item) => item.id,
    perform: (item, signal) => schoolPortalClient.revokeCredential(session.token, item.id, signal),
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

// ---- Page -----------------------------------------------------------------------------------------

export default function DiplomaGuidedDemoPage() {
  const { language } = useLanguage();
  const locale = resolveDemoScenarioLocale('diploma', language) as Locale2;
  const copy = DIPLOMA_GUIDED_DEMO_PAGE_TRANSLATIONS[locale];
  const portalCopy = SCHOOL_PORTAL_PAGE_TRANSLATIONS[locale];
  const dialogCopy = APPLY_JOB_VERIFIER_DIALOG_TRANSLATIONS[locale];

  const [guided, dispatch] = useReducer(guidedReducer, remembered?.guided ?? GUIDED_START);
  const [portal, setPortal] = useState(remembered?.session ?? null);
  const [generation, setGeneration] = useState(remembered?.generation ?? 0);
  const [signIn, setSignIn] = useState<{ submitting: boolean; problem: SignInProblem | null; retryAt: number | null }>({ submitting: false, problem: null, retryAt: null });
  const [inbox, setInbox] = useState<WalletInboxItem | null>(null);
  const [walletWaiting, setWalletWaiting] = useState(false);
  const [walletInView, setWalletInView] = useState(false);
  const inboxSeq = useRef(0);
  const signInController = useRef<AbortController | null>(null);
  const walletRef = useRef<HTMLElement>(null);
  const signInWait = useSecondsUntilLocal(signIn.retryAt);
  const position = currentPosition(guided);
  const viewing = guided.viewing === 'done' ? 'revoke' : guided.viewing;

  useEffect(() => {
    remembered = { guided, session: portal, generation };
  }, [generation, guided, portal]);

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
      const session = await schoolPortalClient.login(SAMPLE_ACCOUNT, SCHOOL_PORTAL_SAMPLE_PASSWORD, controller.signal);
      if (controller.signal.aborted) return;
      if (session.role !== 'student') throw new PortalApiError('malformed', 'not a student');
      setPortal({ session, clockOffsetMs: serverClockOffset(session.serverTime, Date.now()) });
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

  const handoff = (kind: WalletInboxItem['kind'], text: string) => {
    inboxSeq.current += 1;
    setInbox({ id: inboxSeq.current, kind, text });
    setWalletWaiting(true);
    if (isNarrow()) walletRef.current?.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
  };

  const onWalletEvent = useCallback((event: WalletPanelEvent) => {
    setWalletWaiting(false);
    if (event.type === 'credentialReceived') {
      dispatch({ type: 'received' });
      focusById('guided-step-title');
    }
    if (event.type === 'presentationBlocked') dispatch({ type: 'walletRefused' });
  }, []);

  const restart = () => {
    signInController.current?.abort();
    setPortal(null);
    setSignIn({ submitting: false, problem: null, retryAt: null });
    setInbox(null);
    setWalletWaiting(false);
    setGeneration((value) => value + 1);
    dispatch({ type: 'restart' });
    writeProgressFlag(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
    focusById('guided-title');
  };

  const onRevoked = useCallback(() => dispatch({ type: 'revoked' }), []);

  // On a phone the wallet sits below the steps; a button keeps it one tap away while it is out of view.
  useEffect(() => {
    const target = walletRef.current;
    if (!target || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(([entry]) => setWalletInView(Boolean(entry?.isIntersecting)), { threshold: 0.15 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const stepCopy = copy.steps[viewing];
  const viewingIndex = GUIDED_STEPS.indexOf(viewing) + 1;

  const signInBlock = (
    <div className="space-y-3">
      {guided.received ? null : (
        <>
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
        </>
      )}
    </div>
  );

  let organisationSide: ReactNode;
  if (viewing === 'receive') {
    organisationSide = (
      <section className={panel} aria-label={portalCopy.universityName}>
        <OrganisationHeader kind="school" name={portalCopy.universityName} detail={portalCopy.portalName} crestLabel={portalCopy.crestLabel} />
        <div className="mt-5">
          {guided.received ? (
            <Notice tone="success" testId="guided-receive-done"><p>{copy.receivedBanner}</p></Notice>
          ) : portal ? (
            <ReceiveSignedIn
              key={portal.session.token}
              session={portal.session}
              copy={copy}
              portalCopy={portalCopy}
              onSessionExpired={onSessionExpired}
              onHandoff={(text) => handoff('offer', text)}
            />
          ) : signInBlock}
        </div>
      </section>
    );
  } else if (viewing === 'apply') {
    organisationSide = (
      <div className="space-y-4">
        {guided.received && !guided.applied && <Notice tone="success" testId="guided-received-banner"><p>{copy.receivedBanner}</p></Notice>}
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
              onHandoff={(qr) => handoff('request', qr)}
              onResult={(ok, reason) => dispatch({ type: 'verified', ok, reason })}
              resultNote={guided.applied ? (
                <button type="button" onClick={() => { dispatch({ type: 'view', position: 'revoke' }); focusById('guided-step-title'); }} className={primaryButton} data-testid="guided-next-step">
                  {copy.appliedNext}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </button>
              ) : null}
            />
          </div>
        </section>
      </div>
    );
  } else {
    organisationSide = (
      <div className="space-y-4">
        <section className={panel} aria-label={copy.schoolRevokeTitle}>
          <OrganisationHeader kind="school" name={portalCopy.universityName} detail={copy.schoolRevokeTitle} crestLabel={portalCopy.crestLabel} />
          <div className="mt-5 space-y-4">
            <p className="type-body text-slate-700">{copy.schoolRevokeBody}</p>
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
        {guided.revoked && (
          <section className={panel} aria-label={copy.employerAgainTitle}>
            <OrganisationHeader kind="employer" name={copy.employerName} detail={copy.employerAgainTitle} crestLabel="" />
            <div className="mt-5 space-y-4">
              <p className="type-body text-slate-700">{copy.employerAgainBody}</p>
              {guided.refusedBy === 'wallet' ? (
                <Notice tone="error" testId="guided-refused" ><p data-by="wallet">{copy.refusedByWallet}</p></Notice>
              ) : (
                <EmployerCheck
                  variant="again"
                  copy={copy}
                  dialogCopy={dialogCopy}
                  language={locale}
                  startLabel={copy.verifyAgain}
                  onHandoff={(qr) => handoff('request', qr)}
                  onResult={(ok, reason) => dispatch({ type: 'verified', ok, reason })}
                  resultNote={guided.refusedBy === 'employer' ? (
                    <Notice tone="error" testId="guided-refused"><p data-by="employer">{copy.refusedByEmployer}</p></Notice>
                  ) : guided.lastFailure ? (
                    <Notice tone="warning"><p>{copy.otherFailure}</p></Notice>
                  ) : (
                    <Notice tone="warning"><p>{copy.passedAfterRevoke}</p></Notice>
                  )}
                />
              )}
            </div>
          </section>
        )}
      </div>
    );
  }

  return (
    <div className="bg-[#FAFBFD] pb-28 lg:pb-20" data-testid="guided-page" data-position={position}>
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
                    <button type="button" onClick={() => dispatch({ type: 'view', position: step })} className={`${frame} cursor-pointer hover:ring-[#354CE1]/60 ${focusRing}`} data-testid={`guided-step-view-${step}`}>
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

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-7">
            <div className="space-y-1">
              <h2 id="guided-step-title" tabIndex={-1} className="type-section-title-compact text-[#0F1E36] focus:outline-none">
                {fill(copy.stepNumber, { number: viewingIndex })}
                {': '}
                {stepCopy.title}
              </h2>
              <p className="type-body text-slate-700">{stepCopy.summary}</p>
            </div>
            <section className="rounded-3xl bg-[#E2E6FF] p-5 sm:p-6" aria-labelledby="guided-instructions-title" data-testid="guided-instructions">
              <h3 id="guided-instructions-title" className="type-card-title-sm text-[#0F1E36]">{copy.instructionsTitle}</h3>
              <ol className="type-body mt-3 list-decimal space-y-2 pl-5 text-slate-800">
                {stepCopy.instructions.map((line) => <li key={line}>{line}</li>)}
              </ol>
            </section>
            <IdentraErrorBoundary>{organisationSide}</IdentraErrorBoundary>
          </div>

          <aside ref={walletRef} id="demo-wallet" aria-label={copy.walletSide} className="scroll-mt-24 lg:sticky lg:top-24 lg:col-span-5">
            <IdentraErrorBoundary>
              <DemoWalletPanel locale={locale} inbox={inbox} generation={generation} onEvent={onWalletEvent} />
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
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={viewToPath('security', language)} className="type-control inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-[#0F1E36] transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" data-testid="guided-end-security">
                {copy.endSecurity}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link to={demoScenarioPath('product-journey', language)} className="type-control inline-flex min-h-11 items-center gap-2 rounded-full border border-white/40 px-5 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" data-testid="guided-end-product">
                {copy.endProductDemo}
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

      {!walletInView && (
        <div className="fixed inset-x-4 bottom-4 z-30 lg:hidden">
          <button
            type="button"
            onClick={() => walletRef.current?.scrollIntoView({ behavior: scrollBehavior(), block: 'start' })}
            className={`type-control flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full px-5 text-white shadow-lg ${walletWaiting ? 'bg-[#354CE1]' : 'bg-[#0F1E36]'} ${focusRing}`}
            data-testid="guided-open-wallet"
          >
            <Wallet aria-hidden="true" className="h-4 w-4" />
            {walletWaiting ? copy.walletHasSomething : copy.openWallet}
          </button>
        </div>
      )}
    </div>
  );
}

