/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AlertTriangle } from 'lucide-react';
import { CERTNET_CONFIG } from '../identra/config';

/** True only in a build made with the test-only CertNet switch (VITE_CERTNET_ALLOW_LOCAL_FOR_TESTS, config.ts). */
export const CERTNET_TEST_BUILD = CERTNET_CONFIG?.testBuild === true;

/** Shown wherever CertNet results appear in such a build, so it can never be taken for a real site. */
export default function CertNetTestBuildMarker({ text }: { text: string }) {
  return (
    <p role="note" className="type-body-sm flex items-start gap-2 rounded-2xl border-2 border-dashed border-amber-600 bg-amber-100 px-4 py-2 font-semibold text-amber-950" data-testid="certnet-test-build">
      <AlertTriangle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
      <span>{text}</span>
    </p>
  );
}
