import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Layers,
  Globe,
  Cpu,
  Rocket,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Terminal,
  Activity,
  Code2,
  ExternalLink,
  Zap,
  ArrowUpRight,
  Circle,
  Square,
  Triangle,
  Compass,
} from 'lucide-react';
import { WebindSymbol } from '../../components/common/WebindLogo';
import BrandCard from '../../components/brand/BrandCard';
import LiquidGlassCard from '../../components/common/LiquidGlassCard';
import InfiniteTicker from '../../components/common/InfiniteTicker';
import { useAppState } from '../../context/AppStateContext';

export const HomePage = () => {
  const { settings, brands, loadingData } = useAppState();
  const navigate = useNavigate();

  const featuredBrands = brands.filter((b) => b.isFeatured && b.status !== 'ARCHIVED');
  const latestBrands = [...brands]
    .filter((b) => b.status !== 'ARCHIVED')
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  return (
    <div className="w-full max-w-full flex flex-col items-center overflow-x-hidden">
      {/* ========================================================
          HERO SECTION: APPLE PRO STEALTH INDIAN SOVEREIGN STAGE
          Spaced generously with breathing room, marquee in frame!
          ======================================================== */}
      <section className="relative w-full pt-6 sm:pt-8 md:pt-12 pb-8 sm:pb-10 flex flex-col items-center text-center px-4 overflow-hidden select-none">
        {/* Top Ambient Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full bg-gradient-to-r from-white/[0.07] via-white/[0.02] to-transparent blur-[100px]" />
        </div>

        {/* ======================================================
            1. SINGLE UNIFIED INDIAN TECH CAPSULE BANNER
            Positioned gracefully on top with clean, airy spacing
            ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl px-2 mb-6 sm:mb-7 z-10"
        >
          <Link
            to={settings?.announcement?.link || '/brands'}
            className="flex items-center justify-between px-3.5 sm:px-5 py-2.5 rounded-full liquid-glass-pill text-zinc-300 hover:text-white text-xs transition group gap-2.5 border border-white/10 hover:border-white/25 w-full min-w-0 overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center space-x-2.5 min-w-0 flex-1 overflow-hidden">
              {/* Sleek Indian Tricolor Micro-Indicator */}
              <span className="flex items-center space-x-1 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933] animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#138808]" />
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-zinc-300 font-bold px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/10 shrink-0">
                BHARAT TECH STACK
              </span>
              <span className="text-zinc-200 font-medium truncate text-[11px] sm:text-xs min-w-0 flex-1">
                Sovereign Indian Digital Ventures &bull; Bengaluru &bull; Kolkata &bull; NCR
              </span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white group-hover:translate-x-1 transition-transform shrink-0" />
          </Link>
        </motion.div>

        {/* ======================================================
            2. PREMIUM ROTATING INDIAN SOVEREIGN CHAKRA ORBIT LOGO
            Positioned right below banner (Majestic 100% Circle)
            ====================================================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative mb-6 sm:mb-8 flex items-center justify-center pointer-events-none z-10 w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] shrink-0"
        >
          {/* Subtle Saffron & Emerald Ambient Circular Aura */}
          <div className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-tr from-[#138808]/20 via-white/10 to-[#FF9933]/25 blur-xl pointer-events-none" />

          {/* Outer Rotating Dashed Orbital Ring (100% Circle) */}
          <div
            className="absolute w-[112px] h-[112px] sm:w-[130px] sm:h-[130px] rounded-full border border-dashed border-white/20 animate-spin"
            style={{ animationDuration: '24s' }}
          />

          {/* 24-Spoke Radial Ashoka Chakra Dial (100% Circle) */}
          <svg
            className="absolute w-[96px] h-[96px] sm:w-[112px] sm:h-[112px] animate-spin pointer-events-none opacity-40"
            style={{ animationDuration: '36s', animationDirection: 'reverse' }}
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/30" />
            <circle cx="50" cy="50" r="14" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/40" />
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i * 360) / 24;
              return (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2={50 + 46 * Math.cos((angle * Math.PI) / 180)}
                  y2={50 + 46 * Math.sin((angle * Math.PI) / 180)}
                  stroke="currentColor"
                  strokeWidth="0.75"
                  className="text-white/30"
                />
              );
            })}
          </svg>

          {/* Center Circular Medallion (Strict 100% Circle, Zero Square Corners, Majestic & Crisp) */}
          <div className="relative z-10 w-[68px] h-[68px] sm:w-[82px] sm:h-[82px] rounded-full bg-[#0a0a0f] border border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.25)] flex items-center justify-center p-3.5 sm:p-4 overflow-hidden shrink-0">
            {/* Animated Tricolor Circular Rim */}
            <div
              className="absolute inset-0 rounded-full border-[1.5px] border-t-[#FF9933] border-r-white/60 border-b-[#138808] border-l-white/60 animate-spin"
              style={{ animationDuration: '8s' }}
            />
            {/* Pure Icon Mix-blend Screen to remove any image canvas background */}
            <img
              src="/assets/webind-symbol.png"
              alt="WEBIND Symbol"
              className="w-full h-full object-contain filter contrast-150 mix-blend-screen drop-shadow-[0_0_10px_rgba(255,255,255,0.85)] select-none rounded-full"
            />
          </div>
        </motion.div>

        {/* ======================================================
            3. MASTER HEADLINE: WE BIND IDEAS.
            - "IDEAS." is wrapped in whitespace-nowrap with the period inline.
            - Period is strictly beside IDEAS, never wrapping below!
            ====================================================== */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] uppercase px-2 drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)] z-10 text-center max-w-5xl mb-4 sm:mb-6"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-400">
            WE BIND{' '}
          </span>
          <span className="inline-block whitespace-nowrap">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-400">
              IDEAS
            </span>
            <span className="text-white ml-0.5 inline-block select-none">
              .
            </span>
          </span>
        </motion.h1>

        {/* ======================================================
            4. SUBTITLE (Clean, balanced spacing)
            ====================================================== */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-xs sm:text-sm md:text-base text-zinc-300 max-w-2xl font-normal leading-relaxed px-4 break-words z-10 mb-7 sm:mb-8"
        >
          {settings?.heroSubtitle || 'A sovereign Indian technology group building independent brands, developer ecosystems, and frontier ventures.'}
        </motion.p>

        {/* ======================================================
            5. ACTION TRIGGERS (High-contrast, elegant)
            ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto px-4 max-w-xs sm:max-w-none z-10"
        >
          <Link
            to="/brands"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-7 py-3 sm:px-8 sm:py-3.5 rounded-full bg-white text-black font-extrabold text-xs tracking-widest uppercase hover:bg-zinc-200 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.2)] tap-bounce"
          >
            <span>{settings?.heroCtaText || 'EXPLORE BRANDS'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/about"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-7 py-3 sm:px-8 sm:py-3.5 rounded-full liquid-glass text-zinc-200 hover:text-white font-bold text-xs tracking-widest uppercase hover:border-white/30 transition-all duration-300 tap-bounce border border-white/10"
          >
            <Activity className="w-3.5 h-3.5 text-zinc-400" />
            <span>THE SYSTEM MODEL</span>
          </Link>
        </motion.div>
      </section>

      {/* ========================================================
          CONTINUOUS INFINITE TICKER MARQUEE (WITH GRADIENT SMOKE)
          ======================================================== */}
      <InfiniteTicker />

      {/* ========================================================
          SECTION 1: GEOMETRIC TELEMETRY HUD
          Asymmetric Interlocking Bento with Animated Companion Nodes
          ======================================================== */}
      <section className="w-full max-w-6xl px-4 py-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 pb-4 border-b border-white/[0.08] gap-2">
          <div className="flex items-center space-x-2.5 text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
            <Compass className="w-4 h-4 text-zinc-400 animate-spin [animation-duration:25s]" />
            <span>SYSTEM VELOCITY // TELEMETRY NODES</span>
          </div>
          <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            REAL-TIME DATA FABRIC // BHARAT CORE
          </span>
        </div>

        {/* Dynamic Asymmetric Grid with Integrated Companion Wings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {/* NODE 1: THE ORBITAL DISC + SATELLITE TAG */}
          <div className="rounded-3xl liquid-glass p-6 flex flex-col justify-between relative overflow-hidden border border-white/15 hover:border-white/35 transition-all duration-300 group hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full border border-dashed border-white/30 flex items-center justify-center animate-spin [animation-duration:16s]">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
                <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">[01 // DISC]</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <div className="my-5">
              <span className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight block">
                4+
              </span>
              <div className="text-xs sm:text-sm font-bold text-white mt-1 uppercase tracking-wide">
                Active Brands
              </div>
              <p className="text-[11px] text-zinc-400 mt-2 leading-relaxed">
                Autonomous sovereign ventures in orbit
              </p>
            </div>

            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between font-mono text-[9px] text-zinc-500 uppercase">
              <span>SATELLITE NODE: ACTIVE</span>
              <span className="text-zinc-400 font-bold">100% OP</span>
            </div>
          </div>

          {/* NODE 2: THE CAPSULE POD + RUNWAY ACCENT */}
          <div className="rounded-[36px] liquid-glass p-6 flex flex-col justify-between relative overflow-hidden border border-white/15 hover:border-white/35 transition-all duration-300 group hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">[02 // CAPSULE]</span>
              <Rocket className="w-4 h-4 text-zinc-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </div>

            <div className="my-5">
              <span className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight block">
                8+
              </span>
              <div className="text-xs sm:text-sm font-bold text-white mt-1 uppercase tracking-wide">
                Ventures Built
              </div>
              <p className="text-[11px] text-zinc-400 mt-2 leading-relaxed">
                Incubating developer platforms & AI tools
              </p>
            </div>

            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between font-mono text-[9px] text-zinc-400">
              <span className="uppercase">EXPANSION PIPELINE</span>
              <div className="flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse [animation-delay:0.4s]" />
              </div>
            </div>
          </div>

          {/* NODE 3: THE PRECISION MATRIX + COMPUTE DOCK */}
          <div className="rounded-3xl liquid-glass p-6 flex flex-col justify-between relative overflow-hidden border border-white/15 hover:border-white/35 transition-all duration-300 group hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">[03 // MATRIX]</span>
              <Cpu className="w-4 h-4 text-zinc-400" />
            </div>

            <div className="my-5">
              <span className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight block">
                25+
              </span>
              <div className="text-xs sm:text-sm font-bold text-white mt-1 uppercase tracking-wide">
                Live Software
              </div>
              <p className="text-[11px] text-zinc-400 mt-2 leading-relaxed">
                High-availability production deployments
              </p>
            </div>

            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between font-mono text-[9px] text-zinc-400">
              <span className="text-zinc-500 uppercase">LATENCY:</span>
              <span className="text-emerald-400 font-bold">&lt; 14MS // GLOBAL</span>
            </div>
          </div>

          {/* NODE 4: THE APEX SHIELD + DISTRIBUTED BEACON */}
          <div className="rounded-3xl liquid-glass p-6 flex flex-col justify-between relative overflow-hidden border border-white/15 hover:border-white/35 transition-all duration-300 group hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">[04 // SHIELD]</span>
              <Globe className="w-4 h-4 text-zinc-400" />
            </div>

            <div className="my-5">
              <span className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight block">
                18+
              </span>
              <div className="text-xs sm:text-sm font-bold text-white mt-1 uppercase tracking-wide">
                Global Footprint
              </div>
              <p className="text-[11px] text-zinc-400 mt-2 leading-relaxed">
                Impact across 4 continents and 18 nations
              </p>
            </div>

            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between font-mono text-[9px] text-zinc-400">
              <span className="text-zinc-500 uppercase">TOPOLOGY:</span>
              <span className="text-white font-semibold uppercase">MULTI-REGION</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 2: FEATURED BRANDS IN ASYMMETRIC MORPHIC GEOMETRY
          Card 1: Elongated Grand Oval Capsule
          Card 2: Faceted Cyber-Chamfered Diamond Card
          ======================================================== */}
      <section className="w-full max-w-6xl px-4 py-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 pb-4 border-b border-white/[0.08] gap-4">
          <div>
            <div className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
              <span>CORE SYNDICATE SHOWCASE // ASYMMETRIC BENTO</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase mt-1">
              Featured Brands
            </h2>
          </div>

          <Link
            to="/brands"
            className="flex items-center space-x-2 px-5 py-2.5 rounded-full liquid-glass-pill text-xs font-bold tracking-wider text-zinc-300 hover:text-white uppercase group transition border border-white/10 hover:border-white/25"
          >
            <span>View All Brands</span>
            <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loadingData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-72 rounded-[48px] liquid-glass animate-pulse" />
            <div className="h-72 rounded-3xl liquid-glass animate-pulse" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* BRAND 1: ELONGATED OVAL CAPSULE BENTO CARD (Takes 7 cols) */}
            {featuredBrands[0] && (
              <div
                onClick={() => navigate(`/brands/${featuredBrands[0].slug}`)}
                className="lg:col-span-7 rounded-[48px] sm:rounded-[56px] liquid-glass p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden border border-white/15 hover:border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.85)] transition-all duration-500 cursor-pointer group"
              >
                <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />

                {/* Top Bar with Oval Geometric Identity */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-zinc-300 font-mono text-[10px] tracking-widest uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>FLAGSHIP // {featuredBrands[0].category}</span>
                  </div>

                  <div className="w-10 h-10 rounded-full liquid-glass-pill flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:scale-110 transition border border-white/10">
                    <ArrowUpRight className="w-5 h-5 text-zinc-300" />
                  </div>
                </div>

                {/* Brand Showcase Body */}
                <div className="my-8 relative z-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full liquid-glass-pill p-3.5 mb-6 flex items-center justify-center border border-white/20 group-hover:border-white/40 shadow-xl transition-all">
                    {featuredBrands[0].logo ? (
                      <img
                        src={featuredBrands[0].logo}
                        alt={featuredBrands[0].name}
                        className="w-full h-full object-contain filter contrast-125 group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <WebindSymbol className="w-8 h-8" />
                    )}
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase group-hover:text-zinc-200 transition-colors">
                    {featuredBrands[0].name}
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-300 mt-3 max-w-lg leading-relaxed font-normal">
                    {featuredBrands[0].tagline || featuredBrands[0].shortDescription}
                  </p>
                </div>

                {/* Bottom Footer Info */}
                <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-zinc-400 relative z-10">
                  <span className="uppercase tracking-widest text-[11px] text-zinc-500">
                    OVAL ARCHETYPE // SOVEREIGN ENTITY
                  </span>
                  <span className="flex items-center gap-1.5 text-white font-semibold group-hover:translate-x-1 transition-transform">
                    EXPLORE VENTURE <ArrowRight className="w-3.5 h-3.5 text-zinc-300" />
                  </span>
                </div>
              </div>
            )}

            {/* BRAND 2: ARCHITECTURAL MATRIX BENTO CARD (Takes 5 cols) */}
            {featuredBrands[1] && (
              <div
                onClick={() => navigate(`/brands/${featuredBrands[1].slug}`)}
                className="lg:col-span-5 rounded-[40px] liquid-glass p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden border border-white/15 hover:border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.85)] transition-all duration-500 cursor-pointer group"
              >
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />

                {/* Top Corner Crosshair & Badge */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-zinc-300 font-mono text-[10px] tracking-widest uppercase">
                    <Square className="w-2.5 h-2.5 fill-white/20" />
                    <span>CYBER MATRIX // {featuredBrands[1].category}</span>
                  </div>

                  <div className="w-10 h-10 rounded-2xl liquid-glass flex items-center justify-center text-zinc-400 group-hover:text-white transition border border-white/10">
                    <ArrowUpRight className="w-5 h-5 text-zinc-300" />
                  </div>
                </div>

                {/* Brand Showcase Body */}
                <div className="my-8 relative z-10">
                  <div className="w-16 h-16 rounded-2xl liquid-glass p-3 mb-6 flex items-center justify-center border border-white/20 group-hover:scale-105 transition-transform">
                    {featuredBrands[1].logo ? (
                      <img
                        src={featuredBrands[1].logo}
                        alt={featuredBrands[1].name}
                        className="w-full h-full object-contain filter contrast-125"
                      />
                    ) : (
                      <WebindSymbol className="w-8 h-8" />
                    )}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase group-hover:text-zinc-200 transition-colors">
                    {featuredBrands[1].name}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 mt-2.5 line-clamp-3 leading-relaxed font-normal">
                    {featuredBrands[1].tagline || featuredBrands[1].shortDescription}
                  </p>
                </div>

                {/* Bottom Tech Bar */}
                <div className="pt-5 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-zinc-400 relative z-10">
                  <span className="text-[10px] uppercase text-zinc-500">
                    SCULPTED COMPUTE NODE
                  </span>
                  <span className="flex items-center gap-1.5 text-white font-semibold group-hover:translate-x-1 transition-transform">
                    ACCESS PORTAL <ArrowRight className="w-3.5 h-3.5 text-zinc-300" />
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ========================================================
          SECTION 3: THE WEBIND MODEL — "SCULPTED CONSTELLATION"
          Asymmetric Layout with Integrated Side & Bottom Companion Designs
          ======================================================== */}
      <section className="w-full max-w-6xl px-4 py-20 relative">
        {/* Subtle Ambient Connecting Circuit Track behind the 3 Cards */}
        <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none -translate-y-12">
          {/* Flowing Signal Pulse along the track */}
          <div className="w-32 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-signal-flow" />
        </div>

        <div className="text-center sm:text-left mb-16 pb-4 border-b border-white/[0.08] relative z-10">
          <div className="flex items-center justify-center sm:justify-start space-x-2 text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>OPERATING SYSTEM // ARCHITECTURAL PILLARS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mt-2 uppercase">
            The Webind Model
          </h2>
          <p className="text-xs sm:text-base text-zinc-300 mt-2.5 max-w-2xl leading-relaxed">
            A tripartite architecture engineered with asymmetric geometric silhouettes, where each pillar is augmented with dedicated telemetry companion modules.
          </p>
        </div>

        {/* ======================================================
            THE 3 ARCHITECTURALLY SCULPTED PILLARS
            Asymmetric vertical staggering, companion side/bottom docks
            ====================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start relative z-10">
          {/* ----------------------------------------------------
              PILLAR 01: SOVEREIGNTY (Sculpted Asymmetric Wing)
              Offset: slightly staggered, with docked bottom telemetry module
              ---------------------------------------------------- */}
          <div className="flex flex-col group">
            {/* Main Card with Asymmetric Corner Sculpt */}
            <div className="card-sculpt-delta liquid-glass p-8 flex flex-col justify-between border border-white/15 hover:border-white/35 shadow-[0_20px_40px_rgba(0,0,0,0.85)] transition-all duration-500 relative">
              {/* Corner Specular Flare */}
              <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-white/[0.04] blur-2xl pointer-events-none" />

              <div>
                {/* Header: Geometric Delta Badge with Companion Status Tag beside it */}
                <div className="flex items-center justify-between mb-7">
                  <div className="w-14 h-14 rounded-2xl liquid-glass-pill border border-white/20 flex items-center justify-center text-white shadow-xl group-hover:scale-105 transition-transform">
                    <Triangle className="w-6 h-6 fill-white/20" />
                  </div>
                  {/* Pase: Companion Readout */}
                  <div className="text-right">
                    <span className="font-mono text-[9px] text-zinc-500 uppercase block">AUTONOMY INDEX</span>
                    <span className="font-mono text-xs font-bold text-white tracking-widest">100% UNBOUND</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-1.5">
                  <span>01 // VECTOR ARCHITECTURE</span>
                </div>
                <h3 className="font-black text-2xl text-white tracking-tight">Independent Brands</h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mt-3 font-normal">
                  Every venture within our syndicate operates with absolute autonomy, unique brand equity, dedicated roadmaps, and zero cross-brand dependencies.
                </p>
              </div>

              {/* Internal Signal Line */}
              <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-zinc-400 uppercase">
                <span>GOVERNANCE: AUTONOMOUS</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>

            {/* Niche: Docked Auxiliary Companion Drawer below Card 01 */}
            <div className="mt-3.5 px-6 py-3 rounded-2xl liquid-glass-pill border border-white/10 flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span>FAULT ISOLATION // ZERO CROSS-RISK</span>
              </div>
              <span className="text-zinc-500 font-bold">[VERIFIED]</span>
            </div>
          </div>

          {/* ----------------------------------------------------
              PILLAR 02: UNIFIED CORE (The Elevated Hero Reactor)
              Offset: Elevated prominently (lg:-translate-y-6) with center orbital gyroscope
              ---------------------------------------------------- */}
          <div className="flex flex-col lg:-translate-y-6 group">
            {/* Main Card with Deep Curvature & Center Reactor */}
            <div className="card-sculpt-reactor liquid-glass p-8 sm:p-10 flex flex-col justify-between border border-white/25 hover:border-white/45 shadow-[0_30px_60px_rgba(0,0,0,0.95)] transition-all duration-500 relative bg-white/[0.03]">
              {/* Radial Center Energy Aura */}
              <div className="absolute inset-0 rounded-[48px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none" />

              <div>
                {/* Header: Dual Concentric Rotating Gyroscope Dial */}
                <div className="flex items-center justify-between mb-7">
                  <div className="relative w-16 h-16 rounded-full liquid-glass-pill border border-white/30 flex items-center justify-center text-white shadow-2xl">
                    {/* Counter-rotating Outer Ring */}
                    <div className="absolute inset-1.5 rounded-full border border-dashed border-white/30 animate-spin [animation-duration:20s]" />
                    <Circle className="w-6 h-6 fill-white/20 relative z-10" />
                  </div>
                  {/* Pase: Frequency & Core Status */}
                  <div className="text-right">
                    <span className="font-mono text-[9px] text-zinc-400 uppercase block">CORE PULSE</span>
                    <span className="font-mono text-xs font-bold text-emerald-400 tracking-widest flex items-center justify-end gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      60HZ SYNC
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-zinc-300 uppercase mb-1.5">
                  <span>02 // GRAVITATIONAL ENGINE</span>
                </div>
                <h3 className="font-black text-2xl sm:text-3xl text-white tracking-tight">Unified Core Platform</h3>
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed mt-3 font-normal">
                  Shared ultra-fast edge routing, design token compilers, resilient embedded data engines, and global zero-trust security policies deployed across all brands.
                </p>
              </div>

              {/* Internal Signal Bus */}
              <div className="mt-8 pt-4 border-t border-white/[0.1] flex items-center justify-between text-[10px] font-mono text-zinc-300 uppercase">
                <span>SYNCHRONIZED FABRIC</span>
                <span className="text-white font-bold">&lt; 12MS EDGE LATENCY</span>
              </div>
            </div>

            {/* Niche: Docked Auxiliary Companion Module below Card 02 */}
            <div className="mt-3.5 px-6 py-3.5 rounded-full liquid-glass-pill border border-white/15 flex items-center justify-between text-[10px] font-mono text-zinc-300 bg-white/[0.05]">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-bold text-white">EMBEDDED DATA ENGINE // SHARED CDN</span>
              </div>
              <span className="text-emerald-400 font-bold">ACTIVE</span>
            </div>
          </div>

          {/* ----------------------------------------------------
              PILLAR 03: FRONTIER LABS (Sculpted Matrix Cube)
              Offset: Lowered staggered elevation, with docked compute wave module
              ---------------------------------------------------- */}
          <div className="flex flex-col group lg:translate-y-4">
            {/* Main Card with Inverted Asymmetric Sculpt */}
            <div className="card-sculpt-matrix liquid-glass p-8 flex flex-col justify-between border border-white/15 hover:border-white/35 shadow-[0_20px_40px_rgba(0,0,0,0.85)] transition-all duration-500 relative">
              {/* Corner Ambient Flare */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/[0.04] blur-2xl pointer-events-none" />

              <div>
                {/* Header: Matrix Square with Companion Frequency Tag */}
                <div className="flex items-center justify-between mb-7">
                  <div className="w-14 h-14 rounded-2xl liquid-glass-pill border border-white/20 flex items-center justify-center text-white shadow-xl group-hover:scale-105 transition-transform">
                    <Square className="w-6 h-6 fill-white/20" />
                  </div>
                  {/* Pase: Neural Pipeline Status */}
                  <div className="text-right">
                    <span className="font-mono text-[9px] text-zinc-500 uppercase block">R&amp;D STATUS</span>
                    <span className="font-mono text-xs font-bold text-white tracking-widest">NEXT-DECADE</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-1.5">
                  <span>03 // MATRIX COMPUTE</span>
                </div>
                <h3 className="font-black text-2xl text-white tracking-tight">Frontier Labs</h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mt-3 font-normal">
                  Incubating autonomous cognitive models, distributed compute mesh, and high-performance WebGL interfaces engineered for the next decade.
                </p>
              </div>

              {/* Internal Signal Line */}
              <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-zinc-400 uppercase">
                <span>R&amp;D PIPELINE ACTIVE</span>
                <Activity className="w-3.5 h-3.5 text-zinc-400" />
              </div>
            </div>

            {/* Niche: Docked Auxiliary Satellite Compute Shard below Card 03 */}
            <div className="mt-3.5 px-6 py-3 rounded-2xl liquid-glass-pill border border-white/10 flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span>AUTONOMOUS SWARMS &amp; WEBGL OS</span>
              </div>
              <span className="text-zinc-500 font-bold">[EXP-04]</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 4: ECOSYSTEM DIRECTORY IN GEOMETRIC NODES
          Alternating Geometric Silhouettes for each Brand Card
          ======================================================== */}
      {latestBrands.length > 0 && (
        <section className="w-full max-w-6xl px-4 py-14">
          <div className="flex items-center justify-between mb-10 pb-4 border-b border-white/[0.08]">
            <div>
              <div className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>PORTFOLIO TELEMETRY // GEOMETRIC NODES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase mt-1">
                Ecosystem Directory
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {latestBrands.map((brand, idx) => {
              const shapeClasses = [
                'rounded-[36px]',
                'rounded-3xl',
                'card-sculpt-delta',
                'card-sculpt-matrix',
              ];
              const shapeName = ['CAPSULE', 'SQUIRCLE', 'DELTA-WING', 'MATRIX-CUBE'][idx % 4];

              return (
                <div
                  key={brand._id || brand.slug}
                  onClick={() => navigate(`/brands/${brand.slug}`)}
                  className={`${shapeClasses[idx % 4]} liquid-glass p-6 flex flex-col justify-between cursor-pointer border border-white/10 hover:border-white/25 transition-all duration-300 group hover:-translate-y-1 shadow-lg`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[9px] font-mono uppercase text-zinc-300 bg-white/[0.06] px-2.5 py-0.5 rounded-full border border-white/10">
                        {brand.category}
                      </span>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          brand.status === 'ACTIVE' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                        }`}
                      />
                    </div>

                    <h4 className="font-black text-lg text-white tracking-tight group-hover:text-zinc-200 transition-colors uppercase">
                      {brand.name}
                    </h4>
                    <p className="text-xs text-zinc-400 line-clamp-2 mt-2 leading-relaxed font-normal">
                      {brand.tagline || brand.shortDescription}
                    </p>
                  </div>

                  <div className="mt-6 pt-3.5 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                    <span className="text-zinc-500 uppercase">NODE: {shapeName}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ========================================================
          SECTION 5: THE TRANSDIMENSIONAL GEOMETRIC PORTAL (FINAL CTA)
          Sacred Geometry alignment: Oval horizon, Diamond square, Inner Circle
          ======================================================== */}
      <section className="w-full max-w-6xl px-4 py-16 sm:py-24 text-center">
        <div className="relative rounded-[48px] sm:rounded-[72px] liquid-glass p-8 sm:p-16 md:p-24 flex flex-col items-center overflow-hidden border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
          {/* Background Concentric Geometric Resonators */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Outer Giant Oval */}
            <div className="w-[600px] h-[340px] rounded-full border border-white/[0.08] animate-pulse" />
            {/* Middle Rotating Diamond Square */}
            <div className="absolute w-72 h-72 rotate-45 border border-white/[0.08] animate-spin [animation-duration:60s]" />
            {/* Inner Glowing Orbital Circle */}
            <div className="absolute w-48 h-48 rounded-full border border-dashed border-white/15" />
            <div className="absolute w-64 h-64 rounded-full bg-white/[0.03] blur-3xl" />
          </div>

          {/* Center Brand Monogram Pedestal */}
          <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full liquid-glass-pill flex items-center justify-center mb-6 shadow-2xl border border-white/20 group hover:scale-110 transition-transform">
            <WebindSymbol className="w-12 h-12 sm:w-14 sm:h-14" />
          </div>

          <span className="relative z-10 text-xs font-mono tracking-widest text-zinc-400 uppercase mb-2">
            ▲ ● ■ JOIN THE DIGITAL ECOSYSTEM
          </span>
          <h2 className="relative z-10 text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase max-w-2xl leading-[1.06]">
            STEP INTO OUR WORLD.
          </h2>
          <p className="relative z-10 mt-3 sm:mt-4 text-xs sm:text-base text-zinc-300 max-w-md leading-relaxed font-normal">
            Explore our expanding ecosystem of high-performance software, developer platforms, and frontier ventures.
          </p>

          {/* Action Capsule Buttons */}
          <div className="relative z-10 mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <Link
              to="/brands"
              className="w-full sm:w-auto px-9 py-4 rounded-full bg-white text-black font-extrabold text-xs tracking-widest uppercase hover:bg-zinc-200 transition shadow-[0_0_30px_rgba(255,255,255,0.25)] tap-bounce"
            >
              EXPLORE ALL BRANDS
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto px-8 py-4 rounded-full liquid-glass-pill text-zinc-200 hover:text-white font-bold text-xs tracking-widest uppercase hover:border-white/30 transition tap-bounce border border-white/15"
            >
              READ MANIFESTO
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          APPLE LIQUID GLASS GEOMETRIC FOOTER
          ======================================================== */}
      <footer className="w-full max-w-6xl px-4 py-8 mb-6">
        <div className="px-6 py-4 rounded-full liquid-glass-pill flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 font-mono border border-white/10">
          <div className="flex items-center space-x-2.5">
            <WebindSymbol className="w-4 h-4" />
            <span>{settings?.copyright || '© 2026 WEBIND GROUP. All rights reserved.'}</span>
          </div>
          <div className="flex items-center space-x-6 text-[11px]">
            <Link to="/brands" className="hover:text-white transition">BRANDS</Link>
            <Link to="/about" className="hover:text-white transition">ABOUT</Link>
            <Link to="/more" className="hover:text-white transition">SETTINGS</Link>
            <Link to="/admin" className="hover:text-white transition">ADMIN OS</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
