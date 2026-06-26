---
title: The real cost of best-arm identification isn't the arms — it's the clusters
date: '2026-06-22'
description: >-
  When arms come with a similarity graph and rewards vary smoothly over it,
  best-arm identification's binding cost drops from the number of arms to the
  number of clusters.
tags:
  - multi-armed bandits
  - pure exploration
  - best-arm identification
  - graph signal processing
  - learning theory
readTime: 10
---

Suppose I hand you a recommender with two hundred million items and ask you to find the single best one. The textbook answer to best-arm identification is brutal and unambiguous: play every arm, and play each suboptimal arm on the order of $1/\Delta_i^2$ times, where $\Delta_i = \mu^* - \mu_i$ is the gap between the best mean reward $\mu^*$ and arm $i$'s mean $\mu_i$. The total sample budget scales as $\sum_{i} 1/\Delta_i^2$. With two hundred million arms, even *one pull each* is already infeasible — so the classical guarantee isn't merely expensive at this scale, it's vacuous: you can't even afford the single pass it assumes.

But that theory assumes arms are strangers to each other: pulling one tells you nothing about the rest. In the settings where huge arm sets actually show up — molecules in a screen, users in a social network, hyperparameter configurations — that assumption is throwing away the most useful thing we have. Similar molecules behave similarly. Adjacent users in a friendship graph like similar music. The question I want to answer is sharp: **if you're handed a similarity graph over the arms, and rewards vary smoothly over it, can the binding cost drop from "number of arms" to "number of clusters"?**

This is the work I led with Mohit Malu, Nikhil Rao (Microsoft), and Gautam Dasarathy, published at NeurIPS 2022. I'll focus on the maximizing (find-the-best) and satisficing (find-a-good-enough) problems for *pure exploration*. I am deliberately not touching regret minimization, which is where most graph-bandit work has lived.

## Why isn't this just spectral bandits again?

Let me give prior work its due. Graph-free pure exploration (Bubeck–Munos–Stoltz, Audibert–Bubeck–Munos, Even-Dar et al.) is tight and beautiful — but structurally incapable of scaling, because independence is baked in. The richer line uses graph side-information: side-observation bandits where a pull reveals correlated arms, and spectral bandits (Valko et al.), which treat rewards as a graph signal and lean on the Laplacian *spectrum*. Most of that targets regret.

The closest relative is the spectral pure-exploration setting (ref [32] in our paper). It gives an information-theoretic lower bound and a gradient-based scheme to estimate it. Two cracks bothered me. First, the benefit of the graph shows up only *indirectly* — through opaque spectral quantities you can't read off and say "this is why the graph helped." Second, the algorithm solves an optimization in an inner loop every round. At a hundred million arms, an inner optimization loop is itself the problem you were trying to escape.

I also want to head off a reflex: "isn't smoothness-over-a-graph just a linear bandit?" No. Linear and contextual bandits assume rewards live in a low-dimensional space. We assume no such thing — only that rewards are smooth over $G$. In the appendix we give a toy instance where a low-dimensional linear bandit simply cannot compete with the graph model. Smoothness is a genuinely different prior.

## Why the obvious fix fails

The obvious fix is: estimate each arm by averaging its neighbors' pulls, then run a standard UCB elimination. That breaks in two ways.

You still need a *principled* confidence interval for an arm you never pulled, and naive neighbor-averaging gives you no honest width. Worse, "how much does a pull on arm $i$ tell me about arm $j$" is not captured by the graph spectrum, and it is not captured by hop-distance either. Two arms can be one edge apart yet weakly coupled if that edge is a lone bridge, or far apart yet tightly coupled if many paths connect them. You need the right notion of information flow, and it isn't the obvious one.

## The one idea: pool plays by electrical resistance

Here is the mental image to keep. **Treat the graph as an electrical network — every edge a resistor — and let information flow like current.** Two arms strongly connected by many low-resistance paths share information almost as if they were the same arm; arms joined only by a thin high-resistance path barely inform each other.

Formally we measure smoothness with the Laplacian seminorm
$$\|\mu\|_G^2 = \langle \mu, L_G\, \mu\rangle = \sum_{(i,j)\in E} A_{ij}\,(\mu_i - \mu_j)^2,$$
where $L_G = D_G - A_G$ is the combinatorial Laplacian, $A_{ij}\ge 0$ the edge weight, and $\mu \in \mathbb{R}^n$ the unknown mean vector. We call rewards $\epsilon$-smooth if $\|\mu\|_G \le \epsilon$. Small $\|\mu\|_G$ means connected arms have close means — homophily, written as a single scalar.

Two coupled moves follow. First, estimate *every* arm — even the unplayed ones — by Laplacian-regularized least squares:
$$\hat{\mu}_T = \Big(\textstyle\sum_t e_{\pi_t} e_{\pi_t}^{\top} + \rho L_G\Big)^{-1}\Big(\sum_t e_{\pi_t} r_t\Big),$$
where $e_{\pi_t}$ is the indicator of the arm pulled at round $t$, $r_t$ the observed reward, and $\rho>0$ a regularizer trading data-fit against smoothness. This has a *closed form* — no inner optimization — and updates by a cheap rank-1 inverse per round.

Second, give every arm a confidence width governed not by its own pull count but by an **effective number of plays**
$$t_{\mathrm{eff},i} = \big[(N_T + \rho L_G)^{-1}\big]_{ii}^{-1},$$
where $N_T = \mathrm{diag}(\text{raw counts})$. A pull on a well-connected neighbor inflates $t_{\mathrm{eff},i}$ even if $i$ was never touched; with no graph it collapses back to the raw count $t_i$. The concentration guarantee (Lemma 3.2) is then
$$|\hat{\mu}_i - \mu_i| \le \sqrt{1/t_{\mathrm{eff},i}}\,\Big(2\sigma\sqrt{14\log(2 w_i/\delta)} + \rho\,\|\mu\|_G\Big),$$
where $\sigma$ is the sub-Gaussian scale and $w_i$ is a per-arm weight from the union bound over arms (it enters only inside a logarithm). Read it slowly: the width shrinks with *effective* plays, and the smoothness $\|\mu\|_G$ enters as a bias you can bound *because* rewards are smooth.

From resistance comes the load-bearing object. Define resistance distance $r_G(i,j) = R_{ii} + R_{jj} - R_{ij} - R_{ji}$ with $R = (L_G + \delta\mathbf{1}\mathbf{1}^{\top})^{\dagger}$, and the **influence factor** $I(j,G) = \min_{i} 1/r_G(i,j)$ over other arms in $j$'s component. High influence = electrically central = cheap to estimate from neighbors. This splits arms cleanly: **competitive** arms $H_D$ (small gap *and* poorly connected — still need many plays, like the classical world) versus **non-competitive** arms $N_D$ (eliminable fast, sometimes with zero plays). The smoother the rewards, the smaller $H_D$, the bigger the win. That dichotomy is the takeaway I'd want you to keep a week from now.

## The smallest case: 100 arms, two cliques

Take 100 arms in two fully-connected cliques of 50 each, no edges between them. Within a clique rewards are nearly identical ($\epsilon$-smooth). Put the optimal arm in clique A.

Classical best-arm ID must probe all 100, paying $\sum_i 1/\Delta_i^2$ over every suboptimal arm. GRUB — GRaph-based UCB — does this instead. Initialization pulls *one representative arm per connected component*. That is not a heuristic: the design matrix $V_T = \sum_t e_{\pi_t} e_{\pi_t}^{\top} + \rho L_G$ is invertible *if and only if* at least one arm per component is played (Appendix A). So initialization costs the number of components — here, 2 — not 100.

Now one bad sample from clique B's representative drives down $\hat{\mu}$ for *all* of B at once, because B's arms are electrically interchangeable. Every arm in B is non-competitive: its influence-factor-adjusted gap is large, so a single round of cyclic sampling eliminates the whole clique. With exactly one representative pulled in B and the remaining 49 discarded in that single round, those 49 arms are *never played*. A 100-armed problem collapses toward a 2-cluster problem. This is the surprise stated plainly: **the classical "play every arm at least once" intuition is false here**; the binding cost is clusters, not arms.

## What's the theorem, and where is it tight?

The main result (Theorem 4.4): with probability $\ge 1-\delta$, GRUB returns the true best arm within
$$T_{\text{suff}} = \min_{D}\ \sum_{C}\Big(\sum_{i\in C\cap H_D}\tfrac{1}{\Delta_i^2}\big(c_1\log\tfrac{c_2}{\delta\Delta_i} + \tfrac{\rho\epsilon}{2}\big) + \max_{i\in C\cap N_D}\tfrac{2}{\Delta_i^2}(\cdots)\Big)$$
rounds, the sum over components $C$, the min over subgraphs $D$ — so GRUB *automatically adapts* to whichever subgraph maximizes the influence factor. The interpretation (Remark 4.5) is the whole point: each competitive arm costs $O(1/\Delta_j^2)$, exactly the classical price, while non-competitive arms get discarded — in the authors' words, "even if they are never played." Classical $\sum_{i\in[n]} 1/\Delta_i^2$ becomes roughly $\sum_{i\in H} 1/\Delta_i^2$, and for clustered instances $|H| \ll n$.

Is this just a clever upper bound? No — and this is the one claim I'll defend hardest. For the class of isolated cliques with an isolated optimal node, any $\delta$-PAC algorithm ($\delta \le 0.1$) needs at least $T_{\text{necessary}}$ samples (Theorem 5.1, Corollary 5.2), matching the GRUB bound in its $\Delta_i$ dependence up to constants. The lower bound scales like a $|C_G|$-armed bandit — *number of clusters*, not arms. So on this important class GRUB is minimax near-optimal, and the cluster-count scaling is a property of the problem, not an artifact of our analysis.

The satisficing knob is one substitution. Call an arm $\zeta$-best if $\mu_i \ge \mu^* - \zeta$. Then $\zeta$-GRUB keeps eliminating until every survivor's half-width is $\le \zeta/2$, and Theorem 6.2 replaces every $\Delta_i$ by $\max\{\zeta, \Delta_i\}$. Near-ties with tiny $\Delta_i$ — whose $1/\Delta_i^2$ would otherwise explode — become cheap, because you simply stop once "good enough" is certified. (The term "satisficing" is Herbert Simon's.)

## What do the experiments actually show?

On synthetic stochastic block-model and Barabási–Albert graphs with 10 clusters, graph-free UCB's stopping time grows almost *linearly* in the number of arms, while GRUB stays roughly flat — and the improved sampling policies (Marginal Variance Minimization; Joint Variance Minimization in nuclear and operator norms, inspired by V-/$\Sigma$-optimal design) actually *improve* as arms increase, since more arms means denser intra-cluster connectivity (which I read as more information per pull, though the paper states only the connectivity fact).

On real subsampled social graphs — LastFM (229 nodes) and Github Social (242 nodes), BFS-subsampled from SNAP — the MVM policy finds the best arm in about 300 rounds versus about 4500 for graph-free UCB. An order of magnitude, on real homophilous structure.

## Where it breaks, and what I'd do next

Let me name the load-bearing assumption: **GRUB takes the smoothness bound $\epsilon \ge \|\mu\|_G$ as input.** When the graph is wrong or rewards aren't actually smooth, that input is a lie, and the guarantee goes vacuous — a misspecified graph offers no free lunch, and we do not analyze misspecification. Estimating $\epsilon$ in the wild is genuinely hard. Other honest limits: each step inverts an $n\times n$ matrix at $O(n^2\log n)$ (spectral sparsification should help, but we neither implement nor analyze that statistics-vs-computation tradeoff); rewards are assumed sub-Gaussian; near-optimality is proven for isolated-clique instances, not all graphs; and crucially, my strong theorem covers the *default cyclic* policy, while the policies that win empirically — MVM, JVM-N, JVM-O — have **no matching guarantee yet**. That gap between what I can prove and what works best is the most interesting thing on my desk.

So the forward question I'd most like answered: can we make the algorithm adaptive to *unknown* smoothness — estimating $\epsilon$ online with a goodness-of-fit test against $G$ — so that a wrong graph degrades gracefully instead of silently? And, relatedly, since clustering-based selection can deepen filter bubbles, can multiple similarity graphs be combined to get the sample savings without reinforcing polarization? If you can certify the graph as you go, best-arm identification over hundreds of millions of arms stops being a fantasy.

[Read the paper](/papers/maximizing-satisficing-bandits-graph/) · [arXiv:2108.01152](https://arxiv.org/abs/2108.01152) · [code](https://github.com/parththaker/Bandits-GRUB)
