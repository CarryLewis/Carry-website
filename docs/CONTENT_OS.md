# Content Operating System

> Governing model for the Digital Laboratory website.  
> Companions: [`ARCHITECTURE.md`](./ARCHITECTURE.md), [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md)

The website is a **living knowledge system**, not a collection of pages.

```
Content Layer (/content JSON)  →  Data Layer (src/content + repository)  →  UI Layer
   (single source of truth)         (typed loaders + relations)              (pure renderers)
```

---

## Core principle

**Never hardcode meaningful personal or intellectual content in UI components.**

All meaningful content lives in `/content/{collection}/*.json`. UI only renders data.

| Wrong | Correct |
|---|---|
| Homepage string: “Currently exploring cardiac simulation” | `content/focus/ecg-simulator.json` rendered by a card |
| Nav brand typed in JSX | `src/data/profile.ts` / site chrome (until moved under content/meta) |
| Project slugs duplicated in `generateStaticParams` | Derived from `listProjects()` / content database |

Acceptable in UI: chrome microcopy (Skip link), presentational taxonomy maps (status label → color), layout geometry.

---

## Global content modules

| Module | Content path | Schema | TypeScript |
|---|---|---|---|
| Intellectual Focus | `content/focus/` | `schemas/focus.schema.json` | `IntellectualFocusRecord` |
| Active Questions | `content/questions/` | `schemas/question.schema.json` | `ActiveQuestionRecord` |
| Projects | `content/projects/` | `schemas/project.schema.json` | `ProjectRecord` |
| Connected Concepts | `content/concepts/` | `schemas/concept.schema.json` | `ConceptRecord` |
| Information Radar | `content/signals/` | `schemas/signal.schema.json` | `SignalRecord` |
| Timeline | `content/timeline/` | `schemas/timeline.schema.json` | `TimelineEventRecord` |
| Relations | `content/relations/edges.json` | `schemas/relation.schema.json` | `RelationRecord` |

Runtime API: `src/content/database.ts` + `src/content/relations.ts`  
UI wiring to this layer is intentional and staged — homepage sections must eventually consume only this database.

---

## Update workflow (mandatory)

When new information arrives:

1. **Classify** — Focus / Question / Concept / Signal / Project / Archive  
2. **Write data** — update the corresponding module (+ relations)  
3. **Trace dependents** — which components/pages read this module?  
4. **Sync UI** — only if schema or query shape changed; otherwise re-render is automatic  
5. **Report** using the standard report format below  

### Standard report format

```
Content updated:
- …

Affected pages:
- …

Components changed:
- …

Future connections:
- …
```

---

## Content synchronization rule

A change to one database entry must keep dependent views consistent:

| If you change… | Also check… |
|---|---|
| Intellectual Focus | Home exploration band, About, related Projects |
| Active Question | Home threads, Research index, concept graph |
| Concept / Relation | Knowledge page, graph preview, related research |
| Signal | Home radar, Signals page |
| Project | Home (if linked from Focus), Projects index/detail, related research/concepts |

Prefer **ID-based relations** over duplicated titles/hrefs.

---

## Future expansion

Modules and `ContentRepository` must remain compatible with:

- Notion API sync  
- Headless CMS  
- AI agent writes  
- Knowledge graph visualization  
- Automated information pipelines (RSS → Signal)

Adapters live under `src/data/adapters/` (local mock is default).

---

## Agent operating stance

Think in **connected information structures**, not pages.  
Every update should strengthen the ecosystem graph.
