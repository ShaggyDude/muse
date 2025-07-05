## Tree of Life: A Virtuous Cycle of Adaptive Product Development

Products discover what users want through evolutionary feedback rather than upfront prediction. Specifications self-validate and self-heal based on real user behavior.

This document outlines a system where every stage of development informs the next, creating a continuous feedback loop of quality and speed.

### Data Evolution Strategy: Clean Slate vs. Legacy Reality

The "Real Data Over Mock Data" principle requires different approaches depending on your starting point. We recommend developing **two parallel test projects** to validate the Tree of Life methodology:

**Project 1: Clean New Development**
- Start with pristine data definitions
- Focus purely on the development flow and BDD validation
- Establish baseline performance and process metrics
- Validate the core methodology without data complexity

**Project 2: Legacy Data Integration**
- Real-world messy data scenarios
- Test data evolution and cleanup processes
- Validate graceful degradation patterns
- Prove the methodology scales to existing systems
- Add GraphQL layer as a federation layer for highly fragmented data source Not included by default in the project

### Hybrid Data Evolution Approach

**Pre-Development Data Audit (New Level -0.5)**
- **AI-Powered Data Discovery:** Use tools like Numerous.ai or IBM InfoSphere to analyze existing data patterns, identify quality issues, and suggest standardization approaches
- **Data Quality Baseline:** Establish metrics for what "clean enough" means for each user journey
- **Migration Strategy:** Define how legacy data will evolve toward cleaner contracts over time

**Schema-First with Reality Contracts**
- **Legacy Projects - DB-First Approach:** Use `prisma db pull` or AI-powered database analysis to generate initial Prisma schema from existing tables. The generated schema becomes your "current state" baseline, then evolve iteratively toward cleaner contracts as you build new features.
- **New Projects - Schema-First Approach:** AI and humans collaborate to design ideal data models upfront, starting with proper relationships, constraints, and naming conventions.
- **Prisma Schema as Semantic Bridge:** Whether generated from legacy DB or designed from scratch, the Prisma schema serves as the data contract that both BDD specs and components reference:
```prisma
// Define the `User` table in the database
model User {
  id       String  @id @default(cuid())
  email    String  @unique
  password String
  name     String?
  posts    Post[]
}

// Define the `Post` table in the database
model Post {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  title     String
  content   String?
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
}
```
- **Graceful Degradation Patterns:** Components expect clean data but handle messy reality through:
  - Default values for missing fields
  - Validation with user-friendly error states  
  - Progressive data enhancement over time
- **Migration Strategy:** Prisma migrations provide the evolutionary path from legacy structures toward cleaner data contracts, with each iteration informed by real usage patterns.

- **GraphQL and Prisma: A Powerful Combination:** For Project 2, where data sources may be fragmented, GraphQL serves as the ideal API gateway. Prisma remains the data access layer within that architecture.
  - **Distinct Roles:** GraphQL defines *what* data clients can request. Prisma implements *how* that data is fetched from the database inside GraphQL resolvers.
  - **Type-Safe Resolvers:** This combination provides end-to-end type safety. The Prisma schema informs the resolvers, and the GraphQL schema can be used to generate types for the client.
  - **Efficient by Default:** Prisma's query engine batches and optimizes data fetching, naturally solving the N+1 query problem common in GraphQL APIs.
  ```typescript
  // Example of a GraphQL resolver using Prisma Client
  const resolvers = {
    Query: {
      // The resolver uses Prisma to efficiently fetch posts and their authors.
      posts: async (_parent, _args, context) => {
        return context.prisma.post.findMany({
          include: {
            author: true, // Prisma handles the join efficiently.
          },
        });
      },
    },
  };
  ```

**Runtime Data Quality Monitoring**
- **Level 5 Enhancement:** Add data quality metrics alongside performance monitoring
- **Evolutionary Feedback:** Data issues inform BDD spec refinements and component resilience improvements
- **Continuous Cleanup:** AI-assisted background processes gradually improve data quality based on usage patterns, with human oversight for significant changes

**BDD Specs for Data Scenarios**
```gherkin
Scenario: User profile with legacy data inconsistencies
  Given a user imported from legacy system
  And their data contains formatting inconsistencies
  When they complete their profile
  Then the system should gracefully handle missing fields
  And progressively enhance data quality
```

This dual-project approach ensures the methodology works both in ideal conditions and real-world complexity, with data quality as an evolving feature rather than a prerequisite.

### The Blueprint: Building the Right Features, Faster & Smarter

-   **Level -1: Communication & Tracking (The "System of Record")**
    -   **Tools: GitHub (Discussions, Issues, Projects, Actions)**.
    -   **Goal:** To create a single, persistent source of truth for all work, from initial idea to final release. This layer connects all other levels, providing context, history, and a transparent view of our progress. It's how we ensure conversations and decisions are never lost.
    -   **Remote-First Principle:** This system is the foundation of our remote-first, asynchronous culture. By making work and conversations visible and traceable in GitHub, we empower team members to stay aligned and productive across any timezone, minimizing the need for synchronous meetings.
    -   **Workflow:**
        -   **Ideation (Level 0) → GitHub Discussions:** Broad ideas, Q&A, and brainstorming live here. A discussion can be converted into an issue once it's ready for specification.
        -   **Specification & Tracking (Levels 1 & 4) → GitHub Issues & Projects:** A BDD `.feature` file gets a corresponding "Epic" issue. This issue is broken down into smaller, actionable task issues. All issues are tracked on a GitHub Project board to visualize our continuous flow.
        -   **Feedback (Level 3) → GitHub Pull Requests:** PRs are the hub for code review. Vercel preview deployment comments appear here, creating a tight feedback loop directly on the code.
        -   **Architectural Decisions → Architecture Decision Records (ADRs):** ADRs are **event-driven, not calendar-driven**. When an architectural decision emerges - during development, retrospectives, or daily work - it's captured immediately:
            1. **Trigger moment**: Team identifies need to decide between approaches
            2. **Quick team discussion** (can be async in GitHub)
            3. **Team member dictates context, decision, and reasoning to AI**
            4. **AI generates the ADR markdown**
            5. **Quick team review** (5-10 minutes max) and commit to repo
            
            This ensures architectural decisions are captured just-in-time when context is fresh, not lost in meeting notes or Slack threads. The AI handles formatting and structure while humans provide the thinking.
    -   **AI-Powered Acceleration:** We will leverage tools like **GitHub Copilot** to streamline issue creation. By using natural language or even screenshots, we can auto-populate issue templates, reducing manual effort and ensuring consistency. This makes tracking work less of a chore and more of a natural part of the development flow.
-   **Level 0: Ideation & Lo-Fi Exploration (The "Napkin Sketch")**
    -   **Artifacts:** Disposable sketches, whiteboard drawings, or token-less Figma wireframes.
    -   **Goal:** To explore user flows and ideas at the lowest possible cost, de-risking our efforts by ensuring we're solving the right problem before writing **any** code. These sketches feed into GitHub Discussions that are promptly reviewed asynchronously for validation as a general direction.
    -   **Human-Centered Design:** Like Brunel's Great Western Railway, we start with the complete end-to-end user experience rather than technical requirements. We envision the user's entire journey before considering implementation details.
    -   **AI-Aided Mini Design Sprints:** Human-curated AI accelerates ideation cycles, turning traditional multi-day design sprints into focused sessions that can rapidly explore multiple user experience approaches and validate concepts within hours rather than weeks.
-   **Level 1: Self-Validating Specifications (Evolutionary BDD)**
    -   **Tools: Playwright & Cucumber**.
    -   **Artifact:** Human-readable `.feature` files that document the most critical user journeys (e.g., onboarding, purchasing).
    -   **Goal:** To create a "living document" that acts as a contract between product, design, and engineering. It defines the _why_ behind a feature and doubles as a high-value, automated end-to-end test that validates our work against the original intent.
    -   **Human-Centered Design:** BDD specs capture complete user journeys and experiences, not technical system requirements. Each feature file tells the story of what users are trying to accomplish, maintaining focus on user value throughout development.
    -   **UX Risk Assessment & Testing Strategy:** Testing intensity scales with UX complexity and novelty:
        -   **Low UX Risk** (standard patterns, familiar conventions): BDD specs + basic interaction tests
        -   **Medium UX Risk** (new combinations of familiar patterns): BDD specs + cross-device testing + user flow validation  
        -   **High UX Risk** (novel interactions, complex workflows, critical conversion paths): BDD specs + A/B testing + session replay analysis + user testing
        -   **Pattern Recognition:** Existing, battle-tested patterns require minimal testing; novel approaches demand comprehensive validation
    -   **Self-Validating:** Well-written BDD specs generate the test scaffolding and happy path scenarios, with manual code added for complex interactions and edge cases.
    -   **Self-Healing:** Real user behavior data informs spec refinements, with AI suggesting updates based on failure patterns and usage analytics for human review and approval.
    -   **Experimental Evolution:** Feature flags enable risky designs to be tested safely, with Git managing the organic evolution of specifications over time. Failed experiments archive gracefully, successful patterns promote to core specs.
-   **Level 2: Direct Development with Real Data**
    -   **Approach: Build components directly in the Next.js application context**.
    -   **Philosophy:** Components are developed where they'll actually be used, with real data flows, real edge cases, and real user interactions.
    -   **Physics of Flow:** Work flows "just in time" from specification to implementation without handoff processes. No mock data creation, no design-to-development translation layer, no integration surprises.
    -   **Dual Track Development:** Design exploration (Level 0) and development (Level 2) operate asynchronously, with each feeding insights to the other at natural intervals rather than forced synchronization points.
    -   **Design System:** Maintained through **design tokens**, **linting rules**, and **component documentation** within the codebase itself, not in isolation.
    -   **Benefits:**
        -   No mock data maintenance overhead
        -   Immediate exposure to real-world edge cases
        -   Components battle-tested in their natural environment
        -   Faster feedback loop without context switching
        -   Design system consistency enforced through tooling, not manual processes
-   **Level 3: The Core Technology Stack & Real-Time Feedback**
    -   **Monorepo: Turborepo** enables shared components, BDD specs, and data contracts across both clean and legacy test projects, with incremental builds and remote caching optimized for Vercel deployments.
    -   **Data Layer: Prisma** provides end-to-end type safety from the database to the client, eliminating an entire class of bugs. Unlike traditional ORMs, Prisma works with plain JavaScript objects and serves as a single source of truth through the declarative Prisma schema.
    -   **Database: Vercel Postgres** provides a fully managed PostgreSQL database optimized for Vercel deployments, with automatic scaling and zero-configuration setup.
    -   **Language: TypeScript** ensures our codebase is robust, scalable, and self-documenting.
    -   **Framework: Next.js** (with the App Router) gives us a world-class foundation for building performant, full-stack applications.
    -   **Styling: Tailwind 4** enables us to build beautiful, custom UIs with maximum speed and maintainability.
    -   **Security:** Automated dependency scanning (Dependabot) and static code analysis (e.g., CodeQL) are integrated into our CI pipeline to catch vulnerabilities before they reach production.
    -   **Platform: Vercel** provides instant preview deployments for every branch, creating a tight feedback loop with real data.
-   **Level 4: The Release & Process Cadence**
    -   **Process:** A light, continuous flow. We prioritize features from our BDD backlog in a weekly rhythm, not rigid two-week sprints.
    -   **Physics of Flow:** Tasks are "pulled" by teams as needed rather than "pushed" by external project managers. Features flow naturally from validated specs to deployment without artificial bottlenecks.
    -   **Web Releases:** Happen continuously via Vercel.
    -   **Native Releases:** Happen on a cadenced schedule (e.g., bi-weekly) by tagging a release, which is automatically built and deployed by a **GitHub Actions** workflow.
    -   **Native Wrappers: Capacitor** to package the finished PWA for iOS and Android. When built mobile-first with proper responsive design and web APIs, native compilation is straightforward - no need to overstate complexity.
    -   **Automated Release Notes:** For every release, a GitHub Action will auto-generate draft release notes by summarizing all merged pull requests since the last tag. These notes are then enhanced by an AI for clarity and user-friendliness, and finally reviewed and approved by a human before publishing.
-   **Level 5: Monitoring, Observability & Impact**
    -   **Tools:** Sentry (for error tracking), LogRocket (for session replay), Vercel Analytics (for performance metrics), Mixpanel (for product analytics).
    -   **Goal:** To close the feedback loop with quantitative data. We move beyond "did we build it right?" (validated by tests) to "did we build the right thing?" (validated by user behavior and system performance). This data directly informs the next cycle of ideation, making our flywheel truly data-driven.
    -   **Workflow:**
        -   **Error Tracking:** All exceptions are automatically captured in Sentry, creating actionable alerts without waiting for user reports.
        -   **Performance Monitoring:** Vercel's analytics provide insights into Core Web Vitals.
        -   **Impact Analysis:** Product analytics track user engagement with new features, measuring success against initial goals and business KPIs.
        -   **Feature Flags:** Mixpanel enables controlled rollouts and A/B testing for risk management.

* * *

### How It Works

The feedback loop:

1.  A [**self-validating BDD feature**](#level-1-self-validating-specifications-evolutionary-bdd) defines user need and auto-generates its validation tests.
2.  [**Components are built directly**](#level-2-direct-development-with-real-data) in the Next.js app with real data and real context.
3.  The [**Next.js app**](#level-3-the-core-technology-stack--real-time-feedback) connects components to the [**Prisma**](#level-3-the-core-technology-stack--real-time-feedback) data layer.
4.  [**Vercel Preview**](#level-3-the-core-technology-stack--real-time-feedback) makes it instantly available for stakeholder feedback with real functionality.
5.  The [**generated Playwright test scaffolding**](#level-1-self-validating-specifications-evolutionary-bdd) validates that the final feature works as specified.
6.  [**Real user data**](#level-5-monitoring-observability--impact) feeds back into spec evolution, creating a self-healing development cycle.

The process is a flywheel where quality and speed build on real-world validation. Minimal but clear specifications lead to battle-tested components that stakeholders can validate in real-time. Through evolutionary BDD, specifications become living contracts that adapt based on actual user behavior.

### Key Philosophy Shifts

-   **Human-Centered Design First:** Like Brunel's Great Western Railway, we start with the complete user experience rather than technical requirements. BDD specs capture user journeys, not system features.
-   **Physics of Flow:** Work flows "just in time" between levels without handoff processes. Real data eliminates the mock → real transition. Vercel previews eliminate the development → staging handoff.
-   **Dual Track Evolution:** Design exploration (Level 0) runs asynchronously from development (Level 2), with each feeding the other at natural intervals rather than forced synchronization points.
-   **Real Data Over Mock Data:** Every component is developed with actual data flows and edge cases from day one.
-   **Flow-Level Validation:** Testing and feedback happen at the user journey level, not the isolated component level.
-   **Context-Native Development:** Components live and breathe in their actual application context, not in artificial isolation.
-   **Immediate Stakeholder Feedback:** Vercel previews provide instant access to working features with real functionality.
-   **Evolutionary Specifications:** BDD specs self-validate through generated test scaffolding and self-heal through data-driven refinements with human approval, with Git managing organic change and feature flags enabling safe experimentation.
-   **Process as a Product:** The "Tree of Life" methodology itself is treated as an internal product. It is subject to the same cycle of feedback and iterative improvement. We hold regular retrospectives to review our workflow, tooling, and principles, using data from Levels 4 and 5 to identify bottlenecks and opportunities for enhancement. Changes to the process are documented and communicated, ensuring the system itself adapts and evolves.
-   **AI-Aided Mini Design Sprints:** Human-curated AI accelerates ideation and validation cycles, turning traditional multi-day design sprints into focused sessions that immediately inform development.
-   **Event-Driven Documentation:** Architectural decisions and process insights are captured just-in-time when context is fresh, using AI assistance for formatting while humans provide the strategic thinking.