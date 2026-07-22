/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle, Lock } from 'lucide-react';
import TechGridBg from './TechGridBg';
import { HERO_TRANSLATIONS } from '../translations/HeroTranslations';

interface HeroProps {
  onOpenSandbox: () => void;
}

// 3D Flipping Logo Card Component
function FlippingLogo({ 
  front, 
  back, 
  isFlipped, 
  index 
}: { 
  front: React.ReactNode; 
  back: React.ReactNode; 
  isFlipped: boolean; 
  index: number; 
}) {
  const [localFlipped, setLocalFlipped] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLocalFlipped(isFlipped);
    }, index * 100); // Staggered delays
    return () => clearTimeout(timer);
  }, [isFlipped, index]);

  return (
    <div className="relative w-full h-20 flex items-center justify-center [perspective:1000px] select-none">
      <motion.div
        className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d]"
        animate={{ rotateX: localFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 flex items-center justify-center [backface-visibility:hidden]">
          {front}
        </div>
        
        {/* Back Side */}
        <div className="absolute inset-0 flex items-center justify-center [backface-visibility:hidden] [transform:rotateX(180deg)]">
          {back}
        </div>
      </motion.div>
    </div>
  );
}

const FRONT_PARTNER_LOGOS = [
  { id: 'vingroup', name: 'Vingroup' },
  { id: 'vietcombank', name: 'Vietcombank' },
  { id: 'viettel', name: 'Viettel' },
  { id: 'vpbank', name: 'VPBank' },
  { id: 'mbbank', name: 'MBBank' },
  { id: 'hoaphat', name: 'Hoa Phat' }
] as const;

const BACK_PARTNER_LOGOS = [
  { id: 'vietjet', name: 'VIETJET' },
  { id: 'masan', name: 'Masan' },
  { id: 'fpt', name: 'FPT' },
  { id: 'cellphones', name: 'CellphoneS' },
  { id: 'vinamilk', name: 'Vinamilk' },
  { id: 'vccorp', name: 'VCCorp' }
] as const;

function PartnerLogo({ name }: { name: string }) {
  return (
    <div className="flex h-20 w-full items-center justify-center px-1 text-slate-400 transition-colors hover:text-slate-600">
      <span className="block whitespace-nowrap text-center font-sans text-base font-extrabold leading-none text-current sm:text-lg lg:text-xl">
        {name}
      </span>
    </div>
  );
}

export default function Hero({ onOpenSandbox }: HeroProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(HERO_TRANSLATIONS, language as keyof typeof HERO_TRANSLATIONS, 'HERO_TRANSLATIONS');
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeSlide, setActiveSlide] = useState(1); // Default center slide
  const [isMobile, setIsMobile] = useState(false);

  // Auto-flip partner logos periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

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
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center space-y-6 md:space-y-8">
        
        {/* Title */}
        <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-[#0F1E36] leading-[1.08] max-w-5xl lg:max-w-none mx-auto">
          {t.keeping}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#354CE1] via-[#5F3CF3] to-[#00D4B2]">
            {t.internetHuman}
          </span>
        </h1>

        {/* Description */}
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-sans">
          {t.heroDesc}
        </p>

        {/* Centered Buttons */}
        <div className="flex flex-row items-center justify-center gap-6 pt-2">
          <button
            onClick={onOpenSandbox}
            className="bg-[#04081E] hover:bg-slate-900 text-white font-semibold text-xs px-6 py-3.5 rounded-full flex items-center justify-center gap-2 transition duration-200 shadow-lg shadow-indigo-100/50 cursor-pointer"
          >
            {t.getDemo}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <a
            href="#platform-solution"
            className="text-[#04081E]/70 hover:text-[#04081E] font-semibold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            {t.seePlatform}
            <ArrowRight className="w-3 h-3 text-slate-400" />
          </a>
        </div>

        {/* Trust Banner Logos with vertical flip effect */}
        <div className="max-w-5xl mx-auto mb-0 mt-16 md:mt-24">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 items-center justify-items-center gap-y-4 md:gap-y-6 py-4 md:py-6">
            {FRONT_PARTNER_LOGOS.map((logo, idx) => (
              <div 
                key={logo.id} 
                className="w-full px-2 flex items-center justify-center"
              >
                <FlippingLogo 
                  front={<PartnerLogo name={logo.name} />}
                  back={<PartnerLogo name={BACK_PARTNER_LOGOS[idx].name} />}
                  isFlipped={isFlipped} 
                  index={idx} 
                />
              </div>
            ))}
          </div>
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

        {/* Subtle certifications footer */}
        <div className="flex items-center justify-center gap-8 text-[11px] text-slate-400 font-mono pt-4">
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            {t.soc2}
          </span>
          <span className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-indigo-500" />
            {t.gdpr}
          </span>
        </div>

      </div>
    </section>
  );
}
