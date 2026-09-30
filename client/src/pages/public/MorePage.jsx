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
} from 'lucide-react';
import { WebindSymbol } from '../../components/common/WebindLogo';
import LiquidGlassCard from '../../components/common/LiquidGlassCard';
import { useAppState } from '../../context/AppStateContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../components/common/Toast';

export const MorePage = () => {
  const { replayOnboarding, settings } = useAppState();
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
        title: 'PWA Installed or Ready',
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

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <div className="mb-8 pb-4 border-b border-white/[0.08]">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full liquid-glass-pill mb-3 select-none">
          <WebindSymbol className="w-3.5 h-3.5" />
          <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-zinc-300 uppercase">
            APPLICATION & SETTINGS
          </span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight uppercase">
          More
        </h1>
      </div>

      <div className="space-y-6">
        {/* Experience & Onboarding Group */}
        <LiquidGlassCard className="p-6 space-y-4" interactiveTilt={false}>
          <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
            EXPERIENCE CONTROLS
          </span>

          {/* Replay Onboarding */}
          <div className="flex items-center justify-between py-2 border-b border-white/[0.06]">
            <div>
              <div className="text-sm font-bold text-white">Replay Onboarding</div>
              <div className="text-xs text-zinc-400">
                Experience the first-launch reveal sequence and ecosystem intro again.
              </div>
            </div>
            <button
              onClick={handleReplay}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-full liquid-glass-pill hover:border-white/30 text-xs font-bold uppercase tracking-wider text-white transition tap-bounce shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay</span>
            </button>
          </div>

          {/* Theme Switcher */}
          <div className="flex items-center justify-between py-2 border-b border-white/[0.06]">
            <div>
              <div className="text-sm font-bold text-white">Appearance Theme</div>
              <div className="text-xs text-zinc-400">
                Currently running in <span className="font-mono text-white uppercase">{theme} mode</span>.
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-full liquid-glass-pill hover:border-white/30 text-xs font-bold uppercase tracking-wider text-white transition tap-bounce shrink-0"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
          </div>

          {/* PWA Install */}
          <div className="flex items-center justify-between py-2">
            <div>
              <div className="text-sm font-bold text-white">Install Web Application</div>
              <div className="text-xs text-zinc-400">
                Install WEBIND GROUP as a standalone mobile or desktop application.
              </div>
            </div>
            <button
              onClick={handleInstallApp}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-extrabold uppercase tracking-wider transition tap-bounce shrink-0 shadow-md"
            >
              {isInstalled ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
              <span>{isInstalled ? 'Installed' : 'Install'}</span>
            </button>
          </div>
        </LiquidGlassCard>

        {/* Administration Portal Link */}
        <LiquidGlassCard className="p-6 space-y-3" interactiveTilt={false}>
          <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
            ADMINISTRATION
          </span>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-white">Admin CMS Portal</div>
              <div className="text-xs text-zinc-400">
                Manage brands, homepage metrics, media assets, and view audit activity.
              </div>
            </div>
            <Link
              to="/admin"
              className="flex items-center space-x-1.5 px-5 py-2.5 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-extrabold uppercase tracking-wider transition tap-bounce shrink-0 shadow-md"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin OS</span>
            </Link>
          </div>
        </LiquidGlassCard>

        {/* System Diagnostics */}
        <LiquidGlassCard className="p-6 space-y-3" interactiveTilt={false}>
          <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
            SYSTEM TELEMETRY
          </span>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <span className="text-[10px] font-mono text-zinc-400 uppercase block">Operating System</span>
              <span className="font-mono font-bold text-white mt-0.5 block">Webind OS v2.0</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <span className="text-[10px] font-mono text-zinc-400 uppercase block">Engine Core</span>
              <span className="font-mono font-bold text-emerald-400 flex items-center space-x-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ONLINE</span>
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <span className="text-[10px] font-mono text-zinc-400 uppercase block">Architecture</span>
              <span className="font-mono font-bold text-white mt-0.5 block">React + Node + Mongo</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <span className="text-[10px] font-mono text-zinc-400 uppercase block">Deployment Mode</span>
              <span className="font-mono font-bold text-white mt-0.5 block">Production Ready</span>
            </div>
          </div>
        </LiquidGlassCard>

        {/* Legal & Copyright */}
        <div className="text-center pt-6 text-[11px] font-mono text-zinc-500">
          <span>{settings?.copyright || '© 2026 WEBIND GROUP. All rights reserved.'}</span>
        </div>
      </div>
    </div>
  );
};

export default MorePage;
