import React from 'react';
import { Sparkles, Terminal, Layers, Cpu, Cloud, Globe } from 'lucide-react';

const defaultItems = [
  { text: 'WEBLETS // COMPONENT SYSTEMS', icon: Layers },
  { text: 'STACK ADDA // DEV MATRIX', icon: Terminal },
  { text: 'NEURAL NEXUS // AUTONOMOUS SWARMS', icon: Cpu },
  { text: 'CLOUD FORGE // EDGE MESH', icon: Cloud },
  { text: 'SOVEREIGN DIGITAL VENTURES', icon: Globe },
  { text: 'WE BIND IDEAS', icon: Sparkles },
];

export const InfiniteTicker = ({ items = defaultItems, speed = 35 }) => {
  return (
    <div className="w-full overflow-hidden border-y border-white/[0.08] bg-zinc-950/60 backdrop-blur-md py-3 select-none">
      <div className="flex w-max animate-ticker">
        {/* Render twice for seamless continuous loop */}
        {[...items, ...items, ...items].map((item, idx) => {
          const Icon = item.icon || Sparkles;
          return (
            <div
              key={idx}
              className="flex items-center space-x-3 px-6 shrink-0 group cursor-default"
            >
              <Icon className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
              <span className="font-mono text-xs font-bold tracking-widest uppercase text-zinc-400 group-hover:text-white transition-colors">
                {item.text}
              </span>
              <span className="text-zinc-700 font-mono text-xs">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InfiniteTicker;
