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
  type HeldCredential,
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
  assert.deepEqual(events, [{ type: 'presentationDelivered', itemId: 2 }], 'received, not concluded: the page is told only that');
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
  assert.deepEqual(events, [{ type: 'presentationDelivered', itemId: 2 }, { type: 'presentationDelivered', itemId: 2 }], 'nothing was concluded');

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
  assert.deepEqual(stop.events, [{ type: 'presentationDelivered', itemId: 2 }], 'no "declined"');
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

// ---- A request a share of which reached the verifier (security re-review N1) -------------------------------
// The SDK pins such a request (verifier + request address) to what was sent, for 10 minutes, in the wallet
// instance: a later resolve returns `pinned`, submit refuses any other choice, after 3 sends resolve is
// REQUEST_INVALID, decline keeps the pin. This fake follows those rules; the controller must then never show a
// fresh choice for that request again, whatever the page and the visitor do.

const REQUEST_TEXT = 'openid4vp://?client_id=x509_hash%3Aabc&request_uri=https%3A%2F%2Fapi-identra.awncorp.vn%2Fr%2F1';
type Pin = { credentialId: string; claimSetIndex: number; sends: number };

const pinningWallet = () => {
  const pins = new Map<string, Pin>();
  const live = new Map<object, string>();
  const sent: number[] = [];
  const control = { answer: 'delivered' as 'delivered' | 'ok', pinLapsed: false };
  const keyOf = (text: string) => { const q = new URL(text).searchParams; return `${q.get('client_id')} ${q.get('request_uri')}`; };
  const fake = fakeWallet({ status: 'valid' });
  fake.wallet.presentations.resolve = async (text: string) => {
    const key = keyOf(text);
    const pin = control.pinLapsed ? undefined : pins.get(key);
    if (pin && pin.sends >= 3) return { ok: false as const, code: 'REQUEST_INVALID' as const };
    const request = { ...trustedRequest(), pinned: pin ? { ...pin } : null } as ResolvedPresentation;
    live.set(request, key);
    return { ok: true as const, request };
  };
  fake.wallet.presentations.submit = async (request: ResolvedPresentation, choice: { credentialId: string; claimSetIndex: number }) => {
    const key = live.get(request);
    if (key === undefined) return { ok: false as const, code: 'REQUEST_INVALID' as const };
    live.delete(request);
    const pin = control.pinLapsed ? undefined : pins.get(key);
    if (pin && (pin.sends >= 3 || pin.credentialId !== choice.credentialId || pin.claimSetIndex !== choice.claimSetIndex)) return { ok: false as const, code: 'REQUEST_INVALID' as const };
    sent.push(choice.claimSetIndex);
    if (pin) pin.sends += 1;
    if (control.answer === 'ok') return { ok: true as const };
    const held = pin ?? { credentialId: choice.credentialId, claimSetIndex: choice.claimSetIndex, sends: 1 };
    pins.set(key, held);
    if (held.sends >= 3) return { ok: false as const, code: 'VERIFIER_ERROR' as const };
    live.set(request, key);
    return { ok: false as const, code: 'DID_RESOLUTION_UNAVAILABLE' as const, delivered: true as const };
  };
  fake.wallet.presentations.decline = (request: ResolvedPresentation) =>
    (live.delete(request) ? { ok: true as const } : { ok: false as const, code: 'REQUEST_INVALID' as const });
  return { wallet: fake.wallet, pins, sent, control };
};
const flush = async () => { for (let i = 0; i < 4; i += 1) await new Promise((r) => setImmediate(r)); };

/** The trial wallet as the guided page drives it: the page's "open request" button, the wallet's buttons, a remount. */
const driver = () => {
  const sdk = pinningWallet();
  const events: WalletControllerEvent[] = [];
  /** Events the page got once a share had reached the verifier. */
  const afterDelivery: WalletControllerEvent[] = [];
  const onEvent = (event: WalletControllerEvent) => {
    events.push(event);
    if (sdk.pins.size > 0) afterDelivery.push(event);
  };
  let controller = createWalletController(sdk.wallet, onEvent, () => 'vi');
  let itemId = 10;
  const actions = {
    open: () => { controller.open({ id: (itemId += 1), kind: 'request', text: REQUEST_TEXT }); },
    home: () => controller.home(),
    detail: () => controller.openDetail('c1'),
    choose0: () => controller.choose(0),
    choose1: () => controller.choose(1),
    share: () => controller.share(),
    stop: () => controller.decline(),
    refresh: () => controller.refresh(),
    // The page mounting the wallet panel again (another page of the site and back, a language switch): a new controller, the same wallet.
    remount: () => { controller = createWalletController(sdk.wallet, onEvent, () => 'vi'); },
  };
  return { sdk, events, afterDelivery, actions, state: () => controller.getState() };
};
type Action = keyof ReturnType<typeof driver>['actions'];

/** After a share reached the verifier: never an ordinary choice for that request, never another claim set sent, never "declined". */
const assertLocked = (d: ReturnType<typeof driver>, trail: readonly string[]) => {
  const pin = d.sdk.pins.get(`x509_hash:abc https://api-identra.awncorp.vn/r/1`);
  if (!pin) return;
  const screen = d.state().screen;
  if (screen.name === 'requestConsent') {
    assert.ok(screen.delivered, `fresh choice after a delivered share: ${trail.join(' → ')}`);
    assert.equal(screen.delivered.claimSetIndex, pin.claimSetIndex, trail.join(' → '));
  }
  assert.equal(new Set(d.sdk.sent).size, 1, `claim sets sent ${JSON.stringify(d.sdk.sent)}: ${trail.join(' → ')}`);
  assert.ok(!d.afterDelivery.some((event) => event.type === 'presentationDeclined'), `"declined" after a delivered share: ${trail.join(' → ')}`);
};

const runTrail = async (trail: readonly Action[], d = driver()) => {
  for (const [index, action] of trail.entries()) {
    await d.actions[action]();
    await flush();
    assertLocked(d, trail.slice(0, index + 1));
  }
  return d;
};

const DELIVER: readonly Action[] = ['open', 'choose1', 'share'];

test('N1: opening a delivered request again (from the page, after Stop, after Back, after a remount) shows the locked screen', async () => {
  for (const after of [['open'], ['stop', 'open'], ['home', 'open'], ['remount', 'open'], ['stop', 'remount', 'open']] as Action[][]) {
    const d = await runTrail([...DELIVER, ...after]);
    const screen = d.state().screen;
    assert.equal(screen.name, 'requestConsent', after.join(' → '));
    assert.deepEqual(screen.name === 'requestConsent' && [screen.delivered, screen.problem], [{ credentialId: 'c1', claimSetIndex: 1, fields: ['ho_ten', 'nganh'] }, 'verifierCouldNotCheck'], after.join(' → '));
    const view = consentView(trustedRequest(), d.state().held, null, 'vi', screen.name === 'requestConsent' ? screen.delivered : null);
    assert.deepEqual([view.canShare, view.selected?.index], [true, 1], 'only the pinned option, ready to send again');
    // The reviewer's sequence: choose the broad option and share. Exactly the narrow one goes.
    await d.actions.choose0();
    await d.actions.share();
    assert.deepEqual(d.sdk.sent, [1, 1], 'claim sets sent: the pinned one only');
    assert.ok(d.events.some((event) => event.type === 'presentationDelivered'), 'the page is told the request is held');
  }
});

test('N1: a used-up request opened again says it cannot be sent again; so does one the SDK no longer pins', async () => {
  const usedUp = await runTrail([...DELIVER, 'share', 'share', 'open']);
  assert.deepEqual(usedUp.sdk.sent, [1, 1, 1]);
  assert.deepEqual(usedUp.state().screen, { name: 'requestFailed', problem: 'requestUsedUp', delivered: ['ho_ten', 'nganh'] }, 'REQUEST_INVALID at re-open');

  const lapsed = await runTrail([...DELIVER, 'stop']);
  lapsed.sdk.control.pinLapsed = true;
  await runTrail(['open'], lapsed);
  assert.deepEqual(lapsed.state().screen, { name: 'requestFailed', problem: 'requestUsedUp', delivered: ['ho_ten', 'nganh'] }, 'never a fresh choice from the page\'s memory either');
  await runTrail(['remount', 'open'], lapsed);
  assert.equal(lapsed.state().screen.name, 'requestFailed', 'the memory is the wallet\'s, not the controller\'s');
});

test('N1: no sequence of page and wallet actions leads from a delivered share to an ordinary choice for that request', async () => {
  const all: readonly Action[] = ['open', 'home', 'detail', 'choose0', 'choose1', 'share', 'stop', 'refresh', 'remount'];
  // Every sequence of 4 actions after the share reached the verifier.
  let sequences = 0;
  const walk = async (prefix: Action[], depth: number): Promise<void> => {
    if (depth === 0) {
      await runTrail([...DELIVER, ...prefix]);
      sequences += 1;
      return;
    }
    for (const action of all) await walk([...prefix, action], depth - 1);
  };
  await walk([], 4);
  assert.equal(sequences, all.length ** 4);
  // Long random walks from an empty wallet, the verifier sometimes answering at last (seeded, reproducible).
  let seed = 7;
  const random = () => ((seed = (seed * 1103515245 + 12345) % 2 ** 31) / 2 ** 31);
  for (let walkIndex = 0; walkIndex < 300; walkIndex += 1) {
    const d = driver();
    const trail: Action[] = [];
    for (let step = 0; step < 18; step += 1) {
      const action = all[Math.floor(random() * all.length)]!;
      if (random() < 0.05) d.sdk.control.answer = 'ok';
      trail.push(action);
      await d.actions[action]();
      await flush();
      assertLocked(d, trail);
    }
  }
});

test('N1: the SDK pins a share that is no longer among the matches: the request is used up (a fresh wallet, no memory), and the SDK is told to drop it', async () => {
  // A pinned option that no current match offers (the document was removed): never a fresh choice, nothing can be sent.
  for (const pinned of [{ credentialId: 'gone', claimSetIndex: 0 }, { credentialId: 'c1', claimSetIndex: 9 }]) {
    const request = { ...trustedRequest(), pinned } as ResolvedPresentation;
    const { controller, calls, events } = setup({ status: 'valid', request });
    controller.open(requestItem);
    await tick();
    const screen = controller.getState().screen;
    assert.deepEqual(screen, { name: 'requestFailed', problem: 'requestUsedUp', delivered: null }, JSON.stringify(pinned));
    assert.equal(calls.decline, 1, 'the SDK is told to drop the request it still pins');
    assert.deepEqual(events, [], 'nothing was delivered by this wallet: the page is told nothing');
    await controller.share();
    assert.equal(calls.submit.length, 0, 'nothing is sent for it');
  }
});

test('N1: a locked request shows the document the share was sent with, not the newest one', () => {
  const older = { ...match, credentialId: 'c1' };
  const newer = { ...match, credentialId: 'c2' };
  const held = (id: string, status: CredentialSummary['status'], createdAt: string): HeldCredential =>
    ({ summary: { ...summary(status), id, createdAt }, details: { ...details(status), id, createdAt } });
  const wallet = [held('c1', 'valid', '2026-11-01T00:00:00Z'), held('c2', 'valid', '2026-11-19T00:00:00Z')];
  const request = trustedRequest([newer, older]);
  const delivered = { credentialId: 'c1', claimSetIndex: 1, fields: ['ho_ten', 'nganh'] };

  // Not locked: the newest document is offered.
  assert.equal(consentView(request, wallet, 1, 'vi').match?.credentialId, 'c2');
  // Locked: the document that was sent, with its own summary, and the pinned option only.
  const view = consentView(request, wallet, null, 'vi', delivered);
  assert.deepEqual([view.match?.credentialId, view.summary?.id, view.selected?.index, view.canShare], ['c1', 'c1', 1, true]);
  assert.deepEqual(view.staying, ['ngay_sinh', 'ma_sinh_vien', 'hang_tot_nghiep', 'nam_tot_nghiep', 'so_hieu_bang'], 'what stays home: the sent document\'s other fields');

  // The sent document has since been revoked while a newer one is fine: the locked screen says so, it does not show the newer one.
  const revoked = [held('c1', 'revoked', '2026-11-01T00:00:00Z'), wallet[1]!];
  const blocked = consentView(request, revoked, null, 'vi', delivered);
  assert.deepEqual([blocked.summary?.id, blocked.blocked, blocked.canShare], ['c1', 'revoked', false]);
});

test('N1: two spellings of the same request (parameter order, percent-encoding, extra parameters) are one request for the wallet\'s memory', async () => {
  const sdk = pinningWallet();
  const first = createWalletController(sdk.wallet, () => undefined, () => 'vi');
  first.open({ id: 1, kind: 'request', text: REQUEST_TEXT });
  await flush();
  first.choose(1);
  await first.share();
  await flush();
  assert.deepEqual(sdk.sent, [1]);
  sdk.control.pinLapsed = true; // the SDK no longer pins it: only the wallet's own memory remains

  const spellings = [
    'openid4vp://?request_uri=https%3A%2F%2Fapi-identra.awncorp.vn%2Fr%2F1&client_id=x509_hash%3Aabc',
    'openid4vp://?client_id=x509_hash:abc&request_uri=https://api-identra.awncorp.vn/r/1',
    `${REQUEST_TEXT}&state=another-session`,
  ];
  for (const text of spellings) {
    // A new controller (a remount): the memory is the wallet's.
    const again = createWalletController(sdk.wallet, () => undefined, () => 'vi');
    again.open({ id: 2, kind: 'request', text });
    await flush();
    assert.deepEqual(again.getState().screen, { name: 'requestFailed', problem: 'requestUsedUp', delivered: ['ho_ten', 'nganh'] }, text);
  }
});
