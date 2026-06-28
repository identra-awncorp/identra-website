---
name: SSI Design System
version: 0.1.0-alpha
tokens:
  color-light:
    primary: "#5B6CFF"
    primary-hover: "#4A5AF0"
    secondary: "#8F9BFF"
    background: "#F7F8FC"
    surface: "#FFFFFF"
    text-primary: "#1F2937"
    text-secondary: "#6B7280"
    border: "#E5E7EB"
    success: "#22C55E"
    gradient-start: "#5B6CFF"
    gradient-end: "#60A5FA"
    scrollbar-thumb: "#C7CEFF"
    scrollbar-thumb-hover: "#5B6CFF"

  color-dark:
    background: "#0B0F1A"
    surface: "#111827"
    surface-elevated: "#1F2937"

    text-primary: "#E5E7EB"
    text-secondary: "#9CA3AF"

    border: "#374151"

    primary: "#7C8CFF"
    primary-hover: "#6B7BFF"

    gradient-start: "#5B6CFF"
    gradient-end: "#3B82F6"

    success: "#22C55E"
    scrollbar-thumb: "#343E78"
    scrollbar-thumb-hover: "#7C8CFF"

  typography:
    font-family-base: "'Inter', sans-serif"
    font-size-xs: "12px"
    font-size-sm: "14px"
    font-size-md: "16px"
    font-size-lg: "20px"
    font-size-xl: "28px"
    font-size-2xl: "36px"
    font-weight-regular: 400
    font-weight-medium: 500
    font-weight-semibold: 600
    font-weight-bold: 700

  spacing:
    xs: "4px"
    sm: "8px"
    md: "16px"
    lg: "24px"
    xl: "32px"
    2xl: "48px"
    3xl: "64px"

  radius:
    sm: "8px"
    md: "12px"
    lg: "20px"
    pill: "999px"

  shadow:
    sm: "0 2px 8px rgba(0,0,0,0.05)"
    md: "0 4px 16px rgba(0,0,0,0.08)"
    lg: "0 10px 30px rgba(0,0,0,0.12)"
---

## Overview
Thiết kế landing page này theo phong cách **hiện đại, tối giản và công nghệ cao**, tập trung vào cảm giác tin cậy và kiểm soát dữ liệu cá nhân. Ngôn ngữ thiết kế sử dụng nhiều khoảng trắng (whitespace), màu xanh làm chủ đạo và các gradient nhẹ để tạo chiều sâu.

Hệ thống hướng đến:
- Trải nghiệm rõ ràng, dễ đọc
- Nhấn mạnh CTA (Call To Action)
- Tạo cảm giác bảo mật & đáng tin

---

## Colors

### Primary (`#5B6CFF`)
Màu chính dùng cho CTA, button, highlight và các điểm nhấn quan trọng. Đây là màu dẫn dắt ánh nhìn của người dùng.

Luôn sử dụng primary cho hành động chính như “Dùng thử”, “Đăng ký”. Không dùng quá nhiều ở background để tránh gây mỏi mắt.

### Background (`#F7F8FC`)
Màu nền tổng thể giúp giao diện nhẹ và thoáng. Tạo độ tương phản tốt với các card trắng.

Dùng cho toàn bộ page hoặc section lớn, giúp phân tách các khối nội dung.

### Surface (`#FFFFFF`)
Dùng cho card, navbar, form và các container. Kết hợp với shadow để tạo layer.

Giữ surface luôn sạch sẽ, không dùng gradient hoặc màu mạnh.

### Text Primary (`#1F2937`)
Màu chữ chính, đảm bảo độ tương phản WCAG AA (>= 4.5:1).

Dùng cho tiêu đề và nội dung quan trọng.

### Text Secondary (`#6B7280`)
Dùng cho mô tả, metadata, label phụ.

Không dùng cho CTA hoặc nội dung chính vì độ tương phản thấp hơn.

### Border (`#E5E7EB`)
Dùng cho divider, input, card outline.

Giúp phân tách nhẹ nhàng mà không gây nặng giao diện.

---

## Typography

### Font Family
`Inter, sans-serif`

Font hiện đại, dễ đọc trên web, phù hợp với sản phẩm công nghệ.

---

### Heading
- H1: 36px / Bold
- H2: 28px / Semibold
- H3: 20px / Medium

Heading phải rõ ràng, spacing rộng, không dùng quá nhiều weight khác nhau.

---

### Body
- Default: 16px / Regular
- Secondary: 14px / Regular

Text body cần line-height khoảng 1.5–1.7 để đảm bảo readability.

---

## Layout

### Container
- Max width: 1200px
- Center align
- Padding: 24px

---

### Spacing System
Sử dụng scale 8px:
- 8px, 16px, 24px, 32px, 48px, 64px

Không sử dụng spacing ngẫu nhiên để đảm bảo consistency.

---

### Grid
- 12-column grid
- Gap: 24px

---

## Components

### Button

#### Primary Button
- Background: `{color.primary}`
- Text: white
- Padding: 12px 20px
- Radius: `{radius.pill}`
- Font-weight: 600

Hover:
- `{color.primary-hover}`

Usage:
- CTA chính
- Hành động quan trọng

---

#### Secondary Button
- Border: 1px solid `{color.border}`
- Background: white
- Text: `{color.text-primary}`

Usage:
- Hành động phụ
- Không cạnh tranh với primary

---

### Card

- Background: `{color.surface}`
- Radius: `{radius.md}`
- Padding: `{spacing.lg}`
- Shadow: `{shadow.sm}`

Card dùng để:
- Nhóm nội dung
- Highlight feature
- Tạo phân cấp layout

Không nên dùng quá nhiều shadow mạnh.

---

### Navbar

- Height: 72px
- Background: white
- Border-bottom: 1px solid `{color.border}`
- Layout: flex (space-between)

Elements:
- Logo trái
- Menu center
- CTA phải

Navbar luôn giữ đơn giản, không nhồi quá nhiều item.

---

### Input / Form

- Border: 1px solid `{color.border}`
- Radius: `{radius.pill}`
- Padding: 10px 16px

Focus:
- Border: `{color.primary}`

---

### Scrollbar

- Use a compact `5px` width for scrollable panels and sidebars.
- Keep the track transparent so it blends into the surrounding surface.
- Use `{color-light.scrollbar-thumb}` in light mode and `{color-dark.scrollbar-thumb}` in dark mode.
- On hover, use the corresponding primary color.
- Scrollbar colors must update with the active light or dark theme.
- Apply this scrollbar style globally to every scrollable area.
- Keep intentionally hidden scrollbars hidden only when the interaction explicitly requires it.
- Do not create page-specific scrollbar colors or dimensions.

---

## Do's and Don'ts

### Do's
- Giữ nhiều khoảng trắng để tăng readability
- Sử dụng primary color cho CTA rõ ràng
- Dùng consistent spacing (8px system)
- Giữ typography hierarchy rõ ràng
- Dùng shadow nhẹ để tạo layer

---

### Don'ts
- ❌ Không dùng quá nhiều màu gradient cùng lúc
- ❌ Không trộn nhiều font family
- ❌ Không sử dụng màu text secondary cho nội dung chính
- ❌ Không đặt button primary cạnh nhau quá nhiều (gây nhiễu)
- ❌ Không sử dụng border đậm hoặc shadow quá nặng
- ❌ Không phá vỡ spacing system (ví dụ: 13px, 22px)
- ❌ Không dùng màu primary cho background lớn (gây mỏi mắt)

---

## Accessibility

- Contrast text ≥ 4.5:1 (WCAG AA)
- Button có hover + focus rõ ràng
- Font size tối thiểu: 14px
- Click target ≥ 44px height

---

## Summary

Design system này tập trung vào:
- **Clarity**
- **Trust**
- **Modern minimalism**

Nếu triển khai đúng, nó sẽ tạo ra trải nghiệm:
→ dễ hiểu  
→ đáng tin  
→ chuyển đổi cao  
