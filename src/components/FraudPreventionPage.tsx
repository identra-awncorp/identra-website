/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState, useEffect } from 'react';
import { 
  Shield, ShieldCheck, ArrowRight, Check, ArrowLeft, RefreshCw, 
  Layers, CheckCircle2, Users, Search, AlertCircle, AlertTriangle,
  Database, Network, Zap, Cpu, Sliders, Play, Settings, ClipboardCheck,
  Smartphone, Eye, HelpCircle, Activity, LayoutGrid, CheckSquare, Sparkles,
  MousePointerClick, ShieldX, Ban, UserX
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FRAUD_PREVENTION_PAGE_TRANSLATIONS } from '../translations/FraudPreventionPageTranslations';
import { useLanguage } from '../context/LanguageContext';

interface FraudPreventionPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

type FraudSignalId = keyof typeof FRAUD_PREVENTION_PAGE_TRANSLATIONS.en.fraudSignals;
type DecisionKey = keyof typeof FRAUD_PREVENTION_PAGE_TRANSLATIONS.en.decisions;
type PlaybookIndustry = 'fintech' | 'crypto' | 'marketplace' | 'digitalHealth';
type PlaybookThreat = 'syntheticFraud' | 'promoAbuse' | 'accountTakeover' | 'paymentFraud';

interface FraudSignal {
  id: FraudSignalId;
  category: 'Network' | 'Device' | 'Identity' | 'Behavioral';
  threatLevel: 'low' | 'medium' | 'high';
  scoreImpact: number;
}

const FRAUD_SIGNALS: FraudSignal[] = [
  { id: 'vpn', category: 'Network', threatLevel: 'medium', scoreImpact: 25 },
  { id: 'emulator', category: 'Device', threatLevel: 'high', scoreImpact: 35 },
  { id: 'cloned', category: 'Device', threatLevel: 'medium', scoreImpact: 20 },
  { id: 'synthetic', category: 'Identity', threatLevel: 'high', scoreImpact: 40 },
  { id: 'copypaste', category: 'Behavioral', threatLevel: 'low', scoreImpact: 15 },
  { id: 'velocity', category: 'Network', threatLevel: 'high', scoreImpact: 30 }
];

export default function FraudPreventionPage({ onOpenSandbox, onBackToLanding, onViewChange }: FraudPreventionPageProps) {
  const { language } = useLanguage();

  const t = FRAUD_PREVENTION_PAGE_TRANSLATIONS[language];
  const playbookIndustryLabels: Record<PlaybookIndustry, string> = {
    fintech: t.copy.fintech,
    crypto: t.copy.crypto,
    marketplace: t.copy.marketplace,
    digitalHealth: t.copy.digitalHealth
  };
  const playbookThreatLabels: Record<PlaybookThreat, string> = {
    syntheticFraud: t.copy.syntheticFraud,
    promoAbuse: t.copy.promoAbuse,
    accountTakeover: t.copy.accountTakeover,
    paymentFraud: t.copy.paymentFraud
  };

  // Playground state
  const [activeSignals, setActiveSignals] = useState<FraudSignalId[]>(['vpn']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [simStep, setSimStep] = useState<string>('idle');
  const [verificationLog, setVerificationLog] = useState<string[]>([]);
  
  // Use case tabs
  const [activeTab, setActiveTab] = useState<'synthetic' | 'ato' | 'promo' | 'payment'>('synthetic');
  
  // Interactive playbook state
  const [pbName, setPbName] = useState('');
  const [pbCompany, setPbCompany] = useState('');
  const [pbIndustry, setPbIndustry] = useState<PlaybookIndustry>('fintech');
  const [pbThreat, setPbThreat] = useState<PlaybookThreat>('syntheticFraud');
  const [pbCreated, setPbCreated] = useState(false);

  // Calculate dynamic score
  const totalScore = activeSignals.reduce((sum, sigId) => {
    const sig = FRAUD_SIGNALS.find(s => s.id === sigId);
    return sum + (sig ? sig.scoreImpact : 0);
  }, 0);

  // Cap risk score at 100
  const riskScore = Math.min(totalScore, 100);

  // Calculate Decision Outcome
  const getDecision = () => {
    if (riskScore <= 20) {
      return {
        copyKey: 'pass' as DecisionKey,
        color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
        badgeColor: 'bg-emerald-500'
      };
    } else if (riskScore <= 55) {
      return {
        copyKey: 'stepUp' as DecisionKey,
        color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
        badgeColor: 'bg-amber-500'
      };
    } else if (riskScore <= 80) {
      return {
        copyKey: 'flag' as DecisionKey,
        color: 'text-indigo-500 bg-[#E2E6FF] border-indigo-200',
        badgeColor: 'bg-indigo-600'
      };
    } else {
      return {
        copyKey: 'block' as DecisionKey,
        color: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
        badgeColor: 'bg-rose-500'
      };
    }
  };

  const decision = getDecision();
  const decisionCopy = t.decisions[decision.copyKey];

  const handleToggleSignal = (id: FraudSignalId) => {
    if (activeSignals.includes(id)) {
      setActiveSignals(activeSignals.filter(s => s !== id));
    } else {
      setActiveSignals([...activeSignals, id]);
    }
  };

  // Run visual routing simulation
  const runSimulation = () => {
    setIsVerifying(true);
    setVerificationLog([]);
    setSimStep('collection');
    const currentDecisionCopy = t.decisions[decision.copyKey];
    
    setTimeout(() => {
      setSimStep('verifying');
      setVerificationLog(prev => [...prev, `⚡ ${t.copy.collectingPassiveDigitalSignals}`]);
      
      setTimeout(() => {
        setSimStep('risk_evaluation');
        if (activeSignals.length > 0) {
          setVerificationLog(prev => [
            ...prev,
            `🔍 ${t.copy.identityLookupMatchesPassed}`,
            `⚠️ ${t.copy.found} ${activeSignals.length} ${t.copy.highThreatFraudFlags}`
          ]);
        } else {
          setVerificationLog(prev => [
            ...prev,
            `🔍 ${t.copy.identityLookupMatchesPassed}`,
            `✓ ${t.copy.noProxyHardwareOrBehavioralAnomaliesFound}`
          ]);
        }

        setTimeout(() => {
          setSimStep('decision');
          setVerificationLog(prev => [
            ...prev,
            `🛡️ ${t.copy.orchestrationDecisionAutomated} ${currentDecisionCopy.label} - ${currentDecisionCopy.action}`
          ]);
          setIsVerifying(false);
        }, 1200);
      }, 1200);
    }, 1000);
  };

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-slate-800 antialiased selection:bg-[#354CE1]/10 selection:text-[#354CE1]">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1E43D8] to-[#142FA0] text-white pt-24 pb-20 md:pt-32 md:pb-28">
        {/* Background graphic accents */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="absolute top-1/4 left-1/10 w-48 h-48 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/10 w-72 h-72 bg-[#00E5FF]/15 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <button 
            onClick={onBackToLanding}
            className="group inline-flex items-center gap-2 text-blue-100 hover:text-white text-xs font-semibold mb-8 transition"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />{t.copy.backToPlatform}</button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-[11px] font-bold tracking-wider text-yellow-300 uppercase border border-white/25 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-yellow-300" />{t.copy.solutionsBusinessGoals}</div>
              <h1 className="text-3xl sm:text-4xl md:text-5.5xl font-sans font-semibold tracking-tight text-white leading-[1.1]">{t.copy.stopFraud}<br />{t.copy.keepCustomerTrust}</h1>
              <p className="text-base sm:text-lg text-blue-50/95 max-w-xl font-normal leading-relaxed">{t.copy.collectTheRightSignalsVerifyIdentitiesDynamicallyAnd}</p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={onOpenSandbox}
                  className="bg-white hover:bg-slate-50 text-[#354CE1] font-semibold text-sm px-7 py-3.5 rounded-full transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-950/20 cursor-pointer"
                >{t.copy.verifyDemoAccounts}<ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Simulated Live Fraud Shield Widget */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-slate-800 p-6 shadow-2xl relative overflow-hidden text-slate-300 font-mono text-xs">
                {/* Header indicators */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-slate-400 font-bold tracking-wider uppercase text-[9px]">{t.copy.liveFraudEngine}</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                </div>

                <div className="space-y-3.5">
                  <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800/80">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                      <span>{t.copy.signUpSource}</span>
                      <span className="text-emerald-400 font-bold">{t.copy.activeRoute}</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-100 flex items-center justify-between font-sans">
                      <span>Customer #9184</span>
                      <span className="font-mono text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded">{t.copy.passedKyc}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800/80">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                      <span>{t.copy.velocityCheck}</span>
                      <span className="text-rose-400 font-bold">{t.copy.blocked}</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-100 flex items-center justify-between font-sans">
                      <span>Customer #9185</span>
                      <span className="font-mono text-[10px] bg-rose-500/10 text-rose-400 px-1.5 py-0.5 rounded">{t.copy.repeatedDevice}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800/80">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                      <span>{t.copy.lookupMatch}</span>
                      <span className="text-amber-400 font-bold">{t.copy.stepUp}</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-100 flex items-center justify-between font-sans">
                      <span>Customer #9186</span>
                      <span className="font-mono text-[10px] bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded">{t.copy.mfaRequired}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-500 flex justify-between items-center">
                  <span>SHIELD VERSION 4.8</span>
                  <span className="font-sans font-bold text-slate-400">{t.copy.totalVolume1429kDay}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="bg-white border-y border-slate-200/60 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
            <div className="space-y-1">
              <p className="text-3xl md:text-4xl font-display font-semibold text-[#0F1E36] tracking-tight">
                -99%
              </p>
              <p className="text-xs text-slate-500 font-medium">{t.copy.syntheticFraudDrops}</p>
            </div>
            <div className="space-y-1 md:border-l md:border-slate-100 md:pl-8">
              <p className="text-3xl md:text-4xl font-display font-semibold text-[#0F1E36] tracking-tight">
                98.4%
              </p>
              <p className="text-xs text-slate-500 font-medium">{t.copy.automatedDirectPasses}</p>
            </div>
            <div className="space-y-1 md:border-l md:border-slate-100 md:pl-8">
              <p className="text-3xl md:text-4xl font-display font-semibold text-[#0F1E36] tracking-tight">
                &lt; 3s
              </p>
              <p className="text-xs text-slate-500 font-medium">{t.copy.riskScoringAssessment}</p>
            </div>
            <div className="space-y-1 md:border-l md:border-slate-100 md:pl-8">
              <p className="text-3xl md:text-4xl font-display font-semibold text-[#0F1E36] tracking-tight">
                -45%
              </p>
              <p className="text-xs text-slate-500 font-medium">{t.copy.manualReviewWorkloads}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE SHIELD PLAYGROUND */}
      <section className="py-20 bg-[#FAFBFD]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-[#354CE1] uppercase tracking-wider px-3 py-1 bg-[#E2E6FF] rounded-full">{t.copy.interactiveDemo}</span>
            <h2 className="text-3xl font-sans font-semibold tracking-tight text-[#0F1E36]">{t.copy.playgroundTheFraudPreventionEngine}</h2>
            <p className="text-sm text-slate-600">{t.copy.togglePassiveSignalsOrSyntheticFlagsBelowTo}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Box: Controls (Signals list) */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">{t.copy.simulateRiskSignals}</h3>
              <div className="grid grid-cols-1 gap-3">
                {FRAUD_SIGNALS.map((sig) => {
                  const isActive = activeSignals.includes(sig.id);
                  const signalCopy = t.fraudSignals[sig.id];
                  return (
                    <button
                      key={sig.id}
                      onClick={() => handleToggleSignal(sig.id)}
                      className={`p-4 text-left rounded-xl border transition flex items-start gap-3.5 focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20 ${
                        isActive 
                          ? 'border-[#354CE1] bg-[#354CE1]/5 shadow-sm' 
                          : 'border-slate-200 bg-white hover:border-slate-350 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0 border ${
                        isActive
                          ? 'bg-[#354CE1] border-[#354CE1] text-white'
                          : 'border-slate-300 bg-white text-transparent'
                      }`}>
                        <Check className="w-3.5 h-3.5 stroke-[3px]" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-950">
                            {signalCopy.label}
                          </span>
                          <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-sm border ${
                            sig.threatLevel === 'high'
                              ? 'text-rose-600 bg-rose-50 border-rose-100'
                              : sig.threatLevel === 'medium'
                                ? 'text-amber-600 bg-amber-50 border-amber-100'
                                : 'text-slate-500 bg-slate-50 border-slate-100'
                          }`}>
                            {t.threatLevels[sig.threatLevel]}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-normal">
                          {signalCopy.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Box: Simulation Sandbox & Dynamic Graph */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Inside Live Visualized Engine */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm relative space-y-6 overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{t.copy.orchestrationDecisionHub}</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5 font-sans">{t.copy.activeRiskLevelAndRoutingLogic}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                    <Activity className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-[10px] font-mono font-bold text-slate-500">{t.copy.score} {riskScore}/100</span>
                  </div>
                </div>

                {/* Speedometer Gauge Widget */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-2">
                  <div className="flex flex-col items-center">
                    {/* SVG Gauge */}
                    <div className="relative w-44 h-24 overflow-hidden">
                      {/* Gauge arc track */}
                      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 50">
                        <path 
                          d="M10,45 A40,40 0 0,1 90,45" 
                          fill="none" 
                          stroke="#E2E8F0" 
                          strokeWidth="8" 
                          strokeLinecap="round" 
                        />
                        {/* Dynamic colorful threat level overlay fill */}
                        <path 
                          d="M10,45 A40,40 0 0,1 90,45" 
                          fill="none" 
                          stroke={riskScore > 55 ? '#F43F5E' : riskScore > 20 ? '#F59E0B' : '#10B981'} 
                          strokeWidth="8" 
                          strokeLinecap="round" 
                          strokeDasharray="126"
                          strokeDashoffset={126 - (126 * riskScore) / 100}
                          className="transition-all duration-700 ease-out"
                        />
                      </svg>

                      {/* Needle gauge */}
                      <div 
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-14 origin-bottom transition-all duration-700 ease-out"
                        style={{ transform: `translateX(-50%) rotate(${-90 + (riskScore * 180) / 100}deg)` }}
                      >
                        <div className="w-1.5 h-12 bg-slate-900 rounded-full" />
                        <div className="w-4 h-4 bg-slate-900 rounded-full -mt-2 -ml-1 border-2 border-white" />
                      </div>
                    </div>

                    <div className="text-center mt-2">
                      <p className="text-xs text-slate-400 font-medium">{t.copy.calculatedRisk}</p>
                      <p className="text-lg font-bold text-slate-900 font-mono tracking-tight mt-0.5">{riskScore}%</p>
                    </div>
                  </div>

                  {/* Decision Display */}
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">{t.copy.decisionOutcome}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold font-mono px-3 py-1 rounded border ${decision.color}`}>
                          {decisionCopy.label}
                        </span>
                        <span className="text-xs font-bold text-slate-900">{decisionCopy.action}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                      {decisionCopy.details}
                    </p>
                  </div>
                </div>

                {/* Animated Decision flow diagram paths */}
                <div className="pt-4 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4 block">{t.copy.visualOrchestrationRoute}</span>
                  
                  <div className="grid grid-cols-4 gap-2 text-center text-[10px] relative">
                    
                    {/* Collection */}
                    <div className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition ${
                      simStep === 'collection' ? 'border-[#354CE1] bg-[#354CE1]/5 text-[#354CE1] font-bold' : 'border-slate-200 text-slate-500 bg-white'
                    }`}>
                      <LayoutGrid className="w-4 h-4 shrink-0" />
                      <span>{t.copy.collection}</span>
                    </div>

                    {/* Verifications */}
                    <div className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition ${
                      simStep === 'verifying' ? 'border-[#354CE1] bg-[#354CE1]/5 text-[#354CE1] font-bold' : 'border-slate-200 text-slate-500 bg-white'
                    }`}>
                      <Database className="w-4 h-4 shrink-0" />
                      <span>{t.copy.verifications}</span>
                    </div>

                    {/* Risk Screening */}
                    <div className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition ${
                      simStep === 'risk_evaluation' ? 'border-[#354CE1] bg-[#354CE1]/5 text-[#354CE1] font-bold' : 'border-slate-200 text-slate-500 bg-white'
                    }`}>
                      <Sliders className="w-4 h-4 shrink-0" />
                      <span>{t.copy.riskRules}</span>
                    </div>

                    {/* Ultimate Decision */}
                    <div className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition ${
                      simStep === 'decision' ? `border-slate-900 bg-slate-900 text-white font-bold` : 'border-slate-200 text-slate-500 bg-white'
                    }`}>
                      {riskScore > 55 ? <Ban className="w-4 h-4 shrink-0" /> : <ShieldCheck className="w-4 h-4 shrink-0" />}
                      <span>{t.copy.action}</span>
                    </div>

                  </div>
                </div>

                {/* Action trigger button */}
                <div className="flex items-center justify-between gap-4 pt-2">
                  <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{t.copy.realTimeSignalsConnected}</span>
                  </div>
                  <button
                    onClick={runSimulation}
                    disabled={isVerifying}
                    className="bg-[#354CE1] hover:bg-[#2539BE] text-white text-xs font-semibold px-5 py-2.5 rounded-full flex items-center gap-1.5 shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isVerifying ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>{t.copy.evaluating}</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>{t.copy.runDecisionRoute}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Console log outputs */}
              {verificationLog.length > 0 && (
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-300 font-mono text-xs space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="text-[10px] text-slate-500 font-bold border-b border-slate-900 pb-2 flex items-center justify-between">
                    <span>{t.copy.mockApiWebhookLogs}</span>
                    <span className="text-indigo-400">{t.copy.statusSuccess}</span>
                  </div>
                  <div className="space-y-1">
                    {verificationLog.map((log, idx) => (
                      <div key={idx} className="leading-relaxed">
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* 4. KEY CAPABILITIES BENTO GRID */}
      <section className="py-20 bg-white border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <span className="text-xs font-bold text-[#354CE1] uppercase tracking-wider px-3 py-1 bg-[#E2E6FF] rounded-full">{t.copy.productDepth}</span>
            <h2 className="text-3xl font-sans font-semibold tracking-tight text-[#0F1E36]">{t.copy.engineeredToCounterSophisticatedFraudThreats}</h2>
            <p className="text-sm text-slate-600">{t.copy.stopBadActorsWithoutBlockingYourGoodCustomers}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Bento 1: Dynamic Verification */}
            <div className="bg-[#FAFBFD] rounded-2xl border border-slate-200/60 p-6 flex flex-col justify-between hover:border-[#354CE1]/30 transition group">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-[#E2E6FF] text-[#354CE1] rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0F1E36] font-sans">{t.copy.dynamicVerificationFlows}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">{t.copy.automaticallySlideVerificationHurdlesUpOrDownBased}</p>
              </div>
              <div className="pt-6">
                <button type="button" className="text-xs font-semibold text-[#354CE1] inline-flex items-center gap-1" onClick={() => onViewChange?.('dynamic-flow')}>
                  <span>{t.copy.exploreFlowEditor}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>

            {/* Bento 2: Active & Passive Signals */}
            <div className="bg-[#FAFBFD] rounded-2xl border border-slate-200/60 p-6 flex flex-col justify-between hover:border-[#354CE1]/30 transition group">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-[#E2E6FF] text-[#354CE1] rounded-xl flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0F1E36] font-sans">{t.copy.hardwarePassiveRiskSignals}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">{t.copy.sniffOutVpnsSyntheticIpRoutingEmulatorsBotnets}</p>
              </div>
              <div className="pt-6">
                <button type="button" className="text-xs font-semibold text-[#354CE1] inline-flex items-center gap-1" onClick={() => onViewChange?.('passive-signals')}>
                  <span>{t.copy.viewPassiveSignals}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>

            {/* Bento 3: Global Watchlists */}
            <div className="bg-[#FAFBFD] rounded-2xl border border-slate-200/60 p-6 flex flex-col justify-between hover:border-[#354CE1]/30 transition group">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-[#E2E6FF] text-[#354CE1] rounded-xl flex items-center justify-center">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0F1E36] font-sans">{t.copy.automatedDatabaseChecks}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">{t.copy.crossmatchSsnBirthdateAndBusinessRegistryEntriesAgainst}</p>
              </div>
              <div className="pt-6">
                <button type="button" className="text-xs font-semibold text-[#354CE1] inline-flex items-center gap-1" onClick={() => onViewChange?.('database-checks')}>
                  <span>{t.copy.exploreDatabaseChecks}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>

            {/* Bento 4: Link Analysis & Graph */}
            <div className="bg-[#FAFBFD] rounded-2xl border border-slate-200/60 p-6 flex flex-col justify-between hover:border-[#354CE1]/30 transition group">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-[#E2E6FF] text-[#354CE1] rounded-xl flex items-center justify-center">
                  <Network className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0F1E36] font-sans">{t.copy.fraudRingLinkAnalysis}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">{t.copy.uncoverProfessionalRingsTryingToSpawnMultipleSynthetic}</p>
              </div>
              <div className="pt-6">
                <button type="button" className="text-xs font-semibold text-[#354CE1] inline-flex items-center gap-1" onClick={() => onViewChange?.('graph')}>
                  <span>{t.copy.exploreGraph}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>

            {/* Bento 5: No-Code Rules Engine */}
            <div className="bg-[#FAFBFD] rounded-2xl border border-slate-200/60 p-6 flex flex-col justify-between hover:border-[#354CE1]/30 transition group">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-[#E2E6FF] text-[#354CE1] rounded-xl flex items-center justify-center">
                  <Sliders className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0F1E36] font-sans">{t.copy.noCodeOrchestrationWorkflows}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">{t.copy.defineYourExactSecurityParametersWithoutTypingCode}</p>
              </div>
              <div className="pt-6">
                <button type="button" className="text-xs font-semibold text-[#354CE1] inline-flex items-center gap-1" onClick={() => onViewChange?.('workflows')}>
                  <span>{t.copy.exploreWorkflows}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>

            {/* Bento 6: Unified Manual Review */}
            <div className="bg-[#FAFBFD] rounded-2xl border border-slate-200/60 p-6 flex flex-col justify-between hover:border-[#354CE1]/30 transition group">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-[#E2E6FF] text-[#354CE1] rounded-xl flex items-center justify-center">
                  <ClipboardCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0F1E36] font-sans">{t.copy.integratedCaseManagement}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">{t.copy.provideYourComplianceOrTrustAndSafetyTeams}</p>
              </div>
              <div className="pt-6">
                <button type="button" className="text-xs font-semibold text-[#354CE1] inline-flex items-center gap-1" onClick={() => onViewChange?.('case-management')}>
                  <span>{t.copy.exploreCases}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE USE CASE TABS */}
      <section className="py-20 bg-[#FAFBFD]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="text-2xl font-sans font-semibold tracking-tight text-[#0F1E36]">{t.copy.defenseStrategiesTailorMadeForYourSpecificRisks}</h2>
            <p className="text-sm text-slate-500">{t.copy.selectAnAreaBelowToVisualizeHowOur}</p>
          </div>

          {/* Tab buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 border-b border-slate-200 pb-4 max-w-2xl mx-auto">
            <button
              onClick={() => setActiveTab('synthetic')}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition ${
                activeTab === 'synthetic'
                  ? 'bg-slate-900 text-white shadow'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >{t.copy.syntheticIdentityFraud}</button>
            <button
              onClick={() => setActiveTab('ato')}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition ${
                activeTab === 'ato'
                  ? 'bg-slate-900 text-white shadow'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >{t.copy.accountTakeoverAto}</button>
            <button
              onClick={() => setActiveTab('promo')}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition ${
                activeTab === 'promo'
                  ? 'bg-slate-900 text-white shadow'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >{t.copy.promoAbuse}</button>
            <button
              onClick={() => setActiveTab('payment')}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition ${
                activeTab === 'payment'
                  ? 'bg-slate-900 text-white shadow'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >{t.copy.paymentFraud}</button>
          </div>

          {/* Tab content panels */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <AnimatePresence mode="wait">
              {activeTab === 'synthetic' && (
                <motion.div
                  key="synthetic"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  <div className="lg:col-span-6 space-y-4">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-[#354CE1] flex items-center justify-center">
                      <Shield className="w-4 h-4" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 font-sans">{t.copy.deterSyntheticIdentityFraud}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans">{t.copy.syntheticFraudIsHardToCatchBecauseLookups}</p>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans">{t.copy.identraCounteractsThisByCombiningDeepIdentityVerification}</p>
                    <ul className="space-y-2 text-xs text-slate-600 font-sans font-medium pt-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />{t.copy.verifyDocumentOcrMatchesOfficialRecords}</li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />{t.copy.detectFakeVirtualOrDisposableVoipPhoneRegistrations}</li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />{t.copy.crosscheckDatabaseValidationWithDeathMasterFiles}</li>
                    </ul>
                  </div>
                  <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 text-slate-300 font-mono text-xs space-y-4">
                    <div className="text-[10px] text-slate-500 font-bold border-b border-slate-900 pb-2">{t.copy.realTimeAnalysisReport}</div>
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span>{t.copy.identityDatabaseLookup}</span>
                        <span className="text-emerald-400">{t.copy.passed}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>{t.copy.selfieBiometricLiveness}</span>
                        <span className="text-emerald-400">{t.copy.passed}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>{t.copy.ssnIssuanceDateIntegrity}</span>
                        <span className="text-rose-400">{t.copy.alertIssuedPreBirth}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>{t.copy.phoneCarrierMatch}</span>
                        <span className="text-rose-400">{t.copy.alertVoipDetected}</span>
                      </div>
                    </div>
                    <div className="bg-rose-500/10 border border-rose-500/20 p-3 rounded-lg text-rose-400 text-[11px] font-sans">
                      <span className="font-bold uppercase">{t.copy.automatedRouteAction}</span>{t.copy.blockedAccountCreationDueToSyntheticFraudSignatures}</div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'ato' && (
                <motion.div
                  key="ato"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  <div className="lg:col-span-6 space-y-4">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-[#354CE1] flex items-center justify-center">
                      <Shield className="w-4 h-4" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 font-sans">{t.copy.preventAccountTakeoversAto}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans">{t.copy.dontLetHijackedAccountsRuinCustomerLoyaltyWhen}</p>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans">{t.copy.ifAUserSignsInFromACompletely}</p>
                    <ul className="space-y-2 text-xs text-slate-600 font-sans font-medium pt-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />{t.copy.compareActiveBrowserFeaturesWithPastProfiles}</li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />{t.copy.requireDynamicPushToVerifySelfieStepups}</li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />{t.copy.triggerWebhookUpdatesToFreezeTransactionsInYour}</li>
                    </ul>
                  </div>
                  <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 text-slate-300 font-mono text-xs space-y-4">
                    <div className="text-[10px] text-slate-500 font-bold border-b border-slate-900 pb-2">{t.copy.dynamicWorkflowResponse}</div>
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span>{t.copy.deviceFingerprintMatch}</span>
                        <span className="text-amber-400">{t.copy.mismatchedIdNewDevice}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>{t.copy.ipLocationConsistency}</span>
                        <span className="text-amber-400">{t.copy.unexpectedRange}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>{t.copy.flowTriggerAction}</span>
                        <span className="text-indigo-400">{t.copy.deregisterChallenge}</span>
                      </div>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg text-amber-400 text-[11px] font-sans">
                      <span className="font-bold uppercase">{t.copy.automatedRouteAction}</span>{t.copy.mandatedSelfieValidationBeforeAllowingPayoutBalanceAccess}</div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'promo' && (
                <motion.div
                  key="promo"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  <div className="lg:col-span-6 space-y-4">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-[#354CE1] flex items-center justify-center">
                      <Shield className="w-4 h-4" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 font-sans">{t.copy.defeatPromoAbuseMultiAccounting}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans">{t.copy.keepPromotionalBudgetForRealPeopleNotBot}</p>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans">{t.copy.identraUsesGraphAnalysisToGroupConnectionsInstantly}</p>
                    <ul className="space-y-2 text-xs text-slate-600 font-sans font-medium pt-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />{t.copy.detectCanvasRenderingAndAudioSignatureDuplicates}</li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />{t.copy.flagDisposableEmailDomainsAndRapidPhoneChanges}</li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />{t.copy.mapLinkedAccountsInOurVisualGraphPlayground}</li>
                    </ul>
                  </div>
                  <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 text-slate-300 font-mono text-xs space-y-4">
                    <div className="text-[10px] text-slate-500 font-bold border-b border-slate-900 pb-2">{t.copy.linkAnalysisEngine}</div>
                    <div className="p-3 bg-slate-900/60 rounded border border-slate-800 space-y-2">
                      <div className="text-[10px] font-bold text-slate-400">{t.copy.detectedClusterGroup3}</div>
                      <div className="space-y-1 text-[11px]">
                        <div>• User-817A (Shared Device Fingerprint A)</div>
                        <div>• User-817B (Shared Device Fingerprint A)</div>
                        <div>• User-817C (Shared Device Fingerprint A)</div>
                      </div>
                    </div>
                    <div className="bg-rose-500/10 border border-rose-500/20 p-3 rounded-lg text-rose-400 text-[11px] font-sans">
                      <span className="font-bold uppercase">{t.copy.automatedRouteAction}</span>{t.copy.blockedSignUpBonusCreditsForClusterOf}</div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  <div className="lg:col-span-6 space-y-4">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-[#354CE1] flex items-center justify-center">
                      <Shield className="w-4 h-4" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 font-sans">{t.copy.stopChargebacksAndPaymentFraud}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans">{t.copy.preventCreditCardFraudBeforeTransactionProcessingIdentra}</p>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans">{t.copy.whenCreditCardsAndApplicantRecordsDontMatch}</p>
                    <ul className="space-y-2 text-xs text-slate-600 font-sans font-medium pt-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />{t.copy.verifyCardholderNamesAgainstIdentityDatabases}</li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />{t.copy.triggerStepUpValidationRulesBasedOnPurchase}</li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />{t.copy.maintainAContinuousBlacklistOfCompromisedDetails}</li>
                    </ul>
                  </div>
                  <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 text-slate-300 font-mono text-xs space-y-4">
                    <div className="text-[10px] text-slate-500 font-bold border-b border-slate-900 pb-2">{t.copy.paymentShieldAnalysis}</div>
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span>{t.copy.cardholderNameVerification}</span>
                        <span className="text-rose-400">{t.copy.mismatchedCardVsIdName}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>{t.copy.billingZipCodeCheck}</span>
                        <span className="text-emerald-400">{t.copy.passed}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>{t.copy.singleDeviceTransactionSpeed}</span>
                        <span className="text-rose-400">{t.copy.suspicious4CardsTriedIn5Min}</span>
                      </div>
                    </div>
                    <div className="bg-rose-500/10 border border-rose-500/20 p-3 rounded-lg text-rose-400 text-[11px] font-sans">
                      <span className="font-bold uppercase">{t.copy.automatedRouteAction}</span>{t.copy.blockedTransactionFlowAndRestrictedPaymentProfile}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 6. PLAYBOOK CREATOR LEAD FORM */}
      <section className="py-20 bg-gradient-to-tr from-[#0F1E36] to-[#1E293B] text-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#354CE1]/25 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-yellow-400/10 rounded-full blur-2xl" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Form Info */}
              <div className="md:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 rounded-full text-[10px] font-bold text-yellow-300 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />{t.copy.freeCustomPlaybook}</div>
                <h3 className="text-2xl md:text-3xl font-sans font-semibold tracking-tight">{t.copy.buildYourFreeAntiFraudStrategy}</h3>
                <p className="text-xs text-slate-350 leading-relaxed font-sans">{t.copy.tellUsAboutYourIndustryAndMainFraud}</p>

                <div className="space-y-3 pt-2 text-xs text-slate-300 font-sans">
                  <div className="flex items-center gap-2.5">
                    <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t.copy.orchestrationStepsCustomBuiltForYourTeam}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t.copy.realApiSignalsAndRecommendedWebhooks}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t.copy.tipsToBalanceSmoothSignupsWithSecurity}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic Form / Result */}
              <div className="md:col-span-6 bg-white/5 border border-white/10 p-6 rounded-2xl relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {!pbCreated ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (pbName && pbCompany) {
                          setPbCreated(true);
                        }
                      }}
                      className="space-y-4 text-slate-300 text-xs"
                    >
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.copy.yourName}</label>
                        <input
                          type="text"
                          required
                          value={pbName}
                          onChange={(e) => setPbName(e.target.value)}
                          placeholder="Eleanor Vance"
                          className="w-full px-3.5 py-2.5 bg-slate-900/60 border border-slate-700 rounded-xl focus:outline-none focus:border-[#354CE1] focus:ring-1 focus:ring-[#354CE1]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.copy.companyName}</label>
                        <input
                          type="text"
                          required
                          value={pbCompany}
                          onChange={(e) => setPbCompany(e.target.value)}
                          placeholder="Alpha FinTech"
                          className="w-full px-3.5 py-2.5 bg-slate-900/60 border border-slate-700 rounded-xl focus:outline-none focus:border-[#354CE1] focus:ring-1 focus:ring-[#354CE1]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.copy.industry}</label>
                          <select
                            value={pbIndustry}
                            onChange={(e) => setPbIndustry(e.target.value as PlaybookIndustry)}
                            className="w-full px-3.5 py-2.5 bg-slate-900/60 border border-slate-700 rounded-xl focus:outline-none focus:border-[#354CE1]"
                          >
                            <option value="fintech">{t.copy.fintech}</option>
                            <option value="crypto">{t.copy.crypto}</option>
                            <option value="marketplace">{t.copy.marketplace}</option>
                            <option value="digitalHealth">{t.copy.digitalHealth}</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.copy.threatFocus}</label>
                          <select
                            value={pbThreat}
                            onChange={(e) => setPbThreat(e.target.value as PlaybookThreat)}
                            className="w-full px-3.5 py-2.5 bg-slate-900/60 border border-slate-700 rounded-xl focus:outline-none focus:border-[#354CE1]"
                          >
                            <option value="syntheticFraud">{t.copy.syntheticFraud}</option>
                            <option value="promoAbuse">{t.copy.promoAbuse}</option>
                            <option value="accountTakeover">{t.copy.accountTakeover}</option>
                            <option value="paymentFraud">{t.copy.paymentFraud}</option>
                          </select>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#354CE1] hover:bg-[#2539BE] text-white font-semibold py-3 rounded-full shadow transition-all duration-200 mt-2 cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <span>{t.copy.generateCustomPlaybook}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="playbook"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-4"
                    >
                      <div className="text-center pb-2 border-b border-white/10">
                        <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-1.5" />
                        <h4 className="text-sm font-bold text-white">{t.copy.antiFraudPlaybookReady}</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">{t.copy.customCompiledFor} {pbCompany}</p>
                      </div>

                      <div className="space-y-3.5 text-slate-300 text-xs leading-relaxed font-sans">
                        <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1.5">
                          <span className="text-[9px] font-bold uppercase text-yellow-300 font-mono tracking-wider">{t.copy.recommendedSetup}</span>
                          <p className="text-xs text-white font-semibold">{t.copy.orchestrationPhaseOnboardingVerification}</p>
                          <p className="text-[11px] text-slate-450">{t.copy.for} {playbookIndustryLabels[pbIndustry]} {t.copy.playersWeRecommendRequiringAVerifiedGovernmentId}</p>
                        </div>

                        <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1.5">
                          <span className="text-[9px] font-bold uppercase text-[#00E5FF] font-mono tracking-wider">{t.copy.dynamicRiskScoreRule}</span>
                          <p className="text-xs text-white font-semibold">{t.copy.addressing} {playbookThreatLabels[pbThreat]}</p>
                          <p className="text-[11px] text-slate-450">{t.copy.setYourThresholdScoreTo45Below45}</p>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2 border-t border-white/10">
                        <button
                          onClick={() => setPbCreated(false)}
                          className="flex-1 bg-white/10 hover:bg-white/15 text-white font-semibold py-2.5 rounded-full text-xs transition text-center"
                        >{t.copy.startOver}</button>
                        <button
                          onClick={onOpenSandbox}
                          className="flex-1 bg-[#354CE1] hover:bg-[#2539BE] text-white font-semibold py-2.5 rounded-full text-xs transition text-center"
                        >{t.copy.tryInSandbox}</button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA STRIP */}
      <section className="bg-slate-50 border-t border-slate-200/60 py-16 text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h3 className="text-2xl font-sans font-semibold tracking-tight text-[#0F1E36]">{t.copy.readyToShieldYourOrganization}</h3>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">{t.copy.integrateOurRealTimeFraudDefenseModulesTo}</p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={onOpenSandbox}
              className="bg-[#354CE1] hover:bg-[#2539BE] text-white font-semibold text-sm px-6 py-3 rounded-full transition shadow-sm cursor-pointer"
            >{t.copy.launchLiveDemoSandbox}</button>
            <button
              onClick={onBackToLanding}
              className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-sm px-6 py-3 rounded-full transition cursor-pointer"
            >{t.copy.returnHome}</button>
          </div>
        </div>
      </section>

    </div>
  );
}
