/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState } from 'react';
import { 
  ArrowRight, ShieldCheck, Users, Search, ClipboardCheck,
  Building, Building2, Landmark, RefreshCw, CheckCircle2,
  Network, AlertTriangle, ArrowLeft, Play, Sparkles, Check,
  Database, FileText, Settings, Globe, Shield, HelpCircle, ChevronDown, ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import {
  KYB_PAGE_DATA_TRANSLATIONS,
  KYB_PAGE_TRANSLATIONS
} from '../translations/KybPageTranslations';

interface KybPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

interface KybBusiness {
  name: string;
  jurisdiction: string;
  registryId: string;
  type: string;
  status: string;
  uboCount: number;
  complexity: string;
}

const KYB_SIMULATION_LOG_COUNT = 7;

export default function KybPage({ onOpenSandbox, onBackToLanding, onViewChange }: KybPageProps) {
  const { language } = useLanguage();
  const t = KYB_PAGE_TRANSLATIONS[language];
  const dataT = getLocalizedRecord(KYB_PAGE_DATA_TRANSLATIONS, language as keyof typeof KYB_PAGE_DATA_TRANSLATIONS, 'KYB_PAGE_DATA_TRANSLATIONS');
  const businesses = dataT.businesses;
  const kybFaqs = dataT.faqs;
  const testimonials = dataT.testimonials;
  const formatText = (template: string, values: Record<string, string | number>) =>
    Object.entries(values).reduce((result, [key, value]) => result.replaceAll(`{${key}}`, String(value)), template);

  // 1. Interactive Onboarding Simulator State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBusiness, setSelectedBusiness] = useState<KybBusiness | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);
  const kybSimulationLogSteps = React.useMemo(() => {
    if (!selectedBusiness) return [];

    return [
      formatText(t.copy.kybLogQuery, { jurisdiction: selectedBusiness.jurisdiction }),
      formatText(t.copy.kybLogRegistry, { registryId: selectedBusiness.registryId, status: selectedBusiness.status }),
      t.copy.kybLogExtract,
      t.copy.kybLogOwnership,
      formatText(t.copy.kybLogUbo, { uboCount: selectedBusiness.uboCount }),
      t.copy.kybLogWatchlist,
      t.copy.kybLogComplete
    ];
  }, [selectedBusiness, t]);
  const simDetails = kybSimulationLogSteps.slice(0, simulationStep);

  // 2. Interactive UBO Mapping State
  const [selectedUboNode, setSelectedUboNode] = useState<string>('root');

  // 3. Interactive Accordion (FAQ) State
  const [expandedFaq, setExpandedFaq] = useState<string | null>('ubo');

  // 4. Testimonial Index State
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  React.useEffect(() => {
    setIsSimulating(false);
    setSelectedBusiness(null);
    setSimulationStep(0);
    setSearchQuery('');
  }, [language]);

  const startKybSimulation = (biz: KybBusiness) => {
    setSelectedBusiness(biz);
    setIsSimulating(true);
    setSimulationStep(0);

    let currentStep = 0;
    const interval = setInterval(() => {
      setSimulationStep(currentStep + 1);
      currentStep++;
      if (currentStep >= KYB_SIMULATION_LOG_COUNT) {
        clearInterval(interval);
      }
    }, 1200);
  };

  const resetKybSimulation = () => {
    setIsSimulating(false);
    setSelectedBusiness(null);
    setSimulationStep(0);
    setSearchQuery('');
  };

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-slate-800 antialiased selection:bg-[#354CE1]/10 selection:text-[#354CE1]">
      
      {/* 1. Header Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-tr from-[#354CE1] via-[#5F3CF3] to-[#00D4B2] text-white pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)]" />
        <div className="absolute top-1/4 left-1/10 w-48 h-48 bg-yellow-400/25 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/10 w-72 h-72 bg-[#00E5FF]/20 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <button 
            onClick={onBackToLanding}
            className="group inline-flex items-center gap-2 text-blue-100 hover:text-white text-xs font-semibold mb-8 transition"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />{t.copy.backToPlatform}</button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-[11px] font-bold tracking-wider text-yellow-300 uppercase border border-white/25 shadow-sm">
                <Building2 className="w-3.5 h-3.5 text-yellow-300" />{t.copy.knowYourBusinessKyb}</div>
              <h1 className="text-3xl sm:text-4xl md:text-5.5xl font-sans font-semibold tracking-tight text-white leading-[1.1]">{t.copy.scaleAndAutomateGlobalBusinessVerification}</h1>
              <p className="text-base sm:text-lg text-white/90 max-w-xl font-normal leading-relaxed">{t.copy.instantlyVerifyCommercialEntitiesParseIntricateCorporateStructures}</p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={onOpenSandbox}
                  className="bg-white hover:bg-teal-50 text-[#354CE1] font-semibold text-sm px-7 py-3.5 rounded-full transition flex items-center justify-center gap-2 shadow-lg shadow-blue-950/20"
                >{t.copy.tryTheDemo}<ArrowRight className="w-4 h-4" />
                </button>

              </div>
            </div>

            {/* Simulated Live KYB Terminal */}
            <div className="lg:col-span-5">
              <div className="bg-slate-950/90 backdrop-blur-xl rounded-2xl border-2 border-[#354CE1]/50 p-5 shadow-[0_20px_50px_rgba(53,76,225,0.3)] relative overflow-hidden text-slate-200 font-mono text-xs">
                {/* Terminal Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="text-[10px] text-slate-500 ml-2">KYB_REGISTRY_CLIENT_v1.0</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20 font-semibold">
                    <Sparkles className="w-3 h-3 text-blue-400" />{t.copy.realTime}</div>
                </div>

                {!isSimulating ? (
                  <div className="space-y-4">
                    <p className="text-slate-400 text-xs">{t.copy.searchAndSimulateVerificationOfAnIncomingCustomer}</p>
                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder={t.copy.searchStandardEntities}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-950/50 rounded-xl py-2 pl-9 pr-4 text-white placeholder-slate-600 border border-slate-800 focus:outline-none focus:border-[#354CE1] transition text-xs font-sans"
                      />
                    </div>
                    
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {businesses.filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase())).map((biz, idx) => (
                        <button type="button"
                          key={idx}
                          onClick={() => startKybSimulation(biz)}
                          className="p-3 bg-slate-950/40 hover:bg-slate-800 border border-slate-800 rounded-xl transition cursor-pointer flex items-center justify-between"
                        >
                          <div>
                            <p className="text-xs font-semibold text-white font-sans">{biz.name}</p>
                            <p className="text-[10px] text-slate-500 mt-0.5">{biz.jurisdiction} &bull; {biz.type}</p>
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#354CE1] bg-[#354CE1]/10 px-2 py-0.5 rounded-md border border-[#354CE1]/20 font-sans">
                            <Play className="w-2.5 h-2.5 fill-[#354CE1]" />{t.copy.runKyb}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-slate-950/40 p-3 rounded-xl border border-slate-800">
                      <div>
                        <h4 className="text-xs font-bold text-white font-sans">{selectedBusiness?.name}</h4>
                        <p className="text-[10px] text-slate-500 font-sans mt-0.5">{selectedBusiness?.jurisdiction} {t.registryNumberPrefix}{selectedBusiness?.registryId}</p>
                      </div>
                      <span className="text-[10px] font-sans px-2.5 py-0.5 bg-slate-850 border border-slate-700 text-slate-300 rounded-full">
                        {selectedBusiness?.type}
                      </span>
                    </div>

                    <div className="space-y-1.5 min-h-[160px] max-h-[180px] overflow-y-auto pr-1">
                      {simDetails.map((step, idx) => (
                        <motion.div 
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          key={idx} 
                          className="flex items-start gap-2 text-[10px]"
                        >
                          <span className="text-[#354CE1] font-bold mt-0.5 select-none">&gt;</span>
                          <span className={idx === simDetails.length - 1 ? "text-white font-semibold" : "text-slate-400"}>{step}</span>
                        </motion.div>
                      ))}
                    </div>

                    {simulationStep < 7 ? (
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 pt-2 border-t border-slate-800">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-400" />
                        <span>{t.copy.verifyingBusinessStatusBeneficialOwners}</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                        <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-semibold font-sans">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>{t.copy.verificationSuccessful}</span>
                        </div>
                        <button
                          onClick={resetKybSimulation}
                          className="text-[10px] font-sans font-semibold text-slate-400 hover:text-white px-3 py-1 hover:bg-slate-800 border border-slate-800 rounded-lg transition"
                        >{t.copy.runAnother}</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Statistics Banner */}
      <section className="bg-white border-b border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <p className="text-3xl md:text-4xl font-sans font-semibold text-slate-900">150+</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{t.copy.countriesCovered}</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl md:text-4xl font-sans font-semibold text-[#354CE1]">30M+</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{t.copy.directRegistryIntegrations}</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl md:text-4xl font-sans font-semibold text-slate-900">&lt;60s</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{t.copy.avgVerificationTime}</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl md:text-4xl font-sans font-semibold text-[#354CE1]">92%</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{t.copy.automatedDirectMatchRate}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Beneficial Ownership Tree (UBO Explorer) */}
      <section className="py-20 md:py-24 bg-[#FAFBFD]">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E2E6FF] text-[#354CE1] text-[10px] font-bold tracking-wider rounded-full uppercase border border-[#354CE1]/20">
              <Network className="w-3.5 h-3.5 text-[#354CE1]" />{t.copy.ultimateBeneficialOwnership}</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-semibold text-slate-900 tracking-tight">{t.copy.instantlyResolveAndVerifyBeneficialOwnersUbos}</h2>
            <p className="text-sm md:text-base text-slate-500 leading-relaxed">{t.copy.identraQueriesRegistriesToIdentifyIndividualsWithDirect}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Ownership Visual Tree Panel */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between min-h-[420px]">
              <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.copy.interactiveCorporateChart}</span>
                  <h3 className="text-sm font-bold text-slate-900 mt-0.5">Stellar Technologies Inc. (U.S.)</h3>
                </div>
                <span className="px-2.5 py-0.5 bg-[#E2E6FF] text-[#354CE1] text-[10px] font-bold rounded-full">{t.copy.delawareRegistered}</span>
              </div>

              {/* Tree Diagram Area */}
              <div className="my-8 flex flex-col items-center gap-6 relative">
                {/* Root Entity Node */}
                <button 
                  onClick={() => setSelectedUboNode('root')}
                  className={`relative z-10 px-5 py-3 rounded-xl border transition flex flex-col items-center gap-1 w-60 text-center ${
                    selectedUboNode === 'root'
                      ? 'bg-[#354CE1] text-white border-[#354CE1] shadow-[0_4px_14px_rgba(53,76,225,0.4)] scale-102'
                      : 'bg-slate-50 text-slate-800 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  <Building className={`w-5 h-5 ${selectedUboNode === 'root' ? 'text-white' : 'text-[#354CE1]'}`} />
                  <span className="text-xs font-bold leading-tight">Stellar Technologies Inc.</span>
                  <span className="text-[9px] opacity-75 font-mono">{t.copy.customerBusiness}</span>
                </button>

                {/* Vertical Connector lines - Dynamic highlight */}
                <div className={`h-6 w-0.5 transition-colors duration-300 ${selectedUboNode !== 'root' ? 'bg-[#354CE1]' : 'bg-slate-200'}`} />

                <div className="grid grid-cols-2 gap-8 relative w-full max-w-lg">
                  {/* Horizontal Connector bar - Dynamic highlight */}
                  <div className={`absolute top-0 left-1/4 right-1/4 h-0.5 -translate-y-px transition-colors duration-300 ${
                    selectedUboNode === 'parent' || selectedUboNode === 'ubo_alex'
                      ? 'bg-[#6366F1]'
                      : selectedUboNode === 'ubo_elena'
                      ? 'bg-[#EC4899]'
                      : 'bg-slate-200'
                  }`} />

                  {/* Node 1: Parent Holding */}
                  <div className="flex flex-col items-center gap-4">
                    <div className={`h-4 w-0.5 transition-colors duration-300 ${
                      selectedUboNode === 'parent' || selectedUboNode === 'ubo_alex' ? 'bg-[#6366F1]' : 'bg-slate-200'
                    }`} />
                    <button 
                      onClick={() => setSelectedUboNode('parent')}
                      className={`relative z-10 px-4 py-2.5 rounded-xl border transition flex flex-col items-center gap-0.5 w-48 text-center ${
                        selectedUboNode === 'parent'
                          ? 'bg-[#6366F1] text-white border-[#6366F1] shadow-[0_4px_14px_rgba(99,102,241,0.4)] scale-102'
                          : 'bg-slate-50 text-slate-800 hover:bg-slate-100 border-slate-200'
                      }`}
                    >
                      <Building2 className={`w-4 h-4 ${selectedUboNode === 'parent' ? 'text-white' : 'text-[#354CE1]'}`} />
                      <span className="text-xs font-semibold leading-tight">Nova HoldCo Ltd (60%)</span>
                      <span className="text-[9px] opacity-75 font-mono">Cayman Parent Corp</span>
                    </button>

                    {/* Sub Connector */}
                    <div className={`h-4 w-0.5 transition-colors duration-300 ${selectedUboNode === 'ubo_alex' ? 'bg-[#06B6D4]' : 'bg-slate-200'}`} />
                    <button 
                      onClick={() => setSelectedUboNode('ubo_alex')}
                      className={`relative z-10 px-4 py-2 rounded-xl border transition flex flex-col items-center gap-0.5 w-40 text-center ${
                        selectedUboNode === 'ubo_alex'
                          ? 'bg-[#06B6D4] text-white border-[#06B6D4] shadow-[0_4px_14px_rgba(6,182,212,0.4)] scale-102'
                          : 'bg-slate-50 text-slate-800 hover:bg-slate-100 border-slate-200'
                      }`}
                    >
                      <Users className={`w-3.5 h-3.5 ${selectedUboNode === 'ubo_alex' ? 'text-white' : 'text-blue-500'}`} />
                      <span className="text-xs font-medium leading-tight">Alex Vance (60%)</span>
                      <span className="text-[9px] opacity-75 font-mono">{t.copy.indirectUbo36}</span>
                    </button>
                  </div>

                  {/* Node 2: Direct Owner */}
                  <div className="flex flex-col items-center gap-4">
                    <div className={`h-4 w-0.5 transition-colors duration-300 ${selectedUboNode === 'ubo_elena' ? 'bg-[#EC4899]' : 'bg-slate-200'}`} />
                    <button 
                      onClick={() => setSelectedUboNode('ubo_elena')}
                      className={`relative z-10 px-4 py-2.5 rounded-xl border transition flex flex-col items-center gap-0.5 w-48 text-center ${
                        selectedUboNode === 'ubo_elena'
                          ? 'bg-[#EC4899] text-white border-[#EC4899] shadow-[0_4px_14px_rgba(236,72,153,0.4)] scale-102'
                          : 'bg-slate-50 text-slate-800 hover:bg-slate-100 border-slate-200'
                      }`}
                    >
                      <Users className={`w-4 h-4 ${selectedUboNode === 'ubo_elena' ? 'text-white' : 'text-[#354CE1]'}`} />
                      <span className="text-xs font-semibold leading-tight">Elena Rostova (40%)</span>
                      <span className="text-[9px] opacity-75 font-mono">{t.copy.directUbo40}</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 flex items-center gap-2.5 text-xs text-slate-500 leading-normal">
                <AlertTriangle className="w-4.5 h-4.5 text-[#FFBF43] shrink-0" />
                <span>{t.copy.identraParsedACaymanIslandsRegistryFilingTo} <strong>Nova HoldCo Ltd</strong> {t.copy.andResolveItsUltimateBeneficialOwner} <strong>Alex Vance</strong>{t.copy.automatically}</span>
              </div>
            </div>

            {/* Selected Node Details Panel */}
            <div className="lg:col-span-5 bg-white text-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl border-2 border-[#354CE1]">
              <div className="space-y-6">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#354CE1] uppercase tracking-wider">
                  <ClipboardCheck className="w-4 h-4 text-[#354CE1]" />{t.copy.complianceVerificationCard}</div>

                {selectedUboNode === 'root' && (
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-lg font-bold text-slate-950">Stellar Technologies Inc.</h4>
                      <p className="text-xs text-slate-500">Registry: Delaware Secretary of State &bull; ID: 6812035</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="bg-[#F2F4FF] p-3 rounded-xl border border-[#354CE1]/15">
                        <p className="text-slate-500 text-[10px]">{t.copy.entityType}</p>
                        <p className="font-semibold mt-0.5 text-slate-900">C-Corporation</p>
                      </div>
                      <div className="bg-[#F2F4FF] p-3 rounded-xl border border-[#354CE1]/15">
                        <p className="text-slate-500 text-[10px]">{t.copy.stateFilingStatus}</p>
                        <p className="font-semibold mt-0.5 text-emerald-600">Active / Good Standing</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-[10px]">{t.copy.registryVerificationChecks}</p>
                      <div className="space-y-2">
                        {[
                          { check: 'Business Existence Verification', status: 'VERIFIED' },
                          { check: 'Filing Integrity & Active Status', status: 'PASS' },
                          { check: 'Adverse Media & Sanctions Screen', status: 'CLEARED' },
                          { check: 'Secretary of State (SOS) Direct Match', status: 'DIRECT MATCH' }
                        ].map((chk, i) => (
                          <div key={i} className="flex items-center justify-between text-xs py-2 border-b border-slate-100 last:border-0">
                            <span className="text-slate-700">{chk.check}</span>
                            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md border border-emerald-200">{chk.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {selectedUboNode === 'parent' && (
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-lg font-bold text-slate-950">Nova HoldCo Ltd</h4>
                      <p className="text-xs text-slate-500">Registry: Cayman Islands (CIRO) &bull; ID: CI-9903512</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="bg-[#F2F4FF] p-3 rounded-xl border border-[#354CE1]/15">
                        <p className="text-slate-500 text-[10px]">{t.copy.parentShareholder}</p>
                        <p className="font-semibold mt-0.5 text-slate-900">60% Equity Owner</p>
                      </div>
                      <div className="bg-[#F2F4FF] p-3 rounded-xl border border-[#354CE1]/15">
                        <p className="text-slate-500 text-[10px]">{t.copy.taxJurisdiction}</p>
                        <p className="font-semibold mt-0.5 text-slate-900">Cayman Islands</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-[10px]">{t.copy.regulatoryActions}</p>
                      <div className="space-y-2">
                        {[
                          { check: 'Foreign Shell Company Audit', status: 'PASSED' },
                          { check: 'Sanction Watchlist Screening', status: 'CLEARED' },
                          { check: 'FATCA & Tax Residency Check', status: 'COMPLIANT' }
                        ].map((chk, i) => (
                          <div key={i} className="flex items-center justify-between text-xs py-2 border-b border-slate-100 last:border-0">
                            <span className="text-slate-700">{chk.check}</span>
                            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md border border-emerald-200">{chk.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {selectedUboNode === 'ubo_alex' && (
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#E2E6FF] text-[#354CE1] flex items-center justify-center font-bold text-sm">
                        AV
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-950">Alex Vance</h4>
                        <p className="text-xs text-slate-500">UBO via Nova HoldCo (36% Indirect equity)</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="bg-[#F2F4FF] p-3 rounded-xl border border-[#354CE1]/15">
                        <p className="text-slate-500 text-[10px]">{t.copy.identifiedVia}</p>
                        <p className="font-semibold mt-0.5 text-slate-900">Cayman Registry Parser</p>
                      </div>
                      <div className="bg-[#F2F4FF] p-3 rounded-xl border border-[#354CE1]/15">
                        <p className="text-slate-500 text-[10px]">{t.copy.kycStatus}</p>
                        <p className="font-semibold mt-0.5 text-emerald-600">{t.copy.passed}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-[10px]">{t.copy.uboKycVerificationRecords}</p>
                      <div className="space-y-2">
                        {[
                          { check: 'Government ID Verification', status: 'MATCHED' },
                          { check: 'OFAC & Sanctions Check', status: 'CLEARED' },
                          { check: 'PEP (Politically Exposed) Check', status: 'NO MATCH' },
                          { check: 'Adverse Media Screening', status: 'CLEARED' }
                        ].map((chk, i) => (
                          <div key={i} className="flex items-center justify-between text-xs py-2 border-b border-slate-100 last:border-0">
                            <span className="text-slate-700">{chk.check}</span>
                            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md border border-emerald-200">{chk.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {selectedUboNode === 'ubo_elena' && (
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#E2E6FF] text-[#354CE1] flex items-center justify-center font-bold text-sm">
                        ER
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-950">Elena Rostova</h4>
                        <p className="text-xs text-slate-500">Direct Shareholder (40% Equity)</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="bg-[#F2F4FF] p-3 rounded-xl border border-[#354CE1]/15">
                        <p className="text-slate-500 text-[10px]">{t.copy.identifiedVia}</p>
                        <p className="font-semibold mt-0.5 text-slate-900">Delaware SOS Registry</p>
                      </div>
                      <div className="bg-[#F2F4FF] p-3 rounded-xl border border-[#354CE1]/15">
                        <p className="text-slate-500 text-[10px]">{t.copy.kycStatus}</p>
                        <p className="font-semibold mt-0.5 text-emerald-600">{t.copy.passed}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-[10px]">{t.copy.uboKycVerificationRecords}</p>
                      <div className="space-y-2">
                        {[
                          { check: 'Passport & Selfie Match', status: 'VERIFIED' },
                          { check: 'OFAC Sanctions & Watchlists', status: 'CLEARED' },
                          { check: 'PEP Database Screening', status: 'NO MATCH' },
                          { check: 'FinCEN Beneficial Ownership filing', status: 'FILED' }
                        ].map((chk, i) => (
                          <div key={i} className="flex items-center justify-between text-xs py-2 border-b border-slate-100 last:border-0">
                            <span className="text-slate-700">{chk.check}</span>
                            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md border border-emerald-200">{chk.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <p className="text-[11px] text-slate-400">{t.copy.discoveredViaAutomatedParsing}</p>
                <button
                  onClick={onOpenSandbox}
                  className="text-xs font-bold text-[#354CE1] hover:text-[#2539BE] flex items-center gap-1 group/btn"
                >
                  <span>{t.copy.testLiveFlow}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Complete Solutions & Capabilities Section */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-5">
              <span className="text-[#354CE1] text-xs font-bold uppercase tracking-wider">{t.copy.modularPillars}</span>
              <h3 className="text-2xl sm:text-3xl font-sans font-semibold text-slate-900 tracking-tight leading-snug">{t.copy.theModernToolkitForCommercialVerification}</h3>
              <p className="text-sm md:text-base text-slate-500 leading-relaxed">{t.copy.legacyBusinessVerificationDependsOnStaticReportsAnd}</p>
              <div className="pt-2">
                <button
                  onClick={onOpenSandbox}
                  className="bg-[#354CE1] hover:bg-[#2539BE] text-white font-semibold text-xs px-5 py-3 rounded-full flex items-center gap-1.5 transition shadow"
                >{t.copy.exploreDeveloperApi}<ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: Database,
                  title: 'Real-time Registries',
                  desc: 'Fetch current status, tax registries, and corporate filings directly from Secretary of State and national government portals instantly.'
                },
                {
                  icon: Network,
                  title: 'Automated UBO Maps',
                  desc: 'Automatically crawl holding companies, extract ultimate beneficial owners, and determine percentage of ownership in seconds.'
                },
                {
                  icon: Globe,
                  title: '150+ Global Jurisdictions',
                  desc: 'Run business onboarding universally. Localized compliance translation ensures international registries parse seamlessly.'
                },
                {
                  icon: ShieldCheck,
                  title: 'Unified KYC + KYB',
                  desc: 'Merge consumer-grade KYC checks for beneficial owners with corporate verification in a single customer dossier.'
                }
              ].map((cap, i) => {
                const IconComponent = cap.icon;
                return (
                  <div key={i} className="p-5 rounded-2xl bg-[#FAFBFD] border border-slate-100 space-y-3 transition hover:border-[#354CE1]/40">
                    <div className="w-10 h-10 rounded-xl bg-[#E2E6FF] text-[#354CE1] flex items-center justify-center shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{cap.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{cap.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Custom Workflow & Logic Simulator */}
      <section className="py-20 md:py-24 bg-[#FAFBFD]">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <span className="text-[#354CE1] text-xs font-bold uppercase tracking-wider">{t.copy.dynamicRouting}</span>
              <h3 className="text-2xl sm:text-3xl font-sans font-semibold text-slate-900 tracking-tight leading-snug">{t.copy.aKybPolicyThatAdaptsAsFastAs}</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{t.copy.configureYourBusinessPolicyRulesToDynamicallyBranch}</p>
            </div>
            <button
              onClick={onOpenSandbox}
              className="text-xs font-bold text-[#354CE1] hover:text-[#2539BE] bg-[#F2F4FF] hover:bg-[#E2E6FF] px-4 py-2.5 rounded-full transition self-start md:self-auto shrink-0"
            >{t.copy.seeWorkflowEditor}</button>
          </div>

          {/* Interactive Flow Builder Mockup */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Logic Tree Builder (Col-span-7) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.copy.activePolicyGlobalMerchantOnboarding}</span>
                <span className="px-2 py-0.5 bg-[#E2E6FF] border border-[#354CE1]/20 text-[#354CE1] text-[9px] font-bold rounded-md">{t.copy.deployedV42}</span>
              </div>

              {/* Graphical logic boxes */}
              <div className="space-y-4 font-sans text-xs">
                {/* Trigger box */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-md bg-slate-900 text-white flex items-center justify-center font-bold text-[10px]">IN</span>
                    <div>
                      <p className="font-semibold text-slate-800">{t.copy.newBusinessRegistration}</p>
                      <p className="text-[10px] text-slate-400">{t.copy.triggeredUponMerchantSignupFormSubmission}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400">{t.copy.trigger}</span>
                </div>

                {/* Arrow */}
                <div className="flex justify-center"><div className="w-0.5 h-4 bg-slate-300" /></div>

                {/* Registry Query box */}
                <div className="p-3 bg-[#EEF2FF] rounded-xl border border-[#D9E0FF] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Database className="w-5 h-5 text-[#354CE1]" />
                    <div>
                      <p className="font-semibold text-[#354CE1]">{t.copy.secretaryOfStateRegistryVerification}</p>
                      <p className="text-[10px] text-slate-500">{t.copy.extractFilingsStatusCorporateOfficersAndTaxIds}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400">{t.copy.step1}</span>
                </div>

                {/* Arrow */}
                <div className="flex justify-center"><div className="w-0.5 h-4 bg-slate-300" /></div>

                {/* Condition Split */}
                <div className="p-4 bg-gradient-to-tr from-[#354CE1] to-[#7C3AED] text-white rounded-xl border border-indigo-400/30 space-y-3 shadow-[0_10px_25px_rgba(53,76,225,0.2)]">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[10px] tracking-wider text-[#00E5FF] uppercase">{t.copy.decisionTree}</span>
                    <Settings className="w-4 h-4 text-white/75" />
                  </div>
                  <p className="font-semibold text-xs text-white">{t.copy.evaluateEntityComplexityJurisdiction}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                    <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 space-y-1">
                      <p className="font-bold text-[9px] text-blue-200">{t.copy.lowComplexity}</p>
                      <p className="font-medium text-[10px] text-white">{t.copy.soleProprietorship}</p>
                      <p className="text-[9px] text-[#00FFCC] mt-1 flex items-center gap-1 font-semibold">
                        <Check className="w-3 h-3" />{t.copy.autoApprove}</p>
                    </div>

                    <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 space-y-1">
                      <p className="font-bold text-[9px] text-blue-200">{t.copy.mediumComplexity}</p>
                      <p className="font-medium text-[10px] text-white">Corp / LLC (U.S.)</p>
                      <p className="text-[9px] text-[#38BDF8] mt-1 flex items-center gap-1 font-semibold">
                        <Users className="w-3 h-3" />{t.copy.individualKyc}</p>
                    </div>

                    <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 space-y-1">
                      <p className="font-bold text-[9px] text-blue-200">{t.copy.highForeign}</p>
                      <p className="font-medium text-[10px] text-white">Cayman / Shell / PEP</p>
                      <p className="text-[9px] text-[#FFD700] mt-1 flex items-center gap-1 font-semibold">
                        <AlertTriangle className="w-3 h-3" />{t.copy.manualReview}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Explanation card (Col-span-5) */}
            <div className="lg:col-span-5 bg-[#FAFBFD] rounded-2xl border border-slate-200/60 p-6 space-y-5">
              <h4 className="font-bold text-slate-900 text-sm">{t.copy.flexibleBusinessOrchestration}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{t.copy.withIdentraYouDontBuyARigidDatabase}</p>
              
              <ul className="space-y-3.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#354CE1] shrink-0 mt-0.5" />
                  <span><strong>{t.copy.automaticUboOutreach}</strong> {t.copy.instantlyEmailBeneficialOwnersVerificationLinksWithoutManual}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#354CE1] shrink-0 mt-0.5" />
                  <span><strong>{t.copy.globalTaxValidation}</strong> {t.copy.instantlyCrossVerifyEinTinVatAndInternational}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#354CE1] shrink-0 mt-0.5" />
                  <span><strong>{t.copy.continuousRiskMonitoring}</strong> {t.copy.screenActiveMerchantPortfoliosDailyForNewlyFiled}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Success Stories / Testimonials */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-[#354CE1] text-xs font-bold uppercase tracking-wider">{t.copy.successStories}</span>
            <h3 className="text-2xl md:text-3xl font-sans font-semibold text-slate-900 tracking-tight">{t.copy.trustedByScalingMerchantsAndFinancialLeaders}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((test, idx) => (
              <div 
                key={idx} 
                className="p-8 rounded-2xl border border-slate-100 bg-[#FAFBFD] flex flex-col justify-between space-y-6 transition hover:border-[#354CE1]/25"
              >
                <p className="text-slate-600 italic text-sm md:text-base leading-relaxed">
                  "{test.quote}"
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{test.author}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{test.role}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#354CE1] bg-[#E2E6FF] border border-[#354CE1]/20 px-2.5 py-1 rounded-full uppercase">
                      {test.metric}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQs Accordion */}
      <section className="py-20 md:py-24 bg-[#FAFBFD]">
        <div className="max-w-3xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <h3 className="text-2xl md:text-3xl font-sans font-semibold text-slate-900 tracking-tight">{t.copy.frequentlyAskedQuestions}</h3>
            <p className="text-xs sm:text-sm text-slate-500">{t.copy.everythingYouNeedToKnowAboutSettingUp}</p>
          </div>

          <div className="space-y-4">
            {kybFaqs.map((faq) => (
              <div 
                key={faq.id} 
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm transition"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-sans font-semibold text-slate-800 text-sm md:text-base hover:text-[#354CE1] transition"
                >
                  <span>{faq.question}</span>
                  {expandedFaq === faq.id && (
                    <ChevronUp className="w-4 h-4 text-[#354CE1] shrink-0" />
                  )}
                  {expandedFaq !== faq.id && (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                <AnimatePresence>
                  {expandedFaq === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-6 text-xs md:text-sm text-slate-500 leading-relaxed border-t border-slate-50 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Call to Action Footer */}
      <section className="bg-gradient-to-tr from-[#354CE1] via-[#5F3CF3] to-[#00D4B2] text-white py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.25),transparent_50%)]" />
        <div className="max-w-3xl mx-auto px-6 relative z-10 space-y-6">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-sans font-semibold text-white tracking-tight">{t.copy.readyToStreamlineYourBusinessOnboarding}</h3>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-xl mx-auto">{t.copy.designCompliantFrictionFreeKybVerificationPathsThat}</p>
          <div className="pt-2 flex items-center justify-center gap-4">
            <button
              onClick={onOpenSandbox}
              className="bg-white hover:bg-blue-50 text-[#354CE1] font-bold text-xs px-6 py-3.5 rounded-full transition shadow"
            >{t.copy.tryTheDemo}</button>

          </div>
        </div>
      </section>

    </div>
  );
}
