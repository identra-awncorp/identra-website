/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
  type FormEvent,
} from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, CheckCircle2, Clock, Eye, EyeOff, Info, Loader2, LogOut, RefreshCw, Wallet } from 'lucide-react';
import { serverClockOffset } from '@identra/sdk-client';
import { useLanguage } from '../context/LanguageContext';
import { useIsTouchDevice } from '../hooks/useModalLayer';
import { useNow } from '../hooks/useNow';
import {
  focusById,
  isDialogOpen,
  portalClientFor,
  useSecondsUntilLocal,
  useStatusChange,
  useStudentOffer,
} from '../hooks/useSchoolPortal';
import {
  PortalApiError,
  type CredentialStatus,
  type IssuedCredential,
  type PortalSession,
  type StudentProfile,
} from '../identra/schoolPortalClient';
import {
  actionsFor,
  authReducer,
  countByStatus,
  CREDENTIALS_LOADING,
  credentialsReducer,
  loadProblemFor,
  schoolCopyFor,
  SIGNED_OUT,
  signInAtSchool,
  signInProblemFor,
  STATUS_FOR_ACTION,
  type AuthState,
  type LoadProblem,
  type StatusAction,
} from '../identra/schoolPortalState';
import { CERTNET_CONFIG, SAMPLE_CERTNET_ISSUER, SAMPLE_ISSUER } from '../identra/config';
import { guidedRunSearch } from '../identra/guidedDiplomaDemo';
import { formatCountdown, secondsUntil } from '../identra/verifierSession';
import {
  SCHOOL_PORTAL_PAGE_TRANSLATIONS,
  SCHOOL_PORTAL_SAMPLE_ACCOUNTS,
  SCHOOL_PORTAL_SAMPLE_PASSWORD,
  type SchoolPortalPageCopy,
} from '../translations/SchoolPortalPageTranslations';
import { demoScenarioPath, resolveViewLocale } from '../types/routes';
import { fillNodes } from '../utils/fillTemplate';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import ConfirmDialog from './SchoolPortalConfirmDialog';
import UniversityCrest from './UniversityCrest';
import IdentraErrorBoundary from './IdentraErrorBoundary';
import IdentraQrCode from './IdentraQrCode';
import IdentraWalletLink from './IdentraWalletLink';

// Memory only (never Web Storage): survives a language switch inside the app, not a reload.
let rememberedSession: { session: PortalSession; clockOffsetMs: number } | null = null;

const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ''));

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1] focus-visible:ring-offset-2';
const primaryButton = `type-control inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#354CE1] px-5 text-white transition-colors hover:bg-[#2539BE] disabled:cursor-not-allowed disabled:bg-[#354CE1]/60 aria-disabled:cursor-not-allowed aria-disabled:bg-[#354CE1]/60 ${focusRing}`;
const secondaryButton = `type-control inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 aria-disabled:cursor-not-allowed aria-disabled:opacity-60 ${focusRing}`;
const panel = 'rounded-3xl border border-slate-200 bg-white p-5 sm:p-6';
const apiText = 'break-words [overflow-wrap:anywhere]';

const STATUS_PILL: Record<CredentialStatus, string> = {
  valid: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  suspended: 'bg-amber-50 text-amber-900 border-amber-200',
  revoked: 'bg-rose-50 text-rose-800 border-rose-200',
};


function StatusPill({ status, copy }: { status: CredentialStatus; copy: SchoolPortalPageCopy }) {
  return (
    <span className={`type-body-sm inline-flex flex-none items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 font-semibold ${STATUS_PILL[status]}`}>
      {copy.statusLabels[status]}
    </span>
  );
}

const useDateFormat = (locale: 'en' | 'vi') => {
  const tag = locale === 'vi' ? 'vi-VN' : 'en-GB';
  return {
    date: (iso: string) => new Intl.DateTimeFormat(tag, { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(iso)),
    // Calendar dates without a time (a birth date) are read as UTC so no time zone shifts the day.
    calendarDate: (isoDate: string) => new Intl.DateTimeFormat(tag, { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' })
      .format(new Date(`${isoDate.slice(0, 10)}T00:00:00Z`)),
    time: (instant: string | number) => new Intl.DateTimeFormat(tag, { hour: '2-digit', minute: '2-digit' }).format(new Date(instant)),
  };
};

function ServerCountdown({ expiresAt, offsetMs, template }: { expiresAt: string; offsetMs: number; template: string }) {
  const now = useNow();
  return <span className="tabular-nums">{fill(template, { time: formatCountdown(secondsUntil(expiresAt, now + offsetMs)) })}</span>;
}

/** The Identra app is not published yet: say so wherever the portal asks for it, and offer the web trial wallet. */
function NoAppNote({ copy, trialWalletPath }: { copy: SchoolPortalPageCopy; trialWalletPath: string }) {
  return (
    <div className="rounded-2xl bg-white/70 px-4 py-3" data-testid="portal-no-app">
      <p className="type-body font-semibold text-[#0F1E36]">{copy.noAppTitle}</p>
      <p className="type-body-sm mt-0.5 text-slate-700">{copy.noAppBody}</p>
      <Link to={trialWalletPath} data-testid="portal-trial-wallet" className={`type-control mt-1 inline-flex min-h-11 items-center text-[#2539BE] underline underline-offset-2 hover:no-underline ${focusRing}`}>
        {copy.noAppAction}
      </Link>
    </div>
  );
}

// ---- Sign-in ------------------------------------------------------------------------------------

export function SignInView({
  state,
  onSubmit,
  copy,
  employerDemoPath,
  trialWalletPath,
}: {
  state: Extract<AuthState, { status: 'signedOut' }>;
  onSubmit: (username: string, password: string) => void;
  copy: SchoolPortalPageCopy;
  employerDemoPath: string;
  trialWalletPath: string;
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const waitSeconds = useSecondsUntilLocal(state.retryAt);

  // Focus what changed: the problem after a failed attempt, the heading after a sign-out or expiry.
  const { problem: problemKey, notice } = state;
  useEffect(() => {
    if (problemKey) focusById('school-portal-problem');
  }, [problemKey]);
  useEffect(() => {
    if (notice) focusById('school-portal-title');
  }, [notice]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (waitSeconds > 0 || state.submitting) return;
    if (!username.trim() || !password) {
      (username.trim() ? passwordRef : usernameRef).current?.focus();
      return;
    }
    onSubmit(username.trim(), password);
  };

  const problem = state.problem
    ? state.problem === 'rate_limited' && waitSeconds > 0
      ? `${copy.signInProblems.rate_limited} ${fill(copy.retryAfter, { seconds: waitSeconds })}`
      : fill(copy.signInProblems[state.problem], { school: copy.certnetUniversityName })
    : null;
  const inputClass = 'type-lead h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-slate-900 focus:border-[#354CE1] focus:outline-none focus:ring-2 focus:ring-[#354CE1]/25';

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
      <section className={panel} aria-labelledby="school-portal-title">
        <h1 id="school-portal-title" tabIndex={-1} className="type-featured-title text-[#0F1E36] focus:outline-none">{copy.signInTitle}</h1>
        <p className="type-body mt-2 max-w-prose text-slate-700">{copy.signInIntro}</p>

        {state.notice && (
          <p role="status" className="type-body mt-5 rounded-2xl bg-slate-100 px-4 py-3 text-slate-800">
            {state.notice === 'session_expired' ? copy.sessionExpiredNotice : copy.signedOutNotice}
          </p>
        )}

        <form className="mt-6 max-w-md space-y-4" onSubmit={submit} noValidate data-testid="portal-signin-form">
          <div className="space-y-2">
            <label htmlFor="school-portal-username" className="type-body block font-medium text-slate-800">{copy.usernameLabel}</label>
            <input
              ref={usernameRef}
              id="school-portal-username"
              name="username"
              autoComplete="username"
              autoCapitalize="none"
              spellCheck={false}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              data-testid="portal-signin-username"
              aria-invalid={state.problem === 'invalid_credentials'}
              aria-describedby={problem ? 'school-portal-problem' : undefined}
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="school-portal-password" className="type-body block font-medium text-slate-800">{copy.passwordLabel}</label>
            <div className="relative">
              <input
                ref={passwordRef}
                id="school-portal-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                data-testid="portal-signin-password"
                aria-invalid={state.problem === 'invalid_credentials'}
                aria-describedby={problem ? 'school-portal-problem' : undefined}
                className={`${inputClass} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? copy.hidePassword : copy.showPassword}
                aria-pressed={showPassword}
                title={showPassword ? copy.hidePassword : copy.showPassword}
                className={`absolute right-0 top-0 flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 ${focusRing}`}
              >
                {showPassword ? <EyeOff aria-hidden="true" className="h-4 w-4" /> : <Eye aria-hidden="true" className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {problem && (
            <p id="school-portal-problem" role="alert" tabIndex={-1} data-testid="portal-signin-problem" className="type-body flex items-start gap-2 rounded-2xl bg-rose-50 px-4 py-3 text-rose-800 focus:outline-none">
              <AlertTriangle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{problem}</span>
            </p>
          )}

          <button type="submit" disabled={state.submitting || waitSeconds > 0} className={primaryButton} data-testid="portal-signin-submit">
            {state.submitting && <Loader2 aria-hidden="true" className="h-4 w-4 motion-safe:animate-spin" />}
            {state.submitting ? copy.signingIn : copy.signIn}
          </button>
        </form>
      </section>

      <div className="space-y-6">
        <section className={panel} aria-labelledby="school-portal-samples">
          <h2 id="school-portal-samples" className="type-card-title text-[#0F1E36]">{copy.sampleAccountsTitle}</h2>
          <p className="type-body mt-1 text-slate-600">{copy.sampleAccountsIntro}</p>
          <p className="type-body-sm mt-2 flex items-start gap-2 rounded-xl bg-slate-50 px-3 py-2 text-slate-700" data-testid="portal-shared-note">
            <Info aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500" />
            <span>{copy.sharedAccountsNote}</span>
          </p>
          <ul className="mt-3 divide-y divide-slate-100">
            {SCHOOL_PORTAL_SAMPLE_ACCOUNTS.map((account) => (
              <li key={account} className="flex items-center justify-between gap-3 py-2">
                <div className="min-w-0">
                  <p className="font-mono text-sm text-slate-900">{account}</p>
                  <p className="type-body-sm text-slate-600">{copy.roleStudent}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setUsername(account);
                    setPassword(SCHOOL_PORTAL_SAMPLE_PASSWORD);
                    passwordRef.current?.focus();
                  }}
                  aria-label={fill(copy.useAccountLabel, { username: account })}
                  data-testid={`portal-sample-account-${account}`}
                  className={`${secondaryButton} px-4`}
                >
                  {copy.useAccount}
                </button>
              </li>
            ))}
          </ul>
          <p className="type-body mt-3 text-slate-700">
            {copy.samplePasswordLabel}{' '}
            <span className="font-mono">{SCHOOL_PORTAL_SAMPLE_PASSWORD}</span>
          </p>
          <p className="type-body-sm mt-3 border-t border-slate-100 pt-3 text-slate-600">{copy.presenterNote}</p>
        </section>

        <section className="rounded-3xl bg-[#E2E6FF] p-5 sm:p-6" aria-labelledby="school-portal-how">
          <h2 id="school-portal-how" className="type-card-title text-[#0F1E36]">{copy.howTitle}</h2>
          <ol className="type-body mt-3 list-decimal space-y-2 pl-5 text-slate-800">
            {copy.howSteps.map((step) => <li key={step}>{step}</li>)}
          </ol>
          <Link to={employerDemoPath} className={`type-control mt-3 inline-flex min-h-11 items-center text-[#2539BE] underline-offset-2 hover:underline ${focusRing}`}>
            {copy.tryEmployerDemo}
          </Link>
          <div className="mt-3"><NoAppNote copy={copy} trialWalletPath={trialWalletPath} /></div>
        </section>
      </div>
    </div>
  );
}

// ---- Lists ----------------------------------------------------------------------------------------

const useCredentialList = ({ token, issuer }: Pick<PortalSession, 'token' | 'issuer'>, onSessionExpired: () => void) => {
  const portalClient = portalClientFor(issuer);
  const [state, dispatch] = useReducer(credentialsReducer, CREDENTIALS_LOADING);
  const controllerRef = useRef<AbortController | null>(null);

  /** `cursor` null: (re)load from the first page; otherwise append the page after it. */
  const loadPage = useCallback(async (cursor: string | null) => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    dispatch(cursor === null ? { type: 'load' } : { type: 'loadMore' });
    try {
      const page = await portalClient.listCredentials(token, { signal: controller.signal, ...(cursor !== null && { cursor }) });
      if (controller.signal.aborted) return;
      dispatch(cursor === null
        ? { type: 'loaded', items: page.items, nextCursor: page.nextCursor, at: Date.now() }
        : { type: 'moreLoaded', items: page.items, nextCursor: page.nextCursor });
    } catch (error) {
      if (controller.signal.aborted) return;
      if (error instanceof PortalApiError && error.kind === 'session_expired') {
        onSessionExpired();
        return;
      }
      const problem = error instanceof PortalApiError ? loadProblemFor(error) : 'unavailable';
      dispatch(cursor === null ? { type: 'loadFailed', problem } : { type: 'moreFailed', problem });
    }
  }, [onSessionExpired, portalClient, token]);

  const load = useCallback(() => loadPage(null), [loadPage]);

  useEffect(() => {
    void load();
    return () => controllerRef.current?.abort();
  }, [load]);

  return { state, dispatch, load, loadPage };
};

function LoadProblemNotice({ problem, onRetry, copy }: { problem: LoadProblem; onRetry: () => void; copy: SchoolPortalPageCopy }) {
  return (
    <div role="alert" className="type-body flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-rose-50 px-4 py-2 text-rose-800">
      <span className="flex items-center gap-2">
        <AlertTriangle aria-hidden="true" className="h-4 w-4 shrink-0" />
        {copy.loadProblems[problem]}
      </span>
      <button type="button" onClick={onRetry} className={`type-control min-h-11 cursor-pointer text-rose-900 underline-offset-2 hover:underline ${focusRing}`}>
        {copy.retry}
      </button>
    </div>
  );
}

function RefreshButton({ onClick, busy, copy }: { onClick: () => void; busy: boolean; copy: SchoolPortalPageCopy }) {
  return (
    <button type="button" onClick={onClick} disabled={busy} className={secondaryButton}>
      <RefreshCw aria-hidden="true" className={`h-4 w-4 ${busy ? 'motion-safe:animate-spin' : ''}`} />
      {copy.refresh}
    </button>
  );
}

/** "Show more" under a list that has another page, with its own loading and failure. */
function LoadMore({
  state,
  onLoadMore,
  copy,
}: {
  state: ReturnType<typeof useCredentialList>['state'];
  onLoadMore: (cursor: string) => void;
  copy: SchoolPortalPageCopy;
}) {
  if (state.phase !== 'ready' || state.nextCursor === null) return null;
  const cursor = state.nextCursor;
  if (state.more !== 'idle' && state.more !== 'loading') {
    return <div className="mt-4"><LoadProblemNotice problem={state.more} onRetry={() => onLoadMore(cursor)} copy={copy} /></div>;
  }
  const busy = state.more === 'loading';
  return (
    <div className="mt-4 flex justify-center">
      <button type="button" onClick={() => onLoadMore(cursor)} disabled={busy} className={secondaryButton} data-testid="portal-load-more">
        {busy && <Loader2 aria-hidden="true" className="h-4 w-4 motion-safe:animate-spin" />}
        {busy ? copy.loading : copy.loadMore}
      </button>
    </div>
  );
}

// ---- Student --------------------------------------------------------------------------------------

function StudentView({
  session,
  copy,
  locale,
  onSessionExpired,
  employerDemoPath,
  trialWalletPath,
}: {
  session: Extract<PortalSession, { role: 'student' }>;
  copy: SchoolPortalPageCopy;
  locale: 'en' | 'vi';
  onSessionExpired: () => void;
  employerDemoPath: string;
  trialWalletPath: string;
}) {
  const format = useDateFormat(locale);
  const { offer, dispatchOffer, createOffer } = useStudentOffer(session, onSessionExpired);
  const credentials = useCredentialList(session, onSessionExpired);
  const { load: reloadCredentials, dispatch: dispatchCredentials } = credentials;
  const isTouch = useIsTouchDevice();
  const retrySeconds = useSecondsUntilLocal(offer.phase === 'error' ? offer.retryAt : null);

  const revoke = useStatusChange<IssuedCredential>({
    idOf: (item) => item.id,
    perform: (item, signal) => portalClientFor(session.issuer).revokeCredential(session.token, item.id, signal),
    onApplied: (id, status) => {
      dispatchCredentials({ type: 'statusChanged', id, status });
      if (status === 'revoked') dispatchOffer({ type: 'dismissIssued' });
    },
    onSessionExpired,
    doneFocusId: 'school-portal-announcement',
  });

  useEffect(() => {
    focusById('school-portal-title');
  }, []);

  // The new diploma appears in the list by itself, with its revoke action.
  const isIssued = offer.phase === 'issued';
  useEffect(() => {
    if (isIssued) void reloadCredentials();
  }, [isIssued, reloadCredentials]);

  const profile: StudentProfile = session.profile;
  const recordRows: Array<[keyof StudentProfile, string]> = [
    ['hoTen', profile.hoTen],
    ['ngaySinh', format.calendarDate(profile.ngaySinh)],
    ['maSinhVien', profile.maSinhVien],
    ['nganh', profile.nganh],
    ['hangTotNghiep', profile.hangTotNghiep],
    ['namTotNghiep', profile.namTotNghiep],
    ['soHieuBang', profile.soHieuBang],
  ];

  const offerLiveText = offer.phase === 'creating'
    ? copy.creatingOffer
    : offer.phase === 'active'
      ? offer.reconnecting ? copy.reconnecting : copy.waitingForWallet
      : offer.phase === 'issued'
        ? copy.issuedTitle
        : offer.phase === 'expired'
          ? copy.expiredTitle
          : offer.phase === 'error'
            ? copy.offerProblems[offer.problem]
            : '';

  const credentialItems = credentials.state.items;
  const holdsDiploma = (credentialItems?.length ?? 0) > 0;
  const issuedAt = (iso: string) => fill(copy.issuedAtTime, { time: format.time(iso), date: format.date(iso) });

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 id="school-portal-title" tabIndex={-1} className="type-featured-title text-[#0F1E36] focus:outline-none">{copy.studentTitle}</h1>
        <p className="type-body max-w-prose text-slate-700">{copy.studentIntro}</p>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <section className={`${panel} lg:col-span-5`} aria-labelledby="school-portal-record">
          <h2 id="school-portal-record" className="type-card-title text-[#0F1E36]">{copy.recordTitle}</h2>
          <dl className="mt-2 divide-y divide-slate-100">
            {recordRows.map(([key, value]) => (
              <div key={key} className="flex items-baseline justify-between gap-4 py-2.5">
                <dt className="type-body shrink-0 text-slate-600">{copy.recordFields[key]}</dt>
                <dd className={`type-body min-w-0 text-right font-semibold text-slate-900 ${apiText} ${key === 'maSinhVien' || key === 'soHieuBang' ? 'font-mono' : ''}`}>
                  <bdi>{value}</bdi>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="order-first space-y-6 lg:order-none lg:col-span-7">
          <section className={panel} aria-labelledby="school-portal-wallet">
            <div className="flex items-start gap-3">
              <Wallet aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#354CE1]" />
              <div className="min-w-0">
                <h2 id="school-portal-wallet" className="type-card-title text-[#0F1E36]">{copy.walletTitle}</h2>
                <p className="type-body mt-1 text-slate-700">{copy.walletIntro}</p>
              </div>
            </div>

            <p role="status" aria-live="polite" className="sr-only" data-testid="portal-offer-status">{offerLiveText}</p>

            <div className="mt-5">
              {offer.phase === 'idle' && (
                <div className="space-y-3">
                  <button type="button" onClick={() => void createOffer()} className={primaryButton} data-testid="portal-receive">
                    {holdsDiploma ? copy.reissue : copy.receive}
                  </button>
                  {holdsDiploma && <p className="type-body max-w-prose text-slate-600">{copy.reissueHint}</p>}
                  <div className="rounded-2xl bg-[#E2E6FF]"><NoAppNote copy={copy} trialWalletPath={trialWalletPath} /></div>
                </div>
              )}

              {offer.phase === 'creating' && (
                <p className="type-body flex min-h-11 items-center gap-2 text-slate-700">
                  <Loader2 aria-hidden="true" className="h-4 w-4 text-[#354CE1] motion-safe:animate-spin" />
                  {copy.creatingOffer}
                </p>
              )}

              {offer.phase === 'active' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-[auto_minmax(0,1fr)]">
                    <div className={`mx-auto w-full max-w-60 sm:mx-0 ${isTouch ? 'order-2 sm:order-none' : ''}`} data-testid="portal-offer-qr">
                      <IdentraQrCode
                        value={offer.offer.offerUri}
                        label={copy.offerQrLabel}
                        className="h-auto w-full rounded-2xl border border-slate-200"
                        fallback={<p role="note" className="type-body rounded-2xl bg-amber-50 p-4 text-amber-950">{copy.qrUnavailable}</p>}
                      />
                    </div>
                    <div className={`min-w-0 space-y-4 ${isTouch ? 'order-1 sm:order-none' : ''}`}>
                      <div>
                        <p className="type-body text-slate-600">{copy.pinLabel}</p>
                        <p className="type-metric tabular-nums text-[#0F1E36]" aria-label={offer.offer.txCode.split('').join(' ')} data-testid="portal-offer-pin">
                          {`${offer.offer.txCode.slice(0, 3)} ${offer.offer.txCode.slice(3)}`}
                        </p>
                        <p className="type-body mt-1 text-slate-600">{copy.pinHelp}</p>
                      </div>
                      <p className="type-body flex items-center gap-2 text-slate-700" data-testid="portal-offer-countdown">
                        <Clock aria-hidden="true" className="h-4 w-4 text-slate-500" />
                        <ServerCountdown expiresAt={offer.offer.expiresAt} offsetMs={offer.clockOffsetMs} template={copy.expiresIn} />
                      </p>
                      <p className={`type-body flex items-start gap-2 rounded-2xl px-4 py-3 font-medium ${offer.reconnecting ? 'bg-amber-50 text-amber-900' : 'bg-slate-50 text-slate-800'}`}>
                        {offer.reconnecting
                          ? <AlertTriangle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                          : <span aria-hidden="true" className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#354CE1] motion-safe:animate-pulse" />}
                        {offer.reconnecting ? copy.reconnecting : copy.waitingForWallet}
                      </p>
                      <div data-testid="portal-offer-link">
                        <IdentraWalletLink
                          href={offer.offer.offerUri}
                          openLabel={copy.openInWallet}
                          linkLabel={copy.linkLabel}
                          copyLabel={copy.copyLink}
                          copiedLabel={copy.linkCopied}
                          emphasizeOpen={isTouch}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="type-card-title-sm text-slate-900">{copy.firstTimeTitle}</h3>
                    <ol className="type-body mt-2 list-decimal space-y-1.5 pl-5 text-slate-700">
                      {copy.firstTimeSteps.map((step) => <li key={step}>{step}</li>)}
                    </ol>
                    <div className="mt-3 rounded-2xl bg-[#E2E6FF]"><NoAppNote copy={copy} trialWalletPath={trialWalletPath} /></div>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-slate-100 pt-4">
                    <button type="button" onClick={() => void createOffer()} className={secondaryButton} data-testid="portal-offer-new">
                      <RefreshCw aria-hidden="true" className="h-4 w-4" />
                      {copy.anotherCode}
                    </button>
                    <p className="type-body-sm text-slate-600">{copy.anotherCodeHint}</p>
                  </div>
                </div>
              )}

              {offer.phase === 'issued' && (
                <div className="space-y-4" data-testid="portal-offer-issued">
                  <p className="type-card-title flex items-center gap-2 text-emerald-800">
                    <CheckCircle2 aria-hidden="true" className="h-5 w-5" />
                    {copy.issuedTitle}
                  </p>
                  <p className="type-body text-slate-700">{copy.issuedBody}</p>
                  <div className="flex flex-wrap gap-3">
                    <Link to={employerDemoPath} className={primaryButton}>{copy.tryEmployerDemo}</Link>
                    <button type="button" onClick={() => void createOffer()} className={secondaryButton} data-testid="portal-receive">{copy.reissue}</button>
                  </div>
                  <p className="type-body max-w-prose text-slate-600">{copy.reissueHint}</p>
                </div>
              )}

              {(offer.phase === 'expired' || offer.phase === 'error') && (
                <div className="space-y-4" data-testid={offer.phase === 'error' ? 'portal-offer-problem' : 'portal-offer-expired'} data-problem={offer.phase === 'error' ? offer.problem : undefined}>
                  <div className="flex items-start gap-3">
                    {offer.phase === 'expired'
                      ? <Clock aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-slate-600" />
                      : <AlertTriangle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />}
                    <div className="min-w-0">
                      <p className="type-card-title text-slate-900">
                        {offer.phase === 'expired'
                          ? copy.expiredTitle
                          : offer.problem === 'too_many_offers' ? copy.offerLimitTitle : copy.offerProblems[offer.problem]}
                      </p>
                      {offer.phase === 'expired' && <p className="type-body mt-1 text-slate-700">{copy.expiredBody}</p>}
                      {offer.phase === 'error' && offer.problem === 'too_many_offers' && (
                        <p className="type-body mt-1 text-slate-700">{copy.offerProblems.too_many_offers}</p>
                      )}
                      {retrySeconds > 0 && (
                        <p className="type-body mt-1 tabular-nums text-slate-700">{fill(copy.retryIn, { time: formatCountdown(retrySeconds) })}</p>
                      )}
                    </div>
                  </div>
                  <button type="button" onClick={() => void createOffer()} disabled={retrySeconds > 0} className={primaryButton} data-testid="portal-offer-retry">
                    <RefreshCw aria-hidden="true" className="h-4 w-4" />
                    {offer.phase === 'expired' ? copy.newOffer : copy.retry}
                  </button>
                </div>
              )}
            </div>
          </section>

          <section className={panel} aria-labelledby="school-portal-mine" aria-busy={credentials.state.phase === 'loading'}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 id="school-portal-mine" tabIndex={-1} className="type-card-title text-[#0F1E36] focus:outline-none">{copy.myDiplomasTitle}</h2>
                <p className="type-body-sm mt-0.5 text-slate-600">{copy.myDiplomasNote}</p>
              </div>
              <RefreshButton onClick={() => void reloadCredentials()} busy={credentials.state.phase === 'loading'} copy={copy} />
            </div>
            <p
              id="school-portal-announcement"
              role="status"
              aria-live="polite"
              tabIndex={-1}
              className={revoke.state.phase === 'done' ? 'type-body mt-3 rounded-2xl bg-slate-100 px-4 py-3 text-slate-800 focus:outline-none' : 'sr-only'}
            >
              {revoke.state.phase === 'done' ? fill(copy.revokedAnnouncement, { time: format.time(revoke.state.target.issuedAt) }) : ''}
            </p>
            <div className="mt-3 space-y-3">
              {credentials.state.phase === 'error' && (
                <LoadProblemNotice problem={credentials.state.problem} onRetry={() => void reloadCredentials()} copy={copy} />
              )}
              {credentialItems === null && credentials.state.phase === 'loading' && (
                <div className="space-y-2" aria-hidden="true">
                  <div className="h-5 w-2/3 rounded bg-slate-100" />
                  <div className="h-5 w-1/2 rounded bg-slate-100" />
                </div>
              )}
              {credentialItems?.length === 0 && <p className="type-body text-slate-600">{copy.myDiplomasEmpty}</p>}
              {credentialItems && credentialItems.length > 0 && (
                <ul className="divide-y divide-slate-100" data-testid="portal-diplomas">
                  {credentialItems.map((item) => (
                    <li key={item.id} className="space-y-1 py-3" data-testid="portal-diploma-row" data-credential-id={item.id} data-status={item.status}>
                      <div className="flex items-center justify-between gap-3">
                        <span className="type-body tabular-nums text-slate-800">{issuedAt(item.issuedAt)}</span>
                        <span data-testid="portal-diploma-status"><StatusPill status={item.status} copy={copy} /></span>
                      </div>
                      {item.canRevoke && (
                        <button
                          type="button"
                          onClick={(event) => revoke.open(item, event.currentTarget)}
                          data-testid="portal-revoke"
                          className={`type-control -ml-3 inline-flex min-h-11 cursor-pointer items-center rounded-full px-3 text-rose-700 transition-colors hover:bg-rose-50 ${focusRing}`}
                        >
                          {copy.revokeAction}
                        </button>
                      )}
                      {item.status === 'revoked' && (
                        <p className="type-body-sm text-slate-600" data-testid="portal-revoked-hint">
                          {copy.revokedHint}{' '}
                          <Link
                            to={employerDemoPath}
                            data-testid="portal-revoked-try"
                            className={`type-control inline-flex min-h-11 items-center text-[#2539BE] underline underline-offset-2 hover:no-underline ${focusRing}`}
                          >
                            {copy.revokedTry}
                          </Link>
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              <LoadMore state={credentials.state} onLoadMore={(cursor) => void credentials.loadPage(cursor)} copy={copy} />
            </div>
          </section>
        </div>
      </div>

      {isDialogOpen(revoke.state) && (
        <ConfirmDialog
          title={copy.revokeTitle}
          subtitle={issuedAt(revoke.state.target.issuedAt)}
          body={(
            <ul className="type-body list-disc space-y-1.5 rounded-2xl bg-rose-50 py-3 pl-9 pr-4 text-rose-900">
              {copy.revokePoints.map((point) => <li key={point}>{point}</li>)}
            </ul>
          )}
          confirmLabel={copy.revokeConfirm}
          destructive
          state={revoke.state}
          problemText={revoke.state.phase === 'failed' ? copy.revokeProblems[revoke.state.problem] : null}
          onConfirm={() => void revoke.save()}
          onCancel={revoke.cancel}
          copy={copy}
        />
      )}
    </div>
  );
}

// ---- Registrar ------------------------------------------------------------------------------------

interface PendingChange {
  item: IssuedCredential;
  action: StatusAction;
}

function RegistrarView({
  session,
  copy,
  locale,
  onSessionExpired,
}: {
  session: Extract<PortalSession, { role: 'registrar' }>;
  copy: SchoolPortalPageCopy;
  locale: 'en' | 'vi';
  onSessionExpired: () => void;
}) {
  const format = useDateFormat(locale);
  const { state, dispatch, load, loadPage } = useCredentialList(session, onSessionExpired);
  const change = useStatusChange<PendingChange>({
    idOf: ({ item }) => item.id,
    perform: ({ item, action }, signal) => portalClientFor(session.issuer).changeCredentialStatus(session.token, item.id, STATUS_FOR_ACTION[action], signal),
    onApplied: (id, status) => dispatch({ type: 'statusChanged', id, status }),
    onSessionExpired,
    doneFocusId: 'school-portal-announcement',
  });

  useEffect(() => {
    focusById('school-portal-title');
  }, []);

  const items = state.items;
  const counts = items ? countByStatus(items) : null;
  const done = change.state.phase === 'done' ? change.state : null;

  const rowActions = (item: IssuedCredential) => {
    const actions = actionsFor(item.status, item.canRevoke);
    if (actions.length === 0) return <p className="type-body text-slate-600 md:text-right">{copy.revokedFinal}</p>;
    return (
      <div className="flex flex-wrap gap-2 md:flex-nowrap md:justify-end">
        {actions.map((action) => (
          <button
            key={action}
            type="button"
            onClick={(event) => change.open({ item, action }, event.currentTarget)}
            data-testid={`portal-registrar-${action}`}
            className={`type-control min-h-11 cursor-pointer rounded-full border px-4 transition-colors ${focusRing} ${
              action === 'revoke' ? 'border-rose-200 text-rose-700 hover:bg-rose-50' : 'border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {copy.actionLabels[action]}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0 space-y-1">
          <h1 id="school-portal-title" tabIndex={-1} className="type-featured-title text-[#0F1E36] focus:outline-none">{copy.registrarTitle}</h1>
          <p className="type-body max-w-prose text-slate-700">{copy.registrarIntro}</p>
          <p className="type-body max-w-prose text-slate-600">{copy.timingNote}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {state.phase === 'ready' && (
            <span className="type-body text-slate-600">{fill(copy.updatedAt, { time: format.time(state.loadedAt) })}</span>
          )}
          <RefreshButton onClick={() => void load()} busy={state.phase === 'loading'} copy={copy} />
        </div>
      </div>

      <p
        id="school-portal-announcement"
        role="status"
        aria-live="polite"
        tabIndex={-1}
        className={done ? `type-body rounded-2xl bg-emerald-50 px-4 py-3 text-emerald-900 focus:outline-none ${apiText}` : 'sr-only'}
      >
        {done
          ? fillNodes(copy.statusChanged, { name: <bdi>{done.target.item.studentName}</bdi>, status: copy.statusLabels[done.status] })
          : ''}
      </p>

      <section className={panel} aria-labelledby="school-portal-table-title" aria-busy={state.phase === 'loading'}>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="school-portal-table-title" className="type-card-title text-[#0F1E36]">{copy.universityName}</h2>
          {counts && items && (
            <p className="type-body tabular-nums text-slate-600">
              {state.nextCursor === null ? fill(copy.counts, counts) : fill(copy.countsPartial, { ...counts, total: items.length })}
            </p>
          )}
        </div>

        {state.phase === 'error' && (
          <div className="mt-4"><LoadProblemNotice problem={state.problem} onRetry={() => void load()} copy={copy} /></div>
        )}

        {items === null && state.phase === 'loading' && (
          <div className="mt-4 space-y-3" aria-hidden="true">
            {[0, 1, 2].map((row) => <div key={row} className="h-12 rounded-xl bg-slate-100" />)}
          </div>
        )}

        {items?.length === 0 && (
          <p className="type-body mt-4 rounded-2xl border border-dashed border-slate-300 px-4 py-6 text-slate-600">{copy.registrarEmpty}</p>
        )}

        {items && items.length > 0 && (
          <>
            <table className="type-body mt-4 hidden w-full text-left md:table">
              <thead>
                <tr className="border-b border-slate-200 text-slate-600">
                  <th scope="col" className="py-3 pr-4 font-normal">{copy.columnStudent}</th>
                  <th scope="col" className="px-4 py-3 text-right font-normal">{copy.columnIssued}</th>
                  <th scope="col" className="px-4 py-3 font-normal">{copy.columnStatus}</th>
                  <th scope="col" className="py-3 pl-4 text-right font-normal">{copy.columnActions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item) => (
                  <tr key={item.id} className="align-middle" data-testid="portal-registrar-row" data-credential-id={item.id} data-status={item.status}>
                    <td className="py-3.5 pr-4">
                      <p className={`font-semibold text-slate-900 ${apiText}`}><bdi>{item.studentName}</bdi></p>
                      <p className="font-mono text-xs text-slate-600"><bdi>{item.studentCode}</bdi></p>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-right tabular-nums text-slate-700">{format.date(item.issuedAt)}</td>
                    <td className="px-4 py-3.5"><StatusPill status={item.status} copy={copy} /></td>
                    <td className="w-px whitespace-nowrap py-3.5 pl-4">{rowActions(item)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <ul className="mt-4 divide-y divide-slate-100 md:hidden">
              {items.map((item) => (
                <li key={item.id} className="space-y-3 py-4" data-testid="portal-registrar-row" data-credential-id={item.id} data-status={item.status}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className={`type-body font-semibold text-slate-900 ${apiText}`}><bdi>{item.studentName}</bdi></p>
                      <p className="type-body-sm text-slate-600">
                        <span className="font-mono"><bdi>{item.studentCode}</bdi></span>
                        {' · '}
                        {fill(copy.issuedOn, { date: format.date(item.issuedAt) })}
                      </p>
                    </div>
                    <StatusPill status={item.status} copy={copy} />
                  </div>
                  {rowActions(item)}
                </li>
              ))}
            </ul>
          </>
        )}

        <LoadMore state={state} onLoadMore={(cursor) => void loadPage(cursor)} copy={copy} />
      </section>

      {isDialogOpen(change.state) && (
        <ConfirmDialog
          title={fillNodes(copy.confirmTitle[change.state.target.action], { name: <bdi>{change.state.target.item.studentName}</bdi> })}
          subtitle={<span className="font-mono"><bdi>{change.state.target.item.studentCode}</bdi></span>}
          body={(
            <p className={`type-body ${change.state.target.action === 'revoke' ? 'rounded-2xl bg-rose-50 px-4 py-3 text-rose-900' : 'text-slate-700'}`}>
              {copy.confirmBody[change.state.target.action]}
            </p>
          )}
          confirmLabel={copy.confirmAction[change.state.target.action]}
          destructive={change.state.target.action === 'revoke'}
          state={change.state}
          problemText={change.state.phase === 'failed' ? copy.statusChangeProblems[change.state.problem] : null}
          onConfirm={() => void change.save()}
          onCancel={change.cancel}
          copy={copy}
        />
      )}
    </div>
  );
}

// ---- Page -----------------------------------------------------------------------------------------

export default function SchoolPortalPage() {
  const { language } = useLanguage();
  const locale = resolveViewLocale('school-portal', language) as 'en' | 'vi';
  const format = useDateFormat(locale);
  const [auth, dispatch] = useReducer(
    authReducer,
    rememberedSession ? { status: 'signedIn', ...rememberedSession } : SIGNED_OUT,
  );
  const signInController = useRef<AbortController | null>(null);
  // The school of the signed-in account (its own portal, its own name); before sign-in, the first school.
  const issuer = auth.status === 'signedIn' ? auth.session.issuer : SAMPLE_ISSUER;
  const copy = schoolCopyFor(getLocalizedRecord(SCHOOL_PORTAL_PAGE_TRANSLATIONS, locale, 'SCHOOL_PORTAL_PAGE_TRANSLATIONS'), issuer);
  const employerDemoPath = demoScenarioPath('apply-job', language);
  // A student of the CertNet school tries the trial wallet with that school's run of the guided demo.
  const trialWalletPath = `${demoScenarioPath('diploma', language)}${issuer === SAMPLE_CERTNET_ISSUER ? guidedRunSearch('certnet') : ''}`;

  useEffect(() => {
    rememberedSession = auth.status === 'signedIn' ? { session: auth.session, clockOffsetMs: auth.clockOffsetMs } : null;
  }, [auth]);

  useEffect(() => () => signInController.current?.abort(), []);

  const onSessionExpired = useCallback(() => dispatch({ type: 'sessionExpired' }), []);

  // The session ends on the server's clock, whatever the device clock says.
  const sessionExpiresAt = auth.status === 'signedIn' ? auth.session.expiresAt : null;
  const sessionOffset = auth.status === 'signedIn' ? auth.clockOffsetMs : 0;
  useEffect(() => {
    if (!sessionExpiresAt) return undefined;
    const delay = Math.max(0, Date.parse(sessionExpiresAt) - (Date.now() + sessionOffset));
    const timer = window.setTimeout(onSessionExpired, delay);
    return () => window.clearTimeout(timer);
  }, [onSessionExpired, sessionExpiresAt, sessionOffset]);

  const signIn = async (username: string, password: string) => {
    signInController.current?.abort();
    const controller = new AbortController();
    signInController.current = controller;
    dispatch({ type: 'submit' });
    try {
      const session = await signInAtSchool(portalClientFor, username, password, CERTNET_CONFIG !== null, controller.signal);
      if (controller.signal.aborted) return;
      if (session === null) dispatch({ type: 'signInFailed', problem: 'school_not_here' });
      else dispatch({ type: 'signedIn', session, clockOffsetMs: serverClockOffset(session.serverTime, Date.now()) });
    } catch (error) {
      if (controller.signal.aborted) return;
      if (error instanceof PortalApiError) {
        const retryAfter = error.retryAfterSeconds;
        dispatch({
          type: 'signInFailed',
          problem: signInProblemFor(error),
          ...(retryAfter !== undefined && { retryAt: Date.now() + retryAfter * 1000 }),
        });
      } else {
        dispatch({ type: 'signInFailed', problem: 'unavailable' });
      }
    }
  };

  // The local time at which the session ends, for display in the device's own time.
  const sessionEndsLocal = auth.status === 'signedIn' ? Date.parse(auth.session.expiresAt) - auth.clockOffsetMs : null;

  return (
    <div className="bg-[#FAFBFD] pb-12 sm:pb-20">
      <div className="mx-auto max-w-7xl space-y-6 px-6 pt-8 sm:pt-10">
        <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <UniversityCrest label={copy.crestLabel} />
            <div className="min-w-0">
              <p className="type-card-title text-[#0F1E36]">{copy.universityName}</p>
              <p className="type-body text-slate-600">{copy.portalName}</p>
            </div>
          </div>
          {auth.status === 'signedIn' && (
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 sm:justify-end sm:border-0 sm:pt-0">
              <div className="min-w-0 sm:text-right">
                <p className={`type-body font-semibold text-slate-900 ${apiText}`}><bdi>{auth.session.profile.hoTen}</bdi></p>
                {auth.session.role === 'registrar' && (
                  <p className={`type-body-sm text-slate-600 ${apiText}`}><bdi>{auth.session.profile.donVi}</bdi></p>
                )}
                {sessionEndsLocal !== null && (
                  <p className="type-body-sm text-slate-600">{fill(copy.sessionUntil, { time: format.time(sessionEndsLocal) })}</p>
                )}
              </div>
              <button type="button" onClick={() => dispatch({ type: 'signOut' })} className={secondaryButton} data-testid="portal-signout">
                <LogOut aria-hidden="true" className="h-4 w-4" />
                {copy.signOut}
              </button>
            </div>
          )}
        </div>

        <p className="type-body flex items-start gap-3 rounded-2xl bg-slate-100 px-4 py-3 text-slate-800">
          <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />
          <span>{copy.demoNotice} {copy.memoryNotice}</span>
        </p>

        <IdentraErrorBoundary>
          {auth.status === 'signedOut' && (
            <SignInView state={auth} onSubmit={(username, password) => void signIn(username, password)} copy={copy} employerDemoPath={employerDemoPath} trialWalletPath={trialWalletPath} />
          )}
          {auth.status === 'signedIn' && auth.session.role === 'student' && (
            <StudentView
              key={auth.session.token}
              session={auth.session}
              copy={copy}
              locale={locale}
              onSessionExpired={onSessionExpired}
              employerDemoPath={employerDemoPath}
              trialWalletPath={trialWalletPath}
            />
          )}
          {auth.status === 'signedIn' && auth.session.role === 'registrar' && (
            <RegistrarView key={auth.session.token} session={auth.session} copy={copy} locale={locale} onSessionExpired={onSessionExpired} />
          )}
        </IdentraErrorBoundary>
      </div>
    </div>
  );
}
