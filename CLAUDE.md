# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Docusaurus 3.x documentation site for teaching BBj (Business Basic for Java) programming. The tutorial targets experienced programmers who are new to BBj development, not programming beginners.

## Common Commands

```bash
# Install dependencies
npm install

# Start local development server (hot reload enabled)
npm start

# Build production static site to /build directory
npm run build

# Serve the built site locally
npm run serve

# Type check TypeScript config files
npm run typecheck

# Deploy to GitHub Pages (repo: BasisHub/BBj-Beginner-Course)
GIT_USER=<username> npm run deploy
```

## Architecture

**Documentation Framework**: Docusaurus 3.9.2 with React 19, configured to serve docs at the site root (no `/docs/` prefix).

**Content Structure** (`docs/` directory):
- `introduction/` - Course overview and links to official BBj documentation
- `getting-started/` - Environment setup, basic syntax, variables, loops
- `object-oriented/` - BBj's OOP syntax (classes, methods, object references)
- `file-io/` - File I/O and record-oriented data access
- `web-development/` - BBj DWC (Desktop Web Client) for web apps (links to DWC Course for advanced topics)

**Key Configuration Files**:
- `docusaurus.config.ts` - Main config (site metadata, navbar, footer, plugins: local search, mermaid diagrams, ideal-image, zoom, Prism syntax highlighting with BBj/Java/Bash support)
- `sidebars.ts` - Tutorial navigation structure (typed SidebarsConfig, 5 ordered sections)
- `src/css/custom.css` - Infima CSS framework customizations (blue theme matching DWC tutorial, external link icons)

**External Resources** (referenced in footer/navbar):
- BBj Documentation: https://documentation.basis.cloud/BASISHelp/WebHelp/bbjobjects/bbjobjects.htm
- DWC Components: https://basishub.github.io/basis-next/#/dwc/
