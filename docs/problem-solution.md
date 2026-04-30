# Problem & Solution Log — Aplikatif Landing Page

Dokumen ini mencatat permasalahan strategi dan solusi yang diambil. Gunakan sebagai konteks untuk AI di sesi berikutnya.

---

## [2026-05-01] Konversi WA rendah meski lead dari ads banyak

### Permasalahan
Landing page sudah di-deploy dan diiklankan (Meta Ads). Traffic masuk cukup banyak, namun yang menekan tombol "Hubungi WA" sangat sedikit.

**Hipotesis:** Pengunjung belum percaya bahwa harga yang ditawarkan (mulai Rp 75.000) sepadan dengan kualitas hasil. Harga murah justru menimbulkan keraguan — bukan daya tarik.

### Akar Masalah
Landing page belum menjelaskan *mekanisme* kenapa harga bisa semurah itu. Tanpa penjelasan ini, pengunjung mengasumsikan ada kompromi kualitas.

### Solusi
Menambahkan section baru **"Kenapa Bisa Murah?"** tepat setelah section pain point ("Masih pakai Excel untuk ini?"), sebelum section solusi.

Section ini membangun kepercayaan dengan transparansi bisnis melalui 3 alasan:

1. **80% dikerjakan AI khusus** — AI yang sudah ditraining untuk membuat sistem bisnis. Lebih efisien dari development manual, tanpa mengorbankan kualitas.
2. **Setiap project jadi template** — Proyek selesai diarsipkan. Proyek serupa berikutnya bisa dikerjakan jauh lebih cepat, penghematan diteruskan ke harga klien.
3. **Revenue utama dari hosting** — Margin project tipis disengaja. Bisnis sustain dari hosting bulanan → kami butuh mitra jangka panjang, bukan klien satu kali.

**Format:** Kartu vertikal dengan aksen garis kiri berwarna (indigo–emerald–indigo), mobile-first, selaras gaya desain existing.

### Prinsip Strategis
- Jangan hanya tunjukkan *apa* yang ditawarkan — jelaskan *mengapa* harga bisa seperti itu.
- Transparansi model bisnis = kepercayaan. Pengunjung yang paham *kenapa* lebih mudah convert daripada yang hanya melihat angka harga.
- Posisi harga murah sebagai hasil efisiensi, bukan penghematan kualitas.

### File Terkait
- Implementasi: `index.html` (section setelah baris 148)
- Design spec: `docs/superpowers/specs/2026-05-01-kenapa-murah-section-design.md`
