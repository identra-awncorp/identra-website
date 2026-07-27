import assert from 'node:assert/strict';
import test from 'node:test';

import type { StructuredBlogArticle } from '../src/content/blog/structuredBlogArticleModel.ts';
import {
  getRelatedStructuredBlogArticles,
  getStructuredBlogArticle,
  STRUCTURED_BLOG_ARTICLES,
} from '../src/content/blog/structuredBlogArticles.ts';

test('every structured article declares three valid and unique related article IDs', () => {
  for (const article of STRUCTURED_BLOG_ARTICLES) {
    assert.equal(article.relatedArticleIds.length, 3);
    assert.equal(new Set(article.relatedArticleIds).size, 3);
    assert.equal(
      article.relatedArticleIds.some(
        (relatedArticleId) => relatedArticleId === article.id,
      ),
      false,
    );

    for (const relatedArticleId of article.relatedArticleIds) {
      assert.equal(typeof relatedArticleId, 'string');
      assert.notEqual(getStructuredBlogArticle(relatedArticleId), null);
    }
  }
});

test('related article resolver preserves curated order and returns canonical models', () => {
  for (const article of STRUCTURED_BLOG_ARTICLES) {
    const relatedArticles = getRelatedStructuredBlogArticles(article);

    assert.deepEqual(
      relatedArticles.map((relatedArticle) => relatedArticle.id),
      [...article.relatedArticleIds],
    );

    for (const relatedArticle of relatedArticles) {
      assert.equal(
        relatedArticle,
        getStructuredBlogArticle(relatedArticle.id),
      );
      assert.equal(
        relatedArticle.content.vi.title,
        getStructuredBlogArticle(relatedArticle.id)?.content.vi.title,
      );
      assert.equal(
        relatedArticle.content.vi.description,
        getStructuredBlogArticle(relatedArticle.id)?.content.vi.description,
      );
    }
  }
});

test('related article resolver safely ignores missing, duplicate, and self references', () => {
  const article = STRUCTURED_BLOG_ARTICLES[0];
  const invalidReferencesArticle: StructuredBlogArticle = {
    ...article,
    relatedArticleIds: [
      article.id,
      'blog-1',
      article.relatedArticleIds[0],
    ],
  };
  const duplicateReferencesArticle: StructuredBlogArticle = {
    ...article,
    relatedArticleIds: [
      article.relatedArticleIds[0],
      article.relatedArticleIds[0],
      article.relatedArticleIds[1],
    ],
  };

  assert.deepEqual(
    getRelatedStructuredBlogArticles(invalidReferencesArticle).map(
      (relatedArticle) => relatedArticle.id,
    ),
    [article.relatedArticleIds[0]],
  );
  assert.deepEqual(
    getRelatedStructuredBlogArticles(duplicateReferencesArticle).map(
      (relatedArticle) => relatedArticle.id,
    ),
    [article.relatedArticleIds[0], article.relatedArticleIds[1]],
  );
});
