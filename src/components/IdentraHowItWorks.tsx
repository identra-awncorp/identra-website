/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowDown, ArrowRight, Briefcase, GraduationCap, ListChecks, Wallet, X } from 'lucide-react';
import { IDENTRA_HOW_IT_WORKS_TRANSLATIONS, type IdentraHowItWorksCopy } from '../translations/IdentraHowItWorksTranslations';

// How Identra works, drawn: the three parties, the signed diploma going to the holder, the chosen details going
// to the verifier, and the line back to the issuer crossed out. `summary` (the guided demo's "30 seconds" block)
// shows the diagram with one paragraph; `full` (the demo hub) adds the three ideas and the database comparison.

type Locale = keyof typeof IDENTRA_HOW_IT_WORKS_TRANSLATIONS;

function Node({ icon: Icon, title, note }: { icon: typeof Wallet; title: string; note: string }) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-slate-200 md:flex-col md:items-start md:gap-2">
      <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0F1E36] text-white">
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="type-card-title-sm block text-[#0F1E36]">{title}</span>
        <span className="type-body-sm block text-slate-600">{note}</span>
      </span>
    </div>
  );
}

function Arrow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 px-4 text-[#354CE1] md:flex-col md:justify-center md:gap-1 md:px-0 md:text-center">
      <ArrowDown aria-hidden="true" className="h-5 w-5 shrink-0 md:hidden" />
      <span className="type-body-sm font-semibold">{label}</span>
      <ArrowRight aria-hidden="true" className="hidden h-5 w-5 md:block" />
    </div>
  );
}

export function IdentraTrustDiagram({ copy }: { copy: IdentraHowItWorksCopy }) {
  return (
    <figure className="space-y-3" data-testid="identra-trust-diagram">
      <p className="sr-only">{copy.diagramLabel}</p>
      <div aria-hidden="true" className="grid grid-cols-1 gap-2 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] md:items-stretch md:gap-3">
        <Node icon={GraduationCap} title={copy.school.title} note={copy.school.note} />
        <Arrow label={copy.issueArrow} />
        <Node icon={Wallet} title={copy.wallet.title} note={copy.wallet.note} />
        <Arrow label={copy.shareArrow} />
        <Node icon={Briefcase} title={copy.verifier.title} note={copy.verifier.note} />
      </div>
      <div aria-hidden="true" className="flex items-center gap-3 rounded-2xl border-2 border-dashed border-rose-300 px-4 py-2 text-rose-800">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-100"><X className="h-4 w-4" strokeWidth={3} /></span>
        <span className="type-body-sm font-semibold">{copy.noCall}</span>
      </div>
      <figcaption className="type-body-sm flex items-start gap-2 text-slate-700">
        <ListChecks aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#354CE1]" />
        <span>{copy.registry}</span>
      </figcaption>
    </figure>
  );
}

export default function IdentraHowItWorks({ locale, variant }: { locale: Locale; variant: 'summary' | 'full' }) {
  const copy = IDENTRA_HOW_IT_WORKS_TRANSLATIONS[locale];

  if (variant === 'summary') {
    return (
      <section aria-labelledby="identra-summary-title" className="space-y-5 rounded-3xl bg-[#F1F3FF] p-5 sm:p-6" data-testid="guided-explainer">
        <div className="max-w-4xl space-y-2">
          <h2 id="identra-summary-title" className="type-card-title text-[#0F1E36]">{copy.summaryTitle}</h2>
          <p className="type-body text-slate-800">{copy.summaryBody}</p>
        </div>
        <IdentraTrustDiagram copy={copy} />
      </section>
    );
  }

  return (
    <div className="space-y-12">
      <section aria-labelledby="identra-how-title" className="space-y-6" data-testid="demo-hub-how">
        <div className="max-w-3xl space-y-2">
          <h2 id="identra-how-title" className="type-section-title-compact text-slate-900">{copy.fullTitle}</h2>
          <p className="type-body text-slate-700">{copy.fullIntro}</p>
        </div>
        <ol className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {copy.beats.map((beat, index) => (
            <li key={beat.title} className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
              <span aria-hidden="true" className="type-card-title flex h-9 w-9 items-center justify-center rounded-full bg-[#E2E6FF] text-[#2539BE]">{index + 1}</span>
              <h3 className="type-card-title-sm mt-3 text-[#0F1E36]">{beat.title}</h3>
              <p className="type-body mt-1 text-slate-700">{beat.body}</p>
            </li>
          ))}
        </ol>
        <IdentraTrustDiagram copy={copy} />
      </section>

      <section aria-labelledby="identra-compare-title" className="space-y-4" data-testid="demo-hub-comparison">
        <div className="max-w-3xl space-y-2">
          <h2 id="identra-compare-title" className="type-section-title-compact text-slate-900">{copy.comparisonTitle}</h2>
          <p className="type-body text-slate-700">{copy.comparisonIntro}</p>
        </div>
        <table className="hidden w-full overflow-hidden rounded-2xl bg-white text-left ring-1 ring-slate-200 md:table">
          <thead>
            <tr className="bg-slate-50">
              <th scope="col" className="type-body-sm w-1/5 px-5 py-3 font-semibold text-slate-600">{copy.columns.topic}</th>
              <th scope="col" className="type-body-sm w-2/5 px-5 py-3 font-semibold text-slate-600">{copy.columns.database}</th>
              <th scope="col" className="type-body-sm w-2/5 px-5 py-3 font-semibold text-[#2539BE]">{copy.columns.identra}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {copy.rows.map((row) => (
              <tr key={row.topic} className="align-top">
                <th scope="row" className="type-body px-5 py-4 font-semibold text-slate-900">{row.topic}</th>
                <td className="type-body px-5 py-4 text-slate-700">{row.database}</td>
                <td className="type-body px-5 py-4 text-slate-900">{row.identra}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <dl className="space-y-3 md:hidden">
          {copy.rows.map((row) => (
            <div key={row.topic} className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
              <dt className="type-card-title-sm text-slate-900">{row.topic}</dt>
              <dd className="mt-2 space-y-2">
                <p className="type-body-sm text-slate-600"><span className="font-semibold">{copy.columns.database}:</span> {row.database}</p>
                <p className="type-body-sm text-slate-900"><span className="font-semibold text-[#2539BE]">{copy.columns.identra}:</span> {row.identra}</p>
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
