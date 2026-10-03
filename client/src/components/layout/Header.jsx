import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Shield } from 'lucide-react';
import { WebindSymbol } from '../common/WebindLogo';
import { useAppState } from '../../context/AppStateContext';

export const Header = () => {
  const location = useLocation();
  const { setCommandPaletteOpen, settings } = useAppState();

  // Hide in admin
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="md:hidden fixed top-0 inset-x-0 z-[100] w-full px-4 py-2.5 pt-safe bg-[#050508]/85 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_4px_25px_rgba(0,0,0,0.7)] select-none">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        {/* Brand Identity with Liquid Glass Pedestal */}
        <Link to="/" className="flex items-center space-x-2.5 tap-bounce">
          <div className="w-8 h-8 rounded-full liquid-glass-pill flex items-center justify-center border border-white/20 p-1 shrink-0">
            <WebindSymbol className="w-full h-full" priority />
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-black tracking-widest text-white uppercase leading-none">
              {settings?.siteName || 'WEBIND GROUP'}
            </span>
            <span className="text-[8px] font-mono tracking-[0.2em] text-zinc-400 uppercase mt-0.5 leading-none">
              ECOSYSTEM OS
            </span>
          </div>
        </Link>

        {/* Mobile Action Controls: Search & Admin */}
        <div className="flex items-center space-x-2">
          {/* Command Search Trigger */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full liquid-glass-pill text-zinc-300 hover:text-white border border-white/10 active:scale-95 transition tap-bounce"
            aria-label="Search Ecosystem"
          >
            <Search className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-[10px] font-mono text-zinc-400">⌘K</span>
          </button>

          {/* Admin OS Portal */}
          <Link
            to="/admin"
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-white text-black font-extrabold text-[11px] tracking-wider uppercase shadow-md active:scale-95 transition tap-bounce"
            aria-label="Admin Portal"
          >
            <Shield className="w-3 h-3" />
            <span>Admin</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
