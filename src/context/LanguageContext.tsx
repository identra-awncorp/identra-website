/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useCallback, useContext, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  localizePath,
  pathToView,
  replacePathLocale,
  type Locale,
} from '../types/routes';
import { getPageLanguage, savePreferredLanguage } from '../utils/languagePreference';

export type Language = Locale;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const language = getPageLanguage(location.pathname);
  // Editor selections are local UI state, so locale changes must not remount dashboard tools.
  const providerKey = pathToView(location.pathname) === 'dashboard'
    ? 'dashboard'
    : language;

  const setLanguage = useCallback((lang: Language) => {
    // Persist only a deliberate selection, never a locale inferred from a link.
    savePreferredLanguage(lang);

    navigate(
      {
        pathname: localizePath(location.pathname, lang)
          ?? replacePathLocale(location.pathname, lang),
        search: location.search,
        hash: location.hash,
      },
    );
  }, [location.hash, location.pathname, location.search, navigate]);

  return (
    <LanguageContext.Provider key={providerKey} value={{ language, setLanguage }}>
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
