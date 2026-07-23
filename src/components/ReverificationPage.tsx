/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState } from 'react';
import { 
  ArrowRight, ShieldCheck, Cpu, ScanLine, RefreshCw, CheckCircle2, 
  Users, AlertCircle, Camera, Lock,
  Smartphone, ShieldAlert, FileText, 
  Mail, MapPin, CheckCircle,
  AlertOctagon, GitBranch, 
  Workflow, FileCheck, Landmark as BankIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord, getLocalizedValue } from '../utils/i18nRuntime';
import { reverificationPageTranslations } from '../translations/ReverificationPageTranslations';

interface ReverificationPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  freshSelfieUrl: string;
  riskProfile: 'low' | 'medium' | 'high';
  isSpoof: boolean;
  similarityScore: number;
}

type ReverificationTranslations = typeof reverificationPageTranslations.en;
type ReverificationTextKey = {
  [K in keyof ReverificationTranslations]: ReverificationTranslations[K] extends string ? K : never
}[keyof ReverificationTranslations];
type TriggerEvent = 'routing' | 'wire' | 'password' | 'device';
type VerificationMethod = 'selfie' | 'sms' | 'doc';

const PROFILE_SCENARIOS: UserProfile[] = [
  {
    id: 'user-1',
    name: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    freshSelfieUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    riskProfile: 'low',
    isSpoof: false,
    similarityScore: 99.4
  },
  {
    id: 'user-2',
    name: 'Michael Sterling',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    freshSelfieUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200', // mismatched face!
    riskProfile: 'high',
    isSpoof: true,
    similarityScore: 18.2
  },
  {
    id: 'user-3',
    name: 'Sophia Alvarez',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    freshSelfieUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200', // same person, different lighting/glasses
    riskProfile: 'medium',
    isSpoof: false,
    similarityScore: 89.6
  }
];

export default function ReverificationPage({ onOpenSandbox, onViewChange }: ReverificationPageProps) {
  const { language } = useLanguage();
  const pageCopy = getLocalizedRecord(reverificationPageTranslations, language as keyof typeof reverificationPageTranslations, 'reverificationPageTranslations');
  const text = (key: ReverificationTextKey): string => getLocalizedValue(pageCopy, key, language, 'reverificationPageTranslations');
  const format = (key: ReverificationTextKey, values: Record<string, string | number>) =>
    Object.entries(values).reduce(
      (message, [name, value]) => message.replace(`{${name}}`, String(value)),
      text(key)
    );
  const triggerEventNames: Record<TriggerEvent, string> = {
    routing: text('logEventRouting'),
    wire: text('logEventWire'),
    password: text('logEventPassword'),
    device: text('logEventDevice')
  };
  const triggerEventTitles: Record<TriggerEvent, string> = {
    routing: text('triggerRoutingTitle'),
    wire: text('triggerWireTitle'),
    password: text('triggerPasswordTitle'),
    device: text('triggerDeviceTitle')
  };
  const verificationMethodNames: Record<VerificationMethod, string> = {
    selfie: text('logMethodSelfie'),
    sms: text('logMethodSms'),
    doc: text('logMethodDoc')
  };
  const riskLabel = (risk: UserProfile['riskProfile']) => ({
    low: text('riskLow'),
    medium: text('riskMedium'),
    high: text('riskHigh')
  }[risk]);

  // Simulator configuration states
  const [selectedProfile, setSelectedProfile] = useState<UserProfile>(PROFILE_SCENARIOS[0]);
  const profileCopy = pageCopy.profiles[selectedProfile.id as keyof typeof pageCopy.profiles] || pageCopy.profiles['user-1'];
  const [triggerEvent, setTriggerEvent] = useState<TriggerEvent>('routing');
  const [verificationMethod, setVerificationMethod] = useState<VerificationMethod>('selfie');
  
  // Simulation execution states
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentStep, setCurrentStep] = useState<'idle' | 'trigger' | 'prompt' | 'capture' | 'analyze' | 'result'>('idle');
  const [simLogs, setSimLogs] = useState<string[]>([]);
  const [otpCode, setOtpCode] = useState('');
  const [verificationResult, setVerificationResult] = useState<'approve' | 'review' | 'block' | null>(null);

  // Log message helper
  const addLog = (msg: string) => {
    setSimLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  // Run the full simulation
  const handleStartSimulation = () => {
    setIsSimulating(true);
    setCurrentStep('trigger');
    setSimLogs([]);
    setOtpCode('');
    setVerificationResult(null);

    addLog(format('logSystemInitialized', { event: triggerEventNames[triggerEvent] }));
    addLog(text('logInitiatingEngine'));
    addLog(format('logConfiguredPolicy', { method: verificationMethodNames[verificationMethod] }));

    // Next step
    setTimeout(() => {
      setCurrentStep('prompt');
      addLog(text('logSendingPrompt'));
    }, 1500);
  };

  const handleUserVerificationAction = () => {
    setCurrentStep('analyze');
    const currentProfileCopy = pageCopy.profiles[selectedProfile.id as keyof typeof pageCopy.profiles] || pageCopy.profiles['user-1'];
    addLog(text('logReceivingPayload'));
    addLog(text('logExtractingTelemetry'));
    
    if (selectedProfile.id !== 'user-1') {
      addLog(format('logNetworkWarning', { ip: currentProfileCopy.currentIp }));
    }

    if (verificationMethod === 'selfie') {
      addLog(text('logProcessingSelfie'));
      setTimeout(() => {
        if (selectedProfile.isSpoof) {
          addLog(format('logPresentationAttack', { detail: currentProfileCopy.spoofDetectionDetail }));
          setVerificationResult('block');
          setCurrentStep('result');
          addLog(text('logAutomatedBlock'));
        } else {
          addLog(format('logComparingFace', { date: currentProfileCopy.onboardedAt }));
          addLog(format('logSimilarity', { score: selectedProfile.similarityScore }));
          
          if (selectedProfile.similarityScore >= 95 && selectedProfile.riskProfile === 'low') {
            setVerificationResult('approve');
            setCurrentStep('result');
            addLog(text('logVerified'));
          } else {
            addLog(format('logSimilarityWarning', { score: selectedProfile.similarityScore }));
            setVerificationResult('review');
            setCurrentStep('result');
            addLog(text('logManualReview'));
          }
        }
      }, 2000);
    } else if (verificationMethod === 'sms') {
      addLog(text('logValidatingSms'));
      setTimeout(() => {
        if (selectedProfile.riskProfile === 'high') {
          addLog(text('logSimSwapWarning'));
          setVerificationResult('review');
          addLog(text('logEscalateOtp'));
        } else {
          setVerificationResult('approve');
          addLog(text('logSmsSuccess'));
        }
        setCurrentStep('result');
      }, 1500);
    } else {
      addLog(text('logParsingDoc'));
      addLog(text('logOcrMatch'));
      setTimeout(() => {
        if (selectedProfile.riskProfile === 'high') {
          setVerificationResult('block');
          addLog(text('logIdMismatch'));
        } else {
          setVerificationResult('approve');
          addLog(text('logDocValidated'));
        }
        setCurrentStep('result');
      }, 2000);
    }
  };

  const handleResetSimulation = () => {
    setIsSimulating(false);
    setCurrentStep('idle');
    setSimLogs([]);
    setVerificationResult(null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      
      {/* 1. Hero Section */}
      <section className="bg-[#4D86F7] pt-16 pb-24 px-6 relative overflow-hidden text-slate-900">
        {/* Background circular ornaments */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/20 rounded-full blur-2xl pointer-events-none -translate-x-1/3 translate-y-1/3" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold tracking-wide text-slate-950">
              <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
              <span>{text('badge')}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight leading-[1.08] text-slate-950">
              {text('heroTitle')}
            </h1>
            
            <p className="text-lg md:text-xl text-slate-900/90 leading-relaxed font-normal max-w-xl">
              {text('heroDesc')}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button
                onClick={onOpenSandbox}
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-100 text-slate-950 font-bold rounded-full shadow-lg transition duration-300 text-sm flex items-center justify-center gap-2 group"
              >
                <span>{text('tryDemo')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => {
                  const el = document.getElementById('simulator-anchor');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-4 border border-slate-950/20 hover:bg-white/10 text-slate-950 font-bold rounded-full transition duration-300 text-sm"
              >
                {text('trySimulator')}
              </button>
            </div>
          </div>

          {/* Hero Right: HTML/CSS/SVG Premium Vector Illustration */}
          <div className="lg:col-span-6 flex justify-center relative">
            <div className="relative w-full max-w-md h-[400px] md:h-[450px] bg-[#6698FF] rounded-[3rem] shadow-2xl border-4 border-white/30 overflow-hidden flex items-center justify-center">
              
              {/* Concentric heart/link background design */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#4D86F7] to-[#3874E6] flex items-center justify-center">
                
                {/* Simulated custom geometric/heart/loop vectors from the screenshot */}
                <div className="absolute w-[360px] h-[360px] border border-white/20 rounded-full animate-pulse" />
                <div className="absolute w-[280px] h-[280px] border border-white/30 rounded-full" />
                <div className="absolute w-[200px] h-[200px] border border-white/40 rounded-full" />
                
                {/* SVG Heart Pattern overlay */}
                <svg className="absolute w-72 h-72 text-white/10 pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50 85 C50 85, 10 50, 10 30 C10 15, 25 10, 50 35 C75 10, 90 15, 90 30 C90 50, 50 85, 50 85 Z" />
                </svg>
              </div>

              {/* The Person wearing yellow striped shirt holding smartphone */}
              <div className="absolute bottom-0 w-80 h-80 flex flex-col items-center justify-end">
                
                {/* Green background circle representing core secure zone */}
                <div className="absolute w-64 h-64 bg-[#49B890]/90 rounded-full -bottom-16 z-0 flex items-center justify-center">
                  {/* Concentric lines pattern */}
                  <div className="w-56 h-56 rounded-full border-4 border-dashed border-white/20" />
                </div>

                {/* Hand & Phone holding mock */}
                <div className="absolute bottom-4 -right-2 z-20 transform rotate-[-8deg] hover:rotate-0 transition-transform duration-500">
                  <div className="relative bg-slate-900 text-white w-32 h-60 rounded-3xl border-[3px] border-slate-700 shadow-2xl flex flex-col overflow-hidden">
                    {/* Phone camera notch */}
                    <div className="h-4 bg-slate-900 w-full flex justify-center items-center">
                      <div className="w-12 h-2.5 bg-black rounded-full" />
                    </div>
                    {/* Phone Screen Mock */}
                    <div className="flex-1 bg-slate-950 p-3 flex flex-col justify-between">
                      <div className="flex justify-between items-center text-[8px] text-slate-400 font-mono">
                        <span>{text('identraBrand')}</span>
                        <span className="flex items-center gap-0.5">
                          <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" /> {text('secure')}
                        </span>
                      </div>
                      
                      {/* Face Scan Overlay */}
                      <div className="my-auto flex flex-col items-center gap-2">
                        <div className="relative w-16 h-16 rounded-full border-2 border-emerald-400 p-0.5 flex items-center justify-center overflow-hidden bg-slate-900">
                          <img 
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" 
                            alt={text('scanTargetAlt')} 
                            className="w-full h-full rounded-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 border-t-2 border-emerald-400/80 animate-scan" />
                        </div>
                        <span className="text-[7px] text-emerald-400 font-mono uppercase font-bold tracking-wider text-center block">
                          {text('biometricMatch')}
                        </span>
                      </div>

                      <div className="h-6 bg-emerald-500 rounded-lg flex items-center justify-center text-[8px] font-bold text-slate-950">
                        {text('authenticationPassed')}
                      </div>
                    </div>
                  </div>
                  
                  {/* Arm / Hand Sleeve */}
                  <div className="absolute -bottom-16 -right-6 w-16 h-28 bg-[#E3A010] border-t-4 border-black/20 rounded-t-xl" />
                </div>

                {/* Person Head / Neck */}
                <div className="w-28 h-28 rounded-full bg-[#F5C396] relative z-10 -mb-6 flex items-center justify-center overflow-hidden border-4 border-white/20">
                  {/* Face details */}
                  <div className="absolute w-1.5 h-3 bg-[#D49863] rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute w-2 h-2 bg-slate-800 rounded-full top-12 left-8" />
                  <div className="absolute w-2 h-2 bg-slate-800 rounded-full top-12 right-8" />
                  <div className="absolute w-6 h-3 border-b-2 border-slate-800 rounded-b-full top-14" />
                  {/* Hair */}
                  <div className="absolute top-0 inset-x-0 h-10 bg-slate-800 rounded-b-2xl" />
                </div>

                {/* Yellow striped shirt body */}
                <div className="w-56 h-36 bg-[#F2B922] rounded-t-[3rem] relative z-0 flex flex-col justify-start items-center pt-4 overflow-hidden border-t-4 border-white/10">
                  {/* Striped Lines */}
                  <div className="w-full h-1.5 bg-slate-900/10 mb-3" />
                  <div className="w-full h-1.5 bg-slate-900/10 mb-3" />
                  <div className="w-full h-1.5 bg-slate-900/10 mb-3" />
                  <div className="w-full h-1.5 bg-slate-900/10 mb-3" />
                  <div className="w-full h-1.5 bg-slate-900/10" />
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. Customer Trust Logos */}
      <section className="bg-[#0F1E36] py-10 text-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-mono tracking-wider text-slate-400 uppercase">
            {text('trustLogos')}
          </p>
          <div className="flex flex-wrap items-center gap-8 md:gap-12 opacity-85">
            <span className="font-display font-black text-lg tracking-wider text-slate-200">branch</span>
            <span className="font-display font-semibold text-lg tracking-wide text-slate-200">Travelex</span>
            <span className="font-display font-bold text-lg tracking-wider text-slate-200">Rently</span>
          </div>
        </div>
      </section>

      {/* 3. Build Strategy / Content Pillars Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-28">
        
        {/* Pillar 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono font-bold tracking-widest text-[#354CE1] uppercase">{text('strategyBadge')}</span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-[#0F1E36] tracking-tight">
              {text('strategyTitle')}
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              {text('strategyDesc')}
            </p>
          </div>
          <div className="lg:col-span-7 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-100/50 relative overflow-hidden">
            <div className="absolute inset-y-0 right-0 w-1/3 bg-slate-50/50 border-l border-slate-100 rounded-r-[2rem] hidden md:block p-6">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-3">{text('identraEngine')}</span>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded-lg border border-slate-100 text-xs">
                  <span className="font-bold text-slate-800">{text('dynamicEscalate')}</span>
                  <p className="text-slate-500 text-[10px]">{text('dynamicEscalateDesc')}</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-emerald-100 text-xs shadow-sm">
                  <span className="font-bold text-emerald-800 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> {text('autoApprove')}
                  </span>
                  <p className="text-slate-500 text-[10px]">{text('autoApproveDesc')}</p>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#354CE1] font-bold">{text('policyTriggerMatrix')}</h4>
              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="bg-indigo-100 text-indigo-700 p-1 rounded-md mt-0.5">
                    <BankIcon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">{text('payoutChange')}</span>
                    <p className="text-slate-500">{text('payoutChangeDesc')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="bg-orange-100 text-orange-700 p-1 rounded-md mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">{text('suspiciousIpShift')}</span>
                    <p className="text-slate-500">{text('suspiciousIpShiftDesc')}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 lg:order-2 space-y-4">
            <span className="text-xs font-mono font-bold tracking-widest text-[#354CE1] uppercase">{text('dataBadge')}</span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-[#0F1E36] tracking-tight">
              {text('dataTitle')}
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              {text('dataDesc')}
            </p>
          </div>
          <div className="lg:col-span-5 lg:order-1 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-100/50 flex flex-col justify-between min-h-[300px]">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">{text('historicalComparison')}</span>
              
              <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" 
                    alt={text('onboardingSelfieAlt')} 
                    className="w-12 h-12 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute -bottom-1 -right-1 bg-indigo-600 text-[8px] font-mono font-bold text-white px-1.5 py-0.5 rounded">{text('original')}</span>
                </div>
                
                <div className="flex-1 flex justify-center text-slate-400">
                  <RefreshCw className="w-5 h-5 animate-spin-slow" />
                </div>

                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" 
                    alt={text('liveSelfieAlt')} 
                    className="w-12 h-12 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-[8px] font-mono font-bold text-white px-1.5 py-0.5 rounded">{text('fresh')}</span>
                </div>
              </div>
              
              <div className="bg-[#EEF2FF] p-4 rounded-xl border border-[#DFE7FF] text-xs space-y-2">
                <div className="flex justify-between items-center text-slate-700">
                  <span>{text('biometricSimilarity')}</span>
                  <span className="font-bold text-indigo-700">{text('matchValue')}</span>
                </div>
                <div className="flex justify-between items-center text-slate-700">
                  <span>{text('deviceFingerprint')}</span>
                  <span className="font-bold text-indigo-700">{text('deviceMatched')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono font-bold tracking-widest text-[#354CE1] uppercase">{text('ecosystemBadge')}</span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-[#0F1E36] tracking-tight">
              {text('ecosystemTitle')}
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              {text('ecosystemDesc')}
            </p>
          </div>
          <div className="lg:col-span-7 bg-[#0F1E36] text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-4">{text('operationsAuditLog')}</span>
            <div className="font-mono text-xs text-slate-300 space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <p className="text-slate-500">{text('auditLog1')}</p>
              <p className="text-slate-500">{text('auditLog2')}</p>
              <p className="text-indigo-400">{text('auditLog3')}</p>
              <p className="text-emerald-400">{text('auditLog4')}</p>
              <p className="text-emerald-400">{text('auditLog5')}</p>
            </div>
          </div>
        </div>

      </section>

      {/* 4. The 6-Card Platform Grid Container */}
      <section className="bg-slate-100 py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h3 className="text-3xl font-display font-black text-[#0F1E36] tracking-tight">
              {text('platformTitle')}
            </h3>
            <p className="text-slate-500 text-sm md:text-base">
              {text('platformDesc')}
            </p>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-200/60 p-8 md:p-12 shadow-xl shadow-slate-200/40">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Card 1 */}
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-[#354CE1]">
                  <ScanLine className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-[#0F1E36] text-lg">{text('featureMethodsTitle')}</h4>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  {text('featureMethodsDesc')}
                </p>
              </div>

              {/* Card 2 */}
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-[#354CE1]">
                  <Workflow className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-[#0F1E36] text-lg">{text('featureWorkflowsTitle')}</h4>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  {text('featureWorkflowsDesc')}
                </p>
              </div>

              {/* Card 3 */}
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-[#354CE1]">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-[#0F1E36] text-lg">{text('featureAccountsTitle')}</h4>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  {text('featureAccountsDesc')}
                </p>
              </div>

              {/* Card 4 */}
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-[#354CE1]">
                  <GitBranch className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-[#0F1E36] text-lg">{text('featureGraphTitle')}</h4>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  {text('featureGraphDesc')}
                </p>
              </div>

              {/* Card 5 */}
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-[#354CE1]">
                  <FileCheck className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-[#0F1E36] text-lg">{text('featureReportsTitle')}</h4>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  {text('featureReportsDesc')}
                </p>
              </div>

              {/* Card 6 */}
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-[#354CE1]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-[#0F1E36] text-lg">{text('featureCasesTitle')}</h4>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  {text('featureCasesDesc')}
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 5. INTERACTIVE SIMULATOR (DUMMY WORKFLOW PLAYGROUND) */}
      <section id="simulator-anchor" className="py-24 px-6 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="space-y-4 text-center max-w-3xl mx-auto">
            <span className="text-xs font-mono font-bold tracking-widest text-[#354CE1] uppercase bg-indigo-50 px-3 py-1 rounded-full">
              {text('simulatorBadge')}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-[#0F1E36] tracking-tight">
              {text('simulatorTitle')}
            </h2>
            <p className="text-slate-500 text-sm md:text-base">
              {text('simulatorDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Control Panel: Column span 4 */}
            <div className="lg:col-span-4 bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-200/60 space-y-6">
              <h3 className="font-bold text-[#0F1E36] text-lg flex items-center gap-2">
                <Cpu className="w-5 h-5 text-indigo-600" />
                <span>{text('simulationSettings')}</span>
              </h3>

              {/* Configuration Step 1 */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-500 block uppercase">{text('selectTargetUser')}</label>
                <div className="space-y-2">
                  {PROFILE_SCENARIOS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => !isSimulating && setSelectedProfile(p)}
                      disabled={isSimulating}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition ${
                        selectedProfile.id === p.id 
                          ? 'bg-white border-indigo-600 shadow-sm font-semibold' 
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                      } ${isSimulating ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <img src={p.avatar} alt={p.name} className="w-8 h-8 rounded-full object-cover border border-slate-200" referrerPolicy="no-referrer" />
                      <div className="flex-1 text-xs">
                        <span className="block text-slate-900">{p.name}</span>
                        <span className="block text-[10px] text-slate-400">{text('riskProfile')} {riskLabel(p.riskProfile)}</span>
                      </div>
                      <span className={`w-2 h-2 rounded-full ${
                        p.riskProfile === 'low' ? 'bg-emerald-500' : p.riskProfile === 'medium' ? 'bg-amber-500' : 'bg-rose-500'
                      }`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Configuration Step 2 */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-500 block uppercase">{text('selectTriggeringEvent')}</label>
                <select
                  value={triggerEvent}
                  onChange={(e) => !isSimulating && setTriggerEvent(e.target.value as any)}
                  disabled={isSimulating}
                  className="w-full bg-white border border-slate-200 p-3 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600 disabled:opacity-50"
                >
                  <option value="routing">{text('triggerRoutingOption')}</option>
                  <option value="wire">{text('triggerWireOption')}</option>
                  <option value="password">{text('triggerPasswordOption')}</option>
                  <option value="device">{text('triggerDeviceOption')}</option>
                </select>
              </div>

              {/* Configuration Step 3 */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-500 block uppercase">{text('verificationPolicyMethod')}</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => !isSimulating && setVerificationMethod('selfie')}
                    disabled={isSimulating}
                    className={`p-2.5 rounded-xl border text-xs flex flex-col items-center gap-1.5 transition ${
                      verificationMethod === 'selfie' 
                        ? 'bg-indigo-600 border-indigo-600 text-white font-semibold' 
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    } disabled:opacity-50`}
                  >
                    <Camera className="w-4 h-4" />
                    <span>{text('selfieMatch')}</span>
                  </button>
                  <button
                    onClick={() => !isSimulating && setVerificationMethod('sms')}
                    disabled={isSimulating}
                    className={`p-2.5 rounded-xl border text-xs flex flex-col items-center gap-1.5 transition ${
                      verificationMethod === 'sms' 
                        ? 'bg-indigo-600 border-indigo-600 text-white font-semibold' 
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    } disabled:opacity-50`}
                  >
                    <Mail className="w-4 h-4" />
                    <span>{text('smsOtp')}</span>
                  </button>
                  <button
                    onClick={() => !isSimulating && setVerificationMethod('doc')}
                    disabled={isSimulating}
                    className={`p-2.5 rounded-xl border text-xs flex flex-col items-center gap-1.5 transition ${
                      verificationMethod === 'doc' 
                        ? 'bg-indigo-600 border-indigo-600 text-white font-semibold' 
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    } disabled:opacity-50`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>{text('govId')}</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2">
                {!isSimulating ? (
                  <button
                    onClick={handleStartSimulation}
                    className="w-full py-4 bg-[#354CE1] hover:bg-[#2539BE] text-white font-bold rounded-full shadow-lg transition duration-200 text-sm flex items-center justify-center gap-2"
                  >
                    <span>{text('runVerificationFlow')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleResetSimulation}
                    className="w-full py-4 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-full transition duration-200 text-sm flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4 animate-spin-slow" />
                    <span>{text('resetPlayground')}</span>
                  </button>
                )}
              </div>

            </div>

            {/* Interactive Screen Device Mockup: Column span 5 */}
            <div className="lg:col-span-5 bg-slate-900 rounded-[2.5rem] border-8 border-slate-950 p-6 shadow-2xl relative min-h-[460px] flex flex-col justify-between overflow-hidden">
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-32 h-5 bg-slate-950 rounded-full z-20 flex justify-center items-center">
                <div className="w-2.5 h-2.5 bg-slate-900 rounded-full mr-2" />
                <div className="w-1.5 h-1.5 bg-slate-900 rounded-full" />
              </div>

              {/* Device Header */}
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-2 mb-4">
                <span>{text('deviceTime')}</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <Lock className="w-3 h-3" /> {text('secureSession')}
                </span>
              </div>

              {/* Device Main Screen Stage Transitions */}
              <div className="flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  
                  {/* Stage IDLE */}
                  {currentStep === 'idle' && (
                    <motion.div 
                      key="idle"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="text-center space-y-4 px-4"
                    >
                      <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-slate-400">
                        <Smartphone className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-white font-bold text-base">{text('deviceAwaitingTest')}</h4>
                        <p className="text-slate-400 text-xs leading-relaxed">
                          {text('deviceAwaitingDesc')}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Stage TRIGGER */}
                  {currentStep === 'trigger' && (
                    <motion.div 
                      key="trigger"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="text-center space-y-4 px-4 text-white"
                    >
                      <div className="w-16 h-16 bg-rose-500/20 text-rose-400 rounded-full flex items-center justify-center mx-auto animate-bounce">
                        <AlertOctagon className="w-8 h-8" />
                      </div>
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400 font-bold bg-rose-500/10 px-2 py-1 rounded">{text('eventTriggered')}</span>
                        <h4 className="font-bold text-lg text-slate-100">
                          {triggerEventTitles[triggerEvent]}
                        </h4>
                        <p className="text-slate-400 text-xs">
                          {text('evaluatingMetadata')}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Stage PROMPT (User sees security lock screen challenge) */}
                  {currentStep === 'prompt' && (
                    <motion.div 
                      key="prompt"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="space-y-6 text-white text-center px-4"
                    >
                      <div className="w-14 h-14 bg-indigo-500/10 text-indigo-400 rounded-full flex items-center justify-center mx-auto">
                        <ShieldCheck className="w-8 h-8" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-bold text-lg text-slate-100">{text('verifyIdentity')}</h4>
                        <p className="text-slate-400 text-xs leading-relaxed">
                          {text('verifyIdentityDesc')}
                        </p>
                      </div>

                      <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700/60 text-left space-y-3">
                        <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">{text('methodRequired')}</span>
                        <div className="flex items-center gap-3">
                          {verificationMethod === 'selfie' && (
                            <>
                              <Camera className="w-5 h-5 text-indigo-400" />
                              <span className="text-xs font-semibold text-slate-200">{text('methodSelfie')}</span>
                            </>
                          )}
                          {verificationMethod === 'sms' && (
                            <>
                              <Mail className="w-5 h-5 text-indigo-400" />
                              <span className="text-xs font-semibold text-slate-200">{text('methodSms')}</span>
                            </>
                          )}
                          {verificationMethod === 'doc' && (
                            <>
                              <FileText className="w-5 h-5 text-indigo-400" />
                              <span className="text-xs font-semibold text-slate-200">{text('methodDoc')}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (verificationMethod === 'selfie') {
                            addLog(text('logSelfieCaptured'));
                          } else if (verificationMethod === 'sms') {
                            setOtpCode('824103');
                            addLog(text('logSmsEntered'));
                          } else {
                            addLog(text('logDocUploaded'));
                          }
                          setCurrentStep('capture');
                        }}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition"
                      >
                        {text('beginVerification')}
                      </button>
                    </motion.div>
                  )}

                  {/* Stage CAPTURE: Simulated scan mechanism */}
                  {currentStep === 'capture' && (
                    <motion.div 
                      key="capture"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-white text-center space-y-6 px-4"
                    >
                      {verificationMethod === 'selfie' && (
                        <div className="space-y-4">
                          <h4 className="text-sm font-bold text-slate-200">{text('positionFace')}</h4>
                          <div className="relative w-40 h-40 rounded-full border-4 border-indigo-500 mx-auto p-1 overflow-hidden bg-slate-950">
                            <img 
                              src={selectedProfile.freshSelfieUrl} 
                              alt={text('selfieAlt')} 
                              className="w-full h-full rounded-full object-cover grayscale opacity-90"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 border-t-4 border-indigo-400 animate-scan" />
                          </div>
                          <p className="text-slate-400 text-xs">{text('holdStill')}</p>
                        </div>
                      )}

                      {verificationMethod === 'sms' && (
                        <div className="space-y-4 max-w-xs mx-auto">
                          <h4 className="text-sm font-bold text-slate-200">{text('enterSecurityCode')}</h4>
                          <p className="text-slate-400 text-xs">{text('enterPasscode')}</p>
                          <input 
                            type="text" 
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-center font-mono text-xl tracking-widest text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            placeholder="******"
                          />
                        </div>
                      )}

                      {verificationMethod === 'doc' && (
                        <div className="space-y-4">
                          <h4 className="text-sm font-bold text-slate-200">{text('scanningDocument')}</h4>
                          <div className="relative w-full aspect-video bg-slate-800 rounded-xl border-2 border-indigo-500 overflow-hidden flex items-center justify-center p-2">
                            <div className="w-full h-full bg-slate-900 rounded-lg flex flex-col justify-between p-3 border border-slate-700 font-mono text-[8px] text-slate-500 text-left">
                              <div className="flex justify-between items-start">
                                <span>{text('driverLicense')}</span>
                                <div className="w-6 h-6 bg-slate-800 rounded flex items-center justify-center font-bold">DL</div>
                              </div>
                              <div className="space-y-1">
                                <span className="block text-slate-300">{text('firstNameLabel')} {selectedProfile.name.split(' ')[0]}</span>
                                <span className="block text-slate-300">{text('lastNameLabel')} {selectedProfile.name.split(' ')[1]}</span>
                                <span className="block">{text('dobLabel')} {text('sampleDob')}</span>
                              </div>
                            </div>
                            <div className="absolute inset-x-0 h-1 bg-indigo-400 animate-scan" />
                          </div>
                          <p className="text-slate-400 text-xs">{text('analyzingDoc')}</p>
                        </div>
                      )}

                      <button
                        onClick={handleUserVerificationAction}
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition"
                      >
                        {text('submitPayload')}
                      </button>
                    </motion.div>
                  )}

                  {/* Stage ANALYZE: loading states */}
                  {currentStep === 'analyze' && (
                    <motion.div 
                      key="analyze"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="text-center space-y-6 px-4"
                    >
                      <div className="w-16 h-16 bg-indigo-500/10 text-indigo-400 rounded-full flex items-center justify-center mx-auto animate-spin">
                        <RefreshCw className="w-8 h-8" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-white font-bold text-base">{text('processingMatrix')}</h4>
                        <p className="text-slate-400 text-xs leading-relaxed max-w-xs mx-auto">
                          {text('processingDesc')}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Stage RESULT */}
                  {currentStep === 'result' && (
                    <motion.div 
                      key="result"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="space-y-6 text-white text-center px-4"
                    >
                      {verificationResult === 'approve' && (
                        <>
                          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle2 className="w-10 h-10" />
                          </div>
                          <div className="space-y-2">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded">{text('approved')}</span>
                            <h4 className="text-lg font-bold text-slate-100">{text('authConfirmed')}</h4>
                            <p className="text-slate-400 text-xs">
                              {text('authConfirmedDesc')}
                            </p>
                          </div>
                        </>
                      )}

                      {verificationResult === 'review' && (
                        <>
                          <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto">
                            <AlertCircle className="w-10 h-10" />
                          </div>
                          <div className="space-y-2">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded">{text('manualReview')}</span>
                            <h4 className="text-lg font-bold text-slate-100">{text('routedCases')}</h4>
                            <p className="text-slate-400 text-xs">
                              {text('routedCasesDesc')}
                            </p>
                          </div>
                        </>
                      )}

                      {verificationResult === 'block' && (
                        <>
                          <div className="w-16 h-16 bg-rose-500/20 text-rose-400 rounded-full flex items-center justify-center mx-auto">
                            <ShieldAlert className="w-10 h-10" />
                          </div>
                          <div className="space-y-2">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400 font-bold bg-rose-500/10 px-2.5 py-1 rounded">{text('blocked')}</span>
                            <h4 className="text-lg font-bold text-slate-100">{text('threatPrevented')}</h4>
                            <p className="text-slate-400 text-xs">
                              {text('threatPreventedDesc')}
                            </p>
                          </div>
                        </>
                      )}

                      <button
                        onClick={handleResetSimulation}
                        className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition"
                      >
                        {text('resetSimulator')}
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Device Home Indicator Bar */}
              <div className="w-32 h-1 bg-slate-800 rounded-full mx-auto mt-4" />
            </div>

            {/* Live Logs Terminal Panel: Column span 3 */}
            <div className="lg:col-span-3 bg-slate-950 text-slate-300 p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{text('liveAuditLogs')}</span>
                  </span>
                  <button 
                    onClick={() => setSimLogs([])}
                    className="text-[10px] text-slate-500 hover:text-slate-300 font-mono transition"
                  >
                    {text('clearLogs')}
                  </button>
                </div>

                <div className="space-y-3 font-mono text-[10px] leading-relaxed max-h-[300px] overflow-y-auto pr-1 scrollbar-none">
                  {simLogs.length === 0 ? (
                    <p className="text-slate-600 italic">{text('noLogs')}</p>
                  ) : (
                    simLogs.map((log, idx) => (
                      <p 
                        key={idx} 
                        className={
                          log.includes('[CRITICAL]') ? 'text-rose-400 font-semibold' :
                          log.includes('[WARNING]') ? 'text-amber-400' :
                          log.includes('successful') || log.includes('CLEARED') ? 'text-emerald-400' : 'text-slate-400'
                        }
                      >
                        {log}
                      </p>
                    ))
                  )}
                </div>
              </div>

              {/* Simulated payload stats */}
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2 mt-4">
                <span className="text-[9px] font-mono uppercase text-slate-500 font-bold block">{text('crossComparePayload')}</span>
                <div className="grid grid-cols-2 gap-2 text-[9px] font-mono text-slate-400">
                  <div>
                    <span className="text-slate-600 block">{text('ipIdentity')}</span>
                    <span className="text-slate-300 font-bold overflow-hidden text-ellipsis block">{profileCopy.currentIp}</span>
                  </div>
                  <div>
                    <span className="text-slate-600 block">{text('biometricScore')}</span>
                    <span className="text-slate-300 font-bold block">{isSimulating && currentStep === 'result' ? `${selectedProfile.similarityScore}%` : text('notAvailable')}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 6. Explore More of Identra Bento Section */}
      <section className="bg-slate-50 py-24 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-display font-black text-[#0F1E36] tracking-tight">
              {text('exploreTitle')}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Bento Card 1 */}
            <div 
              onClick={() => onViewChange?.('compliance')}
              className="group p-8 md:p-12 rounded-[2rem] bg-gradient-to-br from-[#4D86F7] to-[#3874E6] text-white flex flex-col justify-between h-80 cursor-pointer shadow-xl hover:shadow-2xl hover:scale-[1.01] transition duration-300"
            >
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-blue-100">{text('complianceBadge')}</span>
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                  {text('complianceTitle')}
                </h3>
                <p className="text-blue-100 text-xs md:text-sm">
                  {text('complianceDesc')}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold font-mono group-hover:translate-x-1 transition-transform">
                {text('exploreCompliance')} <ArrowRight className="w-4 h-4" />
              </span>
            </div>

            {/* Bento Card 2 */}
            <div 
              onClick={() => onViewChange?.('workflows')}
              className="group p-8 md:p-12 rounded-[2rem] bg-gradient-to-br from-[#7E57C2] to-[#512DA8] text-white flex flex-col justify-between h-80 cursor-pointer shadow-xl hover:shadow-2xl hover:scale-[1.01] transition duration-300"
            >
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-purple-100">{text('workflowsBadge')}</span>
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                  {text('workflowsTitle')}
                </h3>
                <p className="text-purple-100 text-xs md:text-sm">
                  {text('workflowsDesc')}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold font-mono group-hover:translate-x-1 transition-transform">
                {text('exploreWorkflows')} <ArrowRight className="w-4 h-4" />
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 7. {text('readyTitle')} Bottom CTA */}
      <section className="bg-[#B5C0FF] py-16 text-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
          <h2 className="text-3xl md:text-4xl font-display font-black text-[#0F1E36] tracking-tight">
            {text('readyTitle')}
          </h2>
          <p className="text-[#0F1E36]/80 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            {text('readyDesc')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenSandbox}
              className="w-full sm:w-auto px-8 py-4 bg-[#354CE1] hover:bg-[#2539BE] text-white font-bold rounded-full shadow-xl transition text-sm"
            >
              {text('tryDemo')}
            </button>
            <button
              onClick={onOpenSandbox}
              className="w-full sm:w-auto px-8 py-4 border border-[#0F1E36]/20 hover:bg-white/10 text-[#0F1E36] font-bold rounded-full transition text-sm flex items-center justify-center gap-1.5"
            >
              <span>{text('tryItNow')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
