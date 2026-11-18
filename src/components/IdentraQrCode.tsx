/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo } from 'react';
import { create } from 'qrcode';

const QUIET_ZONE = 4;

/** One SVG path for the dark modules, built from the matrix: no canvas, no markup strings, no image service. */
const qrModulesToPath = (value: string): { size: number; path: string } => {
  const { modules } = create(value, { errorCorrectionLevel: 'M' });
  const segments: string[] = [];
  for (let row = 0; row < modules.size; row += 1) {
    for (let col = 0; col < modules.size; col += 1) {
      if (modules.get(row, col)) segments.push(`M${col + QUIET_ZONE} ${row + QUIET_ZONE}h1v1h-1z`);
    }
  }
  return { size: modules.size + QUIET_ZONE * 2, path: segments.join('') };
};

interface IdentraQrCodeProps {
  value: string;
  /** Text alternative read by assistive technology. */
  label: string;
  className?: string;
}

export default function IdentraQrCode({ value, label, className = 'h-56 w-56' }: IdentraQrCodeProps) {
  const { size, path } = useMemo(() => qrModulesToPath(value), [value]);

  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={`0 0 ${size} ${size}`}
      className={`[shape-rendering:crispEdges] ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={size} height={size} fill="#FFFFFF" />
      <path d={path} fill="#0F1E36" />
    </svg>
  );
}
