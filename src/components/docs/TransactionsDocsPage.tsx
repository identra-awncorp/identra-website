import { useLanguage } from '../../context/LanguageContext';
import { TRANSACTIONS_DOCS_TRANSLATIONS } from '../../translations/docs/TransactionsDocsTranslations';
import { getLocalizedRecord } from '../../utils/i18nRuntime';
import DocsDocument from './DocsDocument';
import type { DocsContentPageProps } from './docsTypes';

export default function TransactionsDocsPage(props: DocsContentPageProps) {
  const { language } = useLanguage();
  const content = getLocalizedRecord(TRANSACTIONS_DOCS_TRANSLATIONS, language, 'TRANSACTIONS_DOCS_TRANSLATIONS');

  return <DocsDocument {...props} content={content} />;
}
