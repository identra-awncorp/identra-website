/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import {
  advanceTicketTransferProgress,
  createTicketTransferProgress,
  resetTicketTransferProgress,
} from '../src/components/demo/TicketTransferDemoModel';

test('advances ticket transfer through ownership, escrow, and swap', () => {
  const ownershipTransition = advanceTicketTransferProgress(createTicketTransferProgress());
  assert.ok(ownershipTransition);
  assert.equal(ownershipTransition.completedStageId, 'ownership-verification');
  assert.equal(ownershipTransition.nextStageId, 'escrow-lock');

  const escrowTransition = advanceTicketTransferProgress(ownershipTransition.progress);
  assert.ok(escrowTransition);
  const swapTransition = advanceTicketTransferProgress(escrowTransition.progress);
  assert.ok(swapTransition);
  assert.equal(swapTransition.completedStageId, 'credential-swap');
  assert.equal(swapTransition.nextStageId, null);
  assert.equal(swapTransition.progress.status, 'complete');
});

test('does not advance a completed ticket transfer and resets cleanly', () => {
  const first = advanceTicketTransferProgress(createTicketTransferProgress());
  assert.ok(first);
  const second = advanceTicketTransferProgress(first.progress);
  assert.ok(second);
  const complete = advanceTicketTransferProgress(second.progress);
  assert.ok(complete);

  assert.equal(advanceTicketTransferProgress(complete.progress), null);
  assert.deepEqual(
    resetTicketTransferProgress(complete.progress).completedSteps,
    [false, false, false],
  );
});
