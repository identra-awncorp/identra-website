/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState } from 'react';
import { 
  ShieldCheck, ArrowRight, Check, ArrowLeft, RefreshCw, 
  Layers, CheckCircle2, Users, Search, AlertCircle, Shield, 
  FileText, Database, Workflow, CheckSquare, Sparkles, 
  Building2, Eye, Lock, Globe, Scale, Sliders, Play, 
  Settings, ClipboardCheck, ArrowUpRight, TrendingUp, AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import {
  COMPLIANCE_TRANSLATIONS,
  COMPLIANCE_RULE_TRANSLATIONS,
  COMPLIANCE_APPLICANT_TRANSLATIONS,
  COMPLIANCE_PILLARS,
  COMPLIANCE_TRUSTED_LOGOS,
  COMPLIANCE_PREVIEW,
  COMPLIANCE_FEATURES
} from '../translations/CompliancePageTranslations';

interface CompliancePageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

interface ComplianceRule {
  id: string;
  category: 'collection' | 'verification' | 'screening';
  enabled: boolean;
  requiredFor: 'all' | 'high-risk' | 'custom';
}

interface MockApplicant {
  id: string;
  countryCode: string;
  type: 'Individual' | 'Corporate';
  riskProfile: 'Low' | 'Medium' | 'High';
  idPhotoUrl: string;
  selfieUrl: string;
  ocrMatch: boolean;
  watchlistMatch: boolean;
  phoneRisk: 'Low' | 'Medium' | 'High';
  documentExpiryOk: boolean;
}

type ComplianceStepId =
  | 'gov-id'
  | 'selfie-liveness'
  | 'ocr-crosscheck'
  | 'phone-risk'
  | 'watchlist-screening'
  | 'continuous-monitor';
type ComplianceStepStatus = 'pending' | 'success' | 'failed' | 'warning';
type ComplianceSimStep = { id: ComplianceStepId; status: ComplianceStepStatus };
type ComplianceLogEntry = { id: ComplianceStepId; applicantId: string };

const INITIAL_RULES: ComplianceRule[] = [
  { id: 'gov-id', category: 'collection', enabled: true, requiredFor: 'all' },
  { id: 'selfie-liveness', category: 'verification', enabled: true, requiredFor: 'all' },
  { id: 'ocr-crosscheck', category: 'verification', enabled: true, requiredFor: 'all' },
  { id: 'watchlist-screening', category: 'screening', enabled: true, requiredFor: 'all' },
  { id: 'phone-risk', category: 'screening', enabled: false, requiredFor: 'high-risk' },
  { id: 'continuous-monitor', category: 'screening', enabled: false, requiredFor: 'high-risk' },
];

const MOCK_APPLICANTS: MockApplicant[] = [
  {
    id: 'app-01',
    countryCode: 'US',
    type: 'Individual',
    riskProfile: 'Low',
    idPhotoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120',
    selfieUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120',
    ocrMatch: true,
    watchlistMatch: false,
    phoneRisk: 'Low',
    documentExpiryOk: true
  },
  {
    id: 'app-02',
    countryCode: 'GB',
    type: 'Individual',
    riskProfile: 'Medium',
    idPhotoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120',
    selfieUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120',
    ocrMatch: true,
    watchlistMatch: true,
    phoneRisk: 'Low',
    documentExpiryOk: true
  },
  {
    id: 'app-03',
    countryCode: 'CY',
    type: 'Individual',
    riskProfile: 'High',
    idPhotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120',
    selfieUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120',
    ocrMatch: false,
    watchlistMatch: true,
    phoneRisk: 'High',
    documentExpiryOk: false
  }
];

export default function CompliancePage({ onOpenSandbox, onBackToLanding, onViewChange }: CompliancePageProps) {
  const { language } = useLanguage();
  const lang = language as keyof typeof COMPLIANCE_TRANSLATIONS;
  const t = COMPLIANCE_TRANSLATIONS[lang];
  const ruleText = COMPLIANCE_RULE_TRANSLATIONS[lang];
  const applicantText = COMPLIANCE_APPLICANT_TRANSLATIONS[lang];
  const pillarText = COMPLIANCE_PILLARS[lang];
  const trustedLogos = COMPLIANCE_TRUSTED_LOGOS[lang];
  const previewText = COMPLIANCE_PREVIEW[lang];
  const featureText = COMPLIANCE_FEATURES[lang];

  const formatText = (template: string, values: Record<string, string>) =>
    Object.entries(values).reduce((text, [key, value]) => text.replace(`{${key}}`, value), template);

  const getRiskLabel = (risk: 'Low' | 'Medium' | 'High') => {
    if (risk === 'Low') return t.low;
    if (risk === 'Medium') return t.medium;
    return t.high;
  };

  const getStatusLabel = (status: 'pending' | 'success' | 'failed' | 'warning') => {
    if (status === 'success') return t.statusSuccess;
    if (status === 'warning') return t.statusWarning;
    if (status === 'failed') return t.statusFailed;
    return t.statusPending;
  };

  const getPresetLabel = (preset: 'standard' | 'strict' | 'custom') => {
    if (preset === 'standard') return t.presetStandard;
    if (preset === 'strict') return t.presetStrict;
    return t.presetCustom;
  };

  // Policy Config States
  const [rules, setRules] = useState<ComplianceRule[]>(INITIAL_RULES);
  const [selectedPreset, setSelectedPreset] = useState<'standard' | 'strict' | 'custom'>('standard');
  
  // Simulation States
  const [currentApplicantIdx, setCurrentApplicantIdx] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simSteps, setSimSteps] = useState<ComplianceSimStep[]>([]);
  const [activeStepIdx, setActiveStepIdx] = useState(-1);
  const [simLogEntries, setSimLogEntries] = useState<ComplianceLogEntry[]>([]);
  const [simulationResult, setSimulationResult] = useState<'approved' | 'review' | 'declined' | null>(null);

  // Tabs for Pillars Section
  const [activePillar, setActivePillar] = useState<number>(0);

  // Demo Lead Form States
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const getStepLabel = (stepId: ComplianceStepId) => {
    if (stepId === 'gov-id') return t.stepGovId;
    if (stepId === 'selfie-liveness') return t.stepSelfie;
    if (stepId === 'ocr-crosscheck') return t.stepOcr;
    if (stepId === 'phone-risk') return t.stepPhone;
    if (stepId === 'watchlist-screening') return t.stepWatchlist;
    return t.stepMonitor;
  };

  const formatSimLog = (entry: ComplianceLogEntry) => {
    const applicant = MOCK_APPLICANTS.find(item => item.id === entry.applicantId) || MOCK_APPLICANTS[0];
    const localizedApplicant = applicantText[applicant.id as keyof typeof applicantText];

    switch (entry.id) {
      case 'gov-id':
        return applicant.documentExpiryOk
          ? formatText(t.logGovIdSuccess, { countryCode: applicant.countryCode })
          : t.logGovIdExpiry;
      case 'selfie-liveness':
        return t.logBiometrics;
      case 'ocr-crosscheck':
        return applicant.ocrMatch
          ? t.logOcrSuccess
          : formatText(t.logOcrMismatch, {
              extractedName: localizedApplicant.extractedName,
              name: localizedApplicant.name
            });
      case 'phone-risk':
        return applicant.phoneRisk === 'High'
          ? t.logPhoneHigh
          : formatText(t.logPhoneSuccess, { name: localizedApplicant.name });
      case 'watchlist-screening':
        return applicant.watchlistMatch
          ? formatText(t.logScreeningMatch, { details: localizedApplicant.watchlistDetails })
          : formatText(t.logScreeningPass, { name: localizedApplicant.name });
      case 'continuous-monitor':
        return formatText(t.logMonitor, { name: localizedApplicant.name });
    }
  };
  const simLogs = simLogEntries.map(formatSimLog);

  // Apply Rule Presets
  const applyPreset = (preset: 'standard' | 'strict' | 'custom') => {
    setSelectedPreset(preset);
    if (preset === 'standard') {
      setRules(rules.map(r => ({
        ...r,
        enabled: ['gov-id', 'selfie-liveness', 'ocr-crosscheck', 'watchlist-screening'].includes(r.id)
      })));
    } else if (preset === 'strict') {
      setRules(rules.map(r => ({
        ...r,
        enabled: true // Enable all verification layers
      })));
    }
  };

  const toggleRule = (id: string) => {
    setSelectedPreset('custom');
    setRules(rules.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  // Run Onboarding Compliance Check Simulation
  const runSimulation = () => {
    const applicant = MOCK_APPLICANTS[currentApplicantIdx];
    setIsSimulating(true);
    setSimulationResult(null);
    setActiveStepIdx(-1);
    setSimLogEntries([]);
    
    // Prepare dynamic steps based on enabled rules
    const stepsToRun: { id: ComplianceStepId; rulesTriggered: string[] }[] = [];
    
    if (rules.find(r => r.id === 'gov-id')?.enabled) {
      stepsToRun.push({ id: 'gov-id', rulesTriggered: ['gov-id'] });
    }
    if (rules.find(r => r.id === 'selfie-liveness')?.enabled) {
      stepsToRun.push({ id: 'selfie-liveness', rulesTriggered: ['selfie-liveness'] });
    }
    if (rules.find(r => r.id === 'ocr-crosscheck')?.enabled) {
      stepsToRun.push({ id: 'ocr-crosscheck', rulesTriggered: ['ocr-crosscheck'] });
    }
    if (rules.find(r => r.id === 'phone-risk')?.enabled) {
      stepsToRun.push({ id: 'phone-risk', rulesTriggered: ['phone-risk'] });
    }
    if (rules.find(r => r.id === 'watchlist-screening')?.enabled) {
      stepsToRun.push({ id: 'watchlist-screening', rulesTriggered: ['watchlist-screening'] });
    }
    if (rules.find(r => r.id === 'continuous-monitor')?.enabled) {
      stepsToRun.push({ id: 'continuous-monitor', rulesTriggered: ['continuous-monitor'] });
    }

    setSimSteps(stepsToRun.map(s => ({ id: s.id, status: 'pending' })));

    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < stepsToRun.length) {
        setActiveStepIdx(stepIndex);
        const currentStep = stepsToRun[stepIndex];
        let status: ComplianceStepStatus = 'success';

        switch (currentStep.id) {
          case 'gov-id':
            if (!applicant.documentExpiryOk) {
              status = 'warning';
            } else {
              status = 'success';
            }
            break;
          case 'selfie-liveness':
            status = 'success';
            break;
          case 'ocr-crosscheck':
            if (!applicant.ocrMatch) {
              status = 'warning';
            } else {
              status = 'success';
            }
            break;
          case 'phone-risk':
            if (applicant.phoneRisk === 'High') {
              status = 'failed';
            } else {
              status = 'success';
            }
            break;
          case 'watchlist-screening':
            if (applicant.watchlistMatch) {
              status = applicant.riskProfile === 'High' ? 'failed' : 'warning';
            } else {
              status = 'success';
            }
            break;
          case 'continuous-monitor':
            status = 'success';
            break;
        }

        setSimSteps(prev => prev.map((s, idx) => idx === stepIndex ? { ...s, status } : s));
        setSimLogEntries(prev => [...prev, { id: currentStep.id, applicantId: applicant.id }]);
        stepIndex++;
      } else {
        clearInterval(interval);
        // Calculate final result
        let finalAction: 'approved' | 'review' | 'declined' = 'approved';

        if (applicant.riskProfile === 'High') {
          finalAction = 'declined';
        } else if (applicant.riskProfile === 'Medium' || !applicant.ocrMatch || applicant.watchlistMatch) {
          finalAction = 'review';
        }

        setSimulationResult(finalAction);
        setIsSimulating(false);
      }
    }, 900);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail) {
      alert(t.formAlert);
      return;
    }
    setFormSubmitted(true);
  };

  const currentApplicant = MOCK_APPLICANTS[currentApplicantIdx];
  const currentApplicantText = applicantText[currentApplicant.id as keyof typeof applicantText];

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-slate-800 antialiased selection:bg-[#354CE1]/10 selection:text-[#354CE1]">
      
      {/* 1. Header Navigation Back Button */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <button 
          onClick={onBackToLanding}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#354CE1] transition group"
          id="compliance_back_button"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          {t.backToPlatform}
        </button>
      </div>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left side info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E2E6FF] text-[#354CE1] rounded-full text-xs font-bold uppercase tracking-wider">
                <Scale className="w-3.5 h-3.5" />
                {t.badge}
              </div>
              
              <h1 className="text-4xl md:text-6xl font-display font-semibold text-[#0F1E36] tracking-tight leading-[1.1]">
                {t.heroTitleLine1} <br />
                <span className="text-[#354CE1] bg-gradient-to-r from-[#354CE1] via-[#5F3CF3] to-indigo-600 bg-clip-text text-transparent">{t.heroTitleAccent}</span>
              </h1>
              
              <p className="text-slate-600 text-base md:text-lg max-w-2xl leading-relaxed">
                {t.heroDesc}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button 
                  onClick={onOpenSandbox}
                  className="px-8 py-4 bg-[#354CE1] hover:bg-[#2539BE] text-white rounded-full font-semibold shadow-lg shadow-indigo-200 transition text-center text-sm"
                >
                  {t.getStarted}
                </button>
                <a 
                  href="#compliance-policy-simulator"
                  className="px-8 py-4 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-full font-semibold transition text-center text-sm flex items-center justify-center gap-1.5"
                >
                  <Play className="w-4 h-4 text-[#354CE1]" />
                  {t.tryPolicySimulator}
                </a>
              </div>
            </div>

            {/* Right side interactive graphic container */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-teal-500/10 rounded-3xl blur-3xl" />
              <div className="relative bg-white border border-slate-100 rounded-3xl shadow-xl p-6 md:p-8 space-y-6">
                
                {/* Header detail */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-[#354CE1]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{t.flowEngine}</h4>
                      <p className="text-[10px] font-mono text-slate-400">{t.engineStatus}</p>
                    </div>
                  </div>
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>

                {/* Simulated Steps inside graphic */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/50">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <span className="text-xs font-semibold text-slate-800">{t.amlPepScreening}</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100/50 px-2 py-0.5 rounded-md">{t.cleared}</span>
                  </div>

                  <div className="flex items-center justify-between bg-[#E2E6FF]/30 p-3 rounded-xl border border-[#E2E6FF]">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center animate-spin">
                        <RefreshCw className="w-3.5 h-3.5 text-[#354CE1]" />
                      </div>
                      <span className="text-xs font-semibold text-slate-800">{t.dynamicKycExtraction}</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#354CE1] bg-[#E2E6FF] px-2 py-0.5 rounded-md uppercase tracking-wider">{t.running}</span>
                  </div>

                  <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-400">
                        <CheckSquare className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-semibold text-slate-400">{t.continuousRiskReevaluation}</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">{t.queued}</span>
                  </div>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase">{t.amlScreenTime}</p>
                    <p className="text-xl font-display font-bold text-slate-900 mt-0.5">{t.amlScreenTimeValue}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase">{t.frictionlessRate}</p>
                    <p className="text-xl font-display font-bold text-slate-900 mt-0.5">{t.frictionlessRateValue}</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Trusted By Branding Logos */}
      <section className="bg-white py-12 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {t.trustedBy}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
            {trustedLogos.map((name, idx) => (
              <span key={idx} className="font-display font-extrabold text-lg md:text-xl text-slate-600 tracking-tight flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-slate-400" />
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Three Core Pillars of Compliance */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-6">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-[#0F1E36] tracking-tight">
            {t.pillarsTitle}
          </h2>
          <p className="text-slate-500 text-sm md:text-base">
            {t.pillarsDesc}
          </p>
        </div>

        {/* Dynamic Pillar Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left selectors (Column span 4) */}
          <div className="lg:col-span-4 space-y-3">
            {pillarText.map((p, idx) => {
              const Icon = [Layers, RefreshCw, Workflow][idx];
              const isActive = activePillar === idx;
              return (
                <button type="button"
                  key={idx}
                  onClick={() => setActivePillar(idx)}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'bg-white border-[#354CE1] shadow-lg shadow-indigo-50/50 translate-x-2' 
                      : 'bg-transparent border-slate-100 hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isActive ? 'bg-[#354CE1] text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 leading-snug">{p.title}</h3>
                      <p className="text-xs text-slate-500 font-medium mt-1">{p.subtitle}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right dynamic panel preview (Column span 8) */}
          <div className="lg:col-span-8 bg-white border border-slate-100 shadow-xl rounded-3xl overflow-hidden min-h-[420px] flex flex-col justify-between">
            <div className="bg-[#FAFBFD] px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {t.previewHeader}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
            </div>

            <div className="p-8 flex-1 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {activePillar === 0 && (
                  <motion.div
                    key="p-0"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-[#354CE1] uppercase">{previewText.stepSmartCollection}</span>
                      <h3 className="text-xl font-display font-bold text-slate-900">{previewText.lowRiskTitle}</h3>
                      <p className="text-slate-500 text-sm">
                        {previewText.lowRiskDesc}
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-3.5 rounded-xl border border-slate-100 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold text-slate-400">{previewText.stage1}</span>
                          <span className="text-[9px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md font-bold">{previewText.pass}</span>
                        </div>
                        <p className="text-xs font-bold text-slate-800">{previewText.phoneVerification}</p>
                        <p className="text-[10px] text-slate-500">{previewText.phoneVerificationDesc}</p>
                      </div>

                      <div className="bg-white p-3.5 rounded-xl border border-slate-100 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold text-slate-400">{previewText.stage2}</span>
                          <span className="text-[9px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md font-bold">{previewText.info}</span>
                        </div>
                        <p className="text-xs font-bold text-slate-800">{previewText.dbAddressMatch}</p>
                        <p className="text-[10px] text-slate-500">{previewText.dbAddressDesc}</p>
                      </div>

                      <div className="bg-white p-3.5 rounded-xl border border-[#354CE1]/30 bg-indigo-50/10 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold text-[#354CE1]">{previewText.stage3}</span>
                          <span className="text-[9px] text-[#354CE1] bg-[#E2E6FF] px-1.5 py-0.5 rounded-md font-bold">{previewText.auto}</span>
                        </div>
                        <p className="text-xs font-bold text-[#354CE1]">{previewText.kycComplete}</p>
                        <p className="text-[10px] text-slate-500">{previewText.kycCompleteDesc}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activePillar === 1 && (
                  <motion.div
                    key="p-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-[#354CE1] uppercase">{previewText.regulatoryControl}</span>
                      <h3 className="text-xl font-display font-bold text-slate-900">{previewText.rulesEngineTitle}</h3>
                      <p className="text-slate-500 text-sm">
                        {previewText.rulesEngineDesc}
                      </p>
                    </div>

                    <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 font-mono text-xs space-y-3 border border-slate-800 shadow-inner">
                      <div className="flex items-center justify-between text-indigo-400">
                        <span>{previewText.policyConfig}</span>
                        <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md">{previewText.live}</span>
                      </div>
                      <div className="space-y-1.5 text-slate-300">
                        <p><span className="text-yellow-400">{previewText.rule01}</span> {previewText.ifCountry} <span className="text-emerald-400">{previewText.countryDe}</span> {previewText.andAssetValue} <span className="text-cyan-400">{previewText.assetValue}</span></p>
                        <p className="pl-6"><span className="text-indigo-300">{previewText.then}</span> {previewText.requireNfc} <span className="text-purple-400">{previewText.trueValue}</span></p>
                        <p className="pl-6"><span className="text-indigo-300">{previewText.then}</span> {previewText.enableScreening} <span className="text-purple-400">{previewText.trueValue}</span></p>
                        <p className="pl-6"><span className="text-slate-500">{previewText.ruleComment}</span></p>
                        <p><span className="text-yellow-400">{previewText.rule02}</span> {previewText.ifSpoof} <span className="text-cyan-400">{previewText.spoofValue}</span></p>
                        <p className="pl-6"><span className="text-indigo-300">{previewText.then}</span> {previewText.routeManual}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activePillar === 2 && (
                  <motion.div
                    key="p-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-[#354CE1] uppercase">{previewText.caseCenter}</span>
                      <h3 className="text-xl font-display font-bold text-slate-900">{previewText.caseCenterTitle}</h3>
                      <p className="text-slate-500 text-sm">
                        {previewText.caseCenterDesc}
                      </p>
                    </div>

                    <div className="border border-slate-100 rounded-2xl p-4 bg-[#FAFBFD] space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-150 pb-2">
                        <span className="text-[11px] font-bold text-slate-900">{previewText.inquiryCase}</span>
                        <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full font-bold">{previewText.alertsPending}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <p className="text-slate-400 font-medium">{previewText.applicantName}</p>
                          <p className="font-bold text-slate-800">{previewText.applicantValue}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 font-medium">{previewText.pepSanctionMatch}</p>
                          <p className="font-bold text-red-600">{previewText.confidenceMatch}</p>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2 border-t border-slate-150 justify-end">
                        <button className="px-3 py-1.5 text-[10px] font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition">
                          {previewText.declineProfile}
                        </button>
                        <button className="px-3 py-1.5 text-[10px] font-bold text-white bg-[#354CE1] rounded-lg hover:bg-[#2539BE] transition">
                          {previewText.investigateMatch}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 font-medium flex items-center justify-between">
              <span>{t.pillarHelp}</span>
              <button onClick={onOpenSandbox} className="text-[#354CE1] font-bold hover:underline">
                {t.talkToExperts}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Central Compliance Sandbox & Policy Simulator (Highly Interactive) */}
      <section id="compliance-policy-simulator" className="py-20 md:py-28 bg-[#0F1E36] text-white overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(53,76,225,0.15)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-bold text-[#FFBF43] uppercase tracking-widest block">
              {t.labBadge}
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight">
              {t.labTitle}
            </h2>
            <p className="text-slate-300 text-sm md:text-base">
              {t.labDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left side: Policy Configurator (span 5) */}
            <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#FFBF43]" />
                  {t.configurePolicyTitle}
                </h3>
                <p className="text-xs text-slate-400">{t.presetHelp}</p>
              </div>

              {/* Presets */}
              <div className="grid grid-cols-3 gap-2">
                {(['standard', 'strict', 'custom'] as const).map((preset) => (
                  <button
                    key={preset}
                    onClick={() => applyPreset(preset)}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border transition ${
                      selectedPreset === preset
                        ? 'bg-[#354CE1] border-[#354CE1] text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
                    }`}
                  >
                    {getPresetLabel(preset)}
                  </button>
                ))}
              </div>

              {/* Interactive Toggles List */}
              <div className="space-y-3.5 pt-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  {t.activeRulesConfig}
                </span>
                {rules.map((rule) => {
                  const localizedRule = ruleText[rule.id as keyof typeof ruleText];
                  return (
                    <button type="button"
                      key={rule.id}
                      onClick={() => toggleRule(rule.id)}
                      className="flex items-start justify-between p-3 bg-slate-950 rounded-xl border border-slate-800/60 hover:border-slate-700 cursor-pointer transition select-none"
                    >
                      <div className="space-y-1 pr-4">
                        <p className="text-xs font-bold text-slate-200">{localizedRule.name}</p>
                        <p className="text-[10px] text-slate-400 leading-tight">{localizedRule.description}</p>
                      </div>
                    
                      <div className={`w-8 h-4.5 rounded-full p-0.5 transition shrink-0 ${
                        rule.enabled ? 'bg-emerald-500' : 'bg-slate-800'
                      }`}>
                        <div className={`w-3.5 h-3.5 bg-white rounded-full transition-transform ${
                          rule.enabled ? 'translate-x-3.5' : 'translate-x-0'
                        }`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right side: Live Simulator Engine (span 7) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Applicant Select Bar */}
              <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center shrink-0 border border-indigo-500/20">
                    <Users className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">{t.applicantSelectTitle}</h4>
                    <p className="text-[10px] text-slate-400">{t.applicantSelectDesc}</p>
                  </div>
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                  {MOCK_APPLICANTS.map((applicant, idx) => {
                    const localizedApplicant = applicantText[applicant.id as keyof typeof applicantText];
                    return (
                      <button
                        key={applicant.id}
                        onClick={() => {
                          setCurrentApplicantIdx(idx);
                          setSimulationResult(null);
                          setSimSteps([]);
                          setSimLogEntries([]);
                        }}
                        className={`flex-1 md:flex-initial py-1.5 px-3 text-xs font-bold rounded-lg transition ${
                          currentApplicantIdx === idx
                            ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                            : 'bg-slate-950 border border-slate-800/80 text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {localizedApplicant.firstName}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Core Simulator Console */}
              <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
                <div className="bg-slate-900 px-6 py-4 border-b border-slate-800/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold font-mono text-slate-300">{t.inquiryEngine}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider">
                    {t.jurisdictionGlobal}
                  </span>
                </div>

                {/* Main simulation dashboard area */}
                <div className="p-6 md:p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    
                    {/* Applicant Profile Card (span 5) */}
                    <div className="md:col-span-5 bg-slate-900/50 p-4 rounded-2xl border border-slate-850 space-y-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={currentApplicant.idPhotoUrl} 
                          alt={t.applicantAlt} 
                          className="w-12 h-12 rounded-full object-cover border border-slate-700 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-slate-100">{currentApplicantText.name}</h4>
                          <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-md ${
                            currentApplicant.riskProfile === 'Low'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : currentApplicant.riskProfile === 'Medium'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          }`}>
                            {getRiskLabel(currentApplicant.riskProfile)} {t.profileSuffix}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs text-slate-300 font-mono border-t border-slate-800 pt-3">
                        <p className="flex justify-between">
                          <span className="text-slate-500">{t.originLabel}</span>
                          <span className="text-slate-200">{currentApplicantText.country}</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-slate-500">{t.documentOkLabel}</span>
                          <span className={currentApplicant.documentExpiryOk ? 'text-emerald-400' : 'text-amber-400'}>
                            {currentApplicant.documentExpiryOk ? t.yes : t.expiryWarning}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-slate-500">{t.pepWatchlistLabel}</span>
                          <span className={currentApplicant.watchlistMatch ? 'text-red-400' : 'text-emerald-400'}>
                            {currentApplicant.watchlistMatch ? t.matchFound : t.clear}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-slate-500">{t.phoneRiskLabel}</span>
                          <span className={currentApplicant.phoneRisk === 'High' ? 'text-red-400' : 'text-slate-200'}>
                            {getRiskLabel(currentApplicant.phoneRisk)}
                          </span>
                        </p>
                      </div>

                      <button
                        onClick={runSimulation}
                        disabled={isSimulating}
                        className="w-full py-3 bg-[#354CE1] hover:bg-[#2539BE] text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-900/30 disabled:opacity-50"
                      >
                        {isSimulating ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            {t.evaluating}
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4" />
                            {t.runCheck}
                          </>
                        )}
                      </button>
                    </div>

                    {/* Step Evaluation Console Logs (span 7) */}
                    <div className="md:col-span-7 space-y-4">
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                          {t.verificationSteps}
                        </span>
                        
                        <div className="space-y-2 font-mono text-xs max-h-[160px] overflow-y-auto pr-1">
                          {simSteps.length === 0 ? (
                            <p className="text-slate-500 italic text-center py-6">
                              {t.noSteps}
                            </p>
                          ) : (
                            simSteps.map((step, idx) => (
                              <div 
                                key={idx}
                                className={`flex items-center justify-between p-2 rounded-lg border transition ${
                                  activeStepIdx === idx
                                    ? 'bg-indigo-950/40 border-indigo-500/30'
                                    : 'bg-slate-900/30 border-slate-900'
                                }`}
                              >
                                <span className={`font-semibold ${
                                  activeStepIdx === idx ? 'text-white font-bold' : 'text-slate-400'
                                }`}>
                                  {getStepLabel(step.id)}
                                </span>

                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-sm ${
                                  step.status === 'success' 
                                    ? 'bg-emerald-500/10 text-emerald-400' 
                                    : step.status === 'warning'
                                    ? 'bg-amber-500/10 text-amber-400'
                                    : step.status === 'failed'
                                    ? 'bg-red-500/10 text-red-400'
                                    : 'bg-slate-900 text-slate-500'
                                }`}>
                                  {getStatusLabel(step.status)}
                                </span>
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      {/* Diagnostic Outputs */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                          {t.diagnosticLogs}
                        </span>
                        <div className="bg-slate-900 border border-slate-850 p-3 rounded-xl font-mono text-[10px] h-[100px] overflow-y-auto space-y-1 text-slate-400">
                          {simLogs.length === 0 ? (
                            <p className="italic text-slate-600">{t.consoleReady}</p>
                          ) : (
                            simLogs.map((log, idx) => (
                              <p key={idx} className="leading-normal">{log}</p>
                            ))
                          )}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Ultimate Policy Decision outcome badge */}
                  <AnimatePresence>
                    {simulationResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-2xl border flex items-center justify-between ${
                          simulationResult === 'approved'
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                            : simulationResult === 'review'
                            ? 'bg-amber-500/10 border-amber-500/20 text-amber-300'
                            : 'bg-red-500/10 border-red-500/20 text-red-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            simulationResult === 'approved'
                              ? 'bg-emerald-500/25'
                              : simulationResult === 'review'
                              ? 'bg-amber-500/25'
                              : 'bg-red-500/25'
                          }`}>
                            {simulationResult === 'approved' ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            ) : simulationResult === 'review' ? (
                              <AlertCircle className="w-5 h-5 text-amber-400" />
                            ) : (
                              <AlertTriangle className="w-5 h-5 text-red-400" />
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider">{t.finalComplianceAction}</p>
                            <h4 className="text-base font-bold text-slate-100">
                              {simulationResult === 'approved'
                                ? t.resultApproved
                                : simulationResult === 'review'
                                ? t.resultReview
                                : t.resultDeclined}
                            </h4>
                          </div>
                        </div>

                        <span className="text-[10px] font-mono bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-800">
                          {t.idLabel} {currentApplicant.id}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 6. High-Impact Compliance Bento Box Feature Grid */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-6">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#354CE1] uppercase tracking-widest block">
            {t.platformBadge}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-[#0F1E36] tracking-tight">
            {t.platformTitle}
          </h2>
          <p className="text-slate-500 text-sm md:text-base">
            {t.platformDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: PEP & Sanctions Screening (span 8) */}
          <div className="md:col-span-8 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
            <div className="space-y-4 max-w-lg">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                <Search className="w-5 h-5 text-[#354CE1]" />
              </div>
              <h3 className="text-lg font-bold text-slate-950">{featureText[0].title}</h3>
              <p className="text-slate-500 text-sm">
                {featureText[0].desc}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 mt-6 border-t border-slate-100">
              <div className="bg-slate-50 p-4 rounded-2xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase">{t.coverageDatabases}</p>
                <p className="text-lg font-display font-bold text-slate-900 mt-1">{t.coverageDatabasesValue}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase">{t.updateFrequency}</p>
                <p className="text-lg font-display font-bold text-slate-900 mt-1">{t.updateFrequencyValue}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase">{t.falsePositiveRate}</p>
                <p className="text-lg font-display font-bold text-[#354CE1] mt-1">{t.falsePositiveRateValue}</p>
              </div>
            </div>
          </div>

          {/* Card 2: Regulatory Document Vault (span 4) */}
          <div className="md:col-span-4 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
            <div className="space-y-4">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                <Lock className="w-5 h-5 text-[#354CE1]" />
              </div>
              <h3 className="text-lg font-bold text-slate-950">{featureText[1].title}</h3>
              <p className="text-slate-500 text-sm">
                {featureText[1].desc}
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 space-y-2 text-xs text-slate-500">
              <p className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#354CE1] shrink-0" />
                {featureText[1].bullets?.[0]}
              </p>
              <p className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#354CE1] shrink-0" />
                {featureText[1].bullets?.[1]}
              </p>
              <p className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#354CE1] shrink-0" />
                {featureText[1].bullets?.[2]}
              </p>
            </div>
          </div>

          {/* Card 3: No-Code Compliance Builder (span 4) */}
          <div className="md:col-span-4 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
            <div className="space-y-4">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                <Workflow className="w-5 h-5 text-[#354CE1]" />
              </div>
              <h3 className="text-lg font-bold text-slate-950">{featureText[2].title}</h3>
              <p className="text-slate-500 text-sm">
                {featureText[2].desc}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#354CE1]">
              <span>{t.learnWorkflows}</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 4: Audit Trails & Reporting (span 8) */}
          <div className="md:col-span-8 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <div className="sm:col-span-7 space-y-4">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                  <ClipboardCheck className="w-5 h-5 text-[#354CE1]" />
                </div>
                <h3 className="text-lg font-bold text-slate-950">{featureText[3].title}</h3>
                <p className="text-slate-500 text-sm">
                  {featureText[3].desc}
                </p>
              </div>

              <div className="sm:col-span-5 bg-[#FAFBFD] p-5 rounded-2xl border border-slate-100 space-y-3 shrink-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">{t.auditCertId}</span>
                  <span className="text-[9px] text-[#354CE1] bg-[#E2E6FF] px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wider">{t.certified}</span>
                </div>
                
                <div className="space-y-1 text-xs text-slate-600 font-medium">
                  <p className="flex justify-between"><span>{t.ruleEvaluated}</span> <span className="font-bold text-slate-800">{t.micaStandard}</span></p>
                  <p className="flex justify-between"><span>{t.riskSignal}</span> <span className="font-bold text-slate-800">{t.lowRiskSignal}</span></p>
                  <p className="flex justify-between"><span>{t.decisionType}</span> <span className="font-bold text-emerald-600">{t.autoApproved}</span></p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-400">
                  <span>{t.hashGenerated}</span>
                  <span className="font-mono text-[9px]">{t.hashValue}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Ready to Get Started Corporate Call to Action Lead Form */}
      <section className="py-20 md:py-28 bg-[#FAFBFD] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white border border-slate-150/60 shadow-xl rounded-[2.5rem] p-8 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Lead Copy Info (span 7) */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-[#0F1E36] tracking-tight leading-none">
                {t.ctaTitle}
              </h2>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                {t.ctaDesc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-semibold text-slate-800 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{t.ctaPoint1}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{t.ctaPoint2}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{t.ctaPoint3}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{t.ctaPoint4}</span>
                </div>
              </div>
            </div>

            {/* Lead Form Container (span 5) */}
            <div className="lg:col-span-5 bg-[#FAFBFD] p-6 md:p-8 rounded-3xl border border-slate-100 shadow-inner">
              {formSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{t.requestReceived}</h3>
                  <p className="text-xs text-slate-500">
                    {t.requestReceivedDesc}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">{t.yourName}</label>
                    <input
                      type="text"
                      required
                      placeholder={t.namePlaceholder}
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-[#354CE1] outline-none rounded-xl px-4 py-3 text-xs text-slate-800 transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">{t.workEmail}</label>
                    <input
                      type="email"
                      required
                      placeholder={t.emailPlaceholder}
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-[#354CE1] outline-none rounded-xl px-4 py-3 text-xs text-slate-800 transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">{t.companyName}</label>
                    <input
                      type="text"
                      placeholder={t.companyPlaceholder}
                      value={formCompany}
                      onChange={(e) => setFormCompany(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-[#354CE1] outline-none rounded-xl px-4 py-3 text-xs text-slate-800 transition"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#354CE1] hover:bg-[#2539BE] text-white rounded-xl text-xs font-bold transition shadow-md shadow-indigo-100"
                  >
                    {t.requestSandbox}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
