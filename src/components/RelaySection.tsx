/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord, getLocalizedValue } from '../utils/i18nRuntime';
import { relaySectionTranslations } from '../translations/RelaySectionTranslations';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  ArrowRight, 
  Check, 
  RefreshCw, 
  Cpu, 
  Send, 
  UserCheck,
  EyeOff,
  Eye
} from 'lucide-react';

interface RelaySectionProps {
  onOpenSandbox: () => void;
}

interface FieldConfig {
  id: keyof typeof initialFields;
  label: string;
  value: string;
  risk: 'High' | 'Low' | 'Medium';
  cryptoHash: string;
}

const initialFields = {
  fullName: true,
  ageAttestation: true,
  dob: false,
  nationalId: false,
};

type RelaySectionLanguage = keyof typeof relaySectionTranslations;
type RelaySectionTranslationKey = keyof typeof relaySectionTranslations.en;

export default function RelaySection({ onOpenSandbox }: RelaySectionProps) {
  const { language } = useLanguage();
  const t = (key: RelaySectionTranslationKey) => {
    const lang = language as RelaySectionLanguage;
    return getLocalizedValue(getLocalizedRecord(relaySectionTranslations, lang as keyof typeof relaySectionTranslations, 'relaySectionTranslations'), key, lang, 'relaySectionTranslations');
  };

  const [selectedFields, setSelectedFields] = useState(initialFields);
  const [flowStep, setFlowStep] = useState<'share' | 'processing' | 'result'>('share');
  const [processingIndex, setProcessingIndex] = useState(0);

  const fieldsList: FieldConfig[] = [
    { 
      id: 'fullName', 
      label: t('relayFieldFullName'), 
      value: t('relayValueFullName'), 
      risk: 'Low',
      cryptoHash: 'sha256_b38a19...' 
    },
    { 
      id: 'ageAttestation', 
      label: t('relayFieldAge'), 
      value: t('relayValueOver21'), 
      risk: 'Low',
      cryptoHash: 'sha256_9c2d1e...' 
    },
    { 
      id: 'dob', 
      label: t('relayFieldDob'), 
      value: t('relayValueDob'), 
      risk: 'Medium',
      cryptoHash: 'sha256_ff401a...' 
    },
    { 
      id: 'nationalId', 
      label: t('relayFieldId'), 
      value: t('relayValueNationalId'), 
      risk: 'High',
      cryptoHash: 'sha256_29b88e...' 
    },
  ];

  const processingSteps = [
    t('relayStepGenPayload'),
    t('relayStepCompZk'),
    t('relayStepSignPkg'),
    t('relayStepTxPacket')
  ];

  const toggleField = (fieldId: keyof typeof initialFields) => {
    setSelectedFields(prev => ({
      ...prev,
      [fieldId]: !prev[fieldId],
    }));
  };

  const handleStartShare = () => {
    setFlowStep('processing');
    setProcessingIndex(0);
  };

  useEffect(() => {
    if (flowStep === 'processing') {
      const timer = setInterval(() => {
        setProcessingIndex((prev) => {
          if (prev >= processingSteps.length - 1) {
            clearInterval(timer);
            const timeout = setTimeout(() => {
              setFlowStep('result');
            }, 600);
            return prev;
          }
          return prev + 1;
        });
      }, 500);
      return () => clearInterval(timer);
    }
  }, [flowStep]);

  const handleReset = () => {
    setFlowStep('share');
    setProcessingIndex(0);
  };

  // Check if at least one field is selected to avoid sharing empty datasets
  const isAnyFieldSelected = Object.values(selectedFields).some(Boolean);

  return (
    <section id="relay" className="bg-[#E6EAF2] border-t border-b border-[#D1D8E6] text-slate-800 py-20 md:py-28 overflow-hidden relative">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#354CE1]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00D4B2]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Info */}
        <div className="lg:col-span-6 space-y-6 md:space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-1.5 bg-[#354CE1]/12 border border-[#354CE1]/25 text-[#354CE1] font-semibold text-xs uppercase tracking-wider px-3.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#354CE1] animate-ping" />
            {t('relayBadge')}
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight text-[#0F1E36] max-w-lg mx-auto lg:mx-0">
            {t('relayTitle')}
          </h2>

          <p className="text-slate-700 text-sm sm:text-base md:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
            {t('relayDesc')}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button
              id="learn-relay-btn"
              onClick={onOpenSandbox}
              className="w-full sm:w-auto bg-[#354CE1] hover:bg-[#2539BE] text-white font-semibold text-sm px-6 py-3.5 rounded-full flex items-center justify-center gap-1.5 transition shadow-lg shadow-[#354CE1]/10 hover:shadow-xl hover:shadow-[#354CE1]/20 cursor-pointer"
            >
              {t('learnRelay')}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Side: Selective Disclosure Share and Verify module */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-md bg-[#0F1E36] border border-[#1F2D4F] rounded-3xl p-6 shadow-2xl shadow-indigo-900/15 relative flex flex-col min-h-[460px] justify-between">
            
            {/* STAGE 1: SHARE / SELECTION */}
            {flowStep === 'share' && (
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5">
                    <div className="flex items-center gap-2">
                      <div className="bg-indigo-900/40 p-1.5 rounded-lg text-[#354CE1]">
                        <Lock className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-xs text-slate-100 font-display">{t('relayFilterTitle')}</h4>
                        <p className="text-[9px] text-[#00D4B2] font-mono uppercase tracking-wider">{t('relayStatusSecure')}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                      {t('relayStep')}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-300 mb-4 leading-relaxed">
                    {t('relaySelectDesc')}
                  </p>

                  {/* Fields Selector List */}
                  <div className="space-y-2.5">
                    {fieldsList.map((field) => {
                      const isSelected = selectedFields[field.id];
                      return (
                        <button type="button"
                          key={field.id}
                          onClick={() => toggleField(field.id)}
                          className={`group flex items-center justify-between p-3 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
                            isSelected 
                              ? 'bg-slate-900/90 border-[#354CE1]/50 shadow-md shadow-indigo-500/5' 
                              : 'bg-slate-950/40 border-slate-800/60 opacity-65 hover:opacity-85'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {/* Custom interactive checkbox */}
                            <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                              isSelected 
                                ? 'bg-[#354CE1] border-[#354CE1]' 
                                : 'border-slate-600 bg-transparent'
                            }`}>
                              {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />}
                            </div>
                            
                            <div>
                              <p className="text-xs font-semibold text-slate-200">{field.label}</p>
                              <p className={`font-mono text-[10px] transition-colors ${
                                isSelected ? 'text-slate-400' : 'text-slate-500 line-through'
                              }`}>
                                {field.value}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Risk assessment tags */}
                            <span className={`text-[8px] font-mono uppercase px-1.5 py-0.5 rounded font-bold ${
                              field.risk === 'High' 
                                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' 
                                : field.risk === 'Medium'
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            }`}>
                              {field.risk === 'High' ? t('relayRiskHigh') : field.risk === 'Medium' ? t('relayRiskMedium') : t('relayRiskLow')}
                            </span>
                            {isSelected ? (
                              <Eye className="w-3.5 h-3.5 text-indigo-400" />
                            ) : (
                              <EyeOff className="w-3.5 h-3.5 text-slate-600" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    id="share-verify-submit"
                    onClick={handleStartShare}
                    disabled={!isAnyFieldSelected}
                    className={`w-full py-3 px-4 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all ${
                      isAnyFieldSelected 
                        ? 'bg-[#354CE1] hover:bg-[#2539BE] text-white shadow-lg shadow-[#354CE1]/20 active:scale-98 cursor-pointer' 
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    {t('relaySubmitBtn')}
                  </button>
                  {!isAnyFieldSelected && (
                    <p className="text-[10px] text-center text-rose-400/80 mt-2 font-mono">
                      {t('relayRequiredTip')}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* STAGE 2: PROCESSING ANIMATION */}
            {flowStep === 'processing' && (
              <div className="flex-1 flex flex-col justify-center items-center py-12 space-y-6">
                <div className="relative flex items-center justify-center">
                  {/* Outer spinning ring */}
                  <div className="absolute w-16 h-16 border-2 border-indigo-500/20 border-t-2 border-t-[#354CE1] rounded-full animate-spin" />
                  {/* Inner spinning ring (opposite direction) */}
                  <div className="absolute w-10 h-10 border-2 border-emerald-500/20 border-b-2 border-b-[#00D4B2] rounded-full animate-spin [animation-direction:reverse]" />
                  <Cpu className="w-5 h-5 text-indigo-400 animate-pulse" />
                </div>

                <div className="text-center space-y-2 max-w-xs">
                  <h5 className="font-semibold text-xs text-slate-100 uppercase tracking-wider font-mono">
                    {t('relayProvingTitle')}
                  </h5>
                  <div className="h-1.5 w-32 bg-slate-800 rounded-full overflow-hidden mx-auto">
                    <div 
                      className="h-full bg-gradient-to-r from-[#354CE1] to-[#00D4B2] rounded-full transition-all duration-300"
                      style={{ width: `${((processingIndex + 1) / processingSteps.length) * 100}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-[#00D4B2] font-mono animate-pulse min-h-[32px] px-4">
                    {processingSteps[processingIndex]}
                  </p>
                </div>
              </div>
            )}

            {/* STAGE 3: RESULT / VERIFIED */}
            {flowStep === 'result' && (
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5">
                    <div className="flex items-center gap-2">
                      <div className="bg-emerald-950/40 p-1.5 rounded-lg text-[#00D4B2]">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-xs text-slate-100 font-display">{t('relayVerifierTitle')}</h4>
                        <p className="text-[9px] text-emerald-400 font-mono uppercase tracking-wider">{t('relayStatusValidated')}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-900/50">
                      {t('relayCompleted')}
                    </span>
                  </div>

                  {/* Verifier Attestation Certificate Banner */}
                  <div className="bg-emerald-950/20 border border-emerald-800/30 rounded-xl p-3 mb-4 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-slate-100">{t('relayAttestationSuccess')}</p>
                      <p className="text-[10px] text-slate-300 leading-normal">
                        {t('relayAttestationDesc')}
                      </p>
                    </div>
                  </div>

                  {/* Result Attribute Table */}
                  <div className="space-y-2 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                    <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest pb-1 border-b border-slate-800">
                      {t('relayAuditedDataHeader')}
                    </p>

                    {fieldsList.map((field) => {
                      const isShared = selectedFields[field.id];
                      return (
                        <div 
                          key={field.id}
                          className="flex items-center justify-between py-1.5 border-b border-slate-900 last:border-b-0 text-xs"
                        >
                          <div>
                            <span className="text-slate-400 font-medium">{field.label}</span>
                          </div>

                          <div className="flex items-center gap-2 font-mono text-right">
                            {isShared ? (
                              <>
                                <span className="text-slate-200">{field.value}</span>
                                <span className="text-[9px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.5 rounded font-semibold flex items-center gap-0.5">
                                  <Check className="w-2.5 h-2.5 stroke-[3px]" />
                                  {t('relayProved')}
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="text-slate-500 italic tracking-wide text-[10px]">{t('relayRedacted')}</span>
                                <span className="text-[9px] text-[#354CE1] bg-[#354CE1]/10 border border-[#354CE1]/20 px-1.5 py-0.5 rounded font-semibold">
                                  {t('relayZkHidden')}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Cryptographic Proof Details */}
                  <div className="mt-4 p-3 bg-slate-900/40 rounded-xl border border-slate-800/40">
                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                      <span>{t('relaySigScheme')}</span>
                      <span className="text-slate-200">{t('relaySignatureSchemeValue')}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mt-1">
                      <span>{t('relayMerkleRootHash')}</span>
                      <span className="text-[#00D4B2]">{t('relayMerkleRootValue')}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <button
                    id="verify-reset-btn"
                    onClick={handleReset}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 border border-slate-700/60 transition cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    {t('relayResetBtn')}
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
