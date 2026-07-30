import { readTitle, type PropertyMap } from "../properties";
import { richTextToMarkdown, richTextToPlain } from "../rich-text";
import type { MapContext, SyncPage } from "./common";
import { baseSlug, createdAt, entityId, registerId, updatedAt } from "./common";

function serializeProperty(prop: {
  type: string;
  title?: unknown;
  rich_text?: unknown;
  select?: { name?: string } | null;
  status?: { name?: string } | null;
  multi_select?: Array<{ name?: string }>;
  number?: number | null;
  date?: { start?: string | null } | null;
  checkbox?: boolean;
  url?: string | null;
  relation?: Array<{ id: string }>;
  formula?: { type?: string; string?: string | null; number?: number | null };
}): unknown {
  switch (prop.type) {
    case "title":
      return richTextToPlain(prop.title as never);
    case "rich_text":
      return richTextToMarkdown(prop.rich_text as never);
    case "select":
      return prop.select?.name ?? null;
    case "status":
      return prop.status?.name ?? null;
    case "multi_select":
      return (prop.multi_select ?? []).map((t) => t.name);
    case "number":
      return prop.number ?? null;
    case "date":
      return prop.date?.start ?? null;
    case "checkbox":
      return Boolean(prop.checkbox);
    case "url":
      return prop.url ?? null;
    case "relation":
      return (prop.relation ?? []).map((r) => r.id);
    case "formula":
      return prop.formula?.string ?? prop.formula?.number ?? null;
    default:
      return { type: prop.type };
  }
}

function flattenProperties(properties: PropertyMap): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [name, prop] of Object.entries(properties)) {
    out[name] = serializeProperty(prop);
  }
  return out;
}

/** Preserve unmapped Notion DBs without forcing Content OS schemas. */
export function mapInbox(
  page: SyncPage,
  ctx: MapContext,
  meta: { databaseId: string; databaseTitle: string },
) {
  const p = page.properties;
  const title = readTitle(p) || page.id;
  const slug = baseSlug(page, p);
  const id = entityId("inbox", `${toDbSlug(meta.databaseTitle)}-${slug}`);
  registerId(ctx, page.id, id);

  const record = {
    id,
    slug,
    title,
    source: {
      notionPageId: page.id,
      notionDatabaseId: meta.databaseId,
      notionDatabaseTitle: meta.databaseTitle,
      notionUrl: page.url ?? null,
    },
    properties: flattenProperties(p),
    createdAt: createdAt(page, p),
    updatedAt: updatedAt(page, p),
  };

  return { slug: `${toDbSlug(meta.databaseTitle)}--${slug}`, record, warnings: [] as string[] };
}

function toDbSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "db";
}
