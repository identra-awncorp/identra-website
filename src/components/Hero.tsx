/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import TechGridBg from './TechGridBg';
import { HERO_TRANSLATIONS } from '../translations/HeroTranslations';
import type { AppView } from '../types/routes';

interface HeroProps {
  onOpenSandbox: () => void;
  onViewChange?: (view: AppView) => void;
}

export default function Hero({ onOpenSandbox, onViewChange }: HeroProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(HERO_TRANSLATIONS, language as keyof typeof HERO_TRANSLATIONS, 'HERO_TRANSLATIONS');
  const [activeSlide, setActiveSlide] = useState(1); // Default center slide
  const [isMobile, setIsMobile] = useState(false);

  // Auto-play timer for Large Three-Card Interactive Slider (7 seconds)
  // Recreating the interval on activeSlide change ensures manual clicks/drags reset the timer
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 7000);
    return () => clearInterval(timer);
  }, [activeSlide]);

  // Responsive check for peeking slides
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Slide content setups
  const slides = [
    {
      id: 0,
      content: (
        <img 
          src="https://lh3.googleusercontent.com/d/104Iw6RyjY7su_DQG2hHurO3PU26D6Cu1" 
          alt={t.slideAltVerification} 
          className="w-full h-full object-cover select-none pointer-events-none bg-slate-50"
          referrerPolicy="no-referrer"
        />
      )
    },
    {
      id: 1,
      content: (
        <img 
          src="https://lh3.googleusercontent.com/d/1q2xGXSXHvfnEHRjfFNVs628QVgCXJhUX" 
          alt={t.slideAltDashboard} 
          className="w-full h-full object-cover select-none pointer-events-none bg-slate-50"
          referrerPolicy="no-referrer"
        />
      )
    },
    {
      id: 2,
      content: (
        <img 
          src="https://lh3.googleusercontent.com/d/1c6WmjW3v6iMXlPJxJEIBcaugnU2SqGvq" 
          alt={t.slideAltConsole} 
          className="w-full h-full object-cover select-none pointer-events-none bg-slate-50"
          referrerPolicy="no-referrer"
        />
      )
    }
  ];

  // Dynamically calculate responsive styling for peeking sliders
  const getSlideStyles = (diff: number, isMobile: boolean) => {
    if (diff === 0) {
      return {
        x: '0%',
        scale: 1,
        opacity: 1,
        zIndex: 30,
      };
    } else if (diff === -1) {
      return {
        x: isMobile ? '-78%' : '-72%',
        scale: isMobile ? 0.8 : 0.84,
        opacity: 0.35,
        zIndex: 10,
      };
    } else {
      return {
        x: isMobile ? '78%' : '72%',
        scale: isMobile ? 0.8 : 0.84,
        opacity: 0.35,
        zIndex: 10,
      };
    }
  };

  return (
    <section 
      className="relative overflow-hidden bg-[#FAFBFD] pt-16 pb-24 md:pt-20 md:pb-32"
    >
      {/* High-tech Interactive Cell Grid Background */}
      <TechGridBg />
      
      {/* Container holding centered Hero info */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center stack-hero">
        
        {/* Title */}
        <h1 className="type-display measure-display hero-title-measure text-[#0F1E36] mx-auto">
          {t.keeping ? `${t.keeping} ` : ''}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#354CE1] via-[#5F3CF3] to-[#00D4B2]">
            {t.internetHuman}
          </span>
          {t.titleAfter ? ` ${t.titleAfter}` : ''}
        </h1>

        {/* Description */}
        <p className="type-lead measure-lead text-slate-600 mx-auto">
          {t.heroDesc}
        </p>

        {/* Centered Buttons */}
        <div className="flex flex-row items-center justify-center gap-6 pt-2">
          <button
            onClick={onOpenSandbox}
            className="type-control bg-[#04081E] hover:bg-slate-900 text-white px-6 py-3.5 rounded-full flex items-center justify-center gap-2 transition duration-200 shadow-lg shadow-indigo-100/50 cursor-pointer"
          >
            {t.tryDemo}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onViewChange?.('security')}
            className="type-control text-[#04081E]/70 hover:text-[#04081E] flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            {t.seeTrustChain}
            <ArrowRight className="w-3 h-3 text-slate-400" />
          </button>
        </div>

        {/* Large Slide containing three images */}
        <div className="relative w-full overflow-visible">
          <div className="relative w-full flex items-center justify-center overflow-visible">
            {/* Guide element to force a perfect 16:9 (aspect-video) ratio dynamically on the active center card */}
            <div className="invisible aspect-video w-[85%] sm:w-[85%] md:w-[85%] lg:w-[85%] xl:w-[85%] max-w-5xl pointer-events-none" />
            {slides.map((slide, idx) => {
              let diff = idx - activeSlide;
              if (diff === -2) diff = 1;
              if (diff === 2) diff = -1;

              const style = getSlideStyles(diff, isMobile);

              return (
                <motion.div
                  key={slide.id}
                  onClick={() => setActiveSlide(slide.id)}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.4}
                  onDragEnd={(event, info) => {
                    const swipeThreshold = 50;
                    if (info.offset.x < -swipeThreshold) {
                      // Swiped left -> next slide
                      setActiveSlide((prev) => (prev + 1) % 3);
                    } else if (info.offset.x > swipeThreshold) {
                      // Swiped right -> previous slide
                      setActiveSlide((prev) => (prev + 2) % 3);
                    }
                  }}
                  className="absolute w-[85%] sm:w-[85%] md:w-[85%] lg:w-[85%] xl:w-[85%] max-w-5xl h-full cursor-grab active:cursor-grabbing rounded-3xl overflow-hidden select-none shadow-xl border border-slate-100/50 bg-white"
                  animate={style}
                  transition={{
                    type: 'spring',
                    stiffness: 120,
                    damping: 20,
                    mass: 1,
                  }}
                >
                  <div className="w-full h-full pointer-events-none">
                    {slide.content}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
