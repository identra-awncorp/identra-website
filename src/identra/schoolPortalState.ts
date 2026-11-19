/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type {
  CredentialOffer,
  CredentialStatus,
  IssuedCredential,
  OfferStatus,
  PortalApiError,
  PortalSession,
  SchoolPortalClient,
} from './schoolPortalClient';

// State of the sample university portal. Stable keys only; the page picks every sentence at render time.
// Times: `clockOffsetMs` = serverTime - local time when the answer arrived, so every countdown and expiry
// decision runs on the server's clock (vc-api.md section 2). Error kinds come from the error `code`.

// ---- Sign-in ------------------------------------------------------------------------------------

export type SignInProblem = 'invalid_credentials' | 'rate_limited' | 'network' | 'unavailable' | 'rejected';
export type SignedOutNotice = 'session_expired' | 'signed_out' | null;

export type AuthState =
  | { status: 'signedOut'; notice: SignedOutNotice; submitting: boolean; problem: SignInProblem | null; retryAt: number | null }
  | { status: 'signedIn'; session: PortalSession; clockOffsetMs: number };

export type AuthEvent =
  | { type: 'submit' }
  | { type: 'signedIn'; session: PortalSession; clockOffsetMs: number }
  /** `retryAt`: local time before which signing in again is refused (a 429's Retry-After). */
  | { type: 'signInFailed'; problem: SignInProblem; retryAt?: number }
  | { type: 'signOut' }
  | { type: 'sessionExpired' };

export const SIGNED_OUT: AuthState = { status: 'signedOut', notice: null, submitting: false, problem: null, retryAt: null };

export const authReducer = (state: AuthState, event: AuthEvent): AuthState => {
  switch (event.type) {
    case 'submit':
      return state.status === 'signedOut' ? { ...state, notice: null, submitting: true, problem: null, retryAt: null } : state;
    case 'signedIn':
      return { status: 'signedIn', session: event.session, clockOffsetMs: event.clockOffsetMs };
    case 'signInFailed':
      return state.status === 'signedOut'
        ? { ...state, submitting: false, problem: event.problem, retryAt: event.retryAt ?? null }
        : state;
    case 'signOut':
      return { ...SIGNED_OUT, notice: 'signed_out' };
    case 'sessionExpired':
      return { ...SIGNED_OUT, notice: 'session_expired' };
    default:
      return state;
  }
};

export const signInProblemFor = (error: PortalApiError): SignInProblem => {
  if (error.kind === 'invalid_credentials') return 'invalid_credentials';
  if (error.kind === 'rate_limited') return 'rate_limited';
  if (error.kind === 'network' || error.kind === 'timeout') return 'network';
  if (error.kind === 'validation_failed' || error.kind === 'forbidden') return 'rejected';
  return 'unavailable';
};

// ---- A student's credential offer ---------------------------------------------------------------

export type LoadProblem = 'network' | 'rate_limited' | 'unavailable' | 'forbidden' | 'rejected';

/**
 * Why a new code could not be made. `too_many_offers`: this network already holds 5 unused codes or made
 * 100 in 30 minutes (429); `busy`: all visitors together reached the server's cap (503). Both carry a wait.
 */
export type OfferProblem = 'too_many_offers' | 'busy' | 'network' | 'forbidden' | 'rejected' | 'unavailable';

// The page keeps one offer in focus, the newest. Several may live on the server (section 5); the page
// cancels the one in focus before asking for another, and when the visitor leaves.
export type OfferState =
  | { phase: 'idle' }
  | { phase: 'creating' }
  | { phase: 'active'; offer: CredentialOffer; clockOffsetMs: number; reconnecting: boolean }
  | { phase: 'issued'; offer: CredentialOffer }
  | { phase: 'expired' }
  | { phase: 'error'; problem: OfferProblem; retryAt: number | null };

export type OfferEvent =
  | { type: 'create' }
  | { type: 'created'; offer: CredentialOffer; clockOffsetMs: number }
  | { type: 'status'; offerId: string; status: OfferStatus }
  | { type: 'pollFailed'; offerId: string }
  | { type: 'expiredLocally'; offerId: string }
  | { type: 'failed'; problem: OfferProblem; retryAt?: number }
  /** The diploma just issued was revoked: the "issued, go and apply" message no longer holds. */
  | { type: 'dismissIssued' }
  | { type: 'reset' };

export const OFFER_IDLE: OfferState = { phase: 'idle' };

export const offerReducer = (state: OfferState, event: OfferEvent): OfferState => {
  switch (event.type) {
    case 'reset':
      return OFFER_IDLE;
    case 'dismissIssued':
      return state.phase === 'issued' ? OFFER_IDLE : state;
    case 'create':
      return { phase: 'creating' };
    case 'created':
      return state.phase === 'creating'
        ? { phase: 'active', offer: event.offer, clockOffsetMs: event.clockOffsetMs, reconnecting: false }
        : state;
    case 'failed':
      return state.phase === 'creating' ? { phase: 'error', problem: event.problem, retryAt: event.retryAt ?? null } : state;
    case 'status':
      if (state.phase !== 'active' || state.offer.offerId !== event.offerId) return state;
      if (event.status === 'issued') return { phase: 'issued', offer: state.offer };
      if (event.status === 'expired') return { phase: 'expired' };
      return state.reconnecting ? { ...state, reconnecting: false } : state;
    case 'pollFailed':
      return state.phase === 'active' && state.offer.offerId === event.offerId ? { ...state, reconnecting: true } : state;
    case 'expiredLocally':
      return state.phase === 'active' && state.offer.offerId === event.offerId ? { phase: 'expired' } : state;
    default:
      return state;
  }
};

/** The offer still waiting for a wallet, if any: the one to cancel before a new one or on leaving. */
export const pendingOfferId = (state: OfferState): string | null => (state.phase === 'active' ? state.offer.offerId : null);

export const offerProblemFor = (error: PortalApiError): OfferProblem => {
  switch (error.kind) {
    case 'rate_limited': return 'too_many_offers';
    case 'unavailable': return 'busy';
    case 'network':
    case 'timeout': return 'network';
    case 'forbidden': return 'forbidden';
    case 'validation_failed':
    case 'conflict':
    case 'not_found': return 'rejected';
    default: return 'unavailable';
  }
};

/** How long a new code waits for the old one to be cancelled before asking anyway. */
export const CANCEL_WAIT_MS = 3000;

/**
 * Asks for a new code. A code still pending is cancelled first so it does not hold one of this network's
 * five places; that is best effort: whatever the cancellation answers (or after `waitMs`), the new code
 * is requested.
 */
export const replaceOffer = async (
  client: Pick<SchoolPortalClient, 'cancelOffer' | 'createOffer'>,
  token: string,
  previousOfferId: string | null,
  signal?: AbortSignal,
  waitMs = CANCEL_WAIT_MS,
): Promise<CredentialOffer> => {
  if (previousOfferId) {
    // Not tied to `signal`: leaving the page while it runs must still free the old code's place.
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), waitMs);
    try {
      await client.cancelOffer(token, previousOfferId, { signal: controller.signal });
    } catch {
      // Best effort: the old code ends by itself within 10 minutes.
    } finally {
      clearTimeout(timer);
    }
  }
  signal?.throwIfAborted();
  return client.createOffer(token, signal);
};

export const loadProblemFor = (error: PortalApiError): LoadProblem => {
  if (error.kind === 'network' || error.kind === 'timeout') return 'network';
  if (error.kind === 'rate_limited') return 'rate_limited';
  if (error.kind === 'forbidden') return 'forbidden';
  if (error.kind === 'validation_failed' || error.kind === 'conflict' || error.kind === 'not_found') return 'rejected';
  return 'unavailable';
};

// ---- Lists of issued diplomas, and the registrar's status changes --------------------------------

// A list is read page by page (`nextCursor`); a reload starts again from the first page and keeps the rows
// on screen until the answer arrives.
export type CredentialsState =
  | { phase: 'loading'; items: IssuedCredential[] | null; nextCursor: string | null }
  | {
    phase: 'ready';
    items: IssuedCredential[];
    nextCursor: string | null;
    loadedAt: number;
    more: 'idle' | 'loading' | LoadProblem;
  }
  | { phase: 'error'; problem: LoadProblem; items: IssuedCredential[] | null; nextCursor: string | null };

export type CredentialsEvent =
  | { type: 'load' }
  | { type: 'loaded'; items: IssuedCredential[]; nextCursor: string | null; at: number }
  | { type: 'loadFailed'; problem: LoadProblem }
  | { type: 'loadMore' }
  | { type: 'moreLoaded'; items: IssuedCredential[]; nextCursor: string | null }
  | { type: 'moreFailed'; problem: LoadProblem }
  /** Applies the server's answer to a status change, never a guess. */
  | { type: 'statusChanged'; id: string; status: CredentialStatus };

export const CREDENTIALS_LOADING: CredentialsState = { phase: 'loading', items: null, nextCursor: null };

export const credentialsReducer = (state: CredentialsState, event: CredentialsEvent): CredentialsState => {
  switch (event.type) {
    case 'load':
      return { phase: 'loading', items: state.items, nextCursor: state.nextCursor };
    case 'loaded':
      return { phase: 'ready', items: event.items, nextCursor: event.nextCursor, loadedAt: event.at, more: 'idle' };
    case 'loadFailed':
      return { phase: 'error', problem: event.problem, items: state.items, nextCursor: state.nextCursor };
    case 'loadMore':
      return state.phase === 'ready' && state.nextCursor !== null ? { ...state, more: 'loading' } : state;
    case 'moreLoaded': {
      if (state.phase !== 'ready' || state.more !== 'loading') return state;
      const known = new Set(state.items.map((item) => item.id));
      return { ...state, items: [...state.items, ...event.items.filter((item) => !known.has(item.id))], nextCursor: event.nextCursor, more: 'idle' };
    }
    case 'moreFailed':
      return state.phase === 'ready' && state.more === 'loading' ? { ...state, more: event.problem } : state;
    case 'statusChanged':
      if (!state.items) return state;
      return {
        ...state,
        items: state.items.map((item) => (item.id === event.id
          ? { ...item, status: event.status, canRevoke: item.canRevoke && event.status !== 'revoked' }
          : item)),
      } as CredentialsState;
    default:
      return state;
  }
};

// ---- Confirming a status change (a student's revocation, a registrar's change) ------------------------

/**
 * `confirm` → `saving` → `done` (the server's answer, applied to the row) or `failed` (the dialog stays
 * open with the reason, and the wait of a 429 or 503). Nothing changes on screen before the answer.
 */
export type ConfirmState<T> =
  | { phase: 'idle' }
  | { phase: 'confirm'; target: T }
  | { phase: 'saving'; target: T }
  | { phase: 'failed'; target: T; problem: StatusChangeProblem; retryAt: number | null }
  | { phase: 'done'; target: T; status: CredentialStatus };

export type ConfirmEvent<T> =
  | { type: 'open'; target: T }
  | { type: 'cancel' }
  | { type: 'save' }
  | { type: 'saved'; status: CredentialStatus }
  | { type: 'failed'; problem: StatusChangeProblem; retryAt?: number };

export const CONFIRM_IDLE = { phase: 'idle' } as const;

export const confirmReducer = <T>(state: ConfirmState<T>, event: ConfirmEvent<T>): ConfirmState<T> => {
  switch (event.type) {
    case 'open':
      return state.phase === 'saving' ? state : { phase: 'confirm', target: event.target };
    case 'cancel':
      return state.phase === 'confirm' || state.phase === 'failed' ? CONFIRM_IDLE : state;
    case 'save':
      return state.phase === 'confirm' || state.phase === 'failed' ? { phase: 'saving', target: state.target } : state;
    case 'saved':
      return state.phase === 'saving' ? { phase: 'done', target: state.target, status: event.status } : state;
    case 'failed':
      return state.phase === 'saving'
        ? { phase: 'failed', target: state.target, problem: event.problem, retryAt: event.retryAt ?? null }
        : state;
    default:
      return state;
  }
};

export type StatusAction = 'suspend' | 'restore' | 'revoke';

export const STATUS_FOR_ACTION: Record<StatusAction, CredentialStatus> = {
  suspend: 'suspended',
  restore: 'valid',
  revoke: 'revoked',
};

/** What a registrar may do with a diploma in a given state. Revocation is final, and only when the server allows it. */
export const actionsFor = (status: CredentialStatus, canRevoke: boolean): StatusAction[] => {
  const revoke: StatusAction[] = canRevoke ? ['revoke'] : [];
  if (status === 'valid') return ['suspend', ...revoke];
  if (status === 'suspended') return ['restore', ...revoke];
  return [];
};

export const countByStatus = (items: IssuedCredential[]): Record<CredentialStatus, number> => items.reduce(
  (counts, item) => ({ ...counts, [item.status]: counts[item.status] + 1 }),
  { valid: 0, suspended: 0, revoked: 0 } as Record<CredentialStatus, number>,
);

export type StatusChangeProblem =
  | 'already_revoked'
  | 'session_expired'
  | 'forbidden'
  | 'not_found'
  | 'rejected'
  | 'rate_limited'
  /** No usable answer (network, timeout, a server error, a malformed body): the outcome is not known. */
  | 'no_answer'
  | 'unavailable';

export const statusChangeProblemFor = (error: PortalApiError): StatusChangeProblem => {
  switch (error.kind) {
    case 'conflict': return 'already_revoked';
    case 'session_expired': return 'session_expired';
    case 'forbidden': return 'forbidden';
    case 'not_found': return 'not_found';
    case 'validation_failed': return 'rejected';
    case 'rate_limited': return 'rate_limited';
    case 'unavailable': return 'unavailable';
    default: return 'no_answer';
  }
};
