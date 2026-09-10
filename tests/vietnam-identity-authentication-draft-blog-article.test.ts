import assert from 'node:assert/strict';
import test from 'node:test';

import {
  VIETNAM_IDENTITY_AUTHENTICATION_DRAFT_BLOG_ARTICLE,
  VIETNAM_IDENTITY_AUTHENTICATION_DRAFT_BLOG_ARTICLE_ID,
} from '../src/content/blog/du-thao-moi-ve-dinh-danh-va-xac-thuc-co-hoi-nao-dang-mo-ra-cho-ssi-tai-viet-nam.ts';
import {
  getStructuredBlogArticle,
  STRUCTURED_BLOG_ARTICLES,
} from '../src/content/blog/structuredBlogArticles.ts';
import { SUPPORTED_LOCALES } from '../src/types/routes.ts';

const EXPECTED_TITLE =
  'Dự thảo mới về định danh và xác thực: Cơ hội nào đang mở ra cho SSI tại Việt Nam?';

test('Vietnam identity draft article exposes localized listing metadata and Vietnamese content', () => {
  const article = VIETNAM_IDENTITY_AUTHENTICATION_DRAFT_BLOG_ARTICLE;

  assert.equal(article.id, VIETNAM_IDENTITY_AUTHENTICATION_DRAFT_BLOG_ARTICLE_ID);
  assert.deepEqual(Object.keys(article.listing), [...SUPPORTED_LOCALES]);
  assert.deepEqual(article.contentLocales, ['vi']);
  assert.deepEqual(Object.keys(article.content), ['vi']);
  assert.equal(article.content.vi.title, EXPECTED_TITLE);
  assert.equal(article.listing.vi.title, EXPECTED_TITLE);
  assert.equal(getStructuredBlogArticle(article.id), article);
  assert.equal(STRUCTURED_BLOG_ARTICLES.includes(article), true);
});

test('Vietnam identity draft article keeps its body image-free and exposes optimized cover metadata', () => {
  const article = VIETNAM_IDENTITY_AUTHENTICATION_DRAFT_BLOG_ARTICLE;
  const { markdown } = article.content.vi;

  assert.equal(markdown.startsWith('---'), false);
  assert.equal(markdown.startsWith('# '), false);
  assert.equal(/^---$/m.test(markdown), false);
  assert.equal(markdown.includes('&#x20;'), false);
  assert.equal(markdown.includes('!['), false);
  assert.equal(Object.keys(article.images).length, 0);
  assert.equal(
    article.coverImage.src,
    `/blog/${article.id}/vietnam-ssi-infrastructure-cover-1440.webp`,
  );
  assert.equal(
    article.coverImage.srcSet.includes(
      `/blog/${article.id}/vietnam-ssi-infrastructure-cover-800.webp 800w`,
    ),
    true,
  );
  assert.equal(
    article.socialImage.src,
    `/blog/${article.id}/${article.id}-og.jpg`,
  );
  assert.equal(
    markdown.includes('dữ liệu không chỉ được chia sẻ, mà còn có thể được **xác minh và tin cậy ngay từ thiết kế**'),
    true,
  );
});

test('Vietnam identity draft article metadata matches all source sections', () => {
  const article = VIETNAM_IDENTITY_AUTHENTICATION_DRAFT_BLOG_ARTICLE;
  const content = article.content.vi;
  const markdownHeadings = content.markdown.match(/^## .+$/gm) ?? [];

  assert.equal(content.tableOfContents.length, 4);
  assert.equal(markdownHeadings.length, content.tableOfContents.length);
  assert.equal(content.readTimeMinutes, 11);
  assert.deepEqual(content.tags, [
    'Định danh số',
    'SSI tại Việt Nam',
    'DID',
    'Chính sách số',
    'Chuỗi khối quốc gia',
  ]);
  assert.deepEqual(article.relatedArticleIds, [
    'tuong-lai-cua-xac-thuc-va-truy-xuat-nguon-goc-san-pham',
    'giai-bai-toan-niem-tin-du-lieu-de-phat-trien-kinh-te-so-kinh-te-ai',
    'dinh-danh-tu-chu-ssi-la-gi',
  ]);
});
