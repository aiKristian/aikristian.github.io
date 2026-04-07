import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const logo = readFileSync(join(root, 'logo-aik.svg'));
const og = readFileSync(join(root, 'og-image.svg'));

await sharp(logo).resize(180, 180).png().toFile(join(root, 'apple-touch-icon.png'));
await sharp(logo).resize(32, 32).png().toFile(join(root, 'favicon.png'));
await sharp(og).png().toFile(join(root, 'og-image.png'));

console.log('Generated apple-touch-icon.png, favicon.png, og-image.png');
