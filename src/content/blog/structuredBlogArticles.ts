/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { EUROPE_SSI_SHIFT_BLOG_ARTICLE } from './chau-au-dang-dan-dau-cuoc-chuyen-dich-sang-dinh-danh-tu-chu';
import { SSI_BLOG_ARTICLE } from './dinh-danh-tu-chu-ssi-la-gi';
import { DID_EXPLAINER_BLOG_ARTICLE } from './did-la-gi';
import { DATA_TRUST_AI_ECONOMY_BLOG_ARTICLE } from './giai-bai-toan-niem-tin-du-lieu-de-phat-trien-kinh-te-so-kinh-te-ai';
import { LIFELONG_LEARNING_BLOG_ARTICLE } from './ho-so-hoc-tap-suot-doi-loi-ich-cua-mo-hinh-dinh-danh-tu-chu-doi-voi-nguoi-hoc';
import { ONLINE_FRAUD_DATA_PROTECTION_BLOG_ARTICLE } from './lua-dao-truc-tuyen-va-bai-toan-bao-ve-du-lieu-ca-nhan-trong-thoi-dai-so';
import { GDPR_TO_SSI_EU_DATA_CONTROL_BLOG_ARTICLE } from './tu-gdpr-den-ssi-vi-sao-chau-au-lai-muon-trao-quyen-kiem-soat-du-lieu-cho-nguoi-dung';
import { INTERNATIONAL_HIRING_SSI_BLOG_ARTICLE } from './rao-can-phap-ly-trong-tuyen-dung-quoc-te-ssi-mo-duong-cho-nhan-su-remote-nhu-the-nao';
import { DATA_BREACHES_SSI_BLOG_ARTICLE } from './ro-ri-du-lieu-tai-trung-quoc-va-an-do-bai-hoc-ve-an-ninh-du-lieu-va-cach-ssi-thay-doi-cach-chung-ta-bao-ve-thong-tin';
import { VIETNAM_EU_EXPORT_BLOG_ARTICLE } from './ssi-blockchain-va-tuong-lai-xuat-khau-hang-hoa-viet-nam-sang-eu';
import { SSI_EDUCATION_BLOG_ARTICLE } from './ssi-trong-giao-duc-giai-phap-so-hoa-bang-cap-va-xac-minh-nang-luc';
import type { StructuredBlogArticle } from './structuredBlogArticleModel';
import {
  getStructuredBlogSeoProfile,
  type StructuredBlogSeoProfile,
} from './structuredBlogSeoProfiles';
import { MIT_DIGITAL_DIPLOMAS_BLOG_ARTICLE } from './tu-thi-diem-cua-mit-den-lan-song-so-hoa-bang-cap-khong-the-dao-nguoc';
import { PRODUCT_TRACEABILITY_BLOG_ARTICLE } from './tuong-lai-cua-xac-thuc-va-truy-xuat-nguon-goc-san-pham';
import { VERIFIABLE_CREDENTIAL_EXPLAINER_BLOG_ARTICLE } from './thuc-chung-la-gi';
import { SELECTIVE_DISCLOSURE_EXPLAINER_BLOG_ARTICLE } from './tiet-lo-co-chon-loc-la-gi';
import { ULTRA_APP_BLOG_ARTICLE } from './vuot-xa-super-app-ky-nguyen-ultra-app';
import { TRUST_WALLET_EXPLAINER_BLOG_ARTICLE } from './vi-dinh-tin-la-gi';

const structuredBlogArticleRegistry = [
  GDPR_TO_SSI_EU_DATA_CONTROL_BLOG_ARTICLE,
  ONLINE_FRAUD_DATA_PROTECTION_BLOG_ARTICLE,
  DATA_BREACHES_SSI_BLOG_ARTICLE,
  SELECTIVE_DISCLOSURE_EXPLAINER_BLOG_ARTICLE,
  VERIFIABLE_CREDENTIAL_EXPLAINER_BLOG_ARTICLE,
  TRUST_WALLET_EXPLAINER_BLOG_ARTICLE,
  DID_EXPLAINER_BLOG_ARTICLE,
  DATA_TRUST_AI_ECONOMY_BLOG_ARTICLE,
  EUROPE_SSI_SHIFT_BLOG_ARTICLE,
  VIETNAM_EU_EXPORT_BLOG_ARTICLE,
  ULTRA_APP_BLOG_ARTICLE,
  PRODUCT_TRACEABILITY_BLOG_ARTICLE,
  INTERNATIONAL_HIRING_SSI_BLOG_ARTICLE,
  MIT_DIGITAL_DIPLOMAS_BLOG_ARTICLE,
  LIFELONG_LEARNING_BLOG_ARTICLE,
  SSI_EDUCATION_BLOG_ARTICLE,
  SSI_BLOG_ARTICLE,
] as const satisfies readonly StructuredBlogArticle[];

export type StructuredBlogArticleId =
  typeof structuredBlogArticleRegistry[number]['id'];

export const STRUCTURED_BLOG_ARTICLES: readonly (
  StructuredBlogArticle & { readonly id: StructuredBlogArticleId }
)[] = structuredBlogArticleRegistry;

const structuredArticlesById = new Map<string, StructuredBlogArticle>(
  STRUCTURED_BLOG_ARTICLES.map((article) => [article.id, article]),
);

export const getStructuredBlogArticle = (
  id: string,
): StructuredBlogArticle | null => structuredArticlesById.get(id) ?? null;

export const getStructuredBlogSeoMetadata = (
  article: StructuredBlogArticle,
): StructuredBlogSeoProfile => {
  const profile = getStructuredBlogSeoProfile(article.id);

  if (!profile) {
    throw new Error(`Missing SEO profile for structured blog article: ${article.id}`);
  }

  return profile;
};

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
