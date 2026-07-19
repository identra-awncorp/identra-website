/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const DEFAULT_SITE_URL = 'https://identra.com';
export const PUBLIC_LOGO_PATH = '/identra-logo.svg';
export const PUBLIC_SOCIAL_IMAGE_PATH = '/social/identra-og.jpg';
export const SOCIAL_IMAGE_WIDTH = '1200';
export const SOCIAL_IMAGE_HEIGHT = '630';
export const BLOG_PUBLISHED_DATE = '2026-06-26';
export const BLOG_MODIFIED_DATE = '2026-06-26';

const truncateAtWordBoundary = (value: string, maxLength: number): string => {
  if (value.length <= maxLength) return value;

  const visibleLength = maxLength - 3;
  const candidate = value.slice(0, visibleLength).trimEnd();
  const lastSpace = candidate.lastIndexOf(' ');
  const truncated = lastSpace >= Math.floor(visibleLength * 0.6)
    ? candidate.slice(0, lastSpace)
    : candidate;

  return `${truncated}...`;
};

export const formatSeoTitle = (
  pageTitle: string,
  suffix?: string,
): string => truncateAtWordBoundary(
  suffix ? `${pageTitle} | ${suffix}` : pageTitle,
  60,
);

export const formatSeoDescription = (description: string): string =>
  truncateAtWordBoundary(description, 160);
