import type { MapContext, SyncPage } from "./common";
import {
  baseSlug,
  entityId,
  normalizeEnum,
  readCommonText,
  registerId,
  relatedFromProps,
} from "./common";

const CATEGORIES = [
  "medicine",
  "ai",
  "biology",
  "philosophy",
  "technology",
  "neuroscience",
  "human-systems",
] as const;

export function mapConcept(page: SyncPage, ctx: MapContext) {
  const p = page.properties;
  const common = readCommonText(p);
  const slug = baseSlug(page, p);
  const id = entityId("concept", slug);
  registerId(ctx, page.id, id);
  const related = relatedFromProps(p, ctx);

  const record = {
    $schema: "../schemas/concept.schema.json",
    id,
    slug,
    name: common.title || slug,
    category: normalizeEnum(
      common.categoryRaw || "medicine",
      CATEGORIES,
      "medicine",
    ),
    summary: common.summary || common.body || common.title || slug,
    references: [] as unknown[],
    connectedNodeIds: related.relatedConceptIds.length
      ? related.relatedConceptIds
      : related.relatedEntityIds,
  };

  return {
    slug,
    record,
    warnings: record.summary ? [] : ["missing summary"],
  };
}
