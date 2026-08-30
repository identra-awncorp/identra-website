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

export const SSI_EDUCATION_BLOG_ARTICLE_ID =
  'ssi-trong-giao-duc-giai-phap-so-hoa-bang-cap-va-xac-minh-nang-luc' as const;

const assetRoot = '/blog/ssi-trong-giao-duc-giai-phap-so-hoa-bang-cap-va-xac-minh-nang-luc';

export const SSI_EDUCATION_BLOG_ARTICLE = {
  id: SSI_EDUCATION_BLOG_ARTICLE_ID,
  slug: SSI_EDUCATION_BLOG_ARTICLE_ID,
  publishedAt: '2026-07-26',
  modifiedAt: '2026-07-26',
  author: {
    type: 'Organization',
    name: 'Identra',
  },
  topics: ['identity', 'privacy'],
  industries: ['education'],
  contentLocales: ['vi'],
  relatedArticleIds: [
    'tu-thi-diem-cua-mit-den-lan-song-so-hoa-bang-cap-khong-the-dao-nguoc',
    'ho-so-hoc-tap-suot-doi-loi-ich-cua-mo-hinh-dinh-danh-tu-chu-doi-voi-nguoi-hoc',
    'rao-can-phap-ly-trong-tuyen-dung-quoc-te-ssi-mo-duong-cho-nhan-su-remote-nhu-the-nao',
  ],
  coverImage: {
    src: `${assetRoot}/digital-credentials-future-academic-records-1440.webp`,
    srcSet: [
      `${assetRoot}/digital-credentials-future-academic-records-800.webp 800w`,
      `${assetRoot}/digital-credentials-future-academic-records-1440.webp 1440w`,
    ].join(', '),
    sizes: '(min-width: 1024px) 680px, (min-width: 768px) 55vw, 100vw',
    width: 1440,
    height: 810,
  },
  socialImage: {
    src: `${assetRoot}/ssi-trong-giao-duc-giai-phap-so-hoa-bang-cap-va-xac-minh-nang-luc-og.jpg`,
    width: 1200,
    height: 630,
    type: 'image/jpeg',
  },
  listing: {
    en: {
      title: 'SSI in education: Digitizing degrees and verifying skills',
      description: 'How verifiable educational credentials can reduce manual degree checks, prevent fraud, and give learners control over trusted academic records.',
      type: 'Education',
      duration: '20 min read',
    },
    es: {
      title: 'SSI en la educación: Digitalización de títulos y verificación de competencias',
      description: 'Cómo las credenciales educativas verificables reducen las comprobaciones manuales, previenen el fraude y dan al estudiante control sobre su expediente.',
      type: 'Educación',
      duration: '20 min de lectura',
    },
    ja: {
      title: '教育におけるSSI：学位のデジタル化と能力の検証',
      description: '検証可能な教育証明が、学位確認の手作業を減らし、不正を防ぎ、学習者による信頼できる学習記録の管理を可能にする仕組みを解説します。',
      type: '教育',
      duration: '読了20分',
    },
    de: {
      title: 'SSI im Bildungswesen: Abschlüsse digitalisieren und Kompetenzen verifizieren',
      description: 'Wie verifizierbare Bildungsnachweise manuelle Prüfungen reduzieren, Betrug verhindern und Lernenden Kontrolle über vertrauenswürdige Bildungsdaten geben.',
      type: 'Bildung',
      duration: '20 Min. Lesezeit',
    },
    vi: {
      title: 'SSI trong giáo dục: Giải pháp số hóa bằng cấp và xác minh năng lực',
      description: 'Cách thực chứng giáo dục giúp giảm xác minh thủ công, chống gian lận văn bằng và trao cho người học quyền chủ động sử dụng kết quả học tập.',
      type: 'Giáo dục',
      duration: 'Đọc trong 20 phút',
    },
  } satisfies Record<Locale, BlogArticleListingCopy>,
  images: {
    [`${assetRoot}/digital-credentials-future-academic-records-1440.webp`]: responsiveImage('digital-credentials-future-academic-records'),
    [`${assetRoot}/ssi-digital-degrees-skills-verification-1440.webp`]: responsiveImage('ssi-digital-degrees-skills-verification'),
    [`${assetRoot}/selective-disclosure-private-data-sharing-1440.webp`]: responsiveImage('selective-disclosure-private-data-sharing'),
    [`${assetRoot}/learning-passport-digital-education-records-1440.webp`]: responsiveImage('learning-passport-digital-education-records'),
  } satisfies Record<string, BlogArticleImage>,
  content: {
    vi: {
      title: 'SSI trong giáo dục: Giải pháp số hóa bằng cấp và xác minh năng lực',
      description: 'Tìm hiểu cách SSI biến bằng cấp và kết quả học tập thành thực chứng có thể kiểm tra, giúp trường học, người học và nhà tuyển dụng trao đổi dữ liệu đáng tin cậy hơn.',
      excerpt: 'Số hóa bằng cấp không nên dừng ở PDF hay mã QR. Giá trị lớn hơn xuất hiện khi kết quả học tập trở thành bằng chứng số có thể kiểm tra, mang theo và sử dụng ngoài hệ thống của trường.',
      category: 'Giáo dục',
      tags: ['SSI', 'Giáo dục số', 'Thực chứng', 'Bằng cấp số', 'Xác minh năng lực'],
      readTimeMinutes: 20,
      ui: {
        publishedLabel: 'Xuất bản ngày',
        authorRole: 'Đội ngũ nội dung Identra',
        tableOfContents: 'Mục lục',
        openTableOfContents: 'Mở mục lục bài viết',
        closeTableOfContents: 'Đóng mục lục bài viết',
        ctaTitle: 'Trải nghiệm xác minh năng lực với Identra',
        ctaDescription: 'Khám phá cách thực chứng bằng cấp và chứng chỉ được sử dụng trong quy trình tuyển dụng số.',
        ctaButtonLabel: 'Trải nghiệm demo',
      },
      tableOfContents: [
        { id: 'khi-bang-cap-da-duoc-so-hoa-nhung-viec-xac-minh-van-con-thu-cong', label: 'Khi xác minh bằng cấp vẫn còn thủ công', level: 2 },
        { id: 'tu-tai-lieu-dien-tu-den-bang-chung-co-the-xac-minh', label: 'Từ tài liệu điện tử đến bằng chứng có thể xác minh', level: 2 },
        { id: 'ssi-thay-doi-quy-trinh-cap-va-xac-minh-bang-cap-nhu-the-nao', label: 'SSI thay đổi quy trình bằng cấp thế nào?', level: 2 },
        { id: 'nguoi-hoc-khong-nhat-thiet-phai-cung-cap-toan-bo-ho-so', label: 'Chia sẻ đúng dữ liệu cần thiết', level: 2 },
        { id: 'khong-chi-co-bang-tot-nghiep', label: 'Không chỉ có bằng tốt nghiệp', level: 2 },
        { id: 'loi-ich-doi-voi-nguoi-hoc', label: 'Lợi ích đối với người học', level: 2 },
        { id: 'loi-ich-doi-voi-truong-hoc-va-co-so-dao-tao', label: 'Lợi ích đối với cơ sở đào tạo', level: 2 },
        { id: 'loi-ich-doi-voi-nha-tuyen-dung-va-ben-tiep-nhan', label: 'Lợi ích đối với nhà tuyển dụng', level: 2 },
        { id: 'ssi-khong-dong-nghia-voi-viec-dua-bang-cap-len-blockchain', label: 'SSI không đồng nghĩa với blockchain', level: 2 },
        { id: 'cong-nghe-xac-minh-chua-du-de-tao-ra-niem-tin', label: 'Công nghệ chưa đủ để tạo niềm tin', level: 2 },
        { id: 'vi-sao-giao-duc-la-linh-vuc-phu-hop-de-bat-dau', label: 'Vì sao nên bắt đầu từ giáo dục?', level: 2 },
        { id: 'ket-luan', label: 'Kết luận', level: 2 },
      ] satisfies BlogArticleTableOfContentsItem[],
      markdown: `Một tấm bằng tốt nghiệp chỉ thực sự phát huy giá trị khi người sở hữu có thể sử dụng nó để chứng minh trình độ học vấn của mình. Tuy nhiên, trong môi trường số, quá trình chứng minh ấy vẫn còn phụ thuộc nhiều vào những phương thức được kế thừa từ thời kỳ giấy tờ vật lý.

Khi ứng tuyển, người lao động thường gửi ảnh chụp hoặc tệp PDF của văn bằng. Nhà tuyển dụng kiểm tra tài liệu bằng mắt, tra cứu trên cổng thông tin của trường hoặc liên hệ trực tiếp với cơ sở đào tạo. Nếu người đó tiếp tục ứng tuyển tại nhiều doanh nghiệp, cùng một tài liệu sẽ được gửi đi, kiểm tra và lưu trữ nhiều lần. Nhà trường cũng có thể phải xử lý lặp lại những yêu cầu xác minh tương tự trong nhiều năm sau khi sinh viên tốt nghiệp.

Việc chuyển tấm bằng giấy thành tệp PDF đã giúp quá trình trao đổi thuận tiện hơn, nhưng chưa làm thay đổi căn bản cách niềm tin được thiết lập. Bên tiếp nhận vẫn phải trả lời những câu hỏi quen thuộc: tài liệu này có thực sự do trường đại học phát hành hay không, nội dung có bị chỉnh sửa hay bằng cấp còn được công nhận tại thời điểm kiểm tra hay không?

**Định danh tự chủ**, hay **Self-Sovereign Identity (SSI)**, mở ra một cách tiếp cận khác. Thay vì chỉ cung cấp cho người học một bản sao điện tử để gửi đi, cơ sở giáo dục có thể phát hành một bằng chứng số có khả năng kiểm chứng. Người học trực tiếp nắm giữ bằng chứng đó, còn nhà tuyển dụng hoặc trường tiếp nhận có thể tự kiểm tra trước khi đưa ra quyết định.

Sự thay đổi này không chỉ giúp chống làm giả văn bằng. Nó có thể tái cấu trúc toàn bộ quy trình phát hành, lưu giữ và xác minh kết quả học tập trong môi trường số.


![Người học quản lý và chia sẻ thực chứng giáo dục số với trường học và nhà tuyển dụng](/blog/ssi-trong-giao-duc-giai-phap-so-hoa-bang-cap-va-xac-minh-nang-luc/digital-credentials-future-academic-records-1440.webp)

*Hình 1. Thực chứng giáo dục số giúp người học trực tiếp nắm giữ kết quả học tập và trình bày cho các tổ chức cần xác minh.*

## Khi bằng cấp đã được số hóa nhưng việc xác minh vẫn còn thủ công

Số hóa bằng cấp hiện nay thường diễn ra theo một trong ba cách. Cơ sở giáo dục có thể cấp một bản PDF của văn bằng, cung cấp mã QR dẫn đến trang tra cứu hoặc lưu thông tin trong một cơ sở dữ liệu tập trung để bên thứ ba kiểm tra khi cần.

Những phương thức này đều có giá trị thực tế. PDF giúp người học dễ dàng lưu trữ và gửi tài liệu. Mã QR rút ngắn quá trình truy cập trang xác minh. Cơ sở dữ liệu tập trung giúp nhà trường quản lý văn bằng thống nhất hơn và hạn chế việc xác nhận hoàn toàn bằng thủ công.

Tuy nhiên, chúng vẫn thường đặt cơ sở giáo dục vào trung tâm của mọi lần sử dụng.

Nếu việc xác minh phụ thuộc vào một cổng tra cứu, cổng thông tin đó phải tiếp tục hoạt động trong suốt thời gian văn bằng còn giá trị. Nếu mỗi trường xây dựng một hệ thống riêng, nhà tuyển dụng phải làm quen với nhiều cách kiểm tra khác nhau. Nếu hệ thống chỉ hiển thị một bản ghi để con người đọc, dữ liệu vẫn khó được tích hợp vào các quy trình tuyển dụng hoặc tuyển sinh tự động.

Người học trong những mô hình này thường được quyền xem hoặc tải xuống thông tin, nhưng chưa thực sự nắm giữ một bằng chứng có thể được sử dụng độc lập. Tệp PDF mà họ lưu trên máy là một bản sao của tài liệu. Bản ghi có giá trị chính thức vẫn nằm trong hệ thống của trường và việc xác minh tiếp tục phụ thuộc vào khả năng truy cập hệ thống đó.

Đây là điểm khác biệt giữa **số hóa giấy tờ** và **số hóa niềm tin**.

Số hóa giấy tờ giúp tài liệu dễ truyền đi hơn. Số hóa niềm tin giúp bên tiếp nhận tự xác định tài liệu do ai phát hành, nội dung có nguyên vẹn và bằng chứng còn giá trị hay không.

## Từ tài liệu điện tử đến bằng chứng có thể xác minh

Trong mô hình SSI, trường đại học không chỉ phát hành một hình ảnh hoặc tệp PDF của tấm bằng. Trường có thể phát hành một **thực chứng**: một bản xác nhận số có cấu trúc về kết quả học tập của một người.

Thực chứng bằng tốt nghiệp có thể chứa tên người được cấp, tên cơ sở đào tạo, chương trình học, chuyên ngành, trình độ, ngày tốt nghiệp và những thông tin cần thiết khác. Điểm quan trọng không nằm ở số lượng dữ liệu được đưa vào, mà ở việc thực chứng được gắn với tổ chức phát hành và được bảo vệ để mọi thay đổi trái phép đều có thể bị phát hiện.

Có thể hình dung thực chứng giống như một giấy tờ số được đóng một con dấu mà phần mềm có thể kiểm tra. Khi bên tiếp nhận nhận được thực chứng, hệ thống có thể xác định ai đã phát hành, nội dung có bị thay đổi và bằng chứng có đáp ứng những điều kiện kiểm tra được đặt ra hay không.

W3C sử dụng mô hình gồm ba vai trò cơ bản để mô tả quá trình này: **bên phát hành** tạo ra thực chứng, **người nắm giữ** nhận và quản lý thực chứng, còn **bên xác minh** kiểm tra bằng chứng trước khi sử dụng thông tin. Verifiable Credentials Data Model 2.0 đóng vai trò là mô hình dữ liệu nền tảng để các hệ thống khác nhau có thể biểu diễn và xử lý những thực chứng như vậy.

Trong giáo dục, trường đại học hoặc cơ sở đào tạo là bên phát hành. Sinh viên là người nắm giữ. Doanh nghiệp tuyển dụng, một trường đại học khác hoặc một tổ chức nghề nghiệp có thể đóng vai trò bên xác minh.

Cấu trúc này không làm suy giảm thẩm quyền của cơ sở giáo dục. Người học không thể tự cấp bằng hoặc tự sửa kết quả học tập. Nhà trường vẫn là tổ chức chịu trách nhiệm xác nhận người học đã hoàn thành chương trình nào và đạt kết quả gì. Điểm thay đổi là sau khi thực chứng được phát hành, người học có thể trực tiếp mang theo và sử dụng kết quả xác nhận đó.

## SSI thay đổi quy trình cấp và xác minh bằng cấp như thế nào?

Hãy hình dung một sinh viên tên Minh vừa hoàn thành chương trình cử nhân công nghệ thông tin.

Theo cách làm truyền thống, nhà trường cấp cho Minh bằng giấy hoặc tệp PDF. Khi ứng tuyển, Minh tải tài liệu lên hệ thống của doanh nghiệp. Bộ phận nhân sự xem xét, đối chiếu thông tin và có thể liên hệ với trường nếu cần xác minh thêm. Khi Minh ứng tuyển tại một doanh nghiệp khác, quy trình tương tự lại được thực hiện từ đầu.

Với SSI, sau khi xác nhận Minh đã hoàn thành chương trình, trường phát hành một thực chứng bằng tốt nghiệp vào ví định tín của Minh. Ví định tín có thể là một ứng dụng trên điện thoại, giúp Minh nhận, lưu giữ và trình bày những bằng chứng số liên quan đến mình.

Khi doanh nghiệp yêu cầu chứng minh trình độ học vấn, Minh nhận được yêu cầu trong ví. Anh có thể xem doanh nghiệp đang đề nghị cung cấp thông tin gì, sử dụng cho mục đích nào và quyết định có chấp thuận hay không.

Sau khi Minh đồng ý, doanh nghiệp nhận được bằng chứng phù hợp. Hệ thống tuyển dụng có thể kiểm tra thực chứng có thực sự do trường đại học đã nêu phát hành, nội dung có bị thay đổi và bằng còn ở trạng thái hợp lệ hay không.

Nhà trường không phải xử lý một yêu cầu xác minh riêng cho từng doanh nghiệp. Doanh nghiệp không phải tin vào tài liệu chỉ vì nó có thiết kế giống bằng thật. Minh cũng không phải xin lại giấy xác nhận mỗi khi sử dụng bằng cấp.

Ba bên vẫn giữ nguyên trách nhiệm của mình. Trường xác nhận kết quả học tập. Minh quyết định khi nào trình bày bằng chứng. Doanh nghiệp kiểm tra và quyết định văn bằng có đáp ứng yêu cầu tuyển dụng hay không.

Điểm mới nằm ở cách niềm tin được truyền đi: thay vì phụ thuộc vào bản sao giấy tờ hoặc liên hệ thủ công, niềm tin được chuyển từ nhà trường đến doanh nghiệp thông qua một thực chứng mà Minh trực tiếp mang theo.


![Sinh viên sử dụng ví định tín để chia sẻ bằng cấp và kỹ năng đã được xác minh](/blog/ssi-trong-giao-duc-giai-phap-so-hoa-bang-cap-va-xac-minh-nang-luc/ssi-digital-degrees-skills-verification-1440.webp)

*Hình 2. Bằng cấp và chứng nhận kỹ năng có thể được phát hành vào ví định tín để người học sử dụng trong nhiều quy trình tuyển dụng.*

## Người học không nhất thiết phải cung cấp toàn bộ hồ sơ

Một lợi ích quan trọng khác của SSI là khả năng chia sẻ thông tin theo đúng mục đích.

Trong quy trình hiện nay, ứng viên thường phải gửi toàn bộ tấm bằng hoặc bảng điểm, ngay cả khi nhà tuyển dụng chỉ cần xác nhận một vài điều kiện. Một doanh nghiệp tuyển kỹ sư phần mềm có thể chỉ cần biết ứng viên đã tốt nghiệp trình độ đại học, chuyên ngành thuộc nhóm công nghệ thông tin và văn bằng được cấp bởi một cơ sở được công nhận.

Doanh nghiệp có thể không cần biết mã sinh viên, toàn bộ danh sách môn học hoặc những thông tin cá nhân khác xuất hiện trên tài liệu.

Với một hệ thống SSI được thiết kế phù hợp, Minh có thể cung cấp những thông tin đáp ứng yêu cầu mà không nhất thiết phải gửi nguyên vẹn toàn bộ thực chứng. Điều này chuyển cách chia sẻ dữ liệu từ “gửi cả tài liệu” sang “cung cấp đúng bằng chứng cần thiết”.

Khả năng này có ý nghĩa đối với cả người học lẫn tổ chức tiếp nhận. Người học hạn chế việc phát tán những dữ liệu không liên quan. Doanh nghiệp giảm lượng thông tin cá nhân phải tiếp nhận, lưu trữ và bảo vệ.

SSI vì thế không chỉ làm cho quá trình xác minh nhanh hơn. Mô hình này còn tạo điều kiện để nguyên tắc giảm thiểu dữ liệu được áp dụng ngay từ khi thiết kế quy trình.


![Người dùng chỉ chia sẻ những trường dữ liệu cần thiết từ thực chứng](/blog/ssi-trong-giao-duc-giai-phap-so-hoa-bang-cap-va-xac-minh-nang-luc/selective-disclosure-private-data-sharing-1440.webp)

*Hình 3. Cơ chế tiết lộ có chọn lọc giúp người học chứng minh đúng điều kiện được yêu cầu mà không phải gửi toàn bộ hồ sơ.*

## Không chỉ có bằng tốt nghiệp

Bằng tốt nghiệp là trường hợp sử dụng dễ hình dung nhất, nhưng không phải loại thực chứng duy nhất mà cơ sở giáo dục có thể phát hành.

Cùng một mô hình có thể được sử dụng cho bảng điểm, giấy xác nhận sinh viên, chứng nhận hoàn thành học phần, chứng chỉ nghề nghiệp, kết quả đào tạo ngắn hạn, giấy xác nhận thực tập hoặc thành tích ngoại khóa. Một trường cũng có thể phát hành các vi bằng để ghi nhận một nhóm kỹ năng hoặc kết quả học tập nhỏ hơn chương trình cấp bằng.

Các tiêu chuẩn như Open Badges cho phép mô tả một thành tích cùng với thông tin về người nhận, tổ chức phát hành, tiêu chí đánh giá và bằng chứng hỗ trợ. Open Badges 3.0 được xây dựng tương thích với mô hình Verifiable Credentials, qua đó giúp các chứng nhận kỹ năng có thể được ký, kiểm tra và di chuyển giữa những hệ thống hỗ trợ tiêu chuẩn chung.

Điều này không có nghĩa mọi hoạt động trong trường đều cần được chuyển thành một thực chứng. Cơ sở giáo dục nên bắt đầu từ những thông tin có nhu cầu sử dụng bên ngoài hệ thống và có giá trị xác minh rõ ràng.

Bằng tốt nghiệp cần được sử dụng khi ứng tuyển hoặc học tiếp. Chứng chỉ nghề nghiệp cần được trình bày với doanh nghiệp. Giấy xác nhận thực tập có thể hỗ trợ hồ sơ việc làm. Những trường hợp như vậy tạo ra giá trị trực tiếp và dễ đo lường hơn việc phát hành thực chứng cho mọi hoạt động nhỏ trong quá trình học.

Khả năng kết hợp nhiều loại thực chứng theo thời gian sẽ được phân tích sâu hơn trong bài viết về hồ sơ học tập suốt đời. Trong phạm vi bài này, điều quan trọng là cơ sở giáo dục không bị giới hạn ở việc số hóa hình ảnh của tấm bằng cuối khóa. SSI có thể trở thành một phương thức chung để phát hành nhiều loại kết quả học tập có khả năng kiểm chứng.


![Hồ sơ học tập số đồng hành cùng người học qua nhiều giai đoạn giáo dục và nghề nghiệp](/blog/ssi-trong-giao-duc-giai-phap-so-hoa-bang-cap-va-xac-minh-nang-luc/learning-passport-digital-education-records-1440.webp)

*Hình 4. Nhiều loại kết quả học tập có thể hợp thành một hồ sơ số mà người học tiếp tục sử dụng khi học tập và phát triển nghề nghiệp.*

## Lợi ích đối với người học

Lợi ích dễ nhận thấy nhất đối với người học là khả năng sử dụng bằng cấp thuận tiện hơn.

Sau khi nhận thực chứng, người học không phải quay lại xin nhà trường xác nhận trong mỗi lần sử dụng. Họ có thể chủ động trình bày bằng chứng khi ứng tuyển, đăng ký học tiếp hoặc thực hiện một thủ tục có yêu cầu về trình độ.

Thực chứng cũng có thể giảm sự phụ thuộc vào tài khoản sinh viên. Sau khi tốt nghiệp, tài khoản trên hệ thống nội bộ có thể bị giới hạn hoặc ngừng hoạt động, nhưng bằng chứng đã được cấp cho người học vẫn có thể tiếp tục được sử dụng theo cơ chế của hệ thống.

Người học đồng thời có cơ hội hiểu rõ hơn cách dữ liệu của mình được chia sẻ. Thay vì tải một tài liệu lên biểu mẫu mà không biết nó sẽ được sử dụng và lưu giữ ra sao, họ có thể nhận yêu cầu xác minh, xem thông tin được đề nghị và chủ động chấp thuận.

MIT đã triển khai một hình thức văn bằng số theo hướng này từ năm 2017. Sinh viên đủ điều kiện có thể nhận văn bằng số, lưu giữ và chia sẻ cho nhà tuyển dụng hoặc cơ sở giáo dục; bên tiếp nhận có thể kiểm tra thông tin phát hành một cách độc lập. MIT hiện vẫn cho phép sinh viên lựa chọn nhận bằng số bên cạnh bằng giấy truyền thống.

Trường hợp MIT sẽ được phân tích riêng trong một bài khác của loạt bài này. Điều cần lưu ý ở đây là giá trị không chỉ nằm ở công nghệ được sử dụng, mà ở việc văn bằng được trao cho sinh viên dưới dạng một bằng chứng có thể tiếp tục tồn tại và được sử dụng ngoài hệ thống của trường.

## Lợi ích đối với trường học và cơ sở đào tạo

Đối với cơ sở giáo dục, SSI trước hết có thể giảm khối lượng công việc xác minh lặp lại.

Những yêu cầu xác nhận văn bằng từ doanh nghiệp, trường đối tác và cựu sinh viên thường tiêu tốn thời gian của phòng đào tạo. Khi thực chứng có thể được kiểm tra độc lập, nhiều yêu cầu cơ bản không còn cần nhân viên nhà trường xử lý thủ công.

SSI cũng giúp tăng khả năng chống gian lận. Một tệp PDF giả có thể được thiết kế giống tài liệu thật, nhưng không thể tạo ra bằng chứng hợp lệ dưới danh nghĩa nhà trường nếu không có quyền phát hành tương ứng. Khi nội dung bị thay đổi, quá trình kiểm tra sẽ phát hiện rằng thực chứng không còn nguyên vẹn.

Nếu một thực chứng được cấp sai hoặc không còn giá trị, nhà trường có thể cập nhật trạng thái để bên xác minh nhận biết. Điều này hiệu quả hơn việc chỉ đăng danh sách thu hồi trên một trang thông báo mà không phải tổ chức nào cũng biết để kiểm tra.

Việc phát hành thực chứng còn giúp trường mở rộng dịch vụ số dành cho cựu sinh viên. Quan hệ giữa người học và nhà trường không kết thúc vào ngày tốt nghiệp. Trong nhiều năm tiếp theo, cựu sinh viên vẫn cần sử dụng bằng cấp, bảng điểm và các chứng nhận khác. Một cơ chế phát hành và xác minh hiện đại giúp giá trị đào tạo của trường tiếp tục đồng hành với người học trong quá trình phát triển nghề nghiệp.

Cuối cùng, SSI có thể tạo điều kiện cho sự hợp tác giữa các cơ sở giáo dục. Khi kết quả học tập được biểu diễn bằng tiêu chuẩn chung, trường tiếp nhận có khả năng xử lý thông tin nhanh hơn trong các chương trình trao đổi, chuyển tiếp hoặc công nhận tín chỉ. Tuy nhiên, việc công nhận vẫn phụ thuộc vào quy định và chính sách học thuật của từng tổ chức; công nghệ chỉ cung cấp dữ liệu đáng tin cậy hơn cho quá trình ra quyết định.

## Lợi ích đối với nhà tuyển dụng và bên tiếp nhận

Nhà tuyển dụng hiện phải lựa chọn giữa việc tin vào tài liệu do ứng viên cung cấp hoặc dành thêm nguồn lực để kiểm tra với bên phát hành. Cả hai phương án đều có hạn chế.

Nếu không xác minh, doanh nghiệp đối mặt với nguy cơ tiếp nhận thông tin sai lệch. Nếu xác minh toàn bộ, quy trình tuyển dụng có thể kéo dài và phát sinh thêm chi phí, đặc biệt khi số lượng ứng viên lớn hoặc bằng cấp đến từ nhiều cơ sở khác nhau.

Thực chứng giúp đưa việc kiểm tra vào ngay trong quy trình tiếp nhận hồ sơ. Hệ thống có thể xác minh những dữ kiện cơ bản trước khi hồ sơ được chuyển đến người phụ trách tuyển dụng. Bộ phận nhân sự không cần dành quá nhiều thời gian để xác định tài liệu có thật hay không và có thể tập trung nhiều hơn vào kinh nghiệm, năng lực chuyên môn và mức độ phù hợp của ứng viên.

Điều này không có nghĩa thực chứng sẽ tự động quyết định ai được tuyển dụng. Một tấm bằng hợp lệ chỉ xác nhận rằng người học đã hoàn thành một chương trình nhất định. Nó không thay thế phỏng vấn, bài kiểm tra chuyên môn hay đánh giá khả năng làm việc thực tế.

SSI nâng cao độ tin cậy của dữ liệu đầu vào, chứ không thay thế trách nhiệm ra quyết định của doanh nghiệp.

## SSI không đồng nghĩa với việc đưa bằng cấp lên blockchain

SSI thường được nhắc đến cùng blockchain bởi một số dự án văn bằng số tiên phong đã sử dụng công nghệ này. Tuy nhiên, không nên đồng nhất SSI với blockchain.

Blockchain có thể được sử dụng để công bố một số thông tin cần kiểm tra chung, chẳng hạn bằng chứng về thời điểm phát hành hoặc dữ liệu hỗ trợ xác minh. Nhưng nội dung đầy đủ của bằng cấp và dữ liệu cá nhân của sinh viên không nhất thiết, và thường không nên, được ghi trực tiếp lên một sổ cái công khai.

Một hệ thống SSI có thể sử dụng nhiều loại hạ tầng khác nhau. Điều quyết định không phải là tên của công nghệ nền tảng, mà là những đặc điểm của mô hình: tổ chức có thẩm quyền phát hành thực chứng, người học có thể trực tiếp nắm giữ, bên tiếp nhận có thể tự kiểm tra và bằng chứng có thể được sử dụng ngoài hệ thống ban đầu.

European Digital Credentials for Learning là một ví dụ về việc xây dựng văn bằng và chứng nhận số có thể kiểm tra dựa trên tiêu chuẩn chung. Hệ thống hỗ trợ nhiều loại kết quả như bằng, chứng chỉ đào tạo và vi chứng nhận; người học có thể nhận chúng vào ví Europass hoặc ví tương thích, sau đó chia sẻ với nhà tuyển dụng hay cơ sở đào tạo. Các thực chứng được ký bằng con dấu điện tử của tổ chức phát hành để bên tiếp nhận kiểm tra nguồn gốc, tính hợp lệ và tính xác thực.

Điều quan trọng nhất là tránh thay thế một hệ thống khép kín bằng một hệ thống khép kín khác. Nếu bằng cấp chỉ hoạt động trong ứng dụng của một nhà cung cấp và không thể được chuyển sang công cụ khác, người học vẫn tiếp tục phụ thuộc vào nền tảng trung gian.

## Công nghệ xác minh chưa đủ để tạo ra niềm tin

Một thực chứng có thể hoàn toàn hợp lệ về mặt kỹ thuật nhưng vẫn không có giá trị học thuật hoặc pháp lý.

Một tổ chức không được công nhận có thể tự phát hành một chứng nhận và ký nó bằng công nghệ mật mã. Hệ thống xác minh có thể kết luận tài liệu thực sự đến từ tổ chức đó và chưa bị thay đổi. Tuy nhiên, điều này không đồng nghĩa tổ chức có thẩm quyền cấp bằng đại học hoặc chứng chỉ hành nghề.

Vì vậy, SSI trong giáo dục cần được đặt trong một **khung quản trị** rõ ràng.

Khung quản trị phải xác định tổ chức nào được phép phát hành loại thực chứng nào, quy trình cấp dựa trên những điều kiện gì, trường hợp nào thực chứng có thể bị thu hồi và trách nhiệm của từng bên khi xảy ra sai sót. Bên xác minh cũng cần biết cơ quan hoặc tổ chức nào công nhận nhà trường và chương trình đào tạo.

Mật mã giúp trả lời câu hỏi “thông tin này do ai phát hành và có bị thay đổi hay không?”. Khung quản trị trả lời câu hỏi “tổ chức đó có thẩm quyền gì và bằng chứng này có giá trị trong hoàn cảnh nào?”.

Hai lớp này phải đi cùng nhau. Một hệ thống chỉ có công nghệ mà thiếu quy tắc tin cậy sẽ không thể được sử dụng rộng rãi. Ngược lại, một khung quản trị tốt nhưng tiếp tục phụ thuộc hoàn toàn vào giấy tờ và xác minh thủ công sẽ khó đáp ứng quy mô của giáo dục số.

## Vì sao giáo dục là lĩnh vực phù hợp để bắt đầu?

Giáo dục có nhiều đặc điểm phù hợp để triển khai SSI.

Trước hết, vai trò của các bên tương đối rõ ràng. Trường học và cơ sở đào tạo phát hành kết quả. Sinh viên nhận kết quả. Doanh nghiệp, trường tiếp nhận hoặc cơ quan quản lý kiểm tra khi cần.

Thứ hai, bằng cấp và chứng chỉ có thời gian sử dụng dài. Một người có thể cần chứng minh bằng đại học nhiều năm hoặc nhiều thập kỷ sau khi tốt nghiệp. Vì vậy, việc tạo ra một bằng chứng có thể mang theo mang lại giá trị rõ ràng hơn những loại dữ liệu chỉ được sử dụng trong thời gian ngắn.

Thứ ba, nhu cầu xác minh xuất hiện với tần suất lớn. Mỗi năm, hàng triệu người học chuyển tiếp, xin việc hoặc tham gia các chương trình mới. Nếu mỗi giao dịch đều dựa trên bản scan và xác minh thủ công, chi phí tích lũy đối với toàn hệ thống là rất lớn.

Cuối cùng, gian lận văn bằng gây hậu quả thực tế đối với chất lượng tuyển dụng, uy tín cơ sở đào tạo và niềm tin xã hội. Thực chứng không thể loại bỏ mọi hành vi gian lận, nhưng giúp việc kiểm tra nguồn gốc và tính toàn vẹn trở nên nhất quán hơn.

Các trường không cần thay đổi toàn bộ hệ thống ngay từ đầu. Một chương trình thử nghiệm có thể bắt đầu với chứng chỉ đào tạo ngắn hạn, vi chứng nhận hoặc một khóa học cụ thể. Phạm vi nhỏ giúp trường đánh giá trải nghiệm của người học, mức độ chấp nhận của nhà tuyển dụng, khả năng tích hợp với hệ thống hiện có và những yêu cầu quản trị cần hoàn thiện.

Câu hỏi đầu tiên không nên là “nên sử dụng blockchain nào?”, mà là “kết quả học tập nào đang gây nhiều khó khăn nhất trong quá trình phát hành và xác minh?”.

## Kết luận

SSI trong giáo dục không đơn thuần là một phương pháp phát hành bằng cấp đẹp hơn hoặc hiện đại hơn. Nó thay đổi vị trí của từng bên trong quá trình trao đổi niềm tin.

Nhà trường vẫn là nguồn tạo ra sự tin cậy và chịu trách nhiệm về kết quả đào tạo. Nhà tuyển dụng và cơ sở tiếp nhận vẫn quyết định bằng chứng nào đáp ứng yêu cầu của mình. Nhưng người học không còn chỉ nhận một bản sao của hồ sơ nằm trong hệ thống của trường. Họ có thể trực tiếp nắm giữ và trình bày những thực chứng đáng tin cậy về kết quả học tập của mình.

Nhờ đó, bằng cấp có thể được xác minh nhanh hơn, trường học giảm được những yêu cầu xử lý lặp lại, nhà tuyển dụng tiếp nhận dữ liệu đáng tin cậy hơn và người học có nhiều quyền chủ động hơn đối với thông tin của mình.

Số hóa bằng cấp vì thế không nên dừng lại ở việc thay giấy bằng PDF hay bổ sung một mã QR. Bước chuyển quan trọng hơn là biến kết quả học tập thành những bằng chứng số có thể kiểm tra, có thể mang theo và có thể sử dụng vượt ra ngoài hệ thống nơi chúng được tạo ra.

Đó là nền tảng để giáo dục tiến từ việc quản lý văn bằng sang xây dựng một hạ tầng tin cậy thực sự cho học tập và phát triển năng lực trong môi trường số.`,
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
