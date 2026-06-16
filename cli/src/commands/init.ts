import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { ROCKET, SPARKLE, info } from '../utils/ascii';
import { showConfigNotice } from '../utils/messages';
import { addCommand } from './add';

interface PresetConfig {
  name: string;
  description: string;
  templateDir: string;
}

const PRESETS: Record<string, PresetConfig> = {
  react: {
    name: 'React',
    description: 'React + TypeScript with hooks and testing patterns',
    templateDir: 'react',
  },
  vue: {
    name: 'Vue',
    description: 'Vue 3 + Composition API with Pinia',
    templateDir: 'vue',
  },
  python: {
    name: 'Python',
    description: 'Python with type hints and pytest',
    templateDir: 'python',
  },
  golang: {
    name: 'Go',
    description: 'Go with standard project layout',
    templateDir: 'golang',
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

  // Then overlay preset-specific files from templates
  const cwd = process.cwd();
  const templatePath = path.join(__dirname, '..', 'templates', selectedPreset.templateDir, '.railgun');
  
  if (await fs.pathExists(templatePath)) {
    const files = await fs.readdir(templatePath, { recursive: true });
    for (const file of files) {
      const fileStr = file.toString();
      const filePath = path.join(templatePath, fileStr);
      const stat = await fs.stat(filePath);
      if (stat.isFile()) {
        const content = await fs.readFile(filePath, 'utf-8');
        const targetPath = path.join(cwd, '.railgun', fileStr);
        await fs.ensureDir(path.dirname(targetPath));
        await fs.writeFile(targetPath, content);
      }
    }
  }

  console.log(`\n${SPARKLE} ${chalk.green.bold(`RAILGUN initialized with ${selectedPreset.name} preset!`)}`);
  showConfigNotice();
}
