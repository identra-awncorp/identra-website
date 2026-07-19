import type { Locale } from '../../types/routes';
import type { DocsSdkVariantId } from './docsSdkFlowCatalog';

export type DocBlock =
  | { type: 'p'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'callout'; text: string }
  | { type: 'list'; items: Array<{ title: string; text: string }> }
  | { type: 'cards'; cards: Array<{ title: string; text: string }> }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'code'; language: string; code: string; fileName?: string }
  | { type: 'sdkExplorer'; flow: DocsSdkFlow }
  | { type: 'referenceStage'; stage: DocsReferenceStage }
  | { type: 'changelog'; items: Array<{ version: string; title: string; text: string }> };

export type DocsSdkFlow = 'issuance' | 'holder' | 'verification';

export type DocsReferenceActor = 'issuer' | 'holder' | 'verifier';
export type DocsReferencePhase = 'identity' | 'issuance' | 'verification';
export type DocsReferenceCodeKey =
  | 'issuerKeys'
  | 'issuerDid'
  | 'holderWallet'
  | 'issuerInvitation'
  | 'holderIssuerConnection'
  | 'issueCredential'
  | 'holderStore'
  | 'verifierIdentity'
  | 'verifierInvitation'
  | 'holderVerifierConnection'
  | 'presentationRequest'
  | 'createPresentation'
  | 'verifyPresentation'
  | 'verificationReceipt';

export interface DocsReferenceStage {
  id: string;
  number: string;
  phase: DocsReferencePhase;
  phaseLabel: string;
  actor: DocsReferenceActor;
  actorLabel: string;
  protocol: string;
  title: string;
  summary: string;
  inputLabel: string;
  outputLabel: string;
  securityLabel: string;
  inputs: string[];
  outputs: string[];
  security: string;
  codeKey: DocsReferenceCodeKey;
  variants: DocsSdkVariantId[];
}

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

export interface DocsArticleLayoutUi {
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
  ui: DocsArticleLayoutUi;
  copyStatus: 'idle' | 'success' | 'error';
  feedbackSubmitted: null | 'yes' | 'no';
  previousPage: DocsNavigationItem | null;
  nextPage: DocsNavigationItem | null;
  onCopyPage: () => void;
  onFeedback: (feedback: 'yes' | 'no') => void;
  onNavigate: (tabId: DocsTabId) => void;
  onBackToLanding: () => void;
}
