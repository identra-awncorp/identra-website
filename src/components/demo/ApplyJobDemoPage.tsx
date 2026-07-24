/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { AlertCircle, ArrowLeft, ArrowRight, Award, Briefcase, Building2, Check, CheckCircle2, Code2, ExternalLink, FileCode, Globe, GraduationCap, Loader2, Lock, Mail, Phone, Plus, QrCode, Server, ShieldCheck, Smartphone, Sparkles, Terminal, Trash2, User, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useManagedTimeouts, type ManagedTimeoutScheduler } from '../../hooks/useManagedTimeouts';
import { APPLY_JOB_DEMO_PAGE_TRANSLATIONS } from '../../translations/demo/ApplyJobDemoPageTranslations';
import type { DemoScenarioId } from '../../types/routes';
import { getLocalizedRecord } from '../../utils/i18nRuntime';
import {
  APPLY_JOB_IDENTRA_IDENTITY_NUMBER,
  getApplyJobFieldProvenance,
  getApplyJobVerificationOutcome,
  getApplyJobVerificationPlan,
  getApplyJobVerificationSnapshot,
  isCryptographicallyVerifiedField,
  validateApplyJobApplication,
  type ApplyJobFieldId,
  type ApplyJobMode,
  type ApplyJobStageId,
  type ApplyJobValidationError,
  type ApplyJobVerificationDetailId,
  type ApplyJobVerificationOutcome,
  type ApplyJobVerificationRunStatus,
  type ApplyJobVerificationSnapshot,
} from './ApplyJobDemoModel';
import DemoSummaryModal from './DemoSummaryModal';
import IdentityFlowGraph from './IdentityFlowGraph';

type ApplyJobTranslation = typeof APPLY_JOB_DEMO_PAGE_TRANSLATIONS.en;
type ApplyJobPageLogKey = keyof ApplyJobTranslation['page']['logs'];
type ApplyJobFlowUiKey = keyof ApplyJobTranslation['flowUi'];
type ApplyJobLogType = 'system' | 'action' | 'data' | 'ok' | 'processing';

type ApplyJobSimulationLog =
  | {
      scope: 'page';
      key: ApplyJobPageLogKey;
      type: ApplyJobLogType;
      values?: Record<string, string | number>;
    }
  | {
      scope: 'flow';
      key: ApplyJobFlowUiKey;
      type: ApplyJobLogType;
      values?: Record<string, string | number>;
    };

interface ApplyJobApplicationFlowProps {
  currentStepIdx: number;
  completedSteps: boolean[];
  isProcessingAction: boolean;
  setIsProcessingAction: (v: boolean) => void;
  advanceStep: (stepLogs?: ApplyJobSimulationLog[]) => void;
  addLog: (entry: ApplyJobSimulationLog) => void;
  isSuccess: boolean;
  onOpenSummary: () => void;
  onVerificationSnapshotChange?: (snapshot: ApplyJobVerificationSnapshot) => void;
  onCertificateTitlesChange?: (titles: string[]) => void;
  onSsiModeChange?: (isSsiMode: boolean) => void;
  scheduleTimeout: ManagedTimeoutScheduler;
}

interface CandidateCert {
  title: string;
  url: string;
}

/**
 * QR code graphic used by the job application flow.
 */
function ApplyJobQrCodeGraphic({ className = "w-44 h-44 text-[#0F1E36]" }: { className?: string }) {
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

function ApplyJobApplicationFlow({
  currentStepIdx,
  completedSteps,
  isProcessingAction,
  setIsProcessingAction,
  advanceStep,
  addLog,
  isSuccess,
  onOpenSummary,
  onVerificationSnapshotChange,
  onCertificateTitlesChange,
  onSsiModeChange,
  scheduleTimeout
}: ApplyJobApplicationFlowProps) {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const translations = getLocalizedRecord(
    APPLY_JOB_DEMO_PAGE_TRANSLATIONS,
    language as keyof typeof APPLY_JOB_DEMO_PAGE_TRANSLATIONS,
    'APPLY_JOB_DEMO_PAGE_TRANSLATIONS',
  );
  const t = translations.scenario;
  const bankT = translations.bankModal;
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

  const [jobExp, setJobExp] = useState('');
  const [jobGithub, setJobGithub] = useState('');

  const [validationError, setValidationError] = useState<ApplyJobValidationError | null>(null);

  const [completedDetailCount, setCompletedDetailCount] = useState(0);
  const [verificationRunStatus, setVerificationRunStatus] = useState<ApplyJobVerificationRunStatus>('idle');
  const [autoAdvanceSeconds, setAutoAdvanceSeconds] = useState(3);

  // Identra eID scan state
  const [isCryptographicallySecured, setIsCryptographicallySecured] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [qrSeconds, setQrSeconds] = useState(5);
  const qrTriggerRef = useRef<HTMLButtonElement>(null);
  const qrDialogRef = useRef<HTMLDivElement>(null);

  const mode: ApplyJobMode = isCryptographicallySecured ? 'identra' : 'manual';
  const verificationOutcome = getApplyJobVerificationOutcome(mode);
  const verificationPlan = useMemo(
    () => getApplyJobVerificationPlan(mode, jobCerts.length),
    [jobCerts.length, mode],
  );
  const verificationSnapshot = useMemo(
    () => getApplyJobVerificationSnapshot(
      verificationPlan,
      completedDetailCount,
      verificationRunStatus,
    ),
    [completedDetailCount, verificationPlan, verificationRunStatus],
  );
  const verificationDetails = useMemo(
    () => verificationPlan.flatMap((stage) => stage.detailIds),
    [verificationPlan],
  );
  const getVerificationDetailLabel = useCallback((
    detailId: ApplyJobVerificationDetailId,
    detailIndex: number,
    stageId: ApplyJobStageId,
  ) => {
    if (
      mode === 'identra'
      && stageId === 'credentials'
      && detailId === 'identraCredentialProofValidation'
    ) {
      return formatText(uiT.identraCertificateVerification, {
        certificate: jobCerts[Math.max(detailIndex - 1, 0)]?.title ?? '',
      });
    }
    return uiT[detailId];
  }, [jobCerts, mode, uiT]);
  const activeVerificationStage = verificationSnapshot.stages.find((stage) => stage.status === 'active');
  const activeVerificationDetailIndex = activeVerificationStage?.detailStatuses.findIndex(
    (status) => status === 'active',
  ) ?? -1;
  const activeVerificationDetail = verificationSnapshot.activeDetailId && activeVerificationStage
    ? getVerificationDetailLabel(
        verificationSnapshot.activeDetailId,
        activeVerificationDetailIndex,
        activeVerificationStage.id,
      )
    : null;
  const verificationStageLabels = {
    identity: uiT.legalIdentitySectionTitle,
    credentials: uiT.credentialSectionTitle,
    background: uiT.backgroundSectionTitle,
  } as const;
  const activeVerificationStageLabel = activeVerificationStage
    ? verificationStageLabels[activeVerificationStage.id]
    : uiT.verificationCompleteTitle;
  const step2Seconds = Math.max(
    verificationSnapshot.totalDetailCount - verificationSnapshot.completedDetailCount,
    0,
  );
  const error = useMemo(() => {
    if (!validationError) return null;
    const errorKeys: Record<ApplyJobValidationError, ApplyJobFlowUiKey> = {
      'candidate-name': 'validCandidateNameError',
      email: 'validEmailError',
      phone: 'validPhoneError',
      'identity-number': 'validSsnError',
      degree: 'validDegreeError',
      experience: 'experienceError',
      'github-url': 'githubPortfolioError',
      'certificate-incomplete': 'certificateIncompleteError',
      'certificate-url': 'certificateUrlError',
    };
    return uiT[errorKeys[validationError]];
  }, [uiT, validationError]);

  const isVerifiedField = useCallback(
    (field: ApplyJobFieldId) => isCryptographicallyVerifiedField(mode, field),
    [mode],
  );
  const getFieldSourceLabel = useCallback((field: ApplyJobFieldId) => {
    const provenanceKey = getApplyJobFieldProvenance(mode, field);
    const provenanceLabels: Record<typeof provenanceKey, ApplyJobFlowUiKey> = {
      'self-declared': 'selfDeclaredPill',
      'identity-vc': 'identityVcPill',
      'education-vc': 'educationVcPill',
      'certificate-vc': 'certificateVcPill',
    };
    return uiT[provenanceLabels[provenanceKey]];
  }, [mode, uiT]);

  useEffect(() => {
    onVerificationSnapshotChange?.(verificationSnapshot);
  }, [onVerificationSnapshotChange, verificationSnapshot]);

  useEffect(() => {
    onCertificateTitlesChange?.(jobCerts.map((certificate) => certificate.title));
  }, [jobCerts, onCertificateTitlesChange]);

  // Start the deterministic verification plan once the application has been submitted.
  useEffect(() => {
    if (currentStepIdx !== 1 || completedSteps[1]) {
      return;
    }
    if (verificationRunStatus !== 'idle') return;

    setVerificationRunStatus('running');
    setCompletedDetailCount(0);
    setAutoAdvanceSeconds(3);
    setIsProcessingAction(true);
    addLog({ scope: 'flow', key: 'serverInitLog', type: 'system' });
    addLog({ scope: 'flow', key: verificationDetails[0], type: 'processing' });
  }, [
    addLog,
    completedSteps,
    currentStepIdx,
    setIsProcessingAction,
    verificationDetails,
    verificationRunStatus,
  ]);

  // Advance one verification detail at a time. Both panels render this same snapshot.
  useEffect(() => {
    if (verificationRunStatus !== 'running' || currentStepIdx !== 1) return;

    const timer = window.setTimeout(() => {
      const nextCompletedCount = completedDetailCount + 1;
      setCompletedDetailCount(nextCompletedCount);

      if (nextCompletedCount >= verificationDetails.length) {
        setVerificationRunStatus('complete');
        setIsProcessingAction(false);
        addLog({ scope: 'flow', key: 'serverCompleteLog', type: 'ok' });
        return;
      }

      addLog({
        scope: 'flow',
        key: verificationDetails[nextCompletedCount],
        type: 'processing',
      });
    }, shouldReduceMotion ? 300 : 900);

    return () => window.clearTimeout(timer);
  }, [
    addLog,
    completedDetailCount,
    currentStepIdx,
    setIsProcessingAction,
    shouldReduceMotion,
    verificationDetails,
    verificationRunStatus,
  ]);

  // Move to the result after a short, visible completion countdown.
  useEffect(() => {
    if (verificationRunStatus !== 'complete' || currentStepIdx !== 1) return;

    if (autoAdvanceSeconds <= 0) {
      advanceStep([{
        scope: 'flow',
        key: mode === 'identra' ? 'autoAdvanceSsiLog' : 'autoAdvanceManualLog',
        type: 'data',
      }]);
      return;
    }

    const timer = window.setTimeout(() => {
      setAutoAdvanceSeconds((previousSeconds) => Math.max(0, previousSeconds - 1));
    }, shouldReduceMotion ? 300 : 1000);

    return () => window.clearTimeout(timer);
  }, [
    advanceStep,
    autoAdvanceSeconds,
    currentStepIdx,
    mode,
    shouldReduceMotion,
    verificationRunStatus,
  ]);

  // Start 5-second QR Modal Simulation
  const startQrScanModal = () => {
    setIsQrModalOpen(true);
    setQrSeconds(5);
    addLog({ scope: 'flow', key: 'qrApplyStartedLog', type: 'processing' });
  };

  const closeQrScanModal = useCallback(() => {
    setIsQrModalOpen(false);
    window.requestAnimationFrame(() => qrTriggerRef.current?.focus());
  }, []);

  // Handle 5-second QR scanning countdown
  useEffect(() => {
    if (!isQrModalOpen) return;

    if (qrSeconds <= 0) {
      closeQrScanModal();
      setJobName(uiT.qrName);
      setJobEmail(uiT.qrEmail);
      setJobPhone(uiT.qrPhone);
      setJobSsn(APPLY_JOB_IDENTRA_IDENTITY_NUMBER);
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
      setValidationError(null);
      addLog({ scope: 'flow', key: 'qrApplySuccessLog', type: 'ok' });
      return;
    }

    const timer = setTimeout(() => {
      setQrSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [addLog, closeQrScanModal, isQrModalOpen, onSsiModeChange, qrSeconds, uiT]);

  useEffect(() => {
    if (!isQrModalOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeQrScanModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeQrScanModal, isQrModalOpen]);

  // Keep the localized mock education credential current without restarting the flow.
  useEffect(() => {
    if (!isCryptographicallySecured) return;
    setJobDegree(uiT.qrDegree);
  }, [
    isCryptographicallySecured,
    uiT.qrDegree,
  ]);

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
      setJobExp('');
      setJobGithub('');
      setCompletedDetailCount(0);
      setVerificationRunStatus('idle');
      setAutoAdvanceSeconds(3);
      setValidationError(null);
      setIsQrModalOpen(false);
      setQrSeconds(5);
      setIsCryptographicallySecured(false);
      onSsiModeChange?.(false);
    } else {
      setValidationError(null);
    }
  }, [currentStepIdx, onSsiModeChange]);

  return (
    <div className="space-y-6 flex-1 flex flex-col justify-between">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-[#354CE1]" />
          <span className="font-bold tracking-tight text-slate-800">{t.headerTitle}</span>
        </div>
        <span className={`text-xs border px-2.5 py-0.5 rounded-full font-bold ${
          mode === 'identra'
            ? 'bg-emerald-50 text-emerald-600 border-emerald-100/60'
            : 'bg-slate-50 text-slate-600 border-slate-200'
        }`}>
          {mode === 'identra' ? t.identraVerified : uiT.manualEntryBadge}
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
                  <ApplyJobQrCodeGraphic className="h-10 w-10 text-[#354CE1]" />
                  <div className="absolute inset-0 bg-[#354CE1]/5 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Sparkles className={`h-4 w-4 text-[#354CE1] ${shouldReduceMotion ? '' : 'animate-spin'}`} />
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
                ref={qrTriggerRef}
                type="button"
                onClick={startQrScanModal}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-indigo-50 border border-[#354CE1]/30 text-[#354CE1] text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer hover:border-[#354CE1] active:scale-[0.98]"
              >
                <ApplyJobQrCodeGraphic className="h-3.5 w-3.5 text-[#354CE1]" />
                <span>{uiT.scanQrAutofill}</span>
              </button>
            </div>

            {/* Error Alert */}
            {error && (
              <div role="alert" className="bg-rose-50 text-rose-600 border border-rose-100 p-3 rounded-xl text-xs font-semibold flex items-center gap-2">
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
                    <label htmlFor="apply-job-name" className="text-xs font-bold text-slate-600 uppercase tracking-wider">{t.candidateName}</label>
                    {isVerifiedField('name') && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-mono font-bold bg-emerald-100/80 px-1.5 py-0.5 rounded border border-emerald-300/60">
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        {getFieldSourceLabel('name')}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      id="apply-job-name"
                      type="text"
                      autoComplete="name"
                      value={jobName}
                      onChange={(e) => {
                        if (!isVerifiedField('name')) {
                          setValidationError(null);
                          setJobName(e.target.value);
                        }
                      }}
                      readOnly={isVerifiedField('name')}
                      disabled={isProcessingAction}
                      placeholder={uiT.candidateNamePlaceholder}
                      className={`w-full bg-white border rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20 font-medium disabled:opacity-60 disabled:bg-slate-50 disabled:cursor-not-allowed transition-all ${
                        validationError === 'candidate-name' ? 'border-rose-300 focus:ring-rose-200' : isVerifiedField('name') ? 'bg-emerald-50/30 border-emerald-300 text-emerald-950 font-bold cursor-not-allowed' : 'border-slate-200'
                      }`}
                    />
                    {isVerifiedField('name') && (
                      <Lock className="h-3.5 w-3.5 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      id="apply-job-identity-label"
                      htmlFor={mode === 'manual' ? 'apply-job-identity' : undefined}
                      className="text-xs font-bold text-slate-600 uppercase tracking-wider"
                    >
                      {mode === 'identra' ? uiT.personalIdentityNumberLabel : t.workingIdentityNumber}
                    </label>
                    {isVerifiedField('identity') && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-mono font-bold bg-emerald-100/80 px-1.5 py-0.5 rounded border border-emerald-300/60">
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        {getFieldSourceLabel('identity')}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    {mode === 'identra' ? (
                      <div
                        id="apply-job-identity"
                        role="textbox"
                        aria-readonly="true"
                        aria-labelledby="apply-job-identity-label"
                        tabIndex={0}
                        className="flex min-h-11 w-full items-center rounded-xl border border-emerald-300 bg-emerald-50/30 py-2.5 pl-10 pr-10 text-xs font-semibold leading-snug text-emerald-950"
                      >
                        {jobSsn}
                      </div>
                    ) : (
                      <input
                        id="apply-job-identity"
                        type="text"
                        inputMode="numeric"
                        autoComplete="off"
                        value={jobSsn}
                        onChange={(e) => {
                          setValidationError(null);
                          setJobSsn(e.target.value);
                        }}
                        disabled={isProcessingAction}
                        placeholder={uiT.identityNumberPlaceholder}
                        className={`w-full bg-white border rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20 font-mono disabled:opacity-60 disabled:bg-slate-50 disabled:cursor-not-allowed transition-all ${
                          validationError === 'identity-number' ? 'border-rose-300 focus:ring-rose-200' : 'border-slate-200'
                        }`}
                      />
                    )}
                    {isVerifiedField('identity') && (
                      <Lock className="h-3.5 w-3.5 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="apply-job-email" className="text-xs font-bold text-slate-600 uppercase tracking-wider">{uiT.candidateEmail}</label>
                    {mode === 'identra' && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-slate-600 font-mono font-bold bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                        {getFieldSourceLabel('email')}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      id="apply-job-email"
                      type="email"
                      autoComplete="email"
                      value={jobEmail}
                      onChange={(e) => {
                        setValidationError(null);
                        setJobEmail(e.target.value);
                      }}
                      disabled={isProcessingAction}
                      placeholder={uiT.candidateEmailPlaceholder}
                      className={`w-full bg-white border rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20 font-medium disabled:opacity-60 disabled:bg-slate-50 transition-all ${
                        validationError === 'email' ? 'border-rose-300 focus:ring-rose-200' : 'border-slate-200'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="apply-job-phone" className="text-xs font-bold text-slate-600 uppercase tracking-wider">{uiT.candidatePhone}</label>
                    {mode === 'identra' && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-slate-600 font-mono font-bold bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                        {getFieldSourceLabel('phone')}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      id="apply-job-phone"
                      type="tel"
                      autoComplete="tel"
                      value={jobPhone}
                      onChange={(e) => {
                        setValidationError(null);
                        setJobPhone(e.target.value);
                      }}
                      disabled={isProcessingAction}
                      placeholder={uiT.candidatePhonePlaceholder}
                      className={`w-full bg-white border rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20 font-mono disabled:opacity-60 disabled:bg-slate-50 transition-all ${
                        validationError === 'phone' ? 'border-rose-300 focus:ring-rose-200' : 'border-slate-200'
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="apply-job-degree" className="text-xs font-bold text-slate-600 uppercase tracking-wider">{uiT.academicDegree}</label>
                  {isVerifiedField('degree') && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-mono font-bold bg-emerald-100/80 px-1.5 py-0.5 rounded border border-emerald-300/60">
                      <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                      {getFieldSourceLabel('degree')}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    id="apply-job-degree"
                    type="text"
                    value={jobDegree}
                    onChange={(e) => {
                      if (!isVerifiedField('degree')) {
                        setValidationError(null);
                        setJobDegree(e.target.value);
                      }
                    }}
                    readOnly={isVerifiedField('degree')}
                    disabled={isProcessingAction}
                    placeholder={uiT.academicDegreePlaceholder}
                    className={`w-full bg-white border rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20 font-medium disabled:opacity-60 disabled:bg-slate-50 transition-all ${
                      validationError === 'degree' ? 'border-rose-300 ring-2 ring-rose-200' : isVerifiedField('degree') ? 'bg-emerald-50/30 border-emerald-300 text-emerald-950 font-bold cursor-not-allowed' : 'border-slate-200'
                    }`}
                  />
                  {isVerifiedField('degree') && (
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
                          isVerifiedField('certificates')
                            ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                            : 'bg-indigo-50/50 border-indigo-200/80 text-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={`p-1.5 rounded-lg shrink-0 ${isVerifiedField('certificates') ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-[#354CE1]'}`}>
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

                        {isVerifiedField('certificates') ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 font-bold shrink-0">
                            <Lock className="h-3 w-3 text-emerald-600" />
                            {getFieldSourceLabel('certificates')}
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setJobCerts(prev => prev.filter((_, idx) => idx !== cIdx));
                            }}
                            aria-label={formatText(uiT.removeCertificate, { title: cert.title })}
                            title={formatText(uiT.removeCertificate, { title: cert.title })}
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
                {!isVerifiedField('certificates') && (
                  <div className="space-y-2 p-3 bg-slate-50/70 border border-slate-200/80 rounded-xl">
                    <div className="space-y-1.5">
                      <div className="relative">
                        <Award className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                        <input
                          type="text"
                          value={newCertTitle}
                          onChange={(e) => {
                            setValidationError(null);
                            setNewCertTitle(e.target.value);
                          }}
                          aria-label={uiT.certTitleInputLabel}
                          placeholder={uiT.certTitlePlaceholder}
                          className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20"
                        />
                      </div>

                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                        <input
                          type="text"
                          value={newCertUrl}
                          onChange={(e) => {
                            setValidationError(null);
                            setNewCertUrl(e.target.value);
                          }}
                          aria-label={uiT.certUrlInputLabel}
                          placeholder={uiT.certUrlPlaceholder}
                          className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs font-mono text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (newCertTitle.trim() && newCertUrl.trim()) {
                          setJobCerts(prev => [...prev, { title: newCertTitle.trim(), url: newCertUrl.trim() }]);
                          setNewCertTitle('');
                          setNewCertUrl('');
                          setValidationError(null);
                        }
                      }}
                      disabled={!newCertTitle.trim() || !newCertUrl.trim()}
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
                  <div className="flex items-center justify-between">
                    <label htmlFor="apply-job-experience" className="text-xs font-bold text-slate-600 uppercase tracking-wider">{uiT.golangExperience}</label>
                    {mode === 'identra' && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-slate-600 font-mono font-bold bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                        {getFieldSourceLabel('experience')}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <FileCode className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      id="apply-job-experience"
                      type="number"
                      inputMode="numeric"
                      min={0}
                      max={60}
                      step={1}
                      value={jobExp}
                      onChange={(e) => {
                        setValidationError(null);
                        setJobExp(e.target.value);
                      }}
                      disabled={isProcessingAction}
                      placeholder={uiT.experiencePlaceholder}
                      className={`w-full bg-white border rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20 font-medium disabled:opacity-60 disabled:bg-slate-50 transition-all ${
                        validationError === 'experience' ? 'border-rose-300 ring-2 ring-rose-200' : 'border-slate-200'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="apply-job-github" className="text-xs font-bold text-slate-600 uppercase tracking-wider">{uiT.githubPortfolioUrl}</label>
                    {mode === 'identra' && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-slate-600 font-mono font-bold bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                        {getFieldSourceLabel('github')}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      id="apply-job-github"
                      type="text"
                      value={jobGithub}
                      onChange={(e) => {
                        setValidationError(null);
                        setJobGithub(e.target.value);
                      }}
                      disabled={isProcessingAction}
                      placeholder={uiT.githubPortfolioPlaceholder}
                      className={`w-full bg-white border rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20 font-mono disabled:opacity-60 disabled:bg-slate-50 transition-all ${
                        validationError === 'github-url' ? 'border-rose-300 ring-2 ring-rose-200' : 'border-slate-200'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Awncorp Submit Button with Strict Validation */}
            <button
              onClick={() => {
                const nextValidationError = validateApplyJobApplication({
                  name: jobName,
                  identityNumber: jobSsn,
                  email: jobEmail,
                  phone: jobPhone,
                  degree: jobDegree,
                  certificates: jobCerts,
                  pendingCertificateTitle: newCertTitle,
                  pendingCertificateUrl: newCertUrl,
                  experience: jobExp,
                  githubUrl: jobGithub,
                }, mode);
                if (nextValidationError) {
                  setValidationError(nextValidationError);
                  return;
                }

                setValidationError(null);
                setIsProcessingAction(true);
                addLog({
                  scope: 'flow',
                  key: mode === 'identra'
                    ? 'identraApplicationSubmittedLog'
                    : 'manualApplicationSubmittedLog',
                  type: 'action',
                });
                scheduleTimeout(() => {
                  setIsProcessingAction(false);
                  advanceStep([{
                    scope: 'flow',
                    key: 'applicationAcceptedLog',
                    type: 'data',
                  }]);
                }, shouldReduceMotion ? 250 : 900);
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

            <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-mono font-bold text-slate-500">
                  {uiT.serverProgressLabel}
                </span>
                <span className="text-xs font-mono font-bold text-[#354CE1]">
                  {verificationSnapshot.progressPercent}%
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className={`h-2.5 w-2.5 rounded-full ${
                      verificationRunStatus === 'complete'
                        ? 'bg-emerald-500'
                        : `bg-[#354CE1] ${shouldReduceMotion ? '' : 'animate-ping'}`
                    }`} />
                    <span className="text-xs font-bold text-slate-900">
                      {activeVerificationStageLabel}
                    </span>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 font-mono text-[11px] font-bold flex items-center gap-1.5">
                    <Sparkles className={`h-3 w-3 text-[#354CE1] ${shouldReduceMotion ? '' : 'animate-spin'}`} />
                    <span>{step2Seconds}s</span>
                  </div>
                </div>
                <div
                  role="progressbar"
                  aria-label={uiT.serverProgressLabel}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={verificationSnapshot.progressPercent}
                  className="h-2 w-full overflow-hidden rounded-full bg-slate-100"
                >
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#354CE1] to-emerald-500"
                    animate={{ width: `${verificationSnapshot.progressPercent}%` }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: 'easeOut' }}
                  />
                </div>
              </div>

              <div className="min-h-14">
                <AnimatePresence mode="wait">
                  {activeVerificationDetail && (
                    <motion.div
                      key={verificationSnapshot.activeDetailId}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? undefined : { opacity: 0, y: -4 }}
                      role="status"
                      aria-live="polite"
                      className="flex min-h-14 items-center gap-3 rounded-xl border border-[#354CE1]/20 bg-[#354CE1]/5 px-4 py-3"
                    >
                      <span className={`h-2 w-2 shrink-0 rounded-full bg-[#354CE1] ${shouldReduceMotion ? '' : 'animate-ping'}`} />
                      <p className="text-[11px] font-semibold leading-relaxed text-[#354CE1]">
                        {activeVerificationDetail}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {verificationRunStatus === 'complete' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                role="status"
                aria-live="polite"
                className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center space-y-2"
              >
                <div className="flex items-center justify-center gap-2.5 text-emerald-700 font-bold text-xs uppercase tracking-wider font-mono">
                  <Loader2 className={`w-4 h-4 text-emerald-600 shrink-0 ${shouldReduceMotion ? '' : 'animate-spin'}`} />
                  <span>{uiT.autoTransferStatus}</span>
                </div>
                <p className="text-[11px] text-slate-600 font-mono">
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
            <div className={`h-16 w-16 text-white rounded-full flex items-center justify-center mx-auto shadow-lg ring-8 ${
              verificationOutcome === 'verified'
                ? 'bg-emerald-500 shadow-emerald-500/20 ring-emerald-50/80'
                : 'bg-amber-500 shadow-amber-500/20 ring-amber-50/80'
            }`}>
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider border font-mono ${
                verificationOutcome === 'verified'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                  : 'bg-amber-50 text-amber-700 border-amber-100'
              }`}>
                <Sparkles className="w-3 h-3" />
                {verificationOutcome === 'verified' ? uiT.identraResultBadge : uiT.manualResultBadge}
              </span>
              <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
                {uiT.successTitle}
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                {formatText(
                  verificationOutcome === 'verified'
                    ? uiT.identraSuccessDescription
                    : uiT.manualSuccessDescription,
                  { role: uiT.jobRoleTitle },
                )}
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
                  {verificationOutcome === 'verified' ? uiT.ssiTrustStatus : uiT.manualTrustStatus}
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
                    <span className="font-bold block text-slate-900">
                      {verificationOutcome === 'verified' ? uiT.nextStep1Title : uiT.nextStep1ManualTitle}
                    </span>
                    <span className="text-[11px] text-slate-600">
                      {verificationOutcome === 'verified' ? uiT.nextStep1Desc : uiT.nextStep1ManualDesc}
                    </span>
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
                  addLog({ scope: 'flow', key: 'auditSummaryUserLog', type: 'action' });
                  onOpenSummary();
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
              ref={qrDialogRef}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="apply-job-qr-title"
              onKeyDown={(event) => {
                if (event.key !== 'Tab') return;
                const focusableElements = Array.from(
                  qrDialogRef.current?.querySelectorAll<HTMLButtonElement>('button:not([disabled])') ?? [],
                );
                if (focusableElements.length === 0) return;
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (event.shiftKey && document.activeElement === firstElement) {
                  event.preventDefault();
                  lastElement.focus();
                } else if (!event.shiftKey && document.activeElement === lastElement) {
                  event.preventDefault();
                  firstElement.focus();
                }
              }}
              className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative space-y-5"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-xl bg-[#354CE1]/10 flex items-center justify-center text-[#354CE1]">
                    <QrCode className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 id="apply-job-qr-title" className="font-display font-bold text-slate-900 text-sm sm:text-base">
                      {bankT.scanQrModalTitle}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {uiT.qrHandshakeSubtitle}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeQrScanModal}
                  autoFocus
                  aria-label={bankT.cancelButton}
                  title={bankT.cancelButton}
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
                    animate={shouldReduceMotion ? { top: '5%' } : { top: ['5%', '92%', '5%'] }}
                    transition={shouldReduceMotion ? undefined : { repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                    className="absolute inset-x-3 h-0.5 bg-gradient-to-r from-transparent via-[#354CE1] to-transparent shadow-[0_0_10px_#354CE1] z-20"
                  />

                  {/* Crisp Clean QR Graphic */}
                  <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-xs">
                    <ApplyJobQrCodeGraphic className="h-48 w-48 text-[#0F1E36]" />
                  </div>
                </div>

                {/* Soft Countdown Status Pill */}
                <div role="status" aria-live="polite" className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#354CE1]/10 border border-[#354CE1]/20 text-[#354CE1] text-xs font-mono font-bold">
                  <Sparkles className={`h-3.5 w-3.5 text-[#354CE1] ${shouldReduceMotion ? '' : 'animate-spin'}`} />
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
                  onClick={closeQrScanModal}
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

interface ApplyJobDemoPageProps {
  onBackToList: () => void;
}

interface ApplyJobDemoStep {
  label: string;
  action: string;
  logText: string;
}

interface ApplyJobDemoCopy {
  id: DemoScenarioId;
  tag: string;
  title: string;
  desc: string;
  security: string;
  successResult: string;
  steps: readonly ApplyJobDemoStep[];
}

interface ApplyJobDemoScenario extends ApplyJobDemoCopy {
  icon: React.ComponentType<{ className?: string }>;
}

const formatText = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ''));

const createInitialApplyJobLogs = (isReset = false): ApplyJobSimulationLog[] => (
  isReset
    ? [
        { scope: 'page', key: 'reset', type: 'system' },
        { scope: 'page', key: 'resetInstruction', type: 'system' },
      ]
    : [
        { scope: 'page', key: 'launch', type: 'system' },
        { scope: 'page', key: 'environment', type: 'system' },
        { scope: 'page', key: 'instruction', type: 'system' },
      ]
);

const createIdleApplyJobVerificationSnapshot = (): ApplyJobVerificationSnapshot => (
  getApplyJobVerificationSnapshot(
    getApplyJobVerificationPlan('manual', false),
    0,
    'idle',
  )
);

export default function ApplyJobDemoPage({ onBackToList }: ApplyJobDemoPageProps) {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const translations = getLocalizedRecord(
    APPLY_JOB_DEMO_PAGE_TRANSLATIONS,
    language as keyof typeof APPLY_JOB_DEMO_PAGE_TRANSLATIONS,
    'APPLY_JOB_DEMO_PAGE_TRANSLATIONS',
  );
  const t = translations.page;
  const flowT = translations.flowUi;
  const scenario = useMemo<ApplyJobDemoScenario>(() => ({
    ...translations.meta,
    id: 'apply-job',
    icon: Briefcase,
  }), [translations.meta]);
  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const { clearTimeouts, scheduleTimeout } = useManagedTimeouts();

  const playTingTingSound = useCallback(() => {
    try {
      const AudioContextClass = window.AudioContext
        || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
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
      osc2.addEventListener('ended', () => {
        void ctx.close();
      }, { once: true });
    } catch (error) {
      console.warn(error);
    }
  }, []);

  // General simulation states
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(new Array(scenario.steps.length).fill(false));
  const [simulationLogs, setSimulationLogs] = useState<ApplyJobSimulationLog[]>(() => createInitialApplyJobLogs());
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isProcessingAction, setIsProcessingAction] = useState<boolean>(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState<boolean>(false);
  const [isSsiCredentialMode, setIsSsiCredentialMode] = useState<boolean>(false);
  const [verificationSnapshot, setVerificationSnapshot] = useState<ApplyJobVerificationSnapshot>(
    createIdleApplyJobVerificationSnapshot,
  );
  const [certificateTitles, setCertificateTitles] = useState<string[]>([]);
  const verificationOutcome: ApplyJobVerificationOutcome = getApplyJobVerificationOutcome(
    isSsiCredentialMode ? 'identra' : 'manual',
  );
  const getTrackerDetailLabel = useCallback((
    detailId: ApplyJobVerificationDetailId,
    detailIndex: number,
    stageId: ApplyJobStageId,
  ) => {
    if (
      isSsiCredentialMode
      && stageId === 'credentials'
      && detailId === 'identraCredentialProofValidation'
    ) {
      return formatText(flowT.identraCertificateVerification, {
        certificate: certificateTitles[Math.max(detailIndex - 1, 0)] ?? '',
      });
    }
    return flowT[detailId];
  }, [certificateTitles, flowT, isSsiCredentialMode]);

  // Scroll terminal logs
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTo({
        top: terminalContainerRef.current.scrollHeight,
        behavior: shouldReduceMotion ? 'auto' : 'smooth'
      });
    }
  }, [shouldReduceMotion, simulationLogs]);

  const addLog = useCallback((entry: ApplyJobSimulationLog) => {
    setSimulationLogs((previousLogs) => [...previousLogs, entry]);
  }, []);

  const advanceStep = useCallback((stepLogs: ApplyJobSimulationLog[] = []) => {
    if (isSuccess) return;
    setCompletedSteps((previousSteps) => previousSteps.map((isDone, index) => (
      index === currentStepIdx ? true : isDone
    )));
    setSimulationLogs((previousLogs) => [...previousLogs, ...stepLogs]);

    if (currentStepIdx === 0) {
      setCurrentStepIdx(1);
      addLog({ scope: 'flow', key: 'verificationStartedLog', type: 'system' });
      return;
    }

    if (currentStepIdx === 1) {
      setCurrentStepIdx(2);
      setIsSuccess(true);
      addLog({
        scope: 'flow',
        key: isSsiCredentialMode ? 'identraResultReadyLog' : 'manualResultReadyLog',
        type: isSsiCredentialMode ? 'ok' : 'action',
      });
      playTingTingSound();
    }
  }, [addLog, currentStepIdx, isSsiCredentialMode, isSuccess, playTingTingSound]);

  // Reset helper
  const handleReset = () => {
    clearTimeouts();
    setCurrentStepIdx(0);
    setCompletedSteps(new Array(scenario.steps.length).fill(false));
    setIsSuccess(false);
    setIsProcessingAction(false);
    setIsSummaryModalOpen(false);
    setIsSsiCredentialMode(false);
    setVerificationSnapshot(createIdleApplyJobVerificationSnapshot());
    setSimulationLogs(createInitialApplyJobLogs(true));
  };

  const trackerActiveStepIdx = verificationSnapshot.stages.findIndex((stage) => stage.status === 'active');
  const trackerCompletedSteps = verificationSnapshot.stages.map((stage) => stage.status === 'done');
  const isVerificationComplete = trackerCompletedSteps.length > 0
    && trackerCompletedSteps.every(Boolean);
  const evidenceStatus = verificationOutcome === 'verified'
    ? t.cryptographicEvidenceVerified
    : t.manualEvidenceNeedsReview;
  const riskStatus = isVerificationComplete
    ? verificationOutcome === 'verified'
      ? t.ssiRiskTrusted
      : t.manualRiskNeedsReview
    : t.notEvaluated;
  const systemStatus = isSuccess
    ? verificationOutcome === 'verified'
      ? t.approved
      : t.reviewRequired
    : currentStepIdx === 0
      ? t.waitingInput
      : t.analyzing;

  return (
    <div className="min-h-screen bg-[#FAFBFD] text-slate-800 font-sans pb-24 relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-[#354CE1]/5 to-transparent blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/60 pb-5">
          <button
            type="button"
            onClick={onBackToList}
            className="flex items-center gap-2 text-slate-600 hover:text-[#354CE1] transition font-semibold text-sm group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{t.backToScenarios}</span>
          </button>
          <div role="status" className="flex items-center gap-3">
            <span aria-hidden="true" className={`h-2 w-2 rounded-full bg-emerald-500 ${shouldReduceMotion ? '' : 'animate-pulse'}`} />
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
              type="button"
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
              <div className="bg-[#F7F8FC] text-slate-500 px-6 py-4 flex items-center justify-between border-b border-slate-200">
                <div aria-hidden="true" className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <div className="text-[11px] font-mono tracking-wider font-semibold bg-white text-slate-700 px-3 py-1 rounded-full border border-slate-200 flex items-center gap-1.5 shadow-2xs">
                  <Smartphone className="w-3.5 h-3.5 text-[#354CE1]" />
                  <span>{t.clientEmulator}</span>
                </div>
                <div aria-hidden="true" className={`h-2 w-2 rounded-full bg-emerald-500 ${shouldReduceMotion ? '' : 'animate-ping'}`} />
              </div>

              {/* Dynamic app content provided by the scenario page */}
              <div className="p-6 md:p-8 min-h-[480px] bg-slate-50/50 flex flex-col justify-between">
                <ApplyJobApplicationFlow
                  currentStepIdx={currentStepIdx}
                  completedSteps={completedSteps}
                  isProcessingAction={isProcessingAction}
                  setIsProcessingAction={setIsProcessingAction}
                  advanceStep={advanceStep}
                  addLog={addLog}
                  isSuccess={isSuccess}
                  onOpenSummary={() => setIsSummaryModalOpen(true)}
                  onVerificationSnapshotChange={setVerificationSnapshot}
                  onCertificateTitlesChange={setCertificateTitles}
                  onSsiModeChange={setIsSsiCredentialMode}
                  scheduleTimeout={scheduleTimeout}
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
                  <Sparkles className={`w-2.5 h-2.5 text-emerald-600 ${shouldReduceMotion ? '' : 'animate-pulse'}`} />
                  <span>{t.coreVersion}</span>
                </div>
              </div>

              {/* Dynamic Risk Engine Header metrics */}
              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-150 text-center text-xs font-mono">
                <div>
                  <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">{t.riskLevel}</span>
                  <span className={`font-bold text-[10px] ${
                    riskStatus === t.ssiRiskTrusted ? 'text-emerald-600' : 'text-amber-600'
                  }`}>
                    {riskStatus}
                  </span>
                </div>
                <div className="border-x border-slate-200">
                  <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">{t.trustScore}</span>
                  <span className={`font-extrabold text-[11px] ${
                    verificationOutcome === 'verified' ? 'text-emerald-600' : 'text-amber-600'
                  }`}>
                    {currentStepIdx === 0 ? t.notEvaluated : evidenceStatus}
                  </span>
                </div>
                <div>
                  <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">{t.systemState}</span>
                  <span className={`font-bold text-[10px] ${
                    isSuccess && verificationOutcome === 'verified' ? 'text-emerald-600' : 'text-amber-500'
                  }`}>
                    {systemStatus}
                  </span>
                </div>
              </div>

              {/* Graphical representation of the Verification sequence */}
              <IdentityFlowGraph
                steps={scenario.steps}
                currentStepIdx={trackerActiveStepIdx}
                completedSteps={trackerCompletedSteps}
                isSuccess={isVerificationComplete}
              />

              {/* Steps with connected timeline */}
              <div className="space-y-4 relative pl-3.5 border-l border-slate-100">
                {scenario.steps.map((st, sIdx) => {
                  const stageSnapshot = verificationSnapshot.stages[sIdx];
                  const isActive = stageSnapshot?.status === 'active';
                  const isDone = stageSnapshot?.status === 'done';
                  const subChecks = stageSnapshot?.detailIds.map((detailId, detailIndex) => (
                    getTrackerDetailLabel(detailId, detailIndex, stageSnapshot.id)
                  )) ?? [];

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
                            ? `bg-white border-[#354CE1] text-[#354CE1] shadow-sm ring-4 ring-indigo-50 scale-105 font-bold ${shouldReduceMotion ? '' : 'animate-pulse'}`
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
                            <span className={`text-[8px] font-bold font-mono px-1.5 py-0.5 bg-indigo-500 text-white rounded-md uppercase tracking-wider shrink-0 ${shouldReduceMotion ? '' : 'animate-pulse'}`}>
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
                              const checkStatus = stageSnapshot?.detailStatuses[cIdx] ?? 'pending';

                              return (
                                <div key={cIdx} className="flex items-center gap-2 text-[9.5px] font-mono leading-none">
                                  {checkStatus === 'done' ? (
                                    <span className="h-3.5 w-3.5 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-[8px] shrink-0 border border-emerald-100">✓</span>
                                  ) : checkStatus === 'active' ? (
                                    <span className={`h-3.5 w-3.5 rounded bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100 ${shouldReduceMotion ? '' : 'animate-pulse'}`}>
                                      <span className={`h-1 w-1 rounded-full bg-amber-500 ${shouldReduceMotion ? '' : 'animate-ping'}`} />
                                    </span>
                                  ) : (
                                    <span className="h-3.5 w-3.5 rounded bg-slate-50 text-slate-400 flex items-center justify-center text-[8px] shrink-0 border border-slate-100">−</span>
                                  )}
                                  <span className={
                                    checkStatus === 'done'
                                      ? 'text-slate-600 font-medium'
                                      : checkStatus === 'active'
                                        ? `text-amber-600 font-semibold ${shouldReduceMotion ? '' : 'animate-pulse'}`
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
                  <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${
                    isSuccess
                      ? `bg-emerald-500 ${shouldReduceMotion ? '' : 'animate-pulse'}`
                      : `bg-[#354CE1] ${shouldReduceMotion ? '' : 'animate-ping'}`
                  }`} />
                  <span className="text-xs font-semibold font-mono text-slate-600 uppercase tracking-wide">
                    {isSuccess ? t.transactionComplete : t.waitingInput}
                  </span>
                </div>
                {isSuccess && (
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setIsSummaryModalOpen(true)}
                      className="flex-1 sm:flex-none px-3.5 py-2 bg-[#354CE1] hover:bg-[#354CE1]/90 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-[#354CE1]/15 cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98]"
                    >
                      <span>{t.viewVerdict}</span>
                    </button>
                    <button
                      type="button"
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
                <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full bg-emerald-500 ${shouldReduceMotion ? '' : 'animate-pulse'}`} />
              </div>

              <div
                ref={terminalContainerRef}
                role="log"
                aria-live="polite"
                className="font-mono text-[10px] space-y-2 h-52 overflow-y-auto scrollbar-thin text-slate-300 pr-1 select-all leading-relaxed"
              >
                {simulationLogs.map((log, idx) => {
                  const template = log.scope === 'page' ? t.logs[log.key] : flowT[log.key];
                  const values = log.scope === 'page' && (log.key === 'launch' || log.key === 'reset')
                    ? { ...log.values, title: scenario.title }
                    : log.values ?? {};
                  const localizedText = formatText(template, values);
                  const prefixes: Record<ApplyJobLogType, string> = {
                    system: '[SYSTEM]',
                    action: '[ACTION]',
                    data: '[DATA]',
                    ok: '[OK]',
                    processing: '[PROCESSING]',
                  };
                  const displayText = /^\[[A-Z]+\]/.test(localizedText)
                    ? localizedText
                    : `${prefixes[log.type]} ${localizedText}`;
                  let color = 'text-slate-300';
                  if (log.type === 'system') color = 'text-indigo-400';
                  else if (log.type === 'action') color = 'text-amber-400';
                  else if (log.type === 'ok') color = 'text-emerald-500 font-semibold';
                  else if (log.type === 'processing') {
                    color = `text-purple-400 ${shouldReduceMotion ? '' : 'animate-pulse'}`;
                  }

                  return (
                    <div key={idx} className="flex gap-2 items-start">
                      <span className="text-slate-600 select-none">&gt;</span>
                      <span className={color}>{displayText}</span>
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
            isSsiMode={isSsiCredentialMode}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
