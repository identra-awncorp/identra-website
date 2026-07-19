import { useLanguage } from '../../context/LanguageContext';
import { INQUIRIES_DOCS_TRANSLATIONS } from '../../translations/docs/InquiriesDocsTranslations';
import { getLocalizedRecord } from '../../utils/i18nRuntime';
import DocsDocument from './DocsDocument';
import type { DocsContentPageProps } from './docsTypes';

export default function InquiriesDocsPage(props: DocsContentPageProps) {
  const { language } = useLanguage();
  const content = getLocalizedRecord(INQUIRIES_DOCS_TRANSLATIONS, language, 'INQUIRIES_DOCS_TRANSLATIONS');

  return <DocsDocument {...props} content={content} />;
}
