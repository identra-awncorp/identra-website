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

export const VIETNAM_IDENTITY_AUTHENTICATION_DRAFT_BLOG_ARTICLE_ID =
  'du-thao-moi-ve-dinh-danh-va-xac-thuc-co-hoi-nao-dang-mo-ra-cho-ssi-tai-viet-nam' as const;

const assetRoot = '/blog/du-thao-moi-ve-dinh-danh-va-xac-thuc-co-hoi-nao-dang-mo-ra-cho-ssi-tai-viet-nam';

export const VIETNAM_IDENTITY_AUTHENTICATION_DRAFT_BLOG_ARTICLE = {
  id: VIETNAM_IDENTITY_AUTHENTICATION_DRAFT_BLOG_ARTICLE_ID,
  slug: VIETNAM_IDENTITY_AUTHENTICATION_DRAFT_BLOG_ARTICLE_ID,
  publishedAt: '2026-09-10',
  modifiedAt: '2026-09-10',
  author: {
    type: 'Organization',
    name: 'Identra',
  },
  topics: ['identity', 'compliance', 'technology'],
  industries: ['government', 'technology', 'retail-ecommerce'],
  contentLocales: ['vi'],
  relatedArticleIds: [
    'tuong-lai-cua-xac-thuc-va-truy-xuat-nguon-goc-san-pham',
    'giai-bai-toan-niem-tin-du-lieu-de-phat-trien-kinh-te-so-kinh-te-ai',
    'dinh-danh-tu-chu-ssi-la-gi',
  ],
  coverImage: {
    src: `${assetRoot}/vietnam-ssi-infrastructure-cover-1440.webp`,
    srcSet: [
      `${assetRoot}/vietnam-ssi-infrastructure-cover-800.webp 800w`,
      `${assetRoot}/vietnam-ssi-infrastructure-cover-1440.webp 1440w`,
    ].join(', '),
    sizes: '(min-width: 1024px) 680px, (min-width: 768px) 55vw, 100vw',
    width: 1440,
    height: 810,
  },
  socialImage: {
    src: `${assetRoot}/${VIETNAM_IDENTITY_AUTHENTICATION_DRAFT_BLOG_ARTICLE_ID}-og.jpg`,
    width: 1200,
    height: 630,
    type: 'image/jpeg',
  },
  listing: {
    en: {
      title: 'Vietnam\'s New Identity and Authentication Draft: What Opportunities Are Emerging for SSI?',
      description: 'How Vietnam\'s draft rules on identity, authentication and product traceability could create a foundation for SSI infrastructure and verifiable data.',
      type: 'Digital identity',
      duration: '11 min read',
    },
    es: {
      title: 'Nuevo proyecto sobre identidad y autenticación: ¿Qué oportunidades abre para SSI en Vietnam?',
      description: 'Cómo el proyecto vietnamita sobre identidad, autenticación y trazabilidad puede sentar las bases de una infraestructura SSI y datos verificables.',
      type: 'Identidad digital',
      duration: '11 min de lectura',
    },
    ja: {
      title: 'ベトナムの新たな本人確認・認証草案：SSIにどのような機会が開かれるのか',
      description: '本人確認、認証、製品トレーサビリティに関するベトナムの草案が、SSI基盤と検証可能なデータの土台をどう築き得るかを考察します。',
      type: 'デジタルID',
      duration: '読了11分',
    },
    de: {
      title: 'Vietnams neuer Entwurf zu Identität und Authentifizierung: Welche Chancen entstehen für SSI?',
      description: 'Wie Vietnams Entwurf zu Identität, Authentifizierung und Rückverfolgbarkeit eine Grundlage für SSI-Infrastruktur und verifizierbare Daten schaffen könnte.',
      type: 'Digitale Identität',
      duration: '11 Min. Lesezeit',
    },
    vi: {
      title: 'Dự thảo mới về định danh và xác thực: Cơ hội nào đang mở ra cho SSI tại Việt Nam?',
      description: 'Dự thảo về định danh, xác thực và truy xuất nguồn gốc đang mở ra hành lang mới cho DID, bằng chứng số và hạ tầng SSI tại Việt Nam.',
      type: 'Định danh số',
      duration: 'Đọc trong 11 phút',
    },
  } satisfies Record<Locale, BlogArticleListingCopy>,
  images: {},
  content: {
    vi: {
      title: 'Dự thảo mới về định danh và xác thực: Cơ hội nào đang mở ra cho SSI tại Việt Nam?',
      description: 'Dự thảo về định danh, xác thực và truy xuất nguồn gốc đang mở ra hành lang mới cho DID, bằng chứng số và hạ tầng SSI tại Việt Nam.',
      excerpt: 'Sự xuất hiện của DID, khóa mật mã, bằng chứng số và tiết lộ dữ liệu tối thiểu trong một dự thảo về hạ tầng quốc gia đang tạo ra những tín hiệu đáng chú ý cho SSI tại Việt Nam.',
      category: 'Định danh số',
      tags: ['Định danh số', 'SSI tại Việt Nam', 'DID', 'Chính sách số', 'Chuỗi khối quốc gia'],
      readTimeMinutes: 11,
      ui: {
        publishedLabel: 'Xuất bản ngày',
        authorRole: 'Đội ngũ nội dung Identra',
        tableOfContents: 'Mục lục',
        openTableOfContents: 'Mở mục lục bài viết',
        closeTableOfContents: 'Đóng mục lục bài viết',
        ctaTitle: 'Sẵn sàng xây dựng hạ tầng dữ liệu có thể kiểm chứng',
        ctaDescription: 'Khám phá cách Identra giúp tổ chức phát hành, lưu giữ và xác minh dữ liệu đáng tin cậy trong các quy trình thực tế.',
        ctaButtonLabel: 'Trải nghiệm demo',
      },
      tableOfContents: [
        {
          id: 'khi-cong-nghe-bat-dau-co-mot-vi-tri-trong-the-che',
          label: 'Khi công nghệ bắt đầu có một vị trí trong thể chế',
          level: 2,
        },
        {
          id: 'tu-ha-tang-quoc-gia-den-mot-lop-thi-truong-moi',
          label: 'Từ hạ tầng quốc gia đến một lớp thị trường mới',
          level: 2,
        },
        {
          id: 'tu-tin-hieu-chinh-sach-den-co-hoi-xay-dung-ha-tang',
          label: 'Từ tín hiệu chính sách đến cơ hội xây dựng hạ tầng',
          level: 2,
        },
        {
          id: 'tai-lieu-tham-khao',
          label: 'Tài liệu tham khảo',
          level: 2,
        },
      ] satisfies readonly BlogArticleTableOfContentsItem[],
      markdown: `Trong một lĩnh vực còn khá mới tại Việt Nam như Định danh tự chủ (SSI), đôi khi những tín hiệu đáng chú ý nhất không đến từ một sản phẩm mới hay một dự án thử nghiệm, mà từ cách các khái niệm công nghệ bắt đầu xuất hiện trong những văn bản định hình hạ tầng số.

Trong Dự thảo 2 của Nghị định về hoạt động định danh, xác thực và truy xuất nguồn gốc sản phẩm, hàng hóa đang xuất hiện một số khái niệm khá đáng chú ý: **mã định danh phi tập trung (DID), chứng chỉ số, bằng chứng số, khóa công khai, khóa bí mật và xác minh dữ liệu bằng mật mã**.

Nếu chỉ nhìn vào từng thuật ngữ riêng lẻ, đây chưa phải điều gì quá đặc biệt. DID hay mật mã khóa công khai đã tồn tại trong giới công nghệ từ lâu. Nhưng khi những khái niệm này xuất hiện cùng nhau trong một kiến trúc gồm phát hành thông tin, tạo bằng chứng và xác minh dữ liệu, câu chuyện trở nên đáng quan tâm hơn rất nhiều.

Dự thảo định nghĩa DID là một mã duy nhất gắn với tổ chức, cá nhân hoặc sản phẩm, hàng hóa, được sử dụng cho việc tạo lập chứng chỉ số, bằng chứng số cũng như hoạt động định danh và xác thực phi tập trung.

Đồng thời, văn bản cũng phân biệt khá rõ giữa bên phát hành chứng chỉ số, bên tạo lập và cung cấp bằng chứng số và bên sử dụng bằng chứng số. Đáng chú ý hơn, bằng chứng số có thể chứa cơ chế tiết lộ dữ liệu tối thiểu, còn bên yêu cầu thông tin chỉ được yêu cầu những dữ liệu cần thiết cho mục đích hợp pháp.

Với những người quan tâm và theo dõi sự phát triển của lĩnh vực Định danh tự chủ (SSI) thì đây là một cấu trúc rất quen thuộc.

Sự xuất hiện đồng thời của những thành phần này cho thấy cách tiếp cận đối với định danh và xác thực dữ liệu tại Việt Nam đang bắt đầu tiến gần hơn tới những nguyên tắc mà SSI theo đuổi trong nhiều năm: dữ liệu có nguồn phát hành rõ ràng, có thể được chủ thể sử dụng và có khả năng kiểm chứng độc lập bằng mật mã.

## Khi công nghệ bắt đầu có một vị trí trong thể chế

Một trong những rào cản lớn nhất đối với SSI không nằm ở khả năng công nghệ, mà ở việc thiếu hành lang pháp lý đủ rõ để xác định giá trị, trách nhiệm và cách sử dụng dữ liệu được phát hành, xác minh bằng mật mã.

Ngày nay, chúng ta đã có thể ký dữ liệu, xác minh nguồn phát hành, tạo mã định danh không phụ thuộc hoàn toàn vào một cơ sở dữ liệu duy nhất và chỉ tiết lộ những thông tin cần thiết cho bên xác minh. Nhưng để các cơ chế này đi vào nền kinh tế, cần trả lời những câu hỏi nền tảng: ai có quyền phát hành dữ liệu, ai chịu trách nhiệm khi dữ liệu sai, bằng chứng điện tử có giá trị đến đâu và hệ thống khác có thể dựa vào đó để ra quyết định hay không?

Khi những câu hỏi này chưa được giải quyết, các thử nghiệm riêng lẻ khó phát triển thành một hệ sinh thái. Dự thảo hiện tại bắt đầu đặt nền móng cho một số câu trả lời.

Văn bản không chỉ đề cập đến việc tạo và xác minh dữ liệu, mà còn quy định rằng dữ liệu được xác thực thông qua Nền tảng chuỗi khối quốc gia có thể có giá trị pháp lý tương đương dữ liệu gốc trong thời gian và phạm vi do chủ sở hữu quyết định, theo quy định pháp luật.

Điều này tạo ra một cầu nối giữa **dữ liệu có thể kiểm chứng về mặt kỹ thuật** và **dữ liệu có thể sử dụng trong các quy trình thực tế**. Khi bằng chứng số được xác minh độc lập và đưa trực tiếp vào quy trình nghiệp vụ, dữ liệu không chỉ được lưu trữ hay trao đổi, mà còn có thể được hệ thống tự động kiểm tra và sử dụng.

Trong truy xuất nguồn gốc, cơ chế này có thể áp dụng cho chứng nhận chất lượng, xuất xứ, hợp quy và các thông tin gắn với vòng đời sản phẩm. Về lâu dài, cùng cách tiếp cận có thể mở rộng sang những loại dữ liệu khác cần độ tin cậy cao trong nền kinh tế số.

## Từ hạ tầng quốc gia đến một lớp thị trường mới

Một chi tiết khác trong dự thảo đặc biệt đáng chú ý với các doanh nghiệp công nghệ là cách các lớp ứng dụng phía trên hạ tầng được hình dung.

Theo dự thảo, các ứng dụng, dịch vụ số và hệ thống thông tin phát triển trên Nền tảng chuỗi khối quốc gia có thể được triển khai theo mô hình hợp tác công tư. Nhà nước quản lý tiêu chuẩn kỹ thuật, an toàn và an ninh dữ liệu, trong khi tổ chức và doanh nghiệp có thể tham gia phát triển, cung cấp và vận hành ứng dụng trong phạm vi được phê duyệt.

Nếu một hạ tầng dùng chung về định danh và dữ liệu có thể kiểm chứng được hình thành, doanh nghiệp không nhất thiết phải xây lại lớp hạ tầng đó. Giá trị có thể nằm ở những sản phẩm được xây **phía trên** nó.

Đó có thể là ví định tín, công cụ phát hành và xác minh dữ liệu, API và SDK dành cho doanh nghiệp, hệ thống quản lý khóa, giải pháp tích hợp với phần mềm hiện có hoặc những ứng dụng chuyên biệt cho từng ngành.

Một cấu trúc thị trường như vậy không khác nhiều so với những gì từng xảy ra với nhiều lớp hạ tầng khác của Internet.

Doanh nghiệp ngày nay không cần tự xây mạng viễn thông để tạo một ứng dụng gọi xe. Không cần tự xây hệ thống thanh toán liên ngân hàng để tạo một ví điện tử. Giá trị kinh tế lớn thường xuất hiện khi một lớp hạ tầng đủ ổn định để hàng nghìn sản phẩm khác có thể được xây phía trên.

Nếu định danh và dữ liệu có thể kiểm chứng dần trở thành một lớp hạ tầng tương tự, cơ hội của SSI tại Việt Nam cũng có thể nằm ở đó.

Không phải trong một “ứng dụng SSI” duy nhất, mà trong cả một lớp phần mềm phục vụ phát hành, lưu giữ, xác minh và sử dụng những dữ liệu đáng tin cậy.

Nếu hạ tầng nền tảng được hình thành và được công nhận, cùng với các quy định pháp lý rõ ràng, doanh nghiệp có thể phát triển nhiều lớp sản phẩm phục vụ những nhu cầu cụ thể. Đó có thể là các công cụ giúp doanh nghiệp và cơ quan nhà nước phát hành, lưu trữ, chia sẻ và xác minh dữ liệu trong những quy trình thực tế.

Khi đó, SSI có thể dần chuyển từ một khái niệm kỹ thuật thành một lớp năng lực hạ tầng phục vụ nhiều ngành: giáo dục, tài chính, y tế, logistics, thương mại điện tử và quản trị chuỗi cung ứng.

Đây cũng là lúc các doanh nghiệp công nghệ trong nước có thể tham gia sâu hơn vào thị trường, không chỉ với vai trò tích hợp giải pháp, mà còn bằng việc phát triển các giao thức, công cụ và dịch vụ phù hợp với nhu cầu thực tế của Việt Nam.

## Từ tín hiệu chính sách đến cơ hội xây dựng hạ tầng

Điều đáng chú ý nhất từ dự thảo lần này có lẽ nằm ở hướng phát triển mà nó mở ra.

Phạm vi trước mắt là định danh, xác thực và truy xuất nguồn gốc sản phẩm, hàng hóa. Đây cũng là một môi trường phù hợp để những cơ chế như DID, chứng chỉ số và bằng chứng số chứng minh giá trị của mình, bởi mỗi sản phẩm đều đi qua nhiều chủ thể và mang theo nhiều loại thông tin cần được xác nhận trong suốt vòng đời.

Khi nhà sản xuất, đơn vị kiểm định, cơ quan quản lý, doanh nghiệp logistics, nhà phân phối và người tiêu dùng cùng cần dựa vào một chuỗi dữ liệu đáng tin cậy, khả năng xác minh nguồn phát hành và tính toàn vẹn của thông tin trở nên đặc biệt quan trọng.

Nhưng giá trị của những công nghệ này không bị giới hạn trong truy xuất nguồn gốc.

Một khi hạ tầng, tiêu chuẩn và kinh nghiệm triển khai đã hình thành, cùng cách tiếp cận có thể được sử dụng cho nhiều loại thông tin khác: bằng cấp và chứng chỉ nghề nghiệp, giấy phép, tư cách doanh nghiệp, hồ sơ y tế, thông tin phục vụ KYC/KYB hay những chứng nhận được sử dụng trong giao dịch xuyên biên giới.

Đó là nơi tiềm năng dài hạn của SSI tại Việt Nam trở nên đáng chú ý.

Thay vì mỗi ngành xây dựng một hệ thống khép kín và mỗi doanh nghiệp lại phải tự tìm cách xác minh dữ liệu nhận được, một lớp hạ tầng chung cho dữ liệu có thể kiểm chứng có thể giúp các hệ thống trao đổi thông tin với nhau trên một nền tảng tin cậy hơn.

Khi đó, thị trường không chỉ cần hạ tầng. Nó cần những chiếc ví đủ dễ sử dụng, những bộ công cụ đủ đơn giản để doanh nghiệp tích hợp, những dịch vụ phát hành và xác minh phù hợp với từng lĩnh vực, những giải pháp quản lý khóa đủ an toàn và những sản phẩm đủ tốt để biến các tiêu chuẩn kỹ thuật thành trải nghiệm mà người dùng bình thường có thể sử dụng.

Đây chính là khoảng không dành cho các doanh nghiệp công nghệ.

Vài năm trước, DID, dữ liệu có thể kiểm chứng hay tiết lộ dữ liệu tối thiểu tại Việt Nam chủ yếu được biết đến trong một cộng đồng tương đối nhỏ theo dõi blockchain, mật mã. Sự xuất hiện của chúng trong một dự thảo liên quan tới hạ tầng quốc gia cho thấy bối cảnh đang thay đổi.

Nếu những nguyên tắc này tiếp tục được cụ thể hóa bằng tiêu chuẩn kỹ thuật, hành lang pháp lý và các hệ thống thực tế, Việt Nam có thể bắt đầu hình thành một hệ sinh thái mà trong đó dữ liệu không chỉ được chia sẻ, mà còn có thể được **xác minh và tin cậy ngay từ thiết kế**.

Đối với SSI, đây là một cơ hội đáng chú ý.

Và đối với những kỹ sư, startup hay doanh nghiệp đang theo dõi lĩnh vực này, có lẽ câu hỏi đáng quan tâm trong vài năm tới sẽ không còn chỉ là SSI có thể được ứng dụng tại Việt Nam hay không, mà là:

**làm thế nào để đón đầu làn sóng khi những mảnh ghép đầu tiên của hạ tầng bắt đầu xuất hiện?**

## Tài liệu tham khảo

1. **Bộ Công an — Hồ sơ Dự thảo Nghị định quy định về hoạt động định danh, xác thực, truy xuất nguồn gốc sản phẩm, hàng hóa (Dự thảo 2).** Hồ sơ được công bố lấy ý kiến từ ngày 31/3 đến 10/4/2026, gồm dự thảo Nghị định, dự thảo Tờ trình, bảng so sánh – thuyết minh và báo cáo rà soát. [Hồ sơ dự thảo tại Bộ Công an](https://bocongan.gov.vn/chinh-sach-phap-luat/lay-y-kien-du-thao/ho-so-du-thao-nghi-dinh-quy-dinh-ve-hoat-dong-dinh-danh-xac-thuc-truy-xuat-nguon-goc-san-pham-hang-hoa-1774862205?type=dang-lay-y-kien)

2. **Bộ Tư pháp — Hồ sơ thẩm định Dự thảo Nghị định quy định về hoạt động định danh, xác thực, truy xuất nguồn gốc sản phẩm, hàng hóa.** Công bố ngày 4/5/2026. [Hồ sơ thẩm định tại Bộ Tư pháp](https://www.moj.gov.vn/portal/tin-tuc/chi-tiet/ho-so-tham-inh-du-thao-nghi-inh-quy-inh-ve-hoat-ong-inh-danh-xac-thuc-truy-xuat-nguon-goc-san-pham-hang-hoa-tei8kh4f26.html)

3. **Thủ tướng Chính phủ — Quyết định 826/QĐ-TTg ngày 11/5/2026.** Phê duyệt Chương trình Đề án phát triển ứng dụng dữ liệu về dân cư, định danh và xác thực điện tử phục vụ chuyển đổi số quốc gia giai đoạn 2026–2030, tầm nhìn đến năm 2035. [Quyết định 826/QĐ-TTg](https://vanban.chinhphu.vn/?classid=0&docid=218056&pageid=27160)

4. **World Wide Web Consortium (W3C) — Decentralized Identifiers (DIDs) v1.0.** W3C Recommendation, 19/7/2022. Đặc tả nền tảng cho kiến trúc, mô hình dữ liệu và cơ chế phân giải mã định danh phi tập trung. [W3C Decentralized Identifiers (DIDs) v1.0](https://www.w3.org/TR/did-core/)

5. **World Wide Web Consortium (W3C) — Verifiable Credentials Data Model v2.0.** W3C Recommendation, 15/5/2025. Đặc tả mô hình dữ liệu cho thực chứng có thể kiểm chứng và mô hình tương tác giữa bên phát hành, bên nắm giữ và bên xác minh. [W3C Verifiable Credentials Data Model v2.0](https://www.w3.org/TR/vc-data-model-2.0/)`,
    },
  },
} as const satisfies StructuredBlogArticle;
