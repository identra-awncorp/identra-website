/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SSI_BLOG_ARTICLE } from './dinh-danh-tu-chu-ssi-la-gi';
import { LIFELONG_LEARNING_BLOG_ARTICLE } from './ho-so-hoc-tap-suot-doi-loi-ich-cua-mo-hinh-dinh-danh-tu-chu-doi-voi-nguoi-hoc';
import { INTERNATIONAL_HIRING_SSI_BLOG_ARTICLE } from './rao-can-phap-ly-trong-tuyen-dung-quoc-te-ssi-mo-duong-cho-nhan-su-remote-nhu-the-nao';
import { SSI_EDUCATION_BLOG_ARTICLE } from './ssi-trong-giao-duc-giai-phap-so-hoa-bang-cap-va-xac-minh-nang-luc';
import type { StructuredBlogArticle } from './structuredBlogArticleModel';
import { MIT_DIGITAL_DIPLOMAS_BLOG_ARTICLE } from './tu-thi-diem-cua-mit-den-lan-song-so-hoa-bang-cap-khong-the-dao-nguoc';

export const STRUCTURED_BLOG_ARTICLES = [
  INTERNATIONAL_HIRING_SSI_BLOG_ARTICLE,
  MIT_DIGITAL_DIPLOMAS_BLOG_ARTICLE,
  LIFELONG_LEARNING_BLOG_ARTICLE,
  SSI_EDUCATION_BLOG_ARTICLE,
  SSI_BLOG_ARTICLE,
] as const satisfies readonly StructuredBlogArticle[];

export type StructuredBlogArticleId = typeof STRUCTURED_BLOG_ARTICLES[number]['id'];

const structuredArticlesById = new Map<string, StructuredBlogArticle>(
  STRUCTURED_BLOG_ARTICLES.map((article) => [article.id, article]),
);

export const getStructuredBlogArticle = (
  id: string,
): StructuredBlogArticle | null => structuredArticlesById.get(id) ?? null;

export const getStructuredBlogSeoMetadata = (
  article: StructuredBlogArticle,
): Pick<StructuredBlogArticle['content']['vi'], 'title' | 'description'> => ({
  title: article.content.vi.title,
  description: article.content.vi.description,
});

export const getRelatedStructuredBlogArticles = (
  article: StructuredBlogArticle,
): StructuredBlogArticle[] => {
  const seenArticleIds = new Set<string>([article.id]);

  return article.relatedArticleIds.flatMap((articleId) => {
    if (seenArticleIds.has(articleId)) return [];

    const relatedArticle = getStructuredBlogArticle(articleId);
    if (!relatedArticle) return [];

    seenArticleIds.add(articleId);
    return [relatedArticle];
  });
};

export const isStructuredBlogArticleId = (
  id: string,
): id is StructuredBlogArticleId => structuredArticlesById.has(id);
