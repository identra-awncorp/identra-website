import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import test from 'node:test';

import {
  GDPR_TO_SSI_EU_DATA_CONTROL_BLOG_ARTICLE,
  GDPR_TO_SSI_EU_DATA_CONTROL_BLOG_ARTICLE_ID,
} from '../src/content/blog/tu-gdpr-den-ssi-vi-sao-chau-au-lai-muon-trao-quyen-kiem-soat-du-lieu-cho-nguoi-dung.ts';
import {
  getStructuredBlogArticle,
  STRUCTURED_BLOG_ARTICLES,
} from '../src/content/blog/structuredBlogArticles.ts';
import { SUPPORTED_LOCALES } from '../src/types/routes.ts';

const EXPECTED_TITLE =
  'Từ GDPR đến SSI: Vì sao Châu Âu muốn trao lại quyền kiểm soát dữ liệu cho người dùng';

test('GDPR to SSI article exposes localized listing metadata and Vietnamese content', () => {
  const article = GDPR_TO_SSI_EU_DATA_CONTROL_BLOG_ARTICLE;

  assert.equal(article.id, GDPR_TO_SSI_EU_DATA_CONTROL_BLOG_ARTICLE_ID);
  assert.deepEqual(Object.keys(article.listing), [...SUPPORTED_LOCALES]);
  assert.deepEqual(article.contentLocales, ['vi']);
  assert.deepEqual(Object.keys(article.content), ['vi']);
  assert.equal(article.content.vi.title, EXPECTED_TITLE);
  assert.equal(article.listing.vi.title, EXPECTED_TITLE);
  assert.equal(getStructuredBlogArticle(article.id), article);
  assert.equal(STRUCTURED_BLOG_ARTICLES[0], article);
});

test('GDPR to SSI article preserves the source structure and inserts four optimized images', () => {
  const article = GDPR_TO_SSI_EU_DATA_CONTROL_BLOG_ARTICLE;
  const content = article.content.vi;
  const imageMatches = content.markdown.match(/!\[[^\]]+\]\([^)]+\.webp\)/g) ?? [];
  const referenceLinks = content.markdown.match(/^\s*\[https:\/\/[^\]]+\]\(https:\/\/[^)]+\)$/gm) ?? [];

  assert.equal(content.markdown.startsWith('---'), false);
  assert.equal(content.markdown.startsWith('# '), false);
  assert.equal(/^---$/m.test(content.markdown), false);
  assert.equal(content.markdown.includes('### Thông tin xuất bản'), false);
  assert.equal(imageMatches.length, 4);
  assert.equal(Object.keys(article.images).length, 4);
  assert.equal(referenceLinks.length, 8);
  assert.match(content.markdown, /GDPR đã thay đổi đáng kể \*\*quyền của người dùng\*\*/);
  assert.match(content.markdown, /GDPR là một khuôn khổ pháp lý về bảo vệ dữ liệu; SSI là một cách tiếp cận/);
  assert.match(content.markdown, /Regulation \(EU\) 2024\/1183/);

  for (const [source, image] of Object.entries(article.images)) {
    assert.equal(image.width, 1440);
    assert.equal(image.height, 810);
    assert.match(image.srcSet, /800w/);
    assert.match(image.srcSet, /1440w/);
    assert.equal(existsSync(`public${source}`), true);
  }

  assert.equal(article.coverImage.src, article.images[imageMatches[0].match(/\(([^)]+)\)/)?.[1] ?? '']?.src);
  assert.equal(existsSync(`public${article.socialImage.src}`), true);
  assert.equal(article.socialImage.width, 1200);
  assert.equal(article.socialImage.height, 630);
});

test('GDPR to SSI article metadata matches all source sections', () => {
  const article = GDPR_TO_SSI_EU_DATA_CONTROL_BLOG_ARTICLE;
  const content = article.content.vi;
  const markdownHeadings = content.markdown.match(/^## .+$/gm) ?? [];

  assert.equal(content.tableOfContents.length, 6);
  assert.equal(markdownHeadings.length, content.tableOfContents.length);
  assert.equal(content.readTimeMinutes, 13);
  assert.deepEqual(content.tags, [
    'GDPR',
    'Định danh tự chủ',
    'EUDI Wallet',
    'Quyền kiểm soát dữ liệu',
    'Chủ quyền số',
  ]);
  assert.deepEqual(article.relatedArticleIds, [
    'chau-au-dang-dan-dau-cuoc-chuyen-dich-sang-dinh-danh-tu-chu',
    'dinh-danh-tu-chu-ssi-la-gi',
    'vi-dinh-tin-la-gi',
  ]);
});
