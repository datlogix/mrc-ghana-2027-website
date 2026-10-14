#!/usr/bin/env bash
# Builds the static test preview into ./out for GitHub Pages.
#   BASE_PATH=/mrc-ghana-2027-preview scripts/build-preview.sh
# The /api route needs a server, so it is moved aside for this build only.
set -euo pipefail
cd "$(dirname "$0")/.."
BASE_PATH="${BASE_PATH:-/mrc-ghana-2027-preview}"
STASH="$(mktemp -d)"
restore() { [ -d "$STASH/api" ] && mv "$STASH/api" src/app/api; rm -rf "$STASH"; }
trap restore EXIT
mv src/app/api "$STASH/api"
rm -rf out .next
STATIC_EXPORT=1 NEXT_PUBLIC_STATIC_PREVIEW=1 NEXT_PUBLIC_BASE_PATH="$BASE_PATH" npx next build
touch out/.nojekyll   # let GitHub Pages serve the _next/ folder
echo "Static preview built in ./out (base path $BASE_PATH)"
