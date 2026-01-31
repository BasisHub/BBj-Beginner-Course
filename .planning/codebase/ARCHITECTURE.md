# Architecture

**Analysis Date:** 2026-01-31

## Pattern Overview

**Overall:** Static Documentation Site - Single Page Application (SPA) via Docusaurus

**Key Characteristics:**
- Content-driven architecture with Markdown source files as the primary input
- Build-time static site generation (SSG) producing pure HTML/CSS/JS
- No runtime backend - entirely client-side after deployment
- Declarative navigation and configuration structure
- Zero custom React components or dynamic features

## Layers

**Configuration Layer:**
- Purpose: Defines site structure, metadata, branding, and Docusaurus behavior
- Location: Root directory (`docusaurus.config.js`, `sidebars.js`, `package.json`)
- Contains: Site title, URLs, navbar/footer links, theme configuration, plugin settings
- Depends on: None (static configuration)
- Used by: Docusaurus CLI and build system

**Content Layer:**
- Purpose: Core tutorial material written in Markdown with YAML frontmatter
- Location: `docs/` directory with five subdirectories for course sections
- Contains: Educational content, embedded iframes, links to external resources
- Depends on: Docusaurus markdown processor, syntax highlighting
- Used by: Build system to generate HTML pages

**Styling Layer:**
- Purpose: Global CSS customizations and theme configuration
- Location: `src/css/custom.css`, `docusaurus.config.js` (theme colors)
- Contains: Infima CSS framework variable overrides (green/teal color scheme), syntax highlighting colors
- Depends on: Infima CSS framework (bundled with Docusaurus)
- Used by: All HTML pages for visual presentation

**Asset Layer:**
- Purpose: Static images, logos, favicons, and course-related media
- Location: `static/img/` directory (organized by type)
- Contains: Logo, favicon, social cards, course images
- Depends on: File system (no processing required)
- Used by: HTML templates and markdown content

**Build & Deployment Layer:**
- Purpose: Automation for generating production artifacts and publishing
- Location: `.github/workflows/deploy.yml`, npm scripts in `package.json`
- Contains: CI/CD pipeline, build commands, deployment steps
- Depends on: Node.js 20+, npm/yarn, GitHub Actions runner
- Used by: GitHub push triggers to master branch

## Data Flow

**Content Publishing Flow:**

1. Author writes/edits Markdown files in `docs/[section]/` directories
2. Markdown files include YAML frontmatter (slug, navigation hints)
3. `docusaurus build` command invokes Docusaurus CLI
4. Docusaurus processes:
   - `sidebars.js` to determine navigation order (5 ordered sections)
   - `docusaurus.config.js` for site metadata and Prism syntax highlighting
   - All Markdown files through MDX processor (Markdown + JSX support)
5. Build outputs static HTML files to `build/` directory
6. CSS is processed from `src/css/custom.css` and bundled with Infima defaults
7. Assets are copied from `static/` to `build/`
8. Optional: GitHub Actions deploys `build/` to GitHub Pages on master push

**Development Flow:**

1. Developer runs `yarn start` (docusaurus start)
2. Docusaurus starts local dev server with hot module reload
3. Changes to markdown/CSS trigger automatic page refresh
4. No compilation or build step needed during development

**State Management:**

- No runtime state - all content is static
- Navigation state is handled by browser (URL routing)
- User preferences (dark mode) stored in localStorage by Docusaurus theme plugin
- Syntax highlighting state determined at build time via Prism configuration

## Key Abstractions

**Sidebar Navigation:**
- Purpose: Defines tutorial structure and reading order
- Examples: `sidebars.js` declares 5 sequential doc sections
- Pattern: Declarative array of doc IDs with labels, processed by Docusaurus plugin

**Markdown Documents as Pages:**
- Purpose: Each Markdown file becomes one website page
- Examples: `docs/introduction/index.md` → `/` (home page), `docs/getting-started/index.md` → `/getting-started`
- Pattern: File path + YAML frontmatter (`slug: /`) determines URL routing

**Configuration as Code:**
- Purpose: Site structure and behavior defined in JavaScript objects
- Examples: `docusaurus.config.js` defines navbar items, footer links, branding
- Pattern: JSDoc type annotations for IDE autocomplete and validation

**Theming via CSS Variables:**
- Purpose: Centralized color scheme management without touching component code
- Examples: `--ifm-color-primary`, `--ifm-color-primary-dark` in `src/css/custom.css`
- Pattern: CSS custom properties (variables) override Infima defaults for light/dark modes

## Entry Points

**Development Entry Point:**
- Location: `package.json` scripts (yarn start)
- Triggers: Developer runs `yarn start`
- Responsibilities: Starts Docusaurus dev server on localhost:3000 with hot reload

**Build Entry Point:**
- Location: `package.json` scripts (yarn build), invoked by CI/CD
- Triggers: `npm run build` command (manual or via `.github/workflows/deploy.yml`)
- Responsibilities: Generates static HTML/CSS/JS in `build/` directory for deployment

**Content Entry Point:**
- Location: `docs/introduction/index.md` (slug: /)
- Triggers: User navigates to site root URL
- Responsibilities: Displays course overview and learning path

**Navigation Entry Point:**
- Location: Navbar defined in `docusaurus.config.js`
- Triggers: User clicks "Tutorial" link or browses sidebar
- Responsibilities: Routes to five main sections via `sidebars.js` structure

## Error Handling

**Strategy:** Build-time error prevention via strict Docusaurus configuration

**Patterns:**
- `onBrokenLinks: 'throw'` - Fails build if any internal links are broken
- `onBrokenMarkdownLinks: 'warn'` - Warns (but continues) for markdown reference issues
- TypeScript JSDoc annotations in config files for catching type errors
- GitHub Actions fails deployment if `npm run build` exits non-zero

## Cross-Cutting Concerns

**Logging:** No client-side logging - pure static site

**Validation:** Docusaurus CLI validates markdown syntax and link integrity at build time

**Authentication:** Not applicable - public documentation site, no user accounts

**Accessibility:** Handled by Docusaurus theme (semantic HTML5), Infima CSS framework provides WCAG baseline

**Internationalization:** Configured for English only (`i18n.defaultLocale: 'en'`, `locales: ['en']`)

---

*Architecture analysis: 2026-01-31*
