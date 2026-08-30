export const SUPPORTED_LOCALES = ['en', 'es', 'ja', 'de', 'vi'] as const;

export type Locale = typeof SUPPORTED_LOCALES[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const APP_VIEWS = [
  'landing',
  'government-id',
  'about',
  'pricing',
  'login',
  'dashboard',
  'blog',
  'ebooks',
  'blog-detail',
  'events',
  'careers',
  'research',
  'compliance',
  'connect',
  'credential-issuance',
  'platform',
  'nfc',
  'customers',
  'dynamic-flow',
  'interface-studio',
  'kyb',
  'business-fraud',
  'contact',
  'partners',
  'security',
  'docs',
  'passive-signals',
  'case-management',
  'graph',
  'workflows',
  'copilot',
  'marketplace',
  'document-ai',
  'selfie-age-estimation',
  'selfie-recognition',
  'database-checks',
  'phone-email',
  'mobile-drivers-license',
  'watchlists',
  'adverse-media',
  'profile-report',
  'phone-email-risk',
  'address-lookup',
  'social-media-lookup',
  'age-assurance',
  'candidate-verification',
  'workforce-idv',
  'background-checks',
  'reverification',
  'manual-review',
  'fintech',
  'marketplaces',
  'digital-health',
  'payments',
  'cryptocurrency',
  'government',
  'financial-institutions',
  'e-learning',
  'higher-education',
  'compliance-goal',
  'trust',
  'fraud-prevent',
  'global-expansion',
  'resource-center',
  'privacy-overview',
  'academy',
  'demo',
  'white-paper'
] as const;

export type AppView = typeof APP_VIEWS[number];

export const LEGACY_VIEW_ALIASES = {} as const satisfies Record<string, AppView>;

export type LegacyViewAlias = keyof typeof LEGACY_VIEW_ALIASES;

const VIEW_LOCALE_OVERRIDES: Partial<Record<AppView, readonly Locale[]>> = {
  'white-paper': ['vi'],
};

export const getViewLocales = (view: AppView): readonly Locale[] =>
  VIEW_LOCALE_OVERRIDES[view] ?? SUPPORTED_LOCALES;

export const resolveViewLocale = (view: AppView, locale: Locale): Locale => {
  const supportedLocales = getViewLocales(view);
  return supportedLocales.includes(locale) ? locale : supportedLocales[0] ?? DEFAULT_LOCALE;
};

export const BLOG_DETAIL_IDS = [
  'blog-1',
  'blog-2',
  'blog-3',
  'blog-4',
  'blog-5',
  'blog-6',
  'blog-7',
  'blog-8',
  'blog-9',
  'blog-10',
  'blog-11',
  'blog-12',
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
] as const;

export type BlogDetailId = typeof BLOG_DETAIL_IDS[number];

export const PUBLIC_BLOG_DETAIL_IDS = [
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
] as const satisfies readonly BlogDetailId[];

export const DEFAULT_BLOG_DETAIL_ID: BlogDetailId = 'dinh-danh-tu-chu-ssi-la-gi';

const BLOG_DETAIL_LOCALE_OVERRIDES: Partial<Record<BlogDetailId, readonly Locale[]>> = {
  'dinh-danh-tu-chu-ssi-la-gi': ['vi'],
  'ho-so-hoc-tap-suot-doi-loi-ich-cua-mo-hinh-dinh-danh-tu-chu-doi-voi-nguoi-hoc': ['vi'],
  'ssi-trong-giao-duc-giai-phap-so-hoa-bang-cap-va-xac-minh-nang-luc': ['vi'],
  'tu-thi-diem-cua-mit-den-lan-song-so-hoa-bang-cap-khong-the-dao-nguoc': ['vi'],
  'rao-can-phap-ly-trong-tuyen-dung-quoc-te-ssi-mo-duong-cho-nhan-su-remote-nhu-the-nao': ['vi'],
  'vuot-xa-super-app-ky-nguyen-ultra-app': ['vi'],
  'tuong-lai-cua-xac-thuc-va-truy-xuat-nguon-goc-san-pham': ['vi'],
  'ssi-blockchain-va-tuong-lai-xuat-khau-hang-hoa-viet-nam-sang-eu': ['vi'],
  'chau-au-dang-dan-dau-cuoc-chuyen-dich-sang-dinh-danh-tu-chu': ['vi'],
  'giai-bai-toan-niem-tin-du-lieu-de-phat-trien-kinh-te-so-kinh-te-ai': ['vi'],
  'did-la-gi': ['vi'],
  'vi-dinh-tin-la-gi': ['vi'],
  'thuc-chung-la-gi': ['vi'],
  'tiet-lo-co-chon-loc-la-gi': ['vi'],
  'ro-ri-du-lieu-tai-trung-quoc-va-an-do-bai-hoc-ve-an-ninh-du-lieu-va-cach-ssi-thay-doi-cach-chung-ta-bao-ve-thong-tin': ['vi'],
  'lua-dao-truc-tuyen-va-bai-toan-bao-ve-du-lieu-ca-nhan-trong-thoi-dai-so': ['vi'],
};

export const getBlogDetailLocales = (id: BlogDetailId): readonly Locale[] =>
  BLOG_DETAIL_LOCALE_OVERRIDES[id] ?? SUPPORTED_LOCALES;

export const resolveBlogDetailLocale = (id: BlogDetailId, locale: Locale): Locale => {
  const supportedLocales = getBlogDetailLocales(id);
  return supportedLocales.includes(locale) ? locale : supportedLocales[0] ?? DEFAULT_LOCALE;
};

export const DEMO_SCENARIO_IDS = [
  'bank-account',
  'apply-job',
  'ticket-booking',
  'airlines-hotels',
  'government-services',
  'healthcare',
  'ticket-transfer',
] as const;

export type DemoScenarioId = typeof DEMO_SCENARIO_IDS[number];

export const DASHBOARD_TOOL_IDS = [
  'dynamic-flow',
  'interface-studio',
] as const;

export type DashboardToolId = typeof DASHBOARD_TOOL_IDS[number];

export type DashboardRoute =
  | {
      readonly page: 'overview';
    }
  | {
      readonly page: 'credential-issuance';
    }
  | {
      readonly page: 'flow';
      readonly flowId: string;
      readonly tool: DashboardToolId;
    };

export const VALID_VIEWS = new Set<AppView>(APP_VIEWS);
export const VALID_BLOG_DETAIL_IDS = new Set<BlogDetailId>(PUBLIC_BLOG_DETAIL_IDS);
export const VALID_DEMO_SCENARIO_IDS = new Set<DemoScenarioId>(DEMO_SCENARIO_IDS);
export const VALID_LOCALES = new Set<Locale>(SUPPORTED_LOCALES);

export const isAppView = (value: string): value is AppView =>
  VALID_VIEWS.has(value as AppView);

export const isBlogDetailId = (value: string): value is BlogDetailId =>
  VALID_BLOG_DETAIL_IDS.has(value as BlogDetailId);

export const isDemoScenarioId = (value: string): value is DemoScenarioId =>
  VALID_DEMO_SCENARIO_IDS.has(value as DemoScenarioId);

export const isDashboardToolId = (value: string): value is DashboardToolId =>
  DASHBOARD_TOOL_IDS.includes(value as DashboardToolId);

export const isLocale = (value: string): value is Locale =>
  VALID_LOCALES.has(value as Locale);

const pathSegments = (pathname: string): string[] =>
  pathname.split('/').filter(Boolean);

export const pathToLocale = (pathname: string): Locale | null => {
  const [localeSegment] = pathSegments(pathname);
  if (!localeSegment) return null;

  const normalizedLocale = localeSegment.toLowerCase();
  return isLocale(normalizedLocale) ? normalizedLocale : null;
};

export const stripLocaleFromPath = (pathname: string): string => {
  const segments = pathSegments(pathname);
  const routeSegments = pathToLocale(pathname) ? segments.slice(1) : segments;

  return routeSegments.length > 0 ? `/${routeSegments.join('/')}` : '/';
};

export const pathToView = (pathname: string): AppView | null => {
  const cleanPath = stripLocaleFromPath(pathname).replace(/^\/+/, '').replace(/\/+$/, '');
  if (!cleanPath) return 'landing';

  const [viewSegment, ...extraSegments] = cleanPath.split('/');
  const aliasedView = (
    LEGACY_VIEW_ALIASES as Partial<Record<string, AppView>>
  )[viewSegment];
  const resolvedView = isAppView(viewSegment) ? viewSegment : aliasedView;
  if (!resolvedView) return null;

  if (resolvedView === 'demo') {
    if (extraSegments.length === 0) return resolvedView;
    if (extraSegments.length > 1) return null;

    try {
      const decodedScenarioId = decodeURIComponent(extraSegments[0]);
      return isDemoScenarioId(decodedScenarioId) ? resolvedView : null;
    } catch {
      return null;
    }
  }

  if (resolvedView === 'dashboard') {
    return pathToDashboardRoute(pathname) ? resolvedView : null;
  }

  if (resolvedView !== 'blog-detail' && extraSegments.length > 0) return null;

  return resolvedView;
};

export const pathToDashboardRoute = (pathname: string): DashboardRoute | null => {
  const cleanPath = stripLocaleFromPath(pathname).replace(/^\/+/, '').replace(/\/+$/, '');
  const [viewSegment, collectionSegment, encodedFlowId, toolSegment, ...extraSegments] =
    cleanPath.split('/');

  if (viewSegment !== 'dashboard') return null;
  if (!collectionSegment && !encodedFlowId && !toolSegment) {
    return { page: 'overview' };
  }
  if (
    collectionSegment === 'credential-issuance'
    && !encodedFlowId
    && !toolSegment
    && extraSegments.length === 0
  ) {
    return { page: 'credential-issuance' };
  }
  if (
    collectionSegment !== 'flows'
    || !encodedFlowId
    || !toolSegment
    || extraSegments.length > 0
    || !isDashboardToolId(toolSegment)
  ) {
    return null;
  }

  try {
    const flowId = decodeURIComponent(encodedFlowId);
    if (!flowId.trim() || flowId.includes('/')) return null;
    return {
      page: 'flow',
      flowId,
      tool: toolSegment,
    };
  } catch {
    return null;
  }
};

export const pathToBlogDetailId = (pathname: string): BlogDetailId | null => {
  const cleanPath = stripLocaleFromPath(pathname).replace(/^\/+/, '').replace(/\/+$/, '');
  const [viewSegment, detailId, ...extraSegments] = cleanPath.split('/');
  if (viewSegment !== 'blog-detail' || !detailId || extraSegments.length > 0) return null;

  try {
    const decodedDetailId = decodeURIComponent(detailId);
    return isBlogDetailId(decodedDetailId) ? decodedDetailId : null;
  } catch {
    return null;
  }
};

export const blogDetailPath = (id: BlogDetailId, locale: Locale) =>
  `/${resolveBlogDetailLocale(id, locale)}/blog-detail/${encodeURIComponent(id)}`;

export const pathToDemoScenarioId = (pathname: string): DemoScenarioId | null => {
  const cleanPath = stripLocaleFromPath(pathname).replace(/^\/+/, '').replace(/\/+$/, '');
  const [viewSegment, scenarioId, ...extraSegments] = cleanPath.split('/');
  if (viewSegment !== 'demo' || !scenarioId || extraSegments.length > 0) return null;

  try {
    const decodedScenarioId = decodeURIComponent(scenarioId);
    return isDemoScenarioId(decodedScenarioId) ? decodedScenarioId : null;
  } catch {
    return null;
  }
};

export const demoScenarioPath = (id: DemoScenarioId, locale: Locale) =>
  `/${locale}/demo/${encodeURIComponent(id)}`;

export const dashboardPath = (locale: Locale) =>
  `/${locale}/dashboard`;

export const dashboardCredentialIssuancePath = (locale: Locale) =>
  `/${locale}/dashboard/credential-issuance`;

export const credentialIssuanceDocsPath = (locale: Locale) =>
  `/${locale}/docs?tab=credential-issuance`;

export const dashboardFlowPath = (
  flowId: string,
  tool: DashboardToolId,
  locale: Locale,
) => `/${locale}/dashboard/flows/${encodeURIComponent(flowId)}/${tool}`;

export const legacyViewAliasPath = (alias: LegacyViewAlias, locale: Locale) =>
  `/${locale}/${alias}`;

export const viewToPath = (view: AppView, locale: Locale) => {
  const resolvedLocale = resolveViewLocale(view, locale);
  if (view === 'landing') return `/${resolvedLocale}`;
  if (view === 'blog-detail') return blogDetailPath(DEFAULT_BLOG_DETAIL_ID, resolvedLocale);

  return `/${resolvedLocale}/${view}`;
};

export const localizePath = (pathname: string, locale: Locale): string | null => {
  const view = pathToView(pathname);
  if (!view) return null;

  if (view === 'blog-detail') {
    const blogId = pathToBlogDetailId(pathname);
    return blogId ? blogDetailPath(blogId, locale) : null;
  }

  if (view === 'dashboard') {
    const dashboardRoute = pathToDashboardRoute(pathname);
    if (!dashboardRoute) return null;
    if (dashboardRoute.page === 'overview') return dashboardPath(locale);
    if (dashboardRoute.page === 'credential-issuance') {
      return dashboardCredentialIssuancePath(locale);
    }
    return dashboardFlowPath(dashboardRoute.flowId, dashboardRoute.tool, locale);
  }

  if (view === 'demo') {
    const scenarioId = pathToDemoScenarioId(pathname);
    return scenarioId ? demoScenarioPath(scenarioId, locale) : viewToPath(view, locale);
  }

  return viewToPath(view, locale);
};

export const replacePathLocale = (pathname: string, locale: Locale): string => {
  const routePath = stripLocaleFromPath(pathname);
  return routePath === '/' ? `/${locale}` : `/${locale}${routePath}`;
};
