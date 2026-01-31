# Technology Stack

**Analysis Date:** 2026-01-31

## Languages

**Primary:**
- JavaScript (ES2020+) - Configuration and module exports
- JSDoc/TypeScript annotations - Type checking in `docusaurus.config.js` and `sidebars.js`
- Markdown - All documentation content in `docs/` directory
- CSS - Custom theming via Infima CSS framework in `src/css/custom.css`

**Secondary:**
- HTML - Generated from JSX/Markdown by Docusaurus

## Runtime

**Environment:**
- Node.js 20.0 or higher (specified in `package.json` engines field)
- Currently testing on Node.js v22.22.0

**Package Manager:**
- npm (uses `package-lock.json` for dependency locking)
- Lockfile: Present at `package-lock.json` (v3, 684KB)

## Frameworks

**Core:**
- Docusaurus 3.9.2 - Static documentation site generator
  - Preset: `@docusaurus/preset-classic` 3.9.2 - Classic theme with sidebar navigation
  - Purpose: Generates static HTML documentation site from Markdown

**Frontend:**
- React 19.0.0 - UI component framework
- React DOM 19.0.0 - React rendering for browsers

**Markdown/Content:**
- @mdx-js/react 3.0.0 - MDX support for embedding React components in Markdown
- Purpose: Enables interactive code examples in documentation

**Code Highlighting:**
- prism-react-renderer 2.3.0 - Syntax highlighting for code blocks
- Supports: Java (configured in `docusaurus.config.js` line 125), JavaScript, and other languages

**Utilities:**
- clsx 2.0.0 - Utility for composing CSS class names (className={clsx(...)} pattern)

## Key Dependencies

**Critical:**
- `@docusaurus/core` 3.9.2 - Core Docusaurus engine and bundler
- `@docusaurus/preset-classic` 3.9.2 - Essential for default theme and sidebar functionality
- `react` 19.0.0 and `react-dom` 19.0.0 - Required for Docusaurus themes

**Type Checking (Dev Only):**
- `@docusaurus/module-type-aliases` 3.9.2 - TypeScript aliases for Docusaurus modules
- `@docusaurus/types` 3.9.2 - TypeScript type definitions for Docusaurus API

## Configuration

**Build Configuration:**
- `docusaurus.config.js` - Main configuration file
  - Site title: "Introduction to BBj Development"
  - Base URL: `/BBj-Beginner-Course/` (for GitHub Pages deployment)
  - Organization: BasisHub
  - Project: BBj-Beginner-Course
  - Syntax highlighting theme: GitHub light/Dracula dark
  - Java syntax highlighting enabled for BBj code examples

**Navigation Configuration:**
- `sidebars.js` - Defines tutorial sidebar structure with 5 sections:
  1. Introduction
  2. Getting Started
  3. Object Oriented Syntax in BBj
  4. File I/O and Data Access
  5. Web Development with BBj's DWC

**Styling:**
- `src/css/custom.css` - Custom CSS overrides for Infima framework
  - Color scheme: Green/teal theme (primary: #2e8555 light mode, #25c2a0 dark mode)
  - Responsive to `prefers-color-scheme` (respects user system preference)

**Environment:**
- `.env.local`, `.env.development.local`, `.env.test.local`, `.env.production.local` supported
- All `.env*` files in `.gitignore` (never committed)

## Platform Requirements

**Development:**
- Node.js >= 20.0
- npm or compatible package manager
- Modern terminal/shell for running scripts

**Production:**
- GitHub Pages (deployment target)
- URL: `https://BasisHub.github.io/BBj-Beginner-Course/`
- Static HTML hosting (no server-side runtime required)

**Browser Support:**
- Production: >0.5% market share, excluding dead browsers and Opera Mini
- Development: Last 3 Chrome/Firefox, last 5 Safari versions

## Development Scripts

Located in `package.json`:
- `yarn start` - Start local development server with hot reload on `http://localhost:3000`
- `yarn build` - Build production static site to `/build` directory
- `yarn serve` - Serve built site locally
- `yarn deploy` - Deploy to GitHub Pages (requires `GIT_USER` environment variable)
- `yarn docusaurus` - Run Docusaurus CLI directly
- `yarn swizzle` - Customize Docusaurus theme components
- `yarn clear` - Clear Docusaurus cache
- `yarn write-translations` - Generate translation files
- `yarn write-heading-ids` - Auto-generate heading IDs for anchor links

## Build Output

- Production build: `/build/` directory
- Docusaurus cache: `.docusaurus/` directory (excluded from git)
- Cache loader: `.cache-loader/` directory (excluded from git)

---

*Stack analysis: 2026-01-31*
