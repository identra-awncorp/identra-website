/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// The CertNet gateway configuration (ADR-0020): off unless both variables are set, the same address rule
// as VITE_IDENTRA_API_URL (https, plain http only on the loopback interface), and every half-set or
// malformed combination refused at start instead of quietly falling back to something else.
import assert from 'node:assert/strict';
import test from 'node:test';
import { CERTNET_CONFIG, resolveCertNetConfig, resolveIdentraApiUrl } from '../src/identra/config';

test('CertNet path: off by default (nothing set, empty or blank values), and off in this build', () => {
  assert.equal(resolveCertNetConfig(undefined, undefined), null);
  assert.equal(resolveCertNetConfig('', ''), null);
  assert.equal(resolveCertNetConfig('  ', ' '), null);
  assert.equal(CERTNET_CONFIG, null);
});

test('CertNet path: one variable without the other is refused', () => {
  assert.throws(() => resolveCertNetConfig('https://gateway.certnet.example', undefined), /must be set together/);
  assert.throws(() => resolveCertNetConfig('https://gateway.certnet.example', ''), /must be set together/);
  assert.throws(() => resolveCertNetConfig(undefined, 'testnet'), /must be set together/);
  assert.throws(() => resolveCertNetConfig('', 'local'), /must be set together/);
});

test('CertNet path: only the three networks of the spec', () => {
  for (const network of ['local', 'testnet', 'mainnet']) {
    assert.equal(resolveCertNetConfig('https://gateway.certnet.example', network)?.network, network);
  }
  for (const network of ['Testnet', 'devnet', 'main net', 'local;']) {
    assert.throws(() => resolveCertNetConfig('https://gateway.certnet.example', network), /VITE_CERTNET_NETWORK must be one of/, network);
  }
});

test('CertNet path: https anywhere, plain http only on the loopback interface (as the API address)', () => {
  assert.deepEqual(resolveCertNetConfig('https://gateway.certnet.example', 'testnet'), {
    gatewayUrl: 'https://gateway.certnet.example',
    fetchOrigin: 'https://gateway.certnet.example',
    network: 'testnet',
    testBuild: false,
  });
  // Local work: the SDK keeps an https URL; the requests go to the loopback address. It is a test build.
  assert.deepEqual(resolveCertNetConfig('http://127.0.0.1:47460', 'local'), {
    gatewayUrl: 'https://127.0.0.1:47460',
    fetchOrigin: 'http://127.0.0.1:47460',
    network: 'local',
    testBuild: true,
  });
  assert.equal(resolveCertNetConfig('http://localhost:47460/', 'local')?.fetchOrigin, 'http://localhost:47460');
  for (const value of ['http://gateway.certnet.example', 'http://10.0.0.5:8080', 'http://127.0.0.2', 'ftp://gateway.certnet.example', 'wss://gateway.certnet.example']) {
    assert.throws(() => resolveCertNetConfig(value, 'testnet'), /must be an https URL/, value);
  }
  // The same rule as the API address.
  assert.throws(() => resolveIdentraApiUrl('http://10.0.0.5:8080'));
  assert.equal(resolveIdentraApiUrl('http://127.0.0.1:47310'), 'http://127.0.0.1:47310');
});

test('CertNet path: an optional path prefix is kept (one trailing slash dropped); credentials, query and fragment are refused', () => {
  assert.equal(resolveCertNetConfig('https://gateway.certnet.example/certnet/', 'testnet')?.gatewayUrl, 'https://gateway.certnet.example/certnet');
  assert.equal(resolveCertNetConfig(' https://gateway.certnet.example/a/b ', 'testnet')?.gatewayUrl, 'https://gateway.certnet.example/a/b');
  for (const value of [
    'https://user:pass@gateway.certnet.example',
    'https://gateway.certnet.example/?x=1',
    'https://gateway.certnet.example/#v1',
    'https://gateway.certnet.example/?',
    'https://gateway.certnet.example/a%20b',
  ]) {
    assert.throws(() => resolveCertNetConfig(value, 'testnet'), /without credentials, query or fragment/, value);
  }
  assert.throws(() => resolveCertNetConfig('gateway.certnet.example', 'testnet'), /absolute URL/);
});

test('a production build refuses the local network and a gateway that is not https, unless the test-only switch is set (and then says so)', () => {
  const production = { production: true };
  assert.throws(() => resolveCertNetConfig('https://gateway.certnet.example', 'local', production), /production build refuses VITE_CERTNET_NETWORK=local.*VITE_CERTNET_ALLOW_LOCAL_FOR_TESTS=true/);
  assert.throws(() => resolveCertNetConfig('http://127.0.0.1:47480', 'testnet', production), /not https/);
  assert.throws(() => resolveCertNetConfig('http://127.0.0.1:47480', 'local', production), /production build refuses/, 'the e2e configuration, without the switch');
  // A real configuration passes, and is not a test build.
  assert.deepEqual(resolveCertNetConfig('https://gateway.certnet.example', 'testnet', production), {
    gatewayUrl: 'https://gateway.certnet.example', fetchOrigin: 'https://gateway.certnet.example', network: 'testnet', testBuild: false,
  });
  // Off stays off, in production too.
  assert.equal(resolveCertNetConfig(undefined, undefined, production), null);
  // The switch: only the exact value "true"; the configuration is then marked as a test build.
  const forTests = resolveCertNetConfig('http://127.0.0.1:47480', 'local', { production: true, testSwitch: 'true' });
  assert.deepEqual(forTests, { gatewayUrl: 'https://127.0.0.1:47480', fetchOrigin: 'http://127.0.0.1:47480', network: 'local', testBuild: true });
  for (const value of ['1', 'yes', 'TRUE', 'false']) {
    assert.throws(() => resolveCertNetConfig('http://127.0.0.1:47480', 'local', { production: true, testSwitch: value }), /must be "true" or unset/, value);
  }
  // Plain http on the loopback interface is still not allowed off it, switch or not.
  assert.throws(() => resolveCertNetConfig('http://10.0.0.5:8080', 'local', { production: true, testSwitch: 'true' }), /must be an https URL/);
  // Development (the dev server): allowed, and a test build by definition when it uses the local network or plain http.
  assert.equal(resolveCertNetConfig('http://127.0.0.1:47480', 'local')?.testBuild, true);
  assert.equal(resolveCertNetConfig('https://gateway.certnet.example', 'local')?.testBuild, true);
  assert.equal(resolveCertNetConfig('http://127.0.0.1:47480', 'testnet')?.testBuild, true);
  assert.equal(resolveCertNetConfig('https://gateway.certnet.example', 'testnet')?.testBuild, false);
});

// ---- The configuration as the real build and dev server wire it ------------------------------------------------
// resolveCertNetConfig is tested above; these go through Vite itself, so the wiring cannot drift: the build guard
// of every build entry point (vite.config.ts, vite.product.config.ts), config.ts's `production` flag in a real
// bundle, and the test-build marker constant that follows the configuration.

const UNSAFE = { VITE_CERTNET_GATEWAY_URL: 'http://127.0.0.1:47480', VITE_CERTNET_NETWORK: 'local' };
const CERTNET_KEYS = ['VITE_CERTNET_GATEWAY_URL', 'VITE_CERTNET_NETWORK', 'VITE_CERTNET_ALLOW_LOCAL_FOR_TESTS', 'NODE_ENV'] as const;

const withEnv = async <T,>(vars: Record<string, string>, run: () => Promise<T>): Promise<T> => {
  const saved = Object.fromEntries(CERTNET_KEYS.map((key) => [key, process.env[key]]));
  for (const key of CERTNET_KEYS) delete process.env[key];
  Object.assign(process.env, vars);
  try {
    return await run();
  } finally {
    for (const key of CERTNET_KEYS) {
      if (saved[key] === undefined) delete process.env[key];
      else process.env[key] = saved[key];
    }
  }
};

test('every build entry point refuses an unsafe CertNet configuration (the guard as Vite resolves the real configs)', async () => {
  const { resolveConfig } = await import('vite');
  for (const configFile of ['vite.config.ts', 'vite.product.config.ts']) {
    const resolve = (vars: Record<string, string>) => withEnv(vars, () => resolveConfig({ configFile, mode: 'production', logLevel: 'silent' }, 'build'));
    await assert.rejects(resolve(UNSAFE), /production build refuses VITE_CERTNET_NETWORK=local/, `${configFile}: the e2e configuration without the switch`);
    await assert.rejects(resolve({ ...UNSAFE, VITE_CERTNET_NETWORK: 'testnet' }), /not https/, `${configFile}: plain http`);
    await resolve({ ...UNSAFE, VITE_CERTNET_ALLOW_LOCAL_FOR_TESTS: 'true' });
    await resolve({});
    // The dev server is not a build: it starts with the local network (and then shows the marker, below).
    await withEnv(UNSAFE, () => resolveConfig({ configFile, mode: 'development', logLevel: 'silent' }, 'serve'));
  }
});

test('the bundle: config.ts refuses an unsafe configuration in production code, and the test-build marker follows the configuration', async () => {
  const { build } = await import('vite');
  const { mkdirSync, mkdtempSync, writeFileSync, rmSync } = await import('node:fs');
  const path = await import('node:path');
  // Inside the repository (node_modules/.cache), so the bundle's react and lucide-react imports resolve unbundled.
  const cache = path.resolve('node_modules/.cache');
  mkdirSync(cache, { recursive: true });
  const dir = mkdtempSync(path.join(cache, 'identra-config-'));
  try {
    const entry = path.join(dir, 'entry.ts');
    writeFileSync(entry, [
      `export { CERTNET_CONFIG } from ${JSON.stringify(path.resolve('src/identra/config.ts'))};`,
      `export { CERTNET_TEST_BUILD } from ${JSON.stringify(path.resolve('src/components/CertNetTestBuildMarker.tsx'))};`,
    ].join('\n'));
    let n = 0;
    /** A production build of the two modules (no .env file: envDir is empty), then the bundle evaluated. */
    const bundle = (vars: Record<string, string>) => withEnv(vars, async () => {
      const out = await build({ configFile: false, root: dir, envDir: dir, mode: 'production', logLevel: 'silent', build: { write: false, minify: false, lib: { entry, formats: ['es'], fileName: 'out' }, rollupOptions: { external: (id) => /^(?:react|lucide-react)(?:\/|$)/.test(id) } } });
      const file = path.join(dir, `out-${(n += 1)}.mjs`);
      writeFileSync(file, (out as { output: { code: string }[] }[])[0]?.output[0]?.code ?? (out as { output: { code: string }[] }).output[0]!.code);
      return import(file) as Promise<{ CERTNET_CONFIG: unknown; CERTNET_TEST_BUILD: boolean }>;
    });
    await assert.rejects(bundle(UNSAFE), /production build refuses/, 'production code refuses it even past the build guard');
    const forTests = await bundle({ ...UNSAFE, VITE_CERTNET_ALLOW_LOCAL_FOR_TESTS: 'true' });
    assert.equal((forTests.CERTNET_CONFIG as { testBuild: boolean }).testBuild, true);
    assert.equal(forTests.CERTNET_TEST_BUILD, true, 'the marker is shown');
    const real = await bundle({ VITE_CERTNET_GATEWAY_URL: 'https://gateway.certnet.example', VITE_CERTNET_NETWORK: 'testnet' });
    assert.equal(real.CERTNET_TEST_BUILD, false, 'a real configuration: no marker');
    const off = await bundle({});
    assert.deepEqual([off.CERTNET_CONFIG, off.CERTNET_TEST_BUILD], [null, false], 'no CertNet: as before');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('the dev server pointed at the local network shows the test-build marker', async () => {
  const { createServer } = await import('vite');
  const { mkdtempSync, rmSync } = await import('node:fs');
  const { tmpdir } = await import('node:os');
  const path = await import('node:path');
  const dir = mkdtempSync(path.join(tmpdir(), 'identra-dev-'));
  const marker = (vars: Record<string, string>) => withEnv(vars, async () => {
    const server = await createServer({ configFile: false, root: process.cwd(), envDir: dir, logLevel: 'silent', appType: 'custom', server: { middlewareMode: true, hmr: false, watch: null }, optimizeDeps: { noDiscovery: true, include: [] } });
    try {
      return ((await server.ssrLoadModule('/src/components/CertNetTestBuildMarker.tsx')) as { CERTNET_TEST_BUILD: boolean }).CERTNET_TEST_BUILD;
    } finally {
      await server.close();
    }
  });
  try {
    assert.equal(await marker(UNSAFE), true, 'local network');
    assert.equal(await marker({ VITE_CERTNET_GATEWAY_URL: 'https://gateway.certnet.example', VITE_CERTNET_NETWORK: 'testnet' }), false);
    assert.equal(await marker({}), false);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('the guided demo on a dev server with the local network: the marker in the wallet and, for phones, above the tabs\' content', async () => {
  const { createServer } = await import('vite');
  const html = await withEnv(UNSAFE, async () => {
    // The real vite.config.ts (its root CA module is needed by the page), rendered as the SEO renderer does.
    const server = await createServer({ logLevel: 'silent', appType: 'custom', server: { middlewareMode: true, hmr: false, watch: null }, optimizeDeps: { noDiscovery: true, include: [] } });
    try {
      return await ((await server.ssrLoadModule('/src/entry-seo.tsx')) as { renderPage: (path: string) => Promise<string> }).renderPage('/vi/demo/diploma');
    } finally {
      await server.close();
    }
  });
  assert.equal(html.match(/data-testid="certnet-test-build"/g)?.length, 2, 'the wallet\'s marker and the page\'s');
  const page = html.indexOf('data-testid="guided-test-build"');
  assert.match(html.slice(page - 40, page), /class="lg:hidden"/, 'the page\'s marker is for phone widths (the wallet\'s is always beside it on a desktop)');
  // On a phone the school and employer sides and the wallet are tabs; the marker sits outside all three.
  assert.ok(html.indexOf('data-testid="guided-instructions"') < page && page < html.indexOf('data-testid="guided-actor-school"'), 'outside every tab');
  assert.ok(page < html.indexOf('id="demo-wallet"'));
});
