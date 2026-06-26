---
title: One Coin Flip That Spans Fast Search and Cheap Search
date: '2026-05-18'
description: >-
  Two robotic-search strategies optimize opposite costs; randomly interleaving
  them with one tunable coin lets you slide between "find targets now" and
  "spend the least energy."
tags:
  - multi-armed-bandits
  - multi-agent-search
  - adaptive-sensing
  - robotics
  - thresholding-bandit
readTime: 11
---

Five drones hover over a hundred-cell grid. Somewhere in it sit a handful of cells worth caring about — a wildfire's hot edge, a poacher's camp, a leaking pipe — and you do not know how many. Each drone's sensor is cheap, light, and unreliable: one look at a cell returns a single noisy bit. You want every interesting cell flagged, fast, without draining the batteries, and you want to be told honestly when you can trust the answer. Which cell should each drone visit next?

That is the whole problem, and the tension inside it is sharper than it looks. If you let the drones chase information greedily, they teleport across the grid and burn energy. If you make them sweep tidily, they waste hours confirming empty cells before they ever surface a target. The two sensible strategies optimize for opposite costs. The work I led during my internship at Mitsubishi Electric Research Laboratories — with Stefano Di Cairano and Abraham P. Vinod — is, at heart, about refusing to choose between them.

## What exactly are we trying to recover?

Fix a discrete grid of cells $G$. Each cell $i$ has an unknown mean $\mu_i \in [0,1]$: every time an agent visits cell $i$, it draws one sample from $\text{Bernoulli}(\mu_i)$ — a noisy 1-or-0. Given a user threshold $\theta \in (0,1)$, the target is the set

$$S_\theta = \{\, i \in G : \mu_i \ge \theta \,\},$$

and we want to recover it with overall correctness probability at least $1-\delta$. We do not know the $\mu_i$, we do not know $|S_\theta|$, and the sensors lie. The $d$ agents move in parallel but must occupy distinct cells each step.

I am deliberately *not* covering the robotics stack underneath: I treat dynamics, no-fly zones, and energy limits as soft costs, not hard constraints. That is the honest scope, and I will come back to why it bites.

## Why doesn't the obvious approach just work?

The obvious approach is to pick whichever known strategy fits your priority and run it. There are two, and each is genuinely good at one thing.

**Label-then-move** (the AdaSearch line, Rolf et al. 2021; Locatelli et al. 2016's thresholding bandit) sends agents along a fixed sweep. At each cell they gather enough samples to confidently label it, then move on. The *next* location is data-independent — you decided the raster before you saw any data. Movement is cheap because the path is short and local. But the agents will happily spend their first hour confidently labeling empty cells, so the interesting ones surface late. For search-and-rescue, "late" is the failure mode.

**Pure bandit search** (Rolf et al. 2021; Du et al. 2021) is the opposite. Treat each cell as an arm, go where the data says the payoff is, and you flag targets fast. Two problems: it racks up movement cost teleporting to the most-informative cell wherever it is, and — the real dealbreaker — these methods identify the *maximal* or *top-k* arms, which means you must tell the algorithm how many interesting cells exist. In a real search you do not know that. That is exactly what you are trying to find out.

So neither family is fixable by parameter-twiddling. One is structurally blind to data; the other structurally needs a number you do not have. The crack between them is where the contribution lives.

## The one idea: flip a biased coin

Here is the move, and it is almost embarrassingly simple to state. Cast the search as a *thresholding* bandit — each cell an arm, the job to classify whether $\mu_i$ is above or below $\theta$, which never requires knowing how many cells are interesting. Then, at every step, **flip an $\alpha$-biased coin**, where $\alpha \in (0,1)$ is your one tuning knob.

- **Heads** (probability $\alpha$): take a data-driven bandit step. Send the $d$ agents to the $d$ most *informative* cells.
- **Tails** (probability $1-\alpha$): take a movement-minimizing label-then-move step. Send each agent to its nearest *unlabeled* cell.

The mental image I keep is a single dial. At $\alpha = 1$ you have pure bandit; at $\alpha = 0$, pure label-then-move; and $\alpha$ slides *continuously* between them. You are not picking a strategy — you are choosing a blend. Crank $\alpha$ up when finding targets fast is everything; turn it down when energy is scarce. Same code, one knob.

Because the underlying engine is a thresholding bandit, it finds *all* interesting cells with no prior count, and it is correct-by-construction: every label it commits is trustworthy even if you abort the mission early.

## How does a step actually get chosen?

The bandit (heads) step ranks cells by an optimistic score: my current best guess of a cell's mean, *plus* an error bar that shrinks the more I look. Go to the cells where that optimistic score is highest — either they look interesting, or I have barely sampled them and should.

To make that precise, let $H_i(t)$ be the history of observations at cell $i$ up to time $t$, so $|H_i(t)|$ is the integer count of how many times we have looked. Define the empirical mean $\hat\mu_i(t)$ over those looks and a confidence half-width

$$U_i(t,\delta) = 2\sqrt{\frac{2\log\!\big(\log_2(2|H_i(t)|)\big) + \log(12|G|/\delta)}{2\,|H_i(t)|}}.$$

The numerator is just "how sure do I need to be" — it grows only doubly-logarithmically with the sample count, the grid size, and the confidence budget; the denominator is how much evidence I have, so more looks shrink $U_i$. The acquisition score is $\hat\mu_i(t) + U_i(t,\delta)$, and unsampled cells get $\hat\mu_i = U_i = \infty$, which forces the team to cover the grid before exploiting anything.

Labeling uses the two-sided confidence band. Move cell $i$ into the **keep** set $K$ when its lower bound clears the threshold, $\hat\mu_i - U_i \ge \theta - \varepsilon$; into the **reject** set $R$ when its upper bound falls below, $\hat\mu_i + U_i \le \theta + \varepsilon$. Here $\varepsilon > 0$ is a tolerance: we explicitly accept that cells with $\mu_i$ in the boundary band $(\theta-\varepsilon,\, \theta+\varepsilon)$ may be mislabeled (Assumption 1). That tolerance is what makes finite-time guarantees possible — without it, a cell with $\mu_i$ exactly at $\theta$ would need infinitely many looks. The loop runs until every cell sits in $K$ or $R$.

## Work the smallest case: one drone, by the numbers

Scale all the way down to $d = 1$ on our experimental field: a $10\times10$ grid where interesting cells have $\mu = 0.85$, the rest $\mu = 0.15$, threshold $\theta = 0.5$. One look at a cell returns 1 with probability $\mu$.

- At $\alpha = 1$, the lone drone always darts to the highest-score cell. It flags the 0.85 cells quickly — but it crisscrosses the grid, and movement cost piles up.
- At $\alpha = 0$, it sweeps in a fixed pattern. Movement is cheap; the interesting cells surface slowly.
- At $\alpha = 0.2$, it mostly sweeps cheaply, but roughly one flip in five comes up heads and it darts to the most informative cell. It captures most of the bandit's quick-detection benefit at a fraction of the travel.

Why is this regime so forgiving? Because $0.85$ and $0.15$ sit far from $\theta = 0.5$. The per-cell hardness is governed by $\Delta_i = |\mu_i - \theta| + \varepsilon$, and the sample budget scales like $1/\Delta_i^2$. Large $\Delta_i$ means a handful of noisy looks settle a cell. The case that would hurt is a cell with $\mu$ near $0.5$ — small $\Delta_i$, so $1/\Delta_i^2$ blows up and that one cell demands many repeated looks. Hold that thought; it is the surprise.

## What does the theory promise?

Theorem 1 gives finite, high-probability ($\ge 1-\delta$) bounds on three quantities, built from two hardness parameters per cell. The first is $\Delta_i$ above (distance from the threshold). The second is $\Omega_i = \min_{j \in S_{\theta+\varepsilon}} |\mu_j - \mu_i|$ — how separable cell $i$ is from the genuinely interesting ones.

Before the formula: think of a single number that says "how many looks to settle this cell," a number that should be small when the cell is far from the threshold and should explode as it nears it. That is $\varphi_i$. Each hardness parameter gets packaged — via an anytime, iterated-logarithm-style confidence bound — into such a term:

$$\varphi_i = \frac{1}{\Delta_i^2}\,\log\!\Big(\frac{|G|}{\delta}\,\log\frac{|G|}{\Delta_i^2}\Big),$$

with an analogous $\gamma_i$ built from $\Omega_i$. As $\Delta_i \to 0$, $\varphi_i \to \infty$, exactly as intuition demanded.

The headline, which I will defend below, is the **termination-time** bound:

$$T_\pi \;\le\; \max_{i \in D_\Delta} O(\varphi_i) \;+\; \frac{1}{d}\sum_{i \notin D_\Delta} O(\varphi_i),$$

where $D_\Delta$ is the single hardest cell plus the $d-1$ easiest. Two facts matter. First, this bound is **independent of $\alpha$** — the dial does not change *when* you finish. Second, the priority-labeling time $L(\pi)$ and economic cost $E(\pi)$ both *do* move with $\alpha$: the labeling-time bound carries a penalty term $4(1-\alpha)|G|^2/(\alpha\delta)$ that grows as $\alpha \to 0$, and the cost bound scales with $(M\alpha + \beta)$, where $M$ is the maximum movement cost of a single step and $\beta$ the per-agent sensing cost. So one knob trades labeling speed against energy *while leaving total runtime untouched.* That decoupling is the pleasant structural surprise.

## The result that should bother you: more agents barely help

Look again at $T_\pi$. The summation term carries the $1/d$ — add agents, parallelize the bulk. But the **leading $\max$ term does not shrink with $d$ at all.** Adding drones does *not* buy you inverse-linear speedup.

The reason is the distinct-cells constraint, and it is worth dwelling on because it is where naive intuition fails. Agents must occupy different cells each step. The runtime is dominated by the single boundary-hard cell — the one with the smallest $\Delta_i$, demanding many *sequential* noisy looks. You cannot put ten drones on one cell to crush its variance ten times faster; they are forbidden from stacking. Once fewer than $d$ unlabeled cells remain, the surplus agents go idle. The bottleneck is inherently sequential, and parallelism cannot dissolve it.

The experiments confirm it (Fig. 3): sweeping $d \in \{1,2,5,10,20,40\}$, median samples-per-agent does fall — but stays *strictly above* the ideal inverse-proportional line. On the full setup (10 interesting cells, $d=5$, $\varepsilon = \delta = 10^{-3}$, $\beta = 0.01$, Manhattan movement, 100 trials), $\alpha \approx 0.2$ lands the best compromise: near the low priority-labeling time of pure bandit while keeping the low economic cost of label-then-move, and beating the AdaSearch baseline. Runtime is about $0.3$ ms per iteration in unoptimized Python.

## Where this goes vacuous, and the limits I will own

The load-bearing assumption is the boundary tolerance $\varepsilon$. Every finite bound runs through $1/\Delta_i^2$, and $\Delta_i = |\mu_i - \theta| + \varepsilon$. If a cell's mean sits exactly at $\theta$ and you demand $\varepsilon \to 0$, then $\varphi_i \to \infty$ and the guarantees go vacuous — the algorithm would sample that cell forever. The theory is only as strong as your willingness to give up on the boundary band.

The honest limitations: I do *not* enforce the drones' physical limits as hard constraints — dynamics, obstacles, and range live only as soft cost terms, so a planned step could be infeasible in the field. The model is also static: a moving wildfire front or a wandering animal breaks the fixed-$\mu_i$ assumption outright. Everything is simulation-only, one grid size, well-separated means, one external baseline. And the big-O constants in Theorem 1 are genuinely hidden — I will not pretend to numbers the paper does not state. (One note on provenance, kept to a sentence: the bandit backbone is Locatelli, Jun, Mason, and the AdaSearch authors we built on; this line of work later matured into a granted US patent, 12,393,191 B2, which I mention honestly as related and nothing more.)

## What I'd do next

Beyond the authors' stated agenda — hard physical constraints, non-stationary fields — the open question I find most alive is the distinct-cells constraint itself. The whole "agents don't parallelize the hardest cell" pathology is an artifact of forbidding co-location. If a few agents *could* share the boundary-hard cell and pool i.i.d. looks, does the $\max$ term finally pick up a $1/d$, or does some deeper sequentiality reassert itself? Closing the gap between the per-agent sample bound and ideal inverse-linear team-size scaling is, to me, the next paper. If you crack it, I want to read it.

---

*Paper: "Bandit-based multi-agent search under noisy observations," Parth Thaker, Stefano Di Cairano, Abraham P. Vinod. IFAC World Congress 2023, IFAC-PapersOnLine, pp. 2780–2785. [DOI 10.1016/j.ifacol.2023.10.1377](https://doi.org/10.1016/j.ifacol.2023.10.1377). MERL tech report [TR2023-085](https://www.merl.com/publications/TR2023-085). No arXiv preprint exists for this paper.*
