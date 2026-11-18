/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// The verifier step's state machine: live states, server clock, recovery, expiry, problems from codes,
// and no polling or updates after abort.
import assert from 'node:assert/strict';
import test from 'node:test';
import {
  createVerifierClient,
  PRESENTATION_CHECK_IDS,
  VerifierClientError,
  type SessionResult,
  type VerificationSession,
  type VerifierClient,
} from '@identra/sdk-client';
import {
  INITIAL_VERIFIER_STEP_STATE,
  isFinalFailure,
  problemFor,
  runVerifierSession,
  secondsUntil,
  toCheckRows,
  toSharedFields,
  truncateText,
  verifierStepReducer,
  type VerifierStepEvent,
  type VerifierStepState,
} from '../src/identra/verifierSession';

const INPUT = { verifier: 'nha-tuyen-dung-mau', scenario: 'ung-tuyen' };
const FUTURE = '2099-01-01T00:00:00.000Z';
const NOW_ISO = () => new Date().toISOString();
const ID = 'sess_0123456789abcdef';
const QR = `openid4vp://?client_id=${encodeURIComponent(`x509_hash:${'A'.repeat(43)}`)}&request_uri=${encodeURIComponent('https://api-identra.awncorp.vn/oid4vp/request/req_0123456789abcdef')}`;
const okChecks = PRESENTATION_CHECK_IDS.map((id) => ({ id, ok: true, code: null }));

const passedResult: SessionResult = {
  ok: true,
  checks: okChecks,
  claims: { ho_ten: 'Nguyễn Minh Mẫu', nganh: 'Công nghệ thông tin' },
  issuer: { maToChuc: 'truong-mau', ten: 'Trường Đại học Mẫu (DEMO)' },
  verifiedAt: '2026-11-19T01:00:00.000Z',
};

const failedWith = (code: string): SessionResult => ({
  ok: false,
  checks: okChecks.map((check) => (check.id === 'status' ? { id: 'status', ok: false, code: code as never } : check)),
  verifiedAt: '2026-11-19T01:00:00.000Z',
});
const revokedResult = failedWith('REVOKED');

const session = (status: VerificationSession['status'], result?: SessionResult): VerificationSession => ({
  id: ID,
  status,
  verifier: { name: 'Nhà tuyển dụng mẫu (DEMO)' },
  expiresAt: FUTURE,
  serverTime: NOW_ISO(),
  ...(result ? { result } : {}),
});

const update = (s: VerificationSession, clockOffsetMs = 0): VerifierStepEvent => ({ type: 'update', session: s, clockOffsetMs });
const created: VerifierStepEvent = { type: 'created', sessionId: ID, qr: QR, expiresAt: FUTURE, clockOffsetMs: 0 };
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
  createSession: async () => ({ id: ID, qr: QR, expiresAt: FUTURE, serverTime: NOW_ISO() }),
  getSession: async () => session('pending'),
  watchSession: async () => session('pending'),
  ...overrides,
});

test('reducer: pending → request_retrieved → verified, keeping the server clock offset', () => {
  const state = reduce([{ type: 'start' }, created, update(session('pending')), update(session('request_retrieved'), -660_000)]);
  assert.equal(state.phase, 'waiting');
  assert.equal(state.phase === 'waiting' && state.status, 'request_retrieved');
  assert.equal(state.phase === 'waiting' && state.clockOffsetMs, -660_000);
  assert.equal(verifierStepReducer(state, update(session('verified', passedResult))).phase, 'verified');
});

test('reducer: the result decides, failures and expiry end the wait', () => {
  const waiting = reduce([{ type: 'start' }, created]);
  assert.equal(verifierStepReducer(waiting, update(session('failed', revokedResult))).phase, 'failed');
  assert.equal(verifierStepReducer(waiting, update(session('expired'))).phase, 'expired');
});

test('reducer: "reconnecting" clears on recovery and on any answer; late events are ignored', () => {
  const waiting = reduce([{ type: 'start' }, created]);
  const retrying = verifierStepReducer(waiting, { type: 'retrying' });
  assert.equal(retrying.phase === 'waiting' && retrying.reconnecting, true);
  const recovered = verifierStepReducer(retrying, { type: 'recovered' });
  assert.equal(recovered.phase === 'waiting' && recovered.reconnecting, false);
  const answered = verifierStepReducer(retrying, update(session('pending')));
  assert.equal(answered.phase === 'waiting' && answered.reconnecting, false);
  assert.equal(verifierStepReducer(waiting, update({ ...session('verified', passedResult), id: 'other_0123456789ab' })), waiting);
  assert.equal(verifierStepReducer(INITIAL_VERIFIER_STEP_STATE, { type: 'retrying' }), INITIAL_VERIFIER_STEP_STATE);
  const expired = verifierStepReducer(waiting, { type: 'expired' });
  assert.equal(verifierStepReducer(expired, update(session('verified', passedResult))), expired);
});

test('problems come from the error kind and status, never from a message', () => {
  const cases: Array<[VerifierClientError, string]> = [
    [new VerifierClientError('network', 'x'), 'network'],
    [new VerifierClientError('timeout', 'x'), 'network'],
    [new VerifierClientError('rate_limited', 'x', { status: 429, code: 'RATE_LIMITED' }), 'rate_limited'],
    [new VerifierClientError('http', 'x', { status: 400, code: 'VALIDATION_FAILED' }), 'rejected'],
    [new VerifierClientError('http', 'x', { status: 403, code: 'FORBIDDEN' }), 'rejected'],
    [new VerifierClientError('http', 'x', { status: 409, code: 'CONFLICT' }), 'rejected'],
    [new VerifierClientError('http', 'x', { status: 500, code: 'INTERNAL_ERROR' }), 'unavailable'],
    [new VerifierClientError('http', 'x', { status: 503, code: 'UNAVAILABLE' }), 'unavailable'],
    [new VerifierClientError('malformed', 'x'), 'unreadable'],
  ];
  for (const [error, problem] of cases) assert.equal(problemFor(error), problem, `${error.kind} ${error.status}`);
});

test('final failures (revoked, suspended, untrusted) differ from ones that may pass later', () => {
  assert.equal(isFinalFailure(toCheckRows(revokedResult)), true);
  assert.equal(isFinalFailure(toCheckRows(failedWith('SUSPENDED'))), true);
  assert.equal(isFinalFailure(toCheckRows(failedWith('STATUS_UNAVAILABLE'))), false);
  assert.equal(isFinalFailure(toCheckRows(passedResult)), false);
});

test('run: follows the session to a verified result and hands the creation clock to the watch', async () => {
  const log = recorder();
  let watchOptions: Record<string, unknown> = {};
  await runVerifierSession(fakeClient({
    createSession: async () => ({ id: ID, qr: QR, expiresAt: FUTURE, serverTime: '2026-11-19T00:00:00.000Z' }),
    watchSession: async (_id, options) => {
      watchOptions = { expiresAt: options?.expiresAt, serverTime: options?.serverTime };
      options?.onUpdate?.(session('pending'));
      options?.onError?.(new VerifierClientError('network', 'x'), { attempt: 1, retryInMs: 2 });
      options?.onRecover?.();
      options?.onUpdate?.(session('request_retrieved'));
      return session('verified', passedResult);
    },
  }), INPUT, { signal: new AbortController().signal, dispatch: log.dispatch, now: () => Date.parse('2026-11-19T00:11:00.000Z') });
  assert.deepEqual(log.states.map((state) => state.phase), ['creating', 'waiting', 'waiting', 'waiting', 'waiting', 'waiting', 'verified']);
  assert.deepEqual(watchOptions, { expiresAt: FUTURE, serverTime: '2026-11-19T00:00:00.000Z' });
  // The local clock is 11 minutes ahead of the server.
  const createdState = log.states[1]!;
  assert.equal(createdState.phase === 'waiting' && createdState.clockOffsetMs, -660_000);
  const recoveredState = log.states[4]!;
  assert.equal(recoveredState.phase === 'waiting' && recoveredState.reconnecting, false);
});

test('run: a revoked diploma ends in the failed phase with the status check failing', async () => {
  const log = recorder();
  await runVerifierSession(fakeClient({ watchSession: async () => session('failed', revokedResult) }), INPUT, {
    signal: new AbortController().signal,
    dispatch: log.dispatch,
  });
  assert.equal(log.state.phase, 'failed');
  assert.equal(log.state.phase === 'failed' && log.state.result.checks.find((c) => c.id === 'status')?.code, 'REVOKED');
});

test('run: a 429 records when a retry makes sense; a vanished session is expired', async () => {
  const log = recorder();
  await runVerifierSession(fakeClient({
    createSession: async () => { throw new VerifierClientError('rate_limited', 'HTTP 429', { status: 429, code: 'RATE_LIMITED', retryAfterSeconds: 30 }); },
  }), INPUT, { signal: new AbortController().signal, dispatch: log.dispatch, now: () => 1_000 });
  assert.deepEqual(log.state, { phase: 'error', problem: 'rate_limited', retryAt: 31_000 });

  const gone = recorder();
  await runVerifierSession(fakeClient({
    watchSession: async () => { throw new VerifierClientError('not_found', 'HTTP 404', { status: 404, code: 'NOT_FOUND' }); },
  }), INPUT, { signal: new AbortController().signal, dispatch: gone.dispatch });
  assert.equal(gone.state.phase, 'expired');
});

test('run: nothing is dispatched once aborted (dialog closed or page left)', async () => {
  const controller = new AbortController();
  const log = recorder();
  await runVerifierSession(fakeClient({
    createSession: async () => {
      controller.abort();
      return { id: ID, qr: QR, expiresAt: FUTURE, serverTime: NOW_ISO() };
    },
    watchSession: async (_id, options) => {
      options?.onUpdate?.(session('verified', passedResult));
      return session('verified', passedResult);
    },
  }), INPUT, { signal: controller.signal, dispatch: log.dispatch });
  assert.deepEqual(log.states.map((state) => state.phase), ['creating']);
});

const realClient = (respond: (url: string) => unknown, counter: { requests: number }) => createVerifierClient({
  baseUrl: 'https://api.example.test',
  fetch: (async (input: RequestInfo | URL, init?: RequestInit) => {
    counter.requests += 1;
    if (init?.signal?.aborted) throw init.signal.reason;
    return new Response(JSON.stringify(respond(String(input))), { status: String(input).endsWith('/sessions') ? 201 : 200 });
  }) as typeof fetch,
});

test('run with the real SDK client: no request and no state update after abort (unmount)', async () => {
  const counter = { requests: 0 };
  const client = realClient((url) => (url.endsWith('/v1/verification/sessions')
    ? { id: ID, qr: QR, expiresAt: FUTURE, serverTime: NOW_ISO() }
    : session('pending')), counter);
  const controller = new AbortController();
  const log = recorder();

  const run = runVerifierSession(client, INPUT, { signal: controller.signal, dispatch: log.dispatch, intervalMs: 5 });
  await new Promise((resolve) => setTimeout(resolve, 40));
  controller.abort();
  await run;
  const requestsAtAbort = counter.requests;
  const statesAtAbort = log.states.length;
  assert.ok(requestsAtAbort >= 2, 'it polled while open');
  await new Promise((resolve) => setTimeout(resolve, 60));
  assert.equal(counter.requests, requestsAtAbort, 'no polling after abort');
  assert.equal(log.states.length, statesAtAbort, 'no state update after abort');
});

test('run with the real SDK client: expiry follows the server clock, never polled past it', async () => {
  // The device clock is 31 minutes ahead; the session has 30 ms left on the server.
  for (const skewMs of [31 * 60_000, -11 * 60_000, 6 * 60_000]) {
    const counter = { requests: 0 };
    const serverNow = () => Date.now() - skewMs;
    const expiresAt = new Date(serverNow() + 30).toISOString();
    const client = createVerifierClient({
      baseUrl: 'https://api.example.test',
      now: () => Date.now(),
      fetch: (async (input: RequestInfo | URL) => {
        counter.requests += 1;
        const body = String(input).endsWith('/v1/verification/sessions')
          ? { id: ID, qr: QR, expiresAt, serverTime: new Date(serverNow()).toISOString() }
          : { ...session('pending'), expiresAt, serverTime: new Date(serverNow()).toISOString() };
        return new Response(JSON.stringify(body), { status: 200 });
      }) as typeof fetch,
    });
    const log = recorder();
    await runVerifierSession(client, INPUT, { signal: new AbortController().signal, dispatch: log.dispatch, intervalMs: 5 });
    assert.equal(log.state.phase, 'expired', `skew ${skewMs}`);
    const waitingStates = log.states.filter((state) => state.phase === 'waiting');
    assert.ok(waitingStates.length >= 1, `it waited first (skew ${skewMs})`);
    const requestsAtExpiry = counter.requests;
    await new Promise((resolve) => setTimeout(resolve, 40));
    assert.equal(counter.requests, requestsAtExpiry);
  }
});

test('shared fields: known claims first with labels, others kept as text, every value capped at 500 characters', () => {
  const fields = toSharedFields({ nganh: 'Kinh tế', extra_field: 'x'.repeat(900), ho_ten: 'Trần Thu Mẫu', nam_tot_nghiep: '2026' });
  assert.deepEqual(fields.map((field) => field.key), ['ho_ten', 'nganh', 'nam_tot_nghiep', null]);
  assert.equal(fields[2]?.value, '2026');
  assert.equal(Array.from(fields[3]!.value).length, 500);
  assert.equal(truncateText('ắ'.repeat(600)).length, 500);
  assert.equal(secondsUntil('2026-01-01T00:00:10Z', Date.parse('2026-01-01T00:00:00Z')), 10);
  assert.equal(secondsUntil('2026-01-01T00:00:00Z', Date.parse('2026-01-01T00:00:10Z')), 0);
});
