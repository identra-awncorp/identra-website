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

export const LIFELONG_LEARNING_BLOG_ARTICLE_ID =
  'ho-so-hoc-tap-suot-doi-loi-ich-cua-mo-hinh-dinh-danh-tu-chu-doi-voi-nguoi-hoc' as const;

const assetRoot = '/blog/ho-so-hoc-tap-suot-doi-loi-ich-cua-mo-hinh-dinh-danh-tu-chu-doi-voi-nguoi-hoc';

export const LIFELONG_LEARNING_BLOG_ARTICLE = {
  id: LIFELONG_LEARNING_BLOG_ARTICLE_ID,
  slug: LIFELONG_LEARNING_BLOG_ARTICLE_ID,
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
    'ssi-trong-giao-duc-giai-phap-so-hoa-bang-cap-va-xac-minh-nang-luc',
    'tu-thi-diem-cua-mit-den-lan-song-so-hoa-bang-cap-khong-the-dao-nguoc',
    'rao-can-phap-ly-trong-tuyen-dung-quoc-te-ssi-mo-duong-cho-nhan-su-remote-nhu-the-nao',
  ],
  coverImage: {
    src: `${assetRoot}/learning-passport-digital-education-records-1440.webp`,
    srcSet: [
      `${assetRoot}/learning-passport-digital-education-records-800.webp 800w`,
      `${assetRoot}/learning-passport-digital-education-records-1440.webp 1440w`,
    ].join(', '),
    sizes: '(min-width: 1024px) 680px, (min-width: 768px) 55vw, 100vw',
    width: 1440,
    height: 810,
  },
  socialImage: {
    src: `${assetRoot}/ho-so-hoc-tap-suot-doi-loi-ich-cua-mo-hinh-dinh-danh-tu-chu-doi-voi-nguoi-hoc-og.jpg`,
    width: 1200,
    height: 630,
    type: 'image/jpeg',
  },
  listing: {
    en: {
      title: 'Lifelong learning records: How self-sovereign identity benefits learners',
      description: 'How SSI helps learners carry verified achievements across institutions, careers, and stages of life while sharing only the evidence each opportunity requires.',
      type: 'Education',
      duration: '25 min read',
    },
    es: {
      title: 'Expediente de aprendizaje permanente: Beneficios de la identidad autosoberana',
      description: 'Cómo SSI permite conservar logros verificables entre instituciones y etapas profesionales, y compartir solo las evidencias necesarias en cada oportunidad.',
      type: 'Educación',
      duration: '25 min de lectura',
    },
    ja: {
      title: '生涯学習記録：自己主権型アイデンティティが学習者にもたらす利点',
      description: 'SSIにより、学習者が教育機関や職歴をまたいで検証可能な成果を保持し、機会ごとに必要な証明だけを共有できる仕組みを解説します。',
      type: '教育',
      duration: '読了25分',
    },
    de: {
      title: 'Lebenslange Lernakte: Vorteile selbstbestimmter Identität für Lernende',
      description: 'Wie SSI verifizierbare Lernerfolge über Einrichtungen und Berufsphasen hinweg nutzbar macht und eine gezielte Weitergabe von Nachweisen ermöglicht.',
      type: 'Bildung',
      duration: '25 Min. Lesezeit',
    },
    vi: {
      title: 'Hồ sơ học tập suốt đời: Lợi ích của mô hình định danh tự chủ cho người học',
      description: 'Cách SSI giúp người học mang theo thành tích đã được xác minh qua nhiều cơ sở, giai đoạn nghề nghiệp và chỉ chia sẻ bằng chứng phù hợp với từng cơ hội.',
      type: 'Giáo dục',
      duration: 'Đọc trong 25 phút',
    },
  } satisfies Record<Locale, BlogArticleListingCopy>,
  images: {
    [`${assetRoot}/learning-passport-digital-education-records-1440.webp`]: responsiveImage('learning-passport-digital-education-records'),
    [`${assetRoot}/cross-border-student-self-sovereign-identity-1440.webp`]: responsiveImage('cross-border-student-self-sovereign-identity'),
    [`${assetRoot}/ebsi-blockchain-european-digital-education-1440.webp`]: responsiveImage('ebsi-blockchain-european-digital-education'),
    [`${assetRoot}/selective-disclosure-private-data-sharing-1440.webp`]: responsiveImage('selective-disclosure-private-data-sharing'),
  } satisfies Record<string, BlogArticleImage>,
  content: {
    vi: {
      title: 'Hồ sơ học tập suốt đời: Lợi ích của mô hình định danh tự chủ cho người học',
      description: 'Tìm hiểu cách SSI giúp người học trực tiếp nắm giữ, kết hợp và sử dụng những thành tích có thể kiểm chứng trong suốt hành trình học tập và nghề nghiệp.',
      excerpt: 'Khi việc học diễn ra ở nhiều trường, nền tảng và môi trường nghề nghiệp, người học cần một hồ sơ có thể đi cùng mình thay vì bị chia cắt trong từng hệ thống.',
      category: 'Giáo dục',
      tags: ['SSI', 'Hồ sơ học tập suốt đời', 'Giáo dục số', 'Thực chứng', 'Quyền dữ liệu'],
      readTimeMinutes: 25,
      ui: {
        publishedLabel: 'Xuất bản ngày',
        authorRole: 'Đội ngũ nội dung Identra',
        tableOfContents: 'Mục lục',
        openTableOfContents: 'Mở mục lục bài viết',
        closeTableOfContents: 'Đóng mục lục bài viết',
        ctaTitle: 'Xây dựng hồ sơ năng lực suốt đời với Identra',
        ctaDescription: 'Khám phá cách thực chứng giúp người học mang theo và sử dụng kết quả học tập trong nhiều cơ hội khác nhau.',
        ctaButtonLabel: 'Trải nghiệm demo',
      },
      tableOfContents: [
        { id: 'mot-cuoc-doi-hoc-tap-nhieu-ho-so-bi-chia-cat', label: 'Một hành trình, nhiều hồ sơ bị chia cắt', level: 2 },
        { id: 'duoc-xem-du-lieu-chua-dong-nghia-voi-viec-nam-giu-ho-so', label: 'Xem dữ liệu chưa phải là nắm giữ hồ sơ', level: 2 },
        { id: 'ho-so-hoc-tap-suot-doi-khong-phai-la-mot-co-so-du-lieu-khong-lo', label: 'Không cần một cơ sở dữ liệu khổng lồ', level: 2 },
        { id: 'tu-tam-bang-cuoi-khoa-den-qua-trinh-phat-trien-nang-luc-lien-tuc', label: 'Từ tấm bằng đến năng lực liên tục', level: 2 },
        { id: 'nguoi-hoc-co-the-xay-dung-nhieu-ho-so-tu-cung-mot-hanh-trinh', label: 'Nhiều hồ sơ từ cùng một hành trình', level: 2 },
        { id: 'chia-se-dung-thong-tin-thay-vi-toan-bo-lich-su', label: 'Chia sẻ đúng thông tin cần thiết', level: 2 },
        { id: 'nguoi-hoc-khong-phai-bat-dau-lai-moi-khi-chuyen-doi', label: 'Không phải bắt đầu lại khi chuyển đổi', level: 2 },
        { id: 'loi-ich-lau-dai-doi-voi-nguoi-hoc', label: 'Lợi ích lâu dài đối với người học', level: 2 },
        { id: 'gia-tri-doi-voi-truong-dai-hoc-khong-chi-la-giam-thu-tuc', label: 'Giá trị đối với trường đại học', level: 2 },
        { id: 'tu-quan-ly-sinh-vien-den-dong-hanh-voi-nguoi-hoc-suot-doi', label: 'Đồng hành với người học suốt đời', level: 2 },
        { id: 'nhung-dieu-kien-de-ho-so-thuc-su-thuoc-ve-nguoi-hoc', label: 'Điều kiện để hồ sơ thuộc về người học', level: 2 },
        { id: 'lien-he-voi-dinh-huong-tai-viet-nam-xay-dung-he-sinh-thai-ho-so-hoc-tap-suot-doi', label: 'Định hướng hồ sơ học tập tại Việt Nam', level: 2 },
        { id: 'ket-luan', label: 'Kết luận', level: 2 },
        { id: 'tai-lieu-tham-khao', label: 'Tài liệu tham khảo', level: 2 },
      ] satisfies BlogArticleTableOfContentsItem[],
      markdown: `Một người có thể bắt đầu hành trình học tập tại trường đại học, tiếp tục bằng một chương trình trao đổi quốc tế, tham gia các khóa học trực tuyến, nhận chứng chỉ nghề nghiệp từ doanh nghiệp và quay lại trường nhiều năm sau để cập nhật kiến thức. Quá trình học tập ngày nay không còn diễn ra trong một giai đoạn cố định, tại một cơ sở duy nhất và kết thúc khi người học nhận bằng tốt nghiệp.

UNESCO nhìn nhận học tập suốt đời là một quá trình kéo dài trong toàn bộ cuộc đời, kết nối giáo dục chính quy, giáo dục không chính quy và việc học diễn ra tại nơi làm việc, cộng đồng hoặc các nền tảng trực tuyến. Trong một thế giới liên tục thay đổi bởi công nghệ, toàn cầu hóa và những chuyển dịch xã hội, kiến thức tích lũy tại trường phổ thông hoặc đại học không còn đủ để một người sử dụng trong toàn bộ sự nghiệp.

Tuy nhiên, trong khi việc học đã vượt ra khỏi ranh giới của một trường học, hồ sơ ghi nhận quá trình ấy vẫn thường bị chia cắt.

Bằng đại học nằm trong hệ thống quản lý của trường. Chứng chỉ ngoại ngữ được lưu tại tổ chức khảo thí. Kết quả khóa học trực tuyến gắn với tài khoản trên một nền tảng. Giấy xác nhận thực tập, chứng nhận đào tạo nội bộ và thành tích nghề nghiệp lại thuộc về những hệ thống khác. Khi ứng tuyển, đăng ký học tiếp hoặc chuyển đổi nghề nghiệp, người học phải tự tìm lại từng tài liệu để ghép thành một hồ sơ tạm thời.

Mô hình **định danh tự chủ**, hay **Self-Sovereign Identity (SSI)**, mở ra khả năng xây dựng một hồ sơ học tập khác: thay vì để thành tích bị khóa trong từng hệ thống, các tổ chức có thể phát hành những thực chứng mà người học trực tiếp nắm giữ, kết hợp và sử dụng trong suốt cuộc đời.

Đây không chỉ là một cách mới để lưu bằng cấp. Nó có thể làm thay đổi vị trí của người học trong toàn bộ hệ sinh thái giáo dục.


![Người học mang theo hồ sơ học tập số qua nhiều giai đoạn giáo dục và nghề nghiệp](/blog/ho-so-hoc-tap-suot-doi-loi-ich-cua-mo-hinh-dinh-danh-tu-chu-doi-voi-nguoi-hoc/learning-passport-digital-education-records-1440.webp)

*Hình 1. Hồ sơ học tập suốt đời kết nối các cột mốc giáo dục, kỹ năng và nghề nghiệp trong một hành trình do người học chủ động quản lý.*

## Một cuộc đời học tập, nhiều hồ sơ bị chia cắt

Hãy hình dung hành trình của một người học tên Lan.

Lan tốt nghiệp ngành tài chính tại một trường đại học. Trong thời gian học, cô tham gia chương trình trao đổi tại nước ngoài, hoàn thành một khóa phân tích dữ liệu trên nền tảng trực tuyến và thực tập tại ngân hàng. Sau khi đi làm, Lan tiếp tục nhận chứng chỉ quản trị rủi ro, tham gia chương trình đào tạo về trí tuệ nhân tạo và hoàn thành một khóa học ngắn hạn tại trường đại học khác.

Mỗi tổ chức đều biết một phần trong hành trình của Lan. Trường đại học biết cô đã hoàn thành chương trình cử nhân. Trường đối tác biết kết quả của học kỳ trao đổi. Nền tảng trực tuyến ghi nhận khóa học về dữ liệu. Ngân hàng xác nhận thời gian thực tập. Tổ chức nghề nghiệp quản lý chứng chỉ chuyên môn.

Không tổ chức nào có một bức tranh đầy đủ, và cũng không nhất thiết phải có.

Vấn đề xuất hiện khi chính Lan cũng không có một hồ sơ thống nhất mà mình thực sự kiểm soát. Cô có thể xem bảng điểm qua cổng sinh viên, tải chứng chỉ từ một nền tảng hoặc tìm lại thư xác nhận trong email, nhưng khả năng sử dụng những tài liệu đó phụ thuộc vào tài khoản, định dạng và chính sách của từng nhà cung cấp.

Nếu một hệ thống ngừng hoạt động, tài khoản cũ bị khóa hoặc đường dẫn xác minh hết hiệu lực, việc chứng minh một thành tích có thể trở nên khó khăn. Ngay cả khi Lan vẫn giữ tệp PDF, bên tiếp nhận chưa chắc có thể kiểm tra nó một cách tự động và đáng tin cậy.

Hồ sơ học tập hiện nay vì thế thường được tổ chức theo góc nhìn của cơ sở giáo dục: mỗi đơn vị quản lý phần dữ liệu do mình tạo ra. Trong khi đó, hành trình của người học lại diễn ra xuyên qua nhiều tổ chức, nhiều môi trường và nhiều giai đoạn khác nhau.


![Sinh viên sử dụng thực chứng để mang kết quả học tập giữa nhiều cơ sở giáo dục](/blog/ho-so-hoc-tap-suot-doi-loi-ich-cua-mo-hinh-dinh-danh-tu-chu-doi-voi-nguoi-hoc/cross-border-student-self-sovereign-identity-1440.webp)

*Hình 2. Thực chứng giúp kết quả học tập tiếp tục được kiểm tra và sử dụng khi người học chuyển giữa các tổ chức hoặc quốc gia.*

## Được xem dữ liệu chưa đồng nghĩa với việc nắm giữ hồ sơ

Nhiều trường học đã cung cấp cho sinh viên cổng thông tin trực tuyến để xem bảng điểm, lịch sử học tập và các giấy xác nhận. Đây là một bước tiến quan trọng so với hồ sơ hoàn toàn bằng giấy, nhưng chưa đồng nghĩa với việc người học trực tiếp nắm giữ kết quả của mình.

Quyền truy cập vào một tài khoản và quyền nắm giữ một bằng chứng có thể sử dụng độc lập là hai điều khác nhau.

Khi bảng điểm chỉ tồn tại trên cổng thông tin của trường, sinh viên được phép xem dữ liệu trong phạm vi nhà trường cho phép. Nếu cần sử dụng bên ngoài, họ có thể phải tải xuống một bản PDF, yêu cầu cấp bản chính thức hoặc đề nghị trường gửi trực tiếp cho bên tiếp nhận.

Trong mô hình SSI, cơ sở giáo dục có thể cấp cho sinh viên một thực chứng chính thức. Thực chứng đó vẫn do trường phát hành và trường vẫn chịu trách nhiệm về nội dung, nhưng người học có thể lưu giữ trong ví định tín và chủ động sử dụng tại những nơi phù hợp.

Sự khác biệt có thể được hình dung qua mối quan hệ giữa tiền trong tài khoản và bản sao kê. Bản sao kê giúp người dùng nhìn thấy thông tin, nhưng không trao cho họ khả năng sử dụng giá trị được ghi nhận theo bất kỳ cách nào. Tương tự, một bản PDF tải từ cổng sinh viên chỉ là bản sao để đọc. Một thực chứng có thể mang theo được thiết kế để tiếp tục được kiểm tra và sử dụng ngoài hệ thống nơi nó được tạo ra.

Điều này không làm mất quyền quản lý dữ liệu gốc của nhà trường. Trường vẫn lưu hồ sơ đào tạo, xử lý điều chỉnh và thực hiện nghĩa vụ quản lý theo quy định. SSI bổ sung một lớp giúp kết quả đã được xác nhận có thể đồng hành cùng người học.

## Hồ sơ học tập suốt đời không phải là một cơ sở dữ liệu khổng lồ

Khi muốn kết nối dữ liệu học tập từ nhiều nguồn, một giải pháp thường được nghĩ đến là xây dựng một cơ sở dữ liệu trung tâm. Các trường học, trung tâm đào tạo và doanh nghiệp cùng gửi thông tin về một hệ thống chung, sau đó mỗi cá nhân truy cập hồ sơ thông qua một tài khoản duy nhất.

Mô hình tập trung có thể phù hợp trong một phạm vi quản lý xác định, nhưng trở nên phức tạp khi hành trình học tập vượt qua nhiều tổ chức và quốc gia. Một hệ thống muốn lưu giữ toàn bộ dữ liệu phải giải quyết những câu hỏi lớn: ai là đơn vị vận hành, tổ chức nào được quyền cập nhật, dữ liệu được giữ trong bao lâu và điều gì xảy ra nếu người học không còn muốn sử dụng nền tảng đó?

SSI không yêu cầu mọi dữ liệu phải được đưa vào cùng một kho lưu trữ.

Thay vào đó, mỗi tổ chức phát hành những thực chứng thuộc thẩm quyền của mình. Trường đại học cấp bằng và bảng điểm. Trung tâm đào tạo cấp chứng nhận hoàn thành khóa học. Doanh nghiệp xác nhận chương trình thực tập. Tổ chức nghề nghiệp cấp chứng chỉ chuyên môn. Người học nhận các thực chứng từ nhiều nguồn và quản lý chúng trong ví định tín.

Hồ sơ học tập suốt đời khi đó không phải là một bản ghi duy nhất do một tổ chức tạo ra. Nó là tập hợp những bằng chứng đáng tin cậy được tích lũy theo thời gian, trong đó mỗi bằng chứng vẫn gắn với tổ chức đã phát hành.

Các tiêu chuẩn về Hồ sơ người học toàn diện, hay Comprehensive Learner Record, đang được phát triển theo hướng này. 1EdTech mô tả CLR là một dạng hồ sơ có thể kiểm chứng, do người học sử dụng và kiểm soát, có khả năng ghi nhận khóa học, năng lực, kỹ năng, thành tích học thuật và các cột mốc tại nơi làm việc. Một hồ sơ có thể kết hợp nhiều thực chứng từ các tổ chức khác nhau để thể hiện quá trình phát triển của người học.

Nhờ cấu trúc đó, không một tổ chức nào phải nắm giữ toàn bộ lịch sử của Lan. Mỗi đơn vị chỉ chịu trách nhiệm về xác nhận của mình, trong khi Lan trở thành điểm kết nối giữa những phần khác nhau của hành trình học tập.


![Nhiều cơ sở giáo dục cùng tham gia hệ sinh thái thực chứng học tập liên thông](/blog/ho-so-hoc-tap-suot-doi-loi-ich-cua-mo-hinh-dinh-danh-tu-chu-doi-voi-nguoi-hoc/ebsi-blockchain-european-digital-education-1440.webp)

*Hình 3. Hồ sơ học tập suốt đời được hình thành từ thực chứng của nhiều tổ chức mà không cần tập trung toàn bộ dữ liệu vào một cơ sở dữ liệu duy nhất.*

## Từ tấm bằng cuối khóa đến quá trình phát triển năng lực liên tục

Bằng tốt nghiệp vẫn là một trong những xác nhận quan trọng nhất của hệ thống giáo dục. Nó cho biết người học đã hoàn thành một chương trình có cấu trúc, đáp ứng các yêu cầu học thuật và được một cơ sở có thẩm quyền công nhận.

Tuy nhiên, một tấm bằng không thể mô tả đầy đủ năng lực mà một người tích lũy trong suốt sự nghiệp.

Hai sinh viên tốt nghiệp cùng một ngành có thể lựa chọn các học phần khác nhau, thực hiện những dự án khác nhau và phát triển những thế mạnh khác nhau. Sau khi đi làm, một người có thể học thêm về quản lý, dữ liệu hoặc an toàn thông tin, trong khi người kia chuyển sang một lĩnh vực hoàn toàn mới.

Trong bối cảnh đó, kết quả học tập cần được ghi nhận ở nhiều cấp độ. Bên cạnh bằng chính quy có thể là chứng chỉ nghề nghiệp, chương trình đào tạo ngắn hạn, vi bằng, dự án, năng lực cụ thể hoặc kết quả đánh giá tại nơi làm việc.

Những thực chứng nhỏ hơn không nhất thiết cạnh tranh hoặc thay thế bằng đại học. Chúng bổ sung thêm độ phân giải cho hồ sơ của người học.

Một tấm bằng cử nhân công nghệ thông tin cho biết người học đã hoàn thành một chương trình rộng. Một vi bằng về an toàn ứng dụng có thể cho biết họ đã đáp ứng những tiêu chí cụ thể trong một lĩnh vực hẹp. Chứng nhận hoàn thành dự án tại doanh nghiệp có thể bổ sung bằng chứng về khả năng áp dụng kiến thức vào thực tế.

Open Badges 3.0 và Comprehensive Learner Record 2.0 được thiết kế để hỗ trợ việc ghi nhận các thành tích như kỹ năng, năng lực, bằng cấp và cột mốc nghề nghiệp dưới dạng có thể kiểm chứng. 1EdTech nhấn mạnh các hồ sơ này được xây dựng theo hướng người học kiểm soát và có thể chuyển giữa nơi phát hành, nơi lưu giữ và bên xác minh.

Qua thời gian, hồ sơ của người học không còn là một tấm ảnh chụp tại thời điểm tốt nghiệp. Nó trở thành một bản ghi liên tục về sự phát triển năng lực.

## Người học có thể xây dựng nhiều hồ sơ từ cùng một hành trình

Một hồ sơ học tập suốt đời không nhất thiết phải được chia sẻ nguyên vẹn trong mọi tình huống.

Khi Lan đăng ký chương trình cao học về tài chính, trường tiếp nhận có thể quan tâm đến bằng cử nhân, bảng điểm và các học phần nền tảng. Khi ứng tuyển vị trí phân tích dữ liệu, nhà tuyển dụng có thể chú ý nhiều hơn đến khóa học về dữ liệu, dự án thực hành và kinh nghiệm tại ngân hàng. Nếu Lan xin học bổng, cô có thể cần bổ sung thành tích nghiên cứu và hoạt động cộng đồng.

Các mục đích khác nhau cần những cách trình bày khác nhau.

Trong cách quản lý truyền thống, Lan thường phải tự tạo một bộ hồ sơ mới bằng cách sao chép tài liệu từ nhiều nguồn. Với SSI, ví định tín có thể giúp cô lựa chọn những thực chứng phù hợp và tạo ra một bản trình bày dành cho từng yêu cầu.

Điều này không có nghĩa người học được tự sửa hoặc sắp xếp lại nội dung do tổ chức phát hành. Lan không thể biến một khóa học ngắn hạn thành bằng đại học hoặc tự thêm kỹ năng chưa được xác nhận. Quyền của cô nằm ở việc quyết định bằng chứng nào được sử dụng trong từng bối cảnh.

Sự chủ động này đặc biệt quan trọng khi hồ sơ chứa nhiều thông tin hơn theo thời gian. Một người học suốt đời có thể tích lũy hàng chục hoặc hàng trăm kết quả từ nhiều nguồn. Việc gửi toàn bộ lịch sử cho mọi bên không chỉ thiếu hiệu quả mà còn làm gia tăng lượng dữ liệu cá nhân bị phát tán.

Hồ sơ học tập suốt đời chỉ thực sự phục vụ người học khi họ có thể chuyển từ câu hỏi “tôi đang có những giấy tờ gì?” sang câu hỏi “tôi cần chứng minh điều gì trong tình huống này?”.

## Chia sẻ đúng thông tin thay vì toàn bộ lịch sử

Quyền lựa chọn không chỉ liên quan đến việc chọn thực chứng nào. Trong những hệ thống hỗ trợ tiết lộ có chọn lọc, người học còn có thể chỉ cung cấp một phần thông tin cần thiết.

Ví dụ, một chương trình đào tạo có thể yêu cầu ứng viên chứng minh đã hoàn thành một số học phần tiên quyết. Trường tiếp nhận có thể không cần toàn bộ bảng điểm, bao gồm cả những môn không liên quan và kết quả mà người học không muốn chia sẻ.

Tương tự, một doanh nghiệp có thể chỉ cần xác nhận ứng viên sở hữu một chứng chỉ còn hiệu lực, thay vì nhận toàn bộ dữ liệu gắn với chứng chỉ đó.

Cách tiếp cận này giúp người học duy trì quyền riêng tư, nhưng cũng đem lại lợi ích cho tổ chức tiếp nhận. Khi chỉ thu thập dữ liệu cần thiết, trường học và doanh nghiệp giảm khối lượng thông tin phải lưu trữ, quản lý và bảo vệ.

European Digital Credentials for Learning cho phép người học nhận bằng, chứng chỉ đào tạo và vi bằng vào ví Europass hoặc một ví tương thích, sau đó sử dụng chúng khi ứng tuyển, học tiếp hoặc thực hiện thủ tục công nhận. Europass cũng cho phép tạo liên kết chia sẻ có thời hạn, qua đó người học có thể giới hạn khoảng thời gian bên thứ ba truy cập vào thông tin đã cung cấp.

Giá trị của cơ chế này không chỉ nằm ở sự thuận tiện. Nó thể hiện một nguyên tắc quan trọng: việc một tổ chức có nhu cầu xác minh không đồng nghĩa với việc tổ chức đó cần nhận và lưu giữ toàn bộ lịch sử học tập của cá nhân.


![Người học lựa chọn dữ liệu cần thiết để chia sẻ từ hồ sơ học tập số](/blog/ho-so-hoc-tap-suot-doi-loi-ich-cua-mo-hinh-dinh-danh-tu-chu-doi-voi-nguoi-hoc/selective-disclosure-private-data-sharing-1440.webp)

*Hình 4. Tiết lộ có chọn lọc giúp người học cung cấp đúng bằng chứng cho từng yêu cầu mà không phải chia sẻ toàn bộ lịch sử học tập.*

## Người học không phải bắt đầu lại mỗi khi chuyển đổi

Một trong những bất lợi lớn nhất của hồ sơ phân mảnh là người học thường phải bắt đầu lại khi chuyển sang một môi trường mới.

Khi đổi trường, họ xin lại bảng điểm. Khi ứng tuyển, họ tập hợp lại chứng chỉ. Khi chuyển nghề, họ cố gắng giải thích những kỹ năng từ công việc trước có liên quan như thế nào với vị trí mới. Khi quay lại học sau nhiều năm, một số tài khoản và tài liệu cũ có thể không còn dễ truy cập.

Hồ sơ học tập suốt đời tạo ra tính liên tục giữa những lần chuyển đổi đó.

Lan có thể dùng kết quả từ đại học để đăng ký khóa học nâng cao. Sau khi hoàn thành khóa học, cô bổ sung một thực chứng mới. Khi tham gia dự án tại doanh nghiệp, kinh nghiệm được xác nhận có thể tiếp tục làm phong phú hồ sơ. Mỗi giai đoạn không xóa bỏ giai đoạn trước mà được xây dựng trên những gì đã tích lũy.

Tính liên tục này đặc biệt có giá trị đối với người chuyển đổi nghề nghiệp.

Một người rời lĩnh vực tài chính để chuyển sang phân tích dữ liệu không bắt đầu từ con số không. Kiến thức về tài chính, kỹ năng phân tích, kinh nghiệm làm việc và những khóa đào tạo mới có thể được kết hợp thành một hồ sơ chứng minh năng lực giao thoa giữa hai lĩnh vực.

Hồ sơ truyền thống thường buộc cá nhân lựa chọn một vài dòng trong CV để diễn đạt quá trình ấy. Thực chứng không thay thế câu chuyện nghề nghiệp, nhưng cung cấp những bằng chứng đáng tin cậy để củng cố câu chuyện đó.

## Lợi ích lâu dài đối với người học

Lợi ích đầu tiên của mô hình này là **tính di động**. Người học có thể sử dụng kết quả ngoài hệ thống nơi chúng được tạo ra, thay vì phụ thuộc hoàn toàn vào cổng thông tin hoặc tài khoản của từng tổ chức.

Lợi ích thứ hai là **tính liên tục**. Các kết quả được tích lũy qua nhiều giai đoạn và không bị giới hạn bởi thời gian người học còn là sinh viên của một trường.

Lợi ích thứ ba là **khả năng kết hợp**. Thành tích học thuật, kỹ năng nghề nghiệp và kinh nghiệm tại nơi làm việc có thể cùng tạo nên một bức tranh phong phú hơn về năng lực của một người.

Lợi ích thứ tư là **quyền chủ động**. Người học có thể quyết định bằng chứng nào phù hợp với một cơ hội cụ thể, thay vì gửi nguyên vẹn một hồ sơ được thiết kế cho mục đích khác.

Cuối cùng là **khả năng tái sử dụng**. Một thực chứng đã được phát hành có thể tiếp tục phục vụ nhiều quy trình như học tiếp, xin việc, xin học bổng hoặc chứng minh điều kiện nghề nghiệp, miễn là nó còn hợp lệ và được bên tiếp nhận chấp nhận.

Những lợi ích này không biến người học thành bên tự quyết định giá trị của mọi thành tích. Trường học, doanh nghiệp và tổ chức nghề nghiệp vẫn xác định tiêu chuẩn công nhận. SSI trao cho người học quyền quản lý và sử dụng bằng chứng, chứ không trao quyền tự tạo ra bằng chứng.

## Giá trị đối với trường đại học không chỉ là giảm thủ tục

Trong bài viết trước, lợi ích vận hành của SSI đã được thể hiện qua khả năng giảm xác minh thủ công và hạn chế gian lận văn bằng. Với hồ sơ học tập suốt đời, giá trị chiến lược đối với trường đại học còn lớn hơn.

Trước hết, mô hình này giúp nhà trường mở rộng mối quan hệ với người học ra ngoài thời gian của một chương trình cấp bằng.

Một cựu sinh viên có thể quay lại trường sau ba năm để học chương trình quản lý, sau năm năm để cập nhật kỹ năng công nghệ và sau mười năm để tham gia một khóa đào tạo lãnh đạo. Mỗi kết quả mới được bổ sung vào hành trình mà người học đang quản lý.

Nhà trường khi đó không chỉ là nơi cấp một tấm bằng vào cuối khóa. Trường trở thành một đối tác học tập có thể tiếp tục cung cấp và xác nhận năng lực trong nhiều giai đoạn của sự nghiệp.

Thứ hai, thực chứng giúp trường mô tả giá trị đào tạo rõ ràng hơn. Bên cạnh tên chương trình và số tín chỉ, trường có thể ghi nhận kết quả đầu ra, năng lực đạt được, tiêu chí đánh giá hoặc những dự án quan trọng. Điều này giúp người học thể hiện tốt hơn những gì họ thực sự đã hoàn thành.

Thứ ba, hồ sơ có thể hỗ trợ những lộ trình học linh hoạt hơn. Người học có thể hoàn thành từng nhóm học phần, nhận vi bằng và tích lũy chúng hướng đến một chứng nhận lớn hơn nếu khung chương trình cho phép. Trường có thêm khả năng phục vụ những người không thể tham gia một chương trình dài liên tục nhưng vẫn muốn học theo từng giai đoạn.

Digital Credentials Consortium hiện tập hợp nhiều cơ sở giáo dục đại học trên thế giới để phát triển một hạ tầng chung, phân tán và đáng tin cậy cho việc phát hành, lưu giữ, hiển thị và xác minh thực chứng học thuật. Sự tham gia của các trường không đồng nghĩa mọi thành viên đều đã triển khai SSI trên toàn hệ thống, nhưng cho thấy thực chứng có tính di động và do người học kiểm soát đã trở thành một định hướng nghiêm túc của giáo dục đại học.

## Từ quản lý sinh viên đến đồng hành với người học suốt đời

Phần lớn hệ thống thông tin của trường đại học được thiết kế xoay quanh một vòng đời tương đối rõ ràng: tuyển sinh, nhập học, học tập, tốt nghiệp và trở thành cựu sinh viên.

Cách tổ chức này phù hợp với hoạt động quản lý, nhưng học tập suốt đời không vận hành theo một đường thẳng như vậy. Người học có thể rời trường rồi quay lại, học đồng thời tại nhiều nơi hoặc kết hợp đào tạo chính quy với học tập tại doanh nghiệp.

Để thích nghi, trường đại học cần chuyển từ tư duy quản lý một hồ sơ khép kín sang tư duy đóng góp vào một hành trình mở.

Nhà trường không cần nắm giữ toàn bộ lịch sử của người học. Trường chỉ cần phát hành những xác nhận có chất lượng trong phạm vi thẩm quyền của mình, sử dụng cấu trúc mà các hệ thống khác có thể hiểu và bảo đảm người học có thể tiếp tục sử dụng chúng trong tương lai.

Điều này cũng thay đổi cách đánh giá thành công của một hệ thống thực chứng. Thành công không chỉ nằm ở số lượng văn bằng được số hóa, mà còn ở việc người học có thể mang chúng sang ví khác hay không, có thể kết hợp với thực chứng từ tổ chức khác hay không và có thực sự sử dụng chúng trong các cơ hội học tập, nghề nghiệp hay không.

Một nền tảng chỉ hiển thị đẹp những thành tích do trường phát hành nhưng không cho người học sử dụng bên ngoài vẫn chủ yếu phục vụ hoạt động nội bộ. Hồ sơ học tập suốt đời đòi hỏi khả năng liên thông và tính di động ngay từ thiết kế.

## Những điều kiện để hồ sơ thực sự thuộc về người học

Trao thực chứng cho người học không đồng nghĩa với việc chuyển toàn bộ trách nhiệm kỹ thuật sang cho họ.

Nếu mất điện thoại đồng nghĩa với mất toàn bộ hồ sơ, mô hình sẽ không thể được áp dụng rộng rãi. Ví định tín cần có cơ chế sao lưu và phục hồi phù hợp, đồng thời vẫn bảo vệ người dùng khỏi việc người khác chiếm quyền truy cập.

Người học cũng phải hiểu mình đang nhận và chia sẻ điều gì. Một ứng dụng chứa nhiều thuật ngữ kỹ thuật, yêu cầu quản lý khóa mật mã phức tạp hoặc đưa ra những cảnh báo khó hiểu sẽ khiến quyền tự chủ chỉ tồn tại trên lý thuyết.

Bên cạnh trải nghiệm, khả năng liên thông là điều kiện cốt lõi. Thực chứng không nên chỉ hoạt động trong ứng dụng của một nhà cung cấp. Người học cần có khả năng chuyển sang một ví tương thích khác và tiếp tục sử dụng hồ sơ khi công nghệ hoặc nhu cầu của mình thay đổi.

Cuối cùng, hệ thống cần một khung quản trị rõ ràng để xác định tổ chức nào có thẩm quyền phát hành, thực chứng có giá trị trong phạm vi nào và cách xử lý sai sót hoặc thu hồi. Quyền kiểm soát của người học không thay thế trách nhiệm của cơ sở giáo dục đối với chất lượng và tính chính xác của kết quả đã cấp.

SSI chỉ tạo ra lợi ích lâu dài khi quyền của người học, khả năng sử dụng thực tế và trách nhiệm của tổ chức phát hành được thiết kế cùng nhau.

## Liên hệ với định hướng tại Việt Nam: xây dựng hệ sinh thái hồ sơ học tập suốt đời

Tại Việt Nam, định hướng phát triển học tập suốt đời và chuyển đổi số trong giáo dục đã được xác lập trong nhiều chính sách quan trọng, trong đó có:

- Quyết định 1373/QĐ-TTg (2021) về xây dựng xã hội học tập giai đoạn 2021–2030
- Quyết định 131/QĐ-TTg (2022) về tăng cường ứng dụng công nghệ thông tin và chuyển đổi số trong giáo dục
- Định hướng phát triển Cơ sở dữ liệu quốc gia về giáo dục và đào tạo do Bộ GD&ĐT triển khai
- Các chương trình thúc đẩy học tập suốt đời, kỹ năng số và công dân số

Trong bối cảnh đó, việc xây dựng hồ sơ học tập suốt đời cho người học Việt Nam đang dần trở thành một nhu cầu thực tiễn, không chỉ ở cấp chính sách mà cả ở cấp triển khai kỹ thuật.

Hiện nay, dữ liệu học tập tại Việt Nam vẫn đang phân tán giữa nhiều hệ thống: trường học, cơ sở đào tạo nghề, trung tâm ngoại ngữ, nền tảng học trực tuyến và doanh nghiệp. Người học thường phải tự tổng hợp lại khi cần chứng minh năng lực.

Việc áp dụng các mô hình như SSI và thực chứng số có thể kiểm chứng có thể đóng vai trò như một lớp hạ tầng trung gian, giúp:

- Kết nối dữ liệu học tập giữa các cơ sở giáo dục
- Giảm phụ thuộc vào giấy tờ và xác minh thủ công
- Tạo điều kiện cho công nhận kỹ năng ngoài hệ thống chính quy
- Hỗ trợ xây dựng hồ sơ học tập suốt đời thống nhất cho mỗi công dân

Trong dài hạn, nếu được triển khai đồng bộ, Việt Nam có thể tiến tới một mô hình trong đó:

- Người học sở hữu một ví hồ sơ học tập số
- Các cơ sở giáo dục và doanh nghiệp là bên phát hành thực chứng
- Nhà nước đóng vai trò thiết lập chuẩn và hạ tầng tin cậy

Điều này phù hợp với xu hướng quốc tế về digital credentials, verifiable credentials và learner-centric records, đồng thời hỗ trợ mục tiêu nâng cao chất lượng nguồn nhân lực trong nền kinh tế số.

## Kết luận

Học tập suốt đời đòi hỏi một hạ tầng ghi nhận thành tích có thể tồn tại lâu hơn một tài khoản sinh viên và rộng hơn hệ thống của một trường đại học.

Người học không nên phải xây dựng lại hồ sơ từ đầu mỗi khi chuyển trường, thay đổi công việc hoặc quay lại học tập. Những kết quả đã đạt được cần có khả năng đi cùng họ, được kết hợp với thành tích từ nhiều nguồn và được trình bày theo từng mục đích cụ thể.

Mô hình định danh tự chủ tạo ra nền tảng cho sự thay đổi đó. Mỗi trường học, tổ chức đào tạo hoặc doanh nghiệp vẫn chịu trách nhiệm về những gì mình xác nhận. Bên tiếp nhận vẫn quyết định bằng chứng nào được công nhận. Nhưng người học trở thành điểm kết nối giữa các quan hệ giáo dục khác nhau: trực tiếp nhận, quản lý và sử dụng những thực chứng đáng tin cậy về quá trình phát triển của mình.

Đối với trường đại học, đây không chỉ là một dự án số hóa hồ sơ. Đó là cơ hội chuyển từ việc quản lý sinh viên trong thời gian của một khóa học sang việc đồng hành, cung cấp và xác nhận năng lực trong suốt cuộc đời.

Tấm bằng đánh dấu một cột mốc quan trọng. Hồ sơ học tập suốt đời kể lại toàn bộ hành trình. Và SSI có thể trở thành hạ tầng giúp hành trình ấy thực sự đi cùng người học.

Đối với Việt Nam, đây không chỉ là một xu hướng công nghệ, mà còn là một hướng đi phù hợp với chiến lược xây dựng xã hội học tập và chuyển đổi số giáo dục.

## Tài liệu tham khảo
- [UNESCO (2020), *Embracing a culture of lifelong learning*](https://unesdoc.unesco.org/)

- [1EdTech Consortium – Comprehensive Learner Record (CLR)](https://www.1edtech.org/standards/clr)

- [1EdTech – Open Badges 3.0 Overview](https://www.1edtech.org/standards/badges)

- [European Commission – Europass Digital Credentials for Learning](https://europass.europa.eu/en/european-digital-credentials-learning)

- [Digital Credentials Consortium (MIT et al.)](https://digitalcredentials.mit.edu/)

- Chính phủ Việt Nam (2021), Quyết định 1373/QĐ-TTg về xây dựng xã hội học tập giai đoạn 2021–2030

- Chính phủ Việt Nam (2022), Quyết định 131/QĐ-TTg về chuyển đổi số trong giáo dục`,
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
