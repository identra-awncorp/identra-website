/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  ArrowLeft,
  RefreshCw,
  Layers,
  CheckCircle2,
  Smartphone,
  Landmark,
  CreditCard,
  ShieldAlert,
  Database,
  FileText,
  Activity,
  Play,
  Workflow,
  CheckSquare,
  FileSpreadsheet,
  Sparkle,
  Globe,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { PAYMENTS_PAGE_TRANSLATIONS } from '../translations/PaymentsPageTranslations';

interface PaymentsPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

type ScenarioKey = 'soleProp' | 'crossBorder' | 'shellRisk';
type UseCaseKey = 'onboard' | 'monitor' | 'comply';

const interpolate = (template: string, values: Record<string, string | number>) =>
  Object.entries(values).reduce((result, [key, value]) => result.replaceAll(`{${key}}`, String(value)), template);

export default function PaymentsPage({ onOpenSandbox, onBackToLanding, onViewChange }: PaymentsPageProps) {
  const { language } = useLanguage();
  const t = (getLocalizedRecord(PAYMENTS_PAGE_TRANSLATIONS, language as keyof typeof PAYMENTS_PAGE_TRANSLATIONS, 'PAYMENTS_PAGE_TRANSLATIONS')) as any;

  const [activeScenarioKey, setActiveScenarioKey] = useState<ScenarioKey>('soleProp');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);
  const [activeUseCase, setActiveUseCase] = useState<UseCaseKey>('onboard');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [demoRequested, setDemoRequested] = useState(false);

  const scenario = t.simulator.scenarios[activeScenarioKey];
  const activeUseCaseData = t.useCases.tabs.find((item: any) => item.id === activeUseCase) || t.useCases.tabs[0];
  const featureIcons = [Globe, FileSpreadsheet, Landmark, FileText, Layers, Database, CheckCircle2, Workflow, CheckSquare];

  const simulationSteps = React.useMemo(() => {
    const selectedScenario = t.simulator.scenarios[activeScenarioKey];
    const logs = t.simulator.logs;

    return [
      interpolate(logs.step1, { merchant: selectedScenario.merchantName }),
      logs.registry,
      logs.step2,
      interpolate(logs.tax, { taxStatus: selectedScenario.kybStatus === 'Block' ? logs.failed : logs.active }),
      logs.step3,
      interpolate(logs.watchlist, { status: t.simulator.statuses[selectedScenario.watchlistStatus.toLowerCase()] || selectedScenario.watchlistStatus }),
      logs.step4,
      interpolate(logs.decision, {
        score: selectedScenario.riskScore,
        resolution: t.simulator.statuses[selectedScenario.kybStatus.toLowerCase()] || selectedScenario.kybStatus
      })
    ];
  }, [activeScenarioKey, t]);
  const simulationLogs = simulationSteps.slice(0, simStep);

  const startSimulator = (key: ScenarioKey) => {
    setActiveScenarioKey(key);
    setIsSimulating(true);
    setSimStep(0);

    let current = 0;
    const interval = setInterval(() => {
      setSimStep(current + 1);
      current++;
      if (current >= simulationSteps.length) {
        clearInterval(interval);
      }
    }, 900);
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !companyName) {
      alert(t.demo.requiredAlert);
      return;
    }
    setDemoRequested(true);
  };

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-slate-800 antialiased selection:bg-[#354CE1]/10 selection:text-[#354CE1] scroll-smooth">
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <button
          onClick={onBackToLanding}
          className="group inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 text-xs font-semibold transition"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          {t.backToPlatform}
        </button>
      </div>

      <section className="relative overflow-hidden pt-8 pb-20 md:pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-tr from-[#2563EB] via-[#3B82F6] to-[#60A5FA] rounded-[2.5rem] text-white p-8 md:p-16 lg:p-20 relative overflow-hidden shadow-2xl shadow-blue-600/10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-700 rounded-full mix-blend-multiply filter blur-3xl opacity-40 -ml-20 -mb-20" />
            <div className="relative z-10 max-w-4xl space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-white/10">
                <CreditCard className="w-4 h-4 text-blue-200" />
                {t.badge}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.12]">
                {t.heroTitle}
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 max-w-3xl leading-relaxed">{t.heroDesc}</p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href="#payments-demo" className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full text-sm font-bold transition shadow-md hover:shadow-lg">
                  {t.tryDemo}
                  <ArrowRight className="w-4 h-4 text-blue-600" />
                </a>
                <button onClick={onOpenSandbox} className="inline-flex items-center justify-center gap-2 border border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-full text-sm font-bold transition">
                  {t.trySandbox}
                </button>
              </div>
              <div className="border-t border-white/20 my-12 pt-8" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {t.heroBenefits.map((benefit: any) => (
                  <div key={benefit.title}>
                    <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                    <p className="text-blue-100 text-xs leading-relaxed">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-8">{t.trust.title}</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-70">
            {t.trust.logos.map((logo: string, index: number) => (
              <div key={logo} className="flex items-center gap-2 font-black text-slate-700 text-xl tracking-tight">
                {index === 0 && <span className="w-3 h-3 bg-blue-600 inline-block" />}
                {index === 1 && <span className="w-3 h-3 rounded-full bg-[#00D4B2] inline-block" />}
                {index === 3 && <span className="w-3 h-3 rotate-45 bg-emerald-500 inline-block" />}
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 mb-6">{t.ecosystem.title}</h2>
            <p className="text-slate-500 text-lg">{t.ecosystem.desc}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">{t.ecosystem.subtitle}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{t.ecosystem.body}</p>
              </div>
              <div className="space-y-4">
                {t.ecosystem.bullets.map((bullet: any) => (
                  <div key={bullet.title} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">{bullet.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{bullet.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-[#050D24] rounded-3xl border border-blue-900/40 p-6 shadow-2xl relative overflow-hidden text-slate-200">
                <div className="flex items-center justify-between border-b border-blue-950 pb-4 mb-6">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="text-[10px] font-mono text-slate-500 ml-2">{t.simulator.terminalVersion}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded border border-blue-400/20 font-bold font-mono">
                    <Activity className="w-3 h-3 animate-pulse" />
                    {t.simulator.engine}
                  </div>
                </div>

                {!isSimulating ? (
                  <div className="space-y-4">
                    <p className="text-slate-400 text-xs font-mono">{t.simulator.intro}</p>
                    <div className="grid grid-cols-1 gap-3">
                      {(Object.keys(t.simulator.scenarios) as ScenarioKey[]).map((key) => {
                        const buttonScenario = t.simulator.scenarios[key];
                        const color = key === 'soleProp' ? 'text-emerald-400 fill-emerald-400' : key === 'crossBorder' ? 'text-amber-400 fill-amber-400' : 'text-red-400 fill-red-400';
                        return (
                          <button key={key} onClick={() => startSimulator(key)} className="p-4 text-left bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 rounded-2xl transition flex items-center justify-between group">
                            <div>
                              <p className={`text-xs font-bold ${color}`}>{buttonScenario.buttonTitle}</p>
                              <p className="text-[10px] text-slate-400 mt-1 font-mono">{buttonScenario.buttonMeta}</p>
                            </div>
                            <Play className={`w-5 h-5 transition-transform group-hover:scale-110 ${color}`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between bg-slate-950/60 p-4 rounded-xl border border-blue-950">
                      <div>
                        <h4 className="text-xs font-bold text-white font-sans">{scenario.merchantName}</h4>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">{scenario.businessType} - {scenario.country}</p>
                      </div>
                      <span className={`text-[10px] px-3 py-1 rounded-full font-extrabold font-mono border ${
                        scenario.kybStatus === 'Verified' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                        scenario.kybStatus === 'Review' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                        'bg-red-500/10 border-red-500/20 text-red-400'
                      }`}>
                        {t.simulator.statuses[scenario.kybStatus.toLowerCase()]}
                      </span>
                    </div>

                    <div className="space-y-2 min-h-[160px] max-h-[160px] overflow-y-auto font-mono text-[10px] pr-2">
                      {simulationLogs.map((log, index) => (
                        <motion.div key={`${log}-${index}`} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className={`flex items-start gap-2 ${
                          log.includes(t.simulator.logs.failed) || log.includes('SDN') ? 'text-red-400' :
                          log.includes(t.simulator.logs.active) ? 'text-green-400' : 'text-slate-300'
                        }`}>
                          <span className="text-blue-500 select-none">{'>'}</span>
                          <span>{log}</span>
                        </motion.div>
                      ))}
                    </div>

                    {simStep >= 8 ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-4 border-t border-blue-950 space-y-3 font-sans">
                        <h5 className="text-xs font-bold text-white uppercase tracking-wider">{t.simulator.signalsTitle}</h5>
                        <ul className="space-y-1.5">
                          {scenario.details.map((detail: string) => (
                            <li key={detail} className="flex items-start gap-2 text-xs text-slate-300">
                              <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                                scenario.kybStatus === 'Verified' ? 'text-emerald-400' :
                                scenario.kybStatus === 'Review' ? 'text-amber-400' : 'text-red-400'
                              }`} />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex gap-3 pt-3">
                          <button onClick={() => setIsSimulating(false)} className="px-4 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 transition rounded-xl text-xs font-bold text-slate-300">{t.simulator.reset}</button>
                          <button onClick={onOpenSandbox} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-xl text-xs font-bold text-white flex items-center gap-1.5">
                            {t.simulator.configure}
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-500" />
                        <span>{t.simulator.loading}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-slate-100 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-semibold text-slate-800">{t.friction.mockupTitle}</span>
                  </div>
                  <span className="text-xs bg-red-50 text-red-600 font-bold px-2 py-0.5 rounded border border-red-100">{t.friction.riskBadge}</span>
                </div>
                <div className="space-y-3">
                  {t.friction.rows.map((row: any) => (
                    <div key={row.label} className="p-4 bg-white rounded-2xl border border-slate-100 space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase">
                        <span>{row.label}</span>
                        <span className="text-slate-600">{row.value}</span>
                      </div>
                      <p className="text-xs text-slate-500">{row.desc}</p>
                    </div>
                  ))}
                  <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-blue-900">{t.friction.checkTitle}</p>
                      <p className="text-[10px] text-blue-700">{t.friction.checkDesc}</p>
                    </div>
                    <ShieldAlert className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                {t.friction.badge}
              </div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">{t.friction.title}</h2>
              <p className="text-slate-500 text-sm leading-relaxed">{t.friction.desc}</p>
              <button onClick={onOpenSandbox} className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 py-3 rounded-full transition">{t.friction.cta}</button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Database className="w-3.5 h-3.5" />
                {t.hub.badge}
              </div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">{t.hub.title}</h2>
              <p className="text-slate-500 text-sm leading-relaxed">{t.hub.desc}</p>
              <ul className="space-y-2.5 pt-2 text-xs text-slate-600">
                {t.hub.bullets.map((bullet: string) => (
                  <li key={bullet} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 font-extrabold" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-6">
              <div className="bg-gradient-to-tr from-[#0F2256] to-[#1E3A8A] rounded-3xl p-8 text-white space-y-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full filter blur-xl" />
                <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-widest">{t.hub.mockupTitle}</h4>
                <div className="space-y-3">
                  {t.hub.rows.map((row: any) => (
                    <div key={row.title} className="p-3.5 bg-slate-900/80 rounded-xl border border-white/10 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-white">{row.title}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{row.desc}</p>
                      </div>
                      <span className={`text-[10px] border px-2 py-0.5 rounded font-bold font-mono ${
                        row.status === 'flow' ? 'bg-blue-500/15 border-blue-500/20 text-blue-400' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      }`}>
                        {row.status === 'flow' ? t.hub.flowActive : t.hub.automated}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 border-t border-slate-100 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-widest">{t.useCases.label}</div>
              <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">{t.useCases.title}</h2>
              <p className="text-slate-500 text-sm">{t.useCases.desc}</p>
              <div className="space-y-3 pt-4">
                {t.useCases.tabs.map((tab: any) => (
                  <button key={tab.id} onClick={() => setActiveUseCase(tab.id)} className={`w-full text-left p-4 rounded-xl border text-xs font-bold transition duration-200 flex items-center justify-between ${
                    activeUseCase === tab.id ? 'bg-white border-blue-500 text-slate-900 shadow-sm' : 'border-transparent text-slate-500 hover:bg-slate-100'
                  }`}>
                    <span>{tab.label}</span>
                    <ChevronRight className={`w-4 h-4 transition ${activeUseCase === tab.id ? 'translate-x-1 text-blue-500' : 'text-slate-400'}`} />
                  </button>
                ))}
              </div>
            </div>
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-[2rem] border border-slate-100 shadow-xl min-h-[260px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div key={activeUseCaseData.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                  <h4 className="text-xl font-bold text-slate-900">{activeUseCaseData.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{activeUseCaseData.desc}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-4 font-sans">{t.features.title}</h2>
            <p className="text-slate-500 text-sm">{t.features.desc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.features.cards.map((card: any, index: number) => {
              const Icon = featureIcons[index];
              return (
                <div key={card.title} className="p-6 rounded-2xl border border-slate-100 bg-[#FAFBFD]/50 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition duration-300">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">{card.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="payments-demo" className="py-24 md:py-32 bg-[#FAFBFD] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl p-8 md:p-16 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  <Sparkle className="w-3.5 h-3.5 animate-spin" />
                  {t.demo.badge}
                </div>
                <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 font-sans">{t.demo.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{t.demo.desc}</p>
                <div className="bg-gradient-to-tr from-slate-900 to-blue-950 text-white rounded-3xl p-6 shadow-xl max-w-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-[10px] font-mono text-slate-400">{t.demo.app}</span>
                    <Smartphone className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-white">{t.demo.merchantApplication}</p>
                    <div className="h-1.5 w-1/3 bg-blue-500 rounded-full" />
                  </div>
                  <div className="space-y-2.5">
                    {[t.demo.identityVerified, t.demo.kybAudit].map((item: string) => (
                      <div key={item} className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between text-[11px]">
                        <span className="text-slate-300">{item}</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      </div>
                    ))}
                  </div>
                  <div className="bg-blue-600 text-center py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase">{t.demo.launchSandbox}</div>
                </div>
              </div>

              <div className="space-y-6">
                <AnimatePresence mode="wait">
                  {!demoRequested ? (
                    <motion.form key="payments-form" initial={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleDemoSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Field label={t.demo.firstName} value={firstName} onChange={setFirstName} placeholder={t.demo.placeholders.firstName} required />
                        <Field label={t.demo.lastName} value={lastName} onChange={setLastName} placeholder={t.demo.placeholders.lastName} required />
                      </div>
                      <Field label={t.demo.workEmail} type="email" value={email} onChange={setEmail} placeholder={t.demo.placeholders.email} required />
                      <Field label={t.demo.companyWebsite} type="url" value={website} onChange={setWebsite} placeholder={t.demo.placeholders.website} />
                      <Field label={t.demo.companyName} value={companyName} onChange={setCompanyName} placeholder={t.demo.placeholders.companyName} required />
                      <Field label={t.demo.jobTitle} value={jobTitle} onChange={setJobTitle} placeholder={t.demo.placeholders.jobTitle} />
                      <button type="submit" className="w-full py-4 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition duration-200 shadow-md flex items-center justify-center gap-2 mt-2">
                        {t.demo.viewDemo}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div key="form-success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 space-y-6">
                      <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                        <Sparkle className="w-8 h-8 animate-pulse" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-slate-900">{t.demo.successTitle}</h3>
                        <p className="text-xs text-slate-500 max-w-sm mx-auto">{interpolate(t.demo.successDesc, { firstName, companyName, email })}</p>
                      </div>
                      <button onClick={() => { setDemoRequested(false); setFirstName(''); setLastName(''); setEmail(''); setCompanyName(''); }} className="text-xs text-blue-600 font-bold hover:underline">
                        {t.demo.submitAnother}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 mb-4">{t.help.title}</h2>
            <p className="text-slate-500 text-sm">{t.help.desc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {t.help.cards.map((card: any) => (
              <div key={card.title} className="space-y-3">
                <h4 className="text-base font-bold text-slate-900">{card.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-50 py-24 border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-100 rounded-full filter blur-3xl pointer-events-none opacity-50" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-8">
          <p className="text-xl sm:text-2xl font-serif text-blue-900 leading-relaxed italic">{t.testimonial.quote}</p>
          <div>
            <h5 className="text-xs font-extrabold text-blue-950 uppercase tracking-widest">{t.testimonial.name}</h5>
            <p className="text-[10px] text-blue-700 font-semibold mt-0.5 uppercase tracking-wider">{t.testimonial.title}</p>
          </div>
          <button onClick={onOpenSandbox} className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold text-xs px-6 py-3 rounded-full hover:bg-blue-700 transition duration-200">
            {t.testimonial.cta}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-12 text-center font-sans">{t.explore.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.explore.cards.map((card: any, index: number) => (
              <button type="button" key={card.title} onClick={() => onViewChange?.(card.view)} className={`${index === 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-500 hover:bg-emerald-600'} transition cursor-pointer text-white p-8 md:p-12 rounded-[2rem] shadow-xl relative overflow-hidden group`}>
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full filter blur-xl transform translate-x-12 -translate-y-12" />
                <div className="relative z-10 flex flex-col justify-between h-full min-h-[140px]">
                  <div>
                    <div className="bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center mb-6 font-bold">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight">{card.title}</h3>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 text-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-8">
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight text-white">{t.finalCta.title}</h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">{t.finalCta.desc}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button onClick={onOpenSandbox} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-8 py-4 rounded-full transition shadow-md w-full sm:w-auto">{t.finalCta.primary}</button>

          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text', required = false }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
      />
    </div>
  );
}
