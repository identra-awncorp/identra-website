/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Check, Clock, CloudOff, Minus, X } from 'lucide-react';
import { isProductStage, type ProductCheckOutcome, type StageOutcome, type StageRow } from '../identra/productPage';
import { truncateText } from '../identra/verifierSession';
import type { ProductPageCopy } from '../translations/ProductPageTranslations';
import IdentraOrganisationName from './IdentraOrganisationName';

type Locale = 'vi' | 'en';

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1] focus-visible:ring-offset-2';
const apiText = 'break-words [overflow-wrap:anywhere]';

/** "10/11/2026, 03:12" in both languages (day first); a value that is not an instant is shown as text. */
const formatInstant = (value: string, locale: Locale): string => {
  const time = Date.parse(value);
  if (Number.isNaN(time)) return truncateText(value);
  const tag = locale === 'vi' ? 'vi-VN' : 'en-GB';
  const date = new Intl.DateTimeFormat(tag, { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(time));
  const clock = new Intl.DateTimeFormat(tag, { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(new Date(time));
  return `${date}, ${clock}`;
};

const NEGATIVE = { marker: 'bg-rose-700 text-white', pill: 'bg-rose-50 text-rose-800 border-rose-200', text: 'text-rose-800' };
const OUTCOME_STYLE: Record<StageOutcome, { marker: string; pill: string; text: string }> = {
  ok: { marker: 'bg-emerald-600 text-white', pill: 'bg-emerald-50 text-emerald-800 border-emerald-200', text: 'text-slate-700' },
  revoked: NEGATIVE,
  suspended: NEGATIVE,
  untrusted: NEGATIVE,
  broken: NEGATIVE,
  failed: NEGATIVE,
  unchecked: { marker: 'bg-amber-100 text-amber-800', pill: 'bg-amber-50 text-amber-900 border-amber-200', text: 'text-amber-900' },
  missing: { marker: 'border-2 border-dashed border-slate-300 bg-white text-slate-400', pill: 'bg-slate-50 text-slate-600 border-slate-200', text: 'text-slate-600' },
};

function StageMarker({ row }: { row: StageRow }) {
  const icon = row.outcome === 'ok' ? <Check className="h-4 w-4" strokeWidth={3} />
    : row.outcome === 'missing' ? <Minus className="h-4 w-4" />
      : row.outcome === 'unchecked' ? row.reasonKey === 'CLOCK_WRONG' ? <Clock className="h-4 w-4" /> : <CloudOff className="h-4 w-4" />
        : <X className="h-4 w-4" strokeWidth={3} />;
  return (
    <span aria-hidden="true" data-marker={row.outcome} className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${OUTCOME_STYLE[row.outcome].marker}`}>
      {icon}
    </span>
  );
}

const CHECK_STYLE: Record<ProductCheckOutcome, string> = {
  passed: 'bg-emerald-100 text-emerald-700',
  failed: 'bg-rose-100 text-rose-700',
  unchecked: 'bg-amber-100 text-amber-800',
  skipped: 'bg-slate-100 text-slate-500',
};

function CheckList({ row, copy }: { row: StageRow; copy: ProductPageCopy }) {
  return (
    <ol className="mt-2 divide-y divide-slate-100">
      {row.checks.map((check, index) => (
        <li key={`${check.labelKey}-${index}`} data-check={check.outcome} className="flex items-start gap-2.5 py-2">
          <span aria-hidden="true" className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${CHECK_STYLE[check.outcome]}`}>
            {check.outcome === 'passed' ? <Check className="h-3 w-3" strokeWidth={3} /> : check.outcome === 'failed' ? <X className="h-3 w-3" strokeWidth={3} /> : <Minus className="h-3 w-3" />}
          </span>
          <p className={`type-body min-w-0 flex-1 ${check.outcome === 'passed' || check.outcome === 'failed' ? 'text-slate-900' : 'text-slate-600'}`}>
            {copy.checks[check.labelKey]}
            <span className="sr-only">
              {': '}
              {copy.checkOutcomes[check.outcome]}
            </span>
          </p>
          {(check.outcome === 'skipped' || check.outcome === 'unchecked') && (
            <span aria-hidden="true" className={`type-caption shrink-0 ${check.outcome === 'unchecked' ? 'text-amber-900' : 'text-slate-600'}`}>{copy.checkOutcomes[check.outcome]}</span>
          )}
        </li>
      ))}
    </ol>
  );
}

/** One stage of the timeline. Event text is rendered as text only, cut to 500 characters, isolated. */
export default function ProductStageItem({ row, copy, locale, isLast, quietUnchecked = false }: { row: StageRow; copy: ProductPageCopy; locale: Locale; isLast: boolean; quietUnchecked?: boolean }) {
  const { event } = row;
  // The event's own stage when the SDK handed the event out (it then equals the position's stage).
  const stage = isProductStage(event?.congDoan) ? event.congDoan : row.stage;
  const title = stage ? copy.stages[stage] : copy.extraStage;
  const message = row.outcome === 'ok' || (quietUnchecked && row.outcome === 'unchecked') ? null
    : row.outcome === 'missing' ? copy.missingMessage
      : copy.reasons[row.reasonKey ?? 'UNKNOWN'];
  const style = OUTCOME_STYLE[row.outcome];
  return (
    <li data-outcome={row.outcome} className="relative flex gap-4 pb-8 last:pb-0">
      {!isLast && <span aria-hidden="true" className="absolute left-4 top-9 h-[calc(100%-2.5rem)] w-px -translate-x-1/2 bg-slate-200" />}
      <StageMarker row={row} />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 className="type-card-title text-[#0F1E36]">{title}</h3>
          <span className={`type-body-sm inline-flex flex-none whitespace-nowrap rounded-full border px-2.5 py-0.5 font-semibold ${style.pill}`}>
            {copy.outcomes[row.outcome]}
          </span>
        </div>
        {message && <p className={`type-body ${style.text}`}>{message}</p>}
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
