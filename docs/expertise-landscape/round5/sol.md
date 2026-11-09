My recommendation is to let the map carry the argument, while retaining just enough text to explain its rules and expose the underlying work. The page should not become a dashboard or an illustrated CV.

## 1. Page, top to bottom

1. **Navigation:** Rename “Expertise” to **“Work”**; “expertise” asks the reader to accept a claim, while this page supplies evidence.

2. **Page title:** Keep a real, modest h1, **“Fields I work in”**; the SVG cannot reliably serve as the document title, accessibility label, search result, or context in a cropped screenshot.

3. **Introductory claim:** Shrink it to two short sentences that identify the source of the terrain and prevent height from being mistaken for prestige.

4. **Utilities:** Replace the control bar with two quiet controls, **“Style: Sandstone”** and **“Find work ⌘K”**; remove free-zoom controls and their instructions.

5. **Map:** Keep it as the dominant element, with overview captions limited to years plus published and written counts.

6. **Focused mesa:** Show terrace counts and numbered markers; move item names to keyboard focus, hover, and the item panel.

7. **Navigation help:** Keep one short contextual instruction because clicking the same mesa to return is not visually self-evident; remove the changing statistical status line.

8. **Legend:** Keep a compact legend because neither captions nor terrain alone explain what the shelves, height, and width mean.

9. **Item panel:** Keep it, but replace placeholder prose with one factual sentence per item and identify the concrete material type rather than merely calling it “published.”

10. **Public-item index:** Replace the seven-column collection of tables with one server-rendered list grouped by field; omit all aggregate count tables.

11. **Method:** Move formulas, source definitions, saddle rules, total record counts, and generation details to **“How this map is made,”** linked once from the legend and once in the footer.

12. **Footer:** Reduce the colophon to the data status, update date, and method link; “positions locked” is an implementation detail.

## 2. Copy deck

| Element | Current text | Proposed text | Reason |
|---|---|---|---|
| Nav | Expertise | **Work** | More concrete and less self-awarding. |
| h1 | Map of work | **Fields I work in** | Names the subject, not the visual device. |
| Claim | The land is made of what I have read and written, by rule, not by judgment. Height is how far I have gone with a topic, not how much it matters. Every public item is listed below; the rest are counted. | **The map comes from my work and reading records. Height reflects how much I have done in a field, not how important I think it is.** | Two necessary facts; the index already demonstrates that public items are listed. |
| Style control | Style; Chipboard / Strata / Sandstone | **Style: Sandstone**; menu items **Sandstone**, **Strata**, **Chipboard** | One text button is clearer than a permanent control group or an unexplained gear. |
| Zoom instruction | Scroll or click to zoom · Esc resets | **Cut** | It describes an interaction that no longer exists. |
| Zoom buttons | Zoom in, zoom out, reset | **Cut** | Free zoom is gone; in a focused view, show **All fields** instead. |
| Focused-view return | None beyond reset and click behavior | **All fields** | Provides a visible and keyboard-accessible return without restoring zoom controls. |
| Jump palette | Jump to ⌘K | **Find work ⌘K** | States what can be found; “jump to” is interface language without an object. |
| Field names | OPTIMIZATION; BANDITS & LEARNING; ROBOTICS; AI SYSTEMS; CLOUD INFRA; CATAN RL LAB; HYPERSPECTRAL UNMIXING | **Optimization; Bandits & learning; Robotics; AI systems; Cloud infrastructure; Catan RL; Hyperspectral unmixing** | Use normal semantic casing; CSS may display caps. “Infrastructure” is worth spelling out. |
| Overview caption | BANDITS & LEARNING / 2017–2023 · 4 PUBLISHED · 14 READ | **BANDITS & LEARNING**<br>**2017–23 · PUBLISHED 4 · WRITTEN 5** | At overview, show time and the strongest direct evidence; reading appears on the focused terraces. Apply this format to all seven fields using ledger values. |
| Bench labels | 70 CITED; 14 READ | **READING LIST 12; CITED 70; READ 14; WRITTEN 5; PUBLISHED 4** | Label first, count second, consistently from the ledger. Omit zero layers. |
| Marker numeral | 08, 09 | **08, 09** | Stable numerals connect map, panel, search, and index. |
| Close-zoom item name | Italic title beside marker | **Move to hover/focus and panel** | Persistent titles will become the next source of crowding. |
| Legend | Shallows: on my reading list · Steps, lowest to highest: cited in my papers, read, written · Summit: published · Each step is as wide as the number of items it holds, on a log scale | **Pale shelf: reading list. Terraces, low to high: cited, read, written, published. Width follows record count on a log scale. How this map is made** | The encoding is not obvious, but it can be stated without scenic narration. |
| Overview help | Click a mesa or its caption to move closer; click a block to read what it is. | **Select a field to inspect it.** | “Select” works for mouse, touch, and keyboard. |
| Focused help | Bandits & learning · 2017–2023 · 4 published, 5 written, 14 read, 70 cited, 12 on the reading list | **Select a numbered item to open it. Select the field again to return.** | The old line duplicates visible counts but fails to explain the unusual return action. |
| Index heading | Index | **Public work** | Says what the section contains. |
| Index subline | One column per field · counts by layer, deepest first · items listed where public | **Cut** | It narrates layout and sounds generated; the headings and rows are sufficient. |
| Field count tables | PUBLISHED 4 / WRITTEN 5 / READ 14 / CITED 70 / TO READ 12 | **Cut** | These counts already live on the map and do not help someone verify an item. |
| Index row | 08 Best-arm identification: matching lower bounds PUBLISHED | **08 Best-arm identification: matching lower bounds Paper · 2023 Paper ↗** | Material, year, and evidence destination are more useful than a status badge. |
| Panel metadata | 08 · published · Bandits & learning | **08 · PAPER · BANDITS & LEARNING · 2023** | “Paper,” “Patent,” “System,” or “Post” tells the reader what the object actually is. |
| Panel title | Item title | **Keep the actual title** | Do not shorten titles differently in the panel and index. |
| Panel summary | A one-sentence claim for this item goes here, followed by the evidence link… | **One factual sentence naming the result, system behavior, or contribution.** | This is an authoring template, not text that should ever ship. |
| Panel evidence link | Generic evidence link or draft note | **Paper ↗**, **Patent ↗**, **Repository ↗**, **Post ↗**, **Notes ↗**, or **No public link** | Use the destination’s real noun. |
| Panel button | Back to the mesa | **Close** | Closing the panel does not navigate back to the mesa; the camera never left it. |
| Colophon | Built from 7 published… positions locked · regenerated 2026-11-08 | **Demo data · Updated 8 Nov 2026 · How this map is made** | Retains the material disclosure while moving machinery and totals to the method page. For production data, remove “Demo data.” |

## 3. Five writing rules

1. **Name the thing, not the interface around it.** Write “Find work,” “Paper,” and “All fields,” not “jump to,” “item,” or “reset view.”

2. **Put only one claim in a sentence.** If a sentence needs several middots, qualifications, or a second metaphor, shorten it or move the detail to the method page.

3. **Use concrete nouns for evidence.** Prefer “paper,” “patent,” “system,” “dataset,” and “repository” over “output,” “material,” “artifact,” or “content.”

4. **Do not narrate visible layout.** Avoid “below,” “one column per field,” “the section above,” and similar directions unless the instruction is necessary to operate the page.

5. **Make every summary falsifiable.** An item sentence should state what was proved, built, measured, or shipped; it should not say that the work “explores,” “showcases,” “delves into,” or “sits at the intersection of” anything.

## 4. Marker system

Use **flush engraved marks**, not blocks or pins. Raised objects introduce shadows, occlusion, and accidental visual importance. A flush mark can look stamped into the bench: a 1 px inset edge, a restrained fill, and the item numeral in the center. Hover or keyboard focus gets a red outline; selection gets a red fill with a light numeral. Give every mark a transparent 28 px interaction target even if the visible glyph is only 14 px.

Use a small controlled shape vocabulary:

- Paper: circle
- Patent: diamond
- Shipped system: square
- Post: triangle
- Note or course note: capsule
- Talk: hexagon
- Dataset: split square
- Code or repository: bracketed square

A new type must take an unused shape from the vocabulary. Do not invent illustrative icons or distinguish types by color alone. The numeral remains the primary identity; shape is a secondary cue.

For placement, compute an inset usable polygon for each bench, then generate horizontal rows of slots with centers 24 px apart in the canonical mesa view and at least 12 px from an edge. Place items by date ascending, then stable item ID, left to right and rear row to front row. New work normally appends at the end, while deterministic sorting keeps regenerated maps stable. Only accept a slot if the largest permitted glyph fits entirely inside the bench, which guarantees no overlap.

At overview, show **no markers and no marker count**. Captions already carry the useful summary. At mesa level, show shape plus numeral. If a bench has more items than available slots, reserve the final slot for **+N**; selecting it opens the panel as a list filtered to that field and layer. The public-work index and search palette still expose every item.

Keep type definitions in a content file rather than a rendering switch:

```yaml
version: 1
materials:
  paper:
    layer: published
    glyph: circle
    label: Paper
    counts_as_evidence: true
  system: {layer: published, glyph: square, label: System, counts_as_evidence: true}
  patent: {layer: published, glyph: diamond, label: Patent, counts_as_evidence: true}
  post: {layer: written, glyph: triangle, label: Post, counts_as_evidence: true}
  course_note: {layer: written, glyph: capsule, label: Course note, counts_as_evidence: true}
  talk: {layer: written, glyph: hexagon, label: Talk, counts_as_evidence: true}
  dataset: {layer: written, glyph: split-square, label: Dataset, counts_as_evidence: true}
  review: {layer: written, glyph: bracket-square, label: Review, counts_as_evidence: false}
```

Types with `counts_as_evidence: false` may appear in search and the public list but should not alter terrain or receive a map marker. Validate layer names and glyph names when building the site.

## 5. Index decision

Keep the index, but make it a compact, server-rendered **Public work** section rather than a second visualization.

Group rows under field headings in the same order as the map. Each row contains only:

`numeral · full title · material · year · direct evidence link`

Do not repeat published, written, read, cited, or reading-list totals. Do not list private citations or queued reading. Do not hide the section behind an accordion or require JavaScript to load it. This gives a professor a checkable bibliography, gives a crawler ordinary headings and links, and provides a reliable fallback when the SVG is inaccessible. On narrow screens it is one column; on wide screens it may use two columns, but its document order remains a single list.

## 6. What to resist later

Resist adding a summary dashboard above the map. Counts, badges, featured projects, and “at a glance” cards would repeat the map’s evidence while pushing the actual object below the fold. New material belongs in the ledger, marker vocabulary, panel, and public list, not in a new promotional strip.

**Confidence: high.** I would change the index recommendation if an existing canonical work or publications page already exposes every item in server-rendered HTML. I would reconsider the layer labels if “written” cannot be defined consistently across papers, code, patents, and shipped systems.
