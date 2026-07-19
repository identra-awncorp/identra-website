import { useLanguage } from '../../context/LanguageContext';
import { OVERVIEW_DOCS_TRANSLATIONS } from '../../translations/docs/OverviewDocsTranslations';
import { getLocalizedRecord } from '../../utils/i18nRuntime';
import DocsDocument from './DocsDocument';
import type { DocsContentPageProps } from './docsTypes';

export default function OverviewDocsPage(props: DocsContentPageProps) {
  const { language } = useLanguage();
  const content = getLocalizedRecord(OVERVIEW_DOCS_TRANSLATIONS, language, 'OVERVIEW_DOCS_TRANSLATIONS');

  return <DocsDocument {...props} content={content} />;
}
