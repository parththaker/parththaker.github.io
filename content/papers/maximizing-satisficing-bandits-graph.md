---
title: "Maximizing and Satisficing in Multi-armed Bandits with Graph Information"
authors: "P Thaker, M Malu, N Rao, G Dasarathy"
date: "2022-12-01"
arxivId: "2108.01152"
venue: "NeurIPS 2022"
tags: ["Multi-armed Bandits", "Graph Theory", "Pure Exploration", "Optimization", "Machine Learning"]
abstract: "We consider the pure exploration problem in stochastic multi-armed bandits where the similarities between the arms are captured by a graph and the rewards may be represented as a smooth signal on this graph. We specifically examine the problem of finding the arm with the maximum reward (maximizing problem) or one with a sufficiently high reward (satisficing problem) under this model. We propose novel algorithms called GRaph-based UcB (GRUB) and ζ-GRUB for these problems and provide a theoretical characterization of their performance which specifically elicits the benefit of the graph side information. We also prove a lower bound on the data requirement, showing a large class of problems where these algorithms are near-optimal. We complement our theory with experimental results that show the benefit of capitalizing on such side information."
excitement: "This paper brilliantly tackles one of the most pressing challenges in modern decision-making: how do you efficiently explore when faced with an overwhelming number of options? What excites me most is the elegant fusion of graph theory with bandit algorithms. The key insight that similarity relationships between options can be leveraged through graph structure is both mathematically beautiful and practically powerful. The distinction between maximizing (finding the absolute best) and satisficing (finding something good enough) problems reflects real-world decision-making scenarios perfectly. The theoretical guarantees showing near-optimality combined with the practical algorithms make this work both rigorous and applicable. It's the kind of research that bridges pure mathematics with real-world impact - exactly what gets me excited about the intersection of optimization and machine learning!"
---

# Maximizing and Satisficing in Multi-armed Bandits with Graph Information

## Problem Motivation

In modern applications, decision-makers often face a tremendously large number of options where obtaining even one observation per option may be prohibitively costly. Traditional pure exploration algorithms become ineffective in such scenarios. However, one often has access to similarity relationships among the options that can be leveraged to improve exploration efficiency.

## Key Contributions

### 1. Problem Formulation
- **Graph-based Multi-armed Bandits**: Arm similarities captured by a graph structure
- **Smooth Signal Assumption**: Rewards represented as smooth signals on the graph
- **Dual Problem Types**:
  - **Maximizing Problem**: Finding the arm with maximum reward
  - **Satisficing Problem**: Finding an arm with sufficiently high reward

### 2. Novel Algorithms

#### GRUB (GRaph-based UcB)
- Leverages graph structure for efficient exploration
- Incorporates graph information into Upper Confidence Bound framework
- Designed for the maximizing problem

#### ζ-GRUB 
- Extension for the satisficing problem
- Aims to find arms with rewards above a threshold ζ
- Balances exploration with practical sufficiency criteria

### 3. Theoretical Analysis
- **Performance Characterization**: Explicit theoretical analysis showing how graph side information improves performance
- **Lower Bounds**: Proved fundamental limits on data requirements
- **Near-Optimality**: Demonstrated that proposed algorithms achieve near-optimal performance for a large class of problems

### 4. Experimental Validation
The authors complement their theoretical contributions with experimental results demonstrating the practical benefits of incorporating graph side information in bandit problems.

## Technical Innovation

The paper's core innovation lies in recognizing that similarity structures between arms can be formalized through graph representations, where:
- **Nodes** represent arms/options
- **Edges** capture similarity relationships
- **Graph smoothness** ensures that similar arms have similar expected rewards

This graph-theoretic approach enables more efficient exploration by allowing information from one arm to inform decisions about similar arms, dramatically reducing the sample complexity in large-scale problems.

## Impact and Applications

This work has significant implications for:
- **Recommendation Systems**: Leveraging user/item similarity graphs
- **Clinical Trials**: Using patient similarity networks for treatment selection
- **Online Advertising**: Exploiting advertiser/audience similarity structures
- **Resource Allocation**: Utilizing dependency graphs in distributed systems

The theoretical framework provides a principled approach to incorporating prior knowledge about option relationships into sequential decision-making processes.