# Rà soát SEO và khả năng lập chỉ mục — 17/09/2026

## Kết luận

Đã kiểm tra trực tiếp **375 URL công khai trên production** tại `https://www.identra.id.vn`, đối chiếu route, sitemap, metadata và nội dung HTML với mã nguồn/bản build.

Không phát hiện lỗi HTTP, chuyển hướng ngoài ý muốn, `noindex`, canonical hoặc hreflang sai trong tập 375 URL này. Cả 375 trang có tiêu đề và nội dung đọc được trong trình duyệt tắt JavaScript ở 390 × 844px. Tuy nhiên, vẫn còn lỗi responsive trên 10 URL marketing và lỗi mở trực tiếp workspace Dashboard; không kết luận toàn website hoàn hảo.

Đây là kiểm tra khả năng truy cập và điều kiện kỹ thuật, **không phải xác nhận Google đã lập chỉ mục 375 trang**, cũng không chứng minh thứ hạng hoặc chất lượng nội dung. Google không bảo đảm lập chỉ mục chỉ vì một trang đáp ứng điều kiện kỹ thuật. [Google Search: Technical requirements](https://developers.google.com/search/docs/essentials/technical).

## Những thay đổi đã thực hiện ở local

1. Bỏ `X-Robots-Tag: noindex` khỏi `/vi/self-sovereign-identity-book`. Giữ chuyển hướng 307 tới đúng tệp Google Drive, `Cache-Control: no-store`, không thêm menu/liên kết giao diện hoặc sitemap. Các bản `en`, `es`, `ja`, `de` vẫn trả 404. Đã xác nhận GET và HEAD trên preview không còn header chặn lập chỉ mục.
2. Bỏ quy tắc bắt buộc mọi shortcut bên ngoài phải có `noindex`; giữ kiểm tra HTTPS, đích hợp lệ, xung đột trang, nguồn trùng, vòng lặp và chuỗi chuyển hướng. Test kiểm tra link sách không tự thêm `X-Robots-Tag`.
3. Bổ sung xuống dòng cho liên kết dài trong phần thân Blog, ở cả renderer React và HTML tĩnh. Bài GDPR/SSI trước đó tràn 16px khi tắt JavaScript, 153px khi bật JavaScript ở 390px. Sau sửa không còn tràn ở 390, 768, 1440px. Không đổi nội dung, tiêu đề, URL đích, thuật ngữ hoặc bản dịch của bài viết.
4. Mở rộng `audit:seo-live`: kiểm tra đúng một canonical, hreflang theo locale được xuất bản, ngôn ngữ HTML, metadata thiếu/trùng trong cùng locale, JSON-LD, H1, nội dung prerender và CSS hiển thị khi không có JavaScript. Không tải URL ngoài tập route đã xác định nếu sitemap chứa mục bất thường.
5. Ghi rõ trong tài liệu: không xuất hiện trên giao diện không đồng nghĩa tài nguyên riêng tư hoặc phải loại khỏi Google.

**Chưa deploy.** Tại thời điểm kiểm tra, `/vi/self-sovereign-identity-book` trên production vẫn trả 404 vì cấu hình shortcut local chưa được triển khai. Các thay đổi trong báo cáo này chưa được xác nhận trên production.

## Phạm vi và bằng chứng

| Hạng mục | Kết quả |
| --- | --- |
| Sitemap production | Đủ 375 URL, khớp tập route công khai, không trùng mục |
| HTTP của 375 URL | 200, không chuyển hướng, trả HTML |
| Robots của 375 URL | `index, follow, max-image-preview:large`; không có HTTP header chặn lập chỉ mục |
| Canonical/hreflang | Một canonical tự trỏ; đúng tập ngôn ngữ của từng route |
| Title/description | Có nội dung; không trùng giữa các trang khác nhau trong cùng locale |
| JSON-LD | JSON hợp lệ, có đối tượng trang trỏ đúng canonical; không thay thế kiểm tra rich results chuyên biệt |
| robots.txt | Cho phép thu thập toàn site, trỏ sitemap đúng host `www` |
| Redirect tên miền/root | Không vòng lặp; `/` về `/en`, các biến thể host/protocol về host chuẩn |
| URL không tồn tại | Production trả 404; không có canonical tới một trang công khai khác |
| Liên kết nội bộ HTML tĩnh | Không tìm thấy đích nội bộ thiếu file; toàn bộ 375 URL đi tới được từ các homepage qua anchor thật |
| Ảnh trong HTML công khai | Không thiếu thuộc tính `alt`; scanner asset không thấy đường dẫn local bị thiếu. Chưa đánh giá thủ công chất lượng từng alt |
| HTML không JavaScript | 375/375 trang có H1 và nội dung đọc được ở 390px, skeleton không che trang |
| Docs | Giữ một canonical cho mỗi locale; đủ 31 section trong HTML. Đúng lựa chọn chưa tách các tài liệu API mẫu thành URL riêng |
| Blog/White Paper | Giữ nội dung biên tập và metadata hiện có; không viết lại từ khóa hoặc thuật ngữ |

Kiểm tra trình duyệt bổ sung: `/vi`, `/vi/docs?tab=credential-issuance`, `/vi/dynamic-flow`, `/ja/interface-studio`, `/de/credential-issuance`, `/vi/white-paper`, bài GDPR/SSI và `/vi/demo`; ba độ rộng 390/768/1440px, JavaScript bật/tắt, tổng cộng 48 trường hợp. Không phát hiện lỗi canonical, robots, nội dung bị skeleton che, tràn ngang hoặc lỗi JavaScript trong nhóm đại diện này sau sửa. Khi tắt JavaScript, Docs hiển thị đủ 31 section.

## Những lệnh noindex còn giữ lại

- 10 URL Login/Dashboard cấp cao nhất theo năm locale: trang chức năng, không phải trang giới thiệu tài nguyên; ngoài sitemap theo chính sách hiện có. Đây không phải cơ chế bảo vệ dữ liệu và không đồng nghĩa mã nguồn bí mật.
- Trang lỗi 404: không phải nội dung có thật để xuất hiện trên Google.
- HTML fallback của root `/`: phục vụ chuyển hướng tới `/en`; URL nội dung chuẩn `/en` vẫn được phép lập chỉ mục.
- PDF White Paper không có `noindex`; giữ HTTP canonical tới trang HTML `/vi/white-paper`.

Không có lệnh `Disallow` chặn crawler khỏi tài nguyên công khai. Không tự gỡ chính sách của Login/Dashboard hoặc đưa trang lỗi vào sitemap. [Google: cách hoạt động của noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing).

## Các vấn đề còn lại

### 1. Tràn ngang ở mobile — lỗi trải nghiệm, không phải chặn lập chỉ mục

Đo trên local production preview ở 390px, xác nhận tồn tại cả khi bật và tắt JavaScript. Chưa sửa bố cục các trang marketing trong lượt này.

| URL | Tràn ngang |
| --- | ---: |
| `/en/connect` | 9px |
| `/es/connect` | 10px |
| `/de/connect` | 51px |
| `/de/business-fraud` | 11px |
| `/ja/passive-signals` | 389px |
| `/de/mobile-drivers-license` | 45px |
| `/de/adverse-media` | 136px |
| `/de/age-assurance` | 26px |
| `/es/e-learning` | 24px |
| `/de/e-learning` | 28px |

Ưu tiên kiểm tra Passive Signals tiếng Nhật và Adverse Media tiếng Đức. Có các nhãn/tab dài và ràng buộc kích thước cần xử lý đúng tại component; không nên che lỗi bằng cách cắt ngang toàn trang. Số liệu này không phải điểm Core Web Vitals hay kết quả Google đánh giá trải nghiệm trang.

### 2. Workspace Dashboard trả 404 khi tải trực tiếp

Production `/vi/dashboard/credential-issuance` trả HTTP 404. Đây là vấn đề routing đã được ghi trong backlog trước đó; route chỉ được xử lý ở phía React nhưng chưa có entry/rewrite HTTP tương ứng. Không phải nguyên nhân loại các trang marketing/Blog khỏi chỉ mục; không giải quyết bằng cách bỏ `noindex` của Dashboard.

### 3. URL thay thế và trang lỗi truy cập trực tiếp

- `/vi/blog/index.html` vẫn trả 200 với canonical `/vi/blog`. Không nằm trong sitemap; có thể chuẩn hóa bằng redirect sau khi kiểm tra toàn bộ cấu hình hosting. Canonical hiện đã chỉ về URL sạch.
- `/vi/404` trực tiếp trả 200 trên production nhưng có `noindex` và không canonical. URL không tồn tại thông thường trả đúng 404. Đây là điểm cần đồng bộ HTTP routing, không phải lỗi làm các trang thật mất chỉ mục.
- `/en/white-paper` trả 404 đúng với việc chỉ xuất bản White Paper tiếng Việt; không coi là bản dịch bị bỏ sót trong sitemap.

## Kiểm thử bản sửa

- `typecheck`: đạt.
- `lint`: 0 lỗi, 154 cảnh báo sẵn có; lint riêng các file code thay đổi: 0 lỗi/cảnh báo.
- `test`: 234/234 đạt.
- Production build và 16/16 kiểm thử prerender: đạt.
- `scan:all`: 0 phát hiện, gồm asset, interaction, CTA, localization/i18n, routing, encoding, inheritance, typography.
- `scan:seo-output`: 0 phát hiện trên 375 URL công khai, 10 URL chức năng và 19 bài Blog.
- `audit:seo-live` bản mở rộng: 0 phát hiện trong tập URL công khai được kiểm tra. Những điểm ngoài sitemap ở mục trên được kiểm tra bổ sung riêng, không bị che bởi con số này.

## Việc cần làm sau khi deploy

1. Kiểm tra lại shortcut sách trả 307, đúng Location và không có `X-Robots-Tag: noindex` trên production.
2. Chạy lại `npm.cmd run audit:seo-live` và kiểm tra bản mobile của bài Blog đã sửa.
3. Đối chiếu Page Indexing, URL Inspection, canonical Google chọn và ngày crawl trong Search Console. Chưa có quyền/dữ liệu Search Console trong lượt này, nên không xác định được từng URL đã được Google lập chỉ mục hay lý do Google chưa chọn một trang.
4. Xử lý nhóm lỗi responsive và routing được liệt kê; không cần thay framework hay viết lại nội dung bài viết để thực hiện các việc đó.
