---
title: "Graph side-information as a sample-complexity lever"
date: "2024-09-01"
summary: "Why a similarity graph over actions can break the per-arm sampling barrier in pure exploration."
status: "growing"
domain: "research"
tags: ["Bandits", "Graph theory", "Pure exploration"]
---

A recurring idea across my bandit work: when you can't afford to sample every
action, the question becomes *what structure lets one observation speak for
many?* A similarity graph plus a smoothness assumption is one clean answer —
information diffuses along edges, and confidence bounds stop being per-arm.

The open direction I keep returning to is how far this generalizes: which
structural priors (graphs, low-rank reward matrices, metric spaces) give
*provable* savings, and which are just heuristics that happen to work. The GRUB
line of work (see the [project](/projects/grub-graph-bandits/)) is the graph
instance of that question.
