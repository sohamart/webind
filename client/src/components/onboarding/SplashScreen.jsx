import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const SplashScreen = ({ isExiting = false }) => {
  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="webind-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black select-none pointer-events-auto"
        >
          {/* Subtle Ambient Radial Backlight */}
          <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />

          {/* Symbol Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.86, filter: 'blur(8px)' }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
              transition: {
                duration: 1.1,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
            className="relative flex flex-col items-center"
          >
            <div className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center">
              <img
                src="/assets/webind-symbol.png"
                alt="WEBIND Symbol"
                className="w-full h-full object-contain filter drop-shadow-[0_0_24px_rgba(255,255,255,0.12)]"
              />

              {/* Shimmer Light Sweep Overlay */}
              <motion.div
                initial={{ x: '-100%', opacity: 0 }}
                animate={{
                  x: '150%',
                  opacity: [0, 0.4, 0],
                  transition: {
                    delay: 0.5,
                    duration: 1.2,
                    ease: 'easeInOut',
                  },
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
              />
            </div>

            {/* Typography Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.6,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                },
              }}
              className="mt-6 flex flex-col items-center"
            >
              <span className="text-xs md:text-sm font-semibold tracking-widest text-zinc-400 uppercase">
                WEBIND GROUP
              </span>
              <span className="text-[10px] tracking-widest text-zinc-600 mt-1 uppercase font-mono">
                Digital Ecosystem OS
              </span>
            </motion.div>
          </motion.div>

          {/* Subtle Bottom Status Mark */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6, transition: { delay: 0.9, duration: 0.6 } }}
            className="absolute bottom-10 flex items-center space-x-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
            <span className="text-[11px] font-mono tracking-wider text-zinc-500 uppercase">
              Initializing Core
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
