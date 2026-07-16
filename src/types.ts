/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; description: string; href: string }[];
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

export interface VerificationLog {
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
}

export type SandboxStep = 
  | 'welcome' 
  | 'info-entry' 
  | 'doc-select' 
  | 'doc-upload' 
  | 'selfie-check' 
  | 'processing' 
  | 'results'
  | 'dashboard-analytics';

export interface SandboxUserData {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  documentType: 'drivers_license' | 'passport' | 'national_id';
  documentImage: string | null;
  selfieImage: string | null;
  ocrExtracted: {
    nameMatch: boolean;
    dobMatch: boolean;
    expiryOk: boolean;
    documentNumber: string;
    extractedDob: string;
    extractedName: string;
  };
}

export interface PrivacyRequest {
  id: string;
  type: 'access' | 'delete' | 'correct';
  status: 'pending' | 'processing' | 'completed' | 'denied';
  email: string;
  date: string;
  details: string;
}
