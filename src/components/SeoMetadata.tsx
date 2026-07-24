/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo } from 'react';
import { useLanguage, type Language } from '../context/LanguageContext';
import {
  SEO_ROUTE_GROUPS,
  SEO_TRANSLATIONS,
} from '../translations/SeoTranslations';
import {
  blogDetailPath,
  DEFAULT_BLOG_DETAIL_ID,
  DEFAULT_LOCALE,
  demoScenarioPath,
  getViewLocales,
  SUPPORTED_LOCALES,
  type AppView,
  type BlogDetailId,
  type DemoScenarioId,
  type Locale,
  viewToPath,
} from '../types/routes';
import { getLocalizedRecord } from '../utils/i18nRuntime';
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
} from '../utils/seo';

const LANGUAGE_META: Record<Language, { htmlLang: string; ogLocale: string }> = {
  en: { htmlLang: 'en', ogLocale: 'en_US' },
  es: { htmlLang: 'es', ogLocale: 'es_ES' },
  ja: { htmlLang: 'ja', ogLocale: 'ja_JP' },
  de: { htmlLang: 'de', ogLocale: 'de_DE' },
  vi: { htmlLang: 'vi', ogLocale: 'vi_VN' },
};

const HREFLANG_CODES: Record<Locale, string> = {
  en: 'en',
  es: 'es',
  ja: 'ja',
  de: 'de',
  vi: 'vi',
};

interface SeoMetadataProps {
  currentView: AppView;
  blogId?: BlogDetailId;
  demoScenarioId?: DemoScenarioId;
  isNotFound?: boolean;
}

const normalizeSiteUrl = (siteUrl: string | undefined): string => {
  const trimmedSiteUrl = siteUrl?.trim();

  if (!trimmedSiteUrl) {
    return DEFAULT_SITE_URL;
  }

  return trimmedSiteUrl.replace(/\/+$/, '');
};

const absoluteUrl = (path: string, siteUrl: string): string =>
  new URL(path, `${siteUrl}/`).toString();

const templateDescription = (template: string, pageTitle: string): string =>
  template.replace(/\{page\}/g, pageTitle);

const upsertMeta = (
  attribute: 'name' | 'property',
  key: string,
  content: string,
) => {
  let metaElement = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  );

  if (!metaElement) {
    metaElement = document.createElement('meta');
    metaElement.setAttribute(attribute, key);
    document.head.appendChild(metaElement);
  }

  metaElement.setAttribute('content', content);
};

const upsertLink = (rel: string, href: string) => {
  let linkElement = document.head.querySelector<HTMLLinkElement>(
    `link[rel="${rel}"]`,
  );

  if (!linkElement) {
    linkElement = document.createElement('link');
    linkElement.setAttribute('rel', rel);
    document.head.appendChild(linkElement);
  }

  linkElement.setAttribute('href', href);
};

const upsertAlternateLink = (hrefLang: string, href: string) => {
  let linkElement = document.head.querySelector<HTMLLinkElement>(
    `link[rel="alternate"][hreflang="${hrefLang}"]`,
  );

  if (!linkElement) {
    linkElement = document.createElement('link');
    linkElement.setAttribute('rel', 'alternate');
    linkElement.setAttribute('hreflang', hrefLang);
    document.head.appendChild(linkElement);
  }

  linkElement.setAttribute('href', href);
};

const removeLocalizedLinks = () => {
  document.head.querySelector('link[rel="canonical"]')?.remove();
  document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((link) => {
    link.remove();
  });
};

export default function SeoMetadata({
  currentView,
  blogId,
  demoScenarioId,
  isNotFound = false,
}: SeoMetadataProps): null {
  const { language } = useLanguage();
  const seo = getLocalizedRecord(
    SEO_TRANSLATIONS,
    language,
    'SEO_TRANSLATIONS',
  );

  const metadata = useMemo(() => {
    const siteUrl = normalizeSiteUrl(import.meta.env.VITE_SITE_URL);
    const localeMeta = LANGUAGE_META[language];
    const routeTitle = isNotFound
      ? seo.notFoundTitle
      : seo.routeTitles[currentView];
    const routeGroup = SEO_ROUTE_GROUPS[currentView];
    const routePathForLocale = (locale: Locale) =>
      currentView === 'blog-detail'
        ? blogDetailPath(blogId ?? DEFAULT_BLOG_DETAIL_ID, locale)
        : currentView === 'demo' && demoScenarioId
          ? demoScenarioPath(demoScenarioId, locale)
          : viewToPath(currentView, locale);
    const canonicalUrl = isNotFound
      ? null
      : absoluteUrl(routePathForLocale(language), siteUrl);
    const alternateUrls = isNotFound
      ? []
      : getViewLocales(currentView).map((locale) => ({
          href: absoluteUrl(routePathForLocale(locale), siteUrl),
          hrefLang: HREFLANG_CODES[locale],
          locale,
        }));
    const imageUrl = absoluteUrl(PUBLIC_SOCIAL_IMAGE_PATH, siteUrl);
    const logoUrl = absoluteUrl(PUBLIC_LOGO_PATH, siteUrl);
    const isBlogDetail = !isNotFound && currentView === 'blog-detail';
    const blogPost = isBlogDetail
      ? seo.blogPosts[blogId ?? DEFAULT_BLOG_DETAIL_ID]
      : null;
    const title = isNotFound
      ? formatSeoTitle(routeTitle, seo.siteName)
      : isBlogDetail && blogPost
        ? formatSeoTitle(blogPost.title, seo.blogTitleSuffix)
        : currentView === 'landing'
          ? formatSeoTitle(seo.defaultTitle)
          : formatSeoTitle(routeTitle, seo.siteName);
    const description = formatSeoDescription(
      isNotFound
        ? seo.notFoundDescription
        : isBlogDetail && blogPost
          ? blogPost.description
          : templateDescription(seo.descriptionTemplates[routeGroup], routeTitle),
    );

    return {
      alternateUrls,
      canonicalUrl,
      description,
      headline: isNotFound ? routeTitle : blogPost?.title ?? routeTitle,
      imageUrl,
      isBlogDetail,
      localeMeta,
      logoUrl,
      robotsContent: isNotFound || routeGroup === 'account'
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large',
      routeTitle,
      siteUrl,
      title,
    };
  }, [blogId, currentView, demoScenarioId, isNotFound, language, seo]);

  useEffect(() => {
    document.documentElement.lang = metadata.localeMeta.htmlLang;
    document.title = metadata.title;

    removeLocalizedLinks();
    if (metadata.canonicalUrl) {
      upsertLink('canonical', metadata.canonicalUrl);
    }
    metadata.alternateUrls.forEach(({ href, hrefLang }) => {
      upsertAlternateLink(hrefLang, href);
    });
    const defaultAlternate = metadata.alternateUrls.find(
      ({ locale }) => locale === DEFAULT_LOCALE,
    ) ?? metadata.alternateUrls[0];
    if (defaultAlternate) {
      upsertAlternateLink('x-default', defaultAlternate.href);
    }
    upsertMeta('name', 'description', metadata.description);
    upsertMeta('name', 'robots', metadata.robotsContent);
    upsertMeta('name', 'application-name', 'Identra');
    upsertMeta('property', 'og:site_name', 'Identra');
    upsertMeta('property', 'og:type', metadata.isBlogDetail ? 'article' : 'website');
    upsertMeta('property', 'og:title', metadata.title);
    upsertMeta('property', 'og:description', metadata.description);
    const pageUrl = metadata.canonicalUrl ?? window.location.href;
    upsertMeta('property', 'og:url', pageUrl);
    upsertMeta('property', 'og:image', metadata.imageUrl);
    upsertMeta('property', 'og:image:secure_url', metadata.imageUrl);
    upsertMeta('property', 'og:image:type', 'image/jpeg');
    upsertMeta('property', 'og:image:width', SOCIAL_IMAGE_WIDTH);
    upsertMeta('property', 'og:image:height', SOCIAL_IMAGE_HEIGHT);
    upsertMeta('property', 'og:image:alt', seo.imageAlt);
    upsertMeta('property', 'og:locale', metadata.localeMeta.ogLocale);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', metadata.title);
    upsertMeta('name', 'twitter:description', metadata.description);
    upsertMeta('name', 'twitter:image', metadata.imageUrl);
    upsertMeta('name', 'twitter:image:alt', seo.imageAlt);

    let schemaElement = document.getElementById('identra-seo-schema');

    if (!schemaElement) {
      schemaElement = document.createElement('script');
      schemaElement.id = 'identra-seo-schema';
      schemaElement.setAttribute('type', 'application/ld+json');
      document.head.appendChild(schemaElement);
    }

    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Identra',
      url: metadata.siteUrl,
      logo: metadata.logoUrl,
      description: seo.organizationDescription,
    };
    const pageSchema = {
      '@context': 'https://schema.org',
      '@type': metadata.isBlogDetail ? 'BlogPosting' : 'WebPage',
      name: metadata.title,
      headline: metadata.headline,
      description: metadata.description,
      url: pageUrl,
      image: metadata.imageUrl,
      inLanguage: metadata.localeMeta.htmlLang,
      isPartOf: {
        '@type': 'WebSite',
        name: 'Identra',
        url: metadata.siteUrl,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Identra',
        logo: {
          '@type': 'ImageObject',
          url: metadata.logoUrl,
        },
      },
      mainEntityOfPage: pageUrl,
      ...(metadata.isBlogDetail
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

    schemaElement.textContent = JSON.stringify([
      organizationSchema,
      pageSchema,
    ]);
  }, [metadata, seo.imageAlt, seo.organizationDescription]);

  return null;
}
