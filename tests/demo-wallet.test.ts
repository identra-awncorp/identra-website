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
import { createBrowserFetch, createCertNetPath, createDemoWallet } from '../src/identra/demoWallet';
import { resolveCertNetConfig } from '../src/identra/config';
import {
  acceptProblemFor,
  checkNoteFor,
  chooseMatch,
  displayName,
  issuerView,
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
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { OfferSender } from '../src/components/demo/DemoWalletPanel';
import { DEMO_WALLET_PANEL_TRANSLATIONS } from '../src/translations/demo/DemoWalletPanelTranslations';
import {
  createCredentialVault,
  createInMemoryCredentialRepository,
  createInMemorySecretStorage,
  WalletErrorCodes,
  type CredentialRow,
  type CredentialSummary,
  type ResolvedOffer,
  type ResolvedPresentation,
} from '@identra/sdk-app';

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
  assert.equal(requestProblemFor('DID_RESOLUTION_UNAVAILABLE', 'submit'), 'verifierCouldNotCheck');
  assert.equal(requestProblemFor('VERIFIER_ERROR', 'submit'), 'submitVerifierError', 'a verifier error is still its own case');
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
  trustPath: 'x509' as const,
  issuerDid: null,
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
  ({ id, vct: match.vct, issuerUri: 'https://api-identra.awncorp.vn/issuers/truong-mau', trustPath: 'x509', issuerDid: null, status, statusCheckedAt: null, createdAt });

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
  assert.deepEqual(saved, { name: 'offerSaved', credentialId: 'c1', checked: true, issuerName: 'X', issuerDid: null });
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

  // The verifier could not check now: the same request stays open with the same choice, and sending again is possible.
  const chosen = walletReducer(screen, { type: 'submit' });
  const unchecked = walletReducer(chosen, { type: 'submitFailed', code: 'DID_RESOLUTION_UNAVAILABLE' });
  assert.equal(unchecked.name, 'requestConsent');
  assert.equal(unchecked.name === 'requestConsent' && unchecked.problem, 'verifierCouldNotCheck');
  assert.equal(unchecked.name === 'requestConsent' && unchecked.busy, false);
  assert.equal(unchecked.name === 'requestConsent' && unchecked.optionIndex, 1, 'the choice is kept');
  const again = walletReducer(unchecked, { type: 'submit' });
  assert.equal(again.name === 'requestConsent' && again.busy, true);
  assert.equal(again.name === 'requestConsent' && again.problem, null, 'the old message goes while sending again');
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

// ---- The CertNet path (ADR-0020) -------------------------------------------------------------------

const DID = 'did:certnet:local:7Hk2XaQ9mLp3Rt8vWz4bNc6dEf';

test('CertNet path: the gateway is reached only at its origin (mapped to the loopback address), never followed, no cookies', async () => {
  const { calls, doFetch } = recordingFetch(() => new Response('{}', { status: 503 }));
  const certnet = resolveCertNetConfig('http://127.0.0.1:47460', 'local')!;
  const path = createCertNetPath(certnet, createBrowserFetch(doFetch), { now: () => new Date('2026-11-26T00:00:00Z') });

  const resolved = await path.resolver.resolve(DID);
  assert.equal(resolved.didDocument, null);
  assert.equal(resolved.didResolutionMetadata.error, 'temporarilyUnavailable', 'a 503 is "not checked yet"');
  assert.equal(calls[0]!.url, `http://127.0.0.1:47460/v1/dids/${encodeURIComponent(DID)}`);
  assert.equal(calls[0]!.init.redirect, 'manual');
  assert.equal(calls[0]!.init.credentials, 'omit');

  await assert.rejects(path.trustRegistry.lookupIssuer(DID, 'https://identra.awncorp.vn/vct/bang-tot-nghiep/v1', new Date()), /CertNet trust registry/);
  assert.match(calls[1]!.url, /^http:\/\/127\.0\.0\.1:47460\/v1\/trust-registry\/issuers\//);
  assert.equal(calls.length, 2);
});

test('CertNet path: a DID of another network is refused without a request; with an https gateway nothing is mapped', async () => {
  const { calls, doFetch } = recordingFetch(() => new Response('{}', { status: 404 }));
  const path = createCertNetPath(resolveCertNetConfig('https://gateway.certnet.example/api', 'testnet')!, createBrowserFetch(doFetch), { now: () => new Date() });
  assert.equal((await path.resolver.resolve(DID)).didResolutionMetadata.error, 'invalidDid');
  assert.equal(calls.length, 0);
  assert.equal((await path.resolver.resolve('did:certnet:testnet:abc')).didResolutionMetadata.error, 'notFound');
  assert.equal(calls[0]!.url, `https://gateway.certnet.example/api/v1/dids/${encodeURIComponent('did:certnet:testnet:abc')}`);
});

test('with or without the CertNet path, an offer goes to the Identra API only, the same way', async () => {
  const { calls, doFetch } = recordingFetch(() => new Response('{"error":"not_found"}', { status: 404 }));
  const offerUri = `openid-credential-offer://?credential_offer_uri=${encodeURIComponent(`${CANONICAL}/issuers/truong-mau/offers/abc`)}`;
  for (const certnet of [null, resolveCertNetConfig('https://gateway.certnet.example', 'testnet')]) {
    const wallet = createDemoWallet({ apiOrigin: CANONICAL, apiUrl: CANONICAL, trustedRoots, fetch: doFetch, certnet });
    assert.deepEqual(await wallet.offers.resolve(offerUri), { ok: false, code: 'OFFER_EXPIRED' });
  }
  assert.ok(calls.every((call) => call.url.startsWith(`${CANONICAL}/`)), 'no request to the gateway for an offer');
});

test('the trial wallet\'s storage keeps the issuer DID; a record written before the CertNet path still opens as X.509', async () => {
  const rows = new Map<string, CredentialRow>();
  const random = { bytes: (n: number) => globalThis.crypto.getRandomValues(new Uint8Array(n)) };
  const vault = createCredentialVault({ repository: createInMemoryCredentialRepository(rows), secrets: createInMemorySecretStorage(), random, clock: { now: () => new Date() } });
  const issuer = 'https://api-identra.awncorp.vn/issuers/truong-mau';
  const didId = await vault.save({ compact: 'did-compact', vct: match.vct, issuer, issuerDid: DID, keyId: 'k1' });
  const oldId = await vault.save({ compact: 'old-compact', vct: match.vct, issuer, keyId: 'k2' });
  // A row from before the column existed has no issuer_did at all.
  delete (rows.get(oldId) as Partial<CredentialRow>).issuer_did;

  assert.equal(rows.get(didId)!.issuer_did, DID);
  assert.equal(await vault.open(didId), 'did-compact');
  assert.equal(await vault.open(oldId), 'old-compact');
  const listed = await vault.list();
  assert.equal(listed.find((row) => row.id === didId)?.issuer_did, DID);
  assert.equal(listed.find((row) => row.id === oldId)?.issuer_did ?? null, null);
  assert.deepEqual(issuerView({ issuerDid: listed.find((row) => row.id === oldId)?.issuer_did ?? null, issuerName: 'Trường Đại học Mẫu (DEMO)' }), { trustPath: 'x509', name: 'Trường Đại học Mẫu (DEMO)' });
});

test('a CertNet document never gets a display name: its identifier stands instead (and only the CertNet form)', () => {
  assert.deepEqual(issuerView({ trustPath: 'did', issuerDid: DID, issuerName: 'Trường Giả Danh' }), { trustPath: 'did', did: DID });
  assert.deepEqual(issuerView({ issuerDid: DID, issuerName: 'Trường Giả Danh' }), { trustPath: 'did', did: DID }, 'an accept result has no trustPath');
  assert.deepEqual(issuerView({ trustPath: 'did', issuerDid: 'https://evil.example' }), { trustPath: 'did', did: null });
  assert.deepEqual(issuerView({ trustPath: 'x509', issuerDid: null, issuerName: 'evil\u202Ename' }), { trustPath: 'x509', name: null });
  assert.deepEqual(issuerView({ trustPath: 'x509', issuerDid: null, issuerName: null }), { trustPath: 'x509', name: null });
});

test('CertNet states map to their own text: saved, saved but not checked, CertNet silent at receipt, offer refused while off', () => {
  const consent = walletReducer(walletReducer(walletReducer(WALLET_HOME, { type: 'checkOffer' }), { type: 'offerResolved', offer }), { type: 'accept' });

  const saved = walletReducer(consent, { type: 'accepted', result: { ok: true, credentialId: 'c1', vct: match.vct, issuerName: 'Trường Giả Danh', issuerDid: DID, status: 'valid' } });
  assert.deepEqual(saved, { name: 'offerSaved', credentialId: 'c1', checked: true, issuerName: null, issuerDid: DID });
  const unchecked = walletReducer(consent, { type: 'accepted', result: { ok: true, credentialId: 'c1', vct: match.vct, issuerName: null, issuerDid: DID, status: 'unknown' } });
  assert.equal(unchecked.name === 'offerSaved' && unchecked.checked, false, 'never shown as checked');

  // The SDK did not store it; the same offer completes later without the PIN.
  const silent = {
    ok: false as const, code: 'NETWORK_ERROR' as const, retryable: true, codeRedeemed: true,
    checks: [{ id: 'structure' as const, ok: true, code: null }, { id: 'did_resolution' as const, ok: false, code: 'DID_RESOLUTION_UNAVAILABLE' as const }],
  };
  assert.equal(acceptProblemFor(silent), 'certnetUnavailable');
  const waiting = walletReducer(consent, { type: 'accepted', result: silent });
  assert.equal(waiting.name, 'offerConsent');
  assert.equal(waiting.name === 'offerConsent' && waiting.problem, 'certnetUnavailable');
  assert.equal(waiting.name === 'offerConsent' && waiting.busy, false);
  assert.equal(acceptProblemFor({ ok: false, code: 'NETWORK_ERROR', retryable: true, codeRedeemed: false }), 'network', 'Identra unreachable stays that');

  const checking: WalletScreen = { name: 'offerChecking' };
  assert.deepEqual(walletReducer(checking, { type: 'offerRefused', code: 'OFFER_INVALID' }), { name: 'offerFailed', problem: 'offerInvalid' });
  assert.deepEqual(walletReducer(checking, { type: 'offerRefused', code: 'TRUST_PATH_UNSUPPORTED' }), { name: 'offerFailed', problem: 'offerNeedsCertNet' });

  for (const locale of ['vi', 'en'] as const) {
    for (const problem of WALLET_PROBLEMS) assert.ok(DEMO_WALLET_PANEL_TRANSLATIONS[locale].problems[problem].trim(), `${locale}.${problem}`);
    assert.notEqual(DEMO_WALLET_PANEL_TRANSLATIONS[locale].problems.certnetUnavailable, DEMO_WALLET_PANEL_TRANSLATIONS[locale].problems.network);
    const { verifierCouldNotCheck, submitVerifierError, submitNetwork } = DEMO_WALLET_PANEL_TRANSLATIONS[locale].problems;
    assert.ok(verifierCouldNotCheck !== submitVerifierError && verifierCouldNotCheck !== submitNetwork, `${locale}: its own sentence`);
  }
});

test('a re-check of a CertNet document: CertNet silent, issuer no longer recognised, or nothing to add; X.509 documents get no note', () => {
  const failing = (id: string, code: string) => [{ id: 'structure', ok: true, code: null }, { id, ok: false, code }] as never;
  assert.equal(checkNoteFor('did', failing('did_resolution', 'DID_RESOLUTION_UNAVAILABLE')), 'certnetUnavailable');
  assert.equal(checkNoteFor('did', failing('issuer_trust', 'TRUST_LIST_UNAVAILABLE')), 'certnetUnavailable');
  assert.equal(checkNoteFor('did', failing('issuer_trust', 'ISSUER_NOT_TRUSTED')), 'issuerNotRecognised');
  assert.equal(checkNoteFor('did', failing('status', 'STATUS_UNAVAILABLE')), null, 'the issuer\'s own list, not CertNet');
  assert.equal(checkNoteFor('did', failing('did_resolution', 'DID_RESOLUTION_FAILED')), null);
  assert.equal(checkNoteFor('did', []), null);
  assert.equal(checkNoteFor('x509', failing('issuer_trust', 'TRUST_LIST_UNAVAILABLE')), null);
  assert.equal(checkNoteFor('x509', failing('issuer_trust', 'ISSUER_NOT_TRUSTED')), null);
  for (const locale of ['vi', 'en'] as const) {
    const notes = DEMO_WALLET_PANEL_TRANSLATIONS[locale].checkNotes;
    assert.ok(notes.certnetUnavailable.includes('CertNet') && notes.issuerNotRecognised.includes('CertNet'), locale);
  }
});

// ---- The offer screen before acceptance --------------------------------------------------------------

const OFFER_DID = 'did:certnet:testnet:7Hk2XaQ9mLp3Rt8vWz4bNc6dEf';
const sender = (issuerDid: string | null, locale: 'vi' | 'en') =>
  renderToStaticMarkup(createElement(OfferSender, { offer: { issuerOrigin: 'https://api-identra.awncorp.vn', issuerDid }, copy: DEMO_WALLET_PANEL_TRANSLATIONS[locale] }));
const textOf = (html: string) => html.replace(/<\/?(?:wbr|bdi|span)\b[^>]*>/g, '').replace(/<[^>]*>/g, ' ').replace(/&#x27;/g, '\'').replace(/\s+/g, ' ');

test('a CertNet issuer\'s offer: the shortened identifier, "checked through CertNet on receipt", no promise of a name', () => {
  for (const locale of ['vi', 'en'] as const) {
    const copy = DEMO_WALLET_PANEL_TRANSLATIONS[locale];
    const html = sender(OFFER_DID, locale);
    const text = textOf(html);
    assert.ok(text.includes(copy.senderHintCertNet) && text.includes(copy.senderIdLabel), locale);
    assert.ok(text.includes('did:certnet:testnet:7Hk2Xa…6dEf') && html.includes(`data-did="${OFFER_DID}"`), `${locale}: shortened, the full value one tap away`);
    assert.ok(!text.includes(copy.senderHint), `${locale}: not the certificate issuer's hint`);
    assert.ok(!/tên chính thức|official name/i.test(text), `${locale}: no name is promised`);
    assert.ok(text.includes('api-identra.awncorp.vn'), `${locale}: where it came from stays`);
  }
  // An identifier that is not of the CertNet form is not shown, but the offer is still read as CertNet's.
  const odd = sender('did:web:evil.example', 'vi');
  assert.ok(!odd.includes('evil.example') && textOf(odd).includes(DEMO_WALLET_PANEL_TRANSLATIONS.vi.senderHintCertNet));
});

test('a certificate issuer\'s offer reads as it always did', () => {
  for (const locale of ['vi', 'en'] as const) {
    const html = sender(null, locale);
    assert.equal(textOf(html).trim(), `${DEMO_WALLET_PANEL_TRANSLATIONS[locale].senderLabel} api-identra.awncorp.vn ${DEMO_WALLET_PANEL_TRANSLATIONS[locale].senderHint}`.trim());
    assert.ok(!html.includes('certnet') && !html.includes('issuer-did'));
  }
});

test('the new offer-screen and refusal sentences: plain, no protocol words, no claim that CertNet is live', () => {
  const JARGON = /\bDID\b|\bTIR\b|resolver|x5c|did:certnet/;
  const CLAIMS = /\b(?:live|audited|in production|production-ready)\b|đang vận hành|đã kiểm toán|chính thức hoạt động/i;
  for (const locale of ['vi', 'en'] as const) {
    const copy = DEMO_WALLET_PANEL_TRANSLATIONS[locale];
    for (const sentence of [copy.senderHintCertNet, copy.senderIdLabel, copy.problems.offerNeedsCertNet, copy.problems.offerInvalid]) {
      assert.ok(sentence.trim().length > 3 && !JARGON.test(sentence) && !CLAIMS.test(sentence), `${locale}: "${sentence}"`);
    }
    assert.ok(copy.senderHintCertNet.includes('CertNet') && copy.problems.offerNeedsCertNet.includes('CertNet'), locale);
  }
  assert.equal(DEMO_WALLET_PANEL_TRANSLATIONS.vi.problems.offerInvalid, 'Đây không phải mã nhận giấy tờ mà ví dùng được.', 'the original wording');
  assert.equal(DEMO_WALLET_PANEL_TRANSLATIONS.en.problems.offerInvalid, 'This is not a document code the wallet can use.');
});
