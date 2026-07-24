/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState } from 'react';
import {
  ArrowRight, ShieldCheck, ArrowLeft, RefreshCw, Layers, CheckCircle2,
  Smartphone, Landmark as BankIcon, Database, FileText, Activity, Fingerprint, Play
} from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { FINTECH_TRANSLATIONS, type FintechScenarioKey, type FintechStatusKey, type FintechTranslationKey } from '../translations/FintechPageTranslations';

interface FintechPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

const scenarioOrder: FintechScenarioKey[] = ['good', 'review', 'block'];
const scenarioTitleTone: Record<FintechScenarioKey, string> = { good: 'text-emerald-400', review: 'text-amber-400', block: 'text-red-400' };
const scenarioIconTone: Record<FintechScenarioKey, string> = { good: 'text-emerald-400 fill-emerald-400', review: 'text-amber-400 fill-amber-400', block: 'text-red-400 fill-red-400' };
const statusTone: Record<FintechStatusKey, string> = { Approve: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400', Review: 'bg-amber-500/10 border-amber-500/20 text-amber-400', Block: 'bg-red-500/10 border-red-500/20 text-red-400' };
const rowIcons = [Smartphone, Database, Layers];
const platformIcons = [Smartphone, Database, ShieldCheck, Fingerprint, Layers, FileText];
const platformTone = ['bg-[#354CE1]/10 text-[#354CE1]', 'bg-teal-100 text-teal-600', 'bg-amber-100 text-amber-600', 'bg-blue-100 text-blue-600', 'bg-indigo-100 text-indigo-600', 'bg-purple-100 text-purple-600'];

const format = (template: string, values: Record<string, string | number>) => Object.entries(values).reduce((result, [key, value]) => result.replaceAll('{' + key + '}', String(value)), template);

export default function FintechPage({ onOpenSandbox, onBackToLanding }: FintechPageProps) {
  const { language } = useLanguage();
  const translations = getLocalizedRecord(FINTECH_TRANSLATIONS, language as keyof typeof FINTECH_TRANSLATIONS, 'FINTECH_TRANSLATIONS');
  const t = (key: FintechTranslationKey): string => translations[key] as string;

  const [activeScenarioKey, setActiveScenarioKey] = useState<FintechScenarioKey>('good');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [demoRequested, setDemoRequested] = useState(false);

  const simulationSteps = React.useMemo(() => {
    const applicant = translations.scenarios[activeScenarioKey];

    return translations.logs.map((template) => format(template, {
      idCheck: applicant.idCheck,
      dbCheck: applicant.dbCheck,
      ip: applicant.ip,
      riskScore: applicant.riskScore,
      status: translations.status[applicant.status]
    }));
  }, [activeScenarioKey, translations]);
  const simulationLogs = simulationSteps.slice(0, simStep);

  const startSimulator = (key: FintechScenarioKey) => {
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

  const handleDemoSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!firstName || !lastName || !email || !companyName) {
      alert(t('requiredFieldsAlert'));
      return;
    }
    setDemoRequested(true);
  };

  const activeScenario = translations.scenarios[activeScenarioKey];

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-slate-800 antialiased selection:bg-[#354CE1]/10 selection:text-[#354CE1]">
      <section className="relative overflow-hidden bg-gradient-to-tr from-[#0F2256] via-[#1A337E] to-[#254BAA] text-white pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="absolute top-1/4 left-1/12 w-48 h-48 bg-[#00D4B2]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/12 w-72 h-72 bg-blue-400/15 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <button onClick={onBackToLanding} className="group inline-flex items-center gap-2 text-blue-200 hover:text-white text-xs font-semibold mb-8 transition"><ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /><span>{t('backToPlatform')}</span></button>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-[11px] font-bold tracking-wider text-[#00D4B2] uppercase border border-white/15 shadow-sm"><BankIcon className="w-3.5 h-3.5 text-[#00D4B2]" /><span>{t('badge')}</span></div>
              <h1 className="text-3xl sm:text-4xl md:text-5.5xl font-sans font-semibold tracking-tight text-white leading-[1.12]">{t('heroTitle')}</h1>
              <p className="text-base sm:text-lg text-blue-100/90 max-w-xl font-normal leading-relaxed">{t('heroDesc')}</p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"><button onClick={onOpenSandbox} className="bg-white hover:bg-teal-50 text-[#0F2256] font-semibold text-sm px-7 py-3.5 rounded-full transition flex items-center justify-center gap-2 shadow-lg shadow-blue-950/20"><span>{t('tryDemo')}</span><ArrowRight className="w-4 h-4 text-[#0F2256]" /></button></div>
            </div>
            <div className="lg:col-span-5"><div className="bg-[#050D24] rounded-2xl border border-blue-900/40 p-5 shadow-[0_20px_50px_rgba(15,34,86,0.5)] relative overflow-hidden text-slate-200 font-mono text-xs"><div className="flex items-center justify-between border-b border-blue-950 pb-3 mb-4"><div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500/80" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" /><div className="w-2.5 h-2.5 rounded-full bg-green-500/80" /><span className="text-[10px] text-slate-500 ml-2">{t('terminalName')}</span></div><div className="flex items-center gap-1 text-[10px] text-[#00D4B2] bg-[#00D4B2]/10 px-2 py-0.5 rounded-md border border-[#00D4B2]/20 font-semibold"><Activity className="w-3 h-3 text-[#00D4B2]" /><span>{t('activeMatch')}</span></div></div>{!isSimulating ? <div className="space-y-4 font-sans"><p className="text-slate-400 text-xs font-mono">{t('simulatorPrompt')}</p><div className="grid grid-cols-1 gap-2">{scenarioOrder.map((key) => { const scenario = translations.scenarios[key]; return <button key={key} onClick={() => startSimulator(key)} className="p-3 text-left bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 rounded-xl transition flex items-center justify-between"><div><p className={['text-xs font-semibold', scenarioTitleTone[key]].join(' ')}>{scenario.buttonTitle}</p><p className="text-[10px] text-slate-400 mt-0.5">{scenario.buttonDesc}</p></div><Play className={['w-4 h-4', scenarioIconTone[key]].join(' ')} /></button>; })}</div></div> : <div className="space-y-4"><div className="flex items-center justify-between bg-slate-950/60 p-3 rounded-xl border border-blue-950"><div><h4 className="text-xs font-bold text-white font-sans">{activeScenario.name}</h4><p className="text-[10px] text-slate-500 font-sans mt-0.5">{activeScenario.type} {translations.bullet} {activeScenario.amount}</p></div><span className={['text-[10px] font-sans px-2.5 py-0.5 rounded-full font-bold border', statusTone[activeScenario.status]].join(' ')}>{translations.status[activeScenario.status]}</span></div><div className="space-y-1.5 min-h-[160px] max-h-[180px] overflow-y-auto pr-1">{simulationLogs.map((log, idx) => <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} key={idx} className="flex items-start gap-2 text-[10px]"><span className="text-blue-400 font-bold mt-0.5 select-none">{t('consolePrompt')}</span><span className={idx === simulationLogs.length - 1 ? 'text-white font-semibold' : 'text-slate-400'}>{log}</span></motion.div>)}</div>{simStep < translations.logs.length ? <div className="flex items-center gap-2 text-[10px] text-slate-500 pt-2 border-t border-slate-900"><RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-400" /><span>{t('queryData')}</span></div> : <div className="flex flex-col gap-2 pt-2 border-t border-slate-900 font-sans"><div className="text-xs text-white font-semibold mb-1">{t('decisionBreakdown')}</div><ul className="space-y-1 text-[10px] text-slate-300 font-mono">{activeScenario.details.map((detail) => <li key={detail} className="flex items-start gap-1.5"><span className="text-emerald-500">{t('bullet')}</span><span>{detail}</span></li>)}</ul><div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-900/50"><div className="flex items-center gap-1 text-[10px]"><span className="text-slate-500 font-mono">{t('riskScore')}</span><span className={['font-bold font-mono', activeScenario.riskScore < 20 ? 'text-emerald-400' : activeScenario.riskScore < 70 ? 'text-amber-400' : 'text-red-400'].join(' ')}>{activeScenario.riskScore}{t('scoreMax')}</span></div><button onClick={resetSimulator} className="text-[10px] font-sans font-semibold text-slate-400 hover:text-white px-3 py-1 hover:bg-slate-900 border border-slate-800 rounded-lg transition">{t('runAnother')}</button></div></div>}</div>}</div></div>
          </div>
        </div>
      </section>

      <section className="bg-[#0B1530] border-b border-blue-950/40 py-8 text-white/60"><div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6"><p className="text-xs font-semibold tracking-wider uppercase text-center md:text-left">{t('trustedBy')}</p><div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">{translations.logos.map((logo) => <span key={logo} className="text-lg md:text-xl font-bold tracking-tight text-white/90">{logo}</span>)}</div></div></section>

      <section className="py-20 bg-white"><div className="max-w-6xl mx-auto px-6 space-y-24">{translations.rows.map((row, index) => { const RowIcon = rowIcons[index]; const reverse = index === 1; return <div key={row.title} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"><div className={['space-y-4', reverse ? 'md:order-2' : ''].join(' ')}><h2 className="text-2xl md:text-3xl font-sans font-semibold text-slate-900 tracking-tight">{row.title}</h2><p className="text-slate-600 text-sm md:text-base leading-relaxed">{row.desc}</p></div><div className={['bg-[#F4F6FC] rounded-2xl p-8 border border-slate-100 flex flex-col gap-4 shadow-sm', reverse ? 'md:order-1' : ''].join(' ')}><div className="flex items-center gap-3"><div className="p-2.5 bg-[#354CE1]/10 rounded-xl text-[#354CE1]"><RowIcon className="w-5 h-5" /></div><div><h4 className="text-sm font-bold text-slate-900">{row.cardTitle}</h4><p className="text-xs text-slate-500">{row.cardDesc}</p></div></div>{index === 2 ? <div className="p-4 bg-white rounded-xl border border-slate-100 text-xs space-y-2"><div className="flex items-center gap-2 text-slate-600"><div className="w-2 h-2 rounded-full bg-blue-500" /><span>{row.metric}</span></div><div className="pl-4 border-l-2 border-slate-100 space-y-1.5 text-slate-500 text-[11px]">{row.steps?.map((step) => <div key={step}>{step}</div>)}</div></div> : <div className="p-4 bg-white rounded-xl border border-slate-100 space-y-2"><div className="flex items-center justify-between text-xs text-slate-400"><span>{row.metric}</span><span className="text-emerald-500 font-bold">{row.metricValue}</span></div>{row.metric2 ? <div className="flex items-center justify-between text-xs text-slate-400"><span>{row.metric2}</span><span className="text-emerald-500 font-bold">{row.metric2Value}</span></div> : <><div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden"><div className="bg-emerald-500 h-2 w-1/3 rounded-full" /></div><p className="text-[10px] text-slate-500 italic">{row.note}</p></>}</div>}</div></div>; })}</div></section>

      <section className="py-20 bg-[#F0F2FB]"><div className="max-w-6xl mx-auto px-6"><div className="bg-white rounded-3xl border border-slate-200/60 p-8 md:p-12 shadow-sm space-y-10"><div className="text-center space-y-2 max-w-xl mx-auto"><span className="text-xs font-bold text-[#354CE1] uppercase tracking-wider block">{t('buildingBlocksEyebrow')}</span><h2 className="text-2xl md:text-3xl font-sans font-semibold text-slate-950">{t('buildingBlocksTitle')}</h2></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">{translations.platformCards.map((card, index) => { const CardIcon = platformIcons[index]; return <div key={card.title} className="p-6 rounded-2xl hover:bg-slate-50 border border-slate-100 transition flex flex-col gap-4"><div className={['p-3 rounded-xl w-fit', platformTone[index]].join(' ')}><CardIcon className="w-5 h-5" /></div><h3 className="text-base font-bold text-slate-900">{card.title}</h3><p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p></div>; })}</div></div></div></section>

      <section className="py-20 bg-white"><div className="max-w-6xl mx-auto px-6"><div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"><div className="lg:col-span-5 bg-gradient-to-br from-[#ECEFFE] to-[#D5DCFF] rounded-3xl p-8 flex items-center justify-center border border-slate-100 shadow-sm relative overflow-hidden min-h-[400px]"><div className="space-y-6 relative z-10 w-full"><div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4 max-w-sm mx-auto"><div className="flex items-center gap-3"><div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><CheckCircle2 className="w-4 h-4" /></div><div><span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">{t('demoVisualFlow')}</span><span className="text-xs font-bold text-slate-900">{t('demoVisualPolicy')}</span></div></div><div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2"><MiniMetric label={t('facialMatch')} value={t('passed')} /><MiniMetric label={t('ofacSanctions')} value={t('clean')} /><MiniMetric label={t('uboExtracted')} value={t('found3')} /></div></div><div className="text-center font-sans"><h4 className="font-bold text-slate-800 text-sm">{t('automationTitle')}</h4><p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">{t('automationDesc')}</p></div></div></div><div className="lg:col-span-7"><div className="space-y-6 max-w-xl"><h2 className="text-2xl md:text-3xl font-sans font-semibold text-slate-900 tracking-tight">{t('formTitle')}</h2><p className="text-slate-500 text-sm leading-relaxed">{t('formDesc')}</p>{demoRequested ? <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3"><CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" /><h3 className="text-lg font-bold text-emerald-900">{t('successTitle')}</h3><p className="text-sm text-emerald-700 max-w-md mx-auto">{format(t('successDesc'), { firstName, email })}</p><button onClick={() => setDemoRequested(false)} className="mt-4 px-5 py-2 bg-emerald-600 text-white hover:bg-emerald-700 font-semibold text-xs rounded-full transition">{t('fillAnother')}</button></motion.div> : <form onSubmit={handleDemoSubmit} className="space-y-4 font-sans text-xs"><div className="grid grid-cols-2 gap-4"><InputField label={t('firstName')} value={firstName} onChange={setFirstName} placeholder={t('firstNamePlaceholder')} required /><InputField label={t('lastName')} value={lastName} onChange={setLastName} placeholder={t('lastNamePlaceholder')} required /></div><InputField label={t('email')} value={email} onChange={setEmail} placeholder={t('emailPlaceholder')} type="email" required /><InputField label={t('website')} value={website} onChange={setWebsite} placeholder={t('websitePlaceholder')} required /><InputField label={t('companyName')} value={companyName} onChange={setCompanyName} placeholder={t('companyPlaceholder')} required /><InputField label={t('jobTitle')} value={jobTitle} onChange={setJobTitle} placeholder={t('jobTitlePlaceholder')} /><button type="submit" className="w-full sm:w-auto px-8 py-3.5 bg-slate-950 text-white hover:bg-slate-900 font-semibold rounded-full transition flex items-center justify-center gap-2"><span>{t('viewDemo')}</span><ArrowRight className="w-4 h-4 text-white" /></button></form>}</div></div></div><div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-slate-100 mt-16 font-sans">{translations.subpoints.map((point) => <div key={point.title} className="space-y-2"><h4 className="text-sm font-bold text-slate-900">{point.title}</h4><p className="text-xs text-slate-500 leading-relaxed">{point.desc}</p></div>)}</div></div></section>

      <section className="py-20 bg-slate-50 border-t border-b border-slate-100"><div className="max-w-6xl mx-auto px-6 space-y-10"><h2 className="text-2xl font-sans font-semibold text-slate-950 tracking-tight text-center sm:text-left">{t('exploreTitle')}</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-6">{translations.exploreCards.map((card) => <div key={card.title} className="bg-[#BACBFF]/50 hover:bg-[#BACBFF]/70 border border-[#98AFFE]/30 p-8 rounded-3xl transition flex flex-col justify-between min-h-[220px]"><h3 className="text-xl md:text-2xl font-semibold text-[#0C1E4F] max-w-xs font-sans">{card.title}</h3><button onClick={onOpenSandbox} className="group inline-flex items-center gap-2 text-xs font-bold text-[#0C1E4F] uppercase tracking-wider w-fit"><span>{card.button}</span><ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></button></div>)}</div></div></section>

      <section className="py-20 bg-gradient-to-br from-[#AFB6FF] to-[#DCE0FF] text-[#0C1E4F] relative overflow-hidden"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/20 rounded-full blur-3xl" /><div className="max-w-6xl mx-auto px-6 relative z-10 text-center space-y-6"><h2 className="text-3xl md:text-4.5xl font-sans font-semibold tracking-tight leading-tight">{t('readyTitle')}</h2><p className="text-sm md:text-base text-[#1E3063] max-w-md mx-auto">{t('readyDesc')}</p><div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"><button onClick={onOpenSandbox} className="w-full sm:w-auto bg-slate-950 text-white hover:bg-slate-900 font-semibold text-sm px-8 py-3.5 rounded-full transition flex items-center justify-center gap-2 shadow-lg"><span>{t('tryDemo')}</span><ArrowRight className="w-4 h-4 text-white" /></button></div></div></section>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono"><span>{label}</span><span className="text-emerald-600 font-bold">{value}</span></div>;
}

function InputField({ label, value, onChange, placeholder, type = 'text', required = false }: { label: string; value: string; onChange: (value: string) => void; placeholder: string; type?: string; required?: boolean }) {
  return <div className="space-y-1"><label className="font-semibold text-slate-600">{label}</label><input type={type} required={required} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="w-full bg-[#FAFBFD] border border-slate-200/80 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[#354CE1] focus:bg-white transition" /></div>;
}
