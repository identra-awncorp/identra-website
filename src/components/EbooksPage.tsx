/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, BookOpen, Clock, ArrowRight, X, Check, Download, 
  Mail, Building2, User, ChevronLeft, ChevronRight, Play, 
  Book, Info, HelpCircle, Shield, FileText, CheckCircle2, 
  Lock, AlertTriangle, Fingerprint, Eye, Globe, Sparkles, 
  Network, Split, Award, HelpCircle as HelpIcon, BarChart3, ListChecks,
  ChevronDown, ChevronUp
} from 'lucide-react';
import { EBOOKS_PAGE_TRANSLATIONS } from '../translations/EbooksPageTranslations';
import { useLanguage } from '../context/LanguageContext';
import { SENTINEL_EBOOK_DETAIL_ID, type EbookDetailId } from '../types/routes';

// Interfaces
type EbookId = keyof typeof EBOOKS_PAGE_TRANSLATIONS.en.ebooks;
type TopicId = keyof typeof EBOOKS_PAGE_TRANSLATIONS.en.topicLabels;
type IndustryId = keyof typeof EBOOKS_PAGE_TRANSLATIONS.en.industryLabels;

interface Ebook {
  id: EbookId;
  topics: TopicId[];
  industries: IndustryId[];
  gradient: string;
  illustration: 'shield' | 'chart' | 'users' | 'fingerprint' | 'globe' | 'face' | 'link' | 'lock' | 'document' | 'alert';
}

interface EbooksPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onOpenEbookDetail: (id: EbookDetailId) => void;
}

// 40 High-Fidelity Ebooks and Reports
const EBOOKS_DATA: Ebook[] = [
  {
    id: 'ebook-sentinel',
    topics: ['fraud', 'identity'],
    industries: ['all'],
    gradient: 'from-[#354CE1] to-[#1E3A8A]',
    illustration: 'fingerprint'
  },
  {
    id: 'ebook-1',
    topics: ['fraud', 'identity'],
    industries: ['all'],
    gradient: 'from-[#0E1B40] to-[#1F3369]',
    illustration: 'alert'
  },
  {
    id: 'ebook-2',
    topics: ['fraud', 'identity', 'privacy'],
    industries: ['all'],
    gradient: 'from-[#111827] to-[#1F2937]',
    illustration: 'face'
  },
  {
    id: 'ebook-3',
    topics: ['compliance', 'identity'],
    industries: ['all'],
    gradient: 'from-[#312E81] to-[#4338CA]',
    illustration: 'users'
  },
  {
    id: 'ebook-4',
    topics: ['age-assurance', 'compliance'],
    industries: ['adult-entertainment', 'dating'],
    gradient: 'from-[#065F46] to-[#047857]',
    illustration: 'document'
  },
  {
    id: 'ebook-5',
    topics: ['fraud'],
    industries: ['cryptocurrency', 'digital-health'],
    gradient: 'from-[#354CE1] to-[#1E293B]',
    illustration: 'link'
  },
  {
    id: 'ebook-6',
    topics: ['age-assurance'],
    industries: ['dating', 'adult-entertainment'],
    gradient: 'from-[#7C2D12] to-[#9A3412]',
    illustration: 'shield'
  },
  {
    id: 'ebook-7',
    topics: ['identity', 'compliance'],
    industries: ['all'],
    gradient: 'from-[#4C1D95] to-[#5B21B6]',
    illustration: 'lock'
  },
  {
    id: 'ebook-8',
    topics: ['fraud', 'identity'],
    industries: ['cryptocurrency', 'digital-health'],
    gradient: 'from-[#9D174D] to-[#BE185D]',
    illustration: 'fingerprint'
  },
  {
    id: 'ebook-9',
    topics: ['identity', 'compliance'],
    industries: ['all'],
    gradient: 'from-[#065F46] to-[#047857]',
    illustration: 'shield'
  },
  {
    id: 'ebook-10',
    topics: ['fraud', 'compliance', 'international'],
    industries: ['cryptocurrency'],
    gradient: 'from-[#0F172A] to-[#334155]',
    illustration: 'chart'
  },
  {
    id: 'ebook-11',
    topics: ['compliance', 'international'],
    industries: ['cryptocurrency'],
    gradient: 'from-[#581C87] to-[#6B21A8]',
    illustration: 'globe'
  },
  {
    id: 'ebook-12',
    topics: ['identity'],
    industries: ['all'],
    gradient: 'from-[#111827] to-[#374151]',
    illustration: 'chart'
  },
  {
    id: 'ebook-13',
    topics: ['identity'],
    industries: ['all'],
    gradient: 'from-[#354CE1] to-[#1E3A8A]',
    illustration: 'chart'
  },
  {
    id: 'ebook-14',
    topics: ['compliance'],
    industries: ['all'],
    gradient: 'from-[#1F2937] to-[#111827]',
    illustration: 'link'
  },
  {
    id: 'ebook-15',
    topics: ['fraud'],
    industries: ['all'],
    gradient: 'from-[#0F1B40] to-[#1F3369]',
    illustration: 'shield'
  },
  {
    id: 'ebook-16',
    topics: ['compliance', 'fraud'],
    industries: ['all'],
    gradient: 'from-[#7C2D12] to-[#9A3412]',
    illustration: 'alert'
  },
  {
    id: 'ebook-17',
    topics: ['compliance', 'privacy'],
    industries: ['all'],
    gradient: 'from-[#1E3A8A] to-[#354CE1]',
    illustration: 'document'
  },
  {
    id: 'ebook-18',
    topics: ['fraud', 'artificial-intelligence'],
    industries: ['all'],
    gradient: 'from-[#1E293B] to-[#334155]',
    illustration: 'face'
  },
  {
    id: 'ebook-19',
    topics: ['fraud', 'compliance'],
    industries: ['all'],
    gradient: 'from-[#111827] to-[#1F2937]',
    illustration: 'shield'
  },
  {
    id: 'ebook-20',
    topics: ['compliance'],
    industries: ['all'],
    gradient: 'from-[#312E81] to-[#4338CA]',
    illustration: 'document'
  },
  {
    id: 'ebook-21',
    topics: ['fraud'],
    industries: ['all'],
    gradient: 'from-[#5B21B6] to-[#7C3AED]',
    illustration: 'document'
  },
  {
    id: 'ebook-22',
    topics: ['fraud'],
    industries: ['all'],
    gradient: 'from-[#0B132B] to-[#1C2541]',
    illustration: 'alert'
  },
  {
    id: 'ebook-23',
    topics: ['fraud'],
    industries: ['all'],
    gradient: 'from-[#7C2D12] to-[#B45309]',
    illustration: 'alert'
  },
  {
    id: 'ebook-24',
    topics: ['compliance'],
    industries: ['all'],
    gradient: 'from-[#0F172A] to-[#1E293B]',
    illustration: 'document'
  },
  {
    id: 'ebook-25',
    topics: ['compliance'],
    industries: ['all'],
    gradient: 'from-[#312E81] to-[#1E1B4B]',
    illustration: 'shield'
  },
  {
    id: 'ebook-26',
    topics: ['identity'],
    industries: ['all'],
    gradient: 'from-[#047857] to-[#065F46]',
    illustration: 'document'
  },
  {
    id: 'ebook-27',
    topics: ['fraud', 'artificial-intelligence'],
    industries: ['all'],
    gradient: 'from-[#1E293B] to-[#0F172A]',
    illustration: 'fingerprint'
  },
  {
    id: 'ebook-28',
    topics: ['compliance'],
    industries: ['all'],
    gradient: 'from-[#7C2D12] to-[#9A3412]',
    illustration: 'shield'
  },
  {
    id: 'ebook-29',
    topics: ['fraud', 'identity'],
    industries: ['all'],
    gradient: 'from-[#065F46] to-[#047857]',
    illustration: 'shield'
  },
  {
    id: 'ebook-30',
    topics: ['fraud', 'artificial-intelligence'],
    industries: ['all'],
    gradient: 'from-[#111827] to-[#1F2937]',
    illustration: 'face'
  },
  {
    id: 'ebook-31',
    topics: ['identity', 'compliance'],
    industries: ['digital-health'],
    gradient: 'from-[#0E7490] to-[#0891B2]',
    illustration: 'users'
  },
  {
    id: 'ebook-32',
    topics: ['age-assurance'],
    industries: ['dating', 'adult-entertainment'],
    gradient: 'from-[#4338CA] to-[#3730A3]',
    illustration: 'shield'
  },
  {
    id: 'ebook-33',
    topics: ['fraud', 'artificial-intelligence'],
    industries: ['all'],
    gradient: 'from-[#1F2937] to-[#111827]',
    illustration: 'fingerprint'
  },
  {
    id: 'ebook-34',
    topics: ['identity', 'international'],
    industries: ['all'],
    gradient: 'from-[#0D9488] to-[#0F766E]',
    illustration: 'globe'
  },
  {
    id: 'ebook-35',
    topics: ['identity'],
    industries: ['all'],
    gradient: 'from-[#354CE1] to-[#1E3A8A]',
    illustration: 'shield'
  },
  {
    id: 'ebook-36',
    topics: ['compliance'],
    industries: ['all'],
    gradient: 'from-[#B45309] to-[#92400E]',
    illustration: 'shield'
  },
  {
    id: 'ebook-37',
    topics: ['identity', 'fraud'],
    industries: ['all'],
    gradient: 'from-[#BE185D] to-[#9D174D]',
    illustration: 'chart'
  },
  {
    id: 'ebook-38',
    topics: ['fraud'],
    industries: ['all'],
    gradient: 'from-[#047857] to-[#065F46]',
    illustration: 'shield'
  },
  {
    id: 'ebook-39',
    topics: ['fraud'],
    industries: ['cryptocurrency'],
    gradient: 'from-[#0F172A] to-[#1E293B]',
    illustration: 'shield'
  },
  {
    id: 'ebook-40',
    topics: ['fraud', 'identity'],
    industries: ['all'],
    gradient: 'from-[#1E3A8A] to-[#354CE1]',
    illustration: 'shield'
  }
];

// Helper to render covers elegantly
function CoverIllustration({ type }: { type: Ebook['illustration'] }) {
  switch (type) {
    case 'shield':
      return <Shield className="w-12 h-12 text-white/90 drop-shadow-md" />;
    case 'chart':
      return <BarChart3 className="w-12 h-12 text-white/90 drop-shadow-md" />;
    case 'users':
      return <User className="w-12 h-12 text-white/90 drop-shadow-md" />;
    case 'fingerprint':
      return <Fingerprint className="w-12 h-12 text-white/90 drop-shadow-md" />;
    case 'globe':
      return <Globe className="w-12 h-12 text-white/90 drop-shadow-md" />;
    case 'face':
      return <Eye className="w-12 h-12 text-white/90 drop-shadow-md" />;
    case 'link':
      return <Network className="w-12 h-12 text-white/90 drop-shadow-md" />;
    case 'lock':
      return <Lock className="w-12 h-12 text-white/90 drop-shadow-md" />;
    case 'document':
      return <FileText className="w-12 h-12 text-white/90 drop-shadow-md" />;
    case 'alert':
      return <AlertTriangle className="w-12 h-12 text-white/90 drop-shadow-md" />;
    default:
      return <BookOpen className="w-12 h-12 text-white/90 drop-shadow-md" />;
  }
}

export default function EbooksPage({ onOpenSandbox, onBackToLanding, onOpenEbookDetail }: EbooksPageProps) {

  const { language } = useLanguage();

  const t = EBOOKS_PAGE_TRANSLATIONS[language];
  const ebookCopy = (ebook: Ebook) => t.ebooks[ebook.id];

  const [selectedTopic, setSelectedTopic] = useState<TopicId>('all');
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryId>('all');
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeEbookModal, setActiveEbookModal] = useState<Ebook | null>(null);
  const [showAllTopics, setShowAllTopics] = useState(false);
  const [showAllIndustries, setShowAllIndustries] = useState(false);

  // Form inside download modal
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // PDF Reader State
  const [pdfPage, setPdfPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [checkedRules, setCheckedRules] = useState<Record<string, boolean>>({});
  const catalogTopRef = useRef<HTMLDivElement | null>(null);

  const scrollCatalogIntoView = React.useCallback((behavior: ScrollBehavior = 'auto') => {
    catalogTopRef.current?.scrollIntoView({ behavior, block: 'start' });
  }, []);

  useEffect(() => {
    const nextSearchQuery = searchInput.trim();
    const debounceId = window.setTimeout(() => {
      if (nextSearchQuery === searchQuery) return;

      scrollCatalogIntoView('auto');
      window.requestAnimationFrame(() => {
        setSearchQuery(nextSearchQuery);
      });
    }, 250);

    return () => window.clearTimeout(debounceId);
  }, [scrollCatalogIntoView, searchInput, searchQuery]);

  const selectTopic = (topicId: TopicId) => {
    scrollCatalogIntoView('auto');
    setSelectedTopic((currentTopic) => currentTopic === topicId ? 'all' : topicId);
  };

  const selectIndustry = (industryId: IndustryId) => {
    scrollCatalogIntoView('auto');
    setSelectedIndustry((currentIndustry) => currentIndustry === industryId ? 'all' : industryId);
  };

  const clearAllFilters = () => {
    scrollCatalogIntoView('auto');
    setSearchInput('');
    setSearchQuery('');
    setSelectedTopic('all');
    setSelectedIndustry('all');
  };

  // Reset Form states
  const openEbookModal = (ebook: Ebook) => {
    if (ebook.id === 'ebook-sentinel') {
      onOpenEbookDetail(SENTINEL_EBOOK_DETAIL_ID);
      return;
    }
    setActiveEbookModal(ebook);
    setEmail('');
    setFirstName('');
    setLastName('');
    setCompanyName('');
    setFormSubmitted(false);
    setIsSubmitting(false);
    setPdfPage(1);
    setCheckedRules({});
  };

  const handleDownloadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !firstName || !lastName || !companyName) return;

    setIsSubmitting(true);
    // Simulate API submit latency
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 1200);
  };

  // Filter lists
  const topicsList: { id: TopicId }[] = [
    { id: 'age-assurance',},
    { id: 'announcements',},
    { id: 'compliance',},
    { id: 'culture',},
    { id: 'fraud',},
    { id: 'identity',},
    { id: 'all',},
    { id: 'international',},
    { id: 'privacy',},
    { id: 'security',},
  ];

  const industriesList: { id: IndustryId }[] = [
    { id: 'adult-entertainment',},
    { id: 'cryptocurrency',},
    { id: 'dating',},
    { id: 'digital-health',},
    { id: 'education',},
    { id: 'finance-fintech',},
    { id: 'all',},
    { id: 'artificial-intelligence',},
    { id: 'gaming',},
    { id: 'government',},
    { id: 'healthcare',},
    { id: 'legal',},
    { id: 'marketplaces',},
    { id: 'real-estate',},
    { id: 'retail-ecommerce',},
  ];

  // Filtered Ebooks
  const filteredEbooks = useMemo(() => {
    return EBOOKS_DATA.filter((ebook) => {
      const matchesTopic = selectedTopic === 'all' || ebook.topics.includes(selectedTopic);
      const matchesIndustry = selectedIndustry === 'all' || ebook.industries.includes(selectedIndustry);
      const copy = ebookCopy(ebook);
      const localizedTitle = copy.title.toLowerCase();
      const localizedDescription = copy.description.toLowerCase();
      const localizedType = copy.type.toLowerCase();
      const normalizedSearch = searchQuery.toLowerCase();
      const matchesSearch = 
        localizedTitle.includes(normalizedSearch) ||
        localizedDescription.includes(normalizedSearch) ||
        localizedType.includes(normalizedSearch);
      
      return matchesTopic && matchesIndustry && matchesSearch;
    });
  }, [selectedTopic, selectedIndustry, searchQuery, t]);

  const visibleTopics = showAllTopics ? topicsList : topicsList.slice(0, 6);
  const visibleIndustries = showAllIndustries ? industriesList : industriesList.slice(0, 6);
  const resultSetKey = `${selectedTopic}-${selectedIndustry}-${searchQuery}`;

  return (
    <div className="bg-[#FAFBFD] min-h-screen pb-16">
      {/* 1. Header / Hero section - Featured ebooks */}
      <div className="w-full bg-gradient-to-tr from-[#354CE1] via-[#5F3CF3] to-[#00D4B2] text-white pt-12 pb-20 relative overflow-hidden">
        {/* Subtle decorative mesh background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)]" />
        <div className="absolute top-1/4 left-1/10 w-48 h-48 bg-yellow-400/25 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/10 w-72 h-72 bg-[#00E5FF]/20 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Indicator */}
          <div className="flex items-center gap-2 mb-8 text-yellow-300 font-bold text-xs tracking-wider uppercase bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full w-max border border-white/25 shadow-sm">
            <Book className="w-4 h-4 text-yellow-300" />
            <span>{t.copy.featuredEbooks}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left featured large card: Gartner Quadrant */}
            <div 
              onClick={() => openEbookModal(EBOOKS_DATA[12])} // Gartner Ebook is index 12
              className="lg:col-span-7 bg-[#10193E] hover:bg-[#152153] border border-[#1E2E72] rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 cursor-pointer group transition-all duration-300 shadow-2xl relative overflow-hidden"
            >
              {/* Outer light glow */}
              <div className="absolute -inset-px bg-gradient-to-tr from-transparent via-[#354CE1]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
              
              {/* Mini Quadrant Mockup (Left portion of large card) */}
              <div className="w-full md:w-[260px] shrink-0 bg-gradient-to-b from-[#182559] to-[#0C1333] border border-[#2B3D8A] rounded-2xl p-4 flex flex-col justify-between aspect-[4/3] md:aspect-auto">
                <div>
                  <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#2B3D8A]/50">
                    <span className="text-[7px] font-bold text-slate-400 tracking-wider uppercase">{t.copy.figure1MagicQuadrant}</span>
                    <span className="text-[7px] font-bold text-[#4F6CFF] tracking-wider uppercase">2025</span>
                  </div>
                  
                  {/* Scatter Plot Coordinates */}
                  <div className="relative aspect-[4/3] w-full border-l border-b border-[#3E52A3] mt-4 flex items-center justify-center">
                    {/* Quadrant dividing lines */}
                    <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-[#2B3D8A]/30" />
                    <div className="absolute inset-y-0 left-1/2 border-l border-dashed border-[#2B3D8A]/30" />
                    
                    {/* Quadrant Titles */}
                    <span className="absolute top-1 left-1 text-[5px] text-slate-500 font-bold tracking-wider uppercase uppercase">{t.copy.challengers}</span>
                    <span className="absolute top-1 right-1 text-[5px] text-[#4F6CFF] font-extrabold tracking-wider uppercase uppercase">{t.copy.leaders}</span>
                    <span className="absolute bottom-1 left-1 text-[5px] text-slate-500 font-bold tracking-wider uppercase uppercase">{t.copy.nichePlayers}</span>
                    <span className="absolute bottom-1 right-1 text-[5px] text-slate-500 font-bold tracking-wider uppercase uppercase">{t.copy.visionaries}</span>
                    
                    {/* Other players - Soft grey dots */}
                    <div className="absolute top-[30%] left-[25%] w-1.5 h-1.5 rounded-full bg-slate-600" />
                    <div className="absolute top-[40%] left-[45%] w-1.5 h-1.5 rounded-full bg-slate-600" />
                    <div className="absolute bottom-[25%] left-[30%] w-1.5 h-1.5 rounded-full bg-slate-600" />
                    <div className="absolute bottom-[35%] right-[25%] w-1.5 h-1.5 rounded-full bg-slate-600" />
                    
                    {/* Identra Dot (High in Leader quadrant) */}
                    <motion.div 
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ repeat: Infinity, duration: 4 }}
                      className="absolute top-[18%] right-[15%] flex flex-col items-center"
                    >
                      <div className="w-3 h-3 rounded-full bg-[#354CE1] border-2 border-white shadow-lg shadow-[#354CE1]/50 relative">
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[6px] font-bold text-white bg-slate-900 px-1 py-0.5 rounded-xs leading-none">Identra</span>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[7px] text-slate-400 mt-2">
                  <span>{t.copy.completenessOfVision}</span>
                  <span className="rotate-90 origin-bottom-right translate-y-[-10px] -translate-x-[4px]">{t.copy.abilityToExecute}</span>
                </div>
              </div>

              {/* Text content of large card */}
              <div className="flex flex-col justify-between flex-1 py-1">
                <div>
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="text-[10px] bg-[#1E2E72] text-[#4F6CFF] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">{t.copy.report}</span>
                    <span className="text-[10px] text-slate-400">• {t.copy.text45MinRead}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold font-sans tracking-tight text-white mb-3 group-hover:text-[#4F6CFF] transition leading-snug">{t.copy.identraIsNamedALeaderInThe2025}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal mb-6">{t.copy.inTheNewlyReleasedReportGartnerEvaluatesIdentity}</p>
                </div>
                
                <div className="flex items-center gap-2 text-xs font-bold text-[#4F6CFF] group-hover:text-white transition mt-auto">
                  <span>{t.copy.downloadTheReport}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Right featured sidebar: 3 small items */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              {[EBOOKS_DATA[1], EBOOKS_DATA[0], EBOOKS_DATA[21]].map((item, index) => (
                <div 
                  key={index}
                  onClick={() => openEbookModal(item)}
                  className="bg-[#0B1230]/60 hover:bg-[#101B42]/80 border border-[#1E2E72]/50 hover:border-[#2B3D8A] p-5 rounded-2xl cursor-pointer group flex items-center justify-between gap-4 transition-all duration-200"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold tracking-wider uppercase text-slate-400">{ebookCopy(item).type}</span>
                      {ebookCopy(item).duration && (
                        <span className="text-[9px] text-slate-500">• {ebookCopy(item).duration}</span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#4F6CFF] transition line-clamp-1">
                      {ebookCopy(item).title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-1 font-normal leading-relaxed">
                      {ebookCopy(item).description}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#182559] group-hover:bg-[#354CE1] flex items-center justify-center shrink-0 transition">
                    <ArrowRight className="w-3.5 h-3.5 text-[#4F6CFF] group-hover:text-white transition" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Area: Breadcrumbs, Title, Search, Filters & Ebook Grid */}
      <div ref={catalogTopRef} className="max-w-7xl mx-auto px-6 mt-12">
        <div className="sticky top-0 z-30 -mx-6 mb-8 bg-[#FAFBFD]/95 px-6 py-4 backdrop-blur-md border-b border-slate-100/80">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
            <span className="hover:text-[#354CE1] cursor-pointer" onClick={onBackToLanding}>{t.copy.resourceCenter}</span>
            <span>&gt;</span>
            <span className="font-semibold text-slate-600">{t.copy.ebooks}</span>
          </div>

          {/* Header and Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900 tracking-tight">{t.copy.allEbooks}</h1>
            </div>
            
            {/* Custom Search bar */}
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input 
                type="text" 
                placeholder={t.copy.searchEbooks}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-white border border-slate-200 pl-10 pr-4 py-2.5 rounded-full text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#354CE1]/20 focus:border-[#354CE1] transition"
              />
              {searchInput && (
                <button 
                  onClick={() => setSearchInput('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Topics & Industries Sidebar Filters */}
          <div className="lg:col-span-3 space-y-10 lg:sticky lg:top-32 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto lg:overscroll-contain lg:pr-2 lg:pb-8">
            {/* Filter Group: Topics */}
            <div>
              <h3 className="text-[15px] font-semibold text-slate-900 mb-4 font-sans leading-none">{t.copy.topics}</h3>
              <div className="flex flex-col items-start gap-2.5">
                {visibleTopics.map((topic) => {
                  const isSelected = selectedTopic === topic.id;
                  return (
                    <button
                      key={topic.id}
                      onClick={() => selectTopic(topic.id)}
                      className={`px-4.5 py-2 rounded-full text-xs font-semibold text-left transition-all duration-250 select-none cursor-pointer border-none ${
                        isSelected
                          ? 'bg-[#354CE1] text-white hover:bg-[#2539C1]'
                          : 'bg-[#F1F3F5] text-[#0F1E36] hover:bg-slate-200/80'
                      }`}
                    >
                      {t.topicLabels[topic.id]}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setShowAllTopics(!showAllTopics)}
                className="text-xs font-semibold text-[#354CE1] hover:text-[#2539C1] flex items-center gap-1.5 mt-3.5 select-none cursor-pointer border-none bg-transparent p-0 transition-colors"
              >
                {showAllTopics ? (
                  <>
                    <ChevronUp className="w-3.5 h-3.5 text-[#354CE1]" />
                    <span>{t.copy.showLess}</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3.5 h-3.5 text-[#354CE1]" />
                    <span>{t.copy.show4More}</span>
                  </>
                )}
              </button>
            </div>

            {/* Filter Group: Industries */}
            <div>
              <h3 className="text-[15px] font-semibold text-slate-900 mb-4 font-sans leading-none">{t.copy.industries}</h3>
              <div className="flex flex-col items-start gap-2.5">
                {visibleIndustries.map((ind) => {
                  const isSelected = selectedIndustry === ind.id;
                  return (
                    <button
                      key={ind.id}
                      onClick={() => selectIndustry(ind.id)}
                      className={`px-4.5 py-2 rounded-full text-xs font-semibold text-left transition-all duration-250 select-none cursor-pointer border-none ${
                        isSelected
                          ? 'bg-[#354CE1] text-white hover:bg-[#2539C1]'
                          : 'bg-[#F1F3F5] text-[#0F1E36] hover:bg-slate-200/80'
                      }`}
                    >
                      {t.industryLabels[ind.id]}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setShowAllIndustries(!showAllIndustries)}
                className="text-xs font-semibold text-[#354CE1] hover:text-[#2539C1] flex items-center gap-1.5 mt-3.5 select-none cursor-pointer border-none bg-transparent p-0 transition-colors"
              >
                {showAllIndustries ? (
                  <>
                    <ChevronUp className="w-3.5 h-3.5 text-[#354CE1]" />
                    <span>{t.copy.showLess}</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3.5 h-3.5 text-[#354CE1]" />
                    <span>{t.copy.show9More}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Ebooks Grid */}
          <div className="lg:col-span-9 min-h-[70vh]">
            {filteredEbooks.length > 0 ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={resultSetKey}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {filteredEbooks.map((ebook) => (
                    <div
                      key={ebook.id}
                      onClick={() => openEbookModal(ebook)}
                      className="bg-white rounded-2xl border border-slate-100 overflow-hidden cursor-pointer group hover:shadow-xl hover:border-slate-200/60 transition-all duration-300 flex flex-col h-full"
                    >
                      {/* Ebook stylized vector cover */}
                      <div className={`h-40 bg-gradient-to-tr ${ebook.gradient} p-4 flex flex-col justify-between relative overflow-hidden shrink-0`}>
                        {/* Background subtle stripes */}
                        <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent mix-blend-overlay" />
                        
                        {/* Top logo */}
                        <div className="flex items-center gap-1 text-[8px] font-bold tracking-widest text-white/80 uppercase">
                          <div className="w-2.5 h-2.5 bg-white rounded-xs rotate-12 flex items-center justify-center">
                            <span className="text-[5px] text-[#354CE1]">p</span>
                          </div>
                          <span>identra</span>
                        </div>

                        {/* Mid Illustration SVG/Icon */}
                        <div className="my-auto flex items-center justify-center">
                          <CoverIllustration type={ebook.illustration} />
                        </div>

                        {/* Card bottom cover subtitle */}
                        <span className="text-[8px] font-semibold tracking-wider text-white/50 uppercase leading-none truncate">
                          {ebookCopy(ebook).title}
                        </span>
                      </div>

                      {/* Ebook details info */}
                      <div className="p-5 flex flex-col justify-between flex-1">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                              {ebookCopy(ebook).type}
                            </span>
                            {ebookCopy(ebook).duration && (
                              <span className="text-[10px] text-slate-400 flex items-center gap-1 font-normal">
                                <Clock className="w-3 h-3 text-slate-400" />
                                <span>{ebookCopy(ebook).duration}</span>
                              </span>
                            )}
                          </div>
                          
                          <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#354CE1] transition leading-snug line-clamp-2">
                            {ebookCopy(ebook).title}
                          </h3>
                        </div>

                        <p className="text-[11px] text-slate-400 leading-normal line-clamp-2 mt-2">
                          {ebookCopy(ebook).description}
                        </p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center max-w-md mx-auto min-h-[50vh] flex flex-col items-center justify-center">
                <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">{t.copy.noEbooksFound}</h3>
                <p className="text-xs text-slate-400 leading-normal mb-6">{t.copy.weCouldntFindAnyResourcesMatching}{searchQuery}{t.copy.tryClearingYourSearchQueryOrSelectingOther}</p>
                <button 
                  onClick={clearAllFilters}
                  className="px-4 py-2 bg-[#354CE1] text-white hover:bg-[#2539BE] text-xs font-semibold rounded-xl transition"
                >{t.copy.clearAllFilters}</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Interactive Ebook Details Modal & PDF Reader */}
      <AnimatePresence>
        {activeEbookModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveEbookModal(null)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-xs"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Top Bar / Close */}
              <div className="absolute top-4 right-4 z-10">
                <button 
                  onClick={() => setActiveEbookModal(null)}
                  className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {!formSubmitted ? (
                /* STEP 1: Registration Form to download */
                <div className="flex flex-col md:flex-row overflow-y-auto">
                  {/* Left Column: Styled Book Cover */}
                  <div className={`md:w-2/5 bg-gradient-to-tr ${activeEbookModal.gradient} p-8 text-white flex flex-col justify-between min-h-[350px] md:min-h-0 relative`}>
                    <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent mix-blend-overlay" />
                    
                    <div className="flex items-center gap-1.5 text-[9px] font-bold tracking-widest text-white/80 uppercase">
                      <div className="w-3.5 h-3.5 bg-white rounded-xs rotate-12 flex items-center justify-center">
                        <span className="text-[6px] text-[#354CE1]">p</span>
                      </div>
                      <span>identra</span>
                    </div>

                    <div className="my-auto flex flex-col items-center gap-4 text-center">
                      <CoverIllustration type={activeEbookModal.illustration} />
                      <div className="space-y-1.5">
                        <span className="text-[10px] bg-white/10 text-white border border-white/20 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                          {ebookCopy(activeEbookModal).type}
                        </span>
                        <h3 className="text-base font-bold leading-snug max-w-[200px] mx-auto drop-shadow-md">
                          {ebookCopy(activeEbookModal).title}
                        </h3>
                      </div>
                    </div>

                    <div className="text-[9px] text-white/60 tracking-wider font-semibold uppercase truncate">{t.copy.resourceLibraryVol3}</div>
                  </div>

                  {/* Right Column: details & Form */}
                  <div className="md:w-3/5 p-8 md:p-10 space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#354CE1] uppercase tracking-wider">
                        <span>{t.copy.freeAccess}</span>
                        <span className="text-slate-300">•</span>
                        <span>{t.copy.pdfFormat}</span>
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                        {ebookCopy(activeEbookModal).title}
                      </h2>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      {ebookCopy(activeEbookModal).description} {t.copy.fillOutTheQuickRegistrationFormBelowTo}</p>

                    <form onSubmit={handleDownloadSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t.copy.firstName}</label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                              <User className="w-3.5 h-3.5" />
                            </span>
                            <input 
                              type="text" 
                              required
                              placeholder={t.copy.jane}
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-8 pr-3 py-2 text-xs font-semibold focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#354CE1]/10 focus:border-[#354CE1] transition"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t.copy.lastName}</label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                              <User className="w-3.5 h-3.5" />
                            </span>
                            <input 
                              type="text" 
                              required
                              placeholder={t.copy.doe}
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-8 pr-3 py-2 text-xs font-semibold focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#354CE1]/10 focus:border-[#354CE1] transition"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t.copy.businessEmail}</label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Mail className="w-3.5 h-3.5" />
                          </span>
                          <input 
                            type="email" 
                            required
                            placeholder={t.copy.janeDoeCompanyCom}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-8 pr-3 py-2 text-xs font-semibold focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#354CE1]/10 focus:border-[#354CE1] transition"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t.copy.companyName}</label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Building2 className="w-3.5 h-3.5" />
                          </span>
                          <input 
                            type="text" 
                            required
                            placeholder={t.copy.acmeCorp}
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-8 pr-3 py-2 text-xs font-semibold focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#354CE1]/10 focus:border-[#354CE1] transition"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#354CE1] hover:bg-[#2539BE] text-white py-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md mt-6 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>{t.copy.processing}</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            <span>{t.copy.getInstantAccess}</span>
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              ) : (
                /* STEP 2: Custom Interactive Online PDF Reader! */
                <div className="flex flex-col h-[80vh] overflow-hidden">
                  {/* PDF Toolbar */}
                  <div className="bg-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 shrink-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${activeEbookModal.gradient} flex items-center justify-center`}>
                        <Book className="w-4.5 h-4.5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold leading-none line-clamp-1">{ebookCopy(activeEbookModal).title}</h3>
                        <p className="text-[9px] text-slate-400 mt-1 uppercase font-semibold">{t.copy.simulatedSecurePdfViewer}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Zoom Controls */}
                      <div className="hidden sm:flex items-center gap-2 bg-slate-800 rounded-lg px-2.5 py-1 text-xs">
                        <button onClick={() => setZoom(z => Math.max(z - 10, 80))} className="hover:text-white text-slate-400 font-bold px-1 text-[11px]">-</button>
                        <span className="text-[10px] font-mono text-slate-300">{zoom}%</span>
                        <button onClick={() => setZoom(z => Math.min(z + 10, 150))} className="hover:text-white text-slate-400 font-bold px-1 text-[11px]">+</button>
                      </div>

                      {/* PDF Navigation */}
                      <div className="flex items-center gap-2 bg-slate-800 rounded-lg px-2 py-1 text-xs">
                        <button 
                          onClick={() => setPdfPage(p => Math.max(p - 1, 1))}
                          disabled={pdfPage === 1}
                          className="hover:text-[#4F6CFF] text-slate-400 disabled:opacity-30 disabled:hover:text-slate-400 transition cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-[10px] font-mono font-bold text-slate-300">
                          {pdfPage} / 5
                        </span>
                        <button 
                          onClick={() => setPdfPage(p => Math.min(p + 1, 5))}
                          disabled={pdfPage === 5}
                          className="hover:text-[#4F6CFF] text-slate-400 disabled:opacity-30 disabled:hover:text-slate-400 transition cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Download PDF button */}
                      <button 
                        onClick={() => {
                          alert(`${t.copy.success} "${ebookCopy(activeEbookModal).title}" ${t.copy.pdfDownloadedSuccessfully}`);
                        }}
                        className="bg-[#354CE1] hover:bg-[#2539BE] text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition cursor-pointer"
                      >
                        <Download className="w-3 h-3" />
                        <span className="hidden sm:inline">{t.copy.download}</span>
                      </button>
                    </div>
                  </div>

                  {/* PDF Page Stage Container */}
                  <div className="flex-1 overflow-y-auto bg-slate-800 p-6 flex justify-center items-start">
                    <div 
                      style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
                      className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-8 md:p-12 text-slate-800 transition-all duration-300 relative min-h-[450px]"
                    >
                      {/* Mini watermark */}
                      <div className="absolute top-4 right-6 flex items-center gap-1 text-[7px] text-slate-300 tracking-wider font-bold">
                        <span>{t.copy.securedByIdentra}</span>
                      </div>

                      {/* Render PDF Pages dynamically */}
                      {pdfPage === 1 && (
                        /* PAGE 1: COVER PAGE */
                        <div className="h-full flex flex-col justify-between py-12 text-center select-none">
                          <div className="mx-auto w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#354CE1] to-[#4F6CFF] flex items-center justify-center">
                              <Book className="w-4.5 h-4.5 text-white" />
                            </div>
                          </div>

                          <div className="space-y-4 max-w-md mx-auto my-auto mt-12 mb-12">
                            <span className="text-[9px] bg-slate-100 text-[#354CE1] px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-slate-200">
                              {ebookCopy(activeEbookModal).type} {t.copy.edition}</span>
                            <h1 className="text-xl md:text-3xl font-display font-extrabold text-slate-900 tracking-tight leading-tight pt-2">
                              {ebookCopy(activeEbookModal).title}
                            </h1>
                            <div className="h-1 w-16 bg-[#354CE1] mx-auto rounded-full mt-4" />
                          </div>

                          <div className="text-slate-400 space-y-1">
                            <p className="text-[10px] font-bold tracking-wider uppercase">{t.copy.publishedByIdentraTechnologiesInc}</p>
                            <p className="text-[9px] font-mono">Document Hash: 0x8a92f...7e402b • H1 2026</p>
                          </div>
                        </div>
                      )}

                      {pdfPage === 2 && (
                        /* PAGE 2: EXEC SUMMARY */
                        <div className="space-y-6 select-none animate-in fade-in duration-200">
                          <div className="border-b border-slate-100 pb-3">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">{t.copy.chapter01}</span>
                            <h2 className="text-lg font-bold text-slate-900">{t.copy.executiveSummaryKeyFindings}</h2>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                            <div className="space-y-4">
                              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">{t.copy.theEvolvingLandscape}</h3>
                              <p className="text-xs text-slate-600 leading-relaxed font-normal">{t.copy.asRemoteOnboardingAndDigitalFirstInteractionsSolidify}</p>
                              <p className="text-xs text-slate-600 leading-relaxed font-normal">{t.copy.toPreventOnboardingDropOffWhileSafeguardingSystems}</p>
                            </div>

                            {/* Stat block */}
                            <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 space-y-3.5">
                              <h3 className="text-[10px] font-bold text-[#354CE1] uppercase tracking-wider">{t.copy.h12026KeyStatistics}</h3>
                              <div className="space-y-3">
                                <div className="flex justify-between items-center text-xs">
                                  <span className="text-slate-500 font-medium">{t.copy.selfieFraudFrequency}</span>
                                  <span className="font-mono font-bold text-red-600">+18.4% YoY</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                  <span className="text-slate-500 font-medium">{t.copy.deepfakeSpoofsTotal}</span>
                                  <span className="font-mono font-bold text-red-600">34.1% of bypasses</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                  <span className="text-slate-500 font-medium">{t.copy.nfcAcceptanceConversion}</span>
                                  <span className="font-mono font-bold text-emerald-600">+42.6% Lift</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {pdfPage === 3 && (
                        /* PAGE 3: MAIN FINDINGS / DATA TABLES */
                        <div className="space-y-6 select-none animate-in fade-in duration-200">
                          <div className="border-b border-slate-100 pb-3">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">{t.copy.chapter02}</span>
                            <h2 className="text-lg font-bold text-slate-900">{t.copy.multiLayeredSignalsMatrix}</h2>
                          </div>

                          <p className="text-xs text-slate-600 leading-relaxed font-normal">{t.copy.relyingEntirelyOnADocumentImageMatchAllows}</p>

                          {/* Mock Data Table */}
                          <div className="border border-slate-150 rounded-xl overflow-hidden mt-4">
                            <table className="w-full text-left border-collapse text-xs">
                              <thead>
                                <tr className="bg-slate-50 border-b border-slate-150 text-slate-500 font-bold">
                                  <th className="p-3">{t.copy.signalCategory}</th>
                                  <th className="p-3">{t.copy.threatFlagVector}</th>
                                  <th className="p-3">{t.copy.remediationAction}</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-slate-100 font-normal">
                                  <td className="p-3 font-semibold text-slate-800">{t.copy.ipNetwork}</td>
                                  <td className="p-3 text-slate-600">{t.copy.hostingIpsDataCenterVpns}</td>
                                  <td className="p-3 text-slate-500">{t.copy.injectPassiveLivenessRequest}</td>
                                </tr>
                                <tr className="border-b border-slate-100 font-normal">
                                  <td className="p-3 font-semibold text-slate-800">{t.copy.deviceFingerprint}</td>
                                  <td className="p-3 text-slate-600">{t.copy.headlessBrowserEmulatorSignatures}</td>
                                  <td className="p-3 text-slate-500">{t.copy.requireMobileAppNfcStep}</td>
                                </tr>
                                <tr className="font-normal">
                                  <td className="p-3 font-semibold text-slate-800">{t.copy.typingBehavior}</td>
                                  <td className="p-3 text-slate-600">{t.copy.instantPastedFormFieldsBots}</td>
                                  <td className="p-3 text-slate-500">{t.copy.triggerMultiStepReviewCases}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {pdfPage === 4 && (
                        /* PAGE 4: INTERACTIVE CHECKLIST */
                        <div className="space-y-6 animate-in fade-in duration-200">
                          <div className="border-b border-slate-100 pb-3">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">{t.copy.chapter03}</span>
                            <h2 className="text-lg font-bold text-slate-900">{t.copy.actionableTrustArchitectureChecklist}</h2>
                          </div>

                          <p className="text-xs text-slate-600 leading-relaxed font-normal">{t.copy.checkTheBoxesBelowToAssessYourCurrent}</p>

                          {/* Interactive Checklist Cards */}
                          <div className="space-y-3.5 mt-4">
                            {t.readerChecklist.map((rule) => (
                              <div 
                                key={rule.key} 
                                onClick={() => setCheckedRules(prev => ({ ...prev, [rule.key]: !prev[rule.key] }))}
                                className={`p-3.5 border rounded-xl flex items-start gap-3 cursor-pointer transition-all ${
                                  checkedRules[rule.key] 
                                    ? 'bg-[#354CE1]/5 border-[#354CE1]' 
                                    : 'bg-slate-50/50 hover:bg-slate-50 border-slate-150'
                                }`}
                              >
                                <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                                  checkedRules[rule.key] ? 'bg-[#354CE1] border-[#354CE1] text-white' : 'border-slate-300 bg-white'
                                }`}>
                                  {checkedRules[rule.key] && <Check className="w-3 h-3 stroke-[3]" />}
                                </div>
                                <div>
                                  <h4 className="text-xs font-bold text-slate-900 leading-none">{rule.title}</h4>
                                  <p className="text-[10px] text-slate-400 mt-1 leading-normal font-normal">{rule.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {pdfPage === 5 && (
                        /* PAGE 5: CONCLUSION & CTA */
                        <div className="h-full flex flex-col justify-between py-6 text-center select-none animate-in fade-in duration-200">
                          <div>
                            <span className="text-[9px] font-bold text-[#354CE1] uppercase tracking-widest block">{t.copy.conclusion}</span>
                            <h2 className="text-lg md:text-xl font-bold text-slate-900 mt-1">{t.copy.establishingAdaptiveTrust}</h2>
                          </div>

                          <div className="max-w-md mx-auto space-y-4 my-auto mt-8 mb-8">
                            <p className="text-xs text-slate-600 leading-relaxed font-normal">{t.copy.toSuccessfullyBalanceConversionLimitsAndSecurityMandates}</p>
                            <p className="text-xs text-slate-600 leading-relaxed font-normal font-semibold">{t.copy.migrateToASignalsBasedIdentityProofingEngine}</p>
                          </div>

                          <div className="space-y-4 mt-auto">
                            <div className="flex flex-col sm:flex-row justify-center gap-2.5">
                              <button 
                                onClick={() => { setActiveEbookModal(null); onOpenSandbox(); }}
                                className="px-5 py-2.5 bg-[#354CE1] hover:bg-[#2539BE] text-white text-xs font-bold rounded-full shadow-md flex items-center justify-center gap-1.5 transition cursor-pointer"
                              >
                                <Play className="w-3.5 h-3.5" />
                                <span>{t.copy.tryIdentraInteractiveSandbox}</span>
                              </button>
                              <button 
                                onClick={() => setActiveEbookModal(null)}
                                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-full transition cursor-pointer"
                              >{t.copy.closePdf}</button>
                            </div>
                            <p className="text-[10px] text-slate-400 font-semibold uppercase">{t.copy.thankYouForReading} {firstName}!</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
