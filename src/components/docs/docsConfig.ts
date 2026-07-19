import type { DocsTabId } from './docsTypes';

export const DOCS_TAB_SEQUENCE: DocsTabId[] = ['overview', 'inquiries', 'transactions', 'relay', 'api-ref', 'changelog'];

export const DOCS_TAB_PAGE_IDS: Record<DocsTabId, string[]> = {
  overview: ['introduction', 'how-identra-works', 'security', 'environments', 'choose-integration'],
  inquiries: ['inquiries'],
  transactions: ['transactions'],
  relay: ['relay'],
  'api-ref': ['api-reference'],
  changelog: ['changelog']
};

export const getTabIdForPage = (pageId: string): DocsTabId => (
  DOCS_TAB_SEQUENCE.find(tabId => DOCS_TAB_PAGE_IDS[tabId].includes(pageId)) ?? 'overview'
);
