/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useCallback, useContext, useEffect, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  DEFAULT_LOCALE,
  isLocale,
  pathToLocale,
  replacePathLocale,
  type Locale,
} from '../types/routes';

export type Language = Locale;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const getPreferredLanguage = (): Language => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return DEFAULT_LOCALE;
  }

  try {
    const saved = localStorage.getItem('identra_lang');
    if (saved && isLocale(saved)) {
      return saved;
    }
  } catch {
    // Ignore localStorage errors
  }

  const locales = [
    ...(navigator.languages || []),
    navigator.language
  ].filter(Boolean);

  for (const locale of locales) {
    const langPrefix = locale.split('-')[0].split('_')[0].toLowerCase();
    if (isLocale(langPrefix)) {
      return langPrefix;
    }
  }

  return DEFAULT_LOCALE;
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const language = pathToLocale(location.pathname) ?? getPreferredLanguage();

  useEffect(() => {
    try {
      localStorage.setItem('identra_lang', language);
    } catch {
      // Ignore localStorage errors
    }
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    try {
      localStorage.setItem('identra_lang', lang);
    } catch {
      // Ignore localStorage errors
    }

    navigate(
      {
        pathname: replacePathLocale(location.pathname, lang),
        search: location.search,
        hash: location.hash,
      },
    );
  }, [location.hash, location.pathname, location.search, navigate]);

  return (
    <LanguageContext.Provider key={language} value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
