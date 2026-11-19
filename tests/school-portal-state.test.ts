/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Reducers of the sample university portal: sign-in, a student's offer, and the registrar's list.
import assert from 'node:assert/strict';
import test from 'node:test';
import type { CredentialOffer, IssuedCredential, SchoolPortalClient } from '../src/identra/schoolPortalClient';
import { PortalApiError } from '../src/identra/schoolPortalClient';
import {
  actionsFor,
  authReducer,
  CONFIRM_IDLE,
  confirmReducer,
  countByStatus,
  CREDENTIALS_LOADING,
  loadProblemFor,
  offerProblemFor,
  pendingOfferId,
  replaceOffer,
  signInProblemFor,
  statusChangeProblemFor,
  credentialsReducer,
  OFFER_IDLE,
  offerReducer,
  SIGNED_OUT,
  type ConfirmState,
  type StatusChangeProblem,
} from '../src/identra/schoolPortalState';

const offer: CredentialOffer = {
  offerId: 'o1',
  offerUri: 'openid-credential-offer://?credential_offer_uri=x',
  txCode: '123456',
  expiresAt: '2026-11-19T02:10:00Z',
  serverTime: '2026-11-19T02:00:00Z',
};

const rows: IssuedCredential[] = [
  { id: 'a', studentCode: 'SV0003', studentName: 'Lê Hoàng Mẫu', issuedAt: '2026-11-16T00:00:00Z', status: 'valid', canRevoke: true },
  { id: 'b', studentCode: 'SV0098', studentName: 'Phạm Ngọc Mẫu', issuedAt: '2026-10-31T00:00:00Z', status: 'suspended', canRevoke: true },
  { id: 'c', studentCode: 'SV0102', studentName: 'Võ Đức Mẫu', issuedAt: '2026-10-04T00:00:00Z', status: 'revoked', canRevoke: false },
];

const error = (kind: ConstructorParameters<typeof PortalApiError>[0]) => new PortalApiError(kind, 'x');

test('sign-in: submitting clears the last problem; failures keep the user signed out with a reason', () => {
  const failed = authReducer(authReducer(SIGNED_OUT, { type: 'submit' }), { type: 'signInFailed', problem: 'rate_limited', retryAt: 31_000 });
  assert.deepEqual(failed, { status: 'signedOut', notice: null, submitting: false, problem: 'rate_limited', retryAt: 31_000 });
  const retry = authReducer(failed, { type: 'submit' });
  assert.equal(retry.status === 'signedOut' && retry.problem, null);
});

test('sign-in: expiry and sign-out return to the form with the matching notice', () => {
  const session = {
    role: 'registrar' as const, token: 't', expiresAt: '2026-11-19T02:00:00Z', serverTime: '2026-11-19T01:30:00Z', profile: { hoTen: 'A', donVi: 'B' },
  };
  const signedIn = authReducer(SIGNED_OUT, { type: 'signedIn', session, clockOffsetMs: -660_000 });
  assert.deepEqual(signedIn, { status: 'signedIn', session, clockOffsetMs: -660_000 });
  assert.deepEqual(authReducer(signedIn, { type: 'sessionExpired' }), { ...SIGNED_OUT, notice: 'session_expired' });
  assert.deepEqual(authReducer(signedIn, { type: 'signOut' }), { ...SIGNED_OUT, notice: 'signed_out' });
  // A late failure from an old attempt cannot sign the user out.
  assert.equal(authReducer(signedIn, { type: 'signInFailed', problem: 'network' }), signedIn);
});

test('offer: created → issued, and statuses for another offer are ignored', () => {
  const active = offerReducer(offerReducer(OFFER_IDLE, { type: 'create' }), { type: 'created', offer, clockOffsetMs: 360_000 });
  assert.deepEqual(active, { phase: 'active', offer, clockOffsetMs: 360_000, reconnecting: false });
  assert.equal(offerReducer(active, { type: 'status', offerId: 'other', status: 'issued' }), active);
  assert.deepEqual(offerReducer(active, { type: 'status', offerId: 'o1', status: 'issued' }), { phase: 'issued', offer });
});

test('offer: polling problems flag reconnecting until the next answer; expiry ends the offer', () => {
  const active = offerReducer(offerReducer(OFFER_IDLE, { type: 'create' }), { type: 'created', offer, clockOffsetMs: 0 });
  const reconnecting = offerReducer(active, { type: 'pollFailed', offerId: 'o1' });
  assert.equal(reconnecting.phase === 'active' && reconnecting.reconnecting, true);
  const recovered = offerReducer(reconnecting, { type: 'status', offerId: 'o1', status: 'pending' });
  assert.equal(recovered.phase === 'active' && recovered.reconnecting, false);
  assert.deepEqual(offerReducer(active, { type: 'status', offerId: 'o1', status: 'expired' }), { phase: 'expired' });
  assert.deepEqual(offerReducer(active, { type: 'expiredLocally', offerId: 'o1' }), { phase: 'expired' });
  const expired = offerReducer(active, { type: 'expiredLocally', offerId: 'o1' });
  assert.equal(offerReducer(expired, { type: 'status', offerId: 'o1', status: 'issued' }), expired);
  assert.deepEqual(
    offerReducer(offerReducer(OFFER_IDLE, { type: 'create' }), { type: 'failed', problem: 'too_many_offers', retryAt: 5_000 }),
    { phase: 'error', problem: 'too_many_offers', retryAt: 5_000 },
  );
  // A new offer is always possible, also after one was issued (a new or lost phone).
  const issued = offerReducer(active, { type: 'status', offerId: 'o1', status: 'issued' });
  assert.equal(offerReducer(issued, { type: 'create' }).phase, 'creating');
});

test('offer creation: a 429 is this network\'s share of codes, a 503 is everyone\'s cap', () => {
  assert.deepEqual(
    (['rate_limited', 'unavailable', 'network', 'timeout', 'forbidden', 'validation_failed', 'internal_error', 'malformed'] as const)
      .map((kind) => offerProblemFor(error(kind))),
    ['too_many_offers', 'busy', 'network', 'network', 'forbidden', 'rejected', 'unavailable', 'unavailable'],
  );
  const creating = offerReducer(OFFER_IDLE, { type: 'create' });
  assert.deepEqual(offerReducer(creating, { type: 'failed', problem: 'busy', retryAt: 90_000 }), { phase: 'error', problem: 'busy', retryAt: 90_000 });
  assert.deepEqual(offerReducer(creating, { type: 'failed', problem: 'busy' }), { phase: 'error', problem: 'busy', retryAt: null });
});

test('offer in focus: only a code still waiting for a wallet is cancelled', () => {
  const active = offerReducer(offerReducer(OFFER_IDLE, { type: 'create' }), { type: 'created', offer, clockOffsetMs: 0 });
  assert.equal(pendingOfferId(active), 'o1');
  assert.equal(pendingOfferId(offerReducer(active, { type: 'pollFailed', offerId: 'o1' })), 'o1');
  for (const state of [
    OFFER_IDLE,
    offerReducer(OFFER_IDLE, { type: 'create' }),
    offerReducer(active, { type: 'status', offerId: 'o1', status: 'issued' }),
    offerReducer(active, { type: 'status', offerId: 'o1', status: 'expired' }),
    offerReducer(offerReducer(OFFER_IDLE, { type: 'create' }), { type: 'failed', problem: 'busy' }),
  ]) {
    assert.equal(pendingOfferId(state), null, state.phase);
  }
  // A revoked diploma ends the "issued" message; a code still waiting is not touched.
  assert.deepEqual(offerReducer(offerReducer(active, { type: 'status', offerId: 'o1', status: 'issued' }), { type: 'dismissIssued' }), OFFER_IDLE);
  assert.equal(offerReducer(active, { type: 'dismissIssued' }), active);
  // Asking for a new code while one is pending: the page moves to `creating`, so polling of the old one stops.
  assert.deepEqual(offerReducer(active, { type: 'create' }), { phase: 'creating' });
});

type Calls = string[];
const fakeOffers = (calls: Calls, cancel: () => Promise<unknown>): Pick<SchoolPortalClient, 'cancelOffer' | 'createOffer'> => ({
  cancelOffer: async (_token, offerId) => {
    calls.push(`DELETE ${offerId}`);
    await cancel();
    return { offerId, status: 'expired' };
  },
  createOffer: async () => {
    calls.push('POST');
    return { ...offer, offerId: 'o2' };
  },
});

test('a new code while one is pending: DELETE the old one, then POST, whatever the DELETE answers', async () => {
  const calls: Calls = [];
  assert.equal((await replaceOffer(fakeOffers(calls, async () => undefined), 't', 'o1')).offerId, 'o2');
  assert.deepEqual(calls, ['DELETE o1', 'POST']);

  const failing: Calls = [];
  await replaceOffer(fakeOffers(failing, async () => { throw new PortalApiError('not_found', 'x'); }), 't', 'o1');
  assert.deepEqual(failing, ['DELETE o1', 'POST'], 'a failed cancellation does not block the new code');

  const hanging: Calls = [];
  const started = Date.now();
  await replaceOffer({
    ...fakeOffers(hanging, async () => undefined),
    cancelOffer: (_token, offerId, options) => {
      hanging.push(`DELETE ${offerId}`);
      return new Promise((_, reject) => options?.signal?.addEventListener('abort', () => reject(new Error('aborted'))));
    },
  }, 't', 'o1', undefined, 30);
  assert.deepEqual(hanging, ['DELETE o1', 'POST'], 'a cancellation that hangs is given up after the wait');
  assert.ok(Date.now() - started < 1000);

  const fresh: Calls = [];
  await replaceOffer(fakeOffers(fresh, async () => undefined), 't', null);
  assert.deepEqual(fresh, ['POST'], 'nothing to cancel without a pending code');

  const left: Calls = [];
  const controller = new AbortController();
  await assert.rejects(replaceOffer(fakeOffers(left, async () => { controller.abort(); }), 't', 'o1', controller.signal));
  assert.deepEqual(left, ['DELETE o1'], 'no new code is made for a page that is gone');
});

test('lists: a reload keeps the rows on screen; a status change applies only the server answer', () => {
  const ready = credentialsReducer(CREDENTIALS_LOADING, { type: 'loaded', items: rows, nextCursor: null, at: 1 });
  const reloading = credentialsReducer(ready, { type: 'load' });
  assert.deepEqual(reloading, { phase: 'loading', items: rows, nextCursor: null });
  const failed = credentialsReducer(reloading, { type: 'loadFailed', problem: 'network' });
  assert.deepEqual(failed, { phase: 'error', problem: 'network', items: rows, nextCursor: null });

  const changed = credentialsReducer(ready, { type: 'statusChanged', id: 'a', status: 'suspended' });
  assert.deepEqual(changed.items?.map((row) => row.status), ['suspended', 'suspended', 'revoked']);
  assert.equal(changed.items?.[0]?.canRevoke, true, 'a suspended diploma can still be revoked');
  const revoked = credentialsReducer(ready, { type: 'statusChanged', id: 'a', status: 'revoked' });
  assert.deepEqual(revoked.items?.[0], { ...rows[0], status: 'revoked', canRevoke: false });
  assert.deepEqual(rows.map((row) => row.status), ['valid', 'suspended', 'revoked'], 'input rows are not mutated');
});

test('lists: "show more" appends the next page once, and a failure keeps what is on screen', () => {
  const firstPage = credentialsReducer(CREDENTIALS_LOADING, { type: 'loaded', items: rows.slice(0, 2), nextCursor: 'p2', at: 1 });
  const loadingMore = credentialsReducer(firstPage, { type: 'loadMore' });
  assert.equal(loadingMore.phase === 'ready' && loadingMore.more, 'loading');
  const both = credentialsReducer(loadingMore, { type: 'moreLoaded', items: rows.slice(1), nextCursor: null });
  assert.deepEqual(both.items?.map((row) => row.id), ['a', 'b', 'c'], 'a row seen on both pages is listed once');
  assert.equal(both.nextCursor, null);
  assert.equal(credentialsReducer(both, { type: 'loadMore' }), both, 'nothing more after the last page');

  const failed = credentialsReducer(loadingMore, { type: 'moreFailed', problem: 'rate_limited' });
  assert.equal(failed.phase === 'ready' && failed.more, 'rate_limited');
  assert.deepEqual(failed.items, rows.slice(0, 2));
  // A reload starts again from the first page; a late page of the old list is ignored.
  const reloading = credentialsReducer(loadingMore, { type: 'load' });
  assert.equal(credentialsReducer(reloading, { type: 'moreLoaded', items: rows, nextCursor: null }), reloading);
});

test('revoke: confirm → saving → done with the server\'s answer, or failed with the reason per code', () => {
  const target = rows[0]!;
  const reduce = (state: ConfirmState<IssuedCredential>, ...events: Parameters<typeof confirmReducer<IssuedCredential>>[1][]) =>
    events.reduce((current, event) => confirmReducer(current, event), state);

  const confirm = reduce(CONFIRM_IDLE, { type: 'open', target });
  assert.deepEqual(confirm, { phase: 'confirm', target });
  const saving = reduce(confirm, { type: 'save' });
  assert.deepEqual(saving, { phase: 'saving', target });
  assert.equal(reduce(saving, { type: 'cancel' }), saving, 'the dialog cannot be dismissed while the server decides');
  assert.equal(reduce(saving, { type: 'open', target: rows[1]! }), saving);
  assert.deepEqual(reduce(saving, { type: 'saved', status: 'revoked' }), { phase: 'done', target, status: 'revoked' });

  const codes: Array<[ConstructorParameters<typeof PortalApiError>[0], StatusChangeProblem]> = [
    ['not_found', 'not_found'],
    ['conflict', 'already_revoked'],
    ['rate_limited', 'rate_limited'],
    ['unavailable', 'unavailable'],
    ['forbidden', 'forbidden'],
    ['session_expired', 'session_expired'],
    ['network', 'no_answer'],
    ['timeout', 'no_answer'],
    ['internal_error', 'no_answer'],
    ['malformed', 'no_answer'],
  ];
  for (const [kind, problem] of codes) {
    const failed = reduce(saving, { type: 'failed', problem: statusChangeProblemFor(error(kind)), retryAt: 9_000 });
    assert.deepEqual(failed, { phase: 'failed', target, problem, retryAt: 9_000 }, kind);
  }

  const busy = reduce(saving, { type: 'failed', problem: 'unavailable' });
  assert.deepEqual(busy, { phase: 'failed', target, problem: 'unavailable', retryAt: null });
  assert.deepEqual(reduce(busy, { type: 'save' }), saving, 'trying again goes back to saving');
  assert.deepEqual(reduce(busy, { type: 'cancel' }), CONFIRM_IDLE);
  // Stray answers change nothing.
  assert.equal(reduce(CONFIRM_IDLE, { type: 'saved', status: 'revoked' }), CONFIRM_IDLE);
  assert.equal(reduce(confirm, { type: 'failed', problem: 'unavailable' }), confirm);
});

test('registrar actions: revoking is final, only offered when the server allows it, counts come from the rows', () => {
  assert.deepEqual(actionsFor('valid', true), ['suspend', 'revoke']);
  assert.deepEqual(actionsFor('suspended', true), ['restore', 'revoke']);
  assert.deepEqual(actionsFor('valid', false), ['suspend']);
  assert.deepEqual(actionsFor('suspended', false), ['restore']);
  assert.deepEqual(actionsFor('revoked', false), []);
  assert.deepEqual(countByStatus(rows), { valid: 1, suspended: 1, revoked: 1 });
  assert.deepEqual(countByStatus([]), { valid: 0, suspended: 0, revoked: 0 });
});

test('every error code gets its own problem in each place it can happen', () => {
  assert.deepEqual(
    (['invalid_credentials', 'rate_limited', 'network', 'timeout', 'validation_failed', 'internal_error', 'unavailable'] as const).map((kind) => signInProblemFor(error(kind))),
    ['invalid_credentials', 'rate_limited', 'network', 'network', 'rejected', 'unavailable', 'unavailable'],
  );
  assert.deepEqual(
    (['forbidden', 'rate_limited', 'validation_failed', 'network', 'unavailable'] as const).map((kind) => loadProblemFor(error(kind))),
    ['forbidden', 'rate_limited', 'rejected', 'network', 'unavailable'],
  );
  assert.deepEqual(
    (['conflict', 'session_expired', 'forbidden', 'not_found', 'validation_failed', 'rate_limited', 'timeout', 'internal_error'] as const)
      .map((kind) => statusChangeProblemFor(error(kind))),
    ['already_revoked', 'session_expired', 'forbidden', 'not_found', 'rejected', 'rate_limited', 'no_answer', 'no_answer'],
  );
});
