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

export const SELECTIVE_DISCLOSURE_EXPLAINER_BLOG_ARTICLE_ID =
  'tiet-lo-co-chon-loc-la-gi' as const;

const assetRoot = '/blog/tiet-lo-co-chon-loc-la-gi';

export const SELECTIVE_DISCLOSURE_EXPLAINER_BLOG_ARTICLE = {
  id: SELECTIVE_DISCLOSURE_EXPLAINER_BLOG_ARTICLE_ID,
  slug: SELECTIVE_DISCLOSURE_EXPLAINER_BLOG_ARTICLE_ID,
  publishedAt: '2026-08-30',
  modifiedAt: '2026-08-30',
  author: {
    type: 'Organization',
    name: 'Identra',
  },
  topics: ['identity', 'privacy', 'security'],
  industries: ['all'],
  contentLocales: ['vi'],
  relatedArticleIds: [
    'thuc-chung-la-gi',
    'ro-ri-du-lieu-tai-trung-quoc-va-an-do-bai-hoc-ve-an-ninh-du-lieu-va-cach-ssi-thay-doi-cach-chung-ta-bao-ve-thong-tin',
    'vi-dinh-tin-la-gi',
  ],
  coverImage: {
    src: `${assetRoot}/selective-disclosure-cover-1440.webp`,
    srcSet: [
      `${assetRoot}/selective-disclosure-cover-800.webp 800w`,
      `${assetRoot}/selective-disclosure-cover-1440.webp 1440w`,
    ].join(', '),
    sizes: '(min-width: 1024px) 680px, (min-width: 768px) 55vw, 100vw',
    width: 1440,
    height: 810,
  },
  socialImage: {
    src: `${assetRoot}/${SELECTIVE_DISCLOSURE_EXPLAINER_BLOG_ARTICLE_ID}-og.jpg`,
    width: 1200,
    height: 630,
    type: 'image/jpeg',
  },
  listing: {
    en: {
      title: 'What Is Selective Disclosure?',
      description: 'How people can prove only the information a transaction requires while limiting unnecessary data collection, storage and exposure.',
      type: 'Foundations',
      duration: '10 min read',
    },
    es: {
      title: '¿Qué es la divulgación selectiva?',
      description: 'Cómo demostrar solo la información necesaria para una transacción y limitar la recopilación, el almacenamiento y la exposición de datos.',
      type: 'Fundamentos',
      duration: '10 min de lectura',
    },
    ja: {
      title: '選択的開示とは？',
      description: '取引に必要な情報だけを証明し、不要なデータの収集、保存、漏えいリスクを抑える仕組みを解説します。',
      type: '基礎知識',
      duration: '読了10分',
    },
    de: {
      title: 'Was ist selektive Offenlegung?',
      description: 'Wie nur die für eine Transaktion erforderlichen Informationen nachgewiesen und unnötige Datenerhebung, Speicherung und Offenlegung begrenzt werden.',
      type: 'Grundlagen',
      duration: '10 Min. Lesezeit',
    },
    vi: {
      title: 'Tiết lộ có chọn lọc là gì? Cách xác minh thông tin mà không chia sẻ quá nhiều dữ liệu',
      description: 'Tiết lộ có chọn lọc giúp chủ thể chỉ trình đúng bằng chứng cần thiết, giảm dữ liệu phải chia sẻ mà vẫn giữ được khả năng xác minh.',
      type: 'Kiến thức nền tảng',
      duration: 'Đọc trong 10 phút',
    },
  } satisfies Record<Locale, BlogArticleListingCopy>,
  images: {},
  content: {
    vi: {
      title: 'Tiết lộ có chọn lọc là gì? Cách xác minh thông tin mà không chia sẻ quá nhiều dữ liệu',
      description: 'Tiết lộ có chọn lọc giúp chủ thể chỉ trình đúng bằng chứng cần thiết, giảm dữ liệu phải chia sẻ mà vẫn giữ được khả năng xác minh.',
      excerpt: 'Cơ chế tiết lộ có chọn lọc đưa nguyên tắc tối thiểu hóa dữ liệu vào chính kiến trúc xác minh, để mỗi giao dịch chỉ nhận lượng thông tin phù hợp.',
      category: 'Kiến thức nền tảng',
      tags: ['Tiết lộ có chọn lọc', 'Tối thiểu hóa dữ liệu', 'Quyền riêng tư', 'Thực chứng'],
      readTimeMinutes: 10,
      ui: {
        publishedLabel: 'Xuất bản ngày',
        authorRole: 'Đội ngũ nội dung Identra',
        tableOfContents: 'Mục lục',
        openTableOfContents: 'Mở mục lục bài viết',
        closeTableOfContents: 'Đóng mục lục bài viết',
        ctaTitle: 'Xác minh đúng thông tin với mức tiết lộ tối thiểu',
        ctaDescription: 'Khám phá cách Identra giúp tổ chức xác minh bằng chứng cần thiết mà không phải thu thập toàn bộ giấy tờ và dữ liệu cá nhân.',
        ctaButtonLabel: 'Trải nghiệm demo',
      },
      tableOfContents: [
        {
          id: 'tiet-lo-co-chon-loc-la-gi',
          label: 'Tiết lộ có chọn lọc là gì?',
          level: 2,
        },
        {
          id: 'tai-sao-chung-ta-phai-dua-ca-giay-to-chi-de-chung-minh-mot-thong-tin',
          label: 'Tại sao chúng ta phải đưa cả giấy tờ chỉ để chứng minh một thông tin?',
          level: 2,
        },
        {
          id: 'chia-se-it-du-lieu-hon-nhung-van-dam-bao-kha-nang-xac-minh',
          label: 'Chia sẻ ít dữ liệu hơn nhưng vẫn đảm bảo khả năng xác minh',
          level: 2,
        },
        {
          id: 'thu-thap-it-du-lieu-hon-cung-tot-cho-doanh-nghiep',
          label: 'Thu thập ít dữ liệu hơn cũng tốt cho doanh nghiệp',
          level: 2,
        },
        {
          id: 'khi-it-du-lieu-duoc-luu-mot-vu-ro-ri-cung-gay-it-thiet-hai-hon',
          label: 'Khi ít dữ liệu được lưu, một vụ rò rỉ cũng gây ít thiệt hại hơn',
          level: 2,
        },
        {
          id: 'kho-xay-dung-ho-so-toan-dien-ve-mot-nguoi-hon',
          label: 'Khó xây dựng hồ sơ toàn diện về một người hơn',
          level: 2,
        },
        {
          id: 'tu-dua-giay-to-cho-toi-sang-chung-minh-dieu-toi-can-biet',
          label: 'Từ “đưa giấy tờ cho tôi” sang “chứng minh điều tôi cần biết”',
          level: 2,
        },
        {
          id: 'tu-dong-hoa-khong-nhat-thiet-phai-danh-doi-quyen-rieng-tu',
          label: 'Tự động hóa không nhất thiết phải đánh đổi quyền riêng tư',
          level: 2,
        },
        {
          id: 'dua-nguyen-tac-toi-thieu-hoa-du-lieu-vao-chinh-kien-truc-he-thong',
          label: 'Đưa nguyên tắc tối thiểu hóa dữ liệu vào chính kiến trúc hệ thống',
          level: 2,
        },
        {
          id: 'tiet-lo-co-chon-loc-khong-co-nghia-la-luon-an-danh',
          label: 'Tiết lộ có chọn lọc không có nghĩa là luôn ẩn danh',
          level: 2,
        },
        {
          id: 'tu-thu-thap-du-lieu-sang-yeu-cau-bang-chung',
          label: 'Từ thu thập dữ liệu sang yêu cầu bằng chứng',
          level: 2,
        },
      ] satisfies BlogArticleTableOfContentsItem[],
      markdown: `Trong thế giới số hiện nay, chúng ta thường phải chia sẻ nhiều dữ liệu hơn mức thực sự cần thiết.

Một dịch vụ chỉ cần biết bạn đã đủ 18 tuổi, nhưng bạn có thể phải gửi cả căn cước. Một nhà tuyển dụng chỉ cần biết bạn đã tốt nghiệp một ngành nhất định, nhưng bạn lại phải gửi toàn bộ bằng cấp và bảng điểm. Một hệ thống chỉ cần biết bạn có quyền truy cập, nhưng vẫn có thể yêu cầu đầy đủ thông tin cá nhân để đối chiếu.

Vấn đề không nằm ở chỗ những dữ liệu đó không đúng. Vấn đề là **bên xác minh thường nhận nhiều thông tin hơn mục đích của giao dịch thực sự yêu cầu**.

Tiết lộ có chọn lọc được tạo ra để thay đổi cách này.

## Tiết lộ có chọn lọc là gì?

Hiểu đơn giản, **tiết lộ có chọn lọc là cơ chế cho phép một chủ thể chỉ trình bày những thông tin cần thiết từ một thực chứng, thay vì phải chia sẻ toàn bộ nội dung của thực chứng đó**.

Giả sử một thực chứng chứa họ tên, ngày sinh, địa chỉ, quốc tịch và nhiều thông tin khác.

Nếu một dịch vụ chỉ cần biết ngày sinh, người dùng có thể chỉ trình ngày sinh.

Trong những cơ chế nâng cao hơn, nếu dịch vụ chỉ cần biết người dùng có đủ 18 tuổi hay không, người dùng thậm chí có thể chứng minh:

**“Tôi đã đủ 18 tuổi.”**

mà không cần tiết lộ ngày sinh cụ thể.

Về kỹ thuật, việc chọn một số thuộc tính để chia sẻ và việc chứng minh một điều mà không tiết lộ dữ liệu gốc có thể được thực hiện bằng những cơ chế khác nhau. Nhưng với người sử dụng, nguyên tắc cốt lõi vẫn rất đơn giản:

**Không chia sẻ nhiều dữ liệu hơn mức thực sự cần thiết.**

## Tại sao chúng ta phải đưa cả giấy tờ chỉ để chứng minh một thông tin?

Trong thế giới vật lý, giấy tờ thường được thiết kế như một khối thông tin.

Khi đưa căn cước cho ai đó xem, chúng ta gần như đồng thời để họ nhìn thấy tên, ngày sinh, số định danh, địa chỉ và nhiều thông tin khác, dù mục đích ban đầu có thể chỉ là kiểm tra độ tuổi.

Cách làm này tiếp tục được mang sang thế giới số.

Thay vì đưa một tấm thẻ, chúng ta tải lên ảnh chụp hoặc bản điện tử của cả giấy tờ.

Nhưng khi dữ liệu đã trở thành những thực chứng mà máy tính có thể kiểm tra, không có lý do gì chúng ta phải giữ nguyên cách chia sẻ của giấy tờ vật lý.

**Số hóa giấy tờ không nên chỉ là biến một tờ giấy thành một hình ảnh trên màn hình. Nó còn cho phép chúng ta thiết kế lại cách thông tin được sử dụng.**

Và đó là nơi tiết lộ có chọn lọc trở nên quan trọng.

## Chia sẻ ít dữ liệu hơn nhưng vẫn đảm bảo khả năng xác minh

Lợi ích trực tiếp nhất là người dùng không còn phải đánh đổi toàn bộ dữ liệu cá nhân chỉ để được xác minh một thuộc tính nhỏ.

Giả sử một công ty cho thuê xe cần biết ba điều:

- người thuê đã đủ tuổi;
- có giấy phép lái xe phù hợp;
- giấy phép vẫn còn hiệu lực.

Họ không nhất thiết cần biết quê quán, số định danh hay nhiều thông tin khác trên giấy phép.

Tương tự, một dịch vụ bán sản phẩm giới hạn độ tuổi chỉ cần biết khách hàng có vượt ngưỡng tuổi theo quy định hay không.

Một hệ thống kiểm soát cửa ra vào chỉ cần biết người đang đứng trước cửa có quyền truy cập hay không.

Trong tất cả các trường hợp này, **khả năng xác minh vẫn được giữ lại trong khi lượng dữ liệu được chia sẻ giảm xuống**.

Điều này cho thấy quyền riêng tư và khả năng xác minh không nhất thiết phải đối lập với nhau.

Chúng ta không phải lựa chọn giữa:

**“Không tiết lộ gì nên không thể tin tưởng”**

và:

**“Muốn được tin tưởng thì phải cung cấp toàn bộ dữ liệu.”**

Có một lựa chọn thứ ba:

**Cung cấp đúng bằng chứng cho đúng mục đích.**

## Thu thập ít dữ liệu hơn cũng tốt cho doanh nghiệp

Tiết lộ có chọn lọc thường được nhắc đến như một công nghệ bảo vệ quyền riêng tư của người dùng.

Nhưng lợi ích của nó đối với doanh nghiệp cũng rất lớn.

Mỗi dữ liệu mà một doanh nghiệp thu thập đều kéo theo trách nhiệm.

Doanh nghiệp phải lưu trữ nó, bảo vệ nó, kiểm soát ai được truy cập, xác định thời gian lưu giữ, xử lý yêu cầu liên quan đến quyền dữ liệu và chịu hậu quả nếu dữ liệu bị rò rỉ.

Càng thu thập nhiều, phạm vi cần bảo vệ càng lớn.

Một cơ sở dữ liệu chứa câu trả lời:

**“Người dùng đã đủ 18 tuổi.”**

Rõ ràng mang ít rủi ro hơn một cơ sở dữ liệu chứa hàng triệu ảnh căn cước chỉ để phục vụ cùng một mục đích.

Nguyên tắc ở đây rất đơn giản:

**Dữ liệu doanh nghiệp không thu thập là dữ liệu doanh nghiệp không phải bảo vệ.**

Vì vậy, tiết lộ có chọn lọc không chỉ là công cụ tăng quyền riêng tư. Nó còn có thể giúp giảm chi phí và rủi ro quản trị dữ liệu.

## Khi ít dữ liệu được lưu, một vụ rò rỉ cũng gây ít thiệt hại hơn

Hãy hình dung một nền tảng có một triệu người dùng.

Nếu mỗi người đều phải tải lên bản chụp giấy tờ để chứng minh độ tuổi, nền tảng đó vô tình tạo ra một kho dữ liệu gồm hàng triệu họ tên, ngày sinh, địa chỉ, số định danh và ảnh khuôn mặt.

Kho dữ liệu ấy có giá trị rất lớn đối với kẻ tấn công.

Nếu nền tảng chỉ nhận một bằng chứng rằng từng người dùng đã đủ tuổi, giá trị của dữ liệu bị đánh cắp trong một sự cố có thể giảm đi đáng kể.

Mã hóa, phân quyền truy cập và giám sát bảo mật vẫn rất quan trọng.

Nhưng có một lớp phòng vệ còn cơ bản hơn:

**Không lưu những dữ liệu không cần thiết ngay từ đầu.**

Tiết lộ có chọn lọc biến nguyên tắc đó từ một lời khuyên về bảo mật thành một khả năng kỹ thuật có thể được đưa thẳng vào thiết kế hệ thống.

## Khó xây dựng hồ sơ toàn diện về một người hơn

Một vấn đề khác ít được chú ý hơn là khả năng liên kết dữ liệu giữa nhiều dịch vụ.

Nếu một người cung cấp cùng họ tên, ngày sinh, số định danh và các thông tin nhận dạng cho hàng chục nền tảng, về lý thuyết các hoạt động của họ ở nhiều nơi có thể dễ dàng được liên kết với nhau.

Tiết lộ có chọn lọc giúp giảm lượng thông tin chung được chia sẻ giữa các bên.

Một dịch vụ có thể chỉ biết:

**Người này trên 18 tuổi.**

Một dịch vụ khác biết:

**Người này có giấy phép lái xe còn hiệu lực.**

Một hệ thống khác chỉ biết:

**Người này có quyền truy cập.**

Không phải mọi bên đều cần sở hữu đủ thông tin để xây dựng một hồ sơ đầy đủ về cùng một chủ thể.

Đây là một lợi ích quan trọng khi số lượng giao dịch số ngày càng tăng và dữ liệu cá nhân ngày càng dễ được kết hợp từ nhiều nguồn.

## Từ “đưa giấy tờ cho tôi” sang “chứng minh điều tôi cần biết”

Có lẽ thay đổi sâu sắc nhất của tiết lộ có chọn lọc không nằm ở một thuật toán mật mã cụ thể.

Nó nằm ở cách chúng ta thiết kế câu hỏi.

Mô hình hiện nay thường bắt đầu bằng:

**“Tôi cần giấy tờ nào của người dùng?”**

Một hệ thống sử dụng dữ liệu có thể kiểm chứng có thể bắt đầu bằng một câu hỏi khác:

**“Tôi thực sự cần biết điều gì để đưa ra quyết định?”**

Nhà tuyển dụng có thể không cần toàn bộ bảng điểm. Họ chỉ cần biết ứng viên đã tốt nghiệp một ngành nhất định từ một trường được công nhận.

Một ngân hàng trong một quy trình cụ thể có thể cần xác nhận thu nhập vượt một ngưỡng, thay vì nhận toàn bộ lịch sử tiền lương.

Một hệ thống kiểm soát truy cập không cần biết toàn bộ hồ sơ nhân sự. Nó chỉ cần biết quyền truy cập có hợp lệ ở thời điểm hiện tại hay không.

Khi câu hỏi thay đổi, lượng dữ liệu cần thu thập cũng thay đổi.

**Tiết lộ có chọn lọc không chỉ giúp chia sẻ ít dữ liệu hơn. Nó giúp việc chia sẻ dữ liệu trở nên đúng mục đích hơn.**

## Tự động hóa không nhất thiết phải đánh đổi quyền riêng tư

Khi các thực chứng và bằng chứng có thể được phần mềm tự động kiểm tra, tiết lộ có chọn lọc còn mở ra một khả năng quan trọng: tự động hóa quy trình mà không cần thu thập cả một bộ hồ sơ lớn.

Một hệ thống có thể cần xác minh rằng một người:

- đã đủ tuổi;
- có một chứng chỉ còn hiệu lực;
- đang giữ một vai trò nhất định;
- được một tổ chức có thẩm quyền xác nhận.

Nếu những điều kiện này có thể được trình dưới dạng bằng chứng có thể kiểm chứng, phần mềm có thể xử lý chúng trực tiếp.

Điều này có thể được ứng dụng trong tuyển dụng, tài chính, cấp phép, kiểm soát truy cập, giao dịch giữa doanh nghiệp hay các hệ thống tự động trong tương lai.

Đặc biệt, khi tác nhân trí tuệ nhân tạo ngày càng tham gia sâu hơn vào các giao dịch số, một hệ thống có thể không cần biết toàn bộ dữ liệu phía sau một tác nhân. Nó chỉ cần những bằng chứng cần thiết để xác định rằng tác nhân đó có quyền thực hiện hành động đang được yêu cầu.

**Tự động hóa vì vậy không nhất thiết đồng nghĩa với việc phải thu thập ngày càng nhiều dữ liệu.**

## Đưa nguyên tắc tối thiểu hóa dữ liệu vào chính kiến trúc hệ thống

Trong nhiều quy định về bảo vệ dữ liệu hiện nay, một nguyên tắc quan trọng là chỉ thu thập dữ liệu phù hợp với mục đích.

Nhưng trong thực tế, hệ thống vẫn thường thu cả tài liệu rồi mới cố gắng kiểm soát cách dữ liệu được sử dụng sau đó.

Tiết lộ có chọn lọc tạo ra một hướng tiếp cận khác.

Thay vì:

**“Chúng tôi nhận toàn bộ dữ liệu nhưng cam kết chỉ sử dụng phần cần thiết.”**

hệ thống có thể tiến gần hơn tới:

**“Chúng tôi không nhận phần dữ liệu không cần thiết ngay từ đầu.”**

Đây là sự khác biệt giữa bảo vệ dữ liệu chủ yếu bằng chính sách và đưa nguyên tắc bảo vệ dữ liệu trực tiếp vào kiến trúc kỹ thuật.

Đối với nhà hoạch định chính sách, đây có thể là một thay đổi đặc biệt đáng chú ý.

## Tiết lộ có chọn lọc không có nghĩa là luôn ẩn danh

Cũng cần nhìn nhận giới hạn của cơ chế này.

Không phải giao dịch nào cũng chỉ cần một vài thuộc tính.

Trong nhiều trường hợp, tổ chức có thể có nghĩa vụ pháp lý hoặc lý do chính đáng để xác minh đầy đủ danh tính của một người hay doanh nghiệp.

Một số giao dịch tài chính, hợp đồng có giá trị lớn hoặc thủ tục hành chính có thể yêu cầu nhiều thông tin hơn.

Tiết lộ có chọn lọc không có nghĩa là:

**“Người dùng không bao giờ phải chia sẻ danh tính.”**

Nó có nghĩa là:

**Mỗi giao dịch chỉ nên yêu cầu lượng thông tin phù hợp với mục đích và mức độ rủi ro của giao dịch đó.**

Đây là một nguyên tắc thực tế hơn và cũng là cách để công nghệ này có thể được áp dụng trong đời sống.

## Từ thu thập dữ liệu sang yêu cầu bằng chứng

Internet hiện nay phần lớn được xây dựng quanh việc thu thập dữ liệu.

Doanh nghiệp yêu cầu thông tin, lưu lại một bản sao rồi tự xây dựng quy trình xác minh và bảo vệ kho dữ liệu của mình.

Tiết lộ có chọn lọc mở ra một tư duy khác:

**Trước tiên hãy xác định điều cần biết, sau đó yêu cầu đúng bằng chứng cho điều đó.**

Khi được kết hợp với thực chứng và ví định tín, cách tiếp cận này có thể giúp:

- giảm lượng dữ liệu phải chia sẻ;
- giảm dữ liệu doanh nghiệp phải lưu trữ;
- giảm thiệt hại khi xảy ra rò rỉ;
- hạn chế khả năng liên kết hoạt động của người dùng;
- tăng quyền kiểm soát dữ liệu của chủ thể;
- vẫn giữ được khả năng xác minh và tự động hóa.

Đây là lý do tiết lộ có chọn lọc không nên được xem đơn thuần là một tính năng về quyền riêng tư.

Nó đại diện cho một thay đổi trong cách chúng ta nghĩ về dữ liệu: **hệ thống không cần biết mọi thứ về một chủ thể để có thể tin vào điều cần thiết cho một giao dịch.**

Trong thế giới số, bảo vệ dữ liệu tốt không chỉ là xây những bức tường ngày càng cao quanh các kho dữ liệu khổng lồ.

Đôi khi, giải pháp tốt hơn là ngay từ đầu **đừng thu thập những dữ liệu mà chúng ta không thực sự cần**.`,
    },
  },
} satisfies StructuredBlogArticle;
