/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from './types/routes';

export interface NavItem {
  label: string;
  href?: string;
  view?: AppView;
  children?: { label: string; description: string; href: string; view?: AppView }[];
}

export type ProductId = 'verifications' | 'flow' | 'workflows' | 'graph' | 'cases';

export interface ProductFeature {
  id: ProductId;
  title: string;
  description: string;
  tagline: string;
  badge?: string;
  color: string;
}

export interface PrivacyRequest {
  id: string;
  type: 'access' | 'delete' | 'correct';
  status: 'pending' | 'processing' | 'completed' | 'denied';
  email: string;
  date: string;
  details: string;
}
