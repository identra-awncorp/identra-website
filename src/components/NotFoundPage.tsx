/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { NOT_FOUND_PAGE_TRANSLATIONS } from '../translations/NotFoundPageTranslations';
import { getLocalizedRecord } from '../utils/i18nRuntime';

type NotFoundPageProps = {
  onBackToLanding: () => void;
};

export default function NotFoundPage({ onBackToLanding }: NotFoundPageProps) {
  const { language } = useLanguage();
  const copy = getLocalizedRecord(
    NOT_FOUND_PAGE_TRANSLATIONS,
    language,
    'NOT_FOUND_PAGE_TRANSLATIONS',
  );

  return (
    <section className="flex min-h-[62vh] items-center px-6 py-20">
      <div className="mx-auto w-full max-w-7xl">
        <p className="mb-4 text-sm font-semibold text-[#354CE1]">{copy.eyebrow}</p>
        <h1 className="max-w-2xl text-4xl font-bold leading-tight text-slate-950 md:text-5xl">
          {copy.title}
        </h1>
        <p className="mt-5 max-w-xl text-base font-normal leading-relaxed text-slate-600">
          {copy.description}
        </p>
        <button
          type="button"
          onClick={onBackToLanding}
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#354CE1] transition-colors hover:text-[#2539BE]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>{copy.backHome}</span>
        </button>
      </div>
    </section>
  );
}
