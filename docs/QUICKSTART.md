# MUSE Quick Start for Agents

**Purpose:** Fast reference for AI agents implementing MUSE (DREAM → LIVE → ADAPT) workflow.

---

## TL;DR

```bash
# Epic starts
bd dream <epic-id> --init && bd dream <epic-id> --ready

# Implementation starts
bd live <bead-id> --start

# During work
bd live <bead-id> --observe "observation text"

# Before epic closure
bd adapt <epic-id> --analyze
bd adapt <epic-id> --apply <decision>
```

---

## Movement 1: DREAM (Specify Intent)

### Purpose
Capture **what** we want (intent), not **how** to build it (implementation).

### When to DREAM
- ✅ Starting a new epic
- ✅ Requirements are fuzzy or exploratory
- ✅ Stakeholder alignment needed
- ❌ NOT for: bugs, simple refactors, docs

### Quick Checklist

```
□ Epic created with --type=epic
□ bd dream <epic-id> --init
□ Section 0 filled with compressed intent (3-5 bullets)
□ Clarifying questions documented
□ Edge cases identified
□ bd dream <epic-id> --ready
□ DREAM status: ready_to_render
```

### Command Reference

```bash
# Initialize DREAM canvas
bd dream <epic-id> --init

# Edit Section 0 (human intent)
bd dream <epic-id> --edit

# Check readiness
bd dream <epic-id> --status

# Validate and unlock Phase 1
bd dream <epic-id> --ready

# Display DREAM content
bd dream <epic-id> --show
```

### Section 0 Template (Human Intent)

```markdown
## Section 0: Compressed Intent

**What:** [1-2 sentence description]

**Why:** [Business/user value]

**Key capabilities:**
- [Noun+Verb atomic capability 1]
- [Noun+Verb atomic capability 2]
- [Noun+Verb atomic capability 3]

**Success looks like:**
- [Observable outcome 1]
- [Observable outcome 2]

**Out of scope:**
- [What we're NOT doing]
```

### Intent Anchor Format

All task decomposition uses **atomic capabilities** (`Noun+Verb`):

```bash
# Good: Atomic capability format
--dream-anchor=<epic-id>#User+Authenticate
--dream-anchor=<epic-id>#Payment+Authorize
--dream-anchor=<epic-id>#Order+Submit

# Bad: Implementation details
--dream-anchor=<epic-id>#add-jwt-middleware
--dream-anchor=<epic-id>#stripe-api-call
```

### Common Mistakes

❌ **DON'T write implementation in DREAM:**
```
Section 0: "Use JWT tokens with Redis for session storage,
implement middleware in auth.go, add refresh token endpoint..."
```

✅ **DO write intent:**
```
Section 0: "Users authenticate once and stay logged in across
sessions. Sessions expire after 7 days. Admins can revoke access."
```

---

## Movement 2: LIVE (Observe Behavior)

### Purpose
Capture **evidence** during implementation. Facts only, no interpretation.

### When to LIVE
- ✅ Starting work on any task under a MUSE epic
- ✅ Encountering unexpected behavior
- ✅ Test failures
- ✅ Performance surprises
- ✅ Design tensions

### Quick Checklist

```
□ bd live <bead-id> --start
□ Observations logged as work progresses
□ Deviations from expected behavior documented
□ Critical issues marked with --critical
□ Open questions deferred to ADAPT
□ LIVE doc complete before closing bead
```

### Command Reference

```bash
# Initialize LIVE doc
bd live <bead-id> --start

# Add observation
bd live <bead-id> --observe "observation text"

# Mark as critical (triggers urgent ADAPT)
bd live <bead-id> --critical

# Edit manually
bd live <bead-id> --edit

# Display LIVE content
bd live <bead-id> --show
```

### Observation Template

Good LIVE observations are:
- **Factual** (not interpretive)
- **Timestamped** (when did this happen?)
- **Context-rich** (enough detail to understand later)
- **Specific** (avoid vague terms)

```markdown
## Observations

**Source:** Direct implementation (mechanic-abc.1)
**Time:** 2026-01-22 10:30-12:45

### Raw Observations

1. SAML metadata parsing took 450ms avg (expected <100ms)
2. Token validation failed with "Clock skew detected" for 3/10 test providers
3. Redis connection pooling maxed out at 47 concurrent sessions
4. User model lacks `last_auth_provider` field for multi-SSO support

### Deviations

- Expected: Sub-100ms SSO flow
- Actual: 450ms+ due to metadata parsing on every auth
- Impact: Noticeable lag for users

### Surprises

- Clock skew more prevalent than anticipated (30% failure rate in staging)
- Redis pool exhaustion occurred at 47 sessions (expected 100+)

### Open Questions (deferred to ADAPT)

- Should we cache SAML metadata?
- Do we need NTP sync validation?
- Is Redis pool size configurable?
```

### Automation Hooks (Future)

```bash
# Auto-capture test failures (bd-z4a)
bd live-capture <bead-id> --from-tests

# Extract from commit messages (bd-l1t)
git commit -m "feat: add SSO
LIVE: SAML metadata parsing slower than expected"
```

### Common Mistakes

❌ **DON'T interpret in LIVE:**
```
"The SAML implementation is poorly designed and needs refactoring"
```

✅ **DO state facts:**
```
"SAML metadata parsing: 450ms avg, 95th percentile 780ms"
```

---

## Movement 3: ADAPT (Interpret & Evolve)

### Purpose
Interpret LIVE observations and **evolve intent** (update DREAM) or **close loop** (keep unchanged).

### When to ADAPT
- ✅ Phase 4 review gate (mandatory before epic closure)
- ✅ Critical LIVE observation triggers emergency ADAPT
- ✅ Accumulated observations challenge DREAM assumptions
- ✅ Design tensions surface

### Quick Checklist

```
□ All subtasks completed
□ LIVE observations aggregated
□ bd adapt <epic-id> --analyze
□ DREAM assumptions challenged with evidence
□ Proposed intent changes documented
□ Decision: update_dream OR keep_unchanged
□ bd adapt <epic-id> --apply <decision>
□ If update_dream: new tasks created, loop continues
□ If keep_unchanged: epic closed, loop complete
```

### Command Reference

```bash
# Aggregate LIVE observations and draft proposals
bd adapt <epic-id> --analyze

# Display ADAPT content
bd adapt <epic-id> --show

# Apply decision
bd adapt <epic-id> --apply update_dream      # Intent evolves
bd adapt <epic-id> --apply keep_unchanged    # Loop closes

# Emergency ADAPT from critical LIVE
bd adapt <epic-id> --emergency <live-id>
```

### ADAPT Analysis Template

```markdown
## Evidence Summary

**Sources:** 5 LIVE docs, 12 observations
**Time span:** 2026-01-22 to 2026-01-24

### Aggregated by Type

**Performance:**
- SAML metadata: 450ms avg (3 observations)
- Redis pool: maxed at 47 sessions (1 observation)

**Security:**
- Clock skew: 30% failure rate (2 observations)

**Data Model:**
- Missing `last_auth_provider` field (1 observation)

### Challenged Assumptions

**DREAM assumed:** Sub-100ms SSO flow
**LIVE showed:** 450ms+ due to metadata parsing
**Conclusion:** Caching strategy needed

**DREAM assumed:** 100+ concurrent sessions
**LIVE showed:** Redis pool exhausted at 47
**Conclusion:** Pool sizing incorrect

### Proposed Intent Changes

**Small, reversible changes:**

1. **Add caching capability:** User+CacheAuthMetadata
   - Cache SAML metadata per provider (TTL: 1 hour)
   - Reduces auth flow to <100ms target

2. **Update Redis config:** System+ScaleSessionStore
   - Increase pool size to 200 connections
   - Add monitoring for pool utilization

### Decision

**Recommendation:** update_dream
**Reason:** Core assumption (sub-100ms) violated, requires new capabilities
```

### Decision Criteria

**Choose `update_dream` when:**
- Core assumptions invalidated
- New capabilities needed
- Architecture requires changes
- User expectations not met

**Choose `keep_unchanged` when:**
- Observations confirm assumptions
- Minor issues (bugs, not design flaws)
- Intent achieved despite implementation struggles
- Changes are implementation-level only

### Common Mistakes

❌ **DON'T use ADAPT for bug tracking:**
```
Decision: update_dream
Reason: Fix typo in error message
```

✅ **DO use ADAPT for intent evolution:**
```
Decision: update_dream
Reason: Performance assumption violated, caching capability needed
```

---

## Full Loop Example

### Phase 0: Epic Creation

```bash
# Human or agent creates epic
bd create "Add SSO authentication" --type=epic --priority=1
# → mechanic-xyz

# Initialize DREAM
bd dream mechanic-xyz --init
```

### Phase 1: DREAM

Human fills Section 0:
```markdown
## Section 0: Compressed Intent

**What:** Users authenticate via enterprise SSO (SAML, OAuth2)

**Key capabilities:**
- User+AuthenticateSAML
- User+AuthenticateOAuth2
- Admin+ConfigureProvider

**Success looks like:**
- Sub-100ms authentication flow
- Support 5+ providers
- Zero password storage
```

Validate and unlock:
```bash
bd dream mechanic-xyz --ready
# → Status: ready_to_render
```

### Phase 2: Decomposition

Agent creates tasks with intent anchors:
```bash
bd create "Implement SAML provider" \
  --parent=mechanic-xyz \
  --dream-anchor=mechanic-xyz#User+AuthenticateSAML \
  --type=task
# → mechanic-xyz.1

bd create "Implement OAuth2 provider" \
  --parent=mechanic-xyz \
  --dream-anchor=mechanic-xyz#User+AuthenticateOAuth2 \
  --type=task
# → mechanic-xyz.2

bd create "Add provider config UI" \
  --parent=mechanic-xyz \
  --dream-anchor=mechanic-xyz#Admin+ConfigureProvider \
  --type=task
# → mechanic-xyz.3
```

### Phase 3: Implementation with LIVE

```bash
# Agent starts task
bd update mechanic-xyz.1 --status=in_progress
bd live mechanic-xyz.1 --start

# During implementation, capture observations
bd live mechanic-xyz.1 --observe "SAML metadata parsing: 450ms avg"
bd live mechanic-xyz.1 --observe "Clock skew failures: 30% rate"

# Complete task
bd close mechanic-xyz.1

# Repeat for other tasks...
```

### Phase 4: ADAPT

```bash
# Analyze all LIVE observations
bd adapt mechanic-xyz --analyze

# Review ADAPT proposals
bd adapt mechanic-xyz --show

# Apply decision
bd adapt mechanic-xyz --apply update_dream
# → Creates new tasks for caching capability

# OR if intent achieved:
bd adapt mechanic-xyz --apply keep_unchanged
# → Epic ready to close
```

### Phase 5: Loop Continues or Closes

**If `update_dream`:**
```bash
# New cycle starts
bd create "Add SAML metadata caching" --parent=mechanic-xyz
# → Back to Phase 3
```

**If `keep_unchanged`:**
```bash
# Epic complete
bd close mechanic-xyz
```

---

## Cheat Sheet

### DREAM Commands

| Command | Purpose |
|---------|---------|
| `bd dream <epic> --init` | Create DREAM canvas |
| `bd dream <epic> --edit` | Edit Section 0 |
| `bd dream <epic> --ready` | Validate & unlock |
| `bd dream <epic> --show` | Display content |
| `bd dream <epic> --status` | Check readiness |

### LIVE Commands

| Command | Purpose |
|---------|---------|
| `bd live <bead> --start` | Initialize LIVE doc |
| `bd live <bead> --observe "text"` | Add observation |
| `bd live <bead> --critical` | Mark critical |
| `bd live <bead> --show` | Display content |
| `bd live <bead> --edit` | Manual edit |

### ADAPT Commands

| Command | Purpose |
|---------|---------|
| `bd adapt <epic> --analyze` | Aggregate LIVE, draft proposals |
| `bd adapt <epic> --show` | Display content |
| `bd adapt <epic> --apply update_dream` | Evolve intent |
| `bd adapt <epic> --apply keep_unchanged` | Close loop |
| `bd adapt <epic> --emergency <live>` | Urgent ADAPT |

### Decision Tree

```
Epic starts
  └─> DREAM --init & --ready
      └─> Decompose with intent anchors
          └─> For each task:
              └─> LIVE --start
                  └─> Capture observations
                      └─> Task complete
                          └─> Critical observation?
                              ├─ Yes: ADAPT --emergency
                              └─ No: Continue
          └─> All tasks complete
              └─> ADAPT --analyze
                  └─> Assumptions challenged?
                      ├─ Yes: --apply update_dream → new cycle
                      └─ No: --apply keep_unchanged → close epic
```

---

## Common Patterns

### Pattern 1: Straightforward Implementation

```bash
# DREAM confirmed, no surprises
bd dream epic --init && bd dream epic --ready
# ... decompose, implement ...
bd adapt epic --analyze
bd adapt epic --apply keep_unchanged
bd close epic
```

### Pattern 2: Mid-Cycle Course Correction

```bash
# Critical observation triggers emergency ADAPT
bd live bead --critical
bd adapt epic --emergency bead
bd adapt epic --apply update_dream
# ... new tasks created ...
```

### Pattern 3: Multiple ADAPT Cycles

```bash
# Cycle 1: Initial implementation
bd adapt epic --analyze → update_dream

# Cycle 2: Refined implementation
bd adapt epic --analyze → update_dream

# Cycle 3: Final polish
bd adapt epic --analyze → keep_unchanged
bd close epic
```

### Pattern 4: Parallel Tasks with Centralized ADAPT

```bash
# Multiple agents work simultaneously
Agent1: bd live epic.1 --start & implement
Agent2: bd live epic.2 --start & implement
Agent3: bd live epic.3 --start & implement

# Single ADAPT aggregates all LIVE
bd adapt epic --analyze
```

---

## Integration with Agent Flywheel

**MUSE maps to Flywheel phases:**

| MUSE | Flywheel Phase | Activity |
|------|---------------|----------|
| DREAM | Before Phase 1 | Specify intent |
| Decomposition | Phase 1 | Break into tasks |
| LIVE | Phase 3 | Capture observations |
| ADAPT | Phase 4 | Review & evolve |
| Loop continues | Phase 1 | New cycle starts |
| Loop closes | Phase 5 | Epic complete |

---

## FAQ

**Q: Do I need MUSE for every epic?**
A: No. Use MUSE for exploratory, learning-heavy, or uncertain work. Skip for well-understood bug fixes or simple features.

**Q: Can I skip DREAM validation?**
A: No. The DREAM gate enforces intent clarity before decomposition. This prevents wasted work.

**Q: What if I forget to start LIVE?**
A: You can initialize LIVE anytime. Best practice: start immediately when claiming a task.

**Q: How many ADAPT cycles are typical?**
A: 1-3 cycles. If you hit 5+ cycles, DREAM might be too ambitious or vague.

**Q: Can I close an epic without ADAPT?**
A: No. ADAPT gate is mandatory. It ensures we learned from implementation.

**Q: What makes an observation "critical"?**
A: Observations that invalidate core DREAM assumptions or block progress. Use `--critical` sparingly.

---

## Next Steps

**For complete examples:**
- See `MUSE_EXAMPLES.md` for full epic walkthrough
- See `.beads/MUSE_README.md` for directory structure
- See `AGENTS.md` for integration with project workflow

**For MUSE philosophy:**
- [github.com/ShaggyDude/muse](https://github.com/ShaggyDude/muse)
