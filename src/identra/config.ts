/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// The one place that knows where the Identra API lives (vc-api.md section 1).
/** The canonical API origin: identifiers (offer and request URIs) always use it, in every environment. */
export const IDENTRA_API_ORIGIN = 'https://api-identra.awncorp.vn';
export const DEFAULT_IDENTRA_API_URL = IDENTRA_API_ORIGIN;

const isLoopback = (hostname: string) => hostname === '127.0.0.1' || hostname === 'localhost';

/** Where requests go: an https origin, or plain http on the loopback interface for local development. */
export const resolveIdentraApiUrl = (value: string | undefined): string => {
  if (!value?.trim()) return DEFAULT_IDENTRA_API_URL;

  const url = new URL(value.trim());
  if (url.protocol !== 'https:' && !(url.protocol === 'http:' && isLoopback(url.hostname))) {
    throw new Error('VITE_IDENTRA_API_URL must be an https URL (http is allowed for 127.0.0.1 / localhost only).');
  }
  return url.origin;
};

export const IDENTRA_API_URL = resolveIdentraApiUrl(
  (import.meta as { env?: Record<string, string | undefined> }).env?.VITE_IDENTRA_API_URL,
);

/** The issuer and verifier this website demonstrates (vc-api.md sections 4-6). */
export const SAMPLE_ISSUER = 'truong-mau';
export const SAMPLE_VERIFIER = 'nha-tuyen-dung-mau';
/** The sample verifier's organisation identifier in the trust list (ADR-0015 section 9). */
export const SAMPLE_VERIFIER_ORGANISATION = 'VATVN-0100000005';
export const SAMPLE_VERIFIER_SCENARIO = 'ung-tuyen';
