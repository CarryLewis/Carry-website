import type {
  EntityId,
  PracticeField,
  PracticeGraph,
  PracticeGraphNode,
} from "@/domain/entities";

const ORIGIN = { x: 0.5, y: 0.5 };
const RING = 0.34;
const ORIGIN_ID = "origin-practice";

function angleFromOrigin(x: number, y: number) {
  return Math.atan2(y - ORIGIN.y, x - ORIGIN.x);
}

function normalizeAngle(angle: number) {
  while (angle <= -Math.PI) angle += Math.PI * 2;
  while (angle > Math.PI) angle -= Math.PI * 2;
  return angle;
}

function pointOnRing(angle: number) {
  return {
    x: ORIGIN.x + RING * Math.cos(angle),
    y: ORIGIN.y + RING * Math.sin(angle),
  };
}

function approx(a: number, b: number) {
  return Math.abs(normalizeAngle(a - b)) < 1e-6;
}

/**
 * Place the next node in the largest angular gap on the origin ring.
 * If `preferNear` is set, use the larger of the two gaps adjacent to that point.
 */
export function nextRingSlot(
  placed: Array<{ x: number; y: number }>,
  preferNear?: { x: number; y: number },
) {
  if (placed.length === 0) {
    return pointOnRing(-Math.PI / 2);
  }

  const angles = placed
    .map((point) => angleFromOrigin(point.x, point.y))
    .sort((a, b) => a - b);

  const gaps = angles.map((start, i) => {
    const end = i === angles.length - 1 ? angles[0] + Math.PI * 2 : angles[i + 1];
    const size = end - start;
    return { start, end, size, mid: start + size / 2 };
  });

  let candidates = gaps;
  if (preferNear) {
    const parentAngle = angleFromOrigin(preferNear.x, preferNear.y);
    const adjacent = gaps.filter(
      (gap) =>
        approx(gap.start, parentAngle) ||
        approx(normalizeAngle(gap.end), parentAngle),
    );
    if (adjacent.length > 0) candidates = adjacent;
  }

  const best = [...candidates].sort((a, b) => b.size - a.size)[0];
  return pointOnRing(normalizeAngle(best.mid));
}

function layoutFields(fields: PracticeField[]): PracticeGraphNode[] {
  const placed: PracticeGraphNode[] = [];
  const byId: Record<string, PracticeGraphNode> = {};

  const withLayout = fields.filter((field) => field.layout);
  const withoutLayout = fields.filter((field) => !field.layout);

  for (const field of withLayout) {
    const node = toNode(field, field.layout!);
    placed.push(node);
    byId[field.id] = node;
  }

  for (const field of withoutLayout) {
    const anchor = field.connectedFieldIds
      .map((id) => byId[id])
      .find(Boolean);
    const slot = nextRingSlot(placed, anchor);
    const node = toNode(field, slot);
    placed.push(node);
    byId[field.id] = node;
  }

  return fields.map((field) => byId[field.id]);
}

function toNode(
  field: PracticeField,
  point: { x: number; y: number },
): PracticeGraphNode {
  return {
    id: field.id,
    kind: "field",
    label: field.label,
    slug: field.slug,
    href: `/knowledge/${field.slug}/`,
    summary: field.summary,
    status: field.status,
    x: point.x,
    y: point.y,
  };
}

function meshKey(a: EntityId, b: EntityId) {
  return [a, b].sort().join("::");
}

/**
 * Build the Observatory derivation graph from practice-field records.
 * Origin spokes + optional field-to-field mesh. Layout is data-driven.
 */
export function buildPracticeGraph(fields: PracticeField[]): PracticeGraph {
  const ordered = [
    ...fields.filter((field) => field.status === "active"),
    ...fields.filter((field) => field.status === "emerging"),
  ];
  const fieldNodes = layoutFields(ordered);

  const deriveEdges = fieldNodes.map((node) => ({
    id: `edge-${ORIGIN_ID}-${node.id}`,
    from: ORIGIN_ID,
    to: node.id,
    kind: "derive" as const,
  }));

  const meshSeen = new Set<string>();
  const fieldIds = new Set(fields.map((field) => field.id));
  const meshEdges = [];

  for (const field of ordered) {
    for (const targetId of field.connectedFieldIds) {
      if (!fieldIds.has(targetId) || targetId === field.id) continue;
      const key = meshKey(field.id, targetId);
      if (meshSeen.has(key)) continue;
      meshSeen.add(key);
      meshEdges.push({
        id: `mesh-${key}`,
        from: field.id,
        to: targetId,
        kind: "mesh" as const,
      });
    }
  }

  return {
    originId: ORIGIN_ID,
    nodes: [
      {
        id: ORIGIN_ID,
        kind: "origin",
        label: null,
        x: ORIGIN.x,
        y: ORIGIN.y,
      },
      ...fieldNodes,
    ],
    edges: [...deriveEdges, ...meshEdges],
  };
}
