/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// The web trial wallet's adapter: the browser HttpFetch it gives the SDK wallet (no redirect, timeout,
// size cap, no cookies) and the wallet it assembles (only the canonical API origin, mapped to the
// configured API address; the SDK's own error codes come back unchanged).
import assert from 'node:assert/strict';
import { X509Certificate } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { createBrowserFetch, createDemoWallet } from '../src/identra/demoWallet';
import {
  chooseMatch,
  displayName,
  offerProblemFor,
  requestProblemFor,
  requiredFields,
  safeText,
  sharingOptions,
  WALLET_HOME,
  WALLET_PROBLEMS,
  walletReducer,
  type WalletScreen,
} from '../src/identra/demoWalletModel';
import { DEMO_WALLET_PANEL_TRANSLATIONS } from '../src/translations/demo/DemoWalletPanelTranslations';
import { WalletErrorCodes, type CredentialSummary, type ResolvedOffer, type ResolvedPresentation } from '@identra/sdk-app';

const CANONICAL = 'https://api-identra.awncorp.vn';
const LOCAL = 'http://127.0.0.1:47410';

type Call = { url: string; init: RequestInit };

const recordingFetch = (answer: (call: Call) => Response | Promise<Response>) => {
  const calls: Call[] = [];
  const doFetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const call = { url: String(input), init: init ?? {} };
    calls.push(call);
    return answer(call);
  }) as typeof fetch;
  return { calls, doFetch };
};

test('browser fetch: no redirect following, no cookies, no cache, the body read whole', async () => {
  const { calls, doFetch } = recordingFetch(() => new Response('{"ok":true}', { status: 200 }));
  const response = await createBrowserFetch(doFetch)('https://api-identra.awncorp.vn/trust-list', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: 'a=1',
  });
  assert.equal(response.status, 200);
  assert.equal(await response.text(), '{"ok":true}');
  assert.equal(calls[0]!.init.redirect, 'manual');
  assert.equal(calls[0]!.init.credentials, 'omit');
  assert.equal(calls[0]!.init.cache, 'no-store');
  assert.equal(calls[0]!.init.method, 'POST');
  assert.equal(calls[0]!.init.body, 'a=1');
});

test('browser fetch: a redirect the browser withheld is reported as a 3xx, never followed', async () => {
  const opaque = { type: 'opaqueredirect', status: 0, headers: new Headers(), body: null } as unknown as Response;
  const response = await createBrowserFetch(async () => opaque)('https://api-identra.awncorp.vn/x');
  assert.equal(response.status, 302);
});

test('browser fetch: a body over maxBytes is not read further and comes back declaring its size (the guard calls it the server\'s fault)', async () => {
  const declared = await createBrowserFetch(async () => new Response('x'.repeat(10), { headers: { 'content-length': '5000' } }))('https://api-identra.awncorp.vn/x', { maxBytes: 100 });
  assert.equal(declared.headers.get('content-length'), '5000');
  assert.equal(await declared.text(), '');

  const streamed = await createBrowserFetch(async () => new Response('x'.repeat(200)))('https://api-identra.awncorp.vn/x', { maxBytes: 100 });
  assert.ok(Number(streamed.headers.get('content-length')) > 100);

  const multibyte = await createBrowserFetch(async () => new Response('đ'.repeat(60)))('https://api-identra.awncorp.vn/x', { maxBytes: 100 });
  assert.ok(Number(multibyte.headers.get('content-length')) > 100, 'bytes, not characters');
});

test('browser fetch: aborts at timeoutMs', async () => {
  const hanging = (async (_input: RequestInfo | URL, init?: RequestInit) => new Promise<Response>((_, reject) => {
    init?.signal?.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError')));
  })) as typeof fetch;
  const started = Date.now();
  await assert.rejects(createBrowserFetch(hanging)('https://api-identra.awncorp.vn/x', { timeoutMs: 50 }));
  assert.ok(Date.now() - started < 2000);
});

// The DEMO root the site pins (the same file the root plugin publishes).
const trustedRoots = [new Uint8Array(new X509Certificate(readFileSync('src/identra/trust/root-ca.pem')).raw)];

test('wallet: a QR naming another origin is refused before any request', async () => {
  const { calls, doFetch } = recordingFetch(() => new Response('{}'));
  const wallet = createDemoWallet({ apiOrigin: CANONICAL, apiUrl: CANONICAL, trustedRoots, fetch: doFetch });

  const offer = await wallet.offers.resolve(
    `openid-credential-offer://?credential_offer_uri=${encodeURIComponent('https://evil.example.com/issuers/truong-mau/offers/abc')}`,
  );
  assert.deepEqual(offer, { ok: false, code: 'URL_NOT_ALLOWED' });

  const request = await wallet.presentations.resolve(
    `openid4vp://?client_id=x509_hash:${'A'.repeat(43)}&request_uri=${encodeURIComponent('https://evil.example.com/oid4vp/request/abc')}`,
  );
  assert.equal(request.ok, false);
  assert.equal(calls.length, 0);
});

test('wallet: canonical URLs go to the configured API address; an expired offer is OFFER_EXPIRED', async () => {
  const { calls, doFetch } = recordingFetch(() => new Response('{"error":"not_found"}', { status: 404 }));
  const wallet = createDemoWallet({ apiOrigin: CANONICAL, apiUrl: LOCAL, trustedRoots, fetch: doFetch });

  const result = await wallet.offers.resolve(
    `openid-credential-offer://?credential_offer_uri=${encodeURIComponent(`${CANONICAL}/issuers/truong-mau/offers/abc`)}`,
  );
  assert.deepEqual(result, { ok: false, code: 'OFFER_EXPIRED' });
  assert.equal(calls[0]!.url, `${LOCAL}/issuers/truong-mau/offers/abc`);
  assert.equal(calls[0]!.init.redirect, 'manual');
});

test('wallet: an oversized answer is ISSUER_ERROR (the server\'s fault), not a network problem', async () => {
  const wallet = createDemoWallet({
    apiOrigin: CANONICAL,
    apiUrl: CANONICAL,
    trustedRoots,
    fetch: (async () => new Response('x'.repeat(70_000))) as typeof fetch,
  });
  const result = await wallet.offers.resolve(
    `openid-credential-offer://?credential_offer_uri=${encodeURIComponent(`${CANONICAL}/issuers/truong-mau/offers/abc`)}`,
  );
  assert.deepEqual(result, { ok: false, code: 'ISSUER_ERROR' });
});

test('wallet: an unreachable API is NETWORK_ERROR; a fresh wallet holds nothing', async () => {
  const wallet = createDemoWallet({
    apiOrigin: CANONICAL,
    apiUrl: CANONICAL,
    trustedRoots,
    fetch: (async () => { throw new TypeError('Failed to fetch'); }) as typeof fetch,
  });
  const result = await wallet.offers.resolve(
    `openid-credential-offer://?credential_offer_uri=${encodeURIComponent(`${CANONICAL}/issuers/truong-mau/offers/abc`)}`,
  );
  assert.deepEqual(result, { ok: false, code: 'NETWORK_ERROR' });
  assert.deepEqual(await wallet.credentials.list(), []);
});

// ---- What the trial wallet shows (src/identra/demoWalletModel.ts) ----------------------------------

test('every SDK error code maps to a problem with a sentence in both languages', () => {
  for (const code of Object.values(WalletErrorCodes)) {
    for (const problem of [offerProblemFor(code), requestProblemFor(code, 'resolve'), requestProblemFor(code, 'submit')]) {
      assert.ok((WALLET_PROBLEMS as readonly string[]).includes(problem), `${code} -> ${problem}`);
      for (const locale of ['vi', 'en'] as const) assert.ok(DEMO_WALLET_PANEL_TRANSLATIONS[locale].problems[problem].trim());
    }
  }
  assert.equal(offerProblemFor('TX_CODE_WRONG'), 'pinWrong');
  assert.equal(offerProblemFor('OFFER_EXPIRED'), 'offerExpired');
  assert.equal(offerProblemFor('NETWORK_ERROR'), 'network');
  assert.equal(requestProblemFor('VERIFIER_NOT_TRUSTED', 'resolve'), 'verifierUntrusted');
  assert.equal(requestProblemFor('TRUST_LIST_UNAVAILABLE', 'resolve'), 'trustListUnavailable');
  assert.equal(requestProblemFor('NETWORK_ERROR', 'submit'), 'submitNetwork', 'a lost answer may have been delivered');
});

test('text from an issuer or verifier: control and direction characters refused, long text cut', () => {
  assert.equal(safeText('Trường Đại học Mẫu (DEMO)'), 'Trường Đại học Mẫu (DEMO)');
  assert.equal(safeText('evil‮name'), null);
  assert.equal(safeText(''), null);
  assert.equal(safeText(42), null);
  assert.equal(Array.from(safeText('x'.repeat(500))!).length, 200);
  assert.equal(displayName([{ name: 'Sample University', locale: 'en' }, { name: 'Trường Mẫu', locale: 'vi-VN' }], 'vi'), 'Trường Mẫu');
  assert.equal(displayName([{ name: 'Sample University', locale: 'en' }], 'vi'), 'Sample University');
  assert.equal(displayName([], 'vi'), null);
});

const match = {
  credentialId: 'c1',
  vct: 'https://identra.awncorp.vn/vct/bang-tot-nghiep/v1',
  issuerName: 'Trường Đại học Mẫu (DEMO)',
  claimSets: [
    { index: 1, claims: ['nganh', 'ho_ten'] },
    { index: 0, claims: ['nam_tot_nghiep', 'ho_ten', 'hang_tot_nghiep', 'nganh'] },
  ],
};

test('sharing options: fullest first, fields in display order, required = in every option', () => {
  const options = sharingOptions(match);
  assert.deepEqual(options.map((option) => option.index), [0, 1]);
  assert.deepEqual(options[0]!.fields, ['ho_ten', 'nganh', 'hang_tot_nghiep', 'nam_tot_nghiep']);
  assert.deepEqual(options[0]!.withheld, []);
  assert.deepEqual(options[1]!.withheld, ['hang_tot_nghiep', 'nam_tot_nghiep']);
  assert.deepEqual(requiredFields(options), ['ho_ten', 'nganh']);
});

const summary = (id: string, createdAt: string, status: CredentialSummary['status']): CredentialSummary =>
  ({ id, vct: match.vct, issuerUri: 'https://api-identra.awncorp.vn/issuers/truong-mau', status, statusCheckedAt: null, createdAt });

test('the credential to answer with: the newest one not known to be revoked; a revoked one only when nothing else', () => {
  const matches = [{ ...match, credentialId: 'old' }, { ...match, credentialId: 'new' }];
  assert.equal(chooseMatch(matches, [summary('old', '2026-11-01T00:00:00Z', 'valid'), summary('new', '2026-11-02T00:00:00Z', 'valid')])?.match.credentialId, 'new');
  assert.equal(chooseMatch(matches, [summary('old', '2026-11-01T00:00:00Z', 'valid'), summary('new', '2026-11-02T00:00:00Z', 'revoked')])?.match.credentialId, 'old');
  const onlyRevoked = chooseMatch([matches[1]!], [summary('new', '2026-11-02T00:00:00Z', 'revoked')]);
  assert.equal(onlyRevoked?.summary?.status, 'revoked');
  assert.equal(chooseMatch([], []), null);
});

const offer = { issuerUri: 'https://api-identra.awncorp.vn/issuers/truong-mau', codeRedeemed: false } as unknown as ResolvedOffer;
const request = { clientId: 'x509_hash:abc', verifier: { trusted: true, ten: 'Nhà tuyển dụng Mẫu (DEMO)', maToChuc: 'X' }, matches: [match], expiresAt: '2030-01-01T00:00:00Z' } as ResolvedPresentation;

test('wallet screens: a wrong PIN stays on the offer, an expired offer ends it, a saved credential is shown', () => {
  let screen: WalletScreen = walletReducer(WALLET_HOME, { type: 'checkOffer' });
  screen = walletReducer(screen, { type: 'offerResolved', offer });
  assert.equal(screen.name, 'offerConsent');
  screen = walletReducer(screen, { type: 'accept' });
  assert.equal(screen.name === 'offerConsent' && screen.busy, true);
  assert.equal(walletReducer(screen, { type: 'accept' }), screen, 'no second accept while one runs');

  const wrong = walletReducer(screen, { type: 'accepted', result: { ok: false, code: 'TX_CODE_WRONG', retryable: true, codeRedeemed: false } });
  assert.equal(wrong.name, 'offerConsent');
  assert.equal(wrong.name === 'offerConsent' && wrong.problem, 'pinWrong');
  assert.equal(wrong.name === 'offerConsent' && wrong.busy, false);

  const expired = walletReducer(screen, { type: 'accepted', result: { ok: false, code: 'OFFER_EXPIRED', retryable: false, codeRedeemed: false } });
  assert.deepEqual(expired, { name: 'offerFailed', problem: 'offerExpired' });

  const saved = walletReducer(screen, { type: 'accepted', result: { ok: true, credentialId: 'c1', vct: match.vct, issuerName: 'X', status: 'valid' } });
  assert.deepEqual(saved, { name: 'offerSaved', credentialId: 'c1', checked: true, issuerName: 'X' });
});

test('wallet screens: an offer refused while checking, and late answers after leaving, are handled', () => {
  const refused = walletReducer({ name: 'offerChecking' }, { type: 'offerRefused', code: 'URL_NOT_ALLOWED' });
  assert.deepEqual(refused, { name: 'offerFailed', problem: 'notAllowed' });
  assert.deepEqual(walletReducer(WALLET_HOME, { type: 'offerResolved', offer }), WALLET_HOME, 'a late answer does not reopen a screen the visitor left');
  assert.deepEqual(walletReducer(WALLET_HOME, { type: 'requestResolved', request }), WALLET_HOME);
});

test('wallet screens: share, decline, and a submit failure that needs a new request', () => {
  let screen: WalletScreen = walletReducer(walletReducer(WALLET_HOME, { type: 'checkRequest' }), { type: 'requestResolved', request });
  assert.equal(screen.name, 'requestConsent');
  screen = walletReducer(screen, { type: 'chooseOption', optionIndex: 1 });
  assert.equal(screen.name === 'requestConsent' && screen.optionIndex, 1);
  assert.deepEqual(walletReducer(screen, { type: 'declined' }), { name: 'requestDeclined' });

  const sending = walletReducer(screen, { type: 'submit' });
  assert.equal(walletReducer(sending, { type: 'chooseOption', optionIndex: 0 }), sending, 'the choice is frozen while sending');
  assert.deepEqual(
    walletReducer(sending, { type: 'submitted', verifierName: 'Nhà tuyển dụng Mẫu (DEMO)', fields: ['ho_ten', 'nganh'] }),
    { name: 'requestSent', verifierName: 'Nhà tuyển dụng Mẫu (DEMO)', fields: ['ho_ten', 'nganh'] },
  );
  assert.deepEqual(walletReducer(sending, { type: 'submitFailed', code: 'REQUEST_INVALID' }), { name: 'requestFailed', problem: 'requestClosed' });
  const storage = walletReducer(sending, { type: 'submitFailed', code: 'STORAGE_ERROR' });
  assert.equal(storage.name === 'requestConsent' && storage.problem, 'storage', 'a failure before sending leaves the request usable');
});

test('build check: every chunk the wallet chunk imports (shared ones too) is scanned for Function/eval', async () => {
  const { cborWithoutEval } = await import('../vite.config');
  const plugin = cborWithoutEval({ scanChunk: (chunk) => chunk.moduleIds.some((id) => id.includes('/identra-sdk/packages/app/')) });
  const chunk = (fileName: string, code: string, imports: string[] = [], moduleIds: string[] = []) =>
    ({ type: 'chunk', fileName, code, imports, moduleIds });
  const run = (bundle: Record<string, unknown>) => {
    const errors: string[] = [];
    const generate = plugin.generateBundle as unknown as (this: { error: (m: string) => never }, o: unknown, b: unknown) => void;
    try {
      generate.call({ error: (message: string) => { errors.push(message); throw new Error(message); } }, {}, bundle);
    } catch {
      // The plugin stops the build at the first unknown reference.
    }
    return errors;
  };
  const wallet = chunk('wallet.js', 'export const w=1;', ['shared.js'], ['/home/x/identra-sdk/packages/app/dist/index.js']);
  const bad = 'const f=new Function("r","return r");';
  assert.match(run({ 'wallet.js': wallet, 'shared.js': chunk('shared.js', bad, ['deeper.js']), 'deeper.js': chunk('deeper.js', '') }).join(), /shared\.js/);
  assert.match(run({ 'wallet.js': wallet, 'shared.js': chunk('shared.js', '', ['deeper.js']), 'deeper.js': chunk('deeper.js', bad) }).join(), /deeper\.js/, 'transitively');
  assert.deepEqual(run({ 'wallet.js': wallet, 'shared.js': chunk('shared.js', ''), 'unrelated.js': chunk('unrelated.js', bad) }), [], 'chunks the wallet does not load are not its concern');
  assert.deepEqual(run({ 'wallet.js': wallet, 'shared.js': chunk('shared.js', 'x instanceof Function?x:y') }), [], 'a type test is allowed');
});
