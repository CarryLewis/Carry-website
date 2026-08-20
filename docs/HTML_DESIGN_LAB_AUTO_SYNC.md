# HTML Design Lab → Website auto-sync (Method C)

```text
HTML-Design-Lab push
  → .github/workflows/notify-website.yml
  → repository_dispatch event_type=html-design-lab-updated
  → Carry-website Deploy to GitHub Pages
  → copy lab shell to public/html-design-lab/
  → https://carrylewis.com/html-design-lab/
```

This is not Lab ↔ production-project import. Those stay manual. Dispatch only rebuilds the public shell.

## One-time setup

### 1. Website side (this repo)

Already wired in `.github/workflows/deploy.yml`:

- `repository_dispatch` types include `html-design-lab-updated`
- For that event, CI embeds `client_payload.ref` when `client_payload.source` is `html-design-lab`
- Ordinary website deploys still use `html-design-lab-embed.ref`

Do not list HTML-Design-Lab `main` as a notify branch until the lab lives there. That `main` is still the empty initial commit.

### 2. Personal access token

Create a PAT that can trigger workflows on **CarryLewis/Carry-website**:

| Kind | Requirement |
|------|-------------|
| Classic | `repo` scope |
| Fine-grained | Resource owner CarryLewis, repository **Carry-website**, permissions: **Contents: Read**, **Actions: Write** (or equivalent that allows `repository_dispatch`) |

The same token used for ECG (`WEBSITE_DISPATCH_TOKEN` on ECG-stimulator) can be reused here.

### 3. Install into HTML-Design-Lab

The workflow file itself is committed in HTML-Design-Lab. You still need the secret on that repo:

```bash
gh secret set WEBSITE_DISPATCH_TOKEN --repo CarryLewis/HTML-Design-Lab
```

Or in the UI:

1. Open [HTML-Design-Lab → Settings → Secrets and variables → Actions](https://github.com/CarryLewis/HTML-Design-Lab/settings/secrets/actions)
2. New repository secret
3. Name: `WEBSITE_DISPATCH_TOKEN`
4. Value: the PAT from step 2

When the public pin moves to another long-lived branch, add that branch to `.github/workflows/notify-website.yml` in HTML-Design-Lab (keep the template in `docs/templates/html-design-lab-notify-website.yml` in sync).

## Verify

```bash
gh workflow run "Notify website to rebuild HTML Design Lab embed" \
  --repo CarryLewis/HTML-Design-Lab

gh run list --repo CarryLewis/Carry-website \
  --workflow "Deploy to GitHub Pages" --limit 3
```

After a real push to `cursor/html-design-lab-foundation-ee45` or `cursor/design-knowledge-guide-aab1`, the site should redeploy within about 1–2 minutes.

`/lab/` (the Structure Bench) is this repo. Lab-shell HTML at `/html-design-lab/` is what auto-sync refreshes. After adding experiments, still update `src/data/lab-catalog.ts` so the bench gains a structure → form row.
