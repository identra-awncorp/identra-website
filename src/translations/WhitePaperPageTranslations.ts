/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Language } from '../context/LanguageContext';

export type WhitePaperSectionId =
  | 'foundational-concepts'
  | 'executive-summary'
  | 'chapter-1'
  | 'chapter-2'
  | 'chapter-3'
  | 'chapter-4'
  | 'chapter-5'
  | 'chapter-6'
  | 'chapter-7'
  | 'chapter-8'
  | 'chapter-9'
  | 'chapter-10'
  | 'conclusion'
  | 'appendix-a'
  | 'appendix-b'
  | 'appendix-c';

export type WhitePaperInfoCard = {
  readonly title: string;
  readonly body: string;
};

export type WhitePaperTable = {
  readonly headers: readonly string[];
  readonly rows: readonly (readonly string[])[];
};

export type WhitePaperContentBlock =
  | { readonly type: 'heading'; readonly text: string }
  | { readonly type: 'paragraph'; readonly text: string }
  | { readonly type: 'quote'; readonly title?: string; readonly body: string }
  | { readonly type: 'unordered-list'; readonly items: readonly string[] }
  | { readonly type: 'ordered-list'; readonly items: readonly string[] }
  | ({ readonly type: 'table' } & WhitePaperTable);

export type WhitePaperSection = {
  readonly id: WhitePaperSectionId;
  readonly eyebrow: string;
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly blocks?: readonly WhitePaperContentBlock[];
  readonly cards?: readonly WhitePaperInfoCard[];
  readonly bulletsTitle?: string;
  readonly bullets?: readonly string[];
  readonly table?: WhitePaperTable;
  readonly orderedTitle?: string;
  readonly ordered?: readonly string[];
  readonly note?: WhitePaperInfoCard;
};

export type WhitePaperCopy = {
  readonly backToLanding: string;
  readonly versionBadge: string;
  readonly publisher: string;
  readonly copyLink: string;
  readonly copied: string;
  readonly downloadPdf: string;
  readonly copyLinkTitle: string;
  readonly mobileTocTitle: string;
  readonly desktopTocTitle: string;
  readonly tocAriaLabel: string;
  readonly searchPlaceholder: string;
  readonly noTocResults: string;
  readonly heroBadge: string;
  readonly heroTitle: string;
  readonly heroSubtitle: string;
  readonly metadata: readonly WhitePaperInfoCard[];
  readonly callouts: readonly (WhitePaperInfoCard & { readonly tone: 'accent' | 'success' })[];
  readonly cta: string;
  readonly attribution: string;
  readonly sections: readonly WhitePaperSection[];
};

type WhitePaperUiCopy = Omit<
  WhitePaperCopy,
  | 'versionBadge'
  | 'publisher'
  | 'heroBadge'
  | 'heroTitle'
  | 'heroSubtitle'
  | 'metadata'
  | 'callouts'
  | 'attribution'
  | 'sections'
>;

const OFFICIAL_WHITE_PAPER_DOCUMENT = {
  "versionBadge": "SÁCH TRẮNG v1.0",
  "publisher": "AwnCorp / Identra",
  "heroBadge": "Phiên bản 1.0 - Tháng 07/2026",
  "heroTitle": "SÁCH TRẮNG IDENTRA",
  "heroSubtitle": "Siêu ứng dụng cho dữ liệu có thể kiểm chứng và giao dịch bằng hợp đồng thông minh",
  "metadata": [
    {
      "title": "Phiên bản",
      "body": "1.0 - Tháng 07/2026"
    },
    {
      "title": "Tác giả",
      "body": "Đội ngũ Nghiên cứu và Phát triển AwnCorp / Identra"
    },
    {
      "title": "Thị trường triển khai đầu tiên",
      "body": "Việt Nam"
    },
    {
      "title": "Định hướng",
      "body": "Liên thông quốc tế dựa trên tiêu chuẩn mở"
    }
  ],
  "callouts": [
    {
      "title": "Trạng thái phát triển",
      "body": "Tại thời điểm công bố, Identra đang trong giai đoạn nghiên cứu, thiết kế UI/UX và hoàn thiện kiến trúc sản phẩm. Những năng lực và chỉ số nêu trong sách trắng là mục tiêu thiết kế, sẽ có sự thay đổi sau khi các nguyên mẫu được xây dựng, thử nghiệm, kiểm toán và triển khai thực tế.",
      "tone": "accent"
    },
    {
      "title": "Phạm vi",
      "body": "Sách trắng trình bày tầm nhìn, mô hình vận hành, giá trị kinh tế - xã hội, nền tảng xác minh dành cho tổ chức, vai trò của hợp đồng thông minh, mô hình kinh doanh và lộ trình phát triển Identra.",
      "tone": "success"
    }
  ],
  "attribution": "AwnCorp / Identra - Phiên bản 1.0 - Tháng 07/2026",
  "sections": [
    {
      "id": "foundational-concepts",
      "eyebrow": "NỀN TẢNG",
      "title": "HAI KHÁI NIỆM NỀN TẢNG",
      "paragraphs": [],
      "blocks": [
        {
          "type": "paragraph",
          "text": "**Thực chứng** là một tập hợp dữ liệu có cấu trúc, chứa một hoặc nhiều tuyên bố về một chủ thể, được bên phát hành ký bằng mật mã và trao cho bên nắm giữ. Chữ ký này cho phép bên xác minh kiểm tra nguồn gốc, tính toàn vẹn và trạng thái của thông tin mà không cần liên hệ trực tiếp với bên phát hành."
        },
        {
          "type": "paragraph",
          "text": "**Hợp đồng thông minh** là chương trình tự động thực hiện các điều khoản đã được các bên chấp thuận khi những điều kiện xác định trước được đáp ứng. Trong Identra, hợp đồng thông minh sử dụng dữ liệu đã được xác minh để thực hiện thanh toán, chuyển quyền, ký quỹ, cấp quyền truy cập hoặc ghi nhận việc hoàn thành nghĩa vụ."
        },
        {
          "type": "paragraph",
          "text": "Hai khái niệm này bổ sung cho nhau: thực chứng cung cấp căn cứ đáng tin cậy, còn hợp đồng thông minh biến căn cứ đó thành hành động có thể kiểm toán."
        }
      ]
    },
    {
      "id": "executive-summary",
      "eyebrow": "TÓM TẮT ĐIỀU HÀNH",
      "title": "TÓM TẮT ĐIỀU HÀNH",
      "paragraphs": [],
      "blocks": [
        {
          "type": "paragraph",
          "text": "Identra là siêu ứng dụng nơi con người thực hiện các hoạt động số trên một nền tảng thống nhất, với quyền riêng tư, quyền tự chủ dữ liệu và niềm tin có thể kiểm chứng bằng mật mã làm nền tảng. Giá trị của Identra không nằm ở việc gom nhiều chức năng vào cùng một ứng dụng, mà ở khả năng kết nối dữ liệu đáng tin cậy với quyền hạn, hợp đồng, thanh toán và dịch vụ trong một chu trình thống nhất."
        },
        {
          "type": "paragraph",
          "text": "Kiến trúc Identra được xây dựng trên hai trụ cột ngang hàng: **dữ liệu có thể kiểm chứng** và **hợp đồng thông minh**."
        },
        {
          "type": "paragraph",
          "text": "Dữ liệu có thể kiểm chứng cho phép cá nhân, doanh nghiệp, tổ chức và thiết bị chứng minh danh tính, thuộc tính, quyền hạn, trạng thái và lịch sử hoạt động bằng bằng chứng mật mã. Thực chứng được nguồn có thẩm quyền phát hành, lưu trong Ví định tín của người nắm giữ và trình xuất theo sự đồng thuận của chủ thể. Bên xác minh kiểm tra nguồn gốc, tính toàn vẹn, trạng thái hiệu lực và thẩm quyền phát hành mà không phụ thuộc vào bản sao, chụp giấy tờ hoặc quy trình đối chiếu thủ công."
        },
        {
          "type": "paragraph",
          "text": "Hợp đồng thông minh biến dữ liệu thành hành động. Khi các điều kiện về danh tính, quyền hạn, tài sản hoặc trạng thái đã được chứng minh, hợp đồng thực thi quy tắc đã thống nhất: ký quỹ, thanh toán, giải ngân, chuyển quyền, cấp quyền truy cập, phát hành tài sản hoặc ghi nhận việc hoàn thành nghĩa vụ. Sự kết hợp này tạo ra giao dịch số có chủ thể rõ ràng, điều kiện minh bạch và dấu vết kiểm toán đầy đủ."
        },
        {
          "type": "paragraph",
          "text": "Đối với người dùng, Identra là siêu ứng dụng giúp các hoạt động của người dùng diễn ra trơn tru và liền mạch trên một nền tảng duy nhất: quản lý thực chứng, đăng nhập không mật khẩu, giao tiếp, ký hợp đồng, thanh toán, sử dụng Mini App và truy cập dịch vụ công hoặc thương mại trong một giao diện thống nhất. Mỗi yêu cầu sử dụng dữ liệu đều thể hiện rõ bên nhận, mục đích, phạm vi và thời hạn trước khi người dùng phê duyệt."
        },
        {
          "type": "paragraph",
          "text": "Đối với tổ chức, Identra cung cấp nền tảng xác minh và tuân thủ qua API, SDK và giao diện quản trị. Doanh nghiệp tích hợp các quy trình xác minh cá nhân, xác minh doanh nghiệp, kiểm tra giấy tờ, sinh trắc học, đánh giá rủi ro, KYC, KYB, AML, xác minh độ tuổi, học vấn và nhân sự; đồng thời quản lý đồng thuận, tái xác minh và bằng chứng kiểm toán. Kết quả xác minh được đưa thẳng vào quy trình mở tài khoản, tuyển dụng, cho vay, bảo hiểm, thương mại điện tử, dịch vụ công, thanh toán hoặc hợp đồng thông minh."
        },
        {
          "type": "paragraph",
          "text": "Identra còn tạo cầu nối liên thông dữ liệu giữa các tổ chức trong nước và quốc tế. Dữ liệu do cơ quan nhà nước, trường đại học, ngân hàng, bệnh viện, doanh nghiệp hoặc tổ chức có thẩm quyền phát hành được biểu diễn dưới dạng thực chứng theo tiêu chuẩn mở. Người dùng có thể sử dụng các bằng chứng này để truy cập nhiều dịch vụ mà không phải lặp lại toàn bộ quy trình xác minh. Tổ chức tiếp nhận vẫn kiểm tra nguồn phát hành, mức bảo đảm, phạm vi sử dụng và trạng thái hiện tại trước khi đưa ra quyết định."
        },
        {
          "type": "paragraph",
          "text": "Trong hệ sinh thái AWNCorp, CertNet cung cấp hạ tầng tin cậy công khai phục vụ định danh tự chủ và các dịch vụ số có nhu cầu xác minh cao; Therabit cung cấp môi trường thực thi bảo mật cho các tác nhân SSI và hợp đồng thông minh bên ngoài chuỗi; IDPay đảm nhiệm vai trò ví điện tử hỗ trợ đa dạng hình thức thanh toán; Identra là nơi các thành phần trong hệ sinh thái được kết nối với nhau để tạo thành một trải nghiệm đơn giản, và thống nhất cho người dùng."
        },
        {
          "type": "paragraph",
          "text": "Doanh thu cốt lõi của Identra đến từ phí giao dịch hợp đồng thông minh và dịch vụ API/SDK dành cho tổ chức. Các nguồn thu bổ sung gồm SaaS phát hành và xác minh, dịch vụ lưu ký, tích hợp doanh nghiệp, tư vấn khung tin cậy, Mini App, IDPay và giao dịch tài sản số khi đủ điều kiện pháp lý. Quảng cáo bị tắt theo mặc định. Người dùng chỉ nhận quảng cáo khi chủ động cấp quyền sử dụng một số thuộc tính và được chia sẻ phần lớn giá trị phát sinh dưới dạng token Plan A (token thanh toán của mạng CertNet)."
        },
        {
          "type": "paragraph",
          "text": "Việt Nam là thị trường triển khai đầu tiên. Giai đoạn khởi đầu tập trung vào người dùng phổ thông, sinh viên, người lao động, doanh nghiệp nhỏ và tổ chức giáo dục. Lộ trình 2026-2030 lần lượt xây dựng ví định tín và các kịch bản SSI mẫu; nền tảng phát hành, xác minh và API doanh nghiệp; IDPay và hệ sinh thái Mini App; hệ sinh thái theo ngành; sau đó mở rộng kết nối trong khu vực và quốc tế."
        }
      ]
    },
    {
      "id": "chapter-1",
      "eyebrow": "CHƯƠNG 1",
      "title": "BỐI CẢNH VÀ BÀI TOÁN IDENTRA GIẢI QUYẾT",
      "paragraphs": [],
      "blocks": [
        {
          "type": "heading",
          "text": "1.1. Dữ liệu số vẫn bị chia cắt"
        },
        {
          "type": "paragraph",
          "text": "Một người thường có thông tin nằm rải rác trong nhiều hệ thống: cơ sở dữ liệu công dân, ngân hàng, trường học, nơi làm việc, bệnh viện và các dịch vụ trực tuyến. Mỗi nơi chỉ nắm một phần thông tin, áp dụng quy tắc riêng và thường yêu cầu người dùng xác minh lại từ đầu."
        },
        {
          "type": "paragraph",
          "text": "Sự phân mảnh này tạo ra chi phí lớn cho cả hai phía. Người dùng liên tục phải nhập lại thông tin, tải ảnh giấy tờ, chụp khuôn mặt và chờ phê duyệt. Doanh nghiệp phải xây dựng quy trình tiếp nhận, kiểm tra, lưu trữ, cập nhật và bảo vệ cùng một nhóm dữ liệu. Khi một người sử dụng mười dịch vụ, mười bản sao của cùng giấy tờ cùng tồn tại trong mười hệ thống khác nhau."
        },
        {
          "type": "paragraph",
          "text": "Cách tích hợp trực tiếp giữa từng cặp hệ thống chỉ giải quyết được từng mối quan hệ riêng lẻ. Mỗi tổ chức phải xây dựng kết nối với từng nguồn dữ liệu, duy trì thỏa thuận chia sẻ và xử lý nhiều định dạng khác nhau. Khi số đối tác tăng, chi phí tích hợp và vận hành cũng tăng theo, trong khi người dùng vẫn thiếu một nơi thống nhất để quản lý quyền truy cập dữ liệu."
        },
        {
          "type": "heading",
          "text": "1.2. Xác minh hiện tại dựa nhiều vào bản sao"
        },
        {
          "type": "paragraph",
          "text": "Bản scan, ảnh chụp và dữ liệu nhập tay không tự chứng minh được nguồn gốc và tính xác thực. Bên tiếp nhận phải kiểm tra bằng mắt, gọi điện đối chiếu, kết nối cơ sở dữ liệu hoặc sử dụng dịch vụ xác minh trung gian. Sau khi hoàn thành, tổ chức thường giữ lại toàn bộ bản sao để phục vụ kiểm toán và xử lý tranh chấp."
        },
        {
          "type": "paragraph",
          "text": "Việc lưu trữ dữ liệu nhiều hơn mức cần thiết làm tăng nguy cơ rò rỉ và lạm dụng dữ liệu. Chẳng hạn, một dịch vụ chỉ cần xác nhận người dùng đã đủ 18 tuổi nhưng lại giữ cả ngày sinh, số giấy tờ và địa chỉ; một nhà tuyển dụng chỉ cần kiểm tra bằng cấp nhưng nhận toàn bộ hồ sơ cá nhân; một nền tảng chỉ cần biết doanh nghiệp còn hoạt động nhưng vẫn lưu trọn bộ hồ sơ pháp lý."
        },
        {
          "type": "paragraph",
          "text": "Identra thay thế việc gửi đi bản sao bằng việc chia sẻ bằng chứng. Tổ chức phát hành ký dữ liệu một lần. Người dùng giữ thực chứng. Bên xác minh kiểm tra chữ ký, trạng thái và quyền phát hành. Kết quả xác minh được lưu ở mức tối thiểu phù hợp với mục đích và nghĩa vụ pháp lý."
        },
        {
          "type": "heading",
          "text": "1.3. Xác minh và giao dịch đang bị tách rời"
        },
        {
          "type": "paragraph",
          "text": "Hầu hết các hệ thống định danh dừng ở câu trả lời “người này là ai” hoặc “tài liệu này có hợp lệ không”. Tuy nhiên, giá trị kinh tế xuất hiện ở bước tiếp theo: người đó được quyền làm gì, giao dịch nào được phép thực hiện, điều kiện nào phải hoàn thành và tài sản được chuyển giao ra sao."
        },
        {
          "type": "paragraph",
          "text": "Giá trị của việc xác minh chỉ thực sự xuất hiện khi kết quả đó được đưa vào một quyết định hoặc giao dịch. Bằng cấp hợp lệ hỗ trợ quyết định tuyển dụng; hóa đơn và dòng tiền đã được xác minh tạo căn cứ cấp tín dụng; giấy phép còn hiệu lực mở ra quyền hành nghề; vé hợp lệ cho phép vào sự kiện; quyền đại diện được chứng minh cho phép một cá nhân ký kết nhân danh doanh nghiệp."
        },
        {
          "type": "paragraph",
          "text": "Identra kết nối xác minh với hợp đồng thông minh. Dữ liệu chứng minh điều kiện; hợp đồng thực thi kết quả. Đây là khác biệt nền tảng giữa Identra và một ứng dụng ví đơn thuần hoặc một dịch vụ xác minh tách biệt."
        },
        {
          "type": "heading",
          "text": "1.4. Nhu cầu liên thông trong nước và quốc tế"
        },
        {
          "type": "paragraph",
          "text": "Dữ liệu do một tổ chức phát hành thường chỉ có giá trị trong hệ thống hoặc phạm vi đối tác trực tiếp của tổ chức đó. Bằng cấp điện tử, kết quả KYC, giấy phép, chứng nhận nghề nghiệp và hồ sơ doanh nghiệp chưa có cơ chế phổ quát để được tái sử dụng trên nhiều dịch vụ và xuyên biên giới."
        },
        {
          "type": "paragraph",
          "text": "Identra tạo cầu nối bằng tiêu chuẩn mở, lược đồ dữ liệu và khung tin cậy. Dữ liệu chính thức vẫn do cơ quan nhà nước, trường đại học, ngân hàng, bệnh viện và doanh nghiệp có thẩm quyền quản lý và chịu trách nhiệm. Identra cung cấp API/SDK giúp các bên phát hành các giấy tờ, chứng chỉ, bằng cấp dưới dạng thực chứng để người dùng chủ động lưu trữ và chia sẻ cho các dịch vụ khác, nơi chúng được kiểm tra độc lập trước khi sử dụng."
        },
        {
          "type": "paragraph",
          "text": "Đối với Việt Nam, cách tiếp cận này mở rộng giá trị của hạ tầng định danh chính thức sang khu vực tư nhân và đối tác quốc tế. Đối với tổ chức nước ngoài, Identra cung cấp cơ chế tiếp nhận bằng chứng từ Việt Nam theo nguồn phát hành, mức bảo đảm và chính sách sử dụng rõ ràng."
        }
      ]
    },
    {
      "id": "chapter-2",
      "eyebrow": "CHƯƠNG 2",
      "title": "IDENTRA LÀ GÌ?",
      "paragraphs": [],
      "blocks": [
        {
          "type": "heading",
          "text": "2.1. Tuyên bố tầm nhìn"
        },
        {
          "type": "paragraph",
          "text": "**Identra là siêu ứng dụng nơi con người thực hiện các hoạt động số trên một nền tảng thống nhất, với quyền riêng tư, quyền tự chủ dữ liệu và niềm tin có thể kiểm chứng làm nền tảng.**"
        },
        {
          "type": "paragraph",
          "text": "Identra mang đến một trải nghiệm thống nhất trong quá trình sử dụng dịch vụ, cấp quyền truy cập, xác minh thông tin và thực hiện giao dịch, nhưng không tập trung toàn bộ dữ liệu vào một kho lưu trữ duy nhất. Thay vào đó, mỗi loại thông tin được duy trì tại nơi phù hợp với chức năng và trách nhiệm quản lý của nó: thực chứng được lưu trong Ví định tín của người dùng; dữ liệu gốc tiếp tục nằm tại hệ thống của bên phát hành; bản sao dự phòng được bảo quản trong hạ tầng lưu ký; còn trạng thái hiệu lực và độ tin cậy được ghi nhận tại các sổ đăng ký chuyên trách."
        },
        {
          "type": "heading",
          "text": "2.2. Ba vai trò của Identra"
        },
        {
          "type": "paragraph",
          "text": "Identra tham gia thị trường thông qua ba vai trò bổ trợ chặt chẽ cho nhau, tạo thành một hệ sinh thái thống nhất từ quản lý dữ liệu, xác minh thông tin đến thực hiện giao dịch."
        },
        {
          "type": "paragraph",
          "text": "**Siêu ứng dụng dành cho người dùng.** Identra cung cấp một không gian số thống nhất, nơi người dùng có thể giao tiếp, quản lý dữ liệu cá nhân, tiếp nhận và trình xuất thực chứng, ký kết hợp đồng, thanh toán, sử dụng Mini App và tiếp cận các dịch vụ số. Thay vì phải chuyển đổi giữa nhiều ứng dụng và tài khoản riêng biệt, người dùng có thể thực hiện các hoạt động này thông qua một giao diện nhất quán, đồng thời duy trì quyền kiểm soát đối với dữ liệu và danh tính của mình."
        },
        {
          "type": "paragraph",
          "text": "**Nền tảng xác minh và tuân thủ dành cho tổ chức.** Thông qua API và SDK, doanh nghiệp và cơ quan có thể tích hợp khả năng xác minh cá nhân, tổ chức, giấy tờ, dữ liệu, quyền hạn và trạng thái pháp lý vào quy trình nghiệp vụ hiện có. Nền tảng hỗ trợ triển khai các quy trình KYC, KYB, AML, tái xác minh, quản lý sự chấp thuận của người dùng và lưu vết phục vụ kiểm toán, qua đó giảm thao tác thủ công, hạn chế gian lận và nâng cao khả năng tuân thủ."
        },
        {
          "type": "paragraph",
          "text": "**Hạ tầng giao dịch đáng tin cậy cho hệ sinh thái.** Identra kết nối kết quả xác minh với hợp đồng thông minh, thanh toán và các quy trình thực thi số. Nhờ đó, mỗi giao dịch không chỉ dựa trên thông tin do các bên tự khai báo, mà được thực hiện dựa trên danh tính, quyền hạn, trạng thái và các điều kiện đã được xác minh. Cơ chế này tạo nền tảng để cá nhân và tổ chức giao dịch với nhau an toàn hơn, minh bạch hơn và giảm sự phụ thuộc vào các khâu kiểm tra trung gian."
        },
        {
          "type": "heading",
          "text": "2.3. Đối tượng phục vụ"
        },
        {
          "type": "paragraph",
          "text": "Identra được thiết kế để phục vụ nhiều nhóm chủ thể trong nền kinh tế số, từ người dùng cá nhân đến doanh nghiệp, cơ quan quản lý và nhà phát triển. Mỗi nhóm tiếp cận Identra theo nhu cầu riêng, nhưng cùng sử dụng một nền tảng thống nhất để quản lý danh tính, xác minh thông tin và thực hiện giao dịch."
        },
        {
          "type": "table",
          "headers": [
            "Nhóm",
            "Nhu cầu chính",
            "Giá trị Identra cung cấp"
          ],
          "rows": [
            [
              "Người dùng phổ thông",
              "Quản lý các hoạt động số tại một nơi, giảm sự phụ thuộc vào mật khẩu và hạn chế phải cung cấp lại giấy tờ nhiều lần",
              "Ví định tín, xác thực bằng passkey, quyền kiểm soát dữ liệu cùng khả năng ký kết hợp đồng và thanh toán trong một trải nghiệm thống nhất"
            ],
            [
              "Sinh viên và người lao động",
              "Chứng minh học vấn, kỹ năng, kinh nghiệm làm việc và các quyền lợi liên quan",
              "Hồ sơ có thể xác minh, quy trình ứng tuyển nhanh hơn và khả năng hạn chế bằng giả, chứng chỉ giả hoặc thông tin khai báo không chính xác"
            ],
            [
              "Doanh nghiệp nhỏ",
              "Chứng minh tư cách pháp lý, lịch sử giao dịch, hóa đơn, dòng tiền và mức độ uy tín",
              "Hồ sơ kinh doanh có thể xác minh, khả năng tự động hóa hợp đồng và cơ sở tin cậy để tiếp cận các dịch vụ tài chính"
            ],
            [
              "Doanh nghiệp và nền tảng số",
              "Xác minh người dùng, tổ chức và giao dịch, đồng thời đáp ứng các yêu cầu về quản trị rủi ro và tuân thủ",
              "API, SDK, quy trình xác minh, công cụ đánh giá rủi ro và nhật ký phục vụ kiểm toán"
            ],
            [
              "Cơ quan quản lý",
              "Thúc đẩy liên thông dữ liệu nhưng vẫn duy trì thẩm quyền đối với các nguồn thông tin chính thức",
              "Cơ chế phát hành và xác minh thông tin, nguyên tắc tối thiểu hóa dữ liệu cùng khả năng truy vết và kiểm toán có trách nhiệm"
            ],
            [
              "Nhà phát triển",
              "Tích hợp danh tính, dữ liệu và giao dịch vào sản phẩm mà không phải tự xây dựng toàn bộ hạ tầng từ đầu",
              "SDK, API, Mini App và hợp đồng thông minh được triển khai thông qua các giao diện tích hợp thống nhất"
            ]
          ]
        },
        {
          "type": "heading",
          "text": "2.4. Ranh giới hoạt động"
        },
        {
          "type": "paragraph",
          "text": "Identra bổ trợ cho các nguồn định danh chính thức, không thay thế hệ thống định danh quốc gia hoặc thẩm quyền của cơ quan quản lý. Dữ liệu gốc tiếp tục được duy trì tại hệ thống của đơn vị có thẩm quyền, đồng thời đơn vị phát hành chịu trách nhiệm đối với tính chính xác và hiệu lực của thông tin. Identra mở rộng khả năng sử dụng các thông tin này trong môi trường số thông qua cơ chế cấp, lưu trữ, chia sẻ và xác minh thực chứng."
        },
        {
          "type": "paragraph",
          "text": "Dữ liệu cá nhân không được ghi trực tiếp lên CertNet. Chuỗi nền tảng chỉ lưu trữ những thành phần công khai tối thiểu cần thiết để xác minh nguồn gốc, kiểm tra trạng thái, đối chiếu tính toàn vẹn và hỗ trợ kiểm toán. Các thông tin nhạy cảm tiếp tục được lưu trữ ngoài chuỗi tại Ví định tín, hệ thống của bên phát hành hoặc hạ tầng lưu ký phù hợp."
        },
        {
          "type": "paragraph",
          "text": "Quảng cáo không xuất hiện theo mặc định trong Identra. Người dùng chủ động quyết định việc tiếp nhận quảng cáo, phạm vi thuộc tính được chia sẻ và thời hạn cấp quyền. Mọi hoạt động khai thác dữ liệu cho mục đích quảng cáo phải dựa trên sự chấp thuận rõ ràng và có thể thu hồi của người dùng."
        },
        {
          "type": "paragraph",
          "text": "Tài sản số là một loại giá trị được Identra hỗ trợ trong quá trình lưu trữ, trao đổi và thực hiện giao dịch, nhưng không phải yếu tố định nghĩa toàn bộ sản phẩm. Kiến trúc trung tâm của Identra được xây dựng trên Ví định tín, thực chứng và hợp đồng thông minh, qua đó kết nối danh tính, dữ liệu có thể xác minh và các giao dịch số trong một môi trường thống nhất."
        }
      ]
    },
    {
      "id": "chapter-3",
      "eyebrow": "CHƯƠNG 3",
      "title": "HAI TRỤ CỘT CỦA IDENTRA",
      "paragraphs": [],
      "blocks": [
        {
          "type": "heading",
          "text": "3.1. Dữ liệu có thể kiểm chứng"
        },
        {
          "type": "paragraph",
          "text": "Dữ liệu có thể kiểm chứng không chỉ chứa thông tin, mà còn đi kèm bằng chứng cho phép xác định nguồn phát hành, kiểm tra tính toàn vẹn và đối chiếu trạng thái hiệu lực. Trong Identra, đơn vị cơ bản để trao đổi thông tin đáng tin cậy là **thực chứng**."
        },
        {
          "type": "paragraph",
          "text": "Mỗi thực chứng chứa một hoặc nhiều tuyên bố về cá nhân, tổ chức, tài sản hoặc thiết bị. Chẳng hạn, trường đại học xác nhận một người đã hoàn thành chương trình đào tạo; ngân hàng xác nhận một tài khoản thuộc về doanh nghiệp; cơ quan có thẩm quyền xác nhận giấy phép còn hiệu lực; hoặc nhà sản xuất xác nhận nguồn gốc của một lô hàng."
        },
        {
          "type": "paragraph",
          "text": "Thực chứng được bên phát hành cấp cho bên nắm giữ và lưu trữ trong Ví định tín. Khi một dịch vụ yêu cầu bằng chứng, người dùng được thông báo rõ về dữ liệu cần cung cấp, mục đích sử dụng và bên tiếp nhận. Sau khi người dùng chấp thuận, Ví định tín tạo bản trình xuất chỉ chứa những thông tin cần thiết cho giao dịch. Bên xác minh sau đó kiểm tra bằng chứng mật mã, trạng thái hiệu lực và chính sách tin cậy áp dụng đối với nguồn phát hành."
        },
        {
          "type": "paragraph",
          "text": "Mô hình này tạo ra bốn chuyển biến quan trọng:"
        },
        {
          "type": "unordered-list",
          "items": [
            "dữ liệu được phát hành một lần và có thể tái sử dụng dưới sự kiểm soát của người dùng;",
            "bên xác minh giảm sự phụ thuộc vào bản chụp giấy tờ và các bước kiểm tra thủ công;",
            "tổ chức phát hành không phải xây dựng và duy trì cổng xác minh riêng cho từng đối tác;",
            "dữ liệu nhạy cảm chỉ được chia sẻ ở phạm vi tối thiểu phù hợp với mục đích sử dụng."
          ]
        },
        {
          "type": "heading",
          "text": "3.2. Hợp đồng thông minh"
        },
        {
          "type": "paragraph",
          "text": "Hợp đồng thông minh là chương trình tự động thực thi các quy tắc, điều kiện và nghĩa vụ đã được các bên thiết lập hoặc chấp thuận. Trong Identra, hợp đồng thông minh không chỉ phục vụ giao dịch tài sản số, mà còn thể hiện logic thực thi của các giao dịch số nói chung."
        },
        {
          "type": "paragraph",
          "text": "Một hợp đồng thông minh có thể xác định:"
        },
        {
          "type": "unordered-list",
          "items": [
            "các bên tham gia giao dịch;",
            "tư cách, quyền hạn và phạm vi trách nhiệm của từng bên;",
            "dữ liệu hoặc thực chứng cần được cung cấp;",
            "sự kiện hoặc điều kiện kích hoạt nghĩa vụ;",
            "thời điểm tiền, tài sản hoặc quyền được chuyển giao;",
            "các trường hợp giao dịch bị từ chối, hoàn tiền hoặc chuyển sang quy trình giải quyết tranh chấp;",
            "những bằng chứng cần được lưu giữ để đối chiếu và kiểm toán."
          ]
        },
        {
          "type": "paragraph",
          "text": "Hợp đồng thông minh trong Identra sử dụng dữ liệu đã được xác minh làm đầu vào cho quá trình thực thi. Một địa chỉ ví hoặc chữ ký mật mã chỉ chứng minh quyền kiểm soát khóa, nhưng chưa đủ để xác nhận người ký có quyền đại diện cho doanh nghiệp hoặc thực hiện một giao dịch cụ thể. Identra bổ sung các thực chứng về tư cách pháp nhân, quyền đại diện, giấy phép, quyền sở hữu hoặc trạng thái tuân thủ. Nhờ đó, hợp đồng thông minh có thể thực thi dựa trên danh tính, tư cách và quyền hạn đã được chứng minh, thay vì chỉ dựa trên địa chỉ ví và khóa mật mã."
        },
        {
          "type": "heading",
          "text": "3.3. Chu trình giao dịch đáng tin cậy"
        },
        {
          "type": "paragraph",
          "text": "Identra tổ chức giao dịch thành một chu trình liên tục, trong đó danh tính, quyền hạn, dữ liệu, sự chấp thuận và điều kiện thực thi được kiểm tra trước khi giá trị hoặc quyền được chuyển giao. Mỗi bước tạo ra bằng chứng cần thiết cho bước tiếp theo, giúp giao dịch không chỉ xác định được người đã thực hiện hành động, mà còn chứng minh được họ có đủ tư cách và quyền hạn để thực hiện hành động đó."
        },
        {
          "type": "paragraph",
          "text": "Chu trình giao dịch đáng tin cậy gồm bảy bước:"
        },
        {
          "type": "ordered-list",
          "items": [
            "**Chứng minh:** Các bên trình thực chứng về danh tính, tư cách, quyền hạn, tài sản hoặc trạng thái có liên quan đến giao dịch.",
            "**Đánh giá:** Hệ thống kiểm tra nguồn phát hành, tính toàn vẹn, trạng thái hiệu lực của thực chứng và các điều kiện nghiệp vụ áp dụng.",
            "**Cấp quyền:** Người dùng hoặc tổ chức xem xét và chấp thuận phạm vi dữ liệu được chia sẻ, quyền được trao và hành động được phép thực hiện.",
            "**Cam kết:** Các bên ký hợp đồng hoặc chấp nhận điều khoản giao dịch bằng khóa mật mã được bảo vệ trong Ví định tín hoặc hệ thống tương thích.",
            "**Thanh toán hoặc ký quỹ:** IDPay hoặc phương thức thanh toán tương thích xử lý khoản thanh toán, tài sản bảo đảm hoặc giá trị được cam kết trong giao dịch.",
            "**Thực thi:** Hợp đồng thông minh thực hiện các quy tắc đã được thống nhất khi những điều kiện cần thiết được đáp ứng.",
            "**Ghi nhận:** Kết quả giao dịch, biên nhận, trạng thái thực thi và bằng chứng phục vụ đối chiếu, giải quyết tranh chấp hoặc kiểm toán được lưu trữ theo chính sách áp dụng."
          ]
        },
        {
          "type": "paragraph",
          "text": "Chu trình này kết nối việc xác minh với hành động thực tế. Kết quả xác minh không dừng lại ở việc xác nhận thông tin, mà trở thành cơ sở để cấp quyền, ký kết, thanh toán và thực thi giao dịch. Nhờ đó, Identra hình thành một dòng giao dịch có thể kiểm chứng từ thời điểm các bên chứng minh tư cách đến khi nghĩa vụ được hoàn tất và kết quả được ghi nhận."
        },
        {
          "type": "heading",
          "text": "3.4. Ví dụ: chuyển nhượng vé sự kiện"
        },
        {
          "type": "paragraph",
          "text": "Vé được phát hành dưới dạng thực chứng vào Ví định tín của người mua, bao gồm đầy đủ thông tin về sự kiện, hạng vé, quyền tham dự, trạng thái sử dụng và các điều kiện chuyển nhượng. Khi người A muốn chuyển nhượng vé cho người B, giao dịch được thực hiện thông qua một hợp đồng thông minh trên Theranet, trong đó xác định rõ vé được chuyển nhượng, giá bán, điều kiện thanh toán cũng như các yêu cầu mà người nhận vé cần đáp ứng. Identra đóng vai trò điều phối toàn bộ quá trình, từ xác minh, thanh toán đến chuyển giao quyền sử dụng."
        },
        {
          "type": "paragraph",
          "text": "Trước khi giao dịch được thực hiện, Identra tiến hành kiểm tra tính hợp lệ của vé, bao gồm việc xác nhận vé được phát hành hợp lệ, chưa được sử dụng hoặc chuyển nhượng trước đó, đồng thời xác minh người A đang nắm giữ quyền chuyển nhượng. Nếu sự kiện có các yêu cầu cụ thể như độ tuổi hoặc điều kiện tham dự, người B sẽ cung cấp các thực chứng cần thiết để chứng minh mình đáp ứng các điều kiện này. Sau khi quá trình xác minh hoàn tất và đạt yêu cầu, người B tiến hành thanh toán theo các điều khoản đã được thiết lập trong hợp đồng thông minh, với khả năng sử dụng cơ chế ký quỹ để đảm bảo an toàn cho giao dịch."
        },
        {
          "type": "paragraph",
          "text": "Khi tất cả các điều kiện được đáp ứng, hợp đồng thông minh tự động hoàn tất giao dịch bằng cách chuyển quyền sử dụng vé sang cho người B, đồng thời vô hiệu hóa vé của người A và chuyển khoản thanh toán cho A. Trạng thái của vé được cập nhật đồng bộ trên hệ thống, đảm bảo không thể xảy ra việc sử dụng hoặc chuyển nhượng trùng lặp. Tại cổng kiểm soát sự kiện, người B chỉ cần chứng minh mình đang sở hữu một vé hợp lệ mà không cần cung cấp thêm các thông tin cá nhân không liên quan. Quy trình này giúp giảm thiểu rủi ro vé giả, bán trùng vé và các tranh chấp liên quan đến quyền sử dụng."
        },
        {
          "type": "heading",
          "text": "3.5. Ví dụ: doanh nghiệp nhỏ vay vốn"
        },
        {
          "type": "paragraph",
          "text": "Khi đề nghị cấp tín dụng, doanh nghiệp có thể trình các thực chứng về đăng ký kinh doanh, quyền đại diện, hóa đơn, hợp đồng, đơn hàng, doanh thu và dòng tiền. Ngân hàng hoặc tổ chức tài chính xác minh nguồn phát hành, tính toàn vẹn và trạng thái hiệu lực của từng thông tin, sau đó áp dụng chính sách đánh giá rủi ro để đưa ra quyết định tín dụng."
        },
        {
          "type": "paragraph",
          "text": "Thay vì dựa chủ yếu vào bản chụp giấy tờ và thông tin do doanh nghiệp tự khai báo, tổ chức tài chính có thể sử dụng dữ liệu được xác nhận trực tiếp bởi cơ quan đăng ký, ngân hàng, đối tác thương mại, đơn vị cung cấp hóa đơn hoặc các nguồn có thẩm quyền khác. Điều này giúp hình thành hồ sơ tài chính có thể kiểm chứng mà không yêu cầu tập trung toàn bộ dữ liệu của doanh nghiệp tại Identra."
        },
        {
          "type": "paragraph",
          "text": "Sau khi khoản vay được phê duyệt, hợp đồng thông minh quản lý các điều kiện giải ngân, lịch thanh toán, tài sản bảo đảm hoặc dòng tiền được chỉ định để hoàn trả khoản vay. Việc giải ngân chỉ được thực hiện khi các điều kiện đã thỏa thuận được đáp ứng; các khoản thanh toán và thay đổi trạng thái được ghi nhận để phục vụ đối chiếu, quản trị rủi ro và kiểm toán."
        },
        {
          "type": "paragraph",
          "text": "Trong mô hình này, dữ liệu có thể kiểm chứng cung cấp cơ sở để đánh giá doanh nghiệp, còn hợp đồng thông minh hỗ trợ thực thi các điều khoản tín dụng. Sự kết hợp giữa hai lớp giúp rút ngắn quy trình tiếp cận vốn, giảm chi phí xác minh và gian lận, đồng thời vẫn duy trì khả năng kiểm soát và truy vết trong suốt vòng đời khoản vay."
        }
      ]
    },
    {
      "id": "chapter-4",
      "eyebrow": "CHƯƠNG 4",
      "title": "IDENTRA VẬN HÀNH NHƯ THẾ NÀO?",
      "paragraphs": [],
      "blocks": [
        {
          "type": "heading",
          "text": "4.1. Cấu trúc vận hành"
        },
        {
          "type": "paragraph",
          "text": "Identra được tổ chức thành ba lớp chức năng phối hợp với các hạ tầng chuyên trách để kết nối trải nghiệm người dùng, hoạt động xác minh và quá trình thực hiện giao dịch."
        },
        {
          "type": "paragraph",
          "text": "**Lớp trải nghiệm người dùng** được thể hiện qua siêu ứng dụng Identra. Đây là nơi người dùng giao tiếp, quản lý thực chứng và dữ liệu cá nhân, thiết lập quan hệ, ký kết hợp đồng, thanh toán và sử dụng các Mini App trong một giao diện thống nhất."
        },
        {
          "type": "paragraph",
          "text": "**Lớp dịch vụ dành cho tổ chức** cung cấp API, SDK và giao diện quản trị để doanh nghiệp, cơ quan và các nền tảng số phát hành hoặc xác minh thực chứng, triển khai quy trình tuân thủ và tích hợp hợp đồng thông minh vào hệ thống nghiệp vụ hiện có."
        },
        {
          "type": "paragraph",
          "text": "**Lớp điều phối xác minh và giao dịch** kết nối yêu cầu cung cấp dữ liệu, chính sách xác minh, sự chấp thuận của người dùng, chữ ký, hợp đồng và thanh toán thành một quy trình hoàn chỉnh. Lớp này bảo đảm mỗi hành động chỉ được thực hiện sau khi các điều kiện về danh tính, quyền hạn, dữ liệu và sự cho phép đã được đáp ứng."
        },
        {
          "type": "paragraph",
          "text": "CertNet, Therabit và IDPay đảm nhiệm các chức năng chuyên biệt ở tầng hạ tầng. CertNet cung cấp nền tảng đăng ký và xác minh trạng thái tin cậy; Therabit hỗ trợ triển khai và thực thi hợp đồng thông minh; IDPay xử lý thanh toán và chuyển giao giá trị. Identra kết nối các hạ tầng này thông qua một lớp tích hợp chung, đồng thời che giấu sự phức tạp kỹ thuật để mang lại trải nghiệm nhất quán cho người dùng và tổ chức."
        },
        {
          "type": "heading",
          "text": "4.2. Trải nghiệm người dùng"
        },
        {
          "type": "paragraph",
          "text": "Trong giai đoạn đầu, người dùng đăng ký Identra bằng số điện thoại và sử dụng passkey thay cho mật khẩu. Passkey cho phép xác thực bằng cơ chế bảo vệ sẵn có trên thiết bị, chẳng hạn như sinh trắc học hoặc mã khóa màn hình, qua đó giảm nguy cơ lộ, quên hoặc sử dụng lại mật khẩu."
        },
        {
          "type": "paragraph",
          "text": "Tài khoản được tạo bằng số điện thoại chỉ cung cấp mức bảo đảm phù hợp với các chức năng cơ bản. Khi điều kiện kỹ thuật và pháp lý được đáp ứng, thực chứng căn cước công dân hoặc thực chứng định danh do nguồn có thẩm quyền phát hành sẽ được sử dụng để nâng mức bảo đảm danh tính cho những dịch vụ yêu cầu xác minh chính thức."
        },
        {
          "type": "paragraph",
          "text": "Ví định tín lưu trữ thực chứng, khóa mật mã và lịch sử cấp quyền của người dùng. Tùy theo nhu cầu và mức độ chấp nhận rủi ro, người dùng có thể lựa chọn tự quản lý, sử dụng dịch vụ lưu ký hỗ trợ hoặc kết hợp cả hai mô hình."
        },
        {
          "type": "paragraph",
          "text": "Cơ chế khôi phục được cấu hình tương ứng với mức độ quan trọng của tài khoản và tài sản được bảo vệ. Các phương thức hỗ trợ gồm thiết bị tin cậy, bản sao lưu được mã hóa, khôi phục xã hội, cơ chế giám hộ, chia sẻ bí mật hoặc yêu cầu nguồn phát hành cấp lại thực chứng. Không có một phương thức khôi phục duy nhất được áp dụng cho mọi trường hợp."
        },
        {
          "type": "paragraph",
          "text": "Giao diện Identra che giấu những khái niệm kỹ thuật như DID, lược đồ dữ liệu và chữ ký mật mã. Thay vì yêu cầu người dùng hiểu cơ chế vận hành bên dưới, mỗi yêu cầu được trình bày bằng ngôn ngữ trực tiếp:"
        },
        {
          "type": "unordered-list",
          "items": [
            "bên nào đang yêu cầu thông tin;",
            "dữ liệu nào sẽ được cung cấp;",
            "dữ liệu được sử dụng cho mục đích gì;",
            "quyền truy cập có hiệu lực trong bao lâu;",
            "hành động nào sẽ diễn ra sau khi người dùng chấp thuận."
          ]
        },
        {
          "type": "paragraph",
          "text": "Cách tiếp cận này giúp người dùng đưa ra quyết định dựa trên mục đích và hệ quả thực tế, thay vì phải xử lý các chi tiết kỹ thuật của hệ thống định danh."
        },
        {
          "type": "heading",
          "text": "4.3. Siêu ứng dụng và Mini App"
        },
        {
          "type": "paragraph",
          "text": "Identra tập hợp giao tiếp, hồ sơ dữ liệu, thanh toán, hợp đồng, dịch vụ công, giáo dục, tuyển dụng, thương mại và các Mini App của bên thứ ba trong một trải nghiệm thống nhất. Người dùng không phải tạo lại hồ sơ, xác minh lại cùng một thông tin hoặc chuyển đổi giữa nhiều cơ chế đăng nhập và cấp quyền cho từng dịch vụ."
        },
        {
          "type": "paragraph",
          "text": "Mini App hoạt động trong môi trường được cô lập và không được truy cập trực tiếp vào khóa mật mã, thực chứng hoặc dữ liệu thô trong Ví định tín. Mọi yêu cầu đọc dữ liệu, trình xuất thực chứng, ký giao dịch hoặc thực hiện thanh toán đều phải đi qua lớp cấp quyền của Identra."
        },
        {
          "type": "paragraph",
          "text": "Trước khi phê duyệt, người dùng được thông báo rõ về:"
        },
        {
          "type": "unordered-list",
          "items": [
            "Mini App đang yêu cầu dữ liệu hoặc hành động nào;",
            "mục đích của yêu cầu;",
            "phạm vi thông tin được chia sẻ;",
            "thời hạn hiệu lực của quyền truy cập;",
            "giao dịch hoặc nghĩa vụ phát sinh sau khi chấp thuận."
          ]
        },
        {
          "type": "paragraph",
          "text": "Sau khi người dùng đồng ý, Identra chỉ cung cấp cho Mini App kết quả cần thiết thông qua giao diện chuẩn. Chẳng hạn, Mini App có thể nhận kết quả xác nhận người dùng đã đủ tuổi, đang sở hữu giấy phép còn hiệu lực hoặc được quyền đại diện cho một doanh nghiệp mà không cần tiếp cận toàn bộ thực chứng chứa các thông tin đó."
        },
        {
          "type": "paragraph",
          "text": "Mô hình này tạo điều kiện để nhà phát triển xây dựng dịch vụ dựa trên danh tính và dữ liệu có thể kiểm chứng mà không phải tự quản lý khóa, lưu trữ giấy tờ nhạy cảm hoặc xây dựng lại toàn bộ hạ tầng xác minh. Đồng thời, người dùng vẫn duy trì quyền kiểm soát đối với dữ liệu và từng hành động được thực hiện trong Mini App."
        }
      ]
    },
    {
      "id": "chapter-5",
      "eyebrow": "CHƯƠNG 5",
      "title": "NỀN TẢNG XÁC MINH VÀ TUÂN THỦ DÀNH CHO TỔ CHỨC",
      "paragraphs": [],
      "blocks": [
        {
          "type": "heading",
          "text": "5.1. Từ sản phẩm người dùng đến hạ tầng dành cho tổ chức"
        },
        {
          "type": "paragraph",
          "text": "Bên cạnh vai trò là siêu ứng dụng dành cho người dùng, Identra còn cung cấp hạ tầng xác minh và tuân thủ cho doanh nghiệp, cơ quan quản lý và các nền tảng số. Thông qua API, SDK và công cụ quản trị, tổ chức có thể tích hợp khả năng xác minh dữ liệu, quản lý tuân thủ và thực thi hợp đồng thông minh vào sản phẩm hoặc quy trình nghiệp vụ hiện có mà không phải tự xây dựng toàn bộ nền tảng từ đầu."
        },
        {
          "type": "paragraph",
          "text": "Tổ chức có thể sử dụng Identra theo ba hình thức:"
        },
        {
          "type": "unordered-list",
          "items": [
            "tích hợp API và SDK vào website, ứng dụng di động hoặc hệ thống nghiệp vụ;",
            "sử dụng giao diện quản trị để cấu hình quy trình, theo dõi kết quả, quản lý hồ sơ và xử lý ngoại lệ;",
            "phát hành thực chứng cho khách hàng, nhân viên, đối tác, tài sản hoặc thiết bị để các thông tin này được tái sử dụng trong nhiều dịch vụ khác nhau."
          ]
        },
        {
          "type": "paragraph",
          "text": "Cách tiếp cận này giúp tổ chức duy trì hệ thống nghiệp vụ hiện có, đồng thời bổ sung một lớp xác minh và giao dịch đáng tin cậy thông qua các giao diện tích hợp thống nhất."
        },
        {
          "type": "heading",
          "text": "5.2. Các nhóm năng lực cung cấp"
        },
        {
          "type": "paragraph",
          "text": "**Xác minh cá nhân.** Identra hỗ trợ thu thập và kiểm tra giấy tờ, đối chiếu dữ liệu, xác minh số điện thoại, địa chỉ thư điện tử, thiết bị, sinh trắc học và sự hiện diện của người dùng. Phạm vi xác minh được điều chỉnh theo mức độ rủi ro và yêu cầu của từng sản phẩm hoặc giao dịch."
        },
        {
          "type": "paragraph",
          "text": "**Xác minh doanh nghiệp.** Nền tảng hỗ trợ kiểm tra tư cách pháp nhân, tình trạng hoạt động, người đại diện, chủ sở hữu hưởng lợi, giấy phép và mối quan hệ giữa cá nhân với doanh nghiệp. Kết quả xác minh giúp tổ chức xác định không chỉ doanh nghiệp nào đang tham gia giao dịch, mà còn ai có quyền hành động hoặc ký kết thay mặt doanh nghiệp đó."
        },
        {
          "type": "paragraph",
          "text": "**Xác minh dữ liệu và thực chứng.** Identra kiểm tra chữ ký mật mã, nguồn phát hành, tính toàn vẹn, trạng thái hiệu lực, lược đồ dữ liệu, thời hạn, phạm vi sử dụng và mức bảo đảm của thực chứng được trình. Bên tiếp nhận có thể áp dụng chính sách tin cậy riêng để xác định nguồn phát hành nào được công nhận và mức bảo đảm nào phù hợp với từng nghiệp vụ."
        },
        {
          "type": "paragraph",
          "text": "**Điều phối KYC, KYB và AML.** Identra hỗ trợ tổ chức triển khai quy trình xác minh khách hàng cá nhân, xác minh khách hàng doanh nghiệp và phòng, chống rửa tiền. Quy trình được cấu hình theo sản phẩm, khu vực, nhóm rủi ro và từng giai đoạn trong vòng đời khách hàng. Hệ thống hỗ trợ kiểm tra ban đầu, tái xác minh, sàng lọc, đánh giá trường hợp ngoại lệ và lưu giữ bằng chứng phục vụ kiểm toán."
        },
        {
          "type": "paragraph",
          "text": "**Quản lý sự chấp thuận và quyền dữ liệu.** Mỗi lần thu thập, chia sẻ hoặc sử dụng dữ liệu được gắn với mục đích, phạm vi, thời hạn và bên tiếp nhận cụ thể. Người dùng có thể xem xét trước khi chấp thuận, còn tổ chức có khả năng chứng minh căn cứ xử lý dữ liệu và lịch sử quyền đã được cấp, thay đổi hoặc thu hồi."
        },
        {
          "type": "paragraph",
          "text": "**Quản lý hồ sơ và xử lý ngoại lệ.** Những trường hợp không đáp ứng điều kiện xử lý tự động được chuyển sang quy trình đánh giá thủ công. Nhân sự phụ trách có thể xem xét bằng chứng, yêu cầu bổ sung thông tin, ghi nhận quyết định và duy trì dấu vết kiểm toán trong suốt quá trình xử lý."
        },
        {
          "type": "paragraph",
          "text": "**Phòng, chống gian lận.** Nền tảng tổng hợp tín hiệu từ giấy tờ, thiết bị, hành vi, lịch sử xác minh và mối quan hệ giữa các dữ liệu để nhận diện dấu hiệu bất nhất, giả mạo hoặc lạm dụng. Kết quả phân tích cung cấp thêm căn cứ cho quá trình đánh giá rủi ro; quyết định và trách nhiệm cuối cùng vẫn thuộc về tổ chức sử dụng dịch vụ."
        },
        {
          "type": "heading",
          "text": "5.3. Quy trình xác minh theo mức độ rủi ro"
        },
        {
          "type": "paragraph",
          "text": "Identra không áp dụng một quy trình xác minh duy nhất cho mọi người dùng và giao dịch. Một tài khoản chỉ sử dụng để đọc nội dung không cần mức bảo đảm như tài khoản ngân hàng; tương tự, một giao dịch có giá trị nhỏ không cần cùng mức kiểm soát với hoạt động chuyển nhượng tài sản có giá trị lớn."
        },
        {
          "type": "paragraph",
          "text": "Tổ chức có thể cấu hình quy trình dựa trên:"
        },
        {
          "type": "unordered-list",
          "items": [
            "loại sản phẩm hoặc dịch vụ;",
            "giá trị và tần suất giao dịch;",
            "quốc gia hoặc khu vực áp dụng;",
            "loại khách hàng, bao gồm cá nhân hoặc doanh nghiệp;",
            "tín hiệu và mức độ rủi ro;",
            "nghĩa vụ pháp lý và yêu cầu tuân thủ;",
            "lịch sử quan hệ với khách hàng;",
            "mức độ tin cậy của các thực chứng đã có."
          ]
        },
        {
          "type": "paragraph",
          "text": "Người dùng đã sở hữu thực chứng phù hợp có thể hoàn thành quy trình nhanh hơn mà không phải cung cấp lại toàn bộ giấy tờ. Những trường hợp có mức rủi ro cao được bổ sung bước xác minh, yêu cầu thêm bằng chứng hoặc chuyển sang đánh giá thủ công."
        },
        {
          "type": "paragraph",
          "text": "Cách tiếp cận dựa trên rủi ro giúp giảm thao tác không cần thiết đối với phần lớn khách hàng, đồng thời tập trung nguồn lực kiểm soát vào những trường hợp có khả năng phát sinh gian lận hoặc vi phạm cao hơn."
        },
        {
          "type": "heading",
          "text": "5.4. Xác minh một lần, tái sử dụng có kiểm soát"
        },
        {
          "type": "paragraph",
          "text": "Một kết quả KYC hoặc KYB tạo ra nhiều giá trị hơn khi có thể được tái sử dụng giữa các dịch vụ dưới sự kiểm soát của chủ thể. Identra cho phép kết quả xác minh được phát hành dưới dạng thực chứng hoặc chuyển thành bằng chứng có thể chia sẻ. Nhờ đó, người dùng không phải lặp lại toàn bộ quy trình tại mỗi tổ chức, trong khi bên tiếp nhận vẫn có thể kiểm tra nguồn phát hành, thời điểm xác minh, phạm vi dữ liệu, mức bảo đảm và trạng thái hiệu lực."
        },
        {
          "type": "paragraph",
          "text": "Việc tái sử dụng không đồng nghĩa với việc một kết quả xác minh được chấp nhận vô điều kiện. Mỗi tổ chức tiếp nhận vẫn áp dụng chính sách riêng để đánh giá liệu nguồn phát hành, thời điểm xác minh và mức bảo đảm có đáp ứng yêu cầu nghiệp vụ hay không. Khi cần thiết, tổ chức có thể yêu cầu thêm thông tin, tái xác minh một phần hoặc thực hiện quy trình kiểm tra bổ sung."
        },
        {
          "type": "paragraph",
          "text": "Mô hình này không biến Identra thành một kho hồ sơ tập trung. Dữ liệu được chia sẻ dựa trên sự chấp thuận của người dùng, chính sách của nguồn phát hành và yêu cầu của bên tiếp nhận. Mỗi bên tiếp tục chịu trách nhiệm trong phạm vi vai trò của mình: nguồn phát hành chịu trách nhiệm đối với thông tin đã xác nhận, người dùng kiểm soát việc trình xuất, còn tổ chức tiếp nhận chịu trách nhiệm đối với quyết định nghiệp vụ cuối cùng."
        },
        {
          "type": "heading",
          "text": "5.5. Cầu nối dữ liệu quốc tế"
        },
        {
          "type": "paragraph",
          "text": "Identra hướng tới kết nối các tổ chức tại Việt Nam với đối tác và mạng dữ liệu quốc tế thông qua ba lớp liên thông: kỹ thuật, ngữ nghĩa và tin cậy."
        },
        {
          "type": "paragraph",
          "text": "**Lớp kỹ thuật** sử dụng các tiêu chuẩn, giao thức và định dạng mở để hệ thống của các bên có thể trao đổi, đọc và xác minh thực chứng. Khả năng tương thích kỹ thuật giúp giảm sự phụ thuộc vào một nhà cung cấp hoặc một hạ tầng riêng biệt."
        },
        {
          "type": "paragraph",
          "text": "**Lớp ngữ nghĩa** ánh xạ ý nghĩa của dữ liệu giữa các quốc gia, ngành và tổ chức. Một bằng cấp, giấy phép, tư cách nghề nghiệp hoặc kết quả xác minh không chỉ cần được đọc đúng cấu trúc, mà còn phải được hiểu đúng về phạm vi, cấp độ và giá trị sử dụng trong từng bối cảnh."
        },
        {
          "type": "paragraph",
          "text": "**Lớp tin cậy** xác định nguồn phát hành nào được công nhận, mức bảo đảm của từng loại thực chứng, chính sách xác minh áp dụng và trách nhiệm của các bên khi xảy ra sai lệch hoặc tranh chấp. Lớp này được hình thành thông qua danh sách tin cậy, khung quản trị, thỏa thuận công nhận và các quy tắc pháp lý liên quan."
        },
        {
          "type": "paragraph",
          "text": "Liên thông dữ liệu chỉ tạo ra giá trị thực tế khi các bên thống nhất đồng thời cả ba lớp. Khả năng đọc được dữ liệu chưa đủ để bảo đảm dữ liệu được hiểu đúng, và khả năng hiểu đúng cũng chưa đủ nếu nguồn phát hành không được công nhận trong bối cảnh giao dịch."
        }
      ]
    },
    {
      "id": "chapter-6",
      "eyebrow": "CHƯƠNG 6",
      "title": "HỢP ĐỒNG THÔNG MINH VÀ GIAO DỊCH ĐÁNG TIN CẬY",
      "paragraphs": [],
      "blocks": [
        {
          "type": "heading",
          "text": "6.1. Vai trò trung tâm"
        },
        {
          "type": "paragraph",
          "text": "Hợp đồng thông minh cùng với thực chứng tạo thành hai trụ cột trong kiến trúc của Identra. Thực chứng xác lập những thông tin đã được một nguồn đáng tin cậy chứng minh, còn hợp đồng thông minh xác định hành động cần được thực hiện khi các điều kiện liên quan đã được đáp ứng."
        },
        {
          "type": "paragraph",
          "text": "Sự kết hợp giữa hai thành phần này hình thành một chu trình giao dịch hoàn chỉnh: dữ liệu đầu vào có nguồn gốc rõ ràng, danh tính và quyền hạn của các bên được xác minh, điều kiện giao dịch được kiểm tra và nghĩa vụ được thực thi theo những quy tắc đã thống nhất."
        },
        {
          "type": "paragraph",
          "text": "Nhờ đó, hợp đồng thông minh trong Identra không chỉ xử lý việc chuyển giao tài sản, mà còn có thể sử dụng danh tính, tư cách pháp lý, quyền đại diện, giấy phép, trạng thái tuân thủ và các dữ liệu có thể kiểm chứng làm điều kiện thực thi."
        },
        {
          "type": "heading",
          "text": "6.2. Các nhóm hợp đồng trọng tâm"
        },
        {
          "type": "paragraph",
          "text": "**Hợp đồng ký quỹ.** Tiền hoặc tài sản được tạm giữ cho đến khi các điều kiện đã thỏa thuận và xác minh được hoàn thành. Loại hợp đồng này được áp dụng trong mua bán vé, hàng hóa, dịch vụ tự do, đặt cọc và các giao dịch tài sản, giúp hạn chế tình trạng một bên đã thực hiện nghĩa vụ nhưng không nhận được giá trị tương ứng."
        },
        {
          "type": "paragraph",
          "text": "**Hợp đồng chuyển giao quyền.** Quyền sở hữu, quyền sử dụng, quyền truy cập hoặc quyền đại diện được chuyển giao khi danh tính, tư cách và các điều kiện liên quan được xác nhận hợp lệ. Sau khi giao dịch hoàn tất, quyền cũ được cập nhật trạng thái hoặc vô hiệu hóa để ngăn việc sử dụng và chuyển nhượng trùng lặp."
        },
        {
          "type": "paragraph",
          "text": "**Hợp đồng thanh toán theo sự kiện.** Khoản thanh toán được giải ngân khi một sự kiện hoặc kết quả đã được xác minh xảy ra, chẳng hạn như giao hàng thành công, hoàn tất nghiệm thu, phát hành hóa đơn, hoàn thành khóa học, đạt một mốc dự án hoặc đáp ứng chỉ tiêu đã thống nhất."
        },
        {
          "type": "paragraph",
          "text": "**Hợp đồng ủy quyền.** Cá nhân hoặc tổ chức cấp cho một chủ thể khác quyền thực hiện hành động trong phạm vi, thời hạn và điều kiện cụ thể. Quyền ủy quyền được biểu diễn bằng thực chứng, còn hợp đồng thông minh kiểm tra hiệu lực và phạm vi của quyền đó trước khi cho phép hành động được thực hiện."
        },
        {
          "type": "paragraph",
          "text": "**Hợp đồng tuân thủ.** Giao dịch chỉ được thực hiện khi các bên đáp ứng những yêu cầu đã thiết lập về KYC, KYB, giấy phép, hạn mức giao dịch, khu vực hoạt động, tư cách pháp lý hoặc chính sách nội bộ. Khi điều kiện không còn được đáp ứng, hợp đồng có thể từ chối, tạm dừng hoặc chuyển giao dịch sang quy trình đánh giá."
        },
        {
          "type": "paragraph",
          "text": "**Hợp đồng nhiều bên.** Nhiều cá nhân hoặc tổ chức cùng tham gia ký kết, xác nhận hoặc hoàn thành các nghĩa vụ trong một giao dịch. Hợp đồng quy định rõ vai trò, trách nhiệm, trình tự thực hiện và bằng chứng cần cung cấp của từng bên trước khi giao dịch được hoàn tất."
        },
        {
          "type": "heading",
          "text": "6.3. Bảo mật và quyền riêng tư"
        },
        {
          "type": "paragraph",
          "text": "Không phải mọi hợp đồng thông minh đều phù hợp để triển khai trên một mạng blockchain có khả năng đọc công khai. Những hợp đồng chứa dữ liệu cá nhân, điều khoản thương mại, bí mật kinh doanh hoặc logic nghiệp vụ nội bộ cần được thực thi trong môi trường có cơ chế bảo vệ phù hợp."
        },
        {
          "type": "paragraph",
          "text": "Therabit cung cấp hạ tầng thực thi cho các hợp đồng yêu cầu mức độ riêng tư và khả năng kiểm soát cao, trong khi CertNet chỉ ghi nhận những bằng chứng tối thiểu cần thiết để các bên có thể xác minh độc lập về trạng thái, tính toàn vẹn hoặc kết quả thực thi."
        },
        {
          "type": "paragraph",
          "text": "Dữ liệu nhạy cảm không được ghi trực tiếp vào hợp đồng công khai. Thay vào đó, hợp đồng chỉ tiếp nhận những thông tin cần thiết như kết quả xác minh, mã băm, trạng thái hiệu lực hoặc bằng chứng cho thấy một điều kiện đã được đáp ứng. Chẳng hạn, hợp đồng chỉ cần biết một người đã đủ tuổi hoặc một doanh nghiệp có giấy phép hợp lệ, thay vì tiếp nhận toàn bộ ngày sinh, hồ sơ cá nhân hoặc nội dung giấy phép."
        },
        {
          "type": "paragraph",
          "text": "Nguyên tắc này duy trì khả năng tự động hóa và kiểm chứng của giao dịch mà không làm lộ hồ sơ người dùng, dữ liệu thương mại hoặc thông tin nội bộ của tổ chức."
        },
        {
          "type": "heading",
          "text": "6.4. Trải nghiệm pháp lý và người dùng"
        },
        {
          "type": "paragraph",
          "text": "Hợp đồng thông minh không mặc nhiên thay thế toàn bộ hợp đồng pháp lý hoặc cơ chế giải quyết tranh chấp hiện hành. Identra liên kết mã thực thi với các điều khoản mà con người có thể đọc và hiểu, đồng thời gắn giao dịch với danh tính của các bên, chữ ký, quyền đại diện và quy trình xử lý khi phát sinh ngoại lệ hoặc tranh chấp."
        },
        {
          "type": "paragraph",
          "text": "Trước khi ký hoặc chấp thuận giao dịch, người dùng được cung cấp đầy đủ thông tin về nội dung cam kết và hệ quả pháp lý, tài chính hoặc nghiệp vụ có thể phát sinh. Những nội dung quan trọng không bị che giấu trong mã nguồn hoặc các thuật ngữ kỹ thuật khó hiểu."
        },
        {
          "type": "paragraph",
          "text": "Đối với mỗi giao dịch quan trọng, Identra hiển thị rõ:"
        },
        {
          "type": "unordered-list",
          "items": [
            "các bên tham gia và vai trò của từng bên;",
            "tài sản, dữ liệu hoặc quyền liên quan;",
            "các điều kiện cần đáp ứng;",
            "sự kiện kích hoạt việc thực thi;",
            "khoản thanh toán và các loại phí;",
            "thời điểm hoặc trình tự thực hiện;",
            "chính sách hủy, hoàn tiền hoặc hoàn trả tài sản;",
            "cơ chế xử lý ngoại lệ và giải quyết tranh chấp;",
            "dữ liệu được sử dụng và mục đích sử dụng;",
            "bằng chứng được lưu giữ sau khi giao dịch hoàn tất."
          ]
        },
        {
          "type": "paragraph",
          "text": "Cách tiếp cận này giúp người dùng hiểu rõ điều mình đang chấp thuận, đồng thời tạo sự liên kết giữa thỏa thuận pháp lý, dữ liệu đã được xác minh và quá trình thực thi tự động."
        }
      ]
    },
    {
      "id": "chapter-7",
      "eyebrow": "CHƯƠNG 7",
      "title": "GIÁ TRỊ VÀ KỊCH BẢN ỨNG DỤNG",
      "paragraphs": [],
      "blocks": [
        {
          "type": "paragraph",
          "text": "Các nội dung dưới đây trình bày một số kịch bản sử dụng tiêu biểu nhằm minh họa cách Identra có thể được áp dụng trong thực tế. Tuy nhiên, đây chỉ là những ví dụ đại diện; trên thực tế tồn tại vô vàn kịch bản sử dụng khác trong nhiều lĩnh vực và bối cảnh khác nhau mà không thể liệt kê đầy đủ trong phạm vi tài liệu này."
        },
        {
          "type": "heading",
          "text": "7.1. Giáo dục và thị trường lao động"
        },
        {
          "type": "paragraph",
          "text": "Các tổ chức giáo dục phát hành bằng cấp, bảng điểm, chứng chỉ kỹ năng và xác nhận tình trạng học tập dưới dạng thực chứng. Người học lưu trữ các thực chứng này trong Ví định tín và chủ động trình xuất những thông tin phù hợp với yêu cầu của từng vị trí tuyển dụng."
        },
        {
          "type": "paragraph",
          "text": "Nhà tuyển dụng có thể tự động kiểm tra nguồn phát hành, tính toàn vẹn, nội dung, trạng thái hiệu lực và quyền nắm giữ của ứng viên. Thay vì yêu cầu bản sao giấy tờ và liên hệ riêng với từng cơ sở đào tạo, doanh nghiệp tiếp nhận bằng chứng có thể xác minh trực tiếp theo chính sách tuyển dụng của mình."
        },
        {
          "type": "paragraph",
          "text": "Sau khi ứng viên được tuyển dụng, hợp đồng lao động, quyền truy cập hệ thống, vai trò công việc và các quyền lợi liên quan có thể được cấp dựa trên kết quả xác minh. Khi quan hệ lao động kết thúc, các quyền truy cập hết hiệu lực theo chính sách, đồng thời tổ chức có thể phát hành thực chứng về vị trí, thời gian làm việc hoặc kinh nghiệm nghề nghiệp cho người lao động."
        },
        {
          "type": "paragraph",
          "text": "Mô hình này giúp hạn chế bằng cấp và chứng chỉ giả, rút ngắn thời gian tuyển dụng, hình thành hồ sơ năng lực có thể tái sử dụng và tăng cường kết nối giữa cơ sở đào tạo với thị trường lao động."
        },
        {
          "type": "heading",
          "text": "7.2. Tài chính và doanh nghiệp nhỏ"
        },
        {
          "type": "paragraph",
          "text": "Cá nhân hoặc doanh nghiệp có thể trình thực chứng về danh tính, tư cách pháp nhân, quyền đại diện, thu nhập, hóa đơn, hợp đồng, đơn hàng và dòng tiền. Tổ chức tài chính sử dụng những dữ liệu đã được xác minh này để triển khai quy trình KYC, KYB, AML và đánh giá rủi ro theo từng sản phẩm tín dụng."
        },
        {
          "type": "paragraph",
          "text": "Thay vì phụ thuộc chủ yếu vào hồ sơ giấy, dữ liệu tự khai báo hoặc các bước đối chiếu thủ công, tổ chức tài chính có thể kiểm tra thông tin từ những nguồn phát hành có thẩm quyền. Doanh nghiệp vẫn kiểm soát việc chia sẻ dữ liệu và chỉ cung cấp những bằng chứng cần thiết cho quá trình đánh giá."
        },
        {
          "type": "paragraph",
          "text": "Hợp đồng tín dụng có thể gắn điều kiện giải ngân, lịch thanh toán, tài sản bảo đảm hoặc dòng tiền hoàn trả với các sự kiện đã được xác định rõ. IDPay xử lý luồng tiền khi có sự chấp thuận và các điều kiện giao dịch được đáp ứng, trong khi hợp đồng thông minh hỗ trợ thực thi các quy tắc đã thống nhất."
        },
        {
          "type": "paragraph",
          "text": "Mô hình này giúp giảm nhập liệu lặp lại, hạn chế hồ sơ giấy, nâng cao khả năng kiểm toán và mở rộng cơ hội tiếp cận vốn cho những doanh nghiệp có hoạt động kinh doanh tốt nhưng chưa đáp ứng đầy đủ yêu cầu về tài sản thế chấp truyền thống."
        },
        {
          "type": "heading",
          "text": "7.3. Thương mại, vé và tài sản số"
        },
        {
          "type": "paragraph",
          "text": "Trong các giao dịch thương mại, người bán có thể chứng minh quyền sở hữu hoặc quyền cung cấp hàng hóa, dịch vụ; người mua chứng minh điều kiện tham gia và khả năng thanh toán; còn hợp đồng ký quỹ bảo vệ lợi ích của cả hai bên. Tiền, tài sản hoặc quyền chỉ được chuyển giao sau khi các điều kiện đã thỏa thuận được đáp ứng."
        },
        {
          "type": "paragraph",
          "text": "Đối với vé sự kiện, quyền sử dụng được phát hành dưới dạng thực chứng và có thể được kiểm tra về nguồn phát hành, trạng thái hiệu lực, điều kiện sử dụng và quyền chuyển nhượng. Khi vé được chuyển giao, trạng thái cũ bị vô hiệu hóa để hạn chế vé giả, bán trùng hoặc tranh chấp quyền sử dụng."
        },
        {
          "type": "paragraph",
          "text": "Hóa đơn, phiếu bảo hành, chứng nhận nguồn gốc và lịch sử bảo trì có thể tiếp tục gắn với sản phẩm hoặc tài sản trong Ví định tín. Người sở hữu mới nhận được các quyền và bằng chứng liên quan sau khi giao dịch hoàn tất, qua đó duy trì lịch sử có thể kiểm chứng trong suốt vòng đời tài sản."
        },
        {
          "type": "paragraph",
          "text": "Đối với tài sản số, Identra bổ sung danh tính, quyền hạn và điều kiện tuân thủ vào quá trình giao dịch. Hệ thống không chỉ xác định khóa nào đã ký, mà còn kiểm tra chủ thể nào đang kiểm soát khóa, chủ thể đó đang hành động với tư cách gì, đại diện cho ai và giao dịch có đáp ứng chính sách áp dụng hay không."
        },
        {
          "type": "heading",
          "text": "7.4. Dịch vụ công và liên thông dữ liệu"
        },
        {
          "type": "paragraph",
          "text": "Cơ quan có thẩm quyền phát hành thực chứng từ các nguồn dữ liệu chính thức. Người dân có thể sử dụng những thực chứng này trong các quy trình giáo dục, y tế, tài chính, việc làm và dịch vụ công mà không phải liên tục nộp lại toàn bộ giấy tờ hoặc yêu cầu cơ quan phát hành xác nhận riêng cho từng giao dịch."
        },
        {
          "type": "paragraph",
          "text": "Khi một dịch vụ cần thông tin, người dân chủ động trình xuất bằng chứng phù hợp thông qua Ví định tín. Bên tiếp nhận kiểm tra nguồn phát hành, tính toàn vẹn và trạng thái hiệu lực, nhưng không cần truy cập trực tiếp toàn bộ dữ liệu gốc hoặc thu thập những thông tin không liên quan."
        },
        {
          "type": "paragraph",
          "text": "Identra tạo cầu nối giữa khu vực công và khu vực tư, nhưng không chuyển quyền quản lý dữ liệu gốc khỏi cơ quan có thẩm quyền. Cơ quan phát hành tiếp tục chịu trách nhiệm đối với thông tin chính thức; bên tiếp nhận chịu trách nhiệm đối với quyết định nghiệp vụ; còn người dân kiểm soát việc sử dụng và trình xuất dữ liệu của mình."
        },
        {
          "type": "paragraph",
          "text": "Mô hình này giúp nâng cao giá trị sử dụng của dữ liệu chính thức, giảm sự phụ thuộc vào bản sao giấy tờ và cho phép người dân chủ động mang bằng chứng đáng tin cậy giữa các dịch vụ."
        },
        {
          "type": "heading",
          "text": "7.5. Chuỗi cung ứng và thiết bị"
        },
        {
          "type": "paragraph",
          "text": "Nhà sản xuất, đơn vị kiểm định, doanh nghiệp logistics và nhà phân phối có thể phát hành thực chứng cho nguyên liệu, lô hàng, sản phẩm hoặc thiết bị. Các thực chứng ghi nhận nguồn gốc, tiêu chuẩn chất lượng, trạng thái kiểm định, quá trình vận chuyển, quyền sở hữu và những sự kiện quan trọng trong vòng đời tài sản."
        },
        {
          "type": "paragraph",
          "text": "Hợp đồng thông minh sử dụng các trạng thái đã được xác minh, chẳng hạn như giao nhận thành công, kết quả kiểm định, điều kiện nhiệt độ, thời điểm nghiệm thu hoặc xác nhận thanh toán, làm điều kiện thực thi. Khoản tiền hoặc quyền sở hữu chỉ được chuyển khi các nghĩa vụ tương ứng đã hoàn thành."
        },
        {
          "type": "paragraph",
          "text": "Người tiêu dùng và doanh nghiệp có thể kiểm tra nguồn gốc, tình trạng và lịch sử của sản phẩm mà không phụ thuộc hoàn toàn vào một cơ sở dữ liệu tập trung duy nhất. Mỗi tổ chức tiếp tục quản lý dữ liệu thuộc phạm vi trách nhiệm của mình, trong khi Identra kết nối các bằng chứng thành một chuỗi thông tin có thể xác minh."
        },
        {
          "type": "paragraph",
          "text": "Thiết bị IoT có thể sử dụng thực chứng để chứng minh nguồn sản xuất, danh tính thiết bị, quyền vận hành, trạng thái bảo trì và quyền truy cập vào hệ thống hoặc hạ tầng. Nhờ đó, các dịch vụ có thể xác định không chỉ thiết bị nào đang kết nối, mà còn thiết bị đó có được phép thực hiện hành động cụ thể hay không."
        },
        {
          "type": "heading",
          "text": "7.6. Giá trị theo nhóm liên quan"
        },
        {
          "type": "table",
          "headers": [
            "Nhóm",
            "Giá trị trực tiếp",
            "Giá trị hệ thống"
          ],
          "rows": [
            [
              "Người dân",
              "Giảm phụ thuộc vào mật khẩu, hạn chế nộp lại giấy tờ, kiểm soát dữ liệu và thực hiện giao dịch thuận tiện hơn",
              "Tăng quyền tự chủ và khả năng sử dụng dữ liệu giữa nhiều dịch vụ"
            ],
            [
              "Doanh nghiệp",
              "Rút ngắn quá trình tiếp nhận khách hàng, giảm gian lận, hạn chế tích hợp rời rạc và tự động hóa hợp đồng",
              "Hình thành dữ liệu đáng tin cậy, tuân thủ có bằng chứng và khả năng mở rộng quan hệ đối tác"
            ],
            [
              "Cơ quan nhà nước",
              "Nâng cao giá trị sử dụng của dữ liệu chính thức, giảm bản sao giấy tờ và tăng khả năng kiểm toán",
              "Tạo cầu nối giữa khu vực công, khu vực tư và đối tác quốc tế mà vẫn duy trì thẩm quyền đối với nguồn định danh"
            ],
            [
              "Nhà phát triển",
              "Tiếp cận API và SDK cho xác minh, quản lý quyền dữ liệu, hợp đồng thông minh và thanh toán",
              "Xây dựng dịch vụ trên một lớp tin cậy và giao diện tích hợp dùng chung"
            ],
            [
              "Đối tác quốc tế",
              "Tiếp nhận và xác minh bằng chứng từ Việt Nam theo tiêu chuẩn, chính sách và mức bảo đảm rõ ràng",
              "Hỗ trợ liên thông về kỹ thuật, ngữ nghĩa và khung tin cậy"
            ]
          ]
        }
      ]
    },
    {
      "id": "chapter-8",
      "eyebrow": "CHƯƠNG 8",
      "title": "QUYỀN RIÊNG TƯ, BẢO MẬT VÀ TUÂN THỦ",
      "paragraphs": [],
      "blocks": [
        {
          "type": "heading",
          "text": "8.1. Quyền riêng tư theo thiết kế"
        },
        {
          "type": "paragraph",
          "text": "Trong Identra, quyền riêng tư không phải là một tính năng thêm vào sau, mà là nguyên tắc cốt lõi được tích hợp ngay từ khâu thiết kế và xuyên suốt quá trình vận hành. Mọi hoạt động thu thập, chia sẻ và xử lý dữ liệu đều được giới hạn theo mục đích cụ thể, đồng thời đảm bảo người dùng luôn giữ vai trò chủ động kiểm soát thông tin của mình."
        },
        {
          "type": "paragraph",
          "text": "Identra tuân theo các nguyên tắc sau:"
        },
        {
          "type": "unordered-list",
          "items": [
            "chỉ thu thập những dữ liệu thực sự cần thiết cho mục đích đã công bố;",
            "ưu tiên chia sẻ từng thuộc tính hoặc bằng chứng cụ thể thay vì toàn bộ hồ sơ khi có thể;",
            "không lưu trữ trực tiếp dữ liệu cá nhân trên blockchain;",
            "sử dụng các định danh khác nhau giữa các mối quan hệ khi cần, nhằm hạn chế việc liên kết và theo dõi chéo;",
            "mã hóa dữ liệu cả khi lưu trữ lẫn khi truyền tải;",
            "minh bạch về bên yêu cầu, bên nhận, mục đích sử dụng, phạm vi dữ liệu và thời gian xử lý;",
            "ghi nhận đầy đủ lịch sử chấp thuận, thay đổi và thu hồi quyền;",
            "cho phép người dùng thu hồi các quyền chưa sử dụng hoặc không còn cần thiết;",
            "giới hạn thời gian lưu trữ dữ liệu tại bên tiếp nhận theo đúng mục đích và quy định;",
            "tách biệt dữ liệu nghiệp vụ, dữ liệu định danh và dữ liệu kiểm toán để giảm thiểu rủi ro khi xảy ra sự cố."
          ]
        },
        {
          "type": "paragraph",
          "text": "Ví dụ, nếu một dịch vụ chỉ cần xác nhận người dùng đã đủ tuổi, Identra sẽ cung cấp kết quả xác nhận thay vì chia sẻ ngày sinh cụ thể. Tương tự, nếu chỉ cần kiểm tra giấy phép còn hiệu lực, bên nhận không cần truy cập toàn bộ nội dung giấy phép nếu không phục vụ trực tiếp cho giao dịch."
        },
        {
          "type": "heading",
          "text": "8.2. Quản lý khóa, lưu ký và khôi phục"
        },
        {
          "type": "paragraph",
          "text": "Khóa mật mã là yếu tố giúp người dùng kiểm soát Ví định tín, ký giao dịch và chứng minh quyền sở hữu thực chứng. Vì vậy, việc quản lý khóa đóng vai trò then chốt trong hệ thống bảo mật của Identra."
        },
        {
          "type": "paragraph",
          "text": "Người dùng có thể lựa chọn một trong ba mô hình:"
        },
        {
          "type": "unordered-list",
          "items": [
            "**tự quản lý**: người dùng trực tiếp giữ và kiểm soát khóa cũng như phương thức khôi phục;",
            "**lưu ký hỗ trợ**: một đơn vị cung cấp dịch vụ bảo vệ, sao lưu hoặc hỗ trợ khôi phục theo thỏa thuận;",
            "**mô hình kết hợp**: quyền kiểm soát và trách nhiệm khôi phục được chia sẻ giữa người dùng, thiết bị và bên hỗ trợ."
          ]
        },
        {
          "type": "paragraph",
          "text": "Việc trao quyền tự chủ không có nghĩa là người dùng phải tự gánh toàn bộ rủi ro kỹ thuật. Identra hỗ trợ người dùng thông qua các khả năng như xuất dữ liệu, chuyển đổi đơn vị lưu ký, thu hồi thiết bị, thay đổi phương thức xác thực hoặc yêu cầu cấp lại thực chứng khi đáp ứng quy trình xác minh phù hợp."
        },
        {
          "type": "paragraph",
          "text": "Cơ chế khôi phục được thiết kế theo nhiều lớp, tùy theo mức độ rủi ro. Với tài khoản thông thường, có thể sử dụng passkey, thiết bị tin cậy và bản sao lưu mã hóa. Với tài khoản có giá trị cao hoặc quyền hạn lớn, hệ thống có thể bổ sung:"
        },
        {
          "type": "unordered-list",
          "items": [
            "xác nhận từ nhiều thiết bị;",
            "chia sẻ bí mật giữa nhiều bên;",
            "cơ chế giám hộ hoặc khôi phục xã hội;",
            "đa chữ ký;",
            "thời gian chờ đối với các thao tác nhạy cảm;",
            "thiết bị hoặc phần cứng bảo mật chuyên dụng;",
            "quy trình xác minh bổ sung trước khi khôi phục."
          ]
        },
        {
          "type": "paragraph",
          "text": "Việc mất khóa không đồng nghĩa với việc mất vĩnh viễn toàn bộ thực chứng. Nếu chính sách của nguồn phát hành cho phép, thực chứng cũ có thể bị thu hồi và cấp lại sau khi người dùng hoàn tất quy trình xác minh danh tính và quyền sở hữu."
        },
        {
          "type": "heading",
          "text": "8.3. Sinh trắc học"
        },
        {
          "type": "paragraph",
          "text": "Identra sử dụng sinh trắc học trong các trường hợp như mở khóa thiết bị, xác nhận sự hiện diện của người dùng, chống giả mạo hoặc tăng mức độ tin cậy cho quy trình xác minh. Việc áp dụng sinh trắc học luôn được cân nhắc dựa trên mức độ rủi ro và chỉ sử dụng khi thực sự cần thiết."
        },
        {
          "type": "paragraph",
          "text": "Dữ liệu sinh trắc học được bảo vệ nghiêm ngặt và tách biệt khỏi dữ liệu nghiệp vụ. Việc thu thập, lưu trữ và xử lý chỉ diễn ra khi có mục đích rõ ràng, căn cứ hợp lệ, sự đồng ý cần thiết và cơ chế bảo vệ phù hợp với quy định."
        },
        {
          "type": "paragraph",
          "text": "Sinh trắc học không được dùng làm định danh công khai hoặc phương thức xác thực duy nhất. Khác với mật khẩu hay khóa mật mã, các đặc điểm sinh học như khuôn mặt hay vân tay rất khó thay đổi nếu bị lộ. Vì vậy, Identra giới hạn phạm vi sử dụng sinh trắc học, ưu tiên xử lý trực tiếp trên thiết bị và kết hợp với các yếu tố bảo mật khác."
        },
        {
          "type": "paragraph",
          "text": "Trong trường hợp một phương thức sinh trắc học không còn an toàn hoặc không thể sử dụng, người dùng có thể thu hồi và chuyển sang phương thức xác thực khác mà vẫn đảm bảo quyền truy cập hợp pháp vào dữ liệu và thực chứng của mình."
        },
        {
          "type": "heading",
          "text": "8.4. Tuân thủ theo nguyên tắc"
        },
        {
          "type": "paragraph",
          "text": "Identra được xây dựng để hỗ trợ các tổ chức đáp ứng yêu cầu tuân thủ, nhưng việc sử dụng nền tảng không đồng nghĩa với việc mọi quy trình đều tự động đáp ứng đầy đủ quy định pháp lý. Trách nhiệm cuối cùng vẫn thuộc về tổ chức trong việc xác định mục đích xử lý dữ liệu, lựa chọn căn cứ pháp lý và đưa ra quyết định nghiệp vụ."
        },
        {
          "type": "paragraph",
          "text": "Các nhóm yêu cầu chính bao gồm:"
        },
        {
          "type": "unordered-list",
          "items": [
            "bảo vệ dữ liệu cá nhân và quyền của chủ thể dữ liệu;",
            "định danh và xác thực điện tử;",
            "giao dịch điện tử, chữ ký điện tử và giá trị pháp lý của chứng cứ;",
            "an ninh mạng và bảo vệ hệ thống thông tin;",
            "KYC, KYB, AML và nghĩa vụ lưu trữ hồ sơ trong lĩnh vực tài chính;",
            "quy định đối với trung gian thanh toán, ví điện tử và các dịch vụ liên quan đến IDPay;",
            "bảo vệ người tiêu dùng, minh bạch điều khoản và xử lý tranh chấp;",
            "quy định chuyên ngành trong giáo dục, y tế, tài chính, viễn thông, lao động và dịch vụ công;",
            "yêu cầu về chuyển dữ liệu, lưu trữ và hợp tác xuyên biên giới."
          ]
        },
        {
          "type": "paragraph",
          "text": "Trước khi triển khai một dịch vụ, các bên liên quan cần thực hiện các bước phù hợp với mức độ rủi ro, bao gồm:"
        },
        {
          "type": "unordered-list",
          "items": [
            "đánh giá yêu cầu pháp lý và căn cứ áp dụng;",
            "xác định rõ vai trò, quyền hạn và trách nhiệm của từng bên;",
            "phân tích tác động đến dữ liệu và quyền riêng tư;",
            "xây dựng chính sách lưu trữ, chia sẻ và xóa dữ liệu;",
            "kiểm thử bảo mật và đánh giá rủi ro hệ thống;",
            "thiết lập quy trình xử lý sự cố, khiếu nại và tranh chấp;",
            "xác định loại bằng chứng cần lưu giữ để phục vụ kiểm toán và đối chiếu."
          ]
        },
        {
          "type": "paragraph",
          "text": "Trong giai đoạn đầu, AwnCorp chịu trách nhiệm quản trị Identra, bao gồm định hướng phát triển, tiêu chuẩn tích hợp, bảo mật nền tảng, điều kiện tham gia hệ sinh thái, kiểm soát Mini App và nhà phát triển, cũng như điều phối xử lý sự cố trong phạm vi vận hành của mình."
        },
        {
          "type": "paragraph",
          "text": "Tuy nhiên, AwnCorp không thay thế vai trò pháp lý của các tổ chức tham gia. Công ty không quyết định đơn vị nào được cấp bằng, cơ sở nào được phát hành hồ sơ y tế, tổ chức nào được thực hiện KYC hay cơ quan nào có thẩm quyền xác nhận giấy phép."
        },
        {
          "type": "paragraph",
          "text": "Quyền phát hành, xác minh và sử dụng thực chứng được xác định bởi pháp luật, cơ quan quản lý, quy định chuyên ngành và các thỏa thuận trong hệ sinh thái. Các khung tin cậy theo ngành cần được xây dựng với sự tham gia của cơ quan có thẩm quyền và các tổ chức đại diện liên quan."
        },
        {
          "type": "paragraph",
          "text": "Trong mô hình này, trách nhiệm được phân định rõ ràng:"
        },
        {
          "type": "unordered-list",
          "items": [
            "nguồn phát hành chịu trách nhiệm về thông tin và trạng thái mà mình xác nhận;",
            "người nắm giữ kiểm soát việc lưu trữ và chia sẻ thực chứng;",
            "bên xác minh chịu trách nhiệm về chính sách tin cậy và quyết định nghiệp vụ;",
            "đơn vị lưu ký chịu trách nhiệm về dịch vụ bảo vệ và khôi phục;",
            "AwnCorp chịu trách nhiệm về nền tảng Identra và các chức năng do mình vận hành;",
            "cơ quan quản lý giữ vai trò quản lý quy định, cấp phép và dữ liệu chính thức."
          ]
        },
        {
          "type": "paragraph",
          "text": "Cách phân định này giúp Identra hỗ trợ kết nối dữ liệu và giao dịch một cách tin cậy, đồng thời vẫn đảm bảo rõ ràng về trách nhiệm pháp lý của từng bên."
        }
      ]
    },
    {
      "id": "chapter-9",
      "eyebrow": "CHƯƠNG 9",
      "title": "MÔ HÌNH KINH DOANH VÀ CHIẾN LƯỢC THỊ TRƯỜNG",
      "paragraphs": [],
      "blocks": [
        {
          "type": "heading",
          "text": "9.1. Nguồn doanh thu cốt lõi"
        },
        {
          "type": "paragraph",
          "text": "Mô hình kinh doanh của Identra được xây dựng trên giá trị tạo ra từ hoạt động xác minh và giao dịch, thay vì khai thác hoặc bán dữ liệu cá nhân. Trong giai đoạn đầu, nền tảng tập trung vào hai nguồn doanh thu cốt lõi."
        },
        {
          "type": "paragraph",
          "text": "**Phí giao dịch hợp đồng thông minh.** Identra thu phí khi nền tảng điều phối một giao dịch có sử dụng các chức năng như xác minh điều kiện, xác nhận quyền hạn, ký kết, thanh toán, thực thi hợp đồng và lưu giữ bằng chứng. Mức phí được gắn với dịch vụ và giá trị mà nền tảng cung cấp cho giao dịch, không dựa trên việc thu thập hoặc mua bán dữ liệu của người dùng."
        },
        {
          "type": "paragraph",
          "text": "**Doanh thu từ API và SDK.** Doanh nghiệp, cơ quan và nền tảng số trả phí để tích hợp các năng lực xác minh và tuân thủ của Identra vào hệ thống hiện có. Cơ chế tính phí có thể dựa trên số lượt xác minh, khối lượng sử dụng, nhóm chức năng, mức độ hỗ trợ, yêu cầu vận hành và mức độ phức tạp của quy trình tuân thủ."
        },
        {
          "type": "paragraph",
          "text": "Các dịch vụ cung cấp cho tổ chức bao gồm:"
        },
        {
          "type": "unordered-list",
          "items": [
            "xác minh cá nhân và doanh nghiệp;",
            "xác minh giấy tờ, dữ liệu và thực chứng;",
            "xác minh sinh trắc học và sự hiện diện của người dùng;",
            "điều phối quy trình KYC, KYB và AML;",
            "quản lý sự chấp thuận và quyền sử dụng dữ liệu;",
            "đánh giá hồ sơ và xử lý ngoại lệ;",
            "cung cấp nhật ký và bằng chứng phục vụ kiểm toán."
          ]
        },
        {
          "type": "paragraph",
          "text": "Hai nguồn doanh thu này cho phép lợi ích thương mại của Identra gắn trực tiếp với mức độ sử dụng và hiệu quả mà nền tảng mang lại cho người dùng và tổ chức."
        },
        {
          "type": "heading",
          "text": "9.2. Nguồn doanh thu bổ sung"
        },
        {
          "type": "paragraph",
          "text": "Bên cạnh các nguồn doanh thu cốt lõi, Identra có thể phát triển những dịch vụ bổ sung phù hợp với từng giai đoạn và yêu cầu pháp lý, bao gồm:"
        },
        {
          "type": "unordered-list",
          "items": [
            "dịch vụ phần mềm theo mô hình thuê bao dành cho tổ chức phát hành và xác minh thực chứng;",
            "dịch vụ lưu ký, đồng bộ, sao lưu và khôi phục Ví định tín;",
            "dịch vụ tích hợp hệ thống và giải pháp dành riêng cho doanh nghiệp;",
            "tư vấn xây dựng lược đồ dữ liệu, quy trình xác minh và khung tin cậy;",
            "phí cung cấp hạ tầng và vận hành Mini App;",
            "phí dịch vụ thanh toán thông qua IDPay sau khi đáp ứng đầy đủ điều kiện pháp lý;",
            "phí hỗ trợ giao dịch tài sản số và các dịch vụ giá trị gia tăng liên quan;",
            "dịch vụ đánh giá bảo mật, kiểm tra khả năng tương thích và hỗ trợ vận hành;",
            "gói hỗ trợ kỹ thuật, cam kết chất lượng dịch vụ và triển khai theo yêu cầu."
          ]
        },
        {
          "type": "paragraph",
          "text": "Các nguồn doanh thu bổ sung được triển khai theo nguyên tắc không làm suy giảm quyền riêng tư, quyền kiểm soát dữ liệu hoặc khả năng chuyển đổi nhà cung cấp của người dùng và tổ chức."
        },
        {
          "type": "heading",
          "text": "9.3. Quảng cáo tự nguyện"
        },
        {
          "type": "paragraph",
          "text": "Identra không hiển thị quảng cáo theo mặc định. Người dùng chỉ tiếp nhận quảng cáo khi chủ động bật chức năng này và chấp thuận phạm vi thuộc tính được sử dụng để lựa chọn nội dung phù hợp."
        },
        {
          "type": "paragraph",
          "text": "Cơ chế phân phối quảng cáo ưu tiên xử lý trực tiếp trên thiết bị hoặc sử dụng bằng chứng về thuộc tính, thay vì chuyển toàn bộ hồ sơ cá nhân cho nhà quảng cáo. Chẳng hạn, hệ thống có thể chứng minh một người thuộc nhóm đối tượng phù hợp với chiến dịch mà không tiết lộ danh tính hoặc những dữ liệu không cần thiết."
        },
        {
          "type": "paragraph",
          "text": "Người dùng được thông báo rõ:"
        },
        {
          "type": "unordered-list",
          "items": [
            "nhóm thuộc tính được sử dụng;",
            "mục đích của việc sử dụng dữ liệu;",
            "bên cung cấp quảng cáo;",
            "phạm vi và thời hạn cấp quyền;",
            "giá trị hoặc quyền lợi nhận được;",
            "cách thay đổi hoặc thu hồi sự chấp thuận."
          ]
        },
        {
          "type": "paragraph",
          "text": "Một phần doanh thu từ quảng cáo được phân phối cho người dùng dưới dạng Plan A theo cơ chế của hệ sinh thái. Identra giữ lại phần phí tương ứng với hoạt động cung cấp hạ tầng, phân phối và kiểm soát quảng cáo."
        },
        {
          "type": "paragraph",
          "text": "Quảng cáo được định vị là một lựa chọn để người dùng nhận thêm lợi ích từ sự tham gia tự nguyện của mình, không phải nguồn doanh thu quyết định mô hình kinh doanh của Identra. Việc từ chối quảng cáo không làm hạn chế những chức năng thiết yếu của nền tảng."
        },
        {
          "type": "heading",
          "text": "9.4. Chiến lược thâm nhập thị trường"
        },
        {
          "type": "paragraph",
          "text": "Trong giai đoạn đầu, Identra tập trung vào lĩnh vực giáo dục. Bằng cấp, bảng điểm và chứng chỉ có nguồn phát hành rõ ràng, cấu trúc dữ liệu tương đối ổn định, nhu cầu xác minh lớn và phạm vi thử nghiệm phù hợp để hình thành hệ sinh thái ban đầu."
        },
        {
          "type": "paragraph",
          "text": "Trong mô hình này:"
        },
        {
          "type": "unordered-list",
          "items": [
            "cơ sở giáo dục đóng vai trò nguồn phát hành thực chứng;",
            "sinh viên và người học là người nắm giữ;",
            "nhà tuyển dụng và tổ chức đào tạo tiếp theo là bên xác minh;",
            "hoạt động ứng tuyển, nhập học hoặc công nhận năng lực tạo ra giao dịch có giá trị."
          ]
        },
        {
          "type": "paragraph",
          "text": "Sinh viên có thể sử dụng lại hồ sơ học tập trong nhiều quy trình khác nhau; nhà tuyển dụng giảm thời gian kiểm tra bằng cấp; còn cơ sở giáo dục hạn chế gian lận và mở rộng giá trị sử dụng của dữ liệu đã phát hành."
        },
        {
          "type": "paragraph",
          "text": "Sau giáo dục, Identra mở rộng sang thị trường lao động, xác minh doanh nghiệp nhỏ, thương mại và dịch vụ tài chính. Mỗi lĩnh vực mới được phát triển quanh một chu trình hoàn chỉnh gồm nguồn phát hành, người nắm giữ, bên xác minh và một hoạt động tạo ra giá trị cụ thể."
        },
        {
          "type": "paragraph",
          "text": "Identra không phụ thuộc vào việc toàn bộ mạng lưới phải được hình thành trước khi sản phẩm tạo ra giá trị. Một hệ sinh thái quy mô nhỏ đã có thể vận hành khi tập hợp đủ các vai trò cần thiết. Chẳng hạn:"
        },
        {
          "type": "unordered-list",
          "items": [
            "một trường đại học cùng một nhóm nhà tuyển dụng có thể hình thành mạng xác minh bằng cấp;",
            "một nền tảng thương mại cùng đối tác thanh toán có thể triển khai quy trình mua bán có ký quỹ;",
            "một tổ chức tài chính cùng một nhóm doanh nghiệp nhỏ có thể xây dựng quy trình đánh giá tín dụng dựa trên dữ liệu có thể kiểm chứng."
          ]
        },
        {
          "type": "paragraph",
          "text": "Chiến lược phát triển theo cụm giúp Identra giải quyết một nhu cầu cụ thể trong từng hệ sinh thái nhỏ, tạo ra giá trị sớm và kiểm chứng mô hình trước khi mở rộng. Khi các cụm phát triển, những thực chứng và dịch vụ đã hình thành có thể tiếp tục được sử dụng trong các bối cảnh khác, qua đó kết nối thành một mạng lưới rộng hơn."
        },
        {
          "type": "paragraph",
          "text": "Giá trị của Identra gia tăng khi số lượng bên phát hành, người dùng, bên xác minh, Mini App và dịch vụ giao dịch cùng phát triển. Hiệu ứng mạng lưới không chỉ đến từ số lượng người tham gia, mà còn từ khả năng một thực chứng được sử dụng trong nhiều dịch vụ và một tổ chức có thể kết nối với nhiều đối tác thông qua cùng một lớp tích hợp."
        }
      ]
    },
    {
      "id": "chapter-10",
      "eyebrow": "CHƯƠNG 10",
      "title": "LỘ TRÌNH, RỦI RO VÀ NGUYÊN TẮC PHÁT TRIỂN",
      "paragraphs": [],
      "blocks": [
        {
          "type": "heading",
          "text": "10.1. Trạng thái hiện tại"
        },
        {
          "type": "paragraph",
          "text": "Tính đến tháng 07/2026, Identra đang trong giai đoạn thiết kế trải nghiệm người dùng, nghiên cứu kiến trúc và xây dựng các nguyên mẫu nền tảng. Dự án chưa có sản phẩm thương mại hoặc hệ thống vận hành trong môi trường sản xuất."
        },
        {
          "type": "paragraph",
          "text": "Các chức năng được phát triển theo từng giai đoạn, bắt đầu từ Ví định tín và các kịch bản định danh tự chủ cơ bản, sau đó mở rộng sang nền tảng xác minh dành cho tổ chức, hợp đồng thông minh, thanh toán và hệ sinh thái Mini App."
        },
        {
          "type": "paragraph",
          "text": "Trước khi được đưa vào sử dụng thực tế, mỗi thành phần cần trải qua quá trình kiểm thử chức năng, đánh giá khả năng mở rộng, phân tích tác động dữ liệu, kiểm thử bảo mật và kiểm toán phù hợp với mức độ rủi ro. Những năng lực được trình bày trong tài liệu này bao gồm cả chức năng đang được nghiên cứu, nguyên mẫu đang phát triển và định hướng dài hạn; không phải tất cả đều đã được triển khai hoàn chỉnh."
        },
        {
          "type": "heading",
          "text": "10.2. Lộ trình 2026–2030"
        },
        {
          "type": "table",
          "headers": [
            "Năm",
            "Trọng tâm",
            "Kết quả định hướng"
          ],
          "rows": [
            [
              "2026",
              "Ví định tín và nguyên mẫu định danh tự chủ",
              "Hoàn thiện thiết kế nền tảng, xây dựng Ví định tín thử nghiệm, quản lý thực chứng, xác thực bằng passkey và các kịch bản minh họa trong giáo dục và giao dịch"
            ],
            [
              "2027",
              "Phát hành, xác minh và API dành cho tổ chức",
              "Xây dựng công cụ phát hành và xác minh thực chứng, API và SDK tích hợp; thử nghiệm với tổ chức giáo dục, tuyển dụng và doanh nghiệp; đánh giá các yêu cầu tuân thủ ban đầu"
            ],
            [
              "2028",
              "Hợp đồng thông minh, IDPay và Mini App",
              "Thử nghiệm giao dịch có điều kiện, ký quỹ, chuyển giao quyền, thanh toán thông qua đối tác hoặc giấy phép phù hợp và môi trường phát triển Mini App cho bên thứ ba"
            ],
            [
              "2029",
              "Hệ sinh thái theo ngành",
              "Mở rộng sang giáo dục, tài chính, thương mại, chuỗi cung ứng và dịch vụ công; xây dựng lược đồ, chính sách và khung tin cậy phù hợp với từng lĩnh vực"
            ],
            [
              "2030",
              "Mở rộng khu vực và liên thông quốc tế",
              "Thử nghiệm liên thông thực chứng, công nhận nguồn phát hành, kết nối đối tác và hỗ trợ các giao dịch xuyên biên giới"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "Lộ trình có thể được điều chỉnh dựa trên kết quả thử nghiệm, mức độ sẵn sàng của công nghệ, yêu cầu pháp lý, nguồn lực phát triển và khả năng hình thành quan hệ đối tác. Việc chuyển sang giai đoạn tiếp theo chỉ được thực hiện khi các năng lực nền tảng của giai đoạn trước đã đạt mức độ ổn định và an toàn cần thiết."
        },
        {
          "type": "heading",
          "text": "10.3. Rủi ro chính"
        },
        {
          "type": "paragraph",
          "text": "**Rủi ro chấp nhận của thị trường.** Người dùng và tổ chức chưa quen với thực chứng, Ví định tín và cơ chế chủ động cấp quyền dữ liệu. Những khái niệm mới có thể làm tăng trở ngại trong quá trình tiếp cận nếu sản phẩm yêu cầu người dùng hiểu quá nhiều chi tiết kỹ thuật. Identra giảm rủi ro này bằng cách sử dụng trải nghiệm quen thuộc, diễn đạt yêu cầu bằng ngôn ngữ trực tiếp, triển khai trước trong những kịch bản có lợi ích rõ ràng và che giấu các thành phần kỹ thuật không cần thiết đối với người dùng phổ thông."
        },
        {
          "type": "paragraph",
          "text": "**Rủi ro hình thành hệ sinh thái.** Giá trị của Identra phụ thuộc vào sự tham gia đồng thời của bên phát hành, người nắm giữ, bên xác minh và dịch vụ sử dụng thực chứng. Nếu thiếu một trong các vai trò này, thực chứng được phát hành có thể không có nơi sử dụng hoặc bên xác minh không có đủ nguồn dữ liệu đáng tin cậy. Identra áp dụng chiến lược phát triển theo cụm ngành, hình thành một chu trình giá trị hoàn chỉnh trong phạm vi nhỏ trước khi kết nối và mở rộng sang hệ sinh thái khác."
        },
        {
          "type": "paragraph",
          "text": "**Rủi ro pháp lý.** Dữ liệu cá nhân, sinh trắc học, định danh điện tử, thanh toán và tài sản số đều chịu sự điều chỉnh của các yêu cầu pháp lý nghiêm ngặt. Thay đổi trong chính sách hoặc khác biệt giữa các khu vực có thể ảnh hưởng đến phạm vi và thời điểm triển khai. Mỗi mô-đun được đánh giá theo điều kiện pháp lý riêng; các dịch vụ liên quan đến tiền pháp định, trung gian thanh toán hoặc ví điện tử chỉ được vận hành sau khi có giấy phép phù hợp hoặc được cung cấp thông qua đối tác đã được cấp phép."
        },
        {
          "type": "paragraph",
          "text": "**Rủi ro bảo mật.** Ví định tín, khóa mật mã, hợp đồng thông minh, API và hạ tầng lưu ký là những mục tiêu có giá trị cao đối với kẻ tấn công. Một sự cố có thể ảnh hưởng đến dữ liệu, quyền truy cập, tài sản hoặc niềm tin của người dùng. Identra áp dụng kiến trúc bảo mật theo mức độ rủi ro, phân tách các thành phần hạ tầng, giới hạn đặc quyền, bảo vệ khóa bằng thiết bị hoặc phần cứng phù hợp, kiểm toán độc lập và duy trì quy trình tiếp nhận, xử lý báo cáo lỗ hổng cũng như ứng phó sự cố."
        },
        {
          "type": "paragraph",
          "text": "**Rủi ro về khả năng tương tác.** Việc sử dụng cùng một tiêu chuẩn kỹ thuật không bảo đảm các hệ thống sẽ hiểu dữ liệu, mức bảo đảm và chính sách tin cậy theo cùng một cách. Khác biệt về lược đồ, cách diễn giải thuộc tính, quy trình thu hồi hoặc tiêu chí công nhận nguồn phát hành có thể làm gián đoạn liên thông. Identra đầu tư vào lược đồ dùng chung, hồ sơ triển khai, bộ kiểm thử tương thích, cơ chế ánh xạ ngữ nghĩa và các thỏa thuận về khung tin cậy."
        },
        {
          "type": "paragraph",
          "text": "**Rủi ro phụ thuộc vào hạ tầng và đối tác.** Identra phối hợp với CertNet, Therabit, IDPay, nguồn phát hành, đơn vị lưu ký và các nhà cung cấp dịch vụ bên ngoài. Sự cố, thay đổi chính sách hoặc ngừng cung cấp từ một thành phần có thể ảnh hưởng đến toàn bộ quy trình. Kiến trúc được thiết kế theo hướng mô-đun, sử dụng giao diện chuẩn, hỗ trợ thay thế nhà cung cấp và duy trì phương án dự phòng đối với các chức năng quan trọng."
        },
        {
          "type": "paragraph",
          "text": "**Rủi ro tập trung quyền lực.** Một siêu ứng dụng có phạm vi hoạt động rộng có nguy cơ trở thành trung gian kiểm soát mới đối với danh tính, dữ liệu và dịch vụ của người dùng. Identra hạn chế rủi ro này bằng tiêu chuẩn mở, quyền xuất và chuyển dữ liệu, khả năng lựa chọn mô hình lưu ký, nguyên tắc tối thiểu hóa dữ liệu và sự phân định trách nhiệm giữa các bên. Những thành phần phù hợp được định hướng công khai mã nguồn theo lộ trình sau khi các yêu cầu về bảo mật, quyền sở hữu trí tuệ và vận hành đã được xử lý."
        },
        {
          "type": "paragraph",
          "text": "**Rủi ro về mô hình kinh doanh.** Hạ tầng xác minh và giao dịch đòi hỏi đầu tư dài hạn trong khi doanh thu phụ thuộc vào mức độ sử dụng thực tế của tổ chức và hệ sinh thái. Identra ưu tiên các kịch bản có nhu cầu xác minh rõ ràng, phát triển theo từng cụm có khả năng tạo giá trị độc lập và duy trì nhiều nguồn doanh thu không dựa trên việc khai thác dữ liệu cá nhân."
        },
        {
          "type": "heading",
          "text": "10.4. Nguyên tắc phát triển"
        },
        {
          "type": "paragraph",
          "text": "Quá trình xây dựng và mở rộng Identra tuân theo ba nguyên tắc nền tảng:"
        },
        {
          "type": "ordered-list",
          "items": [
            "**Không trình bày định hướng như năng lực đã hoàn thành.** Trạng thái nghiên cứu, nguyên mẫu, thử nghiệm và vận hành chính thức phải được phân biệt rõ ràng. Mọi tuyên bố về hiệu năng, bảo mật, khả năng tuân thủ hoặc mức độ sẵn sàng chỉ được đưa ra khi có bằng chứng kiểm chứng phù hợp."
          ]
        },
        {
          "type": "ordered-list",
          "items": [
            "**Không xây dựng mô hình kinh doanh dựa trên việc bán dữ liệu người dùng.** Doanh thu của Identra phải đến từ giá trị của hoạt động xác minh, giao dịch, tích hợp và cung cấp hạ tầng. Việc sử dụng dữ liệu luôn gắn với mục đích rõ ràng, phạm vi cần thiết và quyền kiểm soát của người dùng."
          ]
        },
        {
          "type": "ordered-list",
          "items": [
            "**Không đánh đổi khả năng tương tác và quyền tự chủ để đạt tăng trưởng ngắn hạn.** Identra ưu tiên tiêu chuẩn mở, khả năng chuyển đổi nhà cung cấp, quyền xuất dữ liệu và sự phân tách giữa các nguồn thông tin. Những quyết định giúp tăng tốc trong ngắn hạn nhưng tạo ra sự phụ thuộc lâu dài hoặc làm suy giảm quyền kiểm soát của người dùng không phù hợp với định hướng của nền tảng."
          ]
        },
        {
          "type": "paragraph",
          "text": "Ba nguyên tắc này là cơ sở để đánh giá các quyết định về sản phẩm, kiến trúc, đối tác và mô hình kinh doanh trong suốt quá trình phát triển Identra."
        }
      ]
    },
    {
      "id": "conclusion",
      "eyebrow": "KẾT LUẬN",
      "title": "KẾT LUẬN",
      "paragraphs": [],
      "blocks": [
        {
          "type": "paragraph",
          "text": "Nền kinh tế số tạo ra khối lượng dữ liệu ngày càng lớn, nhưng phần lớn dữ liệu vẫn tồn tại trong những hệ thống tách biệt, khó xác minh, khó tái sử dụng và chưa thể trở thành đầu vào đáng tin cậy cho các giao dịch tự động giữa những tổ chức độc lập. Identra hướng tới giải quyết khoảng trống này bằng cách kết nối dữ liệu có thể kiểm chứng với hợp đồng thông minh trong một trải nghiệm thống nhất."
        },
        {
          "type": "paragraph",
          "text": "Đối với người dùng, Identra vừa là siêu ứng dụng, vừa là Ví định tín để quản lý thực chứng, dữ liệu, quyền truy cập, hợp đồng và thanh toán. Người dùng chủ động quyết định thông tin nào được chia sẻ, chia sẻ với ai, cho mục đích gì và trong thời gian bao lâu. Thay vì liên tục tạo lại hồ sơ hoặc nộp lại giấy tờ, họ có thể sử dụng những bằng chứng đã được phát hành để tiếp cận nhiều dịch vụ khác nhau."
        },
        {
          "type": "paragraph",
          "text": "Đối với doanh nghiệp, cơ quan và nền tảng số, Identra cung cấp API, SDK và công cụ quản trị để xác minh cá nhân, doanh nghiệp, giấy tờ và thực chứng; triển khai quy trình KYC, KYB và AML; quản lý sự chấp thuận và quyền sử dụng dữ liệu; đánh giá rủi ro; xử lý ngoại lệ và lưu giữ bằng chứng phục vụ kiểm toán. Các tổ chức có thể bổ sung những năng lực này vào hệ thống hiện có mà không phải tự xây dựng toàn bộ hạ tầng định danh, xác minh và giao dịch từ đầu."
        },
        {
          "type": "paragraph",
          "text": "Thực chứng và hợp đồng thông minh là hai trụ cột bổ trợ cho nhau trong kiến trúc Identra. Thực chứng xác lập chủ thể, tư cách, quyền hạn và trạng thái đã được chứng minh. Hợp đồng thông minh sử dụng những bằng chứng đó để xác định khi nào một hành động được phép thực hiện, giá trị được chuyển giao và trách nhiệm của từng bên phát sinh. Sự kết hợp này đưa hoạt động xác minh ra khỏi vai trò kiểm tra riêng biệt và biến kết quả xác minh thành một phần trực tiếp của giao dịch."
        },
        {
          "type": "paragraph",
          "text": "Các hạ tầng chuyên trách hỗ trợ Identra thực hiện mục tiêu đó. CertNet cung cấp các điểm tham chiếu cần thiết để kiểm tra nguồn phát hành, trạng thái và tính toàn vẹn; Therabit cung cấp môi trường triển khai và thực thi hợp đồng phù hợp với yêu cầu bảo mật; IDPay hoàn thiện quá trình chuyển giao giá trị khi đáp ứng đầy đủ điều kiện kỹ thuật và pháp lý. Identra kết nối những thành phần này thông qua một lớp tích hợp chung, đồng thời che giấu sự phức tạp kỹ thuật khỏi người dùng và tổ chức."
        },
        {
          "type": "paragraph",
          "text": "Tại Việt Nam, Identra hướng tới tạo cầu nối giữa dữ liệu chính thức, khu vực tư nhân và các hệ sinh thái quốc tế mà không làm thay đổi thẩm quyền đối với nguồn dữ liệu. Cơ quan và tổ chức phát hành tiếp tục quản lý dữ liệu gốc và chịu trách nhiệm về thông tin do mình xác nhận; người dùng chủ động mang bằng chứng giữa các dịch vụ; bên tiếp nhận xác minh độc lập và chịu trách nhiệm đối với quyết định nghiệp vụ của mình."
        },
        {
          "type": "paragraph",
          "text": "Identra vì vậy không đơn thuần là một ứng dụng tập hợp nhiều chức năng. Đây là nền tảng giúp dữ liệu đáng tin cậy tham gia trực tiếp vào các quy trình và giao dịch số. Mục tiêu dài hạn của Identra là đưa quyền tự chủ, khả năng kiểm chứng, quyền riêng tư và trách nhiệm trở thành những thuộc tính mặc định của dịch vụ số, thay vì các lớp bổ sung chỉ được triển khai sau khi hệ thống đã hình thành."
        }
      ]
    },
    {
      "id": "appendix-a",
      "eyebrow": "PHỤ LỤC A",
      "title": "THUẬT NGỮ ĐƯỢC SỬ DỤNG",
      "paragraphs": [],
      "blocks": [
        {
          "type": "table",
          "headers": [
            "Thuật ngữ",
            "Nghĩa trong Identra"
          ],
          "rows": [
            [
              "Định danh Tự chủ",
              "Mô hình trong đó chủ thể giữ quyền kiểm soát việc sử dụng dữ liệu và bằng chứng định danh của mình"
            ],
            [
              "Ví định tín",
              "Công cụ quản lý thực chứng, khóa, quyền dữ liệu, chữ ký và quan hệ số"
            ],
            [
              "Thực chứng",
              "Dữ liệu có cấu trúc, được nguồn phát hành ký số và có thể kiểm tra độc lập"
            ],
            [
              "Tuyên bố",
              "Một khẳng định cụ thể về chủ thể, tài sản, tổ chức hoặc thiết bị"
            ],
            [
              "Người phát hành",
              "Chủ thể tạo và ký thực chứng"
            ],
            [
              "Người nắm giữ",
              "Chủ thể giữ thực chứng và quyết định trình xuất"
            ],
            [
              "Người xác minh",
              "Chủ thể yêu cầu và kiểm tra bằng chứng"
            ],
            [
              "Hợp đồng thông minh",
              "Chương trình thực thi điều kiện và nghĩa vụ đã được các bên chấp thuận"
            ],
            [
              "Khung tin cậy",
              "Quy tắc xác định vai trò, thẩm quyền, mức bảo đảm và trách nhiệm trong hệ sinh thái"
            ],
            [
              "Đơn vị lưu ký",
              "Nhà cung cấp hạ tầng lưu trữ, đồng bộ hoặc hỗ trợ tác nhân và ví theo quyền của chủ thể"
            ],
            [
              "Mini App",
              "Dịch vụ bên thứ ba chạy trong Identra và sử dụng dữ liệu hoặc giao dịch qua lớp cấp quyền"
            ]
          ]
        }
      ]
    },
    {
      "id": "appendix-b",
      "eyebrow": "PHỤ LỤC B",
      "title": "ĐỊNH HƯỚNG KỸ THUẬT",
      "paragraphs": [],
      "blocks": [
        {
          "type": "paragraph",
          "text": "Identra được xây dựng với một lớp trừu tượng cho phép hỗ trợ nhiều định dạng thực chứng, phương thức định danh và hạ tầng tin cậy khác nhau. Cách tiếp cận này giúp nền tảng thích ứng với sự phát triển của tiêu chuẩn, yêu cầu đặc thù của từng ngành và quy định pháp luật tại mỗi thị trường."
        },
        {
          "type": "paragraph",
          "text": "Việc lựa chọn tiêu chuẩn và công nghệ cụ thể được đánh giá dựa trên các tiêu chí:"
        },
        {
          "type": "unordered-list",
          "items": [
            "mức độ trưởng thành và ổn định của tiêu chuẩn;",
            "khả năng tương tác giữa các hệ thống;",
            "mức độ phổ biến và năng lực hỗ trợ của hệ sinh thái;",
            "yêu cầu về bảo mật, quyền riêng tư và hiệu năng;",
            "mức bảo đảm cần thiết đối với từng loại thực chứng;",
            "yêu cầu nghiệp vụ và pháp lý của từng ngành hoặc khu vực."
          ]
        },
        {
          "type": "paragraph",
          "text": "Các nhóm tiêu chuẩn định hướng gồm:"
        },
        {
          "type": "unordered-list",
          "items": [
            "**W3C Verifiable Credentials Data Model 2.0** cho mô hình dữ liệu và cấu trúc chung của thực chứng;",
            "**OpenID for Verifiable Credential Issuance** và **OpenID for Verifiable Presentations** cho quy trình phát hành và trình xuất thực chứng;",
            "**SD-JWT VC**, **JSON-LD/Data Integrity** và **ISO mdoc** cho những định dạng, mô hình tiết lộ dữ liệu và mức bảo đảm khác nhau;",
            "**DID Core** cùng các phương thức DID phù hợp với tổ chức, quan hệ riêng tư và môi trường thử nghiệm;",
            "**passkey và WebAuthn** cho hoạt động đăng ký, xác thực và bảo vệ quyền truy cập của người dùng;",
            "các giao thức bảo mật, cơ chế mã hóa và định dạng chữ ký tương thích với hệ sinh thái web, thiết bị di động và hệ thống doanh nghiệp."
          ]
        },
        {
          "type": "paragraph",
          "text": "CertNet là hạ tầng tin cậy được ưu tiên trong hệ sinh thái Identra, nhưng nền tảng không bị giới hạn vào một blockchain, phương thức DID hoặc sổ đăng ký duy nhất. Việc lựa chọn hạ tầng được thực hiện theo mục đích sử dụng, yêu cầu quyền riêng tư và mức độ tin cậy của từng mối quan hệ."
        },
        {
          "type": "paragraph",
          "text": "Định hướng sử dụng các phương thức DID gồm:"
        },
        {
          "type": "unordered-list",
          "items": [
            "`did:certnet` cho tổ chức, dịch vụ và chủ thể sử dụng hạ tầng CertNet;",
            "`did:web` cho các tổ chức cần liên kết định danh phi tập trung với tên miền và hạ tầng web hiện có;",
            "`did:peer` cho các quan hệ riêng tư, trực tiếp và không yêu cầu công bố định danh lên sổ đăng ký công khai;",
            "`did:key` hoặc `did:jwk` cho môi trường cục bộ, thử nghiệm và những trường hợp sử dụng không cần cơ chế cập nhật định danh phức tạp."
          ]
        },
        {
          "type": "paragraph",
          "text": "Các tiêu chuẩn và phương thức định danh được triển khai thông qua một lớp tương thích chung. Lớp này chuẩn hóa hoạt động phát hành, lưu trữ, trình xuất và xác minh, giúp ứng dụng và tổ chức làm việc với nhiều định dạng thực chứng mà không phải xây dựng lại toàn bộ quy trình nghiệp vụ."
        },
        {
          "type": "paragraph",
          "text": "Nhờ kiến trúc này, Identra có thể bổ sung hoặc thay đổi một tiêu chuẩn, phương thức DID hay hạ tầng tin cậy khi cần thiết mà không làm gián đoạn trải nghiệm người dùng hoặc buộc các tổ chức tích hợp phải thay đổi toàn bộ hệ thống."
        }
      ]
    },
    {
      "id": "appendix-c",
      "eyebrow": "PHỤ LỤC C",
      "title": "TÀI LIỆU THAM KHẢO",
      "paragraphs": [],
      "blocks": [
        {
          "type": "unordered-list",
          "items": [
            "Alex Preukschat, Drummond Reed và các cộng sự, *Self-Sovereign Identity: Decentralized Digital Identity and Verifiable Credentials*.",
            "W3C, *Verifiable Credentials Data Model v2.0*.",
            "W3C, *Decentralized Identifiers (DIDs) v1.0*.",
            "OpenID Foundation, *OpenID for Verifiable Credential Issuance 1.0*.",
            "OpenID Foundation, *OpenID for Verifiable Presentations 1.0*.",
            "Các quy định hiện hành của Việt Nam về bảo vệ dữ liệu cá nhân, định danh và xác thực điện tử, giao dịch điện tử, an ninh mạng, phòng chống rửa tiền và trung gian thanh toán."
          ]
        },
        {
          "type": "paragraph",
          "text": "**AwnCorp / Identra** **Phiên bản 1.0 - Tháng 07/2026**"
        }
      ]
    }
  ]
} as const satisfies Pick<
  WhitePaperCopy,
  | 'versionBadge'
  | 'publisher'
  | 'heroBadge'
  | 'heroTitle'
  | 'heroSubtitle'
  | 'metadata'
  | 'callouts'
  | 'attribution'
  | 'sections'
>;

const WHITE_PAPER_UI_COPY = {
  "en": {
    "backToLanding": "Home",
    "copyLink": "Share",
    "copied": "Copied",
    "downloadPdf": "Download PDF",
    "copyLinkTitle": "Copy link",
    "mobileTocTitle": "White paper contents",
    "desktopTocTitle": "Document contents",
    "tocAriaLabel": "White paper contents",
    "searchPlaceholder": "Search the white paper...",
    "noTocResults": "No sections match this search.",
    "cta": "Experience Identra Sandbox"
  },
  "es": {
    "backToLanding": "Inicio",
    "copyLink": "Compartir",
    "copied": "Copiado",
    "downloadPdf": "Descargar PDF",
    "copyLinkTitle": "Copiar enlace",
    "mobileTocTitle": "Contenido del libro blanco",
    "desktopTocTitle": "Contenido del documento",
    "tocAriaLabel": "Contenido del libro blanco",
    "searchPlaceholder": "Buscar en el libro blanco...",
    "noTocResults": "Ninguna sección coincide con la búsqueda.",
    "cta": "Probar Identra Sandbox"
  },
  "ja": {
    "backToLanding": "ホーム",
    "copyLink": "共有",
    "copied": "コピー済み",
    "downloadPdf": "PDFをダウンロード",
    "copyLinkTitle": "リンクをコピー",
    "mobileTocTitle": "ホワイトペーパー目次",
    "desktopTocTitle": "ドキュメント目次",
    "tocAriaLabel": "ホワイトペーパー目次",
    "searchPlaceholder": "ホワイトペーパーを検索...",
    "noTocResults": "一致するセクションはありません。",
    "cta": "Identra Sandboxを試す"
  },
  "de": {
    "backToLanding": "Startseite",
    "copyLink": "Teilen",
    "copied": "Kopiert",
    "downloadPdf": "PDF herunterladen",
    "copyLinkTitle": "Link kopieren",
    "mobileTocTitle": "Whitepaper-Inhalt",
    "desktopTocTitle": "Dokumentinhalt",
    "tocAriaLabel": "Whitepaper-Inhalt",
    "searchPlaceholder": "Whitepaper durchsuchen...",
    "noTocResults": "Keine passenden Abschnitte gefunden.",
    "cta": "Identra Sandbox erleben"
  },
  "vi": {
    "backToLanding": "Trang chủ",
    "copyLink": "Chia sẻ",
    "copied": "Đã chép",
    "downloadPdf": "Tải PDF",
    "copyLinkTitle": "Sao chép đường dẫn",
    "mobileTocTitle": "Mục lục sách trắng",
    "desktopTocTitle": "Mục lục tài liệu",
    "tocAriaLabel": "Mục lục sách trắng",
    "searchPlaceholder": "Tìm trong sách trắng...",
    "noTocResults": "Không có mục nào khớp với tìm kiếm.",
    "cta": "Trải nghiệm Identra Sandbox"
  }
} as const satisfies Record<Language, WhitePaperUiCopy>;

const createWhitePaperCopy = (uiCopy: WhitePaperUiCopy): WhitePaperCopy => ({
  ...uiCopy,
  ...OFFICIAL_WHITE_PAPER_DOCUMENT,
});

export const WHITE_PAPER_TRANSLATIONS = {
  en: createWhitePaperCopy(WHITE_PAPER_UI_COPY.en),
  es: createWhitePaperCopy(WHITE_PAPER_UI_COPY.es),
  ja: createWhitePaperCopy(WHITE_PAPER_UI_COPY.ja),
  de: createWhitePaperCopy(WHITE_PAPER_UI_COPY.de),
  vi: createWhitePaperCopy(WHITE_PAPER_UI_COPY.vi),
} satisfies Record<Language, WhitePaperCopy>;
