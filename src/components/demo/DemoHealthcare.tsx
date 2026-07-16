/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HeartPulse, Activity, CheckCircle2, AlertCircle
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { DEMO_COMPONENT_TRANSLATIONS } from '../../translations/DemoComponentTranslations';
import { DEMO_FLOW_LOG_TRANSLATIONS } from '../../translations/DemoFlowLogTranslations';
import { formatDemoText, getDemoLanguage } from '../../translations/demoLocalization';

interface DemoHealthcareProps {
  currentStepIdx: number;
  completedSteps: boolean[];
  isProcessingAction: boolean;
  setIsProcessingAction: (v: boolean) => void;
  advanceStep: (stepLogs: string[]) => void;
  addLog: (text: string, type?: 'system' | 'action' | 'data' | 'ok' | 'processing') => void;
  isSuccess: boolean;
  playTingTingSound: () => void;
}

export default function DemoHealthcare({
  currentStepIdx,
  completedSteps,
  isProcessingAction,
  setIsProcessingAction,
  advanceStep,
  addLog,
  isSuccess
}: DemoHealthcareProps) {
  const { language } = useLanguage();
  const t = DEMO_COMPONENT_TRANSLATIONS[language].healthcare;
  const logT = DEMO_FLOW_LOG_TRANSLATIONS[getDemoLanguage(language)].healthcare;

  // Scenario states
  const [patientName, setPatientName] = useState('John Doe');
  const [healthInsuranceScanned, setHealthInsuranceScanned] = useState(false);
  const [healthInsNum] = useState('BCX-4921-98A');
  const [healthInsGroup] = useState('GR-8491');
  const [healthHipaaSigned, setHealthHipaaSigned] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset internal states when currentStepIdx is reset
  useEffect(() => {
    if (currentStepIdx === 0) {
      setPatientName('John Doe');
      setHealthInsuranceScanned(false);
      setHealthHipaaSigned(false);
      setError(null);
    } else {
      setError(null);
    }
  }, [currentStepIdx]);

  return (
    <div className="space-y-6 flex-1 flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
        <div className="flex items-center gap-2">
          <HeartPulse className="w-5 h-5 text-[#354CE1]" />
          <span className="font-bold tracking-tight text-slate-800">{t.headerTitle}</span>
        </div>
        <span className="text-xs bg-emerald-50 text-emerald-600 border border-emerald-100/60 px-2.5 py-0.5 rounded-full font-bold">
          {t.hipaaCompliant}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {currentStepIdx === 0 && !completedSteps[0] && (
          <motion.div key="health-id" className="space-y-4">
            <div className="bg-[#354CE1]/5 p-4 rounded-2xl border border-indigo-100/40 text-xs text-indigo-950">
              {t.step1Description}
            </div>

            {error && (
              <div className="bg-rose-50 text-rose-600 border border-rose-100 p-3 rounded-xl text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">{t.patientLegalName}</label>
                <input 
                  type="text"
                  value={patientName}
                  onChange={(e) => {
                    setError(null);
                    setPatientName(e.target.value);
                  }}
                  disabled={isProcessingAction}
                  className={`w-full bg-white border rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20 focus:border-[#354CE1] disabled:opacity-60 disabled:bg-slate-50 disabled:cursor-not-allowed transition-all ${
                    error && !patientName.trim() ? 'border-rose-300 focus:ring-rose-200' : 'border-slate-200'
                  }`}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">{t.medicalSecurityNumber}</label>
                <input 
                  type="text"
                  defaultValue="MED-4821-US-AV"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-400 font-mono disabled:opacity-60 disabled:bg-slate-50 disabled:cursor-not-allowed transition-all"
                  disabled
                />
              </div>
            </div>

            <button
              onClick={() => {
                if (!patientName.trim()) {
                  setError(t.validPatientNameError);
                  return;
                }
                setError(null);
                setIsProcessingAction(true);
                addLog(formatDemoText(logT.vettingClinicalRecords, { name: patientName }), 'action');
                setTimeout(() => {
                  setIsProcessingAction(false);
                  advanceStep([
                    formatDemoText(logT.patientRegistryClear, { name: patientName }),
                  ]);
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
                <span>{t.verifyPatientIdentity}</span>
              )}
            </button>
          </motion.div>
        )}

        {currentStepIdx === 1 && !completedSteps[1] && (
          <motion.div key="health-ins" className="space-y-4">
            <div className="bg-[#354CE1]/5 p-4 rounded-2xl border border-indigo-100/40 text-xs text-indigo-950">
              {t.step2Description}
            </div>

            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-4 relative overflow-hidden">
              {healthInsuranceScanned && (
                <div className="absolute inset-x-0 h-0.5 bg-[#00D4B2] shadow-lg animate-bounce z-20" />
              )}
              
              <div className="w-64 bg-[#1E1B4B] rounded-xl p-3 text-white space-y-2 border border-indigo-950 mx-auto shadow-xl">
                <div className="flex justify-between border-b border-indigo-950 pb-1.5">
                  <span className="text-[8px] font-mono text-indigo-300 uppercase">{t.blueShieldPremium}</span>
                  <div className="h-1.5 w-4 bg-teal-400 rounded" />
                </div>
                <div className="text-[10px] space-y-1">
                  <p className="font-mono text-[9px] text-teal-300">{t.policyLabel} {healthInsNum}</p>
                  <p className="font-mono text-[9px] text-teal-300">{t.groupLabel} {healthInsGroup}</p>
                  <p className="text-[9px] font-bold">HOLDER: {patientName.toUpperCase()}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setHealthInsuranceScanned(true);
                setIsProcessingAction(true);
                addLog(logT.runningInsuranceOcr, 'action');
                setTimeout(() => {
                  setIsProcessingAction(false);
                  setHealthInsuranceScanned(false);
                  advanceStep([
                    formatDemoText(logT.insuranceScanVerified, { policyId: healthInsNum, groupId: healthInsGroup }),
                  ]);
                }, 2000);
              }}
              disabled={isProcessingAction}
              className={`w-full py-3.5 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 ${
                isProcessingAction 
                  ? 'opacity-60 cursor-not-allowed bg-slate-800' 
                  : 'bg-slate-900 hover:bg-slate-800 cursor-pointer shadow-lg shadow-slate-900/10 active:scale-[0.99]'
              }`}
            >
              {isProcessingAction ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>{t.analyzeInsuranceCardOcr}</span>
              )}
            </button>
          </motion.div>
        )}

        {currentStepIdx === 2 && !completedSteps[2] && (
          <motion.div key="health-hipaa" className="space-y-4">
            <div className="bg-[#354CE1]/5 p-4 rounded-2xl border border-indigo-100/40 text-xs text-indigo-950">
              {t.step3Description}
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3">
              <p className="text-[10px] text-slate-500 leading-relaxed max-h-16 overflow-y-auto pr-1">
                {t.consentDescription}
              </p>
              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input 
                  type="checkbox"
                  checked={healthHipaaSigned}
                  onChange={(e) => setHealthHipaaSigned(e.target.checked)}
                  disabled={isProcessingAction}
                  className="rounded border-slate-300 text-[#354CE1] focus:ring-[#354CE1] disabled:opacity-60 disabled:cursor-not-allowed"
                />
                <span className="text-[10px] font-bold text-slate-700 uppercase">{t.consentCheckbox}</span>
              </label>
            </div>

            <button
              onClick={() => {
                if (!healthHipaaSigned) {
                  addLog(logT.consentRequired, 'system');
                  return;
                }
                setIsProcessingAction(true);
                addLog(logT.submittingHipaaAgreement, 'action');
                setTimeout(() => {
                  setIsProcessingAction(false);
                  advanceStep([logT.hipaaAgreementVerified]);
                }, 1500);
              }}
              disabled={isProcessingAction || !healthHipaaSigned}
              className={`w-full py-3.5 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 ${
                isProcessingAction || !healthHipaaSigned
                  ? 'opacity-60 cursor-not-allowed bg-[#354CE1]/60' 
                  : 'bg-[#354CE1] hover:bg-[#354CE1]/90 cursor-pointer shadow-lg shadow-[#354CE1]/15 active:scale-[0.99]'
              }`}
            >
              {isProcessingAction ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>{t.sealHipaaConsentForm}</span>
              )}
            </button>
          </motion.div>
        )}

        {isSuccess && (
          <motion.div key="health-success" className="space-y-5 text-center flex flex-col items-center justify-center py-6">
            <div className="h-14 w-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-md animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2 max-w-sm">
              <h3 className="text-lg font-bold text-slate-900">{t.patientPortalVerified}</h3>
              <p className="text-xs text-slate-600">
                {t.successDescription}
              </p>
            </div>
            
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 w-72 flex items-center gap-3">
              <Activity className="w-8 h-8 text-indigo-600 shrink-0 animate-pulse" />
              <div className="text-left space-y-0.5">
                <span className="text-[8px] font-bold text-slate-400 block">{t.digitalPass}</span>
                <p className="font-bold text-xs text-slate-800">{patientName}</p>
                <span className="text-[9px] text-emerald-600 font-mono block font-mono">{t.insuranceVerifiedActive}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="border-t border-slate-200/60 pt-4 flex items-center gap-2 text-[11px] text-slate-500 justify-center">
        <HeartPulse className="w-4 h-4 text-[#354CE1]" />
        <span>{t.hipaaSecureFooter}</span>
      </div>
    </div>
  );
}
