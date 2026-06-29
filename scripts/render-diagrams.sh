#!/usr/bin/env bash
# Render every content/diagrams/*.d2 to light + dark SVGs in public/diagrams/.
# Diagrams are pre-rendered and committed, so CI needs neither d2 nor these fonts.
#   Install d2 once:  curl -fsSL https://d2lang.com/install.sh | sh -s -- --prefix ~/.local
#   Then:             scripts/render-diagrams.sh
set -euo pipefail
cd "$(dirname "$0")/.."

D2="${D2:-$HOME/.local/bin/d2}"
FDIR=.diagram-fonts
mkdir -p "$FDIR" public/diagrams

# Archivo (matches the site's heading font) — static TTFs, fetched once.
base="https://github.com/Omnibus-Type/Archivo/raw/master/fonts/ttf"
for f in Archivo-Regular.ttf Archivo-SemiBold.ttf Archivo-Italic.ttf; do
  [ -f "$FDIR/$f" ] || curl -fsSL "$base/$f" -o "$FDIR/$f"
done
FONTS=(--font-regular "$FDIR/Archivo-Regular.ttf" --font-bold "$FDIR/Archivo-SemiBold.ttf" --font-italic "$FDIR/Archivo-Italic.ttf")

for src in content/diagrams/*.d2; do
  name="$(basename "$src" .d2)"
  "$D2" --theme 1   --pad 28 "${FONTS[@]}" "$src" "public/diagrams/$name-light.svg" >/dev/null
  "$D2" --theme 200 --pad 28 "${FONTS[@]}" "$src" "public/diagrams/$name-dark.svg"  >/dev/null
  echo "rendered $name (light + dark)"
done
