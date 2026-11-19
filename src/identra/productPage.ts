/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Check } from '@identra/sdk-client';
import type { ProductChainResult, ProductEventView, ProductView } from '@identra/sdk-client/product';
import { toCheckRows, type CheckRow } from './verifierSession';

// The product page (ADR-0012): what a shopper sees after the browser verified a product's chain.
// The verdict comes ONLY from `result.state`; everything else explains it. Stable keys only: every
// sentence is chosen at render time from the translations.

export const PRODUCT_STAGES = ['san_xuat', 'kiem_dinh', 'phan_phoi'] as const;
export type ProductStage = typeof PRODUCT_STAGES[number];

/** The failure codes a product chain can produce, each with a product-worded sentence. */
export const PRODUCT_REASON_KEYS = [
  'MALFORMED', 'TYP_INVALID', 'TOO_LARGE', 'ALG_NOT_ALLOWED',
  'CERT_CHAIN_MALFORMED', 'CERT_CHAIN_UNTRUSTED', 'CERT_NOT_YET_VALID', 'CERT_EXPIRED',
  'CERT_CONSTRAINT_INVALID', 'CERT_KEY_NOT_ALLOWED', 'ISSUER_MISMATCH', 'SIGNATURE_INVALID',
  'NOT_YET_VALID', 'EXPIRED', 'VCT_UNSUPPORTED', 'ISSUER_NOT_TRUSTED', 'TRUST_LIST_UNAVAILABLE',
  'REVOKED', 'SUSPENDED', 'STATUS_UNAVAILABLE', 'CHAIN_BROKEN', 'SKIPPED', 'UNKNOWN',
] as const;
export type ProductReasonKey = typeof PRODUCT_REASON_KEYS[number];

/** Any other code (a wallet operation code, a code newer than this page) gets the generic sentence. */
export const productReasonKey = (code: string | null | undefined): ProductReasonKey =>
  code && (PRODUCT_REASON_KEYS as readonly string[]).includes(code) ? code as ProductReasonKey : 'UNKNOWN';

export type StageOutcome = 'ok' | 'revoked' | 'suspended' | 'status_unavailable' | 'untrusted' | 'broken' | 'failed' | 'missing';

export interface StageRow {
  /** null for an event after the third stage (there is no fourth stage). */
  stage: ProductStage | null;
  index: number | null;
  outcome: StageOutcome;
  reasonKey: ProductReasonKey | null;
  /** Present only when the SDK hands it out: the signer is recognised (a revoked step still has it). */
  event?: ProductEventView;
  checks: CheckRow[];
}

export type ProductPageModel =
  | { kind: 'invalid_code' }
  | { kind: 'not_found' | 'network_error' | 'invalid_response'; gtin: string; serial: string; verifiedAt: string }
  | {
      kind: 'checked';
      gtin: string;
      serial: string;
      verifiedAt: string;
      verdict: ProductChainResult['state'];
      rows: StageRow[];
      extraRows: StageRow[];
      /** The first problem, for the failed headline: its stage (if any) and plain reason. */
      firstProblem: { stage: ProductStage | null; outcome: StageOutcome; reasonKey: ProductReasonKey } | null;
      currentStage: ProductStage | null;
      missingStages: ProductStage[];
      /** The device clock looks wrong and some failure is about time (ADR-0012 requirement 5). */
      clockHintMinutes: number | null;
    };

const TIME_CODES = new Set(['NOT_YET_VALID', 'EXPIRED', 'CERT_NOT_YET_VALID', 'CERT_EXPIRED', 'TRUST_LIST_UNAVAILABLE', 'STATUS_UNAVAILABLE']);
export const CLOCK_SKEW_HINT_SECONDS = 5 * 60;

const firstFailingCode = (checks: Check[]): string | null =>
  checks.find((check) => !check.ok && !check.skipped && check.code !== 'SKIPPED')?.code ?? null;

/** Plain outcome of one event: revocation wins (who signed is still shown), then the signer, then the link. */
export const stageOutcome = (entry: ProductChainResult['events'][number]): { outcome: StageOutcome; reasonKey: ProductReasonKey | null } => {
  if (entry.ok) return { outcome: 'ok', reasonKey: null };
  const status = entry.checks.find((check) => check.id === 'status');
  if (entry.event && status && !status.ok) {
    if (status.code === 'REVOKED') return { outcome: 'revoked', reasonKey: 'REVOKED' };
    if (status.code === 'SUSPENDED') return { outcome: 'suspended', reasonKey: 'SUSPENDED' };
    if (status.code === 'STATUS_UNAVAILABLE') return { outcome: 'status_unavailable', reasonKey: 'STATUS_UNAVAILABLE' };
  }
  const code = firstFailingCode(entry.checks);
  if (code === 'ISSUER_NOT_TRUSTED' || code === 'CERT_CHAIN_UNTRUSTED') return { outcome: 'untrusted', reasonKey: productReasonKey(code) };
  if (code === 'CHAIN_BROKEN') return { outcome: 'broken', reasonKey: 'CHAIN_BROKEN' };
  return { outcome: 'failed', reasonKey: productReasonKey(code) };
};

const rowFor = (entry: ProductChainResult['events'][number], stage: ProductStage | null): StageRow => {
  const { outcome, reasonKey } = stageOutcome(entry);
  return {
    stage,
    index: entry.index,
    outcome,
    reasonKey,
    ...(entry.event ? { event: entry.event } : {}),
    checks: toCheckRows({ checks: entry.checks }),
  };
};

export const toProductPageModel = (view: ProductView): ProductPageModel => {
  const base = { gtin: view.gtin, serial: view.serial, verifiedAt: view.verifiedAt };
  if (view.state !== 'ok' || !view.result) {
    return { kind: view.state === 'ok' ? 'invalid_response' : view.state, ...base };
  }
  const { result } = view;
  const byIndex = new Map(result.events.map((entry) => [entry.index, entry]));
  const rows = PRODUCT_STAGES.map<StageRow>((stage, index) => {
    const entry = byIndex.get(index);
    return entry ? rowFor(entry, stage) : { stage, index: null, outcome: 'missing', reasonKey: null, checks: [] };
  });
  const extraRows = result.events.filter((entry) => entry.index >= PRODUCT_STAGES.length).map((entry) => rowFor(entry, null));

  const problemRow = [...rows, ...extraRows].find((row) => row.outcome !== 'ok' && row.outcome !== 'missing') ?? null;
  const firstProblem = result.state !== 'failed'
    ? null
    : problemRow
      ? { stage: problemRow.stage, outcome: problemRow.outcome, reasonKey: problemRow.reasonKey ?? 'UNKNOWN' }
      : { stage: null, outcome: 'failed' as const, reasonKey: productReasonKey(result.code) };

  const present = rows.filter((row) => row.outcome !== 'missing');
  const timeFailure = result.code !== null && TIME_CODES.has(result.code)
    || result.events.some((entry) => entry.checks.some((check) => !check.ok && check.code !== null && TIME_CODES.has(check.code)));
  const skew = view.clockSkewSeconds;
  const clockHintMinutes = skew !== undefined && Math.abs(skew) > CLOCK_SKEW_HINT_SECONDS && timeFailure
    ? Math.round(Math.abs(skew) / 60)
    : null;

  return {
    kind: 'checked',
    ...base,
    verdict: result.state,
    rows,
    extraRows,
    firstProblem,
    currentStage: present.at(-1)?.stage ?? null,
    missingStages: result.missingStages.filter((stage): stage is ProductStage => (PRODUCT_STAGES as readonly string[]).includes(stage)),
    clockHintMinutes,
  };
};

/** vi or en for this standalone page: an explicit saved choice first, then the browser's language. */
export const pickProductLocale = (saved: string | null, browserLanguages: readonly string[]): 'vi' | 'en' => {
  if (saved === 'vi' || saved === 'en') return saved;
  return browserLanguages.some((language) => language.toLowerCase().startsWith('vi')) ? 'vi' : 'en';
};
