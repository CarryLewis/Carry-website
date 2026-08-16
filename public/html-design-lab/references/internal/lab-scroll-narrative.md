# Reference: Scroll Narrative (internal specimen)

## Metadata

- **URL:** [experiments/storytelling/scroll-narrative-v01/](../../experiments/storytelling/scroll-narrative-v01/)
- **Source:** HTML Design Lab (internal)
- **Date added:** 2026-08-15
- **Category:** storytelling
- **Design language:** Editorial
- **Primary strength:** Causal construction in time
- **Interaction type:** Scroll (Follow)
- **Motion type:** Assemble
- **Visualization type:** Progressive diagram
- **Layout type:** Sticky stage + vertical essay
- **Information density:** medium
- **Technical complexity:** medium
- **Why it is interesting:** Navigation *is* the argument. The diagram is not a figure under the text.
- **Potentially reusable patterns:** Causal Scroll Construction; Assemble; Follow
- **Related experiments:** scroll-narrative-v01
- **Related projects:** interactive essays, research explanations

This is a worked example of the deconstruction framework applied to a Lab experiment — not an external website. External references should use the same shape without importing the site.

---

## Layer 1 — Observation

- Display serif title, muted deck, generous opening padding
- Two-column layout: chapters left, SVG right
- Right column is sticky
- SVG parts (A, line, B, line, C, labels) begin invisible
- Four chapters, each taller than the viewport on desktop
- Caption under the diagram changes with stage
- Hairline borders, no cards, no shadows
- Small-caps mono kicker

---

## Layer 2 — Interpretation

- Large type establishes that this is an essay, not a widget demo
- Sticky diagram keeps the visual in working memory so the reader does not reconstruct it from prose
- Invisibility of parts prevents the conclusion from arriving before the premises
- Chapter height forces a dwell time; the argument cannot be skimmed as four headings
- Caption translates the visual state into a proposition (observation of state → claimed meaning)
- Restraint of chrome keeps attention on construction, not on Lab identity

---

## Deconstruction

### Visual language

Editorial: paper ground, ink, one accent unused in the diagram. Identity comes from type and withholding, not from color coding.

### Spatial language

Asymmetric two-column. The sticky pane is a stage, not a sidebar of links. Whitespace in the opening is a threshold.

### Information architecture

Linear. Overview is the title; detail is each chapter; the diagram is a running index of what has been claimed.

### Interaction language

Scroll → IntersectionObserver selects a stage → parts appear and caption changes → the reader understands which claim is now true.

### Motion language

Assemble. Movement communicates “this element is now part of the system,” not “this element is lively.”

### Visual storytelling

Scroll represents **narrative time** and **construction**, not geographic space. Arc: element → relation → consequence → named system.

---

## Extracted patterns

- [Causal Scroll Construction](../../patterns/extracted/causal-scroll-construction.md)

## What not to copy

- The specific A/B/C pedagogy, if the target content is not causal
- Sticky behavior on mobile (the experiment already stacks)
- Lab wordmark chrome in a production essay

## Suggested experiments

- v02: scroll represents space instead of argument (horizontal)
- v02: labels appear *with* their nodes (test whether late naming is load-bearing)
