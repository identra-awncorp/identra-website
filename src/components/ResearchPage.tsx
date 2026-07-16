/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  BookOpen, Calendar, MapPin, Search, ArrowRight, ShieldCheck, 
  Sparkles, FileText, ChevronRight, Check, Info, Sparkle, Globe, 
  Layers, Lock, Eye, AlertCircle, RefreshCw, Star, ArrowDown, ExternalLink, X,
  Bookmark
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import {
  RESEARCH_TRANSLATIONS,
  getLocalizedPublications,
  getLocalizedRegulations,
  getLocalizedReadingList
} from '../translations/ResearchPageTranslations';

interface ResearchPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
}

interface Publication {
  id: string;
  title: string;
  category: 'Fraud intelligence' | 'Data privacy' | 'Online safety' | 'Accessible identity';
  description: string;
  date: string;
  authors: string;
  pages: number;
  readTime: string;
  abstract: string;
  keyTakeaways: string[];
  visualType: 'grid' | 'space' | 'network' | 'portraits' | 'nodes' | 'sphere' | 'rings';
}

// ATLAS GLOBAL REGULATION TRACKER DATA
interface AgeRegulation {
  country: string;
  region: string;
  lawName: string;
  status: 'In Effect' | 'Pending 2026' | 'Under Review';
  minAge: number;
  methodsAllowed: string[];
  strictness: 'High' | 'Medium' | 'Standard';
  details: string;
}

interface ReadingItem {
  id: string;
  title: string;
  category: 'Industry Report' | 'Technical Briefing' | 'Regulatory Deep-Dive' | 'Academic Paper';
  source: string;
  readTime: string;
  publicationYear: string;
  description: string;
  summary: string;
  keyInsights: string[];
}

export default function ResearchPage({ onOpenSandbox, onBackToLanding }: ResearchPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(RESEARCH_TRANSLATIONS, language as keyof typeof RESEARCH_TRANSLATIONS, 'RESEARCH_TRANSLATIONS');

  const getLocalizedRegionName = (region: string) => {
    return t.regions[region as keyof typeof t.regions] || region;
  };

  const publications = useMemo(() => getLocalizedPublications(language), [language]);
  const regulations = useMemo(() => getLocalizedRegulations(language), [language]);
  const readingList = useMemo(() => getLocalizedReadingList(language), [language]);

  const [activeCategory, setActiveCategory] = useState<'All' | 'Fraud intelligence' | 'Data privacy' | 'Online safety' | 'Accessible identity'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Publication focus modal or expand detail
  const [selectedPub, setSelectedPub] = useState<Publication | null>(null);
  
  // Interactive Atlas database state
  const [isAtlasOpen, setIsAtlasOpen] = useState(false);
  const [atlasSearch, setAtlasSearch] = useState('');
  const [atlasFilterRegion, setAtlasFilterRegion] = useState<'All' | 'Europe' | 'North America' | 'Asia Pacific'>('All');
  const [selectedAtlasLaw, setSelectedAtlasLaw] = useState<AgeRegulation | null>(null);

  // Curated Reading List state
  const [readingListFilter, setReadingListFilter] = useState<'all' | 'bookmarked' | 'completed'>('all');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['read-1', 'read-3']);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [selectedReadItem, setSelectedReadItem] = useState<ReadingItem | null>(null);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]
    );
  };

  const toggleCompleted = (id: string) => {
    setCompletedIds(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  // Filter logic
  const filteredPubs = publications.filter(pub => {
    const matchesCategory = activeCategory === 'All' || pub.category === activeCategory;
    const matchesSearch = pub.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pub.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pub.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pub.abstract.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const counts = {
    All: publications.length,
    'Fraud intelligence': publications.filter(p => p.category === 'Fraud intelligence').length,
    'Data privacy': publications.filter(p => p.category === 'Data privacy').length,
    'Online safety': publications.filter(p => p.category === 'Online safety').length,
    'Accessible identity': publications.filter(p => p.category === 'Accessible identity').length,
  };

  // Rendering beautiful dynamic background SVGs for publications
  const renderVisualMock = (type: string) => {
    switch (type) {
      case 'grid':
        return (
          <div className="w-full h-full bg-slate-950 p-3 flex flex-col justify-between relative overflow-hidden font-mono text-[9px] text-[#354CE1]">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#354CE1_1px,transparent_1px)] [background-size:12px_12px]" />
            <div className="flex justify-between border-b border-[#354CE1]/20 pb-1 z-10">
              <span>{t.visualMetricSpace}</span>
              <span>{t.visualDinov3}</span>
            </div>
            <div className="flex-1 flex items-center justify-center relative z-10 py-1">
              <svg className="w-full h-full" viewBox="0 0 100 60">
                {/* Simulated clustered document embedding plots */}
                <circle cx="25" cy="20" r="4" fill="#354CE1" fillOpacity="0.8" className="animate-pulse" />
                <circle cx="22" cy="17" r="3" fill="#354CE1" fillOpacity="0.6" />
                <circle cx="28" cy="23" r="3.5" fill="#354CE1" fillOpacity="0.6" />
                
                <circle cx="75" cy="40" r="4.5" fill="#a855f7" fillOpacity="0.8" />
                <circle cx="72" cy="44" r="3" fill="#a855f7" fillOpacity="0.6" />
                <circle cx="78" cy="38" r="3" fill="#a855f7" fillOpacity="0.6" />

                {/* Anomalies (Fraud attempts) */}
                <circle cx="48" cy="32" r="2.5" fill="#ef4444" className="animate-ping" style={{ animationDuration: '3s' }} />
                <circle cx="52" cy="12" r="2" fill="#ef4444" />
                <path d="M 25 20 L 48 32 L 75 40" stroke="#354CE1" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.3" />
              </svg>
            </div>
            <div className="flex justify-between border-t border-[#354CE1]/20 pt-1 text-[8px] z-10 text-slate-400">
              <span>{t.visualErrRate}</span>
              <span>{t.visualSampleSize}</span>
            </div>
          </div>
        );
      case 'space':
        return (
          <div className="w-full h-full bg-slate-900 p-3 flex flex-col justify-between relative overflow-hidden font-mono text-[9px] text-purple-400">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-950/20 via-transparent to-transparent" />
            <div className="flex justify-between border-b border-purple-500/20 pb-1 z-10">
              <span>{t.visualSubRemoval}</span>
              <span>{t.visualIspLayer}</span>
            </div>
            <div className="flex-1 flex items-center justify-center relative z-10 py-1">
              <svg className="w-full h-full animate-pulse" viewBox="0 0 100 60">
                <line x1="10" y1="30" x2="90" y2="30" stroke="#a855f7" strokeWidth="0.8" strokeDasharray="3,3" />
                <line x1="50" y1="5" x2="50" y2="55" stroke="#a855f7" strokeWidth="0.8" strokeDasharray="3,3" />
                {/* Vectors */}
                <line x1="50" y1="30" x2="75" y2="12" stroke="#a855f7" strokeWidth="1.5" markerEnd="url(#arrow)" />
                <line x1="50" y1="30" x2="30" y2="48" stroke="#354CE1" strokeWidth="1.5" />
                <circle cx="75" cy="12" r="3" fill="#ef4444" />
                <circle cx="30" cy="48" r="3" fill="#22c55e" />
                {/* Orthogonal projection shadow */}
                <line x1="75" y1="12" x2="75" y2="30" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="1,1" />
              </svg>
            </div>
            <div className="flex justify-between border-t border-purple-500/20 pt-1 text-[8px] z-10 text-slate-400">
              <span>{t.visualLeakage}</span>
              <span>{t.visualBiomVar}</span>
            </div>
          </div>
        );
      case 'rings':
        return (
          <div className="w-full h-full bg-slate-950 p-3 flex flex-col justify-between relative overflow-hidden font-mono text-[9px] text-[#354CE1]">
            <div className="absolute inset-0 bg-gradient-to-b from-[#354CE1]/10 via-transparent to-transparent" />
            <div className="flex justify-between border-b border-[#354CE1]/20 pb-1 z-10">
              <span>{t.visualMuleDetector}</span>
              <span>{t.visualTelemetryStream}</span>
            </div>
            <div className="flex-1 flex items-center justify-center relative z-10 py-1">
              <svg className="w-full h-full" viewBox="0 0 100 60">
                <circle cx="50" cy="30" r="18" fill="none" stroke="#354CE1" strokeWidth="1" className="animate-spin" style={{ animationDuration: '8s', transformOrigin: '50px 30px' }} />
                <circle cx="50" cy="30" r="12" fill="none" stroke="#354CE1" strokeWidth="0.8" strokeDasharray="3,3" />
                <circle cx="50" cy="30" r="6" fill="none" stroke="#ef4444" strokeWidth="1.2" />
                <line x1="50" y1="30" x2="68" y2="30" stroke="#354CE1" strokeWidth="0.8" />
                <circle cx="68" cy="30" r="2" fill="#354CE1" />
              </svg>
            </div>
            <div className="flex justify-between border-t border-[#354CE1]/20 pt-1 text-[8px] z-10 text-slate-400">
              <span>{t.visualTelemetryOk}</span>
              <span>{t.visualMuleRate}</span>
            </div>
          </div>
        );
      case 'portraits':
        return (
          <div className="w-full h-full bg-slate-900 p-3 flex flex-col justify-between relative overflow-hidden font-mono text-[9px] text-[#22c55e]">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:10px_10px]" />
            <div className="flex justify-between border-b border-[#22c55e]/20 pb-1 z-10">
              <span>{t.visualThreatTdp}</span>
              <span>{t.visualSortedRejLog}</span>
            </div>
            <div className="flex-1 flex items-center justify-center relative z-10 py-1">
              <svg className="w-full h-full" viewBox="0 0 100 60">
                <rect x="15" y="10" width="20" height="40" rx="3" fill="#1e293b" stroke="#354CE1" strokeWidth="1" />
                <circle cx="25" cy="22" r="5" fill="#354CE1" fillOpacity="0.4" />
                <path d="M 18 45 Q 25 35 32 45" stroke="#354CE1" strokeWidth="1" fill="none" />
                
                <rect x="65" y="10" width="20" height="40" rx="3" fill="#1e293b" stroke="#ef4444" strokeWidth="1" />
                <circle cx="75" cy="22" r="5" fill="#ef4444" fillOpacity="0.4" className="animate-pulse" />
                <path d="M 68 45 Q 75 35 82 45" stroke="#ef4444" strokeWidth="1" fill="none" />
                
                <path d="M 35 30 L 65 30" stroke="#22c55e" strokeWidth="1" strokeDasharray="3,3" />
              </svg>
            </div>
            <div className="flex justify-between border-t border-[#22c55e]/20 pt-1 text-[8px] z-10 text-slate-400">
              <span>{t.visualAuditBias}</span>
              <span>{t.visualEstCi}</span>
            </div>
          </div>
        );
      case 'nodes':
        return (
          <div className="w-full h-full bg-slate-950 p-3 flex flex-col justify-between relative overflow-hidden font-mono text-[9px] text-amber-500">
            <div className="flex justify-between border-b border-amber-500/20 pb-1 z-10">
              <span>{t.visualKybGraph}</span>
              <span>{t.visualOnlineCrawl}</span>
            </div>
            <div className="flex-1 flex items-center justify-center relative z-10 py-1">
              <svg className="w-full h-full" viewBox="0 0 100 60">
                {/* Graph nodes */}
                <circle cx="50" cy="30" r="5" fill="#f59e0b" />
                <circle cx="25" cy="18" r="4" fill="#354CE1" />
                <circle cx="75" cy="18" r="4" fill="#a855f7" />
                <circle cx="35" cy="45" r="3.5" fill="#22c55e" />
                <circle cx="65" cy="45" r="3.5" fill="#f43f5e" />

                {/* Connections */}
                <line x1="50" y1="30" x2="25" y2="18" stroke="#94a3b8" strokeWidth="0.8" />
                <line x1="50" y1="30" x2="75" y2="18" stroke="#94a3b8" strokeWidth="0.8" />
                <line x1="50" y1="30" x2="35" y2="45" stroke="#94a3b8" strokeWidth="0.8" />
                <line x1="50" y1="30" x2="65" y2="45" stroke="#94a3b8" strokeWidth="0.8" />
                <line x1="25" y1="18" x2="75" y2="18" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="1,1" />
              </svg>
            </div>
            <div className="flex justify-between border-t border-amber-500/20 pt-1 text-[8px] z-10 text-slate-400">
              <span>{t.visualTrustScore}</span>
              <span>{t.visualNodes}</span>
            </div>
          </div>
        );
      case 'network':
        return (
          <div className="w-full h-full bg-slate-900 p-3 flex flex-col justify-between relative overflow-hidden font-mono text-[9px] text-[#354CE1]">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#354CE1_1px,transparent_1px)] [background-size:8px_8px]" />
            <div className="flex justify-between border-b border-[#354CE1]/20 pb-1 z-10">
              <span>{t.visualDigitalId}</span>
              <span>{t.visualSynthesisModel}</span>
            </div>
            <div className="flex-1 flex items-center justify-center relative z-10 py-1">
              <svg className="w-full h-full" viewBox="0 0 100 60">
                <circle cx="50" cy="30" r="10" fill="none" stroke="#354CE1" strokeWidth="1.5" />
                <circle cx="50" cy="30" r="3" fill="#354CE1" className="animate-pulse" />
                
                <path d="M 20 15 L 50 30 M 80 15 L 50 30 M 50 52 L 50 30" stroke="#354CE1" strokeWidth="0.8" />
                <rect x="14" y="10" width="12" height="10" rx="1" fill="#1e293b" stroke="#354CE1" strokeWidth="0.5" />
                <rect x="74" y="10" width="12" height="10" rx="1" fill="#1e293b" stroke="#354CE1" strokeWidth="0.5" />
                <rect x="44" y="47" width="12" height="10" rx="1" fill="#1e293b" stroke="#354CE1" strokeWidth="0.5" />
              </svg>
            </div>
            <div className="flex justify-between border-t border-[#354CE1]/20 pt-1 text-[8px] z-10 text-slate-400">
              <span>{t.visualVerifyPass}</span>
              <span>{t.visualTrustLevelMax}</span>
            </div>
          </div>
        );
      case 'sphere':
      default:
        return (
          <div className="w-full h-full bg-slate-950 p-3 flex flex-col justify-between relative overflow-hidden font-mono text-[9px] text-[#22c55e]">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#22c55e]/10 via-transparent to-transparent" />
            <div className="flex justify-between border-b border-[#22c55e]/20 pb-1 z-10">
              <span>{t.visualGlobalLaws}</span>
              <span>{t.visualAgeVerifyAadc}</span>
            </div>
            <div className="flex-1 flex items-center justify-center relative z-10 py-1">
              <svg className="w-full h-full animate-spin" style={{ animationDuration: '25s' }} viewBox="0 0 100 60">
                <circle cx="50" cy="30" r="20" fill="none" stroke="#22c55e" strokeWidth="0.8" />
                <ellipse cx="50" cy="30" rx="20" ry="6" fill="none" stroke="#22c55e" strokeWidth="0.6" />
                <ellipse cx="50" cy="30" rx="6" ry="20" fill="none" stroke="#22c55e" strokeWidth="0.6" />
                <circle cx="34" cy="20" r="2" fill="#ef4444" />
                <circle cx="66" cy="40" r="1.5" fill="#354CE1" />
                <circle cx="50" cy="10" r="2" fill="#a855f7" />
              </svg>
            </div>
            <div className="flex justify-between border-t border-[#22c55e]/20 pt-1 text-[8px] z-10 text-slate-400">
              <span>{t.visualPolicies}</span>
              <span>{t.visualDbSyncOk}</span>
            </div>
          </div>
        );
    }
  };

  // Atlas regulation tracker search & filter results
  const filteredAtlasRegs = regulations.filter(reg => {
    const matchesRegion = atlasFilterRegion === 'All' || reg.region === atlasFilterRegion;
    const matchesSearch = reg.country.toLowerCase().includes(atlasSearch.toLowerCase()) || 
                          reg.lawName.toLowerCase().includes(atlasSearch.toLowerCase()) ||
                          reg.details.toLowerCase().includes(atlasSearch.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-slate-800 font-sans antialiased selection:bg-[#354CE1]/10 selection:text-[#354CE1]">
      
      {/* HEADER HERO */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#5B6DFF]/10 via-[#FAFBFD]/50 to-[#FAFBFD] border-b border-slate-100">
        {/* Decorative ambient background elements */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-300/20 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-[#00D4B2]/10 rounded-full filter blur-3xl pointer-events-none animate-pulse-slow" />

        <div className="max-w-7xl mx-auto px-6 pt-24 pb-20 text-left relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <button 
              onClick={onBackToLanding}
              className="group inline-flex items-center gap-1.5 text-xs font-semibold text-[#354CE1] hover:text-[#2539BE] transition mb-4"
            >
              <span>&larr; {t.backToPlatform}</span>
            </button>

            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#354CE1]/10 text-[#354CE1] text-[10px] font-bold rounded-full uppercase tracking-wider w-max">
                <Sparkle className="w-3.5 h-3.5 fill-current text-[#354CE1]" />
                <span>{t.researchLabs}</span>
              </span>

              <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-[#0F1E36] leading-[1.05]">
                {t.heroTitle}
              </h1>
            </div>

            <p className="text-slate-600 text-sm md:text-lg leading-relaxed max-w-3xl font-normal pt-2">
              {t.heroDesc}
            </p>
          </motion.div>
        </div>
      </div>

      {/* CORE RESEARCH AREAS GRID */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="border-t border-slate-200/60 pt-10">
          <h2 className="text-xs font-extrabold text-[#354CE1] uppercase tracking-widest mb-10 text-left">
            {t.coreResearchAreas}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-left">
            {[
              { title: t.categories["Fraud intelligence"], desc: t.fraudIntelDesc },
              { title: t.categories["Online safety"], desc: t.onlineSafetyDesc },
              { title: t.categories["Accessible identity"], desc: t.accessibleIdDesc },
              { title: t.categories["Data privacy"], desc: t.dataPrivacyDesc }
            ].map((area, idx) => (
              <div key={idx} className="space-y-3 flex flex-col justify-between h-full border-t border-slate-200/50 pt-4 group hover:border-[#354CE1] transition-colors duration-300">
                <h3 className="font-bold text-slate-900 text-[13px] tracking-tight group-hover:text-[#354CE1] transition-colors">
                  {area.title}
                </h3>
                <p className="text-slate-500 text-[11px] leading-relaxed font-normal flex-1">
                  {area.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PUBLICATIONS SECTION WITH DYNAMIC INTERACTIVE FILTERS */}
      <div className="bg-white border-y border-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-slate-100 pb-8">
            <div className="space-y-2 text-left">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#0F1E36] tracking-tight">
                {t.publicationsTitle}
              </h2>
              <p className="text-slate-500 text-sm max-w-xl font-normal leading-relaxed">
                {t.publicationsDesc}
              </p>
            </div>

            {/* Clean Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input 
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-full border border-slate-200 text-xs font-semibold placeholder-slate-400 focus:outline-none focus:border-[#354CE1] focus:ring-1 focus:ring-[#354CE1] transition bg-white text-slate-800"
              />
            </div>
          </div>

          {/* Dynamic filter pills */}
          <div className="flex flex-wrap gap-2 mb-16 justify-start">
            {(['All', 'Fraud intelligence', 'Data privacy', 'Online safety', 'Accessible identity'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition duration-200 flex items-center gap-2 ${
                  activeCategory === cat 
                    ? 'bg-slate-900 text-white shadow-sm' 
                    : 'bg-indigo-50/70 text-[#354CE1] hover:bg-indigo-100/60'
                }`}
              >
                <span>{t.categories[cat]}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${activeCategory === cat ? 'bg-white/20 text-white' : 'bg-indigo-100 text-[#354CE1]'}`}>
                  {cat === 'All' ? counts.All : counts[cat]}
                </span>
              </button>
            ))}
          </div>

          {/* Publications List */}
          <div className="space-y-16">
            <AnimatePresence mode="popLayout">
              {filteredPubs.length > 0 ? (
                filteredPubs.map((pub, idx) => (
                  <motion.div
                    key={pub.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    className="group block"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                      
                      {/* Visual Graphic Thumbnail representing the paper (Col Span 3) */}
                      <div className="md:col-span-3 aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-xs border border-slate-200/60 bg-slate-100 relative shrink-0">
                        {renderVisualMock(pub.visualType)}
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-200 flex items-center justify-center cursor-pointer group-hover/thumb:opacity-100 opacity-0">
                          <span className="bg-white/95 backdrop-blur-xs text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md text-slate-800 flex items-center gap-1">
                            <BookOpen className="w-3 h-3 text-[#354CE1]" />
                            {t.readAbstract}
                          </span>
                        </div>
                      </div>

                      {/* Metadata and content description (Col Span 9) */}
                      <div className="md:col-span-9 flex flex-col justify-between h-full text-left space-y-4">
                        <div className="space-y-3">
                          {/* Category tag */}
                          <div className="flex items-center gap-3">
                            <span className={`inline-block text-[10px] font-extrabold uppercase tracking-wider ${
                              pub.category === 'Fraud intelligence' ? 'text-[#354CE1]' :
                              pub.category === 'Data privacy' ? 'text-purple-600' :
                              pub.category === 'Online safety' ? 'text-emerald-600' : 'text-amber-600'
                            }`}>
                              {t.categories[pub.category as keyof typeof t.categories] || pub.category}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-slate-300" />
                            <span className="text-slate-400 font-mono text-[10px]">{pub.readTime}</span>
                          </div>

                          {/* Title */}
                          <h3 
                            onClick={() => setSelectedPub(pub)}
                            className="text-lg md:text-2xl font-display font-semibold text-slate-900 group-hover:text-[#354CE1] transition-colors cursor-pointer leading-snug tracking-tight"
                          >
                            {pub.title}
                          </h3>

                          {/* Summary description text */}
                          <p className="text-slate-500 text-sm leading-relaxed font-normal">
                            {pub.description}
                          </p>
                        </div>

                        {/* Paper details and abstract trigger */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
                          <div className="space-y-0.5">
                            <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">{t.authorsLabel}</p>
                            <p className="text-slate-600 text-xs font-normal max-w-lg truncate">{pub.authors}</p>
                          </div>

                          <div className="flex items-center gap-4 shrink-0">
                            <span className="text-slate-400 text-xs font-mono">{pub.date}</span>
                            <button
                              onClick={() => setSelectedPub(pub)}
                              className="bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-150 text-[#354CE1] font-bold text-[11px] px-4 py-2 rounded-full shadow-2xs transition flex items-center gap-1"
                            >
                              <span>{t.abstractLabel}</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                      </div>

                    </div>

                    {/* Divider line */}
                    {idx < filteredPubs.length - 1 && (
                      <div className="border-t border-slate-150/80 my-12" />
                    )}
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-20 bg-slate-50 border border-slate-150 rounded-3xl p-8 max-w-2xl mx-auto">
                  <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="font-bold text-slate-900 text-sm">{t.noMatchesTitle}</p>
                  <p className="text-xs text-slate-500 mt-1">{t.noMatchesDesc}</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* READING LIST SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-20 text-left">
        <div className="space-y-2 mb-10">
          <h2 className="text-xs font-extrabold text-[#354CE1] uppercase tracking-widest">
            {t.readingListTitle}
          </h2>
          <p className="text-slate-500 text-sm max-w-2xl font-normal leading-relaxed">
            {t.readingListDesc}
          </p>
        </div>

        {/* Featured Interactive Tool Card (Atlas Tracker) */}
        <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl relative grid grid-cols-1 md:grid-cols-12 items-center mb-16">
          {/* Subtle grid elements representing Atlas globe/radar */}
          <div className="md:col-span-4 bg-slate-950 p-8 h-full flex flex-col items-center justify-center relative overflow-hidden min-h-[260px]">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute -right-16 w-48 h-48 rounded-full border border-[#22c55e]/30 animate-pulse flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border border-[#22c55e]/20" />
            </div>
            
            {/* Holographic Radar Indicator */}
            <svg className="w-full h-28 text-[#22c55e] relative z-10" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="2,2" />
              <circle cx="50" cy="50" r="25" fill="none" stroke="#22c55e" strokeWidth="0.8" />
              <line x1="50" y1="10" x2="50" y2="90" stroke="#22c55e" strokeWidth="0.5" opacity="0.4" />
              <line x1="10" y1="50" x2="90" y2="50" stroke="#22c55e" strokeWidth="0.5" opacity="0.4" />
              <circle cx="35" cy="40" r="3" fill="#22c55e" className="animate-ping" style={{ animationDuration: '4s' }} />
              <circle cx="35" cy="40" r="3" fill="#22c55e" />
              <circle cx="68" cy="62" r="2" fill="#22c55e" />
              <circle cx="52" cy="28" r="2.5" fill="#ef4444" />
            </svg>
            
            <div className="absolute bottom-4 left-4 bg-slate-900/90 py-1 px-2.5 rounded text-[8px] font-mono text-[#22c55e] border border-[#22c55e]/20 z-10">
              {t.atlasSystemActive}
            </div>
          </div>

          {/* Core copy block */}
          <div className="md:col-span-8 p-10 md:p-14 space-y-6">
            <span className="text-[10px] font-extrabold text-[#22c55e] uppercase tracking-widest bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded w-max block">
              {t.featuredTool}
            </span>
            <h3 className="text-2xl md:text-3.5xl font-display font-bold text-slate-900 leading-tight">
              {t.atlasTitle}
            </h3>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-2xl font-normal">
              {t.atlasDesc}
            </p>
            
            <div className="pt-2">
              <button
                onClick={() => setIsAtlasOpen(true)}
                className="bg-black hover:bg-slate-800 text-white font-bold text-xs px-6 py-4 rounded-full shadow-md transition flex items-center gap-1.5 group"
              >
                <span>{t.exploreAtlas}</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Curated Literature Section */}
        <div className="border-t border-slate-200/60 pt-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="space-y-1">
              <h3 className="text-xl md:text-2xl font-display font-bold text-slate-900 tracking-tight">
                {t.curatedBriefingsTitle}
              </h3>
              <p className="text-slate-500 text-xs md:text-sm font-normal">
                {t.curatedBriefingsDesc}
              </p>
            </div>

            {/* Reading List Filters */}
            <div className="flex gap-1.5 bg-slate-100 p-1 rounded-full w-max text-xs font-semibold self-start md:self-center border border-slate-200/40">
              <button
                onClick={() => setReadingListFilter('all')}
                className={`px-4 py-2 rounded-full transition duration-155 ${readingListFilter === 'all' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {t.allFilter} ({readingList.length})
              </button>
              <button
                onClick={() => setReadingListFilter('bookmarked')}
                className={`px-4 py-2 rounded-full transition duration-155 flex items-center gap-1.5 ${readingListFilter === 'bookmarked' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {t.bookmarkedFilter} ({bookmarkedIds.length})
              </button>
              <button
                onClick={() => setReadingListFilter('completed')}
                className={`px-4 py-2 rounded-full transition duration-155 flex items-center gap-1.5 ${readingListFilter === 'completed' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {t.readFilter} ({completedIds.length})
              </button>
            </div>
          </div>

          {/* Reading List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {readingList.filter(item => {
              if (readingListFilter === 'bookmarked') return bookmarkedIds.includes(item.id);
              if (readingListFilter === 'completed') return completedIds.includes(item.id);
              return true;
            }).map((item) => {
              const isBookmarked = bookmarkedIds.includes(item.id);
              const isCompleted = completedIds.includes(item.id);
              
              return (
                <div 
                  key={item.id}
                  className={`bg-white rounded-3xl p-6 border transition-all duration-200 flex flex-col justify-between ${
                    isCompleted 
                      ? 'border-emerald-100 bg-emerald-50/10 opacity-90' 
                      : 'border-slate-100 hover:border-slate-200 hover:shadow-lg'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        item.category === 'Regulatory Deep-Dive' ? 'bg-purple-50 text-purple-600' :
                        item.category === 'Technical Briefing' ? 'bg-indigo-50 text-indigo-600' :
                        item.category === 'Academic Paper' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        {t.readingListCategories[item.category as keyof typeof t.readingListCategories] || item.category}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleBookmark(item.id)}
                          className={`p-1.5 rounded-full transition-colors ${
                            isBookmarked 
                              ? 'bg-amber-50 text-amber-500 hover:bg-amber-100' 
                              : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                          }`}
                          title={isBookmarked ? t.removeBookmarkLabel : t.addBookmarkLabel}
                        >
                          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                        </button>
                        <button
                          onClick={() => toggleCompleted(item.id)}
                          className={`p-1.5 rounded-full transition-colors ${
                            isCompleted 
                              ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' 
                              : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                          }`}
                          title={isCompleted ? t.markUnreadLabel : t.markReadLabel}
                        >
                          <Check className={`w-4 h-4 ${isCompleted ? 'stroke-[3px]' : ''}`} />
                        </button>
                      </div>
                    </div>

                    <h4 
                      onClick={() => setSelectedReadItem(item)}
                      className={`font-display font-bold text-lg text-slate-900 leading-snug cursor-pointer hover:text-[#354CE1] transition-colors ${
                        isCompleted ? 'line-through text-slate-500' : ''
                      }`}
                    >
                      {item.title}
                    </h4>
                    
                    <p className="text-slate-500 text-xs md:text-sm font-normal line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-slate-400 font-medium">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-slate-300 block uppercase font-bold">{t.sourceLabel}</span>
                      <span>{item.source} {t.bulletSeparator} {item.publicationYear}</span>
                    </div>
                    
                    <button
                      onClick={() => setSelectedReadItem(item)}
                      className="text-[#354CE1] hover:text-[#2539BE] font-bold text-xs flex items-center gap-1 group shrink-0"
                    >
                      <span>{t.readBriefing}</span>
                      <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
            
            {/* Empty State */}
            {readingList.filter(item => {
              if (readingListFilter === 'bookmarked') return bookmarkedIds.includes(item.id);
              if (readingListFilter === 'completed') return completedIds.includes(item.id);
              return true;
            }).length === 0 && (
              <div className="col-span-1 md:col-span-2 text-center py-16 bg-slate-50 rounded-2xl border border-slate-150 p-8 max-w-md mx-auto">
                <Bookmark className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="font-bold text-slate-900 text-sm">{t.noItemsFound}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {readingListFilter === 'bookmarked' 
                    ? t.bookmarkTip 
                    : t.completedTip}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CURATED BRIEFING DETAILS POPUP MODAL */}
      <AnimatePresence>
        {selectedReadItem && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedReadItem(null)}
              className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs" 
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl relative overflow-hidden z-10 text-left"
            >
              <div className="bg-[#FAFBFD] border-b border-slate-100 p-6 md:p-8 flex items-start justify-between relative">
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-[#354CE1] uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded">
                    {t.readingListCategories[selectedReadItem.category as keyof typeof t.readingListCategories] || selectedReadItem.category}
                  </span>
                  <h3 className="text-lg md:text-xl font-display font-semibold text-slate-900 pr-6 leading-snug">
                    {selectedReadItem.title}
                  </h3>
                </div>
                
                <button
                  onClick={() => setSelectedReadItem(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body Info */}
              <div className="p-6 md:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-slate-500 text-xs border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block">{t.sourceLabel}</span>
                    <span className="font-semibold text-slate-800">{selectedReadItem.source}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block">{t.yearLengthLabel}</span>
                    <span className="font-semibold text-slate-800">{selectedReadItem.publicationYear} {t.bulletSeparator} {selectedReadItem.readTime} {t.readingSuffix}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.executiveSummary}</h4>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-normal bg-indigo-50/20 p-4 rounded-2xl border border-indigo-100/30">
                    {selectedReadItem.summary}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.keyInsights}</h4>
                  <ul className="space-y-2.5">
                    {selectedReadItem.keyInsights.map((insight, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-600">
                        <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Footer actions */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleBookmark(selectedReadItem.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition ${
                      bookmarkedIds.includes(selectedReadItem.id)
                        ? 'bg-amber-50 border-amber-200 text-amber-600'
                        : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${bookmarkedIds.includes(selectedReadItem.id) ? 'fill-current' : ''}`} />
                    <span>{bookmarkedIds.includes(selectedReadItem.id) ? t.bookmarkedFilter : t.bookmarkLabel}</span>
                  </button>

                  <button
                    onClick={() => toggleCompleted(selectedReadItem.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition ${
                      completedIds.includes(selectedReadItem.id)
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                        : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3px]" />
                    <span>{completedIds.includes(selectedReadItem.id) ? t.markedReadLabel : t.markReadLabel}</span>
                  </button>
                </div>
                
                <button
                  onClick={() => setSelectedReadItem(null)}
                  className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-md transition text-center"
                >
                  {t.closeBriefing}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PUBLICATION DETAILS DETAILED POPUP MODAL */}
      <AnimatePresence>
        {selectedPub && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPub(null)}
              className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs" 
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl relative overflow-hidden z-10 text-left"
            >
              <div className="bg-[#FAFBFD] border-b border-slate-100 p-6 md:p-8 flex items-start justify-between relative">
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-[#354CE1] uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded">
                    {t.categories[selectedPub.category as keyof typeof t.categories] || selectedPub.category}
                  </span>
                  <h3 className="text-lg md:text-xl font-display font-semibold text-slate-900 pr-6 leading-snug">
                    {selectedPub.title}
                  </h3>
                </div>
                
                <button
                  onClick={() => setSelectedPub(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body Info */}
              <div className="p-6 md:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-slate-500 text-xs border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block">{t.publishedLabel}</span>
                    <span className="font-semibold text-slate-800">{selectedPub.date}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block">{t.lengthLabel}</span>
                    <span className="font-semibold text-slate-800">{selectedPub.pages} {t.pagesSuffix} {t.bulletSeparator} {selectedPub.readTime}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.authorsLabel}</h4>
                  <p className="text-xs md:text-sm font-medium text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {selectedPub.authors}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.abstractLabel}</h4>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-normal bg-indigo-50/20 p-4 rounded-2xl border border-indigo-100/30">
                    {selectedPub.abstract}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.keyTakeaways}</h4>
                  <ul className="space-y-2.5">
                    {selectedPub.keyTakeaways.map((takeaway, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-600">
                        <Check className="w-4 h-4 text-[#354CE1] mt-0.5 shrink-0" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Footer download */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-slate-400 text-[10px] font-normal flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-[#354CE1]" />
                  <span>{t.licenseNotice}</span>
                </span>
                
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      alert(t.downloadAlert.replace('{title}', selectedPub.title));
                    }}
                    className="w-full sm:w-auto bg-[#354CE1] hover:bg-[#2539BE] text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-md transition flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{t.downloadPdf}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ATLAS AGE REGULATION INTERACTIVE MAP / DATABASE MODAL */}
      <AnimatePresence>
        {isAtlasOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsAtlasOpen(false);
                setSelectedAtlasLaw(null);
              }}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs" 
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-[2rem] shadow-2xl border border-slate-200 w-full max-w-4xl relative overflow-hidden z-10 text-left flex flex-col md:flex-row h-[85vh] max-h-[800px]"
            >
              {/* Left sidebar: Filter, search, lists (60% width) */}
              <div className="w-full md:w-3/5 border-r border-slate-150 flex flex-col h-full bg-[#FAFBFD]">
                {/* Header info */}
                <div className="p-6 border-b border-slate-150 flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-1.5">
                      <Globe className="w-5 h-5 text-emerald-600" />
                      <span>{t.atlasDatabaseTitle}</span>
                    </h3>
                    <p className="text-slate-400 text-[11px] font-normal">{t.atlasDatabaseDesc}</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setIsAtlasOpen(false);
                      setSelectedAtlasLaw(null);
                    }}
                    className="md:hidden w-8 h-8 rounded-full bg-slate-150 flex items-center justify-center text-slate-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Filter and Search controls */}
                <div className="p-4 bg-slate-50 border-b border-slate-150 space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input 
                      type="text"
                      placeholder={t.searchCountryLaw}
                      value={atlasSearch}
                      onChange={(e) => setAtlasSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition bg-white"
                    />
                  </div>

                  {/* Region selector */}
                  <div className="flex gap-1">
                    {(['All', 'Europe', 'North America', 'Asia Pacific'] as const).map((region) => (
                      <button
                        key={region}
                        onClick={() => setAtlasFilterRegion(region)}
                        className={`px-2.5 py-1 rounded text-[10px] font-extrabold transition ${
                          atlasFilterRegion === region
                            ? 'bg-emerald-600 text-white shadow-2xs'
                            : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        }`}
                      >
                        {region === 'All' ? t.allRegions : getLocalizedRegionName(region)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* List of laws scrollable */}
                <div className="flex-1 overflow-y-auto divide-y divide-slate-150">
                  {filteredAtlasRegs.length > 0 ? (
                    filteredAtlasRegs.map((law, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedAtlasLaw(law)}
                        className={`p-4 cursor-pointer hover:bg-white transition text-left flex flex-col gap-1 ${
                          selectedAtlasLaw?.country === law.country ? 'bg-white border-l-4 border-emerald-500 shadow-3xs' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-800 text-xs flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            {law.country}
                          </span>
                          <span className={`text-[8.5px] font-extrabold px-1.5 py-0.5 rounded-full ${
                            law.status === 'In Effect' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                            law.status === 'Pending 2026' ? 'bg-amber-50 text-amber-700 border border-amber-100' : 'bg-blue-50 text-blue-700 border border-blue-100'
                          }`}>
                            {t.status[law.status as keyof typeof t.status] || law.status}
                          </span>
                        </div>
                        
                        <h4 className="font-bold text-slate-900 text-xs line-clamp-1">{law.lawName}</h4>
                        <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1">
                          <span>{t.targetAgeLabel}: &lt;{law.minAge}</span>
                          <span className="flex items-center gap-0.5 font-semibold text-slate-500">
                            <span>{t.strictnessLabel}: </span>
                            <span className={law.strictness === 'High' ? 'text-rose-500' : 'text-amber-500'}>
                              {t.strictness[law.strictness as keyof typeof t.strictness] || law.strictness}
                            </span>
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-12 text-center text-slate-400">
                      <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50 text-slate-400" />
                      <p className="text-xs font-bold">{t.noAtlasRegsMatch}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right side: Selected details view (40% width) */}
              <div className="w-full md:w-2/5 flex flex-col h-full bg-white relative">
                <button
                  onClick={() => {
                    setIsAtlasOpen(false);
                    setSelectedAtlasLaw(null);
                  }}
                  className="hidden md:flex absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-150 items-center justify-center text-slate-500 transition"
                >
                  <X className="w-4 h-4" />
                </button>

                {selectedAtlasLaw ? (
                  <div className="p-6 md:p-8 flex flex-col justify-between h-full overflow-y-auto">
                    <div className="space-y-6 text-left">
                      <div className="space-y-1">
                        <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-widest block">{t.regionJurisdiction}</span>
                        <h4 className="text-lg font-bold text-slate-900">{selectedAtlasLaw.country}</h4>
                        <p className="text-slate-400 text-xs font-medium">{getLocalizedRegionName(selectedAtlasLaw.region)}</p>
                      </div>

                      <div className="space-y-1 border-t border-slate-100 pt-4">
                        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">{t.actLegislativeName}</span>
                        <p className="font-bold text-slate-800 text-xs md:text-sm leading-snug">{selectedAtlasLaw.lawName}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 border-y border-slate-100 py-4">
                        <div>
                          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">{t.minSafeAge}</span>
                          <p className="font-bold text-slate-800 text-sm">{selectedAtlasLaw.minAge} {t.yearsOld}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">{t.statusLabel}</span>
                          <p className="font-bold text-slate-800 text-xs flex items-center gap-1 pt-0.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${selectedAtlasLaw.status === 'In Effect' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                            {t.status[selectedAtlasLaw.status as keyof typeof t.status] || selectedAtlasLaw.status}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">{t.methodsAllowed}</span>
                        <div className="flex flex-wrap gap-1">
                          {selectedAtlasLaw.methodsAllowed.map((method, mIdx) => (
                            <span key={mIdx} className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2.5 py-1 rounded">
                              {method}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">{t.operationalImpact}</span>
                        <p className="text-slate-600 text-xs leading-relaxed font-normal bg-emerald-50/20 p-4 rounded-xl border border-emerald-100/30">
                          {selectedAtlasLaw.details}
                        </p>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100">
                      <button
                        onClick={onOpenSandbox}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-3 rounded-full shadow-md transition flex items-center justify-center gap-1.5"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>{t.buildAgeGate}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-4 text-slate-400">
                    <Globe className="w-12 h-12 stroke-1 text-slate-300 animate-pulse" />
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-slate-800">{t.noRegionSelected}</p>
                      <p className="text-xs max-w-[240px] leading-relaxed mx-auto text-slate-400">{t.noRegionSelectedDesc}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
