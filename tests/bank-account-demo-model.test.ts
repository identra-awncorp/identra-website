/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import {
  getBankAccountAmlOutcome,
  getBankAccountFieldProvenance,
  getBankAccountOnboardingMethodChangeResetScope,
  getBankAccountTypeChangeResetScope,
  getBankAccountVerificationPlan,
  getBankAccountVerificationSnapshot,
  isBankAccountBusinessOwnershipMatched,
  validateBankAccountApplication,
  type BankAccountApplicationInput,
} from '../src/components/demo/BankAccountDemoModel';

const validBusinessApplication: BankAccountApplicationInput = {
  name: 'Nguyen Van An',
  identityNumber: '012398765432',
  email: 'an.nguyen@example.com',
  phone: '0988123456',
  address: '123 Nguyen Hue, Ho Chi Minh City',
  businessLegalName: 'Aero Logistics LLC',
  businessRegistrationNumber: '0312345678',
  businessOwnerIdentityNumber: '012398765432',
  businessLicenseFileName: 'business-license.png',
  isCryptographicallySecured: false,
};

test('uses the applicable identity plan for personal accounts', () => {
  const manualPlan = getBankAccountVerificationPlan('checking', 'manual');
  const identraPlan = getBankAccountVerificationPlan('savings', 'identra');

  assert.equal(manualPlan.stages.length, 1);
  assert.deepEqual(manualPlan.stages[0].detailIds, [
    'manualIdentityRegistryLookup',
    'manualIdentityMatch',
  ]);
  assert.equal(identraPlan.stages.length, 1);
  assert.deepEqual(identraPlan.stages[0].detailIds, [
    'identraIdentityDidLookup',
    'identraIdentityDidResolution',
    'identraIdentityProofValidation',
  ]);
});

test('keeps manual and Identra business verification plans separate', () => {
  const manualPlan = getBankAccountVerificationPlan('business', 'manual');
  const identraPlan = getBankAccountVerificationPlan('business', 'identra');

  assert.deepEqual(manualPlan.stages.map((stage) => stage.id), [
    'identity',
    'business-registration',
    'business-ownership',
  ]);
  assert.equal(manualPlan.stages.length, identraPlan.stages.length);
  assert.notDeepEqual(manualPlan.stages[0].detailIds, identraPlan.stages[0].detailIds);
  assert.notDeepEqual(manualPlan.stages[1].detailIds, identraPlan.stages[1].detailIds);
});

test('derives one deterministic snapshot for both progress panels', () => {
  const plan = getBankAccountVerificationPlan('business', 'identra');
  const snapshot = getBankAccountVerificationSnapshot(plan, 3, 'running');

  assert.equal(snapshot.progressPercent, 33);
  assert.equal(snapshot.activeDetailId, 'identraBusinessCredentialFetch');
  assert.equal(snapshot.stages[0].status, 'done');
  assert.equal(snapshot.stages[1].status, 'active');
  assert.equal(snapshot.stages[2].status, 'pending');

  const completeSnapshot = getBankAccountVerificationSnapshot(
    plan,
    snapshot.totalDetailCount,
    'complete',
  );
  assert.equal(completeSnapshot.progressPercent, 100);
  assert.equal(completeSnapshot.activeDetailId, null);
  assert.ok(completeSnapshot.stages.every((stage) => stage.status === 'done'));
});

test('enforces business ownership and license rules for manual applications', () => {
  assert.equal(
    validateBankAccountApplication(validBusinessApplication, 'business', 'manual'),
    null,
  );
  assert.equal(
    validateBankAccountApplication(
      { ...validBusinessApplication, businessOwnerIdentityNumber: '000000000000' },
      'business',
      'manual',
    ),
    'business-ownership-mismatch',
  );
  assert.equal(
    validateBankAccountApplication(
      { ...validBusinessApplication, businessLicenseFileName: '' },
      'business',
      'manual',
    ),
    'business-license',
  );
  assert.equal(
    isBankAccountBusinessOwnershipMatched(
      'business',
      validBusinessApplication.identityNumber,
      validBusinessApplication.businessRegistrationNumber,
      validBusinessApplication.businessOwnerIdentityNumber,
    ),
    true,
  );
});

test('does not require a business license image in the Identra flow', () => {
  const identraApplication = {
    ...validBusinessApplication,
    businessLicenseFileName: '',
    isCryptographicallySecured: true,
  };

  assert.equal(
    validateBankAccountApplication(identraApplication, 'business', 'identra'),
    null,
  );
  assert.equal(
    validateBankAccountApplication(
      { ...identraApplication, isCryptographicallySecured: false },
      'business',
      'identra',
    ),
    'identra-scan-required',
  );
  assert.equal(getBankAccountFieldProvenance('identra', 'business-license'), 'not-required');
  assert.equal(
    getBankAccountFieldProvenance('identra', 'business-registration-number'),
    'business-registration-vc',
  );
});

test('centralizes reset rules when account type or onboarding method changes', () => {
  assert.equal(
    getBankAccountTypeChangeResetScope('checking', 'business', 'identra'),
    'all-fields',
  );
  assert.equal(
    getBankAccountTypeChangeResetScope('business', 'checking', 'manual'),
    'business-fields',
  );
  assert.equal(
    getBankAccountTypeChangeResetScope('checking', 'business', 'manual'),
    'none',
  );
  assert.equal(
    getBankAccountOnboardingMethodChangeResetScope('manual', 'identra'),
    'all-fields',
  );
  assert.equal(
    getBankAccountOnboardingMethodChangeResetScope('manual', 'manual'),
    'none',
  );
});

test('keeps the simulated AML outcome deterministic', () => {
  assert.equal(getBankAccountAmlOutcome('0968 268 030'), 'failed');
  assert.equal(getBankAccountAmlOutcome('0988 123 456'), 'passed');
});
