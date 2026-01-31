# Phase 2: Structure - Context

**Gathered:** 2026-01-31
**Status:** Ready for planning

<domain>
## Phase Boundary

Reorganize content into numbered chapter directories with working sidebar navigation, a homepage with Hero/ChapterCards/Features components, and a samples directory for runnable BBj code. All existing content moves to new locations; no new tutorial content is written.

</domain>

<decisions>
## Implementation Decisions

### Homepage design
- Hero section mirrors the DWC tutorial's hero pattern, adapted for this course's content
- ChapterCards show chapter number, title, and a 1-sentence description of what the reader will learn
- All 12 chapters appear as cards, including unwritten ones marked "Coming Soon" or visually distinguished
- HomepageFeatures highlights three value props: "Read Legacy Code" (understand inherited codebases), "Modern-First" (learn current patterns), "Hands-On" (runnable samples)

### Chapter numbering and directory mapping
- Chapters reordered for optimal learning flow (not keeping existing order)
- Web Development is Chapter 12 (last) — "now you know BBj, go build web apps with DWC"
- Zero-padded directory names: 01-introduction/, 02-getting-started/, ...12-web-development/
- Use Docusaurus slug frontmatter to keep URLs clean and human-friendly regardless of directory names (e.g., /getting-started/ not /02-getting-started/)

### Samples organization
- Both focused snippets (one concept per file) and complete mini-project programs
- Organized by chapter number: samples/03-oop/, samples/05-error-handling/, etc.
- Actual .bbj files created only when each chapter is written in later phases — directory structure created now, files added in Phases 3-6
- Dedicated "Running Samples" docs page (standalone, not embedded in another chapter)

### Sidebar and navigation
- Sidebar pattern mirrors the DWC tutorial for consistency across BASIS training materials
- All 12 chapters appear in sidebar, including unwritten ones — link to brief placeholder pages ("This chapter is under development")
- Prev/next navigation chains through all 12 chapters including placeholders
- "Running Samples" page appears before Chapter 1 in the sidebar (setup prerequisite)

### Claude's Discretion
- Exact chapter ordering for chapters 3-11 (must be pedagogically sound with dependencies respected)
- Placeholder page content and styling
- Homepage component implementation details (React patterns, CSS approach)
- DWC tutorial sidebar analysis and adaptation specifics

</decisions>

<specifics>
## Specific Ideas

- DWC tutorial is the reference implementation for Hero and sidebar patterns — research it for specifics
- Chapter cards should be straightforward: number + title + one-liner, no icons
- Placeholder pages should be minimal but functional — reader knows content is coming

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-structure*
*Context gathered: 2026-01-31*
