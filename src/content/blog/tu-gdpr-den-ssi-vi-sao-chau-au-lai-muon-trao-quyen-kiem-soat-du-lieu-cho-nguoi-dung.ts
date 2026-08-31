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

export const GDPR_TO_SSI_EU_DATA_CONTROL_BLOG_ARTICLE_ID =
  'tu-gdpr-den-ssi-vi-sao-chau-au-lai-muon-trao-quyen-kiem-soat-du-lieu-cho-nguoi-dung' as const;

const assetRoot = '/blog/tu-gdpr-den-ssi-vi-sao-chau-au-lai-muon-trao-quyen-kiem-soat-du-lieu-cho-nguoi-dung';

export const GDPR_TO_SSI_EU_DATA_CONTROL_BLOG_ARTICLE = {
  id: GDPR_TO_SSI_EU_DATA_CONTROL_BLOG_ARTICLE_ID,
  slug: GDPR_TO_SSI_EU_DATA_CONTROL_BLOG_ARTICLE_ID,
  publishedAt: '2026-08-31',
  modifiedAt: '2026-08-31',
  author: {
    type: 'Organization',
    name: 'Identra',
  },
  topics: ['privacy', 'compliance', 'identity', 'international'],
  industries: ['all'],
  contentLocales: ['vi'],
  relatedArticleIds: [
    'eudi-wallet-buoc-vao-doi-song-2026-2027-va-buoc-ngoat-dinh-danh-so-tai-chau-au',
    'chau-au-dang-dan-dau-cuoc-chuyen-dich-sang-dinh-danh-tu-chu',
    'dinh-danh-tu-chu-ssi-la-gi',
  ],
  coverImage: responsiveImage('gdpr-data-control-cover'),
  socialImage: {
    src: `${assetRoot}/gdpr-to-ssi-eu-data-control-og.jpg`,
    width: 1200,
    height: 630,
    type: 'image/jpeg',
  },
  listing: {
    en: {
      title: 'From GDPR to SSI: Why Europe Wants Users to Control Their Data',
      description: 'How Europe is carrying the data rights established by GDPR into digital identity infrastructure through SSI and the EUDI Wallet.',
      type: 'Privacy',
      duration: '13 min read',
    },
    es: {
      title: 'Del GDPR a SSI: por qué Europa devuelve al usuario el control de sus datos',
      description: 'Cómo Europa lleva los derechos de datos del GDPR a la infraestructura de identidad digital mediante SSI y EUDI Wallet.',
      type: 'Privacidad',
      duration: '13 min de lectura',
    },
    ja: {
      title: 'GDPRからSSIへ：欧州がデータ管理を利用者に戻そうとする理由',
      description: 'GDPRが定めたデータの権利を、SSIとEUDI Walletを通じてデジタルID基盤へ組み込む欧州の動きを解説します。',
      type: 'プライバシー',
      duration: '読了13分',
    },
    de: {
      title: 'Von der DSGVO zu SSI: Warum Europa Nutzern die Kontrolle über ihre Daten geben will',
      description: 'Wie Europa die in der DSGVO verankerten Datenrechte mit SSI und der EUDI Wallet in die digitale Identitätsinfrastruktur überführt.',
      type: 'Datenschutz',
      duration: '13 Min. Lesezeit',
    },
    vi: {
      title: 'Từ GDPR đến SSI: Vì sao Châu Âu muốn trao lại quyền kiểm soát dữ liệu cho người dùng',
      description: 'Từ các quyền dữ liệu trong GDPR đến EUDI Wallet, châu Âu đang đưa quyền kiểm soát của người dùng từ khuôn khổ pháp lý vào kiến trúc danh tính số.',
      type: 'Quyền riêng tư',
      duration: 'Đọc trong 13 phút',
    },
  } satisfies Record<Locale, BlogArticleListingCopy>,
  images: {
    [`${assetRoot}/gdpr-data-control-cover-1440.webp`]:
      responsiveImage('gdpr-data-control-cover'),
    [`${assetRoot}/eu-cross-border-identity-1440.webp`]:
      responsiveImage('eu-cross-border-identity'),
    [`${assetRoot}/eu-ssi-infrastructure-1440.webp`]:
      responsiveImage('eu-ssi-infrastructure'),
    [`${assetRoot}/eudi-wallet-data-control-1440.webp`]:
      responsiveImage('eudi-wallet-data-control'),
  } satisfies Record<string, BlogArticleImage>,
  content: {
    vi: {
      title: 'Từ GDPR đến SSI: Vì sao Châu Âu muốn trao lại quyền kiểm soát dữ liệu cho người dùng',
      description: 'Từ các quyền dữ liệu trong GDPR đến EUDI Wallet, châu Âu đang đưa quyền kiểm soát của người dùng từ khuôn khổ pháp lý vào kiến trúc danh tính số.',
      excerpt: 'SSI phù hợp với cách châu Âu nhìn nhận quyền riêng tư, thị trường số chung và chủ quyền số: người dùng không chỉ có quyền trên giấy mà còn chủ động hơn trong cách dữ liệu được lưu giữ và sử dụng.',
      category: 'Quyền riêng tư',
      tags: ['GDPR', 'Định danh tự chủ', 'EUDI Wallet', 'Quyền kiểm soát dữ liệu', 'Chủ quyền số'],
      readTimeMinutes: 13,
      ui: {
        publishedLabel: 'Xuất bản ngày',
        authorRole: 'Đội ngũ nội dung Identra',
        tableOfContents: 'Mục lục',
        openTableOfContents: 'Mở mục lục bài viết',
        closeTableOfContents: 'Đóng mục lục bài viết',
        ctaTitle: 'Đưa quyền kiểm soát dữ liệu vào hạ tầng định danh',
        ctaDescription: 'Khám phá cách Identra giúp tổ chức phát hành, lưu giữ và kiểm tra thực chứng với nguyên tắc tiết lộ tối thiểu.',
        ctaButtonLabel: 'Trải nghiệm demo',
      },
      tableOfContents: [
        {
          id: 'gdpr-va-no-luc-thay-doi-can-can-quyen-luc-cua-nen-kinh-te-du-lieu',
          label: 'GDPR và nỗ lực thay đổi cán cân quyền lực của nền kinh tế dữ liệu',
          level: 2,
        },
        {
          id: 'mot-lien-minh-gom-27-quoc-gia-can-nhieu-hon-nhung-co-so-du-lieu-ket-noi-voi-nhau',
          label: 'Một liên minh gồm 27 quốc gia cần nhiều hơn những cơ sở dữ liệu kết nối với nhau',
          level: 2,
        },
        {
          id: 'khi-quyen-rieng-tu-gap-bai-toan-chu-quyen-so',
          label: 'Khi quyền riêng tư gặp bài toán chủ quyền số',
          level: 2,
        },
        {
          id: 'vi-sao-ssi-tim-duoc-dung-thoi-diem-tai-chau-au',
          label: 'Vì sao SSI tìm được “đúng thời điểm” tại châu Âu?',
          level: 2,
        },
        {
          id: 'tu-mot-he-gia-tri-den-mot-ha-tang-moi',
          label: 'Từ một hệ giá trị đến một hạ tầng mới',
          level: 2,
        },
        {
          id: 'tai-lieu-tham-khao',
          label: 'Tài liệu tham khảo',
          level: 2,
        },
      ] satisfies readonly BlogArticleTableOfContentsItem[],
      markdown: `Có một khác biệt quan trọng trong cách châu Âu nhìn nhận quyền riêng tư trên môi trường số. Ở đây, quyền riêng tư không chỉ được xem là một tính năng mà doanh nghiệp có thể bổ sung cho sản phẩm, mà còn là một lựa chọn đơn giản giữa việc “đồng ý\u201D và “không đồng ý\u201D với việc thu thập dữ liệu. Trong hệ thống pháp luật của Liên minh châu Âu, bảo vệ dữ liệu cá nhân được đặt ở cấp độ của một quyền cơ bản. Điều 8 của Hiến chương về các quyền cơ bản của EU khẳng định mỗi người đều có quyền được bảo vệ dữ liệu cá nhân liên quan đến mình, đồng thời có quyền truy cập và yêu cầu chỉnh sửa những dữ liệu đó.

Cách nhìn này có ảnh hưởng sâu sắc đến cách châu Âu xây dựng chính sách số. Khi ngày càng nhiều hoạt động của con người chuyển dịch lên Internet, dữ liệu cá nhân cũng ngày càng tập trung trong hệ thống của ngân hàng, mạng xã hội, doanh nghiệp, trường học, cơ quan nhà nước và các nền tảng công nghệ. Những tổ chức sở hữu hạ tầng số, vì thế không chỉ cung cấp dịch vụ; họ còn nắm giữ một lượng thông tin ngày càng lớn về những người sử dụng các dịch vụ đó.

Điều này tạo ra một sự mất cân bằng rõ rệt. Các tổ chức có thể biết ngày càng nhiều về người dùng, trong khi người dùng lại không phải lúc nào cũng biết dữ liệu nào về mình đang được lưu giữ, được sử dụng vào mục đích gì hay được chia sẻ với ai. Vì vậy, trong nhiều năm, châu Âu đã tìm cách thiết lập những giới hạn pháp lý đối với việc thu thập và xử lý dữ liệu, đồng thời trao cho cá nhân nhiều quyền hơn đối với thông tin liên quan đến mình. GDPR là cột mốc nổi bật nhất trong nỗ lực đó.

Tuy nhiên, khi Internet tiếp tục phát triển, một giới hạn khác dần trở nên rõ ràng: pháp luật có thể quy định tổ chức phải làm gì, nhưng không thể tự mình thay đổi cách dữ liệu được lưu trữ, quản lý và trao đổi giữa các hệ thống. Người dùng có thể có quyền truy cập, chỉnh sửa hoặc yêu cầu xóa dữ liệu, nhưng việc thực thi những quyền đó vẫn thường phụ thuộc vào tổ chức đang nắm giữ thông tin.

Chính khoảng cách giữa quyền được pháp luật công nhận và khả năng thực sự kiểm soát dữ liệu trong đời sống số là một trong những lý do khiến những ý tưởng của định danh tự chủ – Self-Sovereign Identity (SSI) – tìm được một môi trường đặc biệt thuận lợi tại châu Âu.

![Quyền truy cập, chỉnh sửa và xóa dữ liệu cá nhân được bảo vệ trong khuôn khổ pháp lý châu Âu](/blog/tu-gdpr-den-ssi-vi-sao-chau-au-lai-muon-trao-quyen-kiem-soat-du-lieu-cho-nguoi-dung/gdpr-data-control-cover-1440.webp)

*Hình 1. GDPR đặt quyền đối với dữ liệu cá nhân vào trung tâm, nhưng việc thực thi các quyền đó vẫn phụ thuộc nhiều vào kiến trúc hệ thống.*

## GDPR và nỗ lực thay đổi cán cân quyền lực của nền kinh tế dữ liệu

Trước khi GDPR trở thành một trong những đạo luật công nghệ được nhắc đến nhiều nhất thế giới, mô hình kinh doanh của Internet đã phát triển rất nhanh dựa trên khả năng thu thập dữ liệu ở quy mô chưa từng có. Mỗi lượt tìm kiếm, mỗi giao dịch, vị trí, mối quan hệ hay hành vi trực tuyến đều có thể trở thành đầu vào cho quảng cáo, phân tích người dùng và các hệ thống đề xuất.

Dữ liệu trở thành một nguồn lực kinh tế quan trọng, nhưng đồng thời xuất hiện một sự mất cân bằng rõ rệt: doanh nghiệp ngày càng biết nhiều hơn về người dùng, trong khi chính người dùng lại không phải lúc nào cũng biết dữ liệu nào về mình đang được lưu giữ, được sử dụng vào mục đích gì hay được chia sẻ với ai.

GDPR tìm cách thay đổi mối quan hệ đó.

Thay vì để việc xử lý dữ liệu gần như hoàn toàn nằm trong tay tổ chức đang nắm giữ nó, GDPR trao cho cá nhân một loạt quyền như biết dữ liệu nào đang được xử lý, truy cập dữ liệu, yêu cầu sửa thông tin không chính xác, yêu cầu xóa trong những trường hợp phù hợp, phản đối một số cách sử dụng và nhận lại dữ liệu để chuyển sang một nhà cung cấp khác.

Quan trọng không kém là những giới hạn được đặt lên chính các tổ chức thu thập dữ liệu. Một doanh nghiệp không nên thu thập dữ liệu chỉ vì “có thể sẽ hữu ích sau này”. GDPR yêu cầu mục đích xử lý phải rõ ràng và lượng dữ liệu được thu thập phải phù hợp, liên quan và giới hạn ở những gì thực sự cần thiết cho mục đích đó.

Đây là một thay đổi đáng kể về cách nhìn. Dữ liệu cá nhân không còn được xem đơn giản như một tài sản mà tổ chức có thể toàn quyền khai thác sau khi người dùng đã cung cấp. Người dùng vẫn có những quyền đối với dữ liệu liên quan đến mình ngay cả khi dữ liệu đang nằm trong hệ thống của người khác.

Nhưng GDPR không thay đổi một thực tế căn bản: **hầu hết dữ liệu vẫn nằm trong hệ thống của các tổ chức.**

Người dùng có quyền yêu cầu truy cập dữ liệu, nhưng phải yêu cầu tổ chức đang giữ nó. Có quyền sửa dữ liệu, nhưng vẫn cần tổ chức thực hiện việc sửa đổi. Có quyền di chuyển một số dữ liệu sang dịch vụ khác, nhưng việc đó vẫn diễn ra giữa những hệ thống được xây dựng và vận hành bởi các nhà cung cấp riêng biệt.

Nói cách khác, GDPR đã thay đổi đáng kể **quyền của người dùng**, nhưng không thể một mình thay đổi **kiến trúc của Internet**.

Và chính ở đây, một câu hỏi mới bắt đầu xuất hiện: nếu quyền kiểm soát của người dùng không chỉ tồn tại trong các điều khoản pháp luật, mà còn được đưa ngay vào cách hệ thống số được thiết kế thì sao?

## Một liên minh gồm 27 quốc gia cần nhiều hơn những cơ sở dữ liệu kết nối với nhau

Quyền riêng tư chỉ là một phần của câu chuyện. Có một lý do khác khiến bài toán danh tính và dữ liệu trở nên đặc biệt quan trọng đối với châu Âu: cấu trúc của chính Liên minh châu Âu.

Một trong những thành tựu lớn nhất của EU là xây dựng thị trường chung, nơi con người có thể sống, học tập, làm việc và kinh doanh giữa các quốc gia thành viên với ngày càng ít rào cản hơn. EU hiện cũng muốn những lợi ích đó tiếp tục tồn tại khi hoạt động kinh tế chuyển dịch sang môi trường số.

Nhưng thế giới số tạo ra những biên giới mới.

Một công dân có thể học tại một quốc gia, làm việc tại một quốc gia khác và sử dụng dịch vụ của doanh nghiệp nằm ở quốc gia thứ ba. Trong thế giới vật lý, EU đã dành nhiều thập kỷ để giảm bớt những rào cản giữa các quốc gia. Trên môi trường số, người dùng vẫn thường xuyên phải tạo tài khoản mới, cung cấp lại dữ liệu và trải qua một quy trình xác minh mới mỗi khi bước sang một hệ thống khác.

Ở quy mô một quốc gia, vấn đề này đã phức tạp. Với một liên minh gồm 27 quốc gia, hàng trăm triệu người cùng hàng nghìn cơ quan công quyền, ngân hàng, trường đại học và doanh nghiệp, việc yêu cầu mọi hệ thống xây dựng kết nối trực tiếp với mọi hệ thống khác gần như không phải một hướng đi có thể mở rộng lâu dài.

Châu Âu đã theo đuổi ý tưởng về một thị trường số chung trong nhiều năm, với mục tiêu giảm các rào cản khiến người dân và doanh nghiệp khó sử dụng dịch vụ xuyên biên giới. Những trở ngại trong giao dịch trực tuyến giữa các quốc gia đã được Ủy ban châu Âu nghiên cứu từ ít nhất giữa thập niên 2010 như một vấn đề cần giải quyết để hoàn thiện thị trường số.

Điều này dẫn tới một bài toán lớn hơn việc số hóa giấy tờ: **làm thế nào để thông tin đáng tin cậy có thể được sử dụng giữa nhiều tổ chức và nhiều quốc gia mà không bắt người dùng liên tục bắt đầu lại từ đầu?**

Đây chính là một trong những điểm khiến SSI trở nên phù hợp với nhu cầu của châu Âu.

Không phải vì SSI được sinh ra tại EU, cũng không phải vì EU quyết định áp dụng nguyên vẹn một học thuyết công nghệ. Điều đáng chú ý là cách tiếp cận của SSI phù hợp với một vấn đề mà châu Âu đã cố gắng giải quyết từ lâu: cho phép dữ liệu và danh tính được sử dụng linh hoạt hơn giữa nhiều hệ thống, trong khi người dùng vẫn giữ được vai trò chủ động hơn đối với thông tin của mình.

![Công dân sử dụng danh tính số trong giáo dục, dịch vụ công và thương mại xuyên biên giới tại châu Âu](/blog/tu-gdpr-den-ssi-vi-sao-chau-au-lai-muon-trao-quyen-kiem-soat-du-lieu-cho-nguoi-dung/eu-cross-border-identity-1440.webp)

*Hình 2. Danh tính số có khả năng tương tác giúp người dùng sử dụng thông tin đáng tin cậy giữa nhiều dịch vụ và quốc gia mà không phải bắt đầu lại từ đầu.*

## Khi quyền riêng tư gặp bài toán chủ quyền số

Câu chuyện còn mở rộng xa hơn quyền của từng cá nhân.

Trong quá trình Internet phát triển, một số tập đoàn công nghệ đã trở thành những lớp hạ tầng gần như mặc định của đời sống số. Chúng cung cấp công cụ tìm kiếm, hệ điều hành, điện toán đám mây, mạng xã hội, cửa hàng ứng dụng và cả những tài khoản được sử dụng để đăng nhập vào vô số dịch vụ khác.

Đó là một mô hình cực kỳ thuận tiện. Một nút “Đăng nhập bằng Google”, Apple hay Microsoft có thể giúp người dùng bỏ qua việc tạo thêm một tài khoản mới. Nhưng sự thuận tiện đó cũng đặt ra một câu hỏi chiến lược: nếu một số ít nền tảng trở thành trung gian xác nhận danh tính cho phần lớn Internet, mức độ phụ thuộc của cả người dùng lẫn nền kinh tế vào những nền tảng ấy sẽ lớn đến đâu?

Đối với châu Âu, đây không chỉ là câu chuyện về quyền riêng tư. Nó ngày càng gắn với khái niệm **chủ quyền số**.

Ủy ban châu Âu mô tả chủ quyền số theo hướng khả năng duy trì sự độc lập chiến lược trong lĩnh vực số trong khi vẫn mở và kết nối với các mạng lưới toàn cầu. Một trong những mục tiêu đặt ra là giảm những phụ thuộc mang tính trọng yếu có thể tạo ra điểm yếu về kinh tế, công nghệ và an ninh.

Điều đó không có nghĩa là châu Âu muốn xây dựng một Internet khép kín hay loại bỏ các công ty công nghệ nước ngoài. Vấn đề nằm ở mức độ phụ thuộc. Một nền kinh tế số khó có thể thực sự tự chủ nếu những lớp hạ tầng căn bản nhất của nó hoàn toàn phụ thuộc vào một số nhà cung cấp bên ngoài.

Danh tính số là một trong những lớp hạ tầng như vậy.

Bởi phía sau gần như mọi hoạt động quan trọng trên Internet đều tồn tại một câu hỏi: **người hoặc tổ chức đang thực hiện hành động này là ai và họ có quyền làm điều đó hay không?**

Nếu câu trả lời cho câu hỏi đó luôn phải đi qua một nhà cung cấp trung tâm, nhà cung cấp ấy sẽ nắm giữ một vị trí đặc biệt trong toàn bộ nền kinh tế số.

Một mô hình trong đó công dân có thể sử dụng danh tính và những thông tin đã được xác nhận mà không bị gắn chặt với một nền tảng thương mại duy nhất, vì vậy phù hợp khá tự nhiên với hướng đi mà EU đang theo đuổi.

![Hạ tầng định danh tự chủ kết nối công dân, tổ chức và dịch vụ trên khắp châu Âu](/blog/tu-gdpr-den-ssi-vi-sao-chau-au-lai-muon-trao-quyen-kiem-soat-du-lieu-cho-nguoi-dung/eu-ssi-infrastructure-1440.webp)

*Hình 3. Hạ tầng định danh phân tán giúp châu Âu giảm phụ thuộc vào một nhà cung cấp danh tính trung tâm mà vẫn duy trì khả năng kết nối.*

## Vì sao SSI tìm được “đúng thời điểm” tại châu Âu?

Nhìn từ góc độ này, sự phát triển mạnh của SSI tại châu Âu không còn là một câu chuyện thuần túy về công nghệ.

Nó là kết quả của nhiều xu hướng đã phát triển song song trong thời gian dài.

Châu Âu có một nền tảng pháp lý coi quyền riêng tư và bảo vệ dữ liệu là những quyền cơ bản. GDPR tiếp tục đẩy cán cân về phía người dùng khi trao cho cá nhân nhiều quyền hơn đối với cách dữ liệu của mình được xử lý. Đồng thời, tham vọng xây dựng một thị trường số thống nhất tạo ra nhu cầu để danh tính và thông tin có thể được sử dụng xuyên qua ranh giới của từng tổ chức và từng quốc gia. Cùng lúc đó, những lo ngại về sự phụ thuộc quá lớn vào một số nền tảng công nghệ khiến chủ quyền số trở thành một vấn đề chiến lược ngày càng quan trọng.

SSI xuất hiện đúng tại giao điểm của những vấn đề ấy.

Nó phù hợp với tư tưởng trao cho người dùng vai trò chủ động hơn. Nó phù hợp với nhu cầu giảm sự phụ thuộc vào những nhà cung cấp danh tính trung tâm. Và nó phù hợp với một thị trường nơi thông tin cần có khả năng được sử dụng giữa nhiều tổ chức mà không buộc tất cả phải tập trung dữ liệu vào cùng một nơi.

Điều đó không có nghĩa là GDPR dẫn trực tiếp tới SSI. GDPR là một khuôn khổ pháp lý về bảo vệ dữ liệu; SSI là một cách tiếp cận đối với danh tính và cách sử dụng những thông tin đã được xác nhận. Chúng hình thành từ những bối cảnh khác nhau.

Nhưng giữa chúng tồn tại một sự tiếp nối rất rõ về tư tưởng.

Nếu GDPR đặt ra câu hỏi **“cá nhân phải có những quyền gì khi một tổ chức xử lý dữ liệu của họ?”**, thì SSI đặt thêm một câu hỏi khác: **“liệu chúng ta có thể thiết kế hệ thống để ngay từ đầu người dùng đã chủ động hơn trong cách thông tin về mình được lưu giữ và sử dụng hay không?”**

Đó là một bước chuyển đáng chú ý: từ việc bảo vệ người dùng trong một thế giới nơi dữ liệu chủ yếu nằm trong hệ thống của các tổ chức, sang việc thử nghiệm những mô hình trong đó người dùng có vị trí trung tâm hơn trong chính kiến trúc của danh tính số.

## Từ một hệ giá trị đến một hạ tầng mới

Đây cũng là bối cảnh cần thiết để hiểu vì sao Liên minh châu Âu đang đầu tư mạnh vào European Digital Identity Wallet – EUDI Wallet.

Nếu chỉ nhìn EUDI Wallet như một ứng dụng định danh mới, rất khó thấy hết ý nghĩa của dự án. Nó nằm ở điểm giao giữa một quá trình phát triển chính sách kéo dài nhiều năm: từ bảo vệ dữ liệu cá nhân, trao thêm quyền cho người dùng, xây dựng thị trường số chung cho tới giảm những phụ thuộc chiến lược trong hạ tầng số.

Điều đáng chú ý là những nguyên tắc này hiện không còn chỉ nằm trên giấy.

Ủy ban châu Âu mô tả khuôn khổ định danh số mới dựa trên nguyên tắc mỗi người phải có quyền kiểm soát danh tính số của mình. EUDI Wallet được thiết kế để người dùng quyết định thông tin nào được chia sẻ và có thể theo dõi việc dữ liệu đã được cung cấp cho ai. Quy định về EUDI Wallet cũng đưa quyền kiểm soát này trực tiếp vào thiết kế của ví, bao gồm khả năng quản lý dữ liệu và xem lịch sử những bên đã nhận thông tin từ người dùng.

![Người dùng sử dụng EUDI Wallet tại sân bay, trường đại học và cơ sở y tế](/blog/tu-gdpr-den-ssi-vi-sao-chau-au-lai-muon-trao-quyen-kiem-soat-du-lieu-cho-nguoi-dung/eudi-wallet-data-control-1440.webp)

*Hình 4. EUDI Wallet đưa quyền kiểm soát dữ liệu vào hạ tầng sử dụng hàng ngày, từ dịch vụ công đến giáo dục, y tế và đi lại.*

Có thể xem đây là một bước chuyển quan trọng trong cách châu Âu tiếp cận vấn đề.

GDPR chủ yếu đặt ra những nguyên tắc và nghĩa vụ đối với cách các tổ chức xử lý dữ liệu. Với EUDI Wallet, một phần của tư tưởng về quyền kiểm soát dữ liệu bắt đầu được đưa xuống chính lớp hạ tầng mà người dân sử dụng hàng ngày.

Vì vậy, sự phát triển mạnh của SSI ở châu Âu không đơn giản là vì công nghệ đã trưởng thành hay vì EU quyết định chạy theo một xu hướng mới. Đằng sau nó là hàng thập kỷ phát triển của một cách nhìn nhất quán hơn về mối quan hệ giữa con người, dữ liệu và quyền lực trong môi trường số.

Quyền riêng tư, quyền tự chủ của cá nhân, nhu cầu xây dựng một thị trường chung không bị chia cắt bởi những hệ thống dữ liệu riêng biệt và mong muốn duy trì quyền tự chủ đối với các hạ tầng số quan trọng đã cùng tạo nên một môi trường đặc biệt phù hợp để SSI tiến từ nghiên cứu và thử nghiệm tới những chương trình triển khai quy mô lớn.

## Tài liệu tham khảo

1. European Union Agency for Fundamental Rights. “Article 8 – Protection of Personal Data.” *Charter of Fundamental Rights of the European Union*.\\
   [https://fra.europa.eu/en/eu-charter/charter/article/8-protection-personal-data](https://fra.europa.eu/en/eu-charter/charter/article/8-protection-personal-data)

2. European Commission. “Information for Individuals.” *Data Protection*.\\
   [https://commission.europa.eu/law/law-topic/data-protection/information-individuals\\_en](https://commission.europa.eu/law/law-topic/data-protection/information-individuals_en)

3. European Commission. “Principles of the GDPR.” *Data Protection*.\\
   [https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/principles-gdpr\\_en](https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/principles-gdpr_en)

4. European Commission. “Single Market.”\\
   [https://commission.europa.eu/topics/single-market\\_en](https://commission.europa.eu/topics/single-market_en)

5. European Commission. “Obstacles to the Digital Single Market.”\\
   [https://commission.europa.eu/publications/obstacles-digital-single-market\\_en](https://commission.europa.eu/publications/obstacles-digital-single-market_en)

6. European Commission. “The First Policy Brief on Digital Sovereignty.” *Interoperable Europe*.\\
   [https://interoperable-europe.ec.europa.eu/collection/sovereignty/news/first-policy-brief-digital-sovereignty](https://interoperable-europe.ec.europa.eu/collection/sovereignty/news/first-policy-brief-digital-sovereignty)

7. European Commission. “European Digital Identity.”\\
   [https://commission.europa.eu/topics/digital-economy-and-society/european-digital-identity\\_en](https://commission.europa.eu/topics/digital-economy-and-society/european-digital-identity_en)

8. European Parliament and Council of the European Union. “Regulation (EU) 2024/1183 Amending Regulation (EU) No 910/2014 as Regards Establishing the European Digital Identity Framework.” *Official Journal of the European Union*, 2024.\\
   [https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1183](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1183)`,
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
