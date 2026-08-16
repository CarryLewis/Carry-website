#!/usr/bin/env bash
# Copy CarryLewis/HTML-Design-Lab into this site:
#   repo root → public/html-design-lab/  (/html-design-lab/)
#
# The designed Structure Atlas is a Next.js surface at /lab/.
# This script only vendors the isolated experiments + original lab shell.
#
# Optional env:
#   HTML_DESIGN_LAB_REF  — branch / tag / SHA (defaults to html-design-lab-embed.ref)
#   HTML_DESIGN_LAB_SRC  — local checkout instead of cloning
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REF_FILE="$ROOT/html-design-lab-embed.ref"
SRC_DIR="${HTML_DESIGN_LAB_SRC:-}"
TMP_CLONE=""
OUT="$ROOT/public/html-design-lab"

if [[ -z "${HTML_DESIGN_LAB_REF:-}" && -f "$REF_FILE" ]]; then
  # shellcheck disable=SC1090
  source "$REF_FILE"
fi
HTML_DESIGN_LAB_REF="${HTML_DESIGN_LAB_REF:-cursor/html-design-lab-foundation-ee45}"

cleanup() {
  if [[ -n "$TMP_CLONE" && -d "$TMP_CLONE" ]]; then
    rm -rf "$TMP_CLONE"
  fi
}
trap cleanup EXIT

if [[ -z "$SRC_DIR" ]]; then
  TMP_CLONE="$(mktemp -d)"
  SRC_DIR="$TMP_CLONE/html-design-lab"
  echo "Cloning CarryLewis/HTML-Design-Lab @ $HTML_DESIGN_LAB_REF…"
  git clone --depth 1 --branch "$HTML_DESIGN_LAB_REF" \
    https://github.com/CarryLewis/HTML-Design-Lab.git "$SRC_DIR"
fi

SHA="$(git -C "$SRC_DIR" rev-parse --short HEAD)"

if [[ ! -d "$SRC_DIR/experiments" ]]; then
  echo "Experiments folder not found in $SRC_DIR" >&2
  exit 1
fi

echo "Copying HTML Design Lab → $OUT ($SHA)…"
rm -rf "$OUT"
mkdir -p "$OUT"
# Preserve experiment, token, and lab-shell paths. Skip git/editor metadata.
if command -v rsync >/dev/null 2>&1; then
  rsync -a \
    --exclude '.git/' \
    --exclude '.cursor/' \
    --exclude '.gitignore' \
    "$SRC_DIR/" "$OUT/"
else
  cp -R "$SRC_DIR/." "$OUT/"
  rm -rf "$OUT/.git" "$OUT/.cursor"
  rm -f "$OUT/.gitignore"
fi

cat > "$REF_FILE" <<EOF
# Git ref in CarryLewis/HTML-Design-Lab used for the public lab shell
# at /html-design-lab/ (isolated experiments + original gallery).
# The Structure Atlas UI lives in this repo at /lab/.
# Update this file, then run: bash scripts/sync-html-design-lab.sh
# CI reads the same ref on every GitHub Pages deploy.
HTML_DESIGN_LAB_REF=$HTML_DESIGN_LAB_REF
HTML_DESIGN_LAB_SHA=$SHA
EOF

echo "Done. Lab shell: /html-design-lab/  Atlas: /lab/  (ref=$HTML_DESIGN_LAB_REF sha=$SHA)"
