/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  ArrowRight, Smile, Heart, Star, Sprout, Timer,
  Mail, Award, ArrowUpRight, Shield, Sparkles, Code, Eye
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { ABOUT_TRANSLATIONS } from '../translations/AboutPageTranslations';
import { motion } from 'motion/react';

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

  // Timeline journey items
  const journeyItems = [
    {
      year: "2022",
      title: t.journey2022Title,
      description: t.journey2022Desc,
      icon: Sparkles,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      year: "2023",
      title: t.journey2023Title,
      description: t.journey2023Desc,
      icon: Shield,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      year: "2026",
      title: t.journey2026Title,
      description: t.journey2026Desc,
      icon: Code,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      year: "2027",
      title: t.journey2027Title,
      description: t.journey2027Desc,
      icon: Award,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ];

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-slate-800 antialiased selection:bg-[#354CE1]/10 selection:text-[#354CE1] relative overflow-hidden">
      {/* Page-Wide Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(53,76,225,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(53,76,225,0.05)_1px,transparent_1px)] bg-[size:5rem_5rem] z-0 pointer-events-none" />

      {/* Top Nav Blending Gradient */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-white via-white/80 to-transparent z-0 pointer-events-none" />

      {/* Multiple Page-Wide Ambient Glow Spotlight Sources */}
      <div className="absolute top-0 -left-40 w-[600px] h-[600px] bg-purple-400/10 rounded-full filter blur-[150px] z-0 pointer-events-none" />
      <div className="absolute top-[25%] -right-40 w-[600px] h-[600px] bg-[#354CE1]/10 rounded-full filter blur-[150px] z-0 pointer-events-none" />
      <div className="absolute top-[50%] -left-40 w-[600px] h-[600px] bg-purple-400/10 rounded-full filter blur-[150px] z-0 pointer-events-none" />
      <div className="absolute top-[75%] -right-40 w-[600px] h-[600px] bg-[#354CE1]/10 rounded-full filter blur-[150px] z-0 pointer-events-none" />
      
      {/* 1. Hero Title Header */}
      <section className="pt-20 pb-16 px-6 max-w-7xl mx-auto text-left relative overflow-hidden">
        <div className="max-w-4xl space-y-6">
          <button 
            onClick={onBackToLanding}
            className="group inline-flex items-center gap-1.5 text-xs font-semibold text-[#354CE1] hover:text-[#2539BE] transition mb-4"
          >
            <span>&larr; {t.backToPlatform}</span>
          </button>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans tracking-tight font-semibold text-slate-900 leading-[1.08] max-w-3xl">
            {t.heroTitleBefore}<span className="font-semibold text-[#354CE1]">{t.heroTitleHighlighted}</span>{t.heroTitleAfter}
          </h1>
        </div>

        {/* Commitment Pastel Accent Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {/* Card 1: Lead by serving */}
          <div className="bg-[#E2FBE9] border border-[#C5F3D1] rounded-3xl p-8 h-72 flex flex-col justify-between hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">{t.commitment1Badge}</span>
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                <Heart className="w-5 h-5 fill-emerald-600/10" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-sans font-semibold text-emerald-950 mb-1">{t.commitment1Title}</h3>
              <p className="text-sm text-emerald-800/80 leading-relaxed font-sans max-w-xs">
                {t.commitment1Desc}
              </p>
            </div>
          </div>

          {/* Card 2: People first */}
          <div className="bg-[#FFEEDB] border border-[#FED7AA] rounded-3xl p-8 h-72 flex flex-col justify-between hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-orange-800 uppercase tracking-wider">{t.commitment2Badge}</span>
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-700">
                <Smile className="w-5 h-5 fill-orange-600/10" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-sans font-semibold text-orange-950 mb-1">{t.commitment2Title}</h3>
              <p className="text-sm text-orange-800/80 leading-relaxed font-sans max-w-xs">
                {t.commitment2Desc}
              </p>
            </div>
          </div>

          {/* Card 3: Work in public */}
          <div className="bg-[#E0F2FE] border border-[#BAE6FD] rounded-3xl p-8 h-72 flex flex-col justify-between hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-sky-800 uppercase tracking-wider">{t.commitment3Badge}</span>
              <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-700">
                <Eye className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-sans font-semibold text-sky-950 mb-1">{t.commitment3Title}</h3>
              <p className="text-sm text-sky-800/80 leading-relaxed font-sans max-w-xs">
                {t.commitment3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Values Grid */}
      <section className="py-28 px-6 relative border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 sm:p-16 shadow-xl relative z-10">
            <div className="max-w-2xl space-y-4 mb-16">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F2F4FF] rounded-full text-[11px] font-semibold text-[#354CE1] uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                <span>{t.ourValuesBadge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-sans font-semibold text-slate-900 tracking-tight">
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
                      <h4 className="text-lg font-semibold text-slate-900 font-sans tracking-tight">
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

      {/* Journey Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-b border-slate-100">
        <div className="max-w-3xl space-y-6 mb-20 text-center mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F2F4FF] rounded-full text-[11px] font-semibold text-[#354CE1] uppercase tracking-wider w-max">
            <span>{t.journeyBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans tracking-tight font-semibold text-[#0F1E36] leading-tight">
            {t.journeyTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-sans font-normal max-w-2xl mx-auto">
            {t.journeyDesc}
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Connecting Line */}
          <div className="absolute left-6 lg:left-1/2 top-8 bottom-8 w-[2px] bg-gradient-to-b from-[#354CE1]/10 via-[#354CE1]/50 to-[#354CE1]/10 transform lg:-translate-x-1/2 z-0" />

          {/* Timeline Items */}
          <div className="space-y-16 relative z-10">
            {journeyItems.map((item, idx) => {
              const Icon = item.icon;
              const isLeft = idx % 2 === 0;
              return (
                <div
                  key={item.year}
                  className={`flex flex-col lg:flex-row items-start lg:items-center justify-between w-full relative ${isLeft ? 'lg:flex-row-reverse' : ''}`}
                >
                  {/* Card Container */}
                  <div className={`w-full lg:w-[45%] pl-12 lg:pl-0 flex ${isLeft ? 'lg:justify-end' : 'lg:justify-start'}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ type: "spring", stiffness: 70, damping: 15, delay: idx * 0.1 }}
                      whileHover={{ y: -6, scale: 1.015 }}
                      className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-md hover:shadow-lg hover:border-[#354CE1]/30 transition-[border-color,box-shadow] duration-300 w-full"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-2xl ${item.bgColor} flex items-center justify-center ${item.color} shadow-inner shrink-0`}>
                          <Icon className="w-5.5 h-5.5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[11px] font-semibold text-[#354CE1] uppercase tracking-wider bg-[#E2E6FF] px-2.5 py-0.5 rounded-full w-max">
                            {item.year}
                          </span>
                          <h3 className="text-lg font-semibold text-[#0F1E36] mt-1 font-sans tracking-tight leading-tight">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed font-sans font-normal">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Timeline Center Dot Indicator */}
                  <div className="absolute left-6 lg:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20 top-8 lg:top-1/2 lg:-translate-y-1/2">
                    <div className="w-8 h-8 rounded-full bg-white border-4 border-[#354CE1] flex items-center justify-center shadow-md relative">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#354CE1] animate-ping absolute opacity-75" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#354CE1]" />
                    </div>
                  </div>

                  {/* Empty Spacer Column for Desktop */}
                  <div className="hidden lg:block w-[45%]" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. In the Press Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Press Info Block */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-sans font-semibold text-slate-900 tracking-tight">
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
                  <span className="text-[11px] font-semibold text-[#354CE1] uppercase tracking-widest">
                    {article.source}
                  </span>
                  <h3 className="text-lg font-sans font-semibold text-slate-800 group-hover:text-[#354CE1] transition leading-snug">
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
      <section className="py-20 px-6 bg-[#FAFBFD] border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-sans font-semibold text-slate-900 tracking-tight">
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
                <h4 className="text-sm font-semibold text-slate-800 leading-tight">{inv.name}</h4>
                <p className="text-[11px] text-slate-400 mt-1 uppercase font-semibold tracking-wider">{inv.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Join Our Team Call to Action */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="bg-[#5B6DFF] rounded-[2.5rem] p-8 sm:p-16 text-white text-left relative overflow-hidden shadow-2xl">
          {/* Decorative shapes */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_60%)]" />
          <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-white/10 rounded-full filter blur-2xl" />
          <div className="absolute left-1/3 top-10 w-48 h-48 bg-white/10 rounded-full filter blur-xl" />

          <div className="max-w-2xl space-y-8 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-sans font-semibold tracking-tight leading-tight">
              {t.joinTeamTitle}
            </h2>
            <p className="text-indigo-50 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
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
