# Stack Research: Docusaurus 3.x Developer Tutorial Site

**Research Date:** 2026-01-31
**Question:** What is the standard 2025/2026 stack for a Docusaurus 3.x developer tutorial site with TypeScript, local search, mermaid diagrams, and rich homepage components?
**Context:** BBj beginner tutorial must match the sibling DWC tutorial infrastructure at `/Users/beff/_workspace/bbj-dwc-tutorial`.

---

## Executive Summary

The target stack is already proven and running in the sibling DWC tutorial. This is not a greenfield decision -- it is a parity alignment. Every recommendation below is verified against the DWC tutorial's resolved `node_modules` versions (confirmed installed and building on 2026-01-31). The beginner tutorial needs 5 new dependencies, a JS-to-TS config migration, and 3 new React components.

---

## 1. Core Framework

### Docusaurus 3.9.2 with preset-classic

| Item | Value |
|------|-------|
| Package | `@docusaurus/core` + `@docusaurus/preset-classic` |
| Version | **3.9.2** (pinned, not caret) |
| Confidence | **Verified** -- both projects already at 3.9.2 |

**Rationale:** 3.9.2 is the current stable release. The DWC tutorial pins this exact version. Both tutorials must stay version-locked to prevent divergence.

**Prescriptive decision -- `future.v4` flag:**
- The beginner tutorial currently has `future: { v4: true }`. The DWC tutorial does NOT.
- **Remove `future.v4`** from the beginner tutorial config. The two sites must behave identically, and the v4 future flag changes routing, MDX parsing, and CSS module behavior. Adding it to one site but not the other creates subtle incompatibilities.
- Revisit when both tutorials are ready to migrate to Docusaurus 4 together.

### React 19

| Item | Value |
|------|-------|
| Package | `react` + `react-dom` |
| Specifier | `^19.0.0` |
| Resolved | **19.2.3** (in both projects' node_modules) |
| Confidence | **Verified** |

**Rationale:** Docusaurus 3.9.2 supports React 19. Both projects already resolve to 19.2.3. The caret range (`^19.0.0`) allows patch updates automatically.

### MDX Support

| Item | Value |
|------|-------|
| Package | `@mdx-js/react` |
| Specifier | `^3.0.0` |
| Resolved | **3.1.1** |
| Confidence | **Verified** |

**Rationale:** Required for embedding React components (Hero, ChapterCards) inside MDX/Markdown files. Already installed in beginner tutorial.

---

## 2. TypeScript Configuration

### TypeScript

| Item | Value |
|------|-------|
| Package | `typescript` (devDependency) |
| Specifier | `~5.6.2` |
| Resolved | **5.6.3** |
| Confidence | **Verified** -- DWC tutorial resolves to 5.6.3 |

**Rationale:** The tilde range (`~5.6.2`) keeps patch updates but prevents minor version jumps. Docusaurus 3.9.2 is tested against TypeScript 5.6.x. The `@docusaurus/tsconfig` 3.9.2 targets ES2022 and uses `moduleResolution: "bundler"`, which requires TypeScript 5.0+.

**What NOT to use:** Do not use TypeScript 5.7+ yet. Docusaurus bundles its own webpack config and newer TS versions can introduce module resolution changes that conflict.

### @docusaurus/tsconfig

| Item | Value |
|------|-------|
| Package | `@docusaurus/tsconfig` (devDependency) |
| Version | **3.9.2** (pinned) |
| Confidence | **Verified** |

**Rationale:** Provides the base `tsconfig.json` that the project extends. Includes the `@site/*` path alias and correct compiler targets. Already used by DWC tutorial.

### tsconfig.json

```json
{
  "extends": "@docusaurus/tsconfig",
  "compilerOptions": {
    "baseUrl": "."
  },
  "exclude": [".docusaurus", "build"]
}
```

**Rationale:** Exact copy of DWC tutorial's tsconfig. The `baseUrl: "."` enables the `@site/*` path alias for component imports.

### Files to Migrate JS to TS

| Current (JS) | Target (TS) | Notes |
|---------------|-------------|-------|
| `docusaurus.config.js` | `docusaurus.config.ts` | Replace JSDoc `@type` annotations with TypeScript `satisfies` |
| `sidebars.js` | `sidebars.ts` | Replace JSDoc `@type` with typed `SidebarsConfig` import |

**What NOT to use:** Do not keep the JS files alongside the TS files. Docusaurus will pick up `.ts` files automatically; having both creates confusion.

---

## 3. New Plugins (5 additions)

### 3a. Local Search -- @easyops-cn/docusaurus-search-local

| Item | Value |
|------|-------|
| Package | `@easyops-cn/docusaurus-search-local` |
| Specifier | `^0.52.3` |
| Resolved | **0.52.3** |
| Confidence | **Verified** -- installed and working in DWC tutorial |

**Rationale:** Client-side search with no external service dependency. Builds a lunr.js index at build time. Supports Cmd+K keyboard shortcut. No Algolia account needed, which is critical for an internal training site that may not qualify for Algolia's free DocSearch program.

**Configuration (exact DWC tutorial config):**
```typescript
[
  require.resolve("@easyops-cn/docusaurus-search-local"),
  {
    hashed: true,
    indexDocs: true,
    indexBlog: false,
    indexPages: false,
    docsRouteBasePath: "/",
    searchResultLimits: 8,
    searchResultContextMaxLength: 50,
    searchBarShortcut: true,
    searchBarShortcutKeymap: "mod+k",
  },
]
```

**What NOT to use:**
- **Algolia DocSearch** (`@docusaurus/theme-search-algolia`) -- requires applying for free program or paying; external dependency; overkill for a training site with ~20 pages
- **`docusaurus-lunr-search`** -- less maintained, fewer configuration options than @easyops-cn
- **`@cmfcmf/docusaurus-search-local`** -- older fork, archived

### 3b. Mermaid Diagrams -- @docusaurus/theme-mermaid

| Item | Value |
|------|-------|
| Package | `@docusaurus/theme-mermaid` |
| Specifier | `^3.9.2` |
| Resolved | **3.9.2** |
| Confidence | **Verified** |

**Rationale:** Enables mermaid code blocks in Markdown for architecture diagrams, flowcharts, and sequence diagrams. Critical for a programming tutorial where visual explanations of concepts like event loops, class hierarchies, and data flow add significant value.

**Configuration required in two places:**

1. `markdown.mermaid: true` in the config
2. `'@docusaurus/theme-mermaid'` in the `themes` array

```typescript
// In docusaurus.config.ts
markdown: {
  mermaid: true,
},
themes: [
  '@docusaurus/theme-mermaid',
  // ... search theme
],
themeConfig: {
  mermaid: {
    theme: {
      light: 'neutral',
      dark: 'dark',
    },
  },
},
```

**What NOT to use:** Do not use `remark-mermaidjs` or other remark plugins for mermaid. The official Docusaurus theme-mermaid handles SSR, dark mode, and zoom correctly.

### 3c. Ideal Image -- @docusaurus/plugin-ideal-image

| Item | Value |
|------|-------|
| Package | `@docusaurus/plugin-ideal-image` |
| Specifier | `^3.9.2` |
| Resolved | **3.9.2** |
| Confidence | **Verified** |

**Rationale:** Generates responsive image sizes at build time, lazy-loads images, and provides blur-up placeholder effect. Improves page load performance for a tutorial site with screenshots and diagrams.

**Configuration:**
```typescript
[
  '@docusaurus/plugin-ideal-image',
  {
    quality: 85,
    max: 1030,
    min: 640,
    steps: 2,
    disableInDev: false,
  },
]
```

**What NOT to use:** Do not use `@docusaurus/plugin-client-redirects` as an image solution. Do not use external image CDNs -- the site is deployed as static files to GitHub Pages.

### 3d. Image Zoom -- docusaurus-plugin-zooming

| Item | Value |
|------|-------|
| Package | `docusaurus-plugin-zooming` |
| Specifier | `^1.0.0` |
| Resolved | **1.0.0** |
| Confidence | **Verified** |

**Rationale:** Click-to-zoom on images in markdown content. Essential for a tutorial where screenshots of IDE, terminal output, and UI may contain small text that readers need to inspect.

**Configuration:**
```typescript
// In plugins array
'docusaurus-plugin-zooming',

// In themeConfig
zooming: {
  selector: '.markdown img',
  delay: 500,
  background: {
    light: 'rgba(101,108,133,0.8)',
    dark: 'rgba(9,10,17,0.8)',
  },
  options: {
    enableGrab: false,
  },
},
```

**What NOT to use:**
- **`plugin-image-zoom`** (Docusaurus community) -- different package, less stable
- **`medium-zoom`** directly -- the plugin wraps this correctly for Docusaurus lifecycle

### 3e. Prism BBj Language

| Item | Value |
|------|-------|
| Package | Already bundled in `prismjs` (dependency of `prism-react-renderer`) |
| File | `prismjs/components/prism-bbj.js` |
| Confidence | **Verified** -- exists in node_modules |

**Rationale:** Prism has a built-in BBj grammar definition. The DWC tutorial already uses `additionalLanguages: ['java', 'bash', 'bbj']`. The beginner tutorial currently only has `['java']`.

**Configuration change:**
```typescript
prism: {
  theme: prismThemes.github,
  darkTheme: prismThemes.dracula,
  additionalLanguages: ['java', 'bash', 'bbj'],
},
```

---

## 4. Custom React Components (3 new TSX components)

All three components follow the DWC tutorial's proven pattern: TypeScript functional components with CSS Modules. They are imported directly into the homepage MDX file.

### 4a. Hero Component

| File | `src/components/Hero/index.tsx` |
|------|------|
| CSS | `src/components/Hero/styles.module.css` |
| Pattern | Full-width header with title, subtitle, and CTA button |
| Confidence | **Verified** -- working in DWC tutorial |

**Rationale:** Provides a branded landing experience instead of dumping users directly into documentation content. The current beginner tutorial serves `docs/introduction/index.md` as the homepage, which works but has no visual hierarchy.

### 4b. ChapterCards Component

| File | `src/components/ChapterCards/index.tsx` |
|------|------|
| CSS | `src/components/ChapterCards/styles.module.css` |
| Pattern | Grouped card grid with section labels, linked to chapter slugs |
| Confidence | **Verified** -- working in DWC tutorial |

**Rationale:** Gives readers a visual map of the entire course. Each card links to a chapter, grouped by section (Getting Started, Core Concepts, etc.). Uses Infima's `col col--4` grid and Docusaurus `Link` component for client-side navigation.

### 4c. HomepageFeatures Component

| File | `src/components/HomepageFeatures/index.tsx` |
|------|------|
| CSS | `src/components/HomepageFeatures/styles.module.css` |
| Pattern | Three-column feature highlight cards |
| Confidence | **Verified** -- working in DWC tutorial |

**Rationale:** Communicates the tutorial's value proposition at a glance ("what will I learn?", "how is it structured?", "why should I use this?").

### Component Dependencies

All three components use only:
- `react` (already installed) -- `ReactNode` type
- `@docusaurus/Link` (already installed) -- client-side routing
- `@theme/Heading` (already installed) -- semantic heading component
- `clsx` (already installed) -- CSS class composition
- CSS Modules (built into Docusaurus webpack config) -- scoped styles

**No additional dependencies needed for components.**

---

## 5. Utility Libraries (already present)

| Package | Specifier | Resolved | Status |
|---------|-----------|----------|--------|
| `clsx` | `^2.0.0` | 2.1.1 | Already installed, no change |
| `prism-react-renderer` | `^2.3.0` | 2.4.1 | Already installed, no change |

---

## 6. Dev Dependencies

### Current (keep)
| Package | Version | Purpose |
|---------|---------|---------|
| `@docusaurus/module-type-aliases` | 3.9.2 | TypeScript aliases for Docusaurus internal modules |
| `@docusaurus/types` | 3.9.2 | TypeScript type definitions for config and plugin APIs |

### Add
| Package | Version | Purpose |
|---------|---------|---------|
| `@docusaurus/tsconfig` | 3.9.2 | Base tsconfig for Docusaurus projects |
| `typescript` | ~5.6.2 | TypeScript compiler for config and component type checking |

### CI Script Addition
Add `"typecheck": "tsc"` to `package.json` scripts, matching DWC tutorial. This enables the GitHub Actions workflow to run type checking before build.

---

## 7. Package Manager

| Item | Decision |
|------|----------|
| Package Manager | **npm** |
| Lockfile | `package-lock.json` |
| CI Command | `npm ci` |
| Confidence | **Verified** |

**Rationale:** Both tutorials use `package-lock.json`. The GitHub Actions workflows both use `npm ci`. The CLAUDE.md references `yarn` in commands, but the actual project infrastructure uses npm. The CLAUDE.md should be updated to reflect `npm` commands.

**What NOT to use:**
- **yarn** -- not actually configured; no `yarn.lock` exists; CLAUDE.md is misleading
- **pnpm** -- Docusaurus 3.x has documented issues with pnpm's strict module resolution; the official docs recommend npm or yarn

---

## 8. Node.js Runtime

| Item | Value |
|------|-------|
| Minimum | Node.js >= 20.0 (in `engines` field) |
| CI | Node.js 20 (in GitHub Actions) |
| Local | Node.js 22.22.0 (current development) |
| Confidence | **Verified** |

**Rationale:** Node 20 is the current LTS. Node 22 is the active release. Both work with Docusaurus 3.9.2. Pin CI to Node 20 for stability; allow local development on 22.

---

## 9. Deployment

| Item | Value |
|------|-------|
| Target | GitHub Pages |
| URL | `https://BasisHub.github.io/BBj-Beginner-Course/` |
| CI | GitHub Actions (`.github/workflows/deploy.yml`) |
| Branch | `master` (beginner) vs `main` (DWC) -- keep as-is |
| Confidence | **Verified** |

**Note:** The DWC tutorial deploys from `main` branch; the beginner tutorial deploys from `master`. This is fine -- they are separate repositories.

**CI workflow enhancement needed:** Add `typecheck` step before build (matching DWC tutorial):
```yaml
- name: Type check
  run: npm run typecheck
```

---

## 10. Configuration Changes Summary

### What changes in `docusaurus.config.ts` (migrated from .js)

| Area | Current | Target | Why |
|------|---------|--------|-----|
| File format | `.js` with JSDoc | `.ts` with native types | Type safety, IDE support, DWC parity |
| `future.v4` | `true` | **Remove** | DWC tutorial doesn't use it; prevents divergence |
| `markdown.mermaid` | absent | `true` | Enable mermaid code blocks |
| `themes` array | absent | mermaid + search-local | New features |
| `plugins` array | absent | ideal-image + zooming | New features |
| `onBrokenMarkdownLinks` | at top level | Move to `markdown.hooks` | Match DWC tutorial structure |
| `prism.additionalLanguages` | `['java']` | `['java', 'bash', 'bbj']` | BBj syntax highlighting |
| `themeConfig.mermaid` | absent | neutral/dark themes | Mermaid rendering |
| `themeConfig.zooming` | absent | `.markdown img` selector | Image zoom |

---

## 11. What NOT to Include

These were considered and rejected:

| Package | Why Not |
|---------|---------|
| `@docusaurus/theme-live-codeblock` | BBj cannot run in the browser; live code editing adds no value |
| `docusaurus-plugin-sass` | CSS Modules with plain CSS is sufficient; SCSS adds build complexity for no benefit |
| `@docusaurus/plugin-pwa` | A training site does not need offline support; adds service worker complexity |
| `docusaurus-plugin-typedoc` | No TypeScript API to document; this is a content site |
| `remark-math` / `rehype-katex` | No math notation needed in a BBj programming tutorial |
| `@giscus/react` | Comments/discussions are not needed for a structured course |
| Algolia DocSearch | Requires external service; local search is sufficient for ~20-40 pages |
| Docusaurus 4.x alpha | Not stable; both tutorials should upgrade together when 4.0 is released |

---

## 12. Complete Target `package.json`

```json
{
  "name": "bbj-beginner-tutorial",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "docusaurus": "docusaurus",
    "start": "docusaurus start",
    "build": "docusaurus build",
    "swizzle": "docusaurus swizzle",
    "deploy": "docusaurus deploy",
    "clear": "docusaurus clear",
    "serve": "docusaurus serve",
    "write-translations": "docusaurus write-translations",
    "write-heading-ids": "docusaurus write-heading-ids",
    "typecheck": "tsc"
  },
  "dependencies": {
    "@docusaurus/core": "3.9.2",
    "@docusaurus/plugin-ideal-image": "^3.9.2",
    "@docusaurus/preset-classic": "3.9.2",
    "@docusaurus/theme-mermaid": "^3.9.2",
    "@easyops-cn/docusaurus-search-local": "^0.52.3",
    "@mdx-js/react": "^3.0.0",
    "clsx": "^2.0.0",
    "docusaurus-plugin-zooming": "^1.0.0",
    "prism-react-renderer": "^2.3.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@docusaurus/module-type-aliases": "3.9.2",
    "@docusaurus/tsconfig": "3.9.2",
    "@docusaurus/types": "3.9.2",
    "typescript": "~5.6.2"
  },
  "browserslist": {
    "production": [
      ">0.5%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 3 chrome version",
      "last 3 firefox version",
      "last 5 safari version"
    ]
  },
  "engines": {
    "node": ">=20.0"
  }
}
```

---

## 13. Verification Method

Every version in this document was verified by reading the resolved `package.json` files inside `node_modules/` of the DWC tutorial (`/Users/beff/_workspace/bbj-dwc-tutorial/node_modules/`), which was installed and building successfully as of 2026-01-31. No version was taken from training data alone.

| Package | Verification Source |
|---------|-------------------|
| `@docusaurus/core` 3.9.2 | `node_modules/@docusaurus/core/package.json` |
| `react` 19.2.3 | `node_modules/react/package.json` |
| `@easyops-cn/docusaurus-search-local` 0.52.3 | `node_modules/@easyops-cn/docusaurus-search-local/package.json` |
| `docusaurus-plugin-zooming` 1.0.0 | `node_modules/docusaurus-plugin-zooming/package.json` |
| `@docusaurus/theme-mermaid` 3.9.2 | `node_modules/@docusaurus/theme-mermaid/package.json` |
| `@docusaurus/plugin-ideal-image` 3.9.2 | `node_modules/@docusaurus/plugin-ideal-image/package.json` |
| `typescript` 5.6.3 | `node_modules/typescript/package.json` |
| `@docusaurus/tsconfig` 3.9.2 | `node_modules/@docusaurus/tsconfig/package.json` |
| `@mdx-js/react` 3.1.1 | `node_modules/@mdx-js/react/package.json` |
| `clsx` 2.1.1 | `node_modules/clsx/package.json` |
| `prism-react-renderer` 2.4.1 | `node_modules/prism-react-renderer/package.json` |
| `prismjs` bbj grammar | `node_modules/prismjs/components/prism-bbj.js` exists |

---

*Stack research completed: 2026-01-31*
