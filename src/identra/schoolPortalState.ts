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

// ---- Sign-in ------------------------------------------------------------------------------------

export type SignInProblem = 'invalid_credentials' | 'rate_limited' | 'network' | 'unavailable';
export type SignedOutNotice = 'session_expired' | 'signed_out' | null;

export type AuthState =
  | { status: 'signedOut'; notice: SignedOutNotice; submitting: boolean; problem: SignInProblem | null; retryAfterSeconds: number | null }
  | { status: 'signedIn'; session: PortalSession };

export type AuthEvent =
  | { type: 'submit' }
  | { type: 'signedIn'; session: PortalSession }
  | { type: 'signInFailed'; problem: SignInProblem; retryAfterSeconds?: number }
  | { type: 'signOut' }
  | { type: 'sessionExpired' };

export const SIGNED_OUT: AuthState = { status: 'signedOut', notice: null, submitting: false, problem: null, retryAfterSeconds: null };

export const authReducer = (state: AuthState, event: AuthEvent): AuthState => {
  switch (event.type) {
    case 'submit':
      return state.status === 'signedOut' ? { ...state, submitting: true, problem: null, retryAfterSeconds: null } : state;
    case 'signedIn':
      return { status: 'signedIn', session: event.session };
    case 'signInFailed':
      return state.status === 'signedOut'
        ? { ...state, submitting: false, problem: event.problem, retryAfterSeconds: event.retryAfterSeconds ?? null }
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
  if (error.kind === 'network') return 'network';
  return 'unavailable';
};

// ---- A student's credential offer ---------------------------------------------------------------

export type LoadProblem = 'network' | 'rate_limited' | 'unavailable';

export type OfferState =
  | { phase: 'idle' }
  | { phase: 'creating' }
  | { phase: 'active'; offer: CredentialOffer; reconnecting: boolean }
  | { phase: 'issued'; offer: CredentialOffer }
  | { phase: 'expired' }
  | { phase: 'error'; problem: LoadProblem };

export type OfferEvent =
  | { type: 'create' }
  | { type: 'created'; offer: CredentialOffer }
  | { type: 'status'; offerId: string; status: OfferStatus }
  | { type: 'pollFailed'; offerId: string }
  | { type: 'expiredLocally'; offerId: string }
  | { type: 'failed'; problem: LoadProblem }
  | { type: 'reset' };

export const OFFER_IDLE: OfferState = { phase: 'idle' };

export const offerReducer = (state: OfferState, event: OfferEvent): OfferState => {
  switch (event.type) {
    case 'reset':
      return OFFER_IDLE;
    case 'create':
      return { phase: 'creating' };
    case 'created':
      return state.phase === 'creating' ? { phase: 'active', offer: event.offer, reconnecting: false } : state;
    case 'failed':
      return state.phase === 'creating' ? { phase: 'error', problem: event.problem } : state;
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
  if (error.kind === 'network') return 'network';
  if (error.kind === 'rate_limited') return 'rate_limited';
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

export type StatusChangeProblem = 'already_revoked' | 'session_expired' | 'network' | 'unavailable';

export const statusChangeProblemFor = (error: PortalApiError): StatusChangeProblem => {
  if (error.kind === 'conflict') return 'already_revoked';
  if (error.kind === 'session_expired') return 'session_expired';
  if (error.kind === 'network') return 'network';
  return 'unavailable';
};
