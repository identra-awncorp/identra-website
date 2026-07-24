/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import {
  advanceTicketBookingProgress,
  createTicketBookingProgress,
  generateTicketBookingOtp,
  resetTicketBookingProgress,
  TICKET_BOOKING_INITIAL_SEATS,
  toggleTicketBookingSeat,
  validateTicketBookingOtp,
  validateTicketBookingPhone,
  validateTicketBookingSeats,
} from '../src/components/demo/TicketBookingDemoModel';

test('advances booking from seat reservation through ticket issuance', () => {
  const seatTransition = advanceTicketBookingProgress(createTicketBookingProgress());
  assert.ok(seatTransition);
  assert.equal(seatTransition.completedStageId, 'seat-reservation');
  assert.equal(seatTransition.nextStageId, 'anti-bot-check');

  const antiBotTransition = advanceTicketBookingProgress(seatTransition.progress);
  assert.ok(antiBotTransition);
  const phoneTransition = advanceTicketBookingProgress(antiBotTransition.progress);
  assert.ok(phoneTransition);
  assert.equal(phoneTransition.completedStageId, 'phone-verification');
  assert.equal(phoneTransition.nextStageId, 'ticket-issuance');

  const issuanceTransition = advanceTicketBookingProgress(phoneTransition.progress);
  assert.ok(issuanceTransition);
  assert.equal(issuanceTransition.completedStageId, 'ticket-issuance');
  assert.equal(issuanceTransition.progress.status, 'complete');
});

test('toggles seats without mutating the current selection', () => {
  const initialSeats = [...TICKET_BOOKING_INITIAL_SEATS];
  const withoutFirstSeat = toggleTicketBookingSeat(initialSeats, initialSeats[0]);
  const withAnotherSeat = toggleTicketBookingSeat(withoutFirstSeat, 'B-14');

  assert.deepEqual(initialSeats, ['A-12', 'A-13']);
  assert.deepEqual(withoutFirstSeat, ['A-13']);
  assert.deepEqual(withAnotherSeat, ['A-13', 'B-14']);
  assert.equal(validateTicketBookingSeats([]), 'seat-required');
});

test('validates phone and OTP with stable semantic errors', () => {
  const expectedOtp = '4920';
  assert.equal(validateTicketBookingPhone(' '), 'phone-required');
  assert.equal(validateTicketBookingOtp('', expectedOtp, expectedOtp), 'phone-required');
  assert.equal(validateTicketBookingOtp('0988123456', '4920', null), 'otp-not-sent');
  assert.equal(validateTicketBookingOtp('0988123456', '', expectedOtp), 'otp-required');
  assert.equal(validateTicketBookingOtp('0988123456', '1111', expectedOtp), 'otp-incorrect');
  assert.equal(validateTicketBookingOtp('0988123456', expectedOtp, expectedOtp), null);
  assert.equal(generateTicketBookingOtp(() => 0), '0000');
  assert.equal(generateTicketBookingOtp(() => 0.492), '4920');
});

test('resets ticket booking progress with a new reset key', () => {
  const reset = resetTicketBookingProgress(createTicketBookingProgress(2));

  assert.equal(reset.resetKey, 3);
  assert.deepEqual(reset.completedSteps, [false, false, false, false]);
});
