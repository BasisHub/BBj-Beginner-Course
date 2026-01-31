# Project Research Summary

**Project:** BBj Beginner Tutorial Enhancement
**Domain:** Developer education - Technical documentation site for niche programming language
**Researched:** 2026-01-31
**Confidence:** HIGH

## Executive Summary

The BBj Beginner Tutorial is a Docusaurus 3.x documentation site that teaches an experienced programming audience how to use BBj, a specialized business programming language. The research reveals a clear modernization path: evolve from 5 flat documentation sections into a structured 12-chapter course matching the proven architecture of the sibling DWC Course. The recommended approach is infrastructure-first (TypeScript migration, plugin additions), followed by content restructuring (numbered chapters with sidebar categories), then new content authoring (7 missing chapters covering error handling, collections, database access, debugging, and Java interop).

The core challenge is teaching a language with 4 coexisting syntax generations (character UI, Visual PRO/5, BBj GUI, DWC) to developers who will inherit legacy code on day one. The tutorial must balance teaching modern patterns as primary content while providing "Reading Legacy Code" context, avoid becoming a link farm despite the meta-course philosophy, and prepare learners for BBj's near-zero Google/AI visibility. The sibling DWC Course at `/Users/beff/_workspace/bbj-dwc-tutorial` provides a verified reference implementation for stack, architecture, and UI patterns.

The highest-value differentiator is systematic legacy code reading training—a capability no mainstream language tutorial provides because no mainstream language has 4 active generations. Success depends on modern-first content ordering, explicit generation labeling for every code example, and prioritizing daily-use chapters (error handling, strings, collections, debugging) over conceptually interesting but rare patterns.

## Key Findings

### Recommended Stack

The target stack is proven and running in the sibling DWC tutorial. This is parity alignment, not greenfield selection. Every technology below is verified against resolved node_modules versions from the DWC tutorial confirmed working on 2026-01-31.

**Core technologies:**
- **Docusaurus 3.9.2 with preset-classic** — Current stable release, already in use; pinned version prevents divergence between tutorials
- **React 19.2.3** — Supported by Docusaurus 3.9.2; both projects resolve to this version
- **TypeScript 5.6.3** — Migrate JS config files to TS for type safety and IDE support; matches DWC tutorial
- **@easyops-cn/docusaurus-search-local 0.52.3** — Client-side search with no external dependencies; critical for reference-style access
- **@docusaurus/theme-mermaid 3.9.2** — Enable mermaid diagrams for architecture/flow visualizations
- **@docusaurus/plugin-ideal-image 3.9.2** — Responsive image generation and lazy loading for screenshots
- **docusaurus-plugin-zooming 1.0.0** — Click-to-zoom on images (essential for code screenshots)
- **Prism BBj language** — Built-in BBj grammar exists; add to additionalLanguages config

**Critical decision:** Remove `future.v4` flag from beginner tutorial (DWC tutorial doesn't use it). The two sites must behave identically to prevent subtle routing/MDX incompatibilities.

**Package manager:** npm (not yarn despite CLAUDE.md misleading commands). Both projects use package-lock.json and CI uses `npm ci`.

**Deployment:** GitHub Pages via GitHub Actions from master branch. No infrastructure changes needed.

### Expected Features

Research analyzed 5 major language tutorials (Rust Book, Kotlin Tour, Go Tour/Docs, C# Tour) plus niche/legacy language patterns (COBOL, ABAP, RPG modernization materials).

**Must have (table stakes) — missing any signals incomplete tutorial:**
- TS-3: Error Handling Chapter (SETERR, THROW, ON ERR) — currently missing
- TS-4: String/Numeric Functions Reference (LEN, MID, POS, STR, NUM, MASK) — currently missing
- TS-5: Collections Chapter (BBjVector, BBjHashMap, Java collections interop) — currently missing
- TS-6: Event Handling Chapter (systematic callback/event model coverage) — fragments only
- TS-7: Database/SQL Access Chapter (modern alternative to file I/O) — currently missing
- TS-8: Exercises and Practice Problems (structured, not vague) — currently weak
- TS-9: Object-Oriented Programming Expanded (existing 113 lines too thin) — needs expansion
- TS-10: Sidebar Navigation with Reading Order (numbered chapters, prev/next) — currently flat

**Should have (competitive advantage) — unique to BBj's context:**
- D-1: "Reading Legacy Code" Integrated Sidebars (legacy patterns contextualized in every chapter) — highest unique value
- D-2: Java Interop Chapter (BBj's killer technical differentiator) — currently missing
- D-3: Generation/Era Mapping Guide (4-generation visual reference) — unique to BBj
- D-4: Debugging and Troubleshooting Chapter (BBj IDE, error codes, BEM) — currently missing
- D-5: Translation Tables for Java/.NET/Python Developers (expand existing pattern) — partially exists
- D-7: Runnable Code Examples (every example copy-paste ready) — partially exists

**Anti-features (deliberately NOT build):**
- AF-1: Comprehensive API Reference (duplicates official docs; creates staleness)
- AF-2: Teaching Basic Programming Concepts (audience is experienced developers)
- AF-3/AF-4: Character UI or Visual PRO/5 as learning paths (teach legacy for reading only)
- AF-5: In-Browser Code Playground (massive engineering, licensing issues)
- AF-6: Video-Only Content (unsearchable, breaks when YouTube changes)
- AF-7: Comprehensive DWC Content (separate DWC Course already exists)

### Architecture Approach

The BBj tutorial must evolve from flat structure to 6-layer architecture matching the DWC Course.

**Major components:**

1. **Configuration Layer** (docusaurus.config.ts, sidebars.ts, tsconfig.json, package.json) — TypeScript migration, plugin registration, theme config. Currently JS with JSDoc; target is native TypeScript.

2. **Content Layer** (docs/NN-chapter/*.md) — Numbered chapter directories with autogenerated sidebar items. Currently 5 flat directories; target is 12 chapters organized by section (Foundations, Core Language, Data & Integration, Building Applications).

3. **Navigation Layer** (sidebars.ts with collapsible categories) — Supports both linear reading (prev/next chains) and random access (category grouping, local search). Currently manual flat list; target is 4 collapsible category groups with autogenerated chapter contents.

4. **Presentation Layer** (src/components/Hero, ChapterCards, HomepageFeatures) — Custom React/TSX components for rich homepage. Currently absent (homepage is plain docs page); target is component-assembled landing page.

5. **Styling Layer** (custom.css + CSS modules) — Keep green/teal color palette (visual distinction from blue DWC Course). Add component-scoped styles.

6. **Build & Deploy Layer** (GitHub Actions, npm scripts) — No structural changes needed. Add `typecheck` script.

7. **Sample Code Layer** (samples/NN_Chapter/*.bbj) — Runnable source code organized by chapter. Currently absent; critical for "every example is copy-paste ready."

**Key architectural patterns from DWC Course:**
- Autogenerated sidebar items via `{type: 'autogenerated', dirName: 'NN-chapter'}` — adding new pages requires no sidebar config update
- MDX homepage in docs/ (not src/pages/) keeps it in docs plugin routing with prev/next navigation
- Chapter metadata exists in 3 places intentionally (sidebar config, ChapterCards component, index.md frontmatter) — each serves different rendering context
- Collapsible sidebar categories support reference access while numbered chapters support linear learning

**Build order dependencies:** Configuration (Phase 0) → Content Restructure (Phase 1) → Homepage Components + Sample Code (Phase 2a/2b parallel) → New Content Chapters (Phase 3) → Polish & Sync (Phase 4).

### Critical Pitfalls

Research identified 11 pitfalls specific to niche language tutorials with extensive legacy.

1. **P1: Teaching Legacy as Primary** — Most damaging pattern. Tutorial authors who learned BBj chronologically teach history instead of modern patterns first. The File I/O section (419 lines on record-oriented access, 1 mention of SQL) shows this tension. Prevention: modern patterns get 2x page-time vs legacy; legacy appears only in "What You'll See in Existing Code" callout boxes; no exercises producing legacy code.

2. **P2: Failing to Distinguish 4 Generations** — BBj code from character UI, Visual PRO/5, BBj GUI, and DWC eras all compile but use incompatible syntax. Without explicit generation labels on every code block, learners form incorrect mental models. Prevention: visual generation badges on code blocks; "Generations of BBj" reference page early in course; AI tool unreliability warning (hallucinated syntax).

3. **P5: Code Examples That Don't Compile** — Untested examples referencing non-existent files (CUSTOMER.DAT) or system-specific contexts. Learners can't Google BBj errors. Prevention: samples/ directory with runnable .bbj files; setup/ scripts for data files; document minimum BBj version; resolve syntax highlighting (bbj vs java code fence inconsistency).

4. **P7: Ignoring "Reading Old Code" Use Case** — Every new developer inherits legacy code on day one, yet tutorial teaches as if writing greenfield. Prevention: dedicated "Reading Legacy BBj Code" chapter showing realistic legacy program walkthrough; "Legacy Pattern Glossary" quick reference; position early (after Getting Started) because this is what developers actually need first.

5. **P10: Not Preparing for "BBj is Invisible to Google"** — When BBj developers hit errors, they find nothing or wrong answers for other BASIC dialects. AI tools hallucinate confidently wrong syntax. Prevention: "Getting Help with BBj" section covering official docs navigation, BASIS community, why AI fails, numeric error code reference; write this early to reduce frustration for all subsequent content.

**Phase mapping:** Convention establishment addresses P9 (code style) and P2 (generation badges). Infrastructure setup addresses P5 (samples, syntax highlighting) and P6 (CI link checking). Content planning addresses P1 (modern-first), P7 (legacy reading chapter), P8 (priority by frequency).

## Implications for Roadmap

Based on combined research, suggested 5-phase structure:

### Phase 0: Foundation (Configuration & TypeScript Migration)
**Rationale:** Every other phase depends on working TypeScript config and new plugins. Adding mermaid, search, ideal-image, and zooming simultaneously could introduce conflicts; must verify incrementally before content work begins.

**Delivers:**
- Migrated docusaurus.config.ts and sidebars.ts with native TypeScript types
- tsconfig.json extending @docusaurus/tsconfig
- All 5 new dependencies installed and verified (mermaid, search-local, ideal-image, zooming, typescript)
- Updated package.json with typecheck script
- Verified build succeeds with new configuration
- Remove future.v4 flag for parity with DWC tutorial

**Addresses Stack Recommendations:**
- Configuration Layer complete
- Prism BBj language added to additionalLanguages
- Plugin configuration matching DWC Course verified patterns

**Avoids Pitfalls:**
- P5: Resolve syntax highlighting decision (bbj vs java code fence tags)
- Foundation for P2: Enables mermaid diagrams for generation mapping visuals

**Research Flag:** Standard Docusaurus migration; well-documented patterns; no phase research needed.

---

### Phase 1: Content Restructure (Directory Layout & Navigation)
**Rationale:** Content structure is the skeleton. Homepage components (Phase 2a) need chapter slugs to link to. New content chapters (Phase 3) need the directory convention established. Sidebar navigation defines reading order and category grouping.

**Delivers:**
- 12 numbered chapter directories (01-getting-started through 12-web-deployment)
- Existing content split and moved:
  - getting-started/index.md → 01-getting-started/ with 3-4 sub-pages
  - object-oriented/index.md → 03-object-oriented/ with 3 sub-pages
  - file-io/index.md → 07-file-io/ with 4 sub-pages
  - web-development/index.md → 12-web-deployment/index.md (brief DWC handoff)
- Sidebar.ts with 4 collapsible categories: Foundations, Core Language, Data & Integration, Building Applications
- Autogenerated sidebar items configured for all chapters
- Standalone pages: prerequisites.md, resources.md, samples.md
- All pages have sidebar_position and title frontmatter
- Verified prev/next navigation chains correctly
- Internal link validation (onBrokenLinks: 'throw' catches breaks)

**Addresses Architecture Patterns:**
- Content Layer restructured
- Navigation Layer with category grouping and autogenerated items
- Dual-access pattern (linear via prev/next, random via categories and search)

**Addresses Features:**
- TS-10: Sidebar Navigation with Reading Order

**Avoids Pitfalls:**
- P11: Non-linear learning supported via category grouping and prerequisites
- Foundation for P1: Directory structure ready for modern-first content ordering
- Foundation for P9: Consistent directory naming (NN-kebab-case/)

**Research Flag:** Standard Docusaurus restructure; DWC Course provides reference implementation; no phase research needed.

---

### Phase 2a: Homepage Components (Presentation Layer)
**Rationale:** Parallel with Phase 2b (Sample Code). Requires chapter slugs from Phase 1. Provides professional landing experience instead of dumping users into docs. Homepage components must match DWC Course patterns for consistency.

**Delivers:**
- src/components/Hero/ (index.tsx + styles.module.css)
- src/components/HomepageFeatures/ (index.tsx + styles.module.css)
- src/components/ChapterCards/ (index.tsx + styles.module.css) with 4 sections mirroring sidebar categories
- docs/index.md converted to MDX homepage importing components
- src/css/custom.css updated with external link icon styles
- Green/teal color palette maintained (visual distinction from blue DWC Course)
- Verified homepage renders correctly

**Addresses Architecture Patterns:**
- Presentation Layer complete
- Styling Layer updated
- Homepage assembly pattern from DWC Course

**Avoids Pitfalls:**
- P11: Learning paths on homepage (ChapterCards grouped by use case)
- Visual navigation for reference users

**Research Flag:** Standard React/TSX components; DWC Course provides exact implementation; no phase research needed.

---

### Phase 2b: Sample Code Directory (Runnable Examples)
**Rationale:** Parallel with Phase 2a. Requires chapter numbering from Phase 1. Every code example must be copy-paste ready (D-7). Learners can't Google BBj errors so broken examples are catastrophic (P5).

**Delivers:**
- samples/ directory with chapter-numbered subdirectories (01_GettingStarted/, 03_ObjectOriented/, etc.)
- Extracted inline code examples from existing docs into .bbj files
- setup/ directory with scripts to create required data files (CUSTOMER.DAT)
- samples/README.md and samples/LICENSE
- docs/samples.md index page referencing all sample files
- "Running the Examples" section explaining how to execute .bbj from IDE and CLI
- Document minimum BBj version for all examples

**Addresses Features:**
- D-7: Runnable Code Examples (every example copy-paste ready)

**Avoids Pitfalls:**
- P5: Code examples that don't compile/run
- Provides setup for exercises in all subsequent phases

**Research Flag:** Standard documentation site pattern; low complexity; no phase research needed.

---

### Phase 3: New Content Chapters (7 Missing Table Stakes)
**Rationale:** Phase 1 establishes directory structure; Phase 2a/2b provide homepage and samples. Now write the 7 missing chapters identified in features research. Priority ordered by frequency of use, not conceptual interest (P8).

**Delivers 7 new chapters (priority order):**

**3.1: Chapter 04 - Error Handling** (HIGHEST PRIORITY)
- SETERR, THROW, ON ERR, error codes
- Both legacy label-based patterns and modern OO approach
- Unblocks database chapter (errors are daily reality)
- Addresses TS-3, supports P10 (error codes reference)

**3.2: Chapter 05 - String/Numeric Functions** (DAILY USE)
- LEN, MID, POS, CVS, STR, NUM, MASK with working examples
- Not a reference dump; curated "what you'll use daily" guide
- Addresses TS-4

**3.3: Chapter 06 - Collections** (FUNDAMENTAL)
- BBjVector, BBjHashMap, Java collections interop
- Iterating collections, common patterns
- Enables database chapter (result sets use collections)
- Addresses TS-5

**3.4: Chapter 08 - Database/SQL Access** (MODERN PATH)
- SQLOPEN/SQLPREP/SQLEXEC, BBjRecordSet, Data Dictionary
- Modern alternative to File I/O explicitly called out in current content
- Requires chapters 04 (error handling) and 06 (collections)
- Addresses TS-7

**3.5: Chapter 09 - Java Interop** (BBJ's DIFFERENTIATOR)
- Calling Java from BBj, using Java libraries, extending Java interfaces
- BBj's killer technical feature; no other BASIC variant has this
- Requires chapter 03 (OOP expanded) as foundation
- Addresses D-2

**3.6: Chapter 10 - Event Handling** (SYSTEMATIC)
- setCallback, event objects, common event types, process_events loop
- Systematic coverage beyond calculator example
- Addresses TS-6

**3.7: Chapter 11 - Debugging** (PRACTICAL NECESSITY)
- BBj IDE debugger, BEM, common error codes, PRINT-based debugging
- Reduces frustration most; developers spend most time here
- Addresses D-4

**Chapter Ordering Within Phase:** 04-06 (Core Language) first because they unblock 08. 08 before 09 (Java interop can use DB examples). 10-11 independent.

**Each chapter includes:**
- Chapter index.md with overview and mermaid diagrams
- 2-4 sub-pages with working examples
- "Reading Legacy Code" callout boxes showing legacy equivalents (D-1)
- Generation badges on all code blocks (P2)
- Structured exercises with clear objectives (TS-8)
- Translation tables for Java/.NET developers where relevant (D-5)
- All code examples added to samples/ directory

**Addresses Features:**
- All missing table stakes (TS-3 through TS-7)
- TS-8: Exercises added to all chapters
- TS-9: OOP chapter (03) expanded during this phase
- Key differentiators (D-1, D-2, D-4)

**Avoids Pitfalls:**
- P1: Modern patterns first, legacy in callouts
- P2: Generation badges on every code block
- P3: Original teaching thesis, not link farm
- P7: Legacy reading patterns integrated
- P8: Priority by frequency, not conceptual interest
- P9: Consistent code style per style guide (established Phase 0)

**Research Flag:** Chapter 08 (Database/SQL) likely needs phase research for Data Dictionary setup patterns and external DB connectivity. Chapter 09 (Java Interop) likely needs phase research for JDBC/Java library integration patterns. Remaining chapters (04, 05, 06, 10, 11) are well-documented; skip research.

---

### Phase 4: Differentiation & Polish
**Rationale:** Table stakes complete (Phase 3). Now add unique BBj-specific value and synchronize all components.

**Delivers:**

**4.1: "Reading Legacy BBj Code" Standalone Chapter**
- Dedicated chapter (not just callout boxes) walking through realistic legacy program
- Legacy Pattern Glossary (line numbers, GOSUB/RETURN, SETESC, mnemonics, IOLIST, ENTER/EXIT)
- Position early in navigation (after Getting Started, chapter 02 or standalone)
- Read-and-understand exercise, not write-new-code
- Addresses P7 (day-one reality)

**4.2: "Generations of BBj" Reference Page**
- Visual reference showing 4 generations side-by-side
- When each was common, signature syntax, modern equivalent
- Table or diagram format
- Addresses D-3, supports P2

**4.3: "Getting Help with BBj" Section**
- Official documentation navigation, BASIS community resources
- Why AI assistants fail (near-zero training data), how to use cautiously
- Numeric error codes and how to read them
- Common errors reference expanded from File I/O error table
- Position early (introduction or chapter 01)
- Addresses P10

**4.4: Synchronization & Polish**
- ChapterCards data synchronized with final sidebar structure
- Footer links updated for new chapter routes
- Final link audit (internal and external)
- CI link checking with linkinator or broken-link-checker added
- YouTube embed text fallbacks added
- Code style consistency audit across all sections
- Prerequisites badges added to chapter headers
- Quick Reference page aggregating all cheat sheets

**Addresses Features:**
- D-1: Legacy code sidebars formalized
- D-3: Generation mapping
- D-5: Translation tables expanded

**Avoids Pitfalls:**
- P6: Automated external link checking
- P11: Prerequisites and cross-linking for non-linear access
- P3: Link farm prevention via final audit

**Research Flag:** No phase research needed; all patterns established.

---

### Phase Ordering Rationale

- **Sequential dependencies:** Phase 0 unblocks all others (config must work). Phase 1 unblocks 2a/2b (need chapter structure). Phases 2a/2b unblock Phase 3 (homepage needs slugs, content needs samples). Phase 3 unblocks Phase 4 (polish requires complete content).

- **Parallel opportunities:** Phases 2a and 2b are independent and can run simultaneously. Within Phase 3, chapters 04-06 can be written in parallel by different authors if needed; chapters 10-11 are independent.

- **Pitfall avoidance:** Phase 0 establishes conventions (P9, P2). Phase 1 creates structure preventing P11. Phase 3 content authoring applies P1, P2, P3, P7, P8 from start. Phase 4 addresses remaining differentiation and adds automation for P6.

- **Architecture alignment:** Follows DWC Course verified build order (Configuration → Content → Presentation → New Features → Polish).

### Research Flags

**Needs deeper research during planning:**
- **Phase 3, Chapter 08 (Database/SQL):** Data Dictionary configuration patterns, external DB connectivity (JDBC drivers, connection strings), BBjRecordSet advanced usage. Use `/gsd:research-phase` when planning this chapter.
- **Phase 3, Chapter 09 (Java Interop):** Calling Java libraries from BBj, classpath management, Java collection interop nuances, extending Java interfaces. Use `/gsd:research-phase` when planning this chapter.

**Standard patterns (skip phase research):**
- **Phase 0:** Docusaurus TypeScript migration well-documented
- **Phase 1:** Content restructuring matches DWC Course reference implementation
- **Phase 2a:** React components exact copy from DWC Course
- **Phase 2b:** Sample code directory standard pattern
- **Phase 3, Chapters 04-06, 10-11:** Well-documented BBj patterns; official docs sufficient
- **Phase 4:** Polish and synchronization; no new patterns

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | **HIGH** | Every version verified from DWC tutorial resolved node_modules (2026-01-31). No training data assumptions. Pinned versions prevent divergence. |
| Features | **HIGH** | Analyzed 5 major language tutorials + 4 niche/legacy language patterns. Table stakes vs differentiators clearly categorized. Anti-features explicitly identified. |
| Architecture | **HIGH** | DWC Course provides proven reference implementation. 7-layer component structure verified working. Build order dependencies clear. |
| Pitfalls | **HIGH** | 11 pitfalls sourced from niche language tutorial patterns (COBOL, ABAP, RPG), BBj-specific challenges (4 generations, zero Google visibility), and existing content analysis. Phase mapping complete. |

**Overall confidence:** **HIGH**

### Gaps to Address

**Gap 1: BBj version targeting**
- Current content doesn't specify minimum BBj version for examples
- Some syntax may vary between BBj 18 and BBj 24
- **Resolution:** Document minimum version in Phase 2b (Sample Code setup); test all examples against specified version

**Gap 2: BBj syntax highlighting in Prism**
- STACK.md notes prismjs includes prism-bbj.js component
- Current content uses both `bbj` and `java` code fence tags inconsistently
- **Resolution:** Verify Prism BBj grammar rendering in Phase 0; standardize code fence tags in Phase 1

**Gap 3: External link fragility**
- 40+ links to documentation.basis.cloud; BASIS periodically reorganizes
- YouTube embeds (8+) could go private/deleted
- **Resolution:** Add CI link checking in Phase 4; add text fallbacks for all videos in Phase 1 restructure

**Gap 4: Legacy code example sourcing**
- "Reading Legacy Code" callouts and standalone chapter need realistic legacy examples
- Requires access to actual legacy BBj programs for walkthrough
- **Resolution:** Source examples during Phase 4.1 content authoring; may need BASIS community consultation

**Gap 5: Three-place metadata synchronization**
- ChapterCards component, sidebars.ts, and chapter frontmatter must stay aligned
- No automated enforcement mechanism
- **Resolution:** Explicit sync verification step in Phase 4.4; document update process in CONTRIBUTING.md

## Sources

### Primary (HIGH confidence)
- **DWC Tutorial codebase** (`/Users/beff/_workspace/bbj-dwc-tutorial/`) — Stack verification (all resolved package.json versions), architecture patterns (component structure, sidebar config, homepage assembly), verified working build 2026-01-31
- **Rust Book** (doc.rust-lang.org/book) — 21-chapter structure, error handling (Ch.9), collections (Ch.8), OOP (Ch.5-6,18), exercises pattern
- **Kotlin Tour** (kotlinlang.org) — Beginner/Intermediate structure, practice+solutions per chapter, basic types/collections positioning
- **Go Tour + Docs** (go.dev) — Getting started series, database access 7-page series, codewalks, module development 7-part progressive tutorial
- **C# Tour** (learn.microsoft.com) — Fundamentals structure, transition guides for Java/JavaScript/Python, exception handling positioning

### Secondary (MEDIUM confidence)
- **COBOL modernization training patterns** — Generation mapping, legacy context boxes, "reading existing code" emphasis
- **ABAP learning materials** — Classic vs OO ABAP side-by-side, version migration guides
- **RPG modernization guides** — RPG III vs IV vs Free, explicit generation labeling
- **Docusaurus 3.x official docs** — Plugin configuration, TypeScript migration, autogenerated sidebars, markdown features
- **PROJECT.md and CONCERNS.md** (beginner tutorial planning docs) — Active requirements, identified risks, meta-course philosophy

### Tertiary (LOW confidence)
- **Prism BBj language support** — prismjs/components/prism-bbj.js exists in node_modules; rendering behavior needs Phase 0 verification
- **BASIS community channels** — Mentioned for "Getting Help" section but not directly consulted during research
- **BBj version-specific syntax differences** — Inferred risk from multi-version support; needs validation against actual BBj releases

---

*Research completed: 2026-01-31*
*Ready for roadmap: yes*
