/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import 'dotenv/config';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  APP_VIEWS,
  PUBLIC_BLOG_DETAIL_IDS,
  blogDetailPath,
  viewToPath,
} from '../src/types/routes';
import {
  getStructuredBlogArticle,
} from '../src/content/blog/structuredBlogArticles';
import {
  getSeoRouteDescription,
  SEO_ROUTE_GROUPS,
  SEO_TRANSLATIONS,
} from '../src/translations/SeoTranslations';
import {
  DEFAULT_SITE_URL,
  formatSeoDescription,
} from '../src/utils/seo';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = resolve(projectRoot, 'dist');
const siteUrl = (process.env.VITE_SITE_URL ?? process.env.SITE_URL ?? DEFAULT_SITE_URL)
  .trim()
  .replace(/\/+$/, '');
const failures: string[] = [];

const readDistFile = (relativePath: string): string =>
  readFileSync(resolve(distDir, relativePath), 'utf8');

const expect = (condition: boolean, message: string) => {
  if (!condition) failures.push(message);
};

expect(
  siteUrl === DEFAULT_SITE_URL,
  `Configured canonical origin is ${siteUrl}; expected the production host ${DEFAULT_SITE_URL}.`,
);

const blogIndexHtml = readDistFile('vi/blog/index.html');
expect(
  blogIndexHtml.includes(`<link rel="canonical" href="${siteUrl}/vi/blog" />`),
  'Vietnamese Blog index does not use the configured canonical origin.',
);

const vietnameseDescriptions = new Map<string, string>();
const unnaturalVietnamesePhrases = [
  'người thật và doanh nghiệp thật',
  'onboarding tuân thủ',
  'vận hành niềm tin',
  'đội ngũ tin cậy',
  'tín hiệu và quyết định phối hợp',
];

for (const view of APP_VIEWS) {
  if (view === 'blog-detail' || SEO_ROUTE_GROUPS[view] === 'account') continue;

  const routePath = viewToPath(view, 'vi');
  const html = readDistFile(`${routePath.replace(/^\/+/, '')}/index.html`);
  const expectedDescription = formatSeoDescription(
    getSeoRouteDescription(SEO_TRANSLATIONS.vi, view),
  );
  const description = html.match(
    /<meta name="description" content="([^"]*)" \/>/,
  )?.[1];

  expect(
    description === expectedDescription,
    `${routePath} does not expose its intended Vietnamese description.`,
  );
  expect(
    !expectedDescription.endsWith('...'),
    `${routePath} has a Vietnamese description that is truncated during generation.`,
  );
  expect(
    unnaturalVietnamesePhrases.every((phrase) => !expectedDescription.includes(phrase)),
    `${routePath} still contains machine-like Vietnamese SEO wording.`,
  );

  const duplicateRoute = vietnameseDescriptions.get(expectedDescription);
  expect(
    !duplicateRoute,
    `${routePath} repeats the Vietnamese description used by ${duplicateRoute}.`,
  );
  vietnameseDescriptions.set(expectedDescription, routePath);
}

for (const articleId of PUBLIC_BLOG_DETAIL_IDS) {
  const article = getStructuredBlogArticle(articleId);
  if (!article) {
    failures.push(`Missing structured article model for ${articleId}.`);
    continue;
  }

  const routePath = blogDetailPath(articleId, 'vi');
  const html = readDistFile(`${routePath.replace(/^\/+/, '')}/index.html`);
  const paragraphCount = html.match(/<p(?:\s|>)/g)?.length ?? 0;
  const headingCount = html.match(/<h[23](?:\s|>)/g)?.length ?? 0;

  expect(
    html.includes(`<link rel="canonical" href="${siteUrl}${routePath}" />`),
    `${articleId} does not use the configured canonical origin.`,
  );
  expect(
    html.includes('<main data-seo-fallback') && html.includes('<article>'),
    `${articleId} is missing its static article fallback.`,
  );
  expect(
    paragraphCount >= 10,
    `${articleId} contains too little static article content (${paragraphCount} paragraphs).`,
  );
  expect(
    headingCount >= article.content.vi.tableOfContents.length,
    `${articleId} contains too few static article headings (${headingCount}).`,
  );
  expect(
    blogIndexHtml.includes(`href="${routePath}"`),
    `Blog index does not expose a crawlable link to ${articleId}.`,
  );
}

const sitemapXml = readDistFile('sitemap.xml');
const robotsTxt = readDistFile('robots.txt');
expect(
  sitemapXml.includes(`<loc>${siteUrl}/vi/blog</loc>`),
  'Sitemap does not use the configured canonical origin for Blog.',
);
expect(
  PUBLIC_BLOG_DETAIL_IDS.every((articleId) => {
    const article = getStructuredBlogArticle(articleId);
    return Boolean(
      article
      && sitemapXml.includes(`<loc>${siteUrl}${blogDetailPath(articleId, 'vi')}</loc>`)
      && sitemapXml.includes(`<lastmod>${article.modifiedAt}</lastmod>`),
    );
  }),
  'Sitemap is missing a Blog URL or an accurate Blog lastmod value.',
);
expect(
  !sitemapXml.includes('<changefreq>') && !sitemapXml.includes('<priority>'),
  'Sitemap still contains ignored changefreq or priority hints.',
);
expect(
  robotsTxt.includes(`Sitemap: ${siteUrl}/sitemap.xml`),
  'robots.txt and the configured canonical origin are inconsistent.',
);

if (failures.length > 0) {
  console.error(`SEO output findings: ${failures.length}`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log(
    `SEO output findings: 0 (${vietnameseDescriptions.size} Vietnamese routes and ${PUBLIC_BLOG_DETAIL_IDS.length} Blog articles verified)`,
  );
}
