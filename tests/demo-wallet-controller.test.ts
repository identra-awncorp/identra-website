/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// The web trial wallet's behaviour (createWalletController) with a scripted SDK wallet: hand-offs refused
// while an accept or a share runs (the race the security review found), outcomes reported even when they
// arrive late, and the consent rules: the option chosen is the claim set sent, nothing is preselected, no
// sharing with (and no name or purpose for) an untrusted verifier, a known-revoked diploma is never sent.
import assert from 'node:assert/strict';
import test from 'node:test';
import type { AcceptResult, CredentialDetails, CredentialSummary, ResolvedOffer, ResolvedPresentation } from '@identra/sdk-app';
import {
  consentView,
  createWalletController,
  type WalletControllerEvent,
  type WalletLike,
} from '../src/identra/demoWalletModel';

const VCT = 'https://identra.awncorp.vn/vct/bang-tot-nghiep/v1';
const CLAIMS = { ho_ten: 'Nguyễn Văn A', ngay_sinh: '2003-01-02', ma_sinh_vien: 'SV001', nganh: 'CNTT', hang_tot_nghiep: 'Giỏi', nam_tot_nghiep: '2026', so_hieu_bang: 'B-1' };

const deferred = <T,>() => {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((r) => { resolve = r; });
  return { promise, resolve };
};
const tick = () => new Promise((r) => setTimeout(r, 0));

const offer = { issuerUri: 'https://api-identra.awncorp.vn/issuers/truong-mau', issuerOrigin: 'https://api-identra.awncorp.vn', issuerDisplay: [], configuration: { id: 'x', vct: VCT, display: [] }, txCode: { length: 6, inputMode: 'numeric', description: null }, codeRedeemed: false } as unknown as ResolvedOffer;

const match = {
  credentialId: 'c1',
  vct: VCT,
  issuerName: 'Trường Đại học Mẫu (DEMO)',
  trustPath: 'x509' as const,
  issuerDid: null,
  claimSets: [{ index: 0, claims: ['ho_ten', 'nganh', 'hang_tot_nghiep', 'nam_tot_nghiep'] }, { index: 1, claims: ['ho_ten', 'nganh'] }],
};
const trustedRequest = (matches = [match]) => ({
  clientId: 'x509_hash:abc',
  verifier: { trusted: true, ten: 'Nhà tuyển dụng Mẫu (DEMO)', maToChuc: 'VATVN-0100000005' },
  purpose: { vi: 'Ứng tuyển kỹ sư phần mềm', en: 'Software engineer application' },
  matches,
  expiresAt: '2030-01-01T00:00:00Z',
}) as ResolvedPresentation;
const untrustedRequest = { clientId: 'x509_hash:zzz', verifier: { trusted: false }, warning: 'VERIFIER_NOT_TRUSTED', purpose: 'Trust me', matches: [match], expiresAt: '2030-01-01T00:00:00Z' } as unknown as ResolvedPresentation;

const summary = (status: CredentialSummary['status']): CredentialSummary =>
  ({ id: 'c1', vct: VCT, issuerUri: offer.issuerUri, trustPath: 'x509', issuerDid: null, status, statusCheckedAt: null, createdAt: '2026-11-19T00:00:00Z' });
const details = (status: CredentialSummary['status']): CredentialDetails => ({ ...summary(status), issuerName: 'Trường Đại học Mẫu (DEMO)', iat: 1, claims: CLAIMS });

/** A scripted SDK wallet: `accept` and `submit` wait for the test to answer them. */
const fakeWallet = (options: { status?: CredentialSummary['status']; request?: ResolvedPresentation } = {}) => {
  let stored = false;
  const calls = { accept: 0, submit: [] as number[], decline: 0, resolveOffer: 0 };
  const acceptAnswer = deferred<AcceptResult>();
  const submitAnswer = deferred<{ ok: true } | { ok: false; code: 'NETWORK_ERROR' | 'DID_RESOLUTION_UNAVAILABLE' }>();
  const wallet = {
    offers: {
      resolve: async () => { calls.resolveOffer += 1; return { ok: true as const, offer }; },
      accept: async () => {
        calls.accept += 1;
        const result = await acceptAnswer.promise;
        if (result.ok) stored = true;
        return result;
      },
      discard: async () => undefined,
    },
    credentials: {
      list: async () => (stored || options.status ? [summary(options.status ?? 'valid')] : []),
      get: async () => ({ ok: true as const, credential: details(options.status ?? 'valid') }),
      refreshStatus: async () => ({ ok: true as const, status: 'valid' as const, checks: [], checkedAt: '', lastValidAt: null }),
      remove: async () => ({ ok: true as const }),
    },
    presentations: {
      resolve: async () => ({ ok: true as const, request: options.request ?? trustedRequest() }),
      submit: async (_request: ResolvedPresentation, choice: { claimSetIndex: number }) => {
        calls.submit.push(choice.claimSetIndex);
        return submitAnswer.promise;
      },
      decline: () => { calls.decline += 1; return { ok: true as const }; },
    },
  } as unknown as WalletLike;
  return { wallet, calls, acceptAnswer, submitAnswer };
};

const setup = (options?: Parameters<typeof fakeWallet>[0]) => {
  const fake = fakeWallet(options);
  const events: WalletControllerEvent[] = [];
  const controller = createWalletController(fake.wallet, (event) => events.push(event), () => 'vi');
  return { ...fake, events, controller };
};

const offerItem = { id: 1, kind: 'offer' as const, text: 'openid-credential-offer://?credential_offer_uri=x' };
const requestItem = { id: 2, kind: 'request' as const, text: 'openid4vp://?client_id=x' };

test('race: a hand-off while Accept runs is refused; the finished Accept is still reported and listed', async () => {
  const { controller, events, calls, acceptAnswer } = setup();
  assert.equal(controller.open(offerItem), true);
  await tick();
  assert.equal(controller.getState().screen.name, 'offerConsent');

  const accepting = controller.accept('123456');
  assert.equal(controller.getState().busy, true, 'the page sees the wallet as busy and disables its buttons');
  // The visitor presses "Put the code into the wallet again" during the accept (the reviewer's sequence).
  assert.equal(controller.open({ ...offerItem, id: 3 }), false, 'refused while the accept is in flight');
  assert.equal(calls.resolveOffer, 1, 'the offer was not resolved a second time');

  acceptAnswer.resolve({ ok: true, credentialId: 'c1', vct: VCT, issuerName: 'Trường Đại học Mẫu (DEMO)', status: 'valid' });
  await accepting;
  assert.deepEqual(events, [{ type: 'credentialReceived', credentialId: 'c1', checked: true }]);
  const state = controller.getState();
  assert.equal(state.screen.name, 'offerSaved');
  assert.equal(state.screen.name === 'offerSaved' && state.screen.issuerName, 'Trường Đại học Mẫu (DEMO)', 'the trust-list name, after the check');
  assert.equal(state.held.length, 1, 'the stored credential is listed');
  assert.equal(state.busy, false);
  assert.equal(controller.open({ ...offerItem, id: 4 }), true, 'hand-offs work again afterwards');
});

test('race: a hand-off while Share runs is refused; the sent answer is still reported', async () => {
  const { controller, events, submitAnswer } = setup({ status: 'valid' });
  controller.open(requestItem);
  await tick();
  controller.choose(1);
  const sharing = controller.share();
  assert.equal(controller.getState().busy, true);
  assert.equal(controller.open({ ...requestItem, id: 5 }), false);
  submitAnswer.resolve({ ok: true });
  await sharing;
  assert.deepEqual(events, [{ type: 'presentationSent', itemId: 2 }]);
  assert.equal(controller.getState().screen.name, 'requestSent');
});

test('a PIN shorter than asked sends nothing', async () => {
  const { controller, calls } = setup();
  controller.open(offerItem);
  await tick();
  assert.equal(await controller.accept('123'), 'pinIncomplete');
  assert.equal(calls.accept, 0);
});

test('consent: nothing preselected; Share sends exactly the claim set of the option chosen', async () => {
  const { controller, calls, submitAnswer } = setup({ status: 'valid' });
  controller.open(requestItem);
  await tick();
  const state = controller.getState();
  assert.equal(state.screen.name === 'requestConsent' && state.screen.optionIndex, null, 'no option chosen yet');
  const before = consentView(trustedRequest(), state.held, null, 'vi');
  assert.equal(before.canShare, false, 'Share waits for a choice');
  assert.deepEqual(before.staying, ['ngay_sinh', 'ma_sinh_vien', 'so_hieu_bang'], 'what never leaves, whatever is chosen');
  await controller.share();
  assert.deepEqual(calls.submit, [], 'no share without a choice');

  controller.choose(1);
  const less = consentView(trustedRequest(), controller.getState().held, 1, 'vi');
  assert.deepEqual(less.selected?.fields, ['ho_ten', 'nganh']);
  assert.deepEqual(less.staying, ['ngay_sinh', 'ma_sinh_vien', 'hang_tot_nghiep', 'nam_tot_nghiep', 'so_hieu_bang']);
  const sharing = controller.share();
  submitAnswer.resolve({ ok: true });
  await sharing;
  assert.deepEqual(calls.submit, [1], '"share less" sends the smaller claim set (index 1)');
  const sent = controller.getState().screen;
  assert.deepEqual(sent.name === 'requestSent' && sent.fields, ['ho_ten', 'nganh']);
});

test('a verifier that could not check now: the request stays open with the same choice and can be sent again', async () => {
  const { controller, calls, events, submitAnswer } = setup({ status: 'valid' });
  controller.open(requestItem);
  await tick();
  controller.choose(1);
  submitAnswer.resolve({ ok: false, code: 'DID_RESOLUTION_UNAVAILABLE' });
  await controller.share();
  const waiting = controller.getState().screen;
  assert.equal(waiting.name, 'requestConsent');
  assert.equal(waiting.name === 'requestConsent' && waiting.problem, 'verifierCouldNotCheck');
  assert.equal(waiting.name === 'requestConsent' && waiting.optionIndex, 1, 'nothing to choose again');
  assert.deepEqual(events, [], 'nothing was sent as far as the page is concerned');
  await controller.share();
  assert.deepEqual(calls.submit, [1, 1], 'the same choice goes again');
});

test('after "could not check right now" the screen is locked: the same share goes again, another option cannot be picked, the SDK\'s ends are said truthfully, nothing loops', async () => {
  type Answer = Awaited<ReturnType<WalletLike['presentations']['submit']>>;
  const script = (answers: Answer[]) => {
    const fake = fakeWallet({ status: 'valid' });
    const sent: { credentialId: string; claimSetIndex: number }[] = [];
    (fake.wallet.presentations as { submit: unknown }).submit = async (_request: ResolvedPresentation, choice: { credentialId: string; claimSetIndex: number }) => {
      sent.push(choice);
      return answers.shift()!;
    };
    const events: WalletControllerEvent[] = [];
    return { controller: createWalletController(fake.wallet, (event) => events.push(event), () => 'vi'), sent, events, calls: fake.calls };
  };
  const delivered = { ok: false, code: 'DID_RESOLUTION_UNAVAILABLE', delivered: true } as Answer;

  // Three sends at most: the third 503 is VERIFIER_ERROR, and the request is used up.
  const { controller, sent, events } = script([delivered, delivered, { ok: false, code: 'VERIFIER_ERROR' }]);
  controller.open(requestItem);
  await tick();
  controller.choose(1);
  await controller.share();
  const locked = controller.getState().screen;
  assert.equal(locked.name === 'requestConsent' && locked.problem, 'verifierCouldNotCheck');
  assert.deepEqual(locked.name === 'requestConsent' && locked.delivered, { credentialId: 'c1', claimSetIndex: 1, fields: ['ho_ten', 'nganh'] });
  controller.choose(0);
  assert.equal(controller.getState().screen, locked, 'no other option once a share reached the verifier');
  await controller.share();
  await controller.share();
  assert.deepEqual(sent, [{ credentialId: 'c1', claimSetIndex: 1 }, { credentialId: 'c1', claimSetIndex: 1 }, { credentialId: 'c1', claimSetIndex: 1 }], 'exactly the share first sent');
  assert.deepEqual(controller.getState().screen, { name: 'requestFailed', problem: 'requestUsedUp', delivered: ['ho_ten', 'nganh'] });
  await controller.share();
  assert.equal(sent.length, 3, 'nothing more is sent: no loop');
  assert.deepEqual(events, [], 'nothing was concluded');

  // The SDK forgot the request (REQUEST_INVALID): used up as well.
  const invalid = script([delivered, { ok: false, code: 'REQUEST_INVALID' }]);
  invalid.controller.open(requestItem);
  await tick();
  invalid.controller.choose(1);
  await invalid.controller.share();
  await invalid.controller.share();
  assert.deepEqual(invalid.controller.getState().screen, { name: 'requestFailed', problem: 'requestUsedUp', delivered: ['ho_ten', 'nganh'] });

  // Stop: the request is forgotten, and the page is not told "declined" (that would read "nothing was sent").
  const stop = script([delivered]);
  stop.controller.open(requestItem);
  await tick();
  stop.controller.choose(1);
  await stop.controller.share();
  stop.controller.decline();
  assert.equal(stop.calls.decline, 1);
  assert.deepEqual(stop.controller.getState().screen, { name: 'requestDeclined', delivered: ['ho_ten', 'nganh'] });
  assert.deepEqual(stop.events, []);
});

test('consent: an untrusted verifier gets no name, no purpose, and no Share', async () => {
  const view = consentView(untrustedRequest, [{ summary: summary('valid'), details: details('valid') }], 0, 'vi');
  assert.equal(view.trusted, false);
  assert.equal(view.verifierName, null);
  assert.equal(view.purpose, null, 'what an unknown party says about itself is not shown');
  assert.equal(view.canShare, false);

  const { controller, calls } = setup({ status: 'valid', request: untrustedRequest });
  controller.open(requestItem);
  await tick();
  controller.choose(0);
  await controller.share();
  assert.deepEqual(calls.submit, [], 'nothing submitted to an untrusted verifier');
});

test('consent: a diploma the wallet knows is revoked is never sent, and the page is told why', async () => {
  const { controller, calls, events } = setup({ status: 'revoked' });
  controller.open(requestItem);
  await tick();
  const view = consentView(trustedRequest(), controller.getState().held, 0, 'vi');
  assert.equal(view.blocked, 'revoked');
  assert.equal(view.canShare, false);
  controller.choose(0);
  await controller.share();
  assert.deepEqual(calls.submit, []);
  assert.deepEqual(events, [{ type: 'presentationBlocked', itemId: 2, status: 'revoked' }]);
});

test('decline: nothing sent, the page is told which request was declined', async () => {
  const { controller, calls, events } = setup({ status: 'valid' });
  controller.open(requestItem);
  await tick();
  controller.decline();
  assert.equal(calls.decline, 1);
  assert.deepEqual(calls.submit, []);
  assert.deepEqual(events, [{ type: 'presentationDeclined', itemId: 2 }]);
  assert.equal(controller.getState().screen.name, 'requestDeclined');
});

// ---- The CertNet path (ADR-0020) -------------------------------------------------------------------

const DID = 'did:certnet:testnet:7Hk2XaQ9mLp3Rt8vWz4bNc6dEf';
type RefreshAnswer = Awaited<ReturnType<WalletLike['credentials']['refreshStatus']>>;

/** A wallet holding one CertNet document; each refreshStatus takes the next scripted answer. */
const certnetWallet = (answers: RefreshAnswer[], acceptAnswers: AcceptResult[] = []) => {
  const didSummary = (status: CredentialSummary['status']): CredentialSummary =>
    ({ ...summary(status), trustPath: 'did', issuerDid: DID });
  let status: CredentialSummary['status'] = 'valid';
  const calls = { accept: [] as { txCode?: string }[] };
  const redeemed = { ...offer, codeRedeemed: false };
  const wallet = {
    offers: {
      resolve: async () => ({ ok: true as const, offer: redeemed }),
      accept: async (_offer: ResolvedOffer, options: { txCode?: string }) => {
        calls.accept.push(options);
        const result = acceptAnswers.shift()!;
        // After the PIN was accepted once the SDK reports the code as redeemed.
        Object.defineProperty(redeemed, 'codeRedeemed', { value: true });
        return result;
      },
      discard: async () => undefined,
    },
    credentials: {
      list: async () => [didSummary(status)],
      get: async () => ({ ok: true as const, credential: { ...didSummary(status), issuerName: null, iat: 1, claims: CLAIMS } }),
      refreshStatus: async () => {
        const answer = answers.shift()!;
        if (answer.ok) status = answer.status;
        return answer;
      },
      remove: async () => ({ ok: true as const }),
    },
    presentations: { resolve: async () => ({ ok: false as const, code: 'REQUEST_INVALID' as const }), submit: async () => ({ ok: true as const }), decline: () => ({ ok: true as const }) },
  } as unknown as WalletLike;
  return { wallet, calls };
};
const answer = (status: 'valid' | 'unknown' | 'invalid', failing?: { id: string; code: string }): RefreshAnswer =>
  ({ ok: true, status, checks: failing ? [{ id: failing.id, ok: false, code: failing.code }] : [], checkedAt: '', lastValidAt: null }) as unknown as RefreshAnswer;

test('re-check of a CertNet document: CertNet silent, then the issuer no longer recognised, then fine again', async () => {
  const { wallet } = certnetWallet([
    answer('unknown', { id: 'did_resolution', code: 'DID_RESOLUTION_UNAVAILABLE' }),
    answer('invalid', { id: 'issuer_trust', code: 'ISSUER_NOT_TRUSTED' }),
    answer('valid'),
  ]);
  const controller = createWalletController(wallet, () => undefined, () => 'vi');
  await controller.refresh();

  await controller.checkAgain('c1');
  assert.deepEqual(controller.getState().notes, { c1: 'certnetUnavailable' });
  assert.deepEqual(controller.getState().checking, { id: 'c1', failed: true }, 'not settled: never shown as valid');
  assert.equal(controller.getState().held[0]!.summary.status, 'unknown', 'the status shown is the SDK\'s: not checked, never valid');

  await controller.checkAgain('c1');
  assert.deepEqual(controller.getState().notes, { c1: 'issuerNotRecognised' });
  assert.equal(controller.getState().held[0]!.summary.status, 'invalid');

  await controller.checkAgain('c1');
  assert.deepEqual(controller.getState().notes, {});
  assert.equal(controller.getState().held[0]!.summary.status, 'valid');
});

test('an X.509 document gets no CertNet note, whatever its trust list says', async () => {
  const fake = fakeWallet({ status: 'valid' });
  (fake.wallet.credentials as { refreshStatus: unknown }).refreshStatus = async () => answer('unknown', { id: 'issuer_trust', code: 'TRUST_LIST_UNAVAILABLE' });
  const controller = createWalletController(fake.wallet, () => undefined, () => 'vi');
  await controller.refresh();
  await controller.checkAgain('c1');
  assert.deepEqual(controller.getState().notes, {});
  assert.deepEqual(controller.getState().checking, { id: 'c1', failed: true });
});

test('receipt while CertNet is silent: nothing stored, the same offer is accepted again without the PIN', async () => {
  const silent: AcceptResult = {
    ok: false, code: 'NETWORK_ERROR', retryable: true, codeRedeemed: true,
    checks: [{ id: 'did_resolution', ok: false, code: 'DID_RESOLUTION_UNAVAILABLE' }],
  };
  const saved: AcceptResult = { ok: true, credentialId: 'c1', vct: VCT, issuerName: null, issuerDid: DID, status: 'valid' };
  const { wallet, calls } = certnetWallet([], [silent, saved]);
  const events: WalletControllerEvent[] = [];
  const controller = createWalletController(wallet, (event) => events.push(event), () => 'vi');
  controller.open(offerItem);
  await tick();

  await controller.accept('123456');
  const waiting = controller.getState().screen;
  assert.equal(waiting.name === 'offerConsent' && waiting.problem, 'certnetUnavailable');
  assert.deepEqual(events, [], 'nothing was received');

  // The PIN field is gone (the code is redeemed): accept with nothing typed, and no PIN is sent.
  assert.equal(await controller.accept(''), 'done');
  assert.deepEqual(calls.accept, [{ txCode: '123456' }, {}]);
  const done = controller.getState().screen;
  assert.deepEqual(done, { name: 'offerSaved', credentialId: 'c1', checked: true, issuerName: null, issuerDid: DID });
  assert.deepEqual(events, [{ type: 'credentialReceived', credentialId: 'c1', checked: true }]);
});

test('a refused offer: OFFER_INVALID is only "not a valid offer"; TRUST_PATH_UNSUPPORTED is "cannot be received here"', async () => {
  for (const [code, problem] of [['OFFER_INVALID', 'offerInvalid'], ['TRUST_PATH_UNSUPPORTED', 'offerNeedsCertNet']] as const) {
    const fake = fakeWallet();
    (fake.wallet.offers as { resolve: unknown }).resolve = async () => ({ ok: false, code });
    const controller = createWalletController(fake.wallet, () => undefined, () => 'vi');
    controller.open(offerItem);
    await tick();
    assert.deepEqual(controller.getState().screen, { name: 'offerFailed', problem }, code);
  }
});

test('a diploma stored as "not checked yet" is announced as such, so the page does not call it valid', async () => {
  const { controller, events, acceptAnswer } = setup();
  controller.open(offerItem);
  await tick();
  const accepting = controller.accept('123456');
  acceptAnswer.resolve({ ok: true, credentialId: 'c1', vct: VCT, issuerName: null, status: 'unknown' });
  await accepting;
  assert.deepEqual(events, [{ type: 'credentialReceived', credentialId: 'c1', checked: false }]);
});
