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
  'demo'
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

export const VALID_VIEWS = new Set<AppView>(APP_VIEWS);
export const VALID_BLOG_DETAIL_IDS = new Set<BlogDetailId>(BLOG_DETAIL_IDS);

export const isAppView = (value: string): value is AppView =>
  VALID_VIEWS.has(value as AppView);

export const isBlogDetailId = (value: string): value is BlogDetailId =>
  VALID_BLOG_DETAIL_IDS.has(value as BlogDetailId);

export const pathToView = (pathname: string): AppView => {
  const cleanPath = pathname.replace(/^\/+/, '').replace(/\/+$/, '');
  if (!cleanPath) return 'landing';

  const [viewSegment] = cleanPath.split('/');
  return isAppView(viewSegment) ? viewSegment : 'landing';
};

export const pathToBlogDetailId = (pathname: string): BlogDetailId => {
  const cleanPath = pathname.replace(/^\/+/, '').replace(/\/+$/, '');
  const [viewSegment, detailId] = cleanPath.split('/');
  if (viewSegment !== 'blog-detail' || !detailId) return DEFAULT_BLOG_DETAIL_ID;

  try {
    const decodedDetailId = decodeURIComponent(detailId);
    return isBlogDetailId(decodedDetailId) ? decodedDetailId : DEFAULT_BLOG_DETAIL_ID;
  } catch {
    return DEFAULT_BLOG_DETAIL_ID;
  }
};

export const blogDetailPath = (id: BlogDetailId) => `/blog-detail/${encodeURIComponent(id)}`;

export const viewToPath = (view: AppView) => {
  if (view === 'landing') return '/';
  if (view === 'blog-detail') return blogDetailPath(DEFAULT_BLOG_DETAIL_ID);

  return `/${view}`;
};
