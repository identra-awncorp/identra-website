/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, Check, Play, Sliders, Shield, Users, Globe, 
  ChevronDown, Search, CheckCircle, Eye, Activity, FileText, Settings, 
  Newspaper, AlertOctagon, HelpCircle, ArrowRightCircle, Sparkles, AlertCircle,
  ExternalLink, Layers
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { ADVERSE_MEDIA_TRANSLATIONS } from '../translations/AdverseMediaPageTranslations';

interface AdverseMediaPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

export default function AdverseMediaPage({ onOpenSandbox, onBackToLanding, onViewChange }: AdverseMediaPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(ADVERSE_MEDIA_TRANSLATIONS, language as keyof typeof ADVERSE_MEDIA_TRANSLATIONS, 'ADVERSE_MEDIA_TRANSLATIONS');

  // Stepper state for "How it works"
  const [activeStep, setActiveStep] = useState<number>(1);
  
  // Accordion state
  const [activeAccordion, setActiveAccordion] = useState<string>('category-match');

  // Interactive state for Step 1: Filter news
  const [financialCrimeFilter, setFinancialCrimeFilter] = useState<boolean>(true);
  const [terrorismFilter, setTerrorismFilter] = useState<boolean>(true);
  const [fraudFilter, setFraudFilter] = useState<boolean>(false);
  
  // Interactive state for Step 2: Risk analysis
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(80);

  // Articles category checklists for Feature Accordion
  const [categories, setCategories] = useState({
    financialCrime: true,
    narcotics: true,
    terrorism: true,
    corruption: true,
    cybercrime: false,
    environmental: false
  });

  const featureItems = [
    {
      id: 'category-match',
      title: t.feature1Title,
      desc: t.feature1Desc,
      detail: (
        <div className="space-y-3 pt-3">
          <p className="text-slate-500 text-xs">{t.chooseThemes}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              { id: 'financialCrime', label: t.financialCrimeFraud },
              { id: 'narcotics', label: t.narcoticsTrafficking },
              { id: 'terrorism', label: t.terrorismRadicalism },
              { id: 'corruption', label: t.corruptionBribery },
              { id: 'cybercrime', label: t.cybercrimeTheft },
              { id: 'environmental', label: t.environmentalCrime }
            ].map((cat) => (
              <label key={cat.id} className="flex items-center gap-2.5 bg-slate-50 hover:bg-slate-100/80 p-2 rounded-xl border border-slate-100 text-xs font-medium cursor-pointer transition">
                <input 
                  type="checkbox" 
                  checked={(categories as any)[cat.id]}
                  onChange={() => setCategories({ ...categories, [cat.id]: !(categories as any)[cat.id] })}
                  className="rounded border-slate-300 text-[#F2A122] focus:ring-amber-500 accent-[#F2A122]"
                />
                <span>{cat.label}</span>
              </label>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'level-filtering',
      title: t.feature2Title,
      desc: t.feature2Desc,
      detail: (
        <div className="pt-3 text-xs text-slate-500 leading-relaxed space-y-2">
          <p>{t.feature2Detail}</p>
          <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-200 text-amber-900 text-[11px] font-semibold">
            {t.feature2Tip}
          </div>
        </div>
      )
    },
    {
      id: 'name-matching',
      title: t.feature3Title,
      desc: t.feature3Desc,
      detail: (
        <div className="pt-3 text-xs text-slate-500 leading-relaxed space-y-2">
          <p>{t.feature3Detail}</p>
        </div>
      )
    },
    {
      id: 'birthdate-matching',
      title: t.feature4Title,
      desc: t.feature4Desc,
      detail: (
        <div className="pt-3 text-xs text-slate-500 leading-relaxed space-y-2">
          <p>{t.feature4Detail}</p>
        </div>
      )
    }
  ];

  return (
    <div className="bg-[#FAFBFD] pb-16">
      {/* Saffron-Themed Interactive Hero Section */}
      <section className="relative overflow-hidden bg-[#F2A122] text-white pt-16 pb-20 px-6">
        {/* Subtle decorative background grids */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-200 rounded-full blur-3xl opacity-20" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb / Back button */}
          <button 
            onClick={onBackToLanding}
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-50 hover:text-white transition mb-8 bg-amber-800/10 hover:bg-amber-800/20 px-3.5 py-2 rounded-full border border-white/10"
            id="adverse-media-back-btn"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.backToPlatform}</span>
          </button>
          
          {/* Hero Content layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-12 space-y-6">
              {/* Product Badge */}
              <div className="inline-flex items-center gap-2 bg-amber-950/10 border border-white/20 px-3.5 py-1.5 rounded-full" id="adverse-media-badge">
                <Newspaper className="w-4 h-4 text-amber-100" />
                <span className="text-xs font-semibold text-amber-50 uppercase tracking-wider">{t.badgeLabel}</span>
                <span className="text-[10px] text-amber-100 bg-amber-950/30 px-1.5 py-0.5 rounded-md font-bold font-mono">{t.badgeTag}</span>
              </div>

              <h1 className="text-4xl md:text-[54px] font-display font-bold leading-[1.1] tracking-tight max-w-4xl" id="adverse-media-title">
                {t.heroTitle}
              </h1>

              <div className="pt-4">
                <button 
                  onClick={onOpenSandbox}
                  className="bg-white hover:bg-amber-50 text-[#F2A122] font-semibold px-6 py-3.5 rounded-full text-sm shadow-md transition flex items-center gap-2 group"
                  id="adverse-media-demo-btn"
                >
                  <span>{t.tryDemo}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </button>
              </div>
            </div>
          </div>

          {/* Under Hero: 3 feature pillars */}
          <div className="mt-16 pt-8 border-t border-white/20 grid grid-cols-1 md:grid-cols-3 gap-8" id="adverse-media-pillars">
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-200" />
                <span>{t.pillar1Title}</span>
              </h3>
              <p className="text-xs text-amber-50 leading-relaxed font-light">
                {t.pillar1Desc}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-200" />
                <span>{t.pillar2Title}</span>
              </h3>
              <p className="text-xs text-amber-50 leading-relaxed font-light">
                {t.pillar2Desc}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-200" />
                <span>{t.pillar3Title}</span>
              </h3>
              <p className="text-xs text-amber-50 leading-relaxed font-light">
                {t.pillar3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* "How it works" Interactive Stepper Section */}
      <section className="max-w-7xl mx-auto px-6 py-20" id="adverse-media-how-it-works">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-3xl font-display font-bold text-slate-900">{t.howItWorks}</h2>
        </div>

        {/* Dynamic Stepper controls */}
        <div className="flex justify-center border-b border-slate-200 pb-4 mb-8 overflow-x-auto scrollbar-none gap-8 md:gap-12 text-sm font-medium">
          {[
            { num: 1, label: t.step1Label },
            { num: 2, label: t.step2Label },
            { num: 3, label: t.step3Label },
            { num: 4, label: t.step4Label }
          ].map(step => (
            <button
              key={step.num}
              onClick={() => setActiveStep(step.num)}
              className={`pb-4 relative transition flex items-center gap-2 shrink-0 ${
                activeStep === step.num
                  ? 'text-slate-900 font-bold border-b-2 border-[#F2A122]'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
              id={`how-step-tab-${step.num}`}
            >
              <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center border ${
                activeStep === step.num 
                  ? 'bg-[#F2A122] text-white border-[#F2A122]' 
                  : 'border-slate-300 text-slate-400'
              }`}>
                {step.num}
              </span>
              <span>{step.label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Canvas Container */}
        <div className="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] rounded-3xl p-8 md:p-12 min-h-[460px] flex flex-col lg:flex-row items-center justify-between gap-12 shadow-sm border border-amber-200">
          {/* Left panel: text details */}
          <div className="lg:w-1/2 space-y-4">
            {activeStep === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-left duration-300">
                <h3 className="text-2xl md:text-3xl font-bold text-amber-950 font-display">{t.step1Title}</h3>
                <p className="text-slate-700 text-sm leading-relaxed max-w-md">
                  {t.step1Desc}
                </p>
                <div className="space-y-2.5 bg-white/40 p-4 rounded-2xl border border-amber-200 max-w-sm">
                  <p className="text-[11px] font-bold text-amber-900 uppercase">{t.interactiveSimulation}</p>
                  <label className="flex items-center gap-3 cursor-pointer text-xs font-semibold text-slate-800">
                    <input 
                      type="checkbox" 
                      checked={financialCrimeFilter} 
                      onChange={() => setFinancialCrimeFilter(!financialCrimeFilter)}
                      className="rounded border-amber-300 text-amber-600 focus:ring-amber-500 accent-[#F2A122]"
                    />
                    <span>{t.highlightFinancialCrimes}</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer text-xs font-semibold text-slate-800">
                    <input 
                      type="checkbox" 
                      checked={terrorismFilter} 
                      onChange={() => setTerrorismFilter(!terrorismFilter)}
                      className="rounded border-amber-300 text-amber-600 focus:ring-amber-500 accent-[#F2A122]"
                    />
                    <span>{t.highlightTerrorFinancing}</span>
                  </label>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-left duration-300">
                <h3 className="text-2xl md:text-3xl font-bold text-amber-950 font-display">{t.step2Title}</h3>
                <p className="text-slate-700 text-sm leading-relaxed max-w-md">
                  {t.step2Desc}
                </p>
                <div className="space-y-3 bg-white/40 p-4 rounded-2xl border border-amber-200 max-w-sm">
                  <div className="flex justify-between text-xs font-bold text-slate-800">
                    <span>{t.severityThreshold}</span>
                    <span className="text-[#F2A122]">{confidenceThreshold}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="50" 
                    max="95" 
                    value={confidenceThreshold}
                    onChange={(e) => setConfidenceThreshold(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-amber-100 rounded-lg cursor-pointer accent-[#F2A122]" 
                  />
                  <p className="text-[10px] text-slate-600 leading-tight">
                    {t.adjustFilterDesc}
                  </p>
                </div>
              </div>
            )}

            {activeStep === 3 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-left duration-300">
                <h3 className="text-2xl md:text-3xl font-bold text-amber-950 font-display">{t.step3Title}</h3>
                <p className="text-slate-700 text-sm leading-relaxed max-w-md">
                  {t.step3Desc}
                </p>
                <div className="bg-white/40 p-4 rounded-2xl border border-amber-200 max-w-sm space-y-2">
                  <p className="text-[11px] font-bold text-amber-900 uppercase">{t.autoAuditingLogs}</p>
                  <div className="flex gap-2 items-center text-xs text-slate-700 font-semibold">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{t.complianceOfficerCleared}</span>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 4 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-left duration-300">
                <h3 className="text-2xl md:text-3xl font-bold text-amber-950 font-display">{t.step4Title}</h3>
                <p className="text-slate-700 text-sm leading-relaxed max-w-md">
                  {t.step4Desc}
                </p>
                <div className="bg-white/40 p-4 rounded-2xl border border-amber-200 max-w-sm space-y-1 text-xs">
                  <p className="text-[11px] font-bold text-amber-900 uppercase mb-1">{t.webhookDispatcherStatus}</p>
                  <p className="font-mono text-[11px] text-amber-950">{t.activeMonitoredProfiles}</p>
                  <p className="font-mono text-[10px] text-emerald-700 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    <span>{t.realtimeQueueListening}</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right panel: High-fidelity interactive mockup */}
          <div className="lg:w-1/2 w-full max-w-md bg-white rounded-2xl shadow-xl border border-amber-200 p-5 text-slate-800 relative overflow-hidden shrink-0">
            {/* Window bar */}
            <div className="flex items-center gap-1.5 border-b border-slate-100 pb-3 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] text-slate-400 ml-2 font-mono">{t.dashboardTitle}</span>
            </div>

            {/* Stepper output visualization */}
            {activeStep === 1 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                {/* News Article Lists */}
                <div className="space-y-2">
                  <div className={`p-3 rounded-xl border transition ${financialCrimeFilter ? 'bg-red-50/50 border-red-200' : 'bg-slate-50 border-slate-100'}`}>
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold text-red-700 uppercase tracking-wide">{t.financialFraudMatch}</span>
                      <span className="text-[10px] font-bold text-slate-400 font-mono">{t.july2026}</span>
                    </div>
                    <p className="text-xs font-bold text-slate-900 mt-1">{t.mockArticle1}</p>
                    <p className="text-[10px] text-slate-500 mt-1">{t.matches} <span className="font-bold text-slate-800">{t.robertJSmith}</span></p>
                  </div>

                  <div className={`p-3 rounded-xl border transition ${terrorismFilter ? 'bg-amber-50/50 border-amber-200' : 'bg-slate-50 border-slate-100'}`}>
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wide">{t.regulatoryFine}</span>
                      <span className="text-[10px] font-bold text-slate-400 font-mono">{t.june2026}</span>
                    </div>
                    <p className="text-xs font-bold text-slate-900 mt-1">{t.mockArticle2}</p>
                    <p className="text-[10px] text-slate-500 mt-1">{t.matches} <span className="font-bold text-slate-800">{t.robertJSmith}</span></p>
                  </div>
                </div>

                {/* Popover overlay */}
                <div className="bg-slate-900 text-white rounded-xl p-3 shadow-lg absolute bottom-4 right-4 max-w-[190px] border border-slate-800 space-y-2">
                  <span className="text-[9px] font-bold text-[#F2A122] uppercase block tracking-wider">{t.matchCriteria}</span>
                  <div className="space-y-1 text-[10px]">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">{t.financialCrime}</span>
                      <span className="text-emerald-400 font-bold">{t.on}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">{t.terrorFinancing}</span>
                      <span className="text-emerald-400 font-bold">{t.on}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">{t.broadNarcotics}</span>
                      <span className="text-slate-500">{t.off}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-amber-600 block">{t.riskSignalDetected}</span>
                      <p className="text-xs font-bold text-slate-800">{t.amlIncident}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-bold bg-amber-100 text-[#F2A122] px-2 py-0.5 rounded">
                        88% {t.score.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-2 space-y-2 text-xs">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">{t.matchedContext}</p>
                    <p className="text-slate-700 leading-relaxed bg-white p-2 rounded border border-slate-100">
                      {t.mockContextBeforeName} <span className="bg-amber-100 font-bold text-slate-900 px-1 rounded">{t.robertVanceSmith}</span> {t.mockContextAfterName}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="flex-1 text-center py-2 bg-rose-50 text-rose-800 border border-rose-100 rounded-lg text-[10px] font-bold">
                    {t.matchConfidenceMet.replace('{val}', confidenceThreshold.toString())}
                  </div>
                  <div className="flex-1 text-center py-2 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-semibold">
                    {t.categorizedHighRisk}
                  </div>
                </div>
              </div>
            )}

            {activeStep === 3 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{t.caseLogDiscussion}</p>
                  
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-150 text-[11px] space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500">
                      <span>{t.officerAmandaK}</span>
                      <span>{t.today0912}</span>
                    </div>
                    <p className="text-slate-800">{t.officerComment}</p>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-150 text-[11px] space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500">
                      <span>{t.complianceLead}</span>
                      <span>{t.today1045}</span>
                    </div>
                    <p className="text-slate-800">{t.leadComment}</p>
                  </div>
                </div>

                <div className="flex gap-2 border-t border-slate-100 pt-3">
                  <span className="text-[10px] bg-red-100 text-red-800 px-2.5 py-1 rounded-md font-bold flex items-center gap-1">
                    <AlertOctagon className="w-3.5 h-3.5" /> {t.highRiskConfirmed}
                  </span>
                </div>
              </div>
            )}

            {activeStep === 4 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <p className="text-[10px] font-bold text-slate-400 uppercase">{t.notificationPayload}</p>
                
                <div className="bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-[10px] space-y-1.5 border border-slate-800">
                  <p className="text-slate-500">{t.webhookAlertComment}</p>
                  <p className="text-indigo-300">"event": <span className="text-emerald-400">"adverse_media.alert"</span>,</p>
                  <p className="text-indigo-300">"entity_name": <span className="text-emerald-400">"{t.robertJSmith}"</span>,</p>
                  <p className="text-indigo-300">"article_title": <span className="text-emerald-400">"{t.webhookArticleTitle}"</span>,</p>
                  <p className="text-indigo-300">"severity_category": <span className="text-amber-400">"{t.webhookSeverityCritical}"</span></p>
                </div>

                <div className="flex items-center gap-2 justify-center text-[10px] text-[#F2A122] bg-amber-50 py-1.5 rounded-lg border border-amber-200 font-semibold">
                  <Activity className="w-3.5 h-3.5 animate-bounce" />
                  <span>{t.crawlComplete}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* "Key features" Accordion Section */}
      <section className="bg-[#FAFBFD] py-16 px-6" id="adverse-media-features">
        <div className="max-w-7xl mx-auto bg-white border border-slate-150 rounded-3xl p-8 md:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Header */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[#F2A122] text-xs font-bold uppercase tracking-wider">{t.keyFeaturesBadge}</span>
              <h2 className="text-3xl font-display font-bold text-slate-900 leading-tight">
                {t.keyFeaturesTitle}
              </h2>
            </div>

            {/* Right Accordion List */}
            <div className="lg:col-span-7 space-y-3">
              {featureItems.map((item) => (
                <div 
                  key={item.id}
                  className="bg-[#FAFBFD] border border-slate-150 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === item.id ? '' : item.id)}
                    className="w-full text-left p-5 flex items-start justify-between gap-4 font-semibold"
                    id={`feat-acc-${item.id}`}
                  >
                    <div className="space-y-1 pr-4">
                      <span className="text-sm font-bold text-slate-800 block">{item.title}</span>
                      <p className="text-[11px] text-slate-400 font-normal leading-normal">{item.desc}</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 shrink-0 ${
                      activeAccordion === item.id ? 'rotate-180 text-[#F2A122]' : ''
                    }`} />
                  </button>
                  
                  {activeAccordion === item.id && (
                    <div className="px-5 pb-5 border-t border-slate-100 pt-3 bg-white animate-in fade-in duration-200">
                      {item.detail}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* "How teams can use this risk signal" Section */}
      <section className="max-w-7xl mx-auto px-6 py-12" id="adverse-media-use-cases">
        <div className="text-center space-y-3 mb-12">
          <span className="text-[#F2A122] text-xs font-bold uppercase tracking-wider">{t.useCasesBadge}</span>
          <h2 className="text-3xl font-display font-bold text-slate-900">{t.useCasesTitle}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-800">
          <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-[#F2A122]">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">{t.useCase1Title}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.useCase1Desc}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-[#F2A122]">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">{t.useCase2Title}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.useCase2Desc}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-[#F2A122]">
              <Globe className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">{t.useCase3Title}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.useCase3Desc}
            </p>
          </div>
        </div>
      </section>

      {/* "Keep learning" Section */}
      <section className="bg-white border-y border-slate-150 py-20 px-6" id="adverse-media-learning">
        <div className="max-w-7xl mx-auto space-y-12">
          <h2 className="text-3xl font-display font-bold text-slate-900 text-center">{t.keepLearning}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Learning Card 1 */}
            <div className="bg-[#FAFBFD] border border-slate-100 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between group">
              <div className="p-6 space-y-4">
                <div className="h-40 bg-gradient-to-br from-indigo-100 to-blue-50 rounded-2xl border border-slate-150 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] bg-[size:16px_16px]" />
                  <Newspaper className="w-12 h-12 text-[#F2A122]" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-[#F2A122] transition">
                    {t.article1Title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {t.article1Desc}
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2 border-t border-slate-100/60 flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                <span>{t.article1Tag}</span>
                <span className="text-[#F2A122] flex items-center gap-1 group-hover:underline">
                  {t.readArticle} <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>

            {/* Learning Card 2 */}
            <div className="bg-[#FAFBFD] border border-slate-100 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between group">
              <div className="p-6 space-y-4">
                <div className="h-40 bg-gradient-to-br from-amber-100 to-orange-50 rounded-2xl border border-slate-150 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(#fed7aa_1px,transparent_1px)] bg-[size:16px_16px]" />
                  <Sliders className="w-12 h-12 text-[#F2A122]" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-[#F2A122] transition">
                    {t.article2Title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {t.article2Desc}
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2 border-t border-slate-100/60 flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                <span>{t.article2Tag}</span>
                <span className="text-[#F2A122] flex items-center gap-1 group-hover:underline">
                  {t.readArticle} <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>

            {/* Learning Card 3 */}
            <div className="bg-[#FAFBFD] border border-slate-100 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between group">
              <div className="p-6 space-y-4">
                <div className="h-40 bg-[#3B82F6]/10 rounded-2xl border border-slate-150 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(#bfdbfe_1px,transparent_1px)] bg-[size:16px_16px]" />
                  <Shield className="w-12 h-12 text-[#F2A122]" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-[#F2A122] transition">
                    {t.article3Title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {t.article3Desc}
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2 border-t border-slate-100/60 flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                <span>{t.article3Tag}</span>
                <span className="text-[#F2A122] flex items-center gap-1 group-hover:underline">
                  {t.readArticle} <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "Explore more of Identra's identity platform" Section */}
      <section className="max-w-7xl mx-auto px-6 py-20" id="adverse-media-explore-more">
        <div className="space-y-12">
          <h3 className="text-2xl font-display font-bold text-slate-900 text-center">{t.exploreTitle}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <button 
              onClick={() => onViewChange && onViewChange('watchlists')}
              className="p-8 bg-[#FEF3C7] hover:bg-amber-100/75 border border-amber-200 rounded-3xl text-left transition duration-300 flex flex-col justify-between min-h-[190px] relative overflow-hidden group"
            >
              <div className="space-y-2 max-w-sm relative z-10">
                <h4 className="text-xl font-bold text-amber-950">{t.explore1Title}</h4>
              </div>
              <div className="flex justify-between items-center w-full pt-6 relative z-10">
                <FileText className="w-10 h-10 text-[#F2A122]" />
                <ArrowRightCircle className="w-8 h-8 text-[#F2A122] opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition duration-300" />
              </div>
            </button>

            {/* Card 2 */}
            <button 
              onClick={() => onViewChange && onViewChange('workflows')}
              className="p-8 bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-100 rounded-3xl text-left transition duration-300 flex flex-col justify-between min-h-[190px] relative overflow-hidden group"
            >
              <div className="space-y-2 max-w-sm relative z-10">
                <h4 className="text-xl font-bold text-indigo-950">{t.explore2Title}</h4>
              </div>
              <div className="flex justify-between items-center w-full pt-6 relative z-10">
                <Layers className="w-10 h-10 text-indigo-500" />
                <ArrowRightCircle className="w-8 h-8 text-indigo-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition duration-300" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Lavender "Ready to get started?" Section */}
      <section className="max-w-7xl mx-auto px-6 py-6" id="adverse-media-get-started">
        <div className="bg-gradient-to-br from-[#EEF2FF] to-[#E0E7FF] rounded-3xl p-8 md:p-14 border border-indigo-200 text-slate-800 space-y-6 text-center md:text-left relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2.5">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-indigo-950">{t.getStartedTitle}</h2>
              <p className="text-sm text-indigo-900/80 max-w-md">{t.getStartedDesc}</p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={onOpenSandbox}
                className="bg-white hover:bg-indigo-50 text-[#F2A122] font-semibold px-6 py-3.5 rounded-full text-sm shadow-md transition flex items-center gap-2"
              >
                <span>{t.tryDemo}</span>
                <ArrowRight className="w-4 h-4 text-[#F2A122]" />
              </button>
              <button 
                onClick={onOpenSandbox}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3.5 rounded-full text-sm shadow-sm transition"
              >
                <span>{t.tryItNow} →</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
