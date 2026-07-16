/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ArrowRight, Check, Database, Shield, Users, Globe, 
  Search, CheckCircle, Eye, Activity, FileText, Settings, 
  AlertOctagon, HelpCircle, ArrowRightCircle, Sparkles, AlertCircle,
  ExternalLink, Layers, UserCheck, MapPin, Phone, Mail, FileSearch, FileCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { PROFILE_REPORT_TRANSLATIONS } from '../translations/ProfileReportPageTranslations';

interface ProfileReportPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

// Sample mock profiles for the interactive corroboration simulator
const PRESET_PROFILES = [
  {
    id: '1',
    name: 'Alexander Chen',
    dob: '1988-11-12',
    partialZip: '94110',
    fullProfile: {
      fullName: 'Alexander Raymond Chen',
      dob: 'Nov 12, 1988',
      age: 37,
      ssnLastFour: '4092',
      addresses: [
        { street: '842 Valencia St, Apt 4B', city: 'San Francisco', state: 'CA', zip: '94110', status: 'Primary (Verified)' },
        { street: '1105 Pine St', city: 'Seattle', state: 'WA', zip: '98101', status: 'Historical' }
      ],
      phones: [
        { number: '+1 (415) 555-0192', carrier: 'Verizon Wireless', type: 'Mobile', active: 'Yes' }
      ],
      emails: [
        { address: 'alex.chen@innovate.co', status: 'Valid', deliverable: 'Yes' }
      ],
      riskChecks: {
        deceased: 'passed',
        syntheticId: 'low',
        ofacPep: 'No matches',
        ofacStatus: 'clear'
      }
    }
  },
  {
    id: '2',
    name: 'Elena Rostova',
    dob: '1992-04-23',
    partialZip: '10012',
    fullProfile: {
      fullName: 'Elena Marie Rostova',
      dob: 'Apr 23, 1992',
      age: 34,
      ssnLastFour: '7821',
      addresses: [
        { street: '312 Bleecker St', city: 'New York', state: 'NY', zip: '10012', status: 'Primary (Verified)' }
      ],
      phones: [
        { number: '+1 (646) 555-8911', carrier: 'T-Mobile USA', type: 'Mobile', active: 'Yes' }
      ],
      emails: [
        { address: 'e.rostova@designhaus.io', status: 'Valid', deliverable: 'Yes' }
      ],
      riskChecks: {
        deceased: 'passed',
        syntheticId: 'low',
        ofacPep: 'No matches',
        ofacStatus: 'clear'
      }
    }
  },
  {
    id: '3',
    name: 'Marcus Vance',
    dob: '1975-08-30',
    partialZip: '60611',
    fullProfile: {
      fullName: 'Marcus Aurelius Vance',
      dob: 'Aug 30, 1975',
      age: 50,
      ssnLastFour: '1130',
      addresses: [
        { street: '505 N Michigan Ave', city: 'Chicago', state: 'IL', zip: '60611', status: 'Primary (Verified)' },
        { street: '1802 Peachtree Rd', city: 'Atlanta', state: 'GA', zip: '30309', status: 'Historical' }
      ],
      phones: [
        { number: '+1 (312) 555-4301', carrier: 'AT&T Mobility', type: 'Mobile', active: 'Yes' }
      ],
      emails: [
        { address: 'mvance@vanceholdings.com', status: 'Valid', deliverable: 'Yes' }
      ],
      riskChecks: {
        deceased: 'passed',
        syntheticId: 'medium',
        ofacPep: 'No matches',
        ofacStatus: 'clear'
      }
    }
  }
];

export default function ProfileReportPage({ onOpenSandbox, onBackToLanding, onViewChange }: ProfileReportPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(PROFILE_REPORT_TRANSLATIONS, language as keyof typeof PROFILE_REPORT_TRANSLATIONS, 'PROFILE_REPORT_TRANSLATIONS');
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('1');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationProgress, setSimulationProgress] = useState<number>(0);
  const [simulationCompleted, setSimulationCompleted] = useState<boolean>(true);
  
  const currentPreset = PRESET_PROFILES.find(p => p.id === selectedPresetId) || PRESET_PROFILES[0];

  // Start the identity corroboration simulation when switching presets
  const triggerSimulation = (presetId: string) => {
    setSelectedPresetId(presetId);
    setIsSimulating(true);
    setSimulationProgress(0);
    setSimulationCompleted(false);
  };

  useEffect(() => {
    let interval: any;
    if (isSimulating) {
      interval = setInterval(() => {
        setSimulationProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsSimulating(false);
            setSimulationCompleted(true);
            return 100;
          }
          return prev + 10;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isSimulating]);

  return (
    <div className="bg-[#FAFBFD] pb-16">
      {/* Saffron-Themed Interactive Hero Section */}
      <section className="relative overflow-hidden bg-[#F2A122] text-white pt-16 pb-20 px-6">
        {/* Subtle decorative background grids */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-200 rounded-full blur-3xl opacity-20" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb / Back button */}
          <button 
            onClick={onBackToLanding}
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-50 hover:text-white transition mb-8 bg-amber-800/10 hover:bg-amber-800/20 px-3.5 py-2 rounded-full border border-white/10"
            id="profile-report-back-btn"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.backToPlatform}</span>
          </button>

          {/* Hero Content layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-12 space-y-6">
              {/* Product Badge */}
              <div className="inline-flex items-center gap-2 bg-amber-950/10 border border-white/20 px-3.5 py-1.5 rounded-full" id="profile-report-badge">
                <UserCheck className="w-4 h-4 text-amber-100" />
                <span className="text-xs font-semibold text-amber-50 uppercase tracking-wider">{t.reports}</span>
                <span className="text-[10px] text-amber-100 bg-amber-950/30 px-1.5 py-0.5 rounded-md font-bold font-mono">{t.profileReport}</span>
              </div>

              <h1 className="text-4xl md:text-[54px] font-display font-bold leading-[1.1] tracking-tight max-w-4xl" id="profile-report-title">
                {t.heroTitle}
              </h1>

              <p className="text-lg md:text-xl text-amber-50 max-w-2xl font-light leading-relaxed">
                {t.heroDesc}
              </p>

              <div className="pt-4">
                <button 
                  onClick={onOpenSandbox}
                  className="bg-white hover:bg-amber-50 text-[#F2A122] font-semibold px-6 py-3.5 rounded-full text-sm shadow-md transition flex items-center gap-2 group"
                  id="profile-report-demo-btn"
                >
                  <span>{t.getDemo}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </button>
              </div>
            </div>
          </div>

          {/* Under Hero: 3 feature pillars */}
          <div className="mt-16 pt-8 border-t border-white/20 grid grid-cols-1 md:grid-cols-3 gap-8" id="profile-report-pillars">
            {t.pillars.map((pillar: any) => (
              <div key={pillar.title} className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-200" />
                  <span>{pillar.title}</span>
                </h3>
                <p className="text-xs text-amber-50 leading-relaxed font-light">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* "{t.howItWorks}" Interactive Stepper Section */}
      <section className="max-w-7xl mx-auto px-6 py-20" id="profile-report-how-it-works">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-3xl font-display font-bold text-slate-900">{t.howItWorks}</h2>
        </div>

        {/* Dynamic Stepper controls */}
        <div className="flex justify-center border-b border-slate-200 pb-4 mb-8 overflow-x-auto scrollbar-none gap-8 md:gap-12 text-sm font-medium">
          {t.steps.map((step: any) => (
            <button
              key={step.num}
              onClick={() => setActiveStep(step.num)}
              className={`pb-4 relative transition flex items-center gap-2 shrink-0 ${
                activeStep === step.num
                  ? 'text-slate-900 font-bold border-b-2 border-[#F2A122]'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
              id={`how-step-tab-${step.num}`}
            >
              <span>{step.label}</span>
            </button>
          ))}
        </div>

        {/* Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-8">
          
          {/* Left panel: Explanations and preset selectors */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8">
            <div>
              {activeStep === 1 && (
                <div className="space-y-4">
                  <div className="bg-amber-100/50 text-[#F2A122] px-3 py-1 rounded-full text-xs font-bold w-fit">
                    {t.steps[0].badge}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{t.steps[0].title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {t.steps[0].desc}
                  </p>
                  
                  <div className="pt-4 space-y-3">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      {t.selectPreset}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {PRESET_PROFILES.map(p => (
                        <button
                          key={p.id}
                          onClick={() => triggerSimulation(p.id)}
                          className={`p-2.5 rounded-xl border text-left transition text-xs flex flex-col justify-between ${
                            selectedPresetId === p.id 
                              ? 'bg-amber-50 border-[#F2A122] text-amber-950 font-semibold shadow-sm'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span className="truncate">{p.name}</span>
                          <span className="text-[10px] text-slate-400 font-normal mt-1">{p.dob}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-4 text-xs text-amber-900 leading-relaxed flex gap-3">
                    <Sparkles className="w-4 h-4 text-[#F2A122] shrink-0 mt-0.5" />
                    <div>
                      <strong>{t.conversionBoostLabel}</strong> {t.conversionBoostText} <strong>35%</strong>. {t.conversionBoostSuffix}
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="space-y-4">
                  <div className="bg-amber-100/50 text-[#F2A122] px-3 py-1 rounded-full text-xs font-bold w-fit">
                    {t.steps[1].badge}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{t.steps[1].title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {t.steps[1].desc}
                  </p>
                  
                  <div className="space-y-3 pt-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-medium">{t.resolvingStatus}</span>
                      <span className="text-[#F2A122] font-bold font-mono">
                        {isSimulating ? `${simulationProgress}%` : t.ready}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#F2A122] h-full transition-all duration-100"
                        style={{ width: `${simulationProgress}%` }}
                      />
                    </div>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-xs text-emerald-950 leading-relaxed flex gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>{t.authoritativeLabel}</strong> {t.authoritativeText}
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 3 && (
                <div className="space-y-4">
                  <div className="bg-amber-100/50 text-[#F2A122] px-3 py-1 rounded-full text-xs font-bold w-fit">
                    {t.steps[2].badge}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{t.steps[2].title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {t.steps[2].desc}
                  </p>

                  <div className="bg-slate-100 border border-slate-200 rounded-xl p-4 space-y-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">{t.riskPreview}</span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-white p-2 rounded-lg border border-slate-150">
                        <span className="text-slate-400 block text-[10px]">{t.deceasedCheck}</span>
                        <span className="font-semibold text-emerald-600">{t.passed}</span>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-slate-150">
                        <span className="text-slate-400 block text-[10px]">{t.syntheticIdCheck}</span>
                        <span className="font-semibold text-slate-700">
                          {currentPreset.fullProfile.riskChecks.syntheticId === 'medium' ? t.mediumRisk : t.lowRisk}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-xs text-amber-900 leading-relaxed flex gap-3">
                    <AlertCircle className="w-4 h-4 text-[#F2A122] shrink-0 mt-0.5" />
                    <div>
                      <strong>{t.interactiveSandboxLabel}</strong> {t.interactiveSandboxText}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Stepper progress buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                disabled={activeStep === 1}
                className={`text-xs font-bold flex items-center gap-1.5 px-3 py-2 rounded-lg transition ${
                  activeStep === 1 
                    ? 'text-slate-300 cursor-not-allowed' 
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t.prevStep}</span>
              </button>
              
              <div className="flex gap-1">
                {[1, 2, 3].map(num => (
                  <span 
                    key={num}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeStep === num ? 'bg-[#F2A122] w-4' : 'bg-slate-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => {
                  if (activeStep < 3) {
                    setActiveStep(prev => prev + 1);
                  } else {
                    onOpenSandbox();
                  }
                }}
                className="text-xs font-bold text-[#F2A122] hover:bg-amber-50 px-3.5 py-2 rounded-lg transition flex items-center gap-1.5"
              >
                <span>{activeStep === 3 ? t.launchSandbox : t.nextStep}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right panel: Saffron-themed visual Device / Mockup simulator */}
          <div className="lg:col-span-7 bg-[#F2A122]/10 border border-[#F2A122]/20 rounded-3xl p-6 md:p-8 flex flex-col justify-center items-center relative overflow-hidden min-h-[480px]">
            {/* Background circular accents */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />

            {/* Saffron Device Mockup wrapper */}
            <div className="w-full max-w-sm bg-white rounded-[2.5rem] shadow-2xl border-[8px] border-slate-900 overflow-hidden flex flex-col relative z-10 aspect-[9/16]">
              {/* Phone Status bar */}
              <div className="bg-slate-900 text-white/80 px-6 py-2 text-[10px] font-mono flex justify-between items-center shrink-0">
                <span>09:41</span>
                <div className="w-20 h-4 bg-black rounded-b-xl absolute top-0 left-1/2 -translate-x-1/2" />
                <div className="flex gap-1 items-center">
                  <span>{t.networkLabel}</span>
                  <div className="w-4 h-2 bg-white/80 rounded-sm" />
                </div>
              </div>

              {/* Identra Mock Client Header */}
              <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center gap-2 shrink-0">
                <div className="w-5 h-5 rounded-full bg-[#F2A122] flex items-center justify-center text-white font-bold text-[10px]">
                  {t.identraInitial}
                </div>
                <span className="text-xs font-bold text-slate-800">{t.identraVerification}</span>
                <span className="text-[9px] text-slate-400 ml-auto bg-slate-200 px-1.5 py-0.5 rounded">{t.secure}</span>
              </div>

              {/* Dynamic Simulated Screens based on Active Step */}
              <div className="flex-1 overflow-y-auto p-4 bg-slate-50 text-slate-800 flex flex-col justify-between">
                
                {/* Simulated Step 1: User Inputting Partial PII */}
                {activeStep === 1 && (
                  <div className="space-y-4 my-auto">
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-[#F2A122]">
                        <UserCheck className="w-6 h-6" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{t.confirmIdentity}</h4>
                      <p className="text-[11px] text-slate-500">{t.confirmIdentityDesc}</p>
                    </div>

                    <div className="space-y-2.5">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-1">{t.fullLegalName}</label>
                        <div className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 font-medium">
                          {currentPreset.name}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-1">{t.dateOfBirth}</label>
                          <div className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 font-mono">
                            {currentPreset.dob}
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-1">{t.zipPostal}</label>
                          <div className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 font-mono">
                            {currentPreset.partialZip}
                          </div>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => setActiveStep(2)}
                      className="w-full bg-[#F2A122] hover:bg-[#d98a13] text-white text-xs font-bold py-2.5 rounded-xl transition shadow-sm mt-4 flex items-center justify-center gap-1"
                    >
                      <span>{t.continueSecurely}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Simulated Step 2: Live Database Corroboration Engine */}
                {activeStep === 2 && (
                  <div className="space-y-4 my-auto">
                    {!simulationCompleted ? (
                      <div className="text-center space-y-4 py-8">
                        <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                          <div className="absolute inset-0 rounded-full border-4 border-amber-100 border-t-[#F2A122] animate-spin" />
                          <Database className="w-6 h-6 text-[#F2A122]" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-slate-900">{t.resolvingIdentity}</h4>
                          <p className="text-[10px] text-slate-400">{t.queryingRecords}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-150 p-2.5 rounded-xl">
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                          <div className="text-[10px] text-emerald-950">
                            <span className="font-bold block">{t.recordResolved}</span>
                            <span>{t.associatedWith} {currentPreset.fullProfile.fullName}</span>
                          </div>
                        </div>

                        <div className="space-y-2 bg-white rounded-xl border border-slate-200 p-3 text-xs">
                          <span className="text-[9px] font-bold text-[#F2A122] uppercase tracking-wider block">{t.resolvedReport}</span>
                          
                          <div className="space-y-2 font-sans">
                            <div className="border-b border-slate-100 pb-1.5">
                              <span className="text-[9px] text-slate-400 block">{t.fullResolvedName}</span>
                              <span className="font-semibold text-slate-800">{currentPreset.fullProfile.fullName}</span>
                            </div>
                            
                            <div className="border-b border-slate-100 pb-1.5 flex justify-between">
                              <div>
                                <span className="text-[9px] text-slate-400 block">{t.resolvedAgeDob}</span>
                                <span className="font-semibold text-slate-800">{currentPreset.fullProfile.dob} ({currentPreset.fullProfile.age} {t.years})</span>
                              </div>
                              <div className="text-right">
                                <span className="text-[9px] text-slate-400 block">{t.ssnLast4}</span>
                                <span className="font-semibold text-slate-800 font-mono">***-**-{currentPreset.fullProfile.ssnLastFour}</span>
                              </div>
                            </div>

                            <div className="border-b border-slate-100 pb-1.5">
                              <span className="text-[9px] text-slate-400 block flex items-center gap-1">
                                <MapPin className="w-2.5 h-2.5 text-[#F2A122]" /> {t.primaryAddressMatch}
                              </span>
                              <span className="font-medium text-slate-700 text-[11px]">
                                {currentPreset.fullProfile.addresses[0].street}, {currentPreset.fullProfile.addresses[0].city}, {currentPreset.fullProfile.addresses[0].state} {currentPreset.fullProfile.addresses[0].zip}
                              </span>
                            </div>

                            <div className="border-b border-slate-100 pb-1.5 flex justify-between">
                              <div>
                                <span className="text-[9px] text-slate-400 block flex items-center gap-1">
                                  <Phone className="w-2.5 h-2.5 text-[#F2A122]" /> {t.phoneCheck}
                                </span>
                                <span className="font-medium text-slate-700 text-[10px]">{currentPreset.fullProfile.phones[0].number}</span>
                              </div>
                              <div className="text-right">
                                <span className="text-[9px] text-slate-400 block">{t.carrierMatch}</span>
                                <span className="font-medium text-emerald-600 text-[10px]">{currentPreset.fullProfile.phones[0].carrier}</span>
                              </div>
                            </div>

                            <div>
                              <span className="text-[9px] text-slate-400 block flex items-center gap-1">
                                <Mail className="w-2.5 h-2.5 text-[#F2A122]" /> {t.emailCheck}
                              </span>
                              <span className="font-medium text-slate-700 text-[10px]">{currentPreset.fullProfile.emails[0].address}</span>
                            </div>
                          </div>
                        </div>

                        <button 
                          onClick={() => setActiveStep(3)}
                          className="w-full bg-slate-900 hover:bg-black text-white text-xs font-bold py-2 rounded-lg transition text-center"
                        >
                          {t.viewRiskIndicators}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Simulated Step 3: Conduct EDD / Risk Decision Screen */}
                {activeStep === 3 && (
                  <div className="space-y-4 my-auto">
                    <div className="space-y-2">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block text-center">{t.reportDecision}</span>
                      
                      {/* Risk Gauge */}
                      <div className="bg-slate-900 text-white rounded-xl p-3 flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="text-[9px] text-slate-400 uppercase block">{t.riskAssessment}</span>
                          <span className={`text-xs font-bold ${
                            currentPreset.fullProfile.riskChecks.syntheticId === 'medium' ? 'text-amber-400' : 'text-emerald-400'
                          }`}>
                            {currentPreset.fullProfile.riskChecks.syntheticId === 'medium' ? t.mediumRisk : t.lowRisk}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] text-slate-400 uppercase block">{t.decisionSuggestion}</span>
                          <span className="text-xs font-bold font-mono">
                            {currentPreset.fullProfile.riskChecks.syntheticId === 'medium' ? t.manualReview : t.autoApprove}
                          </span>
                        </div>
                      </div>

                      {/* Detail Checklist */}
                      <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100 overflow-hidden text-xs">
                        <div className="p-2.5 flex justify-between items-center bg-slate-50/50">
                          <span className="font-semibold text-slate-800">{t.riskChecklist}</span>
                          <span className="text-[10px] text-[#F2A122] font-semibold">{t.activeChecks}</span>
                        </div>
                        
                        <div className="p-2.5 flex justify-between items-center">
                          <span className="text-slate-600">{t.deceasedDatabaseCheck}</span>
                          <span className="text-emerald-600 font-bold flex items-center gap-1 text-[11px]">
                            <Check className="w-3.5 h-3.5" /> {t.clear}
                          </span>
                        </div>

                        <div className="p-2.5 flex justify-between items-center">
                          <span className="text-slate-600">{t.syntheticAnalytics}</span>
                          <span className={`font-bold flex items-center gap-1 text-[11px] ${
                            currentPreset.fullProfile.riskChecks.syntheticId === 'medium' ? 'text-amber-600' : 'text-emerald-600'
                          }`}>
                            {currentPreset.fullProfile.riskChecks.syntheticId === 'medium' ? t.flaggedDiscrepancy : t.highConfidence}
                          </span>
                        </div>

                        <div className="p-2.5 flex justify-between items-center">
                          <span className="text-slate-600">{t.globalWatchlist}</span>
                          <span className="text-emerald-600 font-bold flex items-center gap-1 text-[11px]">
                            <Check className="w-3.5 h-3.5" /> {t.clear}
                          </span>
                        </div>

                        <div className="p-2.5 flex justify-between items-center">
                          <span className="text-slate-600">{t.corroborationDepth}</span>
                          <span className="text-slate-700 font-mono text-[11px]">{t.multipleDatabases}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => triggerSimulation(selectedPresetId)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold py-2.5 rounded-xl transition text-center border border-slate-200"
                      >
                        {t.resetDemo}
                      </button>
                      <button 
                        onClick={onOpenSandbox}
                        className="bg-[#F2A122] hover:bg-[#d98a13] text-white text-xs font-bold py-2.5 rounded-xl transition text-center shadow-sm flex items-center justify-center gap-1"
                      >
                        <span>{t.openSandbox}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Simulated approve notification bubble */}
            <div className="absolute bottom-4 right-4 bg-slate-900 text-white rounded-xl py-2.5 px-4 shadow-xl border border-white/10 text-[10px] flex items-center gap-2.5 z-20 animate-bounce">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>{t.complianceVerified}</span>
            </div>
          </div>
        </div>

        {/* Informational Warning / Footnote requested in the screenshot */}
        <div className="mt-8 text-center text-xs text-slate-500">
          {t.sensitiveNote}{' '}
          <button 
            onClick={() => {
              if (onViewChange) onViewChange('contact');
            }} 
            className="text-[#F2A122] hover:underline font-semibold inline-flex items-center gap-0.5"
          >
            {t.contactLearnMore} <ArrowRight className="w-3 h-3 inline" />
          </button>
        </div>
      </section>

      {/* "{t.useCasesTitle}" Bento Grid Section */}
      <section className="bg-slate-100/60 border-y border-slate-200 py-20 px-6" id="profile-report-use-cases">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-2 mb-12">
            <span className="text-[#F2A122] text-xs font-bold uppercase tracking-widest">{t.enterpriseUseCases}</span>
            <h2 className="text-3xl font-display font-bold text-slate-900">{t.useCasesTitle}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.useCases.map((item: any, index: number) => {
              const Icon = [Shield, Users, Database][index] || Shield;
              return (
                <div key={item.title} className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4 hover:shadow-md transition">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-[#F2A122]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platform Cross-Links Section */}
      <section className="max-w-7xl mx-auto px-6 py-20" id="profile-report-related">
        <h3 className="text-xl font-bold text-slate-900 mb-8">{t.exploreMore}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Link 1 */}
          <button
            onClick={() => {
              if (onViewChange) onViewChange('dynamic-flow');
            }}
            className="group relative bg-[#6E85F7] text-white rounded-2xl p-8 text-left transition overflow-hidden shadow-sm hover:shadow-md flex flex-col justify-between min-h-[160px]"
          >
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:16px_16px]" />
            <h4 className="text-2xl font-bold font-display max-w-sm group-hover:translate-x-1 transition duration-300">
              {t.relatedFlow}
            </h4>
            <div className="flex items-center justify-between w-full mt-4">
              <div className="flex gap-1">
                <span className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center text-xs"><Layers className="w-3.5 h-3.5" /></span>
              </div>
              <ArrowRight className="w-5 h-5 opacity-80 group-hover:translate-x-1.5 transition" />
            </div>
          </button>

          {/* Link 2 */}
          <button
            onClick={() => {
              if (onViewChange) onViewChange('watchlists');
            }}
            className="group relative bg-[#F6BE2C] text-slate-900 rounded-2xl p-8 text-left transition overflow-hidden shadow-sm hover:shadow-md flex flex-col justify-between min-h-[160px]"
          >
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000000_1px,transparent_1px)] bg-[size:16px_16px]" />
            <h4 className="text-2xl font-bold font-display max-w-sm text-amber-950 group-hover:translate-x-1 transition duration-300">
              {t.relatedWatchlists}
            </h4>
            <div className="flex items-center justify-between w-full mt-4">
              <div className="flex gap-1">
                <span className="w-6 h-6 rounded-md bg-amber-950/10 flex items-center justify-center text-xs"><FileCheck className="w-3.5 h-3.5" /></span>
              </div>
              <ArrowRight className="w-5 h-5 text-amber-950 opacity-80 group-hover:translate-x-1.5 transition" />
            </div>
          </button>
        </div>
      </section>

      {/* Lavender call to action footer */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="bg-[#6E85F7]/15 rounded-[2rem] border border-[#6E85F7]/25 p-12 text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#6E85F7_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
          
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-950">{t.ctaTitle}</h2>
          <p className="text-slate-600 max-w-lg mx-auto text-sm leading-relaxed">
            {t.ctaDesc}
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2 relative z-10">
            <button
              onClick={onOpenSandbox}
              className="bg-slate-950 hover:bg-black text-white font-semibold px-8 py-3.5 rounded-full text-sm shadow-md transition w-full sm:w-auto"
            >
              {t.getDemo}
            </button>
            <button
              onClick={onOpenSandbox}
              className="text-[#6E85F7] hover:text-[#5068de] font-bold text-sm px-6 py-3 rounded-full transition w-full sm:w-auto flex items-center justify-center gap-1.5"
            >
              <span>{t.tryItNow}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
