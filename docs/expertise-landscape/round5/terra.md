## 1. Page, top to bottom

1. **Nav — rename.** Change “Expertise” to **Work**. “Expertise” is a claim; “Work” is evidence the reader can inspect.

2. **Visible page title — keep, but make it plain.** Use an `h1` of **Work**. Do not also title the figure “Map of work.” The map immediately beneath it earns the metaphor without naming it twice.

3. **Claim paragraph — keep at one sentence.** It should orient a first-time visitor without explaining the drawing before they have seen it: “Research and engineering work, with the reading behind it.” No second sentence.

4. **Map — keep as the page’s centrepiece.** It is the distinctive argument of the page. Its job is to invite one click, not to convey every data category at overview scale.

5. **Style controls — shrink into a settings affordance.** Remove the control bar entirely. Keep one small settings icon at the map edge, with “Map style” and the three options inside. The selected style need not be announced in the main page flow.

6. **Zoom controls and scroll instruction — cut.** They describe an interaction model that no longer exists. There should be no zoom-in, zoom-out, reset buttons, or “Scroll or click to zoom.”

7. **Jump palette — keep, but shrink.** Retain it as a small icon/button labelled “Jump to” in the map utility area. It matters for keyboard users and people arriving with a specific field in mind; it should not compete with the map.

8. **Overview captions — keep.** Each caption should carry the field, its date range, and two useful measures: public work and reading. Those are the two things a five-second reader needs to distinguish depth from output.

9. **Bench labels — keep.** They are the explanation once someone has selected a mesa. Keep them terse and attached to the relevant terrace.

10. **Markers and numerals — keep, redesign.** They are the route from the abstract map to proof. Do not show item names on the map at close zoom; names belong in the panel, where they can be read without visual clutter.

11. **Legend — keep, reduce to one sentence.** Captions do not explain the vertical order or the submerged shelf. A short legend earns its place; the current version is simply too instructional.

12. **Status line — replace with a quiet contextual line.** At overview it says what to do once. On selection it becomes a compact field context and explains how to leave. It should not restate all five counts.

13. **Index grid and count tables — cut.** Seven mini-ledgers repeat information already encoded in the map and make the lower half look like a dashboard.

14. **Public-item index — keep in a flat, semantic form.** This is the crawler and professor layer, not a second visualization. Put it below the map under “Public work.”

15. **Item side panel — keep.** It is where a reader gets the plain-language claim and evidence link. Replace the placeholder prose with actual per-item metadata.

16. **Colophon — keep only as a footer line.** Remove “positions locked,” synthetic-demo language, and aggregate counts. Link once to a small method page called “How this map is made.”

17. **Method page — create.** It can explain the ledger, layer rules, private versus public records, log scaling, shared references, and the fact that counts are not claims of importance. That material is useful, but it is not front-page material.

## 2. Copy deck

| Element | Current text | Proposed text | Reasoning |
|---|---|---|---|
| Nav | Expertise | **Work** | Concrete and modest. |
| H1 | Map of work | **Work** | The figure supplies the map idea. |
| Claim | The land is made of what I have read and written, by rule, not by judgment. Height is how far I have gone with a topic, not how much it matters. Every public item is listed below; the rest are counted. | **Research and engineering work, with the reading behind it.** | One useful promise, no defence of the visual system. |
| Settings trigger | Style | **Map style** | “Style” alone is vague when detached from the old control bar. |
| Style options | Chipboard / Strata / Sandstone | **Chipboard / Strata / Sandstone** | These are short proper names and need no explanation. |
| Removed instruction | Scroll or click to zoom · Esc resets | **Cut** | False after the interaction change. |
| Removed buttons | zoom in, zoom out, reset | **Cut** | False after the interaction change. |
| Jump control | Jump to ⌘K | **Jump to** | Show the keyboard shortcut only in the palette or accessible shortcut hint. |
| Overview caption | BANDITS & LEARNING / 2017–2023 · 4 PUBLISHED · 14 READ | **BANDITS & LEARNING**  \n**2017–2023 · 9 PUBLIC · 14 READ** | “Public” combines published and other inspectable output, which is what matters at overview. |
| Other caption pattern | field-specific | **FIELD NAME**  \n**YEAR–YEAR · N PUBLIC · N READ** | Use exactly this pattern for all seven fields. |
| Bench label | 70 CITED | **70 CITED** | Already good ledger language. |
| Bench label | 14 READ | **14 READ** | Keep. |
| Bench label | written / published variants | **5 WRITTEN** / **4 PUBLISHED** | Keep the layer words; they are meaningful distinctions. |
| Reading shelf | TO READ | **12 TO READ** | The count makes it visibly part of the ledger. |
| Marker numeral | 08 | **08** | Keep the numeral as a stable reference within its mesa. |
| Item name at close zoom | italic item title | **Cut** | It produces collisions and duplicates the panel. |
| Figure legend | Shallows: on my reading list · Steps, lowest to highest: cited in my papers, read, written · Summit: published · Each step is as wide as the number of items it holds, on a log scale | **Built from a ledger: to read, cited, read, written, published. Width follows count.** | It explains the only non-obvious encoding without performing a guided tour. |
| Method link | none | **How this map is made** | A calm exit for readers who want the rules. |
| Overview help | Click a mesa or its caption to move closer; click a block to read what it is. | **Select a field.** | The map itself makes the next action clear; “block” is imprecise. |
| Selected context | Bandits & learning · 2017–2023 · 4 published, 5 written, 14 read, 70 cited, 12 on the reading list | **BANDITS & LEARNING · 2017–2023 · SELECT AGAIN TO RETURN** | Bench labels now carry the counts. This line gives orientation and exit behavior. |
| Index heading | Index | **Public work** | States what the section contains. |
| Index subline | One column per field · counts by layer, deepest first · items listed where public | **Cut** | It describes layout rather than content. |
| Item metadata in panel | 08 · published · Bandits & learning | **08 · PAPER · BANDITS & LEARNING** | Material type is more useful than repeating the layer. |
| Item title | item title | **Best-arm identification: matching lower bounds** | Preserve the real title, in normal title case. |
| Item detail | A one-sentence claim for this item goes here, followed by the evidence link (paper, patent, post or repository). Drafts carry no link and say so. | **Matches lower bounds for fixed-confidence best-arm identification. Paper** | Every item needs a real, specific one-sentence description plus a labelled evidence link. For an unlinked item, use “No public link.” |
| Panel button | Back to the mesa | **Back to map** | Shorter and clearer. |
| Colophon | Built from 7 published, 16 written, 52 read, 185 cited and 253 queued records (synthetic counts for the demo) · positions locked · regenerated 2026-11-08 | **Updated 8 Nov 2026 · How this map is made** | The demo disclaimer belongs in preview environments, not the public site. |

The item panel’s third line should never be boilerplate. Each record needs a maintained `summary` field. A title is not a substitute for a claim, and an evidence URL is not a substitute for a readable description.

## 3. Five writing rules

1. Write only what a visitor cannot infer from the picture, heading, or control directly beside it.

2. Name the thing being counted. Prefer “14 read” to “depth 14,” and “paper” to “research output.”

3. Make claims inspectable. If a sentence says what an item established, link the paper, repository, patent, or post that supports it.

4. Use one sentence for one job. Do not stack a description, qualification, and instruction into the same line.

5. Remove any phrase that could appear unchanged on another person’s portfolio. “Here is what I know” is weak; “Matches lower bounds for fixed-confidence best-arm identification” is useful.

## 4. Marker system

Replace the mushroom cylinders with **flush evidence tiles**: shallow, engraved marks inset into the bench surface, with a one-pixel dark edge and no cap or vertical shaft. They should feel like survey markers or labels pressed into rock, not objects growing out of it.

Use plan shape to distinguish material type, but keep all shapes within one visual family: simple filled outlines, one size, one engraving colour. Shape is secondary to the numeral and panel metadata; it must not become a pictogram zoo.

Place tiles in ranked rows along the outer usable edge of the terrace, not around the mesa centre. Sort by year descending, then title. Snap each marker to a fixed local grid, for example 14 px horizontal by 16 px vertical at mesa scale, with a 6 px clear margin from the terrace edge and neighbouring tile bounds. Calculate the usable terrace polygon after inset; lay out row by row; reject any cell whose tile footprint crosses the polygon. This makes placement deterministic, legible, and collision-free.

At overview, show no individual tiles. The caption’s public count is sufficient. At mesa level, show the tiles and their two-digit local numerals. On hover or keyboard focus, brighten the tile and show the title in the side panel preview, not as a floating map label.

If a bench cannot fit all items, render as many as fit in the deterministic grid and replace the final cell with a tile marked `+N`. Selecting it opens the filtered item list for that bench. Do not shrink markers below the minimum readable size and do not add a second ring.

Keep material definitions in data, not rendering code:

```yaml
material_types:
  paper:
    layer: published
    glyph: square
    label: Paper
    counts_as_evidence: true
  patent:
    layer: published
    glyph: diamond
    label: Patent
    counts_as_evidence: true
  system:
    layer: written
    glyph: notched-rect
    label: System
    counts_as_evidence: true
  post:
    layer: written
    glyph: circle
    label: Post
    counts_as_evidence: false
  dataset:
    layer: written
    glyph: hexagon
    label: Dataset
    counts_as_evidence: true
  talk:
    layer: written
    glyph: triangle
    label: Talk
    counts_as_evidence: false
```

A new material gets one approved shape from a short finite set, one layer, a singular label, and an evidence flag. Do not add a new shape merely because a new item category exists; reuse a semantically close one when the distinction does not affect a reader’s decision.

## 5. Index decision

Keep a single flat **Public work** list below the map. It should be real HTML, available without JavaScript, and linked from the item panel entries. Order it newest first by default; optional filtering can be progressive enhancement, not the only route to content.

Exact headers:

| YEAR | ITEM | TYPE | FIELD |
|---|---|---|---|

Each row contains the year, linked title, material label, and one or more fields. Add a short one-sentence summary beneath the title only when needed to distinguish a system, patent, or note whose title is opaque. Do not show cited, read, or to-read counts here. Those are map evidence, not public works, and they make the list look like another dashboard.

This gives crawlers visible titles, links, dates, types, and field associations. It gives a professor the fastest possible check of actual output. Per-field pages are unnecessary until any single field has enough public items that a flat list becomes hard to scan.

## 6. Resist adding this later

Resist adding a “skills” or proficiency-rating layer. Bars, scores, and labels such as “expert” would turn a record of evidence into self-assessment, compete with the map’s quiet argument, and age badly as the work changes.

**Confidence: high.** I would change the flat-index recommendation if the site already has a well-maintained publications/work page with stable canonical URLs and complete metadata; then this page can link there instead. I would change the overview caption from “public” to separate “published” and “written” if those categories are consistently meaningful to the owner and each field has enough output that the distinction helps hiring readers decide where to click.
