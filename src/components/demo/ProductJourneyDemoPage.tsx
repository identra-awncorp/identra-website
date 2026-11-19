/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink, Smartphone } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { PRODUCT_JOURNEY_DEMO_PAGE_TRANSLATIONS } from '../../translations/demo/ProductJourneyDemoPageTranslations';
import { demoScenarioPath, resolveDemoScenarioLocale, viewToPath } from '../../types/routes';
import { DEFAULT_SITE_URL } from '../../utils/seo';
import IdentraQrCode from '../IdentraQrCode';

// The guided entry to Demo B: four sample products (the fourth has a record edited in the store after signing) the server provisions (GS1 sample GTIN, prefix 952),
// each opened on the product page (/01/<GTIN>/21/<serial>), which verifies the signed journey in the
// browser. The page itself fetches nothing: a missing product is the product page's own "not found".
const SAMPLE_GTIN = '09520123456788';
const SAMPLE_SERIALS = ['SN-2026-000001', 'SN-2026-000002', 'SN-2026-000003', 'SN-2026-000004'] as const;
const productPath = (serial: string) => `/01/${SAMPLE_GTIN}/21/${serial}`;

const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ''));

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1] focus-visible:ring-offset-2';

export default function ProductJourneyDemoPage() {
  const { language } = useLanguage();
  const locale = resolveDemoScenarioLocale('product-journey', language) as 'vi' | 'en';
  const copy = PRODUCT_JOURNEY_DEMO_PAGE_TRANSLATIONS[locale];

  return (
    <div className="bg-[#FAFBFD] pb-20" data-testid="product-journey-page">
      <div className="mx-auto max-w-7xl space-y-10 px-6 pt-8 sm:pt-10">
        <Link to={viewToPath('demo', language)} className={`type-control inline-flex min-h-11 items-center gap-2 text-slate-700 hover:text-[#354CE1] ${focusRing}`}>
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          {copy.backToDemos}
        </Link>

        <header className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <div className="space-y-3 lg:col-span-8">
            <p className="type-body-sm inline-flex items-center gap-2 font-semibold text-emerald-800">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-500" />
              {copy.realLabel}
            </p>
            <h1 className="type-page-title text-balance text-[#0F1E36]">{copy.title}</h1>
            <p className="type-lead max-w-3xl text-slate-700">{copy.intro}</p>
          </div>
          <div className="flex gap-3 rounded-3xl bg-[#E2E6FF] p-5 lg:col-span-4">
            <Smartphone aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#354CE1]" />
            <div>
              <p className="type-card-title-sm text-[#0F1E36]">{copy.browserTitle}</p>
              <p className="type-body mt-1 text-slate-800">{copy.browserBody}</p>
            </div>
          </div>
        </header>

        <section aria-labelledby="product-journey-list" className="space-y-5">
          <h2 id="product-journey-list" className="type-section-title-compact text-[#0F1E36]">{copy.listTitle}</h2>
          <ol className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {SAMPLE_SERIALS.map((serial, index) => {
              const product = copy.products[index]!;
              const number = index + 1;
              return (
                <li key={serial} className="flex flex-col rounded-3xl border border-slate-200 bg-white p-5 sm:p-6" data-testid={`product-journey-sample-${number}`}>
                  <div className="flex items-start gap-3">
                    <span aria-hidden="true" className="type-card-title flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0F1E36] text-white">{number}</span>
                    <div className="min-w-0">
                      <p className="type-body-sm text-slate-600">{fill(copy.productNumber, { number })}</p>
                      <h3 className="type-card-title text-[#0F1E36]">{product.title}</h3>
                    </div>
                  </div>
                  <div className="mt-4 flex-1 space-y-2">
                    <p className="type-body text-slate-700">{product.lookFor}</p>
                    {product.why && <p className="type-body rounded-2xl bg-amber-50 px-4 py-3 text-amber-950" data-testid={`product-journey-why-${number}`}>{product.why}</p>}
                  </div>
                  <div className="mt-5 flex items-center gap-4 rounded-2xl bg-slate-50 p-3">
                    <IdentraQrCode
                      value={`${DEFAULT_SITE_URL}${productPath(serial)}`}
                      label={fill(copy.qrLabel, { number })}
                      className="h-28 w-28 shrink-0 rounded-xl"
                      fallback={null}
                    />
                    <div className="min-w-0 space-y-1">
                      <p className="type-body-sm text-slate-600">{copy.serialLabel}</p>
                      <p className="type-body font-semibold text-slate-900" translate="no">{serial}</p>
                      <p className="type-body-sm text-slate-600">{copy.scanHint}</p>
                    </div>
                  </div>
                  <a
                    href={productPath(serial)}
                    className={`type-control mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#354CE1] px-5 text-white transition-colors hover:bg-[#2539BE] ${focusRing}`}
                    data-testid={`product-journey-open-${number}`}
                  >
                    {copy.open}
                    <ExternalLink aria-hidden="true" className="h-4 w-4" />
                  </a>
                </li>
              );
            })}
          </ol>
        </section>

        <section aria-labelledby="product-journey-stages" className="grid grid-cols-1 gap-6 rounded-3xl bg-white p-6 ring-1 ring-slate-200 sm:p-8 lg:grid-cols-12">
          <h2 id="product-journey-stages" className="type-section-title-compact text-[#0F1E36] lg:col-span-4">{copy.stagesTitle}</h2>
          <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:col-span-8">
            {copy.stages.map((stage) => (
              <div key={stage.name}>
                <dt className="type-card-title-sm text-[#0F1E36]">{stage.name}</dt>
                <dd className="type-body mt-1 text-slate-700">{stage.body}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="product-journey-next" className="flex flex-col gap-4 rounded-3xl bg-[#0F1E36] p-6 text-white sm:p-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl space-y-1">
            <h2 id="product-journey-next" className="type-card-title text-white">{copy.nextTitle}</h2>
            <p className="type-body text-white/85">{copy.nextBody}</p>
          </div>
          <Link
            to={demoScenarioPath('diploma', language)}
            className="type-control inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-white px-5 text-[#0F1E36] transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {copy.nextAction}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
