import { DEFAULT_LOCALE, isLocale, pathToLocale, type Locale } from '../types/routes';

// Keep the existing key so saved preferences survive this routing fix.
export const LANGUAGE_PREFERENCE_KEY = 'identra_lang';

type PreferenceReader = Pick<Storage, 'getItem'>;
type PreferenceWriter = Pick<Storage, 'setItem'>;

export function getPreferredLanguage(storage?: PreferenceReader): Locale {
  try {
    const reader = storage ?? (typeof window !== 'undefined' ? window.localStorage : undefined);
    const saved = reader?.getItem(LANGUAGE_PREFERENCE_KEY);
    if (saved && isLocale(saved)) return saved;
  } catch {
    // Access to localStorage itself may throw, not just getItem.
  }
  // A browser's language is not an explicit choice made on this website.
  return DEFAULT_LOCALE;
}

export function getPageLanguage(pathname: string, storage?: PreferenceReader): Locale {
  return pathToLocale(pathname) ?? getPreferredLanguage(storage);
}

export function savePreferredLanguage(language: Locale, storage?: PreferenceWriter): void {
  try {
    const writer = storage ?? (typeof window !== 'undefined' ? window.localStorage : undefined);
    writer?.setItem(LANGUAGE_PREFERENCE_KEY, language);
  } catch {
    // Navigation still works when browser storage is unavailable.
  }
}
