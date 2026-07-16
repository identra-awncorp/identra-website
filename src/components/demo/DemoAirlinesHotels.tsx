/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, Smartphone, User, Key, CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { DEMO_COMPONENT_TRANSLATIONS } from '../../translations/DemoComponentTranslations';
import { DEMO_FLOW_LOG_TRANSLATIONS } from '../../translations/DemoFlowLogTranslations';
import { formatDemoText, getDemoLanguage } from '../../translations/demoLocalization';

interface DemoAirlinesHotelsProps {
  currentStepIdx: number;
  completedSteps: boolean[];
  isProcessingAction: boolean;
  setIsProcessingAction: (v: boolean) => void;
  advanceStep: (stepLogs: string[]) => void;
  addLog: (text: string, type?: 'system' | 'action' | 'data' | 'ok' | 'processing') => void;
  isSuccess: boolean;
  playTingTingSound: () => void;
}

export default function DemoAirlinesHotels({
  currentStepIdx,
  completedSteps,
  isProcessingAction,
  setIsProcessingAction,
  advanceStep,
  addLog,
  isSuccess,
  playTingTingSound
}: DemoAirlinesHotelsProps) {
  const { language } = useLanguage();
  const t = DEMO_COMPONENT_TRANSLATIONS[language].airlinesHotels;
  const logT = DEMO_FLOW_LOG_TRANSLATIONS[getDemoLanguage(language)].airlinesHotels;

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
                    formatDemoText(logT.nfcChipDecrypted, { holder: 'Alice Vance' }),
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
