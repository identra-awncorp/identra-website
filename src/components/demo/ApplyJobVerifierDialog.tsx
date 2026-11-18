/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { AlertTriangle, Check, Clock, ExternalLink, Loader2, Minus, RefreshCw, ShieldCheck, Smartphone, X, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createVerifierClient, type SessionResult } from '@identra/sdk-client';
import { useLanguage } from '../../context/LanguageContext';
import { IDENTRA_API_URL, SAMPLE_VERIFIER, SAMPLE_VERIFIER_SCENARIO } from '../../identra/config';
import {
  firstFailure,
  formatCountdown,
  INITIAL_VERIFIER_STEP_STATE,
  runVerifierSession,
  secondsUntil,
  toCheckRows,
  toSharedFields,
  truncateText,
  verifierStepReducer,
  type CheckRow,
  type VerifierProblem,
} from '../../identra/verifierSession';
import { APPLY_JOB_VERIFIER_DIALOG_TRANSLATIONS } from '../../translations/demo/ApplyJobVerifierDialogTranslations';
import { getLocalizedRecord } from '../../utils/i18nRuntime';
import IdentraQrCode from '../IdentraQrCode';

const verifierClient = createVerifierClient({ baseUrl: IDENTRA_API_URL });

const formatTemplate = (template: string, values: Record<string, string>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? '');

interface ApplyJobVerifierDialogProps {
  onClose: () => void;
  /** Called only with a result whose every check passed. */
  onUseResult: (result: SessionResult) => void;
  /** Called once per session when the server has answered: true when the diploma was confirmed. */
  onSettled?: (ok: boolean) => void;
  onFillManually: () => void;
  portalHref: string;
}

function CheckList({ rows, copy }: { rows: CheckRow[]; copy: typeof APPLY_JOB_VERIFIER_DIALOG_TRANSLATIONS.en }) {
  return (
    <ol className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white">
      {rows.map((row, index) => (
        <li key={`${row.labelKey}-${index}`} className="flex items-start gap-3 px-4 py-3">
          <span
            aria-hidden="true"
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
              row.outcome === 'passed'
                ? 'bg-emerald-100 text-emerald-700'
                : row.outcome === 'failed'
                  ? 'bg-rose-100 text-rose-700'
                  : 'bg-slate-100 text-slate-500'
            }`}
          >
            {row.outcome === 'passed' ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : row.outcome === 'failed' ? <X className="h-3.5 w-3.5" strokeWidth={3} /> : <Minus className="h-3.5 w-3.5" />}
          </span>
          <div className="min-w-0 flex-1">
            <p className={`text-sm font-medium ${row.outcome === 'skipped' ? 'text-slate-500' : 'text-slate-900'}`}>
              {copy.checks[row.labelKey]}
              <span className="sr-only">
                {': '}
                {row.outcome === 'passed' ? copy.checkPassed : row.outcome === 'failed' ? copy.checkFailed : copy.checkSkipped}
              </span>
            </p>
            {row.reasonKey && (
              <p className="mt-0.5 text-sm text-rose-700">{copy.reasons[row.reasonKey]}</p>
            )}
          </div>
          {row.outcome === 'skipped' && (
            <span aria-hidden="true" className="shrink-0 text-xs text-slate-500">{copy.checkSkipped}</span>
          )}
        </li>
      ))}
    </ol>
  );
}

export function ApplyJobVerifierResult({
  result,
  verifierName,
  copy,
  language,
}: {
  result: SessionResult;
  verifierName: string;
  copy: typeof APPLY_JOB_VERIFIER_DIALOG_TRANSLATIONS.en;
  language: string;
}) {
  const rows = toCheckRows(result);
  const failure = firstFailure(rows);
  const fields = result.ok ? toSharedFields(result.claims) : [];
  const checkedAt = Number.isNaN(Date.parse(result.verifiedAt))
    ? null
    : new Intl.DateTimeFormat(language, { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date(result.verifiedAt));

  return (
    <div className="space-y-5">
      <div className={`flex items-start gap-3 rounded-2xl p-4 ${result.ok ? 'bg-emerald-50 text-emerald-950' : 'bg-rose-50 text-rose-950'}`}>
        {result.ok
          ? <ShieldCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
          : <XCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-rose-700" />}
        <div className="space-y-1">
          <p className="text-base font-semibold">{result.ok ? copy.verifiedTitle : copy.failedTitle}</p>
          <p className="text-sm">
            {result.ok ? copy.verifiedBody : copy.reasons[failure?.reasonKey ?? 'UNKNOWN']}
          </p>
        </div>
      </div>

      {fields.length > 0 && (
        <section aria-labelledby="apply-job-verifier-shared" className="space-y-2">
          <h3 id="apply-job-verifier-shared" className="text-sm font-semibold text-slate-900">{copy.sharedTitle}</h3>
          <dl className="grid grid-cols-1 gap-x-6 gap-y-3 rounded-2xl bg-slate-50 p-4 sm:grid-cols-2">
            {fields.map((field) => (
              <div key={field.rawName} className="min-w-0">
                <dt className="text-xs text-slate-600">{field.key ? copy.claims[field.key] : field.rawName}</dt>
                <dd className="break-words text-sm font-semibold text-slate-900">{field.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <dl className="grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs text-slate-600">{copy.issuedBy}</dt>
          <dd className="font-medium text-slate-900">
            {result.issuer ? truncateText(result.issuer.ten) : copy.issuerUnknown}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-slate-600">{copy.verifiedBy}</dt>
          <dd className="font-medium text-slate-900">{truncateText(verifierName)}</dd>
        </div>
        {checkedAt && (
          <div className="sm:col-span-2">
            <dd className="text-xs text-slate-600">{formatTemplate(copy.checkedAt, { time: checkedAt })}</dd>
          </div>
        )}
      </dl>

      <section aria-labelledby="apply-job-verifier-checks" className="space-y-2">
        <h3 id="apply-job-verifier-checks" className="text-sm font-semibold text-slate-900">{copy.checksTitle}</h3>
        <CheckList rows={rows} copy={copy} />
      </section>
    </div>
  );
}

export default function ApplyJobVerifierDialog({ onClose, onUseResult, onSettled, onFillManually, portalHref }: ApplyJobVerifierDialogProps) {
  const { language } = useLanguage();
  const copy = getLocalizedRecord(
    APPLY_JOB_VERIFIER_DIALOG_TRANSLATIONS,
    language as keyof typeof APPLY_JOB_VERIFIER_DIALOG_TRANSLATIONS,
    'APPLY_JOB_VERIFIER_DIALOG_TRANSLATIONS',
  );
  const [state, dispatch] = useReducer(verifierStepReducer, INITIAL_VERIFIER_STEP_STATE);
  const [now, setNow] = useState(() => Date.now());
  const controllerRef = useRef<AbortController | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const start = useCallback(() => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setNow(Date.now());
    void runVerifierSession(
      verifierClient,
      { verifier: SAMPLE_VERIFIER, scenario: SAMPLE_VERIFIER_SCENARIO },
      { signal: controller.signal, dispatch },
    );
  }, []);

  // One session per opening; closing the dialog or leaving the page stops all polling.
  useEffect(() => {
    start();
    return () => controllerRef.current?.abort();
  }, [start]);

  const settledSessionId = state.phase === 'verified' || state.phase === 'failed' ? state.sessionId : null;
  const settledOk = state.phase === 'verified';
  useEffect(() => {
    if (settledSessionId) onSettled?.(settledOk);
  }, [onSettled, settledOk, settledSessionId]);

  const isWaiting = state.phase === 'waiting';
  useEffect(() => {
    if (!isWaiting) return undefined;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [isWaiting]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const trapFocus = (event: React.KeyboardEvent) => {
    if (event.key !== 'Tab') return;
    const focusable = Array.from(
      dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]') ?? [],
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
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
  };

  const liveStatus = state.phase === 'creating'
    ? copy.creating
    : state.phase === 'waiting'
      ? state.reconnecting ? copy.reconnecting : state.status === 'request_retrieved' ? copy.statusRetrieved : copy.statusPending
      : state.phase === 'verified'
        ? copy.verifiedTitle
        : state.phase === 'failed'
          ? copy.failedTitle
          : state.phase === 'expired'
            ? copy.expiredTitle
            : state.phase === 'error'
              ? problemCopy[state.problem].title
              : '';

  const secondsLeft = state.phase === 'waiting' ? secondsUntil(state.expiresAt, now) : 0;

  return (
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
          <div className="space-y-1">
            <h2 id="apply-job-verifier-title" className="font-display text-xl font-bold text-[#0F1E36]">{copy.title}</h2>
            <p id="apply-job-verifier-subtitle" className="text-sm text-slate-600">{copy.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            autoFocus
            aria-label={copy.close}
            title={copy.close}
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1]"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>

        <p role="status" aria-live="polite" className="sr-only">{liveStatus}</p>

        <div className="mt-6">
          {(state.phase === 'idle' || state.phase === 'creating') && (
            <div className="flex min-h-64 items-center justify-center gap-3 text-sm text-slate-600">
              <Loader2 aria-hidden="true" className="h-5 w-5 text-[#354CE1] motion-safe:animate-spin" />
              <span>{copy.creating}</span>
            </div>
          )}

          {state.phase === 'waiting' && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-[auto_1fr] md:items-start">
              <div className="mx-auto rounded-2xl border border-slate-200 bg-white p-3">
                <IdentraQrCode value={state.qr} label={copy.qrLabel} className="h-56 w-56 sm:h-64 sm:w-64" />
              </div>
              <div className="space-y-5">
                <div className={`flex items-start gap-3 rounded-2xl p-4 ${state.status === 'request_retrieved' ? 'bg-[#E2E6FF] text-[#0F1E36]' : 'bg-slate-50 text-slate-800'}`}>
                  {state.reconnecting
                    ? <AlertTriangle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                    : state.status === 'request_retrieved'
                      ? <Smartphone aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#354CE1]" />
                      : <span aria-hidden="true" className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#354CE1] motion-safe:animate-pulse" />}
                  <p className="text-sm font-medium">
                    {state.reconnecting ? copy.reconnecting : state.status === 'request_retrieved' ? copy.statusRetrieved : copy.statusPending}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="flex items-center gap-2 text-sm text-slate-700">
                    <Clock aria-hidden="true" className="h-4 w-4 text-slate-500" />
                    <span className="tabular-nums">{formatTemplate(copy.expiresIn, { time: formatCountdown(secondsLeft) })}</span>
                  </p>
                  <button
                    type="button"
                    onClick={start}
                    className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1]"
                  >
                    <RefreshCw aria-hidden="true" className="h-4 w-4" />
                    {copy.newCode}
                  </button>
                </div>

                <p className="text-sm text-slate-700">{copy.scanInstruction}</p>
                <a
                  href={state.qr}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#354CE1] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#2539BE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1] focus-visible:ring-offset-2 lg:hidden"
                >
                  <ExternalLink aria-hidden="true" className="h-4 w-4" />
                  {copy.openInWallet}
                </a>

                <div className="space-y-1 border-t border-slate-100 pt-4">
                  <p className="text-xs font-semibold text-slate-700">{copy.requestedTitle}</p>
                  <p className="text-sm text-slate-700">{copy.requestedRequired}</p>
                  <p className="text-sm text-slate-600">{copy.requestedOptional}</p>
                </div>
              </div>
            </div>
          )}

          {(state.phase === 'expired' || state.phase === 'error') && (
            <div className="space-y-4 rounded-2xl bg-slate-50 p-5">
              <div className="flex items-start gap-3">
                {state.phase === 'expired'
                  ? <Clock aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-slate-600" />
                  : <AlertTriangle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />}
                <div className="space-y-1">
                  <p className="text-base font-semibold text-slate-900">
                    {state.phase === 'expired' ? copy.expiredTitle : problemCopy[state.problem].title}
                  </p>
                  <p className="text-sm text-slate-700">
                    {state.phase === 'expired' ? copy.expiredBody : problemCopy[state.problem].body}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={start}
                  className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-[#354CE1] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#2539BE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1] focus-visible:ring-offset-2"
                >
                  <RefreshCw aria-hidden="true" className="h-4 w-4" />
                  {state.phase === 'expired' ? copy.newCode : copy.retry}
                </button>
                <button
                  type="button"
                  onClick={onFillManually}
                  className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1]"
                >
                  {copy.fillManually}
                </button>
              </div>
            </div>
          )}

          {(state.phase === 'verified' || state.phase === 'failed') && (
            <div className="space-y-6">
              <ApplyJobVerifierResult result={state.result} verifierName={state.verifierName} copy={copy} language={language} />
              <div className="flex flex-wrap gap-3">
                {state.phase === 'verified' ? (
                  <button
                    type="button"
                    onClick={() => onUseResult(state.result)}
                    className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-[#354CE1] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#2539BE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1] focus-visible:ring-offset-2"
                  >
                    {copy.useData}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={start}
                    className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-[#354CE1] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#2539BE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1] focus-visible:ring-offset-2"
                  >
                    <RefreshCw aria-hidden="true" className="h-4 w-4" />
                    {copy.tryAgain}
                  </button>
                )}
                <button
                  type="button"
                  onClick={onFillManually}
                  className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1]"
                >
                  {copy.fillManually}
                </button>
              </div>
            </div>
          )}
        </div>

        {state.phase !== 'verified' && (
          <p className="mt-6 text-sm text-slate-600">
            {copy.noDiplomaHint}{' '}
            <Link to={portalHref} className="font-semibold text-[#2539BE] underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1]">
              {copy.portalLink}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
