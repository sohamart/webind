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
} from 'lucide-react';
import { WebindSymbol } from '../../components/common/WebindLogo';
import BrandCard from '../../components/brand/BrandCard';
import LiquidGlassCard from '../../components/common/LiquidGlassCard';
import InfiniteTicker from '../../components/common/InfiniteTicker';
import HeroStage from '../../components/common/HeroStage';
import { useAppState } from '../../context/AppStateContext';

export const HomePage = () => {
  const { settings, brands, loadingData } = useAppState();
  const navigate = useNavigate();

  const featuredBrands = brands.filter((b) => b.isFeatured && b.status !== 'ARCHIVED');
  const latestBrands = [...brands]
    .filter((b) => b.status !== 'ARCHIVED')
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  const heroTitle = settings?.heroTitle || 'WE BIND IDEAS.';
  const heroSubtitle =
    settings?.heroSubtitle ||
    'A parent technology group engineering sovereign brands, developer ecosystems, and frontier ventures.';
  const heroCtaText = settings?.heroCtaText || 'EXPLORE BRANDS';

  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden">
      {/* Announcement HUD Banner — Clean & Mobile Optimized */}
      {settings?.announcement?.enabled && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-5xl px-3 sm:px-4 pt-3 pb-1"
        >
          <Link
            to={settings.announcement.link || '/brands'}
            className="flex items-center justify-between px-3.5 sm:px-5 py-2 rounded-full liquid-glass-pill text-zinc-300 hover:text-white text-xs transition group gap-2"
          >
            <div className="flex items-center space-x-2.5 min-w-0 flex-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-emerald-400 font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shrink-0">
                <span className="hidden sm:inline">TELEMETRY // </span>LIVE
              </span>
              <span className="text-zinc-200 font-medium truncate text-[11px] sm:text-xs">
                {settings.announcement.text}
              </span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white group-hover:translate-x-1 transition-transform shrink-0" />
          </Link>
        </motion.div>
      )}

      {/* ==========================================
          HERO SECTION — APPLE PRO LUXURY
          ========================================== */}
      <section className="relative w-full max-w-5xl px-4 pt-6 pb-4 md:pt-14 md:pb-6 flex flex-col items-center text-center">
        {/* Floating Apple Liquid Pill Chip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full liquid-glass-pill mb-5 select-none"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-zinc-300 uppercase">
            WEBIND GROUP <span className="hidden sm:inline">// OPERATING SYSTEM</span>
          </span>
          <span className="text-zinc-600 font-mono text-xs">|</span>
          <span className="text-[10px] font-mono text-zinc-400 uppercase">
            CORE: ONLINE
          </span>
        </motion.div>

        {/* Hero Title with Metallic Liquid Shimmer */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight max-w-4xl leading-[1.04] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-400"
        >
          {heroTitle}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-zinc-300 max-w-2xl font-normal leading-relaxed"
        >
          {heroSubtitle}
        </motion.p>

        {/* Primary CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto z-10"
        >
          <Link
            to="/brands"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3.5 rounded-full bg-white text-black font-extrabold text-xs tracking-widest uppercase hover:bg-zinc-200 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.25)] tap-bounce"
          >
            <span>{heroCtaText}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/about"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-7 py-3.5 rounded-full liquid-glass-pill text-zinc-200 hover:text-white font-bold text-xs tracking-widest uppercase hover:border-white/30 transition-all duration-300 tap-bounce"
          >
            <Activity className="w-3.5 h-3.5 text-zinc-400" />
            <span>THE ECOSYSTEM MODEL</span>
          </Link>
        </motion.div>
      </section>

      {/* ==========================================
          3D PERSPECTIVE SCROLL STAGE
          ========================================== */}
      <HeroStage />

      {/* ==========================================
          CONTINUOUS INFINITE TICKER MARQUEE
          ========================================== */}
      <InfiniteTicker />

      {/* ==========================================
          SECTION 1: ASYMMETRICAL TELEMETRY COCKPIT HUD
          Unique designer chamfer & split panoramic layout
          ========================================== */}
      <section className="w-full max-w-6xl px-4 py-16">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/[0.08]">
          <div className="flex items-center space-x-2 text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
            <Terminal className="w-3.5 h-3.5 text-zinc-400" />
            <span>SYSTEM TELEMETRY COCKPIT</span>
          </div>
          <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest hidden sm:inline">
            COORDINATE // 60HZ REALTIME
          </span>
        </div>

        {/* Asymmetrical Cockpit Bento Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Card 1: Master Panoramic HUD Card (Spans 6 cols) */}
          <div className="md:col-span-6 relative rounded-[36px] rounded-br-[14px] liquid-glass p-6 sm:p-8 flex flex-col justify-between overflow-hidden border border-white/15 hover:border-white/30 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 font-mono text-[9px] uppercase tracking-widest text-zinc-300">
                  FLAGSHIP MATRIX
                </span>
                <span className="flex items-center space-x-1.5 text-[10px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ONLINE</span>
                </span>
              </div>

              <div className="flex items-baseline space-x-3">
                <span className="text-4xl sm:text-6xl font-black text-white font-mono tracking-tight">
                  4+
                </span>
                <span className="text-xs font-mono uppercase text-zinc-400">
                  ACTIVE BRANDS
                </span>
              </div>
              <p className="text-xs text-zinc-300 mt-2 max-w-md leading-relaxed font-normal">
                Autonomous operating entities engineered for long-term category dominance across web, AI, and developer infrastructure.
              </p>
            </div>

            {/* Live Micro Signal Wave Graph */}
            <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-white/40" />
                <span>LOAD BALANCER: NOMINAL</span>
              </div>
              <span className="text-zinc-400 font-bold">&lt;0.4ms LATENCY</span>
            </div>
          </div>

          {/* Card 2: Ventures Built (Spans 3 cols) */}
          <div className="md:col-span-3 relative rounded-[36px] rounded-tl-[14px] liquid-glass p-6 flex flex-col justify-between border border-white/15 hover:border-white/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">[02 // LABS]</span>
              <Rocket className="w-4 h-4 text-zinc-400" />
            </div>
            <div>
              <span className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight block">
                8+
              </span>
              <div className="text-xs font-bold text-white mt-1">Ventures Built</div>
              <div className="text-[11px] text-zinc-400 mt-0.5 leading-snug">
                Across AI, Web, SaaS & Tooling
              </div>
            </div>
            <div className="mt-4 pt-2 border-t border-white/[0.06] text-[10px] font-mono text-zinc-500">
              INCUBATION // CONTINUOUS
            </div>
          </div>

          {/* Card 3: Products Deployed (Spans 3 cols) */}
          <div className="md:col-span-3 relative rounded-[36px] rounded-tr-[14px] liquid-glass p-6 flex flex-col justify-between border border-white/15 hover:border-white/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">[03 // DEPLOY]</span>
              <Cpu className="w-4 h-4 text-zinc-400" />
            </div>
            <div>
              <span className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight block">
                25+
              </span>
              <div className="text-xs font-bold text-white mt-1">Products Deployed</div>
              <div className="text-[11px] text-zinc-400 mt-0.5 leading-snug">
                High-availability production software
              </div>
            </div>
            <div className="mt-4 pt-2 border-t border-white/[0.06] text-[10px] font-mono text-zinc-500">
              AVAILABILITY // 99.99%
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 2: BESPOKE BENTO BRANDS SHOWCASE
          Asymmetrical Flagship layout (7/5 split)
          ========================================== */}
      <section className="w-full max-w-6xl px-4 py-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 pb-4 border-b border-white/[0.08] gap-4">
          <div>
            <div className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase flex items-center space-x-1.5">
              <Sparkles className="w-3 h-3 text-zinc-400" />
              <span>CORE SYNDICATE SHOWCASE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase mt-1">
              Featured Brands
            </h2>
          </div>

          <Link
            to="/brands"
            className="flex items-center space-x-1.5 text-xs font-bold tracking-wider text-zinc-400 hover:text-white uppercase group transition"
          >
            <span>View All Brands</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {featuredBrands[0] && (
            <div
              onClick={() => navigate(`/brands/${featuredBrands[0].slug}`)}
              className="md:col-span-7 relative rounded-[40px] rounded-tl-[16px] liquid-glass p-7 sm:p-9 flex flex-col justify-between cursor-pointer border border-white/15 hover:border-white/30 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3.5 py-1 rounded-full bg-white/[0.08] border border-white/10 font-mono text-[10px] uppercase text-zinc-200">
                    {featuredBrands[0].category}
                  </span>
                  <span className="flex items-center space-x-1.5 text-[9px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-emerald-950/70 text-emerald-300 border border-emerald-500/30 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>ACTIVE</span>
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
                    {featuredBrands[0].name}
                  </h3>
                  <p className="text-sm sm:text-base font-medium text-zinc-300">
                    {featuredBrands[0].tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                    {featuredBrands[0].shortDescription}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <span className="font-mono text-[11px] text-zinc-400 uppercase">
                  ENTER BRAND OS
                </span>
                <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          )}

          {featuredBrands[1] && (
            <div
              onClick={() => navigate(`/brands/${featuredBrands[1].slug}`)}
              className="md:col-span-5 relative rounded-[40px] rounded-tr-[16px] liquid-glass p-7 sm:p-9 flex flex-col justify-between cursor-pointer border border-white/15 hover:border-white/30 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3.5 py-1 rounded-full bg-white/[0.08] border border-white/10 font-mono text-[10px] uppercase text-zinc-200">
                    {featuredBrands[1].category}
                  </span>
                  <span className="flex items-center space-x-1.5 text-[9px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-emerald-950/70 text-emerald-300 border border-emerald-500/30 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>ACTIVE</span>
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
                    {featuredBrands[1].name}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-zinc-300">
                    {featuredBrands[1].tagline}
                  </p>
                  <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                    {featuredBrands[1].shortDescription}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <span className="font-mono text-[11px] text-zinc-400 uppercase">
                  EXPLORE HUB
                </span>
                <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ==========================================
          SECTION 3: STEPPED ARCHITECTURAL TRI-POD
          The Webind Model with Connected Fabric Bus
          ========================================== */}
      <section className="w-full max-w-6xl px-4 py-16">
        <div className="text-center sm:text-left mb-8 pb-4 border-b border-white/[0.08]">
          <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
            SYSTEM FOUNDATION
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white mt-1 uppercase">
            The Webind Model
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 mt-2 max-w-xl">
            A tripartite architecture engineered for long-term category dominance across web, developer platforms, and deep-tech ventures.
          </p>
        </div>

        {/* Visual Architectural Interconnect Bus */}
        <div className="hidden md:flex items-center justify-between px-12 mb-4">
          <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-500 uppercase">
            <span className="w-2 h-2 rounded-full bg-white/40" />
            <span>SOVEREIGN PILLAR</span>
          </div>
          <div className="flex-1 mx-6 h-[1px] bg-gradient-to-r from-white/20 via-white/40 to-white/20 relative">
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-white/15 text-[8px] font-mono text-zinc-300 uppercase tracking-widest">
              DATA HIGHWAY // SECURE
            </div>
          </div>
          <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-500 uppercase">
            <span>FRONTIER LABS</span>
            <span className="w-2 h-2 rounded-full bg-white/40" />
          </div>
        </div>

        {/* Unique Stepped Asymmetrical Shapes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {/* Pillar 01: Chamfered Top-Left */}
          <div className="rounded-tl-[48px] rounded-br-[32px] rounded-tr-2xl rounded-bl-2xl liquid-glass p-7 space-y-4 border border-white/15 hover:border-white/30 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/[0.08] border border-white/15 flex items-center justify-center text-white mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase block">01 // SOVEREIGNTY</span>
              <h3 className="font-bold text-lg text-white tracking-tight mt-1">Independent Brands</h3>
              <p className="text-xs text-zinc-300 leading-relaxed mt-2">
                Every entity inside our syndicate maintains autonomous operational identity, community loyalty, and specialized engineering roadmaps.
              </p>
            </div>
            <div className="pt-4 border-t border-white/[0.06] text-[10px] font-mono text-zinc-500 uppercase">
              AUTONOMOUS EXECUTION
            </div>
          </div>

          {/* Pillar 02: Elevated Center Core with Top Capsule */}
          <div className="rounded-3xl liquid-glass p-7 space-y-4 border-2 border-white/25 hover:border-white/40 transition-all duration-300 md:-translate-y-3 shadow-2xl flex flex-col justify-between relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-white text-black font-mono text-[9px] font-extrabold uppercase tracking-widest shadow-md">
              CORE FOUNDATION
            </div>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/[0.12] border border-white/20 flex items-center justify-center text-white mb-4 mt-2">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono text-zinc-300 uppercase block">02 // UNIFIED FABRIC</span>
              <h3 className="font-bold text-lg text-white tracking-tight mt-1">Shared Infrastructure</h3>
              <p className="text-xs text-zinc-200 leading-relaxed mt-2">
                Global design token compilers, zero-trust edge delivery nodes, and high-availability database replication shared across all brands.
              </p>
            </div>
            <div className="pt-4 border-t border-white/[0.08] text-[10px] font-mono text-emerald-400 uppercase flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>SYNCHRONIZED FABRIC</span>
            </div>
          </div>

          {/* Pillar 03: Chamfered Top-Right */}
          <div className="rounded-tr-[48px] rounded-bl-[32px] rounded-tl-2xl rounded-br-2xl liquid-glass p-7 space-y-4 border border-white/15 hover:border-white/30 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/[0.08] border border-white/15 flex items-center justify-center text-white mb-4">
                <Code2 className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase block">03 // FRONTIER LABS</span>
              <h3 className="font-bold text-lg text-white tracking-tight mt-1">Next-Decade Ventures</h3>
              <p className="text-xs text-zinc-300 leading-relaxed mt-2">
                Incubating autonomous reasoning swarms, distributed cloud mesh, and sovereign developer tool suites for the post-cloud era.
              </p>
            </div>
            <div className="pt-4 border-t border-white/[0.06] text-[10px] font-mono text-zinc-500 uppercase">
              R&amp;D PIPELINE ACTIVE
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 4: LATEST VENTURES DIRECTORY
          ========================================== */}
      {latestBrands.length > 0 && (
        <section className="w-full max-w-6xl px-4 py-12">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
            <div>
              <div className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
                PORTFOLIO TELEMETRY
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase mt-1">
                Ecosystem Directory
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {latestBrands.map((brand) => (
              <div
                key={brand._id || brand.slug}
                onClick={() => navigate(`/brands/${brand.slug}`)}
                className="rounded-3xl liquid-glass p-5 flex flex-col justify-between cursor-pointer border border-white/10 hover:border-white/25 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] font-mono uppercase text-zinc-300 bg-white/[0.06] px-2.5 py-0.5 rounded-full border border-white/10">
                      {brand.category}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        brand.status === 'ACTIVE' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                      }`}
                    />
                  </div>
                  <h4 className="font-black text-base text-white tracking-tight group-hover:text-zinc-200 transition-colors">
                    {brand.name}
                  </h4>
                  <p className="text-xs text-zinc-400 line-clamp-2 mt-2 leading-relaxed font-normal">
                    {brand.tagline || brand.shortDescription}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                  <span>{brand.status === 'ACTIVE' ? 'DEPLOYED' : 'IN RESEARCH'}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ==========================================
          SECTION 5: FINAL CINEMATIC CTA — BESPOKE ARCHITECTURAL RINGS
          ========================================== */}
      <section className="w-full max-w-6xl px-4 py-16 sm:py-24 text-center">
        <div className="relative rounded-[44px] liquid-glass p-8 sm:p-16 md:p-24 flex flex-col items-center overflow-hidden border border-white/15">
          {/* Animated Concentric Designer Orbital Radar Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-25">
            <div className="w-[300px] h-[300px] rounded-full border border-white/15 animate-spin" style={{ animationDuration: '45s' }} />
            <div className="absolute w-[460px] h-[460px] rounded-full border border-dashed border-white/10 animate-spin" style={{ animationDuration: '70s', animationDirection: 'reverse' }} />
            <div className="absolute w-[640px] h-[640px] rounded-full border border-white/5" />
            <div className="absolute w-[820px] h-[820px] rounded-full border border-white/[0.03]" />
          </div>

          {/* Center Brand Monogram Pedestal */}
          <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-3xl liquid-glass-pill flex items-center justify-center mb-6 shadow-2xl">
            <WebindSymbol className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>

          <span className="relative z-10 text-xs font-mono tracking-widest text-zinc-400 uppercase mb-2">
            JOIN THE ECOSYSTEM
          </span>
          <h2 className="relative z-10 text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase max-w-2xl leading-[1.06]">
            STEP INTO OUR WORLD.
          </h2>
          <p className="relative z-10 mt-3 sm:mt-4 text-xs sm:text-base text-zinc-300 max-w-md leading-relaxed font-normal">
            Explore our expanding ecosystem of high-performance software, developer platforms, and frontier ventures.
          </p>

          <div className="relative z-10 mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              to="/brands"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black font-extrabold text-xs tracking-widest uppercase hover:bg-zinc-200 transition shadow-[0_0_25px_rgba(255,255,255,0.25)] tap-bounce"
            >
              EXPLORE ALL BRANDS
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full liquid-glass-pill text-zinc-200 hover:text-white font-bold text-xs tracking-widest uppercase transition tap-bounce"
            >
              READ MANIFESTO
            </Link>
          </div>
        </div>
      </section>

      {/* Subtle Apple Liquid Glass Footer */}
      <footer className="w-full max-w-6xl px-4 py-8 mb-6">
        <div className="px-6 py-4 rounded-full liquid-glass-pill flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 font-mono">
          <div className="flex items-center space-x-2.5">
            <WebindSymbol className="w-4 h-4" />
            <span>{settings?.copyright || '© 2026 WEBIND GROUP. All rights reserved.'}</span>
          </div>
          <div className="flex items-center space-x-5">
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
