# ECG → Website auto-sync (Method C)

```text
ECG-stimulator push
  → .github/workflows/notify-website.yml
  → repository_dispatch event_type=ecg-updated
  → Carry-website Deploy to GitHub Pages
  → rebuild ECG → copy to public/ecg-simulator/
  → https://carrylewis.com/ecg-simulator/
```

## One-time setup

### 1. Website side (this repo)

Already wired in `.github/workflows/deploy.yml`:

- `repository_dispatch` types: `[ecg-updated]`
- Builds whatever ref is in `client_payload.ref`, else `ecg-embed.ref`

Merge/deploy this documentation branch if it is not on `main` yet.

### 2. Personal access token

Create a PAT that can trigger workflows on **CarryLewis/Carry-website**:

| Kind | Requirement |
|------|-------------|
| Classic | `repo` scope |
| Fine-grained | Resource owner CarryLewis (or your account), repository **Carry-website**, permissions: **Contents: Read**, **Actions: Write** (or equivalent that allows `repository_dispatch`) |

### 3. Install into ECG-stimulator

On a machine logged into `gh` **with push access** to ECG-stimulator:

```bash
cd /path/to/Carry-website
export WEBSITE_DISPATCH_TOKEN=ghp_...   # the PAT from step 2
bash scripts/install-ecg-notify-workflow.sh
```

This will:

1. Set secret `WEBSITE_DISPATCH_TOKEN` on `CarryLewis/ECG-stimulator`
2. Commit `notify-website.yml` to the current embed branch (`main`)
3. Also ensure the same workflow is on any other notify branches if listed

Or copy manually:

```bash
cp docs/templates/ecg-notify-website.yml \
  ../ECG-stimulator/.github/workflows/notify-website.yml
# commit + push on the embed branch and on main
gh secret set WEBSITE_DISPATCH_TOKEN --repo CarryLewis/ECG-stimulator
```

## Verify

```bash
# From ECG repo / any machine with the PAT:
gh workflow run "Notify website to rebuild ECG embed" --repo CarryLewis/ECG-stimulator

# Watch website deploy:
gh run list --repo CarryLewis/Carry-website --workflow "Deploy to GitHub Pages" --limit 3
```

After a real ECG code push to `main` or `cursor/pathology-ecg-models-fab9`, the site should redeploy within about 1–2 minutes.

## Notes

- This cloud agent **cannot** push to `ECG-stimulator` or create secrets; step 3 must be run with your own GitHub credentials.
- Keep `ecg-embed.ref` pointed at the branch you want embedded. When you move the tip to `main`, update that file and re-run the install script with `ECG_BRANCH=main` if needed.
