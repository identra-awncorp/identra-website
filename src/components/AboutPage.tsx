/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ABOUT_TRANSLATIONS, type AboutPoint } from '../translations/AboutPageTranslations';
import { demoScenarioPath, viewToPath } from '../types/routes';
import { getLocalizedRecord } from '../utils/i18nRuntime';

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#354CE1]';
const focusRingOnDark = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

/** Who builds Identra, what exists today and what does not exist yet. */
export default function AboutPage() {
  const { language } = useLanguage();
  const copy = getLocalizedRecord(ABOUT_TRANSLATIONS, language, 'ABOUT_TRANSLATIONS');
  const points: Array<{ point: AboutPoint; to: string }> = [
    { point: copy.haveDemos, to: viewToPath('demo', language) },
    { point: copy.haveRoot, to: viewToPath('security', language) },
    { point: copy.haveWallet, to: demoScenarioPath('diploma', language) },
  ];

  return (
    <div className="bg-white text-slate-800 antialiased">
      <section className="bg-[#FAFBFD] px-6 pb-20 pt-20 md:pb-28 md:pt-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <h1 className="type-display text-[#0F1E36]">
              {copy.title}
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-700">{copy.intro}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to={viewToPath('demo', language)}
                className={`type-control inline-flex min-h-11 items-center gap-2 rounded-full bg-[#354CE1] px-6 text-white transition-colors hover:bg-[#2539BE] ${focusRing}`}
              >
                {copy.ctaDemo}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                to={viewToPath('contact', language)}
                className={`type-control inline-flex min-h-11 items-center rounded-full border border-slate-300 bg-white px-6 text-[#0F1E36] transition-colors hover:bg-slate-50 ${focusRing}`}
              >
                {copy.ctaContact}
              </Link>
            </div>
          </div>
          <div className="rounded-3xl bg-[#0F1E36] p-8 text-white md:p-10 lg:col-span-5">
            <h2 className="type-section-title-compact">{copy.notYetTitle}</h2>
            <ul className="mt-6 space-y-4">
              {copy.notYet.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-relaxed text-blue-50">
                  <Minus aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[#FFBF43]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="about-have-title" className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <h2 id="about-have-title" className="type-section-title text-[#0F1E36]">
            {copy.haveTitle}
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
            {points.map(({ point, to }) => (
              <article key={point.title} className="flex flex-col border-t-4 border-[#354CE1] pt-6">
                <h3 className="type-featured-title text-[#0F1E36]">{point.title}</h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-slate-700">{point.body}</p>
                <Link
                  to={to}
                  className={`type-control mt-6 inline-flex min-h-11 items-center gap-2 self-start text-[#354CE1] hover:text-[#2539BE] ${focusRing}`}
                >
                  {point.link}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="about-next-title" className="bg-[#354CE1] px-6 py-20 text-white md:py-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <h2 id="about-next-title" className="type-section-title">
              {copy.nextTitle}
            </h2>
            <p className="text-base leading-relaxed text-blue-50">{copy.nextBody}</p>
          </div>
          <Link
            to={viewToPath('contact', language)}
            className={`type-control inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-full bg-white px-6 text-[#0F1E36] transition-colors hover:bg-blue-50 lg:self-auto ${focusRingOnDark}`}
          >
            {copy.nextCta}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
