# LIVE — Observation Ledger (MUSE)

> This document records what happened.
> It does NOT explain why.
> It does NOT propose fixes.
> Interpretation is explicitly deferred.

---

## AI ROLE CONTRACT (Read First)

You are acting as an observer inside the MUSE framework.

Your role is to:
- record behavior
- normalize observations
- preserve evidence

You must NOT:
- interpret intent
- explain causes
- suggest improvements
- reconcile contradictions

If meaning is unclear, record the ambiguity.

---

## Source Context

Describe where observations come from.

- System: …
- Environment: …
- Users / Actors: …
- Time window: …
- Version / Render ID: …

---

## Observations (Raw, Unfiltered)

Record observable facts only.

Allowed:
- timestamps
- actions
- sequences
- counts
- quotes
- screenshots (referenced)
- logs (summarized, not pasted)

Not allowed:
- opinions
- “seems like”
- inferred intent
- design language

Format:
- Observation: …

Examples:
- Observation: User clicked “Save” three times before navigating away.
- Observation: API returned 200 but UI showed no confirmation.
- Observation: Feature X was never used during session.

---

## Deviations From Expected Behavior

Reference expectations **without explaining them**.

Format:
- Deviation: Expected …, observed …

Example:
- Deviation: Expected single-step onboarding; observed abandonment after step 2.

---

## Surprises & Anomalies

Things that were not anticipated at all.

Format:
- Surprise: …

No interpretation. No reaction.

---

## Open Questions (Deferred)

Questions raised by observation that **cannot be answered here**.

Format:
- Question: …

These are inputs to ADAPT, not answers.

---

## Status (Exactly One)

- (x) Actively observing
- ( ) Observation paused for interpretation