import { readFile, readdir, access } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { imagePaths } from './notion/model.mjs';

const root = process.cwd();
const catalog = JSON.parse(await readFile(join(root, 'content/notion/catalog.json'), 'utf8'));
const expected = new Set(catalog.entries.map((entry) => `journal/${entry.kind}/${entry.slug}/index.html`));
for (const path of ['journal/index.html', ...expected]) await access(join(root, 'out', path));
for (const entry of catalog.entries) {
  for (const path of imagePaths(entry)) await access(join(root, 'out', path.slice(1)));
}
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (entry.name.endsWith('.html')) {
      const local = relative(join(root, 'out'), path).split('\\').join('/');
      if (local !== 'journal/index.html' && !expected.has(local)) throw new Error(`Unexpected exported journal route: ${local}`);
    }
  }
}
await walk(join(root, 'out/journal'));
const text = JSON.stringify(catalog);
if (/X-Amz-(Signature|Credential)|expiry_time|"NOTION_TOKEN"/i.test(text)) throw new Error('Snapshot contains a temporary credential or raw file object.');
console.log(`Verified ${expected.size} journal detail pages, local image files and no obsolete journal HTML.`);
