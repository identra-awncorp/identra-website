import { useLanguage } from '../../context/LanguageContext';
import { CREDENTIAL_ISSUANCE_DOCS_TRANSLATIONS } from '../../translations/docs/CredentialIssuanceDocsTranslations';
import { getLocalizedRecord } from '../../utils/i18nRuntime';
import DocsArticleLayout from './DocsArticleLayout';
import type { DocsContentPageProps } from './docsModel';

export default function DocsCredentialIssuancePage(
  props: DocsContentPageProps,
) {
  const { language } = useLanguage();
  const content = getLocalizedRecord(
    CREDENTIAL_ISSUANCE_DOCS_TRANSLATIONS,
    language,
    'CREDENTIAL_ISSUANCE_DOCS_TRANSLATIONS',
  );

  return <DocsArticleLayout {...props} content={content} />;
}
