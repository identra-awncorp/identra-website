/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// The Root CA build step: strict certificate checks, one or two roots, fingerprints from node:crypto,
// a missing root fails any build, and IDENTRA_EXPECTED_ROOT_SHA256 must match a published root.
import assert from 'node:assert/strict';
import { X509Certificate } from 'node:crypto';
import { copyFileSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {
  keyUsageFirstByte,
  loadRootCas,
  normalizeFingerprint,
  parseRootCaPem,
  ROOT_CA_DOWNLOAD_PATHS,
  sha256Fingerprint,
} from '../src/identra/trust/rootCaPlugin';

// Throwaway TEST certificates (tests/fixtures/root-ca), never the published Identra root.
const fixture = (name: string) => readFileSync(path.resolve('tests/fixtures/root-ca', `${name}.pem`), 'utf8');
const ROOT1 = fixture('root1');
const ROOT2 = fixture('root2');
const fingerprintOf = (pem: string) => new X509Certificate(pem).fingerprint256;

const withDir = (run: (dir: string, files: { current: string; next: string }) => void) => {
  const dir = mkdtempSync(path.join(tmpdir(), 'identra-root-ca-'));
  try {
    run(dir, { current: path.join(dir, 'root-ca.pem'), next: path.join(dir, 'root-ca-next.pem') });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
};

test('the committed DEMO root passes every check', () => {
  const parsed = parseRootCaPem(readFileSync(path.resolve('src/identra/trust/root-ca.pem'), 'utf8'));
  assert.equal(parsed.fingerprint, fingerprintOf(readFileSync(path.resolve('src/identra/trust/root-ca.pem'), 'utf8')));
});

test('fingerprint matches node:crypto and is colon-separated upper-case hex; whitespace does not matter', () => {
  const parsed = parseRootCaPem(ROOT1.replace(/\n/g, '\r\n  '));
  assert.equal(parsed.fingerprint, fingerprintOf(ROOT1));
  assert.equal(sha256Fingerprint(parsed.der), parsed.fingerprint);
  assert.match(parsed.fingerprint, /^([0-9A-F]{2}:){31}[0-9A-F]{2}$/);
  assert.ok(parsed.pem.split('\n').every((line) => line.length <= 64));
  assert.equal(normalizeFingerprint('ad:70:fa'), 'AD70FA');
});

test('keyUsage is read from the DER: keyCertSign set on a root, absent on a CA without the extension', () => {
  const der = (pem: string) => new X509Certificate(pem).raw;
  assert.equal((keyUsageFirstByte(der(ROOT1)) ?? 0) & 0x04, 0x04);
  assert.equal(keyUsageFirstByte(der(fixture('noku'))), null);
});

test('rejects what is not a self-signed P-256 CA root that may sign certificates', () => {
  const cases: Array<[string, RegExp]> = [
    ['', /exactly one CERTIFICATE block, found 0/],
    [ROOT1 + ROOT2, /found 2/],
    ['-----BEGIN CERTIFICATE-----\nnot base64!\n-----END CERTIFICATE-----', /base64/],
    ['-----BEGIN CERTIFICATE-----\nAAAA\n-----END CERTIFICATE-----', /not a parseable X\.509/],
    [`${ROOT1}-----BEGIN EC PRIVATE KEY-----\nAAAA\n-----END EC PRIVATE KEY-----\n`, /private key/],
    [fixture('leafself'), /not a CA certificate/],
    [fixture('noksign'), /not a CA certificate|keyCertSign/],
    [fixture('noku'), /keyCertSign/],
    [fixture('issued'), /not self-signed/],
    [fixture('rsa'), /EC P-256/],
    [fixture('p384'), /EC P-256/],
  ];
  for (const [pem, message] of cases) assert.throws(() => parseRootCaPem(pem, 'x.pem'), message);
  assert.throws(() => parseRootCaPem(ROOT1, 'x.pem', new Date('2099-01-01')), /not valid now/);
});

test('any build without the current root fails with a clear message; dev reports nothing to publish', () => {
  withDir((_, files) => {
    assert.throws(() => loadRootCas({ files, isBuild: true }), (error: Error) => (
      error.message.includes('missing') && error.message.includes(files.current) && error.message.includes('IDENTRA_ROOT_CA_FILE')
    ));
    assert.deepEqual(loadRootCas({ files, isBuild: false }), []);
    writeFileSync(files.next, ROOT2);
    assert.throws(() => loadRootCas({ files, isBuild: false }), /next root without a current root/);
  });
});

test('one or two roots are published, each with its fingerprint and download path', () => {
  withDir((_, files) => {
    writeFileSync(files.current, ROOT1);
    assert.deepEqual(loadRootCas({ files, isBuild: true }).map(({ slot, fingerprint, downloadPath }) => ({ slot, fingerprint, downloadPath })), [
      { slot: 'current', fingerprint: fingerprintOf(ROOT1), downloadPath: ROOT_CA_DOWNLOAD_PATHS.current },
    ]);
    writeFileSync(files.next, ROOT2);
    const roots = loadRootCas({ files, isBuild: true });
    assert.deepEqual(roots.map((root) => [root.slot, root.fingerprint, root.downloadPath]), [
      ['current', fingerprintOf(ROOT1), '/trust/identra-root-ca.pem'],
      ['next', fingerprintOf(ROOT2), '/trust/identra-root-ca-next.pem'],
    ]);
    copyFileSync(files.current, files.next);
    assert.throws(() => loadRootCas({ files, isBuild: true }), /same certificate/);
    writeFileSync(files.next, 'garbage');
    assert.throws(() => loadRootCas({ files, isBuild: false }), /identra-root-ca/);
  });
});

test('IDENTRA_EXPECTED_ROOT_SHA256 must match one of the published roots', () => {
  withDir((_, files) => {
    writeFileSync(files.current, ROOT1);
    writeFileSync(files.next, ROOT2);
    const second = fingerprintOf(ROOT2);
    assert.equal(loadRootCas({ files, isBuild: true, expectedSha256: second.toLowerCase().replaceAll(':', '') }).length, 2);
    assert.equal(loadRootCas({ files, isBuild: true, expectedSha256: ` ${second} ` }).length, 2);
    assert.throws(() => loadRootCas({ files, isBuild: true, expectedSha256: 'AB'.repeat(32) }), /no published root matches/);
    assert.throws(() => loadRootCas({ files, isBuild: true, expectedSha256: 'abc' }), /64 hex digits/);
  });
});
