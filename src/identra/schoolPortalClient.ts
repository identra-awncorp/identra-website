/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Client for the school-portal demo endpoints (vc-api.md section 5) and the registrar's status change
// (section 3). Demo-specific, so it lives in the website rather than in @identra/sdk-client.
// Every response is validated before use; nothing here logs tokens, PINs or personal data.

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

export type PortalSession =
  | { role: 'student'; token: string; expiresAt: string; profile: StudentProfile }
  | { role: 'registrar'; token: string; expiresAt: string; profile: RegistrarProfile };

export interface CredentialOffer {
  offerId: string;
  offerUri: string;
  txCode: string;
  expiresAt: string;
}

export interface IssuedCredential {
  id: string;
  studentCode: string;
  studentName: string;
  issuedAt: string;
  status: CredentialStatus;
}

export interface CredentialStatusChange {
  id: string;
  status: CredentialStatus;
  updatedAt: string;
}

export type PortalApiErrorKind =
  | 'network'
  | 'invalid_credentials'
  | 'session_expired'
  | 'forbidden'
  | 'not_found'
  | 'conflict'
  | 'rate_limited'
  | 'http'
  | 'malformed';

export class PortalApiError extends Error {
  readonly kind: PortalApiErrorKind;
  readonly status?: number;
  /** Seconds from a 429's Retry-After header, when the server sent one. */
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

type Json = Record<string, unknown>;

const malformed = (path: string): never => {
  throw new PortalApiError('malformed', `malformed portal response: ${path}`);
};

const asObject = (value: unknown, path: string): Json =>
  value !== null && typeof value === 'object' && !Array.isArray(value) ? value as Json : malformed(path);

const asText = (value: unknown, path: string, maxLength = MAX_FIELD_LENGTH): string =>
  typeof value === 'string' && value.length > 0 && value.length <= maxLength ? value : malformed(path);

// Integers are accepted for numeric fields such as a graduation year, and kept as text.
const asTextOrInteger = (value: unknown, path: string): string =>
  typeof value === 'number' && Number.isInteger(value) ? String(value) : asText(value, path);

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
  const role = asEnum(body.role, ['student', 'registrar'] as const, 'role');
  const profile = asObject(body.profile, 'profile');

  if (role === 'registrar') {
    return {
      role,
      token,
      expiresAt,
      profile: { hoTen: asText(profile.hoTen, 'profile.hoTen'), donVi: asText(profile.donVi, 'profile.donVi') },
    };
  }

  return {
    role,
    token,
    expiresAt,
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

export const parseCredentialOffer = (raw: unknown): CredentialOffer => {
  const body = asObject(raw, 'body');
  const offerUri = asText(body.offerUri, 'offerUri', 2048);
  if (!offerUri.startsWith('openid-credential-offer://?credential_offer_uri=')) malformed('offerUri');
  const txCode = asText(body.txCode, 'txCode', 6);
  if (!/^\d{6}$/.test(txCode)) malformed('txCode');
  return {
    offerId: asId(body.offerId, 'offerId'),
    offerUri,
    txCode,
    expiresAt: asDate(body.expiresAt, 'expiresAt'),
  };
};

export const parseOfferStatus = (raw: unknown): OfferStatus =>
  asEnum(asObject(raw, 'body').status, ['pending', 'issued', 'expired'] as const, 'status');

export const parseIssuedCredentials = (raw: unknown): IssuedCredential[] => {
  const items = asObject(raw, 'body').items;
  if (!Array.isArray(items) || items.length > 1000) malformed('items');
  return (items as unknown[]).map((item, index) => {
    const row = asObject(item, `items[${index}]`);
    return {
      id: asId(row.id, `items[${index}].id`),
      studentCode: asText(row.studentCode, `items[${index}].studentCode`),
      studentName: asText(row.studentName, `items[${index}].studentName`),
      issuedAt: asDate(row.issuedAt, `items[${index}].issuedAt`),
      status: asEnum(row.status, CREDENTIAL_STATUSES, `items[${index}].status`),
    };
  });
};

export const parseStatusChange = (raw: unknown): CredentialStatusChange => {
  const body = asObject(raw, 'body');
  return {
    id: asId(body.id, 'id'),
    status: asEnum(body.status, CREDENTIAL_STATUSES, 'status'),
    updatedAt: asDate(body.updatedAt, 'updatedAt'),
  };
};

const errorFor = (status: number, isLogin: boolean, retryAfter: string | null): PortalApiError => {
  const message = `HTTP ${status}`;
  if (status === 401) return new PortalApiError(isLogin ? 'invalid_credentials' : 'session_expired', message, status);
  if (status === 403) return new PortalApiError('forbidden', message, status);
  if (status === 404) return new PortalApiError('not_found', message, status);
  if (status === 409) return new PortalApiError('conflict', message, status);
  if (status === 429) {
    const seconds = Number(retryAfter);
    return new PortalApiError(
      'rate_limited',
      message,
      status,
      Number.isFinite(seconds) && seconds > 0 && seconds <= 3600 ? Math.ceil(seconds) : undefined,
    );
  }
  return new PortalApiError('http', message, status);
};

export interface SchoolPortalClient {
  login(username: string, password: string, signal?: AbortSignal): Promise<PortalSession>;
  createOffer(token: string, signal?: AbortSignal): Promise<CredentialOffer>;
  getOfferStatus(token: string, offerId: string, signal?: AbortSignal): Promise<OfferStatus>;
  listCredentials(token: string, signal?: AbortSignal): Promise<IssuedCredential[]>;
  changeCredentialStatus(
    token: string,
    credentialId: string,
    status: CredentialStatus,
    signal?: AbortSignal,
  ): Promise<CredentialStatusChange>;
}

export const createSchoolPortalClient = (options: {
  baseUrl: string;
  issuer: string;
  fetch?: typeof fetch;
}): SchoolPortalClient => {
  const baseUrl = options.baseUrl.replace(/\/+$/, '');
  const doFetch = options.fetch ?? ((...args: Parameters<typeof fetch>) => globalThis.fetch(...args));

  const request = async <T>(
    method: 'GET' | 'POST',
    path: string,
    parse: (raw: unknown) => T,
    init: { token?: string; body?: unknown; signal?: AbortSignal; isLogin?: boolean },
  ): Promise<T> => {
    const headers: Record<string, string> = { Accept: 'application/json' };
    if (init.body !== undefined) headers['Content-Type'] = 'application/json';
    if (init.token) headers.Authorization = `Bearer ${init.token}`;

    let response: Response;
    try {
      response = await doFetch(`${baseUrl}${path}`, {
        method,
        headers,
        body: init.body === undefined ? undefined : JSON.stringify(init.body),
        credentials: 'omit',
        cache: 'no-store',
        signal: init.signal,
      });
    } catch (error) {
      if (init.signal?.aborted) throw error;
      throw new PortalApiError('network', 'network error');
    }

    if (!response.ok) {
      throw errorFor(response.status, init.isLogin === true, response.headers.get('Retry-After'));
    }

    let raw: unknown;
    try {
      raw = JSON.parse(await response.text());
    } catch (error) {
      if (init.signal?.aborted) throw error;
      return malformed('body');
    }
    return parse(raw);
  };

  const issuerPath = `/v1/issuers/${encodeURIComponent(options.issuer)}`;

  return {
    login: (username, password, signal) => request('POST', '/v1/demo/school/login', parsePortalSession, {
      body: { username, password },
      signal,
      isLogin: true,
    }),
    createOffer: (token, signal) => request('POST', '/v1/demo/school/offers', parseCredentialOffer, { token, signal }),
    getOfferStatus: (token, offerId, signal) => request(
      'GET',
      `/v1/demo/school/offers/${encodeURIComponent(offerId)}`,
      parseOfferStatus,
      { token, signal },
    ),
    listCredentials: (token, signal) => request('GET', '/v1/demo/school/credentials', parseIssuedCredentials, {
      token,
      signal,
    }),
    changeCredentialStatus: (token, credentialId, status, signal) => request(
      'POST',
      `${issuerPath}/credentials/${encodeURIComponent(credentialId)}/status`,
      parseStatusChange,
      { token, body: { status }, signal },
    ),
  };
};
