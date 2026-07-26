/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { ShieldCheck, ArrowRight, Lock, Server, Check } from 'lucide-react';
import { securityCertificationsTranslations } from '../translations/SecurityCertificationsTranslations';

interface SecurityCertificationsProps {
  onOpenSandbox: () => void;
}

export default function SecurityCertifications({ onOpenSandbox }: SecurityCertificationsProps) {
  const { language } = useLanguage();
  const copy = getLocalizedRecord(securityCertificationsTranslations, language as keyof typeof securityCertificationsTranslations, 'securityCertificationsTranslations');
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);

  return (
    <section className="section-space-standard bg-gradient-to-b from-[#FAFBFD] to-[#E2E6FF] border-b border-slate-100 relative overflow-hidden">
      
      {/* Dynamic ambient lines */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#354ce1_1px,transparent_1px),linear-gradient(to_bottom,#354ce1_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: text */}
        <div className="lg:col-span-5 stack-hero text-center lg:text-left">
          <div className="type-label inline-flex items-center gap-1.5 bg-[#354CE1]/10 text-[#354CE1] uppercase px-3.5 py-1 rounded-full">
            <Lock className="w-3.5 h-3.5" />
            {copy.securityBadge}
          </div>

          <h2 className="type-section-title text-slate-900">
            {copy.securityTitle}
          </h2>

          <p className="type-body align-longform text-slate-600">
            {copy.securityDesc}
          </p>

          <div className="pt-2 flex justify-center lg:justify-start">
            <button
              onClick={onOpenSandbox}
              className="type-control bg-black hover:bg-slate-850 text-white px-5 py-2.5 rounded-full shadow flex items-center gap-1.5 transition cursor-pointer"
            >
              {copy.learnMore}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Compliancy Grid */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {copy.badges.map((badge, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredBadge(badge.label)}
                onMouseLeave={() => setHoveredBadge(null)}
                className={`p-4 bg-white rounded-2xl border transition relative flex flex-col justify-between aspect-square select-none cursor-help shadow-sm ${
                  hoveredBadge === badge.label 
                    ? 'border-indigo-400 shadow-md translate-y-[-2px]' 
                    : 'border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div className="bg-indigo-50 p-1.5 rounded-xl text-indigo-600 w-fit">
                  <ShieldCheck className="w-4 h-4" />
                </div>

                <div className="space-y-1">
                  <p className="type-card-title text-slate-900">{badge.label}</p>
                  <p className="type-technical text-slate-400 uppercase">{copy.badgeCertified}</p>
                </div>

                {/* Hover overlay tooltip */}
                {hoveredBadge === badge.label && (
                  <div className="absolute inset-0 bg-slate-900 text-white rounded-2xl p-3 flex flex-col justify-between z-10 animate-in fade-in duration-150">
                    <div>
                      <p className="type-label text-slate-100">{badge.title}</p>
                      <p className="type-caption text-slate-300 mt-1.5">{badge.desc}</p>
                    </div>
                    <span className="type-technical text-emerald-400 flex items-center gap-0.5">
                      <Check className="w-3 h-3" /> {copy.badgeAudited}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="type-body-sm bg-white/80 backdrop-blur border border-slate-200/60 p-4 rounded-2xl flex items-center gap-3.5 shadow-sm text-slate-600">
            <Server className="w-5 h-5 text-indigo-500" />
            <p>
              {copy.dataEncryptionText}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
