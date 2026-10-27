import { setTimeout as sleep } from 'node:timers/promises';

export const API_VERSION = '2026-03-11';

export function createNotionClient(token, { fetcher = fetch, wait = sleep } = {}) {
  let lastRequest = 0;
  return async function request(path, body) {
    for (let attempt = 0; attempt < 5; attempt++) {
      await wait(Math.max(0, 350 - (Date.now() - lastRequest)));
      lastRequest = Date.now();
      let response;
      try {
        response = await fetcher(`https://api.notion.com/v1/${path}`, {
          method: body ? 'POST' : 'GET',
          headers: { Authorization: `Bearer ${token}`, 'Notion-Version': API_VERSION, 'Content-Type': 'application/json' },
          body: body ? JSON.stringify(body) : undefined,
          signal: AbortSignal.timeout(30_000),
          redirect: 'error',
        });
      } catch {
        if (attempt === 4) throw new Error('Notion network request failed (URL and credentials omitted).');
        await wait(1000 * 2 ** attempt);
        continue;
      }
      // These POSTs only query data; retrying them cannot create duplicate writes.
      if ([429, 529, 500, 502, 503, 504].includes(response.status) && attempt < 4) {
        const delay = Number(response.headers.get('retry-after'));
        await response.body?.cancel();
        await wait(Number.isFinite(delay) && delay > 0 ? delay * 1000 : 1000 * 2 ** attempt);
        continue;
      }
      if (!response.ok) throw new Error(`Notion request failed: HTTP ${response.status} (response body omitted).`);
      return response.json();
    }
  };
}

export async function paginate(request, path, body) {
  const results = [];
  const cursors = new Set();
  let cursor;
  do {
    const response = body
      ? await request(path, { ...body, page_size: 100, ...(cursor ? { start_cursor: cursor } : {}) })
      : await request(`${path}?page_size=100${cursor ? `&start_cursor=${encodeURIComponent(cursor)}` : ''}`);
    if (response.request_status?.type === 'incomplete' || !Array.isArray(response.results)) {
      throw new Error('Notion returned an incomplete result; refusing to replace the snapshot.');
    }
    results.push(...response.results);
    if (!response.has_more) break;
    cursor = response.next_cursor;
    if (!cursor || cursors.has(cursor)) throw new Error('Notion pagination cursor missing or repeated.');
    cursors.add(cursor);
  } while (true);
  return results;
}
