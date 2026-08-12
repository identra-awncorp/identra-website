import type { DocsTabId } from './docsModel';

export const DOCS_TAB_SEQUENCE: DocsTabId[] = [
  'overview',
  'inquiries',
  'transactions',
  'credential-issuance',
  'api-ref',
  'changelog',
];

export const DOCS_TAB_QUERY_PARAM = 'tab';

export const DOCS_TAB_PAGE_IDS: Record<DocsTabId, string[]> = {
  overview: ['introduction', 'how-identra-works', 'security', 'environments', 'choose-integration'],
  inquiries: ['inquiries'],
  transactions: ['transactions'],
  'credential-issuance': ['credential-issuance'],
  'api-ref': ['api-reference'],
  changelog: ['changelog']
};

export const getTabIdForPage = (pageId: string): DocsTabId => (
  DOCS_TAB_SEQUENCE.find(tabId => DOCS_TAB_PAGE_IDS[tabId].includes(pageId)) ?? 'overview'
);

export const getDocsTabIdFromSearch = (
  search: string | URLSearchParams,
): DocsTabId | null => {
  const params = typeof search === 'string'
    ? new URLSearchParams(search)
    : search;
  const candidate = params.get(DOCS_TAB_QUERY_PARAM);
  return candidate && DOCS_TAB_SEQUENCE.includes(candidate as DocsTabId)
    ? candidate as DocsTabId
    : null;
};
