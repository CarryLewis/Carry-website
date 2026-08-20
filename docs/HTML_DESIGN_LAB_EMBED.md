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

CI copies the lab shell on every GitHub Pages deploy (`push` to `main` or **Run workflow**).

The current pin is in `html-design-lab-embed.ref`.

## Manual refresh (type the lab ref)

No PAT. Open [Deploy to GitHub Pages](https://github.com/CarryLewis/Carry-website/actions/workflows/deploy.yml):

1. **Run workflow**
2. Use workflow from: `main` (or this PR branch until it is merged)
3. **html_design_lab_ref:** type the HTML-Design-Lab branch, tag, or SHA  
   Example: `cursor/design-knowledge-guide-aab1`  
   Leave blank to embed whatever is in `html-design-lab-embed.ref`

Do not type HTML-Design-Lab `main` until the lab lives there. That `main` is still the empty initial commit.

After adding experiments in HTML-Design-Lab, also update
`src/data/lab-catalog.ts` so the bench gains a structure → form row,
pattern, and use-case tags.
