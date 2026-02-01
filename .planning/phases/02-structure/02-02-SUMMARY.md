---
phase: 02-structure
plan: 02
subsystem: ui
tags: [react, homepage, components, mdx, css-modules, infima]

# Dependency graph
requires:
  - phase: 02-structure-01
    provides: "12 numbered chapter directories with index.md files, homepage stub, sidebar config"
provides:
  - "Hero banner component with course title, subtitle, and CTA button"
  - "ChapterCards grid component with 12 chapters and coming-soon visual distinction"
  - "HomepageFeatures component with 3 value proposition cards"
  - "MDX homepage importing and rendering all 3 components"
affects: [02-03 build verification, phase 3 existing content polish, phase 6 quality]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "React components in src/components/ with CSS Modules"
    - "MDX imports in docs/*.md via @site/src/components/ path"
    - "Infima row/col grid for responsive card layout"
    - "Theme-aware CSS using --ifm-color-* variables"

key-files:
  created:
    - src/components/Hero/index.tsx
    - src/components/Hero/styles.module.css
    - src/components/ChapterCards/index.tsx
    - src/components/ChapterCards/styles.module.css
    - src/components/HomepageFeatures/index.tsx
    - src/components/HomepageFeatures/styles.module.css
  modified:
    - docs/index.md

key-decisions:
  - "ChapterCards links all 12 chapters including coming-soon ones to their placeholder pages (not disabled)"
  - "Coming-soon cards use reduced opacity (0.7) plus a small 'Coming Soon' badge for visual distinction"
  - "HomepageFeatures renders before ChapterCards on the homepage (value props before course outline)"

patterns-established:
  - "Component directory pattern: src/components/Name/index.tsx + styles.module.css"
  - "MDX import pattern: import Component from '@site/src/components/Component'"
  - "Card grid: col col--4 for 3-column responsive layout"

# Metrics
duration: 3min
completed: 2026-02-01
---

# Phase 2 Plan 2: Homepage Components Summary

**Hero banner, 12-chapter card grid with coming-soon badges, and 3 value-prop feature cards wired into MDX homepage**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-01
- **Completed:** 2026-02-01
- **Tasks:** 2
- **Files created:** 6
- **Files modified:** 1

## Accomplishments

- Created Hero component with course title, subtitle, and "Start Learning" CTA button linking to /introduction
- Created ChapterCards component rendering all 12 chapters in a responsive 3-column grid, with coming-soon chapters visually distinguished via reduced opacity and a "Coming Soon" badge
- Created HomepageFeatures component with 3 value proposition cards: Read Legacy Code, Modern-First, Hands-On
- Wired all 3 components into docs/index.md via MDX imports, replacing the plain text stub
- All components use CSS Modules, Infima grid classes, and theme-aware CSS variables for light/dark mode support

## Task Commits

Each task was committed atomically:

1. **Task 1: Create Hero, ChapterCards, and HomepageFeatures components** - `f047712` (feat)
2. **Task 2: Wire homepage to import and render all 3 components** - `99c6c40` (feat)

## Files Created/Modified

- `src/components/Hero/index.tsx` - Hero banner with title, subtitle, and CTA button
- `src/components/Hero/styles.module.css` - Hero layout and typography styles
- `src/components/ChapterCards/index.tsx` - 12-chapter card grid with ChapterItem type, coming-soon support
- `src/components/ChapterCards/styles.module.css` - Card, badge, and coming-soon styles
- `src/components/HomepageFeatures/index.tsx` - 3 value proposition feature cards
- `src/components/HomepageFeatures/styles.module.css` - Feature card layout and typography
- `docs/index.md` - Updated from stub to full MDX homepage with 3 component imports

## Decisions Made

- ChapterCards links all 12 chapters to their pages (including coming-soon placeholder pages) rather than disabling the links -- users can see what's planned
- Coming-soon visual treatment: `opacity: 0.7` on the card plus a small inline "Coming Soon" badge next to the chapter number
- Component render order on homepage: Hero (top), then HomepageFeatures (value props), then ChapterCards (course outline) -- this matches the DWC Course pattern of leading with the pitch before the detailed content list

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All homepage components are in place for 02-03 build verification and visual spot-check
- Components use only existing dependencies (react, clsx, @docusaurus/Link, @theme/Heading)
- Both `npm run build` and `npm run typecheck` pass cleanly
- Card slugs match the chapter URLs established in 02-01

---
*Phase: 02-structure*
*Completed: 2026-02-01*
