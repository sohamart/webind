import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Filter, Sparkles, Layers } from 'lucide-react';
import BrandCard from '../../components/brand/BrandCard';
import { useAppState } from '../../context/AppStateContext';

export const BrandsPage = () => {
  const { brands, loadingData } = useAppState();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL'); // 'ALL' | 'ACTIVE' | 'COMING_SOON'

  // Extract unique categories dynamically from database brands
  const categories = useMemo(() => {
    const set = new Set();
    brands.forEach((b) => {
      if (b.category && b.status !== 'ARCHIVED') {
        set.add(b.category);
      }
    });
    return ['ALL', ...Array.from(set)];
  }, [brands]);

  // Filtered brands
  const filteredBrands = useMemo(() => {
    return brands.filter((brand) => {
      if (brand.status === 'ARCHIVED') return false;

      // Category filter
      if (selectedCategory !== 'ALL' && brand.category !== selectedCategory) {
        return false;
      }

      // Status filter
      if (selectedStatus !== 'ALL' && brand.status !== selectedStatus) {
        return false;
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = brand.name?.toLowerCase().includes(q);
        const matchesTagline = brand.tagline?.toLowerCase().includes(q);
        const matchesCategory = brand.category?.toLowerCase().includes(q);
        const matchesDesc = brand.shortDescription?.toLowerCase().includes(q);
        const matchesTags = brand.tags?.some((t) => t.toLowerCase().includes(q));

        if (!matchesName && !matchesTagline && !matchesCategory && !matchesDesc && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [brands, selectedCategory, selectedStatus, searchQuery]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <div className="text-center md:text-left mb-10 pb-6 border-b border-white/[0.08]">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full liquid-glass-pill mb-4 select-none">
          <Layers className="w-3.5 h-3.5 text-zinc-300" />
          <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-zinc-300 uppercase">
            BRAND ARCHITECTURE
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase">
          Our Brands
        </h1>
        <p className="mt-3 text-sm md:text-base text-zinc-400 max-w-xl">
          Independent brands. One shared vision. Sovereign entities built with unified engineering standards.
        </p>
      </div>

      {/* Search & Filters Control Bar */}
      <div className="space-y-4 mb-10">
        {/* Search Input Box */}
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search brands by name, category, or capability..."
            className="w-full pl-11 pr-10 py-3.5 rounded-2xl liquid-glass focus:border-white/40 text-white placeholder-zinc-500 text-sm focus:outline-none transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Rows: Status + Categories */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Category Chips Ribbon */}
          <div className="flex items-center space-x-2 overflow-x-auto w-full pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all tap-bounce ${
                    isSelected
                      ? 'bg-white text-black font-extrabold shadow-md'
                      : 'liquid-glass-pill text-zinc-400 hover:text-white hover:border-white/30'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Status Segmented Toggle */}
          <div className="flex items-center p-1 rounded-full liquid-glass-pill shrink-0 self-end sm:self-auto">
            {['ALL', 'ACTIVE', 'COMING_SOON'].map((status) => {
              const isSelected = selectedStatus === status;
              return (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-3.5 py-1 rounded-full text-[10px] font-mono uppercase font-bold tracking-wider transition ${
                    isSelected
                      ? 'bg-white text-black shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {status === 'ALL' ? 'ALL' : status === 'ACTIVE' ? 'ACTIVE' : 'COMING'}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Brands Grid */}
      {loadingData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-72 rounded-3xl liquid-glass animate-pulse"
            />
          ))}
        </div>
      ) : filteredBrands.length === 0 ? (
        <div className="py-20 text-center rounded-3xl liquid-glass p-8">
          <Sparkles className="w-10 h-10 text-zinc-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white uppercase">No Brands Found</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto mt-2">
            No brands matched your active query. Try clearing the search or switching categories.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('ALL');
              setSelectedStatus('ALL');
            }}
            className="mt-6 px-6 py-2.5 rounded-full bg-white text-black text-xs font-extrabold uppercase tracking-wider hover:bg-zinc-200 transition shadow-md tap-bounce"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBrands.map((brand) => (
            <BrandCard key={brand._id || brand.slug} brand={brand} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandsPage;
