# Colorado Plateau rock for the "map of work" relief: geology, masters, rules

Research date 2026-11-08. Every URL below was fetched or HTTP-checked (200) during this session. Two usgs.gov pages and one shadedreliefarchive page refuse curl but opened through the fetch tool; they are flagged. Hex values for real formations are **my estimates** based on the quoted colour words. They are not measured.

---

## (a) Rules an SVG author can apply directly (40 lines)

1. Colour by **elevation band, not by item**: one stratum colour per terrace level (plateau = S0 ... top terrace = S4). Every mesa's level-k top uses the same S_k fill. Holmes's plates and the NPS column read as rock because a band keeps one colour across every butte.
2. Follow Imhof's **"higher is brighter"**: S0 (plateau) is darkest and S4 (summit) is lightest, with roughly 8 to 10 L* between bands. The geology agrees: white Kaibab, Coconino and Claron White sit over red Hermit, Supai and Claron Pink.
3. Use only five hues for tops. Risers are the **same hue, darker**, so they add no new colours. Derive them as lit riser = top −8 L* and shade riser = top −22 L* (light theme). In the dark theme use −5 and −13.
4. A riser must always be darker than the top above it. Flat tops are never shaded or yellow-toned (Imhof masks flat areas).
5. Light comes from the **lower left**, not the upper left. Plan-oblique relief puts upper-left light's shadows on the faces toward the reader (Jenny and Patterson 2007). Shade each riser segment by its outward normal: normals pointing SW to S get the lit riser tone, normals pointing SE to E get the shade riser tone. Use 2 tones, not a gradient.
6. Do not draw cast shadows on the terrace below. Jenny and Patterson say cast shadows make plan-oblique relief look misregistered.
7. Cliff-and-slope: risers are vertical, so treat every riser as a **cliff** (hard cap: limestone or sandstone). Draw the softer **slope** unit as a narrow, slightly darker apron of the lower top's colour (S_k −4 L*), 2 to 4 px wide, at the foot of each riser. That is the Hermit or Bright Angel bench. Keep it optional and fixed-width.
8. Cap overhang: draw each terrace top's outline 0.75 to 1 px proud of its riser (an extra top-colour stroke on the front edge only). A hard rim over a recessed face is the one cue that turns chipboard into caprock.
9. Rim line: give each top's front edge a 0.5 px hairline 6 to 8 L* lighter than the top. That is the sunlit lip Holmes always leaves white. Do not draw it on back edges.
10. Bedding: draw 1 to 2 horizontal hairlines on each riser, parallel to the top edge (offset the top contour straight down by fixed fractions of riser height, e.g. 0.35 and 0.7). Use stroke 0.5 px and ink = the riser colour −12 L* at about 45 % opacity. Bedding at one height must line up across every mesa, as in Holmes's panoramas.
11. Vertical joint ticks only on the **shade** risers: 1 px ticks spaced 5 to 8 px apart, 40 to 70 % of riser height, and never crossing bedding lines. Swiss rule: strokes never cross.
12. Optional desert varnish: a 1 to 2 px darker band (riser −10 L*) hanging from the top edge of the tallest risers (S3 and S4) only, with a few vertical drips. NPS notes manganese varnish appears as black streaks where water runs over cliff lips.
13. Hoodoos (item blocks): body = S1 Claron Pink riser tone, cap = S4 Claron White top tone. The cap is 1 px wider than the body on each side and 1.5 to 2 px tall. This one detail makes Bryce recognisable.
14. Optional fluting: 1 notch (0.5 px inset) at mid-height of each hoodoo body, the "neck" of differential erosion. Leave it out below 8 px block height.
15. Rows, not scatter: place hoodoos in short lines of 3 to 6 along one direction, like a fin broken into a row. Bryce hoodoos come from walls, then windows, then pillars (NPS).
16. Fins (if wanted for one mesa, e.g. long-thin work): draw 2 to 4 parallel narrow terraces of equal height separated by 2 to 3 px slots in the shelf/sea colour. Use Entrada salmon (S2) with joint ticks. Do not draw arches; they need undercut geometry the model does not have.
17. Lithologic texture is an **optional, per-band** pattern at very low contrast: dots for sandstone bands (S2, S3), brick for the limestone cap (S4), dashes for shale slope aprons (S0, S1). Apply it to risers only, never to tops (tops carry labels). Use FGDC 607, 627 and 620 geometry scaled to 0.5×.
18. Minimum sizes: dot radius ≥ 0.6 px, dot spacing ≥ 3 px, dash 3 px on and 1.5 px off, brick course height ≥ 3 px. Below 6 px riser height, drop the pattern and keep only one bedding hairline.
19. Pattern opacity: light theme ink at 18 to 25 %, dark theme ink (light ink) at 12 to 18 %. If it is visible at arm's length, it is too strong.
20. Procedural grain (feTurbulence) is allowed only as a 3 to 4 % luminance wobble on S2 and S3 tops in the light theme. Do not use it in the dark theme, and do not use it with print or `prefers-reduced-transparency`. Lines beat noise at 6 to 10 px.
21. Aerial perspective: do not fade lower tops toward blue. The model is small, so contrast reduction reads as "disabled". Instead, increase **riser** contrast with height: S3 and S4 shade risers get the full −22 L*, while S0 and S1 get −18 L*. Swiss rock drawing raises contrast at peaks.
22. Shelf (reading queue) = pale jade-grey and flat, with no risers and no texture. One 0.5 px shoreline hairline sits where the plateau riser meets the shelf.
23. Sea = near-neutral page tone, a hair cooler than the paper, so the warm rock is the only warm mass on the page.
24. Dark theme: keep "higher is brighter" but compress L* to 30 to 63 and cut chroma by about 35 %. The summit must not exceed L* 65 or it glows. Add the 0.5 px rim highlight (rule 9) at L* +10; it is the main depth cue in the dark theme.
25. Dark theme risers: shade riser contrast against the top ≥ 1.5:1. Lit risers sit only 5 L* below the top. Hairlines switch to light ink (L* about 80) at low opacity, not black.
26. Label ink (checked, WCAG): light theme use #14100E on every top (5.2:1 on S0 #AB7B6F, higher on lighter bands; #2B2420 only reaches 4.2:1 on S0). Dark theme switches ink by band: #F2ECE4 on S0-S2 (8.0 / 6.2 / 4.6:1), #14100E on S3-S4 (4.9 / 6.6:1).
27. Keep the red at **low chroma** (C* ≤ 24). Real Supai red photographs at about C* 30 to 40, but at that chroma the page goes "Western theme park". Muted reads as print lithograph (Holmes's Bien lithos are earthy, not saturated).
28. Redwall trick: if a sixth tone is ever needed, a grey limestone face stained red at the top is the honest Grand Canyon motif. Grey riser, warm top 2 px of riser. Avoid unless asked.
29. Vertical exaggeration: the riser height to terrace-step ratio should resemble Holmes's cliffs, about 1:3 to 1:2 of the bench width. Jenny and Patterson's plan-oblique inclination of 30 to 50° corresponds to riser height ≈ 0.85 to 1.7 × the true step.
30. Stroke joins: round joins on contours, butt caps on hairlines, `vector-effect: non-scaling-stroke` so hairlines stay 0.5 px at every zoom.
31. Talus (optional, plateau only): 3 to 5 short radiating 0.5 px strokes fanning out from the foot of tall risers on the S0 plateau. Holmes's slopes are lit fans of fine lines. Use sparingly.
32. Never outline tops in black. Holmes and swisstopo use tone, not outlines. Outline only the riser bottom (where it meets the lower bench) with a 0.5 px line at riser −15 L*.
33. Keep hue order warm-to-pale (red → orange → salmon → buff → cream). Hue drifts from h≈40° (red) to h≈88° (cream). That is the Grand Staircase in one stack.
34. Legend: label bands with formation-style names only if wanted ("Kaibab", "Coconino" ...). Otherwise keep the names in the code as tokens (`--rock-s4-kaibab`).
35. CSS tokens: define `--rock-sN-top`, `--rock-sN-lit`, `--rock-sN-shade` for N = 0..4 per theme, plus `--rock-ink`, `--rock-rim`, `--shelf`, `--sea`. That gives 15 rock values from 5 hues.
36. Hover/focus: raise the hovered mesa's tops by +4 L* and darken its shade risers by −4 L*. Do not tint it a new colour.
37. Test at 1×: at 6 px riser height you should see the tone step, one bedding line and the cap overhang, nothing else.
38. Test in greyscale: the five tops must stay distinguishable (ΔL* ≥ 8). The palette below meets this.
39. Test for colour-vision deficiency: the palette is lightness-coded, so deuteranopia only loses the red/cream hue difference, not the order.
40. When in doubt, remove texture before you remove the cap overhang or the light/shade riser split.

---

## (b) Palettes

Targets: CIELAB L* steps of 8 to 10 for tops; risers derived in LCh (same hue −3° to −8°). Contrast ratios (WCAG formula) top vs shade riser: about 1.9 to 2.2 (light) and about 1.55 to 1.6 (dark).

### Light theme

| Token | Top | Lit riser | Shade riser | L* top | Borrowed from |
|---|---|---|---|---|---|
| S4 summit | `#EBE5DA` | `#D5CEC2` | `#AFA79E` | 91 | **Kaibab Formation** "cream to greyish-white" / Claron **White Member** (hoodoo caps) |
| S3 | `#DCCDB9` | `#C8B6A1` | `#A2907F` | 83 | **Coconino Sandstone**, "white to cream", "buff white cross bedded sandstone" |
| S2 | `#D0AC93` | `#BD967D` | `#96725F` | 73 | **Entrada Sandstone, Slick Rock Member** (Arches fins), "pale reddish-orange", "pale orange" |
| S1 | `#C2947B` | `#AF7E65` | `#885B49` | 65 | **Claron Formation Pink Member** (Bryce), iron-oxide reds, oranges and yellows |
| S0 plateau | `#AB7B6F` | `#98655A` | `#71443E` | 56 | **Hermit Formation / Supai Group**, "deep, rust-colored red", "reddish brown siltstone" |
| Shelf (reading queue) | `#D7E6E0` | (no riser) | | 90 | **Bright Angel Shale** "various shades of green" / Tonto Platform bench, pushed pale |
| Sea | `#F0F5F3` | | | 96 | Neutral, slightly cool paper; not a formation |
| Ink (bedding, joints) | `#56423D` @ 25 to 45 % | | | 30 | Desert-varnish brown |
| Varnish band | `#6A554F` @ 60 % | | | 38 | **Desert varnish** (Mn-rich black to Fe-rich brown) |

### Dark theme

| Token | Top | Lit riser | Shade riser | L* top | Borrowed from |
|---|---|---|---|---|---|
| S4 summit | `#9D9890` | `#908B82` | `#7C766F` | 63 | Kaibab / Claron White |
| S3 | `#8A8072` | `#7F7364` | `#6B5F53` | 54 | Coconino |
| S2 | `#7D6656` | `#725949` | `#5E463A` | 45 | Entrada Slick Rock |
| S1 | `#6D5142` | `#624536` | `#4E3328` | 37 | Claron Pink |
| S0 plateau | `#5B4039` | `#51342E` | `#3D2320` | 30 | Hermit / Supai |
| Shelf | `#303B3A` | | | 24 | Bright Angel green-grey |
| Sea | `#1F2526` | | | 14 | Neutral (Vishnu "dark grey or black" if a source is wanted) |
| Ink (light ink) | `#CFC5BC` @ 12 to 18 % | | | 80 | |
| Rim highlight | top +10 L* (e.g. S4 rim `#B5B0A8`) | | | | sunlit lip |
| Varnish band | `#352A27` @ 60 % | | | 18 | Desert varnish |

### Reference colour estimates for the real formations (rim to river)

| Formation | Lithology, cliff/slope | Colour words (source) | Hex guess |
|---|---|---|---|
| Kaibab | cherty/sandy limestone, **cliff** (rim) | "cream to a greyish-white" [bobspixels/kaibab.org]; "white to gray limestone", "resistant cliff forming" [UCLA Day] | `#E3DCCB` |
| Toroweap | limestone, gypsum, red beds, **slope** with low cliff | "yellow to grey" [kaibab.org]; "Slope-forming" [UCLA] | `#CFC3A2` |
| Coconino | aeolian quartz sandstone, **cliff** (most recognisable) | "white to cream colored" [kaibab.org]; "Buff white cross bedded sandstone" [UCLA]; "bold cliffs" [NPS GRCA] | `#E8DCC4` |
| Hermit | shale/siltstone, **slope** (Esplanade bench) | "deep, rust-colored red" [kaibab.org]; "reddish brown siltstone, mudstone" [UCLA]; "melt into slopes" [NPS] | `#A0523C` |
| Supai Group | red sandstone and siltstone; ledgy cliffs and slopes | "red sandstones and siltstones" [NPS grcatime]; red shale with "tan" sandstone caps [kaibab.org] | `#A9614A` |
| Redwall | limestone/dolomite, **cliff** 500 to 800 ft | true colour "light-gray, high-purity carbonate"; red is "a superficial iron-oxide stain leached from the overlying Supai Group and Hermit Formation" [utahgeology.com]; "forms distinct red cliffs" [NPS] | stained face `#A86A50`, true rock `#B9B6AE` |
| Muav | limestone, **cliffs or small ledges** | "Dark gray to rusty orange" [UCLA]; "dark, cliff-forming ledges" [USGS Phantom Ranch] | `#8C8478` |
| Bright Angel | shale, **slope** (Tonto Platform) | "various shades of green" [kaibab.org]; "Green, purple, and reddish brown" [UCLA] | `#8F9479` |
| Tapeats | sandstone, **cliff** | "dark brown" [kaibab.org]; "tan and reddish brown cliff-forming" [UCLA] | `#7A5A44` |
| Vishnu | schist, craggy inner-gorge cliffs | "dark grey or black" [kaibab.org]; "craggy cliffs of the Granite Gorges" [NPS] | `#3E3A3A` |
| Claron Pink Member (Bryce) | limestone/siltstone/mudstone, hoodoos | iron oxides give "red, oranges, and yellows ... Pink Member"; manganese gives "pink and purple" patches [NPS BRCA via search]; "fragile pink cliffs" [NPS wayside] | `#D99A78` |
| Claron White Member (Bryce) | limestone (dolomite caps per ranger accounts) | "change from orange to white marks the beginning of the Upper Member" [NPS] | `#EDE6DA` |
| Entrada, Slick Rock Member (Arches) | aeolian sandstone, fins and arches | "pale reddish-orange" (Moab Happenings); "Pale orange" (Wikipedia); "upper lighter red layer" [NPS 1988 brochure] | `#D48A62` |
| Dewey Bridge Member (Arches) | soft muddy sandstone under fins | "chocolate colored base" [NPS ARCH]; "lower brick-red layer, soft and crumbly" [NPS 1988] | `#7E4A3A` |

Thicknesses from the NPS/USGS "three sets of rocks" column: Kaibab 350 ft, Toroweap 250, Coconino 300, Hermit 300, Supai 1000, Redwall 500, Muav 450, Bright Angel 350, Tapeats 0 to 200.

---

## (c) Findings per question

### Q1. Stratigraphy as a colour code; cliff-and-slope

- Sequence and colours: see the table above. Sources: http://www.bobspixels.com/kaibab.org/geology/gc_layer.htm (kaibab.org redirects there), https://faculty.epss.ucla.edu/~mday/index.php/grand-canyon/, https://nps.gov/grca/learn/nature/geologicformations.htm, https://www.nps.gov/articles/000/grcatime-layered-paleozoic-rock.htm.
- Redwall is red only on the surface. It is light-grey limestone stained by Supai/Hermit wash: https://utahgeology.com/?p=6988 ("superficial iron-oxide stain leached from the overlying Supai Group and Hermit Formation"; cliff "averages 500 to 800 feet").
- Bryce: Pink Member (iron oxides give red, orange and yellow; manganese gives purple) under the White Member. See https://www.nps.gov/places/deciphering-nature-s-palette-wayside.htm ("upper white member and lower pink member", "fragile pink cliffs") and https://www.nps.gov/brca/learn/nature/hoodoos.htm.
- Arches: Slick Rock Member forms the fins and arches, over the soft "chocolate colored" Dewey Bridge (https://www.nps.gov/arch/learn/nature/rock-strata.htm). Colour words come from https://npshistory.com/publications/arch/brochures/geology-1988.pdf ("upper lighter red layer ... stronger more smoothly weathering") and https://geology.utah.gov/tag/slick-rock-member.
- **Cliff-and-slope rule.** NPS: "harder, erosion-resistant rocks such as the Coconino Sandstone and the Redwall Limestone have eroded into bold cliffs ... softer layers melt into slopes like the Tonto Platform (Bright Angel Shale) and the Esplanade (Hermit Shale)" (nps.gov/grca geologicformations). Illustrators show it as a **stepped profile**. The NPS student figure (https://www.nps.gov/grca/learn/nature/images/figure1_3.png on https://www.nps.gov/grca/learn/education/geology.htm) draws Coconino, Redwall, Muav and Tapeats as vertical walls and Hermit, Supai and Bright Angel as inclined ramps. The NPS/USGS column (https://commons.wikimedia.org/wiki/File:Stratigraphy_of_the_Grand_Canyon.png) uses the same stair profile, with step depth proportional to unit softness.
- **Design consequence:** the model's vertical risers = cliff formers. The flat tops = benches formed where a soft unit has stripped back (Esplanade on Supai, Tonto on Tapeats). The flat-terrace geometry is geologically honest; it is literally how the Grand Canyon benches work. The only missing piece is the slope apron (rule 7).

### Q2. How the masters drew it

**William Henry Holmes, Dutton's Atlas (1882)**
- Panorama from Point Sublime, three sheets (XV to XVII, Julius Bien lithography): https://commons.wikimedia.org/wiki/File:Panorama_from_Point_Sublime_-_Grand_Canyon.jpg, https://www.davidrumsey.com/maps149.html, https://blogs.loc.gov/maps/2022/06/a-landmark-atlas-of-the-grand-canyon/ (panoramas "emphasize the vertical scale"). Linda Hall: "His drawings of strata were exact and accurate"; he composed by moving his viewpoint, not the landforms (https://www.lindahall.org/about/news/perspectives-on-the-grand-canyon-willian-henry-holmes/).
- What I observed in Part II (Looking South):
  1. **Continuity**: each band (white Kaibab and Coconino rim, red Supai ledges, Redwall wall) runs at the same height across every butte and temple. The eye reads stratigraphy by matching bands across gaps. *Rule: the same stratum colour sits at the same terrace level on every mesa.*
  2. **Tone, not outline**: forms are separated by tone steps. Cliff faces are mid-to-dark red with fine **vertical** strokes. Bench tops and talus slopes are the lightest cream, drawn with fine **radiating** lines. There are no black outlines. *Rule: tops lightest, risers darker, hairlines only.*
  3. **Horizontal bedding hairlines** stack inside each cliff, giving many thin parallel lines that make scale. *Rule: 1 to 2 bedding hairlines per riser.*
  4. **Aerial perspective**: distant temples are paler and lower in contrast; foreground cliffs are darkest. On a small model, use this only as "contrast increases with height" (rule 21).
- Also see Sheet VI, The Grand Cañon at the foot of the Toroweap: https://commons.wikimedia.org/wiki/File:Grand_Canyon_at_the_foot_of_the_Toroweap_-_looking_east,_William_Henry_Holmes.png

**Eduard Imhof / Swiss relief shading**
- Jenny and Hurni 2006, *Swiss-Style Colour Relief Shading* (https://mail.colororacle.org/berniejenny/pdf/2006_JennyHurni_SwissStyleShading.pdf):
  1. Imhof's hypsometric principle is "higher is brighter", with "relatively light and more natural colours". His small-scale scale "ranges with increasing elevation from a light grey-blue-green by light olive to brownish-reddish yellow tones, and finally to white". *Rule: S0 darkest to S4 lightest; cool shelf below warm rock.*
  2. Sun-lit slopes are toned yellow and shadow slopes purple-blue. "Flat areas are masked to avoid yellow" toning. *Rule: shade risers drift cool (hue −8°), lit risers warm (hue −3°, chroma ×1.1); flat tops are never toned.*
  3. Aerial perspective: low flat areas are colder and lower in contrast, and contrast sharpens "towards the highest peaks" (Becker, then Imhof). *Rule 21.*
- Light from the upper left (NW) is the convention for planimetric maps (Jenny et al. 2014; Imhof). **But for plan-oblique** Jenny and Patterson 2007 (https://cartographicperspectives.org/index.php/journal/article/download/cp57-jenny-patterson/pdf/1605) say: "Light emanating from the lower left ... represents the optimal direction for illuminating plan oblique relief. Illumination from the upper left ... places shadows on slopes facing the reader". They also advise against cast shadows, and they report inclination angles of 30 to 50° as "most visually pleasing". *Rule 5 and rule 6.*
- Imhof plates to look at: https://socks-studio.com/2015/01/21/the-map-as-an-artistic-territory-relief-shading-works-and-studies-by-eduard-imhof/ and https://en.wikipedia.org/wiki/Eduard_Imhof

**USGS / FGDC lithologic patterns (FGDC-STD-013-2006, Section 37)**
- Pattern names via https://pystrat.readthedocs.io/en/stable/swatches.html: 607 "Massive Sand or Sandstone", 620 "Clay or Clay Shale", 627 "Limestone". I verified the geometry from the SVG tracings in https://github.com/davenquinn/geologic-patterns (tile about 54 pt):
  - **627 limestone**: 14 continuous horizontal lines about 4 pt apart plus 60 short vertical ticks, offset row to row (brick). Stroke 0.3 pt.
  - **620 shale**: 18 rows of horizontal dashes, dash about 6.4 pt, gap about 2.5 pt, rows about 3 pt apart. Stroke 0.3 pt.
  - **607 sandstone**: 328 dots (zero-length round-cap strokes, 0.7 pt) in a random scatter.
  - Transferable rules: horizontal = sedimentary, so every texture on a riser is horizontal or dotted, never diagonal. Use brick only on the limestone cap band, and dots on sandstone. Scale the tile to about 0.5× for screen and use ink at ≤ 25 % (rules 17 to 19).
- The standard itself is at https://ngmdb.usgs.gov/fgdc_gds/geolsymstd.php (403 to scripts; listed by search). An archived Section 37 is at https://webarchive.library.unt.edu/eot2008/20090510220740/http:/pubs.usgs.gov/tm/2006/11A02/FGDCgeostdTM11A2web_Sec37.pdf; the URL returns 200, but the archived file is an HTML wrapper.

**NPS strata diagrams**
- https://www.nps.gov/grca/learn/nature/images/figure1_3.png: black-and-white cross-section using exactly these conventions. Coconino and Tapeats are dots, Redwall and Muav brick, Hermit, Supai and Bright Angel dashes, Vishnu contorted wavy lines. Cliffs are vertical and slopes inclined.
- https://commons.wikimedia.org/wiki/File:Stratigraphy_of_the_Grand_Canyon.png ("Grand Canyon's Three Sets of Rocks"): stair profile with the same patterns as faint overprint on a single flat tint.
  1. One flat tint per group, with the pattern as faint overprint. This is exactly the "five tints + optional pattern" approach.
  2. The profile steps out under every soft unit.
  3. Contacts are thin lines; unconformities are wavy lines (could mark the shoreline/shelf edge).

### Q3. Bryce and Arches forms; what can be drawn honestly

| Form | Distinguishing visual traits | Drawable with terraces + risers + blocks? | Minimal trigger |
|---|---|---|---|
| **Mesa** | flat top wider than tall, cliff all round, hard cap | Yes, this is the native unit | cap overhang + one bedding line |
| **Butte** | top narrower than height, isolated | Yes: a small single-terrace island at S3/S4 | tall riser relative to top |
| **Bench / platform** (Esplanade, Tonto) | broad flat step below a cliff | Yes: each terrace step | lighter top + slope apron |
| **Hoodoo** | harder pale cap over softer pink column; bulges and necks from differential erosion; stand in rows broken out of walls ("walls, windows, and then ... individual hoodoos", NPS BRCA) | Yes, as the uniform blocks | white cap 1 px wider than pink body; rows of 3 to 6 |
| **Fin** | thin, tall, parallel walls separated by narrow slots along joints; Slick Rock Member "prone to vertical fracturing" (NPS ARCH) | Partly: parallel narrow terraces with slots | parallel spacing + vertical joint ticks |
| **Window / arch** | opening through a fin, undercut by softer Dewey Bridge | No. Needs a see-through void and an undercut riser. Do not fake it | — |
| **Saddle** | low notch between two higher tops | Yes: two S3/S4 terraces joined by an S2 neck | lower top colour between two caps |

Capstone: rangers describe walls "capped by dolomite, a harder layer of limestone which protects the softer layers below"; Live Science calls it a "white cap". NPS confirms only dolostone in the Claron and ice wedging (water expands about 9 %), so treat "dolomite cap" as interpretive. Arches: Dewey Bridge "often erodes faster than the Entrada Sandstone above it, which forms top-heavy 'mushroom' rocks" (NPS ARCH). That supports the cap-overhang rule.

Desert varnish (https://www.nps.gov/articles/desertvarnish.htm): "black tapestries on sandstone cliffs" where water runs over. Mn-rich varnish is black and Fe-rich is red to orange. It belongs on the upper, tallest risers (rule 12) and never on tops.

### Q4. Texture without noise

- Swiss rock drawing (Jenny, Gilgen, Geisthövel, Marston, Hurni 2014, https://mail.colororacle.org/berniejenny/pdf/2014_Jenny_etal_DesignPrinciplesForSwiss-styleRockDrawing.pdf):
  - Average density is "seven strokes per 2 mm" (spacing < 0.3 mm). Light faces have 4 to 5 strokes per 2 mm; shaded faces up to 9 thick strokes. Mean width is about 0.12 mm; shaded 0.22 to 0.26 mm; lit 0.06 to 0.1 mm "possibly with interruptions". *Screen translation: shade risers get about 2× the line density and about 2× the stroke width of lit risers; lit-face lines may be broken.*
  - "Rock strokes should not cross over one another": crossing turns into black spots. *Rule 11.*
  - "Loose" rock (rubble, **soft sandstone**) is "drawn with strokes placed along the direction of contour lines". That supports horizontal bedding hairlines on sandstone risers.
  - The shading model has a primary light face (brightest), a primary shade face (darkest) and intermediate secondaries. Contrast is stronger at peaks and weaker in lower areas. *Rules 5 and 21.*
  - Rock faces are drawn "as seen from the ground" and the footprint is enlarged to make room. This is the same move as plan-oblique risers.
- swisstopo context: https://www.swisstopo.admin.ch/en/hidden-images-20161221 (rock-drawing cartographer Paul Ehrlich).
- **When procedural grain is acceptable**: only at ≤ 4 % luminance amplitude, on large flat sandstone tops, in the light theme, as a static baked pattern (an `feTurbulence` baseFrequency of about 0.9, numOctaves 1, desaturated). Lines carry structure; grain only kills the flat-vector sheen. At 6 to 10 px risers, grain is invisible or reads as JPEG noise, so do not use it there.

### Q5. Light

- **Which face is lit**: light from the lower left (SW to WSW) for plan-oblique (Jenny and Patterson 2007). Riser segments whose outward normal points between about 200° and 260° (screen: down-left) are lit. Normals between about 100° and 170° (down-right) are in shade. Back edges are hidden by the shear anyway.
- **How much darker**: Swiss practice is roughly 2× stroke density and width between light and shade faces. In flat tone, use shade riser ≈ top −20 to −24 L* (WCAG contrast about 2:1) and lit riser ≈ top −6 to −10 L* (about 1.3:1). Riser vs riser (lit vs shade) about 14 L*. These values meet the "tops always lightest" constraint.
- **Tops lighter with height?** Yes. That is Imhof's hypsometric "higher is brighter", which is a colour-scale rule, not aerial perspective. Combine it with Becker and Imhof's aerial-perspective rule only as *contrast* increasing with height. Do not haze the lower bands.
- **Dark mode**: keep the order (higher = lighter) but compress to L* 30 to 63. Risers sit −5 (lit) and −13 (shade). Add a 0.5 px rim highlight at the top's front edge (+10 L*), the strongest dark-mode depth cue. Use light ink hairlines at 12 to 18 %. The sea is the darkest field (L* 14) so the land reads as raised.

---

## (d) Verified references worth looking at

1. Holmes, Panorama from Point Sublime, Part II looking south: https://commons.wikimedia.org/wiki/File:Panorama_from_Point_Sublime_-_Grand_Canyon.jpg
2. Holmes, The Grand Cañon at the foot of the Toroweap (Sheet VI): https://commons.wikimedia.org/wiki/File:Grand_Canyon_at_the_foot_of_the_Toroweap_-_looking_east,_William_Henry_Holmes.png
3. Same plate (alternate scan): https://commons.wikimedia.org/wiki/File:Foot_of_Toroweap_Looking_East_by_William_Holmes.jpg
4. David Rumsey, Point Sublime Part I record: https://www.davidrumsey.com/maps149.html (image http://www.davidrumsey.com/rumsey/Size2/D0009/00092156.jpg)
5. LOC blog on the Dutton atlas: https://blogs.loc.gov/maps/2022/06/a-landmark-atlas-of-the-grand-canyon/
6. Linda Hall on Holmes's method: https://www.lindahall.org/about/news/perspectives-on-the-grand-canyon-willian-henry-holmes/
7. NPS cross-section with FGDC-style patterns: https://www.nps.gov/grca/learn/nature/images/figure1_3.png (page: https://www.nps.gov/grca/learn/education/geology.htm)
8. NPS/USGS stair-profile column "Three Sets of Rocks": https://commons.wikimedia.org/wiki/File:Stratigraphy_of_the_Grand_Canyon.png
9. Grand Staircase cross-section (Bryce, Zion, Grand Canyon in one stack): https://commons.wikimedia.org/wiki/File:Grand_Staircase-big.jpg
10. Swiss-style rock drawing principles (stroke widths and densities): https://mail.colororacle.org/berniejenny/pdf/2014_Jenny_etal_DesignPrinciplesForSwiss-styleRockDrawing.pdf
11. Swiss-style colour relief shading (Imhof's colour rules): https://mail.colororacle.org/berniejenny/pdf/2006_JennyHurni_SwissStyleShading.pdf
12. Introducing Plan Oblique Relief (lighting from the lower left, no cast shadows): https://cartographicperspectives.org/index.php/journal/article/download/cp57-jenny-patterson/pdf/1605
13. Imhof plates gallery: https://socks-studio.com/2015/01/21/the-map-as-an-artistic-territory-relief-shading-works-and-studies-by-eduard-imhof/
14. FGDC pattern SVGs (607, 620, 627 ...): https://github.com/davenquinn/geologic-patterns
15. Bryce hoodoos, Thor's Hammer (white cap on pink column): https://commons.wikimedia.org/wiki/File:Thor%27s_Hammer,_Bryce_Canyon_National_Park,_Utah.jpg
16. Bryce amphitheatre (rows of hoodoos from fins): https://commons.wikimedia.org/wiki/File:USA_10654_Bryce_Canyon_Luca_Galuzzi_2007.jpg
17. Arches, Fiery Furnace fins: https://commons.wikimedia.org/wiki/File:Fiery_Fins_(9497700828).jpg
18. Arches, Devils Garden, slot between two fins: https://commons.wikimedia.org/wiki/File:A_Sandy_Area_Between_Two_Fins,_Devils_Garden_Trail,_Arches_National_Park,_Utah_(2438790877).jpg
19. NPS Arches rock strata (Dewey Bridge "chocolate", Slick Rock jointing): https://www.nps.gov/arch/learn/nature/rock-strata.htm
20. NPS desert varnish: https://www.nps.gov/articles/desertvarnish.htm
21. USGS Phantom Ranch stratigraphy photo (Muav "dark, cliff-forming ledges"): https://www.usgs.gov/media/images/phantom-ranch-tour-stratigraphy-exposed-grand-canyon (opens via the fetch tool; returns 403 to curl)

Caveats: (1) the hex values for formations are estimates from colour words; sample real photos (refs 1, 15, 17) with an eyedropper before freezing them. (2) The dark-theme palette is derived, not sourced. (3) The "dolomite cap" on Bryce hoodoos comes from ranger and secondary accounts; NPS pages confirm only differential cementation and ice wedging. (4) Label-ink contrasts in rule 26 were computed with the WCAG formula; hairline and pattern inks are decorative and exempt.
