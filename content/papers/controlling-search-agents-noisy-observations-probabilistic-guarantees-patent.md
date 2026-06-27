---
title: >-
  Controlling Search Agents to Perform Search with Noisy Observations and
  Probabilistic Guarantees
authors: P Thaker (Mitsubishi Electric Research Laboratories)
date: '2024-12-26'
doi: US20240427327A1
venue: US Patent Application US20240427327A1
tags:
  - Patents
  - Multi-armed Bandits
  - Multi-agent Systems
  - Autonomous Search
  - Probabilistic Guarantees
  - MMBS
abstract: >-
  A control system and a method for controlling search agents to perform search
  with noisy observations and probabilistic guarantees is provided. The control
  system collects confidence bounds of a probabilistic classification of at
  least one region within at least one path of a set of paths. The control
  system compares aggregations of the confidence bounds of the probabilistic
  classifications of each path of the set of paths based on the collected
  confidence bounds, a first path of a set of paths is selected, for visit by a
  first search agent based on the comparison. The control system commands the
  first search agent to visit the selected first path to collect measurements
  associated with each region within the selected first path. The control system
  updates the confidence bounds of the probabilistic classifications of each
  region within the selected first path based on the measurements associated
  with the corresponding regions.
insight: >-
  The core idea is a two-level bandit: one level maintains confidence bounds on
  per-region classifications, the other selects which feasible path to fly next
  by aggregating those bounds. What makes it usable in practice is that path
  selection respects fuel limits, start/end depots, and no-fly zones while still
  giving finite-time, probabilistic guarantees on when every region is
  classified.
oneLiner: >-
  A control system that directs teams of search agents along fuel-constrained
  paths using a multi-level multi-armed bandit, classifying regions from noisy
  measurements with probabilistic finite-time guarantees.
blog: multi-agent-search-with-bandits
---

