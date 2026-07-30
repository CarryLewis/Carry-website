# Content Operating System

> Governing model for the Digital Laboratory website.  
> Companions: [`ARCHITECTURE.md`](./ARCHITECTURE.md), [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md)

The website is a **living knowledge system**, not a collection of pages.

```
Content Layer  →  Data Layer  →  UI Layer
   (facts)         (typed modules + relations)   (pure renderers)
```

---

## Core principle

**Never hardcode meaningful personal or intellectual content in UI components.**

All meaningful content lives in structured data modules. UI only renders data.

| Wrong | Correct |
|---|---|
| Homepage string: “Currently exploring cardiac simulation” | `intellectual-focus.ts` entry rendered by `ExplorationCard` |
| Nav brand typed in JSX | `site.ts` / `profile.ts` |
| Project slugs duplicated in `generateStaticParams` | Derived from `listProjects()` |

Acceptable in UI: chrome microcopy (Skip link), presentational taxonomy maps (status label → color), layout geometry.

---

## Global content modules

| Module | Data file | Domain type | Surfaces |
|---|---|---|---|
| Intellectual Focus | `src/data/intellectual-focus.ts` | `IntellectualFocus` | Home, About, Research overview |
| Active Questions | `src/data/active-questions.ts` | `ActiveQuestion` | Home, Research, Knowledge graph |
| Connected Concepts | `src/data/concepts.ts` | `Concept` | Knowledge, Research, Graph |
| Information Radar | `src/data/signals.ts` | `Signal` | Home, Signals |
| Projects | `src/data/projects.ts` | `Project` | Home, Projects, Research links |
| Relations | `src/data/relations.ts` | `Relation` | Cross-cutting |
| Profile / Site | `src/data/profile.ts`, `site.ts` | `PersonProfile`, `SiteChrome` | Shell, Hero, About |

Every new item **must** declare relationships (`related*Ids` and/or `relations` edges). Isolated content is not allowed.

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
