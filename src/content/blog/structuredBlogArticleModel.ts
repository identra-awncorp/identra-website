/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { BlogDetailId, Locale } from '../../types/routes';

export interface BlogArticleListingCopy {
  title: string;
  description: string;
  type: string;
  duration: string;
}

export interface BlogArticleImage {
  src: string;
  srcSet: string;
  sizes: string;
  width: number;
  height: number;
}

export interface BlogArticleTableOfContentsItem {
  id: string;
  label: string;
  level: 2 | 3;
}

export interface StructuredBlogArticleContent {
  title: string;
  description: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  category: string;
  tags: readonly string[];
  readTimeMinutes: number;
  ui: {
    publishedLabel: string;
    authorRole: string;
    tableOfContents: string;
    openTableOfContents: string;
    closeTableOfContents: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaButtonLabel: string;
  };
  tableOfContents: readonly BlogArticleTableOfContentsItem[];
  markdown: string;
}

export interface StructuredBlogArticle {
  id: BlogDetailId;
  slug: BlogDetailId;
  publishedAt: string;
  modifiedAt: string;
  author: {
    type: 'Organization' | 'Person';
    name: string;
  };
  topics: readonly string[];
  industries: readonly string[];
  contentLocales: readonly ['vi'];
  relatedArticleIds: readonly [BlogDetailId, BlogDetailId, BlogDetailId];
  coverImage: BlogArticleImage;
  socialImage: {
    src: string;
    width: number;
    height: number;
    type: 'image/jpeg';
  };
  listing: Record<Locale, BlogArticleListingCopy>;
  images: Record<string, BlogArticleImage>;
  content: {
    vi: StructuredBlogArticleContent;
  };
}
