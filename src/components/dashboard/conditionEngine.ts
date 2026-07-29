/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type {
  ConditionDefinition,
  ConditionGroup,
  ConditionOperator,
  ConditionRule,
  DataReference,
  DynamicFlowEdgeV2,
  FlowField,
  FlowFieldType,
  InputBinding,
  JsonValue,
  LiteralReference,
  PrimitiveFieldType,
} from './dashboardV2Types';

export type SyntheticPrimitive = LiteralReference['value'];
export type SyntheticValue = JsonValue;
export type ConditionExpression = ConditionRule | ConditionGroup;

export type ConditionEvaluationContext = {
  readonly flowInputs: Readonly<
    Record<string, SyntheticValue | undefined>
  >;
  readonly nodeOutputs: Readonly<
    Record<
      string,
      Readonly<Record<string, SyntheticValue | undefined>> | undefined
    >
  >;
};

export type FlowDataEdge = Pick<DynamicFlowEdgeV2, 'source' | 'target'>;

export type NodeOutputContract = {
  readonly nodeId: string;
  readonly fields: readonly FlowField[];
};

export const INPUT_BINDING_ISSUE_CODES = {
  missingRequired: 'missingRequiredInput',
  duplicateTarget: 'duplicateTargetBinding',
  missingSource: 'missingBindingSource',
  missingField: 'missingBindingField',
  nonUpstream: 'nonUpstreamBinding',
  typeMismatch: 'bindingTypeMismatch',
  sensitiveLiteral: 'sensitiveLiteralRejected',
  legacyCondition: 'legacyConditionRequiresMigration',
} as const;

export type InputBindingIssueCode =
  typeof INPUT_BINDING_ISSUE_CODES[keyof typeof INPUT_BINDING_ISSUE_CODES];

export type InputBindingIssue = {
  readonly code: InputBindingIssueCode;
  readonly targetNodeId: string;
  readonly targetFieldId?: string;
  readonly sourceNodeId?: string;
  readonly sourceFieldId?: string;
};

export type InputBindingValidationContext = {
  readonly targetNodeId: string;
  readonly targetFields: readonly FlowField[];
  readonly bindings: readonly InputBinding[];
  readonly flowInputFields: readonly FlowField[];
  readonly nodeOutputs: readonly NodeOutputContract[];
  readonly edges: readonly FlowDataEdge[];
  readonly condition?: ConditionDefinition;
};

const STRING_OPERATORS = [
  'equals',
  'notEquals',
  'exists',
  'notExists',
  'contains',
  'startsWith',
  'endsWith',
] as const satisfies readonly ConditionOperator[];

const NUMBER_OPERATORS = [
  'equals',
  'notEquals',
  'exists',
  'notExists',
  'greaterThan',
  'greaterThanOrEqual',
  'lessThan',
  'lessThanOrEqual',
] as const satisfies readonly ConditionOperator[];

const BOOLEAN_OPERATORS = [
  'equals',
  'notEquals',
  'exists',
  'notExists',
] as const satisfies readonly ConditionOperator[];

export const CONDITION_OPERATORS_BY_TYPE = {
  string: STRING_OPERATORS,
  number: NUMBER_OPERATORS,
  boolean: BOOLEAN_OPERATORS,
  object: ['exists', 'notExists'],
  array: ['exists', 'notExists'],
} as const satisfies Readonly<
  Record<FlowFieldType, readonly ConditionOperator[]>
>;

export const getCompatibleConditionOperators = (
  fieldType: FlowFieldType,
): readonly ConditionOperator[] => CONDITION_OPERATORS_BY_TYPE[fieldType];

export const isConditionOperatorCompatible = (
  fieldType: FlowFieldType,
  operator: ConditionOperator,
): boolean => getCompatibleConditionOperators(fieldType).includes(operator);

const getPrimitiveType = (value: SyntheticPrimitive): PrimitiveFieldType => {
  if (typeof value === 'string') {
    return 'string';
  }
  if (typeof value === 'number') {
    return 'number';
  }
  return 'boolean';
};

const getValueType = (value: SyntheticValue): FlowFieldType | undefined => {
  if (value === null) return undefined;
  if (Array.isArray(value)) return 'array';
  if (typeof value === 'object') return 'object';
  if (typeof value === 'string') return 'string';
  if (typeof value === 'number' && Number.isFinite(value)) return 'number';
  if (typeof value === 'boolean') return 'boolean';
  return undefined;
};

const isSyntheticPrimitive = (
  value: unknown,
): value is SyntheticPrimitive =>
  typeof value === 'string'
  || typeof value === 'boolean'
  || (typeof value === 'number' && Number.isFinite(value));

const resolveConditionOperand = (
  operand: DataReference,
  context: ConditionEvaluationContext,
): SyntheticValue | undefined => {
  if (operand.kind === 'literal') {
    return isSyntheticPrimitive(operand.value)
      && getPrimitiveType(operand.value) === operand.valueType
      ? operand.value
      : undefined;
  }

  if (operand.kind === 'flowInput') {
    return context.flowInputs[operand.fieldId];
  }

  return context.nodeOutputs[operand.nodeId]?.[operand.fieldId];
};

const evaluateRule = (
  rule: ConditionRule,
  context: ConditionEvaluationContext,
): boolean => {
  const left = resolveConditionOperand(rule.left, context);
  if (rule.operator === 'exists') {
    return left !== undefined;
  }
  if (rule.operator === 'notExists') {
    return left === undefined;
  }
  if (left === undefined) {
    return false;
  }

  const leftType = getValueType(left);
  if (leftType === undefined) {
    return false;
  }
  if (!isConditionOperatorCompatible(leftType, rule.operator)) {
    return false;
  }

  const right = rule.right === undefined
    ? undefined
    : resolveConditionOperand(rule.right, context);
  if (right === undefined || getValueType(right) !== leftType) {
    return false;
  }

  switch (rule.operator) {
    case 'equals':
      return left === right;
    case 'notEquals':
      return left !== right;
    case 'contains':
      return typeof left === 'string'
        && typeof right === 'string'
        && left.includes(right);
    case 'startsWith':
      return typeof left === 'string'
        && typeof right === 'string'
        && left.startsWith(right);
    case 'endsWith':
      return typeof left === 'string'
        && typeof right === 'string'
        && left.endsWith(right);
    case 'greaterThan':
      return typeof left === 'number'
        && typeof right === 'number'
        && left > right;
    case 'greaterThanOrEqual':
      return typeof left === 'number'
        && typeof right === 'number'
        && left >= right;
    case 'lessThan':
      return typeof left === 'number'
        && typeof right === 'number'
        && left < right;
    case 'lessThanOrEqual':
      return typeof left === 'number'
        && typeof right === 'number'
        && left <= right;
  }
};

export const evaluateCondition = (
  expression: ConditionExpression,
  context: ConditionEvaluationContext,
): boolean => {
  if (expression.kind === 'rule') {
    return evaluateRule(expression, context);
  }

  if (expression.conditions.length === 0) {
    return false;
  }

  if (expression.combinator === 'and') {
    return expression.conditions.every((condition) =>
      evaluateCondition(condition, context));
  }

  return expression.conditions.some((condition) =>
    evaluateCondition(condition, context));
};

export const collectUpstreamNodeIds = (
  edges: readonly FlowDataEdge[],
  targetNodeId: string,
): ReadonlySet<string> => {
  const incomingByTarget = new Map<string, string[]>();
  edges.forEach((edge) => {
    const incoming = incomingByTarget.get(edge.target);
    if (incoming === undefined) {
      incomingByTarget.set(edge.target, [edge.source]);
      return;
    }
    incoming.push(edge.source);
  });

  const upstream = new Set<string>();
  const pending = [...(incomingByTarget.get(targetNodeId) ?? [])];
  while (pending.length > 0) {
    const sourceNodeId = pending.pop();
    if (
      sourceNodeId === undefined
      || sourceNodeId === targetNodeId
      || upstream.has(sourceNodeId)
    ) {
      continue;
    }

    upstream.add(sourceNodeId);
    pending.push(...(incomingByTarget.get(sourceNodeId) ?? []));
  }

  return upstream;
};

export const isUpstreamNode = (
  edges: readonly FlowDataEdge[],
  sourceNodeId: string,
  targetNodeId: string,
): boolean => collectUpstreamNodeIds(edges, targetNodeId).has(sourceNodeId);

const getField = (
  fields: readonly FlowField[],
  fieldId: string,
): FlowField | undefined =>
  fields.find((field) => field.id === fieldId);

const getSourceField = (
  source: DataReference,
  flowInputFields: readonly FlowField[],
  nodeOutputsById: ReadonlyMap<string, readonly FlowField[]>,
): Pick<FlowField, 'type'> | undefined => {
  if (source.kind === 'literal') {
    return isSyntheticPrimitive(source.value)
      && getPrimitiveType(source.value) === source.valueType
      ? { type: source.valueType }
      : undefined;
  }

  if (source.kind === 'flowInput') {
    return getField(flowInputFields, source.fieldId);
  }

  const fields = nodeOutputsById.get(source.nodeId);
  return fields === undefined ? undefined : getField(fields, source.fieldId);
};

export const validateInputBindings = (
  context: InputBindingValidationContext,
): readonly InputBindingIssue[] => {
  const issues: InputBindingIssue[] = [];
  const bindingCountByTarget = new Map<string, number>();
  const nodeOutputsById = new Map(
    context.nodeOutputs.map((contract) => [
      contract.nodeId,
      contract.fields,
    ] as const),
  );
  const upstreamNodeIds = collectUpstreamNodeIds(
    context.edges,
    context.targetNodeId,
  );

  context.bindings.forEach((binding) => {
    bindingCountByTarget.set(
      binding.targetFieldId,
      (bindingCountByTarget.get(binding.targetFieldId) ?? 0) + 1,
    );
  });

  context.targetFields.forEach((field) => {
    if (
      field.required
      && (bindingCountByTarget.get(field.id) ?? 0) === 0
    ) {
      issues.push({
        code: INPUT_BINDING_ISSUE_CODES.missingRequired,
        targetNodeId: context.targetNodeId,
        targetFieldId: field.id,
      });
    }
  });

  bindingCountByTarget.forEach((count, targetFieldId) => {
    if (count > 1) {
      issues.push({
        code: INPUT_BINDING_ISSUE_CODES.duplicateTarget,
        targetNodeId: context.targetNodeId,
        targetFieldId,
      });
    }
  });

  context.bindings.forEach((binding) => {
    const targetField = getField(context.targetFields, binding.targetFieldId);
    if (targetField === undefined) {
      issues.push({
        code: INPUT_BINDING_ISSUE_CODES.missingField,
        targetNodeId: context.targetNodeId,
        targetFieldId: binding.targetFieldId,
      });
      return;
    }

    if (binding.source.kind === 'nodeOutput') {
      if (!nodeOutputsById.has(binding.source.nodeId)) {
        issues.push({
          code: INPUT_BINDING_ISSUE_CODES.missingSource,
          targetNodeId: context.targetNodeId,
          targetFieldId: binding.targetFieldId,
          sourceNodeId: binding.source.nodeId,
          sourceFieldId: binding.source.fieldId,
        });
        return;
      }

      if (!upstreamNodeIds.has(binding.source.nodeId)) {
        issues.push({
          code: INPUT_BINDING_ISSUE_CODES.nonUpstream,
          targetNodeId: context.targetNodeId,
          targetFieldId: binding.targetFieldId,
          sourceNodeId: binding.source.nodeId,
          sourceFieldId: binding.source.fieldId,
        });
      }
    }

    if (
      binding.source.kind === 'literal'
      && (
        !isSyntheticPrimitive(binding.source.value)
        || getPrimitiveType(binding.source.value)
          !== binding.source.valueType
      )
    ) {
      issues.push({
        code: INPUT_BINDING_ISSUE_CODES.typeMismatch,
        targetNodeId: context.targetNodeId,
        targetFieldId: binding.targetFieldId,
      });
      return;
    }
    if (
      binding.source.kind === 'literal'
      && (
        targetField.classification === 'pii'
        || targetField.classification === 'sensitivePii'
        || targetField.classification === 'biometric'
        || targetField.classification === 'credential'
        || targetField.classification === 'secret'
      )
    ) {
      issues.push({
        code: INPUT_BINDING_ISSUE_CODES.sensitiveLiteral,
        targetNodeId: context.targetNodeId,
        targetFieldId: binding.targetFieldId,
      });
      return;
    }

    const sourceField = getSourceField(
      binding.source,
      context.flowInputFields,
      nodeOutputsById,
    );
    if (sourceField === undefined) {
      issues.push({
        code: INPUT_BINDING_ISSUE_CODES.missingField,
        targetNodeId: context.targetNodeId,
        targetFieldId: binding.targetFieldId,
        sourceNodeId: binding.source.kind === 'nodeOutput'
          ? binding.source.nodeId
          : undefined,
        sourceFieldId: binding.source.kind === 'literal'
          ? undefined
          : binding.source.fieldId,
      });
      return;
    }

    if (sourceField.type !== targetField.type) {
      issues.push({
        code: INPUT_BINDING_ISSUE_CODES.typeMismatch,
        targetNodeId: context.targetNodeId,
        targetFieldId: binding.targetFieldId,
        sourceNodeId: binding.source.kind === 'nodeOutput'
          ? binding.source.nodeId
          : undefined,
        sourceFieldId: binding.source.kind === 'literal'
          ? undefined
          : binding.source.fieldId,
      });
    }
  });

  if (
    context.condition?.migrationState === 'requiresConversion'
    || Boolean(context.condition?.legacyExpression?.trim())
  ) {
    issues.push({
      code: INPUT_BINDING_ISSUE_CODES.legacyCondition,
      targetNodeId: context.targetNodeId,
    });
  }

  return issues;
};
