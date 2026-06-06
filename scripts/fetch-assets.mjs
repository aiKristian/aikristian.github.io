import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const imagesDir = join(root, 'images');
const iconsDir = join(imagesDir, 'icons');

const HERO_SRC =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCgRfNvNCIVenp2liGM8xQV5NiU2PwFK4pbvS-TxvqQtCyHjR10vzXawL5eyyflNfW4AQvTkwxwW5ZMaWms9heztUFqk31Jrf8SggM3g0qPGYT0o1LqBvVIbjBfNBZ4yai100-vQfAHCLvo6PmY0SF9VPl3zZQsR4RAnjKoX5ZvJ6PGzlDKfU2vPy9JPpLGYQcPG-w6Yhbx1QFk0I9SXljEnlkXOWlyFU2QBVMufErVKdZBn_e_-7yXhd4yOJ08dkYr2pXbrRb1_uks';

const ABOUT_SRC =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBtfvzLYJjzrwx26pZdGVN34rterPkydBtB26vHFtNneoCaAnyMJovqs_nn4NfYp9vk4Yug12El9R7PJGczqik4B_UCtAiHxyj66r5KhJWQ5axBhh99zderynDZ4O4OFpnA1zBgjK3z-fGot7BWuGNymY9tDP3R0DjpMEwsiDbIwlJ69kJ7-Jnv-mso00WRbqE7wA1cNgUM3kXfvmSNd1nOOK72Ckkjdvln4G5Hd7A0QTQ-7OJ8_mQTdOtAwFrTGxiHbPWILvDlmggr';

const ICONS = [
  { file: 'aws.svg', url: 'https://api.iconify.design/simple-icons:amazonaws.svg?color=%23FF9900' },
  { file: 'openai.svg', url: 'https://api.iconify.design/simple-icons:openai.svg?color=%2310A37F' },
  { file: 'laravel.svg', url: 'https://api.iconify.design/simple-icons:laravel.svg?color=%23FF2D20' },
  { file: 'postgresql.svg', url: 'https://api.iconify.design/simple-icons:postgresql.svg?color=%234169E1' },
  { file: 'githubactions.svg', url: 'https://api.iconify.design/simple-icons:githubactions.svg?color=%232088FF' },
  { file: 'jira.svg', url: 'https://api.iconify.design/simple-icons:jira.svg?color=%230052CC' },
  { file: 'wordpress.svg', url: 'https://api.iconify.design/simple-icons:wordpress.svg?color=%2321759B' },
  { file: 'docker.svg', url: 'https://api.iconify.design/simple-icons:docker.svg?color=%232496ED' },
  { file: 'web.svg', url: 'https://api.iconify.design/mdi:web.svg?color=%2345dfa4' },
  { file: 'linkedin.svg', url: 'https://api.iconify.design/simple-icons:linkedin.svg?color=%230a66c2' },
  { file: 'github.svg', url: 'https://api.iconify.design/simple-icons:github.svg?color=%23e2e8f0' },
  { file: 'youtube.svg', url: 'https://api.iconify.design/simple-icons:youtube.svg?color=%23ff0000' },
  { file: 'cv.svg', url: 'https://api.iconify.design/mdi:file-document-outline.svg?color=%23c0c1ff' },
];

async function fetchBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed ${url}: ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function saveWebp(name, url, width) {
  const buf = await fetchBuffer(url);
  const out = join(imagesDir, name);
  await sharp(buf).resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(out);
  console.log('saved', name);
}

async function saveSvg(name, url) {
  const text = await fetchBuffer(url);
  await writeFile(join(iconsDir, name), text);
  console.log('saved', name);
}

await mkdir(iconsDir, { recursive: true });
await saveWebp('hero.webp', HERO_SRC, 1600);
await saveWebp('about.webp', ABOUT_SRC, 800);
await Promise.all(ICONS.map(({ file, url }) => saveSvg(file, url)));
