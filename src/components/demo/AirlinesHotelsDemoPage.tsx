/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, Check, CheckCircle2, Globe, Key, Plane, ShieldCheck, Smartphone, Sparkles, Terminal, User } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { AIRLINES_HOTELS_DEMO_PAGE_TRANSLATIONS } from '../../translations/demo/AirlinesHotelsDemoPageTranslations';
import type { DemoScenarioId } from '../../types/routes';
import { getLocalizedRecord } from '../../utils/i18nRuntime';
import DemoSummaryModal from './DemoSummaryModal';
import IdentityFlowGraph from './IdentityFlowGraph';

interface AirlinesHotelsCheckInFlowProps {
  currentStepIdx: number;
  completedSteps: boolean[];
  isProcessingAction: boolean;
  setIsProcessingAction: (v: boolean) => void;
  advanceStep: (stepLogs: string[]) => void;
  addLog: (text: string, type?: 'system' | 'action' | 'data' | 'ok' | 'processing') => void;
  isSuccess: boolean;
  playTingTingSound: () => void;
}

function AirlinesHotelsCheckInFlow({
  currentStepIdx,
  completedSteps,
  isProcessingAction,
  setIsProcessingAction,
  advanceStep,
  addLog,
  isSuccess,
  playTingTingSound
}: AirlinesHotelsCheckInFlowProps) {
  const { language } = useLanguage();
  const translations = getLocalizedRecord(
    AIRLINES_HOTELS_DEMO_PAGE_TRANSLATIONS,
    language as keyof typeof AIRLINES_HOTELS_DEMO_PAGE_TRANSLATIONS,
    'AIRLINES_HOTELS_DEMO_PAGE_TRANSLATIONS',
  );
  const t = translations.scenario;
  const logT = translations.logs;

  // Scenario states
  const [nfcScanning, setNfcScanning] = useState(false);
  const [doorUnlocked, setDoorUnlocked] = useState(false);

  // Reset internal states when currentStepIdx is reset
  useEffect(() => {
    if (currentStepIdx === 0) {
      setNfcScanning(false);
      setDoorUnlocked(false);
    }
  }, [currentStepIdx]);

  return (
    <div className="space-y-6 flex-1 flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-[#354CE1]" />
          <span className="font-bold tracking-tight text-slate-800 font-sans">{t.deskTitle}</span>
        </div>
        <span className="text-xs bg-emerald-50 text-emerald-600 border border-emerald-100/60 px-2.5 py-0.5 rounded-full font-bold">
          {t.nfcBadge}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {currentStepIdx === 0 && !completedSteps[0] && (
          <motion.div key="air-nfc" className="space-y-4">
            <div className="bg-[#354CE1]/5 p-4 rounded-2xl border border-indigo-100/40 text-xs text-indigo-950">
              {t.step1Description}
            </div>

            <div className="bg-slate-900 aspect-video rounded-2xl relative overflow-hidden flex flex-col items-center justify-center text-slate-400">
              {nfcScanning ? (
                <div className="space-y-3 text-center">
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="h-12 w-12 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-400 mx-auto border border-indigo-500/30"
                  >
                    <Smartphone className="w-6 h-6" />
                  </motion.div>
                  <span className="text-xs font-mono text-indigo-300 block animate-pulse">{t.readingChipCertificate}</span>
                </div>
              ) : (
                <div className="text-center space-y-3">
                  <div className="flex justify-center gap-4">
                    <Smartphone className="w-10 h-10 text-slate-500" />
                    <span className="text-slate-600 text-xl font-bold flex items-center select-none">⇄</span>
                    {/* Inline BookOpenIcon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-slate-500"
                    >
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                  </div>
                  <span className="text-xs text-slate-500 block">{t.readyForContactless}</span>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setNfcScanning(true);
                setIsProcessingAction(true);
                addLog(logT.contactlessNfcScan, 'action');
                setTimeout(() => {
                  setNfcScanning(false);
                  setIsProcessingAction(false);
                  advanceStep([
                    formatText(logT.nfcChipDecrypted, { holder: 'Alice Vance' }),
                  ]);
                }, 2500);
              }}
              disabled={isProcessingAction}
              className={`w-full py-3.5 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 ${
                isProcessingAction 
                  ? 'opacity-60 cursor-not-allowed bg-[#354CE1]/60' 
                  : 'bg-[#354CE1] hover:bg-[#354CE1]/90 cursor-pointer shadow-lg shadow-[#354CE1]/15 active:scale-[0.99]'
              }`}
            >
              {isProcessingAction ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>{t.scanPassportNfcChip}</span>
              )}
            </button>
          </motion.div>
        )}

        {currentStepIdx === 1 && !completedSteps[1] && (
          <motion.div key="air-face" className="space-y-4">
            <div className="bg-[#354CE1]/5 p-4 rounded-2xl border border-indigo-100/40 text-xs text-indigo-950">
              {t.step2Description}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div className="space-y-1.5 text-center">
                <span className="text-[9px] font-mono text-slate-500 uppercase">{t.passportNfcPhoto}</span>
                <div className="h-28 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700">
                  <User className="w-12 h-12 text-slate-500" />
                </div>
              </div>
              <div className="space-y-1.5 text-center">
                <span className="text-[9px] font-mono text-slate-500 uppercase">{t.liveSelfieScan}</span>
                <div className="h-28 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 relative overflow-hidden">
                  <User className="w-12 h-12 text-emerald-400" />
                  <div className="absolute inset-x-0 h-0.5 bg-emerald-400 shadow-lg animate-bounce" />
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setIsProcessingAction(true);
                addLog(logT.runningPhotoMatch, 'action');
                setTimeout(() => {
                  setIsProcessingAction(false);
                  advanceStep([logT.facialAnalysisCompleted]);
                }, 1800);
              }}
              disabled={isProcessingAction}
              className={`w-full py-3.5 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 ${
                isProcessingAction 
                  ? 'opacity-60 cursor-not-allowed bg-[#354CE1]/60' 
                  : 'bg-[#354CE1] hover:bg-[#354CE1]/90 cursor-pointer shadow-lg shadow-[#354CE1]/15 active:scale-[0.99]'
              }`}
            >
              {isProcessingAction ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>{t.matchBiometricFacePhoto}</span>
              )}
            </button>
          </motion.div>
        )}

        {currentStepIdx === 2 && !completedSteps[2] && (
          <motion.div key="air-sync" className="space-y-4">
            <div className="bg-[#354CE1]/5 p-4 rounded-2xl border border-indigo-100/40 text-xs text-indigo-950">
              {t.step3Description}
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
              <div className="flex justify-between items-center text-xs text-slate-700">
                <span>{t.hotelReservationCode}</span>
                <strong className="font-mono text-[#354CE1]">HRZ-9281-W</strong>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-700">
                <span>{t.citizenAgeVerification}</span>
                <strong className="text-emerald-600">VERIFIED (+18)</strong>
              </div>
            </div>

            <button
              onClick={() => {
                setIsProcessingAction(true);
                addLog(logT.verifyingBoardingLists, 'action');
                setTimeout(() => {
                  setIsProcessingAction(false);
                  advanceStep([logT.bookingSynchronized]);
                }, 1500);
              }}
              disabled={isProcessingAction}
              className={`w-full py-3.5 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 ${
                isProcessingAction 
                  ? 'opacity-60 cursor-not-allowed bg-[#354CE1]/60' 
                  : 'bg-[#354CE1] hover:bg-[#354CE1]/90 cursor-pointer shadow-lg shadow-[#354CE1]/15 active:scale-[0.99]'
              }`}
            >
              {isProcessingAction ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>{t.syncFlightRoomCode}</span>
              )}
            </button>
          </motion.div>
        )}

        {isSuccess && (
          <motion.div key="air-success" className="space-y-5 text-center flex flex-col items-center justify-center py-6">
            <div className="h-14 w-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-md animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2 max-w-sm">
              <h3 className="text-lg font-bold text-slate-900">{t.contactlessCheckInComplete}</h3>
              <p className="text-xs text-slate-600">
                {t.roomKeyReadyDescription}
              </p>
            </div>
            
            {/* Key Card unlock simulation */}
            <button
              onClick={() => {
                setDoorUnlocked(true);
                playTingTingSound();
                setTimeout(() => setDoorUnlocked(false), 3000);
              }}
              className={`w-72 bg-gradient-to-tr from-amber-600 to-amber-400 hover:from-amber-700 text-white rounded-2xl p-5 shadow-xl transition-all relative overflow-hidden flex flex-col justify-between aspect-[1.586] border border-amber-500/20 text-left ${
                doorUnlocked ? 'ring-4 ring-emerald-400' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold tracking-widest text-amber-100 uppercase font-mono">HORIZON DIGITAL KEY</span>
                <Key className="w-5 h-5 text-amber-200" />
              </div>
              
              <div>
                <span className="text-[8px] text-amber-100 block font-mono">ROOM NUMBER</span>
                <span className="text-2xl font-bold font-sans">ROOM 504</span>
              </div>

              <div className="flex justify-between items-end">
                <span className="text-[9px] text-amber-100 font-mono">HOLDER: ALICE VANCE</span>
                <span className="text-[10px] font-bold bg-white/20 px-2.5 py-0.5 rounded-full font-mono">
                  {doorUnlocked ? '✓ UNLOCKED' : 'TAP TO TEST UNLOCK'}
                </span>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="border-t border-slate-200/60 pt-4 flex items-center gap-2 text-[11px] text-slate-500 justify-center">
        <Globe className="w-4 h-4 text-[#354CE1]" />
        <span>{t.biometricPassportFooter}</span>
      </div>
    </div>
  );
}

interface AirlinesHotelsDemoPageProps {
  onBackToList: () => void;
}

interface AirlinesHotelsDemoStep {
  label: string;
  action: string;
  logText: string;
}

interface AirlinesHotelsDemoCopy {
  id: DemoScenarioId;
  tag: string;
  title: string;
  desc: string;
  security: string;
  successResult: string;
  steps: AirlinesHotelsDemoStep[];
}

interface AirlinesHotelsDemoScenario extends AirlinesHotelsDemoCopy {
  icon: React.ComponentType<any>;
}

const formatText = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ''));

export default function AirlinesHotelsDemoPage({ onBackToList }: AirlinesHotelsDemoPageProps) {
  const { language } = useLanguage();
  const translations = getLocalizedRecord(
    AIRLINES_HOTELS_DEMO_PAGE_TRANSLATIONS,
    language as keyof typeof AIRLINES_HOTELS_DEMO_PAGE_TRANSLATIONS,
    'AIRLINES_HOTELS_DEMO_PAGE_TRANSLATIONS',
  );
  const t = translations.page;
  const scenario = useMemo<AirlinesHotelsDemoScenario>(() => ({
    ...translations.meta,
    id: 'airlines-hotels',
    icon: Plane,
  }), [translations.meta]);
  const terminalContainerRef = useRef<HTMLDivElement>(null);

  const playTingTingSound = useCallback(() => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();

      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(1046.50, ctx.currentTime);
      gain1.gain.setValueAtTime(0.12, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start();
      osc1.stop(ctx.currentTime + 0.35);

      const delay = 0.12;
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1318.51, ctx.currentTime + delay);
      gain2.gain.setValueAtTime(0, ctx.currentTime);
      gain2.gain.setValueAtTime(0.12, ctx.currentTime + delay);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.4);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(ctx.currentTime + delay);
      osc2.stop(ctx.currentTime + delay + 0.4);
    } catch (error) {
      console.warn(error);
    }
  }, []);

  // General simulation states
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(new Array(scenario.steps.length).fill(false));
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isProcessingAction, setIsProcessingAction] = useState<boolean>(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState<boolean>(false);

  // Initialize terminal logs
  useEffect(() => {
    const title = scenario.title;
    setCurrentStepIdx(0);
    setCompletedSteps(new Array(scenario.steps.length).fill(false));
    setIsSuccess(false);
    setIsProcessingAction(false);
    setIsSummaryModalOpen(false);
    setSimulationLogs([
      formatText(t.logs.launch, { title }),
      t.logs.environment,
      t.logs.instruction
    ]);
  }, [scenario, language, t]);

  // Scroll terminal logs
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTo({
        top: terminalContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [simulationLogs]);

  const addLog = (text: string, type: 'system' | 'action' | 'data' | 'ok' | 'processing' = 'system') => {
    const localizedText = text || '';
    let prefix = '';
    if (type === 'system') prefix = '[SYSTEM] ';
    else if (type === 'action') prefix = '[ACTION] ';
    else if (type === 'data') prefix = '[DATA] ';
    else if (type === 'ok') prefix = '[OK] ';
    else if (type === 'processing') prefix = '[PROCESSING] ';

    setSimulationLogs(prev => [...prev, `${prefix}${localizedText}`]);
  };

  const advanceStep = (stepLogs: string[]) => {
    // Mark current step done
    const updatedCompleted = [...completedSteps];
    updatedCompleted[currentStepIdx] = true;
    setCompletedSteps(updatedCompleted);

    // Push logs
    for (let i = 0; i < stepLogs.length; i++) {
      addLog(stepLogs[i], 'data');
    }

    const currentStep = scenario.steps[currentStepIdx];
    addLog(formatText(t.logs.completedLayer, { label: currentStep.label }), 'ok');

    const nextIdx = currentStepIdx + 1;
    if (nextIdx < scenario.steps.length) {
      setCurrentStepIdx(nextIdx);
      addLog(formatText(t.logs.nextTask, { action: scenario.steps[nextIdx].action }), 'system');
    } else {
      // Finished all steps
      setIsSuccess(true);
      setIsSummaryModalOpen(true);
      addLog(t.logs.allPassed, 'ok');
      addLog(t.logs.sealed, 'system');
      playTingTingSound();
    }
  };

  // Reset helper
  const handleReset = () => {
    setCurrentStepIdx(0);
    setCompletedSteps(new Array(scenario.steps.length).fill(false));
    setIsSuccess(false);
    setIsProcessingAction(false);
    setIsSummaryModalOpen(false);
    setSimulationLogs([
      formatText(t.logs.reset, { title: scenario.title }),
      t.logs.resetInstruction
    ]);
  };

  return (
    <div className="min-h-screen bg-[#FAFBFD] text-slate-800 font-sans pb-24 relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-[#354CE1]/5 to-transparent blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/60 pb-5">
          <button
            onClick={onBackToList}
            className="flex items-center gap-2 text-slate-600 hover:text-[#354CE1] transition font-semibold text-sm group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{t.backToScenarios}</span>
          </button>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono text-[#354CE1] bg-indigo-50 border border-indigo-100/50 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
              {t.liveBadge}
            </span>
          </div>
        </div>

        {/* Hero Section of this custom demo page */}
        <div className="bg-white rounded-3xl border border-slate-200/60 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#354CE1]/5 rounded-bl-full pointer-events-none" />
          <div className="flex items-center gap-4">
            <div className="p-4 bg-indigo-50 text-[#354CE1] rounded-2xl border border-indigo-100/50">
              <scenario.icon className="w-8 h-8" />
            </div>
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-indigo-50 text-[#354CE1] text-[10px] font-bold rounded-full uppercase tracking-wider">
                {scenario.tag}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight leading-none">
                {scenario.title}
              </h1>
              <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
                {scenario.desc}
              </p>
            </div>
          </div>
          <div className="shrink-0 flex gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
            >
              {t.resetDemo}
            </button>
          </div>
        </div>

        {/* Dynamic Sandbox Main Viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT PANEL: The Interactive Demo App Mockup (7 different cases) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-[32px] border border-slate-200/80 shadow-xl overflow-hidden relative">
              {/* Device Header Bar */}
              <div className="bg-slate-900 text-slate-400 px-6 py-4 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <div className="text-[11px] font-mono tracking-wider font-semibold bg-slate-800 text-slate-300 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{t.clientEmulator}</span>
                </div>
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              </div>

              {/* Dynamic app content provided by the scenario page */}
              <div className="p-6 md:p-8 min-h-[480px] bg-slate-50/50 flex flex-col justify-between">
                <AirlinesHotelsCheckInFlow
                  currentStepIdx={currentStepIdx}
                  completedSteps={completedSteps}
                  isProcessingAction={isProcessingAction}
                  setIsProcessingAction={setIsProcessingAction}
                  advanceStep={advanceStep}
                  addLog={addLog}
                  isSuccess={isSuccess}
                  playTingTingSound={playTingTingSound}
                />
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Identity Flow Progress + Sandbox Transaction Console Ledger */}
          <div className="lg:col-span-5 space-y-6">
            {/* 1. Identity Verification Flow Tracker */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-6 shadow-sm relative overflow-hidden">
              {/* Header section with badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-indigo-50 text-[#354CE1] rounded-lg">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    {t.flowTitle}
                  </h3>
                </div>
                <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-100/50 px-2.5 py-0.5 rounded-full text-[9px] font-bold font-mono">
                  <Sparkles className="w-2.5 h-2.5 animate-pulse text-emerald-600" />
                  <span>{t.coreVersion}</span>
                </div>
              </div>

              {/* Dynamic Risk Engine Header metrics */}
              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-150 text-center text-xs font-mono">
                <div>
                  <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">{t.riskLevel}</span>
                  <span className={`font-bold text-[10px] ${
                    isSuccess ? 'text-emerald-600' : currentStepIdx > 1 ? 'text-emerald-500' : 'text-amber-500 animate-pulse'
                  }`}>
                    {isSuccess ? t.safeLow : t.evaluating}
                  </span>
                </div>
                <div className="border-x border-slate-200">
                  <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">{t.trustScore}</span>
                  <span className="font-extrabold text-[11px] text-[#354CE1]">
                    {isSuccess ? '99.9%' : `${88 + currentStepIdx * 4}%`}
                  </span>
                </div>
                <div>
                  <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">{t.systemState}</span>
                  <span className={`font-bold text-[10px] ${isSuccess ? 'text-emerald-600' : 'text-amber-500'}`}>
                    {isSuccess ? t.approved : t.analyzing}
                  </span>
                </div>
              </div>

              {/* Graphical representation of the Verification sequence */}
              <IdentityFlowGraph
                steps={scenario.steps}
                currentStepIdx={currentStepIdx}
                completedSteps={completedSteps}
                isSuccess={isSuccess}
              />

              {/* Steps with connected timeline */}
              <div className="space-y-4 relative pl-3.5 border-l border-slate-100">
                {scenario.steps.map((st, sIdx) => {
                  const isActive = currentStepIdx === sIdx && !isSuccess;
                  const isDone = completedSteps[sIdx] || isSuccess;
                  const subChecks: string[] = t.subChecks[scenario.id]?.[sIdx] || [];

                  return (
                    <div
                      key={sIdx}
                      className={`relative pl-6 space-y-2 transition-all p-3 rounded-2xl border ${
                        isActive
                          ? 'bg-indigo-50/40 border-[#354CE1]/25 shadow-sm'
                          : isDone
                            ? 'bg-slate-50/10 border-transparent'
                            : 'bg-transparent border-transparent'
                      }`}
                    >
                      {/* Circle indicator on left line */}
                      <div className={`absolute -left-[30px] top-4.5 h-6 w-6 rounded-full border flex items-center justify-center transition-all ${
                        isDone
                          ? 'bg-[#354CE1] border-[#354CE1] text-white shadow-md'
                          : isActive
                            ? 'bg-white border-[#354CE1] text-[#354CE1] shadow-sm ring-4 ring-indigo-50 scale-105 font-bold animate-pulse'
                            : 'bg-white border-slate-200 text-slate-400'
                      }`}>
                        {isDone ? (
                          <Check className="w-3 h-3 stroke-[3]" />
                        ) : (
                          <span className="text-[10px] font-bold">{sIdx + 1}</span>
                        )}
                      </div>

                      {/* Title & Action description */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className={`text-xs font-bold transition-colors ${
                            isDone || isActive ? 'text-slate-900' : 'text-slate-400'
                          }`}>
                            {st.label}
                          </p>
                          {isActive && (
                            <span className="text-[8px] font-bold font-mono px-1.5 py-0.5 bg-indigo-500 text-white rounded-md uppercase tracking-wider animate-pulse shrink-0">
                              {t.active}
                            </span>
                          )}
                          {isDone && !isActive && (
                            <span className="text-[8px] font-bold font-mono px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-md uppercase tracking-wider shrink-0">
                              {t.pass}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-500 font-medium">
                          {formatText(t.task, { action: st.action })}
                        </p>
                      </div>

                      {/* Micro-Verification Checks Sub-Checklist */}
                      {(isActive || isDone) && subChecks.length > 0 && (
                        <div className="pt-2 border-t border-slate-100/60 space-y-1.5">
                          <div className="text-[8px] font-bold uppercase tracking-wider text-slate-400 mb-1 font-mono">
                            {t.underlyingChecks}
                          </div>
                          <div className="grid grid-cols-1 gap-1">
                            {subChecks.map((label: string, cIdx: number) => {
                              let checkStatus: 'pending' | 'active' | 'done' = 'pending';
                              if (isDone) {
                                checkStatus = 'done';
                              } else if (isActive) {
                                const loggedIndexes = subChecks.map((stepText: string) => {
                                  const keyword = stepText.slice(0, 10);
                                  return simulationLogs.some(log => log.includes(keyword));
                                });
                                const lastLoggedIdx = loggedIndexes.lastIndexOf(true);

                                if (lastLoggedIdx >= 0) {
                                  if (cIdx < lastLoggedIdx) {
                                    checkStatus = 'done';
                                  } else if (cIdx === lastLoggedIdx) {
                                    checkStatus = 'active';
                                  } else {
                                    checkStatus = 'pending';
                                  }
                                } else {
                                  checkStatus = cIdx === 0 ? 'active' : 'pending';
                                }
                              }

                              return (
                                <div key={cIdx} className="flex items-center gap-2 text-[9.5px] font-mono leading-none">
                                  {checkStatus === 'done' ? (
                                    <span className="h-3.5 w-3.5 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-[8px] shrink-0 border border-emerald-100">✓</span>
                                  ) : checkStatus === 'active' ? (
                                    <span className="h-3.5 w-3.5 rounded bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100 animate-pulse">
                                      <span className="h-1 w-1 rounded-full bg-amber-500 animate-ping" />
                                    </span>
                                  ) : (
                                    <span className="h-3.5 w-3.5 rounded bg-slate-50 text-slate-400 flex items-center justify-center text-[8px] shrink-0 border border-slate-100">−</span>
                                  )}
                                  <span className={
                                    checkStatus === 'done'
                                      ? 'text-slate-600 font-medium'
                                      : checkStatus === 'active'
                                        ? 'text-amber-600 font-semibold animate-pulse'
                                        : 'text-slate-400'
                                  }>
                                    {label}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Status and Restart details */}
              <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${isSuccess ? 'bg-emerald-500 animate-pulse' : 'bg-[#354CE1] animate-ping'}`} />
                  <span className="text-xs font-semibold font-mono text-slate-600 uppercase tracking-wide">
                    {isSuccess ? t.transactionComplete : t.waitingInput}
                  </span>
                </div>
                {isSuccess && (
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => setIsSummaryModalOpen(true)}
                      className="flex-1 sm:flex-none px-3.5 py-2 bg-[#354CE1] hover:bg-[#354CE1]/90 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-[#354CE1]/15 cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98]"
                    >
                      <span>{t.viewVerdict}</span>
                    </button>
                    <button
                      onClick={handleReset}
                      className="flex-1 sm:flex-none px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer flex items-center justify-center active:scale-[0.98]"
                    >
                      {t.runAgain}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 2. Real-Time Secure Sandbox Ledger Terminal Console */}
            <div className="bg-slate-900 rounded-[28px] border border-slate-800 p-5 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <div className="flex items-center gap-2 text-slate-300">
                  <Terminal className="w-4 h-4 text-emerald-500" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-200">
                    {t.ledgerTitle}
                  </span>
                </div>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <div ref={terminalContainerRef} className="font-mono text-[10px] space-y-2 h-52 overflow-y-auto scrollbar-thin text-slate-300 pr-1 select-all leading-relaxed">
                {simulationLogs.map((log, idx) => {
                  let color = 'text-slate-300';
                  if (log.startsWith('[SYSTEM]')) color = 'text-indigo-400';
                  else if (log.startsWith('[ACTION]')) color = 'text-amber-400';
                  else if (log.startsWith('[OK]')) color = 'text-emerald-500 font-semibold';
                  else if (log.startsWith('[PROCESSING]')) color = 'text-purple-400 animate-pulse';

                  return (
                    <div key={idx} className="flex gap-2 items-start">
                      <span className="text-slate-600 select-none">&gt;</span>
                      <span className={color}>{log}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>

      <AnimatePresence>
        {isSummaryModalOpen && (
          <DemoSummaryModal
            isOpen={isSummaryModalOpen}
            onClose={() => setIsSummaryModalOpen(false)}
            scenarioId={scenario.id}
            scenarioTitle={scenario.title}
            steps={scenario.steps}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
