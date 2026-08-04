#!/usr/bin/env bash
# Build CarryLewis/ECG-stimulator and embed the static output under
# public/ecg-simulator/ so it is served at https://carrylewis.com/ecg-simulator/
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC_DIR="${ECG_SRC_DIR:-}"
TMP_CLONE=""
OUT_DIR="$ROOT/public/ecg-simulator"

cleanup() {
  if [[ -n "$TMP_CLONE" && -d "$TMP_CLONE" ]]; then
    rm -rf "$TMP_CLONE"
  fi
}
trap cleanup EXIT

if [[ -z "$SRC_DIR" ]]; then
  TMP_CLONE="$(mktemp -d)"
  SRC_DIR="$TMP_CLONE/ECG-stimulator"
  echo "Cloning CarryLewis/ECG-stimulator…"
  git clone --depth 1 https://github.com/CarryLewis/ECG-stimulator.git "$SRC_DIR"
fi

echo "Building ECG stimulator from $SRC_DIR…"
(
  cd "$SRC_DIR"
  npm ci
  npm run build
)

echo "Copying dist → $OUT_DIR"
rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"
cp -R "$SRC_DIR/dist/." "$OUT_DIR/"

echo "Done. Demo path: /ecg-simulator/"
