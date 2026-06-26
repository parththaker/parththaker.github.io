---
title: "GRUB: graph-informed pure-exploration bandits"
date: "2022-12-01"
summary: "Open-source bandit algorithms that use a similarity graph over arms to find the best (or good-enough) option with far fewer samples than standard UCB."
role: "Lead author & maintainer"
stack: ["Python", "NumPy", "Multi-armed bandits", "Graph signal processing"]
tags: ["Research code", "Bandits", "Open source"]
featured: true
links:
  - label: "Code (GitHub)"
    url: "https://github.com/parththaker/Bandits-GRUB"
  - label: "Paper (NeurIPS 2022)"
    url: "https://arxiv.org/abs/2108.01152"
---

## Problem

Pure-exploration bandits break down when there are far more arms than you can
afford to sample even once — recommendation catalogs, clinical-trial arms, large
design spaces. Standard UCB has to touch every arm to be confident, so its
sample complexity scales with the number of options.

## Approach

GRUB assumes the arms live on a similarity **graph** and that rewards are a
smooth signal over it. That lets an observation on one arm inform its
neighbors, so confidence bounds propagate through the graph instead of being
estimated arm-by-arm. The repo implements both **GRUB** (find the maximizer)
and **ζ-GRUB** (find any arm above a threshold — the *satisficing* case).

## Result

On graph-structured problems the algorithms identify the target arm with sample
complexity well below standard UCB, and we proved a matching lower bound showing
the gain from the graph side-information is near-optimal for a broad class of
graphs. Published at NeurIPS 2022 with the implementation released openly.

## Lessons

The recurring theme in my research — that the right structural assumption turns
an intractable problem into a tractable one — is what I now look for when
designing applied systems, not just proofs.
