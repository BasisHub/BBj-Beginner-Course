# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Docusaurus 3.x documentation site for teaching BBj (Business Basic for Java) programming. The tutorial targets experienced programmers who are new to BBj development, not programming beginners.

## Common Commands

```bash
# Install dependencies
yarn

# Start local development server (hot reload enabled)
yarn start

# Build production static site to /build directory
yarn build

# Serve the built site locally
yarn serve

# Deploy to GitHub Pages (repo: BasisHub/BBj-Beginner-Course)
GIT_USER=<username> yarn deploy
```

## Architecture

**Documentation Framework**: Docusaurus 3.9.2 with React 19, configured to serve docs at the site root (no `/docs/` prefix).

**Content Structure** (`docs/` directory):
- `introduction/` - Course overview and links to official BBj documentation
- `getting-started/` - Environment setup, basic syntax, variables, loops
- `object-oriented/` - BBj's OOP syntax (classes, methods, object references)
- `web-development/` - BBj DWC (Desktop Web Client) for web apps
- `theming/` - Styling WebComponents, dark mode, shadow DOM with `::part`

**Key Configuration Files**:
- `docusaurus.config.js` - Main config (site metadata, navbar, footer, Prism syntax highlighting with Java support)
- `sidebars.js` - Tutorial navigation structure (5 ordered sections)
- `src/css/custom.css` - Infima CSS framework customizations (green/teal theme)

**External Resources** (referenced in footer/navbar):
- BBj Documentation: https://documentation.basis.cloud/BASISHelp/WebHelp/bbjobjects/bbjobjects.htm
- DWC Components: https://basishub.github.io/basis-next/#/dwc/
