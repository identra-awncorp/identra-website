/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  CircleDashed,
  Copy,
  Database,
  FlaskConical,
  Focus,
  Play,
  Plus,
  Route,
  Trash2,
  X,
} from 'lucide-react';
import type { DashboardAdvancedCopy } from '../../translations/dashboard/DashboardAdvancedTranslations';
import type { DashboardCopy } from '../../translations/dashboard/DashboardPageTranslations';
import { DATABASE_SOURCES, isBuiltInModuleId } from './dashboardModuleRegistry';
import {
  createDashboardId,
  outcomesForNodeV2,
  resolveModuleContract,
} from './dashboardV2Model';
import type {
  DashboardWorkspaceV2,
  DatabaseNormalizedOutcome,
  DatabaseSourceFixture,
  DynamicFlowEdgeV2,
  DynamicFlowNodeV2,
  FlowField,
  FlowProjectV2,
  FlowScenario,
  NodeScenarioFixture,
  OutcomeId,
} from './dashboardV2Types';
import { simulateDynamicFlowV2 } from './flowSimulationEngine';
import {
  computeEdgeCoverage,
  runScenarioBatch,
  validateScenario,
  type ScenarioRunResult,
  type ScenarioRunSummary,
  type ScenarioValidationContext,
  type ScenarioValidationIssue,
} from './scenarioEngine';
import { useDialogFocus } from './useDialogFocus';

export type ScenarioSuiteDialogProps = {
  readonly open: boolean;
  readonly copy: DashboardCopy;
  readonly advancedCopy: DashboardAdvancedCopy;
  readonly project: FlowProjectV2;
  readonly workspace: DashboardWorkspaceV2;
  readonly onProjectChange: (project: FlowProjectV2) => void;
  readonly onClose: () => void;
  readonly onFocusUncoveredEdge?: (edgeId: string) => void;
};

type ScenarioUiStatus = 'passed' | 'failed' | 'invalid' | 'stale' | 'notRun';

const SYNTHETIC_INPUT_PRESET_IDS = [
  'synthetic-standard',
  'synthetic-alternative',
  'synthetic-unavailable',
] as const;

const SYNTHETIC_OUTPUT_PRESET_IDS = [
  'synthetic-valid',
  'synthetic-invalid',
  'synthetic-risk',
] as const;

const DATABASE_OUTCOMES = [
  'matched',
  'notMatched',
  'inconclusive',
  'sourceUnavailable',
] as const satisfies readonly DatabaseNormalizedOutcome[];

const STALE_VALIDATION_CODES = new Set<ScenarioValidationIssue['code']>([
  'staleNode',
  'unsupportedNodeOutcome',
  'staleDatabaseSource',
  'staleAssertionNode',
  'staleAssertionEdge',
  'staleAssertionField',
  'staleExpectedTerminal',
  'staleExpectedEdge',
]);

const classNames = (...values: readonly (string | false | null | undefined)[]) =>
  values.filter(Boolean).join(' ');

const outputFieldsForNode = (
  node: DynamicFlowNodeV2,
  workspace: DashboardWorkspaceV2,
): readonly FlowField[] => {
  if (node.kind === 'verification') {
    return resolveModuleContract(node.moduleRef, workspace.moduleCatalog)?.outputFields ?? [];
  }
  if (node.kind === 'subflow') {
    return workspace.subflowCatalog
      .find((item) => item.id === node.subflowRef.packageId)
      ?.versions.find((version) => version.version === node.subflowRef.version)
      ?.contract.outputFields ?? [];
  }
  return [];
};

const createValidationContext = (
  project: FlowProjectV2,
  workspace: DashboardWorkspaceV2,
): ScenarioValidationContext => ({
  manifest: project.flow,
  outputFieldsByNode: Object.fromEntries(
    project.flow.nodes.map((node) => [
      node.id,
      outputFieldsForNode(node, workspace),
    ]),
  ),
});

const nodeLabel = (
  node: DynamicFlowNodeV2,
  copy: DashboardCopy,
  workspace: DashboardWorkspaceV2,
): string => {
  if (node.name) return node.name;
  if (node.kind === 'start') return copy.builder.startNode;
  if (node.kind === 'condition') return copy.builder.conditionName;
  if (node.kind === 'terminal') {
    return node.terminalOutcome === 'success'
      ? copy.builder.successNode
      : copy.builder.failureNode;
  }
  if (node.kind === 'subflow') {
    return workspace.subflowCatalog
      .find((item) => item.id === node.subflowRef.packageId)
      ?.name ?? node.subflowRef.packageId;
  }
  if (isBuiltInModuleId(node.moduleRef.packageId)) {
    return copy.modules[node.moduleRef.packageId].name;
  }
  return workspace.moduleCatalog
    .find((item) => item.id === node.moduleRef.packageId)
    ?.name ?? node.moduleRef.packageId;
};

const outcomeLabel = (outcome: OutcomeId, copy: DashboardCopy): string => {
  const localized = (copy.outcomes as Readonly<Record<string, string>>)[outcome];
  return localized ?? outcome.replace(/^custom:/, '');
};

const databaseSourceLabel = (
  sourceId: string,
  copy: DashboardCopy,
): string => {
  const source = DATABASE_SOURCES.find((item) => item.id === sourceId);
  return source ? copy.databaseSources[source.id].name : sourceId;
};

const edgeLabel = (
  edge: DynamicFlowEdgeV2,
  project: FlowProjectV2,
  workspace: DashboardWorkspaceV2,
  copy: DashboardCopy,
): string => {
  const source = project.flow.nodes.find((node) => node.id === edge.source);
  const target = project.flow.nodes.find((node) => node.id === edge.target);
  return [
    source ? nodeLabel(source, copy, workspace) : edge.source,
    outcomeLabel(edge.outcome, copy),
    target ? nodeLabel(target, copy, workspace) : edge.target,
  ].join(' → ');
};

const fixtureScore = (
  outcome: DatabaseNormalizedOutcome,
): number | undefined => {
  if (outcome === 'matched') return 0.92;
  if (outcome === 'notMatched') return 0;
  if (outcome === 'inconclusive') return 0.5;
  return undefined;
};

const runResultStatus = (
  scenario: FlowScenario,
  issues: readonly ScenarioValidationIssue[],
  result?: ScenarioRunResult,
): ScenarioUiStatus => {
  if (issues.some((issue) => STALE_VALIDATION_CODES.has(issue.code))) return 'stale';
  if (issues.length > 0) return 'invalid';
  if (!result || result.status === 'skipped') return 'notRun';
  if (result.status === 'passed') return 'passed';
  return 'failed';
};

const createScenario = (
  project: FlowProjectV2,
  workspace: DashboardWorkspaceV2,
  advancedCopy: DashboardAdvancedCopy,
): FlowScenario => {
  const nodeFixtures: NodeScenarioFixture[] = project.flow.nodes
    .filter((node) => (
      node.kind === 'verification'
      && node.moduleRef.packageId !== 'database-cross-check'
    ) || node.kind === 'subflow')
    .map((node) => {
      const outcome = outcomesForNodeV2(node, workspace.moduleCatalog)[0]
        ?? 'success';
      return {
        nodeId: node.id,
        outcome,
        outputPresetId: 'synthetic-valid',
      };
    });
  const selectedSourceIds = new Set(
    project.flow.nodes.flatMap((node) => (
      node.kind === 'verification' ? node.selectedDatabaseSourceIds : []
    )),
  );
  const databaseFixtures: DatabaseSourceFixture[] = [...selectedSourceIds].map(
    (sourceId) => ({
      sourceId,
      outcome: 'notMatched',
      matchScore: 0,
    }),
  );
  const draft: FlowScenario = {
    id: createDashboardId('scenario'),
    name: `${advancedCopy.scenarios.title} ${project.scenarios.length + 1}`,
    enabled: true,
    inputPresetId: 'synthetic-standard',
    nodeFixtures,
    databaseFixtures,
    expectedEdgeIds: [],
    assertions: [],
  };
  const baseline = simulateDynamicFlowV2(project.flow, {
    scenario: draft,
    moduleCatalog: workspace.moduleCatalog,
    subflowCatalog: workspace.subflowCatalog,
  });
  return {
    ...draft,
    ...(baseline.terminalNodeId
      ? { expectedTerminalId: baseline.terminalNodeId }
      : {}),
    expectedEdgeIds: baseline.traversedEdgeIds,
  };
};

const duplicateScenario = (
  scenario: FlowScenario,
  copy: DashboardCopy,
): FlowScenario => ({
  ...scenario,
  id: createDashboardId('scenario'),
  name: `${scenario.name} ${copy.overview.copySuffix}`.trim(),
  assertions: scenario.assertions.map((assertion) => ({
    ...assertion,
    id: createDashboardId('assertion'),
  })),
});

const replaceTemplate = (
  value: string,
  replacements: Readonly<Record<string, string | number>>,
) => Object.entries(replacements).reduce(
  (result, [key, replacement]) =>
    result.replace(`{${key}}`, String(replacement)),
  value,
);

const StatusBadge = ({
  status,
  issueCount,
  copy,
  advancedCopy,
}: {
  readonly status: ScenarioUiStatus;
  readonly issueCount: number;
  readonly copy: DashboardCopy;
  readonly advancedCopy: DashboardAdvancedCopy;
}) => {
  const presentation = status === 'passed'
    ? {
        label: advancedCopy.scenarios.passed,
        icon: CheckCircle2,
        className: 'border-emerald-200 bg-emerald-50 text-emerald-700',
      }
    : status === 'stale'
      ? {
          label: advancedCopy.scenarios.stale,
          icon: AlertTriangle,
          className: 'border-amber-200 bg-amber-50 text-amber-800',
        }
      : status === 'invalid'
        ? {
            label: `${issueCount} ${copy.builder.issueCount}`,
            icon: AlertTriangle,
            className: 'border-rose-200 bg-rose-50 text-rose-700',
          }
        : status === 'failed'
          ? {
              label: advancedCopy.scenarios.failed,
              icon: AlertTriangle,
              className: 'border-rose-200 bg-rose-50 text-rose-700',
            }
          : {
              label: advancedCopy.scenarios.notRun,
              icon: CircleDashed,
              className: 'border-slate-200 bg-slate-50 text-slate-600',
            };
  const Icon = presentation.icon;
  return (
    <span
      data-status={status}
      className={classNames(
 'inline-flex items-center gap-1 rounded-full border px-2 py-1 font-bold',
 presentation.className,
 )}
    >
      <Icon className="h-3 w-3" aria-hidden="true" />
      {presentation.label}
    </span>
  );
};

export default function ScenarioSuiteDialog({
  open,
  copy,
  advancedCopy,
  project,
  workspace,
  onProjectChange,
  onClose,
  onFocusUncoveredEdge,
}: ScenarioSuiteDialogProps) {
  const dialogRef = useDialogFocus<HTMLDivElement>(open, onClose);
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(
    project.scenarios[0]?.id ?? null,
  );
  const [runResults, setRunResults] = useState<
    Readonly<Record<string, ScenarioRunResult>>
  >({});
  const [lastBatchSummary, setLastBatchSummary] =
    useState<ScenarioRunSummary | null>(null);
  const [runningScenarioIds, setRunningScenarioIds] = useState<
    ReadonlySet<string>
  >(new Set());
  const [batchRunning, setBatchRunning] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const validationContext = useMemo(
    () => createValidationContext(project, workspace),
    [project, workspace],
  );
  const issuesByScenarioId = useMemo(
    () => Object.fromEntries(
      project.scenarios.map((scenario) => [
        scenario.id,
        validateScenario(scenario, validationContext),
      ]),
    ) as Readonly<Record<string, readonly ScenarioValidationIssue[]>>,
    [project.scenarios, validationContext],
  );
  const selectedScenario = project.scenarios.find(
    (scenario) => scenario.id === selectedScenarioId,
  ) ?? null;
  const terminalNodes = project.flow.nodes.filter(
    (node) => node.kind === 'terminal',
  );
  const fixtureNodes = project.flow.nodes.filter((node) => (
    (node.kind === 'verification'
      && node.moduleRef.packageId !== 'database-cross-check')
    || node.kind === 'subflow'
  ));
  const selectedDatabaseSourceIds = useMemo(
    () => [...new Set(
      project.flow.nodes.flatMap((node) => (
        node.kind === 'verification' ? node.selectedDatabaseSourceIds : []
      )),
    )],
    [project.flow.nodes],
  );
  const coverage = useMemo(
    () => computeEdgeCoverage(project.flow, Object.values(runResults)),
    [project.flow, runResults],
  );

  useEffect(() => {
    if (
      selectedScenarioId
      && project.scenarios.some((scenario) => scenario.id === selectedScenarioId)
    ) {
      return;
    }
    setSelectedScenarioId(project.scenarios[0]?.id ?? null);
  }, [project.scenarios, selectedScenarioId]);

  useEffect(() => {
    setRunResults({});
    setLastBatchSummary(null);
  }, [project.flow]);

  if (!open) return null;

  const updateScenarios = (
    scenarios: readonly FlowScenario[],
    scenarioIdToSelect?: string | null,
  ) => {
    onProjectChange({
      ...project,
      scenarios,
    });
    if (scenarioIdToSelect !== undefined) {
      setSelectedScenarioId(scenarioIdToSelect);
    }
    setRunResults({});
    setLastBatchSummary(null);
  };

  const updateSelectedScenario = (
    updater: (scenario: FlowScenario) => FlowScenario,
  ) => {
    if (!selectedScenario) return;
    updateScenarios(
      project.scenarios.map((scenario) =>
        scenario.id === selectedScenario.id ? updater(scenario) : scenario),
    );
  };

  const handleCreate = () => {
    const scenario = createScenario(project, workspace, advancedCopy);
    updateScenarios([...project.scenarios, scenario], scenario.id);
  };

  const handleDuplicate = () => {
    if (!selectedScenario) return;
    const scenario = duplicateScenario(selectedScenario, copy);
    updateScenarios([...project.scenarios, scenario], scenario.id);
  };

  const handleDelete = () => {
    if (!selectedScenario || deleteConfirmId !== selectedScenario.id) return;
    const remaining = project.scenarios.filter(
      (scenario) => scenario.id !== selectedScenario.id,
    );
    updateScenarios(remaining, remaining[0]?.id ?? null);
    setDeleteConfirmId(null);
  };

  const scenarioExecutor = (scenario: FlowScenario) =>
    simulateDynamicFlowV2(project.flow, {
      scenario,
      moduleCatalog: workspace.moduleCatalog,
      subflowCatalog: workspace.subflowCatalog,
    });

  const handleQuickRun = async (scenario: FlowScenario) => {
    setRunningScenarioIds((current) => new Set([...current, scenario.id]));
    setLastBatchSummary(null);
    try {
      const summary = await runScenarioBatch(
        [scenario],
        validationContext,
        scenarioExecutor,
      );
      const result = summary.runs[0];
      if (result) {
        setRunResults((current) => ({
          ...current,
          [scenario.id]: result,
        }));
      }
    } finally {
      setRunningScenarioIds((current) => {
        const next = new Set(current);
        next.delete(scenario.id);
        return next;
      });
    }
  };

  const handleBatchRun = async () => {
    setBatchRunning(true);
    try {
      const summary = await runScenarioBatch(
        project.scenarios,
        validationContext,
        scenarioExecutor,
      );
      setRunResults(Object.fromEntries(
        summary.runs.map((run) => [run.scenarioId, run]),
      ));
      setLastBatchSummary(summary);
    } finally {
      setBatchRunning(false);
    }
  };

  const updateNodeFixture = (
    nodeId: string,
    update: Partial<Pick<NodeScenarioFixture, 'outcome' | 'outputPresetId'>>,
  ) => {
    updateSelectedScenario((scenario) => {
      const current = scenario.nodeFixtures.find(
        (fixture) => fixture.nodeId === nodeId,
      );
      const fixture: NodeScenarioFixture = {
        nodeId,
        outcome: update.outcome ?? current?.outcome ?? 'success',
        outputPresetId:
          update.outputPresetId ?? current?.outputPresetId ?? 'synthetic-valid',
      };
      return {
        ...scenario,
        nodeFixtures: current
          ? scenario.nodeFixtures.map((item) =>
              item.nodeId === nodeId ? fixture : item)
          : [...scenario.nodeFixtures, fixture],
      };
    });
  };

  const updateDatabaseFixture = (
    sourceId: string,
    outcome: DatabaseNormalizedOutcome,
  ) => {
    updateSelectedScenario((scenario) => {
      const fixture: DatabaseSourceFixture = {
        sourceId,
        outcome,
        ...(fixtureScore(outcome) === undefined
          ? {}
          : { matchScore: fixtureScore(outcome) }),
      };
      const exists = scenario.databaseFixtures.some(
        (item) => item.sourceId === sourceId,
      );
      return {
        ...scenario,
        databaseFixtures: exists
          ? scenario.databaseFixtures.map((item) =>
              item.sourceId === sourceId ? fixture : item)
          : [...scenario.databaseFixtures, fixture],
      };
    });
  };

  const addExpectedEdge = (edgeId: string) => {
    if (!edgeId) return;
    updateSelectedScenario((scenario) => ({
      ...scenario,
      expectedEdgeIds: scenario.expectedEdgeIds.includes(edgeId)
        ? scenario.expectedEdgeIds
        : [...scenario.expectedEdgeIds, edgeId],
    }));
  };

  const moveExpectedEdge = (index: number, offset: -1 | 1) => {
    updateSelectedScenario((scenario) => {
      const targetIndex = index + offset;
      if (targetIndex < 0 || targetIndex >= scenario.expectedEdgeIds.length) {
        return scenario;
      }
      const expectedEdgeIds = [...scenario.expectedEdgeIds];
      [expectedEdgeIds[index], expectedEdgeIds[targetIndex]] = [
        expectedEdgeIds[targetIndex],
        expectedEdgeIds[index],
      ];
      return { ...scenario, expectedEdgeIds };
    });
  };

  const removeExpectedEdge = (edgeId: string) => {
    updateSelectedScenario((scenario) => ({
      ...scenario,
      expectedEdgeIds: scenario.expectedEdgeIds.filter(
        (candidate) => candidate !== edgeId,
      ),
    }));
  };

  const databaseFixtureSourceIds = selectedScenario
    ? [...new Set([
        ...selectedDatabaseSourceIds,
        ...selectedScenario.databaseFixtures.map((fixture) => fixture.sourceId),
      ])]
    : selectedDatabaseSourceIds;
  const staleNodeFixtures = selectedScenario?.nodeFixtures.filter(
    (fixture) => !project.flow.nodes.some((node) => node.id === fixture.nodeId),
  ) ?? [];

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/55 p-3 backdrop-blur-sm sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="scenario-suite-title"
        tabIndex={-1}
        className="flex max-h-[94vh] w-full max-w-[1500px] flex-col overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl"
      >
        <header className="flex flex-wrap items-center gap-3 border-b border-slate-200 px-4 py-4 sm:px-6">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-[#354CE1]" aria-hidden="true" />
              <h2
                id="scenario-suite-title"
                className="type-card-title-sm text-slate-950"
              >
                {advancedCopy.scenarios.title}
              </h2>
            </div>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              {advancedCopy.scenarios.description}
            </p>
          </div>
          <button
            type="button"
            onClick={handleCreate}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#354CE1] px-4 text-xs font-bold text-white hover:bg-[#2F43C7]"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            {advancedCopy.scenarios.createScenario}
          </button>
          <button
            type="button"
            onClick={() => void handleBatchRun()}
            disabled={batchRunning || project.scenarios.length === 0}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 px-4 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Play className="h-4 w-4" aria-hidden="true" />
            {batchRunning
              ? advancedCopy.scenarios.running
              : advancedCopy.scenarios.runAll}
          </button>
          <button
            type="button"
            aria-label={advancedCopy.common.close}
            title={advancedCopy.common.close}
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        <div className="grid min-h-0 flex-1 lg:grid-cols-[270px_minmax(0,1fr)_300px]">
          <aside className="min-h-0 overflow-y-auto border-b border-slate-200 bg-slate-50/80 p-3 lg:border-b-0 lg:border-r">
            {project.scenarios.length > 0 ? (
              <div className="space-y-2">
                {project.scenarios.map((scenario) => {
                  const issues = issuesByScenarioId[scenario.id] ?? [];
                  const status = runResultStatus(
                    scenario,
                    issues,
                    runResults[scenario.id],
                  );
                  return (
                    <button
                      key={scenario.id}
                      type="button"
                      onClick={() => {
                        setSelectedScenarioId(scenario.id);
                        setDeleteConfirmId(null);
                      }}
                      className={classNames(
 'w-full rounded-2xl border p-3 text-left transition-colors',
 scenario.id === selectedScenarioId
 ? 'border-[#354CE1] bg-white shadow-sm'
 : 'border-slate-200 bg-white/70 hover:border-slate-300',
 )}
                    >
                      <div className="flex items-start gap-2">
                        <p className="min-w-0 flex-1 truncate text-xs font-bold text-slate-900">
                          {scenario.name}
                        </p>
                        <span
                          className={classNames(
 'mt-1 h-2 w-2 shrink-0 rounded-full',
 scenario.enabled ? 'bg-emerald-500' : 'bg-slate-300',
 )}
                          aria-label={
                            scenario.enabled
                              ? advancedCopy.common.enabled
                              : advancedCopy.common.disabled
                          }
                        />
                      </div>
                      <div className="mt-2">
                        <StatusBadge
                          status={status}
                          issueCount={issues.length}
                          copy={copy}
                          advancedCopy={advancedCopy}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-10 text-center">
                <FlaskConical
                  className="mx-auto h-7 w-7 text-slate-300"
                  aria-hidden="true"
                />
                <p className="mt-3 text-sm font-bold text-slate-800">
                  {advancedCopy.scenarios.emptyTitle}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {advancedCopy.scenarios.emptyDescription}
                </p>
                <button
                  type="button"
                  onClick={handleCreate}
                  className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#354CE1] px-4 text-xs font-bold text-white"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  {advancedCopy.scenarios.createScenario}
                </button>
              </div>
            )}
          </aside>

          <main className="min-h-0 overflow-y-auto p-4 sm:p-6">
            {selectedScenario ? (
              <div className="mx-auto max-w-3xl space-y-6">
                <section className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex flex-wrap items-end gap-3">
                    <label className="min-w-[220px] flex-1">
                      <span className="type-label-compact font-bold uppercase text-slate-500">
                        {advancedCopy.scenarios.scenarioName}
                      </span>
                      <input
                        type="text"
                        value={selectedScenario.name}
                        maxLength={80}
                        placeholder={advancedCopy.scenarios.scenarioNamePlaceholder}
                        onChange={(event) => {
                          const name = event.target.value.replace(/[\r\n]/g, ' ');
                          updateSelectedScenario((scenario) => ({
                            ...scenario,
                            name,
                          }));
                        }}
                        className="mt-1 min-h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-900 outline-none focus:border-[#354CE1] focus:ring-2 focus:ring-[#354CE1]/15"
                      />
                    </label>
                    <label className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 px-3 text-xs font-semibold text-slate-700">
                      <input
                        type="checkbox"
                        checked={selectedScenario.enabled}
                        onChange={(event) =>
                          updateSelectedScenario((scenario) => ({
                            ...scenario,
                            enabled: event.target.checked,
                          }))}
                        className="h-4 w-4 accent-[#354CE1]"
                      />
                      {advancedCopy.common.enabled}
                    </label>
                    <button
                      type="button"
                      onClick={handleDuplicate}
                      title={advancedCopy.scenarios.duplicateScenario}
                      aria-label={advancedCopy.scenarios.duplicateScenario}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
                    >
                      <Copy className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(selectedScenario.id)}
                      title={advancedCopy.scenarios.deleteScenario}
                      aria-label={advancedCopy.scenarios.deleteScenario}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>

                  {deleteConfirmId === selectedScenario.id && (
                    <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3">
                      <p className="text-xs font-bold text-rose-900">
                        {advancedCopy.modals.deleteScenarioTitle}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-rose-700">
                        {advancedCopy.modals.deleteScenarioDescription}
                      </p>
                      <div className="mt-3 flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(null)}
                          className="min-h-11 rounded-xl border border-rose-200 px-4 text-xs font-bold text-rose-700"
                        >
                          {advancedCopy.common.cancel}
                        </button>
                        <button
                          type="button"
                          onClick={handleDelete}
                          className="min-h-11 rounded-xl bg-rose-600 px-4 text-xs font-bold text-white"
                        >
                          {advancedCopy.common.delete}
                        </button>
                      </div>
                    </div>
                  )}
                </section>

                <section className="rounded-2xl border border-slate-200 p-4">
                  <label>
                    <span className="type-label-compact font-bold uppercase text-slate-500">
                      {advancedCopy.scenarios.syntheticPreset}
                    </span>
                    <select
                      value={selectedScenario.inputPresetId}
                      onChange={(event) =>
                        updateSelectedScenario((scenario) => ({
                          ...scenario,
                          inputPresetId: event.target.value,
                        }))}
                      className="mt-1 min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-[#354CE1]"
                    >
                      {!SYNTHETIC_INPUT_PRESET_IDS.includes(
                        selectedScenario.inputPresetId as typeof SYNTHETIC_INPUT_PRESET_IDS[number],
                      ) && (
                        <option value={selectedScenario.inputPresetId}>
                          {advancedCopy.scenarios.stale}
                        </option>
                      )}
                      <option value="synthetic-standard">
                        {copy.outcomes.success}
                      </option>
                      <option value="synthetic-alternative">
                        {copy.outcomes.notMatched}
                      </option>
                      <option value="synthetic-unavailable">
                        {copy.outcomes.sourceUnavailable}
                      </option>
                    </select>
                  </label>
                  <div className="mt-3 flex gap-2 rounded-xl border border-sky-200 bg-sky-50 p-3">
                    <FlaskConical
                      className="mt-0.5 h-4 w-4 shrink-0 text-sky-600"
                      aria-hidden="true"
                    />
                    <p className="text-xs leading-5 text-sky-800">
                      {advancedCopy.scenarios.syntheticNotice}
                    </p>
                  </div>
                </section>

                {fixtureNodes.length > 0 && (
                  <section className="rounded-2xl border border-slate-200 p-4">
                    <h3 className="type-card-title-sm text-slate-900">
                      {copy.builder.simulatorTitle}
                    </h3>
                    <div className="mt-3 space-y-3">
                      {fixtureNodes.map((node) => {
                        const fixture = selectedScenario.nodeFixtures.find(
                          (item) => item.nodeId === node.id,
                        );
                        const outcomes = outcomesForNodeV2(
                          node,
                          workspace.moduleCatalog,
                        );
                        const outcome = fixture?.outcome ?? outcomes[0] ?? 'success';
                        const staleOutcome = !outcomes.includes(outcome);
                        const outputPresetId =
                          fixture?.outputPresetId ?? 'synthetic-valid';
                        return (
                          <div
                            key={node.id}
                            className="grid gap-3 rounded-xl bg-slate-50 p-3 sm:grid-cols-[minmax(0,1fr)_180px_180px]"
                          >
                            <div className="min-w-0 self-center">
                              <p className="truncate text-xs font-bold text-slate-800">
                                {nodeLabel(node, copy, workspace)}
                              </p>
                              <p className="type-technical mt-0.5 truncate font-mono text-slate-400">
                                {node.id}
                              </p>
                            </div>
                            <label>
                              <span className="sr-only">{copy.builder.outcomeFor}</span>
                              <select
                                value={outcome}
                                onChange={(event) =>
                                  updateNodeFixture(node.id, {
                                    outcome: event.target.value as OutcomeId,
                                  })}
                                className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800"
                              >
                                {staleOutcome && (
                                  <option value={outcome}>
                                    {outcomeLabel(outcome, copy)}
                                    {' — '}
                                    {advancedCopy.scenarios.stale}
                                  </option>
                                )}
                                {outcomes.map((item) => (
                                  <option key={item} value={item}>
                                    {outcomeLabel(item, copy)}
                                  </option>
                                ))}
                              </select>
                            </label>
                            <label>
                              <span className="sr-only">
                                {advancedCopy.scenarios.syntheticPreset}
                              </span>
                              <select
                                value={outputPresetId}
                                onChange={(event) =>
                                  updateNodeFixture(node.id, {
                                    outputPresetId: event.target.value,
                                  })}
                                className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800"
                              >
                                {!SYNTHETIC_OUTPUT_PRESET_IDS.includes(
                                  outputPresetId as typeof SYNTHETIC_OUTPUT_PRESET_IDS[number],
                                ) && (
                                  <option value={outputPresetId}>
                                    {advancedCopy.scenarios.stale}
                                  </option>
                                )}
                                <option value="synthetic-valid">
                                  {copy.outcomes.success}
                                </option>
                                <option value="synthetic-invalid">
                                  {copy.outcomes.failure}
                                </option>
                                <option value="synthetic-risk">
                                  {copy.outcomes.matched}
                                </option>
                              </select>
                            </label>
                          </div>
                        );
                      })}
                      {staleNodeFixtures.map((fixture) => (
                        <div
                          key={`stale-${fixture.nodeId}`}
                          className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3"
                        >
                          <AlertTriangle
                            className="h-4 w-4 text-amber-700"
                            aria-hidden="true"
                          />
                          <code className="type-technical min-w-0 flex-1 truncate text-amber-900">
                            {fixture.nodeId}
                          </code>
                          <span className="type-label-compact font-bold text-amber-800">
                            {advancedCopy.scenarios.stale}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {databaseFixtureSourceIds.length > 0 && (
                  <section className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-center gap-2">
                      <Database
                        className="h-4 w-4 text-[#354CE1]"
                        aria-hidden="true"
                      />
                      <h3 className="type-card-title-sm text-slate-900">
                        {copy.builder.databaseSources}
                      </h3>
                    </div>
                    <div className="mt-3 space-y-2">
                      {databaseFixtureSourceIds.map((sourceId) => {
                        const fixture = selectedScenario.databaseFixtures.find(
                          (item) => item.sourceId === sourceId,
                        );
                        const stale = !selectedDatabaseSourceIds.includes(sourceId);
                        return (
                          <label
                            key={sourceId}
                            className="grid items-center gap-3 rounded-xl bg-slate-50 p-3 sm:grid-cols-[minmax(0,1fr)_200px]"
                          >
                            <span className="min-w-0">
                              <span className="block truncate text-xs font-bold text-slate-800">
                                {databaseSourceLabel(sourceId, copy)}
                              </span>
                              {stale && (
                                <span className="type-label-compact mt-1 block font-bold text-amber-700">
                                  {advancedCopy.scenarios.stale}
                                </span>
                              )}
                            </span>
                            <select
                              value={fixture?.outcome ?? 'notMatched'}
                              onChange={(event) =>
                                updateDatabaseFixture(
                                  sourceId,
                                  event.target.value as DatabaseNormalizedOutcome,
                                )}
                              className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800"
                            >
                              {DATABASE_OUTCOMES.map((outcome) => (
                                <option key={outcome} value={outcome}>
                                  {outcomeLabel(outcome, copy)}
                                </option>
                              ))}
                            </select>
                          </label>
                        );
                      })}
                    </div>
                  </section>
                )}

                <section className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center gap-2">
                    <Route className="h-4 w-4 text-[#354CE1]" aria-hidden="true" />
                    <h3 className="type-card-title-sm text-slate-900">
                      {advancedCopy.scenarios.expectedPath}
                    </h3>
                  </div>
                  <label className="mt-3 block">
                    <span className="type-label-compact font-bold uppercase text-slate-500">
                      {advancedCopy.scenarios.expectedTerminal}
                    </span>
                    <select
                      value={selectedScenario.expectedTerminalId ?? ''}
                      onChange={(event) =>
                        updateSelectedScenario((scenario) => ({
                          ...scenario,
                          ...(event.target.value
                            ? { expectedTerminalId: event.target.value }
                            : { expectedTerminalId: undefined }),
                        }))}
                      className="mt-1 min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900"
                    >
                      <option value="">{advancedCopy.common.optional}</option>
                      {selectedScenario.expectedTerminalId
                        && !terminalNodes.some(
                          (node) => node.id === selectedScenario.expectedTerminalId,
                        ) && (
                          <option value={selectedScenario.expectedTerminalId}>
                            {selectedScenario.expectedTerminalId}
                            {' — '}
                            {advancedCopy.scenarios.stale}
                          </option>
                        )}
                      {terminalNodes.map((node) => (
                        <option key={node.id} value={node.id}>
                          {nodeLabel(node, copy, workspace)}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className="mt-4 space-y-2">
                    {selectedScenario.expectedEdgeIds.map((edgeId, index) => {
                      const edge = project.flow.edges.find(
                        (candidate) => candidate.id === edgeId,
                      );
                      return (
                        <div
                          key={`${edgeId}-${index}`}
                          className={classNames(
 'flex items-center gap-2 rounded-xl border p-2',
 edge
 ? 'border-slate-200 bg-slate-50'
 : 'border-amber-200 bg-amber-50',
 )}
                        >
                          <span className="type-label-compact inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white font-bold text-slate-500">
                            {index + 1}
                          </span>
                          <span className="type-label-compact min-w-0 flex-1 truncate font-semibold text-slate-700">
                            {edge
                              ? edgeLabel(edge, project, workspace, copy)
                              : `${edgeId} — ${advancedCopy.scenarios.stale}`}
                          </span>
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => moveExpectedEdge(index, -1)}
                            title={advancedCopy.blocks.moveUp}
                            aria-label={advancedCopy.blocks.moveUp}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-white disabled:opacity-30"
                          >
                            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            disabled={
                              index === selectedScenario.expectedEdgeIds.length - 1
                            }
                            onClick={() => moveExpectedEdge(index, 1)}
                            title={advancedCopy.blocks.moveDown}
                            aria-label={advancedCopy.blocks.moveDown}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-white disabled:opacity-30"
                          >
                            <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeExpectedEdge(edgeId)}
                            title={advancedCopy.common.remove}
                            aria-label={advancedCopy.common.remove}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-rose-500 hover:bg-rose-50"
                          >
                            <X className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                        </div>
                      );
                    })}
                    {project.flow.edges.some(
                      (edge) => !selectedScenario.expectedEdgeIds.includes(edge.id),
                    ) && (
                      <select
                        value=""
                        aria-label={advancedCopy.scenarios.expectedPath}
                        onChange={(event) => addExpectedEdge(event.target.value)}
                        className="min-h-11 w-full rounded-xl border border-dashed border-slate-300 bg-white px-3 text-xs text-slate-600"
                      >
                        <option value="">
                          {advancedCopy.common.add}
                          {' — '}
                          {advancedCopy.scenarios.expectedPath}
                        </option>
                        {project.flow.edges
                          .filter(
                            (edge) =>
                              !selectedScenario.expectedEdgeIds.includes(edge.id),
                          )
                          .map((edge) => (
                            <option key={edge.id} value={edge.id}>
                              {edgeLabel(edge, project, workspace, copy)}
                            </option>
                          ))}
                      </select>
                    )}
                  </div>
                </section>

                <section className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 p-4">
                  <button
                    type="button"
                    disabled={
                      !selectedScenario.enabled
                      || batchRunning
                      || runningScenarioIds.has(selectedScenario.id)
                    }
                    onClick={() => void handleQuickRun(selectedScenario)}
                    className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#354CE1] px-5 text-xs font-bold text-white hover:bg-[#2F43C7] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Play className="h-4 w-4" aria-hidden="true" />
                    {runningScenarioIds.has(selectedScenario.id)
                      ? advancedCopy.scenarios.running
                      : advancedCopy.scenarios.run}
                  </button>
                  <div aria-live="polite">
                    <StatusBadge
                      status={runResultStatus(
                        selectedScenario,
                        issuesByScenarioId[selectedScenario.id] ?? [],
                        runResults[selectedScenario.id],
                      )}
                      issueCount={
                        (issuesByScenarioId[selectedScenario.id] ?? []).length
                      }
                      copy={copy}
                      advancedCopy={advancedCopy}
                    />
                  </div>
                  {selectedScenario.assertions.length > 0 && (
                    <p className="text-xs text-slate-500">
                      {advancedCopy.scenarios.assertions}
                      {': '}
                      {selectedScenario.assertions.length}
                    </p>
                  )}
                </section>
              </div>
            ) : (
              <div className="flex min-h-[360px] items-center justify-center">
                <div className="max-w-sm text-center">
                  <FlaskConical
                    className="mx-auto h-8 w-8 text-slate-300"
                    aria-hidden="true"
                  />
                  <h3 className="type-card-title-sm mt-3 text-slate-800">
                    {advancedCopy.scenarios.emptyTitle}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {advancedCopy.scenarios.emptyDescription}
                  </p>
                </div>
              </div>
            )}
          </main>

          <aside
            aria-label={advancedCopy.aria.scenarioResults}
            className="min-h-0 overflow-y-auto border-t border-slate-200 bg-slate-50/80 p-4 lg:border-l lg:border-t-0"
          >
            <section>
              <p className="type-label-compact font-bold uppercase text-slate-500">
                {advancedCopy.scenarios.coverage}
              </p>
              <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-end justify-between gap-3">
                  <strong className="font-display text-2xl text-slate-950">
                    {Math.round(coverage.coverage * 100)}
                    {'%'}
                  </strong>
                  <span className="type-label-compact font-semibold text-slate-500">
                    {coverage.coveredEdgeIds.length}
                    {' / '}
                    {project.flow.edges.length}
                  </span>
                </div>
                <div
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(coverage.coverage * 100)}
                  aria-label={advancedCopy.scenarios.coverage}
                  className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"
                >
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-[width] motion-reduce:transition-none"
                    style={{ width: `${coverage.coverage * 100}%` }}
                  />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-center">
                  <div className="rounded-xl bg-emerald-50 p-2">
                    <p className="text-sm font-bold text-emerald-700">
                      {coverage.coveredEdgeIds.length}
                    </p>
                    <p className="type-label-compact font-semibold text-emerald-700">
                      {advancedCopy.scenarios.coveredBranches}
                    </p>
                  </div>
                  <div className="rounded-xl bg-amber-50 p-2">
                    <p className="text-sm font-bold text-amber-700">
                      {coverage.uncoveredEdgeIds.length}
                    </p>
                    <p className="type-label-compact font-semibold text-amber-700">
                      {advancedCopy.scenarios.uncoveredBranches}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {lastBatchSummary && (
              <p
                aria-live="polite"
                className="mt-3 rounded-xl border border-slate-200 bg-white p-3 text-xs font-semibold text-slate-700"
              >
                {replaceTemplate(advancedCopy.scenarios.batchSummary, {
                  passed: lastBatchSummary.passed,
                  failed:
                    lastBatchSummary.failed
                    + lastBatchSummary.invalid
                    + lastBatchSummary.executionErrors,
                })}
              </p>
            )}

            <section className="mt-5">
              <p className="type-label-compact font-bold uppercase text-slate-500">
                {advancedCopy.scenarios.uncoveredBranches}
              </p>
              <div className="mt-2 space-y-2">
                {coverage.uncoveredEdgeIds.length > 0 ? (
                  coverage.uncoveredEdgeIds.map((edgeId) => {
                    const edge = project.flow.edges.find(
                      (candidate) => candidate.id === edgeId,
                    );
                    return (
                      <div
                        key={edgeId}
                        className="rounded-xl border border-amber-200 bg-white p-3"
                      >
                        <p className="type-label-compact line-clamp-2 font-semibold leading-4 text-slate-700">
                          {edge
                            ? edgeLabel(edge, project, workspace, copy)
                            : edgeId}
                        </p>
                        {onFocusUncoveredEdge && (
                          <button
                            type="button"
                            onClick={() => onFocusUncoveredEdge(edgeId)}
                            className="type-control-compact mt-2 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-amber-200 px-3 font-bold text-amber-800 hover:bg-amber-50"
                          >
                            <Focus className="h-3.5 w-3.5" aria-hidden="true" />
                            {advancedCopy.scenarios.focusBranch}
                          </button>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-200 bg-white p-5 text-center">
                    <CheckCircle2
                      className="mx-auto h-5 w-5 text-emerald-500"
                      aria-hidden="true"
                    />
                    <p className="type-label-compact mt-2 font-semibold text-slate-500">
                      {advancedCopy.common.noResults}
                    </p>
                  </div>
                )}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
