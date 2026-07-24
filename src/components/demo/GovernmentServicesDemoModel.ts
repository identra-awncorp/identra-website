/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const GOVERNMENT_SERVICES_STAGE_IDS = [
  'civil-registry',
  'residential-address',
  'digital-signature',
] as const;

export type GovernmentServicesStageId = typeof GOVERNMENT_SERVICES_STAGE_IDS[number];
export type GovernmentServicesRunStatus = 'active' | 'complete';
export type GovernmentServicesValidationError = 'signature-required';

export interface GovernmentServicesProgress {
  completedSteps: boolean[];
  currentStepIndex: number;
  resetKey: number;
  status: GovernmentServicesRunStatus;
}

export interface GovernmentServicesTransition {
  completedStageId: GovernmentServicesStageId;
  nextStageId: GovernmentServicesStageId | null;
  progress: GovernmentServicesProgress;
}

export const createGovernmentServicesProgress = (
  resetKey = 0,
): GovernmentServicesProgress => ({
  completedSteps: GOVERNMENT_SERVICES_STAGE_IDS.map(() => false),
  currentStepIndex: 0,
  resetKey,
  status: 'active',
});

export const advanceGovernmentServicesProgress = (
  progress: GovernmentServicesProgress,
): GovernmentServicesTransition | null => {
  if (progress.status === 'complete') return null;

  const completedStageId = GOVERNMENT_SERVICES_STAGE_IDS[progress.currentStepIndex];
  if (!completedStageId) return null;

  const completedSteps = [...progress.completedSteps];
  completedSteps[progress.currentStepIndex] = true;
  const nextStepIndex = progress.currentStepIndex + 1;
  const nextStageId = GOVERNMENT_SERVICES_STAGE_IDS[nextStepIndex] ?? null;

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

export const resetGovernmentServicesProgress = (
  progress: GovernmentServicesProgress,
): GovernmentServicesProgress => createGovernmentServicesProgress(progress.resetKey + 1);

export const validateGovernmentSignature = (
  signature: string,
): GovernmentServicesValidationError | null => (
  signature.trim() ? null : 'signature-required'
);

export const getGovernmentSignatureSeal = (signature: string): string => (
  signature.trim().toUpperCase()
);
