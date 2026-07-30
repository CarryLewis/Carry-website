import { activeQuestions } from "@/data/active-questions";
import { concepts, getConceptById } from "@/data/concepts";
import { intellectualFocus } from "@/data/intellectual-focus";
import {
  observatoryCopy,
  profile,
  siteChrome,
  systemLinks,
} from "@/data/profile";
import { getProjectBySlug, projects } from "@/data/projects";
import { relations } from "@/data/relations";
import { signals } from "@/data/signals";
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
 * Swap LocalMock for Notion/CMS/agent adapters without changing UI.
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
}

class LocalMockRepository implements ContentRepository {
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
    return [...intellectualFocus].sort((a, b) =>
      a.priority.localeCompare(b.priority),
    );
  }

  async listActiveQuestions() {
    return activeQuestions;
  }

  async listConcepts() {
    return concepts;
  }

  async getConcept(idOrSlug: string) {
    return (
      concepts.find((c) => c.id === idOrSlug || c.slug === idOrSlug) ?? null
    );
  }

  async listSignals(options?: { limit?: number }) {
    const sorted = [...signals].sort((a, b) => b.date.localeCompare(a.date));
    return options?.limit ? sorted.slice(0, options.limit) : sorted;
  }

  async listProjects(options?: { status?: Project["status"] }) {
    const list = options?.status
      ? projects.filter((p) => p.status === options.status)
      : projects;
    return list;
  }

  async getProject(slug: string) {
    return getProjectBySlug(slug) ?? null;
  }

  async getRelations(entityId?: EntityId) {
    if (!entityId) return relations;
    return relations.filter((r) => r.from === entityId || r.to === entityId);
  }

  async getNeighborhood(centerId: EntityId): Promise<KnowledgeGraphPreview> {
    const center = getConceptById(centerId);
    if (!center) {
      return { centerId, nodes: [], edges: [] };
    }

    const neighborIds = new Set<EntityId>([centerId, ...center.connectedNodeIds]);
    const neighborhoodRelations = relations.filter(
      (r) => neighborIds.has(r.from) && neighborIds.has(r.to),
    );

    const nodes = [...neighborIds]
      .map((id) => getConceptById(id))
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

export const contentRepository: ContentRepository = new LocalMockRepository();

export async function getObservatoryData() {
  const centerId = "concept-human-systems";

  const [
    person,
    chrome,
    copy,
    focus,
    questions,
    graph,
    latestSignals,
    links,
  ] = await Promise.all([
    contentRepository.getProfile(),
    contentRepository.getSiteChrome(),
    contentRepository.getObservatoryCopy(),
    contentRepository.listIntellectualFocus(),
    contentRepository.listActiveQuestions(),
    contentRepository.getNeighborhood(centerId),
    contentRepository.listSignals({ limit: 3 }),
    contentRepository.listSystemLinks(),
  ]);

  return {
    profile: person,
    siteChrome: chrome,
    copy,
    intellectualFocus: focus,
    activeQuestions: questions,
    knowledgeGraph: graph,
    signals: latestSignals,
    systemLinks: links,
  };
}

export async function getProjectsForStaticParams() {
  const list = await contentRepository.listProjects();
  return list.map((p) => ({ status: p.status, slug: p.slug }));
}

export async function getQuestionsForStaticParams() {
  const list = await contentRepository.listActiveQuestions();
  return list.map((q) => ({
    category: q.category,
    slug: q.slug,
  }));
}
