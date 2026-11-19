// Fails fast when the linked Identra SDK packages are not built, or their build lacks what the website
// imports. It checks content, not file times: a git checkout that touches SDK sources but leaves an
// equivalent `dist` must not fail here, while a missing or outdated `dist` must.
// Fix: `npm run sdk:build` (builds packages/client and, through its project reference, packages/core).
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sdk = path.resolve(root, '../identra-sdk/packages');

// Every runtime export the website uses, per built entry point.
const required = [
  { name: '@identra/sdk-client', file: 'client/dist/index.js', exports: ['createVerifierClient', 'serverClockOffset', 'isValidVerifierQr', 'PRESENTATION_CHECK_IDS', 'VerifierClientError'] },
  { name: '@identra/sdk-client/product', file: 'client/dist/product.js', exports: ['createProductVerifier'] },
  { name: '@identra/sdk-app', file: 'app/dist/index.js', exports: ['createWallet', 'createSoftwareKeyStore', 'createCredentialVault', 'createInMemoryCredentialRepository', 'createInMemorySecretStorage'] },
  { name: '@identra/sdk-core', file: 'core/dist/index.js', exports: ['ErrorCodes', 'parseDigitalLinkPath', 'formatProductCode', 'formatDigitalLinkPath', 'createMappedFetch'] },
];

const problems = [];
for (const entry of required) {
  const file = path.join(sdk, entry.file);
  if (!existsSync(file)) {
    problems.push(`${entry.name}: ${path.relative(root, file)} is missing.`);
    continue;
  }
  try {
    const module = await import(pathToFileURL(file).href);
    const missing = entry.exports.filter((name) => !(name in module));
    if (missing.length > 0) problems.push(`${entry.name}: the build does not export ${missing.join(', ')} (outdated dist?).`);
  } catch (error) {
    problems.push(`${entry.name}: cannot load ${path.relative(root, file)} (${error.code ?? error.name}).`);
  }
}

if (problems.length > 0) {
  console.error(`\nIdentra SDK is not built or out of date:\n  - ${problems.join('\n  - ')}\nRun: npm run sdk:build\n`);
  process.exit(1);
}
