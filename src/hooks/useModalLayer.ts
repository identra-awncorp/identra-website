/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useSyncExternalStore } from 'react';

/**
 * While a dialog rendered into document.body is open, the app root is `inert`: nothing behind the dialog
 * can be focused, clicked or read by assistive technology.
 */
export const useInertAppRoot = (active: boolean) => {
  useEffect(() => {
    const root = document.getElementById('root');
    if (!active || !root) return undefined;
    root.setAttribute('inert', '');
    return () => root.removeAttribute('inert');
  }, [active]);
};

const COARSE_POINTER = '(pointer: coarse)';

const subscribePointer = (notify: () => void) => {
  const query = window.matchMedia(COARSE_POINTER);
  query.addEventListener('change', notify);
  return () => query.removeEventListener('change', notify);
};

/** True on touch-first devices (phones, tablets), where opening the wallet directly beats scanning. */
export const useIsTouchDevice = (): boolean => useSyncExternalStore(
  subscribePointer,
  () => window.matchMedia(COARSE_POINTER).matches,
  () => false,
);
