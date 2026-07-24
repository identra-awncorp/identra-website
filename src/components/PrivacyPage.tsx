/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  Globe, 
  Database, 
  Smartphone, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Check, 
  Network, 
  UserCheck, 
  Cpu, 
  Layers, 
  AlertTriangle, 
  Fingerprint, 
  Award, 
  Info, 
  ArrowUpRight,
  Shield,
  Activity,
  Clock,
  Key,
  X,
  FileCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { PRIVACY_PAGE_TRANSLATIONS } from '../translations/PrivacyPageTranslations';

interface PrivacyPageProps {
  onBackToLanding: () => void;
  onOpenSandbox: () => void;
  onViewChange?: (view: AppView) => void;
}

export default function PrivacyPage({ onBackToLanding, onOpenSandbox, onViewChange }: PrivacyPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(PRIVACY_PAGE_TRANSLATIONS, language as keyof typeof PRIVACY_PAGE_TRANSLATIONS, 'PRIVACY_PAGE_TRANSLATIONS');
  const [activeSection, setActiveSection] = useState('verify-identity');
  const [activeNoticeDoc, setActiveNoticeDoc] = useState<string | null>(null);
  const [manageDataModalOpen, setManageDataModalOpen] = useState(false);
  const [manageDataSubmitted, setManageDataSubmitted] = useState(false);
  
  // Ref for sections to track scroll
  const verifyIdentityRef = useRef<HTMLElement>(null);
  const privacyByDefaultRef = useRef<HTMLElement>(null);
  const safeguardRef = useRef<HTMLElement>(null);
  const dataRightsRef = useRef<HTMLElement>(null);

  // Monitor scroll to update active section in sidebar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 300;

      if (dataRightsRef.current && scrollPosition >= dataRightsRef.current.offsetTop) {
        setActiveSection('data-rights');
      } else if (safeguardRef.current && scrollPosition >= safeguardRef.current.offsetTop) {
        setActiveSection('safeguard');
      } else if (privacyByDefaultRef.current && scrollPosition >= privacyByDefaultRef.current.offsetTop) {
        setActiveSection('privacy-by-default');
      } else if (verifyIdentityRef.current && scrollPosition >= verifyIdentityRef.current.offsetTop) {
        setActiveSection('verify-identity');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string, ref: React.RefObject<HTMLElement | null>) => {
    setActiveSection(id);
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const activeNotice = t.notices.find((notice: any) => notice.id === activeNoticeDoc);
  const sidebarRefs: Record<string, React.RefObject<HTMLElement | null>> = {
    'verify-identity': verifyIdentityRef,
    'privacy-by-default': privacyByDefaultRef,
    safeguard: safeguardRef,
    'data-rights': dataRightsRef
  };
  const safeguardIcons = [ShieldCheck, Lock, Activity, Database, Clock, Key];
  const certBadgeClasses = [
    'bg-[#0F1E36] text-white',
    'bg-emerald-600 text-white',
    'bg-[#354CE1] text-white',
    'bg-indigo-600 text-white',
    'bg-blue-600 text-white font-medium',
    'bg-rose-600 text-white',
    'bg-slate-700 text-white',
    'bg-amber-600 text-white',
    'bg-teal-600 text-white',
    'bg-purple-600 text-white'
  ];

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-slate-800 antialiased selection:bg-[#354CE1]/10 selection:text-[#354CE1]">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-24 md:pt-16 md:pb-32 border-b border-slate-100 bg-white">
        {/* Subtle grid line overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#354CE1] bg-[#E2E6FF] px-4 py-1.5 rounded-full inline-block">
            {t.heroBadge}
          </span>
          
          <h1 className="text-4xl md:text-6xl font-display font-bold text-[#0F1E36] tracking-tight leading-[1.1]">
            {t.heroTitleLine1}<br />{t.heroTitleLine2}
          </h1>
          
          <p className="text-slate-600 text-base md:text-xl leading-relaxed font-sans max-w-3xl mx-auto">
            {t.heroDesc}
          </p>
          
          <p className="text-slate-500 text-sm md:text-base font-sans max-w-2xl mx-auto">
            {t.heroSubdesc}
          </p>
          
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setManageDataModalOpen(true)}
              className="bg-[#0F1E36] hover:bg-slate-800 text-white font-medium text-sm px-6 py-3.5 rounded-full shadow-lg flex items-center gap-2 transition duration-300"
            >
              {t.manageData}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. HOW WE VERIFY IDENTITY QUESTIONS SECTION */}
      <section ref={verifyIdentityRef} id="verify-identity" className="py-20 md:py-28 bg-[#FAFBFD]">
        <div className="max-w-5xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0F1E36] tracking-tight">
              {t.verifyTitle}
            </h2>
            <div className="w-12 h-1 bg-[#354CE1] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {/* Question 1 */}
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-lg text-[#0F1E36]">
                {t.idvQuestion}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {t.idvIntro}
              </p>
              <ul className="space-y-2 text-sm text-slate-600 pl-4 list-disc">
                {t.idvBullets.map((item: string) => <li key={item}>{item}</li>)}
              </ul>
            </div>

            {/* Question 2 */}
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-lg text-[#0F1E36]">
                {t.roleQuestion}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {t.roleP1}
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                {t.roleP2}
              </p>
            </div>

            {/* Question 3 */}
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-lg text-[#0F1E36]">
                {t.collectQuestion}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {t.collectIntro}
              </p>
              <ul className="space-y-2 text-sm text-slate-600 pl-4 list-disc">
                {t.collectBullets.map((item: string) => <li key={item}>{item}</li>)}
              </ul>
            </div>

            {/* Question 4 */}
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-lg text-[#0F1E36]">
                {t.useQuestion}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {t.useAnswer}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STEP BY STEP HOW VERIFICATION WORKS */}
      <section className="py-20 md:py-28 bg-white border-t border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 space-y-24">
          
          {/* Step 1: Collection */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[11px] font-bold text-[#354CE1] uppercase tracking-wider bg-[#E2E6FF] px-2.5 py-1 rounded-md">
                {t.howVerificationWorks}
              </span>
              <h3 className="text-3xl font-display font-bold text-[#0F1E36] tracking-tight">
                {t.collectionTitle}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-sans">
                {t.collectionDesc}
              </p>
            </div>
            
            {/* Mockup Right Side */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="bg-[#E2E6FF]/40 p-6 rounded-3xl w-full max-w-md border border-slate-100 shadow-md">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <div className="w-6 h-6 rounded-full bg-[#354CE1]/15 flex items-center justify-center text-[#354CE1] font-bold text-xs">{t.identraInitial}</div>
                    <p className="text-[11px] font-bold text-[#0F1E36] font-display">{t.securePortal}</p>
                    <span className="ml-auto text-[9px] bg-emerald-500/15 text-emerald-600 px-1.5 py-0.5 rounded-full font-mono uppercase font-bold">{t.encrypted}</span>
                  </div>
                  
                  {/* Scan Simulator Graphic */}
                  <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-3 aspect-[4/3] relative overflow-hidden group">
                    <Smartphone className="w-10 h-10 text-slate-400 group-hover:scale-110 transition duration-300" />
                    <div>
                      <p className="text-[12px] font-semibold text-slate-700">{t.scanGovId}</p>
                      <p className="text-[10px] text-slate-400 max-w-[200px] mt-0.5">{t.scanGovIdHint}</p>
                    </div>
                    {/* Corner Guides */}
                    <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#354CE1]"></div>
                    <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#354CE1]"></div>
                    <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#354CE1]"></div>
                    <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#354CE1]"></div>
                  </div>

                  <div className="bg-[#354CE1]/5 p-2.5 rounded-lg flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#354CE1] shrink-0 mt-0.5" />
                    <p className="text-[10px] text-slate-600 leading-normal">
                      {t.securePipeline}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Processing */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center lg:flex-row-reverse">
            <div className="lg:col-span-5 lg:order-2 space-y-4">
              <span className="text-[11px] font-bold text-[#354CE1] uppercase tracking-wider bg-[#E2E6FF] px-2.5 py-1 rounded-md">
                {t.howVerificationWorks}
              </span>
              <h3 className="text-3xl font-display font-bold text-[#0F1E36] tracking-tight">
                {t.processingTitle}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-sans">
                {t.processingDesc}
              </p>
            </div>

            {/* Mockup Left Side */}
            <div className="lg:col-span-7 lg:order-1 flex justify-center">
              <div className="bg-[#E2E6FF]/40 p-6 rounded-3xl w-full max-w-md border border-slate-100 shadow-md">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <p className="text-[11px] font-bold text-[#0F1E36] font-mono">{t.processingPipeline}</p>
                    <Cpu className="w-3.5 h-3.5 text-[#354CE1]" />
                  </div>

                  {/* Processing Visual Animation Simulation */}
                  <div className="space-y-3 bg-slate-900 p-4 rounded-xl text-[11px] font-mono text-slate-300">
                    <div className="flex justify-between items-center text-slate-400">
                      <span>{t.analyzingDoc}</span>
                      <span className="text-yellow-400 animate-pulse">{t.running}</span>
                    </div>
                    
                    <div className="space-y-2 border-t border-slate-800 pt-2 text-[10px]">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">{t.docAuthenticityCheck}</span>
                        <span className="text-emerald-400 flex items-center gap-1"><Check className="w-3 h-3" /> {t.pass}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">{t.crossMatch}</span>
                        <span className="text-emerald-400 flex items-center gap-1"><Check className="w-3 h-3" /> {t.match}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">{t.biometricMatch}</span>
                        <span className="text-emerald-400 flex items-center gap-1"><Check className="w-3 h-3" /> {t.matchPercent}</span>
                      </div>
                    </div>

                    {/* Progress Bar Mock */}
                    <div className="pt-1.5">
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#354CE1] h-full w-[85%] rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 p-2 bg-slate-50 border border-slate-150 rounded-lg">
                    <Layers className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                    <p className="text-[10px] text-slate-500">
                      {t.aiAccuracyNote}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Outcome */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[11px] font-bold text-[#354CE1] uppercase tracking-wider bg-[#E2E6FF] px-2.5 py-1 rounded-md">
                {t.howVerificationWorks}
              </span>
              <h3 className="text-3xl font-display font-bold text-[#0F1E36] tracking-tight">
                {t.outcomeTitle}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-sans">
                {t.outcomeDesc1}
              </p>
              <p className="text-slate-600 text-sm leading-relaxed font-sans">
                {t.outcomeDesc2}
              </p>
              <p className="text-slate-500 text-xs italic font-sans border-l-2 border-slate-200 pl-3">
                {t.outcomeNote}
              </p>
            </div>

            {/* Mockup Right Side */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="bg-[#E2E6FF]/40 p-6 rounded-3xl w-full max-w-md border border-slate-100 shadow-md">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <p className="text-[11px] font-bold text-[#0F1E36]">{t.decisionDiscovery}</p>
                    <Award className="w-4 h-4 text-emerald-500" />
                  </div>

                  {/* Flow Diagram Connector */}
                  <div className="flex items-center justify-around py-4">
                    <div className="flex flex-col items-center space-y-1">
                      <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500">
                        <UserCheck className="w-5 h-5" />
                      </div>
                      <span className="text-[9px] font-bold text-slate-500">{t.applicant}</span>
                    </div>

                    <div className="flex-1 flex items-center relative justify-center">
                      <div className="w-full h-0.5 bg-slate-200"></div>
                      <div className="absolute px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-full text-[8px] font-bold uppercase tracking-wider font-mono">
                        {t.verified}
                      </div>
                    </div>

                    <div className="flex flex-col items-center space-y-1">
                      <div className="w-10 h-10 rounded-full bg-[#354CE1]/10 border border-[#354CE1]/30 flex items-center justify-center text-[#354CE1]">
                        <Globe className="w-5 h-5" />
                      </div>
                      <span className="text-[9px] font-bold text-slate-600">{t.companyPortal}</span>
                    </div>
                  </div>

                  <div className="bg-emerald-50 text-emerald-800 p-3 rounded-lg flex items-start gap-2.5">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[11px] font-bold">{t.decisionClear}</h4>
                      <p className="text-[10px] text-emerald-700 leading-tight mt-0.5">
                        {t.decisionClearDesc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. INTERACTIVE SIDEBAR & PRIVACY BY DEFAULT */}
      <section ref={privacyByDefaultRef} id="privacy-by-default" className="py-20 md:py-28 bg-[#FAFBFD]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Sidebar Menu Component */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-10">
              <div className="space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#354CE1]">
                  {t.overviewTitle}
                </h2>
                <div className="flex flex-col space-y-1">
                  {t.navItems.map((item: any) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id, sidebarRefs[item.id])}
                      className={`text-left text-sm font-semibold px-4 py-3 rounded-xl transition duration-300 flex items-center justify-between ${
                        activeSection === item.id 
                          ? 'bg-[#354CE1] text-white shadow-md shadow-[#354CE1]/15' 
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      {item.label}
                      <ChevronRightIcon className={`w-4 h-4 transition ${activeSection === item.id ? 'translate-x-1 opacity-100' : 'opacity-0'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Privacy Notices Widget Box */}
              <div className="border border-slate-200/80 bg-white rounded-3xl p-6 shadow-sm space-y-5">
                <div>
                  <h3 className="font-display font-bold text-slate-900 text-sm">{t.privacyNoticesTitle}</h3>
                  <p className="text-[11px] text-slate-400 font-mono uppercase mt-0.5">{t.privacyNoticesSubtitle}</p>
                </div>
                
                <div className="space-y-3">
                  {t.notices.map((notice: any) => (
                    <div key={notice.id} className="group p-3 border border-slate-100 hover:border-slate-200 rounded-2xl flex flex-col justify-between hover:bg-slate-50 transition">
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-slate-800">{notice.title}</h4>
                        <p className="text-[10px] text-slate-500 leading-relaxed">{notice.desc}</p>
                      </div>
                      <button
                        onClick={() => setActiveNoticeDoc(notice.id)}
                        className="text-[11px] font-bold text-[#354CE1] group-hover:text-[#2539BE] mt-2 inline-flex items-center gap-1 hover:underline transition self-start"
                      >
                        {t.read}
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side Details Layout */}
            <div className="lg:col-span-8 space-y-12">
              <div className="space-y-4">
                <h3 className="text-3xl font-display font-bold text-[#0F1E36] tracking-tight">
                  {t.privacyDefaultTitle}
                </h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  {t.privacyDefaultDesc}
                </p>
              </div>

              {/* Detail Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-200 pt-8">
                {t.privacyQa.map((item: any) => (
                  <div key={item.q} className="space-y-3">
                    <h4 className="font-display font-bold text-slate-900 text-base">{item.q}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. HOW WE SAFEGUARD YOUR DATA */}
      <section ref={safeguardRef} id="safeguard" className="py-20 md:py-28 bg-white border-t border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#354CE1] bg-[#E2E6FF] px-3.5 py-1.5 rounded-full">
              {t.safeguardBadge}
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-[#0F1E36] tracking-tight">
              {t.safeguardTitle}
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              {t.safeguardDesc}
            </p>
          </div>

          {/* 6 Grid Items with Blue Circular Outline Icons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {t.safeguards.map((item: any, index: number) => {
              const Icon = safeguardIcons[index] || ShieldCheck;
              return (
                <div key={item.title} className="p-6 border border-slate-150 rounded-3xl space-y-4 hover:border-[#354CE1]/30 hover:shadow-lg transition duration-300">
                  <div className="w-11 h-11 rounded-full border-2 border-[#354CE1]/20 flex items-center justify-center text-[#354CE1]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-slate-900 text-base">{item.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Compliance Logos / Security & Privacy Banner */}
          <div className="bg-[#E2E6FF]/50 border border-[#354CE1]/10 rounded-[2.5rem] p-8 md:p-12 text-center space-y-8 shadow-sm">
            <div className="space-y-2 max-w-2xl mx-auto">
              <p className="text-[10px] font-bold font-mono tracking-wider text-[#354CE1] uppercase">{t.industryStandards}</p>
              <h3 className="text-xl md:text-2xl font-display font-bold text-[#0F1E36]">{t.securityCoreTitle}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                {t.securityCoreDesc}
              </p>
            </div>

            {/* Visual Logo Pill Grid */}
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {t.certs.map((label: string, i: number) => (
                <span 
                  key={i} 
                  className={`text-[10px] font-bold font-mono px-3.5 py-1.5 rounded-full select-none shadow-sm flex items-center gap-1 hover:scale-105 transition duration-200 cursor-default ${certBadgeClasses[i]}`}
                >
                  <ShieldCheck className="w-3 h-3 shrink-0" />
                  {label}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 6. YOUR DATA RIGHTS AND CONTROL */}
      <section ref={dataRightsRef} id="data-rights" className="py-20 md:py-28 bg-[#FAFBFD]">
        <div className="max-w-4xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#354CE1] bg-[#E2E6FF] px-3.5 py-1.5 rounded-full">
              {t.userControlsBadge}
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-[#0F1E36] tracking-tight">
              {t.dataRightsTitle}
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-sans">
              {t.dataRightsDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-200 pt-10">
            {/* Q1 */}
            <div className="space-y-3 bg-white p-6 rounded-3xl border border-slate-150 shadow-sm">
              <h3 className="font-display font-bold text-slate-900 text-base">{t.rightsQuestion}</h3>
              <p className="text-slate-600 text-xs">{t.rightsIntro}</p>
              <ul className="space-y-2 text-xs text-slate-600 pl-4 list-disc font-sans leading-relaxed">
                {t.rightsBullets.map((item: string) => <li key={item}>{item}</li>)}
              </ul>
            </div>

            {/* Q2 */}
            <div className="space-y-3 bg-white p-6 rounded-3xl border border-slate-150 shadow-sm">
              <h3 className="font-display font-bold text-slate-900 text-base">{t.manageQuestion}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                {t.manageAnswer}
              </p>
              <button 
                onClick={() => setManageDataModalOpen(true)}
                className="text-xs font-bold text-[#354CE1] hover:text-[#2539BE] flex items-center gap-1 hover:underline transition pt-2"
              >
                {t.submitDsr}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Q3 */}
            <div className="space-y-3 bg-white p-6 rounded-3xl border border-slate-150 shadow-sm">
              <h3 className="font-display font-bold text-slate-900 text-base">{t.retentionQuestion}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                {t.retentionAnswer}
              </p>
            </div>

            {/* Q4 */}
            <div className="space-y-3 bg-white p-6 rounded-3xl border border-slate-150 shadow-sm">
              <h3 className="font-display font-bold text-slate-900 text-base">{t.deleteQuestion}</h3>
              <p className="text-slate-600 text-xs leading-relaxed font-sans">
                {t.deleteAnswer}
              </p>
            </div>
          </div>

          {/* Bottom Question block & Final CTA */}
          <div className="border border-slate-200 bg-white rounded-[2rem] p-6 md:p-8 space-y-4 shadow-sm text-center">
            <h4 className="font-display font-bold text-slate-900 text-base">{t.contactQuestion}</h4>
            <p className="text-slate-600 text-xs max-w-2xl mx-auto leading-relaxed">
              {t.contactAnswerPrefix} <span className="font-semibold text-[#354CE1]">privacy@withidentra.com</span>.
            </p>

            <div className="flex justify-center pt-4">
              <button
                onClick={() => setManageDataModalOpen(true)}
                className="bg-[#0F1E36] hover:bg-slate-800 text-white font-semibold text-xs px-6 py-3.5 rounded-full shadow flex items-center gap-1.5 transition duration-300"
              >
                {t.manageData}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* --- FLOATING MODALS --- */}

      {/* A. PRIVACY NOTICE DOCUMENT VIEW MODAL */}
      {activeNotice && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in-50 zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2 text-[#354CE1]">
                <FileText className="w-5 h-5" />
                <h3 className="font-display font-bold text-slate-900 text-base">{activeNotice.title}</h3>
              </div>
              <button 
                onClick={() => setActiveNoticeDoc(null)}
                className="p-1.5 rounded-full hover:bg-slate-200 transition text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 overflow-y-auto space-y-4 text-xs text-slate-600 leading-relaxed font-sans">
              <div className="whitespace-pre-line">
                {activeNotice.content}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 flex justify-end bg-slate-50">
              <button 
                onClick={() => setActiveNoticeDoc(null)}
                className="bg-[#354CE1] hover:bg-[#2539BE] text-white font-semibold text-xs px-5 py-2.5 rounded-full transition"
              >
                {t.closeDocument}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* B. MANAGE MY DATA SUBJECT ACCESS REQUEST (DSAR) PORTAL */}
      {manageDataModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in-50 zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-[#0F1E36] text-white">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-display font-bold text-sm">{t.portalTitle}</h3>
              </div>
              <button 
                onClick={() => {
                  setManageDataModalOpen(false);
                  setManageDataSubmitted(false);
                }}
                className="p-1.5 rounded-full hover:bg-white/10 transition text-slate-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            {!manageDataSubmitted ? (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setManageDataSubmitted(true);
                }}
                className="p-6 space-y-4"
              >
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-150">
                  <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                    {t.portalIntro}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">{t.requestType}</label>
                  <select className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-sans focus:outline-none focus:border-[#354CE1]">
                    {t.requestOptions.map((option: string) => <option key={option}>{option}</option>)}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">{t.fullName}</label>
                  <input required type="text" placeholder={t.fullNamePlaceholder} className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-sans focus:outline-none focus:border-[#354CE1]" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">{t.emailAddress}</label>
                  <input required type="email" placeholder={t.emailPlaceholder} className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-sans focus:outline-none focus:border-[#354CE1]" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">{t.partnerOrg}</label>
                  <input required type="text" placeholder={t.partnerOrgPlaceholder} className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-sans focus:outline-none focus:border-[#354CE1]" />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#354CE1] hover:bg-[#2539BE] text-white font-semibold text-xs py-3 rounded-full shadow transition mt-2"
                >
                  {t.submitPrivacyRequest}
                </button>
              </form>
            ) : (
              <div className="p-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center mx-auto text-xl">
                  <Check className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-display font-bold text-[#0F1E36] text-base">{t.requestSubmitted}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">
                    {t.requestSubmittedDesc}
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setManageDataModalOpen(false);
                    setManageDataSubmitted(false);
                  }}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-5 py-2.5 rounded-full transition"
                >
                  {t.returnToPage}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

// Inline Icon Helper to avoid missing imports
function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
