/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord, getLocalizedValue } from '../utils/i18nRuntime';
import { SELFIE_AGE_ESTIMATION_TRANSLATIONS } from '../translations/SelfieAgeEstimationPageTranslations';
import { 
  ArrowRight, Check, AlertTriangle, ShieldCheck, 
  Cpu, ScanLine, ArrowLeft, RefreshCw, Layers, CheckCircle2, 
  Users, Globe, FileBadge, Search, Eye, AlertCircle, Sparkles,
  Camera, Lock, Smile, Calendar, Trash2, Smartphone, ShieldAlert, BookOpen
} from 'lucide-react';

interface SelfieAgeEstimationPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

// Sample avatars for the simulator
interface AvatarOption {
  id: string;
  gender: 'Female' | 'Male' | 'Non-binary';
  actualAge: number;
  estimatedAgeRange: [number, number]; // [mean, error]
  imageUrl: string;
  isSpoof: boolean;
  skinTone: 'Fair' | 'Medium' | 'Deep';
}

const AVATAR_OPTIONS: AvatarOption[] = [
  {
    id: 'user-1',
    gender: 'Female',
    actualAge: 25,
    estimatedAgeRange: [24.4, 0.6],
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    isSpoof: false,
    skinTone: 'Medium'
  },
  {
    id: 'user-2',
    gender: 'Male',
    actualAge: 19,
    estimatedAgeRange: [18.7, 0.8],
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    isSpoof: false,
    skinTone: 'Fair'
  },
  {
    id: 'user-3',
    gender: 'Female',
    actualAge: 32,
    estimatedAgeRange: [31.5, 0.5],
    imageUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200',
    isSpoof: false,
    skinTone: 'Deep'
  },
  {
    id: 'user-4',
    gender: 'Male',
    actualAge: 22,
    estimatedAgeRange: [22.1, 1.2],
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    isSpoof: true,
    skinTone: 'Fair'
  },
  {
    id: 'user-5',
    gender: 'Female',
    actualAge: 28,
    estimatedAgeRange: [27.8, 1.5],
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
    isSpoof: true,
    skinTone: 'Medium'
  }
];


export default function SelfieAgeEstimationPage({ onOpenSandbox, onBackToLanding, onViewChange }: SelfieAgeEstimationPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(SELFIE_AGE_ESTIMATION_TRANSLATIONS, language as keyof typeof SELFIE_AGE_ESTIMATION_TRANSLATIONS, 'SELFIE_AGE_ESTIMATION_TRANSLATIONS');
  const getAvatarCopy = (avatar: AvatarOption) => getLocalizedValue(t.avatars, avatar.id, language, 'SELFIE_AGE_ESTIMATION_TRANSLATIONS.avatars');
  const getSkinTone = (skinTone: AvatarOption['skinTone']) => t.skinTones[skinTone] || skinTone;
  // Simulator State
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarOption>(AVATAR_OPTIONS[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(true);
  
  // Controls
  const [ageThreshold, setAgeThreshold] = useState<number>(21);
  const [redactData, setRedactData] = useState<boolean>(true);
  const [isRedacted, setIsRedacted] = useState<boolean>(false);

  // Accordion State
  const [expandedAccordion, setExpandedAccordion] = useState<number | null>(0);

  // Articles Modal/Drawer State
  const [activeArticle, setActiveArticle] = useState<any | null>(null);

  // Run Simulator Scan
  const triggerScan = (avatar: AvatarOption) => {
    setSelectedAvatar(avatar);
    setIsScanning(true);
    setScanComplete(false);
    setIsRedacted(false);
    setScanProgress(0);
  };

  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsScanning(false);
            setScanComplete(true);
            
            // If redaction is active, perform redaction animation slightly after completion
            if (redactData) {
              setTimeout(() => {
                setIsRedacted(true);
              }, 1200);
            }
            return 100;
          }
          return prev + 4;
        });
      }, 60);
      return () => clearInterval(interval);
    }
  }, [isScanning, redactData]);

  const toggleAccordion = (index: number) => {
    setExpandedAccordion(prev => (prev === index ? null : index));
  };

  const getVerdict = () => {
    if (selectedAvatar.isSpoof) {
      return { status: 'FAILED', text: t.spoofDetected, color: 'bg-red-500 text-white border-red-600' };
    }
    const estimatedAge = selectedAvatar.estimatedAgeRange[0];
    if (estimatedAge >= ageThreshold) {
      return { status: 'APPROVED', text: t.meetsThreshold, color: 'bg-emerald-500 text-white border-emerald-600' };
    } else {
      return { status: 'STEP_UP', text: t.stepUp, color: 'bg-amber-500 text-white border-amber-600' };
    }
  };

  const verdict = getVerdict();

  const articles = t.articles;

  return (
    <div className="bg-[#FAFBFD] min-h-screen py-10 px-4 md:px-8">
      {/* Back Button */}
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

          {/* Tag */}
          <div className="relative z-10 flex items-center gap-2 mb-8 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full w-fit border border-white/10 text-xs font-semibold tracking-wide">
            <Smile className="w-4 h-4 text-emerald-100 animate-pulse" />
            <span>{t.tag}</span>
          </div>

          {/* Title & Description */}
          <div className="relative z-10 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6 leading-[1.1]">
              {t.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-emerald-50/95 font-light mb-8 max-w-2xl leading-relaxed">
              {t.heroDesc}
            </p>
          </div>

          {/* Button CTA */}
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
              {t.tryInteractiveSimulator}
            </a>
          </div>

          {/* Three pillars below (Hero Pillars) */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 mt-12 border-t border-white/10">
            <div>
              <h3 className="font-bold text-base mb-1.5 text-white">{t.apart3Title}</h3>
              <p className="text-xs text-emerald-100/90 leading-relaxed">
                {t.heroAccuracyDesc}
              </p>
            </div>
            <div>
              <h3 className="font-bold text-base mb-1.5 text-white">{t.feat3Title}</h3>
              <p className="text-xs text-emerald-100/90 leading-relaxed">
                {t.heroComplianceDesc}
              </p>
            </div>
            <div>
              <h3 className="font-bold text-base mb-1.5 text-white">{t.feat4Title}</h3>
              <p className="text-xs text-emerald-100/90 leading-relaxed">
                {t.heroPrivacyDesc}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS SECTION */}
      <section className="max-w-7xl mx-auto mb-28">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#354CE1] font-semibold text-xs uppercase tracking-wider block mb-2">{t.interactiveSimulator}</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight">
            {t.howItWorks}
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            {t.howItWorksDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative flex flex-col justify-between">
            <div className="absolute -top-4 left-8 bg-[#1cb080] text-white font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-md">
              1
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 mt-2">{t.step1Title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                {t.step1Desc}
              </p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-center border border-slate-200/50">
              <div className="relative w-28 h-28 rounded-full border-4 border-dashed border-[#1cb080]/60 flex items-center justify-center overflow-hidden">
                <Camera className="w-8 h-8 text-[#1cb080]" />
                <div className="absolute inset-0 bg-[#1cb080]/5 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative flex flex-col justify-between">
            <div className="absolute -top-4 left-8 bg-[#1cb080] text-white font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-md">
              2
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 mt-2">{t.step2Title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                {t.step2Desc}
              </p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-center border border-slate-200/50">
              <div className="space-y-2 w-full text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-700 font-bold bg-white px-3 py-1.5 rounded-full border border-slate-200 w-fit mx-auto">
                  <Cpu className="w-3.5 h-3.5 text-[#1cb080]" />
                  <span>{t.scanningFace}</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full w-full overflow-hidden">
                  <div className="bg-[#1cb080] h-full w-2/3 animate-pulse rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative flex flex-col justify-between">
            <div className="absolute -top-4 left-8 bg-[#1cb080] text-white font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-md">
              3
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 mt-2">{t.step3Title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                {t.step3Desc}
              </p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-center border border-slate-200/50">
              <div className="space-y-2 w-full">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <span>{t.privacyFilter}</span>
                  <span className="text-[#1cb080]">{t.apart1Title}</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-500">{t.biometricPhoto}</span>
                  <span className="text-red-500 flex items-center gap-1 text-[10px] uppercase font-bold bg-red-50 px-2 py-0.5 rounded">
                    <Trash2 className="w-3 h-3" /> {t.purged}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* INTERACTIVE SIMULATOR CARD */}
        <div id="sandbox" className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px] scroll-mt-6">
          {/* Left panel: Avatar picker & threshold sliders (span 4) */}
          <div className="lg:col-span-4 p-6 md:p-8 bg-slate-50/80 border-r border-slate-100 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                {t.selectTestCandidate}
              </h3>

              {/* Grid of Avatars */}
              <div className="space-y-2.5 mb-6">
                {AVATAR_OPTIONS.map((avatar) => {
                  const isSelected = selectedAvatar.id === avatar.id;
                  return (
                    <button
                      key={avatar.id}
                      onClick={() => triggerScan(avatar)}
                      disabled={isScanning}
                      className={`w-full text-left p-3 rounded-2xl border transition duration-200 flex items-center justify-between ${
                        isSelected 
                          ? 'bg-white border-[#1cb080] shadow-md ring-2 ring-[#1cb080]/10' 
                          : 'bg-white/60 hover:bg-white border-slate-200'
                      } ${isScanning ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={avatar.imageUrl} 
                          alt={getAvatarCopy(avatar).name} 
                          className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="text-xs font-bold text-slate-800">{getAvatarCopy(avatar).name}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            {avatar.isSpoof ? t.simulatedAttack : `${t.ageLabel}: ${avatar.actualAge}`} • {t.skinLabel}: {getSkinTone(avatar.skinTone)}
                          </p>
                        </div>
                      </div>
                      <div>
                        {avatar.isSpoof ? (
                          <span className="text-[8px] font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-full border border-red-200 uppercase tracking-wide flex items-center gap-1 shrink-0">
                            <ShieldAlert className="w-2.5 h-2.5" /> {t.spoofLabel}
                          </span>
                        ) : (
                          <span className="text-[8px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200 uppercase tracking-wide shrink-0">
                            {t.genuineLabel}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Threshold Adjuster */}
              <div className="space-y-4 pt-4 border-t border-slate-200/60 mb-6">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">{t.ageThresholdLabel}</span>
                  <span className="text-slate-800 font-black text-sm bg-[#1cb080]/10 px-2 py-0.5 rounded text-[#1cb080]">
                    {ageThreshold}+
                  </span>
                </div>
                <input 
                  type="range" 
                  min={16} 
                  max={25} 
                  value={ageThreshold} 
                  disabled={isScanning}
                  onChange={(e) => setAgeThreshold(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1cb080] disabled:opacity-50"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>{t.age16}</span>
                  <span>{t.age21}</span>
                  <span>{t.age25}</span>
                </div>
              </div>

              {/* Privacy settings */}
              <div className="space-y-3 pt-4 border-t border-slate-200/60">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-[#1cb080]" />
                    <span className="text-xs font-bold text-slate-700">{t.redactLabel}</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={redactData}
                    disabled={isScanning}
                    onChange={(e) => setRedactData(e.target.checked)}
                    className="w-4 h-4 text-[#1cb080] border-slate-300 rounded focus:ring-[#1cb080] accent-[#1cb080]"
                  />
                </div>
                <p className="text-[10px] text-slate-400 leading-normal">
                  {t.privacySettingsDesc}
                </p>
              </div>
            </div>

            {/* Re-estimate button */}
            <div className="mt-8 pt-4 border-t border-slate-200/60">
              <button
                onClick={() => triggerScan(selectedAvatar)}
                disabled={isScanning}
                className="w-full bg-[#1cb080] hover:bg-[#158762] text-white font-bold py-3 px-4 rounded-xl shadow-md transition duration-200 flex items-center justify-center gap-2 text-xs"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    {t.scanningFace}
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    {t.estimateAgeNow}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right panel: Active face scanning visualization and decision indicators (span 8) */}
          <div className="lg:col-span-8 p-6 md:p-8 bg-slate-100/50 flex flex-col md:flex-row gap-6 relative">
            
            {/* Realtime Scan Preview */}
            <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-md p-6 relative overflow-hidden flex flex-col justify-between min-h-[400px]">
              {/* Scan Line Overlay */}
              {isScanning && (
                <div 
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#1cb080] to-transparent shadow-[0_0_12px_#1cb080] z-20"
                  style={{
                    top: `${scanProgress}%`,
                    transition: 'top 0.06s linear'
                  }}
                />
              )}

              {/* Avatar face view */}
              <div className="relative flex-1 flex flex-col items-center justify-center py-6">
                <div className="relative">
                  {/* Outer biometric alignment ring */}
                  <div className={`w-36 h-36 rounded-full border-2 border-dashed flex items-center justify-center p-1.5 transition-all duration-300 ${
                    isScanning ? 'border-amber-400 animate-spin' : scanComplete ? (selectedAvatar.isSpoof ? 'border-red-500' : 'border-emerald-500') : 'border-slate-300'
                  }`}>
                    <img 
                      src={selectedAvatar.imageUrl} 
                      alt={t.activeCaptureAlt} 
                      className={`w-full h-full rounded-full object-cover transition-all duration-500 ${
                        isRedacted ? 'blur-2xl opacity-45' : 'blur-0 opacity-100'
                      }`}
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Redacted Stamp */}
                  {isRedacted && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-red-600/90 text-white font-extrabold text-[10px] tracking-widest uppercase py-1 px-2.5 rounded-md shadow-md border border-white/20 select-none rotate-12">
                        {t.purgedRedacted}
                      </span>
                    </div>
                  )}

                  {/* Corner face scanning vectors */}
                  <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[#1cb080]" />
                  <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-[#1cb080]" />
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-[#1cb080]" />
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[#1cb080]" />
                </div>

                <div className="mt-4 text-center">
                  <p className="text-xs font-bold text-slate-800">
                    {isScanning ? t.autoCapturingFrames : scanComplete ? (isRedacted ? t.faceRecordPurged : t.analysisFrameFrozen) : t.readyForScan}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {isScanning ? t.aligningFaceLandmarks : t.cameraLabel}
                  </p>
                </div>
              </div>

              {/* Footer specs */}
              <div className="border-t border-slate-100 pt-3 flex justify-between items-center text-[9px] text-slate-400 font-mono">
                <span>{t.modelDesc}</span>
                <span>{t.biometricLockActive}</span>
              </div>
            </div>

            {/* Results Sidebar panel */}
            <div className="w-full md:w-60 bg-white p-5 rounded-3xl border border-slate-200 flex flex-col justify-between">
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                  {t.analysisPipeline}
                </h4>

                {isScanning ? (
                  <div className="space-y-4 py-6">
                    <div className="h-3 bg-slate-100 rounded animate-pulse" />
                    <div className="h-3 bg-slate-100 rounded animate-pulse" />
                    <div className="h-3 bg-slate-100 rounded animate-pulse" />
                    <div className="h-3 bg-slate-100 rounded animate-pulse" />
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {/* Selfie Age Estimation */}
                    <div className="border-b border-slate-100 pb-2.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500 font-semibold">{t.tag}</span>
                        <span className="font-bold text-slate-800">
                          {isRedacted ? t.redacted : `${selectedAvatar.estimatedAgeRange[0]} ${t.yearsShort}`}
                        </span>
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                        <span>{t.thresholdTarget}</span>
                        <span className="font-medium text-slate-600">{ageThreshold}+</span>
                      </div>
                      {!selectedAvatar.isSpoof && (
                        <div className="mt-1.5 flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                          <Check className="w-3 h-3" />
                          <span>{t.meetsThreshold}</span>
                        </div>
                      )}
                    </div>

                    {/* {t.spoofLabel} Screening */}
                    <div className="border-b border-slate-100 pb-2.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        {t.activeSpoofCheck}
                      </span>
                      {selectedAvatar.isSpoof ? (
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-xs text-red-600 font-bold">
                            <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                            <span>{t.spoofAttackDetected}</span>
                          </div>
                          <p className="text-[9px] text-slate-400 leading-snug">
                            {getAvatarCopy(selectedAvatar).spoofDetails}
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>{t.livenessPassed}</span>
                        </div>
                      )}
                    </div>

                    {/* {t.instantRedaction} state */}
                    <div className="border-b border-slate-100 pb-2.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        {t.instantRedaction}
                      </span>
                      <div className="space-y-1.5 text-[10px]">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500 font-medium">{t.selfieImageFile}</span>
                          {isRedacted ? (
                            <span className="text-red-600 font-bold uppercase text-[8px] bg-red-50 border border-red-100 px-1.5 py-0.5 rounded">{t.purged}</span>
                          ) : (
                            <span className="text-emerald-600 font-bold uppercase text-[8px] bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded">{t.heldTemp}</span>
                          )}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500 font-medium">{t.estimatedAge}</span>
                          {isRedacted ? (
                            <span className="text-red-600 font-bold uppercase text-[8px] bg-red-50 border border-red-100 px-1.5 py-0.5 rounded">{t.scrubbed}</span>
                          ) : (
                            <span className="text-emerald-600 font-bold uppercase text-[8px] bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded">{t.heldTemp}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Overall status badge */}
              <div className="mt-4 pt-3 border-t border-slate-150">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  {t.automatedDecision}
                </span>
                {isScanning ? (
                  <div className="h-10 bg-slate-100 rounded-xl animate-pulse" />
                ) : verdict.status === 'APPROVED' ? (
                  <div className="space-y-2">
                    <div className="bg-emerald-500 text-white rounded-xl p-2.5 text-center flex items-center justify-center gap-1.5 shadow-sm">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span className="text-xs font-bold uppercase tracking-wider">{t.approve}</span>
                    </div>
                    <p className="text-[9px] text-slate-400 text-center leading-normal">
                      {t.approvedDesc}
                    </p>
                  </div>
                ) : verdict.status === 'FAILED' ? (
                  <div className="space-y-2">
                    <div className="bg-red-500 text-white rounded-xl p-2.5 text-center flex items-center justify-center gap-1.5 shadow-sm">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span className="text-xs font-bold uppercase tracking-wider">{t.decline}</span>
                    </div>
                    <p className="text-[9px] text-red-500/80 font-medium text-center leading-normal">
                      {t.failedDesc}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="bg-amber-500 text-white rounded-xl p-2.5 text-center flex items-center justify-center gap-1.5 shadow-sm">
                      <Layers className="w-4 h-4 shrink-0" />
                      <span className="text-xs font-bold uppercase tracking-wider">{t.stepUpShort}</span>
                    </div>
                    <p className="text-[9px] text-slate-400 text-center leading-normal">
                      {t.stepUpDesc}
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ACCORDION/FEATURES SECTION */}
      <section className="max-w-7xl mx-auto mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column Text (span 5) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[#354CE1] font-semibold text-xs uppercase tracking-wider">{t.keyFeatures}</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight leading-tight">
              {t.featuresTitle}
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              {t.featuresDesc}
            </p>
          </div>

          {/* Right Column Accordions (span 7) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm divide-y divide-slate-100">
            {t.accordions.map((item: any, idx: number) => (
              <div key={idx} className="py-4 first:pt-0 last:pb-0">
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between text-left focus:outline-none py-2"
                >
                  <span className="text-sm font-bold text-slate-800 hover:text-[#354CE1] transition">
                    {item.title}
                  </span>
                  <span className="text-slate-400 font-bold text-lg select-none ml-2">
                    {expandedAccordion === idx ? '-' : '+'}
                  </span>
                </button>
                {expandedAccordion === idx && (
                  <div className="mt-3 text-xs text-slate-500 leading-relaxed animate-in fade-in duration-200 pl-1">
                    {item.desc}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* WHAT SETS IDENTRA APART SECTION (Navy Blue Banner) */}
      <section className="max-w-7xl mx-auto mb-28">
        <div className="bg-[#090E2D] text-white rounded-[2.5rem] p-8 md:p-16 shadow-xl relative overflow-hidden">
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-12 tracking-tight text-center md:text-left">
            {t.whatSetsApart}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="space-y-3">
              <span className="text-indigo-400 font-extrabold text-xs uppercase tracking-wider block">01</span>
              <h3 className="text-lg font-bold text-white">{t.feat2Title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.apartSpoofDesc}
              </p>
            </div>
            <div className="space-y-3">
              <span className="text-indigo-400 font-extrabold text-xs uppercase tracking-wider block">02</span>
              <h3 className="text-lg font-bold text-white">{t.feat1Title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.apartAccuracyDesc}
              </p>
            </div>
            <div className="space-y-3">
              <span className="text-indigo-400 font-extrabold text-xs uppercase tracking-wider block">03</span>
              <h3 className="text-lg font-bold text-white">{t.apart2Title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.apartStepUpDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* KEEP LEARNING SECTION */}
      <section className="max-w-7xl mx-auto mb-28">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-10 tracking-tight">
          {t.keepLearning}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art: any) => (
            <div 
              key={art.id} 
              onClick={() => setActiveArticle(art)}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 cursor-pointer min-h-[360px]"
            >
              <div className="p-8 space-y-4">
                {/* Simulated Logo based on article */}
                {art.logo === 'lime' && (
                  <div className="w-16 h-8 flex items-center justify-center bg-lime-50 rounded-lg text-lime-600 font-bold font-sans tracking-tight text-sm">{t.limeLogo}</div>
                )}
                {art.logo === 'iso' && (
                  <div className="w-16 h-8 flex items-center justify-center bg-blue-50 rounded-lg text-blue-600">
                    <Globe className="w-5 h-5" />
                  </div>
                )}
                {art.logo === 'identra' && (
                  <div className="w-16 h-8 flex items-center justify-center bg-indigo-50 rounded-lg text-[#354CE1]">
                    <FileBadge className="w-5 h-5" />
                  </div>
                )}

                <h3 className="text-base font-bold text-slate-900 leading-snug hover:text-[#354CE1] transition line-clamp-3">
                  {art.title}
                </h3>
              </div>
              <div className="p-8 pt-0 border-t border-slate-50 flex justify-between items-center text-[11px] text-slate-400">
                <span className="font-semibold uppercase tracking-wider">{art.type}</span>
                <span>{art.meta.split('•')[1] || art.meta}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPLORE MORE OF IDENTITY PLATFORM */}
      <section className="max-w-7xl mx-auto mb-24">
        <div className="bg-[#EBF1FF] p-8 md:p-16 rounded-[2.5rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[240px] h-[240px] bg-white/40 rounded-full blur-2xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
          <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 tracking-tight mb-8 text-center md:text-left">
            {t.exploreMore}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Dynamic Flow */}
            <div 
              onClick={() => onViewChange?.('dynamic-flow')}
              className="bg-gradient-to-br from-[#4285f4] to-[#2b6cb0] text-white p-8 rounded-3xl flex flex-col justify-between min-h-[220px] shadow-md hover:scale-[1.01] transition-all cursor-pointer group"
            >
              <div>
                <Calendar className="w-8 h-8 text-white/90 mb-3" />
                <h3 className="text-xl md:text-2xl font-display font-bold leading-tight mb-2">
                  {t.exploreCard1Title}
                </h3>
                <p className="text-xs text-blue-100 font-light max-w-sm leading-relaxed">
                  {t.exploreCard1Desc}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold mt-4 group-hover:translate-x-1 transition-transform">
                <span>{t.exploreCard1Link}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Card 2: Face recognition */}
            <div 
              onClick={() => onViewChange?.('government-id')}
              className="bg-gradient-to-br from-[#1cb080] to-[#0c7553] text-white p-8 rounded-3xl flex flex-col justify-between min-h-[220px] shadow-md hover:scale-[1.01] transition-all cursor-pointer group"
            >
              <div>
                <Smile className="w-8 h-8 text-white/90 mb-3" />
                <h3 className="text-xl md:text-2xl font-display font-bold leading-tight mb-2">
                  {t.exploreCard2Title}
                </h3>
                <p className="text-xs text-emerald-100 font-light max-w-sm leading-relaxed">
                  {t.exploreCard2Desc}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold mt-4 group-hover:translate-x-1 transition-transform">
                <span>{t.exploreCard2Link}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* READY TO GET STARTED BANNER */}
      <section className="max-w-7xl mx-auto mb-16 bg-[#354CE1] text-white p-8 md:p-16 rounded-[2.5rem] text-center shadow-lg relative overflow-hidden">
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="relative z-10 max-w-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            {t.readyToStartTitle}
          </h2>
          <p className="text-indigo-50 font-light text-sm mb-8 leading-relaxed">
            {t.readyToStartDesc}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenSandbox}
              className="bg-white hover:bg-indigo-50 text-slate-950 font-bold px-8 py-3.5 rounded-full shadow-md transition text-xs uppercase tracking-wide"
            >
              {t.getDemo}
            </button>
            <button
              onClick={onOpenSandbox}
              className="text-white hover:text-indigo-100 font-bold flex items-center gap-1 transition text-xs uppercase tracking-wide"
            >
              <span>{t.tryItNow}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ARTICLE DRAWER/MODAL DIALOG */}
      {activeArticle && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] max-w-2xl w-full p-8 md:p-10 shadow-2xl relative max-h-[85vh] overflow-y-auto border border-slate-100 animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 font-semibold p-2 rounded-full hover:bg-slate-50 transition"
            >
              ✕
            </button>
            <span className="text-xs font-bold text-[#354CE1] bg-[#354CE1]/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
              {activeArticle.type}
            </span>
            <h3 className="text-xl md:text-2xl font-display font-bold text-slate-900 mt-4 mb-3 leading-snug">
              {activeArticle.title}
            </h3>
            <p className="text-xs text-slate-400 mb-6 font-mono">{activeArticle.meta}</p>
            <div className="text-slate-600 text-sm leading-relaxed space-y-4 whitespace-pre-line">
              {activeArticle.content}
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setActiveArticle(null)}
                className="bg-[#354CE1] hover:bg-[#2539BE] text-white font-semibold px-6 py-2.5 rounded-xl text-xs transition"
              >
                {t.closeReader}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
