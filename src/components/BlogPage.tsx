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
import { blogDetailPath, type BlogDetailId } from '../types/routes';
import {
  getStructuredBlogArticle,
  getStructuredBlogIndustries,
  getStructuredBlogTopics,
  getStructuredBlogSeoMetadata,
  STRUCTURED_BLOG_ARTICLES,
} from '../content/blog/structuredBlogArticles';
import { getStructuredBlogSearchTerms } from '../content/blog/structuredBlogSeoProfiles';
import type {
  BlogArticleImage,
  StructuredBlogIndustryId,
  StructuredBlogTopicId,
} from '../content/blog/structuredBlogArticleModel';

// Interfaces
type BlogPostId = BlogDetailId;

interface BlogPost {
  id: BlogPostId;
  topics: StructuredBlogTopicId[];
  industries: StructuredBlogIndustryId[];
  publishedAt: string;
  gradient: string;
  illustration: 'shield' | 'chart' | 'users' | 'fingerprint' | 'globe' | 'face' | 'link' | 'lock' | 'document' | 'alert';
  coverImage?: BlogArticleImage;
}

interface BlogPageProps {
  onBackToLanding: () => void;
  onOpenBlogDetail: (id: BlogDetailId) => void;
}

// Blog articles use the same visual card architecture as the Ebooks page.
const BLOG_GRID_IMAGE_SIZES = '(min-width: 1280px) 280px, (min-width: 768px) 40vw, calc(100vw - 3rem)';

const normalizeBlogSearchText = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLocaleLowerCase()
    .trim();

const BLOG_POSTS_DATA: BlogPost[] = STRUCTURED_BLOG_ARTICLES.map((article) => ({
  id: article.id,
  topics: [...article.topics],
  industries: [...article.industries],
  publishedAt: article.publishedAt,
  gradient: 'from-[#172554] to-[#312E81]',
  illustration: 'fingerprint' as const,
  coverImage: article.coverImage,
}));
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
  const postCopy = React.useCallback((post: BlogPost) => {
    const structuredArticle = getStructuredBlogArticle(post.id);
    if (!structuredArticle) {
      throw new Error(`Missing structured blog article: ${post.id}`);
    }

    return structuredArticle.listing[language];
  }, [language]);

  const [selectedTopic, setSelectedTopic] = useState<StructuredBlogTopicId | 'all'>('all');
  const [selectedIndustry, setSelectedIndustry] = useState<StructuredBlogIndustryId>('all');
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

  const selectTopic = (topic: StructuredBlogTopicId | 'all') => {
    scrollCatalogIntoView('auto');
    setSelectedTopic((currentTopic) => currentTopic === topic ? 'all' : topic);
  };

  const selectIndustry = (industryId: StructuredBlogIndustryId) => {
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

  const handleBlogDetailLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    post: BlogPost,
  ) => {
    if (
      event.defaultPrevented
      || event.button !== 0
      || event.metaKey
      || event.ctrlKey
      || event.shiftKey
      || event.altKey
    ) {
      return;
    }

    event.preventDefault();
    openBlogDetail(post);
  };

  const sortedBlogPosts = useMemo(
    () => [...BLOG_POSTS_DATA].sort(
      (left, right) => right.publishedAt.localeCompare(left.publishedAt),
    ),
    [],
  );
  const featuredPost = sortedBlogPosts.find(
    (post) => post.id === 'dinh-danh-tu-chu-ssi-la-gi',
  ) ?? sortedBlogPosts[0];
  const featuredSidebarPosts = sortedBlogPosts
    .filter((post) => post.id !== featuredPost.id)
    .slice(0, 3);
  const topics = useMemo(() => getStructuredBlogTopics(), []);
  const industries = useMemo(() => getStructuredBlogIndustries(), []);

  // Filtered blog posts
  const filteredBlogPosts = useMemo(() => {
    return sortedBlogPosts.filter((post) => {
      const copy = postCopy(post);
      const matchesTopic = selectedTopic === 'all'
        || post.topics.includes(selectedTopic);
      const matchesIndustry = selectedIndustry === 'all'
        || post.industries.includes(selectedIndustry);
      const article = getStructuredBlogArticle(post.id);
      const seoProfile = article
        ? getStructuredBlogSeoMetadata(article)
        : null;
      const searchableText = normalizeBlogSearchText([
        copy.title,
        copy.description,
        copy.type,
        ...(seoProfile
          ? [
              seoProfile.title,
              seoProfile.description,
              ...getStructuredBlogSearchTerms(seoProfile),
              ...seoProfile.entities,
            ]
          : []),
      ].join(' '));
      const normalizedSearch = normalizeBlogSearchText(searchQuery);
      const matchesSearch = searchableText.includes(normalizedSearch);
      
      return matchesTopic && matchesIndustry && matchesSearch;
    });
  }, [postCopy, searchQuery, selectedIndustry, selectedTopic, sortedBlogPosts]);

  const visibleTopics = showAllTopics ? topics : topics.slice(0, 6);
  const hiddenTopicCount = Math.max(topics.length - visibleTopics.length, 0);
  const visibleIndustries = showAllIndustries ? industries : industries.slice(0, 6);
  const hiddenIndustryCount = Math.max(industries.length - visibleIndustries.length, 0);
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
          <div className="type-label flex items-center gap-2 mb-8 text-yellow-300 uppercase bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full w-max border border-white/25 shadow-sm">
            <Book className="w-4 h-4 text-yellow-300" />
            <span>{t.copy.featuredBlogPosts}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left featured large card: Gartner Quadrant */}
            <a
              href={blogDetailPath(featuredPost.id, language)}
              onClick={(event) => handleBlogDetailLinkClick(event, featuredPost)}
              className="lg:col-span-7 bg-[#10193E] hover:bg-[#152153] border border-[#1E2E72] rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 cursor-pointer group transition-all duration-300 shadow-2xl relative overflow-hidden text-left"
            >
              {/* Outer light glow */}
              <div className="absolute -inset-px bg-gradient-to-tr from-transparent via-[#354CE1]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
              
              {featuredPost.coverImage ? (
                <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 md:w-[280px] md:aspect-[4/3]">
                  <img
                    src={featuredPost.coverImage.src}
                    srcSet={featuredPost.coverImage.srcSet}
                    sizes={featuredPost.coverImage.sizes}
                    width={featuredPost.coverImage.width}
                    height={featuredPost.coverImage.height}
                    alt={postCopy(featuredPost).title}
                    decoding="async"
                    fetchPriority="high"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              ) : (
              <div className="w-full md:w-[260px] shrink-0 bg-gradient-to-b from-[#182559] to-[#0C1333] border border-[#2B3D8A] rounded-2xl p-4 flex flex-col justify-between aspect-[4/3] md:aspect-auto">
                <div>
                  <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#2B3D8A]/50">
                    <span className="type-caption font-bold text-slate-400 uppercase">{t.copy.figure1IdentityMap}</span>
                    <span className="type-caption font-bold text-[#4F6CFF] uppercase">2025</span>
                  </div>
                  
                  {/* Scatter Plot Coordinates */}
                  <div className="relative aspect-[4/3] w-full border-l border-b border-[#3E52A3] mt-4 flex items-center justify-center">
                    {/* Quadrant dividing lines */}
                    <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-[#2B3D8A]/30" />
                    <div className="absolute inset-y-0 left-1/2 border-l border-dashed border-[#2B3D8A]/30" />
                    
                    {/* Quadrant Titles */}
                    <span className="type-caption absolute top-1 left-1 text-slate-500 font-bold uppercase">{t.copy.challengers}</span>
                    <span className="type-caption absolute top-1 right-1 text-[#4F6CFF] font-bold uppercase">{t.copy.leaders}</span>
                    <span className="type-caption absolute bottom-1 left-1 text-slate-500 font-bold uppercase">{t.copy.nichePlayers}</span>
                    <span className="type-caption absolute bottom-1 right-1 text-slate-500 font-bold uppercase">{t.copy.visionaries}</span>
                    
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
                        <span className="type-caption absolute -top-3 left-1/2 -translate-x-1/2 font-bold text-white bg-slate-900 px-1 py-0.5 rounded-xs">Identra</span>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div className="type-caption flex items-center justify-between text-slate-400 mt-2">
                  <span>{t.copy.depthOfSignals}</span>
                  <span className="rotate-90 origin-bottom-right translate-y-[-10px] -translate-x-[4px]">{t.copy.operationalReadiness}</span>
                </div>
              </div>
              )}

              {/* Text content of large card */}
              <div className="flex flex-col justify-between flex-1 py-1">
                <div>
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="type-label bg-[#1E2E72] text-indigo-200 px-2.5 py-0.5 rounded-full uppercase">{postCopy(featuredPost).type}</span>
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-slate-500" />
                    <span className="type-caption text-slate-400">{postCopy(featuredPost).duration}</span>
                  </div>
                  <h3 className="type-featured-title text-white mb-3 group-hover:text-indigo-200 transition line-clamp-3">{postCopy(featuredPost).title}</h3>
                  <p className="type-body-sm text-slate-300 mb-6 line-clamp-3">{postCopy(featuredPost).description}</p>
                </div>
                
                <div className="type-control flex items-center gap-2 text-[#4F6CFF] group-hover:text-white transition mt-auto">
                  <span>{t.copy.readTheArticle}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>

            {/* Right featured sidebar: 3 small items */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              {featuredSidebarPosts.map((item) => (
                <a
                  key={item.id}
                  href={blogDetailPath(item.id, language)}
                  onClick={(event) => handleBlogDetailLinkClick(event, item)}
                  className="bg-[#0B1230]/60 hover:bg-[#101B42]/80 border border-[#1E2E72]/50 hover:border-[#2B3D8A] p-5 rounded-2xl cursor-pointer group flex items-center justify-between gap-4 transition-all duration-200 text-left"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="type-label uppercase text-slate-400">{postCopy(item).type}</span>
                      {postCopy(item).duration && (
                        <span className="type-caption text-slate-500 flex items-center gap-1">
                          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-slate-600" />
                          <span>{postCopy(item).duration}</span>
                        </span>
                      )}
                    </div>
                    <h4 className="type-card-title-sm text-white group-hover:text-[#4F6CFF] transition line-clamp-1">
                      {postCopy(item).title}
                    </h4>
                    <p className="type-body-sm text-slate-400 line-clamp-1">
                      {postCopy(item).description}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#182559] group-hover:bg-[#354CE1] flex items-center justify-center shrink-0 transition">
                    <ArrowRight className="w-3.5 h-3.5 text-[#4F6CFF] group-hover:text-white transition" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Area: Breadcrumbs, Title, Search, Filters & Blog grid */}
      <div ref={catalogTopRef} className="max-w-7xl mx-auto px-6 mt-12">
        <div className="sticky top-0 z-30 -mx-6 mb-8 bg-[#FAFBFD]/95 px-6 py-4 backdrop-blur-md border-b border-slate-100/80">
          {/* Breadcrumbs */}
          <div className="type-body-sm flex items-center gap-1.5 text-slate-400 mb-2">
            <button type="button" className="hover:text-[#354CE1]" onClick={onBackToLanding}>{t.copy.resourceCenter}</button>
            <span>&gt;</span>
            <span className="font-semibold text-slate-600">{t.copy.blog}</span>
          </div>

          {/* Header and Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="type-section-title-compact text-slate-900">{t.copy.allBlogPosts}</h1>
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
                className="type-control w-full bg-white border border-slate-200 pl-10 pr-4 py-2.5 rounded-full text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#354CE1]/20 focus:border-[#354CE1] transition"
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
          {/* Article tags and industries sidebar filters */}
          <div className="lg:col-span-3 space-y-10 lg:sticky lg:top-32 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto lg:overscroll-contain lg:pr-2 lg:pb-8">
            {/* Filter Group: Tags */}
            <div>
              <h3 className="type-card-title text-slate-900 mb-4">{t.copy.topics}</h3>
              <div className="flex flex-col items-start gap-2.5">
                <button
                  type="button"
                  onClick={() => selectTopic('all')}
                  className={`type-control-compact px-4.5 py-2 rounded-full text-left transition-all duration-250 select-none cursor-pointer border-none ${
                    selectedTopic === 'all'
                      ? 'bg-[#354CE1] text-white hover:bg-[#2539C1]'
                      : 'bg-[#F1F3F5] text-[#0F1E36] hover:bg-slate-200/80'
                  }`}
                >
                  {t.topicLabels.all}
                </button>
                {visibleTopics.map((topic) => {
                  const isSelected = selectedTopic === topic;
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => selectTopic(topic)}
                      className={`type-control-compact px-4.5 py-2 rounded-full text-left transition-all duration-250 select-none cursor-pointer border-none ${
                        isSelected
                          ? 'bg-[#354CE1] text-white hover:bg-[#2539C1]'
                          : 'bg-[#F1F3F5] text-[#0F1E36] hover:bg-slate-200/80'
                      }`}
                    >
                      {t.topicLabels[topic]}
                    </button>
                  );
                })}
              </div>
              {topics.length > 6 && (
                <button
                  type="button"
                  onClick={() => setShowAllTopics(!showAllTopics)}
                  className="type-control-compact text-[#354CE1] hover:text-[#2539C1] flex items-center gap-1.5 mt-3.5 select-none cursor-pointer border-none bg-transparent p-0 transition-colors"
                >
                  {showAllTopics ? (
                    <>
                      <ChevronUp className="w-3.5 h-3.5 text-[#354CE1]" />
                      <span>{t.copy.showLess}</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3.5 h-3.5 text-[#354CE1]" />
                      <span>{t.copy.show4More.replace('4', String(hiddenTopicCount))}</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Filter Group: Industries */}
            <div>
              <h3 className="type-card-title text-slate-900 mb-4">{t.copy.industries}</h3>
              <div className="flex flex-col items-start gap-2.5">
                <button
                  type="button"
                  onClick={() => selectIndustry('all')}
                  className={`type-control-compact px-4.5 py-2 rounded-full text-left transition-all duration-250 select-none cursor-pointer border-none ${
                    selectedIndustry === 'all'
                      ? 'bg-[#354CE1] text-white hover:bg-[#2539C1]'
                      : 'bg-[#F1F3F5] text-[#0F1E36] hover:bg-slate-200/80'
                  }`}
                >
                  {t.industryLabels.all}
                </button>
                {visibleIndustries.map((industry) => {
                  const isSelected = selectedIndustry === industry;
                  return (
                    <button
                      key={industry}
                      type="button"
                      onClick={() => selectIndustry(industry)}
                      className={`type-control-compact px-4.5 py-2 rounded-full text-left transition-all duration-250 select-none cursor-pointer border-none ${
                        isSelected
                          ? 'bg-[#354CE1] text-white hover:bg-[#2539C1]'
                          : 'bg-[#F1F3F5] text-[#0F1E36] hover:bg-slate-200/80'
                      }`}
                    >
                      {t.industryLabels[industry]}
                    </button>
                  );
                })}
              </div>
              {industries.length > 6 && (
                <button
                  type="button"
                  onClick={() => setShowAllIndustries(!showAllIndustries)}
                  className="type-control-compact text-[#354CE1] hover:text-[#2539C1] flex items-center gap-1.5 mt-3.5 select-none cursor-pointer border-none bg-transparent p-0 transition-colors"
                >
                  {showAllIndustries ? (
                    <>
                      <ChevronUp className="w-3.5 h-3.5 text-[#354CE1]" />
                      <span>{t.copy.showLess}</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3.5 h-3.5 text-[#354CE1]" />
                      <span>{t.copy.show9More.replace('9', String(hiddenIndustryCount))}</span>
                    </>
                  )}
                </button>
              )}
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
                    <a
                      key={post.id}
                      href={blogDetailPath(post.id, language)}
                      onClick={(event) => handleBlogDetailLinkClick(event, post)}
                      className="bg-white rounded-2xl border border-slate-100 overflow-hidden cursor-pointer group hover:shadow-xl hover:border-slate-200/60 transition-all duration-300 flex flex-col h-full text-left"
                    >
                      {post.coverImage ? (
                        <div className="relative h-40 shrink-0 overflow-hidden bg-slate-100">
                          <img
                            src={post.coverImage.src}
                            srcSet={post.coverImage.srcSet}
                            sizes={BLOG_GRID_IMAGE_SIZES}
                            width={post.coverImage.width}
                            height={post.coverImage.height}
                            alt={postCopy(post).title}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        </div>
                      ) : (
                      <div className={`h-40 bg-gradient-to-tr ${post.gradient} p-4 flex flex-col justify-between relative overflow-hidden shrink-0`}>
                        {/* Background subtle stripes */}
                        <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent mix-blend-overlay" />
                        
                        {/* Top logo */}
                        <div className="type-label flex items-center gap-1 text-white/80 uppercase">
                          <div className="w-2.5 h-2.5 bg-white rounded-xs rotate-12 flex items-center justify-center">
                            <span className="type-caption text-[#354CE1]">p</span>
                          </div>
                          <span>identra</span>
                        </div>

                        {/* Mid Illustration SVG/Icon */}
                        <div className="my-auto flex items-center justify-center">
                          <CoverIllustration type={post.illustration} />
                        </div>

                        {/* Card bottom cover subtitle */}
                        <span className="type-label text-white/50 uppercase truncate">
                          {postCopy(post).title}
                        </span>
                      </div>
                      )}

                      {/* Blog details info */}
                      <div className="p-5 flex flex-col justify-between flex-1">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="type-label-compact bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md uppercase">
                              {postCopy(post).type}
                            </span>
                            {postCopy(post).duration && (
                              <span className="type-caption-compact text-slate-400 flex items-center gap-1">
                                <Clock className="w-3 h-3 text-slate-400" />
                                <span>{postCopy(post).duration}</span>
                              </span>
                            )}
                          </div>
                          
                          <h3 className="type-card-title-sm text-slate-900 group-hover:text-[#354CE1] transition line-clamp-2">
                            {postCopy(post).title}
                          </h3>
                        </div>

                        <p className="type-body-sm text-slate-400 line-clamp-2 mt-2">
                          {postCopy(post).description}
                        </p>
                      </div>
                    </a>
                  ))}
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center max-w-md mx-auto min-h-[50vh] flex flex-col items-center justify-center">
                <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-5 h-5" />
                </div>
                <h3 className="type-card-title text-slate-900 mb-1">{t.copy.noBlogPostsFound}</h3>
                <p className="type-body-sm text-slate-400 mb-6">{noResultsText}</p>
                <button 
                  onClick={clearAllFilters}
                  className="type-control px-4 py-2 bg-[#354CE1] text-white hover:bg-[#2539BE] rounded-xl transition"
                >{t.copy.clearAllFilters}</button>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
