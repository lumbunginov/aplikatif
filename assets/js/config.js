// Update SISA_SLOT manual tiap minggu sesuai kondisi aktual
const APP_CONFIG = {
  nomorWA: '6285646645065',
  sisaSlot: 23,
};

const WA_PESAN = {
  default:
    'Halo Aplikatif! Saya tertarik bikin aplikasi dari Excel.\n\nBisnis saya: [tulis di sini]\nYang mau saya ubah jadi aplikasi: [contoh: pencatatan penjualan]\nPertanyaan saya: [tulis di sini]',
  claimPromo:
    'Halo, saya mau klaim promo gratis hosting 3 bulan untuk pesanan baru. Bisnis saya: [tulis di sini]',
  tanyaHarga: function (paket) {
    return 'Halo, saya mau tanya harga untuk paket ' + paket + '. Bisnis saya: [tulis di sini]';
  },
  dariShowcase:
    'Halo Aplikatif! Saya baru lihat contoh aplikasi di website kalian.\n\nSaya tertarik dan ingin tanya-tanya untuk bisnis saya.\n\nBisnis saya: [tulis di sini]\nYang ingin saya bikin: [tulis di sini]',
  dariDetail: function (namaAplikasi) {
    return (
      'Halo Aplikatif! Saya tertarik dengan aplikasi ' +
      namaAplikasi +
      '.\n\nBisnis saya: [tulis di sini]\nPertanyaan saya: [tulis di sini]'
    );
  },
};

function buildWALink(pesan) {
  return 'https://wa.me/' + APP_CONFIG.nomorWA + '?text=' + encodeURIComponent(pesan);
}
