# Digital Laboratory — Design System

> **Status:** Design guideline only. No application code.  
> **Product:** Digital Laboratory + Scientific Journal + Personal Knowledge Observatory  
> **Companion:** [`ARCHITECTURE.md`](./ARCHITECTURE.md)

This document is the visual identity source of truth for all future development.

---

## Design Philosophy

### Visual metaphor

A researcher’s digital laboratory — entering an **observatory**, a **scientific archive**, and a **modern research institute** at once.

| Signal | Meaning |
|---|---|
| Scientific precision | Measured grids, hairline rules, exact meta typography |
| Intellectual depth | Editorial serif for long thought; quiet density |
| Exploration | Sparse accent, graph language, “active” states |
| Long-term accumulation | Timeline rhythm, archive ink, durable hierarchy |
| Computational thinking | Mono for models/code; node/edge grammar for knowledge |

### What this is not

- Not a portfolio template  
- Not a SaaS landing page  
- Not a startup marketing site  
- Not a social profile  

### Aesthetic synthesis

1. **Academic publishing** — journal structure, labeled sections, citations  
2. **Premium technology** — minimal chrome, precise type, intentional space  
3. **Knowledge systems** — nodes, edges, connected information (restrained, not decorative)

### Mode strategy

**Dark mode first.** Primary experience: deep laboratory / observatory night.  
Light mode may be defined later as a secondary theme that inverts surfaces while preserving accent and type roles — not required for Phase 1.

---

# 1. Color System

## 1.1 Palette overview

Feeling: **deep space laboratory** — charcoal voids, cool instrument panels, a single oxidized-teal accent. No neon, no cyberpunk magenta/cyan pairs, no gaming glow, no multi-stop marketing gradients.

### Primary backgrounds

| Token | HEX | Role |
|---|---|---|
| `--color-void` | `#07090C` | Deepest canvas (page root, Observatory field) |
| `--color-surface` | `#0D1117` | Primary working surface (content stage) |
| `--color-surface-raised` | `#151B24` | Elevated panels, sticky nav, side rails |
| `--color-surface-sunken` | `#05070A` | Inset wells (code blocks, quote wells, graph canvas) |

**Usage rules**
- Root layout uses `--color-void`.
- Main reading column sits on `--color-surface`.
- Navigation chrome and filter rails use `--color-surface-raised`.
- Never stack more than two surface steps in one region.
- Do not fill large areas with accent tints.

### Secondary backgrounds

| Token | HEX | Role |
|---|---|---|
| `--color-panel` | `#1A222E` | Secondary panels, hover wash base |
| `--color-panel-muted` | `#121821` | Alternating archive rows, table zebra |
| `--color-overlay` | `#07090CCC` | Modal / graph focus scrim (80% void) |
| `--color-grid` | `#1C2430` | Subtle grid / instrument lines (≤6% perceived contrast vs surface) |

**Usage rules**
- Secondary panels only for structural separation (filters, relation panel).
- Grid texture: CSS background or SVG at very low opacity; never compete with text.
- Overlays only for temporary focus (graph detail, demo lightbox).

### Text colors

| Token | HEX | Role |
|---|---|---|
| `--color-ink` | `#E8EEF6` | Primary body and titles |
| `--color-ink-secondary` | `#A7B3C5` | Supporting sentences, summaries |
| `--color-ink-tertiary` | `#6B7A90` | Metadata, timestamps, captions |
| `--color-ink-faint` | `#3D4A5C` | Hairlines, placeholders, disabled |
| `--color-ink-inverse` | `#0D1117` | Text on accent solid fills only |

**Usage rules**
- Body prose: `--color-ink` on `--color-surface`.
- Section labels / meta: `--color-ink-tertiary`, never compete with H1.
- Do not use pure `#FFFFFF` for body — too harsh against void.
- Minimum contrast: body ≥ 7:1 against surface; meta ≥ 4.5:1.

### Accent colors

One accent family. Communication: **active exploration / focus / live signal** — not decoration.

| Token | HEX | Role |
|---|---|---|
| `--color-accent` | `#3D8F8C` | Primary accent (links focus, active nav, key marks) |
| `--color-accent-soft` | `#3D8F8C33` | Selection wash, soft node fill (20% alpha) |
| `--color-accent-muted` | `#2A6563` | Hover/pressed on accent interactive |
| `--color-accent-glow` | `#3D8F8C1A` | Optional focus ring outer (10% alpha) — never as fill |

**Usage rules**
- One accent hue only across the product.
- Accent on ≤ ~5% of any viewport (rules, underlines, active ticks, small glyphs).
- No rainbow category colors; categories use type + tags, not distinct hues.
- No gradient fills for buttons, heroes, or cards.
- Soft accent washes only behind interactive selection or graph node hover.

### Status colors

Calm, desaturated, lab-instrument logic — not traffic-light pop.

| Token | HEX | Role |
|---|---|---|
| `--color-status-active` | `#3D8F8C` | Active research / live project (shares accent) |
| `--color-status-prototype` | `#8B7E5A` | Prototype — muted brass |
| `--color-status-experiment` | `#5A7A9A` | Experiment — cool steel |
| `--color-status-dormant` | `#6B7A90` | Dormant / paused |
| `--color-status-archived` | `#4A5565` | Archive |
| `--color-status-signal` | `#4F9A8F` | Fresh signal (near-accent, slightly brighter) |
| `--color-status-warning` | `#A67C52` | Caution / incomplete (rare) |
| `--color-status-critical` | `#9A5B5B` | Error / broken demo (rare) |

**Usage rules**
- Status appears as a small dot, label, or hairline — never a large badge block.
- Prefer text label + 6px indicator over colored pills.
- Critical/warning reserved for system truth, not marketing emphasis.

### Borders & rules

| Token | HEX | Role |
|---|---|---|
| `--color-rule` | `#243041` | Default hairline |
| `--color-rule-strong` | `#354457` | Section breaks, emphasis rules |
| `--color-focus-ring` | `#3D8F8C` | Keyboard focus |

### Forbidden color patterns

- Neon cyan/magenta cyberpunk pairs  
- Purple-to-indigo SaaS gradients  
- Large radial glows behind titles  
- Category rainbows  
- Pure black + pure white high-glare contrast stacks  

---

# 2. Typography System

## 2.1 Font stack

| Role | Family | Fallback | Why |
|---|---|---|---|
| **Editorial serif** | `Source Serif 4` | `Source Serif Pro`, `Georgia`, serif | Academic publishing voice — research titles, essay body, conceptual depth |
| **Modern sans** | `IBM Plex Sans` | `Helvetica Neue`, `Arial`, sans-serif | Instrument UI — nav, labels, metadata, project docs, controls |
| **Mono** | `IBM Plex Mono` | `Menlo`, `Consolas`, monospace | Computational thinking — models, architecture snippets, IDs, timestamps in dense tables |

**Why this pairing**
- Serif carries *journal / long-form thought*.
- Plex Sans carries *lab instrument / precise product UI*.
- Shared IBM Plex family (sans + mono) keeps technical surfaces coherent.
- Avoid Inter, Roboto, Arial-as-brand, system-ui as primary voice.

Load: variable fonts where possible; `font-display: swap`.

## 2.2 Type hierarchy

| Level | Token | Family | Size / line / weight / tracking | Use |
|---|---|---|---|---|
| **Hero title** | `--type-hero` | Serif | 40–48px / 1.15 / 600 / -0.02em | Observatory brand + primary thesis line only |
| **Page title** | `--type-page` | Serif | 32–36px / 1.2 / 600 / -0.015em | Entity/page H1 (research question title, project name) |
| **Section title** | `--type-section` | Sans | 18–20px / 1.3 / 560 / 0 | Labeled scientific sections (Question, Background, …) |
| **Body** | `--type-body` | Serif | 17–18px / 1.65 / 400 / 0 | Essays, notes, research prose |
| **Body UI** | `--type-body-ui` | Sans | 15–16px / 1.55 / 400 / 0 | Project architecture, lists, UI paragraphs |
| **Metadata** | `--type-meta` | Sans | 12–13px / 1.4 / 450 / 0.02em | Dates, status, discipline, reading time |
| **Labels** | `--type-label` | Sans | 11–12px / 1.3 / 500 / 0.08em | Uppercase/small-caps section rails, taxonomy |
| **Code** | `--type-code` | Mono | 13–14px / 1.5 / 400 / 0 | Inline/code blocks, model names |

### Responsive steps

| Viewport | Hero | Page | Body |
|---|---|---|---|
| ≥1280px | 48px | 36px | 18px |
| 768–1279px | 40px | 32px | 17px |
| <768px | 32px | 28px | 17px |

### Usage rules

- **Hero title:** only Observatory (and rare full-bleed archive moments). Brand name may use hero; supporting sentence uses body secondary.
- **Page title (serif):** identity of the intellectual object.
- **Section title (sans):** structural labels in research/project templates — feel like paper section heads, not marketing H2s.
- **Body (serif)** for Research, Knowledge concepts, Archive essays.
- **Body UI (sans)** for Projects, Signals feeds, index lists.
- **Labels:** letterspaced; prefer `text-transform: uppercase` or OpenType small caps — never both heavily.
- Max prose measure: **68ch**. Do not stretch serif body full-bleed.

---

# 3. Layout System

## 3.1 Desktop grid (≥1280px)

```
┌────────────────────────────────────────────────────────────┐
│ SiteHeader (full bleed, h = 56–64)                         │
├──────────┬─────────────────────────────────────┬───────────┤
│ Optional │         Main column                 │ Optional  │
│ left rail│         max 720–760px prose         │ right     │
│ 200px    │         or 1120px wide index        │ relation  │
│ labels / │                                     │ 280px     │
│ TOC      │                                     │           │
└──────────┴─────────────────────────────────────┴───────────┘
```

| Token | Value | Role |
|---|---|---|
| `--grid-columns` | 12 | Conceptual 12-col |
| `--grid-gutter` | 24px | Column gutter |
| `--grid-margin` | 48–64px | Page margin |
| `--shell-max` | 1440px | Outer shell |
| `--measure-prose` | 720px (≈68ch) | Essays / research / knowledge |
| `--measure-wide` | 1120px | Indexes, project docs with diagrams |
| `--rail-left` | 200px | Label / TOC rail |
| `--rail-right` | 280px | Relations / references sticky |

**Desktop behavior**
- Article templates: left label rail + prose measure + optional right relation rail.
- Indexes: wide measure, single column ruled lists (not masonry card grids).
- Observatory: full shell width, asymmetric — brand left/center, system map as quiet structure below fold.

## 3.2 Mobile grid (<768px)

| Token | Value |
|---|---|
| `--grid-margin` | 20px |
| `--grid-gutter` | 16px |
| `--measure-prose` | 100% − 40px |
| Rails | Collapse: TOC → in-page jump list; relations → below content |

Single column. Section labels become overlines above each block (not side rail).

Tablet (768–1279): margins 32px; relation rail stacks below; left rail may remain as compact TOC if width ≥960px.

## 3.3 Spacing scale

Strict 4px base.

| Token | px | Use |
|---|---|---|
| `--space-1` | 4 | Icon gaps, status dot padding |
| `--space-2` | 8 | Inline meta gaps, tag gaps |
| `--space-3` | 12 | Compact list item padding |
| `--space-4` | 16 | Default inner padding (compact) |
| `--space-5` | 24 | Card/panel padding, list item rhythm |
| `--space-6` | 32 | Between subsections |
| `--space-7` | 48 | Between major sections |
| `--space-8` | 64 | Page block separation |
| `--space-9` | 96 | Observatory major band gaps |
| `--space-10` | 128 | Rare full-page breathing |

**Rules:** only use scale values; no arbitrary `13px` / `27px` spacing.

## 3.4 Section rhythm

| Context | Rhythm |
|---|---|
| Research / Knowledge article | Label → `--space-3` → content; sections separated by `--space-7` + hairline |
| Project page | Same as research; architecture diagrams may use `--measure-wide` |
| Index lists | Row min-height ~56–64px; hairline between rows; `--space-5` vertical padding |
| Observatory bands | `--space-9` between Intro / Explorations / Projects / Signals / System map |
| Cards (when used) | Internal `--space-5`; external gap `--space-5` |

## 3.5 Content-type layout support

| Content | Layout |
|---|---|
| Essays | Prose measure, serif body, generous section rhythm |
| Scientific notes | Label rail + compact sections; meta row under title |
| Project documentation | Sans body UI; architecture may break to wide measure |
| Knowledge “cards” | Prefer dense list rows; card variant only in graph/map contexts |

---

# 4. Component Design Language

## 4.1 Navigation

### Style
- Height: 56–64px; background `--color-surface-raised`; bottom hairline `--color-rule`.
- Brand mark left: serif or refined wordmark, `--type-section`–adjacent size (~18–20px), `--color-ink`. Brand is primary identity — not a tiny logo.
- Primary links: sans `--type-meta` / 13–14px, `--color-ink-secondary`.
- No mega-menus, no CTA button in header, no gradient underline.

### Behavior
- Sticky on scroll; does not shrink aggressively.
- Mobile: brand + menu trigger; drawer/panel from raised surface with ruled list of sections.
- Optional quiet “system” meta (e.g. last sync) in tertiary ink — never a marketing badge.

### Active state
- Active section: `--color-ink` + **2px accent underline** or left tick on mobile drawer.
- Hover: `--color-ink` (no fill pills).
- Focus-visible: `1px` accent ring, offset 2px.
- Do not use filled pill tabs for primary nav.

---

## 4.2 Cards

**Default philosophy: no cards.** Prefer ruled rows. Cards exist only when the unit is a selectable entity in a scanning context (index grids, related modules, signal radar).

Shared card anatomy (all types):

```
┌─────────────────────────────────────────┐
│ [LABEL / STATUS]              [META]    │  ← type-label + type-meta
│ Title                                   │  ← serif or sans per type
│ Summary (2 lines max)                   │  ← ink-secondary
│ ─────────────────────────────────────── │
│ Relations / tags (optional, quiet)      │
└─────────────────────────────────────────┘
```

| Property | Spec |
|---|---|
| Background | `--color-surface-raised` or transparent with rule border |
| Border | `1px solid --color-rule` |
| Radius | `2px` max (near-sharp) |
| Shadow | none |
| Padding | `--space-5` |
| Hover | border → `--color-rule-strong`; optional `--color-accent-soft` left edge 2px |
| Active/focus | accent focus ring |

### Research Card
- Label: category (e.g. `NEUROSCIENCE`)
- Title: serif, research title / question short form
- Meta: updated date + status dot
- Footer: `question` snippet optional one line

### Project Card
- Label: status (`ACTIVE` / `PROTOTYPE` / …) with status color dot
- Title: sans medium weight (built artifact)
- Meta: stack / domain tags (max 3)
- No demo thumbnails as hero images inside cards

### Knowledge Node Card
- Label: domain
- Title: concept name (serif)
- Visual cue: small node glyph (6–8px circle + optional faint edge lines) — graph language, not illustration
- Footer: connection count (`12 relations`)

### Signal Card
- Denser, feed-like; may be full-width row instead of card
- Label: signal category + confidence
- Title/summary: sans; source + `observedAt` meta
- Left accent hairline if `status-signal` / unread

---

## 4.3 Buttons

| Variant | Visual | Use |
|---|---|---|
| **Primary** | Accent fill `#3D8F8C`, text `--color-ink-inverse`, radius 2px, h=36–40 | Rare: “Open project demo”, critical lab actions |
| **Secondary** | Transparent, `1px --color-rule`, text `--color-ink` | Default actions |
| **Ghost** | No border, text `--color-ink-secondary` | Tertiary |
| **Text** | Accent or ink underline on hover | Inline editorial |

**Rules**
- Padding: `10px 16px`; type: sans 13–14px / 500.
- Hover primary: `--color-accent-muted`.
- No large rounded-full pills; no shadow CTAs; no gradient buttons.
- One primary button per view maximum.

---

## 4.4 Links

| Context | Style |
|---|---|
| Prose | Accent color; underline on hover (offset 2px); visited → accent-muted |
| Meta / nav | Ink-secondary; hover ink; no underline until hover |
| Citation | Mono or meta size; bracket style `[1]` acceptable |

Focus: visible accent ring. External links: optional quiet external glyph in tertiary ink — not emoji.

---

## 4.5 Tags

| Property | Spec |
|---|---|
| Height | 22–24px |
| Type | `--type-label` or 11px sans |
| Style | Transparent + `1px --color-rule` OR faint panel fill |
| Color | Ink-secondary text; **not** multi-color category chips |
| Radius | 2px |
| Gap | `--space-2` |

Status tags may use status text color; still no neon fills.

---

## 4.6 Timeline elements

```
  ●──── 2024.03 ── Title of event
  │
  ●──── 2025.01 ── …
  │
  ○──── now ────── (hollow = ongoing)
```

| Element | Spec |
|---|---|
| Axis | 1px `--color-rule` vertical |
| Node | 8px circle; filled accent = milestone; hollow = ongoing |
| Date | Mono or meta, tertiary |
| Title | Sans/serif per content type |
| Rhythm | `--space-6`–`--space-7` between events |

Motion: axis draws or nodes appear in chronological order (see Motion). No bounce.

---

## 4.7 Data visualization elements

For knowledge graphs, relation maps, signal sparklines — **instrument aesthetic**.

| Element | Spec |
|---|---|
| Node | 8–14px circle; fill `--color-panel`; stroke `--color-rule-strong`; active `--color-accent` |
| Edge | 1px `--color-rule`; highlighted `--color-accent-muted` |
| Edge label | Meta 10–11px, tertiary |
| Canvas | `--color-surface-sunken` + faint grid `--color-grid` |
| Selection | Soft accent wash on node; related edges emphasize |
| Legend | Sans meta, bottom or right; hairline separated |
| Tooltips | Raised surface, rule border, no shadow blur >4px |

**Rules**
- No 3D, no particle fields, no animated rainbow links.
- Prefer force-directed or hierarchical layouts with low charge (calm).
- Empty state: ruled frame + one sentence, not illustration spam.

---

## 4.8 Shared content molecules

| Component | Spec |
|---|---|
| **EntityHeader** | Label rail + page title + summary + meta row (status, dates, taxonomy) |
| **SectionBlock** | Label (`QUESTION`) + hairline + content; consistent across Research/Project/Knowledge |
| **RelationPanel** | Grouped by relation type; linked titles; count meta |
| **ReferenceList** | Numbered or hanging indent; meta typography; DOI/url quiet |
| **MetaRow** | Single line; tertiary ink; separators `·` or hairline ticks |
| **StatusIndicator** | 6px dot + label |

---

# 5. Motion Design

## 5.1 Principles

Motion is **scientific, calm, precise** — information resolving into view like notes being placed on a bench, not marketing flourishes.

| Principle | Meaning |
|---|---|
| Purposeful | Only reveal hierarchy, connection, or time |
| Short | Prefer 120–320ms |
| Linear-ish | Ease-out lab curves; no elastic/bounce |
| Rare | 2–3 intentional patterns site-wide |
| Interruptible | Prefer `prefers-reduced-motion: reduce` → instant |

## 5.2 Tokens

| Token | Value |
|---|---|
| `--ease-lab` | `cubic-bezier(0.22, 0.61, 0.36, 1)` |
| `--duration-fast` | 120ms — hover, focus |
| `--duration-medium` | 240ms — section enter, panel |
| `--duration-slow` | 400ms — timeline, graph settle |
| `--duration-graph` | 600–800ms — initial layout only |

## 5.3 Patterns

| Pattern | Behavior | Where |
|---|---|---|
| **Note appear** | Opacity 0→1 + translateY 4→0px, 240ms | Section blocks, list rows entering |
| **Node connect** | Edge stroke-dash offset draw, 400ms; then node fill | Knowledge graph, relation reveal |
| **Timeline unfold** | Nodes appear in order, 80–120ms stagger, max 6 visible stagger | Archive timeline |
| **Panel slide** | Relation panel / mobile nav: 240ms translate + fade | Chrome |
| **Signal tick** | Soft opacity pulse once on new signal (no loop) | Signals feed |

## 5.4 Forbidden motion

- Looping glows, sparkles, gradient shifts  
- Parallax heroes  
- Large page-wide scrolljacking  
- Bounce / overshoot  
- Auto-playing decorative Lottie  

---

# 6. Page Templates

All templates share: `SiteHeader` → `EntityHeader` → labeled `SectionBlock`s → `RelationPanel` / references → `SiteFooter`.

Section labels use `--type-label` + tertiary/ink-secondary; content follows type rules above.

---

## 6.1 Research Article

**Purpose:** Scientific exploration record (journal article × lab notebook).

```
EntityHeader
  category label · status · updatedAt
  Title (page title, serif)
  Research question as dek (ink-secondary) OR title IS the question

SectionBlock  QUESTION
SectionBlock  BACKGROUND
SectionBlock  CURRENT UNDERSTANDING
SectionBlock  MODEL
SectionBlock  EXPERIMENT
SectionBlock  REFERENCES          → ReferenceList
SectionBlock  FUTURE QUESTIONS    → ordered list

Aside / rail
  RelationPanel (informed-by, related-to, exemplifies…)
  Optional TOC of sections
```

**Layout:** left label rail (desktop) aligning with section labels; prose measure; right relations on wide screens.

**Typography:** serif body throughout; mono allowed inside MODEL for formalisms.

**Visual:** hairline between sections; no hero image by default; diagrams only inside MODEL/EXPERIMENT as figures with captions.

---

## 6.2 Project Page

**Purpose:** Build lab record — precise product documentation.

```
EntityHeader
  projectStatus · tags · updatedAt
  Title (sans or serif — prefer sans for built systems)
  One-line problem statement

SectionBlock  PROBLEM
SectionBlock  DESIGN PHILOSOPHY
SectionBlock  ARCHITECTURE        → may use wide measure + diagram
SectionBlock  IMPLEMENTATION      → prose + mono snippets
SectionBlock  DEMO                → restrained embed or link button (secondary/primary rare)
SectionBlock  REFLECTION

Aside
  RelationPanel (builds-on, related research, knowledge nodes)
```

**Typography:** body UI sans for most sections; mono for code; serif optional in REFLECTION if essay-like.

**Visual:** architecture diagrams on sunken surface; demo not a marketing video hero — framed instrument panel.

---

## 6.3 Knowledge Entry

**Purpose:** Concept node in the personal knowledge graph.

```
EntityHeader
  domain label · updatedAt
  Concept title (serif)
  Short definition (dek)

SectionBlock  CONCEPT             → core explanation
SectionBlock  CONNECTIONS         → RelationPanel primary (edges as first-class UI)
SectionBlock  REFERENCES
SectionBlock  RELATED TOPICS      → list of linked entities (may duplicate light connections)

Optional
  Mini graph excerpt (local neighborhood only)
```

**Layout:** CONNECTIONS can sit in right rail on desktop and inline on mobile. Local graph: sunken canvas, calm nodes/edges.

**Typography:** serif for CONCEPT; meta for edge types (`informed-by`, `contradicts`).

---

## 6.4 Cross-template consistency checklist

| Element | Research | Project | Knowledge |
|---|---|---|---|
| EntityHeader | ✓ | ✓ | ✓ |
| Labelled SectionBlocks | ✓ | ✓ | ✓ |
| Hairline section rules | ✓ | ✓ | ✓ |
| RelationPanel | ✓ | ✓ | ✓ (central) |
| ReferenceList | ✓ | optional | ✓ |
| Accent usage | status + links | status + demo CTA rare | nodes + links |
| Card chrome | no | no | no on article |

---

# 7. Complete Design Token Reference

Canonical token list for implementation (CSS variables → Tailwind theme).

```text
/* Color — surfaces */
--color-void: #07090C;
--color-surface: #0D1117;
--color-surface-raised: #151B24;
--color-surface-sunken: #05070A;
--color-panel: #1A222E;
--color-panel-muted: #121821;
--color-overlay: #07090CCC;
--color-grid: #1C2430;

/* Color — ink */
--color-ink: #E8EEF6;
--color-ink-secondary: #A7B3C5;
--color-ink-tertiary: #6B7A90;
--color-ink-faint: #3D4A5C;
--color-ink-inverse: #0D1117;

/* Color — accent */
--color-accent: #3D8F8C;
--color-accent-soft: #3D8F8C33;
--color-accent-muted: #2A6563;
--color-accent-glow: #3D8F8C1A;

/* Color — status */
--color-status-active: #3D8F8C;
--color-status-prototype: #8B7E5A;
--color-status-experiment: #5A7A9A;
--color-status-dormant: #6B7A90;
--color-status-archived: #4A5565;
--color-status-signal: #4F9A8F;
--color-status-warning: #A67C52;
--color-status-critical: #9A5B5B;

/* Color — chrome */
--color-rule: #243041;
--color-rule-strong: #354457;
--color-focus-ring: #3D8F8C;

/* Typography families */
--font-serif: "Source Serif 4", "Source Serif Pro", Georgia, serif;
--font-sans: "IBM Plex Sans", "Helvetica Neue", Arial, sans-serif;
--font-mono: "IBM Plex Mono", Menlo, Consolas, monospace;

/* Type sizes (desktop defaults) */
--type-hero-size: 48px;
--type-page-size: 36px;
--type-section-size: 20px;
--type-body-size: 18px;
--type-body-ui-size: 16px;
--type-meta-size: 13px;
--type-label-size: 11px;
--type-code-size: 14px;

/* Layout */
--shell-max: 1440px;
--measure-prose: 720px;
--measure-wide: 1120px;
--rail-left: 200px;
--rail-right: 280px;
--grid-gutter: 24px;
--grid-margin: 64px;
--header-height: 56px;
--radius-xs: 2px;
--radius-none: 0;

/* Space */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 24px;
--space-6: 32px;
--space-7: 48px;
--space-8: 64px;
--space-9: 96px;
--space-10: 128px;

/* Motion */
--ease-lab: cubic-bezier(0.22, 0.61, 0.36, 1);
--duration-fast: 120ms;
--duration-medium: 240ms;
--duration-slow: 400ms;
```

---

# 8. Design QA Gates

Before shipping any screen, verify:

1. **Brand test:** Removing nav, does the first viewport still feel like *this* laboratory (not a generic dark SaaS page)?  
2. **Accent budget:** Accent occupies a small fraction of the viewport.  
3. **Card test:** If a card has no interaction purpose, remove card chrome.  
4. **Type test:** Long thought → serif; instrument UI → sans; computation → mono.  
5. **Motion test:** Would a research institute use this animation? If unsure, delete it.  
6. **Template test:** Research / Project / Knowledge all share EntityHeader + SectionBlock grammar.

---

*End of design guideline. Implementation should map these tokens into `styles/tokens.css` and Tailwind theme without inventing parallel values.*
