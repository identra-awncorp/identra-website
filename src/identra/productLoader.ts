/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Loaded only by the product page, with a dynamic import: it brings sdk-core's verifier (the chain
// validator, the trust list and status list checks) into its own chunk, never into the site's main
// bundle. Named imports keep the rest of sdk-core (issuance, presentation) out of that chunk too.
import { createProductVerifier, type ProductView } from '@identra/sdk-client/product';
import { formatDigitalLinkPath, formatProductCode, parseDigitalLinkPath } from '@identra/sdk-core';
import rootCa from 'virtual:identra-root-ca';
import { IDENTRA_API_ORIGIN, IDENTRA_API_URL } from './config';

const fromBase64 = (value: string): Uint8Array => Uint8Array.from(atob(value), (character) => character.charCodeAt(0));

/** The Identra root certificate(s) published on the Security page, pinned from the same build-time source. */
export const PINNED_ROOTS: Uint8Array[] = rootCa.roots.map((root) => fromBase64(root.der));

/** `null` for anything but exactly `/01/<GTIN-14>/21/<serial>` (the SDK's parser; nothing else decides). */
export const parseProductPath = (pathname: string) => parseDigitalLinkPath(pathname);

export { formatDigitalLinkPath, formatProductCode };

/**
 * Verifies the product's whole chain in the browser. A fresh verifier per run, so "check again" also
 * re-fetches the trust list and status lists (the SDK itself never uses the HTTP cache).
 */
export const verifyProduct = (gtin: string, serial: string): Promise<ProductView> =>
  createProductVerifier({
    apiBaseUrl: IDENTRA_API_URL,
    canonicalApiOrigin: IDENTRA_API_ORIGIN,
    rootCertificates: PINNED_ROOTS,
  }).load(gtin, serial);
