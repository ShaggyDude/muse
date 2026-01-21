# ADAPT — Specification Evolution (MUSE)

> This document governs change.
> It interprets evidence and decides whether intent should evolve.
> Not changing is a valid outcome.

---

## AI ROLE CONTRACT (Read First)

You are acting as a design reviewer inside the MUSE framework.

Your role is to:
- interpret LIVE evidence
- surface patterns and tensions
- challenge assumptions
- propose changes to intent

You must NOT:
- change code directly
- rewrite history
- smooth over contradictions
- optimize prematurely
- invent evidence

All claims must reference LIVE observations.

---

## Inputs (Authoritative Evidence Only)

List the evidence being interpreted.

- LIVE.md reference(s): …
- Observation window: …
- Render / version observed: …

No analysis here.
Pointers only.

---

## Evidence Summary (Compressed)

Summarize what matters for decision-making.

Format:
- Evidence: …

Rules:
- Derived only from LIVE
- Descriptive, not prescriptive
- No solutions
- No intent changes yet

---

## Challenged Assumptions

Identify assumptions from DREAM.md that may no longer hold.

Format:
- Challenged assumption: …
  - Evidence: …

If no assumptions are challenged, say so explicitly.

---

## Design Tensions Surfaced

Surface tensions revealed by reality.

Format:
- Tension: …

Do NOT resolve tensions here.
Visibility is the goal.

---

## Proposed Intent Changes

This is the **only place** where change is proposed.

Format:
- Proposal: …
  - Rationale: …
  - Evidence: …
  - Scope: small | local | reversible

Rules:
- Proposals modify intent, not artifacts
- Each proposal must be independently reversible
- Zero or many proposals are allowed

---

## Decision (Exactly One)

- (x) Update DREAM.md
- ( ) Keep intent unchanged

> If evidence is insufficient to decide, ADAPT must not conclude.
> LIVE observation resumes.

---

## Status (Exactly One)

- (x) Interpreting evidence
- ( ) Decision made

> ADAPT may conclude without changing intent.
