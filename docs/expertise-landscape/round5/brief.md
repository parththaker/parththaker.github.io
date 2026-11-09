# Council round 5 brief: what the Expertise page says, and how little

You are one voice in a blind design council for a personal research site. Answer independently, concretely, in 1,400 to 2,000 words. This round is about presentation and words, not geometry. Two of you are known to be good at making text sound like a person wrote it; that is the main job here.

## The page as it stands
Route /expertise on parththaker.github.io (Next.js, Swiss typographic design: Archivo for headings and small caps, Source Serif 4 for prose, JetBrains Mono for data lines, hairlines, one red accent, light and dark themes). The owner is Parth Thaker: Ph.D. in nonconvex optimization and bandits, now an AI research engineer working on cloud and LLM systems.

The centrepiece is a static SVG "map of work": one plateau cut into seven mesas (fields: Optimization, Bandits & learning, Robotics, AI systems, Cloud infra, Catan RL lab, Hyperspectral unmixing). Each mesa is a stack of flat terraces. The terraces are layers of evidence, built by rule from a ledger: a submerged pale shelf for the reading queue, then steps for works cited in his papers, works read, his own writing, and at the summit his published work. Step width is the log of the count at that layer. Fields that share items are joined by saddles. The look is Colorado Plateau rock in muted strata colours (an alternative grey "chipboard" style exists; both stay as a setting). Individual items of his own output (papers, patents, shipped systems, posts, notes) stand on the upper benches as small markers.

Interaction has just been simplified by the owner's decision, and it is settled: no free zoom or pan. Click a mesa (or its caption) and the camera moves in to that mesa; click again and it moves back out. At the mesa level the bench counts and the item markers with numerals appear; clicking a marker opens a side panel with the item. There is also a small "jump to" palette. That is all.

Below the map there is currently an index: a heading, a grid with one column per field, each column a five-row table (PUBLISHED, WRITTEN, READ, CITED, TO READ with counts) followed by a numbered list of that field's items tagged "published" or "written". Then a colophon line.

The owner's reaction: "right now it's too crowded. We need a straight message with as minimal bloating on this page as possible." And on the words: lines like "One column per field · counts by layer, deepest first · items listed where public" "reek of AI generated content." He wants the language un-AI'd.

## Every string on the page today (current copy)
- Nav label: "Expertise"
- Page title (h1): "Map of work"
- Claim paragraph: "The land is made of what I have read and written, by rule, not by judgment. Height is how far I have gone with a topic, not how much it matters. Every public item is listed below; the rest are counted."
- Control bar: "Style" with Chipboard / Strata / Sandstone; "Scroll or click to zoom · Esc resets"; zoom in, zoom out, reset buttons; "Jump to ⌘K"
- Map captions at overview: field name in caps plus a mono line, e.g. "BANDITS & LEARNING / 2017–2023 · 4 PUBLISHED · 14 READ"
- Bench labels at mesa level: "70 CITED", "14 READ"; item numerals "08", "09"; item names at close zoom in italics
- Figure legend (one line under the map): "Shallows: on my reading list · Steps, lowest to highest: cited in my papers, read, written · Summit: published · Each step is as wide as the number of items it holds, on a log scale"
- Status line under the map (changes on click): "Click a mesa or its caption to move closer; click a block to read what it is." and after a click e.g. "Bandits & learning · 2017–2023 · 4 published, 5 written, 14 read, 70 cited, 12 on the reading list"
- Index heading: "Index", subline "One column per field · counts by layer, deepest first · items listed where public"
- Per field column: field title, years, table rows "PUBLISHED 4 / WRITTEN 5 / READ 14 / CITED 70 / TO READ 12", then items like "08 Best-arm identification: matching lower bounds PUBLISHED"
- Item side panel: a small caps line "08 · published · Bandits & learning", the item title, then placeholder text "A one-sentence claim for this item goes here, followed by the evidence link (paper, patent, post or repository). Drafts carry no link and say so." and a button "Back to the mesa"
- Colophon: "Built from 7 published, 16 written, 52 read, 185 cited and 253 queued records (synthetic counts for the demo) · positions locked · regenerated 2026-11-08"

## Who reads it
Weights from earlier rounds: hiring manager for research engineering 20, professor or committee 13, staff engineer 12, someone seeing a forwarded screenshot 10, industry peer 10, crawlers and LLM assistants 8, recruiter/sourcer 6, phone visitor at a conference 5. Most give the page five seconds, then either leave or click one mesa.

## Questions

### Q1. What belongs on the page
Decide the information architecture for a page whose one job is to say "here is what I actually know, and here is the proof", with as little as possible around the map. For each element above: keep, cut, move (to the side panel, to a hover, to a separate page, to the footer), or shrink. Rule on: whether the page needs a title at all or whether the map is the title; whether the claim paragraph stays and at what length (one sentence? two?); whether the legend is needed when the map has captions; whether the control bar should exist or disappear into a single small settings affordance; whether the status line stays; whether the index stays as a grid of tables, becomes a single flat list, becomes per-field pages, or goes entirely (the map captions and panel already carry the counts); what the colophon says and whether the method gets its own short page ("How this map is made") linked once.

### Q2. The words
Rewrite every string that survives, in the voice of a careful engineer writing his own site: plain, specific, no marketing, no cleverness, no "journey", no colons-with-em-dashes, no triads for rhythm, no sentences that explain what the reader can already see, no labels that describe the layout ("one column per field"). Mono data lines may stay telegraphic but must read like a ledger, not like a tooltip. Give the full copy deck as a table: element, current text, proposed text, and one line of reasoning where it is not obvious. Include the field captions (what the two or three numbers should be), the bench labels, the legend if it survives, the status/help line, the item panel's three lines, the colophon, and the nav label (is "Expertise" the right word, or "Work", "Map", "Record", "Ground"?). Then write five rules the owner can apply when he adds text later, so the page does not drift back into AI register.

### Q3. The item markers (the "mushrooms")
Today each of his own items is a small cylinder with a wider cap standing on its bench, placed on a ring around the mesa centre. The owner: they "are looking rather ugly". He also wants placement to follow simple rules from a config, because he will keep adding "materials" (new kinds of items: talks, datasets, code, course notes, reviews). Propose a marker system: (a) the mark itself, flush engraved glyph versus low block versus pin, with a plan shape per material type and a rule for how new types get a shape; (b) a placement rule that reads well at the mesa level (rows along the bench? sorted by year? a fixed grid snapped to the bench? spacing in px?) and never overlaps; (c) the config schema the owner edits (material types with layer, glyph, label word, and whether they count as evidence), kept out of the code; (d) how a marker looks at the overview (nothing? a count? a dot?) and at the mesa level with its numeral; (e) what happens when a bench has more items than fit.

### Q4. The index below the map
If it survives in any form, design the smallest version that still makes every public item findable and checkable by a crawler and a professor: structure, what each row shows, whether counts of cited and to-read items appear at all, and the exact header text. If it should not survive, say where the items go instead and how a crawler still finds them.

## Deliver
1. The page, top to bottom, as a list of elements with keep/cut/move decisions and one sentence each.
2. The copy deck table.
3. Five writing rules for the owner.
4. The marker system and config schema (YAML or JSON example, 10 to 20 lines).
5. The index decision.
6. One thing the owner should resist adding later, and why.
