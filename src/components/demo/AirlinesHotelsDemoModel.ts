/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const AIRLINES_HOTELS_STAGE_IDS = [
  'passport-chip',
  'biometric-match',
  'reservation-sync',
] as const;

export type AirlinesHotelsStageId = typeof AIRLINES_HOTELS_STAGE_IDS[number];
export type AirlinesHotelsRunStatus = 'active' | 'complete';

export interface AirlinesHotelsProgress {
  completedSteps: boolean[];
  currentStepIndex: number;
  resetKey: number;
  status: AirlinesHotelsRunStatus;
}

export interface AirlinesHotelsTransition {
  completedStageId: AirlinesHotelsStageId;
  nextStageId: AirlinesHotelsStageId | null;
  progress: AirlinesHotelsProgress;
}

export const createAirlinesHotelsProgress = (
  resetKey = 0,
): AirlinesHotelsProgress => ({
  completedSteps: AIRLINES_HOTELS_STAGE_IDS.map(() => false),
  currentStepIndex: 0,
  resetKey,
  status: 'active',
});

export const advanceAirlinesHotelsProgress = (
  progress: AirlinesHotelsProgress,
): AirlinesHotelsTransition | null => {
  if (progress.status === 'complete') return null;

  const completedStageId = AIRLINES_HOTELS_STAGE_IDS[progress.currentStepIndex];
  if (!completedStageId) return null;

  const completedSteps = [...progress.completedSteps];
  completedSteps[progress.currentStepIndex] = true;
  const nextStepIndex = progress.currentStepIndex + 1;
  const nextStageId = AIRLINES_HOTELS_STAGE_IDS[nextStepIndex] ?? null;

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

export const resetAirlinesHotelsProgress = (
  progress: AirlinesHotelsProgress,
): AirlinesHotelsProgress => createAirlinesHotelsProgress(progress.resetKey + 1);
