# HTML Design Lab → Website

```text
CarryLewis/HTML-Design-Lab  (pinned ref)
  experiments/ + lab/ + tokens/  →  public/html-design-lab/  →  /html-design-lab/

Designed viewing surface (this repo):
  /lab/                  Structure Bench (structure → form → live specimen)
  /lab/<experiment-id>/  permalink for one specimen
```

Listed on:

- Observatory focus band
- `/projects/active/html-design-lab/`
- Primary nav: **Lab**

The bench is not a copy of the lab gallery. It files each experiment by
**information structure** (relationship, sequence, process, …) and uses
that mapping as the interface: a neighborhood map of structures, a live
specimen stage, and a dossier that records why this form.

## Refresh from HTML-Design-Lab

```bash
bash scripts/sync-html-design-lab.sh
# or pin another tip:
# HTML_DESIGN_LAB_REF=main bash scripts/sync-html-design-lab.sh
# or a local checkout:
# HTML_DESIGN_LAB_SRC=/path/to/html-design-lab bash scripts/sync-html-design-lab.sh
```

CI copies the lab shell on every GitHub Pages deploy (`push` to `main`,
`workflow_dispatch`, or `repository_dispatch` type `html-design-lab-updated`).

The current pin is in `html-design-lab-embed.ref` (foundation branch
`cursor/html-design-lab-foundation-ee45` until that work lands on `main`).

After adding experiments in HTML-Design-Lab, also update
`src/data/lab-catalog.ts` so the bench gains a structure → form row,
pattern, and use-case tags.
