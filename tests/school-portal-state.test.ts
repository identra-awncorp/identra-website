/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Reducers of the sample university portal: sign-in, a student's offer, and the registrar's list.
import assert from 'node:assert/strict';
import test from 'node:test';
import type { CredentialOffer, IssuedCredential } from '../src/identra/schoolPortalClient';
import { PortalApiError } from '../src/identra/schoolPortalClient';
import {
  actionsFor,
  authReducer,
  countByStatus,
  CREDENTIALS_LOADING,
  loadProblemFor,
  signInProblemFor,
  statusChangeProblemFor,
  credentialsReducer,
  OFFER_IDLE,
  offerReducer,
  SIGNED_OUT,
} from '../src/identra/schoolPortalState';

const offer: CredentialOffer = {
  offerId: 'o1',
  offerUri: 'openid-credential-offer://?credential_offer_uri=x',
  txCode: '123456',
  expiresAt: '2026-11-19T02:10:00Z',
  serverTime: '2026-11-19T02:00:00Z',
};

const rows: IssuedCredential[] = [
  { id: 'a', studentCode: 'SV0003', studentName: 'Lê Hoàng Mẫu', issuedAt: '2026-11-16T00:00:00Z', status: 'valid' },
  { id: 'b', studentCode: 'SV0098', studentName: 'Phạm Ngọc Mẫu', issuedAt: '2026-10-31T00:00:00Z', status: 'suspended' },
  { id: 'c', studentCode: 'SV0102', studentName: 'Võ Đức Mẫu', issuedAt: '2026-10-04T00:00:00Z', status: 'revoked' },
];

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
    offerReducer(offerReducer(OFFER_IDLE, { type: 'create' }), { type: 'failed', problem: 'rate_limited', retryAt: 5_000 }),
    { phase: 'error', problem: 'rate_limited', retryAt: 5_000 },
  );
  // A new offer is always possible, also after one was issued (a new or lost phone).
  const issued = offerReducer(active, { type: 'status', offerId: 'o1', status: 'issued' });
  assert.equal(offerReducer(issued, { type: 'create' }).phase, 'creating');
});

test('registrar list: a reload keeps the rows on screen; a status change applies only the server answer', () => {
  const ready = credentialsReducer(CREDENTIALS_LOADING, { type: 'loaded', items: rows, at: 1 });
  const reloading = credentialsReducer(ready, { type: 'load' });
  assert.deepEqual(reloading, { phase: 'loading', items: rows });
  const failed = credentialsReducer(reloading, { type: 'loadFailed', problem: 'network' });
  assert.deepEqual(failed, { phase: 'error', problem: 'network', items: rows });

  const changed = credentialsReducer(ready, { type: 'statusChanged', id: 'a', status: 'suspended' });
  assert.deepEqual(changed.items?.map((row) => row.status), ['suspended', 'suspended', 'revoked']);
  assert.deepEqual(rows.map((row) => row.status), ['valid', 'suspended', 'revoked'], 'input rows are not mutated');
});

test('registrar actions: revoking is final, counts come from the rows', () => {
  assert.deepEqual(actionsFor('valid'), ['suspend', 'revoke']);
  assert.deepEqual(actionsFor('suspended'), ['restore', 'revoke']);
  assert.deepEqual(actionsFor('revoked'), []);
  assert.deepEqual(countByStatus(rows), { valid: 1, suspended: 1, revoked: 1 });
  assert.deepEqual(countByStatus([]), { valid: 0, suspended: 0, revoked: 0 });
});

test('every error code gets its own problem in each place it can happen', () => {
  const error = (kind: ConstructorParameters<typeof PortalApiError>[0]) => new PortalApiError(kind, 'x');
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
    ['already_revoked', 'session_expired', 'forbidden', 'not_found', 'rejected', 'rate_limited', 'network', 'unavailable'],
  );
});
