/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Every verification code has a plain-language sentence in every locale; nothing falls through to a raw code.
import assert from 'node:assert/strict';
import test from 'node:test';
import { ErrorCodes } from '@identra/sdk-core';
import {
  ALL_ERROR_CODES,
  KNOWN_CHECK_IDS,
  toCheckRows,
  type FailureReasonKey,
} from '../src/identra/verifierSession';
import { APPLY_JOB_VERIFIER_DIALOG_TRANSLATIONS } from '../src/translations/demo/ApplyJobVerifierDialogTranslations';

const LOCALES = ['vi', 'en', 'es', 'ja', 'de'] as const;
const JARGON = /SD-JWT|x5c|nonce|DCQL|KB-JWT|status list|DID\b|JWT|holder binding|disclosure/i;

test('the website knows exactly the codes the SDK exports', () => {
  assert.deepEqual([...ALL_ERROR_CODES].sort(), Object.values(ErrorCodes).sort());
});

for (const locale of LOCALES) {
  test(`${locale}: every code has its own sentence, never the code itself`, () => {
    const reasons = APPLY_JOB_VERIFIER_DIALOG_TRANSLATIONS[locale].reasons;
    const keys: FailureReasonKey[] = [...ALL_ERROR_CODES, 'UNKNOWN'];
    assert.deepEqual(Object.keys(reasons).sort(), [...keys].sort());
    for (const key of keys) {
      const sentence = reasons[key];
      assert.ok(sentence.trim().length > 10, `${locale}.${key} is empty`);
      assert.ok(!sentence.includes(key), `${locale}.${key} shows the raw code`);
      assert.ok(!/[A-Z]{2,}_[A-Z]{2,}/.test(sentence), `${locale}.${key} contains a code-like token`);
    }
  });

  test(`${locale}: check labels and failure reasons avoid technical jargon`, () => {
    const copy = APPLY_JOB_VERIFIER_DIALOG_TRANSLATIONS[locale];
    for (const text of [...Object.values(copy.reasons), ...Object.values(copy.checks)]) {
      assert.ok(!JARGON.test(text), `${locale}: "${text}"`);
    }
    for (const id of KNOWN_CHECK_IDS) assert.ok(copy.checks[id].length > 0, `${locale}: label for ${id}`);
    assert.ok(copy.checks.other.length > 0);
  });
}

test('the Vietnamese sentence for a revoked diploma is the agreed one', () => {
  assert.equal(APPLY_JOB_VERIFIER_DIALOG_TRANSLATIONS.vi.reasons.REVOKED, 'Bằng này đã bị nơi cấp thu hồi.');
});

test('check rows: passed, failed with a reason from the code, skipped, unknown ids and codes', () => {
  const rows = toCheckRows({
    ok: false,
    issuer: null,
    verifiedAt: '2026-11-19T00:00:00Z',
    checks: [
      { id: 'structure', ok: true, code: null },
      { id: 'issuer_trust', ok: true, code: null },
      { id: 'status', ok: false, code: 'REVOKED' },
      { id: 'holder_binding', ok: false, code: 'SKIPPED', skipped: true },
      // Well-formed values a newer server might send.
      { id: 'future_check' as never, ok: false, code: 'BRAND_NEW_CODE' as never },
    ],
  });
  assert.deepEqual(rows, [
    { labelKey: 'structure', outcome: 'passed', reasonKey: null },
    { labelKey: 'issuer_trust', outcome: 'passed', reasonKey: null },
    { labelKey: 'status', outcome: 'failed', reasonKey: 'REVOKED' },
    { labelKey: 'holder_binding', outcome: 'skipped', reasonKey: null },
    { labelKey: 'other', outcome: 'failed', reasonKey: 'UNKNOWN' },
  ]);
});
