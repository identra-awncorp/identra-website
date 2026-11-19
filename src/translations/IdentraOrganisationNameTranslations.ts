/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Display names of the sample organisations, keyed by the identifier the trust list and the server use
// (`maToChuc` = VATVN-<tax code>, ADR-0015 section 9). The Vietnamese names are exactly the trust list's.
export const SAMPLE_ORGANISATION_IDS = [
  'VATVN-0100000001',
  'VATVN-0100000002',
  'VATVN-0100000003',
  'VATVN-0100000004',
  'VATVN-0100000005',
] as const;

export type SampleOrganisationId = typeof SAMPLE_ORGANISATION_IDS[number];

export const IDENTRA_ORGANISATION_NAME_TRANSLATIONS = {
  en: {
    'VATVN-0100000001': 'Sample University (DEMO)',
    'VATVN-0100000002': 'Sample Manufacturer (DEMO)',
    'VATVN-0100000003': 'Sample Inspection Centre (DEMO)',
    'VATVN-0100000004': 'Sample Distributor (DEMO)',
    'VATVN-0100000005': 'Sample Employer (DEMO)',
  },
  es: {
    'VATVN-0100000001': 'Universidad de ejemplo (DEMO)',
    'VATVN-0100000002': 'Fabricante de ejemplo (DEMO)',
    'VATVN-0100000003': 'Centro de inspección de ejemplo (DEMO)',
    'VATVN-0100000004': 'Distribuidor de ejemplo (DEMO)',
    'VATVN-0100000005': 'Empleador de ejemplo (DEMO)',
  },
  ja: {
    'VATVN-0100000001': 'サンプル大学（DEMO）',
    'VATVN-0100000002': 'サンプル製造会社（DEMO）',
    'VATVN-0100000003': 'サンプル検査センター（DEMO）',
    'VATVN-0100000004': 'サンプル流通会社（DEMO）',
    'VATVN-0100000005': 'サンプル採用企業（DEMO）',
  },
  de: {
    'VATVN-0100000001': 'Beispiel-Hochschule (DEMO)',
    'VATVN-0100000002': 'Beispiel-Hersteller (DEMO)',
    'VATVN-0100000003': 'Beispiel-Prüfstelle (DEMO)',
    'VATVN-0100000004': 'Beispiel-Händler (DEMO)',
    'VATVN-0100000005': 'Beispiel-Arbeitgeber (DEMO)',
  },
  vi: {
    'VATVN-0100000001': 'Trường Đại học Mẫu (DEMO)',
    'VATVN-0100000002': 'Công ty Sản xuất Mẫu (DEMO)',
    'VATVN-0100000003': 'Trung tâm Kiểm định Mẫu (DEMO)',
    'VATVN-0100000004': 'Công ty Phân phối Mẫu (DEMO)',
    'VATVN-0100000005': 'Nhà tuyển dụng Mẫu (DEMO)',
  },
} as const satisfies Record<'en' | 'es' | 'ja' | 'de' | 'vi', Record<SampleOrganisationId, string>>;
