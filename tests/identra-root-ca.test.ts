/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// The Root CA fingerprint is computed from the PEM at build time; node:crypto is the independent oracle.
import assert from 'node:assert/strict';
import { X509Certificate } from 'node:crypto';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { loadRootCa, parseRootCaPem, ROOT_CA_DOWNLOAD_PATH, sha256Fingerprint } from '../src/identra/trust/rootCaPlugin';

// A throwaway self-signed TEST certificate: never the published Identra root.
const TEST_ROOT_PEM = `-----BEGIN CERTIFICATE-----
MIIB5TCCAYugAwIBAgIUf+/I+8ycI3jknTkKS50FdxszFg0wCgYIKoZIzj0EAwIw
SDEvMC0GA1UEAwwmSWRlbnRyYSBURVNUIFJvb3QgKG5vdCBmb3IgcHJvZHVjdGlv
bikxFTATBgNVBAoMDElkZW50cmEgVEVTVDAeFw0yNjExMTgxOTUzMTRaFw0zNjEx
MTUxOTUzMTRaMEgxLzAtBgNVBAMMJklkZW50cmEgVEVTVCBSb290IChub3QgZm9y
IHByb2R1Y3Rpb24pMRUwEwYDVQQKDAxJZGVudHJhIFRFU1QwWTATBgcqhkjOPQIB
BggqhkjOPQMBBwNCAARh46ysDPCNKWo0RGYhvpbHSCy9U3+Brgam+a+FTwS/5vQz
/yVKTTMVsAckdBP9LQrMmrL6W/70wrrNL7MAiDzYo1MwUTAdBgNVHQ4EFgQUFrDx
VVT8/10hfum1Fw24WcD/Gv4wHwYDVR0jBBgwFoAUFrDxVVT8/10hfum1Fw24WcD/
Gv4wDwYDVR0TAQH/BAUwAwEB/zAKBggqhkjOPQQDAgNIADBFAiBpX6vMnEoHmw39
mHzt8vgfffbUN3DxXvemSyVHTz1MmAIhANBA/4kHqrKhEeEjdLTJID79TZay7wwS
lcg4D3cff3QC
-----END CERTIFICATE-----
`;

const withTempDir = (run: (dir: string) => void) => {
  const dir = mkdtempSync(path.join(tmpdir(), 'identra-root-ca-'));
  try {
    run(dir);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
};

test('fingerprint matches node:crypto and is formatted as colon-separated upper-case hex', () => {
  const { der } = parseRootCaPem(TEST_ROOT_PEM);
  const fingerprint = sha256Fingerprint(der);
  assert.equal(fingerprint, new X509Certificate(TEST_ROOT_PEM).fingerprint256);
  assert.match(fingerprint, /^([0-9A-F]{2}:){31}[0-9A-F]{2}$/);
});

test('whitespace and line wrapping do not change the fingerprint; the PEM is normalised', () => {
  const messy = TEST_ROOT_PEM.replace(/\n/g, '\r\n  ');
  const parsed = parseRootCaPem(messy);
  assert.equal(sha256Fingerprint(parsed.der), new X509Certificate(TEST_ROOT_PEM).fingerprint256);
  assert.ok(parsed.pem.startsWith('-----BEGIN CERTIFICATE-----\n'));
  assert.ok(parsed.pem.split('\n').every((line) => line.length <= 64));
});

test('rejects anything but exactly one certificate', () => {
  assert.throws(() => parseRootCaPem(''), /exactly one CERTIFICATE block, found 0/);
  assert.throws(() => parseRootCaPem(TEST_ROOT_PEM + TEST_ROOT_PEM), /found 2/);
  assert.throws(() => parseRootCaPem('-----BEGIN CERTIFICATE-----\nnot base64!\n-----END CERTIFICATE-----'), /base64/);
  assert.throws(() => parseRootCaPem('-----BEGIN CERTIFICATE-----\nAAAA\n-----END CERTIFICATE-----'), /DER/);
  assert.throws(
    () => parseRootCaPem(`${TEST_ROOT_PEM}-----BEGIN PRIVATE KEY-----\nAAAA\n-----END PRIVATE KEY-----\n`),
    /private key/,
  );
});

test('a production build without the file fails with a clear message', () => {
  withTempDir((dir) => {
    const file = path.join(dir, 'root-ca.pem');
    assert.throws(() => loadRootCa({ file, production: true }), (error: Error) => (
      error.message.includes('Missing') && error.message.includes(file) && error.message.includes('IDENTRA_ROOT_CA_FILE')
    ));
  });
});

test('development without the file reports "not configured" instead of failing', () => {
  withTempDir((dir) => {
    assert.deepEqual(loadRootCa({ file: path.join(dir, 'root-ca.pem'), production: false }), {
      configured: false,
      fingerprint: null,
      downloadPath: null,
      pem: null,
    });
  });
});

test('a present file is published with its computed fingerprint, and a broken one fails in any mode', () => {
  withTempDir((dir) => {
    const file = path.join(dir, 'root-ca.pem');
    writeFileSync(file, TEST_ROOT_PEM);
    const loaded = loadRootCa({ file, production: true });
    assert.equal(loaded.configured, true);
    assert.equal(loaded.fingerprint, new X509Certificate(TEST_ROOT_PEM).fingerprint256);
    assert.equal(loaded.downloadPath, ROOT_CA_DOWNLOAD_PATH);

    writeFileSync(file, 'garbage');
    assert.throws(() => loadRootCa({ file, production: false }), /identra-root-ca/);
  });
});
