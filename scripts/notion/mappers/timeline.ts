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
} from "./common";

const KINDS = [
  "milestone",
  "project-start",
  "question-opened",
  "publication",
  "experiment",
  "reflection",
] as const;

export function mapTimeline(page: SyncPage, ctx: MapContext) {
  const p = page.properties;
  const common = readCommonText(p);
  const slug = baseSlug(page, p);
  const id = entityId("tl", slug);
  registerId(ctx, page.id, id);
  const related = relatedFromProps(p, ctx);

  const record = {
    $schema: "../schemas/timeline.schema.json",
    id,
    slug,
    title: common.title || slug,
    summary: common.summary || common.body || common.title || slug,
    kind: normalizeEnum(common.categoryRaw || "milestone", KINDS, "milestone"),
    occurredAt: common.date || createdAt(page, p) || todayIso(),
    relatedEntityIds: related.relatedEntityIds.length
      ? related.relatedEntityIds
      : [
          ...related.relatedProjectIds,
          ...related.relatedConceptIds,
          ...related.relatedQuestionIds,
          ...related.relatedFocusIds,
        ],
    body: common.body || undefined,
  };

  return { slug, record, warnings: [] as string[] };
}
