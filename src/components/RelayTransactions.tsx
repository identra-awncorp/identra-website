/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord, getLocalizedValue } from '../utils/i18nRuntime';
import { relayTransactionsTranslations } from '../translations/RelayTransactionsTranslations';
import { 
  Ticket, 
  ArrowRight, 
  Check, 
  Lock, 
  RefreshCw, 
  User, 
  Sparkles, 
  ShieldCheck, 
  Coins, 
  Cpu, 
  FileCheck2,
  CheckCircle,
  HelpCircle,
  Clock,
  ArrowRightLeft,
  Search
} from 'lucide-react';

type RelayTransactionsLanguage = keyof typeof relayTransactionsTranslations;
type RelayTransactionsTranslationKey = keyof typeof relayTransactionsTranslations.en;

const formatTxText = (template: string, values: Record<string, string | number>) => (
  Object.entries(values).reduce(
    (text, [key, value]) => text.replaceAll(`{${key}}`, String(value)),
    template
  )
);

export default function RelayTransactions() {
  const { language } = useLanguage();
  const t = (key: RelayTransactionsTranslationKey) => {
    const lang = language as RelayTransactionsLanguage;
    return getLocalizedValue(getLocalizedRecord(relayTransactionsTranslations, lang as keyof typeof relayTransactionsTranslations, 'relayTransactionsTranslations'), key, lang, 'relayTransactionsTranslations');
  };

  const [ticketDeposited, setTicketDeposited] = useState(false);
  const [paymentDeposited, setPaymentDeposited] = useState(false);
  const [txStatus, setTxStatus] = useState<'awaiting' | 'active' | 'executing' | 'completed'>('awaiting');
  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const [logs, setLogs] = useState<string[]>([]);
  const [isTerminalExpanded, setIsTerminalExpanded] = useState(true);

  // 4 steps of the smart contract logic
  const steps = [
    {
      id: 1,
      title: t('txStepSignatureTitle'),
      desc: t('txStepSignatureDesc'),
    },
    {
      id: 2,
      title: t('txStepPortabilityTitle'),
      desc: t('txStepPortabilityDesc'),
    },
    {
      id: 3,
      title: t('txStepEscrowTitle'),
      desc: t('txStepEscrowDesc'),
    },
    {
      id: 4,
      title: t('txStepSwapTitle'),
      desc: t('txStepSwapDesc'),
    }
  ];

  // Initialize logs on language load
  useEffect(() => {
    if (txStatus === 'awaiting') {
      setLogs([t('txEscrowLog1')]);
    }
  }, [language]);

  const playTingTingSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();

      // First "ting" (High clear pitch, e.g., C6)
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

      // Second "ting" slightly higher and shifted, creating a perfect modern notification chord
      const delay = 0.12;
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1318.51, ctx.currentTime + delay); // E6
      
      gain2.gain.setValueAtTime(0, ctx.currentTime);
      gain2.gain.setValueAtTime(0.12, ctx.currentTime + delay);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.4);
      
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(ctx.currentTime + delay);
      osc2.stop(ctx.currentTime + delay + 0.4);
    } catch (e) {
      console.warn(t('txAudioBlockedWarning'), e);
    }
  };

  const handleDepositTicket = () => {
    if (ticketDeposited || txStatus === 'executing' || txStatus === 'completed') return;
    setTicketDeposited(true);
    setLogs(prev => [
      ...prev,
      t('txEscrowLog2')
    ]);
    if (paymentDeposited) {
      setTxStatus('active');
    }
  };

  const handleDepositPayment = () => {
    if (paymentDeposited || txStatus === 'executing' || txStatus === 'completed') return;
    setPaymentDeposited(true);
    setLogs(prev => [
      ...prev,
      t('txEscrowLog3')
    ]);
    if (ticketDeposited) {
      setTxStatus('active');
    }
  };

  const runNextStep = (stepIdx: number) => {
    if (stepIdx >= steps.length) {
      // Completed all steps!
      setTxStatus('completed');
      playTingTingSound();
      setLogs(prev => [
        ...prev,
        t('txEscrowLog4')
      ]);
      return;
    }

    setActiveStepIndex(stepIdx);
    
    // Log step transition
    const stepObj = steps[stepIdx];
    const logMsg = formatTxText(t('txStepLogTemplate'), {
      step: stepIdx + 1,
      total: steps.length,
      title: stepObj.title,
      desc: stepObj.desc
    });

    setLogs(prev => [...prev, logMsg]);

    // Proceed to next step after 1800ms to allow users to comfortably read the action
    setTimeout(() => {
      runNextStep(stepIdx + 1);
    }, 1800);
  };

  const handleExecuteContract = () => {
    if (!ticketDeposited || !paymentDeposited || txStatus !== 'active') return;
    setTxStatus('executing');
    setIsTerminalExpanded(false);
    
    // Start step-by-step visual execution
    runNextStep(0);
  };

  const handleReset = () => {
    setTicketDeposited(false);
    setPaymentDeposited(false);
    setTxStatus('awaiting');
    setActiveStepIndex(-1);
    setIsTerminalExpanded(true);
    setLogs([t('txEscrowLog1')]);
  };

  return (
    <section id="relay-transactions" className="bg-[#FAFBFD] border-b border-slate-200 text-slate-800 py-20 md:py-28 overflow-hidden relative">
      {/* Soft elegant background graphics */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#354CE1]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Editorial explanation of smart contract credential trades */}
        <div className="lg:col-span-5 space-y-6 md:space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-1.5 bg-[#354CE1]/10 border border-[#354CE1]/20 text-[#354CE1] font-semibold text-xs uppercase tracking-wider px-3.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#354CE1]" />
            {t('txBadge')}
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight leading-tight text-slate-900 max-w-xl mx-auto lg:mx-0">
            {t('txTitle')}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0">
            {t('txDesc')}
          </p>

          {/* Three pillars of trust */}
          <div className="space-y-4 pt-2 max-w-md mx-auto lg:mx-0 text-left">
            <div className="flex gap-3">
              <div className="bg-white border border-slate-200/80 p-2.5 h-10 w-10 rounded-xl flex items-center justify-center text-[#354CE1] shadow-sm shrink-0">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">
                  {t('txPillarAuthenticityTitle')}
                </h4>
                <p className="text-[11px] text-slate-500 leading-normal">
                  {t('txPillarAuthenticityDesc')}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="bg-white border border-slate-200/80 p-2.5 h-10 w-10 rounded-xl flex items-center justify-center text-[#354CE1] shadow-sm shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">
                  {t('txPillarCounterpartyTitle')}
                </h4>
                <p className="text-[11px] text-slate-500 leading-normal">
                  {t('txPillarCounterpartyDesc')}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="bg-white border border-slate-200/80 p-2.5 h-10 w-10 rounded-xl flex items-center justify-center text-[#354CE1] shadow-sm shrink-0">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">
                  {t('txPillarPortabilityTitle')}
                </h4>
                <p className="text-[11px] text-slate-500 leading-normal">
                  {t('txPillarPortabilityDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Smart Contract Escrow Simulator Card */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-6 shadow-xl relative flex flex-col min-h-[580px] justify-between">
            
            {/* Simulator Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div className="flex items-center gap-2">
                  <div className="bg-[#354CE1]/10 p-2 rounded-lg text-[#354CE1]">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-slate-800 font-display">{t('txCardTitle')}</h4>
                    <p className="text-[9px] text-[#354CE1] font-mono uppercase tracking-wider">
                      {t('txContractStatus')}: {
                        txStatus === 'completed' 
                          ? t('txStatusCompleted') 
                          : txStatus === 'executing'
                            ? formatTxText(t('txStatusExecutingStep'), { step: activeStepIndex + 1 })
                            : (ticketDeposited || paymentDeposited) 
                              ? t('txStatusActive') 
                              : t('txStatusAwaiting')
                      }
                    </p>
                  </div>
                </div>

                <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                  txStatus === 'completed' 
                    ? 'text-emerald-700 bg-emerald-50 border-emerald-200' 
                    : txStatus === 'executing'
                      ? 'text-indigo-700 bg-indigo-50 border-indigo-200 animate-pulse'
                      : (ticketDeposited || paymentDeposited)
                        ? 'text-amber-700 bg-amber-50 border-amber-200'
                        : 'text-slate-500 bg-slate-50 border-slate-200'
                }`}>
                  {txStatus === 'completed' ? t('txBadgeSettled') : txStatus === 'executing' ? t('txBadgeExecuting') : (ticketDeposited || paymentDeposited) ? t('txBadgeActive') : t('txBadgeIdle')}
                </span>
              </div>

              {/* Trade participants columns */}
              {!(txStatus === 'executing' || txStatus === 'completed') && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  
                  {/* Seller Side */}
                  <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{t('txAliceLabel')}</span>
                        <User className="w-4 h-4 text-slate-400" />
                      </div>
                      
                      {/* The Ticket VC */}
                      <div className={`p-3 rounded-xl border transition-all duration-300 ${
                        ticketDeposited 
                          ? 'bg-[#354CE1]/5 border-[#354CE1]/30 opacity-70' 
                          : 'bg-white border-slate-200 shadow-sm'
                      }`}>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                          <Ticket className="w-4 h-4 text-[#354CE1]" />
                          <span>{t('txTicketTitle')}</span>
                        </div>
                        <p className="text-[9px] text-slate-500 mt-1">{t('txTicketIssuer')}</p>
                        <p className="text-[9px] text-[#354CE1] font-medium mt-0.5">{t('txTicketTransfer')}</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      {ticketDeposited ? (
                        <span className="text-[10px] text-emerald-600 font-mono font-medium flex items-center gap-1.5 py-2">
                          <Check className="w-4 h-4 stroke-[3px] text-emerald-500" />
                          {t('txAssetDeposited')}
                        </span>
                      ) : (
                        <button
                          onClick={handleDepositTicket}
                          disabled={txStatus === 'executing' || txStatus === 'completed'}
                          className="w-full bg-[#354CE1] hover:bg-[#2539BE] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white text-xs font-semibold py-2 px-3 rounded-xl transition active:scale-98 cursor-pointer shadow-sm"
                        >
                          {t('txDepositAsset')}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Buyer Side */}
                  <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{t('txBobLabel')}</span>
                        <User className="w-4 h-4 text-slate-400" />
                      </div>

                      {/* The USDC Payment */}
                      <div className={`p-3 rounded-xl border transition-all duration-300 ${
                        paymentDeposited 
                          ? 'bg-[#354CE1]/5 border-[#354CE1]/30 opacity-70' 
                          : 'bg-white border-slate-200 shadow-sm'
                      }`}>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                          <Coins className="w-4 h-4 text-amber-500" />
                          <span>{t('txPaymentAmount')}</span>
                        </div>
                        <p className="text-[9px] text-slate-500 mt-1">
                          {t('txPaymentWallet')}
                        </p>
                        <p className="text-[9px] text-[#354CE1] font-medium mt-0.5">
                          {t('txPaymentEncrypted')}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      {paymentDeposited ? (
                        <span className="text-[10px] text-emerald-600 font-mono font-medium flex items-center gap-1.5 py-2">
                          <Check className="w-4 h-4 stroke-[3px] text-emerald-500" />
                          {t('txPaymentDeposited')}
                        </span>
                      ) : (
                        <button
                          onClick={handleDepositPayment}
                          disabled={txStatus === 'executing' || txStatus === 'completed'}
                          className="w-full bg-[#354CE1] hover:bg-[#2539BE] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white text-xs font-semibold py-2 px-3 rounded-xl transition active:scale-98 cursor-pointer shadow-sm"
                        >
                          {t('txDepositPayment')}
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              )}

              {/* Dynamic Execution Step Tracker (Slowing down the smart contract flow to make it clearly readable) */}
              {(txStatus === 'executing' || txStatus === 'completed') && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-4 space-y-3.5 transition-all duration-300">
                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#354CE1]" />
                      {t('txConsensusEngine')}
                    </span>
                    <span className="text-[10px] font-bold text-[#354CE1] font-mono">
                      {txStatus === 'completed' ? '4 / 4' : `${Math.min(activeStepIndex + 1, 4)} / 4`}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {steps.map((st, sIdx) => {
                      const isDone = txStatus === 'completed' || activeStepIndex > sIdx;
                      const isActive = txStatus === 'executing' && activeStepIndex === sIdx;
                      const isWaiting = !isDone && !isActive;

                      return (
                        <div 
                          key={st.id} 
                          className={`flex items-start gap-2.5 p-2 rounded-xl transition-all duration-500 ${
                            isActive 
                              ? 'bg-[#354CE1]/5 border border-[#354CE1]/20 translate-x-1' 
                              : isDone
                                ? 'bg-emerald-50/40 border border-emerald-200/30'
                                : 'bg-transparent border border-transparent opacity-40'
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {isDone ? (
                              <div className="w-4.5 h-4.5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                <Check className="w-3 h-3 stroke-[3px]" />
                              </div>
                            ) : isActive ? (
                              <div className="w-4.5 h-4.5 rounded-full bg-indigo-100 flex items-center justify-center text-[#354CE1]">
                                <RefreshCw className="w-3 h-3 animate-spin" />
                              </div>
                            ) : (
                              <div className="w-4.5 h-4.5 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 font-mono text-[9px] font-bold">
                                {st.id}
                              </div>
                            )}
                          </div>
                          <div>
                            <p className={`text-[11px] font-bold ${isActive ? 'text-slate-900' : isDone ? 'text-slate-700' : 'text-slate-400'}`}>
                              {st.title}
                            </p>
                            <p className="text-[10px] text-slate-500 leading-tight">
                              {st.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Settlement Results (Displays when transaction is completed) */}
              {txStatus === 'completed' && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-4 text-slate-700 animate-fadeIn space-y-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <span className="text-xs font-bold text-slate-900">
                      {t('txSettlementSuccess')}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] pt-1">
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-sm">
                      <p className="text-slate-400 font-mono text-[9px] uppercase tracking-wider">{t('txBobLabel')}:</p>
                      <p className="font-semibold text-emerald-700 mt-0.5">{t('txBuyerVerified')}</p>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-sm">
                      <p className="text-slate-400 font-mono text-[9px] uppercase tracking-wider">{t('txAliceLabel')}:</p>
                      <p className="font-semibold text-emerald-700 mt-0.5">{t('txSellerReceived')}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Console/Smart Contract Ledger Logs (Collapsible Terminal) */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                <button 
                  type="button"
                  onClick={() => setIsTerminalExpanded(!isTerminalExpanded)}
                  className="w-full text-left px-4 py-3 bg-slate-950 hover:bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between transition cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <span className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-widest">
                      {t('txEscrowLog')}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700/50 hover:text-white transition">
                    {isTerminalExpanded ? t('txTerminalMinimize') : t('txTerminalExpand')}
                  </span>
                </button>
                
                {isTerminalExpanded ? (
                  <div className="p-4 font-mono text-[10px] space-y-1.5 min-h-[72px] max-h-[140px] overflow-y-auto scrollbar-thin">
                    {logs.map((log, index) => (
                      <div key={index} className="flex gap-1.5 items-start">
                        <span className="text-slate-600 shrink-0 select-none">&gt;</span>
                        <span className={`${index === logs.length - 1 ? 'text-emerald-400' : 'text-slate-300'}`}>
                          {log}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-2 bg-slate-950/40 text-slate-500 text-[9px] font-mono italic">
                    {t('txTerminalMinimized')}
                  </div>
                )}
              </div>
            </div>

            {/* Action Bottom Button */}
            <div className="mt-6 flex gap-3">
              {txStatus === 'completed' ? (
                <button
                  onClick={handleReset}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 border border-slate-200 transition cursor-pointer shadow-sm"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  {t('txResetBtn')}
                </button>
              ) : (
                <button
                  onClick={handleExecuteContract}
                  disabled={!ticketDeposited || !paymentDeposited || txStatus !== 'active'}
                  className={`w-full py-3 px-4 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all ${
                    (ticketDeposited && paymentDeposited && txStatus === 'active')
                      ? 'bg-[#354CE1] hover:bg-[#2539BE] text-white shadow-md cursor-pointer animate-pulse'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  {txStatus === 'executing' 
                    ? t('txExecutingProtocol') 
                    : t('txExecuteBtn')}
                </button>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
