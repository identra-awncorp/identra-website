/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import {
  advanceAirlinesHotelsProgress,
  createAirlinesHotelsProgress,
  resetAirlinesHotelsProgress,
} from '../src/components/demo/AirlinesHotelsDemoModel';

test('advances the airlines and hotels stages in their domain order', () => {
  const initial = createAirlinesHotelsProgress();
  const passportTransition = advanceAirlinesHotelsProgress(initial);
  assert.ok(passportTransition);
  assert.equal(passportTransition.completedStageId, 'passport-chip');
  assert.equal(passportTransition.nextStageId, 'biometric-match');

  const biometricTransition = advanceAirlinesHotelsProgress(passportTransition.progress);
  assert.ok(biometricTransition);
  const reservationTransition = advanceAirlinesHotelsProgress(biometricTransition.progress);
  assert.ok(reservationTransition);
  assert.equal(reservationTransition.completedStageId, 'reservation-sync');
  assert.equal(reservationTransition.nextStageId, null);
  assert.equal(reservationTransition.progress.status, 'complete');
  assert.deepEqual(reservationTransition.progress.completedSteps, [true, true, true]);
});

test('resets both progress and child-flow identity', () => {
  const transition = advanceAirlinesHotelsProgress(createAirlinesHotelsProgress());
  assert.ok(transition);

  const reset = resetAirlinesHotelsProgress(transition.progress);
  assert.equal(reset.currentStepIndex, 0);
  assert.deepEqual(reset.completedSteps, [false, false, false]);
  assert.equal(reset.resetKey, 1);
});
