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

export const ULTRA_APP_BLOG_ARTICLE_ID =
  'vuot-xa-super-app-ky-nguyen-ultra-app' as const;

const assetRoot = '/blog/vuot-xa-super-app-ky-nguyen-ultra-app';

export const ULTRA_APP_BLOG_ARTICLE = {
  id: ULTRA_APP_BLOG_ARTICLE_ID,
  slug: ULTRA_APP_BLOG_ARTICLE_ID,
  publishedAt: '2026-08-03',
  modifiedAt: '2026-08-03',
  author: {
    type: 'Organization',
    name: 'Identra',
  },
  topics: ['technology', 'identity', 'privacy'],
  industries: ['technology'],
  contentLocales: ['vi'],
  relatedArticleIds: [
    'giai-bai-toan-niem-tin-du-lieu-de-phat-trien-kinh-te-so-kinh-te-ai',
    'dinh-danh-tu-chu-ssi-la-gi',
    'rao-can-phap-ly-trong-tuyen-dung-quoc-te-ssi-mo-duong-cho-nhan-su-remote-nhu-the-nao',
  ],
  coverImage: {
    src: `${assetRoot}/ultra-app-agent-orchestration-1440.webp`,
    srcSet: [
      `${assetRoot}/ultra-app-agent-orchestration-800.webp 800w`,
      `${assetRoot}/ultra-app-agent-orchestration-1440.webp 1440w`,
    ].join(', '),
    sizes: '(min-width: 1024px) 680px, (min-width: 768px) 55vw, 100vw',
    width: 1440,
    height: 810,
  },
  socialImage: {
    src: `${assetRoot}/${ULTRA_APP_BLOG_ARTICLE_ID}-og.jpg`,
    width: 1200,
    height: 630,
    type: 'image/jpeg',
  },
  listing: {
    en: {
      title: 'Beyond Super Apps: The Ultra App Era',
      description: 'How AI agents, self-sovereign identity, blockchain and smart contracts could turn apps into an orchestration layer for digital life.',
      type: 'Technology',
      duration: '18 min read',
    },
    es: {
      title: 'Más allá de las Super Apps: la era de las Ultra Apps',
      description: 'Cómo los agentes de IA, la identidad autosoberana, blockchain y los contratos inteligentes pueden coordinar la vida digital.',
      type: 'Tecnología',
      duration: '18 min de lectura',
    },
    ja: {
      title: 'Super Appを超えて：Ultra Appの時代',
      description: 'AIエージェント、自己主権型アイデンティティ、ブロックチェーン、スマートコントラクトがデジタル生活をどう統合するかを考察します。',
      type: 'テクノロジー',
      duration: '読了18分',
    },
    de: {
      title: 'Jenseits der Super App: Das Zeitalter der Ultra App',
      description: 'Wie KI-Agenten, selbstbestimmte Identitäten, Blockchain und Smart Contracts das digitale Leben koordinieren könnten.',
      type: 'Technologie',
      duration: '18 Min. Lesezeit',
    },
    vi: {
      title: 'Vượt xa Super App: Kỷ nguyên Ultra App',
      description: 'AI Agent, SSI, blockchain và hợp đồng thông minh có thể đưa ứng dụng từ nơi tập hợp dịch vụ thành lớp điều phối mới cho đời sống số như thế nào?',
      type: 'Công nghệ',
      duration: 'Đọc trong 18 phút',
    },
  } satisfies Record<Locale, BlogArticleListingCopy>,
  images: {
    [`${assetRoot}/ultra-app-agent-orchestration-1440.webp`]: responsiveImage(
      'ultra-app-agent-orchestration',
    ),
    [`${assetRoot}/ai-agent-trust-infrastructure-1440.webp`]: responsiveImage(
      'ai-agent-trust-infrastructure',
    ),
    [`${assetRoot}/ssi-agent-verifiable-trust-1440.webp`]: responsiveImage(
      'ssi-agent-verifiable-trust',
    ),
    [`${assetRoot}/programmable-digital-transactions-1440.webp`]: responsiveImage(
      'programmable-digital-transactions',
    ),
  } satisfies Record<string, BlogArticleImage>,
  content: {
    vi: {
      title: 'Vượt xa Super App: Kỷ nguyên Ultra App',
      description: 'AI Agent, SSI, blockchain và hợp đồng thông minh có thể đưa ứng dụng từ nơi tập hợp dịch vụ thành lớp điều phối mới cho đời sống số như thế nào?',
      excerpt: 'Super App gom nhiều dịch vụ vào một hệ sinh thái. Ultra App hướng tới bước tiếp theo: để nhiều dịch vụ vận hành phía sau một Agent hiểu ý định và hành động trong phạm vi được cho phép.',
      category: 'Công nghệ',
      tags: ['Ultra App', 'AI Agent', 'SSI', 'Blockchain', 'Hợp đồng thông minh'],
      readTimeMinutes: 18,
      ui: {
        publishedLabel: 'Xuất bản ngày',
        authorRole: 'Đội ngũ nội dung Identra',
        tableOfContents: 'Mục lục',
        openTableOfContents: 'Mở mục lục bài viết',
        closeTableOfContents: 'Đóng mục lục bài viết',
        ctaTitle: 'Xây dựng hạ tầng tin cậy cho thế hệ ứng dụng mới',
        ctaDescription: 'Khám phá cách Identra giúp các hệ thống xác minh danh tính và thực chứng bằng mật mã trước khi tự động hóa giao dịch.',
        ctaButtonLabel: 'Trải nghiệm demo',
      },
      tableOfContents: [
        {
          id: 'tu-giao-dien-chuc-nang-den-giao-dien-dua-tren-y-dinh',
          label: 'Từ giao diện chức năng đến giao diện dựa trên ý định',
          level: 2,
        },
        {
          id: 'tri-thong-minh-chua-du-de-mot-agent-tham-gia-nen-kinh-te',
          label: 'Trí thông minh chưa đủ để Agent tham gia nền kinh tế',
          level: 2,
        },
        {
          id: 'khi-agent-tu-kiem-chung-thay-vi-con-nguoi-doc-giay-to',
          label: 'Khi Agent tự kiểm chứng',
          level: 2,
        },
        {
          id: 'tu-niem-tin-den-giao-dich-vai-tro-cua-hop-dong-thong-minh-va-blockchain',
          label: 'Từ niềm tin đến giao dịch',
          level: 2,
        },
        {
          id: 'nen-kinh-te-agent-khi-phan-mem-bat-dau-giao-dich-voi-phan-mem',
          label: 'Nền kinh tế Agent',
          level: 2,
        },
        {
          id: 'mot-ngay-trong-the-gioi-cua-ultra-app',
          label: 'Một ngày trong thế giới của Ultra App',
          level: 2,
        },
        {
          id: 'nhung-manh-ghep-dang-dan-hoi-tu',
          label: 'Những mảnh ghép đang dần hội tụ',
          level: 2,
        },
        {
          id: 'nhung-gi-con-thieu-truoc-khi-ultra-app-co-the-tro-thanh-mot-the-he-ung-dung-thuc-su',
          label: 'Những gì còn thiếu',
          level: 2,
        },
        {
          id: 'ket-luan-tu-super-app-den-mot-cach-van-hanh-moi-cua-doi-song-so',
          label: 'Từ Super App đến cách vận hành mới',
          level: 2,
        },
        {
          id: 'tai-lieu-tham-khao',
          label: 'Tài liệu tham khảo',
          level: 2,
        },
      ] satisfies BlogArticleTableOfContentsItem[],
      markdown: `Trong hơn mười lăm năm qua, điện thoại thông minh đã thay đổi gần như mọi mặt của đời sống số, nhưng cách chúng ta sử dụng phần mềm thực ra không thay đổi nhiều như vẻ ngoài của nó. Muốn gọi xe, chúng ta vẫn phải mở một ứng dụng gọi xe; muốn đặt khách sạn, phải tìm một ứng dụng du lịch; muốn trả hóa đơn, phải vào ngân hàng hoặc ví điện tử, tìm đúng dịch vụ rồi thực hiện từng bước. Mỗi ứng dụng có thể ngày càng đẹp hơn, nhanh hơn và thông minh hơn, nhưng người dùng vẫn phải tự tìm công cụ, hiểu giao diện và điều khiển toàn bộ quy trình.

Sự xuất hiện của Super App là một bước tiến lớn bởi nó gom nhiều dịch vụ vốn nằm rải rác vào cùng một hệ sinh thái. WeChat là ví dụ điển hình: từ nhắn tin, thanh toán, gọi xe đến mua sắm và hàng loạt dịch vụ khác đều có thể được tiếp cận thông qua một ứng dụng duy nhất. Mini App tiếp tục đẩy mô hình này đi xa hơn, cho phép doanh nghiệp đưa dịch vụ vào bên trong Super App mà người dùng không cần cài đặt thêm một ứng dụng hoàn chỉnh. Tuy nhiên, Super App mới giải quyết được bài toán **tập hợp dịch vụ**, chứ chưa giải quyết được bài toán **điều phối dịch vụ**. Khi số lượng chức năng tăng lên, giao diện của nó ngày càng giống một chiếc máy tính để bàn thu nhỏ với hàng chục biểu tượng, menu và Mini App; sự phức tạp không biến mất mà chỉ được gom vào một nơi.

AI Agent mở ra khả năng thay đổi cách tiếp cận đó. Thay vì yêu cầu con người học cách vận hành từng dịch vụ, một Agent đủ năng lực có thể hiểu mục tiêu, quan sát ngữ cảnh, lựa chọn công cụ và phối hợp nhiều hệ thống để hoàn thành công việc. Người dùng không cần mở ứng dụng hàng không, khách sạn và gọi xe chỉ để chuẩn bị cho một chuyến công tác; họ có thể đơn giản nói rằng tuần sau tôi cần vào Đà Nẵng hai ngày để gặp khách hàng. Agent có thể kiểm tra lịch làm việc, giờ họp, ngân sách công tác, thói quen đi lại, chuyến bay phù hợp và khoảng cách từ khách sạn đến địa điểm gặp, sau đó đề xuất một phương án hoàn chỉnh hoặc tự thực hiện những bước đã đủ an toàn.

Trong bài viết này, tôi sử dụng thuật ngữ **Ultra App** để chỉ mô hình ứng dụng được hình thành từ sự thay đổi đó. Đây chưa phải một thuật ngữ có định nghĩa thống nhất trong ngành công nghệ, mà là một cách gọi cho thế hệ ứng dụng có thể xuất hiện sau Super App: một hệ sinh thái số hợp nhất, trong đó AI Agent trở thành giao diện chính giữa con người và thế giới dịch vụ. Nếu Super App có thể được hình dung là “nhiều ứng dụng bên trong một ứng dụng”, thì Ultra App gần hơn với mô hình **nhiều dịch vụ vận hành phía sau một Agent**.

![Ultra App điều phối nhiều dịch vụ phía sau một AI Agent](/blog/vuot-xa-super-app-ky-nguyen-ultra-app/ultra-app-agent-orchestration-1440.webp)

*Hình 1. Ultra App chuyển từ việc tập hợp ứng dụng sang điều phối nhiều dịch vụ phía sau một AI Agent.*

## Từ giao diện chức năng đến giao diện dựa trên ý định

Sự khác biệt quan trọng nhất giữa Super App và Ultra App không nằm ở số lượng tính năng, cũng không nằm ở việc thêm một chatbot lên màn hình chính. Một Super App có thể tích hợp một mô hình ngôn ngữ rất mạnh nhưng về bản chất vẫn chỉ là Super App nếu người dùng tiếp tục phải tự lựa chọn dịch vụ và điều khiển quy trình. Trong Ultra App, vai trò điều phối chuyển từ người dùng sang Agent: con người thể hiện điều mình muốn đạt được, còn hệ thống tự xác định những bước cần thiết phía sau.

Hãy hình dung một người nói: “Tuần tới sắp xếp giúp tôi chuyến công tác Đà Nẵng, tôi cần có mặt tại văn phòng khách hàng trước 9 giờ sáng thứ Ba và về Hà Nội tối thứ Tư.” Một Agent hiểu đủ sâu về người dùng có thể biết họ thường chọn hãng bay nào, không thích chuyến quá sớm, ưu tiên ghế lối đi, công ty quy định mức chi trả cho khách sạn tối đa là bao nhiêu và những cuộc họp nào khác đang nằm trong lịch. Nó không chỉ tìm chuyến bay rẻ nhất mà có thể xây dựng toàn bộ phương án dựa trên nhiều ràng buộc cùng lúc, rồi đặt vé, đặt phòng, lên lịch di chuyển và chuẩn bị những tài liệu liên quan. Phần mềm vẫn thực hiện rất nhiều công việc, nhưng phần lớn sự phức tạp ấy được đưa ra khỏi tầm mắt người dùng.

Khi đó, giao diện ứng dụng cũng có thể thay đổi đáng kể. Thay vì một trang chủ giống nhau cho hàng triệu người với hàng chục biểu tượng dịch vụ, Ultra App có thể chỉ cần một không gian trò chuyện, một số công việc đang diễn ra và những thông tin thực sự cần người dùng chú ý. Một sinh viên có thể nhìn thấy lịch học, việc làm và tài chính cá nhân; một nhà quản lý có thể thấy lịch họp, tài liệu cần duyệt, hợp đồng và dòng tiền; một người lớn tuổi có thể cần giao diện đơn giản hơn rất nhiều, tập trung vào gia đình, sức khỏe và những việc hằng ngày. Cá nhân hóa vì vậy không còn chỉ là thay đổi nội dung được đề xuất mà trở thành sự thay đổi trong **cách toàn bộ hệ thống hành động cho từng người**.

Đây cũng là điểm AI Agent có thể đưa Ultra App đi xa hơn những mô hình cá nhân hóa hiện nay. Hệ thống đề xuất chủ yếu cố gắng đoán xem người dùng muốn xem gì; Agent phải hiểu người dùng muốn **hoàn thành điều gì**, chấp nhận rủi ro đến đâu, thích sử dụng dịch vụ nào, những khoản nào có thể tự động thanh toán và những quyết định nào cần hỏi lại. Một ứng dụng như vậy không còn đơn thuần là nơi chứa nhiều tính năng mà dần trở thành lớp điều phối cho đời sống số.

## Trí thông minh chưa đủ để một Agent tham gia nền kinh tế

Những kịch bản trên tương đối dễ hình dung khi Agent chỉ đảm nhiệm các công việc như quản lý lịch, tìm kiếm thông tin hay đặt bàn nhà hàng. Nhưng khi Agent bắt đầu thay người dùng tham gia vào những giao dịch có giá trị, vấn đề trở nên phức tạp hơn. Một Agent có thể tìm được một chuyên gia phù hợp, nhưng làm thế nào để biết bằng cấp và kinh nghiệm mà người đó cung cấp là xác thực? Nó có thể kết nối với hệ thống của một doanh nghiệp, nhưng dựa vào đâu để xác định doanh nghiệp đó thực sự tồn tại, đang hoạt động hợp pháp và có những giấy phép cần thiết? Nếu một Agent khác tuyên bố rằng nó gắn với một công ty, hệ thống phía bên kia kiểm chứng điều đó bằng cách nào?

Đây là giới hạn mà việc cải thiện khả năng suy luận của AI không thể tự mình giải quyết. Một mô hình có thể đọc hàng nghìn tài liệu và phân tích thông tin rất nhanh, nhưng nó không thể biến một tuyên bố chưa được xác minh thành sự thật chỉ bằng cách “suy luận kỹ hơn”. Khi Agent bắt đầu thay con người thương lượng, mua bán hoặc tương tác với các hệ thống khác, nó cần phân biệt được điều một bên tuyên bố với điều bên đó có thể chứng minh.

Định danh tự chủ, hay Self-Sovereign Identity (SSI), cung cấp một cách tiếp cận cho phần quan trọng của bài toán này. Thay vì để mỗi hệ thống tự xây dựng một hồ sơ riêng rồi yêu cầu các bên còn lại tin vào cơ sở dữ liệu của mình, SSI cho phép những tuyên bố quan trọng được đưa ra dưới dạng bằng chứng số mà bên tiếp nhận có thể tự kiểm tra. Một trường đại học có thể xác nhận một người đã tốt nghiệp, doanh nghiệp có thể xác nhận quá trình làm việc, cơ quan có thẩm quyền có thể xác nhận giấy phép, còn nhà sản xuất có thể xác nhận nguồn gốc hoặc đặc tính của một thiết bị.

Những bằng chứng số như vậy được gọi là **thực chứng**. Khác với một tệp PDF hay ảnh chụp giấy tờ, thực chứng được thiết kế để máy có thể kiểm tra nguồn phát hành, tính toàn vẹn và trạng thái của bằng chứng mà không phải dựa vào việc con người quan sát rồi tự đánh giá. **Ví định tín** là nơi cá nhân hoặc tổ chức tiếp nhận, quản lý và sử dụng các thực chứng khi cần chứng minh một điều gì đó với bên khác. Trong tương lai, mô hình này cũng có thể mở rộng sang Agent và thiết bị, để chúng có thể đưa ra những bằng chứng về nguồn gốc, chủ thể mà chúng gắn với hoặc những đặc tính đã được một bên có thẩm quyền xác nhận.

Điều quan trọng là mật mã chỉ giúp xác minh bằng chứng được phát hành bởi ai, có bị thay đổi hay không và còn hiệu lực hay không; nó không tự biến nội dung của mọi thực chứng thành sự thật tuyệt đối. Một bằng cấp chỉ có ý nghĩa khi bên tiếp nhận chấp nhận trường đại học đó là đơn vị có thẩm quyền cấp bằng. Một giấy phép chỉ có giá trị khi nó đến từ cơ quan có thẩm quyền phù hợp. Vì vậy, SSI không loại bỏ nhu cầu về thẩm quyền và các quy tắc tin cậy; nó giúp những yếu tố đó được thể hiện theo cách mà phần mềm có thể kiểm tra và sử dụng tự động hơn.

Xu hướng chuyển từ giấy tờ truyền thống sang danh tính và bằng chứng số đã bắt đầu xuất hiện trong nhiều sản phẩm thực tế. Google Wallet và Apple Wallet đang mở rộng từ vai trò lưu giữ phương tiện thanh toán sang các loại giấy tờ định danh số, trong khi Liên minh châu Âu đang triển khai European Digital Identity Wallet cho nhiều tình huống sử dụng trong cả khu vực công và tư nhân. Những hệ thống này không đồng nghĩa hoàn toàn với SSI, nhưng chúng cho thấy ví số đang dần trở thành nơi con người mang theo nhiều loại bằng chứng có thể sử dụng trong các dịch vụ khác nhau.

Trong Ultra App, ý nghĩa của hướng phát triển này không dừng ở việc chuyển giấy tờ từ ví vật lý lên điện thoại. Giá trị lớn hơn nằm ở khả năng để các hệ thống xác minh danh tính, nguồn gốc và những tuyên bố quan trọng mà không phải quay lại các quy trình kiểm tra thủ công. Khi Agent có thể tự tìm, trao đổi và kiểm chứng những bằng chứng như vậy, SSI có thể trở thành một **ngôn ngữ chung của niềm tin** giữa con người, tổ chức, Agent và thiết bị trong nền kinh tế số.

![Hạ tầng tin cậy giúp AI Agent kiểm tra thông tin trước khi hành động](/blog/vuot-xa-super-app-ky-nguyen-ultra-app/ai-agent-trust-infrastructure-1440.webp)

*Hình 2. Agent chỉ có thể tham gia giao dịch đáng tin cậy khi thông tin và bằng chứng có thể được kiểm tra bằng máy.*

## Khi Agent tự kiểm chứng thay vì con người đọc giấy tờ

Hãy bắt đầu từ một tình huống quen thuộc: bộ phận tuyển dụng cần xác minh bằng đại học của ứng viên. Hiện nay, ứng viên thường gửi bản scan hoặc PDF, sau đó nhà tuyển dụng phải tự kiểm tra thông tin, tra cứu trên hệ thống của trường hoặc liên hệ trực tiếp với đơn vị cấp bằng nếu cần mức độ tin cậy cao. Dù quy trình đã được số hóa trên máy tính, cách xử lý về cơ bản vẫn không khác nhiều so với kiểm tra giấy tờ thủ công.

Trong Ultra App, phần lớn quy trình này có thể diễn ra phía sau. Agent nhận yêu cầu xác minh, xác định loại bằng chứng cần thiết rồi tìm thực chứng phù hợp trong ví định tín. Nếu nhà tuyển dụng chỉ cần biết ứng viên có thực sự tốt nghiệp đúng ngành hay không, Agent không cần chia sẻ toàn bộ bảng điểm hoặc những thông tin không liên quan. Thực chứng được chuyển sang hệ thống của bên tuyển dụng, nơi nguồn phát hành, tính toàn vẹn và trạng thái của bằng chứng được kiểm tra tự động. Thay vì một nhân viên phải mở từng tài liệu và tự đối chiếu, hệ thống có thể trả về kết quả rằng bằng cấp hợp lệ, được phát hành bởi đúng đơn vị và không có dấu hiệu bất thường. Con người chỉ cần tham gia khi dữ liệu có mâu thuẫn, bằng chứng không đủ rõ ràng hoặc trường hợp đó có mức độ rủi ro cao.

Đây là điểm SSI và AI bổ sung cho nhau. SSI tạo ra những bằng chứng mà máy có thể xác minh, còn Agent biến việc tìm, trình bày và kiểm tra những bằng chứng ấy thành một phần của quy trình tự động. Ví định tín vì vậy không còn chỉ là nơi lưu giữ giấy tờ, mà trở thành nguồn bằng chứng để Agent sử dụng khi tương tác với những hệ thống khác.

Khả năng này không chỉ giới hạn ở cá nhân. Doanh nghiệp có thể cung cấp thực chứng về tư cách pháp lý, giấy phép hoạt động hoặc chứng nhận chuyên môn. Một Agent cũng có thể được gắn với một định danh có thể kiểm chứng, giúp hệ thống bên kia xác định Agent đó được vận hành bởi hoặc gắn với chủ thể nào. Thiết bị cũng có thể đưa ra bằng chứng về nhà sản xuất, lịch sử bảo dưỡng, kiểm định hoặc tiêu chuẩn an toàn trước khi được phép tham gia một quy trình tự động.

Chuỗi cung ứng là một ví dụ dễ hình dung. Khi người dùng quét mã trên một sản phẩm, Agent không chỉ trả về thông tin do nhà bán hàng công bố. Nếu các bên trong chuỗi đã phát hành những thực chứng phù hợp, Agent có thể kiểm tra bằng chứng về nhà sản xuất, nguồn nguyên liệu, tổ chức kiểm định, quá trình vận chuyển và nhà phân phối. Sau khi đối chiếu, nó có thể xác nhận những mắt xích đã được chứng minh hoặc cảnh báo nếu một phần của chuỗi không có đủ bằng chứng. Con người không phải tự đọc hàng chục chứng từ; AI xử lý khối lượng thông tin lớn, còn các bằng chứng mật mã cho nó cơ sở để biết thông tin nào đến từ nguồn nào và có còn nguyên vẹn hay không.

Khả năng tự xác minh như vậy là một điều kiện quan trọng để Agent tiến từ vai trò trợ lý thông minh sang một hệ thống có thể tham gia sâu hơn vào các hoạt động kinh tế. Khi việc xác minh vẫn phụ thuộc vào con người ở mọi bước, mức độ tự động hóa của Agent luôn bị giới hạn bởi chính những quy trình thủ công đó.

![SSI cung cấp bằng chứng có thể kiểm chứng cho AI Agent](/blog/vuot-xa-super-app-ky-nguyen-ultra-app/ssi-agent-verifiable-trust-1440.webp)

*Hình 3. SSI cung cấp thực chứng để Agent xác minh nguồn phát hành, tính toàn vẹn và trạng thái của bằng chứng.*

## Từ niềm tin đến giao dịch: vai trò của hợp đồng thông minh và blockchain

Khả năng xác minh đối tác và những bằng chứng mà họ cung cấp mới chỉ là điều kiện đầu tiên để các Agent có thể giao dịch với nhau. Sau khi biết mình đang làm việc với ai và những thông tin nào có thể được chấp nhận, hai bên vẫn phải thống nhất hàng hóa hay dịch vụ nào sẽ được cung cấp, mức giá bao nhiêu, thời hạn hoàn thành thế nào, điều kiện nghiệm thu ra sao và khi nào thanh toán được thực hiện. Nếu Agent thay con người xử lý phần lớn quá trình này, cơ chế bảo đảm cho những thỏa thuận có thể xác định rõ cũng phải vận hành được bằng máy.

Chỉ lưu kết quả thương lượng trong lịch sử trò chuyện giữa hai Agent là chưa đủ. Hệ thống có thể gặp lỗi, một bên có thể diễn giải khác đi những gì đã thống nhất hoặc cố tình không thực hiện nghĩa vụ sau khi đã nhận lợi ích từ phía còn lại. Với những điều kiện có thể mô tả rõ ràng và kiểm tra bằng hệ thống, **hợp đồng thông minh** có thể được sử dụng để biểu diễn và tự động thực hiện thỏa thuận khi các điều kiện tương ứng được đáp ứng.

Chẳng hạn, trong một giao dịch mua bán hàng hóa, thanh toán có thể được chia thành nhiều giai đoạn: một phần được giải ngân khi đơn hàng được xác nhận, phần tiếp theo khi lô hàng vượt qua kiểm định và phần còn lại khi việc bàn giao hoàn tất. Các bên biết trước những điều kiện này và có thể theo dõi cùng một quá trình thực hiện thay vì mỗi bên tự lưu một phiên bản thỏa thuận trong hệ thống của mình. Trong ngữ cảnh này, “hợp đồng thông minh” nên được hiểu trước hết là cơ chế thực thi bằng phần mềm; nó không mặc nhiên thay thế toàn bộ hợp đồng hoặc nghĩa vụ pháp lý giữa các bên.

Hợp đồng thông minh cũng không thể loại bỏ mọi tranh chấp. Không phải điều kiện nào trong đời thực cũng có thể được máy đánh giá chính xác. Chất lượng của một sản phẩm, mức độ hài lòng với dịch vụ hay trách nhiệm khi xảy ra sự cố vẫn có thể cần đến đánh giá của con người. Nhưng với những điều kiện có thể xác định rõ, việc tự động thực hiện giúp giảm đáng kể độ trễ và khoảng trống mà một bên có thể lợi dụng để trì hoãn nghĩa vụ hoặc thay đổi cách diễn giải sau khi giao dịch đã bắt đầu.

Blockchain trở nên hữu ích khi những giao dịch như vậy diễn ra giữa nhiều cá nhân, tổ chức và hệ thống không cùng thuộc một bên quản lý. Nếu trạng thái quan trọng của giao dịch chỉ nằm trong hệ thống của người bán, người mua phải tin rằng người bán không tự ý thay đổi dữ liệu; nếu chỉ nằm trong hệ thống của người mua, vấn đề tương tự xuất hiện ở chiều ngược lại. Blockchain có thể cung cấp một cơ sở chung để các bên độc lập kiểm tra một số trạng thái hoặc sự kiện quan trọng mà không cần trao toàn bộ quyền kiểm soát cho một bên duy nhất.

Điều đó không có nghĩa mọi dữ liệu đều cần được đưa lên blockchain. Phần lớn quá trình tìm kiếm, phân tích, trao đổi hay xử lý dữ liệu của Agent vẫn có thể diễn ra bên ngoài. Blockchain chỉ cần xuất hiện ở những điểm thực sự cần một trạng thái chung có thể kiểm chứng, chẳng hạn trạng thái của hợp đồng, việc một điều kiện đã được đáp ứng hoặc những bước liên quan trực tiếp đến chuyển giao giá trị.

Trong bức tranh này, các công nghệ giải quyết những vấn đề khác nhau nhưng bổ sung cho nhau. AI giúp Agent hiểu yêu cầu và lựa chọn cách hành động; SSI cung cấp danh tính và bằng chứng để các bên kiểm tra những tuyên bố quan trọng; blockchain tạo ra trạng thái chung trong những giao dịch giữa các bên độc lập; hợp đồng thông minh thực hiện những điều kiện có thể xác định rõ; còn hệ thống thanh toán chuyển giá trị khi giao dịch đạt đến bước tương ứng.

Nhờ đó, Agent có thể tiến gần hơn đến việc xử lý một quy trình kinh tế hoàn chỉnh: tìm đối tác, kiểm tra bằng chứng, so sánh phương án, thương lượng điều kiện, theo dõi việc thực hiện và kích hoạt thanh toán. Con người vẫn giữ vai trò quyết định đối với những vấn đề quan trọng, nhưng không nhất thiết phải trực tiếp điều khiển từng bước ở giữa.

![Giao dịch số được bảo vệ và thực thi bằng phần mềm](/blog/vuot-xa-super-app-ky-nguyen-ultra-app/programmable-digital-transactions-1440.webp)

*Hình 4. Hợp đồng thông minh và hạ tầng thanh toán giúp chuyển những điều kiện đã thống nhất thành quy trình có thể thực thi bằng phần mềm.*

## Nền kinh tế Agent: khi phần mềm bắt đầu giao dịch với phần mềm

Nếu một Agent có thể tìm đối tác, kiểm tra bằng chứng, thương lượng điều kiện và theo dõi một giao dịch cho đến khi hoàn tất, những khả năng đó khó có thể chỉ dừng lại ở một vài tác vụ cá nhân. Khi ngày càng nhiều người và doanh nghiệp sử dụng Agent để xử lý công việc thay mình, một phần các hoạt động vốn cần con người trực tiếp tham gia có thể chuyển sang những cuộc trao đổi giữa các hệ thống phần mềm.

Đó là nền kinh tế Agent: một môi trường trong đó con người vẫn quyết định mục tiêu và giữ quyền kiểm soát đối với những vấn đề quan trọng, nhưng nhiều công việc ở giữa — tìm kiếm, so sánh, xác minh, thương lượng, đặt hàng hay thanh toán — được Agent thực hiện thay. Thay vì dành hàng giờ để tìm sản phẩm, đọc điều khoản, kiểm tra nhà cung cấp rồi tự đi qua từng bước của quá trình mua bán, người dùng có thể giao mục tiêu cho Agent và chỉ xuất hiện ở những thời điểm thực sự cần quyết định.

Hãy hình dung một người muốn mua một chiếc ô tô đã qua sử dụng với ngân sách và một số yêu cầu cụ thể. Hiện nay họ có thể phải tìm xe trên nhiều nền tảng, hỏi lịch sử bảo dưỡng, kiểm tra giấy tờ, trao đổi với người bán, mang xe đi kiểm định rồi làm việc với ngân hàng nếu cần vay. Với một Agent đủ năng lực, nhiều bước có thể được thực hiện trước khi người mua trực tiếp tham gia. Agent tìm những chiếc xe phù hợp, kiểm tra các thực chứng liên quan, trao đổi với hệ thống của người bán và so sánh phương án tài chính, sau đó đưa ra một số lựa chọn đáp ứng các yêu cầu đã đặt ra. Khi giao dịch đi đến những quyết định quan trọng, người dùng mới cần phê duyệt.

Phía doanh nghiệp cũng có thể thay đổi theo hướng tương tự. Thay vì chỉ triển khai chatbot để trả lời những câu hỏi đơn giản, doanh nghiệp có thể sử dụng Agent cho bán hàng, tuyển dụng, mua sắm, chăm sóc khách hàng hoặc xử lý những giao dịch thường xuyên. Agent của khách hàng có thể làm việc trực tiếp với Agent hoặc hệ thống của doanh nghiệp, mỗi bên tự xử lý phần việc của mình và chỉ đưa con người vào khi xuất hiện quyết định vượt quá phạm vi có thể tự động hóa.

Thiết bị cũng có thể trở thành một phần của môi trường này. Một chiếc xe điện có thể tự tìm trạm sạc phù hợp, kiểm tra khả năng tương thích, đặt chỗ và thanh toán. Một máy công nghiệp có thể nhận ra một linh kiện sắp đến hạn thay thế, kiểm tra những nhà cung cấp đáp ứng yêu cầu kỹ thuật rồi chuẩn bị đơn hàng để người vận hành phê duyệt. Những kịch bản như vậy chỉ khả thi khi hệ thống có thể xác minh các bên đang tham gia, hiểu rõ điều kiện giao dịch và biết khi nào cần dừng lại để con người quyết định.

Sự xuất hiện của Agent vì thế có thể làm thay đổi cả cách doanh nghiệp cạnh tranh trên Internet. Trong mô hình hiện nay, phần lớn hoạt động tiếp thị được xây dựng quanh việc thu hút sự chú ý của con người: vị trí trên trang tìm kiếm, quảng cáo, màu sắc của nút bấm, thông báo khuyến mại hay nhiều cách tối ưu tỷ lệ chuyển đổi. Nhưng một Agent đại diện cho người dùng có thể so sánh trực tiếp giá, điều khoản, thời gian giao hàng, chính sách bảo hành, độ tin cậy của nhà cung cấp và mức độ phù hợp với nhu cầu của chủ nhân.

Doanh nghiệp khi đó không chỉ phải nghĩ đến việc làm thế nào để người dùng lựa chọn sản phẩm của mình, mà còn phải cân nhắc cách để dịch vụ được Agent của khách hàng đánh giá là lựa chọn phù hợp. Điều này có thể tác động đến cách sản phẩm được xây dựng: dịch vụ không chỉ cần dễ sử dụng với con người mà còn phải cung cấp thông tin đủ rõ ràng và có cấu trúc để phần mềm có thể hiểu, kiểm tra và sử dụng.

Theo thời gian, nhiều dịch vụ có thể vẫn tồn tại nhưng ít xuất hiện trực tiếp trước mắt người dùng hơn. Nhà hàng vẫn cần hệ thống đặt bàn, hãng hàng không vẫn cần hệ thống bán vé, ngân hàng vẫn vận hành hạ tầng tài chính và công ty bảo hiểm vẫn phải xử lý nghiệp vụ của mình. Điểm khác là người dùng không nhất thiết phải tự bước vào từng hệ thống. Agent có thể trở thành con đường chính để họ tiếp cận những dịch vụ phía sau.

## Một ngày trong thế giới của Ultra App

Hãy hình dung một buổi sáng trong tương lai, khi Ultra App đã trở thành một phần quen thuộc của đời sống số. Người dùng không còn bắt đầu ngày mới bằng việc lần lượt mở lịch, email, ứng dụng ngân hàng, bản đồ và hàng loạt dịch vụ khác để xem hôm nay có việc gì cần xử lý. Phần lớn những thông tin đó đã được Agent theo dõi và sắp xếp từ trước. Khi họ thức dậy, Ultra App chỉ đưa ra những gì thực sự cần chú ý: một cuộc họp quan trọng vào buổi sáng, chuyến đi công tác đang chờ xác nhận và một khoản thanh toán có dấu hiệu khác thường cần được kiểm tra.

Cuộc họp đầu tiên bắt đầu lúc tám giờ rưỡi ở một địa điểm cách nhà khá xa. Agent đã đối chiếu lịch với tình trạng giao thông và nhận thấy tuyến đường thường đi hôm nay đang ùn tắc. Thay vì chờ người dùng tự nhận ra, mở bản đồ rồi chuyển sang ứng dụng gọi xe, nó điều chỉnh thời gian khởi hành, tìm một phương án phù hợp hơn và hiển thị đề xuất. Khi người dùng chấp thuận, các bước còn lại được thực hiện tự động.

Trên đường đi, một đồng nghiệp gửi tin nhắn xác nhận rằng cuối tháng cả nhóm sẽ vào Đà Nẵng gặp khách hàng. Với phần mềm hiện nay, câu chuyện thường dừng lại ở đó cho đến khi một người nhớ ra phải mở lịch, tìm chuyến bay, kiểm tra khách sạn rồi trao đổi lại với những người liên quan. Trong Ultra App, Agent hiểu nội dung cuộc trò chuyện trong bối cảnh công việc đang diễn ra. Nó kiểm tra lịch, đối chiếu với chính sách công tác của công ty và chuẩn bị các phương án di chuyển. Đến cuối buổi sáng, người dùng nhận được một kế hoạch gần như hoàn chỉnh gồm chuyến bay, khách sạn, thời gian di chuyển và chi phí dự kiến. Công việc của họ chủ yếu là xem lại những điểm quan trọng và xác nhận nếu không có gì cần thay đổi.

Phía sau kế hoạch đó, Agent có thể làm việc trực tiếp với hệ thống của hãng hàng không, khách sạn, đơn vị vận chuyển hoặc Agent đại diện cho các nhà cung cấp dịch vụ. Người dùng không cần biết có bao nhiêu hệ thống tham gia; họ chỉ thấy một phương án thống nhất phù hợp với nhu cầu của mình.

Đến văn phòng, công ty đang chuẩn bị đặt hàng sản xuất một lô thiết bị cho dự án mới. Agent của doanh nghiệp bắt đầu bằng việc sàng lọc các đơn vị sản xuất tiềm năng và kiểm tra những thực chứng liên quan đến năng lực, chứng nhận chất lượng hoặc mức độ tuân thủ. Khi danh sách phù hợp được hình thành, nó tiếp tục tổng hợp thông tin về nguyên vật liệu, năng lực sản xuất, thời gian vận chuyển và những điểm có thể gây gián đoạn để người quản lý có một bức tranh thống nhất thay vì phải ghép nối dữ liệu từ nhiều phòng ban và email khác nhau.

Sau khi phương án được lựa chọn, Agent theo dõi tiến độ theo các mốc đã thống nhất. Nếu một khâu chậm trễ, hệ thống đánh giá ảnh hưởng đến kế hoạch và đề xuất phương án điều chỉnh. Thanh toán cũng có thể gắn với từng giai đoạn: một phần được giải ngân khi sản xuất đạt tiêu chuẩn kiểm định, phần tiếp theo khi việc bàn giao đáp ứng điều kiện đã thỏa thuận. Người quản lý không phải giám sát từng bước mà chỉ cần can thiệp khi có sai lệch đáng kể hoặc xuất hiện quyết định vượt quá giới hạn đã đặt ra.

Buổi trưa, trải nghiệm trở lại với một việc cá nhân. Người dùng đang cân nhắc mua một thiết bị điện tử khá đắt tiền. Thay vì chỉ xem mô tả sản phẩm, đánh giá của người mua hoặc biểu tượng “chính hãng” do sàn thương mại điện tử hiển thị, họ yêu cầu Agent kiểm tra thêm. Agent lần theo các thực chứng liên quan đến nhà sản xuất, sản phẩm, đơn vị phân phối và những chứng nhận cần thiết. Nếu một mắt xích không thể kiểm tra, người dùng được cảnh báo trước khi quyết định.

Đến chiều, Agent nhận được yêu cầu thanh toán một hóa đơn định kỳ. Khoản tiền, nhà cung cấp và nội dung giao dịch đều phù hợp với lịch sử trước đó nên việc thanh toán được thực hiện trong phạm vi người dùng đã cho phép. Ít phút sau, một yêu cầu khác xuất hiện với số tiền lớn hơn nhiều so với bình thường và tài khoản nhận tiền vừa được thay đổi. Lần này Agent dừng lại, chỉ ra sự khác biệt và yêu cầu người dùng xác nhận. Ultra App vì vậy không phải một hệ thống cố gắng tự động hóa mọi việc bằng mọi giá; nó phải biết công việc nào có thể tự xử lý và công việc nào cần trả quyền quyết định về cho con người.

Những tình huống trên vẫn còn mang tính giả định, bởi hiện chưa có một hệ thống duy nhất có thể thực hiện trọn vẹn tất cả các bước đó. Nhưng nếu tách từng khả năng ra — Agent hiểu ngữ cảnh và sử dụng dịch vụ, các bên trao đổi bằng chứng có thể xác minh, phần mềm thực hiện những điều kiện đã thỏa thuận hay thanh toán được kích hoạt mà không cần người dùng thao tác ở từng bước — thì nhiều thành phần đã bắt đầu xuất hiện trong thực tế. Điều còn thiếu là khả năng đưa chúng vào cùng một trải nghiệm đủ liền mạch và đáng tin cậy.

## Những mảnh ghép đang dần hội tụ

Ultra App như được hình dung trong bài viết này chưa tồn tại dưới dạng một sản phẩm hoàn chỉnh. Tuy nhiên, nhiều công nghệ cần thiết để xây dựng nó đã xuất hiện và đang phát triển theo những hướng ngày càng gần nhau.

AI Agent là mảnh ghép dễ nhận thấy nhất. Từ những chatbot chủ yếu trả lời câu hỏi, các hệ thống AI đang tiến tới khả năng sử dụng công cụ, truy cập nhiều nguồn dữ liệu và thực hiện những công việc gồm nhiều bước. Song song với đó, các giao thức như MCP hay A2A đang được phát triển để Agent có thể kết nối với dịch vụ và giao tiếp với những Agent khác mà không cần xây dựng một cách tích hợp riêng cho từng trường hợp.

Danh tính số cũng đang thay đổi. Apple Wallet, Google Wallet hay European Digital Identity Wallet đang đưa ngày càng nhiều loại giấy tờ và bằng chứng số vào ví, mở rộng vai trò của ví từ thanh toán sang xác minh danh tính và thuộc tính trong nhiều tình huống khác nhau. Trong khi đó, các hệ thống thanh toán đang dần phải tính đến khả năng phần mềm thực hiện giao dịch trong phạm vi người dùng cho phép, thay vì mặc định mọi giao dịch đều bắt đầu bằng thao tác trực tiếp trên một giao diện.

Blockchain và hợp đồng thông minh đã phát triển từ trước làn sóng AI Agent, với những khả năng như giữ tiền theo điều kiện, giải ngân theo từng giai đoạn hay tự động thực hiện một số phần của giao dịch. Khi kết hợp với Agent và những bằng chứng có thể kiểm chứng, các cơ chế này có thể tham gia vào những quy trình mà việc xác minh, thực hiện và thanh toán ngày càng gắn chặt với nhau.

Không công nghệ nào trong số đó tự tạo ra Ultra App. Điều đáng chú ý là những hướng phát triển vốn khá tách biệt đang dần cùng giải quyết một vấn đề: làm thế nào để phần mềm không chỉ cung cấp thông tin cho con người, mà còn có thể thay con người làm việc với những hệ thống khác. Dù vậy, từ những khả năng riêng lẻ đến một hệ thống đủ đáng tin để người dùng giao cho nó phần lớn công việc hằng ngày vẫn còn một khoảng cách lớn.

## Những gì còn thiếu trước khi Ultra App có thể trở thành một thế hệ ứng dụng thực sự

Sự hội tụ của AI Agent, SSI, hợp đồng thông minh và các hệ thống thanh toán mới chỉ tạo ra những điều kiện ban đầu. Để Ultra App thực sự trở thành một thế hệ ứng dụng mới, các thành phần này không chỉ phải tồn tại mà còn phải đủ ổn định, đủ phổ biến và đủ tin cậy để vận hành cùng nhau trong đời sống hằng ngày. Khoảng cách lớn nhất vì vậy không nằm ở việc thiếu một công nghệ đơn lẻ, mà ở mức độ trưởng thành của cả hệ sinh thái.

Vấn đề đầu tiên là độ tin cậy của chính Agent. Một chatbot trả lời sai có thể chỉ gây khó chịu, nhưng một Agent hiểu sai ý định khi đang đặt vé, gửi dữ liệu hoặc thực hiện thanh toán có thể gây hậu quả trực tiếp. Vì vậy, Ultra App không thể được xây dựng theo tư tưởng tự động hóa mọi thứ bằng mọi giá. Những công việc quen thuộc, dễ hoàn tác và ít rủi ro có thể được xử lý tự động; những quyết định có giá trị lớn hoặc hậu quả lâu dài cần đưa người dùng trở lại quá trình. Một Agent đủ tốt không chỉ phải biết cách hành động mà còn phải biết khi nào nên dừng lại.

Khả năng sửa sai cũng quan trọng không kém. Khi một Agent đặt nhầm dịch vụ, gửi thông tin sai hoặc thực hiện một hành động ngoài mong muốn, hệ thống cần có cơ chế hủy, khôi phục hoặc chuyển sang quy trình xử lý tranh chấp phù hợp. Không phải hành động nào cũng có thể hoàn tác, vì vậy mức độ tự chủ của Agent phải gắn với hậu quả của từng loại quyết định chứ không chỉ với khả năng kỹ thuật của mô hình AI.

SSI cũng cần được sử dụng rộng hơn nhiều so với hiện nay. Một thực chứng chỉ thực sự có giá trị khi có tổ chức sẵn sàng phát hành, có ví để người dùng lưu giữ và có nhiều dịch vụ khác có khả năng kiểm tra rồi chấp nhận kết quả. Nếu một trường đại học phát hành bằng cấp số nhưng nhà tuyển dụng vẫn yêu cầu PDF, quy trình cũ gần như không thay đổi. Nếu mỗi ví chỉ hoạt động trong một nhóm dịch vụ riêng, SSI sẽ chỉ tạo ra những hệ thống khép kín mới thay vì trở thành ngôn ngữ chung của niềm tin. Thách thức vì vậy không chỉ nằm ở chuẩn kỹ thuật mà còn ở mức độ chấp nhận của các tổ chức, khả năng liên thông và những quy tắc chung về việc ai có thẩm quyền xác nhận điều gì.

Các dịch vụ trên Internet cũng phải thay đổi để phù hợp với một thế giới mà Agent ngày càng trở thành bên trực tiếp sử dụng chúng. Phần lớn website và ứng dụng hiện nay vẫn được thiết kế với giả định rằng một con người sẽ đọc nội dung, bấm nút và đi qua từng bước trên giao diện. Trong Ultra App, dịch vụ cần cung cấp thông tin và chức năng theo cách Agent có thể hiểu, kiểm tra điều kiện và thực hiện giao dịch trực tiếp, thay vì buộc Agent phải mô phỏng thao tác của con người trên màn hình. Nếu mỗi dịch vụ vẫn tồn tại như một ốc đảo với giao diện, dữ liệu và quy trình riêng, khả năng kết nối liền mạch mà Ultra App hướng tới sẽ rất khó đạt được.

Tuy nhiên, thách thức lớn nhất có thể nằm ở dữ liệu và quyền riêng tư. Một Agent càng hiểu người dùng thì càng có thể chủ động và cá nhân hóa tốt hơn. Muốn lên kế hoạch công tác, nó cần biết lịch; muốn lựa chọn dịch vụ phù hợp, nó phải hiểu sở thích và thói quen; muốn quản lý thanh toán, nó cần tiếp cận thông tin tài chính; muốn nhận ra một câu trong cuộc trò chuyện có thể dẫn đến một công việc cần xử lý, nó phải hiểu ngữ cảnh của những cuộc trò chuyện đó. Chính ở đây xuất hiện một nghịch lý khó tránh: **Agent càng hữu ích thì càng cần biết nhiều, nhưng càng biết nhiều thì hậu quả của việc dữ liệu bị lạm dụng càng nghiêm trọng.**

Nếu toàn bộ lịch sử giao tiếp, vị trí, tài chính, danh tính, quan hệ xã hội và khả năng thực hiện giao dịch đều tập trung vào một nền tảng duy nhất, Ultra App có thể trở thành một công cụ giám sát mạnh hơn bất kỳ Super App nào hiện nay. Đây không chỉ là vấn đề bảo mật dữ liệu, mà còn là vấn đề quyền lực: một nền tảng vừa hiểu người dùng rất sâu, vừa kiểm soát giao diện mà họ sử dụng để tiếp cận phần lớn dịch vụ, lại vừa có khả năng hành động thay họ sẽ có mức độ ảnh hưởng rất lớn đối với đời sống số của một cá nhân.

Triết lý của SSI vì vậy cần được đưa vào cách Ultra App được xây dựng ngay từ đầu. SSI không giải quyết toàn bộ bài toán quyền riêng tư, nhưng nó đặt ra một nguyên tắc quan trọng: một dịch vụ không cần biết mọi thứ về một người chỉ để xác minh một điều cụ thể. Nếu chỉ cần chứng minh người dùng đã đủ tuổi, không có lý do để gửi toàn bộ giấy tờ định danh; nếu nhà tuyển dụng chỉ cần xác minh bằng cấp, không cần cung cấp thêm những dữ liệu không liên quan. Agent cũng nên ưu tiên chia sẻ thông tin tối thiểu, cảnh báo khi một dịch vụ yêu cầu quá nhiều dữ liệu và sử dụng những cơ chế bảo vệ quyền riêng tư phù hợp khi có thể.

Cuối cùng là khả năng liên thông. Agent của một nền tảng phải có thể làm việc với dịch vụ của nền tảng khác, kiểm tra thực chứng do một tổ chức thứ ba phát hành và sử dụng hệ thống thanh toán của một bên độc lập. Nếu mỗi Ultra App chỉ hoạt động tốt với những dịch vụ nằm trong cùng một hệ sinh thái, chúng ta sẽ chỉ có những Super App lớn hơn, thông minh hơn và khép kín hơn.

Vì vậy, con đường từ những Agent hiện nay đến Ultra App không chỉ phụ thuộc vào việc AI trở nên thông minh đến đâu. Nó còn phụ thuộc vào độ tin cậy của Agent, khả năng sửa sai, mức độ phổ biến của danh tính và bằng chứng số, khả năng liên thông giữa các dịch vụ và cách dữ liệu được bảo vệ. Chỉ khi những vấn đề đó được giải quyết cùng nhau, Ultra App mới có thể vượt khỏi phạm vi của một ý tưởng hấp dẫn và trở thành một mô hình ứng dụng có thể được sử dụng ở quy mô lớn.

## Kết luận: từ Super App đến một cách vận hành mới của đời sống số

Super App từng giải quyết một vấn đề rõ ràng: thay vì buộc người dùng cài đặt và chuyển đổi giữa quá nhiều ứng dụng, nó đưa nhiều dịch vụ vào cùng một hệ sinh thái. Nhưng dù có thêm bao nhiêu Mini App hay chức năng mới, cách con người sử dụng phần mềm về cơ bản vẫn không thay đổi. Người dùng vẫn phải biết mình cần dịch vụ nào, tìm nó ở đâu và thực hiện từng bước cho đến khi công việc hoàn tất.

Ultra App hướng đến một thay đổi khác. Thay vì tiếp tục đưa thêm dịch vụ lên màn hình, nó để phần lớn những dịch vụ đó vận hành phía sau một Agent. Con người chủ yếu thể hiện điều mình muốn đạt được; Agent hiểu hoàn cảnh, lựa chọn dịch vụ phù hợp và thực hiện những bước cần thiết trong phạm vi đã được cho phép. Khi mô hình này mở rộng, một phần ngày càng lớn của các hoạt động số có thể diễn ra trực tiếp giữa Agent, dịch vụ và hệ thống của nhiều tổ chức khác nhau, trong khi con người tập trung vào mục tiêu và những quyết định thực sự cần phán đoán.

Để đạt đến mức đó, AI phải đi cùng với những cơ chế giúp hệ thống xác minh thông tin, thực hiện thỏa thuận, chuyển giao giá trị và bảo vệ dữ liệu. SSI, blockchain, hợp đồng thông minh hay các giao thức kết nối không tự tạo ra Ultra App, nhưng chúng giải quyết những vấn đề mà trí thông minh của AI không thể tự mình xử lý. Quan trọng hơn, mức độ tự động hóa chỉ có ý nghĩa khi nó đi cùng độ tin cậy, khả năng kiểm soát và quyền riêng tư tương xứng.

Nếu Super App là nỗ lực đưa ngày càng nhiều dịch vụ vào cùng một ứng dụng, thì Ultra App có thể đi theo hướng ngược lại ở tầng trải nghiệm: **đưa ngày càng nhiều dịch vụ ra khỏi tầm mắt người dùng**. Những hệ thống phía sau vẫn tồn tại, nhưng con người không còn phải tự đi qua từng nơi để hoàn thành một công việc.

Đó có thể là bước chuyển đáng chú ý nhất của thế hệ ứng dụng tiếp theo: từ một thế giới nơi con người phải học cách sử dụng phần mềm sang một thế giới nơi phần mềm ngày càng phải học cách hiểu con người — và phần lớn sự phức tạp của đời sống số được xử lý trước khi nó kịp xuất hiện trên màn hình.

## Tài liệu tham khảo

1. **Tencent.** *Weixin & WeChat.* Giới thiệu hệ sinh thái Weixin/WeChat, bao gồm nhắn tin, thanh toán, Mini Programs và các dịch vụ tích hợp. https://www.tencent.com/products/weixin-wechat/

2. **Tencent.** *Weixin Mini Programs.* Tổng quan chính thức về mô hình Mini Program và cách các dịch vụ của bên thứ ba được đưa vào hệ sinh thái Weixin. https://www.tencent.com/products/weixin-mini-programs/

3. **World Wide Web Consortium (W3C).** *Verifiable Credentials Data Model v2.0.* W3C Recommendation, 15 May 2025. Đặc tả mô hình dữ liệu cho Verifiable Credentials, hệ sinh thái issuer–holder–verifier, cơ chế bảo vệ tính toàn vẹn, quyền riêng tư và khả năng xác minh bằng máy. https://www.w3.org/TR/vc-data-model-2.0/

4. **World Wide Web Consortium (W3C).** *Decentralized Identifiers (DIDs) v1.0.* W3C Recommendation, 19 July 2022. Đặc tả kiến trúc và mô hình dữ liệu cốt lõi cho Decentralized Identifiers. https://www.w3.org/TR/did-core/

5. **European Commission.** *European Digital Identity (EUDI) Regulation.* Tổng quan về khuôn khổ European Digital Identity Wallet, khả năng nhận dạng điện tử, lưu giữ bằng chứng số và sử dụng danh tính trong các dịch vụ công và tư nhân. https://digital-strategy.ec.europa.eu/en/policies/eudi-regulation

6. **European Commission.** *EU Digital Identity Wallet Toolbox process.* Kiến trúc tham chiếu, tiêu chuẩn, giao thức và các chương trình thử nghiệm quy mô lớn dành cho European Digital Identity Wallet. https://digital-strategy.ec.europa.eu/en/policies/eudi-wallet-toolbox

7. **Apple.** *Use your Digital ID in Apple Wallet.* Tài liệu chính thức về việc lưu trữ và trình bày Digital ID trong Apple Wallet để xác minh danh tính trực tiếp, trong ứng dụng hoặc trên web. https://support.apple.com/en-lamr/123719

8. **Google for Developers.** *Identity — Google Wallet.* Tài liệu về việc phát hành, lưu giữ và xác minh thông tin định danh được ký mật mã trong Google Wallet. https://developers.google.com/wallet/identity

9. **Model Context Protocol.** *What is the Model Context Protocol (MCP)?* Tài liệu giới thiệu chuẩn mở cho phép ứng dụng AI kết nối với nguồn dữ liệu, công cụ và quy trình bên ngoài. https://modelcontextprotocol.io/docs/getting-started/intro

10. **A2A Project / Linux Foundation.** *Agent2Agent (A2A) Protocol Specification.* Đặc tả giao thức mở hỗ trợ khám phá khả năng, trao đổi thông tin và phối hợp tác vụ giữa các hệ thống AI Agent độc lập. https://a2a-protocol.org/dev/specification/

11. **Ethereum.org.** *Introduction to smart contracts.* Tổng quan về smart contract như chương trình chạy trên blockchain, có thể biểu diễn quy tắc và thực thi hành động khi nhận giao dịch phù hợp. https://ethereum.org/developers/docs/smart-contracts/`,
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
