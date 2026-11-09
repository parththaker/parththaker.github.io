# Council round 1 brief: the Hobbies page

You are one voice in a blind design council for a personal research site. Answer independently and
concretely, in 1,200 to 1,800 words. Do not read or guess at the other voices. The job is a page about one
hobby, board games, on the site of a research engineer, written so that it sounds like the owner and not
like a content pipeline. Two of you are known to be good at hearing generated text; that is the main job
here. Two of you are strongest on structure and visuals; say what the page should be built from.

## The site
parththaker.github.io. Next.js static export, Tailwind, light and dark themes. Swiss typographic: Archivo for
headings and small caps, Source Serif 4 for prose, JetBrains Mono for data lines, hairline rules, one red
accent used sparingly, flush-left, 3xl to 4xl page titles, section headings in small uppercase mono or 2xl
bold. The other pages are quiet lists: Papers, Projects, Writing, Notes, About. The one illustrative page is
Expertise, a map of the owner's work drawn as terraced mesas. The owner is Parth Thaker: Ph.D. in nonconvex
optimization and bandits (ASU, 2024, advised by Prof. Gautam Dasarathy), B.Tech and M.Tech from IIT Madras
(2016), now an AI research engineer at Intuitive Surgical in Sunnyvale. The nav currently reads Expertise ·
Papers · Projects · Writing · Notes · About · Hobbies.

## The page as it stands (to be replaced, not patched)
Route /hobbies. Written by an older model; the owner says it "reads as generated". Treat it as the inventory
of what he wanted to show, not as a design. Top to bottom:
- Centered h1 "Strategic board games" with the second word in red; subtitle "What started as chess with my
  dad turned into a long-running habit of heavy Euro games. Every game is a small optimization problem,
  which is probably why I never stopped."; a red button "My Board Game Arena profile".
- A three-cell stat strip: 794 games played · 11k+ mastery points · 133 achievements.
- "Gaming Chronicles": a masonry grid of ten photos with white overlay titles ("Brass Bros in San Diego",
  "PhD Colleague Conversion", "The Cow Catastrophe"), an emoji badge per photo, a modal with the caption in
  italics and a purple "Fun Fact" box ("Proof that even cow games can break your heart").
- "Did You Know?": a carousel of six fun-fact cards that auto-rotates every four seconds, then four soft
  counters (15+ games mastered, 50+ friends converted, 5+ games always running, 80% Terra Mystica win rate).
- "The Collection": eleven game spines on a wood-grain shelf, spine height from BGA rating, a win-rate
  dot coloured green/yellow/red, modal with BGG link and four stat tiles.
- "The Strategic Evolution": a five-step timeline with gradient circles and emoji (The Chess Apprentice, The
  Catan Awakening, The Luck Rebellion, The Terra Mystica Revelation, The Strategic Evangelist), each card
  expanding to a paragraph in italics; a "Fun Fact" callout with a trophy emoji and "Watch the match →".

## The inventory (every fact the owner has confirmed; nothing else may be stated)
Origin. His father taught him chess at eight or nine. He left chess at an early age and never went back.
At IIT Madras a close friend brought Die Siedler von Catan to the dorm and the group queued to play the
four-player game. In graduate school he built a Catan position around 6s and 8s, watched seven consecutive
5s, and stopped playing Catan. Then Terra Mystica: no dice, no card luck, asymmetric factions; he read
faction guides and watched tournament games.

Board Game Arena, handle r_ikiri, profile https://boardgamearena.com/player?id=85701539, read 9 Nov 2026:
member since 21 Mar 2020 · 930 games · 11k XP · 154 achievements · 54 friends · four turn-based games
running · groups: Zoras_bg on twitch, redditboardgames, Mind Sports Olympiad Grand Prix.
Per game, rating · ranked games (+other games, training or friendly) · victories:
Terra Mystica 477 · 408 (+23) · 185. Gaia Project 224 · 50 (+2) · 15. Age of Innovation 212 · 46 (+11) · 16.
7 Wonders 202 · 60 (+2) · 15. Kingdomino 196 · 17 (+2) · 9. Teotihuacan 176 · 19 (+3) · 9. Viticulture 141 ·
8 (+28) · 4. 7 Wonders Duel 114 · 12 (+21) · 4. Puerto Rico 100 · 20 (+2) · 7. Ark Nova 100 · 30 (+2) · 6.
Splendor 100 · 24 (+49) · 10. Heat 91 · 8 (+2) · 1. Great Western Trail 81 · 5 (+1) · 2. Agricola 54 · 5
(+10) · 1. Clans of Caledonia 30 · 1 (+14) · 1. Catan 0 · 1 (+1) · 1. Single plays of a dozen others;
unranked-only plays of Ticket to Ride (11), Parks (8), Lost Ruins of Arnak (4), Carcassonne (4).
BGA's own "% wins" figure is not victories over games (Terra Mystica 185/408 = 45%, BGA prints 79%), so the
page must never print it as a win rate. Games and victories are safe to print.
Terra Mystica profile averages per game (him · all players · winners): total VP 132 · 117 · 139; power
gained via structures 31.6 · 22.2 · 21.7; VP lost to gain power 13.7 · 9.3 · 9.1; VP from faction ability or
stronghold 10.9 · 5.9 · 6.7. Recent games are mostly Age of Innovation and Ark Nova; he registered for an
Ark Nova training tournament the day before the profile was read.

Tournament. Fire Two Open Season 2, a Terra Mystica live-play tournament streamed on Twitch, 4 Nov to 12 Dec
2020. He played the round of 24, group C, against ChristopherHo, jesseg and firexed, with commentary by
Claybo and Ranior. Video: https://www.youtube.com/watch?v=vNj7M6bjSeA (title "Fire Two Open S2 - Ro24 Group
C (Terra Mystica)"). The old page called this a semifinal; it was not. Say round of 24 or say nothing.

Anecdotes he confirms as true: Geodens are his usual Gaia Project faction. 163 points in one game of
Teotihuacan. A hand of four value-1 Jersey cows in Great Western Trail (photographed). His wife's games are
Splendor and Viticulture. His Ph.D. advisor played Terra Mystica with the lab and enjoyed it. His PhD
colleague Aniket learned Great Western Trail from him. He tried Pipeline and did not take to it. Ghost
Stories, a cooperative game, is what gets played at home after a long day. His first game of Brass:
Birmingham was in San Francisco; a later one with ASU friends in San Diego. Puerto Rico with IIT Madras
friends at a board-game café in Bangalore. Splendor with his wife in Mumbai.

Photos (`public/gaming-memories/`, phone photos, no years, none will be given a year):
1. Brass_SD_25.jpg, 1280×960: Brass: Birmingham laid out on a patterned carpet, three people on the floor,
   a TV behind. San Diego, ASU friends.
2. Brass_SF.jpg, 1280×1700 portrait: Brass board on a carpet, one player's crossed legs at the top edge.
   San Francisco, his first game of Brass.
3. Catan_end.jpg, 1280×960: three friends on a beige carpet around a finished Catan board, faces visible.
4. GWT_AZ.jpg, 1280×964 (unused today): Great Western Trail on an oval glass coffee table, no people.
5. GWT_Aniket_ASU.jpg, 1280×960: one person at a grey table with Great Western Trail in a dim office.
6. Puerto_Rico_Bang.jpg, 1280×964 (unused today): Puerto Rico on a wooden café table, hands and a phone.
7. Puerto_Rico_Bang_2.jpg, 1280×964: two players at that table, a full café of other tables behind.
8. Splendor_Mumbai.jpg, 1280×960: his wife on a wooden floor at a low table with Splendor cards.
9. TM_Lab.jpg, 1280×960: three people at a lab table around Terra Mystica, one giving a thumbs-up.
10. ghost_stories.jpg, 1280×1707 portrait: Ghost Stories board on the glass table, no people.
11. pipeline_ASU.jpg, 1280×960: two people at a wooden table with Pipeline.
12. unlucky_hand_GWT.jpg, 900×1600 portrait: a hand fanning four value-1 Jersey cow cards over the board.
Faces are already public on the live site and may stay. Names may be used: Aniket, Prof. Gautam Dasarathy.
His wife is "my wife".

Not to be used, by the owner's instruction: the soft counters (15+ mastered, 50+ friends converted, 5+
running), "three continents", "80% win rate", any photo year, any mention of his Catan research work.
Nothing may be invented: no new anecdote, no quote, no feeling he has not stated.

## House rules for the words
From the site's writing guide: first person, confident but plain, a careful engineer writing his own site;
simple words for hard ideas; no reverence, no jargon as cover, no triads for rhythm, no sentence that
announces its topic. From the Expertise council: write about the thing, never about the page; one name per
thing, everywhere; name the thing, not the interface ("Profile", not "click here"); numbers and nouns over
adjectives, and every sentence must be falsifiable; mono lines are ledger rows (value · value · value) with
no verbs and no instructions. For this page in particular, from the owner: personal, specific, no
self-praise, no "passionate about", no "I love", no lists of adjectives, no closing line about balance or
curiosity or what games taught him about research. Nothing that sounds generated.

## Who reads it
A hiring manager or professor who has read the Papers page and clicks Hobbies to see whether there is a
person here (most of the weight). A board gamer who found the BGA handle. Friends in the photos. A phone
visitor at 420 px. Five seconds, then one scroll.

## Questions
Q1. What is this page for, in one sentence, on a research engineer's site? Then apply the sentence: cut
    every element of the inventory that does not serve it. Rule on the tab label (Hobbies, Games, Board
    games, Play, something else).
Q2. Structure. One page in sections, or something else. How much text per hobby element (the origin, the
    BGA record, Terra Mystica, the tournament, the photos, the people). Whether any element earns a small
    visual or data element (a ledger of games with games and wins; a list of the people he taught; a map
    of the places; the Terra Mystica profile averages as a two-column comparison; nothing at all) and
    which must stay as a plain paragraph. The site is a static export: numbers are typed in and dated,
    never fetched live. Budget: one TSX file, no client state unless a lightbox is truly needed.
Q3. Copy. Rewrite every sentence that survives so that it says something specific and checkable against
    the inventory. Deliver the whole page text in order: title, any one-line kicker, each heading, each
    paragraph, each caption, each mono ledger row, the link labels, the HTML title and meta description.
Q4. Images. Keep, cut or replace each of the twelve photos; how many the page should carry (0 to 12); how
    they are laid out (one wide, a strip, a grid, inline beside text); how each is captioned (game · place
    · people, a sentence, nothing); whether a lightbox is needed; alt text rules.
Q5. One thing not to add to this page, ever, and why.

## Deliver
1. The one sentence and the cut list (what goes, in one line each).
2. The page, top to bottom, as a list of elements with a word budget each, and the data or visual decision.
3. The full copy deck in page order (every string that will appear).
4. The image decisions with captions and alt text.
5. The one thing not to add.
6. A ranked recommendation: your proposal first, then the strongest alternative you considered and why it
   lost. Reasons, not preferences.
