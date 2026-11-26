/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// The school-portal client validates every response and maps HTTP failures to UI-relevant kinds.
import assert from 'node:assert/strict';
import test from 'node:test';
import { createSchoolPortalClient, PortalApiError, type PortalApiErrorKind } from '../src/identra/schoolPortalClient';

interface Call { url: string; init: RequestInit }

const fakeFetch = (respond: (call: Call) => Response | Promise<Response>) => {
  const calls: Call[] = [];
  const fetchImpl = (async (input: RequestInfo | URL, init: RequestInit = {}) => {
    const call = { url: String(input), init };
    calls.push(call);
    return respond(call);
  }) as typeof fetch;
  return { calls, fetchImpl };
};

const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', ...headers } });

const client = (respond: (call: Call) => Response | Promise<Response>) => {
  const fake = fakeFetch(respond);
  return { ...fake, api: createSchoolPortalClient({ baseUrl: 'https://api.example.test/', apiOrigin: API, issuer: 'truong-mau', fetch: fake.fetchImpl }) };
};

const API = 'https://api-identra.awncorp.vn';
const offerUri = (offerId: string) => `openid-credential-offer://?credential_offer_uri=${encodeURIComponent(`${API}/issuers/truong-mau/offers/${offerId}`)}`;

const studentLogin = {
  token: 'secret-token-123',
  expiresAt: '2026-11-19T02:00:00.000Z',
  serverTime: '2026-11-19T01:30:00.000Z',
  role: 'student',
  profile: {
    hoTen: 'Nguyễn Minh Mẫu',
    ngaySinh: '2004-03-15',
    maSinhVien: 'SV0001',
    nganh: 'Công nghệ thông tin',
    hangTotNghiep: 'Giỏi',
    namTotNghiep: 2026,
    soHieuBang: 'TM-2026-000101',
  },
};

const rejectsWith = async (promise: Promise<unknown>, kind: PortalApiErrorKind) => {
  await assert.rejects(promise, (error: unknown) => {
    assert.ok(error instanceof PortalApiError);
    assert.equal(error.kind, kind);
    assert.ok(!error.message.includes('secret-token-123'), 'no token in messages');
    return true;
  });
};

test('login posts the credentials as JSON without cookies and parses a student session', async () => {
  const { api, calls } = client(() => json(studentLogin));
  const session = await api.login('sv001', 'Identra@2026');
  assert.equal(calls[0]?.url, 'https://api.example.test/v1/demo/school/login');
  assert.equal(calls[0]?.init.method, 'POST');
  assert.equal(calls[0]?.init.credentials, 'omit');
  assert.deepEqual(JSON.parse(String(calls[0]?.init.body)), { username: 'sv001', password: 'Identra@2026' });
  assert.equal(session.role, 'student');
  assert.equal(session.role === 'student' && session.profile.namTotNghiep, '2026');
});

test('a registrar session carries only the registrar profile', async () => {
  const { api } = client(() => json({
    token: 't', expiresAt: '2026-11-19T02:00:00Z', serverTime: '2026-11-19T01:30:00Z', role: 'registrar', profile: { hoTen: 'Đỗ Thị Mẫu', donVi: 'Phòng Đào tạo' },
  }));
  assert.deepEqual((await api.login('phongdaotao', 'x')).profile, { hoTen: 'Đỗ Thị Mẫu', donVi: 'Phòng Đào tạo' });
});

const apiError = (status: number, code: string) => json({ statusCode: status, code, message: 'secret-token-123 for logs only' }, status);

test('failures branch on the error code of section 2, the status only when the body has none', async () => {
  await rejectsWith(client(() => apiError(401, 'INVALID_CREDENTIALS')).api.login('sv001', 'bad'), 'invalid_credentials');
  await rejectsWith(client(() => apiError(401, 'SESSION_EXPIRED')).api.listCredentials('secret-token-123'), 'session_expired');
  await rejectsWith(client(() => apiError(403, 'FORBIDDEN')).api.listCredentials('t'), 'forbidden');
  await rejectsWith(client(() => apiError(404, 'NOT_FOUND')).api.getOfferStatus('t', 'abc'), 'not_found');
  await rejectsWith(client(() => apiError(409, 'CONFLICT')).api.changeCredentialStatus('t', 'abc', 'valid'), 'conflict');
  await rejectsWith(client(() => apiError(400, 'VALIDATION_FAILED')).api.changeCredentialStatus('t', 'abc', 'valid'), 'validation_failed');
  await rejectsWith(client(() => apiError(500, 'INTERNAL_ERROR')).api.listCredentials('t'), 'internal_error');
  await rejectsWith(client(() => apiError(503, 'UNAVAILABLE')).api.listCredentials('t'), 'unavailable');
  // No known code: the status decides; an unknown status is a plain HTTP error.
  await rejectsWith(client(() => json({ statusCode: 401, code: 'SOMETHING_NEW' }, 401)).api.login('a', 'b'), 'session_expired');
  await rejectsWith(client(() => new Response('<html>oops</html>', { status: 502 })).api.listCredentials('t'), 'http');

  const limited = client(() => json({ statusCode: 429, code: 'RATE_LIMITED', message: 'x' }, 429, { 'Retry-After': '42' }));
  await assert.rejects(limited.api.login('sv001', 'x'), (error: PortalApiError) => error.kind === 'rate_limited' && error.retryAfterSeconds === 42);
  // Section 5: creating an offer is 429 (this client's share) or 503 (everyone's cap), both with Retry-After.
  const share = client(() => json({ statusCode: 429, code: 'RATE_LIMITED', message: 'x' }, 429, { 'Retry-After': '540' }));
  await assert.rejects(share.api.createOffer('t'), (error: PortalApiError) => error.kind === 'rate_limited' && error.retryAfterSeconds === 540);
  const cap = client(() => json({ statusCode: 503, code: 'UNAVAILABLE', message: 'x' }, 503, { 'Retry-After': '90' }));
  await assert.rejects(cap.api.createOffer('t'), (error: PortalApiError) => error.kind === 'unavailable' && error.retryAfterSeconds === 90);
  // A Retry-After that is not a sane number of seconds is ignored, never trusted.
  for (const header of ['soon', '-1', '99999', '1.5', '']) {
    const odd = client(() => json({ statusCode: 429, code: 'RATE_LIMITED', message: 'x' }, 429, { 'Retry-After': header }));
    await assert.rejects(odd.api.createOffer('t'), (error: PortalApiError) => error.kind === 'rate_limited' && error.retryAfterSeconds === undefined);
  }
  // A Retry-After on another kind of failure means nothing to the page.
  const conflict = client(() => json({ statusCode: 409, code: 'CONFLICT', message: 'x' }, 409, { 'Retry-After': '5' }));
  await assert.rejects(conflict.api.revokeCredential('t', 'c1'), (error: PortalApiError) => error.kind === 'conflict' && error.retryAfterSeconds === undefined);
});

test('a request that hangs times out', async () => {
  const fake = fakeFetch((call) => new Promise<Response>((_, reject) => call.init.signal?.addEventListener('abort', () => reject(new Error('aborted')))));
  const api = createSchoolPortalClient({ baseUrl: 'https://api.example.test', apiOrigin: API, issuer: 'truong-mau', fetch: fake.fetchImpl, timeoutMs: 20 });
  await rejectsWith(api.listCredentials('t'), 'timeout');
});

test('a network failure is reported as such, an abort is passed through untouched', async () => {
  await rejectsWith(client(() => { throw new TypeError('fetch failed'); }).api.login('a', 'b'), 'network');

  const controller = new AbortController();
  const aborting = client((call) => {
    controller.abort();
    throw call.init.signal?.reason ?? new Error('aborted');
  });
  await assert.rejects(aborting.api.login('a', 'b', controller.signal), (error: unknown) => !(error instanceof PortalApiError));
});

test('malformed responses are rejected instead of trusted', async () => {
  const bad: unknown[] = [
    'not json',
    { ...studentLogin, token: '' },
    { ...studentLogin, role: 'admin' },
    { ...studentLogin, expiresAt: 'tomorrow' },
    { ...studentLogin, profile: { ...studentLogin.profile, hoTen: 'x'.repeat(501) } },
    { ...studentLogin, profile: { ...studentLogin.profile, nganh: { html: '<b>' } } },
    { ...studentLogin, profile: null },
    { ...studentLogin, serverTime: undefined },
    { ...studentLogin, profile: { ...studentLogin.profile, hoTen: 'Nguyễn\u202EnaV' } },
    { ...studentLogin, profile: { ...studentLogin.profile, hoTen: 'Nguyễn\u200B' } },
  ];
  for (const body of bad) {
    await rejectsWith(client(() => new Response(typeof body === 'string' ? body : JSON.stringify(body))).api.login('a', 'b'), 'malformed');
  }

  const offer = { offerId: 'abc_DEF-1', offerUri: offerUri('abc_DEF-1'), txCode: '123456', expiresAt: '2026-11-19T02:00:00Z', serverTime: '2026-11-19T01:50:00Z' };
  for (const body of [
    { ...offer, txCode: '12345' },
    { ...offer, txCode: '12a456' },
    { ...offer, offerUri: 'javascript:alert(1)' },
    { ...offer, offerUri: offerUri('other-offer') },
    { ...offer, offerUri: offerUri('abc_DEF-1').replace(encodeURIComponent(API), encodeURIComponent('https://evil.example')) },
    { ...offer, offerUri: `${offerUri('abc_DEF-1')}&x=${'a'.repeat(2048)}` },
    { ...offer, offerId: '../../etc' },
    { ...offer, serverTime: undefined },
  ]) {
    await rejectsWith(client(() => json(body)).api.createOffer('t'), 'malformed');
  }
  await rejectsWith(client(() => json({ status: 'done' })).api.getOfferStatus('t', 'abc'), 'malformed');

  const row = { id: 'a', studentCode: 'SV1', studentName: 'A', issuedAt: '2026-01-01T00:00:00Z', status: 'valid', canRevoke: true };
  for (const body of [
    { items: [{ ...row, status: 'deleted' }], nextCursor: null },
    { items: {}, nextCursor: null },
    { items: [{ ...row, canRevoke: undefined }], nextCursor: null },
    { items: [{ ...row, canRevoke: 'true' }], nextCursor: null },
    { items: [{ ...row, canRevoke: 1 }], nextCursor: null },
    // Revocation is final: a revoked row that could be revoked again is contradictory.
    { items: [{ ...row, status: 'revoked', canRevoke: true }], nextCursor: null },
    { items: [{ ...row, id: 'a/../b' }], nextCursor: null },
    { items: [{ ...row, studentName: '<b>\u202E</b>' }], nextCursor: null },
    { items: [row] },
    { items: [row], nextCursor: '' },
    { items: [row], nextCursor: 42 },
    { items: [row], nextCursor: 'x'.repeat(513) },
    { items: Array.from({ length: 101 }, (_, index) => ({ ...row, id: `r${index}` })), nextCursor: null },
  ]) {
    await rejectsWith(client(() => json(body)).api.listCredentials('t'), 'malformed');
  }

  // Answers about another item than the one asked for, or that did not do what was asked, are not trusted.
  for (const body of [
    { id: 'other', status: 'revoked', updatedAt: '2026-11-19T02:00:00Z' },
    { id: 'c1', status: 'suspended', updatedAt: '2026-11-19T02:00:00Z' },
    { id: 'c1', status: 'revoked' },
  ]) {
    await rejectsWith(client(() => json(body)).api.revokeCredential('t', 'c1'), 'malformed');
  }
  await rejectsWith(client(() => json({ id: 'other', status: 'valid', updatedAt: '2026-11-19T02:00:00Z' })).api.changeCredentialStatus('t', 'c1', 'valid'), 'malformed');
  for (const body of [
    { offerId: 'other', status: 'expired', serverTime: '2026-11-19T02:00:00Z' },
    { offerId: 'o1', status: 'pending', serverTime: '2026-11-19T02:00:00Z' },
    { offerId: 'o1', status: 'cancelled', serverTime: '2026-11-19T02:00:00Z' },
  ]) {
    await rejectsWith(client(() => json(body)).api.cancelOffer('t', 'o1'), 'malformed');
  }
});

test('the credentials list is read page by page, with canRevoke and an opaque cursor', async () => {
  const { api, calls } = client((call) => (call.url.includes('cursor=')
    ? json({ items: [{ id: 'c2', studentCode: 'SV0098', studentName: 'Phạm Ngọc Mẫu', issuedAt: '2026-10-31T00:00:00Z', status: 'revoked', canRevoke: false }], nextCursor: null })
    : json({ items: [{ id: 'c1', studentCode: 'SV0003', studentName: 'Lê Hoàng Mẫu', issuedAt: '2026-11-16T00:00:00Z', status: 'valid', canRevoke: true }], nextCursor: 'p+1/=' })));

  const first = await api.listCredentials('tok');
  assert.deepEqual(first, {
    items: [{ id: 'c1', studentCode: 'SV0003', studentName: 'Lê Hoàng Mẫu', issuedAt: '2026-11-16T00:00:00Z', status: 'valid', canRevoke: true }],
    nextCursor: 'p+1/=',
  });
  const second = await api.listCredentials('tok', { cursor: first.nextCursor!, limit: 20 });
  assert.equal(second.nextCursor, null);
  assert.equal(second.items[0]?.canRevoke, false);
  assert.deepEqual(calls.map((call) => call.url.replace('https://api.example.test', '')), [
    '/v1/demo/school/credentials',
    '/v1/demo/school/credentials?limit=20&cursor=p%2B1%2F%3D',
  ]);
});

test('a student revokes a diploma of this session and cancels an offer, keepalive when leaving', async () => {
  const { api, calls } = client((call) => (call.init.method === 'DELETE'
    ? json({ offerId: 'o-1', status: 'expired', serverTime: '2026-11-19T02:00:00Z' })
    : json({ id: 'c_1', status: 'revoked', updatedAt: '2026-11-19T02:00:00Z' })));

  assert.deepEqual(await api.revokeCredential('tok', 'c_1'), { id: 'c_1', status: 'revoked', updatedAt: '2026-11-19T02:00:00Z' });
  assert.deepEqual(await api.cancelOffer('tok', 'o-1', { keepalive: true }), { offerId: 'o-1', status: 'expired' });
  await api.cancelOffer('tok', 'o-1');

  assert.deepEqual(calls.map((call) => [call.init.method, call.url.replace('https://api.example.test', '')]), [
    ['POST', '/v1/demo/school/credentials/c_1/revoke'],
    ['DELETE', '/v1/demo/school/offers/o-1'],
    ['DELETE', '/v1/demo/school/offers/o-1'],
  ]);
  assert.equal(calls[0]?.init.body, undefined, 'the revoke route takes no body');
  assert.equal(calls[1]?.init.keepalive, true);
  assert.equal(calls[2]?.init.keepalive, undefined);
  for (const call of calls) {
    assert.equal((call.init.headers as Record<string, string>).Authorization, 'Bearer tok');
    assert.equal(call.init.credentials, 'omit');
  }
});

test('authenticated calls send the bearer token and hit the contract paths', async () => {
  const { api, calls } = client((call) => {
    if (call.url.endsWith('/offers')) {
      return json({ offerId: 'o1', offerUri: offerUri('o1'), txCode: '000123', expiresAt: '2026-11-19T02:00:00Z', serverTime: '2026-11-19T01:50:00Z' }, 201);
    }
    if (call.url.includes('/offers/')) return json({ status: 'issued' });
    if (call.url.endsWith('/status')) return json({ id: 'c 1', status: 'revoked', updatedAt: '2026-11-19T02:00:00Z' });
    return json({ items: [{ id: 'c1', studentCode: 'SV0003', studentName: 'Lê Hoàng Mẫu', issuedAt: '2026-11-16T00:00:00Z', status: 'valid', canRevoke: true }], nextCursor: null });
  });

  assert.equal((await api.createOffer('tok')).txCode, '000123');
  assert.equal(await api.getOfferStatus('tok', 'o/1'), 'issued');
  assert.equal((await api.listCredentials('tok')).items[0]?.status, 'valid');
  await rejectsWith(api.changeCredentialStatus('tok', 'c 1', 'revoked'), 'malformed');

  assert.deepEqual(calls.map((call) => [call.init.method, call.url.replace('https://api.example.test', '')]), [
    ['POST', '/v1/demo/school/offers'],
    ['GET', '/v1/demo/school/offers/o%2F1'],
    ['GET', '/v1/demo/school/credentials'],
    ['POST', '/v1/issuers/truong-mau/credentials/c%201/status'],
  ]);
  for (const call of calls) assert.equal((call.init.headers as Record<string, string>).Authorization, 'Bearer tok');
  assert.deepEqual(JSON.parse(String(calls[3]?.init.body)), { status: 'revoked' });
});

// ---- One client per school: a session's offers and status changes are its own school's only ----------

const schoolClient = (issuer: string, respond: (call: Call) => Response | Promise<Response>, nameIssuerAtSignIn = false) => {
  const fake = fakeFetch(respond);
  return { ...fake, api: createSchoolPortalClient({ baseUrl: 'https://api.example.test', apiOrigin: API, issuer, nameIssuerAtSignIn, fetch: fake.fetchImpl }) };
};
const offerOf = (issuer: string, offerId: string) => ({
  offerId,
  offerUri: `openid-credential-offer://?credential_offer_uri=${encodeURIComponent(`${API}/issuers/${issuer}/offers/${offerId}`)}`,
  txCode: '123456',
  expiresAt: '2026-11-19T02:00:00Z',
  serverTime: '2026-11-19T01:50:00Z',
});

test('the first school signs in exactly as before, and its session says which school it belongs to', async () => {
  const { api, calls } = schoolClient('truong-mau', () => json(studentLogin));
  const session = await api.login('sv001', 'Identra@2026');
  assert.deepEqual(JSON.parse(String(calls[0]?.init.body)), { username: 'sv001', password: 'Identra@2026' });
  assert.equal(session.issuer, 'truong-mau');
});

test('the CertNet school names itself at sign-in; its session is that school\'s', async () => {
  const { api, calls } = schoolClient('truong-mau-certnet', () => json(studentLogin), true);
  const session = await api.login('cn-sv001', 'Identra@2026');
  assert.deepEqual(JSON.parse(String(calls[0]?.init.body)), { username: 'cn-sv001', password: 'Identra@2026', issuer: 'truong-mau-certnet' });
  assert.equal(session.issuer, 'truong-mau-certnet');
});

test('a login response that names the school: the same school is used, another or a different known school makes the sign-in unusable, an unknown value is ignored', async () => {
  const signIn = (issuer: string, reported?: unknown, account = 'sv001') => {
    const { api } = schoolClient(issuer, () => json(reported === undefined ? studentLogin : { ...studentLogin, issuer: reported }), issuer !== 'truong-mau');
    return { login: api.login(account, 'Identra@2026') };
  };
  // Present and agreeing, for both schools.
  assert.equal((await signIn('truong-mau', 'truong-mau').login).issuer, 'truong-mau');
  assert.equal((await signIn('truong-mau-certnet', 'truong-mau-certnet', 'cn-sv001').login).issuer, 'truong-mau-certnet');
  // Absent: today's behaviour (the existing tests above and below).
  assert.equal((await signIn('truong-mau-certnet', undefined, 'cn-sv001').login).issuer, 'truong-mau-certnet');
  // Contradicting, either way round: no session.
  await rejectsWith(signIn('truong-mau-certnet', 'truong-mau', 'cn-sv001').login, 'malformed');
  await rejectsWith(signIn('truong-mau', 'truong-mau-certnet').login, 'malformed');
  // A value the site does not know is not a school it can act on: the sign-in goes on as if it were absent.
  for (const unknown of ['truong-khac', '', null, 7, ['truong-mau']]) {
    assert.equal((await signIn('truong-mau', unknown).login).issuer, 'truong-mau');
  }
});

test('a school\'s client accepts its own school\'s offer and refuses any other school\'s', async () => {
  const certnet = schoolClient('truong-mau-certnet', () => json(offerOf('truong-mau-certnet', 'o1'), 201), true);
  assert.equal((await certnet.api.createOffer('t')).offerId, 'o1');

  await rejectsWith(schoolClient('truong-mau-certnet', () => json(offerOf('truong-mau', 'o1'), 201), true).api.createOffer('t'), 'malformed');
  await rejectsWith(schoolClient('truong-mau', () => json(offerOf('truong-mau-certnet', 'o1'), 201)).api.createOffer('t'), 'malformed');
  // No looser match: a prefix, a suffix or another origin is still another school's link.
  for (const other of ['truong-mau-certnet-2', 'truong', 'x/../truong-mau-certnet']) {
    await rejectsWith(schoolClient('truong-mau-certnet', () => json(offerOf(other, 'o1'), 201), true).api.createOffer('t'), 'malformed');
  }
});

test('the CertNet school\'s registrar changes statuses under that school\'s path', async () => {
  const { api, calls } = schoolClient('truong-mau-certnet', () => json({ id: 'c1', status: 'suspended', updatedAt: '2026-11-19T02:00:00Z' }), true);
  await api.changeCredentialStatus('tok', 'c1', 'suspended');
  assert.equal(calls[0]?.url, 'https://api.example.test/v1/issuers/truong-mau-certnet/credentials/c1/status');
});
