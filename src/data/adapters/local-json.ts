/**
 * LocalJSON adapter — ContentRepository backed by /content JSON (Content OS).
 * Profile / site chrome remain in src/data/profile until moved under content/meta.
 */
import {
  getConceptById as contentGetConceptById,
  getProjectBySlug as contentGetProjectBySlug,
  listConcepts as contentListConcepts,
  listFocus,
  listProjects as contentListProjects,
  listQuestions,
  listRelations as contentListRelations,
  listSignals as contentListSignals,
} from "@/content/database";
import {
  observatoryCopy,
  profile,
  siteChrome,
  systemLinks,
} from "@/data/profile";
import type { ContentRepository } from "@/data/repository";
import type {
  ActiveQuestion,
  Concept,
  EntityId,
  IntellectualFocus,
  KnowledgeGraphPreview,
  Project,
  Relation,
  Signal,
} from "@/domain/entities";

function asFocus(records: ReturnType<typeof listFocus>): IntellectualFocus[] {
  return records as IntellectualFocus[];
}

function asQuestions(
  records: ReturnType<typeof listQuestions>,
): ActiveQuestion[] {
  return records as ActiveQuestion[];
}

function asConcepts(records: ReturnType<typeof contentListConcepts>): Concept[] {
  return records as Concept[];
}

function asProjects(
  records: ReturnType<typeof contentListProjects>,
): Project[] {
  return records as Project[];
}

function asSignals(records: ReturnType<typeof contentListSignals>): Signal[] {
  return records as Signal[];
}

function asRelations(
  records: ReturnType<typeof contentListRelations>,
): Relation[] {
  return records as Relation[];
}

export class LocalJsonRepository implements ContentRepository {
  async getProfile() {
    return profile;
  }

  async getSiteChrome() {
    return siteChrome;
  }

  async getObservatoryCopy() {
    return observatoryCopy;
  }

  async listSystemLinks() {
    return systemLinks;
  }

  async listIntellectualFocus() {
    return asFocus(listFocus());
  }

  async listActiveQuestions() {
    return asQuestions(listQuestions());
  }

  async listConcepts() {
    return asConcepts(contentListConcepts());
  }

  async getConcept(idOrSlug: string) {
    const concepts = contentListConcepts();
    return (
      (concepts.find((c) => c.id === idOrSlug || c.slug === idOrSlug) as
        | Concept
        | undefined) ?? null
    );
  }

  async listSignals(options?: { limit?: number }) {
    return asSignals(contentListSignals(options?.limit));
  }

  async listProjects(options?: { status?: Project["status"] }) {
    return asProjects(contentListProjects(options?.status));
  }

  async getProject(slug: string) {
    const project = contentGetProjectBySlug(slug);
    return (project as Project | undefined) ?? null;
  }

  async getRelations(entityId?: EntityId) {
    const relations = asRelations(contentListRelations());
    if (!entityId) return relations;
    return relations.filter((r) => r.from === entityId || r.to === entityId);
  }

  async getNeighborhood(centerId: EntityId): Promise<KnowledgeGraphPreview> {
    const center = contentGetConceptById(centerId) as Concept | undefined;
    if (!center) {
      return { centerId, nodes: [], edges: [] };
    }

    const relations = asRelations(contentListRelations());
    const neighborIds = new Set<EntityId>([
      centerId,
      ...center.connectedNodeIds,
    ]);
    const neighborhoodRelations = relations.filter(
      (r) => neighborIds.has(r.from) && neighborIds.has(r.to),
    );

    const nodes = [...neighborIds]
      .map((id) => contentGetConceptById(id) as Concept | undefined)
      .filter((c): c is Concept => Boolean(c))
      .map((c) => ({
        id: c.id,
        label: c.name,
        category: c.category,
        weight: c.layout?.weight ?? (c.id === centerId ? 1 : 0.7),
        x: c.layout?.x ?? 0.5,
        y: c.layout?.y ?? 0.5,
      }));

    return {
      centerId,
      nodes,
      edges: neighborhoodRelations.map((r) => ({
        id: r.id,
        from: r.from,
        to: r.to,
        type: r.type,
      })),
    };
  }
}
