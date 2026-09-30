import React from 'react';
import { Sparkles, Terminal, Layers, Cpu, Cloud, Globe, Zap } from 'lucide-react';

const defaultItems = [
  { text: 'WEBLETS // COMPONENT SYSTEMS', icon: Layers, tag: 'v2.4' },
  { text: 'STACK ADDA // DEV MATRIX', icon: Terminal, tag: 'CORE' },
  { text: 'NEURAL NEXUS // AUTONOMOUS SWARMS', icon: Cpu, tag: 'AI' },
  { text: 'CLOUD FORGE // EDGE MESH', icon: Cloud, tag: 'ZERO-TRUST' },
  { text: 'SOVEREIGN DIGITAL VENTURES', icon: Globe, tag: 'GLOBAL' },
  { text: 'WE BIND IDEAS', icon: Sparkles, tag: 'OS' },
];

/**
 * Ultra-Modern Infinite Marquee Ticker
 * Features:
 * - Dual-sided gradient smoke / shadow feathering for seamless edge disappearance.
 * - Frosted obsidian micro-badges with titanium monospace typography.
 * - Smooth continuous hardware-accelerated glide.
 */
export const InfiniteTicker = ({ items = defaultItems }) => {
  return (
    <div className="relative w-full overflow-hidden border-y border-white/[0.08] bg-black/60 backdrop-blur-xl py-4 select-none my-2 sm:my-4">
      {/* ====================================================
          SMOKE GRADIENT 1: LEFT EDGE (Fade out from black)
          ==================================================== */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-black via-black/90 to-transparent pointer-events-none z-10" 
        aria-hidden="true" 
      />

      {/* ====================================================
          SMOKE GRADIENT 2: RIGHT EDGE (Fade in to black)
          ==================================================== */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-black via-black/90 to-transparent pointer-events-none z-10" 
        aria-hidden="true" 
      />

      {/* Ticker Track with CSS Linear Mask */}
      <div className="flex w-max animate-ticker [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
        {/* Render 3 times for a seamless infinite loop */}
        {[...items, ...items, ...items].map((item, idx) => {
          const Icon = item.icon || Sparkles;
          return (
            <div
              key={idx}
              className="flex items-center space-x-3 px-4 sm:px-6 shrink-0 group cursor-default"
            >
              {/* Sleek Frosted Titanium Badge Item */}
              <div className="flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full liquid-glass-pill border border-white/10 group-hover:border-white/25 transition-all duration-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <Icon className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors shrink-0" />
                <span className="font-mono text-[11px] sm:text-xs font-bold tracking-widest uppercase text-zinc-300 group-hover:text-white transition-colors">
                  {item.text}
                </span>
                <span className="font-mono text-[9px] text-zinc-500 uppercase px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/10 shrink-0">
                  {item.tag}
                </span>
              </div>

              {/* Minimalist Divider */}
              <span className="text-zinc-700 font-mono text-xs select-none">/</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InfiniteTicker;
