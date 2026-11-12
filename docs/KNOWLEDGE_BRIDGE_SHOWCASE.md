# Personal Knowledge Bridge website showcase

Published routes: `/knowledge-bridge/` and `/en/knowledge-bridge/`.

## Visitor progression

1. Begin with the reason to keep notes: return to a question and reconsider it.
2. Explain three principles: retain original words; retain sources; reread linked notes.
3. Follow five selectable stages: capture, reading, confirmed connection, local graph, reflection.
4. Select graph nodes to inspect two illustrative questions and their shared theme.
5. Explain tool roles and distinguish implemented sync from manual work and planned capabilities.
6. Link to the source repository, local setup and platform status.

Discoverability: third homepage selected work, Thinking page, project list and bilingual project record at `/projects/active/personal-knowledge-bridge/`.

## Evidence and content boundaries

Public source reviewed on 2026-11-12:
- https://github.com/CarryLewis/personal-knowledge-bridge/blob/main/README.md (blob `41d042bcd1bb7164b3cffe3f6122b2243b926996`)
- https://github.com/CarryLewis/personal-knowledge-bridge/blob/main/docs/platforms/README.md (blob `797f1d09514e47c0db406ae138279c4be4d1a3f3`)

The walkthrough adapts the README's question about understanding. It uses illustrative questions, not personal notebook content, book excerpts or a running integration. It calls no external notes API, stores no visitor input, and has no account configuration. AI capture happens in the user's chosen tools and depends on permissions.

Implemented: run-triggered, one-way Notion → Obsidian sync and explicit theme/relationship links. Manual: excerpt selection, connection confirmation, rereading and updating the original record. Planned: bulk import, continuous sync and Obsidian → Notion writeback. The graph is an illustrative navigation surface, not a real Obsidian screenshot or proof of semantic agreement.

## Maintenance and release

Copy and demo examples: `src/data/knowledge-bridge.ts`. Page and interaction: `src/components/bridge/`. Keep both languages aligned when upstream capabilities change. Verify source status before promoting any planned step to implemented.

The production source is `CarryLewis/Carry-website` on GitHub. Publish through its existing `Deploy to GitHub Pages` workflow on `main`, retaining `public/CNAME` for `carrylewis.com`. Verify https://carrylewis.com/knowledge-bridge/ after deployment. Do not publish this workflow to Sites or migrate domain routing to Sites. Keep subsequent website changes in this GitHub repository. No private notebook data is published.
