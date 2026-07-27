import assert from 'node:assert/strict';
import test from 'node:test';

import {
  DEFAULT_BLOG_DETAIL_ID,
  PUBLIC_BLOG_DETAIL_IDS,
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

test('Vietnamese-only structured articles canonicalize every locale to Vietnamese', () => {
  const articleIds = [
    'dinh-danh-tu-chu-ssi-la-gi',
    'ho-so-hoc-tap-suot-doi-loi-ich-cua-mo-hinh-dinh-danh-tu-chu-doi-voi-nguoi-hoc',
    'ssi-trong-giao-duc-giai-phap-so-hoa-bang-cap-va-xac-minh-nang-luc',
    'tu-thi-diem-cua-mit-den-lan-song-so-hoa-bang-cap-khong-the-dao-nguoc',
    'rao-can-phap-ly-trong-tuyen-dung-quoc-te-ssi-mo-duong-cho-nhan-su-remote-nhu-the-nao',
  ] as const;

  for (const articleId of articleIds) {
    assert.deepEqual(getBlogDetailLocales(articleId), ['vi']);
    assert.equal(pathToBlogDetailId(`/en/blog-detail/${articleId}`), articleId);
    assert.equal(blogDetailPath(articleId, 'en'), `/vi/blog-detail/${articleId}`);
    assert.equal(
      localizePath(`/de/blog-detail/${articleId}`, 'ja'),
      `/vi/blog-detail/${articleId}`,
    );
  }
});

test('only real structured articles are published as blog detail routes', () => {
  assert.equal(DEFAULT_BLOG_DETAIL_ID, 'dinh-danh-tu-chu-ssi-la-gi');
  assert.equal(PUBLIC_BLOG_DETAIL_IDS.length, 5);
  assert.equal(pathToBlogDetailId('/vi/blog-detail/blog-1'), null);
  assert.equal(
    viewToPath('blog-detail', 'en'),
    '/vi/blog-detail/dinh-danh-tu-chu-ssi-la-gi',
  );
});
