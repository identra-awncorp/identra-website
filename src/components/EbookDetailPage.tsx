/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, Clock, Calendar, Share2, Bookmark, ArrowRight,
  ChevronDown, ChevronUp, AlertCircle, Play, Sparkles, Check,
  BookOpen, HelpCircle, User, MessageSquare, ExternalLink, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  EBOOK_DETAIL_DATA_TRANSLATIONS,
  EBOOK_DETAIL_PAGE_TRANSLATIONS
} from '../translations/EbookDetailPageTranslations';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { copyTextToClipboard } from '../utils/clipboard';
import type { EbookDetailId } from '../types/routes';

interface EbookDetailPageProps {
  ebookId: EbookDetailId;
  onBack: () => void;
  onOpenSandbox: () => void;
}

export default function EbookDetailPage({ ebookId, onBack, onOpenSandbox }: EbookDetailPageProps) {

  const { language } = useLanguage();

  const t = getLocalizedRecord(EBOOK_DETAIL_PAGE_TRANSLATIONS, language as keyof typeof EBOOK_DETAIL_PAGE_TRANSLATIONS, 'EBOOK_DETAIL_PAGE_TRANSLATIONS');
  const dataT = getLocalizedRecord(EBOOK_DETAIL_DATA_TRANSLATIONS, language as keyof typeof EBOOK_DETAIL_DATA_TRANSLATIONS, 'EBOOK_DETAIL_DATA_TRANSLATIONS');

  const [activeSection, setActiveSection] = useState('how-it-works');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isBookmarked, setIsBookmarked] = useState(false);

  // References for scroll monitoring
  const secHowItWorks = useRef<HTMLDivElement>(null);
  const secComprehensive = useRef<HTMLDivElement>(null);
  const secFiveWays = useRef<HTMLDivElement>(null);
  const secAvailable = useRef<HTMLDivElement>(null);
  const faqs = dataT.faqs;
  const tableOfContents = [
    { id: 'how-it-works', label: t.copy.howSentinelWorks, ref: secHowItWorks },
    { id: 'comprehensive', label: t.copy.sentinelBuildsOnIdentrasComprehensiveIdentityPlatform, ref: secComprehensive },
    { id: 'five-ways', label: t.copy.text5WaysSentinelHelpsFraudFightersMakeMore, ref: secFiveWays },
    { id: 'available', label: t.copy.sentinelIsNowAvailableForAllIdentraCustomers, ref: secAvailable },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      if (secAvailable.current && scrollPosition >= secAvailable.current.offsetTop) {
        setActiveSection('available');
      } else if (secFiveWays.current && scrollPosition >= secFiveWays.current.offsetTop) {
        setActiveSection('five-ways');
      } else if (secComprehensive.current && scrollPosition >= secComprehensive.current.offsetTop) {
        setActiveSection('comprehensive');
      } else if (secHowItWorks.current && scrollPosition >= secHowItWorks.current.offsetTop) {
        setActiveSection('how-it-works');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (elementRef: React.RefObject<HTMLDivElement | null>, id: string) => {
    if (elementRef.current) {
      window.scrollTo({
        top: elementRef.current.offsetTop - 100,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  const handleShare = async () => {
    const copied = await copyTextToClipboard(`${window.location.origin}/ebook-detail/${ebookId}`);
    setCopyStatus(copied ? 'success' : 'error');
    setTimeout(() => setCopyStatus('idle'), 2000);
  };

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-slate-800 font-sans antialiased selection:bg-[#354CE1]/10 selection:text-[#354CE1]">
      
      {/* Navigation & Actions Top Bar */}
      <div className="sticky top-16 z-30 bg-[#FAFBFD]/95 backdrop-blur-md border-b border-slate-150 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            id="btn-back-to-ebooks"
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-[#354CE1] font-semibold text-sm transition group"
          >
            <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" />
            <span>{t.copy.backToEbooksGuides}</span>
          </button>
          
          <div className="flex items-center gap-3">
            <button
              id="btn-bookmark"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 rounded-full border transition ${
                isBookmarked 
                  ? 'bg-[#354CE1]/10 border-[#354CE1] text-[#354CE1]' 
                  : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50'
              }`}
              title={t.copy.bookmarkArticle}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
            <button
              id="btn-share"
              onClick={handleShare}
              className="p-2 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition relative"
              title={copyStatus === 'error' ? t.copy.copyFailed : t.copy.copyOriginalLink}
            >
              {copyStatus !== 'idle' ? (
                <span className={`absolute -top-9 left-1/2 -translate-x-1/2 text-white text-[10px] py-1 px-2 rounded-md font-medium whitespace-nowrap ${copyStatus === 'success' ? 'bg-slate-900' : 'bg-rose-600'}`}>
                  {copyStatus === 'success' ? t.copy.copied : t.copy.copyFailed}
                </span>
              ) : null}
              <Share2 className="w-4 h-4" />
            </button>
            <button
              id="btn-get-started"
              onClick={onOpenSandbox}
              className="bg-[#354CE1] hover:bg-[#2539BE] text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm transition"
            >{t.copy.getADemo}</button>
          </div>
        </div>
      </div>

      {/* Hero Header Section */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <div className="bg-gradient-to-tr from-[#354CE1] via-[#5F3CF3] to-[#00D4B2] text-white rounded-[32px] p-8 md:p-12 lg:p-14 relative overflow-hidden shadow-xl shadow-indigo-950/5">
          {/* Decorative backdrop elements matching NFC Page Hero Section */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)] pointer-events-none" />
          <div className="absolute top-1/4 left-1/10 w-48 h-48 bg-yellow-400/25 rounded-full blur-3xl animate-pulse pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/10 w-72 h-72 bg-[#00E5FF]/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
              <span className="text-xs bg-white/20 backdrop-blur-md border border-white/25 text-yellow-300 font-bold tracking-wider px-3 py-1 rounded-full uppercase">{t.copy.blogGuide}</span>
              <div className="flex items-center gap-1.5 text-xs text-indigo-100">
                <Calendar className="w-3.5 h-3.5 text-indigo-200" />
                <span>{t.copy.publishedJune262026}</span>
              </div>
              <span className="text-white/40">•</span>
              <div className="flex items-center gap-1.5 text-xs text-indigo-100">
                <Clock className="w-3.5 h-3.5 text-indigo-200" />
                <span>{t.copy.text6MinRead}</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight tracking-tight max-w-4xl mb-6">{t.copy.identrasSentinelHelpsYouAssessRiskAtEvery}</h1>
            
            <p className="text-base md:text-lg text-slate-200 font-normal leading-relaxed max-w-3xl mb-8">{t.copy.identrasSentinelPassivelyCollectsDeviceAndNetworkSignals}</p>

            <div className="flex items-center gap-3 border-t border-white/10 pt-6 mt-8">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#354CE1] to-[#BE185D] flex items-center justify-center font-bold text-sm tracking-wide text-white border-2 border-white/20 shadow-md">
                BC
              </div>
              <div>
                <p className="text-sm font-bold text-white">Brandon Chen</p>
                <p className="text-xs text-slate-300">{t.copy.productMarketingIdentra}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Article Body */}
          <div className="lg:col-span-8 space-y-10 text-slate-700 leading-relaxed text-base font-normal">
            
            {/* Intro Paragraphs */}
            <div className="space-y-6">
              <p className="text-lg text-slate-800 leading-relaxed font-normal">{t.copy.youveBuiltRigorousIdentityVerificationFlowsYoureRunning}</p>
              <p>{t.copy.sentinelExtendsPassiveSignalCollectionToAnyMoment}</p>
            </div>

            {/* Section 1: How Sentinel works */}
            <div ref={secHowItWorks} id="how-sentinel-works" className="pt-4 scroll-mt-24 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight border-b border-slate-100 pb-3">{t.copy.howSentinelWorks}</h2>
              <p>{t.copy.sentinelIsALightweightToolkitThatYouCan}</p>
              
              {/* Bullet list of collected signals */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-5 rounded-2xl border border-slate-150/80 shadow-xs">
                {dataT.signals.map((item, index) => (
                  <li key={index} className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#354CE1] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p>{t.copy.youCanUseSentinelTo}</p>

              {/* Sentinel capabilities breakdown */}
              <div className="space-y-4">
                {dataT.capabilities.map((item, index) => (
                  <div key={index} className="bg-white border border-slate-100 p-5 rounded-2xl shadow-xs space-y-1.5">
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-50 text-[#354CE1] flex items-center justify-center text-xs font-bold shrink-0">
                        {index + 1}
                      </span>
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-normal leading-relaxed pl-7">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Interactive Timelines Visual Component */}
              <div className="bg-linear-to-b from-slate-50 to-indigo-50/20 border border-slate-200/60 rounded-3xl p-6 md:p-8 my-8">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 mb-6">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 tracking-tight">{t.copy.interactiveShowcase}</h4>
                    <p className="text-[11px] text-slate-500 font-normal">{t.copy.realTimeRiskSignallingThroughoutSessionLifecycle}</p>
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 font-extrabold uppercase px-2 py-0.5 rounded-full border border-emerald-100">{t.copy.liveSimulator}</span>
                </div>

                <div className="space-y-6 max-w-md mx-auto">
                  {/* Timeline Row 1 */}
                  <div className="flex gap-4">
                    <div className="w-16 shrink-0 pt-3">
                      <span className="font-mono text-xs font-bold text-[#354CE1] bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100 shadow-2xs">
                        12:00:00
                      </span>
                    </div>
                    
                    <div className="relative flex-1 bg-white border border-slate-200/80 p-4 rounded-2xl shadow-xs">
                      {/* Timeline dot */}
                      <div className="absolute -left-[22px] top-4 w-3 h-3 rounded-full bg-[#354CE1] border-2 border-white shadow-xs" />
                      
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-full bg-indigo-50 text-[#354CE1] flex items-center justify-center shrink-0">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t.copy.action}</span>
                          <h5 className="text-xs font-bold text-slate-900 leading-none mt-0.5">{t.copy.idVerification}</h5>
                        </div>
                      </div>
                      
                      <p className="font-mono text-[10px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">{t.copy.uniqueDeviceToken}<span className="font-bold text-indigo-600">dev_Z8Nqm2LPr7xK</span>
                      </p>
                    </div>
                  </div>

                  {/* Vertical connector line */}
                  <div className="h-6 w-0.5 bg-slate-200 ml-20 -my-3" />

                  {/* Timeline Row 2 */}
                  <div className="flex gap-4">
                    <div className="w-16 shrink-0 pt-3">
                      <span className="font-mono text-xs font-bold text-[#354CE1] bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100 shadow-2xs">
                        12:05:05
                      </span>
                    </div>
                    
                    <div className="relative flex-1 bg-white border border-slate-200/80 p-4 rounded-2xl shadow-xs">
                      {/* Timeline dot */}
                      <div className="absolute -left-[22px] top-4 w-3 h-3 rounded-full bg-[#354CE1] border-2 border-white shadow-xs" />
                      
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-full bg-indigo-50 text-[#354CE1] flex items-center justify-center shrink-0">
                          <Play className="w-3.5 h-3.5 rotate-90 text-[#354CE1]" />
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t.copy.action}</span>
                          <h5 className="text-xs font-bold text-slate-900 leading-none mt-0.5">{t.copy.accountSettings}</h5>
                        </div>
                      </div>
                      
                      <p className="font-mono text-[10px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">{t.copy.uniqueDeviceToken}<span className="font-bold text-indigo-600">dev_M4xJq8NzT2vL</span>
                      </p>

                      {/* Warning box */}
                      <div className="mt-3 bg-amber-50 border border-amber-200 p-3 rounded-xl flex gap-2.5 items-start">
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <h6 className="text-[10px] font-extrabold text-amber-800 uppercase tracking-wider">{t.copy.warningFlag}</h6>
                          <p className="text-xs font-bold text-amber-700 leading-tight">{t.copy.newDeviceTokenSharedWith10ExistingAccounts}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-500 text-center font-normal leading-relaxed mt-6 italic bg-white/50 p-3 rounded-xl border border-slate-200/40">{t.copy.aUserCompletesIdentityVerificationOnOneDevice}</p>
              </div>

            </div>

            {/* Section 2: Sentinel builds on Identra's comprehensive identity platform */}
            <div ref={secComprehensive} id="sentinel-comprehensive" className="pt-4 scroll-mt-24 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight border-b border-slate-100 pb-3">{t.copy.sentinelBuildsOnIdentrasComprehensiveIdentityPlatform}</h2>
              <p>{t.copy.oneOfIdentrasEarliestInnovationsWasTheCreation}</p>
              <p>{t.copy.asIdentrasPlatformExpandedWeCreatedNewBuilding}</p>
              <p>{t.copy.butExperiencedFraudstersKnowThatManyFraudDetection}</p>
              <p>{t.copy.sentinelHelpsYouCatchTheseMistakesMoreImportantly}</p>
              <p>{t.copy.unlikePointSolutionsItNativelyWorksAlongsideIdentras}</p>
            </div>

            {/* Section 3: 5 ways Sentinel helps fraud fighters */}
            <div ref={secFiveWays} id="five-ways-sentinel" className="pt-4 scroll-mt-24 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight border-b border-slate-100 pb-3">{t.copy.text5WaysSentinelHelpsFraudFightersMakeMore}</h2>
              <p>{t.copy.whenAHighRiskSignalSurfacesOutsideOf}</p>
              <p>{t.copy.someOfTheCommonUseCasesForSentinel}</p>

              {/* Five Ways details cards */}
              <div className="space-y-6">
                {dataT.fiveWays.map((item, index) => (
                  <div key={index} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#354CE1] text-white flex items-center justify-center font-bold text-sm shrink-0">
                        {item.num}
                      </div>
                      <h3 className="font-bold text-slate-950 text-base">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-slate-600 text-sm font-normal leading-relaxed pl-11">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: Sentinel is now available for all Identra customers */}
            <div ref={secAvailable} id="sentinel-available" className="pt-4 scroll-mt-24 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight border-b border-slate-100 pb-3">{t.copy.sentinelIsNowAvailableForAllIdentraCustomers}</h2>
              <p>{t.copy.weWorkedWithSeveralCustomersWhoFrequentlyExperience}</p>
              <p>{t.copy.buildComprehensiveRiskProfilesByCapturingSignalsAt}</p>
              <p className="font-medium text-slate-900">{t.copy.learnMoreAboutPassiveSignalsFromIdentraOr}</p>

              <div className="text-slate-400 text-xs leading-relaxed space-y-2 pt-6 border-t border-slate-200/60 font-normal">
                <p>{t.copy.theInformationProvidedIsNotIntendedToConstitute}</p>
              </div>
            </div>

            {/* FAQs Interactive Accordion */}
            <div className="bg-white border border-slate-150/80 rounded-3xl p-6 md:p-8 mt-12 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-950">{t.copy.faqs}</h3>
                <p className="text-xs text-slate-500 font-normal">{t.copy.commonQuestionsRegardingSentinelIntegrationAndTechnology}</p>
              </div>
              
              <div className="divide-y divide-slate-100">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="py-4 first:pt-0 last:pb-0">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                      className="w-full flex justify-between items-center text-left py-2 font-bold text-sm text-slate-900 hover:text-[#354CE1] transition gap-4"
                    >
                      <span>{faq.q}</span>
                      {expandedFaq === idx ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    <AnimatePresence>
                      {expandedFaq === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs text-slate-500 font-normal leading-relaxed pt-2 pb-1 pr-6 pl-1 border-l-2 border-indigo-100 ml-1">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Author Bio Section Card */}
            <div className="bg-[#FAFBFD] border border-slate-200/60 rounded-2xl p-6 flex flex-col sm:flex-row gap-5 items-center sm:items-start text-center sm:text-left">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#354CE1] to-[#BE185D] flex items-center justify-center font-bold text-xl tracking-wide text-white border-4 border-white shadow-md shrink-0">
                BC
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-950 text-sm">Brandon Chen</h4>
                <p className="text-xs text-slate-500 font-normal leading-relaxed">{t.copy.originallyFromTaiwanBrandonChenIsACalifornia}</p>
              </div>
            </div>

          </div>

          {/* Right Column: Floating Sidebar Navigation */}
          <div className="lg:col-span-4 lg:sticky lg:top-36 space-y-8">
            <div className="bg-white border border-slate-150 rounded-2xl p-5 shadow-xs">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">{t.copy.tableOfContents}</h3>
              <nav className="flex flex-col gap-1">
                {tableOfContents.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.ref, item.id)}
                    className={`text-left px-3 py-2 rounded-lg text-xs font-semibold leading-snug transition-all ${
                      activeSection === item.id
                        ? 'bg-[#354CE1]/10 text-[#354CE1] font-bold pl-4 border-l-2 border-[#354CE1]'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-l-2 border-transparent'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Floating Mini Newsletter / CTA Box */}
            <div className="bg-gradient-to-b from-indigo-900 to-[#12183A] text-white rounded-2xl p-6 shadow-md space-y-4">
              <Sparkles className="w-8 h-8 text-[#4F6CFF]" />
              <div className="space-y-1">
                <h4 className="font-bold text-sm tracking-tight">{t.copy.needAContinuousRiskSignalsStrategy}</h4>
                <p className="text-[11px] text-slate-300 font-normal leading-normal">{t.copy.configureSentinelsPassiveTelemetryToAnalyzeBrowsersProxy}</p>
              </div>
              <button
                onClick={onOpenSandbox}
                className="w-full bg-[#354CE1] hover:bg-[#2539BE] text-white font-bold text-xs py-2.5 rounded-xl transition shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>{t.copy.launchInteractiveSandbox}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* "Continue Reading" Section */}
      <div className="border-t border-slate-200/60 bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-xl font-bold text-slate-950 tracking-tight mb-8">{t.copy.continueReading}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dataT.continueCards.map((card, idx) => (
              <div 
                key={idx}
                className="bg-[#FAFBFD] border border-slate-150 hover:border-[#354CE1]/50 rounded-2xl p-5 hover:shadow-md cursor-pointer group transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span>{card.type}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span>{card.time}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 group-hover:text-[#354CE1] text-sm leading-snug line-clamp-2 transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-normal leading-relaxed line-clamp-3">
                    {card.desc}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-[#354CE1] mt-5">
                  <span>{t.copy.readArticle}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Final Banner */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-[#3B52E2] to-[#4F46E5] text-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-xl">
          {/* Subtle background glow */}
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-2xl" />
          
          <div className="space-y-2 max-w-lg">
            <h2 className="text-2xl font-bold tracking-tight">{t.copy.readyToGetStarted}</h2>
            <p className="text-indigo-100 text-sm font-normal leading-relaxed">{t.copy.getInTouchOrStartExploringIdentraPassively}</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 shrink-0 relative z-10">
            <button 
              onClick={onOpenSandbox}
              className="bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs px-5 py-3 rounded-full shadow-md transition"
            >{t.copy.getADemo}</button>
            <button 
              onClick={onOpenSandbox}
              className="text-white hover:text-indigo-100 font-semibold text-xs px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 transition border border-white/20"
            >{t.copy.tryItNow}</button>
          </div>
        </div>
      </div>

    </div>
  );
}
