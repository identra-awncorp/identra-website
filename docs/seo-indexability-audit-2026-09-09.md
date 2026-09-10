# Rà soát khả năng lập chỉ mục — 09/09/2026

Hoàn tất đối chiếu bổ sung ngày 10/09/2026. Kết quả phản ánh thời điểm kiểm tra, không phải giám sát liên tục.

## Kết luận

Đã kiểm tra toàn bộ **374 URL công khai trong sitemap production** tại `https://www.identra.id.vn`, đối chiếu với route trong mã nguồn và HTML của bản build hiện có.

Không phát hiện URL nào trong nhóm này trả lỗi HTTP, chuyển hướng, bị `noindex` hoặc trỏ canonical sang URL khác. Tuy nhiên, **chưa thể kết luận Google đọc được toàn bộ nội dung của website**: một số nội dung chỉ được đưa vào DOM sau thao tác, Docs chưa có đơn vị nội dung độc lập để lập chỉ mục, và HTML ban đầu của phần lớn trang còn là bản tóm tắt chung.

Đây là báo cáo kiểm tra, không phải xác nhận 374 URL đã có trong chỉ mục Google. Google không bảo đảm lập chỉ mục ngay cả khi trang đáp ứng điều kiện kỹ thuật. Cần đối chiếu thêm Page Indexing, Crawl Stats và URL Inspection trong Search Console. [Điều kiện kỹ thuật của Google](https://developers.google.com/search/docs/essentials/technical).

Không sửa mã nguồn ứng dụng, UI, nội dung/SEO Blog, thuật ngữ hoặc cấu hình hosting trong lượt này. Các thay đổi thuật ngữ đã có trước được giữ nguyên.

## Phạm vi và kết quả đã xác minh

| Phạm vi | Số lượng | Kết quả |
| --- | ---: | --- |
| URL công khai trong sitemap production | 374 | HTTP 200 trực tiếp; HTML, robots và canonical đúng |
| URL công khai theo locale | en 71; es 71; ja 71; de 71; vi 90 | Không thiếu hoặc thừa so với tập route công khai hiện tại |
| Trang Blog trong tổng số trên | 18 | Có HTML bài viết đầy đủ; không chỉ có tiêu đề và mô tả |
| Login và Dashboard cấp gốc | 10 | HTTP 200, `noindex, nofollow`, không xuất hiện trong sitemap |
| HTML production được kiểm tra bổ sung | 374 | Hreflang trỏ đến URL hợp lệ, có một H1 trong HTML ban đầu; title khớp bản local |
| Tài nguyên tham chiếu trực tiếp trong HTML | 52 | Không lỗi HTTP trong lượt kiểm tra |
| Tài nguyên trong đồ thị phụ thuộc JS/CSS từ entry production | 99 | Không lỗi tải hoặc sai MIME JavaScript; hai tập tài nguyên có giao nhau |
| Kiểm tra User-Agent Googlebot | 5 trang đại diện và robots.txt | HTTP 200, không thấy chỉ thị chặn index; không phải yêu cầu từ IP thật của Google |
| Kiểm tra SEO bản build hiện có | 374 công khai, 10 riêng tư | `scan:seo-output`: 0 findings |
| Kiểm tra route và test SEO liên quan | 15 test | Đạt; `scan:routing-types`: 0 findings |

Đã kiểm tra thêm sitemap, robots.txt, RSS Blog, ảnh social, logo, canonical của PDF White Paper, biến thể HTTP/HTTPS và www/apex, dấu `/` cuối URL, URL không tồn tại và URL Relay cũ.

Kết quả đúng chủ đích:

- Root canonical chuyển hướng vĩnh viễn một bước tới `/en`; các biến thể tên miền kết thúc tại cùng URL, không có vòng lặp trong lượt kiểm tra.
- `/vi/` và `/vi/blog/` trả 308 tới URL không có dấu `/` cuối.
- `/vi/relay`, `/vi/__missing__`, `/vi/blog-detail/blog-1` trả 404 và `noindex`, không có canonical.
- `/en/white-paper` và bản `/en/` của bài SSI tiếng Việt trả 404. Các nội dung này hiện chỉ công bố URL tiếng Việt; chúng không nằm trong sitemap ở locale khác.
- PDF White Paper trả 200 và HTTP `Link` canonical tới `/vi/white-paper`.
- Robots cho phép thu thập dữ liệu, bao gồm các trang cần để crawler đọc được `noindex`.

## Các vấn đề còn lại, theo mức ưu tiên

### 1. Nội dung FAQ/accordion bị loại khỏi DOM khi đóng

**Ưu tiên cao cho mục tiêu đọc đủ nội dung, không phải lỗi chặn lập chỉ mục cả URL.**

Trên production `/vi/dynamic-flow`, bốn câu hỏi hiện diện nhưng chỉ một câu trả lời có trong DOM khi tải trang. Ba câu trả lời còn lại chỉ xuất hiện sau click. `/ja/interface-studio` cho kết quả tương tự: bốn nút FAQ, một panel trả lời.

Nguồn trực tiếp:

- `src/components/DynamicFlowPage.tsx:878`: `{isOpen && (...)}`.
- `src/components/InterfaceStudioPage.tsx:1068` và `:1440`: cùng kiểu render có điều kiện ở các nhánh giao diện.
- Những trang có FAQ dùng kiểu tương tự còn gồm Contact, Connect, Database Checks, Government ID, KYB, Mobile Driver's License, Pricing, Platform và Selfie Recognition.
- Business Fraud, Case Management, KYC/AML, NFC và Passive Signals còn có phần chi tiết tính năng/use case dạng accordion được gắn vào DOM theo lựa chọn.

Google Search không tương tác với trang để mở từng nút. Vì vậy không nên dựa vào click để cung cấp nội dung cần lập chỉ mục. [Hướng dẫn của Google về nội dung tải theo tương tác](https://developers.google.com/search/docs/crawling-indexing/javascript/lazy-loading).

Hướng xử lý: giữ nguyên câu chữ và thiết kế đóng/mở, nhưng đưa phần nội dung cần tìm kiếm vào HTML/DOM từ đầu; chỉ thay trạng thái hiển thị. Credential Issuance hiện đã giữ đủ bốn panel FAQ trong DOM và dùng `hidden`, là một ví dụ phù hợp trong dự án. Không cần biến accordion thành phần luôn mở.

### 2. Docs chưa cho phép Google đọc và lập chỉ mục từng phần tài liệu đầy đủ

**Ưu tiên cao nếu muốn Docs xuất hiện trên Google theo từng chủ đề.**

Bằng chứng production:

- `/vi/docs?tab=credential-issuance` và `/vi/docs?tab=api-ref` đều trả 200 nhưng có cùng title và canonical `/vi/docs`.
- Sau khi React chạy, tab Credential Issuance không có H1 và không có liên kết `<a href>` tới các tab.
- `src/components/DocsPage.tsx:170` render tab bằng button.
- `src/components/docs/DocsArticleLayout.tsx:289` chỉ chọn `activeSection`; `:370` chỉ render section đó. Các section khác cần click; lựa chọn được lưu bằng fragment `#section`.
- Đối chiếu bổ sung trên tab Credential Issuance: menu có bảy section, nhưng DOM chỉ có section tổng quan và các topic con của nó; section `credential-issuance-lifecycle` chưa tồn tại trước tương tác.
- `src/components/SeoMetadata.tsx:183` xác định metadata theo view, chưa phân biệt tab/section Docs.

Canonical dùng chung không phải lỗi cú pháp. Nhưng nó thể hiện rằng các tab không phải những trang độc lập cần được ưu tiên lập chỉ mục. Việc chỉ render một section còn khiến một lần tải không cung cấp toàn bộ nội dung tài liệu. [Hướng dẫn canonical](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).

Cần quyết định trước khi sửa: Docs hiện chứa hợp đồng/API minh họa, nên không mặc định công bố mọi mục như tài liệu production. Với phần được duyệt công khai, chọn URL ổn định cho từng tài liệu và metadata riêng, hoặc cung cấp toàn bộ nội dung của một tài liệu trên URL canonical chung. Không tạo thêm hàng loạt URL mỏng cho từng đoạn nhỏ.

### 3. HTML ban đầu của nhiều trang chưa chứa nội dung chính đang hiển thị cho người dùng

**Ưu tiên tiếp theo để giảm phụ thuộc vào bước render JavaScript.**

`scripts/generate-localized-pages.ts:199`–`:226` sinh phần giới thiệu ngắn, các năng lực liên quan và liên kết tài nguyên theo mẫu chung. Ví dụ bản HTML local tiếng Việt của Dynamic Flow và Interface Studio đều có khoảng 187 đơn vị tách bằng khoảng trắng, phần lớn là tóm tắt/liên kết liên quan, không phải toàn bộ nội dung trang.

Đo đồ thị liên kết `<a href>` trong body của HTML ban đầu:

- 271/374 URL không nhận liên kết từ body của một HTML khác trong tập này, không tính self-link.
- Nếu chỉ đi theo các liên kết body từ năm trang chủ locale, 296 URL chưa tới được.
- Các số này **chỉ mô tả HTML trước JavaScript**, không có nghĩa 271 hoặc 296 URL bị Google chặn: sitemap đã liệt kê đủ, còn Header/Footer sau render có nhiều liên kết đúng.

Kiểm tra trình duyệt trên `/vi` xác nhận Header/Footer đã có liên kết thật tới các trang sản phẩm, giải pháp, Blog và White Paper. Không nên kết luận các trang đó là trang mồ côi của toàn website chỉ từ bản HTML ban đầu.

Hướng xử lý: prerender/SSR phần nội dung thật và điều hướng hiện có, tái sử dụng dữ liệu/markup của trang để tránh thêm một bản copy SEO riêng bị lệch nội dung. Giữ nguyên Blog và White Paper vốn đã có nội dung đầy đủ. React không bắt buộc phải được thay bằng Next.js để thực hiện cải thiện này. [JavaScript SEO của Google](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).

### 4. Liên kết tới các kịch bản demo chỉ là nút điều hướng

`src/components/ListDemoPage.tsx:207` dùng button và `navigate()` để mở kịch bản. Production `/vi/demo` không có anchor tới `/vi/demo/...` sau render. Bản HTML ban đầu của danh sách demo cũng không liệt kê bảy URL kịch bản.

35 URL kịch bản theo năm ngôn ngữ đã có trong sitemap và truy cập được. Tuy nhiên, đường liên kết từ trang danh sách tới nội dung con chưa tốt cho crawler.

Hướng xử lý: dùng `<a href>` hoặc React Router `Link` cho hành động chuyển URL, giữ nguyên class và tương tác; bổ sung các liên kết kịch bản vào HTML danh sách. Các nút thao tác trong simulator không cần biến thành link. [Liên kết có thể thu thập dữ liệu](https://developers.google.com/search/docs/crawling-indexing/links-crawlable).

### 5. Bộ scanner chưa bao phủ các trường hợp trên

`scripts/seo-output-scanner.ts:404` kiểm tra số H2, đoạn văn và liên kết nhưng không kiểm tra nội dung đó có phải nội dung chính của route hay không. `scripts/seo-live-audit.ts` kiểm tra phản hồi ban đầu, không kiểm tra DOM sau render hoặc nội dung cần click.

Vì vậy kết quả `0 findings` hiện tại không đồng nghĩa toàn bộ nội dung có thể được Google đọc đầy đủ.

Hướng kiểm thử bổ sung: so sánh nội dung trọng yếu giữa HTML ban đầu và DOM sau render; kiểm tra các panel FAQ, các tài liệu công khai, link tới trang con; kiểm tra đồ thị liên kết và khả năng mở trực tiếp route lồng nhau.

## Phát hiện phụ, không phải lý do chặn 374 URL công khai

- `/vi/dashboard/credential-issuance` và một URL workspace flow lồng nhau trả HTTP 404 khi mở trực tiếp trên production. Với Credential Issuance, sau khi JavaScript chạy, UI vẫn hiển thị preview “Sắp ra mắt”, giữ `noindex` và canonical `/vi/dashboard`: trạng thái HTTP và UI sau render chưa nhất quán. Đây là vấn đề routing workspace cần xử lý riêng, không phải lý do đưa Dashboard vào sitemap hoặc bỏ `noindex`. Generator hiện chưa tạo entry cho workspace lồng nhau và cấu hình Vercel chưa có rewrite tương ứng.
- `/vi/blog/index.html` trả 200 với canonical `/vi/blog`, thay vì chuyển hướng. Đây là bản URL thay thế cần cân nhắc chuẩn hóa; không nằm trong sitemap và không phải canonical cần lập chỉ mục riêng.
- Title trùng giữa một số locale là tên sản phẩm chính thức, ví dụ Dynamic Flow; không ghi nhận description trùng trong tập HTML local. Không coi việc giữ nguyên tên sản phẩm đa ngôn ngữ là lỗi chặn lập chỉ mục.

## Kiểm tra trình duyệt đại diện

Đã kiểm tra DOM production sau render tại:

- `/vi`: một H1, canonical/robots đúng, nội dung thật và liên kết điều hướng xuất hiện.
- `/vi/docs?tab=credential-issuance`: đúng nội dung tab nhưng canonical chung, không H1, không anchor tab.
- `/vi/demo`: có nội dung danh sách, không anchor tới kịch bản.
- `/vi/blog-detail/dinh-danh-tu-chu-ssi-la-gi`: nội dung bài dài đầy đủ, một H1, ba liên kết bài liên quan, canonical/robots đúng.
- `/vi/dynamic-flow`: canonical/robots đúng; chỉ một trong bốn câu trả lời FAQ có trong DOM.
- `/ja/interface-studio`: locale/canonical đúng; chỉ một trong bốn câu trả lời FAQ có trong DOM; không tràn ngang ở viewport kiểm tra.
- `/de/credential-issuance`: locale/canonical đúng; đủ bốn panel FAQ trong DOM; không tràn ngang ở viewport kiểm tra.

Không thấy lỗi console trong các lượt đọc console đại diện ở Docs và trang sản phẩm. Chưa chạy render tự động cho toàn bộ 374 URL, chưa kiểm tra mọi viewport, và chưa có bản HTML render từ URL Inspection của Google. Kiểm tra HTML khi chưa chạy JavaScript ở đây là đọc phản hồi HTTP/bản build và quy tắc `noscript`, không phải một lượt QA trình duyệt tắt JavaScript cho mọi trang.

## Dữ liệu cần để chốt tình trạng trên Google

Đề nghị xuất Page Indexing từ Search Console, nhất là “Đã thu thập dữ liệu – hiện chưa được lập chỉ mục”, “Đã phát hiện – hiện chưa được lập chỉ mục”, “Google đã chọn trang chính tắc khác” và “Lỗi chuyển hướng”. Đối chiếu thêm lần crawl cuối, canonical Google chọn và HTML đã render của URL mẫu.

Không dùng kết quả `site:` để khẳng định số trang đã lập chỉ mục. Không gửi lại hoặc ép index các URL Login, Dashboard, 404, Relay đã bỏ hay bản ngôn ngữ không được xuất bản.

Ưu tiên xử lý: nội dung bị phụ thuộc click → phạm vi Docs được phép công bố → link trang danh sách/demo → HTML thật và kiểm thử chống tái phát. Không cần viết lại nội dung Blog hoặc đổi thuật ngữ để sửa các vấn đề kỹ thuật này.
