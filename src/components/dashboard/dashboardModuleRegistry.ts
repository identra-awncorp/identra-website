/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type {
  DataClassification,
  FlowField,
  InterfaceVariantState,
  ModuleCategory,
  ModuleContract,
  ModuleUiCapabilities,
  OutcomeId,
} from './dashboardV2Types';

export const BUILT_IN_MODULE_IDS = [
  'citizen-id',
  'driver-license',
  'health-insurance',
  'phone-verification',
  'nfc-scan',
  'education-issuer',
  'education-trust-framework',
  'face-liveness',
  'face-data-match',
  'database-cross-check',
] as const;

export type BuiltInModuleId = typeof BUILT_IN_MODULE_IDS[number];

export const DATABASE_SOURCE_IDS = [
  'domestic-blacklist',
  'domestic-wanted-list',
  'domestic-bad-debt',
  'international-blacklist',
  'international-enforcement',
] as const;

export type DatabaseSourceId = typeof DATABASE_SOURCE_IDS[number];
export type DatabaseScope = 'domestic' | 'international';
export type DatabaseCategory = 'blacklist' | 'wanted' | 'badDebt' | 'enforcement';

export type DatabaseSourceDefinition = {
  readonly id: DatabaseSourceId;
  readonly scope: DatabaseScope;
  readonly category: DatabaseCategory;
  readonly jurisdiction: string;
  readonly providerKey: string;
  readonly supportedFields: readonly string[];
  readonly matchingRule: 'exact' | 'weighted' | 'hybrid';
  readonly estimatedDurationMs: number;
};

const field = (
  id: string,
  type: FlowField['type'],
  required: boolean,
  classification: DataClassification,
  safeForResult = classification === 'publicMetadata' || classification === 'internalMetadata',
): FlowField => ({
  id,
  key: id,
  type,
  format: 'none',
  required,
  classification,
  safeForResult,
});

const genericStates = [
  'intro',
  'processing',
  'success',
  'error',
  'retry',
] as const satisfies readonly InterfaceVariantState[];

const capabilities = (
  supportedStates: readonly InterfaceVariantState[],
): ModuleUiCapabilities => ({
  supportedStates,
  supportsConsent: supportedStates.includes('permission'),
  supportsCredentialRequest: supportedStates.includes('input'),
  supportsFieldSummary: true,
  supportsDevicePermission: supportedStates.includes('permission'),
  supportsCapture: supportedStates.includes('capture'),
});

const outcomeContracts = (outcomes: readonly OutcomeId[]) =>
  outcomes.map((id) => ({ id, terminal: false }));

const define = (
  id: BuiltInModuleId,
  category: ModuleCategory,
  inputFields: readonly FlowField[],
  outputFields: readonly FlowField[],
  supportedStates: readonly InterfaceVariantState[] = genericStates,
  estimatedDurationMs = 8_000,
  outcomes: readonly OutcomeId[] = ['success', 'failure'],
  evidenceGroup: ModuleContract['evidenceGroup'] = 'other',
): ModuleContract => ({
  ref: { packageId: id, version: '1' },
  origin: 'builtIn',
  category,
  inputFields,
  outputFields,
  outcomes: outcomeContracts(outcomes),
  uiCapabilities: capabilities(supportedStates),
  evidenceGroup,
  estimatedDurationMs,
});

export const BUILT_IN_MODULES: Readonly<Record<BuiltInModuleId, ModuleContract>> = {
  'citizen-id': define(
    'citizen-id',
    'identity',
    [field('credential', 'object', true, 'credential')],
    [
      field('verified', 'boolean', true, 'publicMetadata'),
      field('fullName', 'string', true, 'pii'),
      field('identityNumber', 'string', true, 'sensitivePii'),
      field('dateOfBirth', 'string', false, 'pii'),
    ],
    ['intro', 'input', 'processing', 'success', 'error', 'retry'],
    12_000,
    ['success', 'failure'],
    'identity',
  ),
  'driver-license': define(
    'driver-license',
    'identity',
    [field('credential', 'object', true, 'credential')],
    [
      field('verified', 'boolean', true, 'publicMetadata'),
      field('licenseNumber', 'string', true, 'sensitivePii'),
      field('fullName', 'string', true, 'pii'),
      field('expiryDate', 'string', false, 'pii'),
    ],
    ['intro', 'input', 'processing', 'success', 'error', 'retry'],
    10_000,
    ['success', 'failure'],
    'identity',
  ),
  'health-insurance': define(
    'health-insurance',
    'identity',
    [field('credential', 'object', true, 'credential')],
    [
      field('verified', 'boolean', true, 'publicMetadata'),
      field('memberNumber', 'string', true, 'sensitivePii'),
      field('coverageActive', 'boolean', true, 'internalMetadata'),
    ],
    ['intro', 'permission', 'input', 'processing', 'success', 'error', 'retry'],
    10_000,
    ['success', 'failure'],
    'identity',
  ),
  'phone-verification': define(
    'phone-verification',
    'identity',
    [field('phoneNumber', 'string', true, 'sensitivePii')],
    [
      field('verified', 'boolean', true, 'publicMetadata'),
      field('normalizedPhoneNumber', 'string', true, 'sensitivePii'),
    ],
    ['intro', 'input', 'processing', 'success', 'error', 'retry'],
    18_000,
    ['success', 'failure'],
    'contact',
  ),
  'nfc-scan': define(
    'nfc-scan',
    'device',
    [],
    [
      field('verified', 'boolean', true, 'publicMetadata'),
      field('documentData', 'object', true, 'sensitivePii'),
    ],
    ['intro', 'permission', 'capture', 'processing', 'success', 'error', 'retry'],
    20_000,
    ['success', 'failure'],
    'identity',
  ),
  'education-issuer': define(
    'education-issuer',
    'education',
    [field('credential', 'object', true, 'credential')],
    [
      field('verified', 'boolean', true, 'publicMetadata'),
      field('issuerDid', 'string', true, 'publicMetadata'),
      field('qualification', 'string', true, 'pii'),
    ],
    ['intro', 'input', 'processing', 'success', 'error', 'retry'],
    8_000,
    ['success', 'failure'],
    'education',
  ),
  'education-trust-framework': define(
    'education-trust-framework',
    'education',
    [field('credential', 'object', true, 'credential')],
    [
      field('verified', 'boolean', true, 'publicMetadata'),
      field('frameworkId', 'string', true, 'publicMetadata'),
      field('issuerDid', 'string', true, 'publicMetadata'),
    ],
    ['intro', 'input', 'processing', 'success', 'error', 'retry'],
    9_000,
    ['success', 'failure'],
    'education',
  ),
  'face-liveness': define(
    'face-liveness',
    'biometric',
    [],
    [
      field('isLive', 'boolean', true, 'publicMetadata'),
      field('faceReference', 'string', true, 'biometric'),
    ],
    ['intro', 'permission', 'capture', 'processing', 'success', 'error', 'retry'],
    15_000,
    ['success', 'failure'],
    'biometric',
  ),
  'face-data-match': define(
    'face-data-match',
    'biometric',
    [
      field('faceReference', 'string', true, 'biometric'),
      field('identityData', 'object', true, 'sensitivePii'),
    ],
    [
      field('verified', 'boolean', true, 'publicMetadata'),
      field('matchScore', 'number', true, 'internalMetadata'),
    ],
    ['intro', 'processing', 'success', 'error', 'retry'],
    7_000,
    ['success', 'failure'],
    'biometric',
  ),
  'database-cross-check': define(
    'database-cross-check',
    'database',
    [
      field('fullName', 'string', true, 'pii'),
      field('identityNumber', 'string', false, 'sensitivePii'),
      field('dateOfBirth', 'string', false, 'pii'),
      field('nationality', 'string', false, 'pii'),
      field('faceReference', 'string', false, 'biometric'),
    ],
    [
      field('outcome', 'string', true, 'publicMetadata'),
      field('matchedSourceCount', 'number', true, 'internalMetadata'),
      field('checkedSourceCount', 'number', true, 'internalMetadata'),
    ],
    ['intro', 'processing', 'matched', 'notMatched', 'inconclusive', 'sourceUnavailable', 'retry'],
    14_000,
    ['matched', 'notMatched', 'inconclusive', 'sourceUnavailable'],
    'risk',
  ),
};

export const DATABASE_SOURCES: readonly DatabaseSourceDefinition[] = [
  {
    id: 'domestic-blacklist',
    scope: 'domestic',
    category: 'blacklist',
    jurisdiction: 'VN',
    providerKey: 'domesticRiskNetwork',
    supportedFields: ['fullName', 'identityNumber', 'dateOfBirth'],
    matchingRule: 'hybrid',
    estimatedDurationMs: 3_000,
  },
  {
    id: 'domestic-wanted-list',
    scope: 'domestic',
    category: 'wanted',
    jurisdiction: 'VN',
    providerKey: 'domesticPublicSafety',
    supportedFields: ['fullName', 'identityNumber', 'dateOfBirth', 'faceReference'],
    matchingRule: 'weighted',
    estimatedDurationMs: 5_000,
  },
  {
    id: 'domestic-bad-debt',
    scope: 'domestic',
    category: 'badDebt',
    jurisdiction: 'VN',
    providerKey: 'domesticCreditNetwork',
    supportedFields: ['fullName', 'identityNumber', 'dateOfBirth'],
    matchingRule: 'exact',
    estimatedDurationMs: 4_000,
  },
  {
    id: 'international-blacklist',
    scope: 'international',
    category: 'blacklist',
    jurisdiction: 'GLOBAL',
    providerKey: 'globalRiskNetwork',
    supportedFields: ['fullName', 'dateOfBirth', 'nationality', 'documentNumber'],
    matchingRule: 'weighted',
    estimatedDurationMs: 8_000,
  },
  {
    id: 'international-enforcement',
    scope: 'international',
    category: 'enforcement',
    jurisdiction: 'GLOBAL',
    providerKey: 'globalEnforcementNetwork',
    supportedFields: ['fullName', 'dateOfBirth', 'nationality', 'faceReference'],
    matchingRule: 'hybrid',
    estimatedDurationMs: 9_000,
  },
] as const;

export const isBuiltInModuleId = (value: string): value is BuiltInModuleId =>
  BUILT_IN_MODULE_IDS.includes(value as BuiltInModuleId);

export const getBuiltInModuleContract = (moduleId: string): ModuleContract | null =>
  isBuiltInModuleId(moduleId) ? BUILT_IN_MODULES[moduleId] : null;
