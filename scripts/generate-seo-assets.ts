/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import 'dotenv/config';
import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  APP_VIEWS,
  BLOG_DETAIL_IDS,
  blogDetailPath,
  DEFAULT_LOCALE,
  stripLocaleFromPath,
  SUPPORTED_LOCALES,
  type Locale,
  viewToPath,
} from '../src/types/routes';
import { DEFAULT_SITE_URL } from '../src/utils/seo';
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = resolve(projectRoot, 'public');
const socialDir = resolve(publicDir, 'social');

const normalizeSiteUrl = (siteUrl: string | undefined) => {
  const trimmedSiteUrl = siteUrl?.trim();

  if (!trimmedSiteUrl) {
    return DEFAULT_SITE_URL;
  }

  return trimmedSiteUrl.replace(/\/+$/, '');
};

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const siteUrl = normalizeSiteUrl(process.env.VITE_SITE_URL ?? process.env.SITE_URL);
const staticRoutes = APP_VIEWS
  .filter((view) => view !== 'blog-detail' && view !== 'login')
  .map((view) => ({
    basePath: stripLocaleFromPath(viewToPath(view, DEFAULT_LOCALE)),
    pathForLocale: (locale: Locale) => viewToPath(view, locale),
  }));
const blogDetailRoutes = BLOG_DETAIL_IDS.map((id) => ({
  basePath: stripLocaleFromPath(blogDetailPath(id, DEFAULT_LOCALE)),
  pathForLocale: (locale: Locale) => blogDetailPath(id, locale),
}));
const routes = [...staticRoutes, ...blogDetailRoutes];

const priorityForPath = (path: string) => {
  if (path === '/') return '1.0';
  if (path === '/platform') return '0.9';
  if (path === '/pricing' || path === '/contact' || path === '/demo') return '0.8';
  if (path.startsWith('/blog-detail/')) return '0.6';

  return '0.7';
};

const changeFrequencyForPath = (path: string) => {
  if (path === '/' || path === '/blog' || path === '/resource-center') return 'weekly';
  if (path.startsWith('/blog-detail/')) return 'monthly';

  return 'monthly';
};

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${routes
  .flatMap(({ basePath, pathForLocale }) => {
    const alternateLinks = SUPPORTED_LOCALES.map((locale) => {
      const alternateUrl = new URL(pathForLocale(locale), `${siteUrl}/`).toString();

      return `    <xhtml:link rel="alternate" hreflang="${locale}" href="${escapeXml(alternateUrl)}" />`;
    });
    const defaultUrl = new URL(pathForLocale(DEFAULT_LOCALE), `${siteUrl}/`).toString();
    alternateLinks.push(
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(defaultUrl)}" />`,
    );

    return SUPPORTED_LOCALES.map((locale) => {
      const url = new URL(pathForLocale(locale), `${siteUrl}/`).toString();

      return `  <url>
    <loc>${escapeXml(url)}</loc>
${alternateLinks.join('\n')}
    <changefreq>${changeFrequencyForPath(basePath)}</changefreq>
    <priority>${priorityForPath(basePath)}</priority>
  </url>`;
    });
  })
  .join('\n')}
</urlset>
`;

const disallowedLoginPaths = SUPPORTED_LOCALES
  .map((locale) => `Disallow: /${locale}/login`)
  .join('\n');
const robotsTxt = `User-agent: *
Allow: /
${disallowedLoginPaths}

Sitemap: ${siteUrl}/sitemap.xml
`;

mkdirSync(socialDir, { recursive: true });
writeFileSync(resolve(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
writeFileSync(resolve(publicDir, 'robots.txt'), robotsTxt, 'utf8');
copyFileSync(
  resolve(projectRoot, 'src/assets/images/identra-logo.svg'),
  resolve(publicDir, 'identra-logo.svg'),
);
copyFileSync(
  resolve(projectRoot, 'src/assets/images/identra-og-social-branded.jpg'),
  resolve(socialDir, 'identra-og.jpg'),
);

console.log(`Generated SEO assets for ${routes.length * SUPPORTED_LOCALES.length} routes at ${siteUrl}`);
