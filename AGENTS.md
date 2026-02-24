# AGENTS.md

## Cursor Cloud specific instructions

This is a static portfolio website (HTML/CSS/vanilla JS) with no build step. Tailwind CSS and Font Awesome are loaded via CDN.

### Serving the site

Serve from the repo root with any static HTTP server:
```
python3 -m http.server 8000
```
Then open `http://localhost:8000/` in a browser.

### Linting

Linters match what CI runs (see `.github/workflows/ci.yml`):
```
npx htmlhint "**/*.html" --config .htmlhintrc
npx stylelint "**/*.css"
```
Note: `stylelint` currently reports ~40 pre-existing errors in `style.css`. These are not regressions.

### Key files

| File | Purpose |
|---|---|
| `index.html` | Single-page portfolio |
| `style.css` | Custom CSS with 3 color palettes, print & focus-mode styles |
| `script.js` | Theme toggle, palette switching, tabs, scroll, print, focus mode |
| `.htmlhintrc` | HTMLHint config |
| `.stylelintrc.json` | Stylelint config (extends `stylelint-config-standard`) |
