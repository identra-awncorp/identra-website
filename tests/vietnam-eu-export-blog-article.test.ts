import assert from 'node:assert/strict';
import test from 'node:test';

import {
  VIETNAM_EU_EXPORT_BLOG_ARTICLE,
  VIETNAM_EU_EXPORT_BLOG_ARTICLE_ID,
} from '../src/content/blog/ssi-blockchain-va-tuong-lai-xuat-khau-hang-hoa-viet-nam-sang-eu.ts';
import {
  getStructuredBlogArticle,
  STRUCTURED_BLOG_ARTICLES,
} from '../src/content/blog/structuredBlogArticles.ts';
import { SUPPORTED_LOCALES } from '../src/types/routes.ts';

test('Vietnam-EU export article exposes localized listing metadata and Vietnamese content', () => {
  assert.equal(
    VIETNAM_EU_EXPORT_BLOG_ARTICLE.id,
    VIETNAM_EU_EXPORT_BLOG_ARTICLE_ID,
  );
  assert.deepEqual(
    Object.keys(VIETNAM_EU_EXPORT_BLOG_ARTICLE.listing),
    [...SUPPORTED_LOCALES],
  );
  assert.deepEqual(VIETNAM_EU_EXPORT_BLOG_ARTICLE.contentLocales, ['vi']);
  assert.deepEqual(Object.keys(VIETNAM_EU_EXPORT_BLOG_ARTICLE.content), ['vi']);
  assert.equal(
    getStructuredBlogArticle(VIETNAM_EU_EXPORT_BLOG_ARTICLE_ID),
    VIETNAM_EU_EXPORT_BLOG_ARTICLE,
  );
  assert.equal(
    STRUCTURED_BLOG_ARTICLES.includes(VIETNAM_EU_EXPORT_BLOG_ARTICLE),
    true,
  );
});

test('Vietnam-EU export article preserves its source and uses four optimized images', () => {
  const content = VIETNAM_EU_EXPORT_BLOG_ARTICLE.content.vi;
  const imageMatches = content.markdown.match(/!\[[^\]]+\]\([^)]+\.webp\)/g) ?? [];

  assert.equal(
    content.title,
    'SSI, blockchain và tương lai xuất khẩu hàng hóa Việt Nam sang EU',
  );
  assert.equal(VIETNAM_EU_EXPORT_BLOG_ARTICLE.listing.vi.title, content.title);
  assert.equal(content.markdown.startsWith('---'), false);
  assert.equal(content.markdown.startsWith('# '), false);
  assert.equal(/^---$/m.test(content.markdown), false);
  assert.equal(content.markdown.includes('### Thông tin xuất bản'), false);
  assert.equal(content.markdown.includes('## Tài liệu tham khảo'), true);
  assert.equal(imageMatches.length, 4);
  assert.equal(Object.keys(VIETNAM_EU_EXPORT_BLOG_ARTICLE.images).length, 4);

  for (const image of Object.values(VIETNAM_EU_EXPORT_BLOG_ARTICLE.images)) {
    assert.equal(image.width, 1440);
    assert.equal(image.height, 810);
    assert.match(image.srcSet, /800w/);
    assert.match(image.srcSet, /1440w/);
  }
});

test('Vietnam-EU export article table of contents matches every source section', () => {
  const content = VIETNAM_EU_EXPORT_BLOG_ARTICLE.content.vi;
  const markdownHeadings = content.markdown.match(/^## .+$/gm) ?? [];

  assert.equal(content.tableOfContents.length, 8);
  assert.equal(markdownHeadings.length, content.tableOfContents.length);
  assert.equal(content.readTimeMinutes, 20);
  assert.deepEqual(content.tags, [
    'Xuất khẩu',
    'Liên minh châu Âu',
    'SSI',
    'Blockchain',
    'Hộ chiếu Sản phẩm Số',
  ]);
  assert.equal(VIETNAM_EU_EXPORT_BLOG_ARTICLE.relatedArticleIds.length, 3);
});
