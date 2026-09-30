import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ExternalLink,
  Globe,
  Twitter,
  Linkedin,
  Github,
  Calendar,
  Layers,
  Sparkles,
  CheckCircle2,
  Clock,
  Share2,
} from 'lucide-react';
import { brandsApi } from '../../services/api';
import StatusBadge from '../../components/brand/StatusBadge';
import { WebindSymbol } from '../../components/common/WebindLogo';
import LiquidGlassCard from '../../components/common/LiquidGlassCard';
import { useToast } from '../../components/common/Toast';

export const BrandDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await brandsApi.getPublicBrand(slug);
        if (res.success && res.brand) {
          setBrand(res.brand);
          document.title = `${res.brand.name} — Webind Ecosystem`;
        } else {
          setError('Brand not found');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Brand not found or unavailable');
      } finally {
        setLoading(false);
      }
    };

    fetchBrand();
  }, [slug]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast({
        type: 'success',
        title: 'Link Copied',
        message: 'Brand link copied to clipboard.',
      });
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-20 flex flex-col items-center justify-center space-y-6">
        <div className="w-16 h-16 rounded-3xl liquid-glass-pill flex items-center justify-center animate-pulse">
          <WebindSymbol className="w-10 h-10" />
        </div>
        <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
          Initializing Brand Experience...
        </span>
      </div>
    );
  }

  if (error || !brand) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="p-8 rounded-3xl liquid-glass space-y-4">
          <WebindSymbol className="w-10 h-10 mx-auto text-zinc-500" />
          <h2 className="text-2xl font-black text-white uppercase">Brand Not Found</h2>
          <p className="text-xs text-zinc-400 max-w-md mx-auto">
            {error || "The requested brand does not exist or hasn't been made public yet."}
          </p>
          <div className="pt-4">
            <Link
              to="/brands"
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-white text-black font-extrabold text-xs uppercase tracking-wider hover:bg-zinc-200 transition shadow-md tap-bounce"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Brands</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isComingSoon = brand.status === 'COMING_SOON';

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 md:py-10 animate-fade-in">
      {/* Top Navigation Bar inside Brand Experience */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
        <button
          onClick={() => navigate('/brands')}
          className="flex items-center space-x-2 px-4 py-2 rounded-full liquid-glass-pill text-zinc-300 hover:text-white text-xs font-bold uppercase tracking-wider transition tap-bounce"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Ecosystem</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-full text-zinc-300 hover:text-white liquid-glass-pill transition tap-bounce"
            title="Share brand link"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {brand.websiteUrl && !isComingSoon && (
            <a
              href={brand.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-5 py-2 rounded-full bg-white text-black font-extrabold text-xs uppercase tracking-wider hover:bg-zinc-200 transition shadow-md tap-bounce"
            >
              <span>Visit Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* ==========================================
          BRAND HERO BANNER (APPLE LIQUID GLASS)
          ========================================== */}
      <LiquidGlassCard
        accentColor={brand.accentColor || '#FFFFFF'}
        className="mb-12 p-8 sm:p-12 md:p-14"
        interactiveTilt={false}
      >
        <div className="relative z-10 max-w-3xl">
          {/* Category & Status */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 bg-white/[0.08] border border-white/10 px-3.5 py-1 rounded-full">
              {brand.category}
            </span>
            <StatusBadge status={brand.status} size="md" />
            {brand.launchDate && (
              <span className="flex items-center space-x-1.5 text-xs font-mono text-zinc-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>Launched {brand.launchDate}</span>
              </span>
            )}
          </div>

          {/* Brand Logo Display */}
          <div className="mb-6 h-12 flex items-center">
            {brand.logo ? (
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-h-12 max-w-[220px] object-contain filter brightness-110"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <div className="flex items-center space-x-3">
                <WebindSymbol className="w-9 h-9" />
                <span className="text-3xl font-black tracking-tight text-white uppercase">
                  {brand.name}
                </span>
              </div>
            )}
          </div>

          {/* Brand Name & Tagline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-[1.08]">
            {brand.name}
          </h1>

          <p className="mt-3 text-lg sm:text-xl font-medium text-zinc-200">
            {brand.tagline}
          </p>

          <p className="mt-6 text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
            {brand.fullDescription || brand.shortDescription}
          </p>

          {/* Social and Website Links */}
          <div className="mt-8 flex flex-wrap items-center gap-3 pt-6 border-t border-white/[0.08]">
            {brand.websiteUrl && (
              <a
                href={brand.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 px-4 py-2 rounded-full liquid-glass-pill hover:border-white/30 text-xs font-bold tracking-wider text-white uppercase transition tap-bounce"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{brand.websiteUrl.replace(/^https?:\/\//, '')}</span>
              </a>
            )}

            {brand.socialUrls?.twitter && (
              <a
                href={brand.socialUrls.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full liquid-glass-pill hover:border-white/30 text-zinc-300 hover:text-white transition tap-bounce"
                title="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}

            {brand.socialUrls?.github && (
              <a
                href={brand.socialUrls.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full liquid-glass-pill hover:border-white/30 text-zinc-300 hover:text-white transition tap-bounce"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}

            {brand.socialUrls?.linkedin && (
              <a
                href={brand.socialUrls.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full liquid-glass-pill hover:border-white/30 text-zinc-300 hover:text-white transition tap-bounce"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </LiquidGlassCard>

      {/* ==========================================
          COMING SOON SPECIAL PRESENTATION
          ========================================== */}
      {isComingSoon && (
        <div className="mb-12 p-8 sm:p-12 rounded-3xl liquid-glass border-amber-500/30 text-center relative overflow-hidden">
          <div className="max-w-md mx-auto space-y-3">
            <span className="w-10 h-10 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-black uppercase text-white tracking-tight">
              Something new is being built.
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
              This venture is actively in deep development under the Webind Research Labs. Architecture specs, whitepapers, and public access previews will be released soon.
            </p>
          </div>
        </div>
      )}

      {/* ==========================================
          BRAND STORY & PHILOSOPHY
          ========================================== */}
      {brand.brandStory && (
        <div className="mb-12 p-8 sm:p-10 rounded-3xl liquid-glass">
          <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
            ORIGIN & PURPOSE
          </span>
          <h2 className="text-2xl font-black text-white uppercase mt-2">
            The {brand.name} Story
          </h2>
          <div className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed font-normal whitespace-pre-line space-y-4">
            {brand.brandStory}
          </div>
        </div>
      )}

      {/* ==========================================
          PRODUCTS & SERVICES MATRIX
          ========================================== */}
      {brand.products && brand.products.length > 0 && (
        <div className="mb-12">
          <div className="mb-6">
            <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
              PLATFORM SUITE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase mt-1">
              Products & Modules
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {brand.products.map((prod, idx) => (
              <div
                key={prod._id || idx}
                className="p-6 rounded-3xl liquid-glass flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-white tracking-tight">
                      {prod.name}
                    </span>
                    <span
                      className={`text-[9px] font-mono uppercase px-2.5 py-0.5 rounded-full font-bold ${
                        prod.status === 'LIVE'
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                          : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                      }`}
                    >
                      {prod.status || 'LIVE'}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {prod.description}
                  </p>
                </div>

                {prod.link && (
                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                    <a
                      href={prod.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-300 hover:text-white font-mono text-[11px] flex items-center space-x-1"
                    >
                      <span>Explore Module</span>
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================
          SERVICES
          ========================================== */}
      {brand.services && brand.services.length > 0 && (
        <div className="mb-12">
          <div className="mb-6">
            <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
              CAPABILITIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase mt-1">
              Specialized Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {brand.services.map((svc, idx) => (
              <div
                key={svc._id || idx}
                className="p-6 rounded-3xl liquid-glass space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-zinc-300 shrink-0" />
                  <span className="text-sm font-bold text-white tracking-tight">
                    {svc.name}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 pl-6 leading-relaxed">
                  {svc.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================
          GALLERY
          ========================================== */}
      {brand.gallery && brand.gallery.length > 0 && (
        <div className="mb-12">
          <div className="mb-6">
            <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
              VISUAL REPOSITORY
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase mt-1">
              Media & Artifacts
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {brand.gallery.map((imgUrl, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(imgUrl)}
                className="group relative h-48 rounded-3xl overflow-hidden liquid-glass cursor-pointer"
              >
                <img
                  src={imgUrl}
                  alt={`${brand.name} artifact ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-xs font-mono uppercase text-white liquid-glass-pill px-4 py-1.5 rounded-full">
                    Expand
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl cursor-pointer"
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="Preview"
              className="max-w-4xl max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/20"
            />
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Back Button */}
      <div className="pt-8 border-t border-white/[0.08] flex items-center justify-between">
        <Link
          to="/brands"
          className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Explore More Brands</span>
        </Link>
        <span className="text-[11px] font-mono text-zinc-500 uppercase">
          WEBIND ECOSYSTEM OS
        </span>
      </div>
    </div>
  );
};

export default BrandDetailPage;
