/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, BookOpen, Clock, ArrowRight, Check, Sparkles, 
  ChevronLeft, ChevronRight, FileText, CheckCircle2, 
  Lock, AlertTriangle, Fingerprint, Eye, Globe, Newspaper, 
  Smartphone, ArrowUpRight, Mail, Video, Mic, Shield, Layers, Smile
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord, getLocalizedValue } from '../utils/i18nRuntime';
import { resourceCenterPageTranslations } from '../translations/ResourceCenterPageTranslations';

interface Resource {
  id: string;
  title: string;
  type: 'Blog' | 'Guide' | 'Webinar' | 'Podcast';
  duration: string;
  category: 'identity-101' | 'compliance' | 'user-lifecycle' | 'latest';
  description: string;
  gradient: string;
  icon: any;
  date: string;
}

type ResourceType = Resource['type'];
type ResourceCategoryFilter = 'All' | 'Blog' | 'Guides' | 'Videos' | 'Podcasts';
type ResourceCopy = {
  title: string;
  duration: string;
  description: string;
  date: string;
};
type ResourceMeta = Pick<Resource, 'id' | 'type' | 'category' | 'gradient' | 'icon'>;
type ResourceCenterTranslations = typeof resourceCenterPageTranslations.en;
type ResourceCenterTextKey = {
  [K in keyof ResourceCenterTranslations]: ResourceCenterTranslations[K] extends string ? K : never
}[keyof ResourceCenterTranslations];

interface ResourceCenterPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
}

const categoryFilters: ResourceCategoryFilter[] = ['All', 'Blog', 'Guides', 'Videos', 'Podcasts'];

const identity101ResourceMeta: ResourceMeta[] = [
  { id: 'id101-1', type: 'Guide', category: 'identity-101', gradient: 'from-[#354CE1]/10 to-indigo-500/5', icon: Shield },
  { id: 'id101-2', type: 'Guide', category: 'identity-101', gradient: 'from-purple-500/10 to-[#354CE1]/5', icon: Layers },
  { id: 'id101-3', type: 'Blog', category: 'identity-101', gradient: 'from-teal-500/10 to-emerald-500/5', icon: Fingerprint },
  { id: 'id101-4', type: 'Guide', category: 'identity-101', gradient: 'from-amber-500/10 to-orange-500/5', icon: Globe },
  { id: 'id101-5', type: 'Guide', category: 'identity-101', gradient: 'from-blue-500/10 to-cyan-500/5', icon: FileText }
];

const complianceResourceMeta: ResourceMeta[] = [
  { id: 'comp-1', type: 'Webinar', category: 'compliance', gradient: 'from-rose-500/10 to-purple-500/5', icon: Video },
  { id: 'comp-2', type: 'Guide', category: 'compliance', gradient: 'from-[#354CE1]/10 to-sky-500/5', icon: Clock },
  { id: 'comp-3', type: 'Blog', category: 'compliance', gradient: 'from-amber-500/10 to-yellow-500/5', icon: AlertTriangle },
  { id: 'comp-4', type: 'Blog', category: 'compliance', gradient: 'from-emerald-500/10 to-teal-500/5', icon: CheckCircle2 }
];

const lifecycleResourceMeta: ResourceMeta[] = [
  { id: 'life-1', type: 'Guide', category: 'user-lifecycle', gradient: 'from-cyan-500/10 to-blue-500/5', icon: Smartphone },
  { id: 'life-2', type: 'Blog', category: 'user-lifecycle', gradient: 'from-purple-500/10 to-pink-500/5', icon: Clock },
  { id: 'life-3', type: 'Podcast', category: 'user-lifecycle', gradient: 'from-orange-500/10 to-amber-500/5', icon: Mic },
  { id: 'life-4', type: 'Guide', category: 'user-lifecycle', gradient: 'from-[#354CE1]/10 to-indigo-500/5', icon: Eye }
];

const latestResourceMeta: ResourceMeta[] = [
  { id: 'lat-1', type: 'Blog', category: 'latest', gradient: 'from-slate-900 to-slate-800', icon: Fingerprint },
  { id: 'lat-2', type: 'Guide', category: 'latest', gradient: 'from-blue-900 to-indigo-900', icon: Smartphone },
  { id: 'lat-3', type: 'Blog', category: 'latest', gradient: 'from-indigo-950 to-[#142FA0]', icon: Layers },
  { id: 'lat-4', type: 'Guide', category: 'latest', gradient: 'from-teal-950 to-emerald-950', icon: FileText },
  { id: 'lat-5', type: 'Webinar', category: 'latest', gradient: 'from-purple-950 to-indigo-950', icon: Video },
  { id: 'lat-6', type: 'Podcast', category: 'latest', gradient: 'from-amber-950 to-orange-950', icon: Mic },
  { id: 'lat-7', type: 'Guide', category: 'latest', gradient: 'from-rose-950 to-red-950', icon: Shield },
  { id: 'lat-8', type: 'Blog', category: 'latest', gradient: 'from-emerald-950 to-teal-950', icon: Globe },
  { id: 'lat-9', type: 'Webinar', category: 'latest', gradient: 'from-blue-950 to-slate-900', icon: Video }
];

const buildResources = (copy: readonly ResourceCopy[], meta: readonly ResourceMeta[]): Resource[] =>
  copy.map((item, index) => ({
    ...meta[index],
    ...item
  }));

export default function ResourceCenterPage({ onOpenSandbox }: ResourceCenterPageProps) {
  const { language } = useLanguage();
  const pageCopy = getLocalizedRecord(resourceCenterPageTranslations, language as keyof typeof resourceCenterPageTranslations, 'resourceCenterPageTranslations');
  const text = (key: ResourceCenterTextKey): string => getLocalizedValue(pageCopy, key, language, 'resourceCenterPageTranslations');
  const typeLabel = (type: ResourceType): string => ({
    Blog: text('typeBlog'),
    Guide: text('typeGuide'),
    Webinar: text('typeWebinar'),
    Podcast: text('typePodcast')
  }[type]);
  const filterLabel = (category: ResourceCategoryFilter): string => ({
    All: text('filterAll'),
    Blog: text('filterBlog'),
    Guides: text('filterGuides'),
    Videos: text('filterVideos'),
    Podcasts: text('filterPodcasts')
  }[category]);
  const resourceActionLabel = (type: ResourceType): string => {
    if (type === 'Podcast') return text('listenCta');
    if (type === 'Webinar') return text('watchCta');
    return text('readCta');
  };

  const [selectedCategory, setSelectedCategory] = useState<ResourceCategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [, setActiveArticle] = useState<Resource | null>(null);

  // Scroll Refs for Carousels
  const identity101Ref = useRef<HTMLDivElement>(null);
  const complianceRef = useRef<HTMLDivElement>(null);
  const lifecycleRef = useRef<HTMLDivElement>(null);

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const amount = 340;
      ref.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth'
      });
    }
  };

  const identity101Resources = useMemo<Resource[]>(() => buildResources(pageCopy.resources.identity101, identity101ResourceMeta), [pageCopy]);
  const complianceResources = useMemo<Resource[]>(() => buildResources(pageCopy.resources.compliance, complianceResourceMeta), [pageCopy]);
  const lifecycleResources = useMemo<Resource[]>(() => buildResources(pageCopy.resources.lifecycle, lifecycleResourceMeta), [pageCopy]);
  const latestResources = useMemo<Resource[]>(() => buildResources(pageCopy.resources.latest, latestResourceMeta), [pageCopy]);

  const filteredLatestResources = latestResources.filter(item => {
    if (selectedCategory !== 'All') {
      if (selectedCategory === 'Blog' && item.type !== 'Blog') return false;
      if (selectedCategory === 'Guides' && item.type !== 'Guide') return false;
      if (selectedCategory === 'Videos' && item.type !== 'Webinar') return false;
      if (selectedCategory === 'Podcasts' && item.type !== 'Podcast') return false;
    }
    
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      return item.title.toLowerCase().includes(query) || 
             item.description.toLowerCase().includes(query) ||
             typeLabel(item.type).toLowerCase().includes(query);
    }
    
    return true;
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() !== '') {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 3000);
    }
  };

  return (
    <div id="resource-center-root" className="bg-[#FAFBFD] pt-16 font-sans">
      
      {/* Sub-navigation Header */}
      <div className="bg-white border-b border-slate-100 sticky top-16 z-10 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="text-sm font-extrabold text-slate-900 tracking-tight">{text('resourceCenterTitle')}</span>
            <div className="hidden md:flex items-center gap-6">
              {categoryFilters.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setVisibleCount(6);
                  }}
                  className={`text-xs font-semibold transition-all relative py-4 ${
                    selectedCategory === cat 
                      ? 'text-[#354CE1]' 
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {filterLabel(cat)}
                  {selectedCategory === cat && (
                    <motion.div 
                      layoutId="categoryIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#354CE1]" 
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="relative w-48 md:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={text('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-full pl-9 pr-4 py-1.5 text-xs focus:outline-none focus:border-[#354CE1] focus:bg-white transition"
            />
          </div>
        </div>
      </div>

      {/* Hero Featured Segment */}
      <section className="max-w-7xl mx-auto px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Hero Card (Large - 7/12 width) */}
          <button type="button" className="lg:col-span-7 group cursor-pointer" onClick={() => onOpenSandbox()}>
            <div className="rounded-[2rem] overflow-hidden bg-gradient-to-br from-slate-950 via-[#121B3A] to-indigo-950 aspect-[16/10] relative p-8 flex flex-col justify-between border border-slate-850 shadow-xl group-hover:shadow-2xl transition duration-300">
              
              {/* Animated Deepfake Illustration */}
              <div className="absolute inset-0 opacity-80 overflow-hidden pointer-events-none">
                {/* Vector Grid Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(53,76,225,0.15),transparent_70%)]" />
                <div className="absolute top-10 right-10 w-48 h-48 bg-[#354CE1]/20 rounded-full blur-3xl" />
                
                {/* Floating elements inside deepfake illustration */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 flex items-center justify-center">
                  
                  {/* Outer Scan Radar ring */}
                  <div className="w-64 h-64 border border-[#354CE1]/30 rounded-full animate-[spin_20s_linear_infinite] flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-[#354CE1] absolute top-0" />
                  </div>
                  
                  {/* Bounding box target lines */}
                  <div className="w-48 h-48 border-2 border-dashed border-[#FFBF43]/40 rounded-xl absolute flex items-center justify-center">
                    <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-4 border-l-4 border-[#FFBF43]" />
                    <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-4 border-r-4 border-[#FFBF43]" />
                    <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-4 border-l-4 border-[#FFBF43]" />
                    <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-4 border-r-4 border-[#FFBF43]" />
                  </div>

                  {/* Inside Mobile Phone Illustration holding Face Scan */}
                  <div className="w-28 h-48 bg-slate-900 border-4 border-slate-700 rounded-2xl relative shadow-2xl flex flex-col items-center justify-center overflow-hidden">
                    {/* Screen reflection */}
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-white/5 skew-y-12 transform origin-top-left" />
                    <div className="w-12 h-1 bg-slate-800 rounded-full absolute top-2" />
                    
                    {/* Avatar representation */}
                    <div className="w-16 h-16 rounded-full bg-slate-850 border border-indigo-500/30 flex items-center justify-center relative overflow-hidden">
                      <div className="w-10 h-10 bg-[#354CE1]/20 rounded-full mt-2 border border-[#354CE1]/40 flex items-center justify-center">
                        <Smile className="w-6 h-6 text-indigo-400" />
                      </div>
                      <div className="absolute bottom-1 bg-[#FFBF43]/20 border border-[#FFBF43] rounded px-1 text-[7px] text-[#FFBF43] font-bold tracking-widest uppercase">
                        {text('aiSpoofLabel')}
                      </div>
                    </div>
                    
                    {/* Scan line indicator */}
                    <div className="absolute left-0 right-0 h-0.5 bg-cyan-400 shadow-lg shadow-cyan-400/50 animate-[bounce_3s_infinite_ease-in-out]" />
                  </div>
                </div>

                {/* Warnings / Caution floating pins */}
                <div className="absolute top-8 left-1/4 animate-[bounce_4s_infinite_ease-in-out] bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1.5">
                  <AlertTriangle className="w-3 h-3 text-rose-400" />
                  <span>{text('deepfakeBlockLabel')}</span>
                </div>

                <div className="absolute bottom-12 right-12 animate-[bounce_5s_infinite_ease-in-out_1s] bg-[#354CE1]/20 border border-indigo-500/30 text-indigo-300 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  <span>{text('syntheticGuardLabel')}</span>
                </div>
              </div>

              {/* Top Row Pill */}
              <div className="z-10 self-start">
                <span className="bg-[#E2E6FF] text-[#354CE1] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {text('featuredAnnouncement')}
                </span>
              </div>

              {/* Bottom Content Area */}
              <div className="z-10 space-y-4">
                <h2 className="text-xl md:text-3xl font-extrabold text-white leading-tight group-hover:text-indigo-200 transition duration-200">
                  {text('heroTitle')}
                </h2>
                
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Newspaper className="w-3.5 h-3.5 text-[#354CE1]" />
                    <span>{text('typeBlog')}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{text('heroDuration')}</span>
                  </span>
                  <span>•</span>
                  <span className="text-indigo-400 font-semibold group-hover:underline flex items-center gap-1">
                    {text('readArticle')} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>

            </div>
          </button>

          {/* Right Stack Cards (Two smaller cards - 5/12 width) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Stack Card 1: Shop like a pro */}
            <button type="button"
              className="bg-white rounded-[2rem] border border-slate-150 p-6 flex flex-col md:flex-row gap-6 cursor-pointer hover:border-[#354CE1] hover:shadow-lg transition duration-300 group"
              onClick={() => onOpenSandbox()}
            >
              {/* Side vector illustration */}
              <div className="w-full md:w-36 aspect-video md:aspect-square bg-indigo-50 rounded-2xl shrink-0 flex items-center justify-center p-4 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-[#354CE1]/10 rounded-full" />
                <div className="space-y-2 z-10 w-full text-center">
                  <Smartphone className="w-8 h-8 text-[#354CE1] mx-auto" />
                  <div className="flex justify-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <div className="w-2 h-2 rounded-full bg-slate-300" />
                  </div>
                </div>
              </div>

              {/* Text content */}
              <div className="flex flex-col justify-between py-1">
                <div className="space-y-2">
                  <span className="bg-emerald-50 text-emerald-700 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider inline-block">
                    {text('evaluatorGuide')}
                  </span>
                  <h3 className="text-sm font-extrabold text-slate-900 leading-snug group-hover:text-[#354CE1] transition">
                    {text('evaluatorTitle')}
                  </h3>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-4">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    <span>{text('typeGuide')}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{text('evaluatorDuration')}</span>
                  </span>
                </div>
              </div>
            </button>

            {/* Stack Card 2: Gartner Leader */}
            <button type="button"
              className="bg-white rounded-[2rem] border border-slate-150 p-6 flex flex-col md:flex-row gap-6 cursor-pointer hover:border-[#354CE1] hover:shadow-lg transition duration-300 group"
              onClick={() => onOpenSandbox()}
            >
              {/* Gartner Magic Quadrant mockup */}
              <div className="w-full md:w-36 aspect-video md:aspect-square bg-slate-900 rounded-2xl shrink-0 flex flex-col justify-between p-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#121E36] to-indigo-950 opacity-90" />
                
                {/* 2x2 Quadrant Grid mockup */}
                <div className="absolute inset-2 border-2 border-slate-750/50 grid grid-cols-2 grid-rows-2 z-10 text-[6px] font-bold text-slate-500 font-mono">
                  <div className="border-r border-b border-slate-750/30 p-1">{text('quadrantChallengers')}</div>
                  <div className="border-b border-slate-750/30 p-1 relative flex items-center justify-center bg-indigo-500/10">
                    <span className="text-[#FFBF43] absolute top-1 right-1">{text('quadrantLeaders')}</span>
                    <div className="w-2 h-2 rounded-full bg-[#354CE1] ring-2 ring-white animate-pulse" />
                    <span className="text-[5px] text-white absolute bottom-1 text-center scale-90">{text('quadrantIdentra')}</span>
                  </div>
                  <div className="border-r border-slate-750/30 p-1">{text('quadrantNichePlayers')}</div>
                  <div className="p-1">{text('quadrantVisionaries')}</div>
                </div>
              </div>

              {/* Text content */}
              <div className="flex flex-col justify-between py-1">
                <div className="space-y-2">
                  <span className="bg-amber-50 text-amber-700 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider inline-block">
                    {text('recognition')}
                  </span>
                  <h3 className="text-sm font-extrabold text-slate-900 leading-snug group-hover:text-[#354CE1] transition">
                    {text('gartnerTitle')}
                  </h3>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-4">
                  <span className="flex items-center gap-1">
                    <Newspaper className="w-3 h-3" />
                    <span>{text('typeBlog')}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{text('gartnerDuration')}</span>
                  </span>
                </div>
              </div>
            </button>

          </div>

        </div>
      </section>

      {/* Full Width Ambient Banner: Trends Shaping Identity */}
      <section className="bg-gradient-to-r from-indigo-50 to-purple-50/70 border-y border-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block mb-2">{text('platformResearch')}</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {text('trendsTitle')}
            </h2>
            <p className="text-slate-600 mt-4 text-base md:text-lg leading-relaxed">
              {text('trendsDesc')}
            </p>
          </div>

          {/* Three Elegant Bento Cards under Trends */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            
            {/* Trend Card 1 */}
            <button type="button" className="bg-white rounded-3xl border border-slate-150 p-6 flex flex-col justify-between hover:shadow-xl hover:border-indigo-400 transition duration-300 cursor-pointer" onClick={() => onOpenSandbox()}>
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Fingerprint className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {text('trend1Title')}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {text('trend1Desc')}
                </p>
              </div>
              <span className="text-[#354CE1] font-semibold text-xs flex items-center gap-1 mt-6">
                <span>{text('trend1Cta')}</span> <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* Trend Card 2 */}
            <button type="button" className="bg-white rounded-3xl border border-slate-150 p-6 flex flex-col justify-between hover:shadow-xl hover:border-indigo-400 transition duration-300 cursor-pointer" onClick={() => onOpenSandbox()}>
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {text('trend2Title')}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {text('trend2Desc')}
                </p>
              </div>
              <span className="text-[#354CE1] font-semibold text-xs flex items-center gap-1 mt-6">
                <span>{text('trend2Cta')}</span> <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* Trend Card 3 */}
            <button type="button" className="bg-white rounded-3xl border border-slate-150 p-6 flex flex-col justify-between hover:shadow-xl hover:border-indigo-400 transition duration-300 cursor-pointer" onClick={() => onOpenSandbox()}>
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {text('trend3Title')}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {text('trend3Desc')}
                </p>
              </div>
              <span className="text-[#354CE1] font-semibold text-xs flex items-center gap-1 mt-6">
                <span>{text('trend3Cta')}</span> <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>

          </div>
        </div>
      </section>

      {/* Series Carousels: Identity Foundations */}
      <section className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{text('identityFoundationsTitle')}</h2>
          <p className="text-slate-500 text-sm mt-1">
            {text('identityFoundationsDesc')}
          </p>
        </div>

        {/* Series 1: Identity 101 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#354CE1] rounded-full" />
              <span>{text('identity101Title')}</span>
            </h3>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => scroll(identity101Ref, 'left')}
                className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center transition active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => scroll(identity101Ref, 'right')}
                className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center transition active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div 
            ref={identity101Ref}
            className="flex gap-6 overflow-x-auto pr-8 py-2 scrollbar-none snap-x snap-mandatory"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {identity101Resources.map((item) => {
              const IconComp = item.icon;
              return (
                <button type="button"
                  key={item.id}
                  onClick={() => { setActiveArticle(item); onOpenSandbox(); }}
                  className="w-[290px] md:w-[320px] bg-white rounded-2xl border border-slate-150 overflow-hidden shrink-0 snap-start flex flex-col justify-between hover:shadow-lg hover:border-indigo-300 transition duration-300 cursor-pointer group"
                >
                  <div className={`p-6 bg-gradient-to-b ${item.gradient} aspect-[16/10] flex items-center justify-center relative`}>
                    <div className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-wider text-[#354CE1] bg-white/80 px-2 py-0.5 rounded-md backdrop-blur-xs">
                      {typeLabel(item.type)}
                    </div>
                    <IconComp className="w-12 h-12 text-[#354CE1]/80 group-hover:scale-110 transition duration-300" />
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div className="space-y-2">
                      <h4 className="text-sm font-extrabold text-slate-900 leading-snug group-hover:text-[#354CE1] transition line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-3">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mt-6 pt-3 border-t border-slate-50">
                      <span>{item.duration}</span>
                      <span className="font-semibold text-[#354CE1] flex items-center gap-0.5">
                        {resourceActionLabel(item.type)} <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Series 2: Compliance and Regulations */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-rose-500 rounded-full" />
              <span>{text('complianceTitle')}</span>
            </h3>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => scroll(complianceRef, 'left')}
                className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center transition active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => scroll(complianceRef, 'right')}
                className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center transition active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div 
            ref={complianceRef}
            className="flex gap-6 overflow-x-auto pr-8 py-2 scrollbar-none snap-x snap-mandatory"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {complianceResources.map((item) => {
              const IconComp = item.icon;
              return (
                <button type="button"
                  key={item.id}
                  onClick={() => { setActiveArticle(item); onOpenSandbox(); }}
                  className="w-[290px] md:w-[320px] bg-white rounded-2xl border border-slate-150 overflow-hidden shrink-0 snap-start flex flex-col justify-between hover:shadow-lg hover:border-rose-300 transition duration-300 cursor-pointer group"
                >
                  <div className={`p-6 bg-gradient-to-b ${item.gradient} aspect-[16/10] flex items-center justify-center relative`}>
                    <div className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-wider text-rose-600 bg-white/80 px-2 py-0.5 rounded-md backdrop-blur-xs">
                      {typeLabel(item.type)}
                    </div>
                    <IconComp className="w-12 h-12 text-rose-500/80 group-hover:scale-110 transition duration-300" />
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div className="space-y-2">
                      <h4 className="text-sm font-extrabold text-slate-900 leading-snug group-hover:text-rose-600 transition line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-3">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mt-6 pt-3 border-t border-slate-50">
                      <span>{item.duration}</span>
                      <span className="font-semibold text-rose-600 flex items-center gap-0.5">
                        {resourceActionLabel(item.type)} <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Series 3: Identity Across the User Life Cycle */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-amber-500 rounded-full" />
              <span>{text('lifecycleTitle')}</span>
            </h3>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => scroll(lifecycleRef, 'left')}
                className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center transition active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => scroll(lifecycleRef, 'right')}
                className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center transition active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div 
            ref={lifecycleRef}
            className="flex gap-6 overflow-x-auto pr-8 py-2 scrollbar-none snap-x snap-mandatory"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {lifecycleResources.map((item) => {
              const IconComp = item.icon;
              return (
                <button type="button"
                  key={item.id}
                  onClick={() => { setActiveArticle(item); onOpenSandbox(); }}
                  className="w-[290px] md:w-[320px] bg-white rounded-2xl border border-slate-150 overflow-hidden shrink-0 snap-start flex flex-col justify-between hover:shadow-lg hover:border-amber-300 transition duration-300 cursor-pointer group"
                >
                  <div className={`p-6 bg-gradient-to-b ${item.gradient} aspect-[16/10] flex items-center justify-center relative`}>
                    <div className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-wider text-amber-600 bg-white/80 px-2 py-0.5 rounded-md backdrop-blur-xs">
                      {typeLabel(item.type)}
                    </div>
                    <IconComp className="w-12 h-12 text-amber-500/80 group-hover:scale-110 transition duration-300" />
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div className="space-y-2">
                      <h4 className="text-sm font-extrabold text-slate-900 leading-snug group-hover:text-amber-600 transition line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-3">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mt-6 pt-3 border-t border-slate-50">
                      <span>{item.duration}</span>
                      <span className="font-semibold text-amber-600 flex items-center gap-0.5">
                        {resourceActionLabel(item.type)} <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* High-Fidelity Newsletter Signup Box */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-14 relative overflow-hidden shadow-2xl border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Aesthetic Background Vector Accents */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(53,76,225,0.08),transparent_60%)]" />
          
          {/* Decorative Pattern in Lavender */}
          <div className="absolute right-10 top-0 bottom-0 w-36 opacity-10 hidden lg:flex flex-col justify-between py-10">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                {Array.from({ length: 6 }).map((_, j) => (
                  <div key={j} className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                ))}
              </div>
            ))}
          </div>

          <div className="max-w-lg space-y-4 text-center lg:text-left z-10">
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block">
              {text('newsletterEyebrow')}
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
              {text('newsletterTitle')}
            </h2>
          </div>

          <div className="w-full lg:w-96 space-y-4 z-10">
            {!newsletterSubscribed ? (
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder={text('emailPlaceholder')}
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full bg-slate-950/60 border border-slate-700/80 rounded-full pl-12 pr-4 py-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#354CE1] focus:ring-1 focus:ring-[#354CE1]/20 transition"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-white hover:bg-slate-100 text-slate-950 text-xs font-bold py-3.5 rounded-full shadow-md hover:shadow-xl transition flex items-center justify-center gap-2 group"
                >
                  <span>{text('newsletterSubmit')}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-950/80 border border-emerald-500/30 rounded-3xl p-6 text-center space-y-3"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mx-auto">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">{text('newsletterSuccessTitle')}</h4>
                <p className="text-[11px] text-slate-400">
                  {text('newsletterSuccessDesc')}
                </p>
              </motion.div>
            )}

            <p className="text-[10px] text-slate-500 leading-normal text-center lg:text-left">
              {text('newsletterConsentPrefix')}{' '}
              <span className="underline hover:text-slate-300 cursor-pointer">{text('privacyPolicy')}</span>{' '}
              {text('newsletterConsentSuffix')}
            </p>
          </div>

        </div>
      </section>

      {/* Grid: Latest Resources */}
      <section className="max-w-7xl mx-auto px-6 py-16 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{text('latestResourcesTitle')}</h2>
            <p className="text-slate-500 text-sm mt-1">
              {text('latestResourcesDesc')}
            </p>
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto bg-slate-100 rounded-full p-1 border border-slate-200 text-xs text-slate-600">
            <span className="font-semibold pl-3 pr-2">{text('filterActive')}</span>
            <span className="bg-white text-slate-900 font-bold px-3 py-1 rounded-full shadow-xs">
              {selectedCategory === 'All' ? text('allFormats') : filterLabel(selectedCategory)}
            </span>
          </div>
        </div>

        {/* Resource Cards Grid */}
        {filteredLatestResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredLatestResources.slice(0, visibleCount).map((item) => {
                const IconComp = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={() => { setActiveArticle(item); onOpenSandbox(); }}
                    className="bg-white rounded-3xl border border-slate-150 overflow-hidden shadow-xs hover:shadow-lg hover:border-indigo-300 transition duration-300 cursor-pointer group flex flex-col justify-between min-h-[380px]"
                  >
                    <div>
                      {/* Banner section */}
                      <div className={`p-6 bg-gradient-to-tr ${item.gradient} aspect-video flex items-center justify-center relative overflow-hidden`}>
                        {/* Static/Dynamic design accents */}
                        <div className="absolute inset-0 bg-black/10" />
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent" />
                        
                        {/* Floater Badge */}
                        <div className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-widest text-white bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full">
                          {typeLabel(item.type)}
                        </div>

                        {/* Large graphic */}
                        <IconComp className="w-10 h-10 text-white/95 group-hover:scale-110 transition duration-300 z-10" />
                        
                        {/* Meta on Banner */}
                        <div className="absolute bottom-4 left-4 z-10 text-[10px] text-white/80 font-semibold flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{item.duration}</span>
                        </div>
                      </div>

                      {/* Content block */}
                      <div className="p-6 space-y-2">
                        <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider">{item.date}</span>
                        <h3 className="text-base font-extrabold text-slate-900 leading-snug group-hover:text-[#354CE1] transition line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0 mt-4 border-t border-slate-50 flex items-center justify-between text-xs font-semibold text-[#354CE1]">
                      <span>{text('openResource')}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          <div className="bg-white border border-slate-150 rounded-3xl p-12 text-center max-w-md mx-auto space-y-4">
            <Search className="w-8 h-8 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">{text('noResourcesFound')}</h3>
            <p className="text-xs text-slate-500">
              {text('noResourcesFoundDesc').replace('{query}', searchQuery)}
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="bg-indigo-50 hover:bg-indigo-100 text-[#354CE1] text-xs font-bold px-4 py-2 rounded-full"
            >
              {text('resetFilters')}
            </button>
          </div>
        )}

        {/* Load More Button */}
        {filteredLatestResources.length > visibleCount && (
          <div className="flex justify-center pt-6">
            <button
              onClick={() => setVisibleCount(prev => prev + 3)}
              className="bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-xs px-8 py-3.5 rounded-full shadow-md hover:shadow-xl transition active:scale-95"
            >
              {text('loadMore')}
            </button>
          </div>
        )}
      </section>

      {/* Real Stories, Real Results Section */}
      <section className="bg-[#E2E6FF]/40 border-y border-indigo-100/50 py-16">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-3xl">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#354CE1] uppercase tracking-widest block">{text('customerSuccess')}</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {text('customerStoriesTitle')}
              </h2>
              <p className="text-slate-600 text-sm md:text-base">
                {text('customerStoriesDesc')}
              </p>
            </div>
            <button 
              onClick={() => onOpenSandbox()}
              className="bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-xs px-6 py-3.5 rounded-full flex items-center gap-1.5 shrink-0 shadow-md active:scale-95 transition"
            >
              <span>{text('viewAll')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Customer Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pageCopy.customerStories.slice(0, 3).map((story) => (
              <div key={story.company} className="bg-white rounded-3xl border border-slate-150 p-6 space-y-6 hover:shadow-lg transition">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-[#354CE1] tracking-tighter text-sm">{text('identraBrand')}</span>
                  <span className="text-slate-300">|</span>
                  <span className="font-bold text-slate-800 text-xs">{story.company}</span>
                </div>
                <h4 className="text-sm font-extrabold text-slate-900 leading-relaxed">
                  {story.title}
                </h4>
                {story.description && (
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {story.description}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Secondary Bento Client Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {pageCopy.customerStories.slice(3).map((story) => (
              <div key={story.company} className="bg-white rounded-3xl border border-slate-150 p-6 space-y-6 hover:shadow-lg transition">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-[#354CE1] tracking-tighter text-sm">{text('identraBrand')}</span>
                  <span className="text-slate-300">|</span>
                  <span className="font-bold text-slate-800 text-xs">{story.company}</span>
                </div>
                <p className="text-[11px] text-slate-600 italic">
                  {story.title}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Want to Learn More? Footer Callout */}
      <section className="bg-white py-16 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-8">
          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F1E36] tracking-tight">
              {text('learnMoreTitle')}
            </h2>
            <p className="text-slate-600 text-base md:text-lg">
              {text('learnMoreDesc')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenSandbox()}
              className="w-full sm:w-auto bg-[#354CE1] hover:bg-[#2539BE] text-white font-extrabold text-xs px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 group"
            >
              <span>{text('tryDemo')}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onOpenSandbox()}
              className="w-full sm:w-auto border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-extrabold text-xs px-8 py-4 rounded-full transition"
            >
              {text('tryItNow')}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
