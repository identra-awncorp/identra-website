/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useMemo, useState } from 'react';
import { 
  ArrowLeft, ArrowRight, Check, Shield, Search, CheckCircle, Eye, 
  Activity, FileText, Settings, AlertOctagon, HelpCircle, ArrowRightCircle, 
  Sparkles, AlertCircle, ExternalLink, Layers, Smartphone, Mail, Phone, 
  ShieldAlert, ShieldCheck, RefreshCw, Radio, UserCheck, Trash2, HelpCircle as HelpIcon
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { PHONE_EMAIL_RISK_TRANSLATIONS } from '../translations/PhoneEmailRiskPageTranslations';

interface PhoneEmailRiskPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

interface PresetCandidate {
  id: string;
  label: string;
  phone: string;
  email: string;
  riskScore: number;
  recommendation: 'APPROVE' | 'REVIEW' | 'BLOCK';
  phoneDetails: {
    carrier: string;
    lineType: 'Mobile' | 'Landline' | 'VoIP' | 'Premium' | 'Disposable';
    valid: boolean;
    country: string;
    riskLevel: 'Low' | 'Medium' | 'High';
    signals: string[];
  };
  emailDetails: {
    domain: string;
    domainAge: string;
    deliverable: boolean;
    disposable: boolean;
    breachCount: number;
    riskLevel: 'Low' | 'Medium' | 'High';
    signals: string[];
  };
}

const createPresetCandidates = (t: any): PresetCandidate[] => [
  {
    id: '1',
    label: t.presets[0].label,
    phone: '+1 (415) 555-0198',
    email: 'sarah.jenkins@gmail.com',
    riskScore: 8,
    recommendation: 'APPROVE',
    phoneDetails: {
      carrier: t.presets[0].phoneCarrier,
      lineType: t.presets[0].phoneLineType,
      valid: true,
      country: t.presets[0].phoneCountry,
      riskLevel: 'Low',
      signals: t.presets[0].phoneSignals
    },
    emailDetails: {
      domain: 'gmail.com',
      domainAge: t.presets[0].emailDomainAge,
      deliverable: true,
      disposable: false,
      breachCount: 0,
      riskLevel: 'Low',
      signals: t.presets[0].emailSignals
    }
  },
  {
    id: '2',
    label: t.presets[1].label,
    phone: '+1 (312) 555-4421',
    email: 'alex_travels92@fastmail.com',
    riskScore: 48,
    recommendation: 'REVIEW',
    phoneDetails: {
      carrier: t.presets[1].phoneCarrier,
      lineType: t.presets[1].phoneLineType,
      valid: true,
      country: t.presets[1].phoneCountry,
      riskLevel: 'High',
      signals: t.presets[1].phoneSignals
    },
    emailDetails: {
      domain: 'fastmail.com',
      domainAge: t.presets[1].emailDomainAge,
      deliverable: true,
      disposable: false,
      breachCount: 1,
      riskLevel: 'Low',
      signals: t.presets[1].emailSignals
    }
  },
  {
    id: '3',
    label: t.presets[2].label,
    phone: '+1 (415) 555-8823',
    email: 'temp_user_x928@sharklasers.com',
    riskScore: 92,
    recommendation: 'BLOCK',
    phoneDetails: {
      carrier: t.presets[2].phoneCarrier,
      lineType: t.presets[2].phoneLineType,
      valid: true,
      country: t.presets[2].phoneCountry,
      riskLevel: 'High',
      signals: t.presets[2].phoneSignals
    },
    emailDetails: {
      domain: 'sharklasers.com',
      domainAge: t.presets[2].emailDomainAge,
      deliverable: true,
      disposable: true,
      breachCount: 8,
      riskLevel: 'High',
      signals: t.presets[2].emailSignals
    }
  }
];

export default function PhoneEmailRiskPage({ onOpenSandbox, onBackToLanding, onViewChange }: PhoneEmailRiskPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(PHONE_EMAIL_RISK_TRANSLATIONS, language as keyof typeof PHONE_EMAIL_RISK_TRANSLATIONS, 'PHONE_EMAIL_RISK_TRANSLATIONS');
  const presetCandidates = useMemo(() => createPresetCandidates(t), [t]);

  // Simulator state
  const [selectedPresetId, setSelectedPresetId] = useState<string>('1');
  const [customPhone, setCustomPhone] = useState<string>('');
  const [customEmail, setCustomEmail] = useState<string>('');
  const [isUsingCustom, setIsUsingCustom] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<PresetCandidate | null>(presetCandidates[0]);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evalStepIndex, setEvalStepIndex] = useState<number | null>(null);
  const evalStep = evalStepIndex === null ? '' : t.simulator.steps[evalStepIndex];

  const handleSelectPreset = (id: string) => {
    setIsUsingCustom(false);
    setSelectedPresetId(id);
    const preset = presetCandidates.find(c => c.id === id);
    if (preset) {
      setEvaluationResult(preset);
    }
  };

  const buildCustomResult = React.useCallback((): PresetCandidate => {
    const isDisposableEmail = customEmail.includes('temp') || customEmail.includes('mailinator') || customEmail.includes('burner') || customEmail.includes('yopmail');
    const isVoipPhone = customPhone.includes('555') || customPhone.includes('000') || customPhone.length < 10;
    
    let score = 15;
    if (isDisposableEmail) score += 45;
    if (isVoipPhone) score += 35;
    if (customEmail.length % 2 === 0) score += 10;

    const rec = score < 30 ? 'APPROVE' : score < 70 ? 'REVIEW' : 'BLOCK';

    return {
      id: 'custom',
      label: t.custom.label,
      phone: customPhone || '+1 (555) 012-3456',
      email: customEmail || 'user@example.com',
      riskScore: score,
      recommendation: rec,
      phoneDetails: {
        carrier: isVoipPhone ? t.custom.voipCarrier : t.custom.mobileCarrier,
        lineType: isVoipPhone ? 'VoIP' : 'Mobile',
        valid: customPhone.length > 7,
        country: t.presets[0].phoneCountry,
        riskLevel: score < 30 ? 'Low' : score < 70 ? 'Medium' : 'High',
        signals: isVoipPhone 
          ? t.custom.voipSignals 
          : t.custom.mobileSignals
      },
      emailDetails: {
        domain: customEmail.split('@')[1] || 'example.com',
        domainAge: isDisposableEmail ? t.custom.disposableDomainAge : t.custom.standardDomainAge,
        deliverable: true,
        disposable: isDisposableEmail,
        breachCount: isDisposableEmail ? 4 : 0,
        riskLevel: isDisposableEmail ? 'High' : 'Low',
        signals: isDisposableEmail 
          ? t.custom.disposableSignals
          : t.custom.standardSignals
      }
    };
  }, [customEmail, customPhone, t]);

  React.useEffect(() => {
    setEvaluationResult(prev => {
      if (isUsingCustom) {
        return prev?.id === 'custom' ? buildCustomResult() : prev;
      }

      return presetCandidates.find(c => c.id === selectedPresetId) || prev;
    });
  }, [buildCustomResult, isUsingCustom, presetCandidates, selectedPresetId]);

  const handleRunEvaluation = () => {
    setIsEvaluating(true);
    setEvalStepIndex(0);
    
    setTimeout(() => {
      setEvalStepIndex(1);
      setTimeout(() => {
        setEvalStepIndex(2);
        setTimeout(() => {
          setEvalStepIndex(3);
          setTimeout(() => {
            if (isUsingCustom) {
              setEvaluationResult(buildCustomResult());
            } else {
              const preset = presetCandidates.find(c => c.id === selectedPresetId);
              if (preset) setEvaluationResult(preset);
            }
            setIsEvaluating(false);
            setEvalStepIndex(null);
          }, 600);
        }, 600);
      }, 600);
    }, 600);
  };

  return (
    <div className="bg-[#FAFBFD] pb-24 text-[#111625]" id="phone-email-risk-page">
      {/* Saffron Rounded Container Hero (Matches Screenshot Style) */}
      <section className="px-4 md:px-8 pt-8 max-w-7xl mx-auto">
        <div className="relative overflow-hidden bg-[#F2A122] text-white rounded-[2rem] px-8 md:px-16 pt-16 pb-20 shadow-xl" id="phone-email-hero">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl opacity-35 -mr-20 -mb-20" />
          
          <div className="max-w-4xl relative z-10">
            {/* Back Button */}
            <button 
              onClick={onBackToLanding}
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-50 hover:text-white transition mb-10 bg-amber-950/10 hover:bg-amber-950/25 px-4 py-2.5 rounded-full border border-white/10"
              id="phone-email-back"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.backToPlatform}</span>
            </button>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-950/15 border border-white/20 px-3.5 py-1.5 rounded-full mb-6">
              <Smartphone className="w-4 h-4 text-amber-100" />
              <span className="text-[10px] font-bold tracking-wider uppercase text-amber-100">{t.badge}</span>
            </div>

            {/* Main Hero Header */}
            <h1 className="text-4xl md:text-[54px] font-display font-bold leading-[1.1] tracking-tight text-white mb-6">
              {t.heroTitleBefore}<br className="hidden md:block"/>
              <span className="text-amber-100">{t.heroTitleHighlight}</span>{t.heroTitleAfter}
            </h1>

            {/* CTA Button */}
            <div className="pt-6">
              <button 
                onClick={onOpenSandbox}
                className="bg-[#111625] hover:bg-[#1f293d] text-white font-medium px-7 py-4 rounded-full text-sm shadow-lg transition flex items-center gap-2.5 group"
                id="phone-email-demo-cta"
              >
                <span>{t.tryDemo}</span>
                <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-24">
        <div className="max-w-3xl mb-14">
          <h2 className="text-3xl font-display font-bold text-[#111625] tracking-tight mb-4">
            {t.howTitle}
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            {t.howDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[1px] bg-slate-200 z-0" />
          
          {/* Step 1 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative z-10 hover:shadow-md transition">
            <div className="w-12 h-12 bg-amber-50 text-[#F2A122] rounded-xl flex items-center justify-center font-bold text-lg mb-6">
              1
            </div>
            <h3 className="text-lg font-bold text-[#111625] mb-2">{t.howSteps[0].title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              {t.howSteps[0].desc}
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative z-10 hover:shadow-md transition">
            <div className="w-12 h-12 bg-amber-50 text-[#F2A122] rounded-xl flex items-center justify-center font-bold text-lg mb-6">
              2
            </div>
            <h3 className="text-lg font-bold text-[#111625] mb-2">{t.howSteps[1].title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              {t.howSteps[1].desc}
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative z-10 hover:shadow-md transition">
            <div className="w-12 h-12 bg-amber-50 text-[#F2A122] rounded-xl flex items-center justify-center font-bold text-lg mb-6">
              3
            </div>
            <h3 className="text-lg font-bold text-[#111625] mb-2">{t.howSteps[2].title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              {t.howSteps[2].desc}
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Simulator Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-28">
        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden" id="risk-simulator">
          {/* Accent decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-slate-800">
              <div>
                <div className="inline-flex items-center gap-1.5 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.simulator.eyebrow}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold">
                  {t.simulator.title}
                </h3>
                <p className="text-slate-400 text-sm mt-1 max-w-xl">
                  {t.simulator.desc}
                </p>
              </div>

              {/* Reset to Presets if Custom */}
              {isUsingCustom && (
                <button 
                  onClick={() => handleSelectPreset('1')}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 px-3.5 py-2 rounded-lg border border-slate-700 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{t.simulator.clearCustom}</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Column: Input Controller */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                    {t.simulator.choosePreset}
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {presetCandidates.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => handleSelectPreset(c.id)}
                        className={`w-full text-left p-3 rounded-xl border transition flex items-center justify-between ${
                          !isUsingCustom && selectedPresetId === c.id
                            ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 font-semibold'
                            : 'bg-slate-800/40 border-slate-800 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-2.5 h-2.5 rounded-full ${
                            c.recommendation === 'APPROVE' ? 'bg-green-400' :
                            c.recommendation === 'REVIEW' ? 'bg-yellow-400' : 'bg-red-400'
                          }`} />
                          <span className="text-xs truncate">{c.label}</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                          {t.simulator.score} {c.riskScore}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-800" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-slate-900 px-3 text-slate-500 font-semibold">{t.simulator.orCustom}</span>
                  </div>
                </div>

                {/* Custom input fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase">
                      {t.simulator.phoneNumber}
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="+1 (555) 012-3456"
                        value={isUsingCustom ? customPhone : ''}
                        onChange={(e) => {
                          setIsUsingCustom(true);
                          setCustomPhone(e.target.value);
                        }}
                        className="w-full bg-slate-800/50 border border-slate-700 focus:border-amber-500 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase">
                      {t.simulator.emailAddress}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="email"
                        placeholder="user@example.com"
                        value={isUsingCustom ? customEmail : ''}
                        onChange={(e) => {
                          setIsUsingCustom(true);
                          setCustomEmail(e.target.value);
                        }}
                        className="w-full bg-slate-800/50 border border-slate-700 focus:border-amber-500 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleRunEvaluation}
                    disabled={isEvaluating}
                    className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-slate-700 text-slate-950 font-bold py-3.5 px-6 rounded-xl text-sm transition flex items-center justify-center gap-2"
                  >
                    {isEvaluating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>{t.simulator.scanning}</span>
                      </>
                    ) : (
                      <>
                        <Activity className="w-4 h-4" />
                        <span>{t.simulator.run}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Right Column: Display Evaluation Results */}
              <div className="lg:col-span-7">
                <div className="bg-[#161d30] border border-slate-800 rounded-2xl min-h-[420px] p-6 relative flex flex-col justify-between">
                  
                  {isEvaluating ? (
                    /* Loading State Animation */
                    <div className="absolute inset-0 bg-slate-900/90 rounded-2xl flex flex-col items-center justify-center p-8 z-20 transition-all duration-300">
                      <div className="w-16 h-16 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mb-6" />
                      <p className="text-white text-base font-semibold text-center h-8 animate-pulse">
                        {evalStep}
                      </p>
                      <p className="text-slate-400 text-xs mt-2 text-center">
                        {t.simulator.loadingDesc}
                      </p>
                    </div>
                  ) : null}

                  {evaluationResult ? (
                    <div className="space-y-6">
                      {/* Top Risk Overview with Gauge and Decision */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-6 border-b border-slate-800/80 items-center">
                        <div className="md:col-span-4 flex flex-col items-center">
                          <span className="text-xs text-slate-400 font-medium mb-2 uppercase">{t.simulator.riskScore}</span>
                          <div className="relative w-24 h-24 flex items-center justify-center rounded-full bg-slate-800/40 border border-slate-800">
                            {/* Inner score */}
                            <div className="text-center">
                              <span className="text-3xl font-extrabold font-mono tracking-tight text-white">
                                {evaluationResult.riskScore}
                              </span>
                              <span className="block text-[9px] text-slate-400 font-bold uppercase">/ 100</span>
                            </div>
                            {/* Colored outer halo */}
                            <div className={`absolute inset-0 rounded-full border-4 ${
                              evaluationResult.riskScore < 30 ? 'border-green-500/30' :
                              evaluationResult.riskScore < 70 ? 'border-yellow-500/30' : 'border-red-500/30'
                            }`} />
                          </div>
                        </div>

                        <div className="md:col-span-8 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-400 uppercase font-semibold">{t.simulator.recommendedAction}</span>
                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                              evaluationResult.recommendation === 'APPROVE' ? 'bg-green-500/10 text-green-400 border border-green-500/30' :
                              evaluationResult.recommendation === 'REVIEW' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30' :
                              'bg-red-500/10 text-red-400 border border-red-500/30'
                            }`}>
                              {t.recommendationLabels[evaluationResult.recommendation]}
                            </span>
                          </div>

                          <p className="text-sm text-slate-300 font-semibold">
                            {evaluationResult.recommendation === 'APPROVE' && t.simulator.approveDesc}
                            {evaluationResult.recommendation === 'REVIEW' && t.simulator.reviewDesc}
                            {evaluationResult.recommendation === 'BLOCK' && t.simulator.blockDesc}
                          </p>
                        </div>
                      </div>

                      {/* Detailed Signal Columns */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Phone Signals */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-slate-300 border-b border-slate-800 pb-2">
                            <Smartphone className="w-4 h-4 text-amber-400" />
                            <span className="text-xs font-bold uppercase tracking-wider">{t.simulator.phoneDetails}</span>
                            <span className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded ${
                              evaluationResult.phoneDetails.riskLevel === 'Low' ? 'bg-green-500/10 text-green-400' :
                              evaluationResult.phoneDetails.riskLevel === 'Medium' ? 'bg-yellow-500/10 text-yellow-400' :
                              'bg-red-500/10 text-red-400'
                            }`}>
                              {t.riskLevels[evaluationResult.phoneDetails.riskLevel]} {t.riskSuffix}
                            </span>
                          </div>

                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-slate-400">{t.simulator.carrier}</span>
                              <span className="text-white font-semibold font-mono">{evaluationResult.phoneDetails.carrier}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">{t.simulator.lineType}</span>
                              <span className="text-white font-semibold font-mono">{t.lineTypes[evaluationResult.phoneDetails.lineType] || evaluationResult.phoneDetails.lineType}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">{t.simulator.validFormat}</span>
                              <span className="text-white font-semibold font-mono">{evaluationResult.phoneDetails.valid ? t.yes : t.no}</span>
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t.simulator.riskFlags}</span>
                            <div className="space-y-1.5">
                              {evaluationResult.phoneDetails.signals.map((sig, sIdx) => (
                                <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-300">
                                  <CheckCircle className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                                    evaluationResult.phoneDetails.riskLevel === 'Low' ? 'text-green-500' : 'text-amber-500'
                                  }`} />
                                  <span>{sig}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Email Signals */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-slate-300 border-b border-slate-800 pb-2">
                            <Mail className="w-4 h-4 text-amber-400" />
                            <span className="text-xs font-bold uppercase tracking-wider">{t.simulator.emailDetails}</span>
                            <span className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded ${
                              evaluationResult.emailDetails.riskLevel === 'Low' ? 'bg-green-500/10 text-green-400' :
                              evaluationResult.emailDetails.riskLevel === 'Medium' ? 'bg-yellow-500/10 text-yellow-400' :
                              'bg-red-500/10 text-red-400'
                            }`}>
                              {t.riskLevels[evaluationResult.emailDetails.riskLevel]} {t.riskSuffix}
                            </span>
                          </div>

                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-slate-400">{t.simulator.domain}</span>
                              <span className="text-white font-semibold font-mono truncate max-w-[140px]">{evaluationResult.emailDetails.domain}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">{t.simulator.domainAge}</span>
                              <span className="text-white font-semibold font-mono">{evaluationResult.emailDetails.domainAge}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">{t.simulator.disposable}</span>
                              <span className="text-white font-semibold font-mono">{evaluationResult.emailDetails.disposable ? t.yesRisky : t.no}</span>
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t.simulator.riskFlags}</span>
                            <div className="space-y-1.5">
                              {evaluationResult.emailDetails.signals.map((sig, sIdx) => (
                                <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-300">
                                  <CheckCircle className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                                    evaluationResult.emailDetails.riskLevel === 'Low' ? 'text-green-500' : 'text-amber-500'
                                  }`} />
                                  <span>{sig}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                      <HelpIcon className="w-12 h-12 text-slate-600 mb-4 animate-bounce" />
                      <p className="text-slate-300 text-base font-semibold">{t.simulator.readyTitle}</p>
                      <p className="text-slate-500 text-xs mt-1">
                        {t.simulator.readyDesc}
                      </p>
                    </div>
                  )}

                  {/* Sandbox API Call simulation panel footer */}
                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-mono">{t.simulator.endpoint}</span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                      <span>{t.simulator.sandboxActive}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore our phone and email risk reports Section (Precisely Matches screenshot) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-32">
        <div className="mb-14 text-center md:text-left">
          <h2 className="text-3xl font-display font-bold text-[#111625] tracking-tight">
            {t.reportsTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-slate-200">
          {/* Phone number risk */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#111625] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>{t.reports[0].title}</span>
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              {t.reports[0].desc}
            </p>
          </div>

          {/* Email address risk */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#111625] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>{t.reports[1].title}</span>
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              {t.reports[1].desc}
            </p>
          </div>

          {/* Email address and phone possession */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#111625] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>{t.reports[2].title}</span>
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              {t.reports[2].desc}
            </p>
            <button 
              onClick={() => onViewChange?.('phone-email')} 
              className="text-xs font-bold text-[#354CE1] hover:text-indigo-800 transition flex items-center gap-1.5"
            >
              <span>{t.reports[2].cta}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid Card (White layout with light gray shadow in screenshot) */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-28">
        <div className="bg-white rounded-3xl p-8 md:p-14 border border-slate-100 shadow-lg" id="phone-email-features">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-16 md:gap-y-12">
            
            {/* Feature 1 */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center shrink-0 text-[#F2A122]" id="f-feature-1">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#111625] mb-2">{t.features[0].title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {t.features[0].desc}
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center shrink-0 text-[#F2A122]" id="f-feature-2">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#111625] mb-2">{t.features[1].title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {t.features[1].desc}
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center shrink-0 text-[#F2A122]" id="f-feature-3">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#111625] mb-2">{t.features[2].title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {t.features[2].desc}
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center shrink-0 text-[#F2A122]" id="f-feature-4">
                <Settings className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#111625] mb-2">{t.features[3].title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {t.features[3].desc}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Explore more of Identra's identity platform section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-32">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-[#111625] tracking-tight">
            {t.exploreTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Teal */}
          <button type="button" className="bg-[#4CD4A6]/20 border border-[#4CD4A6]/40 p-8 md:p-12 rounded-[2rem] flex flex-col justify-between group cursor-pointer hover:border-[#4CD4A6]/80 transition"
               onClick={() => onViewChange?.('phone-email')}>
            <div className="space-y-4">
              <div className="w-10 h-10 bg-[#4CD4A6] text-[#111625] rounded-xl flex items-center justify-center font-bold">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-display font-bold text-slate-900 leading-tight">
                {t.exploreCards[0].title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
                {t.exploreCards[0].desc}
              </p>
            </div>
            <div className="pt-8 flex items-center gap-2 text-xs font-bold text-[#111625] group-hover:gap-3 transition-all duration-300">
              <span>{t.exploreCards[0].cta}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>

          {/* Card 2: Lavender / Slate Blue */}
          <button type="button" className="bg-indigo-100/60 border border-indigo-200 p-8 md:p-12 rounded-[2rem] flex flex-col justify-between group cursor-pointer hover:border-indigo-400/80 transition"
               onClick={() => onViewChange?.('relay')}>
            <div className="space-y-4">
              <div className="w-10 h-10 bg-[#354CE1] text-white rounded-xl flex items-center justify-center font-bold">
                <Radio className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-display font-bold text-slate-900 leading-tight">
                {t.exploreCards[1].title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
                {t.exploreCards[1].desc}
              </p>
            </div>
            <div className="pt-8 flex items-center gap-2 text-xs font-bold text-[#354CE1] group-hover:gap-3 transition-all duration-300">
              <span>{t.exploreCards[1].cta}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      </section>

      {/* Ready to get started Banner */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-32">
        <div className="relative overflow-hidden bg-indigo-100 border border-indigo-200/80 text-[#111625] rounded-[2rem] p-10 md:p-16 text-center shadow-md">
          <div className="max-w-xl mx-auto relative z-10 space-y-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
              {t.finalCta.title}
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {t.finalCta.desc}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={onOpenSandbox}
                className="bg-[#354CE1] hover:bg-indigo-700 text-white font-semibold px-7 py-3.5 rounded-full text-sm shadow-md transition"
              >
                {t.finalCta.primary}
              </button>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
