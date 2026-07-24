/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import type { AppView } from '../types/routes';
import React, { useState } from 'react';
import { 
  ArrowRight, Check, ShieldCheck, ArrowLeft, Layers, CheckCircle2, 
  Database, FileText, Activity, Shield, ChevronDown, ChevronUp,
  Building, Landmark, HelpCircle, Lock, Key, Users, Landmark as GovIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { GOVERNMENT_PAGE_TRANSLATIONS } from '../translations/GovernmentPageTranslations';

interface GovernmentPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

interface StateClient {
  name: string;
  flagUrl?: string; // fallback if needed
  flagStyles: string;
  flagElement?: React.ReactNode;
}

export default function GovernmentPage({ onOpenSandbox, onBackToLanding, onViewChange }: GovernmentPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(GOVERNMENT_PAGE_TRANSLATIONS, language as keyof typeof GOVERNMENT_PAGE_TRANSLATIONS, 'GOVERNMENT_PAGE_TRANSLATIONS');

  // Tabs state
  const [activeTab, setActiveTab] = useState<'citizen' | 'benefits' | 'employees'>('citizen');
  
  // Accordion state
  const [openAccordion, setOpenAccordion] = useState<string | null>('federal');

  // Contact form state
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [phone, setPhone] = useState('');
  const [agencyType, setAgencyType] = useState('');
  const [notes, setNotes] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const scenarioKeys: Array<'citizen' | 'benefits' | 'employees'> = ['citizen', 'benefits', 'employees'];
  const activeScenario = t.scenarios[activeTab];
  const activeScenarioAlertTitle = 'alertTitle' in activeScenario ? activeScenario.alertTitle : '';
  const activeScenarioAlertDesc = 'alertDesc' in activeScenario ? activeScenario.alertDesc : '';
  const selectedAgencyLabel = t.agencyOptions.find((option) => option.value === agencyType)?.label || t.defaultAgencySector;

  const toggleAccordion = (key: string) => {
    setOpenAccordion(openAccordion === key ? null : key);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !firstName || !lastName || !agencyType) {
      alert(t.requiredFieldsAlert);
      return;
    }
    setFormSubmitted(true);
  };

  // 11 US States with beautifully drawn vector flags in inline SVG/CSS
  const STATES: StateClient[] = [
    {
      name: t.states[0],
      flagStyles: '',
      flagElement: (
        <svg viewBox="0 0 100 60" className="w-full h-full">
          <rect width="100" height="60" fill="white" />
          <line x1="0" y1="0" x2="100" y2="60" stroke="#C8102E" strokeWidth="8" />
          <line x1="100" y1="0" x2="0" y2="60" stroke="#C8102E" strokeWidth="8" />
        </svg>
      )
    },
    {
      name: t.states[1],
      flagStyles: '',
      flagElement: (
        <svg viewBox="0 0 100 60" className="w-full h-full">
          <rect width="100" height="52" fill="white" />
          <rect y="52" width="100" height="8" fill="#B22234" />
          {/* Stylized California bear and star representation */}
          <polygon points="12,12 14,18 20,18 15,22 17,28 12,24 7,28 9,22 4,18 10,18" fill="#B22234" />
          <ellipse cx="50" cy="32" rx="14" ry="8" fill="#583101" />
          <rect x="42" y="34" width="3" height="4" fill="#583101" />
          <rect x="54" y="34" width="3" height="4" fill="#583101" />
          <text x="50" y="47" fontSize="5" fontFamily="sans-serif" fontWeight="bold" fill="#000" textAnchor="middle">{t.stateFlagCaliforniaRepublic}</text>
        </svg>
      )
    },
    {
      name: t.states[2],
      flagStyles: '',
      flagElement: (
        <svg viewBox="0 0 100 60" className="w-full h-full">
          <rect width="100" height="60" fill="#0F47A1" />
          <ellipse cx="50" cy="30" rx="16" ry="14" fill="white" stroke="#D4AF37" strokeWidth="1" />
          <ellipse cx="50" cy="30" rx="13" ry="11" fill="none" stroke="#0F47A1" strokeWidth="1" />
          <path d="M 40 33 Q 50 38 60 33" fill="none" stroke="#D4AF37" strokeWidth="2" />
        </svg>
      )
    },
    {
      name: t.states[3],
      flagStyles: '',
      flagElement: (
        <svg viewBox="0 0 100 60" className="w-full h-full">
          <rect width="100" height="20" fill="#B22234" />
          <rect y="20" width="100" height="20" fill="white" />
          <rect y="40" width="100" height="20" fill="#B22234" />
          <rect width="40" height="40" fill="#0F47A1" />
          {/* Stylized Arch and Stars */}
          <path d="M 12 30 L 12 18 L 28 18 L 28 30" fill="none" stroke="#D4AF37" strokeWidth="2" />
          <circle cx="20" cy="18" r="3" fill="#D4AF37" />
          <circle cx="20" cy="24" r="5" fill="none" stroke="white" strokeWidth="0.7" strokeDasharray="1,1" />
        </svg>
      )
    },
    {
      name: t.states[4],
      flagStyles: '',
      flagElement: (
        <svg viewBox="0 0 100 60" className="w-full h-full">
          <rect width="100" height="60" fill="#0D2C6C" />
          <circle cx="50" cy="30" r="14" fill="#E8C343" />
          <circle cx="50" cy="30" r="12" fill="#0D2C6C" />
          <text x="50" y="52" fontSize="4.5" fontFamily="sans-serif" fontWeight="bold" fill="#D4AF37" textAnchor="middle">{t.stateFlagIdaho}</text>
        </svg>
      )
    },
    {
      name: t.states[5],
      flagStyles: '',
      flagElement: (
        <svg viewBox="0 0 100 60" className="w-full h-full">
          <rect width="100" height="60" fill="#0A2C68" />
          <ellipse cx="50" cy="30" rx="14" ry="12" fill="#4B8BF5" stroke="#E8C343" strokeWidth="1" />
          <path d="M 42 24 L 38 34 L 62 34 L 58 24 Z" fill="#D4AF37" />
          <circle cx="50" cy="28" r="5" fill="#FFFFFF" />
        </svg>
      )
    },
    {
      name: t.states[6],
      flagStyles: '',
      flagElement: (
        <svg viewBox="0 0 100 60" className="w-full h-full">
          <rect width="100" height="60" fill="#092B69" />
          <circle cx="50" cy="30" r="16" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3,2" />
          <circle cx="50" cy="30" r="12" fill="#2E7D32" />
          <rect x="47" y="24" width="6" height="8" fill="#D4AF37" />
        </svg>
      )
    },
    {
      name: t.states[7],
      flagStyles: '',
      flagElement: (
        <svg viewBox="0 0 100 60" className="w-full h-full">
          <rect width="100" height="60" fill="#FAFBFD" /> {/* container padding background */}
          <path d="M 5 10 L 95 10 L 75 30 L 95 50 L 5 50 Z" fill="#0F47A1" />
          <path d="M 5 10 L 95 10 L 88 17 L 5 17 Z" fill="#C8102E" />
          <path d="M 5 25 L 80 25 L 75 30 L 70 35 L 5 35 Z" fill="white" />
          <path d="M 5 43 L 95 43 L 88 50 L 5 50 Z" fill="#C8102E" />
          <circle cx="30" cy="30" r="14" fill="#0F47A1" />
          <circle cx="30" cy="30" r="11" fill="white" />
          <circle cx="30" cy="30" r="7" fill="#C8102E" />
        </svg>
      )
    },
    {
      name: t.states[8],
      flagStyles: '',
      flagElement: (
        <svg viewBox="0 0 100 60" className="w-full h-full">
          <rect width="100" height="60" fill="#4896DF" />
          <circle cx="50" cy="28" r="11" fill="#EAD295" stroke="#FFFFFF" strokeWidth="1" />
          <line x1="36" y1="28" x2="64" y2="28" stroke="#785312" strokeWidth="2" />
          <text x="50" y="52" fontSize="6.5" fontFamily="sans-serif" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">{t.stateFlagOklahoma}</text>
        </svg>
      )
    },
    {
      name: t.states[9],
      flagStyles: '',
      flagElement: (
        <svg viewBox="0 0 100 60" className="w-full h-full">
          <rect width="100" height="60" fill="#091A44" />
          <rect x="5" y="5" width="90" height="50" fill="white" />
          <ellipse cx="50" cy="28" rx="14" ry="12" fill="none" stroke="#2E7D32" strokeWidth="1.5" />
          <path d="M 45 23 L 55 23 L 52 35 L 48 35 Z" fill="#D4AF37" />
        </svg>
      )
    },
    {
      name: t.states[10],
      flagStyles: '',
      flagElement: (
        <svg viewBox="0 0 100 60" className="w-full h-full">
          <rect width="100" height="60" fill="#122A5E" />
          <ellipse cx="50" cy="30" rx="16" ry="14" fill="#01579B" stroke="#D4AF37" strokeWidth="1" />
          <circle cx="50" cy="26" r="6" fill="#FBC02D" />
          {/* Goddess Liberty and Justice representation outline */}
          <path d="M 41 22 L 41 38" stroke="white" strokeWidth="1.5" />
          <path d="M 59 22 L 59 38" stroke="white" strokeWidth="1.5" />
          <path d="M 46 41 Q 50 44 54 41" fill="none" stroke="#D4AF37" strokeWidth="1" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-slate-800 antialiased selection:bg-blue-600/10 selection:text-blue-700">
      
      {/* 1. Header Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-tr from-[#0F2256] via-[#112F76] to-[#154DBE] text-white pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_55%)]" />
        <div className="absolute top-1/4 left-1/12 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/12 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <button 
            onClick={onBackToLanding}
            className="group inline-flex items-center gap-2 text-blue-200 hover:text-white text-xs font-semibold mb-8 transition"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            {t.backToPlatform}
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-[11px] font-bold tracking-wider text-blue-300 uppercase border border-white/15 shadow-sm">
                <GovIcon className="w-3.5 h-3.5 text-blue-300" />
                {t.badge}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5.5xl font-sans font-semibold tracking-tight text-white leading-[1.12]">
                {t.heroTitle}
              </h1>
              <p className="text-base sm:text-lg text-blue-100/90 max-w-xl font-normal leading-relaxed">
                {t.heroDesc}
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={onOpenSandbox}
                  className="bg-white hover:bg-blue-50 text-[#0F2256] font-semibold text-sm px-7 py-3.5 rounded-full transition flex items-center justify-center gap-2 shadow-lg"
                >
                  {t.expertCta}
                  <ArrowRight className="w-4 h-4 text-[#0F2256]" />
                </button>
              </div>
            </div>

            {/* Custom SVG Drawing of a Government Capitol Dome Building */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-md bg-[#0F2359]/60 backdrop-blur-md border border-blue-900/40 p-6 rounded-2xl shadow-[0_20px_50px_rgba(15,34,86,0.5)]">
                <svg viewBox="0 0 400 300" className="w-full h-auto">
                  {/* Sun background */}
                  <circle cx="330" cy="80" r="30" fill="#FFC107" opacity="0.9" />
                  
                  {/* Capitol Base Steps */}
                  <rect x="50" y="240" width="300" height="15" fill="#E0F2FE" />
                  <rect x="60" y="225" width="280" height="15" fill="#BAE6FD" />
                  <rect x="70" y="210" width="260" height="15" fill="#7DD3FC" />

                  {/* Columns */}
                  <rect x="90" y="140" width="10" height="70" fill="#E0F2FE" />
                  <rect x="120" y="140" width="10" height="70" fill="#E0F2FE" />
                  <rect x="150" y="140" width="10" height="70" fill="#E0F2FE" />
                  <rect x="180" y="140" width="10" height="70" fill="#E0F2FE" />
                  <rect x="210" y="140" width="10" height="70" fill="#E0F2FE" />
                  <rect x="240" y="140" width="10" height="70" fill="#E0F2FE" />
                  <rect x="270" y="140" width="10" height="70" fill="#E0F2FE" />
                  <rect x="300" y="140" width="10" height="70" fill="#E0F2FE" />
                  
                  {/* Portico architrave */}
                  <rect x="80" y="125" width="240" height="15" fill="#BAE6FD" />
                  <polygon points="80,125 200,85 320,125" fill="#0284C7" />

                  {/* Dome Building Base */}
                  <rect x="130" y="60" width="140" height="25" fill="#0369A1" />
                  
                  {/* Ribbed Dome */}
                  <path d="M 140 60 A 60 60 0 0 1 260 60 Z" fill="#0284C7" />
                  <path d="M 170 60 A 30 30 0 0 1 230 60 Z" fill="#0369A1" opacity="0.5" />
                  
                  {/* Lantern and spire */}
                  <rect x="192" y="15" width="16" height="15" fill="#BAE6FD" />
                  <line x1="200" y1="15" x2="200" y2="2" stroke="#E0F2FE" strokeWidth="3" />

                  {/* Flagpole on the side */}
                  <line x1="340" y1="240" x2="340" y2="100" stroke="#E2E8F0" strokeWidth="2" />
                  {/* Flag showing checkmark (verified) */}
                  <path d="M 340 100 L 385 112 L 340 124 Z" fill="#10B981" />
                  <polyline points="352,112 357,117 367,107" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                  {/* Ground trees green vector */}
                  <path d="M 30 240 Q 55 200 80 240 Z" fill="#047857" opacity="0.8" />
                  <path d="M 320 240 Q 345 205 370 240 Z" fill="#047857" opacity="0.8" />
                </svg>
              </div>
            </div>
          </div>

          {/* Three column highlights below the hero */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-white/10 mt-16 font-sans">
            {t.heroHighlights.map((highlight) => (
              <div key={highlight.title} className="space-y-2">
                <h4 className="text-sm font-semibold text-white">{highlight.title}</h4>
                <p className="text-xs text-blue-200/80 leading-relaxed">{highlight.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. State Organizations Banner */}
      <section className="bg-white border-b border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-10">
          <p className="text-xs font-bold tracking-wider uppercase text-slate-400">
            {t.statesServed}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-center">
            {STATES.map((state, idx) => (
              <div 
                key={idx}
                className="flex flex-col items-center gap-3 p-4 bg-[#FAFBFD] hover:bg-slate-50 border border-slate-100 rounded-xl transition shadow-sm"
              >
                <div className="w-16 h-10 border border-slate-200/60 rounded overflow-hidden shadow-sm flex items-center justify-center bg-slate-50">
                  {state.flagElement}
                </div>
                <span className="text-[11px] font-bold text-slate-600 font-sans">{state.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. {t.fedrampBadge} Spotlight */}
      <section className="py-16 bg-[#0B1530] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(21,77,190,0.2),transparent_50%)]" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="bg-[#11234E] border border-blue-900/40 rounded-3xl p-8 md:p-12 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] uppercase font-bold rounded-md">
                <Check className="w-3.5 h-3.5" />
                {t.fedrampBadge}
              </div>
              <h3 className="text-2xl md:text-3xl font-sans font-semibold tracking-tight">
                {t.fedrampTitle}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                {t.fedrampDesc}
              </p>
              <button
                onClick={onOpenSandbox}
                className="inline-flex items-center gap-2 text-xs font-semibold text-blue-300 hover:text-white transition group pt-2"
              >
                {t.achievementCta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            
            {/* FedRAMP Stamp representation */}
            <div className="md:col-span-4 flex justify-center">
              <div className="bg-white text-slate-900 p-6 rounded-2xl shadow-xl w-36 h-36 flex flex-col items-center justify-center border-4 border-blue-800 text-center relative">
                <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-800" />
                <span className="text-3xl font-black tracking-tighter text-blue-900">{t.fedrampStampFr}</span>
                <span className="text-[10px] font-mono font-black tracking-widest text-[#E05E1B] border-t border-slate-200 pt-1 mt-1 uppercase">{t.fedrampStampTitle}</span>
                <span className="text-[8px] text-slate-400 mt-0.5">{t.fedrampStampLevel}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. {t.missionTitle} (Tabs Layout) */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center md:text-left space-y-4 mb-12">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">{t.missionEyebrow}</span>
            <h2 className="text-2xl md:text-3.5xl font-sans font-semibold text-slate-950 tracking-tight">
              {t.missionTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Nav Controls (Vertical Tab Buttons) */}
            <div className="lg:col-span-4 space-y-3 font-sans">
              {scenarioKeys.map((key) => {
                const scenario = t.scenarios[key];
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`w-full text-left p-4 rounded-xl transition flex items-center justify-between border ${
                      activeTab === key
                        ? 'bg-blue-50 border-blue-200 text-[#0F2256] font-bold shadow-sm'
                        : 'bg-white hover:bg-slate-50 border-slate-100 text-slate-500'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="text-xs uppercase tracking-wider font-semibold opacity-75">{scenario.scenario}</div>
                      <div className="text-sm">{scenario.navTitle}</div>
                    </div>
                    <ArrowRight className={`w-4 h-4 transition-transform ${activeTab === key ? 'translate-x-1' : 'opacity-40'}`} />
                  </button>
                );
              })}
            </div>

            {/* Right Tab Content Viewer */}
            <div className="lg:col-span-8 bg-[#FAFBFD] border border-slate-100 rounded-3xl p-8 shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="space-y-3">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900">{activeScenario.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{activeScenario.desc}</p>
                  </div>

                  <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-50 pb-3 gap-3">
                      <span className="text-xs font-bold text-slate-800">{activeScenario.panelTitle}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-semibold ${
                        activeTab === 'benefits'
                          ? 'text-red-500 bg-red-50'
                          : activeTab === 'employees'
                            ? 'text-blue-500 bg-blue-50'
                            : 'text-emerald-500 bg-emerald-50'
                      }`}>
                        {activeScenario.panelBadge}
                      </span>
                    </div>

                    {'metrics' in activeScenario && activeScenario.metrics ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {activeScenario.metrics.map((metric) => (
                          <div key={metric.label} className="p-3 bg-slate-50 rounded-xl space-y-1">
                            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">{metric.label}</span>
                            <span className="text-xs font-semibold text-slate-800 flex items-center gap-1">
                              <Check className="w-3.5 h-3.5 text-emerald-500" /> {metric.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : activeTab === 'benefits' ? (
                      <div className="p-4 bg-red-50/50 border border-red-100 rounded-xl flex items-start gap-3">
                        <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                          <Shield className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-red-900">{activeScenarioAlertTitle}</h4>
                          <p className="text-[11px] text-red-700 mt-0.5">{activeScenarioAlertDesc}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                          <Lock className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">{activeScenarioAlertTitle}</h4>
                          <p className="text-[11px] text-slate-500">{activeScenarioAlertDesc}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Procurement and Contract Vehicles Accordion */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">{t.procurementEyebrow}</span>
            <h2 className="text-2xl md:text-3xl font-sans font-semibold text-slate-950 tracking-tight">
              {t.procurementTitle}
            </h2>
            <p className="text-slate-500 text-sm max-w-lg mx-auto">{t.procurementDesc}</p>
          </div>

          <div className="space-y-3 font-sans">
            {t.procurementSections.map((section) => {
              const Icon = section.key === 'federal' ? Building : section.key === 'state-local' ? Landmark : FileText;
              const iconColor = section.key === 'federal' ? 'bg-blue-50 text-blue-600' : section.key === 'state-local' ? 'bg-teal-50 text-teal-600' : 'bg-indigo-50 text-indigo-600';
              const contentGrid = section.key === 'federal' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-3';

              return (
                <div key={section.key} className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleAccordion(section.key)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50/50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconColor}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold text-slate-900">{section.title}</span>
                    </div>
                    {openAccordion === section.key ? (
                      <ChevronUp className="w-4 h-4 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    )}
                  </button>

                  <AnimatePresence>
                    {openAccordion === section.key && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden border-t border-slate-100"
                      >
                        <div className={`p-6 bg-slate-50/30 text-xs ${contentGrid}`}>
                          {'desc' in section && section.desc && (
                            <p className="text-slate-600 leading-relaxed">{section.desc}</p>
                          )}
                          {'cards' in section && section.cards?.map((card) => (
                            <div key={card.title} className="p-4 bg-white border border-slate-100 rounded-xl space-y-2">
                              <h4 className="font-bold text-slate-900">{card.title}</h4>
                              {'meta' in card && card.meta && <p className="text-slate-500 text-[11px]">{card.meta}</p>}
                              {'validity' in card && card.validity && <p className="text-slate-400 text-[10px]">{card.validity}</p>}
                              {'desc' in card && card.desc && <p className="text-slate-500 text-[11px] mt-1">{card.desc}</p>}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>        </div>
      </section>

      {/* 6. Security and privacy at our core */}
      <section className="py-20 bg-gradient-to-tr from-[#11244E] to-[#1F3D7C] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_60%)]" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto text-blue-300 border border-white/10">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-2xl md:text-3.5xl font-sans font-semibold tracking-tight">
            {t.securityTitle}
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            {t.securityDesc}
          </p>
          <button
            onClick={onOpenSandbox}
            className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-blue-50 font-semibold text-xs px-6 py-3 rounded-full transition shadow-lg"
          >
            {t.learnMore}
            <ArrowRight className="w-3.5 h-3.5 text-slate-900" />
          </button>
        </div>
      </section>

      {/* 7. Public Sector Expert Form */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Info and highlights column */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#E6EDFF] to-[#D0DEFF] rounded-3xl p-8 border border-slate-100 shadow-sm space-y-8 min-h-[480px] flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-2xl font-sans font-semibold text-[#0F2256] tracking-tight">
                  {t.formTitle}
                </h3>
                <p className="text-slate-600 text-xs">
                  {t.formDesc}
                </p>
              </div>

              <div className="space-y-5 border-t border-blue-900/10 pt-6">
                {t.caseStudies.map((caseStudy) => (
                  <div key={caseStudy.title} className="space-y-1 font-sans text-xs">
                    <h4 className="font-bold text-[#0F2256]">{caseStudy.title}</h4>
                    <p className="text-slate-600 leading-relaxed">{caseStudy.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Contact Form */}
            <div className="lg:col-span-7">
              {formSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-4"
                >
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                  <h3 className="text-lg font-bold text-emerald-900">{t.successThankYou} {firstName}{t.successPunctuation}</h3>
                  <p className="text-sm text-emerald-700 max-w-md mx-auto">
                    {t.successBodyStart} <strong>{selectedAgencyLabel}</strong> {t.successBodyMiddle} <strong>{email}</strong> {t.successBodyEnd}
                  </p>
                  <button 
                    onClick={() => setFormSubmitted(false)}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-full transition"
                  >
                    {t.sendAnother}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 font-sans text-xs">
                  
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-600">{t.emailLabel}</label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.emailPlaceholder}
                      className="w-full bg-[#FAFBFD] border border-slate-200/80 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-600">{t.firstNameLabel}</label>
                      <input 
                        type="text" 
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder={t.firstNamePlaceholder}
                        className="w-full bg-[#FAFBFD] border border-slate-200/80 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-600">{t.lastNameLabel}</label>
                      <input 
                        type="text" 
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder={t.lastNamePlaceholder}
                        className="w-full bg-[#FAFBFD] border border-slate-200/80 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-600">{t.jobTitleLabel}</label>
                      <input 
                        type="text" 
                        required
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder={t.jobTitlePlaceholder}
                        className="w-full bg-[#FAFBFD] border border-slate-200/80 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-600">{t.phoneLabel}</label>
                      <input 
                        type="tel" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t.phonePlaceholder}
                        className="w-full bg-[#FAFBFD] border border-slate-200/80 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-600">{t.agencyTypeLabel}</label>
                    <select
                      required
                      value={agencyType}
                      onChange={(e) => setAgencyType(e.target.value)}
                      className="w-full bg-[#FAFBFD] border border-slate-200/80 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition appearance-none"
                    >
                      <option value="">{t.selectPlaceholder}</option>
                      {t.agencyOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-600">{t.notesLabel}</label>
                    <textarea 
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                      placeholder={t.notesPlaceholder}
                      className="w-full bg-[#FAFBFD] border border-slate-200/80 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition"
                    />
                  </div>

                  <p className="text-[10px] text-slate-400 font-normal leading-relaxed">
                    {t.consentBefore} <span className="underline hover:text-blue-600 cursor-pointer">{t.privacyPolicy}</span> {t.consentAfter}
                  </p>

                  <button 
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#0F2256] text-white hover:bg-blue-900 font-semibold rounded-full transition flex items-center justify-center gap-2"
                  >
                    {t.submit}
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 8. Ready to get started banner */}
      <section className="py-20 bg-gradient-to-br from-[#AFB6FF] to-[#DCE0FF] text-[#0C1E4F] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/20 rounded-full blur-3xl" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center space-y-6">
          <h2 className="text-3xl md:text-4.5xl font-sans font-semibold tracking-tight leading-tight">
            {t.readyTitle}
          </h2>
          <p className="text-sm md:text-base text-[#1E3063] max-w-md mx-auto">
            {t.readyDesc}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenSandbox}
              className="w-full sm:w-auto bg-slate-950 text-white hover:bg-slate-900 font-semibold text-sm px-8 py-3.5 rounded-full transition flex items-center justify-center gap-2 shadow-lg"
            >
              {t.tryDemoCta}
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

          </div>
        </div>
      </section>

    </div>
  );
}
