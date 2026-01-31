# Coding Conventions

**Analysis Date:** 2026-01-31

## Overview

This is a Docusaurus 3.9.2 documentation site with minimal custom code. The project uses JSDoc type annotations for configuration files and follows standard JavaScript/Node.js conventions for Docusaurus-based projects.

## Naming Patterns

**Files:**
- Configuration files: camelCase with descriptive names (e.g., `docusaurus.config.js`, `sidebars.js`)
- Documentation files: kebab-case directory names with `index.md` (e.g., `docs/getting-started/index.md`, `docs/object-oriented/index.md`)
- CSS files: camelCase (e.g., `custom.css`)
- Workflow files: kebab-case (e.g., `deploy.yml`)

**Variables:**
- camelCase for JavaScript/config variables (observed in `docusaurus.config.js`: `customCss`, `sidebarPath`, `organizationName`, `projectName`)
- UPPER_SNAKE_CASE for environment variables (observed in deploy workflow: `GIT_USER`)

**Objects/Config:**
- camelCase for object properties in configuration (`baseUrl`, `trailingSlash`, `organizationName`, `themeConfig`)
- Descriptive, self-documenting property names

## Code Style

**Formatting:**
- Standard Docusaurus project setup with no custom formatter configuration
- 2-space indentation (inferred from config files)
- Line comments use `//` for single-line comments
- Block comments use `/* */` for multi-line comments

**Type Annotations:**
- JSDoc `@type` annotations used for configuration files (see `docusaurus.config.js`)
- `@ts-check` pragma enables TypeScript checking in JavaScript files without converting to TypeScript
- Pattern: Type comments at top of config files
  ```javascript
  // @ts-check
  /** @type {import('@docusaurus/types').Config} */
  const config = { ... };
  ```

**Linting:**
- No ESLint or Prettier configuration present
- No custom linting rules enforced in this project
- Follows Docusaurus default conventions

## Import Organization

**Order in Configuration Files:**
1. Node.js/standard library imports
2. Framework imports (Docusaurus, React)
3. Relative imports

**Example from `docusaurus.config.js`:**
```javascript
import {themes as prismThemes} from 'prism-react-renderer';
// No local imports in config
```

**Path Aliases:**
- No path aliases configured in this project
- Docusaurus handles internal navigation via document slugs

## Comments

**When to Comment:**
- Configuration files include explanatory comments for major configuration sections
- Comments explain purpose and provide links to documentation (e.g., "See: https://docusaurus.io/docs/api/docusaurus-config")
- Complex business logic would be commented, but minimal custom code exists

**JSDoc/TSDoc:**
- JSDoc `@type` annotations used to declare types in JavaScript config files
- No other JSDoc patterns observed as minimal custom code exists

**Comment Style Examples from Codebase:**
```javascript
// Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
// GitHub pages deployment config.
// Even if you don't use internationalization, you can use this field to set useful metadata
```

## Configuration Conventions

**Environment Variables:**
- Defined in `.env` files (pattern visible in `.gitignore`: `.env.local`, `.env.development.local`, `.env.production.local`, `.env.test.local`)
- Deployment uses environment-passed credentials: `GIT_USER=<username> yarn deploy`
- No secrets committed to repository

**Build Configuration:**
- Docusaurus config controls all site behavior (`docusaurus.config.js`)
- Sidebar navigation defined separately in `sidebars.js` for maintainability
- Custom CSS in `src/css/custom.css` overrides Infima CSS framework variables

## Module Design

**Exports:**
- Configuration files use `export default` for the main config object
- `sidebars.js` exports sidebar configuration as default export

**Structure:**
```javascript
// docusaurus.config.js pattern
export default config;

// sidebars.js pattern
export default sidebars;
```

## Documentation Content Conventions

**Markdown Files:**
- Located in `docs/` directory with subdirectories by topic
- Frontmatter at top of files (YAML format): `slug: /`, `---` delimiters
- Headings use `#` markdown syntax, starting with `# Title`
- Sidebar navigation entries defined in `sidebars.js`, not auto-generated

**Content Structure:**
- Four main sections: introduction, getting-started, object-oriented, file-io, web-development
- Each section has an `index.md` file
- Links to external resources (BBj documentation, DWC components)

## Code Examples in Documentation

**BBj Code Examples:**
- Inline code using backticks: `` `variable_name` ``
- Code blocks with language specification (Java syntax highlighting configured):
  ````markdown
  ```java
  // Code example
  ```
  ````
- Docusaurus configured with Prism highlighting including Java language support

## Principles

**Simplicity:**
- Minimal custom JavaScript/React code - primarily configuration
- Configuration-driven approach
- Standard Docusaurus patterns followed

**Maintainability:**
- Type annotations in JavaScript provide type safety without TypeScript compilation
- Configuration centralized in `docusaurus.config.js`
- Navigation structure explicit in `sidebars.js` for easy modification

**Consistency:**
- Follows Docusaurus best practices and conventions
- No custom linting rules, relies on standard JavaScript conventions
- Comments link to official documentation for clarity

---

*Convention analysis: 2026-01-31*
