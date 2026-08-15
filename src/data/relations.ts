import type { Relation } from "@/domain/entities";

/**
 * Cross-module relation edges.
 * Graph visualization and related panels should prefer this store.
 */
export const relations: Relation[] = [
  // Human Systems neighborhood
  {
    id: "rel-hs-medicine",
    from: "concept-human-systems",
    to: "concept-medicine",
    type: "part-of",
  },
  {
    id: "rel-hs-ai",
    from: "concept-human-systems",
    to: "concept-ai",
    type: "related-to",
  },
  {
    id: "rel-hs-neuro",
    from: "concept-human-systems",
    to: "concept-neuroscience",
    type: "part-of",
  },
  {
    id: "rel-hs-biology",
    from: "concept-human-systems",
    to: "concept-biology",
    type: "informed-by",
  },
  {
    id: "rel-hs-philosophy",
    from: "concept-human-systems",
    to: "concept-philosophy",
    type: "informed-by",
  },
  {
    id: "rel-medicine-biology",
    from: "concept-medicine",
    to: "concept-biology",
    type: "related-to",
  },
  {
    id: "rel-ai-philosophy",
    from: "concept-ai",
    to: "concept-philosophy",
    type: "related-to",
  },

  // Cardiac physiology cluster
  {
    id: "rel-ap-sa",
    from: "concept-action-potential",
    to: "concept-sa-node",
    type: "related-to",
  },
  {
    id: "rel-sa-av",
    from: "concept-sa-node",
    to: "concept-av-node",
    type: "precedes",
  },
  {
    id: "rel-av-ecg",
    from: "concept-av-node",
    to: "concept-ecg-generation",
    type: "related-to",
  },
  {
    id: "rel-ap-ecg",
    from: "concept-action-potential",
    to: "concept-ecg-generation",
    type: "informed-by",
  },

  // Project ↔ research / concepts (explicit graph edges)
  {
    id: "rel-proj-cardiac-explores-ecg",
    from: "proj-ecg-simulator",
    to: "q-ecg-conduction",
    type: "explores",
  },
  {
    id: "rel-proj-cardiac-builds-ecg",
    from: "proj-ecg-simulator",
    to: "concept-ecg-generation",
    type: "builds-on",
  },
  {
    id: "rel-proj-reasoning-explores-q",
    from: "proj-clinical-reasoning-ai",
    to: "q-clinical-reasoning",
    type: "explores",
  },
  {
    id: "rel-proj-kos-related-hs",
    from: "proj-knowledge-os",
    to: "concept-human-systems",
    type: "exemplifies",
  },
  {
    id: "rel-proj-brief-related-kos",
    from: "proj-research-brief",
    to: "proj-knowledge-os",
    type: "related-to",
  },
  {
    id: "rel-proj-brief-exemplifies-hs",
    from: "proj-research-brief",
    to: "concept-human-systems",
    type: "exemplifies",
  },
  {
    id: "rel-proj-brief-builds-tech",
    from: "proj-research-brief",
    to: "concept-technology",
    type: "builds-on",
  },
];
