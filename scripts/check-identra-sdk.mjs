// Fails fast when the linked Identra SDK packages have not been built, or were built before their
// sources last changed, so Vite never bundles a missing or stale `dist` silently.
// Fix: `npm run sdk:build` (builds packages/client and, through its project reference, packages/core).
import { existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const packages = ['client', 'core'].map((name) => ({
  name: `@identra/sdk-${name}`,
  dir: path.resolve(root, '../identra-sdk/packages', name),
}));

const newestMtime = (dir) => readdirSync(dir, { withFileTypes: true }).reduce((newest, entry) => {
  const full = path.join(dir, entry.name);
  const mtime = entry.isDirectory() ? newestMtime(full) : entry.name.endsWith('.ts') ? statSync(full).mtimeMs : 0;
  return Math.max(newest, mtime);
}, 0);

// tsc -b rewrites only changed outputs but always refreshes the build info of a checked project.
const builtAt = (dir) => Math.max(
  ...['dist/index.js', 'dist/.tsbuildinfo'].map((file) => (existsSync(path.join(dir, file)) ? statSync(path.join(dir, file)).mtimeMs : 0)),
);

const problems = [];
for (const pkg of packages) {
  const entry = path.join(pkg.dir, 'dist/index.js');
  if (!existsSync(pkg.dir)) {
    problems.push(`${pkg.name}: ${pkg.dir} not found (the website expects identra-sdk next to it).`);
  } else if (!existsSync(entry)) {
    problems.push(`${pkg.name}: dist/index.js is missing.`);
  } else if (newestMtime(path.join(pkg.dir, 'src')) > builtAt(pkg.dir)) {
    problems.push(`${pkg.name}: dist is older than src.`);
  }
}

if (problems.length > 0) {
  console.error(`\nIdentra SDK is not built:\n  - ${problems.join('\n  - ')}\nRun: npm run sdk:build\n`);
  process.exit(1);
}
