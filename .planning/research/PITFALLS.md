# Pitfalls

**Research Date:** 2026-01-31
**Dimension:** What commonly goes wrong with developer tutorials for niche languages with extensive legacy and multiple syntax generations

---

## P1: Teaching Legacy as Primary Instead of Context

**What goes wrong:** Tutorial authors who know BBj deeply tend to teach the history chronologically — character UI first, then Visual PRO/5, then BBj GUI, then DWC. This mirrors their own learning journey but forces new developers to internalize three obsolete paradigms before reaching the one they should actually use. The existing content already shows this tension: the File I/O section is 419 lines of detailed record-oriented access while the modern SQL/Data Dictionary alternative gets a single mention in the intro paragraph.

**Warning signs:**
- More page-time devoted to legacy patterns than modern equivalents
- Legacy code examples appear before modern ones in any given section
- Learners' first runnable program uses obsolete patterns (e.g., GOSUB/RETURN label-based flow instead of OOP callbacks)
- "Reading Legacy Code" sections become de facto "Learning Legacy Code" sections because they include exercises

**Prevention strategy:**
- Every chapter opens with the modern pattern as the primary teaching path. Legacy appears in clearly marked "What You'll See in Existing Code" callout boxes
- Enforce a content ratio: modern patterns get at least 2x the depth of legacy context
- Legacy examples are read-only (explain what it does, never ask the learner to write new code in legacy style)
- The calculator example in Getting Started already demonstrates this tension — it uses label-based callbacks (`byebye:`, `updateResult:`) alongside object references. Refactored OOP version should appear first

**Phase:** Content reorganization (when restructuring into numbered chapters). Every new chapter written should follow modern-first ordering from the start.

---

## P2: Failing to Distinguish Between 4 Generations in Code Examples

**What goes wrong:** BBj's 4 generations (character UI/mnemonics, Visual PRO/5 WINDOW CREATE, BBj GUI/Swing via BBjAPI, DWC) all produce working code but with radically different syntax. Official BASIS documentation mixes generations without clear labeling. A tutorial that doesn't explicitly tag every code example with its generation creates confusion when learners encounter syntax in official docs that contradicts what they just learned. Worse, AI assistants hallucinate hybrid syntax that blends generations incoherently.

**Warning signs:**
- Code examples use `WINDOW CREATE` (Visual PRO/5 era) alongside `BBjAPI().openSysGui()` (BBj era) without noting the distinction
- Learners ask "which way is correct?" about equivalent operations because the tutorial shows both without generational labels
- Official doc links point to pages that default to pre-BBj syntax, and the tutorial doesn't warn about this
- The AI hallucination problem means learners will paste tutorial code into Copilot and get back a generation-blended mess — tutorial should preemptively address this

**Prevention strategy:**
- Create a visual generation indicator (badge or icon) for every code block: `[BBj Modern]`, `[Legacy: Visual PRO/5]`, `[Legacy: Character UI]`
- Add a "Generations of BBj" reference page early in the course that defines each era and its signature syntax patterns
- In "Reading Legacy Code" boxes, always state which generation the example represents
- Add an explicit warning about AI tool unreliability for BBj (essentially zero training data means hallucinated syntax). This is a unique opportunity — no other tutorial for any mainstream language needs to do this

**Phase:** Content planning (define the badge system before writing new chapters). Should be established as a convention before any new content is authored.

---

## P3: Meta-Course Approach Degenerating into a Link Farm

**What goes wrong:** The meta-course philosophy ("link to docs rather than duplicating") is sound but has a failure mode: sections become collections of links with thin glue text. The current introduction page is essentially "this is a meta-course, here are prerequisites, please contribute." The web-development section is 40 lines that mostly redirect to the DWC Course. When too many sections follow this pattern, learners lose the "red thread" narrative and the tutorial becomes a curated bookmark list rather than a learning path.

**Warning signs:**
- More than 30% of a section's content is links to external resources with no original explanation bridging them
- Sections read as "go watch this video, then read this doc page" without synthesizing what the learner should take away
- The tutorial doesn't provide value beyond what a well-organized bookmark folder would
- External links become the primary content rather than supporting evidence
- Learners frequently leave the tutorial to read external docs and don't come back

**Prevention strategy:**
- Every section must have a "teaching thesis" — the one insight or mental model that doesn't exist in the official docs. For File I/O it's the mindset shift from declarative to imperative data access. For OOP it's the mapping table from Java/.NET concepts
- Apply the "sandwich rule": original context/framing, then link to external resource, then original synthesis/exercise. Never link without both setup and payoff
- The Java/.NET developer quick reference tables are the right model — they synthesize information that exists nowhere in official docs
- Cap external links at 5-7 per section, with each one earning its place by being specifically cited in the surrounding narrative

**Phase:** Content review (audit existing sections) and content authoring (enforce for all new chapters).

---

## P4: Assuming Uniform Starting Points for "Experienced Developers"

**What goes wrong:** "Experienced developer new to BBj" describes a wide range: a Java developer with 15 years of enterprise experience, a .NET developer who has never touched the JVM, a Python developer with no compiled-language background, a COBOL developer moving to BBj from another business language. The tutorial currently targets Java/.NET specifically (the quick reference tables prove this), but sections like File I/O implicitly assume SQL familiarity, while the OOP section assumes Java-style class hierarchies are second nature. A Python developer would stumble on different things than a Java developer.

**Warning signs:**
- Quick reference tables exist only for Java/.NET but the introduction claims to target all "experienced developers"
- Explanations assume familiarity with specific paradigms (strong typing, JVM internals, SQL databases) without checking
- The Java interop chapter (planned) will be meaningless to non-Java developers unless properly framed
- Feedback from learners clusters into "too basic" and "too advanced" simultaneously — a sign of audience mismatch

**Prevention strategy:**
- Explicitly declare the primary audience persona in the introduction: "This course is optimized for developers coming from Java, C#, or similar JVM/.NET languages." This is already implicit — make it explicit
- For planned chapters (Java interop, database/SQL access), add prerequisite callouts: "This section assumes familiarity with JDBC or ADO.NET concepts"
- Keep the quick reference tables as the model — they explicitly bridge from known (Java/.NET) to unknown (BBj), which is more honest than pretending universality
- Consider a brief "Coming from Python/JavaScript?" sidebar in the introduction for dynamic-language developers, since BBj is also dynamic

**Phase:** Introduction rewrite (immediate — update audience declaration) and content authoring (prerequisite callouts for every new chapter).

---

## P5: Code Examples That Don't Compile or Run in Current BBj

**What goes wrong:** BBj's evolution means syntax that worked in BBj 18 may behave differently in BBj 24. The tutorial currently uses `java` as the syntax highlighter for BBj code (Prism has no BBj language support) and has no mechanism to verify that code examples actually run. The File I/O section references files like `CUSTOMER.DAT` that don't exist on the learner's system. The Getting Started calculator uses `BBjAPI().openSysGui("X0")` which requires a specific display context. Untested examples in a niche language are especially dangerous because learners can't easily Google error messages.

**Warning signs:**
- No sample data files or setup scripts accompany code examples
- Code blocks reference files, paths, or system resources that only exist on the author's machine
- No CI step validates that code examples parse correctly (even a syntax check)
- The `bbj` language tag is used in markdown but Prism doesn't support it — syntax highlighting may silently fail or render as plain text
- Exercise sections say "modify the example" but don't provide the base file to modify

**Prevention strategy:**
- Create a `samples/` directory (already planned in PROJECT.md) organized by chapter, with every code example as a runnable `.bbj` file
- Include a `setup/` directory with scripts to create required data files (CUSTOMER.DAT etc.) so learners can actually run examples
- Document the BBj version targeted (minimum version for all examples)
- Resolve the syntax highlighting issue: either register a custom Prism language for BBj or confirm that `bbj` falls back gracefully. The existing code uses both `bbj` and `java` code fence tags inconsistently
- Add a "Running the Examples" section early in the course explaining how to execute `.bbj` files from the IDE and command line

**Phase:** Infrastructure setup (samples directory, syntax highlighting decision) and content authoring (runnable examples for every new chapter).

---

## P6: Broken External Links Silently Degrading the Tutorial

**What goes wrong:** The tutorial contains 40+ links to `documentation.basis.cloud` and other external resources. BASIS periodically reorganizes their documentation structure, breaking URLs without redirects. The current Docusaurus config has `onBrokenLinks: 'throw'` but this only catches internal links — external link rot is invisible until a learner hits a 404. For a meta-course that derives its value from curating external resources, broken links are an existential threat.

**Warning signs:**
- Learners report "page not found" for documentation links but there's no systematic way to catch this before they do
- No CI step checks external link health
- Links to PDF resources (like the Unit Testing PDF) are especially fragile — PDFs get moved or removed without redirects
- YouTube video embeds (8+ iframes) could go private or be deleted at any time
- The CONCERNS.md already flags this but no automated solution exists yet

**Prevention strategy:**
- Add `broken-link-checker` or `linkinator` to CI with a scheduled weekly run (not just on push — external links break independently of code changes)
- For every critical external link, document an alternative path in a comment: `<!-- Fallback: search documentation.basis.cloud for "OPEN verb" -->`
- For YouTube embeds, add a text summary below each video that makes the content accessible even if the video disappears
- Create a link inventory document that maps each external URL to its purpose, making broken link repair faster
- The File I/O section's "Further Reading" links are a model for how links should be structured — specific, labeled, and clearly supplementary

**Phase:** CI/CD setup (automated link checking) and content authoring (text fallbacks for videos, link inventory).

---

## P7: Ignoring the "Reading Old Code" Use Case That Defines Day One

**What goes wrong:** The PROJECT.md states the core reality: "Nobody starts greenfield in BBj; every new developer inherits legacy code." Yet the tutorial structure teaches BBj as if the learner will write fresh code from scratch. The planned "Reading Legacy Code" sections are positioned as optional context boxes rather than as a first-class learning track. A new developer's actual first task is: open a 2000-line BBj program written in 2005, figure out what it does, and fix a bug. The tutorial doesn't prepare them for this.

**Warning signs:**
- No section teaches "how to read a BBj program you didn't write" as a systematic skill
- Legacy patterns are scattered across sections as asides rather than consolidated into a navigable reference
- Common legacy patterns (line numbers, GOTO, GOSUB without OOP, `WINDOW CREATE` syntax, mnemonics like `'CS'` for clear screen) are mentioned but never shown in context of a realistic legacy program
- The tutorial doesn't mention common legacy conventions like programs named with 6-character codes, global variable pollution, or the `ENTER`/`EXIT` calling convention

**Prevention strategy:**
- Add a dedicated "Reading Legacy BBj Code" chapter (not just callout boxes) that walks through a realistic legacy program end-to-end
- Include a "Legacy Pattern Glossary" — a quick-reference table of patterns learners will encounter: line numbers, GOSUB/RETURN, SETESC, SETERR without THROW, mnemonics, IOLIST, ENTER/EXIT
- Position this chapter early (after Getting Started, before deep dives) because this is what developers need on day one
- Make it a read-and-understand exercise, not a write-new-code exercise — the learner annotates and explains legacy code, they don't produce it

**Phase:** Content planning (define chapter scope and position in sidebar) and content authoring (write the legacy reading chapter as a high-priority deliverable).

---

## P8: Over-Documenting Rare Patterns While Under-Documenting Daily Tasks

**What goes wrong:** Tutorial authors for niche languages tend to document what's unique or interesting about the language rather than what developers do every day. The current content has detailed coverage of File I/O record-oriented access (a legacy pattern) but no coverage of error handling (SETERR/THROW — used in every program), string functions (LEN, MID, POS — used constantly), or debugging (the thing new developers spend most of their time doing). The planned chapters in PROJECT.md show awareness of this, but the risk is that "interesting" topics get prioritized over "mundane but essential" ones.

**Warning signs:**
- Developers can complete the tutorial but can't handle their first real error message
- String manipulation, the most common operation in business programming, has no dedicated section
- Debugging (BBj IDE debugging, common error codes, BEM) is absent despite being the #1 time sink for new developers
- Collections (BBjVector, BBjHashMap) are unmentioned despite being used in virtually every non-trivial program
- The error handling section in File I/O covers file-specific errors but there's no general error handling chapter

**Prevention strategy:**
- Prioritize planned chapters by frequency of use, not conceptual interest. Suggested priority order:
  1. Error handling (SETERR, THROW, ON ERR) — needed immediately
  2. String/numeric functions — needed daily
  3. Collections (BBjVector, BBjHashMap) — needed in every non-trivial program
  4. Debugging — reduces frustration most
  5. Database/SQL access — modern alternative to File I/O
  6. Java interop — powerful but less frequent for beginners
  7. Event handling deep dive — builds on existing calculator example
- For each chapter, apply the "would a developer need this in their first week?" test
- Cross-reference planned content against the Java/.NET quick reference table — every row in that table should eventually have a chapter backing it up

**Phase:** Roadmap prioritization (order the planned chapters by impact) and content authoring (write high-frequency chapters first).

---

## P9: Inconsistent Code Style Across Sections Creating False Patterns

**What goes wrong:** The current tutorial uses different coding styles across sections without explanation. Getting Started uses label-based callbacks with lowercase labels (`byebye:`, `updateResult:`). File I/O uses UPPERCASE labels (`EXTRACT_UPDATE:`, `NOT_FOUND:`). OOP uses proper class syntax. A learner trying to form mental models will notice these inconsistencies and either wonder which is "correct" or unconsciously learn the wrong pattern. In a language where AI tools can't help disambiguate, consistent examples are the only reliable teaching tool.

**Warning signs:**
- Label casing varies between sections (`byebye:` vs `NOT_FOUND:`)
- Some examples use `REM` for comments, others use no comments
- Variable naming is inconsistent (`MyString$` vs `custId$` vs `customer_tpl$`)
- Indentation varies (some examples indent subroutine bodies, others don't)
- Code fence language tags alternate between `bbj` and `java` without a clear reason

**Prevention strategy:**
- Establish a BBj coding style guide for tutorial examples and document it in CLAUDE.md or a contributing guide:
  - Labels: UPPERCASE with underscores (`UPDATE_BALANCE:`, `NOT_FOUND:`)
  - Variables: camelCase with type suffix (`custId$`, `totalAmount`, `customerRecord!`)
  - Comments: `REM` for section headers, inline comments on same line for brief notes
  - Indentation: 4 spaces for code inside labels/methods
  - Code fence: `bbj` consistently (resolve the Prism rendering issue separately)
- Retrofit existing examples to match the style guide during the chapter reorganization
- The File I/O section's style is the most consistent and production-realistic — use it as the reference for other sections

**Phase:** Convention establishment (define style guide before writing new content) and content reorganization (retrofit existing examples).

---

## P10: Not Preparing Learners for the "BBj is Invisible to Google" Problem

**What goes wrong:** When a Java developer hits an error, they Google it and find Stack Overflow answers. When a BBj developer hits an error, they find nothing — or worse, they find answers for Visual Basic, BASIC, or other unrelated BASIC dialects. The tutorial never addresses this reality. It doesn't teach learners where to find help (BASIS community, internal knowledge bases, the documentation search), and it doesn't warn them that generic AI tools will confidently hallucinate wrong syntax. This is arguably the single biggest productivity blocker for new BBj developers.

**Warning signs:**
- Learners report spending hours debugging because they couldn't find answers online
- Learners use ChatGPT/Copilot for BBj and get syntactically plausible but wrong code
- The tutorial's "Further Reading" links are the learner's only lifeline, and they don't know what to do when those links don't answer their question
- Error messages in BBj are numeric codes (ERR=11, ERR=0) with no descriptive text — impossible to Google effectively

**Prevention strategy:**
- Add a "Getting Help with BBj" section early in the course covering:
  - Official documentation search (documentation.basis.cloud) and how to navigate it effectively
  - BASIS community resources and support channels
  - Why AI assistants fail for BBj (near-zero training data) and how to use them cautiously (e.g., for Java interop questions where the Java side is reliable)
  - How to read BBj error codes (numeric, not descriptive) — link to the error code reference
- Include a "Common Errors and What They Mean" quick reference that maps numeric error codes to human-readable descriptions and common causes
- The File I/O section's error code table is a good start but should be generalized to a course-wide reference

**Phase:** Content authoring (write the "Getting Help" section as one of the first new additions — it reduces frustration for everything that follows).

---

## P11: Course Structure That Prevents Non-Linear Learning

**What goes wrong:** The current sidebar has 5 sequential sections with no cross-linking or "jump to what you need" navigation. A developer assigned to fix a File I/O bug doesn't want to complete the Getting Started and OOP sections first. The planned restructuring into numbered chapters (01-, 02-) further reinforces linear ordering. While a "red thread" narrative is valuable, rigid sequencing in a tutorial for experienced developers wastes their time and reduces the course's utility as a reference after initial learning.

**Warning signs:**
- Developers skip to the section they need but lack prerequisite context that was covered only in earlier sections
- The sidebar provides no indication of dependencies between sections
- There's no "quick reference" or "cheat sheet" page that serves returning developers who completed the course
- The planned chapter ordering puts Java interop (chapter ~10) after file I/O and collections, but a developer doing Java library integration on day one has to wade through unrelated content

**Prevention strategy:**
- Add prerequisite badges to each chapter header: "Assumes: Getting Started, Error Handling"
- Create a "Quick Reference" page that aggregates all cheat sheets, comparison tables, and common patterns — serves as the post-course utility page
- Ensure every chapter beyond Getting Started is self-contained enough to be useful in isolation (brief reminders of key concepts rather than hard dependencies)
- The DWC Course is the reference implementation — check how it handles non-linear access and match that pattern
- Consider a "Learning Paths" page: "Assigned to maintain legacy code? Start here. Building new features? Start here. Integrating Java libraries? Start here."

**Phase:** Information architecture (define chapter dependencies and cross-linking strategy during restructuring) and homepage design (learning paths on the hero page).

---

## Summary: Phase Mapping

| Phase | Pitfalls to Address |
|-------|-------------------|
| **Convention establishment** | P9 (code style guide), P2 (generation badges) |
| **Infrastructure setup** | P5 (samples directory, syntax highlighting), P6 (CI link checking) |
| **Content planning** | P1 (modern-first ordering), P7 (legacy reading chapter scope), P8 (chapter priority by frequency) |
| **Information architecture** | P11 (non-linear navigation, learning paths, prerequisites) |
| **Introduction rewrite** | P4 (explicit audience declaration), P10 (getting help section) |
| **Content authoring** | P1, P2, P3, P5, P7, P8, P10 (all apply during writing) |
| **Content review** | P3 (link-farm audit), P9 (style consistency), P6 (link inventory) |
| **CI/CD setup** | P5 (example validation), P6 (automated link checking) |

---

*Research completed: 2026-01-31*
