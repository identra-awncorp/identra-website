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

export const DATA_TRUST_AI_ECONOMY_BLOG_ARTICLE_ID =
  'giai-bai-toan-niem-tin-du-lieu-de-phat-trien-kinh-te-so-kinh-te-ai' as const;

const assetRoot = '/blog/giai-bai-toan-niem-tin-du-lieu-de-phat-trien-kinh-te-so-kinh-te-ai';

export const DATA_TRUST_AI_ECONOMY_BLOG_ARTICLE = {
  id: DATA_TRUST_AI_ECONOMY_BLOG_ARTICLE_ID,
  slug: DATA_TRUST_AI_ECONOMY_BLOG_ARTICLE_ID,
  publishedAt: '2026-08-30',
  modifiedAt: '2026-08-30',
  author: {
    type: 'Organization',
    name: 'Identra',
  },
  topics: ['artificial-intelligence', 'identity', 'security'],
  industries: ['all'],
  contentLocales: ['vi'],
  relatedArticleIds: [
    'vuot-xa-super-app-ky-nguyen-ultra-app',
    'dinh-danh-tu-chu-ssi-la-gi',
    'did-la-gi',
  ],
  coverImage: {
    src: `${assetRoot}/trusted-ai-economy-1440.webp`,
    srcSet: [
      `${assetRoot}/trusted-ai-economy-800.webp 800w`,
      `${assetRoot}/trusted-ai-economy-1440.webp 1440w`,
    ].join(', '),
    sizes: '(min-width: 1024px) 680px, (min-width: 768px) 55vw, 100vw',
    width: 1440,
    height: 810,
  },
  socialImage: {
    src: `${assetRoot}/${DATA_TRUST_AI_ECONOMY_BLOG_ARTICLE_ID}-og.jpg`,
    width: 1200,
    height: 630,
    type: 'image/jpeg',
  },
  listing: {
    en: {
      title: 'Solving the Data Trust Problem for the Digital and AI Economies',
      description: 'Why AI agents and digital services need verifiable data provenance, integrity and validity before they can make consequential decisions at scale.',
      type: 'Digital economy',
      duration: '13 min read',
    },
    es: {
      title: 'Resolver el problema de la confianza en los datos para la economía digital y de IA',
      description: 'Por qué los agentes de IA y los servicios digitales necesitan verificar el origen, la integridad y la vigencia de los datos antes de tomar decisiones a escala.',
      type: 'Economía digital',
      duration: '13 min de lectura',
    },
    ja: {
      title: 'デジタル経済とAI経済の発展に向けたデータ信頼の課題',
      description: 'AIエージェントとデジタルサービスが大規模な意思決定を行う前に、データの出所、完全性、有効性を検証できる必要性を解説します。',
      type: 'デジタル経済',
      duration: '読了13分',
    },
    de: {
      title: 'Das Vertrauensproblem bei Daten für die digitale und KI-Wirtschaft lösen',
      description: 'Warum KI-Agenten und digitale Dienste Herkunft, Integrität und Gültigkeit von Daten prüfen müssen, bevor sie folgenschwere Entscheidungen automatisieren.',
      type: 'Digitale Wirtschaft',
      duration: '13 Min. Lesezeit',
    },
    vi: {
      title: 'Giải bài toán niềm tin dữ liệu để phát triển kinh tế số, kinh tế AI',
      description: 'AI chỉ có thể tham gia sâu vào nền kinh tế khi dữ liệu đầu vào có nguồn gốc rõ ràng, có thể kiểm chứng và đủ tin cậy để làm căn cứ cho quyết định.',
      type: 'Kinh tế số',
      duration: 'Đọc trong 13 phút',
    },
  } satisfies Record<Locale, BlogArticleListingCopy>,
  images: {
    [`${assetRoot}/trusted-ai-economy-1440.webp`]: responsiveImage(
      'trusted-ai-economy',
    ),
    [`${assetRoot}/fragmented-data-trust-1440.webp`]: responsiveImage(
      'fragmented-data-trust',
    ),
    [`${assetRoot}/reusable-verification-1440.webp`]: responsiveImage(
      'reusable-verification',
    ),
    [`${assetRoot}/digital-trust-infrastructure-1440.webp`]: responsiveImage(
      'digital-trust-infrastructure',
    ),
  } satisfies Record<string, BlogArticleImage>,
  content: {
    vi: {
      title: 'Giải bài toán niềm tin dữ liệu để phát triển kinh tế số, kinh tế AI',
      description: 'AI chỉ có thể tham gia sâu vào nền kinh tế khi dữ liệu đầu vào có nguồn gốc rõ ràng, có thể kiểm chứng và đủ tin cậy để làm căn cứ cho quyết định.',
      excerpt: 'Kinh tế số và kinh tế AI cần một lớp hạ tầng giúp con người lẫn máy móc kiểm tra nguồn gốc, tính toàn vẹn và hiệu lực của dữ liệu.',
      category: 'Kinh tế số',
      tags: ['Kinh tế số', 'Kinh tế AI', 'Niềm tin dữ liệu', 'SSI', 'AI Agent'],
      readTimeMinutes: 13,
      ui: {
        publishedLabel: 'Xuất bản ngày',
        authorRole: 'Đội ngũ nội dung Identra',
        tableOfContents: 'Mục lục',
        openTableOfContents: 'Mở mục lục bài viết',
        closeTableOfContents: 'Đóng mục lục bài viết',
        ctaTitle: 'Xây dựng lớp hạ tầng tin cậy cho kinh tế số và AI',
        ctaDescription: 'Khám phá cách Identra giúp tổ chức phát hành và kiểm tra thực chứng để con người, hệ thống và AI Agent sử dụng dữ liệu đáng tin cậy.',
        ctaButtonLabel: 'Trải nghiệm demo',
      },
      tableOfContents: [
        {
          id: 'kinh-te-so-hien-nay-van-phai-ton-nhieu-chi-phi-de-xay-dung-niem-tin',
          label: 'Kinh tế số hiện nay vẫn phải tốn nhiều chi phí để xây dựng niềm tin',
          level: 2,
        },
        {
          id: 'du-lieu-so-chua-dong-nghia-voi-du-lieu-dang-tin',
          label: 'Dữ liệu số chưa đồng nghĩa với dữ liệu đáng tin',
          level: 2,
        },
        {
          id: 'tu-xac-minh-thu-cong-den-kha-nang-kiem-chung-tu-dong',
          label: 'Từ xác minh thủ công đến khả năng kiểm chứng tự động',
          level: 2,
        },
        {
          id: 'khi-ket-qua-xac-minh-co-the-duoc-su-dung-lai',
          label: 'Khi kết quả xác minh có thể được sử dụng lại',
          level: 2,
        },
        {
          id: 'kinh-te-ai-doi-hoi-mot-lop-ha-tang-tin-cay-moi',
          label: 'Kinh tế AI đòi hỏi một lớp hạ tầng tin cậy mới',
          level: 2,
        },
        {
          id: 'ha-tang-niem-tin-co-the-tro-thanh-mot-lop-nen-cua-kinh-te-so',
          label: 'Hạ tầng niềm tin có thể trở thành một lớp nền của kinh tế số',
          level: 2,
        },
        {
          id: 'tu-du-lieu-lon-den-du-lieu-dang-tin',
          label: 'Từ dữ liệu lớn đến dữ liệu đáng tin',
          level: 2,
        },
      ] satisfies BlogArticleTableOfContentsItem[],
      markdown: `Các AI Agent ngày nay đã có thể làm nhiều việc vượt xa khả năng tạo nội dung đơn thuần. Chúng có thể tìm kiếm thông tin, phân tích tài liệu, lập kế hoạch, sử dụng phần mềm, gọi API, phối hợp nhiều bước công việc và từng bước tiến tới khả năng thực hiện các tác vụ có giá trị kinh tế thay con người.

Điều này mở ra một viễn cảnh đáng chú ý: AI không chỉ đóng vai trò hỗ trợ ra quyết định, mà có thể trực tiếp tham gia vào các quy trình kinh doanh. Một AI Agent có thể tìm kiếm nhà cung cấp, đánh giá hồ sơ, so sánh báo giá, chuẩn bị hợp đồng, thực hiện đơn hàng hoặc phối hợp với những hệ thống khác để hoàn thành một quy trình gần như hoàn toàn tự động.

Tuy nhiên, càng tiến gần đến các hoạt động có giá trị kinh tế thực, AI càng gặp phải một giới hạn mà năng lực suy luận tốt hơn không thể tự giải quyết.

Đó là độ tin cậy của dữ liệu đầu vào.

Một AI có thể đọc và phân tích rất tốt một bằng đại học, nhưng bản thân khả năng suy luận không thể cho nó biết tấm bằng đó có thực sự do trường đại học cấp hay không. Nó có thể đánh giá một báo cáo tài chính trong vài giây, nhưng nếu số liệu đã bị làm giả thì khả năng phân tích tốt đến đâu cũng không giúp xác định đâu là sự thật. Một AI Agent cũng có thể nhận yêu cầu chuyển tiền, nhưng trước khi thực hiện, nó vẫn cần biết người đưa ra yêu cầu có thực sự có thẩm quyền hay không.

Vấn đề ở đây không nằm ở việc AI có hiểu dữ liệu hay không. Vấn đề là hệ thống cần có căn cứ để biết dữ liệu đến từ đâu, ai xác nhận, có bị thay đổi hay không và còn giá trị tại thời điểm sử dụng hay không.

Đây chính là ranh giới giữa khả năng suy luận và độ tin cậy của thông tin.

Trong một hệ thống mà con người vẫn đứng ở cuối quy trình, chúng ta có thể gọi điện xác minh, yêu cầu bổ sung giấy tờ, kiểm tra lại cơ sở dữ liệu hoặc chuyển hồ sơ cho một bộ phận chuyên trách khi có nghi ngờ. Nhưng nếu AI Agent được kỳ vọng xử lý hàng triệu quyết định và giao dịch trong nền kinh tế số, chúng ta không thể tiếp tục dựa vào con người để xác minh từng bước.

Muốn AI thực sự tham gia sâu vào nền kinh tế, chúng ta không chỉ cần những mô hình thông minh hơn. Chúng ta còn cần một hạ tầng giúp dữ liệu có thể được kiểm chứng một cách nhanh chóng, đáng tin cậy và tự động.

![AI Agent và con người kiểm tra các luồng dữ liệu đáng tin cậy trong nền kinh tế số](/blog/giai-bai-toan-niem-tin-du-lieu-de-phat-trien-kinh-te-so-kinh-te-ai/trusted-ai-economy-1440.webp)

*Hình 1. Nền kinh tế AI cần dữ liệu có nguồn gốc rõ ràng và có thể kiểm chứng trước khi máy móc đưa ra quyết định.*

## Kinh tế số hiện nay vẫn phải tốn nhiều chi phí để xây dựng niềm tin

Bài toán này thực ra không bắt đầu từ AI. Nó đã tồn tại từ lâu trong kinh tế số.

Trong hầu hết các giao dịch quan trọng, các bên không thể đơn giản tin vào những gì được cung cấp. Ngân hàng phải xác minh danh tính khách hàng. Doanh nghiệp phải kiểm tra bằng cấp và kinh nghiệm của ứng viên. Nền tảng thương mại điện tử phải xác minh người bán. Doanh nghiệp phải kiểm tra tư cách pháp lý của đối tác. Các tổ chức tài chính phải đánh giá nguồn thu nhập, năng lực thanh toán và hàng loạt thông tin khác trước khi đưa ra quyết định.

Để tạo ra sự tin cậy, mỗi tổ chức thường phải xây dựng một quy trình riêng: thu thập giấy tờ, đối chiếu dữ liệu, kiểm tra với nguồn phát hành, lưu trữ bằng chứng và thực hiện lại việc xác minh khi cần.

Điều đáng nói là cùng một thông tin thường phải được kiểm tra đi kiểm tra lại rất nhiều lần.

Một trường đại học đã xác nhận một sinh viên tốt nghiệp, nhưng mỗi doanh nghiệp tuyển dụng vẫn phải tự tìm cách kiểm tra bằng cấp đó. Một doanh nghiệp đã hoàn tất xác minh khách hàng tại ngân hàng A không có nghĩa ngân hàng B có thể sử dụng ngay kết quả đó. Một giấy phép đã được cơ quan có thẩm quyền cấp vẫn có thể phải được sao chụp, công chứng, tải lên và kiểm tra lại ở nhiều hệ thống khác nhau.

Chi phí của những quy trình này thường không được nhìn thấy rõ, nhưng chúng hiện diện ở khắp nơi: thời gian xử lý hồ sơ, nhân sự kiểm tra, chi phí vận hành hệ thống, chi phí tích hợp dữ liệu, chi phí chống gian lận và cả chi phí cơ hội do một giao dịch bị trì hoãn.

Ở tầm vĩ mô, thì đây là một lực cản rất lớn đối với nền kinh tế số.

Chúng ta đã số hóa rất nhiều dữ liệu, nhưng chưa giải quyết triệt để bài toán làm thế nào để một tổ chức có thể nhanh chóng kiểm tra tính xác thực của dữ liệu được tạo ra bởi một tổ chức khác.

## Dữ liệu số chưa đồng nghĩa với dữ liệu đáng tin

Một trong những nhầm lẫn phổ biến trong quá trình chuyển đổi số là cho rằng chỉ cần đưa giấy tờ và hồ sơ lên môi trường điện tử thì bài toán đã được giải quyết.

Thực tế không phải vậy.

Một tệp PDF, một ảnh chụp hay một bản ghi trong cơ sở dữ liệu vẫn chỉ là dữ liệu. Giá trị của nó phụ thuộc vào khả năng xác định nguồn gốc và kiểm tra xem thông tin đó có thực sự đáng tin hay không.

Một tệp PDF ghi “Bằng Cử nhân Đại học X” không tự nhiên có giá trị chỉ vì nó trông giống một tấm bằng thật. Điều doanh nghiệp cần biết không phải là tài liệu đó có hình thức hợp lý hay không, mà là Đại học X có thực sự xác nhận người này đã tốt nghiệp hay không.&#x20;

Một giấy chứng nhận thu nhập cũng vậy. Nội dung bên trong có thể rất chi tiết, nhưng điều quan trọng hơn là ai đã cấp nó, tổ chức đó có đủ thẩm quyền để xác nhận thông tin hay không và dữ liệu có bị sửa đổi sau khi được cấp hay không.

Đây là điểm khác biệt giữa việc “có dữ liệu” và “có căn cứ để tin vào dữ liệu”.

Trong thế giới vật lý, chúng ta giải quyết vấn đề này bằng con dấu, chữ ký, giấy tờ gốc, cơ quan cấp và các quy trình pháp lý đi kèm. Trong thế giới số, chúng ta cần một cách tương đương nhưng phù hợp hơn với tốc độ và quy mô của máy tính.

Một hệ thống số tốt không chỉ cho phép truyền dữ liệu nhanh hơn. Nó phải cho phép bên nhận kiểm tra được dữ liệu đến từ đâu, ai xác nhận, có bị thay đổi hay không và còn hiệu lực hay không.

Khi những câu hỏi này có thể được trả lời tự động, rất nhiều quy trình vốn đang phụ thuộc vào con người mới có thể được số hóa sâu hơn.

![Dữ liệu định danh bị sao chép và phân mảnh giữa nhiều hệ thống số](/blog/giai-bai-toan-niem-tin-du-lieu-de-phat-trien-kinh-te-so-kinh-te-ai/fragmented-data-trust-1440.webp)

*Hình 2. Số hóa tài liệu chưa giải quyết được tình trạng dữ liệu định danh bị sao chép và phân mảnh giữa nhiều hệ thống.*

## Từ xác minh thủ công đến khả năng kiểm chứng tự động

Hãy quay lại ví dụ về bằng đại học.

Ngày nay, một trường đại học có thể lưu thông tin tốt nghiệp trong hệ thống nội bộ. Khi sinh viên xin việc, họ gửi bản scan bằng cho doanh nghiệp. Nhà tuyển dụng sau đó phải kiểm tra tài liệu, liên hệ với trường hoặc sử dụng một dịch vụ xác minh khác.

Một cách tiếp cận mới là để trường đại học cấp cho sinh viên một bằng chứng số có thể được kiểm tra bằng máy tính. Khi sinh viên sử dụng thông tin đó ở nơi khác, hệ thống có thể biết được trường nào đã cấp, nội dung có bị thay đổi hay không và bằng chứng còn hiệu lực hay không.

Điểm quan trọng không nằm ở việc biến tấm bằng giấy thành một tệp điện tử đẹp hơn. Điểm quan trọng là thông tin sau khi được xác nhận có thể tiếp tục được kiểm tra ở những nơi khác mà không cần làm lại toàn bộ quy trình từ đầu.

Cách tiếp cận này có thể áp dụng cho rất nhiều loại thông tin khác: danh tính cá nhân, giấy phép hành nghề, tư cách doanh nghiệp, chứng chỉ nghề nghiệp, quyền đại diện, thông tin tài chính hay quyền truy cập vào một hệ thống.

Một ngân hàng có thể xác nhận một thông tin tài chính. Một cơ quan nhà nước có thể xác nhận giấy phép. Một doanh nghiệp có thể xác nhận chức vụ của nhân viên. Một trường đại học có thể xác nhận bằng cấp. Người nhận không cần truy cập trực tiếp vào toàn bộ cơ sở dữ liệu của các tổ chức này; họ chỉ cần có khả năng kiểm tra xem thông tin được cung cấp có thực sự xuất phát từ nguồn đáng tin hay không.

Đây cũng là một trong những ý tưởng quan trọng của mô hình định danh tự chủ, hay Self-Sovereign Identity – SSI.

Tên gọi có thể nghe mới, nhưng ý tưởng cốt lõi lại khá đơn giản: thay vì để mỗi hệ thống tạo ra một hồ sơ riêng về người dùng và giữ thông tin bên trong cơ sở dữ liệu của mình, những thông tin đã được xác nhận có thể được trao cho chính người dùng hoặc tổ chức sở hữu chúng để sử dụng khi cần.

Một trường đại học xác nhận bằng cấp. Một cơ quan nhà nước xác nhận danh tính. Một tổ chức nghề nghiệp xác nhận chứng chỉ. Những thông tin này có thể được lưu giữ trong một ví định danh số và được sử dụng ở nhiều dịch vụ khác nhau.

Bên nhận không cần tin vào lời khai của người dùng. Họ cũng không cần mặc nhiên tin vào tài liệu được gửi tới. Hệ thống có thể tự kiểm tra nguồn phát hành và tính xác thực của thông tin.

Đây là một thay đổi nhỏ về cách dữ liệu được tổ chức, nhưng có thể tạo ra thay đổi lớn về cách nền kinh tế vận hành.

## Khi kết quả xác minh có thể được sử dụng lại

Nếu một thông tin đã được một nguồn đáng tin xác nhận và có thể tiếp tục được kiểm tra ở những nơi khác, rất nhiều quy trình hiện nay có thể được rút ngắn.

Một doanh nghiệp tuyển dụng không cần dành nhiều thời gian để kiểm tra từng loại bằng cấp nếu thông tin đó đã có thể được xác minh tự động. Ngân hàng có thể đơn giản hóa một phần quy trình thu thập hồ sơ nếu khách hàng có thể cung cấp những thông tin đã được các tổ chức có thẩm quyền xác nhận. Doanh nghiệp có thể kiểm tra tư cách của đối tác nhanh hơn mà không cần trao đổi hàng loạt giấy tờ qua email.

Lợi ích không chỉ nằm ở tốc độ.

Khi các tổ chức không cần sao chép và lưu trữ quá nhiều dữ liệu không cần thiết, rủi ro bảo mật cũng có thể giảm. Khi nguồn gốc của thông tin được xác định rõ hơn, việc giả mạo bằng cấp, chứng chỉ hay giấy phép cũng trở nên khó khăn hơn. Khi dữ liệu có thể được kiểm tra tự động, nhiều bước xử lý thủ công có thể được loại bỏ.

Quan trọng hơn, khả năng sử dụng lại kết quả xác minh giúp giảm một vấn đề rất lớn của kinh tế số hiện nay: mỗi tổ chức phải tự xây dựng một hệ thống xác minh độc lập.

Nếu ngân hàng, doanh nghiệp, trường đại học, cơ quan nhà nước và các nền tảng số có thể cùng dựa trên những cơ chế xác minh tương thích, chi phí để các bên thiết lập sự tin cậy với nhau sẽ giảm đáng kể.

Đây chính là lúc niềm tin không còn chỉ là một vấn đề về bảo mật hay danh tính. Nó trở thành một vấn đề về năng suất của nền kinh tế.

![Kết quả xác minh được tái sử dụng an toàn giữa nhiều dịch vụ số](/blog/giai-bai-toan-niem-tin-du-lieu-de-phat-trien-kinh-te-so-kinh-te-ai/reusable-verification-1440.webp)

*Hình 3. Kết quả xác minh có thể được tái sử dụng giữa nhiều dịch vụ mà không cần lặp lại toàn bộ quy trình từ đầu.*

## Kinh tế AI đòi hỏi một lớp hạ tầng tin cậy mới

Sự xuất hiện của AI Agent khiến yêu cầu này trở nên cấp thiết hơn.

Khi AI chỉ đóng vai trò trợ lý, con người vẫn có thể là lớp kiểm tra cuối cùng. AI gợi ý, con người xác nhận. AI phân tích, con người quyết định. AI chuẩn bị giao dịch, con người phê duyệt.

Nhưng mô hình đó sẽ thay đổi khi AI được giao nhiều quyền hành động hơn.

Một AI Agent được giao nhiệm vụ tìm và mua thiết bị cho doanh nghiệp sẽ phải biết nhà cung cấp có thực sự tồn tại hay không. Một AI tuyển dụng cần biết bằng cấp và kinh nghiệm của ứng viên có được xác nhận hay không. Một AI thực hiện thanh toán cần biết người giao nhiệm vụ có quyền phê duyệt giao dịch đó hay không. Một AI thay mặt doanh nghiệp ký kết hoặc trao đổi dữ liệu với hệ thống khác cần có cách xác định đối tác và phạm vi quyền hạn của mình.

Nếu mọi bước đều cần một con người đứng ra kiểm tra lại, mức độ tự động hóa sẽ nhanh chóng chạm trần.

AI có thể trở nên thông minh hơn rất nhiều trong vài năm tới, nhưng năng lực suy luận không thể thay thế cho một nguồn thông tin đáng tin cậy. Một mô hình có thể đưa ra kết luận hợp lý từ dữ liệu được cung cấp, nhưng nếu dữ liệu đầu vào sai hoặc không rõ nguồn gốc, kết luận đó vẫn có thể sai.

Vì vậy, nền kinh tế AI không chỉ cần mô hình mạnh hơn, chip nhanh hơn hay trung tâm dữ liệu lớn hơn. Nó còn cần một lớp hạ tầng giúp máy móc biết dữ liệu nào có thể được sử dụng làm căn cứ cho quyết định.

Đây là điều kiện để AI chuyển từ vai trò “hỗ trợ con người” sang khả năng thực sự vận hành một phần của các quy trình kinh tế.

## Hạ tầng niềm tin có thể trở thành một lớp nền của kinh tế số

Nếu nhìn rộng hơn, bài toán này không chỉ liên quan đến AI hay định danh.

Một nền kinh tế số hoạt động hiệu quả cần ít nhất ba khả năng cơ bản: kết nối, trao đổi giá trị và xác lập sự tin cậy.

Internet đã giải quyết rất tốt bài toán kết nối. Hệ thống thanh toán số đang ngày càng giải quyết tốt hơn bài toán trao đổi giá trị. Nhưng khả năng xác định ai đang tham gia một giao dịch, dữ liệu nào đáng tin và ai chịu trách nhiệm về một thông tin vẫn còn phụ thuộc rất nhiều vào các hệ thống riêng lẻ.

Đây có thể là một trong những lớp hạ tầng quan trọng tiếp theo của nền kinh tế số.

Khi cá nhân có thể xác thực danh tính, doanh nghiệp có thể chứng minh tư cách pháp lý, tổ chức có thể xác nhận dữ liệu và hệ thống AI có thể tự kiểm tra những thông tin đó, các bên sẽ không còn phải lặp lại toàn bộ quy trình xác minh mỗi khi bắt đầu hợp tác với một đối tác mới.

Đối với doanh nghiệp và nhà đầu tư, điều này mở ra một lớp thị trường mới xoay quanh định danh số, xác minh dữ liệu, hạ tầng tin cậy và tự động hóa giao dịch. Đối với kỹ sư công nghệ, điều này đặt ra bài toán xây dựng những hệ thống có thể tương tác với nhau mà không buộc mọi tổ chức phải chia sẻ toàn bộ cơ sở dữ liệu. Đối với nhà hoạch định chính sách, đây là câu hỏi về việc làm thế nào để tạo ra các khuôn khổ pháp lý và tiêu chuẩn đủ mở để thúc đẩy đổi mới, nhưng vẫn đảm bảo trách nhiệm, quyền riêng tư và khả năng kiểm soát.

Châu Âu hiện là một trong những khu vực đi xa nhất theo hướng này khi đưa ví định tín (ví định danh số) và những thông tin có thể được xác minh vào một khuôn khổ chung cho toàn Liên minh. Nhưng câu hỏi mà họ đang giải quyết không phải là vấn đề riêng của châu Âu.

Đó là câu hỏi mà mọi nền kinh tế số rồi sẽ phải đối mặt: làm thế nào để dữ liệu có thể được sử dụng rộng rãi mà người nhận không phải bắt đầu lại quá trình xác minh từ đầu?

![Hạ tầng niềm tin số kết nối công dân tổ chức và các dịch vụ trong nền kinh tế](/blog/giai-bai-toan-niem-tin-du-lieu-de-phat-trien-kinh-te-so-kinh-te-ai/digital-trust-infrastructure-1440.webp)

*Hình 4. Hạ tầng niềm tin giúp công dân, tổ chức và dịch vụ số cùng kiểm tra dữ liệu theo những cơ chế tương thích.*

## Từ dữ liệu lớn đến dữ liệu đáng tin

Trong nhiều năm, chúng ta nói rất nhiều về dữ liệu như một loại tài nguyên mới của nền kinh tế. Doanh nghiệp đầu tư vào thu thập dữ liệu, chính phủ xây dựng cơ sở dữ liệu lớn, các mô hình AI được huấn luyện trên lượng thông tin ngày càng khổng lồ.

Nhưng khi AI bắt đầu chuyển từ việc tạo nội dung sang thực hiện hành động, một câu hỏi khác sẽ ngày càng trở nên quan trọng: trong số lượng dữ liệu khổng lồ đó, đâu là thông tin đủ đáng tin để được sử dụng trong một quyết định thực tế?

Một AI có thể đọc hàng triệu tài liệu, nhưng khi ký một hợp đồng, thực hiện một khoản thanh toán hay đưa ra quyết định có ảnh hưởng tới con người, nó cần nhiều hơn khả năng hiểu ngôn ngữ. Nó cần những căn cứ có thể kiểm tra được.

Đây là lý do bài toán niềm tin dữ liệu có thể trở thành một trong những vấn đề nền tảng của giai đoạn tiếp theo của kinh tế số.

Muốn xây dựng một nền kinh tế trong đó AI có thể thực sự làm việc, giao dịch và phối hợp với con người cũng như các hệ thống khác, chúng ta không chỉ cần AI thông minh hơn. Chúng ta còn cần dữ liệu đáng tin cậy hơn và một hạ tầng giúp cả con người lẫn máy móc có thể kiểm tra độ tin cậy đó.

Dữ liệu là đầu vào của kinh tế số và AI. Nhưng chỉ khi dữ liệu đủ đáng tin để được sử dụng trong những quyết định thực tế, nó mới thực sự trở thành một nguồn lực của nền kinh tế.`,
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
