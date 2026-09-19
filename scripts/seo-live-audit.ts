/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import 'dotenv/config';
import {
  APP_VIEWS,
  DEFAULT_LOCALE,
  DEMO_SCENARIO_IDS,
  PUBLIC_BLOG_DETAIL_IDS,
  SUPPORTED_LOCALES,
  blogDetailPath,
  demoScenarioPath,
  getBlogDetailLocales,
  getViewLocales,
  localizePath,
  pathToBlogDetailId,
  pathToView,
  viewToPath,
  type Locale,
} from '../src/types/routes';
import {
  SEO_ROUTE_GROUPS,
} from '../src/translations/SeoTranslations';
import { DEFAULT_SITE_URL } from '../src/utils/seo';

const siteUrl = (process.env.VITE_SITE_URL ?? process.env.SITE_URL ?? DEFAULT_SITE_URL)
  .trim()
  .replace(/\/+$/, '');
const failures: string[] = [];
const withoutRootLocaleScript = (html: string): string =>
  html.replace(/<script id="identra-root-locale">[\s\S]*?<\/script>/g, '');
const requestHeaders = {
  'User-Agent': 'Identra-SEO-Audit/1.0',
};

const expect = (condition: boolean, message: string) => {
  if (!condition) failures.push(message);
};

const absoluteUrl = (path: string): string =>
  new URL(path, `${siteUrl}/`).toString();

const fetchDirect = async (
  url: string,
  method: 'GET' | 'HEAD' = 'GET',
): Promise<Response | null> => {
  try {
    return await fetch(url, {
      method,
      headers: requestHeaders,
      redirect: 'manual',
      signal: AbortSignal.timeout(20_000),
    });
  } catch (error) {
    failures.push(`${url} could not be fetched: ${String(error)}`);
    return null;
  }
};

const mapConcurrent = async <T>(
  values: readonly T[],
  concurrency: number,
  task: (value: T) => Promise<void>,
) => {
  let nextIndex = 0;
  const workers = Array.from(
    { length: Math.min(concurrency, values.length) },
    async () => {
      while (nextIndex < values.length) {
        const value = values[nextIndex];
        nextIndex += 1;
        await task(value);
      }
    },
  );
  await Promise.all(workers);
};

const indexablePaths = [
  ...APP_VIEWS
    .filter((view) => view !== 'blog-detail' && SEO_ROUTE_GROUPS[view] !== 'account')
    .flatMap((view) => getViewLocales(view).map((locale) => viewToPath(view, locale))),
  ...DEMO_SCENARIO_IDS.flatMap((scenarioId) =>
    SUPPORTED_LOCALES.map((locale) => demoScenarioPath(scenarioId, locale))),
  ...PUBLIC_BLOG_DETAIL_IDS.flatMap((articleId) =>
    getBlogDetailLocales(articleId).map((locale) => blogDetailPath(articleId, locale))),
];
const expectedIndexableUrls = new Set(indexablePaths.map(absoluteUrl));
const privatePaths = APP_VIEWS
  .filter((view) => SEO_ROUTE_GROUPS[view] === 'account')
  .flatMap((view) => getViewLocales(view).map((locale) => viewToPath(view, locale)));
const pageMetadata = new Map<string, string>();

const sitemapResponse = await fetchDirect(`${siteUrl}/sitemap.xml`);
let sitemapXml = '';
if (sitemapResponse) {
  expect(sitemapResponse.status === 200, 'Live sitemap.xml does not return HTTP 200.');
  expect(!sitemapResponse.headers.get('location'), 'Live sitemap.xml unexpectedly redirects.');
  sitemapXml = await sitemapResponse.text();
}

const sitemapUrls = [
  ...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g),
].map((match) => match[1].replace(/&amp;/g, '&'));
expect(
  sitemapUrls.length === expectedIndexableUrls.size
    && new Set(sitemapUrls).size === sitemapUrls.length
    && sitemapUrls.every((url) => expectedIndexableUrls.has(url)),
  'The deployed sitemap does not exactly match the typed set of indexable routes.',
);

await mapConcurrent(sitemapUrls.filter((url) => expectedIndexableUrls.has(url)), 8, async (url) => {
  const response = await fetchDirect(url);
  if (!response) return;

  const html = await response.text();
  const robots = html.match(/<meta name="robots" content="([^"]*)" \/>/)?.[1] ?? '';
  const canonical = html.match(/<link rel="canonical" href="([^"]+)" \/>/)?.[1] ?? '';
  const xRobotsTag = response.headers.get('x-robots-tag') ?? '';
  const pathname = new URL(url).pathname;
  const view = pathToView(pathname);
  const blogId = view === 'blog-detail' ? pathToBlogDetailId(pathname) : null;
  const locales = blogId ? getBlogDetailLocales(blogId) : getViewLocales(view!);
  const defaultLocale = locales.includes(DEFAULT_LOCALE) ? DEFAULT_LOCALE : locales[0];
  const expectedAlternates = new Map<string, string>([
    ...locales.map((locale) => [locale, absoluteUrl(localizePath(pathname, locale)!)] as const),
    ['x-default', absoluteUrl(localizePath(pathname, defaultLocale)!)],
  ]);
  const alternates = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"\s*\/?>/g)];
  const actualAlternates = new Map(alternates.map((match) => [match[1], match[2]]));
  const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]+)"\s*\/?>/g)];
  const locale = pathname.split('/')[1];

  expect(
    alternates.length === expectedAlternates.size
      && [...expectedAlternates].every(([language, href]) => actualAlternates.get(language) === href),
    `${url} has incomplete, duplicate, or incorrect hreflang links.`,
  );
  expect(html.includes(`<html lang="${locale}">`), `${url} has the wrong document language.`);
  expect(/<h1(?:\s|>)/.test(html), `${url} is missing its primary heading before JavaScript.`);
  if (view && !['blog', 'blog-detail', 'white-paper'].includes(view)) {
    expect(
      html.includes('data-seo-prerendered')
        && html.includes('<noscript><style>@layer base {')
        && !/<!--\$(?:!|\?)-->/.test(html),
      `${url} is missing complete prerendered content or its no-JavaScript visibility rules.`,
    );
  }
  for (const [kind, value] of [
    ['title', html.match(/<title>([^<]+)<\/title>/)?.[1]],
    ['description', html.match(/<meta name="description" content="([^"]+)"/)?.[1]],
  ]) {
    expect(Boolean(value?.trim()), `${url} is missing its ${kind}.`);
    if (!value) continue;
    const key = `${locale}:${kind}:${value}`;
    expect(!pageMetadata.has(key), `${url} repeats the ${kind} of ${pageMetadata.get(key)}.`);
    pageMetadata.set(key, url);
  }
  try {
    const schema: unknown = JSON.parse(html.match(/<script id="identra-seo-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] ?? 'null');
    expect(
      Array.isArray(schema) && schema.some((item: unknown) =>
        typeof item === 'object' && item !== null && 'url' in item && item.url === url),
      `${url} is missing structured data for its canonical page.`,
    );
  } catch {
    failures.push(`${url} contains invalid JSON-LD.`);
  }

  expect(response.status === 200, `${url} returns HTTP ${response.status}, expected 200.`);
  expect(!response.headers.get('location'), `${url} redirects even though it is in the sitemap.`);
  expect(
    response.headers.get('content-type')?.includes('text/html') === true,
    `${url} does not return HTML.`,
  );
  expect(
    robots === 'index, follow, max-image-preview:large'
      && !/\b(?:noindex|none)\b/i.test(xRobotsTag),
    `${url} is blocked from indexing by robots metadata or an HTTP header.`,
  );
  expect(canonicals.length === 1 && canonical === url, `${url} must expose exactly one self-referencing canonical URL.`);
  expect(
    !withoutRootLocaleScript(html).includes('http-equiv="refresh"')
      && !withoutRootLocaleScript(html).includes('window.location.replace('),
    `${url} contains client-side redirect markup.`,
  );
  expect(
    /<(?:main|div) data-seo-fallback[ =>]/.test(html),
    `${url} is missing crawlable fallback content.`,
  );
});

await mapConcurrent(privatePaths, 5, async (path) => {
  const url = absoluteUrl(path);
  const response = await fetchDirect(url);
  if (!response) return;

  const html = await response.text();
  const robots = html.match(/<meta name="robots" content="([^"]*)" \/>/)?.[1] ?? '';
  expect(response.status === 200, `${url} returns HTTP ${response.status}, expected 200.`);
  expect(!response.headers.get('location'), `${url} unexpectedly redirects.`);
  expect(robots === 'noindex, nofollow', `${url} must remain noindex, nofollow.`);
});

type RedirectHop = {
  readonly location: string | null;
  readonly status: number;
  readonly url: string;
};

const followRedirects = async (initialUrl: string): Promise<RedirectHop[]> => {
  const hops: RedirectHop[] = [];
  const visited = new Set<string>();
  let currentUrl = initialUrl;

  for (let index = 0; index < 6; index += 1) {
    if (visited.has(currentUrl)) {
      failures.push(`${initialUrl} contains a redirect loop at ${currentUrl}.`);
      return hops;
    }
    visited.add(currentUrl);

    const response = await fetchDirect(currentUrl);
    if (!response) return hops;
    const location = response.headers.get('location');
    hops.push({ location, status: response.status, url: currentUrl });

    if (response.status < 300 || response.status >= 400) {
      return hops;
    }
    if (!location) {
      failures.push(`${currentUrl} returns a redirect without a Location header.`);
      return hops;
    }

    try {
      currentUrl = new URL(location, currentUrl).toString();
    } catch {
      failures.push(`${currentUrl} returns an invalid redirect destination: ${location}.`);
      return hops;
    }
  }

  failures.push(`${initialUrl} exceeds the live audit redirect limit.`);
  return hops;
};

const canonicalRootTrace = await followRedirects(`${siteUrl}/`);
const canonicalRootLastHop = canonicalRootTrace.at(-1);
expect(
  canonicalRootTrace.length === 1
    && canonicalRootLastHop?.status === 200
    && canonicalRootLastHop.url === absoluteUrl('/'),
  'The canonical root must remain a readable 200 neutral entry so it can honor a saved locale.',
);

const canonicalHost = new URL(siteUrl);
const apexHost = canonicalHost.hostname.startsWith('www.')
  ? canonicalHost.hostname.slice(4)
  : canonicalHost.hostname;
const redirectVariants = [
  `http://${apexHost}/`,
  `https://${apexHost}/`,
  `http://${canonicalHost.hostname}/`,
];

for (const variant of redirectVariants) {
  const trace = await followRedirects(variant);
  const lastHop = trace.at(-1);
  expect(
    trace.length > 0
      && trace.length <= 4
      && lastHop?.status === 200
      && lastHop.url === absoluteUrl('/'),
    `${variant} does not resolve safely to the canonical landing page.`,
  );
}

const notFoundUrl = `${siteUrl}/__identra_seo_audit_missing_page__`;
const notFoundResponse = await fetchDirect(notFoundUrl);
if (notFoundResponse) {
  const html = await notFoundResponse.text();
  expect(notFoundResponse.status === 404, 'A missing live URL does not return HTTP 404.');
  expect(
    html.includes('<meta name="robots" content="noindex, nofollow" />')
      && !html.includes('<link rel="canonical"'),
    'The live 404 response is indexable or exposes a canonical URL.',
  );
}

const robotsResponse = await fetchDirect(`${siteUrl}/robots.txt`);
if (robotsResponse) {
  const robots = await robotsResponse.text();
  expect(robotsResponse.status === 200, 'Live robots.txt does not return HTTP 200.');
  expect(!robotsResponse.headers.get('location'), 'Live robots.txt unexpectedly redirects.');
  expect(
    robots.includes('User-agent: *')
      && robots.includes('Allow: /')
      && robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`)
      && !robots.includes('Disallow:'),
    'Live robots.txt conflicts with public indexing or noindex discovery.',
  );
}

const criticalAssets = [
  `${siteUrl}/blog-feed.xml`,
  `${siteUrl}/identra-logo.svg`,
  `${siteUrl}/social/identra-og.jpg`,
];
await mapConcurrent(criticalAssets, 3, async (url) => {
  const response = await fetchDirect(url, 'HEAD');
  if (!response) return;
  expect(response.status === 200, `${url} returns HTTP ${response.status}, expected 200.`);
  expect(!response.headers.get('location'), `${url} unexpectedly redirects.`);
});

if (failures.length > 0) {
  console.error(`Live SEO audit findings: ${failures.length}`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log(
    `Live SEO audit findings: 0 (${sitemapUrls.length} indexable URLs and ${privatePaths.length} intentional noindex URLs verified at ${siteUrl})`,
  );
}
