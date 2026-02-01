# Phase 6: Differentiators and Quality - Research

**Researched:** 2026-02-01
**Domain:** Cross-cutting documentation enrichment (legacy code training, generation mapping, translation tables) and content quality audit across a Docusaurus 3.x BBj tutorial site
**Confidence:** HIGH (based on direct codebase analysis; BBj generation history is MEDIUM due to reliance on web sources)

## Summary

This phase adds three differentiation layers on top of the existing 12-chapter tutorial (34 docs files, 148 BBj code blocks, 104 external links, 28 sample .bbj files) and performs a comprehensive quality audit. The codebase already has 20 inline `<details>` "Reading Legacy Code" callouts scattered across subpages -- this phase consolidates and expands that pattern into dedicated per-chapter legacy subpages, adds a BBj generations reference page, introduces cross-language translation tables, and normalizes all code to a consistent style.

The key insight is that most of the legacy content *already exists as inline callouts*. The decision to move to dedicated subpages means extracting, expanding, and restructuring existing content rather than writing from scratch. The generation mapping page is net-new content. Translation tables are a mix of expanding existing comparison tables (Introduction chapter already has Java/.NET mappings) and creating new ones.

**Primary recommendation:** Work in four sequential workstreams -- (1) generation mapping reference first (it provides the mental model for everything else), (2) legacy code subpages per chapter, (3) translation tables (per-chapter inline + comprehensive reference), (4) quality audit last (catches any issues introduced by the first three).

## Standard Stack

This phase does not introduce new libraries. All work is content authoring within the existing Docusaurus 3.9.2 setup.

### Core
| Tool | Version | Purpose | Why Standard |
|------|---------|---------|--------------|
| Docusaurus | 3.9.2 | Site framework | Already in place, no upgrade needed |
| Prism (bbj language) | Built-in | BBj syntax highlighting | Already configured in docusaurus.config.ts |
| bbjcpl | Local install | BBj snippet verification | Per CLAUDE.md, all BBj snippets must be compiler-verified |

### Supporting
| Tool | Purpose | When to Use |
|------|---------|-------------|
| `npm run build` | Internal link check + build verification | Final quality gate; `onBrokenLinks: 'throw'` already configured |
| linkinator (npx) | External link verification | Run `npx linkinator ./build --recurse` post-build to catch dead external URLs |
| `bbjcpl -N` | BBj code syntax check | Every BBj snippet in documentation must be verified before embedding |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| linkinator | lychee (Rust) | lychee is faster but requires binary install; linkinator is npx-ready, no install needed |
| Manual link audit | textlint-rule-no-dead-link | Heavier setup for a one-time audit; linkinator is simpler for a single pass |

## Architecture Patterns

### Content Structure (Current)
```
docs/
├── 01-introduction/index.md          # Will get generations subpage
├── 02-getting-started/index.md       # Minimal legacy patterns
├── 03-object-oriented/
│   ├── index.md
│   ├── 01-writing-classes.md
│   ├── 02-using-java.md              # Redirect to Java Interop
│   └── 03-bbjapi-model.md
├── 04-error-handling/
│   ├── index.md
│   ├── 01-seterr-and-err.md          # Has legacy callout
│   ├── 02-throw-and-custom.md        # Has legacy callout
│   └── 03-patterns.md                # Has legacy callout
├── 05-strings-and-numbers/
│   ├── index.md
│   ├── 01-string-basics.md           # Has legacy callout
│   ├── 02-searching.md               # Has legacy callout
│   └── 03-formatting.md              # Has legacy callout
├── 06-collections/
│   ├── index.md
│   ├── 01-bbjvector.md               # Has legacy callout
│   ├── 02-java-collections.md        # Has legacy callout
│   └── 03-arrays-conversion.md       # Has legacy callout
├── 07-file-io/index.md               # Heavy legacy content already
├── 08-database-sql/
│   ├── index.md
│   ├── 01-connecting.md              # Has legacy callout
│   ├── 02-queries.md                 # Has legacy callout
│   └── 03-patterns.md                # Has legacy callout
├── 09-java-interop/
│   ├── index.md
│   ├── 01-basics.md                  # Has legacy callout
│   ├── 02-advanced.md                # Has legacy callout
│   └── 03-libraries.md               # Has legacy callout
├── 10-event-handling/
│   ├── index.md
│   ├── 01-setcallback.md             # Has legacy callout
│   ├── 02-events.md                  # Has legacy callout
│   └── 03-legacy.md                  # Entire page is legacy reference
├── 11-debugging/
│   ├── index.md
│   ├── 01-console.md                 # Has legacy callout
│   └── 02-tracing.md                 # Has legacy callout
└── 12-web-development/index.md       # Minimal content, links to DWC Course
```

### Pattern 1: New Subpages via Autogenerated Sidebar

**What:** Each new subpage is a markdown file in the chapter directory. Docusaurus autogenerates sidebar entries from `sidebar_position` frontmatter.

**When to use:** Legacy code subpages, generation mapping subpage, comprehensive translation reference.

**Example frontmatter for a legacy subpage:**
```yaml
---
sidebar_position: 99
title: "Reading Legacy Code"
---
```

Use `sidebar_position: 99` (or a high number) to place legacy subpages at the end of each chapter. The autogenerated sidebar (`{type: 'autogenerated', dirName: 'XX-chapter'}`) picks them up automatically -- no sidebars.ts changes needed.

### Pattern 2: Side-by-Side Code Comparison (Legacy vs Modern)

**What:** Two consecutive fenced code blocks with explanatory text, used for legacy code recognition training.

**When to use:** Every entry in the legacy code subpages.

**Example:**
```markdown
### Line-Number Error Trapping

You may see `SETERR` with line numbers instead of labels:

```bbj
rem Legacy: line-number error trapping
0010 seterr 9500
0020 x = num("not a number")
9500 rem Error handler
9510 print "Error: ", errmes(-1)
9520 release
```

The modern equivalent uses labels:

```bbj
rem Modern: label-based error trapping
seterr handler
x = num("not a number")
release

handler:
    print "Error: ", errmes(-1)
    release
```
```

### Pattern 3: Translation Tables (Markdown GFM Tables)

**What:** Standard GFM markdown tables with 4 columns: Task, Java, Python/C#, BBj.

**When to use:** Per-chapter inline tables and the comprehensive reference page.

**Example:**
```markdown
| Task | Java | Python | C# | BBj |
|------|------|--------|----|-----|
| Handle error | `try/catch` | `try/except` | `try/catch` | `seterr label` + `err=` |
| Raise error | `throw new Exception()` | `raise Exception()` | `throw new Exception()` | `throw "msg", 256` |
```

### Anti-Patterns to Avoid
- **Don't create Tabs components for side-by-side code.** The site does not import `@docusaurus/theme-common` Tabs. Stick with consecutive code blocks, which is the established pattern.
- **Don't inline-expand existing `<details>` callouts into the main text.** The decision is to extract them to dedicated subpages while keeping the inline callouts minimal (or removing them and linking to the subpage instead).
- **Don't add new npm dependencies for content features.** All content uses standard markdown, `<details>`, and admonitions already available.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Internal broken links | Custom link-checking script | `npm run build` (onBrokenLinks: 'throw') | Already configured, catches all internal link issues at build time |
| External broken links | Manual clicking | `npx linkinator ./build --recurse` | Automated, thorough, zero-install via npx |
| BBj syntax verification | Manual review | `bbjcpl -N /tmp/snippet.bbj` | Compiler is the only authoritative source of truth per CLAUDE.md |
| Code style guide | Formal spec document | Derive from existing patterns, document in RESEARCH.md (below) | The codebase IS the spec; normalize to the majority pattern |

**Key insight:** The quality pass should normalize TO existing patterns, not invent new ones. The style guide emerges from analyzing the 148 existing code blocks and 28 sample files.

## Common Pitfalls

### Pitfall 1: Legacy Subpage Bloat
**What goes wrong:** Creating legacy subpages for chapters that have only 1-2 minor legacy patterns, resulting in thin pages that don't justify their own navigation entry.
**Why it happens:** Applying the pattern uniformly without evaluating whether each chapter has enough legacy content.
**How to avoid:** Only create legacy subpages for chapters with 3+ distinct legacy patterns worth documenting. Chapters with 1-2 patterns can keep their inline `<details>` callouts.
**Warning signs:** A legacy subpage with fewer than 3 entries or less than ~150 words of content.

**Recommendation -- chapters that warrant dedicated legacy subpages:**
| Chapter | Legacy Patterns Count | Justification |
|---------|----------------------|---------------|
| 04-error-handling | 3+ (line numbers, ON ERR GOTO/GOSUB, !THROWERROR STBL) | Rich legacy history |
| 05-strings-and-numbers | 2-3 (uppercase keywords, line numbers, inline PRINT masks) | Borderline -- could consolidate |
| 06-collections | 3 (DIM-as-collection, BBjHashMap, REDIM) | Multiple distinct patterns |
| 07-file-io | 3+ (entire chapter is legacy-adjacent, file types, direct access) | Heavy legacy domain |
| 08-database-sql | 3 (SQL.INI, string concatenation SQL, MID extraction) | Multiple distinct patterns |
| 09-java-interop | 3 (pre-use FQN, ADDR/CALL, string-based data exchange) | Multiple distinct patterns |
| 10-event-handling | Already has dedicated legacy page (03-legacy.md) | No new subpage needed |
| 11-debugging | 2 (STOP/ENTER, SETTRACE without channel) | Borderline |

Chapters NOT needing a legacy subpage:
- 01-introduction: No code examples
- 02-getting-started: Minimal legacy surface
- 03-object-oriented: OOP is inherently modern BBj (6.0+)
- 12-web-development: DWC is modern-only

### Pitfall 2: Translation Table Scope Creep
**What goes wrong:** Translation tables become exhaustive API references instead of practical quick-lookup aids.
**Why it happens:** Trying to map every possible equivalent rather than the most common tasks.
**How to avoid:** Limit per-chapter tables to 5-8 rows covering that chapter's core operations. The comprehensive reference page can be larger (20-30 rows) but should stay task-oriented.
**Warning signs:** Tables with more than 10 rows per chapter, or entries for obscure operations.

### Pitfall 3: Generation Mapping Overreach
**What goes wrong:** The generations page tries to document every BBj version difference instead of the 4-generation mental model.
**Why it happens:** BBj has dozens of versions; trying to be comprehensive.
**How to avoid:** Strictly stick to 4 generations defined by syntax style + product era. Individual version features belong in chapter content, not the generations overview.
**Warning signs:** More than 4 rows in the main generation table.

### Pitfall 4: Quality Pass Introduces Regressions
**What goes wrong:** Reformatting code examples or fixing links breaks working content.
**Why it happens:** Batch changes without incremental verification.
**How to avoid:** Run `npm run build` after each chapter's quality pass, not just at the end. Verify BBj snippets with bbjcpl after any reformatting.
**Warning signs:** Build warnings or errors appearing mid-phase.

### Pitfall 5: Sidebar Ordering Conflicts
**What goes wrong:** New subpages appear in unexpected positions in the sidebar.
**Why it happens:** `sidebar_position` conflicts between existing files and new files, or relying on alphabetical ordering.
**How to avoid:** Use high position numbers (99) for legacy subpages so they always appear last. Check existing `sidebar_position` values before assigning new ones.

## Code Examples

### Established Code Style (Derived from 148 Code Blocks + 28 Sample Files)

Analysis of existing code reveals two distinct style patterns:

**Sample .bbj files use this header pattern:**
```
rem === [Title] ===
rem Demonstrates: [what]
rem Expected output: [what]
rem
rem Requires: [dependencies if any]
```
Or the JavaDoc-style variant:
```
rem /**
rem  * filename.bbj - [Description]
rem  *
rem  * [Details]
rem  *
rem  * Expected output:
rem  *   [output lines]
rem  */
```

**Inline code in documentation uses:**
- Lowercase keywords: `seterr`, `print`, `rem`, `for`, `if`
- Uppercase BBj verbs in SQL context: `SQLOPEN`, `SQLPREP`, `SQLFETCH`, `DIM`, `OPEN`, `READ RECORD`
- Object references always with `!` suffix
- Comments with `rem` (lowercase) in inline examples
- `REM` (uppercase) only in sample file headers and procedural section dividers
- 4-space indentation inside methods, handlers, loops
- Blank line between logical sections
- No line numbers in modern examples
- Labels are lowercase with underscores or camelCase: `handler:`, `not_found:`, `fetchDone:`

**Mixed casing observation:** The SQL/file-IO chapters use uppercase verbs (`SQLOPEN`, `READ RECORD`, `DIM`), while OOP/string chapters use lowercase (`seterr`, `print`, `for`). This appears intentional -- uppercase for "verb-level" BBj statements, lowercase for general code flow. The quality pass should preserve this distinction, not force uniform casing.

### Generation Mapping Table Structure (Recommended)

```markdown
| Generation | Era | Product | Signature Syntax | Modern Equivalent |
|------------|-----|---------|-----------------|-------------------|
| 1st Gen | 1985-1995 | BBx / Business BASIC | Line numbers, GOTO, DIM arrays, character-mode I/O | Labels, BBjVector, GUI controls |
| 2nd Gen | 1995-2002 | PRO/5 / Visual PRO/5 | CALLBACK verb, SYSGUI channel, READ RECORD events, `print(sysgui)'control'` mnemonics | setCallback, process_events |
| 3rd Gen | 2002-2006 | Early BBj (1.x-5.x) | Java `new` operator, fully-qualified class names, SQLOPEN/SQL verbs, procedural + Java objects | `use` statements, Custom Objects |
| 4th Gen | 2006-present | BBj 6.0+ (Custom Objects) | `class`/`classend`, `method`/`methodend`, `field`, `use`, setCallback with methods, `#this!`, interfaces | Current recommended style |
```

### Per-Chapter Translation Table Example (Error Handling)

```markdown
| Task | Java | Python | C# | BBj |
|------|------|--------|----|-----|
| Set error handler | `try {` | `try:` | `try {` | `seterr label` |
| Catch specific error | `catch (IOException e)` | `except IOError as e:` | `catch (IOException e)` | `if err = 17 then ...` |
| Catch all errors | `catch (Exception e)` | `except Exception as e:` | `catch (Exception e)` | `seterr handler` (global) |
| Get error message | `e.getMessage()` | `str(e)` | `e.Message` | `errmes(-1)` |
| Raise/throw error | `throw new Exception("msg")` | `raise Exception("msg")` | `throw new Exception("msg")` | `throw "msg", 256` |
| Skip on error | N/A (catch + ignore) | `except: pass` | N/A (catch + ignore) | `err=*next` |
| Finally / cleanup | `finally { }` | `finally:` | `finally { }` | Fall-through to cleanup label |
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Line numbers + GOTO | Labels + structured code | BBx era | Legacy code uses numbered lines |
| DIM arrays for collections | BBjVector / java.util.HashMap | BBj 1.0 (1999+) | Legacy DIM+counter patterns |
| Fully qualified Java class names | `use` import statement | Early BBj | `new java.util.HashMap()` vs `new HashMap()` |
| CALLBACK verb (procedural) | setCallback method (OO) | BBj 6.0 (~2006) | Procedural vs OO event handling |
| No custom classes | class/classend/method/field | BBj 6.0 (~2006) | Biggest shift in BBj history |
| BBjHashMap | java.util.HashMap | BBj 20.10 | BBjHashMap deprecated/renamed |
| SQL.INI configuration | Enterprise Manager / Data Dictionary | Modern BBj | Configuration approach changed |
| String concatenation SQL | SQLPREP with ? parameters | Best practice evolution | Security and maintainability |

## BBj Generation History (For Generation Mapping Page)

**Confidence: MEDIUM** -- Assembled from multiple web sources; specific version-to-year mappings are approximate.

### Generation 1: Business BASIC / BBx (1985-1995)
- **Product:** BBx (Business BASIC eXtended)
- **Syntax signatures:** Line numbers required, GOTO/GOSUB, DIM arrays (max 3 dimensions), character-mode terminal I/O, single-line IF/THEN
- **No GUI, no objects, no SQL**
- Source: [Business Basic Wikipedia](https://en.wikipedia.org/wiki/Business_Basic), [BASIS PRO/5 Family page](https://basis.cloud/pro5-family/)

### Generation 2: PRO/5 and Visual PRO/5 (1995-2002)
- **Products:** PRO/5 (character mode, multi-platform), Visual PRO/5 (Windows GUI via native widgets)
- **Syntax signatures:** CALLBACK verb, SYSGUI channel, `print(sysgui)'button'(...)` mnemonic GUI creation, READ RECORD polling loops for events
- **First GUI but Windows-only (Visual PRO/5)**; PRO/5 remained character-mode
- Source: [BASIS PRO/5 Family page](https://basis.cloud/pro5-family/), [Guide to GUI Programming (PDF)](https://documentation.basis.cloud/WhitePapers/GuideToGuiProgrammingInBBj.pdf)

### Generation 3: Early BBj (2002-2006, versions 1.x-5.x)
- **Product:** BBj (Business BASIC for Java)
- **Syntax signatures:** Java object creation with `new`, fully-qualified class names (`new java.util.HashMap()`), SQLOPEN/SQL verbs for database, MASK() for regex, multi-line IF/THEN/ELSE, cross-platform GUI (same API on all platforms)
- **BBj ran on JVM** but did not yet have native OOP syntax
- Source: [BBj Changes from Earlier Versions](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/BBj_Enhancements/bbj_bbx_differences.htm)

### Generation 4: Modern BBj (2006-present, BBj 6.0+)
- **Product:** BBj with Custom Objects
- **Syntax signatures:** `class`/`classend`, `method`/`methodend`, `field`, `use` import, `setCallback` method-based callbacks, `#this!`, `declare`, `interface`/`interfaceend`, `throw`/`seterr` structured error handling
- **Full OOP:** Classes can extend Java classes and implement Java interfaces
- BBj 21.00+: Class bodies cross-compiled to Java bytecode
- BBj 25.x: Requires Java 21, bundles org.json and other libraries
- Source: [Custom Objects Tutorial](https://documentation.basis.cloud/BASISHelp/WebHelp/tutorials/custom_objects/custom_objects_01intro.htm), [CAST() Function docs](https://documentation.basis.com/BASISHelp/WebHelp/commands/cast_function_.htm)

## Existing Legacy Content Inventory

The codebase already has 20 inline `<details>` "Reading Legacy Code" callouts. Here is the complete inventory:

| File | Callout Title | Content Size |
|------|--------------|--------------|
| 04-error-handling/01-seterr-and-err.md | Line-Number Error Trapping | ~15 lines, code example |
| 04-error-handling/02-throw-and-custom.md | Error Handling Before THROW | ~15 lines, STBL patterns |
| 04-error-handling/03-patterns.md | Error Handling with ON ERR | ~15 lines, ON ERR GOTO/GOSUB |
| 05-strings-and-numbers/01-string-basics.md | String Operations Across Generations | ~10 lines, uppercase/line numbers |
| 05-strings-and-numbers/02-searching.md | String Searching Before MASK() | ~15 lines, POS() workaround |
| 05-strings-and-numbers/03-formatting.md | Numeric Formatting | ~15 lines, inline PRINT mask |
| 06-collections/01-bbjvector.md | Before BBjVector | ~10 lines, DIM+counter |
| 06-collections/02-java-collections.md | BBjHashMap | ~8 lines, deprecation note |
| 06-collections/03-arrays-conversion.md | DIM Arrays as Collections | ~15 lines, oversized DIM patterns |
| 07-file-io/index.md | (Legacy content throughout) | Entire chapter is legacy-adjacent |
| 08-database-sql/01-connecting.md | SQL.INI Configuration | ~8 lines |
| 08-database-sql/02-queries.md | String-Based SQL Without Templates | ~10 lines |
| 08-database-sql/03-patterns.md | Direct File Access Instead of SQL | ~10 lines |
| 09-java-interop/01-basics.md | Java Interop Before Custom Objects | ~10 lines, procedural style |
| 09-java-interop/02-advanced.md | Pre-Use Import Patterns | ~10 lines, FQN everywhere |
| 09-java-interop/03-libraries.md | String-Based Data Exchange | ~10 lines, delimited strings |
| 10-event-handling/01-setcallback.md | Label-Based vs Method-Based | ~5 lines |
| 10-event-handling/02-events.md | Numeric Event Constants | ~5 lines |
| 10-event-handling/03-legacy.md | Recognizing Event Generations | ~8 lines (entire page is legacy) |
| 11-debugging/01-console.md | STOP and ENTER Verbs | ~8 lines |
| 11-debugging/02-tracing.md | SETTRACE Without File Channel | ~8 lines |

**Decision point for planner:** For chapters getting dedicated legacy subpages, the planner should decide whether to:
- (A) Move the inline callouts to the subpage and remove them from the original files, or
- (B) Keep the inline callouts and add additional content to the subpage, or
- (C) Replace inline callouts with a brief note + link to the subpage

Recommendation: Option (C) -- replace inline `<details>` with a one-line link like "See [Reading Legacy Code](./legacy-code) for the historical equivalent." This keeps the main content clean while the subpage provides depth.

## Translation Table Placement

**Per-chapter inline tables:** Add to each chapter's index page or first subpage, near the top, in a section titled "For Java/Python/C# Developers" or similar. Several chapters already have comparison tables (Introduction, File I/O, Strings). Expand those and add new ones where missing.

**Comprehensive reference page:** Create as a standalone page. Two placement options:
1. Inside `01-introduction/` as a subpage (e.g., `01-introduction/translation-tables.md`) -- keeps it near the "BBj for Java/.NET Developers" section
2. As a top-level page alongside `samples.md` -- visible from the root sidebar

**Recommendation:** Place in `01-introduction/` as a subpage. The Introduction chapter already has the "BBj for Java/.NET Developers" section, and a comprehensive translation reference is a natural extension. It also keeps the top-level sidebar clean.

## Quality Audit Scope

### Code Style Normalization

Based on analysis of all 148 code blocks and 28 sample files, the existing style is:

**Confirmed patterns (normalize all code to match):**
- `rem` lowercase for inline comments
- `REM` uppercase only in sample file section dividers (`REM ===== Section =====`)
- 4-space indentation for code inside methods, handlers, and loops
- One blank line between logical sections
- Labels are lowercase: `handler:`, `done:`, `not_found:`
- Object references always use `!` suffix
- `use` statements at file top, one per line
- SQL verbs uppercase: `SQLOPEN`, `SQLPREP`, `SQLFETCH`, `DIM`, `OPEN`, `READ RECORD`, `WRITE RECORD`, `EXTRACT`, `CLOSE`, `REMOVE`
- Flow control lowercase: `seterr`, `for`, `while`, `if`, `print`, `release`
- Class/method keywords lowercase: `class`, `classend`, `method`, `methodend`, `field`

**Mixed patterns requiring normalization:**
- Some inline examples use `PRINT` (uppercase) while others use `print` (lowercase). Normalize to lowercase `print` in inline examples; uppercase `PRINT` only in SQL/file-IO verb contexts.
- Some sample files use `rem ===` headers, others use `rem /**` JavaDoc style. Normalize to `rem ===` style for consistency (it's more common in the codebase).

### Link Audit Strategy

1. **Internal links:** Already checked by `npm run build` with `onBrokenLinks: 'throw'`. Run build, fix any issues.
2. **External links:** Run `npx linkinator ./build --recurse` against the built site. Document dead links. Fix by: (a) updating to current URL if redirected, (b) replacing with alternative if removed, (c) removing if no replacement exists.
3. **Link count:** 104 external URLs across 27 files. Major link destinations:
   - `documentation.basis.cloud` (BBj official docs) -- most links
   - `basis.cloud` (BASIS marketing site)
   - `youtube.com` (embedded tutorial videos)
   - `github.com/BasisHub` (repo links)
   - `basishub.github.io` (DWC Course)

### Build Verification

The CI pipeline (`deploy.yml`) already runs `npm run typecheck` + `npm run build`. The quality pass should:
1. Run `npm run build` locally after each batch of changes
2. Run `npx linkinator ./build --recurse` for external links
3. Address all warnings (the config uses `onBrokenMarkdownLinks: 'warn'`)

## Open Questions

1. **DIFF-04 (Day-one tasks structure)**
   - What we know: The requirement mentions "task-oriented chapters: read existing program, fix legacy bug, add field." The user deferred exercises but this requirement overlaps.
   - What's unclear: Whether DIFF-04 is in scope given exercises are deferred, or whether "day-one tasks" is a different concept from "exercises."
   - Recommendation: Treat DIFF-04 as deferred along with exercises. The legacy code subpages partially fulfill the "read existing program" aspect. The planner should flag this for the user if needed.

2. **Cross-linking from generations page to per-chapter legacy subpages**
   - This is explicitly Claude's discretion per CONTEXT.md.
   - Recommendation: YES, add cross-links. The generations page serves as a "decoder ring" -- linking to chapter-specific legacy subpages where readers can see actual examples adds significant value. Format: a brief "See also" list at the bottom of each generation section.

3. **Inline `<details>` callout fate**
   - What we know: Decision says "dedicated subpage per chapter" for legacy content.
   - What's unclear: Whether existing inline callouts should be removed, kept, or replaced with links.
   - Recommendation: Replace with one-line links to the subpage. Keeps main content clean.

4. **Where exactly does the comprehensive translation reference page go?**
   - Recommendation: `docs/01-introduction/translation-tables.md` with `sidebar_position: 3` (after the introduction index).

## Sources

### Primary (HIGH confidence)
- Direct codebase analysis of all 34 docs files, 28 sample .bbj files, docusaurus.config.ts, sidebars.ts, package.json, custom.css, deploy.yml
- [Docusaurus 3 onBrokenLinks docs](https://docusaurus.io/docs/api/docusaurus-config) -- internal link checking configuration
- [BBj Custom Objects Tutorial](https://documentation.basis.cloud/BASISHelp/WebHelp/tutorials/custom_objects/custom_objects_01intro.htm) -- Custom Objects introduced in BBj 6.0

### Secondary (MEDIUM confidence)
- [BASIS PRO/5 Family page](https://basis.cloud/pro5-family/) -- PRO/5 and Visual PRO/5 product history
- [BBj Changes from Earlier Versions](https://documentation.basis.cloud/BASISHelp/WebHelp/usr/BBj_Enhancements/bbj_bbx_differences.htm) -- BBj vs BBx language differences
- [Linkinator npm package](https://www.npmjs.com/package/linkinator) -- external link checking tool
- [Guide to GUI Programming in BBj (PDF, 2007)](https://documentation.basis.cloud/WhitePapers/GuideToGuiProgrammingInBBj.pdf) -- Historical GUI evolution context

### Tertiary (LOW confidence)
- [Business Basic Wikipedia](https://en.wikipedia.org/wiki/Business_Basic) -- General BBx/Business BASIC history (approximate dates)
- WebSearch results for BBj version timeline -- specific year-to-version mappings are approximate

## Metadata

**Confidence breakdown:**
- Content structure & patterns: HIGH -- based on complete codebase analysis of all 34 files
- BBj generation history: MEDIUM -- assembled from multiple official sources but exact version-to-year mappings have some uncertainty
- Code style guide: HIGH -- derived directly from analysis of 148 code blocks and 28 sample files
- Quality audit approach: HIGH -- Docusaurus config already has link checking; linkinator is well-established
- Translation table patterns: HIGH -- three chapters already have comparison tables to use as templates

**Research date:** 2026-02-01
**Valid until:** 2026-03-03 (stable content project, no fast-moving dependencies)
