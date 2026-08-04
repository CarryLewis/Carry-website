# Prompt for ECG-stimulator agent — enable website auto-sync

Copy everything inside the fenced block below into the AI agent for
**https://github.com/CarryLewis/ECG-stimulator**.

Website side is already done on **CarryLewis/Carry-website** (listens for
`repository_dispatch` / `ecg-updated`). This prompt only covers the ECG repo.

---

````text
You are working in the GitHub repo CarryLewis/ECG-stimulator.

## Goal

Enable Method C auto-sync so that when this ECG repo is pushed, it notifies
CarryLewis/Carry-website to rebuild and redeploy the embedded demo at:

  https://carrylewis.com/ecg-simulator/

The website already listens for:

  repository_dispatch
  event_type: ecg-updated

It rebuilds from client_payload.ref (if present), otherwise from its pinned
ref in ecg-embed.ref (currently: cursor/pathology-ecg-models-fab9).

Do NOT modify Carry-website. Only change ECG-stimulator.

## Tasks

### 1. Add workflow file

Create `.github/workflows/notify-website.yml` with EXACTLY this content:

```yaml
name: Notify website to rebuild ECG embed

on:
  push:
    branches:
      - main
      - cursor/pathology-ecg-models-fab9
  workflow_dispatch:

concurrency:
  group: notify-website
  cancel-in-progress: true

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: Check dispatch token
        env:
          TOKEN: ${{ secrets.WEBSITE_DISPATCH_TOKEN }}
        run: |
          if [[ -z "$TOKEN" ]]; then
            echo "::error::Missing secret WEBSITE_DISPATCH_TOKEN on ECG-stimulator."
            echo "Create a PAT with access to CarryLewis/Carry-website, then:"
            echo "  gh secret set WEBSITE_DISPATCH_TOKEN --repo CarryLewis/ECG-stimulator"
            exit 1
          fi

      - name: Trigger Carry-website deploy (repository_dispatch)
        env:
          GH_TOKEN: ${{ secrets.WEBSITE_DISPATCH_TOKEN }}
        run: |
          gh api repos/CarryLewis/Carry-website/dispatches \
            -f event_type='ecg-updated' \
            -f "client_payload[ref]=${{ github.ref_name }}" \
            -f "client_payload[sha]=${{ github.sha }}" \
            -f "client_payload[source]=ecg-stimulator"
          echo "Dispatched ecg-updated → CarryLewis/Carry-website (ref=${{ github.ref_name }})"
```

### 2. Put the workflow on BOTH branches

GitHub only runs a workflow from the branch that received the push.
The website currently embeds `cursor/pathology-ecg-models-fab9`, so the file
MUST exist on that branch. Also add it to `main` for the future.

Preferred approach:

1. Commit the workflow on a new branch from current tip (or from
   `cursor/pathology-ecg-models-fab9`).
2. Open / merge a PR into `cursor/pathology-ecg-models-fab9`.
3. Also open / merge (or cherry-pick) the same workflow commit onto `main`.

If you cannot merge, at least push the file onto both branch tips.

### 3. Secret WEBSITE_DISPATCH_TOKEN

This workflow needs a repo secret on CarryLewis/ECG-stimulator named:

  WEBSITE_DISPATCH_TOKEN

Value = a GitHub PAT that can call repository_dispatch on Carry-website:

- Classic PAT: `repo` scope
- Fine-grained: access to CarryLewis/Carry-website; permissions that allow
  repository_dispatch / Actions write (Contents: Read + Actions: Write)

If you can set secrets via `gh`:

```bash
# User must provide the PAT value — do NOT invent or hardcode a token
gh secret set WEBSITE_DISPATCH_TOKEN --repo CarryLewis/ECG-stimulator
```

If you cannot set secrets (no permission / no token available):

1. Still commit and push the workflow file to both branches.
2. In your final message, tell the user exactly:

   Go to:
   https://github.com/CarryLewis/ECG-stimulator/settings/secrets/actions
   → New repository secret
   → Name: WEBSITE_DISPATCH_TOKEN
   → Value: <their PAT with access to Carry-website>

Do NOT print any real token values into commits, logs, or PR bodies.

### 4. Optional README note

Add a short section to README.md (keep it brief):

```markdown
## Website embed auto-sync

Pushes to `main` or `cursor/pathology-ecg-models-fab9` trigger
`notify-website.yml`, which asks Carry-website to rebuild
https://carrylewis.com/ecg-simulator/ via `repository_dispatch` (`ecg-updated`).

Requires repo secret `WEBSITE_DISPATCH_TOKEN` (PAT with access to Carry-website).

Manual test:
```bash
gh workflow run "Notify website to rebuild ECG embed"
```
```

### 5. Verify

After the workflow is on the branch and the secret exists:

```bash
gh workflow run "Notify website to rebuild ECG embed" --repo CarryLewis/ECG-stimulator

# Within ~1–2 minutes, website should show a Deploy run triggered by repository_dispatch:
gh run list --repo CarryLewis/Carry-website --workflow "Deploy to GitHub Pages" --limit 5
```

Success criteria:

- Workflow file exists on `main` AND `cursor/pathology-ecg-models-fab9`
- Secret `WEBSITE_DISPATCH_TOKEN` is set (or user was given exact UI steps)
- Manual `workflow_dispatch` of "Notify website to rebuild ECG embed" succeeds
- Carry-website shows a `repository_dispatch` / `ecg-updated` deploy run

### Out of scope

- Do not change ECG app source, Vite config, or disease models for this task
- Do not modify CarryLewis/Carry-website
- Do not force-push or delete branches

## Context (already done on the website)

- Live demo path: `/ecg-simulator/` on https://carrylewis.com
- Website deploy workflow listens for `ecg-updated`
- Website pin file `ecg-embed.ref` currently points at
  `cursor/pathology-ecg-models-fab9`
- Docs on website: `docs/ECG_AUTO_SYNC.md`
````
