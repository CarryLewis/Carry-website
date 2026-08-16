# Design Constitution

HTML Design Lab is a visual language laboratory for the web.

It is not a website, a portfolio, a landing page, or a template. It is a long-term R&D environment for accumulating ways to explain things through HTML.

The ultimate output is not pages. It is a growing library of visual thinking patterns.

---

## Purpose

Transform complex ideas into interactive visual experiences.

The path is:

Concept → Spatial structure → Visual metaphor → Interaction → Animation → Visualization → Narrative → Understanding

HTML should help the user understand information, not merely display it.

---

## Lab vs production

Production projects (ECG Stimulator, Personal Observatory, Thinking Database, Knowledge Graph, Medical Education Simulator, Personal Website) have their own content and product requirements.

This Lab provides the visual and interaction vocabulary those projects use.

```
Production project  →  identifies a visual problem
HTML Design Lab     →  experiments with possible solutions
Design Lab          →  creates a reusable pattern
Production project  →  adopts the refined pattern
```

Do not build production products here. Build the patterns they will later adopt.

Do not implement automated project synchronization. Import and export remain manual.

---

## Every experiment answers a question

An experiment is valid when it addresses at least one:

| Question | Concern |
| --- | --- |
| Representation | How can this concept become a visual structure? |
| Explanation | How can interaction make a mechanism easier to understand? |
| Navigation | How can a large information space be explored without overwhelm? |
| Relationship | How can relationships between concepts become visible? |
| Time | How can change, evolution, or chronology be represented? |
| Mechanism | How can a process be animated instead of merely described? |
| Comparison | How can two or more systems be visually compared? |
| Scale | How can users move between overview and detail? |
| Uncertainty | How can ambiguity, confidence, or incomplete knowledge be shown? |
| Emergence | How can complex structures emerge from simple elements? |

A successful experiment produces a reusable design insight — not a polished final page.

---

## Isolation and versioning

Every experiment is isolated. Do not modify unrelated experiments.

Do not overwrite a meaningful previous version. When an approach is an alternative, keep both:

```
knowledge-graph-v01
knowledge-graph-v02
knowledge-graph-v03
```

Version A, B, and C should coexist when they represent genuine design alternatives. Never remove an experiment because a later version seems better.

Each experiment folder contains, as needed:

```
README.md
index.html
styles.css
script.js
assets/
```

The experiment must be independently understandable.

---

## Documentation required

Every experiment documents:

- **Name** — concise, descriptive
- **Problem** — the communication or design problem
- **Concept** — the visual idea
- **Interaction** — how the user acts
- **Motion** — what moves, and why
- **Information Logic** — what the visual system encodes
- **Reusability** — which future projects could use it
- **Technical Approach** — technology used
- **Changelog** — one line per version (`v01 — static graph`)

Plus taxonomy metadata (also recorded in `lab/experiments.json`):

```
id, name, version, category, subtype,
interaction, motion, information,
complexity, reusability, recommended_for,
visual_language, path
```

---

## Visual languages may contradict

The Lab must not lock into one design system.

Languages coexist:

- A — Minimal / editorial
- B — Scientific / technical
- C — Spatial / architectural
- D — Data-driven
- E — Experimental / kinetic
- F — Museum / exhibition
- G — Digital notebook
- H — Scientific simulator

The Lab chrome (homepage, gallery, playground) uses notebook + editorial. Experiments may load any language. Visual contradiction is allowed. Exploration is the point.

A single pattern may have multiple visual implementations. Do not decide which is correct. Make comparison easy.

---

## Tokens are control, not brand

`tokens/tokens.css` makes experimentation controllable. It does not define a permanent visual identity.

Language files override the same contract. Experiments may further override locally.

---

## Components come late

Optimize for experimentation speed.

Do not prematurely extract a component library. When a primitive repeats across experiments, then extract it into `/components`. Until then, keep the convention documented and the folder otherwise empty of invented abstractions.

---

## Animation must have a reason

Animation communicates: time, change, causality, sequence, relationship, hierarchy, attention, emergence, state.

A process should not merely show `A → B → C`. It should demonstrate:

```
A
 ↓  signal propagates
B activates
 ↓  B changes
C emerges
```

The motion is part of the explanation. Decorative motion is a defect.

---

## Visualization follows structure

Do not add charts because they look sophisticated.

Ask what structure exists in the information, then choose the form:

| Structure | Form |
| --- | --- |
| Relationship | graph |
| Sequence | timeline |
| Process | flow |
| Hierarchy | tree |
| Comparison | matrix |
| Change | animation |
| Distribution | chart |
| Mechanism | simulation |
| Spatial relationship | map |
| Uncertainty | opacity / range / branching |

---

## Scientific accuracy over decoration

For scientific and medical visualizations, visual accuracy is more important than visual attractiveness.

Do not simplify a scientific relationship merely to make it look better.

This Lab may later support ECG generation, neural pathways, circulation, pharmacology, disease progression, anatomy, feedback loops, diagnostic trees, molecular interaction. Those belong as *patterns*, not as production simulators.

---

## Quality

Prioritize: clarity, hierarchy, spatial rhythm, visual storytelling, interaction quality, meaningful motion, information density, conceptual precision, responsiveness, performance.

Avoid: meaningless gradients, excessive glassmorphism, generic AI aesthetics, excessive rounded cards, decorative animations, unnecessary 3D, visual noise, template-like layouts.

Complexity is allowed. Visual chaos is not.

---

## Exploration before standardization

Some experiments may be strange, highly specific, inefficient, or unconventional.

Do not optimize everything for reuse. A strange experiment may later become a major pattern.

---

## AI collaboration

The implementer is a partner, not the final design authority.

When asked to create an experiment:

1. Understand the conceptual problem.
2. Propose several visual approaches when appropriate.
3. Implement the selected approach.
4. Keep experiments isolated.
5. Avoid modifying unrelated experiments.
6. Preserve previous working versions.
7. Document the experiment.
8. Make the result easy to reuse.

Never silently redesign the entire Lab.
Never remove an experiment in favor of a “better” version.

---

## Success

The Lab succeeds when a new problem such as “explain a complex biological mechanism” can be answered by searching here and combining patterns (Animated Process Diagram + Scientific Mechanism + Layered Annotation) into a new HTML experience.

The Lab is a medium for thinking, explanation, exploration, and visual storytelling.

---

## Do not copy interfaces. Extract design intelligence.

A website is a specimen, not a source file.

```
REFERENCE → OBSERVE → DECONSTRUCT → ABSTRACT → PATTERN
    → EXPERIMENT → ADAPT → IMPLEMENT → REFLECT → PATTERN LIBRARY
```

The question is never “How do we reproduce this website?”

It is “What design intelligence can we extract and reuse elsewhere?”

Decompose in this order:

Website → Visual language → Layout logic → Information architecture → Interaction language → Motion language → Visualization strategy → Component patterns → Underlying principle

---

## Observation is not interpretation

Every reference has two layers. Keep them separate.

**Observation** — what is directly visible (large type, slow transitions, floating nav).

**Interpretation** — why it might work (hierarchy, contemplative pacing, orientation during exploration).

Never mix the two without labeling which is which.

---

## Patterns, not copies

Do not store “particle animation from Website X.”

Store a named principle at a height that travels:

**Progressive Field Formation** — complex structure emerges gradually from individual elements. Useful for knowledge graphs, mechanisms, ecosystems, networks.

A pattern is never copied into a project. Transfer is always:

Reference → abstract principle → project context → adaptation → implementation

If a pattern does not fit semantically, visually, cognitively, technically, in performance, or on mobile — say so. Do not force reuse.

Preserve originals. Adaptations, variants, and composites are new records.

---

## Pattern maturity

```
DISCOVERED → DECONSTRUCTED → EXPERIMENTAL → VALIDATED → REUSABLE → CORE PATTERN
```

| State | Meaning |
| --- | --- |
| DISCOVERED | Seen in an external reference |
| DECONSTRUCTED | Mechanism understood |
| EXPERIMENTAL | Reimplemented independently in the Lab |
| VALIDATED | Used in a meaningful project context |
| REUSABLE | Stable across more than one project |
| CORE PATTERN | Part of the personal design language |

---

## Operating modes

When asked to **analyze** a site, screenshot, or HTML: enter Critique Mode. Do not recreate it.

When asked to **use this design for a project**: enter Adaptation Mode. Name what remains and what changes before implementing.

When asked to **implement this pattern**: enter Implementation Mode. Smallest change, preserve existing behavior, no unrelated rewrites.

When asked **what design system is this**: enter Reverse Engineering Mode. Infer Design DNA. Do not restyle the source.

Playbooks live in [`modes/`](modes/).

---

## Project context overrides generic patterns

Before touching another repository, write a Project Design Brief (`briefs/`). Audit first. Search the Lab second. Adapt logic, do not import chrome.

The cycle is:

```
Projects teach the Lab → the Lab improves projects
→ new problems → new patterns → expanded language → back to the Lab
```
