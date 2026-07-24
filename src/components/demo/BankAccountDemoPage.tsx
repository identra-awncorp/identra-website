/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AlertCircle, ArrowLeft, ArrowRight, Camera, Check, CheckCircle2, CreditCard, Database, Fingerprint, Landmark, Lock, Mail, MapPin, Phone, QrCode, RefreshCw, ShieldAlert, ShieldCheck, Smartphone, Sparkles, Terminal, Truck, User, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useManagedTimeouts, type ManagedTimeoutScheduler } from '../../hooks/useManagedTimeouts';
import { BANK_ACCOUNT_DEMO_PAGE_TRANSLATIONS } from '../../translations/demo/BankAccountDemoPageTranslations';
import type { DemoScenarioId } from '../../types/routes';
import { getLocalizedRecord } from '../../utils/i18nRuntime';
import DemoSummaryModal from './DemoSummaryModal';
import IdentityFlowGraph from './IdentityFlowGraph';

type BankAccountType = 'checking' | 'savings' | 'business';
type BankAccountOnboardingMethod = 'manual' | 'identra';
type VerificationRunStatus = 'idle' | 'running' | 'passed';

interface VerificationProgressStep {
  label: string;
  details: string[];
  startIndex: number;
}

interface VerificationProgressState {
  steps: VerificationProgressStep[];
  detailCount: number;
  totalDetails: number;
  status: VerificationRunStatus;
}

const EMPTY_VERIFICATION_PROGRESS: VerificationProgressState = {
  steps: [],
  detailCount: 0,
  totalDetails: 0,
  status: 'idle',
};

interface BankAccountClientSimulatorProps {
  currentStepIdx: number;
  completedSteps: boolean[];
  isProcessingAction: boolean;
  setIsProcessingAction: (v: boolean) => void;
  advanceStep: (stepLogs: string[]) => void;
  addLog: (text: string, type?: 'system' | 'action' | 'data' | 'ok' | 'processing') => void;
  isSuccess: boolean;
  scheduleTimeout: ManagedTimeoutScheduler;
  onVerificationProgressChange: (progress: VerificationProgressState) => void;
}

/**
 * QR code graphic used by the bank account client simulator.
 */
function BankAccountQrCodeGraphic({ className = "w-44 h-44 text-[#0F1E36]" }: { className?: string }) {
  // Dense 21x21 QR Code matrix layout
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

function BankAccountClientSimulator({
  currentStepIdx,
  completedSteps,
  isProcessingAction,
  setIsProcessingAction,
  advanceStep,
  addLog,
  isSuccess,
  scheduleTimeout,
  onVerificationProgressChange,
}: BankAccountClientSimulatorProps) {
  const { language } = useLanguage();
  const translations = getLocalizedRecord(
    BANK_ACCOUNT_DEMO_PAGE_TRANSLATIONS,
    language as keyof typeof BANK_ACCOUNT_DEMO_PAGE_TRANSLATIONS,
    'BANK_ACCOUNT_DEMO_PAGE_TRANSLATIONS',
  );
  const t = translations.scenario;
  const logT = translations.logs;
  const uiT = translations.flowUi;

  // Scenario states
  const [accountType, setAccountType] = useState<BankAccountType>('checking');
  const [onboardingMethod, setOnboardingMethod] = useState<BankAccountOnboardingMethod>('manual');
  const [bankName, setBankName] = useState('');
  const [bankSsn, setBankSsn] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bankAddress, setBankAddress] = useState('');
  const [businessLegalName, setBusinessLegalName] = useState('');
  const [businessRegistrationNumber, setBusinessRegistrationNumber] = useState('');
  const [businessOwnerIdentityNumber, setBusinessOwnerIdentityNumber] = useState('');
  const [businessLicenseFileName, setBusinessLicenseFileName] = useState('');
  const [bankLivenessScanned, setBankLivenessScanned] = useState(false);
  const [bankAmlCleared, setBankAmlCleared] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // QR Modal States (5-second simulation countdown)
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [qrSeconds, setQrSeconds] = useState(5);
  const [isCryptographicallySecured, setIsCryptographicallySecured] = useState(false);

  // Step 2 verification state shared by every account and onboarding flow.
  const [verificationDetailCount, setVerificationDetailCount] = useState(0);
  const [verificationStatus, setVerificationStatus] = useState<VerificationRunStatus>('idle');

  // Step 4 Server-side Automated AML states
  const [amlSeconds, setAmlSeconds] = useState(10);
  const [amlStatus, setAmlStatus] = useState<'idle' | 'running' | 'passed' | 'failed'>('idle');
  const isBusinessAccount = accountType === 'business';
  const isUsingIdentra = onboardingMethod === 'identra';
  const isProfileVerifiedByIdentra = isUsingIdentra && isCryptographicallySecured;
  const isBusinessOwnershipMatched = Boolean(
    isBusinessAccount
    && businessRegistrationNumber.trim()
    && businessOwnerIdentityNumber.trim()
    && bankSsn.trim()
    && businessOwnerIdentityNumber === bankSsn,
  );
  const verificationSteps = useMemo<VerificationProgressStep[]>(() => {
    let startIndex = 0;
    const applicableSteps = isBusinessAccount
      ? (t.businessVerificationSteps || [])
      : (t.businessVerificationSteps || []).slice(0, 1);

    return applicableSteps.map((step: {
      label: string;
      identraDetails: string[];
      manualDetails: string[];
    }) => {
      const details = isUsingIdentra ? step.identraDetails : step.manualDetails;
      const normalizedStep = { label: step.label, details, startIndex };
      startIndex += details.length;
      return normalizedStep;
    });
  }, [isBusinessAccount, isUsingIdentra, t.businessVerificationSteps]);
  const verificationEvents = useMemo(
    () => verificationSteps.flatMap((step, stepIndex) =>
      step.details.map((detail, detailIndex) => ({
        detail,
        isLastInStep: detailIndex === step.details.length - 1,
        stepIndex,
      }))),
    [verificationSteps],
  );
  const verificationProgress = useMemo<VerificationProgressState>(() => ({
    steps: verificationSteps,
    detailCount: verificationDetailCount,
    totalDetails: verificationEvents.length,
    status: verificationStatus,
  }), [verificationDetailCount, verificationEvents.length, verificationStatus, verificationSteps]);
  const verificationPercent = Math.round(
    (verificationDetailCount / Math.max(1, verificationEvents.length)) * 100,
  );
  const activeVerificationDetail = verificationStatus === 'running'
    ? verificationEvents[verificationDetailCount]?.detail
    : null;

  useEffect(() => {
    onVerificationProgressChange(verificationProgress);
  }, [currentStepIdx, onVerificationProgressChange, verificationProgress]);

  // Handle 5-second QR scanning countdown
  useEffect(() => {
    if (!isQrModalOpen) return;

    if (qrSeconds <= 0) {
      setIsQrModalOpen(false);
      setBankName(uiT.qrName);
      setBankSsn(uiT.qrIdentityNumber);
      setEmail(uiT.qrEmail);
      setPhone(uiT.qrPhone);
      setBankAddress(uiT.qrAddress);
      if (accountType === 'business') {
        setBusinessLegalName(uiT.qrBusinessName);
        setBusinessRegistrationNumber(uiT.qrBusinessRegistrationNumber);
        setBusinessOwnerIdentityNumber(uiT.qrBusinessOwnerIdentityNumber);
        addLog(uiT.businessCredentialVerifiedLog, 'ok');
      }
      setIsCryptographicallySecured(true);
      addLog(uiT.qrScanSuccessLog, 'ok');
      return;
    }

    const timer = setTimeout(() => {
      setQrSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isQrModalOpen, qrSeconds, accountType, addLog, uiT]);

  // Run the input-dependent verification sequence in Step 2.
  useEffect(() => {
    if (currentStepIdx !== 1 || completedSteps[1] || verificationEvents.length === 0) return;

    if (verificationStatus === 'idle') {
      setVerificationDetailCount(0);
      setVerificationStatus('running');
      addLog(
        isBusinessAccount ? t.businessVerificationStartedLog : verificationSteps[0].label,
        'processing',
      );
      return;
    }

    if (verificationStatus !== 'running') return;

    if (verificationDetailCount >= verificationEvents.length) {
      setVerificationStatus('passed');
      setIsProcessingAction(false);
      advanceStep([
        isBusinessAccount ? t.businessVerificationSuccess : t.govIdVerifiedSuccess,
      ]);
      return;
    }

    const timer = setTimeout(() => {
      const event = verificationEvents[verificationDetailCount];
      addLog(event.detail, event.isLastInStep ? 'ok' : 'processing');
      setVerificationDetailCount((count) => count + 1);
    }, 1100);

    return () => clearTimeout(timer);
  }, [
    addLog,
    advanceStep,
    completedSteps,
    currentStepIdx,
    isBusinessAccount,
    isUsingIdentra,
    t.businessVerificationStartedLog,
    t.businessVerificationSuccess,
    t.govIdVerifiedSuccess,
    verificationDetailCount,
    verificationEvents,
    verificationStatus,
    verificationSteps,
  ]);

  // Handle 10-second Server-side Automated AML screening for Step 4
  useEffect(() => {
    if (currentStepIdx !== 3 || completedSteps[3]) return;

    if (amlStatus === 'idle') {
      setAmlStatus('running');
      setAmlSeconds(10);
      addLog(uiT.amlStartedLog, 'processing');
      return;
    }

    if (amlStatus === 'running') {
      if (amlSeconds <= 0) {
        const cleanPhone = phone.replace(/\D/g, '');
        if (cleanPhone === '0968268030') {
          setAmlStatus('failed');
          addLog(uiT.amlFailedLog, 'system');
        } else {
          setAmlStatus('passed');
          setBankAmlCleared(true);
          addLog(uiT.amlPassedLog, 'ok');
        }
        return;
      }

      const timer = setTimeout(() => {
        setAmlSeconds((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [currentStepIdx, completedSteps, amlStatus, amlSeconds, phone, addLog, uiT]);

  // Reset internal states when currentStepIdx is reset
  useEffect(() => {
    if (currentStepIdx === 0) {
      setAccountType('checking');
      setOnboardingMethod('manual');
      setBankName('');
      setBankSsn('');
      setEmail('');
      setPhone('');
      setBankAddress('');
      setBusinessLegalName('');
      setBusinessRegistrationNumber('');
      setBusinessOwnerIdentityNumber('');
      setBusinessLicenseFileName('');
      setBankLivenessScanned(false);
      setBankAmlCleared(false);
      setError(null);
      setIsQrModalOpen(false);
      setQrSeconds(5);
      setIsCryptographicallySecured(false);
      setVerificationDetailCount(0);
      setVerificationStatus('idle');
      setAmlSeconds(10);
      setAmlStatus('idle');
    } else {
      setError(null);
    }
  }, [currentStepIdx]);

  const handleAccountTypeChange = (nextAccountType: BankAccountType) => {
    if (nextAccountType === accountType) {
      setError(null);
      return;
    }

    setAccountType(nextAccountType);
    setError(null);

    if (isUsingIdentra) {
      setBankName('');
      setBankSsn('');
      setEmail('');
      setPhone('');
      setBankAddress('');
      setBusinessLegalName('');
      setBusinessRegistrationNumber('');
      setBusinessOwnerIdentityNumber('');
      setBusinessLicenseFileName('');
      setIsQrModalOpen(false);
      setQrSeconds(5);
      setIsCryptographicallySecured(false);
      setVerificationDetailCount(0);
      setVerificationStatus('idle');
      return;
    }

    if (nextAccountType !== 'business') {
      setBusinessLegalName('');
      setBusinessRegistrationNumber('');
      setBusinessOwnerIdentityNumber('');
      setBusinessLicenseFileName('');
    }
  };

  const handleOnboardingMethodChange = (method: BankAccountOnboardingMethod) => {
    if (method === onboardingMethod) {
      setError(null);
      return;
    }

    setOnboardingMethod(method);
    setError(null);
    setBankName('');
    setBankSsn('');
    setEmail('');
    setPhone('');
    setBankAddress('');
    setBusinessLegalName('');
    setBusinessRegistrationNumber('');
    setBusinessOwnerIdentityNumber('');
    setBusinessLicenseFileName('');
    setIsQrModalOpen(false);
    setQrSeconds(5);
    setIsCryptographicallySecured(false);
    setVerificationDetailCount(0);
    setVerificationStatus('idle');
  };

  const startQrScanModal = () => {
    setOnboardingMethod('identra');
    setError(null);
    setQrSeconds(5);
    setIsQrModalOpen(true);
    addLog(uiT.qrScanStartedLog, 'action');
  };

  const accountOptions: Array<{ id: BankAccountType; label: string; badge: string }> = [
    { id: 'checking', label: t.checkingAccount, badge: t.popularBadge },
    { id: 'savings', label: t.savingsAccount, badge: t.apyBadge },
    { id: 'business', label: t.businessAccount, badge: t.proBadge },
  ];

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
        {/* Step 0: Real Bank Account Opening Form */}
        {currentStepIdx === 0 && !completedSteps[0] && (
          <motion.div
            key="bank-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-5"
          >
            {/* Real Bank Account Application Banner (Soft Bright Light Theme) */}
            <div className="rounded-2xl bg-gradient-to-br from-[#E2E6FF] via-[#FAFBFD] to-white border border-[#354CE1]/20 p-5 text-slate-900 shadow-2xs relative overflow-hidden">
              <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-[#354CE1]/10 blur-2xl pointer-events-none" />
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Landmark className="h-5 w-5 text-[#354CE1]" />
                    <span className="font-display text-base font-bold tracking-tight text-[#0F1E36]">
                      {t.digitalBankingPortal}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    {t.onlineApplicationSubtitle}
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-[#354CE1]/10 px-3 py-1 text-[11px] font-mono text-[#354CE1] backdrop-blur-xs border border-[#354CE1]/20 font-semibold">
                  <Lock className="h-3 w-3 text-[#354CE1]" />
                  <span>{t.fdicInsured}</span>
                </div>
              </div>
            </div>

            {/* Account Type Selection Tabs */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                {t.selectAccountType}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {accountOptions.map((acc) => (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => handleAccountTypeChange(acc.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      accountType === acc.id
                        ? 'border-[#354CE1] bg-[#354CE1]/5 text-[#354CE1] ring-1 ring-[#354CE1]'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span className="block text-xs font-bold">{acc.label}</span>
                    <span className="block text-[10px] text-slate-400 font-mono mt-0.5">{acc.badge}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Onboarding Method Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                {t.chooseOnboardingMethod}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleOnboardingMethodChange('manual')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    onboardingMethod === 'manual'
                      ? 'border-[#354CE1] bg-[#354CE1]/5 text-[#354CE1] ring-1 ring-[#354CE1]'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="block text-xs font-bold">{t.manualEntry}</span>
                  <span className="block text-[11px] text-slate-500 leading-snug mt-1">{t.manualEntryDesc}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleOnboardingMethodChange('identra')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    onboardingMethod === 'identra'
                      ? 'border-[#354CE1] bg-[#354CE1]/5 text-[#354CE1] ring-1 ring-[#354CE1]'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="block text-xs font-bold">{t.useIdentra}</span>
                  <span className="block text-[11px] text-slate-500 leading-snug mt-1">{t.useIdentraDesc}</span>
                </button>
              </div>
            </div>

            {isUsingIdentra && (
              <div className="rounded-2xl border border-indigo-200/80 bg-gradient-to-br from-[#E2E6FF] to-[#FAFBFD] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
                <div className="flex items-center gap-3.5">
                  <div className="h-16 w-16 bg-white p-1.5 rounded-xl border border-indigo-100 shadow-xs shrink-0 flex items-center justify-center relative group">
                    <BankAccountQrCodeGraphic className="h-12 w-12 text-[#354CE1]" />
                    <div className="absolute inset-0 bg-[#354CE1]/5 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Sparkles className="h-5 w-5 text-[#354CE1] animate-spin" />
                    </div>
                  </div>
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <span className="font-bold text-xs text-slate-900">{t.fillWithIdentra}</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#354CE1] text-[10px] font-bold text-white font-mono uppercase tracking-wider">
                        {uiT.oneClickAutofillBadge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      {t.qrAutofillDesc}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={startQrScanModal}
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-indigo-50 border border-[#354CE1]/30 text-[#354CE1] text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer hover:border-[#354CE1] active:scale-[0.98]"
                >
                  <BankAccountQrCodeGraphic className="h-3.5 w-3.5 text-[#354CE1]" />
                  <span>{t.scanQrButton}</span>
                </button>
              </div>
            )}

            {error && (
              <div className="bg-rose-50 text-rose-600 border border-rose-100 p-3 rounded-xl text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Cryptographically Secured Identity Banner */}
            {isProfileVerifiedByIdentra && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-50 border border-emerald-200/80 p-3.5 rounded-2xl flex flex-wrap items-center justify-between gap-2 text-xs shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                  <span className="font-bold text-emerald-950">{t.cryptographicallySecuredBadge}</span>
                </div>
                <span className="font-mono text-[10px] bg-emerald-600 text-white px-2.5 py-0.5 rounded-full font-bold shadow-2xs">
                  {uiT.cryptoProofVerifiedLabel}
                </span>
              </motion.div>
            )}

            {/* Application Input Fields */}
            <div className={`space-y-4 rounded-2xl border bg-white p-4 sm:p-5 shadow-xs transition-all ${
              isProfileVerifiedByIdentra ? 'border-emerald-300 ring-1 ring-emerald-300/40 bg-emerald-50/10' : 'border-slate-200/80'
            }`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">{t.fullName}</label>
                    {isProfileVerifiedByIdentra && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-mono font-bold bg-emerald-100/80 px-1.5 py-0.5 rounded border border-emerald-300/60">
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        {t.cryptoVerifiedPill}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={bankName}
                      onChange={(e) => {
                        if (!isUsingIdentra) {
                          setError(null);
                          setBankName(e.target.value);
                        }
                      }}
                      readOnly={isUsingIdentra}
                      disabled={isProcessingAction}
                      placeholder={t.fullNamePlaceholder}
                      className={`w-full bg-white border rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20 font-medium disabled:opacity-60 disabled:bg-slate-50 disabled:cursor-not-allowed transition-all ${
                        error && !bankName.trim() ? 'border-rose-300 focus:ring-rose-200' : isProfileVerifiedByIdentra ? 'bg-emerald-50/30 border-emerald-300 text-emerald-950 font-bold cursor-not-allowed' : isUsingIdentra ? 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed' : 'border-slate-200'
                      }`}
                    />
                    {isProfileVerifiedByIdentra && (
                      <Lock className="h-3.5 w-3.5 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">{t.identityNumberSsn}</label>
                    {isProfileVerifiedByIdentra && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-mono font-bold bg-emerald-100/80 px-1.5 py-0.5 rounded border border-emerald-300/60">
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        {t.cryptoVerifiedPill}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={bankSsn}
                      onChange={(e) => {
                        if (!isUsingIdentra) {
                          setError(null);
                          setBankSsn(e.target.value);
                        }
                      }}
                      readOnly={isUsingIdentra}
                      disabled={isProcessingAction}
                      placeholder={t.ssnPlaceholder}
                      className={`w-full bg-white border rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20 font-mono disabled:opacity-60 disabled:bg-slate-50 disabled:cursor-not-allowed transition-all ${
                        error && !bankSsn.trim() ? 'border-rose-300 focus:ring-rose-200' : isProfileVerifiedByIdentra ? 'bg-emerald-50/30 border-emerald-300 text-emerald-950 font-bold cursor-not-allowed' : isUsingIdentra ? 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed' : 'border-slate-200'
                      }`}
                    />
                    {isProfileVerifiedByIdentra && (
                      <Lock className="h-3.5 w-3.5 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">{t.emailAddress}</label>
                    {isProfileVerifiedByIdentra && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-mono font-bold bg-emerald-100/80 px-1.5 py-0.5 rounded border border-emerald-300/60">
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        {t.cryptoVerifiedPill}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        if (!isUsingIdentra) setEmail(e.target.value);
                      }}
                      readOnly={isUsingIdentra}
                      disabled={isProcessingAction}
                      placeholder={t.emailPlaceholder}
                      className={`w-full bg-white border rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20 font-medium disabled:opacity-60 disabled:bg-slate-50 transition-all ${
                        isProfileVerifiedByIdentra ? 'bg-emerald-50/30 border-emerald-300 text-emerald-950 font-bold cursor-not-allowed' : isUsingIdentra ? 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed' : 'border-slate-200'
                      }`}
                    />
                    {isProfileVerifiedByIdentra && (
                      <Lock className="h-3.5 w-3.5 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">{t.phoneNumber}</label>
                    {isProfileVerifiedByIdentra && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-mono font-bold bg-emerald-100/80 px-1.5 py-0.5 rounded border border-emerald-300/60">
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        {t.cryptoVerifiedPill}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => {
                        if (!isUsingIdentra) setPhone(e.target.value);
                      }}
                      readOnly={isUsingIdentra}
                      disabled={isProcessingAction}
                      placeholder={t.phonePlaceholder}
                      className={`w-full bg-white border rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20 font-mono disabled:opacity-60 disabled:bg-slate-50 transition-all ${
                        isProfileVerifiedByIdentra ? 'bg-emerald-50/30 border-emerald-300 text-emerald-950 font-bold cursor-not-allowed' : isUsingIdentra ? 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed' : 'border-slate-200'
                      }`}
                    />
                    {isProfileVerifiedByIdentra && (
                      <Lock className="h-3.5 w-3.5 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">{t.physicalAddress}</label>
                  {isProfileVerifiedByIdentra && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-mono font-bold bg-emerald-100/80 px-1.5 py-0.5 rounded border border-emerald-300/60">
                      <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                      {t.cryptoVerifiedPill}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={bankAddress}
                    onChange={(e) => {
                      if (!isUsingIdentra) {
                        setError(null);
                        setBankAddress(e.target.value);
                      }
                    }}
                    readOnly={isUsingIdentra}
                    disabled={isProcessingAction}
                    placeholder={t.addressPlaceholder}
                    className={`w-full bg-white border rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20 font-medium disabled:opacity-60 disabled:bg-slate-50 disabled:cursor-not-allowed transition-all ${
                      error && !bankAddress.trim() ? 'border-rose-300 focus:ring-rose-200' : isProfileVerifiedByIdentra ? 'bg-emerald-50/30 border-emerald-300 text-emerald-950 font-bold cursor-not-allowed' : isUsingIdentra ? 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed' : 'border-slate-200'
                    }`}
                  />
                  {isProfileVerifiedByIdentra && (
                    <Lock className="h-3.5 w-3.5 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  )}
                </div>
              </div>

              {isBusinessAccount && (
                <div className={`rounded-2xl border p-4 space-y-3 ${
                  isProfileVerifiedByIdentra ? 'border-emerald-200 bg-emerald-50/40' : 'border-slate-200 bg-slate-50/70'
                }`}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">{t.businessDetailsTitle}</h4>
                      {isUsingIdentra && (
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          {t.businessCredentialNotice}
                        </p>
                      )}
                    </div>
                    {isProfileVerifiedByIdentra && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-mono font-bold bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                        <ShieldCheck className="h-3 w-3" />
                        {isBusinessOwnershipMatched ? t.businessOwnershipMatched : t.cryptoVerifiedPill}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">{t.businessLegalName}</label>
                      <div className="relative">
                        <Landmark className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          value={businessLegalName}
                          onChange={(e) => {
                            if (!isUsingIdentra) {
                              setError(null);
                              setBusinessLegalName(e.target.value);
                            }
                          }}
                          readOnly={isUsingIdentra}
                          disabled={isProcessingAction}
                          placeholder={t.businessLegalNamePlaceholder}
                          className={`w-full bg-white border rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20 font-medium disabled:opacity-60 disabled:bg-slate-50 transition-all ${
                            error && !businessLegalName.trim()
                              ? 'border-rose-300 focus:ring-rose-200'
                              : isProfileVerifiedByIdentra
                                ? 'bg-emerald-50/30 border-emerald-300 text-emerald-950 font-bold cursor-not-allowed'
                                : isUsingIdentra
                                  ? 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed'
                                  : 'border-slate-200'
                          }`}
                        />
                        {isProfileVerifiedByIdentra && (
                          <Lock className="h-3.5 w-3.5 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2" />
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                        {t.businessRegistrationNumber}
                      </label>
                      <div className="relative">
                        <Database className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          value={businessRegistrationNumber}
                          onChange={(event) => {
                            if (!isUsingIdentra) {
                              setError(null);
                              setBusinessRegistrationNumber(event.target.value);
                            }
                          }}
                          readOnly={isUsingIdentra}
                          disabled={isProcessingAction}
                          placeholder={isUsingIdentra ? t.identraVerifiedFieldPlaceholder : t.businessRegistrationNumberPlaceholder}
                          className={`w-full border rounded-xl pl-10 pr-10 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20 disabled:opacity-60 disabled:bg-slate-50 transition-all ${
                            error && !businessRegistrationNumber.trim()
                              ? 'border-rose-300 focus:ring-rose-200'
                              : isProfileVerifiedByIdentra
                                ? 'bg-emerald-50/30 border-emerald-300 text-emerald-950 font-bold cursor-not-allowed'
                                : isUsingIdentra
                                  ? 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed'
                                  : 'bg-white border-slate-200'
                          }`}
                        />
                        {isProfileVerifiedByIdentra && (
                          <Lock className="h-3.5 w-3.5 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2" />
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                        {t.businessOwnerIdentityNumber}
                      </label>
                      <div className="relative">
                        <Fingerprint className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          value={businessOwnerIdentityNumber}
                          onChange={(event) => {
                            if (!isUsingIdentra) {
                              setError(null);
                              setBusinessOwnerIdentityNumber(event.target.value);
                            }
                          }}
                          readOnly={isUsingIdentra}
                          disabled={isProcessingAction}
                          placeholder={isUsingIdentra ? t.identraVerifiedFieldPlaceholder : t.businessOwnerIdentityNumberPlaceholder}
                          className={`w-full border rounded-xl pl-10 pr-10 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20 disabled:opacity-60 disabled:bg-slate-50 transition-all ${
                            error && (!businessOwnerIdentityNumber.trim() || businessOwnerIdentityNumber !== bankSsn)
                              ? 'border-rose-300 focus:ring-rose-200'
                              : isProfileVerifiedByIdentra
                                ? 'bg-emerald-50/30 border-emerald-300 text-emerald-950 font-bold cursor-not-allowed'
                                : isUsingIdentra
                                  ? 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed'
                                  : 'bg-white border-slate-200'
                          }`}
                        />
                        {isProfileVerifiedByIdentra && (
                          <Lock className="h-3.5 w-3.5 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2" />
                        )}
                      </div>
                    </div>

                    {!isUsingIdentra && (
                      <label className={`rounded-xl border p-3.5 flex items-center gap-3 bg-white transition cursor-pointer hover:border-[#354CE1]/50 ${
                        error && !businessLicenseFileName ? 'border-rose-300 bg-rose-50/40' : 'border-slate-200'
                      } md:col-span-2`}>
                        <Camera className="h-5 w-5 text-[#354CE1] shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {businessLicenseFileName || t.businessRegistrationLicense}
                          </p>
                          <p className="text-[11px] text-slate-500 leading-relaxed">
                            {businessLicenseFileName ? t.businessLicenseUploaded : t.businessLicenseUploadHint}
                          </p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={isProcessingAction}
                          onChange={(event) => {
                            const fileName = event.target.files?.[0]?.name || '';
                            setError(null);
                            setBusinessLicenseFileName(fileName);
                          }}
                        />
                      </label>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Identra Security Trust Guarantee Box */}
            <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-3.5 flex items-start gap-3 text-xs text-slate-600">
              <ShieldCheck className="h-5 w-5 text-[#354CE1] shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <strong className="font-semibold text-slate-900 block">{t.bankShieldTitle}</strong>
                <p className="text-[11px] leading-relaxed text-slate-500">{t.bankShieldDesc}</p>
              </div>
            </div>

            <button
              onClick={() => {
                if (isUsingIdentra && !isProfileVerifiedByIdentra) {
                  setError(t.identraScanRequiredError);
                  return;
                }
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
                if (isBusinessAccount && !businessLegalName.trim()) {
                  setError(t.businessLegalNameError);
                  return;
                }
                if (isBusinessAccount && !businessRegistrationNumber.trim()) {
                  setError(t.businessRegistrationNumberError);
                  return;
                }
                if (isBusinessAccount && !businessOwnerIdentityNumber.trim()) {
                  setError(t.businessOwnerIdentityNumberError);
                  return;
                }
                if (isBusinessAccount && !isBusinessOwnershipMatched) {
                  setError(t.businessOwnershipMismatchError);
                  return;
                }
                if (isBusinessAccount && !isProfileVerifiedByIdentra && !businessLicenseFileName) {
                  setError(t.businessLicenseError);
                  return;
                }
                setError(null);
                setIsProcessingAction(true);
                addLog(formatText(logT.submittingProfile, { name: bankName }), 'action');
                scheduleTimeout(() => {
                  setIsProcessingAction(false);
                  advanceStep([
                    formatText(logT.profileReceived, { name: bankName, ssn: bankSsn }),
                    ...(isBusinessAccount
                      ? [
                        isProfileVerifiedByIdentra
                          ? formatText(logT.businessCredentialResolved, {
                            businessName: businessLegalName,
                            registrationNumber: businessRegistrationNumber,
                          })
                          : formatText(logT.businessLicenseSubmitted, {
                            fileName: businessLicenseFileName,
                            registrationNumber: businessRegistrationNumber,
                          }),
                      ]
                      : []),
                  ]);
                }, 1200);
              }}
              disabled={isProcessingAction}
              className={`w-full py-3.5 bg-[#354CE1] text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 ${
                isProcessingAction
                  ? 'opacity-60 cursor-not-allowed'
                  : 'hover:bg-[#2539BE] cursor-pointer active:scale-[0.99] shadow-lg shadow-[#354CE1]/20'
              }`}
            >
              {isProcessingAction ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="h-4 w-4 text-[#FFBF43]" />
                  <span>{t.submitRegistrationProfile}</span>
                </>
              )}
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* Step 1: ID Card Scan / Automated Gov ID Check */}
        {currentStepIdx === 1 && !completedSteps[1] && (
          <motion.div
            key="bank-id-scan"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-5"
          >
            <div className="bg-[#354CE1]/5 p-4 rounded-2xl border border-indigo-100/40 text-xs text-indigo-950">
              {isBusinessAccount
                ? (isUsingIdentra ? t.businessVerificationIdentraDescription : t.businessVerificationManualDescription)
                : t.step2Description}
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {isBusinessAccount ? t.businessVerificationTitle : verificationSteps[0]?.label}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {isUsingIdentra ? t.businessVerificationIdentraFlow : t.businessVerificationManualFlow}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#354CE1]/20 bg-[#354CE1]/5 px-3 py-1 text-[10px] font-mono font-bold text-[#354CE1]">
                  <Sparkles className="h-3 w-3 animate-spin" />
                  {verificationPercent}%
                </span>
              </div>

              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#354CE1] to-emerald-500"
                  animate={{
                    width: `${verificationPercent}%`,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <div className="min-h-12">
                <AnimatePresence mode="wait">
                  {activeVerificationDetail && (
                    <motion.div
                      key={activeVerificationDetail}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="flex min-h-12 items-center gap-3 rounded-xl border border-[#354CE1]/20 bg-[#354CE1]/5 px-4 py-3"
                    >
                      <span className="h-2 w-2 shrink-0 animate-ping rounded-full bg-[#354CE1]" />
                      <p className="text-[11px] font-semibold leading-relaxed text-[#354CE1]">
                        {activeVerificationDetail}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
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

            <div className="bg-slate-50 aspect-video rounded-2xl border border-slate-200 relative overflow-hidden flex flex-col items-center justify-center text-slate-600 shadow-inner">
              {/* Scanning oval */}
              <div className={`relative h-44 w-36 rounded-[50%] border-2 transition-all flex items-center justify-center ${
                bankLivenessScanned ? 'border-[#354CE1] bg-[#354CE1]/5' : 'border-slate-300'
              }`}>
                <User className={`w-24 h-24 transition-colors ${
                  bankLivenessScanned ? 'text-[#354CE1]' : 'text-slate-400'
                }`} />
                {bankLivenessScanned && (
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute inset-0 rounded-[50%] border-t-2 border-[#354CE1]"
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
                scheduleTimeout(() => {
                  setIsProcessingAction(false);
                  setBankLivenessScanned(false);
                  advanceStep([t.livenessVerifiedSuccess]);
                }, 2500);
              }}
              disabled={isProcessingAction}
              className={`w-full py-3.5 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 ${
                isProcessingAction
                  ? 'opacity-60 cursor-not-allowed bg-[#354CE1]/60'
                  : 'bg-[#354CE1] hover:bg-[#2539BE] cursor-pointer shadow-lg shadow-[#354CE1]/20'
              }`}
            >
              <Fingerprint className="w-4 h-4 text-[#FFBF43]" />
              <span>{t.verifyBiometricLiveness}</span>
            </button>
          </motion.div>
        )}

        {/* Step 3: Server-Side Automated AML Watchlist Query */}
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

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-600 font-bold uppercase tracking-wider">{t.registryScreening}</span>
                <div className="flex items-center gap-1 text-xs text-slate-700 font-mono">
                  <Database className="w-3.5 h-3.5 text-[#354CE1] animate-pulse" />
                  <span>{t.onlineConnection}</span>
                </div>
              </div>
              <div className="space-y-2 font-mono text-[11px] text-slate-700">
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">{t.ofacSanctionsList}</span>
                  <span className={amlStatus === 'passed' ? 'text-emerald-600 font-bold' : amlStatus === 'failed' ? 'text-rose-600 font-bold' : 'text-amber-600 font-bold'}>
                    {amlStatus === 'passed' ? t.passedStatus : amlStatus === 'failed' ? uiT.failedMatchStatus : t.pendingStatus}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">{t.interpolRedNotices}</span>
                  <span className={amlStatus === 'passed' ? 'text-emerald-600 font-bold' : amlStatus === 'failed' ? 'text-rose-600 font-bold' : 'text-amber-600 font-bold'}>
                    {amlStatus === 'passed' ? t.passedStatus : amlStatus === 'failed' ? uiT.failedMatchStatus : t.pendingStatus}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">{t.politicallyExposedPersons}</span>
                  <span className={amlStatus === 'passed' ? 'text-emerald-600 font-bold' : amlStatus === 'failed' ? 'text-rose-600 font-bold' : 'text-amber-600 font-bold'}>
                    {amlStatus === 'passed' ? t.passedStatus : amlStatus === 'failed' ? uiT.pepFlaggedStatus : t.pendingStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Server-side Automated Running State */}
            {amlStatus === 'running' && (
              <div className="bg-[#FAFBFD] p-5 rounded-2xl border border-indigo-100 flex flex-col items-center text-center space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#354CE1] font-mono">
                  <Sparkles className="h-4 w-4 animate-spin" />
                  <span>{t.amlRunningTitle} ({amlSeconds}s)</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#354CE1] to-[#2539BE]"
                    style={{ width: `${((10 - amlSeconds) / 10) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            )}

            {/* Server-side Failed State (for 0968268030) */}
            {amlStatus === 'failed' && (
              <div className="bg-rose-50 border border-rose-200 p-5 rounded-2xl space-y-3 text-rose-950">
                <div className="flex items-center gap-2.5">
                  <ShieldAlert className="h-5 w-5 text-rose-600 shrink-0" />
                  <h4 className="font-bold text-xs sm:text-sm">{t.amlFailedTitle}</h4>
                </div>
                <p className="text-xs text-rose-700 leading-relaxed">
                  {t.amlFailedDesc}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setAmlStatus('idle');
                    setAmlSeconds(10);
                  }}
                  className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>{t.retryButton}</span>
                </button>
              </div>
            )}

            {/* Server-side Passed State */}
            {amlStatus === 'passed' && (
              <div className="space-y-4">
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center gap-3 text-xs text-emerald-950">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <div>
                    <strong className="font-bold block text-emerald-900">{uiT.amlPassedTitle}</strong>
                    <p className="text-[11px] text-emerald-700">{uiT.amlPassedDescription}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    advanceStep([
                      formatText(logT.amlCheckComplete, { name: (bankName || uiT.defaultHolderName).toUpperCase() }),
                    ]);
                  }}
                  className="w-full py-3.5 bg-[#354CE1] hover:bg-[#2539BE] text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#354CE1]/20 active:scale-[0.99]"
                >
                  <CreditCard className="h-4 w-4 text-[#FFBF43]" />
                  <span>{t.issueCardButton}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Success Results screen */}
        {isSuccess && (
          <motion.div
            key="bank-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 flex-1 flex flex-col items-center justify-center text-center py-4"
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
            <div className="w-72 aspect-[1.586] rounded-2xl bg-gradient-to-tr from-[#0F1E36] via-[#142FA0] to-[#354CE1] text-white p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-[#FFBF43]/15 rounded-full blur-2xl" />
              <div className="flex justify-between items-start z-10">
                <div className="flex items-center gap-1.5">
                  <div className="h-6 w-6 rounded-md bg-white/10 flex items-center justify-center backdrop-blur">
                    <Landmark className="w-3.5 h-3.5 text-[#FFBF43]" />
                  </div>
                  <span className="font-bold tracking-tight text-[11px] uppercase">{t.aeroBank}</span>
                </div>
                <span className="text-[9px] font-mono font-bold text-[#FFBF43] tracking-wider">{uiT.visaPlatinumLabel}</span>
              </div>

              <div className="space-y-1.5 z-10">
                <span className="text-[9px] font-mono text-indigo-100 tracking-widest">{uiT.cardHolderLabel}</span>
                <p className="font-bold tracking-wide text-sm font-display truncate uppercase">{bankName}</p>
              </div>

              <div className="flex justify-between items-end z-10 font-mono">
                <div className="space-y-1">
                  <span className="text-[7px] text-indigo-100 block">{uiT.cardNumberLabel}</span>
                  <span className="text-xs font-semibold tracking-widest text-indigo-100 font-mono">•••• •••• •••• 4812</span>
                </div>
                <div className="text-right">
                  <span className="text-[7px] text-indigo-300 block">CVV</span>
                  <span className="text-[10px] font-bold">294</span>
                </div>
              </div>
            </div>

            {/* Delivery notice or Verifiable Credential QR code depending on fill method */}
            {isCryptographicallySecured ? (
              <div className="bg-emerald-50/70 border border-emerald-200 p-5 rounded-3xl text-xs text-emerald-950 space-y-3 text-center max-w-sm shadow-sm flex flex-col items-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white font-mono font-bold text-[10px] uppercase tracking-wider shadow-2xs">
                  <Sparkles className="h-3 w-3" />
                  {uiT.vcBadgeLabel}
                </div>
                <p className="text-slate-600 text-xs leading-relaxed font-medium">
                  {t.identraVcClaimNotice}
                </p>
                {/* Real QR Code for VC Claim */}
                <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-md flex flex-col items-center relative group">
                  <BankAccountQrCodeGraphic className="h-40 w-40 text-[#0F1E36]" />
                  <span className="text-[10px] font-mono font-bold text-emerald-700 mt-2 tracking-wider">
                    {t.claimVcQrTitle}
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-xs text-slate-700 space-y-1.5 text-center max-w-sm shadow-xs">
                <div className="flex items-center justify-center gap-1.5 font-bold text-slate-900">
                  <Truck className="h-4.5 w-4.5 text-[#354CE1]" />
                  <span>{uiT.physicalCardTitle}</span>
                </div>
                <p className="text-slate-500 leading-relaxed text-[11px]">
                  {t.physicalCardDeliveryNotice}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Help Note */}
      <div className="border-t border-slate-200/60 pt-4 flex items-center gap-2 text-[11px] text-slate-500 justify-center">
        <ShieldCheck className="w-4 h-4 text-[#354CE1]" />
        <span>{t.securityFooter}</span>
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
                      {t.scanQrModalTitle}
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
                    <BankAccountQrCodeGraphic className="h-48 w-48 text-[#0F1E36]" />
                  </div>
                </div>

                {/* Soft Countdown Status Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#354CE1]/10 border border-[#354CE1]/20 text-[#354CE1] text-xs font-mono font-bold">
                  <Sparkles className="h-3.5 w-3.5 animate-spin text-[#354CE1]" />
                  <span>{t.waitingForScan.replace('{seconds}', qrSeconds.toString())}</span>
                </div>

                <p className="text-xs text-slate-500 text-center leading-relaxed px-2">
                  {t.qrModalInstructions}
                </p>
              </div>

              {/* Modal Footer Cancel Button */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setIsQrModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  {t.cancelButton}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface BankAccountDemoPageProps {
  onBackToList: () => void;
}

interface BankAccountDemoStep {
  label: string;
  action: string;
  logText: string;
}

interface BankAccountDemoCopy {
  id: DemoScenarioId;
  tag: string;
  title: string;
  desc: string;
  security: string;
  successResult: string;
  steps: BankAccountDemoStep[];
}

interface BankAccountDemoScenario extends BankAccountDemoCopy {
  icon: React.ComponentType<any>;
}

const formatText = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ''));

export default function BankAccountDemoPage({ onBackToList }: BankAccountDemoPageProps) {
  const { language } = useLanguage();
  const translations = getLocalizedRecord(
    BANK_ACCOUNT_DEMO_PAGE_TRANSLATIONS,
    language as keyof typeof BANK_ACCOUNT_DEMO_PAGE_TRANSLATIONS,
    'BANK_ACCOUNT_DEMO_PAGE_TRANSLATIONS',
  );
  const t = translations.page;
  const scenario = useMemo<BankAccountDemoScenario>(() => ({
    ...translations.meta,
    id: 'bank-account',
    icon: Landmark,
  }), [translations.meta]);
  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const { clearTimeouts, scheduleTimeout } = useManagedTimeouts();

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
  const [verificationProgress, setVerificationProgress] = useState<VerificationProgressState>(EMPTY_VERIFICATION_PROGRESS);
  const handleVerificationProgressChange = useCallback((progress: VerificationProgressState) => {
    setVerificationProgress(progress);
  }, []);

  // Initialize terminal logs
  useEffect(() => {
    clearTimeouts();
    const title = scenario.title;
    setCurrentStepIdx(0);
    setCompletedSteps(new Array(scenario.steps.length).fill(false));
    setIsSuccess(false);
    setIsProcessingAction(false);
    setIsSummaryModalOpen(false);
    setVerificationProgress(EMPTY_VERIFICATION_PROGRESS);
    setSimulationLogs([
      formatText(t.logs.launch, { title }),
      t.logs.environment,
      t.logs.instruction
    ]);
  }, [scenario, language, t, clearTimeouts]);

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
    clearTimeouts();
    setCurrentStepIdx(0);
    setCompletedSteps(new Array(scenario.steps.length).fill(false));
    setIsSuccess(false);
    setIsProcessingAction(false);
    setIsSummaryModalOpen(false);
    setVerificationProgress(EMPTY_VERIFICATION_PROGRESS);
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
          {/* LEFT PANEL: Interactive bank account client simulator */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-[32px] border border-slate-200/80 shadow-xl overflow-hidden relative">
              {/* Device Header Bar */}
              <div className="bg-[#F7F8FC] text-slate-500 px-6 py-4 flex items-center justify-between border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <div className="text-[11px] font-mono tracking-wider font-semibold bg-white text-slate-700 px-3 py-1 rounded-full border border-slate-200 flex items-center gap-1.5 shadow-2xs">
                  <Smartphone className="w-3.5 h-3.5 text-[#354CE1]" />
                  <span>{t.clientEmulator}</span>
                </div>
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              </div>

              {/* Client-side banking interface simulated inside the device frame */}
              <div className="p-6 md:p-8 min-h-[480px] bg-slate-50/50 flex flex-col justify-between">
                <BankAccountClientSimulator
                  currentStepIdx={currentStepIdx}
                  completedSteps={completedSteps}
                  isProcessingAction={isProcessingAction}
                  setIsProcessingAction={setIsProcessingAction}
                  advanceStep={advanceStep}
                  addLog={addLog}
                  isSuccess={isSuccess}
                  scheduleTimeout={scheduleTimeout}
                  onVerificationProgressChange={handleVerificationProgressChange}
                />
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Account opening progress + sandbox transaction console ledger */}
          <div className="lg:col-span-5 space-y-6">
            {/* 1. Bank account opening progress tracker */}
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

              {/* Graphical representation of the account opening sequence */}
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
                  const staticSubChecks: string[] = t.subChecks[scenario.id]?.[sIdx] || [];
                  const verificationCheckRows: Array<{
                    label: string;
                    status: 'pending' | 'active' | 'done';
                  }> = verificationProgress.steps.length > 1
                    ? verificationProgress.steps.map((step) => {
                      const stepEndIndex = step.startIndex + step.details.length;
                      const isStepDone = verificationProgress.detailCount >= stepEndIndex;
                      const isStepActive = verificationProgress.status === 'running'
                        && verificationProgress.detailCount >= step.startIndex
                        && verificationProgress.detailCount < stepEndIndex;
                      const activeDetailIndex = verificationProgress.detailCount - step.startIndex;

                      return {
                        label: isStepActive
                          ? (step.details[activeDetailIndex] || step.label)
                          : step.label,
                        status: isStepDone ? 'done' : isStepActive ? 'active' : 'pending',
                      };
                    })
                    : (verificationProgress.steps[0]?.details || []).map((detail, detailIndex) => ({
                      label: detail,
                      status: detailIndex < verificationProgress.detailCount
                        ? 'done'
                        : detailIndex === verificationProgress.detailCount
                          && verificationProgress.status === 'running'
                          ? 'active'
                          : 'pending',
                    }));
                  const subChecks = sIdx === 1 && verificationProgress.steps.length > 0
                    ? verificationCheckRows.map((row) => row.label)
                    : staticSubChecks;

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

                      {/* Step detail checklist */}
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
                                if (sIdx === 1) {
                                  checkStatus = verificationCheckRows[cIdx]?.status || 'pending';
                                } else {
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
                                    }
                                  } else {
                                    checkStatus = cIdx === 0 ? 'active' : 'pending';
                                  }
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
