export const SUPPORTED_LOCALES = ['en', 'es', 'ja', 'de', 'vi'] as const;

export type Locale = typeof SUPPORTED_LOCALES[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const APP_VIEWS = [
  'landing',
  'government-id',
  'about',
  'pricing',
  'login',
  'blog',
  'ebooks',
  'blog-detail',
  'events',
  'careers',
  'research',
  'compliance',
  'connect',
  'platform',
  'nfc',
  'customers',
  'dynamic-flow',
  'relay',
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
] as const;

export type BlogDetailId = typeof BLOG_DETAIL_IDS[number];

export const DEFAULT_BLOG_DETAIL_ID: BlogDetailId = 'blog-1';

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

export const VALID_VIEWS = new Set<AppView>(APP_VIEWS);
export const VALID_BLOG_DETAIL_IDS = new Set<BlogDetailId>(BLOG_DETAIL_IDS);
export const VALID_DEMO_SCENARIO_IDS = new Set<DemoScenarioId>(DEMO_SCENARIO_IDS);
export const VALID_LOCALES = new Set<Locale>(SUPPORTED_LOCALES);

export const isAppView = (value: string): value is AppView =>
  VALID_VIEWS.has(value as AppView);

export const isBlogDetailId = (value: string): value is BlogDetailId =>
  VALID_BLOG_DETAIL_IDS.has(value as BlogDetailId);

export const isDemoScenarioId = (value: string): value is DemoScenarioId =>
  VALID_DEMO_SCENARIO_IDS.has(value as DemoScenarioId);

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
  if (!isAppView(viewSegment)) return null;

  if (viewSegment === 'demo') {
    if (extraSegments.length === 0) return viewSegment;
    if (extraSegments.length > 1) return null;

    try {
      const decodedScenarioId = decodeURIComponent(extraSegments[0]);
      return isDemoScenarioId(decodedScenarioId) ? viewSegment : null;
    } catch {
      return null;
    }
  }

  if (viewSegment !== 'blog-detail' && extraSegments.length > 0) return null;

  return viewSegment;
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
  `/${locale}/blog-detail/${encodeURIComponent(id)}`;

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

export const viewToPath = (view: AppView, locale: Locale) => {
  if (view === 'landing') return `/${locale}`;
  if (view === 'blog-detail') return blogDetailPath(DEFAULT_BLOG_DETAIL_ID, locale);

  return `/${locale}/${view}`;
};

export const localizePath = (pathname: string, locale: Locale): string | null => {
  const view = pathToView(pathname);
  if (!view) return null;

  if (view === 'blog-detail') {
    const blogId = pathToBlogDetailId(pathname);
    return blogId ? blogDetailPath(blogId, locale) : null;
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
