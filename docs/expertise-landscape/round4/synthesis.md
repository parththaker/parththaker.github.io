# Round 4 synthesis (Fable)

The owner's question: build the land from what he has actually read and written, in five layers (to-read, cited, read, written, published), and make fields that share an item link up by rule, with Grand Canyon, Bryce and Arches as the picture in his head.

Four blind voices answered the same brief: Fable, Sol (GPT 5.6 sol, xhigh), Terra (GPT 5.6 terra, high), Opus. Fable also built a prototype (`sketches/strata/`) on synthetic counts shaped like the real inventory and rendered four variants; three are reproduced in the dossier. Blindness note: Opus's three-line hand-back summary reached Fable before Fable's voice was written; Fable's rules were already in the prototype by then.

## Where all four agree

1. **One layer per item, the highest it has reached.** A cited paper later read leaves "cited" and enters "read"; nothing is counted twice.
2. **Terraces are cumulative.** Terrace k is built from the items engaged at least that deep, so every terrace sits on the one below. Exact slabs were rejected by all four: they allow a top wider than its base (a ledger artefact, not a fact) and floating slabs.
3. **Log compression.** Linear area would let a one-paper summit vanish under two hundred links.
4. **The to-read layer is a submerged shelf, not land.** All four reached this independently. It is drawn under the water line, outside the label counts, listed collapsed in the index. The owner asked for a lowest layer; this is the lowest layer, and it is the only one that may be large without meaning anything.
5. **A shared item builds terrain, not a line.** The connection is made of the shared items by the same rule as a mesa: its height is the deepest shared layer, its width grows with the log of the shared count, and it is never wider than the smaller mesa at that layer.
6. **Arches and windows are impossible by construction, and that is a feature.** An arch is a connection above with nothing below; cumulative terraces cannot make one, and the claim it would make ("we share a publication but no reading") is one the map should be unable to make.
7. **The credential stays a seal,** outside the terrain.
8. **Blocks survive only for layers 4 and 5,** each seated on its own bench. Layers 1 to 3 are never drawn as hundreds of objects. (Opus alone wanted one engraved dot per item for layers 2 and 3; the other three reject it under the round-1 texture rule.)
9. **Cited stays below read,** named "cited in my papers" and "read". The reader who notices is a professor, and will trust the page more for it. Imported bibliographies never promote an item to read.
10. **Positions are computed once from the shared counts, then locked.** A new field is placed alone in free sea; relayout is an explicit new edition with a changelog line, never a side effect.
11. **Merge and split are warnings, never automatic.** A tag outside the taxonomy (the congestion-game paper's "game theory") is a build error; the build never invents a field.
12. **Four things not to do, from four voices:** no bulk import of bookmarks or browser tabs into the queue (Opus); "read" comes only from the ledger, never from a citation or a download (Sol); no tuning of constants or retagging after seeing the picture, the owner's own "never weaken a gate after seeing a result" (Opus); nothing weighted by venue, citations or importance (Fable).

## Where they differ, and the rulings

**A. Where the logarithm goes.** Sol and Terra: terrace *area* is log of the cumulative count. Opus: terrace *radius* grows a fixed step per doubling of the cumulative count. Fable: each *bench* is as wide as the log of its own exact count, and radii are the benches summed outward. The prototype decided it. Under Opus's law (render v4) a four-paper summit is 27 px across while a forty-item cited bench is 17 px wide, because a bench's width then depends on the ratio of two cumulative counts, not on how many items sit on it; the mesas read as stacked plates with large tops. Under Fable's law (render v3) a reader can read a bench as "this many items at this depth", and the picture has distinct mesas with legible steps. Ruling: Fable's bench rule with Opus's minimum bench width; the terrace still means "at least this deep". Constants are fixed on the real data once and then locked.

**B. The layout law and accidental fusion.** Opus: shore distance shrinks continuously with the layer-2 overlap, shores touch past 43 percent. Sol and Terra: a hard threshold before two fields may fuse (3 shared items and 50 or 35 percent), because one joint paper must not swallow a small application field into a large method field. Fable: distance set by the highest layer at which the shared items are at least 20 percent of the smaller field's items at that layer. The prototype showed that hand placement makes capsules into scaffolding (render v1: six full-height walls), and Opus's continuous law packs everything into one lump with the fins hidden inside (v4). Fable's law produced the mesas, saddles and twin summits the owner is picturing (v3). Ruling: Fable's law, which already contains Sol's and Terra's safeguard: one shared paper pulls two summits together only when it is a large share of the smaller field's publications, that is, only when the smaller field *is* mostly the shared work (Robotics, both of whose papers are bandit papers). Below the threshold a shared publication remains a thin full-height fin between separated summits; lint warns when a fin's exposed span exceeds about 50 px so the owner can nudge the lock. Drawing stays continuous; thresholds live in layout and lint only.

**C. Shipped systems: layer 5 or 4.** Two to two. Fable and Opus: 5 when a third party has accepted the work (a referee, a patent examiner, or production users with a public talk or post). Sol and Terra: 5 means a paper or patent, so systems are 4. The owner's words put systems at 4. Recommendation: Opus's acceptance criterion, so systems with a public artefact are 5, because the heaviest reader in the visitor model (hiring manager, weight 20) must see a summit on the fields of the owner's current profession, and because every block is typed, so a system can never pass as a paper. This is the one decision left to the owner and it is one constant.

**D. Live blog posts and the arXiv manuscript.** Unanimous: posts on the site are layer 4 ("written": own writing short of acceptance). The manuscript is 4 until it is accepted (three of four; Fable had said 5 for a preprint and concedes).

**E. Fields of cited items.** Opus: a fetched reference inherits only the *primary* field of each paper that cites it, and two fields share a reference only when papers in both fields cite it (bibliographic coupling). Sol and Terra: inherit all fields with an "inferred" flag for review. Ruling: Opus, because otherwise the bibliography of one two-field paper becomes a thirty-item causeway.

**F. Visibility defaults.** All four want three values: public (listed and linked), counted (shapes the land and the counts, no title emitted), private (absent). Ruling by majority: to-read and read default to counted; cited is public (it already is, in the bibliographies); layer 5 must be public and lint rejects anything else; drafts and ideas default to counted ("+2 in progress"); confidential work is private. The claim line therefore says "every public item is listed; the rest are counted".

**G. Cadence.** Fable: regenerate on every build. Sol: weekly or with the release. Terra and Opus: a monthly dated snapshot with an immediate exception for a new publication. Ruling: the build is deterministic and runs on every deploy; the ledger is committed in batches at the owner's pace, which is the real cadence; the colophon prints the data date and "positions locked".

**H. Items in three fields.** Star junction from the centroid (Fable, Sol, Terra) rather than three pairwise bridges that can enclose a pool (Opus). Maximum three fields per item (Opus).

**I. The overview label line.** `BANDITS & LEARNING · 2016–2022 · 4 PUBLISHED · 14 READ`: name, years, then at most two numbers. A field with nothing published prints its highest layer instead. A field that is only shelf is unlabelled at the overview and listed in the index as submerged (Opus).

## The verdict, as rules

- **Layer** ℓ(item) = max over sources: published 5 (accepted by a third party: refereed paper, granted patent, shipped system with a public artefact), written 4 (posts, ideas, drafts, filed patents, systems without a public artefact), read 3 (ledger entry with a date), cited 2 (fetched from the bibliographies), to-read 1 (ledger).
- **Counts** per field: exact n_k and cumulative C_k = Σ_{j≥k} n_j, over public and counted items.
- **Bench rule:** w_k = 0 if n_k = 0, else w_min + w_unit·log2(1 + n_k); r_k = Σ_{j≥k} w_j. Outline = circle times a fixed angular distortion seeded by the field id. Prototype constants w_min 4 px, w_unit 5.2 px at scale 1.
- **Shelf:** layer 1 is drawn flat at sea level in the sea colour lightened one step, with a dashed hairline edge, no riser.
- **Bridge:** for each pair with shared cumulative counts S_k, a capsule along the segment between centres at every layer with S_k > 0, half-width ρ_k = r_small,k · min(1, S_k / C_small,k), so the saddle is the smaller mesa's terrace times the fraction of its items held in common. Three-field items build a star from the centroid.
- **Layout:** k* = the highest layer with S_k / C_small,k ≥ 0.2; linked pairs sit at d = r_A,k* + r_B,k* + 14 px; unlinked pairs repel to r_A,1 + r_B,1 + 36 px; stress relaxation, then write `landscape.lock.json` and never move anything. New fields are placed alone.
- **Lint:** errors on duplicate ids after normalisation, untagged or unknown-field items, more than three fields, a layer that dropped without a reason, a layer-5 item not public, a field without a lock entry (prints a proposal). Warnings on merge (S_3 / C_small,3 ≥ 0.5 with C_small,3 ≥ 5, or every publication of the smaller field shared), split (more than 40 items at read or above whose secondary tags form two groups), a fin longer than 50 px, a shelf beyond the frame, a to-read item older than a year.
- **Objects:** uniform-height typed blocks for public layer 4 and 5 items on their own bench; inked top for the last twelve months; nothing drawn for layers 1 to 3; hovering a bench at the island stop prints its count and highlights its index rows.
- **Index:** a five-row stratigraphic column per field with counts, the public items under each row, the shared-with line, and a provenance note.
- **Legend line:** "Shallows: on my reading list. Steps, lowest to highest: cited in my papers, read, written. Summit: published. Each step is as wide as the number of items it holds, on a log scale."
- **Claim line:** "The land is made of what I have read and written, by rule, not by judgment. Height is how far I have gone with a topic, not how much it matters. Every public item is listed below; the rest are counted."
- **Colophon:** "Built from 412 records (38 listed) · data through 2026-11-08 · positions locked".

## What the prototype showed

- **v1, hand-placed centres, capsule bridges:** six full-height ridges running summit to summit across both mesas' benches. Scaffolding, not geology. Tightening the hand placement (v2) did not fix it.
- **v3, layout from the highest well-shared layer, bench-width rule:** one connected landmass with seven mesas. Bandits and Robotics are twin summits a notch apart, Robotics' own cited and read benches skirting below; Optimization and Bandits are joined by a wide low saddle of shared reading; Catan is a low peninsula; AI Systems sits on a broad shelf. On the owner's inventory every field shares something with Bandits or AI Systems, so the result is a plateau, not an archipelago. The vocabulary changes from islands to mesas; nothing else from rounds 1 to 3 changes.
- **v4, the majority's log-cumulative radius and continuous overlap law:** wide summits, thin benches, one lump; the fins disappear inside overlapping shores. Rejected.

## The metaphor, translated

Strata: yes, five formations with one fill each across the whole sheet, like a geologic map legend. Mesa and butte: yes. Saddle: shared reading. Fin: a shared publication between two mesas whose summits are not pulled together; short by layout, flagged when long. Hoodoo: the uniform-height blocks standing on their bench. Canyon: the sea, the negative space. Shoal: shared to-read items, under water. Window and arch: never, by construction. The map is the Colorado Plateau in plan-oblique: one plateau, dissected, the same five formations showing in every mesa.

## Confidence and flip conditions

Confidence 0.75 on the rules; 0.6 on the constants, which must be set on the real deduplicated data and then locked. Flip conditions carried from the voices: if the 150 to 250 fetched references collapse to very few unique works after deduplication, the cited layer and most bridges shrink and the picture is mostly the owner's own writing (Sol); if the taxonomy is meant to overlap rather than partition, the merge warnings and the 0.2 layout threshold must be relaxed (Terra); if the page's first job becomes recruiting rather than record, drop the shelf (Terra).

## The one decision for the owner

Whether a shipped system with a public talk or post stands on the summit (layer 5, the council's two-to-two recommendation) or on the written bench (layer 4, the literal reading of his words).

## First weekend, merged

Saturday: `fields.yaml` with the taxonomy frozen (resolve "game theory"); the item schema and lint; import the 7 published, 9 posts, 2 ideas, 1 draft from frontmatter; fetch and cache the bibliographies, deduplicate, assign primary fields; seed `reading.md` with about ten honest read entries and a short real queue, no bulk import. Print the five-row columns as text and check the counts before drawing anything (Opus). Sunday: strata, bridges, layout, lock; render; index columns, legend, claim and colophon; five-second test on three people before the homepage thumbnail changes.
