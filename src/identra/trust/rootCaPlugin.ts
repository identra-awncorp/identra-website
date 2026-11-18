/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Build step for the Identra Root CA certificate published on the website (ADR-0015 section 8).
// The certificate is read from `src/identra/trust/root-ca.pem` (or IDENTRA_ROOT_CA_FILE); its SHA-256
// fingerprint is computed here at build time and is never written by hand anywhere in the source.
// A production build without the file fails; a dev server runs and the page says "not configured".

import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';

export const ROOT_CA_VIRTUAL_ID = 'virtual:identra-root-ca';
export const ROOT_CA_DOWNLOAD_PATH = '/trust/identra-root-ca.pem';

export interface RootCaModule {
  configured: boolean;
  fingerprint: string | null;
  downloadPath: string | null;
}

export interface LoadedRootCa extends RootCaModule {
  pem: string | null;
}

/** Strictly one PEM CERTIFICATE block; returns its DER bytes and a normalised PEM. */
export const parseRootCaPem = (pem: string): { der: Buffer; pem: string } => {
  const blocks = [...pem.matchAll(/-----BEGIN CERTIFICATE-----([\s\S]*?)-----END CERTIFICATE-----/g)];
  if (blocks.length !== 1) {
    throw new Error(`expected exactly one CERTIFICATE block, found ${blocks.length}`);
  }
  if (/-----BEGIN [A-Z ]*PRIVATE KEY-----/.test(pem)) {
    throw new Error('the file contains a private key; publish the certificate only');
  }
  const body = blocks[0]![1]!.replace(/\s+/g, '');
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(body) || body.length % 4 !== 0) {
    throw new Error('the certificate body is not valid base64');
  }
  const der = Buffer.from(body, 'base64');
  // A DER certificate is a SEQUENCE (0x30) with a long-form length.
  if (der.length < 128 || der[0] !== 0x30) {
    throw new Error('the certificate body is not a DER-encoded certificate');
  }
  const lines = body.match(/.{1,64}/g) ?? [];
  return { der, pem: `-----BEGIN CERTIFICATE-----\n${lines.join('\n')}\n-----END CERTIFICATE-----\n` };
};

/** Upper-case hex pairs joined by colons, the form people compare by eye. */
export const sha256Fingerprint = (der: Uint8Array): string =>
  (createHash('sha256').update(der).digest('hex').toUpperCase().match(/.{2}/g) ?? []).join(':');

export const loadRootCa = (options: { file: string; production: boolean }): LoadedRootCa => {
  if (!existsSync(options.file)) {
    if (options.production) {
      throw new Error(
        `[identra-root-ca] Missing ${options.file}. A production build must publish the Identra Root CA: `
        + 'place the PEM certificate there (or set IDENTRA_ROOT_CA_FILE) and build again.',
      );
    }
    return { configured: false, fingerprint: null, downloadPath: null, pem: null };
  }

  try {
    const { der, pem } = parseRootCaPem(readFileSync(options.file, 'utf8'));
    return { configured: true, fingerprint: sha256Fingerprint(der), downloadPath: ROOT_CA_DOWNLOAD_PATH, pem };
  } catch (error) {
    throw new Error(`[identra-root-ca] ${options.file}: ${(error as Error).message}`, { cause: error });
  }
};

export const identraRootCaPlugin = (options: { defaultFile: string }): Plugin => {
  const resolvedId = `\0${ROOT_CA_VIRTUAL_ID}`;
  const file = process.env.IDENTRA_ROOT_CA_FILE
    ? path.resolve(process.env.IDENTRA_ROOT_CA_FILE)
    : options.defaultFile;
  let rootCa: LoadedRootCa = { configured: false, fingerprint: null, downloadPath: null, pem: null };
  let isSsrBuild = false;

  return {
    name: 'identra-root-ca',
    configResolved(config) {
      isSsrBuild = Boolean(config.build.ssr);
      rootCa = loadRootCa({ file, production: config.command === 'build' && config.mode === 'production' });
    },
    resolveId(id) {
      return id === ROOT_CA_VIRTUAL_ID ? resolvedId : null;
    },
    load(id) {
      if (id !== resolvedId) return null;
      const exported: RootCaModule = {
        configured: rootCa.configured,
        fingerprint: rootCa.fingerprint,
        downloadPath: rootCa.downloadPath,
      };
      return `export default ${JSON.stringify(exported)};`;
    },
    generateBundle() {
      if (isSsrBuild || !rootCa.pem) return;
      this.emitFile({ type: 'asset', fileName: ROOT_CA_DOWNLOAD_PATH.slice(1), source: rootCa.pem });
    },
    configureServer(server) {
      server.middlewares.use(ROOT_CA_DOWNLOAD_PATH, (_request, response, next) => {
        if (!rootCa.pem) {
          next();
          return;
        }
        response.setHeader('Content-Type', 'application/x-pem-file');
        response.end(rootCa.pem);
      });
    },
  };
};
