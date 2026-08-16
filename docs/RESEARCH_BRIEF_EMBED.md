# Research Brief HTML → Website

```text
CarryLewis/research_brief  (two pinned refs)

  frontend/                         → public/research-brief/        → /research-brief/
  docs/talks/thinking-vault.html    → public/talks/thinking-vault/  → /talks/thinking-vault/
```

Listed on:

| Surface | Where |
| --- | --- |
| MUJI Observatory homepage | `/knowledge/research-brief/`, `/projects/active/research-brief/`, Knowledge vault index, **Lab Own HTML** |
| Thinking Vault talk | `/knowledge/thinking-vault/`, Knowledge **In iteration**, **Lab Own HTML** — not on the public vault index |

The talk is written and still iterating. It was unpublished from the vault index until a later HTML replaces it; it stays viewable for self-iteration.

Also recorded in `CarryLewis/HTML-Design-Lab` under `projects/research-brief/`.

## Refresh homepage

```bash
bash scripts/sync-research-brief.sh
```

Pin: `research-brief-embed.ref` (`cursor/muji-homepage-prototype-5c8e`).

## Refresh talk

```bash
bash scripts/sync-research-brief-talk.sh
```

Pin: `thinking-vault-embed.ref` (`cursor/thinking-vault-talk-03da`).
