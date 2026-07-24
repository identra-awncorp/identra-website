/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ApplyJobMode = 'manual' | 'identra';

export type ApplyJobStageId = 'identity' | 'credentials' | 'background';

export type ApplyJobVerificationDetailId =
  | 'identraIdentityPresentation'
  | 'identraIdentityDidResolution'
  | 'identraIdentityProofValidation'
  | 'manualIdentityRegistryLookup'
  | 'manualIdentityMatch'
  | 'manualWorkEligibilityCheck'
  | 'identraCredentialPresentation'
  | 'identraCredentialIssuerDidResolution'
  | 'identraCredentialProofValidation'
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

export type ApplyJobFieldProvenance =
  | 'self-declared'
  | 'identity-vc'
  | 'contact-vc'
  | 'education-vc'
  | 'employment-vc'
  | 'work-eligibility-proof';

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

const IDENTRA_PLAN: ApplyJobVerificationStage[] = [
  {
    id: 'identity',
    detailIds: [
      'identraIdentityPresentation',
      'identraIdentityDidResolution',
      'identraIdentityProofValidation',
    ],
  },
  {
    id: 'credentials',
    detailIds: [
      'identraCredentialPresentation',
      'identraCredentialIssuerDidResolution',
      'identraCredentialProofValidation',
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
  hasCertificates: boolean,
): ApplyJobVerificationStage[] => {
  if (mode === 'identra') return IDENTRA_PLAN;
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

export const getApplyJobVerificationOutcome = (
  mode: ApplyJobMode,
): ApplyJobVerificationOutcome => (
  mode === 'identra' ? 'verified' : 'needs-review'
);

export const getApplyJobFieldProvenance = (
  mode: ApplyJobMode,
  field: ApplyJobFieldId,
): ApplyJobFieldProvenance => {
  if (mode === 'manual') return 'self-declared';

  const identraProvenance: Record<ApplyJobFieldId, ApplyJobFieldProvenance> = {
    name: 'identity-vc',
    identity: 'work-eligibility-proof',
    email: 'contact-vc',
    phone: 'contact-vc',
    degree: 'education-vc',
    certificates: 'education-vc',
    experience: 'employment-vc',
    github: 'self-declared',
  };

  return identraProvenance[field];
};

export const isCryptographicallyVerifiedField = (
  mode: ApplyJobMode,
  field: ApplyJobFieldId,
): boolean => getApplyJobFieldProvenance(mode, field) !== 'self-declared';

const isValidWebUrl = (value: string): boolean => {
  try {
    const url = new URL(value.startsWith('http') ? value : `https://${value}`);
    return (url.protocol === 'http:' || url.protocol === 'https:') && Boolean(url.hostname);
  } catch {
    return false;
  }
};

export const validateApplyJobApplication = (
  input: ApplyJobApplicationInput,
  mode: ApplyJobMode,
): ApplyJobValidationError | null => {
  if (!input.name.trim()) return 'candidate-name';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) return 'email';

  const phoneDigits = input.phone.replace(/\D/g, '');
  if (phoneDigits.length < 9 || phoneDigits.length > 11) return 'phone';

  if (mode === 'manual' && !/^\d{12}$/.test(input.identityNumber.trim())) {
    return 'identity-number';
  }

  if (!input.degree.trim()) return 'degree';
  if (!input.experience.trim()) return 'experience';
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
