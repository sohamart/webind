import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Globe, Layers, Sparkles } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { WebindSymbol } from '../common/WebindLogo';
import LiquidGlassCard from '../common/LiquidGlassCard';

export const BrandCard = ({ brand }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/brands/${brand.slug}`);
  };

  const isComingSoon = brand.status === 'COMING_SOON';

  return (
    <LiquidGlassCard
      onClick={handleCardClick}
      accentColor={brand.accentColor || '#FFFFFF'}
      className="cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top Meta: Category & Status */}
        <div className="flex items-center justify-between gap-2 mb-6">
          <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-zinc-300 uppercase bg-white/[0.06] px-3 py-1 rounded-full border border-white/10 shadow-sm">
            {brand.category}
          </span>
          <StatusBadge status={brand.status} />
        </div>

        {/* Brand Logo & Name */}
        <div className="space-y-3 mb-6">
          <div className="h-10 flex items-center">
            {brand.logo ? (
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-h-8 max-w-[170px] object-contain filter brightness-110 group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <div className="flex items-center space-x-2">
                <WebindSymbol className="w-7 h-7" />
                <span className="font-black text-xl tracking-tight text-white uppercase">
                  {brand.name}
                </span>
              </div>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-zinc-100 transition-colors">
            {brand.tagline || brand.name}
          </h3>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-2 font-normal">
            {brand.shortDescription || brand.fullDescription || 'Sovereign technology brand powered by Webind Group.'}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs mt-4">
        <span className="font-mono text-[11px] text-zinc-400 group-hover:text-zinc-200 transition-colors">
          {isComingSoon ? 'EXPLORE PREVIEW' : 'ENTER BRAND OS'}
        </span>

        <div className="flex items-center space-x-1.5 text-zinc-300 group-hover:text-white transition-colors">
          <span className="text-[11px] font-bold tracking-wider uppercase">View</span>
          <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </LiquidGlassCard>
  );
};

export default BrandCard;
