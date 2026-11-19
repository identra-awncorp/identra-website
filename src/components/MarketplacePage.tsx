/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import {
  ArrowRight, Puzzle, Database, CreditCard, Users, MessageSquare, Briefcase, Ticket, KeyRound, Bot,
} from 'lucide-react';
import { motion } from 'motion/react';

import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { MARKETPLACE_PAGE_TRANSLATIONS } from '../translations/MarketplacePageTranslations';

interface MarketplacePageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

// Generic kinds of tools, not partner brands: Identra has no integration partners yet.
const HERO_TILES = [
  { Icon: Database, className: 'bg-orange-500 shadow-orange-500/20' },
  { Icon: CreditCard, className: 'bg-blue-500 shadow-blue-500/20' },
  { Icon: Users, className: 'bg-purple-700 shadow-purple-700/20' },
  { Icon: MessageSquare, className: 'bg-emerald-600 shadow-emerald-600/20' },
  { Icon: Briefcase, className: 'bg-rose-500 shadow-rose-500/20' },
  { Icon: Ticket, className: 'bg-blue-600 shadow-blue-600/20' },
  { Icon: KeyRound, className: 'bg-slate-900 shadow-slate-900/20' },
  { Icon: Bot, className: 'bg-amber-500 shadow-amber-500/20' },
];

export default function MarketplacePage({ onOpenSandbox, onViewChange }: MarketplacePageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(MARKETPLACE_PAGE_TRANSLATIONS, language as keyof typeof MARKETPLACE_PAGE_TRANSLATIONS, 'MARKETPLACE_PAGE_TRANSLATIONS');

  const renderTile = ({ Icon, className }: typeof HERO_TILES[number]) => (
    <div key={className} className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${className}`}>
      <Icon className="w-5 h-5" aria-hidden="true" />
    </div>
  );

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
                <span>{t.tryDemo}</span>
                <ArrowRight className="w-4 h-4" />
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
                {HERO_TILES.slice(0, 4).map(renderTile)}
                
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

                {HERO_TILES.slice(4).map(renderTile)}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Request Integration CTA Banner */}
      <section className="bg-slate-950 text-white py-16 px-4 md:px-8 text-center border-t border-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            {t.requestIntegration}
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
            {t.requestIntegrationDesc}
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

    </div>
  );
}
