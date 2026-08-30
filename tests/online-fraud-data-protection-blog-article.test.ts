import assert from 'node:assert/strict';
import test from 'node:test';

import {
  ONLINE_FRAUD_DATA_PROTECTION_BLOG_ARTICLE,
  ONLINE_FRAUD_DATA_PROTECTION_BLOG_ARTICLE_ID,
} from '../src/content/blog/lua-dao-truc-tuyen-va-bai-toan-bao-ve-du-lieu-ca-nhan-trong-thoi-dai-so.ts';
import {
  getStructuredBlogArticle,
  STRUCTURED_BLOG_ARTICLES,
} from '../src/content/blog/structuredBlogArticles.ts';
import { SUPPORTED_LOCALES } from '../src/types/routes.ts';

test('online fraud article exposes localized listing metadata and Vietnamese content', () => {
  assert.equal(
    ONLINE_FRAUD_DATA_PROTECTION_BLOG_ARTICLE.id,
    ONLINE_FRAUD_DATA_PROTECTION_BLOG_ARTICLE_ID,
  );
  assert.deepEqual(
    Object.keys(ONLINE_FRAUD_DATA_PROTECTION_BLOG_ARTICLE.listing),
    [...SUPPORTED_LOCALES],
  );
  assert.deepEqual(
    ONLINE_FRAUD_DATA_PROTECTION_BLOG_ARTICLE.contentLocales,
    ['vi'],
  );
  assert.deepEqual(
    Object.keys(ONLINE_FRAUD_DATA_PROTECTION_BLOG_ARTICLE.content),
    ['vi'],
  );
  assert.equal(
    getStructuredBlogArticle(ONLINE_FRAUD_DATA_PROTECTION_BLOG_ARTICLE_ID),
    ONLINE_FRAUD_DATA_PROTECTION_BLOG_ARTICLE,
  );
  assert.equal(
    STRUCTURED_BLOG_ARTICLES.includes(
      ONLINE_FRAUD_DATA_PROTECTION_BLOG_ARTICLE,
    ),
    true,
  );
});

test('online fraud article keeps its body image-free and exposes optimized cover metadata', () => {
  const content = ONLINE_FRAUD_DATA_PROTECTION_BLOG_ARTICLE.content.vi;

  assert.equal(
    content.title,
    'Lừa đảo trực tuyến và bài toán bảo vệ dữ liệu cá nhân trong thời đại số',
  );
  assert.equal(
    ONLINE_FRAUD_DATA_PROTECTION_BLOG_ARTICLE.listing.vi.title,
    content.title,
  );
  assert.equal(content.markdown.startsWith('---'), false);
  assert.equal(content.markdown.startsWith('# '), false);
  assert.equal(/^---$/m.test(content.markdown), false);
  assert.equal(content.markdown.includes('### Thông tin xuất bản'), false);
  assert.equal(content.markdown.includes('!['), false);
  assert.equal(
    Object.keys(ONLINE_FRAUD_DATA_PROTECTION_BLOG_ARTICLE.images).length,
    0,
  );
  assert.equal(
    ONLINE_FRAUD_DATA_PROTECTION_BLOG_ARTICLE.coverImage.src,
    `/blog/${ONLINE_FRAUD_DATA_PROTECTION_BLOG_ARTICLE_ID}/online-fraud-cover-1440.webp`,
  );
  assert.equal(
    ONLINE_FRAUD_DATA_PROTECTION_BLOG_ARTICLE.coverImage.srcSet.includes(
      'online-fraud-cover-800.webp 800w',
    ),
    true,
  );
  assert.equal(
    ONLINE_FRAUD_DATA_PROTECTION_BLOG_ARTICLE.socialImage.src,
    `/blog/${ONLINE_FRAUD_DATA_PROTECTION_BLOG_ARTICLE_ID}/online-fraud-data-protection-og.jpg`,
  );
  assert.equal(
    content.markdown.includes(
      'niềm tin không thể tiếp tục chỉ dựa vào cảm giác quen thuộc',
    ),
    true,
  );
});

test('online fraud article table of contents matches every source section', () => {
  const content = ONLINE_FRAUD_DATA_PROTECTION_BLOG_ARTICLE.content.vi;
  const markdownHeadings = content.markdown.match(/^## .+$/gm) ?? [];

  assert.equal(content.tableOfContents.length, 4);
  assert.equal(markdownHeadings.length, content.tableOfContents.length);
  assert.equal(content.readTimeMinutes, 8);
  assert.deepEqual(content.tags, [
    'Lừa đảo trực tuyến',
    'Bảo vệ dữ liệu',
    'Định danh tự chủ',
    'Xác minh danh tính',
  ]);
  assert.equal(
    ONLINE_FRAUD_DATA_PROTECTION_BLOG_ARTICLE.relatedArticleIds.length,
    3,
  );
});
