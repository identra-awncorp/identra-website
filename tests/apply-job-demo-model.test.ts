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
  experience: '4 years',
  githubUrl: 'github.com/annguyen',
};

test('uses one deterministic snapshot for all verification stages', () => {
  const plan = getApplyJobVerificationPlan('identra', true);
  const snapshot = getApplyJobVerificationSnapshot(plan, 3, 'running');

  assert.equal(snapshot.progressPercent, 33);
  assert.equal(snapshot.activeDetailId, 'identraCredentialPresentation');
  assert.deepEqual(snapshot.stages.map((stage) => stage.status), ['done', 'active', 'pending']);
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

  assert.ok(identraPlan[1].detailIds.every((detailId) => detailId.startsWith('identra')));
  assert.ok(manualPlan[1].detailIds.every((detailId) => detailId.startsWith('manual')));
});

test('does not claim cryptographic verification for self-declared GitHub data', () => {
  assert.equal(getApplyJobFieldProvenance('identra', 'github'), 'self-declared');
  assert.equal(getApplyJobFieldProvenance('identra', 'degree'), 'education-vc');
  assert.equal(getApplyJobVerificationOutcome('identra'), 'verified');
  assert.equal(getApplyJobVerificationOutcome('manual'), 'needs-review');
});

test('validates manual identity, URLs, and certificate drafts', () => {
  assert.equal(validateApplyJobApplication(validManualApplication, 'manual'), null);
  assert.equal(
    validateApplyJobApplication({ ...validManualApplication, identityNumber: '123' }, 'manual'),
    'identity-number',
  );
  assert.equal(
    validateApplyJobApplication({ ...validManualApplication, githubUrl: 'not a url' }, 'manual'),
    'github-url',
  );
  assert.equal(
    validateApplyJobApplication(
      { ...validManualApplication, pendingCertificateTitle: 'CKA', pendingCertificateUrl: '' },
      'manual',
    ),
    'certificate-incomplete',
  );
});
