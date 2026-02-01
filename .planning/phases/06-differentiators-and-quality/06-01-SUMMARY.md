---
phase: 06-differentiators-and-quality
plan: 01
subsystem: documentation
tags: [legacy-code, generations, bbx, pro5, bbj, decoder-ring, docusaurus]

# Dependency graph
requires:
  - phase: 04-core-language
    provides: "Error handling, strings, collections chapters with inline legacy callouts"
  - phase: 05-data-and-application
    provides: "File I/O, database, Java interop chapters with inline legacy callouts"
provides:
  - "Generations of BBj reference page (4-generation decoder ring)"
  - "Reading Legacy Code subpages for ch 04, 05, 06 (4 patterns each)"
  - "Inline callout-to-link migration pattern for all chapters"
affects: [06-02, quality-audit]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - ":::tip admonition links to legacy subpages (replacing inline <details>)"
    - "sidebar_position: 99 for legacy subpages (end of chapter)"
    - "Side-by-side legacy/modern code block pattern"

key-files:
  created:
    - docs/01-introduction/generations.md
    - docs/04-error-handling/04-legacy-code.md
    - docs/05-strings-and-numbers/04-legacy-code.md
    - docs/06-collections/04-legacy-code.md
  modified:
    - docs/04-error-handling/01-seterr-and-err.md
    - docs/04-error-handling/02-throw-and-custom.md
    - docs/04-error-handling/03-patterns.md
    - docs/05-strings-and-numbers/01-string-basics.md
    - docs/05-strings-and-numbers/02-searching.md
    - docs/05-strings-and-numbers/03-formatting.md
    - docs/06-collections/01-bbjvector.md
    - docs/06-collections/02-java-collections.md
    - docs/06-collections/03-arrays-conversion.md

key-decisions:
  - "Docusaurus strips numeric prefixes from doc IDs -- links must use ./legacy-code not ./04-legacy-code"
  - "Removed debugging legacy cross-link from generations page (ch 11 has no legacy subpage yet)"
  - "index.md pages need absolute paths for child links (/file-io/legacy-code not ./legacy-code)"

patterns-established:
  - "Legacy subpage pattern: 04-legacy-code.md with sidebar_position: 99, H3 entries with paired code blocks"
  - "Admonition link pattern: :::tip[Reading Legacy Code] with See [Reading Legacy Code](./legacy-code)"

# Metrics
duration: 6min
completed: 2026-02-01
---

# Phase 6 Plan 1: Generations and Legacy Code Subpages Summary

**4-generation BBj decoder ring (BBx/PRO/5/Early BBj/Modern BBj) plus 3 dedicated legacy code subpages with 12 side-by-side pattern comparisons, replacing 9 inline callouts with admonition links**

## Performance

- **Duration:** 6 min
- **Started:** 2026-02-01T12:21:10Z
- **Completed:** 2026-02-01T12:27:30Z
- **Tasks:** 2
- **Files modified:** 23

## Accomplishments
- Generations of BBj reference page with comparison table, 4 expanded sections, representative code blocks, and cross-links to all existing legacy subpages
- Reading Legacy Code subpages for Error Handling (4 patterns), Strings and Numbers (4 patterns), Collections (4 patterns) -- each with paired legacy/modern code blocks
- All 9 inline `<details>` legacy callouts in ch 04-06 replaced with `:::tip` admonition links
- Fixed numeric-prefix link resolution across all chapters (04-legacy-code -> legacy-code)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create Generations of BBj reference page** - `c4fcea4` (feat)
2. **Task 2: Create legacy code subpages and replace inline callouts** - `363aebd` (feat)

## Files Created/Modified
- `docs/01-introduction/generations.md` - 4-generation decoder ring with comparison table and cross-links
- `docs/04-error-handling/04-legacy-code.md` - Legacy error patterns: line numbers, ON ERR, STBL, pre-THROW
- `docs/05-strings-and-numbers/04-legacy-code.md` - Legacy string patterns: uppercase, POS() loops, PRINT masks, MID$
- `docs/06-collections/04-legacy-code.md` - Legacy collection patterns: DIM arrays, BBjHashMap, REDIM, parallel arrays
- `docs/04-error-handling/01-seterr-and-err.md` - Replaced `<details>` with admonition link
- `docs/04-error-handling/02-throw-and-custom.md` - Replaced `<details>` with admonition link
- `docs/04-error-handling/03-patterns.md` - Replaced `<details>` with admonition link
- `docs/05-strings-and-numbers/01-string-basics.md` - Replaced `<details>` with admonition link
- `docs/05-strings-and-numbers/02-searching.md` - Replaced `<details>` with admonition link
- `docs/05-strings-and-numbers/03-formatting.md` - Replaced `<details>` with admonition link
- `docs/06-collections/01-bbjvector.md` - Replaced `<details>` with admonition link
- `docs/06-collections/02-java-collections.md` - Replaced `<details>` with admonition link
- `docs/06-collections/03-arrays-conversion.md` - Replaced `<details>` with admonition link

## Decisions Made
- Docusaurus number prefix stripping means all internal links must omit the numeric prefix (e.g., `./legacy-code` not `./04-legacy-code`). This also required fixing pre-existing links in chapters 07, 08, and 09.
- Removed the debugging legacy cross-link from the Generations page since chapter 11 does not yet have a legacy subpage (Plan 02 scope).
- For `index.md` pages, relative links resolve differently -- used absolute paths (`/file-io/legacy-code`) instead of relative (`./legacy-code`).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed numeric-prefix link resolution in existing chapters 07-09**
- **Found during:** Task 2 (build verification)
- **Issue:** Legacy subpage links in chapters 07, 08, 09 used `./04-legacy-code` or `./02-legacy-code` format which Docusaurus cannot resolve (strips numeric prefix from doc IDs)
- **Fix:** Updated all 7 affected files across chapters 07-09 to use `./legacy-code` pattern
- **Files modified:** docs/07-file-io/index.md, docs/08-database-sql/01-connecting.md, docs/08-database-sql/02-queries.md, docs/08-database-sql/03-patterns.md, docs/09-java-interop/01-basics.md, docs/09-java-interop/02-advanced.md, docs/09-java-interop/03-libraries.md
- **Verification:** `npm run build` succeeds with zero broken links
- **Committed in:** 363aebd (Task 2 commit)

**2. [Rule 3 - Blocking] Committed previously uncommitted legacy subpages for chapters 07, 08, 09**
- **Found during:** Task 2 (git status)
- **Issue:** Legacy subpages for file-io, database-sql, and java-interop were created by earlier phases but never committed -- build requires them
- **Fix:** Included in Task 2 commit
- **Files added:** docs/07-file-io/02-legacy-code.md, docs/08-database-sql/04-legacy-code.md, docs/09-java-interop/04-legacy-code.md
- **Verification:** Build passes
- **Committed in:** 363aebd (Task 2 commit)

**3. [Rule 3 - Blocking] Fixed index.md relative link for file-io chapter**
- **Found during:** Task 2 (build verification)
- **Issue:** `./legacy-code` from `index.md` resolves to `/legacy-code` (root level) instead of `/file-io/legacy-code` because Docusaurus treats index pages differently
- **Fix:** Changed to absolute path `/file-io/legacy-code`
- **Files modified:** docs/07-file-io/index.md
- **Verification:** `npm run build` succeeds
- **Committed in:** 363aebd (Task 2 commit)

---

**Total deviations:** 3 auto-fixed (all Rule 3 - Blocking)
**Impact on plan:** All fixes were necessary for build to pass. No scope creep -- fixes addressed pre-existing link issues that surfaced during this plan's build verification.

## Issues Encountered
None beyond the auto-fixed deviations above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Generations page and ch 04-06 legacy subpages complete
- Plan 02 can create legacy subpages for remaining chapters (07-09, 11) and translation tables
- The admonition link pattern and sidebar_position: 99 convention are established for Plan 02 to follow

---
*Phase: 06-differentiators-and-quality*
*Completed: 2026-02-01*
