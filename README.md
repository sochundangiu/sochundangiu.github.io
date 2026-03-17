# 🌸 Profile Website — Hướng dẫn tuỳ chỉnh

## Cấu trúc thư mục
```
Website/
├── index.html      ← Nội dung chính (tên, bio, link)
├── style.css       ← Giao diện, màu sắc
├── script.js       ← Hiệu ứng, nhạc
└── assets/
    ├── avatar.jpg          ← ẢNH ĐẠI DIỆN của bạn (thêm vào đây)
    ├── avatar_placeholder.png  ← Ảnh mặc định nếu chưa có
    ├── bg.mp4              ← VIDEO NỀN của bạn (thêm vào đây)
    └── music.mp3           ← NHẠC NỀN của bạn (thêm vào đây)
```

---

## ✏️ Đổi thông tin cá nhân (`index.html`)

### 1. Tên của bạn
Tìm dòng:
```html
Tên của bạn
```
Đổi thành tên thật của bạn.

### 2. Username / @tag
Tìm:
```html
@username · <span class="pronouns">she/her 🌸</span>
```
Đổi `@username` và `she/her 🌸` tuỳ ý.

### 3. Bio
Tìm:
```html
<span class="bio-full" hidden>✨ đang nghe nhạc 🎵 | dreamer 🌙 | sống để ăn và ngủ 🍜💤</span>
```
Thay nội dung bên trong thành bio của bạn.

### 4. Link mạng xã hội
Tìm và thay thế:
- `YOUR_IG` → tên Instagram (VD: `cunghoangdao.vn`)
- `YOUR_FB` → profile ID Facebook (VD: `yourname`)
- `YOUR_DISCORD_ID` → Discord user ID số (VD: `123456789`)

### 5. Năm tham gia
Tìm:
```html
<span class="member-date">2024</span>
```
Đổi năm tuỳ ý.

---

## 🖼️ Thêm ảnh đại diện
- Đặt ảnh của bạn vào `assets/` và đặt tên là `avatar.jpg`
- Ảnh nên có tỉ lệ 1:1 (vuông)

## 🎬 Thêm video nền
- Đặt video vào `assets/bg.mp4`
- Nên dùng video ngắn (~10-30s) loop mượt, không có tiếng

## 🎵 Thêm nhạc nền
- Đặt file nhạc vào `assets/music.mp3`
- Nhạc sẽ bật khi click nút 🎵 ở góc dưới phải

---

## 🎨 Đổi màu chủ đạo (`style.css`)
Đầu file `style.css`, tìm phần `:root { ... }` và chỉnh:
```css
--pink:   #f9a8d4;   /* màu hồng chính */
--purple: #c084fc;   /* màu tím */
--violet: #a78bfa;   /* tím nhạt */
--blue:   #818cf8;   /* xanh */
--cyan:   #67e8f9;   /* xanh ngọc */
```

---

## 🌐 Deploy miễn phí (GitHub Pages)

1. Tạo tài khoản [github.com](https://github.com) nếu chưa có
2. Tạo repo mới tên: `username.github.io` (thay `username` bằng tên GitHub của bạn)
3. Upload toàn bộ file trong thư mục `G:\Website\` lên repo đó
4. Vào **Settings → Pages → Source: main branch → Save**
5. Website sẽ live tại: `https://username.github.io` 🎉

> 💡 Tên miền hoàn toàn **miễn phí**, không cần thẻ tín dụng!

---

## 🐛 Lỗi thường gặp
| Vấn đề | Giải pháp |
|--------|-----------|
| Video không hiện | Kiểm tra file `assets/bg.mp4` đã đúng tên chưa |
| Nhạc không phát | Trình duyệt block autoplay — cần click nút 🎵 trước |
| Ảnh đại diện không hiện | Đặt `avatar.jpg` vào thư mục `assets/` |
| Mở thẳng file bị lỗi CORS | Dùng Live Server (VS Code extension) hoặc deploy lên GitHub Pages |
