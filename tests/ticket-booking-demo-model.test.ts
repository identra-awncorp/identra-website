/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import {
  advanceTicketBookingProgress,
  createTicketBookingProgress,
  resetTicketBookingProgress,
  TICKET_BOOKING_INITIAL_SEATS,
  TICKET_BOOKING_OTP,
  toggleTicketBookingSeat,
  validateTicketBookingOtp,
  validateTicketBookingPhone,
  validateTicketBookingSeats,
} from '../src/components/demo/TicketBookingDemoModel';

test('advances booking from seat reservation through phone verification', () => {
  const seatTransition = advanceTicketBookingProgress(createTicketBookingProgress());
  assert.ok(seatTransition);
  assert.equal(seatTransition.completedStageId, 'seat-reservation');
  assert.equal(seatTransition.nextStageId, 'anti-bot-check');

  const antiBotTransition = advanceTicketBookingProgress(seatTransition.progress);
  assert.ok(antiBotTransition);
  const phoneTransition = advanceTicketBookingProgress(antiBotTransition.progress);
  assert.ok(phoneTransition);
  assert.equal(phoneTransition.completedStageId, 'phone-verification');
  assert.equal(phoneTransition.progress.status, 'complete');
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
  assert.equal(validateTicketBookingPhone(' '), 'phone-required');
  assert.equal(validateTicketBookingOtp('', TICKET_BOOKING_OTP), 'phone-required');
  assert.equal(validateTicketBookingOtp('0988123456', ''), 'otp-required');
  assert.equal(validateTicketBookingOtp('0988123456', '1111'), 'otp-incorrect');
  assert.equal(validateTicketBookingOtp('0988123456', TICKET_BOOKING_OTP), null);
});

test('resets ticket booking progress with a new reset key', () => {
  const reset = resetTicketBookingProgress(createTicketBookingProgress(2));

  assert.equal(reset.resetKey, 3);
  assert.deepEqual(reset.completedSteps, [false, false, false]);
});
