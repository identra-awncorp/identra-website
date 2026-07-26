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

export const MIT_DIGITAL_DIPLOMAS_BLOG_ARTICLE_ID =
  'tu-thi-diem-cua-mit-den-lan-song-so-hoa-bang-cap-khong-the-dao-nguoc' as const;

const assetRoot = '/blog/tu-thi-diem-cua-mit-den-lan-song-so-hoa-bang-cap-khong-the-dao-nguoc';

export const MIT_DIGITAL_DIPLOMAS_BLOG_ARTICLE = {
  id: MIT_DIGITAL_DIPLOMAS_BLOG_ARTICLE_ID,
  slug: MIT_DIGITAL_DIPLOMAS_BLOG_ARTICLE_ID,
  publishedAt: '2026-07-26',
  modifiedAt: '2026-07-26',
  author: {
    type: 'Organization',
    name: 'Identra',
  },
  topics: ['identity', 'technology'],
  industries: ['education'],
  contentLocales: ['vi'],
  coverImage: {
    src: `${assetRoot}/mit-blockchain-digital-diplomas-cover-1440.webp`,
    srcSet: [
      `${assetRoot}/mit-blockchain-digital-diplomas-cover-800.webp 800w`,
      `${assetRoot}/mit-blockchain-digital-diplomas-cover-1440.webp 1440w`,
    ].join(', '),
    sizes: '(min-width: 1024px) 680px, (min-width: 768px) 55vw, 100vw',
    width: 1440,
    height: 810,
  },
  socialImage: {
    src: `${assetRoot}/tu-thi-diem-cua-mit-den-lan-song-so-hoa-bang-cap-khong-the-dao-nguoc-og.jpg`,
    width: 1200,
    height: 630,
    type: 'image/jpeg',
  },
  listing: {
    en: {
      title: 'From MIT’s pilot to the irreversible wave of digital diplomas',
      description: 'How MIT’s 2017 experiment helped move digital diplomas from isolated blockchain pilots toward portable credentials, open standards, and regional infrastructure.',
      type: 'Education',
      duration: '20 min read',
    },
    es: {
      title: 'Del piloto del MIT a la ola irreversible de los títulos digitales',
      description: 'Cómo el experimento del MIT de 2017 impulsó el paso de pilotos aislados a credenciales portátiles, estándares abiertos e infraestructura regional.',
      type: 'Educación',
      duration: '20 min de lectura',
    },
    ja: {
      title: 'MITの実証実験から、後戻りできないデジタル学位の潮流へ',
      description: '2017年のMITの試みが、個別のブロックチェーン実験から、持ち運べる実証、オープン標準、地域基盤への移行を促した流れを解説します。',
      type: '教育',
      duration: '読了20分',
    },
    de: {
      title: 'Vom MIT-Pilotprojekt zur unumkehrbaren Welle digitaler Abschlüsse',
      description: 'Wie der MIT-Versuch von 2017 den Weg von einzelnen Blockchain-Piloten zu portablen Nachweisen, offenen Standards und regionaler Infrastruktur ebnete.',
      type: 'Bildung',
      duration: '20 Min. Lesezeit',
    },
    vi: {
      title: 'Từ thí điểm của MIT đến làn sóng số hóa bằng cấp không thể đảo ngược',
      description: 'Cách thí điểm năm 2017 của MIT góp phần đưa bằng cấp số từ những dự án blockchain riêng lẻ đến thực chứng di động, tiêu chuẩn mở và hạ tầng cấp khu vực.',
      type: 'Giáo dục',
      duration: 'Đọc trong 20 phút',
    },
  } satisfies Record<Locale, BlogArticleListingCopy>,
  images: {
    [`${assetRoot}/mit-blockchain-digital-diplomas-cover-1440.webp`]: responsiveImage('mit-blockchain-digital-diplomas-cover'),
    [`${assetRoot}/mit-blockchain-digital-diplomas-1440.webp`]: responsiveImage('mit-blockchain-digital-diplomas'),
    [`${assetRoot}/digital-diploma-education-credential-trends-1440.webp`]: responsiveImage('digital-diploma-education-credential-trends'),
    [`${assetRoot}/ebsi-blockchain-european-digital-education-1440.webp`]: responsiveImage('ebsi-blockchain-european-digital-education'),
  } satisfies Record<string, BlogArticleImage>,
  content: {
    vi: {
      title: 'Từ thí điểm của MIT đến làn sóng số hóa bằng cấp không thể đảo ngược',
      description: 'Nhìn lại thí điểm bằng số của MIT năm 2017 và hành trình đưa thực chứng giáo dục từ một thử nghiệm blockchain đến tiêu chuẩn mở cùng hạ tầng liên thông.',
      excerpt: 'Từ 111 tấm bằng trên điện thoại, văn bằng số đã phát triển thành một chương trình nghị sự toàn cầu về khả năng kiểm chứng, quyền nắm giữ và tính di động của kết quả học tập.',
      seoTitle: 'Từ thí điểm MIT đến làn sóng số hóa bằng cấp',
      seoDescription: 'Thí điểm MIT năm 2017 đã góp phần mở đường cho bằng cấp số có thể kiểm chứng, tiêu chuẩn mở và hạ tầng thực chứng giáo dục liên thông.',
      category: 'Giáo dục',
      tags: ['MIT', 'Bằng cấp số', 'Thực chứng', 'SSI', 'Giáo dục số'],
      readTimeMinutes: 20,
      ui: {
        publishedLabel: 'Xuất bản ngày',
        authorRole: 'Đội ngũ nội dung Identra',
        tableOfContents: 'Mục lục',
        openTableOfContents: 'Mở mục lục bài viết',
        closeTableOfContents: 'Đóng mục lục bài viết',
        ctaTitle: 'Hiện đại hóa bằng cấp cùng Identra',
        ctaDescription: 'Khám phá cách phát hành và xác minh thực chứng giáo dục trên một hạ tầng mở, có thể kiểm tra và tái sử dụng.',
        ctaButtonLabel: 'Trải nghiệm demo',
      },
      tableOfContents: [
        { id: 'thuc-chung-la-gi-va-vi-sao-no-quan-trong-trong-giao-duc', label: 'Vì sao thực chứng quan trọng trong giáo dục?', level: 2 },
        { id: 'mua-he-2017-mit-va-111-tam-bang-tren-dien-thoai', label: 'MIT và 111 tấm bằng trên điện thoại', level: 2 },
        { id: 'mot-nhom-sinh-vien-mit-nhan-bang-tren-dien-thoai', label: 'Sinh viên MIT nhận bằng trên điện thoại', level: 2 },
        { id: 'gia-tri-cua-thi-diem-mit-khong-chi-nam-o-blockchain', label: 'Giá trị không chỉ nằm ở blockchain', level: 2 },
        { id: 'nhung-truong-dai-hoc-tien-phong-khac', label: 'Những trường đại học tiên phong khác', level: 2 },
        { id: 'tu-nhung-du-an-rieng-le-den-mot-phong-trao-do-dai-hoc-dan-dat', label: 'Phong trào do đại học dẫn dắt', level: 2 },
        { id: 'tieu-chuan-chung-thay-doi-cuoc-choi', label: 'Tiêu chuẩn chung thay đổi cuộc chơi', level: 2 },
        { id: 'tu-sang-kien-cua-truong-hoc-den-ha-tang-cap-khu-vuc', label: 'Từ trường học đến hạ tầng cấp khu vực', level: 2 },
        { id: 'vi-sao-lan-song-so-hoa-ngay-cang-kho-dao-nguoc', label: 'Vì sao làn sóng ngày càng khó đảo ngược?', level: 2 },
        { id: 'khong-phai-moi-van-bang-so-deu-la-ssi', label: 'Không phải mọi văn bằng số đều là SSI', level: 2 },
        { id: 'bai-hoc-danh-cho-cac-truong-dai-hoc-viet-nam', label: 'Bài học cho trường đại học Việt Nam', level: 2 },
        { id: 'tu-xu-huong-cong-nghe-den-yeu-cau-canh-tranh', label: 'Từ xu hướng đến yêu cầu cạnh tranh', level: 2 },
        { id: 'ket-luan', label: 'Kết luận', level: 2 },
        { id: 'tai-lieu-tham-khao', label: 'Tài liệu tham khảo', level: 2 },
      ] satisfies BlogArticleTableOfContentsItem[],
      markdown: `## Thực chứng là gì và vì sao nó quan trọng trong giáo dục?

Trước khi nói về văn bằng số hay các thí điểm của MIT, cần hiểu một khái niệm nền tảng: **thực chứng**.

Thực chứng là một dạng **dữ liệu số có cấu trúc có khả năng xác minh bằng mật mã**, được một tổ chức phát hành và ký xác thực, để chứng minh một thông tin nào đó là đúng. Thông tin đó có thể là bằng tốt nghiệp, chứng chỉ khóa học, giấy phép hành nghề hoặc một thành tích học tập.

Điểm quan trọng của thực chứng không nằm ở việc nó “được số hóa”, mà ở ba đặc tính cốt lõi:

* **Có thể kiểm tra độc lập**: bên nhận không cần liên hệ lại tổ chức phát hành để xác minh.
* **Không thể bị sửa đổi mà không bị phát hiện**: dữ liệu được ký số hoặc gắn cơ chế đảm bảo toàn vẹn.
* **Người học có thể nắm giữ và chia sẻ**: thay vì bị khóa trong hệ thống của trường.

Nói cách khác, thực chứng biến một văn bằng từ “tài liệu do nhà trường giữ” thành “bằng chứng mà người học có thể mang theo và sử dụng ở nhiều nơi”.

Chính nền tảng này là thứ làm cho các thí điểm như MIT năm 2017 trở nên có ý nghĩa, chứ không chỉ đơn thuần là việc đưa bằng tốt nghiệp lên điện thoại.


![Sinh viên nhận và sử dụng bằng tốt nghiệp số có thể kiểm chứng trên điện thoại](/blog/tu-thi-diem-cua-mit-den-lan-song-so-hoa-bang-cap-khong-the-dao-nguoc/mit-blockchain-digital-diplomas-cover-1440.webp)

*Hình 1. Thực chứng biến văn bằng từ hồ sơ nằm trong hệ thống của trường thành bằng chứng số mà người học có thể trực tiếp nắm giữ và chia sẻ.*

## Mùa hè 2017: MIT và 111 tấm bằng trên điện thoại

Mùa hè năm 2017, 111 sinh viên tốt nghiệp tại Massachusetts Institute of Technology được trao một lựa chọn chưa từng có trong lịch sử của trường: bên cạnh tấm bằng giấy truyền thống, họ có thể nhận một phiên bản bằng tốt nghiệp trên điện thoại.

Tấm bằng số này không đơn thuần là một tệp PDF. Sinh viên có thể lưu giữ, chia sẻ với nhà tuyển dụng hoặc cơ sở giáo dục khác, còn bên tiếp nhận có thể kiểm tra tính xác thực mà không phải liên hệ trực tiếp với phòng đào tạo của MIT. Nhà trường gọi đây là một bước chuyển nhằm giúp sinh viên trở thành người trực tiếp quản lý những hồ sơ chính thức của mình.

Ở thời điểm đó, việc đưa bằng tốt nghiệp lên một ứng dụng di động và sử dụng blockchain để hỗ trợ xác minh dễ được nhìn nhận như một thử nghiệm công nghệ táo bạo. Nhưng gần một thập kỷ sau, những nguyên tắc được thể hiện trong chương trình của MIT đã xuất hiện trong hàng loạt sáng kiến khác: văn bằng có thể được kiểm tra bằng máy, người học có thể trực tiếp nắm giữ, các hệ thống sử dụng tiêu chuẩn mở và kết quả học tập có thể được sử dụng vượt ra ngoài cơ sở giáo dục đã phát hành.

Thí điểm của MIT vì thế không chỉ đáng chú ý vì công nghệ được sử dụng. Nó đánh dấu một thời điểm quan trọng trong quá trình chuyển đổi từ **văn bằng được quản lý như một hồ sơ nội bộ của nhà trường** sang **văn bằng được trao cho người học dưới dạng một thực chứng**.

Ngày nay, số hóa bằng cấp không còn là câu chuyện riêng của một vài phòng thí nghiệm blockchain. Các trường đại học, tổ chức tiêu chuẩn và cơ quan công quyền đang cùng xây dựng những mảnh ghép của một hạ tầng thực chứng giáo dục mới. Quá trình này vẫn còn nhiều rào cản, nhưng những động lực thúc đẩy nó ngày càng mạnh đến mức việc quay lại hoàn toàn với mô hình giấy tờ và xác minh thủ công gần như không còn là một lựa chọn hợp lý.

## Một nhóm sinh viên MIT nhận bằng trên điện thoại

Chương trình năm 2017 là kết quả hợp tác giữa Văn phòng Đăng ký của MIT và Learning Machine, dựa trên bộ công cụ mã nguồn mở Blockcerts được MIT Media Lab cùng đối tác phát triển trước đó.

Sinh viên nhận bằng thông qua Blockcerts Wallet. Họ có thể chia sẻ thực chứng với nhà tuyển dụng và trường học. Bên tiếp nhận sử dụng công cụ xác minh để kiểm tra bằng có thực sự do MIT phát hành và nội dung có bị thay đổi hay không, mà không cần gửi yêu cầu riêng đến nhà trường.

Một điểm thường bị hiểu sai là MIT không đưa toàn bộ nội dung bằng tốt nghiệp hoặc dữ liệu cá nhân của sinh viên lên blockchain. Hệ thống chỉ ghi một dấu vết mật mã để đảm bảo tính toàn vẹn và thời điểm phát hành. Bằng vẫn thuộc về sinh viên, và họ quyết định cách lưu trữ cũng như chia sẻ.

Điều khiến thử nghiệm này trở nên đặc biệt không phải là việc MIT sử dụng Bitcoin. Giá trị quan trọng hơn nằm ở ba thay đổi trong cách tổ chức văn bằng:

* Văn bằng được trao trực tiếp cho người học dưới dạng thực chứng, thay vì chỉ tồn tại trong hệ thống nội bộ.
* Bên thứ ba có thể kiểm tra độc lập, không cần phụ thuộc vào xác nhận thủ công từ nhà trường.
* Hệ thống được xây dựng trên công nghệ mở, giúp văn bằng vẫn sử dụng được ngay cả khi nhà cung cấp phần mềm thay đổi hoặc biến mất.

Những đặc điểm này rất gần với tinh thần của định danh tự chủ (SSI), nơi người học không chỉ “xem” hồ sơ của mình mà thực sự sở hữu và sử dụng nó như một bằng chứng độc lập.

Quan trọng hơn, thử nghiệm không biến mất sau một chiến dịch truyền thông ngắn hạn. MIT hiện vẫn cấp bằng giấy cho tất cả sinh viên tốt nghiệp và cho phép họ đăng ký nhận thêm bằng số. Điều này cho thấy thực chứng đã vượt qua giai đoạn thử nghiệm để trở thành một phần trong hoạt động chính thức của nhà trường.


![MIT phát hành bằng tốt nghiệp số để sinh viên chia sẻ và bên thứ ba xác minh](/blog/tu-thi-diem-cua-mit-den-lan-song-so-hoa-bang-cap-khong-the-dao-nguoc/mit-blockchain-digital-diplomas-1440.webp)

*Hình 2. Thí điểm MIT cho phép sinh viên nhận bằng số trên điện thoại và giúp bên tiếp nhận kiểm tra nguồn phát hành mà không cần xác minh thủ công.*

## Giá trị của thí điểm MIT không chỉ nằm ở blockchain

Khi nhìn lại các dự án văn bằng số đầu tiên, rất dễ tập trung vào blockchain. Nhưng công nghệ sổ cái chỉ là một phương tiện. Những câu hỏi mà MIT đặt ra mới là phần có giá trị lâu dài.

* Một văn bằng có thể tồn tại bên ngoài cơ sở dữ liệu của trường hay không?
* Người học có thể trực tiếp sở hữu và chia sẻ nó hay không?
* Nhà tuyển dụng có thể kiểm tra mà không cần liên hệ từng trường hay không?
* Hồ sơ có còn sử dụng được nếu nhà cung cấp công nghệ biến mất hay không?

Đây không phải là câu hỏi riêng của blockchain. Chúng liên quan đến quyền kiểm soát của người học, khả năng liên thông, tính bền vững của dữ liệu và cách niềm tin được truyền giữa các tổ chức.

Blockcerts là một trong những nỗ lực ban đầu nhằm trả lời các câu hỏi này bằng mã nguồn mở, cho phép các trường phát hành và xác minh thực chứng dựa trên blockchain.

Tuy nhiên, trọng tâm của ngành sau đó đã dịch chuyển. Thay vì tìm “một blockchain tốt hơn”, cộng đồng bắt đầu xây dựng **tiêu chuẩn chung cho thực chứng**, bao gồm dữ liệu, chữ ký số, ví lưu trữ, danh tính tổ chức phát hành và khả năng tương thích giữa các hệ thống.

Nói cách khác, trọng tâm chuyển từ câu hỏi:

> “Làm thế nào để chứng minh tệp này chưa bị sửa?”

sang câu hỏi lớn hơn:

> “Làm thế nào để một kết quả học tập có thể được phát hành, mang theo, hiểu và chấp nhận giữa nhiều tổ chức?”

## Những trường đại học tiên phong khác

MIT không phải trường đầu tiên thử nghiệm blockchain trong giáo dục. University of Nicosia tại Cyprus đã công bố chứng nhận học thuật trên blockchain từ năm 2014, thử nghiệm văn bằng vào năm 2015 và sau đó mở rộng áp dụng cho toàn bộ sinh viên tốt nghiệp. Trường cũng duy trì công cụ công khai để bên thứ ba kiểm tra chứng nhận số.

Trường hợp này cho thấy một hướng phát triển khác: từ các chứng nhận nhỏ lẻ, hệ thống dần mở rộng thành một mô hình áp dụng thường xuyên trong hoạt động đào tạo.

Cũng trong tháng 10 năm 2017, University of Melbourne trở thành một trong những trường đầu tiên tại khu vực châu Á – Thái Bình Dương phát hành thực chứng do người học nắm giữ. Trường sử dụng tiêu chuẩn Blockcerts, cho phép sinh viên lưu trữ, chia sẻ và để bên thứ ba xác minh độc lập.

Điểm đáng chú ý là University of Melbourne không xem đây chỉ là công cụ chống làm giả, mà là một phần trong chiến lược xây dựng hệ sinh thái thực chứng đa dạng hơn, bao gồm cả các chứng chỉ nhỏ và kết quả học tập linh hoạt.

Các trường hợp MIT, University of Melbourne và University of Nicosia có cách tiếp cận khác nhau, nhưng đều chia sẻ một số nguyên tắc chung:

* Thực chứng có thể được kiểm tra độc lập
* Người học có thể trực tiếp nắm giữ
* Dữ liệu có thể sử dụng ngoài hệ thống phát hành

Những dự án này không chỉ thúc đẩy ứng dụng thực chứng, mà còn chứng minh rằng việc trao thực chứng cho người học là khả thi trong thực tế giáo dục.

## Từ những dự án riêng lẻ đến một phong trào do đại học dẫn dắt

Nếu mỗi trường phát triển văn bằng số theo cách riêng, hệ quả sẽ là một “mạng ốc đảo”: không tương thích, không liên thông và khó mở rộng.

Để giải quyết vấn đề này, năm 2018, một nhóm trường đại học đã thành lập **Digital Credentials Consortium**. Mục tiêu là xây dựng hạ tầng tin cậy dùng chung cho toàn bộ vòng đời của thực chứng: phát hành, lưu trữ, hiển thị và xác minh.

Liên minh hiện có sự tham gia của nhiều trường lớn như MIT, Harvard University, UC Berkeley, Technical University of Munich, Delft University of Technology và nhiều cơ sở khác.

Việc tham gia liên minh không đồng nghĩa với việc tất cả các trường đã triển khai SSI hoàn chỉnh. Mỗi thành viên đóng góp ở các mức độ khác nhau: nghiên cứu, tiêu chuẩn, phần mềm hoặc thử nghiệm.

Tuy nhiên, sự xuất hiện của liên minh cho thấy lĩnh vực đã bước sang giai đoạn trưởng thành hơn. Các trường không còn phụ thuộc hoàn toàn vào giải pháp thương mại, mà bắt đầu chủ động định hình nguyên tắc cho hạ tầng thực chứng tương lai: tính di động, quyền riêng tư, khả năng kiểm chứng và tiêu chuẩn mở.

## Tiêu chuẩn chung thay đổi cuộc chơi

Những sáng kiến ban đầu như Blockcerts chứng minh rằng văn bằng có thể được phát hành theo cách giúp người học nắm giữ và bên thứ ba kiểm tra. Nhưng để hàng nghìn cơ sở giáo dục, ví và hệ thống tuyển dụng có thể làm việc với nhau, ngành giáo dục cần một nền tảng tiêu chuẩn rộng hơn.

Ngày 15 tháng 5 năm 2025, W3C công bố Verifiable Credentials 2.0 thành một bộ tiêu chuẩn Web chính thức. Tiêu chuẩn cung cấp mô hình để biểu diễn các thực chứng theo cách có thể kiểm tra bằng máy, được bảo vệ khỏi sửa đổi và hỗ trợ những lĩnh vực chuyên biệt như giáo dục.

Ý nghĩa của sự kiện này không nằm ở việc tất cả các trường sẽ lập tức sử dụng cùng một phần mềm. W3C tạo ra một “ngôn ngữ chung” ở tầng nền tảng để bằng cấp, giấy phép và những loại thực chứng khác có thể được biểu diễn theo các nguyên tắc tương thích.

Trong giáo dục, Open Badges cũng phát triển theo hướng hội tụ với mô hình này. Open Badges 3.0 cho phép một tổ chức ký số cho thành tích của người học dưới dạng tương thích với Verifiable Credentials. Một huy hiệu có thể mô tả kỹ năng, năng lực, tiêu chí đánh giá, bằng chứng và tổ chức phát hành, thay vì chỉ là một biểu tượng để hiển thị trên hồ sơ.

Sự hội tụ giữa tiêu chuẩn thực chứng tổng quát và tiêu chuẩn dành riêng cho giáo dục giúp giảm tình trạng mỗi loại kết quả học tập sử dụng một cơ chế hoàn toàn khác nhau. Bằng tốt nghiệp, vi bằng, chứng chỉ nghề nghiệp và huy hiệu kỹ năng có thể khác nhau về nội dung, nhưng cùng vận hành trong một hệ sinh thái phát hành, lưu giữ và xác minh.

Khi tiêu chuẩn đã đủ trưởng thành, cuộc cạnh tranh không còn chỉ xoay quanh việc nhà cung cấp nào có thể tạo ra một văn bằng blockchain. Câu hỏi quan trọng hơn là giải pháp có thể hoạt động với ví khác, hệ thống khác và khung tin cậy khác hay không.


![Văn bằng chuyển từ hồ sơ giấy sang thực chứng số có thể sử dụng giữa nhiều hệ thống](/blog/tu-thi-diem-cua-mit-den-lan-song-so-hoa-bang-cap-khong-the-dao-nguoc/digital-diploma-education-credential-trends-1440.webp)

*Hình 3. Tiêu chuẩn mở giúp văn bằng, vi bằng và chứng nhận kỹ năng cùng vận hành trong một hệ sinh thái phát hành và xác minh liên thông.*

## Từ sáng kiến của trường học đến hạ tầng cấp khu vực

Liên minh châu Âu đã phát triển **European Digital Credentials for Learning** như một hạ tầng phục vụ phát hành và xác minh thực chứng học tập trên quy mô toàn khu vực.

Hệ thống này hỗ trợ nhiều loại kết quả học tập như bằng cấp, chứng chỉ đào tạo và vi bằng. Thực chứng được ký số bởi tổ chức phát hành và có thể lưu trong ví số như Europass.

Người học có thể sử dụng thực chứng để ứng tuyển, học tiếp hoặc công nhận bằng cấp mà không cần bản giấy. Bên tiếp nhận có thể xác minh trực tiếp nguồn phát hành và tính hợp lệ.

Điều quan trọng là bài toán đã thay đổi quy mô. Không còn chỉ là một trường đại học, mà là cả hệ sinh thái giáo dục – lao động xuyên quốc gia.


![Người học sử dụng thực chứng giáo dục số trong hạ tầng liên thông cấp khu vực](/blog/tu-thi-diem-cua-mit-den-lan-song-so-hoa-bang-cap-khong-the-dao-nguoc/ebsi-blockchain-european-digital-education-1440.webp)

*Hình 4. Khi hạ tầng thực chứng mở rộng từ một trường sang cả khu vực, kết quả học tập có thể phục vụ học tập, công nhận và việc làm xuyên biên giới.*

## Vì sao làn sóng số hóa ngày càng khó đảo ngược?

Động lực đầu tiên đến từ chính sự thay đổi của hoạt động giáo dục.

Người học ngày nay có thể tích lũy kiến thức từ trường đại học, khóa học trực tuyến, chương trình nghề nghiệp, doanh nghiệp và các khóa đào tạo ngắn hạn. Một tấm bằng giấy duy nhất không còn đủ để ghi nhận quá trình học tập ngày càng phân tán và liên tục. Khi số lượng vi bằng và kết quả học tập nhỏ tăng lên, việc phát hành và kiểm tra bằng phương thức thủ công trở nên không thể mở rộng.

Động lực thứ hai là sự dịch chuyển của người học và lực lượng lao động. Sinh viên học tại nhiều trường, tham gia chương trình trao đổi và ứng tuyển vào doanh nghiệp ngoài quốc gia nơi họ được đào tạo. Bên tiếp nhận cần một cách nhanh hơn để xác định tài liệu đến từ đâu và có còn hợp lệ hay không. Hạ tầng của châu Âu và các sáng kiến đại học quốc tế đều đặt khả năng di động này vào nhóm mục tiêu quan trọng.

Động lực thứ ba là nhu cầu tự động hóa. Một cổng tra cứu chỉ hiển thị văn bản cho con người vẫn đòi hỏi nhân viên mở từng đường dẫn và đọc từng bản ghi. Thực chứng có thể cho phép hệ thống tuyển sinh hoặc tuyển dụng kiểm tra những điều kiện cơ bản bằng phần mềm, qua đó giảm công việc lặp lại và đưa kết quả vào quy trình số.

Động lực thứ tư là gian lận văn bằng và chi phí xác minh. Bản scan và PDF có thể bị chỉnh sửa, trong khi việc liên hệ từng trường tiêu tốn thời gian của cả bên phát hành lẫn bên tiếp nhận. Những hệ thống như MIT, University of Melbourne và Europass đều nhấn mạnh khả năng xác minh độc lập như một lợi ích cốt lõi.

Động lực cuối cùng là quyền kiểm soát dữ liệu. Người học ngày càng kỳ vọng kết quả đào tạo có thể đi cùng mình thay vì bị gắn vĩnh viễn với tài khoản của một tổ chức hoặc nền tảng. Các sáng kiến do đại học dẫn dắt đang ưu tiên các định dạng có tính di động và tăng cường quyền riêng tư, trong khi W3C đưa những đặc tính này vào nền tảng tiêu chuẩn chung.

Những động lực này giúp giáo dục trở nên linh hoạt hơn, thị trường lao động mở rộng hơn, khối lượng thực chứng tăng lên và quy trình cần tự động hóa nhiều hơn. Vì vậy, mô hình dựa chủ yếu vào bản giấy, PDF và xác minh thủ công ngày càng khó đáp ứng nhu cầu thực tế.

## Không phải mọi văn bằng số đều là SSI

Sự phổ biến của thuật ngữ văn bằng số cũng tạo ra nguy cơ đánh đồng những hệ thống rất khác nhau.

Ở cấp độ đơn giản nhất, văn bằng số có thể chỉ là ảnh hoặc tệp PDF của tấm bằng giấy. Tài liệu dễ gửi hơn nhưng vẫn khó xác minh tự động.

Ở cấp độ tiếp theo, tài liệu có mã QR dẫn về một cơ sở dữ liệu của trường. Khả năng xác minh được cải thiện, nhưng người học và bên tiếp nhận vẫn phụ thuộc vào cổng thông tin của tổ chức phát hành.

Một bước tiến khác là văn bằng được ký số để hệ thống có thể kiểm tra nguồn gốc và phát hiện thay đổi. Tuy nhiên, tài liệu vẫn có thể gắn với một phần mềm hoặc định dạng riêng.

Gần hơn với SSI là mô hình trong đó thực chứng được phát hành dựa trên tiêu chuẩn mở, được người học trực tiếp nắm giữ, có thể chuyển giữa các ví tương thích và được nhiều bên kiểm tra mà không cần tích hợp riêng với từng trường.

Không phải mọi trường đều cần chuyển ngay đến cấp độ cuối cùng. Một cơ sở giáo dục có thể bắt đầu bằng số hóa dữ liệu, triển khai chữ ký số và xây dựng cổng tra cứu trước khi thử nghiệm phát hành thực chứng.

Điều quan trọng là mỗi bước đầu tư không nên tạo ra một ngõ cụt. Một hệ thống được xây dựng hôm nay cần có khả năng tiến dần đến tiêu chuẩn mở và liên thông, thay vì khóa dữ liệu và người học trong một nền tảng độc quyền.

## Bài học dành cho các trường đại học Việt Nam

Bài học đầu tiên từ MIT không phải là các trường cần nhanh chóng lựa chọn một blockchain. MIT bắt đầu bằng một vấn đề cụ thể: làm thế nào để sinh viên trực tiếp nhận văn bằng, dễ dàng chia sẻ và giúp bên thứ ba xác minh mà không phải liên hệ phòng đào tạo.

Các trường đại học Việt Nam cũng nên bắt đầu bằng một trường hợp sử dụng có phạm vi rõ ràng. Đó có thể là chứng chỉ đào tạo ngắn hạn, vi bằng, bằng của một chương trình quốc tế hoặc giấy xác nhận thực tập. Một thử nghiệm nhỏ cho phép trường đánh giá giá trị thực tế trước khi thay đổi hệ thống văn bằng chính quy.

Bài học thứ hai là ưu tiên tiêu chuẩn mở. Công nghệ sẽ tiếp tục thay đổi, nhưng bằng cấp phải tồn tại trong nhiều năm hoặc nhiều thập kỷ. Thực chứng không nên trở nên vô dụng chỉ vì trường thay đổi nhà cung cấp hoặc một ứng dụng ngừng hoạt động.

Bài học thứ ba là đưa người học và bên xác minh vào quá trình thiết kế. Một văn bằng số không tạo ra nhiều giá trị nếu sinh viên không biết cách sử dụng hoặc nhà tuyển dụng vẫn yêu cầu bản scan. Chương trình thử nghiệm cần có sự tham gia của phòng đào tạo, sinh viên, cựu sinh viên, doanh nghiệp và trường đối tác.

Bài học thứ tư là xây dựng khung quản trị trước khi mở rộng công nghệ. Nhà trường cần xác định đơn vị nào có quyền phát hành, cách sửa sai, thu hồi, bảo vệ dữ liệu và xác minh danh tính của người nhận. Nếu nhiều trường cùng tham gia, cần có quy tắc chung để nhận diện tổ chức phát hành và xác định thẩm quyền.

Cuối cùng, trường cần đo lường kết quả dựa trên giá trị sử dụng thay vì số lượng tài liệu được phát hành. Những chỉ số quan trọng gồm thời gian xác minh giảm được bao nhiêu, người học có thực sự chia sẻ thực chứng hay không, nhà tuyển dụng có chấp nhận không và văn bằng có sử dụng được ngoài hệ thống của nhà cung cấp ban đầu hay không.

## Từ xu hướng công nghệ đến yêu cầu cạnh tranh

Trong những năm đầu, văn bằng số có thể được xem là một tiện ích bổ sung hoặc một dự án thể hiện năng lực đổi mới. Trong tương lai, nó có khả năng trở thành một phần trong chất lượng dịch vụ mà sinh viên kỳ vọng từ trường đại học.

Người học sẽ không chỉ quan tâm trường cấp bằng gì, mà còn quan tâm bằng có thể được sử dụng như thế nào sau khi tốt nghiệp. Họ sẽ cần biết liệu nhà tuyển dụng có thể xác minh nhanh hay không, hồ sơ có thể được đưa vào ví khác hay không và thành tích từ trường có thể kết hợp với chứng nhận từ những tổ chức khác hay không.

Đối với trường đại học, khả năng phát hành thực chứng có thể ảnh hưởng đến hợp tác quốc tế, chương trình trao đổi, công nhận kết quả học tập và giá trị của văn bằng trên thị trường lao động. Một trường có thể cung cấp chương trình đào tạo xuất sắc, nhưng nếu kết quả khó xác minh và khó sử dụng ngoài hệ thống của mình, một phần giá trị ấy sẽ bị mất đi khi người học di chuyển đến những quốc gia, vùng lãnh thổ khác.

Số hóa bằng cấp vì thế không chỉ là công việc của bộ phận công nghệ thông tin. Nó liên quan đến chiến lược đào tạo, quản trị dữ liệu, dịch vụ sinh viên, hợp tác doanh nghiệp và vị thế quốc tế của nhà trường.

## Kết luận

Thí điểm năm 2017 của MIT bắt đầu với 111 sinh viên và một câu hỏi tưởng như đơn giản: liệu người học có thể trực tiếp sở hữu và chia sẻ tấm bằng chính thức của mình hay không?

Từ đó đến nay, câu hỏi đã mở rộng thành một chương trình nghị sự lớn hơn. Các trường đại học tiên phong triển khai thực chứng có thể kiểm tra. Những liên minh do các trường đại học dẫn dắt xây dựng hạ tầng dùng chung. W3C hoàn thiện tiêu chuẩn cho thực chứng. Open Badges hội tụ với mô hình Verifiable Credentials. Liên minh châu Âu đưa văn bằng số vào một hạ tầng phục vụ học tập, công nhận và việc làm xuyên biên giới.

Không phải mọi sáng kiến đều là SSI hoàn chỉnh và không phải mọi trường sẽ chuyển đổi cùng tốc độ. Blockchain có thể được sử dụng trong một số hệ thống nhưng không phải điều kiện bắt buộc. Những thách thức về quản trị, khả năng liên thông, trải nghiệm ví và sự chấp nhận của bên tiếp nhận vẫn còn tồn tại.

Dù vậy, hướng phát triển chung đã trở nên rõ ràng. Bằng cấp đang chuyển từ tài liệu được đọc bằng mắt sang dữ liệu có thể kiểm tra bằng máy; từ hồ sơ bị khóa trong hệ thống của trường sang bằng chứng có thể đi cùng người học; từ những cổng tra cứu riêng lẻ sang một hạ tầng dựa trên tiêu chuẩn và khung tin cậy chung.

Đó là ý nghĩa thực sự của làn sóng số hóa bằng cấp không thể đảo ngược. Không phải mọi tấm bằng sẽ được đưa lên blockchain, mà việc xác minh, sử dụng và trao đổi kết quả học tập sẽ ngày càng phải diễn ra theo cách phù hợp với một thế giới số, liên thông và không còn bị giới hạn bởi biên giới của từng cơ sở giáo dục.

Và khi văn bằng có thể đi cùng người học vượt qua ranh giới của một trường đại học, câu hỏi tiếp theo sẽ là liệu nó có thể đi qua ranh giới quốc gia và hệ thống pháp lý hay không. Đây chính là bài toán mà SSI có thể góp phần giải quyết trong tuyển dụng nhân sự quốc tế và thị trường lao động từ xa.

## Tài liệu tham khảo

* [MIT News (2017). *MIT debuts secure digital diploma using Bitcoin blockchain technology*](https://news.mit.edu/2017/mit-debuts-secure-digital-diploma-using-bitcoin-blockchain-technology-1017)
* [MIT Registrar. *Diplomas and Records – Digital Diplomas*](https://registrar.mit.edu/transcripts-records/diplomas)
* [Blockcerts Project (MIT Media Lab & Learning Machine)](https://www.blockcerts.org/)
* [University of Nicosia. *Blockchain Credentials Verification*](https://www.unic.ac.cy/verify/)
* [University of Melbourne (2017). *University of Melbourne to issue recipient-owned blockchain records*](https://www.unimelb.edu.au/newsroom/news/2017/october/university-of-melbourne-to-issue-recipient-owned-blockchain-records)
* [Digital Credentials Consortium](https://digitalcredentials.mit.edu/)
* [W3C (2025). *Verifiable Credentials 2.0 becomes a W3C Recommendation*](https://www.w3.org/press-releases/2025/verifiable-credentials-2-0/)
* [1EdTech Consortium. *Open Badges 3.0 Specification*](https://www.1edtech.org/standards/open-badges)
* [European Commission – Europass. *European Digital Credentials for Learning*](https://europass.europa.eu/en/european-digital-credentials-learning)`,
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
