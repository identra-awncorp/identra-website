/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type {
  DynamicFlowManifestV2,
  JsonValue,
  ScenarioExecutionResult,
  SimulationStepV2,
} from './dashboardV2Types';

export type FlowDebuggerStatus = 'paused' | 'completed';
export type FlowDebuggerPauseReason = 'entry' | 'breakpoint' | 'step' | 'completed';

export type FlowDebuggerSession = {
  readonly activeStepIndex: number;
  readonly status: FlowDebuggerStatus;
  readonly pauseReason: FlowDebuggerPauseReason;
};

export type ExecutionExplanationReason =
  | 'start'
  | 'condition'
  | 'legacyCondition'
  | 'verificationFixture'
  | 'databaseStrategy'
  | 'subflow'
  | 'terminal'
  | 'blocked';

export type ExecutionStepExplanation = {
  readonly step: SimulationStepV2;
  readonly reason: ExecutionExplanationReason;
  readonly targetNodeId?: string;
  readonly metadata?: Readonly<Record<string, JsonValue>>;
  readonly hasMatchingConnection: boolean;
};

export const startFlowDebugger = (
  result: ScenarioExecutionResult,
): FlowDebuggerSession => ({
  activeStepIndex: result.steps.length > 0 ? 0 : -1,
  status: result.steps.length > 0 ? 'paused' : 'completed',
  pauseReason: result.steps.length > 0 ? 'entry' : 'completed',
});

export const stepFlowDebugger = (
  result: ScenarioExecutionResult,
  session: FlowDebuggerSession,
  breakpointNodeIds: ReadonlySet<string>,
): FlowDebuggerSession => {
  const nextIndex = session.activeStepIndex + 1;
  if (nextIndex >= result.steps.length) {
    return {
      activeStepIndex: Math.max(-1, result.steps.length - 1),
      status: 'completed',
      pauseReason: 'completed',
    };
  }
  const nextStep = result.steps[nextIndex];
  const completed = nextIndex === result.steps.length - 1;
  return {
    activeStepIndex: nextIndex,
    status: completed ? 'completed' : 'paused',
    pauseReason: completed
      ? 'completed'
      : nextStep && breakpointNodeIds.has(nextStep.nodeId)
        ? 'breakpoint'
        : 'step',
  };
};

export const continueFlowDebugger = (
  result: ScenarioExecutionResult,
  session: FlowDebuggerSession,
  breakpointNodeIds: ReadonlySet<string>,
): FlowDebuggerSession => {
  for (
    let index = session.activeStepIndex + 1;
    index < result.steps.length;
    index += 1
  ) {
    const step = result.steps[index];
    if (step && breakpointNodeIds.has(step.nodeId)) {
      return {
        activeStepIndex: index,
        status: 'paused',
        pauseReason: 'breakpoint',
      };
    }
  }
  return {
    activeStepIndex: Math.max(-1, result.steps.length - 1),
    status: 'completed',
    pauseReason: 'completed',
  };
};

export const explainSimulationStep = (
  manifest: DynamicFlowManifestV2,
  result: ScenarioExecutionResult,
  stepIndex: number,
): ExecutionStepExplanation | null => {
  const step = result.steps[stepIndex];
  if (!step) return null;
  const node = manifest.nodes.find((candidate) => candidate.id === step.nodeId);
  const edge = step.edgeId
    ? manifest.edges.find((candidate) => candidate.id === step.edgeId)
    : undefined;

  let reason: ExecutionExplanationReason = 'blocked';
  if (node?.kind === 'start') reason = 'start';
  if (node?.kind === 'condition') {
    reason = node.condition.migrationState === 'native'
      && node.condition.root.conditions.length > 0
      ? 'condition'
      : 'legacyCondition';
  }
  if (node?.kind === 'verification') {
    reason = node.moduleRef.packageId === 'database-cross-check'
      ? 'databaseStrategy'
      : 'verificationFixture';
  }
  if (node?.kind === 'subflow') reason = 'subflow';
  if (node?.kind === 'terminal') reason = 'terminal';

  return {
    step,
    reason,
    ...(edge ? { targetNodeId: edge.target } : {}),
    ...(step.metadata ? { metadata: step.metadata } : {}),
    hasMatchingConnection: Boolean(edge) || node?.kind === 'terminal',
  };
};
