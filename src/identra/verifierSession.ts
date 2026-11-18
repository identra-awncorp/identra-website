/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type {
  CheckId,
  ClaimValue,
  ErrorCode,
  SessionResult,
  VerificationSession,
  VerifierClient,
  VerifierClientError,
} from '@identra/sdk-client';
import { MAX_FIELD_LENGTH } from './schoolPortalClient';

// The verifier step of the apply-job demo as a small state machine (vc-api.md section 6).
// Stable keys only: every sentence is chosen at render time from the translations.

export type VerifierProblem = 'network' | 'rate_limited' | 'unavailable';

export type VerifierStepState =
  | { phase: 'idle' }
  | { phase: 'creating' }
  | {
      phase: 'waiting';
      sessionId: string;
      qr: string;
      expiresAt: string;
      status: 'pending' | 'request_retrieved';
      reconnecting: boolean;
    }
  | { phase: 'verified' | 'failed'; sessionId: string; verifierName: string; result: SessionResult }
  | { phase: 'expired' }
  | { phase: 'error'; problem: VerifierProblem };

export type VerifierStepEvent =
  | { type: 'start' }
  | { type: 'created'; sessionId: string; qr: string; expiresAt: string }
  | { type: 'update'; session: VerificationSession }
  | { type: 'retrying' }
  | { type: 'expired' }
  | { type: 'error'; problem: VerifierProblem }
  | { type: 'reset' };

export const INITIAL_VERIFIER_STEP_STATE: VerifierStepState = { phase: 'idle' };

export const verifierStepReducer = (state: VerifierStepState, event: VerifierStepEvent): VerifierStepState => {
  switch (event.type) {
    case 'reset':
      return INITIAL_VERIFIER_STEP_STATE;
    case 'start':
      return { phase: 'creating' };
    case 'created':
      return state.phase === 'creating'
        ? { phase: 'waiting', sessionId: event.sessionId, qr: event.qr, expiresAt: event.expiresAt, status: 'pending', reconnecting: false }
        : state;
    case 'expired':
      if (state.phase === 'creating') return { phase: 'error', problem: 'unavailable' };
      return state.phase === 'waiting' ? { phase: 'expired' } : state;
    case 'retrying':
      return state.phase === 'waiting' ? { ...state, reconnecting: true } : state;
    case 'error':
      return state.phase === 'creating' || state.phase === 'waiting' ? { phase: 'error', problem: event.problem } : state;
    case 'update': {
      if (state.phase !== 'waiting' || event.session.id !== state.sessionId) return state;
      const { session } = event;
      if (session.status === 'expired') return { phase: 'expired' };
      if ((session.status === 'verified' || session.status === 'failed') && session.result) {
        // The result decides the outcome: a "verified" session whose result is not ok is shown as failed.
        return {
          phase: session.status === 'verified' && session.result.ok ? 'verified' : 'failed',
          sessionId: session.id,
          verifierName: session.verifier.name,
          result: session.result,
        };
      }
      if (session.status === 'pending' || session.status === 'request_retrieved') {
        return { ...state, status: session.status, expiresAt: session.expiresAt, reconnecting: false };
      }
      return state;
    }
    default:
      return state;
  }
};

const problemFor = (error: unknown): VerifierProblem => {
  const kind = (error as Partial<VerifierClientError> | null)?.kind;
  if (kind === 'network') return 'network';
  if (kind === 'rate_limited') return 'rate_limited';
  return 'unavailable';
};

/**
 * Creates a session and follows it to its end. Every dispatch is dropped once `signal` is aborted,
 * so a closed dialog or an unmounted page never receives a late state update.
 */
export const runVerifierSession = async (
  client: VerifierClient,
  input: { verifier: string; scenario: string },
  options: { signal: AbortSignal; dispatch: (event: VerifierStepEvent) => void; intervalMs?: number },
): Promise<void> => {
  const { signal } = options;
  const dispatch = (event: VerifierStepEvent) => {
    if (!signal.aborted) options.dispatch(event);
  };

  dispatch({ type: 'start' });
  try {
    const created = await client.createSession(input, { signal });
    dispatch({ type: 'created', sessionId: created.id, qr: created.qr, expiresAt: created.expiresAt });
    const final = await client.watchSession(created.id, {
      signal,
      intervalMs: options.intervalMs ?? 1000,
      onUpdate: (session) => dispatch({ type: 'update', session }),
      onError: () => dispatch({ type: 'retrying' }),
    });
    dispatch({ type: 'update', session: final });
  } catch (error) {
    if (signal.aborted) return;
    // A session that disappeared from the server has expired from the user's point of view.
    if ((error as Partial<VerifierClientError> | null)?.kind === 'not_found') {
      dispatch({ type: 'expired' });
      return;
    }
    dispatch({ type: 'error', problem: problemFor(error) });
  }
};

// ---- What the result screen shows -------------------------------------------------------------

export const KNOWN_CHECK_IDS = [
  'structure',
  'algorithm',
  'certificate_chain',
  'signature',
  'validity_time',
  'credential_type',
  'issuer_trust',
  'status',
  'holder_binding',
  'product_chain',
] as const satisfies readonly CheckId[];

export type KnownCheckId = typeof KNOWN_CHECK_IDS[number];
export type CheckLabelKey = KnownCheckId | 'other';
export type FailureReasonKey = ErrorCode | 'UNKNOWN';

export const ALL_ERROR_CODES = [
  'MALFORMED', 'TYP_INVALID', 'TOO_LARGE', 'ALG_NOT_ALLOWED',
  'CERT_CHAIN_MALFORMED', 'CERT_CHAIN_UNTRUSTED', 'CERT_NOT_YET_VALID', 'CERT_EXPIRED',
  'CERT_CONSTRAINT_INVALID', 'CERT_KEY_NOT_ALLOWED', 'ISSUER_MISMATCH', 'SIGNATURE_INVALID',
  'NOT_YET_VALID', 'EXPIRED', 'VCT_UNSUPPORTED', 'ISSUER_NOT_TRUSTED', 'TRUST_LIST_UNAVAILABLE',
  'REVOKED', 'SUSPENDED', 'STATUS_UNAVAILABLE', 'DISCLOSURE_INVALID', 'KB_INVALID',
  'NONCE_MISMATCH', 'AUD_MISMATCH', 'CHAIN_BROKEN', 'CLIENT_ID_MISMATCH', 'VERIFIER_NOT_TRUSTED',
  'DID_RESOLUTION_FAILED', 'KEY_NOT_FOUND', 'SKIPPED',
] as const satisfies readonly ErrorCode[];

const isKnownCheckId = (id: string): id is KnownCheckId => (KNOWN_CHECK_IDS as readonly string[]).includes(id);
const isKnownErrorCode = (code: string): code is ErrorCode => (ALL_ERROR_CODES as readonly string[]).includes(code);

export interface CheckRow {
  labelKey: CheckLabelKey;
  outcome: 'passed' | 'failed' | 'skipped';
  /** Only for failed checks: chosen from the code, never from a message. */
  reasonKey: FailureReasonKey | null;
}

export const toCheckRows = (result: SessionResult): CheckRow[] => result.checks.map((check) => {
  const outcome = check.ok ? 'passed' : check.skipped || check.code === 'SKIPPED' ? 'skipped' : 'failed';
  return {
    labelKey: isKnownCheckId(check.id) ? check.id : 'other',
    outcome,
    reasonKey: outcome === 'failed'
      ? check.code !== null && isKnownErrorCode(check.code) ? check.code : 'UNKNOWN'
      : null,
  };
});

/** The first failed check, which is what the result's headline explains. */
export const firstFailure = (rows: CheckRow[]): CheckRow | null => rows.find((row) => row.outcome === 'failed') ?? null;

export const DIPLOMA_CLAIM_KEYS = ['ho_ten', 'nganh', 'hang_tot_nghiep', 'nam_tot_nghiep'] as const;
export type DiplomaClaimKey = typeof DIPLOMA_CLAIM_KEYS[number];

export interface SharedField {
  /** A known claim gets a translated label; any other claim name is shown as received, as text. */
  key: DiplomaClaimKey | null;
  rawName: string;
  value: string;
}

/** Cuts a value to `max` characters (by code point) so no API string can flood the layout. */
export const truncateText = (value: string, max = MAX_FIELD_LENGTH): string => {
  const characters = Array.from(value);
  return characters.length <= max ? value : `${characters.slice(0, max - 1).join('')}…`;
};

const claimText = (value: ClaimValue): string => truncateText(String(value));

export const toSharedFields = (claims: Record<string, ClaimValue> | undefined): SharedField[] => {
  if (!claims) return [];
  const known = DIPLOMA_CLAIM_KEYS
    .filter((key) => Object.prototype.hasOwnProperty.call(claims, key))
    .map<SharedField>((key) => ({ key, rawName: key, value: claimText(claims[key] as ClaimValue) }));
  const others = Object.keys(claims)
    .filter((name) => !(DIPLOMA_CLAIM_KEYS as readonly string[]).includes(name))
    .map<SharedField>((name) => ({ key: null, rawName: truncateText(name, 64), value: claimText(claims[name] as ClaimValue) }));
  return [...known, ...others];
};

/** Whole seconds left until an ISO instant, never negative. */
export const secondsUntil = (isoInstant: string, now: number): number => {
  const target = Date.parse(isoInstant);
  return Number.isNaN(target) ? 0 : Math.max(0, Math.floor((target - now) / 1000));
};

export const formatCountdown = (seconds: number): string =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
