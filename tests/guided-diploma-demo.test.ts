/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// The guided diploma demo's progress: it moves only on what really happened (the wallet saved the diploma,
// the employer's check passed, the school revoked it, the next check failed at the status step or the
// wallet refused), never on a click alone.
import assert from 'node:assert/strict';
import test from 'node:test';
import {
  canView,
  currentPosition,
  GUIDED_START,
  guidedReducer,
  stepStatus,
  type GuidedEvent,
  type GuidedState,
} from '../src/identra/guidedDiplomaDemo';

const run = (...events: GuidedEvent[]): GuidedState => events.reduce(guidedReducer, GUIDED_START);

test('starts at step 1 with nothing done', () => {
  assert.equal(currentPosition(GUIDED_START), 'receive');
  assert.equal(stepStatus(GUIDED_START, 'receive'), 'current');
  assert.equal(stepStatus(GUIDED_START, 'apply'), 'upcoming');
  assert.equal(canView(GUIDED_START, 'apply'), false);
});

test('a saved diploma completes step 1 and moves to step 2 by itself', () => {
  const state = run({ type: 'received' });
  assert.equal(currentPosition(state), 'apply');
  assert.equal(state.viewing, 'apply');
  assert.equal(stepStatus(state, 'receive'), 'done');
});

test('nothing before the diploma is received counts as a check', () => {
  const state = run({ type: 'verified', ok: true, reason: null }, { type: 'revoked' }, { type: 'walletRefused', status: 'revoked' });
  assert.deepEqual(state, GUIDED_START);
});

test('a failed check in step 2 keeps the visitor at step 2; a passing one completes it without leaving the result', () => {
  const failed = run({ type: 'received' }, { type: 'verified', ok: false, reason: 'STATUS_UNAVAILABLE' });
  assert.equal(currentPosition(failed), 'apply');
  const passed = guidedReducer(failed, { type: 'verified', ok: true, reason: null });
  assert.equal(currentPosition(passed), 'revoke');
  assert.equal(passed.viewing, 'apply', 'the result stays on screen until the visitor moves on');
  assert.equal(guidedReducer(passed, { type: 'view', position: 'revoke' }).viewing, 'revoke');
});

test('revocation is accepted only after a successful application', () => {
  assert.equal(run({ type: 'received' }, { type: 'revoked' }).revoked, false);
  assert.equal(run({ type: 'received' }, { type: 'verified', ok: true, reason: null }, { type: 'revoked' }).revoked, true);
});

const applied: GuidedEvent[] = [{ type: 'received' }, { type: 'verified', ok: true, reason: null }];

test('after the revocation, a check failing at REVOKED ends the run (refused by the employer)', () => {
  const state = run(...applied, { type: 'revoked' }, { type: 'verified', ok: false, reason: 'REVOKED' });
  assert.equal(state.refusedBy, 'employer');
  assert.equal(currentPosition(state), 'done');
  assert.equal(state.viewing, 'done');
  assert.equal(stepStatus(state, 'revoke'), 'done');
});

test('after the revocation, another failure or a pass does not end the run', () => {
  const other = run(...applied, { type: 'revoked' }, { type: 'verified', ok: false, reason: 'STATUS_UNAVAILABLE' });
  assert.equal(currentPosition(other), 'revoke');
  assert.equal(other.lastFailure, 'STATUS_UNAVAILABLE');
  const passed = guidedReducer(other, { type: 'verified', ok: true, reason: null });
  assert.equal(currentPosition(passed), 'revoke');
  assert.equal(passed.lastFailure, null);
});

test('a check before the revocation is confirmed does not count as step 3', () => {
  const state = run(...applied, { type: 'verified', ok: false, reason: 'REVOKED' });
  assert.equal(currentPosition(state), 'revoke');
  assert.equal(state.refusedBy, null);
});

test('the wallet refusing a revoked diploma also ends the run, only after the revocation', () => {
  assert.equal(run(...applied, { type: 'walletRefused', status: 'revoked' }).refusedBy, null);
  const state = run(...applied, { type: 'revoked' }, { type: 'walletRefused', status: 'revoked' });
  assert.equal(state.refusedBy, 'wallet');
  assert.equal(state.walletStatus, 'revoked', 'the sentence follows the status the wallet knew');
  assert.equal(currentPosition(state), 'done');
});

test('steps not reached yet cannot be opened; done steps can', () => {
  const state = run({ type: 'received' });
  assert.equal(guidedReducer(state, { type: 'view', position: 'revoke' }).viewing, 'apply');
  assert.equal(guidedReducer(state, { type: 'view', position: 'receive' }).viewing, 'receive');
});

test('a notice (reload, lost session) keeps the facts; restart clears everything', () => {
  const state = run(...applied, { type: 'notice', notice: 'sessionLost' });
  assert.equal(state.notice, 'sessionLost');
  assert.equal(state.applied, true);
  assert.deepEqual(guidedReducer(state, { type: 'restart' }), GUIDED_START);
});

test('a failed employer result is never a pass: not in step 2, not after the revocation', () => {
  for (const reason of ['REVOKED', 'SIGNATURE_INVALID', 'ISSUER_NOT_TRUSTED', 'QUERY_NOT_SATISFIED', 'UNKNOWN', null] as const) {
    const step2 = run({ type: 'received' }, { type: 'verified', ok: false, reason });
    assert.equal(step2.applied, false, `step 2 with ${reason}`);
    assert.equal(currentPosition(step2), 'apply');
  }
  const afterRevoke = run(...applied, { type: 'revoked' }, { type: 'verified', ok: false, reason: 'SIGNATURE_INVALID' });
  assert.equal(afterRevoke.refusedBy, null, 'only a failure AT the revocation ends step 3');
});
