import type { LocalizedDocsContent } from '../../components/docs/docsModel';
import { buildApiReferenceDocsContent } from '../../components/docs/docsApiReferenceCatalog';

export const API_REFERENCE_DOCS_TRANSLATIONS = {
  en: buildApiReferenceDocsContent('en'),
  es: buildApiReferenceDocsContent('es'),
  ja: buildApiReferenceDocsContent('ja'),
  de: buildApiReferenceDocsContent('de'),
  vi: buildApiReferenceDocsContent('vi')
} satisfies LocalizedDocsContent;
