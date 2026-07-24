/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const TICKET_TRANSFER_STAGE_IDS = [
  'ownership-verification',
  'escrow-lock',
  'credential-swap',
] as const;

export type TicketTransferStageId = typeof TICKET_TRANSFER_STAGE_IDS[number];
export type TicketTransferRunStatus = 'active' | 'complete';

export interface TicketTransferProgress {
  completedSteps: boolean[];
  currentStepIndex: number;
  resetKey: number;
  status: TicketTransferRunStatus;
}

export interface TicketTransferTransition {
  completedStageId: TicketTransferStageId;
  nextStageId: TicketTransferStageId | null;
  progress: TicketTransferProgress;
}

export const createTicketTransferProgress = (
  resetKey = 0,
): TicketTransferProgress => ({
  completedSteps: TICKET_TRANSFER_STAGE_IDS.map(() => false),
  currentStepIndex: 0,
  resetKey,
  status: 'active',
});

export const advanceTicketTransferProgress = (
  progress: TicketTransferProgress,
): TicketTransferTransition | null => {
  if (progress.status === 'complete') return null;

  const completedStageId = TICKET_TRANSFER_STAGE_IDS[progress.currentStepIndex];
  if (!completedStageId) return null;

  const completedSteps = [...progress.completedSteps];
  completedSteps[progress.currentStepIndex] = true;
  const nextStepIndex = progress.currentStepIndex + 1;
  const nextStageId = TICKET_TRANSFER_STAGE_IDS[nextStepIndex] ?? null;

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

export const resetTicketTransferProgress = (
  progress: TicketTransferProgress,
): TicketTransferProgress => createTicketTransferProgress(progress.resetKey + 1);
