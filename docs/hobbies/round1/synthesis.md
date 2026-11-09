# Round 1 synthesis (Fable): the Hobbies page becomes "Board games"

Voices: Sol (xhigh), Terra (high), Opus, Fable, all blind, on `brief.md`. Inventory in `inventory.md`,
checked against the owner's answers and the live Board Game Arena profile on 9 Nov 2026.

## Agreed by all four
- Everything on the old page goes: centred hero with a red word, red button, stat strip, "Gaming
  Chronicles" grid with overlays, emoji badges, modal and "Fun Fact" boxes, the auto-rotating carousel,
  the four soft counters, the wood-grain shelf, the emoji timeline. Not patched; replaced.
- One quiet page in a single text column at the About page's width, flush left, no client state, no
  lightbox, no carousel, no red except link hover. The page ends on a photo, with no closing sentence.
- The origin is prose, about 90 words: chess from his father at eight or nine, left early and never
  revisited; Catan at IIT Madras and the dorm queue; the seven 5s; then Terra Mystica. All four wrote the
  chess sentence almost word for word.
- One data element: a mono ledger of Board Game Arena games with ranked games and victories, dated,
  with a line saying training games are not counted. Never a win percentage, in any form (BGA's own
  figure is not wins over games). Opus and Terra made this their "never add".
- Photo captions are ledger rows, game · place · people, in mono under the photo. No titles, no
  overlays, no years. Alt text says what is visible, in one sentence, and never repeats the caption.
- The other never-add (Fable, Sol): no sentence, ever, about what board games taught him about research,
  optimisation or engineering. Both rules go into the spec.
- Cut: the "semifinal" (it was the round of 24), the "small optimization problem" line, "gateway drug",
  "happy wife", "RNG is not strategy", "three continents", the Pipeline photo, GWT_AZ, Puerto_Rico_Bang.

## Rulings where they differed
- **Label.** Sol, Opus, Fable: "Board games" in the nav, the h1 and the tab title; Terra keeps
  "Hobbies" in the nav to leave room for another hobby. Ruling: "Board games" everywhere; the owner said
  there is no other hobby. The route stays `/hobbies/` so old links hold.
- **Kicker under the title.** Fable and Opus want one mono row (handle · since · games) so the
  five-second reader meets a name and a number before any image; Sol and Terra put those facts inside the
  BGA section. Ruling: the kicker stays, one row, the handle linked to the profile.
- **Ledger size.** Fable 14 rows with a Note column, Terra 14 rows with BGA rating, Opus 11 rows, Sol 5.
  Ruling: ten rows, every game with ten or more ranked plays, two number columns only. No rating (three
  of four dropped it: it means nothing to a stranger). No Note column: anecdotes live in prose, so the
  ledger stays a ledger.
- **XP, achievements, friends, running games.** Terra keeps them in a mono line; the other three cut
  them as the platform's scorekeeping. Ruling: cut.
- **Terra Mystica profile averages.** Fable and Opus include them (Opus as a second ledger); Sol and
  Terra cut them as too forensic. Ruling: two prose sentences, no second ledger. They are the only
  statement on the page about how he plays rather than how much, and they are checkable on the same
  profile; a table would make them an infographic, which is Sol's objection.
- **Tournament.** All four say round of 24, group C; three name the opponents and the commentators.
  Ruling: one paragraph naming the event, the dates, the round and the three opponents, with the
  video linked on "on YouTube". Commentators are not named; they are not his record.
- **Anecdotes.** Geodens and the 163-point Teotihuacan game: three of four keep them, one clause each.
  Pipeline: cut (Fable, Sol; and three of four cut its photo). "Lately mostly Age of Innovation and Ark
  Nova" (Opus, Sol): kept, since the date on the page anchors "lately".
- **Photos.** Count ran from six (Fable) to nine (Terra, Opus). Five were kept by all four: TM_Lab,
  Brass_SD_25, Puerto_Rico_Bang_2, Splendor_Mumbai, unlucky_hand_GWT. GWT_Aniket_ASU and ghost_stories
  had three votes; Catan_end and Brass_SF two; pipeline one. Ruling: six photos. TM_Lab wide at column
  width after the origin (Sol: the strongest photo and the advisor story). The cow hand inline beside
  the people paragraph (Opus: a 4:3 crop would cut the fan of cards, and the photo is the anecdote).
  Four in a 2×2 grid: Brass San Diego, Puerto Rico Bangalore, Great Western Trail with Aniket, Splendor
  Mumbai. Ghost Stories is cut as the one board-only photo left (its fact stays in prose) and is the
  first to add back if the owner wants seven. Catan_end is cut on Opus's reason: next to "I stopped
  playing Catan" it implies a return the owner has not stated. Each photo is a plain link to its JPEG
  (Terra, Opus), which replaces a lightbox at no cost.
- **Section heads.** Three mono small-caps heads: BOARD GAME ARENA, TERRA MYSTICA, AT THE TABLE. The
  origin has no head; it follows the title (Sol, Opus, Fable). Terra's "First games" and "Photos" heads
  are dropped.

## The spec

Route `/hobbies/`, file `src/app/hobbies/page.tsx`, server component, no `'use client'`. Shell as the
About page: `mx-auto max-w-3xl px-6 py-14`. h1 `text-4xl font-bold tracking-tight`. Prose in the site's
serif at the About page's size. Section heads in the About page's small uppercase style with a hairline
rule above. Ledger: CSS grid `[1fr_auto_auto]`, mono, tabular numerals, hairline under each row, muted
header row; at 420 px the longest name ("Age of Innovation") still fits on one line. Photos: `<figure>`
with `<a href>` to the JPEG, hairline border, caption in mono 11 px muted. Grid `grid-cols-1
sm:grid-cols-2`, 4:3 crops. The cow hand floats right at about 11 rem wide in a 9:16 box from `sm` up,
and is a centred half-width block below. Delete `GamingMemories.tsx`, `GameShelf.tsx`,
`GamingJourney.tsx`, `FunFact.tsx`, `GameGallery.tsx`. Nav and footer labels become "Board games".
Unused photos (GWT_AZ, Puerto_Rico_Bang, Brass_SF, Catan_end, pipeline_ASU, ghost_stories) leave
`public/`; git keeps them.

### Copy deck, in page order
HTML title: `Board games · Parth K. Thaker`
Meta description: `The board games I play: my Board Game Arena record since 2020, Terra Mystica most of all, and the people at the table.`
Nav and footer: `Board games`

h1: `Board games`
Kicker (mono): `r_ikiri on Board Game Arena · since March 2020 · 930 games`

> My father taught me chess when I was eight or nine. I left it early and never went back.
>
> At IIT Madras a close friend brought Die Siedler von Catan to the dorm, and we queued to play the
> four-player game. In graduate school I built a position around the 6s and 8s and watched seven 5s
> come up in a row. I stopped playing Catan.
>
> Terra Mystica has no dice and no card luck, and each faction plays by its own rules. I learned it from
> faction guides and recorded tournament games.

Wide photo TM_Lab. Caption: `Terra Mystica · the lab at ASU · my advisor and two labmates`
(owner to confirm the advisor is in the frame; if not, `Terra Mystica · the lab at ASU · labmates`)

`BOARD GAME ARENA`
> Most of my games are online. Terra Mystica is close to half of them. Lately it is mostly Age of
> Innovation and Ark Nova.

Ledger header: `game · ranked games · victories`
```
Terra Mystica        408   185
7 Wonders             60    15
Gaia Project          50    15
Age of Innovation     46    16
Ark Nova              30     6
Splendor              24    10
Puerto Rico           20     7
Teotihuacan           19     9
Kingdomino            17     9
7 Wonders Duel        12     4
```
Footnote (mono): `games with ten or more ranked plays · training games not counted · read 9 Nov 2026`
Link: `Profile on Board Game Arena`

`TERRA MYSTICA`
> In November 2020 I played the round of 24 of the Fire Two Open Season 2, a live Terra Mystica
> tournament streamed on Twitch. My group match, against ChristopherHo, jesseg and firexed, is on
> YouTube with commentary.
>
> Board Game Arena keeps my per-game averages beside everyone else's. I finish with 132 points on
> average; the site average is 117 and the average winner's is 139. I take power from my neighbours'
> buildings far more than most players, 32 a game against 22, and pay 14 points for it against their 9.
> In Gaia Project, its successor, I usually play the Geodens.

`AT THE TABLE`
> My advisor, Prof. Gautam Dasarathy, played Terra Mystica with the lab and enjoyed it. Aniket, a PhD
> colleague, learned Great Western Trail from me; in that game I once held a hand of four value-1 Jersey
> cows. In one Teotihuacan game I scored 163 points. My wife's games are Splendor and Viticulture. After
> a long day we play Ghost Stories at home, which is cooperative.

Inline photo unlucky_hand_GWT, caption: `Great Western Trail · four value-1 Jersey cows`
Grid captions:
1. `Brass: Birmingham · San Diego · friends from ASU`
2. `Puerto Rico · a board-game café in Bangalore · friends from IIT Madras`
3. `Great Western Trail · ASU · Aniket`
4. `Splendor · Mumbai · my wife`

Alt text (what is visible; never the caption):
- TM_Lab: "Three people at a grey lab table around a Terra Mystica board; one gives a thumbs-up."
- unlucky_hand_GWT: "A hand fanning four Jersey cow cards, each worth 1, over a Great Western Trail board."
- Brass_SD_25: "Three people on a patterned carpet around a Brass: Birmingham board, a television behind them."
- Puerto_Rico_Bang_2: "Two players at a wooden café table with Puerto Rico, other occupied tables behind them."
- GWT_Aniket_ASU: "One person at a grey table with a Great Western Trail board in a dim office."
- Splendor_Mumbai: "A woman on a wooden floor at a low table with Splendor cards."

### Never add
1. A sentence about what board games taught him about research, optimisation, balance or curiosity.
2. A win rate in any form: percentage, coloured dot or bar.
3. Smaller: a live fetch from Board Game Arena, a rating column, a photo year, a "fun fact" label, a
   carousel, a lightbox.

## Open for the owner
- Six photos as ruled, or seven with Ghost Stories back in a 2×3 grid.
- Whether the advisor is in TM_Lab (sets the caption).
- Whether the two Terra Mystica profile sentences stay (Sol and Terra would cut them).
- Removing the six unused JPEGs from `public/` (recoverable from git).

## Owner's rulings (2026-11-09)
Six photos. The advisor is in the lab photo, so its caption stands. The two Terra Mystica profile-average
sentences are cut (Sol's and Terra's position); the section keeps the tournament paragraph and the
Geodens clause. The unused JPEGs stay in `public/`.

## Built 2026-11-09
`src/app/hobbies/page.tsx` replaced as specified (server component, no client state): title and mono
kicker, three origin paragraphs, the lab photo wide, BOARD GAME ARENA with a ten-row ledger capped at
`max-w-md` and a two-line footnote, TERRA MYSTICA as one paragraph with the video link and the Geodens
clause, AT THE TABLE with the cow hand in a 3:4 frame beside the paragraph and a 2×2 grid. Each photo
links to its JPEG. `GamingMemories`, `GameShelf`, `GamingJourney`, `FunFact` and `GameGallery` deleted;
nav and footer read "Board games"; route unchanged. Lint clean, build green. Checked in headless Chrome
at 1300 px (light and dark) and at a true 420 px layout (rendered inside a 420 px iframe, because
headless Chrome clamps its window to about 500 px and crops the capture).
