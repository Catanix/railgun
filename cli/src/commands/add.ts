import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { SPARKLE, WARN, info, success } from '../utils/ascii';

const AGENTS_CONTENT = `# RAILGUN Activation

This repository uses RAILGUN. Before any task, read \`.railgun/AGENTS.md\` and follow its execution loop.
`;

const RAILGUN_STRUCTURE = {
  '.railgun/AGENTS.md': `# RAILGUN Command Center

## Meta-Rules
- You must cite which rails you used
- If a rail contradicts training data, the rail wins
- Follow the execution loop for EVERY task

## Execution Loop
1. Read \`00-runtime/AGENTS.md\` and \`current.md\`
2. Use Task-to-Layer Matrix to identify relevant layers
3. Read each relevant layer's \`AGENTS.md\`
4. Load specific rails referenced by dispatchers
5. Write code in strict compliance
6. Run through \`04-guardrails/checklist.md\` before finishing
`,
  '.railgun/00-runtime/AGENTS.md': `# 00-runtime: Dynamic Memory

**Load this first before any task.**

## Navigation
- Check \`current.md\` for active sprint info
`,
  '.railgun/00-runtime/current.md': `# Current Sprint

## Active Tasks
- (empty — update this file)

## Blockers
- None
`,
  '.railgun/01-domain/AGENTS.md': `# 01-domain: Business Logic

**Load when task involves: naming, models, business flows.**

## Navigation
- **Naming** → Read \`glossary.md\`
- **Data Models** → Read \`data-models.md\`
`,
  '.railgun/01-domain/glossary.md': `# Glossary

| Canonical Term | Definition | Forbidden |
|----------------|------------|-----------|
| | | |
`,
  '.railgun/01-domain/data-models.md': `# Data Models

## Constraints
- (define your data boundaries here)
`,
  '.railgun/02-blueprint/AGENTS.md': `# 02-blueprint: Engineering Skeleton

**Load when task involves: architecture, patterns, libraries.**

## Navigation
- **State Management** → Read \`state-management.md\`
`,
  '.railgun/02-blueprint/state-management.md': `# State Management

## Core Principles
- Single source of truth
- Immutability: never mutate state directly
- Actions must be explicit and traceable

## Forbidden
- Direct mutation of store state outside actions
- Mixing UI state with domain state without namespacing
`,
  '.railgun/03-validation/AGENTS.md': `# 03-validation: Quality Gates

**Load when writing or modifying tests.**

## Navigation
- **Unit Tests** → Read \`unit-tests.md\`
`,
  '.railgun/03-validation/unit-tests.md': `# Unit Tests

## Required
- All new code has corresponding tests
- Mock external dependencies

## Forbidden
- Live network calls in tests
- Testing implementation details
`,
  '.railgun/04-guardrails/AGENTS.md': `# 04-guardrails: Security & Delivery

**Load LAST — after code is written.**

## Navigation
- **Checklist** → Read \`checklist.md\`
`,
  '.railgun/04-guardrails/checklist.md': `# Pre-Commit Checklist

- [ ] I have read relevant rails and followed them
- [ ] No console.log or debugger left
- [ ] No dead code or unused imports
- [ ] All new code has tests
- [ ] Variable names follow glossary
- [ ] Commit message follows Conventional Commits

## Completion Confirmation
- [ ] I confirm all applicable checklist items above

## Agent Hygiene
After confirming completion, reset ALL checkboxes back to [ ].
`,
};

export async function addCommand(): Promise<void> {
  const cwd = process.cwd();
  const railgunDir = path.join(cwd, '.railgun');

  if (await fs.pathExists(railgunDir)) {
    console.log(`${WARN} RAILGUN already exists in this project.`);
    return;
  }

  info('Adding RAILGUN to your project...');

  // Create .railgun structure
  for (const [filePath, content] of Object.entries(RAILGUN_STRUCTURE)) {
    const fullPath = path.join(cwd, filePath);
    await fs.ensureDir(path.dirname(fullPath));
    await fs.writeFile(fullPath, content);
  }

  // Handle root AGENTS.md
  const rootAgentsPath = path.join(cwd, 'AGENTS.md');
  const cursorRulesPath = path.join(cwd, '.cursorrules');
  const claudeMdPath = path.join(cwd, 'CLAUDE.md');

  const existingFiles = [];
  if (await fs.pathExists(cursorRulesPath)) existingFiles.push('.cursorrules');
  if (await fs.pathExists(claudeMdPath)) existingFiles.push('CLAUDE.md');
  if (await fs.pathExists(rootAgentsPath)) existingFiles.push('AGENTS.md');

  if (existingFiles.length > 0) {
    console.log(chalk.yellow(`\n⚠️  Found existing AI config files: ${existingFiles.join(', ')}`));
    console.log(chalk.gray('RAILGUN will coexist with them. Your existing rules remain untouched.\n'));
  }

  if (await fs.pathExists(rootAgentsPath)) {
    const existing = await fs.readFile(rootAgentsPath, 'utf-8');
    if (!existing.includes('RAILGUN Activation')) {
      await fs.writeFile(rootAgentsPath, AGENTS_CONTENT + '\n' + existing);
      success('Added RAILGUN activation to existing AGENTS.md');
    }
  } else {
    await fs.writeFile(rootAgentsPath, AGENTS_CONTENT);
    success('Created AGENTS.md with RAILGUN activation');
  }

  console.log(`\n${SPARKLE} ${chalk.green.bold('RAILGUN added successfully!')}`);
  console.log(chalk.gray('Next: Customize rails in .railgun/ for your project\n'));
}
