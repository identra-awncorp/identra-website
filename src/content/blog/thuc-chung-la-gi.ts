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

export const VERIFIABLE_CREDENTIAL_EXPLAINER_BLOG_ARTICLE_ID =
  'thuc-chung-la-gi' as const;

const assetRoot = '/blog/thuc-chung-la-gi';

export const VERIFIABLE_CREDENTIAL_EXPLAINER_BLOG_ARTICLE = {
  id: VERIFIABLE_CREDENTIAL_EXPLAINER_BLOG_ARTICLE_ID,
  slug: VERIFIABLE_CREDENTIAL_EXPLAINER_BLOG_ARTICLE_ID,
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
    'did-la-gi',
    'dinh-danh-tu-chu-ssi-la-gi',
  ],
  coverImage: {
    src: `${assetRoot}/verifiable-credential-cover-1440.webp`,
    srcSet: [
      `${assetRoot}/verifiable-credential-cover-800.webp 800w`,
      `${assetRoot}/verifiable-credential-cover-1440.webp 1440w`,
    ].join(', '),
    sizes: '(min-width: 1024px) 680px, (min-width: 768px) 55vw, 100vw',
    width: 1440,
    height: 810,
  },
  socialImage: {
    src: `${assetRoot}/${VERIFIABLE_CREDENTIAL_EXPLAINER_BLOG_ARTICLE_ID}-og.jpg`,
    width: 1200,
    height: 630,
    type: 'image/jpeg',
  },
  listing: {
    en: {
      title: 'What Are Verifiable Credentials?',
      description: 'How cryptographically protected credentials let software verify the origin, integrity and current status of digital information.',
      type: 'Foundations',
      duration: '8 min read',
    },
    es: {
      title: '¿Qué son las credenciales verificables?',
      description: 'Cómo las credenciales protegidas mediante criptografía permiten comprobar el origen, la integridad y el estado actual de la información digital.',
      type: 'Fundamentos',
      duration: '8 min de lectura',
    },
    ja: {
      title: '検証可能なクレデンシャルとは？',
      description: '暗号技術で保護されたクレデンシャルにより、デジタル情報の発行元、完全性、現在の状態をソフトウェアで検証する仕組みを解説します。',
      type: '基礎知識',
      duration: '読了8分',
    },
    de: {
      title: 'Was sind überprüfbare Nachweise?',
      description: 'Wie kryptografisch geschützte Nachweise die Herkunft, Integrität und den aktuellen Status digitaler Informationen überprüfbar machen.',
      type: 'Grundlagen',
      duration: '8 Min. Lesezeit',
    },
    vi: {
      title: 'Thực chứng là gì? Cách dữ liệu số trở nên đáng tin cậy và có thể kiểm chứng',
      description: 'Thực chứng giúp phần mềm kiểm tra nguồn phát hành, tính toàn vẹn và trạng thái của dữ liệu số mà không phải xác minh thủ công từ đầu.',
      type: 'Kiến thức nền tảng',
      duration: 'Đọc trong 8 phút',
    },
  } satisfies Record<Locale, BlogArticleListingCopy>,
  images: {},
  content: {
    vi: {
      title: 'Thực chứng là gì? Cách dữ liệu số trở nên đáng tin cậy và có thể kiểm chứng',
      description: 'Thực chứng giúp phần mềm kiểm tra nguồn phát hành, tính toàn vẹn và trạng thái của dữ liệu số mà không phải xác minh thủ công từ đầu.',
      excerpt: 'Thực chứng biến thông tin số thành dữ liệu có thể tự mang theo bằng chứng về nguồn gốc, tính toàn vẹn và trạng thái hiệu lực.',
      category: 'Kiến thức nền tảng',
      tags: ['Thực chứng', 'Nguồn gốc dữ liệu', 'Mật mã học', 'Tiết lộ có chọn lọc'],
      readTimeMinutes: 8,
      ui: {
        publishedLabel: 'Xuất bản ngày',
        authorRole: 'Đội ngũ nội dung Identra',
        tableOfContents: 'Mục lục',
        openTableOfContents: 'Mở mục lục bài viết',
        closeTableOfContents: 'Đóng mục lục bài viết',
        ctaTitle: 'Biến dữ liệu số thành thông tin có thể kiểm chứng',
        ctaDescription: 'Khám phá cách Identra giúp tổ chức phát hành, quản lý và xác minh thực chứng với nguồn gốc cùng trạng thái rõ ràng.',
        ctaButtonLabel: 'Trải nghiệm demo',
      },
      tableOfContents: [
        {
          id: 'thuc-chung-la-gi',
          label: 'Thực chứng là gì?',
          level: 2,
        },
        {
          id: 'tu-mot-tam-bang-den-du-lieu-co-the-tu-chung-minh-nguon-goc',
          label: 'Từ một tấm bằng đến dữ liệu có thể tự chứng minh nguồn gốc',
          level: 2,
        },
        {
          id: 'mo-hinh-ba-ben-tao-nen-mot-thuc-chung-co-gia-tri',
          label: 'Mô hình ba bên tạo nên một thực chứng có giá trị',
          level: 2,
        },
        {
          id: 'thuc-chung-khong-chi-danh-cho-giay-to-cua-con-nguoi',
          label: 'Thực chứng không chỉ dành cho giấy tờ của con người',
          level: 2,
        },
        {
          id: 'mat-ma-co-the-chung-minh-nguon-goc-nhung-khong-tu-tao-ra-niem-tin',
          label: 'Mật mã có thể chứng minh nguồn gốc, nhưng không tự tạo ra niềm tin',
          level: 2,
        },
        {
          id: 'neu-thong-tin-khong-con-dung-thi-sao',
          label: 'Nếu thông tin không còn đúng thì sao?',
          level: 2,
        },
        {
          id: 'khong-phai-luc-nao-cung-can-chia-se-toan-bo-thong-tin',
          label: 'Không phải lúc nào cũng cần chia sẻ toàn bộ thông tin',
          level: 2,
        },
        {
          id: 'tu-du-lieu-so-den-du-lieu-dang-tin-cay',
          label: 'Từ dữ liệu số đến dữ liệu đáng tin cậy',
          level: 2,
        },
      ] satisfies BlogArticleTableOfContentsItem[],
      markdown: `Internet giúp chúng ta tạo, sao chép và truyền dữ liệu gần như tức thời. Nhưng chính khả năng đó cũng tạo ra một vấn đề ngày càng lớn: **làm thế nào để biết một thông tin số có thực sự đáng tin hay không?**

Một ứng viên có thể gửi bản PDF bằng tốt nghiệp. Một doanh nghiệp có thể gửi bản scan giấy phép hoạt động. Một người có thể chụp ảnh bằng lái xe rồi tải lên hệ thống.

Những tài liệu này có thể chứa đầy đủ thông tin cần thiết, nhưng bên nhận vẫn phải tự đặt ra hàng loạt câu hỏi: tài liệu do ai phát hành, có bị chỉnh sửa không, còn hiệu lực hay không và người đang sử dụng nó có thực sự là người được cấp hay không?

Ngày nay, để trả lời những câu hỏi đó, chúng ta thường phải quay lại nguồn phát hành: gọi điện cho trường đại học, tra cứu cơ sở dữ liệu của cơ quan quản lý, gửi yêu cầu xác nhận hoặc thuê một bên thứ ba thực hiện việc kiểm tra.

**Thực chứng được tạo ra để giúp quá trình này có thể diễn ra trực tiếp bằng phần mềm.**

## Thực chứng là gì?

Hiểu đơn giản, **thực chứng là một tập thông tin số do một bên phát hành cho một chủ thể, được bảo vệ bằng mật mã để những bên khác có thể kiểm tra nguồn gốc và tính toàn vẹn của thông tin đó.**

Ví dụ, một trường đại học có thể phát hành cho sinh viên một thực chứng về bằng tốt nghiệp, trong đó ghi nhận tên người học, ngành học, loại bằng và ngày tốt nghiệp.

Nếu đó chỉ là một file PDF thông thường, người nhận chủ yếu nhìn vào nội dung và hình thức của tài liệu để đánh giá nó có đáng tin hay không.

Với thực chứng, hệ thống có thể kiểm tra bằng mật mã rằng thông tin thực sự được trường đại học đó phát hành và nội dung không bị sửa đổi sau khi phát hành.

Khác biệt quan trọng vì vậy không nằm ở việc tài liệu được chuyển từ giấy sang điện tử.

**Thực chứng biến thông tin thành dữ liệu có thể được máy tính tự động kiểm tra.**

## Từ một tấm bằng đến dữ liệu có thể tự chứng minh nguồn gốc

Hãy quay lại ví dụ về bằng đại học.

Theo cách hiện nay, khi một sinh viên xin việc, họ có thể gửi bản scan hoặc bản PDF bằng tốt nghiệp cho nhà tuyển dụng. Doanh nghiệp sau đó phải quyết định có tin tài liệu đó hay không.

Nếu vị trí tuyển dụng quan trọng, doanh nghiệp có thể phải liên hệ với trường, kiểm tra trên một hệ thống riêng hoặc sử dụng dịch vụ xác minh.

Với thực chứng, quy trình có thể khác.

Khi sinh viên tốt nghiệp, trường phát hành một thực chứng vào ví định tín của sinh viên. Khi ứng tuyển, sinh viên sử dụng ví để trình thông tin cần thiết cho nhà tuyển dụng.

Hệ thống của doanh nghiệp có thể tự kiểm tra:

- thực chứng có đúng do trường đó phát hành hay không;
- nội dung có bị thay đổi hay không;
- thực chứng còn hiệu lực hay đã bị thu hồi;
- người đang trình thực chứng có quyền sử dụng nó hay không.

Một quy trình vốn dựa nhiều vào giấy tờ, email và con người có thể trở thành một quy trình mà phần mềm xử lý trong vài giây.

Đây là một trong những giá trị quan trọng nhất của thực chứng: **không chỉ số hóa dữ liệu, mà còn số hóa khả năng xác minh dữ liệu.**

## Mô hình ba bên tạo nên một thực chứng có giá trị

Để hiểu cách thực chứng hoạt động, có thể hình dung một mối quan hệ rất đơn giản giữa ba bên.

Đầu tiên là **bên phát hành**. Đây là tổ chức đưa ra một xác nhận về chủ thể nào đó. Trường đại học xác nhận một người đã tốt nghiệp, doanh nghiệp xác nhận một người đang là nhân viên, cơ quan quản lý xác nhận một doanh nghiệp có giấy phép hoạt động.

Tiếp theo là **bên nắm giữ**. Chủ thể nhận thực chứng và có thể quản lý nó trong ví định tín.

Cuối cùng là **bên xác minh**. Đây là bên cần kiểm tra thông tin trước khi đưa ra một quyết định.

Trong ví dụ về bằng đại học, mối quan hệ này rất dễ thấy:

**Trường đại học → Sinh viên → Nhà tuyển dụng**

Trường đại học phát hành. Sinh viên nắm giữ. Nhà tuyển dụng xác minh.

Điều đáng chú ý là nhà tuyển dụng không nhất thiết phải kết nối trực tiếp với cơ sở dữ liệu của trường mỗi lần cần xác minh. Sinh viên có thể mang thông tin đã được trường xác nhận sang một hệ thống khác mà khả năng kiểm chứng vẫn được giữ nguyên.

## Thực chứng không chỉ dành cho giấy tờ của con người

Nếu chỉ nhìn vào bằng cấp, căn cước hay giấy phép lái xe, rất dễ nghĩ rằng thực chứng chỉ là một hình thức mới của giấy tờ cá nhân.

Phạm vi của nó rộng hơn nhiều.

Một doanh nghiệp có thể nhận thực chứng về giấy phép hoạt động, chứng nhận tiêu chuẩn hoặc tư cách thành viên trong một mạng lưới.

Một thiết bị công nghiệp có thể có thực chứng về nhà sản xuất, kết quả kiểm định hoặc lịch sử bảo trì.

Một phần mềm có thể mang thực chứng về nguồn phát hành hoặc quyền được truy cập một hệ thống.

Trong tương lai, một tác nhân trí tuệ nhân tạo cũng có thể cần chứng minh nó thuộc về tổ chức nào, được ai ủy quyền và được phép thực hiện những loại hành động nào.

Thực chứng vì vậy không nhất thiết trả lời câu hỏi:

**“Chủ thể này là ai?”**

Nó có thể trả lời một câu hỏi rộng hơn:

**“Điều gì về chủ thể này đã được một bên khác xác nhận?”**

Đó có thể là danh tính, thuộc tính, tư cách, quyền hạn, năng lực hoặc một mối quan hệ.

## Mật mã có thể chứng minh nguồn gốc, nhưng không tự tạo ra niềm tin

Đây là một giới hạn rất quan trọng.

Giả sử một trường có tên “Đại học X” phát hành một thực chứng. Mật mã có thể giúp chúng ta xác nhận rằng thực chứng đó thực sự được phát hành bằng khóa của Đại học X và nội dung chưa bị chỉnh sửa.

Nhưng mật mã không thể tự trả lời:

**Đại học X có được cơ quan có thẩm quyền công nhận hay không?**

Hay:

**Đại học X có quyền cấp loại bằng này hay không?**

Đây là sự khác biệt giữa **tính xác thực** và **thẩm quyền**.

Công nghệ có thể chứng minh một thông tin đến từ đâu. Nhưng việc nguồn phát hành đó có đáng tin trong một bối cảnh cụ thể hay không vẫn phụ thuộc vào pháp luật, quy định, cơ quan quản lý và các khung tin cậy.

Vì vậy, một hệ thống SSI hoàn chỉnh không chỉ cần mật mã. Nó còn cần những quy tắc giúp các bên biết **ai được quyền xác nhận điều gì**.

## Nếu thông tin không còn đúng thì sao?

Không phải mọi thông tin đều có giá trị vĩnh viễn.

Một bằng lái có thể hết hạn. Một giấy phép có thể bị thu hồi. Một nhân viên có thể nghỉ việc. Một chứng nhận có thể không còn hiệu lực.

Do đó, kiểm tra chữ ký của thực chứng chưa phải là bước cuối cùng.

Bên xác minh còn cần biết **trạng thái hiện tại của thực chứng**.

Điều này giúp hệ thống phân biệt giữa:

> “Thông tin này thực sự đã từng được phát hành.”

và:

> “Thông tin này hiện vẫn còn có giá trị.”

Khả năng quản lý trạng thái và thu hồi là một phần quan trọng để thực chứng có thể được sử dụng trong các giao dịch thực tế.

## Không phải lúc nào cũng cần chia sẻ toàn bộ thông tin

Thực chứng còn mở ra một thay đổi quan trọng khác trong cách dữ liệu được chia sẻ.

Giả sử một dịch vụ chỉ cần biết người dùng đã đủ 18 tuổi.

Theo cách thông thường, người dùng có thể phải cung cấp cả giấy tờ chứa họ tên, ngày sinh, địa chỉ, số giấy tờ và nhiều thông tin khác.

Trong một hệ thống được thiết kế phù hợp, người dùng có thể chỉ cần chứng minh:

**“Tôi đã đủ 18 tuổi.”**

Những dữ liệu không cần thiết không nhất thiết phải được chia sẻ.

Tư duy vì vậy chuyển từ:

**“Hãy đưa cho tôi giấy tờ của bạn.”**

sang:

**“Hãy chứng minh cho tôi điều tôi cần biết.”**

Đây là một thay đổi nhỏ về cách diễn đạt nhưng rất lớn về cách chúng ta xây dựng hệ thống dữ liệu và bảo vệ quyền riêng tư.

## Từ dữ liệu số đến dữ liệu đáng tin cậy

Nền kinh tế số không thiếu dữ liệu. Điều ngày càng trở nên quan trọng là **nguồn gốc, chất lượng và khả năng kiểm chứng của dữ liệu**.

Nếu một doanh nghiệp có thể tự động xác minh bằng cấp, giấy phép, tư cách pháp lý hay quyền hạn của một đối tác, rất nhiều bước kiểm tra thủ công có thể được rút ngắn.

Nếu các hệ thống có thể trao đổi những thông tin đã được xác nhận mà không phải liên tục sao chép dữ liệu và xác minh lại từ đầu, chi phí vận hành của nhiều quy trình số có thể giảm đáng kể.

Và khi ngày càng nhiều giao dịch được thực hiện không chỉ giữa con người mà còn giữa doanh nghiệp, thiết bị và các hệ thống trí tuệ nhân tạo, nhu cầu về dữ liệu có thể kiểm chứng sẽ càng trở nên quan trọng.

Đó chính là vai trò của thực chứng.

**Thực chứng không làm cho một thông tin tự nhiên trở thành sự thật. Nó giúp chúng ta biết ai đã xác nhận thông tin đó, thông tin có bị thay đổi hay không và xác nhận đó hiện còn hiệu lực hay không.**

Khi kết hợp với mã định danh phi tập trung, ví định tín và các khung tin cậy, thực chứng tạo ra khả năng để dữ liệu không chỉ được truyền từ nơi này sang nơi khác, mà còn có thể **mang theo bằng chứng về nguồn gốc và độ tin cậy của chính nó**.

Đó là một trong những nền móng quan trọng nhất của SSI và cũng có thể trở thành một phần quan trọng của hạ tầng niềm tin cho nền kinh tế số trong tương lai.`,
    },
  },
} satisfies StructuredBlogArticle;
