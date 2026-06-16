import chalk from 'chalk';

export const RAILGUN_ASCII = `
██████╗  █████╗ ██╗██╗      ██████╗ ██╗   ██╗███╗   ██╗
██╔══██╗██╔══██╗██║██║     ██╔════╝ ██║   ██║████╗  ██║
██████╔╝███████║██║██║     ██║  ███╗██║   ██║██╔██╗ ██║
██╔══██╗██╔══██║██║██║     ██║   ██║██║   ██║██║╚██╗██║
██║  ██║██║  ██║██║███████╗╚██████╔╝╚██████╔╝██║ ╚████║
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝
`;

export const PINK = chalk.hex('#FF69B4');
export const BOLD_PINK = chalk.hex('#FF69B4').bold;

export const SPARKLE = '✨';
export const ROCKET = '🚀';
export const CHECK = '✅';
export const WARN = '⚠️';
export const BOOK = '📚';
export const GEAR = '⚙️';
export const TRASH = '🗑️';

export function showBanner() {
  console.log(PINK(RAILGUN_ASCII));
  console.log(PINK('  Repository-level AI Logic & Guidance Unified Network\n'));
}

export function success(msg: string) {
  console.log(`${CHECK} ${chalk.green(msg)}`);
}

export function info(msg: string) {
  console.log(`${BOOK} ${chalk.blue(msg)}`);
}

export function warning(msg: string) {
  console.log(`${WARN} ${chalk.yellow(msg)}`);
}

export function pinkBox(title: string, lines: string[]) {
  const width = Math.max(title.length, ...lines.map(l => l.length)) + 4;
  const top = PINK('┌' + '─'.repeat(width - 2) + '┐');
  const bottom = PINK('└' + '─'.repeat(width - 2) + '┘');
  const titleLine = PINK('│ ' + BOLD_PINK(title.padEnd(width - 4)) + ' │');
  const contentLines = lines.map(l => PINK('│ ' + chalk.white(l.padEnd(width - 4)) + ' │'));
  
  console.log('\n' + top);
  console.log(titleLine);
  console.log(PINK('│' + ' '.repeat(width - 2) + '│'));
  contentLines.forEach(l => console.log(l));
  console.log(bottom + '\n');
}
