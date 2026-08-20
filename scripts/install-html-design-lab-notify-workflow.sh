#!/usr/bin/env bash
# Install Method C auto-sync into CarryLewis/HTML-Design-Lab.
#
# Prerequisites:
#   1. gh auth with push access to CarryLewis/HTML-Design-Lab
#   2. A PAT that can repository_dispatch CarryLewis/Carry-website
#      (classic `repo` scope, or fine-grained with Actions write on the website)
#
# Usage:
#   bash scripts/install-html-design-lab-notify-workflow.sh
#   # optional:
#   LAB_BRANCH=cursor/html-design-lab-foundation-ee45 bash scripts/install-html-design-lab-notify-workflow.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TEMPLATE="$ROOT/docs/templates/html-design-lab-notify-website.yml"
LAB_REPO="${LAB_REPO:-CarryLewis/HTML-Design-Lab}"
LAB_BRANCH="${LAB_BRANCH:-cursor/html-design-lab-foundation-ee45}"
WEBSITE_REPO="${WEBSITE_REPO:-CarryLewis/Carry-website}"

if [[ ! -f "$TEMPLATE" ]]; then
  echo "Missing template: $TEMPLATE" >&2
  exit 1
fi

if ! command -v gh >/dev/null; then
  echo "GitHub CLI (gh) is required." >&2
  exit 1
fi

echo "==> Target HTML Design Lab repo: $LAB_REPO (branch: $LAB_BRANCH)"

if [[ -z "${WEBSITE_DISPATCH_TOKEN:-}" ]]; then
  echo ""
  echo "WEBSITE_DISPATCH_TOKEN is not set in this shell."
  echo "Create a PAT that can access $WEBSITE_REPO, then either:"
  echo "  export WEBSITE_DISPATCH_TOKEN=ghp_..."
  echo "  bash scripts/install-html-design-lab-notify-workflow.sh"
  echo "or set the secret yourself after installing the workflow:"
  echo "  gh secret set WEBSITE_DISPATCH_TOKEN --repo $LAB_REPO"
  echo ""
  read -r -p "Continue installing the workflow file only? [y/N] " ans
  case "$ans" in
    y|Y) ;;
    *) exit 1 ;;
  esac
else
  echo "==> Setting secret WEBSITE_DISPATCH_TOKEN on $LAB_REPO"
  printf '%s' "$WEBSITE_DISPATCH_TOKEN" | gh secret set WEBSITE_DISPATCH_TOKEN --repo "$LAB_REPO"
fi

TMP="$(mktemp -d)"
cleanup() { rm -rf "$TMP"; }
trap cleanup EXIT

echo "==> Cloning $LAB_REPO…"
gh repo clone "$LAB_REPO" "$TMP/lab" -- --branch "$LAB_BRANCH" --single-branch
cd "$TMP/lab"

mkdir -p .github/workflows
cp "$TEMPLATE" .github/workflows/notify-website.yml

if git diff --quiet -- .github/workflows/notify-website.yml 2>/dev/null \
  && git ls-files --error-unmatch .github/workflows/notify-website.yml >/dev/null 2>&1; then
  echo "Workflow already up to date on $LAB_BRANCH."
else
  git add .github/workflows/notify-website.yml
  git commit -m "ci: notify Carry-website on push to rebuild HTML Design Lab embed"
  git push origin "HEAD:$LAB_BRANCH"
  echo "==> Pushed notify-website.yml to $LAB_REPO@$LAB_BRANCH"
fi

echo ""
echo "Done. Flow:"
echo "  push HTML-Design-Lab ($LAB_BRANCH)"
echo "    → notify-website.yml"
echo "    → repository_dispatch html-design-lab-updated"
echo "    → $WEBSITE_REPO Deploy to GitHub Pages"
echo "    → https://carrylewis.com/html-design-lab/"
echo ""
echo "Test without a new lab commit:"
echo "  gh workflow run \"Notify website to rebuild HTML Design Lab embed\" --repo $LAB_REPO"
echo ""
echo "Do not install this workflow on HTML-Design-Lab main until that branch"
echo "holds the lab. Current main is the empty initial commit."
