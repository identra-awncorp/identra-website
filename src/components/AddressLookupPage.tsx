/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, Check, Shield, Search, CheckCircle, Eye, 
  Activity, FileText, Settings, AlertOctagon, HelpCircle, ArrowRightCircle, 
  Sparkles, AlertCircle, ExternalLink, Layers, MapPin, Mail, Home, 
  ShieldAlert, ShieldCheck, RefreshCw, Radio, UserCheck, Trash2, HelpCircle as HelpIcon,
  Globe, Landmark, Navigation, Map, Info, Compass
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { ADDRESS_LOOKUP_TRANSLATIONS } from '../translations/AddressLookupPageTranslations';

interface AddressLookupPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

interface AddressPreset {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  riskScore: number;
  recommendation: 'APPROVE' | 'REVIEW' | 'BLOCK';
  details: {
    deliverable: 'Yes' | 'No' | 'Missing Sub-unit';
    addressType: 'Residential' | 'Commercial' | 'PO Box' | 'Mail Drop';
    carrierRoute: string;
    congressionalDistrict: string;
    timeZone: string;
    latitude: number;
    longitude: number;
    signals: string[];
    riskFlags: string[];
  };
}

export default function AddressLookupPage({ onOpenSandbox, onBackToLanding, onViewChange }: AddressLookupPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(ADDRESS_LOOKUP_TRANSLATIONS, language as keyof typeof ADDRESS_LOOKUP_TRANSLATIONS, 'ADDRESS_LOOKUP_TRANSLATIONS');

  // Active Tab for "How it works"
  const [activeWorkTab, setActiveWorkTab] = useState<'assess' | 'act'>('assess');

  // Simulator state
  const [selectedPresetId, setSelectedPresetId] = useState<string>('1');
  const [isUsingCustom, setIsUsingCustom] = useState<boolean>(false);
  const [customStreet, setCustomStreet] = useState<string>('');
  const [customCity, setCustomCity] = useState<string>('');
  const [customState, setCustomState] = useState<string>('');
  const [customZip, setCustomZip] = useState<string>('');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evalStepIndex, setEvalStepIndex] = useState<number | null>(null);
  const evalSteps = React.useMemo(() => [t.step1, t.step2, t.step3, t.step4], [t]);
  const evalStep = evalStepIndex === null ? '' : evalSteps[evalStepIndex];

  const translatedPresets = React.useMemo<AddressPreset[]>(() => [
    {
      id: '1',
      label: t.preset1Label,
      street: '1600 Amphitheatre Pkwy',
      city: 'Mountain View',
      state: 'CA',
      zip: '94043',
      riskScore: 3,
      recommendation: 'APPROVE' as const,
      details: {
        deliverable: 'Yes' as const,
        addressType: 'Commercial' as const, // preserved commercial addressType per original preset
        carrierRoute: 'C004',
        congressionalDistrict: 'CA-16',
        timeZone: t.tzPacific,
        latitude: 37.4220,
        longitude: -122.0841,
        signals: [
          t.sig1,
          t.sig2,
          t.sig3
        ],
        riskFlags: []
      }
    },
    {
      id: '2',
      label: t.preset2Label,
      street: '350 Fifth Ave',
      city: 'New York',
      state: 'NY',
      zip: '10118',
      riskScore: 38,
      recommendation: 'REVIEW' as const,
      details: {
        deliverable: 'Missing Sub-unit' as const,
        addressType: 'Commercial' as const,
        carrierRoute: 'C012',
        congressionalDistrict: 'NY-12',
        timeZone: t.tzEastern,
        latitude: 40.7484,
        longitude: -73.9857,
        signals: [
          t.sig4,
          t.sig5
        ],
        riskFlags: [
          t.flag1
        ]
      }
    },
    {
      id: '3',
      label: t.preset3Label,
      street: 'PO Box 9812',
      city: 'Las Vegas',
      state: 'NV',
      zip: '89193',
      riskScore: 82,
      recommendation: 'BLOCK' as const,
      details: {
        deliverable: 'Yes' as const,
        addressType: 'PO Box' as const,
        carrierRoute: 'H045',
        congressionalDistrict: 'NV-01',
        timeZone: t.tzMountain,
        latitude: 36.1699,
        longitude: -115.1398,
        signals: [
          t.sig6
        ],
        riskFlags: [
          t.flag2,
          t.flag3
        ]
      }
    }
  ], [t]);

  // Derive evaluationResult based on current states
  const currentResult = React.useMemo(() => {
    if (isUsingCustom) {
      const streetLower = customStreet.toLowerCase();
      const isPoBox = streetLower.includes('po box') || streetLower.includes('p.o. box') || streetLower.includes('box');
      const isMissingSub = streetLower.includes('broadway') || streetLower.includes('ave') || streetLower.includes('5th');
      
      let score = 5;
      let type: 'Residential' | 'Commercial' | 'PO Box' | 'Mail Drop' = 'Residential';
      let deliverable: 'Yes' | 'No' | 'Missing Sub-unit' = 'Yes';
      let riskFlags: string[] = [];
      let signals: string[] = [t.sigCustom];

      if (isPoBox) {
        score = 80;
        type = 'PO Box';
        riskFlags.push(t.flagCustomPoBox);
      } else if (isMissingSub) {
        score = 35;
        type = 'Commercial';
        deliverable = 'Missing Sub-unit';
        riskFlags.push(t.flagCustomMissingSub);
      }

      if (!customStreet) {
        score = 95;
        deliverable = 'No';
        riskFlags.push(t.flagCustomEmpty);
      }

      const rec = score < 20 ? 'APPROVE' : score < 60 ? 'REVIEW' : 'BLOCK';

      return {
        id: 'custom',
        label: t.presetCustomLabel,
        street: customStreet || '123 Main St',
        city: customCity || 'San Francisco',
        state: (customState || 'CA').toUpperCase(),
        zip: customZip || '94103',
        riskScore: score,
        recommendation: rec,
        details: {
          deliverable,
          addressType: type,
          carrierRoute: 'R012',
          congressionalDistrict: 'CA-11',
          timeZone: t.tzPacific,
          latitude: 37.7749,
          longitude: -122.4194,
          signals,
          riskFlags
        }
      };
    } else {
      return translatedPresets.find(p => p.id === selectedPresetId) || translatedPresets[0];
    }
  }, [isUsingCustom, customStreet, customCity, customState, customZip, selectedPresetId, translatedPresets, t]);

  const handleSelectPreset = (id: string) => {
    setIsUsingCustom(false);
    setSelectedPresetId(id);
  };

  const handleRunEvaluation = () => {
    setIsEvaluating(true);
    setEvalStepIndex(0);

    setTimeout(() => {
      setEvalStepIndex(1);
      setTimeout(() => {
        setEvalStepIndex(2);
        setTimeout(() => {
          setEvalStepIndex(3);
          setTimeout(() => {
            setIsEvaluating(false);
            setEvalStepIndex(null);
          }, 600);
        }, 600);
      }, 600);
    }, 600);
  };

  const getDeliverableText = (val: string) => {
    if (val === 'Yes') return t.deliverableYes;
    if (val === 'No') return t.deliverableNo;
    if (val === 'Missing Sub-unit') return t.deliverableMissing;
    return val;
  };

  const getAddressTypeText = (val: string) => {
    if (val === 'Residential') return t.typeResidential;
    if (val === 'Commercial') return t.typeCommercial;
    if (val === 'PO Box') return t.typePoBox;
    if (val === 'Mail Drop') return t.typeMailDrop;
    return val;
  };

  return (
    <div className="bg-[#FAFBFD] pb-24 text-[#111625]" id="address-lookup-page">
      {/* Saffron Rounded Container Hero (Matches Screenshot Style exactly) */}
      <section className="px-4 md:px-8 pt-8 max-w-7xl mx-auto">
        <div className="relative overflow-hidden bg-[#F2A122] text-white rounded-[2rem] px-8 md:px-16 pt-16 pb-20 shadow-xl animate-fade-in" id="address-hero">
          {/* Decorative radial gradients for aesthetic background depth */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl opacity-30 -mr-20 -mb-20" />
          
          <div className="max-w-4xl relative z-10">
            {/* Back Button */}
            <button 
              onClick={onBackToLanding}
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-50 hover:text-white transition mb-10 bg-amber-950/10 hover:bg-amber-950/25 px-4 py-2.5 rounded-full border border-white/10"
              id="address-back"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.backToPlatform}</span>
            </button>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-950/15 border border-white/20 px-3.5 py-1.5 rounded-full mb-6">
              <MapPin className="w-4 h-4 text-amber-100" />
              <span className="text-[10px] font-bold tracking-wider uppercase text-amber-100">{t.addressLookupBadge}</span>
            </div>

            {/* Main Hero Header */}
            <h1 className="text-4xl md:text-[54px] font-display font-bold leading-[1.1] tracking-tight text-white mb-6">
              {t.heroTitleBefore}<br className="hidden md:block"/>
              <span className="text-amber-100">{t.heroTitleHighlighted}</span>{t.heroTitleAfter}
            </h1>

            {/* CTA Button */}
            <div className="pt-6">
              <button 
                onClick={onOpenSandbox}
                className="bg-[#111625] hover:bg-[#1f293d] text-white font-medium px-7 py-4 rounded-full text-sm shadow-lg transition flex items-center gap-2.5 group"
                id="address-demo-cta"
              >
                <span>{t.tryDemo}</span>
                <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition" />
              </button>
            </div>
          </div>
        </div>

        {/* Hero Features Grid - Three elegant cards aligning horizontally underneath */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 px-2">
          <div className="border-t border-slate-200/80 pt-6 space-y-2">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">{t.feat1Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.feat1Desc}
            </p>
          </div>
          <div className="border-t border-slate-200/80 pt-6 space-y-2">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">{t.feat2Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.feat2Desc}
            </p>
          </div>
          <div className="border-t border-slate-200/80 pt-6 space-y-2">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">{t.feat3Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.feat3Desc}
            </p>
          </div>
        </div>
      </section>

      {/* How it works Section (Saffron card style corresponding perfectly to screenshot) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-3xl font-display font-bold text-[#111625] tracking-tight">
              {t.howItWorks}
            </h2>
          </div>
          <div className="flex gap-6 mt-4 md:mt-0 text-sm font-medium">
            <button 
              onClick={() => setActiveWorkTab('assess')}
              className={`pb-3 border-b-2 font-semibold transition ${
                activeWorkTab === 'assess' 
                  ? 'border-[#F2A122] text-[#F2A122]' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {t.tabAssess}
            </button>
            <button 
              onClick={() => setActiveWorkTab('act')}
              className={`pb-3 border-b-2 font-semibold transition ${
                activeWorkTab === 'act' 
                  ? 'border-[#F2A122] text-[#F2A122]' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {t.tabAct}
            </button>
          </div>
        </div>

        {/* Dynamic Display of active state inside saffron/amber container */}
        <div className="bg-[#FAF0E2] text-[#111625] rounded-3xl p-8 md:p-14 border border-[#F5E2C4] shadow-sm">
          {activeWorkTab === 'assess' ? (
            <div className="max-w-3xl space-y-6">
              <h3 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-[#111625]">
                {t.assessTitle}
              </h3>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                {t.assessDesc}
              </p>
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t.assessBullet1}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t.assessBullet2}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t.assessBullet3}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl space-y-6">
              <h3 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-[#111625]">
                {t.actTitle}
              </h3>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                {t.actDesc}
              </p>
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#F2A122] shrink-0" />
                  <span>{t.actBullet1}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#F2A122] shrink-0" />
                  <span>{t.actBullet2}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#F2A122] shrink-0" />
                  <span>{t.actBullet3}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Interactive Simulator Section - Keeps the developer playground highly functional */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-28">
        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden" id="address-simulator">
          {/* Subtle background glow elements */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-slate-800">
              <div>
                <div className="inline-flex items-center gap-1.5 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.simulatorSubtitle}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold">
                  {t.simulatorTitle}
                </h3>
                <p className="text-slate-400 text-sm mt-1 max-w-xl">
                  {t.simulatorDesc}
                </p>
              </div>

              {/* Reset to Presets if Custom */}
              {isUsingCustom && (
                <button 
                  onClick={() => handleSelectPreset('1')}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 px-3.5 py-2 rounded-lg border border-slate-700 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{t.clearCustom}</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Column: Address Input Controls */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                    {t.choosePreset}
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {translatedPresets.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => handleSelectPreset(p.id)}
                        className={`w-full text-left p-3 rounded-xl border transition flex items-center justify-between ${
                          !isUsingCustom && selectedPresetId === p.id
                            ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 font-semibold'
                            : 'bg-slate-800/40 border-slate-800 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-2.5 h-2.5 rounded-full ${
                            p.recommendation === 'APPROVE' ? 'bg-green-400' :
                            p.recommendation === 'REVIEW' ? 'bg-yellow-400' : 'bg-red-400'
                          }`} />
                          <span className="text-xs truncate">{p.label}</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                          {t.riskScore} {p.riskScore}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-800" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-slate-900 px-3 text-slate-500 font-semibold">{t.orCustomAddress}</span>
                  </div>
                </div>

                {/* Custom input fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase">
                      {t.streetAddress}
                    </label>
                    <input
                      type="text"
                      placeholder="1600 Amphitheatre Pkwy"
                      value={isUsingCustom ? customStreet : ''}
                      onChange={(e) => {
                        setIsUsingCustom(true);
                        setCustomStreet(e.target.value);
                      }}
                      className="w-full bg-slate-800/50 border border-slate-700 focus:border-amber-500 rounded-xl py-3 px-4 text-sm text-white placeholder-slate-500 outline-none transition"
                    />
                  </div>

                  <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-6">
                      <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase">
                        {t.city}
                      </label>
                      <input
                        type="text"
                        placeholder="Mountain View"
                        value={isUsingCustom ? customCity : ''}
                        onChange={(e) => {
                          setIsUsingCustom(true);
                          setCustomCity(e.target.value);
                        }}
                        className="w-full bg-slate-800/50 border border-slate-700 focus:border-amber-500 rounded-xl py-3 px-4 text-sm text-white placeholder-slate-500 outline-none transition"
                      />
                    </div>
                    <div className="col-span-3">
                      <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase">
                        {t.state}
                      </label>
                      <input
                        type="text"
                        placeholder="CA"
                        maxLength={2}
                        value={isUsingCustom ? customState : ''}
                        onChange={(e) => {
                          setIsUsingCustom(true);
                          setCustomState(e.target.value);
                        }}
                        className="w-full bg-slate-800/50 border border-slate-700 focus:border-amber-500 rounded-xl py-3 px-2 text-center text-sm text-white placeholder-slate-500 outline-none transition uppercase"
                      />
                    </div>
                    <div className="col-span-3">
                      <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase">
                        {t.zip}
                      </label>
                      <input
                        type="text"
                        placeholder="94043"
                        maxLength={5}
                        value={isUsingCustom ? customZip : ''}
                        onChange={(e) => {
                          setIsUsingCustom(true);
                          setCustomZip(e.target.value);
                        }}
                        className="w-full bg-slate-800/50 border border-slate-700 focus:border-amber-500 rounded-xl py-3 px-2 text-center text-sm text-white placeholder-slate-500 outline-none transition"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleRunEvaluation}
                    disabled={isEvaluating}
                    className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-slate-700 text-slate-950 font-bold py-3.5 px-6 rounded-xl text-sm transition flex items-center justify-center gap-2"
                  >
                    {isEvaluating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>{t.verifying}</span>
                      </>
                    ) : (
                      <>
                        <Compass className="w-4 h-4" />
                        <span>{t.runVerification}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Right Column: Display Verification Results */}
              <div className="lg:col-span-7">
                <div className="bg-[#161d30] border border-slate-800 rounded-2xl min-h-[460px] p-6 relative flex flex-col justify-between">
                  
                  {isEvaluating ? (
                    /* Loading State Animation */
                    <div className="absolute inset-0 bg-slate-900/90 rounded-2xl flex flex-col items-center justify-center p-8 z-20 transition-all duration-300">
                      <div className="w-16 h-16 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mb-6" />
                      <p className="text-white text-base font-semibold text-center h-8 animate-pulse">
                        {evalStep}
                      </p>
                      <p className="text-slate-400 text-xs mt-2 text-center">
                        {t.syncingLoading}
                      </p>
                    </div>
                  ) : null}

                  {currentResult ? (
                    <div className="space-y-6">
                      {/* Top Risk Overview with Gauge and Decision */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-6 border-b border-slate-800/80 items-center">
                        <div className="md:col-span-4 flex flex-col items-center">
                          <span className="text-xs text-slate-400 font-medium mb-2 uppercase">{t.riskScore}</span>
                          <div className="relative w-24 h-24 flex items-center justify-center rounded-full bg-slate-800/40 border border-slate-800">
                            {/* Inner score */}
                            <div className="text-center">
                              <span className="text-3xl font-extrabold font-mono tracking-tight text-white">
                                {currentResult.riskScore}
                              </span>
                              <span className="block text-[9px] text-slate-400 font-bold uppercase">/ 100</span>
                            </div>
                            {/* Colored outer halo */}
                            <div className={`absolute inset-0 rounded-full border-4 ${
                              currentResult.riskScore < 20 ? 'border-green-500/30' :
                              currentResult.riskScore < 60 ? 'border-yellow-500/30' : 'border-red-500/30'
                            }`} />
                          </div>
                        </div>

                        <div className="md:col-span-8 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-400 uppercase font-semibold">{t.recommendedAction}</span>
                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                              currentResult.recommendation === 'APPROVE' ? 'bg-green-500/10 text-green-400 border border-green-500/30' :
                              currentResult.recommendation === 'REVIEW' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30' :
                              'bg-red-500/10 text-red-400 border border-red-500/30'
                            }`}>
                              {currentResult.recommendation}
                            </span>
                          </div>

                          <p className="text-sm text-slate-300 font-semibold">
                            {currentResult.recommendation === 'APPROVE' && t.approveDesc}
                            {currentResult.recommendation === 'REVIEW' && t.reviewDesc}
                            {currentResult.recommendation === 'BLOCK' && t.blockDesc}
                          </p>
                        </div>
                      </div>

                      {/* Detailed Signal Columns */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Delivery Details */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-slate-300 border-b border-slate-800 pb-2">
                            <MapPin className="w-4 h-4 text-amber-400" />
                            <span className="text-xs font-bold uppercase tracking-wider">{t.postalDetails}</span>
                          </div>

                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-slate-400">{t.streetLabel}</span>
                              <span className="text-white font-semibold font-mono truncate max-w-[130px]">{currentResult.street}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">{t.cityStateZipLabel}</span>
                              <span className="text-white font-semibold font-mono">{currentResult.city}, {currentResult.state} {currentResult.zip}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">{t.deliverableLabel}</span>
                              <span className={`font-semibold font-mono ${
                                currentResult.details.deliverable === 'Yes' ? 'text-green-400' :
                                currentResult.details.deliverable === 'Missing Sub-unit' ? 'text-yellow-400' : 'text-red-400'
                              }`}>{getDeliverableText(currentResult.details.deliverable)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">{t.addressTypeLabel}</span>
                              <span className="text-white font-semibold font-mono">{getAddressTypeText(currentResult.details.addressType)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Geographic & Geocode Indicators */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-slate-300 border-b border-slate-800 pb-2">
                            <Navigation className="w-4 h-4 text-amber-400" />
                            <span className="text-xs font-bold uppercase tracking-wider">{t.geographicMetadata}</span>
                          </div>

                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-slate-400">{t.carrierRouteLabel}</span>
                              <span className="text-white font-semibold font-mono">{currentResult.details.carrierRoute}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">{t.congressDistrictLabel}</span>
                              <span className="text-white font-semibold font-mono">{currentResult.details.congressionalDistrict}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">{t.timeZoneLabel}</span>
                              <span className="text-white font-semibold font-mono truncate max-w-[130px]">{currentResult.details.timeZone}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">{t.geocodeLabel}</span>
                              <span className="text-white font-semibold font-mono">{currentResult.details.latitude.toFixed(4)}, {currentResult.details.longitude.toFixed(4)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Signals & Warnings */}
                      <div className="space-y-2 pt-2 border-t border-slate-800">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t.evaluationMetrics}</span>
                        <div className="space-y-1.5">
                          {currentResult.details.signals.map((sig, sIdx) => (
                            <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-300">
                              <CheckCircle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-green-500" />
                              <span>{sig}</span>
                            </div>
                          ))}
                          {currentResult.details.riskFlags.map((flag, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-2 text-xs text-amber-300">
                              <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-500" />
                              <span>{flag}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                      <HelpIcon className="w-12 h-12 text-slate-600 mb-4 animate-bounce" />
                      <p className="text-slate-300 text-base font-semibold">{t.readyToValidate}</p>
                      <p className="text-slate-500 text-xs mt-1">
                        {t.selectTargetPreset}
                      </p>
                    </div>
                  )}

                  {/* Sandbox API Call simulation panel footer */}
                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-mono">POST /v1/reports/address-lookup</span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                      <span>{t.sandboxEnvActive}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How teams can use this risk signal (White layout matching screenshot exactly) */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-28">
        <div className="bg-white rounded-3xl p-8 md:p-14 border border-slate-100 shadow-lg">
          <div className="max-w-3xl mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-[#111625] tracking-tight mb-3">
              {t.useSignalTitle}
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              {t.useSignalDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div className="space-y-4">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-[#F2A122]">
                <Mail className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-[#111625]">{t.useSignal1Title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                {t.useSignal1Desc}
              </p>
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-[#F2A122]">
                <Shield className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-[#111625]">{t.useSignal2Title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                {t.useSignal2Desc}
              </p>
            </div>

            {/* Column 3 */}
            <div className="space-y-4">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-[#F2A122]">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-[#111625]">{t.useSignal3Title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                {t.useSignal3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Keep Learning Section (Corresponds perfectly to screenshot) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-28">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-[#111625] tracking-tight">
            {t.keepLearning}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Article 1 */}
          <div className="group cursor-pointer space-y-4">
            <div className="aspect-video bg-slate-100 rounded-2xl overflow-hidden relative border border-slate-200/60 flex items-center justify-center">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px]" />
              <Home className="w-12 h-12 text-[#F2A122]/80 group-hover:scale-110 transition duration-300" />
            </div>
            <div className="space-y-2">
              <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">{t.article1Tag}</div>
              <h4 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition leading-snug">
                {t.article1Title}
              </h4>
            </div>
          </div>

          {/* Article 2 */}
          <div className="group cursor-pointer space-y-4">
            <div className="aspect-video bg-slate-100 rounded-2xl overflow-hidden relative border border-slate-200/60 flex items-center justify-center">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px]" />
              <FileText className="w-12 h-12 text-[#F2A122]/80 group-hover:scale-110 transition duration-300" />
            </div>
            <div className="space-y-2">
              <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">{t.article2Tag}</div>
              <h4 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition leading-snug">
                {t.article2Title}
              </h4>
            </div>
          </div>

          {/* Article 3 */}
          <div className="group cursor-pointer space-y-4">
            <div className="aspect-video bg-indigo-50/50 rounded-2xl overflow-hidden relative border border-indigo-100 flex items-center justify-center">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#354CE1_1px,transparent_1px)] [background-size:16px_16px]" />
              <ShieldAlert className="w-12 h-12 text-indigo-500/80 group-hover:scale-110 transition duration-300" />
            </div>
            <div className="space-y-2">
              <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">{t.article3Tag}</div>
              <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition leading-snug">
                {t.article3Title}
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* Explore more of Identra's identity platform section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-32">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-[#111625] tracking-tight">
            {t.exploreTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Slate Blue */}
          <button type="button" className="bg-indigo-100/60 border border-indigo-200 p-8 md:p-12 rounded-[2rem] flex flex-col justify-between group cursor-pointer hover:border-[#354CE1]/60 transition"
               onClick={() => onViewChange?.('workflows')}>
            <div className="space-y-4">
              <div className="w-10 h-10 bg-[#354CE1] text-white rounded-xl flex items-center justify-center font-bold">
                <Radio className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-display font-bold text-slate-900 leading-tight">
                {t.explore1Title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
                {t.explore1Desc}
              </p>
            </div>
            <div className="pt-8 flex items-center gap-2 text-xs font-bold text-[#354CE1] group-hover:gap-3 transition-all duration-300">
              <span>{t.explore1Link}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>

          {/* Card 2: Teal-Green */}
          <button type="button" className="bg-teal-50 border border-teal-100 p-8 md:p-12 rounded-[2rem] flex flex-col justify-between group cursor-pointer hover:border-teal-400 transition"
               onClick={() => onViewChange?.('case-management')}>
            <div className="space-y-4">
              <div className="w-10 h-10 bg-teal-500 text-white rounded-xl flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-display font-bold text-slate-900 leading-tight">
                {t.explore2Title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
                {t.explore2Desc}
              </p>
            </div>
            <div className="pt-8 flex items-center gap-2 text-xs font-bold text-teal-700 group-hover:gap-3 transition-all duration-300">
              <span>{t.explore2Link}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      </section>

      {/* Ready to get started Banner (Purple style) */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-32">
        <div className="relative overflow-hidden bg-indigo-100 border border-indigo-200/80 text-[#111625] rounded-[2rem] p-10 md:p-16 text-center shadow-md">
          <div className="max-w-xl mx-auto relative z-10 space-y-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-slate-900">
              {t.getStartedTitle}
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {t.getStartedDesc}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={onOpenSandbox}
                className="bg-[#354CE1] hover:bg-indigo-700 text-white font-semibold px-7 py-3.5 rounded-full text-sm shadow-md transition"
              >
                {t.tryDemo}
              </button>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
