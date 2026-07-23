/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Globe,
  Smartphone,
  Lock,
  Users,
  ArrowUpRight,
  Zap,
  CheckCircle2,
  ShieldCheck,
  User,
  Sparkles,
  ArrowLeft,
  Radio,
  Shield,
  Wifi,
  Cpu,
  FileCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { NFC_PAGE_TRANSLATIONS } from '../translations/NfcPageTranslations';

interface NfcPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

interface ScannedData {
  firstName: string;
  lastName: string;
  docNumber: string;
  nationality: string;
  birthDate: string;
  expiryDate: string;
  chipVerified: boolean;
}

export default function NfcPage({ onOpenSandbox, onBackToLanding, onViewChange }: NfcPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(NFC_PAGE_TRANSLATIONS, language as keyof typeof NFC_PAGE_TRANSLATIONS, 'NFC_PAGE_TRANSLATIONS');

  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'success'>('idle');
  const [scanProgress, setScanProgress] = useState(0);
  const [scanLogCount, setScanLogCount] = useState(0);
  const [hasScannedData, setHasScannedData] = useState(false);
  const scanLogs = scanState === 'idle'
    ? []
    : [...t.simulator.initialLogs, ...t.simulator.logs.slice(0, scanLogCount)];
  const scannedData: ScannedData | null = hasScannedData ? { ...t.simulator.scannedData } : null;
  const [expandedAccordion, setExpandedAccordion] = useState<number | null>(0);
  const [activeArticleId, setActiveArticleId] = useState<number | null>(null);

  const startScanningSimulation = () => {
    setScanState('scanning');
    setScanProgress(0);
    setScanLogCount(0);
    setHasScannedData(false);

    let currentLogIdx = 0;
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanState('success');
          setHasScannedData(true);
          return 100;
        }

        if (prev % 12 === 0 && currentLogIdx < t.simulator.logs.length) {
          setScanLogCount(currentLogIdx + 1);
          currentLogIdx++;
        }

        return prev + 4;
      });
    }, 150);
  };

  const resetScanningSimulation = () => {
    setScanState('idle');
    setScanProgress(0);
    setScanLogCount(0);
    setHasScannedData(false);
  };

  const toggleAccordion = (idx: number) => {
    setExpandedAccordion((prev) => (prev === idx ? null : idx));
  };

  const featureIcons = [Shield, Zap, Smartphone, Globe];
  const validationIcons = [ShieldCheck, Lock, Wifi, Cpu];
  const useCaseIcons = [Users, Shield, Zap];
  const exploreIcons = [FileCheck, Globe];
  const exploreIconStyles = ['bg-blue-50 text-blue-600', 'bg-emerald-50 text-emerald-600'];
  const exploreTextStyles = ['group-hover:text-[#354CE1]', 'group-hover:text-[#10B981]'];
  const exploreLinkStyles = ['text-[#354CE1]', 'text-[#10B981]'];

  const activeArticle = t.articles.find((article) => article.id === activeArticleId);

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-slate-800 antialiased font-sans">
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <button
          onClick={onBackToLanding}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition font-medium group"
          id="nfc_back_btn"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>{t.backToPlatform}</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="bg-gradient-to-tr from-[#354CE1] via-[#5F3CF3] to-[#00D4B2] text-white rounded-[32px] p-8 md:p-14 lg:p-16 relative overflow-hidden shadow-xl shadow-indigo-950/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)]" />
          <div className="absolute top-1/4 left-1/10 w-48 h-48 bg-yellow-400/25 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/10 w-72 h-72 bg-[#00E5FF]/20 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/20 backdrop-blur-md rounded-full border border-white/25 text-xs font-semibold tracking-wider uppercase mb-6" id="nfc_hero_badge">
              <Radio className="w-3.5 h-3.5 animate-pulse text-yellow-300" />
              <span className="text-yellow-300">{t.badge}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold tracking-tight text-white leading-[1.1] mb-6" id="nfc_hero_title">
              {t.heroTitle}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-14">
              <button
                onClick={onOpenSandbox}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-teal-50 text-[#354CE1] font-bold rounded-full text-sm shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                id="nfc_hero_demo_btn"
              >
                <span>{t.tryDemo}</span>
                <ArrowRight className="w-4 h-4 text-[#354CE1]" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/20 pt-10">
              {t.heroBenefits.map((benefit) => (
                <div key={benefit.title} className="space-y-2">
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
                    {benefit.title}
                  </h3>
                  <p className="text-emerald-100 text-xs leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <p className="text-[#354CE1] text-xs font-bold uppercase tracking-wider mb-2">{t.integrationPreview}</p>
          <h2 className="font-display text-3xl font-bold text-slate-900 tracking-tight">{t.howItWorks}</h2>
        </div>

        <div className="flex items-center justify-center gap-2 mb-8">
          {t.tabs.map((label, index) => {
            const tabId = (index + 1) as 1 | 2 | 3;
            return (
              <button
                key={label}
                onClick={() => setActiveStep(tabId)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  activeStep === tabId
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800'
                }`}
                id={`nfc_tab_${tabId}`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="bg-[#EBF7F2] rounded-3xl p-6 md:p-12 min-h-[500px] flex flex-col lg:flex-row gap-8 items-center border border-[#A7F3D0]/30 shadow-inner">
          <div className="w-full lg:w-1/2 space-y-6">
            {activeStep === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
                <span className="inline-flex px-3 py-1 bg-[#10B981]/15 text-[#047857] text-[10px] font-bold tracking-wider uppercase rounded-full">{t.steps[0].badge}</span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
                  {t.steps[0].title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {t.steps[0].desc}
                </p>
                <div className="space-y-3 pt-2">
                  {t.steps[0].bullets.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
                <span className="inline-flex px-3 py-1 bg-[#10B981]/15 text-[#047857] text-[10px] font-bold tracking-wider uppercase rounded-full">{t.steps[1].badge}</span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
                  {t.steps[1].title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {t.steps[1].desc}
                </p>

                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-[#34D399]/20 shadow-sm space-y-3">
                  <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
                    {t.simulator.title}
                  </p>
                  <p className="text-xs text-slate-500">
                    {t.simulator.desc}
                  </p>

                  <div className="flex gap-2.5 pt-1">
                    {scanState === 'idle' ? (
                      <button
                        onClick={startScanningSimulation}
                        className="px-4 py-2 bg-[#10B981] hover:bg-[#059669] text-white rounded-lg text-xs font-bold shadow-sm transition-all"
                      >
                        {t.simulator.start}
                      </button>
                    ) : (
                      <button
                        onClick={resetScanningSimulation}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold shadow-sm transition-all"
                      >
                        {t.simulator.reset}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeStep === 3 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
                <span className="inline-flex px-3 py-1 bg-[#10B981]/15 text-[#047857] text-[10px] font-bold tracking-wider uppercase rounded-full">{t.steps[2].badge}</span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
                  {t.steps[2].title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {t.steps[2].desc}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {t.steps[2].checks.map((check, index) => {
                    const ValidationIcon = validationIcons[index];
                    return (
                      <div key={check.title} className="p-3 bg-white rounded-xl border border-slate-100 flex items-start gap-2.5 shadow-sm">
                        <ValidationIcon className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{check.title}</h4>
                          <p className="text-[10px] text-slate-500 leading-normal">{check.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-[340px] aspect-[9/18.5] bg-slate-950 rounded-[48px] p-3.5 shadow-2xl border-4 border-slate-800 ring-8 ring-slate-900/10 overflow-hidden flex flex-col justify-between">
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-950 rounded-full z-20 flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-slate-900 rounded-full mr-2" />
                <div className="w-1.5 h-1.5 bg-slate-900 rounded-full" />
              </div>

              <div className="w-full h-full bg-white rounded-[36px] overflow-hidden flex flex-col justify-between p-5 pt-7 relative">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 bg-[#10B981]/10 rounded-full flex items-center justify-center text-[#10B981]">
                      <Shield className="w-2.5 h-2.5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-900 uppercase tracking-tight">{t.phone.header}</span>
                  </div>
                  <span className="text-[9px] font-mono text-slate-400">{t.phone.version}</span>
                </div>

                <div className="flex-1 py-4 flex flex-col justify-center">
                  {activeStep === 1 && (
                    <div className="space-y-4 animate-in fade-in duration-300">
                      <div className="text-center space-y-1">
                        <h4 className="text-sm font-bold text-slate-900">{t.phone.verifyTitle}</h4>
                        <p className="text-[10px] text-slate-500 leading-normal">{t.phone.verifyDesc}</p>
                      </div>

                      <div className="space-y-2 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{t.phone.verifications}</span>
                        <div className="flex items-center gap-2 text-[10px] text-slate-700 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-100" />
                          <span>{t.phone.governmentId}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-slate-700 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-100" />
                          <span>{t.phone.selfieLiveness}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-emerald-500 font-bold bg-[#10B981]/10 p-1 rounded-lg">
                          <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                          <span>{t.phone.nfcChipVerification}</span>
                        </div>
                      </div>

                      <button className="w-full bg-[#10B981] text-white font-bold py-2 rounded-xl text-xs shadow-sm hover:bg-[#059669] transition">
                        {t.phone.next}
                      </button>
                    </div>
                  )}

                  {activeStep === 2 && (
                    <div className="space-y-3 animate-in fade-in duration-300 flex-1 flex flex-col justify-between">
                      {scanState === 'idle' && (
                        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                          <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center relative border-2 border-dashed border-[#10B981]/30">
                            <Radio className="w-6 h-6 text-[#10B981]" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-xs font-bold text-slate-900">{t.phone.holdTitle}</h4>
                            <p className="text-[9px] text-slate-500 leading-normal max-w-[180px] mx-auto">
                              {t.phone.holdDesc}
                            </p>
                          </div>
                          <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="w-0 h-full bg-[#10B981]" />
                          </div>
                        </div>
                      )}

                      {scanState === 'scanning' && (
                        <div className="flex-1 flex flex-col justify-between">
                          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 pt-3">
                            <div className="relative w-16 h-16 flex items-center justify-center">
                              <div className="absolute inset-0 bg-[#10B981]/15 rounded-full animate-ping" />
                              <div className="absolute inset-2 bg-[#10B981]/10 rounded-full" />
                              <div className="w-10 h-10 bg-[#10B981] rounded-full flex items-center justify-center text-white shadow-md z-10">
                                <Radio className="w-5 h-5 animate-pulse" />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <h4 className="text-xs font-bold text-slate-900">{t.phone.scanningTitle}</h4>
                              <p className="text-[9px] text-slate-400 font-mono tracking-wide">
                                {t.phone.doNotMove} ({scanProgress}%)
                              </p>
                            </div>
                          </div>

                          <div className="h-16 bg-slate-900 rounded-xl p-2 font-mono text-[6px] text-[#A7F3D0] overflow-y-auto space-y-0.5 text-left border border-emerald-900/30">
                            {scanLogs.slice(-2).map((log) => (
                              <div key={log} className="truncate">
                                <span className="text-slate-500 mr-1">{'>'}</span>
                                {log}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {scanState === 'success' && scannedData && (
                        <div className="flex-1 flex flex-col justify-between space-y-2 py-1 animate-in zoom-in-95 duration-200">
                          <div className="text-center space-y-1">
                            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 mb-1">
                              <CheckCircle2 className="w-4 h-4 fill-emerald-50" />
                            </div>
                            <h4 className="text-xs font-bold text-slate-900">{t.phone.chipSuccessTitle}</h4>
                            <p className="text-[8px] text-slate-400 font-semibold uppercase tracking-wider">{t.phone.chipSuccessMeta}</p>
                          </div>

                          <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 space-y-1.5 text-left text-[8px] font-medium text-slate-700">
                            <div className="flex items-center gap-1.5 border-b border-slate-100 pb-1">
                              <div className="w-6 h-6 bg-slate-200 rounded-md overflow-hidden shrink-0 flex items-center justify-center text-slate-400">
                                <User className="w-4.5 h-4.5" />
                              </div>
                              <div>
                                <p className="text-[9px] font-bold text-slate-900">{scannedData.firstName} {scannedData.lastName}</p>
                                <p className="text-[7px] text-slate-400">{scannedData.nationality}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                              <div>
                                <span className="text-slate-400 text-[6px] uppercase tracking-wider block">{t.phone.docId}</span>
                                <span className="font-mono text-slate-900">{scannedData.docNumber}</span>
                              </div>
                              <div>
                                <span className="text-slate-400 text-[6px] uppercase tracking-wider block">{t.phone.birthDate}</span>
                                <span className="font-mono text-slate-900">{scannedData.birthDate}</span>
                              </div>
                              <div>
                                <span className="text-slate-400 text-[6px] uppercase tracking-wider block">{t.phone.expires}</span>
                                <span className="font-mono text-slate-900">{scannedData.expiryDate}</span>
                              </div>
                              <div>
                                <span className="text-slate-400 text-[6px] uppercase tracking-wider block">{t.phone.signatureAa}</span>
                                <span className="text-emerald-600 font-semibold">{t.phone.validPki}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeStep === 3 && (
                    <div className="space-y-4 animate-in fade-in duration-300">
                      <div className="text-center space-y-1">
                        <div className="inline-flex p-1 bg-emerald-50 rounded-lg text-[#047857] mb-1">
                          <FileCheck className="w-5 h-5" />
                        </div>
                        <h4 className="text-xs font-bold text-slate-900">{t.phone.cryptoTitle}</h4>
                        <p className="text-[9px] text-slate-400">{t.phone.cryptoDesc}</p>
                      </div>

                      <div className="space-y-1.5">
                        {t.phone.diagnostics.map((chk) => (
                          <div key={chk.name} className="flex items-center justify-between p-1.5 bg-slate-50 rounded-lg border border-slate-100 text-[8px] font-semibold text-slate-700">
                            <span className="text-slate-500">{chk.name}</span>
                            <span className="text-emerald-600 font-mono text-[7px] bg-emerald-50 px-1 py-0.5 rounded">{chk.status}</span>
                          </div>
                        ))}
                      </div>

                      <div className="text-[7px] text-slate-400 font-mono bg-slate-100 p-1.5 rounded text-center">
                        {t.phone.secureHash}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center gap-1 text-[8px] text-slate-400 border-t border-slate-100 pt-2.5">
                  <Lock className="w-2.5 h-2.5 text-slate-400" />
                  <span>{t.phone.secureFooter}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold text-[#10B981] uppercase tracking-wider block">{t.keyFeatures.label}</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              {t.keyFeatures.title}
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              {t.keyFeatures.desc}
            </p>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {t.featureAccordions.map((feat, idx) => {
              const IconComponent = featureIcons[idx];
              const isExpanded = expandedAccordion === idx;
              return (
                <div
                  key={feat.title}
                  className={`border rounded-2xl bg-white transition-all overflow-hidden ${
                    isExpanded
                      ? 'border-[#10B981]/40 shadow-sm shadow-emerald-500/5'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                  id={`nfc_accordion_${idx}`}
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full flex items-center justify-between p-5 text-left gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                        isExpanded ? 'bg-[#10B981] text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base">{feat.title}</h4>
                        <p className="text-slate-400 text-xs mt-0.5 line-clamp-1">{feat.description}</p>
                      </div>
                    </div>
                    <div>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 pl-14 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="space-y-3">
                        <p className="text-slate-600 text-xs leading-relaxed">
                          {feat.description}
                        </p>
                        <p className="text-slate-500 text-xs leading-relaxed bg-[#EBF7F2] p-3 rounded-xl border border-[#10B981]/15">
                          <strong>{t.keyFeatures.technicalNote}</strong> {feat.details}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-[#FAFBFD] border-t border-b border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#354CE1] text-xs font-bold uppercase tracking-wider mb-2 block">{t.useCases.label}</span>
            <h2 className="font-display text-3xl font-bold text-slate-900 tracking-tight">{t.useCases.title}</h2>
            <p className="text-slate-500 text-xs mt-2">
              {t.useCases.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.useCases.cards.map((card, index) => {
              const UseCaseIcon = useCaseIcons[index];
              return (
                <div key={card.title} className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm space-y-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#10B981] flex items-center justify-center">
                    <UseCaseIcon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{card.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{t.learningTitle}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.articles.map((art) => (
            <div
              key={art.id}
              onClick={() => setActiveArticleId(art.id)}
              className="bg-white border border-slate-200/80 hover:border-[#10B981]/40 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all group flex flex-col justify-between p-6"
              id={`nfc_article_card_${art.id}`}
            >
              <div className="space-y-4">
                <div className={`w-full h-32 rounded-xl flex items-center justify-center relative overflow-hidden bg-gradient-to-br ${
                  art.id === 1
                    ? 'from-blue-500 via-indigo-600 to-[#354CE1]'
                    : art.id === 2
                    ? 'from-[#10B981] to-[#047857]'
                    : 'from-purple-500 via-indigo-500 to-indigo-600'
                }`}>
                  <div className="absolute top-2 right-2 px-2 py-0.5 bg-white/10 backdrop-blur-md rounded-md text-[8px] text-white font-mono">
                    {t.articleBadge}
                  </div>
                  <div className="text-white text-xs font-bold text-center p-4 truncate max-w-full">
                    {art.banner}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    <span>{art.category}</span>
                    <span>{t.modal.separator}</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#354CE1] transition line-clamp-3">
                    {art.title}
                  </h3>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-[#354CE1] transition mt-4">
                <span>{t.readArticle}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 border-t border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10 text-center md:text-left">
            <h2 className="font-display text-2xl font-bold text-slate-900 tracking-tight">{t.explore.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.explore.cards.map((card, index) => {
              const ExploreIcon = exploreIcons[index];
              return (
                <div
                  key={card.title}
                  onClick={() => onViewChange?.('government-id')}
                  className="bg-white hover:bg-slate-50/60 rounded-2xl p-8 border border-slate-200 shadow-sm cursor-pointer group flex items-start gap-4 transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl ${exploreIconStyles[index]} flex items-center justify-center shrink-0`}>
                    <ExploreIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-slate-900 text-lg ${exploreTextStyles[index]} transition`}>{card.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed mt-2">
                      {card.desc}
                    </p>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${exploreLinkStyles[index]} mt-4`}>
                      {t.explore.learnMore} <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-[#6366F1] text-white rounded-[32px] p-8 md:p-14 lg:p-16 relative overflow-hidden shadow-xl shadow-indigo-950/10">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-4">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-none">{t.cta.title}</h2>
            <p className="text-indigo-100 text-sm">
              {t.cta.desc}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onOpenSandbox}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-indigo-600 font-bold rounded-full text-sm shadow-md transition-all hover:shadow-lg"
              >
                <span>{t.cta.primary}</span>
                <ArrowRight className="w-4 h-4 text-indigo-600" />
              </button>
              <button
                onClick={onOpenSandbox}
                className="inline-flex items-center gap-1.5 px-6 py-3.5 text-white hover:text-indigo-100 font-bold text-sm transition"
              >
                <span>{t.cta.secondary}</span>
                <ArrowUpRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {activeArticle && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 sm:p-8 animate-in zoom-in-95 duration-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-[#10B981]/15 text-[#047857] text-[10px] font-bold tracking-wider uppercase rounded-full">
                  {activeArticle.category} {t.modal.separator} {activeArticle.readTime}
                </span>
                <button
                  onClick={() => setActiveArticleId(null)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
                >
                  {t.modal.close}
                </button>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight">
                {activeArticle.title}
              </h3>
              <div className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans border-t border-slate-100 pt-5">
                {activeArticle.content}
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setActiveArticleId(null)}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-full shadow-sm transition-all"
                >
                  {t.modal.goBack}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
