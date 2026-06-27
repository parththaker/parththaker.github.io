---
title: >-
  When to arrive in a congested system: Achieving equilibrium via learning
  algorithm
authors: 'P. Thaker, A. Gopalan, R. Vaze'
date: '2017-01-01'
doi: 10.1109/ISIT.2017.8007066
venue: ISIT 2017
tags:
  - Game Theory
  - Learning Algorithms
  - Nash Equilibrium
  - Resource Allocation
  - Congestion Control
abstract: >-
  We consider a strategic problem where multiple players compete to access a
  shared server platform that operates intermittently, switching between ON and
  OFF periods. Each player incurs costs to sample the server state and receives
  payoffs inversely proportional to the number of simultaneously connected
  players. We propose a distributed randomized learning algorithm that enables
  players to minimize sensing costs while converging to a unique fixed point
  that constitutes a Nash equilibrium. The work addresses applications in
  competitive WiFi sensing and competition for user attention in social
  networks.
insight: >-
  Players sense an intermittently-available server, paying for each sample and
  earning less when they overlap with others, so the hard part is that no one
  coordinates yet the timing choices interact. We give a distributed randomized
  rule where each player adapts on its own and the dynamics settle on a unique
  fixed point that is a Nash equilibrium. The framing fits competitive WiFi
  sensing and contention for attention, where sensing cost and congestion both
  matter.
oneLiner: >-
  A distributed learning algorithm that lets players competing for an
  intermittently-available server choose when to sample it, converging to a
  unique Nash equilibrium while keeping sensing costs low.
blog: when-to-arrive-a-congestion-game
---

