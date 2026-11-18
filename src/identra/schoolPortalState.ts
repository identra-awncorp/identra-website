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

export type OfferState =
  | { phase: 'idle' }
  | { phase: 'creating' }
  | { phase: 'active'; offer: CredentialOffer; clockOffsetMs: number; reconnecting: boolean }
  | { phase: 'issued'; offer: CredentialOffer }
  | { phase: 'expired' }
  | { phase: 'error'; problem: LoadProblem; retryAt: number | null };

export type OfferEvent =
  | { type: 'create' }
  | { type: 'created'; offer: CredentialOffer; clockOffsetMs: number }
  | { type: 'status'; offerId: string; status: OfferStatus }
  | { type: 'pollFailed'; offerId: string }
  | { type: 'expiredLocally'; offerId: string }
  | { type: 'failed'; problem: LoadProblem; retryAt?: number }
  | { type: 'reset' };

export const OFFER_IDLE: OfferState = { phase: 'idle' };

export const offerReducer = (state: OfferState, event: OfferEvent): OfferState => {
  switch (event.type) {
    case 'reset':
      return OFFER_IDLE;
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

export const loadProblemFor = (error: PortalApiError): LoadProblem => {
  if (error.kind === 'network' || error.kind === 'timeout') return 'network';
  if (error.kind === 'rate_limited') return 'rate_limited';
  if (error.kind === 'forbidden') return 'forbidden';
  if (error.kind === 'validation_failed' || error.kind === 'conflict' || error.kind === 'not_found') return 'rejected';
  return 'unavailable';
};

// ---- Lists of issued diplomas, and the registrar's status changes --------------------------------

export type CredentialsState =
  | { phase: 'loading'; items: IssuedCredential[] | null }
  | { phase: 'ready'; items: IssuedCredential[]; loadedAt: number }
  | { phase: 'error'; problem: LoadProblem; items: IssuedCredential[] | null };

export type CredentialsEvent =
  | { type: 'load' }
  | { type: 'loaded'; items: IssuedCredential[]; at: number }
  | { type: 'loadFailed'; problem: LoadProblem }
  /** Applies the server's answer to a status change, never a guess. */
  | { type: 'statusChanged'; id: string; status: CredentialStatus };

export const CREDENTIALS_LOADING: CredentialsState = { phase: 'loading', items: null };

const itemsOf = (state: CredentialsState) => state.items;

export const credentialsReducer = (state: CredentialsState, event: CredentialsEvent): CredentialsState => {
  switch (event.type) {
    case 'load':
      return { phase: 'loading', items: itemsOf(state) };
    case 'loaded':
      return { phase: 'ready', items: event.items, loadedAt: event.at };
    case 'loadFailed':
      return { phase: 'error', problem: event.problem, items: itemsOf(state) };
    case 'statusChanged':
      if (!state.items) return state;
      return {
        ...state,
        items: state.items.map((item) => (item.id === event.id ? { ...item, status: event.status } : item)),
      } as CredentialsState;
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

/** What a registrar may do with a diploma in a given state. Revocation is final. */
export const actionsFor = (status: CredentialStatus): StatusAction[] => {
  if (status === 'valid') return ['suspend', 'revoke'];
  if (status === 'suspended') return ['restore', 'revoke'];
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
  | 'network'
  | 'unavailable';

export const statusChangeProblemFor = (error: PortalApiError): StatusChangeProblem => {
  switch (error.kind) {
    case 'conflict': return 'already_revoked';
    case 'session_expired': return 'session_expired';
    case 'forbidden': return 'forbidden';
    case 'not_found': return 'not_found';
    case 'validation_failed': return 'rejected';
    case 'rate_limited': return 'rate_limited';
    case 'network':
    case 'timeout': return 'network';
    default: return 'unavailable';
  }
};
