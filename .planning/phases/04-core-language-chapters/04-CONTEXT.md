# Phase 4: Core Language Chapters - Context

**Gathered:** 2026-02-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Three new chapters covering error handling, string/numeric functions, and collections — the most frequently needed capabilities after basic syntax. Each chapter teaches modern BBj patterns with legacy callouts showing older equivalents. Chapters produce .bbj sample files for the samples/ directory.

</domain>

<decisions>
## Implementation Decisions

### Chapter structure and flow
- Subpages per chapter (like OOP chapter): index page + subpages per major concept
- Index pages contain: overview paragraph, quick-reference table (syntax at a glance), then links to subpages
- Opening style: context first — brief 2-3 sentence intro of what/why, then immediately into code
- Depth: tutorial-style with 2-3 examples per concept, building complexity
- "Further Reading" callout at end of each concept section linking to official docs and other relevant resources — builds the habit of using documentation

### Example and sample code style
- Isolated, self-contained snippets — each example demonstrates one concept, reader can copy any without needing prior examples
- Generic/abstract variable names and scenarios — focus on syntax, not business domain
- Show expected output for key examples; skip when output is obvious
- Sample .bbj files: driven by need, not one-per-subpage. Bias toward more files when in doubt — small snippets help developers learn

### Legacy code callouts
- Format: collapsible `<details>/<summary>` — collapsed by default, doesn't break reading flow
- Placement: Claude's discretion per concept — inline when contrast is most useful, grouped when that works better
- Generations: cover all relevant generations that had a different way of doing it (full history per concept)
- Content depth: code side-by-side + brief context on when/why the legacy pattern was used + common gotchas when reading/maintaining legacy code

### Cross-chapter consistency
- Fixed skeleton, flexible internals: same opening (intro) and closing (Legacy + Further Reading) but middle sections vary by content
- Cross-link freely between chapters where concepts connect
- Further Reading links to any relevant resource: BBj docs, Java docs, community posts, or other high-quality resources

### Claude's Discretion
- Further Reading callout format (admonition vs collapsible — pick what looks best per page)
- Exact subpage breakdown per chapter (how many subpages, what groupings)
- Which legacy callouts go inline vs grouped at end of subpage
- Specific section headings in the flexible middle of each subpage

</decisions>

<specifics>
## Specific Ideas

- "Further Reading" callouts should make developers aware of the official docs and get them into the habit of using it as their primary reference
- Tutorial is for experienced programmers new to BBj — they understand programming concepts, just not BBj syntax

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-core-language-chapters*
*Context gathered: 2026-02-01*
