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

export const PRODUCT_TRACEABILITY_BLOG_ARTICLE_ID =
  'tuong-lai-cua-xac-thuc-va-truy-xuat-nguon-goc-san-pham' as const;

const assetRoot = '/blog/tuong-lai-cua-xac-thuc-va-truy-xuat-nguon-goc-san-pham';

export const PRODUCT_TRACEABILITY_BLOG_ARTICLE = {
  id: PRODUCT_TRACEABILITY_BLOG_ARTICLE_ID,
  slug: PRODUCT_TRACEABILITY_BLOG_ARTICLE_ID,
  publishedAt: '2026-08-03',
  modifiedAt: '2026-08-03',
  author: {
    type: 'Organization',
    name: 'Identra',
  },
  topics: ['identity', 'security', 'privacy'],
  industries: ['retail-ecommerce', 'marketplaces'],
  contentLocales: ['vi'],
  relatedArticleIds: [
    'ssi-blockchain-va-tuong-lai-xuat-khau-hang-hoa-viet-nam-sang-eu',
    'dinh-danh-tu-chu-ssi-la-gi',
    'vuot-xa-super-app-ky-nguyen-ultra-app',
  ],
  coverImage: {
    src: `${assetRoot}/verifiable-supply-chain-cover-1440.webp`,
    srcSet: [
      `${assetRoot}/verifiable-supply-chain-cover-800.webp 800w`,
      `${assetRoot}/verifiable-supply-chain-cover-1440.webp 1440w`,
    ].join(', '),
    sizes: '(min-width: 1024px) 680px, (min-width: 768px) 55vw, 100vw',
    width: 1440,
    height: 810,
  },
  socialImage: {
    src: `${assetRoot}/${PRODUCT_TRACEABILITY_BLOG_ARTICLE_ID}-og.jpg`,
    width: 1200,
    height: 630,
    type: 'image/jpeg',
  },
  listing: {
    en: {
      title: 'The Future of Product Authentication and Traceability',
      description: 'How verifiable credentials can turn supply-chain claims into evidence that people and software can independently check.',
      type: 'Supply chain',
      duration: '16 min read',
    },
    es: {
      title: 'El futuro de la autenticación y la trazabilidad de productos',
      description: 'Cómo las credenciales verificables convierten las afirmaciones de la cadena de suministro en evidencias comprobables.',
      type: 'Cadena de suministro',
      duration: '16 min de lectura',
    },
    ja: {
      title: '製品認証とトレーサビリティの未来',
      description: '検証可能なクレデンシャルにより、サプライチェーン上の主張を人とソフトウェアが確認できる証拠へ変える方法を解説します。',
      type: 'サプライチェーン',
      duration: '読了16分',
    },
    de: {
      title: 'Die Zukunft von Produktauthentifizierung und Rückverfolgbarkeit',
      description: 'Wie überprüfbare Nachweise Aussagen in der Lieferkette in unabhängig prüfbare Belege verwandeln können.',
      type: 'Lieferkette',
      duration: '16 Min. Lesezeit',
    },
    vi: {
      title: 'Tương lai của xác thực và truy xuất nguồn gốc sản phẩm, hàng hóa: Không chỉ nhìn thấy, mà còn có thể kiểm chứng',
      description: 'Truy xuất nguồn gốc chỉ cho biết dữ liệu được công bố ở đâu. Thực chứng giúp xác định ai đã phát hành, dữ liệu có toàn vẹn và còn hiệu lực hay không.',
      type: 'Chuỗi cung ứng',
      duration: 'Đọc trong 16 phút',
    },
  } satisfies Record<Locale, BlogArticleListingCopy>,
  images: {
    [`${assetRoot}/verifiable-supply-chain-cover-1440.webp`]: responsiveImage(
      'verifiable-supply-chain-cover',
    ),
    [`${assetRoot}/product-credential-verification-1440.webp`]: responsiveImage(
      'product-credential-verification',
    ),
    [`${assetRoot}/supply-chain-trust-network-1440.webp`]: responsiveImage(
      'supply-chain-trust-network',
    ),
    [`${assetRoot}/cryptographic-product-verification-1440.webp`]: responsiveImage(
      'cryptographic-product-verification',
    ),
  } satisfies Record<string, BlogArticleImage>,
  content: {
    vi: {
      title: 'Tương lai của xác thực và truy xuất nguồn gốc sản phẩm, hàng hóa: Không chỉ nhìn thấy, mà còn có thể kiểm chứng',
      description: 'Truy xuất nguồn gốc chỉ cho biết dữ liệu được công bố ở đâu. Thực chứng giúp xác định ai đã phát hành, dữ liệu có toàn vẹn và còn hiệu lực hay không.',
      excerpt: 'Mã QR giúp tìm thấy thông tin, nhưng chưa chứng minh thông tin đó đáng tin. Chuỗi cung ứng có thể kiểm chứng gắn mỗi tuyên bố với bên phát hành và bằng chứng mà phần mềm có thể tự kiểm tra.',
      category: 'Chuỗi cung ứng',
      tags: ['Chuỗi cung ứng', 'Truy xuất nguồn gốc', 'Thực chứng', 'SSI'],
      readTimeMinutes: 16,
      ui: {
        publishedLabel: 'Xuất bản ngày',
        authorRole: 'Đội ngũ nội dung Identra',
        tableOfContents: 'Mục lục',
        openTableOfContents: 'Mở mục lục bài viết',
        closeTableOfContents: 'Đóng mục lục bài viết',
        ctaTitle: 'Xây dựng chuỗi cung ứng có thể kiểm chứng',
        ctaDescription: 'Khám phá cách Identra giúp tổ chức phát hành và kiểm tra thực chứng bằng mật mã trong nhiều hệ thống.',
        ctaButtonLabel: 'Trải nghiệm demo',
      },
      tableOfContents: [
        {
          id: 'vi-sao-truy-xuat-nguon-goc-van-phu-thuoc-nhieu-vao-niem-tin',
          label: 'Vì sao truy xuất nguồn gốc vẫn phụ thuộc vào niềm tin?',
          level: 2,
        },
        {
          id: 'tu-thong-tin-ve-san-pham-den-bang-chung-ve-san-pham',
          label: 'Từ thông tin đến bằng chứng về sản phẩm',
          level: 2,
        },
        {
          id: 'moi-mat-xich-xac-nhan-phan-ma-minh-chiu-trach-nhiem',
          label: 'Mỗi mắt xích xác nhận phần mình chịu trách nhiệm',
          level: 2,
        },
        {
          id: 'mot-san-pham-duoc-kiem-chung-nhu-the-nao',
          label: 'Một sản phẩm được kiểm chứng như thế nào?',
          level: 2,
        },
        {
          id: 'khi-phan-mem-tu-kiem-tra-chuoi-cung-ung',
          label: 'Khi phần mềm tự kiểm tra chuỗi cung ứng',
          level: 2,
        },
        {
          id: 'gia-tri-thuc-te-doi-voi-doanh-nghiep-va-nguoi-tieu-dung',
          label: 'Giá trị đối với doanh nghiệp và người tiêu dùng',
          level: 2,
        },
        {
          id: 'nhung-gioi-han-khong-the-giai-quyet-chi-bang-cong-nghe',
          label: 'Những giới hạn không thể chỉ giải quyết bằng công nghệ',
          level: 2,
        },
        {
          id: 'tu-truy-xuat-nguon-goc-den-chuoi-cung-ung-co-the-kiem-chung',
          label: 'Từ truy xuất nguồn gốc đến chuỗi cung ứng có thể kiểm chứng',
          level: 2,
        },
      ] satisfies BlogArticleTableOfContentsItem[],
      markdown: `Truy xuất nguồn gốc đã trở thành một phần quen thuộc trong nhiều chương trình chuyển đổi số của doanh nghiệp. Trên bao bì sản phẩm, mã QR có thể đưa người mua đến trang thông tin về nơi sản xuất, ngày đóng gói, đơn vị phân phối hoặc một số chứng nhận liên quan. Trong nội bộ doanh nghiệp, các hệ thống quản lý giúp theo dõi hàng hóa từ nhà máy đến kho, từ đơn vị vận chuyển đến điểm bán. Những công cụ này đã thay thế đáng kể cho giấy tờ và bảng tính, đồng thời giúp dữ liệu trong chuỗi cung ứng trở nên dễ tiếp cận hơn.

Tuy nhiên, việc một thông tin có thể được truy xuất chưa có nghĩa là thông tin đó có thể được kiểm chứng. Khi một trang web cho biết sản phẩm được sản xuất tại một nhà máy đạt tiêu chuẩn quốc tế, người đọc vẫn cần biết ai đã xác nhận điều đó, bằng chứng nào đứng phía sau tuyên bố ấy và liệu một bên độc lập có thể tự kiểm tra hay không. Nếu toàn bộ dữ liệu được nhập bởi nhà sản xuất hoặc nhà bán hàng rồi lưu trong hệ thống do chính họ kiểm soát, mã QR về cơ bản chỉ giúp truyền tải thông tin thuận tiện hơn; nó không tự tạo ra niềm tin cho thông tin được hiển thị.

Khoảng cách này cho thấy truy xuất nguồn gốc mới giải quyết được một phần của bài toán. Hệ thống truy xuất có thể cho biết một sản phẩm được tuyên bố đã đi qua những đâu, trong khi một chuỗi cung ứng có thể kiểm chứng phải cho phép người dùng hoặc phần mềm xác định ai đã đưa ra từng thông tin, bên đó có thẩm quyền xác nhận hay không và dữ liệu có bị thay đổi sau khi được phát hành hay không. Đây không đơn thuần là việc đưa thêm dữ liệu lên một trang web, mà là thay đổi cách niềm tin được thiết lập giữa những tổ chức cùng tham gia vào chuỗi cung ứng.

![Nhiều tổ chức cùng tạo nên một chuỗi cung ứng có thể kiểm chứng](/blog/tuong-lai-cua-xac-thuc-va-truy-xuat-nguon-goc-san-pham/verifiable-supply-chain-cover-1440.webp)

*Hình 1. Chuỗi cung ứng có thể kiểm chứng kết nối bằng chứng từ nhiều tổ chức thay vì phụ thuộc vào một nguồn dữ liệu duy nhất.*

## Vì sao truy xuất nguồn gốc vẫn phụ thuộc nhiều vào niềm tin?

Một sản phẩm hiếm khi chỉ đi qua một nhà sản xuất và một nhà bán lẻ. Ngay cả một sản phẩm tương đối đơn giản như một túi cà phê cũng có thể liên quan đến nông trại, cơ sở sơ chế, đơn vị kiểm định, nhà xuất khẩu, công ty logistics, nhà rang và hệ thống phân phối. Mỗi bên nắm giữ một phần thông tin khác nhau và chỉ có khả năng xác nhận những hoạt động thuộc phạm vi của mình.

Nông trại biết giống cây, khu vực trồng và thời điểm thu hoạch. Cơ sở chế biến biết lô nguyên liệu nào đã được tiếp nhận và xử lý bằng phương pháp nào. Tổ chức kiểm định có thể xác nhận các chỉ tiêu chất lượng hoặc tiêu chuẩn hữu cơ. Đơn vị logistics biết lô hàng được vận chuyển từ đâu, vào thời điểm nào và trong điều kiện ra sao. Nhà rang có thể xác nhận loại nguyên liệu được sử dụng cho từng mẻ sản xuất, trong khi nhà phân phối chịu trách nhiệm ở những chặng cuối trước khi sản phẩm đến tay người tiêu dùng.

Không một tổ chức nào nhất thiết nắm giữ toàn bộ thông tin về vòng đời của sản phẩm. Đây là điểm khiến chuỗi cung ứng khác với một hệ thống dữ liệu nội bộ. Nếu mọi hoạt động đều nằm trong một doanh nghiệp, tổ chức đó có thể xây dựng cơ sở dữ liệu trung tâm và tự quy định ai được phép ghi dữ liệu. Nhưng trong một chuỗi cung ứng gồm nhiều doanh nghiệp độc lập, việc yêu cầu tất cả các bên sử dụng chung một nền tảng thường khó thực hiện. Mỗi tổ chức đã có hệ thống riêng, chính sách bảo mật riêng và không phải lúc nào cũng sẵn sàng trao toàn bộ dữ liệu cho một đơn vị trung tâm.

QR code không giải quyết được mâu thuẫn này. Nó chỉ là phương tiện dẫn người dùng đến một nguồn dữ liệu. Nếu nguồn dữ liệu vẫn do một bên tự nhập và tự quản lý, các tổ chức còn lại phải tiếp tục tin vào bên đó. Điều tương tự xảy ra với các chứng từ PDF. Việc chuyển giấy chứng nhận sang tệp điện tử giúp lưu trữ và trao đổi thuận tiện hơn, nhưng người nhận vẫn phải mở tài liệu, kiểm tra đơn vị phát hành, đối chiếu con dấu hoặc liên hệ xác minh khi cần độ tin cậy cao. Quy trình đã được số hóa, nhưng phần quan trọng nhất của nó — xác định thông tin có đáng tin hay không — vẫn phụ thuộc nhiều vào con người.

Vì vậy, vấn đề không phải là chuỗi cung ứng thiếu một cơ sở dữ liệu lớn hơn. Điều còn thiếu là một cách để mỗi thông tin có thể mang theo bằng chứng về nguồn gốc của chính nó, qua đó cho phép bên tiếp nhận kiểm tra mà không phải phụ thuộc hoàn toàn vào hệ thống của bên đang cung cấp dữ liệu.

## Từ thông tin về sản phẩm đến bằng chứng về sản phẩm

Có một khác biệt quan trọng giữa tuyên bố “lô cà phê này đạt chứng nhận hữu cơ” và việc một tổ chức kiểm định cụ thể phát hành bằng chứng số xác nhận lô cà phê đó đã đáp ứng một tiêu chuẩn nhất định. Trong trường hợp đầu tiên, hệ thống chỉ hiển thị một thông tin mà bất kỳ bên nào có quyền chỉnh sửa cơ sở dữ liệu cũng có thể đưa vào. Trong trường hợp thứ hai, tuyên bố được gắn với một chủ thể phát hành rõ ràng và đi kèm cơ chế cho phép bên tiếp nhận kiểm tra nguồn gốc, tính toàn vẹn và trạng thái của bằng chứng.

Những bằng chứng số như vậy có thể được thể hiện dưới dạng thực chứng. Có thể hiểu thực chứng là một bằng chứng số do một chủ thể phát hành để xác nhận một số thông tin về một cá nhân, tổ chức, sản phẩm hoặc thiết bị. Trường đại học có thể phát hành thực chứng về bằng cấp, cơ quan có thẩm quyền có thể xác nhận giấy phép, còn trong chuỗi cung ứng, nhà sản xuất, đơn vị kiểm định hoặc công ty logistics có thể phát hành thực chứng về những phần mà họ trực tiếp chịu trách nhiệm.

Khác với một tệp PDF thông thường, thực chứng được thiết kế để phần mềm có thể kiểm tra. Hệ thống tiếp nhận có thể xác định ai đã phát hành, nội dung có bị chỉnh sửa hay không và bằng chứng còn hiệu lực hay đã bị thu hồi. Nhờ đó, quá trình xác minh không còn phụ thuộc hoàn toàn vào việc con người mở từng tài liệu và tự đánh giá.

Điều này không có nghĩa công nghệ mật mã có thể biến mọi dữ liệu thành sự thật. Nếu một tổ chức cố tình phát hành thông tin sai, chữ ký số không tự phát hiện được sự gian dối. Mật mã chỉ giúp chứng minh tuyên bố đến từ ai, nội dung có bị thay đổi hay không và bằng chứng đang ở trạng thái nào. Việc tổ chức phát hành có đủ thẩm quyền và đáng tin để xác nhận thông tin đó vẫn phụ thuộc vào quy định ngành, hệ thống kiểm định, hoạt động giám sát và trách nhiệm pháp lý.

Sự phân biệt này đặc biệt quan trọng đối với chuỗi cung ứng. Một chứng nhận chất lượng do nhà bán hàng tự phát hành không thể có giá trị tương đương với chứng nhận của một tổ chức kiểm định được công nhận. Chuỗi cung ứng có thể kiểm chứng không loại bỏ vai trò của thẩm quyền, mà giúp những xác nhận của các bên có thẩm quyền được sử dụng và kiểm tra hiệu quả hơn trong môi trường số.

![Thực chứng gắn mỗi tuyên bố với chủ thể phát hành để bên tiếp nhận kiểm tra](/blog/tuong-lai-cua-xac-thuc-va-truy-xuat-nguon-goc-san-pham/product-credential-verification-1440.webp)

*Hình 2. Thực chứng giúp hệ thống kiểm tra nguồn phát hành, tính toàn vẹn và trạng thái của từng bằng chứng số.*

## Mỗi mắt xích xác nhận phần mà mình chịu trách nhiệm

Một chuỗi cung ứng có thể kiểm chứng không cần một tổ chức trung tâm đứng ra xác nhận toàn bộ vòng đời sản phẩm. Trái lại, mô hình này hoạt động tốt hơn khi mỗi bên chỉ xác nhận những điều thuộc phạm vi trách nhiệm và năng lực của mình.

Trong chuỗi cung ứng cà phê, nông trại có thể phát hành thực chứng về nguồn gốc lô nguyên liệu, vùng trồng và thời điểm thu hoạch. Tổ chức kiểm định phát hành bằng chứng về tiêu chuẩn hữu cơ hoặc kết quả kiểm nghiệm. Cơ sở chế biến xác nhận việc tiếp nhận và xử lý lô nguyên liệu. Đơn vị logistics xác nhận quá trình vận chuyển và bàn giao, còn nhà rang liên kết lô nguyên liệu với mẻ sản phẩm cuối cùng.

Khi các bằng chứng này được liên kết, chúng hình thành một chuỗi xác nhận mà hệ thống phía sau có thể lần theo. Nhà bán lẻ không cần tự đứng ra bảo đảm mọi thông tin, cũng không phải sao chép toàn bộ dữ liệu từ các bên khác vào cơ sở dữ liệu của mình. Thay vào đó, họ có thể tập hợp những bằng chứng do từng bên phát hành và cho phép người dùng hoặc phần mềm kiểm tra trực tiếp nguồn gốc của từng tuyên bố.

Định danh tự chủ, hay SSI, có thể hỗ trợ mô hình này bằng cách cung cấp một phương thức để các chủ thể phát hành, quản lý và trình bày những bằng chứng có thể kiểm chứng mà không buộc tất cả cùng tham gia vào một cơ sở dữ liệu tập trung. Vai trò của SSI không phải tạo ra sự thật cho chuỗi cung ứng, mà là giúp mỗi tuyên bố được gắn với bên đã đưa ra nó và có thể được hệ thống khác kiểm tra một cách độc lập.

Điều này tạo ra một mô hình khác với các nền tảng truy xuất truyền thống. Thay vì xây dựng một cơ sở dữ liệu duy nhất rồi yêu cầu mọi tổ chức gửi dữ liệu vào đó, mỗi bên có thể tiếp tục vận hành hệ thống riêng nhưng phát hành những bằng chứng theo một định dạng mà các hệ thống khác có thể hiểu và xác minh. Nhờ vậy, khả năng liên thông được xây dựng ở tầng bằng chứng thay vì buộc mọi bên phải từ bỏ hạ tầng hiện có.

![Các bên trong chuỗi cung ứng tạo thành mạng lưới tin cậy để kiểm chứng sản phẩm](/blog/tuong-lai-cua-xac-thuc-va-truy-xuat-nguon-goc-san-pham/supply-chain-trust-network-1440.webp)

*Hình 3. Mỗi bên xác nhận phần thuộc thẩm quyền của mình, tạo thành mạng lưới bằng chứng có thể kiểm tra độc lập.*

## Một sản phẩm được kiểm chứng như thế nào?

Đối với người tiêu dùng, trải nghiệm bên ngoài có thể không khác nhiều so với truy xuất nguồn gốc hiện nay. Họ vẫn quét một mã trên bao bì và nhìn thấy vùng trồng, thời gian thu hoạch, nơi chế biến, chứng nhận và nhà phân phối. Sự khác biệt nằm ở quá trình diễn ra phía sau màn hình.

Thay vì lấy toàn bộ dữ liệu từ cơ sở dữ liệu của nhà bán hàng, hệ thống truy xuất những thực chứng gắn với lô sản phẩm. Bằng chứng về nguồn nguyên liệu đến từ nông trại hoặc tổ chức quản lý vùng trồng. Chứng nhận hữu cơ đến từ đơn vị kiểm định. Thông tin vận chuyển do công ty logistics phát hành. Nhà rang cung cấp bằng chứng cho thấy lô nguyên liệu nào đã được sử dụng để tạo ra sản phẩm cuối cùng.

Sau đó, hệ thống kiểm tra từng bằng chứng, xác định nguồn phát hành, kiểm tra tính toàn vẹn và trạng thái hiệu lực. Nếu các mắt xích quan trọng đều có đủ bằng chứng, kết quả có thể được trình bày dưới dạng một thông báo ngắn rằng nguồn gốc và quá trình sản xuất đã được xác minh. Nếu chứng nhận đã hết hiệu lực hoặc một giai đoạn không có đủ bằng chứng, hệ thống có thể cảnh báo rõ ràng thay vì mặc định coi toàn bộ thông tin là đáng tin như nhau.

Cách tiếp cận này cho phép phân biệt ba trạng thái thường bị trộn lẫn trong các hệ thống hiện nay: thông tin do một bên công bố, thông tin đã được một tổ chức xác nhận và thông tin đã được hệ thống kiểm tra thành công. Sự phân biệt đó giúp doanh nghiệp tránh việc sử dụng cùng một nhãn “đã xác minh” cho những dữ liệu có mức độ tin cậy rất khác nhau.

Quan trọng hơn, quá trình kiểm tra không nhất thiết chỉ phục vụ người tiêu dùng. Một doanh nghiệp nhập khẩu có thể dùng cùng những bằng chứng đó để kiểm tra nhà cung cấp; ngân hàng có thể đánh giá điều kiện giải ngân; cơ quan quản lý có thể kiểm tra việc tuân thủ; còn nền tảng thương mại điện tử có thể xác định sản phẩm có đáp ứng tiêu chuẩn để được đưa lên hệ thống hay không.

![Chữ ký mật mã cho phép phần mềm kiểm tra nguồn phát hành và tính toàn vẹn của bằng chứng](/blog/tuong-lai-cua-xac-thuc-va-truy-xuat-nguon-goc-san-pham/cryptographic-product-verification-1440.webp)

*Hình 4. Chữ ký mật mã giúp phần mềm phát hiện nội dung bị thay đổi và xác định bằng chứng đến từ đúng chủ thể phát hành.*

## Khi phần mềm tự kiểm tra chuỗi cung ứng

Nếu một sản phẩm đi qua hàng chục tổ chức và mỗi bên phát hành nhiều loại bằng chứng, người dùng không thể tự đọc tất cả các tài liệu liên quan. Ngay cả doanh nghiệp cũng khó yêu cầu nhân viên kiểm tra thủ công hàng nghìn chứng từ cho từng lô hàng. Giá trị của chuỗi cung ứng có thể kiểm chứng vì vậy không nằm ở việc hiển thị thêm thật nhiều thông tin, mà ở khả năng để phần mềm tự xử lý những bằng chứng đó.

AI Agent có thể thu thập các thực chứng liên quan, kiểm tra nguồn phát hành, phát hiện mâu thuẫn và so sánh kết quả với các tiêu chí đã được thiết lập. Một người tiêu dùng có thể yêu cầu Agent chỉ lựa chọn sản phẩm có nguồn gốc nguyên liệu được xác minh và chứng nhận hữu cơ còn hiệu lực. Agent không cần trình bày toàn bộ cấu trúc bằng chứng nếu mọi điều kiện đều được đáp ứng; nó chỉ cần cảnh báo khi một mắt xích không thể kiểm tra hoặc chứng nhận không còn giá trị.

Trong doanh nghiệp, Agent có thể hỗ trợ hoạt động mua sắm và quản lý nhà cung cấp. Khi một đơn vị gửi báo giá, hệ thống đồng thời kiểm tra giấy phép, chứng nhận chất lượng, nguồn gốc hàng hóa và lịch sử tuân thủ trước khi đưa phương án vào danh sách xem xét. Nhân viên không phải tự mở từng tài liệu, nhưng vẫn có thể truy cập bằng chứng gốc khi cần kiểm tra sâu hơn.

Đây là bước chuyển quan trọng từ việc con người đọc thông tin truy xuất sang việc phần mềm sử dụng bằng chứng để quyết định bước tiếp theo. Khi dữ liệu đã có thể được kiểm tra bằng máy, chuỗi cung ứng không chỉ minh bạch hơn mà còn có khả năng vận hành tự động hơn.

Hệ thống nhập kho có thể chỉ tiếp nhận lô hàng khi các chứng nhận bắt buộc còn hiệu lực. Nền tảng mua sắm có thể tự loại những nhà cung cấp không đáp ứng tiêu chuẩn. Trong chuỗi lạnh, dữ liệu từ cảm biến có thể được đối chiếu với điều kiện vận chuyển đã thỏa thuận; nếu nhiệt độ vượt ngưỡng, lô hàng được tự động đánh dấu để kiểm tra. Thanh toán cũng có thể được chia thành nhiều giai đoạn và chỉ được giải ngân khi bằng chứng giao hàng, kiểm định hoặc nghiệm thu đã được xác nhận.

Hợp đồng thông minh có thể hỗ trợ những điều kiện có thể xác định rõ bằng phần mềm. Blockchain cũng có thể được sử dụng tại những điểm mà nhiều tổ chức độc lập cần cùng kiểm tra một trạng thái hoặc mốc giao dịch mà không muốn trao toàn bộ quyền kiểm soát cho một bên duy nhất. Tuy nhiên, điều đó không có nghĩa toàn bộ dữ liệu chuỗi cung ứng phải được đưa lên blockchain. Giá mua nguyên liệu, công thức sản xuất, danh sách nhà cung cấp và những thông tin thương mại nhạy cảm vẫn có thể được lưu trong hệ thống riêng của doanh nghiệp. Blockchain chỉ cần xuất hiện ở những nơi thực sự cần một cơ sở kiểm chứng chung.

## Giá trị thực tế đối với doanh nghiệp và người tiêu dùng

Đối với người tiêu dùng, chuỗi cung ứng có thể kiểm chứng giúp họ hiểu rõ hơn mức độ tin cậy của những thông tin được công bố. Thay vì chỉ nhìn thấy biểu tượng “chính hãng”, “hữu cơ” hoặc “có nguồn gốc rõ ràng”, họ có thể biết tổ chức nào đã xác nhận và phần nào của chuỗi đã được kiểm tra. Hệ thống cũng có thể nói rõ những mắt xích còn thiếu bằng chứng, thay vì tạo cảm giác rằng toàn bộ quá trình đều minh bạch như nhau.

Đối với doanh nghiệp, lợi ích lớn hơn nằm ở việc giảm chi phí xác minh. Chứng từ hiện nay thường được gửi qua email, lưu trong nhiều hệ thống và kiểm tra lại mỗi khi một giao dịch mới bắt đầu. Nếu bằng chứng đã được phát hành theo cách có thể kiểm chứng, cùng một chứng nhận có thể được sử dụng trong nhiều quy trình mà không cần liên hệ lại với đơn vị phát hành mỗi lần. Việc tiếp nhận nhà cung cấp mới, kiểm tra tuân thủ hoặc chuẩn bị cho hoạt động audit có thể được rút ngắn đáng kể.

Cơ quan quản lý cũng có thể kiểm tra trực tiếp nguồn phát hành và trạng thái của chứng nhận thay vì yêu cầu doanh nghiệp tập hợp một bộ hồ sơ lớn rồi đối chiếu thủ công. Khi những hệ thống khác nhau cùng hiểu và kiểm tra được một loại bằng chứng, dữ liệu không còn phải được sao chép liên tục từ nền tảng này sang nền tảng khác chỉ để chứng minh lại cùng một thông tin.

Dù vậy, khả năng kiểm chứng không đồng nghĩa với việc toàn bộ chuỗi cung ứng phải trở nên công khai. Doanh nghiệp vẫn cần bảo vệ giá cả, công thức sản xuất, danh sách đối tác và nhiều dữ liệu thương mại nhạy cảm khác. Một hệ thống tốt phải cho phép doanh nghiệp chứng minh rằng một điều kiện đã được đáp ứng mà không bắt buộc họ tiết lộ toàn bộ dữ liệu đứng phía sau. Trong một số trường hợp, các cơ chế tiết lộ có chọn lọc hoặc bằng chứng không tiết lộ có thể được sử dụng để cân bằng giữa yêu cầu xác minh và bảo mật kinh doanh.

## Những giới hạn không thể giải quyết chỉ bằng công nghệ

Chuỗi cung ứng có thể kiểm chứng vẫn phụ thuộc vào chất lượng của dữ liệu được tạo ra trong thế giới thực. Nếu nông trại khai báo sai sản lượng, cảm biến bị can thiệp hoặc tổ chức kiểm định cấp chứng nhận không đúng, việc đưa dữ liệu vào một thực chứng không tự làm cho dữ liệu trở nên chính xác.

Mật mã có thể chứng minh ai đã đưa ra một tuyên bố và liệu nội dung có bị thay đổi sau đó hay không; nó không thể bảo đảm rằng người phát hành luôn nói đúng. Vì vậy, mô hình này vẫn cần các tổ chức kiểm định có uy tín, hoạt động audit, cảm biến đáng tin cậy, quy trình quản trị, tiêu chuẩn ngành và trách nhiệm pháp lý. Công nghệ không thay thế những cơ chế đó mà giúp kết quả của chúng được sử dụng hiệu quả hơn trong môi trường số.

Hệ thống cũng cần biết tổ chức nào được phép phát hành loại bằng chứng nào. Một doanh nghiệp có thể tự xác nhận thông tin về quy trình sản xuất của mình, nhưng không thể tự cấp chứng nhận độc lập cho chính sản phẩm nếu quy định yêu cầu việc đánh giá phải do tổ chức bên ngoài thực hiện. Bởi vậy, bên cạnh tiêu chuẩn kỹ thuật cho thực chứng, chuỗi cung ứng còn cần những quy tắc xác định thẩm quyền, trách nhiệm và điều kiện chấp nhận bằng chứng.

Khả năng liên thông cũng là một thách thức lớn. Một thực chứng chỉ có giá trị thực tế khi bên phát hành, bên nắm giữ và bên kiểm tra cùng hiểu được cấu trúc của nó. Nếu mỗi nền tảng sử dụng một định dạng riêng hoặc chỉ chấp nhận bằng chứng trong hệ sinh thái của mình, chuỗi cung ứng sẽ tiếp tục bị chia cắt thành những hệ thống khép kín.

Cuối cùng là bài toán tích hợp với hạ tầng hiện có. Doanh nghiệp đã đầu tư nhiều năm vào ERP, SCM, WMS, hệ thống quản lý chất lượng và nền tảng quản lý đối tác. Một mô hình mới chỉ có khả năng được sử dụng rộng rãi nếu có thể bổ sung năng lực xác minh vào những hệ thống này, thay vì yêu cầu toàn bộ chuỗi cung ứng phải xây dựng lại từ đầu.

## Từ truy xuất nguồn gốc đến chuỗi cung ứng có thể kiểm chứng

Truy xuất nguồn gốc đã giúp nhiều dữ liệu trước đây bị phân tán trong giấy tờ và hệ thống nội bộ trở nên dễ tiếp cận hơn. Nhưng trong một chuỗi cung ứng gồm nhiều doanh nghiệp độc lập, chỉ biết thông tin được lưu ở đâu là chưa đủ. Người sử dụng dữ liệu còn cần biết ai đã đưa ra thông tin, bên đó có thẩm quyền xác nhận hay không và hệ thống của một tổ chức khác có thể tự kiểm tra bằng chứng mà không phải quay lại quy trình xác minh thủ công hay không.

Đó là bước chuyển từ truy xuất nguồn gốc sang chuỗi cung ứng có thể kiểm chứng. Trong mô hình này, mỗi mắt xích chịu trách nhiệm cho phần thông tin của mình, những xác nhận quan trọng được đưa ra dưới dạng bằng chứng mà phần mềm có thể kiểm tra, còn doanh nghiệp không nhất thiết phải cùng phụ thuộc vào một cơ sở dữ liệu trung tâm.

Khi những bằng chứng này được kết hợp với AI Agent và các cơ chế tự động hóa, hệ thống không chỉ cho con người biết sản phẩm đã đi qua đâu. Nó còn có thể tự xác định điều kiện nào đã được chứng minh, phát hiện những điểm bất thường và quyết định quy trình nào được phép tiếp tục. Đây mới là giá trị lớn nhất của mô hình: biến thông tin trong chuỗi cung ứng từ nội dung để con người đọc thành bằng chứng mà cả con người lẫn phần mềm đều có thể sử dụng để đưa ra quyết định.

Tương lai của truy xuất nguồn gốc vì vậy không nằm ở việc đưa thêm thật nhiều thông tin lên một trang web phía sau mã QR. Nó nằm ở khả năng biến những tuyên bố quan trọng trong chuỗi cung ứng thành các bằng chứng có nguồn gốc rõ ràng, có thể kiểm tra độc lập và có thể được sử dụng trong những quy trình tự động giữa nhiều tổ chức.`,
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
