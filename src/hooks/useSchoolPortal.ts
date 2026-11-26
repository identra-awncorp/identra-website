/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useReducer, useRef } from 'react';
import { serverClockOffset } from '@identra/sdk-client';
import { IDENTRA_API_ORIGIN, IDENTRA_API_URL, SAMPLE_ISSUER } from '../identra/config';
import {
  createSchoolPortalClient,
  PortalApiError,
  type CredentialStatus,
  type CredentialStatusChange,
  type PortalSession,
  type SchoolPortalClient,
} from '../identra/schoolPortalClient';
import {
  CONFIRM_IDLE,
  confirmReducer,
  OFFER_IDLE,
  offerProblemFor,
  offerReducer,
  pendingOfferId,
  replaceOffer,
  statusChangeProblemFor,
  type ConfirmState,
} from '../identra/schoolPortalState';
import { useNow } from './useNow';

// What the sample university portal and the guided diploma demo share: the portal clients (one per school), a
// student's diploma code (create, poll, cancel on leaving) and the confirmed status change behind the revoke dialog.

const portalClients = new Map<string, SchoolPortalClient>();

/**
 * The portal client of one school: a session it signs in belongs to that school, and only that school's offers
 * and status changes are accepted. The first school signs in exactly as before (the production server does not
 * know the `issuer` field); any other names itself.
 */
export const portalClientFor = (issuer: string): SchoolPortalClient => {
  let client = portalClients.get(issuer);
  if (!client) {
    client = createSchoolPortalClient({ baseUrl: IDENTRA_API_URL, apiOrigin: IDENTRA_API_ORIGIN, issuer, nameIssuerAtSignIn: issuer !== SAMPLE_ISSUER });
    portalClients.set(issuer, client);
  }
  return client;
};

const OFFER_POLL_MS = 2000;

export const focusById = (id: string) => window.requestAnimationFrame(() => document.getElementById(id)?.focus());

/** Seconds until a local instant (a Retry-After deadline), refreshed every second. */
export function useSecondsUntilLocal(deadline: number | null): number {
  const now = useNow();
  return deadline === null ? 0 : Math.max(0, Math.floor((deadline - now) / 1000));
}

/** A local deadline from a 429's or 503's Retry-After, when the server sent one. */
export const retryAtFor = (error: unknown): number | undefined => {
  const seconds = error instanceof PortalApiError ? error.retryAfterSeconds : undefined;
  return seconds === undefined ? undefined : Date.now() + seconds * 1000;
};

/**
 * One student's diploma code: one code in focus (asking for another cancels the pending one first, best
 * effort), polled every 2 s until a wallet collects it, expiry decided on the server's clock, and the
 * pending code cancelled when the visitor leaves (closing the tab, reloading, another page) so it does not
 * hold one of the five places of their network.
 */
export function useStudentOffer({ token, issuer }: Pick<PortalSession, 'token' | 'issuer'>, onSessionExpired: () => void) {
  const schoolPortalClient = portalClientFor(issuer);
  const [offer, dispatchOffer] = useReducer(offerReducer, OFFER_IDLE);
  const createController = useRef<AbortController | null>(null);
  const pendingRef = useRef<string | null>(null);

  useEffect(() => {
    pendingRef.current = pendingOfferId(offer);
  }, [offer]);
  useEffect(() => {
    const cancelPending = () => {
      const offerId = pendingRef.current;
      if (!offerId) return;
      pendingRef.current = null;
      schoolPortalClient.cancelOffer(token, offerId, { keepalive: true }).catch(() => undefined);
    };
    window.addEventListener('pagehide', cancelPending);
    return () => {
      window.removeEventListener('pagehide', cancelPending);
      cancelPending();
    };
  }, [schoolPortalClient, token]);

  const createOffer = async () => {
    const previous = pendingOfferId(offer);
    createController.current?.abort();
    const controller = new AbortController();
    createController.current = controller;
    dispatchOffer({ type: 'create' });
    try {
      const created = await replaceOffer(schoolPortalClient, token, previous, controller.signal);
      if (!controller.signal.aborted) {
        dispatchOffer({ type: 'created', offer: created, clockOffsetMs: serverClockOffset(created.serverTime, Date.now()) });
      }
    } catch (error) {
      if (controller.signal.aborted) return;
      if (error instanceof PortalApiError && error.kind === 'session_expired') {
        onSessionExpired();
        return;
      }
      const retryAt = retryAtFor(error);
      dispatchOffer({
        type: 'failed',
        problem: error instanceof PortalApiError ? offerProblemFor(error) : 'unavailable',
        ...(retryAt !== undefined && { retryAt }),
      });
    }
  };

  useEffect(() => () => createController.current?.abort(), []);

  const activeOffer = offer.phase === 'active' ? offer.offer : null;
  const activeOfferId = activeOffer?.offerId ?? null;
  const activeOfferExpiresAt = activeOffer?.expiresAt ?? null;
  const activeOfferOffset = offer.phase === 'active' ? offer.clockOffsetMs : 0;

  // Nothing is requested after the expiry; a 429 waits for its Retry-After.
  useEffect(() => {
    if (!activeOfferId || !activeOfferExpiresAt) return undefined;
    const controller = new AbortController();
    const expiresAt = Date.parse(activeOfferExpiresAt);
    const serverNow = () => Date.now() + activeOfferOffset;
    let timer: number | undefined;

    const schedule = (waitMs: number) => {
      const left = expiresAt - serverNow();
      if (left <= 0) {
        dispatchOffer({ type: 'expiredLocally', offerId: activeOfferId });
        return;
      }
      timer = window.setTimeout(poll, Math.min(waitMs, left));
    };

    const poll = async () => {
      if (serverNow() >= expiresAt) {
        dispatchOffer({ type: 'expiredLocally', offerId: activeOfferId });
        return;
      }
      try {
        const status = await schoolPortalClient.getOfferStatus(token, activeOfferId, controller.signal);
        if (controller.signal.aborted) return;
        dispatchOffer({ type: 'status', offerId: activeOfferId, status });
        if (status === 'pending') schedule(OFFER_POLL_MS);
      } catch (error) {
        if (controller.signal.aborted) return;
        if (error instanceof PortalApiError && error.kind === 'session_expired') {
          onSessionExpired();
          return;
        }
        // The offer's state is gone (30 minutes after creation): from the student's side it has expired.
        if (error instanceof PortalApiError && error.kind === 'not_found') {
          dispatchOffer({ type: 'status', offerId: activeOfferId, status: 'expired' });
          return;
        }
        dispatchOffer({ type: 'pollFailed', offerId: activeOfferId });
        const retryAfter = error instanceof PortalApiError ? error.retryAfterSeconds : undefined;
        schedule(Math.max(OFFER_POLL_MS, (retryAfter ?? 0) * 1000));
      }
    };

    void poll();
    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [activeOfferExpiresAt, activeOfferId, activeOfferOffset, onSessionExpired, schoolPortalClient, token]);

  return { offer, dispatchOffer, createOffer };
}

/**
 * Drives the confirmation dialog of a status change: no optimistic update, the row changes only with the
 * server's answer (or a 409, which is the server saying it is already revoked).
 */
export function useStatusChange<T>({
  idOf,
  perform,
  onApplied,
  onSessionExpired,
  doneFocusId,
}: {
  idOf: (target: T) => string;
  perform: (target: T, signal: AbortSignal) => Promise<CredentialStatusChange>;
  onApplied: (id: string, status: CredentialStatus) => void;
  onSessionExpired: () => void;
  /** Where focus goes when the dialog closes and its trigger is gone (the row changed). */
  doneFocusId: string;
}) {
  const [state, dispatch] = useReducer(confirmReducer<T>, CONFIRM_IDLE as ConfirmState<T>);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => () => controllerRef.current?.abort(), []);

  const open = (target: T, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    dispatch({ type: 'open', target });
  };

  const cancel = () => {
    dispatch({ type: 'cancel' });
    window.requestAnimationFrame(() => {
      const trigger = triggerRef.current;
      if (trigger?.isConnected) trigger.focus();
      else document.getElementById(doneFocusId)?.focus();
    });
  };

  const save = async () => {
    if (state.phase !== 'confirm' && state.phase !== 'failed') return;
    const { target } = state;
    const controller = new AbortController();
    controllerRef.current = controller;
    dispatch({ type: 'save' });
    try {
      const result = await perform(target, controller.signal);
      if (controller.signal.aborted) return;
      onApplied(result.id, result.status);
      dispatch({ type: 'saved', status: result.status });
      focusById(doneFocusId);
    } catch (error) {
      if (controller.signal.aborted) return;
      const problem = error instanceof PortalApiError ? statusChangeProblemFor(error) : 'no_answer';
      if (problem === 'session_expired') {
        onSessionExpired();
        return;
      }
      if (problem === 'already_revoked') onApplied(idOf(target), 'revoked');
      const retryAt = retryAtFor(error);
      dispatch({ type: 'failed', problem, ...(retryAt !== undefined && { retryAt }) });
    }
  };

  return { state, open, cancel, save };
}

export const isDialogOpen = <T,>(state: ConfirmState<T>): state is Extract<ConfirmState<T>, { phase: 'confirm' | 'saving' | 'failed' }> =>
  state.phase === 'confirm' || state.phase === 'saving' || state.phase === 'failed';
