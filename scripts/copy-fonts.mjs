import { copyFile, mkdir, readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'files');

const FONT_SOURCES = [
  {
    dir: join(root, 'node_modules/@fontsource/inter/files'),
    match: (name) => name.includes('latin') && /-(300|400|500|600|700)-normal\.(woff2|woff)$/.test(name),
  },
  {
    dir: join(root, 'node_modules/@fontsource/plus-jakarta-sans/files'),
    match: (name) => name.includes('latin') && /-(600|700|800)-normal\.(woff2|woff)$/.test(name),
  },
];

await mkdir(outDir, { recursive: true });

let copied = 0;
for (const { dir, match } of FONT_SOURCES) {
  const names = await readdir(dir);
  await Promise.all(
    names.filter(match).map(async (name) => {
      await copyFile(join(dir, name), join(outDir, name));
      copied += 1;
    })
  );
}

console.log(`Copied ${copied} font files to files/`);
