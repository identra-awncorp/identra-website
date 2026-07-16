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
    <section className="bg-gradient-to-b from-[#FAFBFD] to-[#E2E6FF] py-20 border-b border-slate-100 relative overflow-hidden">
      
      {/* Dynamic ambient lines */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#354ce1_1px,transparent_1px),linear-gradient(to_bottom,#354ce1_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: text */}
        <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-1.5 bg-[#354CE1]/10 text-[#354CE1] font-semibold text-xs uppercase tracking-wider px-3.5 py-1 rounded-full">
            <Lock className="w-3.5 h-3.5" />
            {copy.securityBadge}
          </div>

          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight leading-tight">
            {copy.securityTitle}
          </h2>

          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            {copy.securityDesc}
          </p>

          <div className="pt-2 flex justify-center lg:justify-start">
            <button
              onClick={onOpenSandbox}
              className="bg-black hover:bg-slate-850 text-white font-semibold text-xs px-5 py-2.5 rounded-full shadow flex items-center gap-1.5 transition cursor-pointer"
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
                  <p className="font-display font-bold text-base text-slate-900">{badge.label}</p>
                  <p className="text-[10px] text-slate-400 font-medium font-mono uppercase tracking-wide">{copy.badgeCertified}</p>
                </div>

                {/* Hover overlay tooltip */}
                {hoveredBadge === badge.label && (
                  <div className="absolute inset-0 bg-slate-900 text-white rounded-2xl p-3 flex flex-col justify-between z-10 animate-in fade-in duration-150">
                    <div>
                      <p className="font-semibold text-[10.5px] tracking-wide font-display text-slate-100">{badge.title}</p>
                      <p className="text-[9.5px] text-slate-300 leading-normal mt-1.5">{badge.desc}</p>
                    </div>
                    <span className="text-[9px] font-bold font-mono text-emerald-400 flex items-center gap-0.5">
                      <Check className="w-3 h-3" /> {copy.badgeAudited}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-white/80 backdrop-blur border border-slate-200/60 p-4 rounded-2xl flex items-center gap-3.5 shadow-sm text-xs text-slate-600">
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
