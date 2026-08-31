import assert from 'node:assert/strict';
import test from 'node:test';

import type { StructuredBlogArticle } from '../src/content/blog/structuredBlogArticleModel.ts';
import {
  getRelatedStructuredBlogArticles,
  getStructuredBlogArticle,
  STRUCTURED_BLOG_ARTICLES,
  type StructuredBlogArticleId,
} from '../src/content/blog/structuredBlogArticles.ts';

const EXPECTED_RELATED_ARTICLES = {
  'tu-gdpr-den-ssi-vi-sao-chau-au-lai-muon-trao-quyen-kiem-soat-du-lieu-cho-nguoi-dung': [
    'chau-au-dang-dan-dau-cuoc-chuyen-dich-sang-dinh-danh-tu-chu',
    'dinh-danh-tu-chu-ssi-la-gi',
    'vi-dinh-tin-la-gi',
  ],
  'lua-dao-truc-tuyen-va-bai-toan-bao-ve-du-lieu-ca-nhan-trong-thoi-dai-so': [
    'ro-ri-du-lieu-tai-trung-quoc-va-an-do-bai-hoc-ve-an-ninh-du-lieu-va-cach-ssi-thay-doi-cach-chung-ta-bao-ve-thong-tin',
    'tiet-lo-co-chon-loc-la-gi',
    'dinh-danh-tu-chu-ssi-la-gi',
  ],
  'ro-ri-du-lieu-tai-trung-quoc-va-an-do-bai-hoc-ve-an-ninh-du-lieu-va-cach-ssi-thay-doi-cach-chung-ta-bao-ve-thong-tin': [
    'lua-dao-truc-tuyen-va-bai-toan-bao-ve-du-lieu-ca-nhan-trong-thoi-dai-so',
    'tiet-lo-co-chon-loc-la-gi',
    'dinh-danh-tu-chu-ssi-la-gi',
  ],
  'tiet-lo-co-chon-loc-la-gi': [
    'thuc-chung-la-gi',
    'ro-ri-du-lieu-tai-trung-quoc-va-an-do-bai-hoc-ve-an-ninh-du-lieu-va-cach-ssi-thay-doi-cach-chung-ta-bao-ve-thong-tin',
    'vi-dinh-tin-la-gi',
  ],
  'thuc-chung-la-gi': [
    'dinh-danh-tu-chu-ssi-la-gi',
    'did-la-gi',
    'tiet-lo-co-chon-loc-la-gi',
  ],
  'vi-dinh-tin-la-gi': [
    'thuc-chung-la-gi',
    'tiet-lo-co-chon-loc-la-gi',
    'dinh-danh-tu-chu-ssi-la-gi',
  ],
  'did-la-gi': [
    'dinh-danh-tu-chu-ssi-la-gi',
    'thuc-chung-la-gi',
    'vi-dinh-tin-la-gi',
  ],
  'giai-bai-toan-niem-tin-du-lieu-de-phat-trien-kinh-te-so-kinh-te-ai': [
    'vuot-xa-super-app-ky-nguyen-ultra-app',
    'dinh-danh-tu-chu-ssi-la-gi',
    'did-la-gi',
  ],
  'chau-au-dang-dan-dau-cuoc-chuyen-dich-sang-dinh-danh-tu-chu': [
    'tu-gdpr-den-ssi-vi-sao-chau-au-lai-muon-trao-quyen-kiem-soat-du-lieu-cho-nguoi-dung',
    'vi-dinh-tin-la-gi',
    'ssi-blockchain-va-tuong-lai-xuat-khau-hang-hoa-viet-nam-sang-eu',
  ],
  'ssi-blockchain-va-tuong-lai-xuat-khau-hang-hoa-viet-nam-sang-eu': [
    'tuong-lai-cua-xac-thuc-va-truy-xuat-nguon-goc-san-pham',
    'dinh-danh-tu-chu-ssi-la-gi',
    'chau-au-dang-dan-dau-cuoc-chuyen-dich-sang-dinh-danh-tu-chu',
  ],
  'vuot-xa-super-app-ky-nguyen-ultra-app': [
    'giai-bai-toan-niem-tin-du-lieu-de-phat-trien-kinh-te-so-kinh-te-ai',
    'dinh-danh-tu-chu-ssi-la-gi',
    'did-la-gi',
  ],
  'tuong-lai-cua-xac-thuc-va-truy-xuat-nguon-goc-san-pham': [
    'ssi-blockchain-va-tuong-lai-xuat-khau-hang-hoa-viet-nam-sang-eu',
    'thuc-chung-la-gi',
    'dinh-danh-tu-chu-ssi-la-gi',
  ],
  'rao-can-phap-ly-trong-tuyen-dung-quoc-te-ssi-mo-duong-cho-nhan-su-remote-nhu-the-nao': [
    'ssi-trong-giao-duc-giai-phap-so-hoa-bang-cap-va-xac-minh-nang-luc',
    'tu-thi-diem-cua-mit-den-lan-song-so-hoa-bang-cap-khong-the-dao-nguoc',
    'ho-so-hoc-tap-suot-doi-loi-ich-cua-mo-hinh-dinh-danh-tu-chu-doi-voi-nguoi-hoc',
  ],
  'tu-thi-diem-cua-mit-den-lan-song-so-hoa-bang-cap-khong-the-dao-nguoc': [
    'ssi-trong-giao-duc-giai-phap-so-hoa-bang-cap-va-xac-minh-nang-luc',
    'ho-so-hoc-tap-suot-doi-loi-ich-cua-mo-hinh-dinh-danh-tu-chu-doi-voi-nguoi-hoc',
    'rao-can-phap-ly-trong-tuyen-dung-quoc-te-ssi-mo-duong-cho-nhan-su-remote-nhu-the-nao',
  ],
  'ho-so-hoc-tap-suot-doi-loi-ich-cua-mo-hinh-dinh-danh-tu-chu-doi-voi-nguoi-hoc': [
    'ssi-trong-giao-duc-giai-phap-so-hoa-bang-cap-va-xac-minh-nang-luc',
    'tu-thi-diem-cua-mit-den-lan-song-so-hoa-bang-cap-khong-the-dao-nguoc',
    'rao-can-phap-ly-trong-tuyen-dung-quoc-te-ssi-mo-duong-cho-nhan-su-remote-nhu-the-nao',
  ],
  'ssi-trong-giao-duc-giai-phap-so-hoa-bang-cap-va-xac-minh-nang-luc': [
    'tu-thi-diem-cua-mit-den-lan-song-so-hoa-bang-cap-khong-the-dao-nguoc',
    'ho-so-hoc-tap-suot-doi-loi-ich-cua-mo-hinh-dinh-danh-tu-chu-doi-voi-nguoi-hoc',
    'rao-can-phap-ly-trong-tuyen-dung-quoc-te-ssi-mo-duong-cho-nhan-su-remote-nhu-the-nao',
  ],
  'dinh-danh-tu-chu-ssi-la-gi': [
    'did-la-gi',
    'thuc-chung-la-gi',
    'vi-dinh-tin-la-gi',
  ],
} as const satisfies Record<
  StructuredBlogArticleId,
  readonly [StructuredBlogArticleId, StructuredBlogArticleId, StructuredBlogArticleId]
>;

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

test('every structured article preserves its editorially curated related reading set', () => {
  assert.equal(Object.keys(EXPECTED_RELATED_ARTICLES).length, 17);

  for (const article of STRUCTURED_BLOG_ARTICLES) {
    assert.deepEqual(
      article.relatedArticleIds,
      EXPECTED_RELATED_ARTICLES[article.id],
    );
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
