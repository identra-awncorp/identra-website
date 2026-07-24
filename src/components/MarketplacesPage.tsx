/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState } from 'react';
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CheckSquare,
  Database,
  FileText,
  Globe,
  Layers,
  Play,
  RefreshCw,
  Scale,
  ShieldAlert,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Truck,
  Users
} from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { MARKETPLACES_PAGE_TRANSLATIONS } from '../translations/MarketplacesPageTranslations';

interface MarketplacesPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

type ScenarioKey = 'good_seller' | 'courier_review' | 'buyer_block';
const scenarioKeys: ScenarioKey[] = ['good_seller', 'courier_review', 'buyer_block'];
const featureIcons = [Smartphone, Users, Database, Sparkles, ShieldAlert, Layers, FileText, RefreshCw, Scale];
const scenarioIconClasses = {
  good_seller: { icon: ShoppingBag, bg: 'bg-emerald-500/10', text: 'text-emerald-400', fill: 'fill-emerald-400' },
  courier_review: { icon: Truck, bg: 'bg-amber-500/10', text: 'text-amber-400', fill: 'fill-amber-400' },
  buyer_block: { icon: ShoppingCart, bg: 'bg-red-500/10', text: 'text-red-400', fill: 'fill-red-400' }
};

export default function MarketplacesPage({ onOpenSandbox, onBackToLanding, onViewChange }: MarketplacesPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(MARKETPLACES_PAGE_TRANSLATIONS, language as keyof typeof MARKETPLACES_PAGE_TRANSLATIONS, 'MARKETPLACES_PAGE_TRANSLATIONS');

  const [activeScenarioKey, setActiveScenarioKey] = useState<ScenarioKey>('good_seller');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [demoRequested, setDemoRequested] = useState(false);

  const activeScenario = t.terminal.scenarios[activeScenarioKey];

  const simulationSteps = React.useMemo(() => {
    const applicant = t.terminal.scenarios[activeScenarioKey];

    return [
      t.terminal.logs.scanId,
      t.terminal.logs.biometrics.replace('{result}', applicant.idCheck === 'Verified' ? t.terminal.logs.matchConfirmed : t.terminal.logs.livenessFail),
      t.terminal.logs.registries,
      t.terminal.logs.database.replace('{result}', t.terminal.dbChecks[applicant.dbCheck]),
      t.terminal.logs.device,
      t.terminal.logs.riskIntel,
      t.terminal.logs.compliance,
      t.terminal.logs.decision
        .replace('{score}', String(applicant.riskScore))
        .replace('{status}', t.terminal.statuses[applicant.status])
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
      if (current >= simulationSteps.length) clearInterval(interval);
    }, 1000);
  };

  const resetSimulator = () => {
    setIsSimulating(false);
    setSimStep(0);
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
    <div className="bg-[#FAFBFD] min-h-screen text-slate-800 antialiased selection:bg-[#354CE1]/10 selection:text-[#354CE1]">
      <section className="relative overflow-hidden bg-gradient-to-tr from-[#0F2256] via-[#142962] to-[#1C3B8B] text-white pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_60%)]" />
        <div className="absolute top-1/4 left-1/12 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/12 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <button onClick={onBackToLanding} className="group inline-flex items-center gap-2 text-blue-200 hover:text-white text-xs font-semibold mb-8 transition animate-fade-in">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            {t.backToPlatform}
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-[11px] font-bold tracking-wider text-[#00D4B2] uppercase border border-white/15 shadow-sm">
                <ShoppingBag className="w-3.5 h-3.5 text-[#00D4B2]" />
                {t.badge}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5.5xl font-sans font-semibold tracking-tight text-white leading-[1.12]">{t.heroTitle}</h1>
              <p className="text-base sm:text-lg text-blue-100/90 max-w-xl font-normal leading-relaxed">{t.heroDesc}</p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button onClick={onOpenSandbox} className="bg-white hover:bg-teal-50 text-[#0F2256] font-semibold text-sm px-7 py-3.5 rounded-full transition flex items-center justify-center gap-2 shadow-lg shadow-blue-950/20" id="marketplace-hero-demo-btn">
                  {t.tryDemo}
                  <ArrowRight className="w-4 h-4 text-[#0F2256]" />
                </button>

              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#050D24] rounded-2xl border border-blue-900/40 p-5 shadow-[0_20px_50px_rgba(15,34,86,0.5)] relative overflow-hidden text-slate-200 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-blue-950 pb-3 mb-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="text-[10px] text-slate-500 ml-2">{t.terminal.engine}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-[#00D4B2] bg-[#00D4B2]/10 px-2 py-0.5 rounded-md border border-[#00D4B2]/20 font-semibold">
                    <Activity className="w-3 h-3 text-[#00D4B2]" />
                    {t.terminal.autoReview}
                  </div>
                </div>

                {!isSimulating ? (
                  <div className="space-y-4 font-sans">
                    <p className="text-slate-400 text-xs font-mono">{t.terminal.selectPrompt}</p>
                    <div className="grid grid-cols-1 gap-2">
                      {scenarioKeys.map((key) => {
                        const scenario = t.terminal.scenarios[key];
                        const style = scenarioIconClasses[key];
                        const Icon = style.icon;
                        return (
                          <button key={key} onClick={() => startSimulator(key)} className="p-3 text-left bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 rounded-xl transition flex items-center justify-between" id={`scenario-${key}`}>
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${style.bg} ${style.text}`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <p className={`text-xs font-semibold ${style.text}`}>{scenario.buttonTitle}</p>
                                <p className="text-[10px] text-slate-400 mt-0.5">{scenario.buttonSubtitle}</p>
                              </div>
                            </div>
                            <Play className={`w-4 h-4 ${style.text} ${style.fill}`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-slate-950/60 p-3 rounded-xl border border-blue-950">
                      <div className="flex items-center gap-2">
                        {activeScenario.role === 'Seller' && <ShoppingBag className="w-4 h-4 text-blue-400" />}
                        {activeScenario.role === 'Courier' && <Truck className="w-4 h-4 text-amber-400" />}
                        {activeScenario.role === 'Buyer' && <ShoppingCart className="w-4 h-4 text-red-400" />}
                        <div>
                          <h4 className="text-xs font-bold text-white font-sans">{activeScenario.name}</h4>
                          <p className="text-[10px] text-slate-500 font-sans mt-0.5">{activeScenario.type}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-sans px-2.5 py-0.5 rounded-full font-bold border ${statusPillClass(activeScenario.status)}`}>
                        {t.terminal.statuses[activeScenario.status]}
                      </span>
                    </div>

                    <div className="space-y-1.5 min-h-[160px] max-h-[180px] overflow-y-auto pr-1">
                      {simulationLogs.map((log, idx) => (
                        <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} key={`${log}-${idx}`} className="flex items-start gap-2 text-[10px]">
                          <span className="text-blue-400 font-bold mt-0.5 select-none">{t.terminal.promptPrefix}</span>
                          <span className={idx === simulationLogs.length - 1 ? 'text-white font-semibold' : 'text-slate-400'}>{log}</span>
                        </motion.div>
                      ))}
                    </div>

                    {simStep < 8 ? (
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 pt-2 border-t border-slate-900">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-400" />
                        <span>{t.terminal.running}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2 pt-2 border-t border-slate-900 font-sans">
                        <div className="text-xs text-white font-semibold mb-1">{t.terminal.riskDetails}</div>
                        <ul className="space-y-1 text-[10px] text-slate-300 font-mono">
                          {activeScenario.details.map((detail) => (
                            <li key={detail} className="flex items-start gap-1.5">
                              <span className="text-[#00D4B2] font-bold">•</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-900/50">
                          <div className="flex items-center gap-1 text-[10px]">
                            <span className="text-slate-400 font-mono">{t.terminal.deviceRisk}</span>
                            <span className={`font-bold font-mono ${activeScenario.riskScore < 20 ? 'text-emerald-400' : activeScenario.riskScore < 60 ? 'text-amber-400' : 'text-red-400'}`}>{activeScenario.riskScore}/100</span>
                          </div>
                          <button onClick={resetSimulator} className="text-[10px] font-sans font-semibold text-slate-400 hover:text-white px-3 py-1 hover:bg-slate-900 border border-slate-800 rounded-lg transition">
                            {t.terminal.runAnother}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0B1530] border-b border-blue-950/40 py-8 text-white/60">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs font-semibold tracking-wider uppercase text-center md:text-left">{t.trusted.label}</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {t.trusted.brands.map((brand, index) => (
              <span key={brand} className={`${index === 0 ? 'text-lg md:text-xl font-bold font-serif' : index === 1 ? 'text-base md:text-lg font-black uppercase font-sans' : 'text-lg md:text-xl font-extrabold text-[#00D4B2] font-sans'} tracking-tight text-white/95`}>
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 space-y-24">
          <DifferentiatorOne item={t.differentiators[0]} />
          <DifferentiatorTwo item={t.differentiators[1]} />
          <DifferentiatorThree item={t.differentiators[2]} />
        </div>
      </section>

      <section className="py-20 bg-[#F0F2FB]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-3xl border border-slate-200/60 p-8 md:p-12 shadow-sm space-y-10">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-xs font-bold text-[#354CE1] uppercase tracking-wider block">{t.featureSuite.badge}</span>
              <h2 className="text-2xl md:text-3xl font-sans font-semibold text-slate-950">{t.featureSuite.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {t.featureSuite.items.map((feature, index) => {
                const Icon = featureIcons[index];
                return <FeatureCard key={feature.title} feature={feature} icon={<Icon className="w-5 h-5" />} index={index} />;
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 bg-gradient-to-br from-[#ECEFFE] to-[#D5DCFF] rounded-3xl p-8 flex items-center justify-center border border-slate-100 shadow-sm relative overflow-hidden min-h-[400px]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#354CE1]/5 rounded-full blur-2xl" />
              <div className="space-y-6 relative z-10 w-full">
                <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4 max-w-sm mx-auto">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#00D4B2]/10 text-[#00D4B2] rounded-lg">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">{t.demo.visualBadge}</span>
                      <span className="text-xs font-bold text-slate-900">{t.demo.visualTitle}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                    {t.demo.visualRows.map((row) => (
                      <div key={row.label} className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                        <span>{row.label}</span>
                        <span className="text-teal-600 font-bold">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-center font-sans">
                  <h4 className="font-bold text-slate-800 text-sm">{t.demo.visualHeading}</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">{t.demo.visualDesc}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="space-y-6 max-w-xl">
                <h2 className="text-2xl md:text-3xl font-sans font-semibold text-slate-900 tracking-tight">{t.demo.title}</h2>
                <p className="text-slate-500 text-sm leading-relaxed">{t.demo.desc}</p>
                {demoRequested ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                    <h3 className="text-lg font-bold text-emerald-900">{t.demo.successTitle}</h3>
                    <p className="text-sm text-emerald-700 max-w-md mx-auto">
                      {t.demo.successPrefix} <strong>{firstName}</strong>! {t.demo.successMiddle} <strong>{email}</strong> {t.demo.successSuffix}
                    </p>
                    <button onClick={() => setDemoRequested(false)} className="mt-4 px-5 py-2 bg-emerald-600 text-white hover:bg-emerald-700 font-semibold text-xs rounded-full transition">
                      {t.demo.requestAnother}
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleDemoSubmit} className="space-y-4 font-sans text-xs" id="marketplace-demo-form">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField label={t.demo.fields.firstName} value={firstName} onChange={setFirstName} placeholder={t.demo.placeholders.firstName} required />
                      <FormField label={t.demo.fields.lastName} value={lastName} onChange={setLastName} placeholder={t.demo.placeholders.lastName} required />
                    </div>
                    <FormField label={t.demo.fields.workEmail} type="email" value={email} onChange={setEmail} placeholder={t.demo.placeholders.workEmail} required />
                    <FormField label={t.demo.fields.platformUrl} value={website} onChange={setWebsite} placeholder={t.demo.placeholders.platformUrl} required />
                    <FormField label={t.demo.fields.companyName} value={companyName} onChange={setCompanyName} placeholder={t.demo.placeholders.companyName} required />
                    <FormField label={t.demo.fields.jobTitle} value={jobTitle} onChange={setJobTitle} placeholder={t.demo.placeholders.jobTitle} />
                    <button type="submit" className="w-full sm:w-auto px-8 py-3.5 bg-slate-950 text-white hover:bg-slate-900 font-semibold rounded-full transition flex items-center justify-center gap-2">
                      {t.demo.submit}
                      <ArrowRight className="w-4 h-4 text-white" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-slate-100 mt-16 font-sans">
            {t.checklist.slice(0, 3).map((item) => <ChecklistItem key={item.title} item={item} />)}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-slate-100/40 font-sans">
            {t.checklist.slice(3).map((item) => <ChecklistItem key={item.title} item={item} />)}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 space-y-10">
          <h2 className="text-2xl font-sans font-semibold text-slate-950 tracking-tight text-center sm:text-left">{t.explore.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.explore.cards.map((card, index) => (
              <div key={card.title} className="bg-[#BACBFF]/50 hover:bg-[#BACBFF]/70 border border-[#98AFFE]/30 p-8 rounded-3xl transition flex flex-col justify-between min-h-[220px]">
                <h3 className="text-xl md:text-2xl font-semibold text-[#0C1E4F] max-w-xs font-sans">{card.title}</h3>
                <button onClick={() => onViewChange?.(index === 0 ? 'kyb' : 'age-assurance')} className="group inline-flex items-center gap-2 text-xs font-bold text-[#0C1E4F] uppercase tracking-wider w-fit">
                  {card.cta}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#AFB6FF] to-[#DCE0FF] text-[#0C1E4F] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/20 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center space-y-6">
          <h2 className="text-3xl md:text-4.5xl font-sans font-semibold tracking-tight leading-tight">{t.cta.title}</h2>
          <p className="text-sm md:text-base text-[#1E3063] max-w-md mx-auto">{t.cta.desc}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button onClick={onOpenSandbox} className="w-full sm:w-auto bg-slate-950 text-white hover:bg-slate-900 font-semibold text-sm px-8 py-3.5 rounded-full transition flex items-center justify-center gap-2 shadow-lg">
              {t.cta.primary}
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

          </div>
        </div>
      </section>
    </div>
  );
}

function statusPillClass(status: 'Approve' | 'Review' | 'Block') {
  if (status === 'Approve') return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
  if (status === 'Review') return 'bg-amber-500/10 border-amber-500/20 text-amber-400';
  return 'bg-red-500/10 border-red-500/20 text-red-400';
}

function DifferentiatorOne({ item }: { item: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <TextBlock item={item} />
      <div className="bg-[#F4F6FC] rounded-2xl p-8 border border-slate-100 flex flex-col gap-4 shadow-sm">
        <VisualHeader icon={<Globe className="w-5 h-5" />} title={item.cardTitle} subtitle={item.cardSubtitle} />
        <div className="p-4 bg-white rounded-xl border border-slate-100 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>{item.metricLabel}</span>
            <span className="text-teal-500 font-bold">{item.metricValue}</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-teal-500 h-2 w-1/4 rounded-full" />
          </div>
          <p className="text-[10px] text-slate-500 italic">{item.note}</p>
        </div>
      </div>
    </div>
  );
}

function DifferentiatorTwo({ item }: { item: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
      <div className="space-y-4 md:order-2"><TextBlock item={item} inner /></div>
      <div className="bg-[#FAFBFD] rounded-2xl p-8 border border-slate-100 flex flex-col gap-4 shadow-sm md:order-1">
        <VisualHeader icon={<ShieldAlert className="w-5 h-5" />} title={item.cardTitle} subtitle={item.cardSubtitle} tone="indigo" />
        <div className="grid grid-cols-2 gap-2">
          {item.stats.map((stat: { label: string; value: string }, index: number) => (
            <div key={stat.label} className="p-3 bg-white border border-slate-100 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">{stat.label}</span>
              <span className={`text-xs font-bold ${index === 0 ? 'text-red-500' : 'text-teal-500'}`}>{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DifferentiatorThree({ item }: { item: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <TextBlock item={item} />
      <div className="bg-[#F4F6FC] rounded-2xl p-8 border border-slate-100 flex flex-col gap-4 shadow-sm">
        <VisualHeader icon={<Layers className="w-5 h-5" />} title={item.cardTitle} subtitle={item.cardSubtitle} tone="blue" />
        <div className="p-4 bg-white rounded-xl border border-slate-100 text-xs space-y-2">
          <div className="flex items-center gap-2 text-slate-600">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span>{item.trigger}</span>
          </div>
          <div className="pl-4 border-l-2 border-slate-100 space-y-1.5 text-slate-500 text-[11px]">
            {item.steps.map((step: string) => <div key={step}>{step}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function TextBlock({ item, inner = false }: { item: { badge: string; title: string; desc: string }; inner?: boolean }) {
  const content = (
    <>
      <div className="text-xs font-bold text-[#354CE1] uppercase tracking-wide">{item.badge}</div>
      <h2 className="text-2xl md:text-3xl font-sans font-semibold text-slate-900 tracking-tight">{item.title}</h2>
      <p className="text-slate-600 text-sm md:text-base leading-relaxed">{item.desc}</p>
    </>
  );
  return inner ? content : <div className="space-y-4">{content}</div>;
}

function VisualHeader({ icon, title, subtitle, tone = 'primary' }: { icon: React.ReactNode; title: string; subtitle: string; tone?: 'primary' | 'indigo' | 'blue' }) {
  const color = tone === 'primary' ? 'bg-[#354CE1]/10 text-[#354CE1]' : tone === 'indigo' ? 'bg-indigo-100 text-[#354CE1]' : 'bg-blue-100 text-blue-600';
  return (
    <div className="flex items-center gap-3">
      <div className={`p-2.5 rounded-xl ${color}`}>{icon}</div>
      <div>
        <h4 className="text-sm font-bold text-slate-900">{title}</h4>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}

type FeatureCardProps = { feature: { title: string; desc: string }; icon: React.ReactNode; index: number };

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, icon, index }) => {
  const tones = ['bg-blue-50 text-blue-600', 'bg-teal-50 text-teal-600', 'bg-indigo-50 text-indigo-600', 'bg-amber-50 text-amber-600', 'bg-red-50 text-red-600', 'bg-emerald-50 text-emerald-600', 'bg-purple-50 text-purple-600', 'bg-teal-50 text-teal-600', 'bg-indigo-50 text-indigo-600'];
  return (
    <div className="p-6 rounded-2xl hover:bg-slate-50 border border-slate-100/80 transition flex flex-col gap-4">
      <div className={`p-3 rounded-xl w-fit ${tones[index]}`}>{icon}</div>
      <h3 className="text-base font-bold text-slate-900">{feature.title}</h3>
      <p className="text-xs text-slate-500 leading-relaxed">{feature.desc}</p>
    </div>
  );
};

function FormField({ label, value, onChange, placeholder, required = false, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; placeholder: string; required?: boolean; type?: string }) {
  return (
    <div className="space-y-1">
      <label className="font-semibold text-slate-600">{label}</label>
      <input type={type} required={required} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-[#FAFBFD] border border-slate-200/80 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#354CE1] focus:bg-white transition" />
    </div>
  );
}

const ChecklistItem: React.FC<{ item: { title: string; desc: string } }> = ({ item }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <CheckSquare className="w-5 h-5 text-[#00D4B2]" />
        <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
      </div>
      <p className="text-xs text-slate-500 leading-relaxed pl-7">{item.desc}</p>
    </div>
  );
};
