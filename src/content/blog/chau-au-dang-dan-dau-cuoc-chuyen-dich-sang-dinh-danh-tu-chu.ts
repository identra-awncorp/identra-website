/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Locale } from '../../types/routes';
import type {
  BlogArticleImage,
  BlogArticleListingCopy,
  BlogArticleTableOfContentsItem,
  StructuredBlogArticle,
} from './structuredBlogArticleModel';

export const EUROPE_SSI_SHIFT_BLOG_ARTICLE_ID =
  'chau-au-dang-dan-dau-cuoc-chuyen-dich-sang-dinh-danh-tu-chu' as const;

const assetRoot = '/blog/chau-au-dang-dan-dau-cuoc-chuyen-dich-sang-dinh-danh-tu-chu';

export const EUROPE_SSI_SHIFT_BLOG_ARTICLE = {
  id: EUROPE_SSI_SHIFT_BLOG_ARTICLE_ID,
  slug: EUROPE_SSI_SHIFT_BLOG_ARTICLE_ID,
  publishedAt: '2026-08-04',
  modifiedAt: '2026-08-04',
  author: {
    type: 'Organization',
    name: 'Identra',
  },
  topics: ['identity', 'privacy', 'international'],
  industries: ['government'],
  contentLocales: ['vi'],
  relatedArticleIds: [
    'eudi-wallet-buoc-vao-doi-song-2026-2027-va-buoc-ngoat-dinh-danh-so-tai-chau-au',
    'tu-gdpr-den-ssi-vi-sao-chau-au-lai-muon-trao-quyen-kiem-soat-du-lieu-cho-nguoi-dung',
    'ssi-blockchain-va-tuong-lai-xuat-khau-hang-hoa-viet-nam-sang-eu',
  ],
  coverImage: {
    src: `${assetRoot}/eudi-wallet-europe-identity-1440.webp`,
    srcSet: [
      `${assetRoot}/eudi-wallet-europe-identity-800.webp 800w`,
      `${assetRoot}/eudi-wallet-europe-identity-1440.webp 1440w`,
    ].join(', '),
    sizes: '(min-width: 1024px) 680px, (min-width: 768px) 55vw, 100vw',
    width: 1440,
    height: 810,
  },
  socialImage: {
    src: `${assetRoot}/${EUROPE_SSI_SHIFT_BLOG_ARTICLE_ID}-og.jpg`,
    width: 1200,
    height: 630,
    type: 'image/jpeg',
  },
  listing: {
    en: {
      title: 'Europe Is Leading the Shift Toward Self-Sovereign Identity',
      description: 'How the EUDI Wallet is bringing user-held digital identity and verifiable credentials into a shared legal and technical framework across the EU.',
      type: 'Digital identity',
      duration: '8 min read',
    },
    es: {
      title: 'Europa lidera la transición hacia la identidad autosoberana',
      description: 'Cómo EUDI Wallet lleva la identidad digital controlada por el usuario y las credenciales verificables a un marco común en toda la UE.',
      type: 'Identidad digital',
      duration: '8 min de lectura',
    },
    ja: {
      title: '欧州が自己主権型アイデンティティへの移行をリードしている',
      description: 'EUDI Walletが、利用者主体のデジタルIDと検証可能なクレデンシャルをEU共通の法的・技術的枠組みに導入する動きを解説します。',
      type: 'デジタルアイデンティティ',
      duration: '読了8分',
    },
    de: {
      title: 'Europa führt den Wandel zur selbstbestimmten Identität an',
      description: 'Wie die EUDI Wallet nutzerverwaltete digitale Identitäten und überprüfbare Nachweise in einen gemeinsamen EU-Rahmen überführt.',
      type: 'Digitale Identität',
      duration: '8 Min. Lesezeit',
    },
    vi: {
      title: 'Châu Âu đang dẫn đầu cuộc chuyển dịch sang định danh tự chủ',
      description: 'Liên minh châu Âu đang đưa các nguyên tắc của định danh tự chủ từ nghiên cứu và thử nghiệm vào khuôn khổ pháp lý, tiêu chuẩn và hạ tầng số quy mô lớn.',
      type: 'Định danh số',
      duration: 'Đọc trong 8 phút',
    },
  } satisfies Record<Locale, BlogArticleListingCopy>,
  images: {
    [`${assetRoot}/eudi-wallet-europe-identity-1440.webp`]: responsiveImage(
      'eudi-wallet-europe-identity',
    ),
    [`${assetRoot}/verifiable-credentials-user-control-1440.webp`]: responsiveImage(
      'verifiable-credentials-user-control',
    ),
    [`${assetRoot}/cross-border-eu-digital-identity-1440.webp`]: responsiveImage(
      'cross-border-eu-digital-identity',
    ),
  } satisfies Record<string, BlogArticleImage>,
  content: {
    vi: {
      title: 'Châu Âu đang dẫn đầu cuộc chuyển dịch sang định danh tự chủ',
      description: 'Liên minh châu Âu đang đưa các nguyên tắc của định danh tự chủ từ nghiên cứu và thử nghiệm vào khuôn khổ pháp lý, tiêu chuẩn và hạ tầng số quy mô lớn.',
      excerpt: 'EUDI Wallet cho phép người dùng lưu giữ và chủ động sử dụng danh tính, bằng cấp, giấy phép cùng các thực chứng khác giữa nhiều dịch vụ và quốc gia.',
      category: 'Định danh số',
      tags: ['Định danh tự chủ', 'EUDI Wallet', 'Liên minh châu Âu', 'Thực chứng'],
      readTimeMinutes: 8,
      ui: {
        publishedLabel: 'Xuất bản ngày',
        authorRole: 'Đội ngũ nội dung Identra',
        tableOfContents: 'Mục lục',
        openTableOfContents: 'Mở mục lục bài viết',
        closeTableOfContents: 'Đóng mục lục bài viết',
        ctaTitle: 'Xây dựng hạ tầng định danh lấy người dùng làm trung tâm',
        ctaDescription: 'Khám phá cách Identra giúp tổ chức phát hành, lưu giữ và kiểm tra thực chứng giữa nhiều hệ thống.',
        ctaButtonLabel: 'Trải nghiệm demo',
      },
      tableOfContents: [
        {
          id: 'eudi-wallet-va-mot-cach-tiep-can-moi-voi-danh-tinh-so',
          label: 'EUDI Wallet và một cách tiếp cận mới với danh tính số',
          level: 2,
        },
        {
          id: 'vi-sao-nhung-gi-dang-dien-ra-tai-chau-au-lai-dang-chu-y',
          label: 'Vì sao những gì đang diễn ra tại châu Âu lại đáng chú ý?',
          level: 2,
        },
        {
          id: 'tu-y-tuong-ve-ssi-den-ha-tang-so-trong-doi-song-thuc',
          label: 'Từ ý tưởng về SSI đến hạ tầng số trong đời sống thực',
          level: 2,
        },
      ] satisfies BlogArticleTableOfContentsItem[],
      markdown: `Trong thế giới số hiện nay, việc chứng minh mình là ai vẫn là một trải nghiệm khá rời rạc. Khi mở tài khoản ngân hàng, đăng ký một dịch vụ trực tuyến, nhập học, xin việc hay thực hiện thủ tục hành chính, người dùng thường phải lặp lại cùng một quy trình: điền thông tin cá nhân, tải lên giấy tờ tùy thân, cung cấp bằng cấp hoặc chứng chỉ, sau đó chờ tổ chức tiếp nhận, xác minh. Mỗi cơ quan, doanh nghiệp hay nền tảng lại xây dựng một hồ sơ riêng về người dùng, khiến danh tính số của một cá nhân bị phân mảnh trong rất nhiều hệ thống khác nhau.

Cách làm này đã tồn tại trong nhiều năm và phần lớn chúng ta coi đó là điều hiển nhiên. Nhưng nó cũng tạo ra không ít bất tiện. Người dùng phải liên tục cung cấp lại cùng một loại thông tin, trong khi các tổ chức phải tự xây dựng quy trình thu thập, lưu trữ và xác minh dữ liệu. Càng nhiều dịch vụ số xuất hiện, lượng dữ liệu cá nhân bị sao chép và lưu giữ ở nhiều nơi càng lớn. Điều đó không chỉ làm tăng chi phí vận hành mà còn khiến vấn đề quyền riêng tư và bảo mật trở nên phức tạp hơn.

Một cách tiếp cận khác đang dần hình thành. Thay vì để mỗi tổ chức giữ một phiên bản danh tính của người dùng, những thông tin đã được một bên đáng tin cậy xác nhận có thể được trao lại cho chính người dùng để họ chủ động sử dụng khi cần. Có thể hình dung điều này giống như cách chúng ta sử dụng giấy tờ trong thế giới vật lý. Một trường đại học cấp bằng tốt nghiệp cho sinh viên; sau đó, sinh viên có thể mang tấm bằng đó đi xin việc ở nhiều nơi khác nhau mà không cần trường đại học phải trực tiếp tham gia vào từng lần chứng minh.

Trong thế giới số, ý tưởng này là một phần quan trọng của mô hình định danh tự chủ, hay Self-Sovereign Identity. Thay vì coi người dùng đơn thuần là một bản ghi nằm trong cơ sở dữ liệu của một tổ chức, mô hình này hướng đến việc trao cho cá nhân nhiều quyền kiểm soát hơn đối với danh tính và những thông tin đã được xác nhận về mình. Sau nhiều năm chủ yếu xuất hiện trong các nghiên cứu, tiêu chuẩn và dự án thử nghiệm, những nguyên tắc đó đang bắt đầu được triển khai ở quy mô lớn hơn. Liên minh châu Âu hiện là một trong những khu vực thể hiện rõ nhất xu hướng này.

![EUDI Wallet kết nối danh tính số với nhiều dịch vụ tại Liên minh châu Âu](/blog/chau-au-dang-dan-dau-cuoc-chuyen-dich-sang-dinh-danh-tu-chu/eudi-wallet-europe-identity-1440.webp)

*Hình 1. EUDI Wallet hướng đến việc giúp người dùng mang theo và sử dụng thông tin định danh đáng tin cậy trong nhiều bối cảnh khác nhau.*

## EUDI Wallet và một cách tiếp cận mới với danh tính số

Năm 2024, khuôn khổ định danh điện tử mới của Liên minh châu Âu chính thức có hiệu lực, trong đó European Digital Identity Wallet, thường được gọi là EUDI Wallet, giữ một vị trí trung tâm. Theo kế hoạch triển khai của EU, các quốc gia thành viên sẽ cung cấp ví định danh số cho công dân, cư dân và doanh nghiệp đủ điều kiện sử dụng. Mục tiêu không đơn giản là đưa các loại giấy tờ truyền thống lên điện thoại, mà là xây dựng một phương thức mới để con người lưu giữ và sử dụng những thông tin đáng tin cậy về chính mình trong môi trường số.

Một chiếc ví như vậy có thể chứa nhiều loại thông tin khác nhau, từ danh tính, giấy phép lái xe đến bằng cấp, chứng chỉ nghề nghiệp và các giấy tờ điện tử khác. Người dùng có thể sử dụng chúng khi tiếp cận dịch vụ công, mở tài khoản ngân hàng, đăng ký học, xin việc hoặc thực hiện nhiều giao dịch số khác. Điểm quan trọng nằm ở chỗ những thông tin này không nhất thiết phải bị khóa trong hệ thống của tổ chức đã cấp ra chúng. Chúng có thể đi theo người dùng và được sử dụng ở những nơi khác khi cần thiết.

Hãy lấy bằng tốt nghiệp làm ví dụ. Trong mô hình quen thuộc hiện nay, một trường đại học lưu thông tin sinh viên trong hệ thống của mình. Khi sinh viên xin việc, họ thường gửi một bản sao bằng tốt nghiệp cho doanh nghiệp. Nhà tuyển dụng sau đó phải tìm cách kiểm tra xem tài liệu đó có chính xác hay không, đôi khi bằng cách liên hệ lại với trường hoặc sử dụng một dịch vụ xác minh trung gian. Nếu người đó ứng tuyển vào nhiều công ty, quy trình tương tự có thể phải lặp lại nhiều lần.

Với cách tiếp cận mới, trường đại học có thể cấp bằng tốt nghiệp dưới dạng một thực chứng cho sinh viên. Sinh viên lưu nó trong ví định danh và chủ động sử dụng khi cần chứng minh trình độ. Nhà tuyển dụng có thể kiểm tra tính xác thực của thông tin mà không phải dựa vào một bản scan hay yêu cầu trường đại học xác nhận lại từng trường hợp. Một thông tin đã được xác nhận, vì thế, có thể trở nên hữu ích trong nhiều bối cảnh khác nhau.

Sự thay đổi này tưởng như chỉ là một cải tiến về sự tiện lợi, nhưng thực chất phản ánh một thay đổi sâu hơn trong kiến trúc của danh tính số. Internet hiện nay phần lớn vẫn vận hành theo mô hình “hồ sơ của bạn trong hệ thống của tôi”. Ngân hàng có một hồ sơ về bạn, trường đại học có một hồ sơ khác, cơ quan nhà nước có một hồ sơ khác nữa, trong khi mỗi nền tảng trực tuyến lại duy trì một tài khoản riêng. Trong mô hình mà EUDI Wallet đang hướng tới, một phần của mối quan hệ đó được đảo ngược: thông tin có thể được xác nhận bởi một tổ chức nhưng sau đó được trao cho người dùng để họ mang theo và sử dụng.

Điều này cũng mở ra khả năng giảm lượng dữ liệu mà người dùng phải chia sẻ trong từng tình huống. Nếu một dịch vụ chỉ cần biết một người đã đủ tuổi theo quy định, họ không nhất thiết phải biết toàn bộ họ tên, ngày sinh, địa chỉ hay số giấy tờ của người đó. Nếu một nhà tuyển dụng chỉ cần biết ứng viên đã tốt nghiệp một chương trình cụ thể, họ cũng không nhất thiết cần truy cập toàn bộ hồ sơ học tập. Khi thông tin được tổ chức theo cách linh hoạt hơn, việc chứng minh một thuộc tính không còn đồng nghĩa với việc phải cung cấp nhiều dữ liệu hơn mức cần thiết.

![Người dùng nhận lưu giữ và trình bày thực chứng để tổ chức tiếp nhận kiểm tra](/blog/chau-au-dang-dan-dau-cuoc-chuyen-dich-sang-dinh-danh-tu-chu/verifiable-credentials-user-control-1440.webp)

*Hình 2. Thực chứng cho phép thông tin đã được một tổ chức xác nhận đi theo người dùng và được kiểm tra ở những nơi khác.*

## Vì sao những gì đang diễn ra tại châu Âu lại đáng chú ý?

Ý tưởng về việc người dùng nắm giữ và chủ động sử dụng thông tin định danh không phải là mới. Cộng đồng nghiên cứu về định danh phi tập trung và định danh tự chủ đã phát triển những mô hình tương tự trong nhiều năm. Điều khiến châu Âu trở nên đặc biệt không nằm ở việc phát minh ra ý tưởng đó, mà ở khả năng đưa nó vào một khuôn khổ pháp lý và triển khai trên quy mô của cả một liên minh gồm nhiều quốc gia.

Đây là một khác biệt rất lớn. Một hệ thống định danh số chỉ thực sự tạo ra giá trị khi thông tin được chấp nhận ở nhiều nơi. Nếu một chiếc ví chỉ có thể sử dụng với một vài dịch vụ riêng lẻ, lợi ích của nó sẽ nhanh chóng bị giới hạn. Nhưng nếu cùng một thông tin có thể được sử dụng trong ngân hàng, trường học, cơ quan nhà nước và doanh nghiệp, thậm chí giữa nhiều quốc gia khác nhau, nó có thể dần trở thành một phần của hạ tầng số chung.

Đó cũng là lý do khả năng tương tác xuyên biên giới giữ vai trò quan trọng trong chiến lược của EU. Một sinh viên học tại một quốc gia có thể sử dụng bằng cấp của mình khi xin việc hoặc tiếp tục học tập tại một quốc gia khác. Một công dân có thể sử dụng danh tính số để tiếp cận các dịch vụ ngoài nơi mình sinh sống. Một doanh nghiệp cũng có thể giảm đáng kể công việc xác minh nếu có thể tin tưởng vào những thông tin đã được cấp trong một khuôn khổ chung.

Trước khi triển khai rộng rãi, Liên minh châu Âu đã tiến hành nhiều chương trình thử nghiệm quy mô lớn với sự tham gia của chính phủ, ngân hàng, trường đại học, doanh nghiệp và các tổ chức công nghệ. Các tình huống thử nghiệm trải rộng từ dịch vụ công, giáo dục và tài chính đến giao thông, y tế và thanh toán. Điều đó cho thấy EU không xem ví định danh chỉ như một công cụ dành cho một vài thủ tục hành chính, mà như một thành phần có thể hiện diện trong nhiều hoạt động của nền kinh tế số.

Nếu mô hình này thành công, ảnh hưởng của nó có thể vượt xa phạm vi của các cơ quan nhà nước. Các ngân hàng sẽ phải suy nghĩ lại về cách khách hàng chứng minh danh tính. Các trường đại học sẽ có những phương thức mới để cấp và xác minh văn bằng. Doanh nghiệp có thể thay đổi cách kiểm tra thông tin ứng viên. Các nền tảng trực tuyến cũng có thể phải đặt lại câu hỏi về việc họ thực sự cần thu thập và lưu trữ bao nhiêu dữ liệu của người dùng.

Quan trọng hơn, quy mô của thị trường châu Âu có thể khiến những thay đổi này lan rộng ra bên ngoài EU. Khi hàng trăm triệu người sử dụng một mô hình định danh mới và các doanh nghiệp lớn phải hỗ trợ nó, những tiêu chuẩn được áp dụng tại châu Âu có khả năng dần ảnh hưởng đến sản phẩm và dịch vụ trên toàn cầu. Điều này không có nghĩa là thế giới chắc chắn sẽ sao chép mô hình của EU, nhưng châu Âu từng cho thấy khả năng định hình cách ngành công nghệ toàn cầu tiếp cận các vấn đề như quyền riêng tư và bảo vệ dữ liệu. Danh tính số có thể trở thành một lĩnh vực tiếp theo mà ảnh hưởng đó được thể hiện.

![Danh tính số và thực chứng được sử dụng xuyên biên giới giữa các quốc gia châu Âu](/blog/chau-au-dang-dan-dau-cuoc-chuyen-dich-sang-dinh-danh-tu-chu/cross-border-eu-digital-identity-1440.webp)

*Hình 3. Khả năng tương tác xuyên biên giới giúp cùng một thông tin đáng tin cậy được chấp nhận trong nhiều dịch vụ và quốc gia.*

## Từ ý tưởng về SSI đến hạ tầng số trong đời sống thực

Trong nhiều năm, người dùng Internet đã quen với việc mỗi dịch vụ tạo ra một phiên bản riêng của chúng ta. Muốn sử dụng một hệ thống mới, chúng ta tạo một tài khoản mới, cung cấp dữ liệu một lần nữa và tiếp tục để lại thêm một bản sao về danh tính của mình ở đâu đó trên mạng. Hướng đi đang được châu Âu theo đuổi đặt ra một khả năng khác: thay vì liên tục tạo lại danh tính trong từng hệ thống, mỗi người có thể mang theo những bằng chứng đáng tin cậy về chính mình và sử dụng chúng khi cần.

Sự thay đổi này sẽ không diễn ra trong một sớm một chiều, và chắc chắn còn nhiều vấn đề cần được giải quyết trước khi một mô hình như vậy trở thành điều bình thường trong đời sống số. Nhưng việc một thị trường có quy mô như Liên minh châu Âu đưa những nguyên tắc này từ các dự án thử nghiệm vào luật pháp, tiêu chuẩn và hạ tầng thực tế đã là một dấu hiệu quan trọng.

Sau nhiều năm được nói đến như một phần của tương lai của Internet, định danh tự chủ đang dần tiến gần hơn đến đời sống hàng ngày. Và ở thời điểm hiện tại, châu Âu đang là một trong những nơi rõ ràng nhất để quan sát quá trình chuyển dịch đó.`,
    },
  },
} as const satisfies StructuredBlogArticle;

function responsiveImage(name: string): BlogArticleImage {
  return {
    src: `${assetRoot}/${name}-1440.webp`,
    srcSet: [
      `${assetRoot}/${name}-800.webp 800w`,
      `${assetRoot}/${name}-1440.webp 1440w`,
    ].join(', '),
    sizes: '(min-width: 1024px) 768px, calc(100vw - 3rem)',
    width: 1440,
    height: 810,
  };
}

