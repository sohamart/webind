import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  RotateCcw,
  Sun,
  Moon,
  Shield,
  Download,
  CheckCircle2,
  ExternalLink,
  Info,
  Server,
  Terminal,
  Activity,
  ChevronRight,
  Database,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';
import { WebindSymbol } from '../../components/common/WebindLogo';
import LiquidGlassCard from '../../components/common/LiquidGlassCard';
import { useAppState } from '../../context/AppStateContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../components/common/Toast';

export const MorePage = () => {
  const { replayOnboarding, settings, brands } = useAppState();
  const { theme, toggleTheme } = useTheme();
  const { addToast } = useToast();

  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallApp = async () => {
    if (!installPrompt) {
      addToast({
        type: 'info',
        title: 'Application Ready',
        message: 'You can install this app directly via your browser settings or home screen menu.',
      });
      return;
    }
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setInstallPrompt(null);
      addToast({
        type: 'success',
        title: 'App Installed',
        message: 'WEBIND GROUP is now installed on your device.',
      });
    }
  };

  const handleReplay = () => {
    replayOnboarding();
  };

  const activeBrandCount = brands.filter((b) => b.status === 'ACTIVE').length;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 md:py-12">
      {/* Apple Profile Header Card */}
      <div className="relative rounded-3xl liquid-glass p-6 sm:p-8 mb-6 overflow-hidden flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-5 text-center sm:text-left">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/[0.06] border border-white/15 flex items-center justify-center shrink-0 shadow-lg">
          <WebindSymbol className="w-10 h-10 sm:w-12 sm:h-12" />
          <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-black flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
              {settings?.siteName || 'WEBIND GROUP'}
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-[9px] font-mono uppercase text-zinc-300">
              CORE OS v2.0
            </span>
          </div>

          <p className="text-xs text-zinc-400 font-normal leading-relaxed">
            Parent Technology Syndicate & Sovereign Venture Ecosystem
          </p>

          <div className="mt-3 flex items-center justify-center sm:justify-start space-x-4 text-[11px] font-mono text-zinc-500">
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{activeBrandCount} Brands Online</span>
            </span>
            <span>•</span>
            <span>Zero-Trust Architecture</span>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {/* GROUP 1: SYSTEM PREFERENCES & CONTROLS */}
        <div className="rounded-3xl liquid-glass overflow-hidden divide-y divide-white/[0.06]">
          <div className="px-5 py-3 bg-white/[0.02]">
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
              EXPERIENCE & APPEARANCE
            </span>
          </div>

          {/* Theme Control */}
          <div className="p-4 sm:p-5 flex items-center justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-zinc-300">
                {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-white">Appearance Theme</div>
                <div className="text-[11px] text-zinc-400">
                  Switch between Deep Obsidian and High-Contrast Light
                </div>
              </div>
            </div>

            <div className="flex items-center p-1 rounded-full bg-black/50 border border-white/10">
              <button
                onClick={() => theme !== 'dark' && toggleTheme()}
                className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase font-bold transition ${
                  theme === 'dark'
                    ? 'bg-white text-black shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Dark
              </button>
              <button
                onClick={() => theme === 'dark' && toggleTheme()}
                className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase font-bold transition ${
                  theme !== 'dark'
                    ? 'bg-white text-black shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Light
              </button>
            </div>
          </div>

          {/* Replay Onboarding */}
          <div className="p-4 sm:p-5 flex items-center justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-zinc-300">
                <RotateCcw className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-white">Ecosystem Welcome Reveal</div>
                <div className="text-[11px] text-zinc-400">
                  Re-experience the 4-step onboarding presentation
                </div>
              </div>
            </div>

            <button
              onClick={handleReplay}
              className="px-4 py-2 rounded-full liquid-glass-pill hover:border-white/30 text-xs font-bold uppercase tracking-wider text-white transition tap-bounce shrink-0"
            >
              Replay
            </button>
          </div>

          {/* PWA Standalone App */}
          <div className="p-4 sm:p-5 flex items-center justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-zinc-300">
                <Download className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-white">Install Web App (PWA)</div>
                <div className="text-[11px] text-zinc-400">
                  Install as a standalone native-feel desktop/mobile app
                </div>
              </div>
            </div>

            <button
              onClick={handleInstallApp}
              className="px-4 py-2 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-extrabold uppercase tracking-wider transition tap-bounce shrink-0 shadow-sm"
            >
              {isInstalled ? 'Installed' : 'Install'}
            </button>
          </div>
        </div>

        {/* GROUP 2: GOVERNANCE & ADMIN OS */}
        <div className="rounded-3xl liquid-glass overflow-hidden divide-y divide-white/[0.06]">
          <div className="px-5 py-3 bg-white/[0.02]">
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
              GOVERNANCE & PLATFORM CMS
            </span>
          </div>

          <Link
            to="/admin"
            className="p-4 sm:p-5 flex items-center justify-between hover:bg-white/[0.02] transition group"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-zinc-200 group-hover:scale-105 transition-transform">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-white flex items-center space-x-2">
                  <span>Webind Administration OS</span>
                  <span className="px-1.5 py-0.5 rounded bg-white/10 text-[9px] font-mono text-zinc-300">
                    PROTECTED
                  </span>
                </div>
                <div className="text-[11px] text-zinc-400">
                  Manage brand entities, homepage metrics, media & logs
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-1 text-zinc-400 group-hover:text-white transition">
              <span className="text-xs font-mono">ENTER</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* GROUP 3: SYSTEM TELEMETRY */}
        <div className="rounded-3xl liquid-glass overflow-hidden p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
              ENGINE TELEMETRY
            </span>
            <span className="flex items-center space-x-1.5 text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>CORE HEALTHY</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <span className="text-[9px] font-mono text-zinc-500 uppercase block">Engine Core</span>
              <span className="font-mono font-bold text-white mt-1 block">Webind Embedded OS</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <span className="text-[9px] font-mono text-zinc-500 uppercase block">Database Engine</span>
              <span className="font-mono font-bold text-white mt-1 block">Dual-Mode Persistence</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <span className="text-[9px] font-mono text-zinc-500 uppercase block">Front-End Architecture</span>
              <span className="font-mono font-bold text-white mt-1 block">Vite 6 + React 18</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <span className="text-[9px] font-mono text-zinc-500 uppercase block">Motion System</span>
              <span className="font-mono font-bold text-white mt-1 block">Framer Motion + Lenis</span>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="text-center pt-4 text-[10px] font-mono text-zinc-500">
          <span>{settings?.copyright || '© 2026 WEBIND GROUP. All rights reserved.'}</span>
        </div>
      </div>
    </div>
  );
};

export default MorePage;
