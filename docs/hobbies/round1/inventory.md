# Hobbies page: inventory of the current page (read 2026-11-09)

Source files: `src/app/hobbies/page.tsx`, `src/components/GamingMemories.tsx`, plus the three
components the page also mounts (`GameShelf.tsx`, `GamingJourney.tsx`, `FunFact.tsx`) and one
unmounted component (`GameGallery.tsx`). Everything below is what the files say, not what is true.
Items marked ? are unverified or contradict another line of the same inventory.

## Hobbies named
Exactly one: board games, specifically heavy Euro games, with chess as the origin story. No other hobby
appears anywhere on the page.

## Links
- Board Game Arena profile: https://boardgamearena.com/player?id=85701539
- YouTube match: https://www.youtube.com/watch?v=vNj7M6bjSeA. oEmbed title: "Fire Two Open S2 - Ro24
  Group C (Terra Mystica)", channel Fire Two Tournaments. ? The page calls this a championship
  semifinal; the video title says round of 24, group C.
- BoardGameGeek ids for 11 games (see table).

## Headline numbers (page.tsx, captured around mid-2025 going by file dates)
- 794 games played on BGA
- 11k+ mastery points (BGA "XP")
- 133 achievements

## Timeline (GamingJourney.tsx)
1. Age 8–9: chess taught by his father. Did not pursue chess seriously.
2. Undergrad (IIT Madras, 2011–2016 per the About page): a close friend brought Die Siedler von Catan to the
   dorm; the group queued for hours to play the four-player game.
3. Graduate school: left Catan after building around 6s and 8s and watching "seven consecutive 5s" roll. ?
4. Graduate school: found Terra Mystica; studied faction guides and tournament videos.
5. Present: introduces friends; Terra Mystica championship semifinal; wife likes Viticulture; PhD colleagues
   took to Gaia Project; several games always running on BGA.

## Game table (GameShelf.tsx; BGA rating = BGA ELO-style number)
| Game | BGA rating | Games | Wins | Stated win % | Wins/games | BGG id | Note in file |
|---|---|---|---|---|---|---|---|
| Terra Mystica | 438 | 378 | 176 | 80 | 47 ? | 120677 | favourite; all editions incl. Fire & Ice, fan factions, Age of Innovation; championship semifinal |
| Gaia Project | 244 | 27 | 11 | 57 | 41 ? | 220308 | |
| Age of Innovation | 238 | 33 | 11 | 41 | 33 ? | 383179 | |
| 7 Wonders | 202 | 60 | 15 | 52 | 25 ? | 68448 | |
| Kingdomino | 197 | 17 | 9 | 71 | 53 ? | 204583 | |
| Teotihuacan | 176 | 19 | 9 | 59 | 47 ? | 229853 | |
| Puerto Rico | 162 | 17 | 7 | 50 | 41 ? | 3076 | |
| Viticulture | 141 | 8 | 4 | 36 | 50 ? | 183394 | wife's favourite |
| 7 Wonders Duel | 115 | 12 | 4 | 36 | 33 ? | 173346 | |
| Splendor | 100 | 23 | 10 | 31 | 43 ? | 148228 | wife's favourite (FunFact) |
| Brass: Birmingham | 50 | 15 | 6 | 40 | 40 | 224517 | "currently obsessing over" |

Sum of listed games: 609 of the 794 headline. The stated win percentages match wins/games for no row
except Brass, so one of the two columns is wrong.

## Photos (`public/gaming-memories/`, 12 files, 10 used)
| File | Size | Game | Place (caption) | People (caption) | Caption gist |
|---|---|---|---|---|---|
| Brass_SD_25.jpg | 1280×960 | Brass: Birmingham | San Diego, CA | ASU friends | floor game; "25" in filename, probably 2025 |
| Puerto_Rico_Bang_2.jpg | 1280×964 | Puerto Rico | Bangalore | IIT Madras friends | board-game café scene |
| GWT_Aniket_ASU.jpg | 1280×960 | Great Western Trail | ASU | PhD colleague Aniket | teaching him the game |
| unlucky_hand_GWT.jpg | 900×1600 | Great Western Trail | — | — | a hand of four value-1 Jersey cows |
| pipeline_ASU.jpg | 1280×960 | Pipeline | ASU | two friends | tried it, did not take to it |
| TM_Lab.jpg | 1280×960 | Terra Mystica | research lab | labmates and professor | professor enjoyed it |
| Catan_end.jpg | 1280×960 | Catan | — | three friends on a carpet | return to Catan |
| Brass_SF.jpg | 1280×1700 | Brass: Birmingham | San Francisco | — | first game of Brass |
| Splendor_Mumbai.jpg | 1280×960 | Splendor | Mumbai | wife | her favourite game |
| ghost_stories.jpg | 1280×1707 | Ghost Stories | home | — | cooperative game after a long day |
| GWT_AZ.jpg | 1280×964 | Great Western Trail | Arizona (filename) | — | unused; board on a glass table |
| Puerto_Rico_Bang.jpg | 1280×964 | Puerto Rico | Bangalore (filename) | — | unused; same session as _2 |

No photo has a year. All are phone photos of tables or floors mid-game; faces are visible in seven.

## Other claims (FunFact.tsx, GameGallery.tsx)
- Converted his PhD advisor into a Terra Mystica player (About page names the advisor: Prof. Gautam Dasarathy).
- Wife's favourite games: Splendor and Viticulture.
- "Played across 3 continents: Bangalore, San Diego, San Francisco". ? Those are two continents; Mumbai and
  Arizona add no third.
- Soft counters: 15+ games mastered, 50+ friends converted, 5+ games always running, 80% Terra Mystica win rate.
- GameGallery (unmounted): Geodens as his usual Gaia Project faction; a 163-point Teotihuacan game from a
  pyramid timing combo; Pyramids of Giza as his 7 Wonders strategy; a Puerto Rico loss blamed on Mayor timing. ?
- Sentiment lines to drop: "gateway drug", "happy wife, happy gaming life", "every game is a small
  optimization problem", "RNG is not strategy".

## Adjacent fact not on the page
The workspace holds a Catan reinforcement-learning research repo (`catan-RL`, Rust engine plus PyTorch
training). It is not yet in `content/projects/` or in the expertise fields. If it is public or will be, the
hobby page has one checkable link to the research.

## Owner's answers (2026-11-09)
- Board games only. No other hobby goes on the page.
- Tournament: keep it as round of 24. Verified from the video description: Fire Two Open Season 2, a Terra
  Mystica live-play tournament streamed on Twitch 4 Nov to 12 Dec 2020; round of 24, group C; players
  ChristopherHo, jesseg, firexed, r_ikiri; commentary by Claybo and Ranior; video published 12 Nov 2020.
- No photo years anywhere.
- Names are fine (Aniket, Prof. Gautam Dasarathy). "My wife" as written. Faces in the photos stay.
- Anecdotes confirmed accurate: seven consecutive 5s before leaving Catan; a hand of four value-1 Jersey cows in
  Great Western Trail; 163 points in one Teotihuacan game; Geodens as the usual Gaia Project faction.
- Do not mention the Catan research repo.
- Chess: taught by his father at 8 or 9, left at an early age, never revisited. One sentence at most.

## Board Game Arena profile, read 2026-11-09 (handle r_ikiri, id 85701539)
Member since 21 Mar 2020 · 930 games played · 11k XP · 154 achievements · 54 friends · reputation 100% ·
groups: Zoras_bg on twitch, redditboardgames, Mind Sports Olympiad Grand Prix · 4 turn-based games running.
The first number is BGA's ranked game count; (+N) is BGA's count of other games (training or friendly).
BGA's "% wins" is not victories divided by games (Terra Mystica: 185/408 = 45%, BGA says 79%), so the page
must not print it as a win rate. Games and victories are safe.

| Game | Rating | Games | Victories |
|---|---|---|---|
| Terra Mystica | 477 | 408 (+23) | 185 |
| Gaia Project | 224 | 50 (+2) | 15 |
| Age of Innovation | 212 | 46 (+11) | 16 |
| 7 Wonders | 202 | 60 (+2) | 15 |
| Kingdomino | 196 | 17 (+2) | 9 |
| Teotihuacan | 176 | 19 (+3) | 9 |
| Viticulture | 141 | 8 (+28) | 4 |
| 7 Wonders Duel | 114 | 12 (+21) | 4 |
| Puerto Rico | 100 | 20 (+2) | 7 |
| Ark Nova | 100 | 30 (+2) | 6 |
| Splendor | 100 | 24 (+49) | 10 |
| Heat: Pedal to the Metal | 91 | 8 (+2) | 1 |
| Great Western Trail | 81 | 5 (+1) | 2 |
| Agricola | 54 | 5 (+10) | 1 |
| Stone Age | 44 | 1 (+1) | 0 |
| Clans of Caledonia | 30 | 1 (+14) | 1 |
| Catan | 0 | 1 (+1) | 1 |
Plus one or two games each of Martian Dice, Perudo, Regicide, Go Nuts for Donuts, Terraforming Mars, Saboteur,
and unranked-only plays of Ticket to Ride (11), Parks (8), Lost Ruins of Arnak (4), Carcassonne (4), Harvest,
Splendor Duel, Ticket to Ride: Europe, Wingspan, Barrage, Space Base.

Terra Mystica statistics page (BGA averages per game, r_ikiri vs all players vs winners): total VP 132.0 vs
116.8 vs 139.2; power gained via structures 31.6 vs 22.2 vs 21.7; VP lost to gain power 13.7 vs 9.3 vs 9.1;
VP via faction ability or stronghold 10.9 vs 5.9 vs 6.7; towns founded 2.41 vs 2.10 vs 2.38; favor tiles 3.48
vs 3.37 vs 3.62. Recent results on the profile are mostly Age of Innovation and Ark Nova. He registered for
"Ark Nova training • ELO 100 to 200" the day before this was read.
