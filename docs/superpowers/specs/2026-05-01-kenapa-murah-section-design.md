# Design Spec: Section "Kenapa Bisa Murah?"

**Date:** 2026-05-01  
**Status:** Approved

## Problem

Landing page mendapat banyak lead dari ads tapi click "Hubungi WA" sangat sedikit. Asumsi: pengunjung ragu apakah harga murah berbanding lurus dengan kualitas buruk. Perlu section trust-builder yang menjelaskan secara jujur mekanisme bisnis kami.

## Placement

Disisipkan setelah section "Masih pakai Excel untuk ini?" (baris 148 `index.html`), sebelum section "Solusi Kami".

## Design Decisions

- **Layout:** Kartu vertikal dengan aksen garis kiri berwarna (Option C dari brainstorm) — mobile-first, selaras dengan gaya kartu existing
- **Approach:** Narasi (Option B) — ada intro + 3 kartu + closing box

## Content

### Badge
`Kenapa Bisa Murah?` — style indigo pill, konsisten dengan badge section lain

### Headline
`Murah bukan berarti murahan`

### Intro (1 baris)
`Wajar kamu ragu — ini alasan jujur kenapa kami bisa murah:`

### 3 Kartu (bg: #F9FAFB, border-left berwarna, emoji + judul bold + penjelasan)

| # | Emoji | Judul | Warna border | Penjelasan |
|---|-------|-------|--------------|------------|
| 1 | 🤖 | 80% dikerjakan AI khusus | indigo (#4F46E5) | AI kami sudah ditraining khusus untuk membuat sistem bisnis — prosesnya jauh lebih efisien dari development manual, tanpa mengorbankan kualitas. |
| 2 | 📦 | Setiap project jadi template | emerald (#10B981) | Setiap aplikasi yang selesai kami arsipkan. Proyek serupa berikutnya bisa dikerjakan jauh lebih cepat — dan penghematan waktu itu kami teruskan ke harga kamu. |
| 3 | 🤝 | Revenue utama kami dari hosting | indigo (#4F46E5) | Kami tidak mengejar margin besar dari biaya project. Bisnis kami sustain dari hosting bulanan — jadi kami butuh kamu sebagai mitra jangka panjang, bukan klien satu kali. |

### Closing Box
Background `#EEF2FF` (indigo-50), teks dua baris:
- Bold indigo: `💡 Murah = efisiensi yang kami bangun`
- Gray sub: `Bukan kompromi kualitas.`

## Styling (Tailwind)

- Section wrapper: `bg-white px-5 py-12`
- Badge: `inline-block bg-indigo-100 text-brand-indigo text-xs font-bold px-3 py-1 rounded-full mb-3`
- Headline: `text-2xl font-extrabold text-center mb-2`
- Intro: `text-gray-500 text-sm text-center mb-8`
- Kartu: `bg-brand-light rounded-2xl p-4 mb-3 flex items-start gap-4 border-l-4`
- Closing: `bg-indigo-50 rounded-2xl p-4 text-center mt-2`

## Out of Scope

- Tidak ada CTA button di section ini (tombol WA sudah cukup di section lain)
- Tidak ada animasi / accordion
