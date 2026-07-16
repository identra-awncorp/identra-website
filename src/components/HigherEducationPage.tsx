/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState } from 'react';
import {
  GraduationCap, ArrowRight, Check, ShieldCheck, ArrowLeft, RefreshCw,
  Layers, CheckCircle2, Shield, ChevronRight, UserCheck, FileText, Database,
  Workflow, CheckSquare, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { HIGHER_EDUCATION_PAGE_TRANSLATIONS } from '../translations/HigherEducationPageTranslations';

interface HigherEducationPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

type ScenarioKey = 'alex' | 'priya' | 'fraud';

const scenarioKeys: ScenarioKey[] = ['alex', 'priya', 'fraud'];
const featureIcons = [Layers, Workflow, UserCheck, CheckSquare, FileText, Database];

export default function HigherEducationPage({ onOpenSandbox, onBackToLanding, onViewChange }: HigherEducationPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(HIGHER_EDUCATION_PAGE_TRANSLATIONS, language as keyof typeof HIGHER_EDUCATION_PAGE_TRANSLATIONS, 'HIGHER_EDUCATION_PAGE_TRANSLATIONS');

  const [activeScenario, setActiveScenario] = useState<ScenarioKey>('alex');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyStep, setVerifyStep] = useState(0);
  const [showComplianceModal, setShowComplianceModal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const activeStudent = t.scenarios[activeScenario];

  const verificationSteps = React.useMemo(() => [
    t.logs.step1,
    `${t.logs.idAnalyzer} ${t.labels.name}: ${activeStudent.name}, ${t.labels.role}: ${activeStudent.role}.`,
    t.logs.step2,
    `${t.logs.liveness} ${activeStudent.livenessChecked ? t.logs.livenessPassed : t.logs.livenessFailed}.`,
    t.logs.step3,
    `${t.logs.registry} ${activeStudent.databaseVerified ? t.logs.confirmed : t.logs.mismatch}.`,
    t.logs.step4,
    `${t.logs.risk} ${activeStudent.riskRating}. ${t.logs.final} ${activeStudent.status}.`
  ], [activeStudent, t]);
  const verifyLogs = verificationSteps.slice(0, verifyStep);

  const startVerificationSimulator = (key: ScenarioKey) => {
    setActiveScenario(key);
    setIsVerifying(true);
    setVerifyStep(0);

    let current = 0;
    const interval = setInterval(() => {
      setVerifyStep(current + 1);
      current++;
      if (current >= verificationSteps.length) clearInterval(interval);
    }, 850);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !institution) {
      alert(t.requiredAlert);
      return;
    }
    setIsFormSubmitted(true);
  };

  const statusColor =
    activeStudent.statusKey === 'approve'
      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
      : activeStudent.statusKey === 'review'
        ? 'bg-amber-50 text-amber-700 border border-amber-200'
        : 'bg-rose-50 text-rose-700 border border-rose-200';

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 selection:bg-blue-600/10 selection:text-blue-600">
      <div className="max-w-7xl mx-auto px-4 pt-6 md:px-8">
        <button
          onClick={onBackToLanding}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition group"
          id="higher_education_back_button"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          {t.backToSolutions}
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:px-8">
        <div className="bg-blue-600 text-white rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-xl" id="higher_education_hero_banner">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-30 -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500 rounded-full blur-3xl opacity-20 -ml-20 -mb-20" />

          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 tracking-wide uppercase">
            <GraduationCap className="w-4 h-4 text-blue-200" />
            <span>{t.badge}</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight max-w-5xl leading-[1.15] mb-8">
            {t.heroTitleStart}{' '}
            <span className="font-medium underline decoration-blue-300 decoration-wavy underline-offset-4">{t.heroFraud}</span>
            {' '}{t.heroTitleEnd}
          </h1>

          <div className="mb-16">
            <button
              onClick={() => document.getElementById('demo-form-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-slate-50 font-medium px-6 py-3.5 rounded-full transition shadow-md hover:shadow-lg active:scale-95 duration-200"
              id="higher_education_hero_cta"
            >
              {t.getDemo}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/20 relative z-10 text-left">
            {t.pillars.map((pillar) => (
              <div key={pillar.title}>
                <h3 className="font-semibold text-lg text-white mb-2">{pillar.title}</h3>
                <p className="text-blue-100 text-sm leading-relaxed font-light">{pillar.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-blue-200">
            <span className="font-light tracking-wider uppercase">{t.trustedBy}</span>
            <div className="flex flex-wrap items-center gap-6 md:gap-10 opacity-80">
              {t.universities.map((university, index) => (
                <React.Fragment key={university}>
                  {index > 0 && <div className="h-4 w-px bg-white/20 hidden sm:block" />}
                  <span className="font-bold tracking-wide text-xs text-white">{university}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 md:px-8 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-slate-900 max-w-4xl leading-tight">
          {t.mainHeadline}
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-12">
            {t.steps.map((step, index) => (
              <div key={step.step} className={`${index === 0 ? 'border-blue-500' : 'border-slate-200 hover:border-blue-300'} border-l-2 pl-6 space-y-3 transition duration-300`}>
                <span className={`text-xs font-semibold ${index === 0 ? 'text-blue-600' : 'text-slate-400'} uppercase tracking-widest block`}>
                  {step.step}
                </span>
                <h3 className={`text-xl md:text-2xl font-semibold ${index === 0 ? 'text-slate-900' : 'text-slate-800'}`}>{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}

            <div className="bg-slate-100/80 p-5 rounded-2xl border border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                {t.simulatorCalloutTitle}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">{t.simulatorCalloutDesc}</p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <h4 className="font-semibold text-slate-900 text-sm">{t.panelTitle}</h4>
                <p className="text-xs text-slate-500">{t.panelDesc}</p>
              </div>
              <div className="flex gap-2">
                {scenarioKeys.map((key) => (
                  <button
                    key={key}
                    onClick={() => startVerificationSimulator(key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      activeScenario === key && isVerifying
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {t.scenarios[key].firstName}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <div className="space-y-6">
                <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100">
                  <span className="text-[11px] font-bold tracking-wider text-blue-800 uppercase block mb-3">{t.checksTitle}</span>
                  <ul className="space-y-3 text-xs text-slate-700">
                    <li className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-blue-600 bg-white rounded-full p-0.5 border border-blue-200" />
                        {t.accountComparison}
                      </span>
                      <span className="font-mono text-[10px] text-blue-600 font-bold">{t.passed}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Check className={`w-4 h-4 rounded-full p-0.5 border ${
                          isVerifying && verifyStep >= 2 && activeStudent.livenessChecked
                            ? 'text-green-600 bg-white border-green-200'
                            : isVerifying && verifyStep >= 2 && !activeStudent.livenessChecked
                              ? 'text-red-500 bg-white border-red-200'
                              : 'text-slate-400 bg-white border-slate-200'
                        }`} />
                        {t.selfieLiveness}
                      </span>
                      <span className="font-mono text-[10px] text-slate-500">
                        {isVerifying && verifyStep >= 2 ? (activeStudent.livenessChecked ? t.passed : t.failed) : t.pending}
                      </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Check className={`w-4 h-4 rounded-full p-0.5 border ${
                          isVerifying && verifyStep >= 3 && activeStudent.databaseVerified
                            ? 'text-green-600 bg-white border-green-200'
                            : isVerifying && verifyStep >= 3 && !activeStudent.databaseVerified
                              ? 'text-red-500 bg-white border-red-200'
                              : 'text-slate-400 bg-white border-slate-200'
                        }`} />
                        {t.databaseRegistryMatch}
                      </span>
                      <span className="font-mono text-[10px] text-slate-500">
                        {isVerifying && verifyStep >= 3 ? (activeStudent.databaseVerified ? t.matched : t.unverified) : t.pending}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center gap-4">
                  <img
                    src={activeStudent.avatarUrl}
                    alt={activeStudent.name}
                    className="w-12 h-12 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h5 className="font-semibold text-slate-900 text-xs">{activeStudent.name}</h5>
                    <p className="text-[10px] text-slate-500">{activeStudent.role}</p>
                    <div className="mt-1">
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-medium uppercase tracking-wider ${statusColor}`}>
                        {activeStudent.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 text-slate-300 rounded-2xl p-4 font-mono text-[11px] flex flex-col justify-between min-h-[180px] shadow-inner">
                <div className="space-y-2 max-h-[160px] overflow-y-auto">
                  <div className="text-[10px] text-slate-500 border-b border-slate-800 pb-1 mb-2 flex justify-between">
                    <span>{t.engineLogs}</span>
                    <span className="animate-pulse text-emerald-400">● {t.live}</span>
                  </div>
                  {isVerifying ? (
                    verifyLogs.map((log, index) => (
                      <div key={index} className="leading-relaxed">{log}</div>
                    ))
                  ) : (
                    <div className="text-slate-500 italic py-6 text-center">{t.idleLog}</div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-900 mt-2 flex justify-between items-center">
                  <button
                    onClick={() => startVerificationSimulator(activeScenario)}
                    className="text-[10px] bg-blue-600 hover:bg-blue-500 text-white font-semibold py-1 px-3 rounded transition flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    {t.triggerCheck}
                  </button>
                  {isVerifying && verifyStep >= 8 && (
                    <span className={`text-[10px] font-bold ${
                      activeStudent.statusKey === 'approve' ? 'text-emerald-400' :
                        activeStudent.statusKey === 'review' ? 'text-amber-400' : 'text-rose-400'
                    }`}>
                      {t.result} {activeStudent.status}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100 bg-slate-50/50 p-4 rounded-xl">
              <span className="text-xs font-bold text-slate-700 block mb-2">{t.diagnostics}</span>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-600">
                {activeStudent.notes.map((note, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 md:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl md:text-3xl font-semibold text-slate-900">{t.featuresTitle}</h3>
            <p className="text-slate-500 text-sm mt-2">{t.featuresDesc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.features.map((feature, index) => {
              const Icon = featureIcons[index] || Layers;
              return (
                <div key={feature.title} className="p-6 rounded-2xl border border-slate-100 hover:border-blue-500/20 hover:bg-slate-50/50 transition group">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-slate-900 text-base mb-2">{feature.title}</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:px-8">
        <div className="bg-sky-100 border border-sky-200 rounded-[2rem] p-8 md:p-12 text-center max-w-4xl mx-auto shadow-sm">
          <div className="inline-flex p-3 bg-white rounded-full text-blue-600 mb-6 shadow-sm">
            <Shield className="w-8 h-8" />
          </div>
          <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-4">{t.securityTitle}</h3>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-8 font-light">{t.securityDesc}</p>
          <button
            onClick={() => setShowComplianceModal(true)}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium px-6 py-3 rounded-full transition shadow-sm"
          >
            {t.learnMore}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showComplianceModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-xl max-w-xl w-full overflow-hidden p-6 md:p-8"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  <h4 className="font-bold text-slate-900">{t.modalTitle}</h4>
                </div>
                <button
                  onClick={() => setShowComplianceModal(false)}
                  className="text-xs text-slate-400 hover:text-slate-600 bg-slate-100 px-2 py-1 rounded"
                >
                  {t.close}
                </button>
              </div>

              <div className="py-6 space-y-4 text-xs text-slate-600 leading-relaxed">
                <p>{t.modalIntro}</p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  {t.complianceCards.map((card) => (
                    <div key={card.title} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="font-semibold text-slate-900 block mb-1">{card.title}</span>
                      <span>{card.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setShowComplianceModal(false)}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-4 py-2 rounded-lg"
                >
                  {t.acknowledge}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 py-16 md:px-8">
        <h3 className="text-xl md:text-2xl font-semibold text-slate-900 text-center mb-8">{t.exploreTitle}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {t.exploreCards.map((card, index) => (
            <div
              key={card.title}
              onClick={index === 0 ? onOpenSandbox : () => onViewChange?.('e-learning')}
              className={`${index === 0 ? 'bg-indigo-600' : 'bg-blue-500'} text-white p-8 rounded-3xl cursor-pointer hover:shadow-lg hover:-translate-y-1 transition duration-300 flex flex-col justify-between min-h-[160px] group`}
            >
              <h4 className="text-xl font-medium tracking-tight">{card.title}</h4>
              <div className={`flex items-center gap-1.5 text-xs ${index === 0 ? 'text-indigo-200' : 'text-blue-100'} mt-4 font-semibold`}>
                <span>{card.cta}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:px-8" id="demo-form-section">
        <div className="bg-violet-100 rounded-[2.5rem] p-8 md:p-12 lg:p-16 max-w-4xl mx-auto border border-violet-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 space-y-4">
              <h3 className="text-3xl font-light tracking-tight text-slate-900">{t.readyTitle}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{t.readyDesc}</p>
              <div className="flex flex-col gap-2 pt-2 text-xs font-semibold text-slate-700">
                {t.readyBullets.map((bullet) => (
                  <span key={bullet} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-violet-700" />
                    {bullet}
                  </span>
                ))}
              </div>
            </div>

            <div className="md:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <AnimatePresence mode="wait">
                {!isFormSubmitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleFormSubmit}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">{t.firstNameLabel}</label>
                        <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder={t.firstNamePlaceholder} className="w-full text-xs border border-slate-200 rounded-lg p-2.5 outline-none focus:border-violet-500 transition" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">{t.lastNameLabel}</label>
                        <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder={t.lastNamePlaceholder} className="w-full text-xs border border-slate-200 rounded-lg p-2.5 outline-none focus:border-violet-500 transition" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">{t.institutionLabel}</label>
                      <input type="text" required value={institution} onChange={(e) => setInstitution(e.target.value)} placeholder={t.institutionPlaceholder} className="w-full text-xs border border-slate-200 rounded-lg p-2.5 outline-none focus:border-violet-500 transition" />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">{t.emailLabel}</label>
                      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.emailPlaceholder} className="w-full text-xs border border-slate-200 rounded-lg p-2.5 outline-none focus:border-violet-500 transition" />
                    </div>

                    <button type="submit" className="w-full bg-violet-700 hover:bg-violet-600 text-white font-medium py-3 rounded-xl transition text-xs shadow-sm hover:shadow active:scale-[0.99] duration-150">
                      {t.requestAccess}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8 space-y-3">
                    <div className="inline-flex p-3 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">{t.successTitle}</h4>
                    <p className="text-slate-500 text-xs max-w-sm mx-auto leading-relaxed">
                      {t.successThanks} {firstName}! {t.successRegistered} {institution}. {t.successContact} <strong>{email}</strong> {t.successTiming}
                    </p>
                    <button
                      onClick={() => {
                        setIsFormSubmitted(false);
                        setFirstName('');
                        setLastName('');
                        setEmail('');
                        setInstitution('');
                      }}
                      className="text-xs text-violet-600 hover:underline pt-2 font-semibold block mx-auto"
                    >
                      {t.submitAnother}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
