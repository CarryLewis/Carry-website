import {
  ALIASES,
  readByAliases,
  readDateByAliases,
  readListByAliases,
  readRelationsByAliases,
  readTitle,
  type PropertyMap,
} from "../properties";
import { entityId, toSlug } from "../slug";

export type SyncPage = {
  id: string;
  created_time?: string;
  last_edited_time?: string;
  url?: string;
  properties: PropertyMap;
};

export type MapContext = {
  /** Notion page UUID → Content OS entity id (filled as rows are mapped). */
  idIndex: Map<string, string>;
  module: string;
  databaseTitle: string;
};

const ISO_FALLBACK = "2026-01-01";

export function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export function createdAt(page: SyncPage, properties: PropertyMap): string {
  return (
    readDateByAliases(properties, ["created", "createdat", "created_time"]) ||
    page.created_time?.slice(0, 10) ||
    todayIso()
  );
}

export function updatedAt(page: SyncPage, properties: PropertyMap): string {
  return (
    readDateByAliases(properties, [
      "updated",
      "updatedat",
      "last_edited_time",
    ]) ||
    page.last_edited_time?.slice(0, 10) ||
    createdAt(page, properties)
  );
}

export function baseSlug(page: SyncPage, properties: PropertyMap): string {
  const title = readTitle(properties);
  return toSlug(title || page.id.slice(0, 8));
}

export function normalizeEnum<T extends string>(
  raw: string,
  allowed: readonly T[],
  fallback: T,
): T {
  const compact = toSlug(raw).replace(/-/g, "");
  for (const value of allowed) {
    if (toSlug(value).replace(/-/g, "") === compact) return value;
    if (value.toLowerCase() === raw.toLowerCase().trim()) return value;
  }
  // soft aliases
  const map: Record<string, string> = {
    archived: "archived",
    archive: "archive",
    active: "active",
    dormant: "dormant",
    prototype: "prototype",
    experiment: "experiment",
    experimental: "experiment",
    p0: "p0",
    p1: "p1",
    p2: "p2",
    high: "high",
    medium: "medium",
    low: "low",
  };
  const mapped = map[toSlug(raw)];
  if (mapped && (allowed as readonly string[]).includes(mapped)) {
    return mapped as T;
  }
  return fallback;
}

export function resolveRelated(
  notionIds: string[],
  idIndex: Map<string, string>,
): string[] {
  return notionIds
    .map((id) => idIndex.get(id) ?? id)
    .filter(Boolean);
}

export function registerId(
  ctx: MapContext,
  notionPageId: string,
  contentId: string,
) {
  ctx.idIndex.set(notionPageId, contentId);
}

export function readCommonText(properties: PropertyMap) {
  return {
    title: readTitle(properties),
    summary: readByAliases(properties, ALIASES.summary) || "",
    statusRaw: readByAliases(properties, ALIASES.status),
    priorityRaw: readByAliases(properties, ALIASES.priority),
    categoryRaw: readByAliases(properties, ALIASES.category),
    fields: readListByAliases(properties, ALIASES.fields),
    technology: readListByAliases(properties, ALIASES.technology),
    problem: readByAliases(properties, ALIASES.problem),
    architecture: readByAliases(properties, ALIASES.architecture),
    body: readByAliases(properties, ALIASES.body),
    source: readByAliases(properties, ALIASES.source),
    url: readByAliases(properties, ALIASES.url),
    importanceRaw: readByAliases(properties, ALIASES.importance),
    date:
      readDateByAliases(properties, ALIASES.date) ||
      undefined,
  };
}

export function relatedFromProps(properties: PropertyMap, ctx: MapContext) {
  return {
    relatedProjectIds: resolveRelated(
      readRelationsByAliases(properties, ALIASES.relatedProjects),
      ctx.idIndex,
    ),
    relatedQuestionIds: resolveRelated(
      readRelationsByAliases(properties, ALIASES.relatedQuestions),
      ctx.idIndex,
    ),
    relatedConceptIds: resolveRelated(
      readRelationsByAliases(properties, ALIASES.relatedConcepts),
      ctx.idIndex,
    ),
    relatedSignalIds: resolveRelated(
      readRelationsByAliases(properties, ALIASES.relatedSignals),
      ctx.idIndex,
    ),
    relatedFocusIds: resolveRelated(
      readRelationsByAliases(properties, ALIASES.relatedFocus),
      ctx.idIndex,
    ),
    relatedResearchIds: resolveRelated(
      readRelationsByAliases(properties, ALIASES.relatedResearch),
      ctx.idIndex,
    ),
    relatedEntityIds: resolveRelated(
      readRelationsByAliases(properties, ALIASES.relatedEntities),
      ctx.idIndex,
    ),
  };
}

export { entityId, toSlug, ISO_FALLBACK };
