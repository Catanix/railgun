# RAILGUN CLI Development TODO

## Runtime (00-runtime)
- **Date:** 2026-06-16
- **Task:** Build CLI tool for RAILGUN (Node.js + TypeScript)
- **Scope:** `railgun add`, `railgun init`, `railgun remove`

## Rails Used So Far

### 01-domain
- **glossary.md** — Terms: CLI, preset, wizard, scaffold, activation, integration mode, config file, command, overlay, analyze, apply, remove

### 02-blueprint  
- **state-management.md** — N/A for CLI (stateless)
- **cli-architecture.md** — Node.js project structure, TypeScript config, modern CLI patterns, command flow, dependencies, color scheme
- **AGENTS.md** — Updated dispatcher with CLI Architecture rail

### 03-validation
- **unit-tests.md** — CLI-specific testing: mocking inquirer, filesystem testing, test isolation, required test cases (happy path, decline, existing files, integration modes, idempotency)
- **AGENTS.md** — Updated dispatcher with CLI test requirements

### 04-guardrails
- **checklist.md** — Added CLI-specific checks: command registration, path handling, config detection, graceful exit, ASCII rendering, color consistency, TypeScript compilation, test pass rate
- **AGENTS.md** — Updated dispatcher with CLI guardrail requirements

### 00-runtime
- **current.md** — Updated sprint status: CLI v0.1.0 completed, documentation rewrite done

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

### [2026-06-16 14:35] Rails Update for Next Contributing
- ✅ Updated `00-runtime/current.md` — added sprint status, completed tasks, active CLI work
- ✅ Updated `01-domain/glossary.md` — added CLI terms: Command, Preset, Wizard, Scaffold, Activation, Integration Mode, Config File
- ✅ Added `02-blueprint/cli-architecture.md` — CLI structure, dependencies, color scheme, command patterns, error handling
- ✅ Updated `02-blueprint/AGENTS.md` — added CLI Architecture dispatcher
- ✅ Updated `03-validation/unit-tests.md` — added CLI-specific testing: mocking inquirer, filesystem testing, test isolation, required test cases
- ✅ Updated `03-validation/AGENTS.md` — added CLI test requirements
- ✅ Updated `04-guardrails/checklist.md` — added CLI-specific checks: command registration, path handling, config detection, graceful exit, ASCII rendering, color consistency, TypeScript compilation, test pass rate
- ✅ Updated `04-guardrails/AGENTS.md` — added CLI guardrail requirements
- ✅ All rails now support next phase of RAILGUN development

### Next Contributing Ready
- ✅ Rails documented for: CLI tool development, preset creation, testing patterns
- ✅ Glossary has all terms needed for CLI contributions
- ✅ Blueprint has architecture for new commands
- ✅ Validation has testing patterns for interactive CLI
- ✅ Guardrails have CLI-specific checks before declaring complete
- ✅ All files committed and pushed to GitHub

