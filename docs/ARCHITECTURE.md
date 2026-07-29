# Digital Laboratory — Architecture Proposal

> Status: Phase 0 — Architecture only. No implementation code in this phase.  
> Product identity: Digital Laboratory + Scientific Journal + Personal Knowledge Graph + Product Showcase

---

## 1. Proposed Architecture

### 1.1 Product model

This site is not a portfolio or blog. It is a **personal intellectual operating system** with four overlapping surfaces:

| Surface | Role | Primary IA section |
|---|---|---|
| Observatory | Entry / situational awareness | `/` |
| Research Journal | Scientific exploration records | `/research` |
| Knowledge Graph | Concepts, relations, notes | `/knowledge` |
| Build Lab | Things you construct | `/projects` |
| Signal Radar | Time-sensitive intelligence | `/signals` |
| Long Memory | Essays, books, timeline | `/archive` |
| Identity | Philosophy and self | `/about` |

Cross-cutting principle: **every entity can link to every other entity** through a shared relation model. Pages are views onto a graph, not isolated templates.

### 1.2 Architectural decisions

#### Decision A — App Router + content-driven routes

**Choice:** Next.js App Router (TypeScript), static-first with progressive dynamism.

**Why:**
- Clear folder-based routing maps 1:1 to IA sections.
- Server Components keep research/knowledge pages lean and citation-heavy without shipping unnecessary JS.
- Future AI agents / Notion sync can live in Route Handlers or Server Actions without rewriting the UI layer.
- Compatible with static export now (GitHub Pages / Cloudflare Pages) and Node/Edge later.

#### Decision B — Layered content sources (adapter pattern)

**Choice:** A single `ContentRepository` interface with pluggable adapters.

```
UI / Pages
    ↓
Domain services (queries, relations, search)
    ↓
ContentRepository (interface)
    ↓
Adapters: LocalJSON | Notion | CMS | (future: RSS, Agent writes)
```

**Why:**
- Ship immediately on local JSON / MDX.
- Swap or combine Notion / headless CMS without touching components.
- AI agents and RSS pipelines write into the same domain model, not into page templates.

#### Decision C — Entity-first data model, not page-first

**Choice:** Core entities (`ResearchTopic`, `Project`, `KnowledgeNode`, `Signal`, `ArchiveItem`, `PersonProfile`) plus a first-class `Relation` type.

**Why:**
- Knowledge graph and “related topics” are native, not bolted on.
- Observatory can assemble “current explorations / active projects / latest signals” from typed queries.
- Graph visualization later consumes the same relation edges.

#### Decision D — Minimal dependency surface

**Choice:** Next.js + TypeScript + Tailwind + a small set of primitives. No UI kit, no animation framework, no graph library until needed.

**Why:**
- Scientific / editorial aesthetic needs typographic control more than component libraries.
- Avoids startup-landing visual defaults that come with many kits.
- Graph viz, Notion SDK, RSS parsers are optional later packages behind adapters.

#### Decision E — Design tokens as the single source of visual truth

**Choice:** CSS custom properties + Tailwind theme extension (one token file → both).

**Why:**
- Precision and restraint live in spacing, type scale, and ink hierarchy—not gradients or effects.
- Tokens make “lab / journal / observatory” feel consistent across seven sections.

**Visual identity:** See [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) — **dark mode first** (deep space laboratory), Laboratory Editorial language, complete tokens, components, motion, and page templates. That document supersedes the earlier light-paper color sketch in §5 of this file.

#### Decision F — Progressive enhancement for future systems

| Future capability | Hook in architecture |
|---|---|
| AI agents | Write adapters + `/api/ingest` Route Handlers; domain events |
| Knowledge graph viz | `Relation[]` + `/knowledge/graph` route; client island |
| RSS pipeline | `SignalAdapter` that normalizes feed items into `Signal` |
| Personal OS | Same repository + search index + relation graph as kernel |

---

## 2. Folder Structure

Proposed monorepo-style Next.js app (replace current static `index.html` site when implementation begins):

```
/
├── docs/
│   └── ARCHITECTURE.md          # this document
├── public/
│   ├── fonts/
│   └── images/
├── content/                     # local source of truth (Phase 1)
│   ├── profile/
│   │   └── about.json
│   ├── research/
│   │   └── <slug>.json          # or .mdx later
│   ├── projects/
│   ├── knowledge/
│   ├── signals/
│   ├── archive/
│   └── relations/
│       └── edges.json
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx             # Observatory
│   │   ├── globals.css
│   │   ├── research/
│   │   │   ├── page.tsx
│   │   │   ├── [category]/page.tsx
│   │   │   └── [category]/[slug]/page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   ├── [status]/page.tsx   # active | prototypes | experiments | archive
│   │   │   └── [status]/[slug]/page.tsx
│   │   ├── knowledge/
│   │   │   ├── page.tsx
│   │   │   ├── [domain]/page.tsx
│   │   │   ├── [domain]/[slug]/page.tsx
│   │   │   └── graph/page.tsx       # reserved for viz
│   │   ├── signals/
│   │   │   ├── page.tsx
│   │   │   └── [category]/page.tsx
│   │   ├── archive/
│   │   │   ├── page.tsx
│   │   │   ├── essays/
│   │   │   ├── notes/
│   │   │   ├── books/
│   │   │   ├── experiments/
│   │   │   └── timeline/page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   └── api/                     # future: ingest, search, sync
│   │       └── health/route.ts
│   ├── components/
│   │   ├── layout/                  # shell, nav, footer, page frame
│   │   ├── observatory/             # homepage composition only
│   │   ├── research/
│   │   ├── projects/
│   │   ├── knowledge/
│   │   ├── signals/
│   │   ├── archive/
│   │   ├── about/
│   │   ├── content/                 # shared entity UI (meta, refs, relations)
│   │   ├── navigation/
│   │   └── ui/                      # primitive atoms (no kit)
│   ├── domain/                      # pure types + business rules
│   │   ├── entities/
│   │   ├── relations/
│   │   ├── taxonomies.ts
│   │   └── queries.ts
│   ├── data/
│   │   ├── repository.ts            # ContentRepository interface
│   │   ├── adapters/
│   │   │   ├── local-json.ts
│   │   │   ├── notion.ts            # stub / future
│   │   │   └── cms.ts               # stub / future
│   │   └── index.ts                 # factory: which adapter(s) are active
│   ├── lib/
│   │   ├── cn.ts
│   │   ├── dates.ts
│   │   └── seo.ts
│   └── styles/
│       └── tokens.css               # design tokens
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── README.md
```

**Notes:**
- `content/` stays outside `src/` so non-engineers (and future sync jobs) can edit data without touching React.
- `domain/` has zero Next.js imports — portable to agents and scripts.
- Adapters are the only place Notion/CMS SDKs may appear.

---

## 3. Routing Architecture

| Route | Purpose | Data |
|---|---|---|
| `/` | Observatory — intro, explorations, active projects, latest signals | composite queries |
| `/research` | Research index + category overview | all topics grouped |
| `/research/[category]` | Category filter | taxonomy + topics |
| `/research/[category]/[slug]` | Research topic record | topic + relations + refs |
| `/projects` | Project lab index | all projects by status |
| `/projects/[status]` | Status lane | filtered projects |
| `/projects/[status]/[slug]` | Project record | project + demo meta |
| `/knowledge` | Knowledge map index | domains + featured nodes |
| `/knowledge/[domain]` | Domain shelf | nodes in domain |
| `/knowledge/[domain]/[slug]` | Concept / note entry | node + edges |
| `/knowledge/graph` | Graph visualization (phase later) | nodes + edges |
| `/signals` | Signal radar | recent signals |
| `/signals/[category]` | Category feed | filtered signals |
| `/archive` | Memory index | type counts + recent |
| `/archive/timeline` | Intellectual development timeline | chronological events |
| `/archive/{essays\|notes\|books\|experiments}` | Typed archives | filtered items |
| `/about` | Identity & philosophy | profile |

Navigation model: persistent **lab chrome** (site name, primary sections, subtle status), not a marketing mega-nav. Secondary filters (category / status / domain) live inside section layouts as precision controls, not marketing tabs.

---

## 4. Component Hierarchy

### 4.1 Layers

```
AppShell
├── SiteHeader (brand mark, primary nav, optional “system status”)
├── PageFrame (max measure, section title block, optional filters)
│   └── Section-specific composition
└── SiteFooter (colophon, last updated, quiet links)

Primitives (ui/)
├── Text, Heading, Prose
├── Divider, Rule
├── Badge / Tag (restrained — ink, not pills-as-marketing)
├── MetaRow (dates, status, discipline)
├── LinkList, CitationList
├── Button / TextLink (editorial, not SaaS CTA)
└── EmptyState, LoadingState

Content molecules (content/)
├── EntityHeader (title, question/subtitle, taxonomy, status)
├── SectionBlock (labeled scientific sections)
├── RelationPanel (related entities by type)
├── ReferenceList
├── StatusIndicator (active / prototype / archived)
└── SignalCard / CompactEntityCard (list density, not “feature cards”)

Section organisms
├── observatory/
│   ├── IntroBlock
│   ├── ExplorationStrip
│   ├── ActiveProjectsBlock
│   ├── LatestSignalsBlock
│   └── SystemMap (nav into deeper systems)
├── research/
│   ├── ResearchIndex
│   ├── CategoryRail
│   └── ResearchTopicView (question → background → … → future questions)
├── projects/
│   ├── ProjectIndex
│   ├── StatusLanes
│   └── ProjectView (problem → … → reflection)
├── knowledge/
│   ├── DomainIndex
│   ├── KnowledgeNodeView
│   └── (future) GraphCanvas island
├── signals/
│   ├── SignalFeed
│   └── SignalFilters
├── archive/
│   ├── ArchiveIndex
│   ├── TimelineView
│   └── ArchiveEntryView
└── about/
    └── ProfileView
```

### 4.2 Composition rules

1. **One job per section component** — matches the IA: Observatory blocks each answer one question.
2. **No hero marketing kit** — Observatory uses an editorial opening (brand as primary signal + short thesis), not CTA stacks or stat strips.
3. **Cards are rare** — allowed only when the affordance is selection/navigation of an entity in a dense list; otherwise use rules, spacing, and typography.
4. **Entity views share `SectionBlock` + `RelationPanel`** so Research / Projects / Knowledge feel like one lab language.
5. **Client islands** only where needed (graph, interactive demo embeds). Default is Server Components.

---

## 5. Design System Proposal

### 5.1 Visual direction

**Name:** Laboratory Editorial (dark-first)  

**Canonical spec:** [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md)

**References (spirit, not copies):** print scientific journals, instrument UIs, quiet research institute sites, high-end technical documentation, observatory night.

**Avoid:** purple SaaS gradients, cream+terracotta “AI portfolio” defaults, broadsheet denseness, glow/neon AI aesthetics, cyberpunk palettes, pill clusters, dashboard chrome on the homepage.

**Atmosphere:**
- Deep void / surface hierarchy (`#07090C` → `#0D1117` → raised panels) with a single oxidized-teal accent.
- Subtle grid or ruled texture (very low contrast) — instrument panel, not decoration.
- Motion: 2–3 intentional motions only (note appear, node connect, timeline unfold) — presence, not spectacle.

### 5.2 Typography

| Role | Proposed character | Notes |
|---|---|---|
| Display / Brand | Distinct serif or neo-grotesk with academic weight (e.g. **Source Serif 4** or **Newsreader** for brand; **IBM Plex Sans** for UI) | Brand must dominate first viewport |
| Body / Prose | Highly readable serif or humanist sans for long research text | Comfortable measure ~65–72ch |
| Meta / Labels | Small caps or tracked sans for taxonomy, dates, section labels | Precision signal |
| Code / Models | Monospace (IBM Plex Mono or similar) | Architecture, models, experiments |

Do **not** use Inter / Roboto / Arial / system-ui as the primary brand voice.

### 5.3 Color tokens (conceptual)

Canonical HEX values and usage rules live in [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) §1 and §7.

```
--color-void / --color-surface / --color-surface-raised / --color-surface-sunken
--color-ink / --color-ink-secondary / --color-ink-tertiary / --color-ink-faint
--color-accent (+ soft / muted)     /* single oxidized teal family */
--color-status-*                    /* active, prototype, experiment, archived, … */
--color-rule / --color-focus-ring
```

Accent is **one** hue family used for focus, links, and “active exploration” — never rainbow category coloring. Dark-first; no marketing gradients.

### 5.4 Spacing & layout tokens

```
--space-1 … --space-8     /* strict scale */
--measure-prose           /* ~68ch */
--measure-wide            /* index layouts */
--rail-nav                /* left or top lab chrome */
--rule-hairline           /* 1px ink-faint */
--radius-none / --radius-sm  /* prefer nearly sharp; avoid large rounded cards */
```

Layout pattern: **asymmetric editorial** — strong left margin for labels (“Question”, “Model”), content in a stable reading column. Indexes use dense lists with hairline separators, not card grids.

### 5.5 Elevation & borders

- Prefer **rules and typographic weight** over shadows.
- If elevation exists: single soft layer for floating utility panels only (e.g. graph controls).
- No multi-layer shadows, no glow.

### 5.6 Motion tokens

```
--ease-out-lab
--duration-fast   /* 120ms — focus */
--duration-medium /* 240ms — section enter */
--duration-slow   /* 400ms — timeline */
```

### 5.7 Component API conventions

- Props named after domain language: `status`, `discipline`, `updatedAt`, `relations`.
- Variants via tokens, not one-off hex in JSX.
- Accessibility: semantic headings, skip link, visible focus rings using `--color-accent`.

---

## 6. Data Model Proposal

### 6.1 Shared primitives

```ts
type EntityId = string;          // stable slug or UUID
type ISODate = string;

type EntityBase = {
  id: EntityId;
  slug: string;
  title: string;
  summary: string;
  createdAt: ISODate;
  updatedAt: ISODate;
  status?: "active" | "dormant" | "archived" | "prototype" | "experiment";
  tags?: string[];
};

type RelationType =
  | "related-to"
  | "informed-by"
  | "builds-on"
  | "contradicts"
  | "exemplifies"
  | "references"
  | "part-of"
  | "precedes";   // timeline

type Relation = {
  id: EntityId;
  from: EntityId;
  to: EntityId;
  type: RelationType;
  note?: string;
};

type Reference = {
  id: EntityId;
  title: string;
  authors?: string[];
  year?: number;
  url?: string;
  doi?: string;
  kind: "paper" | "book" | "article" | "dataset" | "other";
};
```

### 6.2 Domain entities

**ResearchTopic**

```ts
type ResearchCategory =
  | "biomedical-systems"
  | "computational-medicine"
  | "neuroscience"
  | "immunology"
  | "future-medicine";

type ResearchTopic = EntityBase & {
  kind: "research";
  category: ResearchCategory;
  question: string;
  background: RichText;
  currentUnderstanding: RichText;
  models: RichText;          // or structured Model[]
  experiments: RichText;     // or Experiment[]
  references: Reference[];
  futureQuestions: string[];
};
```

**Project**

```ts
type ProjectStatus = "active" | "prototype" | "experiment" | "archive";

type Project = EntityBase & {
  kind: "project";
  projectStatus: ProjectStatus;
  problem: RichText;
  designPhilosophy: RichText;
  architecture: RichText;
  implementation: RichText;
  demo?: { url?: string; embed?: string; images?: string[] };
  reflection: RichText;
};
```

**KnowledgeNode**

```ts
type KnowledgeDomain =
  | "medicine"
  | "ai"
  | "biology"
  | "philosophy"
  | "technology"
  | "reading-notes";

type KnowledgeNode = EntityBase & {
  kind: "knowledge";
  domain: KnowledgeDomain;
  concept: RichText;
  references: Reference[];
  // relationships live in Relation store, not only embedded
};
```

**Signal**

```ts
type SignalCategory =
  | "medical-intelligence"
  | "ai-intelligence"
  | "technology"
  | "society"
  | "personal-learning";

type Signal = EntityBase & {
  kind: "signal";
  category: SignalCategory;
  source?: string;
  sourceUrl?: string;
  observedAt: ISODate;
  body: RichText;
  confidence?: "low" | "medium" | "high";
};
```

**ArchiveItem**

```ts
type ArchiveType = "essay" | "note" | "book" | "experiment" | "timeline-event";

type ArchiveItem = EntityBase & {
  kind: "archive";
  archiveType: ArchiveType;
  body?: RichText;
  occurredAt?: ISODate;   // timeline
  relatedEntityIds?: EntityId[];
};
```

**PersonProfile** (About)

```ts
type PersonProfile = {
  kind: "profile";
  name: string;
  role: string;
  thesis: string;           // one-sentence operating philosophy
  bio: RichText;
  principles: string[];
  timelineHighlights?: EntityId[];
};
```

**RichText:** start as Markdown string; later MDX or portable text from CMS — adapter normalizes to a renderable AST or markdown.

### 6.3 Repository interface

```ts
interface ContentRepository {
  getProfile(): Promise<PersonProfile>;
  listResearch(filter?: { category?: ResearchCategory }): Promise<ResearchTopic[]>;
  getResearch(slug: string): Promise<ResearchTopic | null>;
  listProjects(filter?: { status?: ProjectStatus }): Promise<Project[]>;
  getProject(slug: string): Promise<Project | null>;
  listKnowledge(filter?: { domain?: KnowledgeDomain }): Promise<KnowledgeNode[]>;
  getKnowledge(slug: string): Promise<KnowledgeNode | null>;
  listSignals(filter?: { category?: SignalCategory; limit?: number }): Promise<Signal[]>;
  listArchive(filter?: { type?: ArchiveType }): Promise<ArchiveItem[]>;
  getRelations(entityId: EntityId): Promise<Relation[]>;
  search?(q: string): Promise<EntityBase[]>;   // phase 2
}
```

Phase 1: `LocalJsonAdapter` reads `/content/**`.  
Phase 2: `NotionAdapter` maps databases → entities.  
Phase 3: composite repository (local + Notion + RSS signals).

### 6.4 Observatory queries (derived, not stored)

- Intro ← `getProfile()`
- Current explorations ← `listResearch({ status: "active" })` (or tagged)
- Active projects ← `listProjects({ status: "active" })`
- Latest signals ← `listSignals({ limit: N })`
- System map ← static nav + counts from lists

---

## 7. Scalability & future integration

| Concern | Approach |
|---|---|
| Notion / CMS | Adapter implements `ContentRepository`; mapping layer per database |
| AI agents | Agents call ingest API → validate against Zod schemas → write JSON or Notion rows |
| Knowledge graph viz | Client component reads `listKnowledge` + `getRelations`; force-directed or hierarchical layout library added only then |
| RSS pipeline | Cron / Worker normalizes feeds → `Signal` entities → repository |
| Search | Optional full-text index (FlexSearch / Pagefind) over exported entities |
| i18n / multi-vault | Not required now; entity IDs and slugs stay locale-agnostic |

---

## 8. Implementation phases (guidance only)

1. **Architecture** ← current document  
2. **Scaffold** — Next.js + Tailwind + tokens + AppShell + empty routes  
3. **Domain + LocalJSON adapter** — seed content for all seven sections  
4. **Entity templates** — Research / Project / Knowledge record views  
5. **Observatory composition** — real homepage  
6. **Signals + Archive + About**  
7. **Relations UI** — then optional graph  
8. **External adapters** — Notion, RSS, agent ingest  

---

## 9. Summary of principles

1. **Entity graph over page templates** — IA sections are lenses.  
2. **Adapters over hard-coded CMS** — local JSON first, Notion/CMS later.  
3. **Laboratory editorial design** — ink, measure, taxonomy, restraint.  
4. **Server-first UI** — client only for interaction islands.  
5. **Minimal dependencies** — add libraries when a phase requires them.  
6. **One accent, one brand voice, one composition on entry** — Observatory is an intellectual foyer, not a landing page.
