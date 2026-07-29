/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from 'react';
import {
  Activity,
  Boxes,
  Check,
  GitFork,
  History,
  Package,
  Plug,
  Rocket,
  Settings2,
  Trash2,
  X,
} from 'lucide-react';
import type { DashboardAdvancedCopy } from '../../translations/dashboard/DashboardAdvancedTranslations';
import type { DashboardCopy } from '../../translations/dashboard/DashboardPageTranslations';
import {
  createDashboardId,
  resolveModuleContract,
} from './dashboardV2Model';
import type {
  DashboardEnvironment,
  DashboardWorkspaceV2,
  FlowField,
  FlowProjectV2,
  FlowRelease,
  IntegrationSettings,
  JsonValue,
  ModuleContract,
  ModulePackage,
  ModuleVersion,
  ReleasePromotionStage,
  ResumePolicy,
} from './dashboardV2Types';
import { validateDynamicFlowV2 } from './dashboardValidation';
import { simulateDynamicFlowV2 } from './flowSimulationEngine';
import {
  addImmutableModuleVersion,
  canDeleteModulePackage,
  deleteModuleVersion,
  deprecateModuleVersion,
  diffModuleCompatibility,
  findModuleUsages,
} from './moduleLifecycleEngine';
import {
  appendBoundedDraftRevision,
  createDraftRevisionSnapshot,
  createImmutableRelease,
  promoteRelease,
  rollbackProjectToRevision,
  validateDashboardEnvironment,
  validateIntegrationSettings,
  validateReleaseDependencies,
} from './releaseEngine';
import {
  runScenarioBatch,
  type ScenarioRunSummary,
} from './scenarioEngine';
import {
  extractSubflowPackage,
  validateSubflowVersionDependencies,
} from './subflowEngine';
import { analyzeFlowProject } from './flowAnalysisEngine';
import { useDialogFocus } from './useDialogFocus';

type OperationsTab =
  | 'modules'
  | 'subflows'
  | 'revisions'
  | 'releases'
  | 'environments'
  | 'integration'
  | 'analysis';

type OperationErrorKey = keyof DashboardAdvancedCopy['operationErrors'];

type Notice =
  | {
      readonly kind: 'copy';
      readonly value: keyof DashboardAdvancedCopy['toasts'];
    }
  | {
      readonly kind: 'error';
      readonly value: OperationErrorKey;
      readonly details?: string;
    };

const moduleOperationError = (reason: string): OperationErrorKey => {
  switch (reason) {
    case 'versionNotFound':
      return 'moduleVersionMissing';
    case 'duplicateVersion':
      return 'moduleVersionConflict';
    case 'inUse':
      return 'moduleStillInUse';
    default:
      return 'moduleLifecycleBlocked';
  }
};

const releaseOperationError = (reason: string): OperationErrorKey => {
  switch (reason) {
    case 'emptyVersion':
    case 'duplicateVersion':
      return 'releaseVersionInvalid';
    case 'environmentStageMismatch':
    case 'invalidEnvironment':
      return 'environmentInvalid';
    case 'alreadyPromoted':
      return 'releaseAlreadyPromoted';
    case 'previousStageRequired':
      return 'releaseStagingRequired';
    case 'flowValidationFailed':
      return 'releaseValidationRequired';
    case 'scenarioResultsRequired':
    case 'enabledScenarioFailed':
      return 'releaseScenariosRequired';
    case 'dependenciesInvalid':
      return 'releaseDependenciesInvalid';
    default:
      return 'operationFailed';
  }
};

type PendingModuleDelete =
  | { readonly kind: 'package' }
  | { readonly kind: 'version'; readonly version: string };

type FlowOperationsDialogProps = {
  readonly copy: DashboardCopy;
  readonly advancedCopy: DashboardAdvancedCopy;
  readonly project: FlowProjectV2;
  readonly workspace: DashboardWorkspaceV2;
  readonly selectedNodeIds: readonly string[];
  readonly open: boolean;
  readonly onClose: () => void;
  readonly onProjectChange: (project: FlowProjectV2) => void;
  readonly onWorkspaceChange: (workspace: DashboardWorkspaceV2) => void;
  readonly onFocusNode?: (nodeId: string) => void;
};

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#354CE1] focus:ring-2 focus:ring-[#354CE1]/10';
const buttonClass =
  'inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1] disabled:cursor-not-allowed disabled:opacity-45';
const primaryButtonClass =
  'inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#354CE1] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#2739B8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45';

const isRecord = (value: unknown): value is Readonly<Record<string, unknown>> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);

const stringArray = (value: unknown): value is readonly string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string');

const FLOW_FIELD_TYPES = ['string', 'number', 'boolean', 'object', 'array'] as const;
const FIELD_FORMATS = [
  'none',
  'date',
  'dateTime',
  'countryCode',
  'did',
  'email',
  'phone',
  'uri',
] as const;
const CLASSIFICATIONS = [
  'publicMetadata',
  'internalMetadata',
  'pii',
  'credential',
  'sensitivePii',
  'biometric',
  'secret',
] as const;
const MODULE_CATEGORIES = [
  'identity',
  'credential',
  'device',
  'education',
  'biometric',
  'database',
  'custom',
] as const;
const EVIDENCE_GROUPS = [
  'identity',
  'contact',
  'credential',
  'education',
  'biometric',
  'risk',
  'other',
] as const;
const INTERFACE_STATES = [
  'default',
  'intro',
  'permission',
  'input',
  'capture',
  'processing',
  'success',
  'error',
  'retry',
  'matched',
  'notMatched',
  'inconclusive',
  'sourceUnavailable',
] as const;
const BUILT_IN_OUTCOMES = [
  'next',
  'success',
  'failure',
  'true',
  'false',
  'matched',
  'notMatched',
  'inconclusive',
  'sourceUnavailable',
] as const;

const isOutcomeId = (value: unknown): value is ModuleContract['outcomes'][number]['id'] =>
  typeof value === 'string'
  && (
    BUILT_IN_OUTCOMES.includes(value as typeof BUILT_IN_OUTCOMES[number])
    || (value.startsWith('custom:') && value.length > 'custom:'.length)
  );

const isFlowField = (value: unknown): value is FlowField => {
  if (!isRecord(value)) return false;
  return typeof value.id === 'string'
    && typeof value.key === 'string'
    && FLOW_FIELD_TYPES.includes(value.type as typeof FLOW_FIELD_TYPES[number])
    && FIELD_FORMATS.includes(value.format as typeof FIELD_FORMATS[number])
    && typeof value.required === 'boolean'
    && CLASSIFICATIONS.includes(
      value.classification as typeof CLASSIFICATIONS[number],
    )
    && typeof value.safeForResult === 'boolean'
    && (
      value.itemType === undefined
      || FLOW_FIELD_TYPES.includes(value.itemType as typeof FLOW_FIELD_TYPES[number])
    )
    && (
      value.children === undefined
      || (Array.isArray(value.children) && value.children.every(isFlowField))
    );
};

const isModuleContract = (value: unknown): value is ModuleContract => {
  if (!isRecord(value) || !isRecord(value.ref)) return false;
  if (
    typeof value.ref.packageId !== 'string'
    || typeof value.ref.version !== 'string'
    || !['builtIn', 'custom'].includes(String(value.origin))
    || !MODULE_CATEGORIES.includes(
      value.category as typeof MODULE_CATEGORIES[number],
    )
    || !Array.isArray(value.inputFields)
    || !value.inputFields.every(isFlowField)
    || !Array.isArray(value.outputFields)
    || !value.outputFields.every(isFlowField)
    || !Array.isArray(value.outcomes)
    || !value.outcomes.every(
      (outcome) => isRecord(outcome)
        && isOutcomeId(outcome.id)
        && typeof outcome.terminal === 'boolean',
    )
    || !isRecord(value.uiCapabilities)
    || !stringArray(value.uiCapabilities.supportedStates)
    || !value.uiCapabilities.supportedStates.every(
      (state) => INTERFACE_STATES.includes(
        state as typeof INTERFACE_STATES[number],
      ),
    )
    || (
      value.uiCapabilities.requiresUserInteraction !== undefined
      && typeof value.uiCapabilities.requiresUserInteraction !== 'boolean'
    )
    || typeof value.uiCapabilities.supportsConsent !== 'boolean'
    || typeof value.uiCapabilities.supportsCredentialRequest !== 'boolean'
    || typeof value.uiCapabilities.supportsFieldSummary !== 'boolean'
    || typeof value.uiCapabilities.supportsDevicePermission !== 'boolean'
    || typeof value.uiCapabilities.supportsCapture !== 'boolean'
    || !EVIDENCE_GROUPS.includes(
      value.evidenceGroup as typeof EVIDENCE_GROUPS[number],
    )
    || typeof value.estimatedDurationMs !== 'number'
    || !Number.isFinite(value.estimatedDurationMs)
  ) {
    return false;
  }
  return true;
};

const isModuleVersion = (value: unknown): value is ModuleVersion =>
  isRecord(value)
  && typeof value.version === 'string'
  && ['active', 'deprecated'].includes(String(value.status))
  && typeof value.createdAt === 'string'
  && isModuleContract(value.contract);

const isModuleManifest = (value: unknown): value is ModulePackage =>
  isRecord(value)
  && typeof value.id === 'string'
  && value.id.trim().length > 0
  && typeof value.name === 'string'
  && value.name.trim().length > 0
  && value.origin === 'custom'
  && typeof value.activeVersion === 'string'
  && Array.isArray(value.versions)
  && value.versions.length > 0
  && value.versions.every(isModuleVersion)
  && new Set(value.versions.map((version) => version.version)).size
    === value.versions.length
  && value.versions.some(
    (version) => version.version === value.activeVersion
      && version.status === 'active',
  )
  && value.versions.every(
    (version) => version.contract.ref.packageId === value.id
      && version.contract.ref.version === version.version
      && version.contract.origin === value.origin,
  );

const formatTimestamp = (value: string): string => {
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? value : date.toLocaleString();
};

const formatSubflowDepth = (version: string, depth: number): string =>
  `${version} · depth:${depth} · `;

const formatDependencyLockCounts = (release: FlowRelease): string =>
  `modules:${release.dependencyLock.modules.length} · subflows:${release.dependencyLock.subflows.length}`;

const safeField = (field: FlowField): boolean =>
  field.safeForResult
  && (field.classification === 'publicMetadata'
    || field.classification === 'internalMetadata');

const safeOutputFieldsForProject = (
  project: FlowProjectV2,
  workspace: DashboardWorkspaceV2,
): readonly { readonly id: string; readonly field: FlowField }[] =>
  project.flow.nodes.flatMap((node) => {
    let fields: readonly FlowField[] = [];
    if (node.kind === 'verification') {
      fields = resolveModuleContract(node.moduleRef, workspace.moduleCatalog)
        ?.outputFields ?? [];
    } else if (node.kind === 'subflow') {
      fields = workspace.subflowCatalog
        .find((item) => item.id === node.subflowRef.packageId)
        ?.versions.find((version) => version.version === node.subflowRef.version)
        ?.contract.outputFields ?? [];
    }
    return fields.filter(safeField).map((field) => ({
      id: `${node.id}.${field.id}`,
      field,
    }));
  });

const outputFieldsByNode = (
  project: FlowProjectV2,
  workspace: DashboardWorkspaceV2,
): Readonly<Record<string, readonly FlowField[]>> =>
  Object.fromEntries(project.flow.nodes.map((node) => {
    if (node.kind === 'verification') {
      return [
        node.id,
        resolveModuleContract(node.moduleRef, workspace.moduleCatalog)
          ?.outputFields ?? [],
      ];
    }
    if (node.kind === 'subflow') {
      return [
        node.id,
        workspace.subflowCatalog
          .find((item) => item.id === node.subflowRef.packageId)
          ?.versions.find((version) => version.version === node.subflowRef.version)
          ?.contract.outputFields ?? [],
      ];
    }
    return [node.id, []];
  }));

const parsePublicValue = (value: string): JsonValue => {
  try {
    return JSON.parse(value) as JsonValue;
  } catch {
    return value;
  }
};

const nextStageForRelease = (
  release: FlowRelease,
): ReleasePromotionStage | null => {
  if (!release.promotions.some((promotion) => promotion.stage === 'test')) {
    return 'test';
  }
  if (!release.promotions.some((promotion) => promotion.stage === 'staging')) {
    return 'staging';
  }
  if (!release.promotions.some((promotion) => promotion.stage === 'production')) {
    return 'production';
  }
  return null;
};

export function FlowOperationsDialog({
  copy,
  advancedCopy,
  project,
  workspace,
  selectedNodeIds,
  open,
  onClose,
  onProjectChange,
  onWorkspaceChange,
  onFocusNode,
}: FlowOperationsDialogProps) {
  const [activeTab, setActiveTab] = useState<OperationsTab>('modules');
  const [notice, setNotice] = useState<Notice | null>(null);
  const [selectedPackageId, setSelectedPackageId] = useState('');
  const [newModuleVersion, setNewModuleVersion] = useState('');
  const [moduleManifest, setModuleManifest] = useState('');
  const [pendingModuleDelete, setPendingModuleDelete] =
    useState<PendingModuleDelete | null>(null);
  const [subflowName, setSubflowName] = useState('');
  const [subflowVersion, setSubflowVersion] = useState('1.0.0');
  const [entryNodeId, setEntryNodeId] = useState('');
  const [successExitNodeId, setSuccessExitNodeId] = useState('');
  const [failureExitNodeId, setFailureExitNodeId] = useState('');
  const [releaseVersion, setReleaseVersion] = useState('');
  const [scenarioSummary, setScenarioSummary] =
    useState<ScenarioRunSummary | null>(null);
  const [promotionPending, setPromotionPending] = useState<string | null>(null);
  const [environmentId, setEnvironmentId] = useState(
    workspace.environments[0]?.id ?? '',
  );
  const [publicKey, setPublicKey] = useState('');
  const [publicValue, setPublicValue] = useState('');
  const [secretReference, setSecretReference] = useState('');
  const [originInput, setOriginInput] = useState('');
  const [redirectInput, setRedirectInput] = useState('');
  const [analysisReport, setAnalysisReport] =
    useState<ReturnType<typeof analyzeFlowProject> | null>(null);
  const dialogRef = useDialogFocus<HTMLDivElement>(open, onClose);

  const selectedPackage = useMemo(
    () => workspace.moduleCatalog.find((item) => item.id === selectedPackageId)
      ?? workspace.moduleCatalog[0],
    [selectedPackageId, workspace.moduleCatalog],
  );
  const selectedNodes = useMemo(
    () => project.flow.nodes.filter((node) => selectedNodeIds.includes(node.id)),
    [project.flow.nodes, selectedNodeIds],
  );
  const projectRevisions = useMemo(
    () => workspace.draftRevisions
      .filter((revision) => revision.projectId === project.id)
      .sort((left, right) => right.revision - left.revision),
    [project.id, workspace.draftRevisions],
  );
  const projectReleases = useMemo(
    () => workspace.releases
      .filter((release) => release.projectId === project.id)
      .sort((left, right) => right.createdAt.localeCompare(left.createdAt)),
    [project.id, workspace.releases],
  );
  const safeResultFields = useMemo(
    () => safeOutputFieldsForProject(project, workspace),
    [project, workspace],
  );
  const safeResultFieldIds = useMemo(
    () => new Set(safeResultFields.map((item) => item.id)),
    [safeResultFields],
  );
  const selectedEnvironment = workspace.environments.find(
    (environment) => environment.id === environmentId,
  ) ?? workspace.environments[0];

  useEffect(() => {
    setNotice(null);
    setScenarioSummary(null);
    setAnalysisReport(null);
    setPendingModuleDelete(null);
  }, [project.id]);

  useEffect(() => {
    if (!selectedPackageId && workspace.moduleCatalog[0]) {
      setSelectedPackageId(workspace.moduleCatalog[0].id);
    }
  }, [selectedPackageId, workspace.moduleCatalog]);

  useEffect(() => {
    const selectedIds = selectedNodes.map((node) => node.id);
    setEntryNodeId((current) => (
      selectedIds.includes(current) ? current : selectedIds[0] ?? ''
    ));
    setSuccessExitNodeId((current) => (
      selectedIds.includes(current) ? current : selectedIds.at(-2) ?? ''
    ));
    setFailureExitNodeId((current) => (
      selectedIds.includes(current) ? current : selectedIds.at(-1) ?? ''
    ));
  }, [selectedNodes]);

  if (!open) return null;

  const updateWorkspace = (
    changes: Partial<Pick<
      DashboardWorkspaceV2,
      | 'projects'
      | 'moduleCatalog'
      | 'subflowCatalog'
      | 'draftRevisions'
      | 'releases'
      | 'environments'
    >>,
  ) => {
    onWorkspaceChange({
      ...workspace,
      ...changes,
      savedAt: new Date().toISOString(),
    });
  };

  const updateProject = (
    changes: Partial<Pick<FlowProjectV2, 'flow' | 'interface' | 'scenarios' | 'integration'>>,
  ) => {
    onProjectChange({
      ...project,
      ...changes,
      updatedAt: new Date().toISOString(),
    });
  };

  const replaceModulePackage = (nextPackage: ModulePackage) => {
    updateWorkspace({
      moduleCatalog: workspace.moduleCatalog.map((item) =>
        item.id === nextPackage.id ? nextPackage : item),
    });
  };

  const handleCreateModuleVersion = (event: FormEvent) => {
    event.preventDefault();
    if (!selectedPackage || !newModuleVersion.trim()) return;
    const activeVersion = selectedPackage.versions.find(
      (version) => version.version === selectedPackage.activeVersion,
    );
    if (!activeVersion) {
      setNotice({ kind: 'error', value: 'moduleVersionMissing' });
      return;
    }
    const version = newModuleVersion.trim();
    const result = addImmutableModuleVersion(selectedPackage, {
      ...structuredClone(activeVersion),
      version,
      status: 'active',
      createdAt: new Date().toISOString(),
      contract: {
        ...structuredClone(activeVersion.contract),
        ref: { packageId: selectedPackage.id, version },
      },
    });
    if (!result.ok) {
      setNotice({ kind: 'error', value: moduleOperationError(result.reason) });
      return;
    }
    replaceModulePackage(result.value);
    setNewModuleVersion('');
    setNotice({
      kind: 'copy',
      value: 'moduleVersionCreated',
    });
  };

  const handleDeprecateVersion = (version: string) => {
    if (!selectedPackage) return;
    const result = deprecateModuleVersion(selectedPackage, version);
    if (!result.ok) {
      setNotice({ kind: 'error', value: moduleOperationError(result.reason) });
      return;
    }
    replaceModulePackage(result.value);
    setNotice({ kind: 'copy', value: 'moduleDeprecated' });
  };

  const executeDeletePackage = () => {
    if (!selectedPackage) return;
    const guard = canDeleteModulePackage(selectedPackage, {
      projects: workspace.projects,
      releases: workspace.releases,
      subflows: workspace.subflowCatalog,
    });
    if (!guard.ok) {
      setNotice({ kind: 'error', value: moduleOperationError(guard.reason) });
      return;
    }
    updateWorkspace({
      moduleCatalog: workspace.moduleCatalog.filter(
        (item) => item.id !== selectedPackage.id,
      ),
    });
    setSelectedPackageId('');
    setPendingModuleDelete(null);
    setNotice({ kind: 'copy', value: 'moduleDeleted' });
  };

  const executeDeleteModuleVersion = (version: string) => {
    if (!selectedPackage) return;
    const result = deleteModuleVersion(selectedPackage, version, {
      projects: workspace.projects,
      releases: workspace.releases,
      subflows: workspace.subflowCatalog,
    });
    if (!result.ok) {
      setNotice({ kind: 'error', value: moduleOperationError(result.reason) });
      return;
    }
    replaceModulePackage(result.value);
    setPendingModuleDelete(null);
    setNotice({ kind: 'copy', value: 'moduleDeleted' });
  };

  const handleUpgradeNode = (nodeId: string, target: ModuleVersion) => {
    const sourceNode = project.flow.nodes.find(
      (node) => node.id === nodeId && node.kind === 'verification',
    );
    if (!sourceNode || sourceNode.kind !== 'verification') return;
    const sourceContract = resolveModuleContract(
      sourceNode.moduleRef,
      workspace.moduleCatalog,
    );
    const missingRequiredInputs = target.contract.inputFields.filter(
      (field) => field.required
        && sourceContract?.inputFields.find(
          (candidate) => candidate.id === field.id,
        )?.required !== true
        && !sourceNode.bindings.some(
          (binding) => binding.targetFieldId === field.id,
        ),
    );
    if (missingRequiredInputs.length > 0) {
      setNotice({
        kind: 'error',
        value: 'requiredInputsMissing',
        details: missingRequiredInputs
          .map((field) => field.id)
          .join(', '),
      });
      return;
    }
    const nextFlow = {
      ...project.flow,
      nodes: project.flow.nodes.map((node) => (
        node.id === nodeId && node.kind === 'verification'
          ? {
              ...node,
              moduleRef: structuredClone(target.contract.ref),
            }
          : node
      )),
    };
    const createdAt = new Date().toISOString();
    const revision = createDraftRevisionSnapshot(
      project,
      workspace.draftRevisions,
      {
        id: createDashboardId('revision'),
        createdAt,
        reason: 'beforeDestructiveChange',
      },
    );
    const nextProject = {
      ...project,
      flow: nextFlow,
      updatedAt: createdAt,
    };
    updateWorkspace({
      projects: workspace.projects.map((item) =>
        item.id === project.id ? nextProject : item),
      draftRevisions: appendBoundedDraftRevision(
        workspace.draftRevisions,
        revision,
      ),
    });
    setNotice({
      kind: 'copy',
      value: 'moduleUpgradeComplete',
    });
  };

  const handleImportManifest = () => {
    try {
      const parsed: unknown = JSON.parse(moduleManifest);
      if (!isModuleManifest(parsed)) {
        setNotice({ kind: 'error', value: 'moduleManifestInvalid' });
        return;
      }
      const existing = workspace.moduleCatalog.find((item) => item.id === parsed.id);
      if (!existing) {
        updateWorkspace({
          moduleCatalog: [...workspace.moduleCatalog, structuredClone(parsed)],
        });
      } else {
        let nextPackage = existing;
        for (const version of parsed.versions) {
          if (nextPackage.versions.some((item) => item.version === version.version)) {
            continue;
          }
          const result = addImmutableModuleVersion(nextPackage, version);
          if (!result.ok) {
            setNotice({ kind: 'error', value: moduleOperationError(result.reason) });
            return;
          }
          nextPackage = result.value;
        }
        replaceModulePackage(nextPackage);
      }
      setSelectedPackageId(parsed.id);
      setNotice({ kind: 'copy', value: 'moduleImported' });
    } catch {
      setNotice({ kind: 'error', value: 'moduleManifestInvalid' });
    }
  };

  const handleCreateSubflow = (event: FormEvent) => {
    event.preventDefault();
    const packageId = subflowName.trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    if (!packageId || !subflowVersion.trim()) return;

    const selectedSafeOutputs = safeResultFields
      .filter((item) => selectedNodeIds.some(
        (nodeId) => item.id.startsWith(`${nodeId}.`),
      ))
      .map((item): FlowField => ({
        ...item.field,
        id: item.id,
        key: item.id,
      }));
    const result = extractSubflowPackage({
      packageId,
      name: subflowName.trim(),
      version: subflowVersion.trim(),
      source: project.flow,
      selectedNodeIds,
      entryNodeId,
      successExitNodeId,
      failureExitNodeId,
      inputFields: project.flow.inputSchema.fields,
      outputFields: selectedSafeOutputs,
      createdAt: new Date().toISOString(),
    });
    if (!result.ok) {
      setNotice({
        kind: 'error',
        value: 'subflowSelectionInvalid',
      });
      return;
    }

    const candidateVersion = result.value.versions[0]!;
    const dependencyReport = validateSubflowVersionDependencies(
      result.value.id,
      candidateVersion,
      workspace.subflowCatalog,
    );
    if (!dependencyReport.valid) {
      setNotice({
        kind: 'error',
        value: 'subflowDependencyInvalid',
      });
      return;
    }

    const existing = workspace.subflowCatalog.find(
      (item) => item.id === result.value.id,
    );
    if (existing?.versions.some(
      (version) => version.version === candidateVersion.version,
    )) {
      setNotice({ kind: 'error', value: 'subflowVersionConflict' });
      return;
    }
    const nextPackage = existing
      ? {
          ...existing,
          name: result.value.name,
          activeVersion: candidateVersion.version,
          versions: [...existing.versions, candidateVersion],
        }
      : result.value;
    updateWorkspace({
      subflowCatalog: [
        ...workspace.subflowCatalog.filter((item) => item.id !== nextPackage.id),
        nextPackage,
      ],
    });
    setSubflowName('');
    setNotice({ kind: 'copy', value: 'subflowCreated' });
  };

  const handleCheckpoint = () => {
    const revision = createDraftRevisionSnapshot(
      project,
      workspace.draftRevisions,
      {
        id: createDashboardId('revision'),
        createdAt: new Date().toISOString(),
        reason: 'manual',
      },
    );
    updateWorkspace({
      draftRevisions: appendBoundedDraftRevision(
        workspace.draftRevisions,
        revision,
      ),
    });
    setNotice({ kind: 'copy', value: 'checkpointCreated' });
  };

  const handleRollback = (revisionId: string) => {
    const result = rollbackProjectToRevision(
      project,
      revisionId,
      workspace.draftRevisions,
      {
        id: createDashboardId('revision'),
        createdAt: new Date().toISOString(),
      },
    );
    if (!result.ok) {
      setNotice({ kind: 'error', value: 'revisionUnavailable' });
      return;
    }
    updateWorkspace({
      projects: workspace.projects.map((item) =>
        item.id === result.project.id ? result.project : item),
      draftRevisions: result.revisions,
    });
    setNotice({ kind: 'copy', value: 'rollbackComplete' });
  };

  const handleCreateRelease = (event: FormEvent) => {
    event.preventDefault();
    const result = createImmutableRelease(project, workspace.releases, {
      id: createDashboardId('release'),
      version: releaseVersion.trim(),
      createdAt: new Date().toISOString(),
    });
    if (!result.ok) {
      setNotice({ kind: 'error', value: releaseOperationError(result.reason) });
      return;
    }
    updateWorkspace({ releases: [...workspace.releases, result.release] });
    setReleaseVersion('');
    setNotice({ kind: 'copy', value: 'releaseCreated' });
  };

  const runProjectScenarios = async (
    targetProject: FlowProjectV2,
  ): Promise<ScenarioRunSummary> =>
    runScenarioBatch(
      targetProject.scenarios,
      {
        manifest: targetProject.flow,
        outputFieldsByNode: outputFieldsByNode(targetProject, workspace),
      },
      (scenario) => simulateDynamicFlowV2(targetProject.flow, {
        scenario,
        moduleCatalog: workspace.moduleCatalog,
        subflowCatalog: workspace.subflowCatalog,
      }),
    );

  const handlePromoteRelease = async (
    release: FlowRelease,
    stage: ReleasePromotionStage,
  ) => {
    const pendingId = `${release.id}:${stage}`;
    setPromotionPending(pendingId);
    try {
      const environment = workspace.environments.find(
        (item) => item.stage === stage,
      );
      if (!environment) {
        setNotice({ kind: 'error', value: 'environmentInvalid' });
        return;
      }
      const releaseProject: FlowProjectV2 = {
        id: release.snapshot.projectId,
        name: release.snapshot.name,
        description: release.snapshot.description,
        createdAt: release.createdAt,
        updatedAt: release.createdAt,
        ...structuredClone(release.snapshot.content),
      };
      const runs = stage === 'staging'
        ? await runProjectScenarios(releaseProject)
        : scenarioSummary;
      const result = promoteRelease(
        release,
        stage,
        environment,
        {
          validationErrorCount: validateDynamicFlowV2(
            releaseProject.flow,
            workspace.moduleCatalog,
            workspace.subflowCatalog,
          ).length,
          scenarioRuns: runs?.runs,
          dependenciesValid: validateReleaseDependencies(
            release,
            workspace.moduleCatalog,
            workspace.subflowCatalog,
          ).length === 0,
        },
        new Date().toISOString(),
      );
      if (!result.ok) {
        setNotice({ kind: 'error', value: releaseOperationError(result.reason) });
        return;
      }
      updateWorkspace({
        releases: workspace.releases.map((item) =>
          item.id === release.id ? result.release : item),
      });
      setNotice({ kind: 'copy', value: 'promotionComplete' });
    } finally {
      setPromotionPending(null);
    }
  };

  const replaceEnvironment = (environment: DashboardEnvironment) => {
    const issues = validateDashboardEnvironment(environment);
    if (issues.length > 0) {
      setNotice({
        kind: 'error',
        value: 'environmentInvalid',
      });
      return false;
    }
    updateWorkspace({
      environments: workspace.environments.map((item) =>
        item.id === environment.id ? environment : item),
    });
    return true;
  };

  const handleAddPublicConfig = (event: FormEvent) => {
    event.preventDefault();
    if (!selectedEnvironment || !publicKey.trim()) return;
    const nextEnvironment = {
      ...selectedEnvironment,
      publicConfig: {
        ...selectedEnvironment.publicConfig,
        [publicKey.trim()]: parsePublicValue(publicValue),
      },
    };
    if (!replaceEnvironment(nextEnvironment)) return;
    setPublicKey('');
    setPublicValue('');
    setNotice({
      kind: 'copy',
      value: 'environmentVariableSaved',
    });
  };

  const handleAddSecretReference = () => {
    if (!selectedEnvironment || !secretReference.trim()) return;
    const nextEnvironment = {
      ...selectedEnvironment,
      secretReferenceNames: [
        ...selectedEnvironment.secretReferenceNames,
        secretReference.trim(),
      ],
    };
    if (!replaceEnvironment(nextEnvironment)) return;
    setSecretReference('');
    setNotice({
      kind: 'copy',
      value: 'environmentVariableSaved',
    });
  };

  const removePublicConfig = (key: string) => {
    if (!selectedEnvironment) return;
    const nextConfig = Object.fromEntries(
      Object.entries(selectedEnvironment.publicConfig)
        .filter(([candidate]) => candidate !== key),
    );
    if (!replaceEnvironment({
      ...selectedEnvironment,
      publicConfig: nextConfig,
    })) return;
    setNotice({
      kind: 'copy',
      value: 'environmentVariableDeleted',
    });
  };

  const removeSecretReference = (reference: string) => {
    if (!selectedEnvironment) return;
    if (!replaceEnvironment({
      ...selectedEnvironment,
      secretReferenceNames: selectedEnvironment.secretReferenceNames.filter(
        (item) => item !== reference,
      ),
    })) return;
    setNotice({
      kind: 'copy',
      value: 'environmentVariableDeleted',
    });
  };

  const setIntegration = (integration: IntegrationSettings) => {
    updateProject({
      integration: {
        ...integration,
        includePii: false,
      },
    });
  };

  const addOrigin = () => {
    const value = originInput.trim();
    if (!value) return;
    const next = {
      ...project.integration,
      allowedOrigins: [...project.integration.allowedOrigins, value],
    };
    const blocking = validateIntegrationSettings(next, safeResultFieldIds)
      .some((issue) => (
        (issue.code === 'invalidOrigin' || issue.code === 'duplicateOrigin')
        && issue.value === value
      ));
    if (blocking) {
      setNotice({ kind: 'error', value: 'originInvalid' });
      return;
    }
    setIntegration(next);
    setOriginInput('');
  };

  const addRedirect = () => {
    const value = redirectInput.trim();
    if (!value) return;
    const next = {
      ...project.integration,
      redirectUrls: [...project.integration.redirectUrls, value],
    };
    const blocking = validateIntegrationSettings(next, safeResultFieldIds)
      .some((issue) => (
        (issue.code === 'invalidRedirectUrl'
          || issue.code === 'duplicateRedirectUrl')
        && issue.value === value
      ));
    if (blocking) {
      setNotice({ kind: 'error', value: 'redirectInvalid' });
      return;
    }
    setIntegration(next);
    setRedirectInput('');
  };

  const validateIntegration = () => {
    const issues = validateIntegrationSettings(
      project.integration,
      safeResultFieldIds,
    );
    setNotice(issues.length === 0
      ? { kind: 'copy', value: 'integrationValid' }
      : {
          kind: 'error',
          value: 'integrationInvalid',
        });
  };

  const handleRunAnalysis = async () => {
    const summary = await runProjectScenarios(project);
    setScenarioSummary(summary);
    setAnalysisReport(analyzeFlowProject({
      project,
      moduleCatalog: workspace.moduleCatalog,
      subflowCatalog: workspace.subflowCatalog,
      scenarioCoverage: summary.edgeCoverage,
      generatedAt: new Date().toISOString(),
    }));
    setNotice({ kind: 'copy', value: 'analysisComplete' });
  };

  const tabs: readonly {
    readonly id: OperationsTab;
    readonly label: string;
    readonly icon: typeof Package;
  }[] = [
    { id: 'modules', label: advancedCopy.modules.title, icon: Package },
    { id: 'subflows', label: advancedCopy.subflows.title, icon: GitFork },
    { id: 'revisions', label: advancedCopy.revisions.title, icon: History },
    { id: 'releases', label: advancedCopy.releases.title, icon: Rocket },
    { id: 'environments', label: advancedCopy.environments.title, icon: Settings2 },
    { id: 'integration', label: advancedCopy.integration.title, icon: Plug },
    { id: 'analysis', label: advancedCopy.analysis.title, icon: Activity },
  ];

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? tabs.length - 1
        : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length)
          % tabs.length;
    setActiveTab(tabs[nextIndex]!.id);
    document.querySelector<HTMLButtonElement>(
      `[data-operations-tab="${tabs[nextIndex]!.id}"]`,
    )?.focus();
  };

  const activeDescription = {
    modules: advancedCopy.modules.description,
    subflows: advancedCopy.subflows.description,
    revisions: advancedCopy.revisions.description,
    releases: advancedCopy.releases.description,
    environments: advancedCopy.environments.description,
    integration: advancedCopy.integration.description,
    analysis: advancedCopy.analysis.description,
  }[activeTab];

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6">
      <button
        type="button"
        aria-label={copy.close}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={advancedCopy.aria.advancedWorkspace}
        tabIndex={-1}
        className="relative flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
          <div>
            <h2 className="type-card-title-sm type-document-heading text-slate-950">
              {advancedCopy.aria.advancedWorkspace}
            </h2>
            <p className="mt-1 text-sm text-slate-500">{activeDescription}</p>
          </div>
          <button
            type="button"
            aria-label={advancedCopy.aria.closeDialog}
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1]"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div
          role="tablist"
          aria-label={advancedCopy.aria.advancedWorkspace}
          className="flex shrink-0 gap-1 overflow-x-auto border-b border-slate-200 px-3 py-2 sm:px-5"
        >
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const selected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                data-operations-tab={tab.id}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1] ${
 selected
 ? 'bg-[#EEF0FF] text-[#354CE1]'
 : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
 }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {notice && (
          <div
            role={notice.kind === 'copy' ? 'status' : 'alert'}
            className={`mx-5 mt-4 rounded-xl px-3 py-2 text-xs font-semibold sm:mx-6 ${
 notice.kind === 'copy'
 ? 'bg-emerald-50 text-emerald-700'
 : 'bg-amber-50 text-amber-800'
 }`}
          >
            {notice.kind === 'copy'
              ? advancedCopy.toasts[notice.value]
              : (
                <>
                  {advancedCopy.operationErrors[notice.value]}
                  {notice.details && (
                    <span className="mt-1 block font-mono font-medium">
                      {notice.details}
                    </span>
                  )}
                </>
              )}
          </div>
        )}

        <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-6">
          {activeTab === 'modules' && (
            <section aria-labelledby="operations-modules-title" className="space-y-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <label className="min-w-0 flex-1">
                  <span id="operations-modules-title" className="text-xs font-bold text-slate-700">
                    {advancedCopy.modules.title}
                  </span>
                  <select
                    value={selectedPackage?.id ?? ''}
                    onChange={(event) => setSelectedPackageId(event.target.value)}
                    className={`${inputClass} mt-2`}
                  >
                    {workspace.moduleCatalog.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name} · {item.id}
                      </option>
                    ))}
                  </select>
                </label>
                {selectedPackage && (
                  <button
                    type="button"
                    onClick={() => setPendingModuleDelete({ kind: 'package' })}
                    className={buttonClass}
                  >
                    <Trash2 className="h-4 w-4" />
                    {advancedCopy.common.delete}
                  </button>
                )}
              </div>

              {!selectedPackage ? (
                <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
                  {advancedCopy.common.noResults}
                </div>
              ) : (
                <>
                  {pendingModuleDelete && (
                    <div
                      role="alertdialog"
                      aria-labelledby="module-delete-title"
                      aria-describedby="module-delete-description"
                      className="rounded-2xl border border-rose-200 bg-rose-50 p-4"
                    >
                      <h3 id="module-delete-title" className="type-card-title-sm text-rose-900">
                        {advancedCopy.modals.deleteModuleTitle}
                      </h3>
                      <p id="module-delete-description" className="mt-1 text-xs leading-5 text-rose-700">
                        {advancedCopy.modals.deleteModuleDescription}
                      </p>
                      <p className="type-technical mt-2 font-mono text-rose-800">
                        {selectedPackage.id}
                        {pendingModuleDelete.kind === 'version'
                          ? `@${pendingModuleDelete.version}`
                          : ''}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setPendingModuleDelete(null)}
                          className={buttonClass}
                        >
                          {advancedCopy.common.cancel}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (pendingModuleDelete.kind === 'package') {
                              executeDeletePackage();
                            } else {
                              executeDeleteModuleVersion(
                                pendingModuleDelete.version,
                              );
                            }
                          }}
                          className={primaryButtonClass}
                        >
                          {advancedCopy.common.delete}
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="grid gap-4 lg:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="type-card-title-sm text-slate-900">
                          {advancedCopy.modules.versionHistory}
                        </h3>
                        <span className="type-technical rounded-full bg-[#EEF0FF] px-2.5 py-1 font-mono font-bold text-[#354CE1]">
                          {advancedCopy.modules.activeVersion}: {selectedPackage.activeVersion}
                        </span>
                      </div>
                      <div className="mt-3 space-y-2">
                        {selectedPackage.versions
                          .slice()
                          .reverse()
                          .map((version) => {
                            const usageCount = findModuleUsages(
                              {
                                packageId: selectedPackage.id,
                                version: version.version,
                              },
                              {
                                projects: workspace.projects,
                                releases: workspace.releases,
                                subflows: workspace.subflowCatalog,
                              },
                            ).length;
                            return (
                              <div
                                key={version.version}
                                className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-slate-50 px-3 py-2"
                              >
                                <div>
                                  <p className="font-mono text-xs font-bold text-slate-800">
                                    {version.version}
                                  </p>
                                  <p className="type-body-sm mt-0.5 text-slate-500">
                                    {version.status === 'active'
                                      ? advancedCopy.modules.active
                                      : advancedCopy.modules.deprecated}
                                    {' · '}
                                    {advancedCopy.modules.usage}: {usageCount}
                                  </p>
                                </div>
                                {version.status === 'active' ? (
                                  <button
                                    type="button"
                                    onClick={() => handleDeprecateVersion(version.version)}
                                    className={buttonClass}
                                  >
                                    {advancedCopy.modules.deprecated}
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => setPendingModuleDelete({
                                      kind: 'version',
                                      version: version.version,
                                    })}
                                    className={buttonClass}
                                  >
                                    {advancedCopy.common.delete}
                                  </button>
                                )}
                              </div>
                            );
                          })}
                      </div>
                      <form
                        onSubmit={handleCreateModuleVersion}
                        className="mt-3 flex flex-col gap-2 sm:flex-row"
                      >
                        <input
                          required
                          value={newModuleVersion}
                          onChange={(event) => setNewModuleVersion(event.target.value)}
                          className={inputClass}
                        />
                        <button type="submit" className={primaryButtonClass}>
                          {advancedCopy.modules.createVersion}
                        </button>
                      </form>
                    </div>

                    <div className="rounded-2xl border border-slate-200 p-4">
                      <h3 className="type-card-title-sm text-slate-900">
                        {advancedCopy.modules.usage}
                      </h3>
                      <div className="mt-3 space-y-2">
                        {findModuleUsages(
                          { packageId: selectedPackage.id },
                          {
                            projects: workspace.projects,
                            releases: workspace.releases,
                            subflows: workspace.subflowCatalog,
                          },
                        ).map((usage) => (
                          <button
                            key={`${usage.kind}:${usage.ownerId}:${usage.ownerVersion ?? ''}:${usage.nodeId}`}
                            type="button"
                            disabled={usage.kind !== 'project' || usage.ownerId !== project.id}
                            onClick={() => onFocusNode?.(usage.nodeId)}
                            className="flex w-full items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-left text-xs disabled:opacity-70"
                          >
                            <span className="font-bold text-slate-700">
                              {usage.kind}:{usage.ownerId}
                            </span>
                            <span className="font-mono text-slate-500">{usage.nodeId}</span>
                          </button>
                        ))}
                        {findModuleUsages(
                          { packageId: selectedPackage.id },
                          {
                            projects: workspace.projects,
                            releases: workspace.releases,
                            subflows: workspace.subflowCatalog,
                          },
                        ).length === 0 && (
                          <p className="text-xs text-slate-500">
                            {advancedCopy.modules.noUsage}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-4">
                    <h3 className="type-card-title-sm text-slate-900">
                      {advancedCopy.modules.checkCompatibility}
                    </h3>
                    <div className="mt-3 grid gap-3 lg:grid-cols-2">
                      {project.flow.nodes
                        .filter((node) => node.kind === 'verification'
                          && node.moduleRef.packageId === selectedPackage.id
                          && node.moduleRef.version !== selectedPackage.activeVersion)
                        .map((node) => {
                          if (node.kind !== 'verification') return null;
                          const current = selectedPackage.versions.find(
                            (version) => version.version === node.moduleRef.version,
                          );
                          const target = selectedPackage.versions.find(
                            (version) => version.version === selectedPackage.activeVersion,
                          );
                          if (!current || !target) return null;
                          const diff = diffModuleCompatibility(
                            current.contract,
                            target.contract,
                          );
                          return (
                            <div key={node.id} className="rounded-xl bg-slate-50 p-3">
                              <div className="flex items-center justify-between gap-3">
                                <div>
                                  <p className="font-mono text-xs font-bold text-slate-800">
                                    {node.id}
                                  </p>
                                  <p className="type-body-sm mt-1 text-slate-500">
                                    {current.version} → {target.version}
                                  </p>
                                </div>
                                <span className={`type-label-compact rounded-full px-2 py-1 font-bold ${
 diff.compatible
 ? 'bg-emerald-100 text-emerald-700'
 : 'bg-rose-100 text-rose-700'
 }`}>
                                  {diff.compatible
                                    ? advancedCopy.modules.compatible
                                    : advancedCopy.modules.breakingChanges}
                                </span>
                              </div>
                              {diff.changes.length > 0 && (
                                <p className="type-technical mt-2 font-mono text-slate-500">
                                  {diff.changes.map(
                                    (change) => `${change.kind}:${change.stableId}`,
                                  ).join(', ')}
                                </p>
                              )}
                              <button
                                type="button"
                                disabled={!diff.compatible}
                                onClick={() => handleUpgradeNode(node.id, target)}
                                className={`${primaryButtonClass} mt-3`}
                              >
                                {advancedCopy.modules.upgrade}
                              </button>
                            </div>
                          );
                        })}
                      {!project.flow.nodes.some(
                        (node) => node.kind === 'verification'
                          && node.moduleRef.packageId === selectedPackage.id
                          && node.moduleRef.version !== selectedPackage.activeVersion,
                      ) && (
                        <p className="text-xs text-slate-500">
                          {advancedCopy.modules.compatible}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="type-card-title-sm text-slate-900">
                        {advancedCopy.modules.importManifest}
                      </h3>
                      <button
                        type="button"
                        onClick={() => setModuleManifest(
                          JSON.stringify(selectedPackage, null, 2),
                        )}
                        className={buttonClass}
                      >
                        {advancedCopy.modules.exportManifest}
                      </button>
                    </div>
                    <textarea
                      value={moduleManifest}
                      onChange={(event) => setModuleManifest(event.target.value)}
                      rows={7}
                      spellCheck={false}
                      className={`${inputClass} mt-3 resize-y font-mono text-xs`}
                    />
                    <button
                      type="button"
                      onClick={handleImportManifest}
                      className={`${primaryButtonClass} mt-3`}
                    >
                      {advancedCopy.modules.importManifest}
                    </button>
                  </div>
                </>
              )}
            </section>
          )}

          {activeTab === 'subflows' && (
            <section aria-labelledby="operations-subflows-title" className="space-y-5">
              <div className="rounded-2xl border border-slate-200 p-4">
                <h3 id="operations-subflows-title" className="type-card-title-sm text-slate-900">
                  {advancedCopy.subflows.createFromSelection}
                </h3>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {advancedCopy.subflows.selectionRequirement}
                </p>
                <form
                  onSubmit={handleCreateSubflow}
                  className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
                >
                  <label>
                    <span className="text-xs font-bold text-slate-700">
                      {advancedCopy.subflows.title}
                    </span>
                    <input
                      required
                      value={subflowName}
                      onChange={(event) => setSubflowName(event.target.value)}
                      className={`${inputClass} mt-2`}
                    />
                  </label>
                  <label>
                    <span className="text-xs font-bold text-slate-700">
                      {advancedCopy.modules.activeVersion}
                    </span>
                    <input
                      required
                      value={subflowVersion}
                      onChange={(event) => setSubflowVersion(event.target.value)}
                      className={`${inputClass} mt-2`}
                    />
                  </label>
                  {([
                    ['entry', advancedCopy.subflows.entryNode, entryNodeId, setEntryNodeId],
                    ['success', advancedCopy.subflows.successExit, successExitNodeId, setSuccessExitNodeId],
                    ['failure', advancedCopy.subflows.failureExit, failureExitNodeId, setFailureExitNodeId],
                  ] as const).map(([id, label, value, setter]) => (
                    <label key={id}>
                      <span className="text-xs font-bold text-slate-700">{label}</span>
                      <select
                        required
                        value={value}
                        onChange={(event) => setter(event.target.value)}
                        className={`${inputClass} mt-2`}
                      >
                        <option value="" />
                        {selectedNodes.map((node) => (
                          <option key={node.id} value={node.id}>{node.id}</option>
                        ))}
                      </select>
                    </label>
                  ))}
                  <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-600 sm:col-span-2">
                    <p>
                      {advancedCopy.subflows.inputContract}:{' '}
                      {project.flow.inputSchema.fields.map((field) => field.id).join(', ') || '[]'}
                    </p>
                    <p className="mt-1">
                      {advancedCopy.subflows.outputContract}:{' '}
                      {safeResultFields
                        .filter((item) => selectedNodeIds.some(
                          (nodeId) => item.id.startsWith(`${nodeId}.`),
                        ))
                        .map((item) => item.id)
                        .join(', ') || '[]'}
                    </p>
                  </div>
                  <button
                    type="submit"
                    disabled={selectedNodeIds.length === 0}
                    className={primaryButtonClass}
                  >
                    {advancedCopy.common.create}
                  </button>
                </form>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {workspace.subflowCatalog.map((subflow) => (
                  <article key={subflow.id} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="type-card-title-sm text-slate-900">{subflow.name}</h3>
                        <p className="type-technical mt-1 font-mono text-slate-500">
                          {subflow.id}@{subflow.activeVersion}
                        </p>
                      </div>
                      <span className="type-label-compact rounded-full bg-slate-100 px-2 py-1 font-bold text-slate-600">
                        {advancedCopy.subflows.versionHistory}: {subflow.versions.length}
                      </span>
                    </div>
                    <div className="mt-3 space-y-1">
                      {subflow.versions.map((version) => {
                        const dependency = validateSubflowVersionDependencies(
                          subflow.id,
                          version,
                          workspace.subflowCatalog,
                        );
                        return (
                          <p key={version.version} className="type-technical font-mono text-slate-600">
                            {formatSubflowDepth(version.version, dependency.maximumDepth)}
                            {dependency.valid ? advancedCopy.modules.active : advancedCopy.subflows.recursionBlocked}
                          </p>
                        );
                      })}
                    </div>
                  </article>
                ))}
                {workspace.subflowCatalog.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center md:col-span-2">
                    <h3 className="type-card-title-sm text-slate-800">
                      {advancedCopy.subflows.emptyTitle}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {advancedCopy.subflows.emptyDescription}
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}

          {activeTab === 'revisions' && (
            <section aria-labelledby="operations-revisions-title" className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 id="operations-revisions-title" className="type-card-title-sm text-slate-900">
                    {advancedCopy.revisions.currentDraft}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {advancedCopy.revisions.retentionNotice}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCheckpoint}
                  className={primaryButtonClass}
                >
                  {advancedCopy.revisions.createCheckpoint}
                </button>
              </div>
              <div className="space-y-2">
                {projectRevisions.map((revision) => (
                  <article
                    key={revision.id}
                    className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-mono text-xs font-bold text-slate-800">
                        #{revision.revision} · {revision.id}
                      </p>
                      <p className="type-body-sm mt-1 text-slate-500">
                        {revision.reason === 'manual'
                          ? advancedCopy.revisions.manual
                          : revision.reason === 'beforeDestructiveChange'
                            ? advancedCopy.revisions.beforeDestructiveChange
                            : advancedCopy.revisions.rollback}
                        {' · '}
                        {formatTimestamp(revision.createdAt)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRollback(revision.id)}
                      className={buttonClass}
                    >
                      {advancedCopy.revisions.rollback}
                    </button>
                  </article>
                ))}
                {projectRevisions.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center">
                    <h3 className="type-card-title-sm text-slate-800">
                      {advancedCopy.revisions.emptyTitle}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {advancedCopy.revisions.emptyDescription}
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}

          {activeTab === 'releases' && (
            <section aria-labelledby="operations-releases-title" className="space-y-5">
              <form
                onSubmit={handleCreateRelease}
                className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-4 sm:flex-row sm:items-end"
              >
                <label className="flex-1">
                  <span id="operations-releases-title" className="text-xs font-bold text-slate-700">
                    {advancedCopy.releases.releaseName}
                  </span>
                  <input
                    required
                    value={releaseVersion}
                    onChange={(event) => setReleaseVersion(event.target.value)}
                    className={`${inputClass} mt-2`}
                  />
                </label>
                <button type="submit" className={primaryButtonClass}>
                  {advancedCopy.releases.createRelease}
                </button>
              </form>
              <p className="rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-600">
                {advancedCopy.releases.immutableSnapshot}
              </p>
              <div className="space-y-3">
                {projectReleases.map((release) => {
                  const nextStage = nextStageForRelease(release);
                  const dependencyIssues = validateReleaseDependencies(
                    release,
                    workspace.moduleCatalog,
                    workspace.subflowCatalog,
                  );
                  return (
                    <article key={release.id} className="rounded-2xl border border-slate-200 p-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="type-technical font-mono text-slate-900">
                            {release.version}
                          </h3>
                          <p className="type-body-sm mt-1 text-slate-500">
                            {formatTimestamp(release.createdAt)}
                          </p>
                        </div>
                        {nextStage && (
                          <button
                            type="button"
                            disabled={promotionPending === `${release.id}:${nextStage}`}
                            onClick={() => void handlePromoteRelease(release, nextStage)}
                            className={primaryButtonClass}
                          >
                            {promotionPending === `${release.id}:${nextStage}`
                              ? advancedCopy.common.loading
                              : `${advancedCopy.releases.promote} · ${
                                  nextStage === 'test'
                                    ? advancedCopy.releases.test
                                    : nextStage === 'staging'
                                      ? advancedCopy.releases.staging
                                      : advancedCopy.releases.production
                                }`}
                          </button>
                        )}
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {(['test', 'staging', 'production'] as const).map((stage) => {
                          const promoted = release.promotions.some(
                            (promotion) => promotion.stage === stage,
                          );
                          return (
                            <span
                              key={stage}
                              className={`type-label-compact inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-bold ${
 promoted
 ? 'bg-emerald-100 text-emerald-700'
 : 'bg-slate-100 text-slate-500'
 }`}
                            >
                              {promoted && <Check className="h-3 w-3" />}
                              {stage === 'test'
                                ? advancedCopy.releases.test
                                : stage === 'staging'
                                  ? advancedCopy.releases.staging
                                  : advancedCopy.releases.production}
                            </span>
                          );
                        })}
                      </div>
                      <p className="type-technical mt-3 font-mono text-slate-500">
                        {advancedCopy.releases.dependencyLock}:{' '}
                        {formatDependencyLockCounts(release)}
                        {dependencyIssues.length > 0 ? ` · invalid:${dependencyIssues.length}` : ''}
                      </p>
                    </article>
                  );
                })}
                {projectReleases.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center">
                    <h3 className="type-card-title-sm text-slate-800">
                      {advancedCopy.releases.emptyTitle}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {advancedCopy.releases.emptyDescription}
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}

          {activeTab === 'environments' && (
            <section aria-labelledby="operations-environments-title" className="space-y-5">
              <label className="block max-w-sm">
                <span id="operations-environments-title" className="text-xs font-bold text-slate-700">
                  {advancedCopy.environments.title}
                </span>
                <select
                  value={selectedEnvironment?.id ?? ''}
                  onChange={(event) => setEnvironmentId(event.target.value)}
                  className={`${inputClass} mt-2`}
                >
                  {workspace.environments.map((environment) => (
                    <option key={environment.id} value={environment.id}>
                      {environment.stage} · {environment.id}
                    </option>
                  ))}
                </select>
              </label>

              {selectedEnvironment ? (
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <h3 className="type-card-title-sm text-slate-900">
                      {advancedCopy.environments.publicConfiguration}
                    </h3>
                    <form
                      onSubmit={handleAddPublicConfig}
                      className="mt-3 grid gap-2 sm:grid-cols-2"
                    >
                      <input
                        required
                        value={publicKey}
                        onChange={(event) => setPublicKey(event.target.value)}
                        aria-label={advancedCopy.environments.variableName}
                        className={inputClass}
                      />
                      <input
                        required
                        value={publicValue}
                        onChange={(event) => setPublicValue(event.target.value)}
                        aria-label={advancedCopy.environments.publicValue}
                        className={inputClass}
                      />
                      <button type="submit" className={`${primaryButtonClass} sm:col-span-2`}>
                        {advancedCopy.environments.addVariable}
                      </button>
                    </form>
                    <div className="mt-3 space-y-2">
                      {Object.entries(selectedEnvironment.publicConfig).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2">
                          <code className="type-technical min-w-0 truncate text-slate-700">
                            {key}={JSON.stringify(value)}
                          </code>
                          <button
                            type="button"
                            aria-label={advancedCopy.environments.deleteVariable}
                            onClick={() => removePublicConfig(key)}
                            className="rounded-lg p-1.5 text-slate-500 hover:bg-white"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-4">
                    <h3 className="type-card-title-sm text-slate-900">
                      {advancedCopy.environments.secretReferences}
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {advancedCopy.environments.secretNotice}
                    </p>
                    <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                      <input
                        value={secretReference}
                        onChange={(event) => setSecretReference(event.target.value)}
                        aria-label={advancedCopy.environments.secretReference}
                        className={inputClass}
                      />
                      <button
                        type="button"
                        onClick={handleAddSecretReference}
                        className={primaryButtonClass}
                      >
                        {advancedCopy.common.add}
                      </button>
                    </div>
                    <div className="mt-3 space-y-2">
                      {selectedEnvironment.secretReferenceNames.map((reference) => (
                        <div key={reference} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2">
                          <code className="type-technical text-slate-700">{reference}</code>
                          <button
                            type="button"
                            aria-label={advancedCopy.common.remove}
                            onClick={() => removeSecretReference(reference)}
                            className="rounded-lg p-1.5 text-slate-500 hover:bg-white"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
                  {advancedCopy.environments.emptyTitle}
                </div>
              )}
            </section>
          )}

          {activeTab === 'integration' && (
            <section aria-labelledby="operations-integration-title" className="space-y-5">
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 p-4">
                  <h3 id="operations-integration-title" className="type-card-title-sm text-slate-900">
                    {advancedCopy.integration.mode}
                  </h3>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {(['hosted', 'embed', 'redirect'] as const).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        aria-pressed={project.integration.mode === mode}
                        onClick={() => setIntegration({ ...project.integration, mode })}
                        className={project.integration.mode === mode
 ? primaryButtonClass
 : buttonClass}
                      >
                        {advancedCopy.integration[mode]}
                      </button>
                    ))}
                  </div>
                  <label className="mt-4 block">
                    <span className="text-xs font-bold text-slate-700">
                      {advancedCopy.integration.sessionTimeout}
                    </span>
                    <input
                      type="number"
                      min={1}
                      max={1440}
                      value={project.integration.sessionTimeoutMinutes}
                      onChange={(event) => {
                        const value = Number(event.target.value);
                        if (!Number.isInteger(value) || value < 1 || value > 1440) return;
                        setIntegration({
                          ...project.integration,
                          sessionTimeoutMinutes: value,
                        });
                      }}
                      className={`${inputClass} mt-2`}
                    />
                  </label>
                  <label className="mt-4 block">
                    <span className="text-xs font-bold text-slate-700">
                      {advancedCopy.integration.resumePolicy}
                    </span>
                    <select
                      value={project.integration.resumePolicy}
                      onChange={(event) => setIntegration({
                        ...project.integration,
                        resumePolicy: event.target.value as ResumePolicy,
                      })}
                      className={`${inputClass} mt-2`}
                    >
                      <option value="disabled">{advancedCopy.integration.resumeDisabled}</option>
                      <option value="sameDevice">{advancedCopy.integration.sameDevice}</option>
                      <option value="crossDevice">{advancedCopy.integration.crossDevice}</option>
                    </select>
                  </label>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4">
                  <h3 className="type-card-title-sm text-slate-900">
                    {advancedCopy.integration.events}
                  </h3>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {(['started', 'stepCompleted', 'cancelled', 'finished'] as const)
                      .map((eventId) => (
                        <label key={eventId} className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700">
                          <input
                            type="checkbox"
                            checked={project.integration.enabledEvents.includes(eventId)}
                            onChange={() => {
                              const enabledEvents = project.integration.enabledEvents.includes(eventId)
                                ? project.integration.enabledEvents.filter((item) => item !== eventId)
                                : [...project.integration.enabledEvents, eventId];
                              setIntegration({ ...project.integration, enabledEvents });
                            }}
                          />
                          {advancedCopy.integrationEvents[eventId]}
                        </label>
                      ))}
                  </div>
                  <p className="mt-4 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                    {advancedCopy.integration.piiDisabled}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 p-4">
                  <h3 className="type-card-title-sm text-slate-900">
                    {advancedCopy.integration.allowedOrigins}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {advancedCopy.integration.httpsRequired} · {advancedCopy.integration.wildcardRejected}
                  </p>
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                    <input
                      aria-label={advancedCopy.integration.allowedOrigins}
                      value={originInput}
                      onChange={(event) => setOriginInput(event.target.value)}
                      className={inputClass}
                    />
                    <button type="button" onClick={addOrigin} className={primaryButtonClass}>
                      {advancedCopy.integration.addOrigin}
                    </button>
                  </div>
                  <div className="mt-3 space-y-2">
                    {project.integration.allowedOrigins.map((origin) => (
                      <div key={origin} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2">
                        <code className="type-technical truncate text-slate-700">{origin}</code>
                        <button
                          type="button"
                          aria-label={advancedCopy.common.remove}
                          onClick={() => setIntegration({
                            ...project.integration,
                            allowedOrigins: project.integration.allowedOrigins.filter(
                              (item) => item !== origin,
                            ),
                          })}
                          className="rounded-lg p-1.5 text-slate-500 hover:bg-white"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4">
                  <h3 className="type-card-title-sm text-slate-900">
                    {advancedCopy.integration.redirectUrls}
                  </h3>
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                    <input
                      aria-label={advancedCopy.integration.redirectUrls}
                      value={redirectInput}
                      onChange={(event) => setRedirectInput(event.target.value)}
                      className={inputClass}
                    />
                    <button type="button" onClick={addRedirect} className={primaryButtonClass}>
                      {advancedCopy.integration.addRedirectUrl}
                    </button>
                  </div>
                  <div className="mt-3 space-y-2">
                    {project.integration.redirectUrls.map((url) => (
                      <div key={url} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2">
                        <code className="type-technical truncate text-slate-700">{url}</code>
                        <button
                          type="button"
                          aria-label={advancedCopy.common.remove}
                          onClick={() => setIntegration({
                            ...project.integration,
                            redirectUrls: project.integration.redirectUrls.filter(
                              (item) => item !== url,
                            ),
                          })}
                          className="rounded-lg p-1.5 text-slate-500 hover:bg-white"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <h3 className="type-card-title-sm text-slate-900">
                  {advancedCopy.integration.resultFields}
                </h3>
                <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {safeResultFields.map((item) => (
                    <label key={item.id} className="type-technical flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 font-mono text-slate-700">
                      <input
                        type="checkbox"
                        checked={project.integration.resultFieldIds.includes(item.id)}
                        onChange={() => {
                          const resultFieldIds = project.integration.resultFieldIds.includes(item.id)
                            ? project.integration.resultFieldIds.filter((fieldId) => fieldId !== item.id)
                            : [...project.integration.resultFieldIds, item.id];
                          setIntegration({ ...project.integration, resultFieldIds });
                        }}
                      />
                      {item.id}
                    </label>
                  ))}
                  {safeResultFields.length === 0 && (
                    <p className="text-xs text-slate-500">
                      {advancedCopy.common.noResults}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={validateIntegration}
                  className={`${primaryButtonClass} mt-4`}
                >
                  {advancedCopy.integration.validateManifest}
                </button>
              </div>
            </section>
          )}

          {activeTab === 'analysis' && (
            <section aria-labelledby="operations-analysis-title" className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 id="operations-analysis-title" className="type-card-title-sm text-slate-900">
                    {advancedCopy.analysis.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {advancedCopy.analysis.thresholds}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => void handleRunAnalysis()}
                  className={primaryButtonClass}
                >
                  {advancedCopy.analysis.runAnalysis}
                </button>
              </div>

              {analysisReport ? (
                <>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="type-label font-bold uppercase text-slate-500">
                        {advancedCopy.analysis.estimatedLatency}
                      </p>
                      <p className="mt-2 text-lg font-bold text-slate-900">
                        {Math.round(analysisReport.estimatedCriticalPathDurationMs / 100) / 10}s
                      </p>
                      <p className="type-caption mt-1 text-slate-500">
                        {advancedCopy.common.estimated}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="type-label font-bold uppercase text-slate-500">
                        {advancedCopy.analysisIssues.excessiveEvidence}
                      </p>
                      <p className="mt-2 text-lg font-bold text-slate-900">
                        {analysisReport.estimatedInteractionSteps}
                      </p>
                      <p className="type-caption mt-1 text-slate-500">
                        {advancedCopy.common.estimated}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="type-label font-bold uppercase text-slate-500">
                        {advancedCopy.scenarios.coverage}
                      </p>
                      <p className="mt-2 text-lg font-bold text-slate-900">
                        {Object.values(analysisReport.edgeCoverage).filter(Boolean).length}/
                        {Object.keys(analysisReport.edgeCoverage).length}
                      </p>
                    </div>
                  </div>
                  <div
                    aria-label={advancedCopy.aria.analysisResults}
                    className="space-y-2"
                  >
                    {analysisReport.issues.map((issue) => (
                      <article
                        key={issue.id}
                        className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-900">
                              {advancedCopy.analysisIssues[issue.code]}
                            </h4>
                            <span className="type-label-compact rounded-full bg-slate-100 px-2 py-1 font-bold text-slate-600">
                              {issue.severity === 'info'
                                ? advancedCopy.analysis.information
                                : issue.severity === 'warning'
                                  ? advancedCopy.analysis.warning
                                  : advancedCopy.analysis.critical}
                            </span>
                            {issue.estimated && (
                              <span className="type-label-compact rounded-full bg-amber-50 px-2 py-1 font-bold text-amber-700">
                                {advancedCopy.common.estimated}
                              </span>
                            )}
                          </div>
                          <p className="type-technical mt-2 font-mono text-slate-500">
                            {issue.nodeIds.join(', ')}
                            {issue.edgeIds.length > 0 ? ` · ${issue.edgeIds.join(', ')}` : ''}
                          </p>
                        </div>
                        {issue.nodeIds[0] && (
                          <button
                            type="button"
                            onClick={() => onFocusNode?.(issue.nodeIds[0]!)}
                            className={buttonClass}
                          >
                            {advancedCopy.analysis.focusItem}
                          </button>
                        )}
                      </article>
                    ))}
                    {analysisReport.issues.length === 0 && (
                      <div className="rounded-2xl bg-emerald-50 p-8 text-center text-sm font-semibold text-emerald-700">
                        {advancedCopy.analysis.noIssues}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center">
                  <Boxes className="mx-auto h-6 w-6 text-slate-400" />
                  <p className="mt-3 text-sm text-slate-500">
                    {advancedCopy.analysis.description}
                  </p>
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
