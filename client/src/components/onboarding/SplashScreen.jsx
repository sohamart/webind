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
          {/* Soft Apple Ambient Radial Backlight */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.9, 1.15, 1], opacity: [0.2, 0.45, 0.3] }}
            transition={{ duration: 2.2, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
            className="absolute w-80 h-80 md:w-96 md:h-96 rounded-full bg-white/[0.04] blur-3xl pointer-events-none"
          />

          {/* Symbol Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, filter: 'blur(8px)' }}
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
            {/* Logo Container with seamless transparency & liquid reflection */}
            <div className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center overflow-hidden rounded-full">
              <img
                src="/assets/webind-symbol.png"
                alt="WEBIND Symbol"
                className="w-full h-full object-contain mix-blend-screen filter drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]"
              />

              {/* Seamless Liquid Specular Light Sweep */}
              <motion.div
                initial={{ x: '-120%', opacity: 0 }}
                animate={{
                  x: '140%',
                  opacity: [0, 0.7, 0],
                  transition: {
                    delay: 0.4,
                    duration: 1.3,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
              />
            </div>

            {/* Typography Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.5,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                },
              }}
              className="mt-6 flex flex-col items-center"
            >
              <span className="text-xs md:text-sm font-bold tracking-widest text-white uppercase">
                WEBIND GROUP
              </span>
              <span className="text-[10px] tracking-widest text-zinc-500 mt-1 uppercase font-mono">
                Digital Ecosystem OS
              </span>
            </motion.div>
          </motion.div>

          {/* Subtle Bottom Status Mark */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6, transition: { delay: 0.8, duration: 0.6 } }}
            className="absolute bottom-10 flex items-center space-x-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse" />
            <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">
              Initializing Core
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
