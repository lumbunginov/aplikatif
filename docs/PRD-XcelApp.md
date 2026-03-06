# PRD — Aplikatif: Jasa Pembuatan Aplikasi dari File Excel

**Versi:** 1.1  
**Tanggal:** 4 Maret 2026  
**Owner:** Faizal  
**Brand:** Aplikatif  
**Domain:** aplikatif.com  
**Status:** Draft

---

## 1. Executive Summary

**Aplikatif** adalah jasa pembuatan web aplikasi berbasis Laravel yang mengkonversi kebutuhan klien (awalnya berfokus pada keuangan dasar & form) menjadi aplikasi web yang siap pakai. Model bisnis dirancang dengan harga masuk serendah mungkin untuk memaksimalkan akuisisi pelanggan, didukung revenue recurring dari layanan hosting bulanan. Proses pengembangan dimaksimalkan dengan AI untuk menjaga efisiensi dan margin. Dikelola secara solo oleh founder, dengan traffic utama dari **Meta Ads (Facebook & Instagram)** yang mensyaratkan landing page **mobile-first**.

---

## 2. Problem Statement

Banyak individu dan bisnis (UMKM hingga perusahaan menengah) yang masih mengelola data keuangan, form, dan operasional harian di Excel/Google Sheets. Masalah yang mereka hadapi:

- Data mudah corrupt/hilang, tidak ada backup otomatis
- Tidak ada validasi input — error manusia tinggi
- Sulit diakses oleh banyak user secara bersamaan
- Tidak ada tampilan laporan/dashboard yang proper
- Butuh skill teknis untuk modifikasi

**Gap:** Solusi yang ada di pasar terlalu mahal (agency) atau terlalu teknis (no-code tools). Belum ada jasa yang menawarkan web app custom dengan harga sangat terjangkau dan model berlangganan ringan.

---

## 3. Goals & Success Metrics

### Goals
- Akuisisi pelanggan sebanyak mungkin di fase awal
- Membangun template library Laravel yang reusable
- Membangun recurring revenue dari hosting

### Key Metrics
| Metric | Target (3 bulan) | Target (6 bulan) |
|--------|-----------------|-----------------|
| Jumlah klien aktif | 50 klien | 200 klien |
| MRR (hosting) | Rp 250.000 | Rp 1.000.000 |
| Avg. delivery time per proyek | < 3 hari | < 1 hari |
| Template tersedia | 5 template | 15 template |
| Churn rate (hosting) | < 20% | < 10% |

---

## 4. Target Market

### Primary (Fase 1)
**Industri:** Keuangan dasar & form management

**Segmen:**
- UMKM (toko, bengkel, warung makan) yang butuh pencatatan kas sederhana
- Freelancer/konsultan yang butuh form klien atau invoice generator
- Komunitas/organisasi yang butuh form pendaftaran/rekapitulasi

### Secondary (Fase 2 — setelah template library kuat)
- HR & Absensi
- Inventori/Gudang
- Laporan Penjualan

### Karakteristik Ideal Customer
- Punya file Excel yang digunakan berulang
- Tidak punya budget untuk custom software agency (>Rp 5jt)
- Butuh solusi cepat (< 1 minggu)
- Bersedia bayar hosting bulanan asal murah

---

## 5. Product Overview

### 5.1 Core Offering: Web App (Laravel-based)

Setiap proyek adalah web aplikasi Laravel yang di-deploy di server. Klien mendapat:
- URL unik untuk aplikasinya (`namaklien.xcelapp.id` atau custom domain)
- Login/auth sistem sederhana
- Form input data (sesuai kebutuhan)
- Tabel/list data yang sudah diinput
- Export ke Excel/PDF (opsional, tergantung paket)
- Dashboard laporan sederhana (opsional)

### 5.2 Template Library (Internal)
Developer membangun dan mengakumulasi template Laravel yang bisa di-clone dan dikustomisasi per proyek:

**Template Prioritas Fase 1:**
1. 📋 **Kas Harian** — Input pemasukan & pengeluaran, saldo otomatis, laporan bulanan
2. 🧾 **Invoice Generator** — Buat & kirim invoice PDF, tracking status bayar
3. 📝 **Form Collector** — Form input data custom, rekapitulasi otomatis ke tabel
4. 💼 **Buku Piutang/Hutang** — Catat hutang, reminder jatuh tempo
5. 📊 **Laporan Keuangan Sederhana** — Rekap pemasukan/pengeluaran dengan chart

### 5.3 PWA Add-on
Klien yang butuh akses mobile-friendly bisa upgrade ke paket PWA:
- Aplikasi bisa di-install di home screen HP
- Akses offline untuk input data dasar
- Push notification (opsional)

---

## 6. Pricing Structure

### Development Fee (One-Time)
| Paket | Harga | Deskripsi |
|-------|-------|-----------|
| **Starter** | Rp 75.000 | 1 template standar, fitur dasar, tanpa kustomisasi |
| **Basic** | Rp 150.000 – 300.000 | Kustomisasi ringan (warna, field, logo) |
| **Custom** | Rp 500.000+ | Fitur tambahan, integrasi, logika kompleks |

### Hosting Subscription (Monthly)
| Tier | Harga/bulan | Kapasitas |
|------|-------------|-----------|
| **Nano** | Rp 5.000 | Cocok untuk aplikasi sederhana, 1–3 pengguna |
| **Micro** | Rp 15.000 | Lebih besar, custom domain |
| **Small Biz** | Rp 35.000 | Dedicated resource, priority support |

### PWA Add-on
- Setup fee: Rp 50.000 (one-time)
- Termasuk dalam hosting tier Micro ke atas

### Strategi Harga
- Entry barrier serendah mungkin (Rp 75k) untuk akuisisi massal
- Margin utama dari hosting recurring + upsell paket lebih tinggi
- Klien yang sudah pakai cenderung tidak pindah (sticky product)

---

## 7. AI-Powered Development Process

Untuk menjaga efisiensi dan margin meski harga rendah, proses pengembangan wajib memaksimalkan AI:

### Workflow per Proyek
```
1. Klien isi form brief (kebutuhan, file Excel mereka)
        ↓
2. AI analisa kebutuhan → generate spec otomatis
        ↓
3. Developer pilih template Laravel yang sesuai
        ↓
4. AI generate kode kustomisasi (field, label, logika)
        ↓
5. Developer review + deploy (< 1 jam per proyek)
        ↓
6. Klien terima akses aplikasi
```

### Tools AI yang Digunakan
- **Code generation:** Claude / GitHub Copilot / Cursor
- **Brief analysis:** Claude (parse kebutuhan dari deskripsi klien)
- **Testing & QA:** AI-assisted test case generation
- **Support:** Chatbot FAQ otomatis untuk klien

### Target Efisiensi
- Proyek Starter: **< 30 menit** dari brief → deploy
- Proyek Basic: **< 3 jam**
- Proyek Custom: **< 2 hari**

---

## 8. Technical Architecture

### Stack
- **Backend:** Laravel (PHP) — framework utama semua proyek
- **Frontend:** Blade + TailwindCSS / Alpine.js (ringan, cepat)
- **Database:** MySQL (per proyek, isolated)
- **PWA:** Laravel PWA package + Service Worker
- **Hosting:** Domain Asia (shared hosting, deploy manual per proyek)
- **Auth:** Laravel Breeze / Jetstream (tergantung paket)

### Infrastruktur Hosting
- Provider: **Domain Asia**
- Deploy: Manual oleh developer per proyek
- Subdomain per klien: `[slug-klien].aplikatif.com`
- SSL: Let's Encrypt (gratis, otomatis)

### Template Repository
- Private Git repo berisi semua template Laravel
- Setiap template punya README + setup guide
- Branch per proyek klien untuk tracking perubahan

---

## 9. Customer Journey & Sales Flow

### Alur Utama
```
1. User landing di aplikatif.com
        ↓
2. Browse katalog proyek/template yang tersedia
   (filter by kategori, harga, fitur)
        ↓
3. Temukan yang mirip kebutuhannya?
   ├── YA → Lihat detail + estimasi harga (lebih murah)
   └── TIDAK → Isi form "Request Custom"
        ↓
4. Klik "Konsultasi Gratis" → WhatsApp / form kontak
   (wajib konsultasi dengan manusia sebelum order)
        ↓
5. Diskusi kebutuhan, finalisasi scope & harga
        ↓
6. Klien transfer pembayaran (manual)
        ↓
7. Development dimulai → Delivery sesuai estimasi
        ↓
8. Klien terima akses aplikasi + setup hosting
```

### Fitur Landing Page (aplikatif.com)
> **Tech Stack Landing Page: Static Web** (HTML + CSS + JS murni, tanpa framework backend)
> Alasan: deploy cepat, ringan, performa mobile optimal, zero server config.

- **Katalog Proyek:** Grid/list semua template/proyek yang pernah dibuat
  - Filter by kategori (JS-based, client-side)
  - Setiap item: screenshot, deskripsi singkat, estimasi harga
  - Label: "Template Tersedia" (lebih murah) vs "Bisa Custom"
- **Halaman Detail Proyek:** Demo live (jika ada), fitur list, harga estimasi
- **CTA Konsultasi:** Tombol WhatsApp floating di semua halaman
- **Pricing Section:** Tabel paket Starter/Basic/Custom + hosting
- **Portofolio/Testimoni:** Proyek yang sudah live (dengan izin klien)
- **Form Konsultasi:** Maks. 3 field (nama, WA, kebutuhan) — kirim via WhatsApp deep link atau Formspree (no backend needed)

### Logika Harga Berbasis Kemiripan
| Kondisi | Harga Development |
|---------|------------------|
| Template 100% cocok, tanpa kustomisasi | Rp 75.000 (Starter) |
| Template ada, perlu kustomisasi ringan | Rp 150.000 – 300.000 (Basic) |
| Tidak ada template yang cocok, full custom | Rp 500.000+ (Custom) |

### Payment Flow (Manual)
1. Sepakat harga via konsultasi
2. Developer kirim nomor rekening + invoice sederhana
3. Klien transfer
4. Konfirmasi bukti transfer via WhatsApp
5. Development dimulai

---

## 10. Go-to-Market Strategy (GTM)

### Paid Channel Utama: Meta Ads (Facebook & Instagram)
- **Format iklan:** Video/Reels (before/after: Excel berantakan → aplikasi keren)
- **Target audience:** Pemilik UMKM, admin keuangan, freelancer usia 22–45
- **Landing page:** Wajib **mobile-first** — semua traffic dari Meta masuk via HP
- **CTA iklan:** "Konsultasi Gratis" → langsung ke WhatsApp
- **Pixel:** Pasang Meta Pixel di landing page untuk retargeting & optimasi konversi

### Requirement Landing Page (Mobile-First, Static Web)
- **Tech:** HTML5 + TailwindCSS (CDN) + Vanilla JS — tidak perlu build tools
- **Hosting:** Domain Asia (upload manual via FTP/cPanel)
- Load time < 3 detik di mobile (optimasi gambar WebP, minify inline)
- Layout single-column, tombol CTA besar & mudah di-tap
- WhatsApp button floating di semua halaman
- Tidak ada tabel kompleks di mobile — gunakan card layout
- Form konsultasi singkat (maks. 3 field) — submit via WhatsApp deep link
- Hero section langsung to the point — value proposition dalam 1 kalimat
- **Upgrade path:** Setelah portofolio cukup, migrasi ke Laravel (tetap di domain yang sama)

### Fase 1 — Traction (Bulan 1-3)
- **Channel:** Meta Ads (Facebook & Instagram) + Facebook Group UMKM (organik)
- **Hook:** "Ubah Excel kamu jadi aplikasi web — mulai Rp 75.000"
- **Offer awal:** 10 klien pertama gratis / diskon 100% (build portofolio & testimoni)
- **Target:** 50 klien aktif

### Fase 2 — Growth (Bulan 4-6)
- Scale Meta Ads dengan data dari Fase 1 (Pixel + Lookalike Audience)
- Testimoni + case study → konten iklan baru
- Referral program (diskon hosting 1 bulan per referral)
- SEO: "bikin aplikasi dari excel murah", "jasa web app UMKM"

### Fase 3 — Scale (Bulan 7+)
- Tambah kategori industri (HR, inventori)
- Order form self-service di aplikatif.com
- Pertimbangkan white-label untuk reseller

---

## 10. Risks & Mitigations

| Risk | Dampak | Mitigasi |
|------|--------|----------|
| Harga terlalu murah, margin tipis | Tinggi | Efisiensi AI wajib, upsell aktif |
| Klien churn dari hosting | Tinggi | Bikin produk sticky, support responsif |
| Template tidak cukup reusable | Sedang | Invest waktu di arsitektur template sejak awal |
| Permintaan kustomisasi ekstrem di paket murah | Sedang | Scope limitation yang jelas di kontrak/ToS |
| Server down, klien komplain | Tinggi | Monitoring uptime, SLA di ToS |

---

## 11. Open Questions (Perlu Diputuskan)

- [x] Nama brand: **Aplikatif** ✅
- [x] Tagline: **"Bikin Aplikasi dari Excel? Bisa. Mulai Rp 75.000."** ✅
- [x] Warna: Indigo `#4F46E5` + Emerald `#10B981` + White ✅
- [x] WhatsApp CTA: **0856-4664-5065** ✅
- [x] Domain: **aplikatif.com** ✅
- [x] Hosting provider: **Domain Asia**, deploy manual ✅
- [x] Payment: **Manual (transfer bank)** — tidak pakai payment gateway di fase awal ✅
- [x] Tim: **Solo** (founder-led) ✅
- [ ] Apakah nanti buka reseller/white-label?

---

## 12. Milestones

| Milestone | Target |
|-----------|--------|
| Template Library v1 (5 template) | Minggu 2 |
| Landing page live | Minggu 3 |
| Klien pertama (free/diskon) | Minggu 4 |
| 10 klien aktif berbayar | Bulan 2 |
| 50 klien aktif | Bulan 3 |
| MRR Rp 1.000.000 | Bulan 6 |

---

*PRD ini adalah dokumen hidup — update seiring bisnis berkembang.*
