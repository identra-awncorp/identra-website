/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// The guided diploma demo's progress: it moves only on what really happened (the wallet saved the diploma,
// the employer's check passed, the school revoked it, the next check failed at the status step or the
// wallet refused), never on a click alone.
import assert from 'node:assert/strict';
import test from 'node:test';
import { CERTNET_CONFIG } from '../src/identra/config';
import {
  canView,
  currentPosition,
  GUIDED_RUNS,
  GUIDED_START,
  guidedCopyFor,
  guidedReducer,
  guidedRunFor,
  guidedRunSearch,
  happenedReceiveLines,
  instructionsFor,
  stepStatus,
  type GuidedEvent,
  type GuidedState,
} from '../src/identra/guidedDiplomaDemo';
import { DEMO_WALLET_PANEL_TRANSLATIONS } from '../src/translations/demo/DemoWalletPanelTranslations';
import { DIPLOMA_GUIDED_DEMO_PAGE_TRANSLATIONS } from '../src/translations/demo/DiplomaGuidedDemoPageTranslations';
import { SCHOOL_PORTAL_PAGE_TRANSLATIONS } from '../src/translations/SchoolPortalPageTranslations';

const run = (...events: GuidedEvent[]): GuidedState => events.reduce(guidedReducer, GUIDED_START);

test('starts at step 1 with nothing done', () => {
  assert.equal(currentPosition(GUIDED_START), 'receive');
  assert.equal(stepStatus(GUIDED_START, 'receive'), 'current');
  assert.equal(stepStatus(GUIDED_START, 'apply'), 'upcoming');
  assert.equal(canView(GUIDED_START, 'apply'), false);
});

test('a saved diploma completes step 1 and moves to step 2 by itself', () => {
  const state = run({ type: 'received', checked: true });
  assert.equal(currentPosition(state), 'apply');
  assert.equal(state.viewing, 'apply');
  assert.equal(stepStatus(state, 'receive'), 'done');
});

test('nothing before the diploma is received counts as a check', () => {
  const state = run({ type: 'verified', ok: true, reason: null }, { type: 'revoked' }, { type: 'walletRefused', status: 'revoked' });
  assert.deepEqual(state, GUIDED_START);
});

test('a failed check in step 2 keeps the visitor at step 2; a passing one completes it without leaving the result', () => {
  const failed = run({ type: 'received', checked: true }, { type: 'verified', ok: false, reason: 'STATUS_UNAVAILABLE' });
  assert.equal(currentPosition(failed), 'apply');
  const passed = guidedReducer(failed, { type: 'verified', ok: true, reason: null });
  assert.equal(currentPosition(passed), 'revoke');
  assert.equal(passed.viewing, 'apply', 'the result stays on screen until the visitor moves on');
  assert.equal(guidedReducer(passed, { type: 'view', position: 'revoke' }).viewing, 'revoke');
});

test('revocation is accepted only after a successful application', () => {
  assert.equal(run({ type: 'received', checked: true }, { type: 'revoked' }).revoked, false);
  assert.equal(run({ type: 'received', checked: true }, { type: 'verified', ok: true, reason: null }, { type: 'revoked' }).revoked, true);
});

const applied: GuidedEvent[] = [{ type: 'received', checked: true }, { type: 'verified', ok: true, reason: null }];

test('after the revocation, a check failing at REVOKED ends the run (refused by the employer)', () => {
  const state = run(...applied, { type: 'revoked' }, { type: 'verified', ok: false, reason: 'REVOKED' });
  assert.equal(state.refusedBy, 'employer');
  assert.equal(currentPosition(state), 'done');
  assert.equal(state.viewing, 'done');
  assert.equal(stepStatus(state, 'revoke'), 'done');
});

test('after the revocation, another failure or a pass does not end the run', () => {
  const other = run(...applied, { type: 'revoked' }, { type: 'verified', ok: false, reason: 'STATUS_UNAVAILABLE' });
  assert.equal(currentPosition(other), 'revoke');
  assert.equal(other.lastFailure, 'STATUS_UNAVAILABLE');
  const passed = guidedReducer(other, { type: 'verified', ok: true, reason: null });
  assert.equal(currentPosition(passed), 'revoke');
  assert.equal(passed.lastFailure, null);
});

test('a check before the revocation is confirmed does not count as step 3', () => {
  const state = run(...applied, { type: 'verified', ok: false, reason: 'REVOKED' });
  assert.equal(currentPosition(state), 'revoke');
  assert.equal(state.refusedBy, null);
});

test('the wallet refusing a revoked diploma also ends the run, only after the revocation', () => {
  assert.equal(run(...applied, { type: 'walletRefused', status: 'revoked' }).refusedBy, null);
  const state = run(...applied, { type: 'revoked' }, { type: 'walletRefused', status: 'revoked' });
  assert.equal(state.refusedBy, 'wallet');
  assert.equal(state.walletStatus, 'revoked', 'the sentence follows the status the wallet knew');
  assert.equal(currentPosition(state), 'done');
});

test('steps not reached yet cannot be opened; done steps can', () => {
  const state = run({ type: 'received', checked: true });
  assert.equal(guidedReducer(state, { type: 'view', position: 'revoke' }).viewing, 'apply');
  assert.equal(guidedReducer(state, { type: 'view', position: 'receive' }).viewing, 'receive');
});

test('a notice (reload, lost session) keeps the facts; restart clears everything', () => {
  const state = run(...applied, { type: 'notice', notice: 'sessionLost' });
  assert.equal(state.notice, 'sessionLost');
  assert.equal(state.applied, true);
  assert.deepEqual(guidedReducer(state, { type: 'restart' }), GUIDED_START);
});

test('a failed employer result is never a pass: not in step 2, not after the revocation', () => {
  for (const reason of ['REVOKED', 'SIGNATURE_INVALID', 'ISSUER_NOT_TRUSTED', 'QUERY_NOT_SATISFIED', 'UNKNOWN', null] as const) {
    const step2 = run({ type: 'received', checked: true }, { type: 'verified', ok: false, reason });
    assert.equal(step2.applied, false, `step 2 with ${reason}`);
    assert.equal(currentPosition(step2), 'apply');
  }
  const afterRevoke = run(...applied, { type: 'revoked' }, { type: 'verified', ok: false, reason: 'SIGNATURE_INVALID' });
  assert.equal(afterRevoke.refusedBy, null, 'only a failure AT the revocation ends step 3');
});

// ---- The CertNet run (?truong=certnet), only in a build with CertNet ---------------------------------

test('without CertNet in the build the run parameter is ignored: always the first school, as before', () => {
  assert.equal(CERTNET_CONFIG, null, 'tests run as a build without CertNet');
  for (const search of ['', '?truong=certnet', '?truong=CERTNET', '?truong=x509']) {
    assert.equal(guidedRunFor(new URLSearchParams(search), CERTNET_CONFIG !== null), 'x509');
  }
  assert.deepEqual(GUIDED_RUNS.x509, { issuer: 'truong-mau', account: 'sv001' });
});

test('with CertNet in the build, ?truong=certnet runs the demo as the CertNet school\'s sample student', () => {
  assert.equal(guidedRunFor(new URLSearchParams('?truong=certnet'), true), 'certnet');
  assert.equal(guidedRunFor(new URLSearchParams(''), true), 'x509');
  assert.equal(guidedRunFor(new URLSearchParams('?truong=other'), true), 'x509');
  assert.deepEqual(GUIDED_RUNS.certnet, { issuer: 'truong-mau-certnet', account: 'cn-sv001' });
  assert.equal(guidedRunSearch('certnet'), '?truong=certnet');
  assert.equal(guidedRunSearch('x509'), '');
});

for (const locale of ['vi', 'en'] as const) {
  const copy = DIPLOMA_GUIDED_DEMO_PAGE_TRANSLATIONS[locale];

  test(`${locale}: the default run's copy is exactly today's`, () => {
    assert.equal(guidedCopyFor(copy, 'x509'), copy);
  });

  test(`${locale}: the CertNet run says the school is found through CertNet and shown by identifier, never the list or the certificate`, () => {
    const certnet = guidedCopyFor(copy, 'certnet');
    const listOrCertificate = locale === 'vi'
      ? /trường có trong danh sách|danh sách tổ chức được công nhận|Mọi chữ ký/
      : /university is on the recognised list|list of recognised organisations|Every signature/;
    const school = [...certnet.happenedReceive, certnet.contactChecks, certnet.endRootTitle, certnet.endRootBody, ...certnet.steps.receive.instructions, copy.certnetRun.registry];
    for (const line of school) assert.ok(!listOrCertificate.test(line), `${locale}: ${line}`);
    assert.ok(certnet.happenedReceive.some((line) => line.includes('CertNet')));
    assert.ok(certnet.happenedReceive.some((line) => (locale === 'vi' ? /mã định danh, không có tên/ : /identifier, without a name/).test(line)));
    assert.ok(certnet.contactChecks.includes('CertNet') && certnet.endRootBody.includes('CertNet'));
    assert.equal(certnet.steps.receive.instructions.length, copy.steps.receive.instructions.length);
    // Everything else is the default run's copy.
    assert.equal(certnet.steps.apply, copy.steps.apply);
    assert.equal(certnet.happenedRevoke, copy.happenedRevoke);
    assert.equal(certnet.title, copy.title);
  });

  test(`${locale}: the run switch and the CertNet run are filled, without protocol words or claims`, () => {
    const texts = [...Object.values(copy.runSwitch), ...copy.certnetRun.receiveInstructions, copy.certnetRun.registry,
      ...copy.certnetRun.happenedReceive, copy.certnetRun.contactChecks, copy.certnetRun.endRootTitle, copy.certnetRun.endRootBody,
      copy.signInProblems.unusable, copy.signInProblems.school_not_here];
    for (const text of texts) {
      assert.ok(text.trim().length > 0);
      assert.ok(!/\bDID\b/.test(text) && !/resolver|did:certnet|X\.509|trust list|production|mainnet|đã vận hành|chính thức/i.test(text), `${locale}: ${text}`);
    }
    if (locale === 'vi') for (const text of texts) assert.match(text, /[ăâđêôơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹà-ỹ]/i);
  });
}

// ---- Saying no more than was checked --------------------------------------------------------------

test('"what just happened" after the receipt follows the wallet\'s result: "valid" only for a checked receipt, on both runs', () => {
  for (const locale of ['vi', 'en'] as const) {
    for (const runName of ['x509', 'certnet'] as const) {
      const copy = guidedCopyFor(DIPLOMA_GUIDED_DEMO_PAGE_TRANSLATIONS[locale], runName);
      const checked = happenedReceiveLines(copy, run({ type: 'received', checked: true }));
      const unchecked = happenedReceiveLines(copy, run({ type: 'received', checked: false }));
      assert.equal(checked, copy.happenedReceive, `${locale}/${runName}`);
      assert.equal(unchecked, copy.happenedReceiveUnchecked, `${locale}/${runName}`);
      // The checked lines claim recognition and validity; none of the "not checked yet" lines does.
      const claim = locale === 'vi' ? /bằng còn hiệu lực\.|công nhận trường được cấp|trường có trong danh sách được công nhận/ : /the diploma is valid\.|recognises it for this kind|on the recognised list/;
      assert.ok(checked.some((line) => claim.test(line)), `${locale}/${runName}: the checked lines say it`);
      for (const line of unchecked) assert.ok(!claim.test(line), `${locale}/${runName}: "${line}"`);
      assert.ok(unchecked.some((line) => (locale === 'vi' ? /chưa kiểm xong/ : /not fully checked/).test(line)), `${locale}/${runName}: says it is not checked yet`);
    }
  }
});

test('the school side says only what the school knows: the diploma was sent to the wallet, not that the wallet saved it', () => {
  for (const locale of ['vi', 'en'] as const) {
    const { issuedTitle, issuedBody } = SCHOOL_PORTAL_PAGE_TRANSLATIONS[locale];
    assert.equal(issuedTitle, locale === 'vi' ? 'Đã gửi bằng tới ví' : 'Sent to your wallet');
    assert.ok(!/cấp vào ví|đã nằm trong ví|is now in your/i.test(issuedTitle + issuedBody), `${locale}: no claim the wallet holds it`);
  }
});

test('while the employer holds a share it could not check yet, the instructions say "Send again", as the wallet does', () => {
  for (const locale of ['vi', 'en'] as const) {
    for (const run of ['x509', 'certnet'] as const) {
      const copy = guidedCopyFor(DIPLOMA_GUIDED_DEMO_PAGE_TRANSLATIONS[locale], run);
      const wallet = DEMO_WALLET_PANEL_TRANSLATIONS[locale];
      for (const step of ['apply', 'revoke'] as const) {
        const held = instructionsFor(copy, step, 'qr-1', 'qr-1').join(' ');
        assert.ok(held.includes(`“${wallet.shareAgain}”`) && held.includes(`“${wallet.stop}”`), `${locale}/${step}: names the wallet's buttons`);
        assert.ok(!held.includes(`“${wallet.share}”`), `${locale}/${step}: not "${wallet.share}"`);
        assert.ok(held.includes(`“${copy.openRequestInWallet}”`), `${locale}/${step}: says what the page's own button does now`);
        assert.equal(instructionsFor(copy, step, 'qr-2', 'qr-1'), copy.steps[step].instructions, 'a new request: the usual instructions');
        assert.equal(instructionsFor(copy, step, null, 'qr-1'), copy.steps[step].instructions, 'not waiting: the usual instructions');
      }
      assert.ok(copy.requestDeliveredInWallet.includes(`“${wallet.shareAgain}”`) && !copy.requestDeliveredInWallet.includes(`“${wallet.share}”`), locale);
    }
  }
});
