/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';

export default function TechGridBg() {
  // Generate 120 high-tech cells for the grid
  const cells = useMemo(() => {
    return Array.from({ length: 120 }).map((_, idx) => {
      // Determine a tech cell type based on index
      let type: 'dot' | 'crosshair' | 'tag' | 'accent' = 'dot';
      let tagText = '';

      if (idx === 14 || idx === 82) {
        type = 'tag';
        tagText = 'SYS_OK';
      } else if (idx === 33 || idx === 89) {
        type = 'tag';
        tagText = 'ID_VERIFIED';
      } else if (idx === 45 || idx === 75) {
        type = 'tag';
        tagText = 'LIVENESS_1';
      } else if (idx === 22 || idx === 54) {
        type = 'tag';
        tagText = 'DEC_A';
      } else if (idx === 58 || idx === 104) {
        type = 'tag';
        tagText = 'ENCRYPT_256';
      } else if (idx % 11 === 0) {
        type = 'crosshair';
      } else if (idx % 13 === 4) {
        type = 'accent';
      }

      return {
        id: idx,
        type,
        tagText,
        delay: (idx % 8) * 0.4,
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-slate-50/40 pointer-events-none select-none z-0">
      {/* Background radial fade using robust CSS to keep corners and outer edges clean and light */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none" 
        style={{
          background: 'radial-gradient(circle at center, transparent 15%, rgba(250, 251, 253, 0.4) 60%, #FAFBFD 98%)'
        }}
      />

      {/* Repeating Grid Overlay with clean, visible borders */}
      <div className="absolute inset-0 grid grid-cols-6 md:grid-cols-10 lg:grid-cols-12 gap-0 h-full w-full opacity-85">
        {cells.map((cell) => {
          return (
            <div
              key={cell.id}
              className="relative aspect-square border border-slate-200/50 flex items-center justify-center p-1 transition-all duration-300"
            >
              {/* Type 1: Dot */}
              {cell.type === 'dot' && (
                <div 
                  className="w-1.5 h-1.5 rounded-full bg-slate-300/80 animate-tech-glow transition-all"
                  style={{ animationDelay: `${cell.delay}s` }}
                />
              )}

              {/* Type 2: Crosshair / Ticks */}
              {cell.type === 'crosshair' && (
                <div className="relative w-4 h-4 flex items-center justify-center">
                  <div className="absolute w-2.5 h-0.5 bg-slate-300/60" />
                  <div className="absolute w-0.5 h-2.5 bg-slate-300/60" />
                  <div className="w-1 h-1 rounded-full bg-[#354CE1]/50" />
                </div>
              )}

              {/* Type 3: Technical system tag */}
              {cell.type === 'tag' && (
                <div className="flex flex-col items-center justify-center space-y-0.5">
                  <span className="font-mono text-[7px] text-[#354CE1] font-bold tracking-tighter uppercase scale-90">
                    {cell.tagText}
                  </span>
                  <div 
                    className="w-1 h-1 rounded-full bg-[#00D4B2]/95 animate-tech-glow"
                    style={{ animationDelay: `${cell.delay}s` }}
                  />
                </div>
              )}

              {/* Type 4: Corner Accent */}
              {cell.type === 'accent' && (
                <div className="absolute inset-1 flex items-start justify-start">
                  <div className="w-2 h-2 border-t-2 border-l-2 border-[#354CE1]/45 rounded-tl-xs" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
