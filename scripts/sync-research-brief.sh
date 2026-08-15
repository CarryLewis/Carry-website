#!/usr/bin/env bash
# Copy CarryLewis/research_brief public HTML into this site:
#   frontend/                    → public/research-brief/     (/research-brief/)
#   docs/talks/thinking-vault.html → public/talks/thinking-vault/  (if present)
#
# Optional env:
#   RESEARCH_BRIEF_REF  — branch / tag / SHA (defaults to research-brief-embed.ref)
#   RESEARCH_BRIEF_SRC  — local checkout instead of cloning
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REF_FILE="$ROOT/research-brief-embed.ref"
SRC_DIR="${RESEARCH_BRIEF_SRC:-}"
TMP_CLONE=""
FRONTEND_SRC="frontend"
TALK_SRC="docs/talks/thinking-vault.html"
OUT_HOME="$ROOT/public/research-brief"
OUT_TALK="$ROOT/public/talks/thinking-vault"

if [[ -z "${RESEARCH_BRIEF_REF:-}" && -f "$REF_FILE" ]]; then
  # shellcheck disable=SC1090
  source "$REF_FILE"
fi
RESEARCH_BRIEF_REF="${RESEARCH_BRIEF_REF:-main}"
FRONTEND_SRC="${FRONTEND_SRC:-frontend}"
TALK_SRC="${TALK_SRC:-docs/talks/thinking-vault.html}"

cleanup() {
  if [[ -n "$TMP_CLONE" && -d "$TMP_CLONE" ]]; then
    rm -rf "$TMP_CLONE"
  fi
}
trap cleanup EXIT

if [[ -z "$SRC_DIR" ]]; then
  TMP_CLONE="$(mktemp -d)"
  SRC_DIR="$TMP_CLONE/research_brief"
  echo "Cloning CarryLewis/research_brief @ $RESEARCH_BRIEF_REF…"
  git clone --depth 1 --branch "$RESEARCH_BRIEF_REF" \
    https://github.com/CarryLewis/research_brief.git "$SRC_DIR"
fi

SHA="$(git -C "$SRC_DIR" rev-parse --short HEAD)"
FRONTEND_DIR="$SRC_DIR/$FRONTEND_SRC"

if [[ ! -d "$FRONTEND_DIR" || ! -f "$FRONTEND_DIR/index.html" ]]; then
  echo "Frontend HTML not found at $FRONTEND_DIR/index.html" >&2
  exit 1
fi

echo "Copying $FRONTEND_SRC → $OUT_HOME ($SHA)…"
rm -rf "$OUT_HOME"
mkdir -p "$OUT_HOME"
cp -R "$FRONTEND_DIR/." "$OUT_HOME/"

TALK_FILE="$SRC_DIR/$TALK_SRC"
if [[ -f "$TALK_FILE" ]]; then
  echo "Copying $TALK_SRC → $OUT_TALK/index.html"
  mkdir -p "$OUT_TALK"
  cp "$TALK_FILE" "$OUT_TALK/index.html"
else
  echo "Talk HTML not on this ref; leaving vendored $OUT_TALK if present"
fi

cat > "$REF_FILE" <<EOF
# Git ref in CarryLewis/research_brief used for the public HTML
# at /research-brief/ (MUJI Observatory homepage prototype).
# Update this file, then run: bash scripts/sync-research-brief.sh
# CI reads the same ref on every GitHub Pages deploy.
RESEARCH_BRIEF_REF=$RESEARCH_BRIEF_REF
RESEARCH_BRIEF_SHA=$SHA
FRONTEND_SRC=$FRONTEND_SRC
TALK_SRC=$TALK_SRC
EOF

echo "Done. Homepage: /research-brief/ (ref=$RESEARCH_BRIEF_REF sha=$SHA)"
