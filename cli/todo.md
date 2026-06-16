# RAILGUN CLI Development TODO

## Runtime (00-runtime)
- **Date:** 2026-06-16
- **Task:** Build CLI tool for RAILGUN (Node.js + TypeScript)
- **Scope:** `railgun add`, `railgun init`, `railgun remove`

## Rails Used So Far

### 01-domain
- **glossary.md** — Terms: CLI, preset, wizard, scaffold

### 02-blueprint  
- **state-management.md** — N/A for this tool (CLI is stateless)
- **Needs:** Node.js project structure, TypeScript config, modern CLI patterns

### 03-validation
- **Needs:** Tests for CLI commands (add/remove/init)

### 04-guardrails
- **checklist.md** — Before push: tests pass, README updated, version bumped

## Progress Log

### [2026-06-16 14:02] Discovery Phase
- Read existing RAILGUN structure
- Defined CLI requirements: 3 commands, presets, ASCII art, colored output
- Decision: Use Node.js + TypeScript, `commander` for CLI, `chalk` for colors, `inquirer` for wizard

### [2026-06-16 14:15] Execution Phase — Scaffold Complete
- ✅ package.json, tsconfig.json created
- ✅ src/ structure: commands/, utils/
- ✅ ASCII art with pink colors
- ✅ `railgun add` — creates .railgun/ structure, handles existing files
- ✅ `railgun init` — wizard with 4 presets (react, vue, python, golang)
- ✅ `railgun remove` — removes .railgun/, preserves custom AGENTS.md
- ✅ Pink notice box about basic config mode
- ✅ CLI builds and runs successfully
- ✅ Tested `railgun add` in /tmp/test-railgun — structure created correctly

### Next Steps
- [ ] Add Jest tests for commands
- [ ] Update root README with CLI installation instructions
- [ ] Add npm badges to README
- [ ] Publish to npm (optional)
