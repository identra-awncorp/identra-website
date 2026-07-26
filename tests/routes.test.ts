import assert from 'node:assert/strict';
import test from 'node:test';

import {
  SUPPORTED_LOCALES,
  blogDetailPath,
  getBlogDetailLocales,
  getViewLocales,
  localizePath,
  pathToBlogDetailId,
  resolveViewLocale,
  viewToPath,
} from '../src/types/routes.ts';

test('white paper is exposed only through its Vietnamese route', () => {
  assert.deepEqual(getViewLocales('white-paper'), ['vi']);
  assert.equal(resolveViewLocale('white-paper', 'en'), 'vi');
  assert.equal(viewToPath('white-paper', 'ja'), '/vi/white-paper');
  assert.equal(localizePath('/en/white-paper', 'de'), '/vi/white-paper');
});

test('fully translated views keep all supported locales', () => {
  assert.deepEqual(getViewLocales('connect'), SUPPORTED_LOCALES);
  assert.equal(resolveViewLocale('connect', 'de'), 'de');
  assert.equal(viewToPath('connect', 'de'), '/de/connect');
});

test('Vietnamese-only SSI article canonicalizes every locale to Vietnamese', () => {
  const articleId = 'dinh-danh-tu-chu-ssi-la-gi';

  assert.deepEqual(getBlogDetailLocales(articleId), ['vi']);
  assert.equal(pathToBlogDetailId(`/en/blog-detail/${articleId}`), articleId);
  assert.equal(blogDetailPath(articleId, 'en'), `/vi/blog-detail/${articleId}`);
  assert.equal(
    localizePath(`/de/blog-detail/${articleId}`, 'ja'),
    `/vi/blog-detail/${articleId}`,
  );
});
