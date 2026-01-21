# MUSE Framework

**A living specification language for multi-human + multi-AI software development.**

> "The work was always design. Now it's finally unified."

---

## What Is MUSE?

MUSE is a design-first, evidence-driven development methodology that uses atomic capabilities (`Noun+Capability`) as a universal vocabulary, enabling:

- **Unified design** across product, engineering, ops, security, and business
- **AI-powered implementation** while humans focus on "what if" exploration
- **Continuous evolution** through DREAM → LIVE → ADAPT cycles
- **Push-button library replacement** via behavior-driven contracts

---

## Core Concepts

### The Vocabulary: Atomic Capabilities

All specifications use `Noun+Capability` format:

```
Payment+Authorize      Order+Submit         User+Authenticate
Inventory+Reserve      Email+Send           Cart+Update
```

**Why this works:**
- Stable contracts independent of implementation
- Self-organizing (all `Order+*` capabilities naturally cluster)
- Grep-able for governance (`grep "Payment+" .beads/`)
- No vendor lock-in (capability ≠ implementation)

### The Cycle: DREAM → LIVE → ADAPT

```
DREAM (Specify Intent)
  ↓
Beads created with atomic capabilities
  ↓
LIVE (Observe Reality)
  ↓
ADAPT (Evolve Intent)
  ↓
DREAM updated (or kept unchanged)
  ↓
Loop continues
```

**Once 80% of requirements are clear, code becomes straightforward.**

---

## Documentation

### Core Framework

- **[MUSE-OVERVIEW.md](./MUSE-OVERVIEW.md)** - Philosophy and principles
- **[HowTo-DREAM.md](./HowTo-DREAM.md)** - Intent specification guide
- **[HowTo-LIVE.md](./HowTo-LIVE.md)** - Evidence observation guide
- **[HowTo-ADAPT.md](./HowTo-ADAPT.md)** - Evolution decision guide

### Templates

- **[DREAM-TEMPLATE.md](./DREAM-TEMPLATE.md)** - Intent specification template
- **[LIVE-TEMPLATE.md](./LIVE-TEMPLATE.md)** - Observation ledger template
- **[ADAPT-TEMPLATE.md](./ADAPT-TEMPLATE.md)** - Evolution decision template

### Integrations

- **[Agent Flywheel](./integrations/agent-flywheel/)** - Multi-agent orchestration methodology

---

## Quick Start

### 1. Define Intent (DREAM)

Create a DREAM document specifying what your system should do:

```markdown
## Compressed Intent (Section 0)

- Users can authorize payments in <2s
- Payment authorization is idempotent
- Failed payments provide clear error messages
```

### 2. Observe Reality (LIVE)

Capture evidence during implementation:

```markdown
## Observations

- Payment+Authorize averaged 3.5s under load (expected <2s)
- Users confused by error message "code: 402"
```

### 3. Evolve Design (ADAPT)

Interpret evidence and propose changes:

```markdown
## Proposed Intent Changes

- Update latency requirement to <5s OR implement async processing
- Rewrite error messages in plain English
```

---

## The Impact

### What Changes

**Traditional Org Chart:**
```
Product (5) → Design (3) → Engineering (20) → QA (5) → Ops (3) → Security (2)
= 38 people
```

**MUSE Org Chart:**
```
Specification Architects (5) + Business (2) = 7 people
+ AI handling implementation, operations, security, and testing
```

### The Key Skill

**Reaching "80% known":**
- Articulating clear capability contracts
- Understanding user needs deeply enough to specify behavior
- Thinking in system composition
- Judging if implementations serve intent

**The obsolete skill:**
- Translating specs to code (AI does this faster, cheaper, with better test coverage)

---

## Philosophy

From the [MUSE Manifesto](./MUSE_MANIFESTO.md):

> "Muse stands at the timeless junction of design, architecture, software, and agriculture. From this lineage, it draws principles of clarity, elegance, harmony, ecology, and unity."

**Core principles:**
- People at the center as creative engine, not grunt worker
- Design is executable conversation
- Evidence drives evolution
- Small, reversible, traceable changes
- Code is mostly forgotten (specs are primary)

---

## Use Cases

### Library/Vendor Replacement

```
System has Payment+Authorize spec (BDD contract)
  ↓
Current: Stripe adapter
  ↓
Tomorrow: Swap to PayPal adapter
  ↓
Push button → BDD suite validates
  ↓
Either: ✅ Passes (ship it) or ❌ Fails (fix adapter, not spec)
```

The spec never changes. Only adapters change.

### User-Prompted Features

```
User in app: "I want to schedule delivery for Tuesday"
  → System: "Creating Delivery+Schedule capability"
  → AI generates implementation
  → BDD validates against existing Delivery+* contracts
  → User: "When does it ship?"
  → System: "Live in 10 minutes"
```

---

## Status

**Current:** Experimental (v0.2)
**Used by:** Sage Tech AI internal projects
**License:** Free to use, attribution required

---

## Attribution

Created by **Scott C Romack** with AI collaborators (Claude, Codex, Gemini).

Part of the [Sage Tech AI](https://sage-tech.ai) ecosystem.

---

## Contributing

MUSE is evolving through real-world usage. Feedback, examples, and improvements welcome.

See [integrations/agent-flywheel/](./integrations/agent-flywheel/) for a complete implementation example.
