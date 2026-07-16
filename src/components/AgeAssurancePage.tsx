/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Check, ShieldCheck, Cpu, ScanLine, ArrowLeft, RefreshCw, Layers, CheckCircle2, 
  Users, Globe, FileBadge, Search, Eye, AlertCircle, Sparkles, Camera, Lock, Smile, Calendar, 
  Trash2, Smartphone, ShieldAlert, BookOpen, ChevronDown, ChevronUp, Database, FileText, 
  CreditCard, Mail, Landmark, Shield, UserCheck, HelpCircle, MapPin, Map, HelpCircle as HelpIcon
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { AGE_ASSURANCE_TRANSLATIONS } from '../translations/AgeAssurancePageTranslations';

interface AgeAssurancePageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

// Data models for interactive simulator
interface IdentraOption {
  id: string;
  name: string;
  age: number;
  imageUrl: string;
  dob: string;
  country: string;
  isSpoof: boolean;
  spoofDetails?: string;
  hasOfficialRecord: boolean;
  notes: string;
}

const SIMULATOR_IDENTRAS: IdentraOption[] = [
  {
    id: 'p-1',
    name: 'Sarah Chen',
    age: 23,
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    dob: '2003-05-14',
    country: 'United Kingdom',
    isSpoof: false,
    hasOfficialRecord: true,
    notes: 'Adult user, fully compliant credentials.'
  },
  {
    id: 'p-2',
    name: 'Oliver Wright',
    age: 15,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    dob: '2011-09-22',
    country: 'Australia',
    isSpoof: false,
    hasOfficialRecord: true,
    notes: 'Minor. Restrict access to age-gated resources.'
  },
  {
    id: 'p-3',
    name: 'Elena Rostova',
    age: 17,
    imageUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200',
    dob: '2009-02-08',
    country: 'France',
    isSpoof: false,
    hasOfficialRecord: true,
    notes: '17 years old. Near major threshold. Requires high precision.'
  },
  {
    id: 'p-4',
    name: 'Mobile Screen Photo (Spoof)',
    age: 29,
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    dob: '1997-11-03',
    country: 'United States',
    isSpoof: true,
    spoofDetails: 'Replay Presentation Attack. High Moire frequency detected in liveness capture.',
    hasOfficialRecord: false,
    notes: 'AI liveness subsystem flags presentation attack.'
  }
];

export default function AgeAssurancePage({ onOpenSandbox, onBackToLanding, onViewChange }: AgeAssurancePageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(AGE_ASSURANCE_TRANSLATIONS, language as keyof typeof AGE_ASSURANCE_TRANSLATIONS, 'AGE_ASSURANCE_TRANSLATIONS');
  const ageUnitLabel = ({ ja: '歳', de: 'Jahre', vi: 'Tuổi' } as Record<string, string>)[language] || 'Years';
  const usRegionLabel = ({ es: 'EE. UU. (Leyes estatales)', ja: '米国（州法基準）', de: 'USA (Bundesstaatliche Gesetze)', vi: 'Hoa Kỳ (Luật tiểu bang)' } as Record<string, string>)[language] || 'USA (State-based)';

  // Simulator State
  const [activeTab, setActiveTab] = useState<'selfie' | 'id' | 'database'>('selfie');
  const [selectedIdentra, setSelectedIdentra] = useState<IdentraOption>(SIMULATOR_IDENTRAS[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(true);
  const [ageThreshold, setAgeThreshold] = useState<number>(18);
  const [dataMinimization, setDataMinimization] = useState(true);
  
  // Custom interactive DB values
  const [dbName, setDbName] = useState(SIMULATOR_IDENTRAS[0].name);
  const [dbDob, setDbDob] = useState(SIMULATOR_IDENTRAS[0].dob);

  // Accordion lists
  const [activeAccordion, setActiveAccordion] = useState<string>('selfie-est');
  
  // Geography State
  const [selectedRegion, setSelectedRegion] = useState<'uk' | 'france' | 'au' | 'us'>('uk');

  // Trigger verification flow simulation
  const startSimulation = (identra: IdentraOption) => {
    setSelectedIdentra(identra);
    setDbName(identra.name);
    setDbDob(identra.dob);
    setIsProcessing(true);
    setIsComplete(false);
    setProgress(0);
  };

  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsProcessing(false);
            setIsComplete(true);
            return 100;
          }
          return prev + 5;
        });
      }, 40);
      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  // Handle identra change
  const handleIdentraSelect = (identra: IdentraOption) => {
    setSelectedIdentra(identra);
    setDbName(identra.name);
    setDbDob(identra.dob);
    if (!isProcessing) {
      setIsComplete(true);
      setProgress(100);
    } else {
      startSimulation(identra);
    }
  };

  // Age Gate helper
  const isApproved = () => {
    if (selectedIdentra.isSpoof) return false;
    
    if (activeTab === 'selfie') {
      // Selfie estimation logic: allows a small margin but gives AI age estimation
      const estimatedAge = selectedIdentra.age;
      return estimatedAge >= ageThreshold;
    } else if (activeTab === 'id') {
      // ID parsing
      return selectedIdentra.age >= ageThreshold;
    } else {
      // Database Check matching
      return selectedIdentra.age >= ageThreshold && selectedIdentra.hasOfficialRecord;
    }
  };

  const getMaskedValue = (value: string, maskType: 'name' | 'dob') => {
    if (!dataMinimization) return value;
    if (maskType === 'dob') return '••••-••-•• [REDACTED FOR MINIMIZATION]';
    // redact name
    const parts = value.split(' ');
    if (parts.length > 1) {
      return `${parts[0][0]}••••• ${parts[1][0]}•••• [REDACTED]`;
    }
    return `${value[0]}•••• [REDACTED]`;
  };

  const getIdentraLocalizedNotes = (id: string) => {
    switch (id) {
      case 'p-1': return t.identraSarahNotes;
      case 'p-2': return t.identraOliverNotes;
      case 'p-3': return t.identraElenaNotes;
      case 'p-4': return t.identraSpoofNotes;
      default: return '';
    }
  };

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-slate-800 font-sans">
      
      {/* 1. Hero Blue Card Section */}
      <section className="px-6 pt-12 pb-16 md:py-24 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-[#354CE1] via-[#2F44D1] to-[#1E2E9A] rounded-[2.5rem] p-8 md:p-16 text-white shadow-2xl relative overflow-hidden">
          {/* Ambient shapes */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute left-1/3 bottom-0 w-80 h-80 bg-[#3ACBE8]/10 rounded-full blur-2xl"></div>

          {/* Back button */}
          <button 
            onClick={onBackToLanding}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition text-sm font-medium mb-8 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.backToSolutions}
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold tracking-wider uppercase text-[#3ACBE8]">
                <Shield className="w-3.5 h-3.5" /> {t.badgeLabel}
              </span>
              
              <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight text-white leading-tight">
                {t.heroTitle}
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 font-light max-w-xl leading-relaxed">
                {t.heroDesc}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={onOpenSandbox}
                  className="bg-white text-[#354CE1] hover:bg-slate-100 font-semibold text-base px-8 py-4 rounded-full shadow-lg transition duration-200 flex items-center justify-center gap-2 group"
                >
                  {t.bookConsultation}
                  <ArrowRight className="w-4 h-4 transition group-hover:translate-x-1" />
                </button>
                <a 
                  href="#simulator"
                  className="border border-white/30 hover:border-white hover:bg-white/10 text-white font-semibold text-base px-8 py-4 rounded-full transition duration-200 flex items-center justify-center"
                >
                  {t.trySimulator}
                </a>
              </div>

              {/* Three detailed bullet columns inside hero */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-white/15">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-[#3ACBE8]">{t.heroPillar1Title}</h4>
                  <p className="text-xs text-white/80 leading-relaxed">
                    {t.heroPillar1Desc}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-[#3ACBE8]">{t.heroPillar2Title}</h4>
                  <p className="text-xs text-white/80 leading-relaxed">
                    {t.heroPillar2Desc}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-[#3ACBE8]">{t.heroPillar3Title}</h4>
                  <p className="text-xs text-white/80 leading-relaxed">
                    {t.heroPillar3Desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Illustration Graphic - Custom CSS Render */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-[#1A255C] border border-white/10 p-6 md:p-8 rounded-3xl shadow-xl w-full max-w-md relative">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                  </div>
                  <span className="text-[10px] font-mono text-white/40">identra-age-estimation-v3.7</span>
                </div>

                <div className="space-y-6">
                  {/* Face Scan graphic outline */}
                  <div className="relative border-2 border-dashed border-[#3ACBE8]/40 rounded-2xl h-56 flex items-center justify-center overflow-hidden bg-[#101944]">
                    {/* Pulsing Scan Line */}
                    <div className="absolute inset-x-0 h-0.5 bg-[#3ACBE8] shadow-[0_0_15px_#3ACBE8] animate-pulse top-1/3"></div>
                    
                    {/* SVG Vector Person illustration inside */}
                    <svg className="w-40 h-40 text-slate-500/30 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                    </svg>

                    {/* Scanner corners */}
                    <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#3ACBE8]"></div>
                    <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#3ACBE8]"></div>
                    <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#3ACBE8]"></div>
                    <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#3ACBE8]"></div>
                    
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#3ACBE8]/20 backdrop-blur-sm border border-[#3ACBE8]/40 px-3 py-1 rounded-full flex items-center gap-1">
                      <ScanLine className="w-3 h-3 text-[#3ACBE8] animate-spin" />
                      <span className="text-[10px] font-mono text-[#3ACBE8] uppercase font-bold tracking-wider">{t.passiveLivenessActive}</span>
                    </div>
                  </div>

                  {/* Status Panel */}
                  <div className="bg-[#121A46] rounded-xl p-4 border border-white/5 flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-xs text-white/50 block">{t.aiEstimatedAge}</span>
                      <span className="text-xl font-display font-semibold text-white">{t.estimatedAgeValue}</span>
                    </div>
                    <div className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs px-3 py-1.5 rounded-full font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {t.over18Verified}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Startups logos footer band */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <span className="text-xs font-mono uppercase tracking-widest text-white/45">{t.trustedByStartups}</span>
            <div className="flex flex-wrap items-center gap-8 md:gap-12 opacity-70">
              {/* Substack logo replacement */}
              <div className="flex items-center gap-2 font-display font-bold text-white tracking-tight">
                <span className="w-5 h-5 bg-[#FF6719] rounded flex items-center justify-center text-white text-xs">S</span>
                <span>substack</span>
              </div>
              {/* Reddit logo */}
              <div className="flex items-center gap-1.5 font-bold text-white text-sm">
                <span className="w-5 h-5 bg-[#FF4500] rounded-full flex items-center justify-center text-white text-xs">r</span>
                <span>reddit</span>
              </div>
              {/* Lime logo */}
              <div className="flex items-center gap-1 text-emerald-400 font-bold tracking-wide text-sm">
                <span className="inline-block bg-emerald-500 w-2.5 h-2.5 rounded-full"></span>
                <span className="text-white">Lime</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Extensively Tested & Certified section */}
      <section className="bg-white border-y border-slate-100 py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight text-slate-900">
              {t.certSectionTitle}
            </h2>
            <p className="text-slate-500 text-sm md:text-base">
              {t.certSectionDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Certification Card 1 */}
            <div className="bg-[#FAFBFD] p-8 rounded-2xl border border-slate-100 flex flex-col justify-between h-56 hover:shadow-md transition">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="bg-emerald-100 text-emerald-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs">✓</div>
                  <span className="font-bold text-sm text-slate-800">{t.cert1Title}</span>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {t.cert1Desc}
                </p>
              </div>
              <div className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">{t.cert1Tag}</div>
            </div>

            {/* Certification Card 2 */}
            <div className="bg-[#FAFBFD] p-8 rounded-2xl border border-slate-100 flex flex-col justify-between h-56 hover:shadow-md transition">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Globe className="w-6 h-6 text-indigo-600" />
                  <span className="font-bold text-sm text-slate-800">{t.cert2Title}</span>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {t.cert2Desc}
                </p>
              </div>
              <div className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">{t.cert2Tag}</div>
            </div>

            {/* Certification Card 3 */}
            <div className="bg-[#FAFBFD] p-8 rounded-2xl border border-slate-100 flex flex-col justify-between h-56 hover:shadow-md transition">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <FileBadge className="w-6 h-6 text-amber-500" />
                  <span className="font-bold text-sm text-slate-800">{t.cert3Title}</span>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {t.cert3Desc}
                </p>
              </div>
              <div className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">{t.cert3Tag}</div>
            </div>

            {/* Certification Card 4 */}
            <div className="bg-[#FAFBFD] p-8 rounded-2xl border border-slate-100 flex flex-col justify-between h-56 hover:shadow-md transition">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Cpu className="w-6 h-6 text-rose-500" />
                  <span className="font-bold text-sm text-slate-800">{t.cert4Title}</span>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {t.cert4Desc}
                </p>
              </div>
              <div className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">{t.cert4Tag}</div>
            </div>

            {/* Certification Card 5 */}
            <div className="bg-[#FAFBFD] p-8 rounded-2xl border border-slate-100 flex flex-col justify-between h-56 hover:shadow-md transition">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-[#354CE1]" />
                  <span className="font-bold text-sm text-slate-800">{t.cert5Title}</span>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {t.cert5Desc}
                </p>
              </div>
              <div className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">{t.cert5Tag}</div>
            </div>

            {/* Certification Card 6 */}
            <div className="bg-[#FAFBFD] p-8 rounded-2xl border border-slate-100 flex flex-col justify-between h-56 hover:shadow-md transition">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Search className="w-6 h-6 text-emerald-600" />
                  <span className="font-bold text-sm text-slate-800">{t.cert6Title}</span>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {t.cert6Desc}
                </p>
              </div>
              <div className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">{t.cert6Tag}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE SIMULATOR SECTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto space-y-12" id="simulator">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-mono font-bold tracking-widest text-[#354CE1] uppercase bg-[#354CE1]/5 px-3 py-1 rounded-full">
            {t.sandboxBadge}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight text-slate-900">
            {t.sandboxTitle}
          </h2>
          <p className="text-slate-500 text-sm md:text-base">
            {t.sandboxDesc}
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Simulator Sidebar configuration */}
          <div className="lg:col-span-5 bg-slate-50 p-6 md:p-8 border-r border-slate-200 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900 mb-2">{t.chooseMethod}</h3>
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    onClick={() => { setActiveTab('selfie'); setIsComplete(true); }}
                    className={`p-3 rounded-xl border-2 text-center transition flex flex-col items-center gap-1 ${activeTab === 'selfie' ? 'border-[#354CE1] bg-[#354CE1]/5 text-[#354CE1]' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                  >
                    <Camera className="w-5 h-5" />
                    <span className="text-[10px] font-bold">{t.methodSelfie}</span>
                  </button>
                  <button 
                    onClick={() => { setActiveTab('id'); setIsComplete(true); }}
                    className={`p-3 rounded-xl border-2 text-center transition flex flex-col items-center gap-1 ${activeTab === 'id' ? 'border-[#354CE1] bg-[#354CE1]/5 text-[#354CE1]' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                  >
                    <FileText className="w-5 h-5" />
                    <span className="text-[10px] font-bold">{t.methodId}</span>
                  </button>
                  <button 
                    onClick={() => { setActiveTab('database'); setIsComplete(true); }}
                    className={`p-3 rounded-xl border-2 text-center transition flex flex-col items-center gap-1 ${activeTab === 'database' ? 'border-[#354CE1] bg-[#354CE1]/5 text-[#354CE1]' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                  >
                    <Database className="w-5 h-5" />
                    <span className="text-[10px] font-bold">{t.methodDatabase}</span>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-display font-bold text-lg text-slate-900 mb-2">{t.setAgeGate}</h3>
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-600">
                    <span>{t.minAge}</span>
                    <span className="bg-[#354CE1] text-white px-2 py-0.5 rounded text-xs font-mono">{ageThreshold} {t.yearsUnit}</span>
                  </div>
                  <input 
                    type="range" 
                    min="13" 
                    max="21" 
                    step="1"
                    value={ageThreshold} 
                    onChange={(e) => setAgeThreshold(parseInt(e.target.value))}
                    className="w-full accent-[#354CE1] h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                    <span>13 (COPPA)</span>
                    <span>16 (GDPR-K)</span>
                    <span>{t.threshold18Standard}</span>
                    <span>{t.threshold21Strict}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display font-bold text-lg text-slate-900">{t.selectIdentra}</h3>
                  <span className="text-xs text-indigo-600 font-medium">{t.clickToTest}</span>
                </div>
                <div className="space-y-2">
                  {SIMULATOR_IDENTRAS.map(p => (
                    <button
                      key={p.id}
                      onClick={() => handleIdentraSelect(p)}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition ${selectedIdentra.id === p.id ? 'bg-[#354CE1]/5 border-[#354CE1] shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300'}`}
                    >
                      <div className="flex items-center gap-3">
                        <img src={p.imageUrl} alt={p.id === 'p-4' ? t.spoofTest : p.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                        <div>
                          <span className="text-xs font-bold text-slate-800 block">{p.id === 'p-4' ? t.spoofTest : p.name}</span>
                          <span className="text-[10px] text-slate-400 block font-mono">
                            {t.actualAge}: {p.age} • {p.country === 'United Kingdom' ? t.art1Label : p.country === 'Australia' ? t.art2Label : p.country === 'France' ? t.art3Label : t.countryUs}
                          </span>
                        </div>
                      </div>
                      {p.isSpoof ? (
                        <span className="text-[9px] font-bold bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full border border-rose-100">{t.spoofTest}</span>
                      ) : (
                        <span className="text-[9px] font-bold bg-slate-50 text-slate-500 px-2 py-0.5 rounded-full">{t.legitUser}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Redaction toggle helper */}
            <div className="bg-slate-100 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#354CE1]" />
                  <span className="text-xs font-bold text-slate-800">{t.autoPiiRedaction}</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={dataMinimization} 
                    onChange={(e) => setDataMinimization(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#354CE1]"></div>
                </label>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                {t.autoPiiRedactionDesc}
              </p>
            </div>
          </div>

          {/* Simulator Visualizer Canvas */}
          <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between bg-slate-950 text-slate-100 relative min-h-[450px]">
            {/* Terminal Top Line */}
            <div className="flex items-center justify-between text-slate-400 font-mono text-xs border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
                <span>{isProcessing ? t.systemConsoleAnalyzing : t.systemConsoleReady}</span>
              </div>
              <span>UTC -08:00</span>
            </div>

            {/* Interactive display */}
            <div className="my-8 space-y-6">
              {isProcessing ? (
                <div className="text-center py-12 space-y-4">
                  <div className="inline-block relative">
                    <RefreshCw className="w-12 h-12 text-[#354CE1] animate-spin" />
                    <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] font-bold text-indigo-400">{progress}%</span>
                  </div>
                  <div className="space-y-1">
                    <p className="font-mono text-xs text-[#3ACBE8] tracking-wider uppercase font-bold animate-pulse">{t.systemConsoleAnalyzing}</p>
                    <p className="text-xs text-slate-400 font-mono">{t.systemConsoleAnalyzingDesc}</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  
                  {/* Left Column: Visual Capture Representation */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-44 h-44 rounded-2xl border-2 border-indigo-500/40 bg-slate-900 flex items-center justify-center overflow-hidden">
                      <img src={selectedIdentra.imageUrl} alt={selectedIdentra.id === 'p-4' ? t.spoofTest : selectedIdentra.name} className="w-full h-full object-cover" />
                      
                      {/* Grid overlap lines to make it look technical */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                      
                      {activeTab === 'selfie' && (
                        <div className="absolute inset-0 border-2 border-[#3ACBE8] rounded-2xl animate-pulse">
                          {/* Face keypoints simulation dots */}
                          <div className="absolute top-1/3 left-1/3 w-1 h-1 rounded-full bg-[#3ACBE8]"></div>
                          <div className="absolute top-1/3 right-1/3 w-1 h-1 rounded-full bg-[#3ACBE8]"></div>
                          <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                          <div className="absolute bottom-1/3 left-1/3 w-1 h-1 rounded-full bg-[#3ACBE8]"></div>
                          <div className="absolute bottom-1/3 right-1/3 w-1 h-1 rounded-full bg-[#3ACBE8]"></div>
                        </div>
                      )}

                      {activeTab === 'id' && (
                        <div className="absolute inset-2 border border-amber-500/50 flex flex-col justify-between p-2">
                          <span className="text-[8px] bg-amber-500/20 text-amber-300 font-mono self-start py-0.5 px-1.5 rounded">PASSPORT / ID</span>
                          <span className="text-[8px] bg-black/60 text-indigo-300 font-mono self-end">OCR MATCHING</span>
                        </div>
                      )}

                      {/* Decisive overlay badge */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-mono text-white/80">
                        {activeTab === 'selfie' ? t.faceScanCapture : activeTab === 'id' ? t.idFrontCapture : t.queryInputCheck}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Decisive details & metadata logs */}
                  <div className="space-y-4">
                    <div className="space-y-1.5 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">{t.extractedPayload}</span>
                      <div className="space-y-1 font-mono text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-400">{t.fullName}:</span>
                          <span className="font-bold text-white">{getMaskedValue(selectedIdentra.id === 'p-4' ? t.spoofTest : selectedIdentra.name, 'name')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">{t.birthDate}:</span>
                          <span className="font-bold text-white">{getMaskedValue(selectedIdentra.dob, 'dob')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">{t.claimedAge}:</span>
                          <span className="font-bold text-white">{selectedIdentra.age} {ageUnitLabel}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">{t.countryCode}:</span>
                          <span className="font-bold text-white">{selectedIdentra.country === 'United Kingdom' ? 'GBR' : selectedIdentra.country === 'Australia' ? 'AUS' : selectedIdentra.country === 'France' ? 'FRA' : 'USA'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">{t.subsystemChecks}</span>
                      <div className="flex flex-wrap gap-1.5">
                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${selectedIdentra.isSpoof ? 'bg-red-950 text-red-300 border-red-900' : 'bg-emerald-950 text-emerald-300 border-emerald-900'}`}>
                          {t.liveness}: {selectedIdentra.isSpoof ? t.livenessSpoof : t.livenessLegit}
                        </span>
                        <span className="text-[9px] font-mono px-2 py-0.5 bg-slate-900 text-indigo-300 rounded-full border border-slate-800">
                          {t.crossMatch}: {t.crossMatchPassed}
                        </span>
                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${selectedIdentra.age >= ageThreshold ? 'bg-emerald-950 text-emerald-300 border-emerald-900' : 'bg-amber-950 text-amber-300 border-amber-900'}`}>
                          {t.ageBound}: {selectedIdentra.age >= ageThreshold ? `${t.ageBoundOver} ${ageThreshold}` : `${t.ageBoundUnder} ${ageThreshold}`}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* Verdict Indicator Bar */}
            <div className="border-t border-slate-800 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-slate-400 text-xs font-mono">{t.verdictResults}</span>
                {isApproved() ? (
                  <div className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm px-4 py-1.5 rounded-full font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> {t.verdictApproved}
                  </div>
                ) : (
                  <div className="bg-red-500/20 border border-red-500/30 text-red-300 text-sm px-4 py-1.5 rounded-full font-bold flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4" /> {t.verdictRejected}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => startSimulation(selectedIdentra)}
                  disabled={isProcessing}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition disabled:opacity-50 flex items-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
                  {t.runEvaluation}
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. global regulations using internationally recognized standards */}
      <section className="bg-slate-50 border-t border-slate-200 py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight text-slate-900">
              {t.certSectionTitle}
            </h2>
            <p className="text-slate-500 text-sm md:text-base">
              {t.certSectionDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Article Card 1 */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-lg transition">
              <div className="p-6 space-y-4">
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full uppercase tracking-wider">{t.art1Label}</span>
                <h3 className="font-display font-extrabold text-lg text-slate-900 leading-snug">
                  {t.art1Title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                  {t.art1Desc}
                </p>
              </div>
              <div className="p-6 pt-0 border-t border-slate-50 flex items-center justify-between text-xs font-semibold text-slate-400">
                <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {t.art1Tag}</span>
                <span className="text-indigo-600 hover:text-indigo-800 transition flex items-center gap-0.5">{t.readArticle} <ArrowRight className="w-3 h-3" /></span>
              </div>
            </div>

            {/* Article Card 2 */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-lg transition">
              <div className="p-6 space-y-4">
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">{t.art2Label}</span>
                <h3 className="font-display font-extrabold text-lg text-slate-900 leading-snug">
                  {t.art2Title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                  {t.art2Desc}
                </p>
              </div>
              <div className="p-6 pt-0 border-t border-slate-50 flex items-center justify-between text-xs font-semibold text-slate-400">
                <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {t.art2Tag}</span>
                <span className="text-indigo-600 hover:text-indigo-800 transition flex items-center gap-0.5">{t.readArticle} <ArrowRight className="w-3 h-3" /></span>
              </div>
            </div>

            {/* Article Card 3 */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-lg transition">
              <div className="p-6 space-y-4">
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full uppercase tracking-wider">{t.art3Label}</span>
                <h3 className="font-display font-extrabold text-lg text-slate-900 leading-snug">
                  {t.art3Title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                  {t.art3Desc}
                </p>
              </div>
              <div className="p-6 pt-0 border-t border-slate-50 flex items-center justify-between text-xs font-semibold text-slate-400">
                <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {t.art3Tag}</span>
                <span className="text-indigo-600 hover:text-indigo-800 transition flex items-center gap-0.5">{t.readArticle} <ArrowRight className="w-3 h-3" /></span>
              </div>
            </div>

            {/* Article Card 4 */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-lg transition">
              <div className="p-6 space-y-4">
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full uppercase tracking-wider">{t.art4Label}</span>
                <h3 className="font-display font-extrabold text-lg text-slate-900 leading-snug">
                  {t.art4Title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                  {t.art4Desc}
                </p>
              </div>
              <div className="p-6 pt-0 border-t border-slate-50 flex items-center justify-between text-xs font-semibold text-slate-400">
                <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {t.art4Tag}</span>
                <span className="text-indigo-600 hover:text-indigo-800 transition flex items-center gap-0.5">{t.readArticle} <ArrowRight className="w-3 h-3" /></span>
              </div>
            </div>

            {/* Article Card 5 */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-lg transition">
              <div className="p-6 space-y-4">
                <span className="text-[10px] font-bold text-violet-600 bg-violet-50 px-2.5 py-1 rounded-full uppercase tracking-wider">{t.art5Label}</span>
                <h3 className="font-display font-extrabold text-lg text-slate-900 leading-snug">
                  {t.art5Title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                  {t.art5Desc}
                </p>
              </div>
              <div className="p-6 pt-0 border-t border-slate-50 flex items-center justify-between text-xs font-semibold text-slate-400">
                <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {t.art5Tag}</span>
                <span className="text-indigo-600 hover:text-indigo-800 transition flex items-center gap-0.5">{t.readArticle} <ArrowRight className="w-3 h-3" /></span>
              </div>
            </div>

            {/* Article Card 6 */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-lg transition">
              <div className="p-6 space-y-4">
                <span className="text-[10px] font-bold text-[#354CE1] bg-indigo-50 px-2.5 py-1 rounded-full uppercase tracking-wider">{t.art6Label}</span>
                <h3 className="font-display font-extrabold text-lg text-slate-900 leading-snug">
                  {t.art6Title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                  {t.art6Desc}
                </p>
              </div>
              <div className="p-6 pt-0 border-t border-slate-50 flex items-center justify-between text-xs font-semibold text-slate-400">
                <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {t.art6Tag}</span>
                <span className="text-indigo-600 hover:text-indigo-800 transition flex items-center gap-0.5">{t.readArticle} <ArrowRight className="w-3 h-3" /></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Adapt to new safety regulations across geographies (Interactive Region Card) */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight text-slate-900">
              {t.regTitle}
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              {t.regDesc}
            </p>

            {/* Interactive geographic selector */}
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setSelectedRegion('uk')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold border transition ${selectedRegion === 'uk' ? 'bg-[#354CE1] border-[#354CE1] text-white shadow' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}
                >
                  🇬🇧 {t.art1Label} (OSA)
                </button>
                <button 
                  onClick={() => setSelectedRegion('france')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold border transition ${selectedRegion === 'france' ? 'bg-[#354CE1] border-[#354CE1] text-white shadow' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}
                >
                  🇫🇷 {t.art3Label.split(' / ')[0]} (SREN)
                </button>
                <button 
                  onClick={() => setSelectedRegion('au')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold border transition ${selectedRegion === 'au' ? 'bg-[#354CE1] border-[#354CE1] text-white shadow' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}
                >
                  🇦🇺 {t.art2Label} (SMMA)
                </button>
                <button 
                  onClick={() => setSelectedRegion('us')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold border transition ${selectedRegion === 'us' ? 'bg-[#354CE1] border-[#354CE1] text-white shadow' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}
                >
                  🇺🇸 {t.countryUs} ({t.stateBillsLabel})
                </button>
              </div>

              {/* Detail view based on selected region */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
                {selectedRegion === 'uk' && (
                  <>
                    <h4 className="font-bold text-sm text-slate-800">{t.ukOsaTitle}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {t.ukOsaDesc}
                    </p>
                    <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                      <li>{t.ukOsaBullet1}</li>
                      <li>{t.ukOsaBullet2}</li>
                      <li>{t.ukOsaBullet3}</li>
                    </ul>
                  </>
                )}
                {selectedRegion === 'france' && (
                  <>
                    <h4 className="font-bold text-sm text-slate-800">{t.frSrenTitle}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {t.frSrenDesc}
                    </p>
                    <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                      <li>{t.frSrenBullet1}</li>
                      <li>{t.frSrenBullet2}</li>
                      <li>{t.frSrenBullet3}</li>
                    </ul>
                  </>
                )}
                {selectedRegion === 'au' && (
                  <>
                    <h4 className="font-bold text-sm text-slate-800">{t.auSmmaTitle}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {t.auSmmaDesc}
                    </p>
                    <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                      <li>{t.auSmmaBullet1}</li>
                      <li>{t.auSmmaBullet2}</li>
                      <li>{t.auSmmaBullet3}</li>
                    </ul>
                  </>
                )}
                {selectedRegion === 'us' && (
                  <>
                    <h4 className="font-bold text-sm text-slate-800">{t.usStateTitle}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {t.usStateDesc}
                    </p>
                    <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                      <li>{t.usStateBullet1}</li>
                      <li>{t.usStateBullet2}</li>
                      <li>{t.usStateBullet3}</li>
                    </ul>
                  </>
                )}
              </div>
            </div>

            {/* Target Sample Industries list */}
            <div className="pt-6 border-t border-slate-100">
              <h4 className="font-display font-bold text-slate-800 mb-3 text-sm">{t.sampleIndustries}</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-[#FAFBFD] rounded-xl border border-slate-100 text-center">
                  <span className="block font-bold text-slate-800 text-xs">{t.industrySocialMedia}</span>
                  <span className="text-[10px] text-slate-400">{t.industrySocialMediaDesc}</span>
                </div>
                <div className="p-3 bg-[#FAFBFD] rounded-xl border border-slate-100 text-center">
                  <span className="block font-bold text-slate-800 text-xs">{t.industryRetail}</span>
                  <span className="text-[10px] text-slate-400">{t.industryRetailDesc}</span>
                </div>
                <div className="p-3 bg-[#FAFBFD] rounded-xl border border-slate-100 text-center">
                  <span className="block font-bold text-slate-800 text-xs">{t.industryEntertainment}</span>
                  <span className="text-[10px] text-slate-400">{t.industryEntertainmentDesc}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive World Map visual graphic */}
          <div className="bg-[#101944] rounded-3xl p-8 relative overflow-hidden h-[400px] flex flex-col justify-between text-white border border-slate-800">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#354CE1_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Globe className="w-5 h-5 text-[#3ACBE8]" />
                <span className="font-mono text-[10px] text-[#3ACBE8] uppercase font-bold tracking-wider">{t.regMapperTitle}</span>
              </div>
              <span className="text-[9px] font-mono text-slate-400">{t.regionsActive}</span>
            </div>

            {/* Simulated Dot-Map with PINs */}
            <div className="relative flex-1 flex items-center justify-center my-6">
              {/* Custom styled vector grid for a tech map */}
              <div className="w-full max-w-sm h-48 border border-white/5 bg-slate-900/40 rounded-xl relative overflow-hidden flex items-center justify-center">
                <span className="text-slate-600 text-xs font-mono select-none uppercase tracking-widest">{t.globalGeographyArray}</span>
                
                {/* Active Country Pins on Map */}
                <div className="absolute top-1/4 left-1/4 group cursor-pointer">
                  <span className="absolute inline-flex h-3 w-3 rounded-full bg-indigo-400 opacity-75 animate-ping"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#3ACBE8] border border-white"></span>
                  <div className="absolute bottom-4 -left-6 bg-slate-950 border border-slate-800 text-[9px] p-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition">
                    {usRegionLabel}
                  </div>
                </div>

                <div className="absolute top-1/3 left-1/2 group cursor-pointer">
                  <span className="absolute inline-flex h-3 w-3 rounded-full bg-indigo-400 opacity-75 animate-ping"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500 border border-white"></span>
                  <div className="absolute bottom-4 -left-4 bg-slate-950 border border-slate-800 text-[9px] p-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition">{t.art1Label} (OSA)</div>
                </div>

                <div className="absolute top-1/2 left-[55%] group cursor-pointer">
                  <span className="absolute inline-flex h-3 w-3 rounded-full bg-indigo-400 opacity-75 animate-ping"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#354CE1] border border-white"></span>
                  <div className="absolute bottom-4 -left-6 bg-slate-950 border border-slate-800 text-[9px] p-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition">{t.art3Label.split(' / ')[0]} (SREN)</div>
                </div>

                <div className="absolute bottom-1/4 right-1/4 group cursor-pointer">
                  <span className="absolute inline-flex h-3 w-3 rounded-full bg-indigo-400 opacity-75 animate-ping"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-white"></span>
                  <div className="absolute bottom-4 -left-12 bg-slate-950 border border-slate-800 text-[9px] p-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition">{t.art2Label} (SMMA)</div>
                </div>
              </div>
            </div>

            <div className="relative z-10 bg-slate-900/80 border border-white/5 p-3 rounded-xl flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">{t.currentScope}</span>
              <span className="text-[#3ACBE8] font-bold">
                {selectedRegion === 'uk' ? t.scopeUk : selectedRegion === 'france' ? t.scopeFrance : selectedRegion === 'au' ? t.scopeAu : t.scopeUs}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Serve your entire user base (Interactive Age gates selector) */}
      <section className="bg-white border-t border-slate-100 py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight text-slate-900 leading-tight">
                {t.serveBaseTitle}
              </h2>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                {t.serveBaseDesc}
              </p>
              
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-sm text-slate-800 mb-2">{t.progStrategyTitle}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t.progStrategyDesc}
                </p>
              </div>

              <button 
                onClick={onOpenSandbox}
                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition font-semibold text-sm"
              >
                {t.learnCascading} <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Gate card 1 */}
                <div className="border border-slate-200 p-6 rounded-2xl hover:border-[#354CE1] transition bg-[#FAFBFD] space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-slate-800 font-display">{t.gate13Title}</span>
                    <span className="text-[10px] font-mono text-[#3ACBE8] bg-[#101944] px-2 py-0.5 rounded font-bold">{t.gate13Tag}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {t.gate13Desc}
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">{t.recommendedCheck}</span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-700 font-semibold"><Camera className="w-3.5 h-3.5 text-indigo-500" /> {t.gate13Rec}</span>
                  </div>
                </div>

                {/* Gate card 2 */}
                <div className="border border-slate-200 p-6 rounded-2xl hover:border-[#354CE1] transition bg-[#FAFBFD] space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-slate-800 font-display">{t.gate16Title}</span>
                    <span className="text-[10px] font-mono text-indigo-300 bg-[#101944] px-2 py-0.5 rounded font-bold">{t.gate16Tag}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {t.gate16Desc}
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">{t.recommendedCheck}</span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-700 font-semibold"><Database className="w-3.5 h-3.5 text-emerald-500" /> {t.gate16Rec}</span>
                  </div>
                </div>

                {/* Gate card 3 */}
                <div className="border border-slate-200 p-6 rounded-2xl hover:border-[#354CE1] transition bg-[#FAFBFD] space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-slate-800 font-display">{t.gate18Title}</span>
                    <span className="text-[10px] font-mono text-indigo-300 bg-[#101944] px-2 py-0.5 rounded font-bold">{t.gate18Tag}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {t.gate18Desc}
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">{t.recommendedCheck}</span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-700 font-semibold"><FileText className="w-3.5 h-3.5 text-amber-500" /> {t.gate18Rec}</span>
                  </div>
                </div>

                {/* Gate card 4 */}
                <div className="border border-slate-200 p-6 rounded-2xl hover:border-[#354CE1] transition bg-[#FAFBFD] space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-slate-800 font-display">{t.gate21Title}</span>
                    <span className="text-[10px] font-mono text-red-300 bg-red-950/40 px-2 py-0.5 rounded font-bold">{t.gate21Tag}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {t.gate21Desc}
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">{t.recommendedCheck}</span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-700 font-semibold"><ShieldCheck className="w-3.5 h-3.5 text-[#354CE1]" /> {t.gate21Rec}</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Reduce end-user privacy risk (Data minimization explanation) */}
      <section className="bg-slate-50 py-20 px-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Explanatory text */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight text-slate-900 leading-tight">
              {t.reducePrivacyRisk}
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              {t.reducePrivacyRiskDesc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-start gap-3">
                <Lock className="w-5 h-5 text-indigo-600 shrink-0" />
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-800 text-xs">{t.piiVaulting}</h4>
                  <p className="text-[11px] text-slate-500">{t.piiVaultingDesc}</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-start gap-3">
                <Trash2 className="w-5 h-5 text-indigo-600 shrink-0" />
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-800 text-xs">{t.scheduledDisposal}</h4>
                  <p className="text-[11px] text-slate-500">{t.scheduledDisposalDesc}</p>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl text-xs text-indigo-800 leading-relaxed">
              <strong>{t.complianceNoteTitle}</strong> {t.complianceNoteDesc}
            </div>
          </div>

          {/* Right Column: Interactive security table or illustration of PII Masking */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  <span className="font-display font-bold text-slate-800 text-sm">{t.identraSecurityRegistry}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">{t.activeStandard}</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-2.5 border-b border-slate-50">
                  <span className="font-bold text-slate-800">ISO/IEC 27001</span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded font-mono font-bold uppercase">{t.certifiedStandard}</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-slate-50">
                  <span className="font-bold text-slate-800">{t.soc2Type2Audit}</span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded font-mono font-bold uppercase">{t.evaluatedAnnually}</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-slate-50">
                  <span className="font-bold text-slate-800">ISO 27566-1 ({t.badgeLabel})</span>
                  <span className="text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-0.5 rounded font-mono font-bold uppercase">{t.fullyReady}</span>
                </div>
                <div className="flex justify-between items-center py-2.5">
                  <span className="font-bold text-slate-800">{t.fedRampAuthorization}</span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded font-mono font-bold uppercase">{t.authorizedStatus}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-2">
                <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold tracking-wider">{t.storageMinimizer}</span>
                <div className="flex items-center justify-center gap-4 text-xs">
                  <div className="text-slate-500">{t.rawIdScan}: <strong className="text-red-500">{t.deleted}</strong></div>
                  <div className="text-slate-300">|</div>
                  <div className="text-slate-500">{t.biometricTemplate}: <strong className="text-red-500">{t.deleted}</strong></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 8. Choose from a library of age assurance methods (Accordion exploration list) */}
      <section className="bg-white py-20 px-6 border-t border-slate-100 max-w-7xl mx-auto">
        <div className="space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-mono font-bold tracking-widest text-[#354CE1] uppercase bg-indigo-50 px-3 py-1 rounded-full">
              {t.fullLibrary}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight text-slate-900">
              {t.libraryTitle}
            </h2>
            <p className="text-slate-500 text-sm md:text-base">
              {t.libraryDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Accordion list */}
            <div className="lg:col-span-7 space-y-3">
              
              {/* Method 1 */}
              <div className={`border rounded-2xl overflow-hidden transition ${activeAccordion === 'selfie-est' ? 'border-[#354CE1] bg-[#FAFBFD]' : 'border-slate-200 bg-white'}`}>
                <button 
                  onClick={() => setActiveAccordion('selfie-est')}
                  className="w-full p-5 text-left flex items-center justify-between font-display font-bold text-slate-800 text-base"
                >
                  <div className="flex items-center gap-3">
                    <Camera className="w-5 h-5 text-indigo-600" />
                    <span>{t.method1Title}</span>
                  </div>
                  {activeAccordion === 'selfie-est' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>
                {activeAccordion === 'selfie-est' && (
                  <div className="p-5 pt-0 border-t border-slate-100/50 text-xs text-slate-500 leading-relaxed space-y-2">
                    <p>
                      {t.method1Desc}
                    </p>
                    <p className="font-semibold text-slate-700">{t.method1Best}</p>
                  </div>
                )}
              </div>

              {/* Method 2 */}
              <div className={`border rounded-2xl overflow-hidden transition ${activeAccordion === 'gov-id' ? 'border-[#354CE1] bg-[#FAFBFD]' : 'border-slate-200 bg-white'}`}>
                <button 
                  onClick={() => setActiveAccordion('gov-id')}
                  className="w-full p-5 text-left flex items-center justify-between font-display font-bold text-slate-800 text-base"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-indigo-600" />
                    <span>{t.method2Title}</span>
                  </div>
                  {activeAccordion === 'gov-id' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>
                {activeAccordion === 'gov-id' && (
                  <div className="p-5 pt-0 border-t border-slate-100/50 text-xs text-slate-500 leading-relaxed space-y-2">
                    <p>
                      {t.method2Desc}
                    </p>
                    <p className="font-semibold text-slate-700">{t.method2Best}</p>
                  </div>
                )}
              </div>

              {/* Method 3 */}
              <div className={`border rounded-2xl overflow-hidden transition ${activeAccordion === 'official-db' ? 'border-[#354CE1] bg-[#FAFBFD]' : 'border-slate-200 bg-white'}`}>
                <button 
                  onClick={() => setActiveAccordion('official-db')}
                  className="w-full p-5 text-left flex items-center justify-between font-display font-bold text-slate-800 text-base"
                >
                  <div className="flex items-center gap-3">
                    <Database className="w-5 h-5 text-indigo-600" />
                    <span>{t.method3Title}</span>
                  </div>
                  {activeAccordion === 'official-db' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>
                {activeAccordion === 'official-db' && (
                  <div className="p-5 pt-0 border-t border-slate-100/50 text-xs text-slate-500 leading-relaxed space-y-2">
                    <p>
                      {t.method3Desc}
                    </p>
                    <p className="font-semibold text-slate-700">{t.method3Best}</p>
                  </div>
                )}
              </div>

              {/* Method 4 */}
              <div className={`border rounded-2xl overflow-hidden transition ${activeAccordion === 'credit-card' ? 'border-[#354CE1] bg-[#FAFBFD]' : 'border-slate-200 bg-white'}`}>
                <button 
                  onClick={() => setActiveAccordion('credit-card')}
                  className="w-full p-5 text-left flex items-center justify-between font-display font-bold text-slate-800 text-base"
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-indigo-600" />
                    <span>{t.method4Title}</span>
                  </div>
                  {activeAccordion === 'credit-card' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>
                {activeAccordion === 'credit-card' && (
                  <div className="p-5 pt-0 border-t border-slate-100/50 text-xs text-slate-500 leading-relaxed space-y-2">
                    <p>
                      {t.method4Desc}
                    </p>
                    <p className="font-semibold text-slate-700">{t.method4Best}</p>
                  </div>
                )}
              </div>

              {/* Method 5 */}
              <div className={`border rounded-2xl overflow-hidden transition ${activeAccordion === 'email-age' ? 'border-[#354CE1] bg-[#FAFBFD]' : 'border-slate-200 bg-white'}`}>
                <button 
                  onClick={() => setActiveAccordion('email-age')}
                  className="w-full p-5 text-left flex items-center justify-between font-display font-bold text-slate-800 text-base"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-indigo-600" />
                    <span>{t.method5Title}</span>
                  </div>
                  {activeAccordion === 'email-age' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>
                {activeAccordion === 'email-age' && (
                  <div className="p-5 pt-0 border-t border-slate-100/50 text-xs text-slate-500 leading-relaxed space-y-2">
                    <p>
                      {t.method5Desc}
                    </p>
                    <p className="font-semibold text-slate-700">{t.method5Best}</p>
                  </div>
                )}
              </div>

              {/* Method 6 */}
              <div className={`border rounded-2xl overflow-hidden transition ${activeAccordion === 'connect-id' ? 'border-[#354CE1] bg-[#FAFBFD]' : 'border-slate-200 bg-white'}`}>
                <button 
                  onClick={() => setActiveAccordion('connect-id')}
                  className="w-full p-5 text-left flex items-center justify-between font-display font-bold text-slate-800 text-base"
                >
                  <div className="flex items-center gap-3">
                    <Landmark className="w-5 h-5 text-indigo-600" />
                    <span>{t.method6Title}</span>
                  </div>
                  {activeAccordion === 'connect-id' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>
                {activeAccordion === 'connect-id' && (
                  <div className="p-5 pt-0 border-t border-slate-100/50 text-xs text-slate-500 leading-relaxed space-y-2">
                    <p>
                      {t.method6Desc}
                    </p>
                    <p className="font-semibold text-slate-700">{t.method6Best}</p>
                  </div>
                )}
              </div>

              {/* Method 7 */}
              <div className={`border rounded-2xl overflow-hidden transition ${activeAccordion === 'phone-age' ? 'border-[#354CE1] bg-[#FAFBFD]' : 'border-slate-200 bg-white'}`}>
                <button 
                  onClick={() => setActiveAccordion('phone-age')}
                  className="w-full p-5 text-left flex items-center justify-between font-display font-bold text-slate-800 text-base"
                >
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-indigo-600" />
                    <span>{t.method7Title}</span>
                  </div>
                  {activeAccordion === 'phone-age' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>
                {activeAccordion === 'phone-age' && (
                  <div className="p-5 pt-0 border-t border-slate-100/50 text-xs text-slate-500 leading-relaxed space-y-2">
                    <p>
                      {t.method7Desc}
                    </p>
                    <p className="font-semibold text-slate-700">{t.method7Best}</p>
                  </div>
                )}
              </div>

              {/* Method 8 */}
              <div className={`border rounded-2xl overflow-hidden transition ${activeAccordion === 'wallet' ? 'border-[#354CE1] bg-[#FAFBFD]' : 'border-slate-200 bg-white'}`}>
                <button 
                  onClick={() => setActiveAccordion('wallet')}
                  className="w-full p-5 text-left flex items-center justify-between font-display font-bold text-slate-800 text-base"
                >
                  <div className="flex items-center gap-3">
                    <UserCheck className="w-5 h-5 text-indigo-600" />
                    <span>{t.method8Title}</span>
                  </div>
                  {activeAccordion === 'wallet' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>
                {activeAccordion === 'wallet' && (
                  <div className="p-5 pt-0 border-t border-slate-100/50 text-xs text-slate-500 leading-relaxed space-y-2">
                    <p>
                      {t.method8Desc}
                    </p>
                    <p className="font-semibold text-slate-700">{t.method8Best}</p>
                  </div>
                )}
              </div>

            </div>

            {/* Explanatory summary graphic */}
            <div className="lg:col-span-5 bg-[#101944] text-white p-8 rounded-3xl space-y-6 border border-white/5 sticky top-6">
              <h3 className="font-display font-extrabold text-xl text-[#3ACBE8]">{t.activeOrchestration}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.orchestrationDesc}
              </p>

              <div className="space-y-4 pt-4 border-t border-white/10 text-xs">
                <div className="flex items-start gap-3">
                  <div className="bg-indigo-500/20 w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 text-indigo-300">1</div>
                  <div>
                    <span className="font-bold block text-slate-200">{t.orchestrationStep1Title}</span>
                    <p className="text-slate-400 text-[11px]">{t.orchestrationStep1Desc}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-indigo-500/20 w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 text-indigo-300">2</div>
                  <div>
                    <span className="font-bold block text-slate-200">{t.orchestrationStep2Title}</span>
                    <p className="text-slate-400 text-[11px]">{t.orchestrationStep2Desc}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-[#3ACBE8]/20 w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 text-[#3ACBE8]">3</div>
                  <div>
                    <span className="font-bold block text-slate-200">{t.orchestrationStep3Title}</span>
                    <p className="text-[#3ACBE8] text-[11px]">{t.orchestrationStep3Desc}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={onOpenSandbox}
                  className="w-full bg-[#354CE1] hover:bg-[#2539BE] text-white font-bold text-xs px-5 py-3.5 rounded-xl transition shadow flex items-center justify-center gap-1.5"
                >
                  {t.orchestrationCta} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. KEEP LEARNING SECTION */}
      <section className="bg-slate-50 border-t border-slate-200 py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">{t.knowledgeCenter}</span>
              <h2 className="text-3xl font-display font-extrabold tracking-tight text-slate-900">
                {t.keepLearning}
              </h2>
            </div>
            <button 
              onClick={onOpenSandbox}
              className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition"
            >
              {t.browseLibrary} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Learn Card 1 */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-lg transition">
              <div className="p-6 space-y-4">
                <div className="w-full h-40 rounded-xl bg-indigo-900/10 flex items-center justify-center relative overflow-hidden">
                  <span className="text-3xl">📝</span>
                </div>
                <h3 className="font-display font-bold text-slate-900 text-base leading-snug">
                  {t.learn1Title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t.learn1Desc}
                </p>
              </div>
              <div className="p-6 pt-0 border-t border-slate-50 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                <span>{t.learn1Tag}</span>
                <span className="text-indigo-600 flex items-center gap-0.5">{t.learn1Cta} <ArrowRight className="w-3 h-3" /></span>
              </div>
            </div>

            {/* Learn Card 2 */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-lg transition">
              <div className="p-6 space-y-4">
                <div className="w-full h-40 rounded-xl bg-[#3ACBE8]/10 flex items-center justify-center relative overflow-hidden">
                  <span className="text-3xl">🇦🇺</span>
                </div>
                <h3 className="font-display font-bold text-slate-900 text-base leading-snug">
                  {t.learn2Title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t.learn2Desc}
                </p>
              </div>
              <div className="p-6 pt-0 border-t border-slate-50 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                <span>{t.learn2Tag}</span>
                <span className="text-indigo-600 flex items-center gap-0.5">{t.learn2Cta} <ArrowRight className="w-3 h-3" /></span>
              </div>
            </div>

            {/* Learn Card 3 */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-lg transition">
              <div className="p-6 space-y-4">
                <div className="w-full h-40 rounded-xl bg-violet-900/10 flex items-center justify-center relative overflow-hidden">
                  <span className="text-3xl">🌐</span>
                </div>
                <h3 className="font-display font-bold text-slate-900 text-base leading-snug">
                  {t.learn3Title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t.learn3Desc}
                </p>
              </div>
              <div className="p-6 pt-0 border-t border-slate-50 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                <span>{t.learn3Tag}</span>
                <span className="text-indigo-600 flex items-center gap-0.5">{t.learn3Cta} <ArrowRight className="w-3 h-3" /></span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 10. EXPLORE MORE PLATFORM LINKING SECTION */}
      <section className="bg-white py-20 px-6 border-t border-slate-100 max-w-7xl mx-auto text-center space-y-8">
        <div className="max-w-xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">{t.orchestrateMore}</span>
          <h2 className="text-3xl font-display font-extrabold tracking-tight text-slate-900">
            {t.exploreMore}
          </h2>
          <p className="text-slate-500 text-sm">
            {t.exploreMoreDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Platform link 1 */}
          <button 
            onClick={() => onViewChange && onViewChange('workflows')}
            className="p-8 rounded-3xl border border-slate-200 text-left bg-gradient-to-br from-white to-slate-50 hover:border-[#354CE1] transition group flex flex-col justify-between h-48"
          >
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#354CE1] font-bold uppercase tracking-wider">{t.workflowsBadge}</span>
              <h3 className="font-display font-extrabold text-slate-900 text-lg">{t.workflowsTitle}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t.workflowsDesc}
              </p>
            </div>
            <span className="text-xs text-[#354CE1] font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition duration-200">
              {t.workflowsCta} <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </button>

          {/* Platform link 2 */}
          <button 
            onClick={() => onViewChange && onViewChange('case-management')}
            className="p-8 rounded-3xl border border-slate-200 text-left bg-gradient-to-br from-white to-slate-50 hover:border-[#354CE1] transition group flex flex-col justify-between h-48"
          >
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#354CE1] font-bold uppercase tracking-wider">{t.casesBadge}</span>
              <h3 className="font-display font-extrabold text-slate-900 text-lg">{t.casesTitle}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t.casesDesc}
              </p>
            </div>
            <span className="text-xs text-[#354CE1] font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition duration-200">
              {t.casesCta} <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      </section>

    </div>
  );
}
