# Round 5 synthesis (Fable)

Question: what the Expertise page says and how little; the item markers; the index. Voices: Fable, Sol (xhigh), Terra (high), Opus. Sol and Terra led on language by the owner's request.

## Agreed by all four
- Nav label "Expertise" goes. Three say "Work", Opus says "Map". Ruling: Work.
- The control bar goes: no zoom buttons, no scroll instruction. Style stays as a quiet setting; the find palette stays, small.
- One short sentence under the title, not a paragraph. The height-is-not-importance caveat moves to a method page.
- Markers become flush engraved glyphs: no cylinder, no cap, no shadow. Shape per material type from a config, numeral beside each, rows along the front of the bench in year order, overflow as "+N". Nothing drawn at the overview; the caption carries the count.
- Red only on hover and selection (Sol, Terra, Fable; Opus wanted red fill for public items and lost 3 to 1).
- The seven count tables go. One flat list of public work remains, server-rendered, with year, title, type, field and the marker numeral.
- A short "How this map is made" page holds the rules, linked once from the legend and once from the colophon.
- Never add a self-rating, skill bar or "at a glance" strip (all four, in different words).

## Rulings where they differed
- Title: Sol "Fields I work in", Terra "Work", Opus "Map of work", Fable cut. Ruling: "Work" as h1 and nav, "Work · Parth K. Thaker" as the tab title.
- Claim sentence: Opus's "Each mesa is a field I have worked in, built up from what I read at the base to what I published at the top." Chosen because it explains the picture in one plain sentence; Terra's "Research and engineering work, with the reading behind it." is the fallback if the owner finds the first too literal.
- Legend: Sol and Terra keep one line, Opus and Fable cut. Ruling: Terra's line stays because the shelf and the vertical order are not self-evident: "Built from a ledger: to read, cited, read, written, published. Width follows count."
- Caption numbers: years · published · read (Opus, Fable); a field with nothing published shows written instead.
- Help line: one mono line. Overview "Click a field." Mesa: "<field> · click a numbered item to open it · click the field again to return." Plus a visible "← All fields" control at the mesa level (Sol, Opus).
- Index order: newest first (Terra, Opus) rather than grouped by field (Sol). Heading "Papers, patents and posts" (Opus) until talks or code arrive, then "Public work" (Sol, Terra).
- Item names on the map: hover only (Sol, Terra); the panel carries the full title.

## Writing rules (merged from the three decks)
1. Write about the work, never about the page. A line that describes the layout is deleted.
2. One name per thing, everywhere: five layer words, one word per material, fixed in the config.
3. Name the thing, not the interface: "Paper", "All fields", "Find", never "jump to", "item", "reset view".
4. Numbers and nouns over adjectives; every summary sentence must be falsifiable (what was proved, built, measured or shipped).
5. Mono lines are ledger rows (value · value · value), no verbs, no instructions. Instructions are rare and are one plain sentence.

## Applied
Everything above is implemented in the React page on branch `expertise-map`, except per-item summaries and evidence links, which wait for the real ledger.
