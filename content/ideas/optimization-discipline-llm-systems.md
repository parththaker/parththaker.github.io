---
title: "Carrying optimization discipline into LLM systems"
date: "2025-03-01"
summary: "What sample-complexity thinking and provable guarantees look like when applied to building LLM tooling."
status: "seed"
domain: "engineering"
tags: ["Applied LLM", "Optimization", "Systems"]
---

Coming from a theory background, the habit I most want to keep is asking for the
*guarantee*: what is this system provably doing, and under what assumptions? A
lot of LLM engineering is empirical by necessity, but the discipline still
transfers — being explicit about the objective, the failure modes, and the
budget you&apos;re spending (tokens, latency, risk) usually beats reaching for a
bigger model.

This is a seed note — somewhere to collect concrete cases where a
sample-complexity or optimization lens changed how I built an LLM workflow.
