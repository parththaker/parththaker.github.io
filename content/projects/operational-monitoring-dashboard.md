---
title: "Real-time pipeline-health monitoring dashboard"
date: "2025-09-30"
summary: "Designed and shipped a production dashboard for real-time data-pipeline (Airflow DAG) health, with authentication and access controls — adopted as a team's daily operational tool."
role: "Full-stack"
stack: ["React", "shadcn/ui", "Airflow", "FastAPI"]
tags: ["Full-stack", "Observability"]
---

## Problem

There was no centralized, real-time view of data-pipeline health, so operational status was scattered and incident detection was slow.

## Approach

Built a centralized monitoring dashboard giving real-time DAG status as a single source of truth, with authentication and access controls. I gathered the requirements, designed it, and shipped it to production — front-end and dashboard work outside my core research background, picked up for the job.

## Result

Incident detection dropped from hours to minutes, enabling proactive resolution before downstream delays; it was adopted as the team's daily operational tool rather than staying a proof-of-concept.
