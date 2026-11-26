/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// The employer demo's result on the CertNet path (ADR-0020) beside the X.509 path: the right step 3 for the
// path, the issuer shown by its CertNet identifier and never by a name, "could not be checked right now"
// for CertNet not answering (as for the trust list and the status list), no raw id or code on screen, every
// new sentence in every language. And X.509 results render exactly as before that path existed.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { DID_PRESENTATION_CHECK_IDS, type SessionResult } from '@identra/sdk-client';
import { ApplyJobVerifierResult, CheckList } from '../src/components/demo/ApplyJobVerifierDialog';
import {
  certNetIssuerId,
  firstFailure,
  isFinalFailure,
  toCheckRows,
} from '../src/identra/verifierSession';
import { APPLY_JOB_VERIFIER_DIALOG_TRANSLATIONS as T } from '../src/translations/demo/ApplyJobVerifierDialogTranslations';
import { DEMO_WALLET_PANEL_TRANSLATIONS as W } from '../src/translations/demo/DemoWalletPanelTranslations';
import IdentraIssuerId from '../src/components/IdentraIssuerId';
import DemoWalletPanel, { IssuerLine, OfferSender } from '../src/components/demo/DemoWalletPanel';
import { PRODUCT_PAGE_TRANSLATIONS } from '../src/translations/ProductPageTranslations';
import { X509_CASES, X509_OUTAGE_CASES } from './fixtures/verifier-results/x509-cases';

const LOCALES = ['vi', 'en', 'es', 'ja', 'de'] as const;
const DID = 'did:certnet:testnet:7Hk2XaQ9mLp3Rt8vWz4bNc6dEf';
const verifiedAt = '2026-11-26T01:00:00.000Z';

const render = (result: SessionResult, locale: typeof LOCALES[number] = 'vi') => {
  const copy = T[locale];
  const rows = toCheckRows(result);
  return renderToStaticMarkup(createElement(ApplyJobVerifierResult, { result, copy, language: locale, verifierName: 'Nhà tuyển dụng mẫu (DEMO)' }))
    + renderToStaticMarkup(createElement(CheckList, { rows, copy, headlineRow: firstFailure(rows) }));
};
/** What a visitor reads: the text, without tags and attributes. */
const textOf = (html: string) => html.replace(/<\/?(?:wbr|bdi|span)\b[^>]*>/g, '').replace(/<[^>]*>/g, ' ').replace(/&#x27;/g, '\'').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
/** The classes of the headline box (the first element of the result). */
const headlineClass = (html: string) => html.match(/<div class="space-y-5"><div class="([^"]+)"/)?.[1];

const didSuccess: SessionResult = {
  ok: true,
  checks: DID_PRESENTATION_CHECK_IDS.map((id) => ({ id, ok: true, code: null })),
  claims: { ho_ten: 'Nguyễn Minh Mẫu', nganh: 'Công nghệ thông tin' },
  trustPath: 'did',
  issuerDid: DID,
  verifiedAt,
};
const didFailure = (id: string, code: string): SessionResult => {
  const index = DID_PRESENTATION_CHECK_IDS.indexOf(id as never);
  const gate = index < 4; // steps 1-4 stop the run
  return {
    ok: false,
    checks: DID_PRESENTATION_CHECK_IDS.map((checkId, i) => (
      i < index ? { id: checkId, ok: true, code: null }
        : i === index ? { id: checkId, ok: false, code: code as never }
          : gate || (checkId === 'status' && id === 'issuer_trust') ? { id: checkId, ok: false, code: 'SKIPPED' as const, skipped: true }
            : { id: checkId, ok: true, code: null })),
    verifiedAt,
  };
};

test('X.509 results render exactly as before the CertNet path (markup of commit eed1685, every locale)', () => {
  const snapshot = JSON.parse(readFileSync('tests/fixtures/verifier-results/x509-snapshot.json', 'utf8')) as Record<string, string>;
  for (const locale of LOCALES) {
    for (const [name, result] of Object.entries(X509_CASES)) {
      const hash = createHash('sha256').update(render(result, locale)).digest('hex');
      assert.equal(hash, snapshot[`${locale}/${name}`], `${locale}/${name} changed`);
    }
  }
});

test('the CertNet identifier: only the CertNet form is shown', () => {
  assert.equal(certNetIssuerId(DID), DID);
  for (const bad of ['did:web:example.com', 'did:certnet:devnet:abc', 'did:certnet:testnet:a b', `did:certnet:testnet:x‮`, 'Trường Mẫu', 42, null, undefined]) {
    assert.equal(certNetIssuerId(bad), null, String(bad));
  }
});

// A registrant chooses its own identifier on CertNet: identifiers that share a head and a tail (the security
// review's examples, which all used to read "did:certnet:testnet:a1b2c3…7890") must never look alike.
const COLLIDING = ['a1b2c3d4e5f67890', 'a1b2c3ffffff7890', 'a1b2c3_attacker_7890'].map((id) => `did:certnet:testnet:${id}`);
const LONG = `did:certnet:testnet:${'7Hk2XaQ9mLp3Rt8v'.repeat(4)}`;

test('the issuer identifier is shown complete wherever a person relies on it: wallet offer, document card, list, employer issuer line and signer row', () => {
  const surfaces = (did: string) => {
    const wallet = W.vi;
    const success = { ...didSuccess, issuerDid: did };
    const employer = renderToStaticMarkup(createElement(ApplyJobVerifierResult, { result: success, copy: T.vi, language: 'vi', verifierName: 'X' }));
    return {
      identifier: renderToStaticMarkup(createElement(IdentraIssuerId, { id: did })),
      offer: renderToStaticMarkup(createElement(OfferSender, { offer: { issuerOrigin: 'https://api-identra.awncorp.vn', issuerDid: did }, copy: wallet })),
      card: renderToStaticMarkup(createElement(IssuerLine, { issuer: { trustPath: 'did', did }, copy: wallet })),
      list: renderToStaticMarkup(createElement(IssuerLine, { issuer: { trustPath: 'did', did }, copy: wallet, compact: true })),
      employerIssuer: employer.match(/data-testid="verifier-issuer-certnet"[\s\S]*?<\/dd>/)![0],
      employerSigner: employer.match(/data-group="signer"[\s\S]*?<\/li>/)![0],
    };
  };
  const shown = new Map<string, Record<string, string>>();
  for (const did of [...COLLIDING, LONG]) {
    const texts = Object.fromEntries(Object.entries(surfaces(did)).map(([where, html]) => [where, textOf(html)]));
    for (const [where, text] of Object.entries(texts)) {
      assert.ok(text.includes(did), `${where}: the complete ${did}`);
      assert.ok(!text.includes('…'), `${where}: nothing cut`);
    }
    shown.set(did, texts);
  }
  for (const where of Object.keys(shown.get(LONG)!)) {
    const seen = COLLIDING.map((did) => shown.get(did)![where]);
    assert.equal(new Set(seen).size, COLLIDING.length, `${where}: the colliding identifiers read differently`);
  }
  // It wraps rather than overflowing a phone screen.
  assert.match(renderToStaticMarkup(createElement(IdentraIssuerId, { id: LONG })), /\[overflow-wrap:anywhere\][^>]*>did:<wbr\/>certnet:<wbr\/>testnet:<wbr\/>/);
});

test('a CertNet success: the CertNet step, the complete identifier, no name, CertNet said in a few words', () => {
  for (const locale of LOCALES) {
    const copy = T[locale];
    const html = render(didSuccess, locale);
    const text = textOf(html);
    assert.ok(text.includes(copy.verifiedTitle), locale);
    assert.ok(text.includes(copy.checks.did_resolution), `${locale}: step 3 of this path`);
    assert.ok(!text.includes(copy.checks.certificate_chain), `${locale}: no certificate step`);
    assert.ok(text.includes(copy.checks.issuer_trust_certnet), `${locale}: recognised on CertNet`);
    assert.ok(!text.includes(copy.checks.issuer_trust), `${locale}: not Identra's list`);
    assert.ok(html.includes('data-testid="verifier-issuer-certnet"'));
    assert.ok(html.includes(`data-did="${DID}"`));
    assert.equal(textOf(html.match(/<bdi [^>]*data-testid="issuer-did-full"[^>]*>[\s\S]*?<\/bdi>/)![0]).trim(), DID, 'the full value is on screen');
    assert.ok(text.includes(copy.certnetNote) && text.includes(copy.issuerIdNote));
    const [before, after] = copy.groups.signerCertNetNamed.split('{issuer}').map((part) => part.trim());
    const signer = textOf(html.match(/data-group="signer"[\s\S]*?<\/li>/)![0]);
    for (const part of [before!, DID, after!]) assert.ok(signer.includes(part), `${locale}: signer line has "${part}"`);
    assert.ok(!text.includes(copy.groups.signerNamed.split('{issuer}')[1]!.trim()), `${locale}: not "on the list of recognised organisations"`);
  }
});

test('a CertNet success never shows an issuer name, even one the server sent anyway', () => {
  const withName = { ...didSuccess, issuer: undefined, issuerName: 'Trường Giả Danh' } as unknown as SessionResult;
  assert.ok(!render(withName).includes('Trường Giả Danh'));
  // A result whose identifier is not of the CertNet form shows no identifier at all (the client refuses it first).
  const odd = render({ ...didSuccess, issuerDid: 'did:web:evil.example' });
  assert.ok(!odd.includes('evil.example'));
  assert.ok(!odd.includes('verifier-issuer-certnet'));
});

// `unchecked`: CertNet did not answer, so nothing was proven: amber "not checked", never a cross.
const failures = [
  { id: 'did_resolution', code: 'DID_RESOLUTION_FAILED', reason: 'DID_RESOLUTION_FAILED', final: true, unchecked: false },
  { id: 'did_resolution', code: 'DID_RESOLUTION_UNAVAILABLE', reason: 'DID_RESOLUTION_UNAVAILABLE', final: false, unchecked: true },
  { id: 'did_resolution', code: 'KEY_NOT_FOUND', reason: 'KEY_NOT_FOUND', final: true, unchecked: false },
  { id: 'issuer_trust', code: 'ISSUER_NOT_TRUSTED', reason: 'CERTNET_ISSUER_NOT_TRUSTED', final: true, unchecked: false },
  { id: 'issuer_trust', code: 'TRUST_LIST_UNAVAILABLE', reason: 'CERTNET_REGISTRY_UNAVAILABLE', final: false, unchecked: true },
  { id: 'status', code: 'REVOKED', reason: 'REVOKED', final: true, unchecked: false },
  { id: 'status', code: 'STATUS_UNAVAILABLE', reason: 'STATUS_UNAVAILABLE', final: false, unchecked: true },
] as const;

for (const { id, code, reason, final, unchecked } of failures) {
  test(`a CertNet failure at ${id} (${code}): its own sentence, ${unchecked ? '"could not be checked right now" in amber' : final ? 'final' : 'retry'}, no issuer, no raw code`, () => {
    const result = didFailure(id, code);
    const rows = toCheckRows(result);
    assert.equal(firstFailure(rows)?.reasonKey, reason);
    assert.equal(isFinalFailure(rows), final);
    for (const locale of LOCALES) {
      const copy = T[locale];
      const html = render(result, locale);
      const text = textOf(html);
      assert.ok(text.includes(unchecked ? copy.uncheckedTitle : copy.failedTitle), locale);
      assert.equal(headlineClass(html)?.includes(unchecked ? 'bg-amber-50' : 'bg-rose-50'), true, `${locale}: headline colour`);
      assert.equal(html.includes('data-unchecked="true"'), unchecked, `${locale}: the step reads "not checked"`);
      const groupOutcome = html.match(/data-group="signer" data-outcome="(\w+)"/)?.[1];
      if (id !== 'status') assert.equal(groupOutcome, unchecked ? 'unchecked' : 'failed', `${locale}: signer group`);
      assert.ok(text.includes(copy.reasons[reason]), `${locale}: the headline says why`);
      assert.ok(text.includes(final ? copy.failedFinalHint : copy.failedRetryHint), `${locale}: ${final ? 'final' : 'retry'} hint`);
      assert.ok(text.includes(copy.certnetNote), `${locale}: CertNet explained where it appears`);
      assert.ok(text.includes(copy.checks.did_resolution) && !text.includes(copy.checks.certificate_chain), locale);
      assert.ok(text.includes(copy.groups.signerCertNet), `${locale}: the signer line of this path`);
      assert.ok(!html.includes('verifier-issuer-certnet') && !html.includes('data-did'), `${locale}: a failure names no issuer`);
      assert.ok(!/[A-Z]{2,}_[A-Z]{2,}/.test(text) && !/\b(?:did_resolution|issuer_trust|certificate_chain)\b/.test(text), `${locale}: no raw id or code`);
    }
  });
}

test('CertNet not answering: amber "not checked" with a retry, like the product page\'s unchecked state; a proven problem stays red', () => {
  for (const result of [didFailure('did_resolution', 'DID_RESOLUTION_UNAVAILABLE'), didFailure('issuer_trust', 'TRUST_LIST_UNAVAILABLE')]) {
    const html = render(result);
    assert.match(html, /data-outcome="unchecked"/);
    assert.ok(headlineClass(html)!.includes('bg-amber-50') && !html.includes('bg-rose-'), 'no red anywhere');
    assert.ok(textOf(html).includes(T.vi.groupNotChecked));
    assert.equal(isFinalFailure(toCheckRows(result)), false, 'the dialog offers "try again with a new code"');
  }
  // A proven problem next to an unanswered step is still a failure.
  const both = didFailure('issuer_trust', 'TRUST_LIST_UNAVAILABLE');
  both.checks = both.checks.map((check) => (check.id === 'validity_time' ? { id: 'validity_time', ok: false, code: 'EXPIRED' } : check));
  assert.ok(headlineClass(render(both))!.includes('bg-rose-50'));
});

// "Could not be checked right now" is one colour on both paths: the step, its group and the headline.
const OUTAGES = [
  { name: 'trustListUnavailable', result: X509_OUTAGE_CASES.trustListUnavailable!, group: 'signer', reason: 'TRUST_LIST_UNAVAILABLE' },
  { name: 'statusUnavailable', result: X509_OUTAGE_CASES.statusUnavailable!, group: 'valid', reason: 'STATUS_UNAVAILABLE' },
] as const;

for (const { name, result, group, reason } of OUTAGES) {
  test(`X.509 ${name}: amber "could not be checked right now" (headline, group, step), a retry, no red`, () => {
    assert.equal(isFinalFailure(toCheckRows(result)), false);
    for (const locale of LOCALES) {
      const copy = T[locale];
      const html = render(result, locale);
      const text = textOf(html);
      assert.ok(text.includes(copy.uncheckedTitle), `${locale}: headline`);
      assert.ok(text.includes(copy.reasons[reason]) && text.includes(copy.failedRetryHint), `${locale}: why, and retry`);
      assert.ok(headlineClass(html)!.includes('bg-amber-50') && !html.includes('bg-rose-') && !html.includes('text-rose-'), `${locale}: no red`);
      assert.match(html, /<div class="[^"]*bg-amber-50[^"]*" data-outcome="unchecked">/, `${locale}: headline marked`);
      assert.match(html, new RegExp(`data-group="${group}" data-outcome="unchecked"`), `${locale}: group marked`);
      assert.equal(html.match(/<li [^>]*data-unchecked="true"/g)?.length, 1, `${locale}: exactly the outage step is marked`);
    }
  });
}

test('X.509: a proven problem stays red, also beside an outage', () => {
  for (const name of ['revoked', 'issuerNotTrusted', 'chainUntrusted']) {
    const html = render(X509_CASES[name]!);
    assert.ok(headlineClass(html)!.includes('bg-rose-50'), name);
    assert.ok(!html.includes('data-unchecked') && !html.includes('data-outcome="unchecked"'), name);
  }
  const mixed = structuredClone(X509_OUTAGE_CASES.trustListUnavailable!);
  mixed.checks = mixed.checks.map((check) => (check.id === 'status' ? { id: 'status', ok: false, code: 'REVOKED' } : check));
  assert.ok(headlineClass(render(mixed))!.includes('bg-rose-50'));
});

// Ledger wording is the claims scanner's (npm run scan:claims), which covers these files too.
const JARGON = /\bDID\b|\bTIR\b|resolver|x5c|did:certnet/;
const CLAIMS = /\b(?:live|audited|in production|production-ready)\b|đang vận hành|đã kiểm toán|chính thức hoạt động/i;

test('every new sentence exists in every language, plain (no protocol words, no claim that CertNet is live)', () => {
  const sentencesOf = (copy: typeof T.en) => [
    copy.checks.did_resolution, copy.checks.issuer_trust_certnet,
    copy.reasons.DID_RESOLUTION_FAILED, copy.reasons.DID_RESOLUTION_UNAVAILABLE,
    copy.reasons.CERTNET_ISSUER_NOT_TRUSTED, copy.reasons.CERTNET_REGISTRY_UNAVAILABLE,
    copy.groups.signerCertNet, copy.groups.signerCertNetNamed,
    copy.certnetNote, copy.issuerIdNote, copy.testBuildMarker,
  ];
  const english = sentencesOf(T.en);
  for (const locale of LOCALES) {
    const copy = T[locale];
    sentencesOf(copy).forEach((sentence, index) => {
      assert.ok(sentence.trim().length > 3, `${locale}: empty`);
      assert.ok(!JARGON.test(sentence) && !CLAIMS.test(sentence), `${locale}: "${sentence}"`);
      if (locale !== 'en') assert.notEqual(sentence, english[index], `${locale}: left in English`);
    });
    assert.ok(copy.groups.signerCertNetNamed.includes('{issuer}'), locale);
    assert.ok(copy.certnetNote.includes('CertNet'), `${locale}: says what CertNet is`);
  }
  for (const locale of ['vi', 'en'] as const) {
    const product = PRODUCT_PAGE_TRANSLATIONS[locale].checks;
    assert.ok(product.did_resolution && product.issuer_trust_certnet, `${locale}: product page labels`);
    const wallet = W[locale];
    const sentences = [
      wallet.issuerCertNet, wallet.testBuildMarker, wallet.certnetAbout,
      wallet.savedIssuerCertNet, wallet.savedIssuerCertNetUnchecked, wallet.savedLeadCertNet, wallet.savedLeadCertNetUnchecked,
      wallet.checkNotes.certnetUnavailable, wallet.checkNotes.issuerNotRecognised,
      wallet.problems.certnetUnavailable, wallet.problems.offerNeedsCertNet, wallet.problems.verifierCouldNotCheck,
    ];
    for (const sentence of sentences) assert.ok(sentence.trim().length > 3 && !JARGON.test(sentence) && !CLAIMS.test(sentence), `${locale}: "${sentence}"`);
    assert.ok(wallet.certnetAbout.includes('CertNet'));
  }
  // Vietnamese is written with its diacritics.
  for (const sentence of [T.vi.certnetNote, T.vi.reasons.DID_RESOLUTION_UNAVAILABLE, W.vi.problems.certnetUnavailable, W.vi.problems.offerNeedsCertNet, W.vi.problems.verifierCouldNotCheck]) {
    assert.match(sentence, /[ăâđêôơưàáạảãằắặẳẵầấậẩẫèéẹẻẽềếệểễìíịỉĩòóọỏõồốộổỗờớợởỡùúụủũừứựửữỳýỵỷỹ]/i);
  }
});

test('a build made with the test-only CertNet switch marks every CertNet result and the trial wallet; any other build shows no marker', () => {
  const result = (r: SessionResult, testBuild?: boolean) =>
    renderToStaticMarkup(createElement(ApplyJobVerifierResult, { result: r, copy: T.vi, language: 'vi', verifierName: 'X', ...(testBuild === undefined ? {} : { testBuild }) }));
  const marker = 'data-testid="certnet-test-build"';
  for (const r of [didSuccess, didFailure('did_resolution', 'DID_RESOLUTION_UNAVAILABLE'), didFailure('status', 'REVOKED')]) {
    assert.ok(result(r, true).includes(marker), 'a CertNet result in a test build');
    assert.ok(textOf(result(r, true)).includes(T.vi.testBuildMarker));
    assert.ok(!result(r).includes(marker), 'this build (no switch): no marker');
  }
  assert.ok(!result(X509_CASES.verified!, true).includes(marker), 'a certificate result is not a CertNet result');
  const panel = (testBuild?: boolean) => renderToStaticMarkup(createElement(DemoWalletPanel, {
    locale: 'vi', inbox: null, generation: 0, clockOffsetMs: 0, onEvent: () => undefined, ...(testBuild === undefined ? {} : { testBuild }),
  }));
  assert.ok(panel(true).includes(marker) && textOf(panel(true)).includes(W.vi.testBuildMarker));
  assert.ok(!panel().includes(marker));
  for (const locale of LOCALES) assert.match(T[locale].testBuildMarker, /CertNet/, locale);
});

test('a passing CertNet result with a very long identifier (250 characters) shows it complete, wrapped; never a nameless success', () => {
  const did = `did:certnet:testnet:${'a1B2_c3-'.repeat(29)}x`.slice(0, 250);
  assert.equal(did.length, 250);
  assert.equal(certNetIssuerId(did), did, 'any identifier of the SDK\'s form, whatever its length');
  for (const locale of LOCALES) {
    const copy = T[locale];
    const html = render({ ...didSuccess, issuerDid: did }, locale);
    assert.equal(textOf(html.match(/<bdi [^>]*data-testid="issuer-did-full"[^>]*>[\s\S]*?<\/bdi>/)![0]).trim(), did, `${locale}: the complete identifier`);
    assert.ok(textOf(html.match(/data-group="signer"[\s\S]*?<\/li>/)![0]).includes(did), `${locale}: the signer line names it`);
    assert.ok(!textOf(html).includes(copy.groups.signerCertNet), `${locale}: not the generic line without an issuer`);
    assert.match(html, /\[overflow-wrap:anywhere\][^>]*>did:<wbr\/>certnet:<wbr\/>testnet:<wbr\/>/, `${locale}: wraps`);
  }
});

test('the CertNet note under an employer result says how the issuer is looked up, not that it was checked (amber outcome too)', () => {
  const lookedUp = { vi: 'được tra cứu qua CertNet', en: 'looked up through CertNet', es: 'se consulta a través de CertNet', ja: 'CertNet で照会しています', de: 'über CertNet nachgeschlagen' } as const;
  const checked = /kiểm tra qua CertNet|checked through CertNet|comprueba|で確認しています|geprüft/;
  for (const locale of LOCALES) {
    const copy = T[locale];
    for (const note of [copy.certnetNote, copy.issuerIdNote]) {
      assert.ok(note.includes(lookedUp[locale]) && !checked.test(note), `${locale}: "${note}"`);
    }
    const amber = render(didFailure('did_resolution', 'DID_RESOLUTION_UNAVAILABLE'), locale);
    assert.match(amber, /data-outcome="unchecked"/);
    assert.ok(textOf(amber).includes(copy.certnetNote), `${locale}: the note under "could not be checked right now"`);
  }
});
