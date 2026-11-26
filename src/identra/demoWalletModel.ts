/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Check } from '@identra/sdk-core';
import type {
  AcceptFailure,
  AcceptResult,
  CredentialDetails,
  CredentialSummary,
  DisplayEntry,
  PresentationMatch,
  ResolvedOffer,
  ResolvedPresentation,
  Wallet,
  WalletErrorCode,
} from '@identra/sdk-app';
import { certNetIssuerId, truncateText } from './verifierSession';
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

// ---- How the issuer was checked ------------------------------------------------------------------

/**
 * How a document's issuer was recognised, for display. `x509`: through its certificate and Identra's
 * trust list, with the trust-list name when the wallet could confirm it. `did`: through CertNet, shown by
 * its identifier only: that path has no name, and neither the issuer's own display name nor its web
 * address is ever shown as one (ADR-0020).
 */
export type IssuerView =
  | { trustPath: 'x509'; name: string | null }
  | { trustPath: 'did'; did: string | null };

export const issuerView = (source: { trustPath?: 'x509' | 'did'; issuerDid?: string | null; issuerName?: string | null }): IssuerView =>
  source.trustPath === 'did' || source.issuerDid
    ? { trustPath: 'did', did: certNetIssuerId(source.issuerDid) }
    : { trustPath: 'x509', name: safeText(source.issuerName) };

/** Why the last check of a CertNet document did not settle it, when the reason is CertNet's. X.509 documents get none. */
export type WalletCheckNote = 'certnetUnavailable' | 'issuerNotRecognised';

export const checkNoteFor = (trustPath: 'x509' | 'did', checks: readonly Check[]): WalletCheckNote | null => {
  if (trustPath !== 'did') return null;
  const failing = (id: string, code: string) => checks.some((check) => check.id === id && !check.ok && check.code === code);
  if (failing('did_resolution', 'DID_RESOLUTION_UNAVAILABLE') || failing('issuer_trust', 'TRUST_LIST_UNAVAILABLE')) return 'certnetUnavailable';
  if (failing('issuer_trust', 'ISSUER_NOT_TRUSTED')) return 'issuerNotRecognised';
  return null;
};

// ---- Problems ---------------------------------------------------------------------------------------

/** Every failure the trial wallet explains, one sentence each in the translations. */
export const WALLET_PROBLEMS = [
  'pinWrong',
  'pinRequired',
  'offerExpired',
  'offerInvalid',
  /** An offer whose issuer is checked through CertNet while the wallet has no CertNet configuration (TRUST_PATH_UNSUPPORTED). */
  'offerNeedsCertNet',
  'notAllowed',
  'network',
  /** At receipt: CertNet did not answer, so the issuer is not checked yet; nothing stored, retry without the PIN. */
  'certnetUnavailable',
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
  /** At sending: the verifier got the document but could not check it now (CertNet out of reach); nothing concluded, the same request can be sent again. */
  'verifierCouldNotCheck',
  'requestClosed',
  /** After a 'verifierCouldNotCheck' send: the request cannot be sent again (used up, expired, closed or lost); what was sent stays sent. */
  'requestUsedUp',
  'other',
] as const;
export type WalletProblem = typeof WALLET_PROBLEMS[number];

export const offerProblemFor = (code: WalletErrorCode): WalletProblem => {
  switch (code) {
    case 'TX_CODE_WRONG': return 'pinWrong';
    case 'TX_CODE_REQUIRED': return 'pinRequired';
    case 'OFFER_EXPIRED': return 'offerExpired';
    case 'OFFER_INVALID': return 'offerInvalid';
    case 'TRUST_PATH_UNSUPPORTED': return 'offerNeedsCertNet';
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

/** A failed accept: an issuer CertNet could not resolve is "not checked yet", not a network failure of Identra. */
export const acceptProblemFor = (result: AcceptFailure): WalletProblem =>
  result.checks?.some((check) => check.code === 'DID_RESOLUTION_UNAVAILABLE') ? 'certnetUnavailable' : offerProblemFor(result.code);

export const requestProblemFor = (code: WalletErrorCode, stage: 'resolve' | 'submit'): WalletProblem => {
  if (stage === 'submit') {
    switch (code) {
      case 'NETWORK_ERROR': return 'submitNetwork';
      case 'VERIFIER_ERROR': return 'submitVerifierError';
      case 'DID_RESOLUTION_UNAVAILABLE': return 'verifierCouldNotCheck';
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

/** What a share that reached the verifier sent: the request is pinned to it (the SDK refuses any other choice). */
export interface DeliveredShare {
  credentialId: string;
  claimSetIndex: number;
  fields: string[];
}

/** The SDK's pin of a resolved request as the share it fixes (null when the pinned option is not among the matches). */
export const pinnedShare = (request: ResolvedPresentation): DeliveredShare | null => {
  const pinned = request.pinned ?? null;
  if (!pinned) return null;
  const set = request.matches.find((match) => match.credentialId === pinned.credentialId)?.claimSets.find((claimSet) => claimSet.index === pinned.claimSetIndex);
  return set ? { credentialId: pinned.credentialId, claimSetIndex: pinned.claimSetIndex, fields: orderFields(set.claims) } : null;
};

/** The request a QR names, as the SDK keys its pin (verifier and request address); the text itself when it does not parse. */
export const requestKey = (text: string): string => {
  try {
    const params = new URL(text).searchParams;
    return `${params.get('client_id') ?? ''} ${params.get('request_uri') ?? ''}`;
  } catch {
    return text;
  }
};

export type WalletScreen =
  | { name: 'home' }
  | { name: 'detail'; credentialId: string }
  | { name: 'offerChecking' }
  | { name: 'offerConsent'; offer: ResolvedOffer; busy: boolean; problem: WalletProblem | null }
  /**
   * `issuerName`: the trust-list name, known only once the wallet checked the issuer (null when it could not).
   * `issuerDid`: a CertNet issuer's identifier, which then stands instead of a name (`issuerName` is null).
   */
  | { name: 'offerSaved'; credentialId: string; checked: boolean; issuerName: string | null; issuerDid: string | null }
  | { name: 'offerFailed'; problem: WalletProblem }
  | { name: 'requestChecking' }
  /**
   * `optionIndex` null until the visitor chooses how much to share: nothing is preselected. `delivered`: the
   * verifier received a share but could not check it now; the screen is then locked to it (send again or stop).
   */
  | { name: 'requestConsent'; request: ResolvedPresentation; optionIndex: number | null; busy: boolean; problem: WalletProblem | null; delivered: DeliveredShare | null }
  | { name: 'requestSent'; verifierName: string | null; fields: string[] }
  /** `delivered`: what an earlier send of this request left with the verifier (it stays there). */
  | { name: 'requestFailed'; problem: WalletProblem; delivered: string[] | null }
  | { name: 'requestDeclined'; delivered: string[] | null };

export type WalletEvent =
  | { type: 'home' }
  | { type: 'openDetail'; credentialId: string }
  | { type: 'checkOffer' }
  | { type: 'offerResolved'; offer: ResolvedOffer }
  | { type: 'offerRefused'; code: WalletErrorCode }
  | { type: 'accept' }
  | { type: 'accepted'; result: AcceptResult }
  | { type: 'checkRequest' }
  /** `delivered`: a share of this request already reached the verifier; the screen opens locked to it. */
  | { type: 'requestResolved'; request: ResolvedPresentation; delivered?: DeliveredShare | null }
  | { type: 'requestRefused'; code: WalletErrorCode }
  /** A request that already reached the verifier and cannot be sent again; `fields`: what it holds. */
  | { type: 'requestUsedUp'; fields: string[] | null }
  | { type: 'chooseOption'; optionIndex: number }
  | { type: 'submit' }
  | { type: 'submitted'; verifierName: string | null; fields: string[] }
  /** `attempt`: what this send carried. */
  | { type: 'submitFailed'; code: WalletErrorCode; attempt: DeliveredShare }
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
      if (result.ok) {
        const issuer = issuerView(result);
        return {
          name: 'offerSaved',
          credentialId: result.credentialId,
          checked: result.status === 'valid',
          issuerName: issuer.trustPath === 'x509' ? issuer.name : null,
          issuerDid: issuer.trustPath === 'did' ? issuer.did : null,
        };
      }
      // A wrong PIN, a lost answer, a held token or an issuer CertNet did not resolve yet: the same offer
      // can still complete, so stay on it.
      return result.retryable
        ? { ...state, busy: false, problem: acceptProblemFor(result) }
        : { name: 'offerFailed', problem: acceptProblemFor(result) };
    }
    case 'checkRequest':
      return { name: 'requestChecking' };
    case 'requestResolved':
      // Opened again after a share reached the verifier: the same locked screen as after its first answer.
      return state.name === 'requestChecking'
        ? { name: 'requestConsent', request: event.request, optionIndex: null, busy: false, problem: event.delivered ? 'verifierCouldNotCheck' : null, delivered: event.delivered ?? null }
        : state;
    case 'requestRefused':
      return state.name === 'requestChecking' ? { name: 'requestFailed', problem: requestProblemFor(event.code, 'resolve'), delivered: null } : state;
    case 'requestUsedUp':
      return state.name === 'requestChecking' ? { name: 'requestFailed', problem: 'requestUsedUp', delivered: event.fields } : state;
    case 'chooseOption':
      // After a share reached the verifier the choice is fixed: only that same share can go again.
      return state.name === 'requestConsent' && !state.busy && !state.delivered ? { ...state, optionIndex: event.optionIndex } : state;
    case 'submit':
      return state.name === 'requestConsent' && !state.busy ? { ...state, busy: true, problem: null } : state;
    case 'submitted':
      return state.name === 'requestConsent' ? { name: 'requestSent', verifierName: event.verifierName, fields: event.fields } : state;
    case 'submitFailed': {
      if (state.name !== 'requestConsent') return state;
      const problem = requestProblemFor(event.code, 'submit');
      // Received but not checked now: the request stays open, locked to what was sent.
      if (problem === 'verifierCouldNotCheck') return { ...state, busy: false, problem, delivered: state.delivered ?? event.attempt };
      // The request was answered or closed: it cannot be used again, a new one is needed.
      const ended = problem === 'requestClosed' || problem === 'requestExpired' || problem === 'submitNetwork' || problem === 'submitVerifierError';
      if (!ended) return { ...state, busy: false, problem };
      // After a share that reached the verifier, say that the request is used up and what it already holds.
      return state.delivered
        ? { name: 'requestFailed', problem: 'requestUsedUp', delivered: state.delivered.fields }
        : { name: 'requestFailed', problem, delivered: null };
    }
    case 'declined':
      return state.name === 'requestConsent' ? { name: 'requestDeclined', delivered: state.delivered?.fields ?? null } : state;
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

// ---- Consent ----------------------------------------------------------------------------------------

export interface HeldCredential {
  summary: CredentialSummary;
  details: CredentialDetails | null;
}

export type BlockedStatus = 'revoked' | 'suspended' | 'invalid';

/** Everything the share screen may show and do, decided in one place (and tested). */
export interface ConsentView {
  trusted: boolean;
  /** The verifier's trust-list name and stated purpose: only for a trusted verifier, never what an unknown party claims. */
  verifierName: string | null;
  purpose: string | null;
  match: PresentationMatch | null;
  summary: CredentialSummary | null;
  /** The wallet already knows the credential is no longer good: it will not share it (as the app does). */
  blocked: BlockedStatus | null;
  options: SharingOption[];
  selected: SharingOption | null;
  /** Fields in every option: cannot be withheld. */
  required: string[];
  /** What the verifier asks for (the fullest option). */
  requested: string[];
  /** Fields of the credential that do not leave the wallet this time (with the current choice, or whatever is chosen). */
  staying: string[];
  canShare: boolean;
}

/** `delivered`: the share the request is locked to; it then decides the document and the option, not the visitor. */
export const consentView = (
  request: ResolvedPresentation,
  held: readonly HeldCredential[],
  optionIndex: number | null,
  locale: WalletLocale,
  delivered: DeliveredShare | null = null,
): ConsentView => {
  const trusted = request.verifier.trusted;
  const pinnedMatch = delivered ? request.matches.find((match) => match.credentialId === delivered.credentialId) : undefined;
  const chosen = !delivered
    ? chooseMatch(request.matches, held.map((item) => item.summary))
    : pinnedMatch ? { match: pinnedMatch, summary: held.find((item) => item.summary.id === pinnedMatch.credentialId)?.summary ?? null } : null;
  const options = chosen ? sharingOptions(chosen.match) : [];
  const selected = delivered
    ? options.find((option) => option.index === delivered.claimSetIndex) ?? null
    : optionIndex === null ? null : options[optionIndex] ?? null;
  const status = chosen?.summary?.status;
  const blocked: BlockedStatus | null = status === 'revoked' || status === 'suspended' || status === 'invalid' ? status : null;
  const requested = options[0]?.fields ?? [];
  const claims = Object.keys(held.find((item) => item.summary.id === chosen?.match.credentialId)?.details?.claims ?? {});
  const leaving = selected ? selected.fields : requested;
  return {
    trusted,
    verifierName: request.verifier.trusted ? safeText(request.verifier.ten) : null,
    purpose: trusted ? purposeText(request.purpose, locale) : null,
    match: chosen?.match ?? null,
    summary: chosen?.summary ?? null,
    blocked,
    options,
    selected,
    required: requiredFields(options),
    requested,
    staying: orderFields(claims.filter((name) => !leaving.includes(name))),
    canShare: trusted && chosen !== null && blocked === null && selected !== null,
  };
};

// ---- The wallet's behaviour, independent of React ------------------------------------------------------

export type WalletControllerEvent =
  /** `checked`: the wallet confirmed it all at receipt (status valid); false: stored but "not checked yet". */
  | { type: 'credentialReceived'; credentialId: string; checked: boolean }
  | { type: 'presentationSent'; itemId: number }
  /** A share of this request reached the verifier, which could not check it now: only "send again" or "stop" remain. */
  | { type: 'presentationDelivered'; itemId: number }
  | { type: 'presentationDeclined'; itemId: number }
  | { type: 'presentationBlocked'; itemId: number; status: BlockedStatus };

export interface WalletControllerState {
  screen: WalletScreen;
  held: HeldCredential[];
  /** True while the wallet works on something that must not be interrupted (an accept or a share in flight, a code being read). */
  busy: boolean;
  checking: { id: string; failed: boolean } | null;
  /** Per document: why its last check through CertNet did not settle it (set by a check in this tab). */
  notes: Readonly<Record<string, WalletCheckNote>>;
}

export type WalletLike = Pick<Wallet, 'offers' | 'credentials' | 'presentations'>;

/**
 * Per wallet ("phone"), by request (requestKey): the share that reached the verifier. Kept with the wallet, not the
 * controller, so a page that mounts the wallet again (another controller) still never offers a fresh choice; the
 * SDK's own pin (`pinned`) says the same for 10 minutes. A reload makes a new wallet with an empty memory.
 */
const deliveries = new WeakMap<WalletLike, Map<string, DeliveredShare>>();

/**
 * Drives one trial wallet. A new hand-off is refused while an accept or a share is in flight (it would
 * leave the outcome of that call unseen), and an outcome that arrives after the visitor moved on is still
 * reported: a credential the SDK stored is announced and listed, a sent answer is announced.
 */
export const createWalletController = (
  wallet: WalletLike,
  onEvent: (event: WalletControllerEvent) => void,
  locale: () => WalletLocale,
) => {
  let state: WalletControllerState = { screen: WALLET_HOME, held: [], busy: false, checking: null, notes: {} };
  const listeners = new Set<() => void>();
  let operation = 0;
  let inFlight = false;
  let currentItem: WalletInboxItem | null = null;
  const blockedReported = new Set<number>();
  const sentBefore = deliveries.get(wallet) ?? new Map<string, DeliveredShare>();
  deliveries.set(wallet, sentBefore);

  const set = (patch: Partial<WalletControllerState>) => {
    const next = { ...state, ...patch };
    state = { ...next, busy: inFlight || isBusyScreen(next.screen) };
    listeners.forEach((listener) => listener());
  };
  const dispatch = (event: WalletEvent) => set({ screen: walletReducer(state.screen, event) });

  const refreshHeld = async () => {
    const summaries = await wallet.credentials.list();
    const held = await Promise.all(summaries.map(async (summary) => {
      const result = await wallet.credentials.get(summary.id);
      return { summary, details: result.ok ? result.credential : null };
    }));
    set({ held: held.sort((a, b) => Date.parse(b.summary.createdAt) - Date.parse(a.summary.createdAt)) });
    return held;
  };

  /** Re-checks a stored document and keeps CertNet's part of the answer for the detail screen. */
  const recheck = async (credentialId: string) => {
    const result = await wallet.credentials.refreshStatus(credentialId);
    const held = await refreshHeld();
    const trustPath = held.find((item) => item.summary.id === credentialId)?.summary.trustPath ?? 'x509';
    const note = result.ok ? checkNoteFor(trustPath, result.checks) : null;
    const notes: Record<string, WalletCheckNote> = { ...state.notes };
    if (note) notes[credentialId] = note;
    else delete notes[credentialId];
    set({ notes });
    return result;
  };

  const reportBlocked = () => {
    if (state.screen.name !== 'requestConsent' || !currentItem || blockedReported.has(currentItem.id)) return;
    const view = consentView(state.screen.request, state.held, state.screen.optionIndex, locale(), state.screen.delivered);
    if (view.trusted && view.blocked) {
      blockedReported.add(currentItem.id);
      onEvent({ type: 'presentationBlocked', itemId: currentItem.id, status: view.blocked });
    }
  };

  return {
    getState: () => state,
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    refresh: refreshHeld,

    /** Opens what the page handed over. Refused (false) while an accept or a share is in flight. */
    open(item: WalletInboxItem): boolean {
      if (inFlight) return false;
      if (state.screen.name === 'offerConsent') void wallet.offers.discard(state.screen.offer);
      const op = ++operation;
      currentItem = item;
      if (item.kind === 'offer') {
        dispatch({ type: 'checkOffer' });
        void wallet.offers.resolve(item.text).then((result) => {
          if (op !== operation) return;
          dispatch(result.ok ? { type: 'offerResolved', offer: result.offer } : { type: 'offerRefused', code: result.code });
        });
      } else {
        dispatch({ type: 'checkRequest' });
        const key = requestKey(item.text);
        void Promise.all([wallet.presentations.resolve(item.text), refreshHeld()]).then(([result]) => {
          if (op !== operation) return;
          // A request a share of which already reached the verifier never opens as a fresh choice again.
          const before = sentBefore.get(key) ?? null;
          if (result.ok) {
            const pinned = pinnedShare(result.request);
            if (pinned) {
              sentBefore.set(key, pinned);
              dispatch({ type: 'requestResolved', request: result.request, delivered: pinned });
              onEvent({ type: 'presentationDelivered', itemId: item.id });
            } else if (before || result.request.pinned) {
              // The SDK no longer holds what was sent (its pin lapsed): nothing can be sent for it any more.
              wallet.presentations.decline(result.request);
              dispatch({ type: 'requestUsedUp', fields: before?.fields ?? null });
            } else {
              dispatch({ type: 'requestResolved', request: result.request, delivered: null });
            }
          } else if (before && (result.code === 'REQUEST_INVALID' || result.code === 'REQUEST_EXPIRED')) {
            // Sent as often as allowed, or closed: say so, and what it already holds.
            dispatch({ type: 'requestUsedUp', fields: before.fields });
          } else {
            dispatch({ type: 'requestRefused', code: result.code });
          }
          reportBlocked();
        });
      }
      return true;
    },

    /** `pin` is needed only while the offer's code is not redeemed. 'pinIncomplete': nothing was sent. */
    async accept(pin: string): Promise<'pinIncomplete' | 'done' | 'ignored'> {
      const screen = state.screen;
      if (screen.name !== 'offerConsent' || screen.busy || inFlight) return 'ignored';
      const needsPin = !screen.offer.codeRedeemed && screen.offer.txCode !== null;
      if (needsPin && pin.length < (screen.offer.txCode?.length ?? 6)) return 'pinIncomplete';
      const op = operation;
      inFlight = true;
      dispatch({ type: 'accept' });
      let result: AcceptResult;
      try {
        result = await wallet.offers.accept(screen.offer, needsPin ? { txCode: pin } : {});
      } finally {
        inFlight = false;
      }
      if (result.ok) {
        // Stored by the SDK: list it and say so, whatever the screen shows now.
        await refreshHeld();
        onEvent({ type: 'credentialReceived', credentialId: result.credentialId, checked: result.status === 'valid' });
      }
      if (op === operation) dispatch({ type: 'accepted', result });
      else set({});
      return 'done';
    },

    choose(optionIndex: number) {
      dispatch({ type: 'chooseOption', optionIndex });
    },

    async share(): Promise<void> {
      const screen = state.screen;
      if (screen.name !== 'requestConsent' || screen.busy || inFlight || !currentItem) return;
      const view = consentView(screen.request, state.held, screen.optionIndex, locale(), screen.delivered);
      if (!view.canShare || !view.match || !view.selected) return;
      const item = currentItem;
      const op = operation;
      // Once a share reached the verifier, exactly that share goes again (the SDK refuses any other).
      const attempt: DeliveredShare = screen.delivered ?? { credentialId: view.match.credentialId, claimSetIndex: view.selected.index, fields: view.selected.fields };
      inFlight = true;
      dispatch({ type: 'submit' });
      let result: Awaited<ReturnType<WalletLike['presentations']['submit']>>;
      try {
        result = await wallet.presentations.submit(screen.request, { credentialId: attempt.credentialId, claimSetIndex: attempt.claimSetIndex });
      } finally {
        inFlight = false;
      }
      if (result.ok) {
        onEvent({ type: 'presentationSent', itemId: item.id });
        // The wallet learns the credential's current status afterwards, as the app refreshes it.
        void recheck(attempt.credentialId);
      } else if (requestProblemFor(result.code, 'submit') === 'verifierCouldNotCheck') {
        // Received, not checked: remembered whatever the screen shows now.
        sentBefore.set(requestKey(item.text), attempt);
        onEvent({ type: 'presentationDelivered', itemId: item.id });
      }
      if (op !== operation) {
        set({});
        return;
      }
      dispatch(result.ok ? { type: 'submitted', verifierName: view.verifierName, fields: attempt.fields } : { type: 'submitFailed', code: result.code, attempt });
    },

    decline() {
      const screen = state.screen;
      if (screen.name !== 'requestConsent' || screen.busy || inFlight || !currentItem) return;
      wallet.presentations.decline(screen.request);
      dispatch({ type: 'declined' });
      // Stopping after a share reached the verifier is not a refusal: they hold what was sent.
      if (!screen.delivered) onEvent({ type: 'presentationDeclined', itemId: currentItem.id });
    },

    home() {
      if (inFlight) return;
      if (state.screen.name === 'offerConsent') void wallet.offers.discard(state.screen.offer);
      operation += 1;
      dispatch({ type: 'home' });
    },

    openDetail(credentialId: string) {
      if (inFlight) return;
      dispatch({ type: 'openDetail', credentialId });
    },

    async checkAgain(credentialId: string) {
      set({ checking: { id: credentialId, failed: false } });
      const result = await recheck(credentialId);
      set({ checking: result.ok && result.status !== 'unknown' ? null : { id: credentialId, failed: true } });
    },
  };
};

export type WalletController = ReturnType<typeof createWalletController>;
