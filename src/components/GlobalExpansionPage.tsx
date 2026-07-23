/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Clipboard,
  Clock,
  Database,
  ExternalLink,
  Globe,
  Landmark,
  Network,
  Radio,
  Shield,
  ShieldCheck,
  ShoppingBag,
  UserCheck
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import {
  GLOBAL_EXPANSION_TRANSLATIONS,
  type GlobalExpansionHubKey,
  type GlobalExpansionRegionKey,
  type GlobalExpansionScenarioKey,
  type GlobalExpansionTextKey
} from '../translations/GlobalExpansionPageTranslations';

interface GlobalExpansionPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

type ViewName = Parameters<NonNullable<GlobalExpansionPageProps['onViewChange']>>[0];

const scenarioOrder: GlobalExpansionScenarioKey[] = ['eu', 'latam', 'apac', 'na'];
const regionOrder: GlobalExpansionRegionKey[] = ['EU', 'LATAM', 'APAC', 'NA'];

const iconMap = {
  database: Database,
  network: Network,
  clipboard: Clipboard,
  shield: Shield,
  userCheck: UserCheck,
  radio: Radio,
  landmark: Landmark,
  shieldCheck: ShieldCheck,
  shoppingBag: ShoppingBag
};

const format = (template: string, values: Record<string, string>) =>
  Object.entries(values).reduce((result, [key, value]) => result.replaceAll(`{${key}}`, value), template);

export default function GlobalExpansionPage({ onOpenSandbox, onBackToLanding, onViewChange }: GlobalExpansionPageProps) {
  const { language } = useLanguage();
  const translations = getLocalizedRecord(GLOBAL_EXPANSION_TRANSLATIONS, language as keyof typeof GLOBAL_EXPANSION_TRANSLATIONS, 'GLOBAL_EXPANSION_TRANSLATIONS');
  const t = (key: GlobalExpansionTextKey) => translations[key];
  const locale = { en: 'en-US', es: 'es-ES', ja: 'ja-JP', de: 'de-DE', vi: 'vi-VN' }[language] || 'en-US';

  const [hubTimes, setHubTimes] = useState<Record<GlobalExpansionHubKey, string>>({} as Record<GlobalExpansionHubKey, string>);
  const [selectedHub, setSelectedHub] = useState<GlobalExpansionHubKey>('london');
  const [activeFlowScenario, setActiveFlowScenario] = useState<GlobalExpansionScenarioKey>('eu');
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    website: '',
    company: '',
    jobTitle: '',
    region: 'EU' as GlobalExpansionRegionKey
  });
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const statusId = useMemo(() => Math.floor(Math.random() * 90000) + 10000, []);

  useEffect(() => {
    const updateTimes = () => {
      const times = {} as Record<GlobalExpansionHubKey, string>;

      translations.hubs.forEach((hub) => {
        try {
          times[hub.key] = new Intl.DateTimeFormat(locale, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: hub.tz
          }).format(new Date());
        } catch {
          times[hub.key] = t('defaultTime');
        }
      });

      setHubTimes(times);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, [locale, translations.hubs]);

  const startConsoleSimulation = (selectedRegion: GlobalExpansionRegionKey) => {
    setIsSimulating(true);
    setConsoleLogs([]);

    const targetLogs = translations.consoleLogs[selectedRegion].map((log) =>
      format(log, { company: formData.company || translations.placeholders.company })
    );

    let index = 0;
    const interval = setInterval(() => {
      if (index < targetLogs.length) {
        setConsoleLogs((prev) => [...prev, targetLogs[index]]);
        index++;
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 900);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.firstName || !formData.email || !formData.company) {
      alert(t('requiredAlert'));
      return;
    }

    setDemoSubmitted(true);
    startConsoleSimulation(formData.region);
  };

  const selectedHubData = translations.hubs.find((hub) => hub.key === selectedHub) || translations.hubs[0];
  const activeScenario = translations.scenarios[activeFlowScenario];

  const openView = (view: ViewName) => {
    onViewChange?.(view);
  };

  return (
    <div className="min-h-screen bg-[#FAFBFD] pb-12">
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1E43D8] to-[#142FA0] text-white pt-20 pb-32 px-6 sm:px-12 md:px-20 lg:px-32 xl:px-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <button onClick={onBackToLanding} className="group mb-12 flex items-center gap-2 text-sm text-blue-200 hover:text-white transition cursor-pointer">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{t('backToPlatform')}</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/25 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase text-blue-100">
                <Globe className="w-4 h-4 text-blue-200 animate-spin-slow" />
                <span>{t('heroBadge')}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-display font-semibold tracking-tight leading-tight">
                {t('heroTitle')}
              </h1>

              <p className="text-lg text-blue-100/90 leading-relaxed font-sans max-w-2xl">
                {t('heroDesc')}
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => document.getElementById('demo-form-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-3 rounded-full bg-white text-[#142FA0] font-semibold text-sm hover:bg-blue-50 transition flex items-center gap-2 shadow-lg"
                >
                  <span>{t('tryDemo')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={onOpenSandbox} className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition">
                  {t('exploreSandbox')}
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/15 rounded-3xl p-6 shadow-2xl relative">
                <div className="absolute top-3 right-3 flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-300" />
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-blue-300" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-200">{t('hubMonitor')}</span>
                </div>

                <div className="grid grid-cols-5 gap-1 mb-6">
                  {translations.hubs.map((hub) => (
                    <button
                      key={hub.key}
                      onClick={() => setSelectedHub(hub.key)}
                      className={`py-1.5 px-1 rounded-lg text-[10px] font-bold tracking-wide uppercase transition ${
                        selectedHub === hub.key ? 'bg-white text-[#142FA0] shadow-md' : 'bg-white/5 text-blue-200 hover:bg-white/10'
                      }`}
                    >
                      {hub.tab}
                    </button>
                  ))}
                </div>

                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-bold tracking-wide">{selectedHubData.city}</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-white/10 text-emerald-300 font-semibold uppercase tracking-wide">
                      {selectedHubData.status === 'optimal' ? t('statusOptimal') : t('statusStable')}
                    </span>
                  </div>

                  <div className="text-4xl sm:text-5xl font-mono font-bold tracking-widest text-center py-2 bg-black/20 rounded-2xl border border-white/5 shadow-inner">
                    {hubTimes[selectedHubData.key] || t('defaultTime')}
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/10 text-xs font-mono text-blue-200">
                    <div>
                      <p className="text-[10px] text-blue-300/70 uppercase">{t('registryLatency')}</p>
                      <p className="font-semibold text-white mt-0.5 text-sm">{selectedHubData.latency}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-blue-300/70 uppercase">{t('throughput')}</p>
                      <p className="font-semibold text-white mt-0.5 text-sm">{t('online')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0A1128] py-8 border-y border-slate-900 overflow-hidden px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-[11px] uppercase tracking-widest font-bold text-slate-500 text-center md:text-left">{t('trustedBy')}</span>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {translations.trustedLogos.map((logo) => (
              <span key={logo} className="text-sm font-sans font-extrabold text-slate-400 tracking-wider">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-24 px-6 md:px-12 grid grid-cols-1 gap-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{t('globalPipelineEyebrow')}</span>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight text-slate-900">{t('globalPipelineTitle')}</h2>
          </div>
          <div className="lg:col-span-7 space-y-6">
            <p className="text-slate-600 text-base leading-relaxed">{t('globalPipelineDesc')}</p>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
              <div className="flex flex-wrap gap-2 mb-6">
                {scenarioOrder.map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveFlowScenario(key)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition ${
                      activeFlowScenario === key ? 'bg-[#354CE1] text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {translations.scenarios[key].tab}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={activeFlowScenario} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="space-y-4 text-xs">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-slate-900">{activeScenario.title}</h4>
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-[#354CE1] font-bold text-[10px]">{activeScenario.badge}</span>
                  </div>

                  <p className="text-slate-500 leading-relaxed text-[11px]">{activeScenario.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200/60 font-mono">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase">{t('checklistLabel')}</p>
                      <ul className="mt-1.5 space-y-1 text-slate-700">
                        {activeScenario.requirements.map((req) => (
                          <li key={req} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col justify-between">
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase">{t('passRateLabel')}</p>
                        <p className="text-xl font-bold text-emerald-600 mt-1">{activeScenario.autoPassRate}</p>
                      </div>
                      <p className="text-[10px] text-slate-400 uppercase mt-2">
                        {t('riskRatingLabel')} <span className="text-slate-700 font-bold">{activeScenario.riskLevel}</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {translations.infoSections.map((section, index) => (
          <div key={section.title} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-slate-100 pt-16">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{t(section.eyebrow)}</span>
              <h2 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight text-slate-900">{t(section.title)}</h2>
            </div>
            <div className="lg:col-span-7 space-y-4">
              <p className="text-slate-600 text-base leading-relaxed">{t(section.desc)}</p>
              {index === 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 font-sans text-xs">
                  <InfoCard title={t('translationMappingTitle')} desc={t('translationMappingDesc')} />
                  <InfoCard title={t('screeningBlueprintsTitle')} desc={t('screeningBlueprintsDesc')} />
                </div>
              ) : (
                <div className="p-6 bg-[#FAFBFD] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center gap-6 justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest">{t('sdkFootprint')}</span>
                    <span className="text-sm font-bold text-slate-900 block">{t('deployOnce')}</span>
                    <p className="text-xs text-slate-500">{t('sdkDesc')}</p>
                  </div>
                  <button onClick={onOpenSandbox} className="px-4 py-2 bg-white hover:bg-slate-50 text-[#354CE1] border border-slate-200 font-semibold text-xs rounded-full transition shadow-xs whitespace-nowrap shrink-0 flex items-center gap-1.5">
                    <span>{t('launchFlowEditor')}</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </section>

      <section className="bg-slate-50 border-y border-slate-200/60 py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{t('libraryEyebrow')}</span>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight text-slate-900">{t('libraryTitle')}</h2>
            <p className="text-sm text-slate-500">{t('libraryDesc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {translations.gridItems.map((item, index) => {
              const IconComponent = iconMap[item.icon];
              const isHovered = hoveredCardIndex === index;

              return (
                <div key={item.title} onMouseEnter={() => setHoveredCardIndex(index)} onMouseLeave={() => setHoveredCardIndex(null)} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden group cursor-pointer">
                  <div className="absolute top-0 right-0 w-8 h-8 bg-blue-500/5 rounded-bl-full group-hover:bg-blue-500/10 transition-colors" />
                  <div className="flex items-start gap-4 h-full flex-col justify-between">
                    <div className="space-y-3 w-full">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#354CE1] transition-colors">{item.title}</h3>
                      <div className="relative min-h-[90px] text-xs">
                        <AnimatePresence mode="wait">
                          {!isHovered ? (
                            <motion.p key="desc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-slate-500 leading-relaxed absolute top-0 left-0 right-0">
                              {item.description}
                            </motion.p>
                          ) : (
                            <motion.div key="detail" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-blue-950 font-medium bg-blue-50/50 p-3 rounded-lg border border-blue-100/50 leading-relaxed absolute top-0 left-0 right-0">
                              <span className="font-bold text-[#354CE1] block mb-0.5 uppercase tracking-wider text-[9px]">{t('liveDetails')}</span>
                              {item.detail}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <div className="w-full pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400 group-hover:text-[#354CE1] transition-colors">
                      <span>{t('moduleActive')}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="demo-form-section" className="max-w-6xl mx-auto my-24 px-6">
        <div className="bg-white border border-slate-150 rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 p-8 flex flex-col justify-between text-white relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(53,76,225,0.15),transparent)] pointer-events-none" />
            <AnimatePresence mode="wait">
              {!demoSubmitted ? (
                <motion.div key="illus" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6 flex flex-col justify-between h-full min-h-[350px]">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-blue-400 uppercase">{t('setupSimulation')}</span>
                    <h3 className="text-xl font-bold">{t('consoleTitle')}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{t('consoleDesc')}</p>
                  </div>
                  <GlobeIllustration />
                  <div className="flex items-center gap-3 text-slate-400 text-[10px] font-mono">
                    <Shield className="w-4 h-4 text-[#354CE1]" />
                    <span>{t('metricsActive')}</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="console" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col justify-between h-full min-h-[420px] font-mono text-xs text-slate-300">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-rose-500 shrink-0" />
                        <span className="w-3 h-3 rounded-full bg-amber-400 shrink-0" />
                        <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
                      </div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{t('consoleName')}</span>
                    </div>

                    <div className="space-y-2 max-h-[290px] overflow-y-auto pr-1 text-[10px] leading-relaxed select-text scrollbar-thin">
                      {consoleLogs.map((log, idx) => {
                        const isSuccess = log.includes('✓') || log.includes('SUCCESS') || log.includes('COMPLIANT');
                        const isWarning = log.includes('↻') || log.includes('INITIALIZING');
                        return (
                          <div key={idx} className={`p-1.5 rounded-md ${isSuccess ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-900/30' : isWarning ? 'bg-blue-950/40 text-blue-300 border border-blue-900/30 font-bold' : 'text-slate-300'}`}>
                            {log}
                          </div>
                        );
                      })}
                      {isSimulating && (
                        <div className="flex items-center gap-2 text-slate-500 animate-pulse mt-1 pl-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#354CE1] animate-ping" />
                          <span>{t('streamingChecks')}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
                    <p className="text-[9px] text-slate-500 uppercase font-bold tracking-wider">{t('toggleRegion')}</p>
                    <div className="grid grid-cols-4 gap-1">
                      {regionOrder.map((reg) => (
                        <button
                          key={reg}
                          disabled={isSimulating}
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, region: reg }));
                            startConsoleSimulation(reg);
                          }}
                          className={`py-1 rounded text-[9px] font-bold tracking-widest transition ${formData.region === reg ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/10' : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-white disabled:opacity-50'}`}
                        >
                          {reg}
                        </button>
                      ))}
                    </div>
                    <button onClick={() => setDemoSubmitted(false)} className="mt-2 text-center text-slate-500 hover:text-white transition text-[10px] underline cursor-pointer">
                      {t('resetForm')}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center bg-white">
            <AnimatePresence mode="wait">
              {!demoSubmitted ? (
                <motion.div key="form-fields" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-slate-900">{t('formTitle')}</h3>
                    <p className="text-xs text-slate-500">{t('formDesc')}</p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-medium text-slate-700">
                    <div className="grid grid-cols-2 gap-4">
                      <InputField label={t('firstName')} value={formData.firstName} placeholder={translations.placeholders.firstName} required onChange={(value) => setFormData((prev) => ({ ...prev, firstName: value }))} />
                      <InputField label={t('lastName')} value={formData.lastName} placeholder={translations.placeholders.lastName} onChange={(value) => setFormData((prev) => ({ ...prev, lastName: value }))} />
                    </div>
                    <InputField label={t('workEmail')} value={formData.email} placeholder={translations.placeholders.email} type="email" required onChange={(value) => setFormData((prev) => ({ ...prev, email: value }))} />
                    <InputField label={t('companyWebsite')} value={formData.website} placeholder={translations.placeholders.website} onChange={(value) => setFormData((prev) => ({ ...prev, website: value }))} />
                    <InputField label={t('companyName')} value={formData.company} placeholder={translations.placeholders.company} required onChange={(value) => setFormData((prev) => ({ ...prev, company: value }))} />
                    <InputField label={t('jobTitle')} value={formData.jobTitle} placeholder={translations.placeholders.jobTitle} onChange={(value) => setFormData((prev) => ({ ...prev, jobTitle: value }))} />

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 uppercase tracking-wider block">{t('targetRegion')}</label>
                      <select value={formData.region} onChange={(event) => setFormData((prev) => ({ ...prev, region: event.target.value as GlobalExpansionRegionKey }))} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-[#354CE1] text-xs font-semibold">
                        {translations.regions.map((region) => (
                          <option key={region.value} value={region.value}>{region.label}</option>
                        ))}
                      </select>
                    </div>

                    <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-full transition flex items-center justify-center gap-2 mt-2 shadow cursor-pointer text-xs uppercase tracking-wider">
                      <span>{t('viewDemoConsole')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div key="form-success" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 text-center py-8">
                  <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500 shadow-inner">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900">{t('successTitle')}</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                      {t('successDescBeforeName')} <span className="font-bold text-slate-800">{formData.firstName}</span>{t('successNameSuffix')} {t('successDescAfterName')}
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl max-w-sm mx-auto text-left text-[11px] text-slate-500 space-y-1 font-mono">
                    <p><span className="text-slate-400">{t('summaryCompany')}</span> {formData.company}</p>
                    <p><span className="text-slate-400">{t('summaryRegion')}</span> {formData.region}</p>
                    <p><span className="text-slate-400">{t('summaryStatus')}</span> {t('statusPrefix')}{statusId}</p>
                  </div>
                  <div className="pt-4 flex flex-col gap-2 max-w-xs mx-auto">
                    <button onClick={onOpenSandbox} className="px-5 py-2.5 bg-[#354CE1] hover:bg-[#2539BE] text-white font-bold text-xs uppercase tracking-wider rounded-full transition shadow-md">{t('openSandbox')}</button>
                    <button onClick={() => setDemoSubmitted(false)} className="text-xs text-[#354CE1] hover:underline font-bold">{t('submitAnother')}</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto my-24 px-6 md:px-12 space-y-8">
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">{t('exploreTitle')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {translations.exploreCards.map((card, index) => (
            <div key={card.title} onClick={() => openView(card.view)} className={`group ${index === 0 ? 'bg-[#4C82FF] hover:bg-[#3B71EE] text-white' : 'bg-[#00D4B2] hover:bg-[#00C2A3] text-slate-950'} p-8 rounded-3xl cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-64 relative overflow-hidden`}>
              <div className={`absolute top-0 right-0 w-48 h-48 ${index === 0 ? 'bg-white/5' : 'bg-black/5'} rounded-full translate-x-12 -translate-y-12 pointer-events-none`} />
              <div className="space-y-2">
                <span className={`text-[10px] font-mono uppercase tracking-widest ${index === 0 ? 'text-blue-100' : 'text-emerald-950'} font-bold`}>{card.eyebrow}</span>
                <h4 className="text-xl sm:text-2xl font-display font-semibold tracking-tight max-w-xs leading-tight">{card.title}</h4>
              </div>
              <div className={`flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider font-semibold ${index === 0 ? 'text-blue-50' : 'text-emerald-950'} group-hover:gap-3 transition-all`}>
                <span>{card.cta}</span>
                <ArrowRight className={`w-4 h-4 ${index === 0 ? '' : 'text-emerald-950'}`} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="bg-[#E5E9FF] border border-blue-200/40 p-10 sm:p-14 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-sm">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(53,76,225,0.06),transparent)] pointer-events-none" />
          <div className="space-y-3 relative z-10 text-center md:text-left">
            <h3 className="text-3xl font-display font-bold text-[#0A1128] tracking-tight">{t('readyTitle')}</h3>
            <p className="text-slate-600 text-sm max-w-md font-medium">{t('readyDesc')}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 w-full sm:w-auto">
            <button onClick={onOpenSandbox} className="w-full sm:w-auto px-6 py-3 bg-white text-[#354CE1] hover:bg-slate-50 font-bold text-xs uppercase tracking-wider rounded-full shadow transition">{t('tryDemo')}</button>
            <button onClick={onOpenSandbox} className="w-full sm:w-auto px-6 py-3 border border-[#354CE1] text-[#354CE1] hover:bg-[#354CE1]/5 font-bold text-xs uppercase tracking-wider rounded-full transition flex items-center justify-center gap-1.5">
              <span>{t('tryItNow')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-xs">
      <span className="font-bold text-slate-900 block mb-1">{title}</span>
      <p className="text-slate-500 leading-normal">{desc}</p>
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, type = 'text', required = false }: { label: string; value: string; onChange: (value: string) => void; placeholder: string; type?: string; required?: boolean }) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] text-slate-500 uppercase tracking-wider block">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#354CE1] focus:ring-1 focus:ring-[#354CE1]"
      />
    </div>
  );
}

function GlobeIllustration() {
  return (
    <div className="relative py-4 flex items-center justify-center">
      <svg viewBox="0 0 400 300" className="w-full max-w-[280px] h-auto drop-shadow-2xl">
        <circle cx="200" cy="150" r="110" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="2" />
        <circle cx="200" cy="150" r="110" fill="none" stroke="rgba(53, 76, 225, 0.2)" strokeWidth="1" strokeDasharray="5,5" />
        <path d="M 90 150 Q 200 110 310 150" fill="none" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1.5" />
        <path d="M 90 150 Q 200 190 310 150" fill="none" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1.5" />
        <path d="M 200 40 Q 160 150 200 260" fill="none" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1.5" />
        <path d="M 200 40 Q 240 150 200 260" fill="none" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1.5" />
        <path d="M 160 110 Q 200 60 270 120" fill="none" stroke="#354CE1" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="300" strokeDashoffset="0" />
        <path d="M 130 180 Q 200 240 280 170" fill="none" stroke="#FFBF43" strokeWidth="2" strokeLinecap="round" strokeDasharray="300" strokeDashoffset="0" />
        <g transform="translate(240, 95) rotate(35)">
          <path d="M 0,0 L -12,-5 L -20,-3 L -15,0 L -25,2 L -22,5 Z" fill="#FFFFFF" />
          <circle cx="-10" cy="0" r="1.5" fill="#354CE1" />
          <path d="M -15,0 Q -30,-5 -45,0" fill="none" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" strokeDasharray="2,2" />
        </g>
        <circle cx="160" cy="110" r="4.5" fill="#354CE1" className="animate-ping" />
        <circle cx="160" cy="110" r="4" fill="#354CE1" />
        <circle cx="270" cy="120" r="4.5" fill="#354CE1" />
        <circle cx="280" cy="170" r="4" fill="#FFBF43" />
        <circle cx="130" cy="180" r="3.5" fill="#00D4B2" />
        <rect x="75" y="190" width="70" height="90" rx="6" fill="#1E43D8" opacity="0.95" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.5" />
        <circle cx="110" cy="225" r="14" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" />
        <line x1="85" y1="255" x2="135" y2="255" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" />
        <line x1="85" y1="262" x2="120" y2="262" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" />
        <line x1="85" y1="269" x2="110" y2="269" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" />
        <rect x="122" y="260" width="12" height="12" rx="2" fill="#FFBF43" />
      </svg>
    </div>
  );
}

function CheckCircle2(props: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
