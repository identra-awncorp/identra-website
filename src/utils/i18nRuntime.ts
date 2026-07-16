/**
 * Runtime guards for localized copy. Missing translations should be visible
 * during development instead of silently falling back to English.
 */
const reportedMissingTranslations = new Set<string>();

const reportMissingTranslation = (scope: string, language: string, key: string): string => {
  const message = `[i18n] Missing translation: ${scope}.${key} for locale "${language}"`;

  if (!reportedMissingTranslations.has(message)) {
    reportedMissingTranslations.add(message);
    console.error(message);
  }

  const isDev = (import.meta as { env?: { DEV?: boolean } }).env?.DEV;

  if (isDev) {
    throw new Error(message);
  }

  return '';
};

export const getLocalizedRecord = <
  Dictionaries extends Record<PropertyKey, unknown>,
  Locale extends keyof Dictionaries,
>(
  dictionaries: Dictionaries,
  language: Locale,
  scope: string,
): NonNullable<Dictionaries[Locale]> => {
  const dictionary = dictionaries[language];

  if (dictionary !== undefined && dictionary !== null) {
    return dictionary as NonNullable<Dictionaries[Locale]>;
  }

  return reportMissingTranslation(scope, String(language), '__locale__') as unknown as NonNullable<Dictionaries[Locale]>;
};

export const getLocalizedValue = <
  Dictionary extends object,
  Key extends keyof Dictionary,
>(
  dictionary: Dictionary,
  key: Key,
  language: string,
  scope: string,
): NonNullable<Dictionary[Key]> => {
  const value = dictionary[key];

  if (value !== undefined && value !== null && value !== '') {
    return value as NonNullable<Dictionary[Key]>;
  }

  return reportMissingTranslation(scope, language, String(key)) as NonNullable<Dictionary[Key]>;
};
