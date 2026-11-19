/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, Check, CircleDashed } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SECURITY_PAGE_TRANSLATIONS } from '../translations/SecurityPageTranslations';
import { demoScenarioPath, viewToPath } from '../types/routes';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import IdentraRootCertificateSection from './IdentraRootCertificateSection';

const focusRingOnDark = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

/** What protects a credential today, what is not in place yet, and the published root certificate. */
export default function SecurityPage() {
  const { language } = useLanguage();
  const copy = getLocalizedRecord(SECURITY_PAGE_TRANSLATIONS, language, 'SECURITY_PAGE_TRANSLATIONS');

  return (
    <div className="bg-white text-slate-800 antialiased">
      <section className="bg-[#142FA0] px-6 pb-20 pt-20 text-white md:pb-28 md:pt-28">
        <div className="mx-auto max-w-7xl">
          <h1 className="type-display max-w-4xl">
            {copy.title}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-blue-50">{copy.intro}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to={demoScenarioPath('diploma', language)}
              className={`type-control inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-6 text-[#0F1E36] transition-colors hover:bg-blue-50 ${focusRingOnDark}`}
            >
              {copy.ctaDemo}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <Link
              to={viewToPath('contact', language)}
              className={`type-control inline-flex min-h-11 items-center rounded-full border border-white/40 px-6 text-white transition-colors hover:bg-white/10 ${focusRingOnDark}`}
            >
              {copy.ctaContact}
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="security-built-title" className="px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-4">
            <h2 id="security-built-title" className="type-section-title text-[#0F1E36]">
              {copy.builtTitle}
            </h2>
            <p className="text-base leading-relaxed text-slate-700">{copy.builtIntro}</p>
          </div>
          <ul className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:col-span-8">
            {copy.built.map((point) => (
              <li key={point.title} className="flex gap-4">
                <span aria-hidden="true" className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#354CE1] text-white">
                  <Check className="h-4 w-4" />
                </span>
                <div className="space-y-2">
                  <h3 className="type-featured-title text-[#0F1E36]">{point.title}</h3>
                  <p className="text-base leading-relaxed text-slate-700">{point.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="security-not-yet-title" className="bg-amber-50 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl space-y-4">
            <h2 id="security-not-yet-title" className="type-section-title text-[#0F1E36]">
              {copy.notYetTitle}
            </h2>
            <p className="text-base leading-relaxed text-slate-700">{copy.notYetIntro}</p>
          </div>
          <dl className="mt-12 space-y-4">
            {copy.notYet.map((point) => (
              <div key={point.title} className="grid grid-cols-1 gap-3 rounded-2xl bg-white p-6 md:grid-cols-12 md:gap-8 md:p-8">
                <dt className="flex gap-3 md:col-span-5">
                  <CircleDashed aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0 text-amber-600" />
                  <span className="type-featured-title text-[#0F1E36]">{point.title}</span>
                </dt>
                <dd className="text-base leading-relaxed text-slate-700 md:col-span-7">{point.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <IdentraRootCertificateSection />

      <section aria-labelledby="security-next-title" className="bg-[#0F1E36] px-6 py-20 text-white md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="space-y-4 lg:col-span-7">
            <h2 id="security-next-title" className="type-section-title">
              {copy.nextTitle}
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-blue-100">{copy.nextBody}</p>
            <div className="flex flex-wrap gap-3 pt-4">
              <Link
                to={demoScenarioPath('diploma', language)}
                className={`type-control inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-6 text-[#0F1E36] transition-colors hover:bg-blue-50 ${focusRingOnDark}`}
              >
                {copy.demoDiploma}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                to={demoScenarioPath('product-journey', language)}
                className={`type-control inline-flex min-h-11 items-center rounded-full border border-white/40 px-6 text-white transition-colors hover:bg-white/10 ${focusRingOnDark}`}
              >
                {copy.demoProduct}
              </Link>
            </div>
          </div>
          <div className="rounded-2xl bg-white/5 p-6 lg:col-span-5">
            <p className="type-featured-title">{copy.contactTitle}</p>
            <Link
              to={viewToPath('contact', language)}
              className={`type-control mt-3 inline-flex min-h-11 items-center gap-2 text-white underline underline-offset-4 ${focusRingOnDark}`}
            >
              {copy.contactCta}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
