---
title: >-
  Non-Stationary Bandits with Periodic Behavior via Ramanujan Periodicity
  Transforms
authors: 'P. Thaker, V. Gattani, V. Tirukkonda, P. Saidi, G. Dasarathy'
date: '2024-04-19'
venue: ICASSP 2024
tags:
  - Non-stationary Bandits
  - Ramanujan Transforms
  - Signal Processing
  - Periodic Behavior
abstract: >-
  We study non-stationary multi-armed bandits whose reward distributions vary
  periodically over time. Rather than treating the drift as adversarial and
  re-learning the best arm after every change, we estimate the periodic
  structure directly: a Ramanujan periodicity transform recovers the periods
  present in each arm's reward sequence, and the bandit policy uses that
  structure to anticipate which arm is best in each phase of the cycle. We
  provide regret guarantees for the resulting algorithm and evaluate it on
  synthetic and real periodic reward data.
insight: >-
  Standard non-stationary bandit algorithms treat reward drift as adversarial
  and pay to re-learn the optimum each time it shifts. We instead model the
  periodicity directly: a Ramanujan periodicity transform recovers the support
  of the periods from the reward sequence, and the policy uses that structure to
  anticipate which arm is best at each phase rather than rediscovering it. The
  payoff is lower regret in settings like traffic or demand cycles where the
  optimal arm returns on a schedule.
oneLiner: >-
  A multi-armed bandit method that uses the Ramanujan periodicity transform to
  detect periodic patterns in shifting rewards and exploit them to reduce
  regret.
blog: periodic-bandits-with-ramanujan-transforms
---

