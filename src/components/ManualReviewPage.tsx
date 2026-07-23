/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  Bell,
  Check,
  CheckCircle2,
  CheckSquare,
  Database,
  Eye,
  FileText,
  Layers,
  Link2,
  ListChecks,
  Mail,
  Network,
  Server,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Sparkles,
  Users,
  Zap
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { MANUAL_REVIEW_PAGE_TRANSLATIONS } from '../translations/ManualReviewPageTranslations';

interface ManualReviewPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

type TriggerKey = 'risk_score' | 'vpn_detected' | 'watchlist_hit' | 'age_check';
type QueueKey = 'highRisk' | 'fraud' | 'compliance' | 'general';
type SignalTab = 'active' | 'passive' | 'behavioral' | 'thirdParty';
type DecisionAction = 'approved' | 'declined' | 'escalated';
type DecisionState = 'idle' | 'approving' | 'declining' | 'escalating' | DecisionAction;

const triggerKeys: TriggerKey[] = ['risk_score', 'vpn_detected', 'watchlist_hit', 'age_check'];
const queueKeys: QueueKey[] = ['highRisk', 'fraud', 'compliance', 'general'];
const signalTabs: SignalTab[] = ['active', 'passive', 'behavioral', 'thirdParty'];
const capabilityIcons = [Zap, Layers, FileText, ShieldCheck, Mail, Users, Link2, Bell, BarChart3];
const decisionActionIcons = [Server, Mail, FileText, Link2];

export default function ManualReviewPage({ onOpenSandbox, onBackToLanding, onViewChange }: ManualReviewPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(MANUAL_REVIEW_PAGE_TRANSLATIONS, language as keyof typeof MANUAL_REVIEW_PAGE_TRANSLATIONS, 'MANUAL_REVIEW_PAGE_TRANSLATIONS');

  const [selectedRuleTrigger, setSelectedRuleTrigger] = useState<TriggerKey>('risk_score');
  const [selectedOperator, setSelectedOperator] = useState('>');
  const [ruleValue, setRuleValue] = useState('80');
  const [assignedQueue, setAssignedQueue] = useState<QueueKey>('highRisk');
  const [isRuleSaved, setIsRuleSaved] = useState(false);
  const [activeSignalTab, setActiveSignalTab] = useState<SignalTab>('passive');
  const [decisionState, setDecisionState] = useState<DecisionState>('idle');
  const [decisionLogs, setDecisionLogs] = useState<string[]>([]);

  const handleDecision = (action: DecisionAction) => {
    setDecisionState(action === 'approved' ? 'approving' : action === 'declined' ? 'declining' : 'escalating');
    setDecisionLogs([]);

    let logIndex = 0;
    const timer = setInterval(() => {
      const logs = t.decision.logs[action];
      if (logIndex < logs.length) {
        setDecisionLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${logs[logIndex]}`]);
        logIndex++;
      } else {
        clearInterval(timer);
        setDecisionState(action);
      }
    }, 400);
  };

  const resetDecisionSimulator = () => {
    setDecisionState('idle');
    setDecisionLogs([]);
  };

  const activeSignal = t.signals.panels[activeSignalTab];
  const isNumericTrigger = selectedRuleTrigger === 'risk_score' || selectedRuleTrigger === 'age_check';

  return (
    <div className="min-h-screen bg-[#FAFBFD] font-sans text-slate-800 antialiased selection:bg-[#354CE1]/10 selection:text-[#354CE1] scroll-smooth">
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div id="manual-review-hero-container" className="relative bg-gradient-to-r from-[#4F75FF] via-[#354CE1] to-[#2539BE] text-white rounded-3xl overflow-hidden shadow-2xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full filter blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-black/10 rounded-full filter blur-2xl pointer-events-none" />

            <div className="flex-1 space-y-6 text-left relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 py-1.5 px-3.5 rounded-full">
                <ListChecks className="w-4 h-4 text-white" />
                <span className="text-xs font-bold text-white tracking-wider uppercase">{t.hero.badge}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-[1.15]">{t.hero.title}</h1>
              <p className="text-base sm:text-lg text-white/85 max-w-xl font-normal leading-relaxed">{t.hero.desc}</p>
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button id="hero-get-demo-btn" onClick={onOpenSandbox} className="w-full sm:w-auto bg-white hover:bg-slate-50 text-[#354CE1] font-semibold text-sm py-3.5 px-7 rounded-full flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5">
                  {t.hero.tryDemo}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button id="hero-back-landing-btn" onClick={onBackToLanding} className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/35 text-white font-semibold text-sm py-3.5 px-6 rounded-full transition">
                  {t.hero.backToPlatform}
                </button>
              </div>
            </div>

            <div className="w-full md:w-80 flex flex-col gap-4 relative z-10">
              {t.hero.stats.map((stat) => (
                <div key={stat.label} className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-center">
                  <p className="text-5xl font-display font-extrabold text-white">{stat.value}</p>
                  <p className="text-xs font-medium text-white/80 mt-1 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-[11px] text-white/60 mt-2 leading-relaxed">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div id="trusted-logos-container" className="bg-slate-900 text-white py-6 px-8 rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">{t.trusted.label}</span>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            {t.trusted.brands.map((brand, index) => (
              <div key={brand} className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${index === 0 ? 'bg-emerald-500' : index === 1 ? 'bg-amber-500' : 'bg-blue-500'}`} />
                <span className="font-display font-bold text-lg tracking-wider text-slate-200">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <SectionBadge icon={<Sliders className="w-4 h-4" />} label={t.workflow.badge} />
            <h2 className="text-3xl font-display font-bold text-slate-900 tracking-tight leading-tight">{t.workflow.title}</h2>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">{t.workflow.desc}</p>
            <div className="p-4 bg-[#354CE1]/5 rounded-2xl border border-[#354CE1]/10 space-y-2">
              <h4 className="text-xs font-bold text-[#354CE1]">{t.workflow.whyTitle}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{t.workflow.whyDesc}</p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="text-[11px] font-mono font-semibold text-slate-400">{t.workflow.editor}</span>
            </div>

            <div className="flex items-center justify-center gap-4 bg-slate-50 py-3 px-4 rounded-xl border border-slate-100 text-xs">
              <FlowPill tone="emerald" icon={<CheckCircle2 className="w-3.5 h-3.5" />} label={t.workflow.flow.approve} />
              <ArrowRight className="w-3 h-3 text-slate-300" />
              <FlowPill tone="indigo" icon={<Sparkles className="w-3.5 h-3.5" />} label={t.workflow.flow.condition} pulse />
              <ArrowRight className="w-3 h-3 text-slate-300" />
              <FlowPill tone="rose" icon={<AlertCircle className="w-3.5 h-3.5" />} label={t.workflow.flow.decline} />
            </div>

            <div className="p-5 bg-slate-50/50 rounded-2xl border border-slate-200/60 relative">
              <div className="absolute top-4 right-4 bg-indigo-50 text-[#354CE1] text-[10px] font-bold px-2 py-0.5 rounded-full">{t.workflow.step}</div>
              <h4 className="text-xs font-bold text-slate-700 mb-4 uppercase tracking-wider">{t.workflow.editTitle}</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-500 mb-1.5 font-medium">{t.workflow.triggerLabel}</label>
                  <select id="rule-trigger-select" value={selectedRuleTrigger} onChange={(e) => { setSelectedRuleTrigger(e.target.value as TriggerKey); setIsRuleSaved(false); }} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-800 font-medium focus:ring-1 focus:ring-[#354CE1] outline-none">
                    {triggerKeys.map((key) => <option key={key} value={key}>{t.workflow.triggers[key]}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-500 mb-1.5 font-medium">{t.workflow.criteriaLabel}</label>
                  {isNumericTrigger ? (
                    <div className="flex gap-2">
                      <select id="rule-operator-select" value={selectedOperator} onChange={(e) => { setSelectedOperator(e.target.value); setIsRuleSaved(false); }} className="flex-1 bg-white border border-slate-200 rounded-lg p-2.5 text-slate-800 font-medium focus:ring-1 focus:ring-[#354CE1] outline-none">
                        <option value=">">{t.workflow.operators.greater}</option>
                        <option value="<">{t.workflow.operators.less}</option>
                        <option value="===">{t.workflow.operators.equals}</option>
                      </select>
                      <input id="rule-value-input" type="text" value={ruleValue} onChange={(e) => { setRuleValue(e.target.value); setIsRuleSaved(false); }} className="w-16 text-center bg-white border border-slate-200 rounded-lg p-2.5 font-bold text-slate-800 focus:ring-1 focus:ring-[#354CE1]" />
                    </div>
                  ) : (
                    <div className="p-2.5 bg-slate-100 rounded-lg text-slate-500 font-medium italic">{t.workflow.booleanMatching}</div>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-slate-500 mb-1.5 font-medium">{t.workflow.queueLabel}</label>
                <select id="rule-queue-select" value={assignedQueue} onChange={(e) => { setAssignedQueue(e.target.value as QueueKey); setIsRuleSaved(false); }} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-800 font-medium focus:ring-1 focus:ring-[#354CE1] outline-none">
                  {queueKeys.map((key) => <option key={key} value={key}>{t.workflow.queues[key]}</option>)}
                </select>
              </div>

              <div className="mt-5 flex justify-end">
                <button id="rule-save-btn" onClick={() => setIsRuleSaved(true)} className="bg-[#354CE1] hover:bg-[#2539BE] text-white font-semibold text-xs py-2 px-5 rounded-lg shadow-sm transition flex items-center gap-1.5">
                  {isRuleSaved ? <Check className="w-3.5 h-3.5" /> : null}
                  {isRuleSaved ? t.workflow.saved : t.workflow.save}
                </button>
              </div>
            </div>

            <div className="p-4 bg-[#354CE1]/5 rounded-xl border border-[#354CE1]/15 text-xs">
              <span className="font-bold text-[#354CE1] uppercase tracking-wider block mb-1">{t.workflow.pseudocode}</span>
              <div className="font-mono text-slate-700 space-y-1 text-[11px] leading-relaxed">
                <span className="text-[#354CE1]">{t.workflow.code.if}</span>{' '}
                <span className="text-indigo-600 font-bold">{t.workflow.code.fields[selectedRuleTrigger]}</span>{' '}
                {isNumericTrigger ? (
                  <>
                    <span className="text-amber-600 font-bold">{selectedOperator}</span>{' '}
                    <span className="text-emerald-600 font-bold">{ruleValue || t.workflow.code.fallbackValue}</span>
                  </>
                ) : (
                  <span className="text-emerald-600 font-bold">{t.workflow.code.true}</span>
                )}
                <br />
                <span className="text-[#354CE1]">{t.workflow.code.then}</span>{' '}
                <span className="text-slate-800 font-bold">{t.workflow.code.route}</span>
                (&quot;<span className="text-rose-600 font-bold">{t.workflow.queues[assignedQueue]}</span>&quot;)
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1 bg-white rounded-2xl border border-slate-200/80 shadow-xl overflow-hidden flex flex-col h-[420px]">
            <div className="bg-slate-900 text-white px-4 pt-3 flex border-b border-slate-800 overflow-x-auto">
              {signalTabs.map((tab) => (
                <button key={tab} id={`signal-tab-${tab}`} onClick={() => setActiveSignalTab(tab)} className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-t-lg transition-all duration-200 whitespace-nowrap ${activeSignalTab === tab ? 'bg-white text-slate-900 font-extrabold border-t-2 border-[#354CE1]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                  {t.signals.tabs[tab]}
                </button>
              ))}
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <SignalPanel key={activeSignalTab} tab={activeSignalTab} panel={activeSignal} />
              </AnimatePresence>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-mono">{t.signals.dashboardLabel}</span>
                <button className="font-bold text-[#354CE1] hover:underline cursor-pointer flex items-center gap-1" onClick={onOpenSandbox}>
                  {t.signals.explore}
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
            <SectionBadge icon={<Eye className="w-4 h-4" />} label={t.signals.badge} />
            <h2 className="text-3xl font-display font-bold text-slate-900 tracking-tight leading-tight">{t.signals.title}</h2>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">{t.signals.desc}</p>
            <div className="space-y-3">
              {t.signals.bullets.map((bullet) => (
                <div key={bullet} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-xs text-slate-600 font-medium">{bullet}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <SectionBadge icon={<CheckSquare className="w-4 h-4" />} label={t.decision.badge} />
            <h2 className="text-3xl font-display font-bold text-slate-900 tracking-tight leading-tight">{t.decision.title}</h2>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">{t.decision.desc}</p>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{t.decision.autoActions}</span>
              <div className="grid grid-cols-2 gap-3 text-xs font-semibold text-slate-700">
                {t.decision.actions.map((action, index) => {
                  const Icon = decisionActionIcons[index];
                  return (
                    <div key={action} className="flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5 text-[#354CE1]" />
                      {action}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-xl p-6 md:p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 className="text-xs font-bold text-slate-900">{t.decision.consoleTitle}</h4>
                <p className="text-[10px] text-slate-400">{t.decision.reviewer}</p>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${decisionStatusClass(decisionState)}`}>
                {t.decision.statuses[decisionState]}
              </span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 text-xs flex justify-between items-center">
              <div>
                <p className="font-semibold text-slate-800 text-sm">{t.decision.person.name}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{t.decision.person.detail}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400">{t.decision.person.riskLabel}</p>
                <p className="font-mono font-bold text-sm text-amber-600">{t.decision.person.riskValue}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <DecisionButton id="decision-approve-btn" disabled={decisionState !== 'idle'} onClick={() => handleDecision('approved')} activeClass="bg-emerald-600 hover:bg-emerald-700" icon={<CheckCircle2 className="w-4 h-4" />} label={t.decision.approve} />
              <DecisionButton id="decision-decline-btn" disabled={decisionState !== 'idle'} onClick={() => handleDecision('declined')} activeClass="bg-rose-600 hover:bg-rose-700" icon={<AlertCircle className="w-4 h-4" />} label={t.decision.decline} />
              <DecisionButton id="decision-escalate-btn" disabled={decisionState !== 'idle'} onClick={() => handleDecision('escalated')} activeClass="bg-slate-900 hover:bg-slate-800" icon={<Sliders className="w-4 h-4" />} label={t.decision.escalate} />
            </div>

            <div className="bg-slate-900 rounded-xl p-4 font-mono text-[10px] text-slate-300 min-h-32 flex flex-col justify-between">
              <div className="space-y-1.5">
                <span className="text-slate-500 block border-b border-slate-800 pb-1 mb-2">{t.decision.auditTitle}</span>
                {decisionLogs.length === 0 ? (
                  <span className="text-slate-500 italic">{t.decision.waiting}</span>
                ) : (
                  decisionLogs.map((log, index) => <div key={`${log}-${index}`} className="text-emerald-400 leading-normal animate-in fade-in slide-in-from-left-1 duration-150">{log}</div>)
                )}
              </div>
              {decisionState !== 'idle' && (
                <div className="mt-4 pt-2 border-t border-slate-800 flex justify-end">
                  <button id="decision-reset-btn" onClick={resetDecisionSimulator} className="text-xs text-[#4F75FF] hover:underline font-bold">{t.decision.reset}</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-display font-bold text-slate-900 tracking-tight">{t.capabilities.title}</h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed">{t.capabilities.desc}</p>
          </div>
          <div id="capabilities-bento-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {t.capabilities.items.map((item, index) => {
              const Icon = capabilityIcons[index];
              return (
                <div key={item.title} className="p-6 bg-[#FAFBFD] rounded-2xl border border-slate-200/60 hover:shadow-md transition duration-200 flex flex-col gap-4">
                  <div className="w-10 h-10 bg-[#354CE1]/5 rounded-xl flex items-center justify-center text-[#354CE1]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          <h3 className="text-xl font-display font-bold text-slate-900 text-center lg:text-left">{t.explore.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.explore.cards.map((card, index) => (
              <div key={card.title} id={index === 0 ? 'explore-case-management-card' : 'explore-workflows-card'} onClick={() => onViewChange?.(index === 0 ? 'case-management' : 'workflows')} className={`group p-8 rounded-2xl border border-slate-200/40 shadow-sm cursor-pointer transition transform hover:-translate-y-0.5 flex flex-col justify-between h-48 ${index === 0 ? 'bg-[#EBF0FF] hover:bg-[#E2E8FF]' : 'bg-[#ECE7FF] hover:bg-[#E3DCFF]'}`}>
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-slate-950">{card.title}</h4>
                  <p className="text-xs text-slate-600">{card.desc}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className={`w-8 h-8 rounded-full bg-white flex items-center justify-center ${index === 0 ? 'text-[#354CE1]' : 'text-purple-600'}`}>
                    {index === 0 ? <Sliders className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                  </div>
                  <span className={`text-xs font-bold group-hover:underline flex items-center gap-1 ${index === 0 ? 'text-[#354CE1]' : 'text-purple-600'}`}>
                    {card.cta}
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div id="ready-to-get-started-banner" className="bg-gradient-to-r from-[#D7E3FF] via-[#E2EBFF] to-[#D5E1FF] rounded-3xl p-8 md:p-14 text-center space-y-6 shadow-sm border border-slate-200/40 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent opacity-60" />
            <div className="relative z-10 space-y-3">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">{t.cta.title}</h2>
              <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">{t.cta.desc}</p>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <button id="cta-get-demo-btn" onClick={onOpenSandbox} className="w-full sm:w-auto bg-[#354CE1] hover:bg-[#2539BE] text-white font-semibold text-xs py-3 px-6 rounded-full shadow-md hover:shadow-lg transition flex items-center justify-center gap-2">
                {t.cta.tryDemo}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button id="cta-try-now-btn" onClick={onOpenSandbox} className="w-full sm:w-auto bg-transparent hover:bg-slate-100/40 text-slate-700 font-semibold text-xs py-3 px-6 rounded-full transition border border-slate-300">
                {t.cta.tryNow}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#354CE1] uppercase tracking-wider">
      {icon}
      <span>{label}</span>
    </div>
  );
}

function FlowPill({ tone, icon, label, pulse = false }: { tone: 'emerald' | 'indigo' | 'rose'; icon: React.ReactNode; label: string; pulse?: boolean }) {
  const classes = {
    emerald: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    indigo: 'text-[#354CE1] bg-[#354CE1]/5 border-[#354CE1]/15',
    rose: 'text-rose-600 bg-rose-50 border-rose-100'
  };
  return (
    <div className={`flex items-center gap-1.5 font-semibold px-2.5 py-1 rounded-full border ${classes[tone]} ${pulse ? 'animate-pulse' : ''}`}>
      {icon}
      <span>{label}</span>
    </div>
  );
}

type SignalPanelProps = {
  tab: SignalTab;
  panel: { title: string; subtitle: string; rows: readonly { label: string; value: string }[]; note: string };
};

const SignalPanel: React.FC<SignalPanelProps> = ({
  tab,
  panel
}) => {
  const icon = tab === 'active' ? <CheckCircle2 className="w-4 h-4" /> : tab === 'passive' ? <ShieldAlert className="w-4 h-4" /> : tab === 'behavioral' ? <Network className="w-4 h-4" /> : <Database className="w-4 h-4" />;
  const iconTone = tab === 'active' ? 'bg-emerald-100 text-emerald-600' : tab === 'passive' ? 'bg-amber-100 text-amber-600' : tab === 'behavioral' ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600';

  return (
    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="space-y-4">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${iconTone}`}>{icon}</div>
        <div>
          <h4 className="text-xs font-bold text-slate-900 uppercase">{panel.title}</h4>
          <p className="text-[11px] text-slate-400">{panel.subtitle}</p>
        </div>
      </div>
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2 text-xs">
        {panel.rows.map((row, index) => (
          <div key={row.label} className={`flex justify-between gap-4 ${index < panel.rows.length - 1 ? 'border-b border-slate-200/60 pb-1.5' : ''}`}>
            <span className="text-slate-500">{row.label}</span>
            <span className={`text-right ${index === 0 ? (tab === 'active' ? 'font-bold text-emerald-600' : 'font-bold text-amber-600') : 'font-semibold text-slate-800'}`}>{row.value}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500 italic">{panel.note}</p>
    </motion.div>
  );
};

function DecisionButton({ id, disabled, onClick, activeClass, icon, label }: { id: string; disabled: boolean; onClick: () => void; activeClass: string; icon: React.ReactNode; label: string }) {
  return (
    <button id={id} disabled={disabled} onClick={onClick} className={`text-xs font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-1.5 transition ${disabled ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : `${activeClass} text-white shadow-sm`}`}>
      {icon}
      {label}
    </button>
  );
}

function decisionStatusClass(state: DecisionState) {
  if (state === 'idle') return 'text-amber-600 bg-amber-50 border-amber-100';
  if (state === 'approved') return 'text-emerald-600 bg-emerald-50 border-emerald-100';
  if (state === 'declined') return 'text-rose-600 bg-rose-50 border-rose-100';
  if (state === 'escalated') return 'text-blue-600 bg-blue-50 border-blue-100';
  return 'text-indigo-600 bg-indigo-50 border-indigo-100 animate-pulse';
}
