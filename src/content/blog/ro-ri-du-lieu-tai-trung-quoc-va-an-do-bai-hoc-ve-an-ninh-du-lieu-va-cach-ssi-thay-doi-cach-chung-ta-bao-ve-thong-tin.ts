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

export const DATA_BREACHES_SSI_BLOG_ARTICLE_ID =
  'ro-ri-du-lieu-tai-trung-quoc-va-an-do-bai-hoc-ve-an-ninh-du-lieu-va-cach-ssi-thay-doi-cach-chung-ta-bao-ve-thong-tin' as const;

const assetRoot = `/blog/${DATA_BREACHES_SSI_BLOG_ARTICLE_ID}`;

export const DATA_BREACHES_SSI_BLOG_ARTICLE = {
  id: DATA_BREACHES_SSI_BLOG_ARTICLE_ID,
  slug: DATA_BREACHES_SSI_BLOG_ARTICLE_ID,
  publishedAt: '2026-08-30',
  modifiedAt: '2026-08-30',
  author: {
    type: 'Organization',
    name: 'Identra',
  },
  topics: ['security', 'privacy', 'identity'],
  industries: ['all'],
  contentLocales: ['vi'],
  relatedArticleIds: [
    'lua-dao-truc-tuyen-va-bai-toan-bao-ve-du-lieu-ca-nhan-trong-thoi-dai-so',
    'tiet-lo-co-chon-loc-la-gi',
    'dinh-danh-tu-chu-ssi-la-gi',
  ],
  coverImage: {
    src: `${assetRoot}/data-breach-cover-1440.webp`,
    srcSet: [
      `${assetRoot}/data-breach-cover-800.webp 800w`,
      `${assetRoot}/data-breach-cover-1440.webp 1440w`,
    ].join(', '),
    sizes: '(min-width: 1024px) 680px, (min-width: 768px) 55vw, 100vw',
    width: 1440,
    height: 810,
  },
  socialImage: {
    src: `${assetRoot}/data-breach-ssi-og.jpg`,
    width: 1200,
    height: 630,
    type: 'image/jpeg',
  },
  listing: {
    en: {
      title: 'Data Breaches in China and India: Security Lessons for SSI',
      description: 'What large-scale data leaks reveal about copied identity records, data minimization and how SSI can reduce the information organizations must retain.',
      type: 'Data security',
      duration: '12 min read',
    },
    es: {
      title: 'Filtraciones de datos en China e India: lecciones para SSI',
      description: 'Qué revelan las filtraciones masivas sobre las copias de datos de identidad, la minimización de datos y el papel de SSI para reducir su almacenamiento.',
      type: 'Seguridad de datos',
      duration: '12 min de lectura',
    },
    ja: {
      title: '中国とインドの情報漏えいから学ぶSSIのセキュリティ',
      description: '大規模な情報漏えいを手がかりに、複製される本人確認データのリスク、データ最小化、SSIが保管対象を減らす仕組みを解説します。',
      type: 'データセキュリティ',
      duration: '読了12分',
    },
    de: {
      title: 'Datenlecks in China und Indien: Lehren für SSI',
      description: 'Was großflächige Datenlecks über kopierte Identitätsdaten, Datenminimierung und die Rolle von SSI bei der Reduzierung gespeicherter Informationen zeigen.',
      type: 'Datensicherheit',
      duration: '12 Min. Lesezeit',
    },
    vi: {
      title: 'Rò rỉ dữ liệu tại Trung Quốc và Ấn Độ: Bài học về an ninh dữ liệu và cách SSI thay đổi cách chúng ta bảo vệ thông tin',
      description: 'Những vụ rò rỉ quy mô lớn cho thấy rủi ro của việc sao chép dữ liệu định danh và cách SSI có thể giảm lượng thông tin phải lưu giữ.',
      type: 'An ninh dữ liệu',
      duration: 'Đọc trong 12 phút',
    },
  } satisfies Record<Locale, BlogArticleListingCopy>,
  images: {},
  content: {
    vi: {
      title: 'Rò rỉ dữ liệu tại Trung Quốc và Ấn Độ: Bài học về an ninh dữ liệu và cách SSI thay đổi cách chúng ta bảo vệ thông tin',
      description: 'Những vụ rò rỉ quy mô lớn cho thấy rủi ro của việc sao chép dữ liệu định danh và cách SSI có thể giảm lượng thông tin phải lưu giữ.',
      excerpt: 'An ninh dữ liệu không chỉ nằm ở việc bảo vệ tốt hơn những kho dữ liệu lớn, mà còn ở việc giảm số bản sao và chỉ lưu những thông tin thực sự cần thiết.',
      category: 'An ninh dữ liệu',
      tags: ['Rò rỉ dữ liệu', 'An ninh dữ liệu', 'Định danh tự chủ', 'Tối thiểu hóa dữ liệu'],
      readTimeMinutes: 12,
      ui: {
        publishedLabel: 'Xuất bản ngày',
        authorRole: 'Đội ngũ nội dung Identra',
        tableOfContents: 'Mục lục',
        openTableOfContents: 'Mở mục lục bài viết',
        closeTableOfContents: 'Đóng mục lục bài viết',
        ctaTitle: 'Giảm dữ liệu phải bảo vệ ngay từ kiến trúc',
        ctaDescription: 'Khám phá cách Identra giúp tổ chức xác minh đúng thông tin cần thiết mà không phải lưu thêm những bản sao dữ liệu định danh không cần thiết.',
        ctaButtonLabel: 'Trải nghiệm demo',
      },
      tableOfContents: [
        {
          id: 'trung-quoc-2022-du-lieu-cua-khoang-mot-ty-nguoi-bi-rao-ban',
          label: 'Trung Quốc 2022: dữ liệu của khoảng một tỷ người bị rao bán',
          level: 2,
        },
        {
          id: 'an-do-2023-du-lieu-nhay-cam-cua-hon-800-trieu-nguoi-bi-lo-tu-cac-he-thong-ben-thu-ba',
          label: 'Ấn Độ 2023: dữ liệu nhạy cảm của hơn 800 triệu người bị lộ từ các hệ thống bên thứ ba',
          level: 2,
        },
        {
          id: 'tu-mot-ban-ghi-thanh-hang-chuc-ban-sao',
          label: 'Từ một bản ghi thành hàng chục bản sao',
          level: 2,
        },
        {
          id: 'ssi-thay-doi-cach-du-lieu-duoc-su-dung-nhu-the-nao',
          label: 'SSI thay đổi cách dữ liệu được sử dụng như thế nào?',
          level: 2,
        },
        {
          id: 'it-du-lieu-hon-cung-dong-nghia-voi-it-rui-ro-hon',
          label: 'Ít dữ liệu hơn cũng đồng nghĩa với ít rủi ro hơn',
          level: 2,
        },
        {
          id: 'khong-phai-du-lieu-nao-cung-nen-duoc-dua-ve-phia-nguoi-dung',
          label: 'Không phải dữ liệu nào cũng nên được đưa về phía người dùng',
          level: 2,
        },
        {
          id: 'bai-hoc-tu-nhung-vu-ro-ri-du-lieu-quy-mo-lon',
          label: 'Bài học từ những vụ rò rỉ dữ liệu quy mô lớn',
          level: 2,
        },
      ] satisfies BlogArticleTableOfContentsItem[],
      markdown: `Càng nhiều hoạt động được đưa lên môi trường số, lượng thông tin chúng ta phải cung cấp cho các tổ chức cũng ngày một nhiều hơn.

Mở tài khoản ngân hàng cần xác minh danh tính. Đăng ký bảo hiểm cần thông tin cá nhân. Xin việc cần bằng cấp, chứng chỉ. Sử dụng một số dịch vụ trực tuyến có thể phải cung cấp giấy tờ tùy thân, số điện thoại, địa chỉ hoặc ảnh khuôn mặt.

Từng yêu cầu riêng lẻ đều có lý do của nó. Nhưng khi hàng trăm triệu người sử dụng hàng chục dịch vụ khác nhau, một lượng rất lớn dữ liệu nhạy cảm sẽ dần được sao chép và lưu giữ trong vô số hệ thống.

Thông thường, chúng ta chỉ thực sự chú ý đến vấn đề này khi một trong số những hệ thống đó bị xâm nhập.

Hai sự kiện xảy ra tại Trung Quốc năm 2022 và Ấn Độ năm 2023 cho thấy hậu quả có thể lớn đến mức nào. Trong cả hai trường hợp, dữ liệu được cho là liên quan đến hàng trăm triệu người đã xuất hiện trên các diễn đàn mua bán dữ liệu. Quy mô của chúng lớn đến mức vấn đề không còn chỉ nằm ở một doanh nghiệp hay một hệ thống riêng lẻ, mà trở thành câu chuyện về cách dữ liệu định danh đang được lưu trữ và trao đổi trong cả một nền kinh tế số.

## Trung Quốc 2022: dữ liệu của khoảng một tỷ người bị rao bán

Tháng 7/2022, một tài khoản sử dụng bí danh ChinaDan rao bán một tập dữ liệu được cho là lấy từ hệ thống của cảnh sát Thượng Hải.

Người bán tuyên bố dữ liệu có dung lượng khoảng 23 TB và liên quan đến khoảng một tỷ người Trung Quốc. Những thông tin được cho là xuất hiện trong đó gồm họ tên, địa chỉ, số định danh quốc gia, số điện thoại và nhiều loại dữ liệu khác.

Quy mô của vụ việc khiến nó nhanh chóng thu hút sự chú ý trên toàn thế giới. Nếu con số được công bố là chính xác, chỉ một sự cố đã có thể làm lộ thông tin liên quan đến phần lớn dân số của một quốc gia.

Điều đáng chú ý ở đây không chỉ là cách dữ liệu bị lấy đi. Quan trọng hơn là việc một hệ thống có thể tập trung lượng thông tin nhạy cảm lớn đến mức khi xảy ra sự cố, hậu quả lập tức lan tới hàng trăm triệu người.

Trong những hệ thống như vậy, giá trị của dữ liệu càng lớn thì sức hấp dẫn đối với kẻ tấn công cũng càng cao. Một cơ sở dữ liệu chứa vài nghìn hồ sơ đã có giá trị; một cơ sở dữ liệu chứa thông tin của hàng trăm triệu người lại là một mục tiêu hoàn toàn khác.

## Ấn Độ 2023: dữ liệu nhạy cảm của hơn 800 triệu người bị lộ từ các hệ thống bên thứ ba

Khoảng một năm sau, một vụ việc khác được phát hiện tại Ấn Độ.

Tháng 10/2023, dữ liệu được cho là của khoảng 815 triệu người Ấn Độ được rao bán trên một diễn đàn chuyên trao đổi dữ liệu bị đánh cắp. Các thông tin được nhắc đến gồm họ tên, địa chỉ, số điện thoại, số Aadhaar và dữ liệu liên quan đến hộ chiếu.

Một số mẫu dữ liệu sau đó được kiểm tra và cho thấy thông tin trong đó khớp với dữ liệu thực tế. Đến cuối năm, cảnh sát Delhi bắt giữ một số nghi phạm liên quan đến vụ việc.

Điểm đáng chú ý là cơ sở dữ liệu Aadhaar trung tâm không được xác định là nơi trực tiếp bị xâm nhập. Dữ liệu có thể đã bị lộ từ những hệ thống khác từng được cấp quyền truy cập hoặc sử dụng các thông tin này trong quá trình cung cấp dịch vụ.

Chi tiết đó cho thấy một vấn đề rộng hơn rất nhiều.

Một cơ sở dữ liệu trung tâm có thể được bảo vệ tốt, nhưng dữ liệu của nó không nhất thiết chỉ tồn tại ở đó. Trong quá trình sử dụng, thông tin có thể được chia sẻ cho cơ quan khác, đồng bộ sang hệ thống khác hoặc được lưu lại để phục vụ những quy trình nghiệp vụ khác nhau.

Mỗi lần dữ liệu được sao chép, phạm vi cần bảo vệ lại mở rộng thêm.

Vì thế, an toàn của dữ liệu không còn phụ thuộc hoàn toàn vào hệ thống ban đầu. Nó còn phụ thuộc vào tất cả những nơi khác đang giữ một bản sao của dữ liệu đó.

## Từ một bản ghi thành hàng chục bản sao

Đây không phải vấn đề chỉ tồn tại trong những hệ thống có quy mô quốc gia.

Một người bình thường có thể đã trải qua điều tương tự nhiều lần mà không để ý.

Khi mở tài khoản ngân hàng, chúng ta cung cấp giấy tờ tùy thân. Khi sử dụng một dịch vụ tài chính khác, chúng ta lại cung cấp những thông tin tương tự. Khi xin việc, thuê nhà, đăng ký bảo hiểm hoặc tham gia một nền tảng yêu cầu xác minh danh tính, cùng một tập thông tin lại tiếp tục được gửi đi.

Mỗi tổ chức thường có cơ sở dữ liệu riêng và tự chịu trách nhiệm xác minh khách hàng của mình. Điều đó khiến cùng một họ tên, ngày sinh, số định danh, địa chỉ hay hình ảnh giấy tờ có thể tồn tại ở rất nhiều nơi.

Nếu tất cả những hệ thống này đều được bảo vệ tốt, rủi ro có thể được kiểm soát. Nhưng trong thực tế, chất lượng an ninh giữa các tổ chức không bao giờ hoàn toàn giống nhau. Có nơi đầu tư rất lớn cho bảo mật, có nơi chỉ đáp ứng mức tối thiểu; có hệ thống mới được xây dựng cẩn thận, cũng có hệ thống đã vận hành nhiều năm với những thành phần cũ.

Khi dữ liệu đã được sao chép sang nhiều nơi, chỉ cần một trong số đó gặp sự cố, thông tin vẫn có thể bị lộ.

Đây là điểm khiến rò rỉ dữ liệu định danh trở nên đặc biệt đáng lo ngại. Nhiều loại dữ liệu khác có thể được thay thế sau khi bị lộ. Mật khẩu có thể đổi. Thẻ ngân hàng có thể khóa và cấp lại. Khóa mật mã có thể thu hồi.

Nhưng ngày sinh, khuôn mặt, dấu vân tay, lịch sử học tập hay nhiều thông tin gắn với một cá nhân trong thời gian dài thì không dễ thay đổi như vậy.

Một khi những dữ liệu này đã bị phát tán, việc đưa chúng trở lại trạng thái “chưa từng bị lộ” gần như là điều không thể.

Vì thế, bảo vệ dữ liệu định danh không thể chỉ dựa vào việc xây dựng những hệ thống phòng thủ tốt hơn. Mã hóa, phân quyền truy cập, giám sát hay kiểm thử bảo mật vẫn rất cần thiết, nhưng còn một hướng khác thường ít được chú ý hơn: **hạn chế số lượng dữ liệu phải được sao chép và lưu giữ ngay từ đầu.**

## SSI thay đổi cách dữ liệu được sử dụng như thế nào?

Đây là một trong những điểm mà SSI có thể tạo ra khác biệt.

SSI không loại bỏ cơ sở dữ liệu tập trung và cũng không khiến các hệ thống trở nên miễn nhiễm trước tấn công mạng. Cơ quan nhà nước vẫn phải quản lý dữ liệu thuộc trách nhiệm của mình. Ngân hàng vẫn phải lưu những thông tin mà pháp luật yêu cầu. Bệnh viện vẫn cần hồ sơ bệnh án. Trường đại học vẫn phải quản lý quá trình học tập của sinh viên.

Điều SSI thay đổi chủ yếu nằm ở những trường hợp mà một tổ chức **chỉ cần xác minh một thông tin**, nhưng theo cách hiện nay lại phải nhận và lưu cả một tập dữ liệu lớn hơn nhiều.

Giả sử một dịch vụ chỉ cần kiểm tra người dùng đã đủ 18 tuổi.

Cách phổ biến hiện nay là yêu cầu người dùng cung cấp căn cước hoặc một loại giấy tờ tương đương. Từ đó, hệ thống có thể nhận được không chỉ ngày sinh mà còn họ tên, số định danh, ảnh khuôn mặt, địa chỉ và nhiều thông tin khác.

Sau khi xác minh xong tuổi, phần dữ liệu còn lại vẫn có thể tiếp tục nằm trong hệ thống dù không còn cần thiết cho mục đích ban đầu.

Với SSI, cơ quan có thẩm quyền có thể phát hành cho người dùng một thực chứng. Thực chứng này được lưu trong ví định tín và có thể được sử dụng khi người dùng cần chứng minh một thông tin với dịch vụ khác.

Nếu chỉ cần kiểm tra độ tuổi, hệ thống có thể yêu cầu đúng thông tin phục vụ việc đó. Khi kết hợp với cơ chế tiết lộ có chọn lọc, trong một số trường hợp người dùng chỉ cần chứng minh rằng mình đã đủ 18 tuổi mà không phải cung cấp ngày sinh cụ thể hay toàn bộ giấy tờ.

Dịch vụ vẫn có thể kiểm tra nguồn phát hành và tính hợp lệ của bằng chứng, nhưng không cần giữ những dữ liệu không liên quan tới mục đích của giao dịch.

Cách tiếp cận này có thể áp dụng rộng hơn nhiều.

Một nhà tuyển dụng cần biết ứng viên đã tốt nghiệp một ngành nhất định không nhất thiết phải lưu toàn bộ bảng điểm. Một công ty cho thuê xe cần biết khách hàng có giấy phép phù hợp và còn hiệu lực không nhất thiết phải giữ mọi thông tin trên giấy phép. Một hệ thống kiểm soát truy cập chỉ cần biết một người đang có quyền vào khu vực nào đó không nhất thiết phải nhận toàn bộ hồ sơ nhân sự.

Khác biệt nằm ở việc **chuyển từ yêu cầu giấy tờ sang yêu cầu bằng chứng cho đúng thông tin cần xác minh**.

Khi cách xác minh thay đổi, lượng dữ liệu phải di chuyển và được lưu lại cũng có thể giảm theo.

## Ít dữ liệu hơn cũng đồng nghĩa với ít rủi ro hơn

Giả sử một nền tảng có một triệu người dùng và yêu cầu tất cả họ tải lên căn cước để chứng minh tuổi.

Nếu nền tảng bị xâm nhập, kẻ tấn công có thể lấy được một tập dữ liệu rất có giá trị: một triệu hình ảnh giấy tờ, kèm theo họ tên, ngày sinh, số định danh, địa chỉ và ảnh khuôn mặt.

Nếu nền tảng chỉ từng nhận bằng chứng rằng người dùng đã đủ tuổi, dữ liệu bị đánh cắp trong cùng một cuộc tấn công sẽ khác rất nhiều.

Sự cố an ninh vẫn có thể xảy ra. Nhưng những hình ảnh căn cước chưa từng được lưu trong hệ thống thì cũng không thể bị lấy đi từ hệ thống đó.

Đây là điểm SSI bổ sung cho các biện pháp bảo mật truyền thống.

An ninh mạng thông thường tập trung vào việc bảo vệ dữ liệu mà tổ chức đang nắm giữ. SSI giúp giảm bớt những trường hợp tổ chức phải nắm giữ dữ liệu ngay từ đầu.

Hai cách tiếp cận này không thay thế nhau. Chúng bổ sung cho nhau.

Những thông tin buộc phải lưu vẫn cần được mã hóa, phân quyền và giám sát nghiêm ngặt. Nhưng đối với những dữ liệu chỉ cần để xác minh một điều gì đó tại một thời điểm, việc không lưu lại toàn bộ giấy tờ có thể làm giảm đáng kể rủi ro lâu dài.

Ở quy mô lớn, sự khác biệt này có thể rất đáng kể.

Nếu hàng nghìn dịch vụ cùng giảm việc lưu trữ bản sao giấy tờ, số lượng cơ sở dữ liệu chứa những tập thông tin định danh đầy đủ cũng sẽ giảm theo. Khi một hệ thống gặp sự cố, lượng dữ liệu có thể bị lấy đi vì thế cũng nhỏ hơn.

## Không phải dữ liệu nào cũng nên được đưa về phía người dùng

SSI đôi khi bị hiểu quá đơn giản như một mô hình trong đó toàn bộ dữ liệu được lấy khỏi các tổ chức và chuyển vào ví cá nhân. Trên thực tế, đây không phải cách hệ thống vận hành.

Một bệnh viện vẫn cần giữ hồ sơ điều trị. Cơ quan nhà nước vẫn cần cơ sở dữ liệu phục vụ quản lý. Doanh nghiệp vẫn phải lưu những thông tin cần thiết cho hoạt động và nghĩa vụ pháp lý của mình.

Điểm cần phân biệt là giữa **dữ liệu một tổ chức thực sự cần quản lý** và **dữ liệu họ chỉ cần kiểm tra trước khi đưa ra quyết định**.

Nếu ngân hàng buộc phải lưu một số thông tin khách hàng theo quy định, SSI không làm nghĩa vụ đó biến mất. Nhưng nếu một dịch vụ chỉ muốn biết khách hàng đã đủ tuổi, việc yêu cầu và giữ lại toàn bộ căn cước có thể là không cần thiết.

Nếu một nhà tuyển dụng chỉ cần xác minh bằng cấp, họ có thể không cần giữ bản scan bằng tốt nghiệp trong nhiều năm.

Nếu một nền tảng cần biết doanh nghiệp đối tác đang có giấy phép hoạt động hợp lệ, việc xác minh một thực chứng có thể hợp lý hơn việc mỗi nền tảng tự lưu một bản sao đầy đủ của hồ sơ pháp lý.

SSI vì thế không xóa bỏ cơ sở dữ liệu. Nó giúp thu hẹp phạm vi những dữ liệu cần phải nằm trong mỗi cơ sở dữ liệu.

## Bài học từ những vụ rò rỉ dữ liệu quy mô lớn

Những sự kiện tại Trung Quốc và Ấn Độ cho thấy một thực tế khó tránh khỏi của quá trình số hóa: càng nhiều dữ liệu được tập trung và sao chép, hậu quả khi một mắt xích gặp sự cố càng lớn.

Tăng cường bảo mật vẫn là điều bắt buộc. Không có kiến trúc dữ liệu nào có thể thay thế việc xây dựng hệ thống an toàn, quản lý quyền truy cập chặt chẽ và duy trì quy trình vận hành tốt.

Nhưng nếu chỉ tập trung vào việc bảo vệ những cơ sở dữ liệu ngày càng lớn, chúng ta mới giải quyết một nửa vấn đề.

Nửa còn lại nằm ở việc xem xét dữ liệu nào thực sự cần phải được lưu giữ lâu dài, dữ liệu nào chỉ cần được xác minh trong một giao dịch và liệu có cần tạo thêm một bản sao mỗi lần thông tin được sử dụng hay không.

SSI đưa ra một cách tiếp cận khác cho phần bài toán đó. Thay vì để mỗi tổ chức tự thu thập và giữ lại toàn bộ giấy tờ, một phần thông tin có thể được phát hành dưới dạng thực chứng, được chủ thể quản lý trong ví định tín và chỉ trình ra những gì cần thiết khi có yêu cầu xác minh.

Điều này không khiến rò rỉ dữ liệu biến mất. Nhưng nó có thể làm giảm số lượng dữ liệu nhạy cảm được phân tán trong toàn bộ hệ sinh thái số và từ đó giảm mức độ thiệt hại khi một hệ thống nào đó bị xâm nhập.

Trong một môi trường mà không hệ thống nào có thể được bảo đảm an toàn tuyệt đối trong suốt vòng đời của nó, **giảm bớt dữ liệu phải bảo vệ cũng quan trọng không kém việc bảo vệ dữ liệu tốt hơn**.

Đó có lẽ là bài học đáng chú ý nhất từ những vụ rò rỉ dữ liệu có quy mô hàng trăm triệu người.`,
    },
  },
} satisfies StructuredBlogArticle;
