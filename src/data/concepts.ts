import type { Concept } from "@/domain/entities";

/**
 * Connected Concepts — knowledge nodes.
 * Graph preview is derived from this module + relations.
 */
export const concepts: Concept[] = [
  {
    id: "concept-human-systems",
    slug: "human-systems",
    name: "Human Systems",
    category: "human-systems",
    summary:
      "Integrated view of physiological, cognitive, and social systems that constitute human complexity.",
    references: [],
    connectedNodeIds: [
      "concept-medicine",
      "concept-ai",
      "concept-neuroscience",
      "concept-biology",
      "concept-philosophy",
    ],
    layout: { x: 0.5, y: 0.5, weight: 1 },
  },
  {
    id: "concept-medicine",
    slug: "medicine",
    name: "Medicine",
    category: "medicine",
    summary: "Clinical science and biomedical practice as systems of diagnosis and intervention.",
    references: [],
    connectedNodeIds: [
      "concept-human-systems",
      "concept-biology",
      "concept-ecg-generation",
    ],
    layout: { x: 0.22, y: 0.28, weight: 0.85 },
  },
  {
    id: "concept-ai",
    slug: "ai",
    name: "AI",
    category: "ai",
    summary: "Computational intelligence systems, agents, and representations of reasoning.",
    references: [],
    connectedNodeIds: [
      "concept-human-systems",
      "concept-philosophy",
      "concept-technology",
    ],
    layout: { x: 0.78, y: 0.28, weight: 0.85 },
  },
  {
    id: "concept-neuroscience",
    slug: "neuroscience",
    name: "Neuroscience",
    category: "neuroscience",
    summary: "Neural mechanisms of information processing and behavior.",
    references: [],
    connectedNodeIds: ["concept-human-systems", "concept-biology"],
    layout: { x: 0.18, y: 0.72, weight: 0.7 },
  },
  {
    id: "concept-biology",
    slug: "biology",
    name: "Biology",
    category: "biology",
    summary: "Living mechanisms across molecular, cellular, and organism scales.",
    references: [],
    connectedNodeIds: [
      "concept-human-systems",
      "concept-medicine",
      "concept-action-potential",
    ],
    layout: { x: 0.5, y: 0.84, weight: 0.75 },
  },
  {
    id: "concept-philosophy",
    slug: "philosophy",
    name: "Philosophy",
    category: "philosophy",
    summary: "Epistemology and systems thinking for interpreting scientific models.",
    references: [],
    connectedNodeIds: ["concept-human-systems", "concept-ai"],
    layout: { x: 0.82, y: 0.72, weight: 0.65 },
  },
  {
    id: "concept-technology",
    slug: "technology",
    name: "Technology",
    category: "technology",
    summary: "Tools and infrastructures that amplify research and knowledge work.",
    references: [],
    connectedNodeIds: ["concept-ai", "concept-human-systems"],
    layout: { x: 0.88, y: 0.48, weight: 0.6 },
  },
  {
    id: "concept-action-potential",
    slug: "action-potential",
    name: "Action potential",
    category: "biology",
    summary: "Rapid membrane voltage change that propagates electrical signals in excitable cells.",
    references: [],
    connectedNodeIds: [
      "concept-sa-node",
      "concept-av-node",
      "concept-ecg-generation",
      "concept-biology",
    ],
  },
  {
    id: "concept-sa-node",
    slug: "sa-node",
    name: "SA node",
    category: "medicine",
    summary: "Primary pacemaker of the heart initiating atrial depolarization.",
    references: [],
    connectedNodeIds: ["concept-av-node", "concept-action-potential", "concept-ecg-generation"],
  },
  {
    id: "concept-av-node",
    slug: "av-node",
    name: "AV node",
    category: "medicine",
    summary: "Conduction node delaying impulse transmission from atria to ventricles.",
    references: [],
    connectedNodeIds: ["concept-sa-node", "concept-ecg-generation", "concept-action-potential"],
  },
  {
    id: "concept-ecg-generation",
    slug: "ecg-generation",
    name: "ECG generation",
    category: "medicine",
    summary:
      "How myocardial depolarization and repolarization project onto body-surface potentials.",
    references: [],
    connectedNodeIds: [
      "concept-action-potential",
      "concept-sa-node",
      "concept-av-node",
      "concept-medicine",
    ],
  },
];

export function getConceptById(id: string) {
  return concepts.find((c) => c.id === id);
}
