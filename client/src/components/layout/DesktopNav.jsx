import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Search, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { WebindSymbol } from '../common/WebindLogo';
import { useAppState } from '../../context/AppStateContext';

const links = [
  { name: 'HOME', to: '/' },
  { name: 'BRANDS', to: '/brands' },
  { name: 'ABOUT', to: '/about' },
  { name: 'MORE', to: '/more' },
];

export const DesktopNav = () => {
  const location = useLocation();
  const { setCommandPaletteOpen } = useAppState();

  // Hide in admin
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="hidden md:block fixed top-5 inset-x-0 z-40 max-w-4xl mx-auto px-4 select-none">
      <div className="flex items-center justify-between px-5 py-2.5 rounded-full liquid-glass-pill transition-all duration-300">
        {/* Brand Identity */}
        <Link to="/" className="flex items-center space-x-3 group">
          <WebindSymbol className="w-7 h-7 group-hover:scale-105 transition-transform" />
          <div className="flex flex-col">
            <span className="text-xs font-black tracking-widest text-white uppercase group-hover:text-zinc-200 transition-colors leading-none">
              WEBIND GROUP
            </span>
            <span className="text-[8px] font-mono tracking-widest text-zinc-400 uppercase mt-0.5 leading-none">
              ECOSYSTEM OS
            </span>
          </div>
        </Link>

        {/* Center Nav Links with Liquid Indicator */}
        <nav className="flex items-center space-x-1 p-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
          {links.map((link) => {
            const isActive =
              link.to === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(link.to);

            return (
              <NavLink
                key={link.name}
                to={link.to}
                className="relative px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase transition-colors"
              >
                {isActive && (
                  <motion.div
                    layoutId="desktop-nav-pill"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-white text-black shadow-[0_2px_12px_rgba(255,255,255,0.3)]"
                  />
                )}
                <span
                  className={`relative z-10 transition-colors ${
                    isActive ? 'text-black font-extrabold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {link.name}
                </span>
              </NavLink>
            );
          })}
        </nav>

        {/* Right Controls: Command Search, Theme, Admin */}
        <div className="flex items-center space-x-2">
          {/* Command Search Trigger */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-xs transition tap-bounce"
            title="Search brands & commands (Ctrl/Cmd + K)"
          >
            <Search className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-[11px] font-medium hidden lg:inline">Search</span>
            <kbd className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-zinc-300 border border-white/10">
              ⌘K
            </kbd>
          </button>

          {/* Admin Direct Access */}
          <Link
            to="/admin"
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-extrabold tracking-wider uppercase transition shadow-md tap-bounce"
          >
            <Shield className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Admin</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default DesktopNav;
