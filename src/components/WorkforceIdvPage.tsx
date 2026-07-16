/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Check, ShieldCheck, Cpu, ArrowLeft, RefreshCw, Layers, CheckCircle2, 
  Users, Globe, Search, Eye, AlertCircle, Sparkles, Lock, Smile, Calendar, 
  Smartphone, ShieldAlert, BookOpen, ChevronDown, ChevronUp, Database, FileText, 
  CreditCard, Mail, Landmark, Shield, UserCheck, HelpCircle, MapPin, Play, Network, AlertTriangle, Zap, Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { WORKFORCE_IDV_PAGE_TRANSLATIONS } from '../translations/WorkforceIdvPageTranslations';

interface WorkforceIdvPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

export default function WorkforceIdvPage({ onOpenSandbox, onBackToLanding, onViewChange }: WorkforceIdvPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(WORKFORCE_IDV_PAGE_TRANSLATIONS, language as keyof typeof WORKFORCE_IDV_PAGE_TRANSLATIONS, 'WORKFORCE_IDV_PAGE_TRANSLATIONS');

  // Tabs for the "Verify your workforce wherever they are" section
  const [activeTab, setActiveTab] = useState<'mobile-first' | 'consistency' | 'detect-fraud' | 'route-results'>('mobile-first');

  // Integrations interactive simulator
  const [activeIntegration, setActiveIntegration] = useState<string>('Okta');
  const [integrationStatus, setIntegrationStatus] = useState<boolean>(true);

  // Accordion list states
  const [activeAccordion, setActiveAccordion] = useState<string>('library');

  // Interactive Simulator for employee lifecycle
  const [activeStage, setActiveStage] = useState<'hiring' | 'onboarding' | 'employment'>('hiring');
  const [hasStartedSimulation, setHasStartedSimulation] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [currentSimulatorStep, setCurrentSimulatorStep] = useState<number>(0);
  const simulationLogs = hasStartedSimulation
    ? t.logs[activeStage].slice(0, currentSimulatorStep + 1)
    : [t.initialLog];

  // Auto trigger log messages on simulator mount/change
  const triggerSimulation = (stage: 'hiring' | 'onboarding' | 'employment') => {
    setActiveStage(stage);
    setHasStartedSimulation(true);
    setIsSimulating(true);
    setCurrentSimulatorStep(0);
  };

  useEffect(() => {
    if (isSimulating) {
      const timer = setInterval(() => {
        setCurrentSimulatorStep((prev) => {
          const next = prev + 1;
          const currentLogs = t.logs[activeStage];
          if (next < currentLogs.length) {
            return next;
          } else {
            setIsSimulating(false);
            clearInterval(timer);
            return prev;
          }
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isSimulating, activeStage, language]);

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? '' : id);
  };

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-slate-800 font-sans">
      
      {/* 1. HERO BANNER - Redesigned to fit design.md */}
      <section className="relative bg-gradient-to-b from-[#1E43D8] to-[#142FA0] text-white pt-28 pb-20 overflow-hidden">
        {/* Aesthetic Accents: Subtly pair with radial gradients for glowing ambient backdrops to introduce depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.08),transparent_50%)] pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#354CE1]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-xs border border-white/20 rounded-full text-xs font-semibold text-[#E2E6FF] tracking-wide">
              <Briefcase className="w-3.5 h-3.5 text-[#E2E6FF]" />
              <span>{t.badge}</span>
            </div>
            
            <h1 className="text-4xl md:text-5.5xl font-sans font-semibold leading-[1.15] tracking-tight text-white">
              {t.heroTitle}
            </h1>
            
            <p className="text-base md:text-lg text-blue-100 max-w-xl leading-relaxed font-normal">
              {t.heroDesc}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={onOpenSandbox}
                className="inline-flex items-center justify-center gap-2 bg-[#FFBF43] text-[#0F1E36] font-bold px-7 py-4 rounded-full hover:bg-[#FFBF43]/90 transition shadow-lg shadow-black/10 group text-sm"
              >
                <span>{t.consultationCta}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition shrink-0" />
              </button>
              
              <button 
                onClick={() => onViewChange?.('candidate-verification')}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/25 text-white font-semibold px-7 py-4 rounded-full transition text-sm"
              >
                <span>{t.candidateCta}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>
          
          {/* Hero graphic mockup - Employee Identity Ledger */}
          <div className="lg:col-span-5 relative">
            <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 p-4 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#354CE1]/10 to-[#FFBF43]/10 pointer-events-none" />
              
              {/* Mockup Top bar */}
              <div className="flex justify-between items-center pb-3 border-b border-white/10 mb-4 px-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                </div>
                <span className="text-[9px] uppercase font-mono tracking-widest text-slate-400">{t.coreLabel}</span>
              </div>
 
              {/* Graphic container */}
              <div className="bg-slate-950/90 rounded-2xl p-4 border border-white/5 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                      {t.ledgerTitle}
                    </h3>
                    <p className="text-[10px] text-slate-400 font-sans">{t.ledgerDesc}</p>
                  </div>
                  <span className="text-[9px] px-2 py-0.5 bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] rounded-md uppercase font-mono font-bold">
                    {t.secured}
                  </span>
                </div>
 
                {/* Simulated interactive list */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[9px] text-slate-500 font-mono tracking-wider">
                    <span>{t.lifecycleEvents}</span>
                    <span>{t.status}</span>
                  </div>
 
                  <div className="bg-slate-900/90 border border-white/5 p-3 rounded-xl flex items-center justify-between gap-3 hover:border-[#354CE1]/30 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#354CE1]/15 flex items-center justify-center text-[#354CE1]">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white">{t.ledgerEvents[0].title}</p>
                        <p className="text-[10px] text-[#10B981] flex items-center gap-1">
                          <Check className="w-3 h-3 text-[#10B981]" /> {t.ledgerEvents[0].status}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{t.ledgerEvents[0].time}</span>
                  </div>
 
                  <div className="bg-slate-900/90 border border-white/5 p-3 rounded-xl flex items-center justify-between gap-3 hover:border-[#354CE1]/30 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#FFBF43]/15 flex items-center justify-center text-[#FFBF43]">
                        <Lock className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white">{t.ledgerEvents[1].title}</p>
                        <p className="text-[10px] text-[#10B981] flex items-center gap-1">
                          <Check className="w-3 h-3 text-[#10B981]" /> {t.ledgerEvents[1].status}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{t.ledgerEvents[1].time}</span>
                  </div>
 
                  <div className="bg-slate-900/90 border border-white/5 p-3 rounded-xl flex items-center justify-between gap-3 hover:border-[#354CE1]/30 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/15 flex items-center justify-center text-[#F59E0B]">
                        <UserCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white">{t.ledgerEvents[2].title}</p>
                        <p className="text-[10px] text-[#F59E0B] flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" /> {t.ledgerEvents[2].status}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{t.ledgerEvents[2].time}</span>
                  </div>
                </div>
 
                <div className="h-20 bg-gradient-to-tr from-[#0F1E36] to-slate-950 rounded-xl relative overflow-hidden flex items-center justify-center border border-white/5">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#354CE1_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="text-center space-y-1 z-10 px-4">
                    <p className="text-[11px] font-bold text-white tracking-wide">{t.protectionShield}</p>
                    <p className="text-[9px] text-slate-400">{t.protectionShieldDesc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST BAR - Redesigned to fit design.md */}
      <section className="bg-[#0F1E36] py-6 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-400">
          <span className="text-xs font-semibold tracking-wider uppercase text-slate-300 font-mono">
            {t.trustedBy}
          </span>
          <div className="flex flex-wrap items-center gap-8 md:gap-16">
            <div className="flex items-center gap-2 text-white font-bold tracking-tight text-lg">
              <span className="w-5 h-5 rounded-full border-2 border-[#354CE1] flex items-center justify-center text-[10px]">{t.trustLogos.oktaMark}</span>
              <span>{t.trustLogos.okta}</span>
            </div>
            <div className="flex items-center gap-1.5 text-white font-bold text-base tracking-wide">
              <span className="w-4 h-4 bg-[#354CE1] rounded-sm flex items-center justify-center text-[9px] text-white">{t.trustLogos.intercomMark}</span>
              <span>{t.trustLogos.intercom}</span>
            </div>
            <div className="flex items-center gap-1 text-white font-black text-xl italic tracking-wider">
              <span>{t.trustLogos.ro}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SCALE GLOBALLY SECTION - Redesigned to fit design.md */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] font-bold tracking-widest text-[#354CE1] uppercase bg-[#E2E6FF] px-3.5 py-1.5 rounded-full">
              {t.scaleLabel}
            </span>
            <h2 className="text-3xl md:text-4.5xl font-sans font-semibold tracking-tight text-[#0F1E36] leading-[1.15]">
              {t.scaleTitle}
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              {t.scaleDesc}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-6">
              <div className="border-l-3 border-[#354CE1] pl-4 space-y-1">
                <span className="text-3xl md:text-4xl font-sans font-bold text-[#0F1E36] block tracking-tight">{t.stats[0].value}</span>
                <span className="text-xs text-slate-500 block leading-normal">
                  {t.stats[0].label}
                </span>
              </div>
              
              <div className="border-l-3 border-[#FFBF43] pl-4 space-y-1">
                <span className="text-3xl md:text-4xl font-sans font-bold text-[#0F1E36] block tracking-tight">{t.stats[1].value}</span>
                <span className="text-xs text-slate-500 block leading-normal">
                  {t.stats[1].label}
                </span>
              </div>
              
              <div className="border-l-3 border-[#10B981] pl-4 space-y-1">
                <span className="text-3xl md:text-4xl font-sans font-bold text-[#0F1E36] block tracking-tight">{t.stats[2].value}</span>
                <span className="text-xs text-slate-500 block leading-normal">
                  {t.stats[2].label}
                </span>
              </div>
            </div>
          </div>
          
          {/* Blueprint Globe Visual representation */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 bg-[#354CE1]/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="w-full h-full border border-slate-200 rounded-full bg-white flex items-center justify-center relative overflow-hidden shadow-xl shadow-slate-100">
                <div className="absolute inset-0 border border-dashed border-slate-300/60 rounded-full scale-90" />
                <div className="absolute inset-0 border border-slate-200 rounded-full scale-75" />
                <div className="absolute inset-0 border border-dashed border-slate-300/40 rounded-full scale-50" />
                
                <div className="absolute left-0 right-0 h-[1px] bg-slate-200 top-1/2" />
                <div className="absolute top-0 bottom-0 w-[1px] bg-slate-200 left-1/2" />
                
                {/* Pulsing nodes */}
                <div className="absolute top-1/4 left-1/4 w-3.5 h-3.5 bg-[#354CE1] rounded-full animate-ping" />
                <div className="absolute top-1/4 left-1/4 w-2.5 h-2.5 bg-[#354CE1] rounded-full" />
                
                <div className="absolute bottom-1/3 right-1/4 w-3.5 h-3.5 bg-[#FFBF43] rounded-full animate-ping [animation-delay:0.5s]" />
                <div className="absolute bottom-1/3 right-1/4 w-2.5 h-2.5 bg-[#FFBF43] rounded-full" />
                
                <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-[#10B981] rounded-full animate-ping [animation-delay:0.9s]" />
                <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-[#10B981] rounded-full" />
                
                <div className="text-center p-8 z-10 max-w-xs space-y-2">
                  <Globe className="w-10 h-10 text-[#354CE1] mx-auto animate-spin [animation-duration:30s]" />
                  <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">{t.globalGrid}</p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{t.globalGridDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROTECT YOUR BUSINESS AT EVERY STAGE - Deep Slate/Navy bg according to design.md */}
      <section className="bg-[#0F1E36] py-24 px-6 text-white overflow-hidden relative border-y border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[11px] font-bold tracking-widest text-[#FFBF43] uppercase bg-white/10 px-3 py-1.5 rounded-full">
              {t.lifecycleLabel}
            </span>
            <h2 className="text-3xl md:text-4.5xl font-sans font-semibold tracking-tight leading-tight">
              {t.lifecycleTitle}
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              {t.lifecycleDesc}
            </p>
          </div>

          {/* Life cycle timeline card */}
          <div className="bg-white/5 border border-white/10 p-6 md:p-10 rounded-[2.5rem] shadow-2xl space-y-10">
            
            {/* Horizontal Timeline Steps */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
              
              {/* Step 1: Hiring */}
              <div 
                onClick={() => triggerSimulation('hiring')}
                className={`p-6 rounded-2xl border transition duration-200 cursor-pointer relative group ${
                  activeStage === 'hiring' 
                    ? 'bg-white/10 border-[#354CE1] shadow-lg shadow-[#354CE1]/10' 
                    : 'bg-white/0 border-white/5 hover:bg-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#354CE1]/15 flex items-center justify-center text-[#E2E6FF] group-hover:bg-[#354CE1]/25 transition">
                    <UserCheck className="w-5 h-5" />
                  </div>
                   <span className="text-[10px] text-[#E2E6FF] font-mono tracking-wider font-semibold">{t.stages.hiring.stage}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{t.stages.hiring.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t.stages.hiring.desc}
                </p>
                {activeStage === 'hiring' && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#354CE1] rotate-45 rounded-sm hidden lg:block" />
                )}
              </div>

              {/* Step 2: Onboarding */}
              <div 
                onClick={() => triggerSimulation('onboarding')}
                className={`p-6 rounded-2xl border transition duration-200 cursor-pointer relative group ${
                  activeStage === 'onboarding' 
                    ? 'bg-white/10 border-[#FFBF43] shadow-lg shadow-[#FFBF43]/10' 
                    : 'bg-white/0 border-white/5 hover:bg-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FFBF43]/15 flex items-center justify-center text-[#FFBF43] group-hover:bg-[#FFBF43]/25 transition">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] text-[#FFBF43] font-mono tracking-wider font-semibold">{t.stages.onboarding.stage}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{t.stages.onboarding.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t.stages.onboarding.desc}
                </p>
                {activeStage === 'onboarding' && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#FFBF43] rotate-45 rounded-sm hidden lg:block" />
                )}
              </div>

              {/* Step 3: Employment */}
              <div 
                onClick={() => triggerSimulation('employment')}
                className={`p-6 rounded-2xl border transition duration-200 cursor-pointer relative group ${
                  activeStage === 'employment' 
                    ? 'bg-white/10 border-[#10B981] shadow-lg shadow-[#10B981]/10' 
                    : 'bg-white/0 border-white/5 hover:bg-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 flex items-center justify-center text-[#10B981] group-hover:bg-[#10B981]/25 transition">
                    <Shield className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] text-[#10B981] font-mono tracking-wider font-semibold">{t.stages.employment.stage}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{t.stages.employment.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t.stages.employment.desc}
                </p>
                {activeStage === 'employment' && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#10B981] rotate-45 rounded-sm hidden lg:block" />
                )}
              </div>
            </div>

            {/* Simulated Live Console */}
            <div className="bg-slate-950 rounded-2xl border border-white/10 p-5 space-y-4">
              <div className="flex justify-between items-center text-xs pb-3 border-b border-white/5 font-mono">
                <span className="text-slate-400 uppercase tracking-widest text-[10px]">
                  {t.activeTelemetryStream} {t.stages[activeStage].title.toUpperCase()}
                </span>
                <span className="flex items-center gap-1.5 text-[#354CE1] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  {t.simulatingEvent}
                </span>
              </div>
              
              <div className="space-y-2 min-h-[96px] font-mono text-xs text-slate-300 leading-relaxed">
                {simulationLogs.map((log, index) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -5 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    key={index} 
                    className="flex items-start gap-2.5 text-slate-300"
                  >
                    <span className="text-slate-500 select-none">&gt;</span>
                    <span>{log}</span>
                  </motion.div>
                ))}
                {isSimulating && (
                  <div className="flex items-center gap-2 text-slate-500 italic text-[11px] mt-1 pl-5">
                    <RefreshCw className="w-3 h-3 animate-spin text-[#354CE1]" />
                    <span>{t.crunching}</span>
                  </div>
                )}
              </div>

              <div className="pt-2 flex justify-between items-center flex-wrap gap-4">
                <p className="text-[10px] text-slate-500">
                  {t.milestoneHint}
                </p>
                <button 
                  onClick={() => triggerSimulation(activeStage)}
                  className="px-3 py-1 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg text-xs font-semibold text-white transition flex items-center gap-1.5 font-mono"
                >
                  <RefreshCw className="w-3 h-3" />
                  {t.restartEvent}
                </button>
              </div>
            </div>

            {/* Bottom Platform automation block */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#354CE1]" />
                  <h4 className="font-bold text-white text-sm">{t.lifecycleBenefits[0].title}</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t.lifecycleBenefits[0].desc}
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  <h4 className="font-bold text-white text-sm">{t.lifecycleBenefits[1].title}</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t.lifecycleBenefits[1].desc}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBF43]" />
                  <h4 className="font-bold text-white text-sm">{t.lifecycleBenefits[2].title}</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t.lifecycleBenefits[2].desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VERIFY YOUR WORKFORCE WHEREVER THEY ARE (Tabs + Smartphone Mockup) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Tabs Menu on the left */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[11px] font-bold tracking-widest text-[#354CE1] uppercase bg-[#E2E6FF] px-3.5 py-1.5 rounded-full">
              {t.flowsLabel}
            </span>
            <h2 className="text-3xl md:text-4.5xl font-sans font-semibold tracking-tight text-[#0F1E36] leading-tight">
              {t.flowsTitle}
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              {t.flowsDesc}
            </p>

            <div className="space-y-3 pt-2">
              {t.tabs.map((tab: any) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white border-[#354CE1] shadow-md shadow-blue-50'
                      : 'bg-transparent border-transparent hover:bg-slate-50'
                  }`}
                >
                  <h4 className={`font-semibold text-sm transition ${activeTab === tab.id ? 'text-[#354CE1]' : 'text-[#0F1E36]'}`}>
                    {tab.title}
                  </h4>
                  {activeTab === tab.id && (
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      {tab.desc}
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Smartphone Mockup */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <div className="bg-slate-900/5 rounded-[3rem] p-6 border border-slate-200 shadow-2xl w-full max-w-lg grid grid-cols-1 md:grid-cols-12 gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#354CE1]/10 rounded-full blur-2xl" />
              
              {/* Phone Graphic (Span 7 of 12) */}
              <div className="md:col-span-7 flex justify-center">
                <div className="w-60 h-[470px] bg-slate-900 rounded-[2.5rem] p-3 shadow-xl relative border-4 border-slate-800">
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-900 rounded-full z-20 flex items-center justify-center">
                    <div className="w-12 h-1 bg-slate-700 rounded-full" />
                    <div className="w-2 h-2 bg-slate-800 rounded-full ml-2" />
                  </div>

                  <div className="w-full h-full bg-slate-950 rounded-[2rem] overflow-hidden relative flex flex-col pt-8 text-white font-sans text-xs">
                    <div className="flex justify-between items-center px-4 py-1 text-[9px] font-semibold text-slate-400 font-mono">
                      <span>{t.phone.time}</span>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                        <span>{t.phone.network}</span>
                      </div>
                    </div>

                    <div className="flex-1 p-4 flex flex-col justify-between">
                      <AnimatePresence mode="wait">
                        {activeTab === 'mobile-first' && (
                          <motion.div 
                            key="mobile-first"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex-1 flex flex-col justify-between"
                          >
                            <div className="space-y-3 text-center pt-4">
                              <div className="w-12 h-12 bg-[#354CE1]/20 text-[#354CE1] rounded-full flex items-center justify-center mx-auto text-lg font-bold">
                                {t.phone.initial}
                              </div>
                              <h3 className="text-sm font-bold text-white">{t.phone.verifyTitle}</h3>
                              <p className="text-[10px] text-slate-400 leading-relaxed px-2">
                                {t.phone.verifyDesc}
                              </p>
                            </div>
                            
                            <div className="space-y-2">
                              <button className="w-full py-2.5 bg-[#354CE1] hover:bg-[#2539BE] rounded-xl font-bold text-[11px] text-white transition text-center block">
                                {t.phone.begin}
                              </button>
                              <p className="text-[8px] text-slate-500 text-center">{t.phone.sandbox}</p>
                            </div>
                          </motion.div>
                        )}

                        {activeTab === 'consistency' && (
                          <motion.div 
                            key="consistency"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex-1 flex flex-col justify-between"
                          >
                            <div className="space-y-4 pt-4">
                              <div className="p-3 bg-slate-900 border border-white/5 rounded-xl space-y-2">
                                <div className="flex justify-between items-center text-[10px]">
                                  <span className="font-semibold text-slate-300 font-sans">{t.phone.biometricMatch}</span>
                                  <span className="text-[#10B981] font-bold font-mono">{t.phone.matchScore}</span>
                                </div>
                                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                  <div className="h-full bg-[#10B981] w-[99.7%]" />
                                </div>
                              </div>
                              
                              <p className="text-[10px] text-slate-400 leading-normal font-sans">
                                {t.phone.consistencyDesc}
                              </p>
                            </div>

                            <div className="p-2.5 bg-[#10B981]/15 border border-[#10B981]/30 rounded-xl flex items-center gap-2 text-[#10B981]">
                              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                              <span className="text-[9px] font-bold uppercase font-mono">{t.phone.consistencyPassed}</span>
                            </div>
                          </motion.div>
                        )}

                         {activeTab === 'detect-fraud' && (
                          <motion.div 
                            key="detect-fraud"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex-1 flex flex-col justify-between"
                          >
                            <div className="space-y-3 pt-2">
                              <p className="text-[9px] text-slate-400 uppercase tracking-widest font-mono font-bold text-center">{t.phone.documentAnalysis}</p>
                              
                              <div className="border border-dashed border-[#354CE1]/50 bg-slate-900 rounded-lg aspect-[1.6/1] overflow-hidden flex items-center justify-center relative">
                                <span className="absolute top-1 left-1 text-[7px] font-mono text-[#E2E6FF]">{t.phone.passport}</span>
                                <div className="w-32 h-16 border border-white/20 rounded flex flex-col justify-between p-1.5 bg-slate-950/40">
                                  <div className="flex justify-between items-start">
                                    <div className="w-5 h-5 bg-slate-800 rounded-xs" />
                                    <div className="space-y-0.5 flex-1 pl-2">
                                      <div className="h-1 bg-slate-800 rounded w-10" />
                                      <div className="h-1 bg-slate-800 rounded w-6" />
                                    </div>
                                  </div>
                                  <div className="h-1.5 bg-slate-800 rounded w-full" />
                                </div>
                                <div className="absolute inset-x-0 top-1/2 h-0.5 bg-[#354CE1] animate-bounce" />
                              </div>

                              <p className="text-[9px] text-slate-400 leading-relaxed text-center font-sans">
                                {t.phone.documentDesc}
                              </p>
                            </div>

                            <div className="p-2.5 bg-[#10B981]/15 border border-[#10B981]/30 rounded-xl flex items-center gap-2 text-[#10B981]">
                              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                              <span className="text-[9px] font-bold uppercase font-mono">{t.phone.documentPassed}</span>
                            </div>
                          </motion.div>
                        )}

                        {activeTab === 'route-results' && (
                          <motion.div 
                            key="route-results"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex-1 flex flex-col justify-between"
                          >
                            <div className="space-y-3 pt-4">
                              <div className="p-3 bg-slate-900 rounded-lg space-y-1 border border-white/5 font-mono">
                                <span className="text-[8px] text-slate-500 uppercase block">{t.phone.outgoingWebhook}</span>
                                <p className="text-[9px] text-[#E2E6FF] font-bold truncate">{t.phone.postOkta}</p>
                                <span className="text-[9px] text-[#10B981] font-bold">{t.phone.syncComplete}</span>
                              </div>

                              <p className="text-[9px] text-slate-400 leading-normal font-sans">
                                {t.phone.routeDesc}
                              </p>
                            </div>

                            <div className="p-2.5 bg-[#354CE1]/15 border border-[#354CE1]/30 rounded-xl flex items-center gap-2 text-[#E2E6FF]">
                              <Network className="w-3.5 h-3.5 shrink-0" />
                               <span className="text-[9px] font-bold uppercase font-mono text-[#E2E6FF]">{t.phone.provisionComplete}</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>

              {/* Checklist Side Panel (Span 5 of 12) */}
              <div className="md:col-span-5 flex flex-col justify-center space-y-4">
                <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-md">
                  <span className="text-[9px] font-bold uppercase text-slate-400 block tracking-wider mb-3 font-mono">{t.phone.checklist}</span>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-4 h-4 rounded-full bg-[#10B981]/15 flex items-center justify-center text-[#10B981] shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span className="text-slate-700 font-semibold text-[11px]">{t.phone.checklistItems[0]}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-4 h-4 rounded-full bg-[#10B981]/15 flex items-center justify-center text-[#10B981] shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span className="text-slate-700 font-semibold text-[11px]">{t.phone.checklistItems[1]}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                      </div>
                      <span className="text-slate-700 font-semibold text-[11px]">{t.phone.checklistItems[2]}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 text-white p-4.5 rounded-2xl border border-slate-800 shadow-md space-y-1.5">
                  <span className="text-[9px] font-bold uppercase text-[#E2E6FF] block tracking-wider font-mono">{t.phone.offboarding}</span>
                  <p className="text-[11px] font-semibold">{t.phone.accessRevoke}</p>
                  <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                    {t.phone.offboardingDesc}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 6. UNIFY YOUR IDENTITY STACK (Integrations layout) - Redesigned to fit design.md */}
      <section className="bg-white border-y border-slate-100 py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] font-bold tracking-widest text-[#354CE1] uppercase bg-[#E2E6FF] px-3.5 py-1.5 rounded-full">
              {t.integrationsLabel}
            </span>
            <h2 className="text-3xl md:text-4.5xl font-sans font-semibold tracking-tight text-[#0F1E36] leading-tight">
              {t.integrationsTitle}
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              {t.integrationsDesc}
            </p>

            {/* Integrations Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {t.integrations.map((prov: any) => (
                <div 
                  key={prov.name}
                  onClick={() => {
                    setActiveIntegration(prov.name);
                    setIntegrationStatus(true);
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer text-left transition duration-200 ${
                    activeIntegration === prov.name 
                      ? 'border-[#354CE1] bg-[#E2E6FF]/20 shadow-sm' 
                      : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-[#0F1E36]">{prov.name}</span>
                    <span className={`w-2 h-2 rounded-full ${activeIntegration === prov.name ? 'bg-[#10B981]' : 'bg-slate-300'}`} />
                  </div>
                  <span className="text-[10px] text-slate-400 block font-sans">{prov.provider}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <p className="text-[#354CE1] text-xs font-bold flex items-center gap-1 cursor-pointer hover:underline" onClick={onOpenSandbox}>
                <span>{t.exploreIntegrations}</span>
                <ArrowRight className="w-3 h-3" />
              </p>
            </div>
          </div>

          {/* Right side connection hub illustration */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="bg-[#0F1E36] text-white rounded-[2.5rem] p-6 md:p-8 w-full max-w-md shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-radial-gradient from-[#354CE1]/15 to-transparent pointer-events-none" />
              
              <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-6">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#FFBF43]" />
                  <span className="text-[11px] font-bold text-slate-300 tracking-wider uppercase font-mono">{t.integrationHub}</span>
                </div>
                <span className="text-[9px] font-mono text-[#10B981] bg-[#10B981]/15 border border-[#10B981]/30 px-2.5 py-0.5 rounded-md font-bold">
                  {t.connected}
                </span>
              </div>

              {/* Connection diagram visual */}
              <div className="relative py-8 flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-[#354CE1]/20 border border-[#354CE1]/30 flex items-center justify-center text-[#354CE1] z-10 shadow-lg shadow-blue-500/10 relative">
                  <ShieldCheck className="w-10 h-10 text-white" />
                  <div className="absolute inset-0 rounded-full border border-white/10 animate-ping pointer-events-none" />
                </div>

                {/* Left Node */}
                <div className="absolute top-4 left-4 p-3 bg-slate-900 border border-white/10 rounded-xl shadow-md z-10 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#354CE1]" />
                  <span className="text-[10px] font-bold text-white font-sans">{activeIntegration}</span>
                </div>

                {/* Right Node */}
                <div className="absolute bottom-4 right-4 p-3 bg-slate-900 border border-white/10 rounded-xl shadow-md z-10 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                   <span className="text-[10px] font-bold text-[#10B981] font-sans">{t.securityGateway}</span>
                </div>

                <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-[#354CE1]/30 stroke-2" fill="none">
                  <path d="M 60 40 L 200 120" strokeDasharray="4 4" />
                  <path d="M 340 200 L 200 120" strokeDasharray="4 4" />
                </svg>
              </div>

              <div className="pt-4 border-t border-white/5 text-center space-y-1.5">
                <p className="text-xs font-bold text-white">{t.securityChallenge}</p>
                <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
                  {t.securityChallengeDescPrefix} {activeIntegration} {t.securityChallengeDescSuffix}
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. CANDIDATE VERIFICATION BANNER BLOCK - Styled with deep navy background #0F1E36 */}
      <section className="bg-[#0F1E36] py-24 px-6 text-white border-y border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[11px] font-bold tracking-widest text-[#FFBF43] uppercase bg-white/10 px-3 py-1.5 rounded-full">
              {t.hiringLabel}
            </span>
            <h2 className="text-3xl md:text-4.5xl font-sans font-semibold tracking-tight leading-tight">
              {t.candidateTitle}
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              {t.candidateDesc}
            </p>
            <div className="pt-2">
              <button 
                onClick={() => onViewChange?.('candidate-verification')}
                className="inline-flex items-center justify-center gap-2 bg-[#354CE1] hover:bg-[#2539BE] text-white font-bold px-7 py-4 rounded-full transition shadow-lg shadow-blue-900/30 group text-sm"
              >
                <span>{t.candidateLearnCta}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition shrink-0" />
              </button>
            </div>
          </div>

          {/* Face checkmarks grid */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="bg-slate-950/80 border border-white/5 p-6 rounded-[2rem] w-full max-w-sm grid grid-cols-3 gap-4 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
              
              {t.candidateGrid.map((cand: any, idx: number) => {
                const avatars = [
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
                  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
                  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
                ];
                return (
                <div key={idx} className="relative flex flex-col items-center space-y-1.5 p-2 bg-slate-900 border border-white/5 rounded-xl">
                  <div className="relative">
                    <img 
                      src={avatars[idx]} 
                      alt={cand.name} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-slate-800"
                      referrerPolicy="no-referrer"
                    />
                    {cand.verified ? (
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#10B981] border-2 border-slate-900 rounded-full flex items-center justify-center text-white text-[7px] font-bold">✓</span>
                    ) : (
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#F43F5E] border-2 border-slate-900 rounded-full flex items-center justify-center text-white text-[7px] font-bold">!</span>
                    )}
                  </div>
                  <span className="text-[10px] font-semibold text-slate-300 font-sans">{cand.name}</span>
                  {!cand.verified && (
                    <span className="text-[7px] font-bold text-[#F43F5E] bg-[#F43F5E]/15 px-1 rounded-sm uppercase tracking-wider font-mono">{cand.alert}</span>
                  )}
                </div>
              );})}
            </div>
          </div>
        </div>
      </section>

      {/* 8. ACCORDIONS SECTION (Library, Usability, IAM controls) */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12 space-y-3">
          <span className="text-[11px] font-bold tracking-widest text-[#354CE1] uppercase bg-[#E2E6FF] px-3.5 py-1.5 rounded-full">
            {t.detailsLabel}
          </span>
          <h2 className="text-3xl md:text-4xl font-sans font-semibold tracking-tight text-[#0F1E36]">
            {t.detailsTitle}
          </h2>
        </div>

        <div className="space-y-4">
          {/* Accordion 1 */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <button
              onClick={() => toggleAccordion('library')}
              className="w-full text-left p-6 flex justify-between items-center hover:bg-slate-50 transition"
            >
              <span className="font-bold text-[#0F1E36] text-sm md:text-base font-sans">{t.accordions[0].title}</span>
              {activeAccordion === 'library' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            
            <AnimatePresence>
              {activeAccordion === 'library' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-600 bg-slate-50/50">
                    <div className="space-y-2">
                      <h4 className="font-bold text-[#0F1E36] text-xs uppercase tracking-wider font-mono">{t.accordions[0].columns[0].title}</h4>
                      <p className="text-xs font-sans leading-relaxed">
                        {t.accordions[0].columns[0].desc}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-bold text-[#0F1E36] text-xs uppercase tracking-wider font-mono">{t.accordions[0].columns[1].title}</h4>
                      <p className="text-xs font-sans leading-relaxed">
                        {t.accordions[0].columns[1].desc}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-bold text-[#0F1E36] text-xs uppercase tracking-wider font-mono">{t.accordions[0].columns[2].title}</h4>
                      <p className="text-xs font-sans leading-relaxed">
                        {t.accordions[0].columns[2].desc}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-bold text-[#0F1E36] text-xs uppercase tracking-wider font-mono">{t.accordions[0].columns[3].title}</h4>
                      <p className="text-xs font-sans leading-relaxed">
                        {t.accordions[0].columns[3].desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Accordion 2 */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <button
              onClick={() => toggleAccordion('usability')}
              className="w-full text-left p-6 flex justify-between items-center hover:bg-slate-50 transition"
            >
              <span className="font-bold text-[#0F1E36] text-sm md:text-base font-sans">{t.accordions[1].title}</span>
              {activeAccordion === 'usability' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            
            <AnimatePresence>
              {activeAccordion === 'usability' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 border-t border-slate-100 text-xs space-y-3 text-slate-600 leading-relaxed bg-slate-50/50 font-sans">
                    <p>
                      {t.accordions[1].paragraphs[0]}
                    </p>
                    <p>
                      {t.accordions[1].paragraphs[1]}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Accordion 3 */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <button
              onClick={() => toggleAccordion('adaptive-controls')}
              className="w-full text-left p-6 flex justify-between items-center hover:bg-slate-50 transition"
            >
              <span className="font-bold text-[#0F1E36] text-sm md:text-base font-sans">{t.accordions[2].title}</span>
              {activeAccordion === 'adaptive-controls' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            
            <AnimatePresence>
              {activeAccordion === 'adaptive-controls' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 border-t border-slate-100 text-xs space-y-3 text-slate-600 leading-relaxed bg-slate-50/50 font-sans">
                    <p>
                      {t.accordions[2].paragraphs[0]}
                    </p>
                    <p>
                      {t.accordions[2].paragraphs[1]}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 9. SECURITY & PRIVACY TRUST BADGES SECTION */}
      <section className="bg-[#FAFBFD] border-t border-slate-200 py-24 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          
          <div className="flex flex-wrap justify-center items-center gap-4">
            {t.badges.map((badge: string) => (
              <span key={badge} className="px-3 py-2 bg-white border border-slate-200 text-slate-700 text-[10px] font-bold rounded-lg shadow-xs uppercase tracking-wider font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                {badge}
              </span>
            ))}
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-sans font-semibold tracking-tight text-[#0F1E36] leading-tight">
              {t.trustTitle}
            </h2>
            <p className="text-slate-600 text-base leading-relaxed font-sans font-normal">
              {t.trustDesc}
            </p>
            <div className="pt-4">
              <button 
                onClick={onOpenSandbox}
                className="inline-flex items-center gap-1.5 px-6 py-3.5 bg-[#0F1E36] hover:bg-[#1E293B] text-white font-bold text-xs rounded-full transition shadow-md shadow-slate-900/10 uppercase tracking-wider font-mono"
              >
                <span>{t.securityCertsCta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 10. READY TO GET STARTED / CTA SECTION */}
      <section className="bg-gradient-to-b from-[#1E43D8] to-[#142FA0] text-white py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.06),transparent_60%)] pointer-events-none" />
        
        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-sans font-semibold tracking-tight leading-tight">
            {t.readyTitle}
          </h2>
          <p className="text-blue-100 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            {t.readyDesc}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenSandbox}
              className="px-8 py-4 bg-[#FFBF43] hover:bg-[#FFBF43]/90 text-[#0F1E36] font-bold rounded-full transition shadow-xl shadow-black/10 text-sm"
            >
              {t.getDemo}
            </button>
            <button
              onClick={onBackToLanding}
              className="inline-flex items-center gap-2 px-7 py-4 bg-transparent hover:bg-white/10 text-white font-semibold rounded-full transition border border-white/20 text-sm"
            >
              <span>{t.explorePlatform}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
