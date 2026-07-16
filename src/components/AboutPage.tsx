/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  ArrowRight, Smile, Heart, Star, Sprout, Timer, Users, 
  ExternalLink, Mail, Award, ArrowUpRight, Shield, Sparkles, Hand, Code, Eye
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { ABOUT_TRANSLATIONS } from '../translations/AboutPageTranslations';

interface AboutPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
}

export default function AboutPage({ onOpenSandbox, onBackToLanding }: AboutPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(ABOUT_TRANSLATIONS, language as keyof typeof ABOUT_TRANSLATIONS, 'ABOUT_TRANSLATIONS');

  // Values data as shown in the Identra About page
  const values = [
    {
      title: t.value1Title,
      description: t.value1Desc,
      icon: Smile,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
    },
    {
      title: t.value2Title,
      description: t.value2Desc,
      icon: Star,
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
    {
      title: t.value3Title,
      description: t.value3Desc,
      icon: Heart,
      bgColor: 'bg-rose-50',
      iconColor: 'text-rose-600',
    },
    {
      title: t.value4Title,
      description: t.value4Desc,
      icon: Eye,
      bgColor: 'bg-sky-50',
      iconColor: 'text-sky-600',
    },
    {
      title: t.value5Title,
      description: t.value5Desc,
      icon: Sprout,
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    },
    {
      title: t.value6Title,
      description: t.value6Desc,
      icon: Timer,
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
    },
  ];

  // Press headlines as shown in the Identra About page
  const pressArticles = [
    {
      headline: t.press1Headline,
      source: "Forbes",
      url: "#"
    },
    {
      headline: t.press2Headline,
      source: "Fast Company",
      url: "#"
    },
    {
      headline: t.press3Headline,
      source: "TechCrunch",
      url: "#"
    },
    {
      headline: t.press4Headline,
      source: "VentureBeat",
      url: "#"
    },
    {
      headline: t.press5Headline,
      source: "Fortune",
      url: "#"
    }
  ];

  // Prominent investors of Identra
  const investors = [
    { name: "Founders Fund", description: t.seriesC },
    { name: "Coatue Management", description: t.seriesB },
    { name: "Index Ventures", description: t.seriesA },
    { name: "Meritech Capital Partners", description: t.growthPartner },
    { name: "Bond Capital", description: t.lateStage },
    { name: "Venrock", description: t.seedPartner }
  ];

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-slate-800 antialiased selection:bg-[#354CE1]/10 selection:text-[#354CE1]">
      
      {/* 1. Hero Title Header */}
      <section className="pt-20 pb-16 px-6 max-w-7xl mx-auto text-left relative overflow-hidden">
        <div className="max-w-4xl space-y-6">
          <button 
            onClick={onBackToLanding}
            className="group inline-flex items-center gap-1.5 text-xs font-semibold text-[#354CE1] hover:text-[#2539BE] transition mb-4"
          >
            <span>&larr; {t.backToPlatform}</span>
          </button>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-sans tracking-tight font-light text-slate-900 leading-[1.08] max-w-3xl">
            {t.heroTitleBefore}<span className="font-medium text-[#354CE1]">{t.heroTitleHighlighted}</span>{t.heroTitleAfter}
          </h1>
        </div>

        {/* Commitment Pastel Accent Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {/* Card 1: Lead by serving */}
          <div className="bg-[#E2FBE9] border border-[#C5F3D1] rounded-3xl p-8 h-72 flex flex-col justify-between hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex justify-between items-start">
              <span className="text-sm font-semibold text-emerald-800 uppercase tracking-wider">{t.commitment1Badge}</span>
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                <Heart className="w-5 h-5 fill-emerald-600/10" />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-sans font-normal text-emerald-950 mb-1">{t.commitment1Title}</h3>
              <p className="text-xs text-emerald-800/80 leading-relaxed font-sans max-w-xs">
                {t.commitment1Desc}
              </p>
            </div>
          </div>

          {/* Card 2: People first */}
          <div className="bg-[#FFEEDB] border border-[#FED7AA] rounded-3xl p-8 h-72 flex flex-col justify-between hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex justify-between items-start">
              <span className="text-sm font-semibold text-orange-800 uppercase tracking-wider">{t.commitment2Badge}</span>
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-700">
                <Smile className="w-5 h-5 fill-orange-600/10" />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-sans font-normal text-orange-950 mb-1">{t.commitment2Title}</h3>
              <p className="text-xs text-orange-800/80 leading-relaxed font-sans max-w-xs">
                {t.commitment2Desc}
              </p>
            </div>
          </div>

          {/* Card 3: Work in public */}
          <div className="bg-[#E0F2FE] border border-[#BAE6FD] rounded-3xl p-8 h-72 flex flex-col justify-between hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex justify-between items-start">
              <span className="text-sm font-semibold text-sky-800 uppercase tracking-wider">{t.commitment3Badge}</span>
              <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-700">
                <Eye className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-sans font-normal text-sky-950 mb-1">{t.commitment3Title}</h3>
              <p className="text-xs text-sky-800/80 leading-relaxed font-sans max-w-xs">
                {t.commitment3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Middle Lilac/Periwinkle Section with Illustration and Statement */}
      <section className="bg-[#5B6DFF]/15 py-24 px-6 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-300/30 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#354CE1]/20 rounded-full filter blur-3xl" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Text Statement block */}
          <div className="lg:col-span-6 space-y-12">
            <div className="space-y-6">
              <p className="text-[#354CE1] text-xs font-bold uppercase tracking-wider">{t.ourMissionBadge}</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-light text-slate-900 leading-tight">
                {t.ourMissionTitle}
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="h-[2px] w-20 bg-[#354CE1]" />
              <p className="text-xl sm:text-2xl font-light text-slate-700 leading-relaxed">
                {t.ourMissionDesc}
              </p>
            </div>
          </div>

          {/* Large illustration block */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative group max-w-xl w-full">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#354CE1] to-purple-500 rounded-[2rem] opacity-25 group-hover:opacity-40 blur transition duration-500" />
              <div className="relative bg-white border border-slate-100 p-3 rounded-[2rem] shadow-xl overflow-hidden">
                <img 
                  src="/src/assets/images/identra_identity_illustration_1783335932193.jpg" 
                  alt="Identra Identity Verification Concept Illustration" 
                  referrerPolicy="no-referrer"
                  className="rounded-[1.5rem] w-full object-cover aspect-[3/2] transform hover:scale-[1.02] transition duration-500"
                />
              </div>
            </div>
          </div>

        </div>

        {/* 3. Core Values Grid - nested inside a massive elegant white container */}
        <div className="max-w-7xl mx-auto mt-28">
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 sm:p-16 shadow-xl relative z-10">
            <div className="max-w-2xl space-y-4 mb-16">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F2F4FF] rounded-full text-[11px] font-bold text-[#354CE1] uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                <span>{t.ourValuesBadge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-sans font-bold text-slate-900 tracking-tight">
                {t.ourValuesTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {values.map((v, index) => {
                const IconComponent = v.icon;
                return (
                  <div key={index} className="space-y-4 flex flex-col justify-start">
                    <div className={`w-12 h-12 rounded-2xl ${v.bgColor} flex items-center justify-center ${v.iconColor} shadow-inner`}>
                      <IconComponent className="w-5.5 h-5.5" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-slate-900 font-sans tracking-tight">
                        {v.title}
                      </h4>
                      <p className="text-sm text-slate-500 leading-relaxed font-sans font-normal">
                        {v.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </section>

      {/* 4. In the Press Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Press Info Block */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-sans font-light text-slate-900 tracking-tight">
              {t.inThePressTitle}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              {t.pressInquiriesText}{' '}
              <a 
                href="mailto:pr@withidentra.com" 
                className="text-[#354CE1] font-semibold hover:underline inline-flex items-center gap-1"
              >
                pr@withidentra.com
                <Mail className="w-3.5 h-3.5 inline" />
              </a>
            </p>
          </div>

          {/* Press Articles List */}
          <div className="lg:col-span-8 divide-y divide-slate-100 border-t border-b border-slate-100">
            {pressArticles.map((article, index) => (
              <a 
                key={index}
                href={article.url}
                className="group py-6 block flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition hover:bg-slate-50/50 px-2 rounded-xl"
              >
                <div className="space-y-1 max-w-2xl">
                  <span className="text-[10px] font-bold text-[#354CE1] uppercase tracking-widest">
                    {article.source}
                  </span>
                  <h3 className="text-lg font-sans font-medium text-slate-800 group-hover:text-[#354CE1] transition leading-snug">
                    {article.headline}
                  </h3>
                </div>
                <div className="text-slate-400 group-hover:text-[#354CE1] transition self-start sm:self-center">
                  <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition duration-200" />
                </div>
              </a>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Our Investors Section */}
      <section className="py-20 px-6 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-sans font-light text-slate-900 tracking-tight">
              {t.ourInvestorsTitle}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              {t.ourInvestorsDesc}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 pt-4">
            {investors.map((inv, idx) => (
              <div 
                key={idx}
                className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-sm hover:shadow transition duration-200"
              >
                <Award className="w-6 h-6 text-[#354CE1]/60 mb-2" />
                <h4 className="text-sm font-bold text-slate-800 leading-tight">{inv.name}</h4>
                <p className="text-[10px] text-slate-400 mt-1 uppercase font-semibold tracking-wider">{inv.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Join Our Team Call to Action */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="bg-gradient-to-tr from-[#354CE1] via-[#5F3CF3] to-[#00D4B2] rounded-[2.5rem] p-8 sm:p-16 text-white text-left relative overflow-hidden shadow-2xl">
          {/* Decorative shapes */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)]" />
          <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-yellow-400/20 rounded-full filter blur-2xl" />
          <div className="absolute left-1/3 top-10 w-48 h-48 bg-indigo-400/20 rounded-full filter blur-xl" />

          <div className="max-w-2xl space-y-8 relative z-10">
            <h2 className="text-4xl sm:text-5xl font-sans font-normal tracking-tight leading-tight">
              {t.joinTeamTitle}
            </h2>
            <p className="text-indigo-50 text-lg leading-relaxed max-w-xl font-light">
              {t.joinTeamDesc}
            </p>
            <div>
              <button 
                onClick={onOpenSandbox}
                className="group bg-white hover:bg-slate-50 text-[#354CE1] font-semibold text-sm px-6 py-3.5 rounded-full inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>{t.seeOpenPositions}</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition duration-200" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
