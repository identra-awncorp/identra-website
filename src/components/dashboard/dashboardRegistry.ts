/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { PlatformProductId } from '../../types/platformProducts';

export type DashboardProductStatus = 'active' | 'comingSoon';
export type DashboardCapability =
  | 'flowBuilder'
  | 'interfaceBuilder'
  | 'simulation'
  | 'localPersistence';

export type DashboardProductDefinition = {
  readonly id: PlatformProductId;
  readonly status: DashboardProductStatus;
  readonly tool?: 'dynamic-flow' | 'interface-studio';
  readonly capabilities: readonly DashboardCapability[];
};

export const DASHBOARD_PRODUCTS: readonly DashboardProductDefinition[] = [
  {
    id: 'dynamicFlow',
    status: 'active',
    tool: 'dynamic-flow',
    capabilities: ['flowBuilder', 'simulation', 'localPersistence'],
  },
  {
    id: 'interfaceStudio',
    status: 'active',
    tool: 'interface-studio',
    capabilities: ['interfaceBuilder', 'simulation', 'localPersistence'],
  },
  { id: 'relay', status: 'comingSoon', capabilities: [] },
  { id: 'workflows', status: 'comingSoon', capabilities: [] },
  { id: 'caseManagement', status: 'comingSoon', capabilities: [] },
  { id: 'copilot', status: 'comingSoon', capabilities: [] },
  { id: 'passiveSignals', status: 'comingSoon', capabilities: [] },
  { id: 'graph', status: 'comingSoon', capabilities: [] },
  { id: 'marketplace', status: 'comingSoon', capabilities: [] },
] as const;

