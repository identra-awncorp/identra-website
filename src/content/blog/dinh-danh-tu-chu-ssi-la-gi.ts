/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type {
  BlogArticleImage,
  BlogArticleListingCopy,
  BlogArticleTableOfContentsItem,
  StructuredBlogArticle,
} from './structuredBlogArticleModel';
import type { Locale } from '../../types/routes';

export const SSI_BLOG_ARTICLE_ID = 'dinh-danh-tu-chu-ssi-la-gi' as const;

const assetRoot = '/blog/dinh-danh-tu-chu-ssi-la-gi';

export const SSI_BLOG_ARTICLE = {
  id: SSI_BLOG_ARTICLE_ID,
  slug: SSI_BLOG_ARTICLE_ID,
  publishedAt: '2026-07-26',
  modifiedAt: '2026-07-26',
  author: {
    type: 'Organization',
    name: 'Identra',
  },
  topics: ['identity', 'privacy'],
  industries: ['all'],
  contentLocales: ['vi'],
  relatedArticleIds: [
    'ssi-trong-giao-duc-giai-phap-so-hoa-bang-cap-va-xac-minh-nang-luc',
    'ho-so-hoc-tap-suot-doi-loi-ich-cua-mo-hinh-dinh-danh-tu-chu-doi-voi-nguoi-hoc',
    'rao-can-phap-ly-trong-tuyen-dung-quoc-te-ssi-mo-duong-cho-nhan-su-remote-nhu-the-nao',
  ],
  coverImage: {
    src: `${assetRoot}/self-sovereign-identity-explained-1440.webp`,
    srcSet: [
      `${assetRoot}/self-sovereign-identity-explained-800.webp 800w`,
      `${assetRoot}/self-sovereign-identity-explained-1440.webp 1440w`,
    ].join(', '),
    sizes: '(min-width: 1024px) 680px, (min-width: 768px) 55vw, 100vw',
    width: 1440,
    height: 810,
  },
  socialImage: {
    src: `${assetRoot}/dinh-danh-tu-chu-ssi-la-gi-og.jpg`,
    width: 1200,
    height: 630,
    type: 'image/jpeg',
  },
  listing: {
    en: {
      title: 'What is self-sovereign identity (SSI)? From today’s digital identity limits to a new model',
      description: 'Why current digital identity models remain limited, what SSI is designed to solve, and how trusted credentials move between services.',
      type: 'Identity foundations',
      duration: '20 min read',
    },
    es: {
      title: '¿Qué es la identidad autosoberana (SSI)? De los límites actuales a un nuevo modelo',
      description: 'Por qué los modelos actuales de identidad digital siguen siendo limitados, qué busca resolver SSI y cómo se comparten credenciales confiables.',
      type: 'Fundamentos de identidad',
      duration: '20 min de lectura',
    },
    ja: {
      title: '自己主権型アイデンティティ（SSI）とは？現在のデジタルIDの限界から新しいモデルへ',
      description: '現在のデジタルIDモデルに残る課題、SSIが解決しようとすること、信頼できる証明書がサービス間を移動する仕組みを解説します。',
      type: 'デジタルIDの基礎',
      duration: '読了20分',
    },
    de: {
      title: 'Was ist Self-Sovereign Identity (SSI)? Von heutigen Grenzen zu einem neuen Identitätsmodell',
      description: 'Warum heutige digitale Identitätsmodelle an Grenzen stoßen, welches Problem SSI löst und wie vertrauenswürdige Nachweise zwischen Diensten genutzt werden.',
      type: 'Grundlagen digitaler Identität',
      duration: '20 Min. Lesezeit',
    },
    vi: {
      title: 'Định danh tự chủ (SSI) là gì? Từ giới hạn của định danh số hiện nay đến một mô hình mới',
      description: 'Vì sao các mô hình định danh số hiện nay còn nhiều giới hạn, định danh tự chủ ra đời để giải quyết điều gì và SSI vận hành như thế nào?',
      type: 'Kiến thức nền tảng',
      duration: 'Đọc trong 20 phút',
    },
  } satisfies Record<Locale, BlogArticleListingCopy>,
  images: {
    [`${assetRoot}/self-sovereign-identity-explained-1440.webp`]: {
      src: `${assetRoot}/self-sovereign-identity-explained-1440.webp`,
      srcSet: [
        `${assetRoot}/self-sovereign-identity-explained-800.webp 800w`,
        `${assetRoot}/self-sovereign-identity-explained-1440.webp 1440w`,
      ].join(', '),
      sizes: '(min-width: 1024px) 768px, calc(100vw - 3rem)',
      width: 1440,
      height: 810,
    },
    [`${assetRoot}/self-sovereign-identity-user-data-control-1440.webp`]: {
      src: `${assetRoot}/self-sovereign-identity-user-data-control-1440.webp`,
      srcSet: [
        `${assetRoot}/self-sovereign-identity-user-data-control-800.webp 800w`,
        `${assetRoot}/self-sovereign-identity-user-data-control-1440.webp 1440w`,
      ].join(', '),
      sizes: '(min-width: 1024px) 768px, calc(100vw - 3rem)',
      width: 1440,
      height: 810,
    },
    [`${assetRoot}/digital-diploma-education-credential-trends-1440.webp`]: {
      src: `${assetRoot}/digital-diploma-education-credential-trends-1440.webp`,
      srcSet: [
        `${assetRoot}/digital-diploma-education-credential-trends-800.webp 800w`,
        `${assetRoot}/digital-diploma-education-credential-trends-1440.webp 1440w`,
      ].join(', '),
      sizes: '(min-width: 1024px) 768px, calc(100vw - 3rem)',
      width: 1440,
      height: 810,
    },
    [`${assetRoot}/decentralized-identity-trust-triangle-1440.webp`]: {
      src: `${assetRoot}/decentralized-identity-trust-triangle-1440.webp`,
      srcSet: [
        `${assetRoot}/decentralized-identity-trust-triangle-800.webp 800w`,
        `${assetRoot}/decentralized-identity-trust-triangle-1440.webp 1440w`,
      ].join(', '),
      sizes: '(min-width: 1024px) 768px, calc(100vw - 3rem)',
      width: 1440,
      height: 810,
    },
  } satisfies Record<string, BlogArticleImage>,
  content: {
    vi: {
      title: 'Định danh tự chủ (SSI) là gì? Từ giới hạn của định danh số hiện nay đến một mô hình mới',
      description: 'Vì sao các mô hình định danh số hiện nay còn nhiều giới hạn, định danh tự chủ ra đời để giải quyết điều gì và SSI vận hành như thế nào?',
      excerpt: 'SSI không bắt đầu từ blockchain hay một loại ví mới. Nó bắt đầu từ câu hỏi: liệu mỗi người có thể mang theo những bằng chứng đáng tin cậy về mình giữa các dịch vụ hay không?',
      seoTitle: 'Định danh tự chủ (SSI) là gì? Giải thích từ nền tảng',
      seoDescription: 'SSI là gì, vì sao mô hình này ra đời và khác định danh tập trung, đăng nhập liên kết như thế nào? Tìm hiểu thực chứng, ví định tín và DID.',
      category: 'Kiến thức nền tảng',
      tags: ['SSI', 'Định danh tự chủ', 'Danh tính số', 'Verifiable Credentials', 'DID'],
      readTimeMinutes: 20,
      ui: {
        publishedLabel: 'Xuất bản ngày',
        authorRole: 'Đội ngũ nội dung Identra',
        tableOfContents: 'Mục lục',
        openTableOfContents: 'Mở mục lục bài viết',
        closeTableOfContents: 'Đóng mục lục bài viết',
        ctaTitle: 'Khám phá định danh tự chủ trong thực tế',
        ctaDescription: 'Trải nghiệm cách thực chứng được chia sẻ và xác minh trong các kịch bản của Identra.',
        ctaButtonLabel: 'Trải nghiệm demo',
      },
      tableOfContents: [
        { id: 'nhung-oc-dao-danh-tinh-tren-internet', label: 'Những “ốc đảo danh tính” trên Internet', level: 2 },
        { id: 'dinh-danh-lien-ket-xay-nhung-cay-cau-giua-cac-oc-dao', label: 'Định danh liên kết', level: 2 },
        { id: 'tu-tai-khoan-do-nen-tang-quan-ly-den-dinh-danh-tu-chu', label: 'Từ tài khoản đến định danh tự chủ', level: 2 },
        { id: 'mot-vi-du-truc-quan-su-dung-bang-tot-nghiep-khi-ung-tuyen', label: 'Ví dụ sử dụng bằng tốt nghiệp', level: 2 },
        { id: 'nhung-thanh-phan-co-ban-cua-mot-he-thong-dinh-danh-tu-chu', label: 'Các thành phần cơ bản của SSI', level: 2 },
        { id: 'mo-hinh-tam-giac-tin-cay', label: 'Mô hình tam giác tin cậy', level: 3 },
        { id: 'thuc-chung-bang-chung-so-co-the-kiem-tra', label: 'Thực chứng', level: 3 },
        { id: 'vi-dinh-tin-noi-nguoi-dung-quan-ly-cac-thuc-chung', label: 'Ví định tín', level: 3 },
        { id: 'khung-quan-tri-dieu-gi-khien-mot-thuc-chung-duoc-tin-tuong', label: 'Khung quản trị', level: 3 },
        { id: 'cac-thanh-phan-phoi-hop-voi-nhau-nhu-the-nao', label: 'Cách các thành phần phối hợp', level: 3 },
        { id: 'ssi-khac-gi-so-voi-cac-mo-hinh-truyen-thong', label: 'SSI khác mô hình truyền thống thế nào?', level: 2 },
        { id: 'tai-lieu-tham-khao', label: 'Tài liệu tham khảo', level: 2 },
      ] satisfies BlogArticleTableOfContentsItem[],
      markdown: `Internet được xây dựng để các máy tính kết nối và trao đổi dữ liệu, nhưng không có sẵn một lớp định danh dành cho con người và tổ chức. Vì vậy, mỗi dịch vụ phải tự tạo tài khoản và hồ sơ cho người dùng. Mô hình này đã giúp Internet vận hành trong nhiều thập kỷ, nhưng cũng tạo ra một nghịch lý: danh tính thuộc về một con người, nhưng quyền quản lý danh tính số của người đó lại chủ yếu nằm trong hệ thống của các tổ chức khác.

**Định danh tự chủ**, hay **Self-Sovereign Identity (SSI)**, ra đời từ nỗ lực giải quyết nghịch lý ấy. Muốn hiểu SSI là gì, trước hết cần nhìn vào cách các mô hình định danh hiện nay hoạt động và những giới hạn mà chúng chưa khắc phục được.

![Một người sử dụng định danh tự chủ để mang thông tin đã được xác minh giữa nhiều dịch vụ](/blog/dinh-danh-tu-chu-ssi-la-gi/self-sovereign-identity-explained-1440.webp)

*Hình 1. Định danh tự chủ giúp người dùng mang theo những bằng chứng đáng tin cậy và sử dụng chúng trong nhiều dịch vụ khác nhau.*

## Những “ốc đảo danh tính” trên Internet

Trong mô hình định danh tập trung, mỗi tổ chức xây dựng và quản lý một hồ sơ riêng về người dùng. Vì vậy, khi mở tài khoản ngân hàng, ứng tuyển việc làm hoặc thực hiện thủ tục hành chính, một người thường phải khai báo và cung cấp lại cùng một nhóm thông tin. Ngay cả khi những thông tin này đã được một tổ chức có thẩm quyền xác minh, kết quả xác minh cũng thường không thể được tái sử dụng trực tiếp tại hệ thống khác. Bên tiếp nhận vẫn phải kiểm tra lại, sau đó lưu trữ thêm một bản sao trong cơ sở dữ liệu của mình.

Hệ quả là cùng một dữ liệu cá nhân được sao chép và phân tán trên nhiều hệ thống, làm gia tăng nguy cơ rò rỉ, lạm dụng hoặc sử dụng sai mục đích. Trong khi đó, người dùng khó biết chính xác tổ chức nào đang lưu giữ những thông tin gì, sử dụng chúng cho mục đích nào và trong bao lâu. Ảnh chụp hoặc tệp PDF của giấy tờ có thể giúp việc trao đổi thuận tiện hơn, nhưng chúng dễ bị chỉnh sửa và không cho phép bên tiếp nhận tự động kiểm tra tính xác thực cũng như tính toàn vẹn. Tài khoản định danh lại do từng nhà cung cấp kiểm soát; nếu tài khoản bị khóa hoặc dịch vụ ngừng hoạt động, người dùng có thể mất quyền truy cập vào thông tin, quyền lợi và lịch sử gắn với tài khoản đó. Mô hình tập trung vẫn phù hợp với việc quản lý danh tính và phân quyền trong phạm vi một tổ chức, nhưng bộc lộ nhiều hạn chế khi người dùng phải di chuyển giữa nhiều hệ thống độc lập, thiếu khả năng liên thông.

## Định danh liên kết: xây những cây cầu giữa các “ốc đảo”

Để giảm tình trạng mỗi dịch vụ yêu cầu người dùng tạo một tài khoản riêng, mô hình **định danh liên kết** (*federated identity*) cho phép một tài khoản được sử dụng tại nhiều dịch vụ đã có quan hệ kết nối với nhau. Những lựa chọn như “Đăng nhập bằng Google”, “Tiếp tục với Apple” hay tài khoản dùng chung trong hệ thống nội bộ của doanh nghiệp là các ví dụ quen thuộc. Thay vì tự xác thực người dùng từ đầu, dịch vụ tiếp nhận tin vào kết quả xác thực do một nhà cung cấp danh tính khác đưa ra.

Mô hình này cải thiện đáng kể trải nghiệm sử dụng. Người dùng không phải ghi nhớ quá nhiều mật khẩu, còn các tổ chức có thể tận dụng một hệ thống xác thực đã được đầu tư bài bản. Tuy nhiên, định danh liên kết chủ yếu giúp giải quyết bài toán đăng nhập, chứ chưa giúp người dùng mang theo những thông tin đã được xác minh. Việc đăng nhập bằng Google không thể tự chứng minh một người đã tốt nghiệp đại học, có giấy phép hành nghề hay đủ điều kiện thực hiện một giao dịch cụ thể. Khi cần những thông tin đó, người dùng vẫn thường phải khai báo lại, gửi giấy tờ và trải qua một quy trình xác minh mới.

Sự thuận tiện của định danh liên kết cũng đi kèm với sự phụ thuộc lớn hơn vào nhà cung cấp tài khoản. Nếu tài khoản trung tâm bị khóa hoặc gặp sự cố, người dùng có thể mất quyền truy cập vào nhiều dịch vụ cùng lúc. Nhà cung cấp danh tính cũng có khả năng biết người dùng đăng nhập vào đâu và khi nào. Vì vậy, mô hình liên kết đã xây được những cây cầu giữa các “ốc đảo danh tính”, nhưng các cây cầu ấy vẫn do một số tổ chức trung gian kiểm soát.

Giới hạn này dẫn đến một câu hỏi quan trọng hơn: liệu một người có thể trực tiếp nắm giữ những thông tin đã được các tổ chức có thẩm quyền xác nhận, sau đó chủ động sử dụng chúng tại nhiều dịch vụ mà không phải phụ thuộc vào một nhà cung cấp đăng nhập trung tâm hay không?

## Từ tài khoản do nền tảng quản lý đến định danh tự chủ

**Định danh tự chủ**, hay **Self-Sovereign Identity (SSI)**, ra đời từ nỗ lực trả lời câu hỏi đó. Thay vì để những thông tin đã được xác minh chỉ tồn tại trong cơ sở dữ liệu của từng tổ chức, SSI cho phép tổ chức phát hành chúng dưới dạng những bằng chứng số mà người dùng có thể trực tiếp nắm giữ và sử dụng khi cần.

Sự thay đổi cốt lõi của SSI là chuyển trọng tâm từ **tài khoản** sang **bằng chứng có thể mang theo**. Một trường đại học có thể cấp bằng tốt nghiệp số, một cơ quan nhà nước có thể cấp giấy phép số, còn một doanh nghiệp có thể cấp xác nhận kinh nghiệm làm việc. Những bằng chứng này được gọi là **thực chứng**: các xác nhận điện tử có thể được kiểm tra để biết ai đã phát hành, nội dung có bị thay đổi hay không và chúng còn hiệu lực hay không.

Người dùng lưu giữ các thực chứng trong một **ví định tín** và chủ động lựa chọn khi nào cần sử dụng. Khi một dịch vụ yêu cầu chứng minh thông tin, người dùng có thể gửi đúng bằng chứng cần thiết thay vì khai lại toàn bộ hồ sơ hoặc gửi bản chụp giấy tờ. Bên tiếp nhận kiểm tra thực chứng trước khi đưa ra quyết định, trong khi tổ chức phát hành không cần trực tiếp tham gia vào mọi lần xác minh.

Tính “tự chủ” ở đây không có nghĩa người dùng được tự tạo ra mọi thông tin về mình. Một người không thể tự cấp bằng tốt nghiệp hoặc giấy phép hành nghề. Giá trị của thực chứng vẫn đến từ tổ chức có thẩm quyền phát hành. Điểm khác biệt là sau khi được cấp, người dùng có thể trực tiếp quản lý và trình bày thực chứng đó, thay vì để kết quả xác minh bị khóa trong một hệ thống riêng biệt.

Nhờ cách tiếp cận này, cùng một thực chứng có thể được sử dụng trong nhiều tình huống, lượng dữ liệu phải sao chép giữa các tổ chức có thể giảm xuống và người dùng có nhiều quyền chủ động hơn đối với thông tin của mình. Trong một số trường hợp, họ còn có thể chỉ chứng minh điều cần thiết, chẳng hạn đã đủ tuổi, mà không phải cung cấp toàn bộ ngày sinh và các dữ liệu không liên quan.

![Một cá nhân chủ động chia sẻ thông tin đã được xác minh với bên tiếp nhận](/blog/dinh-danh-tu-chu-ssi-la-gi/self-sovereign-identity-user-data-control-1440.webp)

*Hình 2. Trong SSI, người dùng trực tiếp quản lý và trình bày những bằng chứng do các tổ chức có thẩm quyền phát hành.*

Có thể hiểu ngắn gọn rằng **định danh tự chủ là mô hình cho phép người dùng trực tiếp nắm giữ và sử dụng những bằng chứng đáng tin cậy về mình, đồng thời cho phép bên tiếp nhận tự kiểm tra chúng mà không phải phụ thuộc vào một nhà cung cấp danh tính trung gian trong từng giao dịch**.

## Một ví dụ trực quan: sử dụng bằng tốt nghiệp khi ứng tuyển

Giả sử Nhâm vừa tốt nghiệp ngành công nghệ thông tin và đang ứng tuyển vào một doanh nghiệp. Theo cách làm thông thường, Nhâm gửi bản chụp hoặc tệp PDF bằng tốt nghiệp. Bộ phận nhân sự phải xem xét tài liệu, tra cứu trên hệ thống của trường hoặc liên hệ để xác minh nếu cần. Khi Nhâm ứng tuyển tại nhiều nơi, cùng một giấy tờ lại được gửi đi, kiểm tra và lưu trữ nhiều lần.

Với SSI, trường đại học cấp cho Nhâm một thực chứng bằng tốt nghiệp và Nhâm lưu nó trong ví định tín trên điện thoại. Thực chứng này không chỉ là hình ảnh của tấm bằng, mà là một bằng chứng số cho phép hệ thống kiểm tra trường nào đã cấp, nội dung có bị chỉnh sửa hay không và bằng còn hợp lệ hay không.

Khi doanh nghiệp yêu cầu chứng minh trình độ học vấn, Nhâm nhận được yêu cầu trong ví và quyết định chia sẻ. Anh không nhất thiết phải gửi toàn bộ nội dung của bằng nếu doanh nghiệp chỉ cần biết mình đã tốt nghiệp ngành công nghệ thông tin tại một trường được công nhận. Sau khi nhận bằng chứng, hệ thống tuyển dụng có thể kiểm tra tính xác thực gần như ngay lập tức mà không phải gọi điện hoặc chờ nhà trường phản hồi cho từng hồ sơ.

Trong tình huống này, trường đại học là bên phát hành, Nhâm là bên nắm giữ, còn doanh nghiệp là bên xác minh. Trường vẫn chịu trách nhiệm về thông tin đã xác nhận, doanh nghiệp vẫn quyết định bằng cấp có đáp ứng yêu cầu tuyển dụng hay không, nhưng Nhâm trở thành người trực tiếp mang bằng chứng từ nơi phát hành đến nơi cần sử dụng.

Cùng một thực chứng sau đó có thể được Nhâm dùng để ứng tuyển tại doanh nghiệp khác, đăng ký học cao học hoặc hoàn thiện một hồ sơ chuyên môn. Thay vì liên tục gửi các bản sao và yêu cầu xác minh lại, Nhâm có thể tái sử dụng một bằng chứng đáng tin cậy trong nhiều bối cảnh khác nhau. Đây chính là cách SSI biến những thông tin vốn bị khóa trong từng hệ thống thành các bằng chứng mà người dùng có thể mang theo và chủ động sử dụng.

![Bằng tốt nghiệp số được phát hành, lưu trong ví và xác minh khi ứng tuyển](/blog/dinh-danh-tu-chu-ssi-la-gi/digital-diploma-education-credential-trends-1440.webp)

*Hình 3. Thực chứng bằng tốt nghiệp có thể được người học lưu giữ và sử dụng lại trong nhiều quy trình tuyển dụng hoặc học tập.*

## Những thành phần cơ bản của một hệ thống định danh tự chủ

Qua ví dụ về bằng tốt nghiệp của Nhâm, có thể thấy định danh tự chủ không phải là một ứng dụng hay một công nghệ đơn lẻ. Đây là một mô hình trong đó nhiều thành phần phối hợp với nhau để một thông tin có thể được phát hành, lưu giữ, chia sẻ và kiểm tra trong môi trường số.

Đối với người mới, một hệ thống SSI có thể được hiểu thông qua bốn thành phần cơ bản: **mô hình tam giác tin cậy, thực chứng, ví định tín và khung quản trị**.

### Mô hình tam giác tin cậy

Nền tảng của SSI là mối quan hệ giữa ba bên:

* **Bên phát hành**
* **Bên nắm giữ**
* **Bên xác minh**

Ba bên này tạo thành một mô hình thường được gọi là **tam giác tin cậy**.

![Bên phát hành, bên nắm giữ và bên xác minh tạo thành tam giác tin cậy](/blog/dinh-danh-tu-chu-ssi-la-gi/decentralized-identity-trust-triangle-1440.webp)

*Hình 4. Tam giác tin cậy mô tả quan hệ giữa tổ chức phát hành, người nắm giữ thực chứng và tổ chức xác minh.*

Trong ví dụ về bằng tốt nghiệp:

* trường đại học là bên phát hành;
* Nhâm là bên nắm giữ;
* công ty tuyển dụng là bên xác minh.

**Bên phát hành** là tổ chức có thẩm quyền xác nhận một thông tin. Trường đại học xác nhận Nhâm đã hoàn thành chương trình học. Cơ quan nhà nước có thể xác nhận một người có giấy phép lái xe. Doanh nghiệp có thể xác nhận một người đang làm việc tại công ty.

**Bên nắm giữ** là người nhận và quản lý những xác nhận đó. Nhâm không tự tạo bằng tốt nghiệp cho mình, nhưng sau khi được trường cấp, Nhâm có thể lưu giữ và sử dụng nó khi cần.

**Bên xác minh** là tổ chức cần kiểm tra thông tin trước khi đưa ra quyết định. Công ty tuyển dụng kiểm tra bằng cấp trước khi nhận Nhâm vào làm. Ngân hàng có thể kiểm tra thông tin thu nhập trước khi phê duyệt khoản vay. Cơ sở đào tạo có thể kiểm tra bằng đại học trước khi tiếp nhận học viên cao học.

Điểm quan trọng của mô hình này là bên xác minh không nhất thiết phải liên hệ trực tiếp với bên phát hành trong mỗi lần kiểm tra.

Trường đại học cấp bằng cho Nhâm một lần. Sau đó, Nhâm có thể sử dụng bằng đó tại nhiều công ty khác nhau. Mỗi công ty có thể tự kiểm tra xem bằng có thực sự do trường cấp và có bị chỉnh sửa hay không.

Niềm tin vì vậy được truyền từ trường đại học đến công ty thông qua một bằng chứng mà Nhâm trực tiếp mang theo.

Tam giác tin cậy cũng cho thấy “tự chủ” không có nghĩa người dùng được quyền tự tuyên bố mọi thông tin về mình. Nhâm không thể tự khẳng định mình đã tốt nghiệp và yêu cầu công ty phải tin tưởng. Giá trị của thông tin vẫn đến từ trường đại học, nhưng Nhâm có quyền nắm giữ và chủ động sử dụng kết quả xác nhận đó.

### Thực chứng: bằng chứng số có thể kiểm tra

Thành phần trung tâm của SSI là **thực chứng**.

Có thể hiểu thực chứng là một bản xác nhận số do một tổ chức phát hành về một người, một tổ chức hoặc một đối tượng cụ thể.

Trong đời sống hiện nay, chúng ta đã sử dụng nhiều loại giấy tờ mang ý nghĩa tương tự:

* bằng tốt nghiệp xác nhận trình độ học vấn;
* giấy phép lái xe xác nhận quyền điều khiển phương tiện;
* thẻ nhân viên xác nhận quan hệ làm việc;
* chứng chỉ nghề nghiệp xác nhận một năng lực chuyên môn;
* giấy chứng nhận đăng ký doanh nghiệp xác nhận tư cách pháp lý của một tổ chức.

Trong SSI, những xác nhận này được biểu diễn dưới dạng dữ liệu số mà máy tính có thể đọc và kiểm tra. Một thực chứng bằng tốt nghiệp có thể chứa tên người được cấp, tên trường, chuyên ngành, loại bằng và ngày tốt nghiệp.

Khác biệt quan trọng giữa thực chứng và một tệp PDF thông thường nằm ở khả năng kiểm chứng.

Một file PDF có thể được sao chép hoặc chỉnh sửa. Người nhận thường phải kiểm tra bằng mắt, tra cứu trên một cổng thông tin hoặc liên hệ với đơn vị phát hành. Trong khi đó, thực chứng được tạo ra theo cách cho phép hệ thống kiểm tra:

* ai đã phát hành;
* nội dung có bị thay đổi hay không;
* thực chứng còn hợp lệ hay không.

Có thể hình dung thực chứng giống như một giấy tờ số được gắn một “con dấu” mà phần mềm có thể kiểm tra. Nếu nội dung bị sửa sau khi phát hành, việc kiểm tra sẽ không còn cho kết quả hợp lệ.

Thực chứng cũng có thể được tái sử dụng. Nhâm không cần xin trường cấp lại bằng mỗi khi ứng tuyển. Anh có thể sử dụng cùng một thực chứng tại nhiều nơi, miễn là thực chứng vẫn hợp lệ và bên tiếp nhận tin tưởng trường đã cấp bằng.

Một ưu điểm khác là người dùng không nhất thiết phải chia sẻ toàn bộ nội dung của thực chứng trong mọi tình huống.

Chẳng hạn, một dịch vụ chỉ cần biết người dùng đã đủ 18 tuổi. Theo cách thông thường, người dùng có thể phải cung cấp căn cước chứa cả họ tên, ngày sinh, quê quán và số định danh. Trong một hệ thống SSI phù hợp, người dùng có thể chỉ cung cấp bằng chứng rằng mình đã đủ tuổi mà không phải tiết lộ toàn bộ các thông tin còn lại.

Thực chứng vì thế không chỉ giúp số hóa giấy tờ. Nó thay đổi cách thông tin được chia sẻ: từ việc gửi toàn bộ tài liệu sang cung cấp đúng bằng chứng cần thiết cho một mục đích cụ thể.

### Ví định tín: nơi người dùng quản lý các thực chứng

Để nhận, lưu giữ và sử dụng thực chứng, người dùng cần một công cụ được gọi là **ví định tín**.

Ví định tín có thể là một ứng dụng trên điện thoại. Về hình thức, nó có thể gợi nhớ đến ví điện tử hoặc ứng dụng lưu giấy tờ, nhưng mục đích của nó không chỉ là hiển thị các bản sao kỹ thuật số.

Ví định tín giúp người dùng:

* nhận thực chứng từ các tổ chức;
* lưu giữ và sắp xếp thực chứng;
* xem ai đã phát hành;
* tiếp nhận yêu cầu xác minh;
* lựa chọn thông tin muốn chia sẻ;
* chấp thuận hoặc từ chối việc cung cấp thông tin.

Nhâm có thể lưu bằng tốt nghiệp, chứng chỉ ngoại ngữ và chứng nhận kinh nghiệm làm việc trong cùng một ví. Khi một công ty yêu cầu chứng minh trình độ, ví sẽ hiển thị công ty đang yêu cầu thông tin gì. Nhâm xem yêu cầu, lựa chọn thực chứng phù hợp và quyết định có chia sẻ hay không.

Điểm này khác với cách dữ liệu thường được quản lý trong các hệ thống tập trung.

Trong mô hình truyền thống, hồ sơ của Nhâm nằm trong cơ sở dữ liệu của trường, công ty tuyển dụng hoặc một nền tảng trực tuyến. Nhâm có thể truy cập hồ sơ thông qua tài khoản, nhưng quyền kiểm soát cuối cùng vẫn thuộc về tổ chức vận hành hệ thống.

Với ví định tín, các thực chứng được cấp cho Nhâm để anh có thể chủ động sử dụng trong nhiều quan hệ khác nhau. Nhâm không phải đăng nhập vào cổng thông tin của trường mỗi lần muốn chứng minh bằng cấp và cũng không cần yêu cầu trường gửi xác nhận riêng cho từng công ty.

Tuy nhiên, ví định tín không nên được hiểu đơn giản là nơi người dùng có thể lưu mọi loại thông tin mà không cần tổ chức nào xác nhận. Một nội dung chỉ có giá trị khi nó được phát hành bởi một bên đáng tin cậy và được bên tiếp nhận chấp nhận.

Ví trao cho người dùng quyền quản lý việc sử dụng thực chứng, nhưng không thay thế thẩm quyền của trường học, ngân hàng, doanh nghiệp hay cơ quan nhà nước.

### Khung quản trị: điều gì khiến một thực chứng được tin tưởng?

Một thực chứng có thể được kiểm tra về mặt kỹ thuật, nhưng điều đó chưa đủ để bảo đảm nó có giá trị trong thực tế.

Giả sử một tổ chức không được công nhận tự nhận mình là trường đại học và cấp bằng cho người dùng. Hệ thống vẫn có thể xác định rằng tấm bằng thực sự do tổ chức đó phát hành và nội dung không bị chỉnh sửa. Nhưng công ty tuyển dụng sẽ không chấp nhận tấm bằng nếu tổ chức phát hành không có thẩm quyền đào tạo và cấp bằng.

Vì vậy, một hệ thống SSI cần có **khung quản trị**.

Khung quản trị là tập hợp các quy tắc giúp các bên biết:

* tổ chức nào được phép phát hành một loại thực chứng;
* điều kiện nào phải được đáp ứng trước khi phát hành;
* bên xác minh nên tin tưởng những tổ chức nào;
* thực chứng có giá trị trong phạm vi nào;
* cách xử lý khi thực chứng được cấp sai hoặc cần thu hồi;
* trách nhiệm của mỗi bên khi xảy ra tranh chấp.

Trong lĩnh vực giáo dục, cơ quan quản lý có thể công nhận những trường nào được phép đào tạo và cấp bằng. Trong lĩnh vực tài chính, pháp luật quy định tổ chức nào được cung cấp dịch vụ ngân hàng hoặc thực hiện xác minh khách hàng. Trong lĩnh vực nghề nghiệp, một hiệp hội hoặc cơ quan chuyên môn có thể xác định điều kiện cấp chứng chỉ hành nghề.

Khung quản trị vì thế tạo nên phần “tin cậy” của hệ thống.

Công nghệ có thể giúp chứng minh một thực chứng do ai phát hành và có bị thay đổi hay không. Nhưng công nghệ không thể tự quyết định một trường đại học có được công nhận, một bác sĩ có đủ điều kiện hành nghề hay một tổ chức có quyền cấp giấy phép.

Những điều này phụ thuộc vào pháp luật, thẩm quyền, tiêu chuẩn chuyên môn và các quy tắc mà cộng đồng hoặc các tổ chức tham gia cùng chấp nhận.

Có thể nói một hệ thống SSI vận hành dựa trên sự kết hợp của ba yếu tố:

* **mật mã** giúp kiểm tra nguồn gốc và tính toàn vẹn của thông tin;
* **thẩm quyền** xác định ai có quyền đưa ra một xác nhận;
* **quy tắc minh bạch** xác định khi nào xác nhận đó được chấp nhận.

### Các thành phần phối hợp với nhau như thế nào?

Quay lại ví dụ của Nhâm, toàn bộ quá trình có thể được tóm tắt như sau.

Trường đại học, với tư cách là tổ chức được công nhận, phát hành một thực chứng bằng tốt nghiệp cho Nhâm. Nhâm nhận và lưu thực chứng trong ví định tín.

Khi Nhâm ứng tuyển, công ty gửi yêu cầu chứng minh trình độ học vấn. Nhâm xem yêu cầu trong ví và đồng ý chia sẻ những thông tin cần thiết.

Công ty kiểm tra thực chứng để xác định bằng có thực sự do trường phát hành, nội dung có bị thay đổi và bằng còn hợp lệ hay không. Sau đó, công ty dựa trên khung quản trị để xác định trường có được công nhận và loại bằng này có đáp ứng yêu cầu tuyển dụng hay không.

Mỗi thành phần đảm nhận một vai trò riêng:

* **tam giác tin cậy** xác định mối quan hệ giữa bên phát hành, bên nắm giữ và bên xác minh;
* **thực chứng** mang thông tin đã được xác nhận;
* **ví định tín** giúp người dùng nhận, quản lý và chia sẻ thực chứng;
* **khung quản trị** xác định ai có thẩm quyền và bằng chứng nào được chấp nhận.

Những thành phần này tạo nên nền tảng cơ bản của một hệ thống định danh tự chủ. Người dùng không còn phải dựa hoàn toàn vào những tài khoản nằm rải rác trên nhiều nền tảng. Thay vào đó, họ có thể trực tiếp nắm giữ những bằng chứng đáng tin cậy về mình và sử dụng chúng trong nhiều tình huống khác nhau.


## SSI khác gì so với các mô hình truyền thống?

| Tiêu chí                         | Định danh tập trung                                                | Định danh liên kết                                                             | Định danh tự chủ                                                                                           |
| -------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| **Cách hoạt động**               | Mỗi tổ chức tạo và quản lý một tài khoản riêng cho người dùng      | Một tài khoản có thể được dùng để đăng nhập vào nhiều dịch vụ đã liên kết      | Người dùng nhận và lưu giữ các thực chứng do những tổ chức có thẩm quyền phát hành                         |
| **Ví dụ quen thuộc**             | Tài khoản ngân hàng, tài khoản trường học, tài khoản mạng xã hội   | Đăng nhập bằng Google, Apple hoặc Microsoft                                    | Bằng tốt nghiệp, giấy phép hoặc chứng chỉ số được lưu trong ví định tín                                    |
| **Ai quản lý danh tính?**        | Tổ chức cung cấp dịch vụ                                           | Nhà cung cấp tài khoản đăng nhập                                               | Người dùng quản lý các thực chứng trong ví; tổ chức phát hành vẫn chịu trách nhiệm về nội dung đã xác nhận |
| **Khả năng sử dụng ở nơi khác**  | Thấp; thông tin thường chỉ có giá trị trong hệ thống đã tạo ra nó  | Chỉ sử dụng được tại những dịch vụ đã liên kết với nhà cung cấp danh tính      | Thực chứng có thể được trình bày cho nhiều tổ chức khác nhau nếu họ chấp nhận bên phát hành                |
| **Khi cần chứng minh thông tin** | Người dùng thường phải khai báo lại hoặc gửi bản chụp giấy tờ      | Dịch vụ nhận một số thông tin từ nhà cung cấp đăng nhập                        | Người dùng trực tiếp gửi thực chứng phù hợp từ ví định tín                                                 |
| **Mức độ chia sẻ dữ liệu**       | Thường phải cung cấp toàn bộ biểu mẫu hoặc giấy tờ                 | Chia sẻ những thông tin mà nhà cung cấp danh tính hỗ trợ                       | Có thể chỉ cung cấp những thông tin cần thiết cho từng mục đích                                            |
| **Sự phụ thuộc**                 | Phụ thuộc vào từng tổ chức quản lý tài khoản                       | Phụ thuộc nhiều vào nhà cung cấp đăng nhập trung gian                          | Không cần một nhà cung cấp danh tính trung gian tham gia vào mọi lần xác minh                              |

## Tài liệu tham khảo

- [W3C — Verifiable Credentials Data Model v2.0](https://www.w3.org/TR/vc-data-model-2.0/)
- [W3C — Decentralized Identifiers (DIDs) v1.0](https://www.w3.org/TR/did-core/)
- [OpenID Foundation — OpenID for Verifiable Credential Issuance 1.0](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html)
- [OpenID Foundation — OpenID for Verifiable Presentations 1.0](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)`,
    },
  },
} as const satisfies StructuredBlogArticle;

export type SsiBlogArticle = StructuredBlogArticle;
