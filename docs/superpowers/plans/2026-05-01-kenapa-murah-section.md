# Kenapa Bisa Murah Section — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sisipkan section "Kenapa Bisa Murah?" ke `index.html` setelah section pain point, untuk membangun kepercayaan pengunjung yang ragu dengan harga murah.

**Architecture:** Pure HTML insertion — tidak ada JS baru, tidak ada file baru. Satu blok `<section>` disisipkan setelah tag penutup `</section>` pada baris 148 (akhir section "Masih pakai Excel untuk ini?"), sebelum section "Solusi Kami" di baris 151.

**Tech Stack:** HTML, Tailwind CSS (CDN sudah ada), brand colors existing (#4F46E5 indigo, #10B981 emerald, #F9FAFB light, #1E293B dark)

---

### Task 1: Sisipkan section "Kenapa Bisa Murah?" ke index.html

**Files:**
- Modify: `index.html:148` — sisipkan section baru setelah baris ini

- [ ] **Step 1: Buka index.html dan temukan insertion point**

Cari baris 148 — itu adalah tag penutup `</section>` dari section "Masih pakai Excel untuk ini?":

```html
    </div>
  </section>        <!-- ← baris 148, sisipkan SETELAH ini -->

  <!-- ===== SOLUSI ===== -->
```

- [ ] **Step 2: Sisipkan section HTML baru**

Tambahkan blok berikut tepat setelah baris 148 (antara section pain point dan section solusi):

```html
  <!-- ===== KENAPA MURAH ===== -->
  <section class="bg-white px-5 py-12">
    <div class="text-center mb-6">
      <span class="inline-block bg-indigo-100 text-brand-indigo text-xs font-bold px-3 py-1 rounded-full mb-3">Kenapa Bisa Murah?</span>
      <h2 class="text-2xl font-extrabold">Murah bukan berarti murahan</h2>
      <p class="text-gray-500 text-sm mt-2">Wajar kamu ragu — ini alasan jujur kenapa kami bisa murah:</p>
    </div>
    <div class="space-y-3 max-w-sm mx-auto">
      <div class="bg-brand-light rounded-2xl p-4 flex items-start gap-4 border-l-4 border-brand-indigo">
        <span class="text-2xl flex-shrink-0">🤖</span>
        <div>
          <p class="font-semibold text-sm">80% dikerjakan AI khusus</p>
          <p class="text-gray-500 text-xs mt-1 leading-relaxed">AI kami sudah ditraining khusus untuk membuat sistem bisnis — prosesnya jauh lebih efisien dari development manual, tanpa mengorbankan kualitas.</p>
        </div>
      </div>
      <div class="bg-brand-light rounded-2xl p-4 flex items-start gap-4 border-l-4 border-brand-emerald">
        <span class="text-2xl flex-shrink-0">📦</span>
        <div>
          <p class="font-semibold text-sm">Setiap project jadi template</p>
          <p class="text-gray-500 text-xs mt-1 leading-relaxed">Setiap aplikasi yang selesai kami arsipkan. Proyek serupa berikutnya bisa dikerjakan jauh lebih cepat — dan penghematan waktu itu kami teruskan ke harga kamu.</p>
        </div>
      </div>
      <div class="bg-brand-light rounded-2xl p-4 flex items-start gap-4 border-l-4 border-brand-indigo">
        <span class="text-2xl flex-shrink-0">🤝</span>
        <div>
          <p class="font-semibold text-sm">Revenue utama kami dari hosting</p>
          <p class="text-gray-500 text-xs mt-1 leading-relaxed">Kami tidak mengejar margin besar dari biaya project. Bisnis kami sustain dari hosting bulanan — jadi kami butuh kamu sebagai mitra jangka panjang, bukan klien satu kali.</p>
        </div>
      </div>
    </div>
    <div class="bg-indigo-50 rounded-2xl p-4 text-center max-w-sm mx-auto mt-6">
      <p class="text-sm font-semibold text-brand-indigo">💡 Murah = efisiensi yang kami bangun</p>
      <p class="text-gray-500 text-xs mt-1">Bukan kompromi kualitas.</p>
    </div>
  </section>
```

- [ ] **Step 3: Verifikasi visual di browser**

Buka `http://localhost/aplikatif` (atau path lokal) di browser mobile view (DevTools → toggle device toolbar → iPhone SE atau 375px lebar).

Pastikan:
- Section muncul di antara "Masih pakai Excel untuk ini?" dan "Solusi Kami"
- 3 kartu tampil vertikal dengan garis kiri berwarna (indigo–emerald–indigo)
- Closing box biru muda muncul di bawah kartu ketiga
- Tidak ada layout break di lebar 375px

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat(landing-page): add Kenapa Bisa Murah trust-builder section"
```
