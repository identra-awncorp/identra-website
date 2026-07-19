/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import 'dotenv/config';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  SEO_ROUTE_GROUPS,
  SEO_TRANSLATIONS,
} from '../src/translations/SeoTranslations';
import { NOT_FOUND_PAGE_TRANSLATIONS } from '../src/translations/NotFoundPageTranslations';
import {
  APP_VIEWS,
  BLOG_DETAIL_IDS,
  blogDetailPath,
  DEFAULT_BLOG_DETAIL_ID,
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  type AppView,
  type BlogDetailId,
  type Locale,
  viewToPath,
} from '../src/types/routes';
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

const routePath = (route: LocalizedRoute, locale: Locale): string =>
  route.view === 'blog-detail'
    ? blogDetailPath(route.blogId ?? DEFAULT_BLOG_DETAIL_ID, locale)
    : viewToPath(route.view, locale);

const renderSeoFallback = (headline: string, description: string): string =>
  `<div id="root"><main data-seo-fallback style="max-width:72rem;margin:0 auto;padding:5rem 1.5rem;font-family:Arial,sans-serif;color:#0f172a"><h1 style="max-width:48rem;margin:0;font-size:2.5rem;line-height:1.15">${escapeHtml(headline)}</h1><p style="max-width:42rem;margin:1.25rem 0 0;font-size:1rem;line-height:1.7;color:#475569">${escapeHtml(description)}</p></main></div>`;

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
  const blogPost = route.view === 'blog-detail'
    ? seo.blogPosts[currentBlogId]
    : null;
  const title = blogPost
    ? formatSeoTitle(blogPost.title, seo.blogTitleSuffix)
    : route.view === 'landing'
      ? formatSeoTitle(seo.defaultTitle)
      : formatSeoTitle(routeTitle, seo.siteName);
  const description = formatSeoDescription(
    blogPost
      ? blogPost.description
      : seo.descriptionTemplates[routeGroup].replace(/\{page\}/g, routeTitle),
  );
  const canonicalUrl = absoluteUrl(routePath(route, locale), siteUrl);
  const imageUrl = absoluteUrl(PUBLIC_SOCIAL_IMAGE_PATH, siteUrl);
  const logoUrl = absoluteUrl(PUBLIC_LOGO_PATH, siteUrl);
  const alternateLinks = SUPPORTED_LOCALES.map((alternateLocale) => {
    const href = absoluteUrl(routePath(route, alternateLocale), siteUrl);
    return `    <link rel="alternate" hreflang="${alternateLocale}" href="${escapeHtml(href)}" />`;
  });
  const defaultUrl = absoluteUrl(routePath(route, DEFAULT_LOCALE), siteUrl);
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
    headline: blogPost?.title ?? routeTitle,
    description,
    url: canonicalUrl,
    image: imageUrl,
    inLanguage: localeMeta.htmlLang,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Identra',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Identra',
      logo: {
        '@type': 'ImageObject',
        url: logoUrl,
      },
    },
    mainEntityOfPage: canonicalUrl,
    ...(blogPost
      ? {
          author: {
            '@type': 'Person',
            name: 'Brandon Chen',
          },
          datePublished: BLOG_PUBLISHED_DATE,
          dateModified: BLOG_MODIFIED_DATE,
        }
      : {}),
  };
  const schemaJson = JSON.stringify([organizationSchema, pageSchema])
    .replace(/</g, '\\u003c');

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
      renderSeoFallback(blogPost?.title ?? routeTitle, description),
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
  ...BLOG_DETAIL_IDS.map((blogId) => ({
    view: 'blog-detail' as const,
    blogId,
  })),
];

for (const route of routes) {
  for (const locale of SUPPORTED_LOCALES) {
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

let rootHtml = renderLocalizedHtml(
  sourceHtml,
  { view: 'landing' },
  DEFAULT_LOCALE,
  siteUrl,
)
  .replace(/\s*<link rel="canonical" href="[^"]*" \/>/g, '')
  .replace(/\s*<link rel="alternate" hreflang="[^"]+" href="[^"]+" \/>/g, '');
rootHtml = replaceMeta(rootHtml, 'name', 'robots', 'noindex, nofollow');

writeFileSync(resolve(distDir, 'index.html'), rootHtml, 'utf8');

console.log(`Generated ${routes.length * SUPPORTED_LOCALES.length} localized HTML entry points and ${SUPPORTED_LOCALES.length} localized 404 pages`);
