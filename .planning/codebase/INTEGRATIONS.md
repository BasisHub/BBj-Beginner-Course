# External Integrations

**Analysis Date:** 2026-01-31

## APIs & External Services

**Not applicable.** This is a static documentation site with no external API integrations or service dependencies.

## Data Storage

**Databases:**
- Not used. Content is stored as Markdown files in `docs/` directory.

**File Storage:**
- Local filesystem only. Documentation content stored in version control (Git).

**Caching:**
- `.docusaurus/` directory - Build cache (not committed)
- `.cache-loader/` directory - Webpack cache (not committed)

## Authentication & Identity

**Not applicable.** This is a public documentation site with no authentication requirements.

## Monitoring & Observability

**Error Tracking:**
- Not configured. This is a static documentation site.

**Logs:**
- Standard npm/Node.js console output during build and development.

## CI/CD & Deployment

**Hosting:**
- GitHub Pages
- Repository: https://github.com/BasisHub/BBj-Beginner-Course
- URL: https://BasisHub.github.io/BBj-Beginner-Course/
- Deployment branch: `master` (via GitHub Actions)

**CI Pipeline:**
- GitHub Actions workflow: `.github/workflows/deploy.yml`
  - Trigger: Push to `master` branch or manual dispatch (`workflow_dispatch`)
  - Node.js version: 20
  - Cache: npm dependencies cached automatically
  - Build step: `npm run build`
  - Deployment: Automatic via `actions/deploy-pages@v4`

**Workflow Details:**

```yaml
# Build phase
- Checkout code (actions/checkout@v4)
- Setup Node.js 20 with npm cache (actions/setup-node@v4)
- Install dependencies (npm ci)
- Build website (npm run build)
- Upload artifact from /build directory (actions/upload-pages-artifact@v3)

# Deploy phase
- Deploy to GitHub Pages (actions/deploy-pages@v4)
```

**Permissions:**
- `contents: read` - Read repository contents
- `pages: write` - Deploy to GitHub Pages
- `id-token: write` - OIDC authentication for deployments

**Concurrency:**
- Group: "pages"
- Cancel in-progress deployments when new push occurs

## Documentation Links (External References)

**Official BBj Resources:**
- BBj Online Documentation: https://documentation.basis.cloud/BASISHelp/WebHelp/bbjobjects/bbjobjects.htm
  - Referenced in navbar and footer (`docusaurus.config.js`)
  - Purpose: Link to official BBj object/API reference

- BASIS Online Help (General): https://documentation.basis.cloud/BASISHelp/WebHelp/index.htm
  - Referenced in footer
  - Purpose: General BASIS documentation landing page

**DWC (Desktop Web Client) Resources:**
- DWC Documentation: https://documentation.basis.cloud/BASISHelp/WebHelp/dwc/DWC_Overview.htm
  - Referenced in footer
  - Purpose: Desktop Web Client framework documentation

- DWC Components: https://basishub.github.io/basis-next/#/dwc/
  - Referenced in `docusaurus.config.js`
  - Purpose: Interactive DWC component library documentation

## Environment Configuration

**No external environment variables required.** This is a static site with no runtime configuration.

**Optional:**
- `GIT_USER` - Required only for `yarn deploy` command to authenticate with GitHub
- Development mode settings: `.env.development.local` supported (in `.gitignore`)

## Webhooks & Callbacks

**Not applicable.** Static documentation site with no webhook endpoints or callbacks.

## Static Assets & Resources

**External Image CDN:**
- Not used. All assets are local.

**Hosted via GitHub Pages:**
- Favicon: `static/img/favicon.png`
- Logo: `static/img/logo.png`
- Social card: `static/img/docusaurus-social-card.jpg`

**Files served from `static/` directory** (copied to build output as-is)

## Third-Party Dependencies Analysis

**Most Critical External Dependency:**
- React/React DOM (React 19.0.0)
  - Required: Yes, by Docusaurus theme
  - Type: Framework
  - Risk: Low (maintained by Meta, widely used)

**Code Highlighting:**
- prism-react-renderer 2.3.0
  - Required: Yes, for syntax highlighting
  - Type: Library
  - Risk: Low (maintained, focused library)

**All other dependencies:**
- Managed by Docusaurus (peer dependencies and transitive dependencies)
- No custom external service integrations

## Security Notes

- No secrets management required (static content only)
- No API keys or credentials in environment
- `.env*` files are gitignored but not needed for this project
- GitHub Actions deployment uses OIDC for authentication (no long-lived tokens)

---

*Integration audit: 2026-01-31*
