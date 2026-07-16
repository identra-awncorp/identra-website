/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FolderHeart, ArrowRight, ShieldCheck, Check, Users, Lock, 
  Database, Smartphone, HelpCircle, AlertTriangle, FileText, 
  Share2, Network, Zap, Sliders, Settings, Play, RefreshCw, 
  User, CheckCircle2, AlertCircle, Plus, Trash2, Bell, Shield, 
  Clock, Search, BookOpen, ChevronDown, Landmark, Globe, Terminal, FileCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import {
  caseTranslations,
  ruleTranslations,
  signalTranslations,
  timelineTranslations,
  actionTranslations,
  webhookSimTranslations,
  FEATURES_DATA,
  USE_CASES_TRANS,
  BLOG_TRANS
} from '../translations/CaseManagementPageTranslations';

interface CaseManagementPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

interface Rule {
  id: string;
  name: string;
  condition: string;
  action: string;
  active: boolean;
}

interface ReviewCase {
  id: string;
  name: string;
  email: string;
  riskScore: number;
  status: 'pending' | 'approved' | 'rejected' | 'escalated';
  signals: Array<{ label: string; status: 'critical' | 'warning' | 'success'; details: string }>;
  timeline: Array<{ time: string; text: string }>;
  notes: string;
}

const createInitialReviewCase = (): ReviewCase => ({
  id: 'case-83921',
  name: 'Alex Rivera',
  email: 'alex.rivera@example.com',
  riskScore: 84,
  status: 'pending',
  signals: [
    { label: signalTranslations.en.vpnLabel, status: 'critical', details: signalTranslations.en.vpnDetails },
    { label: signalTranslations.en.watchlistLabel, status: 'warning', details: signalTranslations.en.watchlistDetails },
    { label: signalTranslations.en.faceLabel, status: 'success', details: signalTranslations.en.faceDetails },
    { label: signalTranslations.en.docLabel, status: 'success', details: signalTranslations.en.docDetails },
  ],
  timeline: [
    { time: '09:12 AM', text: timelineTranslations.en.evt1 },
    { time: '09:13 AM', text: timelineTranslations.en.evt2 },
    { time: '09:14 AM', text: timelineTranslations.en.evt3 },
  ],
  notes: '',
});

const createInitialRules = (): Rule[] => [
  { id: 'rule-1', name: ruleTranslations.en.rule1Name, condition: ruleTranslations.en.rule1Condition, action: ruleTranslations.en.rule1Action, active: true },
  { id: 'rule-2', name: ruleTranslations.en.rule2Name, condition: ruleTranslations.en.rule2Condition, action: ruleTranslations.en.rule2Action, active: true },
  { id: 'rule-3', name: ruleTranslations.en.rule3Name, condition: ruleTranslations.en.rule3Condition, action: ruleTranslations.en.rule3Action, active: true },
  { id: 'rule-4', name: ruleTranslations.en.rule4Name, condition: ruleTranslations.en.rule4Condition, action: ruleTranslations.en.rule4Action, active: false },
];


const getRuleTranslation = (rule: Rule, lang: string) => {
  const trans = getLocalizedRecord(ruleTranslations, lang as keyof typeof ruleTranslations, 'ruleTranslations');
  if (rule.id === 'rule-1') {
    return {
      name: trans.rule1Name,
      condition: trans.rule1Condition,
      action: trans.rule1Action
    };
  }
  if (rule.id === 'rule-2') {
    return {
      name: trans.rule2Name,
      condition: trans.rule2Condition,
      action: trans.rule2Action
    };
  }
  if (rule.id === 'rule-3') {
    return {
      name: trans.rule3Name,
      condition: trans.rule3Condition,
      action: trans.rule3Action
    };
  }
  if (rule.id === 'rule-4') {
    return {
      name: trans.rule4Name,
      condition: trans.rule4Condition,
      action: trans.rule4Action
    };
  }
  return {
    name: rule.name,
    condition: rule.condition,
    action: rule.action
  };
};

const getSignalTranslation = (label: string, details: string, lang: string) => {
  const trans = getLocalizedRecord(signalTranslations, lang as keyof typeof signalTranslations, 'signalTranslations');
  if (label === signalTranslations.en.vpnLabel) {
    return { label: trans.vpnLabel, details: trans.vpnDetails };
  }
  if (label === signalTranslations.en.watchlistLabel) {
    return { label: trans.watchlistLabel, details: trans.watchlistDetails };
  }
  if (label === signalTranslations.en.faceLabel) {
    return { label: trans.faceLabel, details: trans.faceDetails };
  }
  if (label === signalTranslations.en.docLabel) {
    return { label: trans.docLabel, details: trans.docDetails };
  }
  return { label, details };
};

const translateTimelineText = (text: string, lang: string) => {
  const trans = getLocalizedRecord(actionTranslations, lang as keyof typeof actionTranslations, 'actionTranslations');
  if (text === timelineTranslations.en.evt1) {
    return getLocalizedRecord(timelineTranslations, lang as keyof typeof timelineTranslations, 'timelineTranslations').evt1;
  }
  if (text === timelineTranslations.en.evt2) {
    return getLocalizedRecord(timelineTranslations, lang as keyof typeof timelineTranslations, 'timelineTranslations').evt2;
  }
  if (text === timelineTranslations.en.evt3) {
    return getLocalizedRecord(timelineTranslations, lang as keyof typeof timelineTranslations, 'timelineTranslations').evt3;
  }
  if (text === actionTranslations.en.approved) {
    return trans.approved;
  }
  if (text === actionTranslations.en.rejected) {
    return trans.rejected;
  }
  if (text === actionTranslations.en.escalated) {
    return trans.escalated;
  }
  const notePrefix = `${actionTranslations.en.noteAdded} "`;
  if (text.startsWith(notePrefix)) {
    const noteContent = text.substring(notePrefix.length, text.length - 1);
    return `${trans.noteAdded} "${noteContent}"`;
  }
  return text;
};

const translateDecisionLog = (log: string, lang: string) => {
  const trans = getLocalizedRecord(actionTranslations, lang as keyof typeof actionTranslations, 'actionTranslations');
  if (log === actionTranslations.en.waitingDecision) {
    return trans.waitingDecision;
  }
  
  const resolutionMatch = log.match(/^\[(.*?)\] Resolution: (.*)$/);
  if (resolutionMatch) {
    const [_, time, res] = resolutionMatch;
    const sideText = getLocalizedRecord(caseTranslations, lang as keyof typeof caseTranslations, 'caseTranslations').actionReviewerPanel;
    return `[${time}] ${sideText}: ${res}`;
  }
  
  const systemActionMatch = log.match(/^\[(.*?)\] System Action: (.*)$/);
  if (systemActionMatch) {
    const [_, time, act] = systemActionMatch;
    let translatedAct = act;
    if (act.includes('case.approved')) {
      translatedAct = trans.approvedLog;
    } else if (act.includes('case.rejected')) {
      translatedAct = trans.rejectedLog;
    } else if (act.includes('compliance lead')) {
      translatedAct = trans.escalatedLog;
    }
    return `[${time}] ${translatedAct}`;
  }
  return log;
};

const translateWebhookLog = (log: string, idx: number, lang: string) => {
  const transList = getLocalizedRecord(webhookSimTranslations, lang as keyof typeof webhookSimTranslations, 'webhookSimTranslations');
  return transList[idx] || log;
};


export default function CaseManagementPage({ onOpenSandbox, onBackToLanding, onViewChange }: CaseManagementPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(caseTranslations, language as keyof typeof caseTranslations, 'caseTranslations');

  // 1. "How it works" Active Step State
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);

  // 2. Interactive Step 1 Simulation State (Rules Configuration)
  const [rules, setRules] = useState<Rule[]>(() => createInitialRules());

  const [newRuleName, setNewRuleName] = useState('');
  const [newRuleCondition, setNewRuleCondition] = useState('');
  const [newRuleAction, setNewRuleAction] = useState('');
  const [showAddRuleForm, setShowAddRuleForm] = useState(false);

  const handleToggleRule = (id: string) => {
    setRules(rules.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleName || !newRuleCondition || !newRuleAction) return;
    const rule: Rule = {
      id: `rule-${Date.now()}`,
      name: newRuleName,
      condition: newRuleCondition,
      action: newRuleAction,
      active: true
    };
    setRules([...rules, rule]);
    setNewRuleName('');
    setNewRuleCondition('');
    setNewRuleAction('');
    setShowAddRuleForm(false);
  };

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
  };

  // 3. Interactive Step 2 Simulation State (Case Review Console)
  const [currentCase, setCurrentCase] = useState<ReviewCase>(() => createInitialReviewCase());

  const [caseNoteInput, setCaseNoteInput] = useState('');
  const [decisionLogs, setDecisionLogs] = useState<string[]>([
    actionTranslations.en.waitingDecision
  ]);

  const handleAddCaseNote = () => {
    if (!caseNoteInput.trim()) return;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const note = caseNoteInput.trim();
    setCurrentCase(prev => ({
      ...prev,
      notes: note,
      timeline: [...prev.timeline, { time: timestamp, text: `${actionTranslations.en.noteAdded} "${note}"` }]
    }));
    setCaseNoteInput('');
  };

  const handleResolveCase = (resolution: 'approved' | 'rejected' | 'escalated') => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let actionText = '';
    let logMessage = '';

    if (resolution === 'approved') {
      actionText = actionTranslations.en.approved;
      logMessage = actionTranslations.en.approvedLog;
    } else if (resolution === 'rejected') {
      actionText = actionTranslations.en.rejected;
      logMessage = actionTranslations.en.rejectedLog;
    } else {
      actionText = actionTranslations.en.escalated;
      logMessage = actionTranslations.en.escalatedLog;
    }

    setCurrentCase({
      ...currentCase,
      status: resolution,
      timeline: [...currentCase.timeline, { time: timestamp, text: actionText }]
    });

    setDecisionLogs(prev => [
      ...prev,
      `[${timestamp}] Resolution: ${resolution.toUpperCase()}`,
      `[${timestamp}] System Action: ${logMessage}`
    ]);
  };

  const handleResetCase = () => {
    setCurrentCase(createInitialReviewCase());
    setDecisionLogs([actionTranslations.en.waitingDecision]);
  };

  // 4. Interactive Step 3 Simulation State (Webhooks / Automations)
  const [webhookLogs, setWebhookLogs] = useState<string[]>([]);
  const [isSimulatingWebhook, setIsSimulatingWebhook] = useState(false);

  const handleTriggerWebhookTest = () => {
    if (isSimulatingWebhook) return;
    setIsSimulatingWebhook(true);
    setWebhookLogs([
      webhookSimTranslations.en[0],
      webhookSimTranslations.en[1]
    ]);

    setTimeout(() => {
      setWebhookLogs(prev => [...prev, webhookSimTranslations.en[2]]);
    }, 600);

    setTimeout(() => {
      setWebhookLogs(prev => [...prev, webhookSimTranslations.en[3]]);
    }, 1200);

    setTimeout(() => {
      setWebhookLogs(prev => [
        ...prev, 
        webhookSimTranslations.en[4], 
        webhookSimTranslations.en[5]
      ]);
      setIsSimulatingWebhook(false);
    }, 1800);
  };

  // 5. Features Accordion State
  const [expandedFeature, setExpandedFeature] = useState<number | null>(0);

  const localizedFeatures = getLocalizedRecord(FEATURES_DATA, language as keyof typeof FEATURES_DATA, 'FEATURES_DATA');
  
  const useCasesText = getLocalizedRecord(USE_CASES_TRANS, language as keyof typeof USE_CASES_TRANS, 'USE_CASES_TRANS');
  const localizedUseCases = [
    { ...useCasesText[0], icon: Users },
    { ...useCasesText[1], icon: Landmark },
    { ...useCasesText[2], icon: FileText },
    { ...useCasesText[3], icon: AlertTriangle },
    { ...useCasesText[4], icon: Zap },
    { ...useCasesText[5], icon: Sliders },
  ];

  const blogText = getLocalizedRecord(BLOG_TRANS, language as keyof typeof BLOG_TRANS, 'BLOG_TRANS');
  const localizedBlogs = [
    { ...blogText[0], image: '/src/assets/images/identra_identity_illustration_1783335932193.jpg' },
    { ...blogText[1], image: '/src/assets/images/identra_careers_team_1783338578864.jpg' },
    { ...blogText[2], image: '/src/assets/images/identra_identity_illustration_1783335932193.jpg' }
  ];

  return (
    <div className="min-h-screen bg-[#FAFBFD] font-sans text-slate-800 antialiased selection:bg-[#354CE1]/10 selection:text-[#354CE1] scroll-smooth">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#D5DCFF] to-[#FAFBFD] pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#8C9EFF]/20 rounded-full filter blur-3xl opacity-60" />
          <div className="absolute -bottom-10 right-1/4 w-80 h-80 bg-[#354CE1]/10 rounded-full filter blur-2xl opacity-40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center md:text-left">
          {/* Navigation Breadcrumb Action */}
          <button 
            onClick={onBackToLanding}
            className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-[#354CE1] hover:text-[#2539BE] bg-white hover:bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-full shadow-sm transition"
          >
            <ArrowRight className="w-3 h-3 rotate-180" />
            {t.backToPlatform}
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left side text column */}
            <div className="md:col-span-7 space-y-6 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-[#FAFBFD] border border-[#354CE1]/20 py-1.5 px-3 rounded-full shadow-xs">
                <FolderHeart className="w-4 h-4 text-[#354CE1]" />
                <span className="text-xs font-bold text-[#354CE1] tracking-wide uppercase">
                  {t.caseManagement}
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 tracking-tight leading-[1.1]">
                {t.heroTitle}<span className="text-[#354CE1]">{t.heroTitleAccent}</span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
                {t.heroDesc}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3.5 pt-2">
                <button 
                  onClick={onOpenSandbox}
                  className="w-full sm:w-auto bg-black hover:bg-slate-800 text-white font-semibold text-xs py-3 px-6 rounded-full flex items-center justify-center gap-2 shadow-md transition"
                >
                  {t.getDemo}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={onOpenSandbox}
                  className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-xs py-3 px-6 rounded-full transition shadow-xs"
                >
                  {t.startExploring}
                </button>
              </div>
            </div>

            {/* Right side graphical illustration */}
            <div className="md:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm rounded-2xl bg-white border border-slate-100 shadow-xl p-6 overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{t.engineVersion}</span>
                </div>
                
                {/* Visual UI Blocks */}
                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <User className="w-4 h-4 text-[#354CE1]" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-slate-900 leading-none">{t.identityCheck}</p>
                        <p className="text-[9px] text-slate-400 mt-0.5">{t.activeDataValidation}</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full">{t.passed}</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 bg-amber-100 rounded-lg flex items-center justify-center">
                        <Network className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-slate-900 leading-none">{t.passiveSignals}</p>
                        <p className="text-[9px] text-slate-400 mt-0.5">{t.behavioralTelemetry}</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">{t.review}</span>
                  </div>

                  <div className="p-3 bg-[#354CE1]/5 rounded-xl border border-[#354CE1]/15">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[11px] font-bold text-[#354CE1]">{t.routingLogic}</p>
                      <Zap className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                    </div>
                    <div className="p-1.5 bg-white border border-slate-100 rounded-md text-[9px] font-mono text-slate-600">
                      {t.logicIf} <span className="text-[#354CE1]">{t.logicRiskFlag}</span> {t.logicEqualsTrue} <br />
                      {t.logicThen} <span className="text-amber-600">{t.logicEscalateFunction}</span>
                    </div>
                  </div>

                  <div className="p-2 bg-indigo-50/50 border border-indigo-100/60 rounded-xl flex items-center justify-between text-slate-500 text-[10px]">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#354CE1]" />
                      <span>{t.readyForReview}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE FEATURE HIGHLIGHT STRIPS */}
      <section className="bg-[#354CE1] text-white py-12 border-y border-[#354CE1]/25">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <h3 className="text-base font-bold tracking-tight">
              {t.resolveMoreCases}
            </h3>
            <p className="text-xs text-indigo-100 leading-relaxed font-normal">
              {t.resolveMoreCasesDesc}
            </p>
          </div>
          
          <div className="space-y-2 md:border-l border-white/20 md:pl-8">
            <h3 className="text-base font-bold tracking-tight">
              {t.unlockSingleSource}
            </h3>
            <p className="text-xs text-indigo-100 leading-relaxed font-normal">
              {t.unlockSingleSourceDesc}
            </p>
          </div>
          
          <div className="space-y-2 md:border-l border-white/20 md:pl-8">
            <h3 className="text-base font-bold tracking-tight">
              {t.builtWithCompliance}
            </h3>
            <p className="text-xs text-indigo-100 leading-relaxed font-normal">
              {t.builtWithComplianceDesc}
            </p>
          </div>
        </div>
      </section>

      {/* 3. LOGO SHOWCASE */}
      <section className="bg-[#0B122F] text-white py-8 border-b border-slate-900/30">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-[10px] font-bold text-[#8C9EFF] tracking-widest uppercase">
            {t.trustedBy}
          </span>
          <div className="flex flex-wrap items-center gap-8 lg:gap-14 text-white font-display text-sm font-semibold opacity-80">
            <div className="flex items-center gap-1.5 tracking-tight">
              <span className="w-2.5 h-2.5 bg-teal-400 rounded-full" />
              {t.logoDapper}
            </div>
            <div className="flex items-center gap-1.5 tracking-tight">
              <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />
              {t.logoNewton}
            </div>
            <div className="flex items-center gap-1.5 tracking-tight text-indigo-200">
              <span className="w-2.5 h-2.5 bg-blue-400 rounded-full" />
              {t.logoRipple}
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE SIMULATOR: HOW IT WORKS */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#354CE1] uppercase tracking-widest">
              {t.sandboxBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
              {t.howItWorks}
            </h2>
          </div>
          
          {/* Tabs selectors */}
          <div className="flex items-center gap-2 border border-slate-200 p-1.5 bg-white rounded-full self-start md:self-auto">
            {[
              { num: 1, label: t.tabConfigure },
              { num: 2, label: t.tabInvestigate },
              { num: 3, label: t.tabDecide },
            ].map(tab => (
              <button
                key={tab.num}
                onClick={() => setActiveStep(tab.num as 1 | 2 | 3)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeStep === tab.num 
                    ? 'bg-[#354CE1] text-white shadow-sm' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Panel Frame */}
        <div className="bg-[#E5E9FF] rounded-[2rem] border border-[#354CE1]/15 p-6 md:p-10 lg:p-12 min-h-[500px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: CONFIGURE */}
            {activeStep === 1 && (
              <motion.div 
                key="step-1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left side text explanation */}
                <div className="lg:col-span-5 space-y-5">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-[#0B122F] tracking-tight">
                    {t.configureTitle}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {t.configureDesc}
                  </p>
                  
                  <div className="pt-2">
                    <p className="text-xs font-bold text-[#354CE1] mb-2 uppercase tracking-wide">
                      {t.tryItYourself}
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-500">
                      <li className="flex items-center gap-2 font-medium">
                        <Check className="w-4 h-4 text-green-500 stroke-[3px]" />
                        {t.tryItCheck1}
                      </li>
                      <li className="flex items-center gap-2 font-medium">
                        <Check className="w-4 h-4 text-green-500 stroke-[3px]" />
                        {t.tryItCheck2}
                      </li>
                    </ul>
                  </div>

                  {!showAddRuleForm ? (
                    <button
                      onClick={() => setShowAddRuleForm(true)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#354CE1] bg-white border border-[#354CE1]/20 hover:bg-[#354CE1]/5 py-2 px-4 rounded-full transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      {t.addCustomRule}
                    </button>
                  ) : (
                    <form onSubmit={handleAddRule} className="bg-white p-4 rounded-xl border border-[#354CE1]/15 shadow-md space-y-3">
                      <p className="text-xs font-bold text-[#0B122F]">{t.createRuleTitle}</p>
                      
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">{t.ruleNameLabel}</label>
                        <input 
                          type="text" 
                          placeholder={t.ruleNamePlaceholder}
                          value={newRuleName}
                          onChange={(e) => setNewRuleName(e.target.value)}
                          className="w-full text-xs p-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#354CE1]"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">{t.ifConditionLabel}</label>
                        <input 
                          type="text" 
                          placeholder={t.ifConditionPlaceholder}
                          value={newRuleCondition}
                          onChange={(e) => setNewRuleCondition(e.target.value)}
                          className="w-full text-xs p-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#354CE1]"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">{t.thenActionLabel}</label>
                        <input 
                          type="text" 
                          placeholder={t.thenActionPlaceholder}
                          value={newRuleAction}
                          onChange={(e) => setNewRuleAction(e.target.value)}
                          className="w-full text-xs p-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#354CE1]"
                          required
                        />
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button 
                          type="submit"
                          className="text-xs font-bold text-white bg-[#354CE1] px-3.5 py-1.5 rounded-lg hover:bg-[#2539BE] transition"
                        >
                          {t.saveRule}
                        </button>
                        <button 
                          type="button"
                          onClick={() => setShowAddRuleForm(false)}
                          className="text-xs font-bold text-slate-500 hover:text-slate-800"
                        >
                          {t.cancel}
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                {/* Right side simulation panel */}
                <div className="lg:col-span-7">
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
                    <div className="bg-slate-900 text-slate-200 px-5 py-3 flex items-center justify-between border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <Sliders className="w-4 h-4 text-[#8C9EFF]" />
                        <span className="text-xs font-bold tracking-tight">{t.rulesBuilderTitle}</span>
                      </div>
                      <span className="text-[9px] bg-[#354CE1] text-white px-2 py-0.5 rounded-md font-mono">{t.active}</span>
                    </div>

                    <div className="p-4 sm:p-6 space-y-3 max-h-[380px] overflow-y-auto">
                      {rules.map((rule) => {
                        const translatedRule = getRuleTranslation(rule, language);
                        return (
                          <div 
                            key={rule.id}
                            className={`p-3.5 rounded-xl border transition ${
                              rule.active 
                                ? 'bg-indigo-50/40 border-[#354CE1]/15 shadow-xs' 
                                : 'bg-slate-50/50 border-slate-100 opacity-60'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className={`w-1.5 h-1.5 rounded-full ${rule.active ? 'bg-[#354CE1]' : 'bg-slate-300'}`} />
                                  <p className="text-xs font-bold text-slate-900">{translatedRule.name}</p>
                                </div>
                                <p className="text-[11px] text-slate-500 font-mono pl-3.5">{translatedRule.condition}</p>
                                <div className="flex items-center gap-1.5 pl-3.5 text-[10px] text-slate-400 font-medium pt-1">
                                  <Zap className="w-3 h-3 text-[#354CE1] shrink-0" />
                                  <span>{t.actionLabel} <strong className="text-slate-600">{translatedRule.action}</strong></span>
                                </div>
                              </div>

                              <div className="flex items-center gap-3">
                                {/* Toggle switch */}
                                <button 
                                  onClick={() => handleToggleRule(rule.id)}
                                  className={`w-8 h-4.5 rounded-full p-0.5 transition-colors focus:outline-none ${
                                    rule.active ? 'bg-[#354CE1]' : 'bg-slate-300'
                                  }`}
                                >
                                  <div className={`w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                                    rule.active ? 'translate-x-3.5' : 'translate-x-0'
                                  }`} />
                                </button>

                                <button 
                                  onClick={() => handleDeleteRule(rule.id)}
                                  className="p-1 hover:bg-slate-100 rounded-md text-slate-400 hover:text-red-500 transition"
                                  title={t.deleteRule}
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
                      <span>{t.totalActiveRules} {rules.filter(r => r.active).length}</span>
                      <span>{t.configVersion} {t.configVersionValue}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: INVESTIGATE */}
            {activeStep === 2 && (
              <motion.div 
                key="step-2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left side text explanation */}
                <div className="lg:col-span-4 space-y-4">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-[#0B122F] tracking-tight">
                    {t.investigateTitle}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {t.investigateDesc}
                  </p>
                  
                  <div className="p-4 bg-white/70 border border-[#354CE1]/10 rounded-xl space-y-2">
                    <p className="text-xs font-bold text-[#354CE1] uppercase tracking-wide">
                      {t.reviewerConsoleLabel}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {t.reviewerConsoleDesc}
                    </p>
                  </div>

                  <button
                    onClick={handleResetCase}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 mt-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    {t.resetCaseSimulation}
                  </button>
                </div>

                {/* Right side simulation panel: Real Mock Case Console */}
                <div className="lg:col-span-8">
                  <div className="bg-white rounded-2xl border border-slate-150 shadow-xl overflow-hidden text-slate-800">
                    {/* Console Header */}
                    <div className="bg-slate-55 py-3 px-5 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <FolderHeart className="w-4.5 h-4.5 text-[#354CE1]" />
                        <span className="text-xs font-bold text-slate-900">{t.caseConsole} / #{currentCase.id}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400 font-mono">{t.assignedToYou}</span>
                        <div className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                          currentCase.status === 'pending' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                          currentCase.status === 'approved' ? 'bg-green-100 text-green-700 border border-green-200' :
                          currentCase.status === 'rejected' ? 'bg-red-100 text-red-700 border border-red-200' :
                          'bg-[#354CE1]/10 text-[#354CE1] border border-[#354CE1]/20'
                        }`}>
                          {currentCase.status === 'pending' ? t.statusPending :
                           currentCase.status === 'approved' ? t.statusApproved :
                           currentCase.status === 'rejected' ? t.statusRejected :
                           t.statusEscalated}
                        </div>
                      </div>
                    </div>

                    {/* Console Body */}
                    <div className="grid grid-cols-1 md:grid-cols-12 border-b border-slate-200">
                      {/* Sub-column 1: User & Signals Info (span 7) */}
                      <div className="md:col-span-7 p-4 sm:p-5 border-r border-slate-100 space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#354CE1] text-white font-bold rounded-full flex items-center justify-center text-sm">
                            {t.reviewerInitials}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-900 leading-none">{currentCase.name}</h4>
                            <p className="text-[10px] text-slate-400 mt-0.5">{currentCase.email}</p>
                          </div>
                          
                          <div className="ml-auto text-right">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">{t.riskScoreLabel}</span>
                            <span className="text-lg font-mono font-bold text-red-500 leading-none">{currentCase.riskScore} <span className="text-[10px] text-slate-400">{t.riskScoreMaxLabel}</span></span>
                          </div>
                        </div>

                        {/* Signals list */}
                        <div className="space-y-2">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.evaluationSignalsLabel} ({currentCase.signals.length})</p>
                          
                          <div className="space-y-1.5 max-h-[170px] overflow-y-auto pr-1">
                            {currentCase.signals.map((sig, idx) => {
                              const translatedSig = getSignalTranslation(sig.label, sig.details, language);
                              return (
                                <div key={idx} className="p-2 rounded-lg border border-slate-100 bg-slate-50/50 flex items-start gap-2 text-left">
                                  {sig.status === 'critical' ? (
                                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                  ) : sig.status === 'warning' ? (
                                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                  ) : (
                                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                  )}
                                  <div>
                                    <p className="text-[10px] font-bold text-slate-800 leading-none">{translatedSig.label}</p>
                                    <p className="text-[9px] text-slate-400 mt-0.5 leading-tight">{translatedSig.details}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Notes form */}
                        <div className="flex items-center gap-1.5 border border-slate-200 rounded-lg p-1">
                          <input 
                            type="text" 
                            placeholder={t.addPrivateNotePlaceholder}
                            value={caseNoteInput}
                            onChange={(e) => setCaseNoteInput(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleAddCaseNote(); }}
                            className="w-full text-[11px] p-1.5 focus:outline-none placeholder-slate-400"
                          />
                          <button 
                            onClick={handleAddCaseNote}
                            className="bg-[#354CE1] hover:bg-[#2539BE] text-white text-[10px] font-bold px-3 py-1.5 rounded-md transition"
                          >
                            {t.addButton}
                          </button>
                        </div>
                      </div>

                      {/* Sub-column 2: Timeline logs & actions (span 5) */}
                      <div className="md:col-span-5 p-4 sm:p-5 bg-slate-50/50 flex flex-col justify-between">
                        <div className="space-y-3">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.reviewTimelineLabel}</p>
                          <div className="space-y-2.5 max-h-[150px] overflow-y-auto pr-1">
                            {currentCase.timeline.map((event, idx) => (
                              <div key={idx} className="flex gap-2 text-left">
                                <span className="text-[9px] font-mono font-semibold text-[#354CE1] mt-0.5 shrink-0">{event.time}</span>
                                <p className="text-[10px] text-slate-600 leading-relaxed font-normal">{translateTimelineText(event.text, language)}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Real-time event execution log */}
                        <div className="mt-4 bg-slate-900 border border-slate-850 p-2.5 rounded-lg text-[9px] font-mono text-slate-300 space-y-1 text-left">
                          <p className="text-[#8C9EFF] font-bold">{t.systemLogBus}</p>
                          {decisionLogs.slice(-2).map((log, i) => (
                            <p key={i} className="text-[8px] truncate leading-tight">{translateDecisionLog(log, language)}</p>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Console Footer Decisions Bar */}
                    <div className="p-4 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
                      <span className="text-[10px] text-slate-400 font-semibold uppercase">{t.actionReviewerPanel}</span>
                      
                      {currentCase.status === 'pending' ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleResolveCase('approved')}
                            className="text-xs font-bold text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg shadow-xs transition"
                          >
                            {t.approveCaseBtn}
                          </button>
                          <button
                            onClick={() => handleResolveCase('rejected')}
                            className="text-xs font-bold text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg shadow-xs transition"
                          >
                            {t.declineFraudBtn}
                          </button>
                          <button
                            onClick={() => handleResolveCase('escalated')}
                            className="text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 px-4 py-2 rounded-lg shadow-xs transition"
                          >
                            {t.escalateBtn}
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-slate-500 font-medium">{t.resolutionLogged}</p>
                          <button
                            onClick={handleResetCase}
                            className="text-xs font-bold text-[#354CE1] hover:underline"
                          >
                            {t.reviewAnotherCase}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: DECIDE */}
            {activeStep === 3 && (
              <motion.div 
                key="step-3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left side text explanation */}
                <div className="lg:col-span-5 space-y-5">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-[#0B122F] tracking-tight">
                    {t.decideTitle}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {t.decideDesc}
                  </p>
                  
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-[#354CE1] mb-2 uppercase tracking-wide">
                      {t.tryTriggerWebhook}
                    </p>
                    <button
                      onClick={handleTriggerWebhookTest}
                      disabled={isSimulatingWebhook}
                      className={`inline-flex items-center gap-2 text-xs font-bold text-white bg-[#354CE1] hover:bg-[#2539BE] py-2.5 px-5 rounded-full shadow-md transition ${
                        isSimulatingWebhook ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSimulatingWebhook ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          {t.testingEndpoint}
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-white" />
                          {t.triggerTestWebhook}
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Right side simulation panel */}
                <div className="lg:col-span-7">
                  <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
                    <div className="bg-slate-850 px-5 py-3 border-b border-slate-800 flex items-center justify-between text-slate-300">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-mono font-bold">{t.autoDecisionTerminal}</span>
                      </div>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 " />
                    </div>

                    <div className="p-5 font-mono text-xs text-left min-h-[250px] max-h-[350px] overflow-y-auto space-y-2">
                      <p className="text-slate-500">{t.listeningForDecision}</p>
                      <p className="text-slate-400">{t.decisionListenerCommand}</p>
                      
                      <div className="border-t border-slate-800/80 pt-2.5 space-y-1.5">
                        {webhookLogs.length === 0 ? (
                          <p className="text-slate-500 italic">{t.logBufferEmpty}</p>
                        ) : (
                          webhookLogs.map((log, i) => {
                            let textClass = 'text-slate-300';
                            if (log.startsWith('🟢') || log.startsWith('✅')) textClass = 'text-emerald-400 font-bold';
                            if (log.startsWith('⚡')) textClass = 'text-yellow-400 font-bold';
                            return (
                              <p key={i} className={`text-[11px] leading-relaxed ${textClass}`}>{translateWebhookLog(log, i, language)}</p>
                            );
                          })
                        )}
                      </div>
                    </div>

                    <div className="bg-slate-950 p-4 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex justify-between">
                      <span>{t.webhookStatusOnline}</span>
                      <span>{t.targetLabel} {t.targetEndpointValue}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>

      {/* 5. INTERACTIVE ACCORDION: KEY FEATURES */}
      <section className="bg-white py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left sticky column */}
            <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
              <span className="text-xs font-bold text-[#354CE1] uppercase tracking-widest block">
                {t.keyFeatures}
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight leading-tight">
                {t.keyFeaturesTitle}
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed font-normal">
                {t.keyFeaturesDesc}
              </p>

              {/* Decorative graphic depicting active configuration */}
              <div className="pt-6 hidden lg:block">
                <div className="p-5 bg-gradient-to-tr from-indigo-50 to-purple-50 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-900">{t.customSchemaTitle}</p>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">{t.customSchemaSubtitle}</p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white border border-slate-200 py-1.5 px-3 rounded-lg text-xs font-semibold text-slate-700">
                    <FileCheck className="w-4 h-4 text-[#354CE1]" />
                    {t.schemaConfigured}
                  </div>
                </div>
              </div>
            </div>

            {/* Right accordion column */}
            <div className="lg:col-span-7 space-y-3">
              {localizedFeatures.map((feat, idx) => {
                const isExpanded = expandedFeature === idx;
                return (
                  <div 
                    key={idx}
                    className={`border border-slate-150 rounded-2xl overflow-hidden transition-all duration-300 ${
                      isExpanded ? 'bg-[#E5E9FF]/40 border-[#354CE1]/15 shadow-sm' : 'bg-white hover:bg-slate-50/50'
                    }`}
                  >
                    <button
                      onClick={() => setExpandedFeature(isExpanded ? null : idx)}
                      className="w-full p-5 flex items-center justify-between text-left focus:outline-none"
                    >
                      <span className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                        {feat.title}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 shrink-0 ml-4 ${
                        isExpanded ? 'rotate-180 text-[#354CE1]' : ''
                      }`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                        >
                          <div className="px-5 pb-5 pt-1 space-y-3 border-t border-slate-100/50">
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                              {feat.desc}
                            </p>
                            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-medium text-slate-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#354CE1]" />
                              <span>{feat.subText}</span>
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
        </div>
      </section>

      {/* 6. USE CASES GRID: HOW TEAMS CAN USE CASES */}
      <section className="py-20 bg-[#FAFBFD] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center md:text-left space-y-3 mb-12">
            <span className="text-xs font-bold text-[#354CE1] uppercase tracking-widest block">
              {t.appScenarios}
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
              {t.howTeamsUse}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {localizedUseCases.map((useCase, idx) => {
              const Icon = useCase.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-150/80 hover:border-[#354CE1]/15 shadow-xs hover:shadow-md transition duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4 text-left">
                    <div className="w-10 h-10 bg-indigo-50 text-[#354CE1] rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                      {useCase.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                      {useCase.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER TESTIMONIAL & LOGO STRIP (BitGo) */}
      <section className="bg-indigo-50/50 py-20 border-t border-b border-slate-250/20">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-8">
          
          {/* Testimonial Quote */}
          <blockquote className="space-y-4 max-w-4xl mx-auto">
            <p className="text-base sm:text-lg md:text-xl font-mono text-[#0B122F] tracking-tight leading-relaxed">
              {t.bitgoQuote}
            </p>
            <cite className="text-xs font-bold text-slate-400 not-italic uppercase tracking-wider block">
              {t.bitgoCite}
            </cite>
          </blockquote>

          {/* Customer Case Study strip element */}
          <div className="max-w-3xl mx-auto bg-white p-5 rounded-2xl border border-slate-200/80 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-left">
              <div className="w-9 h-9 bg-black text-white font-bold rounded-lg flex items-center justify-center text-xs tracking-wider">
                {t.bitgoLogoInitial}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{t.bitgoResults}</h4>
                <p className="text-[10px] text-slate-500 leading-normal font-medium max-w-md mt-0.5">
                  {t.bitgoDesc}
                </p>
              </div>
            </div>

            <button 
              onClick={onOpenSandbox}
              className="w-full sm:w-auto bg-black hover:bg-slate-800 text-white font-bold text-[10px] py-2 px-4 rounded-lg flex items-center justify-center gap-1.5 transition shrink-0 uppercase tracking-wider"
            >
              {t.readCaseStudy}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 8. KEEP LEARNING BLOG GRID */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center md:text-left space-y-3 mb-10">
          <span className="text-xs font-bold text-[#354CE1] uppercase tracking-widest block">
            {t.resources}
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
            {t.keepLearning}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {localizedBlogs.map((blog, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl border border-slate-150 overflow-hidden shadow-xs hover:shadow-md transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] bg-slate-100 overflow-hidden relative">
                  <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs py-1 px-2.5 rounded-md text-[9px] font-bold text-slate-800 shadow-xs uppercase">
                    {t.blogLabel}
                  </div>
                </div>

                <div className="p-6 text-left space-y-3">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight hover:text-[#354CE1] transition cursor-pointer">
                    {blog.title}
                  </h3>
                </div>
              </div>

              <div className="px-6 pb-6 pt-1 flex items-center justify-between text-[11px] text-slate-400 font-semibold border-t border-slate-50">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-slate-300" />
                  {blog.readTime}
                </span>
                <span className="text-[#354CE1] hover:underline cursor-pointer flex items-center gap-0.5">
                  {t.readArticle}
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. PLATFORM UPSELL CARDS */}
      <section className="py-16 bg-slate-50 border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900 text-center tracking-tight">
            {t.exploreUpsell}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
              onClick={() => onViewChange?.('platform')}
              className="bg-white p-8 rounded-3xl border border-slate-150 hover:border-[#354CE1]/15 shadow-xs hover:shadow-md transition duration-300 text-left flex flex-col justify-between min-h-[180px] cursor-pointer group"
            >
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight group-hover:text-[#354CE1] transition">
                  {t.upsell1Title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  {t.upsell1Desc}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#354CE1] pt-4 uppercase tracking-wider">
                <span>{t.upsell1Link}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div 
              onClick={() => onViewChange?.('platform')}
              className="bg-white p-8 rounded-3xl border border-slate-150 hover:border-[#354CE1]/15 shadow-xs hover:shadow-md transition duration-300 text-left flex flex-col justify-between min-h-[180px] cursor-pointer group"
            >
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight group-hover:text-[#354CE1] transition">
                  {t.upsell2Title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  {t.upsell2Desc}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#354CE1] pt-4 uppercase tracking-wider">
                <span>{t.upsell2Link}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. BOTTOM CALL TO ACTION BANNER */}
      <section className="bg-indigo-50 border-t border-slate-200/50 py-20 text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight leading-none">
            {t.readyToGetStarted}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal max-w-xl mx-auto leading-relaxed">
            {t.readyToGetStartedDesc}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <button 
              onClick={onOpenSandbox}
              className="w-full sm:w-auto bg-black hover:bg-slate-800 text-white font-semibold text-xs py-3 px-6 rounded-full flex items-center justify-center gap-1.5 shadow transition"
            >
              {t.getDemo}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={onOpenSandbox}
              className="w-full sm:w-auto text-[#354CE1] hover:text-[#2539BE] font-bold text-xs py-3 px-6 rounded-full flex items-center justify-center gap-1 transition"
            >
              <span>{t.tryItNow}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
