import assert from 'node:assert/strict';
import test from 'node:test';

import {
  DATA_TRUST_AI_ECONOMY_BLOG_ARTICLE,
  DATA_TRUST_AI_ECONOMY_BLOG_ARTICLE_ID,
} from '../src/content/blog/giai-bai-toan-niem-tin-du-lieu-de-phat-trien-kinh-te-so-kinh-te-ai.ts';
import {
  getStructuredBlogArticle,
  STRUCTURED_BLOG_ARTICLES,
} from '../src/content/blog/structuredBlogArticles.ts';
import { SUPPORTED_LOCALES } from '../src/types/routes.ts';

test('data trust and AI economy article exposes localized listing metadata and Vietnamese content', () => {
  assert.equal(
    DATA_TRUST_AI_ECONOMY_BLOG_ARTICLE.id,
    DATA_TRUST_AI_ECONOMY_BLOG_ARTICLE_ID,
  );
  assert.deepEqual(
    Object.keys(DATA_TRUST_AI_ECONOMY_BLOG_ARTICLE.listing),
    [...SUPPORTED_LOCALES],
  );
  assert.deepEqual(DATA_TRUST_AI_ECONOMY_BLOG_ARTICLE.contentLocales, ['vi']);
  assert.deepEqual(Object.keys(DATA_TRUST_AI_ECONOMY_BLOG_ARTICLE.content), ['vi']);
  assert.equal(
    getStructuredBlogArticle(DATA_TRUST_AI_ECONOMY_BLOG_ARTICLE_ID),
    DATA_TRUST_AI_ECONOMY_BLOG_ARTICLE,
  );
  assert.equal(
    STRUCTURED_BLOG_ARTICLES.includes(DATA_TRUST_AI_ECONOMY_BLOG_ARTICLE),
    true,
  );
});

test('data trust and AI economy article preserves its source and uses four optimized images', () => {
  const content = DATA_TRUST_AI_ECONOMY_BLOG_ARTICLE.content.vi;
  const imageMatches = content.markdown.match(/!\[[^\]]+\]\([^)]+\.webp\)/g) ?? [];

  assert.equal(
    content.title,
    'Giải bài toán niềm tin dữ liệu để phát triển kinh tế số, kinh tế AI',
  );
  assert.equal(DATA_TRUST_AI_ECONOMY_BLOG_ARTICLE.listing.vi.title, content.title);
  assert.equal(content.markdown.startsWith('---'), false);
  assert.equal(content.markdown.startsWith('# '), false);
  assert.equal(/^---$/m.test(content.markdown), false);
  assert.equal(content.markdown.includes('### Thông tin xuất bản'), false);
  assert.equal(
    content.markdown.includes('Đây chính là ranh giới giữa khả năng suy luận và độ tin cậy của thông tin.'),
    true,
  );
  assert.equal(imageMatches.length, 4);
  assert.equal(Object.keys(DATA_TRUST_AI_ECONOMY_BLOG_ARTICLE.images).length, 4);

  for (const image of Object.values(DATA_TRUST_AI_ECONOMY_BLOG_ARTICLE.images)) {
    assert.equal(image.width, 1440);
    assert.equal(image.height, 810);
    assert.match(image.srcSet, /800w/);
    assert.match(image.srcSet, /1440w/);
  }
});

test('data trust and AI economy article table of contents matches every source section', () => {
  const content = DATA_TRUST_AI_ECONOMY_BLOG_ARTICLE.content.vi;
  const markdownHeadings = content.markdown.match(/^## .+$/gm) ?? [];

  assert.equal(content.tableOfContents.length, 7);
  assert.equal(markdownHeadings.length, content.tableOfContents.length);
  assert.equal(content.readTimeMinutes, 13);
  assert.deepEqual(content.tags, [
    'Kinh tế số',
    'Kinh tế AI',
    'Niềm tin dữ liệu',
    'SSI',
    'AI Agent',
  ]);
  assert.equal(DATA_TRUST_AI_ECONOMY_BLOG_ARTICLE.relatedArticleIds.length, 3);
});
