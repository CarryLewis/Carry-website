export type EntityId = string;
export type ISODate = string;

export type EntityStatus =
  | "active"
  | "dormant"
  | "archived"
  | "prototype"
  | "experiment";

export type Priority = "p0" | "p1" | "p2";

export type EntityBase = {
  id: EntityId;
  slug: string;
  title: string;
  summary: string;
  createdAt: ISODate;
  updatedAt: ISODate;
  status?: EntityStatus;
  tags?: string[];
};

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

export type Relation = {
  id: EntityId;
  from: EntityId;
  to: EntityId;
  type: RelationType;
  note?: string;
};

export type Reference = {
  id: EntityId;
  title: string;
  authors?: string[];
  year?: number;
  url?: string;
  doi?: string;
  kind: "paper" | "book" | "article" | "dataset" | "other";
};

export type ResearchCategory =
  | "biomedical-systems"
  | "computational-medicine"
  | "neuroscience"
  | "immunology"
  | "future-medicine";

export type ProjectStatus = "active" | "prototype" | "experiment" | "archive";

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

/** Intellectual Focus — current major areas of exploration */
export type IntellectualFocus = {
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
};

/** Active Questions — current research questions */
export type ActiveQuestion = {
  id: EntityId;
  slug: string;
  question: string;
  category: ResearchCategory;
  relatedConceptIds: EntityId[];
  relatedProjectIds: EntityId[];
  createdAt: ISODate;
  status: EntityStatus;
  href?: string;
};

/** Connected Concepts — knowledge nodes */
export type Concept = {
  id: EntityId;
  slug: string;
  name: string;
  category: ConceptCategory;
  summary: string;
  references: Reference[];
  connectedNodeIds: EntityId[];
  /** Optional layout hints for static graph preview (0–1). Not semantic. */
  layout?: { x: number; y: number; weight?: number };
};

/** Information Radar — external signals */
export type Signal = {
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
};

/** Projects — things being built */
export type Project = {
  id: EntityId;
  slug: string;
  title: string;
  problem: string;
  architecture: string;
  status: ProjectStatus;
  technology: string[];
  relatedResearchIds: EntityId[];
  relatedConceptIds: EntityId[];
  relatedSignalIds?: EntityId[];
  summary: string;
  designPhilosophy?: string;
  implementation?: string;
  reflection?: string;
  /** Interactive demo (prefer same-origin path under /public). */
  demoUrl?: string;
  /** Source repository. */
  repoUrl?: string;
  createdAt: ISODate;
  updatedAt: ISODate;
};

export type PersonProfile = {
  kind: "profile";
  name: string;
  role: string;
  thesis: string;
  subtitle: string;
  focusAreas: string[];
};

export type NavItem = {
  href: string;
  label: string;
};

export type SiteChrome = {
  brandName: string;
  productName: string;
  tagline: string;
  metaDescription: string;
  nav: NavItem[];
  footerLinks: NavItem[];
  versionLabel: string;
};

export type SystemLink = {
  label: string;
  href: string;
  description: string;
};

export type SectionCopy = {
  label: string;
  title: string;
  description: string;
};

export type ObservatoryCopy = {
  heroEyebrow: string;
  heroPrimaryCta: { label: string; href: string };
  heroSecondaryCta: { label: string; href: string };
  heroFigureCaption: string;
  exploration: SectionCopy;
  questions: SectionCopy;
  knowledge: SectionCopy & { figureCaption: string; ctaLabel: string };
  signals: SectionCopy & { ctaLabel: string };
  closing: SectionCopy;
};

/** Derived graph view — never the source of truth for concepts */
export type GraphNodeView = {
  id: EntityId;
  label: string;
  category: ConceptCategory;
  weight: number;
  x: number;
  y: number;
};

export type GraphEdgeView = {
  id: EntityId;
  from: EntityId;
  to: EntityId;
  type: RelationType;
};

export type KnowledgeGraphPreview = {
  centerId: EntityId;
  nodes: GraphNodeView[];
  edges: GraphEdgeView[];
};
