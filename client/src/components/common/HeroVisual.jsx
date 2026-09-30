import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WebindSymbol } from './WebindLogo';
import { ShieldCheck, Cpu, Terminal, Sparkles } from 'lucide-react';

export const HeroVisual = () => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setRotate({ x: y * -18, y: x * 18 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-lg aspect-square flex items-center justify-center my-6 select-none perspective-1000"
    >
      <motion.div
        animate={{ rotateX: rotate.x, rotateY: rotate.y }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Outer Orbital Ring 1 */}
        <div
          className="absolute inset-4 rounded-full border border-dashed border-white/[0.12] animate-spin"
          style={{ animationDuration: '60s' }}
        />

        {/* Orbital Ring 2 with glowing pulse points */}
        <div
          className="absolute inset-16 rounded-full border border-white/[0.08] animate-spin"
          style={{ animationDuration: '40s', animationDirection: 'reverse' }}
        >
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_12px_#fff]" />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-zinc-400" />
        </div>

        {/* Orbital Ring 3 (Inner Mesh) */}
        <div className="absolute inset-28 rounded-full border border-white/[0.15] bg-radial from-white/[0.03] to-transparent shadow-[0_0_80px_rgba(255,255,255,0.04)]" />

        {/* Central Core Emblem Box with Glass Sheen */}
        <div className="relative z-10 w-36 h-36 md:w-44 md:h-44 rounded-3xl bg-zinc-950/90 border border-white/20 backdrop-blur-2xl shadow-[0_0_50px_rgba(255,255,255,0.08)] flex flex-col items-center justify-center p-4 group">
          {/* Subtle Ambient Glow behind emblem */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/10 via-transparent to-white/5 opacity-50 group-hover:opacity-100 transition-opacity" />

          {/* Official WEBIND Symbol */}
          <div className="relative z-10 w-24 h-24 md:w-28 md:h-28 flex items-center justify-center">
            <img
              src="/assets/webind-symbol.png"
              alt="WEBIND Core"
              className="w-full h-full object-contain filter drop-shadow-[0_0_18px_rgba(255,255,255,0.25)] group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Telemetry Core Label */}
          <div className="relative z-10 mt-1 flex items-center space-x-1 text-[9px] font-mono tracking-widest text-zinc-400 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>ECOSYSTEM_CORE // ACTIVE</span>
          </div>
        </div>

        {/* Floating Telemetry HUD Badges */}
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-2 -left-2 sm:left-4 p-2.5 rounded-xl bg-zinc-900/80 border border-white/10 backdrop-blur-xl shadow-xl flex items-center space-x-2 text-[10px] font-mono text-zinc-300"
        >
          <Cpu className="w-3.5 h-3.5 text-zinc-400" />
          <span>LATENCY // 0.2ms</span>
        </motion.div>

        <motion.div
          animate={{ y: [4, -4, 4] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-2 -right-2 sm:right-4 p-2.5 rounded-xl bg-zinc-900/80 border border-white/10 backdrop-blur-xl shadow-xl flex items-center space-x-2 text-[10px] font-mono text-zinc-300"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>SOVEREIGN ARCHITECTURE</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroVisual;
