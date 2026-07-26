import assert from 'node:assert/strict';
import test from 'node:test';

import {
  SSI_EDUCATION_BLOG_ARTICLE,
  SSI_EDUCATION_BLOG_ARTICLE_ID,
} from '../src/content/blog/ssi-trong-giao-duc-giai-phap-so-hoa-bang-cap-va-xac-minh-nang-luc.ts';
import {
  getStructuredBlogArticle,
  STRUCTURED_BLOG_ARTICLES,
} from '../src/content/blog/structuredBlogArticles.ts';
import { SUPPORTED_LOCALES } from '../src/types/routes.ts';

test('SSI education article exposes localized listing metadata and Vietnamese content', () => {
  assert.equal(SSI_EDUCATION_BLOG_ARTICLE.id, SSI_EDUCATION_BLOG_ARTICLE_ID);
  assert.deepEqual(
    Object.keys(SSI_EDUCATION_BLOG_ARTICLE.listing),
    [...SUPPORTED_LOCALES],
  );
  assert.deepEqual(SSI_EDUCATION_BLOG_ARTICLE.contentLocales, ['vi']);
  assert.deepEqual(Object.keys(SSI_EDUCATION_BLOG_ARTICLE.content), ['vi']);
  assert.equal(
    getStructuredBlogArticle(SSI_EDUCATION_BLOG_ARTICLE_ID),
    SSI_EDUCATION_BLOG_ARTICLE,
  );
  assert.equal(STRUCTURED_BLOG_ARTICLES.includes(SSI_EDUCATION_BLOG_ARTICLE), true);
});

test('SSI education article keeps source metadata out and references four optimized images', () => {
  const markdown = SSI_EDUCATION_BLOG_ARTICLE.content.vi.markdown;
  const imageMatches = markdown.match(/!\[[^\]]+\]\([^)]+\.webp\)/g) ?? [];

  assert.equal(markdown.startsWith('---'), false);
  assert.equal(markdown.startsWith('# '), false);
  assert.equal(markdown.includes('### Thông tin xuất bản'), false);
  assert.equal(markdown.includes('băng chứng có thể xác minh'), false);
  assert.equal(imageMatches.length, 4);
  assert.equal(Object.keys(SSI_EDUCATION_BLOG_ARTICLE.images).length, 4);

  for (const image of Object.values(SSI_EDUCATION_BLOG_ARTICLE.images)) {
    assert.equal(image.width, 1440);
    assert.equal(image.height, 810);
    assert.match(image.srcSet, /800w/);
    assert.match(image.srcSet, /1440w/);
  }
});
