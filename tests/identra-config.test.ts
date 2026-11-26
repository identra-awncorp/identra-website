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
  // Local work: the SDK keeps an https URL; the requests go to the loopback address.
  assert.deepEqual(resolveCertNetConfig('http://127.0.0.1:47460', 'local'), {
    gatewayUrl: 'https://127.0.0.1:47460',
    fetchOrigin: 'http://127.0.0.1:47460',
    network: 'local',
    testBuild: false,
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
  // Development (the dev server, tests) is unchanged.
  assert.equal(resolveCertNetConfig('http://127.0.0.1:47480', 'local')?.testBuild, false);
});
