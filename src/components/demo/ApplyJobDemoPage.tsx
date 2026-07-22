/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AlertCircle, ArrowLeft, ArrowRight, Award, Briefcase, Building2, Check, CheckCircle2, Code2, ExternalLink, FileCode, Globe, GraduationCap, Loader2, Lock, Mail, MapPin, Phone, Plus, QrCode, Server, ShieldCheck, Smartphone, Sparkles, Terminal, Trash2, User, UserCheck, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { APPLY_JOB_DEMO_PAGE_TRANSLATIONS } from '../../translations/demo/ApplyJobDemoPageTranslations';
import type { DemoScenarioId } from '../../types/routes';
import { getLocalizedRecord } from '../../utils/i18nRuntime';
import DemoSummaryModal from './DemoSummaryModal';
import IdentityFlowGraph from './IdentityFlowGraph';

interface DemoApplyJobProps {
  currentStepIdx: number;
  completedSteps: boolean[];
  isProcessingAction: boolean;
  setIsProcessingAction: (v: boolean) => void;
  advanceStep: (stepLogs: string[]) => void;
  addLog: (text: string, type?: 'system' | 'action' | 'data' | 'ok' | 'processing') => void;
  isSuccess: boolean;
  playTingTingSound?: () => void;
  onServerProgressChange?: (progress: number) => void;
  onSsiModeChange?: (isSsiMode: boolean) => void;
}

interface CandidateCert {
  title: string;
  url: string;
}

/**
 * Realistic 2D Matrix QR Code SVG Component
 */
function RealQrCode({ className = "w-44 h-44 text-[#0F1E36]" }: { className?: string }) {
  const grid = [
    [1,1,1,1,1,1,1,0,1,0,1,1,0,1,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,1,0,1,0,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,0,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,1,0,0,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,1,0,0,1,1,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,1,0,1,0,1,0,0,0,0,0,0,0,0],
    [1,1,0,0,1,0,1,1,0,1,0,0,1,0,1,1,0,1,1,0,1,1],
    [0,1,0,1,0,1,0,0,1,0,1,1,0,1,0,0,1,0,0,1,0,0],
    [1,0,1,1,0,0,1,1,0,1,0,0,1,1,0,1,0,1,1,0,1,1],
    [0,0,1,0,1,1,0,0,1,0,1,0,0,0,1,0,1,0,0,1,0,0],
    [1,1,0,1,0,0,1,0,0,1,1,1,0,1,0,1,0,1,1,0,1,1],
    [0,0,0,0,0,0,0,0,1,0,0,1,1,0,1,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,0,1,1,0,0,1,0,1,1,0,1,0,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,1,0,0,1,0,0,1,0,1,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,0,1,1,0,1,0,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,0,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,0,1,1,0,1,0,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,1,0,0,1,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,1,0,1,0,1,1,1,1,1,1,1],
  ];

  return (
    <svg viewBox="0 0 22 22" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {grid.map((row, rIdx) =>
        row.map((cell, cIdx) =>
          cell === 1 ? (
            <rect
              key={`${rIdx}-${cIdx}`}
              x={cIdx}
              y={rIdx}
              width="1"
              height="1"
              rx="0.12"
            />
          ) : null
        )
      )}
    </svg>
  );
}

function DemoApplyJob({
  currentStepIdx,
  completedSteps,
  isProcessingAction,
  setIsProcessingAction,
  advanceStep,
  addLog,
  isSuccess,
  playTingTingSound,
  onServerProgressChange,
  onSsiModeChange
}: DemoApplyJobProps) {
  const { language } = useLanguage();
  const translations = getLocalizedRecord(
    APPLY_JOB_DEMO_PAGE_TRANSLATIONS,
    language as keyof typeof APPLY_JOB_DEMO_PAGE_TRANSLATIONS,
    'APPLY_JOB_DEMO_PAGE_TRANSLATIONS',
  );
  const t = translations.scenario;
  const bankT = translations.bankModal;
  const logT = translations.logs;
  const uiT = translations.flowUi;

  // Scenario states
  const [jobName, setJobName] = useState('');
  const [jobEmail, setJobEmail] = useState('');
  const [jobPhone, setJobPhone] = useState('');
  const [jobSsn, setJobSsn] = useState('');
  const [jobDegree, setJobDegree] = useState('');
  const [jobCerts, setJobCerts] = useState<CandidateCert[]>([]);
  const [newCertTitle, setNewCertTitle] = useState('');
  const [newCertUrl, setNewCertUrl] = useState('');

  const [jobExp, setJobExp] = useState(uiT.defaultExperience);
  const [jobGithub, setJobGithub] = useState('github.com/candidate-golang');

  const [error, setError] = useState<string | null>(null);

  // Automated Step 2 Server Simulation States
  const [step2Seconds, setStep2Seconds] = useState(8);
  const [serverCheckProgress, setServerCheckProgress] = useState(0);
  const [step2Status, setStep2Status] = useState<'idle' | 'running' | 'passed'>('idle');
  const [autoAdvanceSeconds, setAutoAdvanceSeconds] = useState(5);

  // Identra eID scan state
  const [isCryptographicallySecured, setIsCryptographicallySecured] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [qrSeconds, setQrSeconds] = useState(5);

  const step2RanRef = useRef(false);

  // Trigger & execute Step 2 Automated Server Verification in sync with Left Panel UI
  useEffect(() => {
    if (currentStepIdx !== 1 || completedSteps[1]) {
      step2RanRef.current = false;
      return;
    }

    if (step2RanRef.current) return;
    step2RanRef.current = true;

    setStep2Status('running');
    setIsProcessingAction(true);
    setStep2Seconds(10);
    setServerCheckProgress(0);
    if (onServerProgressChange) onServerProgressChange(0);

    addLog(uiT.serverInitLog, 'system');
    addLog(uiT.identityCheckStartedLog, 'processing');

    let secLeft = 10;
    const interval = setInterval(() => {
      secLeft -= 1;
      setStep2Seconds(secLeft);
      const progress = Math.min(100, Math.round(((10 - secLeft) / 10) * 100));
      setServerCheckProgress(progress);
      if (onServerProgressChange) onServerProgressChange(progress);

      if (secLeft === 9) {
        addLog(uiT.identitySyntheticLog, 'action');
      } else if (secLeft === 8) {
        addLog(uiT.identityWorkAuthCompleteLog, 'ok');
      } else if (secLeft === 7) {
        addLog(isCryptographicallySecured ? uiT.ssiCredentialLog : uiT.manualDegreeRegistryLog, 'action');
      } else if (secLeft === 6) {
        addLog(isCryptographicallySecured ? uiT.ssiDidLog : uiT.manualGraduateRecordLog, 'data');
      } else if (secLeft === 5) {
        addLog(isCryptographicallySecured ? uiT.ssiZkpLog : uiT.manualCertificateUrlLog, 'data');
      } else if (secLeft === 4) {
        addLog(uiT.credentialChecksCompleteLog, 'ok');
      } else if (secLeft === 3) {
        addLog(uiT.backgroundRecordLog, 'action');
      } else if (secLeft === 2) {
        addLog(uiT.backgroundWatchlistLog, 'data');
      } else if (secLeft === 1) {
        addLog(uiT.backgroundCleanLog, 'ok');
      } else if (secLeft <= 0) {
        clearInterval(interval);
        setStep2Status('passed');
        setServerCheckProgress(100);
        setIsProcessingAction(false);
        if (playTingTingSound) playTingTingSound();

        addLog(uiT.serverCompleteLog, 'ok');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentStepIdx, completedSteps]);

  // Handle 5-second automatic step advancement after Step 2 server verification finishes
  useEffect(() => {
    if (step2Status !== 'passed' || currentStepIdx !== 1) return;

    setAutoAdvanceSeconds(5);
    const autoTimer = setInterval(() => {
      setAutoAdvanceSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(autoTimer);
          advanceStep([
            isCryptographicallySecured
              ? uiT.autoAdvanceSsiLog
              : uiT.autoAdvanceManualLog
          ]);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(autoTimer);
  }, [step2Status, currentStepIdx, isCryptographicallySecured, advanceStep, uiT]);

  // Automatically trigger Audit Summary Modal 1.2s after landing on Step 3
  useEffect(() => {
    if (currentStepIdx === 2 && !completedSteps[2]) {
      const timer = setTimeout(() => {
        advanceStep([
          uiT.auditSummaryAutoLog
        ]);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [currentStepIdx, completedSteps, advanceStep, uiT]);

  // Start 5-second QR Modal Simulation
  const startQrScanModal = () => {
    setIsQrModalOpen(true);
    setQrSeconds(5);
    addLog(uiT.qrApplyStartedLog, 'processing');
  };

  // Handle 5-second QR scanning countdown
  useEffect(() => {
    if (!isQrModalOpen) return;

    if (qrSeconds <= 0) {
      setIsQrModalOpen(false);
      setJobName(uiT.qrName);
      setJobEmail(uiT.qrEmail);
      setJobPhone(uiT.qrPhone);
      setJobSsn(uiT.qrIdentityNumber);
      setJobDegree(uiT.qrDegree);
      setJobCerts([
        { title: 'Certified Kubernetes Administrator (CKA)', url: 'https://credly.com/org/cncf/badge/cka-9481' },
        { title: 'AWS Certified Solutions Architect', url: 'https://aws.amazon.com/verification/AWS-74891' },
        { title: 'Certified Golang Systems Architect', url: 'https://identra.io/credentials/cert-golang-812' }
      ]);
      setJobExp(uiT.qrExperience);
      setJobGithub(uiT.qrGithub);
      setIsCryptographicallySecured(true);
      if (onSsiModeChange) onSsiModeChange(true);
      setError(null);
      addLog(uiT.qrApplySuccessLog, 'ok');
      return;
    }

    const timer = setTimeout(() => {
      setQrSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isQrModalOpen, qrSeconds, addLog, uiT]);

  // Reset internal states when currentStepIdx is reset
  useEffect(() => {
    if (currentStepIdx === 0) {
      setJobName('');
      setJobEmail('');
      setJobPhone('');
      setJobSsn('');
      setJobDegree('');
      setJobCerts([]);
      setNewCertTitle('');
      setNewCertUrl('');
      setJobExp(uiT.defaultExperience);
      setJobGithub('github.com/candidate-golang');
      setStep2Seconds(8);
      setStep2Status('idle');
      setServerCheckProgress(0);
      setError(null);
      setIsQrModalOpen(false);
      setQrSeconds(5);
      setIsCryptographicallySecured(false);
      if (onSsiModeChange) onSsiModeChange(false);
    } else {
      setError(null);
    }
  }, [currentStepIdx]);

  return (
    <div className="space-y-6 flex-1 flex flex-col justify-between">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-[#354CE1]" />
          <span className="font-bold tracking-tight text-slate-800">{t.headerTitle}</span>
        </div>
        <span className="text-xs bg-emerald-50 text-emerald-600 border border-emerald-100/60 px-2.5 py-0.5 rounded-full font-bold">
          {t.identraVerified}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {/* STEP 1: Awncorp Backend Engineer Golang Job Application Portal */}
        {currentStepIdx === 0 && !completedSteps[0] && (
          <motion.div key="job-form" className="space-y-5">
            {/* Awncorp Recruitment Job Banner */}
            <div className="rounded-3xl border border-indigo-100 bg-gradient-to-b from-[#1E43D8] to-[#142FA0] p-5 text-white shadow-xl relative overflow-hidden space-y-3">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#354CE1]/20 rounded-bl-full blur-xl pointer-events-none" />
              <div className="flex items-center justify-between z-10 relative">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center font-bold text-white text-base">
                    A
                  </div>
                  <div>
                    <h3 className="font-bold text-sm tracking-wide text-white">{uiT.awncorpHeader}</h3>
                    <p className="text-[11px] text-indigo-200">{uiT.teamSubtitle}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                  {uiT.hiringNow}
                </span>
              </div>

              <div className="space-y-1 z-10 relative pt-1">
                <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-amber-400 shrink-0" />
                  <span>{uiT.jobRoleTitle}</span>
                </h2>
                <div className="flex flex-wrap gap-2 pt-1 text-[10px] font-mono text-indigo-200">
                  <span className="bg-white/10 px-2.5 py-0.5 rounded-md border border-white/10">{uiT.fullTimeBadge}</span>
                  <span className="bg-white/10 px-2.5 py-0.5 rounded-md border border-white/10">{uiT.hybridBadge}</span>
                  <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-md border border-emerald-500/30">{uiT.salaryBadge}</span>
                  <span className="bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-md border border-amber-500/30">{uiT.seniorLevelBadge}</span>
                </div>
              </div>
            </div>

            {/* 1-Click Application Banner with Identra QR */}
            <div className="rounded-2xl border border-indigo-200/80 bg-gradient-to-br from-[#E2E6FF] to-[#FAFBFD] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
              <div className="flex items-center gap-3.5">
                <div className="h-14 w-14 bg-white p-1.5 rounded-xl border border-indigo-100 shadow-xs shrink-0 flex items-center justify-center relative group">
                  <RealQrCode className="h-10 w-10 text-[#354CE1]" />
                  <div className="absolute inset-0 bg-[#354CE1]/5 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Sparkles className="h-4 w-4 text-[#354CE1] animate-spin" />
                  </div>
                </div>
                <div className="space-y-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="font-bold text-xs text-slate-900">{uiT.applyWithIdentra}</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#354CE1] text-[9px] font-bold text-white font-mono uppercase tracking-wider">
                      {uiT.oneClickAutofillBadge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {uiT.applyIdentraDesc}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={startQrScanModal}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-indigo-50 border border-[#354CE1]/30 text-[#354CE1] text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer hover:border-[#354CE1] active:scale-[0.98]"
              >
                <RealQrCode className="h-3.5 w-3.5 text-[#354CE1]" />
                <span>{uiT.scanQrAutofill}</span>
              </button>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="bg-rose-50 text-rose-600 border border-rose-100 p-3 rounded-xl text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Cryptographically Secured Candidate Profile Banner */}
            {isCryptographicallySecured && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-50 border border-emerald-200/80 p-3.5 rounded-2xl flex flex-wrap items-center justify-between gap-2 text-xs shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                  <span className="font-bold text-emerald-950">{uiT.candidateProfileSecured}</span>
                </div>
                <span className="font-mono text-[10px] bg-emerald-600 text-white px-2.5 py-0.5 rounded-full font-bold shadow-2xs">
                  {uiT.cryptoVerifiedShort}
                </span>
              </motion.div>
            )}

            {/* Job Application Input Fields */}
            <div className={`space-y-4 rounded-2xl border bg-white p-4 sm:p-5 shadow-xs transition-all ${
              isCryptographicallySecured ? 'border-emerald-300 ring-1 ring-emerald-300/40 bg-emerald-50/10' : 'border-slate-200/80'
            }`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">{t.candidateName}</label>
                    {isCryptographicallySecured && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-mono font-bold bg-emerald-100/80 px-1.5 py-0.5 rounded border border-emerald-300/60">
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        {uiT.cryptoVerifiedPill}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={jobName}
                      onChange={(e) => {
                        if (!isCryptographicallySecured) {
                          setError(null);
                          setJobName(e.target.value);
                        }
                      }}
                      readOnly={isCryptographicallySecured}
                      disabled={isProcessingAction}
                      placeholder={uiT.candidateNamePlaceholder}
                      className={`w-full bg-white border rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20 font-medium disabled:opacity-60 disabled:bg-slate-50 disabled:cursor-not-allowed transition-all ${
                        error && !jobName.trim() ? 'border-rose-300 focus:ring-rose-200' : isCryptographicallySecured ? 'bg-emerald-50/30 border-emerald-300 text-emerald-950 font-bold cursor-not-allowed' : 'border-slate-200'
                      }`}
                    />
                    {isCryptographicallySecured && (
                      <Lock className="h-3.5 w-3.5 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">{t.workingIdentityNumber}</label>
                    {isCryptographicallySecured && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-mono font-bold bg-emerald-100/80 px-1.5 py-0.5 rounded border border-emerald-300/60">
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        {uiT.cryptoVerifiedPill}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={jobSsn}
                      onChange={(e) => {
                        if (!isCryptographicallySecured) {
                          setError(null);
                          setJobSsn(e.target.value);
                        }
                      }}
                      readOnly={isCryptographicallySecured}
                      disabled={isProcessingAction}
                      placeholder="012398765432"
                      className={`w-full bg-white border rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20 font-mono disabled:opacity-60 disabled:bg-slate-50 disabled:cursor-not-allowed transition-all ${
                        isCryptographicallySecured ? 'bg-emerald-50/30 border-emerald-300 text-emerald-950 font-bold cursor-not-allowed' : 'border-slate-200'
                      }`}
                    />
                    {isCryptographicallySecured && (
                      <Lock className="h-3.5 w-3.5 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">{uiT.candidateEmail}</label>
                    {isCryptographicallySecured && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-mono font-bold bg-emerald-100/80 px-1.5 py-0.5 rounded border border-emerald-300/60">
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        {uiT.cryptoVerifiedPill}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      value={jobEmail}
                      onChange={(e) => {
                        if (!isCryptographicallySecured) setJobEmail(e.target.value);
                      }}
                      readOnly={isCryptographicallySecured}
                      disabled={isProcessingAction}
                      placeholder={uiT.candidateEmailPlaceholder}
                      className={`w-full bg-white border rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20 font-medium disabled:opacity-60 disabled:bg-slate-50 transition-all ${
                        isCryptographicallySecured ? 'bg-emerald-50/30 border-emerald-300 text-emerald-950 font-bold cursor-not-allowed' : 'border-slate-200'
                      }`}
                    />
                    {isCryptographicallySecured && (
                      <Lock className="h-3.5 w-3.5 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">{uiT.candidatePhone}</label>
                    {isCryptographicallySecured && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-mono font-bold bg-emerald-100/80 px-1.5 py-0.5 rounded border border-emerald-300/60">
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        {uiT.cryptoVerifiedPill}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={jobPhone}
                      onChange={(e) => {
                        if (!isCryptographicallySecured) setJobPhone(e.target.value);
                      }}
                      readOnly={isCryptographicallySecured}
                      disabled={isProcessingAction}
                      placeholder={uiT.candidatePhonePlaceholder}
                      className={`w-full bg-white border rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20 font-mono disabled:opacity-60 disabled:bg-slate-50 transition-all ${
                        isCryptographicallySecured ? 'bg-emerald-50/30 border-emerald-300 text-emerald-950 font-bold cursor-not-allowed' : 'border-slate-200'
                      }`}
                    />
                    {isCryptographicallySecured && (
                      <Lock className="h-3.5 w-3.5 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">{uiT.academicDegree}</label>
                  {isCryptographicallySecured && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-mono font-bold bg-emerald-100/80 px-1.5 py-0.5 rounded border border-emerald-300/60">
                      <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                      {uiT.cryptoVerifiedPill}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={jobDegree}
                    onChange={(e) => {
                      if (!isCryptographicallySecured) {
                        setError(null);
                        setJobDegree(e.target.value);
                      }
                    }}
                    readOnly={isCryptographicallySecured}
                    disabled={isProcessingAction}
                    placeholder={uiT.academicDegreePlaceholder}
                    className={`w-full bg-white border rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20 font-medium disabled:opacity-60 disabled:bg-slate-50 transition-all ${
                      error && !jobDegree.trim() ? 'border-rose-300 ring-2 ring-rose-200' : isCryptographicallySecured ? 'bg-emerald-50/30 border-emerald-300 text-emerald-950 font-bold cursor-not-allowed' : 'border-slate-200'
                    }`}
                  />
                  {isCryptographicallySecured && (
                    <Lock className="h-3.5 w-3.5 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  )}
                </div>
              </div>

              {/* Relevant Professional Certificates List & Add Control */}
              <div className="space-y-3 pt-1 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">{uiT.relevantCertificates}</label>
                  <span className="text-[10px] text-slate-400 font-mono font-bold">
                    {formatText(uiT.certificatesAdded, { count: jobCerts.length })}
                  </span>
                </div>

                {/* Added Certificates Cards List */}
                {jobCerts.length > 0 && (
                  <div className="space-y-2">
                    {jobCerts.map((cert, cIdx) => (
                      <div
                        key={cIdx}
                        className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 text-xs font-semibold shadow-2xs transition-all ${
                          isCryptographicallySecured
                            ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                            : 'bg-indigo-50/50 border-indigo-200/80 text-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={`p-1.5 rounded-lg shrink-0 ${isCryptographicallySecured ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-[#354CE1]'}`}>
                            <Award className="h-4 w-4" />
                          </div>
                          <div className="min-w-0 space-y-0.5">
                            <h5 className="font-bold text-xs truncate text-slate-900">{cert.title}</h5>
                            {cert.url && (
                              <a
                                href={cert.url.startsWith('http') ? cert.url : `https://${cert.url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] text-[#354CE1] hover:underline font-mono font-medium truncate max-w-[240px]"
                              >
                                <Globe className="h-3 w-3 shrink-0" />
                                <span className="truncate">{cert.url}</span>
                                <ExternalLink className="h-2.5 w-2.5 shrink-0" />
                              </a>
                            )}
                          </div>
                        </div>

                        {isCryptographicallySecured ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 font-bold shrink-0">
                            <Lock className="h-3 w-3 text-emerald-600" />
                            {uiT.verifiedShort}
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setJobCerts(prev => prev.filter((_, idx) => idx !== cIdx));
                            }}
                            className="h-7 w-7 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Dual Inputs to add custom certificate with Title and Verification Link */}
                {!isCryptographicallySecured && (
                  <div className="space-y-2 p-3 bg-slate-50/70 border border-slate-200/80 rounded-xl">
                    <div className="space-y-1.5">
                      <div className="relative">
                        <Award className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                        <input
                          type="text"
                          value={newCertTitle}
                          onChange={(e) => setNewCertTitle(e.target.value)}
                          placeholder={uiT.certTitlePlaceholder}
                          className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20"
                        />
                      </div>

                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                        <input
                          type="text"
                          value={newCertUrl}
                          onChange={(e) => setNewCertUrl(e.target.value)}
                          placeholder={uiT.certUrlPlaceholder}
                          className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs font-mono text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (newCertTitle.trim()) {
                          setJobCerts(prev => [...prev, { title: newCertTitle.trim(), url: newCertUrl.trim() }]);
                          setNewCertTitle('');
                          setNewCertUrl('');
                        }
                      }}
                      disabled={!newCertTitle.trim()}
                      className="w-full py-2 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>{uiT.addCertificate}</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">{uiT.golangExperience}</label>
                  <div className="relative">
                    <FileCode className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={jobExp}
                      onChange={(e) => {
                        if (!isCryptographicallySecured) setJobExp(e.target.value);
                      }}
                      readOnly={isCryptographicallySecured}
                      disabled={isProcessingAction}
                      className={`w-full bg-white border rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20 font-medium disabled:opacity-60 disabled:bg-slate-50 transition-all ${
                        isCryptographicallySecured ? 'bg-emerald-50/30 border-emerald-300 text-emerald-950 font-bold cursor-not-allowed' : 'border-slate-200'
                      }`}
                    />
                    {isCryptographicallySecured && (
                      <Lock className="h-3.5 w-3.5 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">{uiT.githubPortfolioUrl}</label>
                  <div className="relative">
                    <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={jobGithub}
                      onChange={(e) => {
                        if (!isCryptographicallySecured) {
                          setError(null);
                          setJobGithub(e.target.value);
                        }
                      }}
                      readOnly={isCryptographicallySecured}
                      disabled={isProcessingAction}
                      className={`w-full bg-white border rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20 font-mono disabled:opacity-60 disabled:bg-slate-50 transition-all ${
                        error && !jobGithub.trim() ? 'border-rose-300 ring-2 ring-rose-200' : isCryptographicallySecured ? 'bg-emerald-50/30 border-emerald-300 text-emerald-950 font-bold cursor-not-allowed' : 'border-slate-200'
                      }`}
                    />
                    {isCryptographicallySecured && (
                      <Lock className="h-3.5 w-3.5 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Awncorp Submit Button with Strict Validation */}
            <button
              onClick={() => {
                // Strict Form & Format Validation
                if (!jobName.trim()) {
                  setError(uiT.validCandidateNameError);
                  return;
                }
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!jobEmail.trim() || !emailRegex.test(jobEmail.trim())) {
                  setError(uiT.validEmailError);
                  return;
                }
                const phoneDigits = jobPhone.replace(/\D/g, '');
                if (!jobPhone.trim() || phoneDigits.length < 9) {
                  setError(uiT.validPhoneError);
                  return;
                }
                if (!jobSsn.trim()) {
                  setError(uiT.validSsnError);
                  return;
                }
                if (!jobDegree.trim()) {
                  setError(uiT.validDegreeError);
                  return;
                }
                if (!jobGithub.trim()) {
                  setError(uiT.githubPortfolioError);
                  return;
                }

                setError(null);
                setIsProcessingAction(true);
                addLog(formatText(logT.vettingSocialSecurity, { name: jobName.trim() }), 'action');
                setTimeout(() => {
                  setIsProcessingAction(false);
                  advanceStep([
                    formatText(logT.identityDatabaseComplete, { name: jobName.trim() }),
                  ]);
                }, 1200);
              }}
              disabled={isProcessingAction}
              className={`w-full py-3.5 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 ${
                isProcessingAction
                  ? 'opacity-60 cursor-not-allowed bg-[#354CE1]/60'
                  : 'bg-[#354CE1] hover:bg-[#2539BE] cursor-pointer shadow-lg shadow-[#354CE1]/20 active:scale-[0.99]'
              }`}
            >
              {isProcessingAction ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Code2 className="h-4 w-4 text-amber-400" />
                  <span>{uiT.submitJobApplication}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </motion.div>
        )}

        {/* STEP 2: Automated Server-side Credentials & Degree Verification */}
        {currentStepIdx === 1 && !completedSteps[1] && (
          <motion.div key="job-license" className="space-y-5">
            {/* Header info box */}
            <div className={`p-4 rounded-2xl border text-xs space-y-1 ${
              isCryptographicallySecured
                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                : 'bg-[#354CE1]/5 border-indigo-100/60 text-indigo-950'
            }`}>
              <div className="flex items-center gap-2 font-bold">
                <Server className={`h-4 w-4 ${isCryptographicallySecured ? 'text-emerald-600' : 'text-[#354CE1]'}`} />
                <span>
                  {isCryptographicallySecured ? uiT.ssiServerTitle : uiT.manualServerTitle}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {isCryptographicallySecured ? uiT.ssiModeDescription : uiT.manualModeDescription}
              </p>
            </div>

            {/* Server Automated Verification Status Card */}
            <div className="bg-slate-900 rounded-3xl p-5 md:p-6 border border-slate-800 text-white shadow-xl space-y-5 relative overflow-hidden">
              {/* Background glow */}
              <div className={`absolute top-0 right-0 w-36 h-36 rounded-full blur-2xl pointer-events-none ${
                isCryptographicallySecured ? 'bg-emerald-500/20' : 'bg-[#354CE1]/20'
              }`} />

              {/* Status Header */}
              <div className="flex items-center justify-between z-10 relative">
                <div className="flex items-center gap-2.5">
                  <div className={`h-3 w-3 rounded-full animate-ping ${isCryptographicallySecured ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                  <span className={`font-mono text-xs font-bold uppercase tracking-wider ${isCryptographicallySecured ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {isCryptographicallySecured ? uiT.ssiEngineLabel : uiT.manualEngineLabel}
                  </span>
                </div>
                <div className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[11px] font-bold flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 text-amber-400 animate-spin" />
                  <span>{step2Seconds}s</span>
                </div>
              </div>

              {/* Server Animated Progress Bar */}
              <div className="space-y-1.5 z-10 relative">
                <div className="flex justify-between text-xs font-mono text-slate-400 font-bold">
                  <span>
                    {formatText(uiT.serverProgressLabel, { mode: isCryptographicallySecured ? uiT.ssiProtocol : uiT.restApi })}
                  </span>
                  <span className="text-emerald-400">{serverCheckProgress}%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                  <motion.div
                    className={`h-full rounded-full ${
                      isCryptographicallySecured
                        ? 'bg-gradient-to-r from-emerald-500 via-emerald-400 to-[#FFBF43]'
                        : 'bg-gradient-to-r from-[#354CE1] via-indigo-400 to-emerald-400'
                    }`}
                    initial={{ width: '0%' }}
                    animate={{ width: `${serverCheckProgress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* 3-Section Verification Modules Checklist */}
              <div className="space-y-4 pt-1 z-10 relative text-xs font-mono">
                {/* SECTION 1: Legal Identity Verification */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2.5">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-4 w-4 text-emerald-400" />
                      <span className="font-bold text-slate-200 text-[11px]">{uiT.legalIdentitySectionTitle}</span>
                    </div>
                    {serverCheckProgress >= 30 ? (
                      <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">{uiT.passedShort}</span>
                    ) : (
                      <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 animate-pulse">{uiT.reviewingStatus}</span>
                    )}
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className={`flex items-center gap-2 ${serverCheckProgress >= 10 ? 'text-emerald-400 font-medium' : 'text-slate-500'}`}>
                      {serverCheckProgress >= 10 ? <CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> : <div className="h-3.5 w-3.5 border border-slate-600 rounded-full shrink-0" />}
                      <span>{uiT.legalIdentityCheck1}</span>
                    </div>
                    <div className={`flex items-center gap-2 ${serverCheckProgress >= 20 ? 'text-emerald-400 font-medium' : 'text-slate-500'}`}>
                      {serverCheckProgress >= 20 ? <CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> : <div className="h-3.5 w-3.5 border border-slate-600 rounded-full shrink-0" />}
                      <span>{uiT.legalIdentityCheck2}</span>
                    </div>
                    <div className={`flex items-center gap-2 ${serverCheckProgress >= 30 ? 'text-emerald-400 font-medium' : 'text-slate-500'}`}>
                      {serverCheckProgress >= 30 ? <CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> : <div className="h-3.5 w-3.5 border border-slate-600 rounded-full shrink-0" />}
                      <span>{uiT.legalIdentityCheck3}</span>
                    </div>
                  </div>
                </div>

                {/* SECTION 2: Degree & Credentials Verification */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2.5">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-emerald-400" />
                      <span className="font-bold text-slate-200 text-[11px]">{uiT.credentialSectionTitle}</span>
                    </div>
                    {serverCheckProgress >= 60 ? (
                      <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">{uiT.passedShort}</span>
                    ) : serverCheckProgress >= 30 ? (
                      <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 animate-pulse">{uiT.reviewingStatus}</span>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-500">{uiT.waitingReviewStatus}</span>
                    )}
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    {isCryptographicallySecured ? (
                      <>
                        <div className={`flex items-center gap-2 ${serverCheckProgress >= 40 ? 'text-emerald-400 font-medium' : 'text-slate-500'}`}>
                          {serverCheckProgress >= 40 ? <CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> : <div className="h-3.5 w-3.5 border border-slate-600 rounded-full shrink-0" />}
                          <span>{uiT.ssiCredentialCheck1}</span>
                        </div>
                        <div className={`flex items-center gap-2 ${serverCheckProgress >= 50 ? 'text-emerald-400 font-medium' : 'text-slate-500'}`}>
                          {serverCheckProgress >= 50 ? <CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> : <div className="h-3.5 w-3.5 border border-slate-600 rounded-full shrink-0" />}
                          <span>{uiT.ssiCredentialCheck2}</span>
                        </div>
                        <div className={`flex items-center gap-2 ${serverCheckProgress >= 60 ? 'text-emerald-400 font-bold' : 'text-slate-500'}`}>
                          {serverCheckProgress >= 60 ? <CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> : <div className="h-3.5 w-3.5 border border-slate-600 rounded-full shrink-0" />}
                          <span>{uiT.ssiCredentialCheck3}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={`flex items-center gap-2 ${serverCheckProgress >= 40 ? 'text-emerald-400 font-medium' : 'text-slate-500'}`}>
                          {serverCheckProgress >= 40 ? <CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> : <div className="h-3.5 w-3.5 border border-slate-600 rounded-full shrink-0" />}
                          <span>{uiT.manualCredentialCheck1}</span>
                        </div>
                        <div className={`flex items-center gap-2 ${serverCheckProgress >= 50 ? 'text-emerald-400 font-medium' : 'text-slate-500'}`}>
                          {serverCheckProgress >= 50 ? <CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> : <div className="h-3.5 w-3.5 border border-slate-600 rounded-full shrink-0" />}
                          <span>{uiT.manualCredentialCheck2}</span>
                        </div>
                        <div className={`flex items-center gap-2 ${serverCheckProgress >= 60 ? 'text-emerald-400 font-bold' : 'text-slate-500'}`}>
                          {serverCheckProgress >= 60 ? <CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> : <div className="h-3.5 w-3.5 border border-slate-600 rounded-full shrink-0" />}
                          <span>{uiT.manualCredentialCheck3}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* SECTION 3: National Background Check */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2.5">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-indigo-400" />
                      <span className="font-bold text-slate-200 text-[11px]">{uiT.backgroundSectionTitle}</span>
                    </div>
                    {serverCheckProgress >= 100 ? (
                      <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">{uiT.passedShort}</span>
                    ) : serverCheckProgress >= 60 ? (
                      <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 animate-pulse">{uiT.backgroundReviewingStatus}</span>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-500">{uiT.backgroundWaitingStatus}</span>
                    )}
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className={`flex items-center gap-2 ${serverCheckProgress >= 75 ? 'text-emerald-400 font-medium' : 'text-slate-500'}`}>
                      {serverCheckProgress >= 75 ? <CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> : <div className="h-3.5 w-3.5 border border-slate-600 rounded-full shrink-0" />}
                      <span>{uiT.backgroundCheck1}</span>
                    </div>
                    <div className={`flex items-center gap-2 ${serverCheckProgress >= 90 ? 'text-emerald-400 font-medium' : 'text-slate-500'}`}>
                      {serverCheckProgress >= 90 ? <CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> : <div className="h-3.5 w-3.5 border border-slate-600 rounded-full shrink-0" />}
                      <span>{uiT.backgroundCheck2}</span>
                    </div>
                    <div className={`flex items-center gap-2 ${serverCheckProgress >= 100 ? 'text-emerald-400 font-bold' : 'text-slate-500'}`}>
                      {serverCheckProgress >= 100 ? <CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> : <div className="h-3.5 w-3.5 border border-slate-600 rounded-full shrink-0" />}
                      <span>{uiT.backgroundCheck3}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Auto-completing Procedures Banner (replaces manual button) */}
            {serverCheckProgress >= 100 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-950/80 border border-emerald-500/40 rounded-2xl p-4 text-center space-y-2 relative overflow-hidden shadow-lg shadow-emerald-950/50"
              >
                <div className="flex items-center justify-center gap-2.5 text-emerald-400 font-bold text-xs uppercase tracking-wider font-mono">
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-400 shrink-0" />
                  <span>{uiT.autoTransferStatus}</span>
                </div>
                <p className="text-[11px] text-slate-300 font-mono">
                  {formatText(uiT.autoTransferDetail, { seconds: autoAdvanceSeconds })}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* STEP 3: Authentic Corporate Recruitment Success Confirmation Screen */}
        {(currentStepIdx === 2 || isSuccess) && (
          <motion.div
            key="job-success-verdict"
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="space-y-6 text-center py-2"
          >
            {/* Success Badge Icon */}
            <div className="h-16 w-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 ring-8 ring-emerald-50/80">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            {/* Confirmation Title & Description */}
            <div className="space-y-2 max-w-lg mx-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full uppercase tracking-wider border border-emerald-100 font-mono">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                {uiT.successBadge}
              </span>
              <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
                {uiT.successTitle}
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                {formatText(uiT.successDescription, { role: uiT.jobRoleTitle })}
              </p>
            </div>

            {/* Application Details Summary Block */}
            <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 text-left space-y-3 text-xs max-w-lg mx-auto font-sans">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                <span className="font-bold text-slate-900 text-xs flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#354CE1]" />
                  {uiT.applicationSummaryTitle}
                </span>
                <span className="text-[10px] font-mono text-slate-600 font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
                  {uiT.applicationIdLabel} #AWN-2026-98412
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11.5px]">
                <div>
                  <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider">{uiT.candidateNameSummaryLabel}</span>
                  <span className="font-bold text-slate-900">{jobName || uiT.qrName}</span>
                </div>
                <div>
                  <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider">{uiT.jobRoleSummaryLabel}</span>
                  <span className="font-semibold text-slate-800">{uiT.jobRoleTitle}</span>
                </div>
                <div>
                  <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider">{uiT.contactEmailSummaryLabel}</span>
                  <span className="font-mono text-slate-700">{jobEmail || uiT.qrEmail}</span>
                </div>
                <div>
                  <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider">{uiT.phoneSummaryLabel}</span>
                  <span className="font-mono text-slate-700">{jobPhone || uiT.qrPhone}</span>
                </div>
              </div>

              {/* Identra Verification Status Badge */}
              <div className="pt-2 border-t border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className={`w-4 h-4 ${isCryptographicallySecured ? 'text-emerald-600' : 'text-amber-500'}`} />
                  <span className="text-[11px] font-medium text-slate-700">
                    {uiT.idvSummaryLabel}
                  </span>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10.5px] font-bold font-mono border ${
                  isCryptographicallySecured
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                  {isCryptographicallySecured ? uiT.ssiTrustStatus : uiT.manualTrustStatus}
                </span>
              </div>
            </div>

            {/* Corporate Next Steps Timeline */}
            <div className="max-w-lg mx-auto text-left space-y-3">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                {uiT.nextStepsTitle}
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-3 p-3 bg-emerald-50/60 rounded-xl border border-emerald-100/80 text-emerald-900">
                  <div className="h-5 w-5 rounded-full bg-emerald-500 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">✓</div>
                  <div>
                    <span className="font-bold block text-slate-900">{uiT.nextStep1Title}</span>
                    <span className="text-[11px] text-slate-600">{uiT.nextStep1Desc}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50/80 rounded-xl border border-slate-200/70 text-slate-700">
                  <div className="h-5 w-5 rounded-full bg-slate-200 text-slate-600 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</div>
                  <div>
                    <span className="font-bold block text-slate-900">{uiT.nextStep2Title}</span>
                    <span className="text-[11px] text-slate-500">{uiT.nextStep2Desc}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50/80 rounded-xl border border-slate-200/70 text-slate-700">
                  <div className="h-5 w-5 rounded-full bg-slate-200 text-slate-600 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</div>
                  <div>
                    <span className="font-bold block text-slate-900">{uiT.nextStep3Title}</span>
                    <span className="text-[11px] text-slate-500">{uiT.nextStep3Desc}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Audit Summary Modal Launcher Action Button */}
            <div className="max-w-lg mx-auto pt-1">
              <button
                onClick={() => {
                  advanceStep([
                    uiT.auditSummaryUserLog
                  ]);
                }}
                className="w-full py-3.5 px-4 bg-white hover:bg-slate-50 text-[#354CE1] font-bold text-xs rounded-xl transition-all border border-indigo-200/80 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <FileCode className="w-4 h-4 text-[#354CE1]" />
                <span>{uiT.auditReportButton}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="border-t border-slate-200/60 pt-4 flex items-center gap-2 text-[11px] text-slate-500 justify-center">
        <Briefcase className="w-4 h-4 text-[#354CE1]" />
        <span>{t.footer}</span>
      </div>

      {/* 5-Second QR Scanning Modal Popup */}
      <AnimatePresence>
        {isQrModalOpen && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative space-y-5"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-xl bg-[#354CE1]/10 flex items-center justify-center text-[#354CE1]">
                    <QrCode className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-sm sm:text-base">
                      {bankT.scanQrModalTitle}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {uiT.qrHandshakeSubtitle}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsQrModalOpen(false)}
                  className="h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* QR Code Display Box (Sleek & Minimalist) */}
              <div className="flex flex-col items-center space-y-4 py-2">
                <div className="relative p-4 bg-[#FAFBFD] rounded-2xl border border-slate-200/90 shadow-xs flex flex-col items-center justify-center overflow-hidden">
                  {/* Sleek Laser Scan Line */}
                  <motion.div
                    initial={{ top: '5%' }}
                    animate={{ top: ['5%', '92%', '5%'] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                    className="absolute inset-x-3 h-0.5 bg-gradient-to-r from-transparent via-[#354CE1] to-transparent shadow-[0_0_10px_#354CE1] z-20"
                  />

                  {/* Crisp Clean QR Graphic */}
                  <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-xs">
                    <RealQrCode className="h-48 w-48 text-[#0F1E36]" />
                  </div>
                </div>

                {/* Soft Countdown Status Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#354CE1]/10 border border-[#354CE1]/20 text-[#354CE1] text-xs font-mono font-bold">
                  <Sparkles className="h-3.5 w-3.5 animate-spin text-[#354CE1]" />
                  <span>{bankT.waitingForScan.replace('{seconds}', qrSeconds.toString())}</span>
                </div>

                <p className="text-xs text-slate-500 text-center leading-relaxed px-2">
                  {bankT.qrModalInstructions}
                </p>
              </div>

              {/* Modal Footer Cancel Button */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setIsQrModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  {bankT.cancelButton}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface DemoScenarioPageProps {
  onBackToList: () => void;
}

interface ScenarioStep {
  label: string;
  action: string;
  logText: string;
}

interface ScenarioCopy {
  id: DemoScenarioId;
  tag: string;
  title: string;
  desc: string;
  security: string;
  successResult: string;
  steps: ScenarioStep[];
}

interface Scenario extends ScenarioCopy {
  icon: React.ComponentType<any>;
}

const formatText = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ''));

export default function ApplyJobDemoPage({ onBackToList }: DemoScenarioPageProps) {
  const { language } = useLanguage();
  const translations = getLocalizedRecord(
    APPLY_JOB_DEMO_PAGE_TRANSLATIONS,
    language as keyof typeof APPLY_JOB_DEMO_PAGE_TRANSLATIONS,
    'APPLY_JOB_DEMO_PAGE_TRANSLATIONS',
  );
  const t = translations.page;
  const scenario = useMemo<Scenario>(() => ({
    ...translations.meta,
    id: 'apply-job',
    icon: Briefcase,
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
  const [applyJobProgress, setApplyJobProgress] = useState<number>(0);
  const [applyJobIsSsiMode, setApplyJobIsSsiMode] = useState<boolean>(false);
  const isApplyJobScenario = scenario.id === 'apply-job';
  const isApplyJobSsiMode = isApplyJobScenario && applyJobIsSsiMode;

  // Initialize terminal logs
  useEffect(() => {
    const title = scenario.title;
    setCurrentStepIdx(0);
    setCompletedSteps(new Array(scenario.steps.length).fill(false));
    setIsSuccess(false);
    setIsProcessingAction(false);
    setIsSummaryModalOpen(false);
    setApplyJobProgress(0);
    setApplyJobIsSsiMode(false);
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
    setApplyJobProgress(0);
    setApplyJobIsSsiMode(false);
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
                <DemoApplyJob
                  currentStepIdx={currentStepIdx}
                  completedSteps={completedSteps}
                  isProcessingAction={isProcessingAction}
                  setIsProcessingAction={setIsProcessingAction}
                  advanceStep={advanceStep}
                  addLog={addLog}
                  isSuccess={isSuccess}
                  playTingTingSound={playTingTingSound}
                    onServerProgressChange={setApplyJobProgress}
                    onSsiModeChange={setApplyJobIsSsiMode}
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
                    isApplyJobScenario
                      ? isApplyJobSsiMode
                        ? 'text-emerald-600'
                        : 'text-amber-600 font-bold'
                      : isSuccess ? 'text-emerald-600' : currentStepIdx > 1 ? 'text-emerald-500' : 'text-amber-500 animate-pulse'
                  }`}>
                    {isApplyJobScenario
                      ? isApplyJobSsiMode
                        ? t.applyJobRiskTrusted
                        : t.applyJobRiskNeedsReview
                      : isSuccess ? t.safeLow : t.evaluating}
                  </span>
                </div>
                <div className="border-x border-slate-200">
                  <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">{t.trustScore}</span>
                  <span className={`font-extrabold text-[11px] ${
                    isApplyJobScenario
                      ? isApplyJobSsiMode
                        ? 'text-emerald-600 font-mono'
                        : 'text-amber-600 font-mono'
                      : 'text-[#354CE1]'
                  }`}>
                    {isApplyJobScenario
                      ? isApplyJobSsiMode
                        ? '100%'
                        : '76.5%'
                      : isSuccess ? '99.9%' : `${88 + currentStepIdx * 4}%`}
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
                  let isActive = currentStepIdx === sIdx && !isSuccess;
                  let isDone = completedSteps[sIdx] || isSuccess;
                  let subChecks: string[] = [];
                  // For apply-job: 3 steps run sequentially during Step 2 server execution
                  if (scenario.id === 'apply-job') {
                    if (currentStepIdx === 0) { // Step 1: Candidate Form Entry
                      if (sIdx === 0) {
                        isActive = true;
                        isDone = false;
                      } else {
                        isActive = false;
                        isDone = false;
                      }
                    } else if (currentStepIdx === 1) { // Step 2: Server Verification Engine Running
                      if (sIdx === 0) { // Section 1: Legal Identity
                        if (applyJobProgress >= 30) {
                          isActive = false;
                          isDone = true;
                        } else {
                          isActive = true;
                          isDone = false;
                        }
                      } else if (sIdx === 1) { // Section 2: Degree & Credentials
                        if (applyJobProgress >= 70) {
                          isActive = false;
                          isDone = true;
                        } else if (applyJobProgress >= 30) {
                          isActive = true;
                          isDone = false;
                        } else {
                          isActive = false;
                          isDone = false;
                        }
                      } else if (sIdx === 2) { // Section 3: Background Check
                        if (applyJobProgress >= 100) {
                          isActive = false;
                          isDone = true;
                        } else if (applyJobProgress >= 70) {
                          isActive = true;
                          isDone = false;
                        } else {
                          isActive = false;
                          isDone = false;
                        }
                      }
                    } else if (isSuccess) {
                      isDone = true;
                      isActive = false;
                    } else if (currentStepIdx === 2) {
                      isDone = sIdx < 2;
                      isActive = sIdx === 2;
                    }

                    subChecks = t.subChecks[scenario.id]?.[sIdx] || [];
                  } else {
                    subChecks = t.subChecks[scenario.id]?.[sIdx] || [];
                  }

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
                              // Compute real-time sub-check progress matching applyJobProgress
                              let checkStatus: 'pending' | 'active' | 'done' = 'pending';
                              if (isDone) {
                                checkStatus = 'done';
                              } else if (scenario.id === 'apply-job' && currentStepIdx === 1) {
                                 if (sIdx === 0) {
                                  const target = (cIdx + 1) * 10;
                                  if (applyJobProgress >= target) checkStatus = 'done';
                                  else if (applyJobProgress >= target - 10) checkStatus = 'active';
                                  else checkStatus = 'pending';
                                } else if (sIdx === 1) {
                                  const target = cIdx === 0 ? 45 : cIdx === 1 ? 55 : 70;
                                  if (applyJobProgress >= target) checkStatus = 'done';
                                  else if (applyJobProgress >= (cIdx === 0 ? 30 : cIdx === 1 ? 45 : 55)) checkStatus = 'active';
                                  else checkStatus = 'pending';
                                } else if (sIdx === 2) {
                                  const target = 70 + (cIdx + 1) * 10;
                                  if (applyJobProgress >= target) checkStatus = 'done';
                                  else if (applyJobProgress >= target - 10) checkStatus = 'active';
                                  else checkStatus = 'pending';
                                }
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
            isSsiMode={isApplyJobSsiMode}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
