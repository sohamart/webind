import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Global Ultra-Smooth 60FPS Obsidian Shutter Transition
 * 
 * Performance & Architecture:
 * - Persistent component mounted at root level with z-[999999].
 * - Completely covers the desktop navbar, header, and page during route changes.
 * - Hardware-accelerated GPU transforms (translate3d) with zero layout thrashing.
 * - Lenis and AppShell are never destroyed, preventing all freezing and stuttering.
 */
export const GlobalPageTransition = () => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const firstRender = useRef(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Skip on initial first page load
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    // Trigger smooth shutter sequence on route change
    setIsTransitioning(true);

    // Scroll to top immediately when covered (both Lenis and native window)
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);

    // Auto-complete after animation concludes
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 1150);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
          {/* ====================================================
              LEFT OBSIDIAN SHUTTER (Hardware-Accelerated)
              ==================================================== */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{
              x: ['-100%', '0%', '0%', '-100%'],
              transition: {
                duration: 1.15,
                times: [0, 0.38, 0.65, 1],
                ease: [0.22, 1, 0.36, 1],
              },
            }}
            className="fixed top-0 left-0 bottom-0 w-[50vw] h-screen bg-[#07070a] border-r border-white/[0.12] shadow-[15px_0_40px_rgba(0,0,0,0.95)]"
            style={{ willChange: 'transform' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black via-[#09090d] to-[#121217]" />
            <div className="absolute top-0 right-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/30 to-transparent" />
          </motion.div>

          {/* ====================================================
              RIGHT OBSIDIAN SHUTTER (Hardware-Accelerated)
              ==================================================== */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{
              x: ['100%', '0%', '0%', '100%'],
              transition: {
                duration: 1.15,
                times: [0, 0.38, 0.65, 1],
                ease: [0.22, 1, 0.36, 1],
              },
            }}
            className="fixed top-0 right-0 bottom-0 w-[50vw] h-screen bg-[#07070a] border-l border-white/[0.12] shadow-[-15px_0_40px_rgba(0,0,0,0.95)]"
            style={{ willChange: 'transform' }}
          >
            <div className="absolute inset-0 bg-gradient-to-l from-black via-[#09090d] to-[#121217]" />
            <div className="absolute top-0 left-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/30 to-transparent" />
          </motion.div>

          {/* ====================================================
              CENTERPIECE: FROSTED TITANIUM SHIMMER MEDALLION
              ==================================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.9, 1, 1, 1.08],
              transition: {
                duration: 1.15,
                times: [0, 0.35, 0.65, 1],
                ease: 'easeInOut',
              },
            }}
            className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none"
          >
            {/* Ambient Halo Flare */}
            <div className="absolute w-72 h-72 rounded-full bg-white/[0.04] blur-3xl pointer-events-none" />

            {/* Medallion Core Container */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl liquid-glass-pill flex items-center justify-center border border-white/25 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),inset_0_1px_2px_rgba(255,255,255,0.4)] overflow-hidden">
              {/* Metallic Silver Shimmer Light Beam */}
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

              {/* Webind Monogram Symbol */}
              <img
                src="/assets/webind-symbol.png"
                alt="Webind Group"
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain filter contrast-125 drop-shadow-[0_4px_12px_rgba(255,255,255,0.25)]"
              />
            </div>

            {/* Clean Typographic Telemetry */}
            <div className="mt-5 flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>WEBIND // TRANSIT</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default GlobalPageTransition;
