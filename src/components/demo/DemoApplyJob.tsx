/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, ShieldCheck, CheckCircle2, User, AlertCircle
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { DEMO_COMPONENT_TRANSLATIONS } from '../../translations/DemoComponentTranslations';
import { DEMO_FLOW_LOG_TRANSLATIONS } from '../../translations/DemoFlowLogTranslations';
import { formatDemoText, getDemoLanguage } from '../../translations/demoLocalization';

interface DemoApplyJobProps {
  currentStepIdx: number;
  completedSteps: boolean[];
  isProcessingAction: boolean;
  setIsProcessingAction: (v: boolean) => void;
  advanceStep: (stepLogs: string[]) => void;
  addLog: (text: string, type?: 'system' | 'action' | 'data' | 'ok' | 'processing') => void;
  isSuccess: boolean;
  playTingTingSound: () => void;
}

export default function DemoApplyJob({
  currentStepIdx,
  completedSteps,
  isProcessingAction,
  setIsProcessingAction,
  advanceStep,
  addLog,
  isSuccess
}: DemoApplyJobProps) {
  const { language } = useLanguage();
  const t = DEMO_COMPONENT_TRANSLATIONS[language].applyJob;
  const logT = DEMO_FLOW_LOG_TRANSLATIONS[getDemoLanguage(language)].applyJob;

  // Scenario states
  const [jobName, setJobName] = useState('John Doe');
  const [jobLicense, setJobLicense] = useState('RN-94812-US');
  const [jobLicType, setJobLicType] = useState('Registered Nurse (RN)');
  const [jobBgCleared, setJobBgCleared] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset internal states when currentStepIdx is reset
  useEffect(() => {
    if (currentStepIdx === 0) {
      setJobName('John Doe');
      setJobLicense('RN-94812-US');
      setJobLicType('Registered Nurse (RN)');
      setJobBgCleared(false);
      setError(null);
    } else {
      setError(null);
    }
  }, [currentStepIdx]);

  return (
    <div className="space-y-6 flex-1 flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-[#354CE1]" />
          <span className="font-bold tracking-tight text-slate-800">{t.headerTitle}</span>
        </div>
        <span className="text-xs bg-emerald-50 text-emerald-600 border border-emerald-100/60 px-2.5 py-0.5 rounded-full font-bold">
          {t.identraVerified}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {currentStepIdx === 0 && !completedSteps[0] && (
          <motion.div key="job-form" className="space-y-4">
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
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">{t.candidateName}</label>
                <input 
                  type="text"
                  value={jobName}
                  onChange={(e) => {
                    setError(null);
                    setJobName(e.target.value);
                  }}
                  disabled={isProcessingAction}
                  className={`w-full bg-white border rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20 focus:border-[#354CE1] disabled:opacity-60 disabled:bg-slate-50 disabled:cursor-not-allowed transition-all ${
                    error && !jobName.trim() ? 'border-rose-300 focus:ring-rose-200' : 'border-slate-200'
                  }`}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">{t.workingIdentityNumber}</label>
                <input 
                  type="text"
                  defaultValue="XXX-XX-1234"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-500 disabled:opacity-60 disabled:bg-slate-50 disabled:cursor-not-allowed transition-all"
                  disabled
                />
              </div>
            </div>

            <button
              onClick={() => {
                if (!jobName.trim()) {
                  setError(t.validCandidateNameError);
                  return;
                }
                setError(null);
                setIsProcessingAction(true);
                addLog(formatDemoText(logT.vettingSocialSecurity, { name: jobName }), 'action');
                setTimeout(() => {
                  setIsProcessingAction(false);
                  advanceStep([
                    formatDemoText(logT.identityDatabaseComplete, { name: jobName }),
                  ]);
                }, 1200);
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
                <span>{t.verifyWorkingIdentity}</span>
              )}
            </button>
          </motion.div>
        )}

        {currentStepIdx === 1 && !completedSteps[1] && (
          <motion.div key="job-license" className="space-y-4">
            <div className="bg-[#354CE1]/5 p-4 rounded-2xl border border-indigo-100/40 text-xs text-indigo-950">
              {t.step2Description}
            </div>

            {error && (
              <div className="bg-rose-50 text-rose-600 border border-rose-100 p-3 rounded-xl text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-3 p-4 bg-white border border-slate-200 rounded-2xl">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600">{t.licenseType}</label>
                <select 
                  value={jobLicType}
                  onChange={(e) => {
                    setError(null);
                    setJobLicType(e.target.value);
                  }}
                  disabled={isProcessingAction}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20 focus:border-[#354CE1] disabled:opacity-60 disabled:bg-slate-50 disabled:cursor-not-allowed transition-all"
                >
                  <option value="Registered Nurse (RN)">{t.registeredNurse}</option>
                  <option value="Professional Engineer (PE)">{t.professionalEngineer}</option>
                  <option value="Certified Public Accountant (CPA)">{t.certifiedPublicAccountant}</option>
                  <option value="Doctor of Medicine (MD)">{t.doctorOfMedicine}</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600">{t.licenseRegistrationNumber}</label>
                <input 
                  type="text"
                  value={jobLicense}
                  onChange={(e) => {
                    setError(null);
                    setJobLicense(e.target.value);
                  }}
                  disabled={isProcessingAction}
                  className={`w-full bg-white border rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20 focus:border-[#354CE1] disabled:opacity-60 disabled:bg-slate-50 disabled:cursor-not-allowed transition-all ${
                    error && !jobLicense.trim() ? 'border-rose-300 focus:ring-rose-200' : 'border-slate-200'
                  }`}
                />
              </div>
            </div>

            <button
              onClick={() => {
                if (!jobLicense.trim()) {
                  setError(t.validLicenseIdError);
                  return;
                }
                setError(null);
                setIsProcessingAction(true);
                addLog(formatDemoText(logT.contactingLicensingBoard, { licenseType: jobLicType }), 'action');
                setTimeout(() => {
                  setIsProcessingAction(false);
                  advanceStep([
                    formatDemoText(logT.licenseValid, { licenseId: jobLicense, licenseType: jobLicType }),
                  ]);
                }, 1800);
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
                <span>{t.queryProfessionalRegistries}</span>
              )}
            </button>
          </motion.div>
        )}

        {currentStepIdx === 2 && !completedSteps[2] && (
          <motion.div key="job-bg" className="space-y-4">
            <div className="bg-[#354CE1]/5 p-4 rounded-2xl border border-indigo-100/40 text-xs text-indigo-950">
              {t.step3Description}
            </div>

            <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 relative overflow-hidden flex flex-col justify-center min-h-[140px]">
              {jobBgCleared ? (
                <div className="text-center space-y-2 z-10">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto animate-pulse" />
                  <span className="text-xs font-mono text-emerald-400 block uppercase tracking-wider">{t.backgroundCleared}</span>
                </div>
              ) : (
                <div className="text-center space-y-2 z-10">
                  <div className="h-6 w-6 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin mx-auto" />
                  <span className="text-xs font-mono text-slate-500 block uppercase tracking-wider">{t.backgroundWaiting}</span>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setJobBgCleared(true);
                setIsProcessingAction(true);
                addLog(logT.runningBackgroundScan, 'action');
                setTimeout(() => {
                  setIsProcessingAction(false);
                  advanceStep([logT.courtRecordComplete]);
                }, 2000);
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
                <span>{t.runNationalBackgroundScan}</span>
              )}
            </button>
          </motion.div>
        )}

        {isSuccess && (
          <motion.div key="job-success" className="space-y-5 text-center flex flex-col items-center justify-center py-8">
            <div className="h-14 w-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2 max-w-sm">
              <h3 className="text-lg font-bold text-slate-900">{t.candidateFullyVetted}</h3>
              <p className="text-xs text-slate-600">
                {t.candidateForwardedDescription}
              </p>
            </div>
            
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center gap-3 w-72">
              <ShieldCheck className="w-10 h-10 text-emerald-500 shrink-0" />
              <div className="text-left">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">IDENTRA VERIFIED WORKFORCE</span>
                <p className="font-bold text-xs text-slate-800">{jobName}</p>
                <span className="text-[9px] font-mono text-emerald-600 block">IDV CERTIFICATE: ISSUED</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="border-t border-slate-200/60 pt-4 flex items-center gap-2 text-[11px] text-slate-500 justify-center">
        <Briefcase className="w-4 h-4 text-[#354CE1]" />
        <span>{t.footer}</span>
      </div>
    </div>
  );
}
