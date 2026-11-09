# Round 5, Opus: what the Expertise page says

The map already does most of the page's job. The text around it should name the map, make the one click obvious, and give a sceptic the evidence. Everything else goes.

## 1. The page, top to bottom

1. **Nav label: keep, rename** to "Map". "Expertise" is a claim about himself, while "Map" names what is on the page.
2. **h1: keep, shrink** to section-heading size. Screenshots, crawlers and screen readers need the page to have a name, and a picture can't be the title.
3. **Claim: shrink** to one sentence that says what a mesa is and which way is up. The height caveat moves to the method page.
4. **Control bar: cut.** A style menu icon and a "Jump" button sit in the map's top-right corner. The zoom buttons describe interaction that no longer exists.
5. **Field captions: keep**, with a fixed rule for what the numbers are. They are the real legend.
6. **Bench labels and numerals: keep.** They only appear after a click.
7. **Back control: add**, top left, mesa level only. Clicking again works, but nobody can see that it does.
8. **Legend: cut**, and move it to the method page. The claim gives the direction and the bench labels name every step.
9. **Status line: cut**, apart from a hint on the first visit that disappears after one click.
10. **Index: replace** with one flat list of public work, numbered to match the markers (section 5).
11. **Side panel: keep** and rewrite it. This is where the proof is.
12. **Colophon: shrink** to one line that ends in the only link to the method page.
13. **"How this map is made": new page.** It holds log widths, saddles, layer definitions and the ledger, for the professor and the staff engineer.

## 2. Copy deck

| Element | Current | Proposed | Reasoning |
|---|---|---|---|
| Nav label | Expertise | Map | |
| `<title>` / meta | Expertise · Map of work | Map of work · Parth Thaker | Puts his name in the tab and the search result. |
| Meta description | A terraced relief of what I have read… | The fields I have worked in, drawn from my reading log and my papers, with every public paper, patent and post linked. | Crawlers and LLMs quote this. |
| h1 | Map of work | Map of work | Accurate and short. |
| Claim | The land is made of what I have read and written, by rule, not by judgment. Height is how far I have gone with a topic, not how much it matters. Every public item is listed below; the rest are counted. | Each mesa is a field I have worked in, built up from what I read at the base to what I published at the top. | |
| Style menu (icon button, aria-label) | Style: Chipboard / Strata / Sandstone | aria-label "Map style"; options "Rock" and "Grey" | Named for what they look like. |
| Jump button | Jump to ⌘K | Jump ⌘K | The palette placeholder reads "Field or title". |
| First-visit hint | Click a mesa or its caption to move closer; click a block to read what it is. | Click a field to look closer. | Once, under the map, gone after the first click. |
| Back control | (none; Esc resets) | ← All fields | Esc keeps working; no need to say so. |
| Field caption, line 1 | BANDITS & LEARNING | BANDITS & LEARNING | |
| Field caption, line 2 | 2017–2023 · 4 PUBLISHED · 14 READ | 2017–2023 · 4 PUBLISHED · 14 READ | Years, then his highest non-zero own layer, then READ. A field with nothing published: `2024– · 3 WRITTEN · 9 READ`. |
| Bench labels | 70 CITED, 14 READ | 70 CITED · 14 READ · 5 WRITTEN · 4 PUBLISHED · 12 TO READ | One word per layer, used everywhere. Never "shallows" or "queued". |
| Item numerals | 08 | 08 | Same number as in the index. |
| Item names at close range | italic title | italic title, cut at 40 characters with an ellipsis | |
| Panel, line 1 | 08 · published · Bandits & learning | 08 · PAPER · 2021 · BANDITS & LEARNING | The bench already shows the layer, so give the type and year. |
| Panel, line 2 | (item title) | (item title, in full) | |
| Panel, line 3 (public) | A one-sentence claim for this item goes here, followed by the evidence link… | One sentence that states the result. Pattern: "Shows that the lower bound on samples for best-arm identification is tight up to a constant." Then, on its own line in mono: `AISTATS 2021 · PDF · arXiv` | Never "this paper explores". |
| Panel, line 3 (draft) | Drafts carry no link and say so. | One sentence of claim, then `DRAFT · NOT PUBLIC YET` | It says so instead of apologising. |
| Panel button | Back to the mesa | Close | |
| Index heading | Index | Papers, patents and posts | Becomes "Public work" once talks or code arrive. |
| Index subline | One column per field · counts by layer, deepest first · items listed where public | (cut) | |
| Index row | 08 Best-arm identification: matching lower bounds PUBLISHED | `08  2021  Best-arm identification: matching lower bounds  PAPER · AISTATS  BANDITS` | |
| Colophon | Built from 7 published, 16 written, 52 read, 185 cited and 253 queued records (synthetic counts for the demo) · positions locked · regenerated 2026-11-08 | Drawn from my reading log and publication list. Rebuilt 8 Nov 2026. How this map is made → | Until the counts are real: add "Counts are placeholders." |
| Method page title | (none) | How this map is made | |
| Method page opening | (none) | Every shape on the map comes from a record, and no step is drawn by hand. A taller mesa means I went further into that field. It says nothing about how much the field matters. | The height caveat lands where it is wanted. |

## 3. Five writing rules for the owner

1. **Write about the work, never about the page.** If deleting a sentence costs the reader no fact about Parth's work, delete it. "One column per field" fails this test.
2. **One name per thing, everywhere.** The five layer words (published, written, read, cited, to read) and the material words (paper, patent, system, post, note) are fixed. Do not write "shallows" in one place and "queued" in another. If you want a new word, add it to the config first.
3. **Write sentences you would say out loud to a colleague.** Use one clause where one will do. Avoid "X, not Y" for rhythm and lists of three because three sounds finished. If a line read aloud sounds like a tagline, rewrite it.
4. **Numbers and nouns over adjectives.** Write "4 published" and not "extensive work". Write "tight up to a constant" and not "strong results". If a sentence has no number, name or verifiable verb, it probably shouldn't be on the page.
5. **Mono lines are ledger rows.** Each mono line is a value, a dot, a value: `2021 · PAPER · AISTATS`. Mono lines have no verbs, no instructions and no sentences. Anything that tells the reader to do something is serif prose, and there should almost never be one.

## 4. Marker system

**(a) The mark.** Drop the cylinder and cap. Each item becomes a **flush engraved glyph**: a flat 7px plan shape cut into the bench top, drawn in the terrace's projection so it lies on the rock. It has a 1px ink stroke. It is filled with the red accent when public with a link and is an outline when a draft. Shapes:

- paper: square
- patent: diamond
- shipped system: hexagon
- post: circle
- note: short bar (2:1 rectangle)

**New types** take the next free shape from an ordered list in the config (triangle, cross, ring, half-disc, chevron), never from code. Shape gives the type and fill shows whether it is public. The bench already gives the layer.

**(b) Placement.** One row along the bench's **front edge**, inset 6px from the rim and centred. Items run left to right by year, then numeral, at a fixed 22px pitch (7px glyph, 3px gap, 12px numeral). With a fixed pitch along a line, markers can't overlap, and there are no rings or seeds. Titles appear on hover, so they need no room in the row.

**(c) Config** (`content/expertise/materials.yaml`, read at build time):

```yaml
layers: [to_read, cited, read, written, published]   # bottom to top
shapes_free: [triangle, cross, ring, half_disc, chevron]
materials:
  paper:   { label: PAPER,   shape: square,  evidence: true,  layer_if_public: published, layer_if_draft: written }
  patent:  { label: PATENT,  shape: diamond, evidence: true,  layer_if_public: published, layer_if_draft: written }
  system:  { label: SYSTEM,  shape: hexagon, evidence: true,  layer_if_public: published, layer_if_draft: written }
  post:    { label: POST,    shape: circle,  evidence: true,  layer_if_public: written,   layer_if_draft: written }
  note:    { label: NOTE,    shape: bar,     evidence: false, layer_if_public: written,   layer_if_draft: written }
  talk:    { label: TALK,    shape: triangle, evidence: true, layer_if_public: written,   layer_if_draft: written }
placement:
  edge: front
  order: [year, id]
  pitch_px: 22
  inset_px: 6
  max_rows: 2
  row_gap_px: 12
```

`evidence: false` means an item is drawn and listed but not counted, so notes don't inflate the "written" total. Items stay in the ledger.

**(d) Levels.** At the overview there are no markers. The caption already gives the count, and specks on seven mesas were a large part of the crowding. At the mesa level each glyph has its two-digit numeral in 10px mono to its right, the same numeral as in the index. Hover thickens the stroke to 1.5px and shows the title.

**(e) Overflow.** If one row doesn't fit, a second row starts 12px behind it. If two rows don't fit, the last slot becomes `+7` in mono, and clicking it lists the rest in the side panel. Never shrink the pitch or the glyph. If `+N` shows up often, the field should be split.

## 5. The index decision

**Keep it, as one flat list.** The tables go. The counts are on the map, and cited or to-read counts don't help anyone check a claim.

- Heading: **Papers, patents and posts**
- No subline.
- One row per written or published item, newest first, as a plain `<ol>` in the static HTML, so crawlers can read it without running the map script.
- Row: `08  2021  Best-arm identification: matching lower bounds  PAPER · AISTATS  BANDITS & LEARNING`. The numeral is the marker's numeral. The title links to the evidence (PDF, patent, repo, post). Drafts show `DRAFT` in place of a venue and have no link.
- Each row has `id="item-08"`, so the panel can link to it. Add schema.org JSON-LD for the published rows.
- On a phone the list is the page, with the map above it.

No per-field pages. They would be thin and would split the crawl.

## 6. What to resist adding later

**Any self-rating: a proficiency bar, "expert / familiar" tags, a skill score per field, a "core strengths" box.** The page is credible because nothing on it is his opinion of himself. Every step is a count and every marker links to something you can open. One self-assessed number turns the map into a prettier skills chart, and a hiring manager will discount the real counts along with it. If a field looks smaller than he thinks it deserves, the fix is to put more work into the ledger, not more words on the page.
