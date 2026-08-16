# Interaction language

Semantic vocabulary. Not a list of event handlers.

For each term: trigger, response, feedback, information change, emotional effect, best use, anti-pattern.

When adapting a project, name the interaction in this vocabulary before choosing a widget.

---

## Reveal

- **Trigger:** hover, focus, or proximity
- **Response:** a secondary layer becomes visible in place
- **Feedback:** the target stays; the gloss appears
- **Information:** a definition, relation, or label that was crowding the overview
- **Emotional effect:** intimacy, “I can ask”
- **Best for:** glosses, tooltips, neighborhood labels
- **Anti-pattern:** using reveal for the only path to essential information
- **Seen in:** playground hover term; [Layered Annotation](../experiments/images/layered-annotation-v01/); [Knowledge Graph](../experiments/visualization/knowledge-graph-v01/)

## Expand

- **Trigger:** click or explicit control
- **Response:** a closed region opens; overview remains
- **Feedback:** the control’s state changes (expanded/collapsed)
- **Information:** nested detail
- **Best for:** progressive disclosure, dossiers, footnotes
- **Anti-pattern:** expand that navigates away or stacks endlessly
- **Seen in:** playground disclosure; knowledge-graph dossier

## Morph

- **Trigger:** state change
- **Response:** one form becomes another without a cut
- **Information:** identity persists across change
- **Best for:** before/after on the same object
- **Anti-pattern:** morphing unrelated objects as if they were the same
- **Seen in:** [Interactive Comparison](../experiments/visualization/comparison-v01/) (wipe as a hard morph)

## Connect

- **Trigger:** hover or selection
- **Response:** edges or counterparts light up
- **Information:** relationship, not just membership
- **Best for:** graphs, comparisons, annotations
- **Anti-pattern:** connecting everything so nothing is a relation
- **Seen in:** knowledge graph neighborhood

## Navigate

- **Trigger:** click, key, or spatial move
- **Response:** the user’s locus changes
- **Information:** where they are in the structure
- **Best for:** maps, canvases, sectioned essays
- **Anti-pattern:** navigation that resets context
- **Seen in:** [Spatial Map](../experiments/layout/spatial-map-v01/); [Infinite Canvas](../experiments/layout/infinite-canvas-v01/)

## Focus

- **Trigger:** hover, click, or zoom
- **Response:** the field recedes; a region stays
- **Information:** “this, in context of that”
- **Best for:** dense diagrams, images, graphs
- **Anti-pattern:** focus that deletes the field (no way back to overview)
- **Seen in:** knowledge graph; layered annotation

## Compare

- **Trigger:** slider, toggle, or paired highlight
- **Response:** two systems occupy one frame
- **Information:** difference on shared structure
- **Best for:** architectures, protocols, languages
- **Anti-pattern:** two separate pages called a comparison
- **Seen in:** interactive comparison

## Trace

- **Trigger:** play, scroll, or pointer
- **Response:** a path is followed through a system
- **Information:** causality or sequence
- **Best for:** mechanisms, processes, timelines, networks
- **Anti-pattern:** a decorative cursor trail
- **Seen in:** [Process Diagram](../experiments/visualization/process-diagram-v01/); [Negative-Feedback Loop](../experiments/scientific/mechanism-v01/)

## Explore

- **Trigger:** pan, zoom, wander
- **Response:** the camera moves; content is not paged
- **Information:** neighborhood and extent
- **Best for:** spatial knowledge, exhibitions, boards
- **Anti-pattern:** fake “explore” that is still a slideshow
- **Seen in:** spatial map; infinite canvas

## Filter

- **Trigger:** control or query
- **Response:** some items recede or leave
- **Information:** a subset against the same axes
- **Best for:** catalogs, matrices
- **Anti-pattern:** filter that silently mutates meaning
- **Seen in:** [gallery](../lab/gallery.html) category filter (lab chrome, not an experiment)

## Zoom

- **Trigger:** wheel, buttons, or pinch
- **Response:** scale changes; labels resolve past a threshold
- **Information:** overview ↔ detail
- **Best for:** maps, canvases, dense figures
- **Anti-pattern:** zoom that only enlarges pixels with no new information
- **Seen in:** spatial map

## Scrub

- **Trigger:** range control or drag on an axis
- **Response:** time or sequence is sampled continuously
- **Information:** “when” as a position
- **Best for:** timelines, processes, comparison wipes
- **Anti-pattern:** a scrubber that skips with no in-between state
- **Seen in:** [Progressive Timeline](../experiments/visualization/progressive-timeline-v01/); comparison slider

## Follow

- **Trigger:** scroll or playhead
- **Response:** a visual stays with the argument
- **Information:** the current stage of a sequence
- **Best for:** scrollytelling, process accompaniment
- **Anti-pattern:** sticky chrome that ignores the argument
- **Seen in:** [Scroll Narrative](../experiments/storytelling/scroll-narrative-v01/)

## Assemble

- **Trigger:** time, scroll, or step
- **Response:** parts arrive in causal order
- **Information:** emergence; the whole did not exist at t0
- **Best for:** systems, narratives, mechanisms
- **Anti-pattern:** assembling decoration
- **Seen in:** scroll narrative; process diagram

## Dissolve

- **Trigger:** blur, close, or leaving a region
- **Response:** emphasis returns to the field
- **Information:** the overview is restored
- **Best for:** ending focus, closing dossiers
- **Anti-pattern:** dissolve that loses the user’s place
- **Seen in:** closing graph dossier; releasing annotation
