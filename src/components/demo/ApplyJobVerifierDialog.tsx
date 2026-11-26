/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useReducer, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { AlertTriangle, Check, ChevronDown, Clock, CloudOff, Loader2, Minus, QrCode, RefreshCw, ShieldCheck, Smartphone, X, XCircle } from 'lucide-react';
import { createVerifierClient, type SessionResult } from '@identra/sdk-client';
import { useLanguage } from '../../context/LanguageContext';
import { useInertAppRoot, useIsTouchDevice } from '../../hooks/useModalLayer';
import { useNow } from '../../hooks/useNow';
import { IDENTRA_API_ORIGIN, IDENTRA_API_URL, SAMPLE_VERIFIER, SAMPLE_VERIFIER_ORGANISATION, SAMPLE_VERIFIER_SCENARIO } from '../../identra/config';
import {
  certNetIssuerId,
  firstFailure,
  formatCountdown,
  groupCheckRows,
  INITIAL_VERIFIER_STEP_STATE,
  isCertNetResult,
  isFinalFailure,
  isUncheckedResult,
  isUncheckedRow,
  runVerifierSession,
  secondsUntil,
  shortIssuerId,
  toCheckRows,
  toSharedFields,
  truncateText,
  verifierStepReducer,
  type CheckRow,
  type VerifierProblem,
} from '../../identra/verifierSession';
import {
  APPLY_JOB_VERIFIER_DIALOG_TRANSLATIONS,
  type ApplyJobVerifierDialogCopy,
} from '../../translations/demo/ApplyJobVerifierDialogTranslations';
import { fillNodes } from '../../utils/fillTemplate';
import { getLocalizedRecord } from '../../utils/i18nRuntime';
import IdentraErrorBoundary from '../IdentraErrorBoundary';
import IdentraIssuerId, { IssuerIdText } from '../IdentraIssuerId';
import IdentraOrganisationName from '../IdentraOrganisationName';
import IdentraQrCode from '../IdentraQrCode';
import IdentraWalletLink from '../IdentraWalletLink';

const verifierClient = createVerifierClient({ baseUrl: IDENTRA_API_URL, apiOrigin: IDENTRA_API_ORIGIN });

const fill = (template: string, values: Record<string, string>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? '');


const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1] focus-visible:ring-offset-2';
const primaryButton = `type-control inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#354CE1] px-5 text-white transition-colors hover:bg-[#2539BE] disabled:cursor-not-allowed disabled:bg-[#354CE1]/60 ${focusRing}`;
const secondaryButton = `type-control inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 text-slate-700 transition-colors hover:bg-slate-50 ${focusRing}`;

interface ApplyJobVerifierDialogProps {
  onClose: () => void;
  /** Called only with a result whose every check passed. */
  onUseResult: (result: SessionResult) => void;
  /** Called once per session when the server has answered: true when the diploma was confirmed. */
  onSettled?: (ok: boolean) => void;
  onFillManually: () => void;
  portalHref: string;
  /** The guided demo with the web trial wallet, for visitors without the app. */
  trialWalletHref: string;
}

export function CheckList({ rows, copy, headlineRow }: { rows: CheckRow[]; copy: ApplyJobVerifierDialogCopy; headlineRow: CheckRow | null }) {
  return (
    <ol className="divide-y divide-slate-100">
      {rows.map((row, index) => {
        // CertNet did not answer: "not checked" in amber, never a cross (CERTNET_UNCHECKED_REASONS).
        const unchecked = isUncheckedRow(row);
        return (
          <li key={`${row.labelKey}-${index}`} className="flex items-start gap-3 py-2.5" data-unchecked={unchecked || undefined}>
            <span
              aria-hidden="true"
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                unchecked
                  ? 'bg-amber-100 text-amber-800'
                  : row.outcome === 'passed'
                  ? 'bg-emerald-100 text-emerald-700'
                  : row.outcome === 'failed'
                    ? 'bg-rose-100 text-rose-700'
                    : 'bg-slate-100 text-slate-500'
              }`}
            >
              {unchecked ? <CloudOff className="h-3.5 w-3.5" /> : row.outcome === 'passed' ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : row.outcome === 'failed' ? <X className="h-3.5 w-3.5" strokeWidth={3} /> : <Minus className="h-3.5 w-3.5" />}
            </span>
            <div className="min-w-0 flex-1">
              <p className={`type-body ${row.outcome === 'skipped' ? 'text-slate-600' : 'text-slate-900'}`}>
                {copy.checks[row.labelKey]}
                <span className="sr-only">
                  {': '}
                  {unchecked ? copy.groupNotChecked : row.outcome === 'passed' ? copy.checkPassed : row.outcome === 'failed' ? copy.checkFailed : copy.checkSkipped}
                </span>
              </p>
              {/* The headline already explains the first failure; further failures carry their own reason. */}
              {row.reasonKey && row !== headlineRow && <p className={`type-body ${unchecked ? 'text-amber-900' : 'text-rose-700'}`}>{copy.reasons[row.reasonKey]}</p>}
            </div>
            {row.outcome === 'skipped' && <span aria-hidden="true" className="type-caption shrink-0 text-slate-600">{copy.checkSkipped}</span>}
            {unchecked && <span aria-hidden="true" className="type-caption shrink-0 text-amber-900">{copy.groupNotChecked}</span>}
          </li>
        );
      })}
    </ol>
  );
}

export function ApplyJobVerifierResult({
  result,
  copy,
  language,
  verifierName,
  showFailureHint = true,
}: {
  result: SessionResult;
  copy: ApplyJobVerifierDialogCopy;
  language: string;
  /** The verifier's trust-list name from the session (`verifier.name`). */
  verifierName: string;
  /** The "fill in the form yourself / try later" line under a failure; a page with its own next step hides it. */
  showFailureHint?: boolean;
}) {
  const rows = toCheckRows(result);
  const failure = firstFailure(rows);
  // Failed only because CertNet did not answer: "could not be checked right now", in amber, not "invalid".
  const unchecked = !result.ok && isUncheckedResult(rows);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const fields = result.ok ? toSharedFields(result.claims) : [];
  // The CertNet path (ADR-0020) has no issuer name: a success shows the identifier, never a self-declared name.
  const certnet = isCertNetResult(result);
  const issuerDid = result.ok && certnet ? certNetIssuerId(result.issuerDid) : null;
  const signerLine = result.issuer
    ? fillNodes(copy.groups.signerNamed, { issuer: <IdentraOrganisationName maToChuc={result.issuer.maToChuc} serverName={result.issuer.ten} language={language} /> })
    : issuerDid
      ? fillNodes(copy.groups.signerCertNetNamed, { issuer: <IssuerIdText value={shortIssuerId(issuerDid)} /> })
      : certnet ? copy.groups.signerCertNet : copy.groups.signer;
  const checkedAt = Number.isNaN(Date.parse(result.verifiedAt))
    ? null
    : new Intl.DateTimeFormat(language, { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date(result.verifiedAt));

  return (
    <div className="space-y-5">
      <div className={`flex items-start gap-3 rounded-2xl p-4 ${result.ok ? 'bg-emerald-50 text-emerald-950' : unchecked ? 'bg-amber-50 text-amber-950' : 'bg-rose-50 text-rose-950'}`} data-outcome={unchecked ? 'unchecked' : undefined}>
        {result.ok
          ? <ShieldCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
          : unchecked
            ? <CloudOff aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
            : <XCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-rose-700" />}
        <div className="min-w-0 space-y-1">
          <h3 id="apply-job-verifier-outcome" tabIndex={-1} className="type-card-title focus:outline-none">
            {result.ok ? copy.verifiedTitle : unchecked ? copy.uncheckedTitle : copy.failedTitle}
          </h3>
          <p className="type-body">{result.ok ? copy.verifiedBody : copy.reasons[failure?.reasonKey ?? 'UNKNOWN']}</p>
          {!result.ok && showFailureHint && (
            <p className="type-body">{isFinalFailure(rows) ? copy.failedFinalHint : copy.failedRetryHint}</p>
          )}
        </div>
      </div>

      {fields.length > 0 && (
        <section aria-labelledby="apply-job-verifier-shared" className="space-y-2">
          <h3 id="apply-job-verifier-shared" className="type-card-title-sm text-slate-900">{copy.sharedTitle}</h3>
          <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            {fields.map((field) => (
              <div key={field.rawName} className="min-w-0">
                <dt className="type-body-sm text-slate-600">{field.key ? copy.claims[field.key] : <bdi>{field.rawName}</bdi>}</dt>
                <dd className="type-body font-semibold text-slate-900 [overflow-wrap:anywhere]"><bdi>{field.value}</bdi></dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <dl className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
        {/* An issuer exists only when the diploma passed; a failure never names a (possibly fake) issuer. */}
        {result.issuer && (
          <div className="min-w-0">
            <dt className="type-body-sm text-slate-600">{copy.issuedBy}</dt>
            <dd className="type-body font-medium text-slate-900 [overflow-wrap:anywhere]">
              <IdentraOrganisationName maToChuc={result.issuer.maToChuc} serverName={result.issuer.ten} language={language} />
            </dd>
          </div>
        )}
        {issuerDid && (
          <div className="min-w-0" data-testid="verifier-issuer-certnet">
            <dt className="type-body-sm text-slate-600">{copy.issuedBy}</dt>
            <dd className="type-body font-medium text-slate-900">
              <IdentraIssuerId id={issuerDid} showFullLabel={copy.issuerIdShowFull} hideFullLabel={copy.issuerIdHideFull} />
              <p className="type-body-sm mt-1 font-normal text-slate-600" data-testid="verifier-certnet-note">{copy.issuerIdNote}</p>
            </dd>
          </div>
        )}
        <div className="min-w-0">
          <dt className="type-body-sm text-slate-600">{copy.verifiedBy}</dt>
          <dd className="type-body font-medium text-slate-900">
            <IdentraOrganisationName maToChuc={SAMPLE_VERIFIER_ORGANISATION} serverName={verifierName} language={language} />
          </dd>
        </div>
        {certnet && !issuerDid && <p className="type-body-sm text-slate-600 sm:col-span-2" data-testid="verifier-certnet-note">{copy.certnetNote}</p>}
        {checkedAt && <p className="type-body-sm text-slate-600 sm:col-span-2">{fill(copy.checkedAt, { time: checkedAt })}</p>}
      </dl>

      <section aria-labelledby="apply-job-verifier-groups" className="space-y-2" data-testid="verifier-check-groups">
        <h3 id="apply-job-verifier-groups" className="type-card-title-sm text-slate-900">{copy.groupsTitle}</h3>
        <ul className="space-y-2">
          {groupCheckRows(rows).map((group) => (
            <li key={group.id} className="flex items-start gap-3" data-testid="verifier-check-group" data-group={group.id} data-outcome={group.outcome}>
              <span
                aria-hidden="true"
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                  group.outcome === 'passed' ? 'bg-emerald-100 text-emerald-700' : group.outcome === 'failed' ? 'bg-rose-100 text-rose-700' : group.outcome === 'unchecked' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {group.outcome === 'passed' ? <Check className="h-4 w-4" strokeWidth={3} /> : group.outcome === 'failed' ? <X className="h-4 w-4" strokeWidth={3} /> : group.outcome === 'unchecked' ? <CloudOff className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
              </span>
              <p className={`type-body min-w-0 ${group.outcome === 'failed' ? 'font-semibold text-rose-900' : 'text-slate-900'} [overflow-wrap:anywhere]`}>
                {group.id === 'signer' ? signerLine : copy.groups[group.id]}
                <span className="sr-only">
                  {': '}
                  {group.outcome === 'passed' ? copy.checkPassed : group.outcome === 'failed' ? copy.checkFailed : copy.groupNotChecked}
                </span>
                {group.outcome === 'skipped' && <span aria-hidden="true" className="type-caption ml-2 text-slate-600">{copy.groupNotChecked}</span>}
                {group.outcome === 'unchecked' && <span aria-hidden="true" className="type-caption ml-2 text-amber-900">{copy.groupNotChecked}</span>}
              </p>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setDetailsOpen((open) => !open)}
          aria-expanded={detailsOpen}
          aria-controls="apply-job-verifier-checks-list"
          data-testid="verifier-checks-toggle"
          className={`type-control inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-[#2539BE] underline-offset-2 hover:underline ${focusRing}`}
        >
          <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform ${detailsOpen ? 'rotate-180' : ''}`} />
          {detailsOpen ? copy.hideDetails : fill(copy.showDetails, { count: String(rows.length) })}
        </button>
      </section>

      {detailsOpen && (
        <section id="apply-job-verifier-checks-list" aria-labelledby="apply-job-verifier-checks" className="space-y-1" data-testid="verifier-checks">
          <h3 id="apply-job-verifier-checks" className="type-card-title-sm text-slate-900">{copy.checksTitle}</h3>
          <CheckList rows={rows} copy={copy} headlineRow={failure} />
        </section>
      )}
    </div>
  );
}

function Countdown({ expiresAt, offsetMs, template }: { expiresAt: string; offsetMs: number; template: string }) {
  const now = useNow();
  return <span className="tabular-nums">{fill(template, { time: formatCountdown(secondsUntil(expiresAt, now + offsetMs)) })}</span>;
}

function RetryButton({ retryAt, label, waitTemplate, onRetry }: { retryAt: number | null; label: string; waitTemplate: string; onRetry: () => void }) {
  const now = useNow();
  const wait = retryAt === null ? 0 : Math.max(0, Math.floor((retryAt - now) / 1000));
  return (
    <div className="space-y-2">
      {wait > 0 && <p className="type-body text-slate-700">{fill(waitTemplate, { seconds: String(wait) })}</p>}
      <button type="button" onClick={onRetry} disabled={wait > 0} className={primaryButton}>
        <RefreshCw aria-hidden="true" className="h-4 w-4" />
        {label}
      </button>
    </div>
  );
}

export default function ApplyJobVerifierDialog({ onClose, onUseResult, onSettled, onFillManually, portalHref, trialWalletHref }: ApplyJobVerifierDialogProps) {
  const { language } = useLanguage();
  const copy = getLocalizedRecord(
    APPLY_JOB_VERIFIER_DIALOG_TRANSLATIONS,
    language as keyof typeof APPLY_JOB_VERIFIER_DIALOG_TRANSLATIONS,
    'APPLY_JOB_VERIFIER_DIALOG_TRANSLATIONS',
  );
  const [state, dispatch] = useReducer(verifierStepReducer, INITIAL_VERIFIER_STEP_STATE);
  const controllerRef = useRef<AbortController | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();
  useInertAppRoot(true);

  // A session is created only on an explicit action, never on opening the dialog.
  const start = useCallback(() => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    void runVerifierSession(
      verifierClient,
      { verifier: SAMPLE_VERIFIER, scenario: SAMPLE_VERIFIER_SCENARIO },
      { signal: controller.signal, dispatch },
    );
  }, []);

  // Closing the dialog or leaving the page stops all polling.
  useEffect(() => () => controllerRef.current?.abort(), []);

  const settledSessionId = state.phase === 'verified' || state.phase === 'failed' ? state.sessionId : null;
  const settledOk = state.phase === 'verified';
  useEffect(() => {
    if (settledSessionId) onSettled?.(settledOk);
  }, [onSettled, settledOk, settledSessionId]);

  // Move focus to whatever the user now has to read: the outcome, or the problem.
  const phase = state.phase;
  useEffect(() => {
    const target = phase === 'verified' || phase === 'failed'
      ? 'apply-job-verifier-outcome'
      : phase === 'expired' || phase === 'error'
        ? 'apply-job-verifier-problem'
        : null;
    if (target) document.getElementById(target)?.focus();
  }, [phase]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const trapFocus = (event: ReactKeyboardEvent) => {
    if (event.key !== 'Tab') return;
    const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]') ?? []);
    if (focusable.length === 0) return;
    const first = focusable[0]!;
    const last = focusable[focusable.length - 1]!;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const problemCopy: Record<VerifierProblem, { title: string; body: string }> = {
    network: { title: copy.networkTitle, body: copy.networkBody },
    rate_limited: { title: copy.rateLimitedTitle, body: copy.rateLimitedBody },
    unavailable: { title: copy.unavailableTitle, body: copy.unavailableBody },
    rejected: { title: copy.rejectedTitle, body: copy.rejectedBody },
    unreadable: { title: copy.unreadableTitle, body: copy.unreadableBody },
  };

  const liveStatus = state.phase === 'creating'
    ? copy.creating
    : state.phase === 'waiting'
      ? state.reconnecting ? copy.reconnecting : state.status === 'request_retrieved' ? copy.statusRetrieved : copy.statusPending
      : state.phase === 'verified'
        ? copy.verifiedTitle
        : state.phase === 'failed'
          ? isUncheckedResult(toCheckRows(state.result)) ? copy.uncheckedTitle : copy.failedTitle
          : state.phase === 'expired'
            ? copy.expiredTitle
            : state.phase === 'error'
              ? problemCopy[state.problem].title
              : '';

  const requested = (
    <div className="space-y-1">
      <p className="type-label text-slate-700">{copy.requestedTitle}</p>
      <p className="type-body text-slate-700">{copy.requestedRequired}</p>
      <p className="type-body text-slate-600">{copy.requestedOptional}</p>
    </div>
  );

  const walletLink = (href: string) => (
    <IdentraWalletLink
      href={href}
      openLabel={copy.openInWallet}
      linkLabel={copy.linkLabel}
      copyLabel={copy.copyLink}
      copiedLabel={copy.linkCopied}
      emphasizeOpen={isTouch}
    />
  );

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 p-0 sm:items-center sm:p-4">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-job-verifier-title"
        aria-describedby="apply-job-verifier-subtitle"
        onKeyDown={trapFocus}
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 space-y-1">
            <h2 id="apply-job-verifier-title" className="type-featured-title text-[#0F1E36]">{copy.title}</h2>
            <p id="apply-job-verifier-subtitle" className="type-body text-slate-600">{copy.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            autoFocus
            aria-label={copy.close}
            title={copy.close}
            className={`flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 ${focusRing}`}
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>

        <p role="status" aria-live="polite" className="sr-only">{liveStatus}</p>

        <div className="mt-6">
          <IdentraErrorBoundary>
            {state.phase === 'idle' && (
              <div className="space-y-5">
                {requested}
                <p className="type-body text-slate-700">{copy.startIntro}</p>
                <button type="button" onClick={start} className={primaryButton}>
                  <QrCode aria-hidden="true" className="h-4 w-4" />
                  {copy.start}
                </button>
              </div>
            )}

            {state.phase === 'creating' && (
              <div className="type-body flex min-h-64 items-center justify-center gap-3 text-slate-600">
                <Loader2 aria-hidden="true" className="h-5 w-5 text-[#354CE1] motion-safe:animate-spin" />
                <span>{copy.creating}</span>
              </div>
            )}

            {state.phase === 'waiting' && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-[auto_minmax(0,1fr)] md:items-start">
                <div className={`mx-auto w-full max-w-72 ${isTouch ? 'order-2 md:order-none' : ''}`}>
                  <IdentraQrCode
                    value={state.qr}
                    label={copy.qrLabel}
                    className="h-auto w-full rounded-2xl border border-slate-200"
                    fallback={<p role="note" className="type-body rounded-2xl bg-amber-50 p-4 text-amber-950">{copy.qrUnavailable}</p>}
                  />
                </div>
                <div className={`min-w-0 space-y-5 ${isTouch ? 'order-1 md:order-none' : ''}`}>
                  <div className={`flex items-start gap-3 rounded-2xl p-4 ${state.reconnecting ? 'bg-amber-50 text-amber-950' : state.status === 'request_retrieved' ? 'bg-[#E2E6FF] text-[#0F1E36]' : 'bg-slate-50 text-slate-800'}`}>
                    {state.reconnecting
                      ? <AlertTriangle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
                      : state.status === 'request_retrieved'
                        ? <Smartphone aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#354CE1]" />
                        : <span aria-hidden="true" className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#354CE1] motion-safe:animate-pulse" />}
                    <p className="type-body font-medium">
                      {state.reconnecting ? copy.reconnecting : state.status === 'request_retrieved' ? copy.statusRetrieved : copy.statusPending}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="type-body flex items-center gap-2 text-slate-700">
                      <Clock aria-hidden="true" className="h-4 w-4 text-slate-500" />
                      <Countdown expiresAt={state.expiresAt} offsetMs={state.clockOffsetMs} template={copy.expiresIn} />
                    </p>
                    <button type="button" onClick={start} className={secondaryButton}>
                      <RefreshCw aria-hidden="true" className="h-4 w-4" />
                      {copy.newCode}
                    </button>
                  </div>

                  {!isTouch && <p className="type-body text-slate-700">{copy.scanInstruction}</p>}
                  {walletLink(state.qr)}
                  {requested}
                </div>
              </div>
            )}

            {(state.phase === 'expired' || state.phase === 'error') && (
              <div className="space-y-4">
                <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-5">
                  {state.phase === 'expired'
                    ? <Clock aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-slate-600" />
                    : <AlertTriangle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />}
                  <div className="space-y-1">
                    <h3 id="apply-job-verifier-problem" tabIndex={-1} className="type-card-title text-slate-900 focus:outline-none">
                      {state.phase === 'expired' ? copy.expiredTitle : problemCopy[state.problem].title}
                    </h3>
                    <p className="type-body text-slate-700">
                      {state.phase === 'expired' ? copy.expiredBody : problemCopy[state.problem].body}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-end gap-3">
                  <RetryButton
                    retryAt={state.phase === 'error' ? state.retryAt : null}
                    label={state.phase === 'expired' ? copy.newCode : copy.retry}
                    waitTemplate={copy.rateLimitedWait}
                    onRetry={start}
                  />
                  <button type="button" onClick={onFillManually} className={secondaryButton}>{copy.fillManually}</button>
                </div>
              </div>
            )}

            {(state.phase === 'verified' || state.phase === 'failed') && (
              <div className="space-y-6">
                <ApplyJobVerifierResult result={state.result} copy={copy} language={language} verifierName={state.verifierName} />
                <div className="flex flex-wrap gap-3">
                  {state.phase === 'verified' ? (
                    <>
                      <button type="button" onClick={() => onUseResult(state.result)} className={primaryButton}>{copy.useData}</button>
                      <button type="button" onClick={onFillManually} className={secondaryButton}>{copy.fillManually}</button>
                    </>
                  ) : isFinalFailure(toCheckRows(state.result)) ? (
                    <>
                      <button type="button" onClick={onFillManually} className={primaryButton}>{copy.fillManually}</button>
                      <button type="button" onClick={start} className={secondaryButton}>{copy.tryOtherDiploma}</button>
                    </>
                  ) : (
                    <>
                      <button type="button" onClick={start} className={primaryButton}>
                        <RefreshCw aria-hidden="true" className="h-4 w-4" />
                        {copy.tryAgain}
                      </button>
                      <button type="button" onClick={onFillManually} className={secondaryButton}>{copy.fillManually}</button>
                    </>
                  )}
                </div>
              </div>
            )}
          </IdentraErrorBoundary>
        </div>

        {state.phase !== 'verified' && (
          <p className="type-body mt-6 text-slate-600">
            {copy.noDiplomaHint}{' '}
            <Link to={portalHref} className={`font-semibold text-[#2539BE] underline-offset-2 hover:underline ${focusRing}`}>
              {copy.portalLink}
            </Link>
          </p>
        )}
        {state.phase !== 'verified' && (
          <p className="type-body mt-2 text-slate-600" data-testid="apply-job-no-app">
            {copy.noAppHint}{' '}
            <Link to={trialWalletHref} onClick={onClose} className={`font-semibold text-[#2539BE] underline-offset-2 hover:underline ${focusRing}`} data-testid="apply-job-trial-wallet">
              {copy.trialWalletLink}
            </Link>
          </p>
        )}
      </div>
    </div>,
    document.body,
  );
}
