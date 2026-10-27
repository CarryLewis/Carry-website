export const FORMAT_VERSION = 1;
export const KINDS = ['book', 'essay', 'ranking'];
const fields = { Title: 'title', Slug: 'rich_text', Type: 'select', Status: 'select', PublishedAt: 'date', Summary: 'rich_text', Author: 'rich_text', Rank: 'number', Tags: 'multi_select' };

export function validateSchema(source) {
  for (const [name, type] of Object.entries(fields)) {
    if (source.properties?.[name]?.type !== type) throw new Error(`Notion property ${name} must have type ${type}.`);
  }
  const statuses = source.properties.Status.select?.options?.map((option) => option.name) ?? [];
  if (!statuses.includes('Published')) throw new Error('Status must contain the Published option.');
}

export function plain(richText = []) {
  return richText.map((item) => item.plain_text ?? item.text?.content ?? '').join('');
}

export function safeLink(value) {
  if (typeof value !== 'string') return undefined;
  try {
    const url = new URL(value);
    return ['https:', 'http:', 'mailto:'].includes(url.protocol) && !url.username && !url.password ? url.href : undefined;
  } catch { return undefined; }
}

export function rich(richText = []) {
  return richText.map((item) => ({
    text: plain([item]),
    ...(safeLink(item.href ?? item.text?.link?.url) ? { href: safeLink(item.href ?? item.text?.link?.url) } : {}),
    ...(item.annotations?.bold ? { bold: true } : {}),
    ...(item.annotations?.italic ? { italic: true } : {}),
    ...(item.annotations?.strikethrough ? { strike: true } : {}),
    ...(item.annotations?.code ? { code: true } : {}),
  }));
}

export function isPublished(page, now) {
  if (page.archived || page.in_trash || page.properties?.Status?.select?.name !== 'Published') return false;
  const date = page.properties.PublishedAt?.date?.start;
  if (!date || !Number.isFinite(Date.parse(date))) throw new Error('Published entries require a valid PublishedAt.');
  return Date.parse(date) <= now.getTime();
}

export function metadata(page) {
  const p = page.properties;
  const title = plain(p.Title?.title).trim();
  const slug = plain(p.Slug?.rich_text).trim();
  const kind = p.Type?.select?.name;
  if (!title || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !KINDS.includes(kind)) {
    throw new Error('Published entries require Title, a lowercase kebab-case Slug, and Type book/essay/ranking.');
  }
  if (!page.id || !Number.isFinite(Date.parse(page.last_edited_time))) throw new Error('Invalid Notion page identity or edit time.');
  const rank = p.Rank?.number ?? null;
  if (rank !== null && (!Number.isInteger(rank) || rank < 1)) throw new Error('Rank must be empty or a positive integer.');
  return {
    id: page.id, kind, slug, title,
    summary: plain(p.Summary?.rich_text), author: plain(p.Author?.rich_text),
    rank, tags: (p.Tags?.multi_select ?? []).map((tag) => tag.name),
    publishedAt: p.PublishedAt.date.start, updatedAt: page.last_edited_time,
  };
}

export function assertUnique(entries) {
  const paths = new Set();
  const ids = new Set();
  for (const entry of entries) {
    const path = `${entry.kind}/${entry.slug}`;
    if (paths.has(path) || ids.has(entry.id)) throw new Error('Duplicate published path or page ID.');
    paths.add(path); ids.add(entry.id);
  }
}

export async function normalizeBlocks(blocks, children, image, depth = 0) {
  if (depth > 20) throw new Error('Notion block nesting exceeds 20 levels.');
  const supported = new Set(['paragraph', 'heading_1', 'heading_2', 'heading_3', 'bulleted_list_item', 'numbered_list_item', 'quote', 'callout', 'toggle', 'to_do', 'code', 'divider', 'image', 'table', 'table_row', 'column_list', 'column']);
  const result = [];
  for (const block of blocks) {
    if (block.archived || block.in_trash) continue;
    if (!supported.has(block.type)) throw new Error(`Unsupported Notion block: ${block.type}. Convert it before publishing.`);
    const data = block[block.type];
    const node = { type: block.type, text: rich(data.rich_text) };
    if (block.type === 'image') {
      const url = data[data.type]?.url;
      if (!url) throw new Error('Notion image has no downloadable URL.');
      node.src = await image(url);
      node.text = rich(data.caption);
    }
    if (block.type === 'to_do') node.checked = !!data.checked;
    if (block.type === 'table_row') node.cells = data.cells.map(rich);
    if (block.type === 'table') {
      node.columnHeader = !!data.has_column_header;
      node.rowHeader = !!data.has_row_header;
    }
    if (block.has_children) node.children = await normalizeBlocks(await children(block.id), children, image, depth + 1);
    result.push(node);
  }
  return result;
}

export function imagePaths(entry) {
  const paths = new Set(entry.cover ? [entry.cover] : []);
  const visit = (blocks) => blocks.forEach((block) => {
    if (block.src) paths.add(block.src);
    if (block.children) visit(block.children);
  });
  visit(entry.blocks);
  return [...paths];
}
