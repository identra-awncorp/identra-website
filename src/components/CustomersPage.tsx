/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState, useMemo } from 'react';
import { 
  ArrowRight, ChevronDown, Check, Sparkles, Filter, 
  ArrowUpRight, HelpCircle, User, Lock, ArrowLeft 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord, getLocalizedValue } from '../utils/i18nRuntime';
import {
  CUSTOMER_INDUSTRY_LABEL_KEYS,
  CUSTOMER_USE_CASE_LABEL_KEYS,
  CUSTOMERS_TRANSLATIONS
} from '../translations/CustomersPageTranslations';

type CustomerIndustryKey = keyof typeof CUSTOMER_INDUSTRY_LABEL_KEYS;
type CustomerUseCaseKey = keyof typeof CUSTOMER_USE_CASE_LABEL_KEYS;
type CustomerTranslationKey = keyof typeof CUSTOMERS_TRANSLATIONS.en;

interface CustomersPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

interface CustomerStory {
  id: number;
  company: string;
  industry: CustomerIndustryKey;
  useCase: CustomerUseCaseKey;
  logo: React.ReactNode;
  text: React.ReactNode;
}

export default function CustomersPage({ onOpenSandbox, onBackToLanding, onViewChange }: CustomersPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(CUSTOMERS_TRANSLATIONS, language as keyof typeof CUSTOMERS_TRANSLATIONS, 'CUSTOMERS_TRANSLATIONS');
  const getTranslatedText = (key: CustomerTranslationKey) => getLocalizedValue(t, key, language, 'CUSTOMERS_TRANSLATIONS');

  // Dropdown states
  const [selectedIndustry, setSelectedIndustry] = useState<CustomerIndustryKey>('all');
  const [selectedUseCase, setSelectedUseCase] = useState<CustomerUseCaseKey>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  // Unique lists for filters
  const INDUSTRIES = Object.keys(CUSTOMER_INDUSTRY_LABEL_KEYS) as CustomerIndustryKey[];
  const USE_CASES = Object.keys(CUSTOMER_USE_CASE_LABEL_KEYS) as CustomerUseCaseKey[];

  const getIndustryLabel = (industry: CustomerIndustryKey) =>
    getTranslatedText(CUSTOMER_INDUSTRY_LABEL_KEYS[industry]);

  const getUseCaseLabel = (useCase: CustomerUseCaseKey) =>
    getTranslatedText(CUSTOMER_USE_CASE_LABEL_KEYS[useCase]);

  const getStoryText = (company: string) => {
    switch (company) {
      case 'OpenAI':
        return (
          <span>
            <strong className="text-slate-900 font-bold">OpenAI</strong> {t.storyOpenAI}
          </span>
        );
      case 'Coursera':
        return (
          <span>
            <strong className="text-slate-900 font-bold">Coursera</strong> {t.storyCoursera}
          </span>
        );
      case 'Twilio':
        return (
          <span>
            <strong className="text-slate-900 font-bold">Twilio</strong> {t.storyTwilio}
          </span>
        );
      case 'Square':
        return (
          <span>
            <strong className="text-slate-900 font-bold">Square</strong> {t.storySquare}
          </span>
        );
      case 'Lime':
        return (
          <span>
            <strong className="text-slate-900 font-bold">Lime</strong> {t.storyLime}
          </span>
        );
      case 'Brex':
        return (
          <span>
            <strong className="text-slate-900 font-bold">Brex</strong> {t.storyBrex}
          </span>
        );
      case 'Branch':
        return (
          <span>
            <strong className="text-slate-900 font-bold">Branch</strong> {t.storyBranch}
          </span>
        );
      case 'WeTravel':
        return (
          <span>
            <strong className="text-slate-900 font-bold">WeTravel</strong> {t.storyWeTravel}
          </span>
        );
      case 'Coffee Meets Bagel':
        return (
          <span>
            <strong className="text-slate-900 font-bold">Coffee Meets Bagel</strong> {t.storyCoffeeMeetsBagel}
          </span>
        );
      case 'Vestiaire Collective':
        return (
          <span>
            <strong className="text-slate-900 font-bold">Vestiaire Collective</strong> {t.storyVestiaire}
          </span>
        );
      case 'Anton Payments':
        return (
          <span>
            <strong className="text-slate-900 font-bold">Anton Payments</strong> {t.storyAnton}
          </span>
        );
      case 'Coinflow':
        return (
          <span>
            <strong className="text-slate-900 font-bold">Coinflow</strong> {t.storyCoinflow}
          </span>
        );
      default:
        return null;
    }
  };

  // Custom SVG Logos for maximum brand accuracy and fidelity
  const LOGOS = {
    openai: (
      <div className="flex items-center gap-2.5">
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-slate-900 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.3,10.3A5.4,5.4,0,0,0,18,5.1a5.6,5.6,0,0,0-5.2-1.3A5.4,5.4,0,0,0,7.9,1.7,5.5,5.5,0,0,0,3,6.2,5.4,5.4,0,0,0,.3,10.6,5.5,5.5,0,0,0,3.1,16a5.5,5.5,0,0,0,5.3,1.2,5.4,5.4,0,0,0,4.8,2.2,5.5,5.5,0,0,0,4.9-4.5,5.4,5.4,0,0,0,2.8-4.3A5.5,5.5,0,0,0,21.3,10.3ZM12,18.4a3.7,3.7,0,0,1-2.4-.9l.1-.1,3.9-2.3a.6.6,0,0,0,.3-.5V9l1.8,1a.1.1,0,0,1,.1.1v4.5A3.8,3.8,0,0,1,12,18.4ZM4.4,14.6a3.7,3.7,0,0,1-.2-2.6l.1.1,3.9,2.2V16a.6.6,0,0,0,.6,0l3.9-2.2V11.5L11,12.5a.1.1,0,0,1-.1,0L7,10.1A3.8,3.8,0,0,1,4.4,14.6ZM3.4,8.1A3.7,3.7,0,0,1,5.6,6.7l.1.1V11.3a.6.6,0,0,0,.3.5l3.9,2.3L8.1,15.1H8a.1.1,0,0,1-.1-.1V10.5A3.8,3.8,0,0,1,3.4,8.1ZM12,5.6l2.4,1.4-.1.1-3.9,2.3a.6.6,0,0,0-.3.5V15L8.3,14a.1.1,0,0,1-.1-.1V9.4A3.8,3.8,0,0,1,12,5.6ZM19.6,9.4a3.7,3.7,0,0,1,.2,2.6l-.1-.1-3.9-2.2V8a.6.6,0,0,0-.6,0l-3.9,2.2v2.3l1.7-1h.1l3.9,2.3A3.8,3.8,0,0,1,19.6,9.4ZM20.6,15.9a3.7,3.7,0,0,1-2.2,1.4l-.1-.1V12.7a.6.6,0,0,0-.3-.5l-3.9-2.2,1.8-1,.1.1v4.5A3.8,3.8,0,0,1,20.6,15.9ZM12,13.5l-1.5-.9V10.9L12,10l1.5.9V12.6Z" />
        </svg>
        <span className="font-display font-bold text-lg text-slate-900 tracking-tight">OpenAI</span>
      </div>
    ),
    coursera: (
      <div className="flex items-center gap-1">
        <span className="font-display font-extrabold text-[#0056D2] text-xl tracking-tight">coursera</span>
      </div>
    ),
    twilio: (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="w-5.5 h-5.5 text-[#F22F46] fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-3-9c-.83 0-1.5.67-1.5 1.5S8.17 13 9 13s1.5-.67 1.5-1.5S9.83 11 9 11zm6 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5S15.83 11 15 11zm-3-3c-.83 0-1.5.67-1.5 1.5S11.17 11 12 11s1.5-.67 1.5-1.5S12.83 8 12 8zm0 6c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5S12.83 14 12 14z" />
        </svg>
        <span className="font-display font-bold text-slate-900 tracking-tight text-base">twilio</span>
      </div>
    ),
    square: (
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-slate-900 rounded-[4px] flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-white rounded-[2px]" />
        </div>
        <span className="font-display font-semibold text-slate-900 text-base tracking-tight">Square</span>
      </div>
    ),
    lime: (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#00E000] fill-current" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <path d="M12 4v16M4 12h16M6.34 6.34l11.32 11.32M6.34 17.66L17.66 6.34" stroke="currentColor" strokeWidth="2" />
        </svg>
        <span className="font-display font-bold text-[#10B981] text-lg tracking-tight">Lime</span>
      </div>
    ),
    brex: (
      <div className="flex items-center gap-1.5">
        <div className="flex flex-col justify-center gap-0.5">
          <div className="w-4.5 h-1.5 bg-[#FF8C3A] rounded-sm transform -skew-x-12" />
          <div className="w-4.5 h-1.5 bg-slate-800 rounded-sm transform skew-x-12" />
        </div>
        <span className="font-display font-extrabold text-slate-900 text-lg tracking-tight">Brex</span>
      </div>
    ),
    branch: (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="w-5.5 h-5.5 text-emerald-600 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.5 4C14.46 4 12 6.46 12 9.5c0 1.54.64 2.94 1.67 3.94L12 15.17l-1.67-1.73C11.36 12.44 12 11.04 12 9.5 12 6.46 9.54 4 6.5 4S1 6.46 1 9.5c0 4.14 7 10.5 11 10.5s11-6.36 11-10.5C23 6.46 20.54 4 17.5 4zm-11 9c-1.93 0-3.5-1.57-3.5-3.5S4.57 6 6.5 6 10 7.57 10 9.5 8.43 13 6.5 13zm11 0c-1.93 0-3.5-1.57-3.5-3.5S15.57 6 17.5 6 21 7.57 21 9.5 19.43 13 17.5 13z" />
        </svg>
        <span className="font-display font-semibold text-slate-800 text-base tracking-tight">branch</span>
      </div>
    ),
    wetravel: (
      <div className="flex items-center gap-1">
        <span className="font-display font-bold text-[#00A896] text-lg tracking-tight">we</span>
        <span className="font-display font-black text-slate-800 text-lg tracking-tight">travel</span>
      </div>
    ),
    coffeemeetsbagel: (
      <div className="flex items-center gap-1">
        <span className="font-display font-black text-[#1E3A8A] text-sm tracking-tight">Coffee</span>
        <span className="font-display font-light text-[#FF7A59] text-sm tracking-tight">Meets</span>
        <span className="font-display font-bold text-[#1E3A8A] text-sm tracking-tight">Bagel</span>
      </div>
    ),
    vestiaire: (
      <div className="flex items-center">
        <span className="font-serif font-black text-slate-900 text-sm tracking-widest uppercase">Vestiaire Collective</span>
      </div>
    ),
    anton: (
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-full border-2 border-slate-900 flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-slate-900 rounded-full" />
        </div>
        <span className="font-display font-semibold text-slate-900 text-sm tracking-tight">Anton Payments</span>
      </div>
    ),
    coinflow: (
      <div className="flex items-center gap-1.5">
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-600 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15.5V19h-2v-1.5c-1.4-.2-2.5-1-3.1-2.2l1.6-.9c.4.8 1.1 1.4 1.9 1.5v-3.4l-2.5-.6c-1.3-.3-2.4-1.2-2.4-2.7s.9-2.3 2.1-2.6V5h2v1.5c1.1.2 2 .8 2.5 1.7l-1.5.9c-.3-.5-.8-.9-1.4-1v3.2l2.3.6c1.5.4 2.5 1.3 2.5 2.8s-1 2.4-2.5 2.8zm-2-8.3c-.6.1-1.1.5-1.1,1.1s.4.9.9 1V9.2zm2 4.4c.6-.1 1.1-.5 1.1-1.1s-.4-.9-.9-1v2.1z" />
        </svg>
        <span className="font-display font-bold text-slate-900 text-sm tracking-tight">Coinflow</span>
      </div>
    )
  };

  // Full customer stories database
  const ALL_STORIES: CustomerStory[] = useMemo(() => [
    {
      id: 1,
      company: 'OpenAI',
      industry: 'aiTech',
      useCase: 'kycAml',
      logo: LOGOS.openai,
      text: getStoryText('OpenAI')
    },
    {
      id: 2,
      company: 'Coursera',
      industry: 'edtech',
      useCase: 'kycAml',
      logo: LOGOS.coursera,
      text: getStoryText('Coursera')
    },
    {
      id: 3,
      company: 'Twilio',
      industry: 'aiTech',
      useCase: 'kyb',
      logo: LOGOS.twilio,
      text: getStoryText('Twilio')
    },
    {
      id: 4,
      company: 'Square',
      industry: 'fintech',
      useCase: 'kycAml',
      logo: LOGOS.square,
      text: getStoryText('Square')
    },
    {
      id: 5,
      company: 'Lime',
      industry: 'sharingEconomy',
      useCase: 'ageAssurance',
      logo: LOGOS.lime,
      text: getStoryText('Lime')
    },
    {
      id: 6,
      company: 'Brex',
      industry: 'fintech',
      useCase: 'kycAml',
      logo: LOGOS.brex,
      text: getStoryText('Brex')
    },
    {
      id: 7,
      company: 'Branch',
      industry: 'fintech',
      useCase: 'fraudPrevention',
      logo: LOGOS.branch,
      text: getStoryText('Branch')
    },
    {
      id: 8,
      company: 'WeTravel',
      industry: 'travel',
      useCase: 'kyb',
      logo: LOGOS.wetravel,
      text: getStoryText('WeTravel')
    },
    {
      id: 9,
      company: 'Coffee Meets Bagel',
      industry: 'marketplaces',
      useCase: 'fraudPrevention',
      logo: LOGOS.coffeemeetsbagel,
      text: getStoryText('Coffee Meets Bagel')
    },
    {
      id: 10,
      company: 'Vestiaire Collective',
      industry: 'marketplaces',
      useCase: 'kycAml',
      logo: LOGOS.vestiaire,
      text: getStoryText('Vestiaire Collective')
    },
    {
      id: 11,
      company: 'Anton Payments',
      industry: 'fintech',
      useCase: 'kyb',
      logo: LOGOS.anton,
      text: getStoryText('Anton Payments')
    },
    {
      id: 12,
      company: 'Coinflow',
      industry: 'crypto',
      useCase: 'kycAml',
      logo: LOGOS.coinflow,
      text: getStoryText('Coinflow')
    }
  ], [language, t]);

  // Filtering Logic
  const filteredStories = useMemo(() => {
    let result = ALL_STORIES;
    if (selectedIndustry !== 'all') {
      result = result.filter(story => story.industry === selectedIndustry);
    }
    if (selectedUseCase !== 'all') {
      result = result.filter(story => story.useCase === selectedUseCase);
    }
    return result;
  }, [ALL_STORIES, selectedIndustry, selectedUseCase]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredStories.length / itemsPerPage) || 1;
  const paginatedStories = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredStories.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredStories, currentPage]);

  const handlePageChange = (pageNum: number) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-slate-800 antialiased font-sans">
      
      {/* Back button and breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <button 
          onClick={onBackToLanding}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition font-medium group cursor-pointer"
          id="customers_back_btn"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>{t.backToHome}</span>
        </button>
      </div>

      {/* Hero Header Section */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="max-w-3xl space-y-6 pt-4 pb-12">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#0F1E36] leading-[1.05]" id="customers_hero_title">
            {t.heroTitle}
          </h1>
          <p className="text-slate-600 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-xl">
            {t.heroDesc}
          </p>
        </div>

        {/* Featured Bento Grid exactly like screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* OpenAI Large Card (Full width in top row) */}
          <div className="lg:col-span-12 bg-gradient-to-tr from-[#354CE1] via-[#5F3CF3] to-[#00D4B2] rounded-[32px] p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-xl flex items-stretch">
            {/* Ambient pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)]" />
            <div className="absolute top-1/4 left-1/10 w-48 h-48 bg-yellow-400/25 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/10 w-72 h-72 bg-[#00E5FF]/20 rounded-full blur-3xl" />
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none" />
            
            <div className="w-full lg:max-w-xl bg-white text-slate-950 rounded-[28px] p-8 md:p-12 flex flex-col justify-between space-y-8 shadow-2xl relative z-10">
              <div className="space-y-4">
                {LOGOS.openai}
              </div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-[38px] font-bold tracking-tight text-slate-950 leading-[1.15]">
                {t.featuredOpenAI}
              </h2>
            </div>
            
            {/* Graphic ornament on the right of card */}
            <div className="hidden lg:flex flex-1 items-center justify-center relative">
              <div className="w-44 h-44 bg-white/10 rounded-full blur-3xl absolute" />
              <svg viewBox="0 0 200 200" className="w-48 h-48 text-white/15 fill-current">
                <path d="M100 20C55.8 20 20 55.8 20 100s35.8 80 80 80 80-35.8 80-80S144.2 20 100 20zm0 144c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64z" />
              </svg>
            </div>
          </div>

          {/* Coursera (Greenish Card, wider) */}
          <div className="lg:col-span-7 bg-[#22C55E] rounded-[32px] p-8 md:p-12 relative overflow-hidden shadow-lg shadow-green-500/5 min-h-[360px] flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-44 h-44 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
            
            <div className="bg-white/90 backdrop-blur-sm inline-flex self-start px-4 py-2.5 rounded-2xl shadow-sm">
              {LOGOS.coursera}
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-955 text-white leading-tight mt-12">
              {t.featuredCoursera}
            </h3>
          </div>

          {/* Brex (Purple Card, narrower) */}
          <div className="lg:col-span-5 bg-[#C7D2FE] rounded-[32px] p-8 md:p-12 relative overflow-hidden shadow-lg shadow-indigo-500/5 min-h-[360px] flex flex-col justify-between">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none" />
            
            <div className="bg-white/95 backdrop-blur-sm inline-flex self-start px-4 py-2.5 rounded-2xl shadow-sm">
              {LOGOS.brex}
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-indigo-950 leading-tight mt-12">
              {t.featuredBrex}
            </h3>
          </div>

          {/* Twilio (Cyan Card, narrower) */}
          <div className="lg:col-span-5 bg-[#67E8F9] rounded-[32px] p-8 md:p-12 relative overflow-hidden shadow-lg shadow-cyan-500/5 min-h-[360px] flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
            
            <div className="bg-white/95 backdrop-blur-sm inline-flex self-start px-4 py-2.5 rounded-2xl shadow-sm">
              {LOGOS.twilio}
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-cyan-950 leading-tight mt-12">
              {t.featuredTwilio}
            </h3>
          </div>

          {/* Lime (Yellow Card, wider) */}
          <div className="lg:col-span-7 bg-[#FCD34D] rounded-[32px] p-8 md:p-12 relative overflow-hidden shadow-lg shadow-yellow-500/5 min-h-[360px] flex flex-col justify-between">
            <div className="absolute bottom-0 left-0 w-44 h-44 bg-white/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none" />
            
            <div className="bg-white/95 backdrop-blur-sm inline-flex self-start px-4 py-2.5 rounded-2xl shadow-sm">
              {LOGOS.lime}
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-amber-950 leading-tight mt-12">
              {t.featuredLime}
            </h3>
          </div>

        </div>
      </div>

      {/* Main filterable list & white grid overlapping block */}
      <div className="bg-[#FAFBFD] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20 pb-20">
          
          {/* Filter Bar Panel Card */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-100/40 mb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 border border-slate-100">
                  <Filter className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{t.filters}</h4>
                  <p className="text-[11px] text-slate-400">{t.refineBy}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {/* Industry Selector */}
                <div className="space-y-1.5 min-w-[200px]">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t.industry}</label>
                  <div className="relative">
                    <select
                      value={selectedIndustry}
                      onChange={(e) => {
                        setSelectedIndustry(e.target.value as CustomerIndustryKey);
                        setCurrentPage(1);
                      }}
                      className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 text-xs rounded-xl px-3.5 py-2.5 font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20 cursor-pointer pr-10"
                    >
                      {INDUSTRIES.map(ind => (
                        <option key={ind} value={ind}>{getIndustryLabel(ind)}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Use Case Selector */}
                <div className="space-y-1.5 min-w-[200px]">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t.useCase}</label>
                  <div className="relative">
                    <select
                      value={selectedUseCase}
                      onChange={(e) => {
                        setSelectedUseCase(e.target.value as CustomerUseCaseKey);
                        setCurrentPage(1);
                      }}
                      className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 text-xs rounded-xl px-3.5 py-2.5 font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[#354CE1]/20 cursor-pointer pr-10"
                    >
                      {USE_CASES.map(uc => (
                        <option key={uc} value={uc}>{getUseCaseLabel(uc)}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="font-display text-2xl font-bold text-slate-900 tracking-tight" id="customers_subheading">
              {t.allStoriesTitle}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {t.showingPartners.replace('{filtered}', filteredStories.length.toString()).replace('{total}', ALL_STORIES.length.toString())}
            </p>
          </div>

          {/* Customer Stories Grid */}
          {paginatedStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedStories.map((story) => (
                <div 
                  key={story.id}
                  className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-md transition duration-300 flex flex-col justify-between min-h-[240px] shadow-sm relative group overflow-hidden"
                  id={`customer_story_card_${story.id}`}
                >
                  <div className="space-y-5">
                    {/* Header line with brand logo */}
                    <div className="pb-3 border-b border-slate-50">
                      {story.logo}
                    </div>

                    {/* Descriptive sentence */}
                    <p className="text-slate-600 text-xs leading-relaxed font-normal">
                      {story.text}
                    </p>
                  </div>

                  {/* Micro pill indicators for useCase and industry */}
                  <div className="pt-4 flex flex-wrap gap-1.5 mt-4">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-semibold rounded-md">
                      {getIndustryLabel(story.industry)}
                    </span>
                    <span className="px-2 py-0.5 bg-[#354CE1]/5 text-[#354CE1] text-[9px] font-semibold rounded-md">
                      {getUseCaseLabel(story.useCase)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200/60 p-16 text-center max-w-xl mx-auto space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-slate-400">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">{t.noStoriesFound}</h3>
              <p className="text-slate-500 text-xs leading-normal">
                {t.tryClearingFilters}
              </p>
              <button 
                onClick={() => {
                  setSelectedIndustry('all');
                  setSelectedUseCase('all');
                  setCurrentPage(1);
                }}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition"
              >
                {t.resetFilters}
              </button>
            </div>
          )}

          {/* Interactive Pagination controls exactly like screenshot */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5 pt-12">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-slate-500 text-xs font-semibold hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition"
              >
                {t.prev}
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-8 h-8 rounded-full text-xs font-bold transition ${
                    currentPage === pageNum
                      ? 'bg-[#354CE1] text-white'
                      : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-slate-500 text-xs font-semibold hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition"
              >
                {t.next}
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Ready to get started banner exactly like the purple screenshot banner */}
      <div className="bg-[#FAFBFD] pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#818CF8] text-white rounded-[32px] p-8 md:p-14 lg:p-16 relative overflow-hidden shadow-xl shadow-indigo-950/10">
            {/* Background glowing circle */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-indigo-200/10 rounded-full blur-[60px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl space-y-4">
              <h2 className="font-display text-3xl sm:text-4xl md:text-[44px] font-bold tracking-tight text-white leading-none">
                {t.readyToGetStarted}
              </h2>
              <p className="text-indigo-50 text-sm md:text-base leading-relaxed">
                {t.getInTouch}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button 
                  onClick={onOpenSandbox}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-indigo-600 font-bold rounded-full text-sm shadow-md transition-all hover:shadow-lg"
                  id="customers_cta_demo_btn"
                >
                  <span>{t.getDemo}</span>
                  <ArrowRight className="w-4 h-4 text-indigo-600" />
                </button>
                <button 
                  onClick={onOpenSandbox}
                  className="inline-flex items-center gap-1.5 px-6 py-3.5 text-white hover:text-indigo-100 font-bold text-sm transition"
                  id="customers_cta_sandbox_btn"
                >
                  <span>{t.tryItNow}</span>
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
