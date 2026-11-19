/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AlertTriangle, Check, Minus, X } from 'lucide-react';
import type { StageRow } from '../identra/productPage';
import { truncateText } from '../identra/verifierSession';
import type { ProductPageCopy } from '../translations/ProductPageTranslations';
import IdentraOrganisationName from './IdentraOrganisationName';

type Locale = 'vi' | 'en';

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1] focus-visible:ring-offset-2';
const apiText = 'break-words [overflow-wrap:anywhere]';

const formatInstant = (value: string, locale: Locale): string => {
  const time = Date.parse(value);
  return Number.isNaN(time)
    ? truncateText(value)
    : (() => {
        // Date first, then the time (vi-VN would otherwise put the time first).
        const tag = locale === 'vi' ? 'vi-VN' : 'en-GB';
        const date = new Intl.DateTimeFormat(tag, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(time));
        const clock = new Intl.DateTimeFormat(tag, { hour: '2-digit', minute: '2-digit' }).format(new Date(time));
        return `${date}, ${clock}`;
      })();
};

const OUTCOME_STYLE: Record<StageRow['outcome'], { marker: string; pill: string }> = {
  ok: { marker: 'bg-emerald-600 text-white', pill: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  revoked: { marker: 'bg-rose-700 text-white', pill: 'bg-rose-50 text-rose-800 border-rose-200' },
  suspended: { marker: 'bg-rose-700 text-white', pill: 'bg-rose-50 text-rose-800 border-rose-200' },
  status_unavailable: { marker: 'bg-amber-600 text-white', pill: 'bg-amber-50 text-amber-900 border-amber-200' },
  untrusted: { marker: 'bg-rose-700 text-white', pill: 'bg-rose-50 text-rose-800 border-rose-200' },
  broken: { marker: 'bg-rose-700 text-white', pill: 'bg-rose-50 text-rose-800 border-rose-200' },
  failed: { marker: 'bg-rose-700 text-white', pill: 'bg-rose-50 text-rose-800 border-rose-200' },
  missing: { marker: 'border-2 border-dashed border-slate-300 bg-white text-slate-400', pill: 'bg-slate-50 text-slate-600 border-slate-200' },
};

function StageMarker({ outcome }: { outcome: StageRow['outcome'] }) {
  return (
    <span aria-hidden="true" className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${OUTCOME_STYLE[outcome].marker}`}>
      {outcome === 'ok' ? <Check className="h-4 w-4" strokeWidth={3} /> : outcome === 'missing' ? <Minus className="h-4 w-4" /> : outcome === 'status_unavailable' ? <AlertTriangle className="h-4 w-4" /> : <X className="h-4 w-4" strokeWidth={3} />}
    </span>
  );
}

function CheckList({ row, copy }: { row: StageRow; copy: ProductPageCopy }) {
  return (
    <ol className="mt-2 divide-y divide-slate-100">
      {row.checks.map((check, index) => (
        <li key={`${check.labelKey}-${index}`} className="flex items-start gap-2.5 py-2">
          <span
            aria-hidden="true"
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
              check.outcome === 'passed' ? 'bg-emerald-100 text-emerald-700' : check.outcome === 'failed' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-500'
            }`}
          >
            {check.outcome === 'passed' ? <Check className="h-3 w-3" strokeWidth={3} /> : check.outcome === 'failed' ? <X className="h-3 w-3" strokeWidth={3} /> : <Minus className="h-3 w-3" />}
          </span>
          <p className={`type-body min-w-0 flex-1 ${check.outcome === 'skipped' ? 'text-slate-600' : 'text-slate-900'}`}>
            {copy.checks[check.labelKey]}
            <span className="sr-only">
              {': '}
              {check.outcome === 'passed' ? copy.checkPassed : check.outcome === 'failed' ? copy.checkFailed : copy.checkSkipped}
            </span>
          </p>
          {check.outcome === 'skipped' && <span aria-hidden="true" className="type-caption shrink-0 text-slate-600">{copy.checkSkipped}</span>}
        </li>
      ))}
    </ol>
  );
}

/** One stage of the timeline. Event text is rendered as text only, cut to 500 characters, isolated. */
export default function ProductStageItem({ row, copy, locale, isLast }: { row: StageRow; copy: ProductPageCopy; locale: Locale; isLast: boolean }) {
  const title = row.stage ? copy.stages[row.stage] : copy.extraStage;
  const message = row.outcome === 'ok' ? null
    : row.outcome === 'failed' ? copy.reasons[row.reasonKey ?? 'UNKNOWN']
      : copy.outcomeMessages[row.outcome];
  const { event } = row;
  return (
    <li className="relative flex gap-4 pb-8 last:pb-0">
      {!isLast && <span aria-hidden="true" className="absolute left-4 top-9 h-[calc(100%-2.5rem)] w-px -translate-x-1/2 bg-slate-200" />}
      <StageMarker outcome={row.outcome} />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 className="type-card-title text-[#0F1E36]">{title}</h3>
          <span className={`type-body-sm inline-flex flex-none whitespace-nowrap rounded-full border px-2.5 py-0.5 font-semibold ${OUTCOME_STYLE[row.outcome].pill}`}>
            {copy.outcomes[row.outcome]}
          </span>
        </div>
        {message && (
          <p className={`type-body ${row.outcome === 'missing' ? 'text-slate-600' : row.outcome === 'status_unavailable' ? 'text-amber-900' : 'text-rose-800'}`}>{message}</p>
        )}
        {event && (
          <dl className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-[auto_minmax(0,1fr)]">
            <dt className="type-body-sm text-slate-600 sm:pt-0.5">{copy.signedBy}</dt>
            <dd className={`type-body font-semibold text-slate-900 ${apiText}`}>
              <IdentraOrganisationName maToChuc={event.issuer.maToChuc} serverName={event.issuer.ten} language={locale} />
            </dd>
            <dt className="type-body-sm text-slate-600 sm:pt-0.5">{copy.when}</dt>
            <dd className="type-body text-slate-900">{formatInstant(event.thoiDiem, locale)}</dd>
            <dt className="type-body-sm text-slate-600 sm:pt-0.5">{copy.where}</dt>
            <dd className={`type-body text-slate-900 ${apiText}`}><bdi>{truncateText(event.diaDiem)}</bdi></dd>
            <dt className="type-body-sm text-slate-600 sm:pt-0.5">{copy.description}</dt>
            <dd className={`type-body whitespace-pre-line text-slate-900 ${apiText}`}><bdi>{truncateText(event.moTa)}</bdi></dd>
          </dl>
        )}
        {row.checks.length > 0 && (
          <details className="group">
            <summary className={`type-control inline-flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-full text-[#2539BE] ${focusRing}`}>
              <span aria-hidden="true" className="transition-transform group-open:rotate-90">›</span>
              {copy.checksToggle}
            </summary>
            <CheckList row={row} copy={copy} />
          </details>
        )}
      </div>
    </li>
  );
}
