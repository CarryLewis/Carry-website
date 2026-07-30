import { explorations } from "@/data/exploration";
import { knowledgeGraphPreview } from "@/data/knowledge-graph";
import { profile, systemLinks } from "@/data/profile";
import { researchThreads } from "@/data/research";
import { signals } from "@/data/signals";
import type {
  Exploration,
  KnowledgeGraphPreview,
  PersonProfile,
  ResearchThread,
  Signal,
  SystemLink,
} from "@/domain/entities";

/**
 * Content access seam for Observatory (and later the full lab).
 * Swap LocalJson / Notion / CMS adapters behind this interface.
 */
export interface ContentRepository {
  getProfile(): Promise<PersonProfile>;
  listExplorations(): Promise<Exploration[]>;
  listResearchThreads(): Promise<ResearchThread[]>;
  getKnowledgeGraphPreview(): Promise<KnowledgeGraphPreview>;
  listSignals(options?: { limit?: number }): Promise<Signal[]>;
  listSystemLinks(): Promise<SystemLink[]>;
}

class LocalMockRepository implements ContentRepository {
  async getProfile() {
    return profile;
  }

  async listExplorations() {
    return explorations;
  }

  async listResearchThreads() {
    return researchThreads;
  }

  async getKnowledgeGraphPreview() {
    return knowledgeGraphPreview;
  }

  async listSignals(options?: { limit?: number }) {
    const sorted = [...signals].sort((a, b) =>
      b.observedAt.localeCompare(a.observedAt),
    );
    return options?.limit ? sorted.slice(0, options.limit) : sorted;
  }

  async listSystemLinks() {
    return systemLinks;
  }
}

/** Active repository — replace with Notion/CMS factory later. */
export const contentRepository: ContentRepository = new LocalMockRepository();

export async function getObservatoryData() {
  const [
    person,
    currentExplorations,
    threads,
    graph,
    latestSignals,
    links,
  ] = await Promise.all([
    contentRepository.getProfile(),
    contentRepository.listExplorations(),
    contentRepository.listResearchThreads(),
    contentRepository.getKnowledgeGraphPreview(),
    contentRepository.listSignals({ limit: 3 }),
    contentRepository.listSystemLinks(),
  ]);

  return {
    profile: person,
    explorations: currentExplorations,
    researchThreads: threads,
    knowledgeGraph: graph,
    signals: latestSignals,
    systemLinks: links,
  };
}
