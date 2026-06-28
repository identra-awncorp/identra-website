# Quy tắc phát triển dự án

## Trước khi code

- Luôn đọc toàn bộ `design.md` và `codex.md` trước khi phân tích hoặc chỉnh sửa code.
- Kiểm tra các component, utility, hook và pattern hiện có trước khi tạo mới.
- Tuân thủ design system, spacing system và các quy ước đã có trong dự án.

## Tái sử dụng và tính đồng nhất

- Ưu tiên tái sử dụng component, utility, hook và cấu trúc hiện có để bảo đảm giao diện và hành vi đồng nhất.
- Khi nhiều khu vực có cùng cấu trúc hoặc hành vi, tạo hoặc mở rộng một implementation dùng chung thay vì sao chép code.
- Không tạo style hoặc biến thể riêng cho từng trang nếu có thể giải quyết bằng một pattern dùng chung.
- Mọi thay đổi dùng chung phải được kiểm tra trên tất cả component và trang đang sử dụng pattern đó.

## Styling

- Dự án sử dụng Tailwind CSS. Ưu tiên Tailwind utility classes cho layout, spacing, typography, màu sắc, responsive, trạng thái và transition.
- Hạn chế viết CSS custom. Chỉ sử dụng khi Tailwind không thể biểu đạt hợp lý hoặc khi cần khai báo kỹ thuật dùng chung như keyframes đặc biệt.
- Ưu tiên sử dụng token, scale và class đã có; tránh các giá trị ngẫu nhiên làm mất tính đồng nhất.
- Không dùng inline style khi có thể biểu đạt bằng Tailwind CSS.

## Animation

- Sử dụng GSAP cho các hiệu ứng animation.
- Không tạo animation mới bằng Motion, CSS keyframes hoặc animation library khác.
- Tái sử dụng timeline, easing, duration và helper GSAP hiện có trước khi tạo mới.
- Không thay đổi animation của thành phần con khi yêu cầu chỉ liên quan đến animation của wrapper hoặc container.
- Luôn hỗ trợ `prefers-reduced-motion` và dọn dẹp GSAP context/timeline khi component unmount.

## Kiểm tra

- Sau khi chỉnh sửa, chạy kiểm tra TypeScript/lint và production build.
- Với thay đổi giao diện, kiểm tra trực tiếp các trang hoặc component bị ảnh hưởng ở các breakpoint liên quan.
- Xác minh tính đồng nhất của spacing, kích thước, alignment và animation trên tất cả biến thể liên quan.
