# Phase 1: MUSE as Dev/Design Methodology for Agent Flywheel

**Bead:** mechanic-y53  
**Type:** Epic  
**Status:** Ready for agent to claim

---

## Objective

Run the full Agent Flywheel Phase 1 (Ideation & Planning) to design how the **entire MUSE framework** becomes the dev/design methodology for Agent Flywheel workflows.

**This is meta:** The flywheel is ideating on how to integrate itself with MUSE.

---

## What is MUSE?

MUSE is a design-first, English-first methodology with **3 continuous, interlocking movements**:

```
[ 1 DREAM ]   Specify → Render   — Are we clear on intent?
[ 2 LIVE  ]   Execute → Observe  — What is actually happening?
[ 3 ADAPT ]   Interpret → Evolve — What should we change next?
↺ (continuous loop)
```

**Principles:**
- Design is an executable conversation
- Form emerges from constraints, not control
- Behavior is the signal
- Change stays small, reversible, and humane

---

## Step 1: Deep-Read MUSE

Read **ALL** files in `MUSE-DOCS/`:
- `MUSE-OVERVIEW.md` - Core philosophy and movements
- `DREAM-TEMPLATE.md` - How to specify intent
- `LIVE-TEMPLATE.md` - How to observe behavior  
- `ADAPT-TEMPLATE.md` - How to interpret and evolve
- `HowTo-DREAM.md`, `HowTo-LIVE.md`, `HowTo-ADAPT.md` - Usage guides

Understand MUSE as a **complete methodology**, not just templates.

---

## Step 2: Understand Agent Flywheel

Read:
- `.github/AGENT_FLYWHEEL_INTEGRATION.md`
- `AGENTS.md`
- https://agent-flywheel.com/workflow

Understand the 5 flywheel phases:
1. Ideation & Planning
2. Task Breakdown (Beads)
3. Agent Swarm Implementation
4. Review, Testing & Polish
5. Deploy & Maintenance

---

## Step 3: Create Your Integration Plan

Design how MUSE becomes the dev/design methodology for flywheel. Consider:

**DREAM Movement:**
- When does DREAM happen in the flywheel? (Phase 1? Before Phase 1?)
- Who creates DREAM docs - humans, agents, or both?
- How do DREAM docs feed into beads?
- Should `bd` have DREAM integration?

**LIVE Movement:**
- How do agents capture observations during implementation?
- What triggers a LIVE observation? (errors, unexpected behavior, decisions)
- How are LIVE docs stored and linked to beads?
- Automation: Can agents auto-generate LIVE observations from git/output?

**ADAPT Movement:**
- When does ADAPT happen? (Phase 4-5? Continuous?)
- How do LIVE observations feed into ADAPT decisions?
- How do ADAPT decisions become new beads or spec changes?
- How does the loop close back to DREAM?

**The Full Loop:**
- How do all 3 movements work together continuously within flywheel?
- What tooling changes are needed?
- What workflow/documentation changes?
- How does Agent Mail coordinate MUSE activities?

---

## Step 4: Get Competing Plans

**Claude leads this ideation** (strongest at systems planning).

Use Agent Mail to request plans from Codex and Gemini:

```
Create an implementation plan for integrating MUSE framework (DREAM → LIVE → ADAPT loop) with Agent Flywheel as a complete dev/design methodology. Include specific tooling, templates, and workflow changes. Reply with your full plan.
```

---

## Step 5: Synthesize Best of All Worlds (Claude does this)

Once you have plans from all agents, Claude synthesizes using this prompt:

```
I asked 3 competing LLMs to do the exact same thing and they came up with pretty different plans which you can read below. I want you to REALLY carefully analyze their plans with an open mind and be intellectually honest about what they did that's better than your plan. Then I want you to come up with the best possible revisions to your plan (you should simply update your existing document for your original plan with the revisions) that artfully and skillfully blends the "best of all worlds" to create a true, ultimate, superior hybrid version of the plan that best achieves our stated goals and will work the best in real-world practice to solve the problems we are facing and our overarching goals while ensuring the extreme success of the enterprise as best as possible; you should provide me with a complete series of git-diff style changes to your original plan to turn it into the new, enhanced, much longer and detailed plan that integrates the best of all the plans with every good idea included (you don't need to mention which ideas came from which models in the final revised enhanced plan):
```

---

## Step 6: Generate Brilliant Ideas (all agents, Claude curates)

Each agent runs this prompt. Claude curates the final list:

```
OK so now I want you to come up with your top 10 most brilliant ideas for adding extremely powerful and cool functionality that will make this system far more compelling, useful, intuitive, versatile, powerful, robust, reliable, etc for the users. Use ultrathink. But be pragmatic and don't think of features that will be extremely hard to implement or which aren't necessarily worth the additional complexity burden they would introduce. But I don't want you to just think of 10 ideas: I want you to seriously think hard and come up with one HUNDRED ideas and then only tell me your 10 VERY BEST and most brilliant, clever, and radically innovative and powerful ideas.
```

---

## Step 7: Create Beads

Transform the synthesized plan into granular beads using `bd create`.

Consider beads for:
- **DREAM tooling** - `bd dream` command, template integration
- **LIVE tooling** - `bd live` command, auto-observation capture
- **ADAPT tooling** - `bd adapt` command, loop-closing automation
- **Workflow docs** - Updated AGENTS.md, new guides
- **Templates** - Refined MUSE templates for flywheel context
- **Integration** - Agent Mail + MUSE coordination

Each bead should be:
- Self-contained and actionable
- Have clear acceptance criteria
- Include dependencies if needed (`bd dep add`)

---

## Deliverables

1. **docs/MUSE_FLYWHEEL_METHODOLOGY.md** - The synthesized plan for MUSE as flywheel's dev/design methodology
2. **Child beads** - Implementation tasks covering DREAM, LIVE, and ADAPT integration
3. **Close this epic** when beads are ready for agents to claim

---

## Success Criteria

After this ideation, agents should have a clear methodology for:
- Starting any feature with a DREAM doc
- Capturing observations in LIVE docs during implementation
- Using ADAPT to interpret and evolve the system
- Looping continuously: DREAM → LIVE → ADAPT → DREAM...

---

## References

- https://agent-flywheel.com/workflow
- MUSE-DOCS/*.md
- AGENTS.md
- .github/AGENT_FLYWHEEL_INTEGRATION.md
