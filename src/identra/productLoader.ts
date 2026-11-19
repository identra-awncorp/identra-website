/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Loaded only by the product page, with a dynamic import: it brings sdk-core's verifier (the chain
// validator, the trust list and status list checks) into its own chunk, never into the site's main
// bundle. The GS1 path parser lives in the page itself, so an invalid code never waits for this chunk.
import { createProductVerifier, type ProductView } from '@identra/sdk-client/product';
import rootCa from 'virtual:identra-root-ca';
import { IDENTRA_API_ORIGIN, IDENTRA_API_URL } from './config';

const fromBase64 = (value: string): Uint8Array => Uint8Array.from(atob(value), (character) => character.charCodeAt(0));

/** The Identra root certificate(s) published on the Security page, pinned from the same build-time source. */
export const PINNED_ROOTS: Uint8Array[] = rootCa.roots.map((root) => fromBase64(root.der));

/**
 * Verifies the product's whole chain in the browser. A fresh verifier per run, so "check again" also
 * re-fetches the trust list and status lists (the SDK itself never uses the HTTP cache).
 *
 * `eventsHttpStatus` is the HTTP status of the events answer when one arrived, observed (never changed)
 * on the way through: the SDK reports every non-200, non-404 answer as `network_error`, and the page must
 * not blame the shopper's network for a server that answered 500 or 429.
 */
export const verifyProduct = async (gtin: string, serial: string): Promise<{ view: ProductView; eventsHttpStatus: number | null }> => {
  let eventsHttpStatus: number | null = null;
  const observingFetch: typeof fetch = async (input, init) => {
    const response = await globalThis.fetch(input, init);
    if (String(input instanceof Request ? input.url : input).endsWith('/events')) eventsHttpStatus = response.status;
    return response;
  };
  const view = await createProductVerifier({
    apiBaseUrl: IDENTRA_API_URL,
    canonicalApiOrigin: IDENTRA_API_ORIGIN,
    rootCertificates: PINNED_ROOTS,
    fetch: observingFetch,
  }).load(gtin, serial);
  return { view, eventsHttpStatus };
};
