import chalk from 'chalk';

export const RAILGUN_ASCII = `
${chalk.hex('#FF69B4')('██╗   ██╗ ██████╗ ██╗   ██╗██████╗ ')}
${chalk.hex('#FF1493')('██║   ██║██╔═══██╗██║   ██║██╔══██╗')}
${chalk.hex('#FF69B4')('██║   ██║██║   ██║██║   ██║██████╔╝')}
${chalk.hex('#FF1493')('╚██╗ ██╔╝██║   ██║██║   ██║██╔══██╗')}
${chalk.hex('#FF69B4')(' ╚████╔╝ ╚██████╔╝╚██████╔╝██║  ██║')}
${chalk.hex('#FF1493')('  ╚═══╝   ╚═════╝  ╚═════╝ ╚═╝  ╚═╝')}
`;

export const SPARKLE = chalk.hex('#FF69B4')('✨');
export const ROCKET = chalk.hex('#FF1493')('🚀');
export const CHECK = chalk.hex('#00FF00')('✓');
export const WARN = chalk.hex('#FFA500')('⚠');
export const INFO = chalk.hex('#00BFFF')('ℹ');

export function showBanner(): void {
  console.log(RAILGUN_ASCII);
  console.log(chalk.hex('#FF69B4').bold('  Repository-level AI Logic & Guidance Unified Network\n'));
}

export function success(msg: string): void {
  console.log(`${SPARKLE} ${chalk.green(msg)}`);
}

export function warning(msg: string): void {
  console.log(`${WARN} ${chalk.yellow(msg)}`);
}

export function info(msg: string): void {
  console.log(`${INFO} ${chalk.cyan(msg)}`);
}
