import type {
  ContentDatabase,
  EntityId,
  RelationRecord,
  RelationType,
} from "@/content/types";

/**
 * Relationship system — query helpers over the global edge store.
 * Prefer these helpers over ad-hoc string matching in UI.
 */

export function getRelationsFor(
  db: ContentDatabase,
  entityId: EntityId,
): RelationRecord[] {
  return db.relations.filter((e) => e.from === entityId || e.to === entityId);
}

export function getOutgoing(
  db: ContentDatabase,
  entityId: EntityId,
  type?: RelationType,
): RelationRecord[] {
  return db.relations.filter(
    (e) => e.from === entityId && (type ? e.type === type : true),
  );
}

export function getIncoming(
  db: ContentDatabase,
  entityId: EntityId,
  type?: RelationType,
): RelationRecord[] {
  return db.relations.filter(
    (e) => e.to === entityId && (type ? e.type === type : true),
  );
}

export function getNeighborIds(
  db: ContentDatabase,
  entityId: EntityId,
): EntityId[] {
  const ids = new Set<EntityId>();
  for (const edge of getRelationsFor(db, entityId)) {
    ids.add(edge.from === entityId ? edge.to : edge.from);
  }
  return [...ids];
}

export function findPath(
  db: ContentDatabase,
  fromId: EntityId,
  toId: EntityId,
  maxDepth = 4,
): EntityId[] | null {
  if (fromId === toId) return [fromId];

  const queue: Array<{ id: EntityId; path: EntityId[] }> = [
    { id: fromId, path: [fromId] },
  ];
  const visited = new Set<EntityId>([fromId]);

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) break;
    if (current.path.length > maxDepth) continue;

    for (const next of getNeighborIds(db, current.id)) {
      if (visited.has(next)) continue;
      const path = [...current.path, next];
      if (next === toId) return path;
      visited.add(next);
      queue.push({ id: next, path });
    }
  }

  return null;
}

/** Validate that relation endpoints exist in the database. */
export function validateRelations(db: ContentDatabase): string[] {
  const known = new Set<EntityId>([
    ...db.focus.map((x) => x.id),
    ...db.questions.map((x) => x.id),
    ...db.projects.map((x) => x.id),
    ...db.concepts.map((x) => x.id),
    ...db.signals.map((x) => x.id),
    ...db.timeline.map((x) => x.id),
  ]);

  const errors: string[] = [];
  for (const edge of db.relations) {
    if (!known.has(edge.from)) {
      errors.push(`Relation ${edge.id}: unknown from="${edge.from}"`);
    }
    if (!known.has(edge.to)) {
      errors.push(`Relation ${edge.id}: unknown to="${edge.to}"`);
    }
  }
  return errors;
}
