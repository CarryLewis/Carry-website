# Content Database Layer

Single source of truth for the Digital Laboratory knowledge system.

```
content/
├── schemas/          # JSON Schema contracts
├── focus/            # Intellectual Focus records
├── questions/        # Active research questions
├── projects/         # Things being built
├── concepts/         # Knowledge nodes
├── signals/          # Information radar
├── timeline/         # Intellectual development events
└── relations/        # Global relationship edges
```

## Rules

1. **Do not hardcode entity content in UI.** Edit JSON here instead.
2. Every new record should declare `related*Ids` **and** (when cross-cutting) a row in `relations/edges.json`.
3. IDs are stable kebab-case strings (`proj-ecg-simulator`, `q-ecg-conduction`, …).
4. TypeScript mirrors live in `src/content/types.ts`.
5. Runtime loader / query API: `src/content/database.ts` + `src/content/relations.ts`.

## Relationship system

- **Embedded refs:** `relatedProjectIds`, `relatedConceptIds`, `relatedTopicIds`, …
- **Global edges:** `content/relations/edges.json` with typed `RelationType`
- Query helpers: `getRelationsFor`, `getNeighborIds`, `findPath`, `validateRelations`

## Current seed projects

| Project | Status | Key links |
|---|---|---|
| ECG Simulator | active | ECG conduction question, action potential / SA / AV / ECG concepts |
| Clinical Reasoning AI | prototype | Clinical reasoning question, AI + medicine concepts |
| Personal Knowledge OS | active | Human Systems concept, knowledge-graph signals |
| Research Brief | active | MUJI Observatory homepage, Knowledge OS, technology concept |

## Next step (UI deferred)

Wire `ContentRepository` to `src/content/database.ts` so homepage sections consume this layer exclusively. UI components should not change shape — only their data source.
