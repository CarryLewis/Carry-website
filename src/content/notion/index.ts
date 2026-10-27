import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export type RichText = { text: string; href?: string; bold?: boolean; italic?: boolean; strike?: boolean; code?: boolean };
export type Block = {
  type: string;
  text: RichText[];
  children?: Block[];
  src?: string;
  checked?: boolean;
  cells?: RichText[][];
  columnHeader?: boolean;
  rowHeader?: boolean;
};
export type Entry = {
  id: string;
  kind: 'book' | 'essay' | 'ranking';
  slug: string;
  title: string;
  summary: string;
  author: string;
  tags: string[];
  rank: number | null;
  publishedAt: string;
  updatedAt: string;
  cover?: string;
  blocks: Block[];
};
export const categories = [
  { kind: 'book', label: '书单', description: '读过的书，以及它们留下的问题。' },
  { kind: 'essay', label: '随笔', description: '一些观察、思考与仍在形成的判断。' },
  { kind: 'ranking', label: '排行榜', description: '在当下的经验里，记录自己的偏好与理由。' },
] as const;

export function listEntries(): Entry[] {
  try {
    const catalog = JSON.parse(readFileSync(join(process.cwd(), 'content/notion/catalog.json'), 'utf8'));
    if (catalog.format !== 1 || !Array.isArray(catalog.entries)) throw new Error('Invalid Notion snapshot.');
    return catalog.entries;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT' && process.env.NOTION_SYNC_ENABLED !== 'true') return [];
    throw error;
  }
}

export function entryURL(entry: Pick<Entry, 'kind' | 'slug'>) {
  return `/journal/${entry.kind}/${entry.slug}/`;
}
