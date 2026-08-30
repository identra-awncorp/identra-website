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
  PUBLIC_BLOG_DETAIL_IDS,
  blogDetailPath,
  DEFAULT_LOCALE,
  DEMO_SCENARIO_IDS,
  demoScenarioPath,
  getBlogDetailLocales,
  getViewLocales,
  SUPPORTED_LOCALES,
  type Locale,
  viewToPath,
} from '../src/types/routes';
import {
  getStructuredBlogArticle,
  STRUCTURED_BLOG_ARTICLES,
} from '../src/content/blog/structuredBlogArticles';
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

type SitemapRoute = {
  locales: readonly Locale[];
  pathForLocale: (locale: Locale) => string;
  lastModified?: string;
  imagePaths: readonly string[];
};

const siteUrl = normalizeSiteUrl(process.env.VITE_SITE_URL ?? process.env.SITE_URL);
const latestBlogModifiedAt = STRUCTURED_BLOG_ARTICLES.reduce(
  (latestDate, article) => article.modifiedAt > latestDate
    ? article.modifiedAt
    : latestDate,
  '',
);
const staticRoutes: SitemapRoute[] = APP_VIEWS
  .filter((view) => view !== 'blog-detail' && view !== 'login' && view !== 'dashboard')
  .map((view) => ({
    locales: getViewLocales(view),
    pathForLocale: (locale: Locale) => viewToPath(view, locale),
    lastModified: view === 'blog' ? latestBlogModifiedAt : undefined,
    imagePaths: [],
  }));
const blogDetailRoutes: SitemapRoute[] = PUBLIC_BLOG_DETAIL_IDS.map((id) => {
  const article = getStructuredBlogArticle(id);
  const imagePaths = article
    ? [...new Set([
        article.socialImage?.src,
        article.coverImage?.src,
        ...Object.keys(article.images),
      ].filter((imagePath): imagePath is string => Boolean(imagePath)))]
    : [];

  return {
    locales: getBlogDetailLocales(id),
    pathForLocale: (locale: Locale) => blogDetailPath(id, locale),
    lastModified: article?.modifiedAt,
    imagePaths,
  };
});
const demoScenarioRoutes: SitemapRoute[] = DEMO_SCENARIO_IDS.map((id) => ({
  locales: SUPPORTED_LOCALES,
  pathForLocale: (locale: Locale) => demoScenarioPath(id, locale),
  lastModified: undefined,
  imagePaths: [],
}));
const routes = [...staticRoutes, ...demoScenarioRoutes, ...blogDetailRoutes];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${routes
  .flatMap(({ locales, pathForLocale, lastModified, imagePaths }) => {
    const alternateLinks = locales.map((locale) => {
      const alternateUrl = new URL(pathForLocale(locale), `${siteUrl}/`).toString();

      return `    <xhtml:link rel="alternate" hreflang="${locale}" href="${escapeXml(alternateUrl)}" />`;
    });
    const defaultLocale = locales.includes(DEFAULT_LOCALE) ? DEFAULT_LOCALE : locales[0];
    const defaultUrl = new URL(pathForLocale(defaultLocale), `${siteUrl}/`).toString();
    alternateLinks.push(
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(defaultUrl)}" />`,
    );
    const imageLinks = imagePaths.map((imagePath) => {
      const imageUrl = new URL(imagePath, `${siteUrl}/`).toString();

      return `    <image:image><image:loc>${escapeXml(imageUrl)}</image:loc></image:image>`;
    });

    return locales.map((locale) => {
      const url = new URL(pathForLocale(locale), `${siteUrl}/`).toString();

      return `  <url>
    <loc>${escapeXml(url)}</loc>
${alternateLinks.join('\n')}
${lastModified ? `    <lastmod>${escapeXml(lastModified)}</lastmod>\n` : ''}${imageLinks.length > 0 ? `${imageLinks.join('\n')}\n` : ''}  </url>`;
    });
  })
  .join('\n')}
</urlset>
`;

const blogFeedUrl = new URL('/blog-feed.xml', `${siteUrl}/`).toString();
const blogUrl = new URL(viewToPath('blog', 'vi'), `${siteUrl}/`).toString();
const blogFeedXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Identra Blog</title>
    <link>${escapeXml(blogUrl)}</link>
    <description>Phân tích chuyên sâu về định danh tự chủ, thực chứng và hạ tầng niềm tin số.</description>
    <language>vi</language>
    <lastBuildDate>${new Date(`${latestBlogModifiedAt}T00:00:00Z`).toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(blogFeedUrl)}" rel="self" type="application/rss+xml" />
${STRUCTURED_BLOG_ARTICLES.map((article) => {
  const articleUrl = new URL(blogDetailPath(article.id, 'vi'), `${siteUrl}/`).toString();
  const mediaContent = article.socialImage
    ? `\n      <media:content url="${escapeXml(new URL(article.socialImage.src, `${siteUrl}/`).toString())}" medium="image" type="${escapeXml(article.socialImage.type)}" width="${article.socialImage.width}" height="${article.socialImage.height}" />`
    : '';

  return `    <item>
      <title>${escapeXml(article.content.vi.title)}</title>
      <link>${escapeXml(articleUrl)}</link>
      <guid isPermaLink="true">${escapeXml(articleUrl)}</guid>
      <description>${escapeXml(article.content.vi.description)}</description>
      <dc:creator>${escapeXml(article.author.name)}</dc:creator>
      <pubDate>${new Date(`${article.publishedAt}T00:00:00Z`).toUTCString()}</pubDate>
${article.content.vi.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join('\n')}${mediaContent}
    </item>`;
}).join('\n')}
  </channel>
</rss>
`;

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

mkdirSync(socialDir, { recursive: true });
writeFileSync(resolve(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
writeFileSync(resolve(publicDir, 'blog-feed.xml'), blogFeedXml, 'utf8');
writeFileSync(resolve(publicDir, 'robots.txt'), robotsTxt, 'utf8');
copyFileSync(
  resolve(projectRoot, 'src/assets/images/identra-logo.svg'),
  resolve(publicDir, 'identra-logo.svg'),
);
copyFileSync(
  resolve(projectRoot, 'src/assets/images/identra-og-social-branded.jpg'),
  resolve(socialDir, 'identra-og.jpg'),
);

const generatedRouteCount = routes.reduce((count, route) => count + route.locales.length, 0);
console.log(`Generated SEO assets for ${generatedRouteCount} routes at ${siteUrl}`);
