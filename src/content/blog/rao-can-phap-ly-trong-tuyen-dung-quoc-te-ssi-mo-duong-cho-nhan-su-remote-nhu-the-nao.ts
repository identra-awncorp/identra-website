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

export const INTERNATIONAL_HIRING_SSI_BLOG_ARTICLE_ID =
  'rao-can-phap-ly-trong-tuyen-dung-quoc-te-ssi-mo-duong-cho-nhan-su-remote-nhu-the-nao' as const;

const assetRoot =
  '/blog/rao-can-phap-ly-trong-tuyen-dung-quoc-te-ssi-mo-duong-cho-nhan-su-remote-nhu-the-nao';

export const INTERNATIONAL_HIRING_SSI_BLOG_ARTICLE = {
  id: INTERNATIONAL_HIRING_SSI_BLOG_ARTICLE_ID,
  slug: INTERNATIONAL_HIRING_SSI_BLOG_ARTICLE_ID,
  publishedAt: '2026-07-27',
  modifiedAt: '2026-07-27',
  author: {
    type: 'Organization',
    name: 'Identra',
  },
  topics: ['identity', 'privacy', 'technology'],
  industries: ['recruitment'],
  contentLocales: ['vi'],
  relatedArticleIds: [
    'dinh-danh-tu-chu-ssi-la-gi',
    'ssi-trong-giao-duc-giai-phap-so-hoa-bang-cap-va-xac-minh-nang-luc',
    'tu-thi-diem-cua-mit-den-lan-song-so-hoa-bang-cap-khong-the-dao-nguoc',
  ],
  coverImage: {
    src: `${assetRoot}/cross-border-remote-work-cover-1440.webp`,
    srcSet: [
      `${assetRoot}/cross-border-remote-work-cover-800.webp 800w`,
      `${assetRoot}/cross-border-remote-work-cover-1440.webp 1440w`,
    ].join(', '),
    sizes: '(min-width: 1024px) 680px, (min-width: 768px) 55vw, 100vw',
    width: 1440,
    height: 810,
  },
  socialImage: {
    src: `${assetRoot}/${INTERNATIONAL_HIRING_SSI_BLOG_ARTICLE_ID}-og.jpg`,
    width: 1200,
    height: 630,
    type: 'image/jpeg',
  },
  listing: {
    en: {
      title: 'Legal barriers in international hiring: How SSI opens the way for remote talent',
      description: 'How verifiable identity, credentials and selective disclosure can reduce legal and trust friction when EU companies hire remote talent in Vietnam.',
      type: 'Recruitment',
      duration: '22 min read',
    },
    es: {
      title: 'Barreras legales en la contratación internacional: cómo SSI abre camino al talento remoto',
      description: 'Cómo la identidad verificable, las credenciales y la divulgación selectiva reducen la fricción legal al contratar talento remoto en Vietnam.',
      type: 'Contratación',
      duration: '22 min de lectura',
    },
    ja: {
      title: '国際採用の法的障壁：SSIはリモート人材への道をどう開くのか',
      description: '検証可能な本人確認、実証、選択的開示が、EU企業によるベトナムのリモート人材採用に伴う法的・信頼上の負担をどう減らすかを解説します。',
      type: '採用',
      duration: '読了22分',
    },
    de: {
      title: 'Rechtliche Hürden bei internationaler Einstellung: Wie SSI Remote-Talenten den Weg ebnet',
      description: 'Wie prüfbare Identitäten, Nachweise und selektive Offenlegung rechtliche Hürden bei der Einstellung von Remote-Talenten in Vietnam reduzieren.',
      type: 'Recruiting',
      duration: '22 Min. Lesezeit',
    },
    vi: {
      title: 'Rào cản pháp lý trong tuyển dụng quốc tế: SSI mở đường cho nhân sự remote như thế nào?',
      description: 'Cách danh tính, thực chứng và tiết lộ có chọn lọc giúp doanh nghiệp EU giảm rào cản pháp lý khi tuyển dụng nhân sự từ xa tại Việt Nam.',
      type: 'Tuyển dụng',
      duration: 'Đọc trong 22 phút',
    },
  } satisfies Record<Locale, BlogArticleListingCopy>,
  images: {
    [`${assetRoot}/cross-border-remote-work-cover-1440.webp`]: responsiveImage(
      'cross-border-remote-work-cover',
    ),
    [`${assetRoot}/verifiable-credentials-hiring-1440.webp`]: responsiveImage(
      'verifiable-credentials-hiring',
    ),
    [`${assetRoot}/eu-digital-identity-wallet-1440.webp`]: responsiveImage(
      'eu-digital-identity-wallet',
    ),
    [`${assetRoot}/selective-disclosure-hiring-1440.webp`]: responsiveImage(
      'selective-disclosure-hiring',
    ),
  } satisfies Record<string, BlogArticleImage>,
  content: {
    vi: {
      title: 'Rào cản pháp lý trong tuyển dụng quốc tế: SSI mở đường cho nhân sự remote như thế nào?',
      description: 'Phân tích cách SSI hỗ trợ xác minh danh tính, năng lực và lý lịch trong tuyển dụng Việt Nam–EU mà vẫn tôn trọng GDPR cùng chủ quyền pháp lý.',
      excerpt: 'Internet đã đưa việc làm vượt qua biên giới, nhưng hạ tầng niềm tin và pháp lý vẫn bị chia cắt. SSI có thể giúp hai bên thu hẹp khoảng cách đó bằng những bằng chứng số có nguồn gốc rõ ràng.',
      seoTitle: 'Rào cản pháp lý khi tuyển dụng quốc tế với SSI',
      seoDescription: 'SSI giúp doanh nghiệp EU xác minh danh tính, năng lực và lý lịch của nhân sự remote tại Việt Nam, đồng thời giảm thu thập dữ liệu nhạy cảm.',
      category: 'Tuyển dụng',
      tags: ['Tuyển dụng quốc tế', 'Nhân sự remote', 'SSI', 'GDPR', 'Thực chứng'],
      readTimeMinutes: 22,
      ui: {
        publishedLabel: 'Xuất bản ngày',
        authorRole: 'Đội ngũ nội dung Identra',
        tableOfContents: 'Mục lục',
        openTableOfContents: 'Mở mục lục bài viết',
        closeTableOfContents: 'Đóng mục lục bài viết',
        ctaTitle: 'Xây dựng quy trình tuyển dụng đáng tin cậy cùng Identra',
        ctaDescription: 'Khám phá cách xác minh danh tính và năng lực bằng thực chứng, đồng thời giảm việc sao chép dữ liệu cá nhân trong tuyển dụng.',
        ctaButtonLabel: 'Trải nghiệm demo',
      },
      tableOfContents: [
        {
          id: 'viec-lam-da-vuot-qua-bien-gioi-nhung-ha-tang-niem-tin-thi-chua',
          label: 'Việc làm đã vượt qua biên giới',
          level: 2,
        },
        {
          id: 'mot-ho-so-tuyen-dung-quoc-te-khong-chi-co-bang-cap',
          label: 'Hồ sơ tuyển dụng không chỉ có bằng cấp',
          level: 2,
        },
        {
          id: 'ssi-bien-thong-tin-tu-khai-thanh-bang-chung-co-the-kiem-tra',
          label: 'Từ thông tin tự khai đến bằng chứng',
          level: 2,
        },
        {
          id: 'xac-minh-danh-tinh-la-nen-tang-cua-toan-bo-quan-he-phap-ly',
          label: 'Danh tính là nền tảng pháp lý',
          level: 2,
        },
        {
          id: 'xac-minh-ly-lich-tu-phap-ma-khong-bien-tuyen-dung-thanh-giam-sat',
          label: 'Xác minh lý lịch tư pháp có giới hạn',
          level: 2,
        },
        {
          id: 'ssi-co-the-ho-tro-gdpr-nhu-the-nao',
          label: 'SSI có thể hỗ trợ GDPR như thế nào?',
          level: 2,
        },
        {
          id: 'trong-truong-hop-xau-nhat-ssi-tao-ra-mot-chuoi-bang-chung-phap-ly',
          label: 'Chuỗi bằng chứng pháp lý',
          level: 2,
        },
        {
          id: 'vai-tro-cua-truong-dai-hoc-trong-thi-truong-lao-dong-toan-cau',
          label: 'Vai trò của trường đại học',
          level: 2,
        },
        {
          id: 'mot-goc-nhin-moi-cho-nha-lap-phap',
          label: 'Một góc nhìn mới cho nhà lập pháp',
          level: 2,
        },
        {
          id: 'ket-luan-tu-khoang-trong-niem-tin-den-mot-hanh-lang-tuyen-dung-so',
          label: 'Từ khoảng trống niềm tin đến hành lang số',
          level: 2,
        },
        {
          id: 'tai-lieu-tham-khao',
          label: 'Tài liệu tham khảo',
          level: 2,
        },
      ] satisfies BlogArticleTableOfContentsItem[],
      markdown: `Một doanh nghiệp tại Đức có thể tìm thấy một kỹ sư phần mềm phù hợp đang sống tại Việt Nam, tổ chức phỏng vấn qua video, giao bài kiểm tra trực tuyến và thống nhất chế độ làm việc mà không cần hai bên gặp mặt trực tiếp. Internet đã làm cho quá trình tìm kiếm và đánh giá nhân tài gần như không còn bị giới hạn bởi khoảng cách địa lý.

Nhưng trước khi ký hợp đồng, doanh nghiệp vẫn phải trả lời một loạt câu hỏi khó hơn nhiều. Ứng viên có thực sự là người đã tham gia phỏng vấn không? Bằng cấp và chứng chỉ có xác thực không? Lịch sử làm việc trong CV có đúng không? Người này có thuộc trường hợp bị cấm đảm nhiệm một công việc nhất định hay có tiền án liên quan đến vị trí cần tuyển không? Doanh nghiệp phải ký loại hợp đồng nào, khấu trừ thuế ở đâu và sẽ dựa vào hệ thống pháp luật nào nếu xảy ra gian lận hoặc tranh chấp?

Trong tuyển dụng nội địa, một phần những câu hỏi này có thể được giải quyết thông qua giấy tờ và dịch vụ mà doanh nghiệp đã quen thuộc. Khi ứng viên ở một quốc gia khác, nhà tuyển dụng phải làm việc với những hệ thống định danh, giáo dục, tư pháp, thuế và pháp luật hoàn toàn khác. Các bản scan có thể được gửi qua Internet trong vài giây, nhưng việc xác định ý nghĩa và giá trị pháp lý của chúng vẫn có thể mất nhiều tuần.

Đó là **khoảng trống niềm tin và pháp lý** trong tuyển dụng xuyên biên giới.

Định danh tự chủ, hay **Self-Sovereign Identity (SSI)**, không thể xóa bỏ sự khác biệt giữa pháp luật Việt Nam và pháp luật của các quốc gia thành viên Liên minh châu Âu. Tuy nhiên, SSI có thể trở thành một hạ tầng niềm tin số, giúp các cơ quan nhà nước, trường đại học và doanh nghiệp phát hành những thực chứng mà ứng viên trực tiếp nắm giữ, còn nhà tuyển dụng có thể kiểm tra gần như tức thời.

Giá trị của mô hình không chỉ nằm ở xác minh bằng cấp. Khi được triển khai đầy đủ, SSI có thể hỗ trợ toàn bộ quy trình tuyển dụng: xác minh danh tính, năng lực, kinh nghiệm và lý lịch tư pháp; giảm việc sao chép dữ liệu cá nhân; tự động điền và ký hợp đồng; cung cấp dữ liệu đầu vào đáng tin cậy cho xử lý thuế; đồng thời tạo ra một chuỗi bằng chứng rõ ràng nếu quan hệ lao động phát sinh tranh chấp.


![SSI tạo cầu nối niềm tin số cho công dân và tổ chức khi làm việc xuyên biên giới](/blog/rao-can-phap-ly-trong-tuyen-dung-quoc-te-ssi-mo-duong-cho-nhan-su-remote-nhu-the-nao/cross-border-remote-work-cover-1440.webp)

*Hình 1. Thực chứng có thể đi cùng mỗi cá nhân qua biên giới và giúp các tổ chức kiểm tra bằng chứng mà không phụ thuộc vào bản scan hoặc quy trình xác minh thủ công.*

## Việc làm đã vượt qua biên giới, nhưng hạ tầng niềm tin thì chưa

Làm việc từ xa không chỉ là làm việc tại nhà cho một doanh nghiệp trong cùng thành phố. Ngày nay nó bao gồm những quan hệ trong đó người lao động, người sử dụng lao động, khách hàng và hệ thống thanh toán nằm tại các quốc gia khác nhau. Năm 2026, Tổ chức Lao động Quốc tế đã ban hành hướng dẫn thống kê riêng về lao động từ xa quốc tế, cho thấy hình thức này đang trở thành một đối tượng cần được các quốc gia nhận diện và quản lý rõ ràng hơn.

Tuy nhiên, các hệ thống pháp luật và hành chính vẫn chủ yếu được tổ chức theo lãnh thổ. Danh tính do một quốc gia xác lập. Bằng cấp được công nhận trong một hệ thống giáo dục cụ thể. Lý lịch tư pháp do cơ quan có thẩm quyền tại từng nước quản lý. Thuế, bảo hiểm xã hội, luật lao động và thẩm quyền xét xử cũng được xác định dựa trên nơi cư trú, nơi làm việc, nơi thành lập doanh nghiệp và nhiều yếu tố khác.

Vì vậy, tuyển dụng xuyên biên giới không đơn thuần là đưa quy trình tuyển dụng nội địa lên Internet. Doanh nghiệp phải kết nối những hệ thống tin cậy vốn không được thiết kế để làm việc trực tiếp với nhau.

Một doanh nghiệp EU tuyển dụng nhân sự tại Việt Nam có thể thuê dịch vụ kiểm tra lý lịch để xác minh từng thông tin. Đơn vị này lại phải liên hệ với trường học, doanh nghiệp cũ hoặc cơ quan có thẩm quyền. Hồ sơ đi qua nhiều tổ chức, được chuyển đổi giữa nhiều định dạng và tạo ra nhiều bản sao. Quy trình càng có nhiều trung gian, chi phí càng cao và nguy cơ sử dụng dữ liệu sai mục đích càng lớn.

SSI thay đổi cấu trúc đó. Thay vì để mỗi nhà tuyển dụng tự tìm đến từng nguồn dữ liệu, các nguồn có thẩm quyền phát hành bằng chứng cho chính cá nhân. Ứng viên trở thành bên mang bằng chứng từ nơi phát hành đến nơi cần sử dụng.

## Một hồ sơ tuyển dụng quốc tế không chỉ có bằng cấp

Bằng tốt nghiệp là một phần quan trọng của hồ sơ, nhưng hiếm khi đủ để doanh nghiệp đưa ra quyết định tuyển dụng và giao quyền truy cập vào tài sản, dữ liệu hoặc hệ thống nội bộ.

Trước hết, doanh nghiệp phải xác minh **nhân thân**. Họ cần biết người đang tham gia quy trình tuyển dụng có phải người mang tên trong văn bằng và hợp đồng hay không. Tùy vào vị trí và nghĩa vụ pháp lý, doanh nghiệp có thể cần xác nhận họ tên pháp lý, ngày sinh, quốc tịch, nơi cư trú, số giấy tờ định danh hoặc quyền đại diện cho một tổ chức.

Tiếp theo là **năng lực và lịch sử nghề nghiệp**. Bằng cấp, chứng chỉ, giấy phép hành nghề, thời gian làm việc và vai trò tại doanh nghiệp cũ đều có thể ảnh hưởng đến quyết định tuyển dụng. CV giúp ứng viên kể lại hành trình nghề nghiệp, nhưng phần lớn nội dung vẫn là thông tin do ứng viên tự khai.

Đối với một số vị trí, doanh nghiệp còn phải xem xét **lý lịch tư pháp** hoặc bằng chứng về tư cách tốt. Điều này có thể cần thiết khi công việc liên quan đến trẻ em, tài chính, an ninh, dữ liệu nhạy cảm hoặc một nghề nghiệp được quản lý. Tuy nhiên, đây cũng là nhóm dữ liệu đặc biệt nhạy cảm và không thể được thu thập tùy ý.

Cuối cùng là các thông tin phục vụ **hợp đồng, thuế và bảo hiểm** như địa chỉ cư trú, mã số thuế, tình trạng cư trú thuế, thông tin tài khoản nhận lương và cơ chế tham gia bảo hiểm xã hội. Những dữ liệu này không quyết định ứng viên có đủ năng lực hay không, nhưng quyết định quan hệ lao động có thể được thiết lập và vận hành hợp pháp hay không.

SSI có thể đưa các nhóm thông tin này về cùng một mô hình trao đổi: tổ chức có thẩm quyền phát hành, người lao động nắm giữ và doanh nghiệp xác minh.

## SSI biến thông tin tự khai thành bằng chứng có thể kiểm tra

Trong mô hình thực chứng của W3C, **bên phát hành** đưa ra một hoặc nhiều xác nhận, **người nắm giữ** nhận và quản lý chúng, còn **bên xác minh** kiểm tra trước khi sử dụng thông tin. Verifiable Credentials 2.0 đã trở thành tiêu chuẩn W3C vào tháng 5 năm 2025, cung cấp cơ chế biểu diễn thực chứng theo cách phần mềm có thể xử lý, bảo vệ tính toàn vẹn và hỗ trợ các ứng dụng như danh tính hay bằng cấp.

Đối với một ứng viên tại Việt Nam, hồ sơ trong tương lai có thể bao gồm một thực chứng danh tính do cơ quan hoặc nhà cung cấp định danh được công nhận phát hành, bằng tốt nghiệp từ trường đại học, chứng chỉ nghề nghiệp từ tổ chức chuyên môn, xác nhận lịch sử làm việc từ doanh nghiệp cũ và phiếu lý lịch tư pháp từ cơ quan nhà nước.

Những thực chứng này không phải là thông tin do ứng viên tự tạo. Mỗi thực chứng vẫn mang thẩm quyền và trách nhiệm của tổ chức phát hành. Ứng viên chỉ trực tiếp lưu giữ, lựa chọn và trình bày chúng.

Khi tuyển dụng, doanh nghiệp không nhất thiết phải nhận toàn bộ hồ sơ ngay từ đầu. Họ có thể gửi một yêu cầu xác minh cụ thể. Ứng viên xem doanh nghiệp cần thông tin gì, vì mục đích nào và đồng ý cung cấp những bằng chứng phù hợp. Hệ thống sau đó kiểm tra chữ ký, nguồn phát hành, trạng thái hiệu lực và sự ràng buộc giữa thực chứng với người đang trình bày.

Cách tiếp cận này tạo ra một dạng **niềm tin tức thời** (Instant Trust). Tuy nhiên, cần hiểu đúng: “tức thời” ở đây chỉ nằm ở khả năng kiểm tra kỹ thuật. Doanh nghiệp có thể biết ngay bằng chứng có thật, có bị chỉnh sửa hay không và đến từ đâu, nhưng điều đó không đồng nghĩa mọi bằng chứng đều mặc nhiên được chấp nhận hoặc có giá trị pháp lý trong mọi hệ thống, đặc biệt là tại EU.

Nói cách khác, SSI giúp xác minh nhanh và chính xác hơn, còn việc công nhận giá trị của bằng chứng vẫn thuộc về pháp luật và chính sách của từng quốc gia hoặc tổ chức.


![Bên phát hành, người nắm giữ và bên xác minh trao đổi thực chứng có thể kiểm tra bằng mật mã](/blog/rao-can-phap-ly-trong-tuyen-dung-quoc-te-ssi-mo-duong-cho-nhan-su-remote-nhu-the-nao/verifiable-credentials-hiring-1440.webp)

*Hình 2. Ứng viên trực tiếp nắm giữ thực chứng từ nguồn có thẩm quyền và trình bày cho nhà tuyển dụng, còn hệ thống xác minh nguồn phát hành, tính toàn vẹn và trạng thái hiệu lực.*

## Xác minh danh tính là nền tảng của toàn bộ quan hệ pháp lý

Một tấm bằng đại học sẽ không có nhiều ý nghĩa nếu doanh nghiệp không biết người đang sử dụng bằng có thực sự là chủ thể của tấm bằng đó hay không. Vì vậy, xác minh danh tính không chỉ là một bước hành chính trong tuyển dụng. Nó là nền tảng để liên kết ứng viên với toàn bộ bằng cấp, hợp đồng, nghĩa vụ và hành vi phát sinh sau này.

Trong một quy trình SSI, thực chứng danh tính có thể được sử dụng để chứng minh những thuộc tính cần thiết mà không buộc ứng viên gửi nguyên bản hộ chiếu hoặc căn cước cho mọi bộ phận và nhà cung cấp. Doanh nghiệp có thể xác nhận họ tên pháp lý, độ tuổi, quốc tịch hoặc nơi cư trú từ một nguồn đáng tin cậy, sau đó ràng buộc danh tính đó với hồ sơ năng lực và chữ ký trên hợp đồng.

Liên minh châu Âu đang đi theo hướng này thông qua Khung định danh số châu Âu. Quy định 2024/1183 thiết lập European Digital Identity Wallet, cho phép cá nhân sử dụng dữ liệu định danh và các chứng thực điện tử về thuộc tính. Quy định cũng yêu cầu việc sử dụng ví là tự nguyện, hạn chế nhà cung cấp ví thu thập dữ liệu sử dụng không cần thiết và yêu cầu tách biệt dữ liệu của ví với các dịch vụ khác.


![Ví định danh số giúp cá nhân sử dụng thuộc tính đã xác minh trong nhiều dịch vụ tại châu Âu](/blog/rao-can-phap-ly-trong-tuyen-dung-quoc-te-ssi-mo-duong-cho-nhan-su-remote-nhu-the-nao/eu-digital-identity-wallet-1440.webp)

*Hình 3. Ví định danh số châu Âu cho thấy xu hướng chuyển từ gửi bản sao giấy tờ sang trình bày dữ liệu định danh và thuộc tính có thể xác minh bằng máy.*

Một ứng viên tại Việt Nam chưa mặc nhiên có European Digital Identity Wallet do một quốc gia EU cấp. Tuy nhiên, mô hình của EU cho thấy định hướng pháp lý đang chuyển từ việc yêu cầu bản sao giấy tờ sang sử dụng danh tính và thuộc tính có thể xác minh bằng máy. Để thực chứng từ Việt Nam được chấp nhận rộng rãi, hai bên cần thống nhất về tổ chức phát hành, mức bảo đảm danh tính, tiêu chuẩn kỹ thuật và khung công nhận.

Giá trị quan trọng nhất của danh tính đã xác minh xuất hiện khi quan hệ lao động gặp sự cố. Nếu có hành vi gian lận, đánh cắp tài sản, chiếm đoạt dữ liệu hoặc vi phạm hợp đồng, doanh nghiệp không chỉ có một địa chỉ email và hồ sơ trực tuyến. Họ có bằng chứng liên kết hành vi với một cá nhân pháp lý cụ thể, cùng với địa chỉ, hợp đồng và lịch sử xác minh.

Điều này giúp doanh nghiệp gửi thông báo chính thức, khởi kiện dân sự hoặc trình báo hành vi có dấu hiệu vi phạm pháp luật cho cơ quan có thẩm quyền tại Việt Nam. Tuy nhiên, SSI không tự tạo ra thẩm quyền xét xử và không bảo đảm một bản án nước ngoài sẽ tự động được thi hành. Các thủ tục tương trợ tư pháp, tống đạt, công nhận và thi hành phán quyết vẫn phải tuân theo Bộ luật Tố tụng dân sự, điều ước quốc tế hoặc nguyên tắc có đi có lại. Việt Nam có khuôn khổ pháp luật cho việc tương trợ tư pháp dân sự và công nhận phán quyết nước ngoài, nhưng mỗi vụ việc vẫn phải đáp ứng các điều kiện pháp lý cụ thể.

SSI không thay thế cơ quan tư pháp. Nó giải quyết một vấn đề xảy ra trước đó: **xác định chính xác ai là bên đã giao kết và thực hiện giao dịch**.

## Xác minh lý lịch tư pháp mà không biến tuyển dụng thành giám sát

Lý lịch tư pháp là một trong những nội dung nhạy cảm nhất của quá trình tuyển dụng. Doanh nghiệp có thể có lợi ích chính đáng trong việc kiểm tra một ứng viên cho vị trí đặc biệt, nhưng không có nghĩa là nhà tuyển dụng được yêu cầu ứng viên cung cấp toàn bộ lịch sử tư pháp.

Theo Điều 10 GDPR, việc xử lý dữ liệu liên quan đến bản án hình sự và hành vi phạm tội chỉ được thực hiện dưới sự kiểm soát của cơ quan công quyền hoặc khi được pháp luật Liên minh hay pháp luật quốc gia thành viên cho phép, kèm theo những biện pháp bảo vệ thích hợp. Một cơ sở dữ liệu toàn diện về tiền án chỉ được duy trì dưới sự kiểm soát của cơ quan chính thức.

Điều này có nghĩa doanh nghiệp EU không thể sử dụng SSI như một con đường để né tránh GDPR. Nếu pháp luật của quốc gia thành viên không cho phép kiểm tra lý lịch tư pháp cho vị trí đang tuyển, việc ứng viên có thể cung cấp thực chứng không khiến hoạt động xử lý trở nên hợp pháp.

Thực tế thực thi cho thấy rủi ro này không chỉ mang tính lý thuyết. Cơ quan bảo vệ dữ liệu Tây Ban Nha từng xử phạt một tổ chức vì yêu cầu chứng nhận lý lịch tư pháp mà không có căn cứ pháp lý phù hợp theo Điều 6 và Điều 10 GDPR.

Giá trị của SSI nằm ở việc giúp quy trình kiểm tra, khi được pháp luật cho phép, trở nên có mục đích và giới hạn hơn. Thay vì yêu cầu ứng viên gửi toàn bộ phiếu lý lịch tư pháp và lưu một bản sao vô thời hạn, hệ thống có thể yêu cầu một bằng chứng hẹp hơn, chẳng hạn xác nhận không tồn tại án tích thuộc nhóm liên quan đến vị trí tại một thời điểm nhất định.

Trong một số trường hợp, doanh nghiệp chỉ cần biết ứng viên đáp ứng điều kiện chứ không cần biết toàn bộ nội dung phía sau. Thực chứng cũng có thể có thời hạn, được kiểm tra trạng thái và không tiếp tục được sử dụng ngoài mục đích đã nêu.

Tại Việt Nam, cơ sở dữ liệu lý lịch tư pháp là tài sản quốc gia và được quản lý bởi Trung tâm Lý lịch tư pháp quốc gia cùng các cơ quan có thẩm quyền. Luật Lý lịch tư pháp quy định việc lập, cập nhật và cấp Phiếu lý lịch tư pháp, đồng thời yêu cầu cơ sở dữ liệu phải được bảo vệ chặt chẽ và lưu trữ lâu dài.

Trong tương lai, một phiếu hoặc xác nhận tư pháp có thể được phát hành dưới dạng thực chứng cho chính công dân. Khi đó, ứng viên không phải trao quyền truy cập trực tiếp vào cơ sở dữ liệu tư pháp cho doanh nghiệp nước ngoài. Họ nhận bằng chứng từ cơ quan Việt Nam và trình bày trong phạm vi pháp luật cho phép.

Cần phân biệt mô hình này với ECRIS-TCN của EU. ECRIS-TCN giúp cơ quan có thẩm quyền xác định quốc gia thành viên nào đang giữ thông tin kết án đối với công dân nước thứ ba. Nó không phải một cơ sở dữ liệu để doanh nghiệp tự do tra cứu và cũng không tự chứa toàn bộ lịch sử tư pháp của một công dân Việt Nam tại Việt Nam.

## SSI có thể hỗ trợ GDPR như thế nào?

GDPR yêu cầu dữ liệu phải được xử lý đúng mục đích, giới hạn ở mức cần thiết và không được lưu giữ lâu hơn thời gian phục vụ mục đích xử lý. Mọi hoạt động xử lý cũng phải có một căn cứ pháp lý phù hợp.

Trong tuyển dụng truyền thống, doanh nghiệp thường thu thập nhiều dữ liệu từ sớm vì không biết chính xác sau này sẽ cần gì. Hộ chiếu, bảng điểm, phiếu lý lịch tư pháp và chứng chỉ được tải lên cùng một hệ thống, ngay cả khi phần lớn ứng viên không vượt qua vòng đầu tiên.

SSI cho phép doanh nghiệp thiết kế quy trình theo từng giai đoạn. Ở vòng sàng lọc, họ chỉ yêu cầu bằng chứng về kỹ năng hoặc trình độ tối thiểu. Khi ứng viên tiến sâu hơn, hệ thống mới yêu cầu danh tính đầy đủ hoặc thông tin phục vụ hợp đồng. Dữ liệu tư pháp chỉ được yêu cầu khi vị trí và pháp luật thực sự cho phép.

Khả năng tiết lộ có chọn lọc còn giúp ứng viên chứng minh một điều kiện mà không phải cung cấp toàn bộ tài liệu. Ví dụ, nhà tuyển dụng có thể nhận bằng chứng ứng viên có chứng chỉ còn hiệu lực hoặc đã tốt nghiệp trình độ cần thiết mà không nhất thiết nhận mã sinh viên, ngày sinh và toàn bộ bảng điểm.

Nhờ đó, doanh nghiệp có thể giảm số bản sao tài liệu nhạy cảm, giới hạn quyền truy cập và lưu kết quả kiểm tra thay vì giữ nguyên hồ sơ gốc trong mọi trường hợp. Đây là những khả năng phù hợp với nguyên tắc bảo vệ dữ liệu ngay từ thiết kế.


![Ứng viên chỉ chia sẻ những thuộc tính cần thiết thay vì toàn bộ hồ sơ cá nhân](/blog/rao-can-phap-ly-trong-tuyen-dung-quoc-te-ssi-mo-duong-cho-nhan-su-remote-nhu-the-nao/selective-disclosure-hiring-1440.webp)

*Hình 4. Tiết lộ có chọn lọc giúp nhà tuyển dụng xác minh đúng điều kiện cần thiết, trong khi ứng viên không phải trao toàn bộ giấy tờ và dữ liệu nhạy cảm.*

## Trong trường hợp xấu nhất, SSI tạo ra một chuỗi bằng chứng pháp lý

Phần lớn giá trị của xác minh danh tính thường không được nhìn thấy khi quan hệ lao động diễn ra thuận lợi. Nó trở nên rõ ràng khi có hành vi gian lận, rò rỉ dữ liệu, chiếm đoạt tài sản, vi phạm quyền sở hữu trí tuệ hoặc tranh chấp về nghĩa vụ hợp đồng.

Nếu doanh nghiệp chỉ biết ứng viên qua một email, một tài khoản mạng xã hội và các bản scan không được xác minh, họ có thể gặp khó khăn ngay từ bước xác định người phải chịu trách nhiệm. Tên có thể là giả, địa chỉ có thể không tồn tại và tài liệu có thể thuộc về người khác.

Một quy trình dựa trên SSI có thể tạo ra một chuỗi liên kết giữa danh tính pháp lý, thực chứng nghề nghiệp, chữ ký điện tử, hợp đồng và những hành vi được thực hiện trong hệ thống doanh nghiệp. Chuỗi bằng chứng này giúp doanh nghiệp chứng minh danh tính pháp lý của người lao động trong hợp đồng, những điều khoản nào được chấp thuận và quyền truy cập nào đã được cấp.

Trong trường hợp nghiêm trọng, doanh nghiệp có cơ sở rõ ràng hơn để yêu cầu cơ quan có thẩm quyền tại Việt Nam hỗ trợ, nộp đơn khởi kiện hoặc trình báo hành vi có dấu hiệu hình sự. Việc biết chính xác danh tính và nơi cư trú của bên liên quan cũng hỗ trợ tống đạt văn bản và thực hiện những thủ tục pháp lý tiếp theo.

Dù vậy, SSI không bảo đảm doanh nghiệp sẽ thắng kiện hoặc thu hồi được thiệt hại. Thẩm quyền của tòa án, luật áp dụng, việc công nhận phán quyết và tương trợ tư pháp vẫn là các vấn đề riêng của hệ thống luật pháp từng quốc gia.

Lợi ích này cũng vận hành theo chiều ngược lại. Người lao động có thể xác minh pháp nhân đang tuyển dụng, người có quyền ký và tài khoản thanh toán. Nếu doanh nghiệp vi phạm nghĩa vụ, ứng viên có bằng chứng rõ ràng hơn về bên sử dụng lao động, hợp đồng và cam kết đã được đưa ra.

Một hạ tầng niềm tin tốt phải bảo vệ cả hai bên, không chỉ giảm rủi ro cho doanh nghiệp.

## Vai trò của trường đại học trong thị trường lao động toàn cầu

Đối với các trường đại học Việt Nam, tuyển dụng nhân sự quốc tế làm thay đổi ý nghĩa của việc số hóa bằng cấp. Một tấm bằng không chỉ cần được quản lý tốt trong hệ thống quốc gia mà còn phải có khả năng được một doanh nghiệp nước ngoài hiểu và kiểm tra.

Nếu trường phát hành thực chứng theo tiêu chuẩn mở, sinh viên có thể sử dụng bằng mà không yêu cầu nhà tuyển dụng truy cập một cổng tra cứu bằng tiếng Việt hoặc gửi email cho phòng đào tạo. Thực chứng có thể chứa thông tin có cấu trúc về trình độ, chương trình học và tổ chức phát hành, giúp hệ thống tuyển dụng xử lý tự động hơn.

Nhà trường cũng có thể phát hành bảng điểm, vi chứng nhận, kết quả dự án và xác nhận thực tập. Những bằng chứng này giúp sinh viên chứng minh năng lực chi tiết hơn trước nhà tuyển dụng quốc tế.

Tuy nhiên, các trường không nên xây dựng một ví hoặc định dạng riêng chỉ hoạt động trong hệ sinh thái của mình. Giá trị xuyên biên giới chỉ xuất hiện khi thực chứng có thể được chuyển sang ví khác, được kiểm tra bởi phần mềm khác và được đặt trong một khung tin cậy mà bên nước ngoài có thể hiểu.

Vì vậy, phát hành thực chứng không chỉ là dự án công nghệ thông tin. Nó là một phần trong chiến lược quốc tế hóa, dịch vụ cựu sinh viên và khả năng kết nối chương trình đào tạo với thị trường lao động toàn cầu.

## Một góc nhìn mới cho nhà lập pháp

Để SSI thực sự hỗ trợ tuyển dụng Việt Nam–EU, thị trường không thể chỉ dựa vào sáng kiến riêng lẻ của các công ty công nghệ. Các nhà lập pháp và cơ quan quản lý cần xác định loại thực chứng nào có giá trị, ai được phép phát hành và bên tiếp nhận có thể dựa vào chúng trong phạm vi nào.

Ở tầng danh tính, Việt Nam cần cơ chế để thực chứng danh tính được phát hành với mức bảo đảm rõ ràng và có thể được các bên nước ngoài kiểm tra mà không phải truy cập trực tiếp vào cơ sở dữ liệu dân cư.

Ở tầng giáo dục, cơ quan quản lý cần xây dựng danh mục tin cậy để xác nhận trường nào có quyền cấp loại văn bằng nào. Ở tầng tư pháp, việc phát hành bằng chứng phải bảo đảm dữ liệu không bị sử dụng ngoài mục đích được pháp luật cho phép. Ở tầng thuế, các xác nhận về mã số và tình trạng cư trú cần có cấu trúc mà hệ thống bên ngoài có thể hiểu.

Nhà lập pháp cũng cần quy định rõ trách nhiệm của ví, bên phát hành và bên xác minh; cơ chế sửa sai, đình chỉ và thu hồi; yêu cầu lưu giữ kết quả xác minh; cùng giá trị chứng cứ của thực chứng và chữ ký điện tử khi xảy ra tranh chấp.

EU đã bắt đầu xây dựng một khuôn khổ như vậy thông qua eIDAS 2.0, European Digital Identity Wallet và các quy định về chứng thực điện tử thuộc tính. Việt Nam không nhất thiết phải sao chép nguyên trạng mô hình của EU, nhưng cần hướng đến khả năng tương thích nếu muốn công dân và doanh nghiệp tham gia sâu hơn vào nền kinh tế số xuyên biên giới.

Cơ hội lớn nhất không nằm ở việc đưa mọi dữ liệu vào một hệ thống trung tâm. Nó nằm ở việc cho phép mỗi cơ quan phát hành những xác nhận thuộc thẩm quyền của mình, trong khi công dân có thể sử dụng chúng an toàn tại nhiều quốc gia và dịch vụ.

## Kết luận: từ khoảng trống niềm tin đến một hành lang tuyển dụng số

Tuyển dụng nhân sự remote xuyên biên giới đang mở ra cơ hội lớn cho doanh nghiệp EU và người lao động Việt Nam. Doanh nghiệp tiếp cận được nguồn nhân lực rộng hơn, còn người lao động có thể tham gia thị trường quốc tế mà không phải di chuyển khỏi nơi sinh sống.

Nhưng để cơ hội ấy phát triển bền vững, quy trình tuyển dụng không thể tiếp tục dựa chủ yếu vào niềm tin dành cho những bản scan và lời khai trong CV.

Doanh nghiệp cần biết ứng viên là ai, bằng cấp và kinh nghiệm có xác thực không, việc kiểm tra tư pháp có được pháp luật cho phép không, hợp đồng được ký bởi đúng người không và dữ liệu thuế có đáng tin cậy không. Trong trường hợp xấu nhất, họ cũng cần một chuỗi bằng chứng đủ rõ để yêu cầu cơ quan có thẩm quyền hỗ trợ.

SSI cung cấp một kiến trúc cho toàn bộ nhu cầu đó. Cơ quan nhà nước, trường học và doanh nghiệp phát hành thực chứng. Ứng viên trực tiếp nắm giữ và trình bày. Nhà tuyển dụng kiểm tra bằng máy, thu thập đúng dữ liệu cần thiết và sử dụng kết quả để tự động hóa những phần phù hợp của quy trình.

Mô hình không tự động giải quyết mọi rào cản pháp lý. Lý lịch tư pháp vẫn bị giới hạn bởi GDPR và luật quốc gia. Hợp đồng vẫn phải tuân theo những quy định bắt buộc. Thuế vẫn phụ thuộc vào nơi cư trú, nơi làm việc và hiệp định song phương. Tranh chấp vẫn cần tòa án, trọng tài hoặc cơ quan có thẩm quyền.

Nhưng SSI biến những quy trình đó từ việc xử lý các bản sao khó xác minh thành việc xử lý những bằng chứng có nguồn gốc rõ ràng.

Khoảng cách địa lý đã được Internet thu hẹp. Bước tiếp theo là thu hẹp khoảng cách về danh tính, pháp lý và niềm tin. Với một khung quản trị phù hợp, SSI có thể trở thành hạ tầng giúp tuyển dụng nhân sự từ Việt Nam vào thị trường EU trở nên đơn giản, minh bạch và an toàn hơn, gần với trải nghiệm tuyển dụng nội địa nhưng vẫn tôn trọng chủ quyền pháp lý và quyền dữ liệu của mỗi cá nhân.

## Tài liệu tham khảo

* World Wide Web Consortium. *Verifiable Credentials Data Model và Verifiable Credentials 2.0*.
* European Parliament and Council. *Regulation (EU) 2016/679 – General Data Protection Regulation*.
* European Data Protection Board. *Data protection basics; lawful processing; criminal-conviction data*.
* European Parliament and Council. *Regulation (EU) 2024/1183 establishing the European Digital Identity Framework*.
* European Parliament and Council. *Regulation (EU) No 910/2014 on electronic identification and trust services*.
* European Parliament and Council. *Regulation (EC) No 593/2008 on the law applicable to contractual obligations – Rome I*.
* European Parliament and Council. *Directive (EU) 2019/1152 on transparent and predictable working conditions*.
* European Commission. *European Criminal Records Information System và ECRIS-TCN*.
* European Union. *Income taxes abroad and double taxation*.
* International Labour Organization. *Guidelines on international labour mobility and international remote work*.
* Quốc hội Việt Nam. *Luật Giao dịch điện tử số 20/2023/QH15*.
* Quốc hội Việt Nam. *Luật Lý lịch tư pháp số 28/2009/QH12*.
* Quốc hội Việt Nam. *Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15*.
* Quốc hội Việt Nam. *Bộ luật Tố tụng dân sự số 92/2015/QH13*.
* Bộ Tư pháp, Bộ Ngoại giao và Tòa án nhân dân tối cao. *Hướng dẫn tương trợ tư pháp trong lĩnh vực dân sự*.`,
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
