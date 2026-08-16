/**
 * Content Database — single source of truth loader.
 *
 * Reads structured JSON from /content/{collection}/*.json
 * UI must not hardcode entity content; consume this layer (or ContentRepository).
 *
 * NOTE: UI wiring is intentionally deferred. This module is ready for
 * repository adapters to switch over without component changes.
 */

import type {
  ActiveQuestionRecord,
  ConceptRecord,
  ContentDatabase,
  IntellectualFocusRecord,
  ProjectRecord,
  RelationsCollection,
  SignalRecord,
  TimelineEventRecord,
} from "@/content/types";
import { validateRelations } from "@/content/relations";

import focusEcg from "../../content/focus/ecg-simulator.json";
import focusReasoning from "../../content/focus/clinical-reasoning-ai.json";
import focusKos from "../../content/focus/personal-knowledge-os.json";
import focusLab from "../../content/focus/html-design-lab.json";

import questionEcg from "../../content/questions/ecg-conduction.json";
import questionReasoning from "../../content/questions/clinical-reasoning-ai.json";
import questionBio from "../../content/questions/mechanism-to-model.json";

import projectEcg from "../../content/projects/ecg-simulator.json";
import projectReasoning from "../../content/projects/clinical-reasoning-ai.json";
import projectKos from "../../content/projects/personal-knowledge-os.json";
import projectBrief from "../../content/projects/research-brief.json";
import projectLab from "../../content/projects/html-design-lab.json";

import conceptHumanSystems from "../../content/concepts/human-systems.json";
import conceptMedicine from "../../content/concepts/medicine.json";
import conceptAi from "../../content/concepts/ai.json";
import conceptNeuroscience from "../../content/concepts/neuroscience.json";
import conceptBiology from "../../content/concepts/biology.json";
import conceptPhilosophy from "../../content/concepts/philosophy.json";
import conceptTechnology from "../../content/concepts/technology.json";
import conceptActionPotential from "../../content/concepts/action-potential.json";
import conceptSaNode from "../../content/concepts/sa-node.json";
import conceptAvNode from "../../content/concepts/av-node.json";
import conceptEcgGeneration from "../../content/concepts/ecg-generation.json";

import signalTwins from "../../content/signals/cardiac-digital-twins.json";
import signalTutors from "../../content/signals/agentic-clinical-tutors.json";
import signalGraphs from "../../content/signals/local-knowledge-graphs.json";

import timelineKos from "../../content/timeline/knowledge-os-initiated.json";
import timelineBio from "../../content/timeline/mechanism-to-model-opened.json";
import timelineEcg from "../../content/timeline/ecg-simulator-started.json";
import timelineReasoning from "../../content/timeline/clinical-reasoning-ai-started.json";
import timelineObservatory from "../../content/timeline/observatory-launched.json";
import timelineBrief from "../../content/timeline/research-brief-listed.json";
import timelineLab from "../../content/timeline/html-design-lab-listed.json";

import relationsCollection from "../../content/relations/edges.json";

function stripSchema<T extends Record<string, unknown>>(record: T): Omit<T, "$schema"> {
  const { $schema: _schema, ...rest } = record;
  return rest;
}

const focus = [
  stripSchema(focusEcg),
  stripSchema(focusReasoning),
  stripSchema(focusKos),
  stripSchema(focusLab),
] as IntellectualFocusRecord[];

const questions = [
  stripSchema(questionEcg),
  stripSchema(questionReasoning),
  stripSchema(questionBio),
] as ActiveQuestionRecord[];

const projects = [
  stripSchema(projectEcg),
  stripSchema(projectReasoning),
  stripSchema(projectKos),
  stripSchema(projectBrief),
  stripSchema(projectLab),
] as ProjectRecord[];

const concepts = [
  stripSchema(conceptHumanSystems),
  stripSchema(conceptMedicine),
  stripSchema(conceptAi),
  stripSchema(conceptNeuroscience),
  stripSchema(conceptBiology),
  stripSchema(conceptPhilosophy),
  stripSchema(conceptTechnology),
  stripSchema(conceptActionPotential),
  stripSchema(conceptSaNode),
  stripSchema(conceptAvNode),
  stripSchema(conceptEcgGeneration),
] as ConceptRecord[];

const signals = [
  stripSchema(signalTwins),
  stripSchema(signalTutors),
  stripSchema(signalGraphs),
] as SignalRecord[];

const timeline = [
  stripSchema(timelineKos),
  stripSchema(timelineBio),
  stripSchema(timelineEcg),
  stripSchema(timelineReasoning),
  stripSchema(timelineObservatory),
  stripSchema(timelineBrief),
  stripSchema(timelineLab),
].sort((a, b) =>
  a.occurredAt.localeCompare(b.occurredAt),
) as TimelineEventRecord[];

const relationsBag = relationsCollection as RelationsCollection;

/** Immutable content database snapshot (build-time loaded). */
export const contentDatabase: ContentDatabase = {
  focus,
  questions,
  projects,
  concepts,
  signals,
  timeline,
  relations: relationsBag.edges,
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
