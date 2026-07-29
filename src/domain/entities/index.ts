export type EntityId = string;
export type ISODate = string;

export type EntityStatus =
  | "active"
  | "dormant"
  | "archived"
  | "prototype"
  | "experiment";

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
  | "precedes";

export type Relation = {
  id: EntityId;
  from: EntityId;
  to: EntityId;
  type: RelationType;
  note?: string;
};

export type ResearchCategory =
  | "biomedical-systems"
  | "computational-medicine"
  | "neuroscience"
  | "immunology"
  | "future-medicine";

export type ResearchTopic = EntityBase & {
  kind: "research";
  category: ResearchCategory;
  question: string;
};

export type ProjectStatus = "active" | "prototype" | "experiment" | "archive";

export type Exploration = EntityBase & {
  kind: "exploration";
  domain: string;
  fields: string[];
  projectStatus: ProjectStatus;
  href: string;
};

export type ResearchThread = {
  id: EntityId;
  question: string;
  category: ResearchCategory;
  href: string;
  status: EntityStatus;
};

export type SignalCategory =
  | "medical-intelligence"
  | "ai-intelligence"
  | "technology"
  | "society"
  | "personal-learning";

export type SignalImportance = "low" | "medium" | "high";

export type Signal = EntityBase & {
  kind: "signal";
  category: SignalCategory;
  source?: string;
  sourceUrl?: string;
  observedAt: ISODate;
  importance: SignalImportance;
};

export type KnowledgeDomain =
  | "medicine"
  | "ai"
  | "biology"
  | "philosophy"
  | "technology"
  | "neuroscience"
  | "human-systems";

export type GraphNode = {
  id: EntityId;
  label: string;
  domain: KnowledgeDomain;
  /** 0–1 relative weight for layout emphasis */
  weight: number;
  /** Normalized position hints for static preview (0–1) */
  x: number;
  y: number;
};

export type GraphEdge = {
  id: EntityId;
  from: EntityId;
  to: EntityId;
  type: RelationType;
};

export type KnowledgeGraphPreview = {
  centerId: EntityId;
  nodes: GraphNode[];
  edges: GraphEdge[];
};

export type PersonProfile = {
  kind: "profile";
  name: string;
  role: string;
  thesis: string;
  subtitle: string;
  focusAreas: string[];
};

export type SystemLink = {
  label: string;
  href: string;
  description: string;
};
