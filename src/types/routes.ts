export const APP_VIEWS = [
  'landing',
  'government-id',
  'about',
  'pricing',
  'login',
  'blog',
  'ebooks',
  'ebook-detail',
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

export const EBOOK_DETAIL_IDS = [
  'k8m4q2z7v9p1x6d3',
] as const;

export type EbookDetailId = typeof EBOOK_DETAIL_IDS[number];

export const SENTINEL_EBOOK_DETAIL_ID: EbookDetailId = 'k8m4q2z7v9p1x6d3';
export const DEFAULT_EBOOK_DETAIL_ID: EbookDetailId = SENTINEL_EBOOK_DETAIL_ID;

export const VALID_VIEWS = new Set<AppView>(APP_VIEWS);
export const VALID_EBOOK_DETAIL_IDS = new Set<EbookDetailId>(EBOOK_DETAIL_IDS);

export const isAppView = (value: string): value is AppView =>
  VALID_VIEWS.has(value as AppView);

export const isEbookDetailId = (value: string): value is EbookDetailId =>
  VALID_EBOOK_DETAIL_IDS.has(value as EbookDetailId);

export const pathToView = (pathname: string): AppView => {
  const cleanPath = pathname.replace(/^\/+/, '').replace(/\/+$/, '');
  if (!cleanPath) return 'landing';

  const [viewSegment] = cleanPath.split('/');
  return isAppView(viewSegment) ? viewSegment : 'landing';
};

export const pathToEbookDetailId = (pathname: string): EbookDetailId => {
  const cleanPath = pathname.replace(/^\/+/, '').replace(/\/+$/, '');
  const [viewSegment, detailId] = cleanPath.split('/');
  if (viewSegment !== 'ebook-detail' || !detailId) return DEFAULT_EBOOK_DETAIL_ID;

  try {
    const decodedDetailId = decodeURIComponent(detailId);
    return isEbookDetailId(decodedDetailId) ? decodedDetailId : DEFAULT_EBOOK_DETAIL_ID;
  } catch {
    return DEFAULT_EBOOK_DETAIL_ID;
  }
};

export const ebookDetailPath = (id: EbookDetailId) => `/ebook-detail/${encodeURIComponent(id)}`;

export const viewToPath = (view: AppView) => {
  if (view === 'landing') return '/';
  if (view === 'ebook-detail') return ebookDetailPath(DEFAULT_EBOOK_DETAIL_ID);

  return `/${view}`;
};
