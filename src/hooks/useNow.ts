/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useSyncExternalStore } from 'react';

// One shared clock for countdowns. The snapshot is the current time rounded down to the second, read at
// render time, so the first frame of a countdown is already right and values stay stable within a second;
// a 250 ms ticker re-renders subscribers when the second changes. It stops when nobody listens.
let timer: ReturnType<typeof setInterval> | undefined;
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  if (timer === undefined) {
    timer = setInterval(() => listeners.forEach((notify) => notify()), 250);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && timer !== undefined) {
      clearInterval(timer);
      timer = undefined;
    }
  };
};

const snapshot = () => Math.floor(Date.now() / 1000) * 1000;

/** The local time, refreshed every second while mounted. Add a server clock offset before comparing. */
export const useNow = (): number => useSyncExternalStore(subscribe, snapshot, snapshot);
