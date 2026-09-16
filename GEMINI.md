# GEMINI.md - Workspace Rules

## CRITICAL DIRECTIVE: DO NOT SCAN `node_modules`

- **NEVER** scan, index, walk, list, search, or grep within `node_modules/`.
- **NEVER** run recursive search tools across `node_modules`. Always restrict search paths to `src/`, `public/`, `scripts/`, or root configuration files.
- Inspect `package.json` or `package-lock.json` for dependency details instead of searching inside `node_modules`.
- Exclude `node_modules/`, `dist/`, and `.git/` from all automated file scans and tool calls.
