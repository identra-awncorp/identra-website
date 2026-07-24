/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, BookOpen, Clock, ArrowRight, X, User,
  Book, Shield, FileText,
  Lock, AlertTriangle, Fingerprint, Eye, Globe,
  Network, BarChart3,
  ChevronDown, ChevronUp
} from 'lucide-react';
import { BLOG_PAGE_TRANSLATIONS } from '../translations/BlogPageTranslations';
import { useLanguage } from '../context/LanguageContext';
import type { BlogDetailId } from '../types/routes';

// Interfaces
type BlogPostId = BlogDetailId;
type TopicId = keyof typeof BLOG_PAGE_TRANSLATIONS.en.topicLabels;
type IndustryId = keyof typeof BLOG_PAGE_TRANSLATIONS.en.industryLabels;

interface BlogPost {
  id: BlogPostId;
  topics: TopicId[];
  industries: IndustryId[];
  gradient: string;
  illustration: 'shield' | 'chart' | 'users' | 'fingerprint' | 'globe' | 'face' | 'link' | 'lock' | 'document' | 'alert';
}

interface BlogPageProps {
  onBackToLanding: () => void;
  onOpenBlogDetail: (id: BlogDetailId) => void;
}

// Blog articles use the same visual card architecture as the Ebooks page.
const BLOG_POSTS_DATA: BlogPost[] = [
  {
    id: 'blog-1',
    topics: ['identity', 'fraud'],
    industries: ['all'],
    gradient: 'from-[#354CE1] to-[#1E3A8A]',
    illustration: 'fingerprint'
  },
  {
    id: 'blog-2',
    topics: ['identity', 'security'],
    industries: ['finance-fintech', 'marketplaces'],
    gradient: 'from-[#0E1B40] to-[#1F3369]',
    illustration: 'alert'
  },
  {
    id: 'blog-3',
    topics: ['compliance', 'identity'],
    industries: ['finance-fintech', 'cryptocurrency'],
    gradient: 'from-[#312E81] to-[#4338CA]',
    illustration: 'document'
  },
  {
    id: 'blog-4',
    topics: ['fraud', 'artificial-intelligence'],
    industries: ['all'],
    gradient: 'from-[#7C2D12] to-[#9A3412]',
    illustration: 'alert'
  },
  {
    id: 'blog-5',
    topics: ['identity', 'security'],
    industries: ['government', 'travel'],
    gradient: 'from-[#065F46] to-[#047857]',
    illustration: 'lock'
  },
  {
    id: 'blog-6',
    topics: ['fraud', 'identity'],
    industries: ['marketplaces', 'retail-ecommerce'],
    gradient: 'from-[#354CE1] to-[#1E293B]',
    illustration: 'link'
  },
  {
    id: 'blog-7',
    topics: ['age-assurance', 'privacy'],
    industries: ['gaming', 'adult-entertainment', 'dating'],
    gradient: 'from-[#4C1D95] to-[#5B21B6]',
    illustration: 'shield'
  },
  {
    id: 'blog-8',
    topics: ['compliance', 'fraud'],
    industries: ['marketplaces', 'retail-ecommerce'],
    gradient: 'from-[#9D174D] to-[#BE185D]',
    illustration: 'users'
  },
  {
    id: 'blog-9',
    topics: ['security', 'fraud'],
    industries: ['finance-fintech', 'gaming'],
    gradient: 'from-[#0F172A] to-[#334155]',
    illustration: 'face'
  },
  {
    id: 'blog-10',
    topics: ['international', 'compliance'],
    industries: ['all'],
    gradient: 'from-[#0D9488] to-[#0F766E]',
    illustration: 'globe'
  },
  {
    id: 'blog-11',
    topics: ['compliance', 'security'],
    industries: ['legal', 'finance-fintech'],
    gradient: 'from-[#1E3A8A] to-[#354CE1]',
    illustration: 'chart'
  },
  {
    id: 'blog-12',
    topics: ['artificial-intelligence', 'fraud'],
    industries: ['all'],
    gradient: 'from-[#111827] to-[#1F2937]',
    illustration: 'face'
  }
];
// Helper to render covers elegantly
function CoverIllustration({ type }: { type: BlogPost['illustration'] }) {
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

export default function BlogPage({ onBackToLanding, onOpenBlogDetail }: BlogPageProps) {

  const { language } = useLanguage();

  const t = BLOG_PAGE_TRANSLATIONS[language];
  const postCopy = (post: BlogPost) => t.posts[post.id];

  const [selectedTopic, setSelectedTopic] = useState<TopicId>('all');
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryId>('all');
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAllTopics, setShowAllTopics] = useState(false);
  const [showAllIndustries, setShowAllIndustries] = useState(false);
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

  const openBlogDetail = (post: BlogPost) => {
    onOpenBlogDetail(post.id);
  };

  // Filter lists
  const topicsList: { id: TopicId }[] = [
    { id: 'age-assurance',},
    { id: 'artificial-intelligence',},
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
    { id: 'gaming',},
    { id: 'government',},
    { id: 'healthcare',},
    { id: 'legal',},
    { id: 'marketplaces',},
    { id: 'real-estate',},
    { id: 'retail-ecommerce',},
    { id: 'travel',},
  ];

  // Filtered blog posts
  const filteredBlogPosts = useMemo(() => {
    return BLOG_POSTS_DATA.filter((post) => {
      const matchesTopic = selectedTopic === 'all' || post.topics.includes(selectedTopic);
      const matchesIndustry = selectedIndustry === 'all' || post.industries.includes(selectedIndustry) || post.industries.includes('all');
      const copy = postCopy(post);
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
  const noResultsText = t.copy.noResultsDescription.replace('{query}', searchQuery || t.copy.selectedFilters);

  return (
    <div className="bg-[#FAFBFD] min-h-screen pb-16">
      {/* 1. Header / Hero section - Featured blog posts */}
      <div className="w-full bg-gradient-to-tr from-[#354CE1] via-[#5F3CF3] to-[#00D4B2] text-white pt-12 pb-20 relative overflow-hidden">
        {/* Subtle decorative mesh background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)]" />
        <div className="absolute top-1/4 left-1/10 w-48 h-48 bg-yellow-400/25 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/10 w-72 h-72 bg-[#00E5FF]/20 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Indicator */}
          <div className="flex items-center gap-2 mb-8 text-yellow-300 font-bold text-xs tracking-wider uppercase bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full w-max border border-white/25 shadow-sm">
            <Book className="w-4 h-4 text-yellow-300" />
            <span>{t.copy.featuredBlogPosts}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left featured large card: Gartner Quadrant */}
            <button type="button"
              onClick={() => openBlogDetail(BLOG_POSTS_DATA[0])}
              className="lg:col-span-7 bg-[#10193E] hover:bg-[#152153] border border-[#1E2E72] rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 cursor-pointer group transition-all duration-300 shadow-2xl relative overflow-hidden"
            >
              {/* Outer light glow */}
              <div className="absolute -inset-px bg-gradient-to-tr from-transparent via-[#354CE1]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
              
              {/* Mini Quadrant Mockup (Left portion of large card) */}
              <div className="w-full md:w-[260px] shrink-0 bg-gradient-to-b from-[#182559] to-[#0C1333] border border-[#2B3D8A] rounded-2xl p-4 flex flex-col justify-between aspect-[4/3] md:aspect-auto">
                <div>
                  <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#2B3D8A]/50">
                    <span className="text-[7px] font-bold text-slate-400 tracking-wider uppercase">{t.copy.figure1IdentityMap}</span>
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
                  <span>{t.copy.depthOfSignals}</span>
                  <span className="rotate-90 origin-bottom-right translate-y-[-10px] -translate-x-[4px]">{t.copy.operationalReadiness}</span>
                </div>
              </div>

              {/* Text content of large card */}
              <div className="flex flex-col justify-between flex-1 py-1">
                <div>
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="text-[10px] bg-[#1E2E72] text-[#4F6CFF] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">{t.copy.blog}</span>
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-slate-500" />
                    <span className="text-[10px] text-slate-400">{t.copy.text8MinRead}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold font-sans tracking-tight text-white mb-3 group-hover:text-[#4F6CFF] transition leading-snug">{t.copy.featuredTitle}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal mb-6">{t.copy.featuredDescription}</p>
                </div>
                
                <div className="flex items-center gap-2 text-xs font-bold text-[#4F6CFF] group-hover:text-white transition mt-auto">
                  <span>{t.copy.readTheArticle}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>

            {/* Right featured sidebar: 3 small items */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              {[BLOG_POSTS_DATA[1], BLOG_POSTS_DATA[2], BLOG_POSTS_DATA[3]].map((item, index) => (
                <button type="button"
                  key={index}
                  onClick={() => openBlogDetail(item)}
                  className="bg-[#0B1230]/60 hover:bg-[#101B42]/80 border border-[#1E2E72]/50 hover:border-[#2B3D8A] p-5 rounded-2xl cursor-pointer group flex items-center justify-between gap-4 transition-all duration-200"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold tracking-wider uppercase text-slate-400">{postCopy(item).type}</span>
                      {postCopy(item).duration && (
                        <span className="text-[9px] text-slate-500 flex items-center gap-1">
                          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-slate-600" />
                          <span>{postCopy(item).duration}</span>
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#4F6CFF] transition line-clamp-1">
                      {postCopy(item).title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-1 font-normal leading-relaxed">
                      {postCopy(item).description}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#182559] group-hover:bg-[#354CE1] flex items-center justify-center shrink-0 transition">
                    <ArrowRight className="w-3.5 h-3.5 text-[#4F6CFF] group-hover:text-white transition" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Area: Breadcrumbs, Title, Search, Filters & Blog grid */}
      <div ref={catalogTopRef} className="max-w-7xl mx-auto px-6 mt-12">
        <div className="sticky top-0 z-30 -mx-6 mb-8 bg-[#FAFBFD]/95 px-6 py-4 backdrop-blur-md border-b border-slate-100/80">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
            <button type="button" className="hover:text-[#354CE1]" onClick={onBackToLanding}>{t.copy.resourceCenter}</button>
            <span>&gt;</span>
            <span className="font-semibold text-slate-600">{t.copy.blog}</span>
          </div>

          {/* Header and Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900 tracking-tight">{t.copy.allBlogPosts}</h1>
            </div>
            
            {/* Custom Search bar */}
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input 
                type="text" 
                placeholder={t.copy.searchBlogPosts}
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

          {/* Blog grid */}
          <div className="lg:col-span-9 min-h-[70vh]">
            {filteredBlogPosts.length > 0 ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={resultSetKey}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {filteredBlogPosts.map((post) => (
                    <button type="button"
                      key={post.id}
                      onClick={() => openBlogDetail(post)}
                      className="bg-white rounded-2xl border border-slate-100 overflow-hidden cursor-pointer group hover:shadow-xl hover:border-slate-200/60 transition-all duration-300 flex flex-col h-full"
                    >
                      {/* Blog stylized vector cover */}
                      <div className={`h-40 bg-gradient-to-tr ${post.gradient} p-4 flex flex-col justify-between relative overflow-hidden shrink-0`}>
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
                          <CoverIllustration type={post.illustration} />
                        </div>

                        {/* Card bottom cover subtitle */}
                        <span className="text-[8px] font-semibold tracking-wider text-white/50 uppercase leading-none truncate">
                          {postCopy(post).title}
                        </span>
                      </div>

                      {/* Blog details info */}
                      <div className="p-5 flex flex-col justify-between flex-1">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                              {postCopy(post).type}
                            </span>
                            {postCopy(post).duration && (
                              <span className="text-[10px] text-slate-400 flex items-center gap-1 font-normal">
                                <Clock className="w-3 h-3 text-slate-400" />
                                <span>{postCopy(post).duration}</span>
                              </span>
                            )}
                          </div>
                          
                          <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#354CE1] transition leading-snug line-clamp-2">
                            {postCopy(post).title}
                          </h3>
                        </div>

                        <p className="text-[11px] text-slate-400 leading-normal line-clamp-2 mt-2">
                          {postCopy(post).description}
                        </p>
                      </div>
                    </button>
                  ))}
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center max-w-md mx-auto min-h-[50vh] flex flex-col items-center justify-center">
                <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">{t.copy.noBlogPostsFound}</h3>
                <p className="text-xs text-slate-400 leading-normal mb-6">{noResultsText}</p>
                <button 
                  onClick={clearAllFilters}
                  className="px-4 py-2 bg-[#354CE1] text-white hover:bg-[#2539BE] text-xs font-semibold rounded-xl transition"
                >{t.copy.clearAllFilters}</button>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
