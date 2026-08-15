#!/usr/bin/env bash
# Back-compat alias. Prefer scripts/sync-research-brief.sh
exec "$(cd "$(dirname "$0")" && pwd)/sync-research-brief.sh" "$@"
