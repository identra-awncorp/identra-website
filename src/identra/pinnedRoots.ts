/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import rootCa from 'virtual:identra-root-ca';

const fromBase64 = (value: string): Uint8Array => Uint8Array.from(atob(value), (character) => character.charCodeAt(0));

/**
 * The Identra root certificate(s) published on the Security page, pinned from the same build-time source, for the
 * web trial wallet. (The product page pins them the same way in productLoader.ts, kept apart so its chunk does not change.)
 */
export const PINNED_ROOTS: Uint8Array[] = rootCa.roots.map((root) => fromBase64(root.der));
