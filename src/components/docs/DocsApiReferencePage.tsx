import { useLanguage } from '../../context/LanguageContext';
import { API_REFERENCE_DOCS_TRANSLATIONS } from '../../translations/docs/ApiReferenceDocsTranslations';
import { getLocalizedRecord } from '../../utils/i18nRuntime';
import DocsArticleLayout from './DocsArticleLayout';
import type { DocsContentPageProps } from './docsModel';

export default function DocsApiReferencePage(props: DocsContentPageProps) {
  const { language } = useLanguage();
  const content = getLocalizedRecord(API_REFERENCE_DOCS_TRANSLATIONS, language, 'API_REFERENCE_DOCS_TRANSLATIONS');

  return <DocsArticleLayout {...props} content={content} />;
}
