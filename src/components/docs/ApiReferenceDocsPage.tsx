import { useLanguage } from '../../context/LanguageContext';
import { API_REFERENCE_DOCS_TRANSLATIONS } from '../../translations/docs/ApiReferenceDocsTranslations';
import { getLocalizedRecord } from '../../utils/i18nRuntime';
import DocsDocument from './DocsDocument';
import type { DocsContentPageProps } from './docsTypes';

export default function ApiReferenceDocsPage(props: DocsContentPageProps) {
  const { language } = useLanguage();
  const content = getLocalizedRecord(API_REFERENCE_DOCS_TRANSLATIONS, language, 'API_REFERENCE_DOCS_TRANSLATIONS');

  return <DocsDocument {...props} content={content} />;
}
