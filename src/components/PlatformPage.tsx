/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, ShieldCheck, Split, Sliders, Radio, 
  FolderHeart, Network, Shuffle, Sparkles, Puzzle, FileBadge, 
  ScanLine, ScanEye, Smile, Database, CheckCircle2, Lock, Eye, 
  Settings, Check, HelpCircle, Activity, Play, AlertOctagon, 
  Users, ShieldAlert, Cpu, Layers, RefreshCw, BarChart3, AlertCircle,
  EyeOff, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord, getLocalizedValue } from '../utils/i18nRuntime';
import { platformTranslations } from '../translations/PlatformPageTranslations';

interface PlatformPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}


export default function PlatformPage({ onOpenSandbox, onBackToLanding, onViewChange }: PlatformPageProps) {
  const { language } = useLanguage();
  const platformCopy = getLocalizedRecord(platformTranslations, language as keyof typeof platformTranslations, 'platformTranslations');
  
  const t = (key: keyof typeof platformTranslations.en): string => {
    return getLocalizedValue(platformCopy, key, language, 'platformTranslations');
  };

  const tMetricSecurity = (val: string) => {
    const securityKeys: Record<string, keyof typeof platformTranslations.en> = {
      Basic: 'metricSecurityBasic',
      Robust: 'metricSecurityRobust',
      'High Assurance': 'metricSecurityHighAssurance',
      'Maximum Defenses': 'metricSecurityMaximumDefenses'
    };
    const key = securityKeys[val];
    return key ? t(key) : val;
  };

  const tMetricSpeed = (val: string) => {
    return val
      .replace('seconds', t('metricSeconds'))
      .replace('minutes', t('metricMinutes'));
  };

  // 1. Platform Stack State
  const [activeStackLayer, setActiveStackLayer] = useState<'collect' | 'orchestrate' | 'analyze'>('collect');

  // 2. Interactive Flow Customizer State
  const [requireId, setRequireId] = useState(true);
  const [requireSelfie, setRequireSelfie] = useState(true);
  const [requireDatabase, setRequireDatabase] = useState(true);
  const [requirePassive, setRequirePassive] = useState(false);

  // Dynamic Flow calculation helper
  const calculateMetrics = () => {
    let conversion = 96;
    let security = 'Low';
    let fraudCatch = '62%';
    let speed = '12 seconds';
    let securityScore = 1;

    if (requireId) {
      conversion -= 8;
      securityScore += 2;
      speed = '45 seconds';
    }
    if (requireSelfie) {
      conversion -= 6;
      securityScore += 3;
      if (requireId) speed = '1.2 minutes';
      else speed = '35 seconds';
    }
    if (requireDatabase) {
      conversion -= 3;
      securityScore += 1.5;
    }
    if (requirePassive) {
      conversion -= 1; // Passive doesn't hurt conversion much!
      securityScore += 2.5;
    }

    if (securityScore <= 2) {
      security = 'Basic';
      fraudCatch = '68%';
    } else if (securityScore <= 5) {
      security = 'Robust';
      fraudCatch = '89%';
    } else if (securityScore <= 7.5) {
      security = 'High Assurance';
      fraudCatch = '97.2%';
    } else {
      security = 'Maximum Defenses';
      fraudCatch = '99.9%';
    }

    // Keep conversion bounded
    conversion = Math.max(conversion, 65);

    return { conversion, security, fraudCatch, speed };
  };

  const metrics = calculateMetrics();

  // 3. Interactive Case Desk State
  const [cases, setCases] = useState([
    {
      id: 'CASE-4091',
      name: 'Eleanor Vance',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
      status: 'pending',
      issue: '',
      details: '',
      selfieScore: '',
      watchlist: '',
      docAuthenticity: ''
    },
    {
      id: 'CASE-4092',
      name: 'Marcus Brody',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
      status: 'pending',
      issue: '',
      details: '',
      selfieScore: '',
      watchlist: '',
      docAuthenticity: ''
    },
    {
      id: 'CASE-4093',
      name: 'Sarah Connor',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces',
      status: 'pending',
      issue: '',
      details: '',
      selfieScore: '',
      watchlist: '',
      docAuthenticity: ''
    }
  ]);

  const [selectedCaseId, setSelectedCaseId] = useState('CASE-4091');
  const activeCase = cases.find(c => c.id === selectedCaseId) || cases[0];

  const handleCaseAction = (id: string, action: 'approve' | 'reject') => {
    setCases(prev => prev.map(c => c.id === id ? { ...c, status: action } : c));
  };

  const getCaseDetails = (id: string, defaultText: string) => {
    if (id === 'CASE-4091') return platformCopy.caseEleanorDetails;
    if (id === 'CASE-4092') return platformCopy.caseMarcusDetails;
    if (id === 'CASE-4093') return platformCopy.caseSarahDetails;
    return defaultText;
  };

  const getCaseIssue = (id: string, defaultText: string) => {
    if (id === 'CASE-4091') return platformCopy.caseEleanorIssue;
    if (id === 'CASE-4092') return platformCopy.caseMarcusIssue;
    if (id === 'CASE-4093') return platformCopy.caseSarahIssue;
    return defaultText;
  };

  const getCaseSelfieScore = (id: string, defaultText: string) => {
    if (id === 'CASE-4091') return platformCopy.caseEleanorSelfie;
    if (id === 'CASE-4092') return platformCopy.caseMarcusSelfie;
    if (id === 'CASE-4093') return platformCopy.caseSarahSelfie;
    return defaultText;
  };

  const getCaseWatchlist = (id: string, defaultText: string) => {
    if (id === 'CASE-4091') return platformCopy.caseEleanorWatchlist;
    if (id === 'CASE-4092') return platformCopy.caseMarcusWatchlist;
    if (id === 'CASE-4093') return platformCopy.caseSarahWatchlist;
    return defaultText;
  };

  const getCaseDocAuthenticity = (id: string, defaultText: string) => {
    if (id === 'CASE-4091') return platformCopy.caseEleanorAuthenticity;
    if (id === 'CASE-4092') return platformCopy.caseMarcusAuthenticity;
    if (id === 'CASE-4093') return platformCopy.caseSarahAuthenticity;
    return defaultText;
  };

  // 4. Graph Simulator State
  const [blockedFingeprint, setBlockedFingerprint] = useState(false);
  const [selectedNode, setSelectedNode] = useState<'device' | 'ip' | 'acct1' | 'acct2' | 'acct3' | null>(null);

  // 5. FAQ State
  const [expandedFaq, setExpandedFaq] = useState<string | null>('infra');

  const faqs = [{ id: 'infra' }, { id: 'integration' }, { id: 'routing' }, { id: 'privacy' }];

  const faqList = faqs.map(f => {
    if (f.id === 'infra') return { id: f.id, q: platformCopy.faq1Q, a: platformCopy.faq1A };
    if (f.id === 'integration') return { id: f.id, q: platformCopy.faq2Q, a: platformCopy.faq2A };
    if (f.id === 'routing') return { id: f.id, q: platformCopy.faq3Q, a: platformCopy.faq3A };
    if (f.id === 'privacy') return { id: f.id, q: platformCopy.faq4Q, a: platformCopy.faq4A };
    return { id: f.id, q: platformCopy.faq1Q, a: platformCopy.faq1A };
  });

  return (
    <div id="platform-page-root" className="bg-[#FAFBFD] min-h-screen text-slate-800 antialiased selection:bg-[#354CE1]/10 selection:text-[#354CE1]">
      
      {/* 1. Hero Section */}
      <section id="platform-hero-section" className="relative overflow-hidden pt-20 pb-20 border-b border-slate-100 bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F3F5FF]/40 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#354CE1]/10 text-[#354CE1] text-xs font-semibold tracking-wide">
                <Layers className="w-3.5 h-3.5 text-[#354CE1]" />
                <span>{t('badge')}</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-[#0F1E36] tracking-tight leading-tight">
                {t('heroTitlePrefix')} <br className="hidden md:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#354CE1] via-[#5F3CF3] to-[#00D4B2]">
                  {t('heroTitleGradient')}
                </span>{' '}
                {t('heroTitleSuffix')}
              </h1>
              
              <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
                {t('heroDesc')}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button 
                  id="platform-configure-btn"
                  onClick={onOpenSandbox}
                  className="w-full sm:w-auto text-sm font-semibold text-white bg-black hover:bg-slate-850 px-8 py-4 rounded-full flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition"
                >
                  {t('btnConfigure')}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  id="platform-sandbox-btn"
                  onClick={onOpenSandbox}
                  className="w-full sm:w-auto text-sm font-semibold text-[#354CE1] hover:text-[#2539BE] bg-[#F2F4FF] hover:bg-[#E2E6FF] px-8 py-4 rounded-full transition text-center"
                >
                  {t('btnSandbox')}
                </button>
              </div>

              {/* Trust Badge Grid */}
              <div className="pt-6 border-t border-slate-100 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 text-center lg:text-left">
                <div>
                  <p className="text-2xl font-bold text-slate-900">99.4%</p>
                  <p className="text-xxs text-slate-500 font-medium tracking-wide uppercase">{t('statDecisions')}</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{t('statUnderFiveSeconds')}</p>
                  <p className="text-xxs text-slate-500 font-medium tracking-wide uppercase">{t('statResponse')}</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">190+</p>
                  <p className="text-xxs text-slate-500 font-medium tracking-wide uppercase">{t('statCountries')}</p>
                </div>
              </div>
            </div>

            {/* Right Visual Column (Interactive Stack Explorer Component) */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-800 text-slate-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-xxs font-mono text-slate-500 uppercase tracking-widest">
                    {t('stackExplorerTitle')}
                  </span>
                </div>

                <p className="text-xs text-slate-400 mb-6 font-sans">
                  {t('stackExplorerDesc')}
                </p>

                {/* Stack Layers */}
                <div className="space-y-3 font-mono">
                  
                  {/* Layer 3: Investigate & Analyze */}
                  <button 
                    onClick={() => setActiveStackLayer('analyze')}
                    className={`w-full text-left p-4 rounded-xl border transition flex items-start gap-4 ${
                      activeStackLayer === 'analyze'
                        ? 'bg-[#354CE1]/15 border-[#354CE1] text-white shadow-md'
                        : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 text-slate-400'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${activeStackLayer === 'analyze' ? 'bg-[#354CE1]/30 text-indigo-300' : 'bg-slate-800 text-slate-500'}`}>
                      <Network className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-200">{t('layer3Title')}</span>
                        {activeStackLayer === 'analyze' && <span className="bg-green-500/20 text-green-400 text-[9px] px-1.5 py-0.5 rounded font-bold">{t('active')}</span>}
                      </div>
                      <p className="text-xxs mt-0.5 text-slate-400 font-sans">{t('layer3Desc')}</p>
                    </div>
                  </button>

                  {/* Layer 2: Orchestrate & Automate */}
                  <button 
                    onClick={() => setActiveStackLayer('orchestrate')}
                    className={`w-full text-left p-4 rounded-xl border transition flex items-start gap-4 ${
                      activeStackLayer === 'orchestrate'
                        ? 'bg-[#354CE1]/15 border-[#354CE1] text-white shadow-md'
                        : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 text-slate-400'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${activeStackLayer === 'orchestrate' ? 'bg-[#354CE1]/30 text-indigo-300' : 'bg-slate-800 text-slate-500'}`}>
                      <Shuffle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-200">{t('layer2Title')}</span>
                        {activeStackLayer === 'orchestrate' && <span className="bg-green-500/20 text-green-400 text-[9px] px-1.5 py-0.5 rounded font-bold">{t('active')}</span>}
                      </div>
                      <p className="text-xxs mt-0.5 text-slate-400 font-sans">{t('layer2Desc')}</p>
                    </div>
                  </button>

                  {/* Layer 1: Collect & Verify */}
                  <button 
                    onClick={() => setActiveStackLayer('collect')}
                    className={`w-full text-left p-4 rounded-xl border transition flex items-start gap-4 ${
                      activeStackLayer === 'collect'
                        ? 'bg-[#354CE1]/15 border-[#354CE1] text-white shadow-md'
                        : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 text-slate-400'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${activeStackLayer === 'collect' ? 'bg-[#354CE1]/30 text-indigo-300' : 'bg-slate-800 text-slate-500'}`}>
                      <Split className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-200">{t('layer1Title')}</span>
                        {activeStackLayer === 'collect' && <span className="bg-green-500/20 text-green-400 text-[9px] px-1.5 py-0.5 rounded font-bold">{t('active')}</span>}
                      </div>
                      <p className="text-xxs mt-0.5 text-slate-400 font-sans">{t('layer1Desc')}</p>
                    </div>
                  </button>

                </div>

                {/* Selected Stack Details Panel */}
                <div className="mt-6 p-4 rounded-2xl bg-slate-950 border border-slate-800/80">
                  <AnimatePresence mode="wait">
                    {activeStackLayer === 'collect' && (
                      <motion.div 
                        key="collect-details"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="space-y-2 text-xs"
                      >
                        <h4 className="font-bold text-[#6366F1] flex items-center gap-1">
                          <Smile className="w-3.5 h-3.5" />
                          {t('layer1DetailTitle')}
                        </h4>
                        <p className="text-[11px] text-slate-400 leading-normal font-sans">
                          {t('layer1DetailDesc')}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1.5 font-mono text-[9px]">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">{t('tagDynamicFlow')}</span>
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">{t('tagDatabaseChecks')}</span>
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">{t('tagNfcScans')}</span>
                        </div>
                      </motion.div>
                    )}

                    {activeStackLayer === 'orchestrate' && (
                      <motion.div 
                        key="orchestrate-details"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="space-y-2 text-xs"
                      >
                        <h4 className="font-bold text-indigo-400 flex items-center gap-1">
                          <Cpu className="w-3.5 h-3.5" />
                          {t('layer2DetailTitle')}
                        </h4>
                        <p className="text-[11px] text-slate-400 leading-normal font-sans">
                          {t('layer2DetailDesc')}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1.5 font-mono text-[9px]">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">{t('tagWorkflows')}</span>
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">{t('tagCases')}</span>
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">{t('tagMarketplaceApis')}</span>
                        </div>
                      </motion.div>
                    )}

                    {activeStackLayer === 'analyze' && (
                      <motion.div 
                        key="analyze-details"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="space-y-2 text-xs"
                      >
                        <h4 className="font-bold text-teal-400 flex items-center gap-1">
                          <ShieldAlert className="w-3.5 h-3.5" />
                          {t('layer3DetailTitle')}
                        </h4>
                        <p className="text-[11px] text-slate-400 leading-normal font-sans">
                          {t('layer3DetailDesc')}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1.5 font-mono text-[9px]">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">{t('tagLinkGraph')}</span>
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">{t('tagDeviceIntel')}</span>
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">{t('tagFuzzySearch')}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Interactive Flow Customizer Section */}
      <section id="platform-customizer-section" className="py-24 border-b border-slate-100 bg-[#F8F9FC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              {t('customizerTitle')}
            </h2>
            <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed">
              {t('customizerDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Controls Column (Interactive Inputs) */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 pb-3 border-b border-slate-100">
                  <Sliders className="w-4.5 h-4.5 text-[#354CE1]" />
                  {t('flowConfigTitle')}
                </h3>

                <div className="space-y-4">
                  
                  {/* Toggle 1: Government ID */}
                  <label className="flex items-start justify-between p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <input 
                          type="checkbox" 
                          checked={requireId} 
                          onChange={(e) => setRequireId(e.target.checked)}
                          className="w-4.5 h-4.5 rounded text-[#354CE1] border-slate-300 focus:ring-[#354CE1]"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-950">{t('verifyGovId')}</p>
                        <p className="text-xxs text-slate-500 mt-0.5 leading-relaxed">{t('verifyGovIdDesc')}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#354CE1] bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wide">{t('frictionHigh')}</span>
                  </label>

                  {/* Toggle 2: Selfie Biometrics */}
                  <label className="flex items-start justify-between p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <input 
                          type="checkbox" 
                          checked={requireSelfie} 
                          onChange={(e) => setRequireSelfie(e.target.checked)}
                          className="w-4.5 h-4.5 rounded text-[#354CE1] border-slate-300 focus:ring-[#354CE1]"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-950">{t('verifySelfie')}</p>
                        <p className="text-xxs text-slate-500 mt-0.5 leading-relaxed">{t('verifySelfieDesc')}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#354CE1] bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wide">{t('frictionHigh')}</span>
                  </label>

                  {/* Toggle 3: Global Databases */}
                  <label className="flex items-start justify-between p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <input 
                          type="checkbox" 
                          checked={requireDatabase} 
                          onChange={(e) => setRequireDatabase(e.target.checked)}
                          className="w-4.5 h-4.5 rounded text-[#354CE1] border-slate-300 focus:ring-[#354CE1]"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-950">{t('verifyDatabase')}</p>
                        <p className="text-xxs text-slate-500 mt-0.5 leading-relaxed">{t('verifyDatabaseDesc')}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded uppercase tracking-wide">{t('frictionLow')}</span>
                  </label>

                  {/* Toggle 4: Passive Signals */}
                  <label className="flex items-start justify-between p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <input 
                          type="checkbox" 
                          checked={requirePassive} 
                          onChange={(e) => setRequirePassive(e.target.checked)}
                          className="w-4.5 h-4.5 rounded text-[#354CE1] border-slate-300 focus:ring-[#354CE1]"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-950">{t('verifyPassive')}</p>
                        <p className="text-xxs text-slate-500 mt-0.5 leading-relaxed">{t('verifyPassiveDesc')}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded uppercase tracking-wide">{t('frictionNone')}</span>
                  </label>

                </div>
              </div>

              {/* Static Callout */}
              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  <strong>{t('proTip')}</strong> {t('proTipText')}
                </p>
              </div>
            </div>

            {/* Right Live-Calculated Dashboard Display */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              
              {/* Box 1: Performance Outputs */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">{t('analyticsTitle')}</h4>
                  
                  <div className="space-y-6">
                    {/* Gauge 1: Conversion */}
                    <div>
                      <div className="flex justify-between items-center text-xs font-bold text-slate-900 mb-2">
                        <span>{t('expectedConversion')}</span>
                        <span className="text-lg font-mono text-[#354CE1]">{metrics.conversion}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#354CE1] to-blue-400 transition-all duration-500"
                          style={{ width: `${metrics.conversion}%` }}
                        />
                      </div>
                    </div>

                    {/* Gauge 2: Fraud Catch */}
                    <div>
                      <div className="flex justify-between items-center text-xs font-bold text-slate-900 mb-2">
                        <span>{t('fraudPrevention')}</span>
                        <span className="text-lg font-mono text-teal-600">{metrics.fraudCatch}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-500"
                          style={{ width: metrics.fraudCatch }}
                        />
                      </div>
                    </div>

                    {/* Extra values */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 font-sans">
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{t('assuranceRank')}</p>
                        <p className="text-sm font-bold text-slate-900 mt-1 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          {tMetricSecurity(metrics.security)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{t('avgSpeed')}</p>
                        <p className="text-sm font-bold text-slate-900 mt-1 flex items-center gap-1">
                          <Activity className="w-4 h-4 text-slate-500" />
                          {tMetricSpeed(metrics.speed)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <button 
                    onClick={onOpenSandbox}
                    className="w-full bg-[#354CE1] hover:bg-[#2539BE] text-white text-xs font-semibold py-3 rounded-xl transition flex items-center justify-center gap-1"
                  >
                    {t('testLiveSandbox')}
                    <Play className="w-3.5 h-3.5 fill-white" />
                  </button>
                </div>
              </div>

              {/* Box 2: Visual Wireframe Simulation */}
              <div className="bg-slate-950 rounded-3xl p-6 shadow-xl border border-slate-800 text-white flex flex-col justify-between">
                <div>
                  <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-4 pb-2 border-b border-slate-800/80">
                    {t('wireframeTitle')}
                  </h4>

                  <div className="space-y-3 font-mono text-[10px] text-slate-300">
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        {t('initOnboardingFlow')}
                      </span>
                      <span className="text-slate-500 text-[8px]">{t('flowsEndpoint')}</span>
                    </div>

                    {/* Step Government ID */}
                    {requireId ? (
                      <div className="p-3 rounded-lg bg-[#354CE1]/10 border border-[#354CE1]/40 flex items-center justify-between animate-in fade-in duration-300">
                        <span className="flex items-center gap-2">
                          <FileBadge className="w-3.5 h-3.5 text-indigo-400" />
                          {t('stepGovId')}
                        </span>
                        <span className="text-slate-400 font-bold text-[8px] bg-indigo-900/40 px-1 py-0.5 rounded">{t('moduleIdv')}</span>
                      </div>
                    ) : (
                      <div className="p-3 rounded-lg bg-slate-900/30 border border-slate-800/40 text-slate-500 line-through">
                        <span>{t('stepSkipGovId')}</span>
                      </div>
                    )}

                    {/* Step Selfie Biometrics */}
                    {requireSelfie ? (
                      <div className="p-3 rounded-lg bg-[#354CE1]/10 border border-[#354CE1]/40 flex items-center justify-between animate-in fade-in duration-300">
                        <span className="flex items-center gap-2">
                          <ScanEye className="w-3.5 h-3.5 text-indigo-400" />
                          {t('stepSelfie')}
                        </span>
                        <span className="text-slate-400 font-bold text-[8px] bg-indigo-900/40 px-1 py-0.5 rounded">{t('moduleBioLiveness')}</span>
                      </div>
                    ) : (
                      <div className="p-3 rounded-lg bg-slate-900/30 border border-slate-800/40 text-slate-500 line-through">
                        <span>{t('stepSkipSelfie')}</span>
                      </div>
                    )}

                    {/* Step Global Databases */}
                    {requireDatabase ? (
                      <div className="p-3 rounded-lg bg-[#354CE1]/10 border border-[#354CE1]/40 flex items-center justify-between animate-in fade-in duration-300">
                        <span className="flex items-center gap-2">
                          <Database className="w-3.5 h-3.5 text-indigo-400" />
                          {t('stepDatabase')}
                        </span>
                        <span className="text-slate-400 font-bold text-[8px] bg-indigo-900/40 px-1 py-0.5 rounded">{t('moduleDatabaseKyc')}</span>
                      </div>
                    ) : (
                      <div className="p-3 rounded-lg bg-slate-900/30 border border-slate-800/40 text-slate-500 line-through">
                        <span>{t('stepSkipDatabase')}</span>
                      </div>
                    )}

                    {/* Passive Signals */}
                    {requirePassive ? (
                      <div className="p-3 rounded-lg bg-[#354CE1]/10 border border-[#354CE1]/40 flex items-center justify-between animate-in fade-in duration-300">
                        <span className="flex items-center gap-2">
                          <Radio className="w-3.5 h-3.5 text-indigo-400" />
                          {t('stepPassive')}
                        </span>
                        <span className="text-slate-400 font-bold text-[8px] bg-indigo-900/40 px-1 py-0.5 rounded">{t('modulePassiveRisk')}</span>
                      </div>
                    ) : (
                      <div className="p-3 rounded-lg bg-slate-900/30 border border-slate-800/40 text-slate-500">
                        <span>{t('passiveDisabled')}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 text-center">
                  <span className="text-[9px] font-mono text-slate-500">
                    {t('statusReadyConfig')}
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. Layer 2 Deep-Dive: Workflows & Case Review Dashboard */}
      <section id="platform-workflows-section" className="py-24 border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-[#354CE1] font-semibold text-xs tracking-wider uppercase">
                <Shuffle className="w-3.5 h-3.5" />
                <span>{t('caseIntroBadge')}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight leading-snug">
                {t('caseSectionTitle')}
              </h2>
              <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed">
                {t('caseSectionDesc')}
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl border border-slate-100 bg-[#FAFBFD] space-y-2">
                  <div className="p-2 w-8 h-8 rounded-lg bg-indigo-50 text-[#354CE1] flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-xs text-slate-950">{t('caseAutoDecision')}</h4>
                  <p className="text-xxs text-slate-500 leading-normal">{t('caseAutoDecisionDesc')}</p>
                </div>

                <div className="p-5 rounded-2xl border border-slate-100 bg-[#FAFBFD] space-y-2">
                  <div className="p-2 w-8 h-8 rounded-lg bg-indigo-50 text-[#354CE1] flex items-center justify-center">
                    <FolderHeart className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-xs text-slate-950">{t('caseIntelligentQueues')}</h4>
                  <p className="text-xxs text-slate-500 leading-normal">{t('caseIntelligentQueuesDesc')}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Core Feature: Interactive Case Review Desk Simulator */}
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 text-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-4 mb-6 gap-3">
              <div>
                <span className="text-xxs font-mono text-indigo-400 font-bold uppercase tracking-wider block">{t('caseDeskSimulator')}</span>
                <h3 className="text-lg font-bold text-slate-100">{t('caseDeskTitle')}</h3>
              </div>
              
              <div className="flex gap-2">
                <div className="text-[10px] font-mono px-2.5 py-1 bg-slate-800 rounded border border-slate-700/60 text-slate-300">
                  {t('caseDeskTotalQueued').replace('3', cases.length.toString())}
                </div>
                <div className="text-[10px] font-mono px-2.5 py-1 bg-green-950 text-green-400 rounded border border-green-900/60 font-bold">
                  {t('caseDeskHealth')}
                </div>
              </div>
            </div>

            {/* Simulated Case Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Cases Sidebar List (col-span-4) */}
              <div className="lg:col-span-4 space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
                {cases.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCaseId(c.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition flex items-center justify-between ${
                      selectedCaseId === c.id 
                        ? 'bg-[#354CE1]/15 border-[#354CE1] text-white' 
                        : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-full border border-slate-700 object-cover" />
                      <div>
                        <p className="text-xs font-bold text-slate-100">{c.name}</p>
                        <p className="text-[9px] font-mono text-slate-400 mt-0.5">{c.id} &bull; {getCaseIssue(c.id, c.issue)}</p>
                      </div>
                    </div>

                    <div>
                      {c.status === 'approve' ? (
                        <span className="bg-green-500/20 text-green-400 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">{t('caseSidebarApproved')}</span>
                      ) : c.status === 'reject' ? (
                        <span className="bg-red-500/20 text-red-400 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">{t('caseSidebarRejected')}</span>
                      ) : (
                        <span className="bg-yellow-500/20 text-yellow-400 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">{t('caseSidebarReview')}</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Active Case Detail (col-span-8) */}
              <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-850 p-6 flex flex-col justify-between min-h-[380px]">
                
                {/* Case Top Info */}
                <div>
                  <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4">
                    <div className="flex items-center gap-3">
                      <img src={activeCase.avatar} alt={activeCase.name} className="w-12 h-12 rounded-full border border-slate-800 object-cover" />
                      <div>
                        <h4 className="text-sm font-bold text-slate-100">{activeCase.name}</h4>
                        <p className="text-[10px] font-mono text-slate-400">{t('caseDetailsTitle')}</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-[#354CE1] bg-[#354CE1]/10 px-2.5 py-1 rounded-full border border-[#354CE1]/20 font-semibold">
                      {activeCase.id}
                    </span>
                  </div>

                  {/* Case Verification Signal Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 font-mono text-[10px]">
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-850">
                      <p className="text-slate-500">{t('caseDocAi')}</p>
                      <p className="font-bold text-slate-200 mt-1">{getCaseDocAuthenticity(activeCase.id, activeCase.docAuthenticity)}</p>
                    </div>
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-850">
                      <p className="text-slate-500">{t('caseSelfieMatch')}</p>
                      <p className={`font-bold mt-1 ${activeCase.id === 'CASE-4092' ? 'text-red-400' : 'text-slate-200'}`}>
                        {getCaseSelfieScore(activeCase.id, activeCase.selfieScore)}
                      </p>
                    </div>
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-850">
                      <p className="text-slate-500">{t('caseWatchlist')}</p>
                      <p className={`font-bold mt-1 ${activeCase.id === 'CASE-4093' ? 'text-yellow-400' : 'text-slate-200'}`}>
                        {getCaseWatchlist(activeCase.id, activeCase.watchlist)}
                      </p>
                    </div>
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-850">
                      <p className="text-slate-500">{t('caseTrigger')}</p>
                      <p className="font-bold text-indigo-400 mt-1">{getCaseIssue(activeCase.id, activeCase.issue)}</p>
                    </div>
                  </div>

                  {/* Case Investigation Narrative */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-850 space-y-1">
                    <p className="text-[10px] font-mono text-indigo-300 font-bold uppercase flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {t('caseAnomaliesTitle')}
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans mt-1">
                      {getCaseDetails(activeCase.id, activeCase.details)}
                    </p>
                  </div>
                </div>

                {/* Case Actions bar */}
                <div className="pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
                  <div className="text-[10.5px] text-slate-400 font-sans">
                    {activeCase.status === 'approve' ? (
                      <span className="text-green-400 font-bold flex items-center gap-1.5 font-mono text-[9px]">
                        <Check className="w-4.5 h-4.5" /> {t('caseActionsBannerApprove')}
                      </span>
                    ) : activeCase.status === 'reject' ? (
                      <span className="text-red-400 font-bold flex items-center gap-1.5 font-mono text-[9px]">
                        <AlertOctagon className="w-4.5 h-4.5" /> {t('caseActionsBannerReject')}
                      </span>
                    ) : (
                      <span>{t('caseActionsBannerPending')}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    <button
                      disabled={activeCase.status !== 'pending'}
                      onClick={() => handleCaseAction(activeCase.id, 'reject')}
                      className={`w-full sm:w-auto px-4.5 py-2 rounded-lg text-xs font-semibold transition ${
                        activeCase.status !== 'pending'
                          ? 'bg-slate-900 text-slate-600 border border-slate-850 cursor-not-allowed'
                          : 'border border-red-500/30 text-red-400 bg-red-950/20 hover:bg-red-950/40'
                      }`}
                    >
                      {t('btnReject')}
                    </button>
                    <button
                      disabled={activeCase.status !== 'pending'}
                      onClick={() => handleCaseAction(activeCase.id, 'approve')}
                      className={`w-full sm:w-auto px-5 py-2 rounded-lg text-xs font-semibold transition ${
                        activeCase.status !== 'pending'
                          ? 'bg-slate-900 text-slate-600 border border-slate-850 cursor-not-allowed'
                          : 'bg-green-600 hover:bg-green-500 text-white shadow'
                      }`}
                    >
                      {t('btnApprove')}
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 4. Layer 3 Deep-Dive: Investigate & Prevent (Graph Link Analysis) */}
      <section id="platform-graph-section" className="py-24 border-b border-slate-100 bg-[#FAFBFD]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            
            {/* Left Graphics */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span className="text-[10px] font-mono text-red-500 font-bold uppercase">{t('graphAlertTitle')}</span>
                </div>

                <div className="border-b border-slate-100 pb-3 mb-6">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('graphTitle')}</h4>
                  <p className="text-xxs text-slate-500 mt-0.5">{t('graphDesc')}</p>
                </div>

                {/* Simulated Graph Workspace */}
                <div className="relative bg-slate-950 h-72 rounded-2xl border border-slate-900 overflow-hidden flex items-center justify-center">
                  
                  {/* Absolute connections (SVG Lines) */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true">
                    {/* Line center -> Top Left */}
                    <line x1="50%" y1="50%" x2="25%" y2="25%" stroke={blockedFingeprint ? "#ef4444" : "#4f46e5"} strokeWidth="2" strokeDasharray="3" />
                    {/* Line center -> Top Right */}
                    <line x1="50%" y1="50%" x2="75%" y2="25%" stroke={blockedFingeprint ? "#ef4444" : "#4f46e5"} strokeWidth="2" strokeDasharray="3" />
                    {/* Line center -> Bottom */}
                    <line x1="50%" y1="50%" x2="50%" y2="80%" stroke={blockedFingeprint ? "#ef4444" : "#4f46e5"} strokeWidth="2" strokeDasharray="3" />
                  </svg>

                  {/* Graph Nodes */}
                  <div className="relative w-full h-full flex items-center justify-center z-10">
                    
                    {/* CENTER NODE: Shared Device Fingerprint */}
                    <button 
                      onClick={() => setSelectedNode('device')}
                      className={`absolute p-3 rounded-full border transition-all ${
                        selectedNode === 'device' ? 'scale-110 ring-4 ring-[#354CE1]/30' : ''
                      } ${
                        blockedFingeprint 
                          ? 'bg-red-950/60 border-red-500 text-red-400' 
                          : 'bg-indigo-950 text-indigo-300 border-indigo-500'
                      }`}
                    >
                      <Radio className="w-6 h-6" />
                      <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap text-[9px] font-mono font-bold bg-slate-900/90 text-slate-300 px-1.5 py-0.5 rounded border border-slate-800">
                        {t('graphDeviceFingerprint')}
                      </span>
                    </button>

                    {/* NODE Top Left: Eleanor Vance */}
                    <button 
                      onClick={() => setSelectedNode('acct1')}
                      className={`absolute top-12 left-20 p-2 rounded-xl border bg-slate-900 border-slate-800 transition ${
                        selectedNode === 'acct1' ? 'scale-110 border-[#354CE1]' : ''
                      } ${blockedFingeprint ? 'border-red-500/40 text-red-400' : ''}`}
                    >
                      <Users className="w-4.5 h-4.5 mx-auto" />
                      <span className="text-[8.5px] block font-mono mt-0.5">{t('graphNodeEvVance')}</span>
                    </button>

                    {/* NODE Top Right: Eleanor Smith */}
                    <button 
                      onClick={() => setSelectedNode('acct2')}
                      className={`absolute top-12 right-20 p-2 rounded-xl border bg-slate-900 border-slate-800 transition ${
                        selectedNode === 'acct2' ? 'scale-110 border-[#354CE1]' : ''
                      } ${blockedFingeprint ? 'border-red-500/40 text-red-400' : ''}`}
                    >
                      <Users className="w-4.5 h-4.5 mx-auto" />
                      <span className="text-[8.5px] block font-mono mt-0.5">{t('graphNodeElSmith')}</span>
                    </button>

                    {/* NODE Bottom: Robert Vance */}
                    <button 
                      onClick={() => setSelectedNode('acct3')}
                      className={`absolute bottom-12 p-2 rounded-xl border bg-slate-900 border-slate-800 transition ${
                        selectedNode === 'acct3' ? 'scale-110 border-[#354CE1]' : ''
                      } ${blockedFingeprint ? 'border-red-500/40 text-red-400' : ''}`}
                    >
                      <Users className="w-4.5 h-4.5 mx-auto" />
                      <span className="text-[8.5px] block font-mono mt-0.5">{t('graphNodeRobVance')}</span>
                    </button>

                  </div>

                </div>

                {/* Graph Action Console */}
                <div className="mt-4 p-4 rounded-xl bg-slate-950 text-slate-300 border border-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-0.5 text-left">
                    <p className="text-[10px] font-mono text-slate-500">{t('graphMetadataTitle')}</p>
                    <p className="text-xs font-sans text-slate-300 font-semibold">
                      {selectedNode === 'device' ? (
                        <span>{t('graphDeviceSelected')}</span>
                      ) : selectedNode === 'acct1' ? (
                        <span>{t('graphNode1Selected')}</span>
                      ) : selectedNode === 'acct2' ? (
                        <span>{t('graphNode2Selected')}</span>
                      ) : selectedNode === 'acct3' ? (
                        <span>{t('graphNode3Selected')}</span>
                      ) : (
                        <span>{t('graphDefaultSelected')}</span>
                      )}
                    </p>
                  </div>

                  <button
                    onClick={() => setBlockedFingerprint(prev => !prev)}
                    className={`w-full sm:w-auto px-4 py-2 rounded-lg text-xxs font-mono font-bold tracking-wider uppercase transition ${
                      blockedFingeprint 
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-900' 
                        : 'bg-red-600 hover:bg-red-500 text-white shadow'
                    }`}
                  >
                    {blockedFingeprint ? t('btnRestoreFingerprint') : t('btnSuspendRing')}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Copy Column */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="inline-flex items-center gap-1.5 text-teal-600 font-semibold text-xs tracking-wider uppercase">
                <Network className="w-3.5 h-3.5" />
                <span>{t('graphBadge')}</span>
              </div>
              
              <h3 className="text-3xl font-display font-bold text-slate-900 tracking-tight leading-snug">
                {t('graphSectionTitle')}
              </h3>

              <p className="text-slate-600 font-sans text-sm leading-relaxed">
                {t('graphSectionDesc1')}
              </p>

              <p className="text-slate-600 font-sans text-sm leading-relaxed">
                {t('graphSectionDesc2')}
              </p>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-4 text-xs font-semibold text-[#354CE1]">
                <button 
                  onClick={onOpenSandbox} 
                  className="hover:underline flex items-center gap-1"
                >
                  {t('btnConfigGraphSignals')}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Enterprise-Grade Security & Trust Metrics */}
      <section id="platform-trust-section" className="py-20 border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[10px] font-bold text-[#354CE1] uppercase tracking-widest mb-4">{t('trustBadge')}</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight mb-12">
            {t('trustTitle')}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-stretch">
            
            <div className="p-6 rounded-2xl border border-slate-100 bg-[#FAFBFD] flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-[#354CE1] flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-950">{t('trustCard1Title')}</h4>
                <p className="text-xxs text-slate-500 leading-relaxed font-sans">{t('trustCard1Desc')}</p>
              </div>
              <span className="text-[9px] font-mono text-slate-400 mt-4 block">{t('trustCard1Footer')}</span>
            </div>

            <div className="p-6 rounded-2xl border border-slate-100 bg-[#FAFBFD] flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-[#354CE1] flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-950">{t('trustCard2Title')}</h4>
                <p className="text-xxs text-slate-500 leading-relaxed font-sans">{t('trustCard2Desc')}</p>
              </div>
              <span className="text-[9px] font-mono text-slate-400 mt-4 block">{t('trustCard2Footer')}</span>
            </div>

            <div className="p-6 rounded-2xl border border-slate-100 bg-[#FAFBFD] flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-[#354CE1] flex items-center justify-center mx-auto mb-4">
                  <EyeOff className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-950">{t('trustCard3Title')}</h4>
                <p className="text-xxs text-slate-500 leading-relaxed font-sans">{t('trustCard3Desc')}</p>
              </div>
              <span className="text-[9px] font-mono text-slate-400 mt-4 block">{t('trustCard3Footer')}</span>
            </div>

            <div className="p-6 rounded-2xl border border-slate-100 bg-[#FAFBFD] flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-[#354CE1] flex items-center justify-center mx-auto mb-4">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-950">{t('trustCard4Title')}</h4>
                <p className="text-xxs text-slate-500 leading-relaxed font-sans">{t('trustCard4Desc')}</p>
              </div>
              <span className="text-[9px] font-mono text-slate-400 mt-4 block">{t('trustCard4Footer')}</span>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Platform FAQ Accordion Section */}
      <section id="platform-faqs-section" className="py-24 bg-[#F8F9FC] border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-display font-bold text-slate-900 tracking-tight">{t('faqTitle')}</h2>
            <p className="text-slate-600 font-sans text-sm">{t('faqDesc')}</p>
          </div>

          <div className="space-y-3">
            {faqList.map((f) => {
              const isOpen = expandedFaq === f.id;
              return (
                <div 
                  key={f.id}
                  className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm text-left"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : f.id)}
                    className="w-full text-left p-5 flex items-center justify-between font-sans transition hover:bg-slate-50"
                  >
                    <span className="text-xs sm:text-sm font-bold text-slate-950 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#354CE1] shrink-0" />
                      {f.q}
                    </span>
                    <span className={`p-1 rounded-full bg-slate-100 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-5 pt-0 border-t border-slate-100 text-xs text-slate-600 leading-relaxed font-sans">
                          {f.a}
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

      {/* 7. Bottom Contact Call to Action */}
      <section id="platform-cta-section" className="py-24 bg-[#354CE1] text-white text-center relative overflow-hidden">
        {/* Abstract vector shape styling */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-700/40 to-blue-600/30 opacity-60 pointer-events-none" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight">
            {t('ctaTitle')}
          </h2>
          <p className="text-indigo-100 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {t('ctaDesc')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-md mx-auto">
            <button 
              id="platform-cta-free-btn"
              onClick={onOpenSandbox}
              className="w-full sm:w-auto text-sm font-semibold text-slate-950 bg-white hover:bg-slate-100 px-8 py-4 rounded-full shadow-lg transition"
            >
              {t('ctaBtnFree')}
            </button>
            <button 
              id="platform-cta-home-btn"
              onClick={onBackToLanding}
              className="w-full sm:w-auto text-sm font-semibold text-white border border-indigo-300 hover:bg-white/10 px-8 py-4 rounded-full transition"
            >
              {t('ctaBtnHome')}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
