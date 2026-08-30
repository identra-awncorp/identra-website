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

export const ONLINE_FRAUD_DATA_PROTECTION_BLOG_ARTICLE_ID =
  'lua-dao-truc-tuyen-va-bai-toan-bao-ve-du-lieu-ca-nhan-trong-thoi-dai-so' as const;

const assetRoot = `/blog/${ONLINE_FRAUD_DATA_PROTECTION_BLOG_ARTICLE_ID}`;

export const ONLINE_FRAUD_DATA_PROTECTION_BLOG_ARTICLE = {
  id: ONLINE_FRAUD_DATA_PROTECTION_BLOG_ARTICLE_ID,
  slug: ONLINE_FRAUD_DATA_PROTECTION_BLOG_ARTICLE_ID,
  publishedAt: '2026-08-30',
  modifiedAt: '2026-08-30',
  author: {
    type: 'Organization',
    name: 'Identra',
  },
  topics: ['fraud', 'security', 'privacy'],
  industries: ['all'],
  contentLocales: ['vi'],
  relatedArticleIds: [
    'ro-ri-du-lieu-tai-trung-quoc-va-an-do-bai-hoc-ve-an-ninh-du-lieu-va-cach-ssi-thay-doi-cach-chung-ta-bao-ve-thong-tin',
    'tiet-lo-co-chon-loc-la-gi',
    'dinh-danh-tu-chu-ssi-la-gi',
  ],
  coverImage: {
    src: `${assetRoot}/online-fraud-cover-1440.webp`,
    srcSet: [
      `${assetRoot}/online-fraud-cover-800.webp 800w`,
      `${assetRoot}/online-fraud-cover-1440.webp 1440w`,
    ].join(', '),
    sizes: '(min-width: 1024px) 680px, (min-width: 768px) 55vw, 100vw',
    width: 1440,
    height: 810,
  },
  socialImage: {
    src: `${assetRoot}/online-fraud-data-protection-og.jpg`,
    width: 1200,
    height: 630,
    type: 'image/jpeg',
  },
  listing: {
    en: {
      title: 'Online Fraud and Personal Data Protection in the Digital Age',
      description: 'How leaked personal data makes impersonation more convincing and how SSI can help verify identity, roles and authority while reducing data collection.',
      type: 'Data security',
      duration: '8 min read',
    },
    es: {
      title: 'Fraude en línea y protección de datos personales en la era digital',
      description: 'Cómo los datos filtrados hacen más creíble la suplantación y cómo SSI ayuda a verificar identidad, funciones y autoridad reduciendo la recopilación de datos.',
      type: 'Seguridad de datos',
      duration: '8 min de lectura',
    },
    ja: {
      title: 'デジタル時代のオンライン詐欺と個人データ保護',
      description: '漏えいした個人データがなりすましを巧妙化する仕組みと、SSIがデータ収集を抑えながら本人性、役割、権限の検証を支える方法を解説します。',
      type: 'データセキュリティ',
      duration: '読了8分',
    },
    de: {
      title: 'Online-Betrug und Schutz personenbezogener Daten im digitalen Zeitalter',
      description: 'Wie geleakte Daten Identitätsbetrug glaubwürdiger machen und SSI Identität, Rollen und Befugnisse bei geringerer Datenerhebung überprüfbar macht.',
      type: 'Datensicherheit',
      duration: '8 Min. Lesezeit',
    },
    vi: {
      title: 'Lừa đảo trực tuyến và bài toán bảo vệ dữ liệu cá nhân trong thời đại số',
      description: 'Dữ liệu cá nhân bị rò rỉ khiến giả mạo ngày càng thuyết phục; SSI bổ sung khả năng xác minh danh tính, vai trò và quyền hạn trong giao dịch số.',
      type: 'An ninh dữ liệu',
      duration: 'Đọc trong 8 phút',
    },
  } satisfies Record<Locale, BlogArticleListingCopy>,
  images: {},
  content: {
    vi: {
      title: 'Lừa đảo trực tuyến và bài toán bảo vệ dữ liệu cá nhân trong thời đại số',
      description: 'Dữ liệu cá nhân bị rò rỉ khiến giả mạo ngày càng thuyết phục; SSI bổ sung khả năng xác minh danh tính, vai trò và quyền hạn trong giao dịch số.',
      excerpt: 'Khi hình ảnh, giọng nói và dữ liệu cá nhân đều có thể bị sao chép, niềm tin cần được xây dựng bằng bằng chứng có thể kiểm chứng thay vì những dấu hiệu bề ngoài.',
      category: 'An ninh dữ liệu',
      tags: ['Lừa đảo trực tuyến', 'Bảo vệ dữ liệu', 'Định danh tự chủ', 'Xác minh danh tính'],
      readTimeMinutes: 8,
      ui: {
        publishedLabel: 'Xuất bản ngày',
        authorRole: 'Đội ngũ nội dung Identra',
        tableOfContents: 'Mục lục',
        openTableOfContents: 'Mở mục lục bài viết',
        closeTableOfContents: 'Đóng mục lục bài viết',
        ctaTitle: 'Xây dựng niềm tin bằng bằng chứng có thể kiểm chứng',
        ctaDescription: 'Khám phá cách Identra giúp các bên chứng minh danh tính, vai trò và quyền hạn mà không phải chia sẻ nhiều dữ liệu hơn mức cần thiết.',
        ctaButtonLabel: 'Trải nghiệm demo',
      },
      tableOfContents: [
        {
          id: 'du-lieu-ca-nhan-dang-tro-thanh-nguyen-lieu-cho-lua-dao',
          label: 'Dữ liệu cá nhân đang trở thành nguyên liệu cho lừa đảo',
          level: 2,
        },
        {
          id: 'nguoi-dung-dang-phai-tu-ganh-qua-nhieu-trach-nhiem-trong-viec-nhan-biet-lua-dao',
          label: 'Người dùng đang phải tự gánh quá nhiều trách nhiệm trong việc nhận biết lừa đảo',
          level: 2,
        },
        {
          id: 'tu-viec-tin-vao-hinh-thuc-sang-kiem-tra-bang-chung',
          label: 'Từ việc tin vào hình thức sang kiểm tra bằng chứng',
          level: 2,
        },
        {
          id: 'khong-co-cong-nghe-nao-co-the-loai-bo-hoan-toan-lua-dao',
          label: 'Không có công nghệ nào có thể loại bỏ hoàn toàn lừa đảo',
          level: 2,
        },
      ] satisfies BlogArticleTableOfContentsItem[],
      markdown: `Lừa đảo trực tuyến không còn là những tin nhắn vụng về, những đường dẫn dễ nhận biết hay những cuộc gọi với kịch bản sơ sài như trước.

Ngày nay, kẻ lừa đảo có thể biết tên thật, số điện thoại, địa chỉ, nơi làm việc, ngân hàng đang sử dụng, thậm chí cả thông tin về người thân. Khi kết hợp những dữ liệu này với công cụ giả giọng nói, tạo hình ảnh, video hoặc nội dung bằng trí tuệ nhân tạo, một cuộc lừa đảo có thể được chuẩn bị rất kỹ và mang nhiều chi tiết giống với hoàn cảnh thực tế của nạn nhân.

Đây cũng là lý do các vụ rò rỉ dữ liệu cá nhân không chỉ dừng lại ở câu chuyện quyền riêng tư. Sau khi dữ liệu bị đánh cắp, nó có thể tiếp tục được mua bán, ghép nối với nhiều nguồn khác và trở thành nguyên liệu cho những hình thức giả mạo ngày càng khó nhận biết.

Nếu trước đây một cuộc gọi từ số lạ chỉ biết tên của bạn đã đủ khiến nhiều người nghi ngờ, thì ngày nay người gọi có thể đọc đúng địa chỉ, số định danh, ngân hàng đang sử dụng hoặc một số thông tin mà bình thường chỉ các tổ chức có liên quan mới biết. Chính những chi tiết đúng đó khiến phần giả trong câu chuyện trở nên thuyết phục hơn.

## Dữ liệu cá nhân đang trở thành nguyên liệu cho lừa đảo

Một cuộc lừa đảo hiệu quả thường không được xây dựng hoàn toàn bằng thông tin giả.

Ngược lại, kẻ xấu càng có nhiều thông tin thật, chúng càng dễ tạo được cảm giác đáng tin.

Một người tự xưng là nhân viên ngân hàng có thể biết đúng họ tên và số tài khoản của khách hàng. Một đối tượng giả danh cơ quan nhà nước có thể đọc chính xác số định danh và địa chỉ. Một kẻ giả danh người thân có thể biết tên các thành viên trong gia đình, nơi làm việc hoặc những sự kiện gần đây.

Những thông tin này có thể đến từ một vụ rò rỉ dữ liệu lớn, một cơ sở dữ liệu bị mua bán, một tài khoản mạng xã hội bị thu thập thông tin hoặc từ việc ghép nối nhiều nguồn dữ liệu khác nhau.

Điều đáng lo là phần lớn dữ liệu cá nhân không được tạo ra để trở thành bí mật lâu dài. Họ tên, ngày sinh, số điện thoại, địa chỉ hay thông tin nghề nghiệp thường được cung cấp cho rất nhiều tổ chức trong suốt quá trình sử dụng dịch vụ.

Càng nhiều nơi lưu giữ cùng một loại thông tin, khả năng dữ liệu bị thất thoát ở một thời điểm nào đó càng tăng.

Sau khi đã bị phát tán, những thông tin này rất khó lấy lại. Người dùng có thể đổi mật khẩu, khóa thẻ ngân hàng hoặc thay một khóa mật mã, nhưng không thể đơn giản thay ngày sinh, khuôn mặt hay lịch sử cá nhân của mình.

Đó là lý do việc thu thập quá nhiều dữ liệu không chỉ tạo ra rủi ro cho quyền riêng tư. Nó còn cung cấp thêm công cụ cho những người muốn giả mạo hoặc thao túng người dùng.

Trí tuệ nhân tạo khiến vấn đề này trở nên phức tạp hơn.

Chỉ từ một lượng nhỏ dữ liệu, các công cụ hiện nay đã có thể tạo ra nội dung tự nhiên hơn, bắt chước cách giao tiếp, giả giọng nói hoặc tạo hình ảnh và video có độ thuyết phục ngày càng cao. Những dấu hiệu mà người dùng từng dựa vào để phân biệt thật giả vì thế cũng dần mất đi giá trị.

Trong môi trường đó, việc một người biết nhiều thông tin chính xác về chúng ta không còn đủ để cho thấy họ đại diện cho một tổ chức có thật hay đang thực hiện một yêu cầu hợp lệ.

## Người dùng đang phải tự gánh quá nhiều trách nhiệm trong việc nhận biết lừa đảo

Các khuyến nghị chống lừa đảo hiện nay phần lớn đều đúng: không cung cấp mã xác nhận, không nhấp vào đường dẫn lạ, không chuyển tiền khi chưa kiểm tra, gọi lại tổng đài chính thức khi nghi ngờ.

Nhưng những biện pháp này có một điểm chung: phần lớn trách nhiệm vẫn đặt lên người dùng.

Người dùng phải tự nhìn vào một tin nhắn và đoán xem nó có thật hay không. Phải nghe một cuộc gọi rồi đánh giá người ở đầu dây có đáng tin hay không. Phải nhìn vào một website, một tài khoản hay một đoạn video và tự quyết định liệu mình có đang bị giả mạo hay không.

Cách làm đó ngày càng khó khi công cụ giả mạo tốt hơn và dữ liệu cá nhân của mỗi người ngày càng dễ bị tìm thấy.

Một logo có thể được sao chép.

Tên thương hiệu có thể giả.

Số điện thoại có thể bị làm giả hoặc chiếm quyền.

Giọng nói cũng có thể được bắt chước.

Ngay cả việc người gọi biết chính xác một số thông tin riêng tư của khách hàng cũng không còn là dấu hiệu đủ mạnh để xác nhận rằng họ thực sự đến từ ngân hàng, doanh nghiệp hay cơ quan mà họ đang nhắc tới.

Vì vậy, nếu chỉ tiếp tục yêu cầu người dùng phải “cảnh giác hơn”, chúng ta sẽ ngày càng đẩy họ vào một bài toán khó hơn trong khi khả năng giả mạo liên tục được cải thiện.

Một hệ thống tốt hơn cần giúp người dùng kiểm tra được bên đang liên hệ có đúng là tổ chức đó hay không, người đang đại diện cho tổ chức có đúng vai trò và quyền hạn hay không, thay vì buộc người dùng phải suy đoán từ hình thức bên ngoài.

Đây là chỗ SSI có thể bổ sung một lớp bảo vệ rất đáng chú ý.

## Từ việc tin vào hình thức sang kiểm tra bằng chứng

Trong mô hình SSI, một tổ chức có thể có mã định danh và những thực chứng giúp các hệ thống khác kiểm tra được danh tính, tư cách hoặc thẩm quyền của tổ chức đó.

Một nhân viên cũng có thể được cấp thực chứng cho biết họ đang làm việc cho tổ chức nào, giữ vai trò gì và được phép thực hiện những công việc nào.

Điều này mở ra một cách tương tác khác.

Thay vì chỉ nhận một tin nhắn có logo ngân hàng, người dùng có thể kiểm tra liệu bên gửi có thực sự được ngân hàng đó xác nhận hay không.

Thay vì chỉ nghe một người tự giới thiệu là nhân viên hỗ trợ, hệ thống có thể kiểm tra người đó có đang giữ vai trò phù hợp và có quyền thực hiện yêu cầu đang đưa ra hay không.

Tương tự, khi một dịch vụ yêu cầu dữ liệu cá nhân, ví định tín có thể giúp người dùng biết ai đang yêu cầu, họ cần thông tin gì và liệu có thực sự cần chia sẻ toàn bộ dữ liệu hay không.

Điểm này đặc biệt quan trọng vì lừa đảo và rò rỉ dữ liệu có liên hệ rất chặt với nhau.

Càng nhiều dữ liệu cá nhân được sao chép sang nhiều hệ thống, kẻ xấu càng có nhiều nguồn để khai thác. Nếu một dịch vụ chỉ cần biết người dùng đã đủ tuổi, việc lưu cả ảnh căn cước sẽ tạo ra nhiều rủi ro hơn mức cần thiết. Nếu một nhà tuyển dụng chỉ cần kiểm tra bằng cấp, họ không nhất thiết phải giữ toàn bộ hồ sơ học tập.

Cơ chế tiết lộ có chọn lọc cho phép giảm lượng thông tin phải chia sẻ trong những tình huống như vậy. Dịch vụ nhận đúng phần cần thiết để xác minh, thay vì thu cả một bộ giấy tờ chỉ để kiểm tra một thuộc tính nhỏ.

Khi lượng dữ liệu được thu thập ít hơn, một vụ rò rỉ cũng để lại ít thông tin có thể bị sử dụng cho các kịch bản lừa đảo sau này hơn.

SSI vì vậy không chỉ liên quan đến việc xác minh danh tính. Giá trị của nó còn nằm ở việc giảm bớt lượng dữ liệu phải lưu trữ và tạo ra một cách rõ ràng hơn để các bên chứng minh vai trò, tư cách và quyền hạn của mình trong một giao dịch số.

## Không có công nghệ nào có thể loại bỏ hoàn toàn lừa đảo

SSI không thể ngăn một người tự nguyện chuyển tiền cho kẻ xấu.

Nó cũng không thể giải quyết mọi trường hợp thiết bị bị chiếm quyền, phần mềm độc hại, thao túng tâm lý hay những hành vi gian lận xuất phát từ chính một tổ chức hợp pháp.

Các biện pháp an ninh truyền thống, quy trình kiểm soát giao dịch, giáo dục người dùng và pháp luật vẫn giữ vai trò không thể thay thế.

Nhưng SSI có thể làm giảm một khoảng trống rất lớn đang tồn tại trên Internet hiện nay: chúng ta thường có rất ít công cụ để kiểm tra ngay lập tức danh tính và quyền hạn của bên đang tương tác.

Trong một môi trường mà hình ảnh, giọng nói, tên tài khoản và nhiều thông tin cá nhân đều có thể bị sao chép, việc dựa vào những dấu hiệu bề ngoài để xây dựng lòng tin sẽ ngày càng kém hiệu quả.

Bảo vệ người dùng vì thế cần được thực hiện từ cả hai phía.

Một phía là giảm lượng dữ liệu cá nhân bị thu thập, sao chép và lưu giữ không cần thiết.

Phía còn lại là tạo ra những cơ chế để các bên có thể chứng minh danh tính, tư cách và quyền hạn của mình theo cách mà hệ thống có thể kiểm tra.

Nếu làm được cả hai, dữ liệu bị rò rỉ sẽ ít hữu ích hơn đối với kẻ xấu, trong khi người dùng cũng có thêm công cụ để kiểm tra những bên đang yêu cầu họ cung cấp thông tin hoặc thực hiện giao dịch.

Đó là một hướng tiếp cận phù hợp hơn với môi trường số hiện nay, nơi việc tạo ra một thông điệp, một hình ảnh hay thậm chí một giọng nói giống thật ngày càng trở nên dễ dàng.

Trong bối cảnh đó, niềm tin không thể tiếp tục chỉ dựa vào cảm giác quen thuộc hay những thông tin mà một người có thể đọc đúng về chúng ta. Nó cần được hỗ trợ bởi những bằng chứng có thể kiểm chứng ngay trong chính quá trình tương tác.`,
    },
  },
} satisfies StructuredBlogArticle;
