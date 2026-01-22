# MUSE Examples: Real Epic Walkthroughs

**Purpose:** Complete examples of MUSE (DREAM → LIVE → ADAPT) cycles in practice.

---

## Example 1: Straightforward Epic (Keep Unchanged)

**Epic:** Add user notification preferences
**Bead:** mechanic-n7p
**Outcome:** Intent clear, implementation smooth, loop closes in 1 cycle

---

### Phase 0: Epic Creation

```bash
# Human creates epic
bd create "Add user notification preferences" --type=epic --priority=2
# → mechanic-n7p
```

---

### Phase 1: DREAM

**Initialize canvas:**
```bash
bd dream mechanic-n7p --init
```

**Human fills Section 0 (`.beads/dreams/mechanic-n7p.md`):**

```markdown
---
epic_id: mechanic-n7p
status: intent_forming
created: 2026-01-20T10:00:00Z
---

## Section 0: Compressed Intent

**What:** Users control notification delivery preferences

**Why:** Reduce notification fatigue, respect user preferences

**Key capabilities:**
- User+SetEmailNotifications (enable/disable)
- User+SetPushNotifications (enable/disable)
- User+SetNotificationFrequency (instant, daily digest, weekly digest)

**Success looks like:**
- Settings page with toggles
- Preferences persist across sessions
- Notification service respects preferences

**Out of scope:**
- Per-notification-type granularity (all or nothing for MVP)
- Slack/webhook integrations

## Clarifying Questions

1. Should preferences apply retroactively to queued notifications?
   - **Answer:** No, only affects new notifications

2. Default state for new users?
   - **Answer:** All enabled (opt-out model)

## Provisional Requirements

- RESTful API: GET/PUT `/api/users/{id}/notification-preferences`
- Database: Add `notification_preferences` field to User model
- Frontend: Settings page with toggle switches

## Edge Cases

- What if user disables all notifications?
  - **Allow it.** Show warning banner in UI.

- What happens to in-flight notifications when preferences change?
  - **Deliver them.** Only affects future notifications.

## Open Tensions

None at this stage.
```

**Validate and unlock:**
```bash
bd dream mechanic-n7p --ready
# ✓ Section 0 complete
# ✓ Status: ready_to_render
```

---

### Phase 2: Decomposition

**Agent creates tasks with intent anchors:**

```bash
# Backend
bd create "Add User+SetEmailNotifications capability" \
  --parent=mechanic-n7p \
  --dream-anchor=mechanic-n7p#User+SetEmailNotifications \
  --type=task \
  --priority=2
# → mechanic-n7p.1

bd create "Add User+SetPushNotifications capability" \
  --parent=mechanic-n7p \
  --dream-anchor=mechanic-n7p#User+SetPushNotifications \
  --type=task \
  --priority=2
# → mechanic-n7p.2

bd create "Add User+SetNotificationFrequency capability" \
  --parent=mechanic-n7p \
  --dream-anchor=mechanic-n7p#User+SetNotificationFrequency \
  --type=task \
  --priority=2
# → mechanic-n7p.3

# Frontend
bd create "Add preferences UI in settings" \
  --parent=mechanic-n7p \
  --dream-anchor=mechanic-n7p#User+SetEmailNotifications \
  --type=task \
  --priority=2
# → mechanic-n7p.4

# Integration
bd create "Update notification service to respect preferences" \
  --parent=mechanic-n7p \
  --type=task \
  --priority=2
# → mechanic-n7p.5
```

---

### Phase 3: Implementation with LIVE

**Task 1: Email notifications (mechanic-n7p.1)**

```bash
bd update mechanic-n7p.1 --status=in_progress
bd live mechanic-n7p.1 --start
```

**LIVE observations (`.beads/live/mechanic-n7p.1-20260120-140530.md`):**

```markdown
---
bead_id: mechanic-n7p.1
status: active
created: 2026-01-20T14:05:30Z
critical: false
---

## Source Context

- **System:** Mechanic backend (Go/MongoDB)
- **Environment:** Local dev
- **Time window:** 2026-01-20 14:05-15:30
- **Version:** mechanic@e7f2a1c

## Raw Observations

1. Added `email_notifications_enabled` field to User model (bool)
2. API endpoint: `PUT /api/users/{id}/preferences/email` (200ms avg)
3. MongoDB update: `db.users.updateOne()` - no indexing issues
4. Tests pass (12/12), coverage 95%
5. OpenAPI spec updated

## Deviations from Expected

None. Implementation straightforward.

## Surprises

None.

## Open Questions

None at this time.
```

**Complete task:**
```bash
bd close mechanic-n7p.1
```

**Tasks 2-5: Similar pattern (smooth implementation)**

```bash
# mechanic-n7p.2, .3, .4, .5 all implement cleanly
# LIVE observations show no major deviations
# All tests pass, no performance issues
```

---

### Phase 4: ADAPT

**All tasks complete. Run ADAPT:**

```bash
bd adapt mechanic-n7p --analyze
```

**ADAPT analysis (`.beads/adapt/mechanic-n7p-cycle1.md`):**

```markdown
---
epic_id: mechanic-n7p
loop_cycle: 1
status: pending_decision
created: 2026-01-22T10:00:00Z
dream_ref: .beads/dreams/mechanic-n7p.md
decision: null
---

## Evidence Summary

**Sources:** 5 LIVE docs, 18 observations
**Time span:** 2026-01-20 to 2026-01-22
**Critical observations:** 0

### Aggregated by Type

**Implementation:**
- All 3 user capabilities implemented as designed
- API endpoints: 180-220ms response time
- Database updates: no performance issues
- Frontend: 3 toggle switches with instant feedback

**Testing:**
- Unit tests: 87/87 passing (98% coverage)
- Integration tests: 12/12 passing
- E2E tests: 5/5 passing

**Performance:**
- No issues observed
- All metrics within expected ranges

### Challenged Assumptions

**None.** All DREAM assumptions held:

| DREAM Assumption | LIVE Evidence | Status |
|------------------|---------------|--------|
| Settings page with toggles | ✓ Implemented | Confirmed |
| Preferences persist across sessions | ✓ MongoDB storage | Confirmed |
| Notification service respects prefs | ✓ Integration tests pass | Confirmed |

### Proposed Intent Changes

**None.** Intent was clear and achievable.

### Design Tensions Surfaced

None.

### Decision Recommendation

**keep_unchanged**

**Reason:**
- All capabilities delivered as specified
- No assumptions challenged by implementation
- No emergent complexity
- Tests confirm expected behavior
- User acceptance criteria met

Intent was clear. Implementation confirmed design. Loop can close.
```

**Apply decision:**
```bash
bd adapt mechanic-n7p --apply keep_unchanged

# ✓ ADAPT cycle complete
# ✓ Epic ready for closure
```

---

### Phase 5: Epic Closure

```bash
bd close mechanic-n7p

# ✓ Epic closed
# ✓ MUSE loop complete in 1 cycle
```

**Outcome:** Clean implementation. DREAM was clear, LIVE confirmed assumptions, ADAPT closed the loop. No intent evolution needed.

---

## Example 2: Complex Epic (Multiple ADAPT Cycles)

**Epic:** Add real-time collaboration
**Bead:** mechanic-r9x
**Outcome:** Intent evolves through 3 ADAPT cycles based on evidence

---

### Phase 1: DREAM (Initial Intent)

```markdown
## Section 0: Compressed Intent

**What:** Multiple users collaborate on projects in real-time

**Key capabilities:**
- User+EditProjectConcurrently
- User+SeeCursorPositions
- System+SyncChangesRealtime (sub-100ms)

**Success looks like:**
- <100ms sync latency
- No conflicts or data loss
- Visual indicators of who's editing what

**Out of scope:**
- Voice/video chat
- Presence indicators outside project view
```

```bash
bd dream mechanic-r9x --ready
# ✓ Status: ready_to_render
```

---

### Phase 2: Decomposition (Cycle 1)

```bash
bd create "Add WebSocket connection for real-time updates" \
  --parent=mechanic-r9x \
  --dream-anchor=mechanic-r9x#System+SyncChangesRealtime \
  --type=task
# → mechanic-r9x.1

bd create "Add cursor position tracking" \
  --parent=mechanic-r9x \
  --dream-anchor=mechanic-r9x#User+SeeCursorPositions \
  --type=task
# → mechanic-r9x.2

bd create "Implement conflict-free replicated data type (CRDT)" \
  --parent=mechanic-r9x \
  --dream-anchor=mechanic-r9x#User+EditProjectConcurrently \
  --type=task
# → mechanic-r9x.3
```

---

### Phase 3: Implementation with LIVE (Cycle 1)

**Task 1: WebSocket (mechanic-r9x.1)**

```bash
bd live mechanic-r9x.1 --start
```

**LIVE observations:**

```markdown
## Raw Observations

1. WebSocket implementation complete (Go `gorilla/websocket`)
2. Latency: 20-40ms for <10 concurrent users ✓
3. **Latency: 300-800ms for 50+ concurrent users** ⚠️
4. Memory usage: 12MB per connection
5. Connection pooling: maxes out at 47 connections

## Deviations

- **Expected:** Sub-100ms sync for all users
- **Actual:** Sub-100ms only for <10 users
- **Impact:** DREAM assumption violated at scale

## Surprises

- WebSocket connections don't scale linearly
- Each connection spawns a goroutine (memory issue)
- No connection pooling in `gorilla/websocket`

## Open Questions

- Do we need Redis pub/sub for message distribution?
- Should we add load balancing?
- What's the expected concurrent user count?
```

**Mark critical:**
```bash
bd live mechanic-r9x.1 --critical
```

---

### Phase 4: ADAPT (Cycle 1 - Emergency)

**Critical observation triggers mid-cycle ADAPT:**

```bash
bd adapt mechanic-r9x --emergency mechanic-r9x.1
```

**ADAPT analysis:**

```markdown
## Evidence Summary

**Sources:** 1 LIVE doc (emergency), 7 observations
**Critical:** Yes (scaling bottleneck)

### Challenged Assumptions

**DREAM assumed:** Sub-100ms sync for concurrent users
**LIVE showed:** 300-800ms latency beyond 10 concurrent users
**Root cause:** Direct WebSocket connections don't scale

**DREAM assumed:** Implicit single-server architecture
**LIVE showed:** Connection pooling maxes at 47 (goroutine/memory limits)
**Root cause:** Missing distributed message bus

### Proposed Intent Changes

**New capability needed:** System+DistributeMessagesAtScale

**Implementation:**
- Add Redis pub/sub for message distribution
- WebSocket servers subscribe to Redis channels
- Scales horizontally (multiple servers)

**Updated architecture:**
```
Before: Client <-> WebSocket Server <-> MongoDB
After:  Client <-> WebSocket Server <-> Redis Pub/Sub <-> MongoDB
```

### Decision Recommendation

**update_dream**

**Reason:**
Core assumption (sub-100ms at scale) violated. Need new architectural capability.
```

**Apply decision:**
```bash
bd adapt mechanic-r9x --apply update_dream
```

**Update DREAM Section 0:**

```markdown
## Section 0: Compressed Intent (Updated Cycle 2)

**What:** Multiple users collaborate on projects in real-time

**Key capabilities:**
- User+EditProjectConcurrently
- User+SeeCursorPositions
- System+SyncChangesRealtime (sub-100ms)
- **System+DistributeMessagesAtScale** ← NEW

**Success looks like:**
- <100ms sync latency **for 100+ concurrent users** ← UPDATED
- No conflicts or data loss
- Visual indicators of who's editing what
- **Horizontal scaling support** ← NEW
```

---

### Phase 2: Decomposition (Cycle 2)

**New tasks for evolved intent:**

```bash
bd create "Add Redis pub/sub for WebSocket message distribution" \
  --parent=mechanic-r9x \
  --dream-anchor=mechanic-r9x#System+DistributeMessagesAtScale \
  --type=task
# → mechanic-r9x.4

bd create "Update WebSocket server to subscribe to Redis" \
  --parent=mechanic-r9x \
  --type=task
# → mechanic-r9x.5

bd create "Load test with 100+ concurrent connections" \
  --parent=mechanic-r9x \
  --type=task
# → mechanic-r9x.6
```

---

### Phase 3: Implementation with LIVE (Cycle 2)

**Tasks 4-6 implement Redis pub/sub architecture**

**LIVE observations (mechanic-r9x.4):**

```markdown
## Raw Observations

1. Redis pub/sub integrated (`go-redis`)
2. Latency: 30-60ms for 100 concurrent users ✓
3. Latency: 80-120ms for 500 concurrent users ✓
4. Memory: 2MB per connection (down from 12MB) ✓
5. Horizontal scaling confirmed (tested 3 servers)

## Deviations

None. Architecture scales as expected.

## Surprises

- Redis pub/sub more efficient than anticipated
- Memory reduction from 12MB to 2MB per connection
- Latency actually improved (30-60ms vs previous 20-40ms for small groups)
```

---

### Phase 4: ADAPT (Cycle 2)

```bash
bd adapt mechanic-r9x --analyze
```

**ADAPT analysis:**

```markdown
## Evidence Summary

**Sources:** 3 LIVE docs, 15 observations
**Time span:** Cycle 2 implementation

### Challenged Assumptions

**DREAM assumed:** Sub-100ms for 100+ users
**LIVE showed:** 30-120ms for 500 users ✓
**Conclusion:** Assumption confirmed with new architecture

**DREAM assumed:** Horizontal scaling needed
**LIVE showed:** 3-server cluster handled 500 users smoothly ✓
**Conclusion:** Assumption confirmed

### Proposed Intent Changes

**None.** Evolved intent from Cycle 1 is now validated.

However, one new observation surfaced:

**Observation:** Cursor position updates consume 40% of message bandwidth
**Question:** Should we throttle cursor updates to reduce load?

**Recommendation:** Minor optimization, not intent-level change. Handle as tech debt task.

### Decision Recommendation

**keep_unchanged**

**Reason:**
Intent from Cycle 1 evolution is now validated. Core capabilities delivered. Cursor throttling is implementation detail, not intent change.
```

**Apply decision:**
```bash
bd adapt mechanic-r9x --apply keep_unchanged
```

**Create tech debt task (not MUSE):**
```bash
bd create "Optimize cursor position update throttling" \
  --type=task \
  --priority=3 \
  --parent=mechanic-r9x
```

---

### Phase 5: Epic Closure

```bash
bd close mechanic-r9x

# ✓ Epic closed after 2 ADAPT cycles
# ✓ Intent evolved once (Redis pub/sub)
# ✓ Final implementation validated
```

**Outcome:** Initial DREAM missed scaling architecture. LIVE evidence triggered emergency ADAPT. Intent evolved. Cycle 2 implementation validated evolved intent. Loop closed.

**Key Lesson:** MUSE caught architectural flaw early (Cycle 1) before scaling to production.

---

## Example 3: Emergency ADAPT with Keep Unchanged

**Epic:** Add SSO authentication
**Bead:** mechanic-s4m
**Scenario:** Critical security issue found mid-implementation, but doesn't change intent

---

### Phase 3: Implementation (Abbreviated)

**Task: Implement SAML provider (mechanic-s4m.2)**

**LIVE observations:**

```markdown
## Raw Observations

1. SAML implementation complete
2. Token validation works for 9/10 test providers
3. **Security audit failed: XML signature validation vulnerable to XXE attack** ⚠️
4. Impact: High severity security issue

## Deviations

- Expected: Secure SAML implementation
- Actual: XXE vulnerability in XML parsing

## Surprises

- Standard `encoding/xml` library susceptible to XXE
- Requires `github.com/russellhaering/goxmldsig` for secure parsing
```

**Mark critical:**
```bash
bd live mechanic-s4m.2 --critical
```

---

### Phase 4: Emergency ADAPT

```bash
bd adapt mechanic-s4m --emergency mechanic-s4m.2
```

**ADAPT analysis:**

```markdown
## Evidence Summary

**Critical security issue:** XXE vulnerability in SAML XML parsing

### Challenged Assumptions

**DREAM assumed:** SAML implementation would be secure
**LIVE showed:** Standard library has XXE vulnerability
**Root cause:** Missing secure XML parsing library

### Analysis: Intent vs Implementation

**Question:** Does this challenge DREAM intent?

**DREAM intent:** User+AuthenticateSAML (secure SSO)
**Issue:** Implementation detail (XML parsing library)
**Conclusion:** Intent is correct. Implementation needs security fix.

### Proposed Intent Changes

**None.**

**Reason:**
This is an **implementation bug**, not an **intent flaw**.

- DREAM correctly specified secure SSO
- Implementation failed to use secure XML library
- Fix: Replace `encoding/xml` with `goxmldsig`
- Intent unchanged: User+AuthenticateSAML still correct capability

### Remediation (Not ADAPT)

**Create P0 bug task:**
```bash
bd create "Fix XXE vulnerability in SAML XML parsing" \
  --type=bug \
  --priority=0 \
  --parent=mechanic-s4m
```

**Block epic closure until P0 resolved.**

### Decision Recommendation

**keep_unchanged**

**Reason:**
Intent is sound. This is a critical bug, but ADAPT is for intent evolution, not bug tracking. Fix the bug, validate with security audit, then close epic.
```

**Apply decision:**
```bash
bd adapt mechanic-s4m --apply keep_unchanged
```

**Create P0 bug:**
```bash
bd create "Fix XXE vulnerability in SAML XML parsing" \
  --type=bug \
  --priority=0 \
  --parent=mechanic-s4m \
  --description="Replace encoding/xml with goxmldsig for secure XML signature validation"
# → mechanic-s4m.6
```

**Fix bug, re-audit, close epic:**
```bash
# Agent fixes XXE vulnerability
bd close mechanic-s4m.6

# Security audit passes
# Epic closure unblocked
bd close mechanic-s4m
```

**Outcome:** Emergency ADAPT correctly identified this as **bug** (not intent change). Intent remained unchanged. Bug fixed within same cycle.

**Key Lesson:** ADAPT distinguishes between **intent flaws** (update_dream) and **implementation bugs** (keep_unchanged + P0 bug task).

---

## Summary: When to Update Dream vs Keep Unchanged

### Update Dream (Intent Evolution)

**Indicators:**
- Core assumptions invalidated
- New capabilities needed
- Architecture requires changes
- User expectations not met
- Scale/performance targets missed fundamentally

**Examples:**
- "Sub-100ms sync" assumption violated → Add Redis pub/sub capability
- "Single auth provider" assumption → Add multi-provider capability
- "In-memory cache" assumption → Add distributed cache capability

### Keep Unchanged (Intent Validated)

**Indicators:**
- Assumptions confirmed by implementation
- Issues are bugs, not design flaws
- Minor optimizations (not architectural)
- Edge cases handled within existing intent
- Success criteria met

**Examples:**
- Security bug (XXE vulnerability) → Fix bug, intent unchanged
- Performance optimization (cursor throttling) → Tech debt, intent unchanged
- Implementation struggles but achieves intent → Close loop

---

## ADAPT Decision Matrix

| Observation | Impact | Decision |
|-------------|--------|----------|
| Core assumption violated | High | update_dream |
| New capability needed | High | update_dream |
| Architecture insufficient | High | update_dream |
| Security vulnerability | Medium-High | keep_unchanged + P0 bug |
| Performance optimization | Medium | keep_unchanged + tech debt |
| Edge case handled | Low | keep_unchanged |
| Tests confirm design | Low | keep_unchanged |

---

## Next Steps

**For more guidance:**
- See `MUSE_QUICKSTART.md` for command reference and checklists
- See `AGENTS.md` for MUSE integration with project workflow
- See `.beads/MUSE_README.md` for directory structure

**For MUSE philosophy:**
- [github.com/ShaggyDude/muse](https://github.com/ShaggyDude/muse)
