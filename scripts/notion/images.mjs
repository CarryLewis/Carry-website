import { createHash } from 'node:crypto';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const NOTION_HOSTS = ['s3.us-west-2.amazonaws.com', 's3-us-west-2.amazonaws.com', 'prod-files-secure.s3.us-west-2.amazonaws.com', 'secure.notion-static.com', 'file.notion.so'];
export function imageURL(value, extraHosts = []) {
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password || (url.port && url.port !== '443') || ![...NOTION_HOSTS, ...extraHosts].includes(url.hostname)) {
    throw new Error('Image host is not allowed. Upload the image to Notion or explicitly allow its HTTPS host.');
  }
  return url;
}

function extension(bytes, type) {
  if (type === 'image/png' && bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) return 'png';
  if (type === 'image/jpeg' && bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) return 'jpg';
  if (type === 'image/gif' && ['GIF87a', 'GIF89a'].includes(bytes.subarray(0, 6).toString())) return 'gif';
  if (type === 'image/webp' && bytes.subarray(0, 4).toString() === 'RIFF' && bytes.subarray(8, 12).toString() === 'WEBP') return 'webp';
  if (type === 'image/avif' && bytes.subarray(4, 8).toString() === 'ftyp' && ['avif', 'avis'].includes(bytes.subarray(8, 12).toString())) return 'avif';
  throw new Error('Only PNG, JPEG, GIF, WebP and AVIF images with matching signatures are supported.');
}

export async function downloadImage(value, directory, { extraHosts = [], fetcher = fetch } = {}) {
  let url = imageURL(value, extraHosts);
  const maxBytes = 10 * 1024 * 1024;
  for (let redirects = 0; redirects <= 3; redirects++) {
    let response;
    try { response = await fetcher(url, { redirect: 'manual', signal: AbortSignal.timeout(30_000) }); }
    catch { throw new Error('Image download failed (signed URL omitted).'); }
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const next = response.headers.get('location');
      await response.body?.cancel();
      if (!next) throw new Error('Image redirect is missing its destination.');
      url = imageURL(new URL(next, url).href, extraHosts);
      continue;
    }
    if (!response.ok || !response.body) throw new Error(`Image download failed: HTTP ${response.status}.`);
    if (Number(response.headers.get('content-length')) > maxBytes) {
      await response.body.cancel();
      throw new Error('Image exceeds 10 MiB.');
    }
    const parts = [];
    let size = 0;
    for await (const chunk of response.body) {
      size += chunk.length;
      if (size > maxBytes) throw new Error('Image exceeds 10 MiB.');
      parts.push(chunk);
    }
    const bytes = Buffer.concat(parts);
    const ext = extension(bytes, (response.headers.get('content-type') ?? '').split(';')[0].trim().toLowerCase());
    const filename = `${createHash('sha256').update(bytes).digest('hex')}.${ext}`;
    await writeFile(join(directory, filename), bytes);
    return `/notion/${filename}`;
  }
  throw new Error('Too many image redirects.');
}
