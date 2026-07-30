import type {
  ActiveQuestion,
  Concept,
  EntityId,
  IntellectualFocus,
  KnowledgeGraphPreview,
  ObservatoryCopy,
  PersonProfile,
  Project,
  Relation,
  Signal,
  SiteChrome,
  SystemLink,
} from "@/domain/entities";

/**
 * ContentRepository — single access seam for all Content OS modules.
 * Swap LocalJSON / Notion sync / CMS adapters without changing UI.
 */
export interface ContentRepository {
  getProfile(): Promise<PersonProfile>;
  getSiteChrome(): Promise<SiteChrome>;
  getObservatoryCopy(): Promise<ObservatoryCopy>;
  listSystemLinks(): Promise<SystemLink[]>;

  listIntellectualFocus(): Promise<IntellectualFocus[]>;
  listActiveQuestions(): Promise<ActiveQuestion[]>;
  listConcepts(): Promise<Concept[]>;
  getConcept(idOrSlug: string): Promise<Concept | null>;

  listSignals(options?: { limit?: number }): Promise<Signal[]>;
  listProjects(options?: { status?: Project["status"] }): Promise<Project[]>;
  getProject(slug: string): Promise<Project | null>;

  getRelations(entityId?: EntityId): Promise<Relation[]>;
  getNeighborhood(
    centerId: EntityId,
    options?: { depth?: number },
  ): Promise<KnowledgeGraphPreview>;

  listMedicalCollections(): Promise<
    Array<import("@/content/medical").MedicalCollectionMeta & { count: number }>
  >;
  listMedicalRecords(
    collectionId?: import("@/content/medical").MedicalCollectionId,
  ): Promise<import("@/content/medical").MedicalRecordView[]>;
  getMedicalRecord(
    collectionId: import("@/content/medical").MedicalCollectionId,
    slug: string,
  ): Promise<import("@/content/medical").MedicalRecordView | null>;
}
