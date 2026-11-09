# Fable, round 1 (written before reading the others)

## 1. The sentence and the cut list
The page shows that there is a person behind the papers, by giving one hobby with a record a stranger can check.
Everything on it must be a fact about the games, the record, or the people at the table.

Cuts, one line each:
- The stat strip (794 · 11k+ · 133): XP and achievements are the site's gamification, not his record. One mono line with the game count replaces it.
- "Gaming Chronicles", the masonry grid, overlay titles, emoji badges, the modal and its "Fun Fact" box: all of it. Six photos with ledger captions replace ten with jokes.
- "Did You Know?" carousel and the four soft counters: three of the six facts are false or unmeasurable, the counters are invented, and a carousel is a slideshow nobody asked for.
- "The Collection" shelf: spine height from rating, win-rate traffic lights, BGG links in a modal. A table does the same job in a tenth of the pixels and without the colours.
- "The Strategic Evolution" timeline and its expanding cards: five titles that name him a hero ("The Strategic Evangelist"). The origin survives as one paragraph.
- "Every game is a small optimization problem", "gateway drug", "happy wife, happy gaming life", "RNG is not strategy": gone.
- "Semifinal": it was the round of 24.
- Tab label: "Hobbies" is a CV heading for a page with one hobby. Tab and h1 both read "Board games". The route stays /hobbies/ so old links hold.

## 2. The page, top to bottom
Width `max-w-3xl`, the About page's measure, since this is a reading page and not a map. Section headings in the About page's small uppercase style. No red except link hover. No client state at all: no lightbox, no modal, no carousel.

1. h1 "Board games" (4xl). Under it one mono ledger row, 11 px, muted: handle linked to the profile · member since · games. 12 words.
2. Origin paragraph, serif prose. Father's chess, Catan at IIT Madras, the seven 5s, Terra Mystica. 80 to 100 words. The only narrative on the page.
3. Section "Record". A table in mono tabular numerals: Game · Games · Wins · Note. Fourteen rows, every game with five or more ranked games, sorted by games played. The Note column is sparse and nounal (a faction, a best score, a person). Under the table one mono line with the source and date. This is the page's one data element; it is also the one thing a stranger can verify, which is why it is the centre and not the photos.
4. Section "Terra Mystica". One paragraph, 80 to 100 words: played most, the 2020 Fire Two Open round of 24 with the video link, and three numbers from the profile averages that say how he plays (points, power taken from neighbours, points paid for it). Those three numbers are the most personal thing on the page because they describe a style, not a result.
5. Section "At the table". Six photos in a three-column grid at 1300 px (two rows), one column at 420 px, each cropped 4:3, hairline border, caption below in mono as a ledger row (game · place · people). No overlay text on photos, no hover effects, no click.
6. Nothing after the photos. The page ends on a caption.

Total prose: about 200 words. Everything else is table and captions.

Visual or data element: the table only. A map of five cities would be decoration; a reading shelf is the wrong metaphor for games; the profile averages as a two-column chart would promote three numbers into an infographic. The Expertise map is the site's one picture and this page should not compete with it.

## 3. Copy deck, in page order
HTML title: `Board games · Parth K. Thaker`
Meta description: `The board games I play: my Board Game Arena record since 2020, Terra Mystica most of all, and photos from the table.`
Nav and footer label: `Board games`

h1: `Board games`
Ledger row under h1: `r_ikiri on Board Game Arena · member since March 2020 · 930 games` (handle is the link)

Origin paragraph:
> My father taught me chess when I was eight or nine. I stopped a few years later and never went back. At IIT Madras a friend brought Die Siedler von Catan to the dorm, and we queued to play it four at a time. In graduate school I built a Catan position around the 6s and 8s and watched seven 5s come up in a row. I stopped playing Catan. The game I moved to was Terra Mystica: no dice, no card draw, and factions that each play differently.

Section heading: `RECORD`
Table header: `Game · Games · Wins · Note`
Rows (ranked games, victories):
| Terra Mystica | 408 | 185 | Fire Two Open 2020, round of 24 (link) |
| 7 Wonders | 60 | 15 | |
| Gaia Project | 50 | 15 | Geodens |
| Age of Innovation | 46 | 16 | |
| Ark Nova | 30 | 6 | |
| Splendor | 24 | 10 | my wife's game |
| Puerto Rico | 20 | 7 | |
| Teotihuacan | 19 | 9 | best 163 |
| Kingdomino | 17 | 9 | |
| 7 Wonders Duel | 12 | 4 | |
| Viticulture | 8 | 4 | my wife's game |
| Heat: Pedal to the Metal | 8 | 1 | |
| Great Western Trail | 5 | 2 | once a hand of four value-1 cows |
| Agricola | 5 | 1 | |
Line under the table: `Ranked games on Board Game Arena, 9 Nov 2026 · training games not counted`

Section heading: `TERRA MYSTICA`
> Terra Mystica is the game I have played most: 408 ranked games and 185 wins. In 2020 I played in the Fire Two Open, a live Terra Mystica tournament streamed on Twitch, and my round-of-24 group match is on YouTube with commentary. My Board Game Arena statistics describe how I play. I finish with 132 points on average, against a site average of 117. I take power from my neighbours' buildings far more than most players, 32 power a game against 22, and I pay 14 points for it against their 9.

("on YouTube" is the link.)

Section heading: `AT THE TABLE`
Captions (ledger rows):
1. `Terra Mystica · the lab at ASU · my advisor and labmates`
2. `Brass: Birmingham · San Diego · friends from ASU`
3. `Puerto Rico · a board-game café in Bangalore · friends from IIT Madras`
4. `Splendor · Mumbai · my wife`
5. `Great Western Trail · four value-1 cows in one hand`
6. `Catan · the end of a game`

Nothing else. No colophon beyond the table's source line; no closing sentence.

## 4. Images
Keep six: TM_Lab (the advisor story needs no words), Brass_SD_25 (the best-composed photo of people and a board), Puerto_Rico_Bang_2 (the café behind them shows a scene, not a table), Splendor_Mumbai (the one photo of his wife, home, different light), unlucky_hand_GWT (the only photo that is itself a fact), Catan_end (the game the page starts with, and three faces).
Cut six: Brass_SF (legs and carpet, portrait, no people's faces, the fact survives nowhere because "first game" is a weak fact), GWT_AZ and ghost_stories (boards on a glass table with no people; a product photo of a game is not about him), GWT_Aniket_ASU (dim, one person; Aniket can be named in the table note if wanted), Puerto_Rico_Bang (duplicate session), pipeline_ASU (the only fact about it is that he did not take to it).
Layout: three columns at 1300 px, 4:3 crop with `object-cover`, hairline border, 16 px gutters; one column at 420 px, each image full width. The two portrait photos crop to 4:3 from the centre, which keeps the cows in frame. Captions below each photo in mono, 11 px, muted, as ledger rows; no sentence, no title, no emoji. No lightbox: the full file is 1280 px wide and the grid cell is about 280 px, so the crop loses detail, but the detail is a board, and anyone who wants a board can find a better picture of it.
Alt text describes what is visible, not the story: "Three people on a carpet around a Brass: Birmingham board, a television behind them."; "A hand holding four cattle cards, each worth one, over a Great Western Trail board." Alt never repeats the caption.

## 5. One thing not to add
A paragraph on what board games taught him about research, optimisation or engineering, in any form, ever. It is the sentence every generated hobbies page ends with. The reader who wants that connection has already made it from the table; the reader who does not would hear a pitch.

## 6. Ranked recommendation
First, the page above: one paragraph of origin, a fourteen-row ledger, one paragraph on the main game, six captioned photos. Reasons: the table is the only part a stranger can check, and it carries the anecdotes as notes so they never become fun-fact cards; the two paragraphs hold every sentence of narrative the inventory supports; six photos with ledger captions are a record, twelve with titles are a camera roll.

Second, a photo essay: eight to ten photos at full column width, each with a two-sentence caption carrying the facts, and no table. It lost because the photos are phone pictures of tables that look alike, so the page would read as a slideshow of carpets; because facts in captions cannot be scanned; and because it would make this page more illustrative than the Papers page, which inverts the site's weight.

Rejected outright: any live fetch from Board Game Arena (there is no public API, and a number that can change is a number that will one day be wrong on a static page); a per-game rating column (BGA's rating means nothing to a stranger and invites comparison); a win-rate column (BGA's percentage is not wins over games, and ours would be a number the profile does not show).
