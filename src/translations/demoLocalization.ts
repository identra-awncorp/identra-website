import { getLocalizedValue } from '../utils/i18nRuntime';

export type DemoLanguage = 'en' | 'es' | 'ja' | 'de' | 'vi';

export type LocalizedText = Record<DemoLanguage, string>;

export const DEMO_LANGUAGES: DemoLanguage[] = ['en', 'es', 'ja', 'de', 'vi'];
const DEMO_LANGUAGE_LOOKUP: Record<DemoLanguage, DemoLanguage> = {
  en: 'en',
  es: 'es',
  ja: 'ja',
  de: 'de',
  vi: 'vi',
};

export const getDemoLanguage = (language: string): DemoLanguage =>
  getLocalizedValue(DEMO_LANGUAGE_LOOKUP, language as DemoLanguage, language, 'demoLocalization.languages');

export const getLocalizedText = (copy: LocalizedText, language: string): string =>
  getLocalizedValue(copy, getDemoLanguage(language), language, 'demoLocalization.copy');

export const formatDemoText = (
  template: string,
  values: Record<string, string | number>
): string => template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ''));
