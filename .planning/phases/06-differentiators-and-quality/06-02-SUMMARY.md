---
phase: 06-differentiators-and-quality
plan: 02
subsystem: docs
tags: [legacy-code, translation-tables, docusaurus, bbj, java, python, csharp]

# Dependency graph
requires:
  - phase: 05-data-and-application
    provides: "Chapters 07-09 with inline legacy <details> callouts to extract"
  - phase: 06-differentiators-and-quality
    provides: "Plan 01 established legacy subpage pattern and generations reference page"
provides:
  - "Legacy code subpages for File I/O, Database/SQL, and Java Interop (3 pages, 4 patterns each)"
  - "Comprehensive Java/Python/C# to BBj translation reference page (8 task categories)"
  - "All inline <details> callouts in ch 07-09 replaced with admonition links"
affects: [06-differentiators-and-quality]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Admonition link pattern: :::tip[Reading Legacy Code] with link to dedicated subpage"
    - "Translation table pattern: 5-column GFM table (Task, Java, Python, C#, BBj)"

key-files:
  created:
    - docs/07-file-io/02-legacy-code.md
    - docs/08-database-sql/04-legacy-code.md
    - docs/09-java-interop/04-legacy-code.md
    - docs/01-introduction/translation-tables.md
  modified:
    - docs/07-file-io/index.md
    - docs/08-database-sql/01-connecting.md
    - docs/08-database-sql/02-queries.md
    - docs/08-database-sql/03-patterns.md
    - docs/09-java-interop/01-basics.md
    - docs/09-java-interop/02-advanced.md
    - docs/09-java-interop/03-libraries.md
    - docs/01-introduction/generations.md

key-decisions:
  - "File I/O legacy subpage uses 02-legacy-code.md filename (ch 07 has only index.md, so position 02)"
  - "Translation tables use 8 task categories with concise single-line code snippets per cell"
  - "Removed broken debugging legacy link from generations page (ch 11 keeps inline callouts per plan)"

patterns-established:
  - "Legacy subpage naming: 04-legacy-code.md (default) or 02-legacy-code.md (for chapters with only index)"
  - "Admonition link replaces <details> callout: :::tip[Reading Legacy Code] See [Reading Legacy Code](./legacy-code) ..."

# Metrics
duration: 6min
completed: 2026-02-01
---

# Phase 6 Plan 2: Legacy Subpages (ch 07-09) and Translation Tables Summary

**3 legacy code subpages covering File I/O, Database/SQL, and Java Interop patterns with 4 side-by-side examples each, plus comprehensive Java/Python/C# to BBj translation reference with 8 task categories**

## Performance

- **Duration:** 6 min
- **Started:** 2026-02-01T12:22:59Z
- **Completed:** 2026-02-01T12:29:00Z
- **Tasks:** 2
- **Files modified:** 15 (4 created, 11 modified)

## Accomplishments
- Created dedicated "Reading Legacy Code" subpages for chapters 07 (File I/O), 08 (Database/SQL), and 09 (Java Interop), each with 4 legacy-vs-modern code pattern entries
- Replaced all inline `<details>` legacy callouts in chapters 07-09 with clean admonition links to the new subpages
- Created comprehensive translation reference page mapping Java, Python, and C# patterns to BBj across 8 task categories (Variables, Control Flow, Error Handling, Strings, Collections, Classes, File/Database, Events)
- Fixed broken link in generations page (removed nonexistent debugging legacy subpage reference)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create legacy code subpages and replace inline callouts** - `363aebd` (feat)
2. **Task 2: Create comprehensive translation reference page** - `53bd52c` (feat)

## Files Created/Modified
- `docs/07-file-io/02-legacy-code.md` - Legacy file I/O patterns (direct access modes, string-packed records, IOLIST, channel management)
- `docs/08-database-sql/04-legacy-code.md` - Legacy database patterns (SQL.INI, string concat SQL, MID extraction, BBjRecordSet)
- `docs/09-java-interop/04-legacy-code.md` - Legacy Java interop patterns (pre-use FQN, ADDR/CALL, string data exchange, procedural Java)
- `docs/01-introduction/translation-tables.md` - Comprehensive Java/Python/C# to BBj translation reference
- `docs/07-file-io/index.md` - Added admonition link to legacy subpage
- `docs/08-database-sql/01-connecting.md` - Replaced `<details>` with admonition link
- `docs/08-database-sql/02-queries.md` - Replaced `<details>` with admonition link
- `docs/08-database-sql/03-patterns.md` - Replaced `<details>` with admonition link
- `docs/09-java-interop/01-basics.md` - Replaced `<details>` with admonition link
- `docs/09-java-interop/02-advanced.md` - Replaced `<details>` with admonition link
- `docs/09-java-interop/03-libraries.md` - Replaced `<details>` with admonition link
- `docs/01-introduction/generations.md` - Fixed file-io legacy link path, removed broken debugging link

## Decisions Made
- File I/O legacy subpage named `02-legacy-code.md` (ch 07 only has index.md, no existing numbered subpages to conflict with)
- Translation tables limited to concise single-line code per cell for readability in narrow table columns
- Removed nonexistent debugging legacy subpage link from generations page rather than creating a thin page (ch 11 has only 2 borderline patterns, per plan decision)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Included uncommitted Plan 01 legacy subpages for ch 04-06**
- **Found during:** Task 1 (commit phase)
- **Issue:** Plan 01 created legacy subpages for ch 04-06 and modified ch 04-06 subpages but left them uncommitted. The generations page links depended on these files.
- **Fix:** Included all Plan 01 files in the Task 1 commit alongside the new ch 07-09 files
- **Files modified:** 9 additional files from Plan 01 (3 new subpages + 6 modified subpages)
- **Verification:** Build passes with all links resolved
- **Committed in:** 363aebd (Task 1 commit)

**2. [Rule 1 - Bug] Fixed broken debugging legacy link in generations page**
- **Found during:** Task 1 (build verification)
- **Issue:** Generations page linked to `../debugging/04-legacy-code` but no such file exists (ch 11 keeps inline callouts per plan decision)
- **Fix:** Removed the broken link from the generations page 4th Gen section
- **Files modified:** docs/01-introduction/generations.md
- **Verification:** Build passes with no broken links
- **Committed in:** 363aebd (Task 1 commit)

---

**Total deviations:** 2 auto-fixed (1 blocking, 1 bug)
**Impact on plan:** Both fixes necessary for build to pass. No scope creep.

## Issues Encountered
- Docusaurus relative link resolution from index.md pages differs from subpages -- `./legacy-code` from an index page resolves to root level, not the chapter directory. Resolved by using absolute path `/file-io/legacy-code` instead.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Legacy code training coverage is now complete across chapters 04-09 (6 dedicated subpages)
- Translation reference provides the "I know Java/Python/C#, how do I do this in BBj?" landing page
- Ready for Plan 03 (quality audit) or Plan 04 if applicable

---
*Phase: 06-differentiators-and-quality*
*Completed: 2026-02-01*
