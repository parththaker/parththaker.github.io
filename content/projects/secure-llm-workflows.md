---
title: "Secure, privacy-preserving LLM workflows"
date: "2025-01-15"
summary: "Privacy-safe assistants and guardrails that let teams use LLMs over sensitive internal material without data leaving the trust boundary."
role: "AI Research Engineer · Intuitive Surgical"
stack: ["LLMs", "RAG", "Python", "Cloud", "CI/CD"]
tags: ["Applied LLM", "Security & privacy"]
featured: true
---

> This is current, proprietary employer work, so the description here is
> deliberately high-level. I'm happy to talk through the engineering in an
> interview.

## Problem

Teams want LLM assistance over internal documents, images, and code, but that
material can't leave the organization's trust boundary. Hosted assistants are off
the table, and naive internal deployments tend to over-share context or open new
attack surface.

## Approach

I work on LLM workflows where the privacy constraint comes first:

- Retrieval-based assistants over internal sources, scoped so answers respect
  existing access boundaries.
- Security and guardrail analysis for LLM applications — reasoning through failure
  modes like prompt injection, data exfiltration, and sensitive-data exposure.
- Bringing model-assisted checks into developer (CI/CD) workflows where they're
  actually used.

## What I take from it

The throughline with my research is treating constraints — here, privacy and
security — as first-class design inputs rather than an afterthought. That's what
makes an LLM system shippable in a regulated setting.
