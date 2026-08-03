import assert from 'node:assert/strict';
import test from 'node:test';

import {
  APP_VIEWS,
  DEFAULT_BLOG_DETAIL_ID,
  LEGACY_VIEW_ALIASES,
  PUBLIC_BLOG_DETAIL_IDS,
  SUPPORTED_LOCALES,
  blogDetailPath,
  dashboardFlowPath,
  dashboardPath,
  getBlogDetailLocales,
  getViewLocales,
  localizePath,
  pathToBlogDetailId,
  pathToDashboardRoute,
  pathToView,
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

test('Interface Studio and Relay publish independent canonical routes', () => {
  assert.ok(APP_VIEWS.includes('interface-studio'));
  assert.ok(APP_VIEWS.includes('relay'));
  assert.equal(viewToPath('interface-studio', 'vi'), '/vi/interface-studio');
  assert.equal(pathToView('/ja/interface-studio'), 'interface-studio');
  assert.equal(pathToView('/ja/flow-editor'), null);

  assert.deepEqual(LEGACY_VIEW_ALIASES, {});
  assert.equal(viewToPath('relay', 'de'), '/de/relay');
  assert.equal(pathToView('/de/relay'), 'relay');
  assert.equal(localizePath('/de/relay', 'vi'), '/vi/relay');
  assert.equal(pathToView('/vi/relay/unexpected'), null);
});

test('dashboard routes are canonical, localized, and preserve nested flow tools', () => {
  assert.ok(APP_VIEWS.includes('dashboard'));
  assert.equal(dashboardPath('vi'), '/vi/dashboard');
  assert.equal(
    dashboardFlowPath('flow 01', 'dynamic-flow', 'en'),
    '/en/dashboard/flows/flow%2001/dynamic-flow',
  );
  assert.deepEqual(pathToDashboardRoute('/vi/dashboard'), { page: 'overview' });
  assert.deepEqual(
    pathToDashboardRoute('/de/dashboard/flows/flow%2001/interface-studio'),
    {
      page: 'flow',
      flowId: 'flow 01',
      tool: 'interface-studio',
    },
  );
  assert.equal(
    localizePath('/de/dashboard/flows/flow%2001/interface-studio', 'ja'),
    '/ja/dashboard/flows/flow%2001/interface-studio',
  );
  assert.equal(pathToView('/en/dashboard/flows/flow-1/dynamic-flow'), 'dashboard');
  assert.equal(pathToView('/en/dashboard/flows/flow-1/unknown-tool'), null);
  assert.equal(pathToView('/en/dashboard/unexpected'), null);
});

test('Vietnamese-only structured articles canonicalize every locale to Vietnamese', () => {
  const articleIds = [
    'dinh-danh-tu-chu-ssi-la-gi',
    'ho-so-hoc-tap-suot-doi-loi-ich-cua-mo-hinh-dinh-danh-tu-chu-doi-voi-nguoi-hoc',
    'ssi-trong-giao-duc-giai-phap-so-hoa-bang-cap-va-xac-minh-nang-luc',
    'tu-thi-diem-cua-mit-den-lan-song-so-hoa-bang-cap-khong-the-dao-nguoc',
    'rao-can-phap-ly-trong-tuyen-dung-quoc-te-ssi-mo-duong-cho-nhan-su-remote-nhu-the-nao',
    'vuot-xa-super-app-ky-nguyen-ultra-app',
    'tuong-lai-cua-xac-thuc-va-truy-xuat-nguon-goc-san-pham',
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
  assert.equal(PUBLIC_BLOG_DETAIL_IDS.length, 7);
  assert.equal(pathToBlogDetailId('/vi/blog-detail/blog-1'), null);
  assert.equal(
    viewToPath('blog-detail', 'en'),
    '/vi/blog-detail/dinh-danh-tu-chu-ssi-la-gi',
  );
});
