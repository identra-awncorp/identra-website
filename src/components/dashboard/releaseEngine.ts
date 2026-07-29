/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { getBuiltInModuleContract } from './dashboardModuleRegistry';
import {
  MAX_DRAFT_REVISIONS_PER_PROJECT,
  MAX_SUBFLOW_SIMULATION_DEPTH,
  type DashboardEnvironment,
  type DependencyLock,
  type DraftRevision,
  type DraftRevisionReason,
  type FlowProjectV2,
  type FlowRelease,
  type IntegrationSettings,
  type JsonValue,
  type ModulePackage,
  type ModuleRef,
  type ProjectSnapshotV2,
  type ReleasePromotionStage,
  type SubflowPackage,
  type SubflowRef,
} from './dashboardV2Types';
import type {
  ScenarioRunResult,
  ScenarioRunStatus,
} from './scenarioEngine';

const snapshotProject = (project: FlowProjectV2): ProjectSnapshotV2 => ({
  projectId: project.id,
  name: project.name,
  description: project.description,
  content: structuredClone({
    flow: project.flow,
    interface: project.interface,
    scenarios: project.scenarios,
    integration: project.integration,
  }),
});

export type DraftRevisionOptions = {
  readonly id: string;
  readonly createdAt: string;
  readonly reason: DraftRevisionReason;
};

export const createDraftRevisionSnapshot = (
  project: FlowProjectV2,
  existing: readonly DraftRevision[],
  options: DraftRevisionOptions,
): DraftRevision => ({
  id: options.id,
  projectId: project.id,
  revision: Math.max(
    0,
    ...existing
      .filter((revision) => revision.projectId === project.id)
      .map((revision) => revision.revision),
  ) + 1,
  reason: options.reason,
  createdAt: options.createdAt,
  snapshot: snapshotProject(project),
});

export const appendBoundedDraftRevision = (
  revisions: readonly DraftRevision[],
  revision: DraftRevision,
  limit = MAX_DRAFT_REVISIONS_PER_PROJECT,
): readonly DraftRevision[] => {
  const safeLimit = Number.isFinite(limit) && limit > 0
    ? Math.max(1, Math.floor(limit))
    : MAX_DRAFT_REVISIONS_PER_PROJECT;
  const retainedForProject = [
    ...revisions.filter((item) => item.projectId === revision.projectId),
    structuredClone(revision),
  ]
    .sort((left, right) => left.revision - right.revision)
    .slice(-safeLimit);
  return [
    ...revisions.filter((item) => item.projectId !== revision.projectId),
    ...retainedForProject,
  ];
};

export type RollbackFailureReason =
  | 'revisionNotFound'
  | 'projectMismatch';

export type RollbackResult =
  | {
      readonly ok: true;
      readonly project: FlowProjectV2;
      readonly revision: DraftRevision;
      readonly revisions: readonly DraftRevision[];
    }
  | {
      readonly ok: false;
      readonly reason: RollbackFailureReason;
    };

export const rollbackProjectToRevision = (
  project: FlowProjectV2,
  targetRevisionId: string,
  revisions: readonly DraftRevision[],
  options: Omit<DraftRevisionOptions, 'reason'>,
): RollbackResult => {
  const target = revisions.find((revision) => revision.id === targetRevisionId);
  if (!target) return { ok: false, reason: 'revisionNotFound' };
  if (target.projectId !== project.id || target.snapshot.projectId !== project.id) {
    return { ok: false, reason: 'projectMismatch' };
  }

  const restored: FlowProjectV2 = {
    ...project,
    name: target.snapshot.name,
    description: target.snapshot.description,
    ...structuredClone(target.snapshot.content),
    updatedAt: options.createdAt,
  };
  const rollbackRevision = createDraftRevisionSnapshot(restored, revisions, {
    ...options,
    reason: 'rollback',
  });
  return {
    ok: true,
    project: restored,
    revision: rollbackRevision,
    revisions: appendBoundedDraftRevision(revisions, rollbackRevision),
  };
};

const dependencyLockFor = (project: FlowProjectV2): DependencyLock => {
  const modules = project.flow.nodes
    .filter((node) => node.kind === 'verification')
    .map((node) => node.moduleRef)
    .filter((ref, index, all) => all.findIndex(
      (candidate) => candidate.packageId === ref.packageId
        && candidate.version === ref.version,
    ) === index)
    .map((ref) => structuredClone(ref));
  const subflows = project.flow.nodes
    .filter((node) => node.kind === 'subflow')
    .map((node) => node.subflowRef)
    .filter((ref, index, all) => all.findIndex(
      (candidate) => candidate.packageId === ref.packageId
        && candidate.version === ref.version,
    ) === index)
    .map((ref) => structuredClone(ref));
  return { modules, subflows };
};

export type CreateReleaseOptions = {
  readonly id: string;
  readonly version: string;
  readonly createdAt: string;
};

export type CreateReleaseResult =
  | {
      readonly ok: true;
      readonly release: FlowRelease;
    }
  | {
      readonly ok: false;
      readonly reason: 'emptyVersion' | 'duplicateVersion';
    };

export const createImmutableRelease = (
  project: FlowProjectV2,
  existing: readonly FlowRelease[],
  options: CreateReleaseOptions,
): CreateReleaseResult => {
  const version = options.version.trim();
  if (version.length === 0) {
    return { ok: false, reason: 'emptyVersion' };
  }
  if (existing.some(
    (release) => release.projectId === project.id
      && release.version.trim() === version,
  )) {
    return { ok: false, reason: 'duplicateVersion' };
  }
  return {
    ok: true,
    release: {
      id: options.id,
      projectId: project.id,
      version,
      createdAt: options.createdAt,
      snapshot: snapshotProject(project),
      dependencyLock: dependencyLockFor(project),
      promotions: [],
    },
  };
};

export type DependencyValidationIssue = {
  readonly kind: 'module' | 'subflow';
  readonly packageId: string;
  readonly version: string;
};

export const validateReleaseDependencies = (
  release: FlowRelease,
  moduleCatalog: readonly ModulePackage[],
  subflowCatalog: readonly SubflowPackage[],
): readonly DependencyValidationIssue[] => {
  const issues: DependencyValidationIssue[] = [];
  const moduleKey = (ref: ModuleRef): string =>
    `${ref.packageId}@${ref.version}`;
  const subflowKey = (ref: SubflowRef): string =>
    `${ref.packageId}@${ref.version}`;
  const pushIssue = (
    kind: DependencyValidationIssue['kind'],
    ref: ModuleRef | SubflowRef,
  ): void => {
    if (issues.some((issue) =>
      issue.kind === kind
      && issue.packageId === ref.packageId
      && issue.version === ref.version)) {
      return;
    }
    issues.push({
      kind,
      packageId: ref.packageId,
      version: ref.version,
    });
  };
  const moduleAvailable = (ref: ModuleRef): boolean => {
    const builtIn = getBuiltInModuleContract(ref.packageId);
    if (builtIn) return builtIn.ref.version === ref.version;
    return Boolean(moduleCatalog
      .find((item) => item.id === ref.packageId)
      ?.versions.some((version) => version.version === ref.version));
  };
  const subflowVersion = (ref: SubflowRef) => subflowCatalog
    .find((item) => item.id === ref.packageId)
    ?.versions.find((version) => version.version === ref.version);

  const lockedModuleKeys = new Set(
    release.dependencyLock.modules.map(moduleKey),
  );
  const lockedSubflowKeys = new Set(
    release.dependencyLock.subflows.map(subflowKey),
  );
  const snapshotModuleRefs = release.snapshot.content.flow.nodes
    .filter((node) => node.kind === 'verification')
    .map((node) => node.moduleRef);
  const snapshotSubflowRefs = release.snapshot.content.flow.nodes
    .filter((node) => node.kind === 'subflow')
    .map((node) => node.subflowRef);

  for (const ref of [
    ...release.dependencyLock.modules,
    ...snapshotModuleRefs,
  ]) {
    if (!moduleAvailable(ref)) pushIssue('module', ref);
  }
  for (const ref of snapshotModuleRefs) {
    if (!lockedModuleKeys.has(moduleKey(ref))) pushIssue('module', ref);
  }
  for (const ref of snapshotSubflowRefs) {
    if (!lockedSubflowKeys.has(subflowKey(ref))) pushIssue('subflow', ref);
  }

  const visitSubflow = (
    ref: SubflowRef,
    path: readonly string[],
  ): void => {
    const key = subflowKey(ref);
    if (
      path.includes(key)
      || path.length + 1 > MAX_SUBFLOW_SIMULATION_DEPTH
    ) {
      pushIssue('subflow', ref);
      return;
    }
    const version = subflowVersion(ref);
    if (!version) {
      pushIssue('subflow', ref);
      return;
    }
    const nextPath = [...path, key];
    for (const node of version.flow.nodes) {
      if (node.kind === 'verification' && !moduleAvailable(node.moduleRef)) {
        pushIssue('module', node.moduleRef);
      }
      if (node.kind === 'subflow') {
        visitSubflow(node.subflowRef, nextPath);
      }
    }
  };

  const rootSubflows = [
    ...release.dependencyLock.subflows,
    ...snapshotSubflowRefs,
  ].filter((ref, index, all) => all.findIndex(
    (candidate) => subflowKey(candidate) === subflowKey(ref),
  ) === index);
  for (const ref of rootSubflows) visitSubflow(ref, []);
  return issues;
};

export type PromotionReadiness = {
  readonly validationErrorCount: number;
  readonly scenarioRuns?: readonly Pick<ScenarioRunResult, 'status'>[];
  readonly dependenciesValid: boolean;
};

export type PromotionFailureReason =
  | 'environmentStageMismatch'
  | 'invalidEnvironment'
  | 'alreadyPromoted'
  | 'previousStageRequired'
  | 'flowValidationFailed'
  | 'scenarioResultsRequired'
  | 'enabledScenarioFailed'
  | 'dependenciesInvalid';

export type PromotionResult =
  | {
      readonly ok: true;
      readonly release: FlowRelease;
    }
  | {
      readonly ok: false;
      readonly reason: PromotionFailureReason;
    };

const previousStageFor = (
  stage: ReleasePromotionStage,
): ReleasePromotionStage | null => {
  if (stage === 'staging') return 'test';
  if (stage === 'production') return 'staging';
  return null;
};

const successfulEnabledScenarios = (
  runs: readonly Pick<ScenarioRunResult, 'status'>[],
): boolean => runs.every((run) =>
  run.status === 'passed' || run.status === 'skipped');

export const promoteRelease = (
  release: FlowRelease,
  stage: ReleasePromotionStage,
  environment: DashboardEnvironment,
  readiness: PromotionReadiness,
  promotedAt: string,
): PromotionResult => {
  if (environment.stage !== stage) {
    return { ok: false, reason: 'environmentStageMismatch' };
  }
  if (validateDashboardEnvironment(environment).length > 0) {
    return { ok: false, reason: 'invalidEnvironment' };
  }
  if (release.promotions.some((promotion) => promotion.stage === stage)) {
    return { ok: false, reason: 'alreadyPromoted' };
  }
  const previousStage = previousStageFor(stage);
  if (
    previousStage
    && !release.promotions.some((promotion) => promotion.stage === previousStage)
  ) {
    return { ok: false, reason: 'previousStageRequired' };
  }
  if (stage === 'test' && readiness.validationErrorCount > 0) {
    return { ok: false, reason: 'flowValidationFailed' };
  }
  if (stage === 'staging') {
    if (!readiness.scenarioRuns) {
      return { ok: false, reason: 'scenarioResultsRequired' };
    }
    if (!successfulEnabledScenarios(readiness.scenarioRuns)) {
      return { ok: false, reason: 'enabledScenarioFailed' };
    }
  }
  if (stage === 'production' && !readiness.dependenciesValid) {
    return { ok: false, reason: 'dependenciesInvalid' };
  }

  return {
    ok: true,
    release: {
      ...release,
      promotions: [
        ...release.promotions,
        {
          stage,
          environmentId: environment.id,
          promotedAt,
        },
      ],
    },
  };
};

export type EnvironmentValidationIssueCode =
  | 'missingId'
  | 'invalidPublicConfig'
  | 'sensitivePublicConfigKey'
  | 'invalidSecretReference'
  | 'duplicateSecretReference';

export type EnvironmentValidationIssue = {
  readonly code: EnvironmentValidationIssueCode;
  readonly path?: string;
};

const SENSITIVE_PUBLIC_KEY_PATTERN =
  /(^|[-_.])(secret|password|passphrase|token|api[-_.]?key|private[-_.]?key|credential)($|[-_.])/i;
const SECRET_REFERENCE_PATTERN = /^[A-Z][A-Z0-9_]{2,127}$/;

const isJsonValue = (value: unknown): value is JsonValue => {
  if (
    value === null
    || typeof value === 'string'
    || typeof value === 'boolean'
  ) {
    return true;
  }
  if (typeof value === 'number') return Number.isFinite(value);
  if (Array.isArray(value)) return value.every(isJsonValue);
  if (typeof value !== 'object') return false;
  return Object.values(value).every(isJsonValue);
};

const inspectPublicConfig = (
  value: unknown,
  path: string,
  issues: EnvironmentValidationIssue[],
): void => {
  if (!isJsonValue(value)) {
    issues.push({ code: 'invalidPublicConfig', path });
    return;
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) return;
  for (const [key, child] of Object.entries(value)) {
    const childPath = path ? `${path}.${key}` : key;
    if (SENSITIVE_PUBLIC_KEY_PATTERN.test(key)) {
      issues.push({ code: 'sensitivePublicConfigKey', path: childPath });
    }
    inspectPublicConfig(child, childPath, issues);
  }
};

export const validateDashboardEnvironment = (
  environment: DashboardEnvironment,
): readonly EnvironmentValidationIssue[] => {
  const issues: EnvironmentValidationIssue[] = [];
  if (environment.id.trim().length === 0) {
    issues.push({ code: 'missingId' });
  }
  inspectPublicConfig(environment.publicConfig, '', issues);
  const seenReferences = new Set<string>();
  for (const reference of environment.secretReferenceNames) {
    if (!SECRET_REFERENCE_PATTERN.test(reference)) {
      issues.push({ code: 'invalidSecretReference', path: reference });
    }
    if (seenReferences.has(reference)) {
      issues.push({ code: 'duplicateSecretReference', path: reference });
    }
    seenReferences.add(reference);
  }
  return issues;
};

export type IntegrationValidationIssueCode =
  | 'invalidOrigin'
  | 'duplicateOrigin'
  | 'invalidRedirectUrl'
  | 'duplicateRedirectUrl'
  | 'redirectUrlRequired'
  | 'invalidSessionTimeout'
  | 'unsafeResultField'
  | 'duplicateResultField'
  | 'piiNotAllowed';

export type IntegrationValidationIssue = {
  readonly code: IntegrationValidationIssueCode;
  readonly value?: string;
};

const isLocalHostname = (hostname: string): boolean =>
  hostname === 'localhost'
  || hostname === '127.0.0.1'
  || hostname === '[::1]';

const isAllowedUrl = (value: string, originOnly: boolean): boolean => {
  if (value.includes('*')) return false;
  try {
    const url = new URL(value);
    const allowedProtocol = url.protocol === 'https:'
      || (url.protocol === 'http:' && isLocalHostname(url.hostname));
    if (!allowedProtocol || url.username || url.password) return false;
    return !originOnly || (
      url.pathname === '/'
      && url.search === ''
      && url.hash === ''
      && value.replace(/\/$/, '') === url.origin
    );
  } catch {
    return false;
  }
};

const duplicateStrings = (values: readonly string[]): readonly string[] =>
  values.filter((value, index) => values.indexOf(value) !== index)
    .filter((value, index, all) => all.indexOf(value) === index);

const normalizedUrl = (
  value: string,
  originOnly: boolean,
): string | null => {
  if (!isAllowedUrl(value, originOnly)) return null;
  const url = new URL(value);
  return originOnly ? url.origin : url.href;
};

export const validateIntegrationSettings = (
  integration: IntegrationSettings,
  safeResultFieldIds: ReadonlySet<string>,
): readonly IntegrationValidationIssue[] => {
  const issues: IntegrationValidationIssue[] = [];
  for (const origin of integration.allowedOrigins) {
    if (!isAllowedUrl(origin, true)) {
      issues.push({ code: 'invalidOrigin', value: origin });
    }
  }
  const normalizedOrigins = integration.allowedOrigins
    .map((origin) => normalizedUrl(origin, true))
    .filter((origin): origin is string => origin !== null);
  for (const origin of duplicateStrings(normalizedOrigins)) {
    issues.push({ code: 'duplicateOrigin', value: origin });
  }
  for (const redirectUrl of integration.redirectUrls) {
    if (!isAllowedUrl(redirectUrl, false)) {
      issues.push({ code: 'invalidRedirectUrl', value: redirectUrl });
    }
  }
  const normalizedRedirectUrls = integration.redirectUrls
    .map((redirectUrl) => normalizedUrl(redirectUrl, false))
    .filter((redirectUrl): redirectUrl is string => redirectUrl !== null);
  for (const redirectUrl of duplicateStrings(normalizedRedirectUrls)) {
    issues.push({ code: 'duplicateRedirectUrl', value: redirectUrl });
  }
  if (integration.mode === 'redirect' && integration.redirectUrls.length === 0) {
    issues.push({ code: 'redirectUrlRequired' });
  }
  if (
    !Number.isInteger(integration.sessionTimeoutMinutes)
    || integration.sessionTimeoutMinutes < 1
    || integration.sessionTimeoutMinutes > 1_440
  ) {
    issues.push({ code: 'invalidSessionTimeout' });
  }
  for (const fieldId of integration.resultFieldIds) {
    if (!safeResultFieldIds.has(fieldId)) {
      issues.push({ code: 'unsafeResultField', value: fieldId });
    }
  }
  for (const fieldId of duplicateStrings(integration.resultFieldIds)) {
    issues.push({ code: 'duplicateResultField', value: fieldId });
  }
  if ((integration as { readonly includePii?: unknown }).includePii !== false) {
    issues.push({ code: 'piiNotAllowed' });
  }
  return issues;
};

export type ScenarioPromotionStatus = ScenarioRunStatus;
