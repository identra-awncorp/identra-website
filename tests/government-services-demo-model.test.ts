/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import {
  advanceGovernmentServicesProgress,
  createGovernmentServicesProgress,
  getGovernmentSignatureSeal,
  resetGovernmentServicesProgress,
  validateGovernmentSignature,
} from '../src/components/demo/GovernmentServicesDemoModel';

test('advances government checks from registry to signature', () => {
  const registryTransition = advanceGovernmentServicesProgress(
    createGovernmentServicesProgress(),
  );
  assert.ok(registryTransition);
  assert.equal(registryTransition.completedStageId, 'civil-registry');
  assert.equal(registryTransition.nextStageId, 'residential-address');

  const addressTransition = advanceGovernmentServicesProgress(registryTransition.progress);
  assert.ok(addressTransition);
  const signatureTransition = advanceGovernmentServicesProgress(addressTransition.progress);
  assert.ok(signatureTransition);
  assert.equal(signatureTransition.completedStageId, 'digital-signature');
  assert.equal(signatureTransition.progress.status, 'complete');
});

test('validates and seals the citizen signature deterministically', () => {
  assert.equal(validateGovernmentSignature('   '), 'signature-required');
  assert.equal(validateGovernmentSignature('Alice Vance'), null);
  assert.equal(getGovernmentSignatureSeal('  Alice Vance  '), 'ALICE VANCE');
});

test('increments the reset key when a government flow is restarted', () => {
  const initial = createGovernmentServicesProgress(4);
  const reset = resetGovernmentServicesProgress(initial);

  assert.equal(reset.resetKey, 5);
  assert.deepEqual(reset.completedSteps, [false, false, false]);
});
