import type { Locale } from '../../types/routes';

export type DocBlock =
  | { type: 'p'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'callout'; text: string }
  | { type: 'list'; items: Array<{ title: string; text: string }> }
  | { type: 'cards'; cards: Array<{ title: string; text: string }> }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'code'; language: string; code: string; fileName?: string }
  | { type: 'changelog'; items: Array<{ version: string; title: string; text: string }> };

export interface DocSection {
  id: string;
  title: string;
  blocks: DocBlock[];
}

export interface DocPage {
  id: string;
  title: string;
  category: string;
  sections: DocSection[];
  nextPageId?: string;
  prevPageId?: string;
}

export interface DocContent {
  title: string;
  category: string;
  sections: DocSection[];
}

export type LocalizedDocsContent = Record<Locale, DocContent>;

export type DocsTabId = 'overview' | 'inquiries' | 'transactions' | 'relay' | 'api-ref' | 'changelog';

export interface DocsNavigationItem {
  id: DocsTabId;
  label: string;
}

export interface DocsDocumentUi {
  backToMain: string;
  copied: string;
  copyFailed: string;
  copyPage: string;
  helpfulTitle: string;
  helpfulDesc: string;
  thanks: string;
  yes: string;
  no: string;
  previous: string;
  nextPage: string;
  builtWith: string;
  fern: string;
  onThisPage: string;
  documentSections: string;
  sectionTopics: string;
  topicLabels: {
    introduction: string;
    details: string;
    keyConcepts: string;
    importantNote: string;
    guidance: string;
    reference: string;
    codeExample: string;
    releaseHistory: string;
  };
}

export interface DocsContentPageProps {
  categories: Record<string, string>;
  ui: DocsDocumentUi;
  copyStatus: 'idle' | 'success' | 'error';
  feedbackSubmitted: null | 'yes' | 'no';
  previousPage: DocsNavigationItem | null;
  nextPage: DocsNavigationItem | null;
  onCopyPage: () => void;
  onFeedback: (feedback: 'yes' | 'no') => void;
  onNavigate: (tabId: DocsTabId) => void;
  onBackToLanding: () => void;
}
