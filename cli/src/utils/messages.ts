import { pinkBox, BOOK } from './ascii';
import chalk from 'chalk';

export function showConfigNotice() {
  pinkBox('🎀 Configuration Notice', [
    'Rails are set up in BASIC mode.',
    'Customize them for your project!',
    '',
    '📖 Docs: https://github.com/Catanix/railgun#readme',
  ]);
}

export function showDocsLink() {
  console.log(`\n${BOOK} ${chalk.blue('Documentation:')} https://github.com/Catanix/railgun#readme\n`);
}
