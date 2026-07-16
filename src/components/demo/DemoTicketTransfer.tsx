/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRightLeft, ShieldCheck, Ticket, CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { DEMO_COMPONENT_TRANSLATIONS } from '../../translations/DemoComponentTranslations';
import { DEMO_FLOW_LOG_TRANSLATIONS } from '../../translations/DemoFlowLogTranslations';
import { getDemoLanguage } from '../../translations/demoLocalization';

interface DemoTicketTransferProps {
  currentStepIdx: number;
  completedSteps: boolean[];
  isProcessingAction: boolean;
  setIsProcessingAction: (v: boolean) => void;
  advanceStep: (stepLogs: string[]) => void;
  addLog: (text: string, type?: 'system' | 'action' | 'data' | 'ok' | 'processing') => void;
  isSuccess: boolean;
  playTingTingSound: () => void;
}

export default function DemoTicketTransfer({
  currentStepIdx,
  completedSteps,
  isProcessingAction,
  setIsProcessingAction,
  advanceStep,
  addLog,
  isSuccess
}: DemoTicketTransferProps) {
  const { language } = useLanguage();
  const t = DEMO_COMPONENT_TRANSLATIONS[language].ticketTransfer;
  const logT = DEMO_FLOW_LOG_TRANSLATIONS[getDemoLanguage(language)].ticketTransfer;

  // Scenario states
  const [transferOwnerVerified, setTransferOwnerVerified] = useState(false);
  const [transferEscrowLocked, setTransferEscrowLocked] = useState(false);

  // Reset internal states when currentStepIdx is reset
  useEffect(() => {
    if (currentStepIdx === 0) {
      setTransferOwnerVerified(false);
      setTransferEscrowLocked(false);
    }
  }, [currentStepIdx]);

  return (
    <div className="space-y-6 flex-1 flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
        <div className="flex items-center gap-2">
          <ArrowRightLeft className="w-5 h-5 text-[#354CE1]" />
          <span className="font-bold tracking-tight text-slate-800 font-sans">{t.headerTitle}</span>
        </div>
        <span className="text-xs bg-emerald-50 text-emerald-600 border border-emerald-100/60 px-2.5 py-0.5 rounded-full font-bold">
          {t.badge}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {currentStepIdx === 0 && !completedSteps[0] && (
          <motion.div key="transfer-owner" className="space-y-4">
            <div className="bg-[#354CE1]/5 p-4 rounded-2xl border border-indigo-100/40 text-xs text-indigo-950">
              {t.step1Description}
            </div>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">{t.originalTicketHolder}</label>
                <input 
                  type="text"
                  defaultValue="Alice Vance"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-500 font-medium cursor-not-allowed"
                  disabled
                />
              </div>
              <div className="space-y-1.5 font-mono text-[10px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span>{t.originalBookingId} TKT-9281-ALICE</span>
                <span className="block mt-1 font-semibold text-emerald-600">
                  {transferOwnerVerified ? t.ownershipConfirmed : t.waitingForDecrypt}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setTransferOwnerVerified(true);
                setIsProcessingAction(true);
                addLog(logT.decryptingTicket, 'action');
                setTimeout(() => {
                  setIsProcessingAction(false);
                  advanceStep([logT.ownerVerified]);
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
                <span>{t.verifyTicketOwnership}</span>
              )}
            </button>
          </motion.div>
        )}

        {currentStepIdx === 1 && !completedSteps[1] && (
          <motion.div key="transfer-escrow" className="space-y-4">
            <div className="bg-[#354CE1]/5 p-4 rounded-2xl border border-indigo-100/40 text-xs text-indigo-950">
              {t.step2Description}
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-mono">{t.trustEscrowContainer}</span>
                <span className="text-yellow-400 font-mono font-bold">
                  {transferEscrowLocked ? t.lockedSealed : t.awaitingLock}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px] font-mono text-slate-400">
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-850">
                  <span className="block text-slate-500 uppercase">{t.originalAssetState}</span>
                  <span className={transferEscrowLocked ? 'text-yellow-400' : 'text-slate-500'}>
                    {transferEscrowLocked ? t.securedContainer : t.free}
                  </span>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-850">
                  <span className="block text-slate-500 uppercase">{t.recipientAccountSetup}</span>
                  <span className="text-emerald-400">{t.passedRecipient}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setTransferEscrowLocked(true);
                setIsProcessingAction(true);
                addLog(logT.lockingEscrow, 'action');
                setTimeout(() => {
                  setIsProcessingAction(false);
                  advanceStep([logT.escrowSealed]);
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
                <span>{t.seizeLockEscrow}</span>
              )}
            </button>
          </motion.div>
        )}

        {currentStepIdx === 2 && !completedSteps[2] && (
          <motion.div key="transfer-swap" className="space-y-4">
            <div className="bg-[#354CE1]/5 p-4 rounded-2xl border border-indigo-100/40 text-xs text-indigo-950">
              {t.step3Description}
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs">
              <div className="flex justify-between items-center text-red-600 font-mono">
                <span>{t.revokeLabel} ALICE VANCE</span>
                <span>{t.revokedState}</span>
              </div>
              <div className="flex justify-between items-center text-emerald-600 font-mono">
                <span>{t.issueToLabel} JOHN DOE</span>
                <span>{t.issuingState}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsProcessingAction(true);
                addLog(logT.executingSwap, 'action');
                setTimeout(() => {
                  setIsProcessingAction(false);
                  advanceStep([logT.transferComplete]);
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
                <span>{t.executeSwap}</span>
              )}
            </button>
          </motion.div>
        )}

        {isSuccess && (
          <motion.div key="transfer-success" className="space-y-5 text-center flex flex-col items-center justify-center py-6">
            <div className="h-14 w-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-md animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2 max-w-sm">
              <h3 className="text-lg font-bold text-slate-900">{t.ticketTransferComplete}</h3>
              <p className="text-xs text-slate-600">
                {t.successDescription}
              </p>
            </div>
            
            {/* Ticket receipt */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 w-72 text-left space-y-2 shadow-lg">
              <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                <span className="text-[8px] font-mono font-bold text-indigo-600">{t.secureTransactionReceipt}</span>
                <span className="text-[8px] font-mono text-emerald-600 font-bold">{t.completed}</span>
              </div>
              <div className="text-xs space-y-1 text-slate-700">
                <p><strong>{t.fromOwnerLabel}</strong> Alice Vance</p>
                <p><strong>{t.toRecipientLabel}</strong> John Doe</p>
                <p><strong>{t.eventLabel}</strong> {t.eventName}</p>
              </div>
              <span className="text-[8px] font-mono text-slate-400 block text-center border-t border-dashed border-slate-100 pt-1.5">
                {t.securedByEscrow}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="border-t border-slate-200/60 pt-4 flex items-center gap-2 text-[11px] text-slate-500 justify-center">
        <ArrowRightLeft className="w-4 h-4 text-[#354CE1]" />
        <span>{t.footer}</span>
      </div>
    </div>
  );
}
