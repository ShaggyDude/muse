# MUSE Directory Structure

This directory contains MUSE framework artifacts for this project.

MUSE (DREAM → LIVE → ADAPT) is a continuous learning loop for software development. See https://github.com/ShaggyDude/muse for full framework documentation.

## Directory Structure

```
.beads/
├── dreams/          # DREAM canvases (intent specification)
├── live/            # LIVE observations (evidence capture)
├── adapt/           # ADAPT decisions (intent evolution)
└── hooks/           # Git hooks for automation
```

## dreams/

**Purpose:** Specify intent before decomposition (MUSE M1 - DREAM movement)

**File naming:** `<epic-id>.md`

**Created by:** `bd dream <epic-id> --init`

**Contents:**
- YAML frontmatter (epic_id, status, timestamps)
- Section 0: Compressed Intent (3-5 bullets, human-written)
- Clarifying questions
- Provisional requirements
- Edge cases and failure scenarios
- Open tensions

**Lifecycle:**
1. Epic created → DREAM canvas initialized
2. Human fills Section 0 (what, not how)
3. Validate: `bd dream <epic-id> --ready`
4. Status: `intent_forming` → `ready_to_render`
5. Phase 1 unlocked → Agents decompose into beads

## live/

**Purpose:** Capture evidence during implementation (MUSE M2 - LIVE movement)

**File naming:** `<bead-id>-YYYYMMDD-HHMMSS.md`

**Created by:** `bd live <bead-id> --start`

**Contents:**
- YAML frontmatter (bead_id, status, timestamps, critical flag)
- Source context (system, environment, time window, version)
- Raw observations (facts only, no interpretation)
- Deviations from expected behavior
- Surprises and anomalies
- Open questions (deferred to ADAPT)

**Lifecycle:**
1. Agent starts work → LIVE observation initialized
2. During implementation → Observations added: `bd live <bead-id> --observe "..."`
3. Critical issues → Marked: `bd live <bead-id> --critical`
4. Phase 4 → Observations aggregated in ADAPT

**Automation:**
- Test failures auto-captured (via bd-z4a)
- Commit messages with `LIVE:` prefix extracted (via bd-l1t)
- Performance anomalies flagged

## adapt/

**Purpose:** Interpret evidence and propose intent changes (MUSE M3 - ADAPT movement)

**File naming:** `<epic-id>-cycleN.md` or `<epic-id>-cycleN-emergency.md`

**Created by:** `bd adapt <epic-id> --analyze`

**Contents:**
- YAML frontmatter (epic_id, loop_cycle, status, decision, dream_ref)
- Evidence summary (compressed from LIVE)
- Challenged assumptions (from DREAM)
- Design tensions surfaced
- Proposed intent changes
- Decision: update_dream | keep_unchanged

**Lifecycle:**
1. Phase 4 (mandatory review gate) → ADAPT analysis created
2. Agent aggregates all LIVE observations
3. Agent challenges DREAM assumptions with evidence
4. Agent proposes intent changes (small, reversible)
5. Human decides: `bd adapt <epic-id> --apply <decision>`
6. If `update_dream` → DREAM evolves, new beads created
7. If `keep_unchanged` → Loop closes, epic complete

**Emergency path:**
- Critical LIVE triggers urgent ADAPT: `bd adapt <epic-id> --emergency <live-id>`

## hooks/

**Purpose:** Git hooks for automated MUSE workflows

**Planned hooks:**
- `post-commit`: Extract LIVE observations from commit messages
- `pre-push`: Validate ADAPT gate before epic closure

**Status:** Not yet implemented (Phase 3 beads: bd-l1t)

---

## Workflow Summary

### Epic Lifecycle

```
1. CREATE EPIC
   └─> bd create "Epic title" --type epic

2. DREAM (M1)
   ├─> bd dream <epic-id> --init
   ├─> Edit Section 0 (human intent)
   └─> bd dream <epic-id> --ready
       └─> Phase 1 unlocked

3. DECOMPOSE (Flywheel Phase 1)
   └─> Agents create beads with atomic capabilities
       └─> Each bead links to DREAM via --dream-anchor

4. IMPLEMENT (Flywheel Phase 3)
   ├─> bd live <bead-id> --start
   ├─> Work on implementation
   ├─> bd live <bead-id> --observe "..."
   └─> If critical: bd live <bead-id> --critical

5. ADAPT (M3 - Flywheel Phase 4)
   ├─> bd adapt <epic-id> --analyze
   ├─> Review evidence and proposals
   └─> bd adapt <epic-id> --apply <decision>
       ├─> update_dream → DREAM evolves, loop continues
       └─> keep_unchanged → Loop closes

6. CLOSE EPIC
   └─> bd close <epic-id>
```

---

## Key Principles

### Intent Anchors
Every bead links to its epic's DREAM:
```bash
bd create "Implement Payment+Authorize" \
  --parent=sage-y53 \
  --dream-anchor=sage-y53#Payment+Authorize \
  --type=task
```

### Atomic Capabilities
All specifications use `Noun+Capability` format:
- `Payment+Authorize`
- `Order+Submit`
- `User+Authenticate`

Atomics self-organize by noun (all `Order+*` cluster naturally).

### Hard Gates
1. **DREAM Gate:** Blocks bead creation until DREAM ready
2. **Intent Anchor Gate:** Blocks bead creation without `--dream-anchor`
3. **ADAPT Gate:** Blocks epic closure without ADAPT decision

### Loop Health
Check status:
```bash
bd muse-loop <epic-id>          # Status check (bd-30e)
bd muse-loop <epic-id> --graph  # Visualization (bd-2f8)
```

---

## Commands Reference

### DREAM
```bash
bd dream <epic> --init      # Create canvas
bd dream <epic> --edit      # Edit in $EDITOR
bd dream <epic> --status    # Check readiness
bd dream <epic> --ready     # Validate & unlock Phase 1
bd dream <epic> --show      # Display content
```

### LIVE
```bash
bd live <bead> --start                 # Initialize
bd live <bead> --observe "text"        # Add observation
bd live <bead> --edit                  # Edit in $EDITOR
bd live <bead> --show                  # Display content
bd live <bead> --critical              # Mark critical
```

### ADAPT
```bash
bd adapt <epic> --analyze              # Aggregate LIVE, draft proposals
bd adapt <epic> --edit                 # Edit in $EDITOR
bd adapt <epic> --show                 # Display content
bd adapt <epic> --apply <decision>     # Apply (update_dream | keep_unchanged)
bd adapt <epic> --emergency <live-id>  # Urgent ADAPT from critical LIVE
```

---

## Implementation Status

### P0 (Core) - Complete
- ✅ bd-3nw: `bd dream` commands
- ✅ bd-1vj: `bd live` commands
- ✅ bd-yd1: `bd adapt` commands
- ✅ bd-1b9: MUSE directory structure
- ⏳ bd-ju8: YAML frontmatter support
- ⏳ bd-3ba: DREAM gate enforcement
- ⏳ bd-31f: Intent anchor validation
- ⏳ bd-2xz: ADAPT gate enforcement

### P1 (Automation) - Pending
- bd-z4a: Test output parser for LIVE
- bd-l1t: Post-commit LIVE extraction
- bd-1zg: LIVE aggregation to ADAPT
- bd-30e: `bd muse-loop` status command
- bd-2mr: Critical LIVE alerts (Agent Mail)
- bd-1jv: ADAPT notifications (Agent Mail)
- bd-1ql: DREAM clarification (Agent Mail)

### P2 (Docs & Metrics) - Pending
- bd-1vv: Update AGENTS.md
- bd-ugc: MUSE_QUICKSTART.md
- bd-6vq: MUSE_EXAMPLES.md
- bd-2f8: Loop visualization
- bd-eh4: Metrics dashboard

---

**For full MUSE framework documentation:** https://github.com/ShaggyDude/muse
