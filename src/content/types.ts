/**
 * Content Database Layer — TypeScript interfaces.
 * Mirror of JSON schemas in /content/schemas.
 * This is the typed contract for the single source of truth.
 */

export type EntityId = string;
export type ISODate = string;

export type EntityStatus =
  | "active"
  | "dormant"
  | "archived"
  | "prototype"
  | "experiment";

export type ProjectStatus = "active" | "prototype" | "experiment" | "archive";
export type Priority = "p0" | "p1" | "p2";

export type RelationType =
  | "related-to"
  | "informed-by"
  | "builds-on"
  | "contradicts"
  | "exemplifies"
  | "references"
  | "part-of"
  | "precedes"
  | "explores"
  | "answers";

export type ResearchCategory =
  | "biomedical-systems"
  | "computational-medicine"
  | "neuroscience"
  | "immunology"
  | "future-medicine";

export type ConceptCategory =
  | "medicine"
  | "ai"
  | "biology"
  | "philosophy"
  | "technology"
  | "neuroscience"
  | "human-systems";

export type SignalCategory =
  | "medical-intelligence"
  | "ai-intelligence"
  | "technology"
  | "society"
  | "personal-learning";

export type SignalImportance = "low" | "medium" | "high";

export type TimelineKind =
  | "milestone"
  | "project-start"
  | "question-opened"
  | "publication"
  | "experiment"
  | "reflection";

export type ReferenceKind = "paper" | "book" | "article" | "dataset" | "other";

export interface Reference {
  id: EntityId;
  title: string;
  authors?: string[];
  year?: number;
  url?: string;
  doi?: string;
  kind: ReferenceKind;
}

export interface LayoutHint {
  x: number;
  y: number;
  weight?: number;
}

/** Intellectual Focus */
export interface IntellectualFocusRecord {
  id: EntityId;
  slug: string;
  title: string;
  description: string;
  domain: string;
  status: EntityStatus | ProjectStatus;
  priority: Priority;
  relatedProjectIds: EntityId[];
  relatedQuestionIds?: EntityId[];
  relatedConceptIds?: EntityId[];
  fields?: string[];
  createdAt: ISODate;
  updatedAt: ISODate;
}

/** Active Questions */
export interface ActiveQuestionRecord {
  id: EntityId;
  slug: string;
  question: string;
  category: ResearchCategory;
  relatedConceptIds: EntityId[];
  relatedProjectIds: EntityId[];
  createdAt: ISODate;
  status: EntityStatus;
  href?: string;
}

/** Projects */
export interface ProjectRecord {
  id: EntityId;
  slug: string;
  title: string;
  summary: string;
  problem: string;
  architecture: string;
  status: ProjectStatus;
  technology: string[];
  relatedResearchIds: EntityId[];
  relatedConceptIds: EntityId[];
  relatedSignalIds?: EntityId[];
  relatedFocusIds?: EntityId[];
  designPhilosophy?: string;
  implementation?: string;
  reflection?: string;
  createdAt: ISODate;
  updatedAt: ISODate;
}

/** Connected Concepts */
export interface ConceptRecord {
  id: EntityId;
  slug: string;
  name: string;
  category: ConceptCategory;
  summary: string;
  references: Reference[];
  connectedNodeIds: EntityId[];
  layout?: LayoutHint;
}

/** Information Radar */
export interface SignalRecord {
  id: EntityId;
  slug: string;
  title: string;
  summary: string;
  category: SignalCategory;
  source: string;
  sourceUrl?: string;
  importance: SignalImportance;
  date: ISODate;
  relatedTopicIds: EntityId[];
  createdAt: ISODate;
  updatedAt: ISODate;
}

/** Timeline / Archive memory */
export interface TimelineEventRecord {
  id: EntityId;
  slug: string;
  title: string;
  summary: string;
  kind: TimelineKind;
  occurredAt: ISODate;
  relatedEntityIds: EntityId[];
  body?: string;
}

/** Relationship edge */
export interface RelationRecord {
  id: EntityId;
  from: EntityId;
  to: EntityId;
  type: RelationType;
  note?: string;
}

export interface RelationsCollection {
  version: number;
  edges: RelationRecord[];
}

export type ContentCollectionName =
  | "focus"
  | "questions"
  | "projects"
  | "concepts"
  | "signals"
  | "timeline"
  | "relations"
  | "notion-inbox";

/** Synced Notion inbox row (medical basement vault). */
export interface MedicalInboxSource {
  notionPageId: string;
  notionDatabaseId: string;
  notionDatabaseTitle: string;
  notionUrl: string | null;
}

export interface MedicalInboxRecord {
  id: EntityId;
  slug: string;
  title: string;
  source: MedicalInboxSource;
  properties: Record<string, unknown>;
  createdAt: ISODate;
  updatedAt: ISODate;
}

/** Full in-memory content database snapshot */
export interface ContentDatabase {
  focus: IntellectualFocusRecord[];
  questions: ActiveQuestionRecord[];
  projects: ProjectRecord[];
  concepts: ConceptRecord[];
  signals: SignalRecord[];
  timeline: TimelineEventRecord[];
  relations: RelationRecord[];
  inbox: MedicalInboxRecord[];
}

export type ContentEntity =
  | IntellectualFocusRecord
  | ActiveQuestionRecord
  | ProjectRecord
  | ConceptRecord
  | SignalRecord
  | TimelineEventRecord
  | MedicalInboxRecord;
