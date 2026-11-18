/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Build step for the Identra Root CA certificate(s) published on the website (ADR-0015 section 8).
// `root-ca.pem` is the pinned DEMO root of the deployment PKI; `root-ca-next.pem`, when present, is the
// second root of a rollover (code pins one or two roots). Each certificate is parsed at build time with
// node:crypto and must be a self-signed P-256 CA allowed to sign certificates. Fingerprints are computed
// here, never written by hand. Any `vite build` without the current root fails; the dev server runs and
// the page says "not configured". IDENTRA_EXPECTED_ROOT_SHA256 (set by the deploy script from the
// server's pinned root) makes the build fail when no published root matches it.

import { X509Certificate, createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';

export const ROOT_CA_VIRTUAL_ID = 'virtual:identra-root-ca';

export type RootCaSlot = 'current' | 'next';

export const ROOT_CA_DOWNLOAD_PATHS: Record<RootCaSlot, string> = {
  current: '/trust/identra-root-ca.pem',
  next: '/trust/identra-root-ca-next.pem',
};

export interface PublishedRoot {
  slot: RootCaSlot;
  fingerprint: string;
  downloadPath: string;
}

/** What pages import: zero, one or two published roots. */
export interface RootCaModule {
  roots: PublishedRoot[];
}

export interface LoadedRoot extends PublishedRoot {
  pem: string;
}

const fail = (file: string, message: string): never => {
  throw new Error(`[identra-root-ca] ${file}: ${message}`);
};

/** Upper-case hex pairs joined by colons, the form people compare by eye. */
export const sha256Fingerprint = (der: Uint8Array): string =>
  (createHash('sha256').update(der).digest('hex').toUpperCase().match(/.{2}/g) ?? []).join(':');

/** Hex digits only, upper case: "ad:70:…" and "AD70…" compare equal. */
export const normalizeFingerprint = (value: string): string => value.replace(/[^0-9a-fA-F]/g, '').toUpperCase();

// ---- Minimal DER reading, only to find the keyUsage extension (node:crypto does not expose it) ----

interface Tlv { tag: number; start: number; end: number }

const readTlv = (der: Uint8Array, offset: number): Tlv => {
  if (offset + 2 > der.length) throw new Error('truncated DER');
  const tag = der[offset]!;
  let length = der[offset + 1]!;
  let start = offset + 2;
  if (length & 0x80) {
    const count = length & 0x7f;
    if (count < 1 || count > 4) throw new Error('unsupported DER length');
    length = 0;
    for (let i = 0; i < count; i += 1) length = length * 256 + der[start + i]!;
    start += count;
  }
  if (start + length > der.length) throw new Error('truncated DER');
  return { tag, start, end: start + length };
};

const children = (der: Uint8Array, parent: Tlv): Tlv[] => {
  const out: Tlv[] = [];
  for (let offset = parent.start; offset < parent.end;) {
    const child = readTlv(der, offset);
    out.push(child);
    offset = child.end;
  }
  return out;
};

const KEY_USAGE_OID = [0x06, 0x03, 0x55, 0x1d, 0x0f]; // 2.5.29.15

/** The keyUsage bit string's first byte (bit 5, 0x04, is keyCertSign), or null when the extension is absent. */
export const keyUsageFirstByte = (der: Uint8Array): number | null => {
  const certificate = readTlv(der, 0);
  const tbs = children(der, certificate)[0];
  if (!tbs) throw new Error('no TBSCertificate');
  const extensionsWrapper = children(der, tbs).find((tlv) => tlv.tag === 0xa3);
  if (!extensionsWrapper) return null;
  const list = children(der, extensionsWrapper)[0];
  if (!list) return null;
  for (const extension of children(der, list)) {
    const [oid, ...rest] = children(der, extension);
    if (!oid || !KEY_USAGE_OID.every((byte, i) => der[oid.start - 2 + i] === byte)) continue;
    const value = rest.find((tlv) => tlv.tag === 0x04);
    if (!value) throw new Error('keyUsage without a value');
    const bits = readTlv(der, value.start);
    if (bits.tag !== 0x03 || bits.end - bits.start < 2) throw new Error('keyUsage is not a BIT STRING');
    return der[bits.start + 1]!;
  }
  return null;
};

/**
 * Exactly one PEM certificate, no private key, and it must be a self-signed P-256 CA certificate that may
 * sign certificates and is valid now. Returns its DER, a normalised PEM and the fingerprint.
 */
export const parseRootCaPem = (pem: string, file = 'root CA', now = new Date()): { der: Buffer; pem: string; fingerprint: string } => {
  if (/-----BEGIN [A-Z ]*PRIVATE KEY-----/.test(pem)) fail(file, 'contains a private key; publish the certificate only');
  const blocks = [...pem.matchAll(/-----BEGIN CERTIFICATE-----([\s\S]*?)-----END CERTIFICATE-----/g)];
  if (blocks.length !== 1) fail(file, `expected exactly one CERTIFICATE block, found ${blocks.length}`);
  const body = blocks[0]![1]!.replace(/\s+/g, '');
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(body) || body.length % 4 !== 0) fail(file, 'the certificate body is not valid base64');
  const der = Buffer.from(body, 'base64');

  let certificate: X509Certificate;
  try {
    certificate = new X509Certificate(der);
  } catch {
    return fail(file, 'not a parseable X.509 certificate');
  }
  if (!certificate.ca) fail(file, 'not a CA certificate (basicConstraints CA:TRUE is required)');
  let usage: number | null;
  try {
    usage = keyUsageFirstByte(der);
  } catch (error) {
    return fail(file, `cannot read keyUsage: ${(error as Error).message}`);
  }
  if (usage === null || (usage & 0x04) === 0) fail(file, 'keyUsage must include keyCertSign');
  if (certificate.subject !== certificate.issuer || !certificate.verify(certificate.publicKey)) fail(file, 'not self-signed');
  const key = certificate.publicKey;
  if (key.asymmetricKeyType !== 'ec' || key.asymmetricKeyDetails?.namedCurve !== 'prime256v1') {
    fail(file, 'the key must be an EC P-256 key');
  }
  if (Date.parse(certificate.validFrom) > now.getTime() || Date.parse(certificate.validTo) <= now.getTime()) {
    fail(file, `not valid now (valid ${certificate.validFrom} to ${certificate.validTo})`);
  }

  const lines = body.match(/.{1,64}/g) ?? [];
  return {
    der,
    pem: `-----BEGIN CERTIFICATE-----\n${lines.join('\n')}\n-----END CERTIFICATE-----\n`,
    fingerprint: sha256Fingerprint(der),
  };
};

export interface RootCaFiles {
  current: string;
  next: string;
}

/** Loads the current root (required for a build) and the optional next root, then applies the expectation. */
export const loadRootCas = (options: {
  files: RootCaFiles;
  isBuild: boolean;
  expectedSha256?: string | undefined;
  now?: Date;
}): LoadedRoot[] => {
  const { files, isBuild } = options;
  if (!existsSync(files.current)) {
    if (isBuild) {
      fail(files.current, 'missing. A build must publish the Identra Root CA: place the PEM certificate there '
        + '(or set IDENTRA_ROOT_CA_FILE) and build again.');
    }
    if (existsSync(files.next)) fail(files.next, 'a next root without a current root');
    return [];
  }

  const roots: LoadedRoot[] = (['current', 'next'] as const)
    .filter((slot) => slot === 'current' || existsSync(files[slot]))
    .map((slot) => {
      const parsed = parseRootCaPem(readFileSync(files[slot], 'utf8'), files[slot], options.now);
      return { slot, fingerprint: parsed.fingerprint, downloadPath: ROOT_CA_DOWNLOAD_PATHS[slot], pem: parsed.pem };
    });
  if (roots.length === 2 && roots[0]!.fingerprint === roots[1]!.fingerprint) fail(files.next, 'is the same certificate as the current root');

  const expected = options.expectedSha256?.trim();
  if (expected) {
    const wanted = normalizeFingerprint(expected);
    if (wanted.length !== 64) fail('IDENTRA_EXPECTED_ROOT_SHA256', 'must be a SHA-256 fingerprint (64 hex digits)');
    if (!roots.some((root) => normalizeFingerprint(root.fingerprint) === wanted)) {
      fail(
        'IDENTRA_EXPECTED_ROOT_SHA256',
        `no published root matches ${expected}; published: ${roots.map((root) => root.fingerprint).join(', ')}`,
      );
    }
  }
  return roots;
};

export const identraRootCaPlugin = (options: { defaultDir: string }): Plugin => {
  const resolvedId = `\0${ROOT_CA_VIRTUAL_ID}`;
  const files: RootCaFiles = {
    current: process.env.IDENTRA_ROOT_CA_FILE
      ? path.resolve(process.env.IDENTRA_ROOT_CA_FILE)
      : path.join(options.defaultDir, 'root-ca.pem'),
    next: process.env.IDENTRA_ROOT_CA_NEXT_FILE
      ? path.resolve(process.env.IDENTRA_ROOT_CA_NEXT_FILE)
      : path.join(options.defaultDir, 'root-ca-next.pem'),
  };
  let roots: LoadedRoot[] = [];
  let isSsrBuild = false;

  return {
    name: 'identra-root-ca',
    configResolved(config) {
      isSsrBuild = Boolean(config.build.ssr);
      roots = loadRootCas({
        files,
        isBuild: config.command === 'build',
        expectedSha256: process.env.IDENTRA_EXPECTED_ROOT_SHA256,
      });
    },
    resolveId(id) {
      return id === ROOT_CA_VIRTUAL_ID ? resolvedId : null;
    },
    load(id) {
      if (id !== resolvedId) return null;
      const exported: RootCaModule = {
        roots: roots.map(({ slot, fingerprint, downloadPath }) => ({ slot, fingerprint, downloadPath })),
      };
      return `export default ${JSON.stringify(exported)};`;
    },
    generateBundle() {
      if (isSsrBuild) return;
      for (const root of roots) this.emitFile({ type: 'asset', fileName: root.downloadPath.slice(1), source: root.pem });
    },
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const root = roots.find((candidate) => candidate.downloadPath === request.url?.split('?')[0]);
        if (!root) {
          next();
          return;
        }
        response.setHeader('Content-Type', 'application/x-pem-file');
        response.end(root.pem);
      });
    },
  };
};
