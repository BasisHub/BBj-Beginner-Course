# Phase 1: Foundation - Context

**Gathered:** 2026-01-31
**Status:** Ready for planning

<domain>
## Phase Boundary

Migrate the site's build infrastructure to match the DWC tutorial at /Users/beff/_workspace/bbj-dwc-tutorial. This means TypeScript configs, 5 new plugins (local search, mermaid, ideal-image, zoom, BBj syntax), blue theme, external link icons, and a verified build. Content reorganization and homepage components are Phase 2.

</domain>

<decisions>
## Implementation Decisions

### DWC Tutorial Matching
- Switch color theme from green/teal (#2e8555) to blue (#2563eb) to match DWC Course for consistent BASIS branding
- Copy the external link icon CSS feature (SVG appended to http/https links via ::after pseudo-elements, with light/dark mode variants)
- Remove `future.v4` experimental flags — match DWC tutorial which does not use them
- Search settings: Claude's discretion on exact config (Mod+K shortcut, result count, context length) — adjust if something makes more sense for this course's content size

### Package Manager
- Standardize on npm (matches existing package-lock.json and DWC tutorial)
- Update CLAUDE.md to reflect npm commands instead of yarn
- Remove any yarn references or yarn.lock if present

### BBj Syntax Highlighting
- Use Prism's built-in `bbj` grammar as the primary language for code fences
- Ship with built-in grammar; fix specific highlighting gaps if/when noticed (not a blocker)
- Retag all existing BBj code blocks from `java` or unlabeled to `bbj` during this phase
- Keep `java` in additionalLanguages for actual Java code examples (Java interop chapter later)

### Build Verification
- Phase is done when: `npm run build` succeeds AND each plugin is spot-checked on at least one page
- Spot checks: search finds content, mermaid renders a diagram, bbj code blocks are highlighted, image zoom works, ideal-image loads responsively
- Add TypeScript check (`tsc`) step to CI workflow, matching DWC tutorial pattern

### Claude's Discretion
- Exact search plugin configuration (result count, context length, shortcut)
- tsconfig.json settings (follow DWC tutorial as baseline, adjust as needed)
- Order of operations for migration steps
- Whether to add a test mermaid block in existing content or create a temporary test page

</decisions>

<specifics>
## Specific Ideas

- The DWC tutorial at /Users/beff/_workspace/bbj-dwc-tutorial is the reference implementation — configs should match as closely as possible
- Stack research (`.planning/research/STACK.md`) has the exact versions and complete target package.json ready for implementation
- The DWC tutorial's resolved node_modules were used to verify all version numbers (confirmed working 2026-01-31)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-01-31*
