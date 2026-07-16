/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowRight, ChevronDown, ChevronUp, Globe, Scan, Smartphone, 
  Check, HelpCircle, FileText, Lock, Users, ArrowUpRight, 
  Zap, Play, CheckCircle2, ShieldCheck, Mail, Building2, User, 
  Settings, Camera, Sparkles, BookOpen, Clock, ArrowLeft
} from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';

import { GOVERNMENT_ID_TRANSLATIONS } from '../translations/GovernmentIdPageTranslations';

interface GovernmentIdPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
}

export default function GovernmentIdPage({ onOpenSandbox, onBackToLanding }: GovernmentIdPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(GOVERNMENT_ID_TRANSLATIONS, language as keyof typeof GOVERNMENT_ID_TRANSLATIONS, 'GOVERNMENT_ID_TRANSLATIONS');

  // 1. "How it works" interactive section state
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);

  // Playground switches for Step 1: Configure
  const [requireSelfie, setRequireSelfie] = useState(true);
  const [allowedDocTypes, setAllowedDocTypes] = useState({
    passport: true,
    driversLicense: true,
    nationalId: true
  });
  const [restrictMobile, setRestrictMobile] = useState(false);
  const [allowedCountries, setAllowedCountries] = useState('all');

  // Interactive step 2: Collect mockup states
  const [simulatedDocCaptured, setSimulatedDocCaptured] = useState(false);
  const [captureFlash, setCaptureFlash] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  // Trigger capture animation
  const handleSimulateCapture = () => {
    setIsCapturing(true);
    setTimeout(() => {
      setCaptureFlash(true);
      setTimeout(() => {
        setCaptureFlash(false);
        setSimulatedDocCaptured(true);
        setIsCapturing(false);
      }, 300);
    }, 1500);
  };

  // Reset simulated capture
  const handleResetCapture = () => {
    setSimulatedDocCaptured(false);
  };

  // 2. Accordion features state
  const [expandedAccordion, setExpandedAccordion] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setExpandedAccordion(prev => (prev === idx ? null : idx));
  };

  // 3. Lead Demo Form states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    website: '',
    jobTitle: ''
  });
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [demoStep, setDemoStep] = useState<'form' | 'dashboard'>('form');

  // Custom live demo check states (simulating backend verification)
  const [runningDemoCheck, setRunningDemoCheck] = useState(false);
  const [demoCheckLogCount, setDemoCheckLogCount] = useState(0);
  const [demoCheckStatus, setDemoCheckStatus] = useState<'idle' | 'running' | 'success'>('idle');
  const demoCheckLogSteps = React.useMemo(() => (
    t.logs.map(log => 
      log.replace('{name}', `${formData.firstName} ${formData.lastName}`)
         .replace('{website}', formData.website || 'N/A')
    )
  ), [formData.firstName, formData.lastName, formData.website, t.logs]);
  const demoCheckLogs = demoCheckLogSteps.slice(0, demoCheckLogCount);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.company) {
      alert(t.formRequiredAlert);
      return;
    }
    setDemoSubmitted(true);
    setDemoStep('dashboard');
    startSimulatedVerificationCheck();
  };

  const startSimulatedVerificationCheck = () => {
    setRunningDemoCheck(true);
    setDemoCheckStatus('running');
    setDemoCheckLogCount(0);

    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < demoCheckLogSteps.length) {
        setDemoCheckLogCount(currentIdx + 1);
        currentIdx++;
      } else {
        clearInterval(interval);
        setRunningDemoCheck(false);
        setDemoCheckStatus('success');
      }
    }, 800);
  };

  // 4. Article overlays / "Keep learning" state
  const [activeArticleId, setActiveArticleId] = useState<number | null>(null);

  const ARTICLES = [
    {
      id: 1,
      ...t.articles[1]
    },
    {
      id: 2,
      ...t.articles[2]
    },
    {
      id: 3,
      ...t.articles[3]
    }
  ];

  const FEATURES = t.features;

  return (
    <div className="bg-[#FAFBFD] font-sans text-slate-800 antialiased relative min-h-screen">
      {/* 1. BRAND GRADIENT HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-tr from-[#354CE1] via-[#5F3CF3] to-[#00D4B2] text-white pt-16 pb-24 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)]" />
        <div className="absolute top-1/4 left-1/10 w-48 h-48 bg-yellow-400/25 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/10 w-72 h-72 bg-[#00E5FF]/20 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb / Back button */}
          <button 
            onClick={onBackToLanding}
            className="inline-flex items-center gap-1.5 text-xs text-indigo-100 hover:text-white transition font-semibold mb-8 border border-white/20 bg-white/10 px-3.5 py-1.5 rounded-full cursor-pointer backdrop-blur-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.backToMain}</span>
          </button>

          {/* Core Hero Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/20 text-yellow-300 font-bold text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm border border-white/25">
                <Scan className="w-3.5 h-3.5" />
                <span>{t.govIdVerification}</span>
              </div>

              <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.08] text-white">
                {t.heroTitle}
              </h1>

              <p className="text-white/95 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl font-normal">
                {t.heroDesc}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button 
                  onClick={onOpenSandbox}
                  className="bg-white hover:bg-teal-50 text-[#354CE1] font-bold text-sm px-7 py-3.5 rounded-full shadow-lg hover:shadow-xl transition flex items-center gap-2 cursor-pointer"
                >
                  {t.getDemo}
                </button>
                <button 
                  onClick={onOpenSandbox}
                  className="inline-flex items-center gap-1.5 text-sm text-white hover:text-teal-100 font-bold tracking-wide transition group cursor-pointer"
                >
                  <span>{t.tryItNow}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right side graphic mockup */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm bg-emerald-800/20 border border-white/20 rounded-3xl p-6 backdrop-blur-md shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-700">
                <div className="absolute top-4 left-4 flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                
                <div className="pt-6 pb-2 space-y-4">
                  <div className="bg-emerald-900/40 rounded-xl p-4 border border-emerald-500/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-100 uppercase tracking-wider">{t.passportValidation}</span>
                      <span className="text-[10px] bg-emerald-400/20 text-emerald-100 px-2 py-0.5 rounded font-mono font-bold">{t.hash256}</span>
                    </div>
                    <div className="h-2 w-full bg-emerald-950/40 rounded-full overflow-hidden">
                      <div className="h-full w-4/5 bg-emerald-300 rounded-full animate-pulse" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-emerald-200">
                      <div><span>{t.ocrExtraction}</span> <span className="text-white font-bold">{t.pass}</span></div>
                      <div><span>{t.hologramCheck}</span> <span className="text-white font-bold">{t.pass}</span></div>
                    </div>
                  </div>

                  <div className="bg-white text-slate-900 rounded-xl p-4 shadow-md space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800 leading-tight">{t.samplePersonName}</p>
                          <p className="text-[10px] text-slate-400 leading-none">{t.sampleIdNumber}</p>
                        </div>
                      </div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-1 rounded-full uppercase tracking-wider">{t.verified}</span>
                    </div>
                    <div className="border-t border-slate-100 pt-2 flex justify-between items-center text-[10px] text-slate-500">
                      <span>{t.faceMatchSimilarity}</span>
                      <span className="font-bold text-emerald-600">{t.similarity991}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Three Key Pillars of Hero */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 pt-10 border-t border-white/20 text-emerald-50">
            <div className="space-y-2">
              <div className="w-px h-10 bg-emerald-200/50 mb-4" />
              <h3 className="text-white font-bold text-lg">{t.heroPillar1Title}</h3>
              <p className="text-sm text-emerald-100 leading-relaxed">
                {t.heroPillar1Desc}
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-px h-10 bg-emerald-200/50 mb-4" />
              <h3 className="text-white font-bold text-lg">{t.heroPillar2Title}</h3>
              <p className="text-sm text-emerald-100 leading-relaxed">
                {t.heroPillar2Desc}
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-px h-10 bg-emerald-200/50 mb-4" />
              <h3 className="text-white font-bold text-lg">{t.heroPillar3Title}</h3>
              <p className="text-sm text-emerald-100 leading-relaxed">
                {t.heroPillar3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS (INTERACTIVE STEP PLAYGROUND) */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#354CE1]">{t.interactiveDemo}</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight">
                {t.howItWorks}
              </h2>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                {t.howItWorksDesc}
              </p>
            </div>

            {/* Stepper Tabs */}
            <div className="flex items-center gap-2 mt-6 md:mt-0 bg-slate-50 border border-slate-100 p-1.5 rounded-xl">
              {[
                { step: 1, label: t.step1 },
                { step: 2, label: t.step2 },
                { step: 3, label: t.step3 }
              ].map(s => (
                <button
                  key={s.step}
                  onClick={() => setActiveStep(s.step as 1 | 2 | 3)}
                  className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeStep === s.step 
                      ? 'bg-white text-[#354CE1] shadow-sm font-extrabold border-b-2 border-[#354CE1]' 
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Playground Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-slate-50 border border-slate-100 rounded-3xl p-8 shadow-sm">
            {/* Left Description Column */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
              <div>
                {activeStep === 1 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#354CE1] flex items-center justify-center">
                      <Settings className="w-5 h-5 animate-spin-slow" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 font-display tracking-tight">
                      {t.customizeCollectionFlow}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {t.step1Desc}
                    </p>
                    <div className="pt-4 border-t border-slate-200/80 space-y-2 text-xs font-semibold text-slate-400">
                      <p className="uppercase tracking-wider">{t.configureSettingsHint}</p>
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0F7654] flex items-center justify-center">
                      <Camera className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 font-display tracking-tight">
                      {t.seamlessMobileCapture}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {t.step2Desc}
                    </p>
                    <div className="pt-4 border-t border-slate-200/80 space-y-2 text-xs font-semibold text-slate-400">
                      <p className="uppercase tracking-wider">{t.takePhotoHint}</p>
                    </div>
                  </div>
                )}

                {activeStep === 3 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 font-display tracking-tight">
                      {t.automatedDecisioning}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {t.step3Desc}
                    </p>
                    <div className="pt-4 border-t border-slate-200/80 space-y-2 text-xs font-semibold text-slate-400">
                      <p className="uppercase tracking-wider">{t.decisioningHint}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Dynamic Settings panel (ONLY visible for step 1) */}
              {activeStep === 1 && (
                <div className="bg-white rounded-2xl border border-slate-150 p-5 space-y-4 shadow-sm mt-6 lg:mt-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block border-b border-slate-100 pb-2">{t.flowLogicRuleset}</span>
                  
                  {/* Selfie Required */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-800">{t.biometricSelfieCheck}</p>
                      <p className="text-[10px] text-slate-400">{t.requireLiveSelfie}</p>
                    </div>
                    <button 
                      onClick={() => setRequireSelfie(prev => !prev)}
                      className={`w-11 h-6 rounded-full transition relative flex items-center px-1.5 cursor-pointer ${requireSelfie ? 'bg-[#354CE1]' : 'bg-slate-200'}`}
                    >
                      <div className={`w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform ${requireSelfie ? 'translate-x-4.5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {/* Restrict Mobile Uploads */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-800">{t.deviceRestrictions}</p>
                      <p className="text-[10px] text-slate-400">{t.mobileOnly}</p>
                    </div>
                    <button 
                      onClick={() => setRestrictMobile(prev => !prev)}
                      className={`w-11 h-6 rounded-full transition relative flex items-center px-1.5 cursor-pointer ${restrictMobile ? 'bg-[#354CE1]' : 'bg-slate-200'}`}
                    >
                      <div className={`w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform ${restrictMobile ? 'translate-x-4.5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {/* Document Types */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <p className="text-[11px] font-bold text-slate-600">{t.allowedDocumentTypes}</p>
                    <div className="flex flex-wrap gap-2">
                      {['passport', 'driversLicense', 'nationalId'].map(type => (
                        <button
                          key={type}
                          onClick={() => setAllowedDocTypes(prev => ({ ...prev, [type]: !prev[type as keyof typeof allowedDocTypes] }))}
                          className={`px-2.5 py-1 rounded text-[10px] font-bold transition border cursor-pointer ${
                            allowedDocTypes[type as keyof typeof allowedDocTypes]
                              ? 'bg-indigo-50 border-indigo-200 text-[#354CE1]'
                              : 'bg-white border-slate-200 text-slate-400'
                          }`}
                        >
                          {type === 'driversLicense' ? t.driversLicense : type === 'nationalId' ? t.nationalId : t.passport}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Allowed Countries */}
                  <div className="space-y-1 pt-1">
                    <p className="text-[11px] font-bold text-slate-600">{t.allowedCountries}</p>
                    <select
                      value={allowedCountries}
                      onChange={(e) => setAllowedCountries(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium text-slate-700 outline-none"
                    >
                      <option value="all">{t.allCountries}</option>
                      <option value="domestic">{t.usAndCanadaOnly}</option>
                      <option value="strict">{t.euOnly}</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Tips for Step 2 */}
              {activeStep === 2 && (
                <div className="bg-emerald-50/50 rounded-2xl border border-emerald-100 p-5 space-y-3 mt-6 lg:mt-0 text-xs">
                  <span className="font-bold text-emerald-800 uppercase tracking-wider block text-[10px]">{t.autoCaptureIntelligence}</span>
                  <div className="flex gap-2.5 items-start">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Camera className="w-3 h-3 text-emerald-600" />
                    </div>
                    <p className="text-emerald-700 leading-relaxed">
                      {t.autoCaptureIntelligenceDesc}
                    </p>
                  </div>
                </div>
              )}

              {/* Tips for Step 3 */}
              {activeStep === 3 && (
                <div className="bg-purple-50/50 rounded-2xl border border-purple-100 p-5 space-y-3 mt-6 lg:mt-0 text-xs">
                  <span className="font-bold text-purple-800 uppercase tracking-wider block text-[10px]">{t.decisioningEngine}</span>
                  <div className="flex gap-2.5 items-start">
                    <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Zap className="w-3 h-3 text-purple-600" />
                    </div>
                    <p className="text-purple-700 leading-relaxed">
                      {t.decisioningEngineDesc}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Interactive Mockup Column */}
            <div className="lg:col-span-7 flex justify-center relative min-h-[500px]">
              
              {/* Phone Mockup Frame */}
              <div className="w-[280px] h-[580px] bg-slate-900 rounded-[40px] shadow-2xl border-[8px] border-slate-900 relative overflow-hidden flex flex-col">
                {/* Dynamic notch */}
                <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
                  <div className="w-24 h-5 bg-slate-900 rounded-b-xl" />
                </div>

                {/* PHONE HEADER */}
                <div className="h-14 bg-white flex items-end justify-between px-5 pb-2 text-slate-800 shrink-0 z-10 border-b border-slate-100">
                  <span className="text-[10px] font-bold">{t.sampleTime}</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-2.5 border border-slate-800 rounded-[2px]" />
                    <div className="w-3 h-2.5 bg-slate-800 rounded-[2px]" />
                  </div>
                </div>

                {/* PHONE CONTENT */}
                <div className="p-5 flex-1 flex flex-col justify-between overflow-y-auto bg-slate-50">
                    {/* STEP 1 PREVIEW */}
                    {activeStep === 1 && (
                      <div className="space-y-4 flex-1 flex flex-col justify-between animate-in fade-in duration-200">
                        <div className="space-y-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-50 text-[#354CE1] flex items-center justify-center mx-auto">
                            <ShieldCheck className="w-4 h-4" />
                          </div>
                          <div className="text-center space-y-1">
                            <p className="font-bold text-slate-800 text-sm">{t.verifyIdentity}</p>
                            <p className="text-[10px] text-slate-400 leading-tight">{t.verifyIdentityDesc}</p>
                          </div>

                          {/* Dynamic doc list based on selected checks */}
                          <div className="bg-white rounded-xl border border-slate-200/60 p-3.5 space-y-2">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t.allowedDocumentsList}</p>
                            
                            {allowedDocTypes.passport && (
                              <div className="flex items-center gap-2 border border-slate-100 p-2 rounded-lg bg-slate-50/50">
                                <FileText className="w-3.5 h-3.5 text-indigo-500" />
                                <span className="text-[11px] font-bold text-slate-700">{t.validPassport}</span>
                              </div>
                            )}
                            
                            {allowedDocTypes.driversLicense && (
                              <div className="flex items-center gap-2 border border-slate-100 p-2 rounded-lg bg-slate-50/50">
                                <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
                                <span className="text-[11px] font-bold text-slate-700">{t.validLicense}</span>
                              </div>
                            )}

                            {allowedDocTypes.nationalId && (
                              <div className="flex items-center gap-2 border border-slate-100 p-2 rounded-lg bg-slate-50/50">
                                <Globe className="w-3.5 h-3.5 text-[#354CE1]" />
                                <span className="text-[11px] font-bold text-slate-700">{t.validNationalId}</span>
                              </div>
                            )}

                            {!allowedDocTypes.passport && !allowedDocTypes.driversLicense && !allowedDocTypes.nationalId && (
                              <p className="text-[11px] text-red-500 italic font-medium text-center py-2">{t.pleaseSelectDoc}</p>
                            )}
                          </div>

                          {/* Rules summary block */}
                          <div className="space-y-1 border border-slate-150 rounded-xl p-2.5 bg-slate-100/50 text-[10px] font-medium text-slate-500">
                            {requireSelfie && <div className="flex items-center gap-1.5 text-emerald-700"><Check className="w-3 h-3 text-emerald-500" /> {t.biometricCheckActive}</div>}
                            {restrictMobile && <div className="flex items-center gap-1.5 text-indigo-700"><Check className="w-3 h-3 text-indigo-500" /> {t.deskFileDropBlocked}</div>}
                            <div className="flex items-center gap-1.5"><Check className="w-3 h-3 text-slate-400" /> {t.regionFilter} {allowedCountries === 'all' ? t.worldwide : allowedCountries === 'domestic' ? t.domestic : t.strict}</div>
                          </div>
                        </div>

                        <button 
                          disabled={!allowedDocTypes.passport && !allowedDocTypes.driversLicense && !allowedDocTypes.nationalId}
                          onClick={() => setActiveStep(2)}
                          className="w-full bg-[#354CE1] hover:bg-[#2539BE] text-white font-bold py-2.5 rounded-full text-[11px] shadow transition text-center mt-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {t.beginVerifying}
                        </button>
                      </div>
                    )}

                    {/* STEP 2 PREVIEW */}
                    {activeStep === 2 && (
                      <div className="flex-1 flex flex-col justify-between items-center animate-in fade-in duration-200">
                        <div className="w-full space-y-2 text-center">
                          <p className="font-bold text-slate-800 text-sm">{t.takePhotoOfId}</p>
                          <p className="text-[10px] text-slate-400">{t.positionId}</p>
                        </div>

                        {/* Camera Box */}
                        <div className="w-full aspect-[4/3] bg-slate-900 rounded-2xl relative overflow-hidden flex items-center justify-center border border-slate-700 shadow-inner">
                          {/* Simulated flash element */}
                          {captureFlash && (
                            <div className="absolute inset-0 bg-white z-20 animate-fade-out" />
                          )}

                          {/* Capture frame borders */}
                          <div className="absolute inset-4 border-2 border-dashed border-white/60 rounded-xl pointer-events-none flex items-center justify-center">
                            {isCapturing && (
                              <span className="text-[10px] font-bold text-white bg-black/60 px-2 py-1 rounded animate-pulse">{t.processing}</span>
                            )}
                          </div>

                          {simulatedDocCaptured ? (
                            <div className="absolute inset-0 bg-emerald-900/10 flex flex-col items-center justify-center p-3 animate-in fade-in duration-200">
                              {/* Miniature Mockup of captured license */}
                              <div className="w-44 h-28 bg-emerald-50 border-2 border-emerald-500 rounded-lg shadow-lg relative p-2 text-[6px] text-slate-600 font-mono flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                  <div className="space-y-0.5">
                                    <p className="font-bold text-slate-900 text-[8px]">{t.driverLicenseCaps}</p>
                                    <p>{t.usaIssuingRegion}</p>
                                  </div>
                                  <div className="w-5 h-5 bg-slate-300 rounded" />
                                </div>
                                <div className="space-y-0.5">
                                  <p className="font-bold">{t.sampleLicenseNumber}</p>
                                  <p>{t.sampleDob}</p>
                                </div>
                              </div>
                              <button 
                                onClick={handleResetCapture}
                                className="mt-2 text-[9px] text-[#354CE1] hover:underline font-bold bg-white px-2 py-1 rounded shadow cursor-pointer"
                              >
                                {t.resetSimulator}
                              </button>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-1.5 text-slate-500 select-none">
                              <Camera className="w-8 h-8 text-slate-500/60 animate-pulse" />
                              <span className="text-[9px] font-bold text-slate-400">{t.positionId}</span>
                            </div>
                          )}
                        </div>

                        <div className="w-full space-y-2">
                          <button 
                            onClick={handleSimulateCapture}
                            disabled={simulatedDocCaptured || isCapturing}
                            className={`w-full text-white font-bold py-2.5 rounded-full text-[11px] shadow transition text-center cursor-pointer ${
                              simulatedDocCaptured 
                                ? 'bg-emerald-500 hover:bg-emerald-600' 
                                : 'bg-[#354CE1] hover:bg-[#2539BE] disabled:bg-slate-400 disabled:cursor-not-allowed'
                            }`}
                          >
                            {isCapturing ? t.processing : simulatedDocCaptured ? t.uploadSuccessful : t.simulateCapture}
                          </button>
                          
                          {simulatedDocCaptured && (
                            <button 
                              onClick={() => setActiveStep(3)}
                              className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-2 rounded-full text-[11px] text-center transition cursor-pointer"
                            >{t.verifyDocument}</button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* STEP 3 PREVIEW */}
                    {activeStep === 3 && (
                      <div className="flex-1 flex flex-col justify-between animate-in fade-in duration-200">
                        <div className="space-y-3">
                          <div className="text-center space-y-1">
                            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-1">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <p className="font-bold text-slate-800 text-sm">{t.verificationComplete}</p>
                            <p className="text-[10px] text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full inline-block">{t.approvedHighTrust}</p>
                          </div>

                          {/* Biometric Match card */}
                          <div className="bg-white rounded-xl border border-slate-200/60 p-3 space-y-2.5 shadow-sm">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">{t.idAnalysisReport}</span>
                            
                            <div className="space-y-1.5 text-[10px] font-medium text-slate-600 font-mono">
                              <div className="flex justify-between border-b border-slate-100 pb-1">
                                <span>{t.nameMatch}</span>
                                <span className="font-bold text-emerald-600">{t.pass100}</span>
                              </div>
                              <div className="flex justify-between border-b border-slate-100 pb-1">
                                <span>{t.dobExtraction}</span>
                                <span className="font-bold text-emerald-600">{t.passDOB}</span>
                              </div>
                              <div className="flex justify-between border-b border-slate-100 pb-1">
                                <span>{t.expiryThreshold}</span>
                                <span className="font-bold text-emerald-600">{t.passValid}</span>
                              </div>
                              {requireSelfie && (
                                <div className="flex justify-between border-b border-slate-100 pb-1">
                                  <span>{t.faceMatch}</span>
                                  <span className="font-bold text-emerald-600">{t.pass991}</span>
                                </div>
                              )}
                              <div className="flex justify-between">
                                <span>{t.antiSpoofCheck}</span>
                                <span className="font-bold text-emerald-600">{t.passLiveness}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <button 
                          onClick={() => { setActiveStep(1); setSimulatedDocCaptured(false); }}
                          className="w-full border border-slate-200 text-slate-600 font-bold py-2.5 rounded-full text-[11px] transition text-center cursor-pointer hover:bg-slate-50 mt-4"
                        >
                          {t.restartPlayground}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>

      {/* 3. ACCORDION KEY FEATURES SECTION */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Sticky left heading info */}
          <div className="lg:col-span-5 lg:sticky lg:top-8 space-y-4">
            <div className="inline-block bg-indigo-50 border border-indigo-100 text-[#354CE1] font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">
              {t.keyFeaturesHeading}
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight leading-tight">
              {t.keyFeaturesTitle}
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              {t.keyFeaturesDesc}
            </p>
            <div className="pt-2">
              <button 
                onClick={onOpenSandbox}
                className="bg-black hover:bg-slate-800 text-white font-bold text-xs px-5 py-3 rounded-full shadow transition inline-flex items-center gap-1 cursor-pointer"
              >
                <span>{t.requestFullFeatures}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Accordion List */}
          <div className="lg:col-span-7 space-y-3">
            {FEATURES.map((item, idx) => {
              const isOpen = expandedAccordion === idx;
              return (
                <div 
                  key={idx} 
                  className={`bg-white rounded-2xl border transition-all duration-200 ${
                    isOpen 
                      ? 'border-[#354CE1] shadow-md shadow-indigo-100/30' 
                      : 'border-slate-200/60 hover:border-slate-350 hover:shadow-sm'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full p-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                  >
                    <span className={`text-sm md:text-base font-bold transition-colors ${isOpen ? 'text-[#354CE1]' : 'text-slate-800'}`}>
                      {item.title}
                    </span>
                    <div className={`p-1.5 rounded-full transition-colors ${isOpen ? 'bg-indigo-50 text-[#354CE1]' : 'bg-slate-50 text-slate-400'}`}>
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 animate-in fade-in duration-200">
                      <p className="text-xs md:text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. HOW TEAMS USE VERIFICATIONS (3 COLS) */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#354CE1]">{t.enterpriseWorkflows}</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight">
              {t.howTeamsUse}
            </h2>
            <p className="text-slate-500 text-sm md:text-base">
              {t.howTeamsUseDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: KYC Compliance */}
            <div className="bg-slate-50/50 border border-slate-150 p-8 rounded-3xl space-y-4 hover:shadow-sm hover:border-slate-300 transition-all duration-200">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#354CE1] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{t.kycCompliance}</h3>
              <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                {t.kycComplianceDesc}
              </p>
            </div>

            {/* Card 2: Identity Assurance */}
            <div className="bg-slate-50/50 border border-slate-150 p-8 rounded-3xl space-y-4 hover:shadow-sm hover:border-slate-300 transition-all duration-200">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0F7654] flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{t.identityAssurance}</h3>
              <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                {t.identityAssuranceDesc}
              </p>
            </div>

            {/* Card 3: Dynamic Friction */}
            <div className="bg-slate-50/50 border border-slate-150 p-8 rounded-3xl space-y-4 hover:shadow-sm hover:border-slate-300 transition-all duration-200">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Zap className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{t.dynamicFriction}</h3>
              <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                {t.dynamicFrictionDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIAL QUOTE PANEL */}
      <section className="bg-slate-900 text-white py-24 px-6 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-emerald-500/5 rounded-full blur-2xl" />

        <div className="max-w-5xl mx-auto relative z-10 space-y-10 text-center">
          {/* Quote mark icon */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <span className="text-4xl font-serif">{t.quoteMark}</span>
          </div>

          <p className="text-xl sm:text-2xl md:text-3xl font-display font-medium leading-relaxed max-w-4xl mx-auto text-slate-100">
            {t.testimonialQuote}
          </p>

          <div className="space-y-1.5 border-t border-slate-800 pt-8 max-w-sm mx-auto">
            <p className="font-bold text-white text-sm">{t.testimonialAuthor}</p>
            <p className="text-xs text-slate-400">{t.testimonialRole}</p>
          </div>

          {/* Company highlight card */}
          <div className="bg-slate-850 border border-slate-800 rounded-2xl p-6 max-w-xl mx-auto text-left flex flex-col sm:flex-row items-center gap-4">
            <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center font-bold text-indigo-400 text-xl shrink-0">{t.sixLockLogo}</div>
            <div className="space-y-1.5 text-center sm:text-left">
              <p className="text-xs text-slate-200 font-semibold leading-normal">
                {t.testimonialCompanyDesc}
              </p>
              <button 
                onClick={onOpenSandbox}
                className="text-indigo-400 hover:text-indigo-300 font-bold text-xs inline-flex items-center gap-1 cursor-pointer"
              >
                <span>{t.readCaseStudy}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE CUSTOM DEMO FORM & Personalized Sandbox */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Graphic & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-block bg-orange-50 border border-orange-150 text-orange-600 font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">
              {t.personalizedTrial}
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight leading-tight">
              {t.startCustomDemo}
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              {t.startCustomDemoDesc}
            </p>

            {/* Custom illustration placeholder block (yellowish arches) */}
            <div className="bg-amber-500/5 rounded-3xl p-6 border border-amber-200/50 aspect-video flex flex-col justify-between overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-28 h-28 bg-amber-200 rounded-full blur-2xl opacity-40 group-hover:scale-125 transition duration-300" />
              <div className="flex justify-between items-center z-10">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">{t.visualPlayground}</span>
                <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              </div>

              {/* Geometric architectural layout mirroring withidentra illustration styles */}
              <div className="flex gap-2 items-end justify-center h-28 relative">
                <div className="w-14 h-24 bg-amber-100 border-t-4 border-amber-400 rounded-t-full flex items-center justify-center">
                  <div className="w-6 h-12 bg-white rounded-t-full" />
                </div>
                <div className="w-14 h-28 bg-amber-400 rounded-t-full flex items-center justify-center shadow-md">
                  <User className="w-6 h-6 text-amber-900" />
                </div>
                <div className="w-14 h-16 bg-amber-200 border-t-2 border-amber-300 rounded-t-full flex items-center justify-center">
                  <div className="w-4.5 h-8 bg-white rounded-t-full" />
                </div>
              </div>

              <span className="text-[10px] text-amber-700/80 font-semibold text-center z-10">
                {t.inputCredentialsToPreview}
              </span>
            </div>
          </div>

          {/* Right Column Form or Dynamic Live Sandbox Dashboard */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-150 p-8 sm:p-10 rounded-3xl shadow-sm">
            {demoStep === 'form' ? (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">{t.personalizeYourSandbox}</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">{t.demoFirstName}</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input 
                        type="text" 
                        required
                        placeholder="John" 
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        className="w-full text-xs font-medium bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-3 text-slate-800 outline-none focus:border-[#354CE1] focus:ring-2 focus:ring-[#354CE1]/10 transition"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">{t.demoLastName}</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input 
                        type="text" 
                        required
                        placeholder="Doe" 
                        value={formData.lastName}
                        onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        className="w-full text-xs font-medium bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-3 text-slate-800 outline-none focus:border-[#354CE1] focus:ring-2 focus:ring-[#354CE1]/10 transition"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">{t.emailAddress}</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="email" 
                      required
                      placeholder="john@yourcompany.com" 
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full text-xs font-medium bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-3 text-slate-800 outline-none focus:border-[#354CE1] focus:ring-2 focus:ring-[#354CE1]/10 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">{t.demoCompanyName}</label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input 
                        type="text" 
                        required
                        placeholder="Acme Corp" 
                        value={formData.company}
                        onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                        className="w-full text-xs font-medium bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-3 text-slate-800 outline-none focus:border-[#354CE1] focus:ring-2 focus:ring-[#354CE1]/10 transition"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">{t.websiteUrl}</label>
                    <div className="relative">
                      <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input 
                        type="text" 
                        placeholder="https://acme.com" 
                        value={formData.website}
                        onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                        className="w-full text-xs font-medium bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-3 text-slate-800 outline-none focus:border-[#354CE1] focus:ring-2 focus:ring-[#354CE1]/10 transition"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">{t.demoJobTitle}</label>
                  <input 
                    type="text" 
                    placeholder="Product Manager" 
                    value={formData.jobTitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, jobTitle: e.target.value }))}
                    className="w-full text-xs font-medium bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 outline-none focus:border-[#354CE1] focus:ring-2 focus:ring-[#354CE1]/10 transition"
                  />
                </div>

                <div className="pt-2 text-[10px] text-slate-400 leading-normal">
                  {t.consentText}
                </div>

                <button 
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-850 text-white font-bold py-3 px-6 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow transition cursor-pointer"
                >
                  <span>{t.launchSandbox}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              // Live Interactive Custom Verification Sandbox Output
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-tight">{t.liveSandboxSession}</h3>
                    <p className="text-[10px] text-slate-400">{t.personalizedFor} <span className="font-bold text-slate-700">{formData.company}</span></p>
                  </div>
                  <button 
                    onClick={() => { setDemoStep('form'); setDemoSubmitted(false); }}
                    className="text-[10px] font-bold text-[#354CE1] hover:underline cursor-pointer"
                  >
                    {t.editInformation}
                  </button>
                </div>

                {/* Simulator Console screen */}
                <div className="bg-slate-900 text-slate-200 rounded-2xl p-5 font-mono text-[11px] leading-relaxed shadow-lg min-h-[220px] flex flex-col justify-between">
                  <div className="space-y-1.5 overflow-y-auto max-h-[180px] scrollbar-thin">
                    <p className="text-yellow-400 font-bold">{t.consoleInitializing}</p>
                    {demoCheckLogs.map((log, lIdx) => (
                      <p key={lIdx} className={log.includes('success') ? 'text-green-400 font-bold' : 'text-slate-300'}>
                        {log}
                      </p>
                    ))}
                    {runningDemoCheck && (
                      <span className="inline-block w-2.5 h-3.5 bg-indigo-400 animate-pulse" />
                    )}
                  </div>

                  <div className="border-t border-slate-800 pt-3 mt-4 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 uppercase">{t.engineStatus}</span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded uppercase ${
                      demoCheckStatus === 'running' 
                        ? 'bg-yellow-400/20 text-yellow-400' 
                        : 'bg-green-400/20 text-green-400'
                    }`}>
                      {demoCheckStatus === 'running' ? t.demoProcessing : t.verifiedActive}
                    </span>
                  </div>
                </div>

                {/* Personalized output stats card */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t.customClientConfig}</span>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="text-slate-400">{t.registeredName}</p>
                      <p className="font-bold text-slate-800">{formData.firstName} {formData.lastName}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">{t.secureIssuerApi}</p>
                      <p className="font-bold text-slate-800 font-mono text-[10.5px]">{t.apiVerifyPath}{formData.firstName.toLowerCase()}</p>
                    </div>
                  </div>

                  {demoCheckStatus === 'success' && (
                    <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span>{t.congratulations}</span>
                    </div>
                  )}

                  <button
                    disabled={runningDemoCheck}
                    onClick={startSimulatedVerificationCheck}
                    className="w-full text-center bg-indigo-50 hover:bg-indigo-100 text-[#354CE1] font-bold py-2.5 rounded-xl transition cursor-pointer disabled:opacity-50"
                  >
                    {t.rerunScan}
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 7. KEEP LEARNING (RESOURCES MODULES) */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#354CE1]">{t.guidesAndArticles}</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight">
                {t.demoKeepLearning}
              </h2>
            </div>
            <button 
              onClick={onOpenSandbox}
              className="text-xs font-bold text-[#354CE1] hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
            >
              <span>{t.viewAllResources}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ARTICLES.map(article => (
              <div 
                key={article.id}
                onClick={() => setActiveArticleId(article.id)}
                className="bg-white border border-slate-200/60 rounded-3xl p-6 space-y-4 hover:shadow-md hover:border-slate-350 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Article simulated visual block */}
                  <div className="bg-indigo-50 border border-indigo-100/50 aspect-video rounded-2xl flex items-center justify-center relative overflow-hidden">
                    <BookOpen className="w-8 h-8 text-indigo-400 group-hover:scale-110 transition duration-200" />
                    <div className="absolute top-2.5 left-2.5 bg-white/95 text-[10px] font-bold px-2 py-0.5 rounded-full text-slate-700 shadow-sm flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{article.category}</span>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#354CE1] transition leading-snug">
                    {article.title}
                  </h3>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#354CE1] font-bold">
                  <span>{t.readArticle}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. EXPLORE MORE OF THE IDENTITY PLATFORM (SIDE-BY-SIDE CARDS) */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 tracking-tight">
              {t.exploreMorePlatform}
            </h2>
            <p className="text-slate-500 text-xs md:text-sm">
              {t.exploreMorePlatformDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Platform block 1 */}
            <div 
              onClick={onOpenSandbox}
              className="bg-slate-50 border border-slate-150 p-8 rounded-3xl space-y-4 hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer group text-left flex flex-col justify-between min-h-[160px]"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded">{t.mdlTag}</span>
                  <Smartphone className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#354CE1] transition">
                  {t.mdlVerifications}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t.mdlVerificationsDesc}
                </p>
              </div>
              <div className="text-xs font-bold text-[#354CE1] pt-3 flex items-center gap-1">
                <span>{t.learnAboutMdl}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </div>

            {/* Platform block 2 */}
            <div 
              onClick={onOpenSandbox}
              className="bg-slate-50 border border-slate-150 p-8 rounded-3xl space-y-4 hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer group text-left flex flex-col justify-between min-h-[160px]"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded">{t.selfieLivenessTag}</span>
                  <Camera className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition">
                  {t.selfieLiveness}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t.selfieLivenessDesc}
                </p>
              </div>
              <div className="text-xs font-bold text-emerald-700 pt-3 flex items-center gap-1">
                <span>{t.learnAboutSelfie}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. READY TO GET STARTED */}
      <section className="py-20 bg-[#E5E9FF] text-slate-900">
        <div className="max-w-4xl mx-auto text-center px-6 space-y-6">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-[#06184C] tracking-tight">
            {t.readyToGetStartedTitle}
          </h2>
          <p className="text-[#1A2E65] text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            {t.readyToGetStartedDesc}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <button 
              onClick={onOpenSandbox}
              className="bg-[#354CE1] hover:bg-[#2539BE] text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg transition cursor-pointer"
            >
              {t.demoGetDemo}
            </button>
            <button 
              onClick={onOpenSandbox}
              className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-sm px-8 py-3.5 rounded-full transition flex items-center justify-center gap-1.5 cursor-pointer shadow"
            >
              <span>{t.tryItNow}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ARTICLE OVERLAY MODAL */}
      {activeArticleId !== null && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div 
            className="fixed inset-0" 
            onClick={() => setActiveArticleId(null)}
          />
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 relative z-10 shadow-2xl animate-in scale-in duration-200 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="text-[10px] font-bold text-[#354CE1] bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full uppercase tracking-wider">
                {ARTICLES.find(a => a.id === activeArticleId)?.category} {t.articleSeparator} {ARTICLES.find(a => a.id === activeArticleId)?.readTime}
              </span>
              <button 
                onClick={() => setActiveArticleId(null)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold px-2 py-1 rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                {t.close}
              </button>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 tracking-tight leading-snug">
              {ARTICLES.find(a => a.id === activeArticleId)?.title}
            </h3>

            <div className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line space-y-4">
              {ARTICLES.find(a => a.id === activeArticleId)?.content}
            </div>

            <div className="border-t border-slate-100 pt-4 flex justify-end">
              <button 
                onClick={() => setActiveArticleId(null)}
                className="bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs px-5 py-2.5 rounded-full shadow cursor-pointer"
              >
                {t.doneReading}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
