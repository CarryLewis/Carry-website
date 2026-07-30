import type { MapContext, SyncPage } from "./common";
import {
  baseSlug,
  createdAt,
  entityId,
  normalizeEnum,
  readCommonText,
  registerId,
  relatedFromProps,
} from "./common";

const CATEGORIES = [
  "biomedical-systems",
  "computational-medicine",
  "neuroscience",
  "immunology",
  "future-medicine",
] as const;

const STATUSES = [
  "active",
  "dormant",
  "archived",
  "prototype",
  "experiment",
] as const;

export function mapQuestion(page: SyncPage, ctx: MapContext) {
  const p = page.properties;
  const common = readCommonText(p);
  const slug = baseSlug(page, p);
  const id = entityId("q", slug);
  registerId(ctx, page.id, id);
  const related = relatedFromProps(p, ctx);
  const category = normalizeEnum(
    common.categoryRaw || "computational-medicine",
    CATEGORIES,
    "computational-medicine",
  );
  const question = common.title || common.summary || slug;

  const record = {
    $schema: "../schemas/question.schema.json",
    id,
    slug,
    question,
    category,
    relatedConceptIds: related.relatedConceptIds,
    relatedProjectIds: related.relatedProjectIds,
    createdAt: createdAt(page, p),
    status: normalizeEnum(common.statusRaw || "active", STATUSES, "active"),
    href: `/research/${category}/${slug}/`,
  };

  return {
    slug,
    record,
    warnings: question ? [] : ["missing question text"],
  };
}
