/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations } from '../translations/LanguageContextTranslations';
import { getLocalizedValue } from '../utils/i18nRuntime';

export type Language = 'en' | 'es' | 'ja' | 'de' | 'vi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['en']) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined' || !navigator) {
    return 'en';
  }

  // Check localStorage first for saved preference
  try {
    const saved = localStorage.getItem('identra_lang');
    if (saved && ['en', 'es', 'ja', 'de', 'vi'].includes(saved)) {
      return saved as Language;
    }
  } catch (e) {
    // Ignore localStorage errors
  }

  // Fall back to browser locale detection
  const locales = [
    ...(navigator.languages || []),
    navigator.language
  ].filter(Boolean);

  for (const locale of locales) {
    const langPrefix = locale.split('-')[0].split('_')[0].toLowerCase();
    if (['en', 'es', 'ja', 'de', 'vi'].includes(langPrefix)) {
      return langPrefix as Language;
    }
  }

  return 'en';
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('identra_lang', lang);
    } catch (e) {
      // Ignore localStorage errors
    }
  };

  const t = (key: keyof typeof translations['en']): string => {
    return getLocalizedValue(translations[language], key, language, 'LanguageContextTranslations');
  };

  return (
    <LanguageContext.Provider key={language} value={{ language, setLanguage, t }}>
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
