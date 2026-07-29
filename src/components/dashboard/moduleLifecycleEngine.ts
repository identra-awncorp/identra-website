/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type {
  FlowField,
  FlowProjectV2,
  FlowRelease,
  ModuleContract,
  ModulePackage,
  ModuleRef,
  ModuleVersion,
  SubflowPackage,
} from './dashboardV2Types';

export type ModuleUsageKind = 'project' | 'release' | 'subflow';

export type ModuleUsage = {
  readonly kind: ModuleUsageKind;
  readonly ownerId: string;
  readonly ownerVersion?: string;
  readonly nodeId: string;
  readonly ref: ModuleRef;
};

export type ModuleUsageTarget = {
  readonly packageId: string;
  readonly version?: string;
};

export type ModuleUsageContext = {
  readonly projects?: readonly FlowProjectV2[];
  readonly releases?: readonly FlowRelease[];
  readonly subflows?: readonly SubflowPackage[];
};

const matchesTarget = (
  ref: ModuleRef,
  target: ModuleUsageTarget,
): boolean => ref.packageId === target.packageId
  && (target.version === undefined || ref.version === target.version);

export const findModuleUsages = (
  target: ModuleUsageTarget,
  context: ModuleUsageContext,
): readonly ModuleUsage[] => {
  const usages: ModuleUsage[] = [];

  for (const project of context.projects ?? []) {
    for (const node of project.flow.nodes) {
      if (node.kind === 'verification' && matchesTarget(node.moduleRef, target)) {
        usages.push({
          kind: 'project',
          ownerId: project.id,
          nodeId: node.id,
          ref: node.moduleRef,
        });
      }
    }
  }

  for (const release of context.releases ?? []) {
    for (const node of release.snapshot.content.flow.nodes) {
      if (node.kind === 'verification' && matchesTarget(node.moduleRef, target)) {
        usages.push({
          kind: 'release',
          ownerId: release.id,
          ownerVersion: release.version,
          nodeId: node.id,
          ref: node.moduleRef,
        });
      }
    }
  }

  for (const subflowPackage of context.subflows ?? []) {
    for (const version of subflowPackage.versions) {
      for (const node of version.flow.nodes) {
        if (node.kind === 'verification' && matchesTarget(node.moduleRef, target)) {
          usages.push({
            kind: 'subflow',
            ownerId: subflowPackage.id,
            ownerVersion: version.version,
            nodeId: node.id,
            ref: node.moduleRef,
          });
        }
      }
    }
  }

  return usages;
};

export type ModuleLifecycleFailureReason =
  | 'duplicateVersion'
  | 'packageMismatch'
  | 'versionMismatch'
  | 'originMismatch'
  | 'newVersionNotActive'
  | 'versionNotFound'
  | 'lastActiveVersion'
  | 'activeVersion'
  | 'versionNotDeprecated'
  | 'lastVersion'
  | 'inUse';

export type ModuleLifecycleResult<T> =
  | {
      readonly ok: true;
      readonly value: T;
    }
  | {
      readonly ok: false;
      readonly reason: ModuleLifecycleFailureReason;
      readonly usages?: readonly ModuleUsage[];
    };

export const addImmutableModuleVersion = (
  modulePackage: ModulePackage,
  version: ModuleVersion,
): ModuleLifecycleResult<ModulePackage> => {
  if (version.contract.ref.packageId !== modulePackage.id) {
    return { ok: false, reason: 'packageMismatch' };
  }
  if (version.contract.ref.version !== version.version) {
    return { ok: false, reason: 'versionMismatch' };
  }
  if (
    version.contract.origin !== modulePackage.origin
    || (version.definition && modulePackage.origin !== 'custom')
  ) {
    return { ok: false, reason: 'originMismatch' };
  }
  if (version.status !== 'active') {
    return { ok: false, reason: 'newVersionNotActive' };
  }
  if (modulePackage.versions.some((item) => item.version === version.version)) {
    return { ok: false, reason: 'duplicateVersion' };
  }

  const immutableVersion = structuredClone(version);
  return {
    ok: true,
    value: {
      ...modulePackage,
      activeVersion: immutableVersion.version,
      versions: [...modulePackage.versions, immutableVersion],
    },
  };
};

export const deprecateModuleVersion = (
  modulePackage: ModulePackage,
  version: string,
): ModuleLifecycleResult<ModulePackage> => {
  const target = modulePackage.versions.find((item) => item.version === version);
  if (!target) return { ok: false, reason: 'versionNotFound' };
  if (target.status === 'deprecated') {
    return { ok: true, value: structuredClone(modulePackage) };
  }

  const remainingActive = modulePackage.versions.filter(
    (item) => item.version !== version && item.status === 'active',
  );
  if (remainingActive.length === 0) {
    return { ok: false, reason: 'lastActiveVersion' };
  }

  return {
    ok: true,
    value: {
      ...modulePackage,
      activeVersion: modulePackage.activeVersion === version
        ? remainingActive[remainingActive.length - 1]!.version
        : modulePackage.activeVersion,
      versions: modulePackage.versions.map((item) => (
        item.version === version
          ? { ...item, status: 'deprecated' }
          : item
      )),
    },
  };
};

export const canDeleteModuleVersion = (
  modulePackage: ModulePackage,
  version: string,
  context: ModuleUsageContext,
): ModuleLifecycleResult<true> => {
  const target = modulePackage.versions.find((item) => item.version === version);
  if (!target) return { ok: false, reason: 'versionNotFound' };
  if (modulePackage.versions.length === 1) {
    return { ok: false, reason: 'lastVersion' };
  }
  if (modulePackage.activeVersion === version) {
    return { ok: false, reason: 'activeVersion' };
  }
  if (target.status !== 'deprecated') {
    return { ok: false, reason: 'versionNotDeprecated' };
  }
  const usages = findModuleUsages({ packageId: modulePackage.id, version }, context);
  if (usages.length > 0) {
    return { ok: false, reason: 'inUse', usages };
  }
  return { ok: true, value: true };
};

export const deleteModuleVersion = (
  modulePackage: ModulePackage,
  version: string,
  context: ModuleUsageContext,
): ModuleLifecycleResult<ModulePackage> => {
  const guard = canDeleteModuleVersion(modulePackage, version, context);
  if (!guard.ok) return guard;
  return {
    ok: true,
    value: {
      ...modulePackage,
      versions: modulePackage.versions.filter((item) => item.version !== version),
    },
  };
};

export const canDeleteModulePackage = (
  modulePackage: ModulePackage,
  context: ModuleUsageContext,
): ModuleLifecycleResult<true> => {
  const usages = findModuleUsages({ packageId: modulePackage.id }, context);
  return usages.length > 0
    ? { ok: false, reason: 'inUse', usages }
    : { ok: true, value: true };
};

export type ModuleCompatibilityChangeKind =
  | 'inputRemoved'
  | 'inputAddedRequired'
  | 'inputAddedOptional'
  | 'inputContractChanged'
  | 'outputRemoved'
  | 'outputAdded'
  | 'outputContractChanged'
  | 'outcomeRemoved'
  | 'outcomeAdded'
  | 'interfaceStateRemoved'
  | 'interfaceStateAdded';

export type ModuleCompatibilityChange = {
  readonly kind: ModuleCompatibilityChangeKind;
  readonly breaking: boolean;
  readonly stableId: string;
};

export type ModuleCompatibilityDiff = {
  readonly compatible: boolean;
  readonly changes: readonly ModuleCompatibilityChange[];
  readonly breakingChanges: readonly ModuleCompatibilityChange[];
  readonly compatibleChanges: readonly ModuleCompatibilityChange[];
};

type FlattenedField = {
  readonly stableId: string;
  readonly field: FlowField;
};

const flattenFields = (
  fields: readonly FlowField[],
  parentId = '',
): readonly FlattenedField[] => fields.flatMap((field) => {
  const stableId = parentId ? `${parentId}.${field.id}` : field.id;
  return [
    { stableId, field },
    ...flattenFields(field.children ?? [], stableId),
  ];
});

const CLASSIFICATION_RANK: Readonly<Record<
  FlowField['classification'],
  number
>> = {
  publicMetadata: 0,
  internalMetadata: 1,
  pii: 2,
  credential: 3,
  sensitivePii: 4,
  biometric: 5,
  secret: 6,
};

const fieldContractChange = (
  before: FlowField,
  after: FlowField,
  direction: 'input' | 'output',
): boolean | null => {
  if (
    before.type !== after.type
    || before.format !== after.format
    || before.itemType !== after.itemType
  ) {
    return true;
  }
  if (before.classification !== after.classification) {
    return CLASSIFICATION_RANK[after.classification]
      > CLASSIFICATION_RANK[before.classification];
  }
  if (before.safeForResult !== after.safeForResult) {
    return before.safeForResult && !after.safeForResult;
  }
  if (before.required !== after.required) {
    return direction === 'input' ? after.required : !after.required;
  }
  return null;
};

const diffFields = (
  before: readonly FlowField[],
  after: readonly FlowField[],
  direction: 'input' | 'output',
): readonly ModuleCompatibilityChange[] => {
  const changes: ModuleCompatibilityChange[] = [];
  const flattenedBefore = flattenFields(before);
  const flattenedAfter = flattenFields(after);
  const beforeById = new Map(flattenedBefore.map(
    (entry) => [entry.stableId, entry.field],
  ));
  const afterById = new Map(flattenedAfter.map(
    (entry) => [entry.stableId, entry.field],
  ));

  for (const { field, stableId } of flattenedBefore) {
    const next = afterById.get(stableId);
    if (!next) {
      changes.push({
        kind: direction === 'input' ? 'inputRemoved' : 'outputRemoved',
        breaking: true,
        stableId,
      });
    } else {
      const breaking = fieldContractChange(field, next, direction);
      if (breaking === null) continue;
      changes.push({
        kind: direction === 'input'
          ? 'inputContractChanged'
          : 'outputContractChanged',
        breaking,
        stableId,
      });
    }
  }

  for (const { field, stableId } of flattenedAfter) {
    if (beforeById.has(stableId)) continue;
    if (direction === 'input') {
      changes.push({
        kind: field.required ? 'inputAddedRequired' : 'inputAddedOptional',
        breaking: field.required,
        stableId,
      });
    } else {
      changes.push({
        kind: 'outputAdded',
        breaking: false,
        stableId,
      });
    }
  }

  return changes;
};

const diffStableIds = (
  before: readonly string[],
  after: readonly string[],
  removedKind: ModuleCompatibilityChangeKind,
  addedKind: ModuleCompatibilityChangeKind,
): readonly ModuleCompatibilityChange[] => [
  ...before
    .filter((stableId) => !after.includes(stableId))
    .map((stableId): ModuleCompatibilityChange => ({
      kind: removedKind,
      breaking: true,
      stableId,
    })),
  ...after
    .filter((stableId) => !before.includes(stableId))
    .map((stableId): ModuleCompatibilityChange => ({
      kind: addedKind,
      breaking: false,
      stableId,
    })),
];

export const diffModuleCompatibility = (
  before: ModuleContract,
  after: ModuleContract,
): ModuleCompatibilityDiff => {
  const changes = [
    ...diffFields(before.inputFields, after.inputFields, 'input'),
    ...diffFields(before.outputFields, after.outputFields, 'output'),
    ...diffStableIds(
      before.outcomes.map((outcome) => outcome.id),
      after.outcomes.map((outcome) => outcome.id),
      'outcomeRemoved',
      'outcomeAdded',
    ),
    ...diffStableIds(
      before.uiCapabilities.supportedStates,
      after.uiCapabilities.supportedStates,
      'interfaceStateRemoved',
      'interfaceStateAdded',
    ),
  ];
  const breakingChanges = changes.filter((change) => change.breaking);
  const compatibleChanges = changes.filter((change) => !change.breaking);
  return {
    compatible: breakingChanges.length === 0,
    changes,
    breakingChanges,
    compatibleChanges,
  };
};
