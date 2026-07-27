import assert from 'node:assert/strict';
import test from 'node:test';

import {
  MIT_DIGITAL_DIPLOMAS_BLOG_ARTICLE,
  MIT_DIGITAL_DIPLOMAS_BLOG_ARTICLE_ID,
} from '../src/content/blog/tu-thi-diem-cua-mit-den-lan-song-so-hoa-bang-cap-khong-the-dao-nguoc.ts';
import {
  getStructuredBlogArticle,
  STRUCTURED_BLOG_ARTICLES,
} from '../src/content/blog/structuredBlogArticles.ts';
import { SUPPORTED_LOCALES } from '../src/types/routes.ts';

test('MIT digital diplomas article exposes localized listing metadata and Vietnamese content', () => {
  assert.equal(
    MIT_DIGITAL_DIPLOMAS_BLOG_ARTICLE.id,
    MIT_DIGITAL_DIPLOMAS_BLOG_ARTICLE_ID,
  );
  assert.deepEqual(
    Object.keys(MIT_DIGITAL_DIPLOMAS_BLOG_ARTICLE.listing),
    [...SUPPORTED_LOCALES],
  );
  assert.deepEqual(MIT_DIGITAL_DIPLOMAS_BLOG_ARTICLE.contentLocales, ['vi']);
  assert.deepEqual(Object.keys(MIT_DIGITAL_DIPLOMAS_BLOG_ARTICLE.content), ['vi']);
  assert.equal(
    getStructuredBlogArticle(MIT_DIGITAL_DIPLOMAS_BLOG_ARTICLE_ID),
    MIT_DIGITAL_DIPLOMAS_BLOG_ARTICLE,
  );
  assert.equal(
    STRUCTURED_BLOG_ARTICLES.includes(MIT_DIGITAL_DIPLOMAS_BLOG_ARTICLE),
    true,
  );
});

test('MIT digital diplomas article keeps source metadata out and references optimized images', () => {
  const markdown = MIT_DIGITAL_DIPLOMAS_BLOG_ARTICLE.content.vi.markdown;
  const imageMatches = markdown.match(/!\[[^\]]+\]\([^)]+\.webp\)/g) ?? [];

  assert.equal(markdown.startsWith('---'), false);
  assert.equal(markdown.startsWith('# '), false);
  assert.equal(markdown.endsWith('---'), false);
  assert.equal(/^---$/m.test(markdown), false);
  assert.equal(markdown.includes('thực chứng (verifiable credential)'), false);
  assert.equal(markdown.includes('Thực chứng có cho phép'), false);
  assert.equal(imageMatches.length, 4);
  assert.equal(Object.keys(MIT_DIGITAL_DIPLOMAS_BLOG_ARTICLE.images).length, 4);
  assert.match(
    markdown,
    /\[MIT News \(2017\)\. \*MIT debuts secure digital diploma using Bitcoin blockchain technology\*\]\(https:\/\/news\.mit\.edu\//,
  );

  for (const image of Object.values(MIT_DIGITAL_DIPLOMAS_BLOG_ARTICLE.images)) {
    assert.equal(image.width, 1440);
    assert.equal(image.height, 810);
    assert.match(image.srcSet, /800w/);
    assert.match(image.srcSet, /1440w/);
  }
});
