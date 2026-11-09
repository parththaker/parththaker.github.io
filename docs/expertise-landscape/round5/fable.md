# Fable, round 5 (written before reading the others)

## 1. The page, top to bottom
- Nav label: keep, but "Work" beats "Expertise". Expertise is a claim; work is a record.
- Title: cut the h1. The map is the title; a one-line kicker above it in small caps ("What I have read and written, as land") does the job of both title and claim.
- Claim paragraph: shrink to one sentence under the map, in the legend's place: "Steps are layers of evidence: cited, read, written, published. Wider is more; higher is further."
- Control bar: cut. Style becomes a small "Chipboard / Strata" pair in the page footer or behind the existing theme toggle; the zoom buttons go with the zoom; the ⌘K palette stays but as a plain text link "Find a field or paper" under the map, not a button with a keycap.
- Status line: cut. The caption on the focused mesa already says the numbers; the item panel says the rest.
- Legend: cut as a separate line; fold its one needed sentence into the kicker or the colophon.
- Index: keep, but as one flat list, not seven tables. Counts of cited and to-read items appear only inside the mesa (bench labels) and in the colophon totals, never as a table.
- Colophon: one line with the real totals and the date, plus a link "How this map is made".
- Method: its own short page, linked once from the colophon.

## 2. Copy deck (proposed)
| Element | Current | Proposed |
|---|---|---|
| Nav | Expertise | Work |
| Kicker (replaces h1 + claim) | Map of work / The land is made of… | WHAT I HAVE READ AND WRITTEN, AS LAND |
| Line under the map | Shallows: on my reading list · Steps… | Each step is a layer of evidence: cited, read, written, published. Wider means more; higher means further. |
| Field caption | BANDITS & LEARNING / 2017–2023 · 4 PUBLISHED · 14 READ | BANDITS & LEARNING / 4 published · 14 read · 2017–23 |
| Bench labels | 70 CITED, 14 READ | 70 cited, 14 read (lower case, same place) |
| Help line | Click a mesa or its caption to move closer… | cut; replace with nothing. A pointer cursor on the mesa is the instruction. |
| Index heading | Index / One column per field · counts by layer… | Everything on the map (no subline) |
| Index row | 08 Best-arm identification: matching lower bounds PUBLISHED | Best-arm identification with matching lower bounds · paper, 2021 · Bandits |
| Item panel line 1 | 08 · published · Bandits & learning | Paper · 2021 · Bandits & learning |
| Item panel body | A one-sentence claim for this item goes here… | the real one-sentence claim from the ledger; when missing, nothing |
| Item panel button | Back to the mesa | Close |
| Colophon | Built from 7 published, 16 written, 52 read, 185 cited and 253 queued records (synthetic counts for the demo) · positions locked · regenerated 2026-11-08 | 7 papers and patents, 16 posts and notes, 52 papers read, 185 cited, 253 waiting. Rebuilt 8 Nov 2026. How this map is made. |

## 3. Five rules for later text
1. Never describe the layout. If a line says where things are on the page, delete it.
2. One number per noun, no counts of counts. "4 papers" not "4 PUBLISHED ITEMS".
3. No triads. Two items joined by "and", or a plain list of four or more.
4. Write the sentence you would say to a colleague looking over your shoulder, then cut the first clause.
5. Dates are years. Verbs are past tense. Nothing is "exciting", "deep", or a "journey".

## 4. Markers and config
Markers become flush engraved point symbols, like a survey map's: a plan glyph incised into the bench, 5 px across at the mesa level, hairline in the stratum's shade colour, filled when the item is public and checkable, outline only when it is a draft or counted-but-unlisted. No height, no cap, no shadow. At the overview they are not drawn; the caption carries the count. Glyphs come from a fixed ordered set that new materials take in order: circle, square, diamond, triangle, hexagon, bar. Placement: items sit in rows along the front of their bench, oldest on the left, 7 px apart, wrapping to a second row behind when the front row is full, never within 3 px of an edge; the build computes candidate rows from the terrace polygon, so no coordinates are ever typed. Overflow shows the first row and a "+n" glyph; the index lists everything.

```json
{
  "placement": { "gap": 7, "margin": 3, "order": "year", "overflow": "plus" },
  "glyphs": ["circle", "square", "diamond", "triangle", "hexagon", "bar"],
  "materials": {
    "paper":  { "layer": "published", "glyph": "circle",   "label": "paper" },
    "patent": { "layer": "published", "glyph": "diamond",  "label": "patent" },
    "system": { "layer": "published", "glyph": "square",   "label": "shipped system" },
    "post":   { "layer": "written",   "glyph": "circle",   "label": "post" },
    "note":   { "layer": "written",   "glyph": "triangle", "label": "note", "evidence": false },
    "draft":  { "layer": "written",   "glyph": "circle",   "label": "draft", "public": false }
  }
}
```

## 5. Index
One flat list under "Everything on the map", grouped by field with the field name as a small-caps run-in, each row: title · material, year · link. Nothing about cited or to-read; those are counts on the mesa and in the colophon.

## 6. Resist
Resist adding a second paragraph of explanation. Every sentence added to this page lowers the reader's trust that the map speaks for itself.
