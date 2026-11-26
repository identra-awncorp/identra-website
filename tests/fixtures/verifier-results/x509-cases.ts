/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// X.509 results of the employer demo whose rendering must not change with the CertNet path (ADR-0020).
// x509-snapshot.json holds the markup of these cases as rendered before that path existed (commit eed1685),
// except the two outage states, which are in X509_OUTAGE_CASES.
import { PRESENTATION_CHECK_IDS, type SessionResult } from '@identra/sdk-client';

const verifiedAt = '2026-11-19T01:00:00.000Z';
const pass = PRESENTATION_CHECK_IDS.map((id) => ({ id, ok: true, code: null }));
const failAt = (id: string, code: string, skipAfter = false): SessionResult => {
  const index = PRESENTATION_CHECK_IDS.indexOf(id as never);
  return {
    ok: false,
    checks: PRESENTATION_CHECK_IDS.map((checkId, i) => (
      i < index ? { id: checkId, ok: true, code: null }
        : i === index ? { id: checkId, ok: false, code: code as never }
          : skipAfter ? { id: checkId, ok: false, code: 'SKIPPED' as const, skipped: true }
            : { id: checkId, ok: true, code: null })),
    verifiedAt,
  };
};

export const X509_CASES: Record<string, SessionResult> = {
  verified: {
    ok: true,
    checks: pass,
    claims: { ho_ten: 'Nguyễn Minh Mẫu', nganh: 'Công nghệ thông tin', hang_tot_nghiep: 'Giỏi' },
    issuer: { maToChuc: 'VATVN-0100000001', ten: 'Trường Đại học Mẫu (DEMO)' },
    verifiedAt,
  },
  verifiedTrustPathX509: {
    ok: true,
    checks: pass,
    claims: { ho_ten: 'Nguyễn Minh Mẫu', nganh: 'Công nghệ thông tin' },
    trustPath: 'x509',
    issuer: { maToChuc: 'VATVN-0999999999', ten: 'Một trường khác' },
    verifiedAt,
  },
  revoked: failAt('status', 'REVOKED'),
  issuerNotTrusted: failAt('issuer_trust', 'ISSUER_NOT_TRUSTED'),
  chainUntrusted: failAt('certificate_chain', 'CERT_CHAIN_UNTRUSTED', true),
};

// A service not answering is "could not be checked right now" (amber) on both paths since the trust-list and
// status-list outage states were brought in line with CertNet's: their markup is deliberately not in the snapshot.
export const X509_OUTAGE_CASES: Record<string, SessionResult> = {
  statusUnavailable: failAt('status', 'STATUS_UNAVAILABLE'),
  trustListUnavailable: failAt('issuer_trust', 'TRUST_LIST_UNAVAILABLE'),
};
