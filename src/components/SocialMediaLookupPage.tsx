/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, Check, Shield, Search, CheckCircle, Eye, 
  Activity, FileText, Settings, AlertOctagon, HelpCircle, ArrowRightCircle, 
  Sparkles, AlertCircle, ExternalLink, Layers, MapPin, Mail, Home, 
  ShieldAlert, ShieldCheck, RefreshCw, Radio, UserCheck, Trash2,
  Globe, Landmark, Navigation, Map, Info, Compass, Newspaper,
  Twitter, Linkedin, Facebook, Users, MessageSquare, AlertTriangle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord, getLocalizedValue } from '../utils/i18nRuntime';
import { SOCIAL_MEDIA_LOOKUP_TRANSLATIONS } from '../translations/SocialMediaLookupPageTranslations';

interface SocialMediaLookupPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

interface SocialProfilePreset {
  id: string;
  name?: string;
  handle: string;
  platform: 'X' | 'LinkedIn' | 'Facebook' | 'Multiple';
  riskScore: number;
  recommendation: 'APPROVE' | 'REVIEW' | 'BLOCK';
  profileAge?: string;
  followerCount: string;
  details: {
    identityMatched: 'Yes' | 'Partial' | 'No';
    profileStatus: 'Active' | 'Dormant' | 'Suspicious' | 'Recently Created';
    category?: string;
    verifiedBadge: boolean;
    locationMatched: boolean;
    signals?: string[];
    riskFlags?: string[];
  };
  avatarUrl?: string;
}

const PRESET_SOCIALS: SocialProfilePreset[] = [
  {
    id: '1',
    handle: '@sjenkins_ux',
    platform: 'Multiple',
    riskScore: 4,
    recommendation: 'APPROVE',
    followerCount: '1.2k',
    details: {
      identityMatched: 'Yes',
      profileStatus: 'Active',
      verifiedBadge: true,
      locationMatched: true,
    }
  },
  {
    id: '2',
    handle: '@arivera_temp91',
    platform: 'X',
    riskScore: 45,
    recommendation: 'REVIEW',
    followerCount: '14',
    details: {
      identityMatched: 'Partial',
      profileStatus: 'Recently Created',
      verifiedBadge: false,
      locationMatched: false,
    }
  },
  {
    id: '3',
    handle: '@fastcash_johnny',
    platform: 'Facebook',
    riskScore: 89,
    recommendation: 'BLOCK',
    followerCount: '2',
    details: {
      identityMatched: 'No',
      profileStatus: 'Suspicious',
      verifiedBadge: false,
      locationMatched: false,
    }
  }
];

export default function SocialMediaLookupPage({ onOpenSandbox, onBackToLanding, onViewChange }: SocialMediaLookupPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(SOCIAL_MEDIA_LOOKUP_TRANSLATIONS, language as keyof typeof SOCIAL_MEDIA_LOOKUP_TRANSLATIONS, 'SOCIAL_MEDIA_LOOKUP_TRANSLATIONS');

  // Active Tab for "How it works"
  const [activeWorkTab, setActiveWorkTab] = useState<'enrich' | 'evaluate'>('enrich');

  // Simulator state
  const [selectedPresetId, setSelectedPresetId] = useState<string>('1');
  const [isUsingCustom, setIsUsingCustom] = useState<boolean>(false);
  const [customHandle, setCustomHandle] = useState<string>('');
  const [customName, setCustomName] = useState<string>('');
  const [customPlatform, setCustomPlatform] = useState<'X' | 'LinkedIn' | 'Facebook' | 'Multiple'>('Multiple');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evalStepIndex, setEvalStepIndex] = useState<number | null>(null);
  const evalStep = evalStepIndex === null ? '' : t.evalSteps[evalStepIndex];
  const [evaluationResult, setEvaluationResult] = useState<SocialProfilePreset | null>(PRESET_SOCIALS[0]);

  const handleSelectPreset = (id: string) => {
    setIsUsingCustom(false);
    setSelectedPresetId(id);
    const preset = PRESET_SOCIALS.find(p => p.id === id);
    if (preset) {
      setEvaluationResult(preset);
    }
  };

  const buildCustomResult = React.useCallback((): SocialProfilePreset => {
    const handleLower = customHandle.toLowerCase();
    const isSuspicious = handleLower.includes('bot') || handleLower.includes('cash') || handleLower.includes('spam') || handleLower.includes('temp');
    const isRecent = handleLower.includes('new') || handleLower.includes('99') || handleLower.includes('2026');
    
    let score = 12;
    let age = t.custom.ageFourYears;
    let status: 'Active' | 'Dormant' | 'Suspicious' | 'Recently Created' = 'Active';
    let riskFlags: string[] = [];
    let signals: string[] = [t.custom.standardSignal];

    if (isSuspicious) {
      score = 85;
      status = 'Suspicious';
      riskFlags.push(t.custom.suspiciousFlag1);
      riskFlags.push(t.custom.suspiciousFlag2);
    } else if (isRecent) {
      score = 48;
      status = 'Recently Created';
      age = t.custom.ageOneMonth;
      riskFlags.push(t.custom.recentFlag);
      signals.push(t.custom.recentSignal);
    } else {
      signals.push(t.custom.stableSignal);
    }

    if (!customHandle) {
      score = 95;
      status = 'Suspicious';
      riskFlags.push(t.custom.emptyFlag);
    }

    const rec = score < 25 ? 'APPROVE' : score < 60 ? 'REVIEW' : 'BLOCK';

    return {
      id: 'custom',
      name: customName || t.custom.defaultName,
      handle: customHandle || t.custom.defaultHandle,
      platform: customPlatform,
      riskScore: score,
      recommendation: rec,
      profileAge: age,
      followerCount: score > 70 ? '4' : '342',
      details: {
        identityMatched: score < 30 ? 'Yes' : score < 70 ? 'Partial' : 'No',
        profileStatus: status,
        category: score < 30 ? t.custom.categories.verified : score < 70 ? t.custom.categories.inconsistent : t.custom.categories.highRisk,
        verifiedBadge: score < 30,
        locationMatched: score < 50,
        signals,
        riskFlags
      }
    };
  }, [customHandle, customName, customPlatform, t]);

  React.useEffect(() => {
    setEvaluationResult(prev => {
      if (isUsingCustom) {
        return prev?.id === 'custom' ? buildCustomResult() : prev;
      }

      return PRESET_SOCIALS.find(p => p.id === selectedPresetId) || prev;
    });
  }, [buildCustomResult, isUsingCustom, selectedPresetId]);

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
              const preset = PRESET_SOCIALS.find(p => p.id === selectedPresetId);
              if (preset) setEvaluationResult(preset);
            }
            setIsEvaluating(false);
            setEvalStepIndex(null);
          }, 600);
        }, 600);
      }, 600);
    }, 600);
  };

  const getProfileCopy = (profile: SocialProfilePreset) => {
    if (profile.id === 'custom') {
      return {
        name: profile.name || t.custom.defaultName,
        profileAge: profile.profileAge || t.custom.ageFourYears,
        category: profile.details.category || t.custom.categories.inconsistent,
        signals: profile.details.signals || [],
        riskFlags: profile.details.riskFlags || []
      };
    }
    return getLocalizedValue(t.presets, profile.id, language, 'SOCIAL_MEDIA_LOOKUP_TRANSLATIONS.presets');
  };

  const evaluationCopy = evaluationResult ? getProfileCopy(evaluationResult) : null;

  return (
    <div className="bg-[#FAFBFD] pb-24 text-[#111625]" id="social-media-lookup-page">
      {/* Ochre Saffron Curved Hero Container (Perfect match to the provided screenshot style) */}
      <section className="px-4 md:px-8 pt-8 max-w-7xl mx-auto">
        <div className="relative overflow-hidden bg-[#B37119] text-white rounded-[2rem] px-8 md:px-16 pt-16 pb-14 shadow-xl animate-fade-in" id="social-hero">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-600/30 rounded-full blur-3xl opacity-40 -mr-20 -mb-20" />
          
          <div className="relative z-10">
            <button 
              onClick={onBackToLanding}
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-50 hover:text-white transition mb-10 bg-amber-950/20 hover:bg-amber-950/35 px-4 py-2.5 rounded-full border border-white/15"
              id="social-back"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.backToPlatform}</span>
            </button>

            <div className="inline-flex items-center gap-2 bg-amber-950/20 border border-white/20 px-3.5 py-1.5 rounded-full mb-6">
              <Globe className="w-4 h-4 text-amber-100" />
              <span className="text-[10px] font-bold tracking-wider uppercase text-amber-100">{t.badge}</span>
            </div>

            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-[52px] font-display font-bold leading-[1.12] tracking-tight text-white mb-8">
                {t.heroLine1} <br />
                {t.heroLine2} <span className="text-amber-200">{t.heroLine3}</span> <br />
                <span className="text-amber-200">{t.heroLine4}</span> {t.heroLine5} <br />
                {t.heroLine6} <br />
                {t.heroLine7}
              </h1>
            </div>

            <div className="mb-14">
              <button 
                onClick={onOpenSandbox}
                className="bg-[#111625] hover:bg-[#1f293d] text-white font-medium px-8 py-4 rounded-full text-sm shadow-lg transition flex items-center gap-2.5 group"
                id="social-demo-cta"
              >
                <span>{t.tryDemo}</span>
                <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition" />
              </button>
            </div>

            <div className="border-t border-white/20 pt-8 mt-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {t.heroFeatures.map((feature: any, index: number) => (
                <div
                  key={feature.title}
                  className={index === 0 ? 'space-y-2' : 'border-t border-white/10 md:border-t-0 md:border-l md:border-white/20 pt-6 md:pt-0 md:pl-8 space-y-2'}
                >
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-100">{feature.title}</h3>
                  <p className="text-xs text-amber-50/80 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section (Ochre Saffron Tab Layout with Mockup Illustration) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-3xl font-display font-bold text-[#111625] tracking-tight">{t.howItWorks}</h2>
          </div>
          <div className="flex gap-6 mt-4 md:mt-0 text-sm font-medium">
            <button 
              onClick={() => setActiveWorkTab('enrich')}
              className={[
                'pb-3 border-b-2 font-semibold transition',
                activeWorkTab === 'enrich' ? 'border-[#B37119] text-[#B37119]' : 'border-transparent text-slate-500 hover:text-slate-800'
              ].join(' ')}
            >
              {t.tabEnrich}
            </button>
            <button 
              onClick={() => setActiveWorkTab('evaluate')}
              className={[
                'pb-3 border-b-2 font-semibold transition',
                activeWorkTab === 'evaluate' ? 'border-[#B37119] text-[#B37119]' : 'border-transparent text-slate-500 hover:text-slate-800'
              ].join(' ')}
            >
              {t.tabEvaluate}
            </button>
          </div>
        </div>

        <div className="bg-[#FEF5E7] text-[#111625] rounded-[2.5rem] p-8 md:p-14 border border-[#F5DFBF] shadow-sm">
          {activeWorkTab === 'enrich' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <h3 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-[#111625] leading-tight">
                  {t.enrichTitleLine1} <br />
                  {t.enrichTitleLine2}
                </h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">{t.enrichDesc}</p>
                <ul className="space-y-3.5 text-slate-800 font-semibold text-sm">
                  {t.enrichNetworks.map((item: string) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-64 h-[380px] bg-white rounded-[2.5rem] border-[8px] border-amber-950/5 shadow-2xl p-4 flex flex-col justify-between overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-28 bg-slate-950 rounded-b-xl z-20" />
                  <div className="space-y-4 pt-4 relative z-10">
                    <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-xs">{t.userInitial}</div>
                      <div>
                        <div className="h-2 w-20 bg-slate-200 rounded" />
                        <div className="h-1.5 w-12 bg-slate-100 rounded mt-1" />
                      </div>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl shadow-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.socialMatch}</span>
                        <Linkedin className="w-3.5 h-3.5 text-blue-700" />
                      </div>
                      <div className="h-2.5 w-32 bg-slate-300 rounded" />
                      <div className="h-2 w-24 bg-slate-200 rounded" />
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl shadow-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.twitterPresence}</span>
                        <Twitter className="w-3.5 h-3.5 text-sky-500" />
                      </div>
                      <div className="h-2.5 w-24 bg-slate-300 rounded" />
                      <div className="h-2 w-16 bg-slate-200 rounded" />
                    </div>
                  </div>
                  <div className="absolute top-[180px] right-4 bg-[#F2A122] text-white p-3.5 rounded-2xl shadow-xl border border-white/20 transform rotate-12 flex items-center gap-2 animate-pulse">
                    <ShieldCheck className="w-6 h-6 text-white" />
                    <div>
                      <span className="block text-[8px] uppercase tracking-widest font-bold">{t.identity}</span>
                      <span className="text-[11px] font-extrabold font-mono">{t.enriched}</span>
                    </div>
                  </div>
                  <div className="h-8 w-full bg-slate-100 rounded-full flex items-center justify-center text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                    {t.identraVerified}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <h3 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-[#111625] leading-tight">
                  {t.evaluateTitleLine1} <br />
                  {t.evaluateTitleLine2}
                </h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">{t.evaluateDesc}</p>
                <ul className="space-y-3.5 text-slate-800 font-semibold text-sm">
                  {t.evaluateBullets.map((item: string) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl font-mono text-xs border border-slate-800">
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-800">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-slate-500 text-[10px] ml-2">{t.codeFile}</span>
                  </div>
                  <p className="text-amber-400">{t.codeLines[0]}</p>
                  <p className="text-slate-400">{t.codeLines[1]}</p>
                  <p className="text-green-400">✓ {t.codeLines[2]}</p>
                  <p className="text-slate-400">✓ {t.codeLines[3]}</p>
                  <p className="text-green-400">✓ {t.codeLines[4]}</p>
                  <p className="text-slate-300 mt-2 font-bold text-emerald-400">{t.codeLines[5]}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Interactive Evaluation Playground Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-28">
        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden" id="social-simulator">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-slate-800">
              <div>
                <div className="inline-flex items-center gap-1.5 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.playground}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold">{t.simulatorTitle}</h3>
                <p className="text-slate-400 text-sm mt-1 max-w-xl">{t.simulatorDesc}</p>
              </div>

              {isUsingCustom && (
                <button 
                  onClick={() => handleSelectPreset('1')}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 px-3.5 py-2 rounded-lg border border-slate-700 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{t.clearCustom}</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">{t.selectPreset}</span>
                  <div className="grid grid-cols-1 gap-2.5">
                    {PRESET_SOCIALS.map((p) => {
                      const presetCopy = getProfileCopy(p);
                      return (
                        <button
                          key={p.id}
                          onClick={() => handleSelectPreset(p.id)}
                          className={[
                            'w-full text-left p-3.5 rounded-xl border transition flex items-center justify-between',
                            !isUsingCustom && selectedPresetId === p.id
                              ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 font-semibold'
                              : 'bg-slate-800/40 border-slate-800 hover:border-slate-700 text-slate-300'
                          ].join(' ')}
                        >
                          <div className="flex items-center gap-3">
                            <div className={[
                              'w-2.5 h-2.5 rounded-full',
                              p.recommendation === 'APPROVE' ? 'bg-green-400' : p.recommendation === 'REVIEW' ? 'bg-yellow-400' : 'bg-red-400'
                            ].join(' ')} />
                            <div className="truncate">
                              <span className="text-xs block font-semibold">{presetCopy.name}</span>
                              <span className="text-[10px] text-slate-400 font-mono">{p.handle}</span>
                            </div>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono font-bold">
                            {t.riskLabel} {p.riskScore}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-800" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-slate-900 px-3 text-slate-500 font-semibold">{t.customDivider}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase">{t.profileName}</label>
                    <input
                      type="text"
                      placeholder={t.profileNamePlaceholder}
                      value={isUsingCustom ? customName : ''}
                      onChange={(e) => {
                        setIsUsingCustom(true);
                        setCustomName(e.target.value);
                      }}
                      className="w-full bg-slate-800/50 border border-slate-700 focus:border-amber-500 rounded-xl py-3 px-4 text-sm text-white placeholder-slate-500 outline-none transition"
                    />
                  </div>

                  <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-7">
                      <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase">{t.socialHandle}</label>
                      <input
                        type="text"
                        placeholder={t.socialHandlePlaceholder}
                        value={isUsingCustom ? customHandle : ''}
                        onChange={(e) => {
                          setIsUsingCustom(true);
                          setCustomHandle(e.target.value);
                        }}
                        className="w-full bg-slate-800/50 border border-slate-700 focus:border-amber-500 rounded-xl py-3 px-4 text-sm text-white placeholder-slate-500 outline-none transition"
                      />
                    </div>
                    <div className="col-span-5">
                      <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase">{t.platform}</label>
                      <select
                        value={isUsingCustom ? customPlatform : 'Multiple'}
                        onChange={(e) => {
                          setIsUsingCustom(true);
                          setCustomPlatform(e.target.value as any);
                        }}
                        className="w-full bg-slate-800/50 border border-slate-700 focus:border-amber-500 rounded-xl py-3 px-2 text-sm text-white outline-none transition"
                      >
                        <option value="Multiple">{t.platformOptions.Multiple}</option>
                        <option value="LinkedIn">{t.platformOptions.LinkedIn}</option>
                        <option value="X">{t.platformOptions.X}</option>
                        <option value="Facebook">{t.platformOptions.Facebook}</option>
                      </select>
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
                        <span>{t.scanning}</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4" />
                        <span>{t.runScan}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="bg-[#161d30] border border-slate-800 rounded-2xl min-h-[460px] p-6 relative flex flex-col justify-between">
                  {isEvaluating && (
                    <div className="absolute inset-0 bg-slate-900/95 rounded-2xl flex flex-col items-center justify-center p-8 z-20 transition-all duration-300">
                      <div className="w-16 h-16 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mb-6" />
                      <p className="text-white text-base font-semibold text-center h-8 animate-pulse">{evalStep}</p>
                      <p className="text-slate-400 text-xs mt-2 text-center">{t.evaluatingDesc}</p>
                    </div>
                  )}

                  {evaluationResult && evaluationCopy ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-6 border-b border-slate-800/80 items-center">
                        <div className="md:col-span-4 flex flex-col items-center">
                          <span className="text-[10px] text-slate-400 font-bold uppercase mb-2">{t.socialRiskScore}</span>
                          <div className="relative w-24 h-24 flex items-center justify-center rounded-full bg-slate-800/30 border border-slate-800">
                            <div className="text-center">
                              <span className="text-3xl font-extrabold font-mono tracking-tight text-white">{evaluationResult.riskScore}</span>
                              <span className="block text-[9px] text-slate-400 font-bold uppercase">{t.outOf100}</span>
                            </div>
                            <div className={[
                              'absolute inset-0 rounded-full border-4',
                              evaluationResult.riskScore < 20 ? 'border-green-500/30' : evaluationResult.riskScore < 60 ? 'border-yellow-500/30' : 'border-red-500/30'
                            ].join(' ')} />
                          </div>
                        </div>

                        <div className="md:col-span-8 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-400 uppercase font-bold">{t.decisionRecommendation}</span>
                            <span className={[
                              'text-[10px] font-extrabold px-3 py-1 rounded-full',
                              evaluationResult.recommendation === 'APPROVE'
                                ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                                : evaluationResult.recommendation === 'REVIEW'
                                  ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                                  : 'bg-red-500/10 text-red-400 border border-red-500/30'
                            ].join(' ')}>
                              {t.recommendationLabels[evaluationResult.recommendation]}
                            </span>
                          </div>
                          <p className="text-sm text-slate-300 font-semibold leading-relaxed">
                            {t.recommendationText[evaluationResult.recommendation]}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-slate-300 border-b border-slate-800 pb-2">
                            <UserCheck className="w-4 h-4 text-amber-400" />
                            <span className="text-xs font-bold uppercase tracking-wider">{t.matchedProfileSpecs}</span>
                          </div>
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between"><span className="text-slate-400">{t.targetName}</span><span className="text-white font-semibold">{evaluationCopy.name}</span></div>
                            <div className="flex justify-between"><span className="text-slate-400">{t.targetHandle}</span><span className="text-white font-semibold font-mono">{evaluationResult.handle}</span></div>
                            <div className="flex justify-between"><span className="text-slate-400">{t.matchNetworks}</span><span className="text-white font-semibold font-mono">{evaluationResult.platform}</span></div>
                            <div className="flex justify-between"><span className="text-slate-400">{t.accountAge}</span><span className="text-white font-semibold">{evaluationCopy.profileAge}</span></div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-slate-300 border-b border-slate-800 pb-2">
                            <Activity className="w-4 h-4 text-amber-400" />
                            <span className="text-xs font-bold uppercase tracking-wider">{t.activityMetrics}</span>
                          </div>
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-slate-400">{t.profileStatus}</span>
                              <span className={[
                                'font-semibold',
                                evaluationResult.details.profileStatus === 'Active' ? 'text-green-400' : evaluationResult.details.profileStatus === 'Recently Created' ? 'text-yellow-400' : 'text-red-400'
                              ].join(' ')}>
                                {t.statuses[evaluationResult.details.profileStatus]}
                              </span>
                            </div>
                            <div className="flex justify-between"><span className="text-slate-400">{t.matchedCategory}</span><span className="text-white font-semibold">{evaluationCopy.category}</span></div>
                            <div className="flex justify-between"><span className="text-slate-400">{t.locationMatch}</span><span className="text-white font-semibold font-mono">{evaluationResult.details.locationMatched ? t.verified : t.unmatchedGlobal}</span></div>
                            <div className="flex justify-between"><span className="text-slate-400">{t.estimatedFollowers}</span><span className="text-white font-semibold font-mono">{evaluationResult.followerCount}</span></div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 pt-3 border-t border-slate-800/80">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t.identitySignals}</span>
                        <div className="space-y-1.5">
                          {evaluationCopy.signals.map((sig: string, sIdx: number) => (
                            <div key={sIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                              <CheckCircle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-500" />
                              <span>{sig}</span>
                            </div>
                          ))}
                          {evaluationCopy.riskFlags.map((flag: string, fIdx: number) => (
                            <div key={fIdx} className="flex items-start gap-2.5 text-xs text-amber-300">
                              <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-500" />
                              <span>{flag}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                      <HelpCircle className="w-12 h-12 text-slate-600 mb-4 animate-bounce" />
                      <p className="text-slate-300 text-sm font-semibold">{t.selectOption}</p>
                    </div>
                  )}

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-mono">{t.apiPath}</span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                      <span>{t.sandboxActive}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How teams can use this risk signal (White grid block) */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-28">
        <div className="bg-white rounded-3xl p-8 md:p-14 border border-slate-100 shadow-md">
          <div className="max-w-3xl mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-[#111625] tracking-tight mb-3">{t.useCasesTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.useCases.map((item: any, index: number) => {
              const Icon = [FileText, ShieldCheck, ShieldAlert, Users][index];
              return (
                <div key={item.title} className="space-y-4">
                  <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-[#B37119]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-[#111625]">{item.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Keep Learning Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-28">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-[#111625] tracking-tight">{t.keepLearning}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.articles.map((article: any, index: number) => {
            const Icon = [HelpCircle, AlertCircle, Newspaper][index];
            return (
              <div key={article.title} className="group cursor-pointer space-y-4">
                <div className="aspect-video bg-[#FEF5E7]/50 rounded-2xl overflow-hidden relative border border-slate-200/60 flex items-center justify-center">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px]" />
                  <Icon className="w-12 h-12 text-[#B37119]/80 group-hover:scale-110 transition duration-300" />
                </div>
                <div className="space-y-2">
                  <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">{article.meta}</div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-[#B37119] transition leading-snug">{article.title}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Explore more of Identra's identity platform section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-32">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-[#111625] tracking-tight">{t.exploreTitle}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-50 border border-indigo-100 p-8 md:p-12 rounded-[2rem] flex flex-col justify-between group cursor-pointer hover:border-[#354CE1]/60 transition" onClick={() => onViewChange?.('phone-email-risk')}>
            <div className="space-y-4">
              <div className="w-10 h-10 bg-[#354CE1] text-white rounded-xl flex items-center justify-center font-bold"><FileText className="w-5 h-5" /></div>
              <h3 className="text-2xl font-display font-bold text-slate-900 leading-tight">{t.exploreCards[0].title}</h3>
            </div>
            <div className="pt-8 flex items-center gap-2 text-xs font-bold text-[#354CE1] group-hover:gap-3 transition-all duration-300">
              <span>{t.exploreCards[0].link}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
          <div className="bg-amber-100/60 border border-amber-200 p-8 md:p-12 rounded-[2rem] flex flex-col justify-between group cursor-pointer hover:border-amber-400 transition" onClick={() => onViewChange?.('adverse-media')}>
            <div className="space-y-4">
              <div className="w-10 h-10 bg-amber-500 text-white rounded-xl flex items-center justify-center font-bold"><Newspaper className="w-5 h-5" /></div>
              <h3 className="text-2xl font-display font-bold text-slate-900 leading-tight">{t.exploreCards[1].title}</h3>
            </div>
            <div className="pt-8 flex items-center gap-2 text-xs font-bold text-amber-700 group-hover:gap-3 transition-all duration-300">
              <span>{t.exploreCards[1].link}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Ready to get started Banner */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-32">
        <div className="relative overflow-hidden bg-indigo-100 border border-indigo-200/80 text-[#111625] rounded-[2rem] p-10 md:p-16 text-center shadow-md">
          <div className="max-w-xl mx-auto relative z-10 space-y-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-slate-900">{t.readyTitle}</h2>
            <p className="text-slate-600 text-sm leading-relaxed">{t.readyDesc}</p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={onOpenSandbox} className="bg-[#354CE1] hover:bg-indigo-700 text-white font-semibold px-7 py-3.5 rounded-full text-sm shadow-md transition">{t.tryDemo}</button>
              <button onClick={onOpenSandbox} className="text-[#354CE1] font-bold text-sm hover:text-indigo-800 transition flex items-center gap-1 group">
                <span>{t.tryItNow}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
