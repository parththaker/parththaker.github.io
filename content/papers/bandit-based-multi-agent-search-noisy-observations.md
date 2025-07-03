---
title: "Bandit-based multi-agent search under noisy observations"
authors: "P Thaker, S Di Cairano, A P Vinod"
date: "2023-07-01"
doi: "10.1016/j.ifacol.2023.10.1377"
venue: "IFAC 2023"
tags: ["Multi-armed Bandits", "Multi-agent Systems", "Autonomous Search", "Robotics", "Noise Robustness"]
abstract: "We address autonomous search using teams of multiple agents, requiring tractable coordination strategies that can lower the time to identify interesting areas in the search environment, lower the costs/energy usage by the search agents during movement and sensing, and be resilient to the noise present in the sensed data due to the use of low-cost and low-weight sensors. We propose a data-driven, multi-agent search algorithm to achieve these goals using the framework of thresholding multi-armed bandits. The algorithm includes finite upper bounds on the time taken to complete the search, on the time taken to label all interesting cells, and on the economic costs incurred during the search."
excitement: "This paper hits the sweet spot between theory and practice that I absolutely love! What excites me most is how it tackles real-world constraints that make autonomous systems actually deployable - noisy sensors, energy budgets, and coordination overhead. The genius lies in translating the classical multi-armed bandit framework to handle multiple agents simultaneously searching under uncertainty. The thresholding approach is particularly clever because it reflects how search missions actually work: you don't need to find the absolute best locations, just ones that are 'good enough' above some threshold. The finite upper bounds on search time and costs are what make this practical - real autonomous systems need guarantees, not just asymptotic optimality. It's the kind of work that bridges the gap between beautiful mathematical theory and messy real-world robotics!"
# title: "My Research Paper"
# authors: "Parth K. Thaker"
# date: "2024-01-01"
# arxivId: "2401.12345"
# doi: "10.1234/example"
# videoUrl: "https://youtube.com/watch?v=..."
# posterUrl: "https://example.com/poster.pdf"
# slideUrl: "https://example.com/slides.pdf"
# conferenceUrl: "https://conference.com/paper123"
---

<!-- # Bandit-based multi-agent search under noisy observations -->

## Problem Motivation

Autonomous search missions using teams of multiple agents face several critical challenges:

1. **Time Efficiency**: Minimizing the time to identify interesting areas in large search environments
2. **Resource Constraints**: Managing costs and energy usage during agent movement and sensing
3. **Sensor Limitations**: Dealing with noise from low-cost, lightweight sensors typically used in autonomous systems
4. **Coordination Complexity**: Developing tractable coordination strategies that scale with team size

## Technical Approach

### Thresholding Multi-Armed Bandits Framework

The paper leverages the **thresholding multi-armed bandits** paradigm, which is particularly well-suited for search applications because:

- **Goal-Oriented**: Instead of finding the single best location, agents seek areas above a quality threshold
- **Practical**: Reflects real-world search objectives where "good enough" locations are valuable
- **Efficient**: Reduces sample complexity compared to pure exploration approaches

### Multi-Agent Coordination Strategy

The proposed algorithm addresses coordination through:
- **Data-Driven Decisions**: Uses observed data to guide agent movements and sensing actions
- **Distributed Intelligence**: Enables agents to make autonomous decisions while maintaining coordination
- **Noise Resilience**: Incorporates uncertainty quantification to handle sensor noise

## Key Theoretical Contributions

### 1. Finite Upper Bounds
The algorithm provides **guaranteed finite upper bounds** on:
- **Total search completion time**
- **Time to label all interesting cells**
- **Economic costs incurred during the search**

### 2. Performance Guarantees
- **Tractable Coordination**: Polynomial-time coordination strategies that scale with team size
- **Noise Robustness**: Provable performance even under noisy sensor observations
- **Resource Efficiency**: Bounds on energy consumption and movement costs

## Algorithmic Innovation

### Multi-Agent Bandit Framework
- **Parallel Exploration**: Multiple agents simultaneously explore different regions
- **Information Sharing**: Agents leverage shared observations to improve collective performance
- **Adaptive Allocation**: Dynamic assignment of agents to promising search areas

### Noise Handling
- **Uncertainty Quantification**: Explicit modeling of sensor noise and observation uncertainty
- **Robust Decision Making**: Algorithms that maintain performance under noisy conditions
- **Confidence-Based Actions**: Decisions based on confidence intervals rather than point estimates

## Applications and Impact

### Autonomous Robotics
- **Search and Rescue**: Coordinated teams searching for survivors or targets
- **Environmental Monitoring**: Multi-robot systems monitoring pollution, wildlife, or weather
- **Exploration Missions**: Planetary rovers or underwater vehicles exploring unknown terrain

### Practical Advantages
- **Low-Cost Sensors**: Algorithm designed for real-world sensor limitations
- **Energy Efficiency**: Explicit consideration of movement and sensing costs
- **Scalable Teams**: Coordination strategies that work with varying team sizes

## Technical Significance

This work bridges several important research areas:
- **Multi-Armed Bandits**: Extending bandit theory to multi-agent scenarios
- **Autonomous Systems**: Providing theoretical foundations for practical deployment
- **Distributed Decision Making**: Developing coordination mechanisms with performance guarantees

## Real-World Relevance

The emphasis on **noisy observations** and **cost constraints** makes this work particularly relevant for practical deployment. Unlike many theoretical works that assume perfect sensors and unlimited resources, this paper explicitly addresses the limitations that autonomous systems face in real environments.

The **finite upper bounds** are crucial for mission planning and safety-critical applications where teams need guarantees on search completion times and resource usage.

## Future Directions

This framework opens several avenues for future research:
- Extension to dynamic environments where interesting areas may change over time
- Integration with path planning and obstacle avoidance for realistic deployment scenarios
- Adaptation to heterogeneous teams with agents having different sensing capabilities
