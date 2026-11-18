/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ApplyJobMode = 'manual' | 'identra';

export type ApplyJobStageId = 'identity' | 'credentials' | 'background';

// Only the two `identra*` details are real: they come from the verification the server ran on the
// presented diploma. Every other detail is an illustration of what an employer would also check.
export type ApplyJobVerificationDetailId =
  | 'identraNameFromDiploma'
  | 'identraDiplomaChecks'
  | 'manualIdentityRegistryLookup'
  | 'manualIdentityMatch'
  | 'manualWorkEligibilityCheck'
  | 'manualDegreeRegistryLookup'
  | 'manualGraduateRecordMatch'
  | 'manualCertificateUrlMatch'
  | 'manualNoCertificateCheck'
  | 'backgroundConsentCheck'
  | 'backgroundRecordCheck'
  | 'backgroundWatchlistCheck';

export type ApplyJobVerificationRunStatus = 'idle' | 'running' | 'complete';
export type ApplyJobVerificationOutcome = 'verified' | 'needs-review';
export type ApplyJobVerificationItemStatus = 'pending' | 'active' | 'done';

export interface ApplyJobVerificationStage {
  id: ApplyJobStageId;
  detailIds: ApplyJobVerificationDetailId[];
}

export interface ApplyJobVerificationStageSnapshot extends ApplyJobVerificationStage {
  status: ApplyJobVerificationItemStatus;
  detailStatuses: ApplyJobVerificationItemStatus[];
}

export interface ApplyJobVerificationSnapshot {
  activeDetailId: ApplyJobVerificationDetailId | null;
  completedDetailCount: number;
  progressPercent: number;
  stages: ApplyJobVerificationStageSnapshot[];
  totalDetailCount: number;
}

export type ApplyJobFieldId =
  | 'name'
  | 'identity'
  | 'email'
  | 'phone'
  | 'degree'
  | 'certificates'
  | 'experience'
  | 'github';

/** `diploma` = taken from a diploma the server verified; everything else is typed in by the candidate. */
export type ApplyJobFieldProvenance = 'self-declared' | 'diploma';

/** What the real verification returned, if the candidate used the Identra wallet. */
export interface ApplyJobDiplomaEvidence {
  ok: boolean;
}

export interface ApplyJobCertificateInput {
  title: string;
  url: string;
}

export interface ApplyJobApplicationInput {
  name: string;
  identityNumber: string;
  email: string;
  phone: string;
  degree: string;
  certificates: ApplyJobCertificateInput[];
  pendingCertificateTitle: string;
  pendingCertificateUrl: string;
  experience: string;
  githubUrl: string;
}

export type ApplyJobValidationError =
  | 'candidate-name'
  | 'email'
  | 'phone'
  | 'identity-number'
  | 'degree'
  | 'experience'
  | 'github-url'
  | 'certificate-incomplete'
  | 'certificate-url';

const BACKGROUND_DETAILS: ApplyJobVerificationDetailId[] = [
  'backgroundConsentCheck',
  'backgroundRecordCheck',
  'backgroundWatchlistCheck',
];

const REAL_DETAILS: ReadonlySet<ApplyJobVerificationDetailId> = new Set([
  'identraNameFromDiploma',
  'identraDiplomaChecks',
]);

/** True for the steps that only illustrate a check; the UI must label them as such. */
export const isIllustrativeDetail = (detailId: ApplyJobVerificationDetailId): boolean =>
  !REAL_DETAILS.has(detailId);

const getIdentraPlan = (certificateCount: number): ApplyJobVerificationStage[] => [
  {
    id: 'identity',
    detailIds: [
      'identraNameFromDiploma',
      'manualIdentityRegistryLookup',
      'manualWorkEligibilityCheck',
    ],
  },
  {
    id: 'credentials',
    detailIds: [
      'identraDiplomaChecks',
      certificateCount > 0 ? 'manualCertificateUrlMatch' : 'manualNoCertificateCheck',
    ],
  },
  {
    id: 'background',
    detailIds: BACKGROUND_DETAILS,
  },
];

const MANUAL_PLAN_WITH_CERTIFICATES: ApplyJobVerificationStage[] = [
  {
    id: 'identity',
    detailIds: [
      'manualIdentityRegistryLookup',
      'manualIdentityMatch',
      'manualWorkEligibilityCheck',
    ],
  },
  {
    id: 'credentials',
    detailIds: [
      'manualDegreeRegistryLookup',
      'manualGraduateRecordMatch',
      'manualCertificateUrlMatch',
    ],
  },
  {
    id: 'background',
    detailIds: BACKGROUND_DETAILS,
  },
];

export const getApplyJobVerificationPlan = (
  mode: ApplyJobMode,
  certificateCountOrPresence: number | boolean,
): ApplyJobVerificationStage[] => {
  const certificateCount = typeof certificateCountOrPresence === 'number'
    ? certificateCountOrPresence
    : certificateCountOrPresence ? 1 : 0;
  const hasCertificates = certificateCount > 0;

  if (mode === 'identra') return getIdentraPlan(certificateCount);
  if (hasCertificates) return MANUAL_PLAN_WITH_CERTIFICATES;

  return MANUAL_PLAN_WITH_CERTIFICATES.map((stage) => (
    stage.id === 'credentials'
      ? {
          ...stage,
          detailIds: [
            'manualDegreeRegistryLookup',
            'manualGraduateRecordMatch',
            'manualNoCertificateCheck',
          ],
        }
      : stage
  ));
};

export const getApplyJobVerificationSnapshot = (
  stages: ApplyJobVerificationStage[],
  completedDetailCount: number,
  runStatus: ApplyJobVerificationRunStatus,
): ApplyJobVerificationSnapshot => {
  const flattenedDetails = stages.flatMap((stage) => stage.detailIds);
  const totalDetailCount = flattenedDetails.length;
  const boundedCompletedCount = Math.max(0, Math.min(completedDetailCount, totalDetailCount));
  const isComplete = runStatus === 'complete' || boundedCompletedCount >= totalDetailCount;
  const activeDetailId = runStatus === 'running' && !isComplete
    ? flattenedDetails[boundedCompletedCount] ?? null
    : null;

  let stageStartIndex = 0;
  const stageSnapshots = stages.map<ApplyJobVerificationStageSnapshot>((stage) => {
    const stageEndIndex = stageStartIndex + stage.detailIds.length;
    const stageIsDone = isComplete || boundedCompletedCount >= stageEndIndex;
    const stageIsActive = runStatus === 'running'
      && boundedCompletedCount >= stageStartIndex
      && boundedCompletedCount < stageEndIndex;

    const detailStatuses = stage.detailIds.map<ApplyJobVerificationItemStatus>((_, detailIndex) => {
      const globalDetailIndex = stageStartIndex + detailIndex;
      if (isComplete || globalDetailIndex < boundedCompletedCount) return 'done';
      if (runStatus === 'running' && globalDetailIndex === boundedCompletedCount) return 'active';
      return 'pending';
    });

    const snapshot: ApplyJobVerificationStageSnapshot = {
      ...stage,
      status: stageIsDone ? 'done' : stageIsActive ? 'active' : 'pending',
      detailStatuses,
    };
    stageStartIndex = stageEndIndex;
    return snapshot;
  });

  return {
    activeDetailId,
    completedDetailCount: boundedCompletedCount,
    progressPercent: totalDetailCount === 0
      ? 0
      : isComplete
        ? 100
        : Math.round((boundedCompletedCount / totalDetailCount) * 100),
    stages: stageSnapshots,
    totalDetailCount,
  };
};

/** The outcome follows the server's answer, not the mode: Identra mode without a passed diploma is not verified. */
export const getApplyJobVerificationOutcome = (
  mode: ApplyJobMode,
  diploma: ApplyJobDiplomaEvidence | null,
): ApplyJobVerificationOutcome => (
  mode === 'identra' && diploma?.ok === true ? 'verified' : 'needs-review'
);

const DIPLOMA_FIELDS: ReadonlySet<ApplyJobFieldId> = new Set(['name', 'degree']);

export const getApplyJobFieldProvenance = (
  mode: ApplyJobMode,
  field: ApplyJobFieldId,
  diploma: ApplyJobDiplomaEvidence | null = null,
): ApplyJobFieldProvenance => (
  mode === 'identra' && diploma?.ok === true && DIPLOMA_FIELDS.has(field) ? 'diploma' : 'self-declared'
);

export const isVerifiedField = (
  mode: ApplyJobMode,
  field: ApplyJobFieldId,
  diploma: ApplyJobDiplomaEvidence | null,
): boolean => getApplyJobFieldProvenance(mode, field, diploma) === 'diploma';

const isValidWebUrl = (value: string): boolean => {
  try {
    const url = new URL(value.startsWith('http') ? value : `https://${value}`);
    return (url.protocol === 'http:' || url.protocol === 'https:') && Boolean(url.hostname);
  } catch {
    return false;
  }
};

// The identity number is typed in by the candidate in both modes: the diploma does not carry it.
export const validateApplyJobApplication = (
  input: ApplyJobApplicationInput,
): ApplyJobValidationError | null => {
  if (!input.name.trim()) return 'candidate-name';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) return 'email';

  const phoneDigits = input.phone.replace(/\D/g, '');
  if (phoneDigits.length < 9 || phoneDigits.length > 11) return 'phone';

  if (!/^\d{12}$/.test(input.identityNumber.trim())) {
    return 'identity-number';
  }

  if (!input.degree.trim()) return 'degree';
  const experienceYears = Number(input.experience.trim());
  if (
    !input.experience.trim()
    || !Number.isInteger(experienceYears)
    || experienceYears < 0
    || experienceYears > 60
  ) {
    return 'experience';
  }
  if (!input.githubUrl.trim() || !isValidWebUrl(input.githubUrl.trim())) return 'github-url';

  const hasPendingCertificateValue = Boolean(
    input.pendingCertificateTitle.trim() || input.pendingCertificateUrl.trim(),
  );
  if (hasPendingCertificateValue) {
    if (!input.pendingCertificateTitle.trim() || !input.pendingCertificateUrl.trim()) {
      return 'certificate-incomplete';
    }
    if (!isValidWebUrl(input.pendingCertificateUrl.trim())) return 'certificate-url';
  }

  if (input.certificates.some((certificate) => !isValidWebUrl(certificate.url.trim()))) {
    return 'certificate-url';
  }

  return null;
};
