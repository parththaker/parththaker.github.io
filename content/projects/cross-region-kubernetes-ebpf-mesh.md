---
title: "Cross-region Kubernetes connectivity with an eBPF cluster mesh"
date: "2024-03-31"
summary: "Connected Kubernetes clusters across regions with an eBPF cluster mesh — global service discovery and direct pod-to-pod connectivity, no gateways, proxies, or VPNs."
role: "Infrastructure / platform"
stack: ["Kubernetes", "Cilium / eBPF", "Multi-region", "Networking"]
tags: ["Infrastructure", "Kubernetes"]
---

## Problem

Services spanning multiple regions needed secure, low-latency connectivity across clusters. The existing setup leaned on gateways and VPN configuration that was complex to operate and added latency to cross-cluster calls.

## Approach

Implemented a Cilium eBPF cluster mesh: clusters share global service discovery and route pod-to-pod directly through an eBPF data plane under shared security policies — no gateways or proxies in the path. Kubernetes networking and eBPF data planes were new to me at the start, so a chunk of this was ramping up fast and validating cross-cluster connectivity and failover with vendor and internal stakeholders.

## Result

Fault-tolerant multi-region deployments with automatic failover and ~99.9% uptime in validation, lower cross-cluster latency, and materially less networking complexity than the VPN-based approach it replaced.
