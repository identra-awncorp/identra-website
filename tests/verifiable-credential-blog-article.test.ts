import assert from 'node:assert/strict';
import test from 'node:test';

import {
  VERIFIABLE_CREDENTIAL_EXPLAINER_BLOG_ARTICLE,
  VERIFIABLE_CREDENTIAL_EXPLAINER_BLOG_ARTICLE_ID,
} from '../src/content/blog/thuc-chung-la-gi.ts';
import {
  getStructuredBlogArticle,
  STRUCTURED_BLOG_ARTICLES,
} from '../src/content/blog/structuredBlogArticles.ts';
import { SUPPORTED_LOCALES } from '../src/types/routes.ts';

test('verifiable credential article exposes localized listing metadata and Vietnamese content', () => {
  assert.equal(
    VERIFIABLE_CREDENTIAL_EXPLAINER_BLOG_ARTICLE.id,
    VERIFIABLE_CREDENTIAL_EXPLAINER_BLOG_ARTICLE_ID,
  );
  assert.deepEqual(
    Object.keys(VERIFIABLE_CREDENTIAL_EXPLAINER_BLOG_ARTICLE.listing),
    [...SUPPORTED_LOCALES],
  );
  assert.deepEqual(
    VERIFIABLE_CREDENTIAL_EXPLAINER_BLOG_ARTICLE.contentLocales,
    ['vi'],
  );
  assert.deepEqual(
    Object.keys(VERIFIABLE_CREDENTIAL_EXPLAINER_BLOG_ARTICLE.content),
    ['vi'],
  );
  assert.equal(
    getStructuredBlogArticle(VERIFIABLE_CREDENTIAL_EXPLAINER_BLOG_ARTICLE_ID),
    VERIFIABLE_CREDENTIAL_EXPLAINER_BLOG_ARTICLE,
  );
  assert.equal(
    STRUCTURED_BLOG_ARTICLES.includes(
      VERIFIABLE_CREDENTIAL_EXPLAINER_BLOG_ARTICLE,
    ),
    true,
  );
});

test('verifiable credential article keeps its body image-free and exposes optimized cover metadata', () => {
  const content = VERIFIABLE_CREDENTIAL_EXPLAINER_BLOG_ARTICLE.content.vi;

  assert.equal(
    content.title,
    'Thực chứng là gì? Cách dữ liệu số trở nên đáng tin cậy và có thể kiểm chứng',
  );
  assert.equal(
    VERIFIABLE_CREDENTIAL_EXPLAINER_BLOG_ARTICLE.listing.vi.title,
    content.title,
  );
  assert.equal(content.markdown.startsWith('---'), false);
  assert.equal(content.markdown.startsWith('# '), false);
  assert.equal(/^---$/m.test(content.markdown), false);
  assert.equal(content.markdown.includes('### Thông tin xuất bản'), false);
  assert.equal(content.markdown.includes('!['), false);
  assert.equal(
    Object.keys(VERIFIABLE_CREDENTIAL_EXPLAINER_BLOG_ARTICLE.images).length,
    0,
  );
  assert.equal(
    VERIFIABLE_CREDENTIAL_EXPLAINER_BLOG_ARTICLE.coverImage.src,
    '/blog/thuc-chung-la-gi/verifiable-credential-cover-1440.webp',
  );
  assert.equal(
    VERIFIABLE_CREDENTIAL_EXPLAINER_BLOG_ARTICLE.coverImage.srcSet.includes(
      'verifiable-credential-cover-800.webp 800w',
    ),
    true,
  );
  assert.equal(
    VERIFIABLE_CREDENTIAL_EXPLAINER_BLOG_ARTICLE.socialImage.src,
    '/blog/thuc-chung-la-gi/thuc-chung-la-gi-og.jpg',
  );
  assert.equal(
    content.markdown.includes(
      'Thực chứng được tạo ra để giúp quá trình này có thể diễn ra trực tiếp bằng phần mềm.',
    ),
    true,
  );
});

test('verifiable credential article table of contents matches every source section', () => {
  const content = VERIFIABLE_CREDENTIAL_EXPLAINER_BLOG_ARTICLE.content.vi;
  const markdownHeadings = content.markdown.match(/^## .+$/gm) ?? [];

  assert.equal(content.tableOfContents.length, 8);
  assert.equal(markdownHeadings.length, content.tableOfContents.length);
  assert.equal(content.readTimeMinutes, 8);
  assert.deepEqual(content.tags, [
    'Thực chứng',
    'Nguồn gốc dữ liệu',
    'Mật mã học',
    'Tiết lộ có chọn lọc',
  ]);
  assert.equal(
    VERIFIABLE_CREDENTIAL_EXPLAINER_BLOG_ARTICLE.relatedArticleIds.length,
    3,
  );
});
