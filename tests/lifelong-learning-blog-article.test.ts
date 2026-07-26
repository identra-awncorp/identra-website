import assert from 'node:assert/strict';
import test from 'node:test';

import {
  LIFELONG_LEARNING_BLOG_ARTICLE,
  LIFELONG_LEARNING_BLOG_ARTICLE_ID,
} from '../src/content/blog/ho-so-hoc-tap-suot-doi-loi-ich-cua-mo-hinh-dinh-danh-tu-chu-doi-voi-nguoi-hoc.ts';
import {
  getStructuredBlogArticle,
  STRUCTURED_BLOG_ARTICLES,
} from '../src/content/blog/structuredBlogArticles.ts';
import { SUPPORTED_LOCALES } from '../src/types/routes.ts';

test('lifelong learning article exposes localized listing metadata and Vietnamese content', () => {
  assert.equal(LIFELONG_LEARNING_BLOG_ARTICLE.id, LIFELONG_LEARNING_BLOG_ARTICLE_ID);
  assert.deepEqual(
    Object.keys(LIFELONG_LEARNING_BLOG_ARTICLE.listing),
    [...SUPPORTED_LOCALES],
  );
  assert.deepEqual(LIFELONG_LEARNING_BLOG_ARTICLE.contentLocales, ['vi']);
  assert.deepEqual(Object.keys(LIFELONG_LEARNING_BLOG_ARTICLE.content), ['vi']);
  assert.equal(
    getStructuredBlogArticle(LIFELONG_LEARNING_BLOG_ARTICLE_ID),
    LIFELONG_LEARNING_BLOG_ARTICLE,
  );
  assert.equal(STRUCTURED_BLOG_ARTICLES[0], LIFELONG_LEARNING_BLOG_ARTICLE);
});

test('lifelong learning article excludes source heading and references four optimized images', () => {
  const markdown = LIFELONG_LEARNING_BLOG_ARTICLE.content.vi.markdown;
  const imageMatches = markdown.match(/!\[[^\]]+\]\([^)]+\.webp\)/g) ?? [];

  assert.equal(markdown.startsWith('---'), false);
  assert.equal(markdown.startsWith('# '), false);
  assert.equal(markdown.includes('### Thông tin xuất bản'), false);
  assert.equal(imageMatches.length, 4);
  assert.equal(Object.keys(LIFELONG_LEARNING_BLOG_ARTICLE.images).length, 4);
  assert.match(markdown, /- Các chương trình thúc đẩy học tập suốt đời/);
  assert.match(
    markdown,
    /https:\/\/europass\.europa\.eu\/en\/european-digital-credentials-learning/,
  );

  for (const image of Object.values(LIFELONG_LEARNING_BLOG_ARTICLE.images)) {
    assert.equal(image.width, 1440);
    assert.equal(image.height, 810);
    assert.match(image.srcSet, /800w/);
    assert.match(image.srcSet, /1440w/);
  }
});
