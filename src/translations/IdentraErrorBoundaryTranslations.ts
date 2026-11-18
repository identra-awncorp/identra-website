/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface IdentraErrorBoundaryCopy {
  title: string;
  body: string;
  retry: string;
}

export const IDENTRA_ERROR_BOUNDARY_TRANSLATIONS = {
  en: {
    title: 'This part of the page could not be shown',
    body: 'Nothing was sent or saved. Try again, or reload the page.',
    retry: 'Try again',
  },
  es: {
    title: 'No se pudo mostrar esta parte de la página',
    body: 'No se envió ni guardó nada. Inténtelo de nuevo o recargue la página.',
    retry: 'Reintentar',
  },
  ja: {
    title: 'ページのこの部分を表示できませんでした',
    body: '送信や保存は行われていません。もう一度試すか、ページを再読み込みしてください。',
    retry: '再試行',
  },
  de: {
    title: 'Dieser Teil der Seite konnte nicht angezeigt werden',
    body: 'Es wurde nichts gesendet oder gespeichert. Versuchen Sie es erneut oder laden Sie die Seite neu.',
    retry: 'Erneut versuchen',
  },
  vi: {
    title: 'Không hiển thị được phần này của trang',
    body: 'Chưa có gì được gửi hay lưu. Hãy thử lại hoặc tải lại trang.',
    retry: 'Thử lại',
  },
} as const satisfies Record<'en' | 'es' | 'ja' | 'de' | 'vi', IdentraErrorBoundaryCopy>;
