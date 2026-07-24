/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Instagram, Linkedin, Smile, Star, Twitter } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord, getLocalizedValue } from '../utils/i18nRuntime';
import {
  FOOTER_LEGAL_LINKS,
  FOOTER_SECTIONS,
  FOOTER_TRANSLATIONS,
  type FooterTextKey
} from '../translations/FooterTranslations';

interface FooterProps {
  onOpenSandbox: () => void;
  onViewChange?: (view: AppView) => void;
}

type FooterView = Parameters<NonNullable<FooterProps['onViewChange']>>[0];

export default function Footer({ onOpenSandbox, onViewChange }: FooterProps) {
  const { language } = useLanguage();
  const translations = getLocalizedRecord(FOOTER_TRANSLATIONS, language as keyof typeof FOOTER_TRANSLATIONS, 'FOOTER_TRANSLATIONS');
  const translate = (key: FooterTextKey) => getLocalizedValue(translations, key, language, 'FOOTER_TRANSLATIONS');
  const [unavailableNoticeVisible, setUnavailableNoticeVisible] = useState(false);
  const unavailableNoticeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (unavailableNoticeTimerRef.current !== null) {
        window.clearTimeout(unavailableNoticeTimerRef.current);
      }
    };
  }, []);

  const showUnavailableNotice = () => {
    if (unavailableNoticeTimerRef.current !== null) {
      window.clearTimeout(unavailableNoticeTimerRef.current);
    }

    setUnavailableNoticeVisible(true);
    unavailableNoticeTimerRef.current = window.setTimeout(() => {
      setUnavailableNoticeVisible(false);
      unavailableNoticeTimerRef.current = null;
    }, 3200);
  };

  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, view?: string) => {
    event.preventDefault();

    if (view && onViewChange) {
      onViewChange(view as FooterView);
      return;
    }

    showUnavailableNotice();
  };

  return (
    <>
    {unavailableNoticeVisible && (
      <div
        role="status"
        aria-live="polite"
        className="fixed right-4 bottom-4 z-[100] max-w-xs rounded-2xl border border-white/15 bg-[#06184C] px-4 py-3 text-xs font-semibold text-white shadow-[0_20px_60px_rgba(6,24,76,0.35)] ring-1 ring-[#5B6DFF]/25"
      >
        {translate('pageUnavailableNotice')}
      </div>
    )}
    <footer className="bg-[#5B6DFF] text-white pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="bg-white text-slate-900 rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl md:text-4xl font-display font-bold text-[#0F1E36] tracking-tight">
              {translate('readyToStart')}
            </h3>
            <p className="text-slate-500 text-sm md:text-base">
              {translate('readyToStartDesc')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={onOpenSandbox}
              className="w-full sm:w-auto bg-[#354CE1] hover:bg-[#2539BE] text-white font-semibold text-sm px-6 py-3.5 rounded-full shadow transition"
            >
              {translate('tryDemo')}
            </button>

          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11 gap-8 text-xs text-indigo-100 border-b border-indigo-400/40 pb-12">
          {FOOTER_SECTIONS.map((section) => {
            const titleView = 'titleView' in section ? section.titleView : undefined;
            const isWide = 'wide' in section && section.wide;
            const isCompact = 'compact' in section && section.compact;

            return (
              <div
                key={section.titleKey}
                className={[
                  'space-y-3',
                  isWide ? 'xl:col-span-2' : 'xl:col-span-1'
                ].join(' ')}
              >
                <h4 className="font-bold text-white uppercase tracking-wider text-[10px]">
                  {titleView ? (
                    <a
                      href="#"
                      onClick={(event) => navigate(event, titleView)}
                      className="hover:underline transition"
                    >
                      {translate(section.titleKey)}
                    </a>
                  ) : (
                    translate(section.titleKey)
                  )}
                </h4>
                <ul className={['space-y-2', isCompact ? 'text-[11px]' : ''].join(' ')}>
                  {section.links.map((link) => {
                    const view = 'view' in link ? link.view : undefined;

                    return (
                      <li key={link.key}>
                        <a
                          href="#"
                          onClick={(event) => navigate(event, view)}
                          className="hover:text-white transition"
                        >
                          {translate(link.key)}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="space-y-8 text-xs text-indigo-100">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-indigo-400/40 pb-8">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-center lg:text-left">
              <div className="space-y-1">
                <p className="font-semibold text-white">
                  {translate('gartnerRating')}
                </p>
                <div className="flex gap-0.5 justify-center lg:justify-start">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className="w-3.5 h-3.5 fill-[#FFBF43] text-[#FFBF43]" />
                  ))}
                </div>
              </div>
              <span className="hidden lg:block h-4 w-px bg-indigo-300" />
              <p className="font-medium">
                {translate('g2Reviews')}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <a href="#" onClick={(event) => navigate(event)} className="p-2 hover:bg-indigo-400/20 rounded-full transition text-white">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" onClick={(event) => navigate(event)} className="p-2 hover:bg-indigo-400/20 rounded-full transition text-white">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" onClick={(event) => navigate(event)} className="p-2 hover:bg-indigo-400/20 rounded-full transition text-white">
                <Instagram className="w-4 h-4" />
              </a>
              <span className="text-white font-semibold font-display flex items-center gap-1 select-none">
                <Smile className="w-4.5 h-4.5" />
                {translate('slogan')}
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-[10.5px] text-indigo-200">
            <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2">
              {FOOTER_LEGAL_LINKS.map((link) => {
                const view = 'view' in link ? link.view : undefined;

                return (
                  <a
                    key={link.key}
                    href="#"
                    onClick={(event) => navigate(event, view)}
                    className="hover:text-white transition underline underline-offset-2"
                  >
                    {translate(link.key)}
                  </a>
                );
              })}
            </div>

            <div className="text-center md:text-right font-medium">
              {translate('copyright')}
            </div>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
