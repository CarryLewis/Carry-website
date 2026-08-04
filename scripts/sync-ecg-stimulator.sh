#!/usr/bin/env bash
# Build CarryLewis/ECG-stimulator and embed the static output under
# public/ecg-simulator/ so it is served at https://carrylewis.com/ecg-simulator/
#
# Optional env:
#   ECG_REF      — branch / tag / SHA (defaults to value in ecg-embed.ref)
#   ECG_SRC_DIR  — local checkout to build instead of cloning
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REF_FILE="$ROOT/ecg-embed.ref"
SRC_DIR="${ECG_SRC_DIR:-}"
TMP_CLONE=""
OUT_DIR="$ROOT/public/ecg-simulator"

if [[ -z "${ECG_REF:-}" && -f "$REF_FILE" ]]; then
  # shellcheck disable=SC1090
  source "$REF_FILE"
fi
ECG_REF="${ECG_REF:-main}"

cleanup() {
  if [[ -n "$TMP_CLONE" && -d "$TMP_CLONE" ]]; then
    rm -rf "$TMP_CLONE"
  fi
}
trap cleanup EXIT

if [[ -z "$SRC_DIR" ]]; then
  TMP_CLONE="$(mktemp -d)"
  SRC_DIR="$TMP_CLONE/ECG-stimulator"
  echo "Cloning CarryLewis/ECG-stimulator @ $ECG_REF…"
  git clone --depth 1 --branch "$ECG_REF" \
    https://github.com/CarryLewis/ECG-stimulator.git "$SRC_DIR"
fi

SHA="$(git -C "$SRC_DIR" rev-parse --short HEAD)"
echo "Building ECG stimulator from $SRC_DIR ($SHA)…"
(
  cd "$SRC_DIR"
  npm ci
  npm run build
)

echo "Copying dist → $OUT_DIR"
rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"
cp -R "$SRC_DIR/dist/." "$OUT_DIR/"

# Persist the resolved ref for the next sync / CI
cat > "$REF_FILE" <<EOF
# Git ref in CarryLewis/ECG-stimulator used for the embedded demo at /ecg-simulator/
# Update this file, then run: bash scripts/sync-ecg-stimulator.sh
# CI reads the same ref on every GitHub Pages deploy.
ECG_REF=$ECG_REF
ECG_SHA=$SHA
EOF

echo "Done. Demo path: /ecg-simulator/ (ref=$ECG_REF sha=$SHA)"
