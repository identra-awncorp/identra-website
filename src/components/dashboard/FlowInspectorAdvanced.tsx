/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Braces,
  Database,
  GitBranch,
  Link2,
  Plus,
  Trash2,
} from 'lucide-react';
import type { DashboardAdvancedCopy } from '../../translations/dashboard/DashboardAdvancedTranslations';
import type { DashboardCopy } from '../../translations/dashboard/DashboardPageTranslations';
import {
  collectUpstreamNodeIds,
  getCompatibleConditionOperators,
  validateInputBindings,
} from './conditionEngine';
import { DATABASE_SOURCES } from './dashboardModuleRegistry';
import {
  createDashboardId,
  createEmptyConditionGroup,
  resolveModuleContract,
} from './dashboardV2Model';
import type {
  ConditionGroup,
  ConditionOperator,
  ConditionRule,
  DataReference,
  DynamicFlowManifestV2,
  DynamicFlowNodeV2,
  FlowField,
  FlowFieldType,
  InputBinding,
  LiteralReference,
  ModulePackage,
  SubflowPackage,
} from './dashboardV2Types';

type InspectorTab = 'configuration' | 'data';

type FlowInspectorAdvancedProps = {
  readonly copy: DashboardCopy;
  readonly advancedCopy: DashboardAdvancedCopy;
  readonly manifest: DynamicFlowManifestV2;
  readonly node: DynamicFlowNodeV2;
  readonly moduleCatalog: readonly ModulePackage[];
  readonly subflowCatalog: readonly SubflowPackage[];
  readonly onManifestChange: (manifest: DynamicFlowManifestV2) => void;
};

type ReferenceOption = {
  readonly key: string;
  readonly label: string;
  readonly reference: Exclude<DataReference, LiteralReference>;
  readonly field: FlowField;
};

const SENSITIVE_CLASSIFICATIONS = new Set<FlowField['classification']>([
  'pii',
  'sensitivePii',
  'biometric',
  'credential',
  'secret',
]);

const FIELD_PRESETS: readonly FlowField[] = [
  {
    id: 'credential',
    key: 'credential',
    type: 'object',
    format: 'none',
    required: false,
    classification: 'credential',
    safeForResult: false,
  },
  {
    id: 'phoneNumber',
    key: 'phoneNumber',
    type: 'string',
    format: 'phone',
    required: false,
    classification: 'sensitivePii',
    safeForResult: false,
  },
  {
    id: 'fullName',
    key: 'fullName',
    type: 'string',
    format: 'none',
    required: false,
    classification: 'pii',
    safeForResult: false,
  },
  {
    id: 'identityNumber',
    key: 'identityNumber',
    type: 'string',
    format: 'none',
    required: false,
    classification: 'sensitivePii',
    safeForResult: false,
  },
  {
    id: 'dateOfBirth',
    key: 'dateOfBirth',
    type: 'string',
    format: 'date',
    required: false,
    classification: 'pii',
    safeForResult: false,
  },
  {
    id: 'nationality',
    key: 'nationality',
    type: 'string',
    format: 'countryCode',
    required: false,
    classification: 'pii',
    safeForResult: false,
  },
];

const referenceKey = (reference: DataReference): string => {
  if (reference.kind === 'flowInput') return `flow:${reference.fieldId}`;
  if (reference.kind === 'nodeOutput') {
    return `node:${reference.nodeId}:${reference.fieldId}`;
  }
  return 'literal';
};

const literalForType = (type: FlowFieldType): LiteralReference | null => {
  if (type === 'string') return { kind: 'literal', valueType: 'string', value: '' };
  if (type === 'number') return { kind: 'literal', valueType: 'number', value: 0 };
  if (type === 'boolean') return { kind: 'literal', valueType: 'boolean', value: false };
  return null;
};

const contractFieldsForNode = (
  node: DynamicFlowNodeV2,
  moduleCatalog: readonly ModulePackage[],
  subflowCatalog: readonly SubflowPackage[],
): readonly FlowField[] => {
  if (node.kind === 'verification') {
    return resolveModuleContract(node.moduleRef, moduleCatalog)?.inputFields ?? [];
  }
  if (node.kind === 'subflow') {
    return subflowCatalog
      .find((item) => item.id === node.subflowRef.packageId)
      ?.versions.find((version) => version.version === node.subflowRef.version)
      ?.contract.inputFields ?? [];
  }
  return [];
};

const outputFieldsForNode = (
  node: DynamicFlowNodeV2,
  moduleCatalog: readonly ModulePackage[],
  subflowCatalog: readonly SubflowPackage[],
): readonly FlowField[] => {
  if (node.kind === 'verification') {
    return resolveModuleContract(node.moduleRef, moduleCatalog)?.outputFields ?? [];
  }
  if (node.kind === 'subflow') {
    return subflowCatalog
      .find((item) => item.id === node.subflowRef.packageId)
      ?.versions.find((version) => version.version === node.subflowRef.version)
      ?.contract.outputFields ?? [];
  }
  return [];
};

const buildReferenceOptions = (
  manifest: DynamicFlowManifestV2,
  targetNodeId: string,
  moduleCatalog: readonly ModulePackage[],
  subflowCatalog: readonly SubflowPackage[],
): readonly ReferenceOption[] => {
  const flowOptions = manifest.inputSchema.fields.map((field): ReferenceOption => ({
    key: `flow:${field.id}`,
    label: `flow.${field.key}`,
    reference: { kind: 'flowInput', fieldId: field.id },
    field,
  }));
  const upstream = collectUpstreamNodeIds(manifest.edges, targetNodeId);
  const nodeOptions = manifest.nodes
    .filter((node) => upstream.has(node.id))
    .flatMap((node) => outputFieldsForNode(node, moduleCatalog, subflowCatalog)
      .map((field): ReferenceOption => ({
        key: `node:${node.id}:${field.id}`,
        label: `${node.name ?? node.id}.${field.key}`,
        reference: {
          kind: 'nodeOutput',
          nodeId: node.id,
          fieldId: field.id,
        },
        field,
      })));
  return [...flowOptions, ...nodeOptions];
};

const mappingIssueMessage = (
  code: ReturnType<typeof validateInputBindings>[number]['code'],
  copy: DashboardAdvancedCopy,
): string => {
  switch (code) {
    case 'missingRequiredInput':
      return copy.mappingIssues.missingRequiredInput;
    case 'duplicateTargetBinding':
      return copy.mappingIssues.duplicateBinding;
    case 'nonUpstreamBinding':
      return copy.mappingIssues.sourceNotUpstream;
    case 'bindingTypeMismatch':
      return copy.mappingIssues.incompatibleType;
    case 'sensitiveLiteralRejected':
      return copy.mappingIssues.sensitiveLiteralRejected;
    case 'missingBindingSource':
    case 'missingBindingField':
      return copy.mappingIssues.staleBinding;
    case 'legacyConditionRequiresMigration':
      return copy.mappingIssues.legacyCondition;
  }
};

const updateNode = (
  manifest: DynamicFlowManifestV2,
  nodeId: string,
  update: (node: DynamicFlowNodeV2) => DynamicFlowNodeV2,
): DynamicFlowManifestV2 => ({
  ...manifest,
  nodes: manifest.nodes.map((node) => node.id === nodeId ? update(node) : node),
});

function FlowInputSchemaEditor({
  manifest,
  copy,
  onChange,
}: {
  readonly manifest: DynamicFlowManifestV2;
  readonly copy: DashboardAdvancedCopy;
  readonly onChange: (manifest: DynamicFlowManifestV2) => void;
}) {
  const available = FIELD_PRESETS.filter((preset) =>
    !manifest.inputSchema.fields.some((field) => field.id === preset.id));
  const addField = (field: FlowField) => onChange({
    ...manifest,
    inputSchema: {
      fields: [...manifest.inputSchema.fields, field],
    },
  });
  const removeField = (fieldId: string) => onChange({
    ...manifest,
    inputSchema: {
      fields: manifest.inputSchema.fields.filter((field) => field.id !== fieldId),
    },
  });

  return (
    <div className="space-y-3">
      <div>
        <p className="type-label-compact font-bold uppercase text-slate-500">
          {copy.inspector.flowInput}
        </p>
        <p className="type-caption mt-1 leading-4 text-slate-400">
          {copy.inspector.dataHint}
        </p>
      </div>
      {manifest.inputSchema.fields.map((field) => (
        <div
          key={field.id}
          className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2"
        >
          <Braces className="h-3.5 w-3.5 text-[#354CE1]" />
          <div className="min-w-0 flex-1">
            <p className="type-technical truncate font-mono font-bold text-slate-800">
              {field.key}
            </p>
            <p className="type-caption text-slate-400">
              {field.type} · {field.classification}
            </p>
          </div>
          <button
            type="button"
            aria-label={copy.common.remove}
            title={copy.common.remove}
            onClick={() => removeField(field.id)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
      {available.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {available.map((field) => (
            <button
              key={field.id}
              type="button"
              onClick={() => addField(field)}
              className="type-technical rounded-lg border border-dashed border-slate-300 px-2 py-1.5 font-mono font-bold text-slate-600 hover:border-[#354CE1] hover:text-[#354CE1]"
            >
              + {field.key}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function InputMappingEditor({
  manifest,
  node,
  moduleCatalog,
  subflowCatalog,
  copy,
  onChange,
}: {
  readonly manifest: DynamicFlowManifestV2;
  readonly node: Extract<DynamicFlowNodeV2, { readonly kind: 'verification' | 'subflow' }>;
  readonly moduleCatalog: readonly ModulePackage[];
  readonly subflowCatalog: readonly SubflowPackage[];
  readonly copy: DashboardAdvancedCopy;
  readonly onChange: (manifest: DynamicFlowManifestV2) => void;
}) {
  const targets = contractFieldsForNode(node, moduleCatalog, subflowCatalog);
  const options = buildReferenceOptions(
    manifest,
    node.id,
    moduleCatalog,
    subflowCatalog,
  );
  const outputs = manifest.nodes.map((candidate) => ({
    nodeId: candidate.id,
    fields: outputFieldsForNode(candidate, moduleCatalog, subflowCatalog),
  }));
  const issues = validateInputBindings({
    targetNodeId: node.id,
    targetFields: targets,
    bindings: node.bindings,
    flowInputFields: manifest.inputSchema.fields,
    nodeOutputs: outputs,
    edges: manifest.edges,
  });

  const setBindings = (bindings: readonly InputBinding[]) => onChange(
    updateNode(manifest, node.id, (candidate) => (
      candidate.kind === 'verification' || candidate.kind === 'subflow'
        ? { ...candidate, bindings }
        : candidate
    )),
  );
  const setSource = (target: FlowField, value: string) => {
    const remaining = node.bindings.filter(
      (binding) => binding.targetFieldId !== target.id,
    );
    if (!value) {
      setBindings(remaining);
      return;
    }
    const selected = options.find((option) => option.key === value);
    const literal = value === 'literal' ? literalForType(target.type) : null;
    const source = selected?.reference ?? literal;
    if (!source) return;
    setBindings([
      ...remaining,
      {
        id: createDashboardId('binding'),
        targetFieldId: target.id,
        source,
      },
    ]);
  };
  const updateLiteral = (
    target: FlowField,
    binding: InputBinding,
    rawValue: string,
  ) => {
    if (binding.source.kind !== 'literal') return;
    const value = binding.source.valueType === 'number'
      ? Number(rawValue)
      : binding.source.valueType === 'boolean'
        ? rawValue === 'true'
        : rawValue;
    setBindings(node.bindings.map((candidate) => candidate.id === binding.id
      ? {
          ...candidate,
          source: {
            ...binding.source,
            value,
          },
        }
      : candidate));
  };

  return (
    <div className="space-y-3">
      <div>
        <p className="type-label-compact font-bold uppercase text-slate-500">
          {copy.inspector.inputBindings}
        </p>
        <p className="type-caption mt-1 leading-4 text-slate-400">
          {copy.inspector.dataHint}
        </p>
      </div>
      {targets.length === 0 && (
        <p className="type-caption rounded-xl border border-dashed border-slate-200 px-3 py-5 text-center text-slate-400">
          {copy.inspector.noBindings}
        </p>
      )}
      {targets.map((target) => {
        const bindings = node.bindings.filter(
          (binding) => binding.targetFieldId === target.id,
        );
        const binding = bindings[0];
        const sourceKey = binding ? referenceKey(binding.source) : '';
        const compatible = options.filter((option) => option.field.type === target.type);
        const canUseLiteral = !SENSITIVE_CLASSIFICATIONS.has(target.classification)
          && literalForType(target.type) !== null;
        const sourceIsStale = binding
          && binding.source.kind !== 'literal'
          && !options.some((option) => option.key === sourceKey);
        return (
          <div
            key={target.id}
            aria-label={copy.aria.mappingRow}
            className="rounded-xl border border-slate-200 p-3"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="type-technical font-mono font-bold text-slate-800">
                {target.key}
              </span>
              <span className={`type-label-compact rounded px-1.5 py-0.5 font-bold ${
 target.required
 ? 'bg-rose-50 text-rose-600'
 : 'bg-slate-100 text-slate-500'
 }`}>
                {target.required ? copy.common.required : copy.common.optional}
              </span>
            </div>
            <p className="type-caption mt-1 text-slate-400">
              {target.type} · {target.classification}
            </p>
            <select
              value={sourceKey}
              onChange={(event) => setSource(target, event.target.value)}
              className="type-control-compact mt-2 w-full rounded-lg border border-slate-200 px-2 py-2 font-semibold outline-none focus:border-[#354CE1]"
            >
              <option value="">{copy.common.noResults}</option>
              {sourceIsStale && (
                <option value={sourceKey}>{copy.mappingIssues.staleBinding}</option>
              )}
              <optgroup label={copy.inspector.valueSource}>
                {compatible.map((option) => (
                  <option key={option.key} value={option.key}>{option.label}</option>
                ))}
                {canUseLiteral && (
                  <option value="literal">{copy.inspector.literalValue}</option>
                )}
              </optgroup>
            </select>
            {binding?.source.kind === 'literal' && (
              binding.source.valueType === 'boolean' ? (
                <select
                  value={String(binding.source.value)}
                  onChange={(event) => updateLiteral(target, binding, event.target.value)}
                  className="type-control-compact mt-2 w-full rounded-lg border border-slate-200 px-2 py-2 outline-none focus:border-[#354CE1]"
                >
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
              ) : (
                <input
                  type={binding.source.valueType === 'number' ? 'number' : 'text'}
                  value={String(binding.source.value)}
                  onChange={(event) => updateLiteral(target, binding, event.target.value)}
                  className="type-technical mt-2 w-full rounded-lg border border-slate-200 px-2 py-2 font-mono outline-none focus:border-[#354CE1]"
                />
              )
            )}
          </div>
        );
      })}
      {issues.length > 0 && (
        <div className="space-y-1.5 rounded-xl border border-amber-200 bg-amber-50 p-3">
          {issues.map((issue, index) => (
            <p
              key={`${issue.code}-${issue.targetFieldId ?? index}`}
              className="type-label-compact flex gap-2 font-semibold leading-4 text-amber-800"
            >
              <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" />
              {mappingIssueMessage(issue.code, copy)}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

const fieldForReference = (
  reference: DataReference,
  options: readonly ReferenceOption[],
): FlowField | null => {
  if (reference.kind === 'literal') {
    return {
      id: 'literal',
      key: 'literal',
      type: reference.valueType,
      format: 'none',
      required: true,
      classification: 'internalMetadata',
      safeForResult: true,
    };
  }
  return options.find((option) => option.key === referenceKey(reference))?.field ?? null;
};

const defaultRule = (
  options: readonly ReferenceOption[],
): ConditionRule | null => {
  const first = options.find((option) =>
    option.field.type === 'string'
    || option.field.type === 'number'
    || option.field.type === 'boolean');
  if (!first) return null;
  const right = literalForType(first.field.type);
  if (!right) return null;
  return {
    id: createDashboardId('condition-rule'),
    kind: 'rule',
    left: first.reference,
    operator: 'equals',
    right,
  };
};

const updateGroupAt = (
  group: ConditionGroup,
  groupId: string,
  update: (group: ConditionGroup) => ConditionGroup,
): ConditionGroup => {
  if (group.id === groupId) return update(group);
  return {
    ...group,
    conditions: group.conditions.map((condition) =>
      condition.kind === 'group'
        ? updateGroupAt(condition, groupId, update)
        : condition),
  };
};

const updateRuleAt = (
  group: ConditionGroup,
  ruleId: string,
  update: (rule: ConditionRule) => ConditionRule,
): ConditionGroup => ({
  ...group,
  conditions: group.conditions.map((condition) => {
    if (condition.kind === 'rule') {
      return condition.id === ruleId ? update(condition) : condition;
    }
    return updateRuleAt(condition, ruleId, update);
  }),
});

const removeConditionAt = (
  group: ConditionGroup,
  conditionId: string,
): ConditionGroup => ({
  ...group,
  conditions: group.conditions
    .filter((condition) => condition.id !== conditionId)
    .map((condition) => condition.kind === 'group'
      ? removeConditionAt(condition, conditionId)
      : condition),
});

function ConditionRuleEditor({
  rule,
  options,
  copy,
  onChange,
  onRemove,
}: {
  readonly rule: ConditionRule;
  readonly options: readonly ReferenceOption[];
  readonly copy: DashboardAdvancedCopy;
  readonly onChange: (rule: ConditionRule) => void;
  readonly onRemove: () => void;
}) {
  const leftField = fieldForReference(rule.left, options);
  const operators = leftField
    ? getCompatibleConditionOperators(leftField.type)
    : ['exists', 'notExists'] as const;
  const requiresRight = rule.operator !== 'exists' && rule.operator !== 'notExists';
  const compatibleOptions = leftField
    ? options.filter((option) => option.field.type === leftField.type)
    : options;
  const canUseLiteral = Boolean(
    leftField
    && !SENSITIVE_CLASSIFICATIONS.has(leftField.classification)
    && literalForType(leftField.type),
  );
  const rightKey = rule.right ? referenceKey(rule.right) : '';

  const setLeft = (value: string) => {
    const option = options.find((candidate) => candidate.key === value);
    if (!option) return;
    const nextRight = literalForType(option.field.type);
    onChange({
      ...rule,
      left: option.reference,
      operator: 'equals',
      ...(nextRight ? { right: nextRight } : {}),
    });
  };
  const setRight = (value: string) => {
    const option = options.find((candidate) => candidate.key === value);
    if (option) {
      onChange({ ...rule, right: option.reference });
      return;
    }
    const literal = leftField ? literalForType(leftField.type) : null;
    if (value === 'literal' && literal) onChange({ ...rule, right: literal });
  };
  const setLiteral = (rawValue: string) => {
    if (!rule.right || rule.right.kind !== 'literal') return;
    const value = rule.right.valueType === 'number'
      ? Number(rawValue)
      : rule.right.valueType === 'boolean'
        ? rawValue === 'true'
        : rawValue;
    onChange({ ...rule, right: { ...rule.right, value } });
  };

  return (
    <div
      aria-label={copy.aria.conditionRule}
      className="space-y-2 rounded-xl border border-violet-100 bg-white p-2.5"
    >
      <div className="flex gap-2">
        <select
          aria-label={copy.conditions.leftValue}
          value={referenceKey(rule.left)}
          onChange={(event) => setLeft(event.target.value)}
          className="type-technical min-w-0 flex-1 rounded-lg border border-slate-200 px-2 py-1.5 font-mono "
        >
          {!options.some((option) => option.key === referenceKey(rule.left)) && (
            <option value={referenceKey(rule.left)}>{copy.mappingIssues.staleBinding}</option>
          )}
          {options.map((option) => (
            <option key={option.key} value={option.key}>{option.label}</option>
          ))}
        </select>
        <button
          type="button"
          aria-label={copy.conditions.removeRule}
          title={copy.conditions.removeRule}
          onClick={onRemove}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
      <select
        aria-label={copy.conditions.operator}
        value={rule.operator}
        onChange={(event) => {
          const operator = event.target.value as ConditionOperator;
          onChange({
            ...rule,
            operator,
            ...(
              operator === 'exists' || operator === 'notExists'
                ? { right: undefined }
                : rule.right
                  ? {}
                  : { right: leftField ? literalForType(leftField.type) ?? undefined : undefined }
            ),
          });
        }}
        className="type-control-compact w-full rounded-lg border border-slate-200 px-2 py-1.5 font-semibold"
      >
        {operators.map((operator) => (
          <option key={operator} value={operator}>
            {copy.conditionOperators[operator]}
          </option>
        ))}
      </select>
      {requiresRight && (
        <>
          <select
            aria-label={copy.conditions.rightValue}
            value={rightKey}
            onChange={(event) => setRight(event.target.value)}
            className="type-technical w-full rounded-lg border border-slate-200 px-2 py-1.5 font-mono "
          >
            {!compatibleOptions.some((option) => option.key === rightKey)
              && rule.right?.kind !== 'literal'
              && (
                <option value={rightKey}>{copy.mappingIssues.staleBinding}</option>
              )}
            {compatibleOptions.map((option) => (
              <option key={option.key} value={option.key}>{option.label}</option>
            ))}
            {canUseLiteral && (
              <option value="literal">{copy.inspector.literalValue}</option>
            )}
          </select>
          {rule.right?.kind === 'literal' && (
            rule.right.valueType === 'boolean' ? (
              <select
                value={String(rule.right.value)}
                onChange={(event) => setLiteral(event.target.value)}
                className="type-technical w-full rounded-lg border border-slate-200 px-2 py-1.5 font-mono "
              >
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
            ) : (
              <input
                type={rule.right.valueType === 'number' ? 'number' : 'text'}
                value={String(rule.right.value)}
                onChange={(event) => setLiteral(event.target.value)}
                className="type-technical w-full rounded-lg border border-slate-200 px-2 py-1.5 font-mono "
              />
            )
          )}
        </>
      )}
    </div>
  );
}

function ConditionGroupEditor({
  group,
  options,
  copy,
  isRoot,
  onRootChange,
  onRemove,
}: {
  readonly group: ConditionGroup;
  readonly options: readonly ReferenceOption[];
  readonly copy: DashboardAdvancedCopy;
  readonly isRoot: boolean;
  readonly onRootChange: (root: ConditionGroup) => void;
  readonly onRemove?: () => void;
}) {
  const updateGroup = (update: (group: ConditionGroup) => ConditionGroup) =>
    onRootChange(updateGroupAt(group, group.id, update));
  const addRule = () => {
    const rule = defaultRule(options);
    if (!rule) return;
    updateGroup((current) => ({
      ...current,
      conditions: [...current.conditions, rule],
    }));
  };
  const addGroup = () => updateGroup((current) => ({
    ...current,
    conditions: [
      ...current.conditions,
      {
        ...createEmptyConditionGroup(),
        id: createDashboardId('condition-group'),
      },
    ],
  }));

  return (
    <div
      aria-label={copy.aria.conditionGroup}
      className={`space-y-2 rounded-xl border p-2.5 ${
 isRoot ? 'border-violet-200 bg-violet-50/50' : 'border-slate-200 bg-slate-50'
 }`}
    >
      <div className="flex items-center gap-2">
        <GitBranch className="h-3.5 w-3.5 text-violet-600" />
        <select
          value={group.combinator}
          onChange={(event) => updateGroup((current) => ({
            ...current,
            combinator: event.target.value as ConditionGroup['combinator'],
          }))}
          className="type-control-compact min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-2 py-1.5 font-bold"
        >
          <option value="and">{copy.conditions.matchAll}</option>
          <option value="or">{copy.conditions.matchAny}</option>
        </select>
        {!isRoot && onRemove && (
          <button
            type="button"
            aria-label={copy.conditions.removeGroup}
            title={copy.conditions.removeGroup}
            onClick={onRemove}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
      {group.conditions.map((condition) => (
        condition.kind === 'rule' ? (
          <ConditionRuleEditor
            key={condition.id}
            rule={condition}
            options={options}
            copy={copy}
            onChange={(rule) => onRootChange(updateRuleAt(group, condition.id, () => rule))}
            onRemove={() => onRootChange(removeConditionAt(group, condition.id))}
          />
        ) : (
          <ConditionGroupEditor
            key={condition.id}
            group={condition}
            options={options}
            copy={copy}
            isRoot={false}
            onRootChange={(nested) => onRootChange(
              updateGroupAt(group, condition.id, () => nested),
            )}
            onRemove={() => onRootChange(removeConditionAt(group, condition.id))}
          />
        )
      ))}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={addRule}
          disabled={options.length === 0}
          className="type-control-compact inline-flex flex-1 items-center justify-center gap-1 rounded-lg border border-violet-200 bg-white px-2 py-1.5 font-bold text-violet-700 disabled:opacity-40"
        >
          <Plus className="h-3 w-3" />
          {copy.conditions.addRule}
        </button>
        <button
          type="button"
          onClick={addGroup}
          className="type-control-compact inline-flex flex-1 items-center justify-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1.5 font-bold text-slate-600"
        >
          <Plus className="h-3 w-3" />
          {copy.conditions.addGroup}
        </button>
      </div>
    </div>
  );
}

function ConditionBuilder({
  manifest,
  node,
  moduleCatalog,
  subflowCatalog,
  copy,
  onChange,
}: {
  readonly manifest: DynamicFlowManifestV2;
  readonly node: Extract<DynamicFlowNodeV2, { readonly kind: 'condition' }>;
  readonly moduleCatalog: readonly ModulePackage[];
  readonly subflowCatalog: readonly SubflowPackage[];
  readonly copy: DashboardAdvancedCopy;
  readonly onChange: (manifest: DynamicFlowManifestV2) => void;
}) {
  const options = buildReferenceOptions(
    manifest,
    node.id,
    moduleCatalog,
    subflowCatalog,
  ).filter((option) =>
    option.field.type === 'string'
    || option.field.type === 'number'
    || option.field.type === 'boolean');
  const setRoot = (root: ConditionGroup) => onChange(
    updateNode(manifest, node.id, (candidate) => candidate.kind === 'condition'
      ? {
          ...candidate,
          condition: {
            root,
            migrationState: 'native',
          },
        }
      : candidate),
  );

  if (node.condition.migrationState === 'requiresConversion') {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
        <div className="flex gap-2">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
          <div>
            <p className="type-label-compact font-bold text-amber-900">
              {copy.conditions.legacyTitle}
            </p>
            <p className="type-caption mt-1 leading-4 text-amber-800">
              {copy.conditions.legacyDescription}
            </p>
            <code className="type-technical mt-2 block break-all rounded-lg bg-white/70 p-2 text-amber-900">
              {node.condition.legacyExpression}
            </code>
            <button
              type="button"
              onClick={() => setRoot(createEmptyConditionGroup())}
              className="type-control-compact mt-2 rounded-lg bg-amber-800 px-2.5 py-1.5 font-bold text-white"
            >
              {copy.conditions.convertLegacy}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div>
        <p className="type-label-compact font-bold uppercase text-slate-500">
          {copy.conditions.title}
        </p>
        <p className="type-caption mt-1 leading-4 text-slate-400">
          {copy.conditions.description}
        </p>
      </div>
      <ConditionGroupEditor
        group={node.condition.root}
        options={options}
        copy={copy}
        isRoot
        onRootChange={setRoot}
      />
    </div>
  );
}

function DatabaseStrategyEditor({
  manifest,
  node,
  copy,
  baseCopy,
  onChange,
}: {
  readonly manifest: DynamicFlowManifestV2;
  readonly node: Extract<DynamicFlowNodeV2, { readonly kind: 'verification' }>;
  readonly copy: DashboardAdvancedCopy;
  readonly baseCopy: DashboardCopy;
  readonly onChange: (manifest: DynamicFlowManifestV2) => void;
}) {
  const strategy = node.databaseStrategy ?? {
    executionMode: 'parallel' as const,
    aggregation: 'anyMatch' as const,
    stopOnMatch: true,
    requiredSourceIds: [],
    unavailablePolicy: 'continue' as const,
  };
  const patchStrategy = (patch: Partial<typeof strategy>) => onChange(
    updateNode(manifest, node.id, (candidate) => candidate.kind === 'verification'
      ? {
          ...candidate,
          databaseStrategy: { ...strategy, ...patch },
        }
      : candidate),
  );
  const setSelectedSources = (sourceIds: readonly string[]) => onChange(
    updateNode(manifest, node.id, (candidate) => candidate.kind === 'verification'
      ? {
          ...candidate,
          selectedDatabaseSourceIds: sourceIds,
          databaseStrategy: {
            ...strategy,
            requiredSourceIds: strategy.requiredSourceIds.filter(
              (sourceId) => sourceIds.includes(sourceId),
            ),
          },
        }
      : candidate),
  );
  const toggleSource = (sourceId: string) => setSelectedSources(
    node.selectedDatabaseSourceIds.includes(sourceId)
      ? node.selectedDatabaseSourceIds.filter((id) => id !== sourceId)
      : [...node.selectedDatabaseSourceIds, sourceId],
  );
  const moveSource = (sourceId: string, direction: -1 | 1) => {
    const sourceIds = [...node.selectedDatabaseSourceIds];
    const index = sourceIds.indexOf(sourceId);
    const target = index + direction;
    if (index < 0 || target < 0 || target >= sourceIds.length) return;
    [sourceIds[index], sourceIds[target]] = [sourceIds[target]!, sourceIds[index]!];
    setSelectedSources(sourceIds);
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="type-label-compact flex items-center gap-2 font-bold uppercase text-slate-500">
          <Database className="h-3.5 w-3.5" />
          {copy.databaseStrategy.title}
        </p>
        <p className="type-caption mt-1 leading-4 text-slate-400">
          {copy.databaseStrategy.description}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <label>
          <span className="type-label-compact font-bold text-slate-500">
            {copy.databaseStrategy.executionMode}
          </span>
          <select
            value={strategy.executionMode}
            onChange={(event) => patchStrategy({
              executionMode: event.target.value as typeof strategy.executionMode,
            })}
            className="type-control-compact mt-1 w-full rounded-lg border border-slate-200 px-2 py-2 "
          >
            <option value="parallel">{copy.databaseStrategy.parallel}</option>
            <option value="sequential">{copy.databaseStrategy.sequential}</option>
          </select>
        </label>
        <label>
          <span className="type-label-compact font-bold text-slate-500">
            {copy.databaseStrategy.aggregation}
          </span>
          <select
            value={strategy.aggregation}
            onChange={(event) => patchStrategy({
              aggregation: event.target.value as typeof strategy.aggregation,
            })}
            className="type-control-compact mt-1 w-full rounded-lg border border-slate-200 px-2 py-2 "
          >
            <option value="anyMatch">{copy.databaseStrategy.anyMatch}</option>
            <option value="allClear">{copy.databaseStrategy.allClear}</option>
            <option value="quorum">{copy.databaseStrategy.quorum}</option>
            <option value="weighted">{copy.databaseStrategy.weighted}</option>
          </select>
        </label>
      </div>
      {(strategy.aggregation === 'quorum' || strategy.aggregation === 'weighted') && (
        <label className="block">
          <span className="type-label-compact font-bold text-slate-500">
            {strategy.aggregation === 'quorum'
              ? copy.databaseStrategy.quorumCount
              : copy.databaseStrategy.weightedThreshold}
          </span>
          <input
            type="number"
            min={strategy.aggregation === 'quorum' ? 1 : 0.01}
            max={strategy.aggregation === 'quorum'
              ? Math.max(1, node.selectedDatabaseSourceIds.length)
              : 1}
            step={strategy.aggregation === 'quorum' ? 1 : 0.05}
            value={strategy.aggregation === 'quorum'
              ? strategy.quorum ?? 1
              : strategy.weightedThreshold ?? 0.5}
            onChange={(event) => patchStrategy(
              strategy.aggregation === 'quorum'
                ? { quorum: Number(event.target.value) }
                : { weightedThreshold: Number(event.target.value) },
            )}
            className="type-control-compact mt-1 w-full rounded-lg border border-slate-200 px-2 py-2 "
          />
        </label>
      )}
      <label className="block">
        <span className="type-label-compact font-bold text-slate-500">
          {copy.databaseStrategy.unavailablePolicy}
        </span>
        <select
          value={strategy.unavailablePolicy}
          onChange={(event) => patchStrategy({
            unavailablePolicy: event.target.value as typeof strategy.unavailablePolicy,
          })}
          className="type-control-compact mt-1 w-full rounded-lg border border-slate-200 px-2 py-2 "
        >
          <option value="continue">{copy.databaseStrategy.continueOnUnavailable}</option>
          <option value="inconclusive">{copy.databaseStrategy.markInconclusive}</option>
          <option value="sourceUnavailable">
            {copy.databaseStrategy.returnSourceUnavailable}
          </option>
        </select>
      </label>
      <label className="type-label-compact flex items-center gap-2 font-bold text-slate-600">
        <input
          type="checkbox"
          checked={strategy.stopOnMatch}
          onChange={(event) => patchStrategy({ stopOnMatch: event.target.checked })}
          className="accent-[#354CE1]"
        />
        {copy.databaseStrategy.stopOnMatch}
      </label>
      <div>
        <p className="type-label-compact font-bold text-slate-500">
          {copy.databaseStrategy.sourceOrder}
        </p>
        <p className="type-caption mt-1 leading-4 text-slate-400">
          {copy.databaseStrategy.sourceOrderHint}
        </p>
        <div className="mt-2 space-y-2">
          {DATABASE_SOURCES.map((source) => {
            const selected = node.selectedDatabaseSourceIds.includes(source.id);
            const index = node.selectedDatabaseSourceIds.indexOf(source.id);
            const required = strategy.requiredSourceIds.includes(source.id);
            return (
              <div
                key={source.id}
                className={`rounded-xl border p-2.5 ${
 selected ? 'border-[#354CE1] bg-[#F7F8FF]' : 'border-slate-200'
 }`}
              >
                <label className="flex cursor-pointer items-start gap-2">
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => toggleSource(source.id)}
                    className="mt-0.5 accent-[#354CE1]"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="type-label-compact block font-bold text-slate-800">
                      {baseCopy.databaseSources[source.id].name}
                    </span>
                    <span className="type-caption mt-0.5 block text-slate-400">
                      {source.scope === 'domestic'
                        ? baseCopy.builder.domestic
                        : baseCopy.builder.international}
                    </span>
                  </span>
                </label>
                {selected && (
                  <div className="mt-2 flex items-center gap-1.5 border-t border-slate-200 pt-2">
                    <label className="type-label-compact mr-auto flex items-center gap-1.5 font-bold text-slate-500">
                      <input
                        type="checkbox"
                        checked={required}
                        onChange={() => patchStrategy({
                          requiredSourceIds: required
                            ? strategy.requiredSourceIds.filter((id) => id !== source.id)
                            : [...strategy.requiredSourceIds, source.id],
                        })}
                        className="accent-[#354CE1]"
                      />
                      {copy.common.required}
                    </label>
                    {strategy.aggregation === 'weighted' && (
                      <input
                        aria-label={copy.databaseStrategy.sourceWeight}
                        title={copy.databaseStrategy.sourceWeight}
                        type="number"
                        min={0.1}
                        step={0.1}
                        value={strategy.sourceWeights?.[source.id] ?? 1}
                        onChange={(event) => patchStrategy({
                          sourceWeights: {
                            ...strategy.sourceWeights,
                            [source.id]: Number(event.target.value),
                          },
                        })}
                        className="type-control-compact w-12 rounded border border-slate-200 px-1 py-1 "
                      />
                    )}
                    <button
                      type="button"
                      aria-label={copy.blocks.moveUp}
                      title={copy.blocks.moveUp}
                      disabled={index <= 0}
                      onClick={() => moveSource(source.id, -1)}
                      className="rounded p-1 text-slate-400 hover:bg-white disabled:opacity-30"
                    >
                      <ArrowUp className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      aria-label={copy.blocks.moveDown}
                      title={copy.blocks.moveDown}
                      disabled={index === node.selectedDatabaseSourceIds.length - 1}
                      onClick={() => moveSource(source.id, 1)}
                      className="rounded p-1 text-slate-400 hover:bg-white disabled:opacity-30"
                    >
                      <ArrowDown className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function FlowInspectorAdvanced({
  copy,
  advancedCopy,
  manifest,
  node,
  moduleCatalog,
  subflowCatalog,
  onManifestChange,
}: FlowInspectorAdvancedProps) {
  const [tab, setTab] = useState<InspectorTab>('configuration');
  useEffect(() => setTab('configuration'), [node.id]);
  const isBindable = node.kind === 'verification' || node.kind === 'subflow';
  const isDatabase = node.kind === 'verification'
    && node.moduleRef.packageId === 'database-cross-check';

  const content = useMemo(() => {
    if (tab === 'data') {
      if (node.kind === 'start') {
        return (
          <FlowInputSchemaEditor
            manifest={manifest}
            copy={advancedCopy}
            onChange={onManifestChange}
          />
        );
      }
      if (node.kind === 'verification' || node.kind === 'subflow') {
        return (
          <InputMappingEditor
            manifest={manifest}
            node={node}
            moduleCatalog={moduleCatalog}
            subflowCatalog={subflowCatalog}
            copy={advancedCopy}
            onChange={onManifestChange}
          />
        );
      }
      return (
        <p className="type-caption rounded-xl border border-dashed border-slate-200 px-3 py-5 text-center text-slate-400">
          {advancedCopy.inspector.noBindings}
        </p>
      );
    }

    if (node.kind === 'condition') {
      return (
        <ConditionBuilder
          manifest={manifest}
          node={node}
          moduleCatalog={moduleCatalog}
          subflowCatalog={subflowCatalog}
          copy={advancedCopy}
          onChange={onManifestChange}
        />
      );
    }
    if (isDatabase) {
      return (
        <DatabaseStrategyEditor
          manifest={manifest}
          node={node}
          copy={advancedCopy}
          baseCopy={copy}
          onChange={onManifestChange}
        />
      );
    }
    if (node.kind === 'verification') {
      return (
        <label className="block">
          <span className="type-label-compact font-bold uppercase text-slate-500">
            {copy.builder.retryLimit}
          </span>
          <input
            type="number"
            min={0}
            max={5}
            value={node.retryPolicy.maxAttempts}
            onChange={(event) => onManifestChange(
              updateNode(manifest, node.id, (candidate) => candidate.kind === 'verification'
                ? {
                    ...candidate,
                    retryPolicy: {
                      maxAttempts: Math.max(
                        0,
                        Math.min(5, Number(event.target.value) || 0),
                      ),
                    },
                  }
                : candidate),
            )}
            className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#354CE1]"
          />
        </label>
      );
    }
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
        <p className="type-label-compact flex items-center gap-2 font-bold text-slate-700">
          <Link2 className="h-3.5 w-3.5 text-[#354CE1]" />
          {advancedCopy.inspector.configurationHint}
        </p>
      </div>
    );
  }, [
    advancedCopy,
    copy,
    isDatabase,
    manifest,
    moduleCatalog,
    node,
    onManifestChange,
    subflowCatalog,
    tab,
  ]);

  return (
    <div>
      <div
        role="tablist"
        aria-label={advancedCopy.aria.inspectorTabs}
        className="grid grid-cols-2 rounded-xl bg-slate-100 p-1"
      >
        {([
          ['configuration', advancedCopy.inspector.configurationTab],
          ['data', advancedCopy.inspector.dataTab],
        ] as const).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`type-control-compact rounded-lg px-2 py-2 font-bold transition ${
 tab === id
 ? 'bg-white text-[#354CE1] shadow-sm'
 : 'text-slate-500 hover:text-slate-800'
 }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {content}
      </div>
      {!isBindable && tab === 'data' && node.kind !== 'start' && (
        <p className="type-caption mt-2 text-slate-400">
          {advancedCopy.inspector.dataHint}
        </p>
      )}
    </div>
  );
}
