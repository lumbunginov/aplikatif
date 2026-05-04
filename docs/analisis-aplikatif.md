# Aplikatif.com — Implementation Brief untuk Claude Code

**Tanggal:** 3 November 2026
**Format:** Eksekusi oleh Claude Code
**Sumber:** Analisis Meta Ads campaign + audit landing page

---

## Konteks (Untuk Pemahaman Awal Claude Code)

Landing page `aplikatif.com` saat ini punya conversion problem serius:
- 330 Landing Page View → 11 click WA (3.3%) → 2 chat real (18% dari klik)
- Cost per real chat: Rp 91.500 (target: < Rp 25.000)

**Strategi baru yang akan diimplementasi:**

1. **Hapus countdown promo cache-based** → ganti dengan evergreen scarcity (slot terbatas)
2. **Ubah CTA utama** dari "Chat WhatsApp Sekarang" → **"Lihat Contoh Aplikasi"**
   - Alasan: kata "konsultasi" / "chat" dianggap commitment tinggi oleh UMKM
   - Strategi: tunjukkan portfolio dulu → user yakin → baru chat
3. **Buat halaman baru** `/contoh-aplikasi` berisi list demo aplikasi
4. **WhatsApp tetap jadi konversi akhir**, tapi dipindahkan setelah user lihat portfolio

**Funnel baru yang diharapkan:**
```
Iklan FB → Landing Page → "Lihat Contoh Aplikasi" → /contoh-aplikasi
        → Browse demo → Tertarik → "Chat WA untuk Pesan" → Real Chat
```

---

## SECTION 1: Update Landing Page Utama (`/`)

### Task 1.1: Hapus Cache-based Countdown, Ganti Evergreen Scarcity ✅ SELESAI

**File yang kemungkinan terdampak:**
- Komponen banner top (yang ada teks "Gratis hosting 3 bulan pertama — berakhir dalam: BERAKHIR")
- Komponen pricing section (yang ada teks "Promo telah berakhir 😞")
- File JS/TS yang handle countdown timer
- LocalStorage / cache logic untuk timer

**Yang harus dilakukan:**

#### A. Hapus Logic Countdown Timer

Cari dan hapus:
- Semua kode yang baca/tulis ke `localStorage` terkait promo deadline
- Setinterval / setTimeout untuk update countdown
- Komponen `<Countdown />` atau sejenisnya
- State management untuk `timeRemaining`, `isExpired`, dll

#### B. Ganti Banner Top dengan Evergreen Scarcity

**Lokasi:** Banner hijau di paling atas halaman

**Konten lama:**
```
🎉 Gratis hosting 3 bulan pertama — berakhir dalam: [COUNTDOWN]   [Klaim →]
```

**Konten baru:**
```
🎁 Gratis hosting 3 bulan untuk 50 klien pertama bulan ini · Tersisa 23 slot   [Klaim →]
```

**Catatan implementasi:**
- Angka "23 slot" disimpan sebagai variabel/config yang bisa diupdate manual oleh owner
- Tidak ada timer auto-decrement
- Tombol "Klaim →" link ke `#pricing` atau ke WhatsApp dengan pre-filled message claim promo
- Style banner tetap sama (hijau, sticky top)

#### C. Update Section Pricing

**Lokasi:** Section "HOSTING BULANAN" → kotak hijau "Gratis Hosting 3 Bulan Pertama!"

**Konten lama:**
```
🎉 Gratis Hosting 3 Bulan Pertama!
Berlaku untuk semua paket · Terbatas untuk pemesanan baru
PROMO BERAKHIR DALAM
Promo telah berakhir 😞
[Klaim Promo Sekarang →]
```

**Konten baru:**
```
🎁 Gratis Hosting 3 Bulan Pertama!
Berlaku untuk semua paket · Untuk 50 klien pertama bulan ini

⚡ Tersisa 23 slot bulan ini

[Klaim Promo Sekarang →]
```

**Acceptance criteria:**
- ✅ Tidak ada teks "BERAKHIR" / "Promo telah berakhir" di halaman manapun — **DONE**
- ✅ Tidak ada interval JS yang update DOM secara berkala untuk countdown — **DONE**
- ✅ Buka di browser baru, incognito, dan browser dengan cache lama → semua tampil sama — **DONE**
- ✅ Angka slot bisa diubah dari satu tempat (`assets/js/config.js` → `APP_CONFIG.sisaSlot`) — **DONE**

---

### Task 1.2: Ubah CTA Hero Section ✅ SELESAI

**Lokasi:** Section hero (bagian ungu dengan headline "Bikin Aplikasi dari Excel? Bisa.")

**Konten lama:**
```html
<button class="primary-cta">
  💬 Chat WhatsApp Sekarang
</button>
<p class="cta-subtext">Respon dalam 1 jam kerja</p>
```

**Konten baru:**
```html
<button class="primary-cta">
  📱 Lihat Contoh Aplikasi
</button>
<p class="cta-subtext">Gratis · Tanpa daftar · Langsung bisa dicoba</p>
```

**Behavior:**
- Klik tombol → navigate ke `/contoh-aplikasi` (halaman baru, lihat Section 2)
- Style tombol tetap sama (hijau dengan icon)
- Subtext baru menekankan "no commitment"

---

### Task 1.3: Tambahkan CTA Sekunder ke WhatsApp ✅ SELESAI

Karena CTA utama sekarang ke portfolio, kita tetap perlu jalur cepat ke WA untuk yang sudah siap chat.

**Lokasi:** Tepat di bawah primary CTA hero section

**Tambahkan:**
```html
<button class="secondary-cta-link">
  Sudah yakin? Tanya langsung via WhatsApp →
</button>
```

**Style:**
- Bukan tombol penuh, hanya text link dengan underline atau ghost button
- Warna lebih muted (misal: putih dengan opacity 70%)
- Klik → buka WhatsApp dengan pre-filled message (sama seperti CTA WA lainnya)

---

### Task 1.4: Update Section "Solusi Kami"

**Lokasi:** Section dengan judul "Kami ubah jadi web app yang bisa langsung dipakai"

**Perubahan:**

#### A. Setiap Card Produk Jadi Link Aktif

Card-card berikut harus jelas terlihat clickable dan link ke detail demo masing-masing:
- Keuangan Sederhana → `/contoh-aplikasi/keuangan-sederhana`
- Manajemen Kost → `/contoh-aplikasi/manajemen-kost` *(menggantikan Buku Piutang, demo: bukost.aplikatif.com)*
- Invoice Generator → `/contoh-aplikasi/invoice-generator`
- Form Collector → `/contoh-aplikasi/form-collector`
- Laporan Keuangan → `/contoh-aplikasi/laporan-keuangan`

#### B. Tambahkan Visual Indicator "Clickable"

Setiap card tambahkan:
- Hover state (shadow, slight lift, border highlight)
- Icon panah `→` atau text "Lihat Demo" di kanan card
- Cursor: pointer

#### C. Tambahkan CTA Bawah Section

Setelah list card, tambahkan tombol:
```html
<a href="/contoh-aplikasi" class="primary-cta">
  Lihat Semua Contoh Aplikasi →
</a>
```

#### D. Update Subteks Section

Konten lama: *"Untuk melihat contoh project, klik salah satu di bawah ini."*

Konten baru: *"Klik salah satu di bawah untuk coba demo langsung — gratis, tanpa daftar."*

---

### Task 1.5: Ganti Bahasa Teknis ke Bahasa UMKM

Cari dan replace istilah berikut di seluruh halaman:

| Sekarang (Cari) | Ganti Jadi |
|-----------------|------------|
| `web app` (di body text) | `aplikasi online` |
| `PWA tersedia` | `Bisa di-install di HP seperti aplikasi biasa` |
| `Custom domain` | `Pakai nama website sendiri (misal: tokoanda.com)` |
| `Resource dedicated` | `Server khusus, lebih cepat & stabil` |

**Catatan:** Headline utama "Bikin Aplikasi dari Excel? Bisa." JANGAN diubah — sudah bagus.

**Sub-headline hero:**

Konten lama:
> "Kami ubah file Excel kamu jadi web app yang bisa diakses dari HP — cepat, murah, dan langsung siap pakai."

Konten baru:
> "Kami ubah file Excel kamu jadi aplikasi online yang bisa dibuka dari HP siapa saja — tanpa install, tanpa ribet."

---

### Task 1.6: Section "80% Dikerjakan AI" — TIDAK DIUBAH

**Keputusan owner:** Section ini dipertahankan apa adanya.

Konten yang TETAP:
```
🤖 80% dikerjakan AI khusus
AI kami sudah ditraining khusus untuk membuat sistem bisnis —
prosesnya jauh lebih efisien dari development manual,
tanpa mengorbankan kualitas.
```

**Catatan untuk Claude Code:** SKIP task ini. Jangan ubah konten section ini.

---

### Task 1.7: Tambahkan Section Trust Signals

**Lokasi:** Tambahkan section baru SETELAH section "Cara Kerja" (4 langkah konsultasi)

**Struktur section baru:**

```markdown
## SECTION: Garansi Kami
Kenapa kamu bisa tenang bekerja sama dengan kami

[ICON ✅] Konsultasi GRATIS
Tanpa biaya, tanpa komitmen. Tanya-tanya dulu sepuasnya.

[ICON ✅] Garansi Revisi Sampai Puas
Kami revisi sampai aplikasi sesuai kebutuhanmu.

[ICON ✅] Refund 100% dalam 7 Hari
Kalau tidak sesuai harapan di minggu pertama, uang kembali penuh.
```

**Style:** Grid 1x3 atau 1 kolom vertical, dengan icon check hijau dan latar putih bersih.

---

### Task 1.8: Tambahkan Footer dengan Info Legal

**Lokasi:** Bagian paling bawah halaman

**Konten yang harus ada:**

```
APLIKATIF
Bikin aplikasi dari Excel, mulai Rp 75.000

📍 Alamat: [diisi manual oleh owner]
📞 WhatsApp: [nomor WA]
✉️ Email: [email kontak]
🏢 CV. Lumbung Inovasi Digital · NIB: [diisi manual jika ada]

© 2026 Aplikatif — CV. Lumbung Inovasi Digital. All rights reserved.
[Privacy Policy] [Terms of Service]
```

**Catatan untuk owner:** Field alamat, nomor WA, email, dan NIB perlu diisi manual oleh Faizal sebelum deploy. Tandai sebagai TODO dalam kode. Nama legal entity (CV. Lumbung Inovasi Digital) sudah final, tinggal diisi.

---

## SECTION 2: Halaman Baru — `/contoh-aplikasi`

Halaman ini adalah **kunci strategi conversion baru**. User akan diarahkan dari hero CTA ke halaman ini untuk lihat-lihat dulu sebelum chat.

### Task 2.1: Struktur Halaman

**URL:** `/contoh-aplikasi`

**Layout:**

```
┌─────────────────────────────────────────────────┐
│  [Header navigation - sama seperti landing]     │
├─────────────────────────────────────────────────┤
│                                                  │
│         HERO SECTION (Compact)                  │
│  Contoh Aplikasi yang Sudah Kami Buat           │
│  Klik salah satu untuk coba demo langsung —     │
│  gratis, tanpa daftar.                           │
│                                                  │
├─────────────────────────────────────────────────┤
│                                                  │
│         FILTER / KATEGORI (Optional)            │
│  [Semua] [Keuangan] [Operasional] [Penjualan]  │
│                                                  │
├─────────────────────────────────────────────────┤
│                                                  │
│         GRID APLIKASI                           │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐         │
│  │ App 1   │  │ App 2   │  │ App 3   │         │
│  │ [thumb] │  │ [thumb] │  │ [thumb] │         │
│  │ Title   │  │ Title   │  │ Title   │         │
│  │ Desc    │  │ Desc    │  │ Desc    │         │
│  │ [Coba→] │  │ [Coba→] │  │ [Coba→] │         │
│  └─────────┘  └─────────┘  └─────────┘         │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐         │
│  │ App 4   │  │ App 5   │  │ App 6   │         │
│  │ ...     │  │ ...     │  │ ...     │         │
│  └─────────┘  └─────────┘  └─────────┘         │
│                                                  │
├─────────────────────────────────────────────────┤
│                                                  │
│         CTA SECTION                             │
│  Tertarik bikin yang mirip untuk bisnismu?      │
│  [Chat WhatsApp untuk Pesan →]                  │
│                                                  │
├─────────────────────────────────────────────────┤
│         [Footer - sama seperti landing]         │
└─────────────────────────────────────────────────┘
```

### Task 2.2: Data Schema untuk Aplikasi Contoh

Buat data structure (JSON/TS file) untuk list aplikasi:

```typescript
interface AplikasiContoh {
  slug: string;              // contoh: "keuangan-sederhana"
  nama: string;              // "Keuangan Sederhana"
  kategori: string;          // "Keuangan" | "Operasional" | "Penjualan"
  thumbnail: string;         // URL gambar preview
  deskripsi_singkat: string; // 1-2 kalimat untuk card
  deskripsi_panjang: string; // untuk halaman detail
  fitur_utama: string[];     // list fitur, untuk halaman detail
  demo_url: string;          // URL aplikasi demo yang bisa dibuka
  cocok_untuk: string[];     // ["Toko online", "UMKM kuliner", dll]
  estimasi_harga: string;    // "Mulai Rp 75.000" / "Rp 150-300rb"
}
```

**File location saran:** `data/aplikasi-contoh.ts` atau `content/showcase.json`

### Task 2.3: List Aplikasi Contoh (Initial Data)

Buat 5 entry awal berdasarkan card yang sudah ada di landing page:

```typescript
const aplikasiContoh: AplikasiContoh[] = [
  {
    slug: "keuangan-sederhana",
    nama: "Keuangan Sederhana",
    kategori: "Keuangan",
    thumbnail: "/images/showcase/keuangan-sederhana.png", // TODO: bikin screenshot
    deskripsi_singkat: "Input pemasukan & pengeluaran, saldo otomatis, laporan bulanan.",
    deskripsi_panjang: "Aplikasi pencatatan keuangan harian untuk UMKM. Cocok untuk warung, toko kecil, atau usaha jasa yang butuh tracking arus kas tanpa ribet.",
    fitur_utama: [
      "Input transaksi pemasukan & pengeluaran",
      "Kalkulasi saldo otomatis",
      "Kategori transaksi custom",
      "Laporan bulanan dengan grafik",
      "Export ke Excel/PDF"
    ],
    demo_url: "https://demo-keuangan.aplikatif.com", // TODO: deploy demo
    cocok_untuk: ["Warung", "Toko kecil", "Usaha jasa", "Freelancer"],
    estimasi_harga: "Mulai Rp 75.000"
  },
  {
    slug: "invoice-generator",
    nama: "Invoice Generator",
    kategori: "Penjualan",
    thumbnail: "/images/showcase/invoice-generator.png",
    deskripsi_singkat: "Buat & kirim invoice PDF, tracking status pembayaran.",
    deskripsi_panjang: "Sistem invoicing profesional untuk freelancer dan UMKM. Generate invoice PDF dengan branding sendiri, kirim via WhatsApp/Email, dan track status pembayaran.",
    fitur_utama: [
      "Template invoice profesional",
      "Generate PDF otomatis",
      "Tracking status: Draft / Terkirim / Dibayar / Overdue",
      "Reminder pembayaran otomatis",
      "Database klien"
    ],
    demo_url: "https://demo-invoice.aplikatif.com",
    cocok_untuk: ["Freelancer", "Konsultan", "Agency", "Vendor"],
    estimasi_harga: "Mulai Rp 150.000"
  },
  {
    slug: "form-collector",
    nama: "Form Collector",
    kategori: "Operasional",
    thumbnail: "/images/showcase/form-collector.png",
    deskripsi_singkat: "Form input data custom, rekapitulasi otomatis ke tabel.",
    deskripsi_panjang: "Pengganti Google Form dengan kemampuan rekap otomatis dan dashboard. Cocok untuk pendaftaran event, survey pelanggan, order custom, dan lainnya.",
    fitur_utama: [
      "Form builder drag-and-drop",
      "Multiple jenis field (text, dropdown, file upload, dll)",
      "Auto-rekap ke tabel",
      "Dashboard analytics",
      "Export ke Excel"
    ],
    demo_url: "https://demo-form.aplikatif.com",
    cocok_untuk: ["Event organizer", "Komunitas", "Toko online", "Sekolah/kursus"],
    estimasi_harga: "Mulai Rp 150.000"
  },
  {
    slug: "manajemen-kost",
    nama: "Manajemen Kost",
    kategori: "Operasional",
    thumbnail: "/assets/images/showcase/manajemen-kost.png",
    deskripsi_singkat: "Kelola kamar, penghuni, dan tagihan sewa — semua di satu tempat.",
    deskripsi_panjang: "Aplikasi manajemen kost digital untuk pemilik kost. Pantau status hunian setiap kamar, catat data penghuni, tagih sewa bulanan, dan terima reminder otomatis jatuh tempo.",
    fitur_utama: [
      "Daftar kamar & status hunian (kosong/terisi)",
      "Data lengkap penghuni per kamar",
      "Tagihan sewa bulanan otomatis",
      "Reminder jatuh tempo ke WhatsApp",
      "Laporan pendapatan bulanan"
    ],
    demo_url: "https://bukost.aplikatif.com", // ✅ LIVE
    cocok_untuk: ["Pemilik kost", "Pengelola kontrakan", "Pemilik kost bulanan/harian"],
    estimasi_harga: "Mulai Rp 150.000"
  },
  {
    slug: "laporan-keuangan",
    nama: "Laporan Keuangan",
    kategori: "Keuangan",
    thumbnail: "/images/showcase/laporan-keuangan.png",
    deskripsi_singkat: "Rekap pemasukan & pengeluaran dengan grafik visual.",
    deskripsi_panjang: "Dashboard laporan keuangan otomatis dari data transaksi. Lihat tren bulanan, kategori pengeluaran terbesar, dan kesehatan keuangan bisnis dengan grafik interaktif.",
    fitur_utama: [
      "Dashboard real-time",
      "Grafik tren bulanan/tahunan",
      "Breakdown per kategori",
      "Profit & loss statement sederhana",
      "Export PDF untuk laporan"
    ],
    demo_url: "https://demo-laporan.aplikatif.com",
    cocok_untuk: ["UMKM growing", "Freelancer", "Reseller online"],
    estimasi_harga: "Mulai Rp 200.000"
  }
];
```

**TODO untuk owner (Faizal):**
- Bikin screenshot/thumbnail untuk setiap aplikasi
- Deploy demo aplikasi yang bisa diakses publik
- Update URL demo setelah live

### Task 2.4: Card Component untuk Aplikasi Contoh

Setiap card harus berisi:

```html
<div class="aplikasi-card">
  <div class="thumbnail">
    <img src="{thumbnail}" alt="{nama}" />
    <span class="kategori-badge">{kategori}</span>
  </div>
  <div class="content">
    <h3>{nama}</h3>
    <p class="deskripsi">{deskripsi_singkat}</p>
    <div class="cocok-untuk">
      <span>Cocok untuk:</span>
      {cocok_untuk.slice(0,3).map(item => <tag>{item}</tag>)}
    </div>
    <div class="footer-card">
      <span class="harga">{estimasi_harga}</span>
      <a href="/contoh-aplikasi/{slug}" class="btn-primary">
        Lihat Detail →
      </a>
    </div>
  </div>
</div>
```

**Behavior:**
- Klik thumbnail atau title → ke halaman detail (`/contoh-aplikasi/{slug}`)
- Klik tombol "Lihat Detail" → ke halaman detail
- Hover state: card sedikit terangkat dengan shadow

### Task 2.5: CTA Section di Bawah Grid

Setelah grid aplikasi, tambahkan section CTA besar:

```html
<section class="cta-section">
  <h2>Tertarik bikin yang mirip untuk bisnismu?</h2>
  <p>Ceritakan kebutuhanmu — kami bantu rekomendasi solusi terbaik.</p>

  <div class="cta-buttons">
    <a href="https://wa.me/{nomor}?text={pre_filled}" class="btn-primary-large">
      💬 Chat WhatsApp untuk Pesan
    </a>
  </div>

  <p class="cta-subtext">
    Konsultasi gratis · Respon cepat di jam kerja · Tanpa minimal order
  </p>
</section>
```

**Pre-filled message untuk CTA ini:**
```
Halo Aplikatif! Saya baru lihat contoh aplikasi di website kalian.

Saya tertarik dan ingin tanya-tanya untuk bisnis saya.

Bisnis saya: [tulis di sini]
Yang ingin saya bikin: [contoh: aplikasi seperti Keuangan Sederhana]
```

---

## SECTION 3: Halaman Detail Aplikasi — `/contoh-aplikasi/[slug]`

Halaman ini adalah deep-dive untuk setiap aplikasi yang user klik dari grid.

### Task 3.1: Struktur Halaman Detail

```
┌──────────────────────────────────────────────────┐
│  Header navigation                               │
├──────────────────────────────────────────────────┤
│  ← Kembali ke daftar contoh                      │
├──────────────────────────────────────────────────┤
│                                                   │
│  HERO DETAIL                                     │
│  [Kategori Badge]                                │
│  # Nama Aplikasi                                 │
│  > Deskripsi panjang                             │
│                                                   │
│  [📱 Coba Demo Sekarang →] [💬 Tanya via WA]    │
│                                                   │
├──────────────────────────────────────────────────┤
│                                                   │
│  PREVIEW SCREENSHOT/VIDEO                        │
│  [Carousel atau grid screenshot aplikasi]        │
│                                                   │
├──────────────────────────────────────────────────┤
│                                                   │
│  FITUR UTAMA                                     │
│  ✓ Fitur 1                                       │
│  ✓ Fitur 2                                       │
│  ✓ ...                                           │
│                                                   │
├──────────────────────────────────────────────────┤
│                                                   │
│  COCOK UNTUK                                     │
│  [Tag] [Tag] [Tag]                               │
│                                                   │
├──────────────────────────────────────────────────┤
│                                                   │
│  ESTIMASI HARGA                                  │
│  Mulai Rp 75.000 (sekali bayar untuk template)  │
│  + hosting bulanan (gratis 3 bulan pertama)     │
│  Kustomisasi: nego sesuai kebutuhan              │
│                                                   │
├──────────────────────────────────────────────────┤
│                                                   │
│  CTA AKHIR                                       │
│  [💬 Pesan Aplikasi Ini via WhatsApp]           │
│                                                   │
├──────────────────────────────────────────────────┤
│  RELATED: Aplikasi serupa lainnya                │
│  [Card 1] [Card 2] [Card 3]                     │
└──────────────────────────────────────────────────┘
```

### Task 3.2: CTA Strategy di Halaman Detail

**Primary CTA:** "📱 Coba Demo Sekarang"
- Buka `demo_url` di tab baru
- Subtext: "Gratis, tanpa daftar, langsung bisa pakai"

**Secondary CTA:** "💬 Tanya via WhatsApp"
- Pre-filled message spesifik untuk aplikasi ini:
```
Halo Aplikatif! Saya tertarik dengan aplikasi {nama_aplikasi}.

Bisnis saya: [tulis di sini]
Pertanyaan saya: [tulis di sini]
```

### Task 3.3: Routing & Slug Handling

**Pakai dynamic routing** sesuai framework yang digunakan:
- Next.js: `pages/contoh-aplikasi/[slug].tsx` atau `app/contoh-aplikasi/[slug]/page.tsx`
- Static site: generate satu HTML per slug saat build

**Handling 404:** Kalau slug tidak ditemukan di data, tampilkan halaman "Aplikasi tidak ditemukan" dengan link kembali ke `/contoh-aplikasi`.

---

## SECTION 4: Update Pre-filled WhatsApp Messages

Semua link WhatsApp di seluruh website harus pakai pre-filled message yang lebih engaging.

### Task 4.1: Format Standard Pre-filled Message

**Default (untuk CTA generik di landing page):**

```
Halo Aplikatif! Saya tertarik bikin aplikasi dari Excel.

Bisnis saya: [tulis di sini]
Yang mau saya ubah jadi aplikasi: [contoh: pencatatan penjualan]
Pertanyaan saya: [tulis di sini]
```

### Task 4.2: Pre-filled Spesifik untuk Setiap Konteks

| Lokasi CTA | Pre-filled Message |
|------------|-------------------|
| Hero secondary CTA ("Sudah yakin?") | Default format |
| Pricing section ("Tanya Harga via WhatsApp") | "Halo, saya mau tanya harga untuk paket [Starter/Basic/Custom]..." |
| Banner promo ("Klaim Promo") | "Halo, saya mau klaim promo gratis hosting 3 bulan untuk pesanan baru..." |
| Bottom CTA `/contoh-aplikasi` | "Halo, saya baru lihat contoh aplikasi di website kalian..." |
| CTA halaman detail aplikasi | "Halo, saya tertarik dengan aplikasi {nama_aplikasi}..." |

### Task 4.3: Centralized Configuration ✅ SELESAI

Utility function sudah dibuat di `assets/js/config.js` (plain JS, bukan TypeScript):

```typescript
// assets/js/config.js — SUDAH ADA
const NOMOR_WA = "6285646645065"; // ✅ sudah diisi nomor real

export function buildWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${NOMOR_WA}?text=${encoded}`;
}

export const WA_MESSAGES = {
  default: `Halo Aplikatif! Saya tertarik bikin aplikasi dari Excel.

Bisnis saya: [tulis di sini]
Yang mau saya ubah jadi aplikasi: [contoh: pencatatan penjualan]
Pertanyaan saya: [tulis di sini]`,

  pricing: (paket: string) =>
    `Halo, saya mau tanya harga untuk paket ${paket}. Bisnis saya: [tulis di sini]`,

  claimPromo: `Halo, saya mau klaim promo gratis hosting 3 bulan untuk pesanan baru. Bisnis saya: [tulis di sini]`,

  fromShowcase: `Halo Aplikatif! Saya baru lihat contoh aplikasi di website kalian.

Saya tertarik dan ingin tanya-tanya untuk bisnis saya.

Bisnis saya: [tulis di sini]
Yang ingin saya bikin: [tulis di sini]`,

  fromAppDetail: (namaAplikasi: string) =>
    `Halo Aplikatif! Saya tertarik dengan aplikasi ${namaAplikasi}.

Bisnis saya: [tulis di sini]
Pertanyaan saya: [tulis di sini]`,
};
```

---

## SECTION 5: Tracking & Analytics

### Task 5.1: Setup Custom Pixel Events

Tambahkan tracking untuk event-event berikut menggunakan Meta Pixel:

```javascript
// Saat user klik "Lihat Contoh Aplikasi" dari hero
fbq('trackCustom', 'ViewShowcaseClick', {
  source: 'hero_primary_cta'
});

// Saat user landing di /contoh-aplikasi
fbq('track', 'ViewContent', {
  content_type: 'showcase_page'
});

// Saat user klik salah satu aplikasi card
fbq('trackCustom', 'AppCardClick', {
  app_slug: '{slug}',
  app_name: '{nama}'
});

// Saat user buka demo aplikasi
fbq('trackCustom', 'TryDemo', {
  app_slug: '{slug}'
});

// Saat user klik tombol WhatsApp (event paling penting!)
fbq('track', 'Contact', {
  source: '{lokasi_tombol}', // 'hero_secondary' | 'showcase_bottom' | 'app_detail' | etc
  app_slug: '{slug_jika_ada}'
});
```

**Kenapa ini penting:** Event `Contact` ini akan jadi seed untuk lookalike audience yang jauh lebih powerful daripada LPV. Setelah terkumpul 50-100 event, baru bikin lookalike 1%.

### Task 5.2: Setup Google Analytics 4 Events (Opsional, tapi disarankan)

Sama seperti di atas tapi pakai gtag:

```javascript
gtag('event', 'view_showcase_click', {
  source: 'hero_primary_cta'
});

gtag('event', 'app_card_click', {
  app_slug: '{slug}',
  app_name: '{nama}'
});

gtag('event', 'contact', {
  source: '{lokasi}',
  app_slug: '{slug_jika_ada}'
});
```

---

## SECTION 6: Acceptance Criteria Keseluruhan

Sebelum deploy, pastikan semua poin berikut ✅:

### Landing Page Utama
- [x] Tidak ada teks "BERAKHIR" atau "Promo telah berakhir" muncul di kondisi apapun ✅
- [x] Banner promo menampilkan "Tersisa X slot" (evergreen scarcity) ✅
- [x] CTA hero utama: "Lihat Contoh Aplikasi" (link ke `/contoh-aplikasi`) ✅
- [x] CTA hero sekunder: link kecil ke WhatsApp dengan pre-filled message ✅
- [ ] Card-card di section "Solusi Kami" terlihat clickable & link aktif ke detail
- [ ] Bahasa teknis (web app, PWA, dll) sudah diganti ke bahasa UMKM
- [ ] Section "Garansi Kami" sudah ditambahkan (3 item: Konsultasi Gratis, Garansi Revisi, Refund 7 Hari)
- [ ] Footer berisi info legal (CV. Lumbung Inovasi Digital + alamat, kontak)

### Halaman `/contoh-aplikasi`
- [ ] URL accessible: `aplikatif.com/contoh-aplikasi`
- [ ] Grid menampilkan minimal 5 aplikasi contoh
- [ ] Setiap card menampilkan: thumbnail, nama, kategori, deskripsi, harga, CTA
- [ ] Hover state pada card berfungsi
- [ ] CTA "Chat WhatsApp untuk Pesan" di bawah grid berfungsi dengan pre-filled message khusus

### Halaman Detail `/contoh-aplikasi/[slug]`
- [ ] Routing dynamic berfungsi untuk semua 5 slug
- [ ] 404 handling untuk slug yang tidak ada
- [ ] Tombol "Coba Demo Sekarang" buka demo URL di tab baru
- [ ] Tombol "Tanya via WhatsApp" pakai pre-filled message khusus aplikasi tersebut
- [ ] Section "Related" menampilkan 2-3 aplikasi lain

### Tracking
- [ ] Meta Pixel event `Contact` ter-trigger setiap klik tombol WhatsApp
- [ ] Custom event `ViewShowcaseClick` ter-trigger saat klik CTA hero
- [ ] Custom event `AppCardClick` ter-trigger saat klik card aplikasi
- [ ] Custom event `TryDemo` ter-trigger saat klik tombol coba demo

### Mobile Responsiveness
- [ ] Landing page tetap bagus di mobile (sebagian besar traffic dari iklan FB pakai HP)
- [ ] Halaman `/contoh-aplikasi` grid menyesuaikan: 3 kolom desktop, 1-2 kolom mobile
- [ ] Halaman detail mobile-friendly
- [ ] Tombol-tombol cukup besar untuk thumb-tap (minimal 44px height)

---

## SECTION 7: Manual Tasks (Tidak Bisa Dieksekusi Claude Code)

Tugas berikut harus dilakukan oleh **Faizal sendiri**, bukan oleh Claude Code:

### Task M.1: Setup WhatsApp Business Profile
- [ ] Set profile picture: logo Aplikatif (bukan foto pribadi)
- [ ] Nama bisnis: "Aplikatif - Bikin Aplikasi dari Excel"
- [ ] Deskripsi bisnis lengkap
- [ ] Alamat usaha
- [ ] Jam operasional (09.00-18.00 WIB)
- [ ] Aktifkan greeting message otomatis (lihat draft di Task M.2)
- [ ] Setup quick replies untuk pertanyaan umum (harga, durasi, demo)

### Task M.2: WhatsApp Auto-Greeting Message

Set di WhatsApp Business → Settings → Business tools → Greeting message:

```
Halo! Terima kasih sudah hubungi Aplikatif 👋

Tim kami akan balas maks 1 jam (jam kerja 09.00-18.00 WIB).
Di luar jam itu, kami balas paling lambat besok pagi.

Sambil menunggu, boleh ceritakan dulu:
1. Bisnis kamu di bidang apa?
2. Excel apa yang mau diubah jadi aplikasi?
3. Tujuan utama aplikasinya apa?

Makin lengkap info kamu, makin cepat kami bantu kasih solusi terbaik 🚀
```

### Task M.3: Quick Replies WhatsApp

Setup minimal 5 quick replies:

1. **Shortcut: `/harga`** → Detail harga paket Starter/Basic/Custom + hosting
2. **Shortcut: `/durasi`** → Estimasi waktu pengerjaan per paket
3. **Shortcut: `/demo`** → Link ke `/contoh-aplikasi` + ajakan coba demo
4. **Shortcut: `/proses`** → Penjelasan 4 langkah: Konsultasi → Bayar → Develop → Pakai
5. **Shortcut: `/garansi`** → Penjelasan garansi revisi & refund 7 hari

### Task M.4: Konten yang Perlu Disiapkan
- [ ] **Screenshot 5 aplikasi contoh** (untuk thumbnail & detail page)
- [ ] **Deploy 5 demo aplikasi** ke subdomain demo-*.aplikatif.com
- [ ] **3 testimoni klien** (atau beta tester) — foto + nama + kuota
- [ ] **Foto founder** untuk section "About"
- [ ] **Info legal** untuk footer (CV/PT, alamat, NIB)

### Task M.5: Re-evaluasi Iklan Meta Ads

Setelah landing page baru live:
- [ ] Pastikan creative iklan tidak menjanjikan promo yang sudah berakhir
- [ ] Pertimbangkan ganti creative dengan focus "Lihat contoh aplikasi gratis"
- [ ] Setelah event `Contact` terkumpul 50+, bikin lookalike 1% dari seed tersebut
- [ ] Test re-segmentasi audience: pemilik toko online, UMKM kuliner, freelancer, dll

---

## SECTION 8: Implementation Order (Saran Urutan Eksekusi Claude Code)

**Phase 1 — Quick Wins ✅ SELESAI:**
1. ~~Task 1.1 (hapus countdown)~~ ✅
2. ~~Task 1.2 (ubah CTA hero)~~ ✅
3. ~~Task 1.3 (CTA sekunder WA)~~ ✅
4. ~~Task 4.3 (centralized WA config)~~ ✅ → `assets/js/config.js` + `assets/js/apps-data.js`

**Phase 2 — Core Strategy (3-5 jam):**
5. Task 2.1 - 2.5 (bikin halaman `/contoh-aplikasi`)
6. Task 1.4 (update card di landing → link ke detail)
7. Task 4.1 - 4.2 (pre-filled messages)

**Phase 3 — Detail Pages (3-4 jam):**
8. Task 3.1 - 3.3 (halaman detail per aplikasi)

**Phase 4 — Polish (2-3 jam):**
9. Task 1.5 (bahasa UMKM)
10. ~~Task 1.6 (reframe AI)~~ — SKIP, tidak diubah
11. Task 1.7 (trust signals — 3 item)
12. Task 1.8 (footer dengan CV. Lumbung Inovasi Digital)
13. Task 5.1 - 5.2 (tracking)

**Phase 5 — Manual (oleh Faizal):**
14. Task M.1 - M.5 (setup WA, content, demo, dll)

---

## Proyeksi Dampak

### Funnel Lama (Direct CTA ke WhatsApp)
```
LPV (330) → Click WA (11, 3.3%) → Real Chat (2, 18%)
Cost per real chat: Rp 91.500
```

### Funnel Baru (CTA ke Showcase Dulu)
```
LPV (330) → Click "Lihat Contoh" (~30-40%) → Browse Showcase
         → Click WA (~15-20% dari yang browse) → Real Chat (60-80%)

Estimasi:
- 330 LPV × 35% = 115 ke /contoh-aplikasi
- 115 × 18% = 21 click WA
- 21 × 70% = 15 real chat
Cost per real chat: ~Rp 12.000-15.000
```

**Estimasi improvement: ~6-7x lebih efisien**

Pada titik ini, lookalike audience worth dilakukan karena seed (event `Contact`) sudah berkualitas.

---

## Catatan Akhir

Strategi baru ini bekerja dengan prinsip **"show, don't sell"** — alih-alih langsung minta commitment (chat WA), kita biarkan user lihat-lihat dulu portfolio. Ini menurunkan psychological barrier dan filter natural untuk lead yang qualified.

User yang sudah klik "Lihat Contoh" → browse 2-3 demo → tertarik → klik WhatsApp = lead yang **jauh lebih kualitatif** daripada user yang asal klik WA dari iklan.

**Prinsip penting:** Fix the funnel first, scale traffic later.
