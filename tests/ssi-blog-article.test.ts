import assert from 'node:assert/strict';
import test from 'node:test';

import {
  SSI_BLOG_ARTICLE,
  SSI_BLOG_ARTICLE_ID,
} from '../src/content/blog/dinh-danh-tu-chu-ssi-la-gi.ts';
import { SUPPORTED_LOCALES } from '../src/types/routes.ts';

test('SSI article exposes localized catalog copy and Vietnamese detail content', () => {
  assert.equal(SSI_BLOG_ARTICLE.id, SSI_BLOG_ARTICLE_ID);
  assert.deepEqual(Object.keys(SSI_BLOG_ARTICLE.listing), [...SUPPORTED_LOCALES]);
  assert.deepEqual(SSI_BLOG_ARTICLE.contentLocales, ['vi']);
  assert.deepEqual(Object.keys(SSI_BLOG_ARTICLE.content), ['vi']);
});

test('SSI article body excludes source metadata and contains four optimized images', () => {
  const markdown = SSI_BLOG_ARTICLE.content.vi.markdown;
  const imageMatches = markdown.match(/!\[[^\]]+\]\([^)]+\.webp\)/g) ?? [];

  assert.equal(markdown.startsWith('---'), false);
  assert.equal(markdown.includes('### Thông tin xuất bản'), false);
  assert.equal(markdown.startsWith('# '), false);
  assert.equal(imageMatches.length, 4);
  assert.equal(Object.keys(SSI_BLOG_ARTICLE.images).length, 4);
  assert.match(markdown, /## Tài liệu tham khảo/);
});

