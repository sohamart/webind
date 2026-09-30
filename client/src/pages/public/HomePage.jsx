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
} from 'lucide-react';
import { WebindSymbol } from '../../components/common/WebindLogo';
import BrandCard from '../../components/brand/BrandCard';
import LiquidGlassCard from '../../components/common/LiquidGlassCard';
import SpotlightCard from '../../components/common/SpotlightCard';
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

  const metrics = settings?.metrics || [
    { label: 'Active Brands', value: '4+', description: 'Specialized technology entities', icon: 'Layers' },
    { label: 'Ventures Built', value: '8+', description: 'Across AI, Web, SaaS & Tools', icon: 'Rocket' },
    { label: 'Products Deployed', value: '25+', description: 'High-availability software', icon: 'Cpu' },
    { label: 'Global Footprint', value: '18+', description: 'Countries impacted', icon: 'Globe' },
  ];

  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden">
      {/* Announcement HUD Banner — Fully Mobile Optimized */}
      {settings?.announcement?.enabled && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-5xl px-3 sm:px-4 pt-3 pb-1"
        >
          <Link
            to={settings.announcement.link || '/brands'}
            className="flex items-center justify-between px-3 sm:px-5 py-1.5 sm:py-2 rounded-full liquid-glass-pill text-zinc-300 hover:text-white text-xs transition group gap-2"
          >
            <div className="flex items-center space-x-2 min-w-0 flex-1">
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
          HERO SECTION — APPLE LIQUID GLASS LUXURY
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
            ONLINE
          </span>
        </motion.div>

        {/* Hero Title with Metallic Liquid Shimmer */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight max-w-4xl leading-[1.04] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-400 drop-shadow-sm"
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
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3.5 rounded-full bg-white text-black font-extrabold text-xs tracking-widest uppercase hover:bg-zinc-200 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)] tap-bounce"
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
          DYNAMIC METRICS SECTION (LIQUID GLASS BENTO)
          ========================================== */}
      <section className="w-full max-w-6xl px-4 py-16">
        <div className="flex items-center space-x-2 text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-5">
          <Terminal className="w-3.5 h-3.5 text-zinc-400" />
          <span>REAL-TIME SYSTEM TELEMETRY</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {metrics.map((metric, idx) => (
            <LiquidGlassCard key={metric.label || idx} className="p-5 sm:p-6" interactiveTilt={false}>
              <span className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-mono">
                {metric.value}
              </span>
              <div className="mt-3 sm:mt-4">
                <div className="text-xs md:text-sm font-bold tracking-tight text-white">
                  {metric.label}
                </div>
                <div className="text-[10px] sm:text-[11px] text-zinc-400 mt-1 leading-snug">
                  {metric.description}
                </div>
              </div>
            </LiquidGlassCard>
          ))}
        </div>
      </section>

      {/* ==========================================
          FEATURED BRANDS SHOWCASE (APPLE GLASS BENTO)
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

        {loadingData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="h-64 rounded-3xl liquid-glass animate-pulse" />
            <div className="h-64 rounded-3xl liquid-glass animate-pulse" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featuredBrands.map((brand) => (
              <BrandCard key={brand._id || brand.slug} brand={brand} />
            ))}
          </div>
        )}
      </section>

      {/* ==========================================
          THE WEBIND BENTO ARCHITECTURE MODEL
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LiquidGlassCard className="p-6 sm:p-7 space-y-3 sm:space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-white/[0.08] border border-white/15 flex items-center justify-center text-white shadow-md">
              <Layers className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono text-zinc-400 uppercase block">01 // SOVEREIGNTY</span>
            <h3 className="font-bold text-base sm:text-lg text-white tracking-tight">Independent Brands</h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Every entity inside our syndicate maintains autonomous operational identity, community loyalty, and specialized engineering roadmaps.
            </p>
          </LiquidGlassCard>

          <LiquidGlassCard className="p-6 sm:p-7 space-y-3 sm:space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-white/[0.08] border border-white/15 flex items-center justify-center text-white shadow-md">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono text-zinc-400 uppercase block">02 // UNIFIED CORE</span>
            <h3 className="font-bold text-base sm:text-lg text-white tracking-tight">Shared Infrastructure</h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Global design token compilers, zero-trust edge delivery nodes, and high-availability database replication shared across all brands.
            </p>
          </LiquidGlassCard>

          <LiquidGlassCard className="p-6 sm:p-7 space-y-3 sm:space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-white/[0.08] border border-white/15 flex items-center justify-center text-white shadow-md">
              <Code2 className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono text-zinc-400 uppercase block">03 // FRONTIER LABS</span>
            <h3 className="font-bold text-base sm:text-lg text-white tracking-tight">Next-Decade Ventures</h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Incubating autonomous reasoning swarms, distributed cloud mesh, and sovereign developer tool suites for the post-cloud era.
            </p>
          </LiquidGlassCard>
        </div>
      </section>

      {/* ==========================================
          LATEST VENTURES DIRECTORY
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
              <LiquidGlassCard
                key={brand._id || brand.slug}
                onClick={() => navigate(`/brands/${brand.slug}`)}
                className="cursor-pointer flex flex-col justify-between p-5"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] font-mono uppercase text-zinc-300 bg-white/[0.06] px-2 py-0.5 rounded-full border border-white/10">
                      {brand.category}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        brand.status === 'ACTIVE' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                      }`}
                    />
                  </div>
                  <h4 className="font-black text-base text-white tracking-tight">
                    {brand.name}
                  </h4>
                  <p className="text-xs text-zinc-300 line-clamp-2 mt-2 leading-relaxed">
                    {brand.tagline || brand.shortDescription}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                  <span>{brand.status === 'ACTIVE' ? 'DEPLOYED' : 'IN RESEARCH'}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </LiquidGlassCard>
            ))}
          </div>
        </section>
      )}

      {/* ==========================================
          FINAL CINEMATIC CTA (APPLE LIQUID GLASS)
          ========================================== */}
      <section className="w-full max-w-6xl px-4 py-16 sm:py-20 text-center">
        <LiquidGlassCard className="p-8 sm:p-14 md:p-20 flex flex-col items-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl liquid-glass-pill flex items-center justify-center mb-6 shadow-2xl">
            <WebindSymbol className="w-9 h-9 sm:w-10 sm:h-10" />
          </div>
          <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase mb-2">
            JOIN THE ECOSYSTEM
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase max-w-2xl leading-[1.08]">
            STEP INTO OUR WORLD.
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-zinc-300 max-w-md leading-relaxed font-normal">
            Explore our expanding ecosystem of high-performance software, developer platforms, and frontier ventures.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
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
        </LiquidGlassCard>
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
