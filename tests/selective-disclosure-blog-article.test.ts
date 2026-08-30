import assert from 'node:assert/strict';
import test from 'node:test';

import {
  SELECTIVE_DISCLOSURE_EXPLAINER_BLOG_ARTICLE,
  SELECTIVE_DISCLOSURE_EXPLAINER_BLOG_ARTICLE_ID,
} from '../src/content/blog/tiet-lo-co-chon-loc-la-gi.ts';
import {
  getStructuredBlogArticle,
  STRUCTURED_BLOG_ARTICLES,
} from '../src/content/blog/structuredBlogArticles.ts';
import { SUPPORTED_LOCALES } from '../src/types/routes.ts';

test('selective disclosure article exposes localized listing metadata and Vietnamese content', () => {
  assert.equal(
    SELECTIVE_DISCLOSURE_EXPLAINER_BLOG_ARTICLE.id,
    SELECTIVE_DISCLOSURE_EXPLAINER_BLOG_ARTICLE_ID,
  );
  assert.deepEqual(
    Object.keys(SELECTIVE_DISCLOSURE_EXPLAINER_BLOG_ARTICLE.listing),
    [...SUPPORTED_LOCALES],
  );
  assert.deepEqual(
    SELECTIVE_DISCLOSURE_EXPLAINER_BLOG_ARTICLE.contentLocales,
    ['vi'],
  );
  assert.deepEqual(
    Object.keys(SELECTIVE_DISCLOSURE_EXPLAINER_BLOG_ARTICLE.content),
    ['vi'],
  );
  assert.equal(
    getStructuredBlogArticle(SELECTIVE_DISCLOSURE_EXPLAINER_BLOG_ARTICLE_ID),
    SELECTIVE_DISCLOSURE_EXPLAINER_BLOG_ARTICLE,
  );
  assert.equal(
    STRUCTURED_BLOG_ARTICLES.includes(
      SELECTIVE_DISCLOSURE_EXPLAINER_BLOG_ARTICLE,
    ),
    true,
  );
});

test('selective disclosure article keeps its body image-free and exposes optimized cover metadata', () => {
  const content = SELECTIVE_DISCLOSURE_EXPLAINER_BLOG_ARTICLE.content.vi;

  assert.equal(
    content.title,
    'Tiết lộ có chọn lọc là gì? Cách xác minh thông tin mà không chia sẻ quá nhiều dữ liệu',
  );
  assert.equal(
    SELECTIVE_DISCLOSURE_EXPLAINER_BLOG_ARTICLE.listing.vi.title,
    content.title,
  );
  assert.equal(content.markdown.startsWith('---'), false);
  assert.equal(content.markdown.startsWith('# '), false);
  assert.equal(/^---$/m.test(content.markdown), false);
  assert.equal(content.markdown.includes('### Thông tin xuất bản'), false);
  assert.equal(content.markdown.includes('!['), false);
  assert.equal(
    Object.keys(SELECTIVE_DISCLOSURE_EXPLAINER_BLOG_ARTICLE.images).length,
    0,
  );
  assert.equal(
    SELECTIVE_DISCLOSURE_EXPLAINER_BLOG_ARTICLE.coverImage.src,
    '/blog/tiet-lo-co-chon-loc-la-gi/selective-disclosure-cover-1440.webp',
  );
  assert.equal(
    SELECTIVE_DISCLOSURE_EXPLAINER_BLOG_ARTICLE.coverImage.srcSet.includes(
      'selective-disclosure-cover-800.webp 800w',
    ),
    true,
  );
  assert.equal(
    SELECTIVE_DISCLOSURE_EXPLAINER_BLOG_ARTICLE.socialImage.src,
    '/blog/tiet-lo-co-chon-loc-la-gi/tiet-lo-co-chon-loc-la-gi-og.jpg',
  );
  assert.equal(
    content.markdown.includes(
      'Không chia sẻ nhiều dữ liệu hơn mức thực sự cần thiết.',
    ),
    true,
  );
});

test('selective disclosure article table of contents matches every source section', () => {
  const content = SELECTIVE_DISCLOSURE_EXPLAINER_BLOG_ARTICLE.content.vi;
  const markdownHeadings = content.markdown.match(/^## .+$/gm) ?? [];

  assert.equal(content.tableOfContents.length, 11);
  assert.equal(markdownHeadings.length, content.tableOfContents.length);
  assert.equal(content.readTimeMinutes, 10);
  assert.deepEqual(content.tags, [
    'Tiết lộ có chọn lọc',
    'Tối thiểu hóa dữ liệu',
    'Quyền riêng tư',
    'Thực chứng',
  ]);
  assert.equal(
    SELECTIVE_DISCLOSURE_EXPLAINER_BLOG_ARTICLE.relatedArticleIds.length,
    3,
  );
});
