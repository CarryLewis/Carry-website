import type { MapContext, SyncPage } from "./common";
import {
  baseSlug,
  createdAt,
  entityId,
  normalizeEnum,
  readCommonText,
  registerId,
  relatedFromProps,
  todayIso,
  updatedAt,
} from "./common";

const CATEGORIES = [
  "medical-intelligence",
  "ai-intelligence",
  "technology",
  "society",
  "personal-learning",
] as const;

const IMPORTANCE = ["low", "medium", "high"] as const;

export function mapSignal(page: SyncPage, ctx: MapContext) {
  const p = page.properties;
  const common = readCommonText(p);
  const slug = baseSlug(page, p);
  const id = entityId("sig", slug);
  registerId(ctx, page.id, id);
  const related = relatedFromProps(p, ctx);
  const date = common.date || createdAt(page, p) || todayIso();

  const record = {
    $schema: "../schemas/signal.schema.json",
    id,
    slug,
    title: common.title || slug,
    summary: common.summary || common.body || common.title || slug,
    category: normalizeEnum(
      common.categoryRaw || "medical-intelligence",
      CATEGORIES,
      "medical-intelligence",
    ),
    source: common.source || ctx.databaseTitle || "Notion",
    sourceUrl: common.url || undefined,
    importance: normalizeEnum(
      common.importanceRaw || "medium",
      IMPORTANCE,
      "medium",
    ),
    date,
    relatedTopicIds: [
      ...related.relatedResearchIds,
      ...related.relatedConceptIds,
      ...related.relatedEntityIds,
    ],
    createdAt: createdAt(page, p),
    updatedAt: updatedAt(page, p),
  };

  return { slug, record, warnings: [] as string[] };
}
