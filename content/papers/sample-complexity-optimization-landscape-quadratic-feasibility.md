---
title: >-
  On the Sample Complexity and Optimization Landscape for Quadratic Feasibility
  Problems
authors: 'P. K. Thaker, G. Dasarathy, A. Nedic'
date: '2020-07-01'
arxivId: '2002.01066'
venue: ISIT 2020
tags:
  - Optimization
  - Nonconvex Optimization
  - Sample Complexity
  - Phase Retrieval
  - Signal Processing
abstract: >-
  We consider the problem of recovering a complex vector from quadratic
  measurements, known as quadratic feasibility, which encompasses the well known
  phase retrieval problem and has applications in power system state estimation
  and x-ray crystallography. While the quadratic feasibility problem is
  generally NP-hard and may be unidentifiable, we establish conditions under
  which this problem becomes identifiable, particularly when the matrices are
  Hermitian matrices sampled from a complex Gaussian distribution. We explore a
  nonconvex optimization formulation and establish features of the optimization
  landscape that enables gradient algorithms with arbitrary initialization to
  converge to a globally optimal point with high probability. Our results also
  reveal sample complexity requirements for successfully identifying a feasible
  solution.
insight: >-
  Quadratic feasibility generalizes phase retrieval, and the interesting part
  was showing that with Hermitian Gaussian measurement matrices the nonconvex
  landscape has no spurious local minima, so plain gradient descent from any
  initialization recovers the signal. We tie that to an explicit
  sample-complexity bound, which makes the recovery guarantee usable rather than
  just an existence statement.
oneLiner: >-
  Proves identifiability and sample-complexity bounds for recovering a complex
  vector from quadratic measurements, and shows the nonconvex landscape lets
  gradient descent converge globally from arbitrary initialization.
featured: true
blog: nonconvex-landscape-of-quadratic-feasibility
---

