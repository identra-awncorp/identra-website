import assert from 'node:assert/strict';
import test from 'node:test';

import {
  getStructuredBlogIndustries,
  getStructuredBlogTopics,
  STRUCTURED_BLOG_ARTICLES,
} from '../src/content/blog/structuredBlogArticles.ts';
import { BLOG_PAGE_TRANSLATIONS } from '../src/translations/BlogPageTranslations.ts';
import { SUPPORTED_LOCALES } from '../src/types/routes.ts';

test('blog filter tags are derived from tags assigned to real articles', () => {
  const articleTags = STRUCTURED_BLOG_ARTICLES.flatMap((article) => article.topics);
  const filterTags = getStructuredBlogTopics();

  assert.deepEqual(filterTags, [...new Set(articleTags)]);
  assert.equal(filterTags.every((tag) => tag.trim().length > 0), true);

  for (const filterTag of filterTags) {
    assert.equal(articleTags.includes(filterTag), true);

    for (const locale of SUPPORTED_LOCALES) {
      assert.equal(BLOG_PAGE_TRANSLATIONS[locale].topicLabels[filterTag].trim().length > 0, true);
    }
  }
});

test('blog industry filters are derived from industries assigned to real articles', () => {
  const articleIndustries = STRUCTURED_BLOG_ARTICLES.flatMap(
    (article) => article.industries,
  ).filter((industry) => industry !== 'all');
  const filterIndustries = getStructuredBlogIndustries();

  assert.deepEqual(filterIndustries, [...new Set(articleIndustries)]);
  assert.equal((filterIndustries as readonly string[]).includes('all'), false);

  for (const industry of filterIndustries) {
    assert.equal(articleIndustries.includes(industry), true);

    for (const locale of SUPPORTED_LOCALES) {
      assert.equal(BLOG_PAGE_TRANSLATIONS[locale].industryLabels[industry].trim().length > 0, true);
    }
  }
});

test('each article keeps multiple filter tags while exposing one primary card tag', () => {
  for (const article of STRUCTURED_BLOG_ARTICLES) {
    assert.equal(article.topics.length > 0, true);
    assert.equal(article.content.vi.tags.length > 0, true);
    assert.equal(article.listing.vi.type, article.content.vi.category);
    assert.equal(typeof article.listing.vi.type, 'string');
  }
});
