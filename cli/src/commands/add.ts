import fs from 'fs-extra';
import path from 'path';
import { success, warning, info, SPARKLE } from '../utils/ascii';
import { showConfigNotice } from '../utils/messages';
import chalk from 'chalk';

const AI_CONFIG_FILES = [
  '.cursorrules',
  'CLAUDE.md',
  'claude.md',
  '.claude.md',
  '.ai-rules',
  'AGENTS.md',
  'agents.md',
];

const RAILGUN_STRUCTURE = {
  '00-runtime': ['AGENTS.md', 'current.md'],
  '01-domain': ['glossary.md'],
  '02-blueprint': ['state-management.md'],
  '03-validation': ['unit-tests.md'],
  '04-guardrails': ['checklist.md'],
};

const RAILGUN_ACTIVATION = `# RAILGUN Activation

This repository uses RAILGUN. Before any task, read \`.railgun/AGENTS.md\` and follow its execution loop.
`;

export async function addCommand(): Promise<void> {
  const cwd = process.cwd();
  const railgunDir = path.join(cwd, '.railgun');

  info('Adding RAILGUN to your project...');

  // Check for existing AI config files
  const existingConfigs: string[] = [];
  for (const file of AI_CONFIG_FILES) {
    const filePath = path.join(cwd, file);
    if (await fs.pathExists(filePath)) {
      existingConfigs.push(file);
    }
  }

  // Create .railgun directory structure
  await fs.ensureDir(railgunDir);
  for (const [dir, files] of Object.entries(RAILGUN_STRUCTURE)) {
    const dirPath = path.join(railgunDir, dir);
    await fs.ensureDir(dirPath);
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      if (!(await fs.pathExists(filePath))) {
        await fs.writeFile(filePath, `# ${file.replace('.md', '')}\n\n// TODO: Fill this rail with your project rules\n`);
      }
    }
  }

  // Create root .railgun/AGENTS.md
  const railgunAgentsPath = path.join(railgunDir, 'AGENTS.md');
  await fs.writeFile(railgunAgentsPath, `# RAILGUN Execution Loop

1. Read \`00-runtime/current.md\` for active sprint context
2. Read \`01-domain/glossary.md\` for terminology
3. Read \`02-blueprint/\` for architecture patterns
4. Execute task
5. Validate against \`03-validation/\`
6. Check \`04-guardrails/checklist.md\` before completion
7. Update \`00-runtime/current.md\` with progress
`);

  // Handle root AGENTS.md
  const rootAgentsPath = path.join(cwd, 'AGENTS.md');
  if (existingConfigs.includes('AGENTS.md') || existingConfigs.includes('agents.md')) {
    // Prepend RAILGUN activation to existing AGENTS.md
    const existingContent = await fs.readFile(rootAgentsPath, 'utf-8');
    if (!existingContent.includes('RAILGUN Activation')) {
      const newContent = `${RAILGUN_ACTIVATION}\n${existingContent}`;
      await fs.writeFile(rootAgentsPath, newContent);
      success(`Updated AGENTS.md with RAILGUN activation`);
    } else {
      warning('AGENTS.md already contains RAILGUN activation');
    }
  } else {
    // Create new AGENTS.md
    await fs.writeFile(rootAgentsPath, RAILGUN_ACTIVATION);
    success('Created AGENTS.md with RAILGUN activation');
  }

  // Report existing configs found
  if (existingConfigs.length > 0) {
    console.log(chalk.cyan(`\n🔍 Found existing AI config files: ${existingConfigs.join(', ')}`));
    console.log(chalk.cyan('RAILGUN works alongside them. No files were overwritten.\n'));
  }

  console.log(`${SPARKLE} ${chalk.green.bold('RAILGUN added successfully!')}`);
  console.log(chalk.gray('Next: Customize rails in .railgun/ for your project'));
  
  showConfigNotice();
}
