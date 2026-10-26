# Labwise project listing

Labwise is presented as a local teacher pilot, not an online grading service.

- Project route: `/projects/prototype/lab-report-assistant/`
- Source: https://github.com/CarryLewis/lab-report-assistant
- Complete download: https://github.com/CarryLewis/lab-report-assistant/archive/refs/heads/main.zip
- Canonical records: `content/projects/lab-report-assistant.json`,
  `content/focus/lab-report-assistant.json` and `content/timeline/labwise-listed.json`.
- The current `src/data` project/focus adapters import these JSON records directly.
  The content database also registers them. Do not maintain a second copy of the
  project prose in TypeScript or JSX.
- Relations are declared in `content/relations/edges.json`; the active relation
  adapter selects the Labwise edges from that same collection.
- The existing AI practice field links to the project and its focus record.

The shared project schema, TypeScript contracts and project template support
optional downloads, setup notes, resource links, workflow steps and screenshots.
Existing demo embeds remain independent of source downloads. Changes to these
optional fields must stay compatible with older project records.

## Screenshot provenance

`public/images/projects/labwise/review-workspace.jpg` comes from
`dist/ai-analysis-verified.png` in the Labwise repository (JPEG bytes despite its
original extension), depicting the fictional growth-curve report.
`visual-review.jpg` comes from `dist/visual-discovery-verified.png`, depicting a
fictional software-test PDF. Both were inspected before publication. Captions date
the historical workflows; they do not assert current feature acceptance.

Never add student reports, teacher credentials, databases or original-file
renderings to this website. Screenshots should use fictional material.

## Update and deployment

Edit the JSON record, check the homepage exploration, Projects index/detail and
`/knowledge/ai/`, and validate source/download links and local image paths.
Run `npx tsc --noEmit` and `npm run build` before pushing.
The existing Deploy to GitHub Pages workflow publishes `out/` on changes to main.
The website does not run the Labwise Python backend or automatically mirror its
README. Update the dated project record when the public implementation changes.
