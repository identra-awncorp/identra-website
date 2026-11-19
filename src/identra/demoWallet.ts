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
import { createMappedFetch, type HttpFetch } from '@identra/sdk-core';
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

/** A response bigger than the wallet allowed for this call; the guard reports it as an issuer error. */
export class ResponseTooLargeError extends Error {
  constructor() {
    super('response too large');
    this.name = 'ResponseTooLargeError';
  }
}

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
      if (Number(response.headers.get('content-length') ?? 0) > maxBytes) {
        controller.abort();
        throw new ResponseTooLargeError();
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
            throw new ResponseTooLargeError();
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
}

/** A fresh wallet with nothing in it. Each call is a new "phone": new keys, empty vault. */
export const createDemoWallet = ({ apiOrigin, apiUrl, trustedRoots, fetch: doFetch }: DemoWalletOptions): Wallet => {
  const browserFetch = createBrowserFetch(doFetch);
  const fetchForWallet = apiUrl === apiOrigin ? browserFetch : createMappedFetch(browserFetch, { [apiOrigin]: apiUrl });
  const random = { bytes: (n: number) => globalThis.crypto.getRandomValues(new Uint8Array(n)) };
  const clock = { now: () => new Date() };
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
  });
};

export type { Wallet };
