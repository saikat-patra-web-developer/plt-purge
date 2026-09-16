# AGENTS.md

## CRITICAL DIRECTIVE: DO NOT SCAN `node_modules`

All AI agents, subagents, and automated tools operating within this repository **MUST** strictly adhere to the following rules:

### 1. Zero Scanning of `node_modules`
- **NEVER** scan, index, walk, list, search, or grep inside the `node_modules` directory.
- **NEVER** target `node_modules` in file-search tools (`find_by_name`, `grep_search`, `list_dir`, or shell commands).
- If performing codebase-wide searches, always ensure `node_modules` is explicitly excluded from search glob patterns and paths.

### 2. Dependency & Package Inspection
- When inspecting project dependencies, library versions, or scripts:
  - Check `package.json` or `package-lock.json` directly.
  - **DO NOT** search inside `node_modules` to inspect package sources or typings unless the user specifically provides a direct, exact file path to a single file.

### 3. Excluded Build & Artifact Directories
The following directories must also be excluded from scans:
- `node_modules/`
- `dist/`
- `dist-ssr/`
- `.git/`

### 4. Search & Grep Tool Guidelines
- When using `grep_search`, always specify specific directory targets (e.g., `src/`, `scripts/`, `public/`) rather than the workspace root, or ensure `node_modules` is excluded.
- When using `find_by_name`, target specific source directories or utilize ignore patterns.
