import { ALIASES, readByAliases, readRelationsByAliases, readTitle } from "../properties";
import type { MapContext, SyncPage } from "./common";
import { entityId, normalizeEnum, registerId, resolveRelated, toSlug } from "./common";

const TYPES = [
  "related-to",
  "informed-by",
  "builds-on",
  "contradicts",
  "exemplifies",
  "references",
  "part-of",
  "precedes",
  "explores",
  "answers",
] as const;

/**
 * Map a relations-database row into a RelationRecord.
 * Expects From / To relation props (or related aliases) plus Type.
 */
export function mapRelation(page: SyncPage, ctx: MapContext) {
  const p = page.properties;
  const title = readTitle(p);
  const slug = toSlug(title || page.id.slice(0, 8));
  const id = entityId("rel", slug);
  registerId(ctx, page.id, id);

  const fromIds = resolveRelated(
    readRelationsByAliases(p, ["from", "source", "起点", ...ALIASES.relatedEntities]),
    ctx.idIndex,
  );
  // Prefer dedicated "to" over generic related
  const toIds = resolveRelated(
    readRelationsByAliases(p, ["to", "target", "终点"]),
    ctx.idIndex,
  );

  const typeRaw = readByAliases(p, ["type", "relationtype", "关系类型", "kind"]);
  const note = readByAliases(p, ["note", "notes", "备注"]);

  const from = fromIds[0];
  const to = toIds[0] || fromIds[1];

  const warnings: string[] = [];
  if (!from || !to) warnings.push("missing from/to relation endpoints");

  const record = {
    id,
    from: from || "unknown",
    to: to || "unknown",
    type: normalizeEnum(typeRaw || "related-to", TYPES, "related-to"),
    note: note || undefined,
  };

  return { slug, record, warnings };
}
