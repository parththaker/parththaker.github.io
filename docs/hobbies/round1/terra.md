# Terra, round 1 (gpt-5.6-terra, effort high, blind)

1. **Purpose and cuts**

**Purpose:** Show the person behind the research record through a small, verifiable account of how he found—and continues to play—board games.

Use the existing nav label **Hobbies**. It leaves room for another hobby later; “Board games” belongs as the page title.

Cut:

- Centered/red split hero, subtitle, and research-as-optimization analogy: generic framing, not biography.
- Red CTA button: use a quiet text link, “Board Game Arena profile.”
- “Gaming Chronicles,” emoji badges, overlays, modal captions, and “Fun Fact” boxes: they turn real photos into content cards.
- Auto-rotating carousel: motion adds nothing and makes a static personal record feel promotional.
- Soft counters: explicitly disallowed and unsupported by a useful source.
- Wood-grain collection shelf, rating-height spines, colored “win-rate” dots, BGG modals: interface decoration and potentially misleading statistics.
- Five-stage “Strategic Evolution” timeline: invented narrative shape, overstates ordinary changes in taste.
- Any “conversion,” “mastery,” “strategic evangelist,” or win-rate language: self-congratulatory or inaccurate.

2. **Page structure**

One quiet page, five sections, no client state, no lightbox.

| Element | Budget | Decision |
|---|---:|---|
| Title | 2 words | `Board games`; no kicker needed. |
| First games | 65 words | Plain paragraph. This is the human entry point. |
| Board Game Arena | 80 words + 14 ledger rows | Dated static profile link, one compact record line, then a responsive ledger of games with at least five ranked plays. |
| Terra Mystica | 85 words | Plain paragraph plus tournament link. No profile-average comparison: it is interesting but too forensic for this page. |
| Around the table | 90 words | Three short paragraphs about named, confirmed people and games. No “people I taught” list. |
| Photos | captions only | Nine-image editorial grid, captions beneath; no overlays or modal. |

The game ledger earns its place because it is useful to the board gamer and easy to audit. It should stack into individual rows on a 420 px screen, rather than become a horizontally scrolling table. The photos earn a grid because they establish real social settings better than prose can. Everything else remains prose.

3. **Full copy deck**

**HTML title**

`Board games | Parth Thaker`

**Meta description**

`Chess, Catan, Terra Mystica, and a dated Board Game Arena record from Parth Thaker.`

**Page title**

`Board games`

**Heading**

`First games`

**Paragraph**

`My father taught me chess when I was eight or nine. I left it early and never went back. At IIT Madras, a close friend brought Die Siedler von Catan to the dorm, and our group queued to play the four-player game. In graduate school, I built a Catan position around 6s and 8s, then watched seven consecutive 5s. I stopped playing Catan.`

**Heading**

`Board Game Arena`

**Paragraph**

`I play on Board Game Arena as r_ikiri. The profile is a snapshot, read 9 Nov 2026.`

**Link label**

`Board Game Arena profile`

**Mono ledger row**

`MEMBER SINCE 21 MAR 2020 · 930 GAMES · 11K XP · 154 ACHIEVEMENTS · 54 FRIENDS`

**Mono ledger row**

`4 TURN-BASED GAMES RUNNING`

**Ledger heading**

`GAME · RATING · RANKED GAMES · VICTORIES`

**Ledger rows**

`Terra Mystica · 477 · 408 · 185`  
`Gaia Project · 224 · 50 · 15`  
`Age of Innovation · 212 · 46 · 16`  
`7 Wonders · 202 · 60 · 15`  
`Kingdomino · 196 · 17 · 9`  
`Teotihuacan · 176 · 19 · 9`  
`Viticulture · 141 · 8 · 4`  
`7 Wonders Duel · 114 · 12 · 4`  
`Puerto Rico · 100 · 20 · 7`  
`Ark Nova · 100 · 30 · 6`  
`Splendor · 100 · 24 · 10`  
`Heat · 91 · 8 · 1`  
`Great Western Trail · 81 · 5 · 2`  
`Agricola · 54 · 5 · 1`

A small note below the ledger is warranted:

`Games with five or more ranked plays. Ratings, games, and victories read 9 Nov 2026.`

That avoids implying a live feed and avoids the erroneous BGA “% wins” figure.

**Heading**

`Terra Mystica`

**Paragraph**

`Terra Mystica is where I stayed: no dice, no card luck, and asymmetric factions. I read faction guides and watched tournament games. I usually play Geodens in Gaia Project. My Ph.D. advisor, Prof. Gautam Dasarathy, also played Terra Mystica with the lab and enjoyed it.`

**Paragraph**

`In Fire Two Open Season 2, I played the Terra Mystica round of 24, Group C, against ChristopherHo, jesseg, and firexed. Claybo and Ranior provided commentary.`

**Link label**

`Fire Two Open S2 — Ro24 Group C`

**Heading**

`Around the table`

**Paragraph**

`Aniket, a Ph.D. colleague, learned Great Western Trail from me. In one Teotihuacan game, I scored 163 points. Pipeline did not stick.`

**Paragraph**

`My wife plays Splendor and Viticulture. After a long day at home, Ghost Stories is the game that gets played.`

**Paragraph**

`My first game of Brass: Birmingham was in San Francisco. I later played it with ASU friends in San Diego. I played Puerto Rico with IIT Madras friends at a board-game café in Bangalore.`

**Heading**

`Photos`

**Captions**

`Brass: Birmingham · San Diego · ASU friends`  
`Brass: Birmingham · San Francisco · first game`  
`Catan · three friends`  
`Great Western Trail · Aniket`  
`Puerto Rico · Bangalore · IIT Madras friends`  
`Splendor · Mumbai · my wife`  
`Terra Mystica · Ph.D. lab`  
`Ghost Stories · home`  
`Great Western Trail · four value-1 Jersey cows`

4. **Image decisions**

Carry **nine images**. That is enough to make the page personal without creating a scrapbook.

| File | Decision | Caption | Alt text |
|---|---|---|---|
| `Brass_SD_25.jpg` | Keep | `Brass: Birmingham · San Diego · ASU friends` | `Three people playing Brass: Birmingham on a patterned carpet in San Diego.` |
| `Brass_SF.jpg` | Keep | `Brass: Birmingham · San Francisco · first game` | `Brass: Birmingham set up on a carpet in San Francisco.` |
| `Catan_end.jpg` | Keep | `Catan · three friends` | `Three friends sitting around a completed game of Catan on a carpet.` |
| `GWT_AZ.jpg` | Cut | — | It duplicates the stronger Aniket photo and has no person or story attached. |
| `GWT_Aniket_ASU.jpg` | Keep | `Great Western Trail · Aniket` | `Aniket playing Great Western Trail at a grey table in an office.` |
| `Puerto_Rico_Bang.jpg` | Cut | — | The second Puerto Rico photograph supplies people and the café context more clearly. |
| `Puerto_Rico_Bang_2.jpg` | Keep | `Puerto Rico · Bangalore · IIT Madras friends` | `Two players at a Puerto Rico game in a Bangalore board-game café.` |
| `Splendor_Mumbai.jpg` | Keep | `Splendor · Mumbai · my wife` | `Parth Thaker’s wife playing Splendor at a low table in Mumbai.` |
| `TM_Lab.jpg` | Keep | `Terra Mystica · Ph.D. lab` | `Three people playing Terra Mystica at a lab table, with one person giving a thumbs-up.` |
| `ghost_stories.jpg` | Keep | `Ghost Stories · home` | `Ghost Stories arranged on a glass table at home.` |
| `pipeline_ASU.jpg` | Cut | — | “I tried it and did not take to it” is too slight to earn an image. |
| `unlucky_hand_GWT.jpg` | Keep | `Great Western Trail · four value-1 Jersey cows` | `A hand holding four value-1 Jersey cow cards over a Great Western Trail board.` |

Use a three-column grid on large screens, two columns on tablet, one column on phone. Preserve source aspect ratios; portrait images can occupy a taller grid slot. Captions should be small mono text below each image, never overlaying faces or boards.

No lightbox. The images are contextual rather than art objects, and a lightbox requires state and adds a gallery interaction the page does not need. If larger inspection is desirable, make each image a plain link to its full-size file with no extra interface.

5. **One thing never to add**

Never add a **win-rate claim**. BGA’s displayed percentage is demonstrably not victories divided by games, so it cannot support the inference readers will naturally make. Games played and victories are sufficient.

6. **Ranked recommendation**

1. **Recommended: compact record, three short personal sections, a dated BGA ledger, and nine plainly captioned photographs.** It gives the hiring manager a person in the first scroll, gives a board gamer a usable record without false performance claims, and gives friends contextual photos without turning them into promotional tiles.

2. **Strongest alternative: a photo-first essay with only the origin, Terra Mystica tournament, and a final profile link.** This would be warmer and even less likely to sound generated. It loses because the BGA handle is unusually substantive, and omitting its dated record leaves the board-game reader with less evidence of what he actually plays. The ledger is the right amount of data, provided it remains secondary to the prose and photos.

**Confidence: high.** I would change this recommendation if Parth wanted the page to be primarily a public BGA reference rather than a personal site page; then the ledger could expand to every game. I would also reduce the photo set if any pictured friend preferred not to remain on the site.
