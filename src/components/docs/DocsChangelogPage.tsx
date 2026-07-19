import { useLanguage } from '../../context/LanguageContext';
import { CHANGELOG_DOCS_TRANSLATIONS } from '../../translations/docs/ChangelogDocsTranslations';
import { getLocalizedRecord } from '../../utils/i18nRuntime';
import DocsArticleLayout from './DocsArticleLayout';
import type { DocsContentPageProps } from './docsModel';

export default function DocsChangelogPage(props: DocsContentPageProps) {
  const { language } = useLanguage();
  const content = getLocalizedRecord(CHANGELOG_DOCS_TRANSLATIONS, language, 'CHANGELOG_DOCS_TRANSLATIONS');

  return <DocsArticleLayout {...props} content={content} />;
}
