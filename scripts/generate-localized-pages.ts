/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import 'dotenv/config';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createElement, Fragment, type ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  getSeoRouteDescription,
  SEO_ROUTE_GROUPS,
  SEO_TRANSLATIONS,
  type SeoRouteGroup,
} from '../src/translations/SeoTranslations';
import { NOT_FOUND_PAGE_TRANSLATIONS } from '../src/translations/NotFoundPageTranslations';
import {
  APP_VIEWS,
  PUBLIC_BLOG_DETAIL_IDS,
  blogDetailPath,
  DEFAULT_BLOG_DETAIL_ID,
  DEFAULT_LOCALE,
  DEMO_SCENARIO_IDS,
  demoScenarioPath,
  getBlogDetailLocales,
  getViewLocales,
  LEGACY_VIEW_ALIASES,
  legacyViewAliasPath,
  SUPPORTED_LOCALES,
  type AppView,
  type BlogDetailId,
  type DemoScenarioId,
  type LegacyViewAlias,
  type Locale,
  viewToPath,
} from '../src/types/routes';
import {
  getStructuredBlogArticle,
  getStructuredBlogSeoMetadata,
  STRUCTURED_BLOG_ARTICLES,
} from '../src/content/blog/structuredBlogArticles';
import type { StructuredBlogArticle } from '../src/content/blog/structuredBlogArticleModel';
import { getStructuredBlogSearchTerms } from '../src/content/blog/structuredBlogSeoProfiles';
import { getDemoSeoProfile } from '../src/content/demoSeoProfiles';
import {
  getWhitePaperSearchTerms,
  WHITE_PAPER_PDF_FILENAME,
  WHITE_PAPER_PDF_PATH,
  WHITE_PAPER_SEO_PROFILE,
} from '../src/content/whitePaperSeoProfile';
import {
  WHITE_PAPER_TRANSLATIONS,
  type WhitePaperContentBlock,
  type WhitePaperSection,
} from '../src/translations/WhitePaperPageTranslations';
import {
  BLOG_MODIFIED_DATE,
  BLOG_PUBLISHED_DATE,
  DEFAULT_SITE_URL,
  formatSeoDescription,
  formatSeoTitle,
  PUBLIC_LOGO_PATH,
  PUBLIC_SOCIAL_IMAGE_PATH,
  SOCIAL_IMAGE_HEIGHT,
  SOCIAL_IMAGE_WIDTH,
} from '../src/utils/seo';
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = resolve(projectRoot, 'dist');

const LANGUAGE_META: Record<Locale, { htmlLang: string; ogLocale: string }> = {
  en: { htmlLang: 'en', ogLocale: 'en_US' },
  es: { htmlLang: 'es', ogLocale: 'es_ES' },
  ja: { htmlLang: 'ja', ogLocale: 'ja_JP' },
  de: { htmlLang: 'de', ogLocale: 'de_DE' },
  vi: { htmlLang: 'vi', ogLocale: 'vi_VN' },
};

type LocalizedRoute = {
  view: AppView;
  blogId?: BlogDetailId;
  demoScenarioId?: DemoScenarioId;
};

const normalizeSiteUrl = (siteUrl: string | undefined): string => {
  const trimmedSiteUrl = siteUrl?.trim();

  return trimmedSiteUrl
    ? trimmedSiteUrl.replace(/\/+$/, '')
    : DEFAULT_SITE_URL;
};

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const absoluteUrl = (path: string, siteUrl: string): string =>
  new URL(path, `${siteUrl}/`).toString();

const countMarkdownWords = (markdown: string): number =>
  markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[-`*_>#|~]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .length;

const SEO_FALLBACK_SLOT = '<div data-seo-fallback-slot></div>';

const injectSeoFallback = (html: string, fallbackMarkup: string): string => {
  if (!html.includes(SEO_FALLBACK_SLOT)) {
    throw new Error('Localized page template is missing the SEO fallback slot.');
  }

  return html.replace(SEO_FALLBACK_SLOT, fallbackMarkup);
};

const routePath = (route: LocalizedRoute, locale: Locale): string =>
  route.view === 'blog-detail'
    ? blogDetailPath(route.blogId ?? DEFAULT_BLOG_DETAIL_ID, locale)
    : route.view === 'demo' && route.demoScenarioId
      ? demoScenarioPath(route.demoScenarioId, locale)
      : viewToPath(route.view, locale);

const localesForRoute = (route: LocalizedRoute): readonly Locale[] =>
  route.view === 'blog-detail'
    ? getBlogDetailLocales(route.blogId ?? DEFAULT_BLOG_DETAIL_ID)
    : getViewLocales(route.view);

const renderSeoFallback = (headline: string, description: string): string =>
  `<main data-seo-fallback style="max-width:72rem;margin:0 auto;padding:5rem 1.5rem;font-family:Arial,sans-serif;color:#0f172a"><h1 style="max-width:48rem;margin:0;font-size:2.5rem;line-height:1.15">${escapeHtml(headline)}</h1><p style="max-width:42rem;margin:1.25rem 0 0;font-size:1rem;line-height:1.7;color:#475569">${escapeHtml(description)}</p></main>`;

type PublicFallbackCopy = {
  readonly homeLabel: string;
  readonly exploreTitle: string;
  readonly exploreIntro: (pageTitle: string) => string;
  readonly resourcesTitle: string;
  readonly resourcesIntro: string;
};

const PUBLIC_FALLBACK_COPY: Record<Locale, PublicFallbackCopy> = {
  en: {
    homeLabel: 'Identra home',
    exploreTitle: 'Explore related Identra capabilities',
    exploreIntro: (pageTitle) => `Continue from ${pageTitle} with related products, solutions, and practical resources.`,
    resourcesTitle: 'Resources and support',
    resourcesIntro: 'Read practical identity guidance, review the developer documentation, or talk with the Identra team about your use case.',
  },
  es: {
    homeLabel: 'Inicio de Identra',
    exploreTitle: 'Explora capacidades relacionadas de Identra',
    exploreIntro: (pageTitle) => `Continúa desde ${pageTitle} con productos, soluciones y recursos prácticos relacionados.`,
    resourcesTitle: 'Recursos y asistencia',
    resourcesIntro: 'Consulta guías prácticas de identidad, revisa la documentación para desarrolladores o habla con el equipo de Identra sobre tu caso.',
  },
  ja: {
    homeLabel: 'Identra ホーム',
    exploreTitle: '関連するIdentraの機能を見る',
    exploreIntro: (pageTitle) => `${pageTitle}に関連する製品、ソリューション、実践的な情報をご覧ください。`,
    resourcesTitle: '資料とサポート',
    resourcesIntro: 'デジタルアイデンティティの解説、開発者向けドキュメント、またはIdentraチームへの相談をご利用いただけます。',
  },
  de: {
    homeLabel: 'Identra Startseite',
    exploreTitle: 'Verwandte Identra-Funktionen entdecken',
    exploreIntro: (pageTitle) => `Entdecken Sie zu ${pageTitle} passende Produkte, Lösungen und praktische Ressourcen.`,
    resourcesTitle: 'Ressourcen und Unterstützung',
    resourcesIntro: 'Lesen Sie praktische Leitfäden, öffnen Sie die Entwicklerdokumentation oder besprechen Sie Ihren Anwendungsfall mit Identra.',
  },
  vi: {
    homeLabel: 'Trang chủ Identra',
    exploreTitle: 'Khám phá các năng lực liên quan của Identra',
    exploreIntro: (pageTitle) => `Từ ${pageTitle}, bạn có thể tìm hiểu thêm các sản phẩm, giải pháp và tài liệu liên quan.`,
    resourcesTitle: 'Tài liệu và hỗ trợ',
    resourcesIntro: 'Đọc các bài phân tích về danh tính số, xem tài liệu dành cho nhà phát triển hoặc trao đổi với Identra về nhu cầu của bạn.',
  },
};

const RELATED_VIEWS_BY_GROUP = {
  landing: ['platform', 'dynamic-flow', 'interface-studio', 'credential-issuance'],
  product: ['platform', 'dynamic-flow', 'interface-studio', 'credential-issuance'],
  solution: ['platform', 'case-management', 'workflows', 'resource-center'],
  industry: ['platform', 'customers', 'resource-center', 'blog'],
  resource: ['blog', 'research', 'resource-center', 'docs'],
  whitePaper: ['credential-issuance', 'platform', 'blog', 'research'],
  company: ['about', 'customers', 'partners', 'careers'],
  developer: ['docs', 'platform', 'dynamic-flow', 'credential-issuance'],
  legal: ['privacy-overview', 'security', 'about', 'contact'],
  account: ['landing', 'platform', 'docs', 'contact'],
  demo: ['demo', 'platform', 'dynamic-flow', 'contact'],
  blogDetail: ['blog', 'resource-center', 'research', 'contact'],
} as const satisfies Record<SeoRouteGroup, readonly AppView[]>;

const renderPublicSeoFallback = (
  headline: string,
  description: string,
  view: AppView,
  locale: Locale,
): string => {
  const seo = SEO_TRANSLATIONS[locale];
  const copy = PUBLIC_FALLBACK_COPY[locale];
  const relatedViews = RELATED_VIEWS_BY_GROUP[SEO_ROUTE_GROUPS[view]]
    .filter((relatedView) => relatedView !== view)
    .slice(0, 4);
  const relatedLinks = relatedViews.map((relatedView) => {
    const relatedTitle = seo.routeTitles[relatedView];
    const relatedDescription = formatSeoDescription(
      getSeoRouteDescription(seo, relatedView),
    );

    return `<li><article><h3><a href="${escapeHtml(viewToPath(relatedView, locale))}">${escapeHtml(relatedTitle)}</a></h3><p>${escapeHtml(relatedDescription)}</p></article></li>`;
  }).join('');
  const resourceViews = (['blog', 'docs', 'contact'] as const)
    .filter((resourceView) => resourceView !== view);
  const resourceLinks = resourceViews.map((resourceView) =>
    `<li><a href="${escapeHtml(viewToPath(resourceView, locale))}">${escapeHtml(seo.routeTitles[resourceView])}</a></li>`,
  ).join('');

  return `<main data-seo-fallback style="max-width:72rem;margin:0 auto;padding:3rem 1.5rem 5rem;font-family:Arial,sans-serif;color:#0f172a"><nav aria-label="${escapeHtml(copy.homeLabel)}"><a href="${escapeHtml(viewToPath('landing', locale))}">Identra</a></nav><article style="margin-top:3rem"><header><h1 style="max-width:52rem;margin:0;font-size:2.5rem;line-height:1.15">${escapeHtml(headline)}</h1><p style="max-width:46rem;margin:1.25rem 0 0;font-size:1rem;line-height:1.7;color:#475569">${escapeHtml(description)}</p></header><section style="margin-top:3rem"><h2>${escapeHtml(copy.exploreTitle)}</h2><p>${escapeHtml(copy.exploreIntro(headline))}</p><ul>${relatedLinks}</ul></section><section style="margin-top:3rem"><h2>${escapeHtml(copy.resourcesTitle)}</h2><p>${escapeHtml(copy.resourcesIntro)}</p><nav aria-label="${escapeHtml(copy.resourcesTitle)}"><ul>${resourceLinks}</ul></nav></section></article></main>`;
};

const renderBlogIndexFallback = (
  headline: string,
  description: string,
  locale: Locale,
): string => {
  const articleLinks = STRUCTURED_BLOG_ARTICLES.map((article) => {
    const listing = article.listing[locale];
    const href = blogDetailPath(article.id, locale);

    return `<li><article><h2><a href="${escapeHtml(href)}">${escapeHtml(listing.title)}</a></h2><p>${escapeHtml(listing.description)}</p></article></li>`;
  }).join('');

  return `<main data-seo-fallback style="max-width:72rem;margin:0 auto;padding:5rem 1.5rem;font-family:Arial,sans-serif;color:#0f172a"><h1 style="max-width:48rem;margin:0;font-size:2.5rem;line-height:1.15">${escapeHtml(headline)}</h1><p style="max-width:42rem;margin:1.25rem 0 0;font-size:1rem;line-height:1.7;color:#475569">${escapeHtml(description)}</p><section aria-label="Blog" style="margin-top:3rem"><ul>${articleLinks}</ul></section></main>`;
};

const renderStructuredBlogFallback = (
  article: StructuredBlogArticle,
): string => {
  const content = article.content.vi;
  const markdownComponents: Components = {
    img: ({ alt, src }) => {
      const image = src ? article.images[src] : undefined;

      return createElement('img', {
        src: image?.src ?? src,
        srcSet: image?.srcSet,
        sizes: image?.sizes,
        width: image?.width,
        height: image?.height,
        alt: alt ?? '',
        loading: 'lazy',
        decoding: 'async',
      });
    },
  };
  const articleBody = renderToStaticMarkup(
    createElement(ReactMarkdown, {
      remarkPlugins: [remarkGfm],
      components: markdownComponents,
      children: content.markdown,
    }),
  );
  const relatedLinks = article.relatedArticleIds.flatMap((relatedArticleId) => {
    const relatedArticle = getStructuredBlogArticle(relatedArticleId);
    if (!relatedArticle) return [];

    return [
      `<li><a href="${escapeHtml(blogDetailPath(relatedArticle.id, 'vi'))}">${escapeHtml(relatedArticle.content.vi.title)}</a></li>`,
    ];
  }).join('');

  return `<main data-seo-fallback style="max-width:72rem;margin:0 auto;padding:5rem 1.5rem;font-family:Arial,sans-serif;color:#0f172a"><article><header><h1 style="max-width:56rem;margin:0;font-size:2.5rem;line-height:1.15">${escapeHtml(content.title)}</h1><p style="max-width:48rem;margin:1.25rem 0 0;font-size:1rem;line-height:1.7;color:#475569">${escapeHtml(content.description)}</p></header><div style="margin-top:3rem;line-height:1.75">${articleBody}</div></article><nav aria-label="Related articles" style="margin-top:3rem"><ul>${relatedLinks}</ul></nav></main>`;
};

const renderWhitePaperInline = (text: string): ReactNode[] =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith('**') && part.endsWith('**')
      ? createElement('strong', { key: `${index}-${part}` }, part.slice(2, -2))
      : createElement(Fragment, { key: `${index}-${part}` }, part));

const renderWhitePaperTable = (
  headers: readonly string[],
  rows: readonly (readonly string[])[],
  key: string,
): ReactNode => createElement(
  'table',
  { key },
  createElement(
    'thead',
    null,
    createElement(
      'tr',
      null,
      ...headers.map((header, index) =>
        createElement('th', { key: `${index}-${header}`, scope: 'col' }, renderWhitePaperInline(header))),
    ),
  ),
  createElement(
    'tbody',
    null,
    ...rows.map((row, rowIndex) =>
      createElement(
        'tr',
        { key: `${rowIndex}-${row.join('-')}` },
        ...row.map((cell, cellIndex) =>
          createElement('td', { key: `${cellIndex}-${cell}` }, renderWhitePaperInline(cell))),
      )),
  ),
);

const renderWhitePaperBlock = (
  block: WhitePaperContentBlock,
  index: number,
): ReactNode => {
  if (block.type === 'heading') {
    return createElement('h3', { key: `${index}-${block.text}` }, block.text);
  }

  if (block.type === 'paragraph') {
    return createElement('p', { key: `${index}-${block.text}` }, renderWhitePaperInline(block.text));
  }

  if (block.type === 'quote') {
    return createElement(
      'blockquote',
      { key: `${index}-${block.body}` },
      block.title
        ? createElement('strong', null, `${block.title}: `)
        : null,
      ...renderWhitePaperInline(block.body),
    );
  }

  if (block.type === 'unordered-list' || block.type === 'ordered-list') {
    const listType = block.type === 'ordered-list' ? 'ol' : 'ul';
    return createElement(
      listType,
      { key: `${index}-${block.type}` },
      ...block.items.map((item, itemIndex) =>
        createElement('li', { key: `${itemIndex}-${item}` }, renderWhitePaperInline(item))),
    );
  }

  return renderWhitePaperTable(block.headers, block.rows, `${index}-table`);
};

const renderWhitePaperSection = (section: WhitePaperSection): ReactNode => {
  const hasStructuredBlocks = Boolean(section.blocks?.length);
  const legacyContent: ReactNode[] = [];

  if (!hasStructuredBlocks) {
    section.cards?.forEach((card, index) => {
      legacyContent.push(createElement(
        'section',
        { key: `card-${index}-${card.title}` },
        createElement('h3', null, card.title),
        createElement('p', null, card.body),
      ));
    });

    if (section.note) {
      legacyContent.push(createElement(
        'aside',
        { key: `note-${section.note.title}` },
        createElement('strong', null, `${section.note.title}: `),
        section.note.body,
      ));
    }

    if (section.bullets?.length) {
      legacyContent.push(createElement(
        Fragment,
        { key: `bullets-${section.id}` },
        section.bulletsTitle ? createElement('h3', null, section.bulletsTitle) : null,
        createElement(
          'ul',
          null,
          ...section.bullets.map((item, index) =>
            createElement('li', { key: `${index}-${item}` }, item)),
        ),
      ));
    }

    if (section.table) {
      legacyContent.push(renderWhitePaperTable(
        section.table.headers,
        section.table.rows,
        `table-${section.id}`,
      ));
    }

    if (section.ordered?.length) {
      legacyContent.push(createElement(
        Fragment,
        { key: `ordered-${section.id}` },
        section.orderedTitle ? createElement('h3', null, section.orderedTitle) : null,
        createElement(
          'ol',
          null,
          ...section.ordered.map((item, index) =>
            createElement('li', { key: `${index}-${item}` }, item)),
        ),
      ));
    }
  }

  return createElement(
    'section',
    { id: section.id, key: section.id },
    createElement('p', null, section.eyebrow),
    createElement('h2', null, section.title),
    ...section.paragraphs.map((paragraph, index) =>
      createElement('p', { key: `paragraph-${index}-${paragraph}` }, paragraph)),
    ...(hasStructuredBlocks
      ? section.blocks?.map(renderWhitePaperBlock) ?? []
      : legacyContent),
  );
};

const renderWhitePaperFallback = (): string => {
  const copy = WHITE_PAPER_TRANSLATIONS.vi;
  const fallback = createElement(
    'main',
    {
      'data-seo-fallback': true,
      style: {
        color: '#0f172a',
        fontFamily: 'Arial, sans-serif',
        lineHeight: 1.7,
        margin: '0 auto',
        maxWidth: '72rem',
        padding: '5rem 1.5rem',
      },
    },
    createElement(
      'article',
      null,
      createElement(
        'header',
        null,
        createElement('p', null, copy.versionBadge),
        createElement('h1', null, copy.heroTitle),
        createElement('p', null, copy.heroSubtitle),
        createElement('p', null, copy.publisher),
        createElement(
          'dl',
          null,
          ...copy.metadata.flatMap((item, index) => [
            createElement('dt', { key: `term-${index}-${item.title}` }, item.title),
            createElement('dd', { key: `detail-${index}-${item.title}` }, item.body),
          ]),
        ),
        ...copy.callouts.map((callout, index) =>
          createElement(
            'aside',
            { key: `callout-${index}-${callout.title}` },
            createElement('h2', null, callout.title),
            createElement('p', null, callout.body),
          )),
        createElement(
          'p',
          null,
          createElement(
            'a',
            { href: WHITE_PAPER_PDF_PATH },
            `Tải ${WHITE_PAPER_PDF_FILENAME}`,
          ),
        ),
      ),
      createElement(
        'nav',
        { 'aria-label': copy.tocAriaLabel },
        createElement('h2', null, copy.desktopTocTitle),
        createElement(
          'ol',
          null,
          ...copy.sections.map((section) =>
            createElement(
              'li',
              { key: `toc-${section.id}` },
              createElement('a', { href: `#${section.id}` }, section.title),
            )),
        ),
      ),
      ...copy.sections.map(renderWhitePaperSection),
      createElement('footer', null, createElement('p', null, copy.attribution)),
    ),
  );

  return renderToStaticMarkup(fallback);
};

const replaceMeta = (
  html: string,
  attribute: 'name' | 'property',
  key: string,
  content: string,
): string => {
  const metaPattern = new RegExp(
    `<meta ${attribute}="${key}" content="[^"]*" \\/>`,
  );

  return html.replace(
    metaPattern,
    `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`,
  );
};

const renderLocalizedHtml = (
  sourceHtml: string,
  route: LocalizedRoute,
  locale: Locale,
  siteUrl: string,
): string => {
  const seo = SEO_TRANSLATIONS[locale];
  const localeMeta = LANGUAGE_META[locale];
  const routeTitle = seo.routeTitles[route.view];
  const demoSeoProfile = route.view === 'demo' && route.demoScenarioId
    ? getDemoSeoProfile(route.demoScenarioId, locale)
    : null;
  const routeGroup = SEO_ROUTE_GROUPS[route.view];
  const currentBlogId = route.blogId ?? DEFAULT_BLOG_DETAIL_ID;
  const structuredArticle = route.view === 'blog-detail'
    ? getStructuredBlogArticle(currentBlogId)
    : null;
  const structuredSeoProfile = structuredArticle
    ? getStructuredBlogSeoMetadata(structuredArticle)
    : null;
  const isWhitePaper = route.view === 'white-paper';
  const blogPost = route.view === 'blog-detail'
    ? structuredSeoProfile
      ?? seo.blogPosts[currentBlogId as keyof typeof seo.blogPosts]
    : null;
  const title = blogPost
    ? structuredArticle
      ? blogPost.title
      : formatSeoTitle(blogPost.title, seo.blogTitleSuffix)
    : isWhitePaper
      ? WHITE_PAPER_SEO_PROFILE.title
    : demoSeoProfile
      ? formatSeoTitle(demoSeoProfile.title, seo.siteName)
    : route.view === 'landing'
      ? formatSeoTitle(seo.defaultTitle)
      : formatSeoTitle(routeTitle, seo.siteName);
  const description = structuredArticle
    ? blogPost?.description ?? ''
    : isWhitePaper
      ? WHITE_PAPER_SEO_PROFILE.description
    : demoSeoProfile
      ? formatSeoDescription(demoSeoProfile.description)
    : formatSeoDescription(
        blogPost
          ? blogPost.description
          : getSeoRouteDescription(seo, route.view),
      );
  const canonicalUrl = absoluteUrl(routePath(route, locale), siteUrl);
  const imagePath = structuredArticle?.socialImage.src ?? PUBLIC_SOCIAL_IMAGE_PATH;
  const imageUrl = absoluteUrl(imagePath, siteUrl);
  const imageAlt = isWhitePaper
    ? WHITE_PAPER_SEO_PROFILE.imageAlt
    : structuredArticle?.content.vi.title ?? seo.imageAlt;
  const imageType = structuredArticle?.socialImage.type ?? 'image/jpeg';
  const imageWidth = String(structuredArticle?.socialImage.width ?? SOCIAL_IMAGE_WIDTH);
  const imageHeight = String(structuredArticle?.socialImage.height ?? SOCIAL_IMAGE_HEIGHT);
  const logoUrl = absoluteUrl(PUBLIC_LOGO_PATH, siteUrl);
  const articleOpenGraphMeta = structuredArticle || isWhitePaper
    ? [
        `    <meta name="author" content="${escapeHtml(isWhitePaper ? WHITE_PAPER_SEO_PROFILE.author.name : structuredArticle?.author.name ?? '')}" />`,
        `    <meta property="article:published_time" content="${escapeHtml(isWhitePaper ? WHITE_PAPER_SEO_PROFILE.publishedAt : structuredArticle?.publishedAt ?? '')}" />`,
        `    <meta property="article:modified_time" content="${escapeHtml(isWhitePaper ? WHITE_PAPER_SEO_PROFILE.modifiedAt : structuredArticle?.modifiedAt ?? '')}" />`,
        `    <meta property="article:author" content="${escapeHtml(siteUrl)}" />`,
        `    <meta property="article:section" content="${escapeHtml(isWhitePaper ? WHITE_PAPER_SEO_PROFILE.articleSection : structuredArticle?.content.vi.category ?? '')}" />`,
        ...(isWhitePaper
          ? getWhitePaperSearchTerms()
          : structuredArticle?.content.vi.tags ?? []).map(
          (tag) => `    <meta property="article:tag" content="${escapeHtml(tag)}" />`,
        ),
      ].join('\n')
    : '';
  const routeLocales = localesForRoute(route);
  const alternateLinks = routeLocales.map((alternateLocale) => {
    const href = absoluteUrl(routePath(route, alternateLocale), siteUrl);
    return `    <link rel="alternate" hreflang="${alternateLocale}" href="${escapeHtml(href)}" />`;
  });
  const defaultLocale = routeLocales.includes(DEFAULT_LOCALE)
    ? DEFAULT_LOCALE
    : routeLocales[0];
  const defaultUrl = absoluteUrl(routePath(route, defaultLocale), siteUrl);
  alternateLinks.push(
    `    <link rel="alternate" hreflang="x-default" href="${escapeHtml(defaultUrl)}" />`,
  );

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'Identra',
    url: siteUrl,
    logo: logoUrl,
    description: seo.organizationDescription,
  };
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: 'Identra',
    url: siteUrl,
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
  };
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': isWhitePaper
      ? 'TechArticle'
      : route.view === 'blog-detail'
        ? 'BlogPosting'
        : 'WebPage',
    name: title,
    headline: isWhitePaper
      ? WHITE_PAPER_SEO_PROFILE.headline
      : structuredArticle?.content.vi.title
        ?? blogPost?.title
        ?? demoSeoProfile?.headline
        ?? routeTitle,
    description,
    url: canonicalUrl,
    image: structuredArticle
      ? {
          '@type': 'ImageObject',
          url: imageUrl,
          width: structuredArticle.socialImage.width,
          height: structuredArticle.socialImage.height,
          caption: structuredArticle.content.vi.title,
        }
      : imageUrl,
    thumbnailUrl: imageUrl,
    inLanguage: localeMeta.htmlLang,
    isPartOf: {
      '@id': `${siteUrl}/#website`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Identra',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: logoUrl,
      },
    },
    mainEntityOfPage: canonicalUrl,
    ...(blogPost || isWhitePaper
      ? {
          author: {
            '@type': isWhitePaper
              ? WHITE_PAPER_SEO_PROFILE.author.type
              : structuredArticle?.author.type ?? 'Person',
            name: isWhitePaper
              ? WHITE_PAPER_SEO_PROFILE.author.name
              : structuredArticle?.author.name ?? 'Brandon Chen',
            url: siteUrl,
          },
          datePublished: isWhitePaper
            ? WHITE_PAPER_SEO_PROFILE.publishedAt
            : structuredArticle?.publishedAt ?? BLOG_PUBLISHED_DATE,
          dateModified: isWhitePaper
            ? WHITE_PAPER_SEO_PROFILE.modifiedAt
            : structuredArticle?.modifiedAt ?? BLOG_MODIFIED_DATE,
          ...(isWhitePaper
            ? {
                articleSection: WHITE_PAPER_SEO_PROFILE.articleSection,
                keywords: getWhitePaperSearchTerms().join(', '),
                about: WHITE_PAPER_SEO_PROFILE.about.map((name) => ({
                  '@type': 'Thing',
                  name,
                })),
                isAccessibleForFree: true,
                version: WHITE_PAPER_SEO_PROFILE.version,
                encoding: {
                  '@type': 'MediaObject',
                  contentUrl: absoluteUrl(WHITE_PAPER_PDF_PATH, siteUrl),
                  encodingFormat: 'application/pdf',
                },
              }
            : {}),
          ...(structuredArticle
            ? {
                articleSection: structuredArticle.content.vi.category,
                keywords: structuredSeoProfile
                  ? getStructuredBlogSearchTerms(structuredSeoProfile).join(', ')
                  : structuredArticle.content.vi.tags.join(', '),
                about: structuredSeoProfile?.entities.map((name) => ({
                  '@type': 'Thing',
                  name,
                })) ?? [],
                wordCount: countMarkdownWords(structuredArticle.content.vi.markdown),
              }
            : {}),
        }
      : {}),
  };
  const schemaJson = JSON.stringify([
    organizationSchema,
    ...(route.view === 'landing' ? [websiteSchema] : []),
    pageSchema,
  ])
    .replace(/</g, '\\u003c');
  const fallbackMarkup = structuredArticle
    ? renderStructuredBlogFallback(structuredArticle)
    : isWhitePaper
      ? renderWhitePaperFallback()
    : route.view === 'blog'
      ? renderBlogIndexFallback(routeTitle, description, locale)
      : routeGroup === 'account'
        ? renderSeoFallback(
            blogPost?.title ?? demoSeoProfile?.headline ?? routeTitle,
            description,
          )
        : renderPublicSeoFallback(
            blogPost?.title ?? demoSeoProfile?.headline ?? routeTitle,
            description,
            route.view,
            locale,
          );

  let html = injectSeoFallback(sourceHtml, fallbackMarkup)
    .replace(/<html lang="[^"]*">/, `<html lang="${localeMeta.htmlLang}">`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`,
    )
    .replace(/\s*<link rel="alternate" hreflang="[^"]+" href="[^"]+" \/>/g, '')
    .replace(
      /(<link rel="canonical" href="[^"]*" \/>)/,
      `$1\n${alternateLinks.join('\n')}`,
    )
    .replace(
      /<script id="identra-seo-schema" type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script id="identra-seo-schema" type="application/ld+json">${schemaJson}</script>`,
    );

  html = replaceMeta(html, 'name', 'description', description);
  html = replaceMeta(
    html,
    'name',
    'robots',
    routeGroup === 'account'
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large',
  );
  html = replaceMeta(
    html,
    'property',
    'og:type',
    route.view === 'blog-detail' || isWhitePaper ? 'article' : 'website',
  );
  html = replaceMeta(html, 'property', 'og:title', title);
  html = replaceMeta(html, 'property', 'og:description', description);
  html = replaceMeta(html, 'property', 'og:url', canonicalUrl);
  html = replaceMeta(html, 'property', 'og:image', imageUrl);
  html = replaceMeta(html, 'property', 'og:image:secure_url', imageUrl);
  html = replaceMeta(html, 'property', 'og:image:type', imageType);
  html = replaceMeta(html, 'property', 'og:image:width', imageWidth);
  html = replaceMeta(html, 'property', 'og:image:height', imageHeight);
  html = replaceMeta(html, 'property', 'og:image:alt', imageAlt);
  html = replaceMeta(html, 'property', 'og:locale', localeMeta.ogLocale);
  html = replaceMeta(html, 'name', 'twitter:title', title);
  html = replaceMeta(html, 'name', 'twitter:description', description);
  html = replaceMeta(html, 'name', 'twitter:image', imageUrl);
  html = replaceMeta(html, 'name', 'twitter:image:alt', imageAlt);

  if (articleOpenGraphMeta) {
    html = html.replace('</head>', `${articleOpenGraphMeta}\n  </head>`);
  }

  return html;
};

const renderLegacyRedirectHtml = (
  sourceHtml: string,
  targetView: AppView,
  locale: Locale,
  siteUrl: string,
): string => {
  const targetPath = viewToPath(targetView, locale);
  const serializedTargetPath = JSON.stringify(targetPath).replace(/</g, '\\u003c');
  const redirectMarkup = [
    `    <meta http-equiv="refresh" content="0;url=${escapeHtml(targetPath)}" />`,
    `    <script>window.location.replace(${serializedTargetPath} + window.location.search + window.location.hash);</script>`,
  ].join('\n');

  return replaceMeta(
    renderLocalizedHtml(sourceHtml, { view: targetView }, locale, siteUrl)
      .replace('</head>', `${redirectMarkup}\n  </head>`),
    'name',
    'robots',
    'noindex, follow',
  );
};

const renderNotFoundHtml = (
  sourceHtml: string,
  locale: Locale,
  siteUrl: string,
): string => {
  const seo = SEO_TRANSLATIONS[locale];
  const copy = NOT_FOUND_PAGE_TRANSLATIONS[locale];
  const localeMeta = LANGUAGE_META[locale];
  const title = formatSeoTitle(seo.notFoundTitle, seo.siteName);
  const description = formatSeoDescription(seo.notFoundDescription);
  const imageUrl = absoluteUrl(PUBLIC_SOCIAL_IMAGE_PATH, siteUrl);
  const logoUrl = absoluteUrl(PUBLIC_LOGO_PATH, siteUrl);
  const schemaJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Identra',
    url: siteUrl,
    logo: logoUrl,
    description: seo.organizationDescription,
  }).replace(/</g, '\\u003c');

  let html = injectSeoFallback(sourceHtml, renderSeoFallback(copy.title, copy.description))
    .replace(/<html lang="[^"]*">/, `<html lang="${localeMeta.htmlLang}">`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/\s*<link rel="canonical" href="[^"]*" \/>/g, '')
    .replace(/\s*<link rel="alternate" hreflang="[^"]+" href="[^"]+" \/>/g, '')
    .replace(
      /<script id="identra-seo-schema" type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script id="identra-seo-schema" type="application/ld+json">${schemaJson}</script>`,
    );

  html = replaceMeta(html, 'name', 'description', description);
  html = replaceMeta(html, 'name', 'robots', 'noindex, nofollow');
  html = replaceMeta(html, 'property', 'og:type', 'website');
  html = replaceMeta(html, 'property', 'og:title', title);
  html = replaceMeta(html, 'property', 'og:description', description);
  html = replaceMeta(html, 'property', 'og:url', absoluteUrl(`/${locale}/404`, siteUrl));
  html = replaceMeta(html, 'property', 'og:image', imageUrl);
  html = replaceMeta(html, 'property', 'og:image:secure_url', imageUrl);
  html = replaceMeta(html, 'property', 'og:image:width', SOCIAL_IMAGE_WIDTH);
  html = replaceMeta(html, 'property', 'og:image:height', SOCIAL_IMAGE_HEIGHT);
  html = replaceMeta(html, 'property', 'og:image:alt', seo.imageAlt);
  html = replaceMeta(html, 'property', 'og:locale', localeMeta.ogLocale);
  html = replaceMeta(html, 'name', 'twitter:title', title);
  html = replaceMeta(html, 'name', 'twitter:description', description);
  html = replaceMeta(html, 'name', 'twitter:image', imageUrl);
  html = replaceMeta(html, 'name', 'twitter:image:alt', seo.imageAlt);

  return html;
};

const siteUrl = normalizeSiteUrl(process.env.VITE_SITE_URL ?? process.env.SITE_URL);
const sourceHtml = readFileSync(resolve(distDir, 'index.html'), 'utf8');
const routes: LocalizedRoute[] = [
  ...APP_VIEWS
    .filter((view) => view !== 'blog-detail')
    .map((view) => ({ view })),
  ...DEMO_SCENARIO_IDS.map((demoScenarioId) => ({
    view: 'demo' as const,
    demoScenarioId,
  })),
  ...PUBLIC_BLOG_DETAIL_IDS.map((blogId) => ({
    view: 'blog-detail' as const,
    blogId,
  })),
];

for (const route of routes) {
  for (const locale of localesForRoute(route)) {
    const outputPath = resolve(
      distDir,
      routePath(route, locale).replace(/^\/+/, ''),
      'index.html',
    );
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(
      outputPath,
      renderLocalizedHtml(sourceHtml, route, locale, siteUrl),
      'utf8',
    );
  }
}

const legacyRoutes = Object.entries(LEGACY_VIEW_ALIASES) as Array<
  [LegacyViewAlias, AppView]
>;

for (const [alias, targetView] of legacyRoutes) {
  for (const locale of getViewLocales(targetView)) {
    const outputPath = resolve(
      distDir,
      legacyViewAliasPath(alias, locale).replace(/^\/+/, ''),
      'index.html',
    );
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(
      outputPath,
      renderLegacyRedirectHtml(sourceHtml, targetView, locale, siteUrl),
      'utf8',
    );
  }
}

for (const locale of SUPPORTED_LOCALES) {
  const notFoundHtml = renderNotFoundHtml(sourceHtml, locale, siteUrl);
  const outputPath = resolve(distDir, locale, '404', 'index.html');
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, notFoundHtml, 'utf8');
}

writeFileSync(
  resolve(distDir, '404.html'),
  renderNotFoundHtml(sourceHtml, DEFAULT_LOCALE, siteUrl),
  'utf8',
);

const rootHtml = renderLegacyRedirectHtml(
  sourceHtml,
  'landing',
  DEFAULT_LOCALE,
  siteUrl,
);

writeFileSync(resolve(distDir, 'index.html'), rootHtml, 'utf8');

const localizedRouteCount = routes.reduce(
  (count, route) => count + localesForRoute(route).length,
  0,
);
const legacyRouteCount = legacyRoutes.reduce(
  (count, [, targetView]) => count + getViewLocales(targetView).length,
  0,
);
console.log(`Generated ${localizedRouteCount} localized HTML entry points, ${legacyRouteCount} legacy redirects, and ${SUPPORTED_LOCALES.length} localized 404 pages`);
