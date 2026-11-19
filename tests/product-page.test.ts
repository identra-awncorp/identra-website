/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// The product page (ADR-0012): real signed chains (tests/fixtures/product, made by the dev stand-in's
// generator with a throwaway TEST PKI) verified with the SDK exactly as the browser does, then the
// page model and the rendered page. Covers the record's mandated security tests 2, 3 and 4, the four
// page verdicts (verified, in progress, unchecked, failed), the device-clock case and every error state.
import assert from 'node:assert/strict';
import { X509Certificate } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import type { Check } from '@identra/sdk-client';
import { createProductVerifier, type ProductChainResult, type ProductView } from '@identra/sdk-client/product';
import { parseDigitalLinkPath } from '@identra/sdk-core';
import { ProductPageView, type ProductLocale, type ProductPhase } from '../src/components/ProductPage';
import ProductStageItem from '../src/components/ProductStageItem';
import {
  CLOCK_SKEW_HINT_SECONDS,
  PRODUCT_REASON_KEYS,
  chainBrokenReason,
  clockDifference,
  pickProductLocale,
  productReasonKey,
  toProductPageModel,
  type CheckedProductModel,
  type ProductPageModel,
  type StageRow,
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
const DAY = 86_400_000;
const vi = PRODUCT_PAGE_TRANSLATIONS.vi;
const en = PRODUCT_PAGE_TRANSLATIONS.en;

type Override = (path: string) => Response | null | Promise<Response | null>;
const eventsPath = (serial: string) => `/v1/products/${GTIN}/${serial}/events`;
const fixtureEvents = (serial: string): unknown[] =>
  (JSON.parse(fixture.responses[`${fixture.canonicalOrigin}${eventsPath(serial)}`]!.body) as { events: unknown[] }).events;
const jsonResponse = (status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
/** Serves `events` as the store's answer for `serial` (an unsigned, possibly hostile envelope). */
const serveEvents = (serial: string, events: unknown[]): Override => (path) =>
  path === eventsPath(serial) ? jsonResponse(200, { gtin: GTIN, serial, serverTime: new Date(fixture.now).toISOString(), events }) : null;

/** Verifies a fixture product like the page does, recording every URL the verifier requests. */
const verify = async (serial: string, { nowOffsetMs = 0, override }: { nowOffsetMs?: number; override?: Override } = {}) => {
  const requested: string[] = [];
  let eventsHttpStatus: number | null = null;
  const fetchImpl = (async (input: RequestInfo | URL) => {
    const url = String(input).replace(API, fixture.canonicalOrigin);
    const path = url.replace(fixture.canonicalOrigin, '');
    requested.push(path);
    const overridden = override ? await override(path) : null;
    const stored = fixture.responses[url];
    const response = overridden
      ?? (stored
        ? new Response(stored.body, { status: stored.status, headers: { 'content-type': stored.contentType } })
        : jsonResponse(404, { statusCode: 404, code: 'NOT_FOUND', message: 'not found' }));
    if (path.endsWith('/events')) eventsHttpStatus = response.status;
    return response;
  }) as typeof fetch;
  const view = await createProductVerifier({
    apiBaseUrl: API,
    rootCertificates: [new Uint8Array(new X509Certificate(fixture.rootPem).raw)],
    fetch: fetchImpl,
    now: () => fixture.now + nowOffsetMs,
  }).load(GTIN, serial);
  return { view, model: toProductPageModel(view, eventsHttpStatus), requested };
};

const checked = (model: ProductPageModel): CheckedProductModel => {
  assert.equal(model.kind, 'checked');
  return model as CheckedProductModel;
};

const renderRow = (row: StageRow, locale: ProductLocale = 'vi') => renderToStaticMarkup(createElement(ProductStageItem, {
  row,
  copy: PRODUCT_PAGE_TRANSLATIONS[locale],
  locale,
  isLast: false,
}));

const renderPage = (model: ProductPageModel | null, { locale = 'vi' as ProductLocale, phase = 'done' as ProductPhase, product = { gtin: GTIN, serial: 'SN-2026-000001' } as { gtin: string; serial: string } | null } = {}) =>
  renderToStaticMarkup(createElement(ProductPageView, { locale, onLocaleChange: () => {}, product, phase, model, onRecheck: () => {} }));

/** The verdict panel of a rendered page: its data attributes, classes, heading and sentence. */
const verdictOf = (html: string) => {
  const panel = /<div data-verdict="([^"]+)" data-tone="([^"]+)" class="([^"]+)">[\s\S]*?<h1[^>]*>([\s\S]*?)<\/h1><p[^>]*>([\s\S]*?)<\/p>/.exec(html);
  assert.ok(panel, 'verdict panel rendered');
  return { verdict: panel[1], tone: panel[2], className: panel[3], title: decode(panel[4]!), body: decode(panel[5]!) };
};
/** Per rendered step: outcome, marker classes, pill and sentence. */
const stepsOf = (html: string) => [...html.matchAll(/<li data-outcome="([^"]+)"[\s\S]*?data-marker="[^"]+" class="([^"]+)"[\s\S]*?<h3[^>]*>([^<]*)<\/h3><span class="([^"]+)">([^<]*)<\/span><\/div>(?:<p class="([^"]+)">([^<]*)<\/p>)?/g)]
  .map((m) => ({ outcome: m[1], marker: m[2]!, title: decode(m[3]!), pillClass: m[4]!, pill: decode(m[5]!), messageClass: m[6] ?? null, message: m[7] === undefined ? null : decode(m[7]) }));
const decode = (text: string) => text.replace(/&#x27;/g, '\'').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const RED = /\b(bg-rose-700|bg-rose-50|text-rose-800|bg-rose-100)\b/;
const GREEN = /\b(bg-emerald-700|bg-emerald-600|bg-emerald-50)\b/;

test('the path is parsed by the SDK only: exactly /01/<GTIN-14>/21/<serial>', () => {
  assert.deepEqual(parseDigitalLinkPath('/01/09520123456788/21/SN-2026-000001'), { gtin: GTIN, serial: 'SN-2026-000001' });
  for (const bad of ['/01/09520123456789/21/SN-1', '/01/09520123456788/21/SN-1/', '/01/9520123456788/21/SN-1', '/01/09520123456788', '/01/09520123456788/10/LOT/21/SN']) {
    assert.equal(parseDigitalLinkPath(bad), null, bad);
  }
});

test('verified: green panel, three green steps with who signed, the past-tense device panel', async () => {
  const model = checked((await verify('SN-2026-000001')).model);
  assert.equal(model.verdict, 'verified');
  assert.deepEqual(model.rows.map((row) => row.outcome), ['ok', 'ok', 'ok']);
  assert.deepEqual(model.rows.map((row) => row.event?.issuer.maToChuc), ['VATVN-0100000002', 'VATVN-0100000003', 'VATVN-0100000004']);
  assert.equal(model.firstProblem, null);
  const html = renderPage(model);
  const verdict = verdictOf(html);
  assert.deepEqual([verdict.verdict, verdict.tone, verdict.title, verdict.body], ['verified', 'positive', vi.verifiedTitle, vi.verifiedBody]);
  assert.match(verdict.className, /\bbg-emerald-700\b/);
  const steps = stepsOf(html);
  assert.deepEqual(steps.map((s) => [s.title, s.pill, s.message]), [['Sản xuất', 'Đã kiểm chứng', null], ['Kiểm định', 'Đã kiểm chứng', null], ['Phân phối', 'Đã kiểm chứng', null]]);
  for (const step of steps) assert.match(step.marker, /\bbg-emerald-600\b/);
  assert.ok(!RED.test(html), 'nothing red on a verified page');
  assert.ok(html.includes('Công ty Sản xuất Mẫu (DEMO)'));
  assert.match(html, /data-device="checked"[\s\S]*Trình duyệt của bạn đã tự kiểm tra chữ ký/);
  assert.match(html, /\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}/, 'dates as 10/11/2026, 03:12');
});

test('in progress with two stages: calm panel, "đã qua kiểm định; phân phối chưa được ghi nhận", a dashed third step', async () => {
  const model = checked((await verify('SN-2026-000002')).model);
  assert.equal(model.verdict, 'in_progress');
  assert.equal(model.currentStage, 'kiem_dinh');
  assert.deepEqual(model.missingStages, ['phan_phoi']);
  assert.deepEqual(model.rows.map((row) => row.outcome), ['ok', 'ok', 'missing']);
  const html = renderPage(model);
  const verdict = verdictOf(html);
  assert.deepEqual([verdict.verdict, verdict.tone, verdict.title], ['in_progress', 'progress', vi.inProgressTitle]);
  assert.equal(verdict.body, 'Sản phẩm đã qua công đoạn kiểm định; công đoạn phân phối chưa được ghi nhận.');
  assert.equal(verdictOf(renderPage(model, { locale: 'en' })).body, 'The product has passed the inspection stage; the distribution stage has not been recorded yet.');
  const third = stepsOf(html)[2]!;
  assert.deepEqual([third.outcome, third.pill, third.message], ['missing', 'Chưa có', vi.missingMessage]);
  assert.match(third.marker, /border-dashed/);
  assert.ok(!RED.test(html));
});

test('in progress with one stage: both missing stages are named, plural in English', async () => {
  const model = checked((await verify('SN-2026-000001', { override: serveEvents('SN-2026-000001', fixtureEvents('SN-2026-000001').slice(0, 1)) })).model);
  assert.equal(model.verdict, 'in_progress');
  assert.equal(verdictOf(renderPage(model)).body, 'Sản phẩm đã qua công đoạn sản xuất; công đoạn kiểm định và phân phối chưa được ghi nhận.');
  assert.equal(verdictOf(renderPage(model, { locale: 'en' })).body, 'The product has passed the production stage; the inspection and distribution stages have not been recorded yet.');
});

test('a revoked step is red with a red marker, still names who signed it, and is the failed verdict\'s first problem', async () => {
  const model = checked((await verify('SN-REVOKED')).model);
  assert.equal(model.verdict, 'failed');
  assert.deepEqual(model.rows.map((row) => row.outcome), ['ok', 'revoked', 'ok']);
  assert.equal(model.rows[1]!.event?.issuer.maToChuc, 'VATVN-0100000003');
  assert.deepEqual(model.firstProblem, { stage: 'kiem_dinh', outcome: 'revoked', reasonKey: 'REVOKED' });
  const html = renderPage(model);
  const verdict = verdictOf(html);
  assert.deepEqual([verdict.verdict, verdict.tone, verdict.title, verdict.body], ['failed', 'negative', vi.failedTitle, 'Ở công đoạn kiểm định: Bên ký đã thu hồi xác nhận này.']);
  assert.match(verdict.className, /\bbg-rose-700\b/);
  assert.ok(!GREEN.test(verdict.className), 'a failed chain never gets a green panel');
  const step = stepsOf(html)[1]!;
  assert.deepEqual([step.pill, step.message], ['Đã bị thu hồi', 'Bên ký đã thu hồi xác nhận này.']);
  assert.match(step.marker, /\bbg-rose-700\b/);
  assert.ok(!GREEN.test(step.marker) && !GREEN.test(step.pillClass), 'no green on a revoked step');
  assert.ok(renderRow(model.rows[1]!).includes('Trung tâm Kiểm định Mẫu (DEMO)'));
  // Some steps were verified: the device panel speaks in the past tense, without the "genuine record" limits.
  assert.match(html, /data-device="checked"/);
  assert.ok(!html.includes(vi.limitsTitle));
});

test('ADR-0012 requirement 3: a signer outside the trust list shows no event text and causes no request for it', async () => {
  const { model, requested } = await verify('SN-UNTRUSTED');
  const page = checked(model);
  assert.equal(page.verdict, 'failed');
  assert.equal(page.rows[1]!.outcome, 'untrusted');
  assert.equal(page.rows[1]!.event, undefined);
  const html = renderRow(page.rows[1]!);
  const [step] = stepsOf(html);
  assert.deepEqual([step!.pill, step!.message], ['Không rõ bên ký', vi.reasons.ISSUER_NOT_TRUSTED]);
  assert.match(step!.marker, /\bbg-rose-700\b/);
  assert.ok(!/Bên ký<\/dt>/.test(html), 'no signer, place or description from the event');
  // Only the events, the trust list and the status lists of recognised issuers: nothing on behalf of the stranger.
  const allowed = new Set(['/v1/products/09520123456788/SN-UNTRUSTED/events', '/trust-list', '/issuers/nha-san-xuat/status/1', '/issuers/phan-phoi/status/1']);
  assert.deepEqual(requested.filter((url) => !allowed.has(url)), []);
  assert.ok(!requested.some((url) => url.includes('to-chuc-chua-dang-ky') || url.includes('kiem-dinh')));
});

test('a tampered step fails its own signature and the next step "does not link to the previous one"', async () => {
  const model = checked((await verify('SN-TAMPERED')).model);
  assert.equal(model.verdict, 'failed');
  assert.deepEqual(model.rows.map((row) => [row.outcome, row.reasonKey]), [['ok', null], ['failed', 'SIGNATURE_INVALID'], ['broken', 'CHAIN_LINK']]);
  assert.equal(model.rows[1]!.event, undefined);
  const steps = stepsOf(renderPage(model));
  assert.deepEqual(steps.slice(1).map((s) => [s.pill, s.message]), [['Không hợp lệ', vi.reasons.SIGNATURE_INVALID], ['Không khớp', 'Bước này không nối đúng với bước trước.']]);
});

test('CHAIN_BROKEN by cause and position: another product, wrong order, a broken link, dates', async () => {
  // Another product's genuine events: every step "does not belong to this product", including the first.
  const other = checked((await verify('SN-2026-000002', { override: serveEvents('SN-2026-000002', fixtureEvents('SN-2026-000001')) })).model);
  assert.deepEqual(other.rows.map((row) => row.reasonKey), ['CHAIN_NOT_THIS_PRODUCT', 'CHAIN_NOT_THIS_PRODUCT', 'CHAIN_NOT_THIS_PRODUCT']);
  assert.equal(stepsOf(renderPage(other))[0]!.message, 'Bản ghi này không thuộc sản phẩm này hoặc sai thứ tự công đoạn.');
  // Reversed order: the first step never "fails to link to the previous one" (it has none).
  const reversed = checked((await verify('SN-2026-000001', { override: serveEvents('SN-2026-000001', [...fixtureEvents('SN-2026-000001')].reverse()) })).model);
  assert.deepEqual(reversed.rows.map((row) => row.reasonKey), ['CHAIN_NOT_THIS_PRODUCT', 'CHAIN_LINK', 'CHAIN_NOT_THIS_PRODUCT']);
  assert.equal(verdictOf(renderPage(reversed)).body, 'Ở công đoạn sản xuất: Bản ghi này không thuộc sản phẩm này hoặc sai thứ tự công đoạn.');
  // A fourth event: an extra step after distribution.
  const four = checked((await verify('SN-2026-000001', { override: serveEvents('SN-2026-000001', [...fixtureEvents('SN-2026-000001'), fixtureEvents('SN-2026-000001')[2]]) })).model);
  assert.deepEqual(four.extraRows.map((row) => [row.outcome, row.reasonKey]), [['broken', 'CHAIN_EXTRA_STAGE']]);
  assert.equal(stepsOf(renderPage(four))[3]!.title, vi.extraStage);
  // The SDK's details, by position; an unknown detail never claims a link for the first step.
  assert.equal(chainBrokenReason('thoi_diem is earlier than the event before', 2), 'CHAIN_DATE_BACKWARDS');
  assert.equal(chainBrokenReason('thoi_diem is later than the event was signed', 1), 'CHAIN_DATE_AFTER_SIGNING');
  assert.equal(chainBrokenReason('thoi_diem is not an ISO 8601 UTC instant', 1), 'MALFORMED');
  assert.equal(chainBrokenReason('something new', 0), 'CHAIN_NOT_THIS_PRODUCT');
  assert.equal(chainBrokenReason('something new', 1), 'CHAIN_BROKEN');
  assert.equal(chainBrokenReason(undefined, 3), 'CHAIN_EXTRA_STAGE');
});

test('ADR-0012 requirement 4: 21 events are refused before any request; the timeline is hidden and the reason said plainly', async () => {
  const { model, requested } = await verify('SN-21');
  const page = checked(model);
  assert.equal(page.verdict, 'failed');
  assert.equal(page.listProblem, 'TOO_LARGE');
  assert.deepEqual(requested, ['/v1/products/09520123456788/SN-21/events']);
  const html = renderPage(page);
  assert.equal(verdictOf(html).body, vi.listTooLarge);
  assert.ok(!html.includes('id="product-timeline"'), 'no three dashed "not yet" steps under a red verdict');
  assert.match(html, /data-device="note"/, 'nothing was checked: no past-tense device panel');
});

test('an empty or malformed event list: "the server sent a record that cannot be read", no timeline', async () => {
  for (const events of [[], [1, null, {}]]) {
    const page = checked((await verify('SN-2026-000001', { override: serveEvents('SN-2026-000001', events) })).model);
    assert.equal(page.listProblem, 'MALFORMED');
    const html = renderPage(page);
    assert.deepEqual([verdictOf(html).verdict, verdictOf(html).body], ['failed', vi.listUnreadable]);
    assert.ok(!html.includes('id="product-timeline"'));
  }
});

test('ADR-0012 requirement 2: HTML in mo_ta / dia_diem renders as visible text, URLs are not links', async () => {
  const model = checked((await verify('SN-HTML')).model);
  assert.equal(model.verdict, 'verified');
  const html = model.rows.map((row) => renderRow(row)).join('');
  assert.ok(!/<script\b/i.test(html), 'no script element');
  assert.ok(!/<img\b/i.test(html), 'no img element');
  assert.ok(html.includes('&lt;script&gt;alert(1)&lt;/script&gt;'));
  assert.ok(html.includes('&lt;img src=x onerror=alert(1)&gt;'));
  assert.ok(html.includes('https://evil.example/'));
  assert.ok(!html.includes('href="https://evil.example'), 'not auto-linked');
  assert.match(html, /<bdi>[^<]*&lt;script&gt;/);
});

const trustListDown: Override = (path) => (path === '/trust-list' ? jsonResponse(500, { code: 'INTERNAL_ERROR' }) : null);
const statusDown: Override = (path) => (path.startsWith('/issuers/kiem-dinh/status/') ? jsonResponse(503, { code: 'UNAVAILABLE' }) : null);

test('H1 trust list unreachable: "could not check" in amber, amber steps, retry first; never red, never green', async () => {
  for (const override of [trustListDown, (path: string) => (path === '/trust-list' ? new Response('eyJhbGciOiJub25lIn0.eyJpc3N1ZXJzIjpbXX0.', { status: 200 }) : null)]) {
    const model = checked((await verify('SN-2026-000001', { override })).model);
    assert.deepEqual([model.verdict, model.uncheckedCause], ['unchecked', 'trust_list']);
    assert.deepEqual(model.rows.map((row) => [row.outcome, row.reasonKey]), [['unchecked', 'TRUST_LIST_UNAVAILABLE'], ['unchecked', 'TRUST_LIST_UNAVAILABLE'], ['unchecked', 'TRUST_LIST_UNAVAILABLE']]);
    const html = renderPage(model);
    const verdict = verdictOf(html);
    assert.deepEqual([verdict.verdict, verdict.tone, verdict.title, verdict.body], ['unchecked', 'neutral', vi.uncheckedTitle, vi.uncheckedTrustList]);
    assert.match(verdict.className, /\bbg-amber-50\b/);
    assert.equal(stepsOf(html).length, 3);
    for (const step of stepsOf(html)) {
      // The verdict names the cause once; the steps carry only the amber pill.
      assert.deepEqual([step.pill, step.message], ['Chưa kiểm tra được', null]);
      assert.match(step.marker, /\bbg-amber-100\b/);
    }
    assert.ok(!RED.test(html) && !GREEN.test(html), 'an outage is neither a counterfeit nor a pass');
    assert.ok(!html.includes('Không hợp lệ'));
    assert.match(html, /<button type="button" class="[^"]*bg-\[#354CE1\][^"]*">.*Kiểm tra lại<\/button>/, 'the retry is the primary button');
    assert.match(html, /data-device="note"/, 'nothing was verified: no past-tense panel');
    assert.equal(stepsOf(renderRow(model.rows[0]!))[0]!.message, vi.reasons.TRUST_LIST_UNAVAILABLE, 'a step on its own still says why');
  }
});

test('H1 one status list unreachable: that step is amber "Chưa kiểm tra được hiệu lực", the others green, verdict unchecked', async () => {
  const model = checked((await verify('SN-2026-000001', { override: statusDown })).model);
  assert.deepEqual([model.verdict, model.uncheckedCause], ['unchecked', 'status']);
  assert.deepEqual(model.rows.map((row) => row.outcome), ['ok', 'unchecked', 'ok']);
  const html = renderPage(model);
  assert.deepEqual([verdictOf(html).tone, verdictOf(html).body], ['neutral', vi.uncheckedStatus]);
  const step = stepsOf(html)[1]!;
  assert.deepEqual([step.pill, step.message], ['Chưa kiểm tra được', 'Chưa kiểm tra được hiệu lực của xác nhận này.']);
  assert.ok(!RED.test(html));
  assert.match(renderRow(model.rows[1]!), /data-check="unchecked"/, 'the status check itself is amber, not a red cross');
  assert.ok(!/data-check="failed"/.test(renderRow(model.rows[1]!)));
});

test('H1 a proven problem wins over an outage: revoked + a status list down stays red and names the revocation', async () => {
  const both: Override = (path) => (path.startsWith('/issuers/nha-san-xuat/status/') ? jsonResponse(503, {}) : null);
  const model = checked((await verify('SN-REVOKED', { override: both })).model);
  assert.equal(model.verdict, 'failed');
  assert.deepEqual(model.rows.map((row) => row.outcome), ['unchecked', 'revoked', 'ok']);
  assert.deepEqual(model.firstProblem, { stage: 'kiem_dinh', outcome: 'revoked', reasonKey: 'REVOKED' });
  assert.equal(stepsOf(renderPage(model))[0]!.pill, 'Chưa kiểm tra được', 'the unreachable step is still amber, not red');
});

test('M1 device clock 2 days behind or ahead: the clock is named in days, no red step, check again', async () => {
  for (const offset of [-2 * DAY, 2 * DAY]) {
    const { view, model } = await verify('SN-2026-000001', { nowOffsetMs: offset });
    const page = checked(model);
    assert.ok(Math.abs(view.clockSkewSeconds ?? 0) > CLOCK_SKEW_HINT_SECONDS);
    assert.deepEqual([page.verdict, page.uncheckedCause], ['unchecked', 'clock'], `offset ${offset}`);
    assert.ok(page.rows.every((row) => row.outcome === 'unchecked' && row.reasonKey === 'CLOCK_WRONG'));
    for (const locale of ['vi', 'en'] as const) {
      const html = renderPage(page, { locale });
      const verdict = verdictOf(html);
      assert.equal(verdict.tone, 'neutral');
      assert.equal(verdict.title, locale === 'vi' ? 'Giờ trên máy bạn đang sai khoảng 2 ngày' : 'Your device\'s clock is off by about 2 days');
      assert.equal(verdict.body, PRODUCT_PAGE_TRANSLATIONS[locale].clockBody);
      assert.ok(!RED.test(html), 'no red per-step result');
      assert.ok(!html.includes(vi.reasons.TRUST_LIST_UNAVAILABLE) && !html.includes('phút'), 'neither a list outage nor minutes');
      assert.match(html, /<button type="button" class="[^"]*bg-\[#354CE1\][^"]*">.*(Kiểm tra lại|Check again)<\/button>/);
    }
  }
});

test('M1 the clock never excuses a proven non-time failure, and a small skew is not a clock problem', async () => {
  // Revoked with a skewed clock (synthetic skew on the real result): still red.
  const revoked = (await verify('SN-REVOKED')).view;
  assert.equal(checked(toProductPageModel({ ...revoked, clockSkewSeconds: 2 * 86_400 })).verdict, 'failed');
  // Time failures with a skew under 5 minutes: the record is blamed (it really is not valid at this time).
  const behind = (await verify('SN-2026-000001', { nowOffsetMs: -2 * DAY })).view;
  assert.equal(checked(toProductPageModel({ ...behind, clockSkewSeconds: 120 })).verdict, 'failed');
  // No skew hint at all (the store sent no serverTime): the same.
  const { clockSkewSeconds: _skew, serverTime: _time, ...noHint } = behind;
  assert.equal(checked(toProductPageModel(noHint)).verdict, 'failed');
});

test('clock differences read in human units', () => {
  assert.deepEqual(clockDifference(-172_800), { value: 2, unit: 'day' });
  assert.deepEqual(clockDifference(600), { value: 10, unit: 'minute' });
  assert.deepEqual(clockDifference(3 * 3600), { value: 3, unit: 'hour' });
  assert.deepEqual(clockDifference(89 * 60), { value: 89, unit: 'minute' });
  assert.deepEqual(clockDifference(40 * 3600), { value: 2, unit: 'day' });
});

test('not found, invalid code, network error, server error (500/429) and unreadable answers: their own states', async () => {
  const notFound = (await verify('SN-UNKNOWN')).model;
  assert.equal(notFound.kind, 'not_found');
  const network = (await verify('SN-2026-000001', { override: (path) => { if (path.endsWith('/events')) throw new TypeError('Failed to fetch'); return null; } })).model;
  assert.equal(network.kind, 'network_error');
  for (const status of [500, 429]) {
    const server = (await verify('SN-2026-000001', { override: (path) => (path.endsWith('/events') ? jsonResponse(status, {}) : null) })).model;
    assert.equal(server.kind, 'server_error', `HTTP ${status} is the server, not the shopper's network`);
  }
  const unreadable = (await verify('SN-2026-000001', { override: (path) => (path.endsWith('/events') ? new Response('<html>oops</html>', { status: 200 }) : null) })).model;
  assert.equal(unreadable.kind, 'invalid_response');

  const expectations: Array<[ProductPageModel, string, string, boolean]> = [
    [notFound, vi.notFoundTitle, vi.notFoundBody, false],
    [network, vi.networkTitle, vi.networkBody, true],
    [{ ...network, kind: 'server_error' } as ProductPageModel, vi.serverTitle, 'Máy chủ Identra đang bận hoặc gặp sự cố. Hãy thử lại sau ít phút.', true],
    [unreadable, vi.unreadableTitle, vi.unreadableBody, true],
  ];
  for (const [model, title, body, retry] of expectations) {
    const html = renderPage(model);
    const verdict = verdictOf(html);
    assert.deepEqual([verdict.verdict, verdict.tone, verdict.title, verdict.body], [model.kind, 'plain', title, body]);
    assert.equal(/Thử lại<\/button>/.test(html), retry, `${model.kind}: retry button`);
    assert.ok(!GREEN.test(html), `${model.kind}: nothing green`);
    assert.match(html, /data-device="note"/, `${model.kind}: nothing was checked, so no past-tense panel`);
    assert.ok(!html.includes(vi.deviceBody) && !html.includes('lucide-circle-check'));
  }
  const invalid = renderPage({ kind: 'invalid_code' }, { product: null });
  assert.deepEqual([verdictOf(invalid).title, verdictOf(invalid).body], [vi.invalidTitle, vi.invalidBody]);
  assert.ok(!invalid.includes('id="product-identity"') && !invalid.includes('id="product-timeline"') && !invalid.includes('</button>Thử lại'));
});

test('loading and checking: the product is shown at once, a skeleton timeline, the present-tense note only', () => {
  for (const phase of ['loading', 'checking'] as const) {
    const html = renderPage(null, { phase });
    const verdict = verdictOf(html);
    assert.deepEqual([verdict.verdict, verdict.title, verdict.body], ['loading', vi.loadingTitle, phase === 'loading' ? vi.loadingBody : vi.checkingBody]);
    assert.ok(html.includes('09520123456788') && html.includes('aria-busy="true"'));
    assert.match(html, /data-device="note"[^>]*>Trang này kiểm tra hồ sơ ngay trên máy của bạn, không qua máy chủ nào khác\.</);
    assert.ok(!html.includes(vi.deviceBody));
  }
});

test('L4 a recheck keeps its button in place, marked busy, while the previous result is re-verified', async () => {
  const model = checked((await verify('SN-2026-000002')).model);
  const html = renderPage(model, { phase: 'checking' });
  assert.equal(verdictOf(html).verdict, 'loading');
  assert.match(html, /<button type="button" aria-disabled="true"[^>]*>.*Đang kiểm tra…<\/button>/);
  assert.match(renderPage(model), /<h1 tabindex="-1"/, 'the verdict heading can take focus when the result arrives');
});

test('L5 the language buttons are 44 px high; L2 the print button sits on its own row', () => {
  const html = renderPage({ kind: 'not_found', gtin: GTIN, serial: 'SN-2026-000001', verifiedAt: new Date(fixture.now).toISOString() });
  assert.equal((html.match(/aria-pressed="(true|false)"[^>]*class="[^"]*\bmin-h-11\b/g) ?? []).length, 2);
  assert.match(html, /<div class="mt-4 print:hidden"><button type="button" class="[^"]*whitespace-nowrap[^"]*">In nhãn<\/button><\/div>/);
});

test('event text and organisation names: 500 characters at most, isolated with <bdi>; the trust list\'s name wins', async () => {
  const model = checked((await verify('SN-2026-000001')).model);
  const base = model.rows[0]!;
  const long = 'Ư'.repeat(501);
  const row: StageRow = { ...base, event: { ...base.event!, moTa: long, diaDiem: long, issuer: { maToChuc: 'VATVN-0999999999', ten: long } } };
  const html = renderRow(row);
  const cut = `${'Ư'.repeat(499)}…`;
  assert.equal((html.match(new RegExp(`<bdi>${cut}</bdi>`, 'g')) ?? []).length, 3, 'description, place and organisation each cut to 500 and isolated');
  assert.ok(!html.includes('Ư'.repeat(500)));
  // A sample organisation id: translated for English only while the trust list still says the sample name.
  const sample = renderRow(base, 'en');
  assert.ok(sample.includes('<bdi>Sample Manufacturer (DEMO)</bdi>'));
  const renamed: StageRow = { ...base, event: { ...base.event!, issuer: { maToChuc: 'VATVN-0100000002', ten: 'Công ty Cà phê Thật' } } };
  assert.ok(renderRow(renamed, 'en').includes('<bdi>Công ty Cà phê Thật</bdi>'), 'a renamed or reused id shows the trust list\'s name');
  assert.ok(renderRow(renamed, 'vi').includes('<bdi>Công ty Cà phê Thật</bdi>'));
  // N4: the title comes from the event's own stage.
  const own: StageRow = { ...base, stage: 'san_xuat', event: { ...base.event!, congDoan: 'kiem_dinh' } };
  assert.equal(stepsOf(renderRow(own))[0]!.title, 'Kiểm định');
});

// ---- The derivation, for every combination of per-step outcomes (synthetic SDK results). ----

type Kind = 'ok' | 'revoked' | 'suspended' | 'status_down' | 'trust_down' | 'untrusted' | 'signature' | 'link' | 'time';
const KINDS: Kind[] = ['ok', 'revoked', 'suspended', 'status_down', 'trust_down', 'untrusted', 'signature', 'link', 'time'];
const pass = (id: string): Check => ({ id, ok: true, code: null } as Check);
const fail = (id: string, code: string, detail?: string): Check => ({ id, ok: false, code, ...(detail ? { detail } : {}) } as Check);
const skip = (id: string): Check => ({ id, ok: false, code: 'SKIPPED', skipped: true } as Check);
const ALL = ['structure', 'algorithm', 'certificate_chain', 'signature', 'validity_time', 'credential_type', 'issuer_trust', 'status', 'product_chain'];
const checksFor = (kind: Kind): Check[] => {
  const after = (id: string, check: Check) => ALL.map((name) => (name === id ? check : pass(name)));
  switch (kind) {
    case 'ok': return ALL.map(pass);
    case 'revoked': return after('status', fail('status', 'REVOKED'));
    case 'suspended': return after('status', fail('status', 'SUSPENDED'));
    case 'status_down': return after('status', fail('status', 'STATUS_UNAVAILABLE'));
    case 'trust_down': return ALL.map((name) => (name === 'issuer_trust' ? fail(name, 'TRUST_LIST_UNAVAILABLE') : name === 'status' ? skip(name) : pass(name)));
    case 'untrusted': return ALL.map((name) => (name === 'issuer_trust' ? fail(name, 'ISSUER_NOT_TRUSTED') : name === 'status' ? skip(name) : pass(name)));
    case 'signature': return ALL.map((name, i) => (name === 'signature' ? fail(name, 'SIGNATURE_INVALID') : i < 3 ? pass(name) : skip(name)));
    case 'link': return after('product_chain', fail('product_chain', 'CHAIN_BROKEN', 'prev does not match the event before'));
    case 'time': return ALL.map((name, i) => (name === 'certificate_chain' ? fail(name, 'CERT_NOT_YET_VALID') : i < 2 ? pass(name) : skip(name)));
  }
};
const syntheticView = (kinds: Kind[], skew: number | undefined): ProductView => {
  const events = kinds.map((kind, index) => ({ index, ok: kind === 'ok', checks: checksFor(kind) }));
  const allOk = events.every((entry) => entry.ok);
  const state: ProductChainResult['state'] = allOk ? (kinds.length === 3 ? 'verified' : 'in_progress') : 'failed';
  const firstBad = events.find((entry) => !entry.ok);
  const result = {
    state, ok: state === 'verified', complete: state === 'verified',
    code: firstBad ? firstBad.checks.find((c) => !c.ok && c.code !== 'SKIPPED')!.code : null,
    missingStages: state === 'in_progress' ? ['san_xuat', 'kiem_dinh', 'phan_phoi'].slice(kinds.length) : [],
    events,
  } as unknown as ProductChainResult;
  return { state: 'ok', gtin: GTIN, serial: 'SN-X', verifiedAt: new Date(fixture.now).toISOString(), result, ...(skew === undefined ? {} : { clockSkewSeconds: skew }) };
};
const combos = (length: number): Kind[][] => (length === 0 ? [[]] : combos(length - 1).flatMap((head) => KINDS.map((kind) => [...head, kind])));

test('the page verdict for every combination of 1-3 step outcomes, with and without a wrong clock', () => {
  const AVAIL: Kind[] = ['status_down', 'trust_down'];
  let count = 0;
  for (const length of [1, 2, 3]) {
    for (const kinds of combos(length)) {
      for (const skew of [undefined, 0, 2 * 86_400, -2 * 86_400]) {
        count += 1;
        const model = checked(toProductPageModel(syntheticView(kinds, skew)));
        const bad = kinds.filter((kind) => kind !== 'ok');
        const clockWrong = skew !== undefined && Math.abs(skew) > CLOCK_SKEW_HINT_SECONDS;
        const expected = bad.length === 0 ? (length === 3 ? 'verified' : 'in_progress')
          : bad.every((kind) => AVAIL.includes(kind)) || (clockWrong && bad.every((kind) => AVAIL.includes(kind) || kind === 'time')) ? 'unchecked'
            : 'failed';
        const label = `${kinds.join(',')} skew=${skew}`;
        assert.equal(model.verdict, expected, label);
        assert.equal(model.verdict === 'verified', length === 3 && bad.length === 0, `${label}: green only when the SDK says verified`);
        const cause = expected !== 'unchecked' ? null : clockWrong ? 'clock' : bad.includes('trust_down') ? 'trust_list' : 'status';
        assert.equal(model.uncheckedCause, cause, label);
        model.rows.slice(0, length).forEach((row, index) => {
          const kind = kinds[index]!;
          const want = kind === 'ok' ? 'ok'
            : AVAIL.includes(kind) || (kind === 'time' && expected === 'unchecked') ? 'unchecked'
              : ({ revoked: 'revoked', suspended: 'suspended', untrusted: 'untrusted', signature: 'failed', link: 'broken', time: 'failed' } as Record<string, string>)[kind];
          assert.equal(row.outcome, want, `${label}: step ${index}`);
        });
        if (expected === 'failed') {
          assert.ok(model.firstProblem && !['ok', 'missing', 'unchecked'].includes(model.firstProblem.outcome), `${label}: names a proven problem first`);
        } else {
          assert.equal(model.firstProblem, null, label);
        }
      }
    }
  }
  assert.equal(count, (9 + 81 + 729) * 4);
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
  for (const code of ['DISCLOSURE_INVALID', 'KB_INVALID', 'CNF_MISMATCH']) assert.equal(productReasonKey(code), 'MALFORMED', code);
  assert.ok(!Object.values(vi.reasons).some((sentence) => /giấy chứng nhận/i.test(sentence)), 'one term: chứng thư số');
  assert.equal(vi.reasons.TOO_LARGE, 'Hồ sơ dài hoặc lớn bất thường nên trang không kiểm tra.');
  assert.equal(en.reasons.CHAIN_LINK, 'This step does not link correctly to the previous one.');
});

test('the page speaks Vietnamese or English: a saved choice first, then the browser', () => {
  assert.equal(pickProductLocale('en', ['vi-VN']), 'en');
  assert.equal(pickProductLocale(null, ['vi-VN', 'en']), 'vi');
  assert.equal(pickProductLocale('de', ['de-DE']), 'en');
  assert.equal(pickProductLocale(null, []), 'en');
});

test('L9 the product build\'s no-eval scan allows only the four known unreachable sites', async () => {
  const { unknownEvalSites } = await import('../vite.config');
  const known = [
    'r=ee.keyMap?new Function("r","return {"+o.map(s=>ee.decodeKey(s)).map(x)',
    ':new Function("r","return {"+o.map(s=>Jc.test(s)?it(s):s)',
    'try{const t=Function;return new t(""),!0}catch{return!1}',
    'compile(){const t=Function,n=this.content',
    'const label="Function";x.isFunction(y);retrieval(z)',
  ].join(';');
  assert.deepEqual(unknownEvalSites(known), []);
  for (const bad of ['eval("1")', 'new Function("return this")()', '(0,eval)(code)', 'const F=Function;new F(code)', 'Function("x")']) {
    assert.equal(unknownEvalSites(`a();${bad};b()`).length, 1, bad);
  }
});
