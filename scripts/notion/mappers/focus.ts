import type { MapContext, SyncPage } from "./common";
import {
  baseSlug,
  createdAt,
  entityId,
  normalizeEnum,
  readCommonText,
  registerId,
  relatedFromProps,
  updatedAt,
} from "./common";

const STATUSES = [
  "active",
  "dormant",
  "archived",
  "prototype",
  "experiment",
] as const;

const PRIORITIES = ["p0", "p1", "p2"] as const;

export function mapFocus(page: SyncPage, ctx: MapContext) {
  const p = page.properties;
  const common = readCommonText(p);
  const slug = baseSlug(page, p);
  const id = entityId("focus", slug);
  registerId(ctx, page.id, id);
  const related = relatedFromProps(p, ctx);

  const record = {
    $schema: "../schemas/focus.schema.json",
    id,
    slug,
    title: common.title || slug,
    description: common.summary || common.body || common.title || slug,
    domain: common.categoryRaw || ctx.databaseTitle || "General",
    status: normalizeEnum(common.statusRaw || "active", STATUSES, "active"),
    priority: normalizeEnum(common.priorityRaw || "p1", PRIORITIES, "p1"),
    relatedProjectIds: related.relatedProjectIds,
    relatedQuestionIds: related.relatedQuestionIds,
    relatedConceptIds: related.relatedConceptIds,
    fields: common.fields.length ? common.fields : undefined,
    createdAt: createdAt(page, p),
    updatedAt: updatedAt(page, p),
  };

  return { slug, record, warnings: validateFocus(record) };
}

function validateFocus(record: {
  title: string;
  description: string;
}): string[] {
  const warnings: string[] = [];
  if (!record.title) warnings.push("missing title");
  if (!record.description) warnings.push("missing description");
  return warnings;
}
