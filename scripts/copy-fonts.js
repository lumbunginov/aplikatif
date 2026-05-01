const fs = require('fs');

fs.mkdirSync('assets/fonts', { recursive: true });

const src = 'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2';
const dst = 'assets/fonts/inter.woff2';

try {
  fs.copyFileSync(src, dst);
  const sizeKB = (fs.statSync(dst).size / 1024).toFixed(1);
  console.log('[OK] Copied inter.woff2 (' + sizeKB + ' KB) -> ' + dst);
} catch (err) {
  if (err.code === 'ENOENT') {
    console.error('[ERROR] Font source file not found: ' + src);
    console.error('Pastikan npm install sudah dijalankan terlebih dahulu.');
  } else {
    console.error('[ERROR] Gagal copy font:', err.message);
  }
  process.exit(1);
}
