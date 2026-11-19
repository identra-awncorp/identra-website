/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Strings that came from the API are rendered as text: HTML payloads come out escaped, never as markup.
import assert from 'node:assert/strict';
import test from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { PRESENTATION_CHECK_IDS, type SessionResult } from '@identra/sdk-client';
import IdentraQrCode from '../src/components/IdentraQrCode';
import { ApplyJobVerifierResult } from '../src/components/demo/ApplyJobVerifierDialog';
import { APPLY_JOB_VERIFIER_DIALOG_TRANSLATIONS } from '../src/translations/demo/ApplyJobVerifierDialogTranslations';
import { IDENTRA_ORGANISATION_NAME_TRANSLATIONS } from '../src/translations/IdentraOrganisationNameTranslations';

const SCRIPT = '<script>alert(1)</script>';
const IMG = '<img src=x onerror=alert(1)>';

const hostileResult: SessionResult = {
  ok: true,
  checks: PRESENTATION_CHECK_IDS.map((id) => ({ id, ok: true, code: null })),
  claims: {
    ho_ten: SCRIPT,
    nganh: IMG,
    hang_tot_nghiep: `${'Á'.repeat(700)}`,
    '<b>tên</b>': '"><svg onload=alert(1)>',
  },
  // An organisation the page does not know keeps the server's name, escaped.
  issuer: { maToChuc: 'VATVN-0999999999', ten: IMG },
  verifiedAt: '2026-11-19T01:00:00.000Z',
};

const render = (result: SessionResult) => renderToStaticMarkup(createElement(ApplyJobVerifierResult, {
  result,
  copy: APPLY_JOB_VERIFIER_DIALOG_TRANSLATIONS.vi,
  language: 'vi',
}));

test('claims, claim names and issuer names are escaped and isolated in <bdi>', () => {
  const html = render(hostileResult);
  assert.ok(!html.includes('<script'), 'no script element');
  assert.ok(!/<img\b/i.test(html), 'no img element');
  assert.ok(!/<svg\b[^>]*onload/i.test(html), 'no svg with handler');
  assert.ok(!html.includes('<b>'), 'no markup from a claim name');
  assert.ok(html.includes('&lt;script&gt;alert(1)&lt;/script&gt;'));
  assert.ok(html.includes('&lt;img src=x onerror=alert(1)&gt;'));
  assert.ok(html.includes('&quot;&gt;&lt;svg onload=alert(1)&gt;'));
  assert.ok(html.includes('<bdi>&lt;script&gt;alert(1)&lt;/script&gt;</bdi>'));
});

test('a known sample issuer is shown by its localised name; a failure shows no issuer row at all', () => {
  // Organisations are identified by maToChuc = VATVN-<tax code>, never by a slug.
  const known = render({ ...hostileResult, issuer: { maToChuc: 'VATVN-0100000001', ten: 'Server name' } });
  assert.ok(known.includes(IDENTRA_ORGANISATION_NAME_TRANSLATIONS.vi['VATVN-0100000001']));
  assert.ok(!known.includes('Server name'));
  const failed = render({ ok: false, checks: [{ id: 'status', ok: false, code: 'REVOKED' }], verifiedAt: hostileResult.verifiedAt });
  assert.ok(!failed.includes(APPLY_JOB_VERIFIER_DIALOG_TRANSLATIONS.vi.issuedBy));
});

test('a long claim value is cut to 500 characters', () => {
  const html = render(hostileResult);
  const longest = Math.max(...[...html.matchAll(/Á+…?/g)].map((match) => Array.from(match[0]).length));
  assert.equal(longest, 500);
});

test('a failed result shows no shared fields at all', () => {
  const html = render({ ok: false, checks: [{ id: 'status', ok: false, code: 'REVOKED' }], verifiedAt: hostileResult.verifiedAt });
  // The reason is given once (in the headline), not repeated under the check.
  assert.equal(html.split(APPLY_JOB_VERIFIER_DIALOG_TRANSLATIONS.vi.reasons.REVOKED).length - 1, 1);
  assert.ok(!html.includes(APPLY_JOB_VERIFIER_DIALOG_TRANSLATIONS.vi.sharedTitle));
});

test('the QR code is drawn as one SVG path whatever the payload contains', () => {
  const html = renderToStaticMarkup(createElement(IdentraQrCode, {
    value: `openid4vp://?request_uri=${SCRIPT}`,
    label: IMG,
    fallback: 'fallback',
  }));
  assert.ok(html.startsWith('<svg'));
  assert.ok(!html.includes('<script'));
  assert.ok(!/<img\b/i.test(html));
  assert.match(html, /aria-label="&lt;img src=x onerror=alert\(1\)&gt;"/);
  assert.match(html, /<path d="(M\d+ \d+h1v1h-1z)+"/);
});

test('a value too long for a QR code renders the fallback instead of throwing', () => {
  const html = renderToStaticMarkup(createElement(IdentraQrCode, { value: 'A'.repeat(5000), label: 'qr', fallback: createElement('p', null, 'use the link') }));
  assert.equal(html, '<p>use the link</p>');
});
