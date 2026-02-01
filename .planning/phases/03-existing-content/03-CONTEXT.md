# Phase 3: Existing Content - Context

**Gathered:** 2026-02-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Review and modernize the 4 existing content sections (Getting Started, Object-Oriented, File I/O, Web Development) so readers encounter modern BBj patterns first with legacy as context. No new chapters — those are Phases 4-5.

</domain>

<decisions>
## Implementation Decisions

### Video dependency strategy
- All content becomes text-first. Videos are supplementary, never the sole instruction method.
- Videos stay inline but wrapped in collapsible admonitions ("Watch the video"). Text content is the primary flow.
- This pattern applies consistently across all chapters (Getting Started, OOP, Web Development).
- **Setup video is outdated** — the current setup walkthrough doesn't reflect BDTStudio or VSCode extension realities. Defer setup rework to a later phase; for now, add a note that tooling has evolved and link to current resources.

### OOP chapter depth and structure
- Split into subpages within the chapter (not one monolithic page):
  1. **Writing your own classes** — BBj class syntax, inheritance (BBj-to-BBj AND BBj extending Java classes), interfaces, constructors
  2. **Using Java classes from BBj** — HashMap, Iterator, etc. Emphasize this is a core strength. Cover limitations: no generics, runtime interpretation.
  3. **The BBjAPI object model** — Orientation-level coverage: what BBjAPI() is, main object families (SysGui, filesystem, vectors, etc.), how to discover and navigate methods. This is the biggest blind spot for new developers coming from other languages.
- BBjAPI subpage is orientation only for now — depth deferred to later (note for roadmap backlog).
- Both BBj-to-BBj and BBj-extending-Java inheritance shown with working examples.

### File I/O modern framing
- Reframe but keep all existing content — the record I/O material is solid and needed for legacy code work.
- Rename the chapter to emphasize legacy context (something like "File I/O and Legacy Data Access" or "Record-Oriented Files (Legacy)").
- Strengthen the modern-first intro: SQL/Data Dictionary is the recommended path, this chapter is "what you'll encounter in legacy systems."
- SQL equivalents table: Claude's discretion on whether to keep as a bridge or defer to the Database chapter.

### Content tone and voice
- Professional peer tone throughout. Direct, respects existing programming knowledge. "Here's how BBj does X" not "Let's learn about X."
- Rewrite casual/instructional prompts ("Play with it", "Can you enhance it?", "Watch this video") to peer-level direct statements and structured exercises.
- Move the "BBj for Java/.NET Developers" comparison tables from Getting Started to the Introduction chapter — that's orientation content, not getting-started content.

### Claude's Discretion
- Exact structure of collapsible video admonitions (Docusaurus admonition type, wording)
- SQL equivalents table placement in File I/O (keep as bridge vs defer)
- File I/O chapter title — something that signals legacy context without being dismissive
- OOP subpage ordering and navigation flow
- How much of the existing Getting Started prose to keep vs rewrite (apply peer tone judgment)

</decisions>

<specifics>
## Specific Ideas

- Three layers of OOP in BBj that new developers need to understand early: (1) language-level classes, (2) Java interop, (3) BBjAPI as the daily-use object model
- The BBjAPI gap is the biggest blind spot — "new developers struggle to get the complete picture early, which leaves them stumbling in the fog for too long"
- Setup tooling has changed: BDTStudio (prepackaged Eclipse) and VSCode extension are the current realities — setup video is outdated

</specifics>

<deferred>
## Deferred Ideas

- **Setup section rework** — Current setup video and instructions are outdated. Need to cover BDTStudio (prepackaged Eclipse) and VSCode extension as alternatives. Requires new video content and step-by-step instructions for both paths. Too large for Phase 3 reframing.
- **BBjAPI deep-dive content** — Orientation is covered in Phase 3 OOP chapter, but comprehensive BBjAPI coverage (each object family with examples) should be a future addition. Note for roadmap backlog.

</deferred>

---

*Phase: 03-existing-content*
*Context gathered: 2026-02-01*
