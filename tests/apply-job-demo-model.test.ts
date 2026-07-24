/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import {
  APPLY_JOB_IDENTRA_IDENTITY_NUMBER,
  getApplyJobFieldProvenance,
  getApplyJobVerificationOutcome,
  getApplyJobVerificationPlan,
  getApplyJobVerificationSnapshot,
  isCryptographicallyVerifiedField,
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
  const snapshot = getApplyJobVerificationSnapshot(plan, 2, 'running');

  assert.equal(snapshot.progressPercent, 25);
  assert.equal(snapshot.activeDetailId, 'identraCredentialPresentation');
  assert.deepEqual(snapshot.stages.map((stage) => stage.status), ['done', 'active', 'pending']);
});

test('creates one Identra credential check for the degree and each supplied certificate', () => {
  const plan = getApplyJobVerificationPlan('identra', 2);

  assert.deepEqual(plan[0].detailIds, [
    'identraIdentityPresentation',
    'identraIdentityProofValidation',
  ]);
  assert.deepEqual(plan[1].detailIds, [
    'identraCredentialPresentation',
    'identraCredentialProofValidation',
    'identraCredentialProofValidation',
  ]);
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

  assert.ok(identraPlan[1].detailIds.every((detailId) => detailId.startsWith('identra')));
  assert.ok(manualPlan[1].detailIds.every((detailId) => detailId.startsWith('manual')));
});

test('does not claim cryptographic verification for editable self-declared fields', () => {
  assert.equal(getApplyJobFieldProvenance('identra', 'email'), 'self-declared');
  assert.equal(getApplyJobFieldProvenance('identra', 'phone'), 'self-declared');
  assert.equal(getApplyJobFieldProvenance('identra', 'experience'), 'self-declared');
  assert.equal(getApplyJobFieldProvenance('identra', 'github'), 'self-declared');
  assert.equal(isCryptographicallyVerifiedField('identra', 'email'), false);
  assert.equal(isCryptographicallyVerifiedField('identra', 'phone'), false);
  assert.equal(isCryptographicallyVerifiedField('identra', 'experience'), false);
  assert.equal(isCryptographicallyVerifiedField('identra', 'github'), false);
  assert.equal(getApplyJobFieldProvenance('identra', 'degree'), 'education-vc');
  assert.equal(getApplyJobFieldProvenance('identra', 'certificates'), 'certificate-vc');
  assert.equal(getApplyJobFieldProvenance('identra', 'identity'), 'identity-vc');
  assert.match(APPLY_JOB_IDENTRA_IDENTITY_NUMBER, /^\d{12}$/);
  assert.equal(getApplyJobVerificationOutcome('identra'), 'verified');
  assert.equal(getApplyJobVerificationOutcome('manual'), 'needs-review');
});

test('requires valid editable fields before Identra verification starts', () => {
  assert.equal(validateApplyJobApplication(validManualApplication, 'identra'), null);
  assert.equal(
    validateApplyJobApplication({ ...validManualApplication, email: '' }, 'identra'),
    'email',
  );
  assert.equal(
    validateApplyJobApplication({ ...validManualApplication, phone: '' }, 'identra'),
    'phone',
  );
  assert.equal(
    validateApplyJobApplication({ ...validManualApplication, experience: '' }, 'identra'),
    'experience',
  );
  assert.equal(
    validateApplyJobApplication({ ...validManualApplication, githubUrl: '' }, 'identra'),
    'github-url',
  );
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
    validateApplyJobApplication({ ...validManualApplication, experience: 'four years' }, 'identra'),
    'experience',
  );
  assert.equal(
    validateApplyJobApplication({ ...validManualApplication, experience: '4.5' }, 'identra'),
    'experience',
  );
  assert.equal(
    validateApplyJobApplication(
      { ...validManualApplication, pendingCertificateTitle: 'CKA', pendingCertificateUrl: '' },
      'manual',
    ),
    'certificate-incomplete',
  );
});
