# MUSE as Agent Flywheel Methodology

**Date:** 2026-01-21
**Epic:** mechanic-y53
**Status:** v2 (Simplified)

---

## Core Insight

We're writing **the living specification language** where code is mostly forgotten and `Noun+Capability` atomics are the vocabulary.

**What gets MUSE treatment:**
- **Epics** (page/flow level) → Full MUSE: DREAM → LIVE → ADAPT
- **Tasks** (atomic capabilities) → Inherit from epic, self-organize by noun
- **Bugs** → Not specs (implementation failures)

---

## Atomic Capabilities: The Vocabulary

All specifications use **Noun+Capability** format:

```
Payment+Authorize      Order+Submit         User+Authenticate
Inventory+Reserve      Email+Send           Cart+Update
```

**Why:**
- Stable contracts independent of implementation
- Self-organizing by noun (all `Order+*` cluster naturally)
- Grep-able for governance (`grep "Payment+"` finds all payment capabilities)
- No vendor lock-in (capability ≠ implementation)

**The non-negotiable rule:**
> Specs reference capabilities.
> Capabilities reference capabilities.
> Specs NEVER reference implementations.

**Validation checklist:**
- [ ] Can I mock this?
- [ ] Can I swap the implementation without changing this spec?
- [ ] Can a non-dev understand the name?

---

## MUSE Movements

### M1 — DREAM (Specify Intent)

**When:** Before Phase 1, epics only

**Purpose:** Humans specify page/flow level intent before decomposition

**Process:**
1. Human creates epic
2. Agent creates DREAM canvas (`.beads/dreams/<epic-id>.md`)
3. Agent drafts clarifying questions, assumptions, scenarios
4. Human writes compressed intent (3-5 bullets)
5. Agent validates, unlocks Phase 1

**Key sections:**
- **Section 0**: Compressed intent (human-owned)
- **Section 2**: Assumptions using atomic capabilities
  - `Payment+Authorize completes <2s`
  - `Order+Submit is idempotent`

**Enforcement:** DREAM gate blocks bead creation until finalized

**Commands:**
```bash
bd dream <epic> --init       # Create canvas
bd dream <epic> --ready      # Validate & unlock Phase 1
bd dream <epic> --status     # Check readiness
```

---

### M2 — LIVE (Observe Reality)

**When:** During Phase 3-5 (implementation, review, deploy)

**Purpose:** Capture evidence at capability level

**Automated capture:**
- Test failures → LIVE observations
- Commit messages with `LIVE:` prefix → extracted automatically
- Performance anomalies → flagged

**Manual capture:**
- Assumption violations
- Surprises
- Decision points
- UX signals

**Commands:**
```bash
bd live <bead> --start                # Initialize
bd live <bead> --observe "<text>"     # Manual entry
go test ./... | bd live-capture <bead> # Auto-capture
bd live <live-id> --critical          # Alert epic owner
```

**Storage:** `.beads/live/<bead-id>-<timestamp>.md`

---

### M3 — ADAPT (Evolve Intent)

**When:** Phase 4 (mandatory review gate) or emergency

**Purpose:** Interpret evidence, propose intent changes

**Process:**
1. Agent aggregates all LIVE observations
2. Agent challenges DREAM assumptions with evidence
3. Agent proposes intent changes (small, reversible)
4. Human decides: update_dream | keep_unchanged
5. If updated: DREAM evolves, new beads created

**Enforcement:** ADAPT gate blocks epic closure until decision recorded

**Commands:**
```bash
bd adapt <epic> --analyze           # Aggregate LIVE, draft proposals
bd adapt <epic> --apply <decision>  # Apply human decision
bd adapt <epic> --emergency <live>  # Urgent ADAPT
```

**Storage:** `.beads/adapt/<epic-id>-<cycle>.md`

---

## The Continuous Loop

```
DREAM (intent)
  ↓
Beads created with atomic capabilities
  ↓
LIVE (evidence during implementation)
  ↓
ADAPT (interpret, propose changes)
  ↓
DREAM updated (or kept unchanged)
  ↓
Loop continues or closes
```

**Loop health:**
```bash
bd muse-loop <epic>        # Status check
bd muse-loop <epic> --graph # Visualization
```

---

## Intent Anchors

Every bead links to epic's DREAM:

```bash
bd create "Implement Payment+Authorize" \
  --parent=mechanic-y53 \
  --dream-anchor=mechanic-y53#Payment+Authorize \
  --type=task
```

**Enforcement:** `--dream-anchor` required for epic beads

**Purpose:**
- Traceability: bead → capability → human intent
- Self-organizing: atomics cluster by noun
- ADAPT knows which beads affected by intent changes

---

## Hard Gates (Enforcement)

**1. DREAM Gate:**
- Blocks `bd create` for epics without finalized DREAM
- Ensures intent before decomposition

**2. Intent Anchor Gate:**
- Blocks `bd create` for epic beads without `--dream-anchor`
- Ensures traceability

**3. ADAPT Gate:**
- Blocks `bd close` for epics without ADAPT decision
- Forces evidence-based reflection

---

## Atomic Capabilities → Pure Functions

**At spec level:**
```
Payment+Authorize
Order+Submit
User+Authenticate
```

**At code level:**
```go
// Small pieces, loosely joined, low magic
func Authorize(payment Payment) (AuthResult, error)
func Submit(order Order) (OrderID, error)
func Authenticate(user User, creds Creds) (Session, error)
```

**Not this:**
```go
type PaymentService struct {
    // 500 lines of hidden dependencies
}
```

**Pattern:**
- Pure functions test in isolation
- Adapters wire to UI/APIs/vendors
- Capabilities compose without coupling

---

## Storage Structure

```
.beads/
  dreams/
    <epic-id>.md              # DREAM canvas
  live/
    <bead-id>-<timestamp>.md  # Observations
  adapt/
    <epic-id>-<cycle>.md      # Evolution decisions
```

All docs use YAML frontmatter for linkage:
```yaml
---
epic_id: mechanic-y53
loop_cycle: 1
status: ready_to_render
dream_ref: .beads/dreams/mechanic-y53.md
---
```

---

## Workflow by Phase

**Phase 0 (NEW): DREAM Gate**
- Epic created → DREAM canvas → Human approves intent → Phase 1 unlocked
- Time: 15-20 min per epic

**Phase 1: Planning**
- Agent decomposes epic into atomic capabilities
- Each bead links to DREAM anchor
- Atomics self-organize by noun

**Phase 3: Implementation**
- LIVE observations auto-captured + manually added
- Critical observations alert via Agent Mail

**Phase 4: Review**
- ADAPT mandatory before closure
- Evidence aggregated, proposals made, human decides
- Loop closes or continues

---

## Agent Mail Coordination

**Message types:**
1. **DREAM clarification** → Agent asks human about intent
2. **LIVE critical alert** → Agent notifies epic owner of blocker
3. **ADAPT review** → Agent requests decision on proposals

**Contact policy:**
- Agents on same epic: auto-approve
- Messages include links to `.beads/` docs

---

## Success Metrics

**Loop health:**
- Loop closure rate: % epics completing ≥1 ADAPT cycle (target: 80%)
- LIVE coverage: % beads with ≥1 observation (target: 90%)
- ADAPT impact: % cycles updating DREAM (target: 30-40%)

**Overhead:**
- MUSE time / total epic time (target: <15%)
- Automation ratio: auto LIVE / total LIVE (target: >70%)

**ROI:**
- Rework reduction (target: 30%)
- Scope drift (target: <10%)

---

## Enterprise Governance

Atomic capabilities enable trivial auditing:

```bash
# Security: Find all auth touchpoints
grep "+Authenticate" .beads/

# Compliance: Map PII capabilities
grep "User+" .beads/

# Impact: Before vendor swap
grep "Payment+" .beads/

# Architecture: All capability contracts
grep "^###.*+" .beads/dreams/
```

---

## Implementation Beads

20 beads created across 5 phases:

**Phase 1: Core (P0)**
- bd-3nw: `bd dream` commands
- bd-1vj: `bd live` commands
- bd-yd1: `bd adapt` commands
- bd-1b9: MUSE directory structure
- bd-ju8: YAML frontmatter support

**Phase 2: Enforcement (P0)**
- bd-3ba: DREAM gate
- bd-31f: Intent anchor validation
- bd-2xz: ADAPT gate

**Phase 3: Automation (P1)**
- bd-z4a: Test output parser
- bd-l1t: Post-commit LIVE extraction
- bd-1zg: LIVE aggregation
- bd-30e: `bd muse-loop` status

**Phase 4: Agent Mail (P1)**
- bd-2mr: Critical LIVE alerts
- bd-1jv: ADAPT notifications
- bd-1ql: DREAM clarification

**Phase 5: Docs & Metrics (P2)**
- bd-1vv: Update AGENTS.md
- bd-ugc: MUSE_QUICKSTART.md
- bd-6vq: MUSE_EXAMPLES.md
- bd-2f8: Loop visualization
- bd-eh4: Metrics dashboard

---

## Summary

MUSE transforms Agent Flywheel into a **learning system** where:

1. **Humans specify intent** at page/flow level (epics with DREAM)
2. **Atomics are the vocabulary** (`Noun+Capability` format)
3. **Evidence drives evolution** (LIVE → ADAPT → updated DREAM)
4. **Implementation is forgotten** (specs stable, adapters swap freely)

**Key innovations:**
- Atomic capabilities self-organize by noun
- Hard gates enforce the discipline
- <15% overhead via automation
- Git-native, grep-able, auditable

**The result:** A self-correcting system where agents decompose, implement, and evolve specifications based on reality, not assumptions.

---

**End of Methodology v2**
