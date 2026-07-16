/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, ChevronDown, Check, Sparkles, Filter, 
  ArrowUpRight, HelpCircle, User, Lock, ArrowLeft, 
  Split, Sliders, Radio, Shield, Fingerprint, MapPin, 
  Settings, RefreshCw, Layers, CheckCircle2, AlertTriangle, 
  Smartphone, Monitor, Eye, Palette, Code, CheckCircle, 
  UserCheck, ShieldCheck, Cpu, Globe
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedValue } from '../utils/i18nRuntime';
import { DYNAMIC_FLOW_TRANSLATIONS, type DynamicFlowTranslationKey } from '../translations/DynamicFlowPageTranslations';

interface DynamicFlowPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

interface SignalNode {
  id: string;
  label: string;
  type: 'passive' | 'active' | 'decision';
  status: 'active' | 'passed' | 'failed' | 'pending';
  desc: string;
}

export default function DynamicFlowPage({ onOpenSandbox, onBackToLanding, onViewChange }: DynamicFlowPageProps) {
  const { language } = useLanguage();
  const ft = (key: DynamicFlowTranslationKey) => {
    const lang = language as keyof typeof DYNAMIC_FLOW_TRANSLATIONS;
    return getLocalizedValue(DYNAMIC_FLOW_TRANSLATIONS[lang], key, lang, 'DYNAMIC_FLOW_TRANSLATIONS') || '';
  };

  // 1. Simulator Controls
  const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high' | 'malicious'>('medium');
  const [useCase, setUseCase] = useState<'onboarding' | 'crypto' | 'high-value'>('onboarding');
  const [themeColor, setThemeColor] = useState<string>('#354CE1'); // default Identra Blue
  const [borderRadius, setBorderRadius] = useState<'sharp' | 'rounded' | 'pill'>('rounded');
  const [simulatedStep, setSimulatedStep] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationResult, setVerificationResult] = useState<'success' | 'friction' | 'fail' | null>(null);

  // Active step flow definition based on risk level
  const getFlowSteps = () => {
    const lang = language as keyof typeof DYNAMIC_FLOW_TRANSLATIONS;
    switch (riskLevel) {
      case 'low':
        return [
          { 
            id: 'welcome',
            name: DYNAMIC_FLOW_TRANSLATIONS[lang].stepWelcome, 
            type: 'active', 
            desc: DYNAMIC_FLOW_TRANSLATIONS[lang].descWelcomeLow 
          },
          { 
            id: 'otp',
            name: DYNAMIC_FLOW_TRANSLATIONS[lang].stepEmailOtp, 
            type: 'active', 
            desc: DYNAMIC_FLOW_TRANSLATIONS[lang].descEmailOtpLow 
          },
          { 
            id: 'selfieCheck',
            name: DYNAMIC_FLOW_TRANSLATIONS[lang].stepSelfieCheck, 
            type: 'skipped', 
            desc: DYNAMIC_FLOW_TRANSLATIONS[lang].descSelfieSkipped 
          },
          { 
            id: 'govId',
            name: DYNAMIC_FLOW_TRANSLATIONS[lang].stepGovId, 
            type: 'skipped', 
            desc: DYNAMIC_FLOW_TRANSLATIONS[lang].descGovIdSkipped 
          },
        ];
      case 'medium':
        return [
          { 
            id: 'welcome',
            name: DYNAMIC_FLOW_TRANSLATIONS[lang].stepWelcome, 
            type: 'active', 
            desc: DYNAMIC_FLOW_TRANSLATIONS[lang].descWelcomeMed 
          },
          { 
            id: 'govId',
            name: DYNAMIC_FLOW_TRANSLATIONS[lang].stepGovId, 
            type: 'active', 
            desc: DYNAMIC_FLOW_TRANSLATIONS[lang].descGovIdMed 
          },
          { 
            id: 'selfieLiveness',
            name: DYNAMIC_FLOW_TRANSLATIONS[lang].stepSelfieLiveness, 
            type: 'active', 
            desc: DYNAMIC_FLOW_TRANSLATIONS[lang].descSelfieMed 
          },
          { 
            id: 'databaseMatch',
            name: DYNAMIC_FLOW_TRANSLATIONS[lang].stepDatabaseMatch, 
            type: 'passive', 
            desc: DYNAMIC_FLOW_TRANSLATIONS[lang].descDbMed 
          },
        ];
      case 'high':
        return [
          { 
            id: 'consentKyc',
            name: DYNAMIC_FLOW_TRANSLATIONS[lang].stepConsentKyc, 
            type: 'active', 
            desc: DYNAMIC_FLOW_TRANSLATIONS[lang].descKycHigh 
          },
          { 
            id: 'govId',
            name: DYNAMIC_FLOW_TRANSLATIONS[lang].stepGovId, 
            type: 'active', 
            desc: DYNAMIC_FLOW_TRANSLATIONS[lang].descGovIdHigh 
          },
          { 
            id: 'selfieLiveness',
            name: DYNAMIC_FLOW_TRANSLATIONS[lang].stepSelfieLiveness, 
            type: 'active', 
            desc: DYNAMIC_FLOW_TRANSLATIONS[lang].descSelfieHigh 
          },
          { 
            id: 'proofAddress',
            name: DYNAMIC_FLOW_TRANSLATIONS[lang].stepProofAddress, 
            type: 'active', 
            desc: DYNAMIC_FLOW_TRANSLATIONS[lang].descAddressHigh 
          },
          { 
            id: 'adverseMedia',
            name: DYNAMIC_FLOW_TRANSLATIONS[lang].stepAdverseMedia, 
            type: 'passive', 
            desc: DYNAMIC_FLOW_TRANSLATIONS[lang].descAdverseHigh 
          },
        ];
      case 'malicious':
        return [
          { 
            id: 'deviceFingerprint',
            name: DYNAMIC_FLOW_TRANSLATIONS[lang].stepDeviceFingerprint, 
            type: 'failed', 
            desc: DYNAMIC_FLOW_TRANSLATIONS[lang].descFingerprintMal 
          },
          { 
            id: 'captchaBlock',
            name: DYNAMIC_FLOW_TRANSLATIONS[lang].stepCaptchaBlock, 
            type: 'active', 
            desc: DYNAMIC_FLOW_TRANSLATIONS[lang].descCaptchaMal 
          },
          { 
            id: 'strictIdNfc',
            name: DYNAMIC_FLOW_TRANSLATIONS[lang].stepStrictIdNfc, 
            type: 'active', 
            desc: DYNAMIC_FLOW_TRANSLATIONS[lang].descStrictIdMal 
          },
          { 
            id: 'instantRejected',
            name: DYNAMIC_FLOW_TRANSLATIONS[lang].stepInstantRejected, 
            type: 'decision', 
            desc: DYNAMIC_FLOW_TRANSLATIONS[lang].descRejectMal 
          },
        ];
    }
  };

  const steps = getFlowSteps();

  // Reset simulated state on risk level shift
  useEffect(() => {
    setSimulatedStep(0);
    setVerificationResult(null);
    setIsVerifying(false);
  }, [riskLevel]);

  const handleNextStep = () => {
    if (simulatedStep < steps.filter(s => s.type !== 'skipped').length - 1) {
      setSimulatedStep(prev => prev + 1);
    } else {
      setIsVerifying(true);
      setTimeout(() => {
        setIsVerifying(false);
        if (riskLevel === 'malicious') {
          setVerificationResult('fail');
        } else if (riskLevel === 'high') {
          setVerificationResult('friction');
        } else {
          setVerificationResult('success');
        }
      }, 1500);
    }
  };

  const getBorderRadiusClass = () => {
    if (borderRadius === 'sharp') return 'rounded-none';
    if (borderRadius === 'pill') return 'rounded-full';
    return 'rounded-xl';
  };

  const getCardRadiusClass = () => {
    if (borderRadius === 'sharp') return 'rounded-none';
    if (borderRadius === 'pill') return 'rounded-[32px]';
    return 'rounded-2xl';
  };

  const currentStepName = steps.filter(s => s.type !== 'skipped')[simulatedStep]?.name;
  const currentStepId = steps.filter(s => s.type !== 'skipped')[simulatedStep]?.id;
  const isWelcome = currentStepId === 'welcome' || currentStepId === 'consentKyc';
  const isGovId = currentStepId === 'govId';
  const isSelfie = currentStepId === 'selfieLiveness' || currentStepId === 'selfieCheck';
  const isOtp = currentStepId === 'otp';
  const isAddress = currentStepId === 'proofAddress';
  const isCaptcha = currentStepId === 'captchaBlock';

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-slate-800 antialiased font-sans">
      
      {/* Back button and breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <button 
          onClick={onBackToLanding}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition font-medium group"
          id="flow_back_btn"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>{ft('backToHome')}</span>
        </button>
      </div>

      {/* Hero Header Section */}
      <div className="max-w-7xl mx-auto px-6 pb-20 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EEF2FF] text-[#354CE1] rounded-full text-xs font-bold border border-[#354CE1]/10">
              <Sparkles className="w-3.5 h-3.5 text-[#354CE1]" />
              <span>{ft('badge')}</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.05]" id="flow_hero_title">
              {ft('heroTitle')}
            </h1>
            
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
              {ft('heroDesc')}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={onOpenSandbox}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full text-sm shadow-md transition"
                id="flow_hero_cta_demo"
              >
                <span>{ft('btnRequestDemo')}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById('flow_interactive_simulator');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-full transition"
                id="flow_hero_cta_sim"
              >
                <span>{ft('btnInteractiveSimulator')}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Micro value stat indicators */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200/60">
              <div>
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950">{ft('statAutoPassVal')}</p>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">{ft('statAutoPass')}</p>
              </div>
              <div>
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950">{ft('statDropOffVal')}</p>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">{ft('statDropOff')}</p>
              </div>
              <div>
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#354CE1]">{ft('statAvgResponseVal')}</p>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">{ft('statAvgResponse')}</p>
              </div>
            </div>
          </div>

          {/* Hero Right Visual: Dynamic Flow Graph */}
          <div className="lg:col-span-6 bg-white border border-slate-200/80 rounded-[32px] p-6 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-slate-50/50 pointer-events-none" />
            <div className="relative z-10 space-y-6">
              
              {/* Card Header mimic of Admin dashboard */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold text-slate-500 tracking-wider uppercase">{ft('activeFlowTitle')}</span>
                </div>
                <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded text-[10px] text-slate-500 font-mono">
                  <Code className="w-3 h-3" />
                  <span>{ft('verLive')}</span>
                </div>
              </div>

              {/* Graphical Visual Node Editor Block */}
              <div className="space-y-4 font-sans text-xs">
                
                {/* Node 1 */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Fingerprint className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{ft('nodeUserLands')}</p>
                      <p className="text-[11px] text-slate-400">{ft('nodeUserLandsDesc')}</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">{ft('badgePassive')}</span>
                </div>

                {/* Arrow */}
                <div className="h-6 w-0.5 bg-slate-200 mx-auto" />

                {/* Node 2 - Decision */}
                <div className="bg-slate-900 text-white rounded-xl p-4 border border-slate-800 shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center">
                        <Split className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold">{ft('nodeEvaluateRisk')}</p>
                        <p className="text-[11px] text-slate-400">{ft('nodeEvaluateRiskDesc')}</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-indigo-500 text-white text-[10px] font-bold rounded-full">{ft('badgeRouter')}</span>
                  </div>

                  {/* Split branches visualized inside */}
                  <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-white/10 text-[11px]">
                    <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                      <p className="font-bold text-emerald-400">{ft('nodeLowRiskPath')}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{ft('nodeLowRiskPathDesc')}</p>
                    </div>
                    <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                      <p className="font-bold text-amber-400">{ft('nodeHighRiskPath')}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{ft('nodeHighRiskPathDesc')}</p>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="h-6 w-0.5 bg-slate-200 mx-auto" />

                {/* Node 3 - Active challenge */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{ft('nodeBiometric')}</p>
                      <p className="text-[11px] text-slate-400">{ft('nodeBiometricDesc')}</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-orange-100 text-orange-800 text-[10px] font-bold rounded-full">{ft('badgeChallenge')}</span>
                </div>

              </div>
              
            </div>
          </div>

        </div>
      </div>

      {/* Main Core Section: Interactive Live Flow Simulator */}
      <div className="bg-white border-y border-slate-200/80 py-24 scroll-mt-6" id="flow_interactive_simulator">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-[#354CE1] rounded-full text-xs font-bold">
              <Sliders className="w-3.5 h-3.5" />
              <span>{ft('sandboxBadge')}</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              {ft('sandboxTitle')}
            </h2>
            <p className="text-slate-600 text-base">
              {ft('sandboxDesc')}
            </p>
          </div>

          {/* Two-Column Sandbox Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Control Panel (4 Columns) */}
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-8">
              
              {/* Option 1: Simulated Risk Tier */}
              <div className="space-y-3">
                <label className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block">{ft('labelRiskLevel')}</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'low', label: ft('riskLow'), desc: ft('riskLowDesc'), color: 'border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-900 hover:border-emerald-300' },
                    { id: 'medium', label: ft('riskMedium'), desc: ft('riskMediumDesc'), color: 'border-blue-200 bg-blue-50/50 hover:bg-blue-50 text-blue-900 hover:border-blue-300' },
                    { id: 'high', label: ft('riskHigh'), desc: ft('riskHighDesc'), color: 'border-orange-200 bg-orange-50/50 hover:bg-orange-50 text-orange-900 hover:border-orange-300' },
                    { id: 'malicious', label: ft('riskMalicious'), desc: ft('riskMaliciousDesc'), color: 'border-red-200 bg-red-50/50 hover:bg-red-50 text-red-900 hover:border-red-300' }
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      onClick={() => setRiskLevel(tier.id as any)}
                      className={`text-left p-3 rounded-2xl border text-xs font-semibold flex flex-col justify-between h-20 transition ${tier.color} ${
                        riskLevel === tier.id ? 'ring-2 ring-slate-900 border-transparent shadow-sm' : ''
                      }`}
                    >
                      <span>{tier.label}</span>
                      <span className="text-[10px] text-slate-500 font-normal block leading-tight">{tier.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 2: Active Brand Customization */}
              <div className="space-y-4 border-t border-slate-200 pt-6">
                <label className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block">{ft('labelBrandStyling')}</label>
                
                {/* Palette selection */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-600 block">{ft('labelThemeAccent')}</span>
                  <div className="flex items-center gap-2">
                    {[
                      { hex: '#354CE1', label: ft('colorIdentraBlue') },
                      { hex: '#10B981', label: ft('colorEmerald') },
                      { hex: '#8B5CF6', label: ft('colorVibrantPurple') },
                      { hex: '#F59E0B', label: ft('colorAmber') },
                      { hex: '#EF4444', label: ft('colorCrimson') },
                      { hex: '#0F172A', label: ft('colorCharcoal') }
                    ].map((col) => (
                      <button
                        key={col.hex}
                        onClick={() => setThemeColor(col.hex)}
                        className={`w-8 h-8 rounded-full border-2 transition transform hover:scale-110 flex items-center justify-center`}
                        style={{ backgroundColor: col.hex, borderColor: themeColor === col.hex ? '#000000' : 'transparent' }}
                        title={col.label}
                      >
                        {themeColor === col.hex && <Check className="w-4 h-4 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Border Radius select */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-600 block">{ft('labelBorderRadius')}</span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'sharp', label: ft('radiusSharp') },
                      { id: 'rounded', label: ft('radiusRounded') },
                      { id: 'pill', label: ft('radiusPill') }
                    ].map((radius) => (
                      <button
                        key={radius.id}
                        onClick={() => setBorderRadius(radius.id as any)}
                        className={`py-2 px-3 border text-xs font-semibold rounded-xl transition ${
                          borderRadius === radius.id ? 'bg-slate-900 border-transparent text-white shadow-sm' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {radius.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Passive Risk Signals panel list */}
              <div className="space-y-3 border-t border-slate-200 pt-6">
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block">{ft('labelPassiveSignals')}</span>
                <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">{ft('signalVpn')}</span>
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold ${
                      riskLevel === 'malicious' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      {riskLevel === 'malicious' ? ft('valVpnDetected') : ft('valIpClean')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">{ft('signalDevice')}</span>
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold ${
                      ['high', 'malicious'].includes(riskLevel) ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      {['high', 'malicious'].includes(riskLevel) ? ft('valNewDeviceHash') : ft('valFreqDevice')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">{ft('signalBehavioral')}</span>
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold ${
                      riskLevel === 'malicious' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      {riskLevel === 'malicious' ? ft('valCopyPasteDetected') : ft('valHumanTyping')}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Simulated Live User Verification Window (7 Columns) */}
            <div className="lg:col-span-7 bg-[#0F172A] rounded-[32px] p-6 sm:p-8 lg:p-10 text-white shadow-2xl relative">
              <div className="absolute top-0 right-0 w-44 h-44 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              
              {/* Simulator Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                  <span className="text-xs text-slate-400 font-bold tracking-wider uppercase">{ft('labelClientPreview')}</span>
                </div>
                <button
                  onClick={() => {
                    setSimulatedStep(0);
                    setVerificationResult(null);
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition flex items-center gap-1 text-[11px]"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{ft('btnRestartFlow')}</span>
                </button>
              </div>

              {/* Dynamic Step visualizer banner */}
              <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none border-b border-white/5 text-[11px]">
                {steps.map((st, i) => {
                  const isActive = steps.filter(s => s.type !== 'skipped')[simulatedStep]?.name === st.name;
                  const isSkipped = st.type === 'skipped';
                  const isFinished = steps.filter(s => s.type !== 'skipped').findIndex(s => s.name === st.name) < simulatedStep && !isSkipped;
                  return (
                    <div 
                      key={st.name} 
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg shrink-0 border transition-all ${
                        isSkipped 
                          ? 'opacity-30 bg-transparent border-dashed border-white/10 text-slate-400 line-through' 
                          : isActive 
                            ? 'bg-white/10 border-white/20 text-white font-bold' 
                            : isFinished 
                              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                              : 'bg-white/5 border-transparent text-slate-400'
                      }`}
                    >
                      {isFinished ? <CheckCircle className="w-3 h-3 text-emerald-400" /> : <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />}
                      <span>{st.name}</span>
                    </div>
                  );
                })}
              </div>

              {/* Simulated Mobile Mockup Card with Live Form Theme Variables Applied */}
              <div className="max-w-md mx-auto bg-white text-slate-900 rounded-[28px] overflow-hidden border border-white/10 shadow-xl min-h-[380px] flex flex-col justify-between p-6 sm:p-8">
                
                {/* Branding Mimic (Active Color, Radius Styles) */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: themeColor }}>
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="font-display font-black text-sm tracking-tight text-slate-900">{ft('mockBrandName')}</span>
                  </div>
                  <div className="w-12 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full transition-all duration-300" 
                      style={{ 
                        backgroundColor: themeColor,
                        width: `${((simulatedStep + 1) / steps.filter(s => s.type !== 'skipped').length) * 100}%`
                      }} 
                    />
                  </div>
                </div>

                {/* Simulated Screen Content based on step and status */}
                {isVerifying ? (
                  <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-12 h-12 rounded-full border-4 border-slate-100 border-t-indigo-600 animate-spin flex items-center justify-center" style={{ borderTopColor: themeColor }} />
                    <h3 className="font-bold text-slate-900">{ft('analyzingSignals')}</h3>
                    <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                      {ft('analyzingSignalsDesc')}
                    </p>
                  </div>
                ) : verificationResult ? (
                  <div className="py-8 text-center space-y-4">
                    {verificationResult === 'success' && (
                      <>
                        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500 border border-emerald-100">
                          <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <h3 className="font-display text-xl font-bold text-slate-900">{ft('verificationApproved')}</h3>
                        <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                          {ft('verificationApprovedDesc')}
                        </p>
                      </>
                    )}
                    {verificationResult === 'friction' && (
                      <>
                        <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-500 border border-amber-100">
                          <AlertTriangle className="w-10 h-10" />
                        </div>
                        <h3 className="font-display text-xl font-bold text-slate-900">{ft('additionalProof')}</h3>
                        <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                          {ft('additionalProofDesc')}
                        </p>
                      </>
                    )}
                    {verificationResult === 'fail' && (
                      <>
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500 border border-red-100">
                          <AlertTriangle className="w-10 h-10" />
                        </div>
                        <h3 className="font-display text-xl font-bold text-slate-900">{ft('verificationDeclined')}</h3>
                        <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                          {ft('verificationDeclinedDesc')}
                        </p>
                      </>
                    )}

                    <div className="pt-4">
                      <button
                        onClick={() => {
                          setSimulatedStep(0);
                          setVerificationResult(null);
                        }}
                        className={`w-full py-3 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition ${getBorderRadiusClass()}`}
                      >
                        {ft('btnResetSimulator')}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="py-6 space-y-5">
                    {/* Simulated Screen Content based on step */}
                    {isWelcome && (
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <h3 className="font-display text-lg font-extrabold text-slate-950">{ft('screenWelcomeTitle')}</h3>
                          <p className="text-[11px] text-slate-500 leading-normal">
                            {ft('screenWelcomeDesc')}
                          </p>
                        </div>

                        <div className="space-y-2 text-xs">
                          <div className="flex items-start gap-2.5 p-3 bg-slate-50 border border-slate-100 rounded-xl">
                            <Lock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                            <p className="text-[11px] text-slate-500 leading-normal">
                              {ft('screenWelcomeTip')}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {isGovId && (
                      <div className="space-y-4 text-center">
                        <h3 className="font-display text-base font-bold text-slate-950">{ft('screenGovIdTitle')}</h3>
                        <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                          {ft('screenGovIdDesc')}
                        </p>
                        <div className="w-full h-32 bg-slate-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-300 relative overflow-hidden group">
                          <div className="absolute inset-4 border border-indigo-500/40 rounded-lg pointer-events-none" />
                          <Smartphone className="w-8 h-8 text-slate-400 group-hover:scale-110 transition" />
                        </div>
                      </div>
                    )}

                    {isSelfie && (
                      <div className="space-y-4 text-center">
                        <h3 className="font-display text-base font-bold text-slate-950">{ft('screenSelfieTitle')}</h3>
                        <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                          {ft('screenSelfieDesc')}
                        </p>
                        <div className="w-28 h-28 bg-slate-100 rounded-full flex items-center justify-center border-4 border-slate-200 mx-auto relative overflow-hidden">
                          <div className="absolute inset-1 rounded-full border border-dashed border-indigo-500 animate-pulse" />
                          <User className="w-10 h-10 text-slate-400" />
                        </div>
                      </div>
                    )}

                    {isOtp && (
                      <div className="space-y-4">
                        <h3 className="font-display text-base font-bold text-slate-950">{ft('screenMobileTitle')}</h3>
                        <p className="text-[11px] text-slate-500">
                          {ft('screenMobileDesc')}
                        </p>
                        <div className="grid grid-cols-6 gap-2">
                          {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="h-10 border border-slate-200 rounded-lg bg-slate-50 flex items-center justify-center text-xs font-bold font-mono">
                              {i === 0 ? '7' : i === 1 ? '4' : ''}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {isAddress && (
                      <div className="space-y-4">
                        <h3 className="font-display text-base font-bold text-slate-950">{ft('screenAddressTitle')}</h3>
                        <p className="text-[11px] text-slate-500">
                          {ft('screenAddressDesc')}
                        </p>
                        <div className="w-full p-6 border-2 border-dashed border-slate-200 hover:border-slate-300 rounded-2xl text-center cursor-pointer transition">
                          <span className="text-xs text-slate-400 block font-semibold">{ft('btnClickUpload')}</span>
                          <span className="text-[10px] text-slate-300 block mt-0.5">{ft('uploadLimits')}</span>
                        </div>
                      </div>
                    )}

                    {isCaptcha && (
                      <div className="space-y-4 text-center">
                        <h3 className="font-display text-base font-bold text-slate-950 text-red-600">{ft('screenCaptchaTitle')}</h3>
                        <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                          {ft('screenCaptchaDesc')}
                        </p>
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl inline-flex items-center gap-3">
                          <input type="checkbox" className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer" />
                          <span className="text-xs font-bold text-slate-700">{ft('valNotRobot')}</span>
                        </div>
                      </div>
                    )}

                    {/* Step Actions */}
                    <div className="pt-4 flex items-center justify-between gap-3">
                      <span className="text-[10px] text-slate-400 font-bold">{ft('secureSsl')}</span>
                      <button
                        onClick={handleNextStep}
                        className="px-6 py-2.5 text-xs font-bold text-white transition hover:opacity-90 flex items-center gap-1.5"
                        style={{ backgroundColor: themeColor, borderRadius: borderRadius === 'sharp' ? '0px' : borderRadius === 'pill' ? '9999px' : '12px' }}
                      >
                        <span>
                          {simulatedStep === steps.filter(s => s.type !== 'skipped').length - 1 ? ft('btnFinishVerify') : ft('btnContinue')}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-white" />
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* Debug Logger at the bottom */}
              <div className="mt-8 bg-black/40 border border-white/5 rounded-2xl p-4 font-mono text-[10px] text-slate-400 space-y-1.5">
                <p className="text-[11px] font-bold text-white uppercase tracking-wider pb-1 border-b border-white/5 flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                  <span>{ft('debuggerTitle')}</span>
                </p>
                <p><span className="text-blue-400">{ft('debugTagInfo')}</span> {ft('dbOnboardingInit')} <strong className="text-white">{riskLevel.toUpperCase()}</strong></p>
                <p><span className="text-indigo-400">{ft('debugTagEval')}</span> {ft('dbPaletteInjected')} <strong className="text-white">{themeColor}</strong> {ft('debugSeparator')} {ft('dbRadiusStyle')} <strong className="text-white">{borderRadius}</strong></p>
                {isVerifying && <p className="text-yellow-400 animate-pulse">{ft('debugTagProc')} {ft('dbProc')}</p>}
                {verificationResult && <p className="text-emerald-400">{ft('debugTagDone')} {ft('dbDone')} <strong className="text-white font-bold">{verificationResult.toUpperCase()}</strong></p>}
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Feature Bento Grid Section exactly like Identra product page layout */}
      <div className="max-w-7xl mx-auto px-6 py-24 space-y-16">
        
        <div className="max-w-2xl space-y-3">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            {ft('bentoTitle')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {ft('bentoDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#354CE1] flex items-center justify-center mb-5 border border-indigo-100">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h3 className="text-slate-900 font-bold text-sm tracking-tight mb-2">{ft('bento1Title')}</h3>
            <p className="text-slate-500 text-xs leading-relaxed font-normal">
              {ft('bento1Desc')}
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 border border-emerald-100">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="text-slate-900 font-bold text-sm tracking-tight mb-2">{ft('bento2Title')}</h3>
            <p className="text-slate-500 text-xs leading-relaxed font-normal">
              {ft('bento2Desc')}
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center mb-5 border border-violet-100">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-slate-900 font-bold text-sm tracking-tight mb-2">{ft('bento3Title')}</h3>
            <p className="text-slate-500 text-xs leading-relaxed font-normal">
              {ft('bento3Desc')}
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-5 border border-orange-100">
              <Fingerprint className="w-5 h-5" />
            </div>
            <h3 className="text-slate-900 font-bold text-sm tracking-tight mb-2">{ft('bento4Title')}</h3>
            <p className="text-slate-500 text-xs leading-relaxed font-normal">
              {ft('bento4Desc')}
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center mb-5 border border-pink-100">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-slate-900 font-bold text-sm tracking-tight mb-2">{ft('bento5Title')}</h3>
            <p className="text-slate-500 text-xs leading-relaxed font-normal">
              {ft('bento5Desc')}
            </p>
          </div>

          {/* Card 6 */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 border border-blue-100">
              <Code className="w-5 h-5" />
            </div>
            <h3 className="text-slate-900 font-bold text-sm tracking-tight mb-2">{ft('bento6Title')}</h3>
            <p className="text-slate-500 text-xs leading-relaxed font-normal">
              {ft('bento6Desc')}
            </p>
          </div>

        </div>
      </div>

      {/* High impact banner matching Identra CTA style */}
      <div className="bg-[#FAFBFD] pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-[#818CF8] via-[#6366F1] to-[#4F46E5] text-white rounded-[32px] p-8 md:p-14 lg:p-16 relative overflow-hidden shadow-xl shadow-indigo-950/10">
            {/* Background glowing circle */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-indigo-200/10 rounded-full blur-[60px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl space-y-4">
              <h2 className="font-display text-3xl sm:text-4xl md:text-[44px] font-bold tracking-tight text-white leading-none">
                {ft('ctaTitle')}
              </h2>
              <p className="text-indigo-50 text-sm md:text-base leading-relaxed">
                {ft('ctaDesc')}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button 
                  onClick={onOpenSandbox}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-indigo-600 font-bold rounded-full text-sm shadow-md transition-all hover:shadow-lg"
                  id="flow_cta_demo_btn"
                >
                  <span>{ft('btnRequestApiKey')}</span>
                  <ArrowRight className="w-4 h-4 text-indigo-600" />
                </button>
                <button 
                  onClick={onOpenSandbox}
                  className="inline-flex items-center gap-1.5 px-6 py-3.5 text-white hover:text-indigo-100 font-bold text-sm transition"
                  id="flow_cta_sandbox_btn"
                >
                  <span>{ft('btnExploreDocs')}</span>
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
