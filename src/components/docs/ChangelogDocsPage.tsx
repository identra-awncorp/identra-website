import { useLanguage } from '../../context/LanguageContext';
import { CHANGELOG_DOCS_TRANSLATIONS } from '../../translations/docs/ChangelogDocsTranslations';
import { getLocalizedRecord } from '../../utils/i18nRuntime';
import DocsDocument from './DocsDocument';
import type { DocsContentPageProps } from './docsTypes';

export default function ChangelogDocsPage(props: DocsContentPageProps) {
  const { language } = useLanguage();
  const content = getLocalizedRecord(CHANGELOG_DOCS_TRANSLATIONS, language, 'CHANGELOG_DOCS_TRANSLATIONS');

  return <DocsDocument {...props} content={content} />;
}
