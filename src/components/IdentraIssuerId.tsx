/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Fragment } from 'react';
import { shortIssuerId } from '../identra/verifierSession';

// A CertNet issuer's identifier, which stands where the X.509 path shows the trust-list name (ADR-0020):
// shortened to read at a glance, the full value one tap away. Never a name the issuer gave itself.

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1] focus-visible:ring-offset-2';

/** The identifier as text that wraps after a colon before it breaks anywhere else (no overflow on a phone). */
export function IssuerIdText({ value, className = '', testId }: { value: string; className?: string; testId?: string }) {
  return (
    <bdi className={`font-mono [overflow-wrap:anywhere] ${className}`} translate="no" data-testid={testId}>
      {value.split(':').map((part, index) => (
        <Fragment key={index}>
          {index > 0 && <>:<wbr /></>}
          {/* A shortened part (at most 11 characters) never breaks at its ellipsis. */}
          {part.includes('…') ? <span className="whitespace-nowrap">{part}</span> : part}
        </Fragment>
      ))}
    </bdi>
  );
}

export default function IdentraIssuerId({ id, showFullLabel, hideFullLabel, centered = false }: {
  id: string;
  showFullLabel: string;
  hideFullLabel: string;
  centered?: boolean;
}) {
  const short = shortIssuerId(id);
  if (short === id) {
    return <span className="block" data-testid="issuer-did" data-did={id}><IssuerIdText value={id} testId="issuer-did-full" /></span>;
  }
  // The summary holds both forms: tapping the identifier shows it whole, tapping again shortens it.
  return (
    <details className="group" data-testid="issuer-did" data-did={id}>
      <summary className={`inline-flex max-w-full cursor-pointer list-none flex-wrap items-baseline gap-x-2 rounded ${centered ? 'justify-center' : ''} ${focusRing}`}>
        <IssuerIdText value={short} className="group-open:hidden" />
        <IssuerIdText value={id} className="hidden group-open:inline" testId="issuer-did-full" />
        <span className="type-body-sm font-normal text-[#2539BE] underline underline-offset-2">
          <span className="group-open:hidden">{showFullLabel}</span>
          <span className="hidden group-open:inline">{hideFullLabel}</span>
        </span>
      </summary>
    </details>
  );
}
