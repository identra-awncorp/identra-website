export const PAGE_PATHS: Record<string, string> = {
  home: '/',
  features: '/features',
  'tech-glossary': '/technology',
  'use-cases': '/use-cases',
  docs: '/documentation',
  guides: '/guides',
  blog: '/blog',
  about: '/about',
  careers: '/careers',
  faq: '/faq',
  privacy: '/privacy-policy',
  terms: '/terms-of-use',
  cookies: '/cookie-policy',
  specs: '/technical-specifications',
  'zkp-demo': '/zero-knowledge-proof',
};

const PAGE_BY_PATH = Object.fromEntries(
  Object.entries(PAGE_PATHS).map(([page, path]) => [path, page]),
);

const LEGACY_HASH_PAGES: Record<string, string> = {
  '#features': 'features',
  '#technology': 'tech-glossary',
  '#tech-glossary': 'tech-glossary',
  '#cases': 'use-cases',
  '#use-cases': 'use-cases',
  '#docs': 'docs',
  '#documents': 'docs',
  '#guides': 'guides',
  '#blog': 'blog',
  '#about': 'about',
  '#careers': 'careers',
  '#faq': 'faq',
  '#privacy': 'privacy',
  '#terms': 'terms',
  '#cookies': 'cookies',
};

export interface IdentraHistoryState {
  identra: true;
  index: number;
  page: string;
  scrollY: number;
}

export function getPathForPage(page: string): string {
  return PAGE_PATHS[page] ?? PAGE_PATHS.home;
}

export function getBlogPostPath(postId: string): string {
  return `${PAGE_PATHS.blog}/${encodeURIComponent(postId)}`;
}

export function getPageFromLocation(location: Location = window.location): string {
  const normalizedPath = location.pathname.replace(/\/+$/, '') || '/';
  if (normalizedPath.startsWith(`${PAGE_PATHS.blog}/`)) return 'blog';
  return PAGE_BY_PATH[normalizedPath] ?? LEGACY_HASH_PAGES[location.hash] ?? 'home';
}

export function isIdentraHistoryState(state: unknown): state is IdentraHistoryState {
  return Boolean(
    state &&
      typeof state === 'object' &&
      'identra' in state &&
      'index' in state &&
      'page' in state &&
      'scrollY' in state,
  );
}
