/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState } from 'react';
import { 
  ArrowRight, Check, ShieldCheck, ArrowLeft, BookOpen, ChevronDown, ChevronUp,
  Database, FileText, Shield, Users, Landmark, HelpCircle, Lock, Key, 
  Smartphone, UserCheck, AlertTriangle, RefreshCw, Layers, Globe, GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import {
  E_LEARNING_TRANSLATIONS,
  type ELearningScenarioKey,
  type ELearningStatusKey,
  type ELearningTranslationKey
} from '../translations/ELearningPageTranslations';

interface ELearningPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

const SCENARIO_SCORES: Record<ELearningScenarioKey, number> = {
  alex: 97.4,
  elena: 99.1,
  bot: 32.8
};

export default function ELearningPage({ onOpenSandbox, onBackToLanding, onViewChange }: ELearningPageProps) {
  const { language } = useLanguage();
  const translations = getLocalizedRecord(E_LEARNING_TRANSLATIONS, language as keyof typeof E_LEARNING_TRANSLATIONS, 'E_LEARNING_TRANSLATIONS');
  const t = (key: ELearningTranslationKey) => translations[key];
  const scenarios = translations.scenarios;

  // Use case accordion state
  const [openAccordion, setOpenAccordion] = useState<string | null>('learner');

  // Interactive Simulator state
  const [activeScenario, setActiveScenario] = useState<ELearningScenarioKey>('alex');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);
  const [scenarioStatus, setScenarioStatus] = useState<Record<ELearningScenarioKey, ELearningStatusKey>>({
    alex: 'Approved',
    elena: 'Approved',
    bot: 'Blocked'
  });

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const format = (template: string, values: Record<string, string | number>) =>
    Object.entries(values).reduce((result, [name, value]) => result.replaceAll(`{${name}}`, String(value)), template);

  const simulationSteps = React.useMemo(() => {
    const scenario = scenarios[activeScenario];
    const score = SCENARIO_SCORES[activeScenario];

    return [
      format(translations.simulationSteps.initializing, { name: scenario.name, role: scenario.role }),
      translations.simulationSteps.analyzing,
      format(translations.simulationSteps.matching, { score }),
      translations.simulationSteps.signals,
      format(translations.simulationSteps.complete, { status: translations.status[scenarioStatus[activeScenario]] })
    ];
  }, [activeScenario, scenarioStatus, scenarios, translations]);
  const simLogs = simulationSteps.slice(0, simStep);

  const runSimulation = (key: ELearningScenarioKey) => {
    setActiveScenario(key);
    setIsSimulating(true);
    setSimStep(0);

    let current = 0;
    const interval = setInterval(() => {
      if (current < simulationSteps.length) {
        setSimStep(current + 1);
        current++;
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 900);
  };

  const handleUpdateStatus = (key: ELearningScenarioKey) => {
    const nextStatus: Record<ELearningStatusKey, ELearningStatusKey> = {
      'Approved': 'Review',
      'Review': 'Blocked',
      'Blocked': 'Approved'
    };
    setScenarioStatus(prev => ({
      ...prev,
      [key]: nextStatus[prev[key]]
    }));
  };

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-slate-800">
      
      {/* 1. Header Hero Banner Section */}
      <section className="relative bg-[#4D82F9] text-white overflow-hidden pt-12 pb-24 md:pt-16 md:pb-28">
        <div className="absolute inset-0 bg-gradient-to-r from-[#4F83F7] to-[#2563EB] opacity-90"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {/* Back button */}
          <button 
            onClick={onBackToLanding}
            className="inline-flex items-center gap-2 mb-8 text-white/80 hover:text-white font-medium text-sm transition group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{t('backToSolutions')}</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Text content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold tracking-wider uppercase text-white">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{t('badge')}</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                {t('heroTitle')}
              </h1>
              
              <p className="text-lg sm:text-xl text-blue-50/90 leading-relaxed max-w-2xl font-light">
                {t('heroDesc')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={onOpenSandbox}
                  className="px-8 py-4 bg-white text-[#2563EB] font-bold rounded-xl shadow-lg hover:bg-blue-50 transition duration-300 flex items-center justify-center gap-2 group"
                >
                  <span>{t('getDemo')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Hero Right Visual Graphic */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl relative">
                <div className="absolute -top-3 -left-3 bg-emerald-500 text-white p-2 rounded-xl shadow-lg">
                  <ShieldCheck className="w-6 h-6" />
                </div>

                {/* Laptop Simulator Frame */}
                <div className="bg-slate-950 rounded-lg overflow-hidden border border-slate-800 shadow-xl">
                  {/* Title Bar */}
                  <div className="bg-slate-900 px-4 py-2.5 flex items-center gap-2 border-b border-slate-800">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono mx-auto">{t('browserUrl')}</span>
                  </div>

                  {/* Simulator Screen */}
                  <div className="p-6 space-y-4 font-sans text-xs text-slate-300">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-wider text-blue-400 font-semibold">{t('verificationStep')}</p>
                        <h4 className="font-bold text-sm text-white">{t('studentRegistration')}</h4>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
                        {t('active')}
                      </span>
                    </div>

                    {/* Camera simulation box */}
                    <div className="relative h-44 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden">
                      {/* Grid scanning lines */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                      
                      {/* Face scanner outline */}
                      <div className="w-32 h-32 rounded-full border-2 border-dashed border-blue-400/40 flex items-center justify-center animate-pulse relative">
                        {/* Target corners */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-blue-400"></div>
                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-blue-400"></div>
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-blue-400"></div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-blue-400"></div>
                        <span className="text-2xl">{t('heroScannerIcon')}</span>
                      </div>

                      {/* Moving laser scan line */}
                      <div className="absolute w-full h-0.5 bg-blue-500/80 shadow-[0_0_10px_#3b82f6] top-1/4 left-0 animate-bounce"></div>

                      <div className="absolute bottom-3 left-3 bg-slate-950/80 px-2 py-1 rounded border border-slate-800 flex items-center gap-1.5 text-[9px] font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></span>
                        <span>{t('facialLivenessEnabled')}</span>
                      </div>
                    </div>

                    {/* Verification fields mock */}
                    <div className="space-y-2">
                      <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800/60 font-mono text-[10px]">
                        <span className="text-slate-500">{t('verificationId')}</span>
                        <span className="text-slate-300 font-bold">{t('verificationIdValue')}</span>
                      </div>
                      <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800/60 font-mono text-[10px]">
                        <span className="text-slate-500">{t('identityStatus')}</span>
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <Check className="w-3 h-3" /> {t('matched')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info pill floating */}
                <div className="absolute -bottom-4 -right-4 bg-slate-900 border border-slate-800 p-3 rounded-xl shadow-lg flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{t('onboarding')}</p>
                    <p className="text-xs font-bold text-white">{t('countriesSupported')}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Core Three Column Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-white/20 mt-16 text-left">
            <div className="space-y-2">
              <div className="h-0.5 bg-white/30 w-16 mb-4"></div>
              <h3 className="font-bold text-lg text-white">{t('benefit1Title')}</h3>
              <p className="text-sm text-blue-100 font-light leading-relaxed">
                {t('benefit1Desc')}
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="h-0.5 bg-white/30 w-16 mb-4"></div>
              <h3 className="font-bold text-lg text-white">{t('benefit2Title')}</h3>
              <p className="text-sm text-blue-100 font-light leading-relaxed">
                {t('benefit2Desc')}
              </p>
            </div>

            <div className="space-y-2">
              <div className="h-0.5 bg-white/30 w-16 mb-4"></div>
              <h3 className="font-bold text-lg text-white">{t('benefit3Title')}</h3>
              <p className="text-sm text-blue-100 font-light leading-relaxed">
                {t('benefit3Desc')}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Trusted Logos Band */}
      <section className="bg-slate-950 py-8 border-b border-slate-900 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-400 text-xs">
          <p className="font-semibold uppercase tracking-wider text-slate-500">
            {t('trustedBy')}
          </p>
          <div className="flex gap-12 items-center justify-center opacity-80">
            {/* Udemy */}
            <div className="flex items-center gap-1.5 font-sans text-xl font-bold text-white">
              <span className="bg-indigo-600 px-1.5 py-0.5 rounded text-sm text-white font-serif italic font-extrabold mr-1">{t('logoUdemyMark')}</span>
              <span>{t('logoUdemy')}</span>
            </div>
            
            {/* Coursera */}
            <div className="flex items-center gap-1.5 font-sans text-xl font-bold tracking-tight text-white">
              <span className="text-cyan-400 font-extrabold text-2xl">{t('logoCourseraMark')}</span>
              <span>{t('logoCoursera')}</span>
            </div>
          </div>
        </div>
      </section>


      {/* 2. Interactive Academic Integrity & Verification Hub Section */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            {t('hubTitle')}
          </h2>
          <p className="text-lg text-slate-500">
            {t('hubDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Interactive Core Capabilities List */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            
            {/* Pillar 1 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-100 hover:border-blue-200 shadow-sm transition group">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4 group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">{t('pillar1Title')}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {t('pillar1Desc')}
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-100 hover:border-emerald-200 shadow-sm transition group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4 group-hover:scale-105 transition-transform">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">{t('pillar2Title')}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {t('pillar2Desc')}
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-100 hover:border-rose-200 shadow-sm transition group">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500 mb-4 group-hover:scale-105 transition-transform">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">{t('pillar3Title')}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {t('pillar3Desc')}
              </p>
            </div>

          </div>

          {/* Interactive Live Simulator UI Box */}
          <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 md:p-8 text-white border border-slate-800 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div>
                  <h4 className="font-bold text-base flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
                    <span>{t('sandboxTitle')}</span>
                  </h4>
                  <p className="text-xs text-slate-400">{t('sandboxDesc')}</p>
                </div>
                <div className="flex bg-slate-800 rounded-xl p-1 text-xs font-semibold gap-1">
                  <button 
                    onClick={() => setActiveScenario('alex')}
                    className={`px-3 py-1.5 rounded-lg transition ${activeScenario === 'alex' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    {t('scenarioAlexTab')}
                  </button>
                  <button 
                    onClick={() => setActiveScenario('elena')}
                    className={`px-3 py-1.5 rounded-lg transition ${activeScenario === 'elena' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    {t('scenarioElenaTab')}
                  </button>
                  <button 
                    onClick={() => setActiveScenario('bot')}
                    className={`px-3 py-1.5 rounded-lg transition ${activeScenario === 'bot' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    {t('scenarioBotTab')}
                  </button>
                </div>
              </div>

              {/* Scenario details panel */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-950/60 p-5 rounded-2xl border border-slate-800 mb-6">
                <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-3 border-b md:border-b-0 md:border-r border-slate-800">
                  <span className="text-5xl mb-2 block">{scenarios[activeScenario].avatar}</span>
                  <h5 className="font-bold text-sm text-white">{scenarios[activeScenario].name}</h5>
                  <span className="text-[10px] mt-1 px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                    {scenarios[activeScenario].role}
                  </span>
                </div>
                
                <div className="md:col-span-8 space-y-2.5 text-xs">
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div>
                      <span className="text-slate-500 block">{t('submittedId')}</span>
                      <span className="text-white font-medium">{scenarios[activeScenario].idType}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">{t('ipLocation')}</span>
                      <span className="text-white font-medium">{scenarios[activeScenario].ip}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">{t('facialSimilarity')}</span>
                      <span className={`font-bold ${SCENARIO_SCORES[activeScenario] > 80 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {SCENARIO_SCORES[activeScenario]}{t('matchSuffix')}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">{t('workflowRule')}</span>
                      <span className="text-blue-400 font-bold">{t('workflowRuleValue')}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block font-semibold mb-1">{t('decisionReasoning')}</span>
                    <ul className="space-y-1 text-slate-300 font-sans text-[11px]">
                      {scenarios[activeScenario].reasons.map((r, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-blue-500 mt-0.5">{t('listBullet')}</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Live Logger Console */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[11px] space-y-1 h-36 overflow-y-auto scrollbar-none mb-6">
                <div className="text-slate-500 border-b border-slate-900 pb-1 mb-2 flex justify-between">
                  <span>{t('systemExecutionLogs')}</span>
                  <span>{t('logTimestamp')}</span>
                </div>
                {simLogs.length === 0 && (
                  <p className="text-slate-500 italic text-center pt-8">{t('emptyLogs')}</p>
                )}
                {simLogs.map((log, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -5 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    className="flex gap-2"
                  >
                    <span className="text-blue-400 shrink-0">{t('consolePrompt')}</span>
                    <span className={i === simLogs.length - 1 ? 'text-yellow-300 font-semibold' : 'text-slate-300'}>{log}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between border-t border-slate-800 pt-5">
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">{t('currentStatus')}</span>
                <span className={`px-2.5 py-1 rounded-lg font-bold text-xs border ${
                  scenarioStatus[activeScenario] === 'Approved' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                  scenarioStatus[activeScenario] === 'Review' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                  'bg-rose-500/20 text-rose-400 border-rose-500/30'
                }`}>
                  {translations.status[scenarioStatus[activeScenario]]}
                </span>
                
                <button 
                  onClick={() => handleUpdateStatus(activeScenario)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
                  title={t('forceStatusTitle')}
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <button
                disabled={isSimulating}
                onClick={() => runSimulation(activeScenario)}
                className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 ${
                  isSimulating 
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
                }`}
              >
                <span>{isSimulating ? t('processing') : t('runVerificationFlow')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>


      {/* 3. Use Case Accordion: Maintain Trust Across the Lifecycle */}
      <section className="bg-slate-50 py-20 md:py-28 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side text column */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{t('useCasesEyebrow')}</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {t('useCasesTitle')}
              </h2>
              <p className="text-slate-500 leading-relaxed max-w-md">
                {t('useCasesDesc')}
              </p>
              <div className="pt-2">
                <button 
                  onClick={onOpenSandbox}
                  className="inline-flex items-center gap-1.5 text-blue-600 font-bold text-sm hover:text-blue-700 transition group"
                >
                  <span>{t('buildCustomWorkflow')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right side accordion column */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 divide-y divide-slate-100">
              
              {translations.accordions.map((item, index) => {
                const iconColors = ['text-blue-500', 'text-[#9BA9F9]', 'text-indigo-500', 'text-rose-500', 'text-emerald-500'];
                const spacing = index === 0 ? 'pb-4' : 'py-4';
                return (
                  <div key={item.id} className={spacing}>
                    <button
                      onClick={() => toggleAccordion(item.id)}
                      className="w-full py-4 flex items-center justify-between text-left focus:outline-none"
                    >
                      <span className="font-bold text-base text-slate-900 flex items-center gap-3">
                        <span className={iconColors[index]}>{item.icon}</span> {item.title}
                      </span>
                      {openAccordion === item.id ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>
                    <AnimatePresence initial={false}>
                      {openAccordion === item.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm text-slate-500 leading-relaxed pl-8 pr-4 pb-2 font-light">
                            {item.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>


      {/* 4. Identra Capability Grid Section */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{t('featuresEyebrow')}</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1 mb-4">
            {t('featuresTitle')}
          </h2>
          <p className="text-slate-500">
            {t('featuresDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {translations.features.map((feature) => (
            <div key={feature.title} className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between group hover:shadow-md transition">
              <div className="space-y-4">
                <span className="text-2xl">{feature.icon}</span>
                <h3 className="font-bold text-slate-900 text-lg">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-light">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}

        </div>
      </section>


      {/* 5. Coursera Testimonial Banner Section */}
      <section className="bg-blue-50/70 border-y border-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Testimonial Left */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-2xl sm:text-3xl font-light text-slate-800 leading-relaxed italic">
              {t('quoteOpen')}{t('testimonialQuote')}{t('quoteClose')}
            </p>
            <div>
              <p className="font-bold text-slate-900 text-base">{t('testimonialName')}</p>
              <p className="text-xs text-slate-500 tracking-wider uppercase font-semibold">{t('testimonialRole')}</p>
            </div>
          </div>

          {/* Testimonial Right Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-md space-y-6">
              <div className="flex items-center gap-2 font-sans text-2xl font-black tracking-tight text-slate-900">
                <span className="text-blue-600 font-extrabold text-3xl">{t('logoCourseraMark')}</span>
                <span>{t('logoCoursera')}</span>
              </div>
              <h4 className="font-bold text-slate-900 text-lg">
                {t('testimonialTitle')}
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed font-light">
                {t('testimonialDesc')}
              </p>
              <button 
                onClick={onOpenSandbox}
                className="w-full py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm tracking-wide transition flex items-center justify-center gap-2 group"
              >
                <span>{t('readCaseStudy')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </section>


      {/* 6. "Wherever your learning communities are, we're there, too" */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Stats & global paragraph column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{t('globalEyebrow')}</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {t('globalTitle')}
              </h2>
              <p className="text-slate-500 leading-relaxed max-w-md font-light">
                {t('globalDesc')}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 border-t border-slate-100 pt-8">
              <div>
                <p className="text-4xl sm:text-5xl font-black text-[#2563EB]">{t('countryCount')}</p>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-2">{t('countriesTerritories')}</p>
              </div>
              <div>
                <p className="text-4xl sm:text-5xl font-black text-[#2563EB]">{t('languageCount')}</p>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-2">{t('languagesSupported')}</p>
              </div>
            </div>
          </div>

          {/* Waterfall cloud of multilingual identity greetings */}
          <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-8 border border-slate-100 relative overflow-hidden h-96 flex flex-col justify-center">
            
            {/* Ambient gradients */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-blue-300/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-300/10 rounded-full blur-2xl"></div>

            <div className="space-y-4 font-sans text-center relative z-10 flex flex-col justify-center h-full">
              
              <div className="flex flex-wrap gap-2 justify-center">
                {translations.identityGreetings.map((greeting, index) => {
                  const highlightClass = index === 1
                    ? 'bg-blue-600 shadow-sm text-xs font-bold text-white'
                    : index === 4
                      ? 'bg-emerald-500 shadow-sm text-sm font-bold text-white'
                      : index === 8
                        ? 'bg-indigo-600 shadow-sm text-xs font-bold text-white'
                        : 'bg-white border border-slate-150 shadow-sm text-xs font-bold text-slate-600';
                  const paddingClass = index === 4 ? 'px-5 py-2.5' : 'px-4 py-2';
                  return (
                    <span key={greeting} className={`${paddingClass} rounded-full ${highlightClass}`}>
                      {greeting}
                    </span>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* 7. Next Steps Platform Explorations cards */}
      <section className="bg-slate-50 py-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center font-bold text-xs uppercase tracking-wider text-slate-400 mb-8">
            {t('exploreMore')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card A (Blue) */}
            <div className="bg-[#4D82F9] rounded-3xl p-8 text-white relative overflow-hidden group hover:shadow-xl transition shadow-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4D82F9] to-[#2563EB] opacity-90"></div>
              <div className="relative z-10 space-y-6">
                <h3 className="text-2xl font-bold tracking-tight">{t('platformCardTitle')}</h3>
                <p className="text-blue-100 text-sm max-w-sm font-light leading-relaxed">
                  {t('platformCardDesc')}
                </p>
                <button 
                  onClick={() => onViewChange && onViewChange('platform')}
                  className="px-5 py-2.5 bg-white text-blue-600 font-bold rounded-xl text-xs flex items-center gap-1.5 hover:bg-blue-50 transition"
                >
                  <span>{t('explorePlatform')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card B (Green) */}
            <div className="bg-[#10B981] rounded-3xl p-8 text-white relative overflow-hidden group hover:shadow-xl transition shadow-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-[#10B981] to-[#059669] opacity-90"></div>
              <div className="relative z-10 space-y-6">
                <h3 className="text-2xl font-bold tracking-tight">{t('docAiCardTitle')}</h3>
                <p className="text-emerald-100 text-sm max-w-sm font-light leading-relaxed">
                  {t('docAiCardDesc')}
                </p>
                <button 
                  onClick={() => onViewChange && onViewChange('document-ai')}
                  className="px-5 py-2.5 bg-white text-emerald-600 font-bold rounded-xl text-xs flex items-center gap-1.5 hover:bg-emerald-50 transition"
                >
                  <span>{t('learnDocAi')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 8. Ready to Get Started Bottom Lavender card */}
      <section className="bg-gradient-to-r from-indigo-100 to-blue-50 py-24 border-t border-slate-100 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t('ctaTitle')}
          </h2>
          <p className="text-slate-500 text-lg font-light max-w-xl mx-auto leading-relaxed">
            {t('ctaDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
            <button 
              onClick={onOpenSandbox}
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm tracking-wide transition shadow-md flex items-center justify-center gap-2 group"
            >
              <span>{t('getDemo')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={onOpenSandbox}
              className="w-full sm:w-auto px-8 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-sm tracking-wide transition"
            >
              {t('tryItNow')}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
