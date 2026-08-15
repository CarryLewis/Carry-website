# Research Brief HTML → Website

```text
CarryLewis/research_brief  (pinned ref)
  frontend/   → public/research-brief/   → https://carrylewis.com/research-brief/
  docs/talks/thinking-vault.html
              → public/talks/thinking-vault/  (when that file exists on the pin)

Listed on:
  /knowledge/                     (vault index)
  /knowledge/research-brief/      (framed MUJI homepage)
  /knowledge/thinking-vault/      (framed talk, if vendored)
  /projects/active/research-brief/
```

## Refresh from research_brief

```bash
bash scripts/sync-research-brief.sh
# or pin another tip:
# RESEARCH_BRIEF_REF=main bash scripts/sync-research-brief.sh
```

CI copies the same tree on every GitHub Pages deploy (`push` to `main`,
`workflow_dispatch`, or `repository_dispatch` type `research-brief-updated`).

The current pin is in `research-brief-embed.ref` (homepage prototype branch
`cursor/muji-homepage-prototype-5c8e` until that HTML lands on `main`).

## Optional auto-sync from research_brief

Same Method C pattern as ECG (`docs/ECG_AUTO_SYNC.md`):

1. PAT that can `repository_dispatch` on Carry-website
2. On research_brief, workflow that posts `event_type=research-brief-updated`
3. This repo already listens for that type
