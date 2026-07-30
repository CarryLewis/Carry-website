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

const STATUSES = ["active", "prototype", "experiment", "archive"] as const;

export function mapProject(page: SyncPage, ctx: MapContext) {
  const p = page.properties;
  const common = readCommonText(p);
  const slug = baseSlug(page, p);
  const id = entityId("proj", slug);
  registerId(ctx, page.id, id);
  const related = relatedFromProps(p, ctx);
  const summary = common.summary || common.body || common.title || slug;

  const record = {
    $schema: "../schemas/project.schema.json",
    id,
    slug,
    title: common.title || slug,
    summary,
    problem: common.problem || summary,
    architecture: common.architecture || "TBD",
    status: normalizeEnum(common.statusRaw || "active", STATUSES, "active"),
    technology: common.technology,
    relatedResearchIds: related.relatedResearchIds.length
      ? related.relatedResearchIds
      : related.relatedQuestionIds,
    relatedConceptIds: related.relatedConceptIds,
    relatedSignalIds: related.relatedSignalIds.length
      ? related.relatedSignalIds
      : undefined,
    relatedFocusIds: related.relatedFocusIds.length
      ? related.relatedFocusIds
      : undefined,
    createdAt: createdAt(page, p),
    updatedAt: updatedAt(page, p),
  };

  const warnings: string[] = [];
  if (!common.problem) warnings.push("problem defaulted from summary");
  if (!common.architecture) warnings.push("architecture defaulted to TBD");

  return { slug, record, warnings };
}
