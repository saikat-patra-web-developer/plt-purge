# Rule: Never Scan node_modules

- **Scope**: Entire repository.
- **Rule**: Never scan, search, walk, list, or grep files inside `node_modules/`.
- **Alternatives**: For packages/dependencies, read `package.json` or `package-lock.json`. For code searches, target `src/`, `public/`, or specific file paths.
