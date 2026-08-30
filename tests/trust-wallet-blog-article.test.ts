import assert from 'node:assert/strict';
import test from 'node:test';

import {
  TRUST_WALLET_EXPLAINER_BLOG_ARTICLE,
  TRUST_WALLET_EXPLAINER_BLOG_ARTICLE_ID,
} from '../src/content/blog/vi-dinh-tin-la-gi.ts';
import {
  getStructuredBlogArticle,
  STRUCTURED_BLOG_ARTICLES,
} from '../src/content/blog/structuredBlogArticles.ts';
import { SUPPORTED_LOCALES } from '../src/types/routes.ts';

test('trust wallet article exposes localized listing metadata and Vietnamese content', () => {
  assert.equal(
    TRUST_WALLET_EXPLAINER_BLOG_ARTICLE.id,
    TRUST_WALLET_EXPLAINER_BLOG_ARTICLE_ID,
  );
  assert.deepEqual(
    Object.keys(TRUST_WALLET_EXPLAINER_BLOG_ARTICLE.listing),
    [...SUPPORTED_LOCALES],
  );
  assert.deepEqual(TRUST_WALLET_EXPLAINER_BLOG_ARTICLE.contentLocales, ['vi']);
  assert.deepEqual(Object.keys(TRUST_WALLET_EXPLAINER_BLOG_ARTICLE.content), ['vi']);
  assert.equal(
    getStructuredBlogArticle(TRUST_WALLET_EXPLAINER_BLOG_ARTICLE_ID),
    TRUST_WALLET_EXPLAINER_BLOG_ARTICLE,
  );
  assert.equal(
    STRUCTURED_BLOG_ARTICLES.includes(TRUST_WALLET_EXPLAINER_BLOG_ARTICLE),
    true,
  );
});

test('trust wallet article keeps its body image-free and exposes optimized cover metadata', () => {
  const content = TRUST_WALLET_EXPLAINER_BLOG_ARTICLE.content.vi;

  assert.equal(content.title, 'Ví định tín là gì?');
  assert.equal(TRUST_WALLET_EXPLAINER_BLOG_ARTICLE.listing.vi.title, content.title);
  assert.equal(content.markdown.startsWith('---'), false);
  assert.equal(content.markdown.startsWith('# '), false);
  assert.equal(/^---$/m.test(content.markdown), false);
  assert.equal(content.markdown.includes('### Thông tin xuất bản'), false);
  assert.equal(content.markdown.includes('!['), false);
  assert.equal(Object.keys(TRUST_WALLET_EXPLAINER_BLOG_ARTICLE.images).length, 0);
  assert.equal(
    TRUST_WALLET_EXPLAINER_BLOG_ARTICLE.coverImage.src,
    '/blog/vi-dinh-tin-la-gi/trust-wallet-cover-1440.webp',
  );
  assert.equal(
    TRUST_WALLET_EXPLAINER_BLOG_ARTICLE.coverImage.srcSet.includes(
      'trust-wallet-cover-800.webp 800w',
    ),
    true,
  );
  assert.equal(
    TRUST_WALLET_EXPLAINER_BLOG_ARTICLE.socialImage.src,
    '/blog/vi-dinh-tin-la-gi/vi-dinh-tin-la-gi-og.jpg',
  );
  assert.equal(
    content.markdown.includes('Ví định tín được tạo ra để thay đổi cách những thông tin này được quản lý và sử dụng.'),
    true,
  );
});

test('trust wallet article table of contents matches every source section', () => {
  const content = TRUST_WALLET_EXPLAINER_BLOG_ARTICLE.content.vi;
  const markdownHeadings = content.markdown.match(/^## .+$/gm) ?? [];

  assert.equal(content.tableOfContents.length, 7);
  assert.equal(markdownHeadings.length, content.tableOfContents.length);
  assert.equal(content.readTimeMinutes, 6);
  assert.deepEqual(content.tags, [
    'Ví định tín',
    'Thực chứng',
    'Định danh tự chủ',
    'Tiết lộ có chọn lọc',
  ]);
  assert.equal(TRUST_WALLET_EXPLAINER_BLOG_ARTICLE.relatedArticleIds.length, 3);
});
