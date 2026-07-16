/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import type { AppView } from '../types/routes';
import React, { useState } from 'react';
import { 
  ArrowRight, Check, ShieldCheck, Cpu, ArrowLeft, RefreshCw, Layers, CheckCircle2, 
  Users, Globe, Search, Eye, AlertCircle, Sparkles, Smartphone, Landmark,
  Shield, CreditCard, ShieldAlert, BookOpen, ChevronDown, ChevronUp, Database, FileText, 
  Activity, Fingerprint, Lock, ShieldCheck as VerifiedIcon, Scale, Play, Trash2, Wallet, Coins
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { CRYPTOCURRENCY_TRANSLATIONS } from '../translations/CryptocurrencyPageTranslations';

interface CryptocurrencyPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

interface CryptocurrencyApplicant {
  walletCheck: 'low' | 'medium' | 'sanctioned';
  kycAmlStatus: 'verified' | 'requiresSelfie' | 'blocked';
  riskScore: number;
  status: 'approve' | 'review' | 'block';
}

const APPLICANT_SCENARIOS: Record<string, CryptocurrencyApplicant> = {
  good: {
    walletCheck: 'low',
    kycAmlStatus: 'verified',
    riskScore: 4,
    status: 'approve',
  },
  review: {
    walletCheck: 'medium',
    kycAmlStatus: 'requiresSelfie',
    riskScore: 52,
    status: 'review',
  },
  block: {
    walletCheck: 'sanctioned',
    kycAmlStatus: 'blocked',
    riskScore: 99,
    status: 'block',
  }
};

export default function CryptocurrencyPage({ onOpenSandbox, onBackToLanding, onViewChange }: CryptocurrencyPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(CRYPTOCURRENCY_TRANSLATIONS, language as keyof typeof CRYPTOCURRENCY_TRANSLATIONS, 'CRYPTOCURRENCY_TRANSLATIONS');
  const getScenario = (key: string) => ({
    ...APPLICANT_SCENARIOS[key],
    ...t.scenarios[key],
  });

  // Simulator State
  const [activeScenarioKey, setActiveScenarioKey] = useState<string>('good');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);
  
  // Custom Demo Form State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [demoRequested, setDemoRequested] = useState(false);

  const simulationSteps = React.useMemo(() => {
    const applicant = getScenario(activeScenarioKey);

    return [
      t.logs.step1,
      t.logs.wallet.replace('{walletCheck}', t.walletChecks[applicant.walletCheck]),
      t.logs.step2,
      t.logs.watchlist.replace('{match}', applicant.kycAmlStatus === 'blocked' ? t.identityMatch.found : t.identityMatch.clean),
      t.logs.step3,
      t.logs.signal.replace('{ip}', applicant.ip),
      t.logs.step4,
      t.logs.decision.replace('{risk}', String(applicant.riskScore)).replace('{status}', t.statuses[applicant.status].toUpperCase())
    ];
  }, [activeScenarioKey, t]);
  const simulationLogs = simulationSteps.slice(0, simStep);

  const startSimulator = (key: string) => {
    setActiveScenarioKey(key);
    setIsSimulating(true);
    setSimStep(0);

    let current = 0;
    const interval = setInterval(() => {
      setSimStep(current + 1);
      current++;
      if (current >= simulationSteps.length) {
        clearInterval(interval);
      }
    }, 1000);
  };

  const resetSimulator = () => {
    setIsSimulating(false);
    setSimStep(0);
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !companyName) {
      alert(t.formError);
      return;
    }
    setDemoRequested(true);
  };

  const activeApplicant = getScenario(activeScenarioKey);

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-slate-800 antialiased selection:bg-[#354CE1]/10 selection:text-[#354CE1]">
      
      {/* 1. Header Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-tr from-[#0F2256] via-[#102D71] to-[#1746B3] text-white pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="absolute top-1/4 left-1/12 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/12 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <button 
            onClick={onBackToLanding}
            className="group inline-flex items-center gap-2 text-blue-200 hover:text-white text-xs font-semibold mb-8 transition"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            {t.backToPlatform}
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-[11px] font-bold tracking-wider text-emerald-300 uppercase border border-white/15 shadow-sm">
                <Coins className="w-3.5 h-3.5 text-emerald-300" />
                {t.badge}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5.5xl font-sans font-semibold tracking-tight text-white leading-[1.12]">
                {t.heroTitle}
              </h1>
              <p className="text-base sm:text-lg text-blue-100/90 max-w-xl font-normal leading-relaxed">
                {t.heroDesc}
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={onOpenSandbox}
                  className="bg-white hover:bg-emerald-50 text-[#0F2256] font-semibold text-sm px-7 py-3.5 rounded-full transition flex items-center justify-center gap-2 shadow-lg shadow-blue-950/20"
                >
                  {t.getDemo}
                  <ArrowRight className="w-4 h-4 text-[#0F2256]" />
                </button>
                <button
                  onClick={onOpenSandbox}
                  className="border border-white/20 hover:bg-white/10 text-white font-semibold text-sm px-7 py-3.5 rounded-full transition flex items-center justify-center gap-1"
                >
                  {t.trySandbox}
                </button>
              </div>
            </div>

            {/* Simulated Live Crypto Risk Engine (On-Chain + Off-Chain Friction Control Terminal) */}
            <div className="lg:col-span-5">
              <div className="bg-[#050D24] rounded-2xl border border-blue-900/40 p-5 shadow-[0_20px_50px_rgba(15,34,86,0.5)] relative overflow-hidden text-slate-200 font-mono text-xs">
                {/* Terminal Header */}
                <div className="flex items-center justify-between border-b border-blue-950 pb-3 mb-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="text-[10px] text-slate-500 ml-2">{t.terminalName}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20 font-semibold">
                    <Activity className="w-3 h-3 text-emerald-400" />
                    {t.onChainLive}
                  </div>
                </div>

                {!isSimulating ? (
                  <div className="space-y-4 font-sans">
                    <p className="text-slate-400 text-xs font-mono">{t.scenarioPrompt}</p>
                    
                    <div className="grid grid-cols-1 gap-2">
                      <button 
                        onClick={() => startSimulator('good')}
                        className="p-3 text-left bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 rounded-xl transition flex items-center justify-between"
                      >
                        <div>
                          <p className="text-xs font-semibold text-emerald-400">{t.scenarios.good.title}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{t.scenarios.good.subtitle}</p>
                        </div>
                        <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                      </button>

                      <button 
                        onClick={() => startSimulator('review')}
                        className="p-3 text-left bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 rounded-xl transition flex items-center justify-between"
                      >
                        <div>
                          <p className="text-xs font-semibold text-amber-400">{t.scenarios.review.title}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{t.scenarios.review.subtitle}</p>
                        </div>
                        <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
                      </button>

                      <button 
                        onClick={() => startSimulator('block')}
                        className="p-3 text-left bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 rounded-xl transition flex items-center justify-between"
                      >
                        <div>
                          <p className="text-xs font-semibold text-red-400">{t.scenarios.block.title}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{t.scenarios.block.subtitle}</p>
                        </div>
                        <Play className="w-4 h-4 text-red-400 fill-red-400" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-slate-950/60 p-3 rounded-xl border border-blue-950">
                      <div>
                        <h4 className="text-xs font-bold text-white font-sans">{activeApplicant.name}</h4>
                        <p className="text-[10px] text-slate-500 font-sans mt-0.5">{activeApplicant.type} &bull; {activeApplicant.wallet}</p>
                      </div>
                      <span className={`text-[10px] font-sans px-2.5 py-0.5 rounded-full font-bold border ${
                        activeApplicant.status === 'approve' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                        activeApplicant.status === 'review' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                        'bg-red-500/10 border-red-500/20 text-red-400'
                      }`}>
                        {t.statuses[activeApplicant.status].toUpperCase()}
                      </span>
                    </div>

                    <div className="space-y-1.5 min-h-[160px] max-h-[180px] overflow-y-auto pr-1">
                      {simulationLogs.map((log, idx) => (
                        <motion.div 
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          key={idx} 
                          className="flex items-start gap-2 text-[10px]"
                        >
                          <span className="text-emerald-500 font-bold mt-0.5 select-none">&gt;</span>
                          <span className={idx === simulationLogs.length - 1 ? "text-white font-semibold" : "text-slate-400"}>{log}</span>
                        </motion.div>
                      ))}
                    </div>

                    {simStep < 8 ? (
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 pt-2 border-t border-slate-900">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                        <span>{t.queryProgress}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2 pt-2 border-t border-slate-900 font-sans">
                        <div className="text-xs text-white font-semibold mb-1">{t.decisionBreakdown}</div>
                        <ul className="space-y-1 text-[10px] text-slate-300 font-mono">
                          {activeApplicant.details.map((detail: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-emerald-500">&bull;</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-900/50">
                          <div className="flex items-center gap-1 text-[10px]">
                            <span className="text-slate-500 font-mono">{t.riskScore}</span>
                            <span className={`font-bold font-mono ${
                              activeApplicant.riskScore < 20 ? 'text-emerald-400' :
                              activeApplicant.riskScore < 70 ? 'text-amber-400' :
                              'text-red-400'
                            }`}>{activeApplicant.riskScore}/100</span>
                          </div>
                          <button
                            onClick={resetSimulator}
                            className="text-[10px] font-sans font-semibold text-slate-400 hover:text-white px-3 py-1 hover:bg-slate-900 border border-slate-800 rounded-lg transition"
                          >
                            {t.runAnother}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badge Bar */}
      <section className="bg-[#0B1530] border-b border-blue-950/40 py-8 text-white/60">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs font-semibold tracking-wider uppercase text-center md:text-left">
            {t.trustedBy}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <span className="text-lg md:text-2xl font-bold tracking-tight text-white/90">BitGo</span>
            <span className="text-lg md:text-2xl font-bold tracking-tight text-white/90">Bridge <span className="text-xs font-normal text-slate-400">{t.bridgeStripe}</span></span>
            <span className="text-lg md:text-2xl font-bold tracking-tight text-white/90 uppercase">CELESTIA</span>
          </div>
        </div>
      </section>

      {/* 2. Three Row Layout (Differentiators) */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 space-y-24">
          
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-sans font-semibold text-slate-900 tracking-tight">
                {t.rows[0].title}
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                {t.rows[0].desc}
              </p>
            </div>
            <div className="bg-[#F4F6FC] rounded-2xl p-8 border border-slate-100 flex flex-col gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#354CE1]/10 rounded-xl text-[#354CE1]">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{t.rows[0].cardTitle}</h4>
                  <p className="text-xs text-slate-500">{t.rows[0].cardDesc}</p>
                </div>
              </div>
              <div className="p-4 bg-white rounded-xl border border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{t.rows[0].metricLabel}</span>
                  <span className="text-emerald-500 font-bold">{t.rows[0].metricValue}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-2 w-1/4 rounded-full" />
                </div>
                <p className="text-[10px] text-slate-500 italic">{t.rows[0].note}</p>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
            <div className="space-y-4 md:order-2">
              <h2 className="text-2xl md:text-3xl font-sans font-semibold text-slate-900 tracking-tight">
                {t.rows[1].title}
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                {t.rows[1].desc}
              </p>
            </div>
            <div className="bg-[#FAFBFD] rounded-2xl p-8 border border-slate-100 flex flex-col gap-4 shadow-sm md:order-1">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-100 rounded-xl text-[#354CE1]">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{t.rows[1].cardTitle}</h4>
                  <p className="text-xs text-slate-500">{t.rows[1].cardDesc}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-white border border-slate-100 rounded-xl text-center">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">{t.rows[1].metricOneLabel}</span>
                  <span className="text-xs font-bold text-emerald-500">{t.rows[1].metricOneValue}</span>
                </div>
                <div className="p-3 bg-white border border-slate-100 rounded-xl text-center">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">{t.rows[1].metricTwoLabel}</span>
                  <span className="text-xs font-bold text-emerald-500">{t.rows[1].metricTwoValue}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-sans font-semibold text-slate-900 tracking-tight">
                {t.rows[2].title}
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                {t.rows[2].desc}
              </p>
            </div>
            <div className="bg-[#F4F6FC] rounded-2xl p-8 border border-slate-100 flex flex-col gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-100 rounded-xl text-blue-600">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{t.rows[2].cardTitle}</h4>
                  <p className="text-xs text-slate-500">{t.rows[2].cardDesc}</p>
                </div>
              </div>
              <div className="p-4 bg-white rounded-xl border border-slate-100 text-xs space-y-2">
                <div className="flex items-center gap-2 text-slate-600">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>{t.rows[2].ruleLabel}</span>
                </div>
                <div className="pl-4 border-l-2 border-slate-100 space-y-1.5 text-slate-500 text-[11px]">
                  {t.rows[2].steps.map((step: string, idx: number) => (
                    <div key={idx}>{step}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Core Platforms Grid (6 items inside a beautiful rounded card layout) */}
      <section className="py-20 bg-[#F0F2FB]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-3xl border border-slate-200/60 p-8 md:p-12 shadow-sm space-y-10">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-xs font-bold text-[#354CE1] uppercase tracking-wider block">{t.platformBadge}</span>
              <h2 className="text-2xl md:text-3xl font-sans font-semibold text-slate-950">
                {t.platformTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              
              {/* Card 1 */}
              <div className="p-6 rounded-2xl hover:bg-slate-50 border border-slate-100 transition flex flex-col gap-4">
                <div className="p-3 bg-[#354CE1]/10 text-[#354CE1] rounded-xl w-fit">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{t.platformCards[0].title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t.platformCards[0].desc}
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-6 rounded-2xl hover:bg-slate-50 border border-slate-100 transition flex flex-col gap-4">
                <div className="p-3 bg-teal-100 text-teal-600 rounded-xl w-fit">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{t.platformCards[1].title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t.platformCards[1].desc}
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-6 rounded-2xl hover:bg-slate-50 border border-slate-100 transition flex flex-col gap-4">
                <div className="p-3 bg-amber-100 text-amber-600 rounded-xl w-fit">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{t.platformCards[2].title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t.platformCards[2].desc}
                </p>
              </div>

              {/* Card 4 */}
              <div className="p-6 rounded-2xl hover:bg-slate-50 border border-slate-100 transition flex flex-col gap-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl w-fit">
                  <Fingerprint className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{t.platformCards[3].title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t.platformCards[3].desc}
                </p>
              </div>

              {/* Card 5 */}
              <div className="p-6 rounded-2xl hover:bg-slate-50 border border-slate-100 transition flex flex-col gap-4">
                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl w-fit">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{t.platformCards[4].title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t.platformCards[4].desc}
                </p>
              </div>

              {/* Card 6 */}
              <div className="p-6 rounded-2xl hover:bg-slate-50 border border-slate-100 transition flex flex-col gap-4">
                <div className="p-3 bg-purple-100 text-purple-600 rounded-xl w-fit">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{t.platformCards[5].title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t.platformCards[5].desc}
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 4. Start Custom Demo Form & Bottom Highlights */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Column */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#ECEFFE] to-[#D5DCFF] rounded-3xl p-8 flex items-center justify-center border border-slate-100 shadow-sm relative overflow-hidden min-h-[400px]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#354CE1]/5 rounded-full blur-2xl" />
              <div className="space-y-6 relative z-10 w-full">
                <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4 max-w-sm mx-auto">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                      <VerifiedIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">{t.amlFlow}</span>
                      <span className="text-xs font-bold text-slate-900">{t.walletPolicy}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                      <span>{t.onchainRisk}</span>
                      <span className="text-emerald-600 font-bold">{t.passedLow}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                      <span>{t.ofacSanctions}</span>
                      <span className="text-emerald-600 font-bold">{t.clean}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                      <span>{t.kycVerification}</span>
                      <span className="text-emerald-600 font-bold">{t.verified}</span>
                    </div>
                  </div>
                </div>
                <div className="text-center font-sans">
                  <h4 className="font-bold text-slate-800 text-sm">{t.automationTitle}</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">{t.automationDesc}</p>
                </div>
              </div>
            </div>

            {/* Custom Demo Form Column */}
            <div className="lg:col-span-7">
              <div className="space-y-6 max-w-xl">
                <h2 className="text-2xl md:text-3xl font-sans font-semibold text-slate-900 tracking-tight">
                  {t.formTitle}
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {t.formDesc}
                </p>

                {demoRequested ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3"
                  >
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                    <h3 className="text-lg font-bold text-emerald-900">{t.demoSentTitle}</h3>
                    <p className="text-sm text-emerald-700 max-w-md mx-auto">
                      {t.demoSentPrefix}<strong>{firstName}</strong>{t.demoSentMiddle}<strong>{email}</strong>.
                    </p>
                    <button 
                      onClick={() => setDemoRequested(false)}
                      className="mt-4 px-5 py-2 bg-emerald-600 text-white hover:bg-emerald-700 font-semibold text-xs rounded-full transition"
                    >
                      {t.fillAnother}
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleDemoSubmit} className="space-y-4 font-sans text-xs">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-600">{t.firstName}</label>
                        <input 
                          type="text" 
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder={t.firstNamePlaceholder}
                          className="w-full bg-[#FAFBFD] border border-slate-200/80 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#354CE1] focus:bg-white transition"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-600">{t.lastName}</label>
                        <input 
                          type="text" 
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder={t.lastNamePlaceholder}
                          className="w-full bg-[#FAFBFD] border border-slate-200/80 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#354CE1] focus:bg-white transition"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-600">{t.email}</label>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.emailPlaceholder}
                        className="w-full bg-[#FAFBFD] border border-slate-200/80 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#354CE1] focus:bg-white transition"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-600">{t.website}</label>
                      <input 
                        type="text" 
                        required
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder={t.websitePlaceholder}
                        className="w-full bg-[#FAFBFD] border border-slate-200/80 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#354CE1] focus:bg-white transition"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-600">{t.companyName}</label>
                      <input 
                        type="text" 
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder={t.companyPlaceholder}
                        className="w-full bg-[#FAFBFD] border border-slate-200/80 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#354CE1] focus:bg-white transition"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-600">{t.jobTitle}</label>
                      <input 
                        type="text" 
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder={t.jobPlaceholder}
                        className="w-full bg-[#FAFBFD] border border-slate-200/80 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#354CE1] focus:bg-white transition"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 bg-slate-950 text-white hover:bg-slate-900 font-semibold rounded-full transition flex items-center justify-center gap-2"
                    >
                      {t.viewDemo}
                      <ArrowRight className="w-4 h-4 text-white" />
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>

          {/* Sub-Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-slate-100 mt-16 font-sans">
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-slate-900">{t.subpoints[0].title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t.subpoints[0].desc}
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-slate-900">{t.subpoints[1].title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t.subpoints[1].desc}
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-slate-900">{t.subpoints[2].title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t.subpoints[2].desc}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Explore more of Identra's identity platform */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 space-y-10">
          <h2 className="text-2xl font-sans font-semibold text-slate-950 tracking-tight text-center sm:text-left">
            {t.exploreTitle}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card Left */}
            <div className="bg-[#BACBFF]/50 hover:bg-[#BACBFF]/70 border border-[#98AFFE]/30 p-8 rounded-3xl transition flex flex-col justify-between min-h-[220px]">
              <h3 className="text-xl md:text-2xl font-semibold text-[#0C1E4F] max-w-xs font-sans">
                {t.exploreComplianceTitle}
              </h3>
              <button 
                onClick={onOpenSandbox}
                className="group inline-flex items-center gap-2 text-xs font-bold text-[#0C1E4F] uppercase tracking-wider w-fit"
              >
                {t.learnCompliance}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Card Right */}
            <div className="bg-[#BACBFF]/50 hover:bg-[#BACBFF]/70 border border-[#98AFFE]/30 p-8 rounded-3xl transition flex flex-col justify-between min-h-[220px]">
              <h3 className="text-xl md:text-2xl font-semibold text-[#0C1E4F] max-w-xs font-sans">
                {t.exploreDatabaseTitle}
              </h3>
              <button 
                onClick={onOpenSandbox}
                className="group inline-flex items-center gap-2 text-xs font-bold text-[#0C1E4F] uppercase tracking-wider w-fit"
              >
                {t.learnDatabase}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Ready to get started banner */}
      <section className="py-20 bg-gradient-to-br from-[#AFB6FF] to-[#DCE0FF] text-[#0C1E4F] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/20 rounded-full blur-3xl" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center space-y-6">
          <h2 className="text-3xl md:text-4.5xl font-sans font-semibold tracking-tight leading-tight">
            {t.readyTitle}
          </h2>
          <p className="text-sm md:text-base text-[#1E3063] max-w-md mx-auto">
            {t.readyDesc}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenSandbox}
              className="w-full sm:w-auto bg-slate-950 text-white hover:bg-slate-900 font-semibold text-sm px-8 py-3.5 rounded-full transition flex items-center justify-center gap-2 shadow-lg"
            >
              {t.getDemo}
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={onOpenSandbox}
              className="w-full sm:w-auto border border-slate-950/20 hover:bg-slate-950/5 text-[#0C1E4F] font-semibold text-sm px-8 py-3.5 rounded-full transition"
            >
              {t.tryNow}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
