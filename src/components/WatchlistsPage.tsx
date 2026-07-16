/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, ShieldCheck, Check, Lock, RefreshCw, Eye, Sparkles, 
  Sliders, Shield, Users, Database, Globe, ChevronRight, ChevronDown, 
  BookOpen, Search, Building, CheckCircle, EyeOff, UserCheck, MapPin, 
  AlertTriangle, Activity, FileText, Layers, Settings, ShieldAlert, BadgeHelp
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { WATCHLISTS_PAGE_TRANSLATIONS } from '../translations/WatchlistsPageTranslations';

interface WatchlistsPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

export default function WatchlistsPage({ onOpenSandbox, onBackToLanding, onViewChange }: WatchlistsPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(WATCHLISTS_PAGE_TRANSLATIONS, language as keyof typeof WATCHLISTS_PAGE_TRANSLATIONS, 'WATCHLISTS_PAGE_TRANSLATIONS');
  // Stepper state for "How it works"
  const [activeStep, setActiveStep] = useState<number>(1);
  
  // Interactive slider states for Step 1: Configure
  const [fuzziness, setFuzziness] = useState<number>(80);
  const [aliasExpansion, setAliasExpansion] = useState<boolean>(true);
  const [nicknameMatching, setNicknameMatching] = useState<boolean>(true);
  const [phoneticsMatching, setPhoneticsMatching] = useState<boolean>(true);
  
  // Interactive state for Step 2: Decide
  const [decideResolution, setDecideResolution] = useState<'pending' | 'approved' | 'declined'>('pending');
  const [decidePortraitMatch, setDecidePortraitMatch] = useState<boolean>(false);

  // Search filter for Lists Section
  const [sanctionsSearch, setSanctionsSearch] = useState<string>('');
  const [selectedListCategory, setSelectedListCategory] = useState<'all' | 'sanctions' | 'warning' | 'pep'>('all');

  // Accordion state
  const [activeAccordion, setActiveAccordion] = useState<string>('name-settings');

  // Keep learning modal
  const [readingArticle, setReadingArticle] = useState<{title: string, content: string} | null>(null);

  const LIST_SOURCES = t.listSources;

  const filteredSources = LIST_SOURCES.filter(source => {
    const matchesSearch = source.name.toLowerCase().includes(sanctionsSearch.toLowerCase()) || 
                          source.region.toLowerCase().includes(sanctionsSearch.toLowerCase()) ||
                          source.desc.toLowerCase().includes(sanctionsSearch.toLowerCase());
    const matchesCategory = selectedListCategory === 'all' || source.type === selectedListCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate simulated match metrics based on sliders
  const calculateSimulatedMetrics = () => {
    // Basic heuristics to make sliders feel realistic and responsive
    let baseMatchRate = 0.8; // default false positive rate representation
    if (fuzziness < 70) baseMatchRate -= 0.45;
    else if (fuzziness < 85) baseMatchRate -= 0.15;
    else baseMatchRate += 0.25;

    if (aliasExpansion) baseMatchRate += 0.12;
    if (nicknameMatching) baseMatchRate += 0.08;
    if (phoneticsMatching) baseMatchRate += 0.15;

    // Constrain percentages
    const finalRate = Math.min(Math.max(Math.round(baseMatchRate * 10), 1), 98);
    const volumeReduced = Math.min(Math.max(100 - finalRate, 5), 99);
    
    return {
      falsePositiveRate: `${finalRate}%`,
      manualReviewSaved: `${volumeReduced}%`,
      accuracyScore: fuzziness > 85 ? t.metricHighPrecision : fuzziness > 70 ? t.metricBalanced : t.metricBroad
    };
  };

  const metrics = calculateSimulatedMetrics();

  const ACCORDION_ITEMS = t.accordion.map((item: any, idx: number) => {
    const content = [
      (
        <div className="space-y-4">
          <p className="text-slate-600 text-xs leading-relaxed">{item.body}</p>
          <div className="bg-[#FAFBFD] p-3.5 rounded-xl border border-slate-100 space-y-3 font-sans text-xs">
            <span className="font-bold text-[10px] text-slate-400 uppercase tracking-wider block">{item.sandboxTitle}</span>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-600 font-medium">{item.inputtedName}</span>
              <span className="font-mono bg-blue-50 text-[#354CE1] px-2 py-0.5 rounded font-bold">{t.sampleNames.input}</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">{item.target} <span className="font-mono text-slate-800">{t.sampleNames.rob}</span></span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1"><Check className="w-3.5 h-3.5" /> {item.matchedNickname}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">{item.target} <span className="font-mono text-slate-800">{t.sampleNames.fuzzy}</span></span>
                <span className="text-amber-600 font-semibold flex items-center gap-1"><Check className="w-3.5 h-3.5" /> {item.matchedFuzzy}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">{item.target} <span className="font-mono text-slate-800">{t.sampleNames.belowThreshold}</span></span>
                <span className="text-slate-400 font-medium flex items-center gap-1"><EyeOff className="w-3.5 h-3.5" /> {item.ignoredThreshold}</span>
              </div>
            </div>
          </div>
        </div>
      ),
      (
        <div className="space-y-4">
          <p className="text-slate-600 text-xs leading-relaxed">{item.body}</p>
          <div className="bg-[#FAFBFD] p-3 rounded-xl border border-slate-100 space-y-2 font-sans text-xs">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-100 rounded-full overflow-hidden flex items-center justify-center shrink-0 border border-slate-200">
                <img src="/src/assets/images/identra_identity_illustration_1783335932193.jpg" alt={item.selfieAlt} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex justify-between text-[11px] font-bold text-slate-700">
                  <span>{item.biometricSimilarity}</span>
                  <span className="text-emerald-600">{item.matchLabel}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '94.8%' }} />
                </div>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 leading-normal">{item.result}</p>
          </div>
        </div>
      ),
      (
        <div className="space-y-4">
          <p className="text-slate-600 text-xs leading-relaxed">{item.body}</p>
          <div className="bg-slate-900 text-slate-100 p-3.5 rounded-xl font-mono text-[11px] space-y-1.5">
            <p className="text-slate-400">{item.codeComment}</p>
            <p className="text-indigo-300">{t.geoCode.ifLine} <span className="text-white">{t.geoCode.condition}</span> &#123;</p>
            <p className="pl-4 text-emerald-400">{t.geoCode.confidence}</p>
            <p className="pl-4 text-slate-400">{t.geoCode.notePrefix}("{item.codeNote}");</p>
            <p className="text-indigo-300">&#125;</p>
          </div>
        </div>
      ),
      (
        <div className="space-y-3">
          <p className="text-slate-600 text-xs leading-relaxed">{item.body}</p>
          <div className="border border-slate-150 rounded-xl p-3 bg-white flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-400" />
              <div>
                <p className="font-bold text-slate-800">{item.passportOcr}</p>
                <p className="font-mono text-[10px] text-slate-400">{item.docId}</p>
              </div>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><Check className="w-3 h-3" /> {item.noWatchlistMatch}</span>
          </div>
        </div>
      ),
      (
        <div className="space-y-3">
          <p className="text-slate-600 text-xs leading-relaxed">{item.body}</p>
          <div className="p-3 bg-amber-50/50 border border-amber-200/60 rounded-xl text-xs text-amber-900 leading-relaxed">
            <span className="font-bold block text-amber-800 mb-1">{item.reference}</span>
            {item.quote}
          </div>
        </div>
      ),
      (
        <div className="space-y-3">
          <p className="text-slate-600 text-xs leading-relaxed">{item.body}</p>
          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="p-2 border border-slate-200 rounded-lg bg-red-50 text-red-800 font-semibold">{item.classI}</div>
            <div className="p-2 border border-slate-200 rounded-lg bg-orange-50 text-orange-800 font-semibold">{item.classII}</div>
          </div>
        </div>
      ),
      (
        <div className="space-y-3">
          <p className="text-slate-600 text-xs leading-relaxed">{item.body}</p>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#354CE1]">
            <Activity className="w-4 h-4 animate-spin" />
            <span>{item.activeMonitoring}</span>
          </div>
        </div>
      )
    ];

    return { ...item, content: content[idx] };
  });

  return (
    <div className="bg-[#FAFBFD] pb-16">
      {/* Saffron-Themed Interactive Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#E29202] via-[#E18E00] to-[#C97E00] text-white pt-16 pb-20 px-6">
        {/* Subtle decorative background grids */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-300 rounded-full blur-3xl opacity-25" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb / Back button */}
          <button 
            onClick={onBackToLanding}
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-100 hover:text-white transition mb-8 bg-amber-800/20 hover:bg-amber-800/40 px-3.5 py-2 rounded-full border border-amber-300/20"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.backToPlatform}</span>
          </button>

          {/* Hero Content layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              {/* Product Badge */}
              <div className="inline-flex items-center gap-2 bg-amber-950/20 border border-amber-300/30 px-3.5 py-1.5 rounded-full">
                <ShieldAlert className="w-4 h-4 text-amber-200" />
                <span className="text-xs font-semibold text-amber-100 uppercase tracking-wider">{t.reports}</span>
                <span className="text-[10px] text-amber-200 bg-amber-950/40 px-1.5 py-0.5 rounded-md font-bold font-mono">{t.watchlists}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-display font-bold leading-[1.1] tracking-tight">
                {t.heroTitle}
              </h1>
              
              <p className="text-base md:text-lg text-amber-50 leading-relaxed max-w-xl font-light">
                {t.heroDesc}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <button 
                  onClick={onOpenSandbox}
                  className="bg-white hover:bg-amber-50 text-[#C97E00] font-semibold px-6 py-3.5 rounded-full text-sm shadow-md transition flex items-center gap-2 group"
                >
                  <span>{t.getDemo}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </button>
                <button 
                  onClick={onOpenSandbox}
                  className="border border-white/40 hover:bg-white/10 text-white font-semibold px-6 py-3.5 rounded-full text-sm transition"
                >
                  <span>{t.exploreSandbox}</span>
                </button>
              </div>
            </div>

            {/* Interactive Hero Graphic: Live Watchlist Screening Widget */}
            <div className="lg:col-span-5 bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-amber-500/20 text-slate-800">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-[#E18E00]">
                    <ShieldCheck className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 leading-none">{t.matcherTitle}</h3>
                    <p className="text-[10px] text-slate-400">{t.matcherSubtitle}</p>
                  </div>
                </div>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 uppercase tracking-wide">
                  <Activity className="w-3 h-3 animate-pulse" /> {t.liveActive}
                </span>
              </div>

              {/* Simulated Match Dossier */}
              <div className="space-y-4">
                <div className="bg-[#FAFBFD] p-3 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{t.customerProfile}</p>
                    <p className="text-xs font-bold text-slate-800">{t.customerName}</p>
                    <p className="text-[10px] text-slate-500">{t.customerDob}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded-md">
                      {t.potentialHit}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-1">{t.textMatchScore}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.screeningMatchedSources}</p>
                  <div className="border border-red-100 bg-red-50/50 p-3 rounded-xl space-y-2 text-xs">
                    <div className="flex items-start justify-between">
                      <span className="font-bold text-red-950 font-mono text-[11px]">{t.heroMatchSourceName}</span>
                      <span className="text-[10px] text-red-700 bg-red-100 px-1.5 py-0.5 rounded">{t.listedEntity}</span>
                    </div>
                    <p className="text-red-900/80 text-[10px] leading-relaxed">
                      {t.heroMatchCopy} <span className="font-bold font-mono text-red-950">{t.heroAliasName}</span>. {t.heroMatchReason}
                    </p>
                  </div>
                </div>

                {/* Resolution buttons */}
                <div className="border-t border-slate-100 pt-3 flex gap-2">
                  <button 
                    onClick={onOpenSandbox} 
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg text-[11px] transition text-center"
                  >
                    {t.investigateCase}
                  </button>
                  <button 
                    onClick={onOpenSandbox} 
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 rounded-lg text-[11px] transition text-center"
                  >
                    {t.falsePositive}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Under Hero: 3 feature pillars */}
          <div className="mt-16 pt-8 border-t border-amber-300/30 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-200 shrink-0" />
                <span>{t.heroPillars[0].title}</span>
              </h3>
              <p className="text-xs text-amber-100 leading-relaxed font-light">
                {t.heroPillars[0].desc}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-200 shrink-0" />
                <span>{t.heroPillars[1].title}</span>
              </h3>
              <p className="text-xs text-amber-100 leading-relaxed font-light">
                {t.heroPillars[1].desc}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-200 shrink-0" />
                <span>{t.heroPillars[2].title}</span>
              </h3>
              <p className="text-xs text-amber-100 leading-relaxed font-light">
                {t.heroPillars[2].desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Step-by-Step "How it works" Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-3 mb-12">
          <span className="text-[#E18E00] text-xs font-bold uppercase tracking-wider">{t.workflowLabel}</span>
          <h2 className="text-3xl font-display font-bold text-slate-900">{t.howItWorks}</h2>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">
            {t.workflowDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Steps Left Selector: Col span 4 */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-2.5">
            {t.workflowSteps.map((step: any) => (
              <button
                key={step.num}
                onClick={() => setActiveStep(step.num)}
                className={`w-full text-left p-5 rounded-2xl border transition duration-300 flex items-start gap-4 ${
                  activeStep === step.num
                    ? 'bg-white border-amber-500 shadow-lg text-slate-900'
                    : 'bg-transparent border-slate-100 hover:border-slate-200 text-slate-600'
                }`}
              >
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${
                  activeStep === step.num ? 'bg-[#E18E00] text-white' : 'bg-slate-100 text-slate-400'
                }`}>
                  {step.num}
                </span>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm">{step.title}</h4>
                  <p className="text-[11px] leading-relaxed text-slate-400">{step.desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Step Graphic Preview Panel: Col span 8 */}
          <div className="lg:col-span-8 bg-white border border-slate-150 rounded-3xl p-6 flex flex-col justify-between shadow-sm min-h-[440px]">
            {activeStep === 1 && (
              <div className="space-y-6 flex flex-col justify-between h-full">
                <div className="space-y-2">
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">{t.step1Badge}</span>
                  <h3 className="text-lg font-bold text-slate-900">{t.step1Title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {t.step1Desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#FAFBFD] p-5 rounded-2xl border border-slate-100">
                  {/* Sliders & toggles */}
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-slate-700">
                        <span>{t.fuzzinessTolerance}</span>
                        <span className="text-[#E18E00]">{fuzziness}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="50" 
                        max="100" 
                        value={fuzziness}
                        onChange={(e) => setFuzziness(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#E18E00]" 
                      />
                      <div className="flex justify-between text-[9px] text-slate-400">
                        <span>{t.broadLoose}</span>
                        <span>{t.strictExact}</span>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-xs font-medium text-slate-700">{t.aliasExpansion}</span>
                        <input 
                          type="checkbox" 
                          checked={aliasExpansion} 
                          onChange={() => setAliasExpansion(!aliasExpansion)}
                          className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 accent-[#E18E00]" 
                        />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-xs font-medium text-slate-700">{t.nicknameMatching}</span>
                        <input 
                          type="checkbox" 
                          checked={nicknameMatching} 
                          onChange={() => setNicknameMatching(!nicknameMatching)}
                          className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 accent-[#E18E00]" 
                        />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-xs font-medium text-slate-700">{t.phoneticsMatching}</span>
                        <input 
                          type="checkbox" 
                          checked={phoneticsMatching} 
                          onChange={() => setPhoneticsMatching(!phoneticsMatching)}
                          className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 accent-[#E18E00]" 
                        />
                      </label>
                    </div>
                  </div>

                  {/* Simulated outcome indicators */}
                  <div className="bg-white p-4 rounded-xl border border-slate-150 flex flex-col justify-between shadow-xs">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">{t.simulatedOutcomeMetrics}</p>
                    <div className="space-y-3">
                      <div>
                        <p className="text-[11px] text-slate-500 font-medium">{t.estimatedMatchRate}</p>
                        <p className="text-2xl font-bold font-mono text-[#E18E00]">{metrics.falsePositiveRate}</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-slate-500 font-medium">{t.manualReviewVolumeSliced}</p>
                        <p className="text-2xl font-bold font-mono text-emerald-600">{metrics.manualReviewSaved}</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-slate-500 font-medium">{t.screeningModeSetting}</p>
                        <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                          <span className={`w-2 h-2 rounded-full ${fuzziness > 85 ? 'bg-indigo-500' : 'bg-emerald-500'}`} />
                          {metrics.accuracyScore}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 text-center italic">
                  {t.step1Tip}
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className="space-y-6 flex flex-col justify-between h-full">
                <div className="space-y-2">
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">{t.step2Badge}</span>
                  <h3 className="text-lg font-bold text-slate-900">{t.step2Title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {t.step2Desc}
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 text-xs text-slate-800 space-y-3">
                  <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100">
                    <div className="space-y-0.5">
                      <p className="font-bold">{t.matchCaseTitle}</p>
                      <p className="text-[10px] text-slate-400">{t.sanctionCategory}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${
                      decideResolution === 'pending' ? 'bg-amber-100 text-[#E18E00] animate-pulse' :
                      decideResolution === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {t.statusLabels[decideResolution]}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded-xl border border-slate-100 space-y-1.5">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">{t.userInformation}</p>
                      <p className="font-semibold text-slate-800">{t.userInfoName}</p>
                      <p className="text-[10px] text-slate-500">{t.userInfoDob}</p>
                      <div className="pt-2">
                        <button
                          onClick={() => setDecidePortraitMatch(!decidePortraitMatch)}
                          className="w-full text-left bg-[#354CE1]/5 hover:bg-[#354CE1]/10 text-[#354CE1] p-1.5 rounded text-[10px] font-semibold flex items-center justify-between"
                        >
                          <span>{decidePortraitMatch ? t.biometricMatchEnabled : t.runPortraitMatch}</span>
                          <span className="text-[9px] bg-[#354CE1] text-white px-1.5 py-0.5 rounded font-mono">{t.facialAi}</span>
                        </button>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-100 space-y-1.5">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">{t.watchlistDossier}</p>
                      <p className="font-semibold text-red-700">{t.dossierName}</p>
                      <p className="text-[10px] text-slate-500">{t.dossierDob}</p>
                      {decidePortraitMatch ? (
                        <p className="text-[10px] text-emerald-600 font-medium bg-emerald-50 p-1 rounded mt-1.5">
                          {t.faceMismatch}
                        </p>
                      ) : (
                        <p className="text-[10px] text-amber-600 font-medium bg-amber-50 p-1 rounded mt-1.5">
                          {t.cautionCommonName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Resolution CTA triggers */}
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setDecideResolution('approved')}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg text-xs transition text-center"
                    >
                      {t.clearProfile}
                    </button>
                    <button 
                      onClick={() => setDecideResolution('declined')}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg text-xs transition text-center"
                    >
                      {t.declineProfile}
                    </button>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 text-center">
                  {t.step2Audit}
                </div>
              </div>
            )}

            {activeStep === 3 && (
              <div className="space-y-6 flex flex-col justify-between h-full">
                <div className="space-y-2">
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">{t.step3Badge}</span>
                  <h3 className="text-lg font-bold text-slate-900">{t.step3Title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {t.step3Desc}
                  </p>
                </div>

                {/* Workflow graph simulation */}
                <div className="bg-[#FAFBFD] p-5 rounded-2xl border border-slate-100 flex flex-col items-center justify-center space-y-4 py-8">
                  <div className="w-40 bg-white border border-slate-200 text-center py-2 px-3 rounded-xl shadow-xs text-xs font-semibold text-slate-800 flex items-center justify-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-slate-500" /> {t.userSignsUp}
                  </div>
                  
                  <div className="h-6 w-0.5 bg-slate-300" />
                  
                  <div className="w-44 bg-amber-500 text-white text-center py-2 px-3 rounded-xl shadow-sm text-xs font-semibold flex items-center justify-center gap-1.5">
                    <Search className="w-3.5 h-3.5 text-amber-100" /> {t.checkWatchlists}
                  </div>

                  <div className="h-6 w-0.5 bg-slate-300" />

                  <div className="flex gap-4 w-full justify-center">
                    <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-xs text-center space-y-1 w-36">
                      <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md uppercase">{t.ifClear}</span>
                      <p className="text-xs font-bold text-slate-800">{t.autoApprove}</p>
                      <p className="text-[9px] text-slate-400 font-mono">{t.seconds}</p>
                    </div>

                    <div className="bg-white border border-red-200 p-3 rounded-xl shadow-xs text-center space-y-1 w-36">
                      <span className="text-[9px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded-md uppercase">{t.ifPotentialHit}</span>
                      <p className="text-xs font-bold text-slate-800">{t.routeToCases}</p>
                      <p className="text-[9px] text-slate-400 font-mono">{t.triggersReviewQueue}</p>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 text-center">
                  {t.step3Note}
                </div>
              </div>
            )}

            {activeStep === 4 && (
              <div className="space-y-6 flex flex-col justify-between h-full">
                <div className="space-y-2">
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">{t.step4Badge}</span>
                  <h3 className="text-lg font-bold text-slate-900">{t.step4Title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {t.step4Desc}
                  </p>
                </div>

                <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-[11px] space-y-3 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                    <span>{t.webhookDispatcher}</span>
                    <span className="text-emerald-500">{t.stableConnection}</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-emerald-400">{t.webhookLines[0]}</p>
                    <p className="text-slate-400">{t.webhookLines[1]}</p>
                    <p className="text-[#E18E00]">&#123;</p>
                    <p className="pl-4">{t.webhookLines[2]}</p>
                    <p className="pl-4">{t.webhookLines[3]}</p>
                    <p className="pl-4">{t.webhookLines[4]}</p>
                    <p className="pl-4">{t.webhookLines[5]}</p>
                    <p className="pl-4">{t.webhookLines[6]}</p>
                    <p className="text-[#E18E00]">&#125;</p>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 text-center">
                  {t.step4Note}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Select the lists to screen users against section */}
      <section className="bg-white border-y border-slate-150 py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-[#E18E00] text-xs font-bold uppercase tracking-wider">{t.databaseCoverage}</span>
              <h2 className="text-3xl font-display font-bold text-slate-900">{t.listTitle}</h2>
              <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
                {t.listDesc}
              </p>
            </div>
            
            {/* Search Input Box */}
            <div className="lg:col-span-4 relative">
              <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input 
                type="text" 
                placeholder={t.searchPlaceholder}
                value={sanctionsSearch}
                onChange={(e) => setSanctionsSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-[#FAFBFD] focus:outline-none focus:border-amber-500 transition"
              />
            </div>
          </div>

          {/* Filter Categories tabs */}
          <div className="flex gap-2 border-b border-slate-100 pb-2 overflow-x-auto scrollbar-none">
            {t.listTabs.map((tab: any) => (
              <button
                key={tab.id}
                onClick={() => setSelectedListCategory(tab.id as any)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition shrink-0 ${
                  selectedListCategory === tab.id 
                    ? 'bg-amber-100 text-amber-900 font-bold' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSources.map((source, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-slate-100 hover:border-amber-200 hover:shadow-md bg-[#FAFBFD] transition duration-200 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase ${
                      source.type === 'sanctions' ? 'bg-red-100 text-red-800' :
                      source.type === 'pep' ? 'bg-indigo-100 text-indigo-800' : 'bg-amber-100 text-amber-900'
                    }`}>
                      {t.typeLabels[source.type] || source.type}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {source.region}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">{source.name}</h4>
                  <p className="text-[11px] text-slate-400 leading-normal">{source.desc}</p>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold pt-2 border-t border-slate-100/60">
                  <CheckCircle className="text-emerald-500 w-3.5 h-3.5" />
                  <span>{t.configuredActive}</span>
                </div>
              </div>
            ))}
            {filteredSources.length === 0 && (
              <div className="col-span-full text-center py-12 text-slate-400 text-xs">
                {t.noSourcePrefix} "{sanctionsSearch}". {t.noSourceSuffix}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Accordion List Settings: Key Features section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Header left */}
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
            <span className="text-[#E18E00] text-xs font-bold uppercase tracking-wider">{t.featureDeepDive}</span>
            <h2 className="text-3xl font-display font-bold text-slate-900 leading-tight">
              {t.featureTitle}
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t.featureDesc}
            </p>
            <div className="pt-2">
              <button 
                onClick={onOpenSandbox}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#354CE1] hover:text-[#2539BE]"
              >
                <span>{t.readDocs}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Accordion list right */}
          <div className="lg:col-span-8 space-y-3">
            {ACCORDION_ITEMS.map((item) => (
              <div 
                key={item.id}
                className="bg-white border border-slate-150 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setActiveAccordion(activeAccordion === item.id ? '' : item.id)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-800 block">{item.title}</span>
                    <span className="text-[11px] text-slate-400 font-normal block">{item.short}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                    activeAccordion === item.id ? 'rotate-180 text-amber-500' : ''
                  }`} />
                </button>
                
                {activeAccordion === item.id && (
                  <div className="px-5 pb-5 border-t border-slate-50 pt-4 animate-in fade-in duration-200">
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How teams can use watchlists */}
      <section className="bg-slate-900 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">{t.useCasesLabel}</span>
            <h2 className="text-3xl font-display font-bold">{t.useCasesTitle}</h2>
            <p className="text-xs text-slate-400 max-w-lg mx-auto">
              {t.useCasesDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.useCases.map((useCase: any, idx: number) => (
              <div key={idx} className="bg-slate-850 p-6 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-6 hover:border-slate-750 transition group">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wide">{useCase.tag}</span>
                    <h4 className="text-lg font-bold text-white group-hover:text-amber-400 transition">{useCase.title}</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">{useCase.desc}</p>
                  
                  <div className="space-y-1.5 pt-2">
                    {useCase.benefits.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2 text-xs text-slate-400">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button 
                  onClick={onOpenSandbox}
                  className="w-full text-center bg-slate-800 hover:bg-slate-750 text-white font-semibold py-2.5 rounded-xl text-xs transition"
                >
                  {t.configureWorkflow}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Keep learning section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-10 border-b border-slate-100 pb-4">
          <div className="space-y-2">
            <span className="text-[#E18E00] text-xs font-bold uppercase tracking-wider">{t.resourcesLabel}</span>
            <h2 className="text-3xl font-display font-bold text-slate-900">{t.keepLearning}</h2>
          </div>
          <button 
            onClick={onOpenSandbox}
            className="text-xs font-bold text-[#354CE1] hover:text-[#2539BE] flex items-center gap-1 transition"
          >
            <span>{t.seeAllResources}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.learningCards.map((blog: any, idx: number) => (
            <div 
              key={idx} 
              className="bg-white border border-slate-150 rounded-2xl overflow-hidden hover:shadow-lg transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden">
                  <img 
                    src="/src/assets/images/identra_identity_illustration_1783335932193.jpg" 
                    alt={blog.title} 
                    className="w-full h-full object-cover transition duration-300 hover:scale-105" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded text-[9px] font-bold text-slate-800 shadow-xs">
                    {t.amlEducation}
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{blog.tag}</span>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">{blog.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-light">{blog.desc}</p>
                </div>
              </div>
              <div className="px-5 pb-5">
                <button
                  onClick={() => setReadingArticle({ title: blog.title, content: blog.detailed })}
                  className="text-xs font-bold text-[#354CE1] hover:text-[#2539BE] flex items-center gap-1 mt-2.5"
                >
                  <span>{t.readArticle}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Explore more of Identra's identity platform */}
      <section className="bg-[#FAFBFD] border-t border-slate-150 py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-[#E18E00] text-xs font-bold uppercase tracking-wider">{t.synergyLabel}</span>
            <h2 className="text-3xl font-display font-bold text-slate-900">{t.exploreTitle}</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              {t.exploreDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Link card 1: Government IDs */}
            <div 
              onClick={() => { if (onViewChange) onViewChange('government-id'); }}
              className="bg-white border border-slate-150 rounded-[2rem] p-8 hover:shadow-xl hover:border-emerald-300 transition duration-300 cursor-pointer flex flex-col justify-between group min-h-[220px]"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition duration-300">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-base font-bold text-slate-900">{t.exploreCards[0].title}</h4>
                  <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                    {t.exploreCards[0].desc}
                  </p>
                </div>
              </div>
              <p className="text-xs font-bold text-emerald-600 flex items-center gap-1 pt-4 group-hover:translate-x-1.5 transition-transform duration-300">
                <span>{t.exploreCards[0].cta}</span>
                <ArrowRight className="w-4 h-4" />
              </p>
            </div>

            {/* Link card 2: Phone & Email */}
            <div 
              onClick={() => { if (onViewChange) onViewChange('phone-email'); }}
              className="bg-white border border-slate-150 rounded-[2rem] p-8 hover:shadow-xl hover:border-amber-300 transition duration-300 cursor-pointer flex flex-col justify-between group min-h-[220px]"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-[#E18E00] flex items-center justify-center group-hover:bg-[#E18E00] group-hover:text-white transition duration-300">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-base font-bold text-slate-900">{t.exploreCards[1].title}</h4>
                  <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                    {t.exploreCards[1].desc}
                  </p>
                </div>
              </div>
              <p className="text-xs font-bold text-[#E18E00] flex items-center gap-1 pt-4 group-hover:translate-x-1.5 transition-transform duration-300">
                <span>{t.exploreCards[1].cta}</span>
                <ArrowRight className="w-4 h-4" />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Reading Blogs */}
      {readingArticle && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full border border-slate-150 shadow-2xl relative flex flex-col gap-4 animate-in zoom-in-95 duration-200 text-slate-800">
            <h3 className="text-sm font-bold text-slate-900 pr-8 leading-snug">{readingArticle.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              {readingArticle.content}
            </p>
            <div className="border-t border-slate-100 pt-3 flex justify-end">
              <button
                onClick={() => setReadingArticle(null)}
                className="bg-[#354CE1] hover:bg-[#2539BE] text-white font-semibold text-xs px-4 py-2 rounded-lg shadow-sm transition"
              >
                {t.closeArticle}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
