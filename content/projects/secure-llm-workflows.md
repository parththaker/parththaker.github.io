---
title: "Secure, privacy-preserving LLM workflows"
date: "2025-01-15"
summary: "Privacy-safe assistants and guardrails that let teams use LLMs over sensitive internal documents and code without data leaving the trust boundary."
role: "AI Research Engineer · Intuitive Surgical"
stack: ["LLMs", "RAG", "Python", "Cloud", "CI/CD"]
tags: ["Applied LLM", "Security & privacy"]
featured: true
---

<!-- TODO (Parth): add concrete, shareable metrics where possible — adoption,
time saved, latency, eval scores — and trim anything that's sensitive. -->

## Problem

Engineers and clinical-adjacent teams want LLM assistance over internal
documents, images, and code, but that data can&apos;t leave the organization&apos;s
trust boundary. Off-the-shelf hosted assistants are a non-starter, and naive
internal deployments leak context, over-share, or expose new attack surface.

## Approach

I build LLM workflows designed around the privacy constraint first:

- **Document & image assistants** using retrieval over internal sources, scoped
  to a user&apos;s access so answers never cross permission boundaries.
- **Security & guardrail analysis** for LLM applications — surfacing
  prompt-injection, data-exfiltration, and PII-exposure risks before they ship.
- **LLM + CI/CD tooling** that brings model-assisted checks into developer
  pipelines where they&apos;re actually used.

## Result

These workflows let teams adopt LLM assistance on sensitive material that was
previously off-limits, while keeping data inside the trust boundary and giving
security review a concrete handle on LLM-specific risk.

## Lessons

Treating privacy and security as design constraints from day one — rather than a
review at the end — is what makes an LLM system shippable in a regulated setting.
