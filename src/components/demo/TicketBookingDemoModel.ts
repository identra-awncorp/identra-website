/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const TICKET_BOOKING_STAGE_IDS = [
  'seat-reservation',
  'anti-bot-check',
  'phone-verification',
  'ticket-issuance',
] as const;

export const TICKET_BOOKING_INITIAL_SEATS = ['A-12', 'A-13'] as const;
export const TICKET_BOOKING_INITIAL_PHONE = '+1 (555) 234-5678';
export const TICKET_BOOKING_HUMAN_SCORE = 99.8;

export type TicketBookingStageId = typeof TICKET_BOOKING_STAGE_IDS[number];
export type TicketBookingRunStatus = 'active' | 'complete';
export type TicketBookingValidationError =
  | 'seat-required'
  | 'phone-required'
  | 'otp-not-sent'
  | 'otp-required'
  | 'otp-incorrect';

export const generateTicketBookingOtp = (
  random: () => number = Math.random,
): string => String(Math.floor(random() * 10_000)).padStart(4, '0');

export interface TicketBookingProgress {
  completedSteps: boolean[];
  currentStepIndex: number;
  resetKey: number;
  status: TicketBookingRunStatus;
}

export interface TicketBookingTransition {
  completedStageId: TicketBookingStageId;
  nextStageId: TicketBookingStageId | null;
  progress: TicketBookingProgress;
}

export const createTicketBookingProgress = (
  resetKey = 0,
): TicketBookingProgress => ({
  completedSteps: TICKET_BOOKING_STAGE_IDS.map(() => false),
  currentStepIndex: 0,
  resetKey,
  status: 'active',
});

export const advanceTicketBookingProgress = (
  progress: TicketBookingProgress,
): TicketBookingTransition | null => {
  if (progress.status === 'complete') return null;

  const completedStageId = TICKET_BOOKING_STAGE_IDS[progress.currentStepIndex];
  if (!completedStageId) return null;

  const completedSteps = [...progress.completedSteps];
  completedSteps[progress.currentStepIndex] = true;
  const nextStepIndex = progress.currentStepIndex + 1;
  const nextStageId = TICKET_BOOKING_STAGE_IDS[nextStepIndex] ?? null;

  return {
    completedStageId,
    nextStageId,
    progress: {
      ...progress,
      completedSteps,
      currentStepIndex: nextStageId === null ? progress.currentStepIndex : nextStepIndex,
      status: nextStageId === null ? 'complete' : 'active',
    },
  };
};

export const resetTicketBookingProgress = (
  progress: TicketBookingProgress,
): TicketBookingProgress => createTicketBookingProgress(progress.resetKey + 1);

export const toggleTicketBookingSeat = (
  selectedSeats: string[],
  seat: string,
): string[] => (
  selectedSeats.includes(seat)
    ? selectedSeats.filter((selectedSeat) => selectedSeat !== seat)
    : [...selectedSeats, seat]
);

export const validateTicketBookingSeats = (
  selectedSeats: string[],
): TicketBookingValidationError | null => (
  selectedSeats.length > 0 ? null : 'seat-required'
);

export const validateTicketBookingPhone = (
  phone: string,
): TicketBookingValidationError | null => (
  phone.trim() ? null : 'phone-required'
);

export const validateTicketBookingOtp = (
  phone: string,
  otp: string,
  expectedOtp: string | null,
): TicketBookingValidationError | null => {
  if (!phone.trim()) return 'phone-required';
  if (!expectedOtp) return 'otp-not-sent';
  if (!otp.trim()) return 'otp-required';
  if (otp !== expectedOtp) return 'otp-incorrect';
  return null;
};
