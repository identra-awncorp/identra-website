/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const WHITE_PAPER_PDF_PATH = '/white-paper/Identra-White-Paper-v1.0.pdf';
export const WHITE_PAPER_PDF_FILENAME = 'Identra-White-Paper-v1.0.pdf';

export const WHITE_PAPER_SEO_PROFILE = {
  title: 'Sách trắng Identra: Thực chứng và hợp đồng thông minh',
  description: 'Khám phá tầm nhìn Identra về dữ liệu có thể kiểm chứng, hợp đồng thông minh và hạ tầng danh tính số cho những giao dịch đáng tin cậy.',
  headline: 'Sách trắng Identra: Siêu ứng dụng cho dữ liệu có thể kiểm chứng và giao dịch bằng hợp đồng thông minh',
  imageAlt: 'Identra kết nối dữ liệu có thể kiểm chứng với hợp đồng thông minh',
  version: '1.0',
  publishedAt: '2026-07-22',
  modifiedAt: '2026-07-22',
  author: {
    type: 'Organization',
    name: 'AwnCorp / Identra',
  },
  articleSection: 'Sách trắng',
  searchIntent: {
    primary: 'sách trắng Identra',
    secondary: [
      'dữ liệu có thể kiểm chứng',
      'thực chứng số có thể xác minh',
      'giao dịch bằng hợp đồng thông minh',
      'hạ tầng danh tính số',
    ],
  },
  about: [
    'Identra',
    'Dữ liệu có thể kiểm chứng',
    'Thực chứng',
    'Hợp đồng thông minh',
    'Hạ tầng danh tính số',
  ],
} as const;

export const getWhitePaperSearchTerms = (): readonly string[] => [
  WHITE_PAPER_SEO_PROFILE.searchIntent.primary,
  ...WHITE_PAPER_SEO_PROFILE.searchIntent.secondary,
];
