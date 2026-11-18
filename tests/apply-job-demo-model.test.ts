/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import {
  getApplyJobFieldProvenance,
  getApplyJobVerificationOutcome,
  getApplyJobVerificationPlan,
  getApplyJobVerificationSnapshot,
  isIllustrativeDetail,
  isVerifiedField,
  validateApplyJobApplication,
  type ApplyJobApplicationInput,
} from '../src/components/demo/ApplyJobDemoModel';

const validManualApplication: ApplyJobApplicationInput = {
  name: 'Nguyen Van An',
  identityNumber: '012398765432',
  email: 'an.nguyen@example.com',
  phone: '0988123456',
  degree: 'Bachelor of Computer Science',
  certificates: [],
  pendingCertificateTitle: '',
  pendingCertificateUrl: '',
  experience: '4',
  githubUrl: 'github.com/annguyen',
};

test('uses one deterministic snapshot for all verification stages', () => {
  const plan = getApplyJobVerificationPlan('identra', 2);
  const snapshot = getApplyJobVerificationSnapshot(plan, 3, 'running');

  assert.equal(snapshot.totalDetailCount, 8);
  assert.equal(snapshot.progressPercent, 38);
  assert.equal(snapshot.activeDetailId, 'identraDiplomaChecks');
  assert.deepEqual(snapshot.stages.map((stage) => stage.status), ['done', 'active', 'pending']);
});

test('the Identra plan has exactly two real steps, both from the verified diploma; certificates stay self-declared', () => {
  const plan = getApplyJobVerificationPlan('identra', 2);

  assert.deepEqual(plan[0].detailIds, [
    'identraNameFromDiploma',
    'manualIdentityRegistryLookup',
    'manualWorkEligibilityCheck',
  ]);
  assert.deepEqual(plan[1].detailIds, ['identraDiplomaChecks', 'manualCertificateUrlMatch']);
  assert.deepEqual(getApplyJobVerificationPlan('identra', 0)[1].detailIds, ['identraDiplomaChecks', 'manualNoCertificateCheck']);
  const details = plan.flatMap((stage) => stage.detailIds);
  assert.deepEqual(details.filter((detailId) => !isIllustrativeDetail(detailId)), ['identraNameFromDiploma', 'identraDiplomaChecks']);
  assert.ok(getApplyJobVerificationPlan('manual', true).flatMap((stage) => stage.detailIds).every(isIllustrativeDetail));
  assert.deepEqual(plan[2].detailIds, [
    'backgroundConsentCheck',
    'backgroundRecordCheck',
    'backgroundWatchlistCheck',
  ]);
});

test('marks every stage and detail complete together', () => {
  const plan = getApplyJobVerificationPlan('manual', false);
  const snapshot = getApplyJobVerificationSnapshot(plan, plan.flatMap((stage) => stage.detailIds).length, 'complete');

  assert.equal(snapshot.progressPercent, 100);
  assert.equal(snapshot.activeDetailId, null);
  assert.ok(snapshot.stages.every((stage) => stage.status === 'done'));
  assert.ok(snapshot.stages.every((stage) => stage.detailStatuses.every((status) => status === 'done')));
});

test('keeps Identra and manual credential checks separate', () => {
  const identraPlan = getApplyJobVerificationPlan('identra', true);
  const manualPlan = getApplyJobVerificationPlan('manual', true);

  assert.equal(identraPlan[1].detailIds[0], 'identraDiplomaChecks');
  assert.ok(manualPlan[1].detailIds.every((detailId) => detailId.startsWith('manual')));
});

test('only name and degree come from the diploma, and only when the server confirmed it', () => {
  const passed = { ok: true };
  for (const field of ['identity', 'email', 'phone', 'certificates', 'experience', 'github'] as const) {
    assert.equal(getApplyJobFieldProvenance('identra', field, passed), 'self-declared', field);
    assert.equal(isVerifiedField('identra', field, passed), false, field);
  }
  assert.equal(getApplyJobFieldProvenance('identra', 'name', passed), 'diploma');
  assert.equal(getApplyJobFieldProvenance('identra', 'degree', passed), 'diploma');
  assert.equal(getApplyJobFieldProvenance('identra', 'degree', { ok: false }), 'self-declared');
  assert.equal(getApplyJobFieldProvenance('identra', 'degree', null), 'self-declared');
  assert.equal(getApplyJobFieldProvenance('manual', 'degree', passed), 'self-declared');
});

test('the outcome follows the server answer, not the mode alone', () => {
  assert.equal(getApplyJobVerificationOutcome('identra', { ok: true }), 'verified');
  assert.equal(getApplyJobVerificationOutcome('identra', { ok: false }), 'needs-review');
  assert.equal(getApplyJobVerificationOutcome('identra', null), 'needs-review');
  assert.equal(getApplyJobVerificationOutcome('manual', { ok: true }), 'needs-review');
});

test('requires every self-declared field, the identity number included, in both modes', () => {
  assert.equal(validateApplyJobApplication(validManualApplication), null);
  assert.equal(
    validateApplyJobApplication({ ...validManualApplication, email: '' }),
    'email',
  );
  assert.equal(
    validateApplyJobApplication({ ...validManualApplication, phone: '' }),
    'phone',
  );
  assert.equal(
    validateApplyJobApplication({ ...validManualApplication, experience: '' }),
    'experience',
  );
  assert.equal(
    validateApplyJobApplication({ ...validManualApplication, githubUrl: '' }),
    'github-url',
  );
});

test('validates manual identity, URLs, and certificate drafts', () => {
  assert.equal(validateApplyJobApplication(validManualApplication), null);
  assert.equal(
    validateApplyJobApplication({ ...validManualApplication, identityNumber: '123' }),
    'identity-number',
  );
  assert.equal(
    validateApplyJobApplication({ ...validManualApplication, githubUrl: 'not a url' }),
    'github-url',
  );
  assert.equal(
    validateApplyJobApplication({ ...validManualApplication, experience: 'four years' }),
    'experience',
  );
  assert.equal(
    validateApplyJobApplication({ ...validManualApplication, experience: '4.5' }),
    'experience',
  );
  assert.equal(
    validateApplyJobApplication(
      { ...validManualApplication, pendingCertificateTitle: 'CKA', pendingCertificateUrl: '' },
    ),
    'certificate-incomplete',
  );
});
