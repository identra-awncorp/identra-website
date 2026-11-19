/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// The lazy chunk of the web trial wallet: the SDK wallet and its dependencies load only when a page that
// shows the trial wallet asks for them (DemoWalletPanel), never with the marketing bundle.
import { IDENTRA_API_ORIGIN, IDENTRA_API_URL } from './config';
import { createDemoWallet, type Wallet } from './demoWallet';
import { PINNED_ROOTS } from './pinnedRoots';

// One trial wallet per tab, in memory only: it survives moving between pages of the site (and a language
// switch), not a reload. `resetDemoWallet` is "a new phone".
let current: Wallet | null = null;

// The wallet's clock follows the server's (the page knows the offset from every answer that carries
// `serverTime`): a device clock a minute slow or five minutes fast would otherwise fail every request.
let clockOffsetMs = 0;
const clock = { now: () => new Date(Date.now() + clockOffsetMs) };
export const setDemoWalletClockOffset = (offsetMs: number) => {
  clockOffsetMs = Number.isFinite(offsetMs) ? offsetMs : 0;
};

export const getDemoWallet = (): Wallet => {
  current ??= createDemoWallet({ apiOrigin: IDENTRA_API_ORIGIN, apiUrl: IDENTRA_API_URL, trustedRoots: PINNED_ROOTS, clock });
  return current;
};

export const resetDemoWallet = (): Wallet => {
  current = null;
  return getDemoWallet();
};
