#!/usr/bin/env node
/**
 * dev-identra-api.mjs: DEVELOPMENT ONLY.
 *
 * A local in-memory stand-in for the Identra server API, so the website (school
 * portal demo and verifier page) can be developed without identra-server.
 * It is NEVER deployed and is NOT referenced by the production build: nothing
 * in src/ imports it, Vite does not bundle scripts/. It refuses to start when
 * NODE_ENV=production. All data is fictional and public on purpose. Verifier
 * session results are canned; the product routes below serve REAL signed data.
 *
 * Product lifecycle (§3, §7), public, Access-Control-Allow-Origin: *, counted as reads:
 *   GET /trust-list                          application/jwt (exp 24 h, re-signed hourly)
 *   GET /issuers/:name/status/:n             application/statuslist+jwt, 404 for an unknown list
 *   GET /v1/products/:gtin/:serial/events    { gtin, serial, serverTime, events }, 404 NOT_FOUND unknown,
 *                                            400 VALIDATION_FAILED for a path parseDigitalLinkPath refuses
 * Signed by scripts/dev-identra-products.mjs (imported at start; its header lists every serial
 * and what it yields) with a DEMO PKI in .dev-identra/. Run Vite with
 * IDENTRA_ROOT_CA_FILE=.dev-identra/root-ca.pem so the page pins that root. If generation fails
 * these routes answer 503 UNAVAILABLE and everything else keeps working.
 *
 * Contract: identra-server/docs/vc-api.md §2, §3, §5, §6, §7 (GET only), §8;
 * errors are exactly { statusCode, code, message } with the closed code list of §2, every
 * response with an expiresAt carries serverTime, creations answer 201, 429 carries Retry-After;
 * check ids/codes: identra-sdk/docs/architecture.md §3.
 * Node 22+, zero dependencies. Listens on 127.0.0.1 only.
 *
 * Environment / flags
 *   IDENTRA_DEV_API_PORT=47310       port, must be 47300..47319 (default 47310)
 *   DEV_TOKEN_TTL_SECONDS=1800       portal token lifetime (default 30 min)
 *   DEV_OFFER_TTL_SECONDS=600        credential offer lifetime (default 10 min)
 *   DEV_SESSION_TTL_SECONDS=300      verifier session lifetime (default 5 min)
 *   DEV_EMPTY_CREDENTIALS=1          start with no seeded credentials (or --empty-credentials)
 *   DEV_AUTO=1                       (or --auto) a new verifier session goes to request_retrieved
 *                                    after 4 s and verified after 8 s; a new offer is issued after 10 s
 *   DEV_REGISTRAR_PASSWORD=...       the registrar's PRIVATE password (default: dev-registrar-only;
 *                                    never shown on the website, the public student password does
 *                                    not open it)
 *   DEV_MAX_LIVE_OFFERS=500          global cap of live (pending) offers; beyond it 503 UNAVAILABLE
 *   DEV_CREDENTIALS_PAGE=50          page size of GET /v1/demo/school/credentials when the client sends
 *                                    no limit (set it to 2 to try "Show more" with the seeded rows)
 *
 * Accounts (§5)
 *   sv001, sv002, sv003              students, public password Identra@2026, shared by every visitor:
 *                                    offers and credentials belong to the PORTAL SESSION (one login),
 *                                    another session of the same account gets 404 for them
 *   phongdaotao                      registrar, password DEV_REGISTRAR_PASSWORD (private)
 *   hethan                           student (copy of sv001's profile), password Identra@2026,
 *                                    token expires 20 s after login
 *   loi429                           login always answers 429 RATE_LIMITED (any password)
 *   loi500                           login always answers 500 INTERNAL_ERROR (any password)
 *
 * Offers (§5, §8): a session may hold several live offers; per client (IP) at most 5 live offers and
 * 30 created in 30 minutes (429 RATE_LIMITED), all clients together DEV_MAX_LIVE_OFFERS (503 UNAVAILABLE),
 * both with Retry-After = seconds until the oldest entry of that share or cap ends.
 *
 * Dev hooks (POST only, 200 JSON on success, 404 unknown id, 409 when the
 * transition is impossible in the real server, e.g. completing an expired session)
 *   /__dev/sessions/:id/retrieve                 -> request_retrieved
 *   /__dev/sessions/:id/complete?outcome=<o>     o = verified (default) | minimal | revoked |
 *                                                    suspended | status_unavailable | untrusted |
 *                                                    signature | expired_credential | holder | xss
 *   /__dev/sessions/:id/expire                   -> expired now
 *   /__dev/offers/:offerId/complete              -> issued; a new valid credential for that student
 *   /__dev/offers/:offerId/expire                -> expired now
 *   /__dev/fail-next?route=<r>&status=<s>&count=<n>[&retryAfter=<sec>]
 *        r = create-session | get-session | login | offers | create-offer | cancel-offer | credentials |
 *            revoke | status
 *        s = 500 | 503 | 429, n = 1..100 (default 1): the next n matching requests fail; a 429 or 503
 *        carries Retry-After <sec> (1..3600, default 5)
 *        ("offers" matches both POST /offers and GET /offers/:offerId; "create-offer" only the POST,
 *        "cancel-offer" only DELETE /offers/:offerId, "revoke" the student's revoke)
 *   /__dev/hostile-next?kind=<k>                 k = long-qr | rtl-issuer: the next created session
 *                                                answers with a 5000-character QR, or the next completed
 *                                                verified session names its issuer with a bidi override
 *                                                (both must be rejected by the clients)
 *   /__dev/reset[?empty=1|0]                     reseed everything (tokens, offers, sessions,
 *                                                rate limits, fail-next); empty overrides
 *                                                DEV_EMPTY_CREDENTIALS from now on
 *
 * Not implemented (501): GET /oid4vp/request/:requestId, GET /issuers/truong-mau/offers/:offerId.
 * A verifier session changes only through the hooks above: like the real server, a response it cannot
 * use (a photographed-QR garbage post) never ends a session, so nothing here models that.
 * Logs: one line per request (method, path with ids masked, no query, status, ms).
 * Never logs tokens, passwords, txCodes, claims or profile data.
 */
import http from 'node:http';
import { createHash, randomBytes, randomInt } from 'node:crypto';

const TAG = '[dev-identra-api]';

if (process.env.NODE_ENV === 'production') {
  console.error(`${TAG} refusing to start: NODE_ENV=production. This stand-in is for local development only.`);
  process.exit(1);
}

function envInt(name, def, min, max) {
  const raw = process.env[name];
  if (raw === undefined || raw === '') return def;
  const n = Number(raw);
  if (!Number.isInteger(n) || n < min || n > max) {
    console.error(`${TAG} ${name} must be an integer in ${min}..${max}`);
    process.exit(1);
  }
  return n;
}
const flag = (env, arg) => process.env[env] === '1' || process.argv.includes(arg);

const HOST = '127.0.0.1';
const PORT = envInt('IDENTRA_DEV_API_PORT', 47310, 47300, 47319);
const TOKEN_TTL = envInt('DEV_TOKEN_TTL_SECONDS', 1800, 1, 86400) * 1000;
const OFFER_TTL = envInt('DEV_OFFER_TTL_SECONDS', 600, 1, 86400) * 1000;
const SESSION_TTL = envInt('DEV_SESSION_TTL_SECONDS', 300, 1, 86400) * 1000;
const AUTO = flag('DEV_AUTO', '--auto');
let emptyCredentials = flag('DEV_EMPTY_CREDENTIALS', '--empty-credentials');

const API = 'https://api-identra.awncorp.vn';
const PASSWORD = 'Identra@2026';
const REGISTRAR_PASSWORD = process.env.DEV_REGISTRAR_PASSWORD || 'dev-registrar-only';
const MAX_LIVE_OFFERS = envInt('DEV_MAX_LIVE_OFFERS', 500, 1, 100_000);
const CREDENTIALS_PAGE = envInt('DEV_CREDENTIALS_PAGE', 50, 1, 100);
const OFFERS_PER_CLIENT = 5;
const OFFERS_PER_30_MIN = 30;
const RETENTION = 30 * 60 * 1000; // expired / finished items keep answering for 30 min
const HETHAN_TTL = 20 * 1000;
const STATUS_DELAY = 600;
const MAX_BODY = 16 * 1024;
const DAY = 24 * 60 * 60 * 1000;
const ORIGIN_RE = /^http:\/\/(?:127\.0\.0\.1|localhost):\d{1,5}$/;
const LIMITS = { login: 10, session: 30, write: 60, read: 300 };

// ---------------------------------------------------------------- seed data (fictional)

const SV001 = {
  hoTen: 'Nguyễn Minh Mẫu',
  ngaySinh: '2004-03-15',
  maSinhVien: 'SV0001',
  nganh: 'Công nghệ thông tin',
  hangTotNghiep: 'Giỏi',
  namTotNghiep: 2026,
  soHieuBang: 'TM-2026-000101',
};
const ACCOUNTS = new Map([
  ['sv001', { role: 'student', profile: SV001 }],
  ['sv002', { role: 'student', profile: {
    hoTen: 'Trần Thu Mẫu', ngaySinh: '2004-07-22', maSinhVien: 'SV0002', nganh: 'Kinh tế',
    hangTotNghiep: 'Khá', namTotNghiep: 2026, soHieuBang: 'TM-2026-000102' } }],
  ['sv003', { role: 'student', profile: {
    hoTen: 'Lê Hoàng Mẫu', ngaySinh: '2003-11-05', maSinhVien: 'SV0003', nganh: 'Ngôn ngữ Anh',
    hangTotNghiep: 'Xuất sắc', namTotNghiep: 2026, soHieuBang: 'TM-2026-000103' } }],
  ['hethan', { role: 'student', profile: SV001, ttl: HETHAN_TTL }],
  ['phongdaotao', { role: 'registrar', profile: {
    hoTen: 'Đỗ Thị Mẫu', donVi: 'Phòng Đào tạo — Trường Đại học Mẫu (DEMO)' } }],
]);

const VERIFIER_NAME = 'Nhà tuyển dụng Mẫu (DEMO)';
// Organisations are identified as in the trust list: maToChuc = VATVN-<tax code> (ADR-0015 section 9).
const ISSUER = { maToChuc: 'VATVN-0100000001', ten: 'Trường Đại học Mẫu (DEMO)' };
// Stable fake x509_hash (43 chars base64url, like SHA-256 of a leaf certificate).
const CLIENT_ID = 'x509_hash:' + createHash('sha256').update('identra dev stand-in verifier').digest('base64url');

const CHECK_IDS = ['structure', 'algorithm', 'certificate_chain', 'signature', 'validity_time',
  'credential_type', 'issuer_trust', 'status', 'holder_binding'];
const LONG_VALUE = 'Giá trị rất dài để thử cắt chuỗi — '.repeat(30).slice(0, 700);
const CLAIMS = {
  full: { ho_ten: SV001.hoTen, nganh: SV001.nganh, hang_tot_nghiep: SV001.hangTotNghiep, nam_tot_nghiep: String(SV001.namTotNghiep) },
  minimal: { ho_ten: SV001.hoTen, nganh: SV001.nganh },
  xss: {
    ho_ten: '<script>alert(1)</script>',
    nganh: '<img src=x onerror=alert(1)>',
    hang_tot_nghiep: LONG_VALUE,
    nam_tot_nghiep: '"><svg onload=alert(1)>',
  },
};
const OUTCOMES = {
  verified: { claims: 'full' },
  minimal: { claims: 'minimal' },
  xss: { claims: 'xss' },
  revoked: { fail: { status: 'REVOKED' } },
  suspended: { fail: { status: 'SUSPENDED' } },
  status_unavailable: { fail: { status: 'STATUS_UNAVAILABLE' } },
  untrusted: { fail: { issuer_trust: 'ISSUER_NOT_TRUSTED' } },
  signature: { fail: { signature: 'SIGNATURE_INVALID' } },
  expired_credential: { fail: { validity_time: 'EXPIRED' } },
  holder: { fail: { holder_binding: 'KB_INVALID' } },
};
const FAIL_ROUTES = new Set(['create-session', 'get-session', 'login', 'offers', 'create-offer', 'cancel-offer', 'credentials', 'revoke', 'status']);

// ---------------------------------------------------------------- state (in memory)

let tokens, offers, sessions, credentials, buckets, failNext, hostileNext;

function reset() {
  tokens = new Map();
  offers = new Map();
  sessions = new Map();
  credentials = new Map();
  buckets = new Map();
  failNext = new Map();
  hostileNext = new Set();
  if (emptyCredentials) return;
  const now = Date.now();
  addCredential('sv003', 'SV0003', 'Lê Hoàng Mẫu', now - 3 * DAY, 'valid');
  addCredential(null, 'SV0098', 'Phạm Ngọc Mẫu', now - 19 * DAY, 'suspended');
  addCredential(null, 'SV0102', 'Võ Đức Mẫu', now - 46 * DAY, 'revoked');
}

// `session`: the portal token whose offer produced it (§5); seeded credentials belong to no live session.
function addCredential(session, studentCode, studentName, issuedAt, status) {
  const c = { id: newId(), session, studentCode, studentName, issuedAt, status, updatedAt: issuedAt };
  credentials.set(c.id, c);
  return c;
}

function prune(now) {
  for (const [k, t] of tokens) if (t.expiresAt <= now) tokens.delete(k);
  for (const [k, o] of offers) if (o.keepUntil <= now) offers.delete(k);
  for (const [k, s] of sessions) if (s.keepUntil <= now) sessions.delete(k);
  for (const [k, hits] of buckets) if (hits.at(-1) <= now - 60_000) buckets.delete(k);
}

// ---------------------------------------------------------------- helpers

const newId = () => randomBytes(16).toString('base64url');
const iso = (ms) => new Date(ms).toISOString();
const delay = (ms) => new Promise((r) => setTimeout(r, ms));
const later = (ms, fn) => setTimeout(fn, ms).unref();

class HttpError extends Error {
  constructor(status, message, code, headers = {}) {
    super(message);
    Object.assign(this, { status, code, headers });
  }
}
const fail = (status, message, code, headers) => { throw new HttpError(status, message, code, headers); };
const notFound = () => fail(404, 'Not found.', 'NOT_FOUND');
const badState = (what) => fail(409, `Cannot do that: ${what}.`, 'CONFLICT');
const invalid = (message) => fail(400, message, 'VALIDATION_FAILED');

function readJson(req) {
  if (Number(req.headers['content-length']) > MAX_BODY) return Promise.reject(tooLarge());
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    let over = false;
    req.on('data', (c) => {
      if (over) return;
      size += c.length;
      if (size > MAX_BODY) { over = true; chunks.length = 0; reject(tooLarge()); } else chunks.push(c);
    });
    req.on('error', reject);
    req.on('end', () => {
      if (over) return;
      const text = Buffer.concat(chunks).toString('utf8');
      if (text.trim() === '') return resolve({});
      try { resolve(JSON.parse(text)); } catch { reject(new HttpError(400, 'Body is not valid JSON.', 'VALIDATION_FAILED')); }
    });
  });
}
function tooLarge() {
  return new HttpError(400, 'Body exceeds 16 KB.', 'VALIDATION_FAILED', { connection: 'close' });
}

// Strict body: a plain object with exactly the allowed keys, each a string of 1..64 chars.
function strings(body, keys) {
  const ok = body !== null && typeof body === 'object' && !Array.isArray(body)
    && Object.keys(body).every((k) => keys.includes(k))
    && keys.every((k) => typeof body[k] === 'string' && body[k].length >= 1 && body[k].length <= 64);
  if (!ok) invalid(`Body must be { ${keys.join(', ')} } with strings of 1..64 characters.`);
  return body;
}

function auth(req, role) {
  const m = /^Bearer ([A-Za-z0-9_-]{1,128})$/.exec(req.headers.authorization ?? '');
  // A missing, unknown or expired token is always 401 SESSION_EXPIRED (§2).
  if (!m) fail(401, 'Missing bearer token.', 'SESSION_EXPIRED');
  const t = tokens.get(m[1]);
  if (!t || t.expiresAt <= Date.now()) {
    tokens.delete(m[1]);
    fail(401, 'Session expired or unknown. Sign in again.', 'SESSION_EXPIRED');
  }
  if (role && t.role !== role) fail(403, `This action needs the ${role} role.`, 'FORBIDDEN');
  return t;
}

function rateLimit(ip, kind) {
  const key = `${kind} ${ip}`;
  const now = Date.now();
  const hits = (buckets.get(key) ?? []).filter((t) => t > now - 60_000);
  buckets.set(key, hits);
  if (hits.length >= LIMITS[kind]) {
    const retry = Math.max(1, Math.ceil((hits[0] + 60_000 - now) / 1000));
    fail(429, 'Too many requests. Try again later.', 'RATE_LIMITED', { 'retry-after': String(retry) });
  }
  hits.push(now);
}

function forcedFailure(routeKeys) {
  const routeKey = routeKeys.find((k) => failNext.has(k));
  if (!routeKey) return;
  const rule = failNext.get(routeKey);
  if (--rule.remaining <= 0) failNext.delete(routeKey);
  const retry = { 'retry-after': String(rule.retryAfter) };
  if (rule.status === 429) fail(429, 'Too many requests. Try again later.', 'RATE_LIMITED', retry);
  if (rule.status === 503) fail(503, 'Service temporarily unavailable.', 'UNAVAILABLE', retry);
  fail(500, 'Internal server error.', 'INTERNAL_ERROR');
}

// ---------------------------------------------------------------- school portal (§5) and status change (§3)

function login({ body }) {
  const { username, password } = strings(body, ['username', 'password']);
  if (username === 'loi429') fail(429, 'Too many requests. Try again later.', 'RATE_LIMITED', { 'retry-after': '30' });
  if (username === 'loi500') fail(500, 'Internal server error.', 'INTERNAL_ERROR');
  const acc = ACCOUNTS.get(username);
  const expected = acc?.role === 'registrar' ? REGISTRAR_PASSWORD : PASSWORD;
  if (!acc || password !== expected) fail(401, 'Wrong username or password.', 'INVALID_CREDENTIALS');
  const token = randomBytes(32).toString('base64url');
  const expiresAt = Date.now() + (acc.ttl ?? TOKEN_TTL);
  // The token is the portal session: everything a student creates belongs to it (§5).
  tokens.set(token, { token, username, role: acc.role, expiresAt });
  return [201, { token, expiresAt: iso(expiresAt), serverTime: iso(Date.now()), role: acc.role, profile: acc.profile }];
}

function offerState(o, now = Date.now()) {
  if (o.status === 'pending' && now >= o.expiresAt) o.status = 'expired';
  return o.status;
}

function issueOffer(o) {
  const now = Date.now();
  const { profile } = ACCOUNTS.get(o.username);
  o.status = 'issued';
  return addCredential(o.session, profile.maSinhVien, profile.hoTen, now, 'valid');
}

// Seconds until the oldest of `times` leaves a window of `windowMs` (the Retry-After of §8).
const secondsUntilFree = (times, windowMs, now) => Math.max(1, Math.ceil((Math.min(...times) + windowMs - now) / 1000));

// Per client: 5 live offers, 30 created in 30 minutes (429); all clients: MAX_LIVE_OFFERS live (503).
// A pending offer holds its place until it is redeemed, cancelled or 10 minutes pass.
function reserveOfferPlace(client, now) {
  const all = [...offers.values()];
  const live = all.filter((o) => offerState(o, now) === 'pending');
  const mineLive = live.filter((o) => o.client === client);
  if (mineLive.length >= OFFERS_PER_CLIENT) {
    fail(429, 'Too many requests; try again later.', 'RATE_LIMITED', { 'retry-after': String(secondsUntilFree(mineLive.map((o) => o.createdAt), OFFER_TTL, now)) });
  }
  const mineRecent = all.filter((o) => o.client === client && o.createdAt > now - RETENTION);
  if (mineRecent.length >= OFFERS_PER_30_MIN) {
    fail(429, 'Too many requests; try again later.', 'RATE_LIMITED', { 'retry-after': String(secondsUntilFree(mineRecent.map((o) => o.createdAt), RETENTION, now)) });
  }
  if (live.length >= MAX_LIVE_OFFERS) {
    fail(503, 'Too many live offers; try again later.', 'UNAVAILABLE', { 'retry-after': String(secondsUntilFree(live.map((o) => o.createdAt), OFFER_TTL, now)) });
  }
}

function createOffer({ req }) {
  const { token, username } = auth(req, 'student');
  const client = req.socket.remoteAddress ?? 'unknown';
  const createdAt = Date.now();
  reserveOfferPlace(client, createdAt);
  const offerId = newId();
  const expiresAt = createdAt + OFFER_TTL;
  // Readable for 30 minutes after creation, then 404 (§5). Creating one never ends another.
  const o = { offerId, session: token, username, client, status: 'pending', createdAt, expiresAt, keepUntil: createdAt + RETENTION };
  offers.set(offerId, o);
  if (AUTO) later(10_000, () => { if (offers.get(offerId) === o && offerState(o) === 'pending') issueOffer(o); });
  const txCode = String(randomInt(0, 1_000_000)).padStart(6, '0');
  const offerUri = 'openid-credential-offer://?credential_offer_uri='
    + encodeURIComponent(`${API}/issuers/truong-mau/offers/${offerId}`);
  return [201, { offerId, offerUri, txCode, expiresAt: iso(expiresAt), serverTime: iso(createdAt) }];
}

// Unknown, older than 30 minutes, or another session's (even of the same account): 404 (§5).
function ownOffer(req, offerId) {
  const { token } = auth(req, 'student');
  const o = offers.get(offerId);
  if (!o || o.session !== token) notFound();
  return o;
}

function getOffer({ req, params: [offerId] }) {
  const o = ownOffer(req, offerId);
  return [200, { status: offerState(o), serverTime: iso(Date.now()) }];
}

// A pending offer is cancelled (its code stops working, its place is freed); an issued one stays issued;
// repeating it is harmless.
function cancelOffer({ req, params: [offerId] }) {
  const o = ownOffer(req, offerId);
  if (offerState(o) === 'pending') {
    o.status = 'expired';
    o.expiresAt = Date.now();
  }
  return [200, { offerId: o.offerId, status: o.status, serverTime: iso(Date.now()) }];
}

// The cursor is opaque to clients; here it is the base64url of the next item's position.
function listCredentials({ req, query }) {
  const { token, role } = auth(req);
  const rawLimit = query.get('limit');
  const limit = rawLimit === null ? CREDENTIALS_PAGE : Number(rawLimit);
  if (!/^\d{1,3}$/.test(rawLimit ?? '1') || !Number.isInteger(limit) || limit < 1 || limit > 100) invalid('limit must be an integer in 1..100.');
  const rawCursor = query.get('cursor');
  let start = 0;
  if (rawCursor !== null) {
    const decoded = /^[A-Za-z0-9_-]{1,64}$/.test(rawCursor) ? Buffer.from(rawCursor, 'base64url').toString('utf8') : '';
    if (!/^p[1-9]\d{0,6}$/.test(decoded)) invalid('cursor is not valid.');
    start = Number(decoded.slice(1));
  }
  const all = [...credentials.values()]
    .filter((c) => role === 'registrar' || c.session === token)
    .sort((a, b) => b.issuedAt - a.issuedAt);
  const items = all.slice(start, start + limit).map((c) => ({
    id: c.id,
    studentCode: c.studentCode,
    studentName: c.studentName,
    issuedAt: iso(c.issuedAt),
    status: c.status,
    canRevoke: c.status !== 'revoked',
  }));
  const next = start + limit;
  return [200, { items, nextCursor: next < all.length ? Buffer.from(`p${next}`).toString('base64url') : null }];
}

// The student revokes a credential issued in this session ("I lost my phone"); final (§5).
async function revokeOwn({ req, params: [id] }) {
  await delay(STATUS_DELAY); // visible pending state in the UI
  const { token } = auth(req, 'student');
  const c = credentials.get(id);
  if (!c || c.session !== token) notFound();
  if (c.status === 'revoked') fail(409, 'The credential is revoked; revocation is final.', 'CONFLICT');
  c.status = 'revoked';
  c.updatedAt = Date.now();
  return [200, { id: c.id, status: c.status, updatedAt: iso(c.updatedAt) }];
}

async function changeStatus({ req, body, params: [id] }) {
  await delay(STATUS_DELAY); // visible pending state in the UI
  auth(req, 'registrar');
  const { status } = strings(body, ['status']);
  if (!['valid', 'revoked', 'suspended'].includes(status)) invalid('status must be valid, revoked or suspended.');
  const c = credentials.get(id);
  if (!c) notFound();
  if (c.status === 'revoked') fail(409, 'The credential is revoked; revocation is final.', 'CONFLICT');
  c.status = status;
  c.updatedAt = Date.now();
  return [200, { id: c.id, status: c.status, updatedAt: iso(c.updatedAt) }];
}

// ---------------------------------------------------------------- verifier sessions (§6)

function sessionState(s, now = Date.now()) {
  if ((s.status === 'pending' || s.status === 'request_retrieved') && now >= s.expiresAt) {
    s.status = 'expired'; // stays readable as expired until 30 min after creation (§6)
  }
  return s.status;
}
const open = (s) => ['pending', 'request_retrieved'].includes(sessionState(s));

function sessionView(s) {
  sessionState(s);
  return {
    id: s.id,
    status: s.status,
    verifier: { name: VERIFIER_NAME },
    expiresAt: iso(s.expiresAt),
    serverTime: iso(Date.now()),
    ...(s.result && { result: s.result }),
  };
}

function buildResult(outcome, now) {
  const { fail: fails = {}, claims } = OUTCOMES[outcome];
  let stopped = false;
  let trustFailed = false;
  const checks = CHECK_IDS.map((id, i) => {
    if (stopped || (id === 'status' && trustFailed)) return { id, ok: false, code: 'SKIPPED', skipped: true };
    const code = fails[id] ?? null;
    if (code && i < 4) stopped = true; // steps 1-4 stop the run
    if (id === 'issuer_trust') trustFailed = code !== null;
    return { id, ok: code === null, code };
  });
  const ok = checks.every((c) => c.ok);
  // claims and issuer exist only when ok; every claim value is a string (§6).
  if (!ok) return { ok, checks, verifiedAt: iso(now) };
  const issuer = hostileNext.delete('rtl-issuer') ? { ...ISSUER, ten: 'Trường \u202Euầm\u202C Mẫu' } : ISSUER;
  return { ok, checks, claims: { ...CLAIMS[claims] }, issuer, verifiedAt: iso(now) };
}

function completeSession(s, outcome) {
  const now = Date.now();
  s.result = buildResult(outcome, now);
  s.status = s.result.ok ? 'verified' : 'failed';
  s.keepUntil = now + RETENTION;
}

function createSession({ body }) {
  const { verifier, scenario } = strings(body, ['verifier', 'scenario']);
  if (verifier !== 'nha-tuyen-dung-mau' || scenario !== 'ung-tuyen') invalid('Unknown verifier or scenario.');
  const id = newId();
  const requestId = newId();
  const createdAt = Date.now();
  const expiresAt = createdAt + SESSION_TTL;
  // Deleted 30 minutes after creation (or after verification), then 404 (§6).
  const s = { id, requestId, status: 'pending', expiresAt, keepUntil: createdAt + RETENTION, result: null };
  sessions.set(id, s);
  if (AUTO) {
    later(4000, () => { if (sessions.get(id) === s && sessionState(s) === 'pending') s.status = 'request_retrieved'; });
    later(8000, () => { if (sessions.get(id) === s && open(s)) completeSession(s, 'verified'); });
  }
  const qr = 'openid4vp://?client_id=' + encodeURIComponent(CLIENT_ID)
    + '&request_uri=' + encodeURIComponent(`${API}/oid4vp/request/${requestId}`)
    + (hostileNext.delete('long-qr') ? `&padding=${'A'.repeat(5000)}` : '');
  return [201, { id, qr, expiresAt: iso(expiresAt), serverTime: iso(createdAt) }];
}

function getSession({ params: [id] }) {
  const s = sessions.get(id);
  if (!s) notFound();
  return [200, sessionView(s)];
}

// ---------------------------------------------------------------- dev hooks

const devSession = (id) => sessions.get(id) ?? notFound();
const devOffer = (id) => offers.get(id) ?? notFound();

const dev = {
  retrieve({ params: [id] }) {
    const s = devSession(id);
    if (!open(s)) badState(`session is ${s.status}`);
    s.status = 'request_retrieved';
    return [200, { ok: true, session: sessionView(s) }];
  },
  complete({ params: [id], query }) {
    const outcome = query.get('outcome') ?? 'verified';
    if (!Object.hasOwn(OUTCOMES, outcome)) invalid(`outcome must be one of ${Object.keys(OUTCOMES).join(', ')}.`);
    const s = devSession(id);
    if (!open(s)) badState(`session is ${s.status}`);
    completeSession(s, outcome);
    return [200, { ok: true, session: sessionView(s) }];
  },
  expireSession({ params: [id] }) {
    const s = devSession(id);
    if (!open(s)) badState(`session is ${s.status}`);
    s.expiresAt = Date.now();
    sessionState(s);
    return [200, { ok: true, session: sessionView(s) }];
  },
  completeOffer({ params: [id] }) {
    const o = devOffer(id);
    if (offerState(o) !== 'pending') badState(`offer is ${o.status}`);
    const c = issueOffer(o);
    return [200, { ok: true, offer: { offerId: o.offerId, status: o.status }, credential: { id: c.id, status: c.status } }];
  },
  expireOffer({ params: [id] }) {
    const o = devOffer(id);
    if (offerState(o) !== 'pending') badState(`offer is ${o.status}`);
    o.expiresAt = Date.now();
    o.keepUntil = o.expiresAt + RETENTION;
    offerState(o);
    return [200, { ok: true, offer: { offerId: o.offerId, status: o.status } }];
  },
  failNext({ query }) {
    const route = query.get('route');
    const status = Number(query.get('status'));
    const count = Number(query.get('count') ?? 1);
    const retryAfter = Number(query.get('retryAfter') ?? 5);
    if (!FAIL_ROUTES.has(route) || ![500, 503, 429].includes(status) || !Number.isInteger(count) || count < 1 || count > 100
      || !Number.isInteger(retryAfter) || retryAfter < 1 || retryAfter > 3600) {
      invalid(`Use route=${[...FAIL_ROUTES].join('|')}&status=500|503|429&count=1..100[&retryAfter=1..3600].`);
    }
    failNext.set(route, { status, remaining: count, retryAfter });
    return [200, { ok: true, failNext: Object.fromEntries(failNext) }];
  },
  hostileNext({ query }) {
    const kind = query.get('kind');
    if (kind !== 'long-qr' && kind !== 'rtl-issuer') invalid('Use kind=long-qr|rtl-issuer.');
    hostileNext.add(kind);
    return [200, { ok: true, hostileNext: [...hostileNext] }];
  },
  reset({ query }) {
    const empty = query.get('empty');
    if (empty === '1' || empty === '0') emptyCredentials = empty === '1';
    reset();
    return [200, { ok: true, emptyCredentials }];
  },
};

const notImplemented = () => [501, { error: 'not_implemented_in_dev_stand_in' }];

// ---------------------------------------------------------------- product lifecycle (§3, §7), real signatures

const productsReady = import('./dev-identra-products.mjs')
  .then((m) => m.loadProducts())
  .then((p) => {
    console.log(`${TAG} product chains signed in ${p.ms} ms (PKI ${p.pkiGenerated ? 'generated' : 'reused'} in .dev-identra/).`
      + ' Run Vite with IDENTRA_ROOT_CA_FILE=.dev-identra/root-ca.pem so the page pins this dev root.');
    return p;
  }, (e) => {
    console.error(`${TAG} product chains unavailable (product routes answer 503): ${e?.message ?? e}`);
    return null;
  });

async function productSet() {
  return (await productsReady) ?? fail(503, 'Product chains are not available in this stand-in.', 'UNAVAILABLE');
}

async function getTrustList() {
  const p = await productSet();
  try {
    return [200, await p.trustList(), 'application/jwt'];
  } catch {
    return fail(503, 'No valid trust list is available.', 'UNAVAILABLE');
  }
}

async function getStatusList({ params: [name, n] }) {
  const p = await productSet();
  let token;
  try {
    token = await p.statusList(name, Number(n));
  } catch {
    fail(503, 'The status list cannot be signed.', 'UNAVAILABLE');
  }
  if (token === null) fail(404, 'No such status list.', 'NOT_FOUND');
  return [200, token, 'application/statuslist+jwt'];
}

async function getProductEvents({ params: [gtinSegment, serialSegment] }) {
  const p = await productSet();
  const code = p.parseDigitalLinkPath(`/01/${gtinSegment}/21/${serialSegment}`);
  if (!code) invalid('gtin must be a GTIN-14 with a valid check digit and serial 1..20 GS1 characters, percent-encoded.');
  const { gtin, serial } = code;
  const product = p.product(gtin, serial) ?? notFound();
  if (product.fail) fail(500, 'Internal server error.', 'INTERNAL_ERROR');
  if (product.garbage) return [200, '<!doctype html><title>502</title><p>Bad gateway</p>', 'text/html; charset=utf-8'];
  if (product.delayMs) await delay(product.delayMs);
  return [200, { gtin, serial, serverTime: iso(Date.now() + (product.serverTimeOffsetMs ?? 0)), events: product.events }];
}

// ---------------------------------------------------------------- routing

const ID = '([A-Za-z0-9_-]{1,64})';
// Public signed resources (§2): any origin may read them, and the Date header.
const PUBLIC = new Set([getTrustList, getStatusList, getProductEvents]);
// [method, path, fail-next keys, rate-limit kind, handler]
const ROUTES = [
  ['GET', '/trust-list', [], 'read', getTrustList],
  ['GET', '/issuers/([a-z0-9]+(?:-[a-z0-9]+)*)/status/([1-9][0-9]{0,8})', [], 'read', getStatusList],
  ['GET', '/v1/products/([^/]{1,20})/([^/]{1,80})/events', [], 'read', getProductEvents],
  ['POST', '/v1/demo/school/login', ['login'], 'login', login],
  ['POST', '/v1/demo/school/offers', ['create-offer', 'offers'], 'write', createOffer],
  ['GET', `/v1/demo/school/offers/${ID}`, ['offers'], 'read', getOffer],
  ['DELETE', `/v1/demo/school/offers/${ID}`, ['cancel-offer'], 'write', cancelOffer],
  ['GET', '/v1/demo/school/credentials', ['credentials'], 'read', listCredentials],
  ['POST', `/v1/demo/school/credentials/${ID}/revoke`, ['revoke'], 'write', revokeOwn],
  ['POST', `/v1/issuers/truong-mau/credentials/${ID}/status`, ['status'], 'write', changeStatus],
  ['POST', '/v1/verification/sessions', ['create-session'], 'session', createSession],
  ['GET', `/v1/verification/sessions/${ID}`, ['get-session'], 'read', getSession],
  ['GET', '/oid4vp/request/[^/]+', null, null, notImplemented],
  ['GET', '/issuers/truong-mau/offers/[^/]+', null, null, notImplemented],
  ['POST', `/__dev/sessions/${ID}/retrieve`, null, null, dev.retrieve],
  ['POST', `/__dev/sessions/${ID}/complete`, null, null, dev.complete],
  ['POST', `/__dev/sessions/${ID}/expire`, null, null, dev.expireSession],
  ['POST', `/__dev/offers/${ID}/complete`, null, null, dev.completeOffer],
  ['POST', `/__dev/offers/${ID}/expire`, null, null, dev.expireOffer],
  ['POST', '/__dev/fail-next', null, null, dev.failNext],
  ['POST', '/__dev/hostile-next', null, null, dev.hostileNext],
  ['POST', '/__dev/reset', null, null, dev.reset],
].map(([method, path, keys, limit, handler]) => ({ method, re: new RegExp(`^${path}$`), keys: keys ?? [], limit, handler }));

const maskPath = (p) => p.split('/').map((s) => (s.length >= 16 ? ':id' : s)).join('/').slice(0, 200);

const server = http.createServer(async (req, res) => {
  const started = performance.now();
  let logPath = '?';
  res.on('finish', () => {
    console.log(`${new Date().toISOString()} ${req.method} ${logPath} ${res.statusCode} ${Math.round(performance.now() - started)}ms`);
  });
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.setHeader('cache-control', 'no-store');
  res.setHeader('vary', 'Origin');
  const origin = req.headers.origin;
  if (origin && ORIGIN_RE.test(origin)) {
    res.setHeader('access-control-allow-origin', origin);
    res.setHeader('access-control-allow-methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('access-control-allow-headers', 'content-type, authorization');
    res.setHeader('access-control-expose-headers', 'retry-after');
    res.setHeader('access-control-max-age', '600');
  }
  try {
    const url = new URL(req.url ?? '/', `http://${HOST}`);
    logPath = maskPath(url.pathname);
    if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
    prune(Date.now());
    let match;
    const route = ROUTES.find((r) => r.method === req.method && (match = r.re.exec(url.pathname)));
    if (!route) notFound();
    if (PUBLIC.has(route.handler)) {
      res.setHeader('access-control-allow-origin', '*');
      res.setHeader('access-control-expose-headers', 'Date, Retry-After');
    }
    const body = req.method === 'POST' ? await readJson(req) : undefined;
    forcedFailure(route.keys);
    if (route.limit) rateLimit(req.socket.remoteAddress ?? 'unknown', route.limit);
    // [status, json] or [status, raw text, content type]
    const [status, payload, type] = await route.handler({ req, body, params: match.slice(1), query: url.searchParams });
    if (type) res.setHeader('content-type', type);
    res.writeHead(status);
    res.end(type ? payload : JSON.stringify(payload));
  } catch (err) {
    let e = err;
    if (!(e instanceof HttpError)) {
      console.error(`${TAG} unexpected error: ${e?.name ?? 'Error'}`);
      e = new HttpError(500, 'Internal server error.', 'INTERNAL_ERROR');
    }
    if (res.headersSent) { res.destroy(); return; }
    res.writeHead(e.status, e.headers);
    res.end(JSON.stringify({ statusCode: e.status, code: e.code ?? 'INTERNAL_ERROR', message: e.message }));
  }
});

reset();
server.on('error', (e) => {
  console.error(`${TAG} cannot listen on ${HOST}:${PORT}: ${e.code ?? e.message}`);
  process.exit(1);
});
server.listen(PORT, HOST, () => {
  console.log(`${TAG} DEVELOPMENT ONLY stand-in listening on http://${HOST}:${PORT}`
    + ` (auto=${AUTO ? 'on' : 'off'}, emptyCredentials=${emptyCredentials ? 'on' : 'off'})`);
});

for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, () => {
    console.log(`${TAG} ${sig}: shutting down`);
    server.close(() => process.exit(0));
    server.closeAllConnections();
  });
}
