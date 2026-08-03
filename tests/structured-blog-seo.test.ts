import assert from 'node:assert/strict';
import test from 'node:test';

import {
  getStructuredBlogSeoMetadata,
  STRUCTURED_BLOG_ARTICLES,
} from '../src/content/blog/structuredBlogArticles.ts';

const SSI_TITLE =
  'Định danh tự chủ (SSI) là gì? Từ giới hạn của định danh số hiện nay đến một mô hình mới';
const SSI_DESCRIPTION =
  'Vì sao các mô hình định danh số hiện nay còn nhiều giới hạn, định danh tự chủ ra đời để giải quyết điều gì và SSI vận hành như thế nào?';

test('structured articles keep one canonical source for academic titles and descriptions', () => {
  for (const article of STRUCTURED_BLOG_ARTICLES) {
    const content = article.content.vi;
    const contentRecord = content as unknown as Record<string, unknown>;

    assert.equal('seoTitle' in contentRecord, false);
    assert.equal('seoDescription' in contentRecord, false);
    assert.equal(article.listing.vi.title, content.title);
    assert.deepEqual(getStructuredBlogSeoMetadata(article), {
      title: content.title,
      description: content.description,
    });
  }
});

test('SSI sharing metadata preserves the original academic title and description', () => {
  const article = STRUCTURED_BLOG_ARTICLES.find(
    ({ id }) => id === 'dinh-danh-tu-chu-ssi-la-gi',
  );

  assert.ok(article);
  assert.deepEqual(getStructuredBlogSeoMetadata(article), {
    title: SSI_TITLE,
    description: SSI_DESCRIPTION,
  });
});

test('structured article images use consistent standalone captions', () => {
  for (const article of STRUCTURED_BLOG_ARTICLES) {
    const lines = article.content.vi.markdown.split(/\r?\n/);
    const imageLineIndexes = lines
      .map((line, index) => (line.startsWith('![') ? index : -1))
      .filter((index) => index >= 0);

    assert.equal(imageLineIndexes.length, Object.keys(article.images).length);

    imageLineIndexes.forEach((imageLineIndex, imageIndex) => {
      assert.equal(lines[imageLineIndex + 1], '');
      assert.match(
        lines[imageLineIndex + 2] ?? '',
        new RegExp(`^\\*Hình ${imageIndex + 1}\\. .+\\*$`),
      );
    });
  }
});
