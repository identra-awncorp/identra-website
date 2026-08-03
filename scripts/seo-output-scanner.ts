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
  DEFAULT_LOCALE,
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

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const getSchemaObjects = (html: string, articleId: string): Record<string, unknown>[] => {
  const schemaJson = html.match(
    /<script id="identra-seo-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/,
  )?.[1];

  if (!schemaJson) {
    failures.push(`${articleId} is missing its JSON-LD schema.`);
    return [];
  }

  try {
    const parsed = JSON.parse(schemaJson) as unknown;
    const values = Array.isArray(parsed) ? parsed : [parsed];
    return values.filter(isRecord);
  } catch {
    failures.push(`${articleId} contains invalid JSON-LD.`);
    return [];
  }
};

expect(
  siteUrl === DEFAULT_SITE_URL,
  `Configured canonical origin is ${siteUrl}; expected the production host ${DEFAULT_SITE_URL}.`,
);

const defaultLandingPath = viewToPath('landing', DEFAULT_LOCALE);
const rootHtml = readDistFile('index.html');
const vercelConfig = JSON.parse(
  readFileSync(resolve(projectRoot, 'vercel.json'), 'utf8'),
) as {
  redirects?: Array<{
    source?: string;
    destination?: string;
    permanent?: boolean;
  }>;
};

expect(
  Boolean(vercelConfig.redirects?.some((redirect) =>
    redirect.source === '/'
    && redirect.destination === defaultLandingPath
    && redirect.permanent === true)),
  `Vercel must permanently redirect / to ${defaultLandingPath}.`,
);
expect(
  rootHtml.includes(`<meta http-equiv="refresh" content="0;url=${defaultLandingPath}" />`)
    && rootHtml.includes(`window.location.replace("${defaultLandingPath}"`),
  `The static root fallback does not redirect to ${defaultLandingPath}.`,
);
expect(
  rootHtml.includes(`<link rel="canonical" href="${siteUrl}${defaultLandingPath}" />`),
  'The static root fallback does not point canonical signals at the default locale.',
);
expect(
  rootHtml.includes('<meta name="robots" content="index, follow, max-image-preview:large" />')
    && !rootHtml.includes('content="noindex'),
  'The static root fallback still exposes a noindex robots directive.',
);

const blogIndexHtml = readDistFile('vi/blog/index.html');
expect(
  blogIndexHtml.includes(`<link rel="canonical" href="${siteUrl}/vi/blog" />`),
  'Vietnamese Blog index does not use the configured canonical origin.',
);
expect(
  blogIndexHtml.includes(
    '<link rel="alternate" type="application/rss+xml" title="Identra Blog" href="/blog-feed.xml" />',
  ),
  'Vietnamese Blog index does not advertise the Blog RSS feed.',
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
  const schemaObjects = getSchemaObjects(html, articleId);
  const blogPosting = schemaObjects.find((schema) => schema['@type'] === 'BlogPosting');
  const schemaAuthor = isRecord(blogPosting?.author) ? blogPosting.author : null;
  const schemaImage = isRecord(blogPosting?.image) ? blogPosting.image : null;

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
    !html.includes('<link rel="preload" as="image"'),
    `${articleId} preloads every fallback article image instead of preserving lazy loading.`,
  );
  expect(
    html.includes('loading="lazy"') && html.includes('decoding="async"'),
    `${articleId} does not lazy-load images in its static fallback.`,
  );
  expect(
    html.includes(`<meta name="author" content="${article.author.name}" />`)
      && html.includes(`<meta property="article:published_time" content="${article.publishedAt}" />`)
      && html.includes(`<meta property="article:modified_time" content="${article.modifiedAt}" />`)
      && html.includes(`<meta property="article:section" content="${article.content.vi.category}" />`),
    `${articleId} is missing article-specific author, date, or section metadata.`,
  );
  expect(
    article.content.vi.tags.every((tag) =>
      html.includes(`<meta property="article:tag" content="${tag}" />`)),
    `${articleId} is missing an Open Graph article tag.`,
  );
  expect(
    Boolean(
      blogPosting
      && schemaAuthor?.url === siteUrl
      && schemaImage?.url === `${siteUrl}${article.socialImage.src}`
      && schemaImage?.width === article.socialImage.width
      && schemaImage?.height === article.socialImage.height
      && blogPosting.articleSection === article.content.vi.category
      && blogPosting.keywords === article.content.vi.tags.join(', ')
      && typeof blogPosting.wordCount === 'number'
      && blogPosting.wordCount > 0
    ),
    `${articleId} has incomplete BlogPosting author, image, category, tags, or word count metadata.`,
  );
  expect(
    blogIndexHtml.includes(`href="${routePath}"`),
    `Blog index does not expose a crawlable link to ${articleId}.`,
  );
}

const sitemapXml = readDistFile('sitemap.xml');
const blogFeedXml = readDistFile('blog-feed.xml');
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
  sitemapXml.includes('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"')
    && PUBLIC_BLOG_DETAIL_IDS.every((articleId) => {
      const article = getStructuredBlogArticle(articleId);
      return Boolean(
        article
        && sitemapXml.includes(
          `<image:loc>${siteUrl}${article.socialImage.src}</image:loc>`,
        )
        && sitemapXml.includes(
          `<image:loc>${siteUrl}${article.coverImage.src}</image:loc>`,
        )
      );
    }),
  'Image sitemap entries are missing for a Blog social or cover image.',
);
expect(
  blogFeedXml.includes(`<atom:link href="${siteUrl}/blog-feed.xml" rel="self" type="application/rss+xml" />`)
    && PUBLIC_BLOG_DETAIL_IDS.every((articleId) => {
      const article = getStructuredBlogArticle(articleId);
      return Boolean(
        article
        && blogFeedXml.includes(`<guid isPermaLink="true">${siteUrl}${blogDetailPath(articleId, 'vi')}</guid>`)
        && blogFeedXml.includes(`<pubDate>${new Date(`${article.publishedAt}T00:00:00Z`).toUTCString()}</pubDate>`)
      );
    }),
  'Blog RSS feed is missing an article URL or publication date.',
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
