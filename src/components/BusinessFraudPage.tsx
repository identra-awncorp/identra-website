import type { AppView } from '../types/routes';
import React, { useState } from 'react';
import { 
  ArrowRight, ShieldCheck, Search, ClipboardCheck,
  Building2, RefreshCw, CheckCircle2, Network, AlertTriangle, 
  ArrowLeft, Sparkles, Check, Database, Shield, ChevronDown, 
  ChevronUp, AlertCircle, Cpu, Zap, Share2, Layers, MapPin, Tablet, Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { BUSINESS_FRAUD_TRANSLATIONS } from '../translations/BusinessFraudPageTranslations';

interface BusinessFraudPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

// Mock Data for Interactive Fraud Ring Explorer
interface GraphNode {
  id: string;
  label: string;
  type: 'business' | 'ip' | 'device' | 'bank' | 'owner';
  status: 'safe' | 'warning' | 'alert';
  details: string;
}

const GRAPH_CONNECTIONS = [
  { from: 'b1', to: 'ip1', type: 'IP connection' },
  { from: 'b2', to: 'ip1', type: 'Shared IP connection' },
  { from: 'b1', to: 'dev1', type: 'Same Device ID' },
  { from: 'b2', to: 'dev1', type: 'Shared Device' },
  { from: 'b2', to: 'bank1', type: 'Payout account' },
  { from: 'b1', to: 'own1', type: 'Signatory/UBO' },
  { from: 'b2', to: 'own1', type: 'Hidden Beneficiary' },
  { from: 'b3', to: 'own1', type: 'Unrelated proxy' }
];

export default function BusinessFraudPage({ onOpenSandbox, onBackToLanding, onViewChange }: BusinessFraudPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(BUSINESS_FRAUD_TRANSLATIONS, language as keyof typeof BUSINESS_FRAUD_TRANSLATIONS, 'BUSINESS_FRAUD_TRANSLATIONS');

  const localizedNodes: GraphNode[] = [
    { id: 'b1', label: t.nodeB1Label, type: 'business', status: 'warning', details: t.nodeB1Details },
    { id: 'b2', label: t.nodeB2Label, type: 'business', status: 'alert', details: t.nodeB2Details },
    { id: 'b3', label: t.nodeB3Label, type: 'business', status: 'safe', details: t.nodeB3Details },
    { id: 'ip1', label: t.nodeIp1Label, type: 'ip', status: 'alert', details: t.nodeIp1Details },
    { id: 'dev1', label: t.nodeDev1Label, type: 'device', status: 'alert', details: t.nodeDev1Details },
    { id: 'bank1', label: t.nodeBank1Label, type: 'bank', status: 'warning', details: t.nodeBank1Details },
    { id: 'own1', label: t.nodeOwn1Label, type: 'owner', status: 'alert', details: t.nodeOwn1Details }
  ];

  // Use case accordion state
  const [activeAccordion, setActiveAccordion] = useState<string>('onboarding');

  // Interactive Risk Calculator Signals State
  const [signals, setSignals] = useState({
    mismatchedAddress: false,
    proxyVpnDetected: false,
    rapidMultiFilings: false,
    maliciousBehavior: false,
    watchlistHit: false,
    mismatchedTIN: false
  });

  // Selected node in Fraud Ring Explorer
  const [selectedNodeId, setSelectedNodeId] = useState<string>('b2');

  // Calculate dynamic risk level & recommendation
  const calculateRisk = () => {
    const activeCount = Object.values(signals).filter(Boolean).length;
    if (activeCount === 0) return { score: 12, label: t.lowRisk, color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20', desc: t.lowRiskDesc };
    if (activeCount <= 2) return { score: 45, label: t.moderateRisk, color: 'text-amber-500 bg-amber-500/10 border-amber-500/20', desc: t.moderateRiskDesc };
    return { score: 88, label: t.criticalRisk, color: 'text-rose-500 bg-rose-500/10 border-rose-500/20', desc: t.criticalRiskDesc };
  };

  const currentRisk = calculateRisk();
  const selectedNode = localizedNodes.find(n => n.id === selectedNodeId) || localizedNodes[0];

  // Map of nodes connected to the selected node
  const connectedConnections = GRAPH_CONNECTIONS.filter(c => c.from === selectedNodeId || c.to === selectedNodeId);
  const connectedNodes = localizedNodes.filter(n => {
    if (n.id === selectedNodeId) return false;
    return connectedConnections.some(c => c.from === n.id || c.to === n.id);
  });

  const toggleSignal = (key: keyof typeof signals) => {
    setSignals(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans" id="business-fraud-root">
      {/* Navigation Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6" id="bf-nav">
        <button 
          onClick={onBackToLanding}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors bg-slate-800/50 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700/50"
          id="bf-back-btn"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToPlatform}</span>
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 md:py-24" id="bf-hero">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6" id="bf-hero-text">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6 uppercase tracking-wider" id="bf-hero-badge">
                <Shield className="w-3.5 h-3.5" />
                <span>{t.businessFraudPrevention}</span>
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6" id="bf-hero-heading">
                {t.heroTitle}
              </h1>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl" id="bf-hero-paragraph">
                {t.heroDesc}
              </p>
              <div className="flex flex-col sm:flex-row gap-4" id="bf-hero-actions">
                <button 
                  onClick={onOpenSandbox}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-blue-900/30 hover:shadow-blue-900/40 transform hover:-translate-y-0.5 active:translate-y-0"
                  id="bf-demo-btn"
                >
                  <span>{t.tryDemo}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6" id="bf-hero-preview">
              <div className="relative rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl backdrop-blur-xl overflow-hidden" id="bf-interactive-widget">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
                
                {/* Simulated Widget Header */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6" id="bf-widget-header">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-200">{t.realtimeFraudSignal}</h3>
                      <p className="text-[10px] text-slate-500 font-mono">KYB-SHIELD v2.4</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded text-[10px] text-rose-400 font-mono animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" />
                    <span>{t.syntheticEntityFlag}</span>
                  </div>
                </div>

                {/* Signals Preview */}
                <div className="space-y-3 mb-6" id="bf-signals-pills">
                  <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl flex gap-3">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-semibold text-slate-200">{t.syntheticEntityFlag}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{t.syntheticEntityFlagDesc}</p>
                    </div>
                  </div>
                  <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl flex gap-3">
                    <Network className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-semibold text-slate-200">{t.fraudRingAssociation}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{t.fraudRingAssociationDesc}</p>
                    </div>
                  </div>
                </div>

                {/* Dynamic Simulator Toggle Area */}
                <div className="border-t border-slate-800/80 pt-5" id="bf-signals-simulator-section">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.interactiveSignalsSimulator}</h4>
                    <span className={`text-xs font-mono font-semibold border px-2 py-0.5 rounded-full ${currentRisk.color}`}>
                      {currentRisk.score}% {t.risk}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <button 
                      onClick={() => toggleSignal('mismatchedAddress')}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs transition-colors border ${
                        signals.mismatchedAddress 
                          ? 'bg-rose-500/10 border-rose-500/40 text-rose-300' 
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="truncate">{t.addressInconsistency}</span>
                      <span className={`w-1.5 h-1.5 rounded-full ${signals.mismatchedAddress ? 'bg-rose-500' : 'bg-slate-700'}`} />
                    </button>
                    <button 
                      onClick={() => toggleSignal('proxyVpnDetected')}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs transition-colors border ${
                        signals.proxyVpnDetected 
                          ? 'bg-rose-500/10 border-rose-500/40 text-rose-300' 
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="truncate">{t.proxyVpnIP}</span>
                      <span className={`w-1.5 h-1.5 rounded-full ${signals.proxyVpnDetected ? 'bg-rose-500' : 'bg-slate-700'}`} />
                    </button>
                    <button 
                      onClick={() => toggleSignal('rapidMultiFilings')}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs transition-colors border ${
                        signals.rapidMultiFilings 
                          ? 'bg-rose-500/10 border-rose-500/40 text-rose-300' 
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="truncate">{t.rapidSosFilings}</span>
                      <span className={`w-1.5 h-1.5 rounded-full ${signals.rapidMultiFilings ? 'bg-rose-500' : 'bg-slate-700'}`} />
                    </button>
                    <button 
                      onClick={() => toggleSignal('watchlistHit')}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs transition-colors border ${
                        signals.watchlistHit 
                          ? 'bg-rose-500/10 border-rose-500/40 text-rose-300' 
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="truncate">{t.uboWatchlistHit}</span>
                      <span className={`w-1.5 h-1.5 rounded-full ${signals.watchlistHit ? 'bg-rose-500' : 'bg-slate-700'}`} />
                    </button>
                  </div>

                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-300 uppercase tracking-wider text-[9px] block mb-1">{t.risk} Recommendation</span>
                    {currentRisk.desc}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Features Pillar Section */}
      <section className="border-t border-slate-800/80 bg-slate-950/30 py-16" id="bf-pillars">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60" id="pillar-imidentration">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{t.preventImidentrationTitle}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{t.preventImidentrationDesc}</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60" id="pillar-investigations">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-5">
                <Network className="w-5 h-5 text-violet-400" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{t.advancedInvestigationsTitle}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{t.advancedInvestigationsDesc}</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60" id="pillar-takeovers">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5">
                <RefreshCw className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{t.preventTakeoversTitle}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{t.preventTakeoversDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Trust Bar */}
      <div className="border-y border-slate-800/50 bg-slate-950 py-8" id="bf-brand-bar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6">
            {t.trustedByCompanies}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-45 grayscale hover:opacity-75 transition-opacity">
            <span className="text-lg font-bold tracking-tight text-white font-serif">branch</span>
            <span className="text-sm font-black tracking-widest text-white">GET YOUR GUIDE</span>
            <span className="text-lg font-semibold tracking-tighter text-white">twilio</span>
          </div>
        </div>
      </div>

      {/* Feature Section 1: Smarter Signals Approach */}
      <section className="py-20 md:py-28 relative" id="bf-smarter-approach">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24" id="bf-smarter-header">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4 uppercase tracking-wider">
              {t.smarterApproachBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight" id="bf-smarter-title">
              {t.smarterApproachTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5" id="bf-smarter-text">
              <h3 className="text-2xl font-bold text-white mb-4 leading-snug">
                {t.assessRiskBetterTitle}
              </h3>
              <p className="text-slate-300 mb-4 leading-relaxed">
                {t.assessRiskBetterDesc1}
              </p>
              <p className="text-slate-400 mb-8 leading-relaxed">
                {t.assessRiskBetterDesc2}
              </p>
            </div>

            <div className="lg:col-span-7" id="bf-smarter-preview">
              <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl relative overflow-hidden shadow-xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />
                <div className="flex justify-between items-center pb-4 border-b border-slate-800 mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{t.signalsVerified}</span>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{t.secure}</span>
                  </span>
                </div>

                <div className="space-y-4">
                  {[
                    { title: t.tinEinRegistryValidation, desc: t.tinEinRegistryValidationDesc, status: 'verified' },
                    { title: t.digitalPresenceAudit, desc: t.digitalPresenceAuditDesc, status: 'verified' },
                    { title: t.beneficialOwnerWatchlist, desc: t.beneficialOwnerWatchlistDesc, status: 'verified' },
                    { title: t.behavioralBiometricsScan, desc: t.behavioralBiometricsScanDesc, status: 'verified' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-3.5 p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-800 transition-colors">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mt-0.5 shrink-0">
                        <Check className="w-3 h-3 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-200">{item.title}</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 2: Seamless Customer Onboarding & Routing */}
      <section className="py-20 bg-slate-950/40 border-y border-slate-800/50" id="bf-seamless">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 order-last lg:order-first" id="bf-seamless-preview">
              <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl backdrop-blur">
                <div className="flex justify-between items-center pb-4 border-b border-slate-800 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">{t.adaptiveFlowPath}</span>
                </div>

                <div className="space-y-4">
                  {/* Option 1: Green Path */}
                  <div className="border border-emerald-500/20 bg-emerald-500/5 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-emerald-300">{t.acmeIncLabel}</h4>
                        <p className="text-[10px] text-emerald-400/80 mt-0.5">{t.acmeIncDesc}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-lg shrink-0 text-center">
                      {t.autoApprove45s}
                    </span>
                  </div>

                  {/* Flow Split Indicator */}
                  <div className="flex items-center justify-center py-2" id="bf-flow-divider">
                    <div className="h-8 w-0.5 border-l-2 border-dashed border-slate-700" />
                  </div>

                  {/* Option 2: Red Path */}
                  <div className="border border-rose-500/20 bg-rose-500/5 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-5 h-5 text-rose-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-rose-300">{t.zephyrLtdLabel}</h4>
                        <p className="text-[10px] text-rose-400/80 mt-0.5">{t.zephyrLtdDesc}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 px-2.5 py-1 rounded-lg shrink-0 text-center">
                      {t.triggerDocUpload}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5" id="bf-seamless-text">
              <h3 className="text-2xl font-bold text-white mb-4 leading-snug">
                {t.deliverSeamlessTitle}
              </h3>
              <p className="text-slate-300 mb-4 leading-relaxed">
                {t.deliverSeamlessDesc1}
              </p>
              <p className="text-slate-400 mb-8 leading-relaxed">
                {t.deliverSeamlessDesc2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 3: Verify the People Behind the Entity */}
      <section className="py-20 md:py-28" id="bf-ubo-verification">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5" id="bf-ubo-text">
              <h3 className="text-2xl font-bold text-white mb-4 leading-snug">
                {t.leverageKYCTitle}
              </h3>
              <p className="text-slate-300 mb-4 leading-relaxed">
                {t.leverageKYCDesc1}
              </p>
              <p className="text-slate-400 mb-8 leading-relaxed">
                {t.leverageKYCDesc2}
              </p>
            </div>

            <div className="lg:col-span-7" id="bf-ubo-preview">
              <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-800 mb-6">
                  <div className="w-9 h-9 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-200">{t.beneficialOwner}</h4>
                    <p className="text-[10px] text-slate-500 font-mono">{t.ownerId}: BO-9284</p>
                  </div>
                  <span className="ml-auto text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                    {t.needsReview}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-lg flex items-center justify-between">
                    <span className="text-xs text-slate-300">{t.governmentID}</span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                      {t.verified}
                    </span>
                  </div>

                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-lg flex items-center justify-between">
                    <span className="text-xs text-slate-300">{t.selfieLiveness}</span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                      {t.verified}
                    </span>
                  </div>

                  <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-lg flex items-center justify-between">
                    <span className="text-xs text-slate-300">{t.proofOfOwnership}</span>
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                      {t.pendingReview}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 4: Advanced Fraud Investigations & Graph Engine */}
      <section className="py-20 md:py-28 bg-slate-950 border-t border-slate-800/60" id="bf-graph-engine">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5" id="bf-graph-text">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-mono font-semibold text-violet-400 bg-violet-500/10 border border-violet-500/20 rounded mb-4 uppercase tracking-wider">
                {t.advancedGraphEngine}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-6 leading-tight">
                {t.unmaskHiddenFraudTitle}
              </h3>
              <p className="text-slate-300 mb-4 leading-relaxed">
                {t.unmaskHiddenFraudDesc1}
              </p>
              <p className="text-slate-400 mb-8 leading-relaxed">
                {t.unmaskHiddenFraudDesc2}
              </p>
              
              {/* Node Details Inspector Sidebar Panel */}
              <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl shadow-lg mt-6" id="bf-investigation-sidebar">
                <div className="flex items-center gap-2 mb-3.5 border-b border-slate-800 pb-3">
                  <Search className="w-4 h-4 text-violet-400" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.investigationConsole}</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-500 block mb-1 uppercase tracking-widest">{t.selectedLabel}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{selectedNode.label}</span>
                      <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${
                        selectedNode.status === 'alert' 
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' 
                          : selectedNode.status === 'warning'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      }`}>
                        {selectedNode.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                      {selectedNode.details}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-semibold text-slate-500 block mb-1 uppercase tracking-widest">{t.connectedSignals}</span>
                    <div className="space-y-1.5" id="bf-connected-nodes-list">
                      {connectedNodes.map((node) => (
                        <div 
                          key={node.id} 
                          onClick={() => setSelectedNodeId(node.id)}
                          className="flex items-center gap-2 text-xs text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 px-3 py-2 rounded-lg border border-slate-800 cursor-pointer transition-colors"
                        >
                          {node.type === 'ip' && <Zap className="w-3 h-3 text-blue-400" />}
                          {node.type === 'device' && <Tablet className="w-3 h-3 text-indigo-400" />}
                          {node.type === 'owner' && <Users className="w-3 h-3 text-amber-400" />}
                          {node.type === 'bank' && <Database className="w-3 h-3 text-emerald-400" />}
                          {node.type === 'business' && <Building2 className="w-3 h-3 text-slate-400" />}
                          <span className="truncate flex-1">{node.label}</span>
                          <span className="text-[9px] opacity-60 font-mono uppercase tracking-wider shrink-0">{t[node.type as keyof typeof t] || node.type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Interactive Graph Stage */}
            <div className="lg:col-span-7" id="bf-graph-preview">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden relative shadow-2xl" id="bf-graph-canvas-container">
                {/* Canvas Header */}
                <div className="bg-slate-950/80 border-b border-slate-800/80 px-5 py-4 flex justify-between items-center relative z-10">
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">{t.dynamicRelationshipMap}</h4>
                    <p className="text-[10px] text-slate-500 font-mono">8 {t.entitiesMapped}</p>
                  </div>
                  <div className="text-[10px] text-slate-400 italic">
                    {t.clickNodesTip}
                  </div>
                </div>

                {/* Graph Arena */}
                <div className="h-[420px] relative bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] flex items-center justify-center p-8 overflow-hidden" id="bf-arena">
                  {/* Absolute connections visualization list / backgrounds */}
                  <div className="absolute inset-0 pointer-events-none opacity-40">
                    <svg className="w-full h-full">
                      {/* Interactive Graph Connection Lines */}
                      <line x1="30%" y1="25%" x2="50%" y2="50%" stroke="#475569" strokeWidth="1.5" strokeDasharray="3" />
                      <line x1="70%" y1="25%" x2="50%" y2="50%" stroke="#e11d48" strokeWidth="2" />
                      <line x1="30%" y1="50%" x2="50%" y2="50%" stroke="#475569" strokeWidth="1.5" />
                      <line x1="70%" y1="50%" x2="50%" y2="50%" stroke="#d97706" strokeWidth="1.5" />
                      <line x1="50%" y1="75%" x2="50%" y2="50%" stroke="#e11d48" strokeWidth="2" />
                    </svg>
                  </div>

                  {/* Nodes Overlay */}
                  <div className="relative w-full h-full">
                    {/* B1: Alpha Solutions */}
                    <div 
                      onClick={() => setSelectedNodeId('b1')}
                      className={`absolute left-[15%] top-[15%] p-3.5 rounded-xl border cursor-pointer transition-all ${
                        selectedNodeId === 'b1' 
                          ? 'bg-amber-500/20 border-amber-500 shadow-lg shadow-amber-500/10 scale-105 z-20' 
                          : 'bg-slate-950 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <Building2 className="w-5 h-5 text-amber-400 mb-1" />
                      <div className="text-[10px] font-bold text-slate-200">Alpha Solutions</div>
                    </div>

                    {/* B2: Beta Consulting */}
                    <div 
                      onClick={() => setSelectedNodeId('b2')}
                      className={`absolute left-[40%] top-[40%] p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedNodeId === 'b2' 
                          ? 'bg-rose-500/20 border-rose-500 shadow-lg shadow-rose-500/10 scale-105 z-20' 
                          : 'bg-slate-950 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <Building2 className="w-6 h-6 text-rose-500 mb-1" />
                      <div className="text-xs font-black text-white">Beta Consulting</div>
                    </div>

                    {/* B3: Delta Trade */}
                    <div 
                      onClick={() => setSelectedNodeId('b3')}
                      className={`absolute right-[15%] top-[15%] p-3.5 rounded-xl border cursor-pointer transition-all ${
                        selectedNodeId === 'b3' 
                          ? 'bg-emerald-500/20 border-emerald-500 shadow-lg shadow-emerald-500/10 scale-105 z-20' 
                          : 'bg-slate-950 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <Building2 className="w-5 h-5 text-emerald-400 mb-1" />
                      <div className="text-[10px] font-bold text-slate-200">Delta Trade</div>
                    </div>

                    {/* IP1: Shared IP */}
                    <div 
                      onClick={() => setSelectedNodeId('ip1')}
                      className={`absolute left-[15%] bottom-[15%] p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedNodeId === 'ip1' 
                          ? 'bg-rose-500/20 border-rose-500 shadow-lg shadow-rose-500/10 scale-105 z-20' 
                          : 'bg-slate-950 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <Zap className="w-4 h-4 text-rose-400 mb-1" />
                      <div className="text-[10px] font-mono text-slate-300">IP: 198.51...</div>
                    </div>

                    {/* DEV1: Device Fingerprint */}
                    <div 
                      onClick={() => setSelectedNodeId('dev1')}
                      className={`absolute right-[15%] bottom-[15%] p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedNodeId === 'dev1' 
                          ? 'bg-rose-500/20 border-rose-500 shadow-lg shadow-rose-500/10 scale-105 z-20' 
                          : 'bg-slate-950 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <Tablet className="w-4 h-4 text-rose-400 mb-1" />
                      <div className="text-[10px] font-bold text-slate-300">{t.ipadProId}</div>
                    </div>

                    {/* OWN1: Owner Johnathan R. */}
                    <div 
                      onClick={() => setSelectedNodeId('own1')}
                      className={`absolute left-[40%] bottom-[10%] p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedNodeId === 'own1' 
                          ? 'bg-rose-500/20 border-rose-500 shadow-lg shadow-rose-500/10 scale-105 z-20' 
                          : 'bg-slate-950 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <Users className="w-4 h-4 text-rose-400 mb-1" />
                      <div className="text-[10px] font-bold text-slate-300">Johnathan R.</div>
                    </div>
                  </div>
                </div>

                {/* Canvas Footer */}
                <div className="bg-slate-950/80 border-t border-slate-800/80 px-5 py-3 text-[11px] text-slate-400 font-mono">
                  {t.visualizingSharedConnections} {connectedConnections.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion Feature: Use Cases */}
      <section className="py-20 md:py-28 border-t border-slate-800/50 bg-slate-950/20" id="bf-use-cases">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24" id="bf-use-cases-header">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-violet-400 bg-violet-500/10 border border-violet-500/20 rounded-full mb-4 uppercase tracking-wider">
              {t.useCasesBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight" id="bf-use-cases-title">
              {t.useCasesTitle}
            </h2>
            <p className="text-base text-slate-400 mt-4 leading-relaxed max-w-xl mx-auto">
              {t.useCasesDesc}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4" id="bf-use-cases-accordion">
            {[
              {
                id: 'onboarding',
                title: t.onboardingUseCaseTitle,
                content: t.onboardingUseCaseDesc
              },
              {
                id: 'transactions',
                title: t.transactionsUseCaseTitle,
                content: t.transactionsUseCaseDesc
              },
              {
                id: 'ongoing',
                title: t.ongoingUseCaseTitle,
                content: t.ongoingUseCaseDesc
              }
            ].map(item => {
              const isOpen = activeAccordion === item.id;
              return (
                <div 
                  key={item.id}
                  className="bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden transition-colors duration-200"
                >
                  <button
                    onClick={() => setActiveAccordion(isOpen ? '' : item.id)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left font-bold text-white hover:bg-slate-800/40 transition-colors"
                  >
                    <span>{item.title}</span>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-6 pt-1 text-sm text-slate-300 leading-relaxed border-t border-slate-800/50">
                          {item.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Grid: Multi-Signal Framework */}
      <section className="py-20 md:py-28 border-t border-slate-800/50 bg-slate-900/10" id="bf-signals-framework">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24" id="bf-grid-header">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4 uppercase tracking-wider">
              {t.multiSignalBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t.multiSignalTitle}
            </h2>
            <p className="text-sm text-slate-400 mt-4 max-w-lg mx-auto leading-relaxed">
              {t.multiSignalDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="bf-signals-grid">
            {[
              {
                title: t.sig1Title,
                desc: t.sig1Desc,
                icon: Building2,
                color: 'text-blue-600 bg-blue-50'
              },
              {
                title: t.sig2Title,
                desc: t.sig2Desc,
                icon: ClipboardCheck,
                color: 'text-indigo-600 bg-indigo-50'
              },
              {
                title: t.sig3Title,
                desc: t.sig3Desc,
                icon: Layers,
                color: 'text-violet-600 bg-violet-50'
              },
              {
                title: t.sig4Title,
                desc: t.sig4Desc,
                icon: Database,
                color: 'text-amber-600 bg-amber-50'
              },
              {
                title: t.sig5Title,
                desc: t.sig5Desc,
                icon: ShieldCheck,
                color: 'text-emerald-600 bg-emerald-50'
              },
              {
                title: t.sig6Title,
                desc: t.sig6Desc,
                icon: Network,
                color: 'text-rose-600 bg-rose-50'
              },
              {
                title: t.sig7Title,
                desc: t.sig7Desc,
                icon: Cpu,
                color: 'text-teal-600 bg-teal-50'
              },
              {
                title: t.sig8Title,
                desc: t.sig8Desc,
                icon: Zap,
                color: 'text-sky-600 bg-sky-50'
              },
              {
                title: t.sig9Title,
                desc: t.sig9Desc,
                icon: Share2,
                color: 'text-purple-600 bg-purple-50'
              }
            ].map((sig, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-slate-950/60 hover:bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-5 group-hover:border-slate-700 transition-colors">
                  <sig.icon className="w-5 h-5 text-blue-400" />
                </div>
                <h4 className="text-base font-bold text-white mb-2">{sig.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{sig.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Embedded Document Banner */}
      <section className="py-12 bg-slate-950/80 border-t border-slate-800/50" id="bf-doc-banner">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 justify-between bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <div className="flex items-center gap-4 text-left">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-blue-400" />
              </div>
              <p className="text-sm text-slate-200 max-w-md font-medium leading-relaxed">
                {t.learnDocAi}
              </p>
            </div>
            <button 
              onClick={onOpenSandbox}
              className="inline-flex items-center justify-center gap-2 px-4.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white rounded-lg border border-slate-700 transition-colors shrink-0"
            >
              <span>{t.readDocumentation}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Customer Case Study Quote Banner */}
      <section className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-800/50" id="bf-quote-banner">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <p className="text-lg md:text-xl text-slate-200 font-medium leading-relaxed italic mb-8">
            {t.quoteText}
          </p>
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold text-white">{t.quoteAuthor}</span>
            <span className="text-xs text-slate-500 mt-1">{t.quoteAuthorTitle}</span>
          </div>

          <div className="mt-12 inline-flex flex-col items-center p-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl text-left max-w-md mx-auto" id="6lock-cta-card">
            <span className="text-[10px] font-mono font-bold text-rose-400 tracking-wider mb-2 uppercase">{t.securedBrand}</span>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {t.securedBrandDesc}
            </p>
            <button 
              onClick={onOpenSandbox}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors group"
            >
              <span>{t.readCaseStudy}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative overflow-hidden py-20 bg-slate-950 border-t border-slate-800/50" id="bf-cta">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-950 to-slate-950 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t.readyToGetStarted}
          </h2>
          <p className="text-base text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
            {t.getStartedDesc}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={onOpenSandbox}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-sm font-bold text-white rounded-xl shadow-lg shadow-blue-950/40 hover:shadow-blue-950/60 transition-all duration-200"
              id="bf-cta-demo"
            >
              <span>{t.tryDemo}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={onOpenSandbox}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-sm font-bold text-slate-300 hover:text-white rounded-xl border border-slate-700 transition-colors"
              id="bf-cta-sandbox"
            >
              <span>{t.trySandbox}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
