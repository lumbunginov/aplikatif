# PageSpeed Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminasi semua render-blocking external resource dari aplikatif.com untuk meningkatkan Performance score dari 85 → 93-95 dan FCP/LCP dari ~3.0s → ~1.0-1.2s.

**Architecture:** Ganti Tailwind CDN (124 KB, 780 ms blocking) dengan file CSS hasil Tailwind CLI (~15 KB, lokal). Ganti Google Fonts CDN dengan satu variable font woff2 yang di-self-host. Pindahkan Meta Pixel ke bawah body agar tidak memblokir render. Semua output build dicommit ke repo karena shared hosting tidak bisa menjalankan build step.

**Tech Stack:** Tailwind CSS v3 CLI, `@fontsource-variable/inter` (woff2 variable font, satu file untuk semua weight), Node.js (copy-fonts script, dijalankan sekali)

---

## File Map

| File | Action | Tujuan |
|------|--------|--------|
| `package.json` | Create | Build scripts + dev dependencies |
| `tailwind.config.js` | Create | Config Tailwind (dipindah dari inline script) |
| `src/input.css` | Create | CSS entry point untuk Tailwind CLI |
| `scripts/copy-fonts.js` | Create | Salin woff2 dari node_modules ke assets/fonts/ |
| `assets/fonts/inter.woff2` | Create | Variable font self-hosted (dicommit) |
| `dist/style.css` | Create (auto) | Output Tailwind CLI yang diminify (dicommit) |
| `index.html` | Modify | Hapus CDN, tambah compiled CSS + font, fix CLS, pindah Pixel |
| `.gitignore` | Modify/verify | `node_modules/` ignored, `dist/` TIDAK ignored |

---

### Task 1: Buat build tooling

**Files:**
- Create: `package.json`
- Create: `tailwind.config.js`
- Create: `src/input.css`
- Create: `scripts/copy-fonts.js`
- Modify: `.gitignore`

- [ ] **Step 1: Buat `package.json`**

```json
{
  "name": "aplikatif-landing",
  "version": "1.0.0",
  "scripts": {
    "build": "tailwindcss -i src/input.css -o dist/style.css --minify",
    "setup-fonts": "node scripts/copy-fonts.js"
  },
  "devDependencies": {
    "@fontsource-variable/inter": "^5.0.0",
    "tailwindcss": "^3.4.0"
  }
}
```

- [ ] **Step 2: Buat `tailwind.config.js`**

Ini memindahkan config yang sebelumnya ada di dalam `<script>tailwind.config = {...}</script>` di `index.html`:

```js
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      colors: {
        brand: {
          indigo: '#4F46E5',
          emerald: '#10B981',
          dark: '#1E293B',
          light: '#F9FAFB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    }
  }
}
```

- [ ] **Step 3: Buat `src/input.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 4: Buat `scripts/copy-fonts.js`**

```js
const fs = require('fs');

fs.mkdirSync('assets/fonts', { recursive: true });

const src = 'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2';
const dst = 'assets/fonts/inter.woff2';

fs.copyFileSync(src, dst);
const sizeKB = (fs.statSync(dst).size / 1024).toFixed(1);
console.log(`✓ Copied inter.woff2 (${sizeKB} KB)`);
```

- [ ] **Step 5: Verifikasi dan update `.gitignore`**

Buka `.gitignore`. Pastikan baris berikut ada:

```
node_modules/
```

Pastikan `dist/` TIDAK ada di `.gitignore` — karena `dist/style.css` harus dicommit ke repo agar bisa diakses shared hosting.

- [ ] **Step 6: Commit tooling files**

```bash
git add package.json tailwind.config.js src/input.css scripts/copy-fonts.js .gitignore
git commit -m "build: add Tailwind CLI build tooling"
```

---

### Task 2: Install dependencies & siapkan font

**Files:**
- Generate: `node_modules/` (tidak dicommit)
- Generate: `package-lock.json` (dicommit)
- Create: `assets/fonts/inter.woff2` (dicommit)
- Create: `dist/style.css` (dicommit)

- [ ] **Step 1: Install dependencies**

```bash
npm install
```

Expected: `added N packages in Xs` — tidak ada error merah.

- [ ] **Step 2: Salin font dari node_modules**

```bash
npm run setup-fonts
```

Expected output:
```
✓ Copied inter.woff2 (XX.X KB)
```

Jika error `ENOENT: no such file or directory`, cek apakah file ada di node_modules:
```bash
ls node_modules/@fontsource-variable/inter/files/
```
Cari file dengan nama `inter-latin-wght-normal.woff2` dan sesuaikan path di `scripts/copy-fonts.js` jika berbeda.

- [ ] **Step 3: Jalankan build pertama untuk verifikasi setup**

```bash
npm run build
```

Expected: Tailwind CLI selesai tanpa error. Jika ada error, baca pesannya — biasanya karena `tailwind.config.js` ada typo.

- [ ] **Step 4: Verifikasi output**

```bash
ls -lh dist/style.css assets/fonts/inter.woff2
```

Expected:
- `dist/style.css` — ukuran sekitar **10-20 KB** (jauh lebih kecil dari CDN 124 KB)
- `assets/fonts/inter.woff2` — ukuran sekitar **95-110 KB**

- [ ] **Step 5: Commit font, lock file, dan dist**

```bash
git add assets/fonts/inter.woff2 dist/style.css package-lock.json
git commit -m "build: add compiled CSS, self-hosted Inter font, and lockfile"
```

---

### Task 3: Modifikasi `index.html`

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Cek dimensi aktual logo**

Buka `assets/images/logo/logo.png` di image viewer atau browser. Catat lebar (width) dan tinggi (height) dalam pixel — akan dipakai di Step 4.

- [ ] **Step 2: Hapus Tailwind CDN + inline config dari `<head>`**

Hapus tiga blok ini (sekitar baris 9-29 di `index.html`):

```html
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          brand: {
            indigo: '#4F46E5',
            emerald: '#10B981',
            dark: '#1E293B',
            light: '#F9FAFB',
          }
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
        }
      }
    }
  }
</script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
```

- [ ] **Step 3: Hapus Meta Pixel dari `<head>`**

Hapus blok ini dari `<head>` (sekitar baris 60-76):

```html
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1823575268352823');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=1823575268352823&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->
```

- [ ] **Step 4: Ganti blok `<style>` lama + tambah compiled CSS**

Hapus seluruh blok `<style>` lama (sekitar baris 31-59):

```html
<style>
  html { scroll-behavior: smooth; }
  .countdown-box { ... }
  ...
</style>
```

Tambahkan blok berikut setelah `<link rel="icon" .../>`:

```html
  <link rel="stylesheet" href="dist/style.css" />
  <style>
    @font-face {
      font-family: 'Inter';
      src: url('assets/fonts/inter.woff2') format('woff2');
      font-weight: 100 900;
      font-style: normal;
      font-display: swap;
    }
    html { scroll-behavior: smooth; }
    .countdown-box {
      background: rgba(255,255,255,0.15);
      backdrop-filter: blur(4px);
      border: 1px solid rgba(255,255,255,0.3);
    }
    .gradient-hero {
      background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
    }
    .card-hover {
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .card-hover:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(79,70,229,0.15);
    }
    .wa-float {
      position: fixed;
      bottom: 24px;
      right: 20px;
      z-index: 999;
      animation: pulse-wa 2s infinite;
    }
    @keyframes pulse-wa {
      0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.5); }
      50% { box-shadow: 0 0 0 12px rgba(16,185,129,0); }
    }
  </style>
```

- [ ] **Step 5: Fix dimensi logo (fix CLS)**

Temukan tag `<img>` logo di navbar:

```html
<img src="assets/images/logo/logo.png" alt="Aplikatif" class="h-8 w-auto" />
```

Tambahkan `width` dan `height` sesuai dimensi aktual yang dicatat di Step 1. Contoh jika logo 120×32px:

```html
<img src="assets/images/logo/logo.png" alt="Aplikatif" class="h-8 w-auto" width="120" height="32" />
```

- [ ] **Step 6: Pindahkan Meta Pixel ke sebelum `</body>`**

Tambahkan blok berikut tepat sebelum tag `</body>` (setelah `<!-- COUNTDOWN SCRIPT -->` block):

```html
  <!-- Meta Pixel Code -->
  <script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '1823575268352823');
  fbq('track', 'PageView');
  </script>
  <noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=1823575268352823&ev=PageView&noscript=1"
  /></noscript>
  <!-- End Meta Pixel Code -->

</body>
```

- [ ] **Step 7: Verifikasi `<head>` tidak ada CDN tersisa**

```bash
grep -n "tailwindcss.com\|googleapis.com\|gstatic.com" index.html
```

Expected: **tidak ada output** (tidak ada baris yang match). Jika ada, berarti masih ada CDN yang terlewat — hapus.

---

### Task 4: Build ulang, verifikasi visual, commit & push

**Files:**
- Modify: `dist/style.css` (rebuild setelah perubahan index.html)

- [ ] **Step 1: Build ulang setelah perubahan index.html**

```bash
npm run build
```

Expected: selesai tanpa error.

- [ ] **Step 2: Buka index.html di browser lokal**

Buka file `index.html` langsung di browser (double-click atau drag ke browser). Cek setiap bagian:

- [ ] Promo banner hijau muncul dengan countdown berjalan
- [ ] Navbar: logo + tombol "Konsultasi Gratis" emerald
- [ ] Hero: background gradient ungu, teks putih, tombol WhatsApp
- [ ] Font Inter tampil (sans-serif bersih, bukan Times New Roman/serif)
- [ ] Kartu "Masih pakai Excel" — 4 kartu 2×2 grid
- [ ] Section "Kenapa Bisa Murah?" — 3 kartu dengan border kiri
- [ ] Section harga — kartu Starter dengan badge "Paling Populer"
- [ ] Countdown promo di section harga berjalan
- [ ] Cara kerja — 4 langkah dengan nomor bulat
- [ ] Footer + floating WhatsApp button (kanan bawah, animasi pulse)
- [ ] Hover effect kartu harga (naik sedikit saat di-hover)

Jika tampilan ada yang rusak, buka DevTools (F12) → Console. Error seperti `Failed to load resource dist/style.css` berarti `npm run build` belum dijalankan atau path salah.

- [ ] **Step 3: Commit index.html + dist/style.css yang diupdate**

```bash
git add index.html dist/style.css
git commit -m "perf: replace Tailwind CDN + Google Fonts with compiled CSS + self-hosted font

- Remove cdn.tailwindcss.com (124 KB, 780ms blocking)
- Remove fonts.googleapis.com (780ms blocking)
- Add Tailwind CLI compiled dist/style.css (~15 KB, local)
- Add self-hosted Inter variable font (no external requests)
- Fix logo img dimensions to prevent CLS
- Move Meta Pixel to bottom of body"
```

- [ ] **Step 4: Push ke hosting**

```bash
git push
```

Tunggu beberapa detik untuk server shared hosting menarik perubahan via git hook.

- [ ] **Step 5: Buka situs live**

Buka `https://aplikatif.com` di browser (bukan file lokal). Hard refresh dengan `Ctrl+Shift+R` untuk bypass cache.

Konfirmasi tampilan identik dengan verifikasi lokal di Step 2.

---

### Task 5: Verifikasi PageSpeed

- [ ] **Step 1: Jalankan PageSpeed Insights**

Buka `https://pagespeed.web.dev/` → masukkan `https://aplikatif.com` → pilih Mobile → Analyze.

- [ ] **Step 2: Bandingkan dengan baseline**

| Metrik | Sebelum | Target | Aktual |
|--------|---------|--------|--------|
| Performance | 85 | 93–95 | ___ |
| FCP | 3.0 dtk | ~1.0 dtk | ___ |
| LCP | 3.1 dtk | ~1.2 dtk | ___ |
| CLS | 0.059 | ~0.000 | ___ |

- [ ] **Step 3: Cek bagian Opportunities/Insights**

Pastikan "Permintaan pemblokiran rendering" tidak lagi mencantumkan:
- `cdn.tailwindcss.com`
- `fonts.googleapis.com`

Jika masih muncul, jalankan:
```bash
grep -n "tailwindcss.com\|googleapis" index.html
```
dan hapus baris yang ditemukan, lalu rebuild + push ulang.

- [ ] **Step 4: Jika skor tidak naik signifikan**

Cek apakah file bisa diakses dari server:
- Buka `https://aplikatif.com/dist/style.css` di browser — harus tampil CSS
- Buka `https://aplikatif.com/assets/fonts/inter.woff2` — harus ter-download (bukan 404)

Jika 404, berarti file tidak ikut ter-push. Jalankan:
```bash
git status
git add dist/style.css assets/fonts/inter.woff2
git commit -m "fix: add missing build output files"
git push
```
