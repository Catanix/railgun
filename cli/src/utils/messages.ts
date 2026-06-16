import chalk from 'chalk';

export function pinkBox(title: string, message: string): string {
  const line = '─'.repeat(Math.max(title.length, message.length) + 4);
  return `
${chalk.hex('#FF69B4')('┌' + line + '┐')}
${chalk.hex('#FF69B4')('│ ' + chalk.bold(title) + ' '.repeat(line.length - title.length - 1) + '│')}
${chalk.hex('#FF69B4')('├' + line + '┤')}
${chalk.hex('#FF69B4')('│ ' + message + ' '.repeat(line.length - message.length - 1) + '│')}
${chalk.hex('#FF69B4')('└' + line + '┘')}
`;
}

export function showConfigNotice(): void {
  console.log(pinkBox(
    'NOTICE',
    'Rails are set up in BASIC mode. Customize them for your project!'
  ));
  console.log(chalk.gray('📚 Docs: https://github.com/Catanix/railgun#readme\n'));
}
