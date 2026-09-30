import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { WebindSymbol, WebindFullLogo } from '../../components/common/WebindLogo';
import { Layers, ShieldCheck, Cpu, ArrowRight, ExternalLink, Code2 } from 'lucide-react';
import LiquidGlassCard from '../../components/common/LiquidGlassCard';
import { useAppState } from '../../context/AppStateContext';

export const AboutPage = () => {
  const { settings } = useAppState();

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 md:py-16">
      {/* Header */}
      <div className="text-center md:text-left mb-12 pb-6 border-b border-white/[0.08]">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full liquid-glass-pill mb-4 select-none">
          <WebindSymbol className="w-3.5 h-3.5" />
          <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-zinc-300 uppercase">
            ABOUT THE PARENT COMPANY
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase">
          WEBIND GROUP
        </h1>
        <p className="mt-3 text-base sm:text-xl text-zinc-300 max-w-2xl font-normal leading-relaxed">
          {settings?.aboutHeadline || 'A unified architecture for technology creation.'}
        </p>
      </div>

      {/* Main Narrative Card */}
      <LiquidGlassCard className="p-8 sm:p-12 mb-12" interactiveTilt={false}>
        <div className="max-w-3xl space-y-6 text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
          <p>
            {settings?.aboutBody ||
              'WEBIND GROUP operates at the intersection of technological ambition, relentless craftsmanship, and ecosystem design. We conceptualize, build, scale, and nurture independent brands that push the boundaries of digital experiences, developer platforms, and future intelligent software.'}
          </p>
          <p>
            {settings?.ecosystemPhilosophy ||
              'Every brand in our ecosystem retains sovereign autonomy while leveraging unified engineering standards, shared intelligence, and an uncompromising obsession with quality.'}
          </p>
        </div>
      </LiquidGlassCard>

      {/* The 3 Core Pillars */}
      <div className="mb-16">
        <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-6">
          Architectural Principles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <LiquidGlassCard className="p-6 sm:p-7 space-y-3 sm:space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-white/[0.08] border border-white/15 flex items-center justify-center text-white shadow-md">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white tracking-tight">Sovereign Brands</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              We do not dilute individual brands into generic corporate subsidiaries. Each brand has its own identity, target audience, and engineering roadmap.
            </p>
          </LiquidGlassCard>

          <LiquidGlassCard className="p-6 sm:p-7 space-y-3 sm:space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-white/[0.08] border border-white/15 flex items-center justify-center text-white shadow-md">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white tracking-tight">Shared Core Technology</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Underneath each brand lies our battle-tested engineering infrastructure: low-latency edge delivery, headless design tokens, and modular cloud primitives.
            </p>
          </LiquidGlassCard>

          <LiquidGlassCard className="p-6 sm:p-7 space-y-3 sm:space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-white/[0.08] border border-white/15 flex items-center justify-center text-white shadow-md">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white tracking-tight">Radical Craftsmanship</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every interaction, typography choice, and animation is measured. We reject bloated software in favor of fluid, hyper-responsive digital operating systems.
            </p>
          </LiquidGlassCard>
        </div>
      </div>

      {/* Leadership & Contact */}
      <LiquidGlassCard className="p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6" interactiveTilt={false}>
        <div>
          <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
            COLLABORATION & VENTURES
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white uppercase mt-1">
            Build with Webind Group
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-lg">
            Whether you are exploring brand syndication, venture incubation, or developer ecosystem integration, our team is always ready to connect.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <a
            href={`mailto:${settings?.contact?.email || 'contact@webindgroup.com'}`}
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-white text-black font-extrabold text-xs uppercase tracking-wider text-center hover:bg-zinc-200 transition shadow-[0_0_20px_rgba(255,255,255,0.2)] tap-bounce"
          >
            Direct Inquiry
          </a>
          <Link
            to="/brands"
            className="w-full sm:w-auto px-6 py-3 rounded-full liquid-glass-pill text-zinc-300 hover:text-white font-bold text-xs uppercase tracking-wider text-center transition tap-bounce"
          >
            Explore Ecosystem
          </Link>
        </div>
      </LiquidGlassCard>
    </div>
  );
};

export default AboutPage;
