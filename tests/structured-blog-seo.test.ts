import assert from 'node:assert/strict';
import test from 'node:test';

import {
  getStructuredBlogSeoMetadata,
  STRUCTURED_BLOG_ARTICLES,
} from '../src/content/blog/structuredBlogArticles.ts';
import {
  getStructuredBlogSearchTerms,
  STRUCTURED_BLOG_SEO_PROFILES,
} from '../src/content/blog/structuredBlogSeoProfiles.ts';
import { PUBLIC_BLOG_DETAIL_IDS } from '../src/types/routes.ts';

const SSI_CONTENT_TITLE =
  'Định danh tự chủ (SSI) là gì? Từ giới hạn của định danh số hiện nay đến một mô hình mới';
const SSI_CONTENT_DESCRIPTION =
  'Vì sao các mô hình định danh số hiện nay còn nhiều giới hạn, định danh tự chủ ra đời để giải quyết điều gì và SSI vận hành như thế nào?';
const SSI_SEO_TITLE =
  'Self-Sovereign Identity (SSI) là gì? Định danh tự chủ';
const SSI_SEO_DESCRIPTION =
  'Tìm hiểu Self-Sovereign Identity (SSI), cách định danh tự chủ giúp người dùng nắm giữ, chia sẻ và xác minh danh tính số giữa nhiều dịch vụ.';

const EXPECTED_SEARCH_INTENTS = {
  'dinh-danh-tu-chu-ssi-la-gi': {
    primary: 'định danh tự chủ là gì',
    secondary: [
      'self sovereign identity là gì',
      'SSI là gì',
      'định danh phi tập trung là gì',
      'danh tính số tự chủ',
    ],
  },
  'ho-so-hoc-tap-suot-doi-loi-ich-cua-mo-hinh-dinh-danh-tu-chu-doi-voi-nguoi-hoc': {
    primary: 'hồ sơ học tập suốt đời',
    secondary: [
      'hồ sơ học tập số',
      'hồ sơ năng lực số',
      'learning passport là gì',
      'quản lý thành tích học tập',
    ],
  },
  'ssi-trong-giao-duc-giai-phap-so-hoa-bang-cap-va-xac-minh-nang-luc': {
    primary: 'xác minh bằng cấp trực tuyến',
    secondary: [
      'xác minh văn bằng chứng chỉ',
      'bằng cấp số là gì',
      'chống giả bằng cấp',
      'SSI trong giáo dục',
    ],
  },
  'tu-thi-diem-cua-mit-den-lan-song-so-hoa-bang-cap-khong-the-dao-nguoc': {
    primary: 'bằng tốt nghiệp số MIT',
    secondary: [
      'MIT digital diploma',
      'Blockcerts là gì',
      'bằng cấp blockchain',
      'bằng đại học điện tử',
    ],
  },
  'rao-can-phap-ly-trong-tuyen-dung-quoc-te-ssi-mo-duong-cho-nhan-su-remote-nhu-the-nao': {
    primary: 'tuyển dụng xuyên biên giới',
    secondary: [
      'xác minh ứng viên quốc tế',
      'xác minh nhân sự từ xa',
      'tuyển dụng remote quốc tế',
      'GDPR trong tuyển dụng',
    ],
  },
  'ssi-blockchain-va-tuong-lai-xuat-khau-hang-hoa-viet-nam-sang-eu': {
    primary: 'hộ chiếu số sản phẩm EU',
    secondary: [
      'Digital Product Passport là gì',
      'DPP EU',
      'dữ liệu sản phẩm xuất khẩu EU',
      'doanh nghiệp Việt Nam xuất khẩu sang EU',
    ],
  },
  'tuong-lai-cua-xac-thuc-va-truy-xuat-nguon-goc-san-pham': {
    primary: 'xác thực nguồn gốc sản phẩm',
    secondary: [
      'truy xuất nguồn gốc có thể kiểm chứng',
      'kiểm tra nguồn gốc hàng hóa',
      'QR truy xuất nguồn gốc',
      'chống giả sản phẩm',
    ],
  },
  'chau-au-dang-dan-dau-cuoc-chuyen-dich-sang-dinh-danh-tu-chu': {
    primary: 'EUDI Wallet là gì',
    secondary: [
      'ví định danh số châu Âu',
      'European Digital Identity Wallet',
      'định danh số EU',
      'EUDI Wallet hoạt động như thế nào',
    ],
  },
  'vuot-xa-super-app-ky-nguyen-ultra-app': {
    primary: 'AI Agent giao dịch như thế nào',
    secondary: [
      'AI Agent tự động giao dịch',
      'nền kinh tế Agent',
      'định danh cho AI Agent',
      'Ultra App là gì',
    ],
  },
  'giai-bai-toan-niem-tin-du-lieu-de-phat-trien-kinh-te-so-kinh-te-ai': {
    primary: 'niềm tin dữ liệu',
    secondary: [
      'dữ liệu đáng tin cậy cho AI',
      'hạ tầng tin cậy cho kinh tế số',
      'xác minh dữ liệu tự động',
      'SSI trong kinh tế AI',
    ],
  },
  'did-la-gi': {
    primary: 'DID là gì',
    secondary: [
      'Decentralized Identifier là gì',
      'định danh phi tập trung là gì',
      'DID Document là gì',
      'DID có phải blockchain không',
    ],
  },
  'vi-dinh-tin-la-gi': {
    primary: 'ví định tín là gì',
    secondary: [
      'ví định tín',
      'ví lưu trữ thực chứng',
      'ví định danh tự chủ',
      'ví thực chứng số',
    ],
  },
  'thuc-chung-la-gi': {
    primary: 'thực chứng là gì',
    secondary: [
      'thực chứng số',
      'dữ liệu có thể kiểm chứng',
      'xác minh nguồn gốc dữ liệu',
      'Verifiable Credential là gì',
    ],
  },
} as const;

test('search metadata stays separate from visible article content', () => {
  for (const article of STRUCTURED_BLOG_ARTICLES) {
    const content = article.content.vi;
    const contentRecord = content as unknown as Record<string, unknown>;
    const seoProfile = getStructuredBlogSeoMetadata(article);

    assert.equal('seoTitle' in contentRecord, false);
    assert.equal('seoDescription' in contentRecord, false);
    assert.equal(article.listing.vi.title, content.title);
    assert.notEqual(seoProfile.title, content.title);
    assert.notEqual(seoProfile.description, content.description);
  }
});

test('every public article owns one complete and distinct Vietnamese search intent', () => {
  assert.deepEqual(
    Object.keys(STRUCTURED_BLOG_SEO_PROFILES).sort(),
    [...PUBLIC_BLOG_DETAIL_IDS].sort(),
  );

  const primaryQueries = new Set<string>();

  for (const article of STRUCTURED_BLOG_ARTICLES) {
    const seoProfile = getStructuredBlogSeoMetadata(article);
    const expectedIntent = EXPECTED_SEARCH_INTENTS[article.id];
    const searchTerms = getStructuredBlogSearchTerms(seoProfile);

    assert.deepEqual(seoProfile.searchIntent, expectedIntent);
    assert.equal(searchTerms.length, 5);
    assert.equal(new Set(searchTerms.map((term) => term.toLocaleLowerCase())).size, 5);
    assert.equal(primaryQueries.has(seoProfile.searchIntent.primary.toLocaleLowerCase()), false);
    primaryQueries.add(seoProfile.searchIntent.primary.toLocaleLowerCase());
  }
});

test('SEO titles and descriptions are concise, natural summaries rather than keyword lists', () => {
  for (const article of STRUCTURED_BLOG_ARTICLES) {
    const seoProfile = getStructuredBlogSeoMetadata(article);
    const combinedMetadata = `${seoProfile.title} ${seoProfile.description}`.toLocaleLowerCase();
    const primarySubject = seoProfile.searchIntent.primary
      .replace(/\s+(là gì|như thế nào)$/iu, '')
      .toLocaleLowerCase();

    assert.ok(seoProfile.title.length >= 45 && seoProfile.title.length <= 70);
    assert.ok(seoProfile.description.length >= 120 && seoProfile.description.length <= 170);
    assert.ok(combinedMetadata.includes(primarySubject));
    assert.equal(seoProfile.title.includes(','), false);
    assert.equal(seoProfile.description.split(',').length <= 5, true);
  }
});

test('SSI keeps its visible academic copy while exposing clearer search metadata', () => {
  const article = STRUCTURED_BLOG_ARTICLES.find(
    ({ id }) => id === 'dinh-danh-tu-chu-ssi-la-gi',
  );

  assert.ok(article);
  assert.equal(article.content.vi.title, SSI_CONTENT_TITLE);
  assert.equal(article.content.vi.description, SSI_CONTENT_DESCRIPTION);
  assert.deepEqual(getStructuredBlogSeoMetadata(article), {
    title: SSI_SEO_TITLE,
    description: SSI_SEO_DESCRIPTION,
    searchIntent: EXPECTED_SEARCH_INTENTS['dinh-danh-tu-chu-ssi-la-gi'],
    entities: [
      'Self-Sovereign Identity',
      'Định danh tự chủ',
      'Định danh phi tập trung',
      'Verifiable Credentials',
    ],
  });
});

test('structured article images use consistent standalone captions', () => {
  for (const article of STRUCTURED_BLOG_ARTICLES) {
    const lines = article.content.vi.markdown.split(/\r?\n/);
    const imageLineIndexes = lines
      .map((line, index) => (line.startsWith('![') ? index : -1))
      .filter((index) => index >= 0);

    assert.equal(imageLineIndexes.length, Object.keys(article.images).length);

    imageLineIndexes.forEach((imageLineIndex, imageIndex) => {
      assert.equal(lines[imageLineIndex + 1], '');
      assert.match(
        lines[imageLineIndex + 2] ?? '',
        new RegExp(`^\\*Hình ${imageIndex + 1}\\. .+\\*$`),
      );
    });
  }
});
