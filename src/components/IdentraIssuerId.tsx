/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Fragment } from 'react';

// A CertNet issuer's identifier, which stands where the X.509 path shows the trust-list name (ADR-0020).
// Never a name the issuer gave itself. Always shown COMPLETE, on every screen: a registrant chooses its own
// identifier on CertNet, so any shortened form (a head and a tail) can be imitated by another issuer.

/** The identifier as text that wraps after a colon before it breaks anywhere else (no overflow on a phone). */
export function IssuerIdText({ value, className = '', testId }: { value: string; className?: string; testId?: string }) {
  return (
    <bdi className={`font-mono [overflow-wrap:anywhere] ${className}`} translate="no" data-testid={testId}>
      {value.split(':').map((part, index) => (
        <Fragment key={index}>
          {index > 0 && <>:<wbr /></>}
          {part}
        </Fragment>
      ))}
    </bdi>
  );
}

export default function IdentraIssuerId({ id, className = 'block' }: { id: string; className?: string }) {
  return <span className={className} data-testid="issuer-did" data-did={id}><IssuerIdText value={id} testId="issuer-did-full" /></span>;
}
