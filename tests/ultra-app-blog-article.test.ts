import assert from 'node:assert/strict';
import test from 'node:test';

import {
  ULTRA_APP_BLOG_ARTICLE,
  ULTRA_APP_BLOG_ARTICLE_ID,
} from '../src/content/blog/vuot-xa-super-app-ky-nguyen-ultra-app.ts';
import {
  getStructuredBlogArticle,
  STRUCTURED_BLOG_ARTICLES,
} from '../src/content/blog/structuredBlogArticles.ts';
import { SUPPORTED_LOCALES } from '../src/types/routes.ts';

test('Ultra App article exposes localized listing metadata and Vietnamese content', () => {
  assert.equal(ULTRA_APP_BLOG_ARTICLE.id, ULTRA_APP_BLOG_ARTICLE_ID);
  assert.deepEqual(
    Object.keys(ULTRA_APP_BLOG_ARTICLE.listing),
    [...SUPPORTED_LOCALES],
  );
  assert.deepEqual(ULTRA_APP_BLOG_ARTICLE.contentLocales, ['vi']);
  assert.deepEqual(Object.keys(ULTRA_APP_BLOG_ARTICLE.content), ['vi']);
  assert.equal(
    getStructuredBlogArticle(ULTRA_APP_BLOG_ARTICLE_ID),
    ULTRA_APP_BLOG_ARTICLE,
  );
  assert.equal(STRUCTURED_BLOG_ARTICLES[0], ULTRA_APP_BLOG_ARTICLE);
  assert.deepEqual(
    STRUCTURED_BLOG_ARTICLES.map((article) => article.publishedAt),
    STRUCTURED_BLOG_ARTICLES
      .map((article) => article.publishedAt)
      .sort((left, right) => right.localeCompare(left)),
  );
});

test('Ultra App article preserves its source title and uses four optimized images', () => {
  const content = ULTRA_APP_BLOG_ARTICLE.content.vi;
  const imageMatches = content.markdown.match(/!\[[^\]]+\]\([^)]+\.webp\)/g) ?? [];

  assert.equal(content.title, 'Vượt xa Super App: Kỷ nguyên Ultra App');
  assert.equal(ULTRA_APP_BLOG_ARTICLE.listing.vi.title, content.title);
  assert.equal(content.markdown.startsWith('---'), false);
  assert.equal(content.markdown.startsWith('# '), false);
  assert.equal(/^---$/m.test(content.markdown), false);
  assert.equal(content.markdown.includes('### Thông tin xuất bản'), false);
  assert.equal(imageMatches.length, 4);
  assert.equal(Object.keys(ULTRA_APP_BLOG_ARTICLE.images).length, 4);

  for (const image of Object.values(ULTRA_APP_BLOG_ARTICLE.images)) {
    assert.equal(image.width, 1440);
    assert.equal(image.height, 810);
    assert.match(image.srcSet, /800w/);
    assert.match(image.srcSet, /1440w/);
  }
});

test('Ultra App article includes its complete references section', () => {
  const content = ULTRA_APP_BLOG_ARTICLE.content.vi;
  const referenceUrls = [
    'https://www.tencent.com/products/weixin-wechat/',
    'https://www.tencent.com/products/weixin-mini-programs/',
    'https://www.w3.org/TR/vc-data-model-2.0/',
    'https://www.w3.org/TR/did-core/',
    'https://digital-strategy.ec.europa.eu/en/policies/eudi-regulation',
    'https://digital-strategy.ec.europa.eu/en/policies/eudi-wallet-toolbox',
    'https://support.apple.com/en-lamr/123719',
    'https://developers.google.com/wallet/identity',
    'https://modelcontextprotocol.io/docs/getting-started/intro',
    'https://a2a-protocol.org/dev/specification/',
    'https://ethereum.org/developers/docs/smart-contracts/',
  ];

  assert.equal(content.markdown.includes('## Tài liệu tham khảo'), true);
  assert.equal(
    content.tableOfContents.some((item) => item.id === 'tai-lieu-tham-khao'),
    true,
  );

  for (const url of referenceUrls) {
    assert.equal(content.markdown.includes(url), true);
  }
});
