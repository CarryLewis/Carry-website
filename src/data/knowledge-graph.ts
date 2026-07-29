import type { KnowledgeGraphPreview } from "@/domain/entities";

/**
 * Placeholder neighborhood for Knowledge Observatory preview.
 * Positions are normalized (0–1) for SVG layout.
 * Future: replace with graph DB / interactive viz adapter.
 */
export const knowledgeGraphPreview: KnowledgeGraphPreview = {
  centerId: "node-human-systems",
  nodes: [
    {
      id: "node-human-systems",
      label: "Human Systems",
      domain: "human-systems",
      weight: 1,
      x: 0.5,
      y: 0.5,
    },
    {
      id: "node-medicine",
      label: "Medicine",
      domain: "medicine",
      weight: 0.85,
      x: 0.22,
      y: 0.28,
    },
    {
      id: "node-ai",
      label: "AI",
      domain: "ai",
      weight: 0.85,
      x: 0.78,
      y: 0.28,
    },
    {
      id: "node-neuroscience",
      label: "Neuroscience",
      domain: "neuroscience",
      weight: 0.7,
      x: 0.18,
      y: 0.72,
    },
    {
      id: "node-biology",
      label: "Biology",
      domain: "biology",
      weight: 0.75,
      x: 0.5,
      y: 0.84,
    },
    {
      id: "node-philosophy",
      label: "Philosophy",
      domain: "philosophy",
      weight: 0.65,
      x: 0.82,
      y: 0.72,
    },
  ],
  edges: [
    {
      id: "e1",
      from: "node-human-systems",
      to: "node-medicine",
      type: "part-of",
    },
    {
      id: "e2",
      from: "node-human-systems",
      to: "node-ai",
      type: "related-to",
    },
    {
      id: "e3",
      from: "node-human-systems",
      to: "node-neuroscience",
      type: "part-of",
    },
    {
      id: "e4",
      from: "node-human-systems",
      to: "node-biology",
      type: "informed-by",
    },
    {
      id: "e5",
      from: "node-human-systems",
      to: "node-philosophy",
      type: "informed-by",
    },
    {
      id: "e6",
      from: "node-medicine",
      to: "node-biology",
      type: "related-to",
    },
    {
      id: "e7",
      from: "node-ai",
      to: "node-philosophy",
      type: "related-to",
    },
  ],
};
