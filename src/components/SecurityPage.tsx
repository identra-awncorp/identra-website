/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, ShieldCheck, Lock, ShieldAlert, CheckCircle2, 
  HelpCircle, Search, Send, Check, Terminal, Eye, AlertCircle, Loader2, 
  Database, RefreshCw, Key, Server, Cpu, Globe, Cloud, Bell, FileCheck2,
  Award, Shield, BookOpen, Users, Briefcase, Landmark, UserCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord, getLocalizedValue } from '../utils/i18nRuntime';
import { securityPageTranslations } from '../translations/SecurityPageTranslations';
import identityIllustrationImage from '../assets/images/identra_identity_illustration_1783335932193.jpg';

interface SecurityPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

interface SecurityService {
  id: string;
  status: 'operational' | 'degraded' | 'maintenance';
  uptime: string;
  latency: string;
}

type ScanLog = {
  message: string;
  kind: string;
};

type SecurityPageTranslations = typeof securityPageTranslations.en;
type SecurityPageTextKey = {
  [K in keyof SecurityPageTranslations]: SecurityPageTranslations[K] extends string ? K : never
}[keyof SecurityPageTranslations];

const INITIAL_SERVICES: SecurityService[] = [
  { id: 'api', status: 'operational', uptime: '99.999%', latency: '24ms' },
  { id: 'face', status: 'operational', uptime: '99.995%', latency: '85ms' },
  { id: 'db', status: 'operational', uptime: '100.00%', latency: '8ms' },
  { id: 'webhooks', status: 'operational', uptime: '99.998%', latency: '12ms' }
];

const BADGE_ICONS = [ShieldCheck, Award, UserCheck, Globe, Shield, Landmark, ShieldAlert, BookOpen, CheckCircle2, FileCheck2, Cpu];
const SECURITY_FEATURE_ICONS = [Server, Cpu, Search, Lock, BookOpen, Users, Key, ShieldCheck];
const PRIVACY_FEATURE_META: ReadonlyArray<{
  icon: React.ComponentType<{ className?: string }>;
  action?: AppView;
}> = [
  { icon: Globe },
  { icon: Lock, action: 'privacy-overview' },
  { icon: Shield },
  { icon: FileCheck2 }
];
const FEDRAMP_FEATURE_ICONS = [UserCheck, ShieldAlert, Landmark, RefreshCw];

export default function SecurityPage({ onOpenSandbox, onBackToLanding, onViewChange }: SecurityPageProps) {
  const { language } = useLanguage();
  const copy = getLocalizedRecord(securityPageTranslations, language as keyof typeof securityPageTranslations, 'securityPageTranslations');
  const text = (key: SecurityPageTextKey): string => getLocalizedValue(copy, key, language, 'securityPageTranslations');
  const format = (key: SecurityPageTextKey, values: Record<string, string | number>) =>
    Object.entries(values).reduce((message, [name, value]) => message.replace(
      new RegExp('\\{' + name + '\\}', 'g'),
      String(value)
    ), text(key));

  // Collapsible tab or toggle for the diagnostics sandbox
  const [showSandbox, setShowSandbox] = useState(false);

  // Penetration test simulator state
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'success'>('idle');
  const [scanProgress, setScanProgress] = useState(0);
  const [scanLogs, setScanLogs] = useState<ScanLog[]>([]);
  const [auditID, setAuditID] = useState('');

  // Status alerts subscription
  const [subEmail, setSubEmail] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle');

  // Interactive node health check values
  const [services, setServices] = useState<SecurityService[]>(INITIAL_SERVICES);
  const [checkingServiceId, setCheckingServiceId] = useState<string | null>(null);

  // Run penetration test simulator
  const handleStartSecurityScan = () => {
    if (scanState === 'scanning') return;
    setScanState('scanning');
    setScanProgress(0);
    setScanLogs([]);

    const randAudit = `AUD-${Math.floor(10000 + Math.random() * 90000)}`;
    setAuditID(randAudit);

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < copy.scanSteps.length) {
        const nextStep = copy.scanSteps[currentStep];
        setScanLogs(prev => [...prev, { message: nextStep.log, kind: nextStep.kind }]);
        setScanProgress(nextStep.progress);
        currentStep++;
      } else {
        clearInterval(interval);
        setScanState('success');
      }
    }, 350);
  };

  // Run single service dynamic latency check
  const handlePingService = (id: string) => {
    if (checkingServiceId) return;
    setCheckingServiceId(id);

    setTimeout(() => {
      const ping = Math.floor(10 + Math.random() * 50);
      setServices(prev => prev.map(s => {
        if (s.id === id) {
          return {
            ...s,
            latency: `${ping}ms`,
            status: 'operational'
          };
        }
        return s;
      }));
      setCheckingServiceId(null);
    }, 400);
  };

  // Submit Status Subscription
  const handleSubscribeStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail.trim() || !subEmail.includes('@')) return;

    setSubStatus('submitting');
    setTimeout(() => {
      setSubStatus('submitted');
    }, 1000);
  };

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-slate-800 antialiased selection:bg-[#354CE1]/10 selection:text-[#354CE1]">
      
      {/* 1. Header Banner Area */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1E43D8] to-[#142FA0] text-white pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)] pointer-events-none" />
        <div className="absolute top-1/4 left-1/10 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <button 
            onClick={onBackToLanding}
            className="group inline-flex items-center gap-2 text-blue-100 hover:text-white text-xs font-semibold mb-8 transition cursor-pointer"
            id="security_back_btn"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            {text('backToPlatform')}
          </button>

          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-[11px] font-bold tracking-wider text-yellow-300 uppercase border border-white/25 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-yellow-300" />
              {text('heroBadge')}
            </div>
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-semibold tracking-tight text-white leading-[1.05]">
              {text('heroTitle')}
            </h1>
            <p className="text-base sm:text-xl text-blue-50 max-w-3xl font-light leading-relaxed">
              {text('heroDesc')}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onOpenSandbox}
                className="bg-black hover:bg-slate-900 text-white font-semibold text-sm px-6 py-3 rounded-full transition shadow-lg shadow-indigo-950/20"
              >
                {text('tryDemo')}
              </button>
              <button
                onClick={() => onViewChange?.('contact')}
                className="bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-sm px-6 py-3 rounded-full transition"
              >
                {text('contactSales')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Global Certifications Badges Bar */}
      <section className="bg-white border-b border-slate-100 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center mb-8">
            {text('badgesEyebrow')}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-center">
            {copy.badges.map((badge, idx) => {
              const Icon = BADGE_ICONS[idx];
              return (
                <div 
                  key={idx} 
                  className="bg-[#FAFBFD] border border-slate-100 hover:border-slate-200 hover:shadow-xs p-4 rounded-2xl flex flex-col items-center text-center transition"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#354CE1] mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 leading-tight">{badge.name}</h4>
                  <p className="text-[10px] text-slate-400 font-light mt-1">{badge.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Core Trust Principles Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight text-[#0F1E36]">
              {text('coreTitle')}
            </h2>
            <p className="text-slate-600 font-light leading-relaxed text-sm sm:text-base">
              {text('coreDesc')}
            </p>

            <div className="p-6 bg-white border border-slate-200 rounded-3xl space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                {text('certTitle')}
              </h3>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                {text('certDescPrefix')} <a href="mailto:support@withidentra.com" className="text-[#354CE1] hover:underline font-semibold">support@withidentra.com</a> {text('certDescSuffix')}
              </p>
            </div>
          </div>
          
          {/* Visual abstract representation of the trust vault */}
          <div className="lg:col-span-6">
            <div className="relative p-8 bg-[#FAFBFD] border border-slate-100 rounded-3xl flex flex-col justify-between overflow-hidden min-h-[340px]">
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/20 to-purple-50/20" />
              <div className="relative z-10 space-y-4">
                <span className="text-[10px] font-sans font-bold uppercase text-indigo-500 tracking-wider">{text('visualBadge')}</span>
                <h3 className="text-xl font-bold text-slate-900 leading-snug">{text('visualTitle')}</h3>
                <p className="text-xs text-slate-500 leading-normal font-light">
                  {text('visualDesc')}
                </p>
              </div>

              <div className="relative mt-8 rounded-xl overflow-hidden aspect-[16/9] border border-slate-150 bg-gradient-to-tr from-indigo-100 to-purple-50 flex items-center justify-center p-2">
                <img 
                  src={identityIllustrationImage}
                  alt={text('visualAlt')} 
                  className="w-full h-full object-cover rounded-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. "Security" Multilayered Grid Section */}
      <section className="bg-slate-50 border-t border-b border-slate-150/80 py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-bold text-[#354CE1] bg-[#354CE1]/10 px-3 py-1 rounded-full uppercase tracking-wider">
              {text('securityBadge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-[#0F1E36]">
              {text('securityTitle')}
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-light leading-relaxed">
              {text('securityDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {copy.securityFeatures.map((feat, idx) => {
              const Icon = SECURITY_FEATURE_ICONS[idx];
              return (
                <div 
                  key={idx} 
                  className="bg-white border border-slate-200 p-6 rounded-3xl flex flex-col justify-between hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-950/5 transition duration-300"
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[#354CE1]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">{feat.title}</h3>
                    <p className="text-xs text-slate-500 font-light leading-relaxed">{feat.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. "{text('privacyTitle')}" Grid Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 space-y-12">
        <div className="space-y-4 max-w-3xl">
          <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full uppercase tracking-wider">
            {text('privacyBadge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-[#0F1E36]">
            {text('privacyTitle')}
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-light leading-relaxed">
            {text('privacyDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {copy.privacyFeatures.map((feat, idx) => {
            const meta = PRIVACY_FEATURE_META[idx];
            const Icon = meta.icon;
            const linkText = 'linkText' in feat ? feat.linkText : '';
            return (
              <div 
                key={idx} 
                className="bg-white border border-slate-200 p-6 rounded-3xl flex flex-col justify-between hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-950/5 transition duration-300"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-emerald-600">
                    {Icon ? <Icon className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{feat.title}</h3>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">{feat.description}</p>
                </div>
                {meta.action && onViewChange && (
                  <button 
                    onClick={() => {
                      if (meta.action) {
                        onViewChange(meta.action);
                      }
                    }}
                    className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-[#354CE1] hover:text-[#2539BE] transition"
                  >
                    <span>{linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. {text('publicSectorTitle')} & FedRAMP Section */}
      <section className="bg-[#FAFBFD] border-t border-slate-150 py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold text-[#354CE1] bg-[#354CE1]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                {text('governmentBadge')}
              </span>
              <h2 className="text-3xl font-display font-bold text-[#0F1E36] leading-tight">
                {text('publicSectorTitle')}
              </h2>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                {text('publicSectorDesc')}
              </p>
              <div className="pt-2">
                <button 
                  onClick={onOpenSandbox}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#354CE1] hover:text-[#2539BE] transition-colors border border-[#354CE1]/30 hover:border-[#354CE1] px-5 py-2.5 rounded-full"
                >
                  <span>{text('fedrampCta')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {copy.fedrampFeatures.map((feat, idx) => {
                const Icon = FEDRAMP_FEATURE_ICONS[idx];
                return (
                  <div key={idx} className="bg-white border border-slate-150 p-6 rounded-3xl hover:shadow-md transition">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-[#354CE1] mb-4">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 mb-2">{feat.title}</h4>
                    <p className="text-xs text-slate-500 font-light leading-relaxed">{feat.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="text-center bg-slate-50 border border-slate-150 p-4 rounded-2xl max-w-3xl mx-auto text-xs text-slate-500 font-light">
            {text('fedrampNoticePrefix')} <a href="mailto:fedramp@withidentra.com" className="text-[#354CE1] hover:underline font-semibold font-mono">fedramp@withidentra.com</a>
          </div>
        </div>
      </section>

      {/* 7. Beautiful Full-Width Blockquote Patient Testimonial */}
      <section className="bg-[#FAFBFD] py-16 px-6">
        <div className="max-w-4xl mx-auto bg-[#F3F4FD] rounded-3xl p-8 md:p-12 border border-blue-50/50 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/30 rounded-bl-full pointer-events-none" />
          <div className="relative z-10 space-y-6">
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-indigo-500 block">
              {text('healthcareBadge')}
            </span>
            <blockquote className="text-lg md:text-xl font-light text-[#0F1E36] leading-relaxed italic">
              {text('testimonialQuote')}
            </blockquote>
            <div className="border-t border-indigo-100 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <cite className="not-italic font-bold text-slate-800 text-sm block">{text('testimonialName')}</cite>
                <span className="text-xs text-slate-500 font-light">{text('testimonialRole')}</span>
              </div>
              <span className="text-[10px] font-bold text-indigo-500 bg-white border border-indigo-100 px-3 py-1 rounded-full whitespace-nowrap self-start sm:self-auto">
                {text('nistCertified')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Interactive Trust Diagnostics Playground & Collapsible Sandbox */}
      <section className="max-w-7xl mx-auto px-6 pb-24 space-y-6">
        <div className="border border-slate-200 rounded-3xl overflow-hidden bg-white shadow-sm">
          <button 
            onClick={() => setShowSandbox(prev => !prev)}
            className="w-full px-6 py-5 bg-slate-50 hover:bg-slate-100/80 transition flex items-center justify-between font-sans font-semibold text-[#0F1E36] text-sm cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Terminal className="text-[#354CE1] w-4 h-4" />
              <span>{text('sandboxTitle')}</span>
            </div>
            <span className="text-xs text-[#354CE1] font-bold hover:underline">
              {showSandbox ? text('hideSandbox') : text('showSandbox')}
            </span>
          </button>
          
          <AnimatePresence>
            {showSandbox && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-slate-150"
              >
                <div className="p-6 md:p-8 space-y-12 bg-slate-50/50">
                  <div className="text-center max-w-2xl mx-auto space-y-2">
                    <h3 className="text-xl font-bold text-[#0F1E36]">{text('simulationRoomTitle')}</h3>
                    <p className="text-xs text-slate-500 font-light leading-relaxed">
                      {text('simulationRoomDesc')}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Simulator Logs Box */}
                    <div className="lg:col-span-7 bg-slate-950 text-slate-300 p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between min-h-[380px] font-mono text-xs">
                      <div>
                        <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                            <span className="text-[10px] text-slate-500 tracking-wider uppercase ml-1.5">{text('kmsSandbox')}</span>
                          </div>
                          {scanState === 'scanning' && (
                            <div className="flex items-center gap-2 font-sans">
                              <span className="text-[10px] text-indigo-400 font-bold">{format('auditingStatus', { progress: scanProgress })}</span>
                              <Loader2 className="w-3.5 h-3.5 text-[#354CE1] animate-spin" />
                            </div>
                          )}
                          {scanState === 'success' && (
                            <span className="text-[10px] text-emerald-400 font-bold font-sans flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" />
                              {text('certifiedStatus')}
                            </span>
                          )}
                          {scanState === 'idle' && (
                            <span className="text-[10px] text-slate-500 font-bold font-sans">{text('readyStatus')}</span>
                          )}
                        </div>

                        {scanLogs.length > 0 ? (
                          <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                            {scanLogs.map((log, idx) => {
                              const color = log.kind === 'audit' ? 'text-[#354CE1]' :
                                log.kind === 'tls' ? 'text-[#00E5FF]' :
                                log.kind === 'compliance' ? 'text-emerald-400 font-bold' :
                                log.kind === 'success' ? 'text-emerald-400' : 'text-slate-300';
                              return <div key={idx} className={`${color} leading-relaxed`}>{log.message}</div>;
                            })}
                          </div>
                        ) : (
                          <div className="text-center py-20 text-slate-500 space-y-3">
                            <Key className="w-8 h-8 text-slate-600 mx-auto animate-pulse" />
                            <p className="text-xs font-semibold">{text('decryptionGuard')}</p>
                            <p className="text-[10px] font-light max-w-[220px] mx-auto">{text('scanEmptyDesc')}</p>
                          </div>
                        )}
                      </div>

                      {scanState === 'scanning' && (
                        <div className="w-full bg-slate-900 rounded-full h-1 mt-4 overflow-hidden">
                          <div 
                            className="bg-[#354CE1] h-1 rounded-full transition-all duration-300"
                            style={{ width: `${scanProgress}%` }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Interactive compiled report ledger */}
                    <div className="lg:col-span-5 bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/40 rounded-bl-full pointer-events-none" />

                      <div className="space-y-6">
                        <div className="space-y-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{text('liveReport')}</span>
                          <h3 className="text-lg font-bold text-slate-900 tracking-tight">{text('auditLedgerTitle')}</h3>
                          <p className="text-xs text-slate-500 font-light leading-relaxed">
                            {text('auditLedgerDesc')}
                          </p>
                        </div>

                        {scanState === 'success' ? (
                          <div className="bg-slate-900 text-slate-300 p-5 rounded-2xl text-left font-mono text-[10px] space-y-2 border border-slate-800 shadow-md">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 font-sans font-bold uppercase text-[9px] text-slate-500">
                              <span>{text('complianceLedger')}</span>
                              <div className="flex items-center gap-1 text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-semibold border border-emerald-500/20">
                                <Check className="w-3 h-3" />
                                {text('secureStatus')}
                              </div>
                            </div>
                            <div><span className="text-slate-500">{text('auditIdLabel')}</span> {auditID}</div>
                            <div><span className="text-slate-500">{text('sysEncryptionLabel')}</span> AES-256-GCM</div>
                            <div><span className="text-slate-500">{text('hashComplianceLabel')}</span> SHA-512_OK</div>
                            <div><span className="text-slate-500">{text('oauthRestrictionLabel')}</span> ZERO_TRUST</div>
                            <div><span className="text-slate-500">{text('vulnerabilitiesLabel')}</span> {text('vulnerabilitiesValue')}</div>
                          </div>
                        ) : (
                          <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl py-12 text-center text-slate-400 space-y-2 text-xs">
                            <Lock className="w-6 h-6 mx-auto text-slate-300 animate-pulse" />
                            <p className="font-semibold">{text('ledgerLocked')}</p>
                            <p className="text-[10px] font-light max-w-[200px] mx-auto">{text('ledgerLockedDesc')}</p>
                          </div>
                        )}
                      </div>

                      <div className="pt-6">
                        <button
                          onClick={handleStartSecurityScan}
                          disabled={scanState === 'scanning'}
                          className="w-full bg-[#354CE1] hover:bg-[#2539BE] text-white font-bold text-xs py-3.5 rounded-full transition shadow-md disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {scanState === 'scanning' ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>{text('analyzingIntegrity')}</span>
                            </>
                          ) : (
                            <>
                              <ShieldAlert className="w-4 h-4" />
                              <span>{text('runScanAudit')}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* System latency check services */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-6 border-t border-slate-100">
                    <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <h3 className="text-sm font-bold text-slate-900 tracking-tight">{text('infrastructureTitle')}</h3>
                          <p className="text-[10px] text-slate-400 font-light">
                            {text('infrastructureDesc')}
                          </p>
                        </div>
                        <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 text-emerald-600 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>{text('allSystemsOperational')}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {services.map((service, idx) => {
                          const serviceCopy = copy.services[idx];
                          const isChecking = checkingServiceId === service.id;
                          return (
                            <div key={service.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition hover:bg-slate-100/50">
                              <div className="space-y-1 max-w-sm">
                                <div className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                  <h4 className="text-[11px] font-bold text-slate-800">{serviceCopy.name}</h4>
                                </div>
                                <p className="text-[10px] text-slate-400 font-light leading-snug">{serviceCopy.description}</p>
                              </div>

                              <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
                                <div className="text-right">
                                  <span className="text-[8px] text-slate-400 block font-bold uppercase tracking-wider">{text('latency')}</span>
                                  <span className="text-xs font-mono font-bold text-slate-800">{service.latency}</span>
                                </div>
                                <div className="text-right">
                                  <span className="text-[8px] text-slate-400 block font-bold uppercase tracking-wider">{text('uptime')}</span>
                                  <span className="text-xs font-mono font-bold text-[#354CE1]">{service.uptime}</span>
                                </div>
                                <button
                                  onClick={() => handlePingService(service.id)}
                                  disabled={checkingServiceId !== null}
                                  className="p-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#354CE1] text-slate-400 hover:text-[#354CE1] transition cursor-pointer disabled:opacity-50"
                                >
                                  <RefreshCw className={`w-3 h-3 ${isChecking ? 'animate-spin text-[#354CE1]' : ''}`} />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* {text('uptime')} Reliability Grid */}
                      <div className="space-y-2 pt-2">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-slate-400 font-bold tracking-wider uppercase">{text('historicalGrid')}</span>
                          <span className="text-emerald-500 font-bold font-mono">{text('reliability')}</span>
                        </div>
                        <div className="flex gap-1 overflow-x-auto pb-1">
                          {Array.from({ length: 30 }).map((_, idx) => (
                            <div 
                              key={idx} 
                              className="h-6 flex-1 min-w-[8px] bg-emerald-500 rounded-md hover:opacity-85 transition relative group cursor-pointer"
                              title={format('dayTitle', { day: 30 - idx })}
                            >
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-slate-900 text-white text-[8px] font-mono px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition duration-200 whitespace-nowrap z-10">
                                {format('dayTooltip', { day: idx + 1 })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Subscription Alerts Box */}
                    <div className="lg:col-span-5 bg-gradient-to-tr from-[#0F1E36] to-[#1E355E] text-white rounded-3xl p-6 border border-[#354CE1]/10 shadow-xl flex flex-col justify-between">
                      <div className="space-y-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white/10 backdrop-blur-md rounded-full text-[9px] font-bold tracking-wider uppercase text-yellow-300 border border-white/15">
                          <Bell className="w-3.5 h-3.5 text-yellow-300" />
                          <span>{text('pagerDuty')}</span>
                        </span>
                        <h4 className="text-base font-bold font-display">{text('subscribeTitle')}</h4>
                        <p className="text-xs text-indigo-200 font-light leading-relaxed">
                          {text('subscribeDesc')}
                        </p>

                        {subStatus === 'idle' && (
                          <form onSubmit={handleSubscribeStatus} className="space-y-3 pt-2">
                            <input
                              type="email"
                              required
                              placeholder={text('emailPlaceholder')}
                              value={subEmail}
                              onChange={(e) => setSubEmail(e.target.value)}
                              className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#354CE1]/40 focus:border-white text-white placeholder-indigo-300/50"
                            />
                            <button
                              type="submit"
                              className="w-full bg-[#354CE1] hover:bg-[#2539BE] text-white font-bold text-xs py-3 rounded-full transition shadow-md"
                            >
                              {text('subscribeButton')}
                            </button>
                          </form>
                        )}

                        {subStatus === 'submitting' && (
                          <div className="text-center py-6 space-y-2">
                            <Loader2 className="w-5 h-5 text-[#00E5FF] animate-spin mx-auto" />
                            <p className="text-[10px] text-indigo-200 font-light font-mono">{text('syncingCredentials')}</p>
                          </div>
                        )}

                        {subStatus === 'submitted' && (
                          <div className="text-center py-4 space-y-3 animate-in fade-in zoom-in-95 duration-200">
                            <div className="w-10 h-10 bg-white/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-white/10">
                              <Check className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-xs font-bold">{text('subscribedTitle')}</p>
                              <p className="text-[10px] text-indigo-200 font-light mt-1">{text('subscribedPrefix')} <span className="font-semibold text-white font-mono">{subEmail}</span> {text('subscribedSuffix')}</p>
                            </div>
                            <button
                              onClick={() => {
                                setSubEmail('');
                                setSubStatus('idle');
                              }}
                              className="text-[11px] text-yellow-300 hover:underline font-semibold cursor-pointer"
                            >
                              {text('registerAnother')}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 9. Ready to Get Started Corporate Section */}
      <section className="bg-white border-t border-slate-100 py-16 md:py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-[#0F1E36]">
            {text('finalTitle')}
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-light max-w-xl mx-auto">
            {text('finalDesc')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenSandbox}
              className="bg-[#354CE1] hover:bg-[#2539BE] text-white font-semibold text-sm px-8 py-3.5 rounded-full transition shadow-lg shadow-indigo-950/10 cursor-pointer"
            >
              {text('tryDemo')}
            </button>
            <button
              onClick={() => onViewChange?.('contact')}
              className="border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm px-8 py-3.5 rounded-full transition cursor-pointer"
            >
              {text('contactSales')}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
