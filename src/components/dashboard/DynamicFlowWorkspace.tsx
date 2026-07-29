/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type DragEvent,
  type FormEvent,
  type MouseEvent as ReactMouseEvent,
} from 'react';
import {
  Background,
  BackgroundVariant,
  BaseEdge,
  Controls,
  EdgeLabelRenderer,
  Handle,
  MarkerType,
  MiniMap,
  Position,
  ReactFlow,
  type Connection,
  type Edge,
  type EdgeChange,
  type EdgeProps,
  type Node,
  type NodeProps,
  type OnSelectionChangeFunc,
  type ReactFlowInstance,
  getSmoothStepPath,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import {
  Activity,
  BadgeCheck,
  Braces,
  Bug,
  Check,
  ChevronRight,
  CircleDot,
  CircleStop,
  Database,
  GitCompareArrows,
  GitBranch,
  GraduationCap,
  HeartPulse,
  IdCard,
  Keyboard,
  LayoutGrid,
  ListChecks,
  Network,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  PanelTopClose,
  PanelTopOpen,
  Pause,
  Phone,
  Play,
  Plus,
  Redo2,
  RotateCcw,
  ScanFace,
  Search,
  ShieldCheck,
  SmartphoneNfc,
  StepForward,
  Trash2,
  Undo2,
  X,
  type LucideIcon,
} from 'lucide-react';
import type { DashboardCopy } from '../../translations/dashboard/DashboardPageTranslations';
import type { DashboardAdvancedCopy } from '../../translations/dashboard/DashboardAdvancedTranslations';
import {
  BUILT_IN_MODULE_IDS,
  type BuiltInModuleId,
} from './dashboardModuleRegistry';
import {
  createConditionNodeV2,
  createDashboardId,
  createEmptyConditionGroup,
  createVerificationNodeV2,
  outcomesForNodeV2,
  reconcileInterfaceManifestV2,
  wouldCreateCycleV2,
} from './dashboardV2Model';
import { simulateDynamicFlowV2 } from './flowSimulationEngine';
import { validateDynamicFlowV2 } from './dashboardValidation';
import type { FlowValidationCode as FlowValidationCodeV2 } from './dashboardValidation';
import {
  appendBoundedDraftRevision,
  createDraftRevisionSnapshot,
} from './releaseEngine';
import type {
  ConditionDefinition,
  DashboardWorkspaceV2,
  DynamicFlowEdgeV2,
  DynamicFlowManifestV2,
  DynamicFlowNodeV2,
  FlowField,
  FlowProjectV2,
  IssuerPolicy,
  ModulePackage,
  OutcomeId,
  ScenarioExecutionResult,
} from './dashboardV2Types';
import FlowInspectorAdvanced from './FlowInspectorAdvanced';
import { FlowOperationsDialog } from './FlowOperationsDialog';
import { FlowInsightsDialog } from './FlowInsightsDialog';
import ScenarioSuiteDialog from './ScenarioSuiteDialog';
import { useDialogFocus } from './useDialogFocus';
import {
  clampContextMenuPosition,
  duplicateFlowSelection,
  isEditableShortcutTarget,
  resolveDynamicFlowShortcut,
} from './dynamicFlowShortcuts';
import {
  autoLayoutDynamicFlow,
  insertNodeOnEdge,
} from './flowEditorOperations';
import {
  continueFlowDebugger,
  explainSimulationStep,
  startFlowDebugger,
  stepFlowDebugger,
  type FlowDebuggerSession,
} from './flowDebugger';

type FlowNodeData = {
  readonly title: string;
  readonly description: string;
  readonly kind: DynamicFlowNodeV2['kind'];
  readonly outcomes: readonly {
    readonly id: OutcomeId;
    readonly label: string;
  }[];
  readonly connectionLabel: string;
  readonly issueCount: number;
  readonly simulationOrder?: number;
  readonly hasBreakpoint: boolean;
  readonly breakpointLabel: string;
  readonly debuggerActive: boolean;
};

type FlowUiNode = Node<FlowNodeData>;
type FlowEdgeData = {
  readonly outcomeLabel: string;
  readonly quickInsertLabel: string;
  readonly onQuickInsert: (edgeId: string) => void;
};
type FlowUiEdge = Edge<FlowEdgeData, 'flowConnection'>;

type FlowHistory = {
  readonly past: readonly DynamicFlowManifestV2[];
  readonly present: DynamicFlowManifestV2;
  readonly future: readonly DynamicFlowManifestV2[];
};

type CanvasContextMenu =
  | {
      readonly kind: 'node';
      readonly nodeId: string;
      readonly x: number;
      readonly y: number;
    }
  | {
      readonly kind: 'edge';
      readonly edgeId: string;
      readonly x: number;
      readonly y: number;
    };

const CONTEXT_MENU_WIDTH = 224;
const NODE_CONTEXT_MENU_HEIGHT = 252;
const EDGE_CONTEXT_MENU_HEIGHT = 172;
const DUPLICATE_SHORTCUT_LABEL = 'Ctrl/⌘ D';

type DynamicFlowWorkspaceProps = {
  readonly copy: DashboardCopy;
  readonly advancedCopy: DashboardAdvancedCopy;
  readonly project: FlowProjectV2;
  readonly workspace: DashboardWorkspaceV2;
  readonly onProjectChange: (project: FlowProjectV2) => void;
  readonly onWorkspaceChange: (workspace: DashboardWorkspaceV2) => void;
  readonly onOpenStudio: () => void;
};

type CustomModuleForm = {
  readonly name: string;
  readonly version: string;
  readonly description: string;
  readonly credentialType: string;
  readonly didResolverUrl: string;
  readonly verificationMethod: string;
  readonly issuerMode: IssuerPolicy['mode'];
  readonly issuerValue: string;
  readonly inputSchema: string;
  readonly outputSchema: string;
  readonly uiTitle: string;
  readonly uiDescription: string;
  readonly uiAction: string;
};

const MODULE_ICONS: Record<BuiltInModuleId, LucideIcon> = {
  'citizen-id': IdCard,
  'driver-license': BadgeCheck,
  'health-insurance': HeartPulse,
  'phone-verification': Phone,
  'nfc-scan': SmartphoneNfc,
  'education-issuer': GraduationCap,
  'education-trust-framework': ShieldCheck,
  'face-liveness': ScanFace,
  'face-data-match': Activity,
  'database-cross-check': Database,
};

const EMPTY_CUSTOM_MODULE_FORM: CustomModuleForm = {
  name: '',
  version: '1.0.0',
  description: '',
  credentialType: '',
  didResolverUrl: '',
  verificationMethod: 'assertionMethod',
  issuerMode: 'exactDid',
  issuerValue: '',
  inputSchema: 'credential:object!',
  outputSchema: 'verified:boolean!',
  uiTitle: '',
  uiDescription: '',
  uiAction: '',
};

const createEdgeId = () => {
  const suffix = typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `edge-${suffix}`;
};

const fieldClassification = (name: string): FlowField['classification'] => {
  const normalized = name.toLowerCase();
  if (normalized.includes('credential')) return 'credential';
  if (normalized.includes('face') || normalized.includes('biometric')) return 'biometric';
  if (
    normalized.includes('identity')
    || normalized.includes('phone')
    || normalized.includes('document')
  ) return 'sensitivePii';
  if (normalized.includes('name') || normalized.includes('birth')) return 'pii';
  return 'internalMetadata';
};

const parseSchema = (value: string): readonly FlowField[] | null => {
  const entries = value.split(',').map((entry) => entry.trim()).filter(Boolean);
  if (entries.length === 0) return [];

  const fields: FlowField[] = [];
  for (const entry of entries) {
    const [rawName, rawType] = entry.split(':').map((part) => part.trim());
    if (!rawName || !rawType) return null;
    const required = rawType.endsWith('!');
    const type = (required ? rawType.slice(0, -1) : rawType) as FlowField['type'];
    if (!['string', 'number', 'boolean', 'object', 'array'].includes(type)) return null;
    if (fields.some((field) => field.id === rawName)) return null;
    const classification = fieldClassification(rawName);
    fields.push({
      id: rawName,
      key: rawName,
      type,
      format: 'none',
      required,
      classification,
      safeForResult: classification === 'publicMetadata' || classification === 'internalMetadata',
    });
  }
  return fields;
};

const nodeTitle = (
  node: DynamicFlowNodeV2,
  copy: DashboardCopy,
  moduleCatalog: readonly ModulePackage[],
  subflowCatalog: DashboardWorkspaceV2['subflowCatalog'],
): string => {
  if (node.kind === 'start') return copy.builder.startNode;
  if (node.kind === 'condition') return copy.builder.conditionName;
  if (node.kind === 'terminal') {
    return node.terminalOutcome === 'success'
      ? copy.builder.successNode
      : copy.builder.failureNode;
  }
  if (node.kind === 'subflow') {
    return subflowCatalog.find((item) => item.id === node.subflowRef.packageId)?.name
      ?? copy.builder.customModuleName;
  }
  const moduleId = node.moduleRef.packageId;
  if (BUILT_IN_MODULE_IDS.includes(moduleId as BuiltInModuleId)) {
    return copy.modules[moduleId as BuiltInModuleId].name;
  }
  return moduleCatalog.find((module) => module.id === moduleId)?.name
    ?? copy.builder.customModuleName;
};

const nodeDescription = (
  node: DynamicFlowNodeV2,
  copy: DashboardCopy,
  moduleCatalog: readonly ModulePackage[],
  subflowCatalog: DashboardWorkspaceV2['subflowCatalog'],
): string => {
  if (node.kind === 'start') return copy.outcomes.next;
  if (node.kind === 'condition') {
    return node.condition.legacyExpression || copy.builder.conditionDescription;
  }
  if (node.kind === 'terminal') {
    return node.terminalOutcome === 'success'
      ? copy.screenDefaults.success.body
      : copy.screenDefaults.error.body;
  }
  if (node.kind === 'subflow') {
    return subflowCatalog
      .find((item) => item.id === node.subflowRef.packageId)
      ?.versions.find((version) => version.version === node.subflowRef.version)
      ?.contract
      ? copy.builder.conditionDescription
      : copy.builder.customModuleDescription;
  }
  const moduleId = node.moduleRef.packageId;
  if (BUILT_IN_MODULE_IDS.includes(moduleId as BuiltInModuleId)) {
    return copy.modules[moduleId as BuiltInModuleId].description;
  }
  return moduleCatalog
    .find((module) => module.id === moduleId)
    ?.versions.find((version) => version.version === node.moduleRef.version)
    ?.definition?.description
    ?? copy.builder.customModuleDescription;
};

function VerificationNodeCard({ data, selected }: NodeProps<FlowUiNode>) {
  const isTerminal = data.kind === 'terminal';
  const isStart = data.kind === 'start';
  const isCondition = data.kind === 'condition';
  const accent = isTerminal
    ? data.title.toLocaleLowerCase().includes('success')
      ? 'border-emerald-300'
      : 'border-rose-300'
    : isStart
      ? 'border-slate-400'
      : isCondition
        ? 'border-violet-300'
        : 'border-indigo-300';

  return (
    <div className={`relative w-[228px] rounded-2xl border-2 bg-white p-4 shadow-lg shadow-slate-300/20 transition ${
 selected ? 'border-[#354CE1] ring-4 ring-[#354CE1]/10' : accent
 } ${data.simulationOrder !== undefined ? 'ring-4 ring-emerald-300/40' : ''} ${
 data.debuggerActive ? 'border-amber-400 ring-4 ring-amber-300/40' : ''
 }`}>
      {!isStart && (
        <Handle
          type="target"
          position={Position.Left}
          aria-label={data.connectionLabel}
          className="!h-3 !w-3 !border-2 !border-white !bg-slate-500"
        />
      )}
      <div className="flex items-start gap-3">
        <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
 isTerminal
 ? 'bg-slate-100 text-slate-700'
 : isCondition
 ? 'bg-violet-50 text-violet-600'
 : 'bg-[#EEF0FF] text-[#354CE1]'
 }`}>
          {isTerminal ? <CircleStop className="h-4 w-4" /> : isCondition ? <GitBranch className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
      </span>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="truncate text-xs font-bold text-slate-950">{data.title}</p>
            {data.issueCount > 0 && (
              <span className="type-label-compact flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-100 px-1 font-bold text-rose-700">
                {data.issueCount}
              </span>
            )}
          </div>
          <p className="type-caption mt-1 line-clamp-2 leading-4 text-slate-500">{data.description}</p>
        </div>
      </div>

      {data.outcomes.length > 0 && (
        <div className="mt-3 space-y-1 border-t border-slate-100 pt-2">
          {data.outcomes.map((outcome) => (
            <div key={outcome.id} className="type-label-compact relative flex min-h-5 items-center justify-end gap-2 pr-1 font-bold text-slate-500">
              <span>{outcome.label}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
              <Handle
                type="source"
                id={outcome.id}
                position={Position.Right}
                aria-label={[data.connectionLabel, outcome.label].join(ACCESSIBLE_LABEL_SEPARATOR)}
                style={{
                  right: '-16px',
                }}
                className="!h-3 !w-3 !border-2 !border-white !bg-[#354CE1]"
              />
            </div>
          ))}
        </div>
      )}

      {data.simulationOrder !== undefined && (
        <span className="type-label-compact absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 font-bold text-white shadow">
          {data.simulationOrder + 1}
        </span>
      )}
      {data.hasBreakpoint && (
        <span
          title={data.breakpointLabel}
          className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-rose-500 text-white shadow"
        >
          <CircleDot className="h-3.5 w-3.5" />
        </span>
      )}
    </div>
  );
}

function FlowConnectionEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  style,
  selected,
  data,
}: EdgeProps<FlowUiEdge>) {
  const [path, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        markerEnd={markerEnd}
        style={style}
        interactionWidth={28}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
          }}
          className={`nodrag nopan pointer-events-auto absolute flex items-center gap-1 rounded-lg border bg-white p-1 shadow-sm transition ${
            selected
              ? 'border-[#AAB3FF] ring-2 ring-[#354CE1]/15'
              : 'border-slate-200'
          }`}
        >
          <span className={`type-label-compact px-1 font-bold ${
            selected ? 'text-[#2739B8]' : 'text-slate-500'
          }`}>
            {data?.outcomeLabel}
          </span>
          <button
            type="button"
            aria-label={data?.quickInsertLabel}
            title={data?.quickInsertLabel}
            onMouseDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              data?.onQuickInsert(id);
            }}
            className={`flex h-6 w-6 items-center justify-center rounded-md bg-[#EEF0FF] text-[#354CE1] transition hover:bg-[#DDE1FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1] ${
              selected ? 'opacity-100' : 'opacity-70 hover:opacity-100'
            }`}
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

const NODE_TYPES = {
  verificationNode: VerificationNodeCard,
};
const EDGE_TYPES = {
  flowConnection: FlowConnectionEdge,
};
const MINIMAP_MASK_COLOR = 'rgba(248, 250, 252, 0.78)';
const ACCESSIBLE_LABEL_SEPARATOR = ': ';

const validationMessage = (
  code: FlowValidationCodeV2,
  copy: DashboardCopy,
  advancedCopy: DashboardAdvancedCopy,
): string => {
  switch (code) {
    case 'missingStart':
    case 'multipleStarts':
    case 'brokenEdge':
    case 'unreachableNode':
    case 'missingOutcome':
    case 'terminalHasOutput':
    case 'cycleDetected':
    case 'missingModule':
    case 'missingDatabaseSource':
      return copy.validation[code];
    case 'missingRequiredInput':
      return advancedCopy.mappingIssues.missingRequiredInput;
    case 'duplicateTargetBinding':
      return advancedCopy.mappingIssues.duplicateBinding;
    case 'missingBindingSource':
    case 'missingBindingField':
      return advancedCopy.mappingIssues.staleBinding;
    case 'nonUpstreamBinding':
      return advancedCopy.mappingIssues.sourceNotUpstream;
    case 'bindingTypeMismatch':
    case 'conditionOperatorTypeMismatch':
      return advancedCopy.mappingIssues.incompatibleType;
    case 'sensitiveLiteralRejected':
      return advancedCopy.mappingIssues.sensitiveLiteralRejected;
    case 'legacyConditionRequiresMigration':
      return advancedCopy.mappingIssues.legacyCondition;
    case 'missingSubflow':
      return advancedCopy.mappingIssues.missingModuleVersion;
    case 'invalidDatabaseStrategy':
      return advancedCopy.databaseStrategy.description;
    case 'emptyCondition':
      return advancedCopy.conditions.description;
    case 'staleConditionReference':
      return advancedCopy.mappingIssues.staleBinding;
  }
};

export default function DynamicFlowWorkspace({
  copy,
  advancedCopy,
  project,
  workspace,
  onProjectChange,
  onWorkspaceChange,
  onOpenStudio,
}: DynamicFlowWorkspaceProps) {
  const [history, setHistory] = useState<FlowHistory>({
    past: [],
    present: project.flow,
    future: [],
  });
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedNodeIds, setSelectedNodeIds] = useState<readonly string[]>([]);
  const [selectedEdgeIds, setSelectedEdgeIds] = useState<readonly string[]>([]);
  const [contextMenu, setContextMenu] = useState<CanvasContextMenu | null>(null);
  const [toolbarVisible, setToolbarVisible] = useState(true);
  const [libraryVisible, setLibraryVisible] = useState(true);
  const [inspectorVisible, setInspectorVisible] = useState(true);
  const [search, setSearch] = useState('');
  const [flowInstance, setFlowInstance] = useState<ReactFlowInstance<FlowUiNode, FlowUiEdge> | null>(null);
  const [simulatorOpen, setSimulatorOpen] = useState(false);
  const [scenarioSuiteOpen, setScenarioSuiteOpen] = useState(false);
  const [operationsOpen, setOperationsOpen] = useState(false);
  const [insightsOpen, setInsightsOpen] = useState(false);
  const [customModuleOpen, setCustomModuleOpen] = useState(false);
  const [quickInsertEdgeId, setQuickInsertEdgeId] = useState<string | null>(null);
  const [quickInsertSearch, setQuickInsertSearch] = useState('');
  const simulatorDialogRef = useDialogFocus<HTMLDivElement>(
    simulatorOpen,
    () => setSimulatorOpen(false),
  );
  const customModuleDialogRef = useDialogFocus<HTMLFormElement>(
    customModuleOpen,
    () => setCustomModuleOpen(false),
  );
  const quickInsertDialogRef = useDialogFocus<HTMLDivElement>(
    quickInsertEdgeId !== null,
    () => setQuickInsertEdgeId(null),
  );
  const [customForm, setCustomForm] = useState<CustomModuleForm>(EMPTY_CUSTOM_MODULE_FORM);
  const [schemaError, setSchemaError] = useState(false);
  const [simulatorOutcomes, setSimulatorOutcomes] = useState<Record<string, OutcomeId>>({});
  const [simulation, setSimulation] = useState<ScenarioExecutionResult | null>(null);
  const [breakpointNodeIds, setBreakpointNodeIds] = useState<readonly string[]>([]);
  const [debuggerSession, setDebuggerSession] = useState<FlowDebuggerSession | null>(null);
  const [inspectedStepIndex, setInspectedStepIndex] = useState<number | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const noticeTimerRef = useRef<number | null>(null);
  const canvasSectionRef = useRef<HTMLElement | null>(null);
  const contextMenuRef = useRef<HTMLDivElement | null>(null);
  const activeProjectIdRef = useRef(project.id);

  const handleSelectionChange = useCallback<OnSelectionChangeFunc<FlowUiNode, FlowUiEdge>>(
    ({ nodes: selectedNodes, edges: selectedEdges }) => {
      const ids = selectedNodes.map((node) => node.id);
      const edgeIds = selectedEdges.map((edge) => edge.id);
      setSelectedNodeIds((current) => (
        current.length === ids.length
        && current.every((id, index) => id === ids[index])
          ? current
          : ids
      ));
      setSelectedEdgeIds((current) => (
        current.length === edgeIds.length
        && current.every((id, index) => id === edgeIds[index])
          ? current
          : edgeIds
      ));
      const nextSelectedNodeId = ids.length === 1 ? ids[0] ?? null : null;
      setSelectedNodeId((current) => (
        current === nextSelectedNodeId ? current : nextSelectedNodeId
      ));
    },
    [],
  );

  useEffect(() => {
    if (activeProjectIdRef.current !== project.id) {
      activeProjectIdRef.current = project.id;
      setHistory({ past: [], present: project.flow, future: [] });
      setSelectedNodeId(null);
      setSelectedNodeIds([]);
      setSelectedEdgeIds([]);
      setContextMenu(null);
      setQuickInsertEdgeId(null);
      setInsightsOpen(false);
      setSimulation(null);
      setBreakpointNodeIds([]);
      setDebuggerSession(null);
      setInspectedStepIndex(null);
    }
  }, [project.flow, project.id]);

  useEffect(() => () => {
    if (noticeTimerRef.current !== null) window.clearTimeout(noticeTimerRef.current);
  }, []);

  useEffect(() => {
    if (simulation) return;
    setDebuggerSession(null);
    setInspectedStepIndex(null);
  }, [simulation]);

  const showNotice = useCallback((message: string) => {
    setNotice(message);
    if (noticeTimerRef.current !== null) window.clearTimeout(noticeTimerRef.current);
    noticeTimerRef.current = window.setTimeout(() => setNotice(null), 3200);
  }, []);

  const openQuickInsert = useCallback((edgeId: string) => {
    setContextMenu(null);
    setSelectedNodeId(null);
    setSelectedNodeIds([]);
    setSelectedEdgeIds([edgeId]);
    setInspectorVisible(true);
    setQuickInsertSearch('');
    setQuickInsertEdgeId(edgeId);
  }, []);

  const validationIssues = useMemo(
    () => validateDynamicFlowV2(
      history.present,
      workspace.moduleCatalog,
      workspace.subflowCatalog,
    ),
    [history.present, workspace.moduleCatalog, workspace.subflowCatalog],
  );
  const selectedNode = history.present.nodes.find((node) => node.id === selectedNodeId) ?? null;
  const selectedEdge = selectedEdgeIds.length === 1
    ? history.present.edges.find((edge) => edge.id === selectedEdgeIds[0]) ?? null
    : null;
  const revealedSimulationSteps = useMemo(
    () => simulation
      ? simulation.steps.slice(
          0,
          debuggerSession ? debuggerSession.activeStepIndex + 1 : simulation.steps.length,
        )
      : [],
    [debuggerSession, simulation],
  );
  const simulationOrder = useMemo(
    () => new Map(revealedSimulationSteps.map((step, index) => [step.nodeId, index])),
    [revealedSimulationSteps],
  );

  const toUiNode = useCallback((node: DynamicFlowNodeV2): FlowUiNode => ({
    id: node.id,
    type: 'verificationNode',
    position: node.position,
    selected: selectedNodeIds.includes(node.id),
    data: {
      title: nodeTitle(node, copy, workspace.moduleCatalog, workspace.subflowCatalog),
      description: nodeDescription(node, copy, workspace.moduleCatalog, workspace.subflowCatalog),
      kind: node.kind,
      outcomes: outcomesForNodeV2(node, workspace.moduleCatalog).map((outcome) => ({
        id: outcome,
        label: copy.outcomes[outcome as keyof typeof copy.outcomes] ?? outcome,
      })),
      connectionLabel: copy.builder.connectionHandle,
      issueCount: validationIssues.filter((issue) => issue.nodeId === node.id).length,
      simulationOrder: simulationOrder.get(node.id),
      hasBreakpoint: breakpointNodeIds.includes(node.id),
      breakpointLabel: copy.debugger.removeBreakpoint,
      debuggerActive: debuggerSession?.status === 'paused'
        && simulation?.steps[debuggerSession.activeStepIndex]?.nodeId === node.id,
    },
    deletable: node.kind !== 'start' && node.kind !== 'terminal',
  }), [
    copy,
    breakpointNodeIds,
    debuggerSession,
    selectedNodeIds,
    simulation,
    simulationOrder,
    validationIssues,
    workspace.moduleCatalog,
    workspace.subflowCatalog,
  ]);

  const toUiEdge = useCallback((edge: DynamicFlowEdgeV2): FlowUiEdge => {
    const simulated = revealedSimulationSteps.some(
        (step, index) => step.nodeId === edge.source
          && revealedSimulationSteps[index + 1]?.nodeId === edge.target,
      ) ?? false;
    const selected = selectedEdgeIds.includes(edge.id);
    const stroke = simulated ? '#10B981' : selected ? '#354CE1' : '#94A3B8';
    return {
      id: edge.id,
      type: 'flowConnection',
      source: edge.source,
      target: edge.target,
      sourceHandle: edge.outcome,
      data: {
        outcomeLabel: copy.outcomes[edge.outcome as keyof typeof copy.outcomes] ?? edge.outcome,
        quickInsertLabel: copy.builder.quickInsert,
        onQuickInsert: openQuickInsert,
      },
      markerEnd: { type: MarkerType.ArrowClosed, color: stroke },
      style: {
        stroke,
        strokeWidth: selected ? 3.5 : 2,
        filter: selected ? 'drop-shadow(0 0 3px rgba(53, 76, 225, 0.35))' : undefined,
      },
      interactionWidth: 28,
      selected,
    };
  }, [copy, openQuickInsert, revealedSimulationSteps, selectedEdgeIds]);

  const [nodes, setNodes, onNodesChange] = useNodesState<FlowUiNode>(
    history.present.nodes.map(toUiNode),
  );
  const [edges, setEdges, onEdgesChangeState] = useEdgesState<FlowUiEdge>(
    history.present.edges.map(toUiEdge),
  );

  useEffect(() => {
    setNodes(history.present.nodes.map(toUiNode));
    setEdges(history.present.edges.map(toUiEdge));
  }, [history.present, setEdges, setNodes, toUiEdge, toUiNode]);

  const projectWithFlow = useCallback((flow: DynamicFlowManifestV2): FlowProjectV2 => ({
      ...project,
      flow,
      interface: reconcileInterfaceManifestV2(
        project.interface,
        flow,
        workspace.moduleCatalog,
        workspace.subflowCatalog,
      ),
    }), [
    project,
    workspace.moduleCatalog,
    workspace.subflowCatalog,
  ]);

  const updateProjectFlow = useCallback((flow: DynamicFlowManifestV2) => {
    onProjectChange(projectWithFlow(flow));
  }, [onProjectChange, projectWithFlow]);

  const commitFlow = useCallback((
    next: DynamicFlowManifestV2,
    checkpointBeforeChange = false,
  ) => {
    setHistory((current) => ({
      past: [...current.past, current.present].slice(-50),
      present: next,
      future: [],
    }));
    if (checkpointBeforeChange) {
      const now = new Date();
      const currentProject = projectWithFlow(history.present);
      const revision = createDraftRevisionSnapshot(
        currentProject,
        workspace.draftRevisions,
        {
          id: createDashboardId('revision'),
          createdAt: now.toISOString(),
          reason: 'beforeDestructiveChange',
        },
      );
      const nextProject = {
        ...projectWithFlow(next),
        updatedAt: now.toISOString(),
      };
      onWorkspaceChange({
        ...workspace,
        projects: workspace.projects.map((candidate) =>
          candidate.id === nextProject.id ? nextProject : candidate),
        draftRevisions: appendBoundedDraftRevision(
          workspace.draftRevisions,
          revision,
        ),
      });
    } else {
      updateProjectFlow(next);
    }
    setSimulation(null);
  }, [
    history.present,
    onWorkspaceChange,
    projectWithFlow,
    updateProjectFlow,
    workspace,
  ]);

  const undo = useCallback(() => {
    setHistory((current) => {
      const previous = current.past[current.past.length - 1];
      if (!previous) return current;
      const next = {
        past: current.past.slice(0, -1),
        present: previous,
        future: [current.present, ...current.future],
      };
      updateProjectFlow(previous);
      return next;
    });
    setSimulation(null);
  }, [updateProjectFlow]);

  const redo = useCallback(() => {
    setHistory((current) => {
      const following = current.future[0];
      if (!following) return current;
      const next = {
        past: [...current.past, current.present],
        present: following,
        future: current.future.slice(1),
      };
      updateProjectFlow(following);
      return next;
    });
    setSimulation(null);
  }, [updateProjectFlow]);

  const addModuleNode = useCallback((moduleId: string, position?: { x: number; y: number }) => {
    const customModule = workspace.moduleCatalog.find((module) => module.id === moduleId);
    const nextNode = createVerificationNodeV2(
      {
        packageId: moduleId,
        version: BUILT_IN_MODULE_IDS.includes(moduleId as BuiltInModuleId)
          ? '1'
          : customModule?.activeVersion ?? '1.0.0',
      },
      position ?? {
        x: 280 + (history.present.nodes.length % 3) * 260,
        y: 80 + (history.present.nodes.length % 4) * 170,
      },
      customModule?.name,
    );
    commitFlow({
      ...history.present,
      nodes: [...history.present.nodes, nextNode],
    });
    setSelectedNodeId(nextNode.id);
  }, [commitFlow, history.present, workspace.moduleCatalog]);

  const addCondition = useCallback((position?: { x: number; y: number }) => {
    const nextNode = createConditionNodeV2(position ?? {
      x: 340,
      y: 120 + (history.present.nodes.length % 4) * 170,
    });
    commitFlow({
      ...history.present,
      nodes: [...history.present.nodes, nextNode],
    });
    setSelectedNodeId(nextNode.id);
  }, [commitFlow, history.present]);

  const insertNodeAtEdge = useCallback((
    edgeId: string,
    nextNode: DynamicFlowNodeV2,
  ) => {
    const outcomes = outcomesForNodeV2(nextNode, workspace.moduleCatalog);
    const outgoingOutcome = outcomes.includes('success')
      ? 'success'
      : outcomes.includes('true')
        ? 'true'
        : outcomes[0];
    if (!outgoingOutcome) return;

    const result = insertNodeOnEdge(
      history.present,
      edgeId,
      nextNode,
      outgoingOutcome,
      () => createEdgeId(),
    );
    if (!result.inserted) return;

    commitFlow(result.flow);
    setSelectedNodeId(nextNode.id);
    setSelectedNodeIds([nextNode.id]);
    setSelectedEdgeIds([]);
    setQuickInsertEdgeId(null);
    setQuickInsertSearch('');
  }, [commitFlow, history.present, workspace.moduleCatalog]);

  const quickInsertModule = useCallback((moduleId: string) => {
    if (!quickInsertEdgeId) return;
    const customModule = workspace.moduleCatalog.find((module) => module.id === moduleId);
    const nextNode = createVerificationNodeV2(
      {
        packageId: moduleId,
        version: BUILT_IN_MODULE_IDS.includes(moduleId as BuiltInModuleId)
          ? '1'
          : customModule?.activeVersion ?? '1.0.0',
      },
      { x: 0, y: 0 },
      customModule?.name,
    );
    insertNodeAtEdge(quickInsertEdgeId, nextNode);
  }, [insertNodeAtEdge, quickInsertEdgeId, workspace.moduleCatalog]);

  const quickInsertCondition = useCallback(() => {
    if (!quickInsertEdgeId) return;
    insertNodeAtEdge(
      quickInsertEdgeId,
      createConditionNodeV2({ x: 0, y: 0 }),
    );
  }, [insertNodeAtEdge, quickInsertEdgeId]);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const itemType = event.dataTransfer.getData('application/identra-item-type');
    const itemId = event.dataTransfer.getData('application/identra-module-id');
    if (!flowInstance) return;
    const position = flowInstance.screenToFlowPosition({ x: event.clientX, y: event.clientY });
    if (itemType === 'condition') addCondition(position);
    if (itemType === 'module' && itemId) addModuleNode(itemId, position);
  };

  const handleConnect = (connection: Connection) => {
    if (!connection.source || !connection.target || !connection.sourceHandle) return;
    if (wouldCreateCycleV2(history.present, connection.source, connection.target)) {
      showNotice(copy.builder.cycleRejected);
      return;
    }
    const outcome = connection.sourceHandle as OutcomeId;
    const existing = history.present.edges.find(
      (edge) => edge.source === connection.source && edge.outcome === outcome,
    );
    const nextEdge: DynamicFlowEdgeV2 = {
      id: createEdgeId(),
      source: connection.source,
      target: connection.target,
      outcome,
    };
    commitFlow({
      ...history.present,
      edges: [
        ...history.present.edges.filter(
          (edge) => !(edge.source === connection.source && edge.outcome === outcome),
        ),
        nextEdge,
      ],
    });
    if (existing) showNotice(copy.builder.connectionReplaced);
  };

  const handleEdgeChanges = (changes: EdgeChange<FlowUiEdge>[]) => {
    onEdgesChangeState(changes);
    const removedIds = new Set(
      changes.filter((change) => change.type === 'remove').map((change) => change.id),
    );
    if (removedIds.size > 0) {
      commitFlow({
        ...history.present,
        edges: history.present.edges.filter((edge) => !removedIds.has(edge.id)),
      }, true);
    }
  };

  const handleNodeDragStop = (_event: MouseEvent | TouchEvent, uiNode: FlowUiNode) => {
    commitFlow({
      ...history.present,
      nodes: history.present.nodes.map((node) => node.id === uiNode.id
        ? { ...node, position: uiNode.position }
        : node),
    });
  };

  const selectOnlyNode = useCallback((nodeId: string) => {
    setSelectedNodeId(nodeId);
    setSelectedNodeIds([nodeId]);
    setSelectedEdgeIds([]);
    setNodes((current) => current.map((node) => ({
      ...node,
      selected: node.id === nodeId,
    })));
    setEdges((current) => current.map((edge) => (
      edge.selected ? { ...edge, selected: false } : edge
    )));
  }, [setEdges, setNodes]);

  const selectOnlyEdge = useCallback((edgeId: string) => {
    setSelectedNodeId(null);
    setSelectedNodeIds([]);
    setSelectedEdgeIds([edgeId]);
    setNodes((current) => current.map((node) => (
      node.selected ? { ...node, selected: false } : node
    )));
    setEdges((current) => current.map((edge) => ({
      ...edge,
      selected: edge.id === edgeId,
    })));
  }, [setEdges, setNodes]);

  const fitNodeIds = useCallback((nodeIds: readonly string[]) => {
    const selectedNodes = nodes.filter((node) => nodeIds.includes(node.id));
    if (selectedNodes.length === 0) return;
    void flowInstance?.fitView({
      nodes: selectedNodes,
      duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 0
        : 240,
      padding: 0.45,
      maxZoom: 1.25,
    });
  }, [flowInstance, nodes]);

  const applyAutoLayout = useCallback(() => {
    const nextFlow = autoLayoutDynamicFlow(history.present);
    commitFlow(nextFlow);
    showNotice(copy.builder.autoLayoutApplied);
    window.requestAnimationFrame(() => {
      void flowInstance?.fitView({
        duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 0
          : 280,
        padding: 0.18,
      });
    });
  }, [
    commitFlow,
    copy.builder.autoLayoutApplied,
    flowInstance,
    history.present,
    showNotice,
  ]);

  const openNodeContextMenu = useCallback((
    event: ReactMouseEvent,
    nodeId: string,
  ) => {
    event.preventDefault();
    const position = clampContextMenuPosition({
      x: event.clientX,
      y: event.clientY,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      menuWidth: CONTEXT_MENU_WIDTH,
      menuHeight: NODE_CONTEXT_MENU_HEIGHT,
    });
    selectOnlyNode(nodeId);
    setContextMenu({ kind: 'node', nodeId, ...position });
  }, [selectOnlyNode]);

  const openEdgeContextMenu = useCallback((
    event: ReactMouseEvent,
    edgeId: string,
  ) => {
    event.preventDefault();
    const position = clampContextMenuPosition({
      x: event.clientX,
      y: event.clientY,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      menuWidth: CONTEXT_MENU_WIDTH,
      menuHeight: EDGE_CONTEXT_MENU_HEIGHT,
    });
    selectOnlyEdge(edgeId);
    setContextMenu({ kind: 'edge', edgeId, ...position });
  }, [selectOnlyEdge]);

  const clearSelection = useCallback(() => {
    setContextMenu(null);
    setSelectedNodeId(null);
    setSelectedNodeIds([]);
    setSelectedEdgeIds([]);
    setNodes((current) => current.map((node) => (
      node.selected ? { ...node, selected: false } : node
    )));
    setEdges((current) => current.map((edge) => (
      edge.selected ? { ...edge, selected: false } : edge
    )));
  }, [setEdges, setNodes]);

  const toggleBreakpoint = useCallback((nodeId: string) => {
    setBreakpointNodeIds((current) => current.includes(nodeId)
      ? current.filter((id) => id !== nodeId)
      : [...current, nodeId]);
  }, []);

  useEffect(() => {
    if (!contextMenu) return;
    const focusFrame = window.requestAnimationFrame(() => {
      contextMenuRef.current?.querySelector<HTMLButtonElement>('[role="menuitem"]')
        ?.focus();
    });
    const closeFromOutside = (event: PointerEvent) => {
      if (
        event.target instanceof Element
        && contextMenuRef.current?.contains(event.target)
      ) {
        return;
      }
      setContextMenu(null);
    };
    const closeFromViewportChange = () => setContextMenu(null);
    window.addEventListener('pointerdown', closeFromOutside);
    window.addEventListener('resize', closeFromViewportChange);
    window.addEventListener('scroll', closeFromViewportChange, true);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener('pointerdown', closeFromOutside);
      window.removeEventListener('resize', closeFromViewportChange);
      window.removeEventListener('scroll', closeFromViewportChange, true);
    };
  }, [contextMenu]);

  const selectAll = useCallback(() => {
    const nodeIds = history.present.nodes.map((node) => node.id);
    const edgeIds = history.present.edges.map((edge) => edge.id);
    setSelectedNodeId(nodeIds.length === 1 ? nodeIds[0] ?? null : null);
    setSelectedNodeIds(nodeIds);
    setSelectedEdgeIds(edgeIds);
    setNodes((current) => current.map((node) => ({ ...node, selected: true })));
    setEdges((current) => current.map((edge) => ({ ...edge, selected: true })));
  }, [history.present.edges, history.present.nodes, setEdges, setNodes]);

  const deleteSelection = useCallback((
    nodeIds: readonly string[],
    edgeIds: readonly string[],
  ) => {
    const requestedNodes = new Set(nodeIds);
    const removableNodeIds = new Set(
      history.present.nodes
        .filter((node) => requestedNodes.has(node.id)
          && node.kind !== 'start'
          && node.kind !== 'terminal')
        .map((node) => node.id),
    );
    const removableEdgeIds = new Set(edgeIds);
    if (removableNodeIds.size === 0 && removableEdgeIds.size === 0) {
      if (requestedNodes.size > 0) showNotice(copy.builder.protectedNode);
      return;
    }
    commitFlow({
      ...history.present,
      nodes: history.present.nodes.filter(
        (node) => !removableNodeIds.has(node.id),
      ),
      edges: history.present.edges.filter(
        (edge) => !removableEdgeIds.has(edge.id)
          && !removableNodeIds.has(edge.source)
          && !removableNodeIds.has(edge.target),
      ),
    }, true);
    setBreakpointNodeIds((current) =>
      current.filter((nodeId) => !removableNodeIds.has(nodeId)));
    clearSelection();
  }, [clearSelection, commitFlow, copy.builder.protectedNode, history.present, showNotice]);

  const duplicateSelection = useCallback(() => {
    const result = duplicateFlowSelection(
      history.present,
      selectedNodeIds,
      createDashboardId,
    );
    if (result.duplicatedNodeIds.length === 0) {
      showNotice(copy.builder.protectedNode);
      return;
    }
    commitFlow(result.flow);
    setSelectedNodeIds(result.duplicatedNodeIds);
    setSelectedEdgeIds([]);
    setSelectedNodeId(
      result.duplicatedNodeIds.length === 1
        ? result.duplicatedNodeIds[0] ?? null
        : null,
    );
  }, [
    commitFlow,
    copy.builder.protectedNode,
    history.present,
    selectedNodeIds,
    showNotice,
  ]);

  const removeSelectedNode = () => {
    if (!selectedNode) return;
    deleteSelection([selectedNode.id], []);
  };

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (contextMenu && event.key === 'Escape') {
        event.preventDefault();
        setContextMenu(null);
        return;
      }
      if (
        simulatorOpen
        || scenarioSuiteOpen
        || operationsOpen
        || insightsOpen
        || customModuleOpen
        || quickInsertEdgeId !== null
      ) {
        return;
      }
      const shortcut = resolveDynamicFlowShortcut(
        event,
        isEditableShortcutTarget(event.target),
      );
      if (!shortcut) return;
      const canvasOnly = shortcut === 'deleteSelection'
        || shortcut === 'clearSelection'
        || shortcut === 'fitView';
      const activeElement = document.activeElement;
      const canvasFocused = activeElement instanceof HTMLElement
        && Boolean(canvasSectionRef.current?.contains(activeElement));
      if (canvasOnly && !canvasFocused && activeElement !== document.body) return;

      event.preventDefault();
      setContextMenu(null);
      if (shortcut === 'undo') undo();
      if (shortcut === 'redo') redo();
      if (shortcut === 'deleteSelection') {
        deleteSelection(selectedNodeIds, selectedEdgeIds);
      }
      if (shortcut === 'duplicateSelection') duplicateSelection();
      if (shortcut === 'selectAll') selectAll();
      if (shortcut === 'clearSelection') clearSelection();
      if (shortcut === 'fitView') {
        void flowInstance?.fitView({
          duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 0
            : 240,
          padding: 0.18,
        });
      }
    };
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, [
    clearSelection,
    contextMenu,
    customModuleOpen,
    deleteSelection,
    duplicateSelection,
    flowInstance,
    insightsOpen,
    operationsOpen,
    quickInsertEdgeId,
    redo,
    scenarioSuiteOpen,
    selectAll,
    selectedEdgeIds,
    selectedNodeIds,
    simulatorOpen,
    undo,
  ]);

  const handleCustomModuleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const inputSchema = parseSchema(customForm.inputSchema);
    const outputSchema = parseSchema(customForm.outputSchema);
    const outcomeField = outputSchema?.find((field) => field.type === 'boolean');
    if (!inputSchema || !outputSchema || !outcomeField) {
      setSchemaError(true);
      return;
    }
    setSchemaError(false);

    const issuerPolicy: IssuerPolicy = customForm.issuerMode === 'exactDid'
      ? { mode: 'exactDid', issuerDid: customForm.issuerValue.trim() }
      : customForm.issuerMode === 'trustFramework'
        ? { mode: 'trustFramework', frameworkId: customForm.issuerValue.trim() }
        : {
            mode: 'allowedDids',
            allowedDids: customForm.issuerValue.split(',').map((value) => value.trim()).filter(Boolean),
          };
    const packageId = createDashboardId('custom-module');
    const version = customForm.version.trim();
    const outcomeCondition = (expected: boolean): ConditionDefinition => ({
      root: {
        ...createEmptyConditionGroup(),
        conditions: [{
          id: createDashboardId('condition-rule'),
          kind: 'rule',
          left: {
            kind: 'nodeOutput',
            nodeId: '$self',
            fieldId: outcomeField.id,
          },
          operator: 'equals',
          right: {
            kind: 'literal',
            valueType: 'boolean',
            value: expected,
          },
        }],
      },
      migrationState: 'native',
    });
    const modulePackage: ModulePackage = {
      id: packageId,
      name: customForm.name.trim(),
      origin: 'custom',
      activeVersion: version,
      versions: [{
        version,
        status: 'active',
        createdAt: new Date().toISOString(),
        contract: {
          ref: { packageId, version },
          origin: 'custom',
          category: 'custom',
          inputFields: inputSchema,
          outputFields: outputSchema,
          outcomes: [
            { id: 'success', terminal: false },
            { id: 'failure', terminal: false },
          ],
          uiCapabilities: {
            requiresUserInteraction: true,
            supportedStates: ['intro', 'input', 'processing', 'success', 'error', 'retry'],
            supportsConsent: false,
            supportsCredentialRequest: true,
            supportsFieldSummary: true,
            supportsDevicePermission: false,
            supportsCapture: false,
          },
          evidenceGroup: 'other',
          estimatedDurationMs: 8_000,
        },
        definition: {
          description: customForm.description.trim(),
          credentialType: customForm.credentialType.trim(),
          didResolverUrl: customForm.didResolverUrl.trim(),
          verificationMethod: customForm.verificationMethod.trim(),
          issuerPolicy,
          successCondition: outcomeCondition(true),
          failureCondition: outcomeCondition(false),
          defaultUi: {
            title: customForm.uiTitle.trim(),
            description: customForm.uiDescription.trim(),
            actionLabel: customForm.uiAction.trim(),
          },
        },
      }],
    };
    onWorkspaceChange({
      ...workspace,
      moduleCatalog: [...workspace.moduleCatalog, modulePackage],
    });
    setCustomForm(EMPTY_CUSTOM_MODULE_FORM);
    setCustomModuleOpen(false);
    showNotice(copy.builder.moduleCreated);
  };

  const filteredBuiltIns = BUILT_IN_MODULE_IDS.filter((moduleId) => {
    const query = search.trim().toLocaleLowerCase();
    return !query
      || copy.modules[moduleId].name.toLocaleLowerCase().includes(query)
      || copy.modules[moduleId].description.toLocaleLowerCase().includes(query);
  });
  const filteredCustomModules = workspace.moduleCatalog.filter((module) => module.origin === 'custom').filter((module) => {
    const query = search.trim().toLocaleLowerCase();
    return !query
      || module.name.toLocaleLowerCase().includes(query)
      || module.versions
        .find((version) => version.version === module.activeVersion)
        ?.definition?.description.toLocaleLowerCase().includes(query);
  });
  const quickInsertBuiltIns = BUILT_IN_MODULE_IDS.filter((moduleId) => {
    const query = quickInsertSearch.trim().toLocaleLowerCase();
    return !query
      || copy.modules[moduleId].name.toLocaleLowerCase().includes(query)
      || copy.modules[moduleId].description.toLocaleLowerCase().includes(query);
  });
  const quickInsertCustomModules = workspace.moduleCatalog
    .filter((module) => module.origin === 'custom')
    .filter((module) => {
      const query = quickInsertSearch.trim().toLocaleLowerCase();
      return !query
        || module.name.toLocaleLowerCase().includes(query)
        || module.versions
          .find((version) => version.version === module.activeVersion)
          ?.definition?.description.toLocaleLowerCase().includes(query);
    });

  const openSimulator = () => {
    const defaults: Record<string, OutcomeId> = {};
    for (const node of history.present.nodes) {
      if (node.kind === 'condition') defaults[node.id] = 'true';
      if (node.kind === 'verification') {
        defaults[node.id] = node.moduleRef.packageId === 'database-cross-check'
          ? 'notMatched'
          : 'success';
      }
    }
    setSimulatorOutcomes(defaults);
    setSimulation(null);
    setDebuggerSession(null);
    setInspectedStepIndex(null);
    setSimulatorOpen(true);
  };

  const runSimulation = () => {
    const result = simulateDynamicFlowV2(history.present, {
      quickOutcomes: simulatorOutcomes,
      moduleCatalog: workspace.moduleCatalog,
      subflowCatalog: workspace.subflowCatalog,
    });
    const session = startFlowDebugger(result);
    setSimulation(result);
    setDebuggerSession(session);
    setInspectedStepIndex(session.activeStepIndex >= 0 ? session.activeStepIndex : null);
  };

  const continueDebugger = () => {
    if (!simulation || !debuggerSession) return;
    const next = continueFlowDebugger(
      simulation,
      debuggerSession,
      new Set(breakpointNodeIds),
    );
    setDebuggerSession(next);
    setInspectedStepIndex(next.activeStepIndex >= 0 ? next.activeStepIndex : null);
  };

  const stepDebugger = () => {
    if (!simulation || !debuggerSession) return;
    const next = stepFlowDebugger(
      simulation,
      debuggerSession,
      new Set(breakpointNodeIds),
    );
    setDebuggerSession(next);
    setInspectedStepIndex(next.activeStepIndex >= 0 ? next.activeStepIndex : null);
  };

  const restartDebugger = () => {
    runSimulation();
  };

  const contextNode = contextMenu?.kind === 'node'
    ? history.present.nodes.find((node) => node.id === contextMenu.nodeId) ?? null
    : null;
  const contextEdge = contextMenu?.kind === 'edge'
    ? history.present.edges.find((edge) => edge.id === contextMenu.edgeId) ?? null
    : null;
  const selectedEdgeSource = selectedEdge
    ? history.present.nodes.find((node) => node.id === selectedEdge.source) ?? null
    : null;
  const selectedEdgeTarget = selectedEdge
    ? history.present.nodes.find((node) => node.id === selectedEdge.target) ?? null
    : null;
  const selectedEdgeOutcomes = selectedEdgeSource
    ? outcomesForNodeV2(selectedEdgeSource, workspace.moduleCatalog)
    : [];
  const outcomesUsedBySiblingEdges = new Set(
    selectedEdge
      ? history.present.edges
          .filter((edge) => edge.source === selectedEdge.source && edge.id !== selectedEdge.id)
          .map((edge) => edge.outcome)
      : [],
  );
  const executionExplanation = simulation && inspectedStepIndex !== null
    ? explainSimulationStep(history.present, simulation, inspectedStepIndex)
    : null;
  const explanationTargetNode = executionExplanation?.targetNodeId
    ? history.present.nodes.find(
        (node) => node.id === executionExplanation.targetNodeId,
      ) ?? null
    : null;

  return (
    <div className="flex min-h-[inherit] flex-col xl:h-[100dvh] xl:max-h-[100dvh] xl:overflow-hidden">
      {toolbarVisible && (
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 bg-white px-4 py-3 sm:px-5">
        <div className="mr-auto min-w-0">
          <p className="type-label-compact font-bold uppercase text-[#354CE1]">{copy.builder.breadcrumb}</p>
          <h1 className="type-featured-title truncate text-slate-950">{project.name}</h1>
        </div>
        <button
          type="button"
          aria-label={copy.builder.undo}
          title={copy.builder.undo}
          disabled={history.past.length === 0}
          onClick={undo}
          className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 disabled:opacity-40"
        >
          <Undo2 className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label={copy.builder.redo}
          title={copy.builder.redo}
          disabled={history.future.length === 0}
          onClick={redo}
          className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 disabled:opacity-40"
        >
          <Redo2 className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label={copy.builder.autoLayout}
          title={copy.builder.autoLayout}
          onClick={applyAutoLayout}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1]"
        >
          <LayoutGrid className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">{copy.builder.autoLayout}</span>
        </button>
        <button
          type="button"
          onClick={() => setInsightsOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1]"
        >
          <GitCompareArrows className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">{copy.insights.title}</span>
        </button>
        <details className="relative">
          <summary
            aria-label={copy.builder.keyboardShortcuts}
            title={copy.builder.keyboardShortcuts}
            className="flex cursor-pointer list-none items-center rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1] [&::-webkit-details-marker]:hidden"
          >
            <Keyboard className="h-4 w-4" />
          </summary>
          <div className="absolute right-0 z-30 mt-2 w-72 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-900/10">
            <p className="px-1 pb-2 text-xs font-bold text-slate-950">
              {copy.builder.keyboardShortcuts}
            </p>
            {[
              [copy.builder.undo, 'Ctrl/⌘ Z'],
              [copy.builder.redo, 'Ctrl/⌘ ⇧ Z'],
              [advancedCopy.common.delete, 'Delete / ⌫'],
              [advancedCopy.common.duplicate, 'Ctrl/⌘ D'],
              [copy.builder.selectAll, 'Ctrl/⌘ A'],
              [copy.builder.clearSelection, 'Esc'],
              [copy.builder.fitView, 'F'],
            ].map(([label, shortcut]) => (
              <div
                key={label}
                className="type-body-sm flex items-center justify-between gap-4 rounded-lg px-1 py-1.5 text-slate-600"
              >
                <span>{label}</span>
                <kbd className="type-technical shrink-0 rounded-md border border-slate-200 bg-slate-50 px-1.5 py-1 font-mono font-bold text-slate-700">
                  {shortcut}
                </kbd>
              </div>
            ))}
          </div>
        </details>
        <button
          type="button"
          onClick={openSimulator}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
        >
          <Bug className="h-3.5 w-3.5" />
          {copy.debugger.title}
        </button>
        <button
          type="button"
          onClick={() => setScenarioSuiteOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
        >
          <ListChecks className="h-3.5 w-3.5" />
          {advancedCopy.scenarios.title}
        </button>
        <button
          type="button"
          onClick={() => setOperationsOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
        >
          <Network className="h-3.5 w-3.5" />
          {advancedCopy.releases.title}
        </button>
        <button
          type="button"
          onClick={onOpenStudio}
          className="inline-flex items-center gap-2 rounded-lg bg-[#354CE1] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#2739B8]"
        >
          {copy.builder.openStudio}
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          aria-label={copy.hideToolbar}
          title={copy.hideToolbar}
          onClick={() => setToolbarVisible(false)}
          className="rounded-lg border border-slate-200 p-2 text-slate-400 transition hover:bg-slate-50 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1]"
        >
          <PanelTopClose className="h-4 w-4" />
        </button>
      </div>
      )}

      <div className={`grid min-h-0 flex-1 xl:h-full xl:overflow-hidden ${
 libraryVisible && inspectorVisible
 ? 'xl:grid-cols-[276px_minmax(520px,1fr)_318px]'
 : libraryVisible
 ? 'xl:grid-cols-[276px_minmax(520px,1fr)]'
 : inspectorVisible
 ? 'xl:grid-cols-[minmax(520px,1fr)_318px]'
 : 'xl:grid-cols-1'
 }`}>
        {libraryVisible && (
          <aside className="sidebar-scrollbar min-h-0 max-h-[42dvh] overflow-y-auto overscroll-contain border-b border-slate-200 bg-white p-4 xl:h-full xl:max-h-none xl:border-b-0 xl:border-r">
          <div className="flex items-center gap-2">
            <h2 className="type-card-title-sm min-w-0 flex-1 text-slate-950">{copy.builder.moduleLibrary}</h2>
            <button
              type="button"
              aria-label={copy.hideLeftPanel}
              title={copy.hideLeftPanel}
              onClick={() => setLibraryVisible(false)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1]"
            >
              <PanelLeftClose className="h-4 w-4" />
            </button>
          </div>
          <p className="type-body-sm mt-1 leading-5 text-slate-500">{copy.builder.libraryDescription}</p>
          <label className="relative mt-4 block">
            <span className="sr-only">{copy.builder.searchModules}</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={copy.builder.searchModules}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs outline-none focus:border-[#354CE1] focus:bg-white"
            />
          </label>

          <div className="mt-5 space-y-5 pr-1">
            <div>
              <p className="type-label-compact px-1 font-bold uppercase text-slate-400">{copy.builder.controlCategory}</p>
              <button
                type="button"
                draggable
                onDragStart={(event) => {
                  event.dataTransfer.setData('application/identra-item-type', 'condition');
                  event.dataTransfer.effectAllowed = 'move';
                }}
                onClick={() => addCondition()}
                className="mt-2 flex w-full items-start gap-3 rounded-xl border border-violet-100 bg-violet-50/60 p-3 text-left transition hover:border-violet-300 hover:bg-violet-50"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-violet-600 shadow-sm">
                  <GitBranch className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-xs font-bold text-slate-900">{copy.builder.conditionName}</span>
                  <span className="type-caption mt-1 line-clamp-2 block leading-4 text-slate-500">{copy.builder.conditionDescription}</span>
                </span>
              </button>
            </div>

            <div>
              <p className="type-label-compact px-1 font-bold uppercase text-slate-400">{copy.builder.verificationCategory}</p>
              <div className="mt-2 space-y-2">
                {filteredBuiltIns.map((moduleId) => {
                  const Icon = MODULE_ICONS[moduleId];
                  const moduleCopy = copy.modules[moduleId];
                  return (
                    <button
                      key={moduleId}
                      type="button"
                      draggable
                      onDragStart={(event) => {
                        event.dataTransfer.setData('application/identra-item-type', 'module');
                        event.dataTransfer.setData('application/identra-module-id', moduleId);
                        event.dataTransfer.effectAllowed = 'move';
                      }}
                      onClick={() => addModuleNode(moduleId)}
                      className="flex w-full items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left transition hover:border-indigo-300 hover:shadow-sm"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EEF0FF] text-[#354CE1]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-xs font-bold text-slate-900">{moduleCopy.name}</span>
                        <span className="type-caption mt-1 line-clamp-2 block leading-4 text-slate-500">{moduleCopy.description}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="type-label-compact px-1 font-bold uppercase text-slate-400">{copy.builder.customCategory}</p>
              <div className="mt-2 space-y-2">
                {filteredCustomModules.map((module) => (
                  <button
                    key={module.id}
                    type="button"
                    draggable
                    onDragStart={(event) => {
                      event.dataTransfer.setData('application/identra-item-type', 'module');
                      event.dataTransfer.setData('application/identra-module-id', module.id);
                      event.dataTransfer.effectAllowed = 'move';
                    }}
                    onClick={() => addModuleNode(module.id)}
                    className="flex w-full items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50/50 p-3 text-left transition hover:border-emerald-400"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600">
                      <Braces className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-xs font-bold text-slate-900">{module.name}</span>
                      <span className="type-caption mt-1 line-clamp-2 block leading-4 text-slate-500">
                        {module.versions
                          .find((version) => version.version === module.activeVersion)
                          ?.definition?.description ?? copy.builder.customModuleDescription}
                      </span>
                    </span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setCustomModuleOpen(true)}
                  className="flex w-full items-start gap-3 rounded-xl border border-dashed border-slate-300 p-3 text-left transition hover:border-[#354CE1] hover:bg-[#F8F9FF]"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                    <Plus className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold text-slate-900">{copy.builder.customModuleName}</span>
                    <span className="type-caption mt-1 line-clamp-2 block leading-4 text-slate-500">{copy.builder.customModuleDescription}</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </aside>
        )}

        <section ref={canvasSectionRef} className="relative min-h-[620px] bg-[#F8FAFC] xl:h-full xl:min-h-0">
          <div className="absolute left-4 top-4 z-10">
            <div className={`type-label-compact inline-flex items-center gap-2 rounded-xl border bg-white px-3 py-2 font-bold shadow-sm ${
 validationIssues.length === 0
 ? 'border-emerald-200 text-emerald-700'
 : 'border-amber-200 text-amber-700'
 }`}>
              {validationIssues.length === 0 ? <Check className="h-3.5 w-3.5" /> : <ListChecks className="h-3.5 w-3.5" />}
              {validationIssues.length === 0
                ? copy.builder.validFlow
                : `${validationIssues.length} ${copy.builder.issueCount}`}
            </div>
          </div>
          {(!toolbarVisible || !libraryVisible || !inspectorVisible) && (
            <div className="absolute right-4 top-4 z-20 flex items-center gap-1 rounded-xl border border-slate-200 bg-white/95 p-1.5 shadow-lg shadow-slate-900/10 backdrop-blur">
              {!libraryVisible && (
                <button
                  type="button"
                  aria-label={copy.showLeftPanel}
                  title={copy.showLeftPanel}
                  onClick={() => setLibraryVisible(true)}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1]"
                >
                  <PanelLeftOpen className="h-4 w-4" />
                </button>
              )}
              {!toolbarVisible && (
                <button
                  type="button"
                  aria-label={copy.showToolbar}
                  title={copy.showToolbar}
                  onClick={() => setToolbarVisible(true)}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1]"
                >
                  <PanelTopOpen className="h-4 w-4" />
                </button>
              )}
              {!inspectorVisible && (
                <button
                  type="button"
                  aria-label={copy.showRightPanel}
                  title={copy.showRightPanel}
                  onClick={() => setInspectorVisible(true)}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1]"
                >
                  <PanelRightOpen className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
          <ReactFlow<FlowUiNode, FlowUiEdge>
            nodes={nodes}
            edges={edges}
            nodeTypes={NODE_TYPES}
            edgeTypes={EDGE_TYPES}
            onInit={setFlowInstance}
            onNodesChange={onNodesChange}
            onEdgesChange={handleEdgeChanges}
            onConnect={handleConnect}
            onNodeClick={(_event, node) => setSelectedNodeId(node.id)}
            onNodeContextMenu={(event, node) =>
              openNodeContextMenu(event, node.id)}
            onEdgeClick={(event, edge) => {
              if (!event.ctrlKey && !event.metaKey && !event.shiftKey) {
                selectOnlyEdge(edge.id);
              }
            }}
            onEdgeContextMenu={(event, edge) =>
              openEdgeContextMenu(event, edge.id)}
            onSelectionChange={handleSelectionChange}
            onPaneClick={clearSelection}
            onNodeDragStop={handleNodeDragStop}
            onDrop={handleDrop}
            onDragOver={(event) => {
              event.preventDefault();
              event.dataTransfer.dropEffect = 'move';
            }}
            fitView
            minZoom={0.25}
            maxZoom={1.7}
            deleteKeyCode={null}
            aria-label={copy.builder.canvasLabel}
            ariaLabelConfig={{
              'controls.ariaLabel': copy.builder.controlsLabel,
              'controls.zoomIn.ariaLabel': copy.builder.zoomIn,
              'controls.zoomOut.ariaLabel': copy.builder.zoomOut,
              'controls.fitView.ariaLabel': copy.builder.fitView,
              'controls.interactive.ariaLabel': copy.builder.toggleInteractivity,
              'minimap.ariaLabel': copy.builder.minimapLabel,
              'handle.ariaLabel': copy.builder.connectionHandle,
            }}
            defaultEdgeOptions={{ type: 'flowConnection' }}
            connectionLineStyle={{ stroke: '#354CE1', strokeWidth: 2 }}
            proOptions={{ hideAttribution: true }}
          >
            <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#CBD5E1" />
            <Controls position="bottom-left" aria-label={copy.builder.controlsLabel} />
            <MiniMap
              position="bottom-right"
              pannable
              zoomable
              nodeColor={(node) => node.data.kind === 'terminal' ? '#10B981' : '#6474E8'}
              maskColor={MINIMAP_MASK_COLOR}
              ariaLabel={copy.builder.minimapLabel}
            />
          </ReactFlow>
        </section>

        {inspectorVisible && (
          <aside id="flow-node-inspector" className="sidebar-scrollbar min-h-0 max-h-[42dvh] overflow-y-auto overscroll-contain border-t border-slate-200 bg-white p-4 xl:h-full xl:max-h-none xl:border-l xl:border-t-0">
          <div className="flex items-center gap-2">
            <h2 className="type-card-title-sm min-w-0 flex-1 text-slate-950">
              {selectedEdge ? copy.builder.edgeInspector : copy.builder.inspector}
            </h2>
            <button
              type="button"
              aria-label={copy.hideRightPanel}
              title={copy.hideRightPanel}
              onClick={() => setInspectorVisible(false)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1]"
            >
              <PanelRightClose className="h-4 w-4" />
            </button>
          </div>
          {selectedNode ? (
            <div className="mt-4 space-y-5">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-bold text-slate-900">
                  {nodeTitle(selectedNode, copy, workspace.moduleCatalog, workspace.subflowCatalog)}
                </p>
                <p className="type-caption mt-1 leading-4 text-slate-500">
                  {nodeDescription(selectedNode, copy, workspace.moduleCatalog, workspace.subflowCatalog)}
                </p>
              </div>

              <FlowInspectorAdvanced
                copy={copy}
                advancedCopy={advancedCopy}
                manifest={history.present}
                node={selectedNode}
                moduleCatalog={workspace.moduleCatalog}
                subflowCatalog={workspace.subflowCatalog}
                onManifestChange={commitFlow}
              />

              {validationIssues.some((issue) => issue.nodeId === selectedNode.id) && (
                <div className="space-y-2 rounded-xl border border-amber-200 bg-amber-50 p-3">
                  {validationIssues
                    .filter((issue) => issue.nodeId === selectedNode.id)
                    .map((issue, index) => (
                      <p key={`${issue.code}-${index}`} className="type-label-compact font-semibold leading-4 text-amber-800">
                        {validationMessage(issue.code, copy, advancedCopy)}
                      </p>
                    ))}
                </div>
              )}

              <button
                type="button"
                onClick={() => toggleBreakpoint(selectedNode.id)}
                className={`inline-flex w-full items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                  breakpointNodeIds.includes(selectedNode.id)
                    ? 'border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 focus-visible:ring-rose-500'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50 focus-visible:ring-[#354CE1]'
                }`}
              >
                <CircleDot className="h-3.5 w-3.5" />
                {breakpointNodeIds.includes(selectedNode.id)
                  ? copy.debugger.removeBreakpoint
                  : copy.debugger.addBreakpoint}
              </button>
              <button
                type="button"
                onClick={removeSelectedNode}
                disabled={selectedNode.kind === 'start' || selectedNode.kind === 'terminal'}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 px-3 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-300"
              >
                <Trash2 className="h-3.5 w-3.5" />
                {copy.builder.removeNode}
              </button>
            </div>
          ) : selectedEdge && selectedEdgeSource && selectedEdgeTarget ? (
            <div className="mt-4 space-y-4">
              <div className="rounded-xl border border-[#DDE1FF] bg-[#F8F9FF] p-3">
                <p className="type-body-sm leading-5 text-slate-600">
                  {copy.builder.edgeInspectorDescription}
                </p>
              </div>

              <dl className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div>
                  <dt className="type-label-compact font-bold uppercase text-slate-400">
                    {copy.builder.edgeSource}
                  </dt>
                  <dd className="mt-1 text-xs font-bold text-slate-900">
                    {nodeTitle(
                      selectedEdgeSource,
                      copy,
                      workspace.moduleCatalog,
                      workspace.subflowCatalog,
                    )}
                  </dd>
                </div>
                <div className="border-t border-slate-200 pt-3">
                  <dt className="type-label-compact font-bold uppercase text-slate-400">
                    {copy.builder.edgeTarget}
                  </dt>
                  <dd className="mt-1 text-xs font-bold text-slate-900">
                    {nodeTitle(
                      selectedEdgeTarget,
                      copy,
                      workspace.moduleCatalog,
                      workspace.subflowCatalog,
                    )}
                  </dd>
                </div>
              </dl>

              <label className="block">
                <span className="type-label-compact font-bold uppercase text-slate-500">
                  {copy.builder.edgeOutcome}
                </span>
                <select
                  value={selectedEdge.outcome}
                  onChange={(event) => {
                    const outcome = event.target.value as OutcomeId;
                    if (outcomesUsedBySiblingEdges.has(outcome)) return;
                    commitFlow({
                      ...history.present,
                      edges: history.present.edges.map((edge) => edge.id === selectedEdge.id
                        ? { ...edge, outcome }
                        : edge),
                    });
                  }}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-[#354CE1] focus:ring-2 focus:ring-[#354CE1]/10"
                >
                  {selectedEdgeOutcomes.map((outcome) => (
                    <option
                      key={outcome}
                      value={outcome}
                      disabled={outcomesUsedBySiblingEdges.has(outcome)}
                    >
                      {copy.outcomes[outcome as keyof typeof copy.outcomes] ?? outcome}
                      {outcomesUsedBySiblingEdges.has(outcome)
                        ? ` — ${copy.builder.edgeOutcomeInUse}`
                        : ''}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="button"
                onClick={() => openQuickInsert(selectedEdge.id)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#354CE1] px-3 py-2.5 text-xs font-bold text-white hover:bg-[#2739B8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1] focus-visible:ring-offset-2"
              >
                <Plus className="h-3.5 w-3.5" />
                {copy.builder.quickInsert}
              </button>
              <button
                type="button"
                onClick={() => fitNodeIds([selectedEdge.source, selectedEdge.target])}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1]"
              >
                <Network className="h-3.5 w-3.5" />
                {copy.builder.focusConnection}
              </button>
              <button
                type="button"
                onClick={() => deleteSelection([], [selectedEdge.id])}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 px-3 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
              >
                <Trash2 className="h-3.5 w-3.5" />
                {copy.builder.removeConnection}
              </button>
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-dashed border-slate-200 px-4 py-10 text-center">
              <Network className="mx-auto h-6 w-6 text-slate-300" />
              <p className="mt-3 text-xs leading-5 text-slate-400">{copy.builder.inspectorEmpty}</p>
            </div>
          )}

          {validationIssues.length > 0 && (
            <div className="mt-5 border-t border-slate-100 pt-5">
              <p className="type-label-compact font-bold uppercase text-slate-500">{copy.builder.validate}</p>
              <div className="mt-2 space-y-2">
                {validationIssues.slice(0, 5).map((issue, index) => (
                  <button
                    key={`${issue.code}-${issue.nodeId ?? issue.edgeId ?? index}`}
                    type="button"
                    onClick={() => issue.nodeId && setSelectedNodeId(issue.nodeId)}
                    className="type-control-compact w-full rounded-lg bg-amber-50 px-3 py-2 text-left font-semibold leading-4 text-amber-800"
                  >
                    {validationMessage(issue.code, copy, advancedCopy)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>
        )}
      </div>

      {contextMenu && (contextNode || contextEdge) ? (
        <div
          ref={contextMenuRef}
          role="menu"
          aria-label={contextNode
            ? copy.builder.nodeActions
            : copy.builder.connectionActions}
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              event.preventDefault();
              setContextMenu(null);
              return;
            }
            if (
              event.key !== 'ArrowDown'
              && event.key !== 'ArrowUp'
              && event.key !== 'Home'
              && event.key !== 'End'
            ) {
              return;
            }
            const items = [...event.currentTarget.querySelectorAll<HTMLButtonElement>(
              '[role="menuitem"]:not(:disabled)',
            )];
            if (items.length === 0) return;
            event.preventDefault();
            const currentIndex = items.indexOf(document.activeElement as HTMLButtonElement);
            const nextIndex = event.key === 'Home'
              ? 0
              : event.key === 'End'
                ? items.length - 1
                : event.key === 'ArrowDown'
                  ? (currentIndex + 1 + items.length) % items.length
                  : (currentIndex - 1 + items.length) % items.length;
            items[nextIndex]?.focus();
          }}
          className="fixed z-[90] w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-950/15"
        >
          <p className="type-label-compact px-2 pb-1.5 pt-1 font-bold uppercase text-slate-400">
            {contextNode
              ? copy.builder.nodeActions
              : copy.builder.connectionActions}
          </p>
          {contextNode ? (
            <>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setContextMenu(null);
                  document.getElementById('flow-node-inspector')?.scrollIntoView({
                    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                      ? 'auto'
                      : 'smooth',
                    block: 'start',
                  });
                }}
                className="flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1]"
              >
                <Braces className="h-4 w-4 text-slate-400" />
                {copy.builder.configureNode}
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  fitNodeIds([contextNode.id]);
                  setContextMenu(null);
                }}
                className="flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1]"
              >
                <Network className="h-4 w-4 text-slate-400" />
                {copy.builder.focusNode}
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  toggleBreakpoint(contextNode.id);
                  setContextMenu(null);
                }}
                className="flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1]"
              >
                <CircleDot className={`h-4 w-4 ${
                  breakpointNodeIds.includes(contextNode.id)
                    ? 'text-rose-500'
                    : 'text-slate-400'
                }`} />
                {breakpointNodeIds.includes(contextNode.id)
                  ? copy.debugger.removeBreakpoint
                  : copy.debugger.addBreakpoint}
              </button>
              <button
                type="button"
                role="menuitem"
                disabled={contextNode.kind === 'start' || contextNode.kind === 'terminal'}
                onClick={() => {
                  duplicateSelection();
                  setContextMenu(null);
                }}
                className="flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1] disabled:cursor-not-allowed disabled:text-slate-300"
              >
                <Plus className="h-4 w-4" />
                <span className="flex-1">{advancedCopy.common.duplicate}</span>
                <kbd className="type-technical font-mono text-slate-400">
                  {DUPLICATE_SHORTCUT_LABEL}
                </kbd>
              </button>
              <div className="my-1 border-t border-slate-100" />
              <button
                type="button"
                role="menuitem"
                disabled={contextNode.kind === 'start' || contextNode.kind === 'terminal'}
                onClick={() => {
                  deleteSelection([contextNode.id], []);
                  setContextMenu(null);
                }}
                className="flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 disabled:cursor-not-allowed disabled:text-slate-300"
              >
                <Trash2 className="h-4 w-4" />
                <span className="flex-1">{copy.builder.removeNode}</span>
                <kbd className="type-technical font-mono text-slate-400">Delete</kbd>
              </button>
            </>
          ) : contextEdge ? (
            <>
              <button
                type="button"
                role="menuitem"
                onClick={() => openQuickInsert(contextEdge.id)}
                className="flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1]"
              >
                <Plus className="h-4 w-4 text-[#354CE1]" />
                {copy.builder.quickInsert}
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  fitNodeIds([contextEdge.source, contextEdge.target]);
                  setContextMenu(null);
                }}
                className="flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1]"
              >
                <Network className="h-4 w-4 text-slate-400" />
                {copy.builder.focusConnection}
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  deleteSelection([], [contextEdge.id]);
                  setContextMenu(null);
                }}
                className="flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
              >
                <Trash2 className="h-4 w-4" />
                <span className="flex-1">{copy.builder.removeConnection}</span>
                <kbd className="type-technical font-mono text-slate-400">Delete</kbd>
              </button>
            </>
          ) : null}
        </div>
      ) : null}

      {quickInsertEdgeId && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center p-4">
          <button
            type="button"
            aria-label={copy.close}
            onClick={() => setQuickInsertEdgeId(null)}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
          />
          <div
            ref={quickInsertDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-insert-title"
            tabIndex={-1}
            className="relative flex max-h-[86vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            <div className="border-b border-slate-200 p-5 sm:p-6">
              <button
                type="button"
                aria-label={copy.close}
                onClick={() => setQuickInsertEdgeId(null)}
                className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1]"
              >
                <X className="h-4 w-4" />
              </button>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF0FF] text-[#354CE1]">
                <Plus className="h-5 w-5" />
              </span>
              <h2 id="quick-insert-title" className="type-card-title-sm mt-4 text-slate-950">
                {copy.builder.quickInsert}
              </h2>
              <p className="type-body-sm mt-1 leading-5 text-slate-500">
                {copy.builder.quickInsertDescription}
              </p>
              <label className="relative mt-4 block">
                <span className="sr-only">{copy.builder.searchModules}</span>
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  autoFocus
                  value={quickInsertSearch}
                  onChange={(event) => setQuickInsertSearch(event.target.value)}
                  placeholder={copy.builder.searchModules}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-xs outline-none focus:border-[#354CE1] focus:bg-white focus:ring-2 focus:ring-[#354CE1]/10"
                />
              </label>
            </div>

            <div className="sidebar-scrollbar grid gap-2 overflow-y-auto p-4 sm:grid-cols-2 sm:p-6">
              {(
                !quickInsertSearch.trim()
                || copy.builder.conditionName.toLocaleLowerCase()
                  .includes(quickInsertSearch.trim().toLocaleLowerCase())
              ) && (
                <button
                  type="button"
                  onClick={quickInsertCondition}
                  className="flex items-start gap-3 rounded-xl border border-violet-100 bg-violet-50/60 p-3 text-left transition hover:border-violet-300 hover:bg-violet-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-violet-600 shadow-sm">
                    <GitBranch className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-bold text-slate-900">
                      {copy.builder.conditionName}
                    </span>
                    <span className="type-caption mt-1 line-clamp-2 block leading-4 text-slate-500">
                      {copy.builder.conditionDescription}
                    </span>
                  </span>
                </button>
              )}
              {quickInsertBuiltIns.map((moduleId) => {
                const Icon = MODULE_ICONS[moduleId];
                const moduleCopy = copy.modules[moduleId];
                return (
                  <button
                    key={moduleId}
                    type="button"
                    onClick={() => quickInsertModule(moduleId)}
                    className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left transition hover:border-indigo-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1]"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EEF0FF] text-[#354CE1]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-xs font-bold text-slate-900">
                        {moduleCopy.name}
                      </span>
                      <span className="type-caption mt-1 line-clamp-2 block leading-4 text-slate-500">
                        {moduleCopy.description}
                      </span>
                    </span>
                  </button>
                );
              })}
              {quickInsertCustomModules.map((module) => (
                <button
                  key={module.id}
                  type="button"
                  onClick={() => quickInsertModule(module.id)}
                  className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50/50 p-3 text-left transition hover:border-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600">
                    <Braces className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-bold text-slate-900">
                      {module.name}
                    </span>
                    <span className="type-caption mt-1 line-clamp-2 block leading-4 text-slate-500">
                      {module.versions
                        .find((version) => version.version === module.activeVersion)
                        ?.definition?.description ?? copy.builder.customModuleDescription}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {notice && (
        <div role="status" className="fixed bottom-5 left-1/2 z-[80] -translate-x-1/2 rounded-xl bg-slate-950 px-4 py-3 text-xs font-bold text-white shadow-2xl">
          {notice}
        </div>
      )}

      {simulatorOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <button type="button" aria-label={copy.close} onClick={() => setSimulatorOpen(false)} className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" />
          <div
            ref={simulatorDialogRef}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-7"
          >
            <button type="button" aria-label={copy.close} onClick={() => setSimulatorOpen(false)} className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 hover:bg-slate-100">
              <X className="h-4 w-4" />
            </button>
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF0FF] text-[#354CE1]">
              <Bug className="h-5 w-5" />
            </span>
            <h2 className="type-card-title-sm type-document-heading mt-4 text-slate-950">
              {copy.debugger.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {copy.debugger.description}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {history.present.nodes
                .filter((node) => node.kind === 'verification' || node.kind === 'condition')
                .map((node) => {
                  const outcomes = outcomesForNodeV2(node, workspace.moduleCatalog).filter(
                    (outcome) => outcome !== 'next',
                  );
                  return (
                    <div key={node.id} className="rounded-xl border border-slate-200 p-3">
                      <div className="flex items-start gap-2">
                        <p className="type-label-compact min-w-0 flex-1 font-bold text-slate-500">
                          {copy.builder.outcomeFor}{' '}
                          {nodeTitle(node, copy, workspace.moduleCatalog, workspace.subflowCatalog)}
                        </p>
                        <button
                          type="button"
                          aria-label={breakpointNodeIds.includes(node.id)
                            ? copy.debugger.removeBreakpoint
                            : copy.debugger.addBreakpoint}
                          title={breakpointNodeIds.includes(node.id)
                            ? copy.debugger.removeBreakpoint
                            : copy.debugger.addBreakpoint}
                          onClick={() => toggleBreakpoint(node.id)}
                          className={`rounded-lg p-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
                            breakpointNodeIds.includes(node.id)
                              ? 'bg-rose-50 text-rose-500'
                              : 'text-slate-400 hover:bg-slate-100 hover:text-rose-500'
                          }`}
                        >
                          <CircleDot className="h-4 w-4" />
                        </button>
                      </div>
                      <label className="mt-2 block">
                        <span className="sr-only">
                          {copy.builder.outcomeFor}{' '}
                          {nodeTitle(node, copy, workspace.moduleCatalog, workspace.subflowCatalog)}
                        </span>
                        <select
                          value={simulatorOutcomes[node.id] ?? outcomes[0]}
                          onChange={(event) => setSimulatorOutcomes((current) => ({
                            ...current,
                            [node.id]: event.target.value as OutcomeId,
                          }))}
                          className="w-full rounded-lg border border-slate-200 px-2.5 py-2 text-xs font-semibold outline-none focus:border-[#354CE1]"
                        >
                          {outcomes.map((outcome) => (
                            <option key={outcome} value={outcome}>
                              {copy.outcomes[outcome as keyof typeof copy.outcomes] ?? outcome}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  );
                })}
            </div>
            <p className="type-caption mt-3 leading-5 text-slate-500">
              {copy.debugger.breakpointHint}
            </p>

            <button
              type="button"
              onClick={runSimulation}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#354CE1] px-4 py-3 text-sm font-bold text-white hover:bg-[#2739B8]"
            >
              <Bug className="h-4 w-4" />
              {copy.debugger.start}
            </button>

            {simulation && debuggerSession ? (
              <div className="mt-6">
                <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <div className={`mr-auto inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold ${
                    debuggerSession.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-700'
                      : debuggerSession.pauseReason === 'breakpoint'
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-amber-100 text-amber-700'
                  }`}>
                    {debuggerSession.status === 'completed'
                      ? <Check className="h-3.5 w-3.5" />
                      : <Pause className="h-3.5 w-3.5" />}
                    {debuggerSession.status === 'completed'
                      ? copy.debugger.completed
                      : debuggerSession.pauseReason === 'breakpoint'
                        ? copy.debugger.pausedAtBreakpoint
                        : debuggerSession.pauseReason === 'step'
                          ? copy.debugger.pausedAfterStep
                          : copy.debugger.pausedAtEntry}
                  </div>
                  <button
                    type="button"
                    onClick={continueDebugger}
                    disabled={debuggerSession.status === 'completed'}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#354CE1] px-3 py-2 text-xs font-bold text-white hover:bg-[#2739B8] disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    <Play className="h-3.5 w-3.5" />
                    {copy.debugger.continue}
                  </button>
                  <button
                    type="button"
                    onClick={stepDebugger}
                    disabled={debuggerSession.status === 'completed'}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-300"
                  >
                    <StepForward className="h-3.5 w-3.5" />
                    {copy.debugger.step}
                  </button>
                  <button
                    type="button"
                    onClick={restartDebugger}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    {copy.debugger.restart}
                  </button>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                  <div className="rounded-2xl bg-slate-950 p-4 text-white">
                    <p className="type-label-compact font-bold uppercase text-slate-400">
                      {copy.builder.executionPath}
                    </p>
                    <div className="mt-4 space-y-2">
                      {revealedSimulationSteps.map((step, index) => {
                        const node = history.present.nodes.find(
                          (candidate) => candidate.id === step.nodeId,
                        );
                        const active = debuggerSession.activeStepIndex === index;
                        const inspected = inspectedStepIndex === index;
                        return (
                          <button
                            key={`${step.nodeId}-${index}`}
                            type="button"
                            onClick={() => setInspectedStepIndex(index)}
                            className={`flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AAB3FF] ${
                              inspected
                                ? 'bg-white/15'
                                : 'hover:bg-white/10'
                            }`}
                          >
                            <span className={`type-label-compact flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-bold ${
                              active ? 'bg-amber-400 text-slate-950' : 'bg-white/10'
                            }`}>
                              {index + 1}
                            </span>
                            <span className="min-w-0 flex-1 truncate text-xs font-semibold">
                              {node
                                ? nodeTitle(
                                    node,
                                    copy,
                                    workspace.moduleCatalog,
                                    workspace.subflowCatalog,
                                  )
                                : step.nodeId}
                            </span>
                            {breakpointNodeIds.includes(step.nodeId) && (
                              <CircleDot className="h-3.5 w-3.5 shrink-0 text-rose-400" />
                            )}
                            {step.outcome && (
                              <span className="type-label-compact shrink-0 font-bold text-[#AAB3FF]">
                                {copy.outcomes[step.outcome as keyof typeof copy.outcomes]
                                  ?? step.outcome}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    {debuggerSession.status === 'completed' && (
                      <p className={`mt-4 rounded-xl px-3 py-2.5 text-xs font-bold ${
                        simulation.completed
                          ? simulation.terminalOutcome === 'success'
                            ? 'bg-emerald-500/15 text-emerald-300'
                            : 'bg-rose-500/15 text-rose-300'
                          : 'bg-amber-500/15 text-amber-300'
                      }`}>
                        {simulation.completed
                          ? simulation.terminalOutcome === 'success'
                            ? copy.builder.completedSuccess
                            : copy.builder.completedFailure
                          : copy.builder.incompleteSimulation}
                      </p>
                    )}
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="type-label-compact font-bold uppercase text-[#354CE1]">
                      {copy.debugger.explanation}
                    </p>
                    {executionExplanation ? (
                      <div className="mt-4 space-y-4">
                        <p className="type-body-sm rounded-xl bg-[#F8F9FF] p-3 leading-6 text-slate-700">
                          {copy.debugger.reasons[executionExplanation.reason]}
                        </p>
                        {executionExplanation.step.outcome && (
                          <div>
                            <p className="type-label-compact font-bold uppercase text-slate-400">
                              {copy.debugger.chosenOutcome}
                            </p>
                            <p className="mt-1 text-sm font-bold text-slate-950">
                              {copy.outcomes[
                                executionExplanation.step.outcome as keyof typeof copy.outcomes
                              ] ?? executionExplanation.step.outcome}
                            </p>
                          </div>
                        )}
                        {explanationTargetNode ? (
                          <div>
                            <p className="type-label-compact font-bold uppercase text-slate-400">
                              {copy.debugger.selectedConnection}
                            </p>
                            <p className="mt-1 text-sm font-bold text-slate-950">
                              {nodeTitle(
                                explanationTargetNode,
                                copy,
                                workspace.moduleCatalog,
                                workspace.subflowCatalog,
                              )}
                            </p>
                          </div>
                        ) : !executionExplanation.hasMatchingConnection ? (
                          <p className="type-body-sm rounded-xl border border-amber-200 bg-amber-50 p-3 leading-5 text-amber-800">
                            {copy.debugger.noMatchingConnection}
                          </p>
                        ) : null}
                        {executionExplanation.metadata && (
                          <details className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                            <summary className="type-label-compact cursor-pointer font-bold uppercase text-slate-500">
                              {copy.debugger.metadata}
                            </summary>
                            <pre className="type-technical mt-3 max-h-48 overflow-auto whitespace-pre-wrap break-words font-mono leading-5 text-slate-600">
                              {JSON.stringify(executionExplanation.metadata, null, 2)}
                            </pre>
                          </details>
                        )}
                      </div>
                    ) : (
                      <p className="type-body-sm mt-4 leading-5 text-slate-400">
                        {copy.builder.noSimulation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-dashed border-slate-200 p-6 text-center">
                <Bug className="mx-auto h-6 w-6 text-slate-300" />
                <p className="type-body-sm mt-3 text-slate-400">
                  {copy.builder.noSimulation}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {customModuleOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <button type="button" aria-label={copy.close} onClick={() => setCustomModuleOpen(false)} className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" />
          <form
            ref={customModuleDialogRef}
            onSubmit={handleCustomModuleSubmit}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-7"
          >
            <button type="button" aria-label={copy.close} onClick={() => setCustomModuleOpen(false)} className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 hover:bg-slate-100">
              <X className="h-4 w-4" />
            </button>
            <h2 className="type-card-title-sm type-document-heading pr-10 text-slate-950">{copy.builder.createModuleTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">{copy.builder.createModuleDescription}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {([
                ['name', copy.builder.moduleNameLabel, copy.builder.moduleNamePlaceholder, true],
                ['version', copy.builder.versionLabel, '1.0.0', true],
                ['credentialType', copy.builder.credentialTypeLabel, copy.builder.credentialTypePlaceholder, true],
                ['didResolverUrl', copy.builder.didResolverLabel, copy.builder.didResolverPlaceholder, true],
                ['verificationMethod', copy.builder.verificationMethodLabel, copy.builder.verificationMethodPlaceholder, true],
              ] as const).map(([field, label, placeholder, required]) => (
                <label key={field} className="block">
                  <span className="text-xs font-bold text-slate-700">{label}</span>
                  <input
                    required={required}
                    value={customForm[field]}
                    onChange={(event) => setCustomForm((current) => ({ ...current, [field]: event.target.value }))}
                    placeholder={placeholder}
                    className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#354CE1]"
                  />
                </label>
              ))}
              <label className="block sm:col-span-2">
                <span className="text-xs font-bold text-slate-700">{copy.builder.moduleDescriptionLabel}</span>
                <textarea
                  required
                  rows={2}
                  value={customForm.description}
                  onChange={(event) => setCustomForm((current) => ({ ...current, description: event.target.value }))}
                  placeholder={copy.builder.moduleDescriptionPlaceholder}
                  className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#354CE1]"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold text-slate-700">{copy.builder.issuerPolicyLabel}</span>
                <select
                  value={customForm.issuerMode}
                  onChange={(event) => setCustomForm((current) => ({ ...current, issuerMode: event.target.value as IssuerPolicy['mode'] }))}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#354CE1]"
                >
                  <option value="exactDid">{copy.builder.exactDidPolicy}</option>
                  <option value="trustFramework">{copy.builder.trustFrameworkPolicy}</option>
                  <option value="allowedDids">{copy.builder.allowedDidsPolicy}</option>
                </select>
              </label>
              <label className="block">
                <span className="text-xs font-bold text-slate-700">{copy.builder.issuerValueLabel}</span>
                <input
                  required
                  value={customForm.issuerValue}
                  onChange={(event) => setCustomForm((current) => ({ ...current, issuerValue: event.target.value }))}
                  placeholder={copy.builder.issuerValuePlaceholder}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-mono text-xs outline-none focus:border-[#354CE1]"
                />
              </label>
              {([
                ['inputSchema', copy.builder.inputSchemaLabel],
                ['outputSchema', copy.builder.outputSchemaLabel],
              ] as const).map(([field, label]) => (
                <label key={field} className="block">
                  <span className="text-xs font-bold text-slate-700">{label}</span>
                  <input
                    required
                    value={customForm[field]}
                    onChange={(event) => setCustomForm((current) => ({ ...current, [field]: event.target.value }))}
                    placeholder={field.includes('Schema') ? copy.builder.schemaPlaceholder : undefined}
                    className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-mono text-xs outline-none focus:border-[#354CE1]"
                  />
                </label>
              ))}
              {([
                ['uiTitle', copy.builder.uiTitleLabel],
                ['uiDescription', copy.builder.uiDescriptionLabel],
                ['uiAction', copy.builder.uiActionLabel],
              ] as const).map(([field, label]) => (
                <label key={field} className={field === 'uiDescription' ? 'block sm:col-span-2' : 'block'}>
                  <span className="text-xs font-bold text-slate-700">{label}</span>
                  <input
                    required
                    value={customForm[field]}
                    onChange={(event) => setCustomForm((current) => ({ ...current, [field]: event.target.value }))}
                    className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#354CE1]"
                  />
                </label>
              ))}
            </div>
            {schemaError && <p className="mt-3 text-xs font-semibold text-rose-600">{copy.builder.invalidSchema}</p>}
            <div className="mt-7 flex justify-end gap-3">
              <button type="button" onClick={() => setCustomModuleOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50">
                {copy.cancel}
              </button>
              <button type="submit" className="rounded-xl bg-[#354CE1] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#2739B8]">
                {copy.builder.createModuleAction}
              </button>
            </div>
          </form>
        </div>
      )}

      <FlowInsightsDialog
        open={insightsOpen}
        copy={copy}
        project={{ ...project, flow: history.present }}
        workspace={workspace}
        onClose={() => setInsightsOpen(false)}
        onFocusNode={(nodeId) => {
          selectOnlyNode(nodeId);
          window.requestAnimationFrame(() => fitNodeIds([nodeId]));
        }}
      />
      <ScenarioSuiteDialog
        open={scenarioSuiteOpen}
        copy={copy}
        advancedCopy={advancedCopy}
        project={{ ...project, flow: history.present }}
        workspace={workspace}
        onProjectChange={onProjectChange}
        onClose={() => setScenarioSuiteOpen(false)}
        onFocusUncoveredEdge={(edgeId) => {
          const edge = history.present.edges.find((candidate) => candidate.id === edgeId);
          if (edge) setSelectedNodeId(edge.source);
          setScenarioSuiteOpen(false);
        }}
      />
      <FlowOperationsDialog
        open={operationsOpen}
        copy={copy}
        advancedCopy={advancedCopy}
        project={{ ...project, flow: history.present }}
        workspace={workspace}
        selectedNodeIds={selectedNodeIds}
        onClose={() => setOperationsOpen(false)}
        onProjectChange={onProjectChange}
        onWorkspaceChange={onWorkspaceChange}
        onFocusNode={(nodeId) => {
          setSelectedNodeId(nodeId);
          setOperationsOpen(false);
        }}
      />
    </div>
  );
}
