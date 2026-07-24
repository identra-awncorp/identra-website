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
  CreditCard, Mail, Landmark, Shield, UserCheck, HelpCircle, MapPin, Play, Network, AlertTriangle, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { CANDIDATE_VERIFICATION_TRANSLATIONS } from '../translations/CandidateVerificationPageTranslations';

interface CandidateVerificationPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

interface CandidateOption {
  id: string;
  name: string;
  role: string;
  avatar: string;
  isFraud: boolean;
  fraudType: 'deepfake' | 'proxy' | 'synthetic' | 'none';
  fraudDetails: string;
  idPhoto: string;
  checksResult: {
    liveness: 'pass' | 'fail';
    idCheck: 'pass' | 'fail';
    dbCheck: 'pass' | 'fail';
    faceMatch: 'pass' | 'fail';
  };
  telemetryLogs: string[];
}

type CandidateProfileMetadata = Omit<CandidateOption, 'name' | 'role' | 'fraudDetails' | 'telemetryLogs'>;

const CANDIDATE_PROFILES: CandidateProfileMetadata[] = [
  {
    id: 'cand-1',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    isFraud: false,
    fraudType: 'none',
    idPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    checksResult: {
      liveness: 'pass',
      idCheck: 'pass',
      dbCheck: 'pass',
      faceMatch: 'pass'
    },
},
  {
    id: 'cand-2',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    isFraud: true,
    fraudType: 'deepfake',
    idPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    checksResult: {
      liveness: 'fail',
      idCheck: 'pass',
      dbCheck: 'pass',
      faceMatch: 'fail'
    },
},
  {
    id: 'cand-3',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
    isFraud: true,
    fraudType: 'proxy',
    idPhoto: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=200',
    checksResult: {
      liveness: 'pass',
      idCheck: 'pass',
      dbCheck: 'pass',
      faceMatch: 'fail'
    },
},
  {
    id: 'cand-4',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    isFraud: true,
    fraudType: 'synthetic',
    idPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    checksResult: {
      liveness: 'pass',
      idCheck: 'fail',
      dbCheck: 'pass',
      faceMatch: 'fail'
    },
}
];

export default function CandidateVerificationPage({ onOpenSandbox, onBackToLanding, onViewChange }: CandidateVerificationPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(CANDIDATE_VERIFICATION_TRANSLATIONS, language as keyof typeof CANDIDATE_VERIFICATION_TRANSLATIONS, 'CANDIDATE_VERIFICATION_TRANSLATIONS');
  const translatedCandidates = React.useMemo<CandidateOption[]>(() => [
    {
      ...CANDIDATE_PROFILES[0],
      name: t.cand1Name,
      role: t.cand1Role,
      fraudDetails: t.cand1Details,
      telemetryLogs: [t.cand1Log1, t.cand1Log2, t.cand1Log3, t.cand1Log4],
      },
    {
      ...CANDIDATE_PROFILES[1],
      name: t.cand2Name,
      role: t.cand2Role,
      fraudDetails: t.cand2Details,
      telemetryLogs: [t.cand2Log1, t.cand2Log2, t.cand2Log3],
      },
    {
      ...CANDIDATE_PROFILES[2],
      name: t.cand3Name,
      role: t.cand3Role,
      fraudDetails: t.cand3Details,
      telemetryLogs: [t.cand3Log1, t.cand3Log2, t.cand3Log3],
      },
    {
      ...CANDIDATE_PROFILES[3],
      name: t.cand4Name,
      role: t.cand4Role,
      fraudDetails: t.cand4Details,
      telemetryLogs: [t.cand4Log1, t.cand4Log2],
      },
  ], [t]);

  // Accordion states
  const [activeAccordion, setActiveAccordion] = useState<string>('methods');

  // Interactive Simulator State
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>(CANDIDATE_PROFILES[0].id);
  const selectedCandidate = React.useMemo(() => {
    return translatedCandidates.find(cand => cand.id === selectedCandidateId) || translatedCandidates[0];
  }, [translatedCandidates, selectedCandidateId]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeLogCount, setActiveLogCount] = useState<number>(0);
  const [showResultCard, setShowResultCard] = useState<boolean>(true);

  // Checkbox configurations for the simulator
  const [checksEnabled, setChecksEnabled] = useState({
    idVerif: true,
    livenessFace: true,
    passiveSignals: true,
    workspaceBinding: true
  });

  const verificationLogs = React.useMemo(() => [
    t.logInit,
    t.logExtract.replace('{name}', selectedCandidate.name),
    checksEnabled.idVerif 
      ? (selectedCandidate.checksResult.idCheck === 'pass' 
          ? t.logIdPass 
          : t.logIdFail)
      : t.logIdSkip,
    t.logLiveness,
    checksEnabled.livenessFace
      ? (selectedCandidate.checksResult.liveness === 'fail' 
          ? t.logLivenessFail 
          : selectedCandidate.checksResult.faceMatch === 'fail'
            ? t.logFaceMismatch
            : t.logSelfiePass)
      : t.logLivenessSkip,
    t.logThreatScan,
    ...selectedCandidate.telemetryLogs
  ], [checksEnabled, selectedCandidate, t]);
  const activeLogs = verificationLogs.slice(0, activeLogCount);

  // Cycle simulation steps
  const runVerification = (cand: CandidateOption) => {
    setSelectedCandidateId(cand.id);
    setIsProcessing(true);
    setActiveLogCount(1);
    setShowResultCard(false);
  };

  useEffect(() => {
    if (isProcessing) {
      let nextLogIndex = 1;

      const interval = setInterval(() => {
        if (nextLogIndex < verificationLogs.length) {
          setActiveLogCount(nextLogIndex + 1);
          nextLogIndex++;
        } else {
          clearInterval(interval);
          setIsProcessing(false);
          setShowResultCard(true);
        }
      }, 900);

      return () => clearInterval(interval);
    }
  }, [isProcessing, verificationLogs.length]);

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-slate-800 antialiased selection:bg-[#354CE1]/10 selection:text-[#354CE1]">
      
      {/* 1. HERO BLUE HEADER */}
      <section className="px-6 pt-12 pb-16 md:pt-20 md:pb-24 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-[#354CE1] via-[#2F44D1] to-[#1E2E9A] rounded-[2.5rem] p-8 md:p-16 text-white shadow-2xl relative overflow-hidden">
          {/* Ambient shapes */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute left-1/3 bottom-0 w-80 h-80 bg-[#3ACBE8]/10 rounded-full blur-2xl"></div>

          {/* Back to landing */}
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
                <UserCheck className="w-3.5 h-3.5" /> {t.badge}
              </span>
              
              <h1 className="text-4xl md:text-5.5xl font-sans font-semibold tracking-tight text-white leading-tight">
                {t.heroTitle}
              </h1>
              
              <p className="text-lg text-white/90 font-light max-w-xl leading-relaxed">
                {t.heroDesc}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={onOpenSandbox}
                  className="bg-white text-[#354CE1] hover:bg-slate-100 font-semibold text-base px-8 py-4 rounded-full shadow-lg transition duration-200 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  {t.bookConsultation}
                  <ArrowRight className="w-4 h-4 transition group-hover:translate-x-1" />
                </button>
                <a 
                  href="#simulator"
                  className="border border-white/30 hover:border-white hover:bg-white/10 text-white font-semibold text-base px-8 py-4 rounded-full transition duration-200 flex items-center justify-center"
                >
                  {t.runLiveSimulator}
                </a>
              </div>

              {/* Three detailed bullet columns inside hero */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-white/15">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-[#3ACBE8]">{t.heroPoint1Title}</h4>
                  <p className="text-xs text-white/80 leading-relaxed">
                    {t.heroPoint1Desc}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-[#3ACBE8]">{t.heroPoint2Title}</h4>
                  <p className="text-xs text-white/80 leading-relaxed">
                    {t.heroPoint2Desc}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-[#3ACBE8]">{t.heroPoint3Title}</h4>
                  <p className="text-xs text-white/80 leading-relaxed">
                    {t.heroPoint3Desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Illustration Graphic - Custom CSS Render representing Candidate Check */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-[#1A255C] border border-white/10 p-6 md:p-8 rounded-3xl shadow-xl w-full max-w-md relative text-slate-300">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5 text-xs text-slate-400 font-mono">
                  <span>{t.workflowLabel}</span>
                  <span className="text-[#3ACBE8]">{t.activeSecure}</span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-700 shrink-0">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" className="object-cover w-full h-full" alt={t.candidateAlt} referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white truncate">{t.deepfakeVerification}</div>
                      <div className="text-[10px] text-slate-400">{t.liveZoomCheck}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {t.aiGeneratedFlag}
                    </span>
                  </div>

                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-2">
                    <div className="flex justify-between text-[11px]">
                      <span>{t.biometricConsistency}</span>
                      <span className="text-red-400 font-mono">{t.fail14}</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-red-400 rounded-full" style={{ width: '14%' }}></div>
                    </div>
                    <div className="text-[10px] text-slate-400 leading-relaxed italic">
                      "{t.biometricAnomaly}"
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="flex-1 p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-center">
                      <div className="text-[9px] text-slate-400">{t.idVerification}</div>
                      <div className="text-xs font-bold text-emerald-400">{t.passed}</div>
                    </div>
                    <div className="flex-1 p-2 bg-rose-500/10 border border-rose-500/20 rounded-lg text-center">
                      <div className="text-[9px] text-slate-400">{t.selfieLiveness}</div>
                      <div className="text-xs font-bold text-rose-400">{t.blocked}</div>
                    </div>
                  </div>
                </div>

                {/* Footnotes badge */}
                <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-500">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    {t.certifiedCompliance}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LOGO BAR */}
      <section className="bg-white border-y border-slate-100 py-6 mb-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-center md:text-left">
            {t.trustedBy}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
            {/* twilio */}
            <div className="flex items-center gap-1.5 font-bold text-slate-800 text-lg">
              <span className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white text-xs">t</span>
              twilio
            </div>
            {/* vehô */}
            <div className="font-extrabold text-slate-800 text-xl tracking-tight">
              vehô
            </div>
            {/* Linktree */}
            <div className="flex items-center gap-1.5 font-black text-slate-800 text-lg">
              🌲 Linktree
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUE PROPOSITIONS */}
      <section className="px-6 py-16 max-w-7xl mx-auto space-y-24">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-sans font-semibold tracking-tight text-slate-900">
            {t.preventTitle}
          </h2>
          <p className="text-slate-500">
            {t.preventDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
              {t.verifyTitle}
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {t.verifyDesc}
            </p>
            <div className="space-y-3.5 pt-2">
              {[
                t.verifyBullet1,
                t.verifyBullet2,
                t.verifyBullet3
              ].map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#354CE1] shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600 font-medium">{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 md:pl-6">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
              {t.identityRecordTitle}
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {t.identityRecordDesc}
            </p>
            <div className="space-y-3.5 pt-2">
              {[
                t.identityBullet1,
                t.identityBullet2,
                t.identityBullet3
              ].map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#354CE1] shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600 font-medium">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. HIGHLY INTERACTIVE WORKFLOW INTEGRITY SIMULATOR */}
      <section id="simulator" className="bg-[#FAFBFD] px-6 py-16 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[11px] font-bold tracking-widest text-[#354CE1] uppercase bg-indigo-50 px-3 py-1 rounded-full">
              {t.interactiveDemo}
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
              {t.simulatorTitle}
            </h2>
            <p className="text-slate-500">
              {t.simulatorDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left side: Controls & Candidate Selection (5 Cols) */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {t.chooseCandidate}
                </span>
                
                <div className="grid grid-cols-1 gap-2.5">
                  {translatedCandidates.map((cand) => (
                    <button
                      key={cand.id}
                      onClick={() => !isProcessing && setSelectedCandidateId(cand.id)}
                      disabled={isProcessing}
                      className={`flex items-center gap-3 p-3.5 rounded-2xl border text-left transition relative cursor-pointer ${
                        selectedCandidate.id === cand.id
                          ? 'border-[#354CE1] bg-white shadow-md'
                          : 'border-slate-200/80 bg-white/60 hover:border-slate-300'
                      } ${isProcessing ? 'opacity-60 cursor-not-allowed' : ''}`}
                    >
                      <div className="w-11 h-11 rounded-full overflow-hidden bg-slate-200 shrink-0 border border-slate-100">
                        <img src={cand.avatar} className="w-full h-full object-cover" alt={cand.name} referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm text-slate-900 truncate">{cand.name}</span>
                          {cand.isFraud && (
                            <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-rose-50 text-rose-500 border border-rose-100 shrink-0">
                              {t.fraudRisks}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 truncate">{cand.role}</p>
                      </div>
                      {selectedCandidate.id === cand.id && (
                        <div className="absolute right-3 bottom-3 w-2 h-2 rounded-full bg-[#354CE1]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggle verification criteria */}
              <div className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200/80">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  {t.configureCheckpoints}
                </span>
                
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={checksEnabled.idVerif} 
                      onChange={(e) => !isProcessing && setChecksEnabled(prev => ({ ...prev, idVerif: e.target.checked }))}
                      disabled={isProcessing}
                      className="rounded border-slate-300 text-[#354CE1] focus:ring-[#354CE1]" 
                    />
                    <div>
                      <span className="text-xs font-semibold text-slate-800 block">{t.govIdExtraction}</span>
                      <span className="text-[10px] text-slate-400 block">{t.govIdExtractionDesc}</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={checksEnabled.livenessFace} 
                      onChange={(e) => !isProcessing && setChecksEnabled(prev => ({ ...prev, livenessFace: e.target.checked }))}
                      disabled={isProcessing}
                      className="rounded border-slate-300 text-[#354CE1] focus:ring-[#354CE1]" 
                    />
                    <div>
                      <span className="text-xs font-semibold text-slate-800 block">{t.aiSelfieCheck}</span>
                      <span className="text-[10px] text-slate-400 block">{t.aiSelfieCheckDesc}</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={checksEnabled.passiveSignals} 
                      onChange={(e) => !isProcessing && setChecksEnabled(prev => ({ ...prev, passiveSignals: e.target.checked }))}
                      disabled={isProcessing}
                      className="rounded border-slate-300 text-[#354CE1] focus:ring-[#354CE1]" 
                    />
                    <div>
                      <span className="text-xs font-semibold text-slate-800 block">{t.passiveSignalsCheck}</span>
                      <span className="text-[10px] text-slate-400 block">{t.passiveSignalsCheckDesc}</span>
                    </div>
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => runVerification(selectedCandidate)}
                    disabled={isProcessing}
                    className="w-full py-3 px-5 bg-[#354CE1] hover:bg-[#2F44D1] disabled:bg-slate-300 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2 text-sm cursor-pointer"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        {t.runningAnalysis}
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        {t.initiateCheck}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right side: Simulation Log & Verdict Card (7 Cols) */}
            <div className="lg:col-span-7 bg-slate-950 rounded-3xl border border-slate-800 p-6 flex flex-col justify-between shadow-2xl min-h-[460px] text-slate-300 font-mono">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#3ACBE8] animate-pulse" />
                    <span className="text-[#3ACBE8] text-xs font-bold tracking-widest uppercase">{t.telemetryEngine}</span>
                  </div>
                  <span className="text-slate-600 text-[10px]">{t.engineVersion}</span>
                </div>

                {/* Log stream */}
                <div className="space-y-2 text-xs overflow-y-auto max-h-[180px] scrollbar-none pr-1">
                  {activeLogs.length === 0 ? (
                    <div className="text-slate-500 italic py-4">
                      {t.waitingForTriggers}
                    </div>
                  ) : (
                    activeLogs.map((log, index) => {
                      const isAlert = log.includes('[ALERT]') || log.includes('[CRITICAL ALERT]');
                      const isPass = log.includes('[PASS]');
                      const isSystem = log.includes('[SYSTEM]');
                      let color = 'text-slate-300';
                      if (isAlert) color = 'text-rose-400 font-bold';
                      else if (isPass) color = 'text-emerald-400 font-bold';
                      else if (isSystem) color = 'text-blue-400';

                      return (
                        <div key={index} className={`leading-relaxed ${color}`}>
                          {log}
                        </div>
                      );
                    })
                  )}
                  {isProcessing && (
                    <div className="text-[#3ACBE8] flex items-center gap-2 animate-pulse mt-2">
                      <span>{t.parsingDataset}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Dynamic Verdict Card */}
              {showResultCard && (
                <div className="mt-6 pt-5 border-t border-slate-800/80">
                  <div className="bg-slate-900/50 rounded-2xl border border-slate-800/80 p-5 font-sans space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                          {t.candidateRecord}
                        </span>
                        <h4 className="text-base font-bold text-white flex items-center gap-2">
                          {selectedCandidate.name}
                          <span className="text-xs font-normal text-slate-400">({selectedCandidate.role})</span>
                        </h4>
                      </div>

                      <div className="text-right">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          selectedCandidate.isFraud 
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' 
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}>
                          {selectedCandidate.isFraud ? t.riskHighRejected : t.approved}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed italic">
                      "{selectedCandidate.fraudDetails}"
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[9px] text-slate-500 uppercase block">{t.govIdExtraction}</span>
                        <span className={`text-xs font-bold ${selectedCandidate.checksResult.idCheck === 'pass' ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {selectedCandidate.checksResult.idCheck === 'pass' ? t.passed : t.suspicious}
                        </span>
                      </div>

                      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[9px] text-slate-500 uppercase block">{t.aiDeepfakeTest}</span>
                        <span className={`text-xs font-bold ${selectedCandidate.checksResult.liveness === 'pass' ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {selectedCandidate.checksResult.liveness === 'pass' ? t.passed : t.deepDtrHi}
                        </span>
                      </div>

                      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[9px] text-slate-500 uppercase block">{t.interviewMatching}</span>
                        <span className={`text-xs font-bold ${selectedCandidate.checksResult.faceMatch === 'pass' ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {selectedCandidate.checksResult.faceMatch === 'pass' ? t.matched : t.mismatch}
                        </span>
                      </div>

                      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[9px] text-slate-500 uppercase block">{t.databaseHistory}</span>
                        <span className={`text-xs font-bold ${selectedCandidate.checksResult.dbCheck === 'pass' ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {selectedCandidate.checksResult.dbCheck === 'pass' ? t.clean : t.alert}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. VERIFY WITH TOOLS YOU ALREADY USE */}
      <section className="px-6 py-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <span className="text-[11px] font-bold tracking-widest text-[#354CE1] uppercase bg-indigo-50 px-3 py-1 rounded-full">
            {t.ecosystemBadge}
          </span>
          <h2 className="text-3xl md:text-4xl font-sans font-semibold tracking-tight text-slate-900">
            {t.toolsTitle}
          </h2>
          <p className="text-slate-600 leading-relaxed text-base">
            {t.toolsDesc}
          </p>
          <div className="grid grid-cols-2 gap-4 pt-2">
            {[
              { title: t.greenhouseTitle, desc: t.greenhouseDesc },
              { title: t.workdayTitle, desc: t.workdayDesc },
              { title: t.alertsTitle, desc: t.alertsDesc },
              { title: t.apiTitle, desc: t.apiDesc }
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <h4 className="font-semibold text-slate-900 text-sm">{item.title}</h4>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Integration graphic visual */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="bg-white border border-slate-200/80 p-8 rounded-3xl shadow-xl w-full max-w-md relative overflow-hidden">
            <div className="flex justify-between items-center mb-8">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.journeySync}</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>

            <div className="relative flex flex-col items-center justify-center py-6">
              {/* Central Identra Logo mockup */}
              <div className="w-16 h-16 rounded-2xl bg-[#354CE1] flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-indigo-200 z-10">
                P
              </div>

              {/* Connected outer items */}
              <div className="absolute top-0 left-4 bg-slate-50 border border-slate-200/60 p-2.5 rounded-xl flex items-center gap-2 shadow-xs">
                <span className="font-bold text-indigo-600 text-xs">greenhouse</span>
              </div>
              <div className="absolute top-2 right-4 bg-slate-50 border border-slate-200/60 p-2.5 rounded-xl flex items-center gap-2 shadow-xs">
                <span className="font-bold text-blue-600 text-xs">workday</span>
              </div>
              <div className="absolute bottom-2 left-6 bg-slate-50 border border-slate-200/60 p-2.5 rounded-xl flex items-center gap-2 shadow-xs">
                <span className="font-bold text-slate-800 text-xs">lever</span>
              </div>
              <div className="absolute bottom-0 right-8 bg-slate-50 border border-slate-200/60 p-2.5 rounded-xl flex items-center gap-2 shadow-xs">
                <span className="font-bold text-[#E01E5A] text-xs">slack</span>
              </div>

              {/* Simple connecting dashed lines using raw SVGs */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-indigo-100 stroke-2 stroke-dasharray-[4,4]" fill="none">
                <path d="M 120 40 L 200 120" />
                <path d="M 320 40 L 220 110" />
                <path d="M 110 200 L 190 140" />
                <path d="M 300 210 L 210 150" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 6. VERIFY AT MULTIPLE CHECKPOINTS ACROSS THE LIFE CYCLE */}
      <section className="bg-gradient-to-br from-[#1E2E9A] to-[#121D63] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[11px] font-bold tracking-widest text-[#3ACBE8] uppercase bg-white/10 px-3 py-1 rounded-full">
              {t.lifecycleBadge}
            </span>
            <h2 className="text-3xl md:text-4.5xl font-sans font-semibold tracking-tight text-white">
              {t.lifecycleTitle}
            </h2>
            <p className="text-slate-300">
              {t.lifecycleDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-4 hover:bg-white/8 transition duration-200">
              <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-[#3ACBE8]">
                {t.checkpoint1Badge}
              </span>
              <h3 className="text-xl font-bold text-white">{t.checkpoint1Title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {t.checkpoint1Desc}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-4 hover:bg-white/8 transition duration-200">
              <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-[#3ACBE8]">
                {t.checkpoint2Badge}
              </span>
              <h3 className="text-xl font-bold text-white">{t.checkpoint2Title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {t.checkpoint2Desc}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-4 hover:bg-white/8 transition duration-200">
              <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-[#3ACBE8]">
                {t.checkpoint3Badge}
              </span>
              <h3 className="text-xl font-bold text-white">{t.checkpoint3Title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {t.checkpoint3Desc}
              </p>
            </div>
          </div>

          {/* Platform automation overview box */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-3 space-y-2">
                <span className="text-[10px] font-bold text-[#3ACBE8] uppercase tracking-wider block">
                  {t.workflowAutomation}
                </span>
                <h4 className="text-xl font-bold text-white">{t.platformAutomation}</h4>
              </div>
              <div className="lg:col-span-3">
                <p className="text-sm text-slate-300 leading-relaxed">
                  {t.automationDesc1}
                </p>
              </div>
              <div className="lg:col-span-3">
                <p className="text-sm text-slate-300 leading-relaxed">
                  {t.automationDesc2}
                </p>
              </div>
              <div className="lg:col-span-3">
                <p className="text-sm text-slate-300 leading-relaxed">
                  {t.automationDesc3}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. UNIFY YOUR IDENTITY STACK */}
      <section className="px-6 py-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <h2 className="text-3xl md:text-4xl font-sans font-semibold tracking-tight text-slate-900">
            {t.unifyTitle}
          </h2>
          <p className="text-slate-600 leading-relaxed">
            {t.unifyDesc}
          </p>
          
          <div className="border-t border-slate-100 pt-6">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-4">
              {t.integrationsTouchpoint}
            </span>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['Ashby', 'BambooHR', 'Fountain', 'Greenhouse', 'Workday', 'Yardstick'].map((integration) => (
                <div key={integration} className="flex items-center gap-2 p-2.5 bg-white border border-slate-200/60 rounded-xl">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span className="text-xs font-semibold text-slate-800">{integration}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={onOpenSandbox} 
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#354CE1] hover:text-[#2F44D1] transition"
            >
              {t.exploreAllIntegrations}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Integration stack visualization */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative w-full max-w-md bg-gradient-to-br from-indigo-50/50 to-blue-50/30 p-10 rounded-[2.5rem] border border-slate-100 flex items-center justify-center">
            <div className="relative w-72 h-72 rounded-full border border-slate-200/50 flex items-center justify-center">
              <div className="relative w-52 h-52 rounded-full border border-slate-200/80 flex items-center justify-center">
                <div className="relative w-32 h-32 rounded-full border border-slate-200/80 bg-white shadow-xl flex items-center justify-center z-10">
                  <div className="w-20 h-20 rounded-full bg-[#354CE1] flex items-center justify-center text-white text-3xl font-bold">
                    P
                  </div>
                </div>
              </div>
              
              {/* Orbiting integration logos icons */}
              <div className="absolute top-0 bg-white p-3 rounded-full border border-slate-100 shadow-md">
                <Cpu className="w-5 h-5 text-[#354CE1]" />
              </div>
              <div className="absolute bottom-6 left-2 bg-white p-3 rounded-full border border-slate-100 shadow-md">
                <ScanLine className="w-5 h-5 text-indigo-500" />
              </div>
              <div className="absolute bottom-6 right-2 bg-white p-3 rounded-full border border-slate-100 shadow-md">
                <Users className="w-5 h-5 text-blue-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. STOP FAKE CANDIDATES (FAQ & CAPABILITY ACCORDIONS) */}
      <section className="px-6 py-20 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-sans font-semibold tracking-tight text-slate-900">
            {t.stopFakeTitle}
          </h2>
          <p className="text-slate-500">
            {t.stopFakeDesc}
          </p>
        </div>

        <div className="max-w-4xl mx-auto border-t border-slate-200">
          {/* Accordion 1 */}
          <div className="border-b border-slate-200 py-4">
            <button
              onClick={() => setActiveAccordion(activeAccordion === 'methods' ? '' : 'methods')}
              className="w-full flex items-center justify-between text-left py-2 font-semibold text-lg text-slate-900 group"
            >
              <span>{t.acc1Title}</span>
              {activeAccordion === 'methods' ? (
                <ChevronUp className="w-5 h-5 text-slate-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-500" />
              )}
            </button>
            <AnimatePresence>
              {activeAccordion === 'methods' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 pb-2">
                    <div className="space-y-4 text-slate-600">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{t.acc1Heading1}</h4>
                        <p className="text-xs text-slate-500 mt-1">
                          {t.acc1Desc1}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{t.acc1Heading2}</h4>
                        <p className="text-xs text-slate-500 mt-1">
                          {t.acc1Desc2}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-indigo-50/50 border border-indigo-100 p-5 rounded-2xl flex items-center justify-center gap-4">
                      <div className="bg-white p-3 rounded-xl border border-indigo-200/50 shadow-xs text-center flex-1">
                        <FileText className="w-6 h-6 text-[#354CE1] mx-auto mb-1" />
                        <span className="text-[10px] font-bold text-slate-700 block">{t.idVerification}</span>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-indigo-200/50 shadow-xs text-center flex-1">
                        <Camera className="w-6 h-6 text-[#3ACBE8] mx-auto mb-1" />
                        <span className="text-[10px] font-bold text-slate-700 block">{t.selfieLiveness}</span>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-indigo-200/50 shadow-xs text-center flex-1">
                        <Database className="w-6 h-6 text-indigo-500 mx-auto mb-1" />
                        <span className="text-[10px] font-bold text-slate-700 block">{t.databaseSync}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Accordion 2 */}
          <div className="border-b border-slate-200 py-4">
            <button
              onClick={() => setActiveAccordion(activeAccordion === 'advanced' ? '' : 'advanced')}
              className="w-full flex items-center justify-between text-left py-2 font-semibold text-lg text-slate-900 group"
            >
              <span>{t.acc2Title}</span>
              {activeAccordion === 'advanced' ? (
                <ChevronUp className="w-5 h-5 text-slate-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-500" />
              )}
            </button>
            <AnimatePresence>
              {activeAccordion === 'advanced' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 pb-2 text-sm text-slate-600 space-y-4">
                    <p>
                      {t.acc2Text}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                        <h5 className="font-bold text-slate-800 text-xs mb-1">{t.deepfakeWebChecks}</h5>
                        <p className="text-[11px] text-slate-500">{t.deepfakeWebChecksDesc}</p>
                      </div>
                      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                        <h5 className="font-bold text-slate-800 text-xs mb-1">{t.passiveKeystroke}</h5>
                        <p className="text-[11px] text-slate-500">{t.passiveKeystrokeDesc}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Accordion 3 */}
          <div className="border-b border-slate-200 py-4">
            <button
              onClick={() => setActiveAccordion(activeAccordion === 'friction' ? '' : 'friction')}
              className="w-full flex items-center justify-between text-left py-2 font-semibold text-lg text-slate-900 group"
            >
              <span>{t.acc3Title}</span>
              {activeAccordion === 'friction' ? (
                <ChevronUp className="w-5 h-5 text-slate-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-500" />
              )}
            </button>
            <AnimatePresence>
              {activeAccordion === 'friction' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 pb-2 text-sm text-slate-600 space-y-4">
                    <p>
                      {t.acc3Text}
                    </p>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-semibold rounded-full text-xs">{t.onboardingCompletionRate}</span>
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-700 font-semibold rounded-full text-xs">{t.avgCheckDuration}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 9. FRAUD PATTERNS GRID */}
      <section className="px-6 py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900">
              {t.fraudStrategiesTitle}
            </h3>
            <p className="text-slate-500 text-sm">
              {t.fraudStrategiesDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: t.pattern1Title,
                desc: t.pattern1Desc
              },
              {
                title: t.pattern2Title,
                desc: t.pattern2Desc
              },
              {
                title: t.pattern3Title,
                desc: t.pattern3Desc
              },
              {
                title: t.pattern4Title,
                desc: t.pattern4Desc
              },
              {
                title: t.pattern5Title,
                desc: t.pattern5Desc
              },
              {
                title: t.pattern6Title,
                desc: t.pattern6Desc
              }
            ].map((pattern, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200/60 space-y-3 shadow-xs">
                <span className="text-[#354CE1] font-bold text-sm tracking-wider block">0{idx+1}</span>
                <h4 className="font-bold text-slate-900 text-base">{pattern.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{pattern.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. IDENTRA FOR WORKFORCE SECTION */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="bg-[#121D63] text-white rounded-[2.5rem] p-8 md:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-blue-500/10 rounded-full blur-2xl" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[10px] font-bold tracking-widest text-[#3ACBE8] uppercase bg-white/10 px-3 py-1 rounded-full">
                {t.workforceBadge}
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
                {t.workforceTitle}
              </h2>
              <p className="text-slate-300 text-base leading-relaxed font-light">
                {t.workforceDesc}
              </p>
              <div>
                <button 
                  onClick={onOpenSandbox}
                  className="bg-white text-[#354CE1] hover:bg-slate-100 font-semibold text-sm px-6 py-3 rounded-full flex items-center gap-2 transition cursor-pointer"
                >
                  {t.learnMore}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Simulated Workspace Employee Grid on Right */}
            <div className="lg:col-span-6 grid grid-cols-3 gap-3">
              {[
                { name: t.employee1Name, role: t.employee1Role, active: true, photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150' },
                { name: t.employee2Name, role: t.employee2Role, active: true, photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150' },
                { name: t.employee3Name, role: t.employee3Role, active: false, photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=150' },
                { name: t.employee4Name, role: t.employee4Role, active: true, photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150' },
                { name: t.employee5Name, role: t.employee5Role, active: true, photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150' },
                { name: t.employee6Name, role: t.employee6Role, active: true, photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150' }
              ].map((member, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-3 rounded-2xl flex flex-col items-center text-center space-y-2">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20">
                    <img src={member.photo} className="w-full h-full object-cover" alt={member.name} referrerPolicy="no-referrer" />
                    {member.active && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-slate-900" />}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-white block truncate">{member.name}</span>
                    <span className="text-[8px] text-slate-400 block truncate">{member.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 11. EXTRA EXPLORE SECTION */}
      <section className="px-6 py-12 max-w-7xl mx-auto space-y-6">
        <h3 className="text-xl font-bold text-slate-900">{t.exploreTitle}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button type="button"
            onClick={() => onViewChange && onViewChange('age-assurance')}
            className="p-8 rounded-3xl bg-indigo-50/50 hover:bg-indigo-50 border border-indigo-100 transition duration-200 cursor-pointer space-y-3"
          >
            <h4 className="font-bold text-indigo-900 text-lg">{t.exploreCard1Title}</h4>
            <p className="text-xs text-indigo-700">{t.exploreCard1Desc}</p>
          </button>
          <button type="button"
            onClick={() => onViewChange && onViewChange('database-checks')}
            className="p-8 rounded-3xl bg-blue-50/50 hover:bg-blue-50 border border-blue-100 transition duration-200 cursor-pointer space-y-3"
          >
            <h4 className="font-bold text-blue-900 text-lg">{t.exploreCard2Title}</h4>
            <p className="text-xs text-blue-700">{t.exploreCard2Desc}</p>
          </button>
        </div>
      </section>

      {/* 12. BOTTOM CALL TO ACTION */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-[2.5rem] border border-indigo-100 p-8 md:p-16 text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-sans font-semibold tracking-tight text-slate-900 leading-tight">
            {t.ctaTitle}
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-xl mx-auto">
            {t.ctaDesc}
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button 
              onClick={onOpenSandbox}
              className="bg-[#354CE1] hover:bg-[#2F44D1] text-white font-semibold text-base px-8 py-4 rounded-full shadow-lg transition duration-200 cursor-pointer"
            >
              {t.tryDemo}
            </button>

          </div>
        </div>
      </section>

    </div>
  );
}
