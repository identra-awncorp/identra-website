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

export const EUDI_WALLET_2026_2027_BLOG_ARTICLE_ID =
  'eudi-wallet-buoc-vao-doi-song-2026-2027-va-buoc-ngoat-dinh-danh-so-tai-chau-au' as const;

const assetRoot = '/blog/eudi-wallet-buoc-vao-doi-song-2026-2027-va-buoc-ngoat-dinh-danh-so-tai-chau-au';

export const EUDI_WALLET_2026_2027_BLOG_ARTICLE = {
  id: EUDI_WALLET_2026_2027_BLOG_ARTICLE_ID,
  slug: EUDI_WALLET_2026_2027_BLOG_ARTICLE_ID,
  publishedAt: '2026-08-31',
  modifiedAt: '2026-08-31',
  author: {
    type: 'Organization',
    name: 'Identra',
  },
  topics: ['identity', 'privacy', 'international', 'compliance', 'technology'],
  industries: ['government', 'finance-fintech', 'technology'],
  contentLocales: ['vi'],
  relatedArticleIds: [
    'chau-au-dang-dan-dau-cuoc-chuyen-dich-sang-dinh-danh-tu-chu',
    'tu-gdpr-den-ssi-vi-sao-chau-au-lai-muon-trao-quyen-kiem-soat-du-lieu-cho-nguoi-dung',
    'dinh-danh-tu-chu-ssi-la-gi',
  ],
  coverImage: responsiveImage('eudi-wallet-everyday-life'),
  socialImage: {
    src: `${assetRoot}/eudi-wallet-2026-2027-og.jpg`,
    width: 1200,
    height: 630,
    type: 'image/jpeg',
  },
  listing: {
    en: {
      title: 'EUDI Wallet Enters Everyday Life: Europe\'s 2026–2027 Digital Identity Turning Point',
      description: 'How EUDI Wallet is moving from large-scale pilots to public services, private-sector adoption and cross-border use across Europe.',
      type: 'Digital identity',
      duration: '11 min read',
    },
    es: {
      title: 'EUDI Wallet llega a la vida cotidiana: el punto de inflexión de la identidad digital europea en 2026–2027',
      description: 'Cómo EUDI Wallet pasa de los pilotos a los servicios públicos, la adopción empresarial y el uso transfronterizo en Europa.',
      type: 'Identidad digital',
      duration: '11 min de lectura',
    },
    ja: {
      title: 'EUDI Walletが日常へ：2026～2027年、欧州デジタルIDの転換点',
      description: 'EUDI Walletが大規模実証から公共サービス、民間導入、欧州域内の越境利用へ進む過程を解説します。',
      type: 'デジタルID',
      duration: '読了11分',
    },
    de: {
      title: 'EUDI Wallet im Alltag: Europas Wendepunkt für digitale Identität 2026–2027',
      description: 'Wie sich die EUDI Wallet von Großpilotprojekten zu öffentlichen Diensten, Unternehmensintegration und grenzüberschreitender Nutzung entwickelt.',
      type: 'Digitale Identität',
      duration: '11 Min. Lesezeit',
    },
    vi: {
      title: 'EUDI Wallet bước vào đời sống: 2026–2027 và bước ngoặt của định danh số Châu Âu',
      description: 'EUDI Wallet đang chuyển từ thử nghiệm sang triển khai rộng rãi, mở ra giai đoạn mới cho dịch vụ công, giao dịch xuyên biên giới và định danh số tại châu Âu.',
      type: 'Định danh số',
      duration: 'Đọc trong 11 phút',
    },
  } satisfies Record<Locale, BlogArticleListingCopy>,
  images: {
    [`${assetRoot}/eudi-wallet-everyday-life-1440.webp`]:
      responsiveImage('eudi-wallet-everyday-life'),
    [`${assetRoot}/eudi-wallet-cross-border-services-1440.webp`]:
      responsiveImage('eudi-wallet-cross-border-services'),
    [`${assetRoot}/eudi-wallet-selective-disclosure-1440.webp`]:
      responsiveImage('eudi-wallet-selective-disclosure'),
    [`${assetRoot}/eudi-wallet-business-adoption-1440.webp`]:
      responsiveImage('eudi-wallet-business-adoption'),
  } satisfies Record<string, BlogArticleImage>,
  content: {
    vi: {
      title: 'EUDI Wallet bước vào đời sống: 2026–2027 và bước ngoặt của định danh số Châu Âu',
      description: 'EUDI Wallet đang chuyển từ thử nghiệm sang triển khai rộng rãi, mở ra giai đoạn mới cho dịch vụ công, giao dịch xuyên biên giới và định danh số tại châu Âu.',
      excerpt: 'Giai đoạn 2026–2027 sẽ cho thấy EUDI Wallet có thể đưa các nguyên tắc của định danh tự chủ vào dịch vụ công, hoạt động kinh tế và giao dịch xuyên biên giới ở quy mô châu lục như thế nào.',
      category: 'Định danh số',
      tags: ['EUDI Wallet', 'Định danh số', 'eIDAS 2.0', 'Định danh tự chủ', 'Quyền riêng tư'],
      readTimeMinutes: 11,
      ui: {
        publishedLabel: 'Xuất bản ngày',
        authorRole: 'Đội ngũ nội dung Identra',
        tableOfContents: 'Mục lục',
        openTableOfContents: 'Mở mục lục bài viết',
        closeTableOfContents: 'Đóng mục lục bài viết',
        ctaTitle: 'Sẵn sàng cho một hạ tầng định danh có thể tương tác',
        ctaDescription: 'Khám phá cách Identra giúp tổ chức phát hành, lưu giữ và xác minh thực chứng trong những quy trình số xuyên hệ thống.',
        ctaButtonLabel: 'Trải nghiệm demo',
      },
      tableOfContents: [
        {
          id: '1-2026-tu-thu-nghiem-den-trien-khai-rong-rai',
          label: '1. 2026: từ thử nghiệm đến triển khai rộng rãi',
          level: 2,
        },
        {
          id: '2-dieu-dang-chu-y-khong-nam-o-viec-dua-giay-to-len-dien-thoai',
          label: '2. Điều đáng chú ý không nằm ở việc đưa giấy tờ lên điện thoại',
          level: 2,
        },
        {
          id: '3-tu-nam-2027-trong-tam-chuyen-sang-cac-dich-vu-chap-nhan-eudi-wallet',
          label: '3. Từ năm 2027, trọng tâm chuyển sang các dịch vụ chấp nhận EUDI Wallet',
          level: 2,
        },
        {
          id: '4-quyen-rieng-tu-va-quyen-tu-chu-du-lieu-bai-toan-giua-ly-thuyet-va-thuc-thi',
          label: '4. Quyền riêng tư và quyền tự chủ dữ liệu: Bài toán giữa lý thuyết và thực thi',
          level: 2,
        },
        {
          id: '5-pham-vi-dang-bat-dau-mo-rong-sang-doanh-nghiep',
          label: '5. Phạm vi đang bắt đầu mở rộng sang doanh nghiệp',
          level: 2,
        },
        {
          id: '6-nhung-quoc-gia-khac-co-the-hoc-duoc-gi-tu-qua-trinh-nay',
          label: '6. Những quốc gia khác có thể học được gì từ quá trình này?',
          level: 2,
        },
        {
          id: '7-anh-huong-cua-eudi-wallet-co-the-khong-dung-lai-o-eu',
          label: '7. Ảnh hưởng của EUDI Wallet có thể không dừng lại ở EU',
          level: 2,
        },
      ] satisfies readonly BlogArticleTableOfContentsItem[],
      markdown: `Trong vài năm trở lại đây, châu Âu trở thành một trong những khu vực đáng chú ý nhất đối với sự phát triển của định danh tự chủ (SSI). Không phải vì những ý tưởng về SSI bắt nguồn từ đây, mà bởi Liên minh châu Âu đang đưa nhiều nguyên tắc của mô hình này vào một hạ tầng định danh có quy mô hàng trăm triệu người.

Trung tâm của quá trình đó là European Digital Identity Wallet, hay EUDI Wallet. Đây là ví định danh số mà các quốc gia thành viên EU sẽ cung cấp cho người dân, cho phép họ lưu giữ và sử dụng danh tính cùng những thông tin đã được xác nhận như bằng cấp, giấy phép hay chứng nhận trong các giao dịch số. Mỗi quốc gia có thể phát triển ví theo cách riêng, nhưng các ví phải tuân thủ một khuôn khổ chung để có thể được sử dụng giữa các quốc gia thành viên.

Sau nhiều năm xây dựng pháp lý, tiêu chuẩn kỹ thuật và thử nghiệm, EUDI Wallet đang tiến tới giai đoạn quan trọng nhất. Cuối năm 2026 là mốc các quốc gia thành viên phải cung cấp ví theo khuôn khổ mới; từ năm 2027, trọng tâm sẽ dần chuyển dịch sang việc đưa EUDI Wallet vào các dịch vụ công và hoạt động kinh tế thường ngày.

![Người dùng sử dụng EUDI Wallet tại sân bay, trường đại học và cơ sở y tế](/blog/eudi-wallet-buoc-vao-doi-song-2026-2027-va-buoc-ngoat-dinh-danh-so-tai-chau-au/eudi-wallet-everyday-life-1440.webp)

*Hình 1. EUDI Wallet được hướng tới như một phương tiện sử dụng danh tính và thông tin đã được xác nhận trong nhiều dịch vụ thường ngày.*

## 1. 2026: từ thử nghiệm đến triển khai rộng rãi

EUDI Wallet đã được thử nghiệm trong nhiều lĩnh vực, từ ngân hàng, thanh toán và giáo dục đến y tế, giao thông và dịch vụ công. Đến giữa năm 2026, sáu chương trình thử nghiệm quy mô lớn đã quy tụ khoảng 550 tổ chức công và tư tại 26 quốc gia thành viên EU, cùng Na Uy, Iceland và Ukraine.

Quy mô này khá khác với những dự án SSI thử nghiệm thường thấy trước đây. EUDI Wallet không chỉ được kiểm tra trong môi trường kỹ thuật mà đã được đưa vào những quy trình như mở tài khoản ngân hàng, sử dụng bằng cấp, giấy phép lái xe, xác minh độ tuổi và tiếp cận dịch vụ hành chính.

Theo lộ trình hiện tại, đến cuối năm 2026 các quốc gia thành viên phải cung cấp ít nhất một EUDI Wallet. Vì vậy, năm nay đánh dấu thời điểm quá trình chuẩn bị kéo dài nhiều năm bắt đầu chuyển sang triển khai rộng rãi.

Đối với SSI, đây là một cột mốc đáng chú ý. Những nguyên tắc từng chủ yếu xuất hiện trong tiêu chuẩn, dự án nghiên cứu và các chương trình thử nghiệm đang được đưa vào một hệ thống định danh chính thức ở quy mô châu lục.

## 2. Điều đáng chú ý không nằm ở việc đưa giấy tờ lên điện thoại

Nếu EUDI Wallet chỉ là nơi chứa phiên bản điện tử của căn cước, bằng lái hay bằng đại học, dự án này sẽ không khác quá nhiều so với nhiều chương trình số hóa giấy tờ đã tồn tại.

Điểm đáng chú ý hơn nằm ở khả năng sử dụng thông tin giữa các hệ thống và giữa các quốc gia.

Một sinh viên tốt nghiệp tại Hà Lan có thể sử dụng bằng cấp khi xin việc tại Đức. Một công dân Pháp có thể sử dụng thông tin định danh với một dịch vụ tại Tây Ban Nha. Tổ chức tiếp nhận có thể kiểm tra nguồn gốc và tính xác thực của thông tin mà không cần truy cập vào một cơ sở dữ liệu chung.

Đây cũng là một trong những lý do EUDI Wallet được nhắc đến nhiều trong cộng đồng SSI. Thay vì việc danh tính và những thông tin liên quan đến một người luôn nằm trong hệ thống của những nhà cung cấp dịch vụ, người dùng có thể được cấp thông tin đã được xác nhận và sử dụng lại khi cần.

Trong một liên minh gồm 27 quốc gia, khả năng này có ý nghĩa thực tế rất lớn. Thị trường chung của châu Âu đã giúp việc đi lại, học tập và kinh doanh xuyên biên giới trở nên thuận tiện hơn; EUDI Wallet được xây dựng để mở rộng sự thuận tiện đó sang các giao dịch số.

![Công dân sử dụng thông tin đã được xác nhận trong các dịch vụ xuyên biên giới tại châu Âu](/blog/eudi-wallet-buoc-vao-doi-song-2026-2027-va-buoc-ngoat-dinh-danh-so-tai-chau-au/eudi-wallet-cross-border-services-1440.webp)

*Hình 2. Khả năng sử dụng thông tin giữa các hệ thống và quốc gia là một giá trị cốt lõi của EUDI Wallet.*

## 3. Từ năm 2027, trọng tâm chuyển sang các dịch vụ chấp nhận EUDI Wallet

Việc phát hành ví cho hàng trăm triệu người dân chỉ là điều kiện cần. Yếu tố quyết định sự sống còn của EUDI Wallet nằm ở chỗ người dùng có thể thực sự sử dụng nó ở đâu trong đời sống thường nhật.

Từ năm 2027, áp lực sẽ chuyển dịch sang các bên tiếp nhận dữ liệu. Theo quy định của eIDAS 2.0:

- **Các cơ quan dịch vụ công** bắt buộc phải chấp nhận EUDI Wallet cho các thủ tục trực tuyến xuyên biên giới.
- **Các nền tảng số rất lớn (VLOPs)** như Google, Meta, Amazon cùng các dịch vụ tư nhân thuộc lĩnh vực thiết yếu (ngân hàng, viễn thông, năng lượng, giao thông) bắt buộc phải tích hợp phương thức xác thực bằng ví khi có yêu cầu nhận diện khách hàng mạnh mẽ.

Thách thức lớn nhất trong giai đoạn này không chỉ là công nghệ, mà là chi phí chuyển đổi và động lực thương mại. Doanh nghiệp sẽ phải điều chỉnh kiến trúc IT, nâng cấp cổng đăng nhập/xác minh và đào tạo quy trình vận hành.

Nếu các dịch vụ không đủ hấp dẫn hoặc việc tích hợp quá phức tạp, ví định danh số sẽ dễ rơi vào cái bẫy "có ứng dụng nhưng không ai dùng". Vì vậy, 2027 sẽ là năm bản lề để kiểm tra xem hệ sinh thái dịch vụ có đủ độ phủ để kéo người dùng thay đổi thói quen xác thực truyền thống hay không.

## 4. Quyền riêng tư và quyền tự chủ dữ liệu: Bài toán giữa lý thuyết và thực thi

Một trong những lý do lớn nhất khiến EUDI Wallet được kỳ vọng là khả năng đưa các nguyên tắc cốt lõi của SSI vào thực tế: bảo vệ quyền riêng tư và trao quyền kiểm soát dữ liệu cho người dùng.

EUDI Wallet được thiết kế dựa trên hai cơ chế bảo vệ quan trọng:

- **Tiết lộ có chọn lọc và Bằng chứng không tiết lộ tri thức:** Cho phép người dùng chứng minh một thuộc tính mà không để lộ các dữ liệu nhạy cảm khác. Ví dụ, khi vào quán bar hoặc mua hàng giới hạn độ tuổi, người dùng chỉ cần chứng minh "trên 18 tuổi" mà không cần hiển thị họ tên đầy đủ, ngày sinh hay địa chỉ nhà.
- **Chống liên kết:** Ngăn chặn các nhà cung cấp dịch vụ hay chính phủ theo dõi thói quen, hành vi của người dùng trên các nền tảng khác nhau bằng một mã định danh duy nhất xuyên suốt.

Tuy nhiên, ranh giới giữa bảo vệ quyền riêng tư trên giấy tờ và an toàn trong thực tế luôn tồn tại khoảng cách. Các chuyên gia bảo mật và cộng đồng mã nguồn mở vẫn đang theo dõi sát sao cách các quốc gia thành viên hiện thực hóa kiến trúc kỹ thuật. Nếu việc triển khai để lộ lỗ hổng giám sát tập trung hoặc bắt buộc người dùng sử dụng ví ngoài ý muốn, niềm tin của công chúng vào toàn bộ hệ thống định danh số sẽ bị ảnh hưởng nghiêm trọng.

![Người dùng chứng minh một thuộc tính cần thiết mà không chia sẻ toàn bộ dữ liệu định danh](/blog/eudi-wallet-buoc-vao-doi-song-2026-2027-va-buoc-ngoat-dinh-danh-so-tai-chau-au/eudi-wallet-selective-disclosure-1440.webp)

*Hình 3. Tiết lộ có chọn lọc và bằng chứng không tiết lộ tri thức giúp giảm dữ liệu phải chia sẻ trong mỗi giao dịch.*

## 5. Phạm vi đang bắt đầu mở rộng sang doanh nghiệp

Cuối năm 2025, Ủy ban châu Âu tiếp tục đề xuất European Business Wallets dành cho doanh nghiệp và cơ quan công quyền.

Đề xuất này hiện vẫn đang trong quá trình lập pháp, nhưng nó cho thấy phạm vi của mô hình wallet tại châu Âu đang được mở rộng. Doanh nghiệp cũng có nhu cầu chứng minh tư cách pháp lý, quyền đại diện, giấy phép hoạt động hay những thông tin cần thiết khi giao dịch với một tổ chức khác.

Nếu EUDI Wallet giúp một cá nhân sử dụng những thông tin đã được xác nhận về mình, Business Wallet hướng tới một vấn đề tương tự ở cấp tổ chức.

Điều này đưa câu chuyện SSI tại châu Âu ra khỏi phạm vi định danh cá nhân. Một hệ thống có thể bắt đầu với danh tính, sau đó mở rộng sang bằng cấp, giấy phép, quyền hạn, tư cách doanh nghiệp và những thông tin cần thiết cho các giao dịch số.

Đến lúc đó, giá trị của mô hình không còn nằm ở chiếc ví mà ở khả năng các bên sử dụng thông tin của nhau mà không phải liên tục thực hiện lại toàn bộ quy trình xác minh.

![Doanh nghiệp chuyển từ dữ liệu định danh phân tán trong nhiều hệ thống sang mô hình do chủ thể kiểm soát](/blog/eudi-wallet-buoc-vao-doi-song-2026-2027-va-buoc-ngoat-dinh-danh-so-tai-chau-au/eudi-wallet-business-adoption-1440.webp)

*Hình 4. European Business Wallets mở rộng cách tiếp cận dựa trên thông tin có thể kiểm chứng từ cá nhân sang tổ chức.*

## 6. Những quốc gia khác có thể học được gì từ quá trình này?

EUDI Wallet được xây dựng cho những điều kiện rất riêng của Liên minh châu Âu, vì vậy việc sao chép nguyên mẫu sang một quốc gia khác chưa chắc là lựa chọn phù hợp.

Nhưng quá trình triển khai tại EU lại mang đến một nguồn kinh nghiệm hiếm có.

Trong vài năm tới, chúng ta sẽ thấy rõ hơn những tiêu chuẩn nào hoạt động tốt khi triển khai ở quy mô lớn, những vấn đề nào xuất hiện khi nhiều loại ví cùng tồn tại, doanh nghiệp mất bao nhiêu công sức để tích hợp và những trường hợp sử dụng nào đủ hữu ích để người dân thay đổi thói quen.

Đây là những câu hỏi mà bất kỳ quốc gia nào muốn phát triển SSI ở quy mô lớn rồi cũng phải trả lời.

Các quốc gia đi sau vì vậy có thể lựa chọn những thành phần đã được kiểm chứng thay vì phải tự thử nghiệm mọi thứ từ đầu. Những bài học về tiêu chuẩn, quyền riêng tư, quản trị và khả năng tương tác có thể còn có giá trị hơn bản thân EUDI Wallet.

Với những thị trường đang trong quá trình xây dựng hạ tầng định danh số, đây là một lợi thế đáng kể.

## 7. Ảnh hưởng của EUDI Wallet có thể không dừng lại ở EU

Chưa có cơ sở để cho rằng EUDI Wallet sẽ trở thành một mô hình chung cho toàn thế giới. Mỗi quốc gia có luật pháp, hệ thống định danh và cách tổ chức hạ tầng số khác nhau.

Tuy nhiên, nếu EUDI Wallet được sử dụng rộng rãi, ảnh hưởng của nó khó chỉ giới hạn trong châu Âu.

Các doanh nghiệp quốc tế hoạt động tại EU sẽ phải hỗ trợ những tiêu chuẩn và quy trình mới. Các nhà cung cấp công nghệ sẽ đưa chúng vào sản phẩm. Những giao thức đã được triển khai ở quy mô lớn cũng có nhiều khả năng được lựa chọn trong những dự án tại các thị trường khác hơn các công nghệ mới chỉ tồn tại trên giấy.

Quan trọng hơn, EUDI Wallet sẽ cung cấp một trường hợp thực tế để đánh giá xem những nguyên tắc của SSI có thể vận hành như thế nào khi được đưa vào một nền kinh tế lớn.

Châu Âu từng tạo ra ảnh hưởng tương tự trong lĩnh vực bảo vệ dữ liệu với GDPR. EUDI Wallet có đi theo con đường đó hay không còn phụ thuộc vào mức độ sử dụng thực tế sau 2026, nhưng đây là một khả năng đáng theo dõi.

Nếu các ví được sử dụng thường xuyên, nếu doanh nghiệp tích hợp chúng vào những quy trình thực tế và khả năng tương tác xuyên biên giới hoạt động như kỳ vọng, SSI sẽ có một tiền lệ rất khác so với những dự án thử nghiệm trước đây.

Khi đó, điều đáng chú ý nhất về EUDI Wallet có lẽ không còn là bản thân chiếc ví, mà là việc châu Âu đã chứng minh được rằng một cách tiếp cận mới đối với danh tính và dữ liệu có thể được triển khai trên quy mô của cả một thị trường chung.

Đối với những quốc gia đang bắt đầu nghiên cứu SSI, đây có thể là thời điểm thích hợp để quan sát thật kỹ những gì đang diễn ra tại châu Âu.`,
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
