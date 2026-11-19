#!/usr/bin/env node
/**
 * dev-identra-products.mjs: DEVELOPMENT ONLY. Never deployed, never imported by src/.
 *
 * Real signed product-event chains (ADR-0012, identra-server/docs/vc-api.md §3 and §7) for the
 * dev stand-in (scripts/dev-identra-api.mjs imports this lazily) and for offline unit-test fixtures,
 * so @identra/sdk-client/product genuinely verifies in development and in tests.
 *
 * How it is made
 *   1. A DEMO PKI in .dev-identra/pki/ (git-ignored; private keys live ONLY there), by the SDK's
 *      scripts/pki/make-demo-pki.sh (canonical identifiers https://api-identra.awncorp.vn/issuers/<org>),
 *      plus one extra vc-product leaf issued by identra-pki.sh under the same Issuing CA for an
 *      organisation that is NOT in the trust list (to-chuc-chua-dang-ky, VATVN-0100000009).
 *      Reused while its root is less than a day old, otherwise regenerated.
 *   2. Trust-list content from the SDK's make-trust-list-source.mjs; signed by sdk-server
 *      createTrustListService (24 h exp, re-signed hourly when asked). Status lists by
 *      createStatusListService over in-memory storage (index allocation, revoke / suspend, 24 h exp,
 *      re-signed on change or hourly when asked). Honest chains by appendProductEvent (which first
 *      verifies the stored events, like the server's gate); hostile ones by sdk-core issueProductEvent.
 *   3. The root PEM is copied to .dev-identra/root-ca.pem: run Vite with
 *      IDENTRA_ROOT_CA_FILE=.dev-identra/root-ca.pem so the page pins this dev root.
 *   Chains and status lists are re-signed on every start (fast); only the PKI is reused.
 *
 * Organisations (maToChuc = VATVN-<tax code>, ADR-0015 §9; display names from the trust list)
 *   nha-san-xuat          VATVN-0100000002  Công ty Sản xuất Mẫu (DEMO)      cong_doan san_xuat
 *   kiem-dinh             VATVN-0100000003  Trung tâm Kiểm định Mẫu (DEMO)   cong_doan kiem_dinh
 *   phan-phoi             VATVN-0100000004  Công ty Phân phối Mẫu (DEMO)     cong_doan phan_phoi
 *   to-chuc-chua-dang-ky  VATVN-0100000009  chains to the same root, absent from the trust list
 *
 * Products, GTIN 09520123456788 (GS1 sample prefix 952); page URL /01/09520123456788/21/<serial>
 *   SN-2026-000001  3 stages, all valid                          -> verified
 *   SN-2026-000002  2 stages, valid                              -> in_progress, missingStages [phan_phoi]
 *   SN-TAMPERED     event 2's mo_ta altered after signing        -> failed: event 2 SIGNATURE_INVALID, event 3 CHAIN_BROKEN
 *   SN-REVOKED      event 2 revoked in kiem-dinh's status list   -> failed: event 2 status REVOKED (still shown)
 *   SN-SUSPENDED    event 2 suspended                            -> failed: event 2 status SUSPENDED (still shown)
 *   SN-UNTRUSTED    event 2 signed by to-chuc-chua-dang-ky       -> failed: event 2 ISSUER_NOT_TRUSTED, no text, no status request
 *   SN-21           21 garbage compact strings                   -> failed TOO_LARGE before any verification or request
 *   SN-HTML         valid chain, mo_ta / dia_diem hold <script>, <img onerror>, https://evil.example/ -> verified, text verbatim
 *   SN-SLOW         valid chain answered after 7 s (SDK timeout 5 s) -> network_error
 *   SN-FAIL         500 INTERNAL_ERROR                           -> network_error
 *   SN-GARBAGE      200 with an HTML (non-JSON) body             -> invalid_response
 *   SN-FUTURE       valid chain signed with iat = now + 1 day, envelope serverTime = now + 1 day:
 *                   exactly what a device whose clock is 1 day behind sees -> failed NOT_YET_VALID,
 *                   clockSkewSeconds ≈ -86400 (the "giờ máy chưa đúng" hint). The real thing also works:
 *                   the dev PKI is < 1 day old, so a page clock set 1 day back (Playwright
 *                   `page.clock.install({ time: Date.now() - 86_400_000 })`, or the OS clock) makes EVERY
 *                   product fail at certificate_chain NOT_YET_VALID with the same skew hint.
 *   anything else   404 NOT_FOUND
 *
 * CLI (Node 22+)
 *   node scripts/dev-identra-products.mjs --export-fixtures tests/fixtures/product
 *        writes <dir>/chains.json { now, canonicalOrigin, gtin, rootPem, responses: { <canonical URL>: { status, contentType, body } } }
 *        (trust list, status lists, events of SN-2026-000001, -000002, SN-REVOKED, SN-UNTRUSTED, SN-HTML, SN-TAMPERED, SN-21)
 *   node scripts/dev-identra-products.mjs --check http://127.0.0.1:47310        every serial against a running stand-in
 *   node scripts/dev-identra-products.mjs --check-fixtures tests/fixtures/product/chains.json   offline, now = fixture.now
 */
import { spawnSync } from 'node:child_process';
import { X509Certificate } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';

const TAG = '[dev-identra-products]';
if (process.env.NODE_ENV === 'production') {
  console.error(`${TAG} refusing to run: NODE_ENV=production. This is for local development only.`);
  process.exit(1);
}

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SDK = resolve(REPO, '../identra-sdk');
const PKI_SCRIPTS = join(SDK, 'scripts/pki');
const DEV_DIR = join(REPO, '.dev-identra');
const PKI_DIR = join(DEV_DIR, 'pki');
export const ROOT_FILE = join(DEV_DIR, 'root-ca.pem');
const sdk = (pkg, file = 'index.js') => import(pathToFileURL(join(SDK, 'packages', pkg, 'dist', file)).href);

export const API = 'https://api-identra.awncorp.vn';
export const GTIN = '09520123456788';
const DAY = 86_400_000;
const HOUR = 3_600_000;
const UNKNOWN_ORG = 'to-chuc-chua-dang-ky';
const UNKNOWN_NAME = 'Trung tâm Kiểm định Chưa đăng ký (DEMO)';
const FIXTURE_SERIALS = ['SN-2026-000001', 'SN-2026-000002', 'SN-REVOKED', 'SN-UNTRUSTED', 'SN-HTML', 'SN-TAMPERED', 'SN-21'];

export const HOSTILE = {
  script: '<script>alert(1)</script>',
  img: '<img src=x onerror=alert(1)>',
  url: 'https://evil.example/',
};

// One coffee lot through the three stages; `ago` is how long before generation it happened.
const STORY = [
  {
    org: 'nha-san-xuat', congDoan: 'san_xuat', ago: 9 * DAY + 5 * HOUR,
    diaDiem: 'Nhà máy chế biến cà phê Hòa Phú, phường Buôn Ma Thuột, tỉnh Đắk Lắk',
    moTa: 'Rang xay và đóng gói lô RB-2611-07: cà phê Robusta Đắk Lắk rang mộc, gói 500 g, hạn sử dụng 12 tháng.',
  },
  {
    org: 'kiem-dinh', congDoan: 'kiem_dinh', ago: 6 * DAY + 2 * HOUR,
    diaDiem: 'Phòng thử nghiệm số 2, phường Cầu Giấy, Hà Nội',
    moTa: 'Kiểm nghiệm mẫu lô RB-2611-07: độ ẩm 4,8 %, ochratoxin A dưới ngưỡng cho phép. Kết luận: đạt TCVN 4193:2014.',
  },
  {
    org: 'phan-phoi', congDoan: 'phan_phoi', ago: 3 * DAY + 7 * HOUR,
    diaDiem: 'Kho phân phối Sóng Thần, phường Dĩ An, TP. Hồ Chí Minh',
    moTa: 'Nhập kho và giao cho cửa hàng bán lẻ tại TP. Hồ Chí Minh theo đơn PP-2026-11-0412, bảo quản nơi khô ráo.',
  },
];
const STORY_IN_PROGRESS = [
  { ...STORY[0], ago: 2 * DAY + 4 * HOUR, moTa: STORY[0].moTa.replaceAll('RB-2611-07', 'RB-2611-15') },
  { ...STORY[1], ago: 20 * HOUR, moTa: STORY[1].moTa.replaceAll('RB-2611-07', 'RB-2611-15') },
];
export const STORY_HTML = [
  { ...STORY[0], diaDiem: HOSTILE.img, moTa: `${HOSTILE.script} Rang xay lô RB-2611-07.` },
  { ...STORY[1], moTa: `Xem phiếu kết quả tại ${HOSTILE.url} ${HOSTILE.script}` },
  { ...STORY[2], diaDiem: `${HOSTILE.img} Kho Sóng Thần`, moTa: `"><svg onload=alert(1)> ${HOSTILE.url}` },
];

// ---------------------------------------------------------------- PKI

function run(cmd, args) {
  const r = spawnSync(cmd, args, { encoding: 'utf8' });
  if (r.status !== 0) throw new Error(`${args[0]} failed: ${(r.stderr || r.error?.message || '').trim().split('\n').at(-1)}`);
  return r.stdout;
}

function pkiFresh() {
  try {
    const root = new X509Certificate(readFileSync(join(PKI_DIR, 'root.cert.pem')));
    return Date.now() - Date.parse(root.validFrom) < DAY && existsSync(join(PKI_DIR, 'orgs', UNKNOWN_ORG, 'vc-product.chain.pem'));
  } catch {
    return false;
  }
}

/** Generates into a temporary directory, then swaps it in; true when a new PKI was made. */
function ensurePki() {
  if (pkiFresh()) return false;
  mkdirSync(DEV_DIR, { recursive: true, mode: 0o700 });
  const tmp = `${PKI_DIR}.tmp-${process.pid}`;
  rmSync(tmp, { recursive: true, force: true });
  try {
    run('bash', [join(PKI_SCRIPTS, 'make-demo-pki.sh'), tmp]);
    const dir = join(tmp, 'orgs', UNKNOWN_ORG);
    mkdirSync(dir, { mode: 0o700 });
    const tool = join(PKI_SCRIPTS, 'identra-pki.sh');
    run('bash', [tool, 'new-key-and-csr', '--key', join(dir, 'vc-product.key.pem'), '--csr', join(dir, 'vc-product.csr.pem'),
      '--o', UNKNOWN_NAME, '--mst', '0100000009', '--cn', `${UNKNOWN_NAME} (vc-product)`]);
    run('bash', [tool, 'issue-leaf', '--ca-dir', join(tmp, 'ca', 'issuing'), '--csr', join(dir, 'vc-product.csr.pem'),
      '--purpose', 'vc-product', '--san-uri', `${API}/issuers/${UNKNOWN_ORG}`,
      '--out', join(dir, 'vc-product.cert.pem'), '--chain', join(dir, 'vc-product.chain.pem')]);
  } catch (e) {
    rmSync(tmp, { recursive: true, force: true });
    throw e;
  }
  rmSync(PKI_DIR, { recursive: true, force: true });
  renameSync(tmp, PKI_DIR);
  return true;
}

// ---------------------------------------------------------------- signing

const minuteIso = (ms) => new Date(Math.floor(ms / 60_000) * 60_000).toISOString().replace('.000Z', 'Z');

/** Builds the PKI if needed and signs everything. */
export async function loadProducts() {
  const started = performance.now();
  const pkiGenerated = ensurePki();
  const core = await sdk('core');
  const server = await sdk('server');
  const { webCryptoHasher: hasher, webCryptoRandom: random, webCryptoVerifier: verifier } = await sdk('core', 'webcrypto/index.js');
  copyFileSync(join(PKI_DIR, 'root.cert.pem'), ROOT_FILE);

  const clock = { now: () => new Date() };
  const keyStore = server.createFileKeyStore(PKI_DIR);
  const source = JSON.parse(run('node', [join(PKI_SCRIPTS, 'make-trust-list-source.mjs'), PKI_DIR]));
  const trustList = server.createTrustListService({ source: () => source, keyStore, clock });
  const statusLists = server.createStatusListService({
    issuerUri: (name) => `${API}/issuers/${name}`, keyStore, storage: server.createMemoryStatusListStorage(), random, clock,
  });

  // In-process fetch for the generator's own verification (like identra-server's own-fetch).
  const text = (status, body) => ({ status, headers: { get: () => null }, text: async () => body });
  const ownFetch = async (url) => {
    if (url === `${API}/trust-list`) return text(200, await trustList.token());
    const m = /^https:\/\/api-identra\.awncorp\.vn\/issuers\/([a-z0-9-]+)\/status\/([0-9]+)$/.exec(url);
    const token = m ? await statusLists.token(m[1], Number(m[2])) : null;
    return token ? text(200, token) : text(404, '');
  };
  const chainValidator = core.createCertificateChainValidator({ trustedRoots: keyStore.trustedRoots(), verifier, hasher });
  const trustRegistry = core.createSignedTrustListRegistry({ url: `${API}/trust-list`, fetch: ownFetch, verifier, chainValidator, clock });
  const statusChecker = core.createStatusListChecker({ fetch: ownFetch, verifier, chainValidator, trustRegistry, clock });
  const verify = () => ({ verifier, hasher, chainValidator, trustRegistry, statusChecker, now: new Date() });

  const base = Date.now();
  const iss = (org) => `${API}/issuers/${org}`;
  const refs = new Map(); // serial -> [{ org, n, idx }] per event
  const statusUris = new Set();
  const allocate = async (org, serial) => {
    const a = await statusLists.allocate(org);
    statusUris.add(a.uri);
    refs.set(serial, [...(refs.get(serial) ?? []), { org, ...a }]);
    return { idx: a.idx, uri: a.uri };
  };

  /** The server's way: each stage appended after verifying the stored ones. */
  async function honest(serial, stages = STORY) {
    const events = [];
    for (const s of stages) {
      events.push(await server.appendProductEvent({
        gtin: GTIN, serial, existing: [...events], signer: await keyStore.signer(s.org, 'vc'), hasher, random, clock,
        iss: iss(s.org), status: await allocate(s.org, serial),
        claims: { congDoan: s.congDoan, thoiDiem: minuteIso(base - s.ago), diaDiem: s.diaDiem, moTa: s.moTa },
        verify: verify(),
      }));
    }
    return events;
  }

  /** Straight issueProductEvent, for chains the gate would refuse to build. */
  async function raw(serial, stages, { signClock = clock, orgOf = (s) => s.org } = {}) {
    const events = [];
    for (const s of stages) {
      const org = orgOf(s);
      const prev = events.at(-1);
      events.push(await core.issueProductEvent({
        signer: await keyStore.signer(org, 'vc'), hasher, random, clock: signClock, iss: iss(org),
        // The unknown organisation has no status list here: the verifier must never ask for it.
        status: org === UNKNOWN_ORG ? { idx: 0, uri: `${iss(org)}/status/1` } : await allocate(org, serial),
        claims: {
          ma_san_pham: core.formatProductCode(GTIN, serial), cong_doan: s.congDoan, thoi_diem: minuteIso(base - s.ago),
          dia_diem: s.diaDiem, mo_ta: s.moTa, ...(prev ? { prev: await core.productEventHash(prev, hasher) } : {}),
        },
      }));
    }
    return events;
  }

  const setSecond = async (serial, status) => {
    const { org, n, idx } = refs.get(serial)[1];
    await statusLists.setStatus(org, n, idx, status);
  };
  /** Event 2's payload changed after signing; header and signature kept. */
  const tamper = (events) => {
    const [h, p, rest] = events[1].split('.');
    const claims = JSON.parse(Buffer.from(p, 'base64url').toString('utf8'));
    claims.mo_ta = claims.mo_ta.replace('đạt TCVN 4193:2014', 'đạt tiêu chuẩn xuất khẩu EU hạng 1');
    return [events[0], `${h}.${Buffer.from(JSON.stringify(claims)).toString('base64url')}.${rest}`, events[2]];
  };

  const products = new Map([
    ['SN-2026-000001', { events: await honest('SN-2026-000001') }],
    ['SN-2026-000002', { events: await honest('SN-2026-000002', STORY_IN_PROGRESS) }],
    ['SN-TAMPERED', { events: tamper(await honest('SN-TAMPERED')) }],
    ['SN-REVOKED', { events: await honest('SN-REVOKED') }],
    ['SN-SUSPENDED', { events: await honest('SN-SUSPENDED') }],
    ['SN-UNTRUSTED', { events: await raw('SN-UNTRUSTED', STORY, { orgOf: (s) => (s.congDoan === 'kiem_dinh' ? UNKNOWN_ORG : s.org) }) }],
    ['SN-21', { events: Array.from({ length: 21 }, (_, i) => `eyJhbGciOiJFUzI1NiJ9.eyJpIjo${i}fQ.c2ln~`) }],
    ['SN-HTML', { events: await honest('SN-HTML', STORY_HTML) }],
    ['SN-SLOW', { events: await honest('SN-SLOW'), delayMs: 7000 }],
    ['SN-FAIL', { fail: true }],
    ['SN-GARBAGE', { garbage: true }],
    ['SN-FUTURE', {
      events: await raw('SN-FUTURE', STORY, { signClock: { now: () => new Date(Date.now() + DAY) } }),
      serverTimeOffsetMs: DAY,
    }],
  ]);
  await setSecond('SN-REVOKED', 'revoked');
  await setSecond('SN-SUSPENDED', 'suspended');
  await trustList.token(); // signs now, so a broken signer shows at startup

  return {
    pkiGenerated,
    ms: Math.round(performance.now() - started),
    rootPem: readFileSync(ROOT_FILE, 'utf8'),
    statusUris: [...statusUris].sort(),
    parseDigitalLinkPath: core.parseDigitalLinkPath,
    formatDigitalLinkPath: core.formatDigitalLinkPath,
    /** Re-signed by the service when an hour old (exp is 24 h). */
    trustList: () => trustList.token(),
    /** null for an unknown list; TypeError for a malformed name or n. */
    statusList: (name, n) => statusLists.token(name, n),
    product: (gtin, serial) => (gtin === GTIN ? products.get(serial) ?? null : null),
  };
}

// ---------------------------------------------------------------- fixtures

const eventsUrl = (p, serial) => `${API}/v1/products/${GTIN}/${p.formatDigitalLinkPath(GTIN, serial).split('/').at(-1)}/events`;

async function exportFixtures(dir) {
  const p = await loadProducts();
  const responses = { [`${API}/trust-list`]: { status: 200, contentType: 'application/jwt', body: await p.trustList() } };
  for (const uri of p.statusUris) {
    const [, name, n] = /\/issuers\/([^/]+)\/status\/([0-9]+)$/.exec(uri);
    responses[uri] = { status: 200, contentType: 'application/statuslist+jwt', body: await p.statusList(name, Number(n)) };
  }
  for (const serial of FIXTURE_SERIALS) {
    const body = { gtin: GTIN, serial, serverTime: new Date().toISOString(), events: p.product(GTIN, serial).events };
    responses[eventsUrl(p, serial)] = { status: 200, contentType: 'application/json; charset=utf-8', body: JSON.stringify(body) };
  }
  const fixture = { now: Date.now(), canonicalOrigin: API, gtin: GTIN, rootPem: p.rootPem, responses };
  mkdirSync(dir, { recursive: true });
  const file = join(dir, 'chains.json');
  writeFileSync(file, `${JSON.stringify(fixture, null, 2)}\n`);
  console.log(`${TAG} wrote ${file} (${Object.keys(responses).length} responses, now=${new Date(fixture.now).toISOString()}, ${p.ms} ms, PKI ${p.pkiGenerated ? 'generated' : 'reused'})`);
}

// ---------------------------------------------------------------- end-to-end check

const codeOf = (e, id) => e?.checks.find((c) => c.id === id)?.code ?? null;
const firstBad = (e) => e.checks.find((c) => !c.ok);

const CASES = {
  'SN-2026-000001': (v) => {
    assert.equal(v.result?.state, 'verified');
    assert.equal(v.result.events.length, 3);
    assert.ok(v.result.events.every((e) => e.event));
  },
  'SN-2026-000002': (v) => {
    assert.equal(v.result?.state, 'in_progress');
    assert.deepEqual(v.result.missingStages, ['phan_phoi']);
  },
  'SN-TAMPERED': (v) => {
    assert.equal(v.result?.state, 'failed');
    assert.equal(codeOf(v.result.events[1], 'signature'), 'SIGNATURE_INVALID');
    assert.equal(codeOf(v.result.events[2], 'product_chain'), 'CHAIN_BROKEN');
  },
  'SN-REVOKED': (v) => {
    assert.equal(v.result?.state, 'failed');
    assert.equal(codeOf(v.result.events[1], 'status'), 'REVOKED');
    assert.ok(v.result.events[1].event);
  },
  'SN-SUSPENDED': (v) => {
    assert.equal(v.result?.state, 'failed');
    assert.equal(codeOf(v.result.events[1], 'status'), 'SUSPENDED');
    assert.ok(v.result.events[1].event);
  },
  'SN-UNTRUSTED': (v, fetched) => {
    assert.equal(v.result?.state, 'failed');
    assert.equal(codeOf(v.result.events[1], 'issuer_trust'), 'ISSUER_NOT_TRUSTED');
    assert.equal(v.result.events[1].event, undefined);
    assert.ok(!fetched.some((u) => u.includes(`/issuers/${UNKNOWN_ORG}/`)), 'status list of the untrusted issuer was requested');
  },
  'SN-21': (v, fetched) => {
    assert.equal(v.result?.state, 'failed');
    assert.equal(v.result.code, 'TOO_LARGE');
    assert.equal(fetched.length, 1);
  },
  'SN-HTML': (v) => {
    assert.equal(v.result?.state, 'verified');
    v.result.events.forEach((e, i) => {
      assert.equal(e.event.moTa, STORY_HTML[i].moTa);
      assert.equal(e.event.diaDiem, STORY_HTML[i].diaDiem);
    });
  },
  'SN-FUTURE': (v) => {
    assert.equal(v.result?.state, 'failed');
    assert.equal(v.result.code, 'NOT_YET_VALID');
    assert.ok(Math.abs(v.clockSkewSeconds + 86_400) < 120, `clockSkewSeconds ${v.clockSkewSeconds}`);
  },
  'SN-SLOW': (v) => assert.equal(v.state, 'network_error'),
  'SN-FAIL': (v) => assert.equal(v.state, 'network_error'),
  'SN-GARBAGE': (v) => assert.equal(v.state, 'invalid_response'),
  'SN-UNKNOWN': (v) => assert.equal(v.state, 'not_found'),
};

function describe(v, fetched, ms) {
  const r = v.result;
  const events = r?.events.map((e) => `${e.index + 1}:${e.ok ? 'ok' : `${firstBad(e).id}=${firstBad(e).code}`}${e.event ? '+event' : ''}`).join(' ') ?? '';
  const paths = fetched.map((u) => u.replace(/^https?:\/\/[^/]+/, '')).join(', ');
  return `${v.serial.padEnd(15)} ${v.state.padEnd(16)} ${r ? `${r.state}${r.code ? ` ${r.code}` : ''}` : '-'}`
    + `${r?.missingStages.length ? ` missing=${r.missingStages}` : ''}${events ? ` [${events}]` : ''}`
    + `${v.clockSkewSeconds ? ` skew=${v.clockSkewSeconds}s` : ''} ${ms}ms\n    fetched: ${paths}`;
}

async function check({ base, fixture }) {
  const { createProductVerifier } = await sdk('client', 'product.js');
  const root = new Uint8Array(new X509Certificate(fixture?.rootPem ?? readFileSync(ROOT_FILE, 'utf8')).raw);
  const fake = async (url) => {
    const r = fixture.responses[url];
    return new Response(r?.body ?? '', { status: r?.status ?? 404, headers: { 'content-type': r?.contentType ?? 'text/plain' } });
  };
  const serials = fixture ? [...FIXTURE_SERIALS, 'SN-UNKNOWN'] : Object.keys(CASES);
  let failures = 0;
  for (const serial of serials) {
    const fetched = [];
    // Node's fetch does not implement cache: 'no-store' (the browser verifier sets it); drop it here.
    const fetchFn = (url, { cache, ...init } = {}) => (fetched.push(String(url)), fixture ? fake(String(url)) : fetch(url, init));
    const verifier = createProductVerifier({
      apiBaseUrl: base ?? API, rootCertificates: [root], fetch: fetchFn, ...(fixture ? { now: () => fixture.now } : {}),
    });
    const t0 = performance.now();
    const view = await verifier.load(GTIN, serial);
    console.log(describe(view, fetched, Math.round(performance.now() - t0)));
    try {
      CASES[serial](view, fetched);
    } catch (e) {
      failures++;
      console.log(`    FAIL: ${e.message}`);
    }
  }
  console.log(failures ? `${TAG} ${failures} case(s) FAILED` : `${TAG} all ${serials.length} cases as expected`);
  process.exitCode = failures ? 1 : 0;
}

// ---------------------------------------------------------------- CLI

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const [cmd, arg] = process.argv.slice(2);
  if (cmd === '--export-fixtures' && arg) await exportFixtures(resolve(arg));
  else if (cmd === '--check' && arg) await check({ base: arg.replace(/\/$/, '') });
  else if (cmd === '--check-fixtures' && arg) await check({ fixture: JSON.parse(readFileSync(resolve(arg), 'utf8')) });
  else {
    console.error('usage: dev-identra-products.mjs --export-fixtures <dir> | --check <stand-in base URL> | --check-fixtures <chains.json>');
    process.exit(2);
  }
}
