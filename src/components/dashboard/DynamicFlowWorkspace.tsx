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
} from 'react';
import {
  Background,
  BackgroundVariant,
  Controls,
  Handle,
  MarkerType,
  MiniMap,
  Position,
  ReactFlow,
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeProps,
  type ReactFlowInstance,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import {
  Activity,
  BadgeCheck,
  Braces,
  Check,
  ChevronRight,
  CircleStop,
  Database,
  GitBranch,
  GraduationCap,
  HeartPulse,
  IdCard,
  ListChecks,
  Network,
  Phone,
  Play,
  Plus,
  Redo2,
  ScanFace,
  Search,
  ShieldCheck,
  SmartphoneNfc,
  Trash2,
  Undo2,
  X,
  type LucideIcon,
} from 'lucide-react';
import type { DashboardCopy } from '../../translations/dashboard/DashboardPageTranslations';
import {
  BUILT_IN_MODULE_IDS,
  DATABASE_SOURCES,
  createConditionNode,
  createCustomModule,
  createVerificationNode,
  outcomesForNode,
  reconcileInterfaceManifest,
  simulateDynamicFlow,
  validateDynamicFlow,
  wouldCreateCycle,
  type BuiltInModuleId,
  type CustomModuleDefinition,
  type DatabaseSourceId,
  type DynamicFlowEdge,
  type DynamicFlowManifest,
  type DynamicFlowNode,
  type FlowProject,
  type IssuerPolicy,
  type JsonSchemaField,
  type SimulationResult,
  type SimulatorOutcome,
  type VerificationOutcome,
} from './dashboardModel';
import { useDialogFocus } from './useDialogFocus';

type FlowNodeData = {
  readonly title: string;
  readonly description: string;
  readonly kind: DynamicFlowNode['kind'];
  readonly outcomes: readonly {
    readonly id: VerificationOutcome;
    readonly label: string;
  }[];
  readonly connectionLabel: string;
  readonly issueCount: number;
  readonly simulationOrder?: number;
};

type FlowUiNode = Node<FlowNodeData>;
type FlowUiEdge = Edge;

type FlowHistory = {
  readonly past: readonly DynamicFlowManifest[];
  readonly present: DynamicFlowManifest;
  readonly future: readonly DynamicFlowManifest[];
};

type DynamicFlowWorkspaceProps = {
  readonly copy: DashboardCopy;
  readonly project: FlowProject;
  readonly onProjectChange: (project: FlowProject) => void;
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
  readonly successExpression: string;
  readonly failureExpression: string;
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
  inputSchema: 'credential:string!',
  outputSchema: 'verified:boolean!',
  successExpression: 'output.verified === true',
  failureExpression: 'output.verified !== true',
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

const parseSchema = (value: string): readonly JsonSchemaField[] | null => {
  const entries = value.split(',').map((entry) => entry.trim()).filter(Boolean);
  if (entries.length === 0) return [];

  const fields: JsonSchemaField[] = [];
  for (const entry of entries) {
    const [rawName, rawType] = entry.split(':').map((part) => part.trim());
    if (!rawName || !rawType) return null;
    const required = rawType.endsWith('!');
    const type = (required ? rawType.slice(0, -1) : rawType) as JsonSchemaField['type'];
    if (!['string', 'number', 'boolean', 'object'].includes(type)) return null;
    fields.push({
      id: `${rawName}-${fields.length}`,
      name: rawName,
      type,
      required,
    });
  }
  return fields;
};

const nodeTitle = (
  node: DynamicFlowNode,
  copy: DashboardCopy,
  customModules: readonly CustomModuleDefinition[],
): string => {
  if (node.kind === 'start') return copy.builder.startNode;
  if (node.kind === 'condition') return copy.builder.conditionName;
  if (node.kind === 'terminal') {
    return node.terminalOutcome === 'success'
      ? copy.builder.successNode
      : copy.builder.failureNode;
  }
  if (node.moduleId && BUILT_IN_MODULE_IDS.includes(node.moduleId as BuiltInModuleId)) {
    return copy.modules[node.moduleId as BuiltInModuleId].name;
  }
  return customModules.find((module) => module.id === node.moduleId)?.name
    ?? copy.builder.customModuleName;
};

const nodeDescription = (
  node: DynamicFlowNode,
  copy: DashboardCopy,
  customModules: readonly CustomModuleDefinition[],
): string => {
  if (node.kind === 'start') return copy.outcomes.next;
  if (node.kind === 'condition') {
    return node.conditionExpression || copy.builder.conditionDescription;
  }
  if (node.kind === 'terminal') {
    return node.terminalOutcome === 'success'
      ? copy.screenDefaults.success.body
      : copy.screenDefaults.error.body;
  }
  if (node.moduleId && BUILT_IN_MODULE_IDS.includes(node.moduleId as BuiltInModuleId)) {
    return copy.modules[node.moduleId as BuiltInModuleId].description;
  }
  return customModules.find((module) => module.id === node.moduleId)?.description
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
    } ${data.simulationOrder !== undefined ? 'ring-4 ring-emerald-300/40' : ''}`}>
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
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-100 px-1 text-[9px] font-bold text-rose-700">
                {data.issueCount}
              </span>
            )}
          </div>
          <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-slate-500">{data.description}</p>
        </div>
      </div>

      {data.outcomes.length > 0 && (
        <div className="mt-3 space-y-1 border-t border-slate-100 pt-2">
          {data.outcomes.map((outcome, index) => (
            <div key={outcome.id} className="relative flex items-center justify-end gap-2 pr-1 text-[9px] font-bold text-slate-500">
              <span>{outcome.label}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
              <Handle
                type="source"
                id={outcome.id}
                position={Position.Right}
                aria-label={[data.connectionLabel, outcome.label].join(ACCESSIBLE_LABEL_SEPARATOR)}
                style={{
                  top: `${68 + index * 20}px`,
                  right: '-7px',
                }}
                className="!h-3 !w-3 !border-2 !border-white !bg-[#354CE1]"
              />
            </div>
          ))}
        </div>
      )}

      {data.simulationOrder !== undefined && (
        <span className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white shadow">
          {data.simulationOrder + 1}
        </span>
      )}
    </div>
  );
}

const NODE_TYPES = {
  verificationNode: VerificationNodeCard,
};
const MINIMAP_MASK_COLOR = 'rgba(248, 250, 252, 0.78)';
const ACCESSIBLE_LABEL_SEPARATOR = ': ';

export default function DynamicFlowWorkspace({
  copy,
  project,
  onProjectChange,
  onOpenStudio,
}: DynamicFlowWorkspaceProps) {
  const [history, setHistory] = useState<FlowHistory>({
    past: [],
    present: project.flow,
    future: [],
  });
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [flowInstance, setFlowInstance] = useState<ReactFlowInstance<FlowUiNode, FlowUiEdge> | null>(null);
  const [simulatorOpen, setSimulatorOpen] = useState(false);
  const [customModuleOpen, setCustomModuleOpen] = useState(false);
  const simulatorDialogRef = useDialogFocus<HTMLDivElement>(
    simulatorOpen,
    () => setSimulatorOpen(false),
  );
  const customModuleDialogRef = useDialogFocus<HTMLFormElement>(
    customModuleOpen,
    () => setCustomModuleOpen(false),
  );
  const [customForm, setCustomForm] = useState<CustomModuleForm>(EMPTY_CUSTOM_MODULE_FORM);
  const [schemaError, setSchemaError] = useState(false);
  const [simulatorOutcomes, setSimulatorOutcomes] = useState<Record<string, SimulatorOutcome | 'true' | 'false'>>({});
  const [simulation, setSimulation] = useState<SimulationResult | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const noticeTimerRef = useRef<number | null>(null);
  const activeProjectIdRef = useRef(project.id);

  useEffect(() => {
    if (activeProjectIdRef.current !== project.id) {
      activeProjectIdRef.current = project.id;
      setHistory({ past: [], present: project.flow, future: [] });
      setSelectedNodeId(null);
      setSimulation(null);
    }
  }, [project.flow, project.id]);

  useEffect(() => () => {
    if (noticeTimerRef.current !== null) window.clearTimeout(noticeTimerRef.current);
  }, []);

  const showNotice = useCallback((message: string) => {
    setNotice(message);
    if (noticeTimerRef.current !== null) window.clearTimeout(noticeTimerRef.current);
    noticeTimerRef.current = window.setTimeout(() => setNotice(null), 3200);
  }, []);

  const validationIssues = useMemo(
    () => validateDynamicFlow(history.present, project.customModules),
    [history.present, project.customModules],
  );
  const selectedNode = history.present.nodes.find((node) => node.id === selectedNodeId) ?? null;
  const simulationOrder = useMemo(
    () => new Map(simulation?.steps.map((step, index) => [step.nodeId, index]) ?? []),
    [simulation],
  );

  const toUiNode = useCallback((node: DynamicFlowNode): FlowUiNode => ({
    id: node.id,
    type: 'verificationNode',
    position: node.position,
    data: {
      title: nodeTitle(node, copy, project.customModules),
      description: nodeDescription(node, copy, project.customModules),
      kind: node.kind,
      outcomes: outcomesForNode(node, project.customModules).map((outcome) => ({
        id: outcome,
        label: copy.outcomes[outcome],
      })),
      connectionLabel: copy.builder.connectionHandle,
      issueCount: validationIssues.filter((issue) => issue.nodeId === node.id).length,
      simulationOrder: simulationOrder.get(node.id),
    },
    deletable: node.kind !== 'start' && node.kind !== 'terminal',
  }), [copy, project.customModules, simulationOrder, validationIssues]);

  const toUiEdge = useCallback((edge: DynamicFlowEdge): FlowUiEdge => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    sourceHandle: edge.outcome,
    label: copy.outcomes[edge.outcome],
    markerEnd: { type: MarkerType.ArrowClosed, color: '#64748B' },
    style: {
      stroke: simulation?.steps.some(
        (step, index) => step.nodeId === edge.source
          && simulation.steps[index + 1]?.nodeId === edge.target,
      ) ? '#10B981' : '#94A3B8',
      strokeWidth: 2,
    },
    labelStyle: { fontSize: 9, fontWeight: 700, fill: '#64748B' },
    labelBgStyle: { fill: '#FFFFFF', fillOpacity: 0.92 },
  }), [copy.outcomes, simulation]);

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

  const updateProjectFlow = useCallback((flow: DynamicFlowManifest) => {
    onProjectChange({
      ...project,
      flow,
      interface: reconcileInterfaceManifest(project.interface, flow),
    });
  }, [onProjectChange, project]);

  const commitFlow = useCallback((next: DynamicFlowManifest) => {
    setHistory((current) => ({
      past: [...current.past, current.present].slice(-50),
      present: next,
      future: [],
    }));
    updateProjectFlow(next);
    setSimulation(null);
  }, [updateProjectFlow]);

  const undo = () => {
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
  };

  const redo = () => {
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
  };

  const addModuleNode = useCallback((moduleId: string, position?: { x: number; y: number }) => {
    const customModule = project.customModules.find((module) => module.id === moduleId);
    const nextNode = createVerificationNode(
      moduleId,
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
  }, [commitFlow, history.present, project.customModules]);

  const addCondition = useCallback((position?: { x: number; y: number }) => {
    const nextNode = createConditionNode(position ?? {
      x: 340,
      y: 120 + (history.present.nodes.length % 4) * 170,
    });
    commitFlow({
      ...history.present,
      nodes: [...history.present.nodes, nextNode],
    });
    setSelectedNodeId(nextNode.id);
  }, [commitFlow, history.present]);

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
    if (wouldCreateCycle(history.present, connection.source, connection.target)) {
      showNotice(copy.builder.cycleRejected);
      return;
    }
    const outcome = connection.sourceHandle as VerificationOutcome;
    const existing = history.present.edges.find(
      (edge) => edge.source === connection.source && edge.outcome === outcome,
    );
    const nextEdge: DynamicFlowEdge = {
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
      });
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

  const updateSelectedNode = (patch: Partial<DynamicFlowNode>) => {
    if (!selectedNode) return;
    commitFlow({
      ...history.present,
      nodes: history.present.nodes.map((node) => node.id === selectedNode.id
        ? { ...node, ...patch }
        : node),
    });
  };

  const removeSelectedNode = () => {
    if (!selectedNode || selectedNode.kind === 'start' || selectedNode.kind === 'terminal') {
      showNotice(copy.builder.protectedNode);
      return;
    }
    commitFlow({
      ...history.present,
      nodes: history.present.nodes.filter((node) => node.id !== selectedNode.id),
      edges: history.present.edges.filter(
        (edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id,
      ),
    });
    setSelectedNodeId(null);
  };

  const toggleDatabaseSource = (sourceId: DatabaseSourceId) => {
    if (!selectedNode) return;
    const currentIds = selectedNode.config.selectedDatabaseSourceIds;
    const nextIds = currentIds.includes(sourceId)
      ? currentIds.filter((id) => id !== sourceId)
      : [...currentIds, sourceId];
    updateSelectedNode({
      config: {
        ...selectedNode.config,
        selectedDatabaseSourceIds: nextIds,
      },
    });
  };

  const handleCustomModuleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const inputSchema = parseSchema(customForm.inputSchema);
    const outputSchema = parseSchema(customForm.outputSchema);
    if (!inputSchema || !outputSchema) {
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
    const module = createCustomModule({
      name: customForm.name.trim(),
      version: customForm.version.trim(),
      description: customForm.description.trim(),
      credentialType: customForm.credentialType.trim(),
      didResolverUrl: customForm.didResolverUrl.trim(),
      verificationMethod: customForm.verificationMethod.trim(),
      issuerPolicy,
      inputSchema,
      outputSchema,
      successExpression: customForm.successExpression.trim(),
      failureExpression: customForm.failureExpression.trim(),
      defaultUi: {
        title: customForm.uiTitle.trim(),
        description: customForm.uiDescription.trim(),
        actionLabel: customForm.uiAction.trim(),
      },
    });
    onProjectChange({
      ...project,
      flow: history.present,
      customModules: [...project.customModules, module],
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
  const filteredCustomModules = project.customModules.filter((module) => {
    const query = search.trim().toLocaleLowerCase();
    return !query
      || module.name.toLocaleLowerCase().includes(query)
      || module.description.toLocaleLowerCase().includes(query);
  });

  const openSimulator = () => {
    const defaults: Record<string, SimulatorOutcome | 'true' | 'false'> = {};
    for (const node of history.present.nodes) {
      if (node.kind === 'condition') defaults[node.id] = 'true';
      if (node.kind === 'verification') {
        defaults[node.id] = node.moduleId === 'database-cross-check' ? 'notMatched' : 'success';
      }
    }
    setSimulatorOutcomes(defaults);
    setSimulation(null);
    setSimulatorOpen(true);
  };

  const runSimulation = () => {
    setSimulation(simulateDynamicFlow(history.present, simulatorOutcomes));
  };

  return (
    <div className="flex min-h-[calc(100vh-72px)] flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 bg-white px-4 py-3 sm:px-5">
        <div className="mr-auto min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#354CE1]">{copy.builder.breadcrumb}</p>
          <h1 className="truncate font-display text-lg font-bold text-slate-950">{project.name}</h1>
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
          onClick={openSimulator}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
        >
          <Play className="h-3.5 w-3.5" />
          {copy.builder.simulate}
        </button>
        <button
          type="button"
          onClick={onOpenStudio}
          className="inline-flex items-center gap-2 rounded-lg bg-[#354CE1] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#2739B8]"
        >
          {copy.builder.openStudio}
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="grid flex-1 xl:grid-cols-[276px_minmax(520px,1fr)_318px]">
        <aside className="border-b border-slate-200 bg-white p-4 xl:border-b-0 xl:border-r">
          <h2 className="font-display text-sm font-bold text-slate-950">{copy.builder.moduleLibrary}</h2>
          <p className="mt-1 text-[11px] leading-5 text-slate-500">{copy.builder.libraryDescription}</p>
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

          <div className="sidebar-scrollbar mt-5 max-h-[calc(100vh-270px)] space-y-5 overflow-y-auto pr-1">
            <div>
              <p className="px-1 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">{copy.builder.controlCategory}</p>
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
                  <span className="mt-1 line-clamp-2 block text-[10px] leading-4 text-slate-500">{copy.builder.conditionDescription}</span>
                </span>
              </button>
            </div>

            <div>
              <p className="px-1 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">{copy.builder.verificationCategory}</p>
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
                        <span className="mt-1 line-clamp-2 block text-[10px] leading-4 text-slate-500">{moduleCopy.description}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="px-1 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">{copy.builder.customCategory}</p>
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
                      <span className="mt-1 line-clamp-2 block text-[10px] leading-4 text-slate-500">{module.description}</span>
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
                    <span className="mt-1 line-clamp-2 block text-[10px] leading-4 text-slate-500">{copy.builder.customModuleDescription}</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </aside>

        <section className="relative min-h-[620px] bg-[#F8FAFC]">
          <div className="absolute left-4 top-4 z-10">
            <div className={`inline-flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-[10px] font-bold shadow-sm ${
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
          <ReactFlow<FlowUiNode, FlowUiEdge>
            nodes={nodes}
            edges={edges}
            nodeTypes={NODE_TYPES}
            onInit={setFlowInstance}
            onNodesChange={onNodesChange}
            onEdgesChange={handleEdgeChanges}
            onConnect={handleConnect}
            onNodeClick={(_event, node) => setSelectedNodeId(node.id)}
            onPaneClick={() => setSelectedNodeId(null)}
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
            defaultEdgeOptions={{ type: 'smoothstep' }}
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

        <aside className="border-t border-slate-200 bg-white p-4 xl:border-l xl:border-t-0">
          <h2 className="font-display text-sm font-bold text-slate-950">{copy.builder.inspector}</h2>
          {selectedNode ? (
            <div className="mt-4 space-y-5">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-bold text-slate-900">{nodeTitle(selectedNode, copy, project.customModules)}</p>
                <p className="mt-1 text-[10px] leading-4 text-slate-500">{nodeDescription(selectedNode, copy, project.customModules)}</p>
              </div>

              {selectedNode.kind === 'verification' && (
                <label className="block">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-slate-500">{copy.builder.retryLimit}</span>
                  <input
                    type="number"
                    min={0}
                    max={5}
                    value={selectedNode.config.retryLimit}
                    onChange={(event) => updateSelectedNode({
                      config: {
                        ...selectedNode.config,
                        retryLimit: Math.max(0, Math.min(5, Number(event.target.value) || 0)),
                      },
                    })}
                    className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#354CE1]"
                  />
                </label>
              )}

              {selectedNode.kind === 'condition' && (
                <label className="block">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-slate-500">{copy.builder.conditionExpression}</span>
                  <textarea
                    rows={4}
                    value={selectedNode.conditionExpression ?? ''}
                    onChange={(event) => updateSelectedNode({ conditionExpression: event.target.value })}
                    placeholder={copy.builder.conditionPlaceholder}
                    className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-3 py-2.5 font-mono text-xs outline-none focus:border-[#354CE1]"
                  />
                </label>
              )}

              {selectedNode.moduleId === 'database-cross-check' && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">{copy.builder.databaseSources}</p>
                  <p className="mt-1 text-[10px] leading-4 text-slate-400">{copy.builder.databaseSourceHint}</p>
                  <div className="mt-3 space-y-2">
                    {DATABASE_SOURCES.map((source) => {
                      const checked = selectedNode.config.selectedDatabaseSourceIds.includes(source.id);
                      return (
                        <label
                          key={source.id}
                          className={`flex cursor-pointer items-start gap-2 rounded-xl border p-3 ${
                            checked ? 'border-[#354CE1] bg-[#F6F7FF]' : 'border-slate-200'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleDatabaseSource(source.id)}
                            className="mt-0.5 accent-[#354CE1]"
                          />
                          <span>
                            <span className="flex items-center gap-2 text-[11px] font-bold text-slate-800">
                              {copy.databaseSources[source.id].name}
                              <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[8px] uppercase text-slate-500">
                                {source.scope === 'domestic' ? copy.builder.domestic : copy.builder.international}
                              </span>
                            </span>
                            <span className="mt-1 block text-[9px] leading-4 text-slate-500">{copy.databaseSources[source.id].description}</span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {validationIssues.some((issue) => issue.nodeId === selectedNode.id) && (
                <div className="space-y-2 rounded-xl border border-amber-200 bg-amber-50 p-3">
                  {validationIssues
                    .filter((issue) => issue.nodeId === selectedNode.id)
                    .map((issue, index) => (
                      <p key={`${issue.code}-${index}`} className="text-[10px] font-semibold leading-4 text-amber-800">
                        {copy.validation[issue.code]}
                      </p>
                    ))}
                </div>
              )}

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
          ) : (
            <div className="mt-4 rounded-2xl border border-dashed border-slate-200 px-4 py-10 text-center">
              <Network className="mx-auto h-6 w-6 text-slate-300" />
              <p className="mt-3 text-xs leading-5 text-slate-400">{copy.builder.inspectorEmpty}</p>
            </div>
          )}

          {validationIssues.length > 0 && (
            <div className="mt-5 border-t border-slate-100 pt-5">
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">{copy.builder.validate}</p>
              <div className="mt-2 space-y-2">
                {validationIssues.slice(0, 5).map((issue, index) => (
                  <button
                    key={`${issue.code}-${issue.nodeId ?? issue.edgeId ?? index}`}
                    type="button"
                    onClick={() => issue.nodeId && setSelectedNodeId(issue.nodeId)}
                    className="w-full rounded-lg bg-amber-50 px-3 py-2 text-left text-[10px] font-semibold leading-4 text-amber-800"
                  >
                    {copy.validation[issue.code]}
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

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
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-7"
          >
            <button type="button" aria-label={copy.close} onClick={() => setSimulatorOpen(false)} className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 hover:bg-slate-100">
              <X className="h-4 w-4" />
            </button>
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF0FF] text-[#354CE1]">
              <Play className="h-5 w-5" />
            </span>
            <h2 className="mt-4 font-display text-xl font-bold text-slate-950">{copy.builder.simulatorTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">{copy.builder.simulatorDescription}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {history.present.nodes
                .filter((node) => node.kind === 'verification' || node.kind === 'condition')
                .map((node) => {
                  const outcomes = outcomesForNode(node, project.customModules).filter(
                    (outcome) => outcome !== 'next',
                  );
                  return (
                    <label key={node.id} className="rounded-xl border border-slate-200 p-3">
                      <span className="block text-[10px] font-bold text-slate-500">
                        {copy.builder.outcomeFor} {nodeTitle(node, copy, project.customModules)}
                      </span>
                      <select
                        value={simulatorOutcomes[node.id] ?? outcomes[0]}
                        onChange={(event) => setSimulatorOutcomes((current) => ({
                          ...current,
                          [node.id]: event.target.value as SimulatorOutcome | 'true' | 'false',
                        }))}
                        className="mt-2 w-full rounded-lg border border-slate-200 px-2.5 py-2 text-xs font-semibold outline-none focus:border-[#354CE1]"
                      >
                        {outcomes.map((outcome) => (
                          <option key={outcome} value={outcome}>{copy.outcomes[outcome]}</option>
                        ))}
                      </select>
                    </label>
                  );
                })}
            </div>

            <button
              type="button"
              onClick={runSimulation}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#354CE1] px-4 py-3 text-sm font-bold text-white hover:bg-[#2739B8]"
            >
              <Play className="h-4 w-4" />
              {copy.builder.runSimulation}
            </button>

            <div className="mt-6 rounded-2xl bg-slate-950 p-4 text-white">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">{copy.builder.executionPath}</p>
              {simulation ? (
                <>
                  <div className="mt-4 space-y-2">
                    {simulation.steps.map((step, index) => {
                      const node = history.present.nodes.find((candidate) => candidate.id === step.nodeId);
                      return (
                        <div key={`${step.nodeId}-${index}`} className="flex items-center gap-3">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold">{index + 1}</span>
                          <span className="min-w-0 flex-1 truncate text-xs font-semibold">
                            {node ? nodeTitle(node, copy, project.customModules) : step.nodeId}
                          </span>
                          {step.outcome && <span className="text-[10px] font-bold text-[#AAB3FF]">{copy.outcomes[step.outcome]}</span>}
                        </div>
                      );
                    })}
                  </div>
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
                </>
              ) : (
                <p className="mt-3 text-xs text-slate-400">{copy.builder.noSimulation}</p>
              )}
            </div>
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
            <h2 className="pr-10 font-display text-xl font-bold text-slate-950">{copy.builder.createModuleTitle}</h2>
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
                ['successExpression', copy.builder.successExpressionLabel],
                ['failureExpression', copy.builder.failureExpressionLabel],
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
    </div>
  );
}
