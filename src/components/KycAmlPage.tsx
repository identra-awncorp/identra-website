/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  Coins,
  CreditCard,
  FileCheck,
  Landmark,
  RefreshCw,
  Search,
  ShieldAlert,
  Sparkles,
  Users
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { KYC_AML_PAGE_TRANSLATIONS } from '../translations/KycAmlPageTranslations';

interface KycAmlPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

type CycleTab = 'onboarding' | 'lifecycle';
type InquiryStatus = 'review' | 'approved' | 'declined';

const industryIcons = {
  banking: Landmark,
  institutions: Building2,
  crypto: Coins,
  payments: CreditCard,
  movement: RefreshCw,
  lending: Building
};

const accordionIcons = {
  'kyc-kyb': Users,
  monitoring: Search,
  'due-diligence': FileCheck
};

const resourceToneClasses = [
  'text-indigo-600 bg-indigo-50',
  'text-amber-600 bg-amber-50',
  'text-emerald-600 bg-emerald-50'
];

export default function KycAmlPage({ onOpenSandbox, onBackToLanding, onViewChange }: KycAmlPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(KYC_AML_PAGE_TRANSLATIONS, language as keyof typeof KYC_AML_PAGE_TRANSLATIONS, 'KYC_AML_PAGE_TRANSLATIONS');

  const [activeCycleTab, setActiveCycleTab] = useState<CycleTab>('onboarding');
  const [expandedAccordion, setExpandedAccordion] = useState('kyc-kyb');
  const [inquiryStatus, setInquiryStatus] = useState<InquiryStatus>('review');
  const [amlMatchAction, setAmlMatchAction] = useState(false);
  const [activeIndustry, setActiveIndustry] = useState('banking');

  const activeIndustryStat = t.industries.find((industry) => industry.id === activeIndustry)?.stat;
  const activeLifeCycleCards = activeCycleTab === 'onboarding' ? t.lifeCycle.onboardingCards : t.lifeCycle.lifecycleCards;

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-slate-800 antialiased selection:bg-[#354CE1]/10 selection:text-[#354CE1]">
      <section className="relative overflow-hidden bg-gradient-to-tr from-[#354CE1] via-[#5F3CF3] to-[#00D4B2] text-white pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)]" />
        <div className="absolute top-1/4 left-1/10 w-48 h-48 bg-yellow-400/25 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/10 w-72 h-72 bg-[#00E5FF]/20 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <button
            onClick={onBackToLanding}
            className="group inline-flex items-center gap-2 text-blue-100 hover:text-white text-xs font-semibold mb-8 transition"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            {t.backToPlatform}
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-[11px] font-bold tracking-wider text-yellow-300 uppercase border border-white/25 shadow-sm">
                <ClipboardCheck className="w-3.5 h-3.5 text-yellow-300" />
                {t.badge}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-medium tracking-tight text-white leading-[1.1]">
                {t.heroTitle}
              </h1>
              <p className="text-base sm:text-lg text-indigo-100 max-w-xl font-normal leading-relaxed">
                {t.heroDesc}
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={onOpenSandbox}
                  className="bg-white hover:bg-indigo-50 text-[#1e3dc5] font-semibold text-sm px-7 py-3.5 rounded-full transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-950/20"
                >
                  {t.getDemo}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onOpenSandbox}
                  className="border border-white/20 hover:bg-white/10 text-white font-semibold text-sm px-7 py-3.5 rounded-full transition flex items-center justify-center gap-1"
                >
                  {t.trySandbox}
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-5 shadow-2xl relative overflow-hidden text-slate-300 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="text-[10px] text-slate-500 ml-2">{t.heroMockup.engine}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-[#354CE1] bg-[#354CE1]/15 px-2 py-0.5 rounded-md border border-[#354CE1]/20 font-bold">
                    <Sparkles className="w-3 h-3" />
                    {t.heroMockup.autopilot}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-start bg-slate-950/40 p-3 rounded-lg border border-slate-800">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase">{t.heroMockup.subjectLabel}</p>
                      <p className="text-sm font-bold text-white mt-1">{t.heroMockup.subjectName}</p>
                      <p className="text-[10px] text-slate-400">{t.heroMockup.subjectId}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-500 uppercase">{t.heroMockup.riskLabel}</p>
                      <span className="inline-block mt-1 bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-md text-[10px] font-bold">
                        {t.heroMockup.riskValue}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">{t.heroMockup.logsLabel}</p>
                    <div className="grid grid-cols-1 gap-2">
                      {t.heroMockup.checks.map((check, index) => {
                        const isWarning = index === 2;
                        const Icon = isWarning ? AlertTriangle : CheckCircle2;
                        return (
                          <div key={check.label} className="flex items-center justify-between bg-slate-950/20 px-3 py-2 rounded-lg border border-slate-800">
                            <div className="flex items-center gap-2">
                              <Icon className={`w-4 h-4 shrink-0 ${isWarning ? 'text-amber-400' : 'text-emerald-400'}`} />
                              <span className="text-slate-200">{check.label}</span>
                            </div>
                            <span className={`text-[10px] font-bold ${isWarning ? 'text-amber-400 animate-pulse' : 'text-emerald-400'}`}>
                              {check.status}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-[#354CE1]/10 border border-[#354CE1]/30 p-3 rounded-xl flex flex-col gap-2 mt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest">{t.heroMockup.decisionTitle}</span>
                      <span className="text-[9px] text-slate-400">{t.heroMockup.matchAccuracy}</span>
                    </div>
                    <p className="text-[10px] text-indigo-100 leading-relaxed font-sans">{t.heroMockup.decisionDesc}</p>
                    {amlMatchAction && <p className="text-[10px] text-emerald-300 font-sans font-semibold">{t.heroMockup.actionQueued}</p>}
                    <div className="flex gap-2 mt-1">
                      <button
                        onClick={() => {
                          setAmlMatchAction(true);
                          onOpenSandbox();
                        }}
                        className="flex-1 bg-white hover:bg-slate-100 text-[#1e3dc5] rounded-lg py-1.5 font-sans font-bold text-[10px] transition text-center"
                      >
                        {t.heroMockup.fileSar}
                      </button>
                      <button
                        onClick={onOpenSandbox}
                        className="flex-1 border border-white/20 hover:bg-white/5 text-white rounded-lg py-1.5 font-sans font-medium text-[10px] transition text-center"
                      >
                        {t.heroMockup.overrideApprove}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#112690] border-t border-indigo-500/20 pb-16 pt-8 text-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.pillars.map((pillar) => (
              <div key={pillar.label} className="space-y-3 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition duration-300">
                <h4 className="font-bold text-sm text-indigo-200 uppercase tracking-wide">{pillar.label}</h4>
                <p className="text-base font-semibold text-white">{pillar.title}</p>
                <p className="text-xs text-indigo-100/80 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-white/15 flex flex-wrap items-center justify-between gap-6 opacity-80">
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-200">{t.trustedBy}</p>
            <div className="flex items-center gap-8 text-sm font-bold tracking-widest text-indigo-200">
              {t.brands.map((brand) => (
                <span key={brand} className="hover:text-white transition cursor-default">{brand}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-medium tracking-tight text-slate-900 leading-tight">
            {t.processTitle}
          </h2>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">{t.processDesc}</p>
        </div>

        <div className="space-y-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <FeatureText feature={t.features[0]} />
            </div>

            <div className="lg:col-span-6 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/60 relative">
              <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                {t.controlsMockup.livePreview}
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">{t.controlsMockup.title}</h4>
              <div className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 gap-3">
                  <span className="font-semibold text-slate-800">{t.controlsMockup.strictness}</span>
                  <select value={t.controlsMockup.high} onChange={() => undefined} className="bg-slate-50 border border-slate-200 rounded-md py-1 px-2 text-[11px] font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                    <option>{t.controlsMockup.exact}</option>
                    <option>{t.controlsMockup.high}</option>
                    <option>{t.controlsMockup.standard}</option>
                  </select>
                </div>
                {[t.controlsMockup.selfie, t.controlsMockup.expired].map((label) => (
                  <div key={label} className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="font-semibold text-slate-800">{label}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked readOnly />
                      <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#354CE1]" />
                    </label>
                  </div>
                ))}
                <div className="bg-[#354CE1]/5 rounded-xl p-3 border border-[#354CE1]/10 text-[11px] text-[#354CE1] flex items-start gap-2">
                  <span className="font-bold flex items-center gap-1"><Check className="w-3.5 h-3.5" />{t.controlsMockup.saved}</span>
                  <span className="text-slate-600 font-sans leading-relaxed">{t.controlsMockup.savedDesc}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 order-last lg:order-first bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/60 relative">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">{t.routingMockup.title}</h4>
                  <span className="text-[10px] text-[#354CE1] font-semibold">{t.routingMockup.active}</span>
                </div>
                {t.routingMockup.rows.map((row, index) => (
                  <div key={row.title} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">{row.code}</div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">{row.title}</p>
                        <p className="text-[10px] text-slate-400">{row.subtitle}</p>
                      </div>
                    </div>
                    <div className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border ${index === 0 ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : index === 1 ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
                      {row.path}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <FeatureText feature={t.features[1]} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-[#354CE1] rounded-full text-[10px] font-bold tracking-wider uppercase">
                {t.features[2].badge}
              </div>
              <h3 className="text-xl sm:text-2xl font-sans font-semibold text-slate-900">{t.features[2].title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{t.features[2].desc}</p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button onClick={() => setInquiryStatus('approved')} className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${inquiryStatus === 'approved' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {t.features[2].approve}
                </button>
                <button onClick={() => setInquiryStatus('declined')} className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${inquiryStatus === 'declined' ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {t.features[2].decline}
                </button>
                <button onClick={() => setInquiryStatus('review')} className="px-4 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-800 transition">
                  {t.features[2].reset}
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/60">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-xs">
                <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.caseMockup.label}</span>
                    <h5 className="font-bold text-slate-800 text-sm">{t.caseMockup.name}</h5>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    inquiryStatus === 'review' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                    inquiryStatus === 'approved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 animate-bounce' :
                    'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {t.caseMockup.statuses[inquiryStatus]}
                  </span>
                </div>

                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-[11px]">
                    <CaseMeta label={t.caseMockup.jurisdiction} value={t.caseMockup.jurisdictionValue} />
                    <CaseMeta label={t.caseMockup.databaseMatch} value={t.caseMockup.databaseValue} />
                  </div>

                  <div className="border border-slate-100 rounded-xl overflow-hidden">
                    <div className="bg-slate-50/50 p-2 font-bold text-[10px] text-slate-500 uppercase border-b border-slate-100 flex justify-between">
                      <span>{t.caseMockup.verificationCheck}</span>
                      <span>{t.caseMockup.matchStatus}</span>
                    </div>
                    <div className="divide-y divide-slate-100 text-[11px]">
                      {t.caseMockup.checks.map((check, index) => (
                        <div key={check.label} className={`p-2.5 flex items-center justify-between ${index === 2 ? 'bg-amber-50/40' : ''}`}>
                          <span className={`text-slate-700 ${index === 2 ? 'font-semibold' : ''}`}>{check.label}</span>
                          <span className={`font-bold ${index === 2 ? 'text-amber-600' : 'text-emerald-600'}`}>{check.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400 space-y-1 bg-slate-50 p-2.5 rounded-lg">
                    <p className="font-bold uppercase text-slate-500">{t.caseMockup.auditTitle}</p>
                    {t.caseMockup.logs.map((log) => <p key={log}>{log}</p>)}
                    {inquiryStatus === 'approved' && <p className="text-emerald-600 font-semibold">{t.caseMockup.approvedLog}</p>}
                    {inquiryStatus === 'declined' && <p className="text-red-600 font-semibold">{t.caseMockup.declinedLog}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-tr from-[#112690] to-[#1e3dc5] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(53,76,225,0.35),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-medium tracking-tight text-white leading-snug">{t.lifeCycle.title}</h2>
            <p className="text-sm text-indigo-100 max-w-md mx-auto">{t.lifeCycle.desc}</p>
          </div>

          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-white/10 p-1 rounded-full border border-white/10 backdrop-blur-md">
              {(['onboarding', 'lifecycle'] as CycleTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveCycleTab(tab)}
                  className={`px-6 py-2 rounded-full text-xs font-bold transition ${activeCycleTab === tab ? 'bg-white text-[#112690] shadow' : 'text-indigo-200 hover:text-white'}`}
                >
                  {t.lifeCycle.tabs[tab]}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCycleTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {activeLifeCycleCards.map((card, index) => {
                const Icon = activeCycleTab === 'onboarding' ? (index === 0 ? Users : Building2) : (index === 0 ? RefreshCw : ShieldAlert);
                return (
                  <LifeCycleCard key={card.title} card={card} icon={<Icon className="w-5 h-5" />} />
                );
              })}
            </motion.div>
          </AnimatePresence>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
            {t.lifeCycle.platformCards.map((card) => (
              <div key={card.title} className="bg-[#0b1961] p-5 rounded-xl border border-white/10 text-xs">
                <span className="text-[10px] font-bold text-indigo-300 block mb-2 uppercase">{card.label}</span>
                <p className="text-white font-semibold mb-1">{card.title}</p>
                <p className="text-indigo-200 text-[11px]">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 border-y border-slate-200/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-sans font-medium tracking-tight text-slate-900 leading-tight">{t.accordionIntro.title}</h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto">{t.accordionIntro.desc}</p>
          </div>

          <div className="space-y-4">
            {t.accordions.map((section) => {
              const Icon = accordionIcons[section.id as keyof typeof accordionIcons];
              const isExpanded = expandedAccordion === section.id;
              return (
                <div key={section.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                  <button
                    onClick={() => setExpandedAccordion(isExpanded ? '' : section.id)}
                    className="w-full text-left p-6 flex items-center justify-between hover:bg-slate-50/50 transition focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#354CE1]/10 flex items-center justify-center text-[#354CE1]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-slate-800 text-sm sm:text-base">{section.title}</span>
                    </div>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden border-t border-slate-100"
                      >
                        <div className="p-6 bg-[#FAFBFD]/50 text-xs text-slate-600 space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            {section.cards.map((card) => (
                              <div key={card.title} className="space-y-3 bg-white p-4 rounded-xl border border-slate-200">
                                <p className="font-bold text-slate-800 text-sm">{card.title}</p>
                                <p className="leading-relaxed">{card.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-4 sticky top-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-[#354CE1] rounded-full text-[10px] font-bold tracking-wider uppercase">
              {t.industriesIntro.badge}
            </div>
            <h2 className="text-2xl sm:text-3xl font-sans font-medium tracking-tight text-slate-900 leading-tight">{t.industriesIntro.title}</h2>
            <p className="text-sm text-slate-500 leading-relaxed">{t.industriesIntro.desc}</p>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60 mt-6">
              <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-1">{t.industriesIntro.benchmark}</span>
              <p className="text-lg font-bold text-[#354CE1]">{activeIndustryStat}</p>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            {t.industries.map((industry) => {
              const IndIcon = industryIcons[industry.id as keyof typeof industryIcons];
              const isActive = activeIndustry === industry.id;
              return (
                <div
                  key={industry.id}
                  onClick={() => setActiveIndustry(industry.id)}
                  className={`p-5 rounded-2xl border transition cursor-pointer flex items-start gap-4 ${isActive ? 'bg-white border-[#354CE1] shadow-md shadow-indigo-100/40' : 'bg-white/50 hover:bg-white border-slate-200 hover:border-slate-300'}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition ${isActive ? 'bg-[#354CE1] text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <IndIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-sm font-bold ${isActive ? 'text-[#354CE1]' : 'text-slate-800'}`}>{industry.title}</h4>
                      <ArrowRight className={`w-4 h-4 transition-transform ${isActive ? 'text-[#354CE1] translate-x-1' : 'text-slate-300'}`} />
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{industry.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-100/60 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <p className="text-base sm:text-lg italic text-slate-700 leading-relaxed font-sans font-medium">
                &quot;{t.testimonial.quote}&quot;
              </p>
              <div>
                <p className="text-xs font-bold text-slate-900">{t.testimonial.author}</p>
                <p className="text-[10px] text-slate-500 uppercase font-mono mt-0.5">{t.testimonial.role}</p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl" />
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-indigo-500/20 rounded-md border border-indigo-500/30 text-[9px] font-bold text-indigo-300">
                  <Landmark className="w-3.5 h-3.5" />
                  {t.testimonial.badge}
                </div>
                <h4 className="font-bold text-sm sm:text-base leading-snug">{t.testimonial.title}</h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">{t.testimonial.desc}</p>
                <button onClick={onOpenSandbox} className="inline-flex items-center gap-1.5 text-xs text-indigo-300 hover:text-white font-bold transition pt-2">
                  {t.testimonial.cta}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[10px] font-bold text-[#354CE1] uppercase tracking-wider block mb-2">{t.resourcesIntro.badge}</span>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium tracking-tight text-slate-900">{t.resourcesIntro.title}</h2>
            </div>
            <button
              onClick={() => onViewChange?.('ebooks')}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#354CE1] hover:text-[#2539BE] transition"
            >
              {t.resourcesIntro.cta}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.resources.map((resource, index) => (
              <div key={resource.title} className="group bg-[#FAFBFD] rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition duration-300 flex flex-col justify-between h-full">
                <div className="p-6 space-y-4">
                  <div className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase px-2.5 py-1 rounded-md ${resourceToneClasses[index]}`}>
                    {resource.meta}
                  </div>
                  <h4 className="font-bold text-sm sm:text-base text-slate-900 leading-snug group-hover:text-[#354CE1] transition duration-200">{resource.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{resource.desc}</p>
                </div>
                <div className="p-6 pt-0">
                  <button onClick={onOpenSandbox} className="text-xs font-bold text-slate-800 group-hover:text-[#354CE1] transition inline-flex items-center gap-1">
                    {resource.cta}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 text-center mb-8">{t.exploreTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.exploreCards.map((card, index) => (
              <div
                key={card.title}
                onClick={() => index === 0 ? onViewChange?.('government-id') : onOpenSandbox()}
                className={`p-8 rounded-3xl text-white cursor-pointer transition shadow-lg relative overflow-hidden group min-h-[160px] flex flex-col justify-between ${index === 0 ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-amber-600 hover:bg-amber-700'}`}
              >
                <div className="space-y-2">
                  <span className={`text-[9px] font-bold uppercase tracking-widest ${index === 0 ? 'text-emerald-100' : 'text-amber-100 font-mono'}`}>{card.label}</span>
                  <h4 className="text-lg sm:text-xl font-bold">{card.title}</h4>
                  <p className={`text-xs max-w-sm font-sans ${index === 0 ? 'text-emerald-100/90' : 'text-amber-100/90'}`}>{card.desc}</p>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <span className="text-xs font-bold border-b border-white pb-0.5">{card.cta}</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-indigo-900 to-[#112690] text-white rounded-[2.5rem] p-8 sm:p-12 md:p-16 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(53,76,225,0.4),transparent_60%)] animate-pulse" />
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-indigo-500/15 rounded-full blur-2xl" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-medium tracking-tight">{t.cta.title}</h2>
              <p className="text-sm text-indigo-100 leading-relaxed font-sans max-w-md mx-auto">{t.cta.desc}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button onClick={onOpenSandbox} className="w-full sm:w-auto bg-white hover:bg-indigo-50 text-[#112690] font-bold text-sm px-8 py-4 rounded-full transition shadow-lg">
                  {t.cta.primary}
                </button>
                <button onClick={onOpenSandbox} className="w-full sm:w-auto border border-white/20 hover:bg-white/10 text-white font-bold text-sm px-8 py-4 rounded-full transition flex items-center justify-center gap-1">
                  {t.cta.secondary}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureText({ feature }: { feature: { badge: string; title: string; desc: string; bullets?: readonly string[] } }) {
  return (
    <>
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-[#354CE1] rounded-full text-[10px] font-bold tracking-wider uppercase">
        {feature.badge}
      </div>
      <h3 className="text-xl sm:text-2xl font-sans font-semibold text-slate-900">{feature.title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
      {feature.bullets && (
        <ul className="space-y-3 pt-2">
          {feature.bullets.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-xs text-slate-700">
              <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                <Check className="w-3.5 h-3.5" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function CaseMeta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-slate-400 block text-[10px] uppercase">{label}</span>
      <span className="font-semibold text-slate-800">{value}</span>
    </div>
  );
}

type LifeCycleCardProps = {
  card: { title: string; subtitle: string; items: readonly { title: string; desc: string }[] };
  icon: React.ReactNode;
};

const LifeCycleCard: React.FC<LifeCycleCardProps> = ({
  card,
  icon
}) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-300">
          {icon}
        </div>
        <div>
          <h4 className="font-bold text-white text-base">{card.title}</h4>
          <p className="text-xs text-indigo-200">{card.subtitle}</p>
        </div>
      </div>
      <div className="space-y-4 text-xs text-indigo-100/90">
        {card.items.map((item) => (
          <div key={item.title} className="p-3 bg-white/5 rounded-xl border border-white/10">
            <p className="font-bold text-white mb-1">{item.title}</p>
            <p className="text-[11px]">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
