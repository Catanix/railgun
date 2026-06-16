#!/usr/bin/env node

import { Command } from 'commander';
import { showBanner } from './utils/ascii';
import { addCommand } from './commands/add';
import { initCommand } from './commands/init';
import { removeCommand } from './commands/remove';

const program = new Command();

program
  .name('railgun')
  .description('RAILGUN CLI')
  .version('0.1.0');

program
  .command('add')
  .description('Add RAILGUN to current project')
  .action(async () => {
    showBanner();
    await addCommand();
  });

program
  .command('init')
  .description('Initialize RAILGUN with preset wizard')
  .action(async () => {
    showBanner();
    await initCommand();
  });

program
  .command('remove')
  .description('Remove RAILGUN from current project')
  .action(async () => {
    showBanner();
    await removeCommand();
  });

program.parse();
