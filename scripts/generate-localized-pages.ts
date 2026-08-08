/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import 'dotenv/config';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  getSeoRouteDescription,
  SEO_ROUTE_GROUPS,
  SEO_TRANSLATIONS,
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
  `<div id="root"><main data-seo-fallback style="max-width:72rem;margin:0 auto;padding:5rem 1.5rem;font-family:Arial,sans-serif;color:#0f172a"><h1 style="max-width:48rem;margin:0;font-size:2.5rem;line-height:1.15">${escapeHtml(headline)}</h1><p style="max-width:42rem;margin:1.25rem 0 0;font-size:1rem;line-height:1.7;color:#475569">${escapeHtml(description)}</p></main></div>`;

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

  return `<div id="root"><main data-seo-fallback style="max-width:72rem;margin:0 auto;padding:5rem 1.5rem;font-family:Arial,sans-serif;color:#0f172a"><h1 style="max-width:48rem;margin:0;font-size:2.5rem;line-height:1.15">${escapeHtml(headline)}</h1><p style="max-width:42rem;margin:1.25rem 0 0;font-size:1rem;line-height:1.7;color:#475569">${escapeHtml(description)}</p><section aria-label="Blog" style="margin-top:3rem"><ul>${articleLinks}</ul></section></main></div>`;
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

  return `<div id="root"><main data-seo-fallback style="max-width:72rem;margin:0 auto;padding:5rem 1.5rem;font-family:Arial,sans-serif;color:#0f172a"><article><header><h1 style="max-width:56rem;margin:0;font-size:2.5rem;line-height:1.15">${escapeHtml(content.title)}</h1><p style="max-width:48rem;margin:1.25rem 0 0;font-size:1rem;line-height:1.7;color:#475569">${escapeHtml(content.description)}</p></header><div style="margin-top:3rem;line-height:1.75">${articleBody}</div></article><nav aria-label="Related articles" style="margin-top:3rem"><ul>${relatedLinks}</ul></nav></main></div>`;
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
  const routeGroup = SEO_ROUTE_GROUPS[route.view];
  const currentBlogId = route.blogId ?? DEFAULT_BLOG_DETAIL_ID;
  const structuredArticle = route.view === 'blog-detail'
    ? getStructuredBlogArticle(currentBlogId)
    : null;
  const blogPost = route.view === 'blog-detail'
    ? structuredArticle
      ? getStructuredBlogSeoMetadata(structuredArticle)
      : seo.blogPosts[currentBlogId as keyof typeof seo.blogPosts]
    : null;
  const title = blogPost
    ? structuredArticle
      ? blogPost.title
      : formatSeoTitle(blogPost.title, seo.blogTitleSuffix)
    : route.view === 'landing'
      ? formatSeoTitle(seo.defaultTitle)
      : formatSeoTitle(routeTitle, seo.siteName);
  const description = structuredArticle
    ? blogPost?.description ?? ''
    : formatSeoDescription(
        blogPost
          ? blogPost.description
          : getSeoRouteDescription(seo, route.view),
      );
  const canonicalUrl = absoluteUrl(routePath(route, locale), siteUrl);
  const imagePath = structuredArticle?.socialImage.src ?? PUBLIC_SOCIAL_IMAGE_PATH;
  const imageUrl = absoluteUrl(imagePath, siteUrl);
  const imageAlt = structuredArticle?.content.vi.title ?? seo.imageAlt;
  const imageType = structuredArticle?.socialImage.type ?? 'image/jpeg';
  const imageWidth = String(structuredArticle?.socialImage.width ?? SOCIAL_IMAGE_WIDTH);
  const imageHeight = String(structuredArticle?.socialImage.height ?? SOCIAL_IMAGE_HEIGHT);
  const logoUrl = absoluteUrl(PUBLIC_LOGO_PATH, siteUrl);
  const articleOpenGraphMeta = structuredArticle
    ? [
        `    <meta name="author" content="${escapeHtml(structuredArticle.author.name)}" />`,
        `    <meta property="article:published_time" content="${escapeHtml(structuredArticle.publishedAt)}" />`,
        `    <meta property="article:modified_time" content="${escapeHtml(structuredArticle.modifiedAt)}" />`,
        `    <meta property="article:author" content="${escapeHtml(siteUrl)}" />`,
        `    <meta property="article:section" content="${escapeHtml(structuredArticle.content.vi.category)}" />`,
        ...structuredArticle.content.vi.tags.map(
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
    name: 'Identra',
    url: siteUrl,
    logo: logoUrl,
    description: seo.organizationDescription,
  };
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': route.view === 'blog-detail' ? 'BlogPosting' : 'WebPage',
    name: title,
    headline: structuredArticle?.content.vi.title ?? blogPost?.title ?? routeTitle,
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
      '@type': 'WebSite',
      name: 'Identra',
      url: siteUrl,
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
    ...(blogPost
      ? {
          author: {
            '@type': structuredArticle?.author.type ?? 'Person',
            name: structuredArticle?.author.name ?? 'Brandon Chen',
            url: siteUrl,
          },
          datePublished: structuredArticle?.publishedAt ?? BLOG_PUBLISHED_DATE,
          dateModified: structuredArticle?.modifiedAt ?? BLOG_MODIFIED_DATE,
          ...(structuredArticle
            ? {
                articleSection: structuredArticle.content.vi.category,
                keywords: structuredArticle.content.vi.tags.join(', '),
                wordCount: countMarkdownWords(structuredArticle.content.vi.markdown),
              }
            : {}),
        }
      : {}),
  };
  const schemaJson = JSON.stringify([organizationSchema, pageSchema])
    .replace(/</g, '\\u003c');
  const fallbackMarkup = structuredArticle
    ? renderStructuredBlogFallback(structuredArticle)
    : route.view === 'blog'
      ? renderBlogIndexFallback(routeTitle, description, locale)
      : renderSeoFallback(blogPost?.title ?? routeTitle, description);

  let html = sourceHtml
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
    )
    .replace(
      '<div id="root"></div>',
      fallbackMarkup,
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
  html = replaceMeta(html, 'property', 'og:type', route.view === 'blog-detail' ? 'article' : 'website');
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

  let html = sourceHtml
    .replace(/<html lang="[^"]*">/, `<html lang="${localeMeta.htmlLang}">`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/\s*<link rel="canonical" href="[^"]*" \/>/g, '')
    .replace(/\s*<link rel="alternate" hreflang="[^"]+" href="[^"]+" \/>/g, '')
    .replace(
      /<script id="identra-seo-schema" type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script id="identra-seo-schema" type="application/ld+json">${schemaJson}</script>`,
    )
    .replace(
      '<div id="root"></div>',
      renderSeoFallback(copy.title, copy.description),
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
