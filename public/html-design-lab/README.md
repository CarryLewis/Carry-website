# HTML Design Lab

A laboratory for interactive visual systems.

This is not a website, a portfolio, or a template. It is a long-term HTML visual design laboratory: references are deconstructed, patterns are extracted, experiments test them, and production projects adapt them.

Read [DESIGN_CONSTITUTION.md](DESIGN_CONSTITUTION.md) before adding work. Browse the constitution as HTML in [guide.html](guide.html). Browse experiments in [DESIGN_INDEX.md](DESIGN_INDEX.md) or the [gallery](lab/gallery.html). Own HTML under iteration lives in [projects/](projects/) and the [own HTML index](lab/projects.html). Design knowledge lives in [DESIGN_KNOWLEDGE.md](DESIGN_KNOWLEDGE.md).

## Serve locally

JSON indexes load over HTTP:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

No build step. No framework. Each experiment is a self-contained folder of HTML, CSS, and JavaScript.

## Layout

```
DESIGN_CONSTITUTION.md   living rules
DESIGN_INDEX.md          experiment catalog
DESIGN_KNOWLEDGE.md      reference / pattern / language hub
CHANGELOG.md             lab-level changelog
index.html               lab homepage
guide.html               constitution as a lab page (read this, not the .md)
tokens/                  controllable design tokens + visual languages
lab/                     gallery, knowledge graph, playground, JSON indexes
experiments/             isolated experiments by category
references/              design specimens (analysis, not copies)
patterns/                named principles with maturity
languages/               interaction, motion, visualization vocabularies
dna/                     compact visual-language sketches
briefs/                  project design briefs
projects/                recorded first-party HTML (own pages under iteration)
modes/                   critique / adaptation / implementation / reverse
components/              extract primitives here only when they repeat
```

## Add an experiment

1. Choose a category under `experiments/` (`motion`, `interaction`, `visualization`, `typography`, `layout`, `storytelling`, `scientific`, `data`, `images`).
2. Create a versioned folder: `pattern-name-v01`. Do not overwrite a previous version.
3. Include `README.md`, `index.html`, and whatever `styles.css` / `script.js` / `assets/` the idea needs.
4. Document Name, Problem, Concept, Interaction, Motion, Information Logic, Reusability, Technical Approach, and a one-line changelog.
5. Add an entry to `lab/experiments.json` and `DESIGN_INDEX.md`.
6. If it implements a pattern, link it from `patterns/` and `lab/knowledge.json`.
7. Leave unrelated experiments untouched.

## Add a reference or pattern

Do not paste a website into the repo. Analyze it.

1. Critique Mode: [modes/CRITIQUE.md](modes/CRITIQUE.md)
2. Store the specimen with [references/_template.md](references/_template.md)
3. Extract a named pattern with [patterns/_template.md](patterns/_template.md)
4. Register both in [lab/knowledge.json](lab/knowledge.json) and the markdown indexes
5. If you reimplement it, add an isolated experiment — maturity becomes EXPERIMENTAL

Never copy an interface into a production project. Abstract, then adapt. Write a [briefs/](briefs/) note first.

## Visual languages

`tokens/tokens.css` is the contract. Files in `tokens/languages/` override it. The lab shell uses notebook + editorial. Experiments may load any language, including contradictory ones. See [languages/TRANSLATION.md](languages/TRANSLATION.md).

## Production projects

Do not build production products here. Record first-party pages in [`projects/`](projects/) so the Lab can see them as cases. When a production project hits a visual problem: audit it, write a brief, search the Lab, adapt the principle. Import and export remain manual.

Current recorded pages: Research Brief Observatory homepage (live) and Thinking Vault talk (iterating, unpublished from the public Knowledge index).

## Playground

[lab/playground.html](lab/playground.html) is a controlled specimen of typography, spacing, motion, interaction, visualization, and image treatment.
