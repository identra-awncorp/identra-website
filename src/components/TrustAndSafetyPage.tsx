/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, ArrowRight, ArrowLeft, Sliders, Play, 
  CheckCircle2, Users, AlertTriangle, Shield, Check,
  FileText, Database, Workflow, Sparkles, Smile, RefreshCw,
  PhoneCall, Smartphone, Eye, Lock, Globe, Radio, GitFork, Network,
  X, CheckSquare, Zap, ChevronRight, HelpCircle, EyeOff, UserCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { TRUST_AND_SAFETY_TRANSLATIONS } from '../translations/TrustAndSafetyPageTranslations';

interface TrustAndSafetyPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

// Interactive Flow Customizer Preset Types
type FontType = 'sans' | 'serif' | 'mono';
type ThemeColor = 'blue' | 'purple' | 'teal' | 'gold';
type ButtonStyle = 'none' | 'lg' | 'full';

// Simulator Applicant Type
interface FraudApplicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  riskScore: number;
  signals: {
    vpn: boolean;
    emulatedDevice: boolean;
    multipleAccounts: boolean;
    watchlistMatch: boolean;
    livenessScore: number; // 0-100
  };
  idImage: string;
}

// Feature Grid item structure
interface FeatureItem {
  id: string;
  icon: React.ComponentType<any>;
  targetView?: AppView;
}

const formatCopy = (template: string, values: Record<string, string | number>) =>
  Object.entries(values).reduce((copy, [key, value]) => copy.replaceAll(`{${key}}`, String(value)), template);

export default function TrustAndSafetyPage({ onOpenSandbox, onBackToLanding, onViewChange }: TrustAndSafetyPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(TRUST_AND_SAFETY_TRANSLATIONS, language as keyof typeof TRUST_AND_SAFETY_TRANSLATIONS, 'TRUST_AND_SAFETY_TRANSLATIONS');
  // --- Flow Customizer State ---
  const [activeFont, setActiveFont] = useState<FontType>('sans');
  const [activeColor, setActiveColor] = useState<ThemeColor>('blue');
  const [activeButton, setActiveButton] = useState<ButtonStyle>('full');
  const [activeStep, setActiveStep] = useState<'welcome' | 'id-select' | 'camera' | 'done'>('welcome');
  const [selectedIdType, setSelectedIdType] = useState<string>('driver_license');
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  // --- Fraud Protection State ---
  const [currentScenario, setCurrentScenario] = useState<'legit' | 'risky'>('legit');
  const [analyzingLayers, setAnalyzingLayers] = useState<boolean>(false);
  const [activeLayer, setActiveLayer] = useState<number>(0);
  const [fraudLogs, setFraudLogs] = useState<string[]>([]);
  const [fraudScore, setFraudScore] = useState<number>(12);

  // --- Case Review Operations State ---
  const [cases, setCases] = useState<FraudApplicant[]>([
    {
      id: 'case-304',
      name: 'Sarah Jenkins',
      email: 'sarah.j@gmail.com',
      phone: '+1 (555) 321-9874',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120',
      riskScore: 18,
      signals: {
        vpn: false,
        emulatedDevice: false,
        multipleAccounts: false,
        watchlistMatch: false,
        livenessScore: 98,
      },
      idImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300&h=200'
    },
    {
      id: 'case-305',
      name: 'Donald Vance',
      email: 'd.vance99@proxymail.net',
      phone: '+1 (555) 782-4112',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120',
      riskScore: 78,
      signals: {
        vpn: true,
        emulatedDevice: true,
        multipleAccounts: true,
        watchlistMatch: false,
        livenessScore: 42,
      },
      idImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300&h=200'
    }
  ]);
  const [activeCaseIdx, setActiveCaseIdx] = useState<number>(0);
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState<string | null>(null);

  // --- Extra Tags Pill List ---
  const [showAllTags, setShowAllTags] = useState<boolean>(false);

  // --- Feature Cards Grid List ---
  const FEATURES: FeatureItem[] = [
    { id: 'gov-id', icon: FileText, targetView: 'government-id' },
    { id: 'mdl', icon: Smartphone, targetView: 'mobile-drivers-license' },
    { id: 'flow-editor', icon: Sliders, targetView: 'dynamic-flow' },
    { id: 'passive', icon: Radio, targetView: 'passive-signals' },
    { id: 'age-assure', icon: Smile, targetView: 'age-assurance' },
    { id: 'selfie-live', icon: UserCheck, targetView: 'selfie-age-estimation' },
    { id: 'graph', icon: Network, targetView: 'graph' },
    { id: 'cases', icon: Shield, targetView: 'case-management' },
    { id: 'workflows', icon: GitFork, targetView: 'workflows' }
  ];

  // Run Flow Simulator logic (Welcome -> Select -> Camera Simulation)
  const handleStartFlowSim = () => {
    setActiveStep('id-select');
  };

  const handleIdSelect = (idType: string) => {
    setSelectedIdType(idType);
    setActiveStep('camera');
    setIsCapturing(true);
    setProgress(0);
  };

  useEffect(() => {
    let timer: any;
    if (isCapturing && activeStep === 'camera') {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setIsCapturing(false);
            setTimeout(() => {
              setActiveStep('done');
            }, 600);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isCapturing, activeStep]);

  useEffect(() => {
    setAnalyzingLayers(true);
    setActiveLayer(0);
    setFraudLogs([]);
    setFraudScore(currentScenario === 'legit' ? 12 : 82);

    const logsList = currentScenario === 'legit' ? t.fraudLogsLegit : t.fraudLogsRisky;
    let logIndex = 0;
    const timer = setInterval(() => {
      if (logIndex < logsList.length) {
        setFraudLogs((prev) => [...prev, logsList[logIndex]]);
        setActiveLayer(Math.min(logIndex + 1, t.fraudLayers.length));
        logIndex += 1;
      } else {
        setAnalyzingLayers(false);
        clearInterval(timer);
      }
    }, 700);

    return () => clearInterval(timer);
  }, [currentScenario, language]);

  const handleCaseAction = (action: 'approve' | 'reject') => {
    const applicant = cases[activeCaseIdx];
    setReviewSuccessMsg(formatCopy(t.caseActionMsg, {
      id: applicant.id,
      action: action === 'approve' ? t.approved : t.rejected,
    }));
    setActiveCaseIdx((prev) => (prev + 1) % cases.length);
    window.setTimeout(() => setReviewSuccessMsg(null), 3000);
  };

  const getFontClass = () => {
    if (activeFont === 'serif') return 'font-serif';
    if (activeFont === 'mono') return 'font-mono';
    return 'font-sans';
  };

  const getColorClass = (type: 'bg' | 'text' | 'border') => {
    const colors = {
      blue: { bg: 'bg-[#354CE1]', text: 'text-[#354CE1]', border: 'border-[#354CE1]' },
      purple: { bg: 'bg-indigo-600', text: 'text-indigo-600', border: 'border-indigo-600' },
      teal: { bg: 'bg-emerald-600', text: 'text-emerald-600', border: 'border-emerald-600' },
      gold: { bg: 'bg-amber-400', text: 'text-amber-500', border: 'border-amber-400' },
    };
    return colors[activeColor][type];
  };

  const getButtonClass = () => {
    if (activeButton === 'none') return 'rounded-none';
    if (activeButton === 'lg') return 'rounded-lg';
    return 'rounded-full';
  };

  return (
    <div id="trust-page" className="min-h-screen bg-[#FAFBFD] text-[#0F1E36] overflow-x-hidden">
      <section className="relative w-full bg-gradient-to-b from-[#1E43D8] to-[#142FA0] pt-24 pb-28 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <button onClick={onBackToLanding} className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            {t.backToHome}
          </button>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold tracking-wide">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FFBF43]" />
            {t.badge}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-white tracking-tight leading-[1.1] max-w-5xl mt-6">
            {t.heroTitlePrefix} <span className="text-[#FFBF43] underline decoration-amber-400 decoration-wavy underline-offset-8">{t.heroTitleHighlight}</span> {t.heroTitleSuffix}
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mt-6 leading-relaxed">{t.heroDesc}</p>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <button onClick={onOpenSandbox} className="rounded-full bg-white hover:bg-slate-50 text-[#142FA0] font-bold py-3.5 px-8 transition inline-flex items-center gap-2 group text-sm shadow-lg hover:shadow-xl">
              {t.getDemo}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#142FA0]" />
            </button>
            <button onClick={onOpenSandbox} className="rounded-full bg-transparent border border-white/30 text-white hover:bg-white/10 font-bold py-3.5 px-8 transition text-sm">
              {t.exploreSandboxApi}
            </button>
          </div>

          <div className="mt-16 relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#0F1E36]/90 p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7 space-y-6">
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{t.ecosystemTitle}</h3>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-lg">{t.ecosystemDesc}</p>
                <div className="pt-4 grid grid-cols-3 gap-3 md:gap-4">
                  {[
                    { icon: Users, status: t.passed, title: t.linkedInOnboard, desc: t.biometricsValidated, color: 'text-[#FFBF43]' },
                    { icon: ShieldCheck, status: t.passed, title: t.neighborHost, desc: t.mdlCrosscheck, color: 'text-emerald-400' },
                    { icon: AlertTriangle, status: t.review, title: t.coffeeMeetsBagel, desc: t.suspiciousIp, color: 'text-[#FFBF43]' }
                  ].map((item: any) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/50 hover:border-slate-500 transition group cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                          <div className="w-8 h-8 rounded-full bg-[#E2E6FF]/20 flex items-center justify-center text-white">
                            <Icon className={['w-4 h-4', item.color].join(' ')} />
                          </div>
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.5 rounded">{item.status}</span>
                        </div>
                        <span className="text-xs font-bold text-slate-200 block truncate">{item.title}</span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">{item.desc}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="relative w-full max-w-[340px] mx-auto aspect-[4/3] bg-gradient-to-br from-indigo-950 to-[#0F1E36] rounded-2xl border border-slate-700/50 p-6 flex flex-col justify-between overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-mono text-[10px] text-slate-400">{t.signalsLive}</span>
                    </div>
                    <span className="font-mono text-[10px] text-[#354CE1] font-bold bg-[#E2E6FF] px-2 py-0.5 rounded-full">{t.kycEngine}</span>
                  </div>
                  <div className="my-4 space-y-3">
                    {[{ title: t.passiveIpCheck, desc: t.verifiedIsp }, { title: t.facialSimilarity, desc: t.selfieIdMatch }].map((row: any) => (
                      <div key={row.title} className="flex items-center gap-2.5 bg-slate-800/60 p-2 rounded-lg border border-slate-700/30">
                        <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                        <div>
                          <div className="text-[10px] font-bold text-slate-300">{row.title}</div>
                          <div className="text-[8px] font-mono text-emerald-400">{row.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/40">
                    <span className="text-xs text-slate-300">{t.platformAutopilot}</span>
                    <strong className="text-emerald-400 text-xs font-bold block mt-0.5">{t.autoApproved}</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center md:text-left">{t.trustedBy}</span>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-85">
                <div className="flex items-center gap-1.5 text-white font-bold text-sm tracking-tight"><span className="bg-white text-[#142FA0] px-1 rounded-sm font-sans font-black text-xs">{t.trustedLogoLinkedInMark}</span><span>{t.trustedLogoLinkedIn}</span></div>
                <div className="flex items-center gap-1.5 text-white font-bold text-xs tracking-tight"><span>{t.trustedLogoCoffee}</span></div>
                <div className="flex items-center gap-1 text-white font-bold text-xs tracking-wider uppercase"><span className="bg-[#FFBF43] p-1 rounded-full text-slate-900 text-[8px] flex items-center justify-center font-bold">{t.trustedLogoNeighborMark}</span><span>{t.trustedLogoNeighbor}</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto border-b border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold text-[#354CE1] uppercase tracking-wider block">{t.section1Label}</span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight text-[#0F1E36]">{t.section1Title}</h2>
            <p className="text-slate-600 leading-relaxed">{t.section1Desc}</p>
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-md space-y-5">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5"><Sliders className="w-3.5 h-3.5 text-[#354CE1]" />{t.themeConfigurator}</div>
              <div>
                <span className="text-xs font-bold text-slate-700 block mb-2">{t.fontPairing}</span>
                <div className="grid grid-cols-3 gap-2">
                  {(['sans', 'serif', 'mono'] as FontType[]).map((f) => (
                    <button key={f} onClick={() => setActiveFont(f)} className={['py-1.5 px-3 rounded-lg text-xs font-medium border transition', activeFont === f ? 'bg-[#354CE1] text-white border-[#354CE1] shadow-xs' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'].join(' ')}>
                      {t.fonts[f]}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-700 block mb-2">{t.primaryAccentColor}</span>
                <div className="grid grid-cols-4 gap-2">
                  {(['blue', 'purple', 'teal', 'gold'] as ThemeColor[]).map((c) => (
                    <button key={c} onClick={() => setActiveColor(c)} className={['py-1.5 px-2 rounded-lg text-xs font-medium border transition flex items-center gap-1.5 justify-center', activeColor === c ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'].join(' ')}>
                      <span className={['w-2.5 h-2.5 rounded-full', c === 'blue' ? 'bg-[#354CE1]' : c === 'purple' ? 'bg-indigo-600' : c === 'teal' ? 'bg-emerald-600' : 'bg-amber-400'].join(' ')} />
                      {t.colors[c]}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-700 block mb-2">{t.buttonBorderRadius}</span>
                <div className="grid grid-cols-3 gap-2">
                  {(['none', 'lg', 'full'] as ButtonStyle[]).map((b) => (
                    <button key={b} onClick={() => setActiveButton(b)} className={['py-1.5 px-3 rounded-lg text-xs font-medium border transition', activeButton === b ? 'bg-[#354CE1] text-white border-[#354CE1]' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'].join(' ')}>
                      {t.buttons[b]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-full max-w-[360px] aspect-[9/18] bg-slate-900 rounded-[3rem] p-3.5 shadow-2xl border-4 border-slate-800/90 overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-28 bg-slate-900 rounded-b-2xl z-50 flex items-center justify-center"><span className="w-10 h-1 bg-slate-800 rounded-full" /></div>
              <div className={['w-full h-full bg-white rounded-[2.5rem] overflow-hidden flex flex-col justify-between pt-8 pb-6 px-5 select-none relative', getFontClass()].join(' ')}>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-2">
                  <div className="flex items-center gap-1.5"><span className={['w-2 h-2 rounded-full', getColorClass('bg')].join(' ')} /><span className="text-[10px] font-bold tracking-wider text-slate-800">{t.trustPass}</span></div>
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div className="flex-1 flex flex-col justify-center py-4">
                  <AnimatePresence mode="wait">
                    {activeStep === 'welcome' && (
                      <motion.div key="welcome" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4 text-center">
                        <div className="flex justify-center"><div className={['w-12 h-12 rounded-full bg-opacity-10 flex items-center justify-center', getColorClass('bg')].join(' ')}><ShieldCheck className={['w-6 h-6', getColorClass('text')].join(' ')} /></div></div>
                        <div><h4 className="text-base font-bold text-slate-800 leading-tight">{t.welcomeTitle}</h4><p className="text-[11px] text-slate-500 mt-2">{t.welcomeDesc}</p></div>
                        <button onClick={handleStartFlowSim} className={['w-full py-2.5 px-4 text-xs font-bold text-white transition hover:opacity-90', getColorClass('bg'), getButtonClass()].join(' ')}>{t.beginVerification}</button>
                      </motion.div>
                    )}
                    {activeStep === 'id-select' && (
                      <motion.div key="id-select" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">{t.selectIdDocument}</h4>
                        <div className="space-y-2">
                          {t.idDocs.map((doc: any) => (
                            <button key={doc.id} onClick={() => handleIdSelect(doc.id)} className={['w-full text-left p-3 rounded-xl border hover:border-slate-300 transition block bg-slate-50 hover:bg-slate-100', selectedIdType === doc.id ? ['border-2', getColorClass('border')].join(' ') : 'border-slate-200'].join(' ')}>
                              <span className="text-xs font-bold text-slate-800 block">{doc.name}</span>
                              <span className="text-[9px] text-slate-400 block">{doc.desc}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                    {activeStep === 'camera' && (
                      <motion.div key="camera" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="text-center space-y-4">
                        <div className="relative aspect-[4/3] bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center border-2 border-dashed border-slate-300">
                          <div className="absolute inset-0 bg-radial-gradient from-transparent to-slate-900/40" />
                          <div className="text-center z-10 p-3"><Smartphone className="w-8 h-8 text-white mx-auto animate-bounce mb-2" /><span className="text-[10px] font-mono text-slate-300 block">{t.scanningFront}</span><span className="text-[9px] text-emerald-400 block mt-1 font-semibold">{t.alignFrames}</span></div>
                          <div className={['absolute top-0 left-0 right-0 h-0.5 opacity-80 shadow-md', getColorClass('bg')].join(' ')} style={{ transform: 'translateY(' + progress + '%)', transition: 'transform 0.1s linear' }} />
                        </div>
                        <div><span className="text-[10px] text-slate-500 block">{t.analyzingSecurity}</span><div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden"><div className={['h-full', getColorClass('bg')].join(' ')} style={{ width: progress + '%' }} /></div></div>
                      </motion.div>
                    )}
                    {activeStep === 'done' && (
                      <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-4">
                        <div className="flex justify-center"><div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shadow-inner"><Check className="w-8 h-8" /></div></div>
                        <div><h4 className="text-base font-bold text-slate-800 leading-tight">{t.doneTitle}</h4><p className="text-[11px] text-slate-500 mt-2">{t.doneDesc}</p></div>
                        <button onClick={() => { setActiveStep('welcome'); setProgress(0); }} className={['w-full py-2.5 px-4 text-xs font-bold text-white transition', getColorClass('bg'), getButtonClass()].join(' ')}>{t.resetSimulation}</button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="border-t border-slate-100 pt-3 text-center text-[9px] text-slate-400 font-mono tracking-tight flex items-center justify-center gap-1"><Lock className="w-2.5 h-2.5" /> {t.secureSsl}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#FAFBFD] border-b border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
                <div><h3 className="text-white text-base font-bold flex items-center gap-2"><Zap className="w-4 h-4 text-amber-400" />{t.riskEvaluatorTitle}</h3><p className="text-slate-400 text-xs mt-0.5">{t.riskEvaluatorDesc}</p></div>
                <div className="bg-slate-800 p-1 rounded-xl flex gap-1 border border-slate-700">
                  <button onClick={() => setCurrentScenario('legit')} className={['text-xs font-bold px-3 py-1.5 rounded-lg transition', currentScenario === 'legit' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-400 hover:text-white'].join(' ')}>{t.legitimateUser}</button>
                  <button onClick={() => setCurrentScenario('risky')} className={['text-xs font-bold px-3 py-1.5 rounded-lg transition', currentScenario === 'risky' ? 'bg-rose-500 text-white shadow-md' : 'text-slate-400 hover:text-white'].join(' ')}>{t.riskyActor}</button>
                </div>
              </div>
              <div className="space-y-4">
                {t.fraudLayers.map((layer: any, idx: number) => {
                  const isLayerDone = activeLayer > idx;
                  const isLayerActive = activeLayer === idx;
                  return (
                    <div key={layer.label} className={['p-3.5 rounded-xl border transition flex items-center justify-between', isLayerActive ? 'bg-[#354CE1]/10 border-[#354CE1] text-white' : isLayerDone ? 'bg-slate-800/40 border-slate-700/60 text-slate-200' : 'bg-slate-900/50 border-slate-800/40 text-slate-500'].join(' ')}>
                      <div className="flex items-center gap-3">
                        <div className={['w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold', isLayerDone ? (currentScenario === 'legit' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400') : isLayerActive ? 'bg-[#354CE1]/30 text-white animate-pulse' : 'bg-slate-800 text-slate-600'].join(' ')}>{isLayerDone ? '✓' : idx + 1}</div>
                        <div><span className="text-xs font-bold block">{layer.label}</span><span className="text-[10px] text-slate-400 block mt-0.5">{layer.metric}</span></div>
                      </div>
                      <span className={['text-[10px] font-bold uppercase', isLayerDone ? (currentScenario === 'legit' ? 'text-emerald-400' : 'text-rose-400') : isLayerActive ? 'text-[#354CE1] animate-pulse' : 'text-slate-600'].join(' ')}>{isLayerDone ? (currentScenario === 'legit' ? t.clear : t.flagged) : isLayerActive ? t.evaluating : t.idle}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-[11px] space-y-2 h-28 overflow-y-auto">
                <div className="text-slate-500">{t.telemetryOutput}</div>
                {fraudLogs.map((log, lIdx) => <div key={lIdx} className={lIdx === fraudLogs.length - 1 ? (currentScenario === 'legit' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold') : 'text-slate-300'}>&gt; {log}</div>)}
              </div>
              <div className="mt-6 bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 flex items-center justify-between">
                <div><span className="text-xs text-slate-400">{t.totalRiskScore}</span><strong className={['text-xl font-bold block mt-1', currentScenario === 'legit' ? 'text-emerald-400' : 'text-rose-400'].join(' ')}>{fraudScore} / 100</strong></div>
                <div className="text-right"><span className="text-xs text-slate-400">{t.autopilotRecommendation}</span><strong className={['text-xs uppercase font-bold block mt-1', currentScenario === 'legit' ? 'text-emerald-400' : 'text-rose-400'].join(' ')}>{currentScenario === 'legit' ? t.autoApprove : t.queueReview}</strong></div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
            <span className="text-xs font-bold text-[#354CE1] uppercase tracking-wider block">{t.section2Label}</span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight text-[#0F1E36]">{t.section2Title}</h2>
            <p className="text-slate-600 leading-relaxed">{t.section2Desc}</p>
            <ul className="space-y-4 pt-2">{t.fraudBenefits.map((item: any) => <li key={item.title} className="flex gap-3"><div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5"><Check className="w-3.5 h-3.5" /></div><div><strong className="text-sm font-bold text-slate-800 block">{item.title}</strong><span className="text-xs text-slate-500 block mt-0.5">{item.desc}</span></div></li>)}</ul>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#FAFBFD] border-b border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold text-[#354CE1] uppercase tracking-wider block">{t.section3Label}</span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight text-[#0F1E36]">{t.section3Title}</h2>
            <p className="text-slate-600 leading-relaxed">{t.section3Desc}</p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-500 flex items-center gap-3"><Users className="w-5 h-5 text-[#354CE1] shrink-0" /><span>{t.simulatorHint}</span></div>
          </div>
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden relative">
              <AnimatePresence>{reviewSuccessMsg && <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute inset-x-0 top-0 bg-slate-900 text-white py-3 px-6 text-xs font-bold flex items-center justify-between z-20"><div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" />{reviewSuccessMsg}</div><X className="w-4 h-4 cursor-pointer" onClick={() => setReviewSuccessMsg(null)} /></motion.div>}</AnimatePresence>
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-150 flex items-center justify-between"><div className="flex items-center gap-2.5"><span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">{t.caseWorkspace}</span><span className="text-xs font-medium text-slate-500">{t.reviewQueue}</span></div></div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-5 space-y-4 border-r border-slate-100 pr-0 md:pr-6">
                  <div className="flex items-center gap-3"><img src={cases[activeCaseIdx].avatar} alt={t.applicantAlt} className="w-12 h-12 rounded-full object-cover border-2 border-[#354CE1]/20" referrerPolicy="no-referrer" /><div><h4 className="text-sm font-bold text-slate-800">{cases[activeCaseIdx].name}</h4><span className="text-[10px] text-slate-400 font-mono tracking-tight">{cases[activeCaseIdx].id}</span></div></div>
                  <div className="space-y-2 pt-2">
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100"><span className="text-[10px] font-bold text-slate-400 block uppercase">{t.contactMethods}</span><span className="text-xs text-slate-700 block mt-0.5 font-medium">{cases[activeCaseIdx].email}</span><span className="text-xs text-slate-500 block mt-0.5">{cases[activeCaseIdx].phone}</span></div>
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 space-y-1.5"><span className="text-[10px] font-bold text-slate-400 block uppercase">{t.verificationFlags}</span>{[[t.vpnMasking, cases[activeCaseIdx].signals.vpn], [t.emulatorUse, cases[activeCaseIdx].signals.emulatedDevice], [t.duplicateIds, cases[activeCaseIdx].signals.multipleAccounts]].map(([label, value]: any) => <div key={label} className="flex items-center justify-between text-xs"><span className="text-slate-500">{label}</span><span className={value ? 'text-rose-500 font-bold' : 'text-emerald-500 font-bold'}>{value ? t.yes : t.no}</span></div>)}</div>
                  </div>
                </div>
                <div className="md:col-span-7 space-y-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t.submittedProof}</span>
                  <div className="relative aspect-[3/2] rounded-xl overflow-hidden bg-slate-900 border border-slate-200"><img src={cases[activeCaseIdx].idImage} alt={t.govIdAlt} className="w-full h-full object-cover opacity-85" referrerPolicy="no-referrer" /><div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs py-0.5 px-2 rounded text-[8px] font-mono text-slate-200">{t.frontScanCompleted}</div><div className="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur-xs py-0.5 px-2 rounded text-[8px] font-mono text-emerald-400">{t.livenessScore} {cases[activeCaseIdx].signals.livenessScore}%</div></div>
                  <div className="flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-lg"><span className="text-slate-500 font-medium">{t.autoRiskScore}</span><strong className={['font-mono font-bold', cases[activeCaseIdx].riskScore < 30 ? 'text-emerald-600' : 'text-rose-600'].join(' ')}>{cases[activeCaseIdx].riskScore}% {t.riskSuffix}</strong></div>
                </div>
              </div>
              <div className="bg-slate-50 border-t border-slate-150 px-6 py-4 flex flex-col md:flex-row gap-3 items-center justify-between"><div className="text-xs text-slate-500">{t.webhookActions}</div><div className="flex gap-2 w-full md:w-auto"><button onClick={() => handleCaseAction('reject')} className="flex-1 md:flex-none px-4 py-2 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-600 font-bold text-xs transition">{t.rejectProfile}</button><button onClick={() => handleCaseAction('approve')} className="flex-1 md:flex-none px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition">{t.approveRelease}</button></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4"><span className="text-xs font-bold text-[#354CE1] uppercase tracking-wider block">{t.featureLabel}</span><h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight text-[#0F1E36]">{t.featureTitle}</h2><p className="text-slate-600 text-sm md:text-base leading-relaxed">{t.featureDesc}</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feat) => {
              const Icon = feat.icon;
              const copy = t.features[feat.id];
              return (
                <div key={feat.id} onClick={() => { if (onViewChange && feat.targetView) onViewChange(feat.targetView); }} className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-[#354CE1]/10 group-hover:text-[#354CE1] transition shrink-0"><Icon className="w-5 h-5" /></div>
                    <div className="space-y-2"><h3 className="text-sm font-bold text-slate-800 group-hover:text-[#354CE1] transition flex items-center gap-1.5">{copy.title}<ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" /></h3><p className="text-xs text-slate-500 leading-relaxed">{copy.description}</p></div>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400 group-hover:text-[#354CE1] transition"><span>{t.exploreIntegration}</span><ArrowRight className="w-3 h-3 translate-x-0 group-hover:translate-x-1 transition-transform" /></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-4"><span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">{t.helpLabel}</span><h2 className="text-3xl font-display font-semibold tracking-tight text-[#0F1E36]">{t.contactTitle}</h2><p className="text-slate-600 text-sm max-w-md">{t.contactDesc}</p><button onClick={() => onViewChange && onViewChange('contact')} className="inline-flex items-center gap-1.5 text-[#354CE1] hover:text-[#2539BE] font-bold text-xs tracking-wider uppercase transition-colors">{t.contactUs}<ChevronRight className="w-4 h-4" /></button></div>
          <div className="lg:col-span-7"><span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4">{t.exploreCapabilities}</span><div className="flex flex-wrap gap-2">{t.coreTags.map((tag: string) => <span key={tag} className="px-4 py-2 bg-[#E2E6FF]/50 hover:bg-[#E2E6FF] transition text-[#354CE1] font-semibold text-xs rounded-full cursor-pointer">{tag}</span>)}<AnimatePresence>{showAllTags && t.moreTags.map((tag: string) => <motion.span key={tag} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 transition font-semibold text-xs rounded-full cursor-pointer">{tag}</motion.span>)}</AnimatePresence><button onClick={() => setShowAllTags(!showAllTags)} className="px-4 py-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-500 transition font-bold text-xs rounded-full">{showAllTags ? t.showLess : t.more}</button></div></div>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto space-y-10"><h2 className="text-2xl font-display font-semibold tracking-tight text-[#0F1E36] text-center">{t.exploreMoreTitle}</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-8">{t.exploreCards.map((card: any, index: number) => <div key={card.title} onClick={() => onViewChange && onViewChange(index === 0 ? 'business-fraud' : 'dynamic-flow')} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs hover:shadow-lg transition cursor-pointer group"><div className={['w-12 h-12 rounded-full flex items-center justify-center transition duration-300', index === 0 ? 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white' : 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white'].join(' ')}>{index === 0 ? <Lock className="w-6 h-6" /> : <Sliders className="w-6 h-6" />}</div><h3 className="text-lg font-bold text-slate-800 mt-6 group-hover:text-indigo-600 transition">{card.title}</h3><p className="text-xs text-slate-500 mt-2">{card.desc}</p></div>)}</div></div>
      </section>

      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="bg-[#E2E6FF]/50 border border-[#354CE1]/10 rounded-[2.5rem] p-10 md:p-16 text-center space-y-6 relative overflow-hidden">
          <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight text-[#0F1E36] relative z-10">{t.readyTitle}</h2>
          <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto relative z-10">{t.readyDesc}</p>
          <div className="flex flex-wrap items-center justify-center gap-4 relative z-10"><button onClick={onOpenSandbox} className="rounded-full bg-[#354CE1] hover:bg-[#2539BE] text-white font-bold py-3.5 px-8 transition text-sm flex items-center gap-2 group">{t.getDemo}<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></button><button onClick={onOpenSandbox} className="rounded-full bg-transparent border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3.5 px-8 transition text-sm">{t.tryItNow}</button></div>
        </div>
      </section>
    </div>
  );
}
