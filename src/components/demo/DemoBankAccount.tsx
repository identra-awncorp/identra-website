/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Landmark, Globe, User, ShieldCheck, Camera, Fingerprint, Database, ShieldAlert, CheckCircle2, ArrowRight, AlertCircle
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { DEMO_COMPONENT_TRANSLATIONS } from '../../translations/DemoComponentTranslations';
import { DEMO_FLOW_LOG_TRANSLATIONS } from '../../translations/DemoFlowLogTranslations';
import { formatDemoText, getDemoLanguage } from '../../translations/demoLocalization';

interface DemoBankAccountProps {
  currentStepIdx: number;
  completedSteps: boolean[];
  isProcessingAction: boolean;
  setIsProcessingAction: (v: boolean) => void;
  advanceStep: (stepLogs: string[]) => void;
  addLog: (text: string, type?: 'system' | 'action' | 'data' | 'ok' | 'processing') => void;
  isSuccess: boolean;
  playTingTingSound: () => void;
}

export default function DemoBankAccount({
  currentStepIdx,
  completedSteps,
  isProcessingAction,
  setIsProcessingAction,
  advanceStep,
  addLog,
  isSuccess,
  playTingTingSound
}: DemoBankAccountProps) {
  const { language } = useLanguage();
  const t = DEMO_COMPONENT_TRANSLATIONS[language].bankAccount;
  const logT = DEMO_FLOW_LOG_TRANSLATIONS[getDemoLanguage(language)].bankAccount;

  // Scenario states
  const [bankName, setBankName] = useState('Alice Vance');
  const [bankSsn, setBankSsn] = useState('029-481-9238');
  const [bankAddress, setBankAddress] = useState('742 Evergreen Terrace');
  const [bankIdScanned, setBankIdScanned] = useState(false);
  const [bankLivenessScanned, setBankLivenessScanned] = useState(false);
  const [bankAmlCleared, setBankAmlCleared] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset internal states when currentStepIdx is reset
  useEffect(() => {
    if (currentStepIdx === 0) {
      setBankName('Alice Vance');
      setBankSsn('029-481-9238');
      setBankAddress('742 Evergreen Terrace');
      setBankIdScanned(false);
      setBankLivenessScanned(false);
      setBankAmlCleared(false);
      setError(null);
    } else {
      setError(null);
    }
  }, [currentStepIdx]);

  return (
    <div className="space-y-6 flex-1 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
        <div className="flex items-center gap-2">
          <Landmark className="w-5 h-5 text-[#354CE1]" />
          <span className="font-bold tracking-tight text-slate-800 font-display">{t.headerTitle}</span>
        </div>
        <span className="text-xs bg-emerald-50 text-emerald-600 border border-emerald-100/60 px-2.5 py-0.5 rounded-full font-bold">
          {t.securedByIdentra}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 0: Form submit */}
        {currentStepIdx === 0 && !completedSteps[0] && (
          <motion.div 
            key="bank-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-4"
          >
            <div className="bg-[#354CE1]/5 p-4 rounded-2xl border border-indigo-100/40 text-xs text-indigo-950 leading-relaxed">
              {t.step1Description}
            </div>

            {error && (
              <div className="bg-rose-50 text-rose-600 border border-rose-100 p-3 rounded-xl text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">{t.fullName}</label>
                <input 
                  type="text"
                  value={bankName}
                  onChange={(e) => {
                    setError(null);
                    setBankName(e.target.value);
                  }}
                  disabled={isProcessingAction}
                  className={`w-full bg-white border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20 font-medium disabled:opacity-60 disabled:bg-slate-50 disabled:cursor-not-allowed transition-all ${
                    error && !bankName.trim() ? 'border-rose-300 focus:ring-rose-200' : 'border-slate-200'
                  }`}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">{t.identityNumberSsn}</label>
                <input 
                  type="text"
                  value={bankSsn}
                  onChange={(e) => {
                    setError(null);
                    setBankSsn(e.target.value);
                  }}
                  disabled={isProcessingAction}
                  className={`w-full bg-white border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20 font-mono disabled:opacity-60 disabled:bg-slate-50 disabled:cursor-not-allowed transition-all ${
                    error && !bankSsn.trim() ? 'border-rose-300 focus:ring-rose-200' : 'border-slate-200'
                  }`}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">{t.physicalAddress}</label>
              <input 
                type="text"
                value={bankAddress}
                onChange={(e) => {
                  setError(null);
                  setBankAddress(e.target.value);
                }}
                disabled={isProcessingAction}
                className={`w-full bg-white border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20 font-medium disabled:opacity-60 disabled:bg-slate-50 disabled:cursor-not-allowed transition-all ${
                  error && !bankAddress.trim() ? 'border-rose-300 focus:ring-rose-200' : 'border-slate-200'
                }`}
              />
            </div>

            <button
              onClick={() => {
                if (!bankName.trim()) {
                  setError(t.fullNameError);
                  return;
                }
                if (!bankSsn.trim()) {
                  setError(t.identityNumberError);
                  return;
                }
                if (!bankAddress.trim()) {
                  setError(t.physicalAddressError);
                  return;
                }
                setError(null);
                setIsProcessingAction(true);
                addLog(formatDemoText(logT.submittingProfile, { name: bankName }), 'action');
                setTimeout(() => {
                  setIsProcessingAction(false);
                  advanceStep([
                    formatDemoText(logT.profileReceived, { name: bankName, ssn: bankSsn }),
                  ]);
                }, 1200);
              }}
              disabled={isProcessingAction}
              className={`w-full py-3.5 bg-[#354CE1] text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 ${
                isProcessingAction 
                  ? 'opacity-60 cursor-not-allowed' 
                  : 'hover:bg-[#354CE1]/90 cursor-pointer active:scale-[0.99] shadow-lg shadow-[#354CE1]/20'
              }`}
            >
              {isProcessingAction ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>{t.submitRegistrationProfile}</span>
              )}
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* Step 1: ID Card Scan */}
        {currentStepIdx === 1 && !completedSteps[1] && (
          <motion.div 
            key="bank-id-scan"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-5"
          >
            <div className="bg-[#354CE1]/5 p-4 rounded-2xl border border-indigo-100/40 text-xs text-indigo-950">
              {t.step2Description}
            </div>

            <div className="bg-slate-900 aspect-video rounded-2xl border border-slate-800 relative overflow-hidden flex flex-col items-center justify-center text-slate-400 shadow-inner">
              {/* Scanning Laser Line */}
              {bankIdScanned && (
                <div className="absolute inset-x-0 h-1 bg-[#00D4B2] shadow-[0_0_15px_#00D4B2] animate-[bounce_2s_infinite] z-20" />
              )}
              
              {/* Passport graphic */}
              <div className="relative z-10 w-64 bg-slate-800 rounded-xl border border-slate-700/80 p-4 space-y-3 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-700/80 pb-2">
                  <div className="flex items-center gap-1.5 text-yellow-500">
                    <Globe className="w-4 h-4" />
                    <span className="text-[9px] font-mono font-bold tracking-widest uppercase">PASSPORT</span>
                  </div>
                  <div className="h-2 w-5 bg-yellow-500/20 rounded" />
                </div>
                <div className="flex gap-3">
                  <div className="w-16 h-20 bg-slate-700 rounded-lg flex items-center justify-center border border-slate-600">
                    <User className="w-8 h-8 text-slate-500" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="h-2 bg-slate-700 rounded w-5/6" />
                    <div className="h-2 bg-slate-700 rounded w-1/2" />
                    <div className="h-2 bg-slate-700 rounded w-2/3" />
                    <div className="h-2.5 bg-yellow-500/10 border border-yellow-500/20 rounded font-mono text-[8px] text-yellow-500 px-1.5 py-0.5 mt-2 flex items-center gap-1">
                      <ShieldCheck className="w-2.5 h-2.5" />
                      <span>RFID ACTIVE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setBankIdScanned(true);
                setIsProcessingAction(true);
                addLog(logT.extractingGovernmentId, 'action');
                setTimeout(() => {
                  setIsProcessingAction(false);
                  setBankIdScanned(false);
                  advanceStep([
                    formatDemoText(logT.documentOcrSuccessful, { holder: bankName.toUpperCase() }),
                  ]);
                }, 2500);
              }}
              disabled={isProcessingAction}
              className={`w-full py-3.5 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 ${
                isProcessingAction 
                  ? 'bg-slate-800 opacity-60 cursor-not-allowed' 
                  : 'bg-slate-900 hover:bg-slate-800 cursor-pointer shadow-lg'
              }`}
            >
              <Camera className="w-4 h-4 text-[#00D4B2]" />
              <span>{t.scanIdDocumentNow}</span>
            </button>
          </motion.div>
        )}

        {/* Step 2: 3D Facial Liveness */}
        {currentStepIdx === 2 && !completedSteps[2] && (
          <motion.div 
            key="bank-liveness"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-5"
          >
            <div className="bg-[#354CE1]/5 p-4 rounded-2xl border border-indigo-100/40 text-xs text-indigo-950">
              {t.step3Description}
            </div>

            <div className="bg-slate-950 aspect-video rounded-2xl relative overflow-hidden flex flex-col items-center justify-center text-slate-400">
              {/* Scanning oval */}
              <div className={`relative h-44 w-36 rounded-[50%] border-2 transition-all flex items-center justify-center ${
                bankLivenessScanned ? 'border-[#00D4B2] bg-[#00D4B2]/5' : 'border-slate-700'
              }`}>
                <User className={`w-24 h-24 transition-colors ${
                  bankLivenessScanned ? 'text-[#00D4B2]' : 'text-slate-600'
                }`} />
                {bankLivenessScanned && (
                  <motion.div 
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute inset-0 rounded-[50%] border-t-2 border-[#00D4B2]"
                  />
                )}
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mt-2">
                {bankLivenessScanned ? t.analyzing3dBiometrics : t.positionFaceInsideOval}
              </span>
            </div>

            <button
              onClick={() => {
                setBankLivenessScanned(true);
                setIsProcessingAction(true);
                addLog(logT.initializingLiveness, 'action');
                setTimeout(() => {
                  setIsProcessingAction(false);
                  setBankLivenessScanned(false);
                  advanceStep([logT.facialRecognitionComplete]);
                }, 2500);
              }}
              disabled={isProcessingAction}
              className={`w-full py-3.5 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 ${
                isProcessingAction 
                  ? 'opacity-60 cursor-not-allowed bg-[#354CE1]/60' 
                  : 'bg-[#354CE1] hover:bg-[#354CE1]/90 cursor-pointer shadow-lg'
              }`}
            >
              <Fingerprint className="w-4 h-4 text-emerald-400" />
              <span>{t.verifyBiometricLiveness}</span>
            </button>
          </motion.div>
        )}

        {/* Step 3: AML Watchlist Query */}
        {currentStepIdx === 3 && !completedSteps[3] && (
          <motion.div 
            key="bank-aml"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-5"
          >
            <div className="bg-[#354CE1]/5 p-4 rounded-2xl border border-indigo-100/40 text-xs text-indigo-950">
              {t.step4Description}
            </div>

            <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">{t.registryScreening}</span>
                <div className="flex items-center gap-1 text-xs text-slate-300 font-mono">
                  <Database className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                  <span>{t.onlineConnection}</span>
                </div>
              </div>
              
              <div className="space-y-2 font-mono text-[11px] text-slate-300">
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-500">{t.ofacSanctionsList}</span>
                  <span className={bankAmlCleared ? 'text-emerald-400' : 'text-amber-500'}>{bankAmlCleared ? 'PASSED (0 Match)' : 'PENDING'}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-500">{t.interpolRedNotices}</span>
                  <span className={bankAmlCleared ? 'text-emerald-400' : 'text-amber-500'}>{bankAmlCleared ? 'PASSED (0 Match)' : 'PENDING'}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-500">{t.politicallyExposedPersons}</span>
                  <span className={bankAmlCleared ? 'text-emerald-400' : 'text-amber-500'}>{bankAmlCleared ? 'PASSED (0 Match)' : 'PENDING'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setBankAmlCleared(true);
                setIsProcessingAction(true);
                addLog(logT.queryingWatchlists, 'action');
                setTimeout(() => {
                  setIsProcessingAction(false);
                  advanceStep([
                    formatDemoText(logT.amlCheckComplete, { name: bankName.toUpperCase() }),
                  ]);
                }, 2000);
              }}
              disabled={isProcessingAction}
              className={`w-full py-3.5 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all ${
                isProcessingAction 
                  ? 'opacity-60 cursor-not-allowed bg-slate-800' 
                  : 'bg-slate-950 hover:bg-slate-900 cursor-pointer shadow-lg'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>{t.executeAmlRegistryChecks}</span>
            </button>
          </motion.div>
        )}

        {/* Success Results screen */}
        {isSuccess && (
          <motion.div 
            key="bank-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 flex-1 flex flex-col items-center justify-center text-center py-6"
          >
            <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2 max-w-sm">
              <h3 className="text-xl font-bold text-slate-900">{t.accountApproved}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.identityBoundDescription}
              </p>
            </div>

            {/* Beautiful virtual Credit Card */}
            <div className="w-72 aspect-[1.586] rounded-2xl bg-gradient-to-tr from-[#1E1B4B] via-[#312E81] to-[#4338CA] text-white p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-teal-500/15 rounded-full blur-2xl" />
              
              <div className="flex justify-between items-start z-10">
                <div className="flex items-center gap-1.5">
                  <div className="h-6 w-6 rounded-md bg-white/10 flex items-center justify-center backdrop-blur">
                    <Landmark className="w-3.5 h-3.5 text-teal-300" />
                  </div>
                  <span className="font-bold tracking-tight text-[11px] uppercase">{t.aeroBank}</span>
                </div>
                <span className="text-[9px] font-mono font-bold text-teal-400 tracking-wider">VISA PLATINUM</span>
              </div>

              <div className="space-y-1.5 z-10">
                <span className="text-[9px] font-mono text-indigo-200 tracking-widest">CARD HOLDER</span>
                <p className="font-bold tracking-wide text-sm font-display truncate uppercase">{bankName}</p>
              </div>

              <div className="flex justify-between items-end z-10 font-mono">
                <div className="space-y-1">
                  <span className="text-[7px] text-indigo-300 block">CARD NUMBER</span>
                  <span className="text-xs font-semibold tracking-widest text-indigo-100 font-mono">•••• •••• •••• 4812</span>
                </div>
                <div className="text-right">
                  <span className="text-[7px] text-indigo-300 block">CVV</span>
                  <span className="text-[10px] font-bold">294</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Help Note */}
      <div className="border-t border-slate-200/60 pt-4 flex items-center gap-2 text-[11px] text-slate-500 justify-center">
        <ShieldCheck className="w-4 h-4 text-[#354CE1]" />
        <span>{t.securityFooter}</span>
      </div>
    </div>
  );
}
