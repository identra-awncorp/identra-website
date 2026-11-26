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

const env = (import.meta as { env?: Record<string, string | undefined> }).env;

export const IDENTRA_API_URL = resolveIdentraApiUrl(env?.VITE_IDENTRA_API_URL);

// The CertNet gateway (ADR-0020): the second way the web trial wallet recognises an issuer, beside the
// X.509 certificate and the trust list. Off unless both variables are set; off is exactly the site
// without it (no request to any gateway, offers of such issuers refused by the wallet).
export const CERTNET_NETWORKS = ['local', 'testnet', 'mainnet'] as const;
export type CertNetNetwork = typeof CERTNET_NETWORKS[number];

export interface CertNetConfig {
  /** The https gateway URL the SDK is given (origin and optional path prefix, no trailing slash). */
  gatewayUrl: string;
  /** Where its requests really go: the same origin, or plain http on the loopback interface for local work. */
  fetchOrigin: string;
  network: CertNetNetwork;
}

const GATEWAY_PATH = /^(\/[A-Za-z0-9._~-]+)*\/?$/;

/** Both values or neither (null: the CertNet path is off). Same address rule as VITE_IDENTRA_API_URL. */
export const resolveCertNetConfig = (gatewayValue: string | undefined, networkValue: string | undefined): CertNetConfig | null => {
  const gateway = gatewayValue?.trim() ?? '';
  const network = networkValue?.trim() ?? '';
  if (!gateway && !network) return null;
  if (!gateway || !network) {
    throw new Error('VITE_CERTNET_GATEWAY_URL and VITE_CERTNET_NETWORK must be set together, or both left empty to turn the CertNet path off.');
  }
  if (!(CERTNET_NETWORKS as readonly string[]).includes(network)) {
    throw new Error(`VITE_CERTNET_NETWORK must be one of ${CERTNET_NETWORKS.join(', ')}.`);
  }
  let url: URL;
  try {
    url = new URL(gateway);
  } catch {
    throw new Error('VITE_CERTNET_GATEWAY_URL must be an absolute URL.');
  }
  if (url.protocol !== 'https:' && !(url.protocol === 'http:' && isLoopback(url.hostname))) {
    throw new Error('VITE_CERTNET_GATEWAY_URL must be an https URL (http is allowed for 127.0.0.1 / localhost only).');
  }
  if (url.username || url.password || url.search || url.hash || gateway.includes('?') || gateway.includes('#') || !GATEWAY_PATH.test(url.pathname)) {
    throw new Error('VITE_CERTNET_GATEWAY_URL must be an origin with an optional path, without credentials, query or fragment.');
  }
  const path = url.pathname.replace(/\/$/, '');
  return { gatewayUrl: `https://${url.host}${path}`, fetchOrigin: url.origin, network: network as CertNetNetwork };
};

export const CERTNET_CONFIG = resolveCertNetConfig(env?.VITE_CERTNET_GATEWAY_URL, env?.VITE_CERTNET_NETWORK);

/** The issuer and verifier this website demonstrates (vc-api.md sections 4-6). */
export const SAMPLE_ISSUER = 'truong-mau';
export const SAMPLE_VERIFIER = 'nha-tuyen-dung-mau';
/** The sample verifier's organisation identifier in the trust list (ADR-0015 section 9). */
export const SAMPLE_VERIFIER_ORGANISATION = 'VATVN-0100000005';
export const SAMPLE_VERIFIER_SCENARIO = 'ung-tuyen';
