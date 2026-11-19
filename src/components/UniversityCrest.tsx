/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/** The sample university's crest (a drawn mark, not a real institution's). */
export default function UniversityCrest({ label }: { label: string }) {
  return (
    <svg role="img" aria-label={label} viewBox="0 0 40 44" className="h-11 w-10 shrink-0">
      <path d="M20 1 38 7v15c0 10.5-7.6 18.4-18 21C9.6 40.4 2 32.5 2 22V7L20 1Z" fill="#0F1E36" />
      <path d="M11 30V15l9 8 9-8v15" fill="none" stroke="#FFBF43" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}
