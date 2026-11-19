/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Client for the school-portal demo endpoints (vc-api.md section 5) and the registrar's status change
// (section 3). Demo-specific, so it lives in the website rather than in @identra/sdk-client.
// Every response is validated before use; nothing here logs or stores tokens, PINs or personal data.
// Everything a student creates belongs to the portal session (one login), not to the shared account.

export type PortalRole = 'student' | 'registrar';
export type CredentialStatus = 'valid' | 'revoked' | 'suspended';
export type OfferStatus = 'pending' | 'issued' | 'expired';

export interface StudentProfile {
  hoTen: string;
  ngaySinh: string;
  maSinhVien: string;
  nganh: string;
  hangTotNghiep: string;
  namTotNghiep: string;
  soHieuBang: string;
}

export interface RegistrarProfile {
  hoTen: string;
  donVi: string;
}

/** `serverTime` accompanies every `expiresAt` (vc-api.md section 2): count down against the server clock. */
export type PortalSession =
  | { role: 'student'; token: string; expiresAt: string; serverTime: string; profile: StudentProfile }
  | { role: 'registrar'; token: string; expiresAt: string; serverTime: string; profile: RegistrarProfile };

export interface CredentialOffer {
  offerId: string;
  offerUri: string;
  txCode: string;
  expiresAt: string;
  serverTime: string;
}

export interface IssuedCredential {
  id: string;
  studentCode: string;
  studentName: string;
  issuedAt: string;
  status: CredentialStatus;
  /** The server's word on whether this session may revoke the item now; `false` once revoked. */
  canRevoke: boolean;
}

export interface CredentialPage {
  items: IssuedCredential[];
  /** Opaque; `null` on the last page. */
  nextCursor: string | null;
}

/** The answer to cancelling an offer: a pending one becomes `expired`, an issued one stays `issued`. */
export interface CancelledOffer {
  offerId: string;
  status: 'expired' | 'issued';
}

export interface CredentialStatusChange {
  id: string;
  status: CredentialStatus;
  updatedAt: string;
}

/** The closed list of error codes of vc-api.md section 2, plus what can go wrong before a code exists. */
export const PORTAL_ERROR_CODES = {
  INVALID_CREDENTIALS: 'invalid_credentials',
  SESSION_EXPIRED: 'session_expired',
  FORBIDDEN: 'forbidden',
  NOT_FOUND: 'not_found',
  CONFLICT: 'conflict',
  VALIDATION_FAILED: 'validation_failed',
  RATE_LIMITED: 'rate_limited',
  INTERNAL_ERROR: 'internal_error',
  UNAVAILABLE: 'unavailable',
} as const;

export type PortalApiErrorKind =
  | (typeof PORTAL_ERROR_CODES)[keyof typeof PORTAL_ERROR_CODES]
  | 'network'
  | 'timeout'
  | 'http'
  | 'malformed';

export class PortalApiError extends Error {
  readonly kind: PortalApiErrorKind;
  readonly status?: number;
  /** Seconds from the Retry-After header of a 429 or a 503, when the server sent one. */
  readonly retryAfterSeconds?: number;

  constructor(kind: PortalApiErrorKind, message: string, status?: number, retryAfterSeconds?: number) {
    super(message);
    this.name = 'PortalApiError';
    this.kind = kind;
    if (status !== undefined) this.status = status;
    if (retryAfterSeconds !== undefined) this.retryAfterSeconds = retryAfterSeconds;
  }
}

/** Longest text accepted from the API for any single field; the UI never shows more. */
export const MAX_FIELD_LENGTH = 500;
export const MAX_URI_LENGTH = 2048;
export const REQUEST_TIMEOUT_MS = 10_000;

/** C0/C1 controls, bidirectional overrides and isolates, zero-width characters and the BOM. */
// eslint-disable-next-line no-control-regex
export const UNSAFE_TEXT = /[\u0000-\u001F\u007F-\u009F\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/;

type Json = Record<string, unknown>;

const malformed = (path: string): never => {
  throw new PortalApiError('malformed', `malformed portal response: ${path}`);
};

const asObject = (value: unknown, path: string): Json =>
  value !== null && typeof value === 'object' && !Array.isArray(value) ? value as Json : malformed(path);

const asText = (value: unknown, path: string, maxLength = MAX_FIELD_LENGTH): string =>
  typeof value === 'string' && value.length > 0 && value.length <= maxLength && !UNSAFE_TEXT.test(value)
    ? value
    : malformed(path);

// The record's year may arrive as an integer or as text; it is kept as text.
const asTextOrInteger = (value: unknown, path: string): string =>
  typeof value === 'number' && Number.isInteger(value) && value > 0 ? String(value) : asText(value, path);

const asDate = (value: unknown, path: string): string => {
  const text = asText(value, path, 64);
  return Number.isNaN(Date.parse(text)) ? malformed(path) : text;
};

const asId = (value: unknown, path: string): string => {
  const text = asText(value, path, 256);
  return /^[A-Za-z0-9_-]+$/.test(text) ? text : malformed(path);
};

const asEnum = <T extends string>(value: unknown, allowed: readonly T[], path: string): T =>
  allowed.includes(value as T) ? value as T : malformed(path);

const CREDENTIAL_STATUSES = ['valid', 'revoked', 'suspended'] as const;

export const parsePortalSession = (raw: unknown): PortalSession => {
  const body = asObject(raw, 'body');
  const token = asText(body.token, 'token', 1024);
  const expiresAt = asDate(body.expiresAt, 'expiresAt');
  const serverTime = asDate(body.serverTime, 'serverTime');
  const role = asEnum(body.role, ['student', 'registrar'] as const, 'role');
  const profile = asObject(body.profile, 'profile');

  if (role === 'registrar') {
    return {
      role,
      token,
      expiresAt,
      serverTime,
      profile: { hoTen: asText(profile.hoTen, 'profile.hoTen'), donVi: asText(profile.donVi, 'profile.donVi') },
    };
  }

  return {
    role,
    token,
    expiresAt,
    serverTime,
    profile: {
      hoTen: asText(profile.hoTen, 'profile.hoTen'),
      ngaySinh: asDate(profile.ngaySinh, 'profile.ngaySinh'),
      maSinhVien: asText(profile.maSinhVien, 'profile.maSinhVien'),
      nganh: asText(profile.nganh, 'profile.nganh'),
      hangTotNghiep: asText(profile.hangTotNghiep, 'profile.hangTotNghiep'),
      namTotNghiep: asTextOrInteger(profile.namTotNghiep, 'profile.namTotNghiep'),
      soHieuBang: asText(profile.soHieuBang, 'profile.soHieuBang'),
    },
  };
};

/**
 * The offer URI must be exactly
 * `openid-credential-offer://?credential_offer_uri=<apiOrigin>/issuers/<issuer>/offers/<offerId>` (vc-api.md section 4).
 */
export const isValidOfferUri = (offerUri: string, offerId: string, apiOrigin: string, issuer: string): boolean => {
  const prefix = 'openid-credential-offer://?';
  if (offerUri.length > MAX_URI_LENGTH || !offerUri.startsWith(prefix)) return false;
  const params = new URLSearchParams(offerUri.slice(prefix.length));
  const names: string[] = [];
  params.forEach((_, name) => names.push(name));
  return names.length === 1
    && names[0] === 'credential_offer_uri'
    && params.get('credential_offer_uri') === `${apiOrigin}/issuers/${issuer}/offers/${offerId}`;
};

export const parseCredentialOffer = (raw: unknown, apiOrigin: string, issuer: string): CredentialOffer => {
  const body = asObject(raw, 'body');
  const offerId = asId(body.offerId, 'offerId');
  const offerUri = asText(body.offerUri, 'offerUri', MAX_URI_LENGTH);
  if (!isValidOfferUri(offerUri, offerId, apiOrigin, issuer)) malformed('offerUri');
  const txCode = asText(body.txCode, 'txCode', 6);
  if (!/^\d{6}$/.test(txCode)) malformed('txCode');
  return {
    offerId,
    offerUri,
    txCode,
    expiresAt: asDate(body.expiresAt, 'expiresAt'),
    serverTime: asDate(body.serverTime, 'serverTime'),
  };
};

export const parseOfferStatus = (raw: unknown): OfferStatus =>
  asEnum(asObject(raw, 'body').status, ['pending', 'issued', 'expired'] as const, 'status');

/** A page holds at most 100 items (`limit` 1-100, vc-api.md section 5). */
export const MAX_PAGE_SIZE = 100;

export const parseCredentialPage = (raw: unknown): CredentialPage => {
  const body = asObject(raw, 'body');
  const { items } = body;
  if (!Array.isArray(items) || items.length > MAX_PAGE_SIZE) malformed('items');
  const nextCursor = body.nextCursor === null ? null : asText(body.nextCursor, 'nextCursor', 512);
  return {
    items: (items as unknown[]).map((item, index) => {
      const row = asObject(item, `items[${index}]`);
      const status = asEnum(row.status, CREDENTIAL_STATUSES, `items[${index}].status`);
      if (typeof row.canRevoke !== 'boolean') malformed(`items[${index}].canRevoke`);
      // Revocation is final: a revoked item that could be revoked again is not an answer to trust.
      if (status === 'revoked' && row.canRevoke) malformed(`items[${index}].canRevoke`);
      return {
        id: asId(row.id, `items[${index}].id`),
        studentCode: asText(row.studentCode, `items[${index}].studentCode`),
        studentName: asText(row.studentName, `items[${index}].studentName`),
        issuedAt: asDate(row.issuedAt, `items[${index}].issuedAt`),
        status,
        canRevoke: row.canRevoke as boolean,
      };
    }),
    nextCursor,
  };
};

/** The answer must be about the item asked for; anything else is not trusted. */
const sameId = (id: string, expected: string, path: string) => (id === expected ? id : malformed(path));

export const parseStatusChange = (raw: unknown, expectedId: string): CredentialStatusChange => {
  const body = asObject(raw, 'body');
  return {
    id: sameId(asId(body.id, 'id'), expectedId, 'id'),
    status: asEnum(body.status, CREDENTIAL_STATUSES, 'status'),
    updatedAt: asDate(body.updatedAt, 'updatedAt'),
  };
};

export const parseRevocation = (raw: unknown, expectedId: string): CredentialStatusChange => {
  const change = parseStatusChange(raw, expectedId);
  return change.status === 'revoked' ? change : malformed('status');
};

export const parseCancelledOffer = (raw: unknown, expectedOfferId: string): CancelledOffer => {
  const body = asObject(raw, 'body');
  return {
    offerId: sameId(asId(body.offerId, 'offerId'), expectedOfferId, 'offerId'),
    status: asEnum(body.status, ['expired', 'issued'] as const, 'status'),
  };
};

const STATUS_FALLBACK: Partial<Record<number, PortalApiErrorKind>> = {
  401: 'session_expired',
  403: 'forbidden',
  404: 'not_found',
  409: 'conflict',
  400: 'validation_failed',
  429: 'rate_limited',
  500: 'internal_error',
  503: 'unavailable',
};

/** Branches on the error `code` of section 2; the HTTP status decides only when the body carries no known code. */
const errorFor = (status: number, bodyText: string, retryAfter: string | null): PortalApiError => {
  let code: unknown;
  try {
    const body: unknown = JSON.parse(bodyText);
    if (body !== null && typeof body === 'object') code = (body as Json).code;
  } catch {
    // Not the section 2 error body.
  }
  const kind: PortalApiErrorKind = typeof code === 'string' && Object.hasOwn(PORTAL_ERROR_CODES, code)
    ? PORTAL_ERROR_CODES[code as keyof typeof PORTAL_ERROR_CODES]
    : STATUS_FALLBACK[status] ?? 'http';
  const seconds = Number(retryAfter);
  const retryAfterSeconds = (kind === 'rate_limited' || kind === 'unavailable') && retryAfter !== null && retryAfter.trim() !== '' && Number.isInteger(seconds) && seconds >= 0 && seconds <= 3600
    ? seconds
    : undefined;
  return new PortalApiError(kind, `HTTP ${status}`, status, retryAfterSeconds);
};

export interface SchoolPortalClient {
  login(username: string, password: string, signal?: AbortSignal): Promise<PortalSession>;
  createOffer(token: string, signal?: AbortSignal): Promise<CredentialOffer>;
  getOfferStatus(token: string, offerId: string, signal?: AbortSignal): Promise<OfferStatus>;
  /** Ends a pending offer of this session. `keepalive` lets it outlive the page (sent on `pagehide`). */
  cancelOffer(token: string, offerId: string, options?: { signal?: AbortSignal; keepalive?: boolean }): Promise<CancelledOffer>;
  listCredentials(token: string, options?: { cursor?: string; limit?: number; signal?: AbortSignal }): Promise<CredentialPage>;
  /** A student revokes a diploma issued in this session ("I lost my phone"). Final. */
  revokeCredential(token: string, credentialId: string, signal?: AbortSignal): Promise<CredentialStatusChange>;
  changeCredentialStatus(
    token: string,
    credentialId: string,
    status: CredentialStatus,
    signal?: AbortSignal,
  ): Promise<CredentialStatusChange>;
}

export const createSchoolPortalClient = (options: {
  baseUrl: string;
  /** The canonical API origin that offer URIs point at (vc-api.md section 1). */
  apiOrigin: string;
  issuer: string;
  fetch?: typeof fetch;
  timeoutMs?: number;
}): SchoolPortalClient => {
  const baseUrl = options.baseUrl.replace(/\/+$/, '');
  const timeoutMs = options.timeoutMs ?? REQUEST_TIMEOUT_MS;
  const doFetch = options.fetch ?? ((...args: Parameters<typeof fetch>) => globalThis.fetch(...args));

  const request = async <T>(
    method: 'GET' | 'POST' | 'DELETE',
    path: string,
    parse: (raw: unknown) => T,
    init: { token?: string; body?: unknown; signal?: AbortSignal; keepalive?: boolean },
  ): Promise<T> => {
    const headers: Record<string, string> = { Accept: 'application/json' };
    if (init.body !== undefined) headers['Content-Type'] = 'application/json';
    if (init.token) headers.Authorization = `Bearer ${init.token}`;

    // Each request ends on the caller's abort or after `timeoutMs`, whichever comes first.
    const controller = new AbortController();
    const onAbort = () => controller.abort(init.signal?.reason);
    init.signal?.addEventListener('abort', onAbort, { once: true });
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, timeoutMs);

    let response: Response;
    let text: string;
    try {
      response = await doFetch(`${baseUrl}${path}`, {
        method,
        headers,
        body: init.body === undefined ? undefined : JSON.stringify(init.body),
        credentials: 'omit',
        cache: 'no-store',
        signal: controller.signal,
        ...(init.keepalive && { keepalive: true }),
      });
      text = await response.text();
    } catch (error) {
      if (init.signal?.aborted) throw error;
      throw new PortalApiError(timedOut ? 'timeout' : 'network', timedOut ? 'request timed out' : 'network error');
    } finally {
      clearTimeout(timer);
      init.signal?.removeEventListener('abort', onAbort);
    }

    if (!response.ok) throw errorFor(response.status, text, response.headers.get('Retry-After'));

    let raw: unknown;
    try {
      raw = JSON.parse(text);
    } catch {
      return malformed('body');
    }
    return parse(raw);
  };

  const issuerPath = `/v1/issuers/${encodeURIComponent(options.issuer)}`;
  const offerPath = (offerId: string) => `/v1/demo/school/offers/${encodeURIComponent(offerId)}`;

  return {
    login: (username, password, signal) => request('POST', '/v1/demo/school/login', parsePortalSession, {
      body: { username, password },
      signal,
    }),
    createOffer: (token, signal) => request(
      'POST',
      '/v1/demo/school/offers',
      (raw) => parseCredentialOffer(raw, options.apiOrigin, options.issuer),
      { token, signal },
    ),
    getOfferStatus: (token, offerId, signal) => request('GET', offerPath(offerId), parseOfferStatus, { token, signal }),
    cancelOffer: (token, offerId, { signal, keepalive } = {}) => request(
      'DELETE',
      offerPath(offerId),
      (raw) => parseCancelledOffer(raw, offerId),
      { token, signal, keepalive },
    ),
    listCredentials: (token, { cursor, limit, signal } = {}) => {
      const query = new URLSearchParams();
      if (limit !== undefined) query.set('limit', String(limit));
      if (cursor !== undefined) query.set('cursor', cursor);
      const search = query.toString() ? `?${query.toString()}` : '';
      return request('GET', `/v1/demo/school/credentials${search}`, parseCredentialPage, { token, signal });
    },
    revokeCredential: (token, credentialId, signal) => request(
      'POST',
      `/v1/demo/school/credentials/${encodeURIComponent(credentialId)}/revoke`,
      (raw) => parseRevocation(raw, credentialId),
      { token, signal },
    ),
    changeCredentialStatus: (token, credentialId, status, signal) => request(
      'POST',
      `${issuerPath}/credentials/${encodeURIComponent(credentialId)}/status`,
      (raw) => parseStatusChange(raw, credentialId),
      { token, body: { status }, signal },
    ),
  };
};
