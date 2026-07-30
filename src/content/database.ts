/**
 * Content Database — single source of truth loader.
 *
 * Reads structured JSON from /content/{collection}/*.json via generated-manifest.
 * UI must not hardcode entity content; consume this layer (or ContentRepository).
 *
 * Regenerate imports after adding JSON files:
 *   npm run content:manifest
 * (also runs at the end of `npm run sync:notion` and before `npm run build`)
 */

import type {
  ContentDatabase,
  ProjectRecord,
} from "@/content/types";
import { validateRelations } from "@/content/relations";
import {
  generatedConcepts,
  generatedFocus,
  generatedProjects,
  generatedQuestions,
  generatedRelationsCollection,
  generatedSignals,
  generatedTimeline,
} from "@/content/generated-manifest";

/** Immutable content database snapshot (build-time loaded). */
export const contentDatabase: ContentDatabase = {
  focus: generatedFocus,
  questions: generatedQuestions,
  projects: generatedProjects,
  concepts: generatedConcepts,
  signals: generatedSignals,
  timeline: generatedTimeline,
  relations: generatedRelationsCollection.edges,
};

const relationErrors = validateRelations(contentDatabase);
if (relationErrors.length > 0 && process.env.NODE_ENV !== "production") {
  console.warn("[content-database] relation validation:", relationErrors);
}

export function getContentDatabase(): ContentDatabase {
  return contentDatabase;
}

export function listFocus() {
  return [...contentDatabase.focus].sort((a, b) =>
    a.priority.localeCompare(b.priority),
  );
}

export function listQuestions() {
  return contentDatabase.questions;
}

export function listProjects(status?: ProjectRecord["status"]) {
  return status
    ? contentDatabase.projects.filter((p) => p.status === status)
    : contentDatabase.projects;
}

export function getProjectById(id: string) {
  return contentDatabase.projects.find((p) => p.id === id);
}

export function getProjectBySlug(slug: string) {
  return contentDatabase.projects.find((p) => p.slug === slug);
}

export function listConcepts() {
  return contentDatabase.concepts;
}

export function getConceptById(id: string) {
  return contentDatabase.concepts.find((c) => c.id === id);
}

export function listSignals(limit?: number) {
  const sorted = [...contentDatabase.signals].sort((a, b) =>
    b.date.localeCompare(a.date),
  );
  return limit ? sorted.slice(0, limit) : sorted;
}

export function listTimeline() {
  return contentDatabase.timeline;
}

export function listRelations() {
  return contentDatabase.relations;
}
