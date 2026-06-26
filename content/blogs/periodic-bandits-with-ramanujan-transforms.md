---
title: 'Learn the Calendar Once, Not the Leader Every Week'
date: '2026-04-10'
description: >-
  Why amnesiac non-stationary bandits keep paying to rediscover a periodic
  optimum, and how a number-theoretic period estimator lets the policy learn the
  cycle once instead.
tags:
  - Multi-Armed Bandits
  - Non-Stationary Learning
  - Ramanujan Periodicity Transform
  - Signal Processing
  - Regret Minimization
readTime: 9
---

Suppose the best slot machine in the room changes every Monday, comes back every Sunday, and has done this — quietly, on the same weekly clock — for as long as you have been playing. How many weeks should you go on being surprised by it?

Almost every bandit algorithm I know would answer: every week, forever. That struck me as absurd enough to be worth a paper, and it is the gap my coauthors — Vineet Gattani, Vignesh Tirukkonda, Pouria Saidi, and senior author Gautam Dasarathy — and I went after at ICASSP 2024.

## Why doesn't a non-stationary bandit already solve this?

The multi-armed bandit is the cleanest model of "learn while you earn." You face $K$ arms; pulling arm $i$ at time $t$ returns a noisy reward with some mean $\mu_i(t)$; you want to minimize regret, the cumulative gap between what you collected and what the best arm at each step would have paid. Classic theory makes one load-bearing assumption: $\mu_i(t)=\mu_i$, constant in time. Pull each arm enough and the leader reveals itself.

That assumption is the first thing reality breaks. Traffic, demand, energy load, even physiological signals all have a best action that *moves* — and moves on a schedule. The non-stationary bandit literature already knows the stationary model is too rigid, so this is where I want to be fair to it before I pivot.

The dominant response has been to treat drift as the *enemy*. Sliding-window UCB forgets old data so a stale leader can't dominate; discounted UCB down-weights the past geometrically; change-detection bandits run a statistical test and reset their estimates when they spot a shift. All three are good engineering, and for genuinely arbitrary drift they are hard to beat.

I want to be precise about the crack, though. Every one of these methods is *amnesiac by design*. Each treats a phase change as a fresh, unexplained event: detect it, throw away what you knew, re-learn the new leader. So in my weekly example they pay a re-learning cost on Monday, pay it again the next Monday, and again the Monday after that — accumulating regret on a schedule, while the world is repeating a pattern they refuse to remember.

## The one idea: learn the calendar once, not the leader every time

Here is the reframing I'd want a reader to keep. The hard part of a periodic environment is not tracking *which arm is best right now*. It is discovering **the period itself** — the length of the cycle on which the answer repeats. Once you know the period, "best arm right now" collapses from an endless tracking problem into a lookup against a calendar you only ever had to learn once.

So the object I care about is not the reward mean. It is the **support of the periods**: the set of integer cycle-lengths actually present in an arm's reward sequence. Recover that set, and the non-stationarity stops being an adversary and becomes a key.

The obvious way to hunt for periodicity is the Fourier transform — look for a spike in the spectrum. It fails here in an annoying way, and this is exactly the gap that motivated the periodicity-transform line of work in the first place: a clean period-$P$ integer signal does not sit on a single Fourier bin but smears across several of them — the fundamental together with its harmonics — and a finite, noisy window blurs them further. You end up estimating real-valued frequencies and then guessing which integer period produced them. For *integer* periods that is the wrong representation.

## Where Ramanujan sums come in

The tool that does fit the problem comes from a corner of number theory that Vaidyanathan (2014) and Tenneti & Vaidyanathan (2016) imported into signal processing: the **Ramanujan periodicity transform**. The atom is the classical Ramanujan sum, which has the standard closed form

$$c_q(n) \;=\; \sum_{\substack{k=1\\ \gcd(k,q)=1}}^{q} e^{\,2\pi i\,kn/q}.$$

Define every piece: $q$ is a candidate integer period, $n$ is the time index, and the sum runs only over the $k$ coprime to $q$. Two known properties of this object make it magical for our purpose. First, $c_q(n)$ is — famously — integer-valued despite the complex exponentials, and it is exactly periodic with period $q$; it is a basis element born to represent integer periods, not approximate frequencies. Second, the subspaces built from $\{c_q\}$ for different $q$ are mutually orthogonal. So a sequence can be split, by orthogonal projection, into a sum of components each living at one exact integer period.

The way I think about it: Fourier asks "what frequencies are present?" and gets a continuous answer you must round. Ramanujan asks "what *integer periods* are present?" and answers in the right alphabet. Period-support recovery then becomes a sparse selection — find the few $q$ whose subspaces carry the signal's energy — which the prior work poses as a penalized optimization over a periodicity dictionary. (That broader dictionary view, the family of Nested Periodic Matrices that also contains the DFT and Walsh–Hadamard transforms as special cases, lives in the cited work; what we lift into the bandit loop is the Ramanujan transform specifically.)

The contribution I'll actually defend is narrow and, I think, the interesting part: putting this period-support estimator *inside the policy loop*. The bandit observes rewards, the transform reads off which periods are active, and that structure feeds the arm-selection rule — so the policy can act on *where in the cycle it is* rather than rediscovering the leader after each shift.

## The smallest case that isn't trivial

Strip it to two arms and a period of 2 — the cycle is just "even step, odd step." Let arm A pay mean $1$ on even $t$ and $0$ on odd $t$, and arm B the reverse:

$$\mu_A = (1,0,1,0,\dots), \qquad \mu_B = (0,1,0,1,\dots).$$

A sliding-window or change-detection method sees the arm it is holding flip from good to bad every single step. It is forever inside a "change" — its window never contains a stable leader, so it spends its life re-detecting and pays regret at a steady clip. There is no constant arm to find, which is exactly the regime its assumptions were built to escape.

Now read the same sequence through the Ramanujan lens. Each arm's sequence decomposes cleanly into two pieces: a constant (period-1) part and a period-2 part. The constant part is just the arm's mean — here $0.5$ for both A and B — and being identical across the arms it says nothing about which one to pull. The period-2 component is the entire story: it is where the two arms disagree, and it is what the projection picks out. So the honest support is $\{1,2\}$, but only $q=2$ carries the time-variation that drives arm selection. (If you prefer the support to read as a single integer, recenter the rewards to zero mean — $\mu_A=(+1,-1,+1,-1,\dots)$, $\mu_B$ its negation — and the period-1 component vanishes outright, leaving support $\{2\}$.)

Either way, that one integer is the whole calendar. Once you know the relevant period is 2 and you have seen a single cycle, the rule is trivial — pull A on even steps, B on odd — and you stop paying the per-step re-learning tax. Push the period to 7 and you recover the weekly story from the opening: detect the period-7 component, learn the within-week phase pattern once, then pull A early-week and B late-week. The mechanism is identical; only the cycle length changed.

## What the result is — and what I won't claim

The honest statement of the main result: we propose a period-aware bandit algorithm that estimates the support of the periods via the Ramanujan transform and uses that recovered structure inside a regret-minimizing policy. The whole bet is that *learning the period once* should beat *re-detecting the leader every cycle* in environments that genuinely repeat.

I am going to resist the temptation to quote a clean regret rate at you. This is a short, four-to-five-page ICASSP paper, so its theoretical and empirical scope is deliberately tight — and I'd rather you take away the mechanism (period-support recovery driving the selection rule) than a headline number I'd have to over-hedge. The load-bearing claim is the modeling one: when non-stationarity is periodic with recoverable integer periods, the right move is to estimate that structure, not to out-run it.

## Where this goes vacuous

Every assumption I lean on is also the failure mode, so let me name it. The method earns its keep only when the drift is *actually* periodic with *integer* periods the transform can recover. Against adversarial or aperiodic drift it should offer no advantage over the change-detection methods — there is no calendar to learn, and the amnesiac approach is correctly amnesiac. And there is a horizon trap: if the period $P$ is large relative to how long you get to play, you may never observe a full cycle, and you cannot estimate the support of a period you have not lived through once. In that regime the elegance collapses back to ordinary non-stationary learning.

A few questions I genuinely don't have answers to, and would chase next. How much data and how favorable a noise level does reliable support recovery actually need? What happens with *multiple* coexisting periods, or periods that are only *approximately* integer, or that slowly drift themselves? Should the transform be run per-arm or jointly, borrowing strength across arms that share a clock? And on the theory side, what is the right *lower* bound for periodic bandits — how much can knowing-the-environment-repeats provably buy you? That last one is the question I'd most like the next paper to answer.

---

*"Non-Stationary Bandits with Periodic Behavior: Harnessing Ramanujan Periodicity Transforms to Conquer Time-Varying Challenges,"* Parth Thaker, Vineet Gattani, Vignesh Tirukkonda, Pouria Saidi, Gautam Dasarathy (Arizona State University), ICASSP 2024, pp. 7790–7794. [Paper (IEEE Xplore, DOI: 10.1109/ICASSP48485.2024.10447590)](https://doi.org/10.1109/ICASSP48485.2024.10447590). There is no arXiv preprint or public code release for this one.
