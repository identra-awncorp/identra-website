/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// The verifier step's state machine: live states, expiry, problems, and no polling or updates after abort.
import assert from 'node:assert/strict';
import test from 'node:test';
import {
  createVerifierClient,
  VerifierClientError,
  type SessionResult,
  type VerificationSession,
  type VerifierClient,
} from '@identra/sdk-client';
import {
  INITIAL_VERIFIER_STEP_STATE,
  runVerifierSession,
  secondsUntil,
  toSharedFields,
  truncateText,
  verifierStepReducer,
  type VerifierStepEvent,
  type VerifierStepState,
} from '../src/identra/verifierSession';

const INPUT = { verifier: 'nha-tuyen-dung-mau', scenario: 'ung-tuyen' };
const FUTURE = '2099-01-01T00:00:00.000Z';

const passedResult: SessionResult = {
  ok: true,
  checks: [{ id: 'structure', ok: true, code: null }, { id: 'status', ok: true, code: null }],
  claims: { ho_ten: 'Nguyễn Minh Mẫu', nganh: 'Công nghệ thông tin' },
  issuer: { maToChuc: 'truong-mau', ten: 'Trường Đại học Mẫu (DEMO)' },
  verifiedAt: '2026-11-19T01:00:00.000Z',
};

const revokedResult: SessionResult = {
  ok: false,
  checks: [{ id: 'structure', ok: true, code: null }, { id: 'status', ok: false, code: 'REVOKED' }],
  issuer: { maToChuc: 'truong-mau', ten: 'Trường Đại học Mẫu (DEMO)' },
  verifiedAt: '2026-11-19T01:00:00.000Z',
};

const session = (status: VerificationSession['status'], result?: SessionResult): VerificationSession => ({
  id: 's1',
  status,
  verifier: { name: 'Nhà tuyển dụng mẫu (DEMO)' },
  expiresAt: FUTURE,
  ...(result ? { result } : {}),
});

const reduce = (events: VerifierStepEvent[]) => events.reduce(verifierStepReducer, INITIAL_VERIFIER_STEP_STATE);

const recorder = () => {
  const states: VerifierStepState[] = [];
  let state = INITIAL_VERIFIER_STEP_STATE;
  return {
    states,
    dispatch: (event: VerifierStepEvent) => {
      state = verifierStepReducer(state, event);
      states.push(state);
    },
    get state() { return state; },
  };
};

const fakeClient = (overrides: Partial<VerifierClient>): VerifierClient => ({
  createSession: async () => ({ id: 's1', qr: 'openid4vp://?request_uri=x', expiresAt: FUTURE }),
  getSession: async () => session('pending'),
  watchSession: async () => session('pending'),
  ...overrides,
});

test('reducer: pending → request_retrieved → verified', () => {
  const state = reduce([
    { type: 'start' },
    { type: 'created', sessionId: 's1', qr: 'openid4vp://x', expiresAt: FUTURE },
    { type: 'update', session: session('pending') },
    { type: 'update', session: session('request_retrieved') },
  ]);
  assert.equal(state.phase, 'waiting');
  assert.equal(state.phase === 'waiting' && state.status, 'request_retrieved');
  const done = verifierStepReducer(state, { type: 'update', session: session('verified', passedResult) });
  assert.equal(done.phase, 'verified');
});

test('reducer: the result decides, so a "verified" status with a failing result is shown as failed', () => {
  const waiting = reduce([{ type: 'start' }, { type: 'created', sessionId: 's1', qr: 'openid4vp://x', expiresAt: FUTURE }]);
  assert.equal(verifierStepReducer(waiting, { type: 'update', session: session('verified', revokedResult) }).phase, 'failed');
  assert.equal(verifierStepReducer(waiting, { type: 'update', session: session('failed', revokedResult) }).phase, 'failed');
  assert.equal(verifierStepReducer(waiting, { type: 'update', session: session('expired') }).phase, 'expired');
});

test('reducer: updates for another session, retries outside waiting and late events are ignored', () => {
  const waiting = reduce([{ type: 'start' }, { type: 'created', sessionId: 's1', qr: 'openid4vp://x', expiresAt: FUTURE }]);
  assert.equal(verifierStepReducer(waiting, { type: 'update', session: { ...session('verified', passedResult), id: 'other' } }), waiting);
  const retrying = verifierStepReducer(waiting, { type: 'retrying' });
  assert.equal(retrying.phase === 'waiting' && retrying.reconnecting, true);
  assert.equal(verifierStepReducer(INITIAL_VERIFIER_STEP_STATE, { type: 'retrying' }), INITIAL_VERIFIER_STEP_STATE);
  const expired = verifierStepReducer(waiting, { type: 'expired' });
  assert.equal(verifierStepReducer(expired, { type: 'update', session: session('verified', passedResult) }), expired);
});

test('run: follows the session to a verified result', async () => {
  const log = recorder();
  await runVerifierSession(fakeClient({
    watchSession: async (_id, options) => {
      options?.onUpdate?.(session('pending'));
      options?.onUpdate?.(session('request_retrieved'));
      return session('verified', passedResult);
    },
  }), INPUT, { signal: new AbortController().signal, dispatch: log.dispatch });
  assert.deepEqual(log.states.map((state) => state.phase), ['creating', 'waiting', 'waiting', 'waiting', 'verified']);
});

test('run: a revoked diploma ends in the failed phase with the status check failing', async () => {
  const log = recorder();
  await runVerifierSession(fakeClient({ watchSession: async () => session('failed', revokedResult) }), INPUT, {
    signal: new AbortController().signal,
    dispatch: log.dispatch,
  });
  assert.equal(log.state.phase, 'failed');
  assert.equal(log.state.phase === 'failed' && log.state.result.checks[1]?.code, 'REVOKED');
});

test('run: problems map to network, rate limit, unavailable, and a vanished session to expired', async () => {
  const cases: Array<[VerifierClientError, string]> = [
    [new VerifierClientError('network', 'network error'), 'network'],
    [new VerifierClientError('rate_limited', 'HTTP 429', 429), 'rate_limited'],
    [new VerifierClientError('http', 'HTTP 500', 500), 'unavailable'],
    [new VerifierClientError('malformed', 'malformed'), 'unavailable'],
  ];
  for (const [error, problem] of cases) {
    const log = recorder();
    await runVerifierSession(fakeClient({ createSession: async () => { throw error; } }), INPUT, {
      signal: new AbortController().signal,
      dispatch: log.dispatch,
    });
    assert.deepEqual(log.state, { phase: 'error', problem });
  }

  const log = recorder();
  await runVerifierSession(fakeClient({
    watchSession: async () => { throw new VerifierClientError('not_found', 'HTTP 404', 404); },
  }), INPUT, { signal: new AbortController().signal, dispatch: log.dispatch });
  assert.equal(log.state.phase, 'expired');
});

test('run: nothing is dispatched once aborted (dialog closed or page left)', async () => {
  const controller = new AbortController();
  const log = recorder();
  await runVerifierSession(fakeClient({
    createSession: async () => {
      controller.abort();
      return { id: 's1', qr: 'openid4vp://x', expiresAt: FUTURE };
    },
    watchSession: async (_id, options) => {
      options?.onUpdate?.(session('verified', passedResult));
      return session('verified', passedResult);
    },
  }), INPUT, { signal: controller.signal, dispatch: log.dispatch });
  assert.deepEqual(log.states.map((state) => state.phase), ['creating']);
});

test('run with the real SDK client: no request and no state update after abort (unmount)', async () => {
  let requests = 0;
  const fakeFetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    requests += 1;
    const url = String(input);
    const body = url.endsWith('/v1/verification/sessions')
      ? { id: 's1', qr: 'openid4vp://?request_uri=x', expiresAt: FUTURE }
      : session('pending');
    if (init?.signal?.aborted) throw init.signal.reason;
    return new Response(JSON.stringify(body), { status: 200, headers: { 'content-type': 'application/json' } });
  }) as typeof fetch;
  const client = createVerifierClient({ baseUrl: 'https://api.example.test', fetch: fakeFetch });
  const controller = new AbortController();
  const log = recorder();

  const run = runVerifierSession(client, INPUT, { signal: controller.signal, dispatch: log.dispatch, intervalMs: 5 });
  await new Promise((resolve) => setTimeout(resolve, 40));
  controller.abort();
  await run;
  const requestsAtAbort = requests;
  const statesAtAbort = log.states.length;
  assert.ok(requestsAtAbort >= 2, 'it polled while open');
  await new Promise((resolve) => setTimeout(resolve, 60));
  assert.equal(requests, requestsAtAbort, 'no polling after abort');
  assert.equal(log.states.length, statesAtAbort, 'no state update after abort');
});

test('run with the real SDK client: an expired session is never polled past its expiry', async () => {
  let requests = 0;
  const expiresAt = new Date(Date.now() + 30).toISOString();
  const fakeFetch = (async (input: RequestInfo | URL) => {
    requests += 1;
    const body = String(input).endsWith('/v1/verification/sessions')
      ? { id: 's1', qr: 'openid4vp://?request_uri=x', expiresAt }
      : { ...session('pending'), expiresAt };
    return new Response(JSON.stringify(body), { status: 200 });
  }) as typeof fetch;
  const log = recorder();
  await runVerifierSession(createVerifierClient({ baseUrl: 'https://api.example.test', fetch: fakeFetch }), INPUT, {
    signal: new AbortController().signal,
    dispatch: log.dispatch,
    intervalMs: 5,
  });
  assert.equal(log.state.phase, 'expired');
  const requestsAtExpiry = requests;
  await new Promise((resolve) => setTimeout(resolve, 40));
  assert.equal(requests, requestsAtExpiry);
});

test('shared fields: known claims first with labels, others kept as text, every value capped at 500 characters', () => {
  const fields = toSharedFields({ nganh: 'Kinh tế', extra_field: 'x'.repeat(900), ho_ten: 'Trần Thu Mẫu', nam_tot_nghiep: 2026 });
  assert.deepEqual(fields.map((field) => field.key), ['ho_ten', 'nganh', 'nam_tot_nghiep', null]);
  assert.equal(fields[2]?.value, '2026');
  assert.equal(Array.from(fields[3]!.value).length, 500);
  assert.equal(truncateText('ắ'.repeat(600)).length, 500);
  assert.equal(secondsUntil('2026-01-01T00:00:10Z', Date.parse('2026-01-01T00:00:00Z')), 10);
  assert.equal(secondsUntil('2026-01-01T00:00:00Z', Date.parse('2026-01-01T00:00:10Z')), 0);
});
