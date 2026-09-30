import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Layers,
  Terminal,
  Cpu,
  Cloud,
  ArrowRight,
} from 'lucide-react';

const STAGE_BRANDS = [
  {
    id: 'weblets',
    name: 'Weblets',
    category: 'Digital & Web Platforms',
    status: 'ACTIVE',
    tagline: 'Modern Web Architectures & Component Systems',
    description: 'Next-generation web component architecture, high-performance micro-frontends, and design systems for enterprise scale.',
    metrics: { latency: '<0.4ms', tokens: '4,200+', availability: '99.99%' },
    color: '#38bdf8',
    icon: Layers,
    previewUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'stack-adda',
    name: 'Stack Adda',
    category: 'Developer Ecosystem',
    status: 'ACTIVE',
    tagline: 'The Sovereign Developer Community & Engineering Hub',
    description: 'A collaborative knowledge base, developer tools matrix, and engineering community hub for modern technologists.',
    metrics: { developers: '12,000+', benchmarks: '150+', playbooks: '80+' },
    color: '#818cf8',
    icon: Terminal,
    previewUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'neural-nexus',
    name: 'Neural Nexus',
    category: 'Artificial Intelligence',
    status: 'COMING_SOON',
    tagline: 'Autonomous Agentic Intelligence & Cognitive Swarms',
    description: 'Autonomous multi-agent orchestration infrastructure for complex enterprise reasoning and synthetic workflows.',
    metrics: { model: 'Swarm v1.2', reasoning: 'Neural-Edge', state: 'Stealth' },
    color: '#a855f7',
    icon: Cpu,
    previewUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'cloud-forge',
    name: 'Cloud Forge',
    category: 'SaaS & Cloud Infrastructure',
    status: 'COMING_SOON',
    tagline: 'Sovereign Cloud Orchestration & Edge Mesh',
    description: 'Declarative multi-cloud provisioning with unified observability and automated zero-trust security mesh.',
    metrics: { regions: '42 POPs', provisioning: 'Declarative', mesh: 'Zero-Trust' },
    color: '#f59e0b',
    icon: Cloud,
    previewUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
  },
];

export const HeroStage = () => {
  const [activeBrandId, setActiveBrandId] = useState('weblets');
  const activeBrand = STAGE_BRANDS.find((b) => b.id === activeBrandId) || STAGE_BRANDS[0];
  const Icon = activeBrand.icon;

  const { scrollY } = useScroll();
  const rotateX = useTransform(scrollY, [0, 300], [6, 0]);
  const scale = useTransform(scrollY, [0, 300], [0.98, 1]);
  const opacity = useTransform(scrollY, [0, 150], [0.98, 1]);

  return (
    <div className="w-full max-w-3xl lg:max-w-4xl mx-auto px-4 my-4 sm:my-6 md:my-8 overflow-hidden">
      <motion.div
        style={{ rotateX, scale, opacity }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
        className="relative rounded-3xl liquid-glass overflow-hidden w-full border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
      >
        {/* Top Console Bar */}
        <div className="flex items-center justify-between px-3 sm:px-5 py-2 sm:py-2.5 border-b border-white/[0.08] bg-white/[0.02] select-none gap-2 w-full min-w-0 overflow-hidden">
          <div className="flex items-center space-x-1.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-white/20 inline-block" />
            <span className="w-2 h-2 rounded-full bg-white/20 inline-block" />
            <span className="w-2 h-2 rounded-full bg-white/20 inline-block" />
            <span className="ml-1.5 font-mono text-[9px] sm:text-[10px] text-zinc-400 tracking-widest uppercase hidden sm:inline">
              WEBIND // CONSOLE
            </span>
          </div>

          {/* Brand Switcher Tabs with Animated Slider */}
          <div className="flex items-center space-x-1 p-0.5 sm:p-1 rounded-full bg-white/[0.04] border border-white/[0.08] overflow-x-auto scrollbar-none min-w-0 shrink">
            {STAGE_BRANDS.map((brand) => {
              const isSelected = brand.id === activeBrandId;
              return (
                <button
                  key={brand.id}
                  onClick={() => setActiveBrandId(brand.id)}
                  className="relative px-2.5 sm:px-3 py-1 rounded-full text-[9px] sm:text-[11px] font-mono uppercase tracking-wider transition-colors whitespace-nowrap shrink-0"
                >
                  {isSelected && (
                    <motion.div
                      layoutId="stage-tab-pill"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-white shadow-sm"
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors font-bold ${
                      isSelected ? 'text-black' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {brand.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Console Stage Body (Proportionate & Sleek on PC/Laptop) */}
        <div className="p-4 sm:p-6 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          {/* Left Column: Brand Info & Live Telemetry */}
          <div className="md:col-span-7 space-y-3 text-left">
            <div className="flex items-center space-x-2">
              <span className="text-[9px] font-mono tracking-widest text-zinc-300 uppercase bg-white/[0.06] border border-white/10 px-2.5 py-0.5 rounded-full">
                {activeBrand.category}
              </span>
              <span
                className={`text-[8px] font-mono uppercase px-2 py-0.5 rounded-full font-bold flex items-center space-x-1.5 ${
                  activeBrand.status === 'ACTIVE'
                    ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/30'
                    : 'bg-amber-950/70 text-amber-300 border border-amber-500/30'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    activeBrand.status === 'ACTIVE' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                  }`}
                />
                <span>{activeBrand.status.replace('_', ' ')}</span>
              </span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {activeBrand.name}
              </h3>
              <p className="text-xs font-medium text-zinc-300 mt-0.5">
                {activeBrand.tagline}
              </p>
            </div>

            <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed font-normal">
              {activeBrand.description}
            </p>

            {/* Live Metrics Grid for this Brand */}
            <div className="grid grid-cols-3 gap-2 pt-2.5 border-t border-white/[0.08]">
              {Object.entries(activeBrand.metrics).map(([key, val]) => (
                <div key={key} className="p-1.5 sm:p-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-[8px] font-mono uppercase text-zinc-400 block truncate">
                    {key}
                  </span>
                  <span className="text-xs font-mono font-bold text-white tracking-tight mt-0.5 block truncate">
                    {val}
                  </span>
                </div>
              ))}
            </div>

            {/* Direct Link Action */}
            <div className="pt-1">
              <Link
                to={`/brands/${activeBrand.id}`}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-white text-black font-extrabold text-[11px] uppercase tracking-wider hover:bg-zinc-200 transition shadow-[0_0_15px_rgba(255,255,255,0.2)] tap-bounce"
              >
                <span>OPEN BRAND OS</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Preview Media */}
          <div className="md:col-span-5 relative">
            <div className="relative aspect-[16/10] md:h-52 rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 group shadow-md">
              <img
                src={activeBrand.previewUrl}
                alt={activeBrand.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3.5">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {activeBrand.name}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-300">
                      DEPLOYED // GLOBAL
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroStage;
