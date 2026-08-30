/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import 'dotenv/config';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  APP_VIEWS,
  DEFAULT_LOCALE,
  DEMO_SCENARIO_IDS,
  LEGACY_VIEW_ALIASES,
  PUBLIC_BLOG_DETAIL_IDS,
  SUPPORTED_LOCALES,
  blogDetailPath,
  demoScenarioPath,
  getBlogDetailLocales,
  getViewLocales,
  legacyViewAliasPath,
  type AppView,
  type LegacyViewAlias,
  type Locale,
  viewToPath,
} from '../src/types/routes';
import {
  getStructuredBlogArticle,
  getStructuredBlogSeoMetadata,
} from '../src/content/blog/structuredBlogArticles';
import { getStructuredBlogSearchTerms } from '../src/content/blog/structuredBlogSeoProfiles';
import { getDemoSeoProfile } from '../src/content/demoSeoProfiles';
import {
  getWhitePaperSearchTerms,
  WHITE_PAPER_PDF_PATH,
  WHITE_PAPER_SEO_PROFILE,
} from '../src/content/whitePaperSeoProfile';
import { WHITE_PAPER_TRANSLATIONS } from '../src/translations/WhitePaperPageTranslations';
import {
  getSeoRouteDescription,
  SEO_ROUTE_GROUPS,
  SEO_TRANSLATIONS,
} from '../src/translations/SeoTranslations';
import {
  DEFAULT_SITE_URL,
  formatSeoDescription,
  formatSeoTitle,
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

const verifyInitialLoadingShell = (html: string, relativePath: string) => {
  const criticalStylePosition = html.indexOf('id="identra-initial-skeleton-styles"');
  const skeletonPosition = html.indexOf('<div data-initial-skeleton');
  const fallbackPosition = html.indexOf('<main data-seo-fallback');

  expect(
    criticalStylePosition >= 0 && skeletonPosition >= 0,
    `${relativePath} is missing the CSS-only initial skeleton or its critical styles.`,
  );
  expect(
    fallbackPosition >= 0 && skeletonPosition < fallbackPosition,
    `${relativePath} exposes SEO fallback text before the initial skeleton.`,
  );
  expect(
    html.includes('<noscript><style>[data-initial-skeleton] { display: none !important; }</style></noscript>'),
    `${relativePath} does not expose its SEO fallback when JavaScript is disabled.`,
  );
  expect(
    !html.includes('data-seo-fallback-slot'),
    `${relativePath} still contains the unfilled SEO fallback slot.`,
  );
};

const absoluteUrl = (path: string): string =>
  new URL(path, `${siteUrl}/`).toString();

const routeFile = (path: string): string =>
  `${path.replace(/^\/+/, '')}/index.html`;

const metaContent = (
  html: string,
  attribute: 'name' | 'property',
  key: string,
): string | null => html.match(
  new RegExp(`<meta ${attribute}="${key}" content="([^"]*)" \\/>`),
)?.[1] ?? null;

const canonicalLinks = (html: string): string[] => [
  ...html.matchAll(/<link rel="canonical" href="([^"]+)" \/>/g),
].map((match) => match[1]);

const alternateLinks = (html: string): Map<string, string> => new Map(
  [...html.matchAll(
    /<link rel="alternate" hreflang="([^"]+)" href="([^"]+)" \/>/g,
  )].map((match) => [match[1], match[2]]),
);

const collectHtmlFiles = (
  directory: string,
  relativeDirectory = '',
): string[] => readdirSync(resolve(directory, relativeDirectory), { withFileTypes: true })
  .flatMap((entry) => {
    const relativePath = relativeDirectory
      ? `${relativeDirectory}/${entry.name}`
      : entry.name;

    if (entry.isDirectory()) {
      return collectHtmlFiles(directory, relativePath);
    }

    return entry.isFile() && entry.name.endsWith('.html') ? [relativePath] : [];
  });

type IndexableRouteDefinition = {
  readonly locales: readonly Locale[];
  readonly pathForLocale: (locale: Locale) => string;
};

const indexableRouteDefinitions: IndexableRouteDefinition[] = [
  ...APP_VIEWS
    .filter((view) => view !== 'blog-detail' && SEO_ROUTE_GROUPS[view] !== 'account')
    .map((view) => ({
      locales: getViewLocales(view),
      pathForLocale: (locale: Locale) => viewToPath(view, locale),
    })),
  ...DEMO_SCENARIO_IDS.map((scenarioId) => ({
    locales: SUPPORTED_LOCALES,
    pathForLocale: (locale: Locale) => demoScenarioPath(scenarioId, locale),
  })),
  ...PUBLIC_BLOG_DETAIL_IDS.map((articleId) => ({
    locales: getBlogDetailLocales(articleId),
    pathForLocale: (locale: Locale) => blogDetailPath(articleId, locale),
  })),
];

const indexablePages = indexableRouteDefinitions.flatMap((definition) => {
  const defaultLocale = definition.locales.includes(DEFAULT_LOCALE)
    ? DEFAULT_LOCALE
    : definition.locales[0];
  const expectedAlternates = new Map<string, string>(
    definition.locales.map((locale) => [locale, absoluteUrl(definition.pathForLocale(locale))]),
  );
  expectedAlternates.set(
    'x-default',
    absoluteUrl(definition.pathForLocale(defaultLocale)),
  );

  return definition.locales.map((locale) => ({
    expectedAlternates,
    path: definition.pathForLocale(locale),
  }));
});

const privatePages = APP_VIEWS
  .filter((view) => SEO_ROUTE_GROUPS[view] === 'account')
  .flatMap((view) => getViewLocales(view).map((locale) => viewToPath(view, locale)));

const legacyPages = (
  Object.entries(LEGACY_VIEW_ALIASES) as Array<[LegacyViewAlias, AppView]>
).flatMap(([alias, targetView]) => getViewLocales(targetView).map((locale) => ({
  path: legacyViewAliasPath(alias, locale),
  targetPath: viewToPath(targetView, locale),
})));

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
  trailingSlash?: boolean;
  redirects?: Array<{
    source?: string;
    destination?: string;
    permanent?: boolean;
  }>;
  headers?: Array<{
    source?: string;
    headers?: Array<{ key?: string; value?: string }>;
  }>;
};
const configuredRedirects = vercelConfig.redirects ?? [];
const configuredHeaders = vercelConfig.headers ?? [];
const redirectBySource = new Map(
  configuredRedirects.flatMap((redirect) =>
    redirect.source && redirect.destination
      ? [[redirect.source, redirect.destination] as const]
      : []),
);

expect(
  vercelConfig.trailingSlash === false,
  'Vercel must normalize trailing-slash URLs to the canonical route without a trailing slash.',
);
expect(
  Boolean(configuredRedirects.some((redirect) =>
    redirect.source === '/'
    && redirect.destination === defaultLandingPath
    && redirect.permanent === true)),
  `Vercel must permanently redirect / to ${defaultLandingPath}.`,
);
expect(
  redirectBySource.size === configuredRedirects.length,
  'Vercel contains a redirect without a source or destination, or repeats a redirect source.',
);

for (const redirect of configuredRedirects) {
  if (!redirect.source || !redirect.destination) continue;

  expect(
    redirect.source.startsWith('/')
      && redirect.destination.startsWith('/')
      && redirect.source !== redirect.destination,
    `Vercel redirect ${redirect.source} -> ${redirect.destination} is invalid or self-referencing.`,
  );

  const visited = new Set([redirect.source]);
  let destination: string | undefined = redirect.destination;
  let redirectCount = 1;
  while (destination && redirectBySource.has(destination)) {
    if (visited.has(destination)) {
      failures.push(`Vercel redirect ${redirect.source} enters a loop at ${destination}.`);
      break;
    }
    visited.add(destination);
    destination = redirectBySource.get(destination);
    redirectCount += 1;
  }
  expect(
    redirectCount <= 3,
    `Vercel redirect ${redirect.source} creates an unnecessarily long redirect chain.`,
  );
}
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
  rootHtml.includes('<meta name="robots" content="noindex, follow" />'),
  'The static root redirect fallback must be noindex, follow.',
);

const whitePaperPdfHeaders = configuredHeaders.find(
  ({ source }) => source === WHITE_PAPER_PDF_PATH,
)?.headers ?? [];
expect(
  whitePaperPdfHeaders.some(({ key, value }) =>
    key?.toLowerCase() === 'link'
    && value === `<${siteUrl}${viewToPath('white-paper', 'vi')}>; rel="canonical"`),
  'The White Paper PDF must expose an HTTP canonical link to the Vietnamese HTML page.',
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

for (const page of indexablePages) {
  const relativeFile = routeFile(page.path);
  const absoluteFile = resolve(distDir, relativeFile);
  if (!existsSync(absoluteFile)) {
    failures.push(`${page.path} is missing its generated HTML entry.`);
    continue;
  }

  const html = readDistFile(relativeFile);
  const expectedCanonical = absoluteUrl(page.path);
  const canonicals = canonicalLinks(html);
  const alternates = alternateLinks(html);
  const schemaObjects = getSchemaObjects(html, page.path);
  const pageSchema = schemaObjects.find((schema) =>
    schema['@type'] === 'WebPage'
    || schema['@type'] === 'BlogPosting'
    || schema['@type'] === 'TechArticle');

  expect(
    metaContent(html, 'name', 'robots') === 'index, follow, max-image-preview:large',
    `${page.path} is unexpectedly blocked from indexing.`,
  );
  expect(
    canonicals.length === 1 && canonicals[0] === expectedCanonical,
    `${page.path} must expose exactly one self-referencing canonical URL.`,
  );
  expect(
    alternates.size === page.expectedAlternates.size
      && [...page.expectedAlternates].every(([locale, url]) => alternates.get(locale) === url),
    `${page.path} has incomplete or inconsistent hreflang links.`,
  );
  expect(
    metaContent(html, 'property', 'og:url') === expectedCanonical,
    `${page.path} has an Open Graph URL that differs from its canonical URL.`,
  );
  expect(
    typeof pageSchema?.url === 'string' && pageSchema.url === expectedCanonical,
    `${page.path} has structured data that differs from its canonical URL.`,
  );
  expect(
    Boolean(html.match(/<title>[^<]+<\/title>/))
      && Boolean(metaContent(html, 'name', 'description')),
    `${page.path} is missing a title or meta description.`,
  );
  expect(
    html.includes('<main data-seo-fallback'),
    `${page.path} is missing crawlable fallback content.`,
  );
  const staticH2Count = html.match(/<h2(?:\s|>)/g)?.length ?? 0;
  const staticParagraphCount = html.match(/<p(?:\s|>)/g)?.length ?? 0;
  const staticInternalLinkCount = html.match(/href="\/(?!\/)/g)?.length ?? 0;
  expect(
    staticH2Count >= 2 && staticParagraphCount >= 3,
    `${page.path} exposes too little structured static content before React loads.`,
  );
  if (page.path !== viewToPath('white-paper', 'vi')) {
    expect(
      staticInternalLinkCount >= 3,
      `${page.path} exposes too few crawlable internal links before React loads.`,
    );
  }
  expect(
    !html.includes('http-equiv="refresh"')
      && !html.includes('window.location.replace('),
    `${page.path} contains redirect markup even though it is indexable.`,
  );
}

for (const locale of SUPPORTED_LOCALES) {
  const seenTitles = new Set<string>();
  const seenDescriptions = new Set<string>();

  for (const scenarioId of DEMO_SCENARIO_IDS) {
    const profile = getDemoSeoProfile(scenarioId, locale);
    const path = demoScenarioPath(scenarioId, locale);
    const html = readDistFile(routeFile(path));
    const expectedTitle = formatSeoTitle(
      profile.title,
      SEO_TRANSLATIONS[locale].siteName,
    );
    const description = metaContent(html, 'name', 'description');

    expect(
      html.includes(`<title>${expectedTitle}</title>`)
        && description === formatSeoDescription(profile.description),
      `${path} does not expose its scenario-specific demo metadata.`,
    );
    expect(
      !seenTitles.has(expectedTitle) && !seenDescriptions.has(profile.description),
      `${path} duplicates another demo title or description in ${locale}.`,
    );
    seenTitles.add(expectedTitle);
    seenDescriptions.add(profile.description);
  }
}

for (const locale of SUPPORTED_LOCALES) {
  const landingPath = viewToPath('landing', locale);
  const landingHtml = readDistFile(routeFile(landingPath));
  const schemas = getSchemaObjects(landingHtml, landingPath);
  const websiteSchemas = schemas.filter((schema) => schema['@type'] === 'WebSite');

  expect(
    websiteSchemas.length === 1
      && websiteSchemas[0]?.name === 'Identra'
      && websiteSchemas[0]?.url === siteUrl
      && websiteSchemas[0]?.['@id'] === `${siteUrl}/#website`,
    `${landingPath} is missing the top-level WebSite schema used for the Identra site name.`,
  );
}

for (const path of privatePages) {
  const relativeFile = routeFile(path);
  const absoluteFile = resolve(distDir, relativeFile);
  if (!existsSync(absoluteFile)) {
    failures.push(`${path} is missing its generated private HTML entry.`);
    continue;
  }

  const html = readDistFile(relativeFile);
  expect(
    metaContent(html, 'name', 'robots') === 'noindex, nofollow',
    `${path} must remain noindex, nofollow.`,
  );
  expect(
    !html.includes('http-equiv="refresh"')
      && !html.includes('window.location.replace('),
    `${path} unexpectedly contains redirect markup.`,
  );
}

for (const { path, targetPath } of legacyPages) {
  const relativeFile = routeFile(path);
  const absoluteFile = resolve(distDir, relativeFile);
  if (!existsSync(absoluteFile)) {
    failures.push(`${path} is missing its generated legacy redirect entry.`);
    continue;
  }

  const html = readDistFile(relativeFile);
  expect(
    metaContent(html, 'name', 'robots') === 'noindex, follow'
      && html.includes(`content="0;url=${targetPath}"`)
      && html.includes(`window.location.replace(${JSON.stringify(targetPath)}`),
    `${path} is not a valid noindex redirect to ${targetPath}.`,
  );
}

for (const locale of SUPPORTED_LOCALES) {
  const relativeFile = `${locale}/404/index.html`;
  const html = readDistFile(relativeFile);
  expect(
    metaContent(html, 'name', 'robots') === 'noindex, nofollow',
    `/${locale}/404 must be noindex, nofollow.`,
  );
  expect(
    canonicalLinks(html).length === 0 && alternateLinks(html).size === 0,
    `/${locale}/404 must not expose canonical or hreflang links.`,
  );
}

const globalNotFoundHtml = readDistFile('404.html');
expect(
  metaContent(globalNotFoundHtml, 'name', 'robots') === 'noindex, nofollow'
    && canonicalLinks(globalNotFoundHtml).length === 0
    && alternateLinks(globalNotFoundHtml).size === 0,
  'The global 404 page must be noindex and must not expose canonical or hreflang links.',
);

const expectedHtmlFiles = new Set([
  'index.html',
  '404.html',
  ...indexablePages.map(({ path }) => routeFile(path)),
  ...privatePages.map(routeFile),
  ...legacyPages.map(({ path }) => routeFile(path)),
  ...SUPPORTED_LOCALES.map((locale) => `${locale}/404/index.html`),
]);
const actualHtmlFiles = collectHtmlFiles(distDir);
expect(
  actualHtmlFiles.length === expectedHtmlFiles.size
    && actualHtmlFiles.every((file) => expectedHtmlFiles.has(file)),
  'The build contains a missing or unexpected HTML route outside the typed route registry.',
);

for (const relativeFile of actualHtmlFiles) {
  verifyInitialLoadingShell(readDistFile(relativeFile), relativeFile);
}

const whitePaperRoutePath = viewToPath('white-paper', 'vi');
const whitePaperHtml = readDistFile(routeFile(whitePaperRoutePath));
const whitePaperSchemaObjects = getSchemaObjects(whitePaperHtml, 'white-paper');
const whitePaperArticle = whitePaperSchemaObjects.find(
  (schema) => schema['@type'] === 'TechArticle',
);
const whitePaperAuthor = isRecord(whitePaperArticle?.author)
  ? whitePaperArticle.author
  : null;
const whitePaperEncoding = isRecord(whitePaperArticle?.encoding)
  ? whitePaperArticle.encoding
  : null;
const whitePaperAbout = Array.isArray(whitePaperArticle?.about)
  ? whitePaperArticle.about.filter(isRecord)
  : [];
const whitePaperParagraphCount = whitePaperHtml.match(/<p(?:\s|>)/g)?.length ?? 0;
const whitePaperH2Count = whitePaperHtml.match(/<h2(?:\s|>)/g)?.length ?? 0;
const whitePaperSearchTerms = getWhitePaperSearchTerms();

expect(
  whitePaperHtml.includes(`<title>${WHITE_PAPER_SEO_PROFILE.title}</title>`)
    && metaContent(whitePaperHtml, 'name', 'description') === WHITE_PAPER_SEO_PROFILE.description
    && metaContent(whitePaperHtml, 'property', 'og:type') === 'article'
    && metaContent(whitePaperHtml, 'property', 'og:title') === WHITE_PAPER_SEO_PROFILE.title
    && metaContent(whitePaperHtml, 'property', 'og:description') === WHITE_PAPER_SEO_PROFILE.description,
  'White Paper search and sharing metadata is incomplete or inconsistent.',
);
expect(
  metaContent(whitePaperHtml, 'name', 'keywords') === null,
  'White Paper must not emit the meta keywords tag ignored by Google Search.',
);
expect(
  whitePaperHtml.includes('<main data-seo-fallback')
    && whitePaperHtml.includes('<article>')
    && whitePaperHtml.includes(`<h1>${WHITE_PAPER_TRANSLATIONS.vi.heroTitle}</h1>`)
    && whitePaperHtml.includes(`href="${WHITE_PAPER_PDF_PATH}"`),
  'White Paper is missing its crawlable article shell, visible heading, or PDF link.',
);
expect(
  whitePaperParagraphCount >= 40,
  `White Paper contains too little static content (${whitePaperParagraphCount} paragraphs).`,
);
expect(
  whitePaperH2Count >= WHITE_PAPER_TRANSLATIONS.vi.sections.length
    && WHITE_PAPER_TRANSLATIONS.vi.sections.every((section) =>
      whitePaperHtml.includes(`<h2>${section.title}</h2>`)),
  `White Paper does not expose all ${WHITE_PAPER_TRANSLATIONS.vi.sections.length} sections in static HTML.`,
);
expect(
  whitePaperSearchTerms.every((term) =>
    whitePaperHtml.includes(`<meta property="article:tag" content="${term}" />`)),
  'White Paper is missing an Open Graph article topic.',
);
expect(
  Boolean(
    whitePaperArticle
    && whitePaperArticle.name === WHITE_PAPER_SEO_PROFILE.title
    && whitePaperArticle.headline === WHITE_PAPER_SEO_PROFILE.headline
    && whitePaperArticle.description === WHITE_PAPER_SEO_PROFILE.description
    && whitePaperArticle.version === WHITE_PAPER_SEO_PROFILE.version
    && whitePaperArticle.datePublished === WHITE_PAPER_SEO_PROFILE.publishedAt
    && whitePaperArticle.dateModified === WHITE_PAPER_SEO_PROFILE.modifiedAt
    && whitePaperArticle.articleSection === WHITE_PAPER_SEO_PROFILE.articleSection
    && whitePaperArticle.keywords === whitePaperSearchTerms.join(', ')
    && whitePaperArticle.isAccessibleForFree === true
    && whitePaperAuthor?.['@type'] === WHITE_PAPER_SEO_PROFILE.author.type
    && whitePaperAuthor?.name === WHITE_PAPER_SEO_PROFILE.author.name
    && whitePaperEncoding?.['@type'] === 'MediaObject'
    && whitePaperEncoding?.contentUrl === `${siteUrl}${WHITE_PAPER_PDF_PATH}`
    && whitePaperEncoding?.encodingFormat === 'application/pdf'
    && whitePaperAbout.length === WHITE_PAPER_SEO_PROFILE.about.length
    && WHITE_PAPER_SEO_PROFILE.about.every((topic) =>
      whitePaperAbout.some((item) => item['@type'] === 'Thing' && item.name === topic))
  ),
  'White Paper TechArticle schema is incomplete or inconsistent with its SEO profile.',
);

for (const articleId of PUBLIC_BLOG_DETAIL_IDS) {
  const article = getStructuredBlogArticle(articleId);
  if (!article) {
    failures.push(`Missing structured article model for ${articleId}.`);
    continue;
  }

  const seoProfile = getStructuredBlogSeoMetadata(article);
  const expectedKeywords = getStructuredBlogSearchTerms(seoProfile).join(', ');

  const routePath = blogDetailPath(articleId, 'vi');
  const html = readDistFile(`${routePath.replace(/^\/+/, '')}/index.html`);
  const paragraphCount = html.match(/<p(?:\s|>)/g)?.length ?? 0;
  const headingCount = html.match(/<h[23](?:\s|>)/g)?.length ?? 0;
  const schemaObjects = getSchemaObjects(html, articleId);
  const blogPosting = schemaObjects.find((schema) => schema['@type'] === 'BlogPosting');
  const schemaAuthor = isRecord(blogPosting?.author) ? blogPosting.author : null;
  const schemaImage = isRecord(blogPosting?.image) ? blogPosting.image : null;
  const schemaAbout = Array.isArray(blogPosting?.about)
    ? blogPosting.about.filter(isRecord)
    : [];

  expect(
    html.includes(`<title>${seoProfile.title}</title>`)
      && metaContent(html, 'name', 'description') === seoProfile.description
      && metaContent(html, 'property', 'og:title') === seoProfile.title
      && metaContent(html, 'property', 'og:description') === seoProfile.description,
    `${articleId} does not expose its intended search and sharing metadata.`,
  );
  expect(
    metaContent(html, 'name', 'keywords') === null,
    `${articleId} must not emit the meta keywords tag ignored by Google Search.`,
  );

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
      && blogPosting.headline === article.content.vi.title
      && blogPosting.keywords === expectedKeywords
      && schemaAbout.length === seoProfile.entities.length
      && seoProfile.entities.every((entity) =>
        schemaAbout.some((item) => item['@type'] === 'Thing' && item.name === entity))
      && typeof blogPosting.wordCount === 'number'
      && blogPosting.wordCount > 0
    ),
    `${articleId} has incomplete BlogPosting author, image, topic, keyword, or word count metadata.`,
  );
  expect(
    blogIndexHtml.includes(`href="${routePath}"`),
    `Blog index does not expose a crawlable link to ${articleId}.`,
  );
}

const sitemapXml = readDistFile('sitemap.xml');
const blogFeedXml = readDistFile('blog-feed.xml');
const robotsTxt = readDistFile('robots.txt');
const sitemapLocations = [
  ...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g),
].map((match) => match[1]);
const expectedIndexableUrls = new Set(
  indexablePages.map(({ path }) => absoluteUrl(path)),
);
const sitemapUrlBlocks = new Map(
  [...sitemapXml.matchAll(/<url>\s*([\s\S]*?)\s*<\/url>/g)].map((match) => {
    const block = match[1];
    const location = block.match(/<loc>([^<]+)<\/loc>/)?.[1] ?? '';
    return [location, block];
  }),
);

expect(
  sitemapLocations.length === expectedIndexableUrls.size
    && new Set(sitemapLocations).size === sitemapLocations.length
    && sitemapLocations.every((url) => expectedIndexableUrls.has(url)),
  'Sitemap URLs do not exactly match the typed set of indexable pages.',
);
expect(
  !sitemapLocations.includes(siteUrl)
    && !sitemapLocations.includes(`${siteUrl}/`)
    && privatePages.every((path) => !sitemapLocations.includes(absoluteUrl(path)))
    && legacyPages.every(({ path }) => !sitemapLocations.includes(absoluteUrl(path))),
  'Sitemap contains a root redirect, private page, or legacy redirect.',
);
expect(
  !sitemapXml.includes('/relay')
    && SUPPORTED_LOCALES.every((locale) =>
      sitemapXml.includes(`<loc>${siteUrl}${viewToPath('credential-issuance', locale)}</loc>`)),
  'Sitemap still exposes Relay or is missing a localized Credential Issuance route.',
);

for (const page of indexablePages) {
  const canonicalUrl = absoluteUrl(page.path);
  const block = sitemapUrlBlocks.get(canonicalUrl) ?? '';
  const sitemapAlternates = new Map(
    [...block.matchAll(
      /<xhtml:link rel="alternate" hreflang="([^"]+)" href="([^"]+)" \/>/g,
    )].map((match) => [match[1], match[2]]),
  );

  expect(
    sitemapAlternates.size === page.expectedAlternates.size
      && [...page.expectedAlternates].every(
        ([locale, url]) => sitemapAlternates.get(locale) === url,
      ),
    `${page.path} has incomplete or inconsistent sitemap hreflang links.`,
  );
}

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
expect(
  robotsTxt.includes('User-agent: *')
    && robotsTxt.includes('Allow: /')
    && !robotsTxt.includes('Disallow:'),
  'robots.txt blocks pages that need to remain crawlable for public content or noindex discovery.',
);

if (failures.length > 0) {
  console.error(`SEO output findings: ${failures.length}`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log(
    `SEO output findings: 0 (${indexablePages.length} indexable pages, ${privatePages.length} private pages, ${vietnameseDescriptions.size} Vietnamese routes, and ${PUBLIC_BLOG_DETAIL_IDS.length} Blog articles verified)`,
  );
}
