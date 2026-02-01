# Phase 6: Differentiators and Quality - Context

**Gathered:** 2026-02-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Cross-cutting differentiation and quality work across all existing chapters. Add legacy code reading training (per-chapter subpages), a generation mapping reference, cross-language translation tables, and a full code/link/style quality audit. All chapter content already exists — this phase adds layers on top and ensures everything meets quality standards.

Exercises are explicitly deferred to a future phase/milestone.

</domain>

<decisions>
## Implementation Decisions

### Legacy code sidebars
- Dedicated "Reading Legacy Code" subpage per chapter (not inline callouts)
- Only chapters with significant legacy patterns get a subpage — Claude identifies which chapters qualify
- Each entry shows modern + legacy code side-by-side (two code blocks with brief explanation)
- Recognition-only depth: "You'll see this in old code. Here's the modern way." No historical justification needed

### Generation mapping reference
- Lives inside the Introduction chapter as a subpage
- Comparison table is the central element, with room to elaborate on each era
- Generations defined by both syntax style eras and product version milestones (they go hand in hand)
- 4 generations shown side-by-side: when common, signature syntax, modern equivalent

### Claude's Discretion
- Whether the generations page cross-links to per-chapter legacy subpages (decide based on whether it adds value)
- Which specific chapters warrant legacy subpages
- Exact table column structure for generation mapping

### Translation tables
- Three source languages: Java, Python, C#
- Both per-chapter inline tables AND a comprehensive reference page
- Per-chapter tables cover that chapter's topic (e.g., error handling chapter shows try/catch vs SETERR across languages)
- Comprehensive reference page organized by task ("handle an error", "iterate a list") with columns showing how each language does it
- Reference page lives as a standalone subpage (placement TBD by planner)

### Code audit and quality pass
- Standardize comment headers AND formatting (indentation, variable naming, blank line conventions)
- Claude establishes style guide from existing patterns, then normalizes all examples to match
- Broken links: fix, remove, or replace with better alternatives
- Full build verification at the end: `npm run build` + link check for broken internal links and warnings

</decisions>

<specifics>
## Specific Ideas

- Generation mapping should feel like a "decoder ring" — a developer encountering old BBj code can identify which era it's from and know the modern equivalent
- Translation tables serve the "I know how to do this in Java/Python/C#, how do I do it in BBj?" use case
- Quality pass should catch any inconsistencies introduced across 5 phases of content creation

</specifics>

<deferred>
## Deferred Ideas

- Exercises with structured objectives per chapter — deferred to a future phase/milestone (user explicitly requested deferral)

</deferred>

---

*Phase: 06-differentiators-and-quality*
*Context gathered: 2026-02-01*
