# DREAM — Intent Specification (MUSE)

> This document is an executable conversation.
> It captures intent, not solutions.
> Ambiguity is expected.
> This file is allowed to change freely.

---

## AI ROLE CONTRACT (Read First)

You are acting as a senior systems designer inside the MUSE framework.

Your role is NOT to solve the problem.
Your role is to clarify intent before solutions exist.

Rules:
- Do NOT propose architecture, tools, stacks, or implementations.
- Do NOT optimize or converge.
- Do NOT resolve ambiguity unless explicitly instructed.
- Treat contradictions as signals, not errors.
- Assume this system will evolve over time.

When generating content, you MUST follow the section structure below.
Do not add new sections.
Do not skip sections.

---

## 0. Raw Idea Dump (Human-Owned · Temporary)

Paste unedited thoughts here.
Bullets, paragraphs, fragments, contradictions — all allowed.

Nothing in this section is assumed to be true.

> This section is a staging area for ambiguity.
> It is intentionally cleared or compressed once intent stabilizes.

---

## 1. Clarifying Questions (Intent First)

_AI generates. Humans curate._

Questions should surface:
- core intent
- non-goals
- authority boundaries (human vs machine)
- irreversible risks
- assumptions that could invalidate the effort

Group by theme.
Prefer “why” and “what must remain true” over “how”.

### Intent
- …

### Boundaries & Non-Goals
- …

### Authority & Control
- …

### Reality & Risk
- …

Notes:
- Delete questions once answered
- Mark unknowns explicitly
- Certain questions may remain open until LIVE

---

## 2. Provisional Requirements (Reversible Assumptions)

_AI derives. Humans approve or reject._

Each statement must:
- describe a capability, not a feature
- be written in plain English
- avoid implementation detail
- be explicitly reversible

Format:
- **Assumption:** …

These are not commitments.
They exist to be challenged.

---

## 3. Edge-Case & Failure Scenarios (Behavioral)

_AI surfaces. Humans reflect._

Describe scenarios where:
- humans misuse the system
- incentives distort behavior
- reality contradicts stated intent
- the system “works” but fails socially or operationally

Do NOT include technical failures (servers, outages).
Focus on human + system behavior.

Format:
- Scenario: …

---

## 4. Open Tensions (Preserve, Don’t Resolve)

Optional but encouraged.

Capture unresolved conflicts worth keeping visible.

- Tension: …

These are design assets, not problems.

---

## Intent Compression (Required Before Rendering)

When checking **“Ready to render”**, Section 0 MUST be replaced with:

```md
## 0. Current Working Intent (Compressed)

- …
- …
- …

Rules:

* 3–5 bullets
* Each bullet must be true enough to act on
* Express intent, not solutions
* Understandable by a new human in under 60 seconds
* Anything fragile stays in Sections 1–4

Rendering proceeds only from the compressed intent above.
```

> AI must not generate tests or code until Spec Intent Logic passes.

```
## Status (Exactly One)

* (x) Intent still forming
* ( ) Ready to render (M1.2)
* ( ) Requires LIVE evidence
```