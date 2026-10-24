import { cp, mkdir, rm } from 'node:fs/promises';

const output = new URL('../dist/', import.meta.url);
const staticFiles = [
  'admin.js',
  'category.html',
  'category.js',
  'i18n.js',
  'index.html',
  'mobile-layout.css',
  'portfolio-ui.js',
  'script.js',
  'styles.css',
  'videos.js',
  'watch.html',
  'watch.js',
];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const file of staticFiles) {
  await cp(new URL(`../${file}`, import.meta.url), new URL(file, output));
}
await cp(new URL('../assets/', import.meta.url), new URL('assets/', output), { recursive: true });

