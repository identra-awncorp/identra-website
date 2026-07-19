import { useLanguage } from '../../context/LanguageContext';
import { TRANSACTIONS_DOCS_TRANSLATIONS } from '../../translations/docs/TransactionsDocsTranslations';
import { getLocalizedRecord } from '../../utils/i18nRuntime';
import DocsArticleLayout from './DocsArticleLayout';
import type { DocsContentPageProps } from './docsModel';

export default function DocsTransactionsPage(props: DocsContentPageProps) {
  const { language } = useLanguage();
  const content = getLocalizedRecord(TRANSACTIONS_DOCS_TRANSLATIONS, language, 'TRANSACTIONS_DOCS_TRANSLATIONS');

  return <DocsArticleLayout {...props} content={content} />;
}
