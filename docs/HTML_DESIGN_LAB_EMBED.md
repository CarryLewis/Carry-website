# HTML Design Lab → Website

```text
CarryLewis/HTML-Design-Lab  (pinned ref)
  experiments/ + lab/ + tokens/  →  public/html-design-lab/  →  /html-design-lab/

Designed viewing surface (this repo):
  /lab/                  Structure Bench (structure → form → live specimen)
  /lab/<experiment-id>/  permalink for one specimen

Lab shell (vendored HTML):
  /html-design-lab/              notebook index
  /html-design-lab/guide.html    constitution: pipeline, architecture, thesis
  /html-design-lab/lab/knowledge.html
```

Listed on:

- Observatory focus band
- `/projects/active/html-design-lab/`
- Primary nav: **Lab**

The bench is not a copy of the lab gallery. It files each experiment by
**information structure** (relationship, sequence, process, …) and uses
the site’s own page grammar: labeled sections, ruled index rows, and a
framed demo — so form-follows-structure is an Observatory page, not a
separate instrument.

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

The current pin is in `html-design-lab-embed.ref`.

## Auto-sync from HTML-Design-Lab

Same Method C pattern as ECG. Details: [`HTML_DESIGN_LAB_AUTO_SYNC.md`](./HTML_DESIGN_LAB_AUTO_SYNC.md).

1. PAT that can `repository_dispatch` on Carry-website
2. Secret `WEBSITE_DISPATCH_TOKEN` on HTML-Design-Lab
3. Workflow `.github/workflows/notify-website.yml` on the embed branches
   (do not enable on lab `main` until the lab lives there)

After adding experiments in HTML-Design-Lab, also update
`src/data/lab-catalog.ts` so the bench gains a structure → form row,
pattern, and use-case tags.
