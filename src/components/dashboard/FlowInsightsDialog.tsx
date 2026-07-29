/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  useEffect,
  useMemo,
  useState,
  type KeyboardEvent,
} from 'react';
import {
  ArrowRight,
  CircleAlert,
  GitCompareArrows,
  Network,
  Search,
  ShieldAlert,
  Waypoints,
  X,
} from 'lucide-react';
import type { DashboardCopy } from '../../translations/dashboard/DashboardPageTranslations';
import {
  BUILT_IN_MODULE_IDS,
  type BuiltInModuleId,
} from './dashboardModuleRegistry';
import type {
  DashboardWorkspaceV2,
  DataClassification,
  DynamicFlowManifestV2,
  DynamicFlowNodeV2,
  FlowProjectContentV2,
  FlowProjectV2,
} from './dashboardV2Types';
import {
  buildDataLineage,
  diffFlowProjectContent,
  type DiffStatus,
  type FlowDiffChange,
  type FlowVisualDiff,
  type LineageEntity,
  type LineageLinkKind,
} from './flowInsightsEngine';
import { useDialogFocus } from './useDialogFocus';

type InsightsTab = 'diff' | 'lineage';

type ComparisonTarget = {
  readonly id: string;
  readonly label: string;
  readonly createdAt: string;
  readonly content: FlowProjectContentV2;
};

type FlowInsightsDialogProps = {
  readonly open: boolean;
  readonly copy: DashboardCopy;
  readonly project: FlowProjectV2;
  readonly workspace: DashboardWorkspaceV2;
  readonly onClose: () => void;
  readonly onFocusNode: (nodeId: string) => void;
};

const CLASSIFICATIONS: readonly DataClassification[] = [
  'publicMetadata',
  'internalMetadata',
  'pii',
  'sensitivePii',
  'biometric',
  'credential',
  'secret',
];

const STATUS_COLORS: Readonly<Record<DiffStatus, string>> = {
  added: '#10B981',
  removed: '#F43F5E',
  modified: '#F59E0B',
  unchanged: '#94A3B8',
};

const statusClasses = (status: DiffStatus): string => {
  if (status === 'added') return 'border-emerald-200 bg-emerald-50 text-emerald-700';
  if (status === 'removed') return 'border-rose-200 bg-rose-50 text-rose-700';
  if (status === 'modified') return 'border-amber-200 bg-amber-50 text-amber-700';
  return 'border-slate-200 bg-slate-50 text-slate-500';
};

const classificationClasses = (classification: DataClassification): string => {
  if (classification === 'secret' || classification === 'biometric') {
    return 'bg-rose-100 text-rose-700';
  }
  if (classification === 'sensitivePii' || classification === 'credential') {
    return 'bg-amber-100 text-amber-700';
  }
  if (classification === 'pii') return 'bg-violet-100 text-violet-700';
  if (classification === 'publicMetadata') return 'bg-emerald-100 text-emerald-700';
  return 'bg-slate-100 text-slate-600';
};

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
    return workspace.subflowCatalog.find(
      (item) => item.id === node.subflowRef.packageId,
    )?.name ?? node.subflowRef.packageId;
  }
  const moduleId = node.moduleRef.packageId;
  if (BUILT_IN_MODULE_IDS.includes(moduleId as BuiltInModuleId)) {
    return copy.modules[moduleId as BuiltInModuleId].name;
  }
  return workspace.moduleCatalog.find((item) => item.id === moduleId)?.name
    ?? moduleId;
};

const normalizePositions = (manifest: DynamicFlowManifestV2) => {
  const xs = manifest.nodes.map((node) => node.position.x);
  const ys = manifest.nodes.map((node) => node.position.y);
  const minX = Math.min(...xs, 0);
  const maxX = Math.max(...xs, minX + 1);
  const minY = Math.min(...ys, 0);
  const maxY = Math.max(...ys, minY + 1);
  return new Map(manifest.nodes.map((node) => [
    node.id,
    {
      x: 7 + ((node.position.x - minX) / Math.max(1, maxX - minX)) * 86,
      y: 10 + ((node.position.y - minY) / Math.max(1, maxY - minY)) * 80,
    },
  ]));
};

function DiffGraphPreview({
  title,
  manifest,
  diff,
  side,
  hideUnchanged,
  copy,
  workspace,
}: {
  readonly title: string;
  readonly manifest: DynamicFlowManifestV2;
  readonly diff: FlowVisualDiff;
  readonly side: 'before' | 'after';
  readonly hideUnchanged: boolean;
  readonly copy: DashboardCopy;
  readonly workspace: DashboardWorkspaceV2;
}) {
  const positions = normalizePositions(manifest);
  const nodeStatus = new Map(diff.nodes.map((item) => [item.id, item.status]));
  const edgeStatus = new Map(diff.edges.map((item) => [item.id, item.status]));
  const changedEdgeEndpoints = new Set(
    manifest.edges
      .filter((edge) => edgeStatus.get(edge.id) !== 'unchanged')
      .flatMap((edge) => [edge.source, edge.target]),
  );
  const visibleNodes = manifest.nodes.filter((node) =>
    !hideUnchanged
      || nodeStatus.get(node.id) !== 'unchanged'
      || changedEdgeEndpoints.has(node.id));
  const visibleNodeIds = new Set(visibleNodes.map((node) => node.id));
  const visibleEdges = manifest.edges.filter((edge) =>
    visibleNodeIds.has(edge.source)
      && visibleNodeIds.has(edge.target)
      && (!hideUnchanged || edgeStatus.get(edge.id) !== 'unchanged'));

  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xs font-bold text-slate-800">{title}</h3>
        <span className="type-technical font-mono text-slate-400">
          {side === 'before' ? copy.insights.before : copy.insights.currentDraft}
        </span>
      </div>
      <div className="relative mt-3 h-72 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
        >
          {visibleEdges.map((edge) => {
            const source = positions.get(edge.source);
            const target = positions.get(edge.target);
            if (!source || !target) return null;
            const status = edgeStatus.get(edge.id) ?? 'unchanged';
            return (
              <line
                key={edge.id}
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                stroke={STATUS_COLORS[status]}
                strokeWidth={status === 'unchanged' ? 0.55 : 1.1}
                strokeDasharray={status === 'removed' ? '2 1.5' : undefined}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>
        {visibleNodes.map((node) => {
          const position = positions.get(node.id);
          if (!position) return null;
          const status = nodeStatus.get(node.id) ?? 'unchanged';
          const contextual = hideUnchanged && status === 'unchanged';
          return (
            <div
              key={node.id}
              title={nodeLabel(node, copy, workspace)}
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                borderColor: STATUS_COLORS[status],
              }}
              className={`absolute w-28 -translate-x-1/2 -translate-y-1/2 rounded-lg border-2 bg-white px-2 py-1.5 shadow-sm ${
                contextual ? 'opacity-45' : ''
              }`}
            >
              <p className="type-label-compact truncate font-bold text-slate-800">
                {nodeLabel(node, copy, workspace)}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const lineageEntityLabel = (
  entity: LineageEntity,
  project: FlowProjectV2,
  copy: DashboardCopy,
  workspace: DashboardWorkspaceV2,
): string => {
  if (entity.kind === 'flowInput') return `flow.${entity.label}`;
  if (entity.kind === 'literal') return entity.label;
  const node = entity.nodeId
    ? project.flow.nodes.find((item) => item.id === entity.nodeId)
    : null;
  return node
    ? `${nodeLabel(node, copy, workspace)}.${entity.label}`
    : entity.label;
};

function LineageEntityCard({
  entity,
  label,
  copy,
  onFocus,
}: {
  readonly entity: LineageEntity;
  readonly label: string;
  readonly copy: DashboardCopy;
  readonly onFocus: (nodeId: string) => void;
}) {
  return (
    <div className={`min-w-0 flex-1 rounded-xl border p-3 ${
      entity.stale ? 'border-rose-200 bg-rose-50' : 'border-slate-200 bg-white'
    }`}>
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <p className="type-technical truncate font-mono font-bold text-slate-800">
            {label}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {entity.type && (
              <span className="type-label-compact rounded-md bg-slate-100 px-1.5 py-1 font-bold text-slate-500">
                {entity.type}
              </span>
            )}
            <span className={`type-label-compact rounded-md px-1.5 py-1 font-bold ${
              classificationClasses(entity.classification)
            }`}>
              {entity.classification}
            </span>
            {entity.stale && (
              <span className="type-label-compact inline-flex items-center gap-1 rounded-md bg-rose-100 px-1.5 py-1 font-bold text-rose-700">
                <CircleAlert className="h-3 w-3" />
                {copy.insights.stale}
              </span>
            )}
          </div>
        </div>
        {entity.nodeId && (
          <button
            type="button"
            aria-label={copy.insights.focusNode}
            title={copy.insights.focusNode}
            onClick={() => onFocus(entity.nodeId!)}
            className="shrink-0 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-[#354CE1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1]"
          >
            <Network className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

export function FlowInsightsDialog({
  open,
  copy,
  project,
  workspace,
  onClose,
  onFocusNode,
}: FlowInsightsDialogProps) {
  const [activeTab, setActiveTab] = useState<InsightsTab>('diff');
  const [comparisonId, setComparisonId] = useState('');
  const [hideUnchanged, setHideUnchanged] = useState(false);
  const [lineageSearch, setLineageSearch] = useState('');
  const [classification, setClassification] = useState<DataClassification | 'all'>('all');
  const dialogRef = useDialogFocus<HTMLDivElement>(open, onClose);

  const comparisons = useMemo<readonly ComparisonTarget[]>(() => [
    ...workspace.draftRevisions
      .filter((revision) => revision.projectId === project.id)
      .map((revision): ComparisonTarget => ({
        id: `revision:${revision.id}`,
        label: `${copy.insights.revision} #${revision.revision}`,
        createdAt: revision.createdAt,
        content: revision.snapshot.content,
      })),
    ...workspace.releases
      .filter((release) => release.projectId === project.id)
      .map((release): ComparisonTarget => ({
        id: `release:${release.id}`,
        label: `${copy.insights.release} ${release.version}`,
        createdAt: release.createdAt,
        content: release.snapshot.content,
      })),
  ].sort((left, right) => right.createdAt.localeCompare(left.createdAt)), [
    copy.insights.release,
    copy.insights.revision,
    project.id,
    workspace.draftRevisions,
    workspace.releases,
  ]);

  useEffect(() => {
    if (!open) return;
    setComparisonId((current) =>
      comparisons.some((item) => item.id === current)
        ? current
        : comparisons[0]?.id ?? '');
  }, [comparisons, open]);

  useEffect(() => {
    setLineageSearch('');
    setClassification('all');
  }, [project.id]);

  const comparison = comparisons.find((item) => item.id === comparisonId);
  const diff = useMemo(
    () => comparison
      ? diffFlowProjectContent(comparison.content, project)
      : null,
    [comparison, project],
  );
  const lineage = useMemo(
    () => buildDataLineage(
      project.flow,
      workspace.moduleCatalog,
      workspace.subflowCatalog,
    ),
    [
      project.flow,
      workspace.moduleCatalog,
      workspace.subflowCatalog,
    ],
  );
  const entityById = useMemo(
    () => new Map(lineage.entities.map((entity) => [entity.id, entity])),
    [lineage.entities],
  );
  const visibleLineageLinks = useMemo(() => {
    const query = lineageSearch.trim().toLocaleLowerCase();
    return lineage.links.filter((link) => {
      const source = entityById.get(link.sourceId);
      const target = entityById.get(link.targetId);
      if (!source || !target) return false;
      const classificationMatches = classification === 'all'
        || source.classification === classification
        || target.classification === classification;
      const searchable = [
        lineageEntityLabel(source, project, copy, workspace),
        lineageEntityLabel(target, project, copy, workspace),
      ].join(' ').toLocaleLowerCase();
      return classificationMatches && (!query || searchable.includes(query));
    });
  }, [
    classification,
    copy,
    entityById,
    lineage.links,
    lineageSearch,
    project,
    workspace,
  ]);

  if (!open) return null;

  const tabs: readonly {
    readonly id: InsightsTab;
    readonly label: string;
    readonly icon: typeof GitCompareArrows;
  }[] = [
    { id: 'diff', label: copy.insights.visualDiff, icon: GitCompareArrows },
    { id: 'lineage', label: copy.insights.dataLineage, icon: Waypoints },
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
      `[data-insights-tab="${tabs[nextIndex]!.id}"]`,
    )?.focus();
  };
  const focusNode = (nodeId: string) => {
    onFocusNode(nodeId);
    onClose();
  };
  const changeLabel = (change: FlowDiffChange) => copy.insights[change];
  const linkKindLabel = (kind: LineageLinkKind) => {
    if (kind === 'binding') return copy.insights.binding;
    if (kind === 'condition') return copy.insights.condition;
    return copy.insights.produces;
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6">
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
        aria-labelledby="flow-insights-title"
        tabIndex={-1}
        className="relative flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
          <div>
            <h2 id="flow-insights-title" className="type-card-title-sm text-slate-950">
              {copy.insights.title}
            </h2>
            <p className="type-body-sm mt-1 leading-5 text-slate-500">
              {copy.insights.description}
            </p>
          </div>
          <button
            type="button"
            aria-label={copy.close}
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1]"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div
          role="tablist"
          className="flex gap-1 border-b border-slate-200 bg-slate-50 px-5 pt-2 sm:px-6"
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
                data-insights-tab={tab.id}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className={`inline-flex items-center gap-2 border-b-2 px-3 py-3 text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1] ${
                  selected
                    ? 'border-[#354CE1] text-[#354CE1]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="sidebar-scrollbar min-h-0 flex-1 overflow-y-auto p-5 sm:p-6">
          {activeTab === 'diff' && (
            <section aria-labelledby="visual-diff-title">
              <div className="flex flex-wrap items-end gap-3">
                <div className="mr-auto">
                  <h3 id="visual-diff-title" className="type-card-title-sm text-slate-950">
                    {copy.insights.visualDiff}
                  </h3>
                  <p className="type-body-sm mt-1 leading-5 text-slate-500">
                    {copy.insights.visualDiffDescription}
                  </p>
                </div>
                {comparisons.length > 0 && (
                  <label className="block min-w-56">
                    <span className="type-label-compact font-bold uppercase text-slate-500">
                      {copy.insights.compareAgainst}
                    </span>
                    <select
                      value={comparisonId}
                      onChange={(event) => setComparisonId(event.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-[#354CE1]"
                    >
                      {comparisons.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.label} · {new Date(item.createdAt).toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
                <label className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-600">
                  <input
                    type="checkbox"
                    checked={hideUnchanged}
                    onChange={(event) => setHideUnchanged(event.target.checked)}
                    className="h-4 w-4 accent-[#354CE1]"
                  />
                  {copy.insights.hideUnchanged}
                </label>
              </div>

              {!comparison || !diff ? (
                <div className="mt-6 rounded-2xl border border-dashed border-slate-200 px-6 py-14 text-center">
                  <GitCompareArrows className="mx-auto h-7 w-7 text-slate-300" />
                  <p className="type-body-sm mx-auto mt-3 max-w-md leading-6 text-slate-500">
                    {copy.insights.noBaseline}
                  </p>
                </div>
              ) : (
                <>
                  <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {(['added', 'removed', 'modified', 'unchanged'] as const).map((status) => (
                      <div
                        key={status}
                        className={`rounded-xl border px-3 py-2.5 ${statusClasses(status)}`}
                      >
                        <p className="type-label-compact font-bold uppercase">
                          {copy.insights[status]}
                        </p>
                        <p className="mt-1 text-lg font-black">{diff.summary[status]}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 grid gap-4 lg:grid-cols-2">
                    <DiffGraphPreview
                      title={comparison.label}
                      manifest={comparison.content.flow}
                      diff={diff}
                      side="before"
                      hideUnchanged={hideUnchanged}
                      copy={copy}
                      workspace={workspace}
                    />
                    <DiffGraphPreview
                      title={copy.insights.currentDraft}
                      manifest={project.flow}
                      diff={diff}
                      side="after"
                      hideUnchanged={hideUnchanged}
                      copy={copy}
                      workspace={workspace}
                    />
                  </div>

                  <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
                    <div className="rounded-2xl border border-slate-200 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="text-xs font-bold text-slate-900">
                          {copy.insights.nodes} · {copy.insights.connections}
                        </h4>
                      </div>
                      <div className="mt-3 space-y-2">
                        {[...diff.nodes, ...diff.edges]
                          .filter((item) => !hideUnchanged || item.status !== 'unchanged')
                          .filter((item) => item.status !== 'unchanged')
                          .slice(0, 30)
                          .map((item) => {
                            const node = 'before' in item
                              ? item.after ?? item.before
                              : null;
                            const label = node && 'kind' in node
                              ? nodeLabel(node, copy, workspace)
                              : item.id;
                            return (
                              <div
                                key={`${item.id}-${item.status}`}
                                className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5"
                              >
                                <span className={`type-label-compact rounded-md border px-1.5 py-1 font-bold ${
                                  statusClasses(item.status)
                                }`}>
                                  {copy.insights[item.status]}
                                </span>
                                <span className="type-technical min-w-0 flex-1 truncate font-mono font-bold text-slate-700">
                                  {label}
                                </span>
                                {item.changes.length > 0 && (
                                  <span className="type-caption text-right text-slate-400">
                                    {item.changes.map(changeLabel).join(' · ')}
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        {diff.summary.added + diff.summary.removed + diff.summary.modified === 0 && (
                          <p className="type-body-sm py-8 text-center text-slate-400">
                            {copy.insights.noChanges}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 p-4">
                      <h4 className="text-xs font-bold text-slate-900">
                        {copy.insights.interfaceChanges}
                      </h4>
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 text-xs">
                          <span className="font-semibold text-slate-600">{copy.insights.screens}</span>
                          <span className="font-bold text-slate-900">
                            +{diff.screens.added} / −{diff.screens.removed} / ~{diff.screens.modified}
                          </span>
                        </div>
                        {([
                          [copy.insights.theme, diff.themeChanged],
                          [copy.insights.layout, diff.layoutChanged],
                          [copy.insights.locales, diff.localeChanged],
                        ] as const).map(([label, changed]) => (
                          <div
                            key={label}
                            className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 text-xs"
                          >
                            <span className="font-semibold text-slate-600">{label}</span>
                            <span className={`font-bold ${
                              changed ? 'text-amber-700' : 'text-slate-400'
                            }`}>
                              {changed ? copy.insights.modified : copy.insights.unchanged}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </section>
          )}

          {activeTab === 'lineage' && (
            <section aria-labelledby="data-lineage-title">
              <div>
                <h3 id="data-lineage-title" className="type-card-title-sm text-slate-950">
                  {copy.insights.dataLineage}
                </h3>
                <p className="type-body-sm mt-1 leading-5 text-slate-500">
                  {copy.insights.dataLineageDescription}
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {([
                  [copy.insights.fields, lineage.summary.fieldCount, Network],
                  [copy.insights.links, lineage.summary.linkCount, Waypoints],
                  [copy.insights.sensitive, lineage.summary.sensitiveCount, ShieldAlert],
                  [copy.insights.stale, lineage.summary.staleCount, CircleAlert],
                ] as const).map(([label, value, Icon]) => (
                  <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Icon className="h-3.5 w-3.5" />
                      <p className="type-label-compact font-bold uppercase">{label}</p>
                    </div>
                    <p className="mt-2 text-lg font-black text-slate-950">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <label className="relative min-w-0 flex-1">
                  <span className="sr-only">{copy.insights.searchLineage}</span>
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="search"
                    value={lineageSearch}
                    onChange={(event) => setLineageSearch(event.target.value)}
                    placeholder={copy.insights.searchLineage}
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-xs outline-none focus:border-[#354CE1]"
                  />
                </label>
                <label>
                  <span className="sr-only">{copy.insights.allClassifications}</span>
                  <select
                    value={classification}
                    onChange={(event) =>
                      setClassification(event.target.value as DataClassification | 'all')}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-[#354CE1] sm:w-56"
                  >
                    <option value="all">{copy.insights.allClassifications}</option>
                    {CLASSIFICATIONS.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:p-4">
                <div className="grid grid-cols-[minmax(0,1fr)_36px_minmax(0,1fr)] gap-2 px-1 pb-2">
                  <p className="type-label-compact font-bold uppercase text-slate-400">
                    {copy.insights.source}
                  </p>
                  <span />
                  <p className="type-label-compact font-bold uppercase text-slate-400">
                    {copy.insights.target}
                  </p>
                </div>
                <div className="space-y-2">
                  {visibleLineageLinks.map((link) => {
                    const source = entityById.get(link.sourceId);
                    const target = entityById.get(link.targetId);
                    if (!source || !target) return null;
                    return (
                      <div
                        key={link.id}
                        className={`grid grid-cols-[minmax(0,1fr)_36px_minmax(0,1fr)] items-center gap-2 rounded-xl ${
                          link.stale ? 'ring-2 ring-rose-200' : ''
                        }`}
                      >
                        <LineageEntityCard
                          entity={source}
                          label={lineageEntityLabel(source, project, copy, workspace)}
                          copy={copy}
                          onFocus={focusNode}
                        />
                        <div className="flex flex-col items-center gap-1 text-slate-400">
                          <ArrowRight className="h-4 w-4" />
                          <span className="type-label-compact max-w-16 text-center font-bold leading-3">
                            {linkKindLabel(link.kind)}
                          </span>
                        </div>
                        <LineageEntityCard
                          entity={target}
                          label={lineageEntityLabel(target, project, copy, workspace)}
                          copy={copy}
                          onFocus={focusNode}
                        />
                      </div>
                    );
                  })}
                  {visibleLineageLinks.length === 0 && (
                    <div className="px-4 py-14 text-center">
                      <Waypoints className="mx-auto h-7 w-7 text-slate-300" />
                      <p className="type-body-sm mt-3 text-slate-500">
                        {copy.insights.noLineage}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
