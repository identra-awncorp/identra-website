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
  return { ...fake, api: createSchoolPortalClient({ baseUrl: 'https://api.example.test/', issuer: 'truong-mau', fetch: fake.fetchImpl }) };
};

const studentLogin = {
  token: 'secret-token-123',
  expiresAt: '2026-11-19T02:00:00.000Z',
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
    token: 't', expiresAt: '2026-11-19T02:00:00Z', role: 'registrar', profile: { hoTen: 'Đỗ Thị Mẫu', donVi: 'Phòng Đào tạo' },
  }));
  assert.deepEqual((await api.login('phongdaotao', 'x')).profile, { hoTen: 'Đỗ Thị Mẫu', donVi: 'Phòng Đào tạo' });
});

test('HTTP failures map to kinds: wrong password, expired session, rate limit with Retry-After, conflict', async () => {
  await rejectsWith(client(() => json({ statusCode: 401 }, 401)).api.login('sv001', 'bad'), 'invalid_credentials');
  await rejectsWith(client(() => json({ statusCode: 401 }, 401)).api.listCredentials('secret-token-123'), 'session_expired');
  await rejectsWith(client(() => json({}, 403)).api.listCredentials('t'), 'forbidden');
  await rejectsWith(client(() => json({}, 404)).api.getOfferStatus('t', 'abc'), 'not_found');
  await rejectsWith(client(() => json({}, 409)).api.changeCredentialStatus('t', 'abc', 'valid'), 'conflict');
  await rejectsWith(client(() => new Response('<html>oops</html>', { status: 502 })).api.listCredentials('t'), 'http');

  const limited = client(() => json({ statusCode: 429 }, 429, { 'Retry-After': '42' }));
  await assert.rejects(limited.api.login('sv001', 'x'), (error: PortalApiError) => error.kind === 'rate_limited' && error.retryAfterSeconds === 42);
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
  ];
  for (const body of bad) {
    await rejectsWith(client(() => new Response(typeof body === 'string' ? body : JSON.stringify(body))).api.login('a', 'b'), 'malformed');
  }

  const offer = { offerId: 'abc_DEF-1', offerUri: 'openid-credential-offer://?credential_offer_uri=https%3A%2F%2Fx', txCode: '123456', expiresAt: '2026-11-19T02:00:00Z' };
  for (const body of [
    { ...offer, txCode: '12345' },
    { ...offer, txCode: '12a456' },
    { ...offer, offerUri: 'javascript:alert(1)' },
    { ...offer, offerId: '../../etc' },
  ]) {
    await rejectsWith(client(() => json(body)).api.createOffer('t'), 'malformed');
  }
  await rejectsWith(client(() => json({ status: 'done' })).api.getOfferStatus('t', 'abc'), 'malformed');
  await rejectsWith(client(() => json({ items: [{ id: 'a', studentCode: 'SV1', studentName: 'A', issuedAt: '2026-01-01', status: 'deleted' }] })).api.listCredentials('t'), 'malformed');
  await rejectsWith(client(() => json({ items: {} })).api.listCredentials('t'), 'malformed');
});

test('authenticated calls send the bearer token and hit the contract paths', async () => {
  const { api, calls } = client((call) => {
    if (call.url.endsWith('/offers')) {
      return json({ offerId: 'o1', offerUri: 'openid-credential-offer://?credential_offer_uri=x', txCode: '000123', expiresAt: '2026-11-19T02:00:00Z' }, 201);
    }
    if (call.url.includes('/offers/')) return json({ status: 'issued' });
    if (call.url.endsWith('/status')) return json({ id: 'c 1', status: 'revoked', updatedAt: '2026-11-19T02:00:00Z' });
    return json({ items: [{ id: 'c1', studentCode: 'SV0003', studentName: 'Lê Hoàng Mẫu', issuedAt: '2026-11-16T00:00:00Z', status: 'valid' }] });
  });

  assert.equal((await api.createOffer('tok')).txCode, '000123');
  assert.equal(await api.getOfferStatus('tok', 'o/1'), 'issued');
  assert.equal((await api.listCredentials('tok'))[0]?.status, 'valid');
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
