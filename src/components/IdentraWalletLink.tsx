/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Check, Copy, Smartphone } from 'lucide-react';

interface IdentraWalletLinkProps {
  /** An `openid4vp://` or `openid-credential-offer://` link already validated by its client. */
  href: string;
  openLabel: string;
  linkLabel: string;
  copyLabel: string;
  copiedLabel: string;
  /** On touch devices the "open in wallet" button comes first and is the primary action. */
  emphasizeOpen: boolean;
}

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#354CE1] focus-visible:ring-offset-2';

/** The wallet link in every form a person may need: a button to open it, the text to read, and a copy button. */
export default function IdentraWalletLink({ href, openLabel, linkLabel, copyLabel, copiedLabel, emphasizeOpen }: IdentraWalletLinkProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(href);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="space-y-3">
      <a
        href={href}
        className={`type-control inline-flex min-h-11 items-center gap-2 rounded-full px-5 transition-colors ${focusRing} ${
          emphasizeOpen ? 'bg-[#354CE1] text-white hover:bg-[#2539BE]' : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
        }`}
      >
        <Smartphone aria-hidden="true" className="h-4 w-4" />
        {openLabel}
      </a>
      <div className="flex items-start gap-2 rounded-2xl bg-slate-50 p-3">
        <div className="min-w-0 flex-1">
          <p className="type-caption text-slate-600">{linkLabel}</p>
          <p className="type-technical break-all text-slate-800" translate="no">{href}</p>
        </div>
        <button
          type="button"
          onClick={() => void copy()}
          aria-label={copied ? copiedLabel : copyLabel}
          title={copied ? copiedLabel : copyLabel}
          className={`flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-slate-700 hover:bg-slate-200 ${focusRing}`}
        >
          {copied ? <Check aria-hidden="true" className="h-4 w-4" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
        </button>
      </div>
      <p role="status" aria-live="polite" className="sr-only">{copied ? copiedLabel : ''}</p>
    </div>
  );
}
