# Features Research: Developer Tutorial Content Patterns

**Research Date:** 2026-01-31
**Research Question:** What content/features do developer tutorial sites for niche programming languages typically have? What's table stakes for a "getting started" course vs. differentiating?

## Research Sources

**Major language tutorials analyzed:**
- **Rust Book** (doc.rust-lang.org/book) — 21 chapters, gold standard for comprehensive language tutorial. Covers getting started, guessing game project, common concepts, ownership, structs, enums, modules, collections, error handling, generics, testing, I/O project, closures/iterators, tooling, concurrency, async, OOP, patterns, advanced features, final project.
- **Kotlin Tour** (kotlinlang.org) — Beginner (7 chapters: variables, basic types, collections, control flow, functions, classes, null safety) + Intermediate (9 chapters: extension functions, scope functions, lambdas, classes/interfaces, objects, special classes, properties, null safety, libraries/APIs). Theory + practice + solutions per chapter.
- **Go Tour + Docs** (go.dev) — Getting started (install, hello world, modules, REST API, generics, fuzzing, web apps), Effective Go, database access series (7 pages), module development series (6 pages), codewalks, blog articles by topic.
- **C# Tour** (learn.microsoft.com) — Learn to program, Fundamentals (type system, OOP, functional techniques, exceptions, coding style), tutorials (classes, pattern matching, LINQ), "what's new" per version, transition guides for Java/JavaScript/Python developers, advanced concepts (reflection, interop, performance).
- **Go Create a Module series** — 7-part progressive tutorial: create module, call code, return/handle error, random greeting (slices), multiple greetings (maps), add test, compile/install.

**Niche/legacy language patterns observed (COBOL, Fortran, RPG, ABAP):**
- Heavy emphasis on "reading existing code" since nobody writes greenfield
- Explicit generation/version mapping (COBOL-85 vs COBOL-2014, RPG III vs RPG IV vs RPG Free)
- "Rosetta Stone" translation tables from modern languages
- Debugging with platform-specific tools gets dedicated chapters
- Error handling is always early (not optional/advanced) because legacy code is full of error paths

## Feature Categories

### Table Stakes (Must Have or Learners Leave)

These are features that every competent language tutorial provides. Missing any of these signals an incomplete or abandoned tutorial. Developers who encounter gaps here will seek alternative resources or give up.

---

#### TS-1: Environment Setup That Actually Works
**What it is:** Step-by-step instructions to go from zero to "code compiles and runs" including IDE, runtime, and first project creation.
**Why table stakes:** Every tutorial (Rust, Go, Kotlin, Swift, C#) starts here. If setup fails, nothing else matters.
**Complexity:** Low (content exists, needs verification and updating)
**Current state:** Partially exists in Getting Started (video-based, links to basis.com setup page). Needs text fallback and verification of current steps.
**Dependencies:** None (first thing in any tutorial)
**Evidence:** Rust Ch.1, Go "Getting Started", Kotlin "Install Kotlin", C# "Get started"

#### TS-2: Hello World to First Meaningful Program
**What it is:** Progressive sequence from trivial output program to something with user interaction (GUI or web), teaching syntax incrementally along the way.
**Why table stakes:** The Rust Book's "Guessing Game" (Ch.2), Go's "Create a Module" series, Kotlin Tour's practice exercises all follow this pattern. Learners need early wins.
**Complexity:** Low (largely exists)
**Current state:** Exists in Getting Started (MSGBOX hello world -> windowed hello world -> calculator). This is solid.
**Dependencies:** TS-1
**Evidence:** Rust Ch.2 (guessing game), Go module tutorial (7-part series)

#### TS-3: Error Handling Chapter
**What it is:** Dedicated chapter covering BBj's error handling mechanisms: SETERR, THROW, TRY/CATCH (if available), ON ERR, error codes, and the object-oriented error handling model.
**Why table stakes:** Rust dedicates all of Ch.9 to error handling. Go integrates error returns from tutorial step 3 onward. C# covers exceptions in Fundamentals. Every production codebase is full of error handling. BBj's model (SETERR + labels, error codes, THROW) is unusual enough to need explicit teaching.
**Complexity:** Medium (original content needed; must cover both legacy label-based patterns and modern OO approach)
**Current state:** Missing as dedicated chapter. File I/O section has a brief error handling subsection. Getting Started quick reference mentions SETERR/THROW in one line.
**Dependencies:** TS-2 (needs basic syntax first)
**Evidence:** Rust Ch.9, Go tutorial step 3, C# "Exceptions" in fundamentals, every COBOL tutorial covers error handling early

#### TS-4: String and Numeric Functions Reference
**What it is:** Practical reference for daily-use string manipulation (LEN, MID, POS, CVS, STR, NUM, MASK) and numeric functions with examples.
**Why table stakes:** Every language tutorial covers basic data manipulation. Go covers slices/strings early. Kotlin Tour has "basic types" as chapter 2. Developers cannot write real programs without knowing how to work with strings and numbers.
**Complexity:** Low-Medium (BBj string functions are well-documented externally, but need curated "what you'll use daily" guide with examples, not a reference dump)
**Current state:** Missing. Getting Started mentions string functions exist in one table row. No examples, no practice.
**Dependencies:** TS-2
**Evidence:** Kotlin Tour Ch.2 (basic types), Rust Ch.8 (strings in collections), Go blog "Go Slices" article

#### TS-5: Collections Chapter
**What it is:** Working with BBjVector, BBjHashMap, Java collections from BBj, iterating collections, common patterns.
**Why table stakes:** Rust dedicates Ch.8 entirely to collections (vectors, strings, hash maps). Kotlin Tour Ch.3 is "Collections". Go covers slices and maps in tutorial steps 4-5. You cannot write real programs without collections.
**Complexity:** Medium (must cover BBj-native collections AND Java collections interop, which is a BBj differentiator)
**Current state:** Missing as chapter. Getting Started mentions BBjVector in one table row.
**Dependencies:** TS-2, benefits from TS-7 (Java interop makes collections richer)
**Evidence:** Rust Ch.8, Kotlin Tour Ch.3, Go tutorial steps 4-5

#### TS-6: Event Handling Chapter
**What it is:** Systematic coverage of BBj's event/callback model: setCallback, event objects, common event types (ON_CLOSE, ON_BUTTON_PUSH, ON_EDIT_MODIFY, ON_POPUP_ITEM_SELECT), the process_events loop.
**Why table stakes:** BBj is fundamentally event-driven for GUI/web apps. The calculator example introduces callbacks but doesn't explain the model. Every GUI/web language tutorial covers event handling as a core concept.
**Complexity:** Medium (original content needed; must explain the callback model clearly for developers used to listener/observer patterns)
**Current state:** Calculator example in Getting Started uses callbacks but doesn't teach the event model. No dedicated coverage.
**Dependencies:** TS-2 (needs basic GUI knowledge from hello world)
**Evidence:** Every GUI framework tutorial (Swift UI, Android/Kotlin, C# WinForms) has dedicated event handling content

#### TS-7: Database/SQL Access Chapter
**What it is:** Using SQLOPEN/SQLPREP/SQLEXEC, BBjRecordSet, the Data Dictionary, connecting to external databases. The modern alternative to raw file I/O.
**Why table stakes:** Go has an entire 7-page database access series. C# covers LINQ and data access. BBj's SQL capabilities through the Data Dictionary are the modern recommended approach, and the File I/O chapter explicitly says "use SQL for new development." Without this chapter, the tutorial teaches only the legacy path.
**Complexity:** Medium-High (requires explaining Data Dictionary setup, SQL verbs, BBjRecordSet, potentially external DB connectivity)
**Dependencies:** TS-3 (error handling needed for database operations), TS-5 (collections for result sets)
**Evidence:** Go database access series (7 pages), C# LINQ tutorials, PROJECT.md lists this as active requirement

#### TS-8: Exercises and Practice Problems
**What it is:** Hands-on exercises at the end of each chapter with clear objectives. Not just "play with it" but structured problems with expected outcomes.
**Why table stakes:** Kotlin Tour has practice + solutions for every chapter. Rust Book has exercises throughout. Go codewalks provide guided practice. The current tutorial's exercises are vague ("Can you enhance it?", "Play with the syntax").
**Complexity:** Medium (needs design for each chapter, but builds on existing content)
**Current state:** Weak. Getting Started has one vague exercise. File I/O has three decent exercises. Other sections have none or "play with it" suggestions.
**Dependencies:** All content chapters (exercises are per-chapter)
**Evidence:** Kotlin Tour (practice+solutions every chapter), Rust Book (exercises throughout)

#### TS-9: Object-Oriented Programming (Expanded)
**What it is:** Expanded OOP chapter covering classes, inheritance, interfaces, constructors, field access (#), static methods, and practical patterns. Not just syntax reference but working examples.
**Why table stakes:** Rust dedicates Ch.5 (structs), Ch.6 (enums), Ch.18 (OOP features). Kotlin Tour intermediate has 5 chapters on OOP concepts. The current 113-line syntax reference is too thin for a core concept.
**Complexity:** Medium (structure exists, needs substantial expansion with working examples and exercises)
**Current state:** Exists but thin (113 lines). Syntax reference + videos but no practice, no patterns, no real examples beyond toy dialog.
**Dependencies:** TS-2
**Evidence:** Rust Ch.5+6+18, Kotlin Tour intermediate OOP chapters, C# "Object-oriented C#" tutorial

#### TS-10: Sidebar Navigation and Reading Order
**What it is:** Clear, numbered chapter navigation that gives learners a sense of progress and completeness. Prev/next links between chapters.
**Why table stakes:** Every tutorial (Rust Book, Kotlin Tour, Go tutorial series, C# learning paths) has clear navigation and progression. Current sidebar is flat and unstructured.
**Complexity:** Low (Docusaurus supports this natively; mostly a configuration task)
**Current state:** Flat sidebar with 5 items. PROJECT.md calls for numbered chapter directories (01-, 02-, etc.).
**Dependencies:** Finalized chapter list (all content decisions)
**Evidence:** Universal across all tutorials studied

---

### Differentiators (Competitive Advantage)

These features would make the BBj tutorial stand out from typical language tutorials. They address the unique BBj context (legacy code, 4 generations, niche ecosystem) in ways no generic tutorial template covers.

---

#### D-1: "Reading Legacy Code" Integrated Sidebars
**What it is:** In each relevant chapter, a collapsible sidebar/admonition that shows the legacy equivalent of the modern pattern being taught. Example: in the event handling chapter, show how the same thing was done with GOSUB and line numbers in procedural BBj.
**Why differentiating:** No mainstream language tutorial does this because mainstream languages don't have 4 coexisting generations. COBOL modernization courses do this, but they're expensive enterprise training. This is the killer feature for BBj's reality: every new developer's first task involves reading old code.
**Complexity:** Medium per chapter (requires knowledge of legacy patterns for each topic; can be added incrementally)
**Current state:** File I/O chapter does this implicitly. Not formalized as a pattern.
**Dependencies:** Each content chapter (added as enhancement to existing content)
**Evidence:** COBOL modernization training, ABAP learning materials, RPG modernization guides all do version mapping

#### D-2: Java Interop Chapter
**What it is:** Dedicated chapter on calling Java from BBj, using Java libraries, BBj classes extending Java classes/interfaces, Java collection interop, importing Java types.
**Why differentiating:** This is BBj's strongest technical differentiator. No other BASIC variant can seamlessly use the entire Java ecosystem. Rust has its FFI chapter (Ch.20), C# has native interoperability. For BBj, Java interop is not advanced -- it's a daily necessity.
**Complexity:** Medium-High (requires showing practical use cases: using Java collections, calling Java libraries, extending Java interfaces)
**Current state:** Mentioned in Getting Started quick reference and OOP "random hints." No dedicated chapter.
**Dependencies:** TS-9 (OOP chapter, since interop involves classes/interfaces), TS-5 (collections chapter covers Java collections)
**Evidence:** PROJECT.md lists as active requirement. Rust FFI (Ch.20), C# native interop section

#### D-3: Generation/Era Mapping Guide
**What it is:** Visual reference (table or diagram) showing BBj's 4 generations side-by-side: character UI (mnemonics, PRINT @()), Visual PRO/5 (WINDOW CREATE), BBj GUI (Swing-based, BBjAPI), DWC (web client). For each generation: when it was common, what it looks like in code, and what modern equivalent to use.
**Why differentiating:** Unique to BBj's situation. No mainstream language tutorial needs this. Closest analogy is Python 2 vs 3 migration guides, but BBj has 4 generations, not 2.
**Complexity:** Medium (requires deep BBj historical knowledge; high-value for compact size)
**Current state:** Not present. PROJECT.md mentions "Reading Legacy Code sections where relevant."
**Dependencies:** None (reference material, can stand alone)
**Evidence:** Python 2->3 guides, COBOL generation mappings, ABAP classic vs OO ABAP guides

#### D-4: Debugging and Troubleshooting Chapter
**What it is:** BBj-specific debugging: using the BBj IDE debugger, reading BEM (error message system), common error codes and what they mean, PRINT-based debugging, using the BBj console.
**Why differentiating:** Go has dedicated debugging tools documentation. Rust has Appendix D (development tools). BBj's debugging tools are non-obvious and IDE-specific. Common BBj error codes (0, 2, 11, 18, etc.) are cryptic without a guide.
**Complexity:** Medium (original content, requires BBj IDE screenshots/walkthroughs)
**Current state:** Missing. File I/O has a brief error code table. No debugging content.
**Dependencies:** TS-3 (error handling chapter provides foundation)
**Evidence:** Rust Appendix D, Go "Debugging Go Code with GDB", PROJECT.md lists as active requirement

#### D-5: Translation Tables for Java/.NET/Python Developers
**What it is:** Expanded quick-reference tables mapping familiar concepts from Java, .NET, and Python to BBj equivalents. Broader than the current Getting Started table -- covering error handling, collections, file I/O, OOP, events, not just terminology.
**Why differentiating:** C# docs have explicit transition guides for Java, JavaScript, and Python developers. For a niche language, this "Rosetta Stone" approach dramatically reduces time-to-productivity. The current tables are good but narrow.
**Complexity:** Low-Medium (extends existing pattern in Getting Started and File I/O)
**Current state:** Partially exists. Getting Started has a terminology table. File I/O has a Java/.NET mapping table. Pattern established but not comprehensive.
**Dependencies:** Content chapters (translation tables should reference specific chapter content)
**Evidence:** C# transition guides (Java, JavaScript, Python), Kotlin "comparison" pages

#### D-6: "Day One Tasks" Oriented Structure
**What it is:** Organizing advanced chapters around real tasks a new BBj developer faces on day one: "Read and understand an existing program," "Fix a bug in a legacy form," "Add a field to an existing data entry screen," "Run an existing program in DWC."
**Why differentiating:** Most tutorials teach the language bottom-up (syntax -> types -> functions -> OOP). For BBj, where nobody starts greenfield, a task-oriented structure after fundamentals is more useful. This is what enterprise onboarding courses (SAP, Salesforce) do.
**Complexity:** High (requires careful design; tasks must be realistic without depending on specific codebases)
**Current state:** Not present. Tutorial is currently bottom-up.
**Dependencies:** Most content chapters (tasks synthesize multiple concepts)
**Evidence:** SAP/ABAP onboarding courses, Salesforce Trailhead task-based modules

#### D-7: Runnable Code Examples (Playground or Copy-Paste Ready)
**What it is:** Every code example is designed to be directly copy-pasted into the BBj IDE and run. No fragments that require additional setup. Ideally, a downloadable sample project per chapter.
**Why differentiating:** Kotlin Tour is fully browser-runnable. Rust Book examples are all compilable. Go Tour runs in-browser. BBj cannot be run in-browser, but every example should be self-contained and runnable in the IDE.
**Complexity:** Medium (auditing and fixing all existing examples + creating new ones for new chapters)
**Current state:** Some examples are runnable (calculator), some are fragments. PROJECT.md calls for "Sample code directory organized by chapter."
**Dependencies:** Each content chapter
**Evidence:** Kotlin Tour (browser-runnable), Rust Book (all examples compile), Go Tour (in-browser)

---

### Anti-Features (Things to Deliberately NOT Build)

These are features that might seem useful but would actively harm the tutorial's effectiveness, violate the meta-course philosophy, or waste effort on low-value content.

---

#### AF-1: Comprehensive API Reference
**What it is:** Documenting every BBj verb, function, object, method, and property.
**Why NOT:** This is what documentation.basis.cloud exists for. Duplicating it creates maintenance burden and staleness. The meta-course philosophy is to link to official docs, not replace them. Rust Book links to std docs, Go links to pkg.go.dev.
**Risk if built:** Content goes stale as BBj versions change. Becomes a second source of truth that conflicts with official docs.
**Instead:** Link to specific official doc pages with context about when/why to use each feature.

#### AF-2: Teaching Basic Programming Concepts
**What it is:** Explaining what loops are, what OOP means in theory, how conditionals work, what a variable is.
**Why NOT:** The audience is experienced developers. The Introduction explicitly states this. Kotlin Tour and Go Tour assume programming knowledge. Teaching basics insults the audience and wastes their time.
**Risk if built:** Experienced developers see "What is a loop?" and leave, thinking the course has nothing for them.
**Instead:** Use translation tables (D-5) to map familiar concepts to BBj syntax. Assume knowledge, teach syntax.

#### AF-3: Character UI Programming Tutorial
**What it is:** Teaching how to write character-mode applications with PRINT @(), mnemonics, and terminal control.
**Why NOT:** Nobody should learn to write new character UI programs. This is legacy context only. Teaching it as a learning path wastes time and teaches the wrong patterns.
**Risk if built:** Developers learn the legacy way first and default to it. Actively harmful.
**Instead:** Show character UI in "Reading Legacy Code" sidebars (D-1) so developers can read existing code without writing new code this way.

#### AF-4: Visual PRO/5 as a Learning Path
**What it is:** Teaching WINDOW CREATE and other Visual PRO/5 patterns as development skills.
**Why NOT:** Same as AF-3. Visual PRO/5 is legacy. Teach modern BBj GUI (BBjAPI) as the default. Show PRO/5 only as legacy reading context.
**Risk if built:** Developers learn deprecated patterns.
**Instead:** Legacy code sidebars (D-1).

#### AF-5: In-Browser Code Playground
**What it is:** Building a web-based BBj interpreter/runner so learners can try code without installing BBj.
**Why NOT:** BBj is a commercial runtime that requires a license. Building a web playground would require significant server infrastructure, licensing arrangements, and ongoing maintenance. The ROI is terrible for a niche audience.
**Risk if built:** Massive engineering effort, ongoing hosting costs, potential licensing issues, and it would still be inferior to the real IDE experience.
**Instead:** Ensure all examples are copy-paste ready for the BBj IDE (D-7). Provide a downloadable sample project per chapter.

#### AF-6: Video-Only Content
**What it is:** Relying primarily on video tutorials without text equivalents.
**Why NOT:** Current tutorial is already too video-dependent (CONCERNS.md documents this risk). Videos are not searchable, not scannable, not copy-pasteable, and break when YouTube changes. Experienced developers prefer reading and code examples over watching videos.
**Risk if built:** Videos go offline, content becomes unsearchable, developers skip content because they don't want to watch 10-minute videos for a 30-second answer.
**Instead:** Text-first with code examples. Videos as supplementary, never sole content. Always provide text fallback for critical concepts.

#### AF-7: Comprehensive DWC/Web Development Content
**What it is:** Deep coverage of CSS, responsive design, DWC components, theming, and web-specific features.
**Why NOT:** A separate DWC Course already exists at basishub.github.io/DWC-Course/. Duplicating it violates the scope boundary. The current brief handoff in the web-development section is the correct approach.
**Risk if built:** Two competing tutorials covering the same web content, maintained by potentially different people, going out of sync.
**Instead:** Keep the current pattern: brief introduction + deployment steps + clear handoff link to DWC Course.

#### AF-8: Multi-Language Translations
**What it is:** Translating the tutorial into German, Spanish, Japanese, etc.
**Why NOT:** The audience is small and overwhelmingly English-speaking (BBj is used primarily by English-speaking organizations). Translation effort would be enormous relative to reach. Docusaurus i18n is configured for English-only.
**Risk if built:** Translations go stale. Maintenance burden doubles per language. Small audience fragments further.
**Instead:** Keep English-only. If demand emerges, evaluate per-language.

---

## Feature Dependencies Map

```
TS-1 (Setup)
  └── TS-2 (Hello World to First Program)
        ├── TS-3 (Error Handling)
        │     ├── TS-7 (Database/SQL) ← also needs TS-5
        │     └── D-4 (Debugging)
        ├── TS-4 (String/Numeric Functions)
        ├── TS-5 (Collections) ← benefits from D-2
        │     └── TS-7 (Database/SQL)
        ├── TS-6 (Event Handling)
        ├── TS-9 (OOP Expanded)
        │     └── D-2 (Java Interop)
        └── TS-8 (Exercises) ← depends on all chapters

D-1 (Legacy Code Sidebars) ← added to each chapter independently
D-3 (Generation Mapping) ← standalone reference
D-5 (Translation Tables) ← extends existing pattern per chapter
D-6 (Day One Tasks) ← depends on most content chapters
D-7 (Runnable Examples) ← per chapter, independent

TS-10 (Navigation) ← depends on finalized chapter list
```

## Recommended Priority Order

**Phase 1 — Complete the Red Thread (table stakes)**
1. TS-3: Error Handling (universal need, unblocks database chapter)
2. TS-4: String/Numeric Functions (daily-use, quick to write)
3. TS-5: Collections (fundamental, enables database chapter)
4. TS-6: Event Handling (core to all BBj GUI/web development)
5. TS-9: OOP Expanded (existing chapter is too thin)
6. TS-7: Database/SQL (modern path, completes File I/O alternative)
7. TS-8: Exercises (added to each chapter as it's written/expanded)
8. TS-10: Navigation restructure (after all chapters finalized)

**Phase 2 — Differentiate (competitive advantage)**
1. D-1: Legacy Code Sidebars (highest unique value)
2. D-2: Java Interop (BBj's killer feature)
3. D-5: Translation Tables (low effort, high value for audience)
4. D-3: Generation Mapping Guide (compact, high reference value)
5. D-4: Debugging Chapter (practical necessity)
6. D-7: Runnable Examples (quality-of-life improvement)
7. D-6: Day One Tasks (high value but high complexity, do last)

## Cross-Reference: Current State vs. Target

| Feature | Current State | Gap Size | Priority |
|---------|--------------|----------|----------|
| TS-1 Setup | Exists (video-dependent) | Small | Improve |
| TS-2 Hello World | Exists (solid) | None | Maintain |
| TS-3 Error Handling | Missing | Large | Phase 1 |
| TS-4 String/Numeric | Missing | Large | Phase 1 |
| TS-5 Collections | Missing | Large | Phase 1 |
| TS-6 Event Handling | Fragments only | Large | Phase 1 |
| TS-7 Database/SQL | Missing | Large | Phase 1 |
| TS-8 Exercises | Weak/vague | Medium | Phase 1 |
| TS-9 OOP Expanded | Exists (thin) | Medium | Phase 1 |
| TS-10 Navigation | Flat/unstructured | Medium | Phase 1 |
| D-1 Legacy Sidebars | Not formalized | Large | Phase 2 |
| D-2 Java Interop | Mentioned only | Large | Phase 2 |
| D-3 Generation Map | Not present | Medium | Phase 2 |
| D-4 Debugging | Not present | Large | Phase 2 |
| D-5 Translation Tables | Partially exists | Small | Phase 2 |
| D-6 Day One Tasks | Not present | Large | Phase 2 |
| D-7 Runnable Examples | Partial | Medium | Phase 2 |

---

*Research completed: 2026-01-31*
*Sources: Rust Book, Kotlin Tour, Go Docs/Tour, C# Tour, COBOL/ABAP/RPG modernization patterns*
