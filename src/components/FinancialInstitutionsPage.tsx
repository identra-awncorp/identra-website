/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState } from 'react';
import {
  ArrowRight, Check, Shield, ArrowLeft, RefreshCw, Layers, CheckCircle2,
  Users, Search, Sparkles, Landmark, Building, Landmark as BankIcon,
  CreditCard, ShieldAlert, Database, Activity, Fingerprint, Lock, Scale, Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import {
  FINANCIAL_INSTITUTIONS_TRANSLATIONS,
  type FinancialInstitutionsScenarioKey,
  type FinancialInstitutionsStatusKey,
  type FinancialInstitutionsTabKey,
  type FinancialInstitutionsTranslationKey
} from '../translations/FinancialInstitutionsPageTranslations';

interface FinancialInstitutionsPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

const scenarioOrder: FinancialInstitutionsScenarioKey[] = ['branch', 'mortgage', 'treasury'];
const tabOrder: FinancialInstitutionsTabKey[] = ['kyc', 'aml', 'kyb'];
const scenarioTitleTone: Record<FinancialInstitutionsScenarioKey, string> = { branch: 'text-emerald-400', mortgage: 'text-amber-400', treasury: 'text-red-400' };
const scenarioIconTone: Record<FinancialInstitutionsScenarioKey, string> = { branch: 'text-emerald-400 fill-emerald-400 animate-pulse', mortgage: 'text-amber-400 fill-amber-400', treasury: 'text-red-400 fill-red-400' };
const statusTone: Record<FinancialInstitutionsStatusKey, string> = { Approve: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400', Review: 'bg-amber-500/10 border-amber-500/20 text-amber-400', Block: 'bg-red-500/10 border-red-500/20 text-red-400' };
const tabIcons = { kyc: Fingerprint, aml: ShieldAlert, kyb: Building };
const tabIconTone: Record<FinancialInstitutionsTabKey, string> = { kyc: 'bg-blue-50 text-[#354CE1]', aml: 'bg-amber-50 text-amber-600', kyb: 'bg-purple-50 text-purple-600' };
const logoIcons = [Landmark, Shield, CreditCard, Activity, Scale];
const featureIcons = [Fingerprint, Database, Search, Activity, Layers, Lock];
const featureTones = ['bg-blue-50 text-[#354CE1]', 'bg-emerald-50 text-emerald-600', 'bg-amber-50 text-amber-600', 'bg-indigo-50 text-indigo-600', 'bg-purple-50 text-purple-600', 'bg-rose-50 text-rose-600'];
const exploreIcons = [Scale, ShieldAlert];
const exploreTone = ['bg-blue-50 text-[#354CE1]', 'bg-red-50 text-red-600'];

const format = (template: string, values: Record<string, string | number>) =>
  Object.entries(values).reduce((result, [key, value]) => result.replaceAll('{' + key + '}', String(value)), template);

export default function FinancialInstitutionsPage({ onOpenSandbox, onBackToLanding, onViewChange }: FinancialInstitutionsPageProps) {
  const { language } = useLanguage();
  const translations = getLocalizedRecord(FINANCIAL_INSTITUTIONS_TRANSLATIONS, language as keyof typeof FINANCIAL_INSTITUTIONS_TRANSLATIONS, 'FINANCIAL_INSTITUTIONS_TRANSLATIONS');
  const t = (key: FinancialInstitutionsTranslationKey): string => translations[key] as string;

  const [activeScenarioKey, setActiveScenarioKey] = useState<FinancialInstitutionsScenarioKey>('branch');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);
  const [activeTab, setActiveTab] = useState<FinancialInstitutionsTabKey>('kyc');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [demoRequested, setDemoRequested] = useState(false);

  const simulationSteps = React.useMemo(() => {
    const applicant = translations.scenarios[activeScenarioKey];

    return translations.simulatorLogs.map((template) => format(template, {
      type: applicant.type,
      idCheck: applicant.idCheck,
      amlCheck: applicant.amlCheck,
      riskScore: applicant.riskScore,
      status: translations.statusLabels[applicant.status]
    }));
  }, [activeScenarioKey, translations]);
  const simulationLogs = simulationSteps.slice(0, simStep);

  const startSimulator = (key: FinancialInstitutionsScenarioKey) => {
    setActiveScenarioKey(key);
    setIsSimulating(true);
    setSimStep(0);
    let current = 0;
    const interval = setInterval(() => {
      setSimStep(current + 1);
      current++;
      if (current >= simulationSteps.length) clearInterval(interval);
    }, 900);
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
  const activeTabData = translations.tabs[activeTab];
  const ActiveTabIcon = tabIcons[activeTab];

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-slate-800 antialiased selection:bg-[#354CE1]/10 selection:text-[#354CE1]">
      <section className="relative overflow-hidden bg-gradient-to-tr from-[#0F2256] via-[#152C75] to-[#2546A3] text-white pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_55%)]" />
        <div className="absolute top-1/4 left-1/12 w-48 h-48 bg-[#00D4B2]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/12 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <button onClick={onBackToLanding} className="group inline-flex items-center gap-2 text-blue-200 hover:text-white text-xs font-semibold mb-8 transition" id="back-btn">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{t('backToPlatform')}</span>
          </button>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-[11px] font-bold tracking-wider text-[#00D4B2] uppercase border border-white/15 shadow-sm">
                <BankIcon className="w-3.5 h-3.5 text-[#00D4B2]" />
                <span>{t('heroBadge')}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5.5xl font-sans font-semibold tracking-tight text-white leading-[1.12]">{t('heroTitle')}</h1>
              <p className="text-base sm:text-lg text-blue-100/90 max-w-xl font-normal leading-relaxed">{t('heroDesc')}</p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button onClick={onOpenSandbox} className="bg-white hover:bg-teal-50 text-[#0F2256] font-semibold text-sm px-7 py-3.5 rounded-full transition flex items-center justify-center gap-2 shadow-lg shadow-blue-950/20" id="hero-demo-btn">
                  <span>{t('getDemo')}</span>
                  <ArrowRight className="w-4 h-4 text-[#0F2256]" />
                </button>
                <button onClick={onOpenSandbox} className="border border-white/20 hover:bg-white/10 text-white font-semibold text-sm px-7 py-3.5 rounded-full transition flex items-center justify-center gap-1" id="hero-sandbox-btn">
                  <span>{t('trySandbox')}</span>
                </button>
              </div>
            </div>
            <div className="lg:col-span-5" id="interactive-terminal">
              <div className="bg-[#050D24] rounded-2xl border border-blue-900/40 p-5 shadow-[0_20px_50px_rgba(15,34,86,0.5)] relative overflow-hidden text-slate-200 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-blue-950 pb-3 mb-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="text-[10px] text-slate-500 ml-2">{t('terminalName')}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-[#00D4B2] bg-[#00D4B2]/10 px-2 py-0.5 rounded-md border border-[#00D4B2]/20 font-semibold">
                    <Activity className="w-3 h-3 text-[#00D4B2]" />
                    <span>{t('secureEngine')}</span>
                  </div>
                </div>
                {!isSimulating ? (
                  <div className="space-y-4 font-sans">
                    <p className="text-slate-400 text-xs font-mono">{t('simulatorPrompt')}</p>
                    <div className="grid grid-cols-1 gap-2">
                      {scenarioOrder.map((key) => {
                        const scenario = translations.scenarios[key];
                        return (
                          <button key={key} onClick={() => startSimulator(key)} className="p-3 text-left bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 rounded-xl transition flex items-center justify-between" id={'scenario-' + key}>
                            <div>
                              <p className={['text-xs font-semibold', scenarioTitleTone[key]].join(' ')}>{scenario.buttonTitle}</p>
                              <p className="text-[10px] text-slate-400 mt-0.5">{scenario.buttonDesc}</p>
                            </div>
                            <Play className={['w-4 h-4', scenarioIconTone[key]].join(' ')} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-slate-950/60 p-3 rounded-xl border border-blue-950">
                      <div>
                        <h4 className="text-xs font-bold text-white font-sans">{activeScenario.name}</h4>
                        <p className="text-[10px] text-slate-500 font-sans mt-0.5">{activeScenario.type} {activeScenario.amount}</p>
                      </div>
                      <span className={['text-[10px] font-sans px-2.5 py-0.5 rounded-full font-bold border', statusTone[activeScenario.status]].join(' ')}>{translations.statusLabels[activeScenario.status]}</span>
                    </div>
                    <div className="space-y-1.5 min-h-[160px] max-h-[180px] overflow-y-auto pr-1">
                      {simulationLogs.map((log, idx) => (
                        <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }} key={idx} className="flex items-start gap-2 text-[10px]">
                          <span className="text-blue-400 font-bold mt-0.5 select-none">{t('consolePrompt')}</span>
                          <span className={idx === simulationLogs.length - 1 ? 'text-white font-semibold' : 'text-slate-400'}>{log}</span>
                        </motion.div>
                      ))}
                    </div>
                    {simStep < translations.simulatorLogs.length ? (
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 pt-2 border-t border-slate-900">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-400" />
                        <span>{t('queryRegisters')}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2 pt-2 border-t border-slate-900 font-sans">
                        <div className="text-xs text-white font-semibold mb-1">{t('decisionBreakdown')}</div>
                        <ul className="space-y-1 text-[10px] text-slate-300 font-mono">
                          {activeScenario.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-1.5"><span className="text-emerald-500">{t('consolePrompt')}</span><span>{detail}</span></li>
                          ))}
                        </ul>
                        <button onClick={resetSimulator} className="mt-2 w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-2 rounded-lg transition" id="reset-sim-btn">{t('selectAnotherScenario')}</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-slate-100 py-10"><div className="max-w-7xl mx-auto px-6 text-center"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">{t('trustedBy')}</p><div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60">{translations.logos.map((logo, index) => { const LogoIcon = logoIcons[index]; return <div key={logo} className="flex items-center gap-2 text-slate-800 font-bold font-sans text-sm tracking-tight"><LogoIcon className="w-4.5 h-4.5 text-slate-500" /><span>{logo}</span></div>; })}</div></div></section>

      <section className="py-20 bg-[#FAFBFD]"><div className="max-w-7xl mx-auto px-6"><div className="text-center max-w-3xl mx-auto space-y-4 mb-16"><h2 className="text-2xl md:text-3.5xl font-sans font-bold text-[#0F2256] tracking-tight">{t('lifecycleTitle')}</h2><p className="text-slate-500 text-sm md:text-base leading-relaxed">{t('lifecycleDesc')}</p><div className="flex flex-wrap justify-center gap-2 pt-4">{tabOrder.map((tab) => <button key={tab} onClick={() => setActiveTab(tab)} className={['px-5 py-2.5 rounded-full text-xs font-semibold transition', activeTab === tab ? 'bg-[#354CE1] text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/60'].join(' ')} id={'tab-' + tab}>{translations.tabs[tab].label}</button>)}</div></div><AnimatePresence mode="wait"><motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="bg-white rounded-3xl border border-slate-150 p-8 md:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="tab-panel-content"><div className="lg:col-span-6 space-y-6"><div className={['w-10 h-10 rounded-xl flex items-center justify-center', tabIconTone[activeTab]].join(' ')}><ActiveTabIcon className="w-5 h-5" /></div><h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">{activeTabData.title}</h3><p className="text-slate-600 text-sm leading-relaxed font-normal">{activeTabData.desc}</p><ul className="space-y-3">{activeTabData.bullets.map((item) => <li key={item} className="flex items-center gap-3 text-xs text-slate-700"><Check className="w-4 h-4 text-emerald-500 shrink-0" /><span>{item}</span></li>)}</ul></div><div className="lg:col-span-6"><div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/50 space-y-4">{activeTab === 'kyc' ? activeTabData.cards.map((card, index) => <div key={card.title} className="bg-white p-4 rounded-xl border border-slate-150 flex items-center justify-between shadow-xs"><div className="flex items-center gap-3"><div className={['w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs', index === 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-[#354CE1]'].join(' ')}>{card.badge === 'user' ? <Users className="w-4 h-4" /> : card.badge}</div><div><p className="text-xs font-bold text-slate-900">{card.title}</p><p className="text-[10px] text-slate-400">{card.desc}</p></div></div><span className={['text-[10px] font-semibold px-2 py-0.5 rounded-full', index === 0 ? 'text-emerald-600 bg-emerald-50' : 'text-indigo-600 bg-indigo-50'].join(' ')}>{card.status}</span></div>) : <div className="bg-white p-4 rounded-xl border border-slate-150 space-y-3 shadow-xs"><div className="flex items-center justify-between border-b border-slate-100 pb-2"><span className="text-xs font-bold text-slate-800">{activeTabData.panelTitle}</span><span className="text-[9px] font-semibold text-indigo-600">{activeTabData.panelStatus}</span></div><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{activeTabData.cards.map((card) => <div key={card.title} className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex justify-between sm:block gap-3"><span className="text-[10px] text-slate-400 block">{card.title}</span><span className="text-xs font-bold text-emerald-600">{card.status}</span></div>)}</div></div>}</div></div></motion.div></AnimatePresence></div></section>

      <section className="py-20 bg-white border-t border-b border-slate-100"><div className="max-w-7xl mx-auto px-6"><div className="text-center max-w-3xl mx-auto space-y-4 mb-16"><h2 className="text-2xl md:text-3.5xl font-sans font-bold text-[#0F2256] tracking-tight">{t('featuresTitle')}</h2><p className="text-slate-500 text-sm md:text-base leading-relaxed">{t('featuresDesc')}</p></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{translations.featureCards.map((card, index) => { const FeatureIcon = featureIcons[index]; return <div key={card.id} className="bg-white rounded-2xl border border-slate-150 p-6 hover:shadow-md transition duration-200 flex flex-col justify-between h-full" id={card.id}><div className="space-y-4"><div className={['w-10 h-10 rounded-xl flex items-center justify-center', featureTones[index]].join(' ')}><FeatureIcon className="w-5 h-5" /></div><h3 className="text-base font-bold text-slate-900">{card.title}</h3><p className="text-slate-500 text-xs leading-relaxed font-normal">{card.desc}</p></div></div>; })}</div></div></section>

      <section className="py-20 bg-[#FAFBFD]" id="demo-form-section"><div className="max-w-7xl mx-auto px-6"><div className="bg-white rounded-[2rem] border border-slate-150 overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-0"><div className="lg:col-span-5 bg-gradient-to-br from-[#0F2256] to-[#1D3E9E] p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden"><div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_60%)]" /><div className="relative z-10 space-y-4"><div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold text-[#00D4B2] border border-white/10"><Sparkles className="w-3 h-3 text-[#00D4B2]" /><span>{t('tailoredDemo')}</span></div><h3 className="text-xl md:text-2xl font-bold tracking-tight">{t('demoTitle')}</h3><p className="text-xs text-blue-100/80 leading-relaxed font-normal">{t('demoDesc')}</p></div><div className="my-8 relative bg-white/5 border border-white/10 rounded-xl p-4 space-y-3 backdrop-blur-md"><div className="flex items-center justify-between border-b border-white/10 pb-2"><span className="text-[10px] text-blue-200">{t('portalVersion')}</span><div className="flex items-center gap-1 text-[9px] text-[#00D4B2]"><span className="w-1.5 h-1.5 rounded-full bg-[#00D4B2] animate-ping" /><span>{t('online')}</span></div></div><div className="space-y-1.5"><div className="flex items-center justify-between bg-white/5 p-2 rounded text-[10px]"><span className="text-slate-300">{t('biometricsMatch')}</span><span className="text-emerald-400 font-semibold flex items-center gap-1"><Check className="w-3 h-3" />{t('approved')}</span></div><div className="flex items-center justify-between bg-white/5 p-2 rounded text-[10px]"><span className="text-slate-300">{t('sanctionRegisters')}</span><span className="text-emerald-400 font-semibold flex items-center gap-1"><Check className="w-3 h-3" />{t('clear')}</span></div></div></div><div className="text-[10px] text-blue-200/60 leading-relaxed font-normal">{t('demoPrivacy')}</div></div><div className="lg:col-span-7 p-8 md:p-12">{!demoRequested ? <form onSubmit={handleDemoSubmit} className="space-y-6"><div className="space-y-1"><h3 className="text-lg font-bold text-slate-900">{t('formTitle')}</h3><p className="text-xs text-slate-500">{t('formDesc')}</p></div><div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><InputField label={t('firstName')} requiredMark={t('requiredMark')} value={firstName} onChange={setFirstName} placeholder={t('firstNamePlaceholder')} id="form-fname" required /><InputField label={t('lastName')} requiredMark={t('requiredMark')} value={lastName} onChange={setLastName} placeholder={t('lastNamePlaceholder')} id="form-lname" required /></div><InputField label={t('businessEmail')} requiredMark={t('requiredMark')} value={email} onChange={setEmail} placeholder={t('emailPlaceholder')} id="form-email" type="email" required /><div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><InputField label={t('companyName')} requiredMark={t('requiredMark')} value={companyName} onChange={setCompanyName} placeholder={t('companyPlaceholder')} id="form-company" required /><InputField label={t('websiteUrl')} requiredMark={t('requiredMark')} value={website} onChange={setWebsite} placeholder={t('websitePlaceholder')} id="form-website" type="url" /></div><InputField label={t('jobTitle')} requiredMark={t('requiredMark')} value={jobTitle} onChange={setJobTitle} placeholder={t('jobTitlePlaceholder')} id="form-jobtitle" /><button type="submit" className="w-full bg-[#354CE1] hover:bg-[#2539BE] text-white font-semibold text-xs py-3.5 rounded-xl shadow transition flex items-center justify-center gap-1.5" id="form-submit-btn"><span>{t('viewDemo')}</span><ArrowRight className="w-3.5 h-3.5" /></button></form> : <div className="text-center py-16 space-y-4" id="form-success-panel"><div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto"><CheckCircle2 className="w-6 h-6" /></div><h3 className="text-lg font-bold text-slate-900">{t('successTitle')}</h3><p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">{format(t('successDesc'), { firstName, companyName })}</p><div className="pt-4"><button onClick={onOpenSandbox} className="inline-flex items-center gap-1.5 bg-[#354CE1] hover:bg-[#2539BE] text-white font-semibold text-xs px-6 py-3 rounded-full shadow transition" id="success-sandbox-btn"><span>{t('openSandbox')}</span><ArrowRight className="w-3.5 h-3.5" /></button></div></div>}</div></div></div></section>

      <section className="py-16 bg-white border-t border-b border-slate-100"><div className="max-w-4xl mx-auto px-6 text-center space-y-6"><div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-[10px] font-bold text-slate-500"><Shield className="w-3.5 h-3.5 text-slate-400" /><span>{t('complianceAssured')}</span></div><h2 className="text-2xl font-bold text-slate-900">{t('securityTitle')}</h2><p className="text-slate-600 text-sm leading-relaxed max-w-2xl mx-auto font-normal">{t('securityDesc')}</p><div className="pt-2"><button onClick={() => onViewChange?.('security')} className="text-xs font-semibold text-[#354CE1] hover:text-[#2539BE] inline-flex items-center gap-1 group" id="learn-security-btn"><span>{t('learnSecurity')}</span><ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" /></button></div></div></section>

      <section className="py-20 bg-[#FAFBFD]" id="explore-suite-section"><div className="max-w-7xl mx-auto px-6"><h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center mb-12">{t('exploreTitle')}</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-8">{translations.exploreCards.map((card, index) => { const ExploreIcon = exploreIcons[index]; const view = index === 0 ? 'compliance' : 'business-fraud'; return <div key={card.title} className="bg-white rounded-2xl border border-slate-150 p-8 hover:shadow-md transition flex flex-col justify-between h-full group"><div className="space-y-4"><div className={['w-10 h-10 rounded-xl flex items-center justify-center', exploreTone[index]].join(' ')}><ExploreIcon className="w-5 h-5" /></div><h3 className="text-lg font-bold text-slate-900">{card.title}</h3><p className="text-slate-500 text-xs leading-relaxed font-normal">{card.desc}</p></div><div className="pt-6"><button onClick={() => onViewChange?.(view)} className="text-xs font-semibold text-[#354CE1] group-hover:text-[#2539BE] inline-flex items-center gap-1.5" id={index === 0 ? 'explore-compliance-btn' : 'explore-fraud-btn'}><span>{card.button}</span><ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" /></button></div></div>; })}</div></div></section>
    </div>
  );
}

interface InputFieldProps { label: string; requiredMark: string; value: string; onChange: (value: string) => void; placeholder: string; id: string; type?: string; required?: boolean; }
function InputField({ label, requiredMark, value, onChange, placeholder, id, type = 'text', required = false }: InputFieldProps) {
  return <div className="space-y-1.5"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider"><span>{label}</span>{required && <span className="text-red-500"> {requiredMark}</span>}</label><input type={type} required={required} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#354CE1]/20 focus:border-[#354CE1] outline-none transition" id={id} /></div>;
}
