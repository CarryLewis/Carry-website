import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { syncNotion } from '../sync-notion.mjs';
import { createNotionClient, paginate } from './api.mjs';
import { downloadImage, imageURL } from './images.mjs';
import { assertUnique, isPublished, metadata, normalizeBlocks, rich, validateSchema } from './model.mjs';

const now = new Date('2026-10-27T01:00:00Z');
const env = { NOTION_SYNC_ENABLED: 'true', NOTION_TOKEN: 'test-only-do-not-use', NOTION_DATA_SOURCE_ID: '11111111-1111-4111-8111-111111111111' };
const text = (content) => [{ type: 'text', plain_text: content, text: { content } }];
const schema = () => ({ properties: Object.fromEntries(Object.entries({ Title: 'title', Slug: 'rich_text', Type: 'select', Status: 'select', PublishedAt: 'date', Summary: 'rich_text', Author: 'rich_text', Rank: 'number', Tags: 'multi_select' }).map(([key, type]) => [key, { type, ...(key === 'Status' ? { select: { options: [{ name: 'Published' }] } } : {}) }])) });
function page(slug = 'test-note', kind = 'essay') {
  return { id: `page-${slug}`, last_edited_time: '2026-10-26T12:00:00Z', properties: {
    Title: { title: text('测试内容 <script>') }, Slug: { rich_text: text(slug) }, Type: { select: { name: kind } }, Status: { select: { name: 'Published' } }, PublishedAt: { date: { start: '2026-10-26T20:00:00+08:00' } }, Summary: { rich_text: text('A public summary') }, Author: { rich_text: text('Test author') }, Rank: { number: null }, Tags: { multi_select: [] },
  } };
}
const paragraph = (content = 'Only public text') => ({ type: 'paragraph', paragraph: { rich_text: text(content) } });
const list = (results) => ({ results, has_more: false });
function mockAPI(pages, blocks = [paragraph()]) {
  const calls = [];
  return Object.assign(async (path, body) => {
    calls.push({ path, body });
    if (path.endsWith('/query')) {
      assert.deepEqual(body.filter, { property: 'Status', select: { equals: 'Published' } });
      return list(pages);
    }
    if (path.startsWith('data_sources/')) return schema();
    return list(blocks);
  }, { calls });
}
async function temporary(t) {
  const directory = await mkdtemp(join(tmpdir(), 'notion-cms-test-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  return directory;
}
const catalog = async (directory) => JSON.parse(await readFile(join(directory, 'content/notion/catalog.json'), 'utf8'));

test('publication gate excludes draft, withdrawal, trash, archive and future dates', () => {
  assert.equal(isPublished(page(), now), true);
  for (const status of ['Draft', 'Withdrawn', 'published']) {
    const p = page(); p.properties.Status.select.name = status;
    assert.equal(isPublished(p, now), false);
  }
  for (const flag of ['archived', 'in_trash']) assert.equal(isPublished({ ...page(), [flag]: true }, now), false);
  const future = page(); future.properties.PublishedAt.date.start = '2026-11-01';
  assert.equal(isPublished(future, now), false);
  const missing = page(); missing.properties.PublishedAt.date = null;
  assert.throws(() => isPublished(missing, now), /PublishedAt/);
});

test('validates exact schema, slug, type, rank and duplicate routes', () => {
  validateSchema(schema());
  const wrong = schema(); wrong.properties.Status.type = 'status';
  assert.throws(() => validateSchema(wrong), /Status/);
  for (const slug of ['../private', '中文路径', 'Upper', 'bad/path', 'a--b']) assert.throws(() => metadata(page(slug)), /Slug/);
  assert.throws(() => metadata(page('valid', 'unknown')), /Type/);
  const rank = page(); rank.properties.Rank.number = 1.5;
  assert.throws(() => metadata(rank), /Rank/);
  assert.throws(() => assertUnique([metadata(page()), metadata(page())]), /Duplicate/);
});

test('paginates full membership and rejects incomplete or looping results', async () => {
  const calls = [];
  const rows = await paginate(async (path, body) => {
    calls.push(body);
    return calls.length === 1 ? { results: [1], has_more: true, next_cursor: 'opaque-token' } : list([2]);
  }, 'query', { filter: {} });
  assert.deepEqual(rows, [1, 2]); assert.equal(calls[1].start_cursor, 'opaque-token');
  await assert.rejects(paginate(async () => ({ ...list([]), request_status: { type: 'incomplete' } }), 'query', {}), /incomplete/);
  await assert.rejects(paginate(async () => ({ results: [], has_more: true, next_cursor: 'same' }), 'query', {}), /repeated/);
});

test('rate-limit retry respects Retry-After and never returns raw API error text', async () => {
  const waits = []; let count = 0;
  const request = createNotionClient('test-secret', { wait: async (ms) => waits.push(ms), fetcher: async (url, options) => {
    assert.equal(options.headers['Notion-Version'], '2026-03-11');
    return ++count === 1 ? new Response('', { status: 429, headers: { 'retry-after': '2' } }) : Response.json({ ok: true });
  } });
  assert.deepEqual(await request('test'), { ok: true }); assert.ok(waits.includes(2000));
  const fail = createNotionClient('test-secret', { wait: async () => {}, fetcher: async () => new Response('SENSITIVE', { status: 401 }) });
  await assert.rejects(fail('test'), (error) => /401/.test(error.message) && !error.message.includes('SENSITIVE'));
});

test('normalizes nested lists and strips dangerous links; unsupported blocks stop sync', async () => {
  assert.deepEqual(rich([{ ...text('<b>literal</b>')[0], href: 'javascript:alert(1)' }]), [{ text: '<b>literal</b>' }]);
  const blocks = await normalizeBlocks([{ id: 'list', type: 'numbered_list_item', has_children: true, numbered_list_item: { rich_text: text('First') } }], async () => [paragraph('Nested')], async () => 'unused');
  assert.equal(blocks[0].children[0].text[0].text, 'Nested');
  await assert.rejects(normalizeBlocks([{ type: 'child_page' }], async () => [], async () => ''), /Unsupported/);
});

test('images reject non-HTTPS, unapproved hosts, redirects and SVG', async (t) => {
  const directory = await temporary(t);
  for (const url of ['http://file.notion.so/a', 'https://127.0.0.1/a', 'https://file.notion.so.evil.example/a', 'https://u:p@file.notion.so/a']) assert.throws(() => imageURL(url));
  await assert.rejects(downloadImage('https://file.notion.so/a', directory, { fetcher: async () => new Response('', { status: 302, headers: { location: 'http://127.0.0.1/private' } }) }), /host/);
  await assert.rejects(downloadImage('https://file.notion.so/a', directory, { fetcher: async () => new Response('<svg/>', { headers: { 'content-type': 'image/svg+xml' } }) }), /Only PNG/);
  await assert.rejects(downloadImage('https://file.notion.so/a', directory, { fetcher: async () => new Response('x', { headers: { 'content-length': String(11 * 1024 * 1024) } }) }), /10 MiB/);
});

test('initial sync, cache reuse, metadata edits, forced and daily full refresh', async (t) => {
  const directory = await temporary(t);
  const api = mockAPI([page()]);
  const first = await syncNotion({ directory, env, request: api, now });
  assert.equal(first.fetched, 1);
  const second = await syncNotion({ directory, env, request: api, now });
  assert.equal(second.reused, 1);
  assert.equal(api.calls.filter((call) => call.path.startsWith('blocks/')).length, 1);
  const edited = page(); edited.last_edited_time = '2026-10-27T00:00:00Z';
  assert.equal((await syncNotion({ directory, env, request: mockAPI([edited]), now })).fetched, 1);
  assert.equal((await syncNotion({ directory, env, request: mockAPI([edited]), now, full: true })).fetched, 1);
  assert.equal((await syncNotion({ directory, env, request: mockAPI([edited]), now: new Date('2026-10-28T02:00:00Z') })).fetched, 1);
});

test('only eligible pages become JSON; slug changes replace old routes; withdrawals delete entries', async (t) => {
  const directory = await temporary(t);
  const draft = page('private-draft'); draft.properties.Status.select.name = 'Draft';
  const future = page('future'); future.properties.PublishedAt.date.start = '2027-01-01';
  await syncNotion({ directory, env, request: mockAPI([page(), draft, future]), now });
  assert.equal((await catalog(directory)).entries.length, 1);
  const renamed = page('new-slug'); renamed.id = page().id;
  await syncNotion({ directory, env, request: mockAPI([renamed]), now });
  assert.equal((await catalog(directory)).entries[0].slug, 'new-slug');
  await syncNotion({ directory, env, request: mockAPI([]), now });
  assert.deepEqual((await catalog(directory)).entries, []);
});

test('downloaded images persist by content hash, refetch on missing file, prune on withdrawal', async (t) => {
  const directory = await temporary(t);
  const image = { type: 'image', image: { type: 'file', file: { url: 'https://file.notion.so/a?secret=SIGNED' }, caption: text('图注') } };
  const bytes = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl6nL8AAAAASUVORK5CYII=', 'base64');
  const fetcher = async () => new Response(bytes, { headers: { 'content-type': 'image/png' } });
  await syncNotion({ directory, env, request: mockAPI([page()], [image]), fetcher, now });
  let snapshot = await catalog(directory);
  assert.ok(!JSON.stringify(snapshot).includes('SIGNED'));
  const files = await readdir(join(directory, 'public/notion'));
  assert.equal(files.length, 1);
  assert.equal((await syncNotion({ directory, env, request: mockAPI([page()], [image]), fetcher, now })).reused, 1);
  await rm(join(directory, 'public/notion', files[0]));
  assert.equal((await syncNotion({ directory, env, request: mockAPI([page()], [image]), fetcher, now })).fetched, 1);
  await syncNotion({ directory, env, request: mockAPI([]), now });
  assert.deepEqual(await readdir(join(directory, 'public/notion')), []);
});

test('partial API/block/image failures preserve previous snapshot and media', async (t) => {
  const directory = await temporary(t);
  await syncNotion({ directory, env, request: mockAPI([page()]), now });
  const before = await readFile(join(directory, 'content/notion/catalog.json'), 'utf8');
  const fail = async (path, body) => { if (path.startsWith('blocks/')) throw new Error('Test outage'); return mockAPI([page('new-entry')])(path, body); };
  await assert.rejects(syncNotion({ directory, env, request: fail, now }), /outage/);
  assert.equal(await readFile(join(directory, 'content/notion/catalog.json'), 'utf8'), before);
  await assert.rejects(syncNotion({ directory, env, request: mockAPI([page('new-entry')], [{ type: 'image', image: { type: 'external', external: { url: 'https://evil.example/a' } } }]), now }), /host/);
  assert.equal(await readFile(join(directory, 'content/notion/catalog.json'), 'utf8'), before);
});

test('withdrawal during sync aborts before replacing existing snapshot', async (t) => {
  const directory = await temporary(t);
  await syncNotion({ directory, env, request: mockAPI([page()]), now });
  let queries = 0;
  const request = async (path, body) => path.endsWith('/query') ? list(++queries === 1 ? [page('new-entry')] : []) : mockAPI([])(path, body);
  await assert.rejects(syncNotion({ directory, env, request, now }), /changed during sync/);
  assert.equal((await catalog(directory)).entries[0].slug, 'test-note');
});

test('disabled CMS empties old content; missing credentials fail before changing it', async (t) => {
  const directory = await temporary(t);
  await syncNotion({ directory, env, request: mockAPI([page()]), now });
  await assert.rejects(syncNotion({ directory, env: { NOTION_SYNC_ENABLED: 'true' }, now }), /NOTION_TOKEN/);
  assert.equal((await catalog(directory)).entries.length, 1);
  await syncNotion({ directory, env: {}, now });
  assert.deepEqual((await catalog(directory)).entries, []);
});
