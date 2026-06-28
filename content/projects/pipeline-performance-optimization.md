---
title: "Halving pipeline turnaround with profiling + right-sized Kubernetes"
date: "2025-10-31"
summary: "Cut end-to-end turnaround of critical data pipelines by roughly half via targeted profiling, right-sized Kubernetes resources, and workload-tailored container images — validated with load testing."
role: "Performance / platform"
stack: ["Kubernetes", "Python", "Performance", "Load testing"]
tags: ["Infrastructure", "Performance"]
---

## Problem

Several critical data pipelines were slow and over-provisioned. Any fix had to be real and safe to deploy at scale — not a lucky one-off that regressed under load.

## Approach

I attacked performance holistically instead of tuning a single layer: profiled to find the ~20% of code paths driving most of the runtime, right-sized CPU and memory requests for the actual workload rather than generic baselines, and built workload-tailored container images. Every change was validated with structured load testing so the gains were repeatable.

## Result

Roughly 2× faster turnaround with no additional infrastructure (better utilization meant lower compute), plus a repeatable optimization framework the rest of the pipeline suite could reuse.
