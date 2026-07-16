/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, ArrowRight, ShieldCheck, Check, Users, Lock, 
  Database, Smartphone, HelpCircle, AlertTriangle, FileText, 
  Share2, Zap, Sliders, Settings, Play, RefreshCw, 
  User, CheckCircle2, AlertCircle, Plus, Trash2, Bell, Shield, ShieldAlert,
  Clock, Search, BookOpen, ChevronDown, Landmark, Globe, Terminal,
  Fingerprint, Activity, Filter, Cpu, Layers, Eye, Link2, Server,
  MessageSquare, Code, CheckSquare, Info, Copy, CheckSquare2
} from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { COPILOT_TRANSLATIONS, getLocalizedCases, SIM_TRANSLATIONS } from '../translations/CopilotPageTranslations';
import { copyTextToClipboard } from '../utils/clipboard';

interface CopilotPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

type TabType = 'Understand' | 'Learn' | 'Draft' | 'Recommend';

interface ChatMessage {
  sender: 'user' | 'copilot';
  text: string;
  timestamp: string;
  isDraft?: boolean;
}

interface CaseDetails {
  id: string;
  name: string;
  email: string;
  riskScore: number;
  country: string;
  flags: string[];
  findings: string;
  selfieUrl?: string;
  idPhotoUrl?: string;
}

export default function CopilotPage({ onOpenSandbox, onBackToLanding, onViewChange }: CopilotPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(COPILOT_TRANSLATIONS, language as keyof typeof COPILOT_TRANSLATIONS, 'COPILOT_TRANSLATIONS');
  const simT = getLocalizedRecord(SIM_TRANSLATIONS, language as keyof typeof SIM_TRANSLATIONS, 'SIM_TRANSLATIONS');

  // Navigation active state for interactive "How it works" section
  const [activeTab, setActiveTab] = useState<TabType>('Understand');
  
  // States for Live Copilot Action Simulator
  const [selectedCaseIndex, setSelectedCaseIndex] = useState<number>(0);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [customQuestion, setCustomQuestion] = useState<string>('');
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const cases = getLocalizedCases(language);

  // Load initial chat on case change
  useEffect(() => {
    const currentCase = cases[selectedCaseIndex];
    if (!currentCase) return;
    const simT = getLocalizedRecord(SIM_TRANSLATIONS, language as keyof typeof SIM_TRANSLATIONS, 'SIM_TRANSLATIONS');
    const greetingMsg = simT.greeting
      .replace('{name}', currentCase.name)
      .replace('{id}', currentCase.id)
      .replace('{riskScore}', String(currentCase.riskScore))
      .replace('{flagCount}', String(currentCase.flags.length))
      .replace('{findings}', currentCase.findings);

    setChatHistory([
      {
        sender: 'copilot',
        text: greetingMsg,
        timestamp: simT.justNow
      }
    ]);
  }, [selectedCaseIndex, language]);

  const handleSuggestQuestion = (question: string) => {
    if (isTyping) return;
    
    const simT = getLocalizedRecord(SIM_TRANSLATIONS, language as keyof typeof SIM_TRANSLATIONS, 'SIM_TRANSLATIONS');
    
    // Add user message
    const updatedHistory = [...chatHistory, { sender: 'user' as const, text: question, timestamp: simT.justNow }];
    setChatHistory(updatedHistory);
    setIsTyping(true);

    // Simulate typing
    setTimeout(() => {
      const currentCase = cases[selectedCaseIndex];
      let answerText = '';
      let isDraftText = false;

      const lowerQ = question.toLowerCase();
      if (lowerQ.includes('draft') || lowerQ.includes('communication') || lowerQ.includes('email') || lowerQ.includes('borrador') || lowerQ.includes('correo') || lowerQ.includes('下書き') || lowerQ.includes('メール') || lowerQ.includes('entwurf') || lowerQ.includes('soạn') || lowerQ.includes('thảo')) {
        isDraftText = true;
        if (currentCase.id === 'CASE-4912') {
          answerText = `${simT.draftLin}`;
        } else if (currentCase.id === 'CASE-8291') {
          answerText = `${simT.draftMarcus}`;
        } else {
          answerText = `${simT.draftElena}`;
        }
      } else if (lowerQ.includes('explain') || lowerQ.includes('why') || lowerQ.includes('risk') || lowerQ.includes('explicar') || lowerQ.includes('razón') || lowerQ.includes('説明') || lowerQ.includes('なぜ') || lowerQ.includes('erklären') || lowerQ.includes('gründe') || lowerQ.includes('giải') || lowerQ.includes('thích')) {
        if (currentCase.id === 'CASE-4912') {
          answerText = simT.explainLin;
        } else if (currentCase.id === 'CASE-8291') {
          answerText = simT.explainMarcus;
        } else {
          answerText = simT.explainElena;
        }
      } else if (lowerQ.includes('recommend') || lowerQ.includes('action') || lowerQ.includes('approve') || lowerQ.includes('recomendar') || lowerQ.includes('acción') || lowerQ.includes('推奨') || lowerQ.includes('アクション') || lowerQ.includes('empfehlen') || lowerQ.includes('maßnahme') || lowerQ.includes('đề') || lowerQ.includes('xuất')) {
        if (currentCase.id === 'CASE-4912') {
          answerText = simT.recommendLin;
        } else if (currentCase.id === 'CASE-8291') {
          answerText = simT.recommendMarcus;
        } else {
          answerText = simT.recommendElena;
        }
      } else {
        answerText = simT.defaultResponse;
      }

      setChatHistory(prev => [...prev, {
        sender: 'copilot',
        text: answerText,
        timestamp: simT.justNow,
        isDraft: isDraftText
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim() || isTyping) return;
    
    const text = customQuestion;
    setCustomQuestion('');
    handleSuggestQuestion(text);
  };

  const copyDraftToClipboard = async (text: string) => {
    const copied = await copyTextToClipboard(text);
    setCopyStatus(copied ? 'success' : 'error');
    setTimeout(() => setCopyStatus('idle'), 2000);
  };


  return (
    <div className="bg-[#FAFBFD] text-slate-800 antialiased min-h-screen">
      
      {/* Brand Hero Header Block (Periwinkle Theme matching the screenshot) */}
      <section className="relative overflow-hidden bg-[#8586FF] pt-20 pb-24 text-white rounded-b-[40px] md:rounded-b-[60px] shadow-lg">
        {/* Floating Abstract UI Background Nodes & Shapes */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-white filter blur-3xl animate-pulse" />
          <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-indigo-200 filter blur-3xl" />
          
          {/* Subtle grid mesh overlay */}
          <div className="w-full h-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px] opacity-10" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          
          {/* Label Pill */}
          <div className="inline-flex items-center gap-2 bg-white/25 backdrop-blur-md px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase mb-8 border border-white/20 shadow-sm">
            <Sparkles className="w-4 h-4 text-white" />
            <span>{t.copilot}</span>
          </div>

          {/* Heading - Elegant, display typography */}
          <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight max-w-5xl leading-[1.1] mb-8">
            {t.heroTitle}
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-white/95 max-w-3xl font-normal leading-relaxed mb-12">
            {t.heroDesc}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 items-center mb-16">
            <button 
              onClick={() => {
                const element = document.getElementById('see-copilot-in-action');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-8 py-4 bg-white text-[#5254FF] font-semibold rounded-full hover:bg-slate-50 transition-all flex items-center gap-2.5 shadow-lg shadow-black/10 text-base"
            >
              <span>{t.tryCopilotNow}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('how-it-works-scroll');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-6 py-4 bg-transparent text-white font-semibold hover:text-indigo-100 transition-all flex items-center gap-2 text-base group"
            >
              <span>{t.learnMore}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 3 Columns Dividers / Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-white/20">
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-white">{t.stats1Title}</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {t.stats1Desc}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-white">{t.stats2Title}</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {t.stats2Desc}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-white">{t.stats3Title}</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {t.stats3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* "How it works" Interactive Section */}
      <section id="how-it-works-scroll" className="py-24 max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900 tracking-tight">
              {t.howItWorks}
            </h2>
            <p className="text-slate-500 mt-2 text-base max-w-md">
              {t.howItWorksDesc}
            </p>
          </div>

          {/* Tab Selection */}
          <div className="flex bg-slate-100 p-1.5 rounded-xl self-start md:self-auto overflow-x-auto whitespace-nowrap max-w-full">
            {(['Understand', 'Learn', 'Draft', 'Recommend'] as TabType[]).map((tab, idx) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                  activeTab === tab
                    ? 'bg-white text-[#5254FF] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="text-slate-300 font-normal mr-1.5">{idx + 1}</span>
                {t.tabs[tab.toLowerCase() as keyof typeof t.tabs]}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Display Grid Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Content */}
          <div className="lg:col-span-5 space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {activeTab === 'Understand' && (
                  <>
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 text-[#5254FF] flex items-center justify-center">
                      <Eye className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-bold font-display text-slate-900 leading-tight">
                      {t.tabUnderstandTitle}
                    </h3>
                    <p className="text-slate-600 text-base leading-relaxed">
                      {t.tabUnderstandDesc}
                    </p>
                    <ul className="space-y-2 text-sm text-slate-500 font-medium">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500" />
                        {t.tabUnderstandPoint1}
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500" />
                        {t.tabUnderstandPoint2}
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500" />
                        {t.tabUnderstandPoint3}
                      </li>
                    </ul>
                  </>
                )}

                {activeTab === 'Learn' && (
                  <>
                    <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-bold font-display text-slate-900 leading-tight">
                      {t.tabLearnTitle}
                    </h3>
                    <p className="text-slate-600 text-base leading-relaxed">
                      {t.tabLearnDesc}
                    </p>
                    <ul className="space-y-2 text-sm text-slate-500 font-medium">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500" />
                        {t.tabLearnPoint1}
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500" />
                        {t.tabLearnPoint2}
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500" />
                        {t.tabLearnPoint3}
                      </li>
                    </ul>
                  </>
                )}

                {activeTab === 'Draft' && (
                  <>
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-bold font-display text-slate-900 leading-tight">
                      {t.tabDraftTitle}
                    </h3>
                    <p className="text-slate-600 text-base leading-relaxed">
                      {t.tabDraftDesc}
                    </p>
                    <ul className="space-y-2 text-sm text-slate-500 font-medium">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500" />
                        {t.tabDraftPoint1}
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500" />
                        {t.tabDraftPoint2}
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500" />
                        {t.tabDraftPoint3}
                      </li>
                    </ul>
                  </>
                )}

                {activeTab === 'Recommend' && (
                  <>
                    <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                      <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-bold font-display text-slate-900 leading-tight">
                      {t.tabRecommendTitle}
                    </h3>
                    <p className="text-slate-600 text-base leading-relaxed">
                      {t.tabRecommendDesc}
                    </p>
                    <ul className="space-y-2 text-sm text-slate-500 font-medium">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500" />
                        {t.tabRecommendPoint1}
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500" />
                        {t.tabRecommendPoint2}
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500" />
                        {t.tabRecommendPoint3}
                      </li>
                    </ul>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Dynamic Mock Dashboard Preview */}
          <div className="lg:col-span-7 bg-[#0E1326] rounded-2xl border border-slate-800 shadow-2xl p-6 min-h-[420px] flex flex-col justify-between relative overflow-hidden text-slate-200">
            
            {/* Top Bar of Sandbox Mock Window */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="font-mono text-slate-500 pl-2">{simT.dashboardCaseReview}</span>
              </div>
              <div className="text-[10px] bg-indigo-950 text-[#8586FF] font-semibold px-2 py-0.5 rounded border border-indigo-900">
                {simT.aiActive}
              </div>
            </div>

            {/* Core Graphic Mockup changes based on Active Tab */}
            <div className="flex-1 py-6 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {activeTab === 'Understand' && (
                    <div className="space-y-3">
                      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-slate-400">{simT.passportDocSanity}</span>
                          <span className="text-xs bg-red-950/80 text-red-400 px-2 py-0.5 rounded border border-red-900 font-mono">{simT.flagged}</span>
                        </div>
                        <div className="text-sm font-semibold mb-1">{simT.mismatchedMRZOCR}</div>
                        <p className="text-xs text-slate-400 font-mono">{simT.readIDNum}: &quot;G9283120&quot; | {simT.mrzCheckSum}: &quot;G9283129&quot;</p>
                      </div>

                      <div className="bg-indigo-950/40 border border-[#8586FF]/30 p-4 rounded-xl relative">
                        <div className="flex items-center gap-1.5 text-xs text-[#8B96FC] font-bold mb-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{simT.copilotAnalysis}</span>
                        </div>
                        <p className="text-xs leading-relaxed text-indigo-100">
                          &quot;{simT.copilotAnalysisText}&quot;
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'Learn' && (
                    <div className="space-y-3">
                      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="px-2 py-0.5 bg-slate-800 rounded text-[10px] font-mono text-slate-400 font-bold">{simT.helpCenterGuide}</div>
                          <span className="text-xs text-slate-500">·</span>
                          <span className="text-xs text-slate-400 font-medium">{simT.complianceStandards}</span>
                        </div>
                        <div className="text-sm font-bold text-white mb-1">{simT.understandingNFC}</div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {simT.nfcDesc}
                        </p>
                      </div>

                      <div className="bg-[#1C2038] border border-indigo-900 p-3.5 rounded-xl flex gap-3">
                        <div className="w-8 h-8 rounded bg-indigo-900 text-indigo-300 flex items-center justify-center flex-shrink-0">
                          <Info className="w-4 h-4" />
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          <strong className="text-[#8B96FC]">{simT.copilotTip}:</strong> {simT.simTipText}
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'Draft' && (
                    <div className="space-y-3">
                      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 font-mono text-xs text-slate-400 relative">
                        <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-slate-800 pb-2 mb-2">
                          <span>{simT.subjectText}</span>
                          <span className="text-indigo-400">{simT.draftedByCopilot}</span>
                        </div>
                        <p className="leading-relaxed text-[11px] text-slate-300 whitespace-pre-line">
                          {simT.simDraftPreviewText}
                        </p>
                      </div>

                      <div className="flex gap-2 justify-end">
                        <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs font-semibold flex items-center gap-1.5">
                          <Copy className="w-3.5 h-3.5" />
                          <span>{simT.copyDraft}</span>
                        </button>
                        <button className="px-3 py-1.5 bg-[#5254FF] hover:bg-[#4345E5] text-white rounded text-xs font-semibold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>{simT.insertIntoCase}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {activeTab === 'Recommend' && (
                    <div className="space-y-3">
                      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                        <div className="text-xs font-bold text-slate-500 mb-1">{simT.recommendedActionPipeline}</div>
                        <div className="text-sm font-semibold mb-3 text-slate-200">{simT.howToResolveCase}</div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 rounded bg-[#172554]/40 border border-blue-900 text-xs">
                            <span className="font-semibold text-blue-300">{simT.simOption1}</span>
                            <span className="text-[10px] text-blue-400 font-mono">{simT.highlyRecommended}</span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded bg-slate-800/50 border border-slate-800 text-xs">
                            <span className="font-semibold text-slate-400">{simT.simOption2}</span>
                            <span className="text-[10px] text-slate-500 font-mono">{simT.backupAction}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-500 italic text-center font-mono">
                        {simT.poweredByHistoric}
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Simulated UI Footnote bar */}
            <div className="border-t border-slate-800 pt-3 text-[10px] text-slate-500 flex items-center justify-between font-mono">
              <span>{simT.interactiveDashboardSim}</span>
              <span>{simT.clickOtherTabs}</span>
            </div>
          </div>

        </div>
      </section>

      {/* Deep Navy Block - AI Agents / Actions / Intelligence */}
      <section className="bg-[#090E24] py-24 text-white relative overflow-hidden">
        
        {/* Decorative Grid Mesh */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="w-full h-full bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          
          {/* Section Divider Line & Heading */}
          <div className="border-t border-slate-800 pt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            <div className="lg:col-span-4">
              <span className="text-xs text-[#8B96FC] font-extrabold uppercase tracking-widest block mb-2">{t.centralizedAI}</span>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight">
                {t.designedIntegrity}
              </h2>
            </div>
            <div className="lg:col-span-8 flex items-center">
              <p className="text-slate-400 text-base leading-relaxed max-w-2xl">
                {t.designedIntegrityDesc}
              </p>
            </div>
          </div>

          {/* 3 Main Capability Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            {/* Column 1 */}
            <div className="space-y-4 bg-slate-900/40 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition duration-300">
              <div className="w-10 h-10 rounded-xl bg-indigo-950 text-[#8B96FC] flex items-center justify-center font-bold">
                A
              </div>
              <h3 className="font-bold text-xl text-slate-100">{t.aiAgentsTitle}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t.aiAgentsDesc}
              </p>
            </div>

            {/* Column 2 */}
            <div className="space-y-4 bg-slate-900/40 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition duration-300">
              <div className="w-10 h-10 rounded-xl bg-violet-950 text-violet-400 flex items-center justify-center font-bold">
                B
              </div>
              <h3 className="font-bold text-xl text-slate-100">{t.instantActionsTitle}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t.instantActionsDesc}
              </p>
            </div>

            {/* Column 3 */}
            <div className="space-y-4 bg-slate-900/40 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition duration-300">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold">
                C
              </div>
              <h3 className="font-bold text-xl text-slate-100">{t.deepIntelTitle}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t.deepIntelDesc}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* "See Copilot in Action" - Immersive, Live Chat & Case Review Simulator */}
      <section id="see-copilot-in-action" className="py-24 max-w-6xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-[#EEF1FF] text-[#5254FF] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-[#DBE2FF]">
            <Play className="w-3 h-3 fill-current" />
            <span>{t.interactiveSandbox}</span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900 tracking-tight">
            {t.seeCopilotTitle}
          </h2>
          <p className="text-slate-500 mt-2 text-base">
            {t.seeCopilotDesc}
          </p>
        </div>

        {/* Master Box Layout: Sidebar + Main Chat Area */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          
          {/* Left Side: Case Files Selector (4 Columns) */}
          <div className="lg:col-span-4 bg-slate-50 border-r border-slate-200 p-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                <span>{t.activeCases}</span>
                <span className="font-mono text-[10px] text-slate-500">{cases.length} {t.unresolved}</span>
              </div>

              {/* Case Buttons List */}
              <div className="space-y-3">
                {cases.map((cs, idx) => (
                  <button
                    key={cs.id}
                    onClick={() => {
                      if (!isTyping) {
                        setSelectedCaseIndex(idx);
                      }
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex flex-col space-y-2 ${
                      selectedCaseIndex === idx
                        ? 'bg-white border-[#5254FF] shadow-md shadow-[#5254FF]/5 relative'
                        : 'bg-transparent border-slate-200/80 hover:border-slate-300 hover:bg-slate-100/50'
                    }`}
                  >
                    {/* Active Border Overlay */}
                    {selectedCaseIndex === idx && (
                      <span className="absolute top-0 bottom-0 left-0 w-1 bg-[#5254FF] rounded-l-xl" />
                    )}

                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-slate-400">{cs.id}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold font-mono ${
                        cs.riskScore > 50 
                          ? 'bg-red-50 text-red-600' 
                          : 'bg-amber-50 text-amber-600'
                      }`}>
                        {t.risk}: {cs.riskScore}%
                      </span>
                    </div>

                    <div>
                      <div className="font-bold text-slate-800 text-sm">{cs.name}</div>
                      <div className="text-xs text-slate-500 truncate">{cs.email}</div>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-1">
                      {cs.flags.slice(0, 2).map((fl, fIdx) => (
                        <span key={fIdx} className="text-[9px] bg-slate-200/60 font-medium text-slate-600 px-2 py-0.5 rounded">
                          {fl}
                        </span>
                      ))}
                      {cs.flags.length > 2 && (
                        <span className="text-[9px] bg-slate-200/60 text-slate-500 px-1.5 py-0.5 rounded">
                          +{cs.flags.length - 2} {simT.more}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sandbox Bottom Instructions */}
            <div className="mt-8 pt-4 border-t border-slate-200 text-xs text-slate-400 font-medium leading-relaxed">
              <Info className="w-4 h-4 text-[#5254FF] inline mr-1.5 mb-0.5" />
              <span>{t.interactiveSandboxSub}</span>
            </div>
          </div>

          {/* Right Side: Copilot Interactive Chat Box (8 Columns) */}
          <div className="lg:col-span-8 flex flex-col justify-between min-h-[480px]">
            
            {/* Header: Loaded Case Header details */}
            <div className="bg-slate-50/50 border-b border-slate-100 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-[#5254FF] flex items-center justify-center font-bold text-sm">
                  {cases[selectedCaseIndex].name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800 text-sm">{cases[selectedCaseIndex].name}</span>
                    <span className="text-xs text-slate-400 font-mono">({cases[selectedCaseIndex].id})</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    {t.applicantCountry}: <span className="font-semibold">{cases[selectedCaseIndex].country}</span>
                  </div>
                </div>
              </div>

              <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>{t.copilotConnected}</span>
              </div>
            </div>

            {/* Chat Messages Log Area */}
            <div className="flex-1 p-6 space-y-4 max-h-[380px] overflow-y-auto bg-slate-50/20 scrollbar-thin">
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#5254FF] text-white rounded-br-none font-medium'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
                  }`}>
                    {/* Render Formatted Text (Simple markdown parse for bullets and bold) */}
                    <div className="space-y-1.5 whitespace-pre-line">
                      {msg.text.split('\n').map((line, lIdx) => {
                        let parsedLine = line;
                        // Bullet point replacement
                        if (parsedLine.startsWith('•')) {
                          return (
                            <div key={lIdx} className="flex gap-2 pl-2">
                              <span>•</span>
                              <span>{parsedLine.replace('•', '').trim()}</span>
                            </div>
                          );
                        }
                        // Code block rendering
                        if (parsedLine.startsWith('```')) {
                          return null; // Handle code blocks with simple styling below
                        }
                        
                        return <p key={lIdx}>{parsedLine}</p>;
                      })}

                      {/* Display Code box for Draft Emails */}
                      {msg.isDraft && msg.text.includes('```text') && (
                        <div className="mt-3 bg-slate-900 text-slate-300 font-mono text-xs rounded-lg p-3.5 border border-slate-800 relative">
                          <button
                            onClick={() => {
                              const match = msg.text.match(/```text([\s\S]*?)```/);
                              if (match) copyDraftToClipboard(match[1].trim());
                            }}
                            className="absolute top-2 right-2 p-1 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded transition"
                            title={copyStatus === 'error' ? simT.copyFailed : simT.copyDraft}
                          >
                            {copyStatus === 'success' ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : copyStatus === 'error' ? (
                              <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <div className="max-h-[120px] overflow-y-auto whitespace-pre">
                            {msg.text.match(/```text([\s\S]*?)```/)?.[1]?.trim() || simT.errorReadingDraft}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className={`text-[9px] mt-1 text-right ${
                      msg.sender === 'user' ? 'text-white/60' : 'text-slate-400'
                    }`}>
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Footer Area: Suggestion Buttons & Input Form */}
            <div className="p-4 bg-slate-50/50 border-t border-slate-200/80 space-y-3">
              
              {/* Preset suggestion query pills */}
              <div className="flex flex-wrap gap-2">
                <button
                  disabled={isTyping}
                  onClick={() => handleSuggestQuestion(t.explainRisk)}
                  className="text-xs bg-white hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-600 font-semibold px-3 py-1.5 rounded-lg transition"
                >
                  {t.explainRisk}
                </button>
                <button
                  disabled={isTyping}
                  onClick={() => handleSuggestQuestion(t.draftEmail)}
                  className="text-xs bg-white hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-600 font-semibold px-3 py-1.5 rounded-lg transition"
                >
                  {t.draftEmail}
                </button>
                <button
                  disabled={isTyping}
                  onClick={() => handleSuggestQuestion(t.recommendAction)}
                  className="text-xs bg-white hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-600 font-semibold px-3 py-1.5 rounded-lg transition"
                >
                  {t.recommendAction}
                </button>
              </div>

              {/* Free-text chat input form */}
              <form onSubmit={handleCustomSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  placeholder={t.askCopilot.replace('{name}', cases[selectedCaseIndex].name)}
                  disabled={isTyping}
                  className="flex-1 bg-white border border-slate-200 hover:border-slate-300 focus:border-[#5254FF] text-sm rounded-xl px-4 py-2.5 outline-none transition disabled:opacity-65"
                />
                <button
                  type="submit"
                  disabled={!customQuestion.trim() || isTyping}
                  className="bg-[#5254FF] hover:bg-[#4345E5] text-white font-bold rounded-xl px-5 py-2.5 text-sm transition flex items-center justify-center gap-1 disabled:opacity-50"
                >
                  <span>{t.send}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
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
                if (onViewChange) onViewChange('dynamic-flow');
              }}
              className="bg-white hover:bg-[#EEF1FF]/30 p-8 rounded-2xl border border-slate-100 hover:border-[#8586FF]/30 transition-all cursor-pointer group flex flex-col justify-between space-y-12"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 group-hover:bg-indigo-100 text-[#5254FF] flex items-center justify-center transition-all">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xl text-slate-900 leading-snug">
                  {t.buildFlowsTitle}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {t.buildFlowsDesc}
                </p>
              </div>
              <span className="text-xs font-semibold text-[#5254FF] flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                <span>{t.exploreFlowEditor}</span>
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
                  {t.buildCaseTitle}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {t.buildCaseDesc}
                </p>
              </div>
              <span className="text-xs font-semibold text-violet-600 flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                <span>{t.exploreCases}</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
