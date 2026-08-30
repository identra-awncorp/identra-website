/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  PUBLIC_BLOG_DETAIL_IDS,
  type BlogDetailId,
} from '../../types/routes';

export interface StructuredBlogSearchIntent {
  /** The natural-language query that best matches the article's main purpose. */
  primary: string;
  /** Closely related ways a Vietnamese reader may search for the same subject. */
  secondary: readonly [string, string, string, string];
}

export interface StructuredBlogSeoProfile {
  /** Search-only title. The visible article heading remains unchanged. */
  title: string;
  /** Search-only summary. The visible article description remains unchanged. */
  description: string;
  searchIntent: StructuredBlogSearchIntent;
  /** Named subjects used in BlogPosting structured data. */
  entities: readonly [string, string, string, string];
}

type PublicBlogDetailId = (typeof PUBLIC_BLOG_DETAIL_IDS)[number];

export const STRUCTURED_BLOG_SEO_PROFILES = {
  'dinh-danh-tu-chu-ssi-la-gi': {
    title: 'Self-Sovereign Identity (SSI) là gì? Định danh tự chủ',
    description: 'Tìm hiểu Self-Sovereign Identity (SSI), cách định danh tự chủ giúp người dùng nắm giữ, chia sẻ và xác minh danh tính số giữa nhiều dịch vụ.',
    searchIntent: {
      primary: 'định danh tự chủ là gì',
      secondary: [
        'self sovereign identity là gì',
        'SSI là gì',
        'định danh phi tập trung là gì',
        'danh tính số tự chủ',
      ],
    },
    entities: [
      'Self-Sovereign Identity',
      'Định danh tự chủ',
      'Định danh phi tập trung',
      'Verifiable Credentials',
    ],
  },
  'ho-so-hoc-tap-suot-doi-loi-ich-cua-mo-hinh-dinh-danh-tu-chu-doi-voi-nguoi-hoc': {
    title: 'Hồ sơ học tập suốt đời là gì? Lợi ích dành cho người học',
    description: 'Tìm hiểu cách hồ sơ học tập suốt đời giúp người học nắm giữ, kết hợp và chia sẻ thành tích đã được xác minh trong hành trình học tập, nghề nghiệp.',
    searchIntent: {
      primary: 'hồ sơ học tập suốt đời',
      secondary: [
        'hồ sơ học tập số',
        'hồ sơ năng lực số',
        'learning passport là gì',
        'quản lý thành tích học tập',
      ],
    },
    entities: [
      'Hồ sơ học tập suốt đời',
      'Hồ sơ học tập số',
      'Learning Passport',
      'Thực chứng giáo dục',
    ],
  },
  'ssi-trong-giao-duc-giai-phap-so-hoa-bang-cap-va-xac-minh-nang-luc': {
    title: 'Xác minh bằng cấp trực tuyến: Vai trò của SSI trong giáo dục',
    description: 'SSI giúp trường học phát hành bằng cấp số có thể kiểm chứng, để người học chủ động chia sẻ và nhà tuyển dụng xác minh văn bằng trực tuyến, giảm gian lận.',
    searchIntent: {
      primary: 'xác minh bằng cấp trực tuyến',
      secondary: [
        'xác minh văn bằng chứng chỉ',
        'bằng cấp số là gì',
        'chống giả bằng cấp',
        'SSI trong giáo dục',
      ],
    },
    entities: [
      'Xác minh bằng cấp',
      'Bằng cấp số',
      'Self-Sovereign Identity',
      'Thực chứng giáo dục',
    ],
  },
  'tu-thi-diem-cua-mit-den-lan-song-so-hoa-bang-cap-khong-the-dao-nguoc': {
    title: 'Bằng tốt nghiệp số MIT: Từ Blockcerts đến tiêu chuẩn mở',
    description: 'Tìm hiểu thí điểm bằng tốt nghiệp số của MIT năm 2017, vai trò của Blockcerts và hành trình từ blockchain đến thực chứng giáo dục có thể liên thông.',
    searchIntent: {
      primary: 'bằng tốt nghiệp số MIT',
      secondary: [
        'MIT digital diploma',
        'Blockcerts là gì',
        'bằng cấp blockchain',
        'bằng đại học điện tử',
      ],
    },
    entities: [
      'MIT Digital Diploma',
      'Blockcerts',
      'Bằng tốt nghiệp số',
      'Thực chứng giáo dục',
    ],
  },
  'rao-can-phap-ly-trong-tuyen-dung-quoc-te-ssi-mo-duong-cho-nhan-su-remote-nhu-the-nao': {
    title: 'Tuyển dụng xuyên biên giới: Xác minh ứng viên bằng SSI',
    description: 'SSI giúp doanh nghiệp xác minh danh tính, bằng cấp, kinh nghiệm và lý lịch của ứng viên quốc tế, đồng thời giảm dữ liệu phải chia sẻ khi tuyển dụng từ xa.',
    searchIntent: {
      primary: 'tuyển dụng xuyên biên giới',
      secondary: [
        'xác minh ứng viên quốc tế',
        'xác minh nhân sự từ xa',
        'tuyển dụng remote quốc tế',
        'GDPR trong tuyển dụng',
      ],
    },
    entities: [
      'Tuyển dụng xuyên biên giới',
      'Xác minh ứng viên',
      'Nhân sự từ xa',
      'GDPR',
    ],
  },
  'ssi-blockchain-va-tuong-lai-xuat-khau-hang-hoa-viet-nam-sang-eu': {
    title: 'Hộ chiếu số sản phẩm EU: Doanh nghiệp Việt Nam cần chuẩn bị gì?',
    description: 'Tìm hiểu Digital Product Passport của EU, xu hướng dữ liệu sản phẩm có thể kiểm chứng và những năng lực doanh nghiệp Việt Nam cần chuẩn bị khi xuất khẩu sang châu Âu.',
    searchIntent: {
      primary: 'hộ chiếu số sản phẩm EU',
      secondary: [
        'Digital Product Passport là gì',
        'DPP EU',
        'dữ liệu sản phẩm xuất khẩu EU',
        'doanh nghiệp Việt Nam xuất khẩu sang EU',
      ],
    },
    entities: [
      'Digital Product Passport',
      'Hộ chiếu số sản phẩm',
      'Xuất khẩu Việt Nam sang EU',
      'Dữ liệu sản phẩm',
    ],
  },
  'tuong-lai-cua-xac-thuc-va-truy-xuat-nguon-goc-san-pham': {
    title: 'Xác thực nguồn gốc sản phẩm và chuỗi cung ứng có thể kiểm chứng',
    description: 'Khám phá cách thực chứng giúp kiểm tra ai đã công bố dữ liệu, dữ liệu có toàn vẹn và chứng nhận còn hiệu lực hay không trong truy xuất nguồn gốc sản phẩm.',
    searchIntent: {
      primary: 'xác thực nguồn gốc sản phẩm',
      secondary: [
        'truy xuất nguồn gốc có thể kiểm chứng',
        'kiểm tra nguồn gốc hàng hóa',
        'QR truy xuất nguồn gốc',
        'chống giả sản phẩm',
      ],
    },
    entities: [
      'Xác thực nguồn gốc sản phẩm',
      'Truy xuất nguồn gốc',
      'Chuỗi cung ứng',
      'Verifiable Credentials',
    ],
  },
  'chau-au-dang-dan-dau-cuoc-chuyen-dich-sang-dinh-danh-tu-chu': {
    title: 'EUDI Wallet là gì? Ví định danh số của Liên minh châu Âu',
    description: 'EUDI Wallet giúp công dân, cư dân và doanh nghiệp lưu giữ, sử dụng thông tin định danh, bằng cấp cùng giấy phép số trong khuôn khổ chung của Liên minh châu Âu.',
    searchIntent: {
      primary: 'EUDI Wallet là gì',
      secondary: [
        'ví định danh số châu Âu',
        'European Digital Identity Wallet',
        'định danh số EU',
        'EUDI Wallet hoạt động như thế nào',
      ],
    },
    entities: [
      'EUDI Wallet',
      'European Digital Identity Wallet',
      'Định danh số châu Âu',
      'Liên minh châu Âu',
    ],
  },
  'vuot-xa-super-app-ky-nguyen-ultra-app': {
    title: 'AI Agent giao dịch như thế nào? Từ Super App đến Ultra App',
    description: 'Tìm hiểu cách AI Agent xác minh đối tác, phối hợp dịch vụ, thực hiện giao dịch và thanh toán trong mô hình Ultra App với SSI, blockchain và hợp đồng thông minh.',
    searchIntent: {
      primary: 'AI Agent giao dịch như thế nào',
      secondary: [
        'AI Agent tự động giao dịch',
        'nền kinh tế Agent',
        'định danh cho AI Agent',
        'Ultra App là gì',
      ],
    },
    entities: [
      'AI Agent',
      'Ultra App',
      'Nền kinh tế Agent',
      'Hợp đồng thông minh',
    ],
  },
  'giai-bai-toan-niem-tin-du-lieu-de-phat-trien-kinh-te-so-kinh-te-ai': {
    title: 'Niềm tin dữ liệu: Hạ tầng cho kinh tế số và kinh tế AI',
    description: 'Tìm hiểu vì sao niềm tin dữ liệu là điều kiện để con người và AI Agent kiểm chứng nguồn gốc, tính toàn vẹn và hiệu lực của thông tin trước khi ra quyết định.',
    searchIntent: {
      primary: 'niềm tin dữ liệu',
      secondary: [
        'dữ liệu đáng tin cậy cho AI',
        'hạ tầng tin cậy cho kinh tế số',
        'xác minh dữ liệu tự động',
        'SSI trong kinh tế AI',
      ],
    },
    entities: [
      'Niềm tin dữ liệu',
      'Kinh tế số',
      'Kinh tế AI',
      'AI Agent',
    ],
  },
  'did-la-gi': {
    title: 'DID là gì? Cách định danh phi tập trung hoạt động',
    description: 'Tìm hiểu DID là gì, cách định danh phi tập trung chứng minh quyền kiểm soát bằng mật mã và hỗ trợ con người, tổ chức cùng phần mềm xác minh lẫn nhau.',
    searchIntent: {
      primary: 'DID là gì',
      secondary: [
        'Decentralized Identifier là gì',
        'định danh phi tập trung là gì',
        'DID Document là gì',
        'DID có phải blockchain không',
      ],
    },
    entities: [
      'Decentralized Identifier',
      'DID Document',
      'Định danh phi tập trung',
      'Self-Sovereign Identity',
    ],
  },
  'vi-dinh-tin-la-gi': {
    title: 'Ví định tín là gì? Cách quản lý thực chứng số',
    description: 'Tìm hiểu ví định tín là gì, cách chủ thể nhận, quản lý và sử dụng thực chứng để chứng minh danh tính, thuộc tính và quyền hạn giữa nhiều hệ thống.',
    searchIntent: {
      primary: 'ví định tín là gì',
      secondary: [
        'ví định tín',
        'ví lưu trữ thực chứng',
        'ví định danh tự chủ',
        'ví thực chứng số',
      ],
    },
    entities: [
      'Ví định tín',
      'Thực chứng',
      'Mã định danh phi tập trung',
      'Định danh tự chủ',
    ],
  },
  'thuc-chung-la-gi': {
    title: 'Thực chứng là gì? Dữ liệu số đáng tin cậy và có thể kiểm chứng',
    description: 'Tìm hiểu thực chứng là gì và cách mật mã giúp phần mềm kiểm tra nguồn phát hành, tính toàn vẹn cùng trạng thái hiệu lực của dữ liệu số.',
    searchIntent: {
      primary: 'thực chứng là gì',
      secondary: [
        'thực chứng số',
        'dữ liệu có thể kiểm chứng',
        'xác minh nguồn gốc dữ liệu',
        'Verifiable Credential là gì',
      ],
    },
    entities: [
      'Thực chứng',
      'Dữ liệu có thể kiểm chứng',
      'Nguồn gốc dữ liệu',
      'Tiết lộ có chọn lọc',
    ],
  },
} as const satisfies Record<PublicBlogDetailId, StructuredBlogSeoProfile>;

export const getStructuredBlogSeoProfile = (
  id: BlogDetailId,
): StructuredBlogSeoProfile | null =>
  STRUCTURED_BLOG_SEO_PROFILES[
    id as keyof typeof STRUCTURED_BLOG_SEO_PROFILES
  ] ?? null;

export const getStructuredBlogSearchTerms = (
  profile: StructuredBlogSeoProfile,
): readonly string[] => [
  profile.searchIntent.primary,
  ...profile.searchIntent.secondary,
];
