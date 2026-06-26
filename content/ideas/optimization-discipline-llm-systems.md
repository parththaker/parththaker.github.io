---
title: "Carrying optimization discipline into LLM systems"
date: "2025-03-01"
summary: "What sample-complexity thinking and explicit objectives look like when applied to building LLM tooling."
status: "growing"
domain: "engineering"
tags: ["Applied LLM", "Optimization", "Systems"]
---

Coming from a theory background, the habit I most want to keep is asking for the
*guarantee*: what is this system provably doing, and under what assumptions?

A lot of LLM engineering is empirical by necessity, but the discipline still
transfers. Two examples I lean on:

- **State the objective before reaching for a bigger model.** Being explicit
  about what you're optimizing — and the budget you're spending on it (tokens,
  latency, risk) — usually surfaces a cheaper fix than scaling up.
- **Treat evaluation like a measurement problem.** How many examples do you
  actually need to tell two prompts apart? That's a sample-complexity question,
  and answering it stops a lot of noise-driven decisions.
