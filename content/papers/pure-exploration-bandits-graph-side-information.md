---
title: "Pure Exploration in Multi-armed Bandits with Graph Side Information"
authors: "P K Thaker, N Rao, M Malu, G Dasarathy"
date: "2021-08-02"
arxivId: "2108.01152"
venue: "arXiv preprint"
tags: ["Multi-armed Bandits", "Pure Exploration", "Graph Theory", "Best Arm Identification", "Side Information"]
abstract: "We consider the pure exploration problem in stochastic multi-armed bandits with graph side-information. More specifically, we consider the best-arm and near best-arm identification problem in the fixed confidence setting under the assumption that the arm rewards are smooth with respect to a given arbitrary graph. This captures a range of real world pure exploration scenarios where one often has information about the similarity of the options or actions under consideration. We propose a novel algorithm GRUB for this problem and provide a theoretical characterization of its performance that elicits the benefit of the graph-side information. We complement our theory with experimental results that show that capitalizing on available graph side information yields significant improvements over pure exploration methods that are unable to use this information."
excitement: "This was the paper that sparked my fascination with graph-enhanced bandit algorithms! What excites me most about this early work is how it boldly challenges the traditional assumption that arms in multi-armed bandits are independent. The insight that real-world decision problems often have similarity structures is so obvious in hindsight, yet revolutionary in practice. The fixed confidence setting for best-arm identification is particularly elegant because it directly addresses the question: 'How many samples do I need to be confident I've found the best option?' The mathematical beauty lies in how graph smoothness assumptions translate to concrete sample complexity improvements. This paper laid the foundation for an entire research direction that bridges combinatorial structures with sequential decision making. It's the kind of work that makes you reimagine what's possible when you stop treating problems in isolation and start leveraging their inherent structure!"
---

# Pure Exploration in Multi-armed Bandits with Graph Side Information

## Original Foundation Work

This arXiv preprint represents the foundational work that later evolved into the NeurIPS 2022 publication "Maximizing and Satisficing in Multi-armed Bandits with Graph Information." This early version established the core theoretical framework for leveraging graph structure in bandit problems.

## Problem Formulation

### Pure Exploration with Graph Structure
The paper addresses **pure exploration** in multi-armed bandits where:
- **Arms have similarity relationships** captured by a graph structure
- **Rewards are smooth** with respect to the graph topology
- **Goal**: Identify the best arm (or near-best arms) with high confidence
- **Setting**: Fixed confidence framework with δ-correctness guarantees

### Real-World Motivation
The approach captures practical scenarios where decision-makers have **prior knowledge about option similarities**:
- **Recommendation systems**: Similar users or items in collaborative filtering
- **Clinical trials**: Patient populations with similar characteristics  
- **Resource allocation**: Tasks or locations with geographical/functional proximity
- **Online advertising**: Related products or customer segments

## Technical Contributions

### 1. Graph-Smooth Reward Assumption
- **Smoothness**: Similar arms (connected in the graph) have similar expected rewards
- **Mathematical formulation**: Rewards vary smoothly across graph edges
- **Practical interpretation**: Leverages similarity structure for efficient exploration

### 2. GRUB Algorithm (GRaph-based UcB)
- **Graph-aware confidence bounds**: Incorporates graph structure into uncertainty estimates
- **Efficient exploration**: Reduces sample complexity by sharing information across similar arms
- **Best-arm identification**: Provides high-confidence identification of optimal arms

### 3. Theoretical Performance Analysis
- **Sample complexity bounds**: Explicit characterization of how graph structure improves efficiency
- **δ-correctness guarantees**: Probabilistic bounds on algorithm performance
- **Graph-dependent improvements**: Quantifies benefits as a function of graph properties

## Key Algorithmic Innovation

### Information Propagation
The core innovation lies in how information propagates through the graph:
- **Local observations** inform decisions about **similar arms**
- **Graph connectivity** determines information sharing patterns
- **Smoothness assumptions** enable confident predictions for unexplored arms

### Confidence Bound Design
The algorithm extends traditional upper confidence bounds to incorporate graph structure:
- **Standard UCB**: Confidence based only on arm's own history
- **Graph UCB**: Confidence leverages information from similar arms
- **Adaptive exploration**: Prioritizes arms with highest potential given graph constraints

## Experimental Validation

### Synthetic Experiments
- **Graph topologies**: Various graph structures (chains, trees, clusters)
- **Smoothness levels**: Different degrees of reward correlation across edges
- **Baseline comparisons**: Standard pure exploration algorithms without graph information

### Performance Metrics
- **Sample complexity**: Number of pulls required for confident identification
- **Error probability**: Frequency of incorrect best-arm identification
- **Graph utilization**: Effectiveness of leveraging structural information

## Theoretical Significance

### Foundation for Graph-Enhanced Bandits
This work established several key insights:
- **Structural priors matter**: Graph information provides substantial performance improvements
- **Smoothness enables sharing**: Mathematical framework for information propagation
- **Fixed confidence is natural**: Practical setting for many real-world applications

### Mathematical Framework
- **Graph signal processing**: Rewards as signals on graphs
- **Concentration inequalities**: Extended to graph-structured data
- **Optimization on graphs**: Efficient algorithms for graph-constrained problems

## Impact and Legacy

### Research Directions Opened
This foundational work spawned multiple research directions:
- **Satisficing vs. maximizing**: Later extended to threshold-based objectives
- **Dynamic graphs**: Time-varying similarity structures
- **Partial graph information**: Learning graph structure alongside rewards
- **Multi-objective optimization**: Trade-offs between different graph-based criteria

### Practical Applications
The theoretical framework enabled applications in:
- **Online learning platforms**: Personalized content recommendation
- **Healthcare**: Treatment selection with patient similarity
- **Finance**: Portfolio optimization with asset correlations
- **Robotics**: Path planning with spatial correlations

## Connection to Later Work

This arXiv preprint evolved into the NeurIPS 2022 publication, which:
- **Expanded scope**: Added satisficing problem formulation
- **Enhanced theory**: Strengthened theoretical guarantees
- **Broader applications**: Demonstrated versatility across problem types

The evolution demonstrates how foundational theoretical insights can grow into comprehensive frameworks that address multiple related problems within a unified mathematical structure.