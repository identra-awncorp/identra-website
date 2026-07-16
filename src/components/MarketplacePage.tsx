/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState, useMemo } from 'react';
import { 
  ArrowRight, Search, MessageSquare, ChevronLeft, ChevronRight,
  Puzzle, Filter, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { 
  CATEGORIES, 
  INTEGRATIONS, 
  IntegrationItem 
} from './MarketplacePageData';
import { INTEGRATION_TRANSLATIONS, MARKETPLACE_PAGE_TRANSLATIONS } from '../translations/MarketplacePageTranslations';

interface MarketplacePageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

export default function MarketplacePage({ onOpenSandbox, onViewChange }: MarketplacePageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(MARKETPLACE_PAGE_TRANSLATIONS, language as keyof typeof MARKETPLACE_PAGE_TRANSLATIONS, 'MARKETPLACE_PAGE_TRANSLATIONS');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [testimonialDirection, setTestimonialDirection] = useState<'left' | 'right'>('right');

  const testimonials = t.testimonials;
  const heroLogoClasses = [
    'bg-orange-500 shadow-orange-500/20',
    'bg-blue-500 shadow-blue-500/20',
    'bg-purple-700 shadow-purple-700/20 font-mono',
    'bg-emerald-600 shadow-emerald-600/20',
    'bg-rose-500 shadow-rose-500/20',
    'bg-blue-600 shadow-blue-600/20',
    'bg-slate-900 shadow-slate-900/20',
    'bg-amber-500 shadow-amber-500/20'
  ];

  const filteredIntegrations = useMemo(() => {
    return INTEGRATIONS.map(item => {
      const extraLocalized = INTEGRATION_TRANSLATIONS[language]?.[item.name];
      return {
        ...item,
        displayName: extraLocalized?.name || item.name,
        displayDesc: extraLocalized?.description || ''
      };
    }).filter(item => {
      const matchesSearch = 
        item.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.displayDesc.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || item.tags.includes(selectedCategory);
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, t, language]);

  const handlePrevTestimonial = () => {
    setTestimonialDirection('left');
    setCurrentTestimonialIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNextTestimonial = () => {
    setTestimonialDirection('right');
    setCurrentTestimonialIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const titleText = selectedCategory === 'All'
    ? t.allIntegrations
    : t.categoryIntegrationsTitle.replace('{category}', t.categories[selectedCategory as keyof typeof t.categories] || selectedCategory);

  return (
    <div className="w-full bg-[#FAFBFD] min-h-screen font-sans antialiased">
      
      {/* 1. Hero Blue Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1E2E9E] via-[#2F44D4] to-[#1A288E] text-white py-16 px-4 md:px-8 xl:py-24 border-b border-indigo-900/10">
        {/* Decorative background vectors */}
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-2xl -ml-20 -mb-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero text */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/15 transition-colors px-4 py-2 rounded-full text-xs font-semibold border border-white/10 shadow-sm"
            >
              <Puzzle className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span className="tracking-wide uppercase font-mono text-[10px] text-blue-100">{t.marketplace}</span>
            </motion.div>
            
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.15] text-white">
              {t.heroTitle}
            </h1>
            
            <p className="text-base md:text-lg text-blue-100/90 font-normal max-w-xl leading-relaxed">
              {t.heroDesc}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button 
                id="marketplace-demo-cta"
                onClick={onOpenSandbox}
                className="bg-white hover:bg-slate-50 active:scale-95 text-[#2F44D4] font-semibold px-6 py-3.5 rounded-xl shadow-md transition-all flex items-center space-x-2 text-sm"
              >
                <span>{t.getDemo}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button 
                id="marketplace-partner-cta"
                onClick={() => onViewChange?.('contact')}
                className="text-white hover:bg-white/10 active:scale-95 font-semibold px-5 py-3.5 rounded-xl transition-all flex items-center space-x-2 text-sm border border-white/20 bg-white/5"
              >
                <span>{t.partnerWithUs}</span>
                <ArrowRight className="w-4 h-4 text-blue-200" />
              </button>
            </div>
          </motion.div>

          {/* High-Craft Interactive Connection Visualizer */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-5 flex justify-center items-center"
          >
            <div className="relative w-full max-w-md bg-white/[0.04] p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent pointer-events-none" />
              
              <div className="grid grid-cols-4 gap-4 relative z-10">
                {/* Visual items simulating marketplace connections */}
                {t.visualLogos.slice(0, 4).map((logo, index) => (
                  <motion.div key={logo} whileHover={{ scale: 1.1 }} className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xs font-bold text-white shadow-lg cursor-pointer ${heroLogoClasses[index]}`}>
                    {logo}
                  </motion.div>
                ))}
                
                <div className="col-span-4 py-5 flex justify-center items-center relative">
                  {/* Decorative dashed arcs */}
                  <div className="absolute w-48 h-48 rounded-full border border-dashed border-white/10 animate-spin" style={{ animationDuration: '40s' }} />
                  <div className="absolute w-36 h-36 rounded-full border border-dashed border-white/20 animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
                  
                  {/* Central Node */}
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="w-16 h-16 rounded-full bg-white text-[#2F44D4] flex items-center justify-center shadow-2xl relative z-10 border border-blue-100"
                  >
                    <Puzzle className="w-8 h-8" />
                  </motion.div>
                </div>

                {t.visualLogos.slice(4).map((logo, offset) => {
                  const index = offset + 4;
                  return (
                    <motion.div key={logo} whileHover={{ scale: 1.1 }} className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xs font-bold text-white shadow-lg cursor-pointer ${heroLogoClasses[index]}`}>
                      {logo}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Sticky Sub-header with Category Pills & Search */}
      <section className="py-5 px-4 md:px-8 border-b border-slate-200/80 bg-white/95 backdrop-blur sticky top-0 z-30 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Custom animated pill tabs container */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none max-w-full">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest pr-2 flex items-center space-x-1.5 shrink-0">
              <Filter className="w-3.5 h-3.5" />
              <span>{t.filters}</span>
            </span>
            <div className="flex space-x-1 p-1 bg-slate-100/80 rounded-xl">
              {CATEGORIES.map((category) => {
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    id={`filter-tab-${category.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => setSelectedCategory(category)}
                    className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                      isSelected ? 'text-white' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                    }`}
                  >
                    {isSelected && (
                      <motion.div 
                        layoutId="activeCategoryHighlight"
                        className="absolute inset-0 bg-[#2F44D4] rounded-lg -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {t.categories[category as keyof typeof t.categories] || category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Elegant search box */}
          <div className="relative w-full lg:w-80 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 transition-colors" />
            <input
              id="marketplace-search-input"
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2F44D4]/10 focus:border-[#2F44D4] transition-all font-medium text-slate-800"
            />
          </div>

        </div>
      </section>

      {/* 3. Integrations Grid Section */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-slate-950 tracking-tight flex items-center space-x-2">
            <span>{titleText}</span>
            <span className="text-xs font-semibold bg-slate-100 text-slate-500 border border-slate-200 px-2 py-0.5 rounded-md font-mono">{filteredIntegrations.length}</span>
          </h2>
        </div>

        {/* Staggered card grid animations */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredIntegrations.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="col-span-full text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200 p-8 shadow-sm"
              >
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                  <Puzzle className="w-6 h-6 text-slate-400" />
                </div>
                <h3 className="text-base font-bold text-slate-800">{t.noIntegrationsFound}</h3>
                <p className="text-sm text-slate-500 mt-1.5 max-w-md mx-auto leading-relaxed">
                  {t.noIntegrationsDesc.replace('{search}', searchQuery).replace('{category}', t.categories[selectedCategory as keyof typeof t.categories] || selectedCategory)}
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                  className="mt-4 px-4 py-2 bg-slate-100 text-xs font-semibold text-[#2F44D4] hover:bg-slate-200/70 rounded-lg transition-colors border border-slate-200/50"
                >
                  {t.resetFilters}
                </button>
              </motion.div>
            ) : (
              filteredIntegrations.map((item, index) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.3) }}
                  key={item.name} 
                  id={`integration-card-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between hover:border-[#2F44D4]/30 group relative transition-colors duration-200 shadow-sm"
                  whileHover={{ 
                    y: -4, 
                    boxShadow: "0 12px 25px -4px rgba(47, 68, 212, 0.06), 0 8px 10px -6px rgba(47, 68, 212, 0.04)" 
                  }}
                >
                  {item.isNew && (
                    <span className="absolute top-4 right-4 bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-lg border border-emerald-200/50 uppercase tracking-widest font-mono">
                      {t.new}
                    </span>
                  )}
                  <div>
                    {/* Header: Logo and Title */}
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl ${item.logoBg} flex items-center justify-center font-bold text-sm text-white shadow-inner`}>
                        {item.logoText}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 group-hover:text-[#2F44D4] transition-colors text-base tracking-tight">
                          {item.displayName}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 font-normal">
                      {item.displayDesc}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                    {item.tags.map(tag => (
                      <span 
                        key={tag}
                        className="bg-slate-50 text-slate-500 text-[11px] px-2.5 py-1 rounded-lg font-semibold border border-slate-100"
                      >
                        {t.categories[tag as keyof typeof t.categories] || tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 4. Request Integration CTA Banner */}
      <section className="bg-slate-950 text-white py-16 px-4 md:px-8 text-center border-t border-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          <p className="text-xs font-bold text-[#6D7FFF] uppercase tracking-widest font-mono">
            {t.dontSeeLookingFor}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            {t.requestIntegration}
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
            {t.notAllPartnersListed}
          </p>
          <div className="pt-2">
            <button 
              id="marketplace-request-contact"
              onClick={() => onViewChange?.('contact')}
              className="bg-white hover:bg-slate-100 active:scale-95 text-slate-950 font-semibold px-6 py-3.5 rounded-xl shadow-md transition-all text-sm flex items-center space-x-2 mx-auto"
            >
              <span>{t.contactUs}</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Custom Testimonial Carousel Section */}
      <section className="py-20 px-4 md:px-8 bg-blue-50/30 border-t border-slate-100">
        <div className="max-w-4xl mx-auto relative">
          <div className="text-center space-y-8">
            <div className="text-[#2F44D4] flex justify-center">
              <MessageSquare className="w-12 h-12 opacity-20" />
            </div>

            <div className="overflow-hidden min-h-[140px] md:min-h-[100px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonialIndex}
                  initial={{ opacity: 0, x: testimonialDirection === 'right' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: testimonialDirection === 'right' ? -20 : 20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="space-y-6"
                >
                  <blockquote className="text-lg md:text-xl lg:text-2xl font-normal text-slate-800 leading-relaxed italic max-w-3xl mx-auto">
                    &quot;{testimonials[currentTestimonialIndex].quote}&quot;
                  </blockquote>

                  <div className="space-y-1">
                    <p className="font-bold text-slate-950 text-base">
                      {testimonials[currentTestimonialIndex].author}
                    </p>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      {testimonials[currentTestimonialIndex].role}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-center space-x-4 pt-4">
              <button
                id="testimonial-prev-btn"
                onClick={handlePrevTestimonial}
                className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors shadow-sm cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex space-x-1.5">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setTestimonialDirection(index > currentTestimonialIndex ? 'right' : 'left');
                      setCurrentTestimonialIndex(index);
                    }}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentTestimonialIndex === index ? 'bg-[#2F44D4] w-6' : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>

              <button
                id="testimonial-next-btn"
                onClick={handleNextTestimonial}
                className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors shadow-sm cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
