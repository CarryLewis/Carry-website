#!/usr/bin/env bash
# Copy CarryLewis/research_brief talk HTML into public/talks/thinking-vault/
# so it is served at https://carrylewis.com/talks/thinking-vault/
#
# Optional env:
#   RESEARCH_BRIEF_REF  — branch / tag / SHA (defaults to research-brief-embed.ref)
#   RESEARCH_BRIEF_SRC  — local checkout instead of cloning
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REF_FILE="$ROOT/research-brief-embed.ref"
SRC_DIR="${RESEARCH_BRIEF_SRC:-}"
TMP_CLONE=""
OUT_DIR="$ROOT/public/talks/thinking-vault"
TALK_SRC="docs/talks/thinking-vault.html"

if [[ -z "${RESEARCH_BRIEF_REF:-}" && -f "$REF_FILE" ]]; then
  # shellcheck disable=SC1090
  source "$REF_FILE"
fi
RESEARCH_BRIEF_REF="${RESEARCH_BRIEF_REF:-main}"
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
SRC_FILE="$SRC_DIR/$TALK_SRC"

if [[ ! -f "$SRC_FILE" ]]; then
  echo "Talk HTML not found at $SRC_FILE" >&2
  exit 1
fi

echo "Copying $TALK_SRC → $OUT_DIR/index.html ($SHA)…"
mkdir -p "$OUT_DIR"
cp "$SRC_FILE" "$OUT_DIR/index.html"

cat > "$REF_FILE" <<EOF
# Git ref in CarryLewis/research_brief used for the public HTML talk
# at /talks/thinking-vault/
# Update this file, then run: bash scripts/sync-research-brief-talk.sh
# CI reads the same ref on every GitHub Pages deploy.
RESEARCH_BRIEF_REF=$RESEARCH_BRIEF_REF
RESEARCH_BRIEF_SHA=$SHA
TALK_SRC=$TALK_SRC
EOF

echo "Done. Talk path: /talks/thinking-vault/ (ref=$RESEARCH_BRIEF_REF sha=$SHA)"
