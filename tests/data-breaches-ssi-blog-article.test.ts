import assert from 'node:assert/strict';
import test from 'node:test';

import {
  DATA_BREACHES_SSI_BLOG_ARTICLE,
  DATA_BREACHES_SSI_BLOG_ARTICLE_ID,
} from '../src/content/blog/ro-ri-du-lieu-tai-trung-quoc-va-an-do-bai-hoc-ve-an-ninh-du-lieu-va-cach-ssi-thay-doi-cach-chung-ta-bao-ve-thong-tin.ts';
import {
  getStructuredBlogArticle,
  STRUCTURED_BLOG_ARTICLES,
} from '../src/content/blog/structuredBlogArticles.ts';
import { SUPPORTED_LOCALES } from '../src/types/routes.ts';

test('data breaches article exposes localized listing metadata and Vietnamese content', () => {
  assert.equal(
    DATA_BREACHES_SSI_BLOG_ARTICLE.id,
    DATA_BREACHES_SSI_BLOG_ARTICLE_ID,
  );
  assert.deepEqual(
    Object.keys(DATA_BREACHES_SSI_BLOG_ARTICLE.listing),
    [...SUPPORTED_LOCALES],
  );
  assert.deepEqual(DATA_BREACHES_SSI_BLOG_ARTICLE.contentLocales, ['vi']);
  assert.deepEqual(Object.keys(DATA_BREACHES_SSI_BLOG_ARTICLE.content), ['vi']);
  assert.equal(
    getStructuredBlogArticle(DATA_BREACHES_SSI_BLOG_ARTICLE_ID),
    DATA_BREACHES_SSI_BLOG_ARTICLE,
  );
  assert.equal(
    STRUCTURED_BLOG_ARTICLES.includes(DATA_BREACHES_SSI_BLOG_ARTICLE),
    true,
  );
});

test('data breaches article keeps its body image-free and exposes optimized cover metadata', () => {
  const content = DATA_BREACHES_SSI_BLOG_ARTICLE.content.vi;

  assert.equal(
    content.title,
    'Rò rỉ dữ liệu tại Trung Quốc và Ấn Độ: Bài học về an ninh dữ liệu và cách SSI thay đổi cách chúng ta bảo vệ thông tin',
  );
  assert.equal(DATA_BREACHES_SSI_BLOG_ARTICLE.listing.vi.title, content.title);
  assert.equal(content.markdown.startsWith('---'), false);
  assert.equal(content.markdown.startsWith('# '), false);
  assert.equal(/^---$/m.test(content.markdown), false);
  assert.equal(content.markdown.includes('### Thông tin xuất bản'), false);
  assert.equal(content.markdown.includes('!['), false);
  assert.equal(Object.keys(DATA_BREACHES_SSI_BLOG_ARTICLE.images).length, 0);
  assert.equal(
    DATA_BREACHES_SSI_BLOG_ARTICLE.coverImage.src,
    `/blog/${DATA_BREACHES_SSI_BLOG_ARTICLE_ID}/data-breach-cover-1440.webp`,
  );
  assert.equal(
    DATA_BREACHES_SSI_BLOG_ARTICLE.coverImage.srcSet.includes(
      'data-breach-cover-800.webp 800w',
    ),
    true,
  );
  assert.equal(
    DATA_BREACHES_SSI_BLOG_ARTICLE.socialImage.src,
    `/blog/${DATA_BREACHES_SSI_BLOG_ARTICLE_ID}/data-breach-ssi-og.jpg`,
  );
  assert.equal(
    content.markdown.includes(
      'giảm bớt dữ liệu phải bảo vệ cũng quan trọng không kém việc bảo vệ dữ liệu tốt hơn',
    ),
    true,
  );
});

test('data breaches article table of contents matches every source section', () => {
  const content = DATA_BREACHES_SSI_BLOG_ARTICLE.content.vi;
  const markdownHeadings = content.markdown.match(/^## .+$/gm) ?? [];

  assert.equal(content.tableOfContents.length, 7);
  assert.equal(markdownHeadings.length, content.tableOfContents.length);
  assert.equal(content.readTimeMinutes, 12);
  assert.deepEqual(content.tags, [
    'Rò rỉ dữ liệu',
    'An ninh dữ liệu',
    'Định danh tự chủ',
    'Tối thiểu hóa dữ liệu',
  ]);
  assert.equal(DATA_BREACHES_SSI_BLOG_ARTICLE.relatedArticleIds.length, 3);
});
