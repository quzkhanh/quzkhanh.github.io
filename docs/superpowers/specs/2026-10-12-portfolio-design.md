# Portfolio quzkhanh.github.io — Design Spec

Ngày: 2026-10-12, cập nhật 2026-10-14. Bản chốt: trang kiểu Notion, phần project là tường Pinterest.

## 1. Mục tiêu

Portfolio một trang cho **quzkhanh**, mobile, web & game developer làm solo từ màn đầu tới release (native hoặc cross-platform), build được cả web 3D, game trình duyệt và automation. Không nhấn mạnh riêng Kotlin hay native.

- Người xem chính: **khách freelance**. Nội dung tiếng Anh, ít chữ, ảnh và video thật là chính.
- Cảm giác: tối giản như Notion, có phong cách như Pinterest. **Nhẹ, nhanh, mượt.**
- Thành công khi: lướt là thấy app thật đang chạy, bấm một pin là xem hết màn của app đó, liên hệ bằng một click.

## 2. Công nghệ

| Phần | Lựa chọn |
|---|---|
| Framework | Astro 7, output static, content collections |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`), token trong `@theme` |
| Font | Font hệ thống (giống Notion), không tải webfont |
| Icon | `@phosphor-icons/core`, nhúng SVG lúc build |
| Tương tác | HTML native: `<dialog>`, CSS scroll-snap, một script nhỏ cho masonry, video, sheet |
| Ảnh | `astro:assets`, xuất webp đúng cỡ hiển thị |
| Deploy | GitHub Actions: `withastro/action` + `actions/deploy-pages` → `https://quzkhanh.github.io` |

Không có React hay thư viện animation.

## 3. Thiết kế

Light only. Màu: chữ `#37352f`, chữ phụ `#6b6a65` (5:1), nền phụ `#f1f1ef`, viền `#e9e9e7`, nhấn đỏ Pinterest `#e60023` (chữ trắng trên đỏ 4.78:1).

Quy tắc bo góc: control kiểu Notion `0.375rem`, pin `1rem`, sheet `2rem`, nút CTA dạng pill.

### 3.1 Bố cục

1. **Cover**: dải ảnh màn hình thật của các app (thay ảnh bìa Notion).
2. **Page header** (cột hẹp như trang Notion): page icon là avatar GitHub (`github.com/quzkhanh.png`, lấy trực tiếp nên tự đổi theo GitHub, cũng là favicon), tên `quzkhanh`, các dòng property (Role, Works, Contact), callout "Have an app in mind?" với nút `Get in touch` (mailto).
2b. **What I do**: bento 5 thẻ, mỗi thẻ một mảng chung chung (Mobile apps, Websites, Games, UI from design, Automation), không liệt kê thư viện. Websites và Games có link `See the work` nhảy xuống hàng PT Anatomy / Neon Harbor. Thẻ Mobile apps nền tối, chứa icon 9 app; bấm icon mở sheet của app đó. App chưa có icon thật hiện chữ cái đầu trên màu app.
2c. **Web & games**: mỗi dự án `kind: web | game` một hàng case study, so le trái/phải trên desktop, xếp chồng trên điện thoại. Trái là video 16:9 tự phát (bấm mở closeup sheet), phải là tên, `Web app/Browser game · Solo, năm`, một câu mô tả, 2–3 con số thật (`stats`), tag stack, nút `Play ↗`/`Open live ↗` và `Code ↗` mở tab mới. **Chỉ trưng bày**: không nhúng game hay model 3D vào trang.
3. **Apps I built**: tường masonry 2/3/4/5 cột. Mỗi pin là một màn hình hoặc video quay màn hình của một app, cắt theo vài tỉ lệ luân phiên cho cao thấp so le. Pin video đứng đầu tường.
4. Footer: `© năm quzkhanh`.

### 3.2 Pin và closeup sheet

- Pin video tự phát không tiếng khi vào màn hình, rời màn hình thì dừng. Poster chỉ tải khi sắp cuộn tới.
- Hover: phủ tối nhẹ + nút `Open`.
- Bấm pin mở sheet kiểu closeup Pinterest: trái là gallery vuốt ngang (video trước, rồi các ảnh), nút ‹ › trên desktop; phải là icon app, tên, một câu mô tả, "Built: Solo, năm", tag Stack, link (chỉ hiện link có thật).
- Sheet mở đúng màn của pin vừa bấm. Đóng bằng Esc, nút ✕, bấm ra ngoài. Đóng thì dừng video, trang sau không cuộn khi sheet mở.

### 3.3 Accessibility và motion

- Pin là `<button aria-haspopup="dialog">`, sheet là `<dialog>` modal.
- `prefers-reduced-motion`: video không tự phát, sheet không có hiệu ứng mở.

## 4. Nội dung

- 9 app thật từ `~/AndroidStudioProjects`: Weather Forecast, AR Learn Draw, Decision Maker, Color Notes, App Lock, Accurate Weather, IPTV Player, Photo Recovery, TV Cast.
- Ảnh và video chụp trên emulator: ads tắt, mọi thứ trả lại nguyên trạng sau khi chụp.
- Web & games: PT Anatomy (`~/pt-anatomy`), Neon Harbor và Mèo Lạc Nhà (`~/games`). Video quay bằng bot của game + Godot Movie Maker (`--write-movie`), PT Anatomy quay bằng Playwright trên bản live. Không dùng cảnh có máu/xác. Repo game đang private nên chỉ có nút Play.
- Không link store: app đứng tên công ty, quzkhanh làm solo.
- Email liên hệ: `quzkhanh.vn@gmail.com`. Mục kinh nghiệm bổ sung sau.

## 5. KHÔNG có

"Available for work" · tab lọc có đếm số · chấm trạng thái trang trí · dấu gạch dài · eyebrow · ảnh giả vẽ bằng div · hero tên cỡ lớn · dark mode · blog · trang riêng từng project · form liên hệ · analytics.

## 6. Cấu trúc code

```
src/
  pages/index.astro          # ráp Cover, PageHeader, PinGrid, footer
  layouts/Base.astro         # <head>, SEO/OG
  components/
    Cover.astro              # dải ảnh bìa
    PageHeader.astro         # avatar, tên, properties, callout
    Skills.astro             # What I do bento
    Showcase.astro           # Web & games: các hàng case study + sheet
    ShowcaseRow.astro        # một hàng: video, stats, nút mở tab mới
    PinGrid.astro            # masonry + script (packing, video, sheet)
    Pin.astro                # một pin ảnh hoặc video
    PinSheet.astro           # closeup sheet
  content/projects/*.md      # 1 file = 1 app
  content.config.ts          # schema
  data/site.ts               # thông tin cá nhân
  assets/projects/<slug>/    # ảnh màn hình webp
  assets/icons/<slug>.webp   # icon launcher thật (không dùng icon template)
  styles/global.css          # token + class dùng chung
public/                      # og.png (ảnh preview khi share link, 1200×630), videos/<slug>.mp4
.github/workflows/deploy.yml
```

Schema project: `title`, `summary`, `tech[]`, `year`, `images[]` (≥ 1), `icon?`, `video?`, `kind` (`app` | `web` | `game`, mặc định `app`), `stats[]` ({value, label}), `color` (hex), `store?`, `repo?`, `demo?`, `order` (thứ tự trong nhóm của nó).

## 7. Deploy

Workflow chạy khi push `main`. Repo Settings → Pages → Source = GitHub Actions.

## 8. Kiểm tra trước khi báo xong

1. `npm run build` (gồm `astro check`) pass.
2. Playwright ở 1440px và 390px: không cuộn ngang, không lỗi console, sheet mở đúng màn và phát video.
3. Tải lần đầu trên desktop dưới ~700 KB.
4. Kiểm tra trang live sau khi deploy.
