---
title: >-
  Why You Can Start Gradient Descent Anywhere — Even on an NP-Hard Recovery
  Problem
date: '2026-06-05'
description: >-
  With order-n complex Gaussian quadratic measurements, recovering a vector up
  to phase becomes both identifiable and solvable by gradient descent from any
  starting point — two faces of one geometric condition.
tags:
  - phase retrieval
  - nonconvex optimization
  - quadratic feasibility
  - sample complexity
  - optimization landscape
readTime: 10
---

Suppose I hand you a vector $x \in \mathbb{C}^n$ that you cannot see directly. All you get are $m$ numbers, each of the form $\langle A_i x, x\rangle = c_i$, where every $A_i$ is a known Hermitian $n \times n$ matrix. Each measurement is a quadratic form — energy-like, sign-blind, and worst of all, blind to global phase: replace $x$ by $e^{i\varphi}x$ and every $c_i$ is unchanged. Two questions hang over this immediately. First, is there even enough information to pin down $x$ (up to that unavoidable phase)? Second, even if there is, the obvious way to recover it is to minimize a nonconvex loss — and nonconvex least-squares over $\mathbb{C}^n$ is the kind of problem that, in general, is NP-hard. So why would any honest person expect to solve it from a cold start?

This is the **quadratic feasibility problem**, and it is the subject of work I led with my co-authors Gautam Dasarathy and Angelia Nedić at Arizona State. [Read the paper](/papers/sample-complexity-optimization-landscape-quadratic-feasibility/) · [arXiv:2002.01066](https://arxiv.org/abs/2002.01066).

## What is actually at stake, and what I am not claiming

Quadratic feasibility — find $x$ with $\langle A_i x, x\rangle = c_i$ for all $i$ — is the feasibility core of a quadratically constrained quadratic program (QCQP). It is not a toy: it models power-system state estimation, x-ray crystallography, the turnpike problem, and unlabeled distance geometry. Its most famous special case is **phase retrieval**, where each $A_i = a_i a_i^*$ is rank one and the measurement collapses to $\langle A_i x, x\rangle = |\langle a_i, x\rangle|^2$ — you observe only squared magnitudes. Our setting allows arbitrary, full-rank Hermitian $A_i$.

Let me fence off what I am *not* doing. I will assume the $A_i$ are complex Gaussian random matrices; I will assume the measurements $c_i$ are exact (no noise model); and I will give you a landscape result, not a finite-time convergence rate. Those are real limitations and I will come back to them. The payoff in exchange is a clean, two-part statement about *when this problem is solvable at all* and *whether a dumb algorithm solves it*.

## Accept what phase retrieval already taught us — then find the crack

The "benign nonconvex landscape" program is by now a beautiful body of work. Sun, Qu, and Wright showed that the phase-retrieval $\ell_2$ loss has no spurious local minima and only strict saddles — every local min is global, every critical point that isn't a min has a direction of strict negative curvature. Ge, Jin, and Zheng gave a unified geometric analysis for low-rank problems in the same spirit. So you might think: just cite them and go home.

Here is the crack. Those results live, for the most part, in $\mathbb{R}^n$, and the real and complex problems are *not* the same problem with a cosmetic change of field. In the real case, the sign ambiguity $x \leftrightarrow -x$ gives you exactly **two** isolated global minima. In the complex case, the phase ambiguity $x \leftrightarrow e^{i\varphi}x$ gives you a whole **continuum** of equivalent global minima. A landscape proof that counts isolated minima, or that leans on real differentiability, simply does not transport. Separately, Huang, Gupta, and Dokmanić showed complex quadratic systems with full-rank random matrices are solvable by gradient descent — but only from a carefully chosen spectral initialization. The question I cared about: can you drop the clever initialization entirely?

## Why the obvious recovery objective fights back

The obvious move is to minimize
$$ f(x) = \frac{1}{m}\sum_{i=1}^m \big|\langle A_i x, x\rangle - c_i\big|^2, $$
the squared residual, with $f \ge 0$ and $f = 0$ exactly at feasible points. Two things go wrong at once. The loss is nonconvex, so a priori there could be spurious local minima where gradient descent gets stuck. And $f$ is *not complex-differentiable* — it depends on both $x$ and $\bar{x}$ — so ordinary calculus on $\mathbb{C}^n$ does not even hand us a gradient to descend on. Lurking underneath both is the prior question of whether $f = 0$ has an essentially unique answer at all.

## The one idea: measure distance the way the problem does

Here is the move the whole paper rests on. Stop measuring how far apart $x$ and $y$ are with $\|x - y\|$ — that metric is offended by phase, reporting a large distance between $x$ and $e^{i\varphi}x$ even though they are the *same point* for us. Instead use the **phase-invariant distance**
$$ d(x,y) = \|xx^* - yy^*\|_F. $$
Here $xx^*$ is the rank-one $n\times n$ Hermitian matrix (the "lifted" version of $x$), and $\|\cdot\|_F$ is the Frobenius norm. The single fact that makes this the *right* yardstick: $d(x,y) = 0$ if and only if $x = e^{i\varphi}y$ for some phase $\varphi$. The metric is zero exactly on the orbits we cannot and should not distinguish.

The mental image to keep: lift every vector to its outer product, and do all your geometry up there, where phase has already been quotiented out. Once you are in the world of $xx^*$, "recover $x$ up to phase" becomes "recover the matrix $xx^*$," and the awkward symmetry evaporates.

The small algebraic engine that powers everything is a polarization identity. Write $u = x - e^{i\varphi} y$ and $v = x + e^{i\varphi} y$, and define the symmetric outer product $[\![u,v]\!] = \tfrac12(uv^* + vu^*)$. Then
$$ xx^* - yy^* = [\![u,v]\!]. $$
This converts "tell $x$ and $y$ apart" into "the $A_i$ must not crush the rank-2 Hermitian matrix $[\![u,v]\!]$." That is a statement about how a *linear* map — the $A_i$ acting on matrices — treats low-rank matrices, exactly the territory where RIP-style isometry arguments live.

## The smallest nontrivial case, with numbers

Let me make this concrete in $\mathbb{C}^2$. Take $x = (1,0)$ and $y = (0,1)$ — orthogonal unit vectors, clearly not equal up to any phase. Lift them:
$$ xx^* = \begin{pmatrix}1&0\\0&0\end{pmatrix},\quad yy^* = \begin{pmatrix}0&0\\0&1\end{pmatrix},\quad xx^*-yy^* = \begin{pmatrix}1&0\\0&-1\end{pmatrix}. $$
So $d(x,y)^2 = \|xx^*-yy^*\|_F^2 = 1^2 + (-1)^2 = 2$, i.e. $d(x,y)=\sqrt2$. Now check the engine. With $\varphi=0$, $u = x-y = (1,-1)$ and $v = x+y = (1,1)$, so
$$ uv^* = \begin{pmatrix}1&1\\-1&-1\end{pmatrix},\quad vu^* = \begin{pmatrix}1&-1\\1&-1\end{pmatrix},\quad \tfrac12(uv^*+vu^*) = \begin{pmatrix}1&0\\0&-1\end{pmatrix}. $$
That is exactly $xx^*-yy^*$. The identity is not symbol-pushing; it reproduces the matrix entrywise.

Now watch a single random measurement act on this. For a complex Gaussian Hermitian $A$ (real $N(0,1)$ diagonal, complex $N(0,1)$ off-diagonal fixed by symmetry), the inner product against our diagonal real $M = xx^*-yy^*$ collapses to $\langle A, M\rangle = A_{11} - A_{22}$ — a difference of two independent standard normals. Its expected square is $\operatorname{Var}(A_{11}) + \operatorname{Var}(A_{22}) = 1 + 1 = 2 = d(x,y)^2$. So **one** random quadratic measurement is an unbiased estimate of the squared phase-invariant distance. I averaged $|\langle A,M\rangle|^2$ over $2\times10^5$ random Hermitian Gaussians and got $1.99$, right on top of $2$. Average enough of them and the estimate concentrates — the only remaining question is how many "enough" is.

## From unbiasedness to identifiability: an isometry

Call the measurement map $M_A(x) = (\langle A_1 x, x\rangle, \dots, \langle A_m x, x\rangle)$. Say $M_A$ is $(\alpha,\beta)$-stable if
$$ \alpha\, d(x_1,x_2) \;\le\; \|M_A(x_1) - M_A(x_2)\|_2 \;\le\; \beta\, d(x_1,x_2). $$
The structural fact, via Wang and Xu's phase-retrievability characterization: **$M_A$ is injective up to phase if and only if it is $(\alpha,\beta)$-stable.** Identifiability *is* a RIP-like sandwich in the metric $d$ — not analogous to one, literally the same statement. (The bookkeeping that turns injectivity into the two-sided bound on $\sum_i |\langle A_i, [\![u,v]\!]\rangle|^2$ is in the paper.)

To earn that sandwich for Gaussian $A_i$, combine the unbiasedness above with a concentration bound: the empirical average $\tfrac1m\sum_i |\langle A_i, xx^*-yy^*\rangle|^2$ stays within $\varepsilon\, d(x,y)^2$ of its mean except with probability $\le d\,e^{-cm\varepsilon}$. That controls one pair $(x,y)$. To make it hold *uniformly* over the sphere, cover the sphere with a $\delta$-net of size $|N_\delta| \le (12/\delta)^n$ and take a union bound. This is where the sample complexity is born: the union bound multiplies the per-point failure $d\,e^{-cm\varepsilon}$ by the net size $(12/\delta)^n$, so the exponent must beat the net, $cm\varepsilon \gtrsim n\log(12/\delta)$. The $n$ sitting in the net's exponent is exactly what forces $m \gtrsim n$.

**Theorem 1 (near-isometry / identifiability).** If the Hermitian $A_i$ are complex Gaussian and $m > Cn$, then for any $\xi \in (0,1)$, with probability $\ge 1-\xi$, $\;\alpha\, d(x,y) \le \|M_A(x)-M_A(y)\|_2 \le \beta\, d(x,y)$ for all $x,y \in \mathbb{C}^n$, with explicit $\alpha = \tfrac{(1-2\delta)^2(1-\varepsilon)}{(1+2\delta)^2}$ and $\beta = \tfrac{(1+2\delta)^2(1+\varepsilon)}{(1-2\delta)^2}$. Distinct inputs give distinct measurements: the model is identifiable.

## The same condition makes the landscape benign

Now the second face. Because $f$ is not holomorphic, we differentiate with Wirtinger calculus — treat $x$ and $\bar x$ as independent variables. The goal is to rule out spurious minima, and the technique is to exhibit strict negative curvature everywhere a non-solution could hide: at every point $x$ with small gradient there is a direction $\Delta$ with
$$ \langle \nabla^2 f(x)\, \Delta, \Delta\rangle \;\le\; -c_0\, \|xx^* - zz^*\|_F^2 \;<\; 0 \quad\text{whenever } d(x,z) > 0, $$
where $z$ is the ground truth generating the $c_i$. Notice the right-hand side is $-c_0\, d(x,z)^2$ — the *same* phase-invariant distance, again doing the bookkeeping. Strict negative curvature at every non-optimal stationary point means no flat traps.

**Theorem 2 (benign landscape).** For complex Gaussian $A_i$ with $m > Cn$, with probability $\ge 1-\xi$: $f$ is strict-saddle, and every local minimum $w$ satisfies $d(w,z)=0$. No spurious local minima; every local min is global up to phase. **Corollary.** A gradient method from an *arbitrary* initialization therefore converges to a global minimum, via the saddle-avoidance results of Lee, Simchowitz, Jordan, and Recht.

The one sentence to keep for a week: *identifiability and tractable optimization are governed by one and the same geometric condition* — the $(\alpha,\beta)$-stability that complex Gaussian measurements buy you at $m \gtrsim n$.

## What the result really says, and where it goes vacuous

The defended claim, with its boundary: **order-$n$ Gaussian quadratic measurements suffice for both identifiability and a globally optimizable landscape, with no clever initialization.** That last clause is the sharp contrast with Huang–Gupta–Dokmanić, who needed a spectral start.

Now the honest limits. The guarantees are for **complex Gaussian** $A_i$ — not structured, deterministic, or coded measurements. The constants ($C$, $\alpha$, $\beta$, $c_0$) are existence-type and unoptimized; $m > Cn$ is order-$n$, not a sharp threshold, and pushing $\delta,\varepsilon$ smaller (stronger stability) *inflates* $C$ — a real tradeoff. The corollary gives asymptotic saddle-avoidance, **not** a finite-time rate. There is no noise model: $c_i$ are exact. And to be candid, this manuscript is theory-focused; I would not have you take a benchmark number from me here.

The load-bearing assumption is the Gaussianity, and it is exactly where the result threatens to go vacuous: every "with high probability" rides on the second-moment identity $\mathbb{E}|\langle A_i, xx^*-yy^*\rangle|^2 = d(x,y)^2$ and on the concentration bound above. Break those — heavy tails, strong structure, adversarial $A_i$ — and neither the isometry nor the curvature lower bound is guaranteed.

## What I would do next

The cleanest open question: **how far can the Gaussian assumption be relaxed** — to sub-Gaussian, coded-diffraction, or sparse $A_i$ — while keeping the landscape benign? After that: the tight sample-complexity constant (is $m \asymp n$ optimal?); finite-time iteration complexity to replace the qualitative convergence; a noise/robustness model with stable recovery bounds; and exploiting structure (sparse or low-rank $x$). If you take one thing away, let it be the reframing: lift to $xx^*$, measure with $d$, and identifiability and optimizability turn out to be the same fact seen twice.
