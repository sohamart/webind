import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Sun, Moon, Shield } from 'lucide-react';
import { WebindSymbol } from '../common/WebindLogo';
import { useAppState } from '../../context/AppStateContext';
import { useTheme } from '../../context/ThemeContext';

export const Header = () => {
  const location = useLocation();
  const { setCommandPaletteOpen, settings } = useAppState();
  const { theme, toggleTheme } = useTheme();

  // Hide in admin
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="md:hidden sticky top-0 z-30 w-full px-4 py-3 pt-safe bg-[#050508]/60 backdrop-blur-2xl border-b border-white/[0.08]">
      <div className="flex items-center justify-between">
        {/* Brand Identity */}
        <Link to="/" className="flex items-center space-x-2.5">
          <WebindSymbol className="w-6 h-6" priority />
          <div className="flex flex-col">
            <span className="text-xs font-black tracking-widest text-white uppercase leading-none">
              {settings?.siteName || 'WEBIND GROUP'}
            </span>
            <span className="text-[8px] font-mono tracking-widest text-zinc-400 uppercase mt-0.5 leading-none">
              ECOSYSTEM OS
            </span>
          </div>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="p-2 rounded-full text-zinc-300 hover:text-white bg-white/[0.06] border border-white/10 active:scale-95 transition tap-bounce"
            aria-label="Search Ecosystem"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-zinc-300 hover:text-white bg-white/[0.06] border border-white/10 active:scale-95 transition tap-bounce"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <Link
            to="/admin"
            className="p-2 rounded-full text-zinc-300 hover:text-white bg-white/[0.06] border border-white/10 active:scale-95 transition tap-bounce"
            aria-label="Admin Portal"
          >
            <Shield className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
