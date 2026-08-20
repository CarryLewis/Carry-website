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
| Fine-grained | Resource owner CarryLewis, only **Carry-website**, permission **Contents: Read and write** (Metadata is selected automatically) |

The same token used for ECG (`WEBSITE_DISPATCH_TOKEN` on ECG-stimulator) can be reused here. GitHub will not show that old value again; if you did not save it, create a new PAT.

### Create a fine-grained PAT (recommended)

1. Open [GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens](https://github.com/settings/personal-access-tokens)
2. **Generate new token**
3. Fill the form:
   - **Token name:** `carry-website-dispatch` (any label)
   - **Expiration:** 90 days or longer (you will rotate it later)
   - **Resource owner:** `CarryLewis` (your account or org that owns Carry-website)
   - **Repository access:** Only select repositories → **Carry-website**
   - **Permissions → Repository permissions → Contents:** **Read and write**  
     Metadata/read-only is selected automatically. Leave other permissions as No access.
4. Generate. Copy the string that starts with `github_pat_`. You will not see it again.

Classic PAT also works: [tokens/new](https://github.com/settings/tokens/new), enable **repo**, copy `ghp_…`. It is broader than needed.

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
