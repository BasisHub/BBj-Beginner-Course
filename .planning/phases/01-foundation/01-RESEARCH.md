# Phase 1: Foundation - Research

**Researched:** 2026-01-31
**Domain:** Docusaurus 3.x infrastructure migration (JS to TS, plugin installation, theme alignment)
**Confidence:** HIGH

## Summary

Phase 1 migrates the beginner tutorial's build infrastructure to match the sibling DWC tutorial at `/Users/beff/_workspace/bbj-dwc-tutorial`. This is not greenfield work -- every configuration, version number, and plugin setting has a proven reference implementation that builds and typechecks cleanly (verified 2026-01-31).

The migration involves 7 categories of work: (1) convert `docusaurus.config.js` and `sidebars.js` to TypeScript, (2) install 5 new packages (search, mermaid, ideal-image, zoom, TypeScript tooling), (3) configure all 5 plugins in the config, (4) switch the color theme from green to blue, (5) add external link icon CSS, (6) add `bbj` and `bash` to Prism languages, and (7) update CLAUDE.md and CI workflow. The existing code blocks are already tagged `bbj`, so no retagging is needed.

**Primary recommendation:** Follow the DWC tutorial config file-for-file. Every value has been verified against a working build. The order of operations should be: install deps first, then migrate config files, then CSS, then verify.

## Standard Stack

### Core (already installed, keep as-is)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `@docusaurus/core` | 3.9.2 (pinned) | Site framework | Current stable, matches DWC tutorial |
| `@docusaurus/preset-classic` | 3.9.2 (pinned) | Default preset (docs, blog, theme) | Required by Docusaurus |
| `react` / `react-dom` | ^19.0.0 (resolves 19.2.3) | UI runtime | Docusaurus 3.9.2 supports React 19 |
| `@mdx-js/react` | ^3.0.0 (resolves 3.1.1) | MDX support | Required for React in markdown |
| `clsx` | ^2.0.0 (resolves 2.1.1) | CSS class composition | Already installed |
| `prism-react-renderer` | ^2.3.0 (resolves 2.4.1) | Code syntax highlighting | Already installed |

### New Dependencies to Install

| Library | Version | Purpose | Confidence |
|---------|---------|---------|------------|
| `@easyops-cn/docusaurus-search-local` | ^0.52.3 | Client-side lunr.js search | HIGH -- verified in DWC tutorial |
| `@docusaurus/theme-mermaid` | ^3.9.2 | Mermaid diagram rendering | HIGH -- verified in DWC tutorial |
| `@docusaurus/plugin-ideal-image` | ^3.9.2 | Responsive image generation | HIGH -- verified in DWC tutorial |
| `docusaurus-plugin-zooming` | ^1.0.0 | Click-to-zoom on images | HIGH -- verified in DWC tutorial |

### New Dev Dependencies to Install

| Library | Version | Purpose | Confidence |
|---------|---------|---------|------------|
| `@docusaurus/tsconfig` | 3.9.2 (pinned) | Base tsconfig for Docusaurus projects | HIGH -- verified in DWC tutorial |
| `typescript` | ~5.6.2 (resolves 5.6.3) | TypeScript compiler | HIGH -- verified in DWC tutorial |

### Alternatives Considered

| Instead of | Could Use | Why Not |
|------------|-----------|---------|
| `@easyops-cn/docusaurus-search-local` | Algolia DocSearch | Requires external service, application process; overkill for ~20 pages |
| `@easyops-cn/docusaurus-search-local` | `docusaurus-lunr-search` | Less maintained, fewer config options |
| `docusaurus-plugin-zooming` | `plugin-image-zoom` | Different package, less stable than zooming |
| `@docusaurus/theme-mermaid` | `remark-mermaidjs` | Official Docusaurus theme handles SSR and dark mode correctly |

**Installation command:**
```bash
npm install @easyops-cn/docusaurus-search-local @docusaurus/theme-mermaid @docusaurus/plugin-ideal-image docusaurus-plugin-zooming
npm install -D @docusaurus/tsconfig typescript
```

## Architecture Patterns

### File-Level Changes Map

Every file that needs to change, and what happens to it:

```
bbj-beginner-tutorial/
├── package.json                    # ADD: 4 deps, 2 devDeps, "typecheck" script, rename to "bbj-beginner-tutorial"
├── tsconfig.json                   # CREATE: new file (extends @docusaurus/tsconfig)
├── docusaurus.config.js            # DELETE: replaced by .ts
├── docusaurus.config.ts            # CREATE: migrated from .js with full plugin config
├── sidebars.js                     # DELETE: replaced by .ts
├── sidebars.ts                     # CREATE: migrated from .js with typed SidebarsConfig
├── src/css/custom.css              # MODIFY: green→blue theme, add external link icon CSS
├── CLAUDE.md                       # MODIFY: yarn→npm commands, update config file references
├── .github/workflows/deploy.yml    # MODIFY: add typecheck step before build
└── docs/                           # NO CHANGE: all code blocks already tagged `bbj`
```

### Pattern 1: TypeScript Config Migration

**What:** Convert `docusaurus.config.js` to `docusaurus.config.ts`
**Confidence:** HIGH -- verified by reading Docusaurus 3.9.2 source code at `node_modules/@docusaurus/core/lib/server/config.js`

Docusaurus 3.9.2 searches for config files in this order: `.ts`, `.mts`, `.cts`, `.js`, `.mjs`, `.cjs`. It uses `loadFreshModule` to handle TypeScript natively -- no separate compilation step needed.

**Migration pattern:**
```typescript
// BEFORE (docusaurus.config.js):
import {themes as prismThemes} from 'prism-react-renderer';
/** @type {import('@docusaurus/types').Config} */
const config = { ... };
export default config;

// AFTER (docusaurus.config.ts):
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = { ... };
export default config;
```

Key differences:
- Replace `/** @type {import(...)} */` JSDoc with TypeScript `type` imports
- Replace `/** @type {import('@docusaurus/preset-classic').Options} */` with `satisfies Preset.Options`
- Replace `/** @type {import('@docusaurus/preset-classic').ThemeConfig} */` with `satisfies Preset.ThemeConfig`
- Remove `// @ts-check` (unnecessary in .ts files)

### Pattern 2: Sidebars TypeScript Migration

**What:** Convert `sidebars.js` to `sidebars.ts`
**Confidence:** HIGH -- exact pattern from DWC tutorial

```typescript
// BEFORE (sidebars.js):
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = { ... };
export default sidebars;

// AFTER (sidebars.ts):
import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
const sidebars: SidebarsConfig = { ... };
export default sidebars;
```

**Critical:** Update `sidebarPath` in docusaurus.config.ts from `'./sidebars.js'` to `'./sidebars.ts'`.

### Pattern 3: Plugin Configuration Structure

**What:** How plugins, themes, and themeConfig fit together in docusaurus.config.ts
**Confidence:** HIGH -- exact from DWC tutorial

```typescript
const config: Config = {
  // ... site metadata ...

  markdown: {
    mermaid: true,                              // Enable mermaid code blocks
    hooks: {
      onBrokenMarkdownLinks: 'warn',            // Moved from top-level
    },
  },

  themes: [
    '@docusaurus/theme-mermaid',                // Mermaid rendering theme
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      { /* search config */ },                  // Search is a theme, not a plugin
    ],
  ],

  plugins: [
    ['@docusaurus/plugin-ideal-image', { /* image config */ }],
    'docusaurus-plugin-zooming',                // No config needed (uses themeConfig)
  ],

  themeConfig: {
    // ... navbar, footer, prism ...
    mermaid: { theme: { light: 'neutral', dark: 'dark' } },
    zooming: { selector: '.markdown img', /* ... */ },
  } satisfies Preset.ThemeConfig,
};
```

**Important structural notes:**
- `@easyops-cn/docusaurus-search-local` goes in `themes` array, not `plugins`
- `docusaurus-plugin-zooming` goes in `plugins` array but its settings go in `themeConfig.zooming`
- `@docusaurus/theme-mermaid` goes in `themes` array AND requires `markdown.mermaid: true`
- `onBrokenMarkdownLinks` moves from top-level to `markdown.hooks.onBrokenMarkdownLinks`

### Anti-Patterns to Avoid

- **Keeping both .js and .ts config files:** Docusaurus picks `.ts` first, but having both creates confusion. Delete the `.js` files after creating `.ts` replacements.
- **Leaving `future.v4: true`:** The DWC tutorial does not use this flag. The v4 future flag changes routing, MDX parsing, and CSS module behavior. Remove it for parity.
- **Using `@docusaurus/theme-search-algolia`:** The beginner tutorial doesn't need external search infrastructure. Local search is sufficient and avoids service dependencies.
- **Putting search-local in plugins array:** It must be in `themes` array. Putting it in `plugins` will silently fail to render the search bar.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Search functionality | Custom search component | `@easyops-cn/docusaurus-search-local` | Lunr.js indexing, keyboard shortcuts, dark mode -- all built in |
| Mermaid rendering | Custom remark plugin | `@docusaurus/theme-mermaid` | Official plugin handles SSR, dark mode, zoom correctly |
| Image responsiveness | Custom image component | `@docusaurus/plugin-ideal-image` | Build-time image processing, blur-up, lazy loading |
| Image zoom | Custom modal overlay | `docusaurus-plugin-zooming` | Wraps medium-zoom with Docusaurus lifecycle hooks |
| BBj syntax highlighting | Custom Prism grammar | Built-in `prismjs/components/prism-bbj.js` | Already ships with Prism, 19 lines of grammar rules |
| External link icons | JavaScript link decoration | CSS `::after` pseudo-elements | Pure CSS, no runtime cost, automatic for all external links |

**Key insight:** Every feature in this phase has a Docusaurus plugin or built-in solution. There is zero custom code to write beyond configuration files and CSS.

## Common Pitfalls

### Pitfall 1: search-local in wrong array
**What goes wrong:** Search bar doesn't appear on the site.
**Why it happens:** `@easyops-cn/docusaurus-search-local` is a theme, not a plugin. Placing it in `plugins` array causes it to register but not render any UI.
**How to avoid:** Always put it in the `themes` array, using `require.resolve()` for the package path.
**Warning signs:** Build succeeds but no search bar visible in navbar.

### Pitfall 2: Missing markdown.mermaid flag
**What goes wrong:** Mermaid code blocks render as plain text code.
**Why it happens:** Adding `@docusaurus/theme-mermaid` to themes is necessary but not sufficient. You also need `markdown: { mermaid: true }` in the config.
**How to avoid:** Always set both: the theme in `themes` array AND `markdown.mermaid: true`.
**Warning signs:** Mermaid blocks show raw mermaid syntax instead of diagrams.

### Pitfall 3: Forgetting to update sidebarPath
**What goes wrong:** Build fails with "Cannot find module './sidebars.js'".
**Why it happens:** The preset config `docs.sidebarPath` still points to `'./sidebars.js'` after renaming to `.ts`.
**How to avoid:** Update `sidebarPath: './sidebars.ts'` in the preset config.
**Warning signs:** Build error immediately after switching to TypeScript configs.

### Pitfall 4: onBrokenMarkdownLinks location
**What goes wrong:** TypeScript compilation warning or runtime warning about deprecated config.
**Why it happens:** In Docusaurus 3.9.2, `onBrokenMarkdownLinks` at the top level is being moved to `markdown.hooks.onBrokenMarkdownLinks`. The DWC tutorial uses the new location.
**How to avoid:** Move it to `markdown.hooks` during the config migration.
**Warning signs:** Deprecation warning during build.

### Pitfall 5: npm vs yarn confusion
**What goes wrong:** Lock file conflicts, wrong dependency resolution, CI failures.
**Why it happens:** CLAUDE.md says `yarn` but the project uses `package-lock.json` and CI uses `npm ci`.
**How to avoid:** Standardize on npm everywhere. Update CLAUDE.md. Verify no `yarn.lock` exists (confirmed: none exists).
**Warning signs:** `yarn.lock` and `package-lock.json` both present; inconsistent installs.

### Pitfall 6: require.resolve in TypeScript
**What goes wrong:** TypeScript error on `require.resolve()` in docusaurus.config.ts.
**Why it happens:** Strict TypeScript configs may not recognize `require.resolve` without Node.js types.
**How to avoid:** The `@docusaurus/tsconfig` base config includes `"allowJs": true` and targets ES2022 with bundler moduleResolution. The DWC tutorial uses `require.resolve` in its `.ts` config and it passes `tsc --noEmit` cleanly. Follow the same pattern.
**Warning signs:** TypeScript error about `require` not being found.

## Code Examples

### Complete docusaurus.config.ts (target state)

Source: DWC tutorial `/Users/beff/_workspace/bbj-dwc-tutorial/docusaurus.config.ts`, adapted for beginner tutorial

```typescript
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Introduction to BBj Development',
  tagline: 'Learn BBj programming from the ground up',
  favicon: 'img/favicon.png',

  url: 'https://BasisHub.github.io',
  baseUrl: '/BBj-Beginner-Course/',

  organizationName: 'BasisHub',
  projectName: 'BBj-Beginner-Course',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  themes: [
    '@docusaurus/theme-mermaid',
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
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 85,
        max: 1030,
        min: 640,
        steps: 2,
        disableInDev: false,
      },
    ],
    'docusaurus-plugin-zooming',
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'BBj Beginner Tutorial',
      logo: {
        alt: 'BBj Logo',
        src: 'img/logo.png',
        href: '/',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorial',
        },
        {
          href: 'https://documentation.basis.cloud/BASISHelp/WebHelp/bbjobjects/bbjobjects.htm',
          label: 'BBj Documentation',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Course',
          items: [
            {
              label: 'Introduction',
              to: '/',
            },
            {
              label: 'Getting Started',
              to: '/getting-started',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'BASIS Online Help',
              href: 'https://documentation.basis.cloud/BASISHelp/WebHelp/index.htm',
            },
            {
              label: 'DWC Documentation',
              href: 'https://documentation.basis.cloud/BASISHelp/WebHelp/dwc/DWC_Overview.htm',
            },
          ],
        },
      ],
      copyright: `Copyright \u00a9 ${new Date().getFullYear()} BASIS International Ltd. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['java', 'bash', 'bbj'],
    },
    mermaid: {
      theme: {
        light: 'neutral',
        dark: 'dark',
      },
    },
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
  } satisfies Preset.ThemeConfig,
};

export default config;
```

### Complete sidebars.ts (target state)

Source: adapted from beginner tutorial's current sidebars.js

```typescript
import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'introduction/index',
      label: 'Introduction',
    },
    {
      type: 'doc',
      id: 'getting-started/index',
      label: 'Set Up your Environment and Get Started',
    },
    {
      type: 'doc',
      id: 'object-oriented/index',
      label: 'Object Oriented Syntax in BBj',
    },
    {
      type: 'doc',
      id: 'file-io/index',
      label: 'File I/O and Data Access',
    },
    {
      type: 'doc',
      id: 'web-development/index',
      label: 'Web Development with BBj\'s DWC',
    },
  ],
};

export default sidebars;
```

### Complete tsconfig.json (target state)

Source: DWC tutorial `/Users/beff/_workspace/bbj-dwc-tutorial/tsconfig.json`

```json
{
  "extends": "@docusaurus/tsconfig",
  "compilerOptions": {
    "baseUrl": "."
  },
  "exclude": [".docusaurus", "build"]
}
```

### Complete custom.css (target state)

Source: DWC tutorial `/Users/beff/_workspace/bbj-dwc-tutorial/src/css/custom.css`, exact copy

```css
/**
 * Any CSS included here will be global. The classic template
 * bundles Infima by default. Infima is a CSS framework designed to
 * work well for content-centric websites.
 */

/* You can override the default Infima variables here. */
:root {
  --ifm-color-primary: #2563eb;
  --ifm-color-primary-dark: #1d4ed8;
  --ifm-color-primary-darker: #1e40af;
  --ifm-color-primary-darkest: #1e3a8a;
  --ifm-color-primary-light: #3b82f6;
  --ifm-color-primary-lighter: #60a5fa;
  --ifm-color-primary-lightest: #93c5fd;
  --ifm-code-font-size: 95%;
  --docusaurus-highlighted-code-line-bg: rgba(0, 0, 0, 0.1);
}

/* For readability concerns, you should choose a lighter palette in dark mode. */
[data-theme='dark'] {
  --ifm-color-primary: #60a5fa;
  --ifm-color-primary-dark: #3b82f6;
  --ifm-color-primary-darker: #2563eb;
  --ifm-color-primary-darkest: #1d4ed8;
  --ifm-color-primary-light: #93c5fd;
  --ifm-color-primary-lighter: #bfdbfe;
  --ifm-color-primary-lightest: #dbeafe;
  --docusaurus-highlighted-code-line-bg: rgba(0, 0, 0, 0.3);
}

/* External link icon - targets links starting with http:// or https:// */
a[href^="http://"]::after,
a[href^="https://"]::after {
  content: "";
  display: inline-block;
  width: 0.875em;
  height: 0.875em;
  margin-left: 0.25em;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="%23525252"><path d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z"/></svg>');
  background-repeat: no-repeat;
  background-size: contain;
  vertical-align: text-bottom;
}

/* Dark mode external link icon - lighter color for better contrast */
[data-theme='dark'] a[href^="http://"]::after,
[data-theme='dark'] a[href^="https://"]::after {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="%23b4b4b4"><path d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z"/></svg>');
}
```

### CI Workflow Addition

Source: DWC tutorial pattern (no CI workflow file exists in DWC tutorial, but the pattern follows standard Docusaurus TypeScript projects)

Add before the "Build website" step in `.github/workflows/deploy.yml`:
```yaml
      - name: Type check
        run: npm run typecheck
```

### Complete target package.json

Source: `.planning/research/STACK.md` section 12, verified against DWC tutorial

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

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `docusaurus.config.js` with JSDoc types | `docusaurus.config.ts` with native TypeScript | Docusaurus 3.0+ | Full type safety, IDE autocomplete |
| `onBrokenMarkdownLinks` at top level | `markdown.hooks.onBrokenMarkdownLinks` | Docusaurus 3.x (migration toward 4.0) | Deprecation warning if left at top level |
| `future.v4: true` flag | Remove (wait for Docusaurus 4.0) | Ongoing | v4 flag changes routing/MDX/CSS behavior; don't use unless both tutorials adopt it together |

**Deprecated/outdated:**
- `future.v4: true` -- experimental flag that changes behavior incompatibly. Remove for DWC parity.
- `onBrokenMarkdownLinks` at config top level -- moving to `markdown.hooks` object.
- JSDoc `@type` annotations in config files -- replaced by native TypeScript types.

## Inventory of Current State

Critical findings from reading every file in the beginner tutorial:

### Code Block Tags
All existing code blocks across all 5 doc files are **already tagged `bbj`**. No retagging needed. Specifically:
- `docs/getting-started/index.md`: 13 code blocks, all ` ```bbj `
- `docs/object-oriented/index.md`: 4 code blocks, all ` ```bbj `
- `docs/file-io/index.md`: 16 code blocks, all ` ```bbj `
- `docs/introduction/index.md`: 0 code blocks
- `docs/web-development/index.md`: 0 code blocks

### Files That Don't Exist Yet (must create)
- `tsconfig.json` -- does not exist
- `docusaurus.config.ts` -- does not exist (will replace `.js`)
- `sidebars.ts` -- does not exist (will replace `.js`)

### Files That Don't Exist (confirmed absent, good)
- `yarn.lock` -- does not exist (npm is the package manager)

### Prism BBj Grammar
Confirmed present at `node_modules/prismjs/components/prism-bbj.js`. The grammar covers:
- Comments (REM-based)
- Strings (single and double quoted)
- Numbers (integers and decimals with optional scientific notation)
- 70+ keywords (class, classend, method, methodend, field, declare, etc.)
- Functions (word followed by opening paren)
- Boolean constants (BBjAPI.TRUE, BBjAPI.FALSE)
- Operators (arithmetic, comparison, logical)
- Punctuation

### CI Workflow
`.github/workflows/deploy.yml` exists, uses `npm ci` and `npm run build`. Needs only the addition of a typecheck step.

### Static Assets
`static/img/` contains logo.png, favicon.png, and Docusaurus placeholder files. No images in docs content yet (no image zoom or ideal-image to test against real content, but plugins should still be installed and configured).

## Open Questions

1. **Mermaid spot-check content**
   - What we know: No mermaid blocks exist in current content. A test block is needed to verify the plugin works.
   - What's unclear: Whether to add a mermaid block to existing content or create a temporary test.
   - Recommendation: Add a small architecture diagram mermaid block to `docs/introduction/index.md` as a genuine content addition (course structure overview). This serves dual purpose: spot-check and real content value. Alternatively, verify during the build and remove after confirming.

2. **Image zoom spot-check**
   - What we know: No images are embedded in markdown docs currently (only iframes for YouTube videos). The `static/img/` folder has site chrome images only.
   - What's unclear: How to spot-check zoom and ideal-image with no doc images.
   - Recommendation: The plugins should be installed and configured now. Spot-checking can happen when content with images is added in Phase 2/3. The plugins are low-risk (they're already proven in DWC tutorial) and won't cause build failures if no images exist.

3. **`colorMode.defaultMode` addition**
   - What we know: DWC tutorial has `defaultMode: 'light'` in colorMode config. Beginner tutorial currently only has `respectPrefersColorScheme: true`.
   - What's unclear: Whether this is a meaningful difference.
   - Recommendation: Add `defaultMode: 'light'` for DWC parity. It only affects the fallback when the user's OS has no dark/light preference set.

## Sources

### Primary (HIGH confidence)
- DWC tutorial config files -- read directly from `/Users/beff/_workspace/bbj-dwc-tutorial/` (docusaurus.config.ts, sidebars.ts, tsconfig.json, package.json, src/css/custom.css)
- DWC tutorial build verification -- `npm run build` and `npx tsc --noEmit` both pass (verified 2026-01-31)
- Docusaurus source code -- `node_modules/@docusaurus/core/lib/server/config.js` confirms `.ts` config support
- Prism BBj grammar -- `node_modules/prismjs/components/prism-bbj.js` confirmed present
- Stack research -- `.planning/research/STACK.md` with all versions verified against DWC tutorial node_modules
- Beginner tutorial current files -- all 5 doc files, config files, CI workflow, CSS, package.json read directly

### Secondary (MEDIUM confidence)
- None needed -- all findings verified against local reference implementation

### Tertiary (LOW confidence)
- None -- no WebSearch-only findings

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- every version and config verified against working DWC tutorial build
- Architecture: HIGH -- exact file-for-file migration from proven reference implementation
- Pitfalls: HIGH -- pitfalls discovered by reading Docusaurus source code and comparing the two tutorial configs

**Research date:** 2026-01-31
**Valid until:** 2026-03-31 (stable; all Docusaurus 3.9.2 with pinned versions)
