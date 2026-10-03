import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Layers, Compass, Home, Shield, ExternalLink, ArrowRight } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export const CommandPalette = () => {
  const { commandPaletteOpen, setCommandPaletteOpen, brands } = useAppState();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (commandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [commandPaletteOpen]);

  // Compute filtered items
  const staticCommands = [
    { type: 'NAV', title: 'Home Overview', subtitle: 'Main ecosystem landing & metrics', path: '/', icon: Home },
    { type: 'NAV', title: 'Brand Ecosystem', subtitle: 'Browse all active & upcoming brands', path: '/brands', icon: Layers },
    { type: 'NAV', title: 'About Webind Group', subtitle: 'Venture thesis, philosophy, architecture', path: '/about', icon: Compass },
    { type: 'NAV', title: 'Admin CMS Portal', subtitle: 'Sign in to manage ecosystem brands & content', path: '/admin', icon: Shield },
  ];

  const brandResults = brands
    .filter((b) => {
      const q = query.toLowerCase().trim();
      if (!q) return true;
      return (
        b.name?.toLowerCase().includes(q) ||
        b.category?.toLowerCase().includes(q) ||
        b.tagline?.toLowerCase().includes(q) ||
        b.shortDescription?.toLowerCase().includes(q)
      );
    })
    .map((b) => ({
      type: 'BRAND',
      title: b.name,
      subtitle: b.tagline || b.category,
      category: b.category,
      status: b.status,
      path: `/brands/${b.slug}`,
      icon: Layers,
    }));

  const filteredNav = staticCommands.filter((c) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return c.title.toLowerCase().includes(q) || c.subtitle.toLowerCase().includes(q);
  });

  const allResults = [...brandResults, ...filteredNav];

  // Handle keyboard arrow navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < allResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : allResults.length - 1));
    } else if (e.key === 'Enter' && allResults[selectedIndex]) {
      e.preventDefault();
      handleSelect(allResults[selectedIndex]);
    }
  };

  const handleSelect = (item) => {
    setCommandPaletteOpen(false);
    navigate(item.path);
  };

  if (!commandPaletteOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-start justify-center p-0 md:p-6 sm:pt-20">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setCommandPaletteOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full md:h-auto md:max-w-2xl bg-zinc-950 md:rounded-2xl border-0 md:border border-white/10 shadow-2xl overflow-hidden flex flex-col z-10 text-white"
        >
          {/* Search Input Bar */}
          <div className="flex items-center px-4 md:px-5 py-4 border-b border-white/[0.08] pt-safe">
            <Search className="w-5 h-5 text-zinc-400 mr-3 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search brands, platforms, ventures, or commands..."
              className="flex-1 bg-transparent text-sm md:text-base text-white placeholder-zinc-500 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-zinc-500 hover:text-white mr-2"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setCommandPaletteOpen(false)}
              className="p-1 rounded-md text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 text-xs px-2 py-1"
            >
              ESC
            </button>
          </div>

          {/* Results List */}
          <div className="flex-1 overflow-y-auto max-h-[70vh] md:max-h-96 p-2 space-y-1">
            {allResults.length === 0 ? (
              <div className="py-12 text-center text-zinc-500 text-xs">
                No matching brands or commands found for "{query}".
              </div>
            ) : (
              allResults.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                const Icon = item.icon;

                return (
                  <div
                    key={`${item.type}-${item.title}-${idx}`}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-white text-black'
                        : 'text-zinc-200 hover:bg-zinc-900'
                    }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-black text-white'
                            : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-xs md:text-sm tracking-tight truncate">
                            {item.title}
                          </span>
                          {item.type === 'BRAND' && item.status && (
                            <span
                              className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${
                                item.status === 'ACTIVE'
                                  ? isSelected
                                    ? 'bg-zinc-900 text-white'
                                    : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                                  : isSelected
                                  ? 'bg-zinc-900 text-amber-300'
                                  : 'bg-amber-950/80 text-amber-300 border border-amber-800/60'
                              }`}
                            >
                              {item.status.replace('_', ' ')}
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-[11px] truncate ${
                            isSelected ? 'text-zinc-700' : 'text-zinc-500'
                          }`}
                        >
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <ArrowRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected ? 'text-black translate-x-1' : 'text-zinc-600'
                      }`}
                    />
                  </div>
                );
              })
            )}
          </div>

          {/* Modal Footer */}
          <div className="hidden md:flex items-center justify-between px-4 py-2.5 bg-zinc-900/60 border-t border-white/[0.06] text-[10px] text-zinc-500 font-mono">
            <div className="flex items-center space-x-3">
              <span>↑↓ Navigate</span>
              <span>↵ Open</span>
              <span>ESC Close</span>
            </div>
            <span>WEBIND DISCOVERY</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CommandPalette;
