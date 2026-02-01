---
phase: 04-core-language-chapters
plan: 02
subsystem: documentation
tags: [strings, numbers, formatting, CVS, POS, MASK, STR, NUM]
depends_on:
  requires: [02-01, 03-02]
  provides: ["Strings and Numbers chapter with index + 3 subpages + 4 samples"]
  affects: [05-01, 05-02]
tech-stack:
  added: []
  patterns: ["chapter landing page + subpages", "sample .bbj files per chapter", "legacy callouts in <details>", "Further Reading :::tip admonitions"]
key-files:
  created:
    - docs/05-strings-and-numbers/01-string-basics.md
    - docs/05-strings-and-numbers/02-searching.md
    - docs/05-strings-and-numbers/03-formatting.md
    - samples/05-strings-and-numbers/string_basics.bbj
    - samples/05-strings-and-numbers/pos_searching.bbj
    - samples/05-strings-and-numbers/mask_regex.bbj
    - samples/05-strings-and-numbers/str_num_formatting.bbj
  modified:
    - docs/05-strings-and-numbers/index.md
decisions:
  - id: "04-02-01"
    decision: "MID$/LEFT$/RIGHT$ mentioned only as 'BBj does not use these' -- explicit callout for developers from other BASIC dialects"
  - id: "04-02-02"
    decision: "BBjString::length() referenced for Unicode-aware length vs LEN() bytes -- footnote-level guidance, not deep dive"
metrics:
  duration: "4 min"
  completed: "2026-02-01"
---

# Phase 4 Plan 2: Strings and Numbers Chapter Summary

**One-liner:** String/number chapter covering LEN (bytes), A$(pos,len) substring notation, CVS bitmask cleanup, POS() searching with backward scan and counting, MASK() regex, STR() numeric/string masks, NUM() conversion.

## Performance

- **Duration:** 4 minutes
- **Tasks:** 2/2 completed
- **Build:** Passes (npm run build exits 0)
- **BBj compilation:** All snippets verified with bbjcpl -N

## Accomplishments

1. Rewrote index.md as chapter landing page with "At a Glance" quick-reference table covering all 7 core functions
2. Created 01-string-basics.md: LEN() with bytes-vs-characters caveat, 1-based substring notation A$(pos,len), concatenation, CVS() bitmask table with all 7 values
3. Created 02-searching.md: POS() basic/backward/counting, MASK() regex with TCB(16), POS-vs-MASK comparison table
4. Created 03-formatting.md: STR() with numeric masks ($##,##0.00), string masks (phone/SSN), NUM() with ERR= error handling, cross-link to error handling chapter
5. Created 4 runnable .bbj sample files covering all demonstrated concepts

## Task Commits

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | Rewrite index.md as landing page | 21d4a36 | docs/05-strings-and-numbers/index.md |
| 2 | Create subpages and sample files | 79ee875 | 3 .md subpages, 4 .bbj samples |

## Files Created

- `docs/05-strings-and-numbers/01-string-basics.md` -- LEN, substrings, CVS, concatenation
- `docs/05-strings-and-numbers/02-searching.md` -- POS(), MASK(), comparison table
- `docs/05-strings-and-numbers/03-formatting.md` -- STR(), NUM(), mask reference
- `samples/05-strings-and-numbers/string_basics.bbj` -- LEN, substring, CVS examples
- `samples/05-strings-and-numbers/pos_searching.bbj` -- POS() with all argument forms
- `samples/05-strings-and-numbers/mask_regex.bbj` -- MASK() regex patterns
- `samples/05-strings-and-numbers/str_num_formatting.bbj` -- STR/NUM formatting examples

## Files Modified

- `docs/05-strings-and-numbers/index.md` -- Replaced placeholder with landing page

## Decisions Made

1. **MID$/LEFT$/RIGHT$ callout:** Mentioned once in 01-string-basics.md as "BBj does not use these functions" -- explicit guidance for developers from other BASIC dialects who will search for these
2. **BBjString::length() for Unicode:** Referenced as footnote-level guidance for non-ASCII strings; not a deep dive since most BBj business applications are ASCII
3. **Error handling cross-link:** 03-formatting.md links to /error-handling for NUM() ERR= pattern, reinforcing the trap-and-branch model from the previous chapter

## Deviations from Plan

None -- plan executed exactly as written.

## Issues Encountered

None.

## Next Phase Readiness

- Strings and Numbers chapter complete with all planned content
- Cross-link to Error Handling chapter established (NUM() error 26)
- Sample file pattern consistent with 04-01 (error handling samples)
- Phase 4 plan 3 (Collections) is the remaining plan in this phase
