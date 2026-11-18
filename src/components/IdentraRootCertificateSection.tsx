/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Check, Copy, Download, KeyRound } from 'lucide-react';
import rootCa from 'virtual:identra-root-ca';
import { useLanguage } from '../context/LanguageContext';
import type { PublishedRoot } from '../identra/trust/rootCaPlugin';
import { IDENTRA_ROOT_CERTIFICATE_SECTION_TRANSLATIONS, type IdentraRootCertificateSectionCopy } from '../translations/IdentraRootCertificateSectionTranslations';
import { getLocalizedRecord } from '../utils/i18nRuntime';

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFBF43] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1E36]';

/** 32 colon-separated pairs as four rows of eight, so a line only ever breaks after a colon. */
const fingerprintRows = (fingerprint: string): string[] => {
  const pairs = fingerprint.split(':');
  const count = Math.ceil(pairs.length / 8);
  return Array.from({ length: count }, (_, row) => `${pairs.slice(row * 8, row * 8 + 8).join(':')}${row < count - 1 ? ':' : ''}`);
};

function RootCertificate({ root, copy, showLabel }: { root: PublishedRoot; copy: IdentraRootCertificateSectionCopy; showLabel: boolean }) {
  const [copied, setCopied] = useState(false);
  const label = root.slot === 'current' ? copy.currentLabel : copy.nextLabel;
  const rows = fingerprintRows(root.fingerprint);

  const copyFingerprint = async () => {
    try {
      await navigator.clipboard.writeText(root.fingerprint);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="space-y-5">
      {showLabel && <h3 id={`root-certificate-${root.slot}`} className="type-card-title text-white">{label}</h3>}
      <div className="space-y-2">
        <p className="type-body flex items-center gap-2 text-blue-100">
          <KeyRound aria-hidden="true" className="h-4 w-4" />
          <span>{copy.fingerprintLabel}</span>
        </p>
        <p className="font-mono text-sm leading-relaxed text-white sm:text-base" translate="no">
          {rows.map((row) => (
            <span key={row} className="block whitespace-nowrap">
              {row}
            </span>
          ))}
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <a
          href={root.downloadPath}
          download
          aria-describedby={showLabel ? `root-certificate-${root.slot}` : undefined}
          className={`type-control inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-[#0F1E36] transition-colors hover:bg-blue-50 ${focusRing}`}
        >
          <Download aria-hidden="true" className="h-4 w-4" />
          {copy.download}
        </a>
        <button
          type="button"
          onClick={() => void copyFingerprint()}
          className={`type-control inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-white/40 px-5 text-white transition-colors hover:bg-white/10 ${focusRing}`}
        >
          {copied ? <Check aria-hidden="true" className="h-4 w-4" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
          {copied ? copy.copied : copy.copy}
        </button>
      </div>
      <p role="status" aria-live="polite" className="sr-only">{copied ? copy.copied : ''}</p>
    </div>
  );
}

/** Publishes the Identra Root CA fingerprint(s) computed at build time (ADR-0015 section 8). */
export default function IdentraRootCertificateSection() {
  const { language } = useLanguage();
  const copy = getLocalizedRecord(
    IDENTRA_ROOT_CERTIFICATE_SECTION_TRANSLATIONS,
    language,
    'IDENTRA_ROOT_CERTIFICATE_SECTION_TRANSLATIONS',
  );
  const isRollover = rootCa.roots.length > 1;

  return (
    <section id="root-certificate" aria-labelledby="root-certificate-title" className="bg-white px-6 py-16 md:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-5">
          <h2 id="root-certificate-title" className="type-section-title-compact text-[#0F1E36]">
            {copy.title}
          </h2>
          <p className="type-body text-slate-700">{copy.purpose}</p>
          <p className="type-body text-slate-700">{copy.howToCheck}</p>
          {rootCa.roots.length > 0 && <p className="type-body text-slate-700">{isRollover ? copy.rolloverNote : copy.demoNote}</p>}
        </div>

        <div className="lg:col-span-7">
          {rootCa.roots.length > 0 ? (
            <div className="space-y-8 rounded-3xl bg-[#0F1E36] p-6 sm:p-8">
              {rootCa.roots.map((root) => <RootCertificate key={root.slot} root={root} copy={copy} showLabel={isRollover} />)}
            </div>
          ) : (
            <div role="status" className="rounded-3xl border border-dashed border-amber-300 bg-amber-50 p-6 text-amber-950 sm:p-8">
              <p className="type-card-title">{copy.notConfiguredTitle}</p>
              <p className="type-body mt-1">{copy.notConfiguredBody}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
