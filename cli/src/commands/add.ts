import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { success, warning, info, SPARKLE, PINK } from '../utils/ascii';
import { showConfigNotice, sleep, showLoadingStep, showScanResult } from '../utils/messages';

const AI_CONFIG_FILES = [
  { file: '.cursorrules', label: 'Cursor Rules' },
  { file: 'CLAUDE.md', label: 'Claude Config' },
  { file: 'claude.md', label: 'Claude Config' },
  { file: '.claude.md', label: 'Claude Config' },
  { file: '.ai-rules', label: 'AI Rules' },
  { file: 'AGENTS.md', label: 'Agents Config' },
  { file: 'agents.md', label: 'Agents Config' },
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
  const projectName = path.basename(cwd);

  // Step 1: Confirmation
  const { confirmed } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmed',
      message: chalk.hex('#FF69B4')(`Apply RAILGUN methodology to this project?`) + chalk.gray(`\n   📖 Learn more: https://github.com/Catanix/railgun`),
      default: true,
    },
  ]);

  if (!confirmed) {
    console.log(chalk.yellow('\n🚫 RAILGUN won\'t be applied.\n'));
    console.log(chalk.cyan('📖 Read more: https://github.com/Catanix/railgun#readme\n'));
    return;
  }

  // Step 2: Analysis with loading states
  console.log(chalk.hex('#FF69B4').bold('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
  
  showLoadingStep('🔍 Analyzing project structure...');
  await sleep(1000);
  showScanResult('Project', projectName, '📁');
  
  showLoadingStep('🔍 Searching for existing AI configurations...');
  await sleep(1000);
  
  const foundConfigs: { file: string; label: string }[] = [];
  for (const config of AI_CONFIG_FILES) {
    const filePath = path.join(cwd, config.file);
    if (await fs.pathExists(filePath)) {
      foundConfigs.push(config);
    }
  }
  
  if (foundConfigs.length > 0) {
    const configNames = [...new Set(foundConfigs.map(c => c.label))].join(', ');
    showScanResult('Basic Agent config', `${configNames} detected`, '✅');
  } else {
    showScanResult('Basic Agent config', 'None found', '⚠️');
  }
  
  console.log(chalk.hex('#FF69B4').bold('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
  
  // Step 3: Choose how to integrate with existing configs
  let integrationMode: string;
  
  if (foundConfigs.length > 0) {
    const { mode } = await inquirer.prompt([
      {
        type: 'list',
        name: 'mode',
        message: 'How do you want to integrate RAILGUN?',
        choices: [
          { name: 'Use existing configs (prepend RAILGUN activation)', value: 'auto' },
          { name: 'Manual (show me what to add)', value: 'manual' },
          { name: 'Skip (create new AGENTS.md only)', value: 'skip' },
        ],
      },
    ]);
    integrationMode = mode;
  } else {
    integrationMode = 'skip';
  }
  
  // Handle manual mode
  if (integrationMode === 'manual') {
    console.log(chalk.hex('#FF69B4').bold('\n📝 Manual Integration Instructions\n'));
    console.log('Add the following lines to the TOP of your existing config file:\n');
    console.log(chalk.gray('────────────────────────────────────'));
    console.log(chalk.white(RAILGUN_ACTIVATION.trim()));
    console.log(chalk.gray('────────────────────────────────────\n'));
    console.log('Then run ' + chalk.hex('#FF69B4').bold('railgun add') + ' again and choose "Skip"\n');
    return;
  }
  
  // Step 4: Create RAILGUN structure
  info('Adding RAILGUN to your project...');
  
  const railgunDir = path.join(cwd, '.railgun');
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
  
  // Handle root AGENTS.md based on integration mode
  const rootAgentsPath = path.join(cwd, 'AGENTS.md');
  
  if (integrationMode === 'auto' && foundConfigs.length > 0) {
    // Find the first existing AGENTS.md-like file or create new one
    const agentsConfig = foundConfigs.find(c => c.file.toLowerCase() === 'agents.md');
    
    if (agentsConfig) {
      const existingContent = await fs.readFile(rootAgentsPath, 'utf-8');
      if (!existingContent.includes('RAILGUN Activation')) {
        const newContent = `${RAILGUN_ACTIVATION}\n${existingContent}`;
        await fs.writeFile(rootAgentsPath, newContent);
        success('Updated AGENTS.md with RAILGUN activation');
      } else {
        warning('AGENTS.md already contains RAILGUN activation');
      }
    } else {
      // Create AGENTS.md if only other configs exist
      await fs.writeFile(rootAgentsPath, RAILGUN_ACTIVATION);
      success('Created AGENTS.md with RAILGUN activation');
    }
    
    const configNames = [...new Set(foundConfigs.map(c => c.label))].join(', ');
    console.log(chalk.cyan(`\n🔍 Found existing configs: ${configNames}`));
    console.log(chalk.cyan('RAILGUN works alongside them. No files were overwritten.\n'));
  } else {
    // Skip mode or no configs found
    if (await fs.pathExists(rootAgentsPath)) {
      const existingContent = await fs.readFile(rootAgentsPath, 'utf-8');
      if (!existingContent.includes('RAILGUN Activation')) {
        const newContent = `${RAILGUN_ACTIVATION}\n${existingContent}`;
        await fs.writeFile(rootAgentsPath, newContent);
        success('Updated AGENTS.md with RAILGUN activation');
      } else {
        warning('AGENTS.md already contains RAILGUN activation');
      }
    } else {
      await fs.writeFile(rootAgentsPath, RAILGUN_ACTIVATION);
      success('Created AGENTS.md with RAILGUN activation');
    }
  }
  
  console.log(`${SPARKLE} ${chalk.green.bold('RAILGUN added successfully!')}`);
  console.log(chalk.gray('Next: Customize rails in .railgun/ for your project'));
  
  showConfigNotice();
}
