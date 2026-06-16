import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { WARN, success } from '../utils/ascii';

export async function removeCommand(): Promise<void> {
  const cwd = process.cwd();
  const railgunDir = path.join(cwd, '.railgun');

  if (!(await fs.pathExists(railgunDir))) {
    console.log(`${WARN} No RAILGUN found in this project.`);
    return;
  }

  await fs.remove(railgunDir);

  // Optionally remove root AGENTS.md if it only contains RAILGUN activation
  const rootAgentsPath = path.join(cwd, 'AGENTS.md');
  if (await fs.pathExists(rootAgentsPath)) {
    const content = await fs.readFile(rootAgentsPath, 'utf-8');
    if (content.includes('RAILGUN Activation') && content.split('\n').length < 5) {
      await fs.remove(rootAgentsPath);
      success('Removed AGENTS.md (was only RAILGUN activation)');
    } else {
      console.log(chalk.yellow('⚠️  AGENTS.md kept (contains other content)'));
    }
  }

  success('RAILGUN removed from project.');
}
