const fs = require('fs');

fs.mkdirSync('assets/fonts', { recursive: true });

const src = 'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2';
const dst = 'assets/fonts/inter.woff2';

fs.copyFileSync(src, dst);
const sizeKB = (fs.statSync(dst).size / 1024).toFixed(1);
console.log(`✓ Copied inter.woff2 (${sizeKB} KB)`);
