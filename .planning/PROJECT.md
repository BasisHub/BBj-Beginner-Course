# BBj Beginner Tutorial

## What This Is

A Docusaurus-based tutorial course that gets developers who know Java, .NET, or similar languages productive in BBj. It provides a coherent "red thread" path through BBj fundamentals — teaching modern patterns as the default while explaining legacy code that new developers will inevitably encounter. It's a meta-course that links to official BBj documentation rather than duplicating it, filling the gaps where no good external resource exists.

## Core Value

A new developer assigned their first BBj task can follow this course start-to-finish and understand both the modern way to write BBj and how to read/navigate the legacy code they'll inherit.

## Requirements

### Validated

- ✓ Docusaurus 3.9.2 site with React 19 — existing
- ✓ GitHub Pages deployment (BasisHub/BBj-Beginner-Course) — existing
- ✓ Introduction section with course orientation — existing
- ✓ Getting Started content (setup, syntax, variables, loops, basic GUI) — existing
- ✓ Object-Oriented BBj syntax reference — existing (thin)
- ✓ File I/O and record-oriented data access tutorial — existing (comprehensive)
- ✓ Web Development section with DWC handoff — existing (brief, intentional)
- ✓ Java/.NET developer quick reference tables — existing
- ✓ Green/teal Infima theme with dark mode — existing
- ✓ CI/CD via GitHub Actions — existing

### Active

- [ ] Match DWC tutorial infrastructure (TypeScript configs, Hero/ChapterCards/HomepageFeatures components, local search, mermaid, ideal-image, zoom plugins)
- [ ] Reorganize content into numbered chapter directories (01-, 02-, etc.) matching DWC tutorial structure
- [ ] Review and fill content gaps for a complete beginner red thread
- [ ] Error handling chapter (SETERR, THROW, ON ERR — universal BBj pattern developers need immediately)
- [ ] String and numeric functions chapter (LEN, MID, POS, STR, NUM — daily-use functions)
- [ ] Database/SQL access chapter (modern alternative to file I/O, BBjRecordSet)
- [ ] Java interop chapter (calling Java from BBj, using Java libraries — key differentiator)
- [ ] Event handling chapter (systematic coverage beyond the calculator example)
- [ ] "Reading Legacy Code" sections where relevant (explain what developers will see in old codebases: character UI mnemonics, Visual PRO/5 WINDOW CREATE, older patterns)
- [ ] Collections chapter (BBjVector, BBjHashMap, Java collections interop)
- [ ] Debugging chapter (BEM, BBj IDE debugging, common error codes)
- [ ] Homepage with Hero component, ChapterCards navigation, and feature highlights
- [ ] Sample code directory organized by chapter (matching DWC tutorial pattern)

### Out of Scope

- DWC/browser-specific topics — covered by the separate DWC Course
- Teaching basic programming concepts (loops, conditionals, OOP theory) — audience already knows these
- Character UI programming as a learning path — legacy context only, not teaching it
- Visual PRO/5 as a learning path — legacy context only
- Comprehensive API reference — that's what the official BBj docs are for
- webforJ (Java-based web framework) — separate ecosystem

## Context

- BBj spans 4 generations (character UI, Visual PRO/5, BBj GUI/Swing, DWC) that all coexist in production code
- Nobody starts greenfield in BBj — every new developer inherits legacy code as their first task
- Generic AI tools (Copilot, ChatGPT) have essentially zero BBj knowledge and actively hallucinate wrong syntax
- The DWC Course (/Users/beff/_workspace/bbj-dwc-tutorial) is the reference implementation for site structure
- Official BBj documentation exists at documentation.basis.cloud but mixes generations without clear boundaries
- The AI strategy project (/Users/beff/_workspace/bbj-ai-strategy) provides broader context on BBj ecosystem challenges
- This course should be the "front door" for developers new to BBj, routing them to specialized resources after fundamentals

## Constraints

- **Tech stack**: Must match DWC tutorial stack — Docusaurus 3.9.2, TypeScript configs, same plugin set (search, mermaid, ideal-image, zoom)
- **Content approach**: Meta-course — link to official docs for depth, write original content only where gaps exist
- **Audience**: Developers with programming experience (Java/.NET/Python level) but no BBj knowledge — no high barriers, but no hand-holding on basic concepts
- **Legacy reality**: Must acknowledge and explain legacy patterns — developers will encounter them on day one
- **Deployment**: GitHub Pages at BasisHub/BBj-Beginner-Course
- **Scope boundary**: BBj fundamentals only — web/DWC topics belong in the DWC Course

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Teach modern BBj, explain legacy as context | Nobody should learn legacy patterns as primary; but everyone encounters legacy code | — Pending |
| Full parity with DWC tutorial infrastructure | Consistent experience across BASIS training materials | — Pending |
| Meta-course with selective original content | Don't duplicate what exists; fill gaps where no good resource exists | — Pending |
| BBj fundamentals only, hand off DWC to separate course | Clear scope boundary prevents overlap and maintains focus | — Pending |
| Numbered chapter directories (01-, 02-, etc.) | Matches DWC tutorial, provides clear reading order | — Pending |

---
*Last updated: 2026-01-31 after initialization*
