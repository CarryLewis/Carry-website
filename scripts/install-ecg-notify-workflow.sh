#!/usr/bin/env bash
# Install Method C auto-sync into CarryLewis/ECG-stimulator.
#
# Prerequisites:
#   1. gh auth with push access to CarryLewis/ECG-stimulator
#   2. A PAT that can repository_dispatch CarryLewis/Carry-website
#      (classic `repo` scope, or fine-grained with Actions write on the website)
#
# Usage:
#   bash scripts/install-ecg-notify-workflow.sh
#   # optional:
#   ECG_BRANCH=main bash scripts/install-ecg-notify-workflow.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TEMPLATE="$ROOT/docs/templates/ecg-notify-website.yml"
ECG_REPO="${ECG_REPO:-CarryLewis/ECG-stimulator}"
ECG_BRANCH="${ECG_BRANCH:-cursor/pathology-ecg-models-fab9}"
WEBSITE_REPO="${WEBSITE_REPO:-CarryLewis/Carry-website}"

if [[ ! -f "$TEMPLATE" ]]; then
  echo "Missing template: $TEMPLATE" >&2
  exit 1
fi

if ! command -v gh >/dev/null; then
  echo "GitHub CLI (gh) is required." >&2
  exit 1
fi

echo "==> Target ECG repo: $ECG_REPO (branch: $ECG_BRANCH)"

if [[ -z "${WEBSITE_DISPATCH_TOKEN:-}" ]]; then
  echo ""
  echo "WEBSITE_DISPATCH_TOKEN is not set in this shell."
  echo "Create a PAT that can access $WEBSITE_REPO, then either:"
  echo "  export WEBSITE_DISPATCH_TOKEN=ghp_..."
  echo "  bash scripts/install-ecg-notify-workflow.sh"
  echo "or set the secret yourself after installing the workflow:"
  echo "  gh secret set WEBSITE_DISPATCH_TOKEN --repo $ECG_REPO"
  echo ""
  read -r -p "Continue installing the workflow file only? [y/N] " ans
  case "$ans" in
    y|Y) ;;
    *) exit 1 ;;
  esac
else
  echo "==> Setting secret WEBSITE_DISPATCH_TOKEN on $ECG_REPO"
  printf '%s' "$WEBSITE_DISPATCH_TOKEN" | gh secret set WEBSITE_DISPATCH_TOKEN --repo "$ECG_REPO"
fi

TMP="$(mktemp -d)"
cleanup() { rm -rf "$TMP"; }
trap cleanup EXIT

echo "==> Cloning $ECG_REPO…"
gh repo clone "$ECG_REPO" "$TMP/ecg" -- --branch "$ECG_BRANCH" --single-branch
cd "$TMP/ecg"

mkdir -p .github/workflows
cp "$TEMPLATE" .github/workflows/notify-website.yml

if git diff --quiet -- .github/workflows/notify-website.yml 2>/dev/null \
  && git ls-files --error-unmatch .github/workflows/notify-website.yml >/dev/null 2>&1; then
  echo "Workflow already up to date on $ECG_BRANCH."
else
  git add .github/workflows/notify-website.yml
  git commit -m "ci: notify Carry-website on push to rebuild ECG embed"
  git push origin "HEAD:$ECG_BRANCH"
  echo "==> Pushed notify-website.yml to $ECG_REPO@$ECG_BRANCH"
fi

# Also install on main so future tip switches keep working
if [[ "$ECG_BRANCH" != "main" ]]; then
  echo "==> Also ensuring workflow exists on main…"
  git fetch origin main
  git checkout -B install-notify-main origin/main
  mkdir -p .github/workflows
  cp "$TEMPLATE" .github/workflows/notify-website.yml
  if git diff --quiet -- .github/workflows/notify-website.yml 2>/dev/null \
    && git ls-files --error-unmatch .github/workflows/notify-website.yml >/dev/null 2>&1; then
    echo "Workflow already present on main."
  else
    git add .github/workflows/notify-website.yml
    git commit -m "ci: notify Carry-website on push to rebuild ECG embed"
    git push origin HEAD:main
    echo "==> Pushed notify-website.yml to $ECG_REPO@main"
  fi
fi

echo ""
echo "Done. Flow:"
echo "  push ECG ($ECG_BRANCH or main)"
echo "    → notify-website.yml"
echo "    → repository_dispatch ecg-updated"
echo "    → $WEBSITE_REPO Deploy to GitHub Pages"
echo "    → https://carrylewis.com/ecg-simulator/"
echo ""
echo "Test without a new ECG commit:"
echo "  gh workflow run \"Notify website to rebuild ECG embed\" --repo $ECG_REPO"
