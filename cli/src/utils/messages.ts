import chalk from 'chalk';
import { BOLD_PINK, pinkBox, BOOK } from './ascii';

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function showLoadingStep(text: string): void {
  console.log(`\n${BOLD_PINK(text)}`);
}

export function showScanResult(label: string, value: string, emoji: string = '✨'): void {
  console.log(`${emoji} ${chalk.bold(label)}: ${chalk.white(value)}`);
}

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
