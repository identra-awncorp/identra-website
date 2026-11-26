/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// The web trial wallet ("Ví thử trên web"): the SDK's own wallet (@identra/sdk-app) running in the page,
// assembled the way the e2e harness assembles its Node wallet (e2e/wallet/wallet.mjs), with browser
// stand-ins for what a phone provides. Real protocol, real cryptography, real API; what differs from the
// Identra app is where the secrets live: here keys and credentials are JavaScript values in this tab's
// memory (gone on reload), on the phone they sit in the secure hardware. Nothing is written to storage.
// Loaded only through a dynamic import (demoWalletLoader.ts), never by the marketing bundle.
import { createCertNetDidResolver, createCertNetTrustRegistry, createMappedFetch, type HttpFetch } from '@identra/sdk-core';
import type { CertNetConfig } from './config';
import {
  createCredentialVault,
  createInMemoryCredentialRepository,
  createInMemorySecretStorage,
  createSoftwareKeyStore,
  createWallet,
  DEFAULT_MAX_BYTES,
  PROTOCOL_TIMEOUT_MS,
  type Wallet,
} from '@identra/sdk-app';

/**
 * An answer bigger than the call allows is not read further. It comes back as an empty answer that declares
 * the bytes seen, so the SDK's guard refuses it as the server's fault (ISSUER_ERROR, "sent more than"), not as
 * the visitor's network: throwing here would be reported as NETWORK_ERROR.
 */
const tooLarge = (status: number, size: number) =>
  ({ status, headers: new Headers({ 'content-length': String(size) }), text: async () => '' });

/**
 * The SDK's HttpFetch on top of the browser's fetch (architecture section 2): never follows a redirect
 * (`manual`: the browser hands back an opaque answer, reported as a 3xx so the wallet refuses it), aborts
 * at `timeoutMs` (body included) and stops reading as soon as the body passes `maxBytes`. No cookies, no
 * HTTP cache, no referrer.
 */
export const createBrowserFetch = (doFetch: typeof fetch = (...args) => globalThis.fetch(...args)): HttpFetch =>
  async (url, init) => {
    const maxBytes = init?.maxBytes ?? DEFAULT_MAX_BYTES;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), init?.timeoutMs ?? PROTOCOL_TIMEOUT_MS);
    try {
      const response = await doFetch(url, {
        method: init?.method ?? 'GET',
        ...(init?.headers && { headers: init.headers }),
        ...(init?.body !== undefined && { body: init.body }),
        redirect: 'manual',
        credentials: 'omit',
        cache: 'no-store',
        referrerPolicy: 'no-referrer',
        signal: controller.signal,
      });
      if (response.type === 'opaqueredirect') {
        return { status: 302, headers: new Headers(), text: async () => '' };
      }
      const declared = Number(response.headers.get('content-length') ?? 0);
      if (declared > maxBytes) {
        controller.abort();
        return tooLarge(response.status, declared);
      }
      const chunks: Uint8Array[] = [];
      let size = 0;
      const reader = response.body?.getReader();
      if (reader) {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          size += value.byteLength;
          if (size > maxBytes) {
            controller.abort();
            return tooLarge(response.status, size);
          }
          chunks.push(value);
        }
      }
      const bytes = new Uint8Array(size);
      let offset = 0;
      for (const chunk of chunks) {
        bytes.set(chunk, offset);
        offset += chunk.byteLength;
      }
      const text = new TextDecoder().decode(bytes);
      return { status: response.status, headers: response.headers, text: async () => text };
    } finally {
      clearTimeout(timer);
    }
  };

export interface DemoWalletOptions {
  /** The canonical API origin: offers and requests must name it (the app's `allowedOrigins`). */
  apiOrigin: string;
  /** Where requests for the canonical origin go (the same origin in production, a loopback in development). */
  apiUrl: string;
  /** The pinned Identra root(s), DER. */
  trustedRoots: Uint8Array[];
  /** Tests only: the browser's fetch stand-in. */
  fetch?: typeof fetch;
  /** The wallet's clock; the page passes one corrected by the server's clock (a wrong device clock breaks every time check). */
  clock?: { now(): Date };
  /** The CertNet gateway (config.ts); null or absent: the CertNet path is off, as without this option. */
  certnet?: CertNetConfig | null;
}

/**
 * The SDK's CertNet resolver and trust registry (ADR-0020), over the same browser fetch: no redirect, the
 * SDK's 5 s timeout and size cap, the gateway origin only (mapped to a loopback address in local work).
 */
export const createCertNetPath = (certnet: CertNetConfig, browserFetch: HttpFetch, clock: { now(): Date }) => {
  const origin = new URL(certnet.gatewayUrl).origin;
  const toGateway = certnet.fetchOrigin === origin ? browserFetch : createMappedFetch(browserFetch, { [origin]: certnet.fetchOrigin });
  // Only the gateway: any other URL is refused before the network (the SDK reads that as "no answer").
  const fetch: HttpFetch = (url, init) => (url.startsWith(`${origin}/`) ? toGateway(url, init) : Promise.reject(new TypeError('not the CertNet gateway')));
  const { gatewayUrl, network } = certnet;
  return {
    resolver: createCertNetDidResolver({ gatewayUrl, network, fetch, clock }),
    trustRegistry: createCertNetTrustRegistry({ gatewayUrl, network, fetch }),
  };
};

/** A fresh wallet with nothing in it. Each call is a new "phone": new keys, empty vault. */
export const createDemoWallet = ({ apiOrigin, apiUrl, trustedRoots, fetch: doFetch, clock = { now: () => new Date() }, certnet = null }: DemoWalletOptions): Wallet => {
  const browserFetch = createBrowserFetch(doFetch);
  const fetchForWallet = apiUrl === apiOrigin ? browserFetch : createMappedFetch(browserFetch, { [apiOrigin]: apiUrl });
  const random = { bytes: (n: number) => globalThis.crypto.getRandomValues(new Uint8Array(n)) };
  return createWallet({
    keyStore: createSoftwareKeyStore({ secrets: createInMemorySecretStorage(), random }),
    vault: createCredentialVault({
      repository: createInMemoryCredentialRepository(),
      secrets: createInMemorySecretStorage(),
      random,
      clock,
    }),
    fetch: fetchForWallet,
    random,
    clock,
    trustedRoots,
    trustListUrl: `${apiOrigin}/trust-list`,
    allowedOrigins: [apiOrigin],
    ...(certnet && { dpki: createCertNetPath(certnet, browserFetch, clock) }),
  });
};

export type { Wallet };
