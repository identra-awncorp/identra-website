import assert from 'node:assert/strict';
import test from 'node:test';

import {
  DID_EXPLAINER_BLOG_ARTICLE,
  DID_EXPLAINER_BLOG_ARTICLE_ID,
} from '../src/content/blog/did-la-gi.ts';
import {
  getStructuredBlogArticle,
  STRUCTURED_BLOG_ARTICLES,
} from '../src/content/blog/structuredBlogArticles.ts';
import { SUPPORTED_LOCALES } from '../src/types/routes.ts';

test('DID article exposes localized listing metadata and Vietnamese content', () => {
  assert.equal(DID_EXPLAINER_BLOG_ARTICLE.id, DID_EXPLAINER_BLOG_ARTICLE_ID);
  assert.deepEqual(
    Object.keys(DID_EXPLAINER_BLOG_ARTICLE.listing),
    [...SUPPORTED_LOCALES],
  );
  assert.deepEqual(DID_EXPLAINER_BLOG_ARTICLE.contentLocales, ['vi']);
  assert.deepEqual(Object.keys(DID_EXPLAINER_BLOG_ARTICLE.content), ['vi']);
  assert.equal(
    getStructuredBlogArticle(DID_EXPLAINER_BLOG_ARTICLE_ID),
    DID_EXPLAINER_BLOG_ARTICLE,
  );
  assert.equal(STRUCTURED_BLOG_ARTICLES.includes(DID_EXPLAINER_BLOG_ARTICLE), true);
});

test('DID article keeps its body image-free and exposes optimized cover metadata', () => {
  const content = DID_EXPLAINER_BLOG_ARTICLE.content.vi;

  assert.equal(
    content.title,
    'DID là gì? Một cách mới để xây dựng định danh trên Internet',
  );
  assert.equal(DID_EXPLAINER_BLOG_ARTICLE.listing.vi.title, content.title);
  assert.equal(content.markdown.startsWith('---'), false);
  assert.equal(content.markdown.startsWith('# '), false);
  assert.equal(/^---$/m.test(content.markdown), false);
  assert.equal(content.markdown.includes('### Thông tin xuất bản'), false);
  assert.equal(content.markdown.includes('!['), false);
  assert.equal(Object.keys(DID_EXPLAINER_BLOG_ARTICLE.images).length, 0);
  assert.equal(
    DID_EXPLAINER_BLOG_ARTICLE.coverImage.src,
    '/blog/did-la-gi/decentralized-identifier-cover-1440.webp',
  );
  assert.equal(
    DID_EXPLAINER_BLOG_ARTICLE.coverImage.srcSet.includes(
      'decentralized-identifier-cover-800.webp 800w',
    ),
    true,
  );
  assert.equal(
    DID_EXPLAINER_BLOG_ARTICLE.socialImage.src,
    '/blog/did-la-gi/did-la-gi-og.jpg',
  );
  assert.equal(
    content.markdown.includes('DID không loại bỏ niềm tin khỏi hệ thống.'),
    true,
  );
});

test('DID article table of contents matches every source section', () => {
  const content = DID_EXPLAINER_BLOG_ARTICLE.content.vi;
  const markdownHeadings = content.markdown.match(/^## .+$/gm) ?? [];

  assert.equal(content.tableOfContents.length, 6);
  assert.equal(markdownHeadings.length, content.tableOfContents.length);
  assert.equal(content.readTimeMinutes, 7);
  assert.deepEqual(content.tags, [
    'DID',
    'Định danh phi tập trung',
    'Định danh số',
    'SSI',
  ]);
  assert.equal(DID_EXPLAINER_BLOG_ARTICLE.relatedArticleIds.length, 3);
});
