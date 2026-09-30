import React from 'react';

/**
 * Apple Pro Minimalist Dark Background
 * - Pure deep Space Black (#000000)
 * - Ultra-subtle, elegant monochromatic platinum ambient diffuse light
 * - Zero cursor glow, zero garish colors
 * - Pure luxury Apple stealth aesthetic
 */
export const LiquidBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black" aria-hidden="true">
      {/* 1. Subtle Apple Hero Ambient Light (Soft diffuse platinum glow at top-center) */}
      <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[550px] md:w-[1100px] md:h-[700px] rounded-full bg-gradient-to-b from-white/[0.045] via-white/[0.015] to-transparent blur-[140px] pointer-events-none" />

      {/* 2. Soft Mid-page Diffuse Ambient Depth */}
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-white/[0.015] blur-[160px] pointer-events-none" />

      {/* 3. Subtle Frosted Glass Surface Sheen Texture */}
      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default LiquidBackground;
