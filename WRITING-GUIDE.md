# The Paper-Explainer Style Guide

*For Parth K. Thaker — theory-leaning ML research posts (nonconvex optimization, bandits, graph theory, applied LLM systems). A living doc: distilled from how the best research expositors (Off the Convex Path, Lilian Weng, Francis Bach, Distill/Olah, Gregory Gundersen, Eugene Yan) actually write. Use it for every new post.*

The point of every post is double: explain a result *and* leave a sharp researcher thinking "this person could have written the next paper." A summary proves you read the paper. A great post proves you metabolized it.

---

## 1. Goal & Audience

Write for **a competent researcher one subfield over** — and for your own past self, the version who hadn't yet understood this. If you surface the exact confusion you had to overcome, you've named theirs too.

What the reader should get at three time scales:

- **30 seconds** (title + first sentence + one figure): the *question* and why it's surprising or hard. They should feel a tension they want resolved.
- **2 minutes** (skim headings, bolded claims, the one load-bearing figure): the single key idea, named, and why the naive approach fails.
- **10 minutes** (full read): the load-bearing math worked on the smallest nontrivial case, the honest limits, and one forward-pointing open question.

---

## 2. Okayish vs. Great

| Dimension | Okayish | Great |
|---|---|---|
| Opening | "In this paper, the authors study…" | A live puzzle: the naive thing *should* work / *shouldn't* work — and yet. |
| Framing | Paraphrases the abstract in the paper's order | Reorganizes around ONE distilled insight the paper never stated |
| Motivation | "This is hard because dimension is high" | The reader's own question: "naive search needs poly(d) — so why does polylog(d) suffice?" |
| Math | Reproduces the full proof | Proves the quadratic / 2-arm / path-graph special case that exposes the mechanism, defers the rest |
| Claims | Hedges everything into mush | A sharp claim + its precise boundary: "optimal up to the log factor, which I'll argue is real" |
| Limitations | Boilerplate disclaimer | Names the load-bearing assumption, how realistic it is, the open question it leaves |
| Voice | Voiceless, could be anyone | "I think the lower bound is the real result and the experiments are a sideshow" |
| Credit | Vague or competitive | Generous and by name ("Halko et al. introduce…"), so your added value stands out |
| Ending | Stops when the summary is done | A conjecture or open question that recruits the reader |
| Figures | Re-illustrate the text | Create the central tension (observed vs. predicted) or reveal *which* things relate |

The throughline: **taste is shown, not asserted** — through which obstacle you dwell on, which assumption you flag as load-bearing, which prior approach you explain *had* to fail.

---

## 3. Canonical Structure (reusable template)

1. **The hook (1–3 sentences).** Open cold on the question as a live tension. No title-drop, no venue, no abstract. *"Gradient descent shouldn't work on a nonconvex loss — and yet it does. The honest version of why took fifteen years."*
2. **Stakes & scope.** Why a competent reader should care (2 sentences), then what you are deliberately *not* covering. Explicit boundaries read as authority, not evasion.
3. **The gap.** Accept prior work as far as it goes, then pivot to the precise crack: *"It was known GD escapes saddles asymptotically; the open problem was efficiency."* Tension, not a literature dump.
4. **Why the obvious thing fails.** Walk the naive approach a smart reader would try and show exactly where it breaks. Highest-density taste signal; motivates the contribution for free.
5. **The one key idea.** State the single transferable insight — named, in one sentence, with its load-bearing image — *before* any formalism. ("The stuck region is a thin pancake.")
6. **The smallest nontrivial case.** Work the 2-arm bandit / quadratic / path graph with explicit numbers. This proves you understand the mechanism, not just the statement.
7. **The load-bearing math.** Derive the one-line core argument in full; name the technique out loud ("by Laplace's method…"); annotate equations inline; push regularity conditions to footnotes/appendix/"see the paper." State the main theorem crisply; you may explain rather than prove it.
8. **Evidence.** Figures that manufacture the theory-vs-reality gap *first*, then resolve it; experiments layered synthetic → planted → real.
9. **Honest limits & the open question.** The regime where it's vacuous, the astronomical constant, the unverifiable assumption — then "what I'd do next."
10. **Close the loop.** Reproduce a figure, distill a "which method when" decision, or pose a conjecture. Never end on abstraction.

For a short reflective "my take," collapse to 1 → 5 → 8 → 9. For a full derivation explainer, add a TOC and a notation table up front.

---

## 4. Voice & Tone

First-person, confident-but-humble, reasoning *with* the reader, not lecturing *at* them. Study a great expositor's *method*; never imitate their *manner*. Your voice is the thing a content pipeline can't fake.

**Preferred moves:** take a defended position; flag the hard step ("I'll do this in painful detail"); credit original authors continuously by name; scope your contribution as a service ("I reproduced the figures / here's the connection I noticed"); use connective signposts ("In words," "To see why," "Notice that"); name where understanding breaks ("don't be fooled by me throwing around 'self-attention'").

**Banned moves:** "In this paper, the authors…"; reverent tone that treats the paper as flawless; false neutrality / uniform hedging; jargon used to sound credentialed (it reads as cover for thin understanding); self-aggrandizement or stingy credit; equation dumps with no intuition layer.

Calibrate strength like Pike's Peak: "near the middle of Colorado" beats both "somewhere in Colorado" (vague) and "the exact center" (false). Max out strength *and* correctness together.

---

## 5. Math & Intuition

- **Intuition strictly precedes formalism, every time.** Geometric/verbal picture → notation. An equation is never the reader's first contact with an idea.
- **Notation is a label for a felt thing.** Introduce a symbol only after the reader feels what it denotes; define dimensions at the moment of introduction ("let w_a ∈ ℝ^p"). For a theory audience this is the highest-trust signal — it shows you can be trusted with the bookkeeping.
- **The one-key-idea rule.** Compress the whole result to a single named mental image that survives even if the proof is forgotten. One load-bearing object per post — don't scatter five competing metaphors.
- **Three layers, reader self-selects depth:** (1) plain-language "why it's true," (2) the key inequality/lemma that carries the argument, (3) pointer to the full proof.
- **Show the load-bearing step, defer the bookkeeping.** Name the technique before using it so no step feels magical; track terms by color through a derivation.
- **Scale down before up.** Smallest regime first (one arm, two points, dim-4), then general n.
- **Figures do work prose can't** — show *which* things relate and *where* the trajectory bends, not merely *that* a relationship exists. Use surprise markers ("Rather surprisingly,") to flag where a result defies intuition.

---

## 6. Titles, First Sentences, Closings

**Titles** promise an insight, not a paper name. *"Why does SGD escape saddle points?"* beats *"A summary of [Paper]."* Lead with the question or the surprise.

**First sentences** pose the problem; they never announce the topic. Patterns:
- Dichotomy: *"Convex functions usually have one minimum. Nonconvex functions can be far stranger."*
- Paradox: *"A naive search should need poly(d) steps. It needs polylog(d). Here's why."*
- Lived experience: *"Your favorite restaurant is around the corner — go every night and you'll never discover the better one two blocks away."*

**Closings** point forward. Patterns:
- Open question: *"Whether the dependence on the spectral gap is necessary remains open."*
- Honest scope: *"Going beyond quadratics is still open; I'd start by…"*
- Actionable distillation: *"So: use Adam when…, plain SGD when…"*
- Invitation: *"Any obvious approaches I've missed? Tell me."* (Lowers the wall, invites correspondence — useful while job-hunting.)

---

## 7. Length & Pacing

Match length to ambition: a reflective take runs ~1,000–1,500 words; a full derivation explainer earns 3,000–6,000. Don't pad a take into a treatise or compress a derivation into a tweet.

Sections run **200–400 words, one idea each**, depending only on the prior one, ending with a one-line recap before the seam. Phrase headings as the reader's own question ("Why is this hard?", "What's the key idea?"). Write a fast bad draft, then cut ruthlessly — depth comes from compression; every surviving sentence earns its place. Footnotes hold digressions so the main line stays sharp.

---

## 8. Pre-Publish Checklist

- [ ] Does the **first sentence** pose a question/tension, not announce a topic?
- [ ] Does the **title** promise an insight rather than name a paper?
- [ ] Is there **one named key idea** a reader carries away a week later?
- [ ] Did I show **why the obvious approach fails** before the real one?
- [ ] Is there a **smallest-nontrivial-case** worked with explicit numbers?
- [ ] Does **intuition precede every equation**, with each symbol dimensioned at introduction?
- [ ] Did I **name the proof technique** instead of "after some algebra"?
- [ ] Is there **at least one sharp, defended claim** (not uniform hedging)?
- [ ] Did I name the **load-bearing assumption** and where the result goes vacuous?
- [ ] Is there a **forward-pointing open question or conjecture**?
- [ ] Are the **original authors credited by name**, my contribution scoped as a service?
- [ ] Does at least one **figure create tension or reveal structure** (not decorate)?
- [ ] Is the **length matched to the mode**, with nothing paddable left?
- [ ] Read **aloud** — simple words for hard ideas, no fancy prose hiding thin understanding?
- [ ] Would a reader who *already read the paper* still learn something (a reframing they didn't have)?

---

## 9. Anti-Patterns

- **Formalism-first openings** — definitions/notation before the reader cares.
- **Reproducing the full proof** — signals insecurity, buries the one idea worth keeping.
- **Asserting "hard/important/surprising"** without converting it into a concrete question or a visible gap.
- **Magical derivations** — "after some algebra we obtain," with the load-bearing step hidden.
- **Metaphor sprawl** — a new analogy every section, so none becomes load-bearing.
- **Drifting notation** — reused symbols, undeclared shapes; instantly undercuts depth.
- **False neutrality / uniform hedging** — reads as having no judgment, the opposite of taste.
- **Reverence** — never naming a limitation makes you look unable to see them.
- **Jargon as cover** — fancy writing conceals the lack of ideas; experts read straight through it.
- **Summarizing in the paper's own order** — a depth post needs *your* reorganization.
- **Decorative figures** — illustrating the answer instead of setting up the problem.
- **Ending on abstraction** — no figure, no decision, no "so what," no open question.
