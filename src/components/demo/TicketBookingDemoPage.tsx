/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AlertCircle, ArrowLeft, Check, CheckCircle2, Phone, ShieldCheck, ShoppingBag, Smartphone, Sparkles, Terminal, Ticket } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { TICKET_BOOKING_DEMO_PAGE_TRANSLATIONS } from '../../translations/demo/TicketBookingDemoPageTranslations';
import type { DemoScenarioId } from '../../types/routes';
import { getLocalizedRecord } from '../../utils/i18nRuntime';
import DemoSummaryModal from './DemoSummaryModal';
import IdentityFlowGraph from './IdentityFlowGraph';

interface TicketBookingCheckoutFlowProps {
  currentStepIdx: number;
  completedSteps: boolean[];
  isProcessingAction: boolean;
  setIsProcessingAction: (v: boolean) => void;
  advanceStep: (stepLogs: string[]) => void;
  addLog: (text: string, type?: 'system' | 'action' | 'data' | 'ok' | 'processing') => void;
  isSuccess: boolean;
  playTingTingSound: () => void;
}

function TicketBookingCheckoutFlow({
  currentStepIdx,
  completedSteps,
  isProcessingAction,
  setIsProcessingAction,
  advanceStep,
  addLog,
  isSuccess
}: TicketBookingCheckoutFlowProps) {
  const { language } = useLanguage();
  const translations = getLocalizedRecord(
    TICKET_BOOKING_DEMO_PAGE_TRANSLATIONS,
    language as keyof typeof TICKET_BOOKING_DEMO_PAGE_TRANSLATIONS,
    'TICKET_BOOKING_DEMO_PAGE_TRANSLATIONS',
  );
  const t = translations.scenario;
  const logT = translations.logs;

  // Scenario states
  const [bookingSeats, setBookingSeats] = useState<string[]>(['A-12', 'A-13']);
  const [bookingPhone, setBookingPhone] = useState('+1 (555) 234-5678');
  const [bookingOtp, setBookingOtp] = useState('');
  const receivedOtp = '4920';
  const [showOtpBanner, setShowOtpBanner] = useState(false);
  const botScore = 99.8;
  const [error, setError] = useState<string | null>(null);

  // Reset internal states when currentStepIdx is reset
  useEffect(() => {
    if (currentStepIdx === 0) {
      setBookingSeats(['A-12', 'A-13']);
      setBookingPhone('+1 (555) 234-5678');
      setBookingOtp('');
      setShowOtpBanner(false);
      setError(null);
    } else {
      setError(null);
    }
  }, [currentStepIdx]);

  return (
    <div className="space-y-6 flex-1 flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-[#354CE1]" />
          <span className="font-bold tracking-tight text-slate-800">{t.headerTitle}</span>
        </div>
        <span className="text-xs bg-emerald-50 text-emerald-600 border border-emerald-100/60 px-2.5 py-0.5 rounded-full font-bold">
          {t.badge}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {currentStepIdx === 0 && !completedSteps[0] && (
          <motion.div key="ticket-seats" className="space-y-4">
            <div className="bg-[#354CE1]/5 p-4 rounded-2xl border border-indigo-100/40 text-xs text-indigo-950">
              {t.step1Description}
            </div>

            {error && (
              <div className="bg-rose-50 text-rose-600 border border-rose-100 p-3 rounded-xl text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 block uppercase tracking-wider">{t.seatingMapSelect}</label>
              <div className="grid grid-cols-6 gap-2 bg-slate-900 p-4 rounded-2xl">
                {['A-11', 'A-12', 'A-13', 'A-14', 'B-11', 'B-12', 'B-13', 'B-14', 'C-11', 'C-12', 'C-13', 'C-14'].map((seat) => {
                  const isSelected = bookingSeats.includes(seat);
                  return (
                    <button
                      key={seat}
                      disabled={isProcessingAction}
                      onClick={() => {
                        setError(null);
                        if (bookingSeats.includes(seat)) {
                          setBookingSeats(bookingSeats.filter(s => s !== seat));
                        } else {
                          setBookingSeats([...bookingSeats, seat]);
                        }
                      }}
                      className={`py-2 text-[10px] font-bold rounded-lg font-mono transition-all border ${
                        isSelected 
                          ? 'bg-yellow-400 border-yellow-500 text-slate-950 shadow-md shadow-yellow-400/20 font-bold' 
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                      } ${isProcessingAction ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      {seat}
                    </button>
                  );
                })}
              </div>
              <span className="text-[10px] text-slate-500 block text-center font-mono">
                {bookingSeats.length > 0 ? t.selectedSeats.replace('{seats}', bookingSeats.join(', ')) : t.noSeatsSelected}
              </span>
            </div>

            <button
              onClick={() => {
                if (bookingSeats.length === 0) {
                  setError(t.selectSeatError);
                  addLog(logT.validationNoSeats, 'system');
                  return;
                }
                setError(null);
                setIsProcessingAction(true);
                addLog(formatText(logT.holdingSeats, { seats: bookingSeats.join(', ') }), 'action');
                setTimeout(() => {
                  setIsProcessingAction(false);
                  advanceStep([logT.seatsLocked]);
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
                <span>{t.holdSeatsCheckout}</span>
              )}
            </button>
          </motion.div>
        )}

        {currentStepIdx === 1 && !completedSteps[1] && (
          <motion.div key="ticket-bot" className="space-y-4">
            <div className="bg-[#354CE1]/5 p-4 rounded-2xl border border-indigo-100/40 text-xs text-indigo-950">
              {t.step2Description}
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-mono">{t.humanOperatorMetric}</span>
                <span className="text-[#00D4B2] font-mono font-bold">{t.confidenceLabel.replace('{score}', botScore.toString())}</span>
              </div>
              
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div className="bg-[#00D4B2] h-2 rounded-full" style={{ width: `${botScore}%` }} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px] font-mono text-slate-400">
                <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-850">
                  <span className="block text-slate-500 uppercase">{t.fingerprintIp}</span>
                  <span className="text-emerald-400 font-bold font-mono">LEGITIMATE</span>
                </div>
                <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-850">
                  <span className="block text-slate-500 uppercase">{t.latencyVector}</span>
                  <span className="text-emerald-400 font-bold font-mono">HUMANIZED</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setIsProcessingAction(true);
                addLog(logT.runningTelemetry, 'action');
                setTimeout(() => {
                  setIsProcessingAction(false);
                  advanceStep([logT.telemetryPassed]);
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
                <span>{t.runAntiBotTelemetry}</span>
              )}
            </button>
          </motion.div>
        )}

        {currentStepIdx === 2 && !completedSteps[2] && (
          <motion.div key="ticket-otp" className="space-y-4">
            <div className="bg-[#354CE1]/5 p-4 rounded-2xl border border-indigo-100/40 text-xs text-indigo-950">
              {t.step3Description}
            </div>

            {error && (
              <div className="bg-rose-50 text-rose-600 border border-rose-100 p-3 rounded-xl text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {showOtpBanner && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900 text-white p-3 rounded-xl border border-indigo-950 flex items-center gap-3"
              >
                <Phone className="w-5 h-5 text-yellow-300 shrink-0" />
                <div className="text-left text-xs">
                  <span className="font-bold text-yellow-300 block">{t.smsOtpTitle}</span>
                  <span>{t.secureBookingCode} <strong className="font-mono text-yellow-300 tracking-wider">4920</strong></span>
                </div>
              </motion.div>
            )}

            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">{t.mobilePhoneNumber}</label>
                <div className="flex gap-2">
                  <input 
                    type="text"
                    value={bookingPhone}
                    onChange={(e) => {
                      setError(null);
                      setBookingPhone(e.target.value);
                    }}
                    disabled={isProcessingAction}
                    className={`flex-1 bg-white border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20 focus:border-[#354CE1] disabled:opacity-60 disabled:bg-slate-50 disabled:cursor-not-allowed transition-all ${
                      error && !bookingPhone ? 'border-rose-300 focus:ring-rose-200' : 'border-slate-200'
                    }`}
                  />
                  <button
                    onClick={() => {
                      if (!bookingPhone.trim()) {
                        setError(t.validPhoneError);
                        return;
                      }
                      setError(null);
                      setShowOtpBanner(true);
                      addLog(formatText(logT.sentOtp, { phone: bookingPhone }), 'action');
                    }}
                    disabled={isProcessingAction}
                    className="px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer hover:bg-slate-200 active:scale-[0.98] transition-all"
                  >
                    {t.sendCode}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">{t.verificationCodeOtp}</label>
                <input 
                  type="text"
                  placeholder={t.otpPlaceholder}
                  value={bookingOtp}
                  onChange={(e) => {
                    setError(null);
                    setBookingOtp(e.target.value);
                  }}
                  disabled={isProcessingAction}
                  className={`w-full bg-white border rounded-xl px-4 py-2.5 text-sm font-mono tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20 focus:border-[#354CE1] disabled:opacity-60 disabled:bg-slate-50 disabled:cursor-not-allowed transition-all ${
                    error && bookingOtp !== receivedOtp ? 'border-rose-300 bg-rose-50/10 focus:ring-rose-200' : 'border-slate-200'
                  }`}
                />
              </div>
            </div>

            <button
              onClick={() => {
                if (!bookingPhone.trim()) {
                  setError(t.phoneAndOtpFirstError);
                  return;
                }
                if (!bookingOtp.trim()) {
                  setError(t.enterOtpError);
                  return;
                }
                if (bookingOtp !== receivedOtp) {
                  setError(t.incorrectOtpError);
                  addLog(formatText(logT.incorrectOtp, { otp: bookingOtp }), 'system');
                  return;
                }
                setError(null);
                setIsProcessingAction(true);
                addLog(logT.verifyingOtp, 'action');
                setTimeout(() => {
                  setIsProcessingAction(false);
                  setShowOtpBanner(false);
                  advanceStep([logT.otpVerified]);
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
                <span>{t.confirmPurchaseTickets}</span>
              )}
            </button>
          </motion.div>
        )}

        {isSuccess && (
          <motion.div key="ticket-success" className="space-y-5 text-center flex flex-col items-center justify-center py-6">
            <div className="h-14 w-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-md animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2 max-w-sm">
              <h3 className="text-lg font-bold text-slate-900">{t.ticketPurchaseSealed}</h3>
              <p className="text-xs text-slate-600 font-sans">
                {t.successDescription}
              </p>
            </div>
            
            {/* Ticket design */}
            <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-4 w-72 flex flex-col justify-between space-y-4 shadow-xl">
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                <span>{t.arenaEntry}</span>
                <span className="text-yellow-400">{t.secureTicket}</span>
              </div>
              <div className="flex gap-3 text-left">
                <div className="h-12 w-12 bg-yellow-400/10 rounded-xl flex items-center justify-center text-yellow-400 shrink-0 border border-yellow-400/20">
                  <Ticket className="w-6 h-6 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-xs font-sans">ERAS WORLD TOUR 2026</h4>
                  <span className="text-[10px] text-slate-400 font-mono block">{t.seatsLabel} {bookingSeats.join(', ')}</span>
                  <span className="text-[9px] text-emerald-400 font-mono block">{t.verifiedFanOnly}</span>
                </div>
              </div>
              <div className="border-t border-dashed border-slate-800 pt-3 flex flex-col items-center">
                <div className="bg-white p-2 rounded-xl">
                  <div className="h-20 w-20 bg-slate-900 flex items-center justify-center text-slate-400 text-[10px] font-mono">
                    <div className="p-1 border border-dashed border-[#00D4B2] rounded">
                      <span className="text-[#00D4B2] font-bold tracking-widest text-[8px] font-mono">QR LIVE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="border-t border-slate-200/60 pt-4 flex items-center gap-2 text-[11px] text-slate-500 justify-center">
        <ShoppingBag className="w-4 h-4 text-[#354CE1]" />
        <span>{t.footer}</span>
      </div>
    </div>
  );
}

interface TicketBookingDemoPageProps {
  onBackToList: () => void;
}

interface TicketBookingDemoStep {
  label: string;
  action: string;
  logText: string;
}

interface TicketBookingDemoCopy {
  id: DemoScenarioId;
  tag: string;
  title: string;
  desc: string;
  security: string;
  successResult: string;
  steps: TicketBookingDemoStep[];
}

interface TicketBookingDemoScenario extends TicketBookingDemoCopy {
  icon: React.ComponentType<any>;
}

const formatText = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ''));

export default function TicketBookingDemoPage({ onBackToList }: TicketBookingDemoPageProps) {
  const { language } = useLanguage();
  const translations = getLocalizedRecord(
    TICKET_BOOKING_DEMO_PAGE_TRANSLATIONS,
    language as keyof typeof TICKET_BOOKING_DEMO_PAGE_TRANSLATIONS,
    'TICKET_BOOKING_DEMO_PAGE_TRANSLATIONS',
  );
  const t = translations.page;
  const scenario = useMemo<TicketBookingDemoScenario>(() => ({
    ...translations.meta,
    id: 'ticket-booking',
    icon: ShoppingBag,
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

  // Initialize terminal logs
  useEffect(() => {
    const title = scenario.title;
    setCurrentStepIdx(0);
    setCompletedSteps(new Array(scenario.steps.length).fill(false));
    setIsSuccess(false);
    setIsProcessingAction(false);
    setIsSummaryModalOpen(false);
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
                <TicketBookingCheckoutFlow
                  currentStepIdx={currentStepIdx}
                  completedSteps={completedSteps}
                  isProcessingAction={isProcessingAction}
                  setIsProcessingAction={setIsProcessingAction}
                  advanceStep={advanceStep}
                  addLog={addLog}
                  isSuccess={isSuccess}
                  playTingTingSound={playTingTingSound}
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
                  const isActive = currentStepIdx === sIdx && !isSuccess;
                  const isDone = completedSteps[sIdx] || isSuccess;
                  const subChecks: string[] = t.subChecks[scenario.id]?.[sIdx] || [];

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
                              let checkStatus: 'pending' | 'active' | 'done' = 'pending';
                              if (isDone) {
                                checkStatus = 'done';
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
          />
        )}
      </AnimatePresence>
    </div>
  );
}
