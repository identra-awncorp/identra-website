/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, Phone, Ticket, CheckCircle2, AlertCircle
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { DEMO_COMPONENT_TRANSLATIONS } from '../../translations/DemoComponentTranslations';
import { DEMO_FLOW_LOG_TRANSLATIONS } from '../../translations/DemoFlowLogTranslations';
import { formatDemoText, getDemoLanguage } from '../../translations/demoLocalization';

interface DemoTicketBookingProps {
  currentStepIdx: number;
  completedSteps: boolean[];
  isProcessingAction: boolean;
  setIsProcessingAction: (v: boolean) => void;
  advanceStep: (stepLogs: string[]) => void;
  addLog: (text: string, type?: 'system' | 'action' | 'data' | 'ok' | 'processing') => void;
  isSuccess: boolean;
  playTingTingSound: () => void;
}

export default function DemoTicketBooking({
  currentStepIdx,
  completedSteps,
  isProcessingAction,
  setIsProcessingAction,
  advanceStep,
  addLog,
  isSuccess
}: DemoTicketBookingProps) {
  const { language } = useLanguage();
  const t = DEMO_COMPONENT_TRANSLATIONS[language].ticketBooking;
  const logT = DEMO_FLOW_LOG_TRANSLATIONS[getDemoLanguage(language)].ticketBooking;

  // Scenario states
  const [bookingSeats, setBookingSeats] = useState<string[]>(['A-12', 'A-13']);
  const [bookingPhone, setBookingPhone] = useState('+1 (555) 234-5678');
  const [bookingOtp, setBookingOtp] = useState('');
  const [receivedOtp] = useState('4920');
  const [showOtpBanner, setShowOtpBanner] = useState(false);
  const [botScore] = useState(99.8);
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
                addLog(formatDemoText(logT.holdingSeats, { seats: bookingSeats.join(', ') }), 'action');
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
                      addLog(formatDemoText(logT.sentOtp, { phone: bookingPhone }), 'action');
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
                  addLog(formatDemoText(logT.incorrectOtp, { otp: bookingOtp }), 'system');
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
