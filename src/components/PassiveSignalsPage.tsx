/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Radio, ArrowRight, ShieldCheck, Zap, Users, Lock, Wifi, 
  Layers, Database, Laptop, Smartphone, HelpCircle, Check, 
  MapPin, Shield, Globe, Terminal, Play, RotateCcw, Sliders,
  SlidersHorizontal, CheckCircle2, AlertTriangle, AlertCircle, FileText, Share2, Network
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord, getLocalizedValue } from '../utils/i18nRuntime';

import { passiveSignalsTranslations, passiveSignalsInlineCopy, PASSIVE_SIGNALS_LOG_TRANSLATIONS } from '../translations/PassiveSignalsPageTranslations';
interface PassiveSignalsPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

export default function PassiveSignalsPage({ onOpenSandbox, onBackToLanding, onViewChange }: PassiveSignalsPageProps) {
  const { language } = useLanguage();
  const pageCopy = getLocalizedRecord(passiveSignalsTranslations, language as keyof typeof passiveSignalsTranslations, 'passiveSignalsTranslations');
  const pt = (key: keyof typeof passiveSignalsTranslations['en']) => {
    return getLocalizedValue(pageCopy, key, language, 'passiveSignalsTranslations');
  };
  const logT = getLocalizedRecord(PASSIVE_SIGNALS_LOG_TRANSLATIONS, language as keyof typeof PASSIVE_SIGNALS_LOG_TRANSLATIONS, 'PASSIVE_SIGNALS_LOG_TRANSLATIONS');

  const ti = (key: keyof typeof passiveSignalsInlineCopy) => {
    return getLocalizedValue(passiveSignalsInlineCopy[key], language, language, `passiveSignalsInlineCopy.${String(key)}`);
  };

  type SignalLogKey = keyof typeof PASSIVE_SIGNALS_LOG_TRANSLATIONS.en.labels;

  // 1. How It Works active step state
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);

  // 2. Tab 1 Simulation State (Collect)
  const [typedName, setTypedName] = useState('');
  const [simulationLogs, setSimulationLogs] = useState<Array<{ id: string; key: SignalLogKey; type: 'info' | 'success' }>>([
    { id: '1', key: 'deviceOs', type: 'info' },
    { id: '2', key: 'ipAddress', type: 'info' },
    { id: '3', key: 'networkConnection', type: 'info' },
  ]);

  const handleMockInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTypedName(val);
    
    // Add real-time interactive behavioral signal logs as they type
    const timestamp = new Date().toLocaleTimeString();
    const newLogs = [...simulationLogs];
    
    if (val.length === 1) {
      if (!newLogs.some(l => l.key === 'keystrokeHesitation')) {
        newLogs.push({ id: 'ks-hes', key: 'keystrokeHesitation', type: 'info' });
      }
    } else if (val.length === 4) {
      if (!newLogs.some(l => l.key === 'autofillPaste')) {
        newLogs.push({ id: 'copy-paste', key: 'autofillPaste', type: 'success' });
      }
    } else if (val.length === 8) {
      if (!newLogs.some(l => l.key === 'mouseJitter')) {
        newLogs.push({ id: 'jitter', key: 'mouseJitter', type: 'success' });
      }
    }
    setSimulationLogs(newLogs);
  };

  // 3. Tab 2 Simulation State (Customize Weights)
  const [behaviorWeight, setBehaviorWeight] = useState(60);
  const [deviceWeight, setDeviceWeight] = useState(40);
  const [networkWeight, setNetworkWeight] = useState(70);

  const getCombinedRiskScore = () => {
    // Weighted combination
    const total = Math.round((behaviorWeight + deviceWeight + networkWeight) / 3);
    return total;
  };

  const getRiskLabel = (score: number) => {
    if (score < 45) return { text: ti('low_risk_auto_approve'), color: 'text-emerald-600 bg-emerald-50 border-emerald-200' };
    if (score < 65) return { text: ti('moderate_risk_mfa_required'), color: 'text-amber-600 bg-amber-50 border-amber-200' };
    return { text: ti('high_risk_handoff_to_manual_review'), color: 'text-rose-600 bg-rose-50 border-rose-200' };
  };

  // 4. Tab 3 Simulation State (Ensemble Rule Simulator)
  const [ensembleTriggers, setEnsembleTriggers] = useState({
    shortcutUsage: true,
    deviceFingerprint: false,
    geolocationSpoof: true,
  });

  const getEnsembleDecision = () => {
    const activeCount = Object.values(ensembleTriggers).filter(Boolean).length;
    if (activeCount === 0) return { decision: ti('auto_approve'), color: 'bg-emerald-550 hover:bg-emerald-600 text-white', icon: CheckCircle2, desc: ti('zero_anomalies_smooth_onboarding_flow') };
    if (activeCount === 1) return { decision: ti('trigger_sms_verification'), color: 'bg-amber-500 hover:bg-amber-600 text-white', icon: AlertTriangle, desc: ti('single_weak_signal_resolve_with_lightweight_verification') };
    return { decision: ti('handoff_to_manual_review'), color: 'bg-rose-600 hover:bg-rose-700 text-white', icon: AlertCircle, desc: ti('multiple_combined_threats_safe_routing_for_custom') };
  };

  // 5. Accordion Features state
  const [expandedAccordion, setExpandedAccordion] = useState<number>(0);

  const FEATURE_GROUPS = [
    {
      title: ti('behavioral_signals'),
      desc: ti('monitor_how_users_interact_with_your_identity'),
      bulletTitle: ti('key_metrics_tracked'),
      bullets: [
        ti('hesitation_or_distraction_events_focus_lost_timing'),
        ti('time_to_completion_sub_second_robotic_completion'),
        ti('suspicious_submission_metadata_clipboard_pasting_of_critical'),
        ti('device_orientation_and_tremor_anomalies_indicating_bot'),
      ],
      details: {
        title: ti('behavioral_telemetry'),
        icon: Users,
        metric: ti('mouse_movement_linearity_14'),
        metricDesc: ti('lower_linearity_suggests_natural_human_trajectories_perfectly')
      }
    },
    {
      title: ti('network_signals'),
      desc: ti('analyze_ip_address_reputation_vpn_usage_proxy'),
      bulletTitle: ti('key_metrics_tracked'),
      bullets: [
        ti('proxy_vpn_detection_residential_proxy_mapping'),
        ti('autonomous_system_number_asn_classification'),
        ti('ip_velocity_checks_across_concurrent_attempts'),
        ti('geodistance_anomalies_travel_speeds_physically_impossible'),
      ],
      details: {
        title: ti('network_fingerprinting'),
        icon: Globe,
        metric: ti('ip_reputation_class_low_trust'),
        metricDesc: ti('identified_as_a_public_egress_node_of')
      }
    },
    {
      title: ti('device_and_app_signals'),
      desc: ti('inspect_operating_system_specs_browser_configuration_hardware'),
      bulletTitle: ti('key_metrics_tracked'),
      bullets: [
        ti('canvas_and_webgl_identity_hashing'),
        ti('system_language_and_keyboard_layout_mismatches'),
        ti('rooted_jailbroken_or_virtualized_hardware_signatures'),
        ti('multi_accounting_session_linking_across_browser_scopes'),
      ],
      details: {
        title: ti('device_forensic_payload'),
        icon: Smartphone,
        metric: ti('browser_entropy_score_18_2_bits'),
        metricDesc: ti('extremely_unique_browser_configuration_flags_shared_with')
      }
    },
    {
      title: ti('population_level_signals'),
      desc: ti('spot_larger_fraud_trends_by_detecting_device'),
      bulletTitle: ti('key_metrics_tracked'),
      bullets: [
        ti('device_sharing_frequencies_across_independent_accounts'),
        ti('repeated_credential_velocity_spikes_within_minutes'),
        ti('link_analysis_indicating_coordinate_ring_behavior'),
        ti('shared_biometric_hash_matching_across_unrelated_documents'),
      ],
      details: {
        title: ti('network_graph_overlays'),
        icon: Layers,
        metric: ti('connected_hub_weight_8_4'),
        metricDesc: ti('this_hardware_profile_is_linked_to_9')
      }
    },
    {
      title: ti('visual_signals'),
      desc: ti('examine_photo_metadata_canvas_manipulation_image_duplicate'),
      bulletTitle: ti('key_metrics_tracked'),
      bullets: [
        ti('exif_metadata_parsing_and_manipulation_markers'),
        ti('synthetic_image_generative_ai_injector_traces'),
        ti('cross_tenant_image_duplication_queries'),
        ti('camera_lens_hardware_parameter_validation'),
      ],
      details: {
        title: ti('metadata_and_duplicates'),
        icon: Database,
        metric: ti('metadata_mismatch_detected'),
        metricDesc: ti('document_image_claims_to_be_a_fresh')
      }
    },
  ];

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-slate-800 font-sans selection:bg-[#354CE1]/10 selection:text-[#354CE1]">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-[#5B6BF9] text-white pt-20 pb-32">
        {/* Subtle background grids & decorative graphics */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/10" />
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-purple-400/20 blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Breadcrumb back */}
          <button 
            onClick={onBackToLanding}
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-100 hover:text-white transition group"
          >
            <span className="text-base">←</span>
            <span>{pt('backToPlatform')}</span>
          </button>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 mb-6 shadow-sm">
            <Radio className="w-4 h-4 text-white animate-pulse" />
            <span className="text-xs font-extrabold uppercase tracking-widest text-white">{pt('passiveSignals')}</span>
          </div>

          {/* Heading */}
          <div className="max-w-3xl mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight leading-[1.1] mb-6 font-sans">
              {pt('heroHeading')}
            </h1>
            <p className="text-lg md:text-xl text-indigo-50 font-normal leading-relaxed mb-8 max-w-2xl">
              {pt('heroDesc')}
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={onOpenSandbox}
                className="bg-white text-[#354CE1] hover:bg-indigo-50 transition px-6 py-3.5 rounded-full font-bold text-sm shadow-md flex items-center gap-2"
              >
                <span>{pt('tryDemo')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 3 Columns Highlight Box */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 bg-white/10 backdrop-blur-md p-8 rounded-[1.75rem] border border-white/15">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center font-bold text-lg text-white">
                1
              </div>
              <h3 className="text-lg font-bold text-white">{pt('catchRealTimeTitle')}</h3>
              <p className="text-xs md:text-sm text-indigo-50 leading-relaxed">
                {pt('catchRealTimeDesc')}
              </p>
            </div>
            <div className="space-y-3 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-6">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center font-bold text-lg text-white">
                2
              </div>
              <h3 className="text-lg font-bold text-white">{pt('detectRepeatTitle')}</h3>
              <p className="text-xs md:text-sm text-indigo-50 leading-relaxed">
                {pt('detectRepeatDesc')}
              </p>
            </div>
            <div className="space-y-3 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-6">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center font-bold text-lg text-white">
                3
              </div>
              <h3 className="text-lg font-bold text-white">{pt('enrichProfilesTitle')}</h3>
              <p className="text-xs md:text-sm text-indigo-50 leading-relaxed">
                {pt('enrichProfilesDesc')}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. HOW IT WORKS - INTERACTIVE TABS */}
      <section className="py-24 bg-[#FAFBFD] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
            <div>
              <p className="text-[#354CE1] text-xs font-extrabold uppercase tracking-widest mb-2">{pt('processOverview')}</p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-sans">
                {pt('howItWorks')}
              </h2>
            </div>
            
            {/* Tabs Controller */}
            <div className="flex bg-slate-100 p-1.5 rounded-full border border-slate-200 w-full md:w-auto overflow-x-auto scrollbar-none">
              <button 
                onClick={() => setActiveStep(1)}
                className={`flex-1 md:flex-none text-center px-5 py-2.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
                  activeStep === 1 
                    ? 'bg-white text-[#354CE1] shadow-sm' 
                    : 'text-slate-650 hover:text-slate-900'
                }`}
              >
                {pt('tabCollect')}
              </button>
              <button 
                onClick={() => setActiveStep(2)}
                className={`flex-1 md:flex-none text-center px-5 py-2.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
                  activeStep === 2 
                    ? 'bg-white text-[#354CE1] shadow-sm' 
                    : 'text-slate-650 hover:text-slate-900'
                }`}
              >
                {pt('tabCustomize')}
              </button>
              <button 
                onClick={() => setActiveStep(3)}
                className={`flex-1 md:flex-none text-center px-5 py-2.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
                  activeStep === 3 
                    ? 'bg-white text-[#354CE1] shadow-sm' 
                    : 'text-slate-650 hover:text-slate-900'
                }`}
              >
                {pt('tabDecide')}
              </button>
            </div>
          </div>

          {/* Interactive Block Wrapper */}
          <div className="bg-indigo-50/40 border border-indigo-100/50 rounded-[2.5rem] p-8 lg:p-12 min-h-[460px]">
            <AnimatePresence mode="wait">
              {activeStep === 1 && (
                <motion.div 
                  key="step-1"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
                >
                  {/* Left content */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-[#354CE1]">
                      <Radio className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 leading-snug">
                      {pt('collectTitle')}
                    </h3>
                    <p className="text-slate-650 text-sm md:text-base leading-relaxed">
                      {pt('collectDesc')}
                    </p>
                    <div className="pt-2">
                      <span className="inline-flex items-center gap-2 bg-[#354CE1]/10 text-[#354CE1] font-bold text-xs px-3 py-1.5 rounded-lg">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#354CE1] animate-ping" />
                        {pt('dynamicTelemetry')}
                      </span>
                    </div>
                  </div>

                  {/* Right: Interactive phone mockup & logging console */}
                  <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md">
                    
                    {/* Left portion of simulation: mock UI */}
                    <div className="border border-slate-100 bg-slate-50/50 p-5 rounded-2xl flex flex-col justify-between min-h-[300px]">
                      <div>
                        <span className="text-[10px] text-slate-400 font-extrabold tracking-wider block mb-4 uppercase">{pt('verificationFrame')}</span>
                        <h4 className="text-sm font-bold text-slate-800 mb-1">{pt('verifyYourIdentity')}</h4>
                        <p className="text-[11px] text-slate-500 mb-4">{pt('verifyIdentityDesc')}</p>
                        
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-700 block">{pt('fullName')}</label>
                          <input 
                            type="text" 
                            placeholder={pt('typeTrigger')} 
                            value={typedName}
                            onChange={handleMockInputChange}
                            className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20 focus:border-[#354CE1]"
                          />
                          <p className="text-[9px] text-slate-450 italic">{pt('tryTyping')}</p>
                        </div>
                      </div>

                      <button 
                        onClick={onOpenSandbox}
                        className="w-full bg-[#354CE1] text-white py-2 rounded-lg text-xs font-bold hover:bg-[#354CE1]/95 transition"
                      >
                        {pt('uploadId')}
                      </button>
                    </div>

                    {/* Right portion: Live background logs */}
                    <div className="bg-slate-900 rounded-2xl p-4 font-mono text-[10.5px] text-slate-300 flex flex-col justify-between min-h-[300px]">
                      <div>
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-white font-bold text-[9px] uppercase tracking-wider">{pt('liveSignalStream')}</span>
                          </div>
                          <button 
                            onClick={() => { setTypedName(''); setSimulationLogs([
                              { id: '1', key: 'deviceOs', type: 'info' },
                              { id: '2', key: 'ipAddress', type: 'info' },
                              { id: '3', key: 'networkConnection', type: 'info' },
                            ]); }}
                            className="text-slate-400 hover:text-white transition"
                            title={logT.resetLog}
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="space-y-3 max-h-[190px] overflow-y-auto pr-1">
                          {simulationLogs.map((log) => (
                            <div key={log.id} className="border-l-2 border-indigo-500 pl-2">
                              <p className="text-indigo-400 font-bold text-[9px] uppercase">{logT.labels[log.key]}</p>
                              <p className="text-slate-200">{logT.values[log.key]}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="text-[9px] text-slate-400 pt-2 border-t border-slate-800 flex items-center justify-between">
                        <span>{pt('silentCapture')}</span>
                        <span>{logT.version}</span>
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}

              {activeStep === 2 && (
                <motion.div 
                  key="step-2"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
                >
                  {/* Left content */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-[#354CE1]">
                      <Sliders className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 leading-snug">
                      {pt('improveFraudTitle')}
                    </h3>
                    <p className="text-slate-650 text-sm md:text-base leading-relaxed">
                      {pt('improveFraudDesc')}
                    </p>
                    <div className="pt-2">
                      <span className="inline-flex items-center gap-2 bg-indigo-50 text-[#354CE1] font-bold text-xs px-3 py-1.5 rounded-lg border border-indigo-150">
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                        {pt('customSdkThresholds')}
                      </span>
                    </div>
                  </div>

                  {/* Right: Interactive weights builder */}
                  <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                      <h4 className="font-bold text-sm text-slate-900">{pt('tuningDashboard')}</h4>
                      <span className="text-[10px] bg-slate-150 font-bold px-2.5 py-1 rounded-full text-slate-700 uppercase">{pt('interactiveBadge')}</span>
                    </div>

                    <div className="space-y-6 mb-8">
                      {/* Control 1 */}
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                          <span>{pt('behavioralPattern')}</span>
                          <span>{behaviorWeight}{pt('weightSuffix')}</span>
                        </div>
                        <input 
                           type="range" 
                           min="10" 
                           max="90" 
                           value={behaviorWeight} 
                           onChange={(e) => setBehaviorWeight(Number(e.target.value))}
                           className="w-full accent-[#354CE1] h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                        />
                      </div>

                      {/* Control 2 */}
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                          <span>{pt('deviceAnomaly')}</span>
                          <span>{deviceWeight}{pt('weightSuffix')}</span>
                        </div>
                        <input 
                           type="range" 
                           min="10" 
                           max="90" 
                           value={deviceWeight} 
                           onChange={(e) => setDeviceWeight(Number(e.target.value))}
                           className="w-full accent-[#354CE1] h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                        />
                      </div>

                      {/* Control 3 */}
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                          <span>{pt('networkTrust')}</span>
                          <span>{networkWeight}{pt('weightSuffix')}</span>
                        </div>
                        <input 
                           type="range" 
                           min="10" 
                           max="90" 
                           value={networkWeight} 
                           onChange={(e) => setNetworkWeight(Number(e.target.value))}
                           className="w-full accent-[#354CE1] h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Result panel */}
                    <div className="bg-[#FAFBFD] p-5 rounded-2xl border border-slate-200/60 flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block mb-1">{pt('evaluatedScore')}</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-extrabold text-slate-900">{getCombinedRiskScore()}</span>
                          <span className="text-xs text-slate-500">{pt('riskSuffix')}</span>
                        </div>
                      </div>

                      <div className={`px-4 py-2 rounded-xl border text-xs font-bold ${getRiskLabel(getCombinedRiskScore()).color}`}>
                        {getRiskLabel(getCombinedRiskScore()).text}
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}

              {activeStep === 3 && (
                <motion.div 
                  key="step-3"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
                >
                  {/* Left content */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-[#354CE1]">
                      <Layers className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 leading-snug">
                      {pt('improveFraudVectorTitle')}
                    </h3>
                    <p className="text-slate-650 text-sm md:text-base leading-relaxed">
                      {pt('improveFraudVectorDesc')}
                    </p>
                    <div className="pt-2">
                      <span className="inline-flex items-center gap-2 bg-[#354CE1]/10 text-[#354CE1] font-bold text-xs px-3 py-1.5 rounded-lg">
                        <Terminal className="w-3.5 h-3.5" />
                        {pt('probabilityModeling')}
                      </span>
                    </div>
                  </div>

                  {/* Right: Interactive ensembles routing simulator */}
                  <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                      <h4 className="font-bold text-sm text-slate-900">{pt('ensembleCooccurrence')}</h4>
                      <span className="text-[10px] text-[#354CE1] font-extrabold bg-[#354CE1]/10 px-2 rounded">{pt('testCombinations')}</span>
                    </div>

                    <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                      {pt('toggleActiveRisk')}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
                      {/* Toggle 1 */}
                      <button 
                        onClick={() => setEnsembleTriggers(p => ({ ...p, shortcutUsage: !p.shortcutUsage }))}
                        className={`p-4 rounded-xl text-left border transition ${
                          ensembleTriggers.shortcutUsage 
                            ? 'bg-rose-50/50 border-rose-300 text-rose-900 shadow-xs' 
                            : 'bg-slate-50/50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-extrabold uppercase">{ti('telemetry')}</span>
                          <span className={`w-2 h-2 rounded-full ${ensembleTriggers.shortcutUsage ? 'bg-rose-500 animate-ping' : 'bg-slate-300'}`} />
                        </div>
                        <h5 className="font-bold text-xs">{pt('shortcutUsageLabel')}</h5>
                        <p className="text-[10px] text-slate-400 mt-1">{pt('roboticKeyEntry')}</p>
                      </button>

                      {/* Toggle 2 */}
                      <button 
                        onClick={() => setEnsembleTriggers(p => ({ ...p, deviceFingerprint: !p.deviceFingerprint }))}
                        className={`p-4 rounded-xl text-left border transition ${
                          ensembleTriggers.deviceFingerprint 
                            ? 'bg-rose-50/50 border-rose-300 text-rose-900 shadow-xs' 
                            : 'bg-slate-50/50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-extrabold uppercase">{ti('device')}</span>
                          <span className={`w-2 h-2 rounded-full ${ensembleTriggers.deviceFingerprint ? 'bg-rose-500 animate-ping' : 'bg-slate-300'}`} />
                        </div>
                        <h5 className="font-bold text-xs">{pt('emulatorCheckLabel')}</h5>
                        <p className="text-[10px] text-slate-400 mt-1">{pt('vmDetectionLabel')}</p>
                      </button>

                      {/* Toggle 3 */}
                      <button 
                        onClick={() => setEnsembleTriggers(p => ({ ...p, geolocationSpoof: !p.geolocationSpoof }))}
                        className={`p-4 rounded-xl text-left border transition ${
                          ensembleTriggers.geolocationSpoof 
                            ? 'bg-rose-50/50 border-rose-300 text-rose-900 shadow-xs' 
                            : 'bg-slate-50/50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-extrabold uppercase">{ti('network')}</span>
                          <span className={`w-2 h-2 rounded-full ${ensembleTriggers.geolocationSpoof ? 'bg-rose-500 animate-ping' : 'bg-slate-300'}`} />
                        </div>
                        <h5 className="font-bold text-xs">{pt('ipGeoSpoofLabel')}</h5>
                        <p className="text-[10px] text-slate-400 mt-1">{pt('highTravelVelocity')}</p>
                      </button>
                    </div>

                    {/* Result visual */}
                    <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                      <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                        <span className="font-mono text-[10px] text-slate-450 uppercase">{pt('decisionEngineRes')}</span>
                        <div className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#354CE1]" />
                          <span className="text-[10px] font-bold text-slate-600">{logT.ensembleVersion}</span>
                        </div>
                      </div>
                      
                      <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {React.createElement(getEnsembleDecision().icon, { className: "w-5 h-5 text-[#354CE1]" })}
                            <h4 className="font-bold text-sm text-slate-950">{getEnsembleDecision().decision}</h4>
                          </div>
                          <p className="text-xs text-slate-500">{getEnsembleDecision().desc}</p>
                        </div>

                        <button 
                          onClick={onOpenSandbox}
                          className={`px-5 py-2.5 rounded-full text-xs font-bold transition shadow-xs whitespace-nowrap ${getEnsembleDecision().color}`}
                        >
                          {pt('viewActionBtn')}
                        </button>
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* 3. RULE ENGINE DETAILS (From Screenshot: Screen for fraud risk Conditional blocks) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Texts */}
            <div className="lg:col-span-5 space-y-6">
              <p className="text-[#354CE1] text-xs font-extrabold uppercase tracking-widest">{pt('orchestratedDecisions')}</p>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 font-sans">
                {pt('streamlineAccuracy')}
              </h2>
              <p className="text-slate-650 text-sm md:text-base leading-relaxed">
                {pt('buildRichRules')}
              </p>
              <div className="pt-2">
                <button 
                  onClick={onOpenSandbox}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#354CE1] hover:text-[#354CE1]/80 transition group"
                >
                  <span>{pt('seeRuleEngine')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Graphics (Screen for fraud risk replica) */}
            <div className="lg:col-span-7 bg-[#FAFBFD] p-6 sm:p-10 rounded-[2.5rem] border border-slate-200/70 shadow-sm">
              <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-md max-w-lg mx-auto">
                {/* Visual Header */}
                <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex justify-between items-center">
                  <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">{pt('screenForFraudRisk')}</span>
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-450">
                    <span className="w-2 h-2 rounded-full bg-[#354CE1]" />
                    <span>{pt('ruleEditor')}</span>
                  </div>
                </div>

                {/* Conditional statement tree mockup */}
                <div className="p-6 space-y-4">
                  {/* Conditional Block wrapper */}
                  <div className="border border-indigo-100 rounded-xl bg-indigo-50/20 p-4 space-y-3 relative">
                    <div className="absolute left-6 top-10 bottom-6 w-0.5 bg-indigo-100" />
                    
                    <div className="flex items-center gap-2">
                      <span className="bg-indigo-100 text-[#354CE1] text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">{pt('conditionalLabel')}</span>
                    </div>

                    {/* Condition 1 */}
                    <div className="flex items-center gap-2 pl-6 flex-wrap text-xs text-slate-700">
                      <span className="text-slate-450 font-bold w-6">{ti('if')}</span>
                      <span className="bg-slate-100 px-2.5 py-1 rounded font-mono font-bold text-[10px] text-slate-800">{ti('shortcut_usage')}</span>
                      <span className="text-slate-450">{ti('is')}</span>
                      <span className="bg-rose-50 text-rose-700 border border-rose-100 px-2 py-0.5 rounded font-bold text-[10px]">{ti('high_risk')}</span>
                    </div>

                    {/* Condition 2 */}
                    <div className="flex items-center gap-2 pl-6 flex-wrap text-xs text-slate-700">
                      <span className="text-slate-450 font-bold w-6">{ti('and')}</span>
                      <span className="bg-slate-100 px-2.5 py-1 rounded font-mono font-bold text-[10px] text-slate-800">{ti('device_fingerprint')}</span>
                      <span className="text-slate-450">{ti('is')}</span>
                      <span className="bg-rose-50 text-rose-700 border border-rose-100 px-2 py-0.5 rounded font-bold text-[10px]">{ti('high_risk')}</span>
                    </div>

                    {/* Condition 3 */}
                    <div className="flex items-center gap-2 pl-6 flex-wrap text-xs text-slate-700">
                      <span className="text-slate-450 font-bold w-6">{ti('and')}</span>
                      <span className="bg-slate-100 px-2.5 py-1 rounded font-mono font-bold text-[10px] text-slate-800">{ti('geolocation_spoof')}</span>
                      <span className="text-slate-455">{ti('is')}</span>
                      <span className="bg-rose-50 text-rose-700 border border-rose-100 px-2 py-0.5 rounded font-bold text-[10px]">{ti('high_risk')}</span>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200/60 p-3 rounded-xl">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] font-bold text-slate-800 leading-tight">{ti('continue_if')}</p>
                        <p className="text-[9px] text-slate-500 leading-none">{ti('no_triggers')}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 bg-amber-50 border border-amber-200/60 p-3 rounded-xl">
                      <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                        <span className="text-[10px]">🚩</span>
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] font-bold text-slate-800 leading-tight">{ti('flag_for')}</p>
                        <p className="text-[9px] text-slate-500 leading-none">{ti('review')}</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. KEY FEATURES ACCORDION SECTION */}
      <section className="py-24 bg-slate-50/50 border-t border-b border-slate-200/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Header */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
              <p className="text-[#354CE1] text-xs font-extrabold uppercase tracking-widest">{pt('keyFeatures')}</p>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-tight font-sans">
                {pt('automaticallyCollect')}
              </h2>
              <p className="text-slate-655 text-sm md:text-base leading-relaxed">
                {pt('automaticallyCollectDesc')}
              </p>
              <div className="pt-2">
                <button 
                  onClick={onOpenSandbox}
                  className="bg-[#354CE1] text-white px-5 py-3 rounded-full font-bold text-xs hover:bg-[#354CE1]/90 transition inline-flex items-center gap-2 shadow-xs"
                >
                  <span>{pt('launchSandbox')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Accordion List */}
            <div className="lg:col-span-7 space-y-4">
              {FEATURE_GROUPS.map((fg, idx) => {
                const isExpanded = expandedAccordion === idx;
                return (
                  <div 
                    key={idx}
                    className={`border rounded-2xl bg-white overflow-hidden transition-all duration-350 ${
                      isExpanded 
                        ? 'border-indigo-200 shadow-md' 
                        : 'border-slate-200 hover:border-slate-350'
                    }`}
                  >
                    {/* Header trigger */}
                    <button 
                      onClick={() => setExpandedAccordion(idx)}
                      className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm md:text-base focus:outline-none"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-2.5 h-2.5 rounded-full ${isExpanded ? 'bg-[#354CE1]' : 'bg-slate-300'}`} />
                        <span>{fg.title}</span>
                      </div>
                      <span className="text-lg font-normal text-slate-400">
                        {isExpanded ? '−' : '+'}
                      </span>
                    </button>

                    {/* Expandable Content Panel */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                        >
                          <div className="px-6 pb-6 border-t border-slate-100 pt-5 space-y-5">
                            <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-semibold bg-[#FAFBFD] p-3.5 rounded-xl border border-slate-100">
                              {fg.desc}
                            </p>
                            
                            <div className="space-y-2">
                              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{fg.bulletTitle}</h4>
                              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-650">
                                {fg.bullets.map((b, bIdx) => (
                                  <li key={bIdx} className="flex items-start gap-2">
                                    <span className="text-[#354CE1] text-xs leading-none shrink-0 mt-0.5">✓</span>
                                    <span>{b}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Mini technical payload mock inside expanded state */}
                            <div className="bg-slate-900 rounded-xl p-4 font-mono text-[10.5px] text-slate-300 space-y-2 border border-slate-800">
                              <div className="flex items-center gap-1.5 text-indigo-400 text-[9px] font-bold uppercase tracking-wider">
                                {React.createElement(fg.details.icon, { className: "w-3.5 h-3.5" })}
                                <span>{fg.details.title}</span>
                              </div>
                              <div className="border-t border-slate-800/80 pt-1">
                                <p className="text-white font-bold">{fg.details.metric}</p>
                                <p className="text-slate-400 text-[9.5px] leading-relaxed mt-1">{fg.details.metricDesc}</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* 5. TEAM USE CASES GRID */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          
          <div className="max-w-2xl mx-auto mb-16 text-center space-y-4">
            <p className="text-[#354CE1] text-xs font-extrabold uppercase tracking-widest">{pt('enterpriseWorkflows')}</p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-sans">
              {pt('howTeamsUse')}
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              {pt('howTeamsUseDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Box 1 */}
            <div className="p-8 rounded-3xl border border-slate-200 bg-white hover:border-indigo-200 transition text-left flex flex-col justify-between min-h-[190px]">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-[#354CE1]">
                  <Laptop className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-950">{pt('adjustFrictionTitle')}</h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                  {pt('adjustFrictionDesc')}
                </p>
              </div>
            </div>

            {/* Box 2 */}
            <div className="p-8 rounded-3xl border border-slate-200 bg-white hover:border-indigo-200 transition text-left flex flex-col justify-between min-h-[190px]">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-[#354CE1]">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-950">{pt('preventAtoTitle')}</h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                  {pt('preventAtoDesc')}
                </p>
              </div>
            </div>

            {/* Box 3 */}
            <div className="p-8 rounded-3xl border border-slate-200 bg-white hover:border-indigo-200 transition text-left flex flex-col justify-between min-h-[190px]">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-[#354CE1]">
                  <Network className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-950">{pt('detectDuplicateTitle')}</h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                  {pt('detectDuplicateDesc')}
                </p>
              </div>
            </div>

            {/* Box 4 */}
            <div className="p-8 rounded-3xl border border-slate-200 bg-white hover:border-indigo-200 transition text-left flex flex-col justify-between min-h-[190px]">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-[#354CE1]">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-950">{pt('automateRoutingTitle')}</h3>
                <p className="text-xs md:text-sm text-slate-655 leading-relaxed">
                  {pt('automateRoutingDesc')}
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. TESTIMONIAL BLOCK (Coffee Meets Bagel) */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-200/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          
          {/* Large elegant centered quote */}
          <blockquote className="text-xl md:text-2xl font-serif text-slate-900 tracking-wide leading-relaxed font-medium mb-8">
            {ti('with_identra_we_can_check_government_ids')
            }
          </blockquote>
          
          <p className="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-12">
            JJ Foster, {ti('trust_and_safety_manager_at_coffee_meets')}
          </p>

          {/* White Card with Logo & Case Study Link */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-2.5">
              <span className="text-lg font-black text-rose-500 font-sans tracking-tight">{logT.caseStudyBrand}</span>
            </div>
            
            <p className="text-xs text-slate-650 md:max-w-md text-center md:text-left leading-relaxed">
              {pt('caseStudySummary')}
            </p>

            <button 
              onClick={onOpenSandbox}
              className="bg-black text-white hover:bg-slate-900 text-xs font-bold px-4 py-2.5 rounded-full transition shrink-0 inline-flex items-center gap-1"
            >
              <span>{pt('readCaseStudy')}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

        </div>
      </section>

      {/* 7. PARTNER MARKETPLACE CALLOUT CARD */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-indigo-550 bg-gradient-to-tr from-[#5B6BF9] to-[#7B8BFC] text-white rounded-[2.5rem] p-8 md:p-14 lg:p-20 relative overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Background art overlays */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            
            {/* Left Texts */}
            <div className="lg:col-span-6 space-y-6 relative z-10">
              <span className="text-xs font-extrabold text-indigo-100 uppercase tracking-widest bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10">{ti('identra_marketplace')}</span>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                {pt('integrateMarketplaceTitle')}
              </h3>
              <p className="text-indigo-50 text-sm md:text-base leading-relaxed">
                {pt('integrateMarketplaceDesc')}
              </p>
              <div className="pt-2">
                <button 
                  onClick={onOpenSandbox}
                  className="bg-white text-[#354CE1] hover:bg-indigo-50 font-bold text-xs px-6 py-3.5 rounded-full transition shadow-sm inline-flex items-center gap-2"
                >
                  <span>{pt('learnMoreBtn')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Graphics: Connected platform logos */}
            <div className="lg:col-span-6 relative z-10 flex justify-center">
              <div className="grid grid-cols-3 gap-4 p-6 bg-white/10 backdrop-blur-xs rounded-3xl border border-white/15 max-w-sm w-full">
                {['MX', 'Equifax', 'SentiLink', 'LexisNexis', 'TransUnion', 'Plaid', 'Alloy', 'Identra', 'Experian'].map((partner, idx) => (
                  <div 
                    key={idx}
                    className={`aspect-square rounded-2xl bg-white/90 shadow-xs flex items-center justify-center p-3 text-center border border-white/20 transition hover:scale-105 duration-250 ${
                      partner === 'Identra' ? 'bg-[#5B6BF9] text-white border-transparent' : 'text-slate-800'
                    }`}
                  >
                    <div>
                      <p className="text-[10px] font-black tracking-tight leading-none mb-0.5">{partner}</p>
                      <p className={`text-[7px] leading-none ${partner === 'Identra' ? 'text-indigo-100' : 'text-slate-455'}`}>{partner === 'Identra' ? (ti('core')) : (ti('partner'))}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. EXPLORE MORE OF IDENTRA'S IDENTITY PLATFORM */}
      <section className="py-24 bg-slate-50/50 border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-12 font-sans">
            {pt('exploreMorePlatform')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Box 1 */}
            <button 
              onClick={() => { if (onViewChange) onViewChange('dynamic-flow'); }}
              className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-[#354CE1]/50 text-left transition group shadow-xs relative overflow-hidden min-h-[160px] flex flex-col justify-between"
            >
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-[#354CE1] transition">
                  {pt('buildBetterFlowsTitle')}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                  {pt('buildBetterFlowsDesc')}
                </p>
              </div>
              <div className="text-xs font-bold text-[#354CE1] flex items-center gap-1 group-hover:translate-x-1 transition-transform self-start">
                <span>{pt('viewDynamicFlowBtn')}</span>
                <span>→</span>
              </div>
            </button>

            {/* Box 2 */}
            <button 
              onClick={() => { if (onViewChange) onViewChange('business-fraud'); }}
              className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-[#354CE1]/50 text-left transition group shadow-xs relative overflow-hidden min-h-[160px] flex flex-col justify-between"
            >
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-[#354CE1] transition">
                  {pt('catchMoreFraudTitle')}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                  {pt('catchMoreFraudDesc')}
                </p>
              </div>
              <div className="text-xs font-bold text-[#354CE1] flex items-center gap-1 group-hover:translate-x-1 transition-transform self-start">
                <span>{pt('viewFraudPreventionBtn')}</span>
                <span>→</span>
              </div>
            </button>
          </div>

        </div>
      </section>

      {/* 9. READY TO GET STARTED */}
      <section className="bg-indigo-50/50 py-24 text-center border-t border-slate-200/55">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 font-sans">
            {pt('readyToGetStarted')}
          </h2>
          <p className="text-slate-650 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            {pt('readyToGetStartedDesc')}
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button 
              onClick={onOpenSandbox}
              className="bg-[#354CE1] text-white hover:bg-[#354CE1]/90 transition px-6 py-3.5 rounded-full font-bold text-xs shadow-md flex items-center gap-1.5"
            >
              <span>{ti('try_the_demo')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={onOpenSandbox}
              className="bg-white text-slate-800 hover:bg-slate-50 transition px-6 py-3.5 rounded-full font-bold text-xs border border-slate-200 flex items-center gap-1.5"
            >
              <span>{pt('tryItNowBtn')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
