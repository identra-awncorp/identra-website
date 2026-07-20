import type { AppView } from '../types/routes';
import React, { useMemo } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Cpu,
  HeartPulse,
  HelpCircle,
  Landmark,
  Layers,
  Plane,
  Play,
  ShieldCheck,
  Sparkles,
  Ticket
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import DemoScenarioActionPage from './DemoScenarioActionPage';
import { DEMO_PAGE_TRANSLATIONS } from '../translations/DemoPageTranslations';

interface DemoPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

interface ScenarioStepCopy {
  label: string;
  action: string;
  logText: string;
}

interface ScenarioCopy {
  id: string;
  tag: string;
  title: string;
  desc: string;
  security: string;
  successResult: string;
  steps: ScenarioStepCopy[];
}

interface ActionScenario extends ScenarioCopy {
  icon: React.ComponentType<any>;
}

const SCENARIO_ICONS: Record<string, React.ComponentType<any>> = {
  'bank-account': Landmark,
  'apply-job': Briefcase,
  'ticket-booking': Ticket,
  'airlines-hotels': Plane,
  'government-services': ShieldCheck,
  healthcare: HeartPulse,
  'ticket-transfer': Ticket
};


export default function DemoPage({ onOpenSandbox, onBackToLanding }: DemoPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(DEMO_PAGE_TRANSLATIONS, language as keyof typeof DEMO_PAGE_TRANSLATIONS, 'DEMO_PAGE_TRANSLATIONS');
  const [selectedScenarioId, setSelectedScenarioId] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState<'scenarios' | 'trends'>('scenarios');

  const demoScenarios = useMemo(
    () => t.scenarios.map((scenario: ScenarioCopy) => ({
      ...scenario,
      icon: SCENARIO_ICONS[scenario.id] || ShieldCheck
    })),
    [t]
  );

  const selectedActionScenario = useMemo<ActionScenario | null>(() => {
    if (!selectedScenarioId) return null;

    const current = t.scenarios.find((scenario: ScenarioCopy) => scenario.id === selectedScenarioId);
    if (!current) return null;

    return {
      ...current,
      icon: SCENARIO_ICONS[selectedScenarioId] || ShieldCheck
    };
  }, [selectedScenarioId, t]);

  const playTingTingSound = () => {
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
  };

  if (selectedActionScenario) {
    return (
      <DemoScenarioActionPage
        scenario={selectedActionScenario}
        onExit={() => setSelectedScenarioId(null)}
        playTingTingSound={playTingTingSound}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFBFD] text-slate-800 font-sans pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-[#354CE1]/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-indigo-50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-purple-50/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-10 md:pt-16 space-y-16 relative">
        <div className="bg-gradient-to-tr from-[#354CE1] via-[#5F3CF3] to-[#00D4B2] text-white rounded-[32px] p-8 md:p-14 lg:p-16 relative overflow-hidden shadow-xl shadow-indigo-950/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)]" />
          <div className="absolute top-1/4 left-1/10 w-48 h-48 bg-yellow-400/25 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/10 w-72 h-72 bg-[#00E5FF]/20 rounded-full blur-3xl" />

          {/* Integrated Top Bar Toolbar inside Hero Section */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/20 pb-6 mb-8">
            <button
              onClick={onBackToLanding}
              className="flex items-center gap-2 text-white/95 hover:text-white bg-white/15 hover:bg-white/25 backdrop-blur-md px-3.5 py-1.5 rounded-full transition text-xs font-semibold md:text-sm group cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>{t.backToHome}</span>
            </button>
            <div className="flex items-center gap-2.5 bg-white/15 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-white/95 font-semibold tracking-wider uppercase md:text-sm">
                {t.labStatus}
              </span>
            </div>
          </div>

          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/25 text-xs font-semibold md:text-sm tracking-wider uppercase mb-4">
              <Sparkles className="h-4 w-4 animate-pulse text-yellow-300" />
              <span className="text-yellow-300">{t.badge}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold tracking-tight text-white leading-[1.15] mb-6">
              {t.heroTitle}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={onOpenSandbox}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-teal-50 text-[#354CE1] font-bold rounded-full text-xs sm:text-sm shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
              >
                <span>{t.openSandbox}</span>
                <ArrowRight className="h-4 w-4 text-[#354CE1]" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-white/20 pt-8 text-xs sm:text-sm">
              {t.benefits.map((benefit: any) => (
                <div key={benefit.title} className="space-y-1.5">
                  <h3 className="font-bold text-sm md:text-base text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
                    {benefit.title}
                  </h3>
                  <p className="text-emerald-100 text-xs md:text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex border-b border-slate-200/80 pb-0.5 gap-8 text-xs sm:text-sm md:text-base">
          <button
            onClick={() => setActiveTab('scenarios')}
            className={`pb-3 text-xs sm:text-sm md:text-base font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'scenarios'
                ? 'border-[#354CE1] text-[#354CE1]'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            {t.tabs.scenarios}
          </button>
          <button
            onClick={() => setActiveTab('trends')}
            className={`pb-3 text-xs sm:text-sm md:text-base font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'trends'
                ? 'border-[#354CE1] text-[#354CE1]'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>{t.tabs.trends}</span>
          </button>
        </div>

        {activeTab === 'scenarios' ? (
          <>
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-bold text-slate-900 tracking-tight sm:text-xl md:text-2xl">
                  {t.scenarioHeading}
                </h2>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full md:text-sm">
                  {demoScenarios.length} {t.availableScenarios}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {demoScenarios.map((scenario: ScenarioCopy & { icon: React.ComponentType<any> }) => {
                  const Icon = scenario.icon;
                  return (
                    <div
                      key={scenario.id}
                      className="bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:shadow-md hover:-translate-y-1 p-5 sm:p-6 flex flex-col justify-between space-y-5 transition-all duration-300"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="p-2.5 bg-indigo-50 text-[#354CE1] rounded-xl border border-indigo-100/40">
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="text-[11px] font-bold text-slate-400 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-full uppercase tracking-wider md:text-xs">
                            {scenario.tag}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-sm font-bold text-slate-900 tracking-tight leading-snug md:text-base">
                            {scenario.title}
                          </h4>
                          <p className="text-sm text-slate-600 leading-relaxed min-h-[48px] md:text-base">
                            {scenario.desc}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3.5 border-t border-slate-100 pt-4">
                        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 md:text-sm">
                          <Cpu className="h-4 w-4 text-[#354CE1] shrink-0" />
                          <span className="truncate">{scenario.security}</span>
                        </div>

                        <button
                          onClick={() => setSelectedScenarioId(scenario.id)}
                          className="w-full inline-flex items-center justify-center gap-2 font-bold text-xs md:text-sm text-slate-800 hover:text-white bg-slate-50 hover:bg-[#354CE1] border border-slate-200/80 hover:border-[#354CE1] px-4 py-2.5 rounded-xl transition cursor-pointer select-none active:scale-[0.98]"
                        >
                          <Play className="h-3.5 w-3.5 fill-current" />
                          <span>{t.startDemo}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6">
              <div className="h-12 w-12 rounded-xl bg-indigo-50 text-[#354CE1] border border-indigo-100 flex items-center justify-center shrink-0">
                <HelpCircle className="h-6 w-6" />
              </div>
              <div className="space-y-1 flex-1 text-center md:text-left">
                <h4 className="font-bold text-sm sm:text-base text-slate-900 md:text-lg">{t.customFlowTitle}</h4>
                <p className="text-sm text-slate-600 leading-relaxed md:text-base">{t.customFlowDesc}</p>
              </div>
              <button
                onClick={onOpenSandbox}
                className="inline-flex items-center gap-2 font-bold text-xs md:text-sm text-white bg-[#354CE1] hover:bg-[#2539BE] px-5 py-2.5 rounded-xl transition shrink-0 shadow-md cursor-pointer active:scale-[0.98]"
              >
                <span>{t.openComprehensiveSandbox}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="p-8 text-center text-slate-500">{t.comingSoon}</div>
        )}
      </div>
    </div>
  );
}
