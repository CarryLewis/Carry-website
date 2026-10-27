import { createHash } from 'node:crypto';
import { access, copyFile, mkdir, mkdtemp, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createNotionClient, paginate, API_VERSION } from './notion/api.mjs';
import { downloadImage } from './notion/images.mjs';
import { assertUnique, FORMAT_VERSION, imagePaths, isPublished, metadata, normalizeBlocks, validateSchema } from './notion/model.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const uuid = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i;
const mediaPath = /^\/notion\/[a-f0-9]{64}\.(png|jpg|gif|webp|avif)$/;
const fingerprint = (entries) => JSON.stringify(entries.map(metadata).sort((a, b) => a.id.localeCompare(b.id)));

async function exists(path) { try { await access(path); return true; } catch { return false; } }

export async function syncNotion({ directory = root, env = process.env, request, fetcher = fetch, now = new Date(), full = false } = {}) {
  const enabled = env.NOTION_SYNC_ENABLED ?? 'false';
  if (!['true', 'false'].includes(enabled)) throw new Error('NOTION_SYNC_ENABLED must be true or false.');
  const sourceId = env.NOTION_DATA_SOURCE_ID;
  if (enabled === 'true' && (!env.NOTION_TOKEN || !sourceId || !uuid.test(sourceId))) {
    throw new Error('Set NOTION_TOKEN and a valid NOTION_DATA_SOURCE_ID before enabling sync.');
  }
  const extraHosts = (env.NOTION_IMAGE_HOSTS ?? '').split(',').map((host) => host.trim()).filter(Boolean);
  if (extraHosts.some((host) => !/^(?=.{1,253}$)[a-z0-9-]+(?:\.[a-z0-9-]+)+$/.test(host) || /^(?:[0-9.]+)$/.test(host) || host.endsWith('.localhost') || host.endsWith('.local'))) {
    throw new Error('NOTION_IMAGE_HOSTS must contain explicit public DNS hostnames, without schemes, ports or wildcards.');
  }
  const output = join(directory, 'content/notion/catalog.json');
  const media = join(directory, 'public/notion');
  await mkdir(dirname(output), { recursive: true });
  await mkdir(dirname(media), { recursive: true });
  await mkdir(join(directory, '.cache'), { recursive: true });
  const stage = await mkdtemp(join(directory, '.cache/notion-stage-'));
  const stagedMedia = join(stage, 'media');
  await mkdir(stagedMedia);
  let movedOld = false;
  let installedMedia = false;
  const previousMedia = join(stage, 'old-media');
  try {
    const sourceKey = createHash('sha256').update(JSON.stringify([sourceId, API_VERSION, extraHosts])).digest('hex');
    let previous = { entries: [] };
    try {
      const cached = JSON.parse(await readFile(output, 'utf8'));
      if (cached.format === FORMAT_VERSION && cached.sourceKey === sourceKey && Array.isArray(cached.entries)) previous = cached;
    } catch { /* Missing or invalid cache requires a complete fetch. */ }
    const entries = [];
    let fetched = 0;
    let reused = 0;
    if (enabled === 'true') {
      const api = request ?? createNotionClient(env.NOTION_TOKEN, { fetcher });
      validateSchema(await api(`data_sources/${sourceId}`));
      // Always reconcile the entire published membership, including on a cache hit.
      const list = () => paginate(api, `data_sources/${sourceId}/query`, { filter: { property: 'Status', select: { equals: 'Published' } } });
      const pages = (await list()).filter((page) => isPublished(page, now));
      assertUnique(pages.map(metadata));
      const oldById = new Map(previous.entries.map((entry) => [entry.id, entry]));
      const children = (id) => paginate(api, `blocks/${id}/children`);
      const image = (url) => downloadImage(url, stagedMedia, { extraHosts, fetcher });
      for (const page of pages) {
        const meta = metadata(page);
        const old = oldById.get(meta.id);
        const age = now.getTime() - Date.parse(old?.fetchedAt);
        let canReuse = !full && old?.updatedAt === meta.updatedAt && age >= 0 && age < 24 * 60 * 60 * 1000;
        if (canReuse) {
          for (const path of imagePaths(old)) {
            if (!mediaPath.test(path) || !(await exists(join(directory, 'public', path.slice(1))))) { canReuse = false; break; }
          }
        }
        if (canReuse) {
          for (const path of imagePaths(old)) await copyFile(join(directory, 'public', path.slice(1)), join(stagedMedia, path.split('/').pop()));
          entries.push({ ...old, ...meta });
          reused++;
        } else {
          const blocks = await normalizeBlocks(await children(page.id), children, image);
          const coverURL = page.cover?.[page.cover.type]?.url;
          if (page.cover && !coverURL) throw new Error('Page cover has no downloadable URL.');
          const cover = coverURL ? await image(coverURL) : undefined;
          entries.push({ ...meta, ...(cover ? { cover } : {}), blocks, fetchedAt: now.toISOString() });
          fetched++;
        }
      }
      // A withdrawal/edit made during the fetch must not publish the earlier body.
      const finalPages = (await list()).filter((page) => isPublished(page, now));
      if (fingerprint(pages) !== fingerprint(finalPages)) throw new Error('Published content changed during sync; rerun with a stable source.');
    }
    entries.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.id.localeCompare(b.id));
    await writeFile(join(stage, 'catalog.json'), JSON.stringify({ format: FORMAT_VERSION, sourceKey, entries }, null, 2) + '\n');
    // Replace only after all pages, images and the final membership check succeed.
    if (await exists(media)) { await rename(media, previousMedia); movedOld = true; }
    await rename(stagedMedia, media); installedMedia = true;
    await rename(join(stage, 'catalog.json'), output);
    return { published: entries.length, fetched, reused, disabled: enabled === 'false' };
  } catch (error) {
    if (installedMedia) await rm(media, { recursive: true, force: true });
    if (movedOld) await rename(previousMedia, media);
    throw error;
  } finally {
    await rm(stage, { recursive: true, force: true });
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const result = await syncNotion({ full: process.argv.includes('--full') || process.env.NOTION_FULL_REFRESH === 'true' });
    console.log(`Notion: ${result.published} published; ${result.fetched} fetched; ${result.reused} reused${result.disabled ? ' (CMS disabled: empty snapshot)' : ''}.`);
  } catch (error) {
    // Avoid logging request objects, raw API errors or signed media URLs.
    console.error(`Notion sync stopped: ${error.message}`);
    process.exitCode = 1;
  }
}
