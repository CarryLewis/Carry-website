import { LocalJsonRepository } from "@/data/adapters/local-json";
import type { ContentRepository } from "@/data/repository";

export type { ContentRepository } from "@/data/repository";

/**
 * Active content repository.
 * Default: LocalJSON (/content via src/content/database.ts).
 * Notion data enters by build-time sync (`npm run sync:notion`) into /content.
 */
export const contentRepository: ContentRepository = new LocalJsonRepository();

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
