/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  collectUpstreamNodeIds,
  INPUT_BINDING_ISSUE_CODES,
  isConditionOperatorCompatible,
  validateInputBindings,
  type InputBindingIssueCode,
  type NodeOutputContract,
} from './conditionEngine';
import { DATABASE_SOURCE_IDS } from './dashboardModuleRegistry';
import { validateDatabaseStrategy } from './databaseStrategyEngine';
import { isLocale } from '../../types/routes';
import { validateDashboardEnvironment } from './releaseEngine';
import {
  isModuleRefAvailable,
  outcomesForNodeV2,
  resolveModuleContract,
} from './dashboardV2Model';
import type {
  ConditionDefinition,
  ConditionGroup,
  ConditionRule,
  DashboardWorkspaceV2,
  DataReference,
  DatabaseStrategy,
  DynamicFlowManifestV2,
  DynamicFlowNodeV2,
  FlowField,
  FlowFieldType,
  FlowProjectContentV2,
  FlowScenario,
  InterfaceBlock,
  InterfaceManifestV2,
  InterfaceScreenV2,
  JsonValue,
  ModuleContract,
  ModulePackage,
  ModuleVersion,
  PrimitiveFieldType,
  ProjectSnapshotV2,
  SubflowPackage,
} from './dashboardV2Types';

export type FlowValidationCode =
  | 'missingStart'
  | 'multipleStarts'
  | 'brokenEdge'
  | 'unreachableNode'
  | 'missingOutcome'
  | 'terminalHasOutput'
  | 'cycleDetected'
  | 'missingModule'
  | 'missingSubflow'
  | 'missingDatabaseSource'
  | 'invalidDatabaseStrategy'
  | 'emptyCondition'
  | 'staleConditionReference'
  | 'conditionOperatorTypeMismatch'
  | InputBindingIssueCode;

export type FlowValidationIssue = {
  readonly code: FlowValidationCode;
  readonly nodeId?: string;
  readonly edgeId?: string;
  readonly fieldId?: string;
};

const outputContracts = (
  manifest: DynamicFlowManifestV2,
  moduleCatalog: readonly ModulePackage[],
  subflowCatalog: readonly SubflowPackage[],
): readonly NodeOutputContract[] => manifest.nodes.flatMap((node) => {
  if (node.kind === 'verification') {
    const contract = resolveModuleContract(node.moduleRef, moduleCatalog);
    return contract ? [{ nodeId: node.id, fields: contract.outputFields }] : [];
  }
  if (node.kind === 'subflow') {
    const contract = subflowCatalog
      .find((item) => item.id === node.subflowRef.packageId)
      ?.versions.find((version) => version.version === node.subflowRef.version)
      ?.contract;
    return contract ? [{ nodeId: node.id, fields: contract.outputFields }] : [];
  }
  return [];
});

const primitiveType = (value: unknown): PrimitiveFieldType | undefined => {
  if (typeof value === 'string') return 'string';
  if (typeof value === 'boolean') return 'boolean';
  if (typeof value === 'number' && Number.isFinite(value)) return 'number';
  return undefined;
};

const typeForReference = (
  reference: DataReference,
  flowInputs: readonly FlowField[],
  outputs: readonly NodeOutputContract[],
): FlowFieldType | undefined => {
  if (reference.kind === 'literal') {
    const actualType = primitiveType(reference.value);
    return actualType === reference.valueType ? actualType : undefined;
  }
  if (reference.kind === 'flowInput') {
    return flowInputs.find((field) => field.id === reference.fieldId)?.type;
  }
  return outputs
    .find((output) => output.nodeId === reference.nodeId)
    ?.fields.find((field) => field.id === reference.fieldId)?.type;
};

const fieldForDataReference = (
  reference: DataReference,
  flowInputs: readonly FlowField[],
  outputs: readonly NodeOutputContract[],
): FlowField | undefined => {
  if (reference.kind === 'literal') return undefined;
  if (reference.kind === 'flowInput') {
    return flowInputs.find((field) => field.id === reference.fieldId);
  }
  return outputs
    .find((output) => output.nodeId === reference.nodeId)
    ?.fields.find((field) => field.id === reference.fieldId);
};

const conditionRules = (group: ConditionGroup): readonly ConditionRule[] =>
  group.conditions.flatMap((condition) =>
    condition.kind === 'rule' ? [condition] : conditionRules(condition));

const containsEmptyConditionGroup = (group: ConditionGroup): boolean =>
  group.conditions.length === 0
  || group.conditions.some((condition) =>
    condition.kind === 'group' && containsEmptyConditionGroup(condition));

const validateCondition = (
  node: Extract<DynamicFlowNodeV2, { readonly kind: 'condition' }>,
  manifest: DynamicFlowManifestV2,
  outputs: readonly NodeOutputContract[],
): readonly FlowValidationIssue[] => {
  const issues: FlowValidationIssue[] = [];
  if (node.condition.migrationState === 'requiresConversion') {
    issues.push({
      code: INPUT_BINDING_ISSUE_CODES.legacyCondition,
      nodeId: node.id,
    });
    return issues;
  }
  const rules = conditionRules(node.condition.root);
  if (rules.length === 0 || containsEmptyConditionGroup(node.condition.root)) {
    issues.push({ code: 'emptyCondition', nodeId: node.id });
  }
  const upstreamIds = collectUpstreamNodeIds(manifest.edges, node.id);
  for (const rule of rules) {
    const references = [rule.left, rule.right].filter(
      (value): value is DataReference => Boolean(value),
    );
    for (const reference of references) {
      if (reference.kind === 'literal') continue;
      const sourceType = typeForReference(
        reference,
        manifest.inputSchema.fields,
        outputs,
      );
      if (
        !sourceType
        || (reference.kind === 'nodeOutput' && !upstreamIds.has(reference.nodeId))
      ) {
        issues.push({
          code: 'staleConditionReference',
          nodeId: node.id,
          fieldId: reference.fieldId,
        });
      }
    }

    const leftType = typeForReference(
      rule.left,
      manifest.inputSchema.fields,
      outputs,
    );
    const unary = rule.operator === 'exists' || rule.operator === 'notExists';
    const rightType = rule.right
      ? typeForReference(rule.right, manifest.inputSchema.fields, outputs)
      : undefined;
    if (
      !leftType
      || !isConditionOperatorCompatible(leftType, rule.operator)
      || (unary && rule.right !== undefined)
      || (!unary && (!rule.right || !rightType || rightType !== leftType))
    ) {
      issues.push({
        code: 'conditionOperatorTypeMismatch',
        nodeId: node.id,
      });
    }
  }
  return issues;
};

const hasGraphCycle = (manifest: DynamicFlowManifestV2): boolean => {
  const visited = new Set<string>();
  const active = new Set<string>();
  const adjacency = new Map<string, string[]>();
  for (const edge of manifest.edges) {
    adjacency.set(edge.source, [...(adjacency.get(edge.source) ?? []), edge.target]);
  }
  const visit = (nodeId: string): boolean => {
    if (active.has(nodeId)) return true;
    if (visited.has(nodeId)) return false;
    visited.add(nodeId);
    active.add(nodeId);
    for (const target of adjacency.get(nodeId) ?? []) {
      if (visit(target)) return true;
    }
    active.delete(nodeId);
    return false;
  };
  return manifest.nodes.some((node) => visit(node.id));
};

export const validateDynamicFlowV2 = (
  manifest: DynamicFlowManifestV2,
  moduleCatalog: readonly ModulePackage[] = [],
  subflowCatalog: readonly SubflowPackage[] = [],
): readonly FlowValidationIssue[] => {
  const issues: FlowValidationIssue[] = [];
  const starts = manifest.nodes.filter((node) => node.kind === 'start');
  if (starts.length === 0) issues.push({ code: 'missingStart' });
  if (starts.length > 1) issues.push({ code: 'multipleStarts' });

  const nodeIds = new Set(manifest.nodes.map((node) => node.id));
  for (const edge of manifest.edges) {
    if (!nodeIds.has(edge.source) || !nodeIds.has(edge.target)) {
      issues.push({ code: 'brokenEdge', edgeId: edge.id });
    }
  }

  const outputs = outputContracts(manifest, moduleCatalog, subflowCatalog);
  for (const node of manifest.nodes) {
    const outgoing = manifest.edges.filter((edge) => edge.source === node.id);
    if (node.kind === 'terminal' && outgoing.length > 0) {
      issues.push({ code: 'terminalHasOutput', nodeId: node.id });
    }
    if (node.kind !== 'terminal') {
      const requiredOutcomes = outcomesForNodeV2(node, moduleCatalog);
      if (requiredOutcomes.some(
        (outcome) => !outgoing.some((edge) => edge.outcome === outcome),
      )) {
        issues.push({ code: 'missingOutcome', nodeId: node.id });
      }
    }

    if (node.kind === 'verification') {
      const contract = resolveModuleContract(node.moduleRef, moduleCatalog);
      if (!contract || !isModuleRefAvailable(node.moduleRef, moduleCatalog)) {
        issues.push({ code: 'missingModule', nodeId: node.id });
      } else {
        const bindingIssues = validateInputBindings({
          targetNodeId: node.id,
          targetFields: contract.inputFields,
          bindings: node.bindings,
          flowInputFields: manifest.inputSchema.fields,
          nodeOutputs: outputs,
          edges: manifest.edges,
        });
        issues.push(...bindingIssues.map((issue) => ({
          code: issue.code,
          nodeId: node.id,
          fieldId: issue.targetFieldId ?? issue.sourceFieldId,
        })));
      }
      if (node.moduleRef.packageId === 'database-cross-check') {
        if (node.selectedDatabaseSourceIds.length === 0) {
          issues.push({ code: 'missingDatabaseSource', nodeId: node.id });
        } else {
          const strategyIssues = validateDatabaseStrategy(
            node.databaseStrategy ?? {
              executionMode: 'parallel',
              aggregation: 'anyMatch',
              stopOnMatch: true,
              requiredSourceIds: [],
              unavailablePolicy: 'continue',
            },
            node.selectedDatabaseSourceIds,
          );
          if (strategyIssues.some((issue) => issue.severity === 'error')) {
            issues.push({ code: 'invalidDatabaseStrategy', nodeId: node.id });
          }
          if (node.selectedDatabaseSourceIds.some(
            (sourceId) => !DATABASE_SOURCE_IDS.includes(
              sourceId as typeof DATABASE_SOURCE_IDS[number],
            ),
          )) {
            issues.push({ code: 'missingDatabaseSource', nodeId: node.id });
          }
        }
      }
    }

    if (node.kind === 'subflow') {
      const version = subflowCatalog
        .find((item) => item.id === node.subflowRef.packageId)
        ?.versions.find((item) => item.version === node.subflowRef.version);
      if (!version) {
        issues.push({ code: 'missingSubflow', nodeId: node.id });
      } else {
        const bindingIssues = validateInputBindings({
          targetNodeId: node.id,
          targetFields: version.contract.inputFields,
          bindings: node.bindings,
          flowInputFields: manifest.inputSchema.fields,
          nodeOutputs: outputs,
          edges: manifest.edges,
        });
        issues.push(...bindingIssues.map((issue) => ({
          code: issue.code,
          nodeId: node.id,
          fieldId: issue.targetFieldId ?? issue.sourceFieldId,
        })));
      }
    }

    if (node.kind === 'condition') {
      issues.push(...validateCondition(node, manifest, outputs));
    }
  }

  const start = starts[0];
  if (start) {
    const reachable = new Set<string>();
    const stack = [start.id];
    while (stack.length > 0) {
      const nodeId = stack.pop()!;
      if (reachable.has(nodeId)) continue;
      reachable.add(nodeId);
      for (const edge of manifest.edges) {
        if (edge.source === nodeId && nodeIds.has(edge.target)) stack.push(edge.target);
      }
    }
    for (const node of manifest.nodes) {
      const unusedTerminal = node.kind === 'terminal'
        && !manifest.edges.some((edge) => edge.target === node.id);
      if (!reachable.has(node.id) && !unusedTerminal) {
        issues.push({ code: 'unreachableNode', nodeId: node.id });
      }
    }
  }

  if (hasGraphCycle(manifest)) issues.push({ code: 'cycleDetected' });
  return issues.filter(
    (issue, index, all) => all.findIndex(
      (candidate) => candidate.code === issue.code
        && candidate.nodeId === issue.nodeId
        && candidate.edgeId === issue.edgeId
        && candidate.fieldId === issue.fieldId,
    ) === index,
  );
};

type UnknownRecord = Readonly<Record<string, unknown>>;

const isRecord = (value: unknown): value is UnknownRecord =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);

const hasOnlyKeys = (
  value: UnknownRecord,
  keys: readonly string[],
): boolean => Object.keys(value).every((key) => keys.includes(key));

const isString = (value: unknown): value is string => typeof value === 'string';
const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';
const isFiniteNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);
const isStringArray = (value: unknown): value is readonly string[] =>
  Array.isArray(value) && value.every(isString);
const isOneOf = <T extends string | number>(
  value: unknown,
  values: readonly T[],
): value is T => values.includes(value as T);

const isJsonValue = (value: unknown, depth = 0): value is JsonValue => {
  if (depth > 64) return false;
  if (
    value === null
    || typeof value === 'string'
    || typeof value === 'boolean'
  ) {
    return true;
  }
  if (typeof value === 'number') return Number.isFinite(value);
  if (Array.isArray(value)) {
    return value.every((item) => isJsonValue(item, depth + 1));
  }
  return isRecord(value)
    && Object.values(value).every((item) => isJsonValue(item, depth + 1));
};

const isFlowFieldShape = (value: unknown, depth = 0): value is FlowField => {
  if (
    depth > 32
    || !isRecord(value)
    || !hasOnlyKeys(value, [
      'id',
      'key',
      'type',
      'format',
      'required',
      'classification',
      'safeForResult',
      'itemType',
      'children',
    ])
  ) {
    return false;
  }
  return isString(value.id)
    && isString(value.key)
    && isOneOf(value.type, ['string', 'number', 'boolean', 'object', 'array'])
    && isOneOf(value.format, [
      'none',
      'date',
      'dateTime',
      'countryCode',
      'did',
      'email',
      'phone',
      'uri',
    ])
    && isBoolean(value.required)
    && isOneOf(value.classification, [
      'publicMetadata',
      'internalMetadata',
      'pii',
      'sensitivePii',
      'biometric',
      'credential',
      'secret',
    ])
    && isBoolean(value.safeForResult)
    && (
      value.itemType === undefined
      || isOneOf(value.itemType, ['string', 'number', 'boolean', 'object', 'array'])
    )
    && (
      value.children === undefined
      || (
        Array.isArray(value.children)
        && value.children.every((field) => isFlowFieldShape(field, depth + 1))
      )
    );
};

const isModuleRefShape = (value: unknown): boolean =>
  isRecord(value)
  && hasOnlyKeys(value, ['packageId', 'version'])
  && isString(value.packageId)
  && isString(value.version);

const isDataReferenceShape = (value: unknown): value is DataReference => {
  if (!isRecord(value) || !isString(value.kind)) return false;
  if (value.kind === 'flowInput') {
    return hasOnlyKeys(value, ['kind', 'fieldId']) && isString(value.fieldId);
  }
  if (value.kind === 'nodeOutput') {
    return hasOnlyKeys(value, ['kind', 'nodeId', 'fieldId'])
      && isString(value.nodeId)
      && isString(value.fieldId);
  }
  if (value.kind === 'literal') {
    return hasOnlyKeys(value, ['kind', 'valueType', 'value'])
      && isOneOf(value.valueType, ['string', 'number', 'boolean'])
      && (
        (value.valueType === 'string' && typeof value.value === 'string')
        || (value.valueType === 'number' && isFiniteNumber(value.value))
        || (value.valueType === 'boolean' && typeof value.value === 'boolean')
      );
  }
  return false;
};

const isConditionGroupStorageShape = (
  value: unknown,
  depth = 0,
): value is ConditionGroup => {
  if (
    depth > 32
    || !isRecord(value)
    || !hasOnlyKeys(value, ['id', 'kind', 'combinator', 'conditions'])
    || !isString(value.id)
    || value.kind !== 'group'
    || !isOneOf(value.combinator, ['and', 'or'])
    || !Array.isArray(value.conditions)
  ) {
    return false;
  }
  return value.conditions.every((condition) => {
    if (!isRecord(condition)) return false;
    if (condition.kind === 'group') {
      return isConditionGroupStorageShape(condition, depth + 1);
    }
    return condition.kind === 'rule'
      && hasOnlyKeys(condition, ['id', 'kind', 'left', 'operator', 'right'])
      && isString(condition.id)
      && isDataReferenceShape(condition.left)
      && isOneOf(condition.operator, [
        'equals',
        'notEquals',
        'contains',
        'startsWith',
        'endsWith',
        'greaterThan',
        'greaterThanOrEqual',
        'lessThan',
        'lessThanOrEqual',
        'exists',
        'notExists',
      ])
      && (condition.right === undefined || isDataReferenceShape(condition.right));
  });
};

const isConditionDefinitionStorageShape = (
  value: unknown,
): value is ConditionDefinition =>
  isRecord(value)
  && hasOnlyKeys(value, ['root', 'legacyExpression', 'migrationState'])
  && isConditionGroupStorageShape(value.root)
  && (value.legacyExpression === undefined || isString(value.legacyExpression))
  && isOneOf(value.migrationState, ['native', 'requiresConversion']);

const isInputBindingShape = (value: unknown): boolean =>
  isRecord(value)
  && hasOnlyKeys(value, ['id', 'targetFieldId', 'source'])
  && isString(value.id)
  && isString(value.targetFieldId)
  && isDataReferenceShape(value.source);

const isDatabaseStrategyStorageShape = (
  value: unknown,
): value is DatabaseStrategy =>
  isRecord(value)
  && hasOnlyKeys(value, [
    'executionMode',
    'aggregation',
    'stopOnMatch',
    'requiredSourceIds',
    'unavailablePolicy',
    'quorum',
    'weightedThreshold',
    'sourceWeights',
  ])
  && isOneOf(value.executionMode, ['parallel', 'sequential'])
  && isOneOf(value.aggregation, ['anyMatch', 'allClear', 'quorum', 'weighted'])
  && isBoolean(value.stopOnMatch)
  && isStringArray(value.requiredSourceIds)
  && isOneOf(value.unavailablePolicy, [
    'continue',
    'inconclusive',
    'sourceUnavailable',
  ])
  && (value.quorum === undefined || isFiniteNumber(value.quorum))
  && (
    value.weightedThreshold === undefined
    || isFiniteNumber(value.weightedThreshold)
  )
  && (
    value.sourceWeights === undefined
    || (
      isRecord(value.sourceWeights)
      && Object.values(value.sourceWeights).every(isFiniteNumber)
    )
  );

const isFlowNodeStorageShape = (value: unknown): value is DynamicFlowNodeV2 => {
  if (
    !isRecord(value)
    || !isString(value.id)
    || !isString(value.kind)
    || !isRecord(value.position)
    || !hasOnlyKeys(value.position, ['x', 'y'])
    || !isFiniteNumber(value.position.x)
    || !isFiniteNumber(value.position.y)
    || (value.name !== undefined && !isString(value.name))
  ) {
    return false;
  }
  const base = ['id', 'kind', 'position', 'name'];
  if (value.kind === 'start') return hasOnlyKeys(value, base);
  if (value.kind === 'terminal') {
    return hasOnlyKeys(value, [...base, 'terminalOutcome'])
      && isOneOf(value.terminalOutcome, ['success', 'failure']);
  }
  if (value.kind === 'condition') {
    return hasOnlyKeys(value, [...base, 'condition'])
      && isConditionDefinitionStorageShape(value.condition);
  }
  if (value.kind === 'subflow') {
    return hasOnlyKeys(value, [...base, 'subflowRef', 'bindings'])
      && isModuleRefShape(value.subflowRef)
      && Array.isArray(value.bindings)
      && value.bindings.every(isInputBindingShape);
  }
  return value.kind === 'verification'
    && hasOnlyKeys(value, [
      ...base,
      'moduleRef',
      'bindings',
      'retryPolicy',
      'selectedDatabaseSourceIds',
      'databaseStrategy',
    ])
    && isModuleRefShape(value.moduleRef)
    && Array.isArray(value.bindings)
    && value.bindings.every(isInputBindingShape)
    && isRecord(value.retryPolicy)
    && hasOnlyKeys(value.retryPolicy, ['maxAttempts'])
    && isFiniteNumber(value.retryPolicy.maxAttempts)
    && isStringArray(value.selectedDatabaseSourceIds)
    && (
      value.databaseStrategy === undefined
      || isDatabaseStrategyStorageShape(value.databaseStrategy)
    );
};

const isDynamicFlowStorageShape = (
  value: unknown,
): value is DynamicFlowManifestV2 =>
  isRecord(value)
  && hasOnlyKeys(value, ['schemaVersion', 'inputSchema', 'nodes', 'edges'])
  && value.schemaVersion === 2
  && isRecord(value.inputSchema)
  && hasOnlyKeys(value.inputSchema, ['fields'])
  && Array.isArray(value.inputSchema.fields)
  && value.inputSchema.fields.every((field) => isFlowFieldShape(field))
  && Array.isArray(value.nodes)
  && value.nodes.every(isFlowNodeStorageShape)
  && Array.isArray(value.edges)
  && value.edges.every((edge) =>
    isRecord(edge)
    && hasOnlyKeys(edge, ['id', 'source', 'target', 'outcome'])
    && isString(edge.id)
    && isString(edge.source)
    && isString(edge.target)
    && isString(edge.outcome));

const isLocalizedContentShape = (value: unknown): boolean =>
  isRecord(value)
  && Object.entries(value).every(
    ([locale, content]) => isLocale(locale) && isString(content),
  );

const isInterfaceBlockStorageShape = (
  value: unknown,
): value is InterfaceBlock => {
  if (
    !isRecord(value)
    || !isString(value.id)
    || !isString(value.kind)
    || !isBoolean(value.hidden)
    || !isBoolean(value.required)
    || (
      value.visibility !== undefined
      && (
        !isRecord(value.visibility)
        || !hasOnlyKeys(value.visibility, ['condition'])
        || !isConditionGroupStorageShape(value.visibility.condition)
      )
    )
  ) {
    return false;
  }
  const base = ['id', 'kind', 'hidden', 'required', 'visibility'];
  if (value.kind === 'heading') {
    return hasOnlyKeys(value, [...base, 'level', 'content'])
      && isOneOf(value.level, [1, 2, 3])
      && isLocalizedContentShape(value.content);
  }
  if (value.kind === 'text') {
    return hasOnlyKeys(value, [...base, 'content'])
      && isLocalizedContentShape(value.content);
  }
  if (value.kind === 'illustration') {
    return hasOnlyKeys(value, [...base, 'source', 'value', 'alt'])
      && isOneOf(value.source, ['asset', 'url'])
      && isString(value.value)
      && isLocalizedContentShape(value.alt);
  }
  if (value.kind === 'consent') {
    return hasOnlyKeys(value, [
      ...base,
      'scopeIds',
      'content',
      'consentRequired',
    ])
      && isStringArray(value.scopeIds)
      && isLocalizedContentShape(value.content)
      && isBoolean(value.consentRequired);
  }
  if (value.kind === 'credentialRequest') {
    return hasOnlyKeys(value, [...base, 'credentialType', 'content'])
      && isString(value.credentialType)
      && isLocalizedContentShape(value.content);
  }
  if (value.kind === 'fieldSummary') {
    return hasOnlyKeys(value, [...base, 'fields'])
      && Array.isArray(value.fields)
      && value.fields.every((field) =>
        isRecord(field)
        && hasOnlyKeys(field, ['nodeId', 'fieldId'])
        && (field.nodeId === undefined || isString(field.nodeId))
        && isString(field.fieldId));
  }
  if (value.kind === 'instruction') {
    return hasOnlyKeys(value, [...base, 'content', 'mediaAssetId'])
      && isLocalizedContentShape(value.content)
      && (value.mediaAssetId === undefined || isString(value.mediaAssetId));
  }
  if (value.kind === 'progress') {
    return hasOnlyKeys(value, [...base, 'mode', 'value'])
      && isOneOf(value.mode, ['determinate', 'indeterminate', 'steps'])
      && (value.value === undefined || isFiniteNumber(value.value));
  }
  if (value.kind === 'status') {
    return hasOnlyKeys(value, [...base, 'tone', 'content'])
      && isOneOf(value.tone, [
        'neutral',
        'info',
        'success',
        'warning',
        'error',
      ])
      && isLocalizedContentShape(value.content);
  }
  return value.kind === 'actionGroup'
    && hasOnlyKeys(value, [...base, 'actions'])
    && Array.isArray(value.actions)
    && value.actions.every((action) =>
      isRecord(action)
      && hasOnlyKeys(action, ['id', 'intent', 'label'])
      && isString(action.id)
      && isOneOf(action.intent, [
        'primary',
        'secondary',
        'cancel',
        'retry',
        'continue',
      ])
      && isLocalizedContentShape(action.label));
};

const isInterfaceScreenStorageShape = (
  value: unknown,
): value is InterfaceScreenV2 =>
  isRecord(value)
  && hasOnlyKeys(value, ['id', 'kind', 'sourceNodeId', 'variants'])
  && isString(value.id)
  && isOneOf(value.kind, [
    'welcome',
    'consent',
    'module',
    'processing',
    'success',
    'error',
  ])
  && (value.sourceNodeId === undefined || isString(value.sourceNodeId))
  && Array.isArray(value.variants)
  && value.variants.every((variant) =>
    isRecord(variant)
    && hasOnlyKeys(variant, ['id', 'state', 'outcomes', 'blocks'])
    && isString(variant.id)
    && isOneOf(variant.state, [
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
    ])
    && isStringArray(variant.outcomes)
    && Array.isArray(variant.blocks)
    && variant.blocks.every(isInterfaceBlockStorageShape));

const isColorTokensShape = (value: unknown): boolean =>
  isRecord(value)
  && hasOnlyKeys(value, [
    'primary',
    'onPrimary',
    'accent',
    'onAccent',
    'background',
    'surface',
    'text',
    'textMuted',
    'border',
    'success',
    'warning',
    'error',
    'focus',
  ])
  && Object.values(value).every(isString);

const isSafeAreaShape = (value: unknown): boolean =>
  isRecord(value)
  && hasOnlyKeys(value, ['top', 'right', 'bottom', 'left'])
  && Object.values(value).every(isFiniteNumber);

const isInterfaceStorageShape = (
  value: unknown,
): value is InterfaceManifestV2 => {
  if (
    !isRecord(value)
    || !hasOnlyKeys(value, [
      'schemaVersion',
      'defaultLocale',
      'enabledLocales',
      'contentLocaleReviewRequired',
      'layout',
      'theme',
      'screens',
      'orphanedScreens',
    ])
    || value.schemaVersion !== 2
    || !isString(value.defaultLocale)
    || !isLocale(value.defaultLocale)
    || !Array.isArray(value.enabledLocales)
    || !value.enabledLocales.every(
      (locale) => isString(locale) && isLocale(locale),
    )
    || !isBoolean(value.contentLocaleReviewRequired)
    || !isOneOf(value.layout, ['card', 'split', 'fullscreen'])
    || !isRecord(value.theme)
    || !hasOnlyKeys(value.theme, [
      'light',
      'dark',
      'typography',
      'controls',
      'borderRadius',
      'spacingScale',
      'elevation',
      'iconStyle',
      'motion',
      'branding',
      'safeAreas',
    ])
    || !isColorTokensShape(value.theme.light)
    || !isColorTokensShape(value.theme.dark)
    || !isRecord(value.theme.typography)
    || !hasOnlyKeys(value.theme.typography, [
      'fontFamily',
      'headingScale',
      'bodyScale',
      'lineHeight',
    ])
    || !isString(value.theme.typography.fontFamily)
    || !isFiniteNumber(value.theme.typography.headingScale)
    || !isFiniteNumber(value.theme.typography.bodyScale)
    || !isFiniteNumber(value.theme.typography.lineHeight)
    || !isRecord(value.theme.controls)
    || !hasOnlyKeys(value.theme.controls, ['height', 'radius', 'borderWidth'])
    || !Object.values(value.theme.controls).every(isFiniteNumber)
    || !isFiniteNumber(value.theme.borderRadius)
    || !isFiniteNumber(value.theme.spacingScale)
    || !isOneOf(value.theme.elevation, ['none', 'soft', 'raised'])
    || !isOneOf(value.theme.iconStyle, ['outline', 'filled', 'rounded'])
    || !isOneOf(value.theme.motion, ['reduced', 'standard'])
    || !isRecord(value.theme.branding)
    || !hasOnlyKeys(value.theme.branding, [
      'logoLightUrl',
      'logoDarkUrl',
      'faviconUrl',
      'illustrationAssetId',
    ])
    || !isString(value.theme.branding.logoLightUrl)
    || !isString(value.theme.branding.logoDarkUrl)
    || !isString(value.theme.branding.faviconUrl)
    || (
      value.theme.branding.illustrationAssetId !== undefined
      && !isString(value.theme.branding.illustrationAssetId)
    )
    || !isRecord(value.theme.safeAreas)
    || !hasOnlyKeys(value.theme.safeAreas, ['mobile', 'tablet', 'desktop'])
    || !isSafeAreaShape(value.theme.safeAreas.mobile)
    || !isSafeAreaShape(value.theme.safeAreas.tablet)
    || !isSafeAreaShape(value.theme.safeAreas.desktop)
    || !Array.isArray(value.screens)
    || !value.screens.every(isInterfaceScreenStorageShape)
    || !Array.isArray(value.orphanedScreens)
    || !value.orphanedScreens.every(isInterfaceScreenStorageShape)
  ) {
    return false;
  }
  return true;
};

const isScenarioAssertionShape = (value: unknown): boolean => {
  if (!isRecord(value) || !isString(value.id) || !isString(value.kind)) {
    return false;
  }
  if (value.kind === 'terminal') {
    return hasOnlyKeys(value, ['id', 'kind', 'terminalNodeId'])
      && isString(value.terminalNodeId);
  }
  if (value.kind === 'pathIncludes') {
    return hasOnlyKeys(value, ['id', 'kind', 'edgeId'])
      && isString(value.edgeId);
  }
  if (value.kind === 'nodeOutcome') {
    return hasOnlyKeys(value, ['id', 'kind', 'nodeId', 'outcome'])
      && isString(value.nodeId)
      && isString(value.outcome);
  }
  return value.kind === 'safeOutputEquals'
    && hasOnlyKeys(value, [
      'id',
      'kind',
      'nodeId',
      'fieldId',
      'expected',
    ])
    && isString(value.nodeId)
    && isString(value.fieldId)
    && isJsonValue(value.expected);
};

const isFlowScenarioStorageShape = (value: unknown): value is FlowScenario =>
  isRecord(value)
  && hasOnlyKeys(value, [
    'id',
    'name',
    'enabled',
    'inputPresetId',
    'nodeFixtures',
    'databaseFixtures',
    'expectedTerminalId',
    'expectedEdgeIds',
    'assertions',
  ])
  && isString(value.id)
  && isString(value.name)
  && isBoolean(value.enabled)
  && isString(value.inputPresetId)
  && Array.isArray(value.nodeFixtures)
  && value.nodeFixtures.every((fixture) =>
    isRecord(fixture)
    && hasOnlyKeys(fixture, ['nodeId', 'outcome', 'outputPresetId'])
    && isString(fixture.nodeId)
    && isString(fixture.outcome)
    && (fixture.outputPresetId === undefined || isString(fixture.outputPresetId)))
  && Array.isArray(value.databaseFixtures)
  && value.databaseFixtures.every((fixture) =>
    isRecord(fixture)
    && hasOnlyKeys(fixture, ['sourceId', 'outcome', 'matchScore', 'metadata'])
    && isString(fixture.sourceId)
    && isOneOf(fixture.outcome, [
      'matched',
      'notMatched',
      'inconclusive',
      'sourceUnavailable',
    ])
    && (fixture.matchScore === undefined || isFiniteNumber(fixture.matchScore))
    && (
      fixture.metadata === undefined
      || (
        isRecord(fixture.metadata)
        && Object.values(fixture.metadata).every((item) => isJsonValue(item))
      )
    ))
  && (value.expectedTerminalId === undefined || isString(value.expectedTerminalId))
  && isStringArray(value.expectedEdgeIds)
  && Array.isArray(value.assertions)
  && value.assertions.every(isScenarioAssertionShape);

const isIntegrationStorageShape = (value: unknown): boolean =>
  isRecord(value)
  && hasOnlyKeys(value, [
    'mode',
    'allowedOrigins',
    'redirectUrls',
    'sessionTimeoutMinutes',
    'resumePolicy',
    'enabledEvents',
    'resultFieldIds',
    'includePii',
  ])
  && isOneOf(value.mode, ['hosted', 'embed', 'redirect'])
  && isStringArray(value.allowedOrigins)
  && isStringArray(value.redirectUrls)
  && isFiniteNumber(value.sessionTimeoutMinutes)
  && isOneOf(value.resumePolicy, ['disabled', 'sameDevice', 'crossDevice'])
  && Array.isArray(value.enabledEvents)
  && value.enabledEvents.every((event) =>
    isOneOf(event, ['started', 'stepCompleted', 'cancelled', 'finished']))
  && isStringArray(value.resultFieldIds)
  && value.includePii === false;

const isProjectContentStorageShape = (
  value: unknown,
): value is FlowProjectContentV2 =>
  isRecord(value)
  && hasOnlyKeys(value, ['flow', 'interface', 'scenarios', 'integration'])
  && isDynamicFlowStorageShape(value.flow)
  && isInterfaceStorageShape(value.interface)
  && Array.isArray(value.scenarios)
  && value.scenarios.every(isFlowScenarioStorageShape)
  && isIntegrationStorageShape(value.integration);

const isProjectStorageShape = (value: unknown): boolean =>
  isRecord(value)
  && hasOnlyKeys(value, [
    'id',
    'name',
    'description',
    'createdAt',
    'updatedAt',
    'flow',
    'interface',
    'scenarios',
    'integration',
  ])
  && isString(value.id)
  && isString(value.name)
  && isString(value.description)
  && isString(value.createdAt)
  && isString(value.updatedAt)
  && isProjectContentStorageShape({
    flow: value.flow,
    interface: value.interface,
    scenarios: value.scenarios,
    integration: value.integration,
  });

const isModuleContractStorageShape = (
  value: unknown,
): value is ModuleContract =>
  isRecord(value)
  && hasOnlyKeys(value, [
    'ref',
    'origin',
    'category',
    'inputFields',
    'outputFields',
    'outcomes',
    'uiCapabilities',
    'evidenceGroup',
    'estimatedDurationMs',
  ])
  && isModuleRefShape(value.ref)
  && isOneOf(value.origin, ['builtIn', 'custom'])
  && isOneOf(value.category, [
    'identity',
    'credential',
    'device',
    'education',
    'biometric',
    'database',
    'custom',
  ])
  && Array.isArray(value.inputFields)
  && value.inputFields.every((field) => isFlowFieldShape(field))
  && Array.isArray(value.outputFields)
  && value.outputFields.every((field) => isFlowFieldShape(field))
  && Array.isArray(value.outcomes)
  && value.outcomes.every((outcome) =>
    isRecord(outcome)
    && hasOnlyKeys(outcome, ['id', 'terminal'])
    && isString(outcome.id)
    && isBoolean(outcome.terminal))
  && isRecord(value.uiCapabilities)
  && hasOnlyKeys(value.uiCapabilities, [
    'supportedStates',
    'supportsConsent',
    'supportsCredentialRequest',
    'supportsFieldSummary',
    'supportsDevicePermission',
    'supportsCapture',
  ])
  && isStringArray(value.uiCapabilities.supportedStates)
  && Object.entries(value.uiCapabilities)
    .filter(([key]) => key !== 'supportedStates')
    .every(([, item]) => isBoolean(item))
  && isOneOf(value.evidenceGroup, [
    'identity',
    'contact',
    'credential',
    'education',
    'biometric',
    'risk',
    'other',
  ])
  && isFiniteNumber(value.estimatedDurationMs);

const isIssuerPolicyShape = (value: unknown): boolean => {
  if (!isRecord(value) || !isString(value.mode)) return false;
  if (value.mode === 'exactDid') {
    return hasOnlyKeys(value, ['mode', 'issuerDid']) && isString(value.issuerDid);
  }
  if (value.mode === 'trustFramework') {
    return hasOnlyKeys(value, ['mode', 'frameworkId']) && isString(value.frameworkId);
  }
  return value.mode === 'allowedDids'
    && hasOnlyKeys(value, ['mode', 'allowedDids'])
    && isStringArray(value.allowedDids);
};

const isModuleVersionStorageShape = (value: unknown): value is ModuleVersion =>
  isRecord(value)
  && hasOnlyKeys(value, [
    'version',
    'status',
    'contract',
    'createdAt',
    'definition',
  ])
  && isString(value.version)
  && isOneOf(value.status, ['active', 'deprecated'])
  && isModuleContractStorageShape(value.contract)
  && isString(value.createdAt)
  && (
    value.definition === undefined
    || (
      isRecord(value.definition)
      && hasOnlyKeys(value.definition, [
        'description',
        'credentialType',
        'didResolverUrl',
        'verificationMethod',
        'issuerPolicy',
        'successCondition',
        'failureCondition',
        'defaultUi',
      ])
      && isString(value.definition.description)
      && isString(value.definition.credentialType)
      && isString(value.definition.didResolverUrl)
      && isString(value.definition.verificationMethod)
      && isIssuerPolicyShape(value.definition.issuerPolicy)
      && isConditionDefinitionStorageShape(value.definition.successCondition)
      && isConditionDefinitionStorageShape(value.definition.failureCondition)
      && isRecord(value.definition.defaultUi)
      && hasOnlyKeys(value.definition.defaultUi, [
        'title',
        'description',
        'actionLabel',
      ])
      && Object.values(value.definition.defaultUi).every(isString)
    )
  );

const isModulePackageStorageShape = (value: unknown): value is ModulePackage =>
  isRecord(value)
  && hasOnlyKeys(value, ['id', 'name', 'origin', 'activeVersion', 'versions'])
  && isString(value.id)
  && isString(value.name)
  && isOneOf(value.origin, ['builtIn', 'custom'])
  && isString(value.activeVersion)
  && Array.isArray(value.versions)
  && value.versions.every(isModuleVersionStorageShape);

const isSubflowPackageStorageShape = (value: unknown): value is SubflowPackage =>
  isRecord(value)
  && hasOnlyKeys(value, ['id', 'name', 'activeVersion', 'versions'])
  && isString(value.id)
  && isString(value.name)
  && isString(value.activeVersion)
  && Array.isArray(value.versions)
  && value.versions.every((version) =>
    isRecord(version)
    && hasOnlyKeys(version, [
      'version',
      'status',
      'contract',
      'flow',
      'createdAt',
    ])
    && isString(version.version)
    && isOneOf(version.status, ['active', 'deprecated'])
    && isRecord(version.contract)
    && hasOnlyKeys(version.contract, [
      'inputFields',
      'outputFields',
      'successExitNodeId',
      'failureExitNodeId',
    ])
    && Array.isArray(version.contract.inputFields)
    && version.contract.inputFields.every((field) => isFlowFieldShape(field))
    && Array.isArray(version.contract.outputFields)
    && version.contract.outputFields.every((field) => isFlowFieldShape(field))
    && isString(version.contract.successExitNodeId)
    && isString(version.contract.failureExitNodeId)
    && isDynamicFlowStorageShape(version.flow)
    && isString(version.createdAt));

const isProjectSnapshotStorageShape = (
  value: unknown,
): value is ProjectSnapshotV2 =>
  isRecord(value)
  && hasOnlyKeys(value, ['projectId', 'name', 'description', 'content'])
  && isString(value.projectId)
  && isString(value.name)
  && isString(value.description)
  && isProjectContentStorageShape(value.content);

/**
 * Deeply validates the complete localStorage v2 contract. In particular,
 * runtime-only extra keys cannot hide beneath a valid top-level envelope.
 */
export const isDashboardWorkspaceStorageShape = (
  value: unknown,
): value is DashboardWorkspaceV2 =>
  isRecord(value)
  && hasOnlyKeys(value, [
    'schemaVersion',
    'savedAt',
    'projects',
    'moduleCatalog',
    'subflowCatalog',
    'draftRevisions',
    'releases',
    'environments',
  ])
  && value.schemaVersion === 2
  && isString(value.savedAt)
  && Array.isArray(value.projects)
  && value.projects.every(isProjectStorageShape)
  && Array.isArray(value.moduleCatalog)
  && value.moduleCatalog.every(isModulePackageStorageShape)
  && Array.isArray(value.subflowCatalog)
  && value.subflowCatalog.every(isSubflowPackageStorageShape)
  && Array.isArray(value.draftRevisions)
  && value.draftRevisions.every((revision) =>
    isRecord(revision)
    && hasOnlyKeys(revision, [
      'id',
      'projectId',
      'revision',
      'reason',
      'createdAt',
      'snapshot',
    ])
    && isString(revision.id)
    && isString(revision.projectId)
    && isFiniteNumber(revision.revision)
    && isOneOf(revision.reason, [
      'manual',
      'beforeDestructiveChange',
      'rollback',
    ])
    && isString(revision.createdAt)
    && isProjectSnapshotStorageShape(revision.snapshot))
  && Array.isArray(value.releases)
  && value.releases.every((release) =>
    isRecord(release)
    && hasOnlyKeys(release, [
      'id',
      'projectId',
      'version',
      'createdAt',
      'snapshot',
      'dependencyLock',
      'promotions',
    ])
    && isString(release.id)
    && isString(release.projectId)
    && isString(release.version)
    && isString(release.createdAt)
    && isProjectSnapshotStorageShape(release.snapshot)
    && isRecord(release.dependencyLock)
    && hasOnlyKeys(release.dependencyLock, ['modules', 'subflows'])
    && Array.isArray(release.dependencyLock.modules)
    && release.dependencyLock.modules.every(isModuleRefShape)
    && Array.isArray(release.dependencyLock.subflows)
    && release.dependencyLock.subflows.every(isModuleRefShape)
    && Array.isArray(release.promotions)
    && release.promotions.every((promotion) =>
      isRecord(promotion)
      && hasOnlyKeys(promotion, ['stage', 'environmentId', 'promotedAt'])
      && isOneOf(promotion.stage, ['test', 'staging', 'production'])
      && isString(promotion.environmentId)
      && isString(promotion.promotedAt)))
  && Array.isArray(value.environments)
  && value.environments.every((environment) =>
    isRecord(environment)
    && hasOnlyKeys(environment, [
      'id',
      'stage',
      'publicConfig',
      'secretReferenceNames',
    ])
    && isString(environment.id)
    && isOneOf(environment.stage, ['test', 'staging', 'production'])
    && isRecord(environment.publicConfig)
    && Object.values(environment.publicConfig).every((item) => isJsonValue(item))
    && isStringArray(environment.secretReferenceNames));

export type WorkspacePrivacyIssueCode =
  | 'sensitiveLiteral'
  | 'unsafeScenarioMetadata'
  | 'unsafeScenarioAssertion'
  | 'sensitivePublicConfigKey'
  | 'invalidEnvironmentSecretReference'
  | 'probableSecretValue';

export type WorkspacePrivacyIssue = {
  readonly code: WorkspacePrivacyIssueCode;
  readonly path: string;
};

const isSensitiveClassification = (
  field: FlowField | null | undefined,
): boolean => Boolean(
  field
  && (
    field.classification === 'pii'
    || field.classification === 'sensitivePii'
    || field.classification === 'biometric'
    || field.classification === 'credential'
    || field.classification === 'secret'
  ),
);

const likelyDirectIdentifier = (value: unknown): boolean => {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  return /^\+?\d{9,15}$/u.test(trimmed)
    || /^-----BEGIN [A-Z ]*PRIVATE KEY-----/u.test(trimmed)
    || /^Bearer\s+\S+/iu.test(trimmed)
    || /^sk[-_][A-Za-z0-9_-]{12,}$/u.test(trimmed)
    || /^eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/u.test(trimmed);
};

const containsProbableSecret = (value: JsonValue): boolean => {
  if (likelyDirectIdentifier(value)) return true;
  if (Array.isArray(value)) return value.some(containsProbableSecret);
  if (!value || typeof value !== 'object') return false;
  return Object.values(value).some(containsProbableSecret);
};

const UNSAFE_SCENARIO_METADATA_KEY =
  /(address|birth|credential|document|email|face|identity|name|phone|secret|token)/iu;

const containsUnsafeScenarioMetadata = (value: JsonValue): boolean => {
  if (likelyDirectIdentifier(value)) return true;
  if (Array.isArray(value)) return value.some(containsUnsafeScenarioMetadata);
  if (!value || typeof value !== 'object') return false;
  return Object.entries(value).some(
    ([key, child]) => (
      UNSAFE_SCENARIO_METADATA_KEY.test(key)
      || containsUnsafeScenarioMetadata(child)
    ),
  );
};

const inspectConditionPrivacy = (
  definition: ConditionDefinition,
  flowInputs: readonly FlowField[],
  outputs: readonly NodeOutputContract[],
  path: string,
  issues: WorkspacePrivacyIssue[],
): void => {
  for (const [index, rule] of conditionRules(definition.root).entries()) {
    const references = [rule.left, rule.right].filter(
      (reference): reference is DataReference => Boolean(reference),
    );
    const literal = references.find((reference) => reference.kind === 'literal');
    const fieldReference = references.find((reference) => reference.kind !== 'literal');
    if (
      literal?.kind === 'literal'
      && (
        likelyDirectIdentifier(literal.value)
        || (
          fieldReference
          && isSensitiveClassification(
            fieldForDataReference(fieldReference, flowInputs, outputs),
          )
        )
      )
    ) {
      issues.push({
        code: 'sensitiveLiteral',
        path: `${path}.rule[${index}]`,
      });
    }
  }
};

const inspectContentPrivacy = (
  content: FlowProjectContentV2,
  moduleCatalog: readonly ModulePackage[],
  subflowCatalog: readonly SubflowPackage[],
  path: string,
  issues: WorkspacePrivacyIssue[],
): void => {
  const outputs = outputContracts(content.flow, moduleCatalog, subflowCatalog);
  for (const node of content.flow.nodes) {
    if (node.kind === 'verification' || node.kind === 'subflow') {
      const targetFields = node.kind === 'verification'
        ? resolveModuleContract(node.moduleRef, moduleCatalog)?.inputFields ?? []
        : subflowCatalog
          .find((item) => item.id === node.subflowRef.packageId)
          ?.versions.find((version) => version.version === node.subflowRef.version)
          ?.contract.inputFields ?? [];
      for (const binding of node.bindings) {
        if (
          binding.source.kind === 'literal'
          && (
            likelyDirectIdentifier(binding.source.value)
            || isSensitiveClassification(
              targetFields.find((field) => field.id === binding.targetFieldId),
            )
          )
        ) {
          issues.push({
            code: 'sensitiveLiteral',
            path: `${path}.flow.nodes.${node.id}.bindings.${binding.id}`,
          });
        }
      }
    }
    if (node.kind === 'condition') {
      inspectConditionPrivacy(
        node.condition,
        content.flow.inputSchema.fields,
        outputs,
        `${path}.flow.nodes.${node.id}.condition`,
        issues,
      );
    }
  }

  for (const scenario of content.scenarios) {
    for (const fixture of scenario.databaseFixtures) {
      if (
        fixture.metadata
        && containsUnsafeScenarioMetadata(fixture.metadata)
      ) {
        issues.push({
          code: 'unsafeScenarioMetadata',
          path: `${path}.scenarios.${scenario.id}.databaseFixtures.${fixture.sourceId}`,
        });
      }
    }
    for (const assertion of scenario.assertions) {
      if (assertion.kind !== 'safeOutputEquals') continue;
      const field = outputs
        .find((output) => output.nodeId === assertion.nodeId)
        ?.fields.find((candidate) => candidate.id === assertion.fieldId);
      if (
        isSensitiveClassification(field)
        || containsProbableSecret(assertion.expected)
      ) {
        issues.push({
          code: 'unsafeScenarioAssertion',
          path: `${path}.scenarios.${scenario.id}.assertions.${assertion.id}`,
        });
      }
    }
  }
};

/**
 * Checks only data-at-rest rules. Invalid/stale graph references are allowed
 * to remain persisted so the editor can surface and repair them.
 */
export const validateDashboardWorkspacePrivacy = (
  workspace: DashboardWorkspaceV2,
): readonly WorkspacePrivacyIssue[] => {
  const issues: WorkspacePrivacyIssue[] = [];
  for (const project of workspace.projects) {
    inspectContentPrivacy(
      project,
      workspace.moduleCatalog,
      workspace.subflowCatalog,
      `projects.${project.id}`,
      issues,
    );
  }
  for (const revision of workspace.draftRevisions) {
    inspectContentPrivacy(
      revision.snapshot.content,
      workspace.moduleCatalog,
      workspace.subflowCatalog,
      `draftRevisions.${revision.id}.snapshot`,
      issues,
    );
  }
  for (const release of workspace.releases) {
    inspectContentPrivacy(
      release.snapshot.content,
      workspace.moduleCatalog,
      workspace.subflowCatalog,
      `releases.${release.id}.snapshot`,
      issues,
    );
  }
  for (const environment of workspace.environments) {
    for (const issue of validateDashboardEnvironment(environment)) {
      if (issue.code === 'sensitivePublicConfigKey') {
        issues.push({
          code: 'sensitivePublicConfigKey',
          path: `environments.${environment.id}.${issue.path ?? ''}`,
        });
      } else if (
        issue.code === 'invalidSecretReference'
        || issue.code === 'duplicateSecretReference'
      ) {
        issues.push({
          code: 'invalidEnvironmentSecretReference',
          path: `environments.${environment.id}.${issue.path ?? ''}`,
        });
      }
    }
    for (const [key, value] of Object.entries(environment.publicConfig)) {
      if (containsProbableSecret(value)) {
        issues.push({
          code: 'probableSecretValue',
          path: `environments.${environment.id}.publicConfig.${key}`,
        });
      }
    }
  }
  return issues;
};

const FORBIDDEN_PERSISTED_KEY = /^(execution(result|results|log)|simulation(result|results)|scenarioexecutionresult|previewjourney|last(run|runresult|executionresult)|runtime(result|state)?|secretvalue|api[-_]?key|client[-_]?secret|access[-_]?token|refresh[-_]?token|private[-_]?key|password|face[-_]?embedding|biometric[-_]?template|raw[-_]?credential|identity[-_]?number[-_]?value|phone[-_]?number[-_]?value)$/iu;

export type PreparedDashboardWorkspace =
  | {
      readonly ok: true;
      readonly workspace: DashboardWorkspaceV2;
      readonly removedPaths: readonly string[];
    }
  | {
      readonly ok: false;
      readonly reason: 'invalidJsonValue' | 'invalidShape' | 'privacyViolation';
      readonly privacyIssues?: readonly WorkspacePrivacyIssue[];
      readonly workspace?: DashboardWorkspaceV2;
    };

const OMIT_STORAGE_VALUE = Symbol('omit-dashboard-storage-value');

/**
 * Produces a plain JSON clone, strips known runtime/secret value properties,
 * validates the full schema, and rejects remaining privacy-bearing values.
 */
export const prepareDashboardWorkspaceForStorage = (
  value: unknown,
): PreparedDashboardWorkspace => {
  const removedPaths: string[] = [];
  const active = new WeakSet<object>();

  const cloneJson = (
    candidate: unknown,
    path: string,
    inArray: boolean,
    depth: number,
  ): unknown | typeof OMIT_STORAGE_VALUE => {
    if (depth > 64) throw new Error('DASHBOARD_STORAGE_DEPTH_EXCEEDED');
    if (candidate === undefined) {
      if (inArray) throw new Error('DASHBOARD_STORAGE_ARRAY_VALUE_INVALID');
      return OMIT_STORAGE_VALUE;
    }
    if (
      candidate === null
      || typeof candidate === 'string'
      || typeof candidate === 'boolean'
    ) {
      return candidate;
    }
    if (typeof candidate === 'number') {
      if (!Number.isFinite(candidate)) {
        throw new Error('DASHBOARD_STORAGE_NUMBER_INVALID');
      }
      return candidate;
    }
    if (typeof candidate !== 'object') {
      throw new Error('DASHBOARD_STORAGE_VALUE_INVALID');
    }
    if (active.has(candidate)) throw new Error('DASHBOARD_STORAGE_CYCLE');
    const prototype = Object.getPrototypeOf(candidate);
    if (
      prototype !== Object.prototype
      && prototype !== Array.prototype
      && prototype !== null
    ) {
      throw new Error('DASHBOARD_STORAGE_OBJECT_INVALID');
    }
    active.add(candidate);
    try {
      if (Array.isArray(candidate)) {
        return candidate.map((item, index) => {
          const cloned = cloneJson(item, `${path}[${index}]`, true, depth + 1);
          if (cloned === OMIT_STORAGE_VALUE) {
            throw new Error('DASHBOARD_STORAGE_ARRAY_VALUE_INVALID');
          }
          return cloned;
        });
      }
      const cloned = Object.create(null) as Record<string, unknown>;
      for (const [key, item] of Object.entries(candidate)) {
        const keyPath = path ? `${path}.${key}` : key;
        if (FORBIDDEN_PERSISTED_KEY.test(key)) {
          removedPaths.push(keyPath);
          continue;
        }
        const clonedItem = cloneJson(item, keyPath, false, depth + 1);
        if (clonedItem !== OMIT_STORAGE_VALUE) cloned[key] = clonedItem;
      }
      return cloned;
    } finally {
      active.delete(candidate);
    }
  };

  let normalized: unknown;
  try {
    const cloned = cloneJson(value, '', false, 0);
    if (cloned === OMIT_STORAGE_VALUE) {
      return { ok: false, reason: 'invalidJsonValue' };
    }
    normalized = JSON.parse(JSON.stringify(cloned)) as unknown;
  } catch {
    return { ok: false, reason: 'invalidJsonValue' };
  }

  if (!isDashboardWorkspaceStorageShape(normalized)) {
    return { ok: false, reason: 'invalidShape' };
  }
  const privacyIssues = validateDashboardWorkspacePrivacy(normalized);
  if (privacyIssues.length > 0) {
    return {
      ok: false,
      reason: 'privacyViolation',
      privacyIssues,
      workspace: normalized,
    };
  }
  return { ok: true, workspace: normalized, removedPaths };
};
