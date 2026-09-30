import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowRight, Layers, Compass, Sparkles, Orbit } from 'lucide-react';
import { WebindSymbol } from '../common/WebindLogo';

const screens = [
  {
    id: 1,
    badge: 'PARENT TECHNOLOGY COMPANY',
    title: 'We bind ideas.',
    subtitle: 'WEBIND GROUP is a digital conglomerate architecting sovereign brands, scalable platforms, and next-generation venture ecosystems.',
    icon: WebindSymbol,
    isCustomLogo: true,
    visualShape: (
      <div className="relative w-40 h-40 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-white/10 animate-spin" style={{ animationDuration: '24s' }} />
        <div className="w-24 h-24 rounded-3xl liquid-glass flex items-center justify-center p-3 shadow-2xl">
          <WebindSymbol className="w-16 h-16" />
        </div>
      </div>
    ),
  },
  {
    id: 2,
    badge: 'UNIFIED ECOSYSTEM',
    title: 'Many brands. One vision.',
    subtitle: 'Independent flagship brands—from high-velocity web platforms like Weblets to developer hubs like Stack Adda—engineered under one cohesive standard.',
    icon: Layers,
    isCustomLogo: false,
    visualShape: (
      <div className="relative w-44 h-44 flex items-center justify-center">
        <div className="absolute w-36 h-24 rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-xl transform -rotate-6 flex items-center justify-center px-4">
          <span className="text-xs font-mono tracking-widest text-zinc-300">WEBLETS</span>
        </div>
        <div className="absolute w-36 h-24 rounded-2xl border border-white/20 bg-white/[0.08] backdrop-blur-xl transform rotate-6 shadow-2xl flex items-center justify-center px-4">
          <span className="text-xs font-mono tracking-widest text-white font-bold">STACK ADDA</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-extrabold text-xs shadow-xl z-10">
          W
        </div>
      </div>
    ),
  },
  {
    id: 3,
    badge: 'FRONTIER HORIZONS',
    title: 'Built for what’s next.',
    subtitle: 'Incubating autonomous AI agents, enterprise SaaS, machine learning protocols, and cloud computing infrastructure for the decades ahead.',
    icon: Sparkles,
    isCustomLogo: false,
    visualShape: (
      <div className="relative w-40 h-40 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-white/[0.03] blur-xl animate-pulse" />
        <div className="w-28 h-28 rounded-full liquid-glass flex flex-col items-center justify-center space-y-1 shadow-2xl">
          <span className="text-[10px] font-mono tracking-widest text-zinc-300">AI • ML • SAAS</span>
          <span className="text-xs font-black text-white tracking-wider">FUTURE LABS</span>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    badge: 'IMMERSIVE ARCHITECTURE',
    title: 'Explore the ecosystem.',
    subtitle: 'A digital operating environment with native app fluidity, dynamic brand discovery, and real-time administrative governance.',
    icon: Orbit,
    isCustomLogo: false,
    visualShape: (
      <div className="relative w-40 h-40 flex items-center justify-center">
        <div className="absolute inset-0 rounded-3xl border border-dashed border-white/20 animate-spin" style={{ animationDuration: '40s' }} />
        <div className="w-24 h-24 rounded-3xl bg-white text-black flex flex-col items-center justify-center p-3 shadow-[0_0_35px_rgba(255,255,255,0.35)]">
          <WebindSymbol className="w-12 h-12 invert" />
        </div>
      </div>
    ),
  },
];

export const OnboardingFlow = ({ onComplete }) => {
  const [currentScreen, setCurrentScreen] = useState(0);

  // Keyboard arrow listener
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentScreen]);

  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentScreen > 0) {
      setCurrentScreen((prev) => prev - 1);
    }
  };

  const current = screens[currentScreen];
  const isFinal = currentScreen === screens.length - 1;

  return (
    <div className="fixed inset-0 z-40 flex flex-col justify-between bg-black text-white px-6 py-8 md:p-12 select-none overflow-hidden">
      {/* Subtle Apple Ambient Light */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-white/[0.025] blur-[140px] pointer-events-none" />

      {/* Top Header Controls */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center space-x-2.5">
          <WebindSymbol className="w-7 h-7" />
          <div className="flex flex-col">
            <span className="text-xs font-black tracking-widest text-zinc-200 uppercase leading-none">
              WEBIND
            </span>
            <span className="text-[8px] font-mono tracking-widest text-zinc-500 uppercase mt-0.5 leading-none">
              GROUP
            </span>
          </div>
        </div>

        {!isFinal ? (
          <button
            onClick={onComplete}
            className="text-xs uppercase tracking-widest text-zinc-400 hover:text-white px-4 py-1.5 rounded-full liquid-glass-pill transition tap-bounce"
          >
            Skip
          </button>
        ) : (
          <div className="w-12" />
        )}
      </div>

      {/* Main Slide Content with Gesture Drag & Animations */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full my-6 text-center z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 30, filter: 'blur(4px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -30, filter: 'blur(4px)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = offset.x;
              if (swipe < -60) handleNext();
              else if (swipe > 60) handlePrev();
            }}
            className="w-full flex flex-col items-center cursor-grab active:cursor-grabbing"
          >
            {/* Visual Minimal Illustration / Shape */}
            <div className="mb-10">{current.visualShape}</div>

            {/* Badge */}
            <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-zinc-300 uppercase liquid-glass-pill px-4 py-1.5 rounded-full mb-4">
              {current.badge}
            </span>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4 uppercase">
              {current.title}
            </h1>

            {/* Subtitle */}
            <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-normal max-w-sm sm:max-w-md">
              {current.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Controls & Progress Dots */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 max-w-lg mx-auto w-full z-10 pb-safe">
        {/* Progress Dots */}
        <div className="flex items-center space-x-2">
          {screens.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentScreen(idx)}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                idx === currentScreen ? 'w-8 bg-white shadow-sm' : 'w-2 bg-zinc-700 hover:bg-zinc-500'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          {currentScreen > 0 && !isFinal && (
            <button
              onClick={handlePrev}
              className="flex-1 sm:flex-none px-5 py-3 rounded-full text-xs font-bold tracking-wider uppercase text-zinc-300 liquid-glass-pill hover:text-white transition tap-bounce"
            >
              Back
            </button>
          )}

          <button
            onClick={handleNext}
            className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 px-8 py-3.5 rounded-full font-extrabold text-xs tracking-widest uppercase transition-all duration-200 tap-bounce shadow-xl ${
              isFinal
                ? 'bg-white text-black hover:bg-zinc-200 ring-2 ring-white/50 shadow-[0_0_25px_rgba(255,255,255,0.3)]'
                : 'bg-white text-black hover:bg-zinc-200'
            }`}
          >
            <span>{isFinal ? 'ENTER WEBIND' : 'CONTINUE'}</span>
            {isFinal ? <ArrowRight className="w-4 h-4 ml-1" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
