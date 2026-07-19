/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Language } from '../context/LanguageContext';

type NotFoundPageTranslation = {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly backHome: string;
};

export const NOT_FOUND_PAGE_TRANSLATIONS = {
  en: {
    eyebrow: 'Error 404',
    title: 'This page could not be found',
    description: 'The address may be incorrect, or the page may have moved.',
    backHome: 'Back to home',
  },
  es: {
    eyebrow: 'Error 404',
    title: 'No encontramos esta página',
    description: 'Es posible que la dirección sea incorrecta o que la página se haya movido.',
    backHome: 'Volver al inicio',
  },
  ja: {
    eyebrow: '404 エラー',
    title: 'ページが見つかりません',
    description: 'URLが正しくないか、ページが移動した可能性があります。',
    backHome: 'ホームに戻る',
  },
  de: {
    eyebrow: 'Fehler 404',
    title: 'Diese Seite wurde nicht gefunden',
    description: 'Die Adresse ist möglicherweise falsch oder die Seite wurde verschoben.',
    backHome: 'Zur Startseite',
  },
  vi: {
    eyebrow: 'Lỗi 404',
    title: 'Không tìm thấy trang này',
    description: 'Địa chỉ có thể chưa chính xác hoặc trang đã được chuyển sang vị trí khác.',
    backHome: 'Về trang chủ',
  },
} as const satisfies Record<Language, NotFoundPageTranslation>;
