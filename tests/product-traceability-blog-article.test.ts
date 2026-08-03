import assert from 'node:assert/strict';
import test from 'node:test';

import {
  PRODUCT_TRACEABILITY_BLOG_ARTICLE,
  PRODUCT_TRACEABILITY_BLOG_ARTICLE_ID,
} from '../src/content/blog/tuong-lai-cua-xac-thuc-va-truy-xuat-nguon-goc-san-pham.ts';
import {
  getStructuredBlogArticle,
  STRUCTURED_BLOG_ARTICLES,
} from '../src/content/blog/structuredBlogArticles.ts';
import { SUPPORTED_LOCALES } from '../src/types/routes.ts';

test('product traceability article exposes localized listing metadata and Vietnamese content', () => {
  assert.equal(
    PRODUCT_TRACEABILITY_BLOG_ARTICLE.id,
    PRODUCT_TRACEABILITY_BLOG_ARTICLE_ID,
  );
  assert.deepEqual(
    Object.keys(PRODUCT_TRACEABILITY_BLOG_ARTICLE.listing),
    [...SUPPORTED_LOCALES],
  );
  assert.deepEqual(PRODUCT_TRACEABILITY_BLOG_ARTICLE.contentLocales, ['vi']);
  assert.deepEqual(Object.keys(PRODUCT_TRACEABILITY_BLOG_ARTICLE.content), ['vi']);
  assert.equal(
    getStructuredBlogArticle(PRODUCT_TRACEABILITY_BLOG_ARTICLE_ID),
    PRODUCT_TRACEABILITY_BLOG_ARTICLE,
  );
  assert.equal(
    STRUCTURED_BLOG_ARTICLES.includes(PRODUCT_TRACEABILITY_BLOG_ARTICLE),
    true,
  );
});

test('product traceability article preserves its source and uses four optimized images', () => {
  const content = PRODUCT_TRACEABILITY_BLOG_ARTICLE.content.vi;
  const imageMatches = content.markdown.match(/!\[[^\]]+\]\([^)]+\.webp\)/g) ?? [];

  assert.equal(
    content.title,
    'Tương lai của xác thực và truy xuất nguồn gốc sản phẩm, hàng hóa: Không chỉ nhìn thấy, mà còn có thể kiểm chứng',
  );
  assert.equal(PRODUCT_TRACEABILITY_BLOG_ARTICLE.listing.vi.title, content.title);
  assert.equal(content.markdown.startsWith('---'), false);
  assert.equal(content.markdown.startsWith('# '), false);
  assert.equal(/^---$/m.test(content.markdown), false);
  assert.equal(content.markdown.includes('### Thông tin xuất bản'), false);
  assert.equal(imageMatches.length, 4);
  assert.equal(Object.keys(PRODUCT_TRACEABILITY_BLOG_ARTICLE.images).length, 4);

  for (const image of Object.values(PRODUCT_TRACEABILITY_BLOG_ARTICLE.images)) {
    assert.equal(image.width, 1440);
    assert.equal(image.height, 810);
    assert.match(image.srcSet, /800w/);
    assert.match(image.srcSet, /1440w/);
  }
});

test('product traceability table of contents matches every source section', () => {
  const content = PRODUCT_TRACEABILITY_BLOG_ARTICLE.content.vi;
  const markdownHeadings = content.markdown.match(/^## .+$/gm) ?? [];

  assert.equal(content.tableOfContents.length, 8);
  assert.equal(markdownHeadings.length, content.tableOfContents.length);
  assert.equal(content.readTimeMinutes, 16);
  assert.deepEqual(content.tags, [
    'Chuỗi cung ứng',
    'Truy xuất nguồn gốc',
    'Thực chứng',
    'SSI',
  ]);
});
