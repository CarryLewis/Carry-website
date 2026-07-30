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
├── relations/        # Global relationship edges
└── notion-inbox/     # Unmapped Notion DB rows (sync)
```

## Rules

1. **Do not hardcode entity content in UI.** Edit JSON here instead.
2. Every new record should declare `related*Ids` **and** (when cross-cutting) a row in `relations/edges.json`.
3. IDs are stable kebab-case strings (`proj-ecg-simulator`, `q-ecg-conduction`, …).
4. TypeScript mirrors live in `src/content/types.ts`.
5. Runtime loader / query API: `src/content/database.ts` + `src/content/relations.ts`.
6. After adding files, run `npm run content:manifest` (also runs on `prebuild` / `sync:notion`).

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

## Notion sync

Read-only build-time sync: `npm run discover:notion` / `npm run sync:notion`  
See root README and `docs/CONTENT_OS.md`.

`ContentRepository` defaults to LocalJSON over this layer.
