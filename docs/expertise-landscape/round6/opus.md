# Opus: what stands for a piece of work on the rock

Plan-oblique matters here. The bench tops are true plan: a circle stays a circle and nothing is foreshortened. The front risers face the viewer and are the only surfaces where something can be read the right way up. Both rejected attempts treated the bench top as a page to stick symbols on. I think the answer is to use the surface that already faces the reader.

## 1. Ranking

1. **Inscription on the riser (El Morro).** The numeral, which is already the main identity, becomes the mark itself, cut into the cliff face that faces the viewer, so nothing sits on the landscape and nothing stands up.
2. **Tinaja.** Natural, set into the rock, made only of rock tones, and it gives the best draft/public pair (dry versus holding water), but its shape can carry only about four types before they blur.
3. **Cairn.** Everyone reads it as "someone was here", but at 6 px a stack of lozenges looks like coins or a burger, and it brings back the standing-object problem that sank the mushrooms.
4. **Benchmark disk.** Accurate and human-made, but at 6 px a bright disc with a dark ring is a radio button, so it fails the same way the engraved glyphs did.
5. **Tafoni / alcove (added).** A small dark rounded hollow in the riser, natural and legible, but it can't carry type and would look like damage.
6. **Fin.** A row of upright slabs reads as a bar chart and adds the second height scale the design refuses.
7. **Petroglyph on varnish.** Beautiful but culturally wrong for a personal CV (see below), and a pecked figure at 6 px becomes a smudge anyway.
8. **Moki steps.** Culturally borrowed for the same reason, and a column of evenly spaced notches reads as a ruler, which is a measure.
9. **Hoodoo, spire, balanced rock, boulder.** This is the family of the first rejected attempt, and a 6 px standing rock is a mushroom or a pin.

**On cultural care.** Petroglyphs and Moki steps belong to Ancestral Puebloan people whose descendants (Hopi, Zuni, the Rio Grande Pueblos) treat many of these marks as living cultural property. Using their look to advertise one person's work is appropriation even when it is abstract, so I would not use either. The El Morro reference is safer because the cited layer is the Spanish and Anglo travellers' inscriptions ("pasó por aquí"): personal signatures, dates and names left by passers-by, which is exactly what a CV is. Even there, the type signs must not borrow from the petroglyph vocabulary on the same rock: no spirals, hands, figures, animals or concentric circles. They should be plain straight-stroke marks like a mason's or surveyor's mark.

## 2. Recipes for the top three

All sizes are in px at the mesa level. Palette roles: **top** (bench top tone), **lit** (lit riser), **shade** (shade riser), **rim** (rim highlight), **ink**, **red** (hover and selection only).

### A. Inscription (recommended)

**Where.** On the lit front riser directly below the bench's front edge: the summit riser for published work, and the next riser down for the other writing. This needs a riser at least 10 px tall at the mesa level. If a riser is shorter, raise its drawn height at this zoom for these two risers only; it is a tick of exaggeration, not a new scale.

**Cell.** A 5×5 type sign, 1.5 px gap, then a two-digit numeral (7 px cap height, about 8 px wide), then a 4 px gap. That is about 19 px per cell, and the line's baseline sits 2 px above the riser foot.

```svg
<g class="work" transform="translate(x,y)">
  <!-- dressed band: bedding lines are suppressed in a 1.5px margin around the line -->
  <!-- groove highlight: light from lower-left lights the upper-right wall of a cut -->
  <path d="M0.5,0 v5 M0.5,0 h4" stroke="var(--rim)" stroke-width="0.6" transform="translate(0.5,-0.5)"/>
  <!-- the cut itself -->
  <path d="M0,0 v5 h5 v-5 z" fill="none" stroke="var(--ink)" stroke-width="1" stroke-linecap="square"/>
  <text x="6.5" y="5" font-size="7.5" font-variant-numeric="tabular-nums"
        fill="var(--ink)" letter-spacing="0.3">07</text>
  <!-- the same text again, offset (+0.4,-0.4) in rim and drawn underneath, to suggest a cut -->
</g>
```

That uses two tones on a lit ground: **ink** for the cut and **rim** for the lit groove wall. The riser itself supplies the third.

**Type signs** are 1 px ink strokes on a 5×5 grid, straight lines only, chosen so they can't be mistaken for digits:

| type | sign |
|---|---|
| paper | open square |
| patent | square with one diagonal |
| system | plus (+) |
| post | single chevron opening right (>) |
| note | short horizontal dash, 3 px |
| talk | V |
| dataset | three short horizontal bars (≡) |
| code | X |

Adding a type later means adding a sign from the same straight-stroke grid.

**Draft.** The inscription is scratched but not yet cut. The sign and the numeral are drawn in **shade** instead of ink, the sign stroke is dashed (`stroke-dasharray: 1 0.8`), and there is no rim highlight. It reads as fainter and unfinished without any new colour.

**Hover and select.** The sign and numeral turn **red**, and a 0.75 px red underline groove runs the width of the cell.

**A row of nine.** A single line about 171 px long reads like one traveller's line on Inscription Rock, oldest at the left. If the mesa front is shorter, wrap to a second line 9 px below, as real inscriptions stack. Never wrap round a corner onto the shaded side riser.

**Failure mode.** It can read as a caption or label rather than as part of the rock. The guards are: no background box, the cut highlight, bedding lines that stop at the band, and numerals in the same muted ink as everything else, never bold. It also fails if a mesa's lit riser is in shade or too short, and that has to be checked mesa by mesa.

### B. Tinaja

**Where.** On the bench top, in a row 3 px behind the front rim.

```svg
<g class="work" transform="translate(x,y)">
  <circle r="3.5" fill="var(--shade)"/>                 <!-- bowl wall in shadow -->
  <circle r="2.6" cx="-0.3" cy="0.3" fill="var(--ink)"/> <!-- water (public only) -->
  <path d="M0.9,-3.4 A3.5,3.5 0 0 1 3.4,-0.9" stroke="var(--rim)"
        stroke-width="0.75" fill="none"/>              <!-- lit far rim, upper-right -->
</g>
```

The pothole is a true circle because the top is plan. The tones are **shade**, **ink** and **rim**. The numeral sits 2 px to the right in ink, 7 px.

**Type** is carried by plan shape, and pothole shapes are all real:

| type | shape |
|---|---|
| paper | round |
| patent | twin, two r=2.5 circles overlapping by 1.5 px |
| system | elongated along a joint, rx 4.5, ry 2.5 |
| post | round with a 1.5 px pour-off notch cut through the front rim |
| note | small, r=2.5 |

Talk, dataset and code have no natural shape left, which is the weakness.

**Draft.** A dry tinaja: the water disc is omitted and the floor shows **shade** with a 1 px **top**-tone sand patch. This is the best draft metaphor of any candidate: it hasn't filled yet.

**A row of nine.** A string of potholes along a bench edge, which is what potholes do along joints.

**Failure mode.** Dark circles in a row read as buttons or bullet holes, and more than five types collapse into "slightly different blobs".

### C. Cairn

**Where.** Standing on the bench top, 3 px behind the rim.

- **Stones:** flat lozenges with rounded ends (rx 1), centred:
  - base 7×2
  - middle 5×1.5
  - cap 3×1.5
- **Fill:** each stone has a **top**-tone upper half and a **lit**-tone lower half, split by a hard horizontal line.
- **Outline:** a 0.5 px **ink** outline round the whole stack.
- **Height:** total 5 px. This must stay under half the shortest riser, so it reads as a token, not a measure.

**Type:**
- Number of stones (1 to 3) gives the broad kind: three for papers and patents, two for systems and code, one for posts and notes.
- The cap's tilt (level, or tilted 20°) splits each pair.

**Draft.** The cap stone lies beside the base on the bench, not yet placed.

**A row of nine.** A trail of ducks along the bench, which is honest Plateau imagery.

**Failure mode:**
- At 6 px the stack is a burger, a coin pile or a mushroom.
- Stone counts look like a bar chart of importance.
- The type code needs a legend.

## 3. Recommendation

Use the **inscription**: each work is cut into the lit cliff face below its bench, as a small straight-stroke type sign followed by its numeral. A draft is only scratched (shade tone, dashed, no highlight), and the work turns red when hovered or selected.

The method page sentence:

> "Each piece of work is cut into the cliff below its bench the way travellers signed Inscription Rock at El Morro, with a plain mark for what kind of work it is and its number; a draft is scratched but not yet cut."

## 4. One thing not to do

Do not take the type signs from rock-art motifs (spirals, hands, figures, concentric rings, zigzag "water" lines). The moment a sign looks like a petroglyph, the map is claiming Ancestral Puebloan imagery to decorate a CV. Keep every sign to straight strokes on a 5×5 grid, the way a surveyor or stonemason marks rock.
