/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { FailureReasonKey } from './verifierSession';

// Progress of the guided diploma demo (/{locale}/demo/diploma): receive the diploma into the web trial
// wallet, apply with it, revoke it and try again. Facts only (what has really happened on the server and
// in the wallet); the current step and every sentence are derived from them at render time.

export const GUIDED_STEPS = ['receive', 'apply', 'revoke'] as const;
export type GuidedStepId = typeof GUIDED_STEPS[number];
export type GuidedPosition = GuidedStepId | 'done';

/** Why the run cannot go on as it is and has to start again. */
export type GuidedNotice = 'reloaded' | 'sessionLost' | 'walletEmpty';

export interface GuidedState {
  /** The trial wallet saved the diploma the school issued in this run. */
  received: boolean;
  /** The employer's check of that diploma passed. */
  applied: boolean;
  /** The school confirmed the revocation. */
  revoked: boolean;
  /**
   * After the revocation, who refused the diploma: the employer's check (it failed at the status step)
   * or the wallet itself (it already knew and would not share, as the Identra app does).
   */
  refusedBy: 'employer' | 'wallet' | null;
  /** The last check after the revocation failed for another reason (for example the list was unreachable). */
  lastFailure: FailureReasonKey | null;
  /** The step on screen: the current one, or an earlier one the visitor went back to. */
  viewing: GuidedPosition;
  notice: GuidedNotice | null;
}

export type GuidedEvent =
  | { type: 'received' }
  /** A verification session ended with a result. `reason`: the first failed check's code. */
  | { type: 'verified'; ok: boolean; reason: FailureReasonKey | null }
  | { type: 'revoked' }
  | { type: 'walletRefused' }
  | { type: 'view'; position: GuidedPosition }
  | { type: 'notice'; notice: GuidedNotice }
  | { type: 'restart' };

export const GUIDED_START: GuidedState = {
  received: false,
  applied: false,
  revoked: false,
  refusedBy: null,
  lastFailure: null,
  viewing: 'receive',
  notice: null,
};

/** The first step not done yet, or `done`. */
export const currentPosition = (state: GuidedState): GuidedPosition => {
  if (!state.received) return 'receive';
  if (!state.applied) return 'apply';
  if (!state.refusedBy) return 'revoke';
  return 'done';
};

const ORDER: readonly GuidedPosition[] = [...GUIDED_STEPS, 'done'];

export const stepStatus = (state: GuidedState, step: GuidedStepId): 'done' | 'current' | 'upcoming' => {
  const current = ORDER.indexOf(currentPosition(state));
  const index = ORDER.indexOf(step);
  return index < current ? 'done' : index === current ? 'current' : 'upcoming';
};

/** A step the visitor may open: one already done, or the current one. */
export const canView = (state: GuidedState, position: GuidedPosition): boolean =>
  ORDER.indexOf(position) <= ORDER.indexOf(currentPosition(state));

export const guidedReducer = (state: GuidedState, event: GuidedEvent): GuidedState => {
  switch (event.type) {
    case 'restart':
      return GUIDED_START;
    case 'notice':
      return { ...state, notice: event.notice };
    case 'view':
      return canView(state, event.position) ? { ...state, viewing: event.position } : state;
    case 'received':
      // Step 1 is done the moment the diploma is in the wallet: move on to step 2 by itself.
      return state.received ? state : { ...state, received: true, viewing: 'apply' };
    case 'verified': {
      if (!state.received) return state;
      if (!state.applied) {
        // Before the revocation only a passing check moves the run on; a failure is shown and retried.
        // The step stays on screen so the result can be read; the visitor moves on with a button.
        return event.ok ? { ...state, applied: true } : state;
      }
      if (!state.revoked || state.refusedBy) return state;
      if (event.ok) return { ...state, lastFailure: null };
      return event.reason === 'REVOKED'
        ? { ...state, refusedBy: 'employer', lastFailure: null, viewing: 'done' }
        : { ...state, lastFailure: event.reason };
    }
    case 'revoked':
      return state.applied ? { ...state, revoked: true } : state;
    case 'walletRefused':
      return state.revoked && !state.refusedBy ? { ...state, refusedBy: 'wallet', viewing: 'done' } : state;
    default:
      return state;
  }
};
