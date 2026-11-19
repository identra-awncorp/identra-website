/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type {
  AcceptResult,
  CredentialSummary,
  DisplayEntry,
  PresentationMatch,
  ResolvedOffer,
  ResolvedPresentation,
  WalletErrorCode,
} from '@identra/sdk-app';
import { truncateText } from './verifierSession';
import { UNSAFE_TEXT } from './schoolPortalClient';

// What the web trial wallet shows, as stable keys and plain data: the screens it moves through, the
// problem behind each SDK error code, and the fields a request would take off the "phone". Type-only
// imports from the SDK: this module ships with the page, the wallet itself loads later.

export type WalletLocale = 'vi' | 'en';

export const DIPLOMA_VCT = 'https://identra.awncorp.vn/vct/bang-tot-nghiep/v1';

/** The diploma's claims in the order the app shows them (identra-app wallet.claims). */
export const DIPLOMA_FIELDS = [
  'ho_ten',
  'ngay_sinh',
  'ma_sinh_vien',
  'nganh',
  'hang_tot_nghiep',
  'nam_tot_nghiep',
  'so_hieu_bang',
] as const;
export type DiplomaField = typeof DIPLOMA_FIELDS[number];

export const isDiplomaField = (name: string): name is DiplomaField => (DIPLOMA_FIELDS as readonly string[]).includes(name);

const fieldRank = (name: string) => {
  const index = (DIPLOMA_FIELDS as readonly string[]).indexOf(name);
  return index === -1 ? DIPLOMA_FIELDS.length : index;
};

/** Field names in display order, unknown names last (as received). */
export const orderFields = (names: readonly string[]): string[] => [...names].sort((a, b) => fieldRank(a) - fieldRank(b));

/** Text from an issuer or a verifier, fit to show: a non-empty string without control or direction characters, cut to `max`. */
export const safeText = (value: unknown, max = 200): string | null =>
  typeof value === 'string' && value.trim() !== '' && !UNSAFE_TEXT.test(value) ? truncateText(value.trim(), max) : null;

/** The issuer's own display name for the locale (then Vietnamese, then any). Unverified: the metadata says so. */
export const displayName = (entries: readonly DisplayEntry[], locale: WalletLocale): string | null => {
  const byLocale = (prefix: string) => entries.find((entry) => entry.locale?.toLowerCase().startsWith(prefix));
  return safeText((byLocale(locale) ?? byLocale('vi') ?? entries[0])?.name);
};

export const purposeText = (purpose: ResolvedPresentation['purpose'], locale: WalletLocale): string | null => {
  if (typeof purpose === 'string') return safeText(purpose, 300);
  if (!purpose) return null;
  return safeText(purpose[locale] ?? purpose.vi ?? purpose.en, 300);
};

// ---- Problems ---------------------------------------------------------------------------------------

/** Every failure the trial wallet explains, one sentence each in the translations. */
export const WALLET_PROBLEMS = [
  'pinWrong',
  'pinRequired',
  'offerExpired',
  'offerInvalid',
  'notAllowed',
  'network',
  'issuerError',
  'credentialInvalid',
  'storage',
  'requestInvalid',
  'requestExpired',
  'verifierUntrusted',
  'trustListUnavailable',
  'certificateInvalid',
  'submitNetwork',
  'submitVerifierError',
  'requestClosed',
  'other',
] as const;
export type WalletProblem = typeof WALLET_PROBLEMS[number];

export const offerProblemFor = (code: WalletErrorCode): WalletProblem => {
  switch (code) {
    case 'TX_CODE_WRONG': return 'pinWrong';
    case 'TX_CODE_REQUIRED': return 'pinRequired';
    case 'OFFER_EXPIRED': return 'offerExpired';
    case 'OFFER_INVALID': return 'offerInvalid';
    case 'URL_NOT_ALLOWED': return 'notAllowed';
    case 'NETWORK_ERROR': return 'network';
    case 'ISSUER_ERROR': return 'issuerError';
    case 'CREDENTIAL_INVALID':
    case 'ISSUER_MISMATCH':
    case 'CNF_MISMATCH':
    case 'CLAIMS_INCOMPLETE': return 'credentialInvalid';
    case 'STORAGE_ERROR':
    case 'KEY_NOT_FOUND': return 'storage';
    default: return 'other';
  }
};

export const requestProblemFor = (code: WalletErrorCode, stage: 'resolve' | 'submit'): WalletProblem => {
  if (stage === 'submit') {
    switch (code) {
      case 'NETWORK_ERROR': return 'submitNetwork';
      case 'VERIFIER_ERROR': return 'submitVerifierError';
      case 'REQUEST_INVALID': return 'requestClosed';
      case 'REQUEST_EXPIRED': return 'requestExpired';
      case 'VERIFIER_NOT_TRUSTED': return 'verifierUntrusted';
      case 'STORAGE_ERROR':
      case 'KEY_NOT_FOUND': return 'storage';
      default: return 'other';
    }
  }
  switch (code) {
    case 'REQUEST_INVALID':
    case 'ALG_NOT_ALLOWED': return 'requestInvalid';
    case 'REQUEST_EXPIRED': return 'requestExpired';
    case 'URL_NOT_ALLOWED': return 'notAllowed';
    case 'TRUST_LIST_UNAVAILABLE': return 'trustListUnavailable';
    case 'VERIFIER_NOT_TRUSTED': return 'verifierUntrusted';
    case 'CLIENT_ID_MISMATCH':
    case 'SIGNATURE_INVALID':
    case 'CERT_CHAIN_MALFORMED':
    case 'CERT_CHAIN_UNTRUSTED':
    case 'CERT_NOT_YET_VALID':
    case 'CERT_EXPIRED':
    case 'CERT_CONSTRAINT_INVALID':
    case 'CERT_KEY_NOT_ALLOWED': return 'certificateInvalid';
    case 'NETWORK_ERROR': return 'network';
    case 'STORAGE_ERROR': return 'storage';
    default: return 'other';
  }
};

// ---- Sharing options --------------------------------------------------------------------------------

export interface SharingOption {
  /** The verifier's claim-set index, sent back in `submit`. */
  index: number;
  /** What leaves the wallet with this option, in display order. */
  fields: string[];
  /** What the fullest option would send and this one keeps on the phone. */
  withheld: string[];
}

/**
 * The options a request allows for one credential, fullest first. The SDK guarantees a strictly shrinking
 * chain (each option a proper subset of the one before), so "share less" can only drop fields.
 */
export const sharingOptions = (match: PresentationMatch): SharingOption[] => {
  const sets = [...match.claimSets].sort((a, b) => a.index - b.index);
  const fullest = sets[0]?.claims ?? [];
  return sets.map((set) => ({
    index: set.index,
    fields: orderFields(set.claims),
    withheld: orderFields(fullest.filter((name) => !set.claims.includes(name))),
  }));
};

/** Fields in every option: they cannot be withheld (the app marks them "Bắt buộc"). */
export const requiredFields = (options: readonly SharingOption[]): string[] =>
  options.length === 0 ? [] : options[options.length - 1]!.fields;

/**
 * The credential to answer with: the newest match whose cached status is not known to be bad. A revoked
 * or suspended newest match is still returned (the wallet then explains why it will not share).
 */
export const chooseMatch = (
  matches: readonly PresentationMatch[],
  summaries: readonly CredentialSummary[],
): { match: PresentationMatch; summary: CredentialSummary | null } | null => {
  if (matches.length === 0) return null;
  const summaryOf = (id: string) => summaries.find((summary) => summary.id === id) ?? null;
  const newestFirst = [...matches].sort(
    (a, b) => Date.parse(summaryOf(b.credentialId)?.createdAt ?? '') - Date.parse(summaryOf(a.credentialId)?.createdAt ?? '') || 0,
  );
  const usable = newestFirst.find((match) => {
    const status = summaryOf(match.credentialId)?.status;
    return status !== 'revoked' && status !== 'suspended' && status !== 'invalid';
  });
  const chosen = usable ?? newestFirst[0]!;
  return { match: chosen, summary: summaryOf(chosen.credentialId) };
};

// ---- Screens ----------------------------------------------------------------------------------------

/** What the page hands to the wallet: an offer or a presentation request, as the QR text. */
export interface WalletInboxItem {
  id: number;
  kind: 'offer' | 'request';
  text: string;
}

export type WalletScreen =
  | { name: 'home' }
  | { name: 'detail'; credentialId: string }
  | { name: 'offerChecking' }
  | { name: 'offerConsent'; offer: ResolvedOffer; busy: boolean; problem: WalletProblem | null }
  | { name: 'offerSaved'; credentialId: string; checked: boolean }
  | { name: 'offerFailed'; problem: WalletProblem }
  | { name: 'requestChecking' }
  | { name: 'requestConsent'; request: ResolvedPresentation; optionIndex: number; busy: boolean; problem: WalletProblem | null }
  | { name: 'requestSent'; verifierName: string | null; fields: string[] }
  | { name: 'requestFailed'; problem: WalletProblem }
  | { name: 'requestDeclined' };

export type WalletEvent =
  | { type: 'home' }
  | { type: 'openDetail'; credentialId: string }
  | { type: 'checkOffer' }
  | { type: 'offerResolved'; offer: ResolvedOffer }
  | { type: 'offerRefused'; code: WalletErrorCode }
  | { type: 'accept' }
  | { type: 'accepted'; result: AcceptResult }
  | { type: 'checkRequest' }
  | { type: 'requestResolved'; request: ResolvedPresentation }
  | { type: 'requestRefused'; code: WalletErrorCode }
  | { type: 'chooseOption'; optionIndex: number }
  | { type: 'submit' }
  | { type: 'submitted'; verifierName: string | null; fields: string[] }
  | { type: 'submitFailed'; code: WalletErrorCode }
  | { type: 'declined' };

export const WALLET_HOME: WalletScreen = { name: 'home' };

export const walletReducer = (state: WalletScreen, event: WalletEvent): WalletScreen => {
  switch (event.type) {
    case 'home':
      return WALLET_HOME;
    case 'openDetail':
      return { name: 'detail', credentialId: event.credentialId };
    case 'checkOffer':
      return { name: 'offerChecking' };
    case 'offerResolved':
      return state.name === 'offerChecking' ? { name: 'offerConsent', offer: event.offer, busy: false, problem: null } : state;
    case 'offerRefused':
      return state.name === 'offerChecking' ? { name: 'offerFailed', problem: offerProblemFor(event.code) } : state;
    case 'accept':
      return state.name === 'offerConsent' && !state.busy ? { ...state, busy: true, problem: null } : state;
    case 'accepted': {
      if (state.name !== 'offerConsent') return state;
      const { result } = event;
      if (result.ok) return { name: 'offerSaved', credentialId: result.credentialId, checked: result.status === 'valid' };
      // A wrong PIN, a lost answer or a held token: the same offer can still complete, so stay on it.
      return result.retryable
        ? { ...state, busy: false, problem: offerProblemFor(result.code) }
        : { name: 'offerFailed', problem: offerProblemFor(result.code) };
    }
    case 'checkRequest':
      return { name: 'requestChecking' };
    case 'requestResolved':
      return state.name === 'requestChecking'
        ? { name: 'requestConsent', request: event.request, optionIndex: 0, busy: false, problem: null }
        : state;
    case 'requestRefused':
      return state.name === 'requestChecking' ? { name: 'requestFailed', problem: requestProblemFor(event.code, 'resolve') } : state;
    case 'chooseOption':
      return state.name === 'requestConsent' && !state.busy ? { ...state, optionIndex: event.optionIndex } : state;
    case 'submit':
      return state.name === 'requestConsent' && !state.busy ? { ...state, busy: true, problem: null } : state;
    case 'submitted':
      return state.name === 'requestConsent' ? { name: 'requestSent', verifierName: event.verifierName, fields: event.fields } : state;
    case 'submitFailed': {
      if (state.name !== 'requestConsent') return state;
      const problem = requestProblemFor(event.code, 'submit');
      // The request was answered or closed: it cannot be used again, a new one is needed.
      return problem === 'requestClosed' || problem === 'requestExpired' || problem === 'submitNetwork' || problem === 'submitVerifierError'
        ? { name: 'requestFailed', problem }
        : { ...state, busy: false, problem };
    }
    case 'declined':
      return state.name === 'requestConsent' ? { name: 'requestDeclined' } : state;
    default:
      return state;
  }
};

/** True while the wallet is in the middle of something the visitor should finish or cancel first. */
export const isBusyScreen = (screen: WalletScreen): boolean =>
  screen.name === 'offerChecking' || screen.name === 'requestChecking'
  || ((screen.name === 'offerConsent' || screen.name === 'requestConsent') && screen.busy);

/** The six-digit PIN as typed: digits only, at most `length`. */
export const normalizePin = (value: string, length = 6): string => value.replace(/\D/g, '').slice(0, length);
