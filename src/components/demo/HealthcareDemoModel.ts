/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const HEALTHCARE_STAGE_IDS = [
  'patient-identity',
  'insurance-coverage',
  'privacy-consent',
] as const;

export const HEALTHCARE_INITIAL_PATIENT_NAME = 'John Doe';
export const HEALTHCARE_INSURANCE_POLICY_ID = 'BCX-4921-98A';
export const HEALTHCARE_INSURANCE_GROUP_ID = 'GR-8491';

export type HealthcareStageId = typeof HEALTHCARE_STAGE_IDS[number];
export type HealthcareRunStatus = 'active' | 'complete';
export type HealthcareValidationError = 'patient-name-required' | 'consent-required';

export interface HealthcareProgress {
  completedSteps: boolean[];
  currentStepIndex: number;
  resetKey: number;
  status: HealthcareRunStatus;
}

export interface HealthcareTransition {
  completedStageId: HealthcareStageId;
  nextStageId: HealthcareStageId | null;
  progress: HealthcareProgress;
}

export const createHealthcareProgress = (resetKey = 0): HealthcareProgress => ({
  completedSteps: HEALTHCARE_STAGE_IDS.map(() => false),
  currentStepIndex: 0,
  resetKey,
  status: 'active',
});

export const advanceHealthcareProgress = (
  progress: HealthcareProgress,
): HealthcareTransition | null => {
  if (progress.status === 'complete') return null;

  const completedStageId = HEALTHCARE_STAGE_IDS[progress.currentStepIndex];
  if (!completedStageId) return null;

  const completedSteps = [...progress.completedSteps];
  completedSteps[progress.currentStepIndex] = true;
  const nextStepIndex = progress.currentStepIndex + 1;
  const nextStageId = HEALTHCARE_STAGE_IDS[nextStepIndex] ?? null;

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

export const resetHealthcareProgress = (
  progress: HealthcareProgress,
): HealthcareProgress => createHealthcareProgress(progress.resetKey + 1);

export const validateHealthcarePatientName = (
  patientName: string,
): HealthcareValidationError | null => (
  patientName.trim() ? null : 'patient-name-required'
);

export const validateHealthcareConsent = (
  hasConsent: boolean,
): HealthcareValidationError | null => (
  hasConsent ? null : 'consent-required'
);
