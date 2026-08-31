import assert from 'node:assert/strict';
import test from 'node:test';

import {
  APP_VIEWS,
  DEFAULT_BLOG_DETAIL_ID,
  DEMO_SCENARIO_IDS,
  LEGACY_VIEW_ALIASES,
  PUBLIC_BLOG_DETAIL_IDS,
  SUPPORTED_LOCALES,
  blogDetailPath,
  credentialIssuanceDocsPath,
  dashboardCredentialIssuancePath,
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
import { getDocsTabIdFromSearch } from '../src/components/docs/docsNavigation.ts';
import { getDemoSeoProfile } from '../src/content/demoSeoProfiles.ts';

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

test('Interface Studio and Credential Issuance publish independent canonical routes', () => {
  assert.ok(APP_VIEWS.includes('interface-studio'));
  assert.ok(APP_VIEWS.includes('credential-issuance'));
  assert.equal(viewToPath('interface-studio', 'vi'), '/vi/interface-studio');
  assert.equal(pathToView('/ja/interface-studio'), 'interface-studio');
  assert.equal(pathToView('/ja/flow-editor'), null);

  assert.deepEqual(LEGACY_VIEW_ALIASES, {});
  assert.equal(viewToPath('credential-issuance', 'de'), '/de/credential-issuance');
  assert.equal(pathToView('/de/credential-issuance'), 'credential-issuance');
  assert.equal(localizePath('/de/credential-issuance', 'vi'), '/vi/credential-issuance');
  assert.equal(pathToView('/vi/credential-issuance/unexpected'), null);
  assert.equal(pathToView('/vi/relay'), null);
});

test('dashboard routes are canonical, localized, and preserve nested flow tools', () => {
  assert.ok(APP_VIEWS.includes('dashboard'));
  assert.equal(dashboardPath('vi'), '/vi/dashboard');
  assert.equal(
    dashboardCredentialIssuancePath('vi'),
    '/vi/dashboard/credential-issuance',
  );
  assert.deepEqual(
    pathToDashboardRoute('/vi/dashboard/credential-issuance'),
    { page: 'credential-issuance' },
  );
  assert.equal(
    localizePath('/de/dashboard/credential-issuance', 'ja'),
    '/ja/dashboard/credential-issuance',
  );
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

test('Credential Issuance docs path opens the dedicated docs tab', () => {
  assert.equal(
    credentialIssuanceDocsPath('en'),
    '/en/docs?tab=credential-issuance',
  );
  assert.equal(
    getDocsTabIdFromSearch('?tab=credential-issuance'),
    'credential-issuance',
  );
  assert.equal(getDocsTabIdFromSearch('?tab=unknown'), null);
});

test('every demo scenario has unique localized search metadata', () => {
  for (const locale of SUPPORTED_LOCALES) {
    const profiles = DEMO_SCENARIO_IDS.map((scenarioId) =>
      getDemoSeoProfile(scenarioId, locale));

    assert.equal(new Set(profiles.map(({ title }) => title)).size, profiles.length);
    assert.equal(
      new Set(profiles.map(({ description }) => description)).size,
      profiles.length,
    );
    assert.ok(
      profiles.every(({ title, headline, description }) =>
        title.trim() && headline.trim() && description.trim()),
    );
  }
});

test('Vietnamese-only structured articles canonicalize every locale to Vietnamese', () => {
  const articleIds = [
    'eudi-wallet-buoc-vao-doi-song-2026-2027-va-buoc-ngoat-dinh-danh-so-tai-chau-au',
    'dinh-danh-tu-chu-ssi-la-gi',
    'ho-so-hoc-tap-suot-doi-loi-ich-cua-mo-hinh-dinh-danh-tu-chu-doi-voi-nguoi-hoc',
    'ssi-trong-giao-duc-giai-phap-so-hoa-bang-cap-va-xac-minh-nang-luc',
    'tu-thi-diem-cua-mit-den-lan-song-so-hoa-bang-cap-khong-the-dao-nguoc',
    'rao-can-phap-ly-trong-tuyen-dung-quoc-te-ssi-mo-duong-cho-nhan-su-remote-nhu-the-nao',
    'vuot-xa-super-app-ky-nguyen-ultra-app',
    'tuong-lai-cua-xac-thuc-va-truy-xuat-nguon-goc-san-pham',
    'ssi-blockchain-va-tuong-lai-xuat-khau-hang-hoa-viet-nam-sang-eu',
    'chau-au-dang-dan-dau-cuoc-chuyen-dich-sang-dinh-danh-tu-chu',
    'giai-bai-toan-niem-tin-du-lieu-de-phat-trien-kinh-te-so-kinh-te-ai',
    'did-la-gi',
    'vi-dinh-tin-la-gi',
    'thuc-chung-la-gi',
    'tiet-lo-co-chon-loc-la-gi',
    'ro-ri-du-lieu-tai-trung-quoc-va-an-do-bai-hoc-ve-an-ninh-du-lieu-va-cach-ssi-thay-doi-cach-chung-ta-bao-ve-thong-tin',
    'lua-dao-truc-tuyen-va-bai-toan-bao-ve-du-lieu-ca-nhan-trong-thoi-dai-so',
    'tu-gdpr-den-ssi-vi-sao-chau-au-lai-muon-trao-quyen-kiem-soat-du-lieu-cho-nguoi-dung',
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
  assert.equal(PUBLIC_BLOG_DETAIL_IDS.length, 18);
  assert.equal(pathToBlogDetailId('/vi/blog-detail/blog-1'), null);
  assert.equal(
    viewToPath('blog-detail', 'en'),
    '/vi/blog-detail/dinh-danh-tu-chu-ssi-la-gi',
  );
});
