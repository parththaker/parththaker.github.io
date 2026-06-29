---
title: Bandit-based multi-agent search under noisy observations
authors: 'P. Thaker, S. Di Cairano, A. P. Vinod'
date: '2023-07-01'
doi: 10.1016/j.ifacol.2023.10.1377
venue: IFAC World Congress 2023
tags:
  - Multi-armed Bandits
  - Multi-agent Systems
  - Autonomous Search
  - Robotics
  - Noise Robustness
abstract: >-
  We address autonomous search using teams of multiple agents, requiring
  tractable coordination strategies that can lower the time to identify
  interesting areas in the search environment, lower the costs/energy usage by
  the search agents during movement and sensing, and be resilient to the noise
  present in the sensed data due to the use of low-cost and low-weight sensors.
  We propose a data-driven, multi-agent search algorithm to achieve these goals
  using the framework of thresholding multi-armed bandits. The algorithm
  includes finite upper bounds on the time taken to complete the search, on the
  time taken to label all interesting cells, and on the economic costs incurred
  during the search.
insight: >-
  We cast multi-agent autonomous search as a thresholding bandit problem, where
  the goal is labeling cells above a quality threshold rather than ranking
  everything, which fits search-and-rescue and monitoring tasks. The useful part
  is the finite (non-asymptotic) upper bounds on search completion time, time to
  label all interesting cells, and economic cost under noisy low-cost sensors —
  what mission planners actually need.
oneLiner: >-
  A thresholding multi-armed bandit algorithm for coordinating multiple search
  agents under noisy sensor data, with finite bounds on search time, labeling
  time, and cost.
blog: multi-agent-search-with-bandits
featured: true
---

