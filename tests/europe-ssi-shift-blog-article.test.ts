import assert from 'node:assert/strict';
import test from 'node:test';

import {
  EUROPE_SSI_SHIFT_BLOG_ARTICLE,
  EUROPE_SSI_SHIFT_BLOG_ARTICLE_ID,
} from '../src/content/blog/chau-au-dang-dan-dau-cuoc-chuyen-dich-sang-dinh-danh-tu-chu.ts';
import {
  getStructuredBlogArticle,
  STRUCTURED_BLOG_ARTICLES,
} from '../src/content/blog/structuredBlogArticles.ts';
import { SUPPORTED_LOCALES } from '../src/types/routes.ts';

test('Europe SSI shift article exposes localized listing metadata and Vietnamese content', () => {
  assert.equal(EUROPE_SSI_SHIFT_BLOG_ARTICLE.id, EUROPE_SSI_SHIFT_BLOG_ARTICLE_ID);
  assert.deepEqual(
    Object.keys(EUROPE_SSI_SHIFT_BLOG_ARTICLE.listing),
    [...SUPPORTED_LOCALES],
  );
  assert.deepEqual(EUROPE_SSI_SHIFT_BLOG_ARTICLE.contentLocales, ['vi']);
  assert.deepEqual(Object.keys(EUROPE_SSI_SHIFT_BLOG_ARTICLE.content), ['vi']);
  assert.equal(
    getStructuredBlogArticle(EUROPE_SSI_SHIFT_BLOG_ARTICLE_ID),
    EUROPE_SSI_SHIFT_BLOG_ARTICLE,
  );
  assert.equal(
    STRUCTURED_BLOG_ARTICLES.includes(EUROPE_SSI_SHIFT_BLOG_ARTICLE),
    true,
  );
});

test('Europe SSI shift article preserves its source and uses three optimized images', () => {
  const content = EUROPE_SSI_SHIFT_BLOG_ARTICLE.content.vi;
  const imageMatches = content.markdown.match(/!\[[^\]]+\]\([^)]+\.webp\)/g) ?? [];

  assert.equal(
    content.title,
    'Châu Âu đang dẫn đầu cuộc chuyển dịch sang định danh tự chủ',
  );
  assert.equal(EUROPE_SSI_SHIFT_BLOG_ARTICLE.listing.vi.title, content.title);
  assert.equal(content.markdown.startsWith('---'), false);
  assert.equal(content.markdown.startsWith('# '), false);
  assert.equal(/^---$/m.test(content.markdown), false);
  assert.equal(content.markdown.includes('### Thông tin xuất bản'), false);
  assert.equal(imageMatches.length, 3);
  assert.equal(Object.keys(EUROPE_SSI_SHIFT_BLOG_ARTICLE.images).length, 3);

  for (const image of Object.values(EUROPE_SSI_SHIFT_BLOG_ARTICLE.images)) {
    assert.equal(image.width, 1440);
    assert.equal(image.height, 810);
    assert.match(image.srcSet, /800w/);
    assert.match(image.srcSet, /1440w/);
  }
});

test('Europe SSI shift article table of contents matches every source section', () => {
  const content = EUROPE_SSI_SHIFT_BLOG_ARTICLE.content.vi;
  const markdownHeadings = content.markdown.match(/^## .+$/gm) ?? [];

  assert.equal(content.tableOfContents.length, 3);
  assert.equal(markdownHeadings.length, content.tableOfContents.length);
  assert.equal(content.readTimeMinutes, 8);
  assert.deepEqual(content.tags, [
    'Định danh tự chủ',
    'EUDI Wallet',
    'Liên minh châu Âu',
    'Thực chứng',
  ]);
  assert.equal(EUROPE_SSI_SHIFT_BLOG_ARTICLE.relatedArticleIds.length, 3);
});
