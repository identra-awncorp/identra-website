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

export const DID_EXPLAINER_BLOG_ARTICLE_ID = 'did-la-gi' as const;

const assetRoot = '/blog/did-la-gi';

export const DID_EXPLAINER_BLOG_ARTICLE = {
  id: DID_EXPLAINER_BLOG_ARTICLE_ID,
  slug: DID_EXPLAINER_BLOG_ARTICLE_ID,
  publishedAt: '2026-08-30',
  modifiedAt: '2026-08-30',
  author: {
    type: 'Organization',
    name: 'Identra',
  },
  topics: ['identity', 'security', 'privacy'],
  industries: ['all'],
  contentLocales: ['vi'],
  relatedArticleIds: [
    'vi-dinh-tin-la-gi',
    'dinh-danh-tu-chu-ssi-la-gi',
    'giai-bai-toan-niem-tin-du-lieu-de-phat-trien-kinh-te-so-kinh-te-ai',
  ],
  coverImage: {
    src: `${assetRoot}/decentralized-identifier-cover-1440.webp`,
    srcSet: [
      `${assetRoot}/decentralized-identifier-cover-800.webp 800w`,
      `${assetRoot}/decentralized-identifier-cover-1440.webp 1440w`,
    ].join(', '),
    sizes: '(min-width: 1024px) 680px, (min-width: 768px) 55vw, 100vw',
    width: 1440,
    height: 810,
  },
  socialImage: {
    src: `${assetRoot}/${DID_EXPLAINER_BLOG_ARTICLE_ID}-og.jpg`,
    width: 1200,
    height: 630,
    type: 'image/jpeg',
  },
  listing: {
    en: {
      title: 'What Is a DID? A New Way to Build Identity on the Internet',
      description: 'How decentralized identifiers let people, organizations, devices and software prove control of an identity across independent systems.',
      type: 'Foundations',
      duration: '7 min read',
    },
    es: {
      title: '¿Qué es un DID? Una nueva forma de construir la identidad en Internet',
      description: 'Cómo los identificadores descentralizados permiten que personas, organizaciones, dispositivos y software demuestren el control de una identidad entre sistemas independientes.',
      type: 'Fundamentos',
      duration: '7 min de lectura',
    },
    ja: {
      title: 'DIDとは？インターネット上のアイデンティティを構築する新しい方法',
      description: '分散型識別子によって、人、組織、デバイス、ソフトウェアが独立したシステム間でアイデンティティの制御を証明する仕組みを解説します。',
      type: '基礎知識',
      duration: '読了7分',
    },
    de: {
      title: 'Was ist eine DID? Eine neue Form der Identität im Internet',
      description: 'Wie dezentrale Identifikatoren Menschen, Organisationen, Geräten und Software ermöglichen, die Kontrolle einer Identität systemübergreifend nachzuweisen.',
      type: 'Grundlagen',
      duration: '7 Min. Lesezeit',
    },
    vi: {
      title: 'DID là gì? Một cách mới để xây dựng định danh trên Internet',
      description: 'DID cho phép con người, tổ chức, thiết bị và phần mềm sở hữu một định danh có thể được nhiều hệ thống độc lập nhận biết và xác minh.',
      type: 'Kiến thức nền tảng',
      duration: 'Đọc trong 7 phút',
    },
  } satisfies Record<Locale, BlogArticleListingCopy>,
  images: {},
  content: {
    vi: {
      title: 'DID là gì? Một cách mới để xây dựng định danh trên Internet',
      description: 'DID cho phép con người, tổ chức, thiết bị và phần mềm sở hữu một định danh có thể được nhiều hệ thống độc lập nhận biết và xác minh.',
      excerpt: 'DID thay đổi cách một chủ thể kiểm soát định danh và chứng minh quyền kiểm soát đó mà không phụ thuộc hoàn toàn vào một nhà cung cấp tài khoản.',
      category: 'Kiến thức nền tảng',
      tags: ['DID', 'Định danh phi tập trung', 'Định danh số', 'SSI'],
      readTimeMinutes: 7,
      ui: {
        publishedLabel: 'Xuất bản ngày',
        authorRole: 'Đội ngũ nội dung Identra',
        tableOfContents: 'Mục lục',
        openTableOfContents: 'Mở mục lục bài viết',
        closeTableOfContents: 'Đóng mục lục bài viết',
        ctaTitle: 'Xây dựng định danh có thể kiểm chứng giữa nhiều hệ thống',
        ctaDescription: 'Khám phá cách Identra giúp tổ chức sử dụng DID và thực chứng để xác minh danh tính, dữ liệu và quyền hạn giữa các hệ thống độc lập.',
        ctaButtonLabel: 'Trải nghiệm demo',
      },
      tableOfContents: [
        {
          id: 'did-khong-don-gian-chi-la-mot-id-moi',
          label: 'DID không đơn giản chỉ là một ID mới',
          level: 2,
        },
        {
          id: 'nhung-lam-sao-biet-ai-thuc-su-kiem-soat-did-do',
          label: 'Nhưng làm sao biết ai thực sự kiểm soát DID đó?',
          level: 2,
        },
        {
          id: 'did-khong-cho-biet-ban-la-ai',
          label: 'DID không cho biết bạn là ai',
          level: 2,
        },
        {
          id: 'gia-tri-cua-did-nam-o-kha-nang-lien-thong',
          label: 'Giá trị của DID nằm ở khả năng liên thông',
          level: 2,
        },
        {
          id: 'did-co-phai-la-blockchain-khong',
          label: 'DID có phải là blockchain không?',
          level: 2,
        },
        {
          id: 'tu-dinh-danh-so-den-ha-tang-niem-tin',
          label: 'Từ định danh số đến hạ tầng niềm tin',
          level: 2,
        },
      ] satisfies BlogArticleTableOfContentsItem[],
      markdown: `Internet hiện nay được xây dựng chủ yếu quanh các tài khoản.

Muốn sử dụng một dịch vụ, chúng ta tạo tài khoản. Muốn sử dụng một dịch vụ khác, chúng ta lại tạo thêm một tài khoản mới. Google có một danh tính của bạn, ngân hàng có một danh tính khác, trường đại học có một hồ sơ khác, sàn thương mại điện tử lại có một hồ sơ khác nữa.

Về mặt kỹ thuật, cách làm này rất hiệu quả. Mỗi tổ chức tự quản lý người dùng của mình, tự lưu dữ liệu và tự quyết định cách xác thực. Nhưng khi số lượng dịch vụ số tăng lên, hạn chế của mô hình này bắt đầu trở nên rõ ràng: danh tính của một người bị chia nhỏ giữa hàng chục hệ thống không liên thông với nhau.

Một ngân hàng không thể đơn giản tin vào dữ liệu mà một nền tảng khác cung cấp. Một nhà tuyển dụng vẫn phải xác minh lại bằng cấp của ứng viên. Một doanh nghiệp vẫn phải kiểm tra lại thông tin pháp lý của đối tác dù dữ liệu đó có thể đã được một tổ chức khác xác minh trước đó.

Nói cách khác, Internet rất giỏi truyền dữ liệu nhưng lại chưa có một cơ chế phổ quát để các bên độc lập có thể dễ dàng trả lời câu hỏi:

**“Ai đang đứng phía bên kia và tôi có thể kiểm chứng những thông tin họ cung cấp bằng cách nào?”**

Đây là một trong những vấn đề mà **DID – Decentralized Identifier**, hay định danh phi tập trung, hướng tới giải quyết.

## DID không đơn giản chỉ là một ID mới

Một DID có thể trông như thế này:

\`did:example:123456789\`

Nhìn bên ngoài, nó chỉ giống một chuỗi ký tự. Nhưng khác biệt quan trọng không nằm ở hình thức của ID, mà nằm ở cách định danh đó được quản lý và xác minh.

Trong mô hình tài khoản truyền thống, định danh của bạn thường do một nhà cung cấp tạo ra và kiểm soát.

Nếu Google tạo tài khoản cho bạn, Google quản lý tài khoản đó. Nếu ngân hàng tạo mã khách hàng, ngân hàng quản lý mã đó. Nếu một nền tảng đóng cửa hoặc khóa tài khoản, định danh của bạn trong hệ thống đó cũng có thể biến mất.

DID được thiết kế theo hướng khác.

Thay vì buộc một định danh phải gắn chặt với một nhà cung cấp dịch vụ duy nhất, DID cho phép một cá nhân, tổ chức, thiết bị hoặc phần mềm sở hữu một định danh có thể được các hệ thống khác nhận biết và xác minh.

Một DID, vì vậy không chỉ có thể đại diện cho con người.

Nó có thể đại diện cho:

- một doanh nghiệp;
- một trường đại học;
- một thiết bị IoT;
- một máy chủ;
- một phần mềm;
- một AI Agent.

Điều này khiến DID trở nên đặc biệt đáng chú ý trong bối cảnh Internet đang chuyển từ việc chủ yếu kết nối con người sang kết nối ngày càng nhiều tổ chức, thiết bị và phần mềm tự động.

## Nhưng làm sao biết ai thực sự kiểm soát DID đó?

Đây là nơi mật mã xuất hiện.

Mỗi DID có thể được liên kết với những thông tin giúp hệ thống khác xác minh chủ thể đang kiểm soát định danh đó, chẳng hạn như khóa công khai và phương thức xác thực.

Những thông tin này thường được mô tả trong một **DID Document**.

Có thể hình dung DID giống như một địa chỉ, còn DID Document giống như tập hướng dẫn giúp hệ thống khác biết phải xác minh chủ thể của địa chỉ đó bằng cách nào.

Khi một người hoặc một tổ chức chứng minh rằng họ nắm giữ khóa mật mã tương ứng, hệ thống có thể xác nhận rằng họ đang kiểm soát DID đó mà không cần hỏi một máy chủ đăng nhập trung tâm.

Đây là điểm khác biệt quan trọng.

DID không loại bỏ niềm tin khỏi hệ thống. Nó thay đổi **cách niềm tin được thiết lập và kiểm chứng**.

## DID không cho biết bạn là ai

Đây cũng là điểm dễ gây hiểu nhầm nhất.

Giả sử một người sở hữu DID:

\`did:example:7f82...\`

Việc người đó chứng minh rằng họ kiểm soát DID này chỉ cho chúng ta biết một điều:

**Họ thực sự đang kiểm soát định danh đó.**

Nó chưa nói cho chúng ta biết tên của họ, tuổi của họ, họ đã tốt nghiệp trường nào hay đang làm việc cho doanh nghiệp nào.

Muốn chứng minh những thông tin đó, chúng ta cần thêm một thành phần khác: **thực chứng**, có thể hiểu đơn giản là những chứng nhận số có khả năng kiểm chứng.

Ví dụ, một trường đại học có DID của riêng mình.

Khi một sinh viên tốt nghiệp, trường có thể cấp cho sinh viên một bằng tốt nghiệp số. Bằng này mang chữ ký mật mã của trường và có thể được liên kết với định danh của sinh viên.

Khi sinh viên ứng tuyển vào một doanh nghiệp, họ có thể chia sẻ bằng tốt nghiệp của họ.

Doanh nghiệp không nhất thiết phải gọi điện cho trường hay gửi email yêu cầu xác nhận. Hệ thống có thể tự kiểm tra:

- Bằng có thực sự do trường phát hành hay không;
- Dữ liệu có bị thay đổi sau khi phát hành hay không;
- Chứng nhận còn hợp lệ hay đã bị thu hồi;
- Người đang nắm giữ Bằng có phải đúng là chủ thể mà bằng được cấp cho hay không.

Ở đây, DID đóng vai trò xác định các bên tham gia. Verifiable Credential mang thông tin được chứng nhận. Còn chữ ký mật mã giúp các bên kiểm tra tính xác thực.

Khi ba yếu tố này kết hợp với nhau, một loại hạ tầng niềm tin mới bắt đầu hình thành.

## Giá trị của DID nằm ở khả năng liên thông

Điểm quan trọng nhất của DID không phải là việc thay thế username hay email.

Giá trị lớn hơn nằm ở khả năng cho phép những hệ thống độc lập có một cách chung để nhận biết và xác minh lẫn nhau.

Ngày nay, rất nhiều quy trình số vẫn phải lặp lại cùng một việc.

Một người mở tài khoản ngân hàng phải xác minh danh tính. Khi vay tiền ở tổ chức khác, họ lại xác minh từ đầu. Khi ứng tuyển, bằng cấp lại được kiểm tra. Khi ký hợp đồng, thông tin pháp lý lại tiếp tục được đối chiếu.

Mỗi tổ chức giữ một bản dữ liệu riêng và tự xây dựng cơ chế xác minh riêng.

Nếu những thông tin đã được một nguồn có thẩm quyền xác nhận có thể được mang theo và kiểm chứng giữa nhiều hệ thống khác nhau, một phần rất lớn của chi phí xác minh có thể được giảm xuống.

Đối với kỹ sư, điều này mở ra khả năng xây dựng những hệ thống có thể tương tác dựa trên định danh và dữ liệu có thể kiểm chứng.

Đối với doanh nghiệp, nó có thể rút ngắn các quy trình KYC, tuyển dụng, cấp quyền, ký kết và giao dịch.

Đối với nhà hoạch định chính sách, nó tạo ra một cách tiếp cận khác đối với hạ tầng số: tăng khả năng liên thông mà không nhất thiết phải tập trung toàn bộ dữ liệu cá nhân vào một cơ sở dữ liệu duy nhất.

## DID có phải là blockchain không?

Câu trả lời là: Không.

DID thường được nhắc tới cùng blockchain vì một số mô hình DID sử dụng blockchain hoặc sổ cái phân tán để công bố khóa, trạng thái định danh hoặc những thông tin cần thiết cho quá trình xác minh.

Nhưng blockchain chỉ là một trong nhiều cách triển khai.

Điều tạo nên tính phi tập trung của DID không phải là việc nó được lưu trên blockchain, mà là việc một định danh có thể được kiểm soát và xác minh mà không phải hoàn toàn phụ thuộc vào một nhà cung cấp tài khoản duy nhất.

Đây là lý do DID có thể tồn tại trong nhiều kiến trúc khác nhau.

## Từ định danh số đến hạ tầng niềm tin

DID tự nó không giải quyết toàn bộ bài toán danh tính.

Một DID không thể tự quyết định trường đại học nào được quyền cấp bằng, ngân hàng nào được quyền xác nhận một tài khoản hay cơ quan nào có thẩm quyền phát hành một loại giấy tờ.

Những câu hỏi đó vẫn cần luật pháp, quy định, tiêu chuẩn và các mô hình quản trị.

Công nghệ có thể giúp chúng ta kiểm tra rằng một thông tin thực sự được một tổ chức nào đó ký và chưa bị chỉnh sửa. Nhưng việc xã hội có tin tưởng tổ chức đó hay không lại là một vấn đề khác.

Vì vậy, DID chỉ thực sự trở nên có giá trị khi được đặt trong một hệ sinh thái rộng hơn gồm thực chứng, ví định tín, các tổ chức phát hành và những quy tắc xác định ai được tin cậy để chứng nhận điều gì.

Đây cũng chính là nền tảng của mô hình **Self-Sovereign Identity – SSI**.

Nếu Internet thế hệ trước giải quyết bài toán kết nối các máy tính và truyền dữ liệu, thì một trong những bài toán lớn của Internet thế hệ tiếp theo có thể là kết nối những thực thể có khả năng **xác minh lẫn nhau**.

Trong bức tranh đó, DID không phải là toàn bộ lời giải.

Nhưng nó có thể là một trong những viên gạch nền tảng giúp con người, doanh nghiệp, thiết bị và AI biết mình đang tương tác với ai trước khi dữ liệu, quyền hạn và giá trị được trao đổi.`,
    },
  },
} as const satisfies StructuredBlogArticle;
