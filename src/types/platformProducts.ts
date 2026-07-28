/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from './routes';

export const PLATFORM_PRODUCT_IDS = [
  'flowEditor',
  'dynamicFlow',
  'relay',
  'workflows',
  'caseManagement',
  'copilot',
  'passiveSignals',
  'graph',
  'marketplace',
] as const;

export type PlatformProductId = typeof PLATFORM_PRODUCT_IDS[number];

export const PLATFORM_PRODUCT_VIEWS = {
  flowEditor: 'flow-editor',
  dynamicFlow: 'dynamic-flow',
  relay: 'relay',
  workflows: 'workflows',
  caseManagement: 'case-management',
  copilot: 'copilot',
  passiveSignals: 'passive-signals',
  graph: 'graph',
  marketplace: 'marketplace',
} as const satisfies Record<PlatformProductId, AppView>;

export const PLATFORM_JOURNEY_STAGE_IDS = [
  'collect',
  'orchestrate',
  'analyze',
  'extend',
] as const;

export type PlatformJourneyStageId = typeof PLATFORM_JOURNEY_STAGE_IDS[number];

type PlatformJourneyStage = {
  readonly id: PlatformJourneyStageId;
  readonly products: readonly PlatformProductId[];
};

export const PLATFORM_JOURNEY_STAGES = [
  {
    id: 'collect',
    products: ['flowEditor', 'dynamicFlow', 'relay'],
  },
  {
    id: 'orchestrate',
    products: ['workflows', 'caseManagement', 'copilot'],
  },
  {
    id: 'analyze',
    products: ['passiveSignals', 'graph'],
  },
  {
    id: 'extend',
    products: ['marketplace'],
  },
] as const satisfies readonly PlatformJourneyStage[];
