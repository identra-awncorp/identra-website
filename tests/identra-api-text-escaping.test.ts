/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Strings that came from the API are rendered as text: HTML payloads come out escaped, never as markup.
import assert from 'node:assert/strict';
import test from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import type { SessionResult } from '@identra/sdk-client';
import IdentraQrCode from '../src/components/IdentraQrCode';
import { ApplyJobVerifierResult } from '../src/components/demo/ApplyJobVerifierDialog';
import { APPLY_JOB_VERIFIER_DIALOG_TRANSLATIONS } from '../src/translations/demo/ApplyJobVerifierDialogTranslations';

const SCRIPT = '<script>alert(1)</script>';
const IMG = '<img src=x onerror=alert(1)>';

const hostileResult: SessionResult = {
  ok: true,
  checks: [{ id: 'structure', ok: true, code: null }],
  claims: {
    ho_ten: SCRIPT,
    nganh: IMG,
    hang_tot_nghiep: `${'Á'.repeat(700)}`,
    '<b>tên</b>': '"><svg onload=alert(1)>',
  },
  issuer: { maToChuc: 'truong-mau', ten: IMG },
  verifiedAt: '2026-11-19T01:00:00.000Z',
};

const render = (result: SessionResult, verifierName = SCRIPT) => renderToStaticMarkup(createElement(ApplyJobVerifierResult, {
  result,
  verifierName,
  copy: APPLY_JOB_VERIFIER_DIALOG_TRANSLATIONS.vi,
  language: 'vi',
}));

test('claims, claim names, issuer and verifier names are escaped', () => {
  const html = render(hostileResult);
  assert.ok(!html.includes('<script'), 'no script element');
  assert.ok(!/<img\b/i.test(html), 'no img element');
  assert.ok(!/<svg\b[^>]*onload/i.test(html), 'no svg with handler');
  assert.ok(!html.includes('<b>'), 'no markup from a claim name');
  assert.ok(html.includes('&lt;script&gt;alert(1)&lt;/script&gt;'));
  assert.ok(html.includes('&lt;img src=x onerror=alert(1)&gt;'));
  assert.ok(html.includes('&quot;&gt;&lt;svg onload=alert(1)&gt;'));
});

test('a long claim value is cut to 500 characters', () => {
  const html = render(hostileResult, 'Nhà tuyển dụng mẫu (DEMO)');
  const longest = Math.max(...[...html.matchAll(/Á+…?/g)].map((match) => Array.from(match[0]).length));
  assert.equal(longest, 500);
});

test('a failed result shows no shared fields at all', () => {
  const html = render({ ...hostileResult, ok: false, checks: [{ id: 'status', ok: false, code: 'REVOKED' }], claims: undefined });
  assert.ok(html.includes(APPLY_JOB_VERIFIER_DIALOG_TRANSLATIONS.vi.reasons.REVOKED));
  assert.ok(!html.includes(APPLY_JOB_VERIFIER_DIALOG_TRANSLATIONS.vi.sharedTitle));
});

test('the QR code is drawn as one SVG path whatever the payload contains', () => {
  const html = renderToStaticMarkup(createElement(IdentraQrCode, {
    value: `openid4vp://?request_uri=${SCRIPT}`,
    label: IMG,
  }));
  assert.ok(html.startsWith('<svg'));
  assert.ok(!html.includes('<script'));
  assert.ok(!/<img\b/i.test(html));
  assert.match(html, /aria-label="&lt;img src=x onerror=alert\(1\)&gt;"/);
  assert.match(html, /<path d="(M\d+ \d+h1v1h-1z)+"/);
});
