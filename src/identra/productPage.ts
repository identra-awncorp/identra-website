/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Check } from '@identra/sdk-client';
import type { ProductChainResult, ProductEventView, ProductView } from '@identra/sdk-client/product';
import { toCheckRows, type CheckLabelKey } from './verifierSession';

// The product page (ADR-0012): what a shopper sees after the browser verified a product's chain.
// Green comes ONLY from `result.state === 'verified'`; everything else explains the SDK result. Stable
// keys only: every sentence is chosen at render time from the translations.
//
// Page verdicts (derived in `toProductPageModel`, unit-tested for every combination of step outcomes):
//   verified     SDK `verified`.
//   in_progress  SDK `in_progress` (one or two valid stages so far).
//   unchecked    SDK `failed`, but EVERY failing check is an availability code (trust list or status list
//                could not be fetched), or the device clock is off by more than 5 minutes and every failing
//                check is a time or availability code. Says nothing bad about the product; retry first.
//   failed       SDK `failed` with at least one proven problem (bad signature, revoked, broken link, ...).

export const PRODUCT_STAGES = ['san_xuat', 'kiem_dinh', 'phan_phoi'] as const;
export type ProductStage = typeof PRODUCT_STAGES[number];
export const isProductStage = (value: unknown): value is ProductStage => (PRODUCT_STAGES as readonly unknown[]).includes(value);

/** Every sentence a step or the verdict can give: SDK codes plus the page's finer reasons for a broken chain. */
export const PRODUCT_REASON_KEYS = [
  'MALFORMED', 'TYP_INVALID', 'TOO_LARGE', 'ALG_NOT_ALLOWED',
  'CERT_CHAIN_MALFORMED', 'CERT_CHAIN_UNTRUSTED', 'CERT_NOT_YET_VALID', 'CERT_EXPIRED',
  'CERT_CONSTRAINT_INVALID', 'CERT_KEY_NOT_ALLOWED', 'ISSUER_MISMATCH', 'SIGNATURE_INVALID',
  'NOT_YET_VALID', 'EXPIRED', 'VCT_UNSUPPORTED', 'ISSUER_NOT_TRUSTED', 'TRUST_LIST_UNAVAILABLE',
  'REVOKED', 'SUSPENDED', 'STATUS_UNAVAILABLE', 'CHAIN_BROKEN',
  'CHAIN_NOT_THIS_PRODUCT', 'CHAIN_LINK', 'CHAIN_DATE_BACKWARDS', 'CHAIN_DATE_AFTER_SIGNING', 'CHAIN_EXTRA_STAGE',
  'CLOCK_WRONG', 'SKIPPED', 'UNKNOWN',
] as const;
export type ProductReasonKey = typeof PRODUCT_REASON_KEYS[number];

/** Holder-binding codes cannot occur on a public product event; if one does, the record is malformed. */
const MALFORMED_ALIASES = new Set(['DISCLOSURE_INVALID', 'KB_INVALID', 'CNF_MISMATCH']);

/** Any other code (a wallet operation code, a code newer than this page) gets the generic sentence. */
export const productReasonKey = (code: string | null | undefined): ProductReasonKey => {
  if (code && MALFORMED_ALIASES.has(code)) return 'MALFORMED';
  return code && (PRODUCT_REASON_KEYS as readonly string[]).includes(code) ? code as ProductReasonKey : 'UNKNOWN';
};

/** The service could not be reached: nothing was proven about the product. */
export const AVAILABILITY_CODES: ReadonlySet<string> = new Set(['TRUST_LIST_UNAVAILABLE', 'STATUS_UNAVAILABLE']);
/** Failures a wrong device clock produces by itself (ADR-0012 requirement 5). */
export const TIME_CODES: ReadonlySet<string> = new Set(['CERT_NOT_YET_VALID', 'CERT_EXPIRED', 'NOT_YET_VALID', 'EXPIRED']);
export const CLOCK_SKEW_HINT_SECONDS = 5 * 60;

// The SDK names the cause of CHAIN_BROKEN only in `detail` (documented "for logs only"). The page picks a
// finer sentence from the details it knows; an unknown detail falls back by position, never to green.
const CHAIN_DETAIL_REASONS: Readonly<Record<string, ProductReasonKey>> = {
  'not a product event': 'CHAIN_NOT_THIS_PRODUCT',
  'event of another product': 'CHAIN_NOT_THIS_PRODUCT',
  'stage out of order, repeated or missing': 'CHAIN_NOT_THIS_PRODUCT',
  'the first event carries prev': 'CHAIN_NOT_THIS_PRODUCT',
  'prev does not match the event before': 'CHAIN_LINK',
  'thoi_diem is not an ISO 8601 UTC instant': 'MALFORMED',
  'thoi_diem is later than the event was signed': 'CHAIN_DATE_AFTER_SIGNING',
  'thoi_diem is earlier than the event before': 'CHAIN_DATE_BACKWARDS',
  'no stage after phan_phoi': 'CHAIN_EXTRA_STAGE',
};

export const chainBrokenReason = (detail: string | undefined, index: number): ProductReasonKey => {
  if (index >= PRODUCT_STAGES.length) return 'CHAIN_EXTRA_STAGE';
  const known = detail === undefined ? undefined : CHAIN_DETAIL_REASONS[detail];
  if (known) return known;
  return index === 0 ? 'CHAIN_NOT_THIS_PRODUCT' : 'CHAIN_BROKEN';
};

export type StageOutcome = 'ok' | 'revoked' | 'suspended' | 'unchecked' | 'untrusted' | 'broken' | 'failed' | 'missing';
export type ProductCheckOutcome = 'passed' | 'failed' | 'unchecked' | 'skipped';

export interface ProductCheckRow {
  labelKey: CheckLabelKey;
  outcome: ProductCheckOutcome;
}

export interface StageRow {
  /** null for an event after the third stage (there is no fourth stage). */
  stage: ProductStage | null;
  index: number | null;
  outcome: StageOutcome;
  reasonKey: ProductReasonKey | null;
  /** Present only when the SDK hands it out: the signer is recognised (a revoked step still has it). */
  event?: ProductEventView;
  checks: ProductCheckRow[];
}

export type ProductVerdict = 'verified' | 'in_progress' | 'unchecked' | 'failed';
/** Why an unchecked verdict could not finish: what could not be reached, or the device clock. */
export type UncheckedCause = 'trust_list' | 'status' | 'clock';

export interface CheckedProductModel {
  kind: 'checked';
  gtin: string;
  serial: string;
  verifiedAt: string;
  verdict: ProductVerdict;
  uncheckedCause: UncheckedCause | null;
  /** Local clock minus the store's clock, only when the verdict blames the device clock. */
  clockSkewSeconds: number | null;
  rows: StageRow[];
  extraRows: StageRow[];
  /** A failure of the whole list (no event was looked at): the timeline is hidden and this is said instead. */
  listProblem: ProductReasonKey | null;
  /** The first proven problem, for the failed headline: its stage (if any) and plain reason. */
  firstProblem: { stage: ProductStage | null; outcome: StageOutcome; reasonKey: ProductReasonKey } | null;
  currentStage: ProductStage | null;
  missingStages: ProductStage[];
  /** At least one event was really verified in this browser (the "checked on your device" panel may say so). */
  anyEventVerified: boolean;
}

export type ProductPageModel =
  | { kind: 'invalid_code' }
  | { kind: 'not_found' | 'network_error' | 'server_error' | 'invalid_response'; gtin: string; serial: string; verifiedAt: string }
  | CheckedProductModel;

type ChainEntry = ProductChainResult['events'][number];

const isFailing = (check: Check): boolean => !check.ok && !check.skipped && check.code !== 'SKIPPED';
const failingChecks = (entry: ChainEntry): Check[] => entry.checks.filter(isFailing);
const codeOf = (check: Check): string => check.code ?? 'UNKNOWN';

/** A failing code that does not prove anything about the record, given what we know about the clock. */
const isUnprovenCode = (code: string, clockWrong: boolean): boolean => AVAILABILITY_CODES.has(code) || (clockWrong && TIME_CODES.has(code));

/** Plain outcome of one event. A proven problem always wins over "could not check". */
export const stageOutcome = (entry: ChainEntry, clockWrong = false): { outcome: StageOutcome; reasonKey: ProductReasonKey | null } => {
  if (entry.ok) return { outcome: 'ok', reasonKey: null };
  const failing = failingChecks(entry);
  if (failing.length === 0) return { outcome: 'failed', reasonKey: 'UNKNOWN' };
  const proven = failing.filter((check) => !isUnprovenCode(codeOf(check), clockWrong));
  if (proven.length === 0) {
    return { outcome: 'unchecked', reasonKey: clockWrong ? 'CLOCK_WRONG' : productReasonKey(codeOf(failing[0]!)) };
  }
  const first = proven[0]!;
  const code = codeOf(first);
  if (code === 'REVOKED') return { outcome: 'revoked', reasonKey: 'REVOKED' };
  if (code === 'SUSPENDED') return { outcome: 'suspended', reasonKey: 'SUSPENDED' };
  if (code === 'ISSUER_NOT_TRUSTED' || code === 'CERT_CHAIN_UNTRUSTED') return { outcome: 'untrusted', reasonKey: code };
  if (code === 'CHAIN_BROKEN') return { outcome: 'broken', reasonKey: chainBrokenReason(first.detail, entry.index) };
  return { outcome: 'failed', reasonKey: productReasonKey(code) };
};

const checkRowsFor = (entry: ChainEntry, clockWrong: boolean): ProductCheckRow[] =>
  toCheckRows({ checks: entry.checks }).map((row) => ({
    labelKey: row.labelKey,
    outcome: row.outcome === 'failed' && row.reasonKey !== null && isUnprovenCode(row.reasonKey, clockWrong) ? 'unchecked' : row.outcome,
  }));

const rowFor = (entry: ChainEntry, stage: ProductStage | null, clockWrong: boolean): StageRow => ({
  stage,
  index: entry.index,
  ...stageOutcome(entry, clockWrong),
  ...(entry.event ? { event: entry.event } : {}),
  checks: checkRowsFor(entry, clockWrong),
});

/**
 * `eventsHttpStatus`: the HTTP status of the events request when one arrived (the SDK folds every
 * non-200, non-404 answer into `network_error`; a status means the server answered, so it is not the
 * shopper's network).
 */
export const toProductPageModel = (view: ProductView, eventsHttpStatus: number | null = null): ProductPageModel => {
  const base = { gtin: view.gtin, serial: view.serial, verifiedAt: view.verifiedAt };
  if (view.state === 'network_error') {
    const serverAnswered = eventsHttpStatus !== null && eventsHttpStatus !== 200 && eventsHttpStatus !== 404;
    return { kind: serverAnswered ? 'server_error' : 'network_error', ...base };
  }
  if (view.state !== 'ok' || !view.result) {
    return { kind: view.state === 'ok' ? 'invalid_response' : view.state, ...base };
  }
  const { result } = view;
  const failedBySdk = result.state === 'failed';
  const listLevel = failedBySdk && result.events.length === 0;
  const allFailing = result.events.flatMap((entry) => failingChecks(entry).map(codeOf));
  const skew = view.clockSkewSeconds;
  const clockWrong = failedBySdk && !listLevel && allFailing.length > 0
    && skew !== undefined && Math.abs(skew) > CLOCK_SKEW_HINT_SECONDS
    && allFailing.every((code) => AVAILABILITY_CODES.has(code) || TIME_CODES.has(code));
  const onlyUnavailable = failedBySdk && allFailing.length > 0 && allFailing.every((code) => AVAILABILITY_CODES.has(code));

  const verdict: ProductVerdict = !failedBySdk ? result.state : clockWrong || onlyUnavailable ? 'unchecked' : 'failed';
  const uncheckedCause: UncheckedCause | null = verdict !== 'unchecked'
    ? null
    : clockWrong ? 'clock' : allFailing.includes('TRUST_LIST_UNAVAILABLE') ? 'trust_list' : 'status';

  const byIndex = new Map(result.events.map((entry) => [entry.index, entry]));
  const rows = PRODUCT_STAGES.map<StageRow>((stage, index) => {
    const entry = byIndex.get(index);
    return entry ? rowFor(entry, stage, clockWrong) : { stage, index: null, outcome: 'missing', reasonKey: null, checks: [] };
  });
  const extraRows = result.events.filter((entry) => entry.index >= PRODUCT_STAGES.length).map((entry) => rowFor(entry, null, clockWrong));
  const allRows = [...rows, ...extraRows];

  const problemRow = allRows.find((row) => row.outcome !== 'ok' && row.outcome !== 'missing' && row.outcome !== 'unchecked') ?? null;
  const firstProblem = verdict !== 'failed'
    ? null
    : problemRow && !listLevel
      ? { stage: problemRow.stage, outcome: problemRow.outcome, reasonKey: problemRow.reasonKey ?? 'UNKNOWN' }
      : { stage: null, outcome: 'failed' as const, reasonKey: productReasonKey(result.code) };

  const present = rows.filter((row) => row.outcome !== 'missing');
  return {
    kind: 'checked',
    ...base,
    verdict,
    uncheckedCause,
    clockSkewSeconds: clockWrong && skew !== undefined ? skew : null,
    rows,
    extraRows,
    listProblem: listLevel ? productReasonKey(result.code) : null,
    firstProblem,
    currentStage: verdict === 'in_progress' ? present.at(-1)?.stage ?? null : null,
    missingStages: result.missingStages.filter(isProductStage),
    anyEventVerified: allRows.some((row) => row.outcome === 'ok'),
  };
};

/** A clock difference in the largest sensible unit: minutes under 90, hours under 36, otherwise days. */
export const clockDifference = (seconds: number): { value: number; unit: 'minute' | 'hour' | 'day' } => {
  const minutes = Math.abs(seconds) / 60;
  if (minutes < 90) return { value: Math.max(1, Math.round(minutes)), unit: 'minute' };
  const hours = minutes / 60;
  if (hours < 36) return { value: Math.round(hours), unit: 'hour' };
  return { value: Math.round(hours / 24), unit: 'day' };
};

/** vi or en for this standalone page: an explicit saved choice first, then the browser's language. */
export const pickProductLocale = (saved: string | null, browserLanguages: readonly string[]): 'vi' | 'en' => {
  if (saved === 'vi' || saved === 'en') return saved;
  return browserLanguages.some((language) => language.toLowerCase().startsWith('vi')) ? 'vi' : 'en';
};
