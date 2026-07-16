/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState } from 'react';
import { 
  ArrowRight, Shield, Check, FileBadge, CheckCircle2, ChevronDown, ChevronUp, 
  Database, Smartphone, ShieldAlert, ArrowLeft, Clock, AlertTriangle, User, 
  Users, Building2, MapPin, Eye, Play, Sparkles, Building, Briefcase, FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { BACKGROUND_CHECKS_TRANSLATIONS } from '../translations/BackgroundChecksPageTranslations';

interface BackgroundChecksPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

interface CandidateProfile {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'passed' | 'warning' | 'review';
  violationsCount: number;
  idCheck: 'passed' | 'failed' | 'pending';
  criminalCheck: 'passed' | 'failed' | 'pending';
  mvrCheck: 'passed' | 'failed' | 'pending';
  watchlistCheck: 'passed' | 'failed' | 'pending';
  details: {
    dob: string;
    licenseState: string;
    licenseStatus: 'Valid' | 'Expired' | 'Suspended';
    violations: string[];
    criminalRecords: string[];
    watchlistMatches: string[];
  };
}

const CANDIDATES: CandidateProfile[] = [
  {
    id: 'cand-1',
    name: 'Marcus Chen',
    role: 'Ride-Share Driver Applicant',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    status: 'passed',
    violationsCount: 0,
    idCheck: 'passed',
    criminalCheck: 'passed',
    mvrCheck: 'passed',
    watchlistCheck: 'passed',
    details: {
      dob: '08/14/1992',
      licenseState: 'CA',
      licenseStatus: 'Valid',
      violations: [],
      criminalRecords: [],
      watchlistMatches: []
    }
  },
  {
    id: 'cand-2',
    name: 'Sarah Jenkins',
    role: 'On-Demand Courier',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    status: 'warning',
    violationsCount: 2,
    idCheck: 'passed',
    criminalCheck: 'passed',
    mvrCheck: 'failed',
    watchlistCheck: 'passed',
    details: {
      dob: '03/22/1995',
      licenseState: 'NY',
      licenseStatus: 'Expired',
      violations: ['Speeding (15mph over limit) - 10/12/2025', 'Failure to Yield - 02/04/2026'],
      criminalRecords: [],
      watchlistMatches: []
    }
  },
  {
    id: 'cand-3',
    name: 'Arthur Pendelton',
    role: 'Freelance Caregiver',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    status: 'review',
    violationsCount: 1,
    idCheck: 'passed',
    criminalCheck: 'passed',
    mvrCheck: 'passed',
    watchlistCheck: 'failed',
    details: {
      dob: '11/05/1984',
      licenseState: 'TX',
      licenseStatus: 'Valid',
      violations: [],
      criminalRecords: [],
      watchlistMatches: ['OFAC Watchlist: Partial match on name / birth year (re-verification required)']
    }
  }
];

type BackgroundLogKey = keyof typeof BACKGROUND_CHECKS_TRANSLATIONS.en;
type BackgroundLogEntry = {
  key: BackgroundLogKey;
  candidateId?: string;
  licenseStatus?: CandidateProfile['details']['licenseStatus'];
  status?: CandidateProfile['status'];
};

export default function BackgroundChecksPage({ onOpenSandbox, onBackToLanding, onViewChange }: BackgroundChecksPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(BACKGROUND_CHECKS_TRANSLATIONS, language as keyof typeof BACKGROUND_CHECKS_TRANSLATIONS, 'BACKGROUND_CHECKS_TRANSLATIONS');

  // Translated Candidate Profiles
  const translatedCandidates = React.useMemo(() => [
    {
      id: 'cand-1',
      name: t.cand1Name,
      role: t.cand1Role,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      status: 'passed' as const,
      violationsCount: 0,
      idCheck: 'passed' as const,
      criminalCheck: 'passed' as const,
      mvrCheck: 'passed' as const,
      watchlistCheck: 'passed' as const,
      details: {
        dob: '08/14/1992',
        licenseState: 'CA',
        licenseStatus: 'Valid' as const,
        violations: [] as string[],
        criminalRecords: [] as string[],
        watchlistMatches: [] as string[]
      }
    },
    {
      id: 'cand-2',
      name: t.cand2Name,
      role: t.cand2Role,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
      status: 'warning' as const,
      violationsCount: 2,
      idCheck: 'passed' as const,
      criminalCheck: 'passed' as const,
      mvrCheck: 'failed' as const,
      watchlistCheck: 'passed' as const,
      details: {
        dob: '03/22/1995',
        licenseState: 'NY',
        licenseStatus: 'Expired' as const,
        violations: [
          t.cand2Violation1,
          t.cand2Violation2
        ],
        criminalRecords: [] as string[],
        watchlistMatches: [] as string[]
      }
    },
    {
      id: 'cand-3',
      name: t.cand3Name,
      role: t.cand3Role,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      status: 'review' as const,
      violationsCount: 1,
      idCheck: 'passed' as const,
      criminalCheck: 'passed' as const,
      mvrCheck: 'passed' as const,
      watchlistCheck: 'failed' as const,
      details: {
        dob: '11/05/1984',
        licenseState: 'TX',
        licenseStatus: 'Valid' as const,
        violations: [] as string[],
        criminalRecords: [] as string[],
        watchlistMatches: [
          t.cand3WatchlistMatch
        ]
      }
    }
  ], [t]);

  // Accordion Section State
  const [activeAccordion, setActiveAccordion] = useState<string>('library');

  // Simulator State
  const [selectedCandId, setSelectedCandId] = useState<string>('cand-1');
  const selectedCand = React.useMemo(() => {
    return translatedCandidates.find(c => c.id === selectedCandId) || translatedCandidates[0];
  }, [translatedCandidates, selectedCandId]);

  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState<number>(0);
  const [simLogEntries, setSimLogEntries] = useState<BackgroundLogEntry[]>([]);
  const [checkedStages, setCheckedStages] = useState({
    idCheck: 'idle', // idle, running, done
    criminalCheck: 'idle',
    mvrCheck: 'idle',
    watchlistCheck: 'idle'
  });

  // Custom Demo Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    website: '',
    company: '',
    jobTitle: ''
  });

  const formatSimLog = (entry: BackgroundLogEntry) => {
    let message = t[entry.key] as string;

    if (entry.candidateId) {
      const candidateName = translatedCandidates.find(c => c.id === entry.candidateId)?.name || selectedCand.name;
      message = message.replace('{name}', candidateName);
    }

    if (entry.licenseStatus) {
      message = message.replace('{status}', entry.licenseStatus);
    }

    if (entry.status) {
      const statusText = entry.status === 'passed' ? t.passed : entry.status === 'warning' ? t.minorFlag : t.reviewBtn;
      message = message.replace('{status}', statusText.toUpperCase());
    }

    return message;
  };
  const simLogs = simLogEntries.map(formatSimLog);
  const appendSimLog = (entry: BackgroundLogEntry) => setSimLogEntries(prev => [...prev, entry]);

  // Run Interactive Background Check Simulation
  const handleStartSimulation = (cand: typeof translatedCandidates[0]) => {
    setSelectedCandId(cand.id);
    setIsSimulating(true);
    setSimulationStep(0);
    setSimLogEntries([{ key: 'logLaunchWorkflow', candidateId: cand.id }]);
    setCheckedStages({
      idCheck: 'idle',
      criminalCheck: 'idle',
      mvrCheck: 'idle',
      watchlistCheck: 'idle'
    });

    // Step-by-step trigger sequence
    const runStep = (step: number) => {
      setSimulationStep(step);
      if (step === 1) {
        setCheckedStages(prev => ({ ...prev, idCheck: 'running' }));
        appendSimLog({ key: 'logIdvVerifying' });
        setTimeout(() => {
          setCheckedStages(prev => ({ ...prev, idCheck: 'done' }));
          appendSimLog({ key: 'logIdvSuccess' });
          runStep(2);
        }, 1500);
      } else if (step === 2) {
        setCheckedStages(prev => ({ ...prev, idCheck: 'done', criminalCheck: 'running' }));
        appendSimLog({ key: 'logCriminalQuerying' });
        setTimeout(() => {
          setCheckedStages(prev => ({ ...prev, criminalCheck: 'done' }));
          if (cand.criminalCheck === 'passed') {
            appendSimLog({ key: 'logCriminalSuccess' });
          } else {
            appendSimLog({ key: 'logCriminalAlert' });
          }
          runStep(3);
        }, 1500);
      } else if (step === 3) {
        setCheckedStages(prev => ({ ...prev, criminalCheck: 'done', mvrCheck: 'running' }));
        appendSimLog({ key: 'logMvrRetrieving' });
        setTimeout(() => {
          setCheckedStages(prev => ({ ...prev, mvrCheck: 'done' }));
          if (cand.details.licenseStatus === 'Valid') {
            if (cand.details.violations.length === 0) {
              appendSimLog({ key: 'logMvrSuccessClean' });
            } else {
              appendSimLog({ key: 'logMvrSuccessMinor' });
            }
          } else {
            appendSimLog({ key: 'logMvrAlert', licenseStatus: cand.details.licenseStatus });
          }
          runStep(4);
        }, 1500);
      } else if (step === 4) {
        setCheckedStages(prev => ({ ...prev, mvrCheck: 'done', watchlistCheck: 'running' }));
        appendSimLog({ key: 'logWatchlistRunning' });
        setTimeout(() => {
          setCheckedStages(prev => ({ ...prev, watchlistCheck: 'done' }));
          if (cand.watchlistCheck === 'passed') {
            appendSimLog({ key: 'logWatchlistSuccess' });
          } else {
            appendSimLog({ key: 'logWatchlistFlag' });
          }
          runStep(5);
        }, 1500);
      } else if (step === 5) {
        appendSimLog({ key: 'logDecisioning' });
        setTimeout(() => {
          setIsSimulating(false);
          setSimulationStep(6);
          appendSimLog({ key: 'logSystemFinished', status: cand.status });
        }, 1000);
      }
    };

    // Run first step
    setTimeout(() => runStep(1), 800);
  };

  // Demo form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.company) {
      alert("Please fill in all required fields marked with *");
      return;
    }
    setFormSubmitted(true);
  };

  return (
    <div className="bg-[#FAFBFD] font-sans antialiased text-slate-800 scroll-smooth">
      {/* Back button to main landing page */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <button 
          onClick={onBackToLanding}
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-[#354CE1] hover:bg-[#354CE1]/5 transition"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>{t.backToHome}</span>
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Text Block (span 7 of 12) */}
            <div className="lg:col-span-7 space-y-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#2C4F8D]/10 text-[#2C4F8D] text-[10px] font-bold rounded-full uppercase tracking-wider font-mono">
                <Shield className="w-3.5 h-3.5" />
                {t.backgroundChecksBadge}
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-slate-900 leading-tight tracking-tight">
                {t.heroTitle}<span className="text-[#354CE1]">{t.heroTitleHighlight}</span>
              </h1>
              
              <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {t.heroDesc}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <button
                  onClick={onOpenSandbox}
                  className="px-8 py-4 bg-[#FFBF43] hover:bg-[#FFBF43]/90 text-[#0F1E36] font-bold rounded-full transition shadow-xl shadow-black/5 text-sm text-center flex items-center justify-center gap-1.5"
                >
                  {t.getDemoBtn}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#simulator"
                  className="px-8 py-4 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-full transition text-sm text-center"
                >
                  {t.launchSimBtn}
                </a>
              </div>
            </div>

            {/* Right Hero Graphic/Card Block (span 5 of 12) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-gradient-to-br from-[#4E89FF] to-[#1E56C8] aspect-[4/3] flex items-center justify-center p-8 border border-slate-100">
                {/* Simulated Device Screen Mockup */}
                <div className="w-full bg-white rounded-2xl shadow-xl p-5 border border-slate-100 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{t.driverIdv}</p>
                        <p className="text-[10px] text-slate-400">{t.idAndCriminal}</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-[#10B981]/10 text-[#10B981] text-[9px] font-bold rounded-full">{t.activeBadge}</span>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">{t.govIdScan}</span>
                      <span className="text-[#10B981] font-bold flex items-center gap-1">✓ {t.passed}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">{t.facialLiveness}</span>
                      <span className="text-[#10B981] font-bold flex items-center gap-1">✓ {t.matched}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">{t.nationalCriminal}</span>
                      <span className="text-[#10B981] font-bold flex items-center gap-1">✓ {t.clear}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">{t.mvrReport}</span>
                      <span className="text-amber-500 font-bold flex items-center gap-1">⚠ {t.minorFlag}</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span className="text-[10px] font-semibold text-slate-600">{t.decisionText}</span>
                    </div>
                    <button onClick={onOpenSandbox} className="text-[10px] text-[#354CE1] font-bold hover:underline">{t.reviewBtn}</button>
                  </div>
                </div>

                {/* Aesthetic decorative circles */}
                <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 blur-md" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5 blur-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Stripe Ribbon */}
      <section className="bg-[#0A1D37] py-8 text-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 font-mono text-center md:text-left">
            {t.ribbonText}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <span className="font-display font-bold text-lg md:text-xl tracking-tight text-slate-300">Outdoorsy</span>
            <span className="font-display font-bold text-lg md:text-xl tracking-tight text-slate-300">taskrabbit</span>
            <span className="font-display font-bold text-lg md:text-xl tracking-tight text-slate-300">GET YOUR GUIDE</span>
          </div>
        </div>
      </section>

      {/* Interactive Background Check Simulator Section */}
      <section id="simulator" className="py-16 md:py-24 border-y border-slate-100 bg-[#FAFBFD]">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-bold text-[#354CE1] uppercase tracking-widest font-mono bg-[#354CE1]/5 px-2.5 py-1 rounded-full">
              {t.simulatorBadge}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight">
              {t.simulatorTitle}
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              {t.simulatorDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Side: Applicant Profiles (span 4 of 12) */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">
                {t.selectProfile}
              </span>
              
              {translatedCandidates.map((cand) => (
                <button
                  key={cand.id}
                  onClick={() => {
                    if (!isSimulating) {
                      setSelectedCandId(cand.id);
                      setSimulationStep(0);
                    }
                  }}
                  disabled={isSimulating}
                  className={`p-4 rounded-2xl border text-left flex items-center justify-between transition ${
                    isSimulating ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
                  } ${
                    selectedCand.id === cand.id 
                      ? 'border-[#354CE1] bg-white shadow-lg shadow-indigo-100/50' 
                      : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img 
                        src={cand.avatar} 
                        alt={cand.name} 
                        className="w-12 h-12 rounded-full object-cover border border-slate-200"
                        referrerPolicy="no-referrer"
                      />
                      <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                        cand.status === 'passed' ? 'bg-[#10B981]' : cand.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                      }`} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{cand.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{cand.role}</p>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 transition ${
                    selectedCand.id === cand.id ? 'text-[#354CE1] translate-x-1' : 'text-slate-300'
                  }`} />
                </button>
              ))}

              <div className="mt-4 p-4 bg-white rounded-2xl border border-slate-200 space-y-4">
                <span className="text-xs font-bold text-slate-900 block border-b border-slate-100 pb-2">
                  {t.enabledScreenings}
                </span>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>{t.idvCheck}</span>
                    <span className="font-bold text-emerald-600 uppercase">{t.alwaysOn}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{t.criminalSearch}</span>
                    <span className="font-bold text-emerald-600 uppercase">{t.active}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{t.mvrCheck}</span>
                    <span className="font-bold text-emerald-600 uppercase">{t.active}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{t.ofacScreening}</span>
                    <span className="font-bold text-emerald-600 uppercase">{t.active}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => handleStartSimulation(selectedCand)}
                  disabled={isSimulating}
                  className="w-full bg-[#354CE1] hover:bg-[#2539BE] disabled:bg-slate-300 text-white font-bold py-3 px-4 rounded-xl text-xs transition flex items-center justify-center gap-2"
                >
                  {isSimulating ? (
                    <>
                      <Clock className="w-4 h-4 animate-spin" />
                      <span>{t.btnSimulating}</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>{t.btnRun}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Side: Running Dashboard Status (span 8 of 12) */}
            <div className="lg:col-span-8 bg-slate-900 text-slate-100 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden min-h-[500px]">
              {/* Background gradient hints */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-6 z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={selectedCand.avatar} 
                      alt={selectedCand.name} 
                      className="w-10 h-10 rounded-full object-cover border border-slate-700"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="text-xs text-slate-400 font-mono">{t.workspace}</p>
                      <p className="text-sm font-bold text-white">{selectedCand.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-400">{t.currentStatusLabel}</span>
                    {simulationStep === 6 ? (
                      <span className={`px-2.5 py-1 text-[10px] font-bold font-mono rounded-full uppercase tracking-wider ${
                        selectedCand.status === 'passed' 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                          : selectedCand.status === 'warning'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {selectedCand.status === 'passed' ? t.passed : selectedCand.status === 'warning' ? t.minorFlag : t.reviewBtn}
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-slate-800 text-slate-400 text-[10px] font-bold font-mono rounded-full uppercase border border-slate-700 animate-pulse">
                        {isSimulating ? t.statusProcessing : t.statusIdle}
                      </span>
                    )}
                  </div>
                </div>

                {/* Verification Check Stages Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className={`p-4 rounded-xl border transition ${
                    checkedStages.idCheck === 'running' 
                      ? 'bg-indigo-500/10 border-indigo-500/50 text-indigo-200' 
                      : checkedStages.idCheck === 'done' 
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200' 
                      : 'bg-slate-850 border-slate-800 text-slate-500'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-wider font-bold">{t.stageIdv}</span>
                      {checkedStages.idCheck === 'running' && <Clock className="w-3.5 h-3.5 text-indigo-400 animate-spin" />}
                      {checkedStages.idCheck === 'done' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                    </div>
                    <p className="text-[11px] mt-1 font-semibold text-slate-300">{t.stageIdvDesc}</p>
                  </div>

                  <div className={`p-4 rounded-xl border transition ${
                    checkedStages.criminalCheck === 'running' 
                      ? 'bg-indigo-500/10 border-indigo-500/50 text-indigo-200' 
                      : checkedStages.criminalCheck === 'done' 
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200' 
                      : 'bg-slate-850 border-slate-800 text-slate-500'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-wider font-bold">{t.stageCriminal}</span>
                      {checkedStages.criminalCheck === 'running' && <Clock className="w-3.5 h-3.5 text-indigo-400 animate-spin" />}
                      {checkedStages.criminalCheck === 'done' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                    </div>
                    <p className="text-[11px] mt-1 font-semibold text-slate-300">{t.stageCriminalDesc}</p>
                  </div>

                  <div className={`p-4 rounded-xl border transition ${
                    checkedStages.mvrCheck === 'running' 
                      ? 'bg-indigo-500/10 border-indigo-500/50 text-indigo-200' 
                      : checkedStages.mvrCheck === 'done'
                      ? selectedCand.mvrCheck === 'failed'
                        ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
                        : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200'
                      : 'bg-slate-850 border-slate-800 text-slate-500'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-wider font-bold">{t.stageMvr}</span>
                      {checkedStages.mvrCheck === 'running' && <Clock className="w-3.5 h-3.5 text-indigo-400 animate-spin" />}
                      {checkedStages.mvrCheck === 'done' && (
                        selectedCand.mvrCheck === 'failed' 
                          ? <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                          : <Check className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </div>
                    <p className="text-[11px] mt-1 font-semibold text-slate-300">{t.stageMvrDesc}</p>
                  </div>

                  <div className={`p-4 rounded-xl border transition ${
                    checkedStages.watchlistCheck === 'running' 
                      ? 'bg-indigo-500/10 border-indigo-500/50 text-indigo-200' 
                      : checkedStages.watchlistCheck === 'done'
                      ? selectedCand.watchlistCheck === 'failed'
                        ? 'bg-rose-500/10 border-rose-500/40 text-rose-200'
                        : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200'
                      : 'bg-slate-850 border-slate-800 text-slate-500'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-wider font-bold">{t.stageWatchlist}</span>
                      {checkedStages.watchlistCheck === 'running' && <Clock className="w-3.5 h-3.5 text-indigo-400 animate-spin" />}
                      {checkedStages.watchlistCheck === 'done' && (
                        selectedCand.watchlistCheck === 'failed' 
                          ? <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                          : <Check className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </div>
                    <p className="text-[11px] mt-1 font-semibold text-slate-300">{t.stageWatchlistDesc}</p>
                  </div>
                </div>

                {/* Console Log Area */}
                <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 font-mono text-xs space-y-1.5 h-44 overflow-y-auto pr-2 scrollbar-thin">
                  {simLogs.map((log, index) => (
                    <div key={index} className="flex items-start gap-2 text-slate-300 leading-normal">
                      <span className="text-slate-500 shrink-0 select-none">[{index + 1}]</span>
                      <span className={
                        log.includes('SUCCESS') ? 'text-emerald-400' :
                        log.includes('ALERT') || log.includes('REVIEW FLAG') ? 'text-amber-400' :
                        log.includes('System') ? 'text-indigo-300' : 'text-slate-300'
                      }>{log}</span>
                    </div>
                  ))}
                  {isSimulating && (
                    <div className="flex items-center gap-1 text-indigo-400 text-[11px] italic animate-pulse pt-1">
                      <span>{t.orchestratingLogs}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Simulation Result Details Drawer */}
              {simulationStep === 6 && (
                <div className="mt-6 p-4 bg-slate-850 rounded-2xl border border-slate-800 space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold font-mono tracking-wider text-slate-400">{t.reportHeader}</h3>
                    <button 
                      onClick={() => setSimulationStep(0)} 
                      className="text-[10px] text-slate-400 hover:text-white underline font-mono"
                    >
                      {t.clearReportBtn}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
                    <div className="space-y-2 border-r border-slate-800 pr-4">
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-mono">{t.dobLabel}</span>
                        <span className="font-semibold text-white">{selectedCand.details.dob}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-mono">{t.licenseStateLabel}</span>
                        <span className="font-semibold text-white">{selectedCand.details.licenseState}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-mono">{t.licenseStatusLabel}</span>
                        <span className={`font-semibold ${selectedCand.details.licenseStatus === 'Valid' ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {selectedCand.details.licenseStatus}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-slate-400 font-mono block">{t.flagLogsHeader}</span>
                      {selectedCand.status === 'passed' ? (
                        <p className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                          <CheckCircle2 className="w-4 h-4 shrink-0" /> {t.cleanSuccessMsg}
                        </p>
                      ) : selectedCand.status === 'warning' ? (
                        <div className="space-y-1">
                          <p className="text-amber-400 font-bold flex items-center gap-1 text-[11px]">
                            <AlertTriangle className="w-4 h-4 shrink-0" /> {t.nonCriticalHeader}
                          </p>
                          <ul className="list-disc pl-5 text-[10px] space-y-0.5 text-slate-300 font-mono">
                            {selectedCand.details.violations.map((v, i) => <li key={i}>{v}</li>)}
                          </ul>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <p className="text-rose-400 font-bold flex items-center gap-1 text-[11px]">
                            <ShieldAlert className="w-4 h-4 shrink-0" /> {t.sanctionsHeader}
                          </p>
                          <ul className="list-disc pl-5 text-[10px] space-y-0.5 text-slate-300 font-mono">
                            {selectedCand.details.watchlistMatches.map((m, i) => <li key={i}>{m}</li>)}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Feature Layout Grid (Staggered Layout) */}
      <section className="py-20 md:py-28 bg-white space-y-24 md:space-y-36">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Row 1: Streamline onboarding */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight tracking-tight">
                {t.section1Title}
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                {t.section1Desc}
              </p>
              <div className="space-y-3">
                {[t.f1_1, t.f1_2, t.f1_3].map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#10B981]/10 flex items-center justify-center text-[#10B981] text-[10px] font-bold">✓</span>
                    <span className="text-xs font-semibold text-slate-700">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Graphic block */}
            <div className="relative p-8 bg-slate-50 rounded-[2rem] border border-slate-100 aspect-[4/3] flex items-center justify-center">
              <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-5 border border-slate-100 space-y-4">
                <div className="space-y-1">
                  <div className="w-8 h-1 bg-indigo-200 rounded" />
                  <p className="text-xs font-bold text-slate-900">{t.personalInfoLabel}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div className="space-y-1">
                    <span className="text-slate-400 font-medium font-mono">{t.firstNameLabel}</span>
                    <p className="p-2 bg-slate-50 rounded-lg border border-slate-100 font-semibold text-slate-800">Marcus</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-400 font-medium font-mono">{t.lastNameLabel}</span>
                    <p className="p-2 bg-slate-50 rounded-lg border border-slate-100 font-semibold text-slate-800">Chen</p>
                  </div>
                </div>

                <div className="space-y-1 text-[11px]">
                  <span className="text-slate-400 font-medium font-mono">{t.govIdVerified}</span>
                  <div className="p-2.5 bg-indigo-50 rounded-xl border border-indigo-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileBadge className="w-4 h-4 text-[#354CE1]" />
                      <span className="font-bold text-[#354CE1]">CA-DL-9828231</span>
                    </div>
                    <span className="text-[10px] font-bold font-mono text-emerald-600">{t.matched}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Row 2: Verify and screen quickly */}
        <div className="bg-[#FAFBFD] py-16 md:py-24 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left Side: Graphic Block */}
              <div className="order-2 lg:order-1 relative p-8 bg-white rounded-[2rem] border border-slate-200/60 aspect-[4/3] flex items-center justify-center">
                <div className="w-full max-w-sm bg-slate-900 text-slate-100 rounded-2xl shadow-xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-[10px] font-mono text-slate-400">{t.yardstikPartnerConnector}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-slate-800 rounded-lg flex items-center justify-between">
                      <span className="font-mono text-slate-300">{t.criminalSearch}</span>
                      <span className="text-emerald-400 font-bold">{t.passed}</span>
                    </div>
                    <div className="p-2.5 bg-slate-800 rounded-lg flex items-center justify-between">
                      <span className="font-mono text-slate-300">{t.ofacScreening}</span>
                      <span className="text-emerald-400 font-bold">{t.passed}</span>
                    </div>
                    <div className="p-2.5 bg-slate-800 rounded-lg flex items-center justify-between">
                      <span className="font-mono text-slate-300">{t.mvrCheck}</span>
                      <span className="text-emerald-400 font-bold">{t.clear}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Text Block */}
              <div className="order-1 lg:order-2 space-y-6">
                <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight tracking-tight">
                  {t.section2Title}
                </h2>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  {t.section2Desc}
                </p>
                <div className="space-y-3">
                  {[t.f2_1, t.f2_2, t.f2_3].map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#10B981]/10 flex items-center justify-center text-[#10B981] text-[10px] font-bold">✓</span>
                      <span className="text-xs font-semibold text-slate-700">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Automate decisions */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Side: Text */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 leading-tight tracking-tight">
                {t.section3Title}
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                {t.section3Desc}
              </p>
              <div className="space-y-3">
                {[t.f3_1, t.f3_2, t.f3_3].map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#10B981]/10 flex items-center justify-center text-[#10B981] text-[10px] font-bold">✓</span>
                    <span className="text-xs font-semibold text-slate-700">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Graphic Block */}
            <div className="relative p-8 bg-slate-50 rounded-[2rem] border border-slate-100 aspect-[4/3] flex items-center justify-center">
              <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-5 border border-slate-100 space-y-4">
                <p className="text-xs font-mono font-bold text-slate-400">{t.decisionAutomationAction}</p>
                
                <div className="space-y-2">
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-emerald-900">{t.mvrClearIdMatch}</p>
                      <p className="text-[10px] text-emerald-700">{t.allRulesResolved}</p>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-500 text-white text-[9px] font-bold rounded-full font-mono uppercase">AUTO_APPROVE</span>
                  </div>

                  <div className="flex items-center justify-center py-1">
                    <div className="w-0.5 h-6 bg-slate-200" />
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-indigo-500" />
                      <span className="font-semibold text-slate-700">{t.triggerOnboardAPI}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{t.sentOk}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Robust Library of Verifications & Screenings (Accordion Section) */}
      <section className="py-20 md:py-28 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          
          {/* Accordion 1 */}
          <div className="border border-slate-200 rounded-3xl overflow-hidden bg-white shadow-xs">
            <button
              onClick={() => setActiveAccordion(prev => prev === 'library' ? '' : 'library')}
              className="w-full px-6 py-6 md:px-8 flex items-center justify-between text-left focus:outline-none"
            >
              <h3 className="text-base md:text-lg font-bold text-slate-900">
                {t.acc1Title}
              </h3>
              {activeAccordion === 'library' ? (
                <ChevronUp className="w-5 h-5 text-slate-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400" />
              )}
            </button>

            <AnimatePresence>
              {activeAccordion === 'library' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-8 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-100 pt-6">
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#354CE1]" />
                        {t.acc1Heading1}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed pl-4">
                        {t.acc1Desc1}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#354CE1]" />
                        {t.acc1Heading2}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed pl-4">
                        {t.acc1Desc2}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#354CE1]" />
                        {t.acc1Heading3}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed pl-4">
                        {t.acc1Desc3}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#354CE1]" />
                        {t.acc1Heading4}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed pl-4">
                        {t.acc1Desc4}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Accordion 2 */}
          <div className="border border-slate-200 rounded-3xl overflow-hidden bg-white shadow-xs">
            <button
              onClick={() => setActiveAccordion(prev => prev === 'streamline' ? '' : 'streamline')}
              className="w-full px-6 py-6 md:px-8 flex items-center justify-between text-left focus:outline-none"
            >
              <h3 className="text-base md:text-lg font-bold text-slate-900">
                {t.acc2Title}
              </h3>
              {activeAccordion === 'streamline' ? (
                <ChevronUp className="w-5 h-5 text-slate-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400" />
              )}
            </button>

            <AnimatePresence>
              {activeAccordion === 'streamline' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-8 md:px-8 border-t border-slate-100 pt-6 text-xs text-slate-500 leading-relaxed space-y-4">
                    <p>
                      {t.acc2Text1}
                    </p>
                    <p>
                      {t.acc2Text2}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Accordion 3 */}
          <div className="border border-slate-200 rounded-3xl overflow-hidden bg-white shadow-xs">
            <button
              onClick={() => setActiveAccordion(prev => prev === 'automated' ? '' : 'automated')}
              className="w-full px-6 py-6 md:px-8 flex items-center justify-between text-left focus:outline-none"
            >
              <h3 className="text-base md:text-lg font-bold text-slate-900">
                {t.acc3Title}
              </h3>
              {activeAccordion === 'automated' ? (
                <ChevronUp className="w-5 h-5 text-slate-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400" />
              )}
            </button>

            <AnimatePresence>
              {activeAccordion === 'automated' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-8 md:px-8 border-t border-slate-100 pt-6 text-xs text-slate-500 leading-relaxed space-y-4">
                    <p>
                      {t.acc3Text1}
                    </p>
                    <p>
                      {t.acc3Text2}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Interactive Custom Demo Form Section */}
      <section className="py-20 md:py-28 bg-[#FAFBFD] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-2xl p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column Graphic (span 5 of 12) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-tr from-[#354CE1] to-[#6074FF] aspect-square flex items-center justify-center p-8 border border-indigo-100">
                  {/* High fidelity courier layout representation */}
                  <div className="text-center space-y-4 text-white z-10">
                    <div className="w-16 h-16 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto shadow-md">
                      <Sparkles className="w-8 h-8 text-[#FFBF43]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{t.customDemoTitle}</h3>
                      <p className="text-xs text-indigo-100 mt-1 max-w-xs mx-auto">
                        {t.customDemoDesc}
                      </p>
                    </div>
                  </div>
                  
                  {/* Decorative circles */}
                  <div className="absolute top-6 left-6 w-24 h-24 rounded-full bg-white/5 blur-xl" />
                  <div className="absolute bottom-6 right-6 w-32 h-32 rounded-full bg-[#FFBF43]/10 blur-xl" />
                </div>
              </div>

              {/* Right Column Form (span 7 of 12) */}
              <div className="lg:col-span-7">
                {formSubmitted ? (
                  <div className="space-y-6 text-center py-10 animate-in fade-in duration-300">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-slate-900">{t.formPreparedTitle}</h3>
                      <p className="text-xs text-slate-500 max-w-md mx-auto">
                        {t.formPreparedDescBeforeFirst}<span className="font-bold text-slate-800">{formData.firstName}</span>{t.formPreparedDescAs}<span className="font-bold text-slate-800">{formData.jobTitle || 'Team Member'}</span>{t.formPreparedDescAt}<span className="font-bold text-slate-800">{formData.company}</span>.
                      </p>
                    </div>
                    <button
                      onClick={onOpenSandbox}
                      className="inline-flex items-center gap-2 px-6 py-3.5 bg-black hover:bg-slate-800 text-white font-bold rounded-full text-xs shadow-xl transition"
                    >
                      <span>{t.openPersonalizedSandbox}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">{t.fieldFirstName}</label>
                        <input 
                          type="text" 
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData(p => ({ ...p, firstName: e.target.value }))}
                          placeholder={t.placeholderFirstName} 
                          className="w-full p-3.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-[#354CE1]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">{t.fieldLastName}</label>
                        <input 
                          type="text" 
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData(p => ({ ...p, lastName: e.target.value }))}
                          placeholder={t.placeholderLastName} 
                          className="w-full p-3.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-[#354CE1]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">{t.fieldEmail}</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                        placeholder={t.placeholderEmail} 
                        className="w-full p-3.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-[#354CE1]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">{t.fieldWebsite}</label>
                      <input 
                        type="text" 
                        required
                        value={formData.website}
                        onChange={(e) => setFormData(p => ({ ...p, website: e.target.value }))}
                        placeholder={t.placeholderWebsite} 
                        className="w-full p-3.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-[#354CE1]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">{t.fieldCompany}</label>
                        <input 
                          type="text" 
                          required
                          value={formData.company}
                          onChange={(e) => setFormData(p => ({ ...p, company: e.target.value }))}
                          placeholder={t.placeholderCompany} 
                          className="w-full p-3.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-[#354CE1]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">{t.fieldJobTitle}</label>
                        <input 
                          type="text" 
                          value={formData.jobTitle}
                          onChange={(e) => setFormData(p => ({ ...p, jobTitle: e.target.value }))}
                          placeholder={t.placeholderJobTitle} 
                          className="w-full p-3.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-[#354CE1]"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-4 bg-black hover:bg-slate-800 text-white font-bold rounded-full transition text-xs shadow-lg flex items-center justify-center gap-1.5"
                    >
                      <span>{t.viewDemoBtn}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Segment Selection Cards (Bento style use cases) */}
      <section className="py-20 md:py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 tracking-tight">
              {t.bentoTitle}
            </h2>
            <p className="text-slate-500 text-xs md:text-sm">
              {t.bentoDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 space-y-4 flex flex-col justify-between hover:bg-white hover:shadow-lg hover:border-[#354CE1]/20 transition">
              <div className="space-y-2">
                <span className="p-2 bg-[#354CE1]/5 text-[#354CE1] rounded-lg inline-block">
                  <Users className="w-5 h-5" />
                </span>
                <h3 className="text-sm font-bold text-slate-900">{t.bento1Title}</h3>
                <p className="text-xs text-slate-500 leading-normal">
                  {t.bento1Desc}
                </p>
              </div>
              <button onClick={onOpenSandbox} className="text-xs text-[#354CE1] font-bold flex items-center gap-1 hover:underline self-start">
                {t.learnMoreBtn} <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 space-y-4 flex flex-col justify-between hover:bg-white hover:shadow-lg hover:border-[#354CE1]/20 transition">
              <div className="space-y-2">
                <span className="p-2 bg-[#354CE1]/5 text-[#354CE1] rounded-lg inline-block">
                  <Smartphone className="w-5 h-5" />
                </span>
                <h3 className="text-sm font-bold text-slate-900">{t.bento2Title}</h3>
                <p className="text-xs text-slate-500 leading-normal">
                  {t.bento2Desc}
                </p>
              </div>
              <button onClick={onOpenSandbox} className="text-xs text-[#354CE1] font-bold flex items-center gap-1 hover:underline self-start">
                {t.learnMoreBtn} <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 space-y-4 flex flex-col justify-between hover:bg-white hover:shadow-lg hover:border-[#354CE1]/20 transition">
              <div className="space-y-2">
                <span className="p-2 bg-[#354CE1]/5 text-[#354CE1] rounded-lg inline-block">
                  <Building2 className="w-5 h-5" />
                </span>
                <h3 className="text-sm font-bold text-slate-900">{t.bento3Title}</h3>
                <p className="text-xs text-slate-500 leading-normal">
                  {t.bento3Desc}
                </p>
              </div>
              <button onClick={onOpenSandbox} className="text-xs text-[#354CE1] font-bold flex items-center gap-1 hover:underline self-start">
                {t.learnMoreBtn} <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 space-y-4 flex flex-col justify-between hover:bg-white hover:shadow-lg hover:border-[#354CE1]/20 transition">
              <div className="space-y-2">
                <span className="p-2 bg-[#354CE1]/5 text-[#354CE1] rounded-lg inline-block">
                  <Briefcase className="w-5 h-5" />
                </span>
                <h3 className="text-sm font-bold text-slate-900">{t.bento4Title}</h3>
                <p className="text-xs text-slate-500 leading-normal">
                  {t.bento4Desc}
                </p>
              </div>
              <button onClick={onOpenSandbox} className="text-xs text-[#354CE1] font-bold flex items-center gap-1 hover:underline self-start">
                {t.learnMoreBtn} <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Explore more of Identra's identity platform section */}
      <section className="py-20 md:py-24 bg-[#FAFBFD] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 tracking-tight">
              {t.exploreTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
              onClick={() => onViewChange?.('marketplace')}
              className="group p-8 md:p-12 rounded-[2rem] bg-gradient-to-br from-[#4E89FF] to-[#1E56C8] text-white flex flex-col justify-between h-80 cursor-pointer shadow-xl shadow-blue-900/10 hover:shadow-2xl hover:scale-[1.01] transition duration-300"
            >
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-indigo-100">{t.card1Badge}</span>
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                  {t.card1Title}
                </h3>
                <p className="text-indigo-100 text-xs md:text-sm">
                  {t.card1Desc}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold font-mono group-hover:translate-x-1 transition-transform">
                {t.card1Btn} <ArrowRight className="w-4 h-4" />
              </span>
            </div>

            <div 
              onClick={() => onViewChange?.('government-id')}
              className="group p-8 md:p-12 rounded-[2rem] bg-gradient-to-br from-[#4CE1A6] to-[#0AA074] text-white flex flex-col justify-between h-80 cursor-pointer shadow-xl shadow-emerald-900/10 hover:shadow-2xl hover:scale-[1.01] transition duration-300"
            >
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-emerald-100">{t.card2Badge}</span>
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                  {t.card2Title}
                </h3>
                <p className="text-emerald-100 text-xs md:text-sm">
                  {t.card2Desc}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold font-mono group-hover:translate-x-1 transition-transform">
                {t.card2Btn} <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to get started? Bottom CTA */}
      <section className="bg-[#B5C0FF] py-16 text-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
          <h2 className="text-3xl md:text-4xl font-display font-black text-[#0F1E36] tracking-tight">
            {t.ctaTitle}
          </h2>
          <p className="text-[#0F1E36]/80 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            {t.ctaDesc}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenSandbox}
              className="w-full sm:w-auto px-8 py-4 bg-[#354CE1] hover:bg-[#2539BE] text-white font-bold rounded-full shadow-xl transition text-sm"
            >
              {t.ctaDemoBtn}
            </button>
            <button
              onClick={onOpenSandbox}
              className="w-full sm:w-auto px-8 py-4 border border-[#0F1E36]/20 hover:bg-white/10 text-[#0F1E36] font-bold rounded-full transition text-sm flex items-center justify-center gap-1.5"
            >
              <span>{t.ctaTryNowBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
