/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GitCommit, ArrowRight, ShieldCheck, Check, Users, Lock, 
  Database, Smartphone, HelpCircle, AlertTriangle, FileText, 
  Share2, Zap, Sliders, Settings, Play, RefreshCw, 
  User, CheckCircle2, AlertCircle, Plus, Trash2, Bell, Shield, ShieldAlert,
  Clock, Search, BookOpen, ChevronDown, Landmark, Globe, Terminal,
  Fingerprint, Activity, Filter, Cpu, Layers, Eye, Link2, Server,
  MessageSquare, Sparkles, Code, CheckSquare, Info
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';

import { WORKFLOWS_PAGE_TRANSLATIONS } from '../translations/WorkflowsPageTranslations';

interface WorkflowsPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

type TabType = 'Trigger' | 'Consolidate' | 'Decide' | 'Act';

interface TestUser {
  name: string;
  email: string;
  country: string;
  riskScore: number;
  hasSelfie: boolean;
  ipCheck: 'Clean' | 'Proxy' | 'VPN';
}

export default function WorkflowsPage({ onOpenSandbox, onBackToLanding, onViewChange }: WorkflowsPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(WORKFLOWS_PAGE_TRANSLATIONS, language as keyof typeof WORKFLOWS_PAGE_TRANSLATIONS, 'WORKFLOWS_PAGE_TRANSLATIONS');

  // Navigation active state for interactive "How it works" section
  const [activeTab, setActiveTab] = useState<TabType>('Trigger');
  
  // States for Live Workflow Simulator
  const [selectedUser, setSelectedUser] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationStep, setSimulationStep] = useState<number>(-1);
  const [simLogs, setSimLogs] = useState<string[]>([]);
  const [simResult, setSimResult] = useState<'Approved' | 'Review' | 'Declined' | null>(null);

  // Custom workflow rules configured by the user
  const [rules, setRules] = useState({
    maxRiskScore: 60,
    requireSelfieOnVpn: true,
    notifyOnReview: true,
    autoDeclineHighRisk: true,
  });

  const testUsers: TestUser[] = [
    { name: 'Sarah Jenkins', email: 's.jenkins@gmail.com', country: 'United States', riskScore: 18, hasSelfie: true, ipCheck: 'Clean' },
    { name: 'Dmitri Petrov', email: 'dmitri_99@temp-mail.ru', country: 'Russia', riskScore: 78, hasSelfie: false, ipCheck: 'VPN' },
    { name: 'Alex Rivera', email: 'arivera@corp.io', country: 'Canada', riskScore: 45, hasSelfie: true, ipCheck: 'Proxy' },
  ];

  // Run the simulation sequence
  const startSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulationStep(0);
    setSimResult(null);
    setSimLogs([`${t.log1} ${testUsers[selectedUser].name}`]);

    const timer1 = setTimeout(() => {
      setSimulationStep(1);
      setSimLogs(prev => [
        ...prev,
        t.log2,
        `${t.log3} ${
          testUsers[selectedUser].ipCheck === 'Clean' ? t.ipClean :
          testUsers[selectedUser].ipCheck === 'Proxy' ? t.ipProxy :
          t.ipVPN
        }`,
        `${t.log4} ${testUsers[selectedUser].riskScore > 50 ? t.logHighAnomaly : t.logStandard}`,
        t.log5
      ]);
    }, 1200);

    const timer2 = setTimeout(() => {
      setSimulationStep(2);
      const user = testUsers[selectedUser];
      let decision: 'Approved' | 'Review' | 'Declined' = 'Approved';
      const logDetails: string[] = [];

      if (rules.autoDeclineHighRisk && user.riskScore > 75) {
        decision = 'Declined';
        logDetails.push(`${t.logRule1} (${user.riskScore}) ${t.logRule1b}`);
      } else if (rules.requireSelfieOnVpn && user.ipCheck === 'VPN') {
        decision = 'Review';
        logDetails.push(t.logRule2);
      } else if (user.riskScore > rules.maxRiskScore) {
        decision = 'Review';
        logDetails.push(`${t.logRule3} (${user.riskScore}) ${t.logRule3b} ${rules.maxRiskScore}${t.logRule3c}`);
      } else {
        logDetails.push(`${t.logPass} ${user.riskScore}${t.logPass2}`);
      }

      setSimResult(decision);
      setSimLogs(prev => [
        ...prev,
        t.log6,
        ...logDetails,
        `${t.logOutcome} ${decision.toUpperCase()}`
      ]);
    }, 2800);

    const timer3 = setTimeout(() => {
      setSimulationStep(3);
      const user = testUsers[selectedUser];
      const acts: string[] = [`${t.logAct1} ${user.name} ${t.logAct1b}`];

      if (simResult === 'Approved' || (simResult === null && testUsers[selectedUser].riskScore <= rules.maxRiskScore)) {
        acts.push(t.logAct2);
        acts.push(`${t.logAct3} ${user.email}`);
      } else if (rules.notifyOnReview) {
        acts.push(t.logAct4);
        acts.push(t.logAct5);
      }

      setSimLogs(prev => [
        ...prev,
        t.logAct,
        ...acts,
        t.logComplete
      ]);
      setIsSimulating(false);
    }, 4500);
  };

  useEffect(() => {
    return () => {
      // Cleanup timers if unmounted
    };
  }, []);

  return (
    <div className="bg-[#FAFBFD] text-slate-800 antialiased min-h-screen">
      
      {/* Brand Hero Header Block (Periwinkle Theme) */}
      <section className="relative overflow-hidden bg-[#8586FF] pt-20 pb-24 text-white">
        {/* Abstract Background Design Nodes */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-white filter blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-blue-200 filter blur-3xl" />
          {/* Connecting vector nodes representation */}
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="10%" y1="20%" x2="40%" y2="50%" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="40%" y1="50%" x2="80%" y2="30%" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="40%" y1="50%" x2="60%" y2="85%" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
            <circle cx="10%" cy="20%" r="6" fill="white" />
            <circle cx="40%" cy="50%" r="8" fill="white" />
            <circle cx="80%" cy="30%" r="6" fill="white" />
            <circle cx="60%" cy="85%" r="6" fill="white" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Label Pill */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 border border-white/10">
            <GitCommit className="w-4 h-4 text-white" />
            <span>{t.workflows}</span>
          </div>

          {/* Heading */}
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight max-w-4xl leading-[1.1] mb-6">
            {t.heroTitle}
          </h1>

          <p className="text-lg md:text-xl text-white/95 max-w-3xl font-normal leading-relaxed mb-10">
            {t.heroDesc}
          </p>

          {/* Action Button */}
          <div className="flex flex-wrap gap-4 items-center mb-16">
            <button 
              onClick={onOpenSandbox}
              className="px-8 py-4 bg-white text-[#5254FF] font-semibold rounded-full hover:bg-slate-50 transition-all flex items-center gap-2.5 shadow-lg shadow-black/10 text-base"
            >
              <span>{t.getDemo}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* 3 Columns Dividers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-white/20">
            <div className="space-y-3">
              <h3 className="font-bold text-lg">{t.buildQuickly}</h3>
              <p className="text-white/85 text-sm leading-relaxed">
                {t.buildQuicklyDesc}
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-lg">{t.makeDecisions}</h3>
              <p className="text-white/85 text-sm leading-relaxed">
                {t.makeDecisionsDesc}
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-lg">{t.reduceManual}</h3>
              <p className="text-white/85 text-sm leading-relaxed">
                {t.reduceManualDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Logos Strip */}
      <div className="bg-[#121A36] py-8 text-white/60">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-8">
          <span className="text-xs font-semibold tracking-wider uppercase">{t.trustedBy}</span>
          <div className="flex flex-wrap items-center gap-8 md:gap-12">
            <div className="flex items-center gap-2 text-white font-bold tracking-tight">
              <span className="w-2.5 h-2.5 bg-sky-400 rounded-full" />
              <span>{t.staticLabels.rently}</span>
            </div>
            <div className="flex items-center gap-2 text-white font-bold tracking-tight">
              <span className="w-2.5 h-2.5 bg-indigo-400 rounded-full" />
              <span>{t.staticLabels.branchLogo}</span>
            </div>
            <div className="flex items-center gap-2 text-white font-bold tracking-tight text-opacity-80">
              <span className="w-2.5 h-2.5 bg-[#FE5F55] rounded-full" />
              <span>{t.staticLabels.angelList}</span>
            </div>
            <div className="flex items-center gap-2 text-white font-bold tracking-tight text-opacity-80">
              <span className="w-2.5 h-2.5 bg-teal-400 rounded-full" />
              <span>{t.staticLabels.sonder}</span>
            </div>
          </div>
        </div>
      </div>

      {/* "How it works" Interactive Section */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900 tracking-tight">
              {t.howItWorks}
            </h2>
            <p className="text-slate-500 mt-2 text-base max-w-md">
              {t.howItWorksDesc}
            </p>
          </div>

          {/* Interactive Selector Tabs */}
          <div className="flex bg-slate-100 p-1.5 rounded-xl self-start md:self-auto overflow-x-auto whitespace-nowrap max-w-full">
            {(['Trigger', 'Consolidate', 'Decide', 'Act'] as TabType[]).map((tab, index) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  // Sync simulation step state to make tab changes visually interactive
                  if (!isSimulating) {
                    setSimulationStep(index);
                  }
                }}
                className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                  activeTab === tab
                    ? 'bg-white text-[#5254FF] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="text-slate-300 font-normal mr-1.5">{index + 1}</span>
                {t.tabs[tab.toLowerCase() as keyof typeof t.tabs]}
              </button>
            ))}
          </div>
        </div>

        {/* Big Interactive Periwinkle Block Card */}
        <div className="bg-[#EEF1FF] rounded-3xl p-8 md:p-12 border border-[#DBE2FF] relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Card Left Info */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 z-10">
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === 'Trigger' && (
                    <>
                      <h3 className="text-3xl font-bold font-display text-[#111827] leading-tight mb-4">
                        {t.tabTriggerTitle}
                      </h3>
                      <p className="text-slate-600 text-base leading-relaxed">
                        {t.tabTriggerDesc}
                      </p>
                    </>
                  )}
                  {activeTab === 'Consolidate' && (
                    <>
                      <h3 className="text-3xl font-bold font-display text-[#111827] leading-tight mb-4">
                        {t.tabConsolidateTitle}
                      </h3>
                      <p className="text-slate-600 text-base leading-relaxed">
                        {t.tabConsolidateDesc}
                      </p>
                    </>
                  )}
                  {activeTab === 'Decide' && (
                    <>
                      <h3 className="text-3xl font-bold font-display text-[#111827] leading-tight mb-4">
                        {t.tabDecideTitle}
                      </h3>
                      <p className="text-slate-600 text-base leading-relaxed">
                        {t.tabDecideDesc}
                      </p>
                    </>
                  )}
                  {activeTab === 'Act' && (
                    <>
                      <h3 className="text-3xl font-bold font-display text-[#111827] leading-tight mb-4">
                        {t.tabActTitle}
                      </h3>
                      <p className="text-slate-600 text-base leading-relaxed">
                        {t.tabActDesc}
                      </p>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Quick Live Preview Simulator Launcher */}
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-[#D9E1FF] space-y-4">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold text-slate-800 tracking-wider uppercase">{t.liveInteractiveSandbox}</span>
              </div>
              <p className="text-xs text-slate-500">
                {t.sandboxDesc}
              </p>
              
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">{t.targetApplicant}</label>
                <div className="grid grid-cols-3 gap-2">
                  {testUsers.map((user, idx) => (
                    <button
                      key={idx}
                      disabled={isSimulating}
                      onClick={() => {
                        setSelectedUser(idx);
                        setSimulationStep(-1);
                        setSimResult(null);
                        setSimLogs([]);
                      }}
                      className={`text-xs py-2 px-2.5 rounded-lg border text-left transition-all ${
                        selectedUser === idx
                          ? 'border-[#5254FF] bg-[#F3F4FF] text-[#5254FF] font-semibold'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div className="truncate font-medium">{user.name.split(' ')[0]}</div>
                      <div className="text-[9px] text-slate-400 font-mono mt-0.5">{t.risk}: {user.riskScore}%</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={startSimulation}
                disabled={isSimulating}
                className="w-full py-2.5 px-4 bg-[#5254FF] hover:bg-[#4345E5] text-white rounded-xl text-xs font-semibold tracking-wide transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>{t.orchestrating}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{t.runSimulation}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Card Right Live Visualizer Graph */}
          <div className="lg:col-span-7 bg-[#111827] rounded-2xl border border-slate-800 shadow-2xl p-6 flex flex-col justify-between min-h-[460px] relative">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="flex space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <span className="text-[11px] text-slate-500 font-mono pl-2">{t.staticLabels.workflowEngineVersion}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded">{t.staticLabels.activeConfig}</span>
              </div>
            </div>

            {/* Core Dynamic Animation Block */}
            <div className="flex-1 py-8 flex flex-col justify-center relative">
              
              {/* Step 1: Trigger Node */}
              <div className="grid grid-cols-4 gap-4 items-center relative">
                
                {/* Node 1: Trigger */}
                <div className="flex flex-col items-center relative">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    simulationStep === 0 || activeTab === 'Trigger'
                      ? 'bg-[#5254FF] text-white shadow-lg shadow-[#5254FF]/40 scale-110'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    <GitCommit className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wider">1. {t.tabs.trigger}</span>
                  <span className="text-[9px] text-slate-500 font-mono">{t.onRegistration}</span>
                  
                  {/* Connecting Line to next node */}
                  <div className="absolute top-6 left-12 right-[-24px] h-0.5 bg-slate-800 z-0">
                    <div className={`h-full bg-gradient-to-r from-[#5254FF] to-indigo-400 transition-all duration-1000 ${
                      simulationStep >= 1 ? 'w-full' : 'w-0'
                    }`} />
                  </div>
                </div>

                {/* Node 2: Consolidate */}
                <div className="flex flex-col items-center relative">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    simulationStep === 1 || activeTab === 'Consolidate'
                      ? 'bg-[#8B96FC] text-white shadow-lg shadow-[#8B96FC]/40 scale-110'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    <Database className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wider">2. {t.tabs.consolidate}</span>
                  <span className="text-[9px] text-slate-500 font-mono">{t.intelligenceData}</span>

                  {/* Connecting Line to next node */}
                  <div className="absolute top-6 left-12 right-[-24px] h-0.5 bg-slate-800 z-0">
                    <div className={`h-full bg-gradient-to-r from-indigo-400 to-amber-400 transition-all duration-1000 ${
                      simulationStep >= 2 ? 'w-full' : 'w-0'
                    }`} />
                  </div>
                </div>

                {/* Node 3: Decide */}
                <div className="flex flex-col items-center relative">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    simulationStep === 2 || activeTab === 'Decide'
                      ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/40 scale-110'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    <Sliders className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wider">3. {t.tabs.decide}</span>
                  <span className="text-[9px] text-slate-500 font-mono">{t.rulesEngine}</span>

                  {/* Connecting Line to next node */}
                  <div className="absolute top-6 left-12 right-[-24px] h-0.5 bg-slate-800 z-0">
                    <div className={`h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-1000 ${
                      simulationStep >= 3 ? 'w-full' : 'w-0'
                    }`} />
                  </div>
                </div>

                {/* Node 4: Act */}
                <div className="flex flex-col items-center relative">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    simulationStep === 3 || activeTab === 'Act'
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/40 scale-110'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wider">4. {t.tabs.act}</span>
                  <span className="text-[9px] text-slate-500 font-mono">{t.downstreamApis}</span>
                </div>

              </div>

              {/* Pulsing state visual card or logs */}
              <div className="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-4 min-h-[140px] max-h-[160px] overflow-y-auto font-mono text-[11px] text-slate-300 scrollbar-thin">
                <div className="flex items-center justify-between text-slate-500 pb-1.5 mb-1.5 border-b border-slate-800">
                  <span>{t.workflowExecutionLog}</span>
                  <span>{simulationStep >= 0 ? `${Math.min(simulationStep + 1, 4)} / 4 ${t.completed}` : t.idle}</span>
                </div>
                {simLogs.length === 0 ? (
                  <div className="text-slate-500 italic flex items-center gap-1.5 h-16 justify-center">
                    <Info className="w-3.5 h-3.5" />
                    <span>{t.selectApplicantInfo}</span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {simLogs.map((log, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className={
                          (log.startsWith('  • RULE TRIGGERED') || log.startsWith('  • QUY TẮC ĐƯỢC KÍCH HOẠT')) 
                            ? 'text-amber-400 font-semibold' 
                            : log.includes('APPROVED')
                            ? 'text-emerald-400 font-bold'
                            : log.includes('DECLINED')
                            ? 'text-red-400 font-bold'
                            : log.includes('REVIEW')
                            ? 'text-yellow-400 font-bold'
                            : 'text-slate-300'
                        }
                      >
                        {log}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Float badge of the decision outcome */}
              <AnimatePresence>
                {simResult && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center bg-slate-950 border border-slate-800 px-6 py-4 rounded-2xl shadow-2xl"
                  >
                    <span className="text-[10px] text-slate-500 uppercase font-mono tracking-wider mb-1">{t.decisionEvaluated}</span>
                    {simResult === 'Approved' && (
                      <div className="flex items-center gap-2 text-emerald-400">
                        <CheckCircle2 className="w-6 h-6" />
                        <span className="text-lg font-bold">{t.autoApproved}</span>
                      </div>
                    )}
                    {simResult === 'Review' && (
                      <div className="flex items-center gap-2 text-amber-400">
                        <AlertCircle className="w-6 h-6" />
                        <span className="text-lg font-bold">{t.routeToManual}</span>
                      </div>
                    )}
                    {simResult === 'Declined' && (
                      <div className="flex items-center gap-2 text-red-400">
                        <ShieldAlert className="w-6 h-6" />
                        <span className="text-lg font-bold">{t.autoDeclined}</span>
                      </div>
                    )}
                    <span className="text-[9px] text-slate-500 mt-2 italic font-mono">{t.basedOnRules}</span>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Config Toggles Panel */}
            <div className="border-t border-slate-800 pt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <span className="text-[9px] text-slate-500 font-bold tracking-wider block uppercase">{t.softLimitScore}</span>
                <div className="flex items-center gap-2">
                  <input 
                    type="range" 
                    min="30" 
                    max="90" 
                    value={rules.maxRiskScore} 
                    onChange={(e) => setRules(prev => ({ ...prev, maxRiskScore: parseInt(e.target.value) }))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#5254FF]"
                  />
                  <span className="text-xs text-slate-300 font-mono font-bold">{rules.maxRiskScore}%</span>
                </div>
              </div>

              <button
                onClick={() => setRules(prev => ({ ...prev, requireSelfieOnVpn: !prev.requireSelfieOnVpn }))}
                className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 transition text-left"
              >
                <div className="flex flex-col">
                  <span className="text-[8px] text-slate-500 font-bold uppercase">{t.vpnCheck}</span>
                  <span className="text-[10px] text-slate-300 font-semibold truncate">{t.routeVpnToReview}</span>
                </div>
                <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all ${
                  rules.requireSelfieOnVpn ? 'bg-[#5254FF] border-[#5254FF]' : 'border-slate-600'
                }`}>
                  {rules.requireSelfieOnVpn && <Check className="w-2.5 h-2.5 text-white" />}
                </div>
              </button>

              <button
                onClick={() => setRules(prev => ({ ...prev, autoDeclineHighRisk: !prev.autoDeclineHighRisk }))}
                className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 transition text-left"
              >
                <div className="flex flex-col">
                  <span className="text-[8px] text-slate-500 font-bold uppercase">{t.hardLimitRule}</span>
                  <span className="text-[10px] text-slate-300 font-semibold truncate">{t.declineRisk}</span>
                </div>
                <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all ${
                  rules.autoDeclineHighRisk ? 'bg-[#5254FF] border-[#5254FF]' : 'border-slate-600'
                }`}>
                  {rules.autoDeclineHighRisk && <Check className="w-2.5 h-2.5 text-white" />}
                </div>
              </button>

              <button
                onClick={() => setRules(prev => ({ ...prev, notifyOnReview: !prev.notifyOnReview }))}
                className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 transition text-left"
              >
                <div className="flex flex-col">
                  <span className="text-[8px] text-slate-500 font-bold uppercase">{t.notifications}</span>
                  <span className="text-[10px] text-slate-300 font-semibold truncate">{t.pushAlertsToSlack}</span>
                </div>
                <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all ${
                  rules.notifyOnReview ? 'bg-[#5254FF] border-[#5254FF]' : 'border-slate-600'
                }`}>
                  {rules.notifyOnReview && <Check className="w-2.5 h-2.5 text-white" />}
                </div>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Grid: "How teams can use Workflows" */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900 tracking-tight">
              {t.howTeamsCanUse}
            </h2>
            <p className="text-slate-500 mt-2 text-base">
              {t.howTeamsCanUseDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Grid Item 1 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-all space-y-4">
              <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">{t.realTimeDecisioning}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {t.realTimeDecisioningDesc}
              </p>
            </div>

            {/* Grid Item 2 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-all space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">{t.reverifyUsers}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {t.reverifyUsersDesc}
              </p>
            </div>

            {/* Grid Item 3 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-all space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">{t.updateCrm}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {t.updateCrmDesc}
              </p>
            </div>

            {/* Grid Item 4 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-all space-y-4">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <CheckSquare className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">{t.runBulkActions}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {t.runBulkActionsDesc}
              </p>
            </div>

            {/* Grid Item 5 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-all space-y-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <Landmark className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">{t.verifyUbos}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {t.verifyUbosDesc}
              </p>
            </div>

            {/* Grid Item 6 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-all space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">{t.preventTransactionAbuse}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {t.preventTransactionAbuseDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section (Branch Quote) */}
      <section className="py-24 max-w-5xl mx-auto px-6 text-center">
        <blockquote className="text-2xl md:text-3xl font-display font-medium text-slate-800 leading-relaxed mb-8">
          &ldquo;{t.quote}&rdquo;
        </blockquote>
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="font-bold text-slate-900">{t.quoteAuthor}</div>
          <div className="text-sm text-slate-400">{t.quoteTitle}</div>
        </div>

        {/* Clean Case Study Banner Block */}
        <div className="mt-16 bg-white p-6 md:p-8 rounded-2xl border border-slate-200/80 shadow-md max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-3.5 h-3.5 bg-indigo-500 rounded-full" />
            <span className="font-bold text-xl text-indigo-950">{t.staticLabels.branchLogo}</span>
          </div>
          <p className="text-slate-600 font-medium text-sm md:text-left text-center">
            {t.caseStudyTitle}
          </p>
          <button 
            onClick={onOpenSandbox}
            className="py-2.5 px-6 bg-slate-950 hover:bg-slate-800 text-white rounded-full text-xs font-semibold tracking-wide transition whitespace-nowrap"
          >
            {t.readCaseStudy} →
          </button>
        </div>
      </section>

      {/* Identra Marketplace Banner */}
      <section className="py-12 bg-indigo-50/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gradient-to-br from-indigo-600 to-[#5254FF] rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-2">
            
            {/* Left Column Content */}
            <div className="p-8 md:p-14 text-white flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] bg-white/20 text-white px-2.5 py-1 rounded-full tracking-wider uppercase font-bold inline-block">{t.integrationsEcosystem}</span>
                <h3 className="text-3xl md:text-4xl font-bold font-display leading-tight">
                  {t.identraMarketplace}
                </h3>
                <p className="text-indigo-100 text-base leading-relaxed">
                  {t.marketplaceDesc}
                </p>
              </div>
              <div>
                <button 
                  onClick={onOpenSandbox}
                  className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-xl text-sm hover:bg-indigo-50 transition-all inline-flex items-center gap-2"
                >
                  <span>{t.exploreIntegrations}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column Integration Grid Grid Visual */}
            <div className="bg-[#121A36]/85 p-8 flex items-center justify-center relative overflow-hidden min-h-[300px]">
              {/* Dynamic grid mesh decoration */}
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
              </div>
              
              <div className="relative grid grid-cols-3 gap-6 max-w-sm w-full z-10">
                {/* Central Identra Node */}
                <div className="col-span-3 flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#5254FF] border-2 border-indigo-300 shadow-2xl flex items-center justify-center animate-pulse">
                    <ShieldCheck className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Integration Node 1 */}
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col items-center justify-center text-center space-y-1">
                  <span className="text-lg">💳</span>
                  <span className="text-[10px] text-white font-semibold">{t.staticLabels.stripe}</span>
                </div>
                {/* Integration Node 2 */}
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col items-center justify-center text-center space-y-1">
                  <span className="text-lg">☁️</span>
                  <span className="text-[10px] text-white font-semibold">{t.staticLabels.salesforce}</span>
                </div>
                {/* Integration Node 3 */}
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col items-center justify-center text-center space-y-1">
                  <span className="text-lg">💬</span>
                  <span className="text-[10px] text-white font-semibold">{t.staticLabels.slack}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* "Keep learning" Blog Cards Section */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <h2 className="font-display font-bold text-3xl text-slate-900 tracking-tight mb-12">
          {t.keepLearning}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all flex flex-col">
            <div className="h-48 bg-gradient-to-br from-violet-400 to-indigo-600 p-6 flex flex-col justify-between text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded self-start">{t.ebook}</span>
              <BookOpen className="w-8 h-8 text-white/95" />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <h3 className="font-bold text-slate-900 text-base hover:text-[#5254FF] transition-all cursor-pointer">
                {t.ebookTitle}
              </h3>
              <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
                <FileText className="w-3.5 h-3.5" />
                <span>{t.guideTime}</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all flex flex-col">
            <div className="h-48 bg-gradient-to-br from-cyan-400 to-blue-600 p-6 flex flex-col justify-between text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded self-start">{t.announcement}</span>
              <GitCommit className="w-8 h-8 text-white/95" />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <h3 className="font-bold text-slate-900 text-base hover:text-[#5254FF] transition-all cursor-pointer">
                {t.announcementTitle}
              </h3>
              <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{t.blogTime1}</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all flex flex-col">
            <div className="h-48 bg-gradient-to-br from-[#8586FF] to-violet-700 p-6 flex flex-col justify-between text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded self-start">{t.whitePaper}</span>
              <Cpu className="w-8 h-8 text-white/95" />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <h3 className="font-bold text-slate-900 text-base hover:text-[#5254FF] transition-all cursor-pointer">
                {t.whitePaperTitle}
              </h3>
              <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
                <Layers className="w-3.5 h-3.5" />
                <span>{t.blogTime2}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore More of Platform Section (Cross-links) */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="font-display font-bold text-2xl text-slate-900 tracking-tight mb-8">
            {t.exploreMore}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Catch more fraud with passive signals */}
            <div 
              onClick={() => {
                if (onViewChange) onViewChange('passive-signals');
              }}
              className="bg-white hover:bg-[#EEF1FF]/30 p-8 rounded-2xl border border-slate-100 hover:border-[#8586FF]/30 transition-all cursor-pointer group flex flex-col justify-between space-y-12"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 group-hover:bg-indigo-100 text-[#5254FF] flex items-center justify-center transition-all">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xl text-slate-900 leading-snug">
                  {t.passiveSignalsTitle}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {t.passiveSignalsDesc}
                </p>
              </div>
              <span className="text-xs font-semibold text-[#5254FF] flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                <span>{t.explorePassiveSignals}</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>

            {/* Build your ideal case management process */}
            <div 
              onClick={() => {
                if (onViewChange) onViewChange('case-management');
              }}
              className="bg-white hover:bg-[#EEF1FF]/30 p-8 rounded-2xl border border-slate-100 hover:border-[#8586FF]/30 transition-all cursor-pointer group flex flex-col justify-between space-y-12"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-violet-50 group-hover:bg-violet-100 text-violet-600 flex items-center justify-center transition-all">
                  <Shield className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xl text-slate-900 leading-snug">
                  {t.caseManagementTitle}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {t.caseManagementDesc}
                </p>
              </div>
              <span className="text-xs font-semibold text-violet-600 flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                <span>{t.exploreCaseManagement}</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to get started Call to Action */}
      <section className="bg-slate-900 py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-8">
          <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight">
            {t.readyToGetStarted}
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto font-normal">
            {t.readyToGetStartedDesc}
          </p>
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <button 
              onClick={onOpenSandbox}
              className="px-8 py-3.5 bg-white text-slate-950 font-semibold rounded-full hover:bg-slate-50 transition-all"
            >
              {t.getDemo}
            </button>
            <button 
              onClick={onOpenSandbox}
              className="px-8 py-3.5 bg-slate-800 text-white font-semibold rounded-full hover:bg-slate-700 transition-all border border-slate-700"
            >
              {t.tryItNow}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
