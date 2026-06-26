---
title: >-
  Generate the Spectrum, Don't Store It: Physics as a Trainable Prior for
  Unmixing
date: '2026-04-28'
description: >-
  Why a 100-year-old optical-physics model, made differentiable, beats
  data-hungry neural nets at hyperspectral unmixing exactly when labeled data is
  scarce.
tags:
  - hyperspectral unmixing
  - differentiable programming
  - remote sensing
  - inverse rendering
  - physics-based ML
  - spectroscopy
readTime: 10
---

Point a spectrometer at a patch of Martian basalt and you get one curve: reflectance, or emissivity, as a function of wavelength. You know it is a blend of a few pure minerals. The question that pays the bills in planetary science is deceptively simple — *how much of each?* What fraction is pyroxene, what fraction is feldspar, what fraction is dust?

The textbook move is to treat the measured spectrum as a weighted sum of known "endmember" spectra and solve for the weights. Clean linear algebra. It also quietly assumes that each mineral *has* one true spectrum. It does not. Heat the sample, shrink the grains, tilt the viewing angle, and the same mineral's measured curve slides, deepens, and broadens. The reference spectrum you so carefully measured in the lab is now subtly wrong, and your fractions inherit the error. This is "spectral variation," and it is the crack the whole problem falls through.

I want to walk through how we attacked that crack in **InfraRender**, work led by **John Janiczek**, with **Gautam Dasarathy, Christopher S. Edwards, Philip Christensen, Suren Jayasuriya**, and me. I was the second of six authors; John drove it. What follows is my attempt to explain *why* the approach works, not to claim more of it than I earned.

One scoping note up front. I am only going to deal with spectral variation under a linear mixing assumption. I am deliberately *not* covering nonlinear (intimate) mixing, atmospheric correction, or the full benchmark table — those matter, but the insight I want to land lives entirely inside the question of how you represent a single mineral's endmember.

## Why can't we just fix the endmembers and solve?

Set up the obvious model. Let $b \in \mathbb{R}^d$ be the measured spectrum sampled at $d$ wavenumbers. Let $A \in \mathbb{R}^{d \times m}$ collect $m$ endmember spectra as columns, and let $x \in \mathbb{R}^m$ be the fractional abundances. Linear mixing says

$$ b = Ax + \eta, $$

with noise $\eta$, subject to the physically obvious constraints that abundances are nonnegative and sum to one: $x_i \ge 0$, $\sum_i x_i = 1$. Fully Constrained Least Squares (FCLS) solves exactly this, and when $A$ is right, it is fast — milliseconds per spectrum — and very good.

The phrase doing all the work is "when $A$ is right." Fix $A$ from a library and you have frozen each mineral into a single appearance. Real samples refuse to cooperate. So the natural next thought is: make the endmembers *random*. That is precisely what the Normal Compositional Model and the Beta Compositional Model do — treat each column of $A$ as a draw from a distribution and fit the distribution. This genuinely helps, and I do not want to wave it away: statistical endmember models were the right instinct, capturing the fact that variation exists.

But notice what a Gaussian-around-a-mean endmember actually encodes: variation as *abstract scatter*. It says the spectrum wiggles, not *why*. Grain size does not nudge every wavelength independently and symmetrically; it does something specific and structured to specific absorption bands. A distribution with no physics in it cannot know that, so it spends its degrees of freedom modeling noise that is actually signal.

The other modern option — train a 1D CNN to regress abundances from spectra — has the opposite failure. It can learn the structure, but only by eating a large labeled dataset. In remote sensing, labeled unmixing data is scarce and expensive. That is the binding constraint, and I will come back to it because it is where our method either shines or dies.

## The one idea: generate the endmember instead of storing it

Here is the move. Do not store a mineral's spectrum, and do not model its wiggle statistically. **Generate it, from physics, with a handful of interpretable knobs — and make the generator differentiable so it can live inside both an optimizer and a neural network.**

The physics is old. A Lorentz oscillator is a damped mass on a spring: a resonance. Light at frequency $\omega$ drives the bound charges in a crystal; near a natural vibrational frequency they resonate and absorb. One oscillator gives you one absorption band, and it comes with exactly three knobs that map onto things you can *see* in a spectrum:

- $\omega_0$ — the resonant frequency — sets **where** the band sits.
- $\rho$ — the band strength — sets **how deep** it is.
- $\gamma$ — the damping — sets **how wide** it is.

That is the whole mental image. A pure mineral's spectrum is the sum of a few such resonances. And the physical effects that cause spectral variation — grain size, temperature — do not add random noise; they *retune these knobs*. So instead of keeping a shelf of reference spectra for every grain size, you keep one parametric generator and dial in the right variant on the fly.

Why does "differentiable" matter so much? Because if every step from knobs to spectrum has a derivative, gradient descent can run *backwards* — from a measured spectrum to the knob settings that produced it. That is analysis-by-synthesis, and it is the same trick that makes the generator droppable into a neural net via backpropagation.

## From three knobs to a spectrum

Let me build the forward model small. Collect one material's parameters as $\Lambda = [\rho,\ \omega_0,\ \gamma,\ \varepsilon_r]$, where $\varepsilon_r$ is the high-frequency dielectric constant (the "background" the resonances sit on). For $K$ oscillators you stack $K$ copies of $(\rho, \omega_0, \gamma)$.

The oscillators determine the complex refractive index

$$ \hat{n}(\omega) = n(\omega) - i\,k(\omega), $$

where $n$ is the ordinary refractive index and $k$ is the absorption (both real, both functions of wavenumber $\omega$). Intuitively: the real part bends light, the imaginary part eats it, and a resonance at $\omega_0$ spikes $k$ right there — that is your absorption band. (The exact algebraic expressions for $n^2 - k^2$ and $2nk$ in terms of $\Lambda$ are standard dispersion relations; I will point you to the paper rather than risk transcribing constants from memory.)

From the refractive index, Fresnel's relation gives the reflectance

$$ R(\omega) = \left| \frac{\hat{n}(\omega) - 1}{\hat{n}(\omega) + 1} \right|^2, $$

and by energy conservation for an opaque surface, the emissivity is

$$ \varepsilon(\omega) = 1 - R(\omega). $$

So the pipeline is $\Lambda \rightarrow \hat{n} \rightarrow R \rightarrow \varepsilon$, every arrow differentiable. To *fit* one pure mineral, minimize squared error between measured and modeled emissivity, plus an $\ell_1$ penalty on the band strengths $\rho$. The $\ell_1$ term is doing something concrete: it drives weak oscillators to zero, pruning an over-complete set of resonances down to the few the mineral actually has. You start with many candidate bands and let sparsity tell you which are real.

## The smallest unmixing problem, with numbers

Two minerals, one mixed spectrum. Write the endmember matrix as $A(\Lambda)$ to make explicit that its two columns are *generated* from dispersion parameters, not looked up. The objective becomes

$$ \min_{x,\ \Lambda}\ \| b - A(\Lambda)\,x \|_2^2 + \lambda \|x\|_p \quad \text{s.t. } x \ge 0,\ \textstyle\sum_i x_i = 1, $$

with box bounds keeping $\Lambda$ physical.

The trouble: this is non-convex in $(x, \Lambda)$ jointly. The clean technique is **alternating minimization**. Hold the parameters fixed and the problem in $x$ is the familiar constrained least squares — solve it. Then hold $x$ fixed and take Adam steps on $\Lambda$ through the differentiable generator. Alternate.

Let me make it concrete with *illustrative* numbers (not from the paper's tables — just to show the mechanics). Say the true mix is 70% pyroxene, 30% feldspar, and pyroxene's diagnostic band sits near $\omega_0 \approx 1000\ \text{cm}^{-1}$. Iteration zero guesses an even split, $x = (0.5,\ 0.5)$, with library-default oscillators. It reconstructs a spectrum whose pyroxene band lands in roughly the right place but comes out too shallow and too narrow — because this particular sample is coarser-grained than the library reference. The $\Lambda$-step responds by, say, raising $\rho$ from $0.4$ to $0.6$ (deeper band) and widening $\gamma$ from $5$ to $9\ \text{cm}^{-1}$ — modeling that coarser grain — without ever touching the fixed library. Now fed a better-shaped endmember, the next $x$-step revises the fractions toward $(0.7,\ 0.3)$. The fractions and the physics co-adapt. That coupling is the entire point: the abundances are no longer hostage to a stale reference spectrum.

(The direction of those knob moves is illustrative — grain size retunes the oscillators, but I am not claiming coarser grains always deepen and widen; the optimizer finds whatever retuning explains $b$.)

When labeled data *does* exist, you flip the same generator around. A CNN predicts $\Lambda$ and $x$ directly, and the reconstruction error is backpropagated *through* the dispersion model. Same physics, now amortized into a fast feedforward pass. We called this inverse rendering.

## What the experiments actually show

The honest headline is a *trade-off*, not a clean sweep — and I think the trade-off is more interesting than a single win.

On a lab thermal-infrared mineral dataset, where labels are scarce, **analysis-by-synthesis wins**. It needs no training data at all — it is pure optimization against one spectrum's physics — so the regime that starves a CNN is exactly where it is strongest. On an aerial VNIR dataset with ample training data, **inverse rendering wins** on both speed and accuracy, because once you can afford to train, amortized inference beats per-spectrum optimization.

The result I find most convincing is on real **Mars TES** data, where there is no abundance ground truth at all. You cannot check fractions you do not have, but you can check whether the reconstructed spectrum matches the measurement. Analysis-by-synthesis achieves lower RMS reconstruction error than FCLS. That is the physics earning its place: by letting endmembers flex, it explains real Martian spectra better than the fixed-library baseline. We report state-of-the-art across the thermal-infrared and VNIR benchmarks; for the exact tables I will defer to the paper rather than quote figures I cannot personally re-derive here.

The reframing I would hand someone who already read the paper: the headline is not "we beat the baselines." It is that *one* differentiable generative model slotted, unchanged, into both an optimizer and a neural net — and which one wins is decided entirely by how much labeled data you have.

## Where this breaks, and what I'd chase next

The load-bearing assumption is the dispersion model itself. It is the right generator only for materials whose spectra are governed by vibrational/resonant features — minerals, largely. Point it at a material whose spectral shape comes from something the Lorentz oscillator does not describe, and the "physics prior" becomes a misspecified straitjacket: the knobs cannot reach the true spectrum, and the method degrades to a constrained least-squares fit with a bad basis. The cleaner the resonant physics, the more the method earns; outside that regime it goes vacuous.

Two more limits I will not dress up. First, analysis-by-synthesis is slow — seconds per spectrum against FCLS's milliseconds — because it runs an inner optimization for every measurement. It parallelizes, but it is not free, and for full-scene hyperspectral cubes that cost compounds. Second, the objective is non-convex; alternating minimization finds local minima and is sensitive to initialization. I would not claim we find the global optimum.

If I were pushing this further, I would attack the runtime directly — better optimizers, or using the fast inverse-rendering net to *warm-start* the slow analysis-by-synthesis pass, getting the data-free robustness at closer to feedforward speed. And the field's real bottleneck is upstream of any algorithm: the chronic shortage of high-quality labeled unmixing data. The deeper open question is how far the "physics-based generative model plus deep learning" synergy actually goes. We showed one differentiable forward model is enough to bridge optimization and learning for spectroscopy. What is the *next* physical process worth making differentiable — and at what point does the physics prior stop helping and start fighting the data?

[Read the paper](/papers/differentiable-programming-hyperspectral-unmixing-dispersion-model/) · [arXiv:2007.05996](https://arxiv.org/abs/2007.05996) · [code (InfraRender)](https://github.com/johnjaniczek/InfraRender)
