import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import test from 'node:test';

import {
  EUDI_WALLET_2026_2027_BLOG_ARTICLE,
  EUDI_WALLET_2026_2027_BLOG_ARTICLE_ID,
} from '../src/content/blog/eudi-wallet-buoc-vao-doi-song-2026-2027-va-buoc-ngoat-dinh-danh-so-tai-chau-au.ts';
import {
  getStructuredBlogArticle,
  STRUCTURED_BLOG_ARTICLES,
} from '../src/content/blog/structuredBlogArticles.ts';
import { SUPPORTED_LOCALES } from '../src/types/routes.ts';

const EXPECTED_TITLE =
  'EUDI Wallet bước vào đời sống: 2026–2027 và bước ngoặt của định danh số Châu Âu';

test('EUDI Wallet 2026–2027 article exposes localized listing metadata and Vietnamese content', () => {
  const article = EUDI_WALLET_2026_2027_BLOG_ARTICLE;

  assert.equal(article.id, EUDI_WALLET_2026_2027_BLOG_ARTICLE_ID);
  assert.deepEqual(Object.keys(article.listing), [...SUPPORTED_LOCALES]);
  assert.deepEqual(article.contentLocales, ['vi']);
  assert.deepEqual(Object.keys(article.content), ['vi']);
  assert.equal(article.content.vi.title, EXPECTED_TITLE);
  assert.equal(article.listing.vi.title, EXPECTED_TITLE);
  assert.equal(getStructuredBlogArticle(article.id), article);
  assert.equal(STRUCTURED_BLOG_ARTICLES[0], article);
});

test('EUDI Wallet 2026–2027 article preserves the source structure and uses four optimized images', () => {
  const article = EUDI_WALLET_2026_2027_BLOG_ARTICLE;
  const content = article.content.vi;
  const imageMatches = content.markdown.match(/!\[[^\]]+\]\([^)]+\.webp\)/g) ?? [];

  assert.equal(content.markdown.startsWith('---'), false);
  assert.equal(content.markdown.startsWith('# '), false);
  assert.equal(/^---$/m.test(content.markdown), false);
  assert.equal(content.markdown.includes('### Thông tin xuất bản'), false);
  assert.equal(imageMatches.length, 4);
  assert.equal(Object.keys(article.images).length, 4);
  assert.match(content.markdown, /sáu chương trình thử nghiệm quy mô lớn đã quy tụ khoảng 550 tổ chức/);
  assert.match(content.markdown, /Các nền tảng số rất lớn \(VLOPs\)/);
  assert.match(content.markdown, /European Business Wallets dành cho doanh nghiệp/);

  for (const [source, image] of Object.entries(article.images)) {
    assert.equal(image.width, 1440);
    assert.equal(image.height, 810);
    assert.match(image.srcSet, /800w/);
    assert.match(image.srcSet, /1440w/);
    assert.equal(existsSync(`public${source}`), true);
  }

  const firstMarkdownImageSource = imageMatches[0].match(/\(([^)]+)\)/)?.[1];
  const firstMarkdownImage = Object.entries(article.images).find(
    ([source]) => source === firstMarkdownImageSource,
  )?.[1];
  assert.equal(article.coverImage.src, firstMarkdownImage?.src);
  assert.equal(existsSync(`public${article.socialImage.src}`), true);
  assert.equal(article.socialImage.width, 1200);
  assert.equal(article.socialImage.height, 630);
});

test('EUDI Wallet 2026–2027 article metadata matches all seven source sections', () => {
  const article = EUDI_WALLET_2026_2027_BLOG_ARTICLE;
  const content = article.content.vi;
  const markdownHeadings = content.markdown.match(/^## .+$/gm) ?? [];

  assert.equal(content.tableOfContents.length, 7);
  assert.equal(markdownHeadings.length, content.tableOfContents.length);
  assert.equal(content.readTimeMinutes, 11);
  assert.deepEqual(content.tags, [
    'EUDI Wallet',
    'Định danh số',
    'eIDAS 2.0',
    'Định danh tự chủ',
    'Quyền riêng tư',
  ]);
  assert.deepEqual(article.relatedArticleIds, [
    'chau-au-dang-dan-dau-cuoc-chuyen-dich-sang-dinh-danh-tu-chu',
    'tu-gdpr-den-ssi-vi-sao-chau-au-lai-muon-trao-quyen-kiem-soat-du-lieu-cho-nguoi-dung',
    'dinh-danh-tu-chu-ssi-la-gi',
  ]);
});
