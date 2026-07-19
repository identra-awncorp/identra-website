import { useLanguage } from '../../context/LanguageContext';
import { INQUIRIES_DOCS_TRANSLATIONS } from '../../translations/docs/InquiriesDocsTranslations';
import { getLocalizedRecord } from '../../utils/i18nRuntime';
import DocsArticleLayout from './DocsArticleLayout';
import type { DocsContentPageProps } from './docsModel';

export default function DocsInquiriesPage(props: DocsContentPageProps) {
  const { language } = useLanguage();
  const content = getLocalizedRecord(INQUIRIES_DOCS_TRANSLATIONS, language, 'INQUIRIES_DOCS_TRANSLATIONS');

  return <DocsArticleLayout {...props} content={content} />;
}
