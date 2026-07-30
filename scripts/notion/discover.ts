import type { Client } from "@notionhq/client";
import { isFullDatabase } from "@notionhq/client";
import { richTextToPlain } from "./rich-text";

export type DiscoveredDatabase = {
  id: string;
  title: string;
  parentPageId: string | null;
  url: string | null;
  /** true when discovered as child_database; false for linked database refs */
  inline: boolean;
  dataSourceIds: string[];
};

type Block = {
  id: string;
  type: string;
  has_children?: boolean;
  child_database?: { title?: string };
  child_page?: { title?: string };
  link_to_page?: { type?: string; database_id?: string; page_id?: string };
};

async function listAllChildren(client: Client, blockId: string): Promise<Block[]> {
  const results: Block[] = [];
  let cursor: string | undefined;
  do {
    const page = await client.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 100,
    });
    results.push(...(page.results as Block[]));
    cursor = page.has_more ? (page.next_cursor ?? undefined) : undefined;
  } while (cursor);
  return results;
}

async function loadDatabaseMeta(
  client: Client,
  databaseId: string,
): Promise<{ title: string; url: string | null; dataSourceIds: string[] }> {
  try {
    const db = await client.databases.retrieve({ database_id: databaseId });
    if (!isFullDatabase(db)) {
      return { title: databaseId, url: null, dataSourceIds: [] };
    }
    return {
      title: richTextToPlain(db.title as never) || databaseId,
      url: db.url ?? null,
      dataSourceIds: db.data_sources.map((ds) => ds.id),
    };
  } catch {
    return { title: databaseId, url: null, dataSourceIds: [] };
  }
}

/**
 * Recursively discover child databases (and link_to_page database links)
 * under a Notion page. Depth-limited to avoid runaway traversal.
 */
export async function discoverDatabases(
  client: Client,
  rootPageId: string,
  options?: { maxDepth?: number },
): Promise<DiscoveredDatabase[]> {
  const maxDepth = options?.maxDepth ?? 6;
  const found = new Map<string, DiscoveredDatabase>();

  async function walk(pageId: string, depth: number, parentPageId: string | null) {
    if (depth > maxDepth) return;
    let children: Block[];
    try {
      children = await listAllChildren(client, pageId);
    } catch (err) {
      console.warn(`[discover] cannot list children of ${pageId}:`, err);
      return;
    }

    for (const block of children) {
      if (block.type === "child_database") {
        const id = block.id;
        if (!found.has(id)) {
          const meta = await loadDatabaseMeta(client, id);
          const title = block.child_database?.title?.trim() || meta.title;
          found.set(id, {
            id,
            title,
            parentPageId,
            url: meta.url ?? `https://www.notion.so/${id.replace(/-/g, "")}`,
            inline: true,
            dataSourceIds: meta.dataSourceIds,
          });
        }
      } else if (
        block.type === "link_to_page" &&
        block.link_to_page?.type === "database_id" &&
        block.link_to_page.database_id
      ) {
        const id = block.link_to_page.database_id;
        if (!found.has(id)) {
          const meta = await loadDatabaseMeta(client, id);
          found.set(id, {
            id,
            title: meta.title,
            parentPageId,
            url: meta.url,
            inline: false,
            dataSourceIds: meta.dataSourceIds,
          });
        }
      } else if (block.type === "child_page") {
        await walk(block.id, depth + 1, pageId);
      } else if (block.has_children) {
        await walk(block.id, depth + 1, parentPageId);
      }
    }
  }

  await walk(rootPageId, 0, null);
  return [...found.values()].sort((a, b) => a.title.localeCompare(b.title));
}
