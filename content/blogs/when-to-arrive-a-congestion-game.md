---
title: >-
  Design the Algorithm First, Then Reverse-Engineer the Utility It Secretly
  Maximizes
date: '2026-03-22'
description: >-
  A trick for games whose natural Nash equilibrium is intractable: hand-build
  the adaptive rule with the right selfish reflexes, then discover the
  well-behaved utility it implicitly optimizes.
tags:
  - game theory
  - learning in games
  - Nash equilibrium
  - distributed algorithms
  - congestion
  - wireless
readTime: 10
---

Picture five strangers all refreshing the same flaky WiFi access point as they drive past it at 30 m/s. The hotspot blinks on and off on its own schedule; every probe drains battery; and the instant the link comes up, whoever else grabbed the same window splits the bandwidth with you. When, exactly, should you check?

That question — *when to arrive at a shared, intermittently-available resource* — turns out to be much harder than the textbook "when to join the queue" problem. The natural way to attack it (write down a utility, solve for its Nash equilibrium) hits a wall almost immediately. What got us through was an angle I still find a little sneaky, and it's the one move I'd want a reader to keep a week from now.

## What makes this harder than "when to join a queue"?

The canonical ancestor is the concert-queue problem: a ticket window opens and closes at *fixed, known* times, and each customer picks a single arrival time to minimize waiting plus service. Jain et al. solved that beautifully, deriving explicit Nash-equilibrium arrival distributions. That line of work is correct and complete for what it models.

Three cracks open the moment you make it realistic.

First, the server's availability is *stochastic*. Our server is a two-state Markov chain that flips between ON and OFF, with geometric ON and OFF durations governed by two parameters: $\lambda_c$, the per-slot probability of switching OFF→ON (becoming available), and $\lambda_d$, the probability of switching ON→OFF. You never know when the window will open.

Second, the decision is *repeated and adaptive*, not single-shot. Each player $\ell$ decides, every slot, whether to "sense" the server, paying a fixed cost $c_s$ per probe. Find it OFF, you wait out the frame; find it ON, you connect.

Third — and this is the part the queueing literature doesn't touch — *many players connect at once*, and your payoff is inversely proportional to how many of you are connected simultaneously. Think SD versus HD video: the more of you share the ON window, the worse everyone's quality of service. Congestion shows up in the *payoff*, not by stretching the service time.

So each player wants three things in tension: connect quickly when the server turns ON, sense rarely (probing is expensive), and overlap with as few others as possible. We want a decentralized strategy that self-organizes to an equilibrium nobody wants to leave.

I'll flag what we are *not* doing: we keep congestion as payoff $\propto 1/(\text{connected players})$. The arguably more realistic processor-sharing model, where the service rate $\mu$ itself degrades under load, we deemed too hard and set aside. More on that at the end.

## Why doesn't the obvious approach work?

The obvious thing is what every game theorist reaches for: write down a natural per-player utility — reward for connecting, minus sensing cost, minus a congestion penalty — and solve for its Nash equilibrium.

We tried. It's analytically intractable here. The repeated, stochastic, congestion-coupled structure means the "natural" utility doesn't yield a best-response map you can pin down, let alone prove a unique fixed point for. And this is genuinely *not* a congestion game — the costs aren't additive over a shared facility — so the comforting machinery that makes multiplicative-weights learning converge to NE in potential games simply doesn't apply. Friedman and Shenker showed learning reaches NE in two-player zero-sum games; Daskalakis et al. showed that already breaks at three players. We had no reason to expect a free lunch.

So the head-on attack fails not because of a missing lemma but because the object you'd be solving for has no convenient form.

## The one idea: design the algorithm first, then discover its utility

Here is the move. Instead of starting from a utility and deriving an algorithm, we **start from an algorithm and reverse-engineer the utility it is secretly maximizing.**

The mental image to hold onto: rather than guessing the landscape and rolling a ball down it, we hand-build a ball that rolls the way selfish intuition says it should, then ask *what landscape makes this exact motion gradient ascent?* If we can recover that landscape, and it turns out to be well-behaved, the equilibrium analysis comes for free.

Concretely, we design a distributed adaptive sensing rule with the right reflexes:

- Sense **less** when you keep finding the window crowded (back off under congestion).
- Sense **more** when you keep catching the server ON (the resource is worth chasing).
- Resist change when you sensed too rarely to have learned anything (damping).

Crucially this rule needs *no* knowledge of $N$, the number of competitors, and no knowledge of anyone else's strategy. A player observes only its own accumulated reward — the congestion it personally experienced, read off as QoS/rate loss. The single quantity it tracks is $\hat{A}(k)$, the empirical average number of players active alongside it (itself included) over the slots of frame $k$ in which it was active.

The update (Eq. 1 in the paper) nudges next frame's sensing probability $p_\ell(k+1)$ using three complementary terms: a reset term scaled by $p_{\text{start}}$ (the empirical OFF-on-sense reset frequency, set to $0.5$ in our experiments); a congestion-plus-cost term weighted by $e^{-c_0 \hat{A}(k)} e^{-c_s}$ with a constant $\eta>1$; and the damping term. The probability is clamped to $[p_{\min},1]$ with a step size $\kappa(k)$.

## The smallest case: one player, alone, with real numbers

Scale all the way down. Take a single player, no competitors, in the unlimited-connection regime $\mu=\infty$ (once you connect you stay until the server flips OFF).

With nobody else around, congestion vanishes, and your only tension is sensing cost versus catching ON periods. Lemma 1 says: the optimal isolated-user sensing rule of Kumar et al. is *already* a Nash equilibrium of our game. There's no one to deviate against. The closed form (derived below) collapses cleanly here, because the product over other players is empty:

$$p_\ell^{*} = \frac{p_{\text{start}}\cdot \frac{\lambda_c}{\lambda_c+\lambda_d}}{1 - \eta\,\frac{\lambda_d}{\lambda_c+\lambda_d}}.$$

Plug in the testbed numbers — $\lambda_c\approx 0.057$, $\lambda_d\approx 0.063$, so the duty cycle $\frac{\lambda_c}{\lambda_c+\lambda_d}\approx 0.48$ and $\frac{\lambda_d}{\lambda_c+\lambda_d}\approx 0.52$ — with $p_{\text{start}}=0.5$ and $\eta=1.2$:

$$p_\ell^{*} \approx \frac{0.5 \times 0.48}{1 - 1.2\times 0.52} = \frac{0.24}{0.37} \approx 0.65.$$

So a lone user, facing a server that's up roughly half the time, settles on sensing about two slots in three — aggressive, because every ON slot it catches is entirely its own.

Now add competitors and watch the intuition bite. Each extra co-active player divides your payoff, so your best-response sensing probability must drop. Our Twitter-like experiment makes this vivid: when the crowd jumps from $N=5$ to $N=100$, every player's equilibrium sensing probability converges *down* to a markedly lower value — any slot you grab will be shared by a mob, so chase it less — and climbs back when $N$ returns to 5. No one was told $N$ changed; they each just felt more congestion.

## The load-bearing math, named

Here's the pipeline, with the techniques called out.

**Steady state (Lemma 3).** First we compute the expected number of co-active players at sensing profile $p$:
$$A(p) = 1 + \sum_{j} \psi_j, \qquad \psi_j = \frac{1}{1-(1-\mu)(1-\lambda_c)}\cdot\frac{p_j \lambda_c}{\lambda_c + p_j(1-\lambda_c)}.$$
Here $\psi_j$ is player $j$'s steady-state contribution to congestion — increasing in its sensing probability $p_j$, shaped by the duty cycle and the service parameter $\mu$.

**The discovered utility (Theorem 4).** Taking the expected, steady-state version of the update and asking which function it ascends, we recover the implicit per-player utility $U_\ell$ (Eq. 5). It scales the sensing benefit by the duty cycle $\frac{\lambda_c}{\lambda_c+\lambda_d}$ and penalizes congestion through the $\psi_i$ terms and the cost $c_s$. The honest surprise: $U_\ell$ carries *extra quadratic and cubic powers of $p_\ell$* that I would never have written down by hand — but they are exactly what makes a provable NE possible. The algorithm-first detour surfaced an analytically convenient utility the head-on approach would never have guessed.

**Uniqueness (Theorem 5).** From $U_\ell$ we derive the best response $p_\ell^{br}$ (Eq. 7) and, by a **contraction-mapping argument**, show the game $G$ has a *unique* NE to which best response converges. The general closed form is
$$p_\ell^{*} = \frac{p_{\text{start}}\,\frac{\lambda_c}{\lambda_c+\lambda_d}}{1 - \eta\,\frac{\lambda_d}{\lambda_c+\lambda_d}\,\prod_{i\neq \ell} e^{-c_0 \psi_i^{*}}}.$$
Read it: your equilibrium sensing rate rises with the duty cycle (sense more when the server is up often) and falls as others' congestion contributions $\psi_i^*$ grow (back off in a crowd). Set the product to 1 and you recover the single-user number above.

**Convergence (Lemma 6, Theorem 7).** The expected update is exactly *projected gradient ascent* on $U_\ell$, which is $\beta$-smooth with $\beta=2$, so it converges. The real algorithm is then a **stochastic sub-gradient method**: under Robbins–Monro step sizes ($\sum\kappa=\infty$, $\sum\kappa^2<\infty$) and the $p_{\min}$ floor, it converges with probability 1.

Putting it together (Theorem 2): under a stated congestion-tolerance condition, if all $N$ players run the update, the system converges from *any* initial condition to a unique non-trivial fixed point — and that point is precisely the NE of $G$.

## What do the experiments actually show?

Two things, honestly. On WiFi-testbed-derived parameters (31 APs over 2000 acres, $N=5$, 30 m/s, $\lambda_c\approx0.057$, $\lambda_d\approx0.063$, $\mu=5\lambda_c$, $\eta=1.2$, $c_0=0.05$), the noisy stochastic-gradient trajectory lands on the *same* equilibrium as the full best-response and exact-gradient updates. That's the payoff of the whole detour: an information-light, decentralized rule matches the omniscient best-response dynamics. The Twitter scenario shows the $5\to100\to5$ adaptation described above. Both are simulations — parameters drawn from a real testbed, but not a live deployment.

## Where this goes vacuous, and what I'd do next

The load-bearing assumption is the congestion-tolerance condition (Eq. 2), which bounds how much congestion — driven by $N$, $c_0$, $\eta$, $\lambda_c$, $\lambda_d$, $\mu$ — the system can absorb. Push the crowd or the congestion sensitivity past it and our convergence guarantee simply goes silent; existence of a non-zero NE further needs a separate condition. The global argument also leans on *sequential, time-dilated* updates and a large frame size $M$ so that steady-state averages hold (two-time-scale separation). And everything is geometric/Markovian.

If I were to push this further, the prize is the processor-sharing model — letting the service rate $\mu$ itself degrade with load rather than only the payoff. We avoided it because it couples the dynamics in a way our contraction argument doesn't survive. Relaxing Eq. 2, removing the time-dilation crutch, and moving beyond geometric ON/OFF distributions are the other honest gaps. The settings I most want to see this transplanted into are uplink scheduling with QoS guarantees and device-to-device communication.

The open question I'll leave you with: when payoff *and* service rate both degrade with congestion, is there still a hand-craftable algorithm whose hidden utility is convex enough to admit a unique equilibrium — or does reverse-engineering the utility stop working precisely when the resource sharing gets realistic?

---

*This is the distilled version of "When to Arrive in a Congested System: Achieving Equilibrium via Learning Algorithm," with Aditya Gopalan and Rahul Vaze (RAWNET workshop, WiOpt 2017, Paris). I was the lead author. Open-access PDF: [dl.ifip.org](http://dl.ifip.org/db/conf/wiopt/wiopt2017/1570344891.pdf) · [local copy](/papers/when-to-arrive-congested-system-equilibrium-learning/). No arXiv preprint or public code release exists.*
