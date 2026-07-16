/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building, MapPin, CheckCircle2, AlertCircle
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { DEMO_COMPONENT_TRANSLATIONS } from '../../translations/DemoComponentTranslations';
import { DEMO_FLOW_LOG_TRANSLATIONS } from '../../translations/DemoFlowLogTranslations';
import { formatDemoText, getDemoLanguage } from '../../translations/demoLocalization';

interface DemoGovernmentServicesProps {
  currentStepIdx: number;
  completedSteps: boolean[];
  isProcessingAction: boolean;
  setIsProcessingAction: (v: boolean) => void;
  advanceStep: (stepLogs: string[]) => void;
  addLog: (text: string, type?: 'system' | 'action' | 'data' | 'ok' | 'processing') => void;
  isSuccess: boolean;
  playTingTingSound: () => void;
}

export default function DemoGovernmentServices({
  currentStepIdx,
  completedSteps,
  isProcessingAction,
  setIsProcessingAction,
  advanceStep,
  addLog,
  isSuccess
}: DemoGovernmentServicesProps) {
  const { language } = useLanguage();
  const t = DEMO_COMPONENT_TRANSLATIONS[language].governmentServices;
  const logT = DEMO_FLOW_LOG_TRANSLATIONS[getDemoLanguage(language)].governmentServices;

  // Scenario states
  const [govAddressValid, setGovAddressValid] = useState(false);
  const [govSignature, setGovSignature] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Reset internal states when currentStepIdx is reset
  useEffect(() => {
    if (currentStepIdx === 0) {
      setGovAddressValid(false);
      setGovSignature('');
      setError(null);
    } else {
      setError(null);
    }
  }, [currentStepIdx]);

  return (
    <div className="space-y-6 flex-1 flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
        <div className="flex items-center gap-2">
          <Building className="w-5 h-5 text-[#354CE1]" />
          <span className="font-bold tracking-tight text-slate-800">{t.headerTitle}</span>
        </div>
        <span className="text-xs bg-emerald-50 text-emerald-600 border border-emerald-100/60 px-2.5 py-0.5 rounded-full font-bold">
          {t.badge}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {currentStepIdx === 0 && !completedSteps[0] && (
          <motion.div key="gov-reg" className="space-y-4">
            <div className="bg-[#354CE1]/5 p-4 rounded-2xl border border-indigo-100/40 text-xs text-indigo-950">
              {t.step1Description}
            </div>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">{t.citizenLegalName}</label>
                <input 
                  type="text"
                  defaultValue="Alice Vance"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-500 font-medium cursor-not-allowed"
                  disabled
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">{t.nationalRegistrarCard}</label>
                <input 
                  type="text"
                  defaultValue="CIT-9281-US-AV"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-500 font-mono cursor-not-allowed"
                  disabled
                />
              </div>
            </div>

            <button
              onClick={() => {
                setIsProcessingAction(true);
                addLog(logT.lookingUpCivilRegistry, 'action');
                setTimeout(() => {
                  setIsProcessingAction(false);
                  advanceStep([logT.citizenRecordsVerified]);
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
                <span>{t.checkCivilRegistries}</span>
              )}
            </button>
          </motion.div>
        )}

        {currentStepIdx === 1 && !completedSteps[1] && (
          <motion.div key="gov-add" className="space-y-4">
            <div className="bg-[#354CE1]/5 p-4 rounded-2xl border border-indigo-100/40 text-xs text-indigo-950">
              {t.step2Description}
            </div>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">{t.physicalResidentialAddress}</label>
                <input 
                  type="text"
                  value={govAddressValid ? '1200 Pennsylvania Ave NW, Washington DC' : '1200 Pennsylvania Ave NW'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-500 font-medium cursor-not-allowed"
                  disabled
                />
              </div>
              
              {/* Map box mockup */}
              <div className="bg-slate-200 rounded-2xl h-24 overflow-hidden relative border border-slate-300 flex items-center justify-center">
                <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center flex-col text-[10px] text-slate-400">
                  <MapPin className="w-5 h-5 text-indigo-500 animate-bounce" />
                  <span className="font-mono mt-1">LAT: 38.8977° N, LON: 77.0365° W</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setGovAddressValid(true);
                setIsProcessingAction(true);
                addLog(logT.validatingPostalCoordinates, 'action');
                setTimeout(() => {
                  setIsProcessingAction(false);
                  advanceStep([logT.postcodeMatchComplete]);
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
                <span>{t.runAddressSpatialCheck}</span>
              )}
            </button>
          </motion.div>
        )}

        {currentStepIdx === 2 && !completedSteps[2] && (
          <motion.div key="gov-sig" className="space-y-4">
            <div className="bg-[#354CE1]/5 p-4 rounded-2xl border border-indigo-100/40 text-xs text-indigo-950">
              {t.step3Description}
            </div>

            {error && (
              <div className="bg-rose-50 text-rose-600 border border-rose-100 p-3 rounded-xl text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">{t.digitalSignaturePad}</label>
              
              <div className={`bg-white rounded-2xl border h-28 relative flex items-center justify-center overflow-hidden transition-all ${
                error && !govSignature.trim() ? 'border-rose-300 bg-rose-50/5' : 'border-slate-300'
              }`}>
                <input 
                  type="text"
                  placeholder={t.signaturePlaceholder}
                  value={govSignature}
                  onChange={(e) => {
                    setError(null);
                    setGovSignature(e.target.value);
                  }}
                  disabled={isProcessingAction}
                  className="w-5/6 text-center text-lg font-serif border-b border-dashed border-slate-300 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                />
              </div>
            </div>

            <button
              onClick={() => {
                if (!govSignature.trim()) {
                  setError(t.signatureRequiredError);
                  addLog(logT.signatureRequired, 'system');
                  return;
                }
                setError(null);
                setIsProcessingAction(true);
                addLog(formatDemoText(logT.sealingWithSignature, { signature: govSignature }), 'action');
                setTimeout(() => {
                  setIsProcessingAction(false);
                  advanceStep([
                    formatDemoText(logT.formDigitallySigned, { signature: govSignature.toUpperCase() }),
                  ]);
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
                <span>{t.applyCryptographicSignature}</span>
              )}
            </button>
          </motion.div>
        )}

        {isSuccess && (
          <motion.div key="gov-success" className="space-y-5 text-center flex flex-col items-center justify-center py-6">
            <div className="h-14 w-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-md animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2 max-w-sm">
              <h3 className="text-lg font-bold text-slate-900">{t.civicDocumentApproved}</h3>
              <p className="text-xs text-slate-600">
                {t.successDescription}
              </p>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-2xl p-4 w-72 text-left space-y-2 shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                <span className="text-[9px] font-mono font-bold text-indigo-600">{t.officialCivicRecord}</span>
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
              </div>
              <div className="text-xs space-y-1 text-slate-700">
                <p><strong>{t.citizenLabel}</strong> Alice Vance</p>
                <p><strong>{t.addressLabel}</strong> 1200 Pennsylvania Ave NW</p>
                <p className="font-serif italic text-indigo-700"><strong>{t.signedLabel}</strong> {govSignature || 'Alice Vance'}</p>
              </div>
              <span className="text-[8px] font-mono text-slate-400 block text-center border-t border-dashed border-slate-100 pt-1.5">SHA-256 SEAL VALIDATED</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="border-t border-slate-200/60 pt-4 flex items-center gap-2 text-[11px] text-slate-500 justify-center">
        <Building className="w-4 h-4 text-[#354CE1]" />
        <span>{t.footer}</span>
      </div>
    </div>
  );
}
