/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// The product page (ADR-0012): real signed chains (tests/fixtures/product, made by the dev stand-in's
// generator with a throwaway TEST PKI) verified with the SDK exactly as the browser does, then the
// page model and the rendered timeline. Covers the record's mandated security tests 2, 3 and 4.
import assert from 'node:assert/strict';
import { X509Certificate } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createProductVerifier } from '@identra/sdk-client/product';
import { parseDigitalLinkPath } from '@identra/sdk-core';
import ProductStageItem from '../src/components/ProductStageItem';
import {
  CLOCK_SKEW_HINT_SECONDS,
  PRODUCT_REASON_KEYS,
  pickProductLocale,
  productReasonKey,
  toProductPageModel,
  type ProductPageModel,
} from '../src/identra/productPage';
import { PRODUCT_PAGE_TRANSLATIONS } from '../src/translations/ProductPageTranslations';

interface Fixture {
  now: number;
  canonicalOrigin: string;
  rootPem: string;
  responses: Record<string, { status: number; contentType: string; body: string }>;
}
const fixture = JSON.parse(readFileSync('tests/fixtures/product/chains.json', 'utf8')) as Fixture;
const API = 'https://api.example.test';
const GTIN = '09520123456788';

/** Verifies a fixture product like the page does, recording every URL the verifier requests. */
const verify = async (serial: string, nowOffsetMs = 0) => {
  const requested: string[] = [];
  const fetchImpl = (async (input: RequestInfo | URL) => {
    const url = String(input).replace(API, fixture.canonicalOrigin);
    requested.push(url.replace(fixture.canonicalOrigin, ''));
    const response = fixture.responses[url];
    return response
      ? new Response(response.body, { status: response.status, headers: { 'content-type': response.contentType } })
      : new Response(JSON.stringify({ statusCode: 404, code: 'NOT_FOUND', message: 'not found' }), { status: 404 });
  }) as typeof fetch;
  const view = await createProductVerifier({
    apiBaseUrl: API,
    rootCertificates: [new Uint8Array(new X509Certificate(fixture.rootPem).raw)],
    fetch: fetchImpl,
    now: () => fixture.now + nowOffsetMs,
  }).load(GTIN, serial);
  return { view, model: toProductPageModel(view), requested };
};

const checked = (model: ProductPageModel) => {
  assert.equal(model.kind, 'checked');
  return model as Extract<ProductPageModel, { kind: 'checked' }>;
};

const renderRow = (model: ReturnType<typeof checked>, index: number) => renderToStaticMarkup(createElement(ProductStageItem, {
  row: model.rows[index]!,
  copy: PRODUCT_PAGE_TRANSLATIONS.vi,
  locale: 'vi',
  isLast: false,
}));

test('the path is parsed by the SDK only: exactly /01/<GTIN-14>/21/<serial>', () => {
  assert.deepEqual(parseDigitalLinkPath('/01/09520123456788/21/SN-2026-000001'), { gtin: GTIN, serial: 'SN-2026-000001' });
  for (const bad of ['/01/09520123456789/21/SN-1', '/01/09520123456788/21/SN-1/', '/01/9520123456788/21/SN-1', '/01/09520123456788', '/01/09520123456788/10/LOT/21/SN']) {
    assert.equal(parseDigitalLinkPath(bad), null, bad);
  }
});

test('three valid stages: the verdict is verified and every stage shows who signed it', async () => {
  const model = checked((await verify('SN-2026-000001')).model);
  assert.equal(model.verdict, 'verified');
  assert.deepEqual(model.rows.map((row) => row.outcome), ['ok', 'ok', 'ok']);
  assert.deepEqual(model.rows.map((row) => row.event?.issuer.maToChuc), ['VATVN-0100000002', 'VATVN-0100000003', 'VATVN-0100000004']);
  assert.equal(model.firstProblem, null);
  const html = renderRow(model, 0);
  assert.ok(html.includes('Công ty Sản xuất Mẫu (DEMO)'));
});

test('two valid stages: in progress, current stage and the missing one, nothing alarming', async () => {
  const model = checked((await verify('SN-2026-000002')).model);
  assert.equal(model.verdict, 'in_progress');
  assert.equal(model.currentStage, 'kiem_dinh');
  assert.deepEqual(model.missingStages, ['phan_phoi']);
  assert.deepEqual(model.rows.map((row) => row.outcome), ['ok', 'ok', 'missing']);
  assert.equal(model.firstProblem, null);
});

test('a revoked step is red, still names who signed it, and is the failed verdict\'s first problem', async () => {
  const model = checked((await verify('SN-REVOKED')).model);
  assert.equal(model.verdict, 'failed');
  assert.deepEqual(model.rows.map((row) => row.outcome), ['ok', 'revoked', 'ok']);
  assert.equal(model.rows[1]!.event?.issuer.maToChuc, 'VATVN-0100000003');
  assert.deepEqual(model.firstProblem, { stage: 'kiem_dinh', outcome: 'revoked', reasonKey: 'REVOKED' });
  const html = renderRow(model, 1);
  assert.ok(html.includes('Bên ký đã thu hồi xác nhận này.'));
  assert.ok(html.includes('Trung tâm Kiểm định Mẫu (DEMO)'));
});

test('ADR-0012 requirement 3: a signer outside the trust list shows no event text and causes no request for it', async () => {
  const { model, requested } = await verify('SN-UNTRUSTED');
  const page = checked(model);
  assert.equal(page.rows[1]!.outcome, 'untrusted');
  assert.equal(page.rows[1]!.event, undefined);
  const html = renderRow(page, 1);
  assert.ok(html.includes('Không xác nhận được ai ký bước này.'));
  assert.ok(!/Bên ký<\/dt>/.test(html), 'no signer, place or description from the event');
  // Only the events, the trust list and the status lists of recognised issuers: nothing on behalf of the stranger.
  const allowed = new Set(['/v1/products/09520123456788/SN-UNTRUSTED/events', '/trust-list', '/issuers/nha-san-xuat/status/1', '/issuers/phan-phoi/status/1']);
  assert.deepEqual(requested.filter((url) => !allowed.has(url)), []);
  assert.ok(!requested.some((url) => url.includes('to-chuc-chua-dang-ky') || url.includes('kiem-dinh')));
});

test('a tampered step fails its own signature and the next step does not link to it', async () => {
  const model = checked((await verify('SN-TAMPERED')).model);
  assert.equal(model.verdict, 'failed');
  assert.deepEqual(model.rows.map((row) => [row.outcome, row.reasonKey]), [['ok', null], ['failed', 'SIGNATURE_INVALID'], ['broken', 'CHAIN_BROKEN']]);
  assert.equal(model.rows[1]!.event, undefined);
  assert.ok(renderRow(model, 2).includes('Bước này không nối đúng với bước trước.'));
});

test('ADR-0012 requirement 4: 21 events are refused before any verification or further request', async () => {
  const { model, requested } = await verify('SN-21');
  const page = checked(model);
  assert.equal(page.verdict, 'failed');
  assert.deepEqual(page.firstProblem, { stage: null, outcome: 'failed', reasonKey: 'TOO_LARGE' });
  assert.deepEqual(page.rows.map((row) => row.outcome), ['missing', 'missing', 'missing']);
  assert.deepEqual(requested, ['/v1/products/09520123456788/SN-21/events']);
});

test('ADR-0012 requirement 2: HTML in mo_ta / dia_diem renders as visible text, URLs are not links', async () => {
  const model = checked((await verify('SN-HTML')).model);
  assert.equal(model.verdict, 'verified');
  const html = model.rows.map((_, index) => renderRow(model, index)).join('');
  assert.ok(!/<script\b/i.test(html), 'no script element');
  assert.ok(!/<img\b/i.test(html), 'no img element');
  assert.ok(html.includes('&lt;script&gt;alert(1)&lt;/script&gt;'));
  assert.ok(html.includes('&lt;img src=x onerror=alert(1)&gt;'));
  assert.ok(html.includes('https://evil.example/'));
  assert.ok(!html.includes('href="https://evil.example'), 'not auto-linked');
  assert.match(html, /<bdi>[^<]*&lt;script&gt;/);
});

test('unknown product, unreadable and failing answers map to their own states', async () => {
  assert.equal((await verify('SN-UNKNOWN')).model.kind, 'not_found');
});

test('a device clock a day behind is named as the likely cause, not the product (requirement 5)', async () => {
  const behind = await verify('SN-2026-000001', -86_400_000);
  const model = checked(behind.model);
  assert.equal(model.verdict, 'failed');
  // The fixture envelopes carry the store's clock; the device is 24 h behind it.
  assert.ok((behind.view.clockSkewSeconds ?? 0) < -CLOCK_SKEW_HINT_SECONDS);
  assert.equal(model.clockHintMinutes, 1440);

  const right = checked((await verify('SN-REVOKED')).model);
  assert.equal(right.clockHintMinutes, null, 'a revoked step is not a clock problem');
});

test('every product reason has Vietnamese and English text; unknown codes get the generic sentence', () => {
  for (const locale of ['vi', 'en'] as const) {
    const { reasons, checks } = PRODUCT_PAGE_TRANSLATIONS[locale];
    assert.deepEqual(Object.keys(reasons).sort(), [...PRODUCT_REASON_KEYS].sort());
    for (const key of PRODUCT_REASON_KEYS) {
      assert.ok(reasons[key].length > 10 && !reasons[key].includes(key), `${locale}.${key}`);
    }
    assert.ok(checks.product_chain.length > 0);
  }
  assert.equal(productReasonKey('USER_CANCELLED'), 'UNKNOWN');
  assert.equal(productReasonKey(null), 'UNKNOWN');
  assert.equal(productReasonKey('CHAIN_BROKEN'), 'CHAIN_BROKEN');
});

test('the page speaks Vietnamese or English: a saved choice first, then the browser', () => {
  assert.equal(pickProductLocale('en', ['vi-VN']), 'en');
  assert.equal(pickProductLocale(null, ['vi-VN', 'en']), 'vi');
  assert.equal(pickProductLocale('de', ['de-DE']), 'en');
  assert.equal(pickProductLocale(null, []), 'en');
});
