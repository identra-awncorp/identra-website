/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Check, AlertTriangle, ShieldCheck, 
  Cpu, ScanLine, ArrowLeft, RefreshCw, Layers, CheckCircle2, 
  Users, Globe, FileBadge, Search, Eye, AlertCircle, Sparkles,
  Camera, Lock, Smile, CheckCircle, TrendingUp, UserCheck, ShieldAlert,
  Sliders, Settings2, Activity, Shield, Laptop, Monitor, Smartphone, Award
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord, getLocalizedValue } from '../utils/i18nRuntime';
import { SELFIE_RECOGNITION_TRANSLATIONS } from '../translations/SelfieRecognitionPageTranslations';

interface SelfieRecognitionPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

interface MatchScenario {
  id: string;
  selfieUrl: string;
  idUrl: string;
  actualMatchScore: number;
  livenessType: 'genuine' | 'printedSpoof' | 'screenReplay';
}

const SCENARIOS: MatchScenario[] = [
  {
    id: 'chloe-match',
    selfieUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
    idUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300&sat=-100&contrast=110',
    actualMatchScore: 98.6,
    livenessType: 'genuine'
  },
  {
    id: 'identity-mismatch',
    selfieUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=300',
    idUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300&sat=-100&contrast=110',
    actualMatchScore: 11.4,
    livenessType: 'genuine'
  },
  {
    id: 'printed-paper-spoof',
    selfieUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    idUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&sat=-100&contrast=110',
    actualMatchScore: 96.8,
    livenessType: 'printedSpoof'
  },
  {
    id: 'digital-screen-replay',
    selfieUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
    idUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300&sat=-100&contrast=110',
    actualMatchScore: 95.2,
    livenessType: 'screenReplay'
  }
];

const formatCopy = (template: string, values: Record<string, string | number>) =>
  Object.entries(values).reduce((copy, [key, value]) => copy.replaceAll(`{${key}}`, String(value)), template);

// Helper to draw realistic biometric landmarks
const BIOMETRIC_LANDMARKS = [
  // Eyebrows
  { x: 30, y: 35 }, { x: 38, y: 32 }, { x: 46, y: 33 }, // Left eyebrow
  { x: 54, y: 33 }, { x: 62, y: 32 }, { x: 70, y: 35 }, // Right eyebrow
  // Eyes
  { x: 35, y: 42 }, { x: 41, y: 41 }, { x: 45, y: 43 }, // Left eye
  { x: 55, y: 43 }, { x: 59, y: 41 }, { x: 65, y: 42 }, // Right eye
  // Nose
  { x: 50, y: 45 }, { x: 48, y: 52 }, { x: 50, y: 58 }, { x: 52, y: 52 }, // Nose bridge & tip
  { x: 45, y: 56 }, { x: 55, y: 56 }, // Nostrils
  // Mouth
  { x: 38, y: 68 }, { x: 44, y: 65 }, { x: 50, y: 66 }, { x: 56, y: 65 }, { x: 62, y: 68 }, // Upper lip
  { x: 40, y: 70 }, { x: 50, y: 72 }, { x: 60, y: 70 }, // Lower lip
  // Jawline
  { x: 22, y: 45 }, { x: 24, y: 55 }, { x: 28, y: 65 }, { x: 35, y: 75 }, 
  { x: 50, y: 82 }, 
  { x: 65, y: 75 }, { x: 72, y: 65 }, { x: 76, y: 55 }, { x: 78, y: 45 } // Jaw contour
];

const BIOMETRIC_LINES = [
  // Connect eyebrows
  [0, 1], [1, 2], [3, 4], [4, 5],
  // Connect eyes
  [6, 7], [7, 8], [8, 6],
  [9, 10], [10, 11], [11, 9],
  // Connect Nose
  [12, 13], [13, 14], [14, 16], [14, 17],
  // Connect Mouth
  [18, 19], [19, 20], [20, 21], [21, 22], [22, 25], [25, 24], [24, 23], [23, 18],
  // Connect Jawline
  [26, 27], [27, 28], [28, 29], [29, 30], [30, 31], [31, 32], [32, 33], [33, 34],
  // Connect key features to nose center
  [7, 12], [10, 12], [12, 20], [14, 20], [26, 6], [34, 11]
];

const PERFORMANCE_CARD_ICONS = [Award, Globe, ShieldAlert, Sliders, TrendingUp, Activity];
const EXPLANATION_CARD_ICONS = [UserCheck, Activity, Shield];
const CERTIFICATION_LABEL_CLASSES = [
  'text-[#1cb080] bg-emerald-50',
  'text-[#1cb080] bg-emerald-50',
  'text-blue-600 bg-blue-50 font-mono',
  'text-slate-700 bg-slate-100',
  'text-purple-600 bg-purple-50',
  'text-[#354CE1] bg-indigo-50 font-bold'
];
const EXPLORE_CARD_CLASSES = [
  'from-[#1cb080] to-[#148e64]',
  'from-[#354CE1] to-[#2031a0]'
];
const EXPLORE_CARD_TARGETS = ['selfie-age-estimation', 'dynamic-flow'] as const;

export default function SelfieRecognitionPage({ onOpenSandbox, onBackToLanding, onViewChange }: SelfieRecognitionPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(SELFIE_RECOGNITION_TRANSLATIONS, language as keyof typeof SELFIE_RECOGNITION_TRANSLATIONS, 'SELFIE_RECOGNITION_TRANSLATIONS');
  const getScenarioCopy = (scenario: MatchScenario) =>
    getLocalizedValue(t.scenarios, scenario.id, language, 'SELFIE_RECOGNITION_TRANSLATIONS.scenarios');
  const getLivenessLabel = (livenessType: MatchScenario['livenessType']) =>
    getLocalizedValue(t.livenessTypes, livenessType, language, 'SELFIE_RECOGNITION_TRANSLATIONS.livenessTypes');

  const [selectedScenario, setSelectedScenario] = useState<MatchScenario>(SCENARIOS[0]);
  const [isMatching, setIsMatching] = useState(false);
  const [matchProgress, setMatchProgress] = useState(0);
  const [matchComplete, setMatchComplete] = useState(true);

  // User-controlled parameters
  const [similarityThreshold, setSimilarityThreshold] = useState<number>(80);
  const [requireStrictLiveness, setRequireStrictLiveness] = useState<boolean>(true);
  const [showBiometricMesh, setShowBiometricMesh] = useState<boolean>(true);

  // Active FAQ accordion state
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const selectedScenarioCopy = getScenarioCopy(selectedScenario);

  // Run the biometric match calculation simulator
  const runVerification = (scenario: MatchScenario) => {
    setSelectedScenario(scenario);
    setIsMatching(true);
    setMatchComplete(false);
    setMatchProgress(0);
  };

  useEffect(() => {
    if (isMatching) {
      const interval = setInterval(() => {
        setMatchProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsMatching(false);
            setMatchComplete(true);
            return 100;
          }
          return prev + 5;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isMatching]);

  // Determine the final decision based on selected scenario and user options
  const getDecision = () => {
    if (!matchComplete) {
      return { status: 'ANALYZING', message: t.decisionAnalyzing, color: 'text-amber-500 bg-amber-50 border-amber-100' };
    }

    const isLivenessFail = requireStrictLiveness && selectedScenario.livenessType !== 'genuine';
    const isScoreBelowThreshold = selectedScenario.actualMatchScore < similarityThreshold;

    if (isLivenessFail) {
      return { 
        status: 'FAILED', 
        message: formatCopy(t.decisionLivenessFailed, { type: getLivenessLabel(selectedScenario.livenessType) }),
        color: 'text-red-600 bg-red-50 border-red-100',
        reason: selectedScenarioCopy.livenessDetails
      };
    }

    if (isScoreBelowThreshold) {
      return { 
        status: 'FAILED', 
        message: formatCopy(t.decisionMismatch, { score: selectedScenario.actualMatchScore, threshold: similarityThreshold }),
        color: 'text-red-600 bg-red-50 border-red-100',
        reason: t.decisionMismatchReason
      };
    }

    return { 
      status: 'APPROVED', 
      message: t.decisionApproved,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-100',
      reason: formatCopy(t.decisionApprovedReason, { score: selectedScenario.actualMatchScore, threshold: similarityThreshold })
    };
  };

  const decision = getDecision();
  const decisionStatusLabel = t.statusLabels[decision.status] || decision.status;

  return (
    <div className="bg-[#FAFBFD] min-h-screen py-10 px-4 md:px-8">
      {/* Back navigation button */}
      <div className="max-w-7xl mx-auto mb-6">
        <button
          onClick={onBackToLanding}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#354CE1] transition group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {t.backToHome}
        </button>
      </div>

      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#1cb080] to-[#128a62] rounded-[2.5rem] p-8 md:p-16 text-white shadow-xl flex flex-col justify-between min-h-[480px]">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-[320px] h-[320px] bg-emerald-400/20 rounded-full blur-2xl translate-y-1/3 pointer-events-none" />

          {/* Top Tag */}
          <div className="relative z-10 flex items-center gap-2 mb-8 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full w-fit border border-white/10 text-xs font-semibold tracking-wide">
            <Smile className="w-4 h-4 text-emerald-100 animate-pulse" />
            <span>{t.tag}</span>
          </div>

          {/* Title & Headline */}
          <div className="relative z-10 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6 leading-[1.1]">
              {t.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-emerald-50/95 font-light mb-8 max-w-3xl leading-relaxed">
              {t.heroDesc}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="relative z-10 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenSandbox}
              className="bg-white hover:bg-emerald-50 text-slate-950 font-bold px-8 py-4 rounded-full shadow-lg transition flex items-center gap-2 group text-sm"
            >
              {t.getDemo}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#sandbox"
              className="text-white hover:text-emerald-100 font-semibold text-sm transition underline underline-offset-4 decoration-2"
            >
              {t.tryInteractiveMatcher}
            </a>
          </div>

          {/* Hero pillars footer */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 mt-12 border-t border-white/10">
            {t.heroPillars.map((pillar: any) => (
              <div key={pillar.title}>
                <h3 className="font-bold text-base mb-1.5 text-white">{pillar.title}</h3>
                <p className="text-xs text-emerald-100/90 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PILLARS GRID */}
      <section className="max-w-7xl mx-auto mb-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#354CE1] font-semibold text-xs uppercase tracking-wider block mb-2">{t.performanceLabel}</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight">
            {t.performanceTitle}
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            {t.performanceDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.performanceCards.map((card: any, index: number) => {
            const Icon = PERFORMANCE_CARD_ICONS[index];
            return (
              <div key={card.title} className="bg-white p-8 rounded-3xl border border-slate-150/80 shadow-xs hover:shadow-md transition duration-200">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-[#1cb080] mb-5">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{card.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* THIRD PARTY TESTING SECTION */}
      <section className="bg-emerald-50/50 py-20 px-6 rounded-[3rem] max-w-7xl mx-auto mb-24 border border-emerald-100/60">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight">
            {t.thirdPartyTitle}
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            {t.thirdPartyDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.certifications.map((cert: any, index: number) => (
            <div key={cert.title} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <span className={['text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-md uppercase', CERTIFICATION_LABEL_CLASSES[index]].join(' ')}>
                  {cert.label}
                </span>
                <span className="font-mono text-slate-300 text-xs">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-2">{cert.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{cert.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CORE FEATURES & DYNAMIC INTERACTIVE SIMULATOR */}
      <section id="sandbox" className="max-w-7xl mx-auto mb-28">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#354CE1] font-semibold text-xs uppercase tracking-wider block mb-2">{t.interactiveLabel}</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight">
            {t.simulatorTitle}
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            {t.simulatorDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-150/80 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Settings2 className="w-4 h-4 text-[#354CE1]" />
                {t.selectScenario}
              </h3>

              <div className="space-y-2.5">
                {SCENARIOS.map((scen) => {
                  const scenCopy = getScenarioCopy(scen);
                  return (
                    <button
                      key={scen.id}
                      onClick={() => runVerification(scen)}
                      className={[
                        'w-full text-left p-3.5 rounded-2xl border text-xs font-semibold flex items-center justify-between transition',
                        selectedScenario.id === scen.id
                          ? 'border-[#354CE1] bg-[#354CE1]/5 text-slate-900 shadow-xs'
                          : 'border-slate-200/80 text-slate-600 hover:bg-slate-50'
                      ].join(' ')}
                    >
                      <div>
                        <p className="font-bold">{scenCopy.name}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5 font-light">{scenCopy.subtitle}</p>
                      </div>
                      {selectedScenario.id === scen.id ? (
                        <span className="w-2 h-2 rounded-full bg-[#354CE1] animate-ping shrink-0" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-150/80 shadow-xs space-y-5">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <Sliders className="w-4 h-4 text-[#354CE1]" />
                {t.systemParameters}
              </h3>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>{t.thresholdLabel}</span>
                  <span className="text-[#354CE1] bg-[#354CE1]/10 px-2 py-0.5 rounded-md">{similarityThreshold}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="98"
                  value={similarityThreshold}
                  onChange={(e) => setSimilarityThreshold(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#354CE1]"
                />
                <p className="text-[10px] text-slate-400 leading-normal">{t.thresholdDesc}</p>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-700">{t.strictLivenessLabel}</p>
                  <p className="text-[10px] text-slate-400 max-w-[220px]">{t.strictLivenessDesc}</p>
                </div>
                <button
                  onClick={() => setRequireStrictLiveness(!requireStrictLiveness)}
                  className={[
                    'w-11 h-6 rounded-full transition-colors relative shrink-0',
                    requireStrictLiveness ? 'bg-[#354CE1]' : 'bg-slate-200'
                  ].join(' ')}
                >
                  <span className={[
                    'absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full shadow-md transition-transform',
                    requireStrictLiveness ? 'translate-x-5' : 'translate-x-0'
                  ].join(' ')} />
                </button>
              </div>

              <div className="flex items-center justify-between py-2 border-t border-slate-100 pt-3">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-700">{t.meshLabel}</p>
                  <p className="text-[10px] text-slate-400 max-w-[220px]">{t.meshDesc}</p>
                </div>
                <button
                  onClick={() => setShowBiometricMesh(!showBiometricMesh)}
                  className={[
                    'w-11 h-6 rounded-full transition-colors relative shrink-0',
                    showBiometricMesh ? 'bg-[#354CE1]' : 'bg-slate-200'
                  ].join(' ')}
                >
                  <span className={[
                    'absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full shadow-md transition-transform',
                    showBiometricMesh ? 'translate-x-5' : 'translate-x-0'
                  ].join(' ')} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-[#354CE1]/5 rounded-2xl border border-[#354CE1]/10">
                <h4 className="text-xs font-bold text-slate-900 mb-1">{t.complianceTitle}</h4>
                <p className="text-[11px] text-slate-500 leading-normal">{t.complianceDesc}</p>
              </div>
              <div className="p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                <h4 className="text-xs font-bold text-slate-900 mb-1">{t.uxTitle}</h4>
                <p className="text-[11px] text-slate-500 leading-normal">{t.uxDesc}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900 text-white rounded-[2.5rem] p-6 md:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#354CE1]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6 relative z-10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">{t.matcherModule}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1 rounded-full text-[10px] font-mono text-slate-300">
                <Activity className="w-3.5 h-3.5 text-[#1cb080]" />
                <span>{t.engineStatus}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 relative z-10">
              <div className="bg-slate-950 p-4 rounded-3xl border border-slate-800 flex flex-col items-center">
                <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase mb-2 block self-start">{t.scannedIdPortrait}</span>

                <div className="relative w-full aspect-square max-w-[200px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
                  <img
                    src={selectedScenario.idUrl}
                    alt={t.idPhotoAlt}
                    className="w-full h-full object-cover grayscale brightness-90 filter"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-indigo-500/10 pointer-events-none" />
                  <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md bg-slate-950/80 border border-slate-700 text-[8px] font-mono text-slate-400 uppercase">
                    {selectedScenarioCopy.idType}
                  </div>
                  <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-emerald-500/20 text-[8px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                    {t.scanned}
                  </div>
                </div>

                <div className="w-full mt-3 space-y-1 font-mono text-[10px] text-slate-400">
                  <div className="flex justify-between">
                    <span>{t.documentLabel}</span>
                    <span className="text-white">{selectedScenarioCopy.idType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.jurisdictionLabel}</span>
                    <span className="text-white">{selectedScenarioCopy.country}</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-3xl border border-slate-800 flex flex-col items-center relative">
                <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase mb-2 block self-start">{t.liveSelfie}</span>

                <div className="relative w-full aspect-square max-w-[200px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
                  <img
                    src={selectedScenario.selfieUrl}
                    alt={t.selfieAlt}
                    className={[
                      'w-full h-full object-cover transition-all',
                      isMatching ? 'blur-xs animate-pulse' : '',
                      selectedScenario.livenessType === 'screenReplay' ? 'hue-rotate-15 contrast-125' : ''
                    ].join(' ')}
                    referrerPolicy="no-referrer"
                  />

                  {selectedScenario.livenessType === 'screenReplay' && (
                    <div className="absolute inset-0 bg-radial-gradient from-transparent to-blue-500/10 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,_rgba(255,0,0,0.06),_rgba(0,255,0,0.02),_rgba(0,0,255,0.06))] bg-[size:100%_4px,_6px_100%] opacity-80" />
                  )}

                  {selectedScenario.livenessType === 'printedSpoof' && (
                    <div className="absolute inset-2 border-4 border-dashed border-white/60 pointer-events-none rounded shadow-2xl bg-white/5" />
                  )}

                  {showBiometricMesh && matchComplete && !isMatching && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                      {BIOMETRIC_LINES.map(([p1, p2], i) => {
                        const pt1 = BIOMETRIC_LANDMARKS[p1];
                        const pt2 = BIOMETRIC_LANDMARKS[p2];
                        return (
                          <line
                            key={'l-' + i}
                            x1={pt1.x}
                            y1={pt1.y}
                            x2={pt2.x}
                            y2={pt2.y}
                            stroke={selectedScenario.livenessType !== 'genuine' && requireStrictLiveness ? '#f87171' : '#10b981'}
                            strokeWidth="0.4"
                            strokeOpacity="0.85"
                          />
                        );
                      })}
                      {BIOMETRIC_LANDMARKS.map((pt, i) => (
                        <circle
                          key={'pt-' + i}
                          cx={pt.x}
                          cy={pt.y}
                          r="0.8"
                          fill={selectedScenario.livenessType !== 'genuine' && requireStrictLiveness ? '#ef4444' : '#34d399'}
                          className="animate-pulse"
                        />
                      ))}
                    </svg>
                  )}

                  {isMatching && (
                    <div className="absolute left-0 right-0 h-0.5 bg-emerald-400 shadow-[0_0_12px_#34d399] animate-bounce" style={{ top: matchProgress + '%' }} />
                  )}

                  <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-slate-950/80 text-[8px] font-mono text-slate-300">
                    {isMatching ? t.recording : t.captured}
                  </div>
                </div>

                <div className="w-full mt-3 space-y-1 font-mono text-[10px] text-slate-400">
                  <div className="flex justify-between">
                    <span>{t.livenessTypeLabel}</span>
                    <span className={selectedScenario.livenessType === 'genuine' ? 'text-emerald-400' : 'text-red-400'}>
                      {getLivenessLabel(selectedScenario.livenessType)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.scanResultLabel}</span>
                    <span className="text-white">{formatCopy(t.landmarksVerified, { count: BIOMETRIC_LANDMARKS.length })}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4 relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider">{t.facialSimilarityScore}</h4>
                  {isMatching ? (
                    <p className="text-3xl font-mono font-bold text-slate-300 animate-pulse">{t.calculating}</p>
                  ) : (
                    <div className="flex items-baseline gap-2">
                      <p className="text-4xl font-mono font-bold text-[#1cb080]">
                        {selectedScenario.actualMatchScore}%
                      </p>
                      <span className="text-[11px] font-mono text-slate-500">{t.similarity}</span>
                    </div>
                  )}
                </div>

                <div className="shrink-0">
                  {isMatching ? (
                    <div className="flex items-center gap-3">
                      <RefreshCw className="w-5 h-5 text-emerald-400 animate-spin" />
                      <div className="font-mono text-xs">
                        <p className="font-bold">{t.analyzingVectors}</p>
                        <p className="text-[10px] text-slate-500">{formatCopy(t.progressComplete, { progress: matchProgress })}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className={['w-3 h-3 rounded-full', decision.status === 'APPROVED' ? 'bg-emerald-500' : 'bg-red-500'].join(' ')} />
                      <span className="text-xs font-mono font-bold uppercase">{decisionStatusLabel}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className={['p-4 rounded-2xl border text-xs leading-relaxed font-mono', decision.color].join(' ')}>
                <div className="flex items-start gap-2.5">
                  {decision.status === 'APPROVED' ? (
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : decision.status === 'FAILED' ? (
                    <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  ) : (
                    <Activity className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-bold">{decision.message}</p>
                    {decision.reason && <p className="text-[10px] mt-1 text-slate-500 leading-normal">{decision.reason}</p>}
                  </div>
                </div>
              </div>

              <button
                disabled={isMatching}
                onClick={() => runVerification(selectedScenario)}
                className="w-full bg-[#354CE1] hover:bg-[#354CE1]/90 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-2xl text-xs transition font-mono flex items-center justify-center gap-2"
              >
                <RefreshCw className={['w-4 h-4', isMatching ? 'animate-spin' : ''].join(' ')} />
                {t.recalculate}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* THREE EXPLANATION COLUMNS */}
      <section className="max-w-7xl mx-auto mb-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        {t.explanationCards.map((card: any, index: number) => {
          const Icon = EXPLANATION_CARD_ICONS[index];
          return (
            <div key={card.title} className="bg-white p-8 rounded-3xl border border-slate-150/80 shadow-xs">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-[#1cb080] mb-5">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{card.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
            </div>
          );
        })}
      </section>

      {/* EXPLORE MORE LINKS */}
      <section className="max-w-7xl mx-auto mb-24">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-8">
          {t.exploreMoreTitle}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.exploreCards.map((card: any, index: number) => (
            <button
              key={card.title}
              onClick={() => { if (onViewChange) onViewChange(EXPLORE_CARD_TARGETS[index]); }}
              className={['group text-left relative overflow-hidden bg-gradient-to-br rounded-[2rem] p-8 text-white shadow-md hover:shadow-lg transition duration-200 flex flex-col justify-between min-h-[160px]', EXPLORE_CARD_CLASSES[index]].join(' ')}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl translate-x-1/4 -translate-y-1/4" />
              <h4 className="text-2xl font-bold leading-tight max-w-sm relative z-10">
                {card.title}
              </h4>
              <div className="flex items-center gap-2 text-xs font-semibold mt-4 group-hover:translate-x-1 transition-transform">
                <span>{card.link}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-3xl mx-auto mb-24 bg-white rounded-3xl p-8 border border-slate-150/80 shadow-xs">
        <h3 className="text-xl font-bold text-slate-900 mb-6 tracking-tight text-center">{t.faqTitle}</h3>
        <div className="space-y-4">
          {t.faqs.map((faq: any, index: number) => (
            <div key={faq.q} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full text-left py-2 flex items-center justify-between text-slate-900 font-semibold text-sm hover:text-[#354CE1] transition"
              >
                <span>{faq.q}</span>
                <span className="text-xs text-slate-400 font-mono ml-4 shrink-0">{activeFaq === index ? '-' : '+'}</span>
              </button>
              {activeFaq === index && (
                <p className="text-xs text-slate-500 mt-2 leading-relaxed bg-slate-50 p-3 rounded-xl">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* READY TO GET STARTED / FOOTER HERO */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="bg-[#5B6DFF] rounded-[2.5rem] p-8 md:p-12 text-white text-center flex flex-col items-center justify-center space-y-6 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <h2 className="text-3xl md:text-4xl font-display font-bold max-w-xl">{t.readyTitle}</h2>
          <p className="text-sm md:text-base text-indigo-50 max-w-lg font-light leading-relaxed">
            {t.readyDesc}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenSandbox}
              className="bg-white hover:bg-slate-50 text-slate-900 font-bold px-8 py-3.5 rounded-full shadow-md text-xs transition"
            >
              {t.getDemo}
            </button>
            <button
              onClick={onOpenSandbox}
              className="border border-white/30 hover:border-white text-white font-bold px-8 py-3.5 rounded-full text-xs transition"
            >
              {t.tryItNow}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
