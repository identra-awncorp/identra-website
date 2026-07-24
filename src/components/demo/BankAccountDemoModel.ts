/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type BankAccountType = 'checking' | 'savings' | 'business';
export type BankAccountOnboardingMethod = 'manual' | 'identra';

export type BankAccountVerificationStageId =
  | 'identity'
  | 'business-registration'
  | 'business-ownership';

export type BankAccountVerificationDetailId =
  | 'identraIdentityDidLookup'
  | 'identraIdentityDidResolution'
  | 'identraIdentityProofValidation'
  | 'manualIdentityRegistryLookup'
  | 'manualIdentityMatch'
  | 'identraBusinessCredentialFetch'
  | 'identraBusinessCredentialProofValidation'
  | 'identraBusinessCredentialValidation'
  | 'manualBusinessLicenseExtraction'
  | 'manualBusinessRegistryLookup'
  | 'manualBusinessLicenseValidation'
  | 'identraOwnershipIdentifierExtraction'
  | 'identraOwnershipCryptographicMatch'
  | 'identraOwnershipValidation'
  | 'manualOwnershipIdentifierMatch'
  | 'manualOwnershipValidation';

export type BankAccountVerificationRunStatus = 'idle' | 'running' | 'complete';
export type BankAccountVerificationItemStatus = 'pending' | 'active' | 'done';

export interface BankAccountVerificationStage {
  id: BankAccountVerificationStageId;
  detailIds: readonly BankAccountVerificationDetailId[];
}

export interface BankAccountVerificationPlan {
  accountType: BankAccountType;
  onboardingMethod: BankAccountOnboardingMethod;
  stages: readonly BankAccountVerificationStage[];
}

export interface BankAccountVerificationStageSnapshot extends BankAccountVerificationStage {
  status: BankAccountVerificationItemStatus;
  detailStatuses: readonly BankAccountVerificationItemStatus[];
}

export interface BankAccountVerificationSnapshot {
  accountType: BankAccountType;
  onboardingMethod: BankAccountOnboardingMethod;
  activeDetailId: BankAccountVerificationDetailId | null;
  completedDetailCount: number;
  progressPercent: number;
  stages: readonly BankAccountVerificationStageSnapshot[];
  totalDetailCount: number;
}

export type BankAccountFieldId =
  | 'name'
  | 'identity'
  | 'email'
  | 'phone'
  | 'address'
  | 'business-name'
  | 'business-registration-number'
  | 'business-owner-identity'
  | 'business-license';

export type BankAccountFieldProvenance =
  | 'self-declared'
  | 'identity-vc'
  | 'contact-vc'
  | 'address-vc'
  | 'business-registration-vc'
  | 'uploaded-document'
  | 'not-required';

export interface BankAccountApplicationInput {
  name: string;
  identityNumber: string;
  email: string;
  phone: string;
  address: string;
  businessLegalName: string;
  businessRegistrationNumber: string;
  businessOwnerIdentityNumber: string;
  businessLicenseFileName: string;
  isCryptographicallySecured: boolean;
}

export type BankAccountValidationError =
  | 'identra-scan-required'
  | 'full-name'
  | 'identity-number'
  | 'physical-address'
  | 'business-legal-name'
  | 'business-registration-number'
  | 'business-owner-identity-number'
  | 'business-ownership-mismatch'
  | 'business-license';

export type BankAccountResetScope = 'none' | 'business-fields' | 'all-fields';
export type BankAccountAmlOutcome = 'passed' | 'failed';

const IDENTRA_STAGES: readonly BankAccountVerificationStage[] = [
  {
    id: 'identity',
    detailIds: [
      'identraIdentityDidLookup',
      'identraIdentityDidResolution',
      'identraIdentityProofValidation',
    ],
  },
  {
    id: 'business-registration',
    detailIds: [
      'identraBusinessCredentialFetch',
      'identraBusinessCredentialProofValidation',
      'identraBusinessCredentialValidation',
    ],
  },
  {
    id: 'business-ownership',
    detailIds: [
      'identraOwnershipIdentifierExtraction',
      'identraOwnershipCryptographicMatch',
      'identraOwnershipValidation',
    ],
  },
];

const MANUAL_STAGES: readonly BankAccountVerificationStage[] = [
  {
    id: 'identity',
    detailIds: [
      'manualIdentityRegistryLookup',
      'manualIdentityMatch',
    ],
  },
  {
    id: 'business-registration',
    detailIds: [
      'manualBusinessLicenseExtraction',
      'manualBusinessRegistryLookup',
      'manualBusinessLicenseValidation',
    ],
  },
  {
    id: 'business-ownership',
    detailIds: [
      'manualOwnershipIdentifierMatch',
      'manualOwnershipValidation',
    ],
  },
];

export const getBankAccountVerificationPlan = (
  accountType: BankAccountType,
  onboardingMethod: BankAccountOnboardingMethod,
): BankAccountVerificationPlan => {
  const stages = onboardingMethod === 'identra' ? IDENTRA_STAGES : MANUAL_STAGES;

  return {
    accountType,
    onboardingMethod,
    stages: accountType === 'business' ? stages : stages.slice(0, 1),
  };
};

export const getBankAccountVerificationSnapshot = (
  plan: BankAccountVerificationPlan,
  completedDetailCount: number,
  runStatus: BankAccountVerificationRunStatus,
): BankAccountVerificationSnapshot => {
  const flattenedDetails = plan.stages.flatMap((stage) => stage.detailIds);
  const totalDetailCount = flattenedDetails.length;
  const boundedCompletedCount = Math.max(0, Math.min(completedDetailCount, totalDetailCount));
  const isComplete = runStatus === 'complete' || boundedCompletedCount >= totalDetailCount;
  const activeDetailId = runStatus === 'running' && !isComplete
    ? flattenedDetails[boundedCompletedCount] ?? null
    : null;

  let stageStartIndex = 0;
  const stageSnapshots = plan.stages.map<BankAccountVerificationStageSnapshot>((stage) => {
    const stageEndIndex = stageStartIndex + stage.detailIds.length;
    const stageIsDone = isComplete || boundedCompletedCount >= stageEndIndex;
    const stageIsActive = runStatus === 'running'
      && boundedCompletedCount >= stageStartIndex
      && boundedCompletedCount < stageEndIndex;
    const detailStatuses = stage.detailIds.map<BankAccountVerificationItemStatus>(
      (_, detailIndex) => {
        const globalDetailIndex = stageStartIndex + detailIndex;
        if (isComplete || globalDetailIndex < boundedCompletedCount) return 'done';
        if (runStatus === 'running' && globalDetailIndex === boundedCompletedCount) {
          return 'active';
        }
        return 'pending';
      },
    );

    const snapshot: BankAccountVerificationStageSnapshot = {
      ...stage,
      status: stageIsDone ? 'done' : stageIsActive ? 'active' : 'pending',
      detailStatuses,
    };
    stageStartIndex = stageEndIndex;
    return snapshot;
  });

  return {
    accountType: plan.accountType,
    onboardingMethod: plan.onboardingMethod,
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

export const getBankAccountFieldProvenance = (
  onboardingMethod: BankAccountOnboardingMethod,
  field: BankAccountFieldId,
): BankAccountFieldProvenance => {
  if (onboardingMethod === 'manual') {
    return field === 'business-license' ? 'uploaded-document' : 'self-declared';
  }

  const identraProvenance: Record<BankAccountFieldId, BankAccountFieldProvenance> = {
    name: 'identity-vc',
    identity: 'identity-vc',
    email: 'contact-vc',
    phone: 'contact-vc',
    address: 'address-vc',
    'business-name': 'business-registration-vc',
    'business-registration-number': 'business-registration-vc',
    'business-owner-identity': 'business-registration-vc',
    'business-license': 'not-required',
  };

  return identraProvenance[field];
};

export const isBankAccountBusinessOwnershipMatched = (
  accountType: BankAccountType,
  identityNumber: string,
  businessRegistrationNumber: string,
  businessOwnerIdentityNumber: string,
): boolean => Boolean(
  accountType === 'business'
  && businessRegistrationNumber.trim()
  && businessOwnerIdentityNumber.trim()
  && identityNumber.trim()
  && businessOwnerIdentityNumber.trim() === identityNumber.trim(),
);

export const validateBankAccountApplication = (
  input: BankAccountApplicationInput,
  accountType: BankAccountType,
  onboardingMethod: BankAccountOnboardingMethod,
): BankAccountValidationError | null => {
  if (onboardingMethod === 'identra' && !input.isCryptographicallySecured) {
    return 'identra-scan-required';
  }
  if (!input.name.trim()) return 'full-name';
  if (!input.identityNumber.trim()) return 'identity-number';
  if (!input.address.trim()) return 'physical-address';

  if (accountType !== 'business') return null;
  if (!input.businessLegalName.trim()) return 'business-legal-name';
  if (!input.businessRegistrationNumber.trim()) return 'business-registration-number';
  if (!input.businessOwnerIdentityNumber.trim()) return 'business-owner-identity-number';
  if (!isBankAccountBusinessOwnershipMatched(
    accountType,
    input.identityNumber,
    input.businessRegistrationNumber,
    input.businessOwnerIdentityNumber,
  )) {
    return 'business-ownership-mismatch';
  }

  const licenseProvenance = getBankAccountFieldProvenance(
    onboardingMethod,
    'business-license',
  );
  if (licenseProvenance === 'uploaded-document' && !input.businessLicenseFileName) {
    return 'business-license';
  }

  return null;
};

export const getBankAccountTypeChangeResetScope = (
  currentAccountType: BankAccountType,
  nextAccountType: BankAccountType,
  onboardingMethod: BankAccountOnboardingMethod,
): BankAccountResetScope => {
  if (currentAccountType === nextAccountType) return 'none';
  if (onboardingMethod === 'identra') return 'all-fields';
  return nextAccountType === 'business' ? 'none' : 'business-fields';
};

export const getBankAccountOnboardingMethodChangeResetScope = (
  currentMethod: BankAccountOnboardingMethod,
  nextMethod: BankAccountOnboardingMethod,
): BankAccountResetScope => (
  currentMethod === nextMethod ? 'none' : 'all-fields'
);

export const getBankAccountAmlOutcome = (phone: string): BankAccountAmlOutcome => (
  phone.replace(/\D/g, '') === '0968268030' ? 'failed' : 'passed'
);
