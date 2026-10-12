# Portfolio quzkhanh.github.io — Design Spec

Ngày: 2026-10-12 · Trạng thái: chờ duyệt

## 1. Mục tiêu

Trang giới thiệu cá nhân một trang (one-page) cho một **mobile developer (Android) build được mọi thứ** — web, automation, AI tooling.

- Người xem: HR/tech lead (xin việc), khách freelance, và người quen (personal brand). Tone: thân thiện nhưng chuyên nghiệp.
- Ngôn ngữ nội dung: **tiếng Anh**.
- Thành công khi: người xem trong 10 giây biết "đây là Android dev, làm được cả web/automation", xem được project nổi bật, và liên hệ được bằng 1 click.

## 2. Công nghệ

| Phần | Lựa chọn |
|---|---|
| Framework | Astro (bản stable mới nhất), output static |
| Interactive | `@astrojs/react` — chỉ dùng cho island có animation |
| Animation | `motion` (Motion for React) |
| Smooth scroll | `lenis` (script Astro thuần, không React) |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) + CSS variables làm token |
| Font | Roboto Flex variable (Fontsource, tự host, đủ trục `wdth`/`opsz`/`wght`) |
| Deploy | GitHub Actions: `withastro/action` + `actions/deploy-pages` → `https://quzkhanh.github.io` |

Phiên bản cụ thể tra Context7/npm lúc cài, chọn bản stable mới nhất.

## 3. Hướng thiết kế

**Minimal editorial, light only.** Không có dark mode, không có nút đổi theme; khai báo `color-scheme: light`.

### 3.1 Ý tưởng gốc từ chủ đề

Chủ đề là Android: Roboto là font hệ thống của Android, màn hình điện thoại co giãn theo mọi kích thước. Vì vậy:

- **Typography là nhân vật chính**: dùng một họ font duy nhất — Roboto Flex — và dùng trục độ rộng `wdth` như một phần thiết kế. Tên ở hero load lên từ dạng hẹp (condensed) giãn ra dạng rộng, giống một layout responsive đang co giãn.
- **Thứ đáng nhớ duy nhất**: preview project hiện **trong khung điện thoại** đi theo con trỏ khi rê chuột vào danh sách project. Mọi thứ khác giữ im lặng, kỷ luật.

### 3.2 Token màu

| Tên | Hex | Vai trò |
|---|---|---|
| `paper` | `#F2F3EF` | Nền (trắng xám lạnh, không phải kem ấm) |
| `ink` | `#1C2433` | Chữ chính (mực xanh đậm) |
| `muted` | `#5E6675` | Chữ phụ (contrast ≥ 4.5:1 trên `paper`) |
| `line` | `#D9DCD5` | Đường kẻ mảnh giữa các hàng project |
| `signal` | `#3DDC84` | Xanh Android — chỉ cho dấu hiệu không phải chữ (chấm "available", viền khung điện thoại khi active) |
| `signal-ink` | `#0B6B3A` | Bản tối của `signal` cho link hover / focus ring (đủ contrast) |

Token khai báo trong `src/styles/global.css` (`:root` + `@theme` của Tailwind). Không hardcode màu trong component.

### 3.3 Typography

- Một họ: **Roboto Flex**.
- Display (tên hero): weight 800, `wdth` cao, `clamp()` theo viewport, `letter-spacing` âm nhẹ.
- Heading section: weight 600, `wdth` 100–110.
- Body: weight 400, `opsz` tự động, line-height 1.6, tối đa ~64ch.
- Thang chữ đặt bằng CSS variables (`--step--1` … `--step-5`), không rải `text-[xxpx]`.
- Không ALL CAPS label, không eyebrow label trên heading, không highlight riêng một từ trong headline.

### 3.4 Layout

Căn trái, lưới 12 cột, nội dung tối đa ~1200px, gutter 16px trên mobile.

```
+----------------------------------------------------------+
| Khánh Nguyễn                         Work  About  Contact|
+----------------------------------------------------------+
|                                                          |
|  KHÁNH                                                   |  ← chữ rất to, giãn wdth khi load
|  NGUYỄN                                                  |
|                         Android developer. I ship apps   |
|                         in Kotlin and Compose, and build |
|                         whatever else the job needs.     |
|                         (●) Open to freelance & full-time|
+----------------------------------------------------------+
| Selected work                                            |
| ──────────────────────────────────────────────────────── |
| Project A          What it does in a phrase   Android 2025|  ← hover: khung điện thoại
| ──────────────────────────────────────────────────────── |     đi theo con trỏ
| Project B          ...                        Web     2026|
| ──────────────────────────────────────────────────────── |
+----------------------------------------------------------+
| About                      | What I build                |
| 2–3 câu bio                | Mobile: Kotlin, Compose...  |
|                            | Web: Astro, React, TS       |
|                            | Automation & AI: Python...  |
+----------------------------------------------------------+
| hello@example.com   (chữ to, magnetic hover)             |
| GitHub   LinkedIn   CV                                   |
+----------------------------------------------------------+
| © 2026 Khánh Nguyễn. Built with Astro and Claude.        |
+----------------------------------------------------------+
```

Mobile (< 768px): một cột; hàng project xếp dọc (tên → mô tả → platform/năm) và hiện thumbnail khung điện thoại nhỏ ngay trong hàng thay cho hover.

### 3.5 Motion

Chỉ **một khoảnh khắc tự chạy**: lúc load, tên hero giãn `wdth` + đoạn intro hiện ra (CSS `@keyframes` + `font-variation-settings`, không cần JS).

Còn lại chỉ là motion phản hồi hành động người dùng:
- Hover hàng project → khung điện thoại preview đi theo con trỏ (spring), đổi ảnh theo hàng.
- Hover email lớn ở Contact → hiệu ứng magnetic nhẹ.
- Lenis smooth scroll.

**Không** có fade/slide-in từng section khi cuộn, không hover effect trên mọi phần tử. `prefers-reduced-motion: reduce` → tắt animation hero, tắt Lenis, preview hiện tĩnh không spring.

### 3.6 Đã sửa so với bản nháp ban đầu (theo skill `frontend-design`)

| Bản nháp | Đổi thành | Lý do |
|---|---|---|
| Nền kem ấm + serif nghiêng Instrument Serif | Nền `paper` lạnh + một họ Roboto Flex | Cặp kem + serif là mặc định của web AI; Roboto gắn trực tiếp với Android |
| Đánh số `01 02 03` cho project | Bỏ số, phân hàng bằng đường kẻ mảnh | Danh sách project không phải chuỗi có thứ tự |
| "Say hi →" | Email hiển thị thẳng, chữ to | Mũi tên gắn text là tell; email nói rõ hành động |
| Nav `Work · About · Contact` | Cách nhau bằng khoảng trắng | Dấu `·` là template chrome |
| Section fade-in khi cuộn | Bỏ | Chỉ giữ một khoảnh khắc motion ở hero |

## 4. Cấu trúc code

```
src/
  pages/index.astro            # ráp các section, không chứa logic
  layouts/Base.astro           # <head>, meta SEO/OG, font, Lenis script
  components/
    Header.astro
    Hero.astro
    Work.astro                 # đọc collection, render list tĩnh + island
    WorkPreview.tsx            # island (client:media="(hover: hover)") — khung điện thoại theo con trỏ
    About.astro
    Contact.astro
    Magnetic.tsx               # island (client:visible) — bọc link email
    PhoneFrame.astro           # khung điện thoại dùng chung (thumbnail mobile)
    Footer.astro
  content/projects/*.md        # 1 file = 1 project
  content.config.ts            # schema zod
  data/site.ts                 # thông tin cá nhân
  styles/global.css            # token + base
public/                        # favicon, og.png, cv.pdf (tuỳ chọn)
.github/workflows/deploy.yml
```

Mỗi file component < 200 dòng. Không duplicate: khung điện thoại chỉ định nghĩa một lần (style dùng chung giữa `PhoneFrame.astro` và `WorkPreview.tsx` qua class CSS trong `global.css`).

### 4.1 Schema project

```ts
{
  title: string,
  summary: string,          // 1 cụm ngắn: app làm gì
  platform: 'Android' | 'iOS' | 'Web' | 'Automation' | 'AI',
  year: number,
  image: image(),           // ảnh màn hình dọc, .webp
  link?: url,               // store / demo
  repo?: url,
  nda?: boolean,            // true → không có link, ghi "Private client work"
  order: number,
}
```

### 4.2 `site.ts`

`name`, `role`, `intro`, `availability`, `email`, `github`, `linkedin?`, `cv?`. Field tuỳ chọn để trống thì link tương ứng không render.

## 5. Nội dung khởi tạo

- `remotion-cuongit-template` — Automation, 2026 — tự động tạo video chia sẻ kiến thức với Remotion.
- `auto-crawl-tiktok-post-fb` — Automation, 2026 — tool crawl và đăng bài tự động.
- 2 project Android mẫu, tiêu đề ghi rõ `Sample Android app` để chủ trang thay bằng app thật.
- Ảnh preview: ảnh placeholder trung tính tỉ lệ màn hình điện thoại.
- Email trong `site.ts` để `hello@example.com` cho tới khi chủ trang điền email cá nhân (không dùng email công ty).

## 6. KHÔNG có ở v1

Dark mode / nút đổi theme · blog · trang chi tiết project · form liên hệ / backend · analytics · song ngữ · hiệu ứng 3D · fade-in section khi cuộn.

## 7. Deploy

- Workflow `deploy.yml` chạy khi push `main`: build bằng `withastro/action`, deploy bằng `actions/deploy-pages`.
- Repo Settings → Pages → Source = GitHub Actions (bật qua `gh api` khi deploy lần đầu).

## 8. Kiểm tra trước khi báo xong

1. `npx astro check` và `npm run build` pass, không warning type.
2. Chụp màn hình bằng Playwright (skill `webapp-testing`) ở 1440px và 390px, tự soát và sửa lệch.
3. Soát UI theo skill `web-design-guidelines` (a11y, focus visible, contrast, reduced motion).
4. Kiểm tra trang live sau khi Action deploy xong.
