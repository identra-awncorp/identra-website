import { useLanguage } from '../../context/LanguageContext';
import { RELAY_DOCS_TRANSLATIONS } from '../../translations/docs/RelayDocsTranslations';
import { getLocalizedRecord } from '../../utils/i18nRuntime';
import DocsArticleLayout from './DocsArticleLayout';
import type { DocsContentPageProps } from './docsModel';

export default function DocsRelayPage(props: DocsContentPageProps) {
  const { language } = useLanguage();
  const content = getLocalizedRecord(RELAY_DOCS_TRANSLATIONS, language, 'RELAY_DOCS_TRANSLATIONS');

  return <DocsArticleLayout {...props} content={content} />;
}
