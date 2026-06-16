import { addCommand } from '../../commands/add';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import inquirer from 'inquirer';

jest.mock('inquirer', () => ({
  prompt: jest.fn(),
}));

describe('addCommand', () => {
  let testDir: string;
  const mockedInquirer = inquirer as jest.Mocked<typeof inquirer>;

  beforeEach(async () => {
    testDir = await fs.mkdtemp(path.join(os.tmpdir(), 'railgun-test-'));
    process.chdir(testDir);
    jest.resetAllMocks();
  });

  afterEach(async () => {
    await fs.remove(testDir);
  });

  it('creates .railgun directory structure', async () => {
    mockedInquirer.prompt.mockResolvedValueOnce({ confirmed: true });
    mockedInquirer.prompt.mockResolvedValueOnce({ mode: 'skip' });

    await addCommand();

    expect(await fs.pathExists(path.join(testDir, '.railgun'))).toBe(true);
    expect(await fs.pathExists(path.join(testDir, '.railgun', '00-runtime', 'AGENTS.md'))).toBe(true);
    expect(await fs.pathExists(path.join(testDir, '.railgun', '01-domain', 'glossary.md'))).toBe(true);
    expect(await fs.pathExists(path.join(testDir, 'AGENTS.md'))).toBe(true);
  });

  it('prepends RAILGUN activation to existing AGENTS.md', async () => {
    await fs.writeFile(path.join(testDir, 'AGENTS.md'), '# Existing Project\n\nSome rules.\n');
    mockedInquirer.prompt.mockResolvedValueOnce({ confirmed: true });
    mockedInquirer.prompt.mockResolvedValueOnce({ mode: 'skip' });

    await addCommand();

    const content = await fs.readFile(path.join(testDir, 'AGENTS.md'), 'utf-8');
    expect(content).toContain('RAILGUN Activation');
    expect(content).toContain('# Existing Project');
  });

  it('exits when user declines confirmation', async () => {
    mockedInquirer.prompt.mockResolvedValueOnce({ confirmed: false });

    await addCommand();

    expect(await fs.pathExists(path.join(testDir, '.railgun'))).toBe(false);
    expect(await fs.pathExists(path.join(testDir, 'AGENTS.md'))).toBe(false);
  });
});