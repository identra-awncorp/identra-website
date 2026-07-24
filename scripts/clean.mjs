import { rmSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');

for (const outputPath of ['dist', 'server.js']) {
  rmSync(resolve(projectRoot, outputPath), { force: true, recursive: true });
}
