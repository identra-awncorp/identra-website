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

await mapConcurrent(sitemapUrls, 12, async (url) => {
  const response = await fetchDirect(url);
  if (!response) return;

  const html = await response.text();
  const robots = html.match(/<meta name="robots" content="([^"]*)" \/>/)?.[1] ?? '';
  const canonical = html.match(/<link rel="canonical" href="([^"]+)" \/>/)?.[1] ?? '';
  const xRobotsTag = response.headers.get('x-robots-tag') ?? '';

  expect(response.status === 200, `${url} returns HTTP ${response.status}, expected 200.`);
  expect(!response.headers.get('location'), `${url} redirects even though it is in the sitemap.`);
  expect(
    response.headers.get('content-type')?.includes('text/html') === true,
    `${url} does not return HTML.`,
  );
  expect(
    robots === 'index, follow, max-image-preview:large'
      && !xRobotsTag.toLowerCase().includes('noindex'),
    `${url} is blocked from indexing by robots metadata or an HTTP header.`,
  );
  expect(canonical === url, `${url} does not expose a self-referencing canonical URL.`);
  expect(
    !html.includes('http-equiv="refresh"')
      && !html.includes('window.location.replace('),
    `${url} contains client-side redirect markup.`,
  );
  expect(
    html.includes('<main data-seo-fallback'),
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
  canonicalRootTrace.length === 2
    && [301, 308].includes(canonicalRootTrace[0]?.status ?? 0)
    && canonicalRootLastHop?.status === 200
    && canonicalRootLastHop.url === absoluteUrl(viewToPath('landing', DEFAULT_LOCALE)),
  `The canonical root must permanently redirect in one hop to ${viewToPath('landing', DEFAULT_LOCALE)}.`,
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
      && lastHop.url === absoluteUrl(viewToPath('landing', DEFAULT_LOCALE)),
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
