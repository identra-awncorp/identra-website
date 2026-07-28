/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import {
  calculatePlatformFlowMetrics,
  createPlatformFlowConfig,
  generatePlatformFlowTypescript,
  platformFlowReducer,
  runPlatformFlowSimulation,
  sanitizePlatformFlowFileName,
  serializePlatformFlowConfig,
  validatePlatformFlowConfig,
  type PlatformFlowConfig,
} from '../src/components/platform/PlatformFlowStudioModel';

test('creates independent, valid preset configurations', () => {
  const first = createPlatformFlowConfig('ssi-minimal');
  const second = createPlatformFlowConfig('ssi-minimal');

  assert.notEqual(first, second);
  assert.deepEqual(validatePlatformFlowConfig(first), []);

  first.verificationSteps.pop();
  assert.equal(second.verificationSteps.length, 4);
});

test('adds, removes, and reorders unique verification modules', () => {
  let config = createPlatformFlowConfig('blank');
  config = platformFlowReducer(config, {
    type: 'add-step',
    stepId: 'government-id',
  });
  config = platformFlowReducer(config, {
    type: 'add-step',
    stepId: 'selfie-liveness',
    mode: 'step-up',
  });
  config = platformFlowReducer(config, {
    type: 'add-step',
    stepId: 'government-id',
  });

  assert.deepEqual(config.verificationSteps.map((step) => step.id), [
    'government-id',
    'selfie-liveness',
  ]);

  config = platformFlowReducer(config, {
    type: 'move-step',
    stepId: 'selfie-liveness',
    direction: 'up',
  });
  assert.deepEqual(config.verificationSteps.map((step) => step.id), [
    'selfie-liveness',
    'government-id',
  ]);

  config = platformFlowReducer(config, {
    type: 'reorder-step',
    stepId: 'government-id',
    targetStepId: 'selfie-liveness',
  });
  assert.deepEqual(config.verificationSteps.map((step) => step.id), [
    'government-id',
    'selfie-liveness',
  ]);

  config = platformFlowReducer(config, {
    type: 'remove-step',
    stepId: 'government-id',
  });
  assert.deepEqual(config.verificationSteps.map((step) => step.id), ['selfie-liveness']);
});

test('preserves rule priority and falls back when no rule matches', () => {
  const config = createPlatformFlowConfig('ssi-minimal');
  const trusted = runPlatformFlowSimulation(config, 'trusted');
  const fraud = runPlatformFlowSimulation(config, 'fraud-ring');

  assert.equal(trusted.matchedRuleId, 'rule-4');
  assert.equal(trusted.action.type, 'approve');
  assert.equal(fraud.matchedRuleId, 'rule-1');
  assert.equal(fraud.action.type, 'reject');

  const withoutRules: PlatformFlowConfig = {
    ...config,
    workflowRules: [],
    fallbackAction: { type: 'send-webhook' },
  };
  const fallback = runPlatformFlowSimulation(withoutRules, 'trusted');
  assert.equal(fallback.matchedRuleId, null);
  assert.equal(fallback.action.type, 'send-webhook');
});

test('validates step-up rules against configured conditional modules', () => {
  const config = createPlatformFlowConfig('ssi-minimal');
  const invalidTarget: PlatformFlowConfig = {
    ...config,
    verificationSteps: config.verificationSteps.map((step) => (
      step.id === 'selfie-liveness' ? { ...step, mode: 'always' } : step
    )),
  };

  assert.ok(validatePlatformFlowConfig(invalidTarget).includes('invalid-step-up-target'));

  const missingTarget: PlatformFlowConfig = {
    ...config,
    workflowRules: config.workflowRules.map((rule) => (
      rule.id === 'rule-3'
        ? { ...rule, action: { type: 'request-step-up' } }
        : rule
    )),
  };
  assert.ok(validatePlatformFlowConfig(missingTarget).includes('missing-step-up-target'));
});

test('derives metrics from one shared configuration', () => {
  const blankMetrics = calculatePlatformFlowMetrics(createPlatformFlowConfig('blank'));
  const highAssuranceMetrics = calculatePlatformFlowMetrics(
    createPlatformFlowConfig('kyc-high-assurance'),
  );

  assert.ok(highAssuranceMetrics.assuranceScore > blankMetrics.assuranceScore);
  assert.ok(highAssuranceMetrics.fraudDetectionRate > blankMetrics.fraudDetectionRate);
  assert.ok(highAssuranceMetrics.completionRate < blankMetrics.completionRate);
  assert.ok(highAssuranceMetrics.estimatedSeconds > blankMetrics.estimatedSeconds);
});

test('uses enabled prevention signals in deterministic simulation results', () => {
  const highAssurance = createPlatformFlowConfig('kyc-high-assurance');
  const withSignals = runPlatformFlowSimulation(highAssurance, 'fraud-ring');
  const withoutSignals = runPlatformFlowSimulation(
    { ...highAssurance, preventionSignals: [] },
    'fraud-ring',
  );

  assert.equal(withSignals.riskScore, 100);
  assert.equal(withSignals.graph?.nodes.length, 5);
  assert.ok(withSignals.riskScore > withoutSignals.riskScore);
  assert.equal(withoutSignals.graph, null);
});

test('exports parseable JSON and matching illustrative TypeScript', () => {
  const config = createPlatformFlowConfig('kyb-business');
  const json = serializePlatformFlowConfig(config);
  const typescript = generatePlatformFlowTypescript(config);

  assert.deepEqual(JSON.parse(json), config);
  assert.match(typescript, /@identra\/node/);
  assert.match(typescript, /kyb-business-ownership/);
  assert.match(typescript, /Illustrative SDK contract/);
  assert.match(typescript, /identra\.flows\.create/);
});

test('sanitizes localized flow names for downloads', () => {
  assert.equal(
    sanitizePlatformFlowFileName('Luồng xác thực Doanh nghiệp 2026'),
    'luong-xac-thuc-doanh-nghiep-2026',
  );
  assert.equal(sanitizePlatformFlowFileName('---'), 'identra-verification-flow');
});
