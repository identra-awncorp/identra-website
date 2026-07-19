import type { LocalizedDocsContent } from '../../components/docs/docsTypes';
import { buildApiReferenceDocsContent } from '../../components/docs/docsSdkReferenceCatalog';

export const API_REFERENCE_DOCS_TRANSLATIONS = {
  en: buildApiReferenceDocsContent('en'),
  es: buildApiReferenceDocsContent('es'),
  ja: buildApiReferenceDocsContent('ja'),
  de: buildApiReferenceDocsContent('de'),
  vi: buildApiReferenceDocsContent('vi')
} satisfies LocalizedDocsContent;
