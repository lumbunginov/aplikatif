# PageSpeed Optimization Design
**Date:** 2026-05-01  
**Target:** aplikatif.com (landing page)  
**Approach:** Opsi A — Tailwind CLI + Self-hosted fonts

## Konteks

Landing page `index.html` saat ini memiliki skor PageSpeed **85** (mobile) dengan FCP 3.0 dtk dan LCP 3.1 dtk. Dua render-blocking resource menjadi penyebab utama: Tailwind CDN (124 KB, 780 ms) dan Google Fonts CDN (780 ms). Total potensi penghematan: **2,120 ms**.

Hosting: shared hosting dengan deployment via git push. Build dilakukan lokal, output dicommit ke repo (tidak digitignore).

## Target

| Metrik | Sekarang | Target |
|--------|----------|--------|
| Performance | 85 | 93-95 |
| FCP | 3.0 dtk | ~1.0 dtk |
| LCP | 3.1 dtk | ~1.2 dtk |
| CLS | 0.059 | ~0.000 |
| Ukuran CSS | 124 KB | ~15 KB |
| External blocking requests | 3 | 0 |

## Arsitektur

### Struktur File

```
index.html              ← dimodifikasi
package.json            ← build tooling (baru)
tailwind.config.js      ← Tailwind config (baru)
src/
  input.css             ← CSS entry point (baru)
dist/
  style.css             ← OUTPUT BUILD — dicommit ke repo
assets/
  fonts/
    inter-400.woff2     ← self-hosted
    inter-500.woff2
    inter-600.woff2
    inter-700.woff2
    inter-800.woff2
```

### Alur Kerja

```
Edit index.html → npm run build → git add + commit (termasuk dist/) → git push
```

## Komponen

### 1. Build Setup

**`package.json`:**
```json
{
  "scripts": {
    "build": "tailwindcss -i src/input.css -o dist/style.css --minify"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0"
  }
}
```

**`src/input.css`:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**`tailwind.config.js`** — pindahkan `theme.extend` dari inline config Tailwind lama:
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

### 2. Self-hosted Fonts

Download font Inter dari `google-webfonts-helper` (website, tanpa install):
- Pilih Inter, weight: 400, 500, 600, 700, 800
- Download ZIP, extract ke `assets/fonts/`

Deklarasi `@font-face` masuk ke `<style>` inline di `<head>` agar tidak ada request tambahan:

```html
<style>
  @font-face {
    font-family: 'Inter';
    src: url('assets/fonts/inter-400.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  /* ulangi untuk weight 500, 600, 700, 800 */
</style>
```

### 3. Perubahan `index.html`

**Hapus:**
```html
<script src="https://cdn.tailwindcss.com"></script>
<script>tailwind.config = { ... }</script>
<link href="https://fonts.googleapis.com/..." rel="stylesheet" />
```

**Tambah di `<head>`:**
```html
<link rel="preload" href="dist/style.css" as="style" />
<link rel="stylesheet" href="dist/style.css" />
<style>
  /* @font-face declarations */
</style>
```

### 4. Quick Wins Tambahan

**Fix CLS — tambah dimensi pada logo:**
```html
<img src="assets/images/logo/logo.png" alt="Aplikatif" 
     class="h-8 w-auto" width="120" height="32" />
```
Nilai `width` dan `height` harus disesuaikan dengan dimensi aktual file `logo.png` (cek via browser dev tools atau image editor).

**Defer Meta Pixel — pindah ke sebelum `</body>`:**
```html
<!-- pindahkan dari <head> ke sebelum </body> -->
<script>
  !function(f,b,e,v,n,t,s){ ... }
  fbq('init', '1823575268352823');
  fbq('track', 'PageView');
</script>
```

## Hal Penting untuk Implementasi

- Setiap kali class Tailwind di `index.html` diubah, wajib `npm run build` sebelum push
- File `dist/style.css` selalu dicommit bersama perubahan HTML
- `dist/` **tidak** masuk `.gitignore`
- `node_modules/` tetap masuk `.gitignore`
- Font hanya perlu di-download sekali; tidak akan berubah kecuali ada pembaruan typeface

## Urutan Implementasi

1. Download font Inter → simpan ke `assets/fonts/`
2. Buat `package.json`, `tailwind.config.js`, `src/input.css`
3. Jalankan `npm install`
4. Modifikasi `index.html` (hapus CDN, tambah self-hosted CSS + fonts)
5. Jalankan `npm run build` → verifikasi `dist/style.css` terbentuk
6. Buka `index.html` di browser lokal → cek tampilan identik
7. Commit semua (termasuk `dist/style.css` + file font) → push
8. Test PageSpeed ulang
