import { useLanguage } from '../../context/LanguageContext';
import { RELAY_DOCS_TRANSLATIONS } from '../../translations/docs/RelayDocsTranslations';
import { getLocalizedRecord } from '../../utils/i18nRuntime';
import DocsDocument from './DocsDocument';
import type { DocsContentPageProps } from './docsTypes';

export default function RelayDocsPage(props: DocsContentPageProps) {
  const { language } = useLanguage();
  const content = getLocalizedRecord(RELAY_DOCS_TRANSLATIONS, language, 'RELAY_DOCS_TRANSLATIONS');

  return <DocsDocument {...props} content={content} />;
}
