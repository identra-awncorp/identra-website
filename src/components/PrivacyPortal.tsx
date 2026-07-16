/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { PRIVACY_PORTAL_TRANSLATIONS } from '../translations/PrivacyPortalTranslations';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  UserCheck, 
  EyeOff, 
  Users, 
  Lock, 
  Smartphone,
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface PrivacyPortalProps {
  onOpenSandbox: () => void;
}

interface SSILog {
  id: string;
  type: 'selective' | 'zkp' | 'did';
  verifyingParty: string;
  status: 'verified' | 'minimized' | 'tamper_check_passed';
  timestamp: string;
}

export default function PrivacyPortal({ onOpenSandbox }: PrivacyPortalProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(PRIVACY_PORTAL_TRANSLATIONS, language as keyof typeof PRIVACY_PORTAL_TRANSLATIONS, 'PRIVACY_PORTAL_TRANSLATIONS');
  // Decentralized SSI transaction log mock
  const [logs] = useState<SSILog[]>([
    { id: 'SSI-TX-104', type: 'selective', verifyingParty: 'Alpha Bank Corp', status: 'verified', timestamp: '2 mins ago' },
    { id: 'SSI-TX-103', type: 'zkp', verifyingParty: 'Cozy Rentals Ltd', status: 'minimized', timestamp: '15 mins ago' },
    { id: 'SSI-TX-102', type: 'did', verifyingParty: 'SecureGov Portal', status: 'tamper_check_passed', timestamp: '1 hour ago' }
  ]);

  const getPortalIcon = (type: string) => {
    switch(type) {
      case 'selective': return <EyeOff className="w-5 h-5 text-[#354CE1]" />;
      case 'p2p': return <Users className="w-5 h-5 text-teal-600" />;
      case 'zkp': return <Lock className="w-5 h-5 text-purple-600" />;
      case 'minimization': return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      case 'tamper': return <CheckCircle2 className="w-5 h-5 text-amber-600" />;
      case 'portability': return <Smartphone className="w-5 h-5 text-rose-600" />;
      default: return <HelpCircle className="w-5 h-5 text-slate-600" />;
    }
  };

  const cards = [
    { 
      type: 'selective', 
      label: t.cardSelectiveLabel, 
      desc: t.cardSelectiveDesc,
      iconBg: 'bg-indigo-50/80 group-hover:bg-indigo-100'
    },
    { 
      type: 'p2p', 
      label: t.cardP2pLabel, 
      desc: t.cardP2pDesc,
      iconBg: 'bg-teal-50/80 group-hover:bg-teal-100'
    },
    { 
      type: 'zkp', 
      label: t.cardZkpLabel, 
      desc: t.cardZkpDesc,
      iconBg: 'bg-purple-50/80 group-hover:bg-purple-100'
    },
    { 
      type: 'minimization', 
      label: t.cardMinimizationLabel, 
      desc: t.cardMinimizationDesc,
      iconBg: 'bg-emerald-50/80 group-hover:bg-emerald-100'
    },
    { 
      type: 'tamper', 
      label: t.cardTamperLabel, 
      desc: t.cardTamperDesc,
      iconBg: 'bg-amber-50/80 group-hover:bg-amber-100'
    },
    { 
      type: 'portability', 
      label: t.cardPortabilityLabel, 
      desc: t.cardPortabilityDesc,
      iconBg: 'bg-rose-50/80 group-hover:bg-rose-100'
    }
  ];

  return (
    <section id="privacy" className="bg-[#FAFBFD] py-20 md:py-28 overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 space-y-14">
        
        {/* Top Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#354CE1] bg-[#E2E6FF] px-3.5 py-1.5 rounded-full">
            {t.privacyBadge}
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight">
            {t.privacyTitle}
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed font-sans">
            {t.privacyDesc}
          </p>

          <div className="flex justify-center gap-4 pt-2">
            <button
              id="privacy-sandbox-btn"
              onClick={onOpenSandbox}
              className="bg-[#354CE1] hover:bg-[#2539BE] text-white font-semibold text-xs px-5 py-2.5 rounded-full shadow flex items-center gap-1.5 transition cursor-pointer"
            >
              {t.exploreSsi}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Outer frame of Privacy Portal mockup */}
        <div className="max-w-7xl mx-auto bg-white rounded-3xl border border-slate-200/80 p-6 md:p-10 shadow-xl space-y-8 relative">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-50 p-1.5 rounded-lg text-indigo-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-slate-900 text-base">{t.privacyTrustArch}</h3>
                <p className="text-[10px] text-slate-400 font-mono uppercase">{t.decentralizedSsi}</p>
              </div>
            </div>

            <div className="text-xs text-slate-500 font-medium hidden sm:inline-flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              {t.ssiWalletCompliant}
            </div>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {cards.map((card, i) => (
              <div 
                key={i} 
                className="border border-slate-100/85 p-6 rounded-2xl flex flex-col justify-between transition text-left group bg-white/70 hover:border-indigo-100/80 hover:shadow-lg hover:shadow-indigo-500/5 duration-300"
              >
                <div className="space-y-4">
                  <div className={`p-2.5 rounded-xl w-fit transition-colors duration-300 ${card.iconBg}`}>
                    {getPortalIcon(card.type)}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 leading-snug">
                      {card.label}
                    </h4>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Real-time Status Queue */}
          <div className="border-t border-slate-100 pt-6">
            <h4 className="text-xs font-bold text-slate-900 mb-3 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-indigo-600" />
              {t.activeSsiAudits}
            </h4>

            <div className="bg-slate-50 rounded-xl border border-slate-200/60 overflow-hidden">
              <div className="grid grid-cols-4 bg-slate-100 p-2.5 text-[10px] font-mono text-slate-500 font-semibold border-b border-slate-200">
                <span>{t.txHash}</span>
                <span>{t.verificationType}</span>
                <span>{t.requestingParty}</span>
                <span className="text-right">{t.ssiHandshake}</span>
              </div>

              <div className="divide-y divide-slate-100/80">
                {logs.map((log, i) => (
                  <div key={i} className="grid grid-cols-4 p-3 text-xs text-slate-700 items-center font-mono bg-white">
                    <span className="font-semibold text-slate-900">{log.id}</span>
                    <span className="text-[11px]">
                      {log.type === 'selective' ? t.cardSelectiveLabel :
                       log.type === 'zkp' ? t.cardZkpLabel :
                       t.didHandshake}
                    </span>
                    <span className="truncate text-[11px] pr-2 text-slate-500">{log.verifyingParty}</span>
                    <span className="text-right">
                      <span className={`text-[9px] font-bold font-mono px-2 py-0.5 rounded-full ${
                        log.status === 'verified' ? 'bg-emerald-100 text-emerald-800' :
                        log.status === 'minimized' ? 'bg-indigo-100 text-indigo-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {log.status === 'verified' ? t.provedIssued :
                         log.status === 'minimized' ? t.zkpOk : t.passed}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
