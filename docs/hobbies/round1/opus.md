# Opus, round 1 (written before reading the others)

## 1. The one sentence and the cut list

**The page shows, in names, places and dated numbers, that the person behind the papers has played one kind of game for years and has taught other people to play it.**

The tab label is **Board games**. "Hobbies" promises more than the one there is. "Games" could mean video games, and "Play" is a mood, not a name. The nav, h1 and HTML title all use the same name.

Cut, one line each:
- Centered h1 with a red word: flush left like every other page.
- Subtitle: "small optimization problem" is the banned research moral.
- Red button: becomes the link "Profile on Board Game Arena".
- Stat strip: XP and achievements are BGA's scorekeeping; 930 games moves to the kicker.
- Photo overlays, emoji badges, modal, Fun Fact box.
- Carousel and soft counters (owner's ruling; the 80% is false).
- Shelf, spine heights, win-rate dots, BGG links, BGA ratings.
- Emoji timeline: its facts become two paragraphs.
- "Semifinal": round of 24.
- Catan_end, GWT_AZ, Puerto_Rico_Bang photos (see 4).
- Friends, reputation, groups, running games, the Ark Nova training registration: true, but off the sentence.

## 2. The page, top to bottom

The page is one TSX file with no client state and no lightbox. It uses the shell from `expertise/method/page.tsx`: `mx-auto max-w-3xl px-5 pt-10 pb-20 font-serif text-[17px] leading-relaxed`. The h1 is `font-sans text-4xl font-bold tracking-tight`. Section heads are `font-mono text-xs uppercase tracking-wide text-muted-foreground`, with a hairline `border-t border-border pt-3 mt-12` above each one, the same quiet register as About. Red appears only where the site already uses it, on link hover. Nothing on this page is decorated in red.

| # | Element | Words | Form |
|---|---|---|---|
| 1 | h1 + mono kicker | 2 + 14 | text |
| 2 | Origin: chess, Catan, Terra Mystica | ~95 | two paragraphs, no visual |
| 3 | BOARD GAME ARENA: paragraph + ledger + link | ~35 + 11 rows | mono ledger |
| 4 | TERRA MYSTICA: averages + tournament | ~70 + 4 rows | mono ledger, YouTube link |
| 5 | AT THE TABLE: people, plus the cow hand inset | ~85 | paragraph, one inline portrait |
| 6 | Photo grid | 8 captions | 2 / 4 column grid |

**Ledgers.** Each ledger is a CSS grid (`grid-cols-[1fr_auto_auto]`, `font-mono text-sm tabular-nums`) with a hairline under every row and a muted header row. "Age of Innovation" is the longest name: 17 mono characters at 14 px is about 140 px, so at 420 px (about 380 px of content) the rows never wrap. Only games and victories are printed, never a percentage or a rating. The Terra Mystica averages earn a second ledger because they say how he plays, not just how much. The origin and the people stay prose. There is no map and no people diagram: a sentence holds five cities and three names.

**Photo grid.** At `lg` the grid breaks out of the text column to `max-w-5xl` (`-mx` or a sibling wrapper): four columns, two rows, `gap-3`, every cell `aspect-[4/3] object-cover`, and the caption below in `font-mono text-xs text-muted-foreground`. At 1300 px each cell is about 245 px wide. At 420 px it is two columns of about 185 px over four rows. Each image is a plain `<a href>` to the original JPEG, which replaces the lightbox at zero state cost. The two portrait photos crop to their centers, where the boards are.

**At 1300 px** the first screen holds the title, the kicker and the origin, flush left, and the ledger starts at the fold. **At 420 px** the first five seconds show the h1, the kicker and the chess sentence. One scroll reaches the ledger.

## 3. The copy deck, in page order

HTML title: `Board games - Parth K. Thaker`

Meta description: `Board games I play: 930 games on Board Game Arena as r_ikiri, most of them Terra Mystica, and the people I play with.`

h1: **Board games**

Kicker (mono): `r_ikiri on Board Game Arena · since 21 Mar 2020 · 930 games · read 9 Nov 2026`

Paragraph: My father taught me chess when I was eight or nine. I stopped early and never went back. The games that stayed began at IIT Madras, when a close friend brought Die Siedler von Catan to the dorm and we queued to play the four-player game.

Paragraph: In graduate school I built a Catan position around the 6s and 8s and then watched seven 5s in a row. I stopped playing Catan after that. Terra Mystica has no dice and no card luck, and each faction has its own rules. I learned it from faction guides and recorded tournament games.

Section head: `BOARD GAME ARENA`

Paragraph: Most of my games are online. Terra Mystica is almost half of them. Lately I mostly play Age of Innovation and Ark Nova.

Ledger header: `game · ranked games · victories`
```
Terra Mystica        408   185
Gaia Project          50    15
Age of Innovation     46    16
7 Wonders             60    15
Ark Nova              30     6
Splendor              24    10
Puerto Rico           20     7
Teotihuacan           19     9
Kingdomino            17     9
7 Wonders Duel        12     4
Viticulture            8     4
```
Ledger footnote (mono): `ranked games only · training and friendly games excluded · read 9 Nov 2026`

Link: **Profile on Board Game Arena** → https://boardgamearena.com/player?id=85701539

Section head: `TERRA MYSTICA`

Paragraph: Board Game Arena keeps my per-game averages next to everyone's. I take about ten more power from my buildings than winners do and give up about four and a half more points to get it. My average game ends at 132 points. The average winner's ends at 139.

Ledger header: `per game · me · all players · winners`
```
total points                       132   117   139
power gained via structures       31.6  22.2  21.7
points lost to gain power         13.7   9.3   9.1
points from faction or stronghold 10.9   5.9   6.7
```
At 420 px the label column wraps to two lines and the three numbers stay on one line. This is acceptable; it does not scroll sideways.

Paragraph: In November 2020 I played the round of 24 of Fire Two Open Season 2, a live Terra Mystica tournament streamed on Twitch. I was in group C against ChristopherHo, jesseg and firexed, with commentary by Claybo and Ranior. In Gaia Project I usually play the Geodens.

Link: **Fire Two Open S2, round of 24, group C** → https://www.youtube.com/watch?v=vNj7M6bjSeA

Section head: `AT THE TABLE`

Paragraph: My advisor, Prof. Gautam Dasarathy, played Terra Mystica with the lab and enjoyed it. Aniket, a PhD colleague, learned Great Western Trail from me. In that game I once held a hand of four value-1 Jersey cows. I tried Pipeline and did not take to it. I once scored 163 points in Teotihuacan. My wife's games are Splendor and Viticulture. At home after a long day we play Ghost Stories, which is cooperative.

Inline figure caption (cow hand): `Great Western Trail · four value-1 Jersey cows`

Grid captions, in grid order:
1. `Terra Mystica · the lab at ASU`
2. `Great Western Trail · ASU · Aniket`
3. `Brass: Birmingham · San Francisco · my first game`
4. `Brass: Birmingham · San Diego · ASU friends`
5. `Puerto Rico · a board-game café in Bangalore · IIT Madras friends`
6. `Splendor · Mumbai · my wife`
7. `Pipeline · ASU`
8. `Ghost Stories · home`

The page has no closing line. It ends on the grid.

## 4. Image decisions

**Count: nine** (eight in the grid and one inline). Each one carries a fact from the inventory: a person, a place or an anecdote. A photo that only shows a board is cut.

Keep in the grid, in caption order: TM_Lab, GWT_Aniket_ASU, Brass_SF, Brass_SD_25, Puerto_Rico_Bang_2, Splendor_Mumbai, pipeline_ASU, ghost_stories. Each carries a confirmed person, place or anecdote.

Keep **inline**: unlucky_hand_GWT, beside the people paragraph, because a 4:3 crop would cut the fan of cards. At `sm`+ it floats right at `w-44` in a 9:16 box. Below `sm` it is a centered block at `w-1/2`.

Cut:
- Catan_end has no confirmed place or story. Beside "I stopped playing Catan" it would imply a return the owner never stated.
- GWT_AZ is a board only, with no person and no anecdote.
- Puerto_Rico_Bang is the same session as _2, which is the better photo.

**Captions** are ledger rows (game · place · people) with a part left out where the inventory has nothing for it. None carries a year. "The lab at ASU" identifies no one in the frame. **No lightbox**: each cell links to its JPEG.

**Alt text rules:** one plain sentence of what is visible. No names (captions carry them). No mood. Examples:
- TM_Lab: "Three people at a grey lab table around a Terra Mystica board; one gives a thumbs-up."
- Brass_SD_25: "Three people on a patterned carpet around a Brass: Birmingham board, a TV behind them."
- unlucky_hand_GWT: "A hand fanning four Jersey cow cards, each worth 1, over a Great Western Trail board."

## 5. The one thing not to add

**A win rate, in any form: a percentage, a coloured dot or a bar.** BGA's own "% wins" figure is not victories over games (79% printed against a real 45% for Terra Mystica). The old page printed false rates twice. Even a correct rate turns the page into a scoreboard, and a scoreboard is self-praise the reader has to take on trust. Games and victories side by side let a reader do the division if they care, and nothing more is claimed.

## 6. Ranked recommendation

**First: the proposal above.** Single text column, two short origin paragraphs, two mono ledgers, one people paragraph, eight-photo grid. It wins on three counts. The five-second reader gets a name and a number (`930 games`) before any image, which matches how every other page on the site opens. Each fact appears once: the prose states it, the ledger counts it, the caption locates it. It needs no client JavaScript and no component beyond `<figure>`.

**Strongest alternative: one photo beside each paragraph.** It lost for two reasons. At 420 px, nine full-width images push the ledger five screens down, so the one-scroll reader never reaches the record. And each caption would repeat its sentence, which breaks one name per thing. The cow hand stays inline as the single exception, because the photo is the anecdote.

**Also rejected:** a photo-first page, where the first thing a hiring manager sees is unnamed people with no claim attached. And a ledger-only page, which fails the sentence: the people are what BGA cannot count.
