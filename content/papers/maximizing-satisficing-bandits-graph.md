---
title: Maximizing and Satisficing in Multi-armed Bandits with Graph Information
authors: 'P Thaker, M Malu, N Rao, G Dasarathy'
date: '2022-12-01'
arxivId: '2108.01152'
venue: NeurIPS 2022
tags:
  - Multi-armed Bandits
  - Graph Theory
  - Pure Exploration
  - Optimization
  - Machine Learning
abstract: >-
  We consider the pure exploration problem in stochastic multi-armed bandits
  where the similarities between the arms are captured by a graph and the
  rewards may be represented as a smooth signal on this graph. We specifically
  examine the problem of finding the arm with the maximum reward (maximizing
  problem) or one with a sufficiently high reward (satisficing problem) under
  this model. We propose novel algorithms called GRaph-based UcB (GRUB) and
  ζ-GRUB for these problems and provide a theoretical characterization of their
  performance which specifically elicits the benefit of the graph side
  information. We also prove a lower bound on the data requirement, showing a
  large class of problems where these algorithms are near-optimal. We complement
  our theory with experimental results that show the benefit of capitalizing on
  such side information.
insight: >-
  When you have far more arms than you can afford to sample even once, a
  similarity graph plus a smoothness assumption on rewards lets information
  propagate between neighboring arms, so GRUB pulls sample complexity well below
  standard UCB. We also worked out a matching lower bound, so for a broad class
  of graphs the gain from the side information is near-optimal, not just
  empirical. The satisficing variant (ζ-GRUB) matters because you often just
  need an arm above a threshold, not the global best.
oneLiner: >-
  A pure-exploration bandit method (GRUB and ζ-GRUB) that uses a similarity
  graph over arms to find the best arm, or one above a threshold, with far fewer
  samples than standard UCB.
codeUrl: 'https://github.com/parththaker/Bandits-GRUB'
featured: true
blog: pure-exploration-with-graph-side-information
---

