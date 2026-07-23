/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, ShieldCheck, Share2, Sparkles, 
  RefreshCw, Key, Users, CheckCircle2, AlertTriangle, 
  Fingerprint, Lock, Eye, Smile, ChevronDown, Check, 
  HelpCircle, Smartphone, Database, CheckCircle, EyeOff, ClipboardCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { CONNECT_TRANSLATIONS } from '../translations/ConnectPageTranslations';

interface ConnectPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

export default function ConnectPage({ onOpenSandbox, onBackToLanding, onViewChange }: ConnectPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(CONNECT_TRANSLATIONS, language as keyof typeof CONNECT_TRANSLATIONS, 'CONNECT_TRANSLATIONS');

  // 1. Interactive Demo Simulator State
  const [demoStep, setDemoStep] = useState<'start' | 'otp' | 'authorize' | 'success'>('start');
  const [phoneNumber, setPhoneNumber] = useState('555-019-2834');
  const [otpCode, setOtpCode] = useState(['', '', '', '']);
  const [otpError, setOtpError] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState({
    idCard: true,
    selfie: true,
    nameDob: true,
    address: false,
  });

  // 2. Interactive "How it Works" Phase State
  const [activeTab, setActiveTab] = useState<'verify' | 'reuse' | 'control'>('verify');

  // 3. FAQ Accordion State
  const [expandedFaq, setExpandedFaq] = useState<string | null>('how-secure');

  // 4. Customizing Policy Sandbox State
  const [verificationFrequency, setVerificationFrequency] = useState<'always' | '30days' | '90days' | 'never'>('30days');
  const [biometricRequirement, setBiometricRequirement] = useState(true);
  const [autoRevoke, setAutoRevoke] = useState(false);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);
    setOtpError(false);

    // Auto focus next input
    if (value !== '' && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = () => {
    const combinedCode = otpCode.join('');
    if (combinedCode === '1234') {
      setDemoStep('authorize');
    } else {
      setOtpError(true);
    }
  };

  const resetSimulator = () => {
    setDemoStep('start');
    setOtpCode(['', '', '', '']);
    setOtpError(false);
  };

  const faqs = t.faqs;

  const frequencyLabel = {
    always: t.alwaysAsk,
    "30days": t.thirtyDays,
    "90days": t.ninetyDays,
    never: t.enrollOnce
  };

  const simulationText = verificationFrequency === "always"
    ? t.simAlways
    : verificationFrequency === "30days"
    ? t.sim30.replace("{status}", biometricRequirement ? t.required : t.disabled)
    : verificationFrequency === "90days"
    ? t.sim90
    : t.simNever;

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-slate-800 antialiased selection:bg-[#354CE1]/10 selection:text-[#354CE1]">
      
      {/* 1. Header Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-tr from-[#354CE1] via-[#5F3CF3] to-[#00D4B2] text-white pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)]" />
        <div className="absolute top-1/4 left-1/10 w-48 h-48 bg-yellow-400/25 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/10 w-72 h-72 bg-[#00E5FF]/20 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <button 
            onClick={onBackToLanding}
            className="group inline-flex items-center gap-2 text-blue-100 hover:text-white text-xs font-semibold mb-8 transition"
            id="back-to-landing-btn"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            {t.backToPlatform}
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-[11px] font-bold tracking-wider text-yellow-300 uppercase border border-white/25 shadow-sm">
                <Share2 className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
                {t.badge}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-medium tracking-tight text-white leading-[1.1]">
                {t.heroTitle}
              </h1>
              <p className="text-base sm:text-lg text-white/95 max-w-xl font-normal leading-relaxed">
                {t.heroDesc}
              </p>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={onOpenSandbox}
                  className="bg-white hover:bg-teal-50 text-[#354CE1] font-semibold text-sm px-7 py-3.5 rounded-full transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-950/20 cursor-pointer"
                  id="get-demo-hero-btn"
                >
                  {t.tryDemo}
                  <ArrowRight className="w-4 h-4 text-[#354CE1]" />
                </button>
                <button
                  onClick={onOpenSandbox}
                  className="border border-white/20 hover:bg-white/10 text-white font-semibold text-sm px-7 py-3.5 rounded-full transition flex items-center justify-center gap-1 cursor-pointer"
                  id="try-sandbox-hero-btn"
                >
                  {t.trySandbox}
                </button>
              </div>

              {/* Conversion and Trust Metrics */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 max-w-lg">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-white">{t.metrics[0].value}</p>
                  <p className="text-[10px] text-indigo-200 uppercase tracking-wider font-semibold mt-1">{t.metrics[0].label}</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-white">{t.metrics[1].value}</p>
                  <p className="text-[10px] text-indigo-200 uppercase tracking-wider font-semibold mt-1">{t.metrics[1].label}</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-white">{t.metrics[2].value}</p>
                  <p className="text-[10px] text-indigo-200 uppercase tracking-wider font-semibold mt-1">{t.metrics[2].label}</p>
                </div>
              </div>
            </div>

            {/* Simulated Live Connect Flow Mockup on Hero Right */}
            <div className="lg:col-span-5 relative">
              <div className="bg-[#0B1528] rounded-2xl border border-slate-800 p-5 shadow-2xl relative overflow-hidden text-slate-300 font-sans text-xs min-h-[420px] flex flex-col justify-between">
                
                {/* Simulated Partner Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-[#354CE1]/20 flex items-center justify-center text-[#4E66FF] font-bold text-[10px]">{t.partnerInitial}</div>
                    <div>
                      <span className="font-bold text-white text-[11px] block">{t.partnerName}</span>
                      <span className="text-[9px] text-slate-500">{t.partnerApp}</span>
                    </div>
                  </div>
                  <div className="text-[9px] text-[#354CE1] font-bold bg-[#354CE1]/10 px-2.5 py-1 rounded-md border border-[#354CE1]/20 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#354CE1]" />
                    {t.secureSandbox}
                  </div>
                </div>

                {/* Simulated Steps Container */}
                <div className="flex-1 flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    
                    {/* Step 1: Start verification */}
                    {demoStep === 'start' && (
                      <motion.div 
                        key="start"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4 py-2"
                      >
                        <div className="text-center space-y-2">
                          <div className="w-12 h-12 rounded-full bg-[#354CE1]/10 flex items-center justify-center mx-auto text-[#354CE1] border border-[#354CE1]/20">
                            <Fingerprint className="w-6 h-6" />
                          </div>
                          <h3 className="text-sm font-bold text-white">{t.startTitle}</h3>
                          <p className="text-[11px] text-slate-400">{t.startDesc}</p>
                        </div>

                        <div className="space-y-2 max-w-xs mx-auto">
                          <label className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">{t.phoneNumber}</label>
                          <div className="relative">
                            <input 
                              type="text" 
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2.5 px-3 text-white text-xs focus:outline-none focus:border-[#354CE1]" 
                            />
                            <span className="absolute right-3 top-2.5 text-[10px] text-slate-500">{t.countryCode}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => setDemoStep('otp')}
                          className="w-full max-w-xs mx-auto bg-[#354CE1] hover:bg-[#2539BE] text-white font-bold py-2.5 rounded-lg transition text-center flex items-center justify-center gap-1"
                        >
                          {t.verifyConnect}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    )}

                    {/* Step 2: OTP Entry */}
                    {demoStep === 'otp' && (
                      <motion.div 
                        key="otp"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4 py-2"
                      >
                        <div className="text-center space-y-2">
                          <h3 className="text-sm font-bold text-white">{t.otpTitle}</h3>
                          <p className="text-[11px] text-slate-400">{t.otpDescPrefix} <span className="text-slate-200">{phoneNumber}</span>.</p>
                          <p className="text-[10px] text-indigo-400 font-semibold">{t.otpTestPrefix} <span className="underline">{t.otpTestCode}</span> {t.otpTestSuffix}</p>
                        </div>

                        <div className="flex justify-center gap-2.5 py-2">
                          {otpCode.map((digit, i) => (
                            <input
                              key={i}
                              id={`otp-${i}`}
                              type="text"
                              value={digit}
                              onChange={(e) => handleOtpChange(i, e.target.value)}
                              className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-lg text-center text-white text-lg font-bold focus:outline-none focus:border-[#354CE1]"
                            />
                          ))}
                        </div>

                        {otpError && (
                          <p className="text-center text-xs text-red-400 font-semibold animate-shake">{t.otpError}</p>
                        )}

                        <div className="flex gap-2 max-w-xs mx-auto">
                          <button
                            onClick={() => setDemoStep('start')}
                            className="flex-1 border border-slate-800 hover:bg-slate-900 text-slate-400 py-2 rounded-lg text-xs font-semibold text-center"
                          >
                            {t.back}
                          </button>
                          <button
                            onClick={handleVerifyOtp}
                            className="flex-1 bg-[#354CE1] hover:bg-[#2539BE] text-white py-2 rounded-lg text-xs font-bold text-center"
                          >
                            {t.confirm}
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Authorize and Share */}
                    {demoStep === 'authorize' && (
                      <motion.div 
                        key="authorize"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4 py-2"
                      >
                        <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-800 space-y-1">
                          <p className="text-[9px] text-slate-500 uppercase">{t.permissionsLabel}</p>
                          <h4 className="text-xs font-bold text-white">{t.permissionsTitle}</h4>
                        </div>

                        <div className="space-y-2">
                          <label className="flex items-center justify-between p-2.5 bg-slate-900/60 rounded-lg border border-slate-800 cursor-pointer">
                            <span className="text-slate-300">{t.permissionId}</span>
                            <input 
                              type="checkbox" 
                              checked={selectedPermissions.idCard}
                              onChange={(e) => setSelectedPermissions({...selectedPermissions, idCard: e.target.checked})}
                              className="accent-[#354CE1]" 
                            />
                          </label>
                          <label className="flex items-center justify-between p-2.5 bg-slate-900/60 rounded-lg border border-slate-800 cursor-pointer">
                            <span className="text-slate-300">{t.permissionSelfie}</span>
                            <input 
                              type="checkbox" 
                              checked={selectedPermissions.selfie}
                              onChange={(e) => setSelectedPermissions({...selectedPermissions, selfie: e.target.checked})}
                              className="accent-[#354CE1]" 
                            />
                          </label>
                          <label className="flex items-center justify-between p-2.5 bg-slate-900/60 rounded-lg border border-slate-800 cursor-pointer">
                            <span className="text-slate-300">{t.permissionNameDob}</span>
                            <input 
                              type="checkbox" 
                              checked={selectedPermissions.nameDob}
                              onChange={(e) => setSelectedPermissions({...selectedPermissions, nameDob: e.target.checked})}
                              className="accent-[#354CE1]" 
                            />
                          </label>
                        </div>

                        <div className="text-[10px] text-slate-500 leading-relaxed text-center">
                          {t.shareConsent}
                        </div>

                        <button
                          onClick={() => setDemoStep('success')}
                          className="w-full bg-[#354CE1] hover:bg-[#2539BE] text-white font-bold py-2.5 rounded-lg transition text-center flex items-center justify-center gap-1.5"
                        >
                          <Lock className="w-3.5 h-3.5" />
                          {t.shareProfile}
                        </button>
                      </motion.div>
                    )}

                    {/* Step 4: Success */}
                    {demoStep === 'success' && (
                      <motion.div 
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="text-center space-y-4 py-4"
                      >
                        <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                          <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-sm font-bold text-white">{t.successTitle}</h3>
                          <p className="text-[11px] text-slate-400">{t.successDesc}</p>
                        </div>
                        <div className="bg-emerald-500/5 rounded-xl p-3 border border-emerald-500/20 text-[11px] text-emerald-300 max-w-xs mx-auto text-left font-mono">
                          <p className="font-bold uppercase text-[9px] text-emerald-400 mb-1">{t.transmissionLog}</p>
                          <p>{t.logIdStatus}</p>
                          <p>{t.logHandshake}</p>
                          <p>{t.logSpeed}</p>
                        </div>
                        <button
                          onClick={resetSimulator}
                          className="text-xs text-[#354CE1] hover:text-[#2539BE] font-semibold underline underline-offset-2 block mx-auto"
                        >
                          {t.restartSimulation}
                        </button>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>

                {/* Simulated Footer */}
                <div className="border-t border-slate-800 pt-3 mt-4 text-[10px] text-slate-500 text-center flex items-center justify-center gap-1.5 select-none">
                  <Lock className="w-3 h-3 text-[#354CE1]" />
                  <span>{t.poweredBy}</span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Three Value Pillars Cards Section */}
      <section className="bg-[#11223F] pb-16 pt-12 text-white border-t border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition duration-300">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-300 mb-2">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-xs text-indigo-200 uppercase tracking-wide">{t.valueCards[0].eyebrow}</h4>
              <p className="text-base font-semibold text-white">{t.valueCards[0].title}</p>
              <p className="text-xs text-indigo-100/80 leading-relaxed">
                {t.valueCards[0].desc}
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition duration-300">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-300 mb-2">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-xs text-indigo-200 uppercase tracking-wide">{t.valueCards[1].eyebrow}</h4>
              <p className="text-base font-semibold text-white">{t.valueCards[1].title}</p>
              <p className="text-xs text-indigo-100/80 leading-relaxed">
                {t.valueCards[1].desc}
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition duration-300">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-300 mb-2">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-xs text-indigo-200 uppercase tracking-wide">{t.valueCards[2].eyebrow}</h4>
              <p className="text-base font-semibold text-white">{t.valueCards[2].title}</p>
              <p className="text-xs text-indigo-100/80 leading-relaxed">
                {t.valueCards[2].desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Deep Dive - Interactive How Identra Connect Works */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-medium tracking-tight text-slate-900 leading-tight">
            {t.howTitle}
          </h2>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">
            {t.howDesc}
          </p>
        </div>

        {/* Dynamic Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-slate-100 p-1.5 rounded-full border border-slate-200/60 shadow-sm">
            <button
              onClick={() => setActiveTab('verify')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${activeTab === 'verify' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <ClipboardCheck className="w-4 h-4" />
              {t.tabVerify}
            </button>
            <button
              onClick={() => setActiveTab('reuse')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${activeTab === 'reuse' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <Share2 className="w-4 h-4" />
              {t.tabReuse}
            </button>
            <button
              onClick={() => setActiveTab('control')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${activeTab === 'control' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <Eye className="w-4 h-4" />
              {t.tabControl}
            </button>
          </div>
        </div>

        {/* Tab content renders */}
        <AnimatePresence mode="wait">
          {activeTab === 'verify' && (
            <motion.div
              key="verify"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-[#354CE1] rounded-full text-[10px] font-bold tracking-wider uppercase">
                  {t.verifyStep}
                </div>
                <h3 className="text-xl sm:text-2xl font-sans font-semibold text-slate-900">
                  {t.verifyTitle}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t.verifyDesc1}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t.verifyDesc2}
                </p>
                <div className="space-y-2 border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                    <span>{t.verifyBullet1}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                    <span>{t.verifyBullet2}</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/60">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">{t.enrollmentProgress}</span>
                  
                  {/* Visual flowchart mockup */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-100 rounded-lg text-xs">
                      <div className="flex items-center gap-2 text-emerald-800">
                        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />
                        <span className="font-semibold">{t.governmentIdVerified}</span>
                      </div>
                      <span className="text-emerald-600 font-bold font-mono">{t.ok}</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-100 rounded-lg text-xs">
                      <div className="flex items-center gap-2 text-emerald-800">
                        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />
                        <span className="font-semibold">{t.portraitLivenessPassed}</span>
                      </div>
                      <span className="text-emerald-600 font-bold font-mono">{t.ok}</span>
                    </div>

                    <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-lg space-y-2 text-xs">
                      <div className="flex items-center justify-between text-indigo-900 font-semibold">
                        <span className="flex items-center gap-1.5">
                          <Lock className="w-4 h-4 text-[#354CE1]" />
                          {t.encryptingIdentity}
                        </span>
                        <span className="text-[#354CE1] font-bold font-mono">{t.completePercent}</span>
                      </div>
                      <div className="w-full bg-indigo-200/30 rounded-full h-1.5">
                        <div className="bg-[#354CE1] h-1.5 rounded-full w-full" />
                      </div>
                      <p className="text-[10px] text-slate-500 leading-normal">{t.linkedSecurely}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'reuse' && (
            <motion.div
              key="reuse"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-[#354CE1] rounded-full text-[10px] font-bold tracking-wider uppercase">
                  {t.reuseStep}
                </div>
                <h3 className="text-xl sm:text-2xl font-sans font-semibold text-slate-900">
                  {t.reuseTitle}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t.reuseDesc1}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t.reuseDesc2}
                </p>
                <div className="space-y-2 border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                    <span>{t.reuseBullet1}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                    <span>{t.reuseBullet2}</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/60">
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">{t.returningUserFlow}</span>
                  
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-50 text-[#354CE1] flex items-center justify-center font-bold text-xs">
                        <Smile className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">{t.returningUserRecognized}</p>
                        <p className="text-[10px] text-slate-400">{t.identraProfileDetected}</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-indigo-600 font-bold">{t.oneTapReady}</span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span>{t.facialRecognition}</span>
                      <span className="text-emerald-600">{t.passed}</span>
                    </div>
                    <div className="flex items-center gap-3 bg-emerald-50/50 p-2 rounded-lg border border-emerald-100 text-[11px] text-emerald-800 font-medium">
                      <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                      <span>{t.faceIdConfirmed}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'control' && (
            <motion.div
              key="control"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-[#354CE1] rounded-full text-[10px] font-bold tracking-wider uppercase">
                  {t.controlStep}
                </div>
                <h3 className="text-xl sm:text-2xl font-sans font-semibold text-slate-900">
                  {t.controlTitle}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t.controlDesc1}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t.controlDesc2}
                </p>
                <div className="space-y-2 border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                    <span>{t.controlBullet1}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                    <span>{t.controlBullet2}</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/60">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">{t.myConnectedApps}</span>
                  
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                      <div>
                        <p className="font-bold text-slate-850">{t.apexCorp}</p>
                        <p className="text-[10px] text-slate-400">{t.apexGranted}</p>
                      </div>
                      <button className="text-[10px] font-bold text-red-600 hover:bg-red-50 px-2.5 py-1 rounded-md border border-red-100 transition">
                        {t.revokeAccess}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                      <div>
                        <p className="font-bold text-slate-850">{t.zenExchange}</p>
                        <p className="text-[10px] text-slate-400">{t.zenGranted}</p>
                      </div>
                      <button className="text-[10px] font-bold text-red-600 hover:bg-red-50 px-2.5 py-1 rounded-md border border-red-100 transition">
                        {t.revokeAccess}
                      </button>
                    </div>

                    <div className="p-2.5 bg-indigo-50/40 rounded-xl border border-indigo-100/60 text-[10px] text-slate-500 text-center font-mono">
                      {t.revocationSync}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 4. Interactive Policy Builder Section */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden border-y border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(53,76,225,0.2),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold tracking-wider text-indigo-200 uppercase border border-white/15">
                <Smartphone className="w-3.5 h-3.5" />
                {t.adaptivePolicies}
              </div>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium tracking-tight text-white leading-tight">
                {t.policyTitle}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {t.policyDesc}
              </p>
              
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3 text-xs">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="font-bold text-white">{t.policyBenefit1Title}</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">{t.policyBenefit1Desc}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="font-bold text-white">{t.policyBenefit2Title}</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">{t.policyBenefit2Desc}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Policy Panel Mockup */}
            <div className="lg:col-span-6 bg-[#0B1528] rounded-2xl border border-slate-800 p-6 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">{t.policySettings}</span>
                  <span className="text-xs font-bold text-white">{t.ruleProfile}</span>
                </div>
                <span className="text-[9px] text-[#354CE1] font-bold bg-[#354CE1]/15 px-2 py-0.5 rounded border border-[#354CE1]/20">{t.active}</span>
              </div>

              {/* Policy option 1 */}
              <div className="space-y-1.5 text-xs">
                <label className="font-bold text-slate-300 block">{t.reverifyFrequency}</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['always', '30days', '90days', 'never'] as const).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setVerificationFrequency(opt)}
                      className={`py-2 px-1 text-center font-semibold text-[10px] rounded-lg border transition ${
                        verificationFrequency === opt 
                          ? 'bg-[#354CE1] text-white border-[#354CE1]' 
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {frequencyLabel[opt]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Policy option 2 */}
              <div className="flex items-center justify-between p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs">
                <div>
                  <p className="font-bold text-slate-300">{t.biometricRequired}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{t.biometricDesc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={biometricRequirement}
                    onChange={(e) => setBiometricRequirement(e.target.checked)} 
                  />
                  <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#354CE1]"></div>
                </label>
              </div>

              {/* Policy option 3 */}
              <div className="flex items-center justify-between p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs">
                <div>
                  <p className="font-bold text-slate-300">{t.autoRevokeTitle}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{t.autoRevokeDesc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={autoRevoke}
                    onChange={(e) => setAutoRevoke(e.target.checked)} 
                  />
                  <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#354CE1]"></div>
                </label>
              </div>

              {/* Dynamic simulation response based on state values */}
              <div className="bg-[#354CE1]/10 rounded-xl p-3 border border-[#354CE1]/20 text-[11px] text-[#354CE1] flex items-start gap-2">
                <span className="font-bold">{t.rulesSimulation}</span>
                <span className="text-slate-300 font-sans leading-relaxed">
                  {simulationText}
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. FAQs Section */}
      <section className="py-20 max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-sans font-medium tracking-tight text-slate-900 leading-tight">
            {t.faqTitle}
          </h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            {t.faqDesc}
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq) => {
            const isExpanded = expandedFaq === faq.id;
            return (
              <div 
                key={faq.id} 
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition"
              >
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : faq.id)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-slate-800 hover:text-[#354CE1] transition"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-[#354CE1]' : ''}`} />
                </button>
                
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.15 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 text-xs sm:text-sm text-slate-500 border-t border-slate-100 bg-[#FAFBFD] leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Strong CTA Call to Action */}
      <section className="bg-gradient-to-tr from-[#354CE1] to-[#2539BE] text-white py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]" />
        <div className="max-w-2xl mx-auto px-6 relative z-10 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-sans font-medium tracking-tight leading-tight">
            {t.ctaTitle}
          </h2>
          <p className="text-sm text-indigo-100 max-w-md mx-auto leading-relaxed">
            {t.ctaDesc}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenSandbox}
              className="w-full sm:w-auto bg-white hover:bg-indigo-50 text-[#354CE1] font-bold text-sm px-8 py-4 rounded-full shadow-lg transition"
              id="cta-sandbox-btn"
            >
              {t.ctaSandbox}
            </button>
            <button
              onClick={onOpenSandbox}
              className="w-full sm:w-auto border border-white/20 hover:bg-white/10 text-white font-bold text-sm px-8 py-4 rounded-full transition"
              id="cta-demo-btn"
            >
              {t.ctaExpert}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
