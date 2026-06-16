import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { ROCKET, SPARKLE, success, info } from '../utils/ascii';
import { showConfigNotice } from '../utils/messages';
import { addCommand } from './add';

interface PresetConfig {
  name: string;
  description: string;
  files: Record<string, string>;
}

const PRESETS: Record<string, PresetConfig> = {
  react: {
    name: 'React',
    description: 'React + TypeScript with hooks and testing patterns',
    files: {
      '.railgun/02-blueprint/state-management.md': `# State Management (React)

## Core Principles
- Use Zustand for global state (or Context for simple cases)
- Keep local state closest to consumer (useState)
- Derive values via selectors, never duplicate in store

## Component Rules
- Functional components only
- Props interface required (no 'any')
- Use React.FC<Props> or plain function with typed params

## Hooks
- Custom hooks in \`hooks/\` directory
- Prefix with \`use\`
- Never call hooks conditionally
`,
      '.railgun/02-blueprint/component-patterns.md': `# Component Patterns

## Structure
\`\`\`tsx
interface Props {
  title: string;
  onAction: () => void;
}

export function MyComponent({ title, onAction }: Props) {
  return <div>{title}</div>;
}
\`\`\`

## Styling
- CSS Modules or Tailwind
- No inline styles except dynamic values
- data-testid on interactive elements
`,
      '.railgun/03-validation/unit-tests.md': `# Unit Tests (React)

## Required
- React Testing Library
- \`data-testid\` for element selection
- Mock API calls with MSW or jest.mock

## Forbidden
- Enzyme (deprecated)
- Testing implementation details
- Live network calls
`,
    },
  },
  vue: {
    name: 'Vue',
    description: 'Vue 3 + Composition API with Pinia',
    files: {
      '.railgun/02-blueprint/state-management.md': `# State Management (Vue)

## Core Principles
- Pinia for global state
- Composition API (setup script)
- Refs for primitive state, reactive for objects

## Component Rules
- \`<script setup lang="ts">\`
- Props interface with defineProps<Props>()
- Emits typed with defineEmits<Emits>()
`,
      '.railgun/03-validation/unit-tests.md': `# Unit Tests (Vue)

## Required
- Vitest + Vue Test Utils
- mount() with props
- Mock Pinia stores in tests
`,
    },
  },
  python: {
    name: 'Python',
    description: 'Python with type hints and pytest',
    files: {
      '.railgun/02-blueprint/architecture.md': `# Architecture (Python)

## Core Principles
- Type hints everywhere (mypy strict)
- Pydantic for data validation
- FastAPI for APIs (if applicable)

## Structure
- \`src/\` for source code
- \`tests/\` mirrors \`src/\` structure
- \`__init__.py\` in packages
`,
      '.railgun/03-validation/unit-tests.md': `# Tests (Python)

## Required
- pytest
- fixtures for shared setup
- Mock external calls with unittest.mock

## Forbidden
- Untyped function signatures
- Print statements (use logging)
`,
    },
  },
  golang: {
    name: 'Go',
    description: 'Go with standard project layout',
    files: {
      '.railgun/02-blueprint/architecture.md': `# Architecture (Go)

## Core Principles
- Standard Go project layout
- Interfaces for testability
- Context propagation (ctx context.Context)

## Structure
- \`cmd/\` for main applications
- \`pkg/\` for public libraries
- \`internal/\` for private code
`,
      '.railgun/03-validation/unit-tests.md': `# Tests (Go)

## Required
- Table-driven tests
- Test functions: TestXxx(t *testing.T)
- Mock interfaces with mockgen or manual mocks

## Forbidden
- Global state
- Untested error paths
`,
    },
  },
};

export async function initCommand(): Promise<void> {
  console.log(`${ROCKET} ${chalk.bold('Welcome to RAILGUN Setup Wizard')}\n`);

  const { preset } = await inquirer.prompt([
    {
      type: 'list',
      name: 'preset',
      message: 'Choose your project preset:',
      choices: Object.entries(PRESETS).map(([key, p]) => ({
        name: `${p.name} — ${p.description}`,
        value: key,
      })),
    },
  ]);

  const selectedPreset = PRESETS[preset];

  info(`Setting up RAILGUN with ${selectedPreset.name} preset...`);

  // First run standard add
  await addCommand();

  // Then overlay preset-specific files
  const cwd = process.cwd();
  for (const [filePath, content] of Object.entries(selectedPreset.files)) {
    const fullPath = path.join(cwd, filePath);
    await fs.ensureDir(path.dirname(fullPath));
    await fs.writeFile(fullPath, content);
  }

  console.log(`\n${SPARKLE} ${chalk.green.bold(`RAILGUN initialized with ${selectedPreset.name} preset!`)}`);
  showConfigNotice();
}
