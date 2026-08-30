/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Locale } from '../../types/routes';
import type {
  BlogArticleListingCopy,
  BlogArticleTableOfContentsItem,
  StructuredBlogArticle,
} from './structuredBlogArticleModel';

export const TRUST_WALLET_EXPLAINER_BLOG_ARTICLE_ID =
  'vi-dinh-tin-la-gi' as const;

const assetRoot = '/blog/vi-dinh-tin-la-gi';

export const TRUST_WALLET_EXPLAINER_BLOG_ARTICLE = {
  id: TRUST_WALLET_EXPLAINER_BLOG_ARTICLE_ID,
  slug: TRUST_WALLET_EXPLAINER_BLOG_ARTICLE_ID,
  publishedAt: '2026-08-30',
  modifiedAt: '2026-08-30',
  author: {
    type: 'Organization',
    name: 'Identra',
  },
  topics: ['identity', 'privacy', 'security'],
  industries: ['all'],
  contentLocales: ['vi'],
  relatedArticleIds: [
    'thuc-chung-la-gi',
    'tiet-lo-co-chon-loc-la-gi',
    'dinh-danh-tu-chu-ssi-la-gi',
  ],
  coverImage: {
    src: `${assetRoot}/trust-wallet-cover-1440.webp`,
    srcSet: [
      `${assetRoot}/trust-wallet-cover-800.webp 800w`,
      `${assetRoot}/trust-wallet-cover-1440.webp 1440w`,
    ].join(', '),
    sizes: '(min-width: 1024px) 680px, (min-width: 768px) 55vw, 100vw',
    width: 1440,
    height: 810,
  },
  socialImage: {
    src: `${assetRoot}/${TRUST_WALLET_EXPLAINER_BLOG_ARTICLE_ID}-og.jpg`,
    width: 1200,
    height: 630,
    type: 'image/jpeg',
  },
  listing: {
    en: {
      title: 'What Is a Digital Trust Wallet?',
      description: 'How a trust wallet lets people, organizations, devices and software receive, manage and present verifiable information across independent systems.',
      type: 'Foundations',
      duration: '6 min read',
    },
    es: {
      title: '¿Qué es una cartera de confianza digital?',
      description: 'Cómo una cartera permite que personas, organizaciones, dispositivos y software reciban, gestionen y presenten información verificable entre sistemas independientes.',
      type: 'Fundamentos',
      duration: '6 min de lectura',
    },
    ja: {
      title: 'デジタル・トラストウォレットとは？',
      description: '人、組織、デバイス、ソフトウェアが独立したシステム間で検証可能な情報を受け取り、管理し、提示する仕組みを解説します。',
      type: '基礎知識',
      duration: '読了6分',
    },
    de: {
      title: 'Was ist eine digitale Vertrauens-Wallet?',
      description: 'Wie Menschen, Organisationen, Geräte und Software überprüfbare Informationen über unabhängige Systeme hinweg empfangen, verwalten und vorlegen.',
      type: 'Grundlagen',
      duration: '6 Min. Lesezeit',
    },
    vi: {
      title: 'Ví định tín là gì?',
      description: 'Ví định tín giúp con người, tổ chức, thiết bị và phần mềm nhận, quản lý và sử dụng những thông tin có thể kiểm chứng giữa nhiều hệ thống.',
      type: 'Kiến thức nền tảng',
      duration: 'Đọc trong 6 phút',
    },
  } satisfies Record<Locale, BlogArticleListingCopy>,
  images: {},
  content: {
    vi: {
      title: 'Ví định tín là gì?',
      description: 'Ví định tín giúp con người, tổ chức, thiết bị và phần mềm nhận, quản lý và sử dụng những thông tin có thể kiểm chứng giữa nhiều hệ thống.',
      excerpt: 'Ví định tín trao cho chủ thể một công cụ để mang theo, kiểm chứng và tái sử dụng danh tính, thuộc tính, vai trò cùng quyền hạn trong thế giới số.',
      category: 'Kiến thức nền tảng',
      tags: ['Ví định tín', 'Thực chứng', 'Định danh tự chủ', 'Tiết lộ có chọn lọc'],
      readTimeMinutes: 6,
      ui: {
        publishedLabel: 'Xuất bản ngày',
        authorRole: 'Đội ngũ nội dung Identra',
        tableOfContents: 'Mục lục',
        openTableOfContents: 'Mở mục lục bài viết',
        closeTableOfContents: 'Đóng mục lục bài viết',
        ctaTitle: 'Trao quyền kiểm soát thông tin cho từng chủ thể',
        ctaDescription: 'Khám phá cách Identra giúp tổ chức phát hành, lưu giữ và kiểm tra thực chứng giữa nhiều hệ thống với mức tiết lộ dữ liệu phù hợp.',
        ctaButtonLabel: 'Trải nghiệm demo',
      },
      tableOfContents: [
        {
          id: 'vi-dinh-tin-la-gi',
          label: 'Ví định tín là gì?',
          level: 2,
        },
        {
          id: 'khong-chi-la-noi-luu-giay-to-dien-tu',
          label: 'Không chỉ là nơi lưu giấy tờ điện tử',
          level: 2,
        },
        {
          id: 'tu-hay-gui-du-lieu-cho-toi-sang-hay-chung-minh-dieu-toi-can-biet',
          label: 'Từ “hãy gửi dữ liệu cho tôi” sang “hãy chứng minh điều tôi cần biết”',
          level: 2,
        },
        {
          id: 'vi-dinh-tin-khong-chi-danh-cho-con-nguoi',
          label: 'Ví định tín không chỉ dành cho con người',
          level: 2,
        },
        {
          id: 'ma-dinh-danh-phi-tap-trung-thuc-chung-va-vi-dinh-tin',
          label: 'Mã định danh phi tập trung, thực chứng và ví định tín',
          level: 2,
        },
        {
          id: 'mot-thay-doi-ve-cach-du-lieu-di-chuyen-tren-internet',
          label: 'Một thay đổi về cách dữ liệu di chuyển trên Internet',
          level: 2,
        },
        {
          id: 'chiec-vi-cho-mot-the-gioi-so-co-the-kiem-chung',
          label: 'Chiếc ví cho một thế giới số có thể kiểm chứng',
          level: 2,
        },
      ] satisfies BlogArticleTableOfContentsItem[],
      markdown: `Trong đời sống hàng ngày, chiếc ví không chỉ dùng để đựng tiền. Nó còn có thể chứa bằng lái xe, thẻ nhân viên, thẻ sinh viên, thẻ thành viên hay nhiều loại giấy tờ khác giúp chúng ta chứng minh một điều gì đó về bản thân.

Trong thế giới số, những thông tin tương tự lại thường nằm rải rác trong nhiều hệ thống khác nhau.

Bằng cấp nằm trong cơ sở dữ liệu của trường đại học. Thông tin việc làm nằm trong hệ thống của doanh nghiệp. Giấy phép nằm trong hệ thống của cơ quan cấp phép. Quyền truy cập lại nằm ở một nền tảng khác.

Mỗi khi cần sử dụng một thông tin nào đó, chúng ta thường phải cung cấp lại từ đầu, tải lên bản scan, gửi tài liệu hoặc chờ một bên khác xác minh.

**Ví định tín được tạo ra để thay đổi cách những thông tin này được quản lý và sử dụng.**

## Ví định tín là gì?

Hiểu đơn giản, ví định tín là một phần mềm giúp một chủ thể **nhận, lưu giữ, quản lý và sử dụng những thông tin có thể kiểm chứng trong môi trường số**.

Chủ thể ở đây không nhất thiết phải là một con người.

Đó có thể là một cá nhân, một doanh nghiệp, một trường đại học, một thiết bị, một phương tiện, một phần mềm hoặc thậm chí một tác nhân trí tuệ nhân tạo.

Đây cũng là lý do khái niệm này không nên bị thu hẹp thành một loại “ví định danh”.

Ví định tín không chỉ dùng để chứng minh **một chủ thể là ai**, mà còn có thể giúp chứng minh:

- chủ thể đó có thuộc tính gì;
- đang giữ vai trò nào;
- được tổ chức nào công nhận;
- có quyền thực hiện hành động gì;
- đang sở hữu giấy phép hoặc chứng nhận nào;
- đã được ai ủy quyền.

Nói cách khác, chiếc ví không chỉ mang theo danh tính, mà còn mang theo những **bằng chứng giúp thiết lập niềm tin** trong các tương tác số.

## Không chỉ là nơi lưu giấy tờ điện tử

Một ứng dụng chứa ảnh căn cước, file PDF bằng đại học hay bản scan giấy phép chưa đủ để trở thành ví định tín.

Khác biệt quan trọng nằm ở khả năng **kiểm chứng**.

Giả sử một trường đại học cấp bằng tốt nghiệp điện tử cho sinh viên.

Thay vì sinh viên nhận một file PDF rồi gửi file đó cho nhà tuyển dụng, trường có thể phát hành một **thực chứng** vào ví định tín của sinh viên.

Thực chứng này mang thông tin cần thiết để một bên khác có thể kiểm tra rằng:

- nó thực sự do trường đại học đó phát hành;
- nội dung không bị thay đổi;
- thực chứng còn hiệu lực;
- người đang sử dụng nó có quyền sử dụng nó.

Khi sinh viên ứng tuyển, nhà tuyển dụng có thể yêu cầu bằng chứng về trình độ học vấn. Sinh viên đồng ý chia sẻ từ ví và hệ thống tự thực hiện quá trình kiểm tra.

Một quy trình trước đây có thể cần bản scan, email và xác nhận thủ công giờ có thể diễn ra trực tiếp giữa các bên.

## Từ “hãy gửi dữ liệu cho tôi” sang “hãy chứng minh điều tôi cần biết”

Đây có lẽ là thay đổi quan trọng nhất mà ví định tín mang lại.

Phần lớn dịch vụ số hiện nay vận hành theo mô hình:

**“Hãy cung cấp dữ liệu của bạn cho tôi để tôi lưu lại và tự xác minh.”**

Ví định tín cho phép tiến tới một mô hình khác:

**“Hãy chứng minh cho tôi điều tôi cần biết.”**

Ví dụ, một dịch vụ chỉ cần biết người dùng đã đủ 18 tuổi.

Theo cách thông thường, người dùng có thể phải cung cấp họ tên, ngày sinh, số giấy tờ và thậm chí ảnh chụp giấy tờ.

Nhưng nếu đã có một thực chứng phù hợp, về nguyên tắc người dùng có thể chỉ cần chứng minh:

**“Tôi đã đủ 18 tuổi.”**

Dịch vụ không nhất thiết phải nhận thêm những dữ liệu mà họ không thực sự cần.

Đây chính là nền tảng cho khả năng **tiết lộ có chọn lọc**, nơi chủ thể chỉ cung cấp lượng thông tin vừa đủ cho một giao dịch.

## Ví định tín không chỉ dành cho con người

Hãy lấy một ví dụ khác.

Một doanh nghiệp có thể có trong ví của mình giấy phép kinh doanh, chứng nhận tiêu chuẩn, tư cách thành viên trong một mạng lưới và quyền ký kết của những người đại diện.

Một thiết bị công nghiệp có thể mang theo chứng nhận của nhà sản xuất, kết quả kiểm định hoặc quyền được phép kết nối vào một hệ thống.

Một tác nhân trí tuệ nhân tạo trong tương lai có thể cần chứng minh nó thuộc về tổ chức nào, được ai ủy quyền và được phép thực hiện những loại giao dịch nào.

Trong tất cả những trường hợp này, câu hỏi không còn đơn giản là:

**“Bạn là ai?”**

Mà thường quan trọng hơn là:

**“Bạn có quyền gì, có thuộc tính gì và tôi dựa vào đâu để tin điều đó?”**

Đó chính là phạm vi mà ví định tín hướng tới.

## Mã định danh phi tập trung, thực chứng và ví định tín

Ví định tín không hoạt động độc lập.

Trong một hệ thống định danh tự chủ, nó thường kết nối nhiều thành phần với nhau.

**Mã định danh phi tập trung** giúp một chủ thể có một mã định danh mà các hệ thống khác có thể nhận biết và xác minh quyền kiểm soát.

**Thực chứng** mang những thông tin đã được một bên khác xác nhận, chẳng hạn bằng cấp, giấy phép, vai trò hoặc quyền hạn.

**Ví định tín** là công cụ giúp chủ thể quản lý và sử dụng những thứ đó khi tương tác với các hệ thống khác.

Có thể hình dung rất đơn giản:

**Bên phát hành → Ví định tín → Bên xác minh**

Trường đại học phát hành bằng. Sinh viên giữ bằng trong ví. Nhà tuyển dụng xác minh bằng khi cần.

Nhưng cùng một mô hình có thể áp dụng cho vô số lĩnh vực khác như tài chính, y tế, giáo dục, tuyển dụng, thương mại, chuỗi cung ứng hay dịch vụ công.

## Một thay đổi về cách dữ liệu di chuyển trên Internet

Trong mô hình hiện tại, dữ liệu thường nằm trong các kho riêng biệt của từng tổ chức.

Mỗi hệ thống tự thu thập, lưu trữ và xác minh lại thông tin của người dùng.

Ví định tín tạo ra một hướng tiếp cận khác: thông tin đã được một bên có thẩm quyền xác nhận có thể được **trao trực tiếp cho chủ thể**, sau đó chủ thể mang nó sang những nơi khác để sử dụng.

Nhờ đó, người dùng không còn chỉ là một bản ghi nằm trong cơ sở dữ liệu của từng doanh nghiệp.

Họ trở thành một bên chủ động trong dòng chảy dữ liệu.

Điều này không có nghĩa mọi dữ liệu đều phải được đưa vào ví hay mọi hệ thống hiện tại đều phải bị thay thế.

Giá trị của ví định tín nằm ở việc tạo thêm một cách để dữ liệu có thể được **mang theo, kiểm chứng và tái sử dụng** mà không phải bắt đầu lại quá trình xác minh ở mỗi dịch vụ.

## Chiếc ví cho một thế giới số có thể kiểm chứng

Nếu ví điện tử giúp chúng ta quản lý tiền, thì ví định tín hướng tới một phạm vi rộng hơn: quản lý những gì thế giới số có thể kiểm chứng về một chủ thể.

Đó có thể là danh tính, bằng cấp, giấy phép, tư cách, quyền hạn, chứng nhận hoặc sự ủy quyền.

Vì vậy, giá trị thực sự của ví định tín không nằm ở việc nó chứa bao nhiêu loại giấy tờ.

Nó nằm ở khả năng giúp các chủ thể mang những bằng chứng đáng tin cậy đi qua nhiều hệ thống khác nhau và sử dụng chúng khi cần.

Trong một nền kinh tế ngày càng có nhiều giao dịch được thực hiện giữa con người, doanh nghiệp, thiết bị và phần mềm tự động, khả năng **chứng minh một điều gì đó mà không phải bắt đầu lại quá trình xác minh từ đầu** có thể trở thành một lớp hạ tầng quan trọng của thế giới số.`,
    },
  },
} as const satisfies StructuredBlogArticle;
