# Research Brief HTML → Website

```text
CarryLewis/research_brief  (pinned ref)
  docs/talks/thinking-vault.html
    → public/talks/thinking-vault/index.html
    → https://carrylewis.com/talks/thinking-vault/

Listed on:
  /knowledge/                  (vault index)
  /knowledge/thinking-vault/   (framed player)
  /projects/active/research-brief/
```

## Refresh the talk

```bash
bash scripts/sync-research-brief-talk.sh
# or pin another tip:
# RESEARCH_BRIEF_REF=main bash scripts/sync-research-brief-talk.sh
```

CI copies the same file on every GitHub Pages deploy (`push` to `main`,
`workflow_dispatch`, or `repository_dispatch` type `research-brief-updated`).

The current pin is in `research-brief-embed.ref` (slides branch
`cursor/thinking-vault-talk-03da` until that HTML lands on `main`).

## Optional auto-sync from research_brief

Same Method C pattern as ECG (`docs/ECG_AUTO_SYNC.md`):

1. PAT that can `repository_dispatch` on Carry-website
2. On research_brief, workflow that posts `event_type=research-brief-updated`
3. This repo already listens for that type
