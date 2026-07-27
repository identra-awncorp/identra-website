import assert from 'node:assert/strict';
import test from 'node:test';

import {
  INTERNATIONAL_HIRING_SSI_BLOG_ARTICLE,
  INTERNATIONAL_HIRING_SSI_BLOG_ARTICLE_ID,
} from '../src/content/blog/rao-can-phap-ly-trong-tuyen-dung-quoc-te-ssi-mo-duong-cho-nhan-su-remote-nhu-the-nao.ts';
import {
  getStructuredBlogArticle,
  STRUCTURED_BLOG_ARTICLES,
} from '../src/content/blog/structuredBlogArticles.ts';
import { SUPPORTED_LOCALES } from '../src/types/routes.ts';

test('international hiring article exposes localized listing metadata and Vietnamese content', () => {
  assert.equal(
    INTERNATIONAL_HIRING_SSI_BLOG_ARTICLE.id,
    INTERNATIONAL_HIRING_SSI_BLOG_ARTICLE_ID,
  );
  assert.deepEqual(
    Object.keys(INTERNATIONAL_HIRING_SSI_BLOG_ARTICLE.listing),
    [...SUPPORTED_LOCALES],
  );
  assert.deepEqual(INTERNATIONAL_HIRING_SSI_BLOG_ARTICLE.contentLocales, ['vi']);
  assert.deepEqual(
    Object.keys(INTERNATIONAL_HIRING_SSI_BLOG_ARTICLE.content),
    ['vi'],
  );
  assert.equal(
    getStructuredBlogArticle(INTERNATIONAL_HIRING_SSI_BLOG_ARTICLE_ID),
    INTERNATIONAL_HIRING_SSI_BLOG_ARTICLE,
  );
  assert.equal(
    STRUCTURED_BLOG_ARTICLES[0],
    INTERNATIONAL_HIRING_SSI_BLOG_ARTICLE,
  );
  assert.deepEqual(
    STRUCTURED_BLOG_ARTICLES.map((article) => article.publishedAt),
    STRUCTURED_BLOG_ARTICLES
      .map((article) => article.publishedAt)
      .sort((left, right) => right.localeCompare(left)),
  );
});

test('international hiring article keeps source metadata out and references optimized images', () => {
  const markdown = INTERNATIONAL_HIRING_SSI_BLOG_ARTICLE.content.vi.markdown;
  const imageMatches = markdown.match(/!\[[^\]]+\]\([^)]+\.webp\)/g) ?? [];

  assert.equal(markdown.startsWith('---'), false);
  assert.equal(markdown.startsWith('# '), false);
  assert.equal(markdown.endsWith('---'), false);
  assert.equal(/^---$/m.test(markdown), false);
  assert.equal(markdown.includes('### Thông tin xuất bản'), false);
  assert.equal(imageMatches.length, 4);
  assert.equal(
    Object.keys(INTERNATIONAL_HIRING_SSI_BLOG_ARTICLE.images).length,
    4,
  );

  for (const image of Object.values(INTERNATIONAL_HIRING_SSI_BLOG_ARTICLE.images)) {
    assert.equal(image.width, 1440);
    assert.equal(image.height, 810);
    assert.match(image.srcSet, /800w/);
    assert.match(image.srcSet, /1440w/);
  }
});
