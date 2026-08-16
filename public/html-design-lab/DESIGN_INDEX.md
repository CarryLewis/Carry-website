# Design Index

Human catalog of experiments. The machine-readable source of truth is [`lab/experiments.json`](lab/experiments.json). Browse visually in [`lab/gallery.html`](lab/gallery.html).

Categories: Motion · Interaction · Visualization · Typography · Layout · Storytelling · Scientific · Data · Images

Complexity and reusability: `low` | `medium` | `high`

---

## Storytelling

### Scroll Narrative — v01

- **Path:** [`experiments/storytelling/scroll-narrative-v01/`](experiments/storytelling/scroll-narrative-v01/)
- **Problem:** Sequential ideas dumped as a wall of text lose causal order.
- **Concept:** A vertical essay whose stages pin while a diagram is constructed in causal order.
- **Tags:** scroll, narrative, pin, progressive-construction
- **Complexity:** medium
- **Interaction:** scroll
- **Motion:** staged reveal; diagram parts enter as the argument needs them
- **Reusable for:** interactive essays, research explanations, onboarding to a system
- **Language:** editorial

---

## Visualization

### Interactive Knowledge Graph — v01

- **Path:** [`experiments/visualization/knowledge-graph-v01/`](experiments/visualization/knowledge-graph-v01/)
- **Problem:** Relationship networks are unreadable when every node is equally present.
- **Concept:** An SVG graph that stays quiet until hover focuses a neighborhood and click opens a dossier.
- **Tags:** graph, network, hover, click, relationships
- **Complexity:** high
- **Interaction:** hover + click
- **Motion:** neighborhood emphasis; dossier slide
- **Reusable for:** knowledge systems, research mapping, Thinking Database
- **Language:** scientific

### Progressive Timeline — v01

- **Path:** [`experiments/visualization/progressive-timeline-v01/`](experiments/visualization/progressive-timeline-v01/)
- **Problem:** Chronologies shown all at once flatten sequence and overwhelm detail.
- **Concept:** Overview → event → detail. Scrub or scroll reveals events in time.
- **Tags:** timeline, scrub, overview-detail, sequence
- **Complexity:** medium
- **Interaction:** scrub + click
- **Motion:** events emerge along the axis; detail panel replaces, does not stack
- **Reusable for:** project histories, disease progression, research chronologies
- **Language:** data

### Animated Process Diagram — v01

- **Path:** [`experiments/visualization/process-diagram-v01/`](experiments/visualization/process-diagram-v01/)
- **Problem:** Processes described as `A → B → C` hide activation, change, and emergence.
- **Concept:** The animation *is* the explanation: signal propagates, a node activates, state changes, a result emerges.
- **Tags:** process, flow, causality, animation
- **Complexity:** medium
- **Interaction:** play / step / reset
- **Motion:** signal travel, activation, state morph
- **Reusable for:** system demonstrations, scientific mechanisms, onboarding
- **Language:** scientific

### Interactive Comparison — v01

- **Path:** [`experiments/visualization/comparison-v01/`](experiments/visualization/comparison-v01/)
- **Problem:** Two systems described in adjacent paragraphs cannot be compared on shared structure.
- **Concept:** Two models on shared axes; a slider isolates difference.
- **Tags:** comparison, slider, overlay, matrix
- **Complexity:** medium
- **Interaction:** slider + toggle
- **Motion:** corresponding parts align or peel apart
- **Reusable for:** before/after protocols, competing architectures, A/B of visual languages
- **Language:** data

---

## Layout

### Spatial Information Map — v01

- **Path:** [`experiments/layout/spatial-map-v01/`](experiments/layout/spatial-map-v01/)
- **Problem:** Hierarchical menus hide neighborhood and make overview feel like a table of contents.
- **Concept:** A pan-and-zoom field of concepts. Distance implies relatedness; zoom is reading.
- **Tags:** spatial, pan, zoom, overview-detail
- **Complexity:** high
- **Interaction:** pan + zoom + click
- **Motion:** camera moves; labels resolve with scale
- **Reusable for:** knowledge observatories, system maps, exhibition plans
- **Language:** spatial

### Infinite Canvas — v01

- **Path:** [`experiments/layout/infinite-canvas-v01/`](experiments/layout/infinite-canvas-v01/)
- **Problem:** Page scroll forces a single reading order onto material that is spatial and clustered.
- **Concept:** An unbounded canvas of notes and diagrams. Clusters emerge as you pan; there is no page end.
- **Tags:** canvas, pan, clusters, spatial-navigation
- **Complexity:** high
- **Interaction:** pan + click
- **Motion:** inertial pan; cluster focus
- **Reusable for:** research boards, digital notebooks, exhibition backrooms
- **Language:** notebook

---

## Scientific

### Negative-Feedback Loop — v01

- **Path:** [`experiments/scientific/mechanism-v01/`](experiments/scientific/mechanism-v01/)
- **Problem:** Feedback is often drawn as a pretty circle that does not encode sensor, integrator, effector, or variable.
- **Concept:** A labeled control loop. A disturbance moves the variable; the sensor reports; the integrator computes error; the effector opposes the change.
- **Tags:** mechanism, feedback, physiology, simulation
- **Complexity:** high
- **Interaction:** disturb + play
- **Motion:** variable drift, error signal, effector response, return toward setpoint
- **Reusable for:** physiology explainers, control systems, Medical Education Simulator (pattern only)
- **Language:** simulator

---

## Images

### Layered Image Annotation — v01

- **Path:** [`experiments/images/layered-annotation-v01/`](experiments/images/layered-annotation-v01/)
- **Problem:** A caption under an image cannot point at structure inside the image.
- **Concept:** Numbered hotspots on one image; callouts layer on; unused regions dim.
- **Tags:** annotation, hotspot, image, focus
- **Complexity:** medium
- **Interaction:** hover + click
- **Motion:** focus dimming; callout fade
- **Reusable for:** anatomy, scientific figures, screenshot evidence, museum labels
- **Language:** exhibition

---

## Typography

### Kinetic Typography — v01

- **Path:** [`experiments/typography/kinetic-type-v01/`](experiments/typography/kinetic-type-v01/)
- **Problem:** Motion applied to type often decorates instead of encoding hierarchy and sequence.
- **Concept:** A short statement whose entrance order and emphasis are the argument.
- **Tags:** kinetic, typography, sequence, hierarchy
- **Complexity:** medium
- **Interaction:** replay
- **Motion:** staggered reveal by syntactic role, not bounce
- **Reusable for:** essay openings, exhibition titles, conceptual framing
- **Language:** kinetic

---

## Motion / Interaction / Data

No standalone experiments in these categories yet. Motion and interaction are demonstrated inside the experiments above and in the [playground](lab/playground.html). Data-specific charting is deferred until a distribution problem appears.

---

## Playground

- **Path:** [`lab/playground.html`](lab/playground.html)
- **Role:** controlled specimen of typography, spacing, motion, interaction, visualization, and image treatment, with a language switcher.

---

## Design knowledge

Pattern records extracted from these experiments live in [`DESIGN_KNOWLEDGE.md`](DESIGN_KNOWLEDGE.md) and [`patterns/INDEX.md`](patterns/INDEX.md). Browse the graph in [`lab/knowledge.html`](lab/knowledge.html).
