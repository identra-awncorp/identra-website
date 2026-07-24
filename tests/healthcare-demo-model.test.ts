/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import {
  advanceHealthcareProgress,
  createHealthcareProgress,
  resetHealthcareProgress,
  validateHealthcareConsent,
  validateHealthcarePatientName,
} from '../src/components/demo/HealthcareDemoModel';

test('keeps healthcare verification stages in patient-intake order', () => {
  const identityTransition = advanceHealthcareProgress(createHealthcareProgress());
  assert.ok(identityTransition);
  assert.equal(identityTransition.completedStageId, 'patient-identity');
  assert.equal(identityTransition.nextStageId, 'insurance-coverage');

  const insuranceTransition = advanceHealthcareProgress(identityTransition.progress);
  assert.ok(insuranceTransition);
  const consentTransition = advanceHealthcareProgress(insuranceTransition.progress);
  assert.ok(consentTransition);
  assert.equal(consentTransition.completedStageId, 'privacy-consent');
  assert.equal(consentTransition.progress.status, 'complete');
});

test('validates patient identity and consent independently', () => {
  assert.equal(validateHealthcarePatientName(''), 'patient-name-required');
  assert.equal(validateHealthcarePatientName('John Doe'), null);
  assert.equal(validateHealthcareConsent(false), 'consent-required');
  assert.equal(validateHealthcareConsent(true), null);
});

test('resets healthcare progress and produces a new child-flow key', () => {
  const reset = resetHealthcareProgress(createHealthcareProgress());

  assert.equal(reset.currentStepIndex, 0);
  assert.equal(reset.resetKey, 1);
  assert.deepEqual(reset.completedSteps, [false, false, false]);
});
