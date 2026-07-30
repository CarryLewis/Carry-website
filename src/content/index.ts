/**
 * Content Database Layer public API.
 * UI should eventually consume only this module (via ContentRepository).
 */

export type * from "@/content/types";
export {
  contentDatabase,
  getContentDatabase,
  listFocus,
  listQuestions,
  listProjects,
  getProjectById,
  getProjectBySlug,
  listConcepts,
  getConceptById,
  listSignals,
  listTimeline,
  listRelations,
} from "@/content/database";
export {
  getRelationsFor,
  getOutgoing,
  getIncoming,
  getNeighborIds,
  findPath,
  validateRelations,
} from "@/content/relations";
