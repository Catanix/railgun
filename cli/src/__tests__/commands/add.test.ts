import { addCommand } from '../../commands/add';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

describe('addCommand', () => {
  let testDir: string;

  beforeEach(async () => {
    testDir = await fs.mkdtemp(path.join(os.tmpdir(), 'railgun-test-'));
    process.chdir(testDir);
  });

  afterEach(async () => {
    await fs.remove(testDir);
  });

  it('creates .railgun directory structure', async () => {
    await addCommand();

    expect(await fs.pathExists(path.join(testDir, '.railgun'))).toBe(true);
    expect(await fs.pathExists(path.join(testDir, '.railgun', '00-runtime', 'AGENTS.md'))).toBe(true);
    expect(await fs.pathExists(path.join(testDir, '.railgun', '01-domain', 'glossary.md'))).toBe(true);
    expect(await fs.pathExists(path.join(testDir, 'AGENTS.md'))).toBe(true);
  });

  it('prepends RAILGUN activation to existing AGENTS.md', async () => {
    await fs.writeFile(path.join(testDir, 'AGENTS.md'), '# Existing Project\n\nSome rules.\n');
    await addCommand();

    const content = await fs.readFile(path.join(testDir, 'AGENTS.md'), 'utf-8');
    expect(content).toContain('RAILGUN Activation');
    expect(content).toContain('# Existing Project');
  });
});