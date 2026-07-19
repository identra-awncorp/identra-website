import { useLanguage } from '../../context/LanguageContext';
import { OVERVIEW_DOCS_TRANSLATIONS } from '../../translations/docs/OverviewDocsTranslations';
import { getLocalizedRecord } from '../../utils/i18nRuntime';
import DocsArticleLayout from './DocsArticleLayout';
import type { DocsContentPageProps } from './docsModel';

export default function DocsOverviewPage(props: DocsContentPageProps) {
  const { language } = useLanguage();
  const content = getLocalizedRecord(OVERVIEW_DOCS_TRANSLATIONS, language, 'OVERVIEW_DOCS_TRANSLATIONS');

  return <DocsArticleLayout {...props} content={content} />;
}
