/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Check, Copy, Download, KeyRound } from 'lucide-react';
import rootCa from 'virtual:identra-root-ca';
import { useLanguage } from '../context/LanguageContext';
import { IDENTRA_ROOT_CERTIFICATE_SECTION_TRANSLATIONS } from '../translations/IdentraRootCertificateSectionTranslations';
import { getLocalizedRecord } from '../utils/i18nRuntime';

/** Publishes the Identra Root CA fingerprint computed at build time (ADR-0015 section 8). */
export default function IdentraRootCertificateSection() {
  const { language } = useLanguage();
  const copy = getLocalizedRecord(
    IDENTRA_ROOT_CERTIFICATE_SECTION_TRANSLATIONS,
    language,
    'IDENTRA_ROOT_CERTIFICATE_SECTION_TRANSLATIONS',
  );
  const [copied, setCopied] = useState(false);

  const copyFingerprint = async () => {
    if (!rootCa.fingerprint) return;
    try {
      await navigator.clipboard.writeText(rootCa.fingerprint);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="root-certificate" aria-labelledby="root-certificate-title" className="bg-white px-6 py-16 md:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-5">
          <h2 id="root-certificate-title" className="font-display text-3xl font-bold tracking-tight text-[#0F1E36] sm:text-4xl">
            {copy.title}
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 sm:text-base">{copy.purpose}</p>
          <p className="text-sm leading-relaxed text-slate-700 sm:text-base">{copy.howToCheck}</p>
        </div>

        <div className="lg:col-span-7">
          {rootCa.configured && rootCa.fingerprint && rootCa.downloadPath ? (
            <div className="space-y-5 rounded-3xl bg-[#0F1E36] p-6 text-white sm:p-8">
              <div className="flex items-center gap-2 text-sm text-blue-100">
                <KeyRound aria-hidden="true" className="h-4 w-4" />
                <span>{copy.fingerprintLabel}</span>
              </div>
              <p className="break-all font-mono text-base leading-relaxed sm:text-lg" translate="no">{rootCa.fingerprint}</p>
              <p className="text-sm text-blue-100">{copy.demoNote}</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={rootCa.downloadPath}
                  download="identra-root-ca.pem"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#0F1E36] transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFBF43] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1E36]"
                >
                  <Download aria-hidden="true" className="h-4 w-4" />
                  {copy.download}
                </a>
                <button
                  type="button"
                  onClick={() => void copyFingerprint()}
                  className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-white/40 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFBF43] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1E36]"
                >
                  {copied ? <Check aria-hidden="true" className="h-4 w-4" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
                  {copied ? copy.copied : copy.copy}
                </button>
              </div>
              <p role="status" aria-live="polite" className="sr-only">{copied ? copy.copied : ''}</p>
            </div>
          ) : (
            <div role="status" className="rounded-3xl border border-dashed border-amber-300 bg-amber-50 p-6 text-amber-950 sm:p-8">
              <p className="text-base font-semibold">{copy.notConfiguredTitle}</p>
              <p className="mt-1 text-sm">{copy.notConfiguredBody}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
